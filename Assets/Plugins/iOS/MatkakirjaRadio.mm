// MatkakirjaRadio.mm — maailmanradion suora lähetys (Linssiseppä 23.9.2026, oma moottori Natiiviseppä 24.9.2026, build 8).
//
// Webin radio soittaa <audio>-elementillä Icecast/Shoutcast-virtoja (mp3, aac) ja HLS:ää; Unityn
// AudioSource ei soita loputonta verkkovirtaa luotettavasti, joten natiivissa soittaa tämä liitännäinen.
// Yksi virta kerrallaan.
//
// KAKSI POLKUA
//   engine   Progressiivinen http(s)-virta (Icecast/Shoutcast mp3, aac/aacp ADTS): URLSession-datatehtävä
//            → AudioFileStream (paketit) → AudioConverter (Float32, ei lomitettu) → AVAudioPCMBuffer →
//            AVAudioPlayerNode → mainMixerNode. VU-taso installTapOnBus:lla soitinsolmun ulostulosta, eli
//            ENNEN voimakkuutta (voimakkuus on soitinsolmun mikserisyötteen volume).
//            Shoutcast v1 "ICY 200 OK": jos URLSession päästää sen runkona, otsakkeet leikataan pois.
//   avplayer Varapolku (VU −1): .m3u8/HLS, URLSessionin varhainen virhe ennen ääntä (esim. ICY-vastaus,
//            jota URLSession ei jäsennä), muoto jota AudioFileStream ei tunne (Ogg/Opus),
//            ei ääntä 8 s:ssa. Live-Icecastilla AVPlayerin MTAudioProcessingTap ei saanut näytteitä
//            (iPad 24.9.: tappikutsuja 0), siksi engine-polku.
//
// Unity-puoli: Linssit/Unity/RadioAanet.cs (RadioVirta), joka kysyy tilan joka kehys pääsäikeestä:
//   MatkakirjaRadio_Avaa(url)          uusi virta, soitto alkaa mykkänä (voimakkuus 0)
//   MatkakirjaRadio_Sulje()            virta pois
//   MatkakirjaRadio_Voimakkuus(0…1)    ristihäivytys (RadioLinssi)
//   MatkakirjaRadio_Tila()             0 ei virtaa, 1 yhdistää/puskuroi, 2 soi (ääni oikeasti etenee),
//                                      3 ei vastaa, 4 katkesi
//   MatkakirjaRadio_Tauko(0|1)         merkkivalon tauko (int, ei bool: P/Invoke-koko). engine: soitin
//                                      pauselle ja saapuva data hylätään (yhteys jää); jatko tyhjentää
//                                      vanhat puskurit ja puskuroi uudelleen livenä.
//   MatkakirjaRadio_Kuvaus()           diagnoosi lokiin (strdup, Unity vapauttaa): polku, Content-Type,
//                                      muoto, ajastettu s, alivuodot, tavut, tappikutsut, varapolun syy
//   MatkakirjaRadio_Taso()             VU 0…1: RMS ~30 ms ikkunoista, dBFS −60…0 → 0…1, ennen voimakkuutta,
//                                      nopea nousu, vaimennus ~0,3 s; 0 kun ei soi tai tauolla;
//                                      −1 vain avplayer-polulla (tasoa ei saada) → Unityn varakuvio
//   MatkakirjaRadio_Huippu()           sama huippuarvosta (|näyte| max), vaimennus ~1 s
//   MatkakirjaRadio_Rms()              raaka lineaarinen RMS 0…1 (~30 ms), ei tasoitusta (VuMittari tasoittaa)
//   MatkakirjaRadio_Esikuuntele(url)   seuraavan aseman yhteys valmiiksi (ks. ESIKUUNTELU); NULL = pois
//
// ESIKUUNTELU (Raamattu ESILATAUSPOLITIIKKA kohta 6: "radiossa nykyinen ja seuraava asema puskuroituna"; Linssiseppä
// 26.9.2026 Natiivisepän ehdoin, build 18): toinen MKVirta yhdistää ja JÄSENTÄÄ paketit renkaaseen (enintään
// EsikuuntelunRengasS), mutta ei muunna eikä ajasta: moottoriin ja soittimeen se ei koske. Avaa samalla osoitteella
// ottaa yhteyden ja renkaan käyttöön, syöttää renkaan muuntimelle kerralla, ja soitto alkaa heti ilman yhdistämistä ja
// alkupuskurointia. Esikuuntelua on yksi kerrallaan (uusi korvaa vanhan); Avaa toisella osoitteella, tauko ja
// EsikuuntelunKattoS ilman käyttöönottoa sulkevat sen; HLS ja muu kuin http(s) eivät esikuuntele. Sulje EI sulje
// esikuuntelua, koska RadioLinssi kutsuu Sulje-Avaa-parin asemaa vaihtaessaan. Virhe esikuuntelussa (HTTP, muoto,
// katkos) vain luopuu siitä: varapolulle mennään vasta, kun asema oikeasti avataan.
//
// SÄIKEET
//   Pääsäie (Unity) vain lukee atomisia muuttujia ja lähettää käskyt dispatch_asyncilla sarjajonoon
//   "app.matkakirja.radio". Jonossa ajetaan kaikki muu: ääni-istunto (setCategory/setActive), engine,
//   URLSessionin delegaatti (delegateQueue.underlyingQueue = sama jono), jäsennys, muunnos ja ajastus.
//   Pääsäikeessä ei ole lukkoja eikä synkronisia äänipalvelinkutsuja (iPad 24.9.: setActive pääsäikeessä
//   = 16 ms piikki). Soitinsolmun valmistumiskutsut ja VU-tappi tulevat AVFoundationin säikeistä ja
//   kirjoittavat vain atomisiin muuttujiin.
//
// PUSKUROINTI
//   Soitto alkaa, kun ~1,5 s on ajastettu. Alivuoto (ajastettu loppui) → soitin pauselle, tila 1,
//   uudelleenpuskurointi (kynnys +1 s jokaisesta alivuodosta, enintään 4 s). Ajastettua enintään ~6 s: liika data pudotetaan, jotta live pysyy
//   livenä ja muisti kurissa. Tila 2 vasta, kun ensimmäinen ajastettu puskuri on oikeasti soitettu
//   (AVAudioPlayerNodeCompletionDataPlayedBack).
//
// Ääni-istunto: Playback + MixWithOthers kuten MatkakirjaAani.mm (äänettömyyskytkin ei mykistä radiota,
// pelaajan oma musiikki ja Unityn ääni soivat rinnalla). Enginen konfiguraatiomuutos, istunnon
// keskeytys ja mediapalveluiden nollaus → engine uudelleen ja jatko (uudelleenpuskurointi).
//
// ATS: NSAllowsArbitraryLoadsForMedia koskee vain AVFoundationia, ei URLSessionia → http://-asemat
// päätyvät varapolulle (URLSessionin varhainen virhe). Radioasemat ovat https-osoitteissa (sisältö 24.9.).
//
// Vaatii: ARC, AVFoundation + AudioToolbox (Unityn iOS-projektissa linkitetty oletuksena).
// Testi macOS:llä: -DMATKAKIRJA_RADIO_TESTI lisää MatkakirjaRadio_TestiMykista() (mikserin ulostulo 0).

#import <AVFoundation/AVFoundation.h>
#import <AudioToolbox/AudioToolbox.h>
#import <QuartzCore/QuartzCore.h>
#include <TargetConditionals.h>
#include <mach/mach_time.h>
#include <atomic>
#include <cmath>
#include <deque>
#include <vector>

#if !__has_feature(objc_arc)
#error "MatkakirjaRadio.mm vaatii ARC:n (-fobjc-arc)"
#endif

static dispatch_queue_t RadioJono()
{
    static dispatch_queue_t jono;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ jono = dispatch_queue_create("app.matkakirja.radio", DISPATCH_QUEUE_SERIAL); });
    return jono;
}

static double TikitSekunneiksi(uint64_t tikit)
{
    static mach_timebase_info_data_t tb;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ mach_timebase_info(&tb); });
    return (double)tikit * tb.numer / tb.denom / 1e9;
}

static uint64_t SekunnitTikeiksi(double s)
{
    static mach_timebase_info_data_t tb;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ mach_timebase_info(&tb); });
    return s <= 0 ? 0 : (uint64_t)(s * 1e9 * tb.denom / tb.numer);
}

// ---- VU: tappi soitinsolmun ulostulossa ------------------------------------------------------------------
// Tappi saa ~50–100 ms lohkoja jälkikäteen. Lohko pilkotaan ~30 ms ikkunoiksi, joilla on kukin oma
// isäntäaika; ikkunat kirjoitetaan renkaaseen. Lukija (pääsäie) valitsee ikkunan, jonka aika on
// "nyt − viive" (viive = tapin toimitusviive + yksi lohko), joten mittari etenee ~30 ms askelin eikä
// hypi lohkoittain. Yksi kirjoittaja (tapin säie), lukija vain atomisia arvoja.

struct VuIkkuna
{
    std::atomic<float> rms{0.f}, huippu{0.f};
    std::atomic<uint64_t> aika{0};
};
static const uint64_t VuRengasKoko = 256;
static VuIkkuna vuRengas[VuRengasKoko];
static std::atomic<uint64_t> vuKirjoitettu(0);   // kirjoitettuja ikkunoita yhteensä
static std::atomic<uint64_t> vuViive(0);         // isäntätikkejä
static std::atomic<long> vuKutsut(0);            // tappikutsut (diagnoosi)

static void VuTappi(AVAudioPCMBuffer* puskuri, AVAudioTime* hetki)
{
    vuKutsut.fetch_add(1, std::memory_order_relaxed);
    uint64_t tulo = mach_absolute_time();
    AVAudioFrameCount n = puskuri.frameLength;
    float* const* kanavat = puskuri.floatChannelData;
    if (n == 0 || kanavat == NULL) return;
    double taajuus = puskuri.format.sampleRate > 0 ? puskuri.format.sampleRate : 44100.0;
    AVAudioChannelCount kanavia = puskuri.format.channelCount;
    uint64_t lohko = SekunnitTikeiksi(n / taajuus);
    uint64_t alku = (hetki != nil && hetki.hostTimeValid) ? hetki.hostTime : (tulo > lohko ? tulo - lohko : 0);
    AVAudioFrameCount ikkuna = (AVAudioFrameCount)(taajuus * 0.03);
    if (ikkuna < 64) ikkuna = 64;
    for (AVAudioFrameCount a = 0; a < n; a += ikkuna)
    {
        AVAudioFrameCount loppu = a + ikkuna < n ? a + ikkuna : n;
        if (n - loppu < ikkuna / 2) loppu = n;   // lyhyt häntä liitetään viimeiseen ikkunaan
        double summa = 0; float huippu = 0;
        for (AVAudioChannelCount k = 0; k < kanavia; k++)
        {
            const float* x = kanavat[k];
            for (AVAudioFrameCount i = a; i < loppu; i++) { float v = fabsf(x[i]); summa += (double)v * v; if (v > huippu) huippu = v; }
        }
        double maara = (double)(loppu - a) * (kanavia > 0 ? kanavia : 1);
        uint64_t kohta = vuKirjoitettu.load(std::memory_order_relaxed);
        VuIkkuna& w = vuRengas[kohta % VuRengasKoko];
        w.rms.store(maara > 0 ? (float)sqrt(summa / maara) : 0.f, std::memory_order_relaxed);
        w.huippu.store(huippu, std::memory_order_relaxed);
        w.aika.store(alku + SekunnitTikeiksi(a / taajuus), std::memory_order_relaxed);
        vuKirjoitettu.store(kohta + 1, std::memory_order_release);
        if (loppu >= n) break;
    }
    uint64_t viive = (tulo > alku ? tulo - alku : 0) + lohko;
    uint64_t vanha = vuViive.load(std::memory_order_relaxed);
    vuViive.store(viive > vanha ? viive : (vanha * 15 + viive) / 16, std::memory_order_relaxed);
}

// Pääsäie: ikkuna hetkeltä nyt − viive. false = ei tuoretta dataa (> 0,6 s + viive vanha).
static bool VuLue(float* rms, float* huippu)
{
    uint64_t n = vuKirjoitettu.load(std::memory_order_acquire);
    if (n == 0) return false;
    uint64_t nyt = mach_absolute_time();
    uint64_t viive = vuViive.load(std::memory_order_relaxed);
    uint64_t viimeisin = vuRengas[(n - 1) % VuRengasKoko].aika.load(std::memory_order_relaxed);
    if (nyt > viimeisin && TikitSekunneiksi(nyt - viimeisin) > 0.6 + TikitSekunneiksi(viive)) return false;
    uint64_t kohde = nyt > viive ? nyt - viive : 0;
    uint64_t alaraja = n > 64 ? n - 64 : 0;
    uint64_t valittu = alaraja;
    for (uint64_t k = n; k-- > alaraja; )
        if (vuRengas[k % VuRengasKoko].aika.load(std::memory_order_relaxed) <= kohde) { valittu = k; break; }
    *rms = vuRengas[valittu % VuRengasKoko].rms.load(std::memory_order_relaxed);
    *huippu = vuRengas[valittu % VuRengasKoko].huippu.load(std::memory_order_relaxed);
    return true;
}

// dBFS −60…0 → 0…1 (VU-asteikon tuntuma: hiljainen puhe ~0,4, täysi musiikki ~0,8).
static float VuAsteikko(float lineaarinen)
{
    if (lineaarinen <= 1e-6f) return 0.f;
    float db = 20.f * log10f(lineaarinen);
    float t = (db + 60.f) / 60.f;
    return t < 0 ? 0 : t > 1 ? 1 : t;
}

// ---- Engine-polun tila pääsäikeelle ----------------------------------------------------------------------
// tilaSana = (virran tunnus << 8) | tila; pääsäie hylkää vanhan virran myöhästyneet kirjoitukset.
static std::atomic<uint64_t> tilaSana(0);
static std::atomic<bool> taukoAtomi(false);
static std::atomic<float> voimakkuusAtomi(0.f);
static std::atomic<bool> voimakkuusJonossa(false);
static std::atomic<double> ajastettuSek(0);
static std::atomic<bool> moottoriKaynnissa(false);
static std::atomic<long> moottoriKaynnistyksia(0);
#ifdef MATKAKIRJA_RADIO_TESTI
static std::atomic<bool> testiMykka(false);
#endif

static const OSStatus kEiDataa = 'mkEd';   // syötekutsu: tämän erän paketit on annettu

// ---- Esikuuntelu (ks. otsikko) ----
static const double EsikuuntelunRengasS = 4.0;   // renkaan pituus (Natiivisepän ehto: enintään ~4 s)
static const double EsikuuntelunKattoS = 60.0;   // käyttämätön esikuuntelu suljetaan (ei ikuisia taustavirtoja)
static std::atomic<long> esikuuntelustaAvattu(0);  // diagnoosi: montako asemaa avattiin esikuuntelusta

// Yksi jäsennetty paketti renkaassa (kuvauksen mStartOffset 0 omassa datassaan).
struct MKPaketti
{
    std::vector<uint8_t> data;
    AudioStreamPacketDescription kuvaus;
    double kesto;
};

// Ajastettujen puskurien laskuri yhtä soittokertaa kohti: valmistumiskutsut vähentävät omaa laskuriaan,
// joten soitinsolmun stop (joka kutsuu vanhojen puskurien valmistumiset) ei sotke uutta laskentaa.
@interface MKLaskuri : NSObject
{
@public
    std::atomic<long> jonossa;      // ajastettuja kehyksiä, joita ei vielä soitettu
    std::atomic<bool> kulkee;       // ensimmäinen puskuri soitettu play-kutsun jälkeen
}
@end
@implementation MKLaskuri
@end

@class MatkakirjaRadio;

// Yksi engine-polun virta: URLSession-delegaatti, jäsennin ja muunnin. Kaikki jonossa, paitsi atomit.
@interface MKVirta : NSObject <NSURLSessionDataDelegate>
{
@public
    uint64_t tunnus;
    AudioFileStreamID jasennin;
    AudioConverterRef muunnin;
    AudioStreamBasicDescription sisaanMuoto;
    UInt32 kapasiteetti;
    bool epajatkuvuus, muotoValmis, loppui, tauolla;
    CFTimeInterval alku;
    double kynnys;                  // soiton aloituskynnys s: 1,5, jokainen alivuoto +1 (enintään 4)
    std::atomic<bool> suljettu, aaniKuultu;
    std::atomic<long> tavut, pudotetut, alivuodot, muunnosvirheet;
    // Esikuuntelu: jäsennys renkaaseen ilman muunnosta ja ajastusta. Rengas vain jonossa; atomit pääsäikeen kuvaukseen.
    std::atomic<bool> esikuuntelu;
    std::deque<MKPaketti> rengas;
    double renkaanKesto;
    std::atomic<double> renkaanSek;
    std::atomic<long> renkaanPaketit;
}
@property (nonatomic, strong) NSURL* osoite;
@property (nonatomic, strong) NSURLSession* istunto;
@property (nonatomic, strong) NSURLSessionDataTask* tehtava;
@property (nonatomic, strong) AVAudioFormat* ulosMuoto;
@property (nonatomic, strong) AVAudioPCMBuffer* kesken;
@property (atomic, copy) NSString* sisaltoTyyppi;
@property (atomic, copy) NSString* muotoTeksti;
@property (atomic, copy) NSString* varaSyy;      // asetettu jäsennyskutsussa, käsitellään jäsennyksen jälkeen
- (void)vapauta;
@end

@interface MatkakirjaRadio : NSObject
// Pääsäie
@property (nonatomic) int polku;       // 0 ei virtaa, 1 engine, 2 avplayer
@property (nonatomic, strong) MKVirta* virta;
@property (nonatomic, strong) MKVirta* esikuuntelija;   // esikuuntelu (ks. otsikko), muuten nil
@property (nonatomic) uint64_t seuraavaTunnus;
@property (nonatomic, strong) AVPlayer* soitin;
@property (nonatomic, strong) id loppuTarkkailija;
@property (nonatomic, strong) id virheTarkkailija;
@property (nonatomic) int loppuTila;   // 0 = ei, 3 = ei vastaa, 4 = katkesi
@property (nonatomic) float voimakkuus;
@property (nonatomic) BOOL tauolla;    // pelaajan tauko: ei automaattista jatkoa
@property (nonatomic) float nayttoTaso, nayttoHuippu;
@property (nonatomic) CFTimeInterval edellinenLuku;
@property (nonatomic, copy) NSString* varaSyy;
// Jono
@property (nonatomic, strong) AVAudioEngine* moottori;
@property (nonatomic, strong) AVAudioPlayerNode* soitinSolmu;
@property (nonatomic, strong) AVAudioFormat* liitettyMuoto;
@property (nonatomic, strong) MKLaskuri* laskuri;
@property (nonatomic, strong) MKVirta* nykyinen;
@property (nonatomic, strong) id muutosTarkkailija;
@property (nonatomic, strong) dispatch_source_t ajastin;
@property (nonatomic) BOOL soittaa, istuntoUudelleen;
@property (nonatomic) CFTimeInterval viimeKaynnistysVirhe;
@property (atomic, copy) NSString* moottoriVirhe;
+ (instancetype)jaettu;
- (void)ajasta:(AVAudioPCMBuffer*)puskuri virta:(MKVirta*)v;
- (void)muotoValmis:(MKVirta*)v;
- (void)tarkista;
- (void)varapolku:(MKVirta*)v syy:(NSString*)syy;
@end

// ---- Jäsennys ja muunnos (jonossa) -----------------------------------------------------------------------

struct MKSyote
{
    const uint8_t* data;
    const AudioStreamPacketDescription* kuvaukset;
    UInt32 paketteja, seuraava, kanavia;
    AudioStreamPacketDescription yksi;
};

// Pakatulle syötteelle yksi paketti kerrallaan (kuvaus siirtymällä 0); CBR-syötteelle (ei kuvauksia)
// pyydetty määrä yhtenäisenä. Kun erä on annettu: 0 pakettia ja kEiDataa (muunnin säilyttää tilansa).
static OSStatus SyoteKutsu(AudioConverterRef, UInt32* maara, AudioBufferList* data,
                           AudioStreamPacketDescription** kuvaus, void* kayttaja)
{
    MKSyote* s = (MKSyote*)kayttaja;
    if (s->seuraava >= s->paketteja) { *maara = 0; return kEiDataa; }
    const AudioStreamPacketDescription& p = s->kuvaukset[s->seuraava];
    data->mNumberBuffers = 1;
    data->mBuffers[0].mNumberChannels = s->kanavia;
    data->mBuffers[0].mData = (void*)(s->data + p.mStartOffset);
    if (kuvaus != NULL)
    {
        data->mBuffers[0].mDataByteSize = p.mDataByteSize;
        s->yksi = p;
        s->yksi.mStartOffset = 0;
        *kuvaus = &s->yksi;
        *maara = 1;
        s->seuraava++;
        return noErr;
    }
    UInt32 k = s->paketteja - s->seuraava;
    if (*maara > 0 && k > *maara) k = *maara;
    const AudioStreamPacketDescription& q = s->kuvaukset[s->seuraava + k - 1];
    data->mBuffers[0].mDataByteSize = (UInt32)(q.mStartOffset + q.mDataByteSize - p.mStartOffset);
    *maara = k;
    s->seuraava += k;
    return noErr;
}

static NSString* NeljaMerkkia(UInt32 id)
{
    char c[5] = { (char)(id >> 24), (char)(id >> 16), (char)(id >> 8), (char)id, 0 };
    for (int i = 0; i < 4; i++) if (c[i] < 32 || c[i] > 126) c[i] = '?';
    return [NSString stringWithUTF8String:c];
}

static void OminaisuusKutsu(void* asiakas, AudioFileStreamID, AudioFileStreamPropertyID id, AudioFileStreamPropertyFlags*)
{
    if (id == kAudioFileStreamProperty_ReadyToProducePackets)
        [[MatkakirjaRadio jaettu] muotoValmis:(__bridge MKVirta*)asiakas];
}

// Esikuuntelu: paketit renkaaseen (kopio), vanhimmat pois, kun rengas ylittää EsikuuntelunRengasS. Jonossa.
static void Talleta(MKVirta* v, UInt32 paketteja, const void* data, const AudioStreamPacketDescription* kuvaukset)
{
    const AudioStreamBasicDescription& m = v->sisaanMuoto;
    double taajuus = m.mSampleRate > 0 ? m.mSampleRate : 44100.0;
    for (UInt32 i = 0; i < paketteja; i++)
    {
        const AudioStreamPacketDescription& k = kuvaukset[i];
        if (k.mDataByteSize == 0) continue;
        MKPaketti p;
        const uint8_t* alku = (const uint8_t*)data + k.mStartOffset;
        p.data.assign(alku, alku + k.mDataByteSize);
        p.kuvaus = k;
        p.kuvaus.mStartOffset = 0;
        UInt32 kehyksia = k.mVariableFramesInPacket > 0 ? k.mVariableFramesInPacket
            : m.mFramesPerPacket > 0 ? m.mFramesPerPacket : 1152;
        p.kesto = kehyksia / taajuus;
        v->renkaanKesto += p.kesto;
        v->rengas.push_back(std::move(p));
    }
    while (!v->rengas.empty() && v->renkaanKesto - v->rengas.front().kesto >= EsikuuntelunRengasS)
    {
        v->renkaanKesto -= v->rengas.front().kesto;
        v->rengas.pop_front();
    }
    v->renkaanSek.store(v->renkaanKesto);
    v->renkaanPaketit.store((long)v->rengas.size());
}

static void Muunna(MKVirta* v, UInt32 paketteja, const void* data, AudioStreamPacketDescription* kuvaukset);

static void PakettiKutsu(void* asiakas, UInt32 tavuja, UInt32 paketteja, const void* data,
                         AudioStreamPacketDescription* kuvaukset)
{
    MKVirta* v = (__bridge MKVirta*)asiakas;
    if (v->suljettu.load() || v->tauolla || v->muunnin == NULL || v.ulosMuoto == nil || paketteja == 0) return;
    std::vector<AudioStreamPacketDescription> tehdyt;
    if (kuvaukset == NULL)
    {
        // CBR (esim. PCM): kuvaukset tavukoosta.
        UInt32 koko = v->sisaanMuoto.mBytesPerPacket;
        if (koko == 0) return;
        tehdyt.resize(paketteja);
        for (UInt32 i = 0; i < paketteja; i++) tehdyt[i] = { (SInt64)i * koko, 0, koko };
        kuvaukset = tehdyt.data();
    }
    // Esikuuntelu ei muunna eikä ajasta (Natiivisepän ehto 3): paketit vain talteen.
    if (v->esikuuntelu.load()) { Talleta(v, paketteja, data, kuvaukset); return; }
    Muunna(v, paketteja, data, kuvaukset);
}

// Paketit Float32-puskureiksi ja ajastukseen (soiva virta). Jonossa.
static void Muunna(MKVirta* v, UInt32 paketteja, const void* data, AudioStreamPacketDescription* kuvaukset)
{
    MKSyote s = { (const uint8_t*)data, kuvaukset, paketteja, 0, v->sisaanMuoto.mChannelsPerFrame, {} };
    AVAudioChannelCount kanavia = v.ulosMuoto.channelCount;
    std::vector<uint8_t> tila(offsetof(AudioBufferList, mBuffers) + sizeof(AudioBuffer) * kanavia);
    AudioBufferList* lista = (AudioBufferList*)tila.data();
    for (int kierros = 0; kierros < 10000; kierros++)
    {
        if (v.kesken == nil) v.kesken = [[AVAudioPCMBuffer alloc] initWithPCMFormat:v.ulosMuoto frameCapacity:v->kapasiteetti];
        AVAudioPCMBuffer* p = v.kesken;
        UInt32 vapaa = p.frameCapacity - p.frameLength;
        lista->mNumberBuffers = kanavia;
        for (AVAudioChannelCount k = 0; k < kanavia; k++)
        {
            lista->mBuffers[k].mNumberChannels = 1;
            lista->mBuffers[k].mDataByteSize = vapaa * sizeof(float);
            lista->mBuffers[k].mData = p.floatChannelData[k] + p.frameLength;
        }
        UInt32 kehyksia = vapaa;
        OSStatus tulos = AudioConverterFillComplexBuffer(v->muunnin, SyoteKutsu, &s, &kehyksia, lista, NULL);
        if (tulos != noErr && tulos != kEiDataa) kehyksia = 0;
        p.frameLength = p.frameLength + kehyksia;
        if (p.frameLength >= p.frameCapacity)
        {
            v.kesken = nil;
            [[MatkakirjaRadio jaettu] ajasta:p virta:v];
        }
        if (tulos == kEiDataa) break;
        if (tulos != noErr)
        {
            v->muunnosvirheet.fetch_add(1);
            AudioConverterReset(v->muunnin);
            break;
        }
        if (kehyksia == 0) break;
    }
}

@implementation MKVirta

- (instancetype)init
{
    if ((self = [super init]))
    {
        suljettu.store(false);
        aaniKuultu.store(false);
        tavut.store(0);
        pudotetut.store(0);
        alivuodot.store(0);
        muunnosvirheet.store(0);
        kynnys = 1.5;
        esikuuntelu.store(false);
        renkaanKesto = 0;
        renkaanSek.store(0);
        renkaanPaketit.store(0);
    }
    return self;
}

- (void)vapauta
{
    suljettu.store(true);
    [self.tehtava cancel];
    [self.istunto invalidateAndCancel];   // vapauttaa delegaatin (istunto pitää sitä vahvasti)
    self.tehtava = nil;
    self.istunto = nil;
    if (jasennin != NULL) { AudioFileStreamClose(jasennin); jasennin = NULL; }
    if (muunnin != NULL) { AudioConverterDispose(muunnin); muunnin = NULL; }
    self.kesken = nil;
    rengas.clear();
    renkaanKesto = 0;
    renkaanSek.store(0);
    renkaanPaketit.store(0);
}

- (void)dealloc
{
    if (jasennin != NULL) AudioFileStreamClose(jasennin);
    if (muunnin != NULL) AudioConverterDispose(muunnin);
}

- (void)URLSession:(NSURLSession*)istunto dataTask:(NSURLSessionDataTask*)tehtava
    didReceiveResponse:(NSURLResponse*)vastaus completionHandler:(void (^)(NSURLSessionResponseDisposition))valmis
{
    if (suljettu.load()) { valmis(NSURLSessionResponseCancel); return; }
    NSInteger koodi = [vastaus isKindOfClass:[NSHTTPURLResponse class]] ? ((NSHTTPURLResponse*)vastaus).statusCode : 200;
    NSString* tyyppi = vastaus.MIMEType ?: @"";
    self.sisaltoTyyppi = tyyppi;
    NSString* t = tyyppi.lowercaseString;
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    if (koodi < 200 || koodi >= 300)
    {
        valmis(NSURLSessionResponseCancel);
        [radio varapolku:self syy:[NSString stringWithFormat:@"HTTP %ld", (long)koodi]];
        return;
    }
    if ([t containsString:@"mpegurl"] || [t containsString:@"ogg"] || [t containsString:@"opus"]
        || [t containsString:@"flac"] || [t containsString:@"scpls"] || [t hasPrefix:@"text/"] || [t hasPrefix:@"video/"])
    {
        valmis(NSURLSessionResponseCancel);
        [radio varapolku:self syy:[NSString stringWithFormat:@"Content-Type %@", tyyppi]];
        return;
    }
    OSStatus tulos = [self avaaJasennin:t];
    if (tulos != noErr)
    {
        valmis(NSURLSessionResponseCancel);
        [radio varapolku:self syy:[NSString stringWithFormat:@"AudioFileStreamOpen %d", (int)tulos]];
        return;
    }
    valmis(NSURLSessionResponseAllow);
}

- (OSStatus)avaaJasennin:(NSString*)tyyppi
{
    if (jasennin != NULL) { AudioFileStreamClose(jasennin); jasennin = NULL; }
    AudioFileTypeID vihje = 0;
    NSString* paate = self.osoite.pathExtension.lowercaseString;
    if ([tyyppi containsString:@"mpeg"] || [tyyppi containsString:@"mp3"]) vihje = kAudioFileMP3Type;
    else if ([tyyppi containsString:@"aac"]) vihje = kAudioFileAAC_ADTSType;
    else if ([paate isEqualToString:@"mp3"]) vihje = kAudioFileMP3Type;
    else if ([paate isEqualToString:@"aac"]) vihje = kAudioFileAAC_ADTSType;
    return AudioFileStreamOpen((__bridge void*)self, OminaisuusKutsu, PakettiKutsu, vihje, &jasennin);
}

// Shoutcast v1 vastaa "ICY 200 OK" -rivillä. Jos URLSession päästää sen läpi runkona (macOS 26 tekee niin),
// otsakkeet leikataan pois ja jäsennin avataan uudelleen niiden content-typellä. Jos URLSession hylkää
// vastauksen virheenä, didCompleteWithError vie varapolulle (AVPlayer osaa ICY:n).
- (NSData*)icyOtsakkeetPois:(NSData*)data
{
    if (data.length < 4 || memcmp(data.bytes, "ICY ", 4) != 0) return data;
    NSData* raja = [@"\r\n\r\n" dataUsingEncoding:NSASCIIStringEncoding];
    NSRange r = [data rangeOfData:raja options:0 range:NSMakeRange(0, MIN(data.length, (NSUInteger)8192))];
    if (r.location == NSNotFound) return data;
    NSString* otsakkeet = [[NSString alloc] initWithData:[data subdataWithRange:NSMakeRange(0, r.location)] encoding:NSISOLatin1StringEncoding];
    NSString* tyyppi = @"";
    for (NSString* rivi in [otsakkeet componentsSeparatedByString:@"\r\n"])
        if ([rivi.lowercaseString hasPrefix:@"content-type:"])
            tyyppi = [[rivi substringFromIndex:13] stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceCharacterSet];
    self.sisaltoTyyppi = [NSString stringWithFormat:@"%@ (ICY)", tyyppi.length ? tyyppi : @"-"];
    if ([self avaaJasennin:tyyppi.lowercaseString] != noErr) self.varaSyy = @"ICY: AudioFileStreamOpen";
    NSUInteger runko = r.location + r.length;
    return [data subdataWithRange:NSMakeRange(runko, data.length - runko)];
}

- (void)URLSession:(NSURLSession*)istunto dataTask:(NSURLSessionDataTask*)tehtava didReceiveData:(NSData*)data
{
    if (suljettu.load()) return;
    if (tavut.fetch_add((long)data.length) == 0) data = [self icyOtsakkeetPois:data];
    if (tauolla || jasennin == NULL) return;   // tauko: yhteys jää, data hylätään
    __block OSStatus virhe = noErr;
    [data enumerateByteRangesUsingBlock:^(const void* tavuja, NSRange alue, BOOL* seis) {
        OSStatus t = AudioFileStreamParseBytes(self->jasennin, (UInt32)alue.length, tavuja,
                                               self->epajatkuvuus ? kAudioFileStreamParseFlag_Discontinuity : 0);
        self->epajatkuvuus = false;
        if (t != noErr) { virhe = t; self->epajatkuvuus = true; }
        if (self.varaSyy != nil || self->suljettu.load()) *seis = YES;
    }];
    MatkakirjaRadio* radio = [MatkakirjaRadio jaettu];
    if (self.varaSyy == nil && virhe != noErr && !muotoValmis)
        self.varaSyy = [NSString stringWithFormat:@"AudioFileStream ei tunnista muotoa (%@)", NeljaMerkkia((UInt32)virhe)];
    if (self.varaSyy == nil && !muotoValmis && tavut.load() > 256 * 1024)
        self.varaSyy = @"AudioFileStream ei tunnista muotoa (256 kt)";
    if (self.varaSyy != nil) { [radio varapolku:self syy:self.varaSyy]; return; }
    if (!esikuuntelu.load()) [radio tarkista];   // esikuuntelu ei koske soittimen tilakoneeseen
}

- (void)URLSession:(NSURLSession*)istunto task:(NSURLSessionTask*)tehtava didCompleteWithError:(NSError*)virhe
{
    if (suljettu.load()) return;
    if (esikuuntelu.load())
    {
        // Esikuuntelun katkos: vain luovutaan (Avaa avaa aseman tavalliseen tapaan).
        NSLog(@"MATKAKIRJA radio: esikuuntelu päättyi (%@): %@", virhe.localizedDescription ?: @"yhteys päättyi", self.osoite);
        [self vapauta];
        return;
    }
    if (!aaniKuultu.load())
    {
        [[MatkakirjaRadio jaettu] varapolku:self syy:virhe
            ? [NSString stringWithFormat:@"URLSession %@ %ld", virhe.domain, (long)virhe.code]
            : @"yhteys päättyi ennen ääntä"];
        return;
    }
    loppui = true;
    [[MatkakirjaRadio jaettu] tarkista];
}

@end

// ---- Radio ------------------------------------------------------------------------------------------------

@implementation MatkakirjaRadio

+ (instancetype)jaettu
{
    static MatkakirjaRadio* radio = nil;
    static dispatch_once_t kerran;
    dispatch_once(&kerran, ^{ radio = [MatkakirjaRadio new]; [radio tarkkaileIstuntoa]; });
    return radio;
}

- (void)tarkkaileIstuntoa
{
#if TARGET_OS_IOS
    __weak MatkakirjaRadio* heikko = self;
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    [nc addObserverForName:AVAudioSessionInterruptionNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
        NSUInteger laji = [n.userInfo[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue];
        dispatch_async(RadioJono(), ^{ [heikko keskeytys:laji == AVAudioSessionInterruptionTypeBegan]; });
    }];
    [nc addObserverForName:AVAudioSessionMediaServicesWereResetNotification object:nil queue:nil usingBlock:^(NSNotification* n) {
        dispatch_async(RadioJono(), ^{ [heikko mediapalvelutNollattu]; });
    }];
#endif
}

// Jonossa. Kategoria asetetaan vain, kun se on väärä; setActive joka avauksella (kuten ennen).
- (void)istuntoKuntoon
{
#if TARGET_OS_IOS
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    BOOL oikein = [istunto.category isEqualToString:AVAudioSessionCategoryPlayback]
        && [istunto.mode isEqualToString:AVAudioSessionModeDefault]
        && istunto.categoryOptions == AVAudioSessionCategoryOptionMixWithOthers;
    NSError* virhe = nil;
    if (!oikein && ![istunto setCategory:AVAudioSessionCategoryPlayback mode:AVAudioSessionModeDefault
                                 options:AVAudioSessionCategoryOptionMixWithOthers error:&virhe])
        NSLog(@"MATKAKIRJA radio: setCategory epäonnistui: %@", virhe);
    if (![istunto setActive:YES error:&virhe])
        NSLog(@"MATKAKIRJA radio: setActive epäonnistui: %@", virhe);
#endif
    self.istuntoUudelleen = NO;
}

// ---- Pääsäie: avaus ja sulku ----

- (void)avaa:(NSString*)osoite
{
    [self sulje];
    NSURL* url = [NSURL URLWithString:osoite];
    if (url == nil) { self.loppuTila = 3; return; }
    self.tauolla = NO;
    taukoAtomi.store(false);
    self.voimakkuus = 0;
    voimakkuusAtomi.store(0.f);
    self.nayttoTaso = 0;
    self.nayttoHuippu = 0;
    self.varaSyy = nil;
    MKVirta* esi = self.esikuuntelija;
    if (esi != nil)
    {
        self.esikuuntelija = nil;
        if (!esi->suljettu.load() && [esi.osoite.absoluteString isEqualToString:osoite])
        {
            // Esikuunneltu asema: yhteys ja renkaan paketit käyttöön heti (otaKayttoon jonossa).
            esikuuntelustaAvattu.fetch_add(1);
            self.virta = esi;
            self.polku = 1;
            tilaSana.store((esi->tunnus << 8) | 1);
            dispatch_async(RadioJono(), ^{ [self otaKayttoon:esi]; });
            return;
        }
        esi->suljettu.store(true);   // toinen asema: esikuuntelu ei enää palvele
        dispatch_async(RadioJono(), ^{ [esi vapauta]; });
    }
    NSString* skeema = url.scheme.lowercaseString;
    NSString* polku = url.path.lowercaseString ?: @"";
    if (!([skeema isEqualToString:@"http"] || [skeema isEqualToString:@"https"]))
        { [self avaaAVPlayer:url syy:@"ei http(s)"]; return; }
    if ([polku hasSuffix:@".m3u8"] || [polku hasSuffix:@".m3u"] || [osoite.lowercaseString containsString:@".m3u8"])
        { [self avaaAVPlayer:url syy:@"HLS/soittolista"]; return; }
    MKVirta* v = [MKVirta new];
    v->tunnus = ++self.seuraavaTunnus;
    v.osoite = url;
    self.virta = v;
    self.polku = 1;
    tilaSana.store((v->tunnus << 8) | 1);
    dispatch_async(RadioJono(), ^{ [self aloita:v]; });
}

- (void)sulje
{
    MKVirta* v = self.virta;
    if (v != nil)
    {
        self.virta = nil;
        v->suljettu.store(true);
        dispatch_async(RadioJono(), ^{ [self pysayta:v]; });
    }
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    if (self.loppuTarkkailija) [nc removeObserver:self.loppuTarkkailija];
    if (self.virheTarkkailija) [nc removeObserver:self.virheTarkkailija];
    self.loppuTarkkailija = nil;
    self.virheTarkkailija = nil;
    [self.soitin pause];
    [self.soitin replaceCurrentItemWithPlayerItem:nil];
    self.soitin = nil;
    self.polku = 0;
    self.loppuTila = 0;
}

// ---- Jono: engine-polku ----

- (void)aloita:(MKVirta*)v
{
    if (v->suljettu.load()) return;
    self.nykyinen = v;
    v->alku = CACurrentMediaTime();
    [self istuntoKuntoon];
    [self yhdista:v];
    [self varmistaAjastin];
}

// ---- Esikuuntelu (ks. otsikko) ----

static BOOL EnginePolulle(NSURL* url, NSString* osoite)
{
    NSString* skeema = url.scheme.lowercaseString;
    NSString* polku = url.path.lowercaseString ?: @"";
    if (!([skeema isEqualToString:@"http"] || [skeema isEqualToString:@"https"])) return NO;
    return !([polku hasSuffix:@".m3u8"] || [polku hasSuffix:@".m3u"] || [osoite.lowercaseString containsString:@".m3u8"]);
}

// Pääsäie. Sama osoite kuin soiva tai esikuunneltava: ei mitään. HLS ja ei-http: ei esikuuntelua.
- (void)esikuuntele:(NSString*)osoite
{
    MKVirta* vanha = self.esikuuntelija;
    if (osoite.length == 0) { [self suljeEsikuuntelu]; return; }
    if (vanha != nil && !vanha->suljettu.load() && [vanha.osoite.absoluteString isEqualToString:osoite]) return;
    if (self.virta != nil && [self.virta.osoite.absoluteString isEqualToString:osoite]) return;
    [self suljeEsikuuntelu];
    NSURL* url = [NSURL URLWithString:osoite];
    if (self.tauolla || url == nil || !EnginePolulle(url, osoite)) return;
    MKVirta* v = [MKVirta new];
    v->tunnus = ++self.seuraavaTunnus;
    v->esikuuntelu.store(true);
    v.osoite = url;
    self.esikuuntelija = v;
    dispatch_async(RadioJono(), ^{ [self aloitaEsikuuntelu:v]; });
    __weak MatkakirjaRadio* heikko = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(EsikuuntelunKattoS * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        MatkakirjaRadio* r = heikko;
        if (r != nil && r.esikuuntelija == v)
        {
            NSLog(@"MATKAKIRJA radio: esikuuntelu suljettu käyttämättömänä (%.0f s): %@", EsikuuntelunKattoS, v.osoite);
            [r suljeEsikuuntelu];
        }
    });
}

// Pääsäie.
- (void)suljeEsikuuntelu
{
    MKVirta* v = self.esikuuntelija;
    if (v == nil) return;
    self.esikuuntelija = nil;
    v->suljettu.store(true);
    dispatch_async(RadioJono(), ^{ [v vapauta]; });
}

// Jono: yhteys ilman ääni-istuntoa, moottoria ja tilakoneen ajastinta.
- (void)aloitaEsikuuntelu:(MKVirta*)v
{
    if (v->suljettu.load()) return;
    v->alku = CACurrentMediaTime();
    [self yhdista:v];
}

// Jono: esikuunneltu virta soivaksi. Moottori valmiiksi ja rengas kerralla muuntimelle; tilakone aloittaa soiton,
// kun kynnys täyttyy (rengas on jo sitä pidempi), eikä yhdistämistä eikä alkupuskurointia odoteta.
- (void)otaKayttoon:(MKVirta*)v
{
    if (v->suljettu.load()) return;
    v->esikuuntelu.store(false);
    self.nykyinen = v;
    v->alku = CACurrentMediaTime();
    [self istuntoKuntoon];
    long paketteja = 0;
    double sekunteja = v->renkaanKesto;
    if (v->muotoValmis && v.ulosMuoto != nil && v->muunnin != NULL)
    {
        [self valmisteleMoottori:v.ulosMuoto];
        std::vector<uint8_t> data;
        std::vector<AudioStreamPacketDescription> kuvaukset;
        kuvaukset.reserve(v->rengas.size());
        for (const MKPaketti& p : v->rengas)
        {
            AudioStreamPacketDescription k = p.kuvaus;
            k.mStartOffset = (SInt64)data.size();
            data.insert(data.end(), p.data.begin(), p.data.end());
            kuvaukset.push_back(k);
        }
        paketteja = (long)kuvaukset.size();
        if (paketteja > 0) Muunna(v, (UInt32)paketteja, data.data(), kuvaukset.data());
    }
    v->rengas.clear();
    v->renkaanKesto = 0;
    v->renkaanSek.store(0);
    v->renkaanPaketit.store(0);
    double ajastettu = self.laskuri != nil && self.liitettyMuoto.sampleRate > 0
        ? self.laskuri->jonossa.load() / self.liitettyMuoto.sampleRate : 0;
    NSLog(@"MATKAKIRJA radio: esikuuntelu käyttöön: %ld pakettia (%.1f s) renkaasta, ajastettu %.2f s, moottori %@, %@",
          paketteja, sekunteja, ajastettu, self.moottori.isRunning ? @"käy" : @"seis", v.osoite);
    [self varmistaAjastin];
    [self tarkista];
}

// Jono: URLSession-datatehtävä virralle (soiva tai esikuuntelu).
- (void)yhdista:(MKVirta*)v
{
    NSURLSessionConfiguration* asetukset = [NSURLSessionConfiguration ephemeralSessionConfiguration];
    asetukset.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
    asetukset.URLCache = nil;
    asetukset.timeoutIntervalForRequest = 8;   // myös tauko datan välillä: live-virta katkesi
    NSOperationQueue* delegaattiJono = [NSOperationQueue new];
    delegaattiJono.maxConcurrentOperationCount = 1;
    delegaattiJono.underlyingQueue = RadioJono();
    v.istunto = [NSURLSession sessionWithConfiguration:asetukset delegate:v delegateQueue:delegaattiJono];
    NSMutableURLRequest* pyynto = [NSMutableURLRequest requestWithURL:v.osoite];
    pyynto.timeoutInterval = 8;   // ei Icy-MetaData-otsaketta: puhdas ääni
    v.tehtava = [v.istunto dataTaskWithRequest:pyynto];
    [v.tehtava resume];
}

// Jono: tilakoneen 100 ms ajastin soivalle virralle.
- (void)varmistaAjastin
{
    if (self.ajastin != nil) return;
    dispatch_source_t a = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, RadioJono());
    dispatch_source_set_timer(a, dispatch_time(DISPATCH_TIME_NOW, 100 * NSEC_PER_MSEC), 100 * NSEC_PER_MSEC, 20 * NSEC_PER_MSEC);
    __weak MatkakirjaRadio* heikko = self;
    dispatch_source_set_event_handler(a, ^{ [heikko tarkista]; });
    dispatch_resume(a);
    self.ajastin = a;
}

- (void)pysayta:(MKVirta*)v
{
    [v vapauta];
    if (self.nykyinen != v) return;
    self.nykyinen = nil;
    [self uusiLaskuri];
    if (self.moottori.isRunning) [self.moottori pause];
    moottoriKaynnissa.store(false);
    if (self.ajastin != nil) { dispatch_source_cancel(self.ajastin); self.ajastin = nil; }
    ajastettuSek.store(0);
}

// Soitinsolmu tyhjäksi ja uusi laskuri (vanhojen puskurien valmistumiset osuvat vanhaan).
- (void)uusiLaskuri
{
    self.laskuri = [MKLaskuri new];
    self.laskuri->jonossa.store(0);
    self.laskuri->kulkee.store(false);
    if (self.soitinSolmu != nil && self.moottori != nil) [self.soitinSolmu stop];
    self.soittaa = NO;
}

- (void)asetaTila:(int)tila virta:(MKVirta*)v
{
    tilaSana.store((v->tunnus << 8) | (uint64_t)tila);
}

- (void)varapolku:(MKVirta*)v syy:(NSString*)syy
{
    if (v->suljettu.load()) return;
    if (v->esikuuntelu.load())
    {
        // Esikuuntelu ei vaihda soitinta: yhteys pois. Avaa menee tälle asemalle varapolulle vasta avattaessa.
        NSLog(@"MATKAKIRJA radio: esikuuntelu luopui (%@): %@", syy, v.osoite);
        [v vapauta];
        return;
    }
    NSURL* url = v.osoite;
    NSLog(@"MATKAKIRJA radio: varapolku AVPlayeriin (%@): %@", syy, url);
    [self pysayta:v];
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.virta != v) return;   // suljettu tai vaihdettu välissä
        self.virta = nil;
        [self avaaAVPlayer:url syy:syy];
    });
}

// ReadyToProducePackets: muunnin ja engine tälle muodolle. Virheet merkitään varaSyy:hyn (käsitellään
// jäsennyksen jälkeen, ei jäsentimen omassa kutsussa).
- (void)muotoValmis:(MKVirta*)v
{
    if (v->suljettu.load() || v->muotoValmis) return;
    AudioStreamBasicDescription sisaan = {};
    UInt32 koko = sizeof(sisaan);
    if (AudioFileStreamGetProperty(v->jasennin, kAudioFileStreamProperty_DataFormat, &koko, &sisaan) != noErr)
        { v.varaSyy = @"ei DataFormat-ominaisuutta"; return; }
    // HE-AAC (aacp): muotolistasta ensimmäinen soitettava (SBR → kaksinkertainen näytetaajuus).
    UInt32 listaKoko = 0; Boolean kirjoitettava = false;
    if (AudioFileStreamGetPropertyInfo(v->jasennin, kAudioFileStreamProperty_FormatList, &listaKoko, &kirjoitettava) == noErr
        && listaKoko >= sizeof(AudioFormatListItem))
    {
        std::vector<AudioFormatListItem> lista(listaKoko / sizeof(AudioFormatListItem));
        if (AudioFileStreamGetProperty(v->jasennin, kAudioFileStreamProperty_FormatList, &listaKoko, lista.data()) == noErr)
        {
            UInt32 indeksi = 0, ik = sizeof(indeksi);
            if (AudioFormatGetProperty(kAudioFormatProperty_FirstPlayableFormatFromList, listaKoko, lista.data(), &ik, &indeksi) == noErr
                && indeksi < lista.size())
                sisaan = lista[indeksi].mASBD;
        }
    }
    if (sisaan.mSampleRate <= 0 || sisaan.mChannelsPerFrame == 0 || sisaan.mChannelsPerFrame > 8)
        { v.varaSyy = [NSString stringWithFormat:@"muoto %@ %.0f Hz %u kanavaa", NeljaMerkkia(sisaan.mFormatID), sisaan.mSampleRate, (unsigned)sisaan.mChannelsPerFrame]; return; }
    AVAudioFormat* ulos = [[AVAudioFormat alloc] initStandardFormatWithSampleRate:sisaan.mSampleRate channels:sisaan.mChannelsPerFrame];
    AudioConverterRef muunnin = NULL;
    OSStatus tulos = AudioConverterNew(&sisaan, ulos.streamDescription, &muunnin);
    if (tulos != noErr || muunnin == NULL)
        { v.varaSyy = [NSString stringWithFormat:@"AudioConverterNew %@ (%@)", NeljaMerkkia((UInt32)tulos), NeljaMerkkia(sisaan.mFormatID)]; return; }
    UInt32 evasteKoko = 0;
    if (AudioFileStreamGetPropertyInfo(v->jasennin, kAudioFileStreamProperty_MagicCookieData, &evasteKoko, &kirjoitettava) == noErr && evasteKoko > 0)
    {
        std::vector<uint8_t> evaste(evasteKoko);
        if (AudioFileStreamGetProperty(v->jasennin, kAudioFileStreamProperty_MagicCookieData, &evasteKoko, evaste.data()) == noErr)
            AudioConverterSetProperty(muunnin, kAudioConverterDecompressionMagicCookie, evasteKoko, evaste.data());
    }
    v->sisaanMuoto = sisaan;
    v->muunnin = muunnin;
    v.ulosMuoto = ulos;
    UInt32 kap = (UInt32)(sisaan.mSampleRate * 0.1);   // ~100 ms puskurit
    v->kapasiteetti = kap < 2048 ? 2048 : kap;
    v->muotoValmis = true;
    v.muotoTeksti = [NSString stringWithFormat:@"%@ %.0f Hz %u kan", NeljaMerkkia(sisaan.mFormatID), sisaan.mSampleRate, (unsigned)sisaan.mChannelsPerFrame];
    // Esikuuntelu ei koske moottoriin: se valmistellaan käyttöönotossa (otaKayttoon).
    if (!v->esikuuntelu.load()) [self valmisteleMoottori:ulos];
}

- (void)valmisteleMoottori:(AVAudioFormat*)muoto
{
    if (self.moottori == nil)
    {
        self.moottori = [AVAudioEngine new];
        self.soitinSolmu = [AVAudioPlayerNode new];
        [self.moottori attachNode:self.soitinSolmu];
        self.liitettyMuoto = nil;
        __weak MatkakirjaRadio* heikko = self;
        self.muutosTarkkailija = [[NSNotificationCenter defaultCenter] addObserverForName:AVAudioEngineConfigurationChangeNotification
            object:self.moottori queue:nil usingBlock:^(NSNotification* n) {
                dispatch_async(RadioJono(), ^{ [heikko moottoriMuuttui]; });
            }];
#ifdef MATKAKIRJA_RADIO_TESTI
        if (testiMykka.load()) self.moottori.mainMixerNode.outputVolume = 0;
#endif
    }
    if (self.liitettyMuoto == nil || ![self.liitettyMuoto isEqual:muoto])
    {
        [self uusiLaskuri];
        [self.soitinSolmu removeTapOnBus:0];
        [self.moottori disconnectNodeOutput:self.soitinSolmu];
        [self.moottori connect:self.soitinSolmu to:self.moottori.mainMixerNode format:muoto];
        [self.soitinSolmu installTapOnBus:0 bufferSize:(AVAudioFrameCount)(muoto.sampleRate * 0.05) format:muoto
                                    block:^(AVAudioPCMBuffer* p, AVAudioTime* t) { VuTappi(p, t); }];
        self.liitettyMuoto = muoto;
    }
    self.soitinSolmu.volume = voimakkuusAtomi.load();
}

- (BOOL)kaynnistaMoottori
{
    if (self.moottori == nil) return NO;
    if (self.moottori.isRunning) { moottoriKaynnissa.store(true); return YES; }
    CFTimeInterval nyt = CACurrentMediaTime();
    if (self.viimeKaynnistysVirhe > 0 && nyt - self.viimeKaynnistysVirhe < 1.0) return NO;
    if (self.istuntoUudelleen) [self istuntoKuntoon];
    NSError* virhe = nil;
    [self.moottori prepare];
    if (![self.moottori startAndReturnError:&virhe])
    {
        self.viimeKaynnistysVirhe = nyt;
        self.moottoriVirhe = virhe.localizedDescription ?: @"start epäonnistui";
        moottoriKaynnissa.store(false);
        return NO;
    }
    self.viimeKaynnistysVirhe = 0;
    moottoriKaynnissa.store(true);
    moottoriKaynnistyksia.fetch_add(1);
    return YES;
}

// Reitti tai laite vaihtui (kuulokkeet, Bluetooth, näytteenottotaajuus): engine pysähtyi → puskurit pois,
// engine uudelleen tarkistuksessa ja soitto jatkuu uudelleenpuskuroinnin jälkeen.
- (void)moottoriMuuttui
{
    moottoriKaynnissa.store(false);
    if (self.moottori == nil) return;
    [self uusiLaskuri];
    MKVirta* v = self.nykyinen;
    if (v != nil) { v.kesken = nil; [self asetaTila:1 virta:v]; }
}

// Keskeytys (puhelu, hälytys). MixWithOthers-istunto ei aina saa "ended"-ilmoitusta, joten jatkoa ei sidota
// siihen: tarkistus yrittää enginen käynnistystä (istunnon uudelleenaktivointi ensin) enintään kerran
// sekunnissa, ja se onnistuu, kun keskeytys on ohi.
- (void)keskeytys:(BOOL)alkoi
{
    self.istuntoUudelleen = YES;
    moottoriKaynnissa.store(false);
    if (alkoi) [self uusiLaskuri];
    MKVirta* v = self.nykyinen;
    if (v != nil) { v.kesken = nil; [self asetaTila:1 virta:v]; }
}

- (void)mediapalvelutNollattu
{
    if (self.muutosTarkkailija) [[NSNotificationCenter defaultCenter] removeObserver:self.muutosTarkkailija];
    self.muutosTarkkailija = nil;
    self.moottori = nil;
    self.soitinSolmu = nil;
    self.liitettyMuoto = nil;
    self.laskuri = nil;
    self.soittaa = NO;
    self.istuntoUudelleen = YES;
    moottoriKaynnissa.store(false);
    MKVirta* v = self.nykyinen;
    if (v != nil && v.ulosMuoto != nil) { v.kesken = nil; [self valmisteleMoottori:v.ulosMuoto]; [self asetaTila:1 virta:v]; }
}

- (void)ajasta:(AVAudioPCMBuffer*)puskuri virta:(MKVirta*)v
{
    if (v != self.nykyinen || v->suljettu.load() || v->tauolla || self.soitinSolmu == nil || self.laskuri == nil) return;
    if (![puskuri.format isEqual:self.liitettyMuoto]) return;
    double taajuus = puskuri.format.sampleRate;
    MKLaskuri* l = self.laskuri;
    AVAudioFrameCount n = puskuri.frameLength;
    if ((l->jonossa.load() + (long)n) / taajuus > 6.0)
    {
        v->pudotetut.fetch_add(1);
        // Palvelimen alkupurske (Icecast burst) ylitti 6 s ennen kuin mitään on kuultu: vanhat puskurit pois
        // ja uusin data jatkaa (ei kuuluvaa hyppyä). Soiton aikana pudotetaan uusi puskuri.
        if (l->kulkee.load()) return;
        [self uusiLaskuri];
        l = self.laskuri;
    }
    l->jonossa.fetch_add((long)n);
    __weak MatkakirjaRadio* heikko = self;
    [self.soitinSolmu scheduleBuffer:puskuri completionCallbackType:AVAudioPlayerNodeCompletionDataPlayedBack
                   completionHandler:^(AVAudioPlayerNodeCompletionCallbackType laji) {
        long jaljella = l->jonossa.fetch_sub((long)n) - (long)n;
        bool ensimmainen = !l->kulkee.exchange(true);
        if (ensimmainen || jaljella <= 0) dispatch_async(RadioJono(), ^{ [heikko tarkista]; });
    }];
}

// Tilakone (jonossa): datan jälkeen, valmistumisista ja 100 ms ajastimesta.
- (void)tarkista
{
    MKVirta* v = self.nykyinen;
    if (v == nil || v->suljettu.load()) return;
    MKLaskuri* l = self.laskuri;
    double taajuus = self.liitettyMuoto.sampleRate > 0 ? self.liitettyMuoto.sampleRate : 44100.0;
    long jonossa = l != nil ? l->jonossa.load() : 0;
    ajastettuSek.store(jonossa > 0 ? jonossa / taajuus : 0);
    if (self.soittaa && l != nil && l->kulkee.load()) v->aaniKuultu.store(true);
    CFTimeInterval nyt = CACurrentMediaTime();
    if (!v->aaniKuultu.load() && nyt - v->alku > 8.0) { [self varapolku:v syy:@"ei ääntä 8 s"]; return; }
    if (v->loppui) { [self asetaTila:4 virta:v]; return; }
    if (v->tauolla || l == nil || self.moottori == nil) { [self asetaTila:1 virta:v]; return; }
    if (!self.moottori.isRunning)
    {
        moottoriKaynnissa.store(false);
        if (self.soittaa) [self uusiLaskuri];   // engine pysähtyi alta: puskurit uusiksi
        if (![self kaynnistaMoottori]) { [self asetaTila:1 virta:v]; return; }
        l = self.laskuri;
        jonossa = l->jonossa.load();
    }
    if (self.soittaa)
    {
        if (jonossa <= 0)
        {
            [self.soitinSolmu pause];
            self.soittaa = NO;
            l->kulkee.store(false);
            v->alivuodot.fetch_add(1);
            v->kynnys = fmin(v->kynnys + 1.0, 4.0);   // tasaisesti reunalla kulkeva palvelin: isompi pehmuste
            [self asetaTila:1 virta:v];
        }
        else [self asetaTila:l->kulkee.load() ? 2 : 1 virta:v];
        return;
    }
    if (jonossa / taajuus >= v->kynnys)
    {
        // Unityn iOS-projekti kääntää ilman Objective-C-poikkeuksia (@try ei käy): play() heittää vain, jos
        // moottori ei käy tai solmu ei ole kytketty, joten tarkistetaan se etukäteen.
        if (self.moottori.isRunning && self.soitinSolmu.engine != nil) { [self.soitinSolmu play]; self.soittaa = YES; }
        else self.moottoriVirhe = @"play: moottori ei käy";
    }
    [self asetaTila:1 virta:v];
}

- (void)taukoJonossa:(BOOL)paalle virta:(MKVirta*)v
{
    if (v != self.nykyinen || v->suljettu.load()) return;
    v->tauolla = paalle;
    v.kesken = nil;
    if (paalle)
    {
        if (self.soittaa) [self.soitinSolmu pause];
        self.soittaa = NO;
        if (self.laskuri != nil) self.laskuri->kulkee.store(false);
    }
    else
    {
        // Jatko livenä: vanhat puskurit pois, muunnin ja jäsennin alkavat puhtaalta kohdalta.
        [self uusiLaskuri];
        if (v->muunnin != NULL) AudioConverterReset(v->muunnin);
        v->epajatkuvuus = true;
        v->alku = CACurrentMediaTime();
        v->aaniKuultu.store(true);   // tauko ei käynnistä varapolkua
    }
    [self asetaTila:1 virta:v];
}

// ---- Pääsäie: AVPlayer-varapolku (VU −1) ----

- (void)avaaAVPlayer:(NSURL*)url syy:(NSString*)syy
{
    self.polku = 2;
    self.varaSyy = syy;
    dispatch_async(RadioJono(), ^{ [self istuntoKuntoon]; });
    AVPlayerItem* kohde = [AVPlayerItem playerItemWithURL:url];
    // Suora lähetys: pieni puskuri riittää, ja soitto alkaa heti kun voi.
    kohde.preferredForwardBufferDuration = 2.0;
    self.soitin = [AVPlayer playerWithPlayerItem:kohde];
    // EI automaticallyWaitsToMinimizeStalling = NO: silloin play() ennen puskuria jumittuu
    // heti, AVPlayer asettaa rate 0:ksi eikä jatka itse (iPad 23.9.2026: kaikki asemat
    // aikakatkaisuun). Oletus YES odottaa puskurin (preferredForwardBufferDuration 2 s).
    self.soitin.volume = self.voimakkuus;
#ifdef MATKAKIRJA_RADIO_TESTI
    if (testiMykka.load()) self.soitin.muted = YES;
#endif
    self.loppuTila = 0;
    __weak MatkakirjaRadio* heikko = self;
    NSNotificationCenter* nc = [NSNotificationCenter defaultCenter];
    self.loppuTarkkailija = [nc addObserverForName:AVPlayerItemDidPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    self.virheTarkkailija = [nc addObserverForName:AVPlayerItemFailedToPlayToEndTimeNotification object:kohde
        queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification* n) { heikko.loppuTila = 4; }];
    if (self.tauolla) [self.soitin pause]; else [self.soitin play];
}

- (int)tilaAVPlayer
{
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

// ---- Pääsäie: Unityn luvut joka kehys (halpoja: atomit, ei lukkoja) ----

- (int)tila
{
    switch (self.polku)
    {
        case 1:
        {
            uint64_t s = tilaSana.load();
            if (self.virta == nil || (s >> 8) != self.virta->tunnus || self.tauolla) return 1;
            return (int)(s & 0xff);
        }
        case 2: return self.soitin != nil ? [self tilaAVPlayer] : self.loppuTila;
        default: return self.loppuTila;
    }
}

// Soiko engine-polku ja raaka taso (rms, huippu). −1 = avplayer-polku (tasoa ei saada).
- (int)raaka:(float*)rms huippu:(float*)huippu
{
    *rms = 0; *huippu = 0;
    if (self.polku == 2) return -1;
    if (self.polku != 1 || self.tauolla || [self tila] != 2) return 0;
    return VuLue(rms, huippu) ? 1 : 0;
}

// Nopea nousu, lyhyt vaimennus (taso ~300 ms, huippu ~1 s). Taso ENNEN voimakkuutta (Linssisepän
// sopimus: mittari näyttää aseman tasoa, vaiennus erikseen).
- (float)taso:(BOOL)huippu
{
    float r, h;
    int t = [self raaka:&r huippu:&h];
    if (t < 0) return -1;
    if (self.polku == 0) { self.nayttoTaso = 0; self.nayttoHuippu = 0; self.edellinenLuku = 0; return 0; }
    CFTimeInterval nyt = CACurrentMediaTime();
    double dt = self.edellinenLuku > 0 ? nyt - self.edellinenLuku : 0;
    // Taso ja Huippu samassa kehyksessä: päivitetään kerran (muuten jälkimmäinen näkisi dt ≈ 0).
    if (self.edellinenLuku > 0 && dt < 0.002) return huippu ? self.nayttoHuippu : self.nayttoTaso;
    self.edellinenLuku = nyt;
    float uusiTaso = VuAsteikko(r), uusiHuippu = VuAsteikko(h);
    float vt = (float)exp(-dt / 0.3), vh = (float)exp(-dt / 1.0);
    self.nayttoTaso = uusiTaso > self.nayttoTaso ? uusiTaso : self.nayttoTaso * vt + uusiTaso * (1 - vt);
    self.nayttoHuippu = uusiHuippu > self.nayttoHuippu ? uusiHuippu : self.nayttoHuippu * vh;
    return huippu ? self.nayttoHuippu : self.nayttoTaso;
}

- (float)rms
{
    float r, h;
    int t = [self raaka:&r huippu:&h];
    return t < 0 ? -1 : r;
}

- (void)asetaVoimakkuus:(float)arvo
{
    self.voimakkuus = arvo;
    voimakkuusAtomi.store(arvo);
    if (self.polku == 2) self.soitin.volume = arvo;
    // Engine: yksi odottava asetus kerrallaan (ristihäivytys kutsuu joka kehys).
    if (!voimakkuusJonossa.exchange(true))
        dispatch_async(RadioJono(), ^{
            voimakkuusJonossa.store(false);
            self.soitinSolmu.volume = voimakkuusAtomi.load();
        });
}

- (void)tauko:(BOOL)paalle
{
    self.tauolla = paalle;
    taukoAtomi.store(paalle);
    if (paalle) [self suljeEsikuuntelu];   // Natiivisepän ehto 4: tauko sulkee esikuuntelun
    if (self.polku == 2 && self.soitin != nil) { if (paalle) [self.soitin pause]; else [self.soitin play]; }
    MKVirta* v = self.virta;
    if (self.polku == 1 && v != nil) dispatch_async(RadioJono(), ^{ [self taukoJonossa:paalle virta:v]; });
}

// Pääsäie: esikuuntelun tila kuvaukseen (atomit).
- (NSString*)esikuunteluTeksti
{
    MKVirta* e = self.esikuuntelija;
    NSString* nyt = e == nil || e->suljettu.load() ? @"-"
        : [NSString stringWithFormat:@"%@ %.1f s (%ld pakettia, %ld kt)", e.osoite.host ?: @"?", e->renkaanSek.load(),
            e->renkaanPaketit.load(), e->tavut.load() / 1024];
    return [NSString stringWithFormat:@"esikuuntelu %@, esikuuntelusta avattu %ld", nyt, esikuuntelustaAvattu.load()];
}

- (NSString*)kuvaus
{
    return [NSString stringWithFormat:@"%@, %@", [self kuvausIlmanEsikuuntelua], [self esikuunteluTeksti]];
}

- (NSString*)kuvausIlmanEsikuuntelua
{
#if TARGET_OS_IOS
    AVAudioSession* istunto = [AVAudioSession sharedInstance];
    NSString* istuntoTeksti = [NSString stringWithFormat:@"istunto %@ %@ reitti %@", istunto.category,
        istunto.isOtherAudioPlaying ? @"muu ääni soi" : @"", istunto.currentRoute.outputs.firstObject.portType ?: @"ei ulostuloa"];
#else
    NSString* istuntoTeksti = @"istunto (macOS)";
#endif
    if (self.polku == 1)
    {
        MKVirta* v = self.virta;
        uint64_t s = tilaSana.load();
        return [NSString stringWithFormat:@"polku engine, tila %d (sana %llu:%llu), Content-Type %@, muoto %@, ajastettu %.2f s, "
            "alivuodot %ld, pudotetut %ld, muunnosvirheet %ld, tavut %ld, tappikutsut %ld, rms %.4f, moottori %@ (käynnistyksiä %ld%@%@), "
            "tauko %d, voimakkuus %.2f, %@",
            [self tila], (unsigned long long)(s >> 8), (unsigned long long)(s & 0xff), v.sisaltoTyyppi ?: @"-", v.muotoTeksti ?: @"-",
            ajastettuSek.load(), v ? v->alivuodot.load() : 0, v ? v->pudotetut.load() : 0, v ? v->muunnosvirheet.load() : 0,
            v ? v->tavut.load() : 0, vuKutsut.load(), [self rms], moottoriKaynnissa.load() ? @"käy" : @"seis",
            moottoriKaynnistyksia.load(), self.moottoriVirhe ? @", virhe " : @"", self.moottoriVirhe ?: @"",
            (int)self.tauolla, self.voimakkuus, istuntoTeksti];
    }
    AVPlayer* s = self.soitin;
    if (s == nil) return [NSString stringWithFormat:@"ei soitinta, loppuTila %d", self.loppuTila];
    AVPlayerItem* k = s.currentItem;
    AVPlayerItemErrorLogEvent* viime = k.errorLog.events.lastObject;
    return [NSString stringWithFormat:@"polku avplayer (varapolun syy: %@), soitin %ld, kohde %ld, aika %ld (%@), kohta %.2f s, "
        "puskuri %@, loppuTila %d, soitinvirhe %@, kohdevirhe %@, virheloki %@ %ld %@, %@, VU −1",
        self.varaSyy ?: @"-", (long)s.status, (long)k.status, (long)s.timeControlStatus, s.reasonForWaitingToPlay ?: @"-",
        CMTimeGetSeconds(k.currentTime), k.playbackBufferEmpty ? @"tyhjä" : @"ei tyhjä", self.loppuTila,
        s.error.localizedDescription ?: @"-", k.error.localizedDescription ?: @"-",
        viime.errorDomain ?: @"-", (long)viime.errorStatusCode, viime.errorComment ?: @"-", istuntoTeksti];
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
    [[MatkakirjaRadio jaettu] asetaVoimakkuus:arvo < 0 ? 0 : arvo > 1 ? 1 : arvo];
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

float MatkakirjaRadio_Rms(void)
{
    return [[MatkakirjaRadio jaettu] rms];
}

float MatkakirjaRadio_Huippu(void)
{
    return [[MatkakirjaRadio jaettu] taso:YES];
}

// Merkkivalon tauko (web audio.pause/play): yhteys jää, data ei kulje.
void MatkakirjaRadio_Tauko(int paalle)
{
    [[MatkakirjaRadio jaettu] tauko:paalle != 0];
}

// Seuraavan aseman esikuuntelu (RadioLinssi); NULL tai tyhjä = pois.
void MatkakirjaRadio_Esikuuntele(const char* osoite)
{
    [[MatkakirjaRadio jaettu] esikuuntele:osoite != NULL ? [NSString stringWithUTF8String:osoite] : nil];
}

#ifdef MATKAKIRJA_RADIO_TESTI
// Vain macOS-testiohjelmalle: mikserin ulostulo 0 ja AVPlayer mykkä (ei ääntä kaiuttimiin).
void MatkakirjaRadio_TestiMykista(void)
{
    testiMykka.store(true);
}
#endif

}
