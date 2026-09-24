// MatkakirjaRadio.mm — maailmanradion suora lähetys AVPlayerilla (Linssiseppä 23.9.2026).
//
// Webin radio soittaa <audio>-elementillä Icecast/Shoutcast-virtoja (mp3, aac) ja
// HLS:ää; Unityn AudioSource ei soita loputonta verkkovirtaa luotettavasti, joten
// natiivissa soittaa AVPlayer. Yksi virta kerrallaan.
//
// Unity-puoli: Linssit/Unity/RadioVirta.cs (IRadioVirta), joka kysyy tilan joka kehys:
//   MatkakirjaRadio_Avaa(url)          uusi virta, soitto alkaa mykkänä (voimakkuus 0)
//   MatkakirjaRadio_Sulje()            virta pois
//   MatkakirjaRadio_Voimakkuus(0…1)    ristihäivytys (RadioLinssi)
//   MatkakirjaRadio_Tila()             0 ei virtaa, 1 yhdistää, 2 soi, 3 ei vastaa, 4 katkesi
//   MatkakirjaRadio_Tauko(0|1)         merkkivalon tauko: pause/play (int, ei bool: P/Invoke-koko)
//   MatkakirjaRadio_Kuvaus()           diagnoosi lokiin virheen hetkellä: tilat, odotuksen syy,
//                                      virheet ja virhelokin viimeinen rivi (strdup, Unity vapauttaa)
//   MatkakirjaRadio_Taso()             VU-mittari (Natiiviseppä 24.9., build 7): kuuluvan äänen taso 0…1
//                                      (RMS ~30 ms ikkunoista, dBFS −60…0 → 0…1, × voimakkuus), nopea nousu ja
//                                      lyhyt vaimennus (~300 ms); −1 = tasoa ei saada (HLS: äänitappi ei
//                                      toimi segmenttivirroilla) → Unity käyttää ajastettua varakuviota
//   MatkakirjaRadio_Huippu()           sama huippuarvosta (|näyte| max), vaimennus ~1 s
//
// "Soi" = timeControlStatus Playing ja kohdan eteneminen (kuten webin 'playing' tai
// 'timeupdate'): puskurointi ei ole vielä kuulumista.
//
// Ääni-istunto: Playback + MixWithOthers kuten MatkakirjaAani.mm (äänettömyyskytkin ei
// mykistä radiota, pelaajan oma musiikki ei katkea).
//
// Vaatii: ARC, AVFoundation.framework (Unityn iOS-projektissa linkitetty oletuksena).

#import <AVFoundation/AVFoundation.h>
#import <MediaToolbox/MediaToolbox.h>
#import <QuartzCore/QuartzCore.h>
#include <atomic>
#include <cmath>

#if !__has_feature(objc_arc)
#error "MatkakirjaRadio.mm vaatii ARC:n (-fobjc-arc)"
#endif

// ---- VU-mittari: MTAudioProcessingTap AVPlayerItemin audioMixissä ----------------------------------
// Tappi saa dekoodatut näytteet äänisäikeessä (yleensä Float32, ei lomitettu). Taso lasketaan ~30 ms
// ikkunoista, ja viimeisin ikkuna kirjoitetaan atomisiin muuttujiin; Unity lukee pääsäikeessä.

static std::atomic<float> vuRms(0.f), vuHuippu(0.f);
static std::atomic<int> vuTila(0);      // 0 = ei vielä, 1 = tappi käytössä, -1 = ei tuettu (HLS)
static AudioStreamBasicDescription vuMuoto;

static void TapInit(MTAudioProcessingTapRef tap, void* tieto, void** tallennus) { *tallennus = tieto; }
static void TapFinalize(MTAudioProcessingTapRef tap) {}
static void TapPrepare(MTAudioProcessingTapRef tap, CMItemCount enintaan, const AudioStreamBasicDescription* muoto)
{
    vuMuoto = *muoto;
}
static void TapUnprepare(MTAudioProcessingTapRef tap) {}

static void TapProcess(MTAudioProcessingTapRef tap, CMItemCount kehyksia, MTAudioProcessingTapFlags liput,
                       AudioBufferList* puskurit, CMItemCount* kehyksiaUlos, MTAudioProcessingTapFlags* liputUlos)
{
    if (MTAudioProcessingTapGetSourceAudio(tap, kehyksia, puskurit, liputUlos, NULL, kehyksiaUlos) != noErr) return;
    bool liuku = (vuMuoto.mFormatFlags & kAudioFormatFlagIsFloat) != 0;
    bool kokonais16 = !liuku && vuMuoto.mBitsPerChannel == 16;
    if (!liuku && !kokonais16) return;
    CMItemCount n = *kehyksiaUlos;
    double taajuus = vuMuoto.mSampleRate > 0 ? vuMuoto.mSampleRate : 44100.0;
    CMItemCount ikkuna = (CMItemCount)(taajuus * 0.03);
    if (ikkuna < 64) ikkuna = 64;
    // Viimeinen täysi ~30 ms ikkuna kaikista kanavista (puskuri on tavallisesti 20–100 ms).
    CMItemCount alku = n > ikkuna ? n - ikkuna : 0;
    double summa = 0; float huippu = 0; long maara = 0;
    for (UInt32 b = 0; b < puskurit->mNumberBuffers; b++)
    {
        const AudioBuffer& p = puskurit->mBuffers[b];
        UInt32 kanavia = p.mNumberChannels > 0 ? p.mNumberChannels : 1;
        if (liuku)
        {
            const float* x = (const float*)p.mData;
            for (CMItemCount i = alku * kanavia; i < n * kanavia; i++) { float v = fabsf(x[i]); summa += v * v; if (v > huippu) huippu = v; maara++; }
        }
        else
        {
            const int16_t* x = (const int16_t*)p.mData;
            for (CMItemCount i = alku * kanavia; i < n * kanavia; i++) { float v = fabsf(x[i] / 32768.f); summa += v * v; if (v > huippu) huippu = v; maara++; }
        }
    }
    if (maara == 0) return;
    vuRms.store((float)sqrt(summa / maara));
    vuHuippu.store(huippu);
}

// dBFS −60…0 → 0…1 (VU-asteikon tuntuma: hiljainen puhe ~0,4, täysi musiikki ~0,8).
static float VuAsteikko(float lineaarinen)
{
    if (lineaarinen <= 1e-6f) return 0.f;
    float db = 20.f * log10f(lineaarinen);
    float t = (db + 60.f) / 60.f;
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

@interface MatkakirjaRadio : NSObject
@property (nonatomic, strong) AVPlayer* soitin;
@property (nonatomic, strong) id loppuTarkkailija;
@property (nonatomic, strong) id virheTarkkailija;
@property (nonatomic) int loppuTila;   // 0 = ei, 3 = ei vastaa, 4 = katkesi
@property (nonatomic) float voimakkuus;
@property (nonatomic) BOOL tauolla;    // pelaajan tauko: ei automaattista jatkoa
@property (nonatomic) float nayttoTaso, nayttoHuippu;
@property (nonatomic) CFTimeInterval edellinenLuku;
@end

@implementation MatkakirjaRadio

+ (instancetype)jaettu
{
    static MatkakirjaRadio* radio = nil;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ radio = [MatkakirjaRadio new]; });
    return radio;
}

// Ääni-istunnon asetus ei saa pysäyttää pääsäiettä: setCategory ja setActive ovat synkronisia kutsuja
// äänipalvelimelle (iPad 24.9.: asemanvaihdon kehyksessä 16 ms, ui piikit Update.Linssi.radio.Virta.Avaa).
// Kategoria asetetaan vain, kun se on väärä (ominaisuuksien luku on halpa), ja aktivointi tehdään omassa
// sarjajonossaan (Apple suosittaa aktivointia pääsäikeen ulkopuolella). AVPlayer voi aloittaa puskuroinnin
// sillä välin; soitto kuuluu, kun istunto on aktiivinen.
- (void)istunto
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    BOOL oikein = [istunto.category isEqualToString:AVAudioSessionCategoryPlayback]
        && [istunto.mode isEqualToString:AVAudioSessionModeDefault]
        && istunto.categoryOptions == AVAudioSessionCategoryOptionMixWithOthers;
    static dispatch_queue_t jono;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ jono = dispatch_queue_create("app.matkakirja.radio.istunto", DISPATCH_QUEUE_SERIAL); });
    dispatch_async(jono, ^{
        NSError* virhe = nil;
        if (!oikein && ![istunto setCategory:AVAudioSessionCategoryPlayback
                                        mode:AVAudioSessionModeDefault
                                     options:AVAudioSessionCategoryOptionMixWithOthers
                                       error:&virhe])
            NSLog(@"MATKAKIRJA radio: setCategory epäonnistui: %@", virhe);
        if (![istunto setActive:YES error:&virhe])
            NSLog(@"MATKAKIRJA radio: setActive epäonnistui: %@", virhe);
    });
}

- (void)avaa:(NSString*)osoite
{
    [self sulje];
    NSURL* url = [NSURL URLWithString:osoite];
    if (url == nil) { self.loppuTila = 3; return; }
    [self istunto];
    AVPlayerItem* kohde = [AVPlayerItem playerItemWithURL:url];
    // Suora lähetys: pieni puskuri riittää, ja soitto alkaa heti kun voi.
    kohde.preferredForwardBufferDuration = 2.0;
    self.soitin = [AVPlayer playerWithPlayerItem:kohde];
    // EI automaticallyWaitsToMinimizeStalling = NO: silloin play() ennen puskuria jumittuu
    // heti, AVPlayer asettaa rate 0:ksi eikä jatka itse (iPad 23.9.2026: kaikki asemat
    // aikakatkaisuun). Oletus YES odottaa puskurin (preferredForwardBufferDuration 2 s).
    self.tauolla = NO;
    self.soitin.volume = 0;
    self.voimakkuus = 0;
    self.loppuTila = 0;
    __weak MatkakirjaRadio* heikko = self;
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    self.loppuTarkkailija = [nc addObserverForName:AVPlayerItemDidPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    self.virheTarkkailija = [nc addObserverForName:AVPlayerItemFailedToPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    [self tappi:kohde];
    [self.soitin play];
}

// VU-tappi kohteen audioMixiin, kun ääniraidat ovat tiedossa. Progressiivisella MP3/AAC-virralla
// AVURLAssetilla on ääniraita; HLS-virralla raitoja ei ole (segmentit) → taso −1.
- (void)tappi:(AVPlayerItem*)kohde
{
    vuTila.store(0);
    vuRms.store(0.f);
    vuHuippu.store(0.f);
    self.nayttoTaso = 0;
    self.nayttoHuippu = 0;
    AVAsset* aineisto = kohde.asset;
    __weak AVPlayerItem* heikkoKohde = kohde;
    [aineisto loadValuesAsynchronouslyForKeys:@[@"tracks"] completionHandler:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            AVPlayerItem* k = heikkoKohde;
            if (k == nil || k != self.soitin.currentItem) return;
            NSError* virhe = nil;
            if ([aineisto statusOfValueForKey:@"tracks" error:&virhe] != AVKeyValueStatusLoaded) { vuTila.store(-1); return; }
            AVAssetTrack* raita = [aineisto tracksWithMediaType:AVMediaTypeAudio].firstObject;
            if (raita == nil) { vuTila.store(-1); return; }
            MTAudioProcessingTapCallbacks kutsut;
            kutsut.version = kMTAudioProcessingTapCallbacksVersion_0;
            kutsut.clientInfo = NULL;
            kutsut.init = TapInit;
            kutsut.finalize = TapFinalize;
            kutsut.prepare = TapPrepare;
            kutsut.unprepare = TapUnprepare;
            kutsut.process = TapProcess;
            MTAudioProcessingTapRef tap = NULL;
            if (MTAudioProcessingTapCreate(kCFAllocatorDefault, &kutsut, kMTAudioProcessingTapCreationFlag_PostEffects, &tap) != noErr
                || tap == NULL) { vuTila.store(-1); return; }
            AVMutableAudioMixInputParameters* parametrit = [AVMutableAudioMixInputParameters audioMixInputParametersWithTrack:raita];
            parametrit.audioTapProcessor = tap;
            CFRelease(tap);
            AVMutableAudioMix* miksaus = [AVMutableAudioMix audioMix];
            miksaus.inputParameters = @[parametrit];
            k.audioMix = miksaus;
            vuTila.store(1);
        });
    }];
}

// Unityn luku joka kehys: nopea nousu, lyhyt vaimennus (taso ~300 ms, huippu ~1 s), × voimakkuus.
- (float)taso:(BOOL)huippu
{
    if (self.soitin == nil) return 0;
    int t = vuTila.load();
    if (t < 0) return -1;
    CFTimeInterval nyt = CACurrentMediaTime();
    double dt = self.edellinenLuku > 0 ? nyt - self.edellinenLuku : 0;
    self.edellinenLuku = nyt;
    BOOL soi = !self.tauolla && self.soitin.timeControlStatus == AVPlayerTimeControlStatusPlaying;
    float uusiTaso = soi ? VuAsteikko(vuRms.load()) * self.voimakkuus : 0;
    float uusiHuippu = soi ? VuAsteikko(vuHuippu.load()) * self.voimakkuus : 0;
    float vt = (float)exp(-dt / 0.3), vh = (float)exp(-dt / 1.0);
    self.nayttoTaso = uusiTaso > self.nayttoTaso ? uusiTaso : self.nayttoTaso * vt + uusiTaso * (1 - vt);
    self.nayttoHuippu = uusiHuippu > self.nayttoHuippu ? uusiHuippu : self.nayttoHuippu * vh;
    return huippu ? self.nayttoHuippu : self.nayttoTaso;
}

- (void)sulje
{
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    if (self.loppuTarkkailija) [nc removeObserver:self.loppuTarkkailija];
    if (self.virheTarkkailija) [nc removeObserver:self.virheTarkkailija];
    self.loppuTarkkailija = nil;
    self.virheTarkkailija = nil;
    [self.soitin pause];
    [self.soitin replaceCurrentItemWithPlayerItem:nil];
    self.soitin = nil;
    self.loppuTila = 0;
}

- (NSString*)kuvaus
{
    AVPlayer* s = self.soitin;
    if (s == nil) return [NSString stringWithFormat:@"ei soitinta, loppuTila %d", self.loppuTila];
    AVPlayerItem* k = s.currentItem;
    AVPlayerItemErrorLogEvent* viime = k.errorLog.events.lastObject;
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    return [NSString stringWithFormat:@"soitin %ld, kohde %ld, aika %ld (%@), kohta %.2f s, puskuri %@, loppuTila %d, "
        "soitinvirhe %@, kohdevirhe %@, virheloki %@ %ld %@, istunto %@ %@ reitti %@",
        (long)s.status, (long)k.status, (long)s.timeControlStatus, s.reasonForWaitingToPlay ?: @"-",
        CMTimeGetSeconds(k.currentTime), k.playbackBufferEmpty ? @"tyhjä" : @"ei tyhjä", self.loppuTila,
        s.error.localizedDescription ?: @"-", k.error.localizedDescription ?: @"-",
        viime.errorDomain ?: @"-", (long)viime.errorStatusCode, viime.errorComment ?: @"-",
        istunto.category, istunto.isOtherAudioPlaying ? @"muu ääni soi" : @"",
        istunto.currentRoute.outputs.firstObject.portType ?: @"ei ulostuloa"];
}

- (int)tila
{
    if (self.soitin == nil) return self.loppuTila;
    if (self.loppuTila != 0) return self.loppuTila;
    AVPlayerItem* kohde = self.soitin.currentItem;
    if (self.soitin.status == AVPlayerStatusFailed || kohde.status == AVPlayerItemStatusFailed) return 3;
    if (self.soitin.timeControlStatus == AVPlayerTimeControlStatusPlaying
        && CMTimeGetSeconds(kohde.currentTime) > 0) return 2;
    // Pysähtynyt ilman pelaajan taukoa (jumi, keskeytys): uusi yritys, kun kohde on valmis.
    if (!self.tauolla && kohde.status == AVPlayerItemStatusReadyToPlay
        && self.soitin.timeControlStatus == AVPlayerTimeControlStatusPaused)
        [self.soitin play];
    return 1;
}

@end

extern "C" {

void MatkakirjaRadio_Avaa(const char* osoite)
{
    if (osoite == NULL) return;
    [[MatkakirjaRadio jaettu] avaa:[NSString stringWithUTF8String:osoite]];
}

void MatkakirjaRadio_Sulje(void)
{
    [[MatkakirjaRadio jaettu] sulje];
}

void MatkakirjaRadio_Voimakkuus(float arvo)
{
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    radio.voimakkuus = arvo < 0 ? 0 : arvo > 1 ? 1 : arvo;
    radio.soitin.volume = radio.voimakkuus;
}

int MatkakirjaRadio_Tila(void)
{
    return [[MatkakirjaRadio jaettu] tila];
}

// Diagnoosi (C-merkkijono strdup:lla; IL2CPP vapauttaa palautetun char*:n free():llä).
const char* MatkakirjaRadio_Kuvaus(void)
{
    const char* t = [[[MatkakirjaRadio jaettu] kuvaus] UTF8String];
    return t ? strdup(t) : NULL;
}

float MatkakirjaRadio_Taso(void)
{
    return [[MatkakirjaRadio jaettu] taso:NO];
}

float MatkakirjaRadio_Huippu(void)
{
    return [[MatkakirjaRadio jaettu] taso:YES];
}

// Merkkivalon tauko (web audio.pause/play): yhteys jää, data ei kulje mykistettynä.
void MatkakirjaRadio_Tauko(int paalle)
{
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    radio.tauolla = paalle != 0;
    if (radio.soitin == nil) return;
    if (paalle) [radio.soitin pause]; else [radio.soitin play];
}

}
