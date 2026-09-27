using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Paikallinen laattapalvelin (127.0.0.1) Cesiumin ja ämpärin väliin. Cesium hakee
    /// pallolaatat ja maaston osoitteesta http://127.0.0.1:portti/r/&lt;ämpärin polku&gt;, ja
    /// palvelin vastaa järjestyksessä:
    ///   0. buildin laattapaketista (<see cref="Laattapaketti"/>, StreamingAssets/laattapaketti.bin: pallon kaukonäkymä
    ///      Z0–Z5, maasto, vektorit, napakalotit, lennon Blue Marble Z0–Z4; esilatauspolitiikan kohta 1, löydös 80),
    ///   1. offline-kansiosta (Alueet: maittain ladattu, persistentDataPath/offline/, ei iCloud-varmuuskopiota),
    ///   2. välimuistista (temporaryCachePath/laatat/, iOS saa tyhjentää),
    ///   3. verkosta (UnityWebRequest pääsäikeessä, NSURLSession), joka tallentaa välimuistiin.
    /// Näin sama polku toimii striimauksessa ja offline-tilassa, eikä Cesiumin
    /// 4096 kohteen SQLite-välimuisti rajoita.
    ///
    /// LÖYDÖS 176: palvelin kuuntelee neljää porttia (pohja, maasto, kerma, muu; <see cref="LaattaPortit"/>), jotta iOS:n
    /// yhteysraja samaan isäntään (noin 6 rinnakkaista) ei jaa kaikkia kerroksia; jonot ovat yhteiset.
    ///
    /// iOS: Info.plistiin NSAllowsLocalNetworking (Rakennus.PaikallinenVerkkoPlist; koskee kaikkia 127.0.0.1-portteja).
    /// </summary>
    [DefaultExecutionOrder(-1000)]
    public class Laattapalvelin : MonoBehaviour
    {
        public const string Ampari = "https://media.matkakirja.app/";
        public static Laattapalvelin Instanssi { get; private set; }
        /// <summary>Paikallinen juuri, esim. http://127.0.0.1:52100/r/ (null ennen käynnistystä). Löydös 176: ensimmäisen
        /// portin (pohja) juuri; kaikki portit ovat <see cref="Juuret"/>-taulukossa.</summary>
        public static string Juuri { get; private set; }
        /// <summary>
        /// LÖYDÖS 176: paikalliset juuret portti-indeksin mukaan (<see cref="LaattaPortit.Luokka"/>: pohja, maasto, kerma, muu).
        /// Jokainen luokka saa oman portin eli oman isäntäavaimen, joten iOS:n yhteysraja samaan isäntään (noin 6) ei enää jaa
        /// kaikkia kerroksia. Yhden portin tilassa (<see cref="YksiPortti"/>) kaikki alkiot ovat samat. null ennen käynnistystä.
        /// </summary>
        public static string[] Juuret { get; private set; }
        /// <summary>Löydös 176: vanha yhden portin tila (kehittäjälippu LaattaPortit.YksiPorttiTiedosto / YksiPorttiAvain).</summary>
        public static bool YksiPortti { get; private set; }
        /// <summary>Kuunneltavien porttien määrä (1 yhden portin tilassa tai jos lisäportteja ei saatu).</summary>
        public static int Portteja { get; private set; }

        public static string OfflineKansio => Path.Combine(Application.persistentDataPath, "offline");
        public static string ValimuistiKansio => valimuistiKansio ?? Path.Combine(Application.temporaryCachePath, "laatat");
        static string valimuistiKansio;

        /// <summary>
        /// KYLMÄ KÄYNNISTYS LAITTEELLA ILMAN UUDELLEENASENNUSTA (löydös 171, kehittäjälippu): Documents/laatat-kylma.txt →
        /// tämä istunto käyttää tyhjää välimuistikansiota Caches/laatat-kylma-&lt;unix-aika&gt; (vanhaa ei poisteta eikä
        /// siirretä), ja lipputiedosto nimetään laatat-kylma-kaytetty.txt:ksi, joten seuraava käynnistys on taas lämmin
        /// tavallisesta kansiosta. Laattapaketti (build) pysyy käytössä kuten omistajan ensikäynnistyksessä. Kylmät kansiot
        /// ovat iOS:n tyhjennettävää välimuistia (Caches); ne jäävät, kunnes iOS tai sovelluksen poisto siivoaa ne.
        /// Ei App Store -käännöksessä.
        /// </summary>
        public const string KylmaTiedosto = "laatat-kylma.txt";

        static void KylmaValimuisti()
        {
#if !MATKAKIRJA_APPSTORE
            try
            {
                string lippu = Path.Combine(Application.persistentDataPath, KylmaTiedosto);
                if (!File.Exists(lippu)) return;
                string kaytetty = Path.Combine(Application.persistentDataPath, "laatat-kylma-kaytetty.txt");
                if (File.Exists(kaytetty)) File.Replace(lippu, kaytetty, null); else File.Move(lippu, kaytetty);
                valimuistiKansio = Path.Combine(Application.temporaryCachePath, "laatat-kylma-" + DateTimeOffset.UtcNow.ToUnixTimeSeconds());
                Debug.Log("MATKAKIRJA laattapalvelin: KYLMÄ välimuisti tälle istunnolle (kehittäjälippu " + KylmaTiedosto + "): " + valimuistiKansio);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA laattapalvelin: kylmä välimuisti ei onnistunut: " + e.Message); }
#endif
        }

        [Tooltip("Rinnakkaiset verkkohaut (UnityWebRequest).")]
        public int rinnakkain = 12;
        [Tooltip("Välimuistin yläraja megatavuina; käynnistyksessä karsitaan vanhimmat 75 %:iin (offline-kansio ei kuulu tähän).")]
        public int valimuistiMt = 600;

        TcpListener[] kuuntelijat;
        CancellationTokenSource lopetus;

        // ---- Löydös 176: varmistuslaskurit (Palvele) ----
        /// <summary>Avoimet asiakasyhteydet (Cesium ja UnityWebRequest → palvelin) yhteensä ja porteittain.</summary>
        static readonly LaattaPortit.Huippu yhteydet = new LaattaPortit.Huippu();
        /// <summary>Käsittelyssä olevat pyynnöt (otsake luettu, vastaus kirjoittamatta; myös paketti- ja välimuistiosumat).</summary>
        static readonly LaattaPortit.Huippu kasittelyssa = new LaattaPortit.Huippu();
        static readonly LaattaPortit.Huippu[] yhteydetPortti = UudetHuiput();
        static readonly LaattaPortit.Huippu[] kasittelyssaPortti = UudetHuiput();
        /// <summary>Yhteyksiä avattu ja pyyntöjä palveltu porteittain koko istunnossa.</summary>
        static readonly long[] yhteyksiaPortti = new long[LaattaPortit.Maara], pyyntojaPortti = new long[LaattaPortit.Maara];

        static LaattaPortit.Huippu[] UudetHuiput()
        {
            var t = new LaattaPortit.Huippu[LaattaPortit.Maara];
            for (int i = 0; i < t.Length; i++) t[i] = new LaattaPortit.Huippu();
            return t;
        }

        /// <summary>
        /// Löydös 176: yhteys- ja pyyntölaskurit yhdellä rivinosalla (palvelin- ja valmius-rivit). lukija 0 = komento "palvelin",
        /// 1 = valmius-rivi: kummankin ikkunan huippu nollautuu, kun se luetaan (maks = huippu edellisen saman lukijan rivin
        /// jälkeen). Jakauma porteittain luokan nimellä: "auki/maks y" = yhteydet, "käsittelyssä/maks p" = pyynnöt, sitten
        /// istunnon pyynnöt ja avatut yhteydet (NSURLSession käyttää yhteydet uudelleen, joten yhteyksiä on vähemmän kuin pyyntöjä).
        /// </summary>
        public static string YhteysKuvaus(int lukija)
        {
            var sb = new StringBuilder();
            sb.Append("portit ").Append(Portteja).Append(YksiPortti ? " (yksi-portti)" : "")
              .Append(" yhteydet ").Append(yhteydet.Nyt).Append(" maks ").Append(yhteydet.Ikkuna(lukija)).Append(" (istunto ").Append(yhteydet.Istunto).Append(')')
              .Append(" käsittelyssä ").Append(kasittelyssa.Nyt).Append(" maks ").Append(kasittelyssa.Ikkuna(lukija)).Append(" (istunto ").Append(kasittelyssa.Istunto).Append(") [");
            int n = Portteja <= 1 ? 1 : LaattaPortit.Maara;
            for (int i = 0; i < n; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(n == 1 ? "kaikki" : LaattaPortit.Nimet[i]).Append(' ')
                  .Append(yhteydetPortti[i].Nyt).Append('/').Append(yhteydetPortti[i].Ikkuna(lukija)).Append(" y ")
                  .Append(kasittelyssaPortti[i].Nyt).Append('/').Append(kasittelyssaPortti[i].Ikkuna(lukija)).Append(" p ")
                  .Append(Interlocked.Read(ref pyyntojaPortti[i])).Append(" pyyntöä ").Append(Interlocked.Read(ref yhteyksiaPortti[i])).Append(" yhteyttä");
            }
            return sb.Append(']').ToString();
        }
        readonly ConcurrentQueue<Haku> jono = new ConcurrentQueue<Haku>();
        /// <summary>Huntulaatat (pieniä, 3 kt) ohi jonon: näkyvän alueen huntu ehtii ennen kuin laatta näkyy ilman sitä.</summary>
        readonly ConcurrentQueue<Haku> kiireJono = new ConcurrentQueue<Haku>();
        /// <summary>Esilataus (lennon reitti): vain kun tavallinen jono on tyhjä, ja kaksi paikkaa jää näkyvälle kartalle.</summary>
        readonly ConcurrentQueue<Haku> esiJono = new ConcurrentQueue<Haku>();
        /// <summary>
        /// Etusijan esilataus (lennon kohdealue, Esilataus.Etusija): omat <see cref="KohdePaikat"/> rinnakkaista hakua
        /// näkyvän kartan paikkojen lisäksi, joten se etenee lennon aikana eikä viivästytä näkyviä laattoja.
        /// </summary>
        readonly ConcurrentQueue<Haku> kohdeJono = new ConcurrentQueue<Haku>();
        /// <summary>
        /// TAUSTAN ESILATAUS (laattojen esilataus erä 2: kohdekaupunkien saapumisnäkymät, <see cref="Esilataus.Tausta"/>): alin
        /// prioriteetti. Palvellaan vain, kun näkyvän kartan jono, kiirejono ja tavallinen esilatausjono ovat tyhjiä, kiirejonon
        /// hakuja ei ole käynnissä eikä yksikään verho odota, ja enintään <see cref="TaustaPaikat"/> hakua kerrallaan, jotta
        /// näkyvälle kartalle jää aina paikkoja (ESILATAUSPOLITIIKKA: ei hidasta näkyvää jonoa; VARTIJA 163b: ei kiirejonoa).
        /// </summary>
        readonly ConcurrentQueue<Haku> taustaJono = new ConcurrentQueue<Haku>();
        /// <summary>Taustan esilatauksen rinnakkaiset haut (erä 2).</summary>
        public const int TaustaPaikat = 4;
        int taustaKaynnissa;
        /// <summary>
        /// KOHDEMAAN SAAPUMINEN (löydös 171, <see cref="Esilataus.Saapuminen"/>): aloituslennon kohdemaan saapumisnäkymän pohja
        /// ja maasto jo lennon aikana. Palvellaan näkyvän kartan vapailla paikoilla (vain kun näkyvä jono on tyhjä, kaksi paikkaa
        /// jää aina näkyvälle) ennen tavallista esilatausta ja taustaa; verhon aikana tauolla (SaapumisKiire.SaapumisPalvellaan).
        /// Myös kohdemaan kerma kulkee tässä (ei kiirejonossa), jotta näkyvän jonon etusija säilyy (163b).
        /// </summary>
        readonly ConcurrentQueue<Haku> saapumisJono = new ConcurrentQueue<Haku>();
        int saapumisKaynnissa;

        /// <summary>
        /// SAAPUMISTILA (löydös 171; Saapumisvartija): laskeutumisesta kohdemaan näkymän valmistumiseen näkyvän kartan jonolla on
        /// <see cref="VerhoRinnakkain"/> paikkaa kuten verhon kevennyksessä, eikä tavallista esilatausta (paitsi verhon reitti)
        /// eikä taustaa palvella. Tauolle jääneet palaavat, kun sekä verhot että saapumistila ovat ohi. Vain pääsäikeestä.
        /// </summary>
        static readonly HashSet<string> saapumistilat = new HashSet<string>();

        /// <summary>Saapumistila päällä (joku saapuminen odottaa kohdemaan näkymää).</summary>
        public static bool Saapumistila => saapumistilat.Count > 0;

        /// <summary>Saapumistila alkaa (true) tai päättyy (false) syyn mukaan (Saapumisvartija). Idempotentti syyttäin.</summary>
        public static void AsetaSaapumistila(string syy, bool alku)
        {
            if (string.IsNullOrEmpty(syy)) return;
            if (alku) saapumistilat.Add(syy); else saapumistilat.Remove(syy);
            if (!alku) Instanssi?.Palauta();
        }

        /// <summary>Saapumistilan syyt lokiriville ("pois" tai syyt pilkuin).</summary>
        public static string SaapumistilaKuvaus() => saapumistilat.Count == 0 ? "pois" : string.Join(",", saapumistilat);

        /// <summary>
        /// VERHON KEVENNYS (Fablen päätös BUILD 16, löydös 80; Valmius.KevennysAlku/Loppu): kun jokin verho odottaa pallon
        /// latausta, näkyvän kartan jonolla on <see cref="VerhoRinnakkain"/> rinnakkaista hakua (muuten <see cref="rinnakkain"/>),
        /// eikä taustan esilatausta (aloitusnäyttö, lennon kohdealue) palvella; verhon odottama lennon reitti
        /// (<see cref="Esilataus.Verholle"/>) jatkuu. Tauolle jääneet palaavat jonoon, kun viimeinen verho lähtee.
        /// Vain pääsäikeestä.
        /// </summary>
        public const int VerhoRinnakkain = 24;
        static int verhot;
        readonly List<Haku> tauolla = new List<Haku>();

        /// <summary>Kevennystä pyytäviä verhoja (0 = normaali jono).</summary>
        public static int Verhot => verhot;

        /// <summary>Verho alkaa (true) tai lähtee (false). Viimeisen lähtiessä tauolla olleet haut jatkuvat.</summary>
        public static void VerhoKevennys(bool alku)
        {
            verhot = Math.Max(0, verhot + (alku ? 1 : -1));
            if (!alku) Instanssi?.Palauta();
        }

        /// <summary>
        /// Tauolla olleet haut takaisin jonoihinsa, kun yksikään verho ei odota eikä saapumistila ole päällä: kiirejonosta
        /// tulleet (kohdealueen Sentinel, Update) kiirejonoon, kohdemaan saapumisen laatat saapumisjonoon ja muut
        /// esilatausjonoon.
        /// </summary>
        void Palauta()
        {
            if (verhot > 0 || Saapumistila || tauolla.Count == 0) return;
            foreach (var h in tauolla)
                (h.Kiireesta ? kiireJono : h.Esi != null && h.Esi.Saapuminen ? saapumisJono : esiJono).Enqueue(h);
            tauolla.Clear();
        }
        const int KohdePaikat = 4;
        int kaynnissa, kohdeKaynnissa;
        string offline, valimuisti;

        /// <summary>Tilastot testaukseen: osumat paketti / offline / välimuisti / verkko, virheet, varakuvat.</summary>
        public static int Paketista, Offline, Valimuistista, Verkosta, Virheita, Varakuvia;

        /// <summary>
        /// Buildin laattapaketti (null = ei paketissa, rikki tai kehittäjälipulla pois). Avataan kerran; laatat luetaan
        /// tiedostosta hakiessa (hakemisto muistissa, ~200 kt).
        /// </summary>
        public static Laattapaketti Paketti { get; private set; }
        /// <summary>Kehittäjälippu A/B-mittaukseen: Documents/paketti-pois.txt → paketti ohitetaan (kylmä verkkoalku).</summary>
        public const string PakettiPoisTiedosto = "paketti-pois.txt";
        /// <summary>Maaston (layer.json) kansio ämpärin polkuna, OhjaaCesium asettaa (paketin sarjojen tarkistus).</summary>
        public static string MaastoPolku;

        /// <summary>
        /// Löydös 119 (komento "palvelin loki paalle|pois", oletus pois): jokainen epäonnistunut verkkoyritys ja jokainen
        /// haku, joka ei palauta 200 tai joka palautetaan Cesiumille virheenä, lokiin rivillä
        /// "MATKAKIRJA palvelin virhe &lt;luokka&gt; &lt;polku&gt; &lt;koodi&gt; &lt;yritykset&gt; &lt;ms&gt; &lt;seuraus&gt;"
        /// (ms haun alusta; seuraus: uusinta, loppu, pito N s, luovutus, cesiumille, varalaatta, tyhja, peruttu, esilataus).
        /// </summary>
        public static bool Loki;
        /// <summary>
        /// Löydös 119 korjaus 1 (komento "palvelin maastouusinta paalle|pois", oletus päällä): Cesiumin maastolaattaa
        /// (.terrain) ei palauteta virheenä verkkovirheen, aikakatkaisun tai 5xx:n takia (cesium-native piirtää
        /// epäonnistuneen laatan tyhjänä eikä yritä uudelleen = reikä), vaan sitä yritetään uudelleen porrastetulla
        /// viiveellä (Reikakorjaus.UusintaViive: 0,5, 1, 2, 4, 8 s, sitten 8 s:n välein) niin kauan kuin Cesium odottaa
        /// (yhteys auki). Aito 404/403 menee heti. Cesium for Unity ei aseta pyynnölle aikakatkaisua, joten pyyntö pysyy
        /// auki (Reikakorjaus.cs). Laite ilman verkkoa yli 10 s → virhe kuten ennen.
        /// </summary>
        public static bool MaastoUusinta = true;
        /// <summary>Löydös 176 kohta 3: väritason uusintakierrokset ja niistä onnistuneet (komento "palvelin").</summary>
        public static int VariUusintoja, VariPelastettu;
        /// <summary>Löydös 176 kohta 3: väritason uusintakierroksen viive.</summary>
        public const int VariUusintaViiveMs = 4000;
        /// <summary>
        /// Maastoluokan (.terrain, layer.json) laskurit komennon "palvelin" tulosteeseen (<see cref="MaastoKuvaus"/>):
        /// Cesiumin pyynnöt, verkosta haetut, epäonnistuneet verkkoyritykset, uusinnalla pelastetut, Cesiumille virheenä
        /// palautetut (joista 404/403), peruttu (Cesium sulki yhteyden pidon aikana) ja pidossa nyt.
        /// </summary>
        public static int MaastoPyyntoja, MaastoVerkosta, MaastoYritysVirheita, MaastoPelastettu, MaastoCesiumVirheita,
            Maasto404, MaastoPeruttu, MaastoPidossa;

        /// <summary>Editorin pelitila ilman domain reloadia: kokeilut ja laskurit eivät jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut()
        {
            Loki = false;
            MaastoUusinta = true;
            saapumistilat.Clear();
            MaastoPyyntoja = MaastoVerkosta = MaastoYritysVirheita = MaastoPelastettu = MaastoCesiumVirheita = 0;
            Maasto404 = MaastoPeruttu = MaastoPidossa = 0;
            VariUusintoja = VariPelastettu = 0;
        }

        /// <summary>Maastoluokan laskurit ja kytkimet yhdellä rivillä (komento "palvelin").</summary>
        public static string MaastoKuvaus() =>
            $"MATKAKIRJA laattapalvelin maasto: pyyntöjä {MaastoPyyntoja}, verkosta {MaastoVerkosta}, " +
            $"epäonnistuneita yrityksiä {MaastoYritysVirheita}, uusinnalla pelastettu {MaastoPelastettu}, " +
            $"Cesiumille virheenä {MaastoCesiumVirheita} (404/403 {Maasto404}), peruttu {MaastoPeruttu}, pidossa nyt {MaastoPidossa}; " +
            $"maastouusinta {(MaastoUusinta ? "päällä" : "pois")}, loki {(Loki ? "päällä" : "pois")}";

        /// <summary>Lokirivi (löydös 119), kun <see cref="Loki"/> on päällä. Kutsutaan myös palvelimen säikeistä.</summary>
        static void KirjaaVirhe(string luokka, string polku, int koodi, int yrityksia, long alku, string seuraus)
        {
            if (!Loki) return;
            long ms = (long)((System.Diagnostics.Stopwatch.GetTimestamp() - alku) * 1000.0 / System.Diagnostics.Stopwatch.Frequency);
            Debug.Log($"MATKAKIRJA palvelin virhe {luokka} {polku} {koodi} {yrityksia} {ms} {seuraus}");
        }

        /// <summary>
        /// Näkyvän kartan laattoja haussa (jonossa tai käynnissä): Alueet hidastaa offline-latauksen,
        /// jotta näkyvä näkymä latautuu ensin (omistajan build 5 -löydös 13).
        /// </summary>
        /// <remarks>Taustan esilatauksen (erä 2) haut eivät tee palvelimesta kiireistä: ne väistävät itse kaikkea muuta, eikä niiden
        /// pidä pysäyttää Esilataajan taustatasoja tai joutilas-tarkkailua.</remarks>
        public static bool Kiireinen => Instanssi != null && (Instanssi.kaynnissa - Instanssi.taustaKaynnissa > 0 || !Instanssi.jono.IsEmpty || !Instanssi.kiireJono.IsEmpty);

        /// <summary>
        /// Pohjalaatan polun alku (Rakennus.LaattaUrl ilman ämpäriä): jos tällainen laatta ei tule
        /// uusintayrityksistä huolimatta, Cesiumille annetaan pergamentin värinen varalaatta eikä virhettä,
        /// koska Cesium piirtää epäonnistuneen rasterin mustana eikä yritä uudelleen. Varakuvaa ei
        /// tallenneta välimuistiin, joten laatta haetaan uudelleen, kun Cesium lataa sen seuraavan kerran.
        /// </summary>
        public static string PohjaPolku;
        static byte[] varakuva;
        /// <summary>
        /// Väritason tyhjä laatta (läpinäkyvä, Varitaso): kaukonäkymän tasot (z &lt; alin taso, web: ei huntua
        /// maailmanäkymässä) ja puuttuvat laatat ilman verkkoa. Cesium piirtäisi epäonnistuneen laatan mustana.
        /// </summary>
        static byte[] tyhjakuva;
        sealed class VariKansio { public double[] Alue; public string Maailma; public int Alin; }
        static readonly ConcurrentDictionary<string, VariKansio> varialueet = new ConcurrentDictionary<string, VariKansio>();

        /// <summary>
        /// Väritason maakansio (ämpärin polku, "/"-loppuinen), sen alue asteina, maailman sarjan kansio
        /// (alueen ulkopuoliset laatat haetaan sieltä samalla z/x/y:llä; null = läpinäkyvä) ja alin taso.
        /// </summary>
        public static void VariAlue(string kansio, double lon0, double lat0, double lon1, double lat1, string maailma, int alin) =>
            varialueet[kansio] = new VariKansio { Alue = new[] { lon0, lat0, lon1, lat1 }, Maailma = maailma, Alin = alin };

        /// <summary>
        /// Väritason pyynnön ohjaus: tyhja = läpinäkyvä laatta heti; muuten polku (alueen ulkopuolella maailman
        /// sarjan laatta). varitasoa = polku kuuluu väritasoon (virhe → tyhjä, ei mustaa).
        /// </summary>
        static string VariOhjaus(string polku, out bool varitasoa, out bool tyhja)
        {
            varitasoa = tyhja = false;
            foreach (var p in varialueet)
            {
                if (!polku.StartsWith(p.Key, StringComparison.Ordinal)) continue;
                varitasoa = true;
                string loppu = polku.Substring(p.Key.Length);
                var osat = loppu.Split('/');
                if (osat.Length != 3) return polku;
                int piste = osat[2].IndexOf('.');
                if (!int.TryParse(osat[0], out int z) || !int.TryParse(osat[1], out int x)
                    || !int.TryParse(piste < 0 ? osat[2] : osat[2].Substring(0, piste), out int y)) return polku;
                if (z < p.Value.Alin) { tyhja = true; return polku; }
                double n = 1 << z, a = p.Value.Alue[0], e = p.Value.Alue[1], i = p.Value.Alue[2], ps = p.Value.Alue[3];
                double lonL = x / n * 360 - 180, lonI = (x + 1) / n * 360 - 180;
                double latP = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
                double latE = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI;
                bool ulkona = lonI <= a || lonL >= i || latP <= e || latE >= ps;
                if (!ulkona) return polku;
                if (p.Value.Maailma == null) { tyhja = true; return polku; }
                return p.Value.Maailma + loppu;
            }
            return polku;
        }

        static readonly ConcurrentDictionary<string, Func<int, int, int, bool>> kattavuudet =
            new ConcurrentDictionary<string, Func<int, int, int, bool>>();

        /// <summary>
        /// Harvan sarjan kattavuus (LENNON PINTA: Sentinel-2 vain kaupunkien ympärillä): kansion (ämpärin polku,
        /// "/"-loppuinen) laatta z/x/y (XYZ) haetaan vain, jos onko palauttaa true; muuten ja virheessä annetaan
        /// läpinäkyvä laatta heti ilman verkkoa (Cesium piirtäisi puuttuvan mustana). Kutsu säikeistä: onko
        /// ajetaan palvelimen säikeessä, joten sen pitää lukea vain muuttumatonta dataa.
        /// </summary>
        public static void Kattavuus(string kansio, Func<int, int, int, bool> onko)
        {
            if (onko == null) kattavuudet.TryRemove(kansio, out _);
            else kattavuudet[kansio] = onko;
        }

        static bool KattavuusOhjaus(string polku, out bool tyhja)
        {
            tyhja = false;
            foreach (var p in kattavuudet)
            {
                if (!polku.StartsWith(p.Key, StringComparison.Ordinal)) continue;
                var osat = polku.Substring(p.Key.Length).Split('/');
                if (osat.Length != 3) { tyhja = true; return true; }
                int piste = osat[2].IndexOf('.');
                if (!int.TryParse(osat[0], out int z) || !int.TryParse(osat[1], out int x)
                    || !int.TryParse(piste < 0 ? osat[2] : osat[2].Substring(0, piste), out int y)) { tyhja = true; return true; }
                tyhja = !p.Value(z, x, y);
                return true;
            }
            return false;
        }

        [Tooltip("Varalaatan väri (pergamentti, meren ja maan välissä).")]
        public Color32 varavari = new Color32(0xd9, 0xd0, 0xbb, 0xff);

        /// <summary>
        /// Esilatauksen edistyminen (Pelikoodari 24.9., build 9): Nappula vaihtaa lennon pinnan vasta, kun osa on
        /// valmiina, ja KarttaKerrokset perii edellisen lennon jonon. Säieturvallinen (taustasäie laskee, pääsäie lukee).
        /// </summary>
        public sealed class Esilataus
        {
            int yhteensa, valmiit, epaonnistui;
            volatile bool peruttu;
            public int Yhteensa => Volatile.Read(ref yhteensa);
            public int Valmis => Volatile.Read(ref valmiit);
            public int Epaonnistui => Volatile.Read(ref epaonnistui);
            public bool Peruttu => peruttu;
            /// <summary>
            /// Etusija (lennon kohdealue, build 11): haut omaan jonoonsa omilla paikoillaan (kohdeJono) eikä esilatausjonoon,
            /// jota palvellaan vain näkyvän jonon ollessa tyhjä (lennon aikana harvoin), jotta laskeutumisnäkymän laatat
            /// ovat perillä ajoissa.
            /// </summary>
            public bool Etusija { get; set; }
            /// <summary>Verho odottaa tätä esilatausta (aloituslennon reitti, Nappula): sitä palvellaan verhon kevennyksen aikanakin.</summary>
            public bool Verholle { get; set; }
            /// <summary>
            /// Taustan esilataus (erä 2, kohdekaupunkien saapumisnäkymät): oma jono (taustaJono), jota palvellaan vasta kaiken
            /// muun jälkeen, enintään <see cref="TaustaPaikat"/> kerrallaan eikä verhon aikana. Ei yhdessä Etusija/Verholle-lipun kanssa.
            /// </summary>
            public bool Tausta { get; set; }
            /// <summary>
            /// Kohdemaan saapuminen (löydös 171, aloituslennon kohdemaan näkymä): oma saapumisjono näkyvän kartan vapailla
            /// paikoilla ennen tavallista esilatausta (myös kerma). Ei yhdessä Tausta-lipun kanssa.
            /// </summary>
            public bool Saapuminen { get; set; }
            /// <summary>Käsitellyt (valmiit + epäonnistuneet) osuutena, 1 kun tyhjä tai peruttu.</summary>
            public float Osuus { get { int y = Yhteensa; return y == 0 || peruttu ? 1f : (float)(Valmis + Epaonnistui) / y; } }
            /// <summary>Jonossa odottavat haut vapautetaan ilman verkkoa; käynnissä olevat valmistuvat.</summary>
            public void Peru() => peruttu = true;
            internal void Lisaa(int n) => Interlocked.Add(ref yhteensa, n);
            internal void Merkitse(bool ok) { if (ok) Interlocked.Increment(ref valmiit); else Interlocked.Increment(ref epaonnistui); }
        }

        sealed class Haku
        {
            public string Polku;
            /// <summary>Esilatauksen haku (esiJono): peruttu → vapautetaan ilman verkkoa.</summary>
            public Esilataus Esi;
            public TaskCompletionSource<(int tila, byte[] data)> Valmis =
                new TaskCompletionSource<(int, byte[])>(TaskCreationOptions.RunContinuationsAsynchronously);
            /// <summary>Lokirivin luokka (Reikakorjaus.Luokka, väritaso "vari").</summary>
            public string Luokka = "muu";
            /// <summary>Maastoluokka (.terrain, layer.json) Cesiumilta: laskurit.</summary>
            public bool Maasto;
            /// <summary>
            /// Löydös 119: Cesiumin maastolaatta, jota ei palauteta virheenä verkkovirheen takia. Palauttaa, odottaako
            /// Cesium yhä (yhteys auki); null = tavallinen haku (kolme yritystä).
            /// </summary>
            public Func<bool> Pyydetty;
            /// <summary>Verkkoyritykset tähän mennessä (kaikki vuorot yhteensä).</summary>
            public int Yrityksia;
            /// <summary>Haun alku (Stopwatch-tikit): lokin ms ja offline-raja.</summary>
            public long Alku = System.Diagnostics.Stopwatch.GetTimestamp();
            /// <summary>Laskettu <see cref="MaastoPidossa"/>-laskuriin (pääsäie).</summary>
            public bool Pidossa;
            /// <summary>Haku tuli kiirejonosta tauolle (Palauta vie sen takaisin kiirejonoon).</summary>
            public bool Kiireesta;
            public double KuluS => (System.Diagnostics.Stopwatch.GetTimestamp() - Alku) / (double)System.Diagnostics.Stopwatch.Frequency;
        }

        /// <summary>
        /// Muuntaa ämpärin osoitteen paikalliseksi (muut osoitteet sellaisenaan). Löydös 176: portti luokan mukaan
        /// (<see cref="LaattaPortit.Luokka"/>), jotta jokainen luokka saa oman yhteyspoolinsa.
        /// </summary>
        public static string Paikallinen(string url)
        {
            var juuret = Juuret;
            if (juuret == null || url == null || !url.StartsWith(Ampari, StringComparison.Ordinal)) return url;
            string polku = url.Substring(Ampari.Length);
            return juuret[LaattaPortit.Luokka(polku)] + polku;
        }

        /// <summary>
        /// Paikallisen osoitteen ämpärin polku (mikä tahansa portti), tai null jos osoite ei ole paikallinen. Löydös 176:
        /// korvaa vertailun <see cref="Juuri"/>-etuliitteeseen, koska kerrokset ovat nyt eri porteissa.
        /// </summary>
        public static string PaikallinenPolku(string url)
        {
            var juuret = Juuret;
            if (juuret == null || url == null) return null;
            foreach (var j in juuret)
                if (j != null && url.StartsWith(j, StringComparison.Ordinal)) return url.Substring(j.Length);
            return null;
        }

        /// <summary>
        /// Tiedostopolku ämpärin polulle (kysely mukaan, jotta ?v=-versiot eivät sekoitu). Cesium lisää maastolaattoihin
        /// extensions=…; staattinen tiedosto ei riipu siitä, joten avain on sama kuin Alueiden lataamalla (layer.jsonin
        /// tiles-pohja) ja laattapaketissa (<see cref="Laattapaketti.Avain"/>).
        /// </summary>
        public static string Tiedosto(string juuri, string polku) =>
            Path.Combine(juuri, Laattapaketti.Avain(polku).Replace('/', Path.DirectorySeparatorChar));

        /// <summary>
        /// Paketin polku: StreamingAssets (iOS: Data/Raw/, Rakennus kopioi paketin Xcode-projektiin); editorissa
        /// myös projektin Build/laattapaketti/ (tyokalut/laattapaketti.mjs ja LaattapakettiRakennus kirjoittavat sinne).
        /// </summary>
        static string PakettiPolku()
        {
            string p = Path.Combine(Application.streamingAssetsPath, Laattapaketti.Tiedostonimi);
#if UNITY_EDITOR
            if (!File.Exists(p))
                p = Path.Combine(Path.GetDirectoryName(Application.dataPath), "Build", "laattapaketti", Laattapaketti.Tiedostonimi);
#endif
            return p;
        }

        /// <summary>
        /// Sarjat (ämpärin kansiot), joita kartta nyt käyttää: paketin muut sarjat ohitetaan (paketti on tehty eri
        /// sarjoista kuin tämä build, esim. uusi pohja ilman uutta pakettia).
        /// </summary>
        static HashSet<string> KaytossaOlevatSarjat()
        {
            var s = new HashSet<string>(StringComparer.Ordinal);
            void Kansio(string url)
            {
                if (url == null) return;
                if (url.StartsWith(Ampari, StringComparison.Ordinal)) url = url.Substring(Ampari.Length);
                int z = url.IndexOf("{z}", StringComparison.Ordinal);
                s.Add(z >= 0 ? url.Substring(0, z) : url);
            }
            if (PohjaPolku != null) s.Add(PohjaPolku);
            Kansio(KarttaKerrokset.SileaUrl);
            if (MaastoPolku != null) s.Add(MaastoPolku);
            if (!string.IsNullOrEmpty(KarttaKerrokset.SatelliittiVersio))
                Kansio(KarttaKerrokset.SatelliittiJuuri + KarttaKerrokset.SatelliittiVersio + "/" + KarttaKerrokset.SatelliittiMeri + "/");
            s.Add(Vektorikerros.Juuri);
            foreach (var k in NapaKannet.OfflinePolut()) s.Add(k.Substring(0, k.LastIndexOf('/') + 1));
            return s;
        }

        static void AvaaPaketti()
        {
            if (Paketti != null) return;
            try
            {
                if (File.Exists(Path.Combine(Application.persistentDataPath, PakettiPoisTiedosto)))
                {
                    Debug.Log("MATKAKIRJA laattapalvelin: paketti pois (kehittäjälippu " + PakettiPoisTiedosto + ")");
                    return;
                }
            }
            catch (Exception) { /* valinnainen */ }
            string polku = PakettiPolku();
            float alku = Time.realtimeSinceStartup;
            var p = Laattapaketti.Avaa(polku, out string virhe);
            if (p == null)
            {
                Debug.Log($"MATKAKIRJA laattapalvelin: ei pakettia ({virhe}): {polku}");
                return;
            }
            var pois = p.Rajaa(KaytossaOlevatSarjat());
            var sb = new StringBuilder();
            long tavut = 0;
            foreach (var s in p.Sarjat)
            {
                if (!s.Kaytossa) continue;
                sb.Append(' ').Append(s.Nimi).Append(' ').Append(s.Laattoja);
                tavut += s.Tavuja;
            }
            Debug.Log($"MATKAKIRJA laattapalvelin: paketti {p.Laattoja} laattaa, käytössä {tavut / 1048576.0:0.0} Mt ({sb.ToString().Trim()}), " +
                      $"avaus {(Time.realtimeSinceStartup - alku) * 1000:0} ms");
            if (pois.Count > 0)
                Debug.LogWarning("MATKAKIRJA laattapalvelin: paketin sarjat ohitettu (kartta käyttää eri sarjaa, paketti on vanha): " +
                                 string.Join(", ", pois));
            Paketti = p;
        }

        void Awake()
        {
            PyyntoLoki.Alusta();
            // Kehittäjälippu A/B:hen: defaults write … matkakirja-pohja-z10 -int 0 (sovellus kiinni) = pohja Z0–Z9 kuten ennen.
            KaupunkiRasteri.Paalla = PlayerPrefs.GetInt("matkakirja-pohja-z10", 1) != 0;
            if (varakuva == null)
            {
                var t = new Texture2D(256, 256, TextureFormat.RGB24, false);
                var px = new Color32[256 * 256];
                for (int i = 0; i < px.Length; i++) px[i] = varavari;
                t.SetPixels32(px);
                t.Apply(false);
                varakuva = t.EncodeToJPG(85);
                Destroy(t);
            }
            if (tyhjakuva == null)
            {
                var t = new Texture2D(256, 256, TextureFormat.RGBA32, false);
                t.SetPixels32(new Color32[256 * 256]);
                t.Apply(false);
                // PNG .webp-osoitteessa: Cesium tunnistaa kuvan tavuista, ei päätteestä.
                tyhjakuva = t.EncodeToPNG();
                Destroy(t);
            }
            if (Instanssi != null && Instanssi != this) { Destroy(this); return; }
            Instanssi = this;
            KylmaValimuisti();
            offline = OfflineKansio;
            valimuisti = ValimuistiKansio;
            Directory.CreateDirectory(offline);
            Directory.CreateDirectory(valimuisti);
#if UNITY_IOS && !UNITY_EDITOR
            UnityEngine.iOS.Device.SetNoBackupFlag(offline);
#endif
            try
            {
                YksiPortti = YksiPorttiLippu();
                var ensimmainen = new TcpListener(IPAddress.Loopback, 0);
                ensimmainen.Start(64);
                int portti = ((IPEndPoint)ensimmainen.LocalEndpoint).Port;
                Juuri = $"http://127.0.0.1:{portti}/r/";
                // Löydös 176: lisäportit (ensisijaisesti peräkkäiset) samalle käsittelijälle. Lisäportin virhe ei kaada
                // palvelinta: sen luokka jää ensimmäiseen porttiin (kuten ennen).
                var lista = new List<(TcpListener k, int luokka)> { (ensimmainen, 0) };
                var juuret = new string[LaattaPortit.Maara];
                for (int i = 0; i < juuret.Length; i++) juuret[i] = Juuri;
                for (int i = 1; !YksiPortti && i < LaattaPortit.Maara; i++)
                {
                    var k = AvaaLisaportti(LaattaPortit.PorttiEhdokas(portti, i));
                    if (k == null) continue;
                    juuret[i] = $"http://127.0.0.1:{((IPEndPoint)k.LocalEndpoint).Port}/r/";
                    lista.Add((k, i));
                }
                kuuntelijat = new TcpListener[lista.Count];
                for (int i = 0; i < lista.Count; i++) kuuntelijat[i] = lista[i].k;
                Juuret = juuret;
                Portteja = lista.Count;
                lopetus = new CancellationTokenSource();
                var peru = lopetus.Token;
                // Laskureiden portti-indeksi = luokka; luokka, jonka lisäportti ei auennut, näkyy ensimmäisen portin (pohja) alla.
                foreach (var (k, luokka) in lista) _ = Task.Run(() => Kuuntele(k, luokka, peru));
                var kuvaus = new StringBuilder();
                for (int i = 0; i < juuret.Length; i++) kuvaus.Append(i == 0 ? "" : ", ").Append(LaattaPortit.Nimet[i]).Append(' ').Append(juuret[i]);
                Debug.Log($"MATKAKIRJA laattapalvelin: {Juuri} (löydös 176: {Portteja} porttia{(YksiPortti ? ", yksi-portti-lippu" : "")}: {kuvaus})");
                OhjaaCesium();
                AvaaPaketti();
                long raja = (long)valimuistiMt * 1048576;
                _ = Task.Run(() => Karsi(valimuisti, raja));
            }
            catch (Exception e)
            {
                Juuri = null;
                Juuret = null;
                Portteja = 0;
                Debug.LogWarning("MATKAKIRJA laattapalvelin ei käynnistynyt, Cesium hakee suoraan: " + e.Message);
            }
        }

        /// <summary>Lisäportin kuuntelija ehdokasporttiin, varattuna käyttöjärjestelmän antamaan porttiin; null jos ei onnistu.</summary>
        static TcpListener AvaaLisaportti(int ehdokas)
        {
            foreach (int p in ehdokas > 0 ? new[] { ehdokas, 0 } : new[] { 0 })
            {
                TcpListener k = null;
                try
                {
                    k = new TcpListener(IPAddress.Loopback, p);
                    k.Start(64);
                    return k;
                }
                catch (Exception e)
                {
                    try { k?.Stop(); } catch { }
                    Debug.Log($"MATKAKIRJA laattapalvelin: lisäportti {p} ei auennut: {e.Message}");
                }
            }
            return null;
        }

        /// <summary>
        /// Löydös 176: yhden portin tila (A/B) kehittäjälipusta Documents/yksi-portti.txt (sisältö "0" = porttijako päällä,
        /// muu = yksi portti; tiedoston voi korvata devicectl:llä mutta ei poistaa) tai, jos tiedostoa ei ole, PlayerPrefsistä.
        /// </summary>
        static bool YksiPorttiLippu()
        {
            try
            {
                string f = Path.Combine(Application.persistentDataPath, LaattaPortit.YksiPorttiTiedosto);
                if (File.Exists(f)) return File.ReadAllText(f).Trim() != "0";
                return PlayerPrefs.GetInt(LaattaPortit.YksiPorttiAvain, 0) == 1;
            }
            catch (Exception) { return false; }
        }

        /// <summary>Karsii välimuistin vanhimmat tiedostot (viimeisin käyttö = muokkausaika), kun koko ylittää rajan.</summary>
        static void Karsi(string kansio, long raja)
        {
            try
            {
                var tiedostot = new DirectoryInfo(kansio).GetFiles("*", SearchOption.AllDirectories);
                long koko = 0;
                foreach (var f in tiedostot) koko += f.Length;
                if (koko <= raja) return;
                Array.Sort(tiedostot, (x, y) => x.LastWriteTimeUtc.CompareTo(y.LastWriteTimeUtc));
                long tavoite = raja * 3 / 4;
                int poistettu = 0;
                foreach (var f in tiedostot)
                {
                    if (koko <= tavoite) break;
                    try { koko -= f.Length; f.Delete(); poistettu++; } catch { }
                }
                Debug.Log($"MATKAKIRJA laattapalvelin: välimuisti karsittu, {poistettu} tiedostoa pois, {koko / 1048576} Mt jäljellä");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA laattapalvelin: karsinta epäonnistui: " + e.Message); }
        }

        /// <summary>Kohtauksen pallo (maasto) ja pohjalaatat hakemaan palvelimen kautta.</summary>
        static void OhjaaCesium()
        {
            foreach (var t in FindObjectsByType<CesiumForUnity.Cesium3DTileset>(FindObjectsSortMode.None))
            {
                string u = t.url;
                if (u != null && u.StartsWith(Ampari) && u.EndsWith("/layer.json", StringComparison.Ordinal))
                    MaastoPolku = u.Substring(Ampari.Length, u.Length - Ampari.Length - "layer.json".Length);
                t.url = Paikallinen(u);
            }
            foreach (var o in FindObjectsByType<CesiumForUnity.CesiumUrlTemplateRasterOverlay>(FindObjectsSortMode.None))
            {
                // Pohjakerros (taso 0 alkaen) saa varalaatan; linssien ja alueiden kerrokset eivät.
                string u = o.templateUrl;
                int z = u != null ? u.IndexOf("{z}", StringComparison.Ordinal) : -1;
                if (o.minimumLevel == 0 && z > 0 && u.StartsWith(Ampari) && u.Contains("pallo/laatat/"))
                {
                    PohjaPolku = u.Substring(Ampari.Length, z - Ampari.Length);
                    // POHJAN KAUPUNKITASO Z10 (KaupunkiRasteri): Z10 kaupunkien ympärillä, muualla Z9-vanhemmasta suurennettu.
                    if (KaupunkiRasteri.Paalla && o.maximumLevel < KaupunkiRasteri.Taso) o.maximumLevel = KaupunkiRasteri.Taso;
                }
                o.templateUrl = Paikallinen(u);
            }
        }

        void OnDestroy()
        {
            if (Instanssi != this) return;
            lopetus?.Cancel();
            if (kuuntelijat != null)
                foreach (var k in kuuntelijat) { try { k?.Stop(); } catch { } }
            Instanssi = null;
            Juuri = null;
            Juuret = null;
            Portteja = 0;
        }

        async Task Kuuntele(TcpListener kuuntelija, int portti, CancellationToken peru)
        {
            while (!peru.IsCancellationRequested)
            {
                TcpClient asiakas;
                try { asiakas = await kuuntelija.AcceptTcpClientAsync(); }
                catch { if (peru.IsCancellationRequested) return; continue; }
                _ = Task.Run(() => Palvele(asiakas, portti));
            }
        }

        async Task Palvele(TcpClient asiakas, int portti)
        {
            // Löydös 176: avoimet yhteydet ja käsittelyssä olevat pyynnöt (yhteensä ja porteittain) varmistuslaskureihin.
            yhteydet.Lisaa();
            yhteydetPortti[portti].Lisaa();
            Interlocked.Increment(ref yhteyksiaPortti[portti]);
            using (asiakas)
            {
                try
                {
                    asiakas.NoDelay = true;
                    var virta = asiakas.GetStream();
                    // Keep-alive: palvellaan pyyntöjä samasta yhteydestä, kunnes asiakas sulkee.
                    while (true)
                    {
                        string otsake = await LueOtsake(virta);
                        if (otsake == null) return;
                        int eka = otsake.IndexOf(' '), toka = eka < 0 ? -1 : otsake.IndexOf(' ', eka + 1);
                        if (eka < 0 || toka < 0) return;
                        string metodi = otsake.Substring(0, eka);
                        string kohde = otsake.Substring(eka + 1, toka - eka - 1);
                        bool sulje = otsake.IndexOf("Connection: close", StringComparison.OrdinalIgnoreCase) >= 0;
                        (int tila, byte[] data) vastaus = (404, null);
                        kasittelyssa.Lisaa();
                        kasittelyssaPortti[portti].Lisaa();
                        Interlocked.Increment(ref pyyntojaPortti[portti]);
                        try
                        {
                            // Löydös 119: pidossa oleva maastolaatta tarkistaa ennen uusintaa, odottaako Cesium yhä.
                            if (kohde.StartsWith("/r/")) vastaus = await Hae(kohde.Substring(3), null, () => AsiakasAuki(asiakas));
                            await Vastaa(virta, vastaus.tila, vastaus.data, kohde, metodi == "HEAD");
                        }
                        finally
                        {
                            kasittelyssa.Vahenna();
                            kasittelyssaPortti[portti].Vahenna();
                        }
                        if (sulje) return;
                    }
                }
                catch (Exception) { /* asiakas sulki */ }
                finally
                {
                    yhteydet.Vahenna();
                    yhteydetPortti[portti].Vahenna();
                }
            }
        }

        /// <summary>
        /// Asiakas (Cesium) odottaa yhä vastausta eli yhteys on auki. Poll(0, SelectRead) on tosi, kun luettavaa on tai
        /// yhteys on suljettu; Available 0 = suljettu (NSURLSession ei putkita, joten odottava pyyntö ei lähetä mitään).
        /// Kutsutaan pääsäikeestä, kun palvelimen säie odottaa hakua (ei samanaikaista lukua).
        /// </summary>
        static bool AsiakasAuki(TcpClient asiakas)
        {
            try
            {
                var s = asiakas.Client;
                if (s == null || !s.Connected) return false;
                return !(s.Poll(0, SelectMode.SelectRead) && s.Available == 0);
            }
            catch (Exception) { return false; }
        }

        static async Task<string> LueOtsake(NetworkStream virta)
        {
            // GET-pyynnöissä ei ole runkoa, eikä NSURLSession putkita: luetaan kunnes \r\n\r\n.
            var puskuri = new byte[8192];
            int n = 0;
            while (n < puskuri.Length)
            {
                int k = await virta.ReadAsync(puskuri, n, puskuri.Length - n);
                if (k == 0) return n == 0 ? null : Encoding.ASCII.GetString(puskuri, 0, n);
                n += k;
                for (int i = Math.Max(0, n - k - 3); i + 3 < n; i++)
                    if (puskuri[i] == '\r' && puskuri[i + 1] == '\n' && puskuri[i + 2] == '\r' && puskuri[i + 3] == '\n')
                        return Encoding.ASCII.GetString(puskuri, 0, n);
            }
            return null;
        }

        static async Task Vastaa(NetworkStream virta, int tila, byte[] data, string kohde, bool vainOtsake)
        {
            string tyyppi = kohde.Contains(".terrain") ? "application/vnd.quantized-mesh"
                : kohde.Contains(".json") || kohde.Contains(".geojson") ? "application/json"
                : kohde.Contains(".png") ? "image/png"
                : kohde.Contains(".webp") ? "image/webp" : "image/jpeg";
            int pituus = data?.Length ?? 0;
            string teksti = tila == 200 ? "OK" : tila == 404 ? "Not Found" : "Bad Gateway";
            var o = Encoding.ASCII.GetBytes(
                $"HTTP/1.1 {tila} {teksti}\r\nContent-Type: {tyyppi}\r\nContent-Length: {pituus}\r\n" +
                "Cache-Control: no-store\r\nAccess-Control-Allow-Origin: *\r\nConnection: keep-alive\r\n\r\n");
            await virta.WriteAsync(o, 0, o.Length);
            if (!vainOtsake && pituus > 0) await virta.WriteAsync(data, 0, pituus);
            await virta.FlushAsync();
        }

        /// <summary>
        /// Laatat välimuistiin etukäteen (LENNON PINTA, Fable 24.9.: sileän pinnan laatat latautuivat matkalla
        /// näkyvinä lohkoina). Polut ämpärin polkuina; jo välimuistissa olevat ohitetaan lukematta. Taustasäikeessä,
        /// ja haut odottavat, kunnes näkyvän kartan jono on tyhjä. Palauttaa edistymisen; <paramref name="jatka"/>
        /// lisää polut samaan esilataukseen (Sentinel-laatat kattavuuden latauduttua).
        /// </summary>
        public static Esilataus Esilataa(IReadOnlyCollection<string> polut, Esilataus jatka = null)
        {
            var e = jatka ?? new Esilataus();
            var p = Instanssi;
            if (p == null || polut == null || polut.Count == 0 || e.Peruttu) return e;
            e.Lisaa(polut.Count);
            var lista = new List<string>(polut);
            Task.Run(() => { foreach (var polku in lista) _ = Yksi(polku); });
            async Task Yksi(string polku)
            {
                try
                {
                    var (tila, _) = await p.Hae(polku, e);
                    e.Merkitse(tila == 200);
                }
                catch (Exception) { e.Merkitse(false); }
            }
            return e;
        }

        /// <summary>
        /// Hakee ämpärin polun: paketti → offline → välimuisti → verkko (tallentaa välimuistiin). Satelliittikansion vastaukset
        /// kirjataan (SatelliittiLoki) harmaiden suorakulmioiden selvitystä varten (build 11).
        /// </summary>
        async Task<(int, byte[])> Hae(string polku, Esilataus esilataus = null, Func<bool> pyydetty = null)
        {
            var lahde = new Lahde();
            long alkuT = System.Diagnostics.Stopwatch.GetTimestamp();
            // Valmiusdiagnostiikka: HTTP-pyynnöt (Cesium ja omat haut, ei esilatausta) luokittain kesken / valmiit / verkosta.
            var luokka = esilataus == null ? Luokat.GetOrAdd(Luokka(polku), _ => new int[4]) : null;
            if (luokka != null) Interlocked.Increment(ref luokka[0]);
            try
            {
                var tulos = await HaeSisalto(polku, esilataus, lahde, pyydetty);
                if (esilataus == null && polku.IndexOf("/satelliitti/", StringComparison.Ordinal) >= 0)
                    SatelliittiLoki.Kirjaa(polku, tulos.Item1, tulos.Item2, lahde.Nimi);
                if (esilataus == null && PyyntoLoki.Paalla)
                    PyyntoLoki.Kirjaa(Luokka(polku), polku, lahde.Nimi, tulos.Item1,
                        (System.Diagnostics.Stopwatch.GetTimestamp() - alkuT) * 1000.0 / System.Diagnostics.Stopwatch.Frequency);
                return tulos;
            }
            finally
            {
                if (luokka != null)
                {
                    Interlocked.Decrement(ref luokka[0]);
                    Interlocked.Increment(ref luokka[1]);
                    if (lahde.Nimi == "verkko") Interlocked.Increment(ref luokka[2]);
                    else if (lahde.Nimi == "paketti") Interlocked.Increment(ref luokka[3]);
                }
            }
        }

        /// <summary>
        /// VALMIUSDIAGNOSTIIKKA (Valmius.cs, löydös 80): palvelimen HTTP-pyynnöt luokittain (<see cref="Luokka"/>):
        /// [0] kesken (Cesium odottaa vastausta), [1] valmistuneet, [2] niistä verkosta, [3] niistä paketista.
        /// Esilataus ei kuulu tähän.
        /// </summary>
        public static readonly ConcurrentDictionary<string, int[]> Luokat = new ConcurrentDictionary<string, int[]>();

        /// <summary>Cesiumin valmistuneet laattahaut yhteensä (Luokat [1]; ei esilatausta). Vartija 163 vertaa kehysten välillä.</summary>
        public static long CesiumValmiita
        {
            get { long n = 0; foreach (var kv in Luokat) n += Volatile.Read(ref kv.Value[1]); return n; }
        }

        /// <summary>
        /// Ämpärin polun luokka diagnostiikkaan: pohja (pallo/laatat), maasto, kerma (väritaso), sat/&lt;sarja&gt;
        /// (lennon pinta: bmng-bathy, s2-alkup …), muuten ensimmäinen kansio julisteet/-etuliitteen jälkeen.
        /// </summary>
        public static string Luokka(string polku)
        {
            if (string.IsNullOrEmpty(polku)) return "?";
            int q = polku.IndexOf('?');
            if (q >= 0) polku = polku.Substring(0, q);
            if (polku.StartsWith("julisteet/", StringComparison.Ordinal)) polku = polku.Substring("julisteet/".Length);
            var o = polku.Split('/');
            if (o.Length >= 4 && o[0] == "pallo" && o[1] == "satelliitti") return "sat/" + o[3];
            if (o.Length >= 2 && o[0] == "pallo") return o[1] == "laatat" ? "pohja" : o[1];
            return o[0];
        }

        /// <summary>Verkkojonojen tila diagnostiikkaan (Valmius): käynnissä olevat haut ja jonojen pituudet.</summary>
        public static string JonoTila()
        {
            var p = Instanssi;
            if (p == null) return "-";
            return $"käynnissä {p.kaynnissa} (kohde {p.kohdeKaynnissa}, kiire {p.kiireKaynnissa}, tausta {p.taustaKaynnissa}, saapuminen {p.saapumisKaynnissa}) jono {p.jono.Count} " +
                   $"kiire {p.kiireJono.Count} esi {p.esiJono.Count} kohdejono {p.kohdeJono.Count} taustajono {p.taustaJono.Count} " +
                   $"saapumisjono {p.saapumisJono.Count} tauolla {p.tauolla.Count} nälkä163b {PohjaNalka} saapumistila {SaapumistilaKuvaus()}";
        }

        sealed class Lahde { public string Nimi = "?"; }

        /// <summary>Kaupunkitason ulkopuoliset Z10-laatat, jotka tehtiin Z9-vanhemmasta (loki ja testit).</summary>
        public static int Vanhemmasta10;
        readonly ConcurrentQueue<(byte[] data, int qx, int qy, TaskCompletionSource<byte[]> valmis)> suurennokset =
            new ConcurrentQueue<(byte[], int, int, TaskCompletionSource<byte[]>)>();

        /// <summary>
        /// Z10-laatta Z9-vanhemman neljänneksestä (KaupunkiRasteri): vanhempi tavallista reittiä (paketti, offline, välimuisti,
        /// verkko; virheessä varalaatta), suurennus pääsäikeessä (Texture2D). Ei välimuistiin: vanhempi on siellä.
        /// </summary>
        async Task<(int, byte[])> Vanhemmasta(string polku, int z, int x, int y, Lahde lahde, Func<bool> pyydetty)
        {
            string vp = KaupunkiRasteri.Vanhempi(polku, PohjaPolku, z, x, y, out int qx, out int qy);
            var (tila, data) = await HaeSisalto(vp, null, new Lahde(), pyydetty);
            if (tila != 200 || data == null) return (tila, data);
            var tcs = new TaskCompletionSource<byte[]>(TaskCreationOptions.RunContinuationsAsynchronously);
            suurennokset.Enqueue((data, qx, qy, tcs));
            var tulos = await tcs.Task;
            if (tulos == null) return (200, varakuva);
            Interlocked.Increment(ref Vanhemmasta10);
            lahde.Nimi = "vanhemmasta";
            return (200, tulos);
        }

        /// <summary>Pääsäikeessä: enintään <paramref name="enintaan"/> suurennusta kehyksessä (JPEG → neljännes → JPEG 85).</summary>
        void Suurenna(int enintaan)
        {
            for (int i = 0; i < enintaan && suurennokset.TryDequeue(out var s); i++)
            {
                byte[] tulos = null;
                Texture2D t = null, u = null;
                try
                {
                    t = new Texture2D(2, 2, TextureFormat.RGB24, false);
                    if (t.LoadImage(s.data, false) && t.width == t.height && t.width >= 2)
                    {
                        int koko = t.width;
                        var px = t.GetPixels32();
                        var rgb = new byte[koko * koko * 3];
                        for (int k = 0; k < px.Length; k++) { rgb[k * 3] = px[k].r; rgb[k * 3 + 1] = px[k].g; rgb[k * 3 + 2] = px[k].b; }
                        u = new Texture2D(koko, koko, TextureFormat.RGB24, false);
                        u.LoadRawTextureData(KaupunkiRasteri.Suurenna(rgb, koko, s.qx, s.qy));
                        u.Apply(false);
                        tulos = u.EncodeToJPG(85);
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA laattapalvelin: Z10 vanhemmasta: " + e.Message); }
                finally { if (t != null) Destroy(t); if (u != null) Destroy(u); }
                s.valmis.TrySetResult(tulos);
            }
        }

        /// <summary>
        /// JPEG kokonainen: alussa SOI (FF D8) ja lopussa EOI (FF D9, enintään 16 täytetavun päässä). Katkennut JPEG
        /// dekoodautuu Cesiumissa harmaaksi loppuosaltaan (puuttuvat lohkot = DC 0 = keskiharmaa, alfa 1), eikä
        /// lennon varakartta silloin laukea. Muut tiedostotyypit hyväksytään sellaisenaan.
        /// </summary>
        public static bool KuvaEhja(string polku, byte[] data)
        {
            if (data == null || !polku.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)) return true;
            if (data.Length < 4 || data[0] != 0xFF || data[1] != 0xD8) return false;
            for (int i = data.Length - 2; i >= Math.Max(2, data.Length - 18); i--)
                if (data[i] == 0xFF && data[i + 1] == 0xD9) return true;
            return false;
        }

        async Task<(int, byte[])> HaeSisalto(string polku, Esilataus esilataus, Lahde lahde, Func<bool> pyydetty)
        {
            bool esi = esilataus != null;
            long alku = System.Diagnostics.Stopwatch.GetTimestamp();
            polku = Uri.UnescapeDataString(polku);
            bool maasto = !esi && Reikakorjaus.OnMaasto(polku);
            if (maasto) Interlocked.Increment(ref MaastoPyyntoja);
            if (polku.Contains(".."))
            {
                KirjaaVirhe(Reikakorjaus.Luokka(polku, PohjaPolku), polku, 404, 0, alku, "cesiumille");
                return (404, null);
            }
            polku = VariOhjaus(polku, out bool varitasoa, out bool tyhja);
            if (tyhja && tyhjakuva != null) { lahde.Nimi = "tyhja"; return (200, tyhjakuva); }
            if (KattavuusOhjaus(polku, out bool kattavuusTyhja))
            {
                varitasoa = true;   // virhe → läpinäkyvä, ei mustaa
                if (kattavuusTyhja && tyhjakuva != null) { lahde.Nimi = "kattamaton"; return (200, tyhjakuva); }
            }
            // POHJAN KAUPUNKITASO: tunnetusta joukosta puuttuva Z10 tehdään heti Z9-vanhemmasta (ei 404-hakua); esilataus
            // ohittaa sen (vanhempi ladataan omana laattanaan).
            int kz = 0, kx = 0, ky = 0;
            bool kaupunkitaso = !varitasoa && KaupunkiRasteri.Paalla && PohjaPolku != null
                                && KaupunkiRasteri.Jasenna(polku, PohjaPolku, out kz, out kx, out ky) && kz == KaupunkiRasteri.Taso;
            if (kaupunkitaso && KaupunkiRasteri.Onko(kz, kx, ky) == false)
                return esi ? (404, null) : await Vanhemmasta(polku, kz, kx, ky, lahde, pyydetty);
            // 0. Buildin laattapaketti (ei levyn tiedostohakua eikä verkkoa).
            var paketti = Paketti;
            if (paketti != null)
            {
                string avain = Laattapaketti.Avain(polku);
                if (esi) { if (paketti.Onko(avain)) return (200, null); }
                else
                {
                    var b = paketti.Hae(avain);
                    if (b != null && KuvaEhja(polku, b))
                    {
                        LaattaOsumat.Levylta(polku, false);
                        Interlocked.Increment(ref Paketista);
                        lahde.Nimi = "paketti";
                        return (200, b);
                    }
                }
            }
            string f = Tiedosto(offline, polku);
            if (File.Exists(f))
            {
                if (esi) return (200, null);
                var sisalto = Pura(File.ReadAllBytes(f));
                if (KuvaEhja(polku, sisalto)) { Interlocked.Increment(ref Offline); lahde.Nimi = "offline"; VerkkoOdotus.Osuma("laatta", true); LaattaOsumat.Levylta(polku, false); return (200, sisalto); }
                Debug.LogWarning($"MATKAKIRJA laattapalvelin: offline-laatta rikki ({sisalto.Length} t), haetaan verkosta: {polku}");
            }
            f = Tiedosto(valimuisti, polku);
            if (File.Exists(f))
            {
                byte[] sisalto = null;
                if (!esi || polku.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase))
                    try { sisalto = File.ReadAllBytes(f); } catch (Exception) { sisalto = null; }
                if (sisalto != null && KuvaEhja(polku, sisalto))
                {
                    if (esi) return (200, null);
                    Interlocked.Increment(ref Valimuistista);
                    VerkkoOdotus.Osuma("laatta", true);
                    LaattaOsumat.Levylta(polku, true);
                    try { File.SetLastWriteTimeUtc(f, DateTime.UtcNow); } catch { }
                    lahde.Nimi = "valimuisti";
                    return (200, sisalto);
                }
                if (esi && sisalto == null && File.Exists(f)) return (200, null);
                // Rikkinäinen tai kadonnut välimuistitiedosto: pois ja verkosta uudelleen.
                Debug.LogWarning($"MATKAKIRJA laattapalvelin: välimuistin laatta rikki ({sisalto?.Length ?? -1} t), haetaan verkosta: {polku}");
                try { File.Delete(f); } catch { }
            }
            if (esi && esilataus.Peruttu) return (499, null);
            // Osuma-% (Esilataaja erä 1): näkyvän kartan laatta verkosta = huti (esilataus ei ole pyyntö).
            if (!esi) { VerkkoOdotus.Osuma("laatta", false); LaattaOsumat.Verkosta(); }
            var h = new Haku
            {
                Polku = polku, Esi = esilataus, Alku = alku, Maasto = maasto,
                Luokka = varitasoa ? "vari" : Reikakorjaus.Luokka(polku, PohjaPolku),
                // Löydös 119: Cesiumin maastolaattaa ei palauteta virheenä verkkovirheen takia, kun Cesium yhä odottaa.
                Pyydetty = !esi && pyydetty != null && Reikakorjaus.OnMaastolaatta(polku) ? pyydetty : null,
            };
            // Kiirejono on Cesiumin omille huntu- ja Sentinel-pyynnöille (varitasoa: myös harvat sarjat, KattavuusOhjaus).
            // Harvan sarjan esilataus kulki ennen aina kiirejonoon, joten mustan verhon lähikuvan aikana näkyvän kartan
            // haut jonottivat lennon kohteen Sentinel-esilatauksen takana (lokit/verho-jalkeen: kiire 171 → 47, näkyvä jono 6,
            // käynnissä 28 = kiireen paikat). Nyt vain verhon odottama reitti (Verholle) ja kohdealue (Etusija, verhon ajan
            // tauolla: Update) käyttävät kiirejonoa; aloitusnäytön Sentinel-esilataus kulkee esilatausjonossa muun listan tavoin.
            // Löydös 171: kohdemaan saapumisen laatat (myös kerma) saapumisjonoon (SaapumisKiire.Valitse).
            switch (Matkakirja.SaapumisKiire.Valitse(esi, varitasoa, esi && esilataus.Verholle, esi && esilataus.Etusija,
                        esi && esilataus.Saapuminen, esi && esilataus.Tausta))
            {
                case Matkakirja.SaapumisKiire.Jono.Nakyva: jono.Enqueue(h); break;
                case Matkakirja.SaapumisKiire.Jono.Kiire: kiireJono.Enqueue(h); break;
                case Matkakirja.SaapumisKiire.Jono.Kohde: kohdeJono.Enqueue(h); break;
                case Matkakirja.SaapumisKiire.Jono.Saapuminen: saapumisJono.Enqueue(h); break;
                case Matkakirja.SaapumisKiire.Jono.Tausta: taustaJono.Enqueue(h); break;
                default: esiJono.Enqueue(h); break;
            }
            var (tila, data) = await h.Valmis.Task;
            // LÖYDÖS 176 kohta 3: väritason (kerma, harvat sarjat) Cesium-pyyntö, joka epäonnistui tilapäisesti kaikilla kolmella
            // yrityksellä, palautuisi läpinäkyvänä laattana, eikä Cesium pyydä sitä uudelleen (se sai vastauksen 200) → laatta
            // jäisi pysyvästi ilman huntua. Valinta: yksi uusintakierros (kolme yritystä kuten ennen) viiveen
            // VariUusintaViiveMs jälkeen, jos Cesium yhä odottaa (yhteys auki). Tyhjää ei tallenneta välimuistiin nytkään
            // (vain onnistunut verkkohaku kirjoitetaan), joten seuraava lataus hakee oikean laatan. Aito 404/403 (merilaatat)
            // palautuu heti tyhjänä kuten ennen. Odotus pitää kerman portin yhden yhteyden varattuna, ei muiden luokkien.
            if (tila != 200 && tila != 499 && varitasoa && !esi && pyydetty != null && Reikakorjaus.Uusittava(tila))
            {
                Interlocked.Increment(ref VariUusintoja);
                KirjaaVirhe(h.Luokka, polku, tila, h.Yrityksia, alku, "uusinta " + (VariUusintaViiveMs / 1000) + " s");
                await Task.Delay(VariUusintaViiveMs);
                bool odottaa;
                try { odottaa = pyydetty(); } catch (Exception) { odottaa = false; }
                if (odottaa)
                {
                    var u = new Haku { Polku = polku, Alku = alku, Luokka = h.Luokka, Yrityksia = h.Yrityksia };
                    kiireJono.Enqueue(u);
                    (tila, data) = await u.Valmis.Task;
                    if (tila == 200 && data != null) Interlocked.Increment(ref VariPelastettu);
                    h = u;
                }
            }
            lahde.Nimi = "verkko";
            if (tila == 200 && !KuvaEhja(polku, data))
            {
                // Katkennut lataus: ei välimuistiin, ja Cesium saa virheen (esivanhemman rasteri / varakartta) harmaan sijaan.
                Debug.LogWarning($"MATKAKIRJA laattapalvelin: verkon laatta rikki ({data?.Length ?? 0} t): {polku}");
                tila = 502;
                data = null;
            }
            // Kaupunkitason ulkopuolinen Z10: näkyvälle vanhemmasta, esilataukselle pelkkä virhe (ei varalaattaa eikä
            // varalla-listaa, joka latauttaisi pohjan uudelleen).
            if (tila != 200 && tila != 499 && kaupunkitaso) return esi ? (tila, null) : await Vanhemmasta(polku, kz, kx, ky, lahde, pyydetty);
            if (tila != 200 && varakuva != null && PohjaPolku != null && polku.StartsWith(PohjaPolku))
            {
                Interlocked.Increment(ref Varakuvia);
                varalla.TryAdd(polku, 0);
                KirjaaVirhe(h.Luokka, polku, tila, h.Yrityksia, alku, "varalaatta");
                return (200, varakuva);
            }
            // Väritason puuttuva laatta: läpinäkyvä (Cesium piirtäisi epäonnistuneen mustana).
            if (tila != 200 && varitasoa && tyhjakuva != null)
            {
                KirjaaVirhe(h.Luokka, polku, tila, h.Yrityksia, alku, "tyhja");
                return (200, tyhjakuva);
            }
            if (tila == 200 && data != null)
            {
                Interlocked.Increment(ref Verkosta);
                if (maasto)
                {
                    Interlocked.Increment(ref MaastoVerkosta);
                    if (h.Yrityksia > 1) Interlocked.Increment(ref MaastoPelastettu);
                }
                try
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(f));
                    string tmp = f + "." + Guid.NewGuid().ToString("N") + ".tmp";
                    File.WriteAllBytes(tmp, data);
                    if (File.Exists(f)) File.Delete(tmp); else File.Move(tmp, f);
                    if (esi) LaattaOsumat.Esiladattu(polku);
                }
                catch (Exception) { /* välimuisti on valinnainen */ }
            }
            else
            {
                Interlocked.Increment(ref Virheita);
                if (tila == 499)
                {
                    // Peruttu: esilataus, tai Cesium sulki yhteyden maastolaatan pidon aikana (vastausta ei lue kukaan).
                    if (maasto)
                    {
                        Interlocked.Increment(ref MaastoPeruttu);
                        KirjaaVirhe(h.Luokka, polku, tila, h.Yrityksia, alku, "peruttu");
                    }
                }
                else
                {
                    if (maasto)
                    {
                        Interlocked.Increment(ref MaastoCesiumVirheita);
                        if (tila == 404 || tila == 403) Interlocked.Increment(ref Maasto404);
                    }
                    KirjaaVirhe(h.Luokka, polku, tila, h.Yrityksia, alku, esi ? "esilataus" : "cesiumille");
                }
            }
            return (tila, data);
        }

        /// <summary>
        /// Pohjalaatat, joiden tilalle annettiin varalaatta. Cesium ei hae laattaa uudelleen (se sai vastauksen),
        /// joten pergamenttinen suorakulmio jäisi kartalle (Laitetestaaja 24.9.: umpikerma Espanjan–Saharan yllä).
        /// Ne haetaan uudelleen rauhallisena hetkenä, ja kun yksikin onnistuu, pohjakerros ladataan uudelleen
        /// Cesiumiin (laatat tulevat nyt välimuistista).
        /// </summary>
        readonly ConcurrentDictionary<string, byte> varalla = new ConcurrentDictionary<string, byte>();
        float seuraavaUusinta;
        bool uusintaKesken;

        void Update()
        {
            SatelliittiLoki.Yhteenveto();
            Suurenna(6);
            // Huntulaatoille neljä lisäpaikkaa, jotta ne eivät jää suurten pohja- ja maastolaattojen taakse.
            // Kohdealueen paikat eivät vie näkyvän kartan paikkoja (muut rajat ilman niitä).
            // Verhon kevennys (BUILD 16): näkyvän kartan jonolle enemmän paikkoja, tausta tauolla.
            // Löydös 171: saapumistilassa (laskeutumisesta kohdemaan näkymän valmistumiseen) sama raja kuin verhossa.
            bool saapumistila = Saapumistila;
            // Löydös 176: usealla portilla Cesiumin yhteyksiä on enemmän (4 × ~6), joten näkyvän jonon paikkoja on maltillisesti
            // enemmän (LaattaPortit.NakyvaRinnakkain: 12 → 16); yhden portin tilassa ennallaan.
            int raja = Matkakirja.SaapumisKiire.NakyvaRaja(LaattaPortit.NakyvaRinnakkain(rinnakkain, Portteja), VerhoRinnakkain, verhot > 0, saapumistila);
            // LÖYDÖS 163b (Pelikoodarin löytö, Fablen päätös 26.9.): NÄKYVÄN RUUDUN POHJALAATAT AINA ENSIN. Ennen kiirejono
            // (huntu, kerma, Sentinel) sai raja + 4 paikkaa ennen näkyvää jonoa, ja maakuntanäkymässä hunnun pyynnöt
            // nälkiinnyttivät pohjan ja maaston (kohdemaa pergamenttina, naapurit ilman huntua piirtyivät). Nyt näkyvä jono
            // ensin, ja kiirejono saa enintään puolet paikoista, kun näkyvässä jonossa on odottajia (tyhjänä raja + 4 kuten ennen).
            while (kaynnissa - kohdeKaynnissa < raja && jono.TryDequeue(out var h))
            {
                if (h.Yrityksia == 0 && h.KuluS > PohjaOdotusRaja && kiireKaynnissa > 0) KirjaaNalka(h);
                StartCoroutine(Lataa(h));
            }
            int kiireRaja = jono.IsEmpty ? raja + 4 : Math.Max(2, raja / 2);
            while (kaynnissa - kohdeKaynnissa < raja + 4 && kiireKaynnissa < kiireRaja && kiireJono.TryDequeue(out var k))
            {
                if (k.Esi != null && k.Esi.Peruttu) { k.Valmis.TrySetResult((499, null)); continue; }
                // Verhon aikana kiirejonon esilatauksista vain verhon odottama (Verholle); kohdealueen Sentinel odottaa verhon
                // lähtöä kuten kohdealueen muutkin laatat (kohdeJono) ja palaa sitten kiirejonoon (VerhoKevennys).
                if (verhot > 0 && k.Esi != null && !k.Esi.Verholle) { k.Kiireesta = true; tauolla.Add(k); continue; }
                StartCoroutine(LataaKiire(k));
            }
            while (verhot == 0 && kohdeKaynnissa < KohdePaikat && kohdeJono.TryDequeue(out var c))
            {
                if (c.Esi != null && c.Esi.Peruttu) { c.Valmis.TrySetResult((499, null)); continue; }
                StartCoroutine(LataaKohde(c));
            }
            // Kohdemaan saapuminen (löydös 171): näkyvän kartan vapailla paikoilla ennen muuta esilatausta, kaksi paikkaa jää
            // näkyvälle kuten esilatausjonolla.
            while (kaynnissa - kohdeKaynnissa < raja - 2 && jono.IsEmpty && saapumisJono.TryDequeue(out var sa))
            {
                if (sa.Esi != null && sa.Esi.Peruttu) { sa.Valmis.TrySetResult((499, null)); continue; }
                if (!Matkakirja.SaapumisKiire.SaapumisPalvellaan(verhot > 0, sa.Esi != null && sa.Esi.Verholle)) { tauolla.Add(sa); continue; }
                StartCoroutine(LataaSaapuminen(sa));
            }
            while (kaynnissa - kohdeKaynnissa < raja - 2 && jono.IsEmpty && esiJono.TryDequeue(out var e))
            {
                if (e.Esi != null && e.Esi.Peruttu) { e.Valmis.TrySetResult((499, null)); continue; }
                // Verhon aikana vain verhon odottama esilataus (Esilataus.Verholle); muut odottavat verhon lähtöä. Saapumistilassa
                // samoin (löydös 171): aloitusnäytön ja muut esilataukset odottavat kohdemaan näkymää.
                if (!Matkakirja.SaapumisKiire.EsiPalvellaan(verhot > 0, saapumistila, e.Esi != null && e.Esi.Verholle)) { tauolla.Add(e); continue; }
                StartCoroutine(Lataa(e));
            }
            // Taustan esilataus (erä 2): perutut pois jonon alusta aina, uudet haut vasta kun kaikki muu on tyhjää ja rauhallista.
            while (taustaJono.TryPeek(out var pt) && pt.Esi != null && pt.Esi.Peruttu && taustaJono.TryDequeue(out pt))
                pt.Valmis.TrySetResult((499, null));
            while (verhot == 0 && !saapumistila && taustaKaynnissa < TaustaPaikat && kaynnissa - kohdeKaynnissa < raja - 2 && jono.IsEmpty
                   && kiireJono.IsEmpty && kiireKaynnissa == 0 && esiJono.IsEmpty && taustaJono.TryDequeue(out var b))
            {
                if (b.Esi != null && b.Esi.Peruttu) { b.Valmis.TrySetResult((499, null)); continue; }
                StartCoroutine(LataaTausta(b));
            }
            // Löydös 171: ei saapumistilassa — pohjan uudelleenlataus irrottaa pohjarasterin jokaisesta laatasta (vaalea kartta),
            // ja kohdemaassa ei ole huntua peittämässä sitä.
            if (!uusintaKesken && !varalla.IsEmpty && Time.unscaledTime >= seuraavaUusinta && !Kiireinen && !saapumistila)
            {
                seuraavaUusinta = Time.unscaledTime + 10f;
                StartCoroutine(UusiVaralaatat());
            }
        }

        IEnumerator UusiVaralaatat()
        {
            uusintaKesken = true;
            int onnistui = 0;
            foreach (var polku in new System.Collections.Generic.List<string>(varalla.Keys))
            {
                var h = new Haku { Polku = polku, Luokka = "pohja" };
                yield return Lataa(h);
                var (tila, data) = h.Valmis.Task.Result;
                if (tila != 200 || data == null) continue;
                try
                {
                    string f = Tiedosto(valimuisti, polku);
                    Directory.CreateDirectory(Path.GetDirectoryName(f));
                    File.WriteAllBytes(f, data);
                }
                catch (Exception) { continue; }
                varalla.TryRemove(polku, out _);
                onnistui++;
            }
            if (onnistui > 0)
            {
                var pohja = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pohja : null;
                if (pohja != null && pohja.enabled) { pohja.RemoveFromTileset(); pohja.AddToTileset(); }
                Debug.Log($"MATKAKIRJA laattapalvelin: {onnistui} varalaattaa korvattu oikealla, pohja ladattu uudelleen ({varalla.Count} jäljellä)");
            }
            uusintaKesken = false;
        }

        IEnumerator LataaKohde(Haku h)
        {
            kohdeKaynnissa++;
            try { yield return Lataa(h); }
            finally { kohdeKaynnissa--; }
        }

        /// <summary>Kohdemaan saapumisen haku (löydös 171: oma laskuri valmius-riveille; paikat ovat näkyvän kartan).</summary>
        IEnumerator LataaSaapuminen(Haku h)
        {
            saapumisKaynnissa++;
            try { yield return Lataa(h); }
            finally { saapumisKaynnissa--; }
        }

        /// <summary>Taustan esilatauksen haku (erä 2: oma laskuri, enintään <see cref="TaustaPaikat"/>).</summary>
        IEnumerator LataaTausta(Haku h)
        {
            taustaKaynnissa++;
            try { yield return Lataa(h); }
            finally { taustaKaynnissa--; }
        }

        /// <summary>Kiirejonon haku (163b: oma laskuri, jotta kiire ei vie näkyvän jonon paikkoja).</summary>
        IEnumerator LataaKiire(Haku h)
        {
            kiireKaynnissa++;
            try { yield return Lataa(h); }
            finally { kiireKaynnissa--; }
        }

        int kiireKaynnissa;
        /// <summary>Vartija 163b: näkyvän kartan laatta odotti jonossa yli tämän (s), kun kiirejonon hakuja oli käynnissä.</summary>
        public const double PohjaOdotusRaja = 2.0;
        /// <summary>Vartija 163b: kiirejonon takia yli 2 s odottaneet näkyvän kartan laatat.</summary>
        public static int PohjaNalka { get; private set; }

        void KirjaaNalka(Haku h)
        {
            PohjaNalka++;
            if (PohjaNalka <= 20 || PohjaNalka % 100 == 0)
                Debug.Log($"MATKAKIRJA VARTIJA 163b: pohjalaatta odotti {h.KuluS:0.0} s kiirejonon takia ({h.Luokka} {h.Polku}; " +
                          $"kiire käynnissä {kiireKaynnissa}, jonossa {kiireJono.Count}) #{PohjaNalka}");
        }

        IEnumerator Lataa(Haku h)
        {
            kaynnissa++;
            int tila = 502;
            byte[] data = null;
            // Tilapäinen virhe (aikakatkaisu, verkko, 5xx) yritetään uudelleen: Cesium ei itse yritä. Tavallinen haku:
            // kolme yritystä (0,6 s ja 2,4 s välein). Pidossa oleva Cesiumin maastolaatta (löydös 119): yksi yritys
            // per vuoro, ja uusi vuoro porrastetun viiveen jälkeen jonon kautta (Uusi), jottei odotus varaa verkkopaikkaa.
            bool pito = MaastoUusinta && h.Pyydetty != null;
            int kerralla = pito ? 1 : 3;
            for (int yritys = 0; yritys < kerralla; yritys++)
            {
                if (yritys > 0) yield return new WaitForSecondsRealtime(0.6f * yritys * yritys);
                using var r = UnityWebRequest.Get(Ampari + h.Polku);
                r.timeout = 15;
                float hakuAlku = Time.realtimeSinceStartup;
                yield return r.SendWebRequest();
                VerkkoOdotus.Haku("laatta", (Time.realtimeSinceStartup - hakuAlku) * 1000.0, (long)r.downloadedBytes, r.url);
                h.Yrityksia++;
                if (r.result == UnityWebRequest.Result.Success) { tila = 200; data = r.downloadHandler.data; break; }
                // Katkennut siirto antaa responseCode 200 ilman dataa: 502 eikä tyhjä 200 (Reikakorjaus.Koodi).
                tila = Reikakorjaus.Koodi(r.result == UnityWebRequest.Result.ProtocolError, r.responseCode);
                if (h.Maasto) Interlocked.Increment(ref MaastoYritysVirheita);
                bool uusittava = Reikakorjaus.Uusittava(tila);
                if (!pito) KirjaaVirhe(h.Luokka, h.Polku, tila, h.Yrityksia, h.Alku, uusittava && yritys + 1 < kerralla ? "uusinta" : "loppu");
                if (!uusittava) break;
            }
            kaynnissa--;
            if (pito && tila != 200 && Reikakorjaus.Uusittava(tila))
            {
                bool pyydetty = Pyytaa(h);
                bool offline = Application.internetReachability == NetworkReachability.NotReachable;
                if (Reikakorjaus.Pidetaanko(pyydetty, offline, h.KuluS))
                {
                    double viive = Reikakorjaus.UusintaViive(h.Yrityksia);
                    KirjaaVirhe(h.Luokka, h.Polku, tila, h.Yrityksia, h.Alku,
                        "pito " + viive.ToString("0.#", System.Globalization.CultureInfo.InvariantCulture) + " s");
                    if (!h.Pidossa) { h.Pidossa = true; MaastoPidossa++; }
                    StartCoroutine(Uusi(h, (float)viive));
                    yield break;
                }
                // Cesium sulki yhteyden (vastausta ei lueta) tai laite on ollut ilman verkkoa yli rajan (virhe kuten ennen).
                if (!pyydetty) tila = 499;
                else KirjaaVirhe(h.Luokka, h.Polku, tila, h.Yrityksia, h.Alku, "luovutus offline");
            }
            else if (pito && tila != 200) KirjaaVirhe(h.Luokka, h.Polku, tila, h.Yrityksia, h.Alku, "loppu");
            Valmis(h, tila, data);
        }

        /// <summary>
        /// Pidossa olevan maastolaatan uusi vuoro viiveen jälkeen (löydös 119): takaisin näkyvän kartan jonoon, jos Cesium
        /// yhä odottaa ja uusinta on päällä; muuten valmis (499 = Cesium sulki yhteyden, 502 = uusinta kytketty pois).
        /// </summary>
        IEnumerator Uusi(Haku h, float viive)
        {
            yield return new WaitForSecondsRealtime(viive);
            bool pyydetty = Pyytaa(h);
            if (!pyydetty || !MaastoUusinta) { Valmis(h, pyydetty ? 502 : 499, null); yield break; }
            jono.Enqueue(h);
        }

        void Valmis(Haku h, int tila, byte[] data)
        {
            if (h.Pidossa) { h.Pidossa = false; MaastoPidossa--; }
            h.Valmis.TrySetResult((tila, data));
        }

        static bool Pyytaa(Haku h)
        {
            try { return h.Pyydetty == null || h.Pyydetty(); }
            catch (Exception) { return false; }
        }

        /// <summary>
        /// Tallentaa yhden ämpärin polun offline-kansioon (Alueet). Palauttaa tavut tai -1.
        /// Käytetään korutiinina pääsäikeessä.
        /// </summary>
        static bool OnMaastoTiedosto(string polku)
        {
            int q = polku.IndexOf('?');
            return (q < 0 ? polku : polku.Substring(0, q)).EndsWith(".terrain", StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>Gzip (offline-maasto levylle); jo pakattu (1F 8B) sellaisenaan.</summary>
        public static byte[] Pakkaa(byte[] data)
        {
            if (data == null || (data.Length > 1 && data[0] == 0x1F && data[1] == 0x8B)) return data;
            using var m = new MemoryStream();
            using (var g = new System.IO.Compression.GZipStream(m, System.IO.Compression.CompressionLevel.Fastest, true)) g.Write(data, 0, data.Length);
            return m.ToArray();
        }

        /// <summary>Gzip-tiedoston purku (offline-maasto); muut sellaisenaan.</summary>
        public static byte[] Pura(byte[] data)
        {
            if (data == null || data.Length < 2 || data[0] != 0x1F || data[1] != 0x8B) return data;
            try
            {
                using var s = new System.IO.Compression.GZipStream(new MemoryStream(data), System.IO.Compression.CompressionMode.Decompress);
                using var m = new MemoryStream();
                s.CopyTo(m);
                return m.ToArray();
            }
            catch (Exception) { return data; }
        }

        public static IEnumerator LataaOffline(string polku, Action<long> valmis, string lahde = null)
        {
            string f = Tiedosto(OfflineKansio, polku);
            if (File.Exists(f)) { valmis(new FileInfo(f).Length); yield break; }
            // Buildin paketissa: offline-kansioon ei tarvitse kopiota (paketti on aina mukana).
            if (Paketti != null && Paketti.Onko(Laattapaketti.Avain(polku))) { valmis(0); yield break; }
            string v = Tiedosto(ValimuistiKansio, polku);
            // Pienennetty lähde (mediaKuvat.pieni): ei kopioida välimuistin isoa alkuperäistä (maan media ≤ 100 Mt).
            if (lahde == null && File.Exists(v))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(f));
                if (OnMaastoTiedosto(polku)) File.WriteAllBytes(f, Pakkaa(File.ReadAllBytes(v)));
                else File.Copy(v, f, true);
                valmis(new FileInfo(f).Length);
                yield break;
            }
            using var r = UnityWebRequest.Get(Ampari + (lahde ?? polku));
            r.timeout = 30;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { valmis(r.responseCode == 404 ? 0 : -1); yield break; }
            Directory.CreateDirectory(Path.GetDirectoryName(f));
            // Maasto gzipattuna levylle (Fablen C 27.9.): iOS purkaa Content-Encoding: gzip -siirron, joten pakataan uudelleen
            // (~3× pienempi); luku purkaa (Pura). Muut tiedostot sellaisenaan.
            var tavut = OnMaastoTiedosto(polku) ? Pakkaa(r.downloadHandler.data) : r.downloadHandler.data;
            File.WriteAllBytes(f, tavut);
            valmis(tavut.Length);
        }
    }
}
