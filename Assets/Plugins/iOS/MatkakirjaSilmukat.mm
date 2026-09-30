// MatkakirjaSilmukat.mm — pitkät ja silmukoituvat äänikerrokset AVAudioEnginellä (Pelikoodari 30.9.2026, Cupolan ääni;
// omistaja: "iss ääni hyvä … oma humina taustalle … soittaa tuota vähän hiljemmalla sen päällä").
//
// Miksi ei Unityn AudioSourcea: pitkä pakattu klippi hyppi luennoissa (luennan hyppyongelma), ja Päätoimittaja linjasi
// Cupolan äänen radion AVAudioEngine-polulle (MatkakirjaRadio.mm). Radioliitännäinen on yhden live-virran soitin eikä
// osaa hypätä kohtaan, joten tässä on oma pieni moottori paikallisille tiedostoille (Unity lataa ne välimuistiin):
//
//   MatkakirjaSilmukka_Avaa(kerros, polku, alkuS, tapa)  soitin kerrokselle (0…3); tapa 1 = koko tiedosto puskuriin ja
//                                                         saumaton silmukka (humina), 0 = tiedosto kohdasta alkuS loppuun
//                                                         ja sitten alusta uudelleen (radio, pitkä). Alkaa mykkänä.
//   MatkakirjaSilmukka_Voimakkuus(kerros, 0…1)           soitinsolmun voimakkuus (Unity rampittaa joka kehys)
//   MatkakirjaSilmukka_Sulje(kerros)                     soitin pois
//   MatkakirjaSilmukka_Aika(kerros)                      soittokohta sekunteina tiedostossa (mittaus: etenee myös
//                                                         mykkänä, kuten currentTime); −1 = ei soi
//   MatkakirjaSilmukka_Tila(kerros)                      0 ei soitinta, 1 avautuu, 2 soi, 3 virhe
//
// Säikeet kuten radiossa: pääsäie lähettää käskyt dispatch_asyncilla sarjajonoon "app.matkakirja.silmukat"; ääni-istunto
// (Playback + MixWithOthers, sama kuin radiolla ja MatkakirjaAanella), engine ja solmut vain jonossa. Tila ja aika
// luetaan atomisista muuttujista. Enginen konfiguraatiomuutos (kuulokkeet, reitti) käynnistää enginen uudelleen jonossa.
#import <AVFoundation/AVFoundation.h>
#include <atomic>

static const int Kerroksia = 4;

@interface MKSilmukka : NSObject
@property (nonatomic, strong) AVAudioPlayerNode* solmu;
@property (nonatomic, strong) AVAudioFile* tiedosto;
@property (nonatomic) double taajuus;
@property (nonatomic) AVAudioFramePosition alkuKehys;   // ensimmäisen ajastuksen alku (näyteaika kasvaa segmenttien yli)
@property (nonatomic) AVAudioFramePosition pituus;
@property (nonatomic) int sukupolvi;
@property (nonatomic) BOOL puskurina;
@end
@implementation MKSilmukka
@end

static dispatch_queue_t jono;
static AVAudioEngine* moottori;
static MKSilmukka* kerrokset[Kerroksia];
static std::atomic<int> tilat[Kerroksia];
static std::atomic<double> ajat[Kerroksia];
static std::atomic<float> voimat[Kerroksia];
static std::atomic<int> sukupolvet[Kerroksia];
static id muutosTarkkailija;

static void Alusta(void)
{
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{
        jono = dispatch_queue_create("app.matkakirja.silmukat", DISPATCH_QUEUE_SERIAL);
        for (int i = 0; i < Kerroksia; i++) { tilat[i] = 0; ajat[i] = -1; voimat[i] = 0; sukupolvet[i] = 0; }
    });
}

// Jonossa.
static void Istunto(void)
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    BOOL oikein = [istunto.category isEqualToString:AVAudioSessionCategoryPlayback]
        && istunto.categoryOptions == AVAudioSessionCategoryOptionMixWithOthers;
    NSError* virhe = nil;
    if (!oikein && ![istunto setCategory:AVAudioSessionCategoryPlayback mode:AVAudioSessionModeDefault
                                 options:AVAudioSessionCategoryOptionMixWithOthers error:&virhe])
        NSLog(@"MATKAKIRJA silmukat: setCategory epäonnistui: %@", virhe);
    if (![istunto setActive:YES error:&virhe]) NSLog(@"MATKAKIRJA silmukat: setActive epäonnistui: %@", virhe);
}

// Jonossa.
static BOOL KaynnistaMoottori(void)
{
    if (moottori == nil)
    {
        moottori = [AVAudioEngine new];
        [moottori mainMixerNode]; // luo mikserin ja ulostulon kytkennän
        muutosTarkkailija = [[NSNotificationCenter defaultCenter] addObserverForName:AVAudioEngineConfigurationChangeNotification
            object:moottori queue:nil usingBlock:^(NSNotification* n) {
                dispatch_async(jono, ^{
                    NSError* e = nil;
                    if (!moottori.isRunning && ![moottori startAndReturnError:&e]) { NSLog(@"MATKAKIRJA silmukat: uudelleenkäynnistys: %@", e); return; }
                    for (int i = 0; i < Kerroksia; i++) if (kerrokset[i].solmu && !kerrokset[i].solmu.isPlaying) [kerrokset[i].solmu play];
                });
            }];
    }
    if (moottori.isRunning) return YES;
    Istunto();
    NSError* virhe = nil;
    if (![moottori startAndReturnError:&virhe]) { NSLog(@"MATKAKIRJA silmukat: engine ei käynnisty: %@", virhe); return NO; }
    return YES;
}

// Jonossa: ajastaa tiedoston kohdasta alku loppuun; valmistuttua (sama sukupolvi) alusta uudelleen.
static void AjastaTiedosto(MKSilmukka* s, int kerros, AVAudioFramePosition alku)
{
    int sp = s.sukupolvi;
    AVAudioFrameCount maara = (AVAudioFrameCount)MAX((AVAudioFramePosition)1, s.pituus - alku);
    [s.solmu scheduleSegment:s.tiedosto startingFrame:alku frameCount:maara atTime:nil
       completionCallbackType:AVAudioPlayerNodeCompletionDataPlayedBack completionHandler:^(AVAudioPlayerNodeCompletionCallbackType laji) {
        dispatch_async(jono, ^{
            if (kerrokset[kerros] != s || s.sukupolvi != sp || sukupolvet[kerros] != sp) return; // suljettu tai korvattu
            AjastaTiedosto(s, kerros, 0);
        });
    }];
}

static void SuljeJonossa(int kerros)
{
    MKSilmukka* s = kerrokset[kerros];
    kerrokset[kerros] = nil;
    sukupolvet[kerros]++;
    tilat[kerros] = 0;
    ajat[kerros] = -1;
    if (s == nil) return;
    [s.solmu stop];
    if (moottori) [moottori detachNode:s.solmu];
}

extern "C" {

void MatkakirjaSilmukka_Avaa(int kerros, const char* polku, double alkuS, int tapa)
{
    if (kerros < 0 || kerros >= Kerroksia || polku == NULL) return;
    Alusta();
    NSString* p = [NSString stringWithUTF8String:polku];
    tilat[kerros] = 1;
    voimat[kerros] = 0;
    dispatch_async(jono, ^{
        SuljeJonossa(kerros);
        tilat[kerros] = 1;
        int sp = sukupolvet[kerros];
        NSError* virhe = nil;
        AVAudioFile* f = [[AVAudioFile alloc] initForReading:[NSURL fileURLWithPath:p] error:&virhe];
        if (f == nil || f.length <= 0) { NSLog(@"MATKAKIRJA silmukat: %d ei aukea (%@): %@", kerros, p.lastPathComponent, virhe); tilat[kerros] = 3; return; }
        if (!KaynnistaMoottori()) { tilat[kerros] = 3; return; }
        MKSilmukka* s = [MKSilmukka new];
        s.tiedosto = f;
        s.taajuus = f.processingFormat.sampleRate;
        s.pituus = f.length;
        s.sukupolvi = sp;
        s.solmu = [AVAudioPlayerNode new];
        [moottori attachNode:s.solmu];
        [moottori connect:s.solmu to:moottori.mainMixerNode format:f.processingFormat];
        s.solmu.volume = 0;
        if (tapa == 1)
        {
            // Humina: koko tiedosto puskuriin, saumaton silmukka (ei valmistumiskutsua).
            AVAudioPCMBuffer* b = [[AVAudioPCMBuffer alloc] initWithPCMFormat:f.processingFormat frameCapacity:(AVAudioFrameCount)f.length];
            if (![f readIntoBuffer:b error:&virhe]) { NSLog(@"MATKAKIRJA silmukat: %d luku: %@", kerros, virhe); tilat[kerros] = 3; [moottori detachNode:s.solmu]; return; }
            s.puskurina = YES;
            s.alkuKehys = 0;
            [s.solmu scheduleBuffer:b atTime:nil options:AVAudioPlayerNodeBufferLoops completionHandler:nil];
        }
        else
        {
            AVAudioFramePosition alku = (AVAudioFramePosition)(MAX(0.0, alkuS) * s.taajuus);
            if (alku >= s.pituus) alku = 0;
            s.alkuKehys = alku;
            AjastaTiedosto(s, kerros, alku);
        }
        kerrokset[kerros] = s;
        [s.solmu play];
        s.solmu.volume = voimat[kerros];
        tilat[kerros] = 2;
        NSLog(@"MATKAKIRJA silmukat: %d soi %@ (%.1f s, alku %.1f s, %@)", kerros, p.lastPathComponent,
              s.pituus / s.taajuus, s.alkuKehys / s.taajuus, tapa == 1 ? @"puskuri" : @"tiedosto");
    });
}

void MatkakirjaSilmukka_Voimakkuus(int kerros, float arvo)
{
    if (kerros < 0 || kerros >= Kerroksia) return;
    Alusta();
    float v = arvo < 0 ? 0 : arvo > 1 ? 1 : arvo;
    if (voimat[kerros] == v) return;
    voimat[kerros] = v;
    dispatch_async(jono, ^{ MKSilmukka* s = kerrokset[kerros]; if (s) s.solmu.volume = voimat[kerros]; });
}

void MatkakirjaSilmukka_Sulje(int kerros)
{
    if (kerros < 0 || kerros >= Kerroksia) return;
    Alusta();
    tilat[kerros] = 0;
    dispatch_async(jono, ^{ SuljeJonossa(kerros); });
}

int MatkakirjaSilmukka_Tila(int kerros)
{
    if (kerros < 0 || kerros >= Kerroksia) return 0;
    Alusta();
    return tilat[kerros];
}

double MatkakirjaSilmukka_Aika(int kerros)
{
    if (kerros < 0 || kerros >= Kerroksia) return -1;
    Alusta();
    // Luetaan jonossa synkronisesti vain aika (kevyt; ei äänipalvelinkutsuja): soitinsolmun näyteaika + ajastuksen alku.
    __block double t = -1;
    dispatch_sync(jono, ^{
        MKSilmukka* s = kerrokset[kerros];
        if (s == nil || !s.solmu.isPlaying) return;
        AVAudioTime* solmuAika = s.solmu.lastRenderTime;
        AVAudioTime* soitin = solmuAika ? [s.solmu playerTimeForNodeTime:solmuAika] : nil;
        if (soitin == nil || !soitin.isSampleTimeValid) return;
        double kulunut = soitin.sampleTime / s.taajuus;
        double pituus = s.pituus / s.taajuus;
        t = s.puskurina ? fmod(kulunut, pituus) : fmod(s.alkuKehys / s.taajuus + kulunut, pituus);
    });
    ajat[kerros] = t;
    return t;
}

}
