using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// PELAAJAN MAAN ÄÄRIVIIVA (omistajan build 5 -löydös 2, osa 3; web on oletus): webin pallon
    /// korostuskehä (js/pallovektorit.js korostaMaa, kutsujana js/maanaariviivat.js). Muiden maiden
    /// rajat piirtää Rajat-kerros (vektorina), joten tässä piirretään vain nykyinen maa.
    ///
    /// Webin säännöt: muste RAJA_MUSTE #6b5539 täytenä (KOROSTUS_PEITTO 1), yhtenäinen viiva,
    /// leveys VEKTORIT_KOROSTUS_LEVEYS_CSS [1,6; 3] css-px liukuen ruudun tiheyden mukaan
    /// (VEKTORIT_LEVEYS_TIHEYS 25–250 laitepikseliä leveysastetta kohti ruudun keskellä, mitattuna
    /// 40 css-px:n matkalta alaspäin), renkaat, joiden laatikon lävistäjä ruudulla jää alle
    /// KOROSTUKSEN_PIENIN_RENGAS_PX 10 laitepikselin, pois. Uusi kehä häivytetään sisään
    /// VEKTORIT_HAIVE_MS 260 ms (ease-out, 1 − (1 − t)³); vanha poistuu heti (vapautaKorostus).
    /// Kehä pois linssin ajaksi samalla portilla kuin kaupunkipisteet (lauta.js linssiPaalla).
    ///
    /// LÖYDÖS 127 (omistaja 25.9.2026 klo 22.3x, build 16 → 17, sitova): "Maanraja vain kahden maan välillä, ei niiltä
    /// osin, joissa maa loppuu mereen; raja joka tapauksessa kevyempi." Kaksi muutosta webin korostukseen:
    ///  1. VAIN MAA–MAA-RAJAT: kehä piirretään Karttasepän maa–maa-rajoista (<see cref="MaamaaPolku"/>, PR #3248:
    ///     samat kärjet kuin maapolygonit.geojsonissa, rannikko-osuudet pois; saarimaat tyhjiä, sisämaa kuten CHE koko
    ///     renkaana) AVOIMINA viivoina (Kehaviivat: ei sulkevaa janaa). Jos tiedosto ei lataudu, varana vanha polku:
    ///     koko rengas maapolygonit.geojsonista (<see cref="GeojsonPolku"/>) ja sen puuttuessa sisältöpaketin
    ///     maarajat.json. Komento "maaraja rengas paalle" näyttää vanhan koko renkaan vertailuun.
    ///  2. KEVYEMPI: leveys ja peitto painosta <see cref="Paino"/> (Viivaleveys.KehanPaino; oletus Kevyt, webin korostus
    ///     komennolla "maaraja paino web"). Webissä ei ole kevyempää vastinetta (ks. Viivaleveys).
    ///
    /// Maa: sama kuin väritasolla (<see cref="Varitaso.Kohde"/>), koska webissä korostusIso ohjaa
    /// molempia. Kohde eikä Varitaso.Maa: maa ilman värisarjaa (RUS, ISL …) saa silti kehän,
    /// kuten webissä, jossa kehä tulee maapolygoneista eikä värilaatoista. Ilman väritasoa sama
    /// sääntö suoraan NostoKerrokselta (matkalla edellinen maa säilyy).
    ///
    /// Aineisto (omistajan build 7 -löydös 22 kohta 2: kehän oltava yhtä tarkka kuin webissä): sama
    /// lähde kuin webin kehällä, assets/data/maapolygonit.json (Natural Earth 10m admin-0, DP 0,2
    /// lautayksikköä, rannikko GSHHG full), jonka Karttaseppä muunsi lon/lat-GeoJSONiksi ämpäriin
    /// (<see cref="GeojsonPolku"/>, 135 maata, ~497 000 pistettä, ominaisuus "iso" = ISO3), ja siitä jaettu
    /// maamaa.geojson (MultiLineString). Haetaan laattapalvelimen kautta (offline-kansio → välimuisti → verkko) ja
    /// jäsennetään kerran taustasäikeessä omalla kevyellä lukijalla (<see cref="Geojson"/>) maittain tauluksi.
    /// Nauha piirretään Rajaviiva-varjostimella omalla materiaalikopiolla.
    ///
    /// LÖYDÖS 46 JATKO (omistajan kuva Kreikasta, build 11: "paksu tumma kehä rantojen ympärillä"): leveys on jo webin
    /// arvo (Viivaleveys: 1,6–3 pt × Pistekerroin = webin css × dpr, peitto 1, #6b5539), mutta kuvassa kehä oli noin
    /// 8,6 laitepikseliä 6:n sijaan. Syy: janojen neliöjatke porrasmaisilla rannoilla täytti kulmat; web piirtää
    /// korostuksen päätypyörylöillä. Rajaviiva-varjostin tekee nyt pyöreät päät (myös avoimen viivan päihin).
    /// </summary>
    public class Maaraja : MonoBehaviour
    {
        /// <summary>Webin RAJA_MUSTE (paletin --raja-muste), sRGB.</summary>
        public static readonly Color Muste = new Color32(0x6b, 0x55, 0x39, 0xff);
        /// <summary>
        /// Webin leveys css-pikseleinä [kaukana, lähellä] (web VEKTORIT_KOROSTUS_LEVEYS_CSS; paino Web). Löydös 127:n jälkeen
        /// käytössä oleva leveys tulee painosta (Viivaleveys.KehaPt).
        /// </summary>
        public static readonly Vector2 LeveysCss = new Vector2((float)Viivaleveys.KorostusKaukana, (float)Viivaleveys.KorostusLahella);
        /// <summary>Tiheyden liukuma laitepikseleinä astetta kohti (web VEKTORIT_LEVEYS_TIHEYS).</summary>
        public static readonly Vector2 LeveysTiheys = new Vector2((float)Viivaleveys.TiheysKaukana, (float)Viivaleveys.TiheysLahella);
        /// <summary>Häive sisään sekunteina (web VEKTORIT_HAIVE_MS).</summary>
        public const float HaiveSek = 0.26f;
        /// <summary>Pienin piirrettävä rengas laitepikseleinä (web KOROSTUKSEN_PIENIN_RENGAS_PX).</summary>
        public const float PieninRengasPx = 10f;
        /// <summary>Tiheyden mittamatka css-pikseleinä (web LEPOKERROS_MITTAMATKA_PX).</summary>
        public const float MittamatkaCss = 40f;
        /// <summary>
        /// Piirtojärjestys: Cesium-laattojen ja väritason (läpinäkymättömät) sekä maatäyttöjen
        /// (Transparent−10/−9) ja aluerajojen (−8/−7) päällä, reittien ja karttavalojen (Transparent),
        /// kaupunkipisteiden (+1), nimiöiden (3005) ja nappulan (+20) alla.
        /// </summary>
        public const int Jono = 2995;
        /// <summary>
        /// Kehän koko renkaat ämpärissä (Karttasepän maapolygonit.geojson, content-encoding gzip): löydös 127:n jälkeen
        /// VARA, jos <see cref="MaamaaPolku"/> ei lataudu, ja komento "maaraja rengas paalle". Myös offline-latauksen
        /// "maailma"-alueessa (Alueet.Polut).
        /// </summary>
        public const string GeojsonPolku = "julisteet/pallo/vektorit/maapolygonit-2026-09-24/maapolygonit.geojson";
        /// <summary>
        /// Maa–maa-rajat (löydös 127, Karttaseppä 25.9.2026, PR #3248; tools/maarajat-maamaa.mjs): FeatureCollection,
        /// properties.iso = ISO3, MultiLineString lon/lat, samat kärjet kuin <see cref="GeojsonPolku"/>issa mutta vain
        /// osuudet, joiden toisella puolella on toinen maa (myös pelin ulkopuoliset naapurit). Gzip, 307 kt. Myös
        /// offline-latauksen "maailma"-alueessa.
        /// </summary>
        public const string MaamaaPolku = "julisteet/pallo/vektorit/maarajat-2026-09-25/maamaa.geojson";

        /// <summary>Kehä sallittu (komento "maaraja pois" = false; oletus true).</summary>
        public static bool Sallittu = true;
        /// <summary>
        /// Kehä myös vektorirannan kanssa. Oletus true: KOTIMAAN KOROSTUS (omistajan build 13 -lista 25.9.2026 ja
        /// Linssisepän kierros 3 rivi 39, web lauta.js paivitaPallonMaakorostus): kotimaa kehällä kuten webissä. Kehä
        /// piirtyy rannan alle (Jono 2995 &lt; Rannikko.RantaJono 2997). Löydösten 126–127 jälkeen rantaviiva on oletuksena
        /// pois ja kehä kulkee vain maiden välillä, joten rannikolla ei ole kumpaakaan.
        /// Korvaa 25.9. klo 00.0x:n päätöksen (kehä pois, kun Rannikko piirtyy). Komento "maaraja pois" vertailuun.
        /// </summary>
        public static bool Pakota = true;
        /// <summary>Kiinteä leveys pisteinä (komento "maaraja paksuus &lt;pt&gt;"); NaN tai ≤ 0 = painon laki (<see cref="Paino"/>).</summary>
        public static float PaksuusPt = float.NaN;
        /// <summary>
        /// Löydös 127: kehän paino. Oletus Kevyt ([1,0; 1,8] pt, peitto 0,8); omistaja valitsee kuvaparista
        /// (lokit/rajat-126-128), ja valinta vaihdetaan tähän. Komento "maaraja paino web|kevyt|kevein|oletus".
        /// </summary>
        public const Viivaleveys.KehanPaino OletusPaino = Viivaleveys.KehanPaino.Kevyt;
        public static Viivaleveys.KehanPaino Paino = OletusPaino;
        /// <summary>
        /// Koko rengas rannikkoineen kuten build 16:ssa (komento "maaraja rengas paalle|pois", vertailuun); oletus false =
        /// vain maa–maa-rajat (löydös 127).
        /// </summary>
        public static bool KokoRengas;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut() { Sallittu = true; Pakota = true; PaksuusPt = float.NaN; Paino = OletusPaino; KokoRengas = false; }

        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Varitaso varitaso;
        /// <summary>Rajaviiva-materiaali (sama kuin maakuntien rajoilla); tästä tehdään oma kopio.</summary>
        public Material materiaali;
        [Tooltip("Viivan korkeus ellipsoidin yläpuolella, metreinä (web VEKTORIT_KORKEUS 0).")]
        public double korkeus = 0.0;

        /// <summary>Maa (ISO3), jonka ääriviiva on nyt piirretty, tai null.</summary>
        public string Maa { get; private set; }

        /// <summary>Koko renkaat (maapolygonit.geojson tai varana maarajat.json) maittain; ladataan vain tarvittaessa.</summary>
        Dictionary<string, List<(double Lon, double Lat)[]>> renkaat;
        /// <summary>Maa–maa-rajat avoimina viivoina (maamaa.geojson) maittain.</summary>
        Dictionary<string, List<(double Lon, double Lat)[]>> maamaa;
        bool renkaatHaussa, maamaaHaussa;
        /// <summary>maamaa.geojson ei latautunut (tai oli tyhjä): varana koko rengas, vanha polku.</summary>
        bool maamaaPuuttuu;
        string haluttu;
        /// <summary>Viimeksi aloitettu rakennus: maa ja lähde (true = koko rengas).</summary>
        string kohdeMaa;
        bool kohdeKoko, kohdeAsetettu;
        Coroutine rakennus;
        MeshRenderer piirto;
        MeshFilter suodatin;
        Material oma;
        bool linssit, piilossa, nakyiEdella;
        /// <summary>Painon peitto lineaarisena (lasketaan, kun paino vaihtuu).</summary>
        Viivaleveys.KehanPaino peitonPaino = (Viivaleveys.KehanPaino)(-1);
        float peittoNatiivi = 1f;
        float haiveAlku = -1f;

        // LÄMPÖERÄ (PallonLepo): uuden kehän häive 260 ms; kehän katoaminen on yksittäinen muutos (LateUpdate).
        void OnEnable() => PallonLepo.Animoi(Haivyttaa, "maaraja");
        void OnDisable() => PallonLepo.Poista(Haivyttaa);
        bool Haivyttaa() => piirto != null && piirto.enabled && haiveAlku >= 0f && Time.unscaledTime - haiveAlku < HaiveSek;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (varitaso == null) varitaso = GetComponent<Varitaso>();
        }

        void OnDestroy()
        {
            Vapauta();
            if (oma != null) Destroy(oma);
        }

        // ---- Näkyvyys (KarttaKerrokset.Nakyvyys) ----

        /// <summary>Oma kytkin: "aariviiva".</summary>
        public void Nakyvat(bool nakyy) => piilossa = !nakyy;

        /// <summary>Linssin portti (web: kehä pois linssin ajaksi, samalla portilla kuin kaupunkipisteet).</summary>
        public void Linssit(bool paalla) => linssit = paalla;

        /// <summary>
        /// Kotimaan korostus (Linssisepän kierros 3 rivi 39): vertailu- ja maatietolinssissä kehä näkyy kuten webissä
        /// (vain aikajana piilottaa sen, lauta.js:5089). Oma lippu, koska "kaupungit"-portti (Linssit) asettuu
        /// linssin aikana uudelleen muualta. LinssiOhjain.Pelikerrokset asettaa ja purkaa.
        /// </summary>
        public void SallittuLinssissa(bool sallittu) => linssissaSallittu = sallittu;
        bool linssissaSallittu;

        // ---- Maa ----

        string PelaajanMaa()
        {
            if (varitaso != null) return varitaso.Kohde;
            var nk = NostoKerros.Instanssi;
            string nyt = nk != null ? nk.NykyinenMaa : null;
            // Matkalla (ei lähintä kaupunkia) edellinen maa säilyy kuten väritasolla.
            return !string.IsNullOrEmpty(nyt) ? nyt : haluttu;
        }

        void Update()
        {
            if (materiaali == null) return;
            string maa = PelaajanMaa();
            haluttu = maa;
            // Löydös 127: maa–maa-rajat (maamaa.geojson); varana ja komennolla koko rengas (vanha polku).
            bool koko = KokoRengas || maamaaPuuttuu;
            var lahde = koko ? renkaat : maamaa;
            if (lahde == null)
            {
                if (koko) { if (!renkaatHaussa) StartCoroutine(LataaRenkaat()); }
                else if (!maamaaHaussa) StartCoroutine(LataaMaamaa());
                return;
            }
            if (kohdeAsetettu && maa == kohdeMaa && koko == kohdeKoko) return;
            kohdeAsetettu = true;
            kohdeMaa = maa;
            kohdeKoko = koko;
            if (rakennus != null) StopCoroutine(rakennus);
            rakennus = StartCoroutine(Rakenna(maa, lahde, koko));
        }

        /// <summary>
        /// Lataa GeoJSONin laattapalvelimen kautta ja jäsentää sen taustasäikeessä (null, jos ei tullut tai oli tyhjä).
        /// Palvelin tallentaa ja palauttaa raakatavut ilman Content-Encoding-otsaketta: jos ämpäri antoi gzipin eikä
        /// UnityWebRequest purkanut sitä, tavut alkavat 0x1f 0x8b ja ne puretaan tässä.
        /// </summary>
        static IEnumerator LataaGeojson(string polku, string nimi, string vara,
            System.Action<Dictionary<string, List<(double Lon, double Lat)[]>>> valmis)
        {
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            byte[] tavut = null;
            using (var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + polku)))
            {
                pyynto.timeout = 45;
                yield return pyynto.SendWebRequest();
                if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                else Debug.LogWarning($"MATKAKIRJA ääriviiva: {nimi} ei latautunut ({pyynto.responseCode} {pyynto.error}), varana {vara}");
            }
            if (tavut != null && tavut.Length > 0)
            {
                long kesto = 0;
                var tehtava = Task.Run(() =>
                {
                    var kello = System.Diagnostics.Stopwatch.StartNew();
                    tulos = Geojson.Lue(Geojson.Pura(tavut));
                    kesto = kello.ElapsedMilliseconds;
                });
                while (!tehtava.IsCompleted) yield return null;
                tavut = null;
                if (tehtava.IsFaulted)
                {
                    Debug.LogError($"MATKAKIRJA ääriviiva: {nimi} jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                    tulos = null;
                }
                else if (tulos.Count == 0)
                {
                    Debug.LogWarning($"MATKAKIRJA ääriviiva: {nimi} tyhjä, varana {vara}");
                    tulos = null;
                }
                else
                {
                    int viivat = 0, pisteet = 0;
                    foreach (var m in tulos.Values) foreach (var r in m) { viivat++; pisteet += r.Length; }
                    Debug.Log($"MATKAKIRJA ääriviiva: {nimi}, {tulos.Count} maata, {viivat} viivaa, {pisteet} pistettä, jäsennys {kesto} ms");
                }
            }
            valmis(tulos);
        }

        /// <summary>Löydös 127: Karttasepän maa–maa-rajat. Epäonnistuessa Update siirtyy vanhaan polkuun (koko rengas).</summary>
        IEnumerator LataaMaamaa()
        {
            maamaaHaussa = true;
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            yield return LataaGeojson(MaamaaPolku, "maamaa.geojson", "koko rengas (maapolygonit.geojson)", t => tulos = t);
            maamaaHaussa = false;
            if (tulos != null) maamaa = tulos;
            else maamaaPuuttuu = true;
        }

        /// <summary>Vanha polku: koko renkaat maapolygonit.geojsonista, varana sisältöpaketin karkea maarajat.json.</summary>
        IEnumerator LataaRenkaat()
        {
            renkaatHaussa = true;
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            // 1. Webin tarkka aineisto.
            yield return LataaGeojson(GeojsonPolku, "maapolygonit.geojson", "maarajat.json", t => tulos = t);

            // 2. Vara: sisältöpaketin karkea maarajat.json (kuten MaaKartta).
            if (tulos == null)
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
                if (teksti == null) { Debug.LogWarning("MATKAKIRJA ääriviiva: maarajat.json puuttuu tästä paketista"); renkaatHaussa = false; yield break; }
                var tehtava = Task.Run(() =>
                {
                    var aineisto = MaatAineisto.LueRajat(Peli.MiniJson.Jasenna(teksti));
                    tulos = new Dictionary<string, List<(double Lon, double Lat)[]>>(System.StringComparer.Ordinal);
                    foreach (var p in aineisto.Maat) tulos[p.Key] = p.Value.Renkaat;
                });
                while (!tehtava.IsCompleted) yield return null;
                if (tehtava.IsFaulted)
                {
                    Debug.LogError("MATKAKIRJA ääriviiva: maarajojen luku kaatui: " + tehtava.Exception?.GetBaseException());
                    renkaatHaussa = false;
                    yield break;
                }
            }
            renkaat = tulos;
            renkaatHaussa = false;
        }

        /// <summary>
        /// Kehä maalle: koko = renkaat (suljetaan), muuten maa–maa-rajojen avoimet viivat. Maa ilman viivoja (saarimaa
        /// maamaa.geojsonissa, tai maa aineiston ulkopuolella) jää ilman kehää.
        /// </summary>
        IEnumerator Rakenna(string maa, Dictionary<string, List<(double Lon, double Lat)[]>> lahde, bool koko)
        {
            // Vanha kehä pois heti (web vapautaKorostus), uusi häivytetään sisään.
            Vapauta();
            Maa = null;
            if (string.IsNullOrEmpty(maa) || !lahde.TryGetValue(maa, out var viivat) || viivat.Count == 0)
            {
                if (!string.IsNullOrEmpty(maa))
                    Debug.Log(koko ? $"MATKAKIRJA ääriviiva: {maa} ei aineistossa"
                                   : $"MATKAKIRJA ääriviiva: {maa} ei maa–maa-rajoja (saarimaa tai ei aineistossa), ei kehää");
                rakennus = null;
                yield break;
            }
            // Verkon taulukot taustasäikeessä; ECEF → georeferenssin paikallinen samalla matriisilla
            // kuin TransformEarthCenteredEarthFixedPositionToUnity (luetaan pääsäikeessä).
            double h = korkeus;
            double4x4 ecefPaikalliseksi = georeferenssi.ecefToLocalMatrix;
            bool avoimet = !koko;
            Nauha nauha = null;
            var tehtava = Task.Run(() => nauha = TeeTaulukot(viivat, avoimet, h, ecefPaikalliseksi));
            while (!tehtava.IsCompleted) yield return null;
            rakennus = null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA ääriviiva: " + tehtava.Exception?.GetBaseException()); yield break; }
            if (maa != kohdeMaa || koko != kohdeKoko || nauha.Janoja == 0) yield break;
            TeeNauha(nauha);
            Maa = maa;
            haiveAlku = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ääriviiva: {maa}, {viivat.Count} {(koko ? "rengasta (koko rengas)" : "maa–maa-rajaviivaa")}, " +
                      $"{nauha.Janoja} janaa, paino {Paino}");
        }

        /// <summary>Nauhaverkon taulukot (rakennetaan taustasäikeessä, Mesh pääsäikeessä).</summary>
        sealed class Nauha
        {
            public int Janoja;
            public Vector3[] Paikat, Toiset;
            public Vector2[] Puolet;
            public int[] Kolmiot;
        }

        /// <summary>WGS84-ellipsoidi (sama kuin CesiumWgs84Ellipsoid): lon/lat/korkeus → ECEF.</summary>
        static double3 Ecef(double lon, double lat, double h)
        {
            const double a = 6378137.0, f = 1.0 / 298.257223563, e2 = f * (2.0 - f);
            double fi = math.radians(lat), la = math.radians(lon);
            double sf = math.sin(fi), cf = math.cos(fi);
            double n = a / math.sqrt(1.0 - e2 * sf * sf);
            return new double3((n + h) * cf * math.cos(la), (n + h) * cf * math.sin(la), (n * (1.0 - e2) + h) * sf);
        }

        /// <summary>
        /// Nauhaverkko Rajaviiva-varjostimelle kuten MaaKartta.TeeRajat; TEXCOORD1.y = janan pää
        /// (−1 a, +1 b) × (1 + viivan lävistäjä asteina), ks. Shaders/Rajaviiva.shader. Lävistäjä on
        /// viivan laatikon lävistäjä asteina (Kehaviivat.Lavistaja: pituus kavennettuna leveyspiirin mukaan,
        /// kuten webin rengasNakyy, sauman yli avattuna). Renkaat suljetaan, avoimet viivat (maa–maa-rajat,
        /// löydös 127) eivät (Kehaviivat.Janoja/Loppu); lyhyt rajanpätkä karsiutuu kaukana kuten pieni rengas.
        /// </summary>
        static Nauha TeeTaulukot(List<(double Lon, double Lat)[]> viivat, bool avoimet, double h, double4x4 m)
        {
            int n = 0;
            foreach (var viiva in viivat)
                if (viiva != null) n += Kehaviivat.Janoja(viiva.Length, avoimet);
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            Vector3 U(double lon, double lat) => (Vector3)(float3)math.mul(m, new double4(Ecef(lon, lat, h), 1.0)).xyz;
            int i = 0;
            foreach (var viiva in viivat)
            {
                if (viiva == null || viiva.Length < 2) continue;
                float y = 1f + (float)Kehaviivat.Lavistaja(viiva);
                int janoja = Kehaviivat.Janoja(viiva.Length, avoimet);
                Vector3 b = U(viiva[0].Lon, viiva[0].Lat);
                for (int k = 0; k < janoja; k++)
                {
                    var pa = viiva[k];
                    var pb = viiva[Kehaviivat.Loppu(k, viiva.Length, avoimet)];
                    Vector3 a = b;
                    if (pa.Lon == pb.Lon && pa.Lat == pb.Lat) continue; // suljetun renkaan viimeinen piste
                    b = U(pb.Lon, pb.Lat);
                    Vector3 jatko = b + (b - a); // b-pään kärjille sama suunta kuin a-päälle
                    int v = i * 4;
                    paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                    toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                    puolet[v] = new Vector2(-1, -y); puolet[v + 1] = new Vector2(1, -y);
                    puolet[v + 2] = new Vector2(-1, y); puolet[v + 3] = new Vector2(1, y);
                    int t = i * 6;
                    kolmiot[t] = v; kolmiot[t + 1] = v + 1; kolmiot[t + 2] = v + 2;
                    kolmiot[t + 3] = v + 1; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
                    i++;
                }
            }
            if (i < n)
            {
                System.Array.Resize(ref paikat, i * 4);
                System.Array.Resize(ref toiset, i * 4);
                System.Array.Resize(ref puolet, i * 4);
                System.Array.Resize(ref kolmiot, i * 6);
            }
            return new Nauha { Janoja = i, Paikat = paikat, Toiset = toiset, Puolet = puolet, Kolmiot = kolmiot };
        }

        void TeeNauha(Nauha nauha)
        {
            var mesh = new Mesh { name = "Maaraja", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.vertices = nauha.Paikat;
            mesh.SetUVs(0, nauha.Toiset);
            mesh.SetUVs(1, nauha.Puolet);
            mesh.triangles = nauha.Kolmiot;
            mesh.RecalculateBounds();
            if (piirto == null)
            {
                var go = new GameObject("Maaraja");
                go.transform.SetParent(georeferenssi.transform, false);
                suodatin = go.AddComponent<MeshFilter>();
                piirto = go.AddComponent<MeshRenderer>();
                piirto.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                piirto.receiveShadows = false;
                oma = new Material(materiaali) { name = "Maaraja", renderQueue = Jono };
                oma.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
                oma.SetFloat("_Jatke", 1f);
                oma.SetFloat("_PieninRengas", PieninRengasPx);
                piirto.sharedMaterial = oma;
            }
            suodatin.sharedMesh = mesh;
            piirto.enabled = false; // LateUpdate päättää näkyvyyden ja leveyden samassa kehyksessä
            nakyiEdella = false;
        }

        void Vapauta()
        {
            if (suodatin == null || suodatin.sharedMesh == null) return;
            var m = suodatin.sharedMesh;
            suodatin.sharedMesh = null;
            Destroy(m);
            if (piirto != null) piirto.enabled = false;
        }

        void LateUpdate()
        {
            if (piirto == null || georeferenssi == null) return;
            bool rantaPiirtyy = Rannikko.Instanssi != null && Rannikko.Instanssi.Piirtyy;
            bool nakyy = suodatin.sharedMesh != null && (!linssit || linssissaSallittu) && !piilossa && Sallittu && (Pakota || !rantaPiirtyy);
            // Linssin jälkeen kehä palaa häiveellä kuten webissä (korostaMaa → rakennaKorostus(true)).
            if (nakyy && !nakyiEdella) haiveAlku = Time.unscaledTime;
            nakyiEdella = nakyy;
            if (piirto.enabled != nakyy) PallonLepo.Valmistui("maaraja");
            piirto.enabled = nakyy;
            if (!nakyy) return;

            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
            float tiheys = Tiheys();
            // Painon laki (Viivaleveys.KehaPt: webin viivanLeveysCss painon päätteillä, löydös 127) tai komennon kiinteä leveys.
            oma.SetFloat("_Paksuus", (float)Viivaleveys.KehaPt(tiheys, PaksuusPt, Paino));
            oma.SetFloat("_Tiheys", tiheys);
            float h = haiveAlku < 0f ? 1f : Mathf.Clamp01((Time.unscaledTime - haiveAlku) / HaiveSek);
            float alfa = 1f - (1f - h) * (1f - h) * (1f - h);
            if (Paino != peitonPaino) { peitonPaino = Paino; peittoNatiivi = (float)Viivaleveys.KehaPeittoNatiivi(Paino); }
            var vari = Muste;
            vari.a = alfa * peittoNatiivi;
            oma.SetColor("_BaseColor", vari);
        }

        /// <summary>
        /// Ruudun tiheys laitepikseleinä leveysastetta kohti ruudun keskellä (web nakyvaAlue: keskipiste ja
        /// piste 40 css-px alempana, leveysasteiden ero). 0 = keskus ohi pallon (ohuin pää, kuten webissä).
        /// </summary>
        float Tiheys()
        {
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (kamera == null) kamera = Camera.main;
            return Pintaosuma.Tiheys(georeferenssi, kamera);
        }
    }
}
