// MatkakirjaPuhekanava.mm — Pulun äänikeskustelun mikrofoni ja kaiutin (Pelikoodari, 28.9.2026).
//
// Web: js/pulu-realtime.js (getUserMedia echoCancellation + AudioWorklet → PCM16 24 kHz → xAI Grok Voice
// Agent, vastaus pelin puhepiirin läpi). Tämä on sen natiiviosa; WebSocket, token ja tapahtumat ovat
// Unity-puolella (Scripts/Peli/PuluRealtime.cs, puhdas logiikka Peli/PuluRealtimeLogiikka.cs).
//
// MIKROFONI: AVAudioEngine, inputNode setVoiceProcessingEnabled:YES (Applen kaiunpoisto, kohinanvaimennus ja
// AGC — webin echoCancellation/noiseSuppression/autoGainControl), tap → AVAudioConverter 24 kHz mono Int16 →
// säieturvallinen rengaspuskuri (4 s; täyttyessä vanhin pois). Unity lukee puskuria taustasäikeestä
// (MatkakirjaPuhekanava_Lue) ~40 ms välein ja lähettää input_audio_buffer.append-viesteinä.
//
// KAIUTIN (oletus): vastausääni soi SAMAN moottorin AVAudioPlayerNodesta (MatkakirjaPuhekanava_Soita,
// float 24 kHz mono). Kaiunpoiston viitesignaali on vain voice processing -yksikön oma ulostulo: Unityn
// AudioSourcen (oma RemoteIO) soittama Pulu kuuluisi mikrofoniin, server VAD tulkitsisi sen pelaajan puheeksi
// ja Pulu keskeyttäisi itsensä (speech_started). Unity-toisto on silti valittavissa (pulu realtime toisto unity).
// Muun äänen (Unityn musiikki, tehosteet) vaimennus: iOS 17:n voiceProcessingOtherAudioDuckingConfiguration
// pienimmälle tasolle ilman advanced duckingia.
//
// ÄÄNI-ISTUNTO kuten MatkakirjaSanelu.mm (omistajan linjaus 21.8.2026): PlayAndRecord + DefaultToSpeaker +
// MixWithOthers + AllowBluetoothA2DP, EI AllowBluetoothia (HFP-mikrofoni pudottaisi kuulokkeet puheluprofiiliin),
// sisäänrakennettu mikrofoni ensisijaiseksi. Tila on VoiceChat (kaiunpoiston tila), ei sanelun Measurement.
// Lopussa AIEMPI luokka, tila ja valinnat palautetaan ja istunto jää aktiiviseksi (setActive:NO pysäyttäisi
// Unityn RemoteIO:n, ks. MatkakirjaSanelu.mm).
//
// KESKEYTYKSET (kuten sanelussa): sovellus taustalle, istunnon keskeytys (puhelu), mediapalveluiden nollaus,
// vieras luokanvaihto kesken keskustelun → mikrofoni kiinni, istunto palautetaan ja
// MatkakirjaPuhekanava_Tila = Keskeytetty; Unity lopettaa keskustelun seuraavassa ruudussa.
// UUDELLEENKÄYNNISTYS (Laitetestaajan savuke 28.9.: kanava katkesi ~6 s:ssa 3/3, syöte 192 kHz): moottorin
// kokoonpanon muutos ja reitin vaihto (kuulokkeet kiinni/irti) eivät sulje kanavaa, vaan moottori käynnistetään
// uudelleen mikin nykyisestä muodosta (ensin sama moottori, sitten uusi); kanava pysyy auki ja Unity jatkaa samaa
// WebSocketia. Keskeytys vasta, jos uudelleenkäynnistys epäonnistuu tai toistuu yli 5 kertaa 30 s:ssa.
//
// Info.plist: NSMicrophoneUsageDescription (Editor/Rakennus.cs PaikallinenVerkkoPlist, sama kuin sanelulla).
// Ilman sitä iOS kaataisi sovelluksen lupaa kysyttäessä: Lupa = EiKuvausta eikä mitään kysytä.
//
// SÄIKEET: Aloita, Lopeta, Tila, Lupa ja PyydaLupa pääsäikeestä (Unityn säie iOS:ssä). Lue, Soita, Vaienna ja
// Jonossa mistä säikeestä tahansa (rengas ja soitin lukkojen takana).
// Linkitys kuten MatkakirjaSanelu.mm: .linker_option ilman pbxproj-muutoksia. Vaatii ARC:n, iOS 17 (projektin minimi).

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#include <algorithm>
#include <atomic>
#include <cstring>
// Testimykistys (MatkakirjaAani.mm, Pelikoodari 5.10.2026).
extern "C" void MatkakirjaAani_SovitaMykistys(AVAudioEngine* moottori);
#include <mutex>
#include <vector>

#if !__has_feature(objc_arc)
#error "MatkakirjaPuhekanava.mm vaatii ARC:n (-fobjc-arc)"
#endif

__asm__(".linker_option \"-framework\", \"AVFoundation\"\n");

// Tila (PuluRealtime.cs: KanavaTila).
enum
{
    MatkakirjaPuhekanava_Kiinni = 0,
    MatkakirjaPuhekanava_Auki = 1,
    MatkakirjaPuhekanava_Keskeytetty = 2,
};

// Mikrofonilupa (PuluRealtime.cs: Lupa).
enum
{
    MatkakirjaPuhekanava_LupaKysymatta = 0,
    MatkakirjaPuhekanava_LupaMyonnetty = 1,
    MatkakirjaPuhekanava_LupaEvatty = 2,
    MatkakirjaPuhekanava_LupaEiKuvausta = 3,
};

// Aloita-kutsun tulos (PuluRealtime.cs: AloitusVirhe).
enum
{
    MatkakirjaPuhekanava_Ok = 0,
    MatkakirjaPuhekanava_EiLupaa = 1,
    MatkakirjaPuhekanava_EiIstuntoa = 2,
    MatkakirjaPuhekanava_EiMuotoa = 3,
    MatkakirjaPuhekanava_EiMoottoria = 4,
};

static const double MatkakirjaPuhekanava_Taajuus = 24000.0;          // xAI audio/pcm, web REALTIME_ULOS_TAAJUUS
static const size_t MatkakirjaPuhekanava_RengasTavut = 24000 * 2 * 4; // 4 s PCM16 mono

// --- rengaspuskuri (tap-säie kirjoittaa, Unityn lähetyssäie lukee) --------------------------------------

namespace
{
class Rengas
{
public:
    Rengas() : data(MatkakirjaPuhekanava_RengasTavut) {}

    void Kirjoita(const uint8_t* p, size_t n)
    {
        std::lock_guard<std::mutex> l(lukko);
        size_t koko = data.size();
        if (n >= koko)
        {
            // Pala on koko rengasta pidempi: vain sen loppu mahtuu.
            p += n - koko;
            n = koko;
        }
        size_t yli = maara + n > koko ? maara + n - koko : 0;
        if (yli > 0)
        {
            // Täynnä: vanhin ääni pois (lähetys on jäänyt jälkeen; tuore puhe on tärkeämpää).
            alku = (alku + yli) % koko;
            maara -= yli;
        }
        size_t kirj = (alku + maara) % koko;
        size_t eka = std::min(n, koko - kirj);
        std::memcpy(&data[kirj], p, eka);
        if (n > eka) std::memcpy(&data[0], p + eka, n - eka);
        maara += n;
    }

    size_t Lue(uint8_t* p, size_t max)
    {
        std::lock_guard<std::mutex> l(lukko);
        size_t n = std::min(max, maara) & ~(size_t)1;   // kokonaiset Int16-näytteet
        size_t koko = data.size();
        size_t eka = std::min(n, koko - alku);
        std::memcpy(p, &data[alku], eka);
        if (n > eka) std::memcpy(p + eka, &data[0], n - eka);
        alku = (alku + n) % koko;
        maara -= n;
        return n;
    }

    void Tyhjenna()
    {
        std::lock_guard<std::mutex> l(lukko);
        alku = maara = 0;
    }

private:
    std::mutex lukko;
    std::vector<uint8_t> data;
    size_t alku = 0, maara = 0;
};

Rengas MatkakirjaPuhekanava_rengas;
std::atomic<int> MatkakirjaPuhekanava_tila(MatkakirjaPuhekanava_Kiinni);
std::mutex MatkakirjaPuhekanava_soittoLukko;             // soitin ja sen purku
std::atomic<long long> MatkakirjaPuhekanava_jonossa(0);  // soittamatta olevat näytteet
std::atomic<int> MatkakirjaPuhekanava_sukupolvi(0);      // Vaienna kasvattaa: vanhat valmistumiset ohi
}

static BOOL MatkakirjaPuhekanava_Kuvaus(void)
{
    id arvo = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"NSMicrophoneUsageDescription"];
    return [arvo isKindOfClass:[NSString class]] && [(NSString*)arvo length] > 0;
}

// --- tila ------------------------------------------------------------------------------------------------

@interface MatkakirjaPuhekanava : NSObject
@property (nonatomic, strong) AVAudioEngine* moottori;
@property (nonatomic, strong) AVAudioPlayerNode* soitin;     // luetaan soittoLukon alla
@property (nonatomic, strong) AVAudioFormat* soittoMuoto;
@property (nonatomic) BOOL istuntoVaihdettu;
@property (nonatomic, copy) AVAudioSessionCategory aiempiLuokka;
@property (nonatomic, copy) AVAudioSessionMode aiempiTila;
@property (nonatomic) AVAudioSessionCategoryOptions aiemmatValinnat;
@property (nonatomic) BOOL uudelleenJonossa;                 // kokoonpanon/reitin muutos odottaa uudelleenkäynnistystä
@property (nonatomic) int uudelleenMaara;                    // uudelleenkäynnistykset ikkunassa (silmukkavahti)
@property (nonatomic) CFAbsoluteTime uudelleenIkkuna;        // ikkunan alku
@end

static MatkakirjaPuhekanava* MatkakirjaPuhekanava_olio = nil;

@implementation MatkakirjaPuhekanava

+ (MatkakirjaPuhekanava*)hae
{
    if (MatkakirjaPuhekanava_olio == nil)
    {
        MatkakirjaPuhekanava_olio = [MatkakirjaPuhekanava new];
        [MatkakirjaPuhekanava_olio kuunteleJarjestelmaa];
    }
    return MatkakirjaPuhekanava_olio;
}

// --- ääni-istunto (MatkakirjaSanelu.mm sanelutila/palautaIstunto, tila VoiceChat) ---

- (BOOL)keskustelutila:(NSError**)virhe
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
                         mode:AVAudioSessionModeVoiceChat
                      options:valinnat
                        error:virhe])
        return NO;
    self.istuntoVaihdettu = YES;
    if (![istunto setActive:YES error:virhe]) return NO;
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

/// Aiempi luokka takaisin, istunto aktiivisena (ei setActive:NO, ks. MatkakirjaSanelu.mm).
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
        NSLog(@"MATKAKIRJA puhekanava: istunnon palautus (%@) epäonnistui: %@", luokka, virhe);
        virhe = nil;
        [istunto setCategory:AVAudioSessionCategoryPlayback
                        mode:AVAudioSessionModeSpokenAudio
                     options:AVAudioSessionCategoryOptionMixWithOthers
                       error:&virhe];
    }
    if (![istunto setActive:YES error:&virhe])
        NSLog(@"MATKAKIRJA puhekanava: setActive palautuksessa epäonnistui: %@", virhe);
}

// --- moottori ---

- (int)aloita
{
    if (self.moottori) [self sulje];
    MatkakirjaPuhekanava_rengas.Tyhjenna();
    self.uudelleenMaara = 0;

    NSError* virhe = nil;
    if (![self keskustelutila:&virhe])
    {
        NSLog(@"MATKAKIRJA puhekanava: keskustelutila: %@", virhe);
        [self palautaIstunto];
        return MatkakirjaPuhekanava_EiIstuntoa;
    }
    int tulos = [self rakennaMoottori];
    if (tulos != MatkakirjaPuhekanava_Ok)
    {
        [self palautaIstunto];
        return tulos;
    }
    MatkakirjaPuhekanava_tila = MatkakirjaPuhekanava_Auki;
    return MatkakirjaPuhekanava_Ok;
}

/// Mikin tap syötteen NYKYISESTÄ muodosta: muunnin näytteistää sen taajuudesta (simulaattori 192 kHz,
/// kuulokkeet 16/48 kHz) 24 kHz monoksi rengaspuskuriin. Kutsutaan joka käynnistyksessä uudelleen.
- (int)asennaTap:(AVAudioInputNode*)syote
{
    AVAudioFormat* muoto = [syote outputFormatForBus:0];
    if (muoto.sampleRate <= 0 || muoto.channelCount == 0) muoto = [syote inputFormatForBus:0];
    if (muoto.sampleRate <= 0 || muoto.channelCount == 0)
    {
        NSLog(@"MATKAKIRJA puhekanava: syötteen muoto 0 Hz");
        return MatkakirjaPuhekanava_EiMuotoa;
    }

    AVAudioFormat* kohde = [[AVAudioFormat alloc] initWithCommonFormat:AVAudioPCMFormatInt16
                                                            sampleRate:MatkakirjaPuhekanava_Taajuus
                                                              channels:1
                                                           interleaved:YES];
    AVAudioConverter* muunnin = [[AVAudioConverter alloc] initFromFormat:muoto toFormat:kohde];
    if (muunnin == nil)
    {
        NSLog(@"MATKAKIRJA puhekanava: muunnin %@ → 24 kHz ei onnistu", muoto);
        return MatkakirjaPuhekanava_EiMuotoa;
    }
    muunnin.downmix = YES;   // voice processing voi antaa useamman kanavan: mono sekoittamalla
    double suhde = MatkakirjaPuhekanava_Taajuus / muoto.sampleRate;

    [syote installTapOnBus:0 bufferSize:1024 format:muoto block:^(AVAudioPCMBuffer* puskuri, AVAudioTime* aika) {
        // Tap-säie: muunnin ja sen tila vain tässä säikeessä (jatkuva näytteistys palasta toiseen).
        if (puskuri.frameLength == 0) return;
        AVAudioFrameCount tila = (AVAudioFrameCount)(puskuri.frameLength * suhde) + 32;
        AVAudioPCMBuffer* ulos = [[AVAudioPCMBuffer alloc] initWithPCMFormat:kohde frameCapacity:tila];
        __block BOOL annettu = NO;
        NSError* v = nil;
        [muunnin convertToBuffer:ulos error:&v withInputFromBlock:^AVAudioBuffer*(AVAudioPacketCount n, AVAudioConverterInputStatus* tulo) {
            if (annettu)
            {
                *tulo = AVAudioConverterInputStatus_NoDataNow;
                return nil;
            }
            annettu = YES;
            *tulo = AVAudioConverterInputStatus_HaveData;
            return puskuri;
        }];
        if (ulos.frameLength > 0 && ulos.int16ChannelData != NULL)
            MatkakirjaPuhekanava_rengas.Kirjoita((const uint8_t*)ulos.int16ChannelData[0], (size_t)ulos.frameLength * 2);
    }];
    NSLog(@"MATKAKIRJA puhekanava: mikki %.0f Hz, %u kanavaa → 24 kHz mono", muoto.sampleRate, (unsigned)muoto.channelCount);
    return MatkakirjaPuhekanava_Ok;
}

/// Moottori, mikin tap ja soitin keskustelutilassa olevaan istuntoon. Syötteen muoto luetaan joka kerta
/// uudelleen: kokoonpanon tai reitin muutoksen jälkeen mikin taajuus voi olla eri (simulaattori 192 kHz,
/// kuulokkeet 16/48 kHz), ja muunnin näytteistää siitä 24 kHz:iin. Ei koske istuntoon eikä kanavan tilaan.
- (int)rakennaMoottori
{
    NSError* virhe = nil;
    // Tuore moottori istunnon vaihdon jälkeen (kierrätetty jäi toistoluokan syötepolkuun, MatkakirjaSanelu.mm).
    AVAudioEngine* moottori = [AVAudioEngine new];
    AVAudioInputNode* syote = moottori.inputNode;
    if (![syote setVoiceProcessingEnabled:YES error:&virhe])
        NSLog(@"MATKAKIRJA puhekanava: kaiunpoisto ei käynnistynyt (%@), jatketaan ilman", virhe);
    if (syote.isVoiceProcessingEnabled)
    {
        if (@available(iOS 17.0, *))
        {
            // Unityn musiikki ja tehosteet eivät painu lähes hiljaisiksi keskustelun ajaksi.
            AVAudioVoiceProcessingOtherAudioDuckingConfiguration vaimennus;
            vaimennus.enableAdvancedDucking = NO;
            vaimennus.duckingLevel = AVAudioVoiceProcessingOtherAudioDuckingLevelMin;
            syote.voiceProcessingOtherAudioDuckingConfiguration = vaimennus;
        }
    }
    int tapTulos = [self asennaTap:syote];
    if (tapTulos != MatkakirjaPuhekanava_Ok) return tapTulos;

    // Vastausääni samaan moottoriin: kaiunpoisto tuntee sen (ks. alku).
    AVAudioPlayerNode* soitin = [AVAudioPlayerNode new];
    AVAudioFormat* soittoMuoto = [[AVAudioFormat alloc] initStandardFormatWithSampleRate:MatkakirjaPuhekanava_Taajuus channels:1];
    [moottori attachNode:soitin];
    [moottori connect:soitin to:moottori.mainMixerNode format:soittoMuoto];

    [moottori prepare];
    if (![moottori startAndReturnError:&virhe])
    {
        NSLog(@"MATKAKIRJA puhekanava: moottori ei käynnistynyt: %@", virhe);
        [syote removeTapOnBus:0];
        return MatkakirjaPuhekanava_EiMoottoria;
    }
    self.moottori = moottori;
    MatkakirjaAani_SovitaMykistys(moottori);   // testimykistys: vastausääni ei Macin kaiuttimiin (kaiunpoisto näkee sen silti)
    {
        std::lock_guard<std::mutex> l(MatkakirjaPuhekanava_soittoLukko);
        self.soitin = soitin;
        self.soittoMuoto = soittoMuoto;
        MatkakirjaPuhekanava_sukupolvi++;
        MatkakirjaPuhekanava_jonossa = 0;
        [soitin play];
    }
    NSLog(@"MATKAKIRJA puhekanava: auki (kaiunpoisto %d)", (int)syote.isVoiceProcessingEnabled);
    return MatkakirjaPuhekanava_Ok;
}

/// Moottori ja soitin kiinni, istunto ennallaan. Turvallinen kutsua monesti.
- (void)puraMoottori
{
    {
        std::lock_guard<std::mutex> l(MatkakirjaPuhekanava_soittoLukko);
        MatkakirjaPuhekanava_sukupolvi++;
        MatkakirjaPuhekanava_jonossa = 0;
        [self.soitin stop];
        self.soitin = nil;
        self.soittoMuoto = nil;
    }
    AVAudioEngine* m = self.moottori;
    if (m)
    {
        [m.inputNode removeTapOnBus:0];
        if (m.isRunning) [m stop];
        self.moottori = nil;
    }
}

/// Moottori ja soitin kiinni, istunto palautetaan. Turvallinen kutsua monesti.
- (void)sulje
{
    self.uudelleenJonossa = NO;
    [self puraMoottori];
    MatkakirjaPuhekanava_rengas.Tyhjenna();
    [self palautaIstunto];
}

/// Kokoonpanon tai reitin muutos: moottori uudelleen hetken päästä (muutokset tulevat usein ryppäänä).
- (void)ajastaUudelleen:(NSString*)miksi
{
    if (MatkakirjaPuhekanava_tila != MatkakirjaPuhekanava_Auki || self.uudelleenJonossa) return;
    self.uudelleenJonossa = YES;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.15 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.uudelleenJonossa) return;   // suljettiin välissä
        self.uudelleenJonossa = NO;
        [self kaynnistaUudelleen:miksi];
    });
}

/// Uusi moottori samaan istuntoon; kanava pysyy auki, joten Unity jatkaa samaa WebSocketia. Soimassa ollut
/// vastausääni katkeaa (soitin on uusi), mikin rengaspuskuri säilyy. Silmukkavahti: yli 5 kertaa 30 s:ssa
/// → keskeytys kuten ennen.
- (void)kaynnistaUudelleen:(NSString*)miksi
{
    if (MatkakirjaPuhekanava_tila != MatkakirjaPuhekanava_Auki) return;
    CFAbsoluteTime nyt = CFAbsoluteTimeGetCurrent();
    if (nyt - self.uudelleenIkkuna > 30.0) { self.uudelleenIkkuna = nyt; self.uudelleenMaara = 0; }
    if (++self.uudelleenMaara > 5)
    {
        [self keskeyta:[NSString stringWithFormat:@"%@, uudelleenkäynnistyksiä liikaa", miksi]];
        return;
    }
    if (![[AVAudioSession sharedInstance].category isEqualToString:AVAudioSessionCategoryPlayAndRecord])
    {
        self.istuntoVaihdettu = NO;   // joku muu vaihtoi luokan: sen asetusta ei kumota
        [self keskeyta:@"vieras luokanvaihto"];
        return;
    }
    // Ensin sama moottori (Applen ohje: tap uudelleen uudesta muodosta + start; kaiunpoisto pysyy kytkettynä),
    // vasta sitten kokonaan uusi (kaiunpoiston uudelleenkytkentä voi itse laukaista uuden muutoksen).
    if ([self jatkaMoottoria])
    {
        NSLog(@"MATKAKIRJA puhekanava: uudelleenkäynnistys %d (%@), sama moottori", self.uudelleenMaara, miksi);
        return;
    }
    [self puraMoottori];
    int tulos = [self rakennaMoottori];
    if (tulos != MatkakirjaPuhekanava_Ok)
    {
        [self keskeyta:[NSString stringWithFormat:@"%@, uudelleenkäynnistys %d", miksi, tulos]];
        return;
    }
    NSLog(@"MATKAKIRJA puhekanava: uudelleenkäynnistys %d (%@), uusi moottori", self.uudelleenMaara, miksi);
}

/// Pysähtynyt moottori jatkamaan: tap uudesta syötemuodosta, prepare/start, soitin uudelleen soimaan.
- (BOOL)jatkaMoottoria
{
    AVAudioEngine* m = self.moottori;
    if (m == nil) return NO;
    [m.inputNode removeTapOnBus:0];
    if (m.isRunning) [m stop];
    if ([self asennaTap:m.inputNode] != MatkakirjaPuhekanava_Ok) return NO;
    NSError* virhe = nil;
    [m prepare];
    if (![m startAndReturnError:&virhe])
    {
        NSLog(@"MATKAKIRJA puhekanava: sama moottori ei käynnistynyt: %@", virhe);
        [m.inputNode removeTapOnBus:0];
        return NO;
    }
    MatkakirjaAani_SovitaMykistys(m);
    std::lock_guard<std::mutex> l(MatkakirjaPuhekanava_soittoLukko);
    MatkakirjaPuhekanava_sukupolvi++;   // pysähdyksessä hukkuneet puskurit eivät enää vähennä jonoa
    MatkakirjaPuhekanava_jonossa = 0;
    [self.soitin stop];
    [self.soitin play];
    return YES;
}

- (void)keskeyta:(NSString*)miksi
{
    if (MatkakirjaPuhekanava_tila != MatkakirjaPuhekanava_Auki) return;
    NSLog(@"MATKAKIRJA puhekanava: keskeytys (%@)", miksi);
    [self sulje];
    MatkakirjaPuhekanava_tila = MatkakirjaPuhekanava_Keskeytetty;
}

- (void)kuunteleJarjestelmaa
{
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    NSOperationQueue* paa = [NSOperationQueue mainQueue];
    [nc addObserverForName:UIApplicationDidEnterBackgroundNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) { [MatkakirjaPuhekanava_olio keskeyta:@"taustalle"]; }];
    [nc addObserverForName:AVAudioSessionInterruptionNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        if ([n.userInfo[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue] == AVAudioSessionInterruptionTypeBegan)
            [MatkakirjaPuhekanava_olio keskeyta:@"istunnon keskeytys"];
    }];
    [nc addObserverForName:AVAudioSessionMediaServicesWereResetNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        MatkakirjaPuhekanava* s = MatkakirjaPuhekanava_olio;
        if (s) s.istuntoVaihdettu = NO;   // istunto on nollattu, vanhaa ei palauteta
        [s keskeyta:@"mediapalvelut nollattu"];
    }];
    [nc addObserverForName:AVAudioSessionRouteChangeNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        MatkakirjaPuhekanava* s = MatkakirjaPuhekanava_olio;
        if (s == nil || MatkakirjaPuhekanava_tila != MatkakirjaPuhekanava_Auki) return;
        NSUInteger syy = [n.userInfo[AVAudioSessionRouteChangeReasonKey] unsignedIntegerValue];
        if (syy == AVAudioSessionRouteChangeReasonNewDeviceAvailable
            || syy == AVAudioSessionRouteChangeReasonOldDeviceUnavailable
            || syy == AVAudioSessionRouteChangeReasonOverride
            || syy == AVAudioSessionRouteChangeReasonRouteConfigurationChange)
        {
            // Kuulokkeet kiinni/irti tms.: mikin taajuus ja kanavat voivat vaihtua → uusi moottori.
            [s ajastaUudelleen:[NSString stringWithFormat:@"reitin muutos %lu", (unsigned long)syy]];
            return;
        }
        if (syy != AVAudioSessionRouteChangeReasonCategoryChange) return;
        if ([[AVAudioSession sharedInstance].category isEqualToString:AVAudioSessionCategoryPlayAndRecord]) return;
        // Joku muu (esim. MatkakirjaAani_Toisto) vaihtoi luokan: sen asetusta ei kumota palautuksella.
        s.istuntoVaihdettu = NO;
        [s keskeyta:@"vieras luokanvaihto"];
    }];
    [nc addObserverForName:AVAudioEngineConfigurationChangeNotification object:nil queue:paa
                usingBlock:^(NSNotification* n) {
        MatkakirjaPuhekanava* s = MatkakirjaPuhekanava_olio;
        if (s == nil || MatkakirjaPuhekanava_tila != MatkakirjaPuhekanava_Auki || n.object != s.moottori) return;
        // Moottori on pysähtynyt tai sen tap-muoto on vanhentunut: uusi moottori, kanava ja WebSocket jatkavat.
        [s ajastaUudelleen:@"moottorin kokoonpano muuttui"];
    }];
}

@end

// --- C-rajapinta ---------------------------------------------------------------------------------------

/// Mikrofonilupa kysymättä ei avaa dialogia: 0 kysymättä, 1 myönnetty, 2 evätty, 3 Info.plistin kuvaus puuttuu.
extern "C" int MatkakirjaPuhekanava_Lupa(void)
{
    if (!MatkakirjaPuhekanava_Kuvaus()) return MatkakirjaPuhekanava_LupaEiKuvausta;
    if (@available(iOS 17.0, *))
    {
        switch ([AVAudioApplication sharedInstance].recordPermission)
        {
            case AVAudioApplicationRecordPermissionGranted: return MatkakirjaPuhekanava_LupaMyonnetty;
            case AVAudioApplicationRecordPermissionDenied: return MatkakirjaPuhekanava_LupaEvatty;
            default: return MatkakirjaPuhekanava_LupaKysymatta;
        }
    }
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    switch ([AVAudioSession sharedInstance].recordPermission)
    {
        case AVAudioSessionRecordPermissionGranted: return MatkakirjaPuhekanava_LupaMyonnetty;
        case AVAudioSessionRecordPermissionDenied: return MatkakirjaPuhekanava_LupaEvatty;
        default: return MatkakirjaPuhekanava_LupaKysymatta;
    }
#pragma clang diagnostic pop
}

/// Lupadialogi (kuten sanelu); vastaus luetaan Lupa-kutsulla. Ei mitään, jos kuvaus puuttuu.
extern "C" void MatkakirjaPuhekanava_PyydaLupa(void)
{
    if (!MatkakirjaPuhekanava_Kuvaus()) return;
    void (^vastaus)(BOOL) = ^(BOOL myonnetty) {
        NSLog(@"MATKAKIRJA puhekanava: mikrofonilupa %@", myonnetty ? @"myönnetty" : @"evätty");
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
}

/// Mikrofoni ja kaiutin auki: 0 = kunnossa, muuten virhekoodi (1 ei lupaa, 2 istunto, 3 muoto, 4 moottori).
extern "C" int MatkakirjaPuhekanava_Aloita(void)
{
    if (MatkakirjaPuhekanava_Lupa() != MatkakirjaPuhekanava_LupaMyonnetty) return MatkakirjaPuhekanava_EiLupaa;
    MatkakirjaPuhekanava_tila = MatkakirjaPuhekanava_Kiinni;
    return [[MatkakirjaPuhekanava hae] aloita];
}

extern "C" void MatkakirjaPuhekanava_Lopeta(void)
{
    MatkakirjaPuhekanava_tila = MatkakirjaPuhekanava_Kiinni;
    [MatkakirjaPuhekanava_olio sulje];
}

/// 0 kiinni, 1 auki, 2 keskeytetty (järjestelmä sulki; Unity lopettaa keskustelun).
extern "C" int MatkakirjaPuhekanava_Tila(void)
{
    return MatkakirjaPuhekanava_tila;
}

/// Mikrofonin PCM16 LE 24 kHz mono -tavut puskuriin; palauttaa luettujen tavujen määrän (parillinen).
extern "C" int MatkakirjaPuhekanava_Lue(uint8_t* puskuri, int max)
{
    if (puskuri == NULL || max <= 1) return 0;
    return (int)MatkakirjaPuhekanava_rengas.Lue(puskuri, (size_t)max);
}

/// Vastausääntä soittojonoon (float −1…1, 24 kHz mono). Palauttaa 0, jos kanava ei ole auki.
extern "C" int MatkakirjaPuhekanava_Soita(const float* naytteet, int maara)
{
    if (naytteet == NULL || maara <= 0) return 0;
    std::lock_guard<std::mutex> l(MatkakirjaPuhekanava_soittoLukko);
    MatkakirjaPuhekanava* s = MatkakirjaPuhekanava_olio;
    AVAudioPlayerNode* soitin = s.soitin;
    AVAudioFormat* muoto = s.soittoMuoto;
    if (soitin == nil || muoto == nil || s.moottori == nil || !s.moottori.isRunning) return 0;
    AVAudioPCMBuffer* puskuri = [[AVAudioPCMBuffer alloc] initWithPCMFormat:muoto frameCapacity:(AVAudioFrameCount)maara];
    if (puskuri == nil) return 0;
    std::memcpy(puskuri.floatChannelData[0], naytteet, (size_t)maara * sizeof(float));
    puskuri.frameLength = (AVAudioFrameCount)maara;
    int polvi = MatkakirjaPuhekanava_sukupolvi;
    MatkakirjaPuhekanava_jonossa += maara;
    [soitin scheduleBuffer:puskuri
    completionCallbackType:AVAudioPlayerNodeCompletionDataPlayedBack
         completionHandler:^(AVAudioPlayerNodeCompletionCallbackType tyyppi) {
        if (MatkakirjaPuhekanava_sukupolvi == polvi) MatkakirjaPuhekanava_jonossa -= maara;
    }];
    if (!soitin.isPlaying) [soitin play];
    return 1;
}

/// Soiva ja jonossa oleva vastausääni pois heti (pelaaja puhuu Pulun päälle, web vaienna).
extern "C" void MatkakirjaPuhekanava_Vaienna(void)
{
    std::lock_guard<std::mutex> l(MatkakirjaPuhekanava_soittoLukko);
    MatkakirjaPuhekanava_sukupolvi++;
    MatkakirjaPuhekanava_jonossa = 0;
    AVAudioPlayerNode* soitin = MatkakirjaPuhekanava_olio.soitin;
    if (soitin == nil) return;
    [soitin stop];
    if (MatkakirjaPuhekanava_olio.moottori.isRunning) [soitin play];
}

/// Soittamatta olevat näytteet (0 = Pulu ei puhu).
extern "C" int MatkakirjaPuhekanava_Jonossa(void)
{
    long long n = MatkakirjaPuhekanava_jonossa;
    return n > 0 ? (int)std::min<long long>(n, INT32_MAX) : 0;
}
