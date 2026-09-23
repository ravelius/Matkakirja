// MatkakirjaSanelu.mm — pöllön mikrofoni eli sanelu natiivissa (Pelikoodari, 24.9.2026).
//
// Webissä selain: SpeechRecognition (lang fi-FI, interimResults, continuous=false)
// ja iOS-kuoressa ios/Matkakirja/Selain/SaneluSilta.swift + AaniIstunto.swift.
// Tämä on kuoren sillan portti: SFSpeechRecognizer fi-FI + AVAudioEngine, tunnistus
// laitteella aina kun laite sen osaa (requiresOnDeviceRecognition, kun
// supportsOnDeviceRecognition). Kuoresta poiketen sanelu päättyy myös itsestään kuten
// selaimen continuous=false: hiljaisuus puheen jälkeen, ei puhetta alussa, aikaraja.
//
// KULKU (Unity-puoli Scripts/Peli/Sanelu.cs):
//   MatkakirjaSanelu_Aloita(pyynto, hiljaisuusMs, alkuMs, enintaanMs, kutsu)
//     luvat (puheentunnistus, sitten mikrofoni; kysytään vasta nyt, kuten webissä)
//     → ALKOI (äänet tauolle) → istunto PlayAndRecord → moottori käyntiin
//     → KUUNTELEE (web onaudiostart / sanelu-alkoi: vasta nyt "Kuuntelen…")
//     → OSITTAINEN(teksti) aina kun tunnistettu teksti muuttuu
//     → mikrofoni kiinni (nappi, hiljaisuus, aikaraja, keskeytys) → LOPPUI (istunto palautettu)
//     → VALMIS(teksti) tai VIRHE(laji, viesti) tasan kerran per pyyntö.
//   MatkakirjaSanelu_Lopeta(pyynto)   nappi: mikrofoni kiinni, viimeistelty teksti VALMIS-kutsussa
//   MatkakirjaSanelu_Peruuta(pyynto)  kaikki kiinni ilman VALMIS/VIRHE-kutsua (LOPPUI tulee)
//   MatkakirjaSanelu_Keskeyta(pyynto) kuten taustalle meno: teksti → VALMIS, tyhjä → VIRHE Keskeytyi
// Kaikki kutsut tehdään pääsäikeessä (iOS:n Unity-säie), eivät koskaan Aloita-kutsun sisältä.
//
// ÄÄNI-ISTUNTO. Sanelun ajaksi PlayAndRecord (mode Measurement kuten kuoressa ja Applen
// SpokenWord-mallissa) + DefaultToSpeaker + MixWithOthers + AllowBluetoothA2DP.
// Bluetooth-MIKROFONIA (AllowBluetooth = HFP) ei sallita: omistajan linjaus 21.8.2026
// (AaniIstunto.swift), kuuloke putoaisi puheluprofiiliin. A2DP pitää kuulokkeet ulostulona.
// DuckOthers jätetään pois: vaimennus purkautuisi vasta setActive:NO:lla (ks. alla).
// Lopussa AIEMPI luokka, tila ja valinnat palautetaan sellaisenaan (tavallisesti
// MatkakirjaAani.mm:n Playback + SpokenAudio + MixWithOthers tai Unityn oletus Ambient),
// ja istunto pidetään aktiivisena. setActive:NO:ta EI kutsuta: toisin kuin kuoren
// WKWebView (ääni eri prosessissa), Unityn RemoteIO soi tässä prosessissa, ja
// deaktivointi pysäyttäisi sen (AVAudioSessionErrorCodeIsBusy) eli peli jäisi mykäksi.
//
// Keskeytykset (kuoren sanelu-keskeytyi): sovellus taustalle, ääni-istunnon keskeytys
// (puhelu), mediapalveluiden nollaus, moottorin kokoonpanomuutos ja vieras luokanvaihto
// kesken kuuntelun (esim. joku asettaa Playbackin) päättävät sanelun heti.
//
// Info.plist: NSMicrophoneUsageDescription ja NSSpeechRecognitionUsageDescription.
// Ilman niitä iOS kaataa sovelluksen lupaa kysyttäessä, joten Saatavilla = 0, jos
// kumpikin ei ole paikallaan (luetaan NSBundle infoDictionarysta).
//
// Linkitys kuten MatkakirjaKuvat.mm: .linker_option ilman pbxproj-muutoksia.
// Vaatii: ARC, iOS 13+ (supportsOnDeviceRecognition; projektin minimi 17.0).

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <Speech/Speech.h>

#if !__has_feature(objc_arc)
#error "MatkakirjaSanelu.mm vaatii ARC:n (-fobjc-arc)"
#endif

__asm__(".linker_option \"-framework\", \"Speech\"\n"
        ".linker_option \"-framework\", \"AVFoundation\"\n");

// Tapahtumalajit (Sanelu.cs: Laji).
enum
{
    MatkakirjaSanelu_Osittainen = 0,
    MatkakirjaSanelu_Valmis = 1,
    MatkakirjaSanelu_Virhe = 2,
    MatkakirjaSanelu_Alkoi = 3,
    MatkakirjaSanelu_Kuuntelee = 4,
    MatkakirjaSanelu_Loppui = 5,
};

// Virhelajit (Sanelu.cs: SaneluVirhe).
enum
{
    MatkakirjaSanelu_EiSaatavilla = 1,
    MatkakirjaSanelu_Lupa = 2,
    MatkakirjaSanelu_EiKuultu = 3,
    MatkakirjaSanelu_Keskeytyi = 4,
    MatkakirjaSanelu_Muu = 5,
};

// Miksi mikrofoni suljettiin (vaikuttaa tyhjän tuloksen tulkintaan).
typedef NS_ENUM(int, MatkakirjaSaneluSyy) {
    SyyEi = 0,
    SyyNappi,       // Lopeta: tyhjä teksti on VALMIS("") (web: ei kysymystä, ei moitetta)
    SyyItsestaan,   // hiljaisuus, alun odotus tai aikaraja: tyhjä → "En kuullut mitään"
    SyyKeskeytys,   // taustalle, puhelu …: tyhjä → "Sanelu keskeytyi"
};

typedef void (*MatkakirjaSanelu_Kutsu)(int pyynto, int laji, int koodi, const char* teksti);

static NSString* const MatkakirjaSanelu_Kieli = @"fi-FI";          // web PUHE_KIELI
static const int64_t MatkakirjaSanelu_ViimeistelyMs = 2000;         // lopullisen tuloksen odotus

// Webin (pollo.js saneluVirhe) ja kuoren lauseet.
static NSString* const Teksti_EiKuultu = @"En kuullut mitään. Yritä uudelleen.";
static NSString* const Teksti_Keskeytyi = @"Sanelu keskeytyi. Yritä uudelleen.";
static NSString* const Teksti_Muu = @"Sanelu ei onnistunut. Voit myös kirjoittaa.";
static NSString* const Teksti_Mikrofonilupa =
    @"Mikrofonin käyttö ei ole sallittu. Voit sallia sen iOS:n Asetuksissa kohdassa Matkakirja.";
static NSString* const Teksti_Puhelupa =
    @"Puheentunnistuksen käyttö ei ole sallittu. Voit sallia sen iOS:n Asetuksissa kohdassa Matkakirja.";
static NSString* const Teksti_EiSuomea = @"Puheentunnistus ei osaa suomea tällä laitteella. Voit kirjoittaa kysymyksen.";
static NSString* const Teksti_EiNyt =
    @"Puheentunnistus ei ole juuri nyt käytettävissä. Tarkista verkkoyhteys tai kirjoita kysymys.";
static NSString* const Teksti_EiMikrofonia = @"Mikrofonia ei saatu käyttöön. Yritä uudelleen.";

static BOOL MatkakirjaSanelu_Avain(NSString* avain)
{
    id arvo = [[NSBundle mainBundle] objectForInfoDictionaryKey:avain];
    return [arvo isKindOfClass:[NSString class]] && [(NSString*)arvo length] > 0;
}

// --- tila ------------------------------------------------------------------------

@interface MatkakirjaSanelu : NSObject
@property (nonatomic) int pyynto;                     // 0 = ei sanelua
@property (nonatomic) MatkakirjaSanelu_Kutsu kutsu;
@property (nonatomic) int hiljaisuusMs, alkuMs, enintaanMs;
@property (nonatomic, strong) SFSpeechRecognizer* tunnistin;
@property (nonatomic, strong) AVAudioEngine* moottori;
@property (nonatomic, strong) SFSpeechAudioBufferRecognitionRequest* tunnistusPyynto;
@property (nonatomic, strong) SFSpeechRecognitionTask* tehtava;
@property (nonatomic, copy) NSString* teksti;         // viimeisin tunnistettu
@property (nonatomic) int muutokset;                  // tekstin muutoslaskuri (hiljaisuusajastin)
@property (nonatomic) BOOL kuuntelee;                 // moottori käynnissä, mikrofoni auki
@property (nonatomic) BOOL aaniTauolla;               // ALKOI lähetetty, LOPPUI ei vielä
@property (nonatomic) BOOL istuntoVaihdettu;          // PlayAndRecord asetettu, palautus kesken
@property (nonatomic) MatkakirjaSaneluSyy syy;
@property (nonatomic, copy) AVAudioSessionCategory aiempiLuokka;
@property (nonatomic, copy) AVAudioSessionMode aiempiTila;
@property (nonatomic) AVAudioSessionCategoryOptions aiemmatValinnat;
@end

static MatkakirjaSanelu* MatkakirjaSanelu_tila = nil;

@implementation MatkakirjaSanelu

+ (MatkakirjaSanelu*)hae
{
    if (MatkakirjaSanelu_tila == nil)
    {
        MatkakirjaSanelu_tila = [MatkakirjaSanelu new];
        [MatkakirjaSanelu_tila kuunteleJarjestelmaa];
    }
    return MatkakirjaSanelu_tila;
}

// --- kutsut Unityyn ---

- (void)laheta:(int)laji koodi:(int)koodi teksti:(NSString*)teksti pyynto:(int)pyynto
{
    MatkakirjaSanelu_Kutsu k = self.kutsu;
    if (!k) return;
    k(pyynto, laji, koodi, (teksti ?: @"").UTF8String);
}

/// VALMIS tai VIRHE (tasan kerran) ja pyyntö pois. Mikrofonin on oltava jo kiinni.
- (void)paatos:(int)laji koodi:(int)koodi teksti:(NSString*)teksti
{
    int p = self.pyynto;
    if (p == 0) return;
    [self.tehtava cancel];
    self.tehtava = nil;
    self.tunnistusPyynto = nil;
    self.tunnistin = nil;
    self.pyynto = 0;
    [self laheta:laji koodi:koodi teksti:teksti pyynto:p];
}

/// Tuloksen tulkinta mikrofonin sulkeuduttua (ks. MatkakirjaSaneluSyy).
- (void)viimeistele
{
    if (self.pyynto == 0) return;
    NSString* t = [self.teksti stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] ?: @"";
    if (t.length > 0 || self.syy == SyyNappi)
        [self paatos:MatkakirjaSanelu_Valmis koodi:0 teksti:t];
    else if (self.syy == SyyKeskeytys)
        [self paatos:MatkakirjaSanelu_Virhe koodi:MatkakirjaSanelu_Keskeytyi teksti:Teksti_Keskeytyi];
    else
        [self paatos:MatkakirjaSanelu_Virhe koodi:MatkakirjaSanelu_EiKuultu teksti:Teksti_EiKuultu];
}

/// Virhe ennen kuuntelua tai sen aikana: kaikki kiinni ja VIRHE.
- (void)virhe:(int)koodi teksti:(NSString*)teksti
{
    [self suljeMikrofoni];
    [self paatos:MatkakirjaSanelu_Virhe koodi:koodi teksti:teksti];
}

// --- ääni-istunto ---

- (BOOL)sanelutila:(NSError**)virhe
{
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    if (!self.istuntoVaihdettu)
    {
        self.aiempiLuokka = istunto.category;
        self.aiempiTila = istunto.mode;
        self.aiemmatValinnat = istunto.categoryOptions;
    }
    AVAudioSessionCategoryOptions valinnat = AVAudioSessionCategoryOptionDefaultToSpeaker
                                           | AVAudioSessionCategoryOptionMixWithOthers
                                           | AVAudioSessionCategoryOptionAllowBluetoothA2DP;
    if (![istunto setCategory:AVAudioSessionCategoryPlayAndRecord
                         mode:AVAudioSessionModeMeasurement
                      options:valinnat
                        error:virhe])
        return NO;
    self.istuntoVaihdettu = YES;
    if (![istunto setActive:YES error:virhe]) return NO;
    // Sisäänrakennettu mikrofoni nimenomaan (omistaja 21.8.2026). Epäonnistuminen ei estä:
    // luokka ilman AllowBluetoothia on jo sulkenut Bluetooth-mikrofonin pois.
    for (AVAudioSessionPortDescription* portti in istunto.availableInputs)
    {
        if ([portti.portType isEqualToString:AVAudioSessionPortBuiltInMic])
        {
            [istunto setPreferredInput:portti error:nil];
            break;
        }
    }
    return YES;
}

/// Aiempi luokka takaisin, istunto aktiivisena (ei setActive:NO, ks. alku).
- (void)palautaIstunto
{
    if (!self.istuntoVaihdettu) return;
    self.istuntoVaihdettu = NO;
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    [istunto setPreferredInput:nil error:nil];
    AVAudioSessionCategory luokka = self.aiempiLuokka;
    AVAudioSessionMode tila = self.aiempiTila ?: AVAudioSessionModeDefault;
    AVAudioSessionCategoryOptions valinnat = self.aiemmatValinnat;
    if (luokka == nil
        || [luokka isEqualToString:AVAudioSessionCategoryPlayAndRecord]
        || [luokka isEqualToString:AVAudioSessionCategoryRecord])
    {
        // Ei järkevää aiempaa: MatkakirjaAani.mm:n toistotila.
        luokka = AVAudioSessionCategoryPlayback;
        tila = AVAudioSessionModeSpokenAudio;
        valinnat = AVAudioSessionCategoryOptionMixWithOthers;
    }
    NSError* virhe = nil;
    if (![istunto setCategory:luokka mode:tila options:valinnat error:&virhe])
    {
        NSLog(@"MATKAKIRJA sanelu: istunnon palautus (%@) epäonnistui: %@", luokka, virhe);
        virhe = nil;
        [istunto setCategory:AVAudioSessionCategoryPlayback
                        mode:AVAudioSessionModeSpokenAudio
                     options:AVAudioSessionCategoryOptionMixWithOthers
                       error:&virhe];
    }
    if (![istunto setActive:YES error:&virhe])
        NSLog(@"MATKAKIRJA sanelu: setActive palautuksessa epäonnistui: %@", virhe);
}

// --- mikrofoni ---

/// Moottori kiinni, äänen syöttö loppuu (tunnistustehtävä saa viimeistellä), istunto
/// palautetaan ja LOPPUI lähetetään. Turvallinen kutsua monta kertaa.
- (void)suljeMikrofoni
{
    AVAudioEngine* m = self.moottori;
    if (m)
    {
        if (m.isRunning) [m stop];
        [m.inputNode removeTapOnBus:0];
        self.moottori = nil;
    }
    [self.tunnistusPyynto endAudio];
    self.kuuntelee = NO;
    [self palautaIstunto];
    if (self.aaniTauolla)
    {
        self.aaniTauolla = NO;
        [self laheta:MatkakirjaSanelu_Loppui koodi:0 teksti:nil pyynto:self.pyynto];
    }
}

/// Mikrofoni kiinni syyn kera; lopullista tulosta odotetaan enintään ViimeistelyMs.
- (void)paata:(MatkakirjaSaneluSyy)syy
{
    if (self.pyynto == 0) return;
    if (self.syy == SyyEi) self.syy = syy;
    BOOL oliAuki = self.kuuntelee;
    [self suljeMikrofoni];
    if (syy == SyyKeskeytys || !oliAuki || self.tehtava == nil)
    {
        // Taustalla tai ennen kuuntelua ei jäädä odottamaan (kuoren keskeyta: siivoa heti).
        [self viimeistele];
        return;
    }
    int p = self.pyynto;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, MatkakirjaSanelu_ViimeistelyMs * NSEC_PER_MSEC),
                   dispatch_get_main_queue(), ^{
        if (self.pyynto == p) [self viimeistele];
    });
}

// Ajastimet: hiljaisuus puheen jälkeen, ei puhetta alussa, aikaraja. Tunnistettu teksti on
// puheen merkki (selaimen continuous=false päättyy samoin itsestään).
- (void)ajastaHiljaisuus:(int)ms
{
    if (ms <= 0) return;
    int p = self.pyynto, m = self.muutokset;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)ms * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
        if (self.pyynto == p && self.kuuntelee && self.muutokset == m) [self paata:SyyItsestaan];
    });
}

- (void)ajastaAikaraja
{
    if (self.enintaanMs <= 0) return;
    int p = self.pyynto;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)self.enintaanMs * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
        if (self.pyynto == p && self.kuuntelee) [self paata:SyyItsestaan];
    });
}

// --- aloitus ---

/// Luvat järjestyksessä (puhe, mikrofoni); valmis pääsäikeessä: nil = kunnossa, muuten virheteksti.
+ (void)pyydaLuvat:(void (^)(NSString* este))valmis
{
    void (^mikrofoni)(void) = ^{
        void (^vastaus)(BOOL) = ^(BOOL myonnetty) {
            dispatch_async(dispatch_get_main_queue(), ^{ valmis(myonnetty ? nil : Teksti_Mikrofonilupa); });
        };
        if (@available(iOS 17.0, *))
            [AVAudioApplication requestRecordPermissionWithCompletionHandler:vastaus];
        else
        {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
            [[AVAudioSession sharedInstance] requestRecordPermission:vastaus];
#pragma clang diagnostic pop
        }
    };
    [SFSpeechRecognizer requestAuthorization:^(SFSpeechRecognizerAuthorizationStatus tila) {
        if (tila != SFSpeechRecognizerAuthorizationStatusAuthorized)
        {
            dispatch_async(dispatch_get_main_queue(), ^{ valmis(Teksti_Puhelupa); });
            return;
        }
        mikrofoni();
    }];
}

- (void)aloita
{
    int p = self.pyynto;
    SFSpeechRecognizer* tunnistin = [[SFSpeechRecognizer alloc] initWithLocale:[NSLocale localeWithLocaleIdentifier:MatkakirjaSanelu_Kieli]];
    if (tunnistin == nil) { [self virhe:MatkakirjaSanelu_EiSaatavilla teksti:Teksti_EiSuomea]; return; }
    self.tunnistin = tunnistin;

    [MatkakirjaSanelu pyydaLuvat:^(NSString* este) {
        if (self.pyynto != p) return;   // peruttu tai korvattu lupien odotuksen aikana
        if (este) { [self virhe:MatkakirjaSanelu_Lupa teksti:este]; return; }
        if (self.syy != SyyEi) { [self viimeistele]; return; }   // Lopeta ennen mikrofonia
        if (!tunnistin.isAvailable) { [self virhe:MatkakirjaSanelu_EiSaatavilla teksti:Teksti_EiNyt]; return; }
        [self kaynnista];
    }];
}

- (AVAudioFormat*)tuoreMoottori
{
    // Moottori luodaan UUTENA vasta nauhoitusistunnon jälkeen: kierrätetty moottori jäi
    // toistoluokan syötepolkuun ja raportoi 0 Hz (kuori, omistajan iPhone 13.8.2026).
    self.moottori = [AVAudioEngine new];
    AVAudioInputNode* syote = self.moottori.inputNode;
    AVAudioFormat* muoto = [syote outputFormatForBus:0];
    if (muoto.sampleRate <= 0) muoto = [syote inputFormatForBus:0];
    return muoto;
}

- (void)kaynnista
{
    int p = self.pyynto;
    self.teksti = @"";
    self.muutokset = 0;

    // Äänet tauolle ennen mikrofonia (web taukoaSanelunAjaksi; B7 pysäyttää maiseman ja pohjan).
    self.aaniTauolla = YES;
    [self laheta:MatkakirjaSanelu_Alkoi koodi:0 teksti:nil pyynto:p];
    if (self.pyynto != p) return;   // Unity perui ALKOI-kutsussa

    NSError* virhe = nil;
    if (![self sanelutila:&virhe])
    {
        NSLog(@"MATKAKIRJA sanelu: sanelutila: %@", virhe);
        [self virhe:MatkakirjaSanelu_Muu teksti:Teksti_EiMikrofonia];
        return;
    }

    AVAudioFormat* muoto = [self tuoreMoottori];
    if (muoto.sampleRate <= 0 || muoto.channelCount == 0)
    {
        // Varaporras (kuori): istunto uudelleen päälle ja vielä yksi tuore moottori.
        self.moottori = nil;
        [[AVAudioSession sharedInstance] setActive:YES error:nil];
        muoto = [self tuoreMoottori];
    }
    if (muoto.sampleRate <= 0 || muoto.channelCount == 0)
    {
        NSLog(@"MATKAKIRJA sanelu: syötteen muoto 0 Hz");
        [self virhe:MatkakirjaSanelu_Muu teksti:Teksti_EiMikrofonia];
        return;
    }

    SFSpeechAudioBufferRecognitionRequest* pyynto = [SFSpeechAudioBufferRecognitionRequest new];
    pyynto.shouldReportPartialResults = YES;   // web interimResults
    pyynto.taskHint = SFSpeechRecognitionTaskHintDictation;
    if (self.tunnistin.supportsOnDeviceRecognition) pyynto.requiresOnDeviceRecognition = YES;
    if (@available(iOS 16.0, *)) pyynto.addsPunctuation = YES;
    self.tunnistusPyynto = pyynto;

    SFSpeechAudioBufferRecognitionRequest* __weak heikkoPyynto = pyynto;
    [self.moottori.inputNode installTapOnBus:0 bufferSize:1024 format:muoto
                                       block:^(AVAudioPCMBuffer* puskuri, AVAudioTime* aika) {
        [heikkoPyynto appendAudioPCMBuffer:puskuri];
    }];

    self.tunnistin.queue = [NSOperationQueue mainQueue];
    self.tehtava = [self.tunnistin recognitionTaskWithRequest:pyynto
                                                resultHandler:^(SFSpeechRecognitionResult* tulos, NSError* virhe) {
        dispatch_async(dispatch_get_main_queue(), ^{ [self tulos:tulos virhe:virhe pyynto:p]; });
    }];

    [self.moottori prepare];
    if (![self.moottori startAndReturnError:&virhe])
    {
        NSLog(@"MATKAKIRJA sanelu: moottori ei käynnistynyt: %@", virhe);
        [self virhe:MatkakirjaSanelu_Muu teksti:Teksti_EiMikrofonia];
        return;
    }

    self.kuuntelee = YES;
    NSLog(@"MATKAKIRJA sanelu: kuuntelee (%@, laitteella %d, %.0f Hz)", MatkakirjaSanelu_Kieli,
          (int)pyynto.requiresOnDeviceRecognition, muoto.sampleRate);
    [self laheta:MatkakirjaSanelu_Kuuntelee koodi:0 teksti:nil pyynto:p];
    if (self.pyynto != p || !self.kuuntelee) return;
    [self ajastaHiljaisuus:self.alkuMs];   // ei puhetta alussa (muutokset == 0)
    [self ajastaAikaraja];
}

- (void)tulos:(SFSpeechRecognitionResult*)tulos virhe:(NSError*)virhe pyynto:(int)p
{
    if (self.pyynto != p) return;
    if (tulos)
    {
        NSString* t = tulos.bestTranscription.formattedString ?: @"";
        if (tulos.isFinal)
        {
            self.teksti = t;
            if (self.syy == SyyEi) self.syy = SyyItsestaan;
            [self suljeMikrofoni];
            [self viimeistele];
            return;
        }
        if (![t isEqualToString:self.teksti])
        {
            self.teksti = t;
            self.muutokset++;
            [self laheta:MatkakirjaSanelu_Osittainen koodi:0 teksti:t pyynto:p];
            if (self.pyynto == p) [self ajastaHiljaisuus:self.hiljaisuusMs];
        }
    }
    if (virhe && self.pyynto == p)
    {
        NSInteger n = virhe.code;
        // 1110 ei puhetta, 216/301 peruttu, 203 "Retry" (tyypillisesti hiljaisuus): ei vika.
        BOOL hiljaisuus = (n == 1110 || n == 216 || n == 301 || n == 203);
        NSLog(@"MATKAKIRJA sanelu: tunnistus päättyi virheeseen %@ %ld (%@)", virhe.domain, (long)n,
              virhe.localizedDescription);
        if (self.syy == SyyEi) self.syy = SyyItsestaan;
        [self suljeMikrofoni];
        BOOL tekstia = [self.teksti stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]].length > 0;
        if (hiljaisuus || tekstia || self.syy != SyyItsestaan) [self viimeistele];
        else [self paatos:MatkakirjaSanelu_Virhe koodi:MatkakirjaSanelu_Muu teksti:Teksti_Muu];
    }
}

// --- järjestelmän keskeytykset (kuoren keskeyta) ---

- (void)kuunteleJarjestelmaa
{
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    NSOperationQueue* paa = [NSOperationQueue mainQueue];
    void (^keskeyta)(NSString*) = ^(NSString* miksi) {
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || s.pyynto == 0 || !(s.kuuntelee || s.aaniTauolla)) return;
        NSLog(@"MATKAKIRJA sanelu: keskeytys (%@)", miksi);
        [s paata:SyyKeskeytys];
    };
    [nc addObserverForName:UIApplicationDidEnterBackgroundNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) { keskeyta(@"taustalle"); }];
    [nc addObserverForName:AVAudioSessionInterruptionNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        if ([n.userInfo[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue] == AVAudioSessionInterruptionTypeBegan)
            keskeyta(@"istunnon keskeytys");
    }];
    [nc addObserverForName:AVAudioSessionMediaServicesWereResetNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s) s.istuntoVaihdettu = NO;   // istunto on nollattu, vanhaa ei palauteta
        keskeyta(@"mediapalvelut nollattu");
    }];
    [nc addObserverForName:AVAudioSessionRouteChangeNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        if ([n.userInfo[AVAudioSessionRouteChangeReasonKey] unsignedIntegerValue] != AVAudioSessionRouteChangeReasonCategoryChange)
            return;
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || !s.kuuntelee) return;
        if ([[AVAudioSession sharedInstance].category isEqualToString:AVAudioSessionCategoryPlayAndRecord]) return;
        // Joku muu vaihtoi luokan kesken kuuntelun: sen asetusta ei kumota palautuksella.
        s.istuntoVaihdettu = NO;
        keskeyta(@"vieras luokanvaihto");
    }];
    [nc addObserverForName:AVAudioEngineConfigurationChangeNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || !s.kuuntelee || n.object != s.moottori) return;
        if (!s.moottori.isRunning) keskeyta(@"moottorin kokoonpano muuttui");
    }];
}

@end

// --- C-rajapinta -------------------------------------------------------------------

extern "C" int MatkakirjaSanelu_Saatavilla(void)
{
    static int tulos = -1;
    if (tulos >= 0) return tulos;
    BOOL mikki = MatkakirjaSanelu_Avain(@"NSMicrophoneUsageDescription");
    BOOL puhe = MatkakirjaSanelu_Avain(@"NSSpeechRecognitionUsageDescription");
    if (!mikki || !puhe)
    {
        // Ilman avaimia iOS kaataisi sovelluksen lupaa kysyttäessä.
        NSLog(@"MATKAKIRJA sanelu: Info.plististä puuttuu%@%@, sanelu pois",
              mikki ? @"" : @" NSMicrophoneUsageDescription", puhe ? @"" : @" NSSpeechRecognitionUsageDescription");
        tulos = 0;
        return tulos;
    }
    SFSpeechRecognizer* t = [[SFSpeechRecognizer alloc] initWithLocale:[NSLocale localeWithLocaleIdentifier:MatkakirjaSanelu_Kieli]];
    tulos = t != nil ? 1 : 0;
    if (!tulos) NSLog(@"MATKAKIRJA sanelu: SFSpeechRecognizer ei tue kieltä %@", MatkakirjaSanelu_Kieli);
    return tulos;
}

extern "C" void MatkakirjaSanelu_Aloita(int pyynto, int hiljaisuusMs, int alkuMs, int enintaanMs,
                                        MatkakirjaSanelu_Kutsu kutsu)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        MatkakirjaSanelu* s = [MatkakirjaSanelu hae];
        // Uusi aloitus kesken sanelun = aloita alusta (kuori). Edellinen perutaan hiljaa.
        if (s.pyynto != 0)
        {
            [s suljeMikrofoni];
            [s.tehtava cancel];
            s.tehtava = nil;
            s.tunnistusPyynto = nil;
            s.pyynto = 0;
        }
        s.pyynto = pyynto;
        s.kutsu = kutsu;
        s.hiljaisuusMs = hiljaisuusMs;
        s.alkuMs = alkuMs;
        s.enintaanMs = enintaanMs;
        s.syy = SyyEi;
        s.teksti = @"";
        if (!MatkakirjaSanelu_Saatavilla())
        {
            [s virhe:MatkakirjaSanelu_EiSaatavilla teksti:@"Sanelu ei ole käytettävissä tällä laitteella."];
            return;
        }
        [s aloita];
    });
}

extern "C" void MatkakirjaSanelu_Lopeta(int pyynto)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || s.pyynto == 0 || s.pyynto != pyynto) return;
        if (!s.kuuntelee && !s.aaniTauolla)
        {
            // Lupien odotus kesken: merkitään, aloita viimeistelee luvan tultua.
            if (s.syy == SyyEi) s.syy = SyyNappi;
            return;
        }
        [s paata:SyyNappi];
    });
}

extern "C" void MatkakirjaSanelu_Keskeyta(int pyynto)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || s.pyynto == 0 || s.pyynto != pyynto) return;
        if (!s.kuuntelee && !s.aaniTauolla) { if (s.syy == SyyEi) s.syy = SyyKeskeytys; return; }
        [s paata:SyyKeskeytys];
    });
}

extern "C" void MatkakirjaSanelu_Peruuta(int pyynto)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        MatkakirjaSanelu* s = MatkakirjaSanelu_tila;
        if (s == nil || s.pyynto == 0 || s.pyynto != pyynto) return;
        // Web lopetaSanelu({laheta:false}): abort, ei tulosta.
        [s suljeMikrofoni];
        [s.tehtava cancel];
        s.tehtava = nil;
        s.tunnistusPyynto = nil;
        s.tunnistin = nil;
        s.pyynto = 0;
    });
}
