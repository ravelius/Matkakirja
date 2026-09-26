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
    /// iOS: Info.plistiin NSAllowsLocalNetworking (Rakennus.PaikallinenVerkkoPlist).
    /// </summary>
    [DefaultExecutionOrder(-1000)]
    public class Laattapalvelin : MonoBehaviour
    {
        public const string Ampari = "https://media.matkakirja.app/";
        public static Laattapalvelin Instanssi { get; private set; }
        /// <summary>Paikallinen juuri, esim. http://127.0.0.1:52100/r/ (null ennen käynnistystä).</summary>
        public static string Juuri { get; private set; }

        public static string OfflineKansio => Path.Combine(Application.persistentDataPath, "offline");
        public static string ValimuistiKansio => Path.Combine(Application.temporaryCachePath, "laatat");

        [Tooltip("Rinnakkaiset verkkohaut (UnityWebRequest).")]
        public int rinnakkain = 12;
        [Tooltip("Välimuistin yläraja megatavuina; käynnistyksessä karsitaan vanhimmat 75 %:iin (offline-kansio ei kuulu tähän).")]
        public int valimuistiMt = 600;

        TcpListener kuuntelija;
        CancellationTokenSource lopetus;
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
            var p = Instanssi;
            if (verhot > 0 || p == null || p.tauolla.Count == 0) return;
            // Kohdealueen (Etusija) tauolla olleet tulivat kiirejonosta (Sentinel, Update); muut esilatausjonosta.
            foreach (var h in p.tauolla) (h.Esi != null && h.Esi.Etusija ? p.kiireJono : p.esiJono).Enqueue(h);
            p.tauolla.Clear();
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
            MaastoPyyntoja = MaastoVerkosta = MaastoYritysVirheita = MaastoPelastettu = MaastoCesiumVirheita = 0;
            Maasto404 = MaastoPeruttu = MaastoPidossa = 0;
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
        public static bool Kiireinen => Instanssi != null && (Instanssi.kaynnissa > 0 || !Instanssi.jono.IsEmpty || !Instanssi.kiireJono.IsEmpty);

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
            public double KuluS => (System.Diagnostics.Stopwatch.GetTimestamp() - Alku) / (double)System.Diagnostics.Stopwatch.Frequency;
        }

        /// <summary>Muuntaa ämpärin osoitteen paikalliseksi (muut osoitteet sellaisenaan).</summary>
        public static string Paikallinen(string url) =>
            Juuri != null && url != null && url.StartsWith(Ampari) ? Juuri + url.Substring(Ampari.Length) : url;

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
            offline = OfflineKansio;
            valimuisti = ValimuistiKansio;
            Directory.CreateDirectory(offline);
            Directory.CreateDirectory(valimuisti);
#if UNITY_IOS && !UNITY_EDITOR
            UnityEngine.iOS.Device.SetNoBackupFlag(offline);
#endif
            try
            {
                kuuntelija = new TcpListener(IPAddress.Loopback, 0);
                kuuntelija.Start(64);
                int portti = ((IPEndPoint)kuuntelija.LocalEndpoint).Port;
                Juuri = $"http://127.0.0.1:{portti}/r/";
                lopetus = new CancellationTokenSource();
                _ = Task.Run(() => Kuuntele(lopetus.Token));
                Debug.Log("MATKAKIRJA laattapalvelin: " + Juuri);
                OhjaaCesium();
                AvaaPaketti();
                long raja = (long)valimuistiMt * 1048576;
                _ = Task.Run(() => Karsi(valimuisti, raja));
            }
            catch (Exception e)
            {
                Juuri = null;
                Debug.LogWarning("MATKAKIRJA laattapalvelin ei käynnistynyt, Cesium hakee suoraan: " + e.Message);
            }
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
                    PohjaPolku = u.Substring(Ampari.Length, z - Ampari.Length);
                o.templateUrl = Paikallinen(u);
            }
        }

        void OnDestroy()
        {
            if (Instanssi != this) return;
            lopetus?.Cancel();
            try { kuuntelija?.Stop(); } catch { }
            Instanssi = null;
            Juuri = null;
        }

        async Task Kuuntele(CancellationToken peru)
        {
            while (!peru.IsCancellationRequested)
            {
                TcpClient asiakas;
                try { asiakas = await kuuntelija.AcceptTcpClientAsync(); }
                catch { if (peru.IsCancellationRequested) return; continue; }
                _ = Task.Run(() => Palvele(asiakas));
            }
        }

        async Task Palvele(TcpClient asiakas)
        {
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
                        // Löydös 119: pidossa oleva maastolaatta tarkistaa ennen uusintaa, odottaako Cesium yhä.
                        if (kohde.StartsWith("/r/")) vastaus = await Hae(kohde.Substring(3), null, () => AsiakasAuki(asiakas));
                        await Vastaa(virta, vastaus.tila, vastaus.data, kohde, metodi == "HEAD");
                        if (sulje) return;
                    }
                }
                catch (Exception) { /* asiakas sulki */ }
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
            // Valmiusdiagnostiikka: HTTP-pyynnöt (Cesium ja omat haut, ei esilatausta) luokittain kesken / valmiit / verkosta.
            var luokka = esilataus == null ? Luokat.GetOrAdd(Luokka(polku), _ => new int[4]) : null;
            if (luokka != null) Interlocked.Increment(ref luokka[0]);
            try
            {
                var tulos = await HaeSisalto(polku, esilataus, lahde, pyydetty);
                if (esilataus == null && polku.IndexOf("/satelliitti/", StringComparison.Ordinal) >= 0)
                    SatelliittiLoki.Kirjaa(polku, tulos.Item1, tulos.Item2, lahde.Nimi);
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
            return $"käynnissä {p.kaynnissa} (kohde {p.kohdeKaynnissa}) jono {p.jono.Count} kiire {p.kiireJono.Count} " +
                   $"esi {p.esiJono.Count} kohdejono {p.kohdeJono.Count} tauolla {p.tauolla.Count}";
        }

        sealed class Lahde { public string Nimi = "?"; }

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
                var sisalto = File.ReadAllBytes(f);
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
            (!esi ? (varitasoa ? kiireJono : jono)
                : varitasoa && (esilataus.Verholle || esilataus.Etusija) ? kiireJono
                : esilataus.Etusija ? kohdeJono : esiJono).Enqueue(h);
            var (tila, data) = await h.Valmis.Task;
            lahde.Nimi = "verkko";
            if (tila == 200 && !KuvaEhja(polku, data))
            {
                // Katkennut lataus: ei välimuistiin, ja Cesium saa virheen (esivanhemman rasteri / varakartta) harmaan sijaan.
                Debug.LogWarning($"MATKAKIRJA laattapalvelin: verkon laatta rikki ({data?.Length ?? 0} t): {polku}");
                tila = 502;
                data = null;
            }
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
            // Huntulaatoille neljä lisäpaikkaa, jotta ne eivät jää suurten pohja- ja maastolaattojen taakse.
            // Kohdealueen paikat eivät vie näkyvän kartan paikkoja (muut rajat ilman niitä).
            // Verhon kevennys (BUILD 16): näkyvän kartan jonolle enemmän paikkoja, tausta tauolla.
            int raja = verhot > 0 ? Math.Max(rinnakkain, VerhoRinnakkain) : rinnakkain;
            while (kaynnissa - kohdeKaynnissa < raja + 4 && kiireJono.TryDequeue(out var k))
            {
                if (k.Esi != null && k.Esi.Peruttu) { k.Valmis.TrySetResult((499, null)); continue; }
                // Verhon aikana kiirejonon esilatauksista vain verhon odottama (Verholle); kohdealueen Sentinel odottaa verhon
                // lähtöä kuten kohdealueen muutkin laatat (kohdeJono) ja palaa sitten kiirejonoon (VerhoKevennys).
                if (verhot > 0 && k.Esi != null && !k.Esi.Verholle) { tauolla.Add(k); continue; }
                StartCoroutine(Lataa(k));
            }
            while (kaynnissa - kohdeKaynnissa < raja && jono.TryDequeue(out var h)) StartCoroutine(Lataa(h));
            while (verhot == 0 && kohdeKaynnissa < KohdePaikat && kohdeJono.TryDequeue(out var c))
            {
                if (c.Esi != null && c.Esi.Peruttu) { c.Valmis.TrySetResult((499, null)); continue; }
                StartCoroutine(LataaKohde(c));
            }
            while (kaynnissa - kohdeKaynnissa < raja - 2 && jono.IsEmpty && esiJono.TryDequeue(out var e))
            {
                if (e.Esi != null && e.Esi.Peruttu) { e.Valmis.TrySetResult((499, null)); continue; }
                // Verhon aikana vain verhon odottama esilataus (Esilataus.Verholle); muut odottavat verhon lähtöä.
                if (verhot > 0 && (e.Esi == null || !e.Esi.Verholle)) { tauolla.Add(e); continue; }
                StartCoroutine(Lataa(e));
            }
            if (!uusintaKesken && !varalla.IsEmpty && Time.unscaledTime >= seuraavaUusinta && !Kiireinen)
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
        public static IEnumerator LataaOffline(string polku, Action<long> valmis)
        {
            string f = Tiedosto(OfflineKansio, polku);
            if (File.Exists(f)) { valmis(new FileInfo(f).Length); yield break; }
            // Buildin paketissa: offline-kansioon ei tarvitse kopiota (paketti on aina mukana).
            if (Paketti != null && Paketti.Onko(Laattapaketti.Avain(polku))) { valmis(0); yield break; }
            string v = Tiedosto(ValimuistiKansio, polku);
            if (File.Exists(v))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(f));
                File.Copy(v, f, true);
                valmis(new FileInfo(f).Length);
                yield break;
            }
            using var r = UnityWebRequest.Get(Ampari + polku);
            r.timeout = 30;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { valmis(r.responseCode == 404 ? 0 : -1); yield break; }
            Directory.CreateDirectory(Path.GetDirectoryName(f));
            File.WriteAllBytes(f, r.downloadHandler.data);
            valmis(r.downloadHandler.data.Length);
        }
    }
}
