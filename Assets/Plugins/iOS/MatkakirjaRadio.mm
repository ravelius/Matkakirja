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
//
// "Soi" = timeControlStatus Playing ja kohdan eteneminen (kuten webin 'playing' tai
// 'timeupdate'): puskurointi ei ole vielä kuulumista.
//
// Ääni-istunto: Playback + MixWithOthers kuten MatkakirjaAani.mm (äänettömyyskytkin ei
// mykistä radiota, pelaajan oma musiikki ei katkea).
//
// Vaatii: ARC, AVFoundation.framework (Unityn iOS-projektissa linkitetty oletuksena).

#import <AVFoundation/AVFoundation.h>

#if !__has_feature(objc_arc)
#error "MatkakirjaRadio.mm vaatii ARC:n (-fobjc-arc)"
#endif

@interface MatkakirjaRadio : NSObject
@property (nonatomic, strong) AVPlayer* soitin;
@property (nonatomic, strong) id loppuTarkkailija;
@property (nonatomic, strong) id virheTarkkailija;
@property (nonatomic) int loppuTila;   // 0 = ei, 3 = ei vastaa, 4 = katkesi
@property (nonatomic) float voimakkuus;
@property (nonatomic) BOOL tauolla;    // pelaajan tauko: ei automaattista jatkoa
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
    [self.soitin play];
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

// VU-mittarin taso (BUILD 7): RMS 0…1 tai −1 = ei saatavilla. TYNKÄ (Linssiseppä 24.9.): Natiiviseppä
// korvaa oikealla mittauksella (esim. MTAudioProcessingTap progressiiviselle virralle; HLS → −1).
float MatkakirjaRadio_Taso(void)
{
    return -1.0f;
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

// Merkkivalon tauko (web audio.pause/play): yhteys jää, data ei kulje mykistettynä.
void MatkakirjaRadio_Tauko(int paalle)
{
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    radio.tauolla = paalle != 0;
    if (radio.soitin == nil) return;
    if (paalle) [radio.soitin pause]; else [radio.soitin play];
}

}
