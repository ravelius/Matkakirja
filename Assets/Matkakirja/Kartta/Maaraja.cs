using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;
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
    /// rajat ovat poltettuina pohjalaatoissa, joten vektorina piirretään vain nykyinen maa.
    ///
    /// Webin säännöt: muste RAJA_MUSTE #6b5539 täytenä (KOROSTUS_PEITTO 1), yhtenäinen viiva,
    /// leveys VEKTORIT_KOROSTUS_LEVEYS_CSS [1,6; 3] css-px liukuen ruudun tiheyden mukaan
    /// (VEKTORIT_LEVEYS_TIHEYS 25–250 laitepikseliä leveysastetta kohti ruudun keskellä, mitattuna
    /// 40 css-px:n matkalta alaspäin), renkaat, joiden laatikon lävistäjä ruudulla jää alle
    /// KOROSTUKSEN_PIENIN_RENGAS_PX 10 laitepikselin, pois. Uusi kehä häivytetään sisään
    /// VEKTORIT_HAIVE_MS 260 ms (ease-out, 1 − (1 − t)³); vanha poistuu heti (vapautaKorostus).
    /// Kehä pois linssin ajaksi samalla portilla kuin kaupunkipisteet (lauta.js linssiPaalla).
    ///
    /// Maa: sama kuin väritasolla (<see cref="Varitaso.Kohde"/>), koska webissä korostusIso ohjaa
    /// molempia. Kohde eikä Varitaso.Maa: maa ilman värisarjaa (RUS, ISL …) saa silti kehän,
    /// kuten webissä, jossa kehä tulee maapolygoneista eikä värilaatoista. Ilman väritasoa sama
    /// sääntö suoraan NostoKerrokselta (matkalla edellinen maa säilyy).
    ///
    /// Aineisto (omistajan build 7 -löydös 22 kohta 2: kehän oltava yhtä tarkka kuin webissä): sama
    /// lähde kuin webin kehällä, assets/data/maapolygonit.json (Natural Earth 10m admin-0, DP 0,2
    /// lautayksikköä, rannikko GSHHG full), jonka Karttaseppä muunsi lon/lat-GeoJSONiksi ämpäriin
    /// (<see cref="GeojsonPolku"/>, 135 maata, ~497 000 pistettä, ominaisuus "iso" = ISO3). Haetaan
    /// laattapalvelimen kautta (offline-kansio → välimuisti → verkko) ja jäsennetään kerran
    /// taustasäikeessä omalla kevyellä lukijalla (<see cref="Geojson"/>) maittain tauluksi. Jos tiedosto
    /// ei tule (offline ilman latausta), varana sisältöpaketin karkea kokoelmat/maarajat.json.
    /// Nauha piirretään Rajaviiva-varjostimella omalla materiaalikopiolla.
    ///
    /// LÖYDÖS 46 JATKO (omistajan kuva Kreikasta, build 11: "paksu tumma kehä rantojen ympärillä"): leveys on jo webin
    /// arvo (Viivaleveys: 1,6–3 pt × Pistekerroin = webin css × dpr, peitto 1, #6b5539), mutta kuvassa kehä oli noin
    /// 8,6 laitepikseliä 6:n sijaan. Syy: janojen neliöjatke porrasmaisilla rannoilla täytti kulmat; web piirtää
    /// korostuksen päätypyörylöillä. Rajaviiva-varjostin tekee nyt pyöreät päät. Toinen ero webiin jää: webissä kehä
    /// piirtyy ohuen rannikkoviivan (0,8–1,2 css, peitto 0,58) ALLE ja naulataan rannikkoaineistoon; natiivissa
    /// rannikko on poltettu laattaan ja kehä piirtyy sen päälle.
    /// </summary>
    public class Maaraja : MonoBehaviour
    {
        /// <summary>Webin RAJA_MUSTE (paletin --raja-muste), sRGB.</summary>
        public static readonly Color Muste = new Color32(0x6b, 0x55, 0x39, 0xff);
        /// <summary>Leveys css-pikseleinä [kaukana, lähellä] (web VEKTORIT_KOROSTUS_LEVEYS_CSS).</summary>
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
        /// Kehän aineisto ämpärissä (Karttasepän maapolygonit.geojson, content-encoding gzip). Myös
        /// offline-latauksen "maailma"-alueessa (Alueet.Polut).
        /// </summary>
        public const string GeojsonPolku = "julisteet/pallo/vektorit/maapolygonit-2026-09-24/maapolygonit.geojson";

        /// <summary>Kehä sallittu (komento "maaraja pois" = false; oletus true).</summary>
        public static bool Sallittu = true;
        /// <summary>
        /// Kehä myös vektorirannan kanssa. Oletus true: KOTIMAAN KOROSTUS (omistajan build 13 -lista 25.9.2026 ja
        /// Linssisepän kierros 3 rivi 39, web lauta.js paivitaPallonMaakorostus): kotimaa kehällä kuten webissä. Kehä
        /// piirtyy rannan alle (Jono 2995 &lt; Rannikko.RantaJono 2997), joten rannikolla ei synny kaksoisviivaa.
        /// Korvaa 25.9. klo 00.0x:n päätöksen (kehä pois, kun Rannikko piirtyy). Komento "maaraja pois" vertailuun.
        /// </summary>
        public static bool Pakota = true;
        /// <summary>Kiinteä leveys pisteinä (komento "maaraja paksuus &lt;pt&gt;"); NaN tai ≤ 0 = webin laki [1,6; 3].</summary>
        public static float PaksuusPt = float.NaN;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut() { Sallittu = true; Pakota = true; PaksuusPt = float.NaN; }

        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Varitaso varitaso;
        /// <summary>Rajaviiva-materiaali (sama kuin maakuntien rajoilla); tästä tehdään oma kopio.</summary>
        public Material materiaali;
        [Tooltip("Viivan korkeus ellipsoidin yläpuolella, metreinä (web VEKTORIT_KORKEUS 0).")]
        public double korkeus = 0.0;

        /// <summary>Maa (ISO3), jonka ääriviiva on nyt piirretty, tai null.</summary>
        public string Maa { get; private set; }

        Dictionary<string, List<(double Lon, double Lat)[]>> renkaat;
        bool latausAlkanut;
        string haluttu;
        Coroutine rakennus;
        MeshRenderer piirto;
        MeshFilter suodatin;
        Material oma;
        bool linssit, piilossa, nakyiEdella;
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
            if (materiaali != null && !latausAlkanut) StartCoroutine(Lataa());
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
            string maa = PelaajanMaa();
            if (maa == haluttu) return;
            haluttu = maa;
            if (renkaat == null) return; // Lataa rakentaa, kun aineisto on valmis.
            if (rakennus != null) StopCoroutine(rakennus);
            rakennus = StartCoroutine(Rakenna(maa));
        }

        IEnumerator Lataa()
        {
            latausAlkanut = true;
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;

            // 1. Webin tarkka aineisto laattapalvelimen kautta. Palvelin tallentaa ja palauttaa
            // raakatavut ilman Content-Encoding-otsaketta: jos ämpäri antoi gzipin eikä
            // UnityWebRequest purkanut sitä, tavut alkavat 0x1f 0x8b ja ne puretaan tässä.
            byte[] tavut = null;
            using (var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + GeojsonPolku)))
            {
                pyynto.timeout = 45;
                yield return pyynto.SendWebRequest();
                if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                else Debug.LogWarning($"MATKAKIRJA ääriviiva: maapolygonit.geojson ei latautunut ({pyynto.responseCode} {pyynto.error}), varana maarajat.json");
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
                    Debug.LogError("MATKAKIRJA ääriviiva: maapolygonit.geojson jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                    tulos = null;
                }
                else if (tulos.Count == 0) tulos = null;
                else
                {
                    int pisteet = 0;
                    foreach (var m in tulos.Values) foreach (var r in m) pisteet += r.Length;
                    Debug.Log($"MATKAKIRJA ääriviiva: maapolygonit.geojson, {tulos.Count} maata, {pisteet} pistettä, jäsennys {kesto} ms");
                }
            }

            // 2. Vara: sisältöpaketin karkea maarajat.json (kuten MaaKartta).
            if (tulos == null)
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
                if (teksti == null) { Debug.LogWarning("MATKAKIRJA ääriviiva: maarajat.json puuttuu tästä paketista"); latausAlkanut = false; yield break; }
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
                    latausAlkanut = false;
                    yield break;
                }
            }
            renkaat = tulos;
            if (haluttu != null) rakennus = StartCoroutine(Rakenna(haluttu));
        }

        IEnumerator Rakenna(string maa)
        {
            // Vanha kehä pois heti (web vapautaKorostus), uusi häivytetään sisään.
            Vapauta();
            Maa = null;
            if (string.IsNullOrEmpty(maa) || !renkaat.TryGetValue(maa, out var maanRenkaat) || maanRenkaat.Count == 0)
            {
                if (!string.IsNullOrEmpty(maa)) Debug.Log($"MATKAKIRJA ääriviiva: {maa} ei aineistossa");
                rakennus = null;
                yield break;
            }
            // Verkon taulukot taustasäikeessä; ECEF → georeferenssin paikallinen samalla matriisilla
            // kuin TransformEarthCenteredEarthFixedPositionToUnity (luetaan pääsäikeessä).
            double h = korkeus;
            double4x4 ecefPaikalliseksi = georeferenssi.ecefToLocalMatrix;
            Nauha nauha = null;
            var tehtava = Task.Run(() => nauha = TeeTaulukot(maanRenkaat, h, ecefPaikalliseksi));
            while (!tehtava.IsCompleted) yield return null;
            rakennus = null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA ääriviiva: " + tehtava.Exception?.GetBaseException()); yield break; }
            if (maa != haluttu || nauha.Janoja == 0) yield break;
            TeeNauha(nauha);
            Maa = maa;
            haiveAlku = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ääriviiva: {maa}, {maanRenkaat.Count} rengasta, {nauha.Janoja} janaa");
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
        /// (−1 a, +1 b) × (1 + renkaan lävistäjä asteina), ks. Shaders/Rajaviiva.shader. Lävistäjä on
        /// renkaan laatikon lävistäjä asteina (pituus kavennettuna leveyspiirin mukaan, kuten webin
        /// rengasNakyy); pituudet avataan sauman yli (Venäjän ja Fidžin renkaat ylittävät ±180°:n),
        /// jottei saumarengas saa koko maailman levyistä laatikkoa.
        /// </summary>
        static Nauha TeeTaulukot(List<(double Lon, double Lat)[]> renkaat, double h, double4x4 m)
        {
            int n = 0;
            foreach (var rengas in renkaat)
                if (rengas != null && rengas.Length >= 2) n += rengas.Length;
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            Vector3 U(double lon, double lat) => (Vector3)(float3)math.mul(m, new double4(Ecef(lon, lat, h), 1.0)).xyz;
            int i = 0;
            foreach (var rengas in renkaat)
            {
                if (rengas == null || rengas.Length < 2) continue;
                double w = double.MaxValue, e = double.MinValue, s = double.MaxValue, no = double.MinValue;
                double edellinen = rengas[0].Lon, siirto = 0;
                foreach (var p in rengas)
                {
                    double lon = p.Lon + siirto;
                    if (lon - edellinen > 180) { siirto -= 360; lon -= 360; }
                    else if (lon - edellinen < -180) { siirto += 360; lon += 360; }
                    edellinen = lon;
                    w = math.min(w, lon); e = math.max(e, lon);
                    s = math.min(s, p.Lat); no = math.max(no, p.Lat);
                }
                double kerroin = math.max(0.05, math.cos(math.radians((s + no) / 2)));
                float lavistaja = (float)math.sqrt((e - w) * kerroin * (e - w) * kerroin + (no - s) * (no - s));
                float y = 1f + lavistaja;
                Vector3 b = U(rengas[0].Lon, rengas[0].Lat);
                for (int k = 0; k < rengas.Length; k++)
                {
                    var pa = rengas[k];
                    var pb = rengas[(k + 1) % rengas.Length];
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
            if (piirto.enabled != nakyy) PallonLepo.Muuttui("maaraja");
            piirto.enabled = nakyy;
            if (!nakyy) return;

            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
            float tiheys = Tiheys();
            // Webin laki (Viivaleveys.KehaPt = viivanLeveysCss korostukselle) tai komennon kiinteä leveys.
            oma.SetFloat("_Paksuus", (float)Viivaleveys.KehaPt(tiheys, PaksuusPt));
            oma.SetFloat("_Tiheys", tiheys);
            float h = haiveAlku < 0f ? 1f : Mathf.Clamp01((Time.unscaledTime - haiveAlku) / HaiveSek);
            float alfa = 1f - (1f - h) * (1f - h) * (1f - h);
            var vari = Muste;
            vari.a = alfa;
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

        /// <summary>
        /// Kevyt GeoJSON-lukija maapolygonit.geojsonille (puhdas C#, ajetaan taustasäikeessä). Käy
        /// UTF-8-tavut kerran läpi rakentamatta MiniJson-puuta: FeatureCollectionin jokaisesta
        /// featuresta poimitaan properties.iso ja geometry.coordinates (Polygon tai MultiPolygon,
        /// sisäkkäisyys päätellään taulukoista), kaikki muu ohitetaan. Kenttien järjestys vapaa.
        /// Tulos: ISO3 → renkaat [(lon, lat)], jokainen rengas sellaisenaan (sulkeva piste mukana).
        /// </summary>
        public static class Geojson
        {
            /// <summary>Purkaa gzipin, jos tavut alkavat 0x1f 0x8b (palvelin ei välitä Content-Encodingia).</summary>
            public static byte[] Pura(byte[] tavut)
            {
                if (tavut == null || tavut.Length < 2 || tavut[0] != 0x1f || tavut[1] != 0x8b) return tavut;
                using var sisaan = new MemoryStream(tavut);
                using var gz = new GZipStream(sisaan, CompressionMode.Decompress);
                using var ulos = new MemoryStream(tavut.Length * 4);
                gz.CopyTo(ulos);
                return ulos.ToArray();
            }

            public static Dictionary<string, List<(double Lon, double Lat)[]>> Lue(byte[] tavut)
            {
                var l = new Lukija { b = tavut };
                // UTF-8 BOM
                if (tavut.Length >= 3 && tavut[0] == 0xef && tavut[1] == 0xbb && tavut[2] == 0xbf) l.i = 3;
                var tulos = new Dictionary<string, List<(double Lon, double Lat)[]>>(System.StringComparer.Ordinal);
                l.Objekti(k =>
                {
                    if (k != "features" || l.OnNull()) { l.Ohita(); return; }
                    l.Taulukko(() => l.Feature(tulos));
                });
                return tulos;
            }

            sealed class Lukija
            {
                public byte[] b;
                public int i;
                readonly List<(double, double)> puskuri = new List<(double, double)>(4096);
                static readonly double[] Potenssit =
                {
                    1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11,
                    1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22,
                };

                public void Feature(Dictionary<string, List<(double Lon, double Lat)[]>> tulos)
                {
                    if (OnNull()) { Ohita(); return; }
                    string iso = null;
                    var renkaat = new List<(double Lon, double Lat)[]>();
                    Objekti(k =>
                    {
                        if (k == "properties" && !OnNull())
                            Objekti(k2 => { if (k2 == "iso" && b[i] == '"') iso = Merkkijono(); else Ohita(); });
                        else if (k == "geometry" && !OnNull())
                            Objekti(k2 => { if (k2 == "coordinates" && b[i] == '[') Koordinaatit(renkaat); else Ohita(); });
                        else Ohita();
                    });
                    if (string.IsNullOrEmpty(iso) || renkaat.Count == 0) return;
                    if (tulos.TryGetValue(iso, out var vanhat)) vanhat.AddRange(renkaat);
                    else tulos[iso] = renkaat;
                }

                /// <summary>Sisäkkäiset taulukot: taulukko, jonka alkiot ovat lukupareja, on rengas.</summary>
                void Koordinaatit(List<(double Lon, double Lat)[]> renkaat)
                {
                    Odota('[');
                    Ws();
                    if (b[i] == ']') { i++; return; }
                    if (OnLukuAlku(b[i]))
                    {
                        // Yksittäinen piste (Point) ei ole rengas: ohitetaan.
                        while (true) { Luku(); Ws(); if (b[i] == ',') { i++; continue; } Odota(']'); return; }
                    }
                    int j = i + 1;
                    while (j < b.Length && OnTyhja(b[j])) j++;
                    if (b[i] == '[' && j < b.Length && OnLukuAlku(b[j]))
                    {
                        puskuri.Clear();
                        while (true)
                        {
                            Ws();
                            Odota('[');
                            double lon = Luku();
                            Ws(); Odota(',');
                            double lat = Luku();
                            Ws();
                            while (b[i] == ',') { i++; Luku(); Ws(); } // korkeus tms.
                            Odota(']');
                            puskuri.Add((lon, lat));
                            Ws();
                            if (b[i] == ',') { i++; continue; }
                            Odota(']');
                            break;
                        }
                        if (puskuri.Count >= 2) renkaat.Add(puskuri.ToArray());
                        return;
                    }
                    while (true)
                    {
                        Ws();
                        Koordinaatit(renkaat);
                        Ws();
                        if (b[i] == ',') { i++; continue; }
                        Odota(']');
                        return;
                    }
                }

                public void Objekti(System.Action<string> kentta)
                {
                    Ws();
                    Odota('{');
                    Ws();
                    if (b[i] == '}') { i++; return; }
                    while (true)
                    {
                        Ws();
                        string avain = Merkkijono();
                        Ws(); Odota(':'); Ws();
                        kentta(avain);
                        Ws();
                        if (b[i] == ',') { i++; continue; }
                        Odota('}');
                        return;
                    }
                }

                public void Taulukko(System.Action alkio)
                {
                    Ws();
                    Odota('[');
                    Ws();
                    if (b[i] == ']') { i++; return; }
                    while (true)
                    {
                        Ws();
                        alkio();
                        Ws();
                        if (b[i] == ',') { i++; continue; }
                        Odota(']');
                        return;
                    }
                }

                public bool OnNull()
                {
                    Ws();
                    return b[i] == 'n';
                }

                /// <summary>Ohittaa minkä tahansa arvon (merkkijono, luku, literaali, objekti, taulukko).</summary>
                public void Ohita()
                {
                    Ws();
                    byte c = b[i];
                    if (c == '"') { OhitaMerkkijono(); return; }
                    if (c == '{' || c == '[')
                    {
                        int syvyys = 0;
                        while (true)
                        {
                            c = b[i];
                            if (c == '"') { OhitaMerkkijono(); continue; }
                            i++;
                            if (c == '{' || c == '[') syvyys++;
                            else if ((c == '}' || c == ']') && --syvyys == 0) return;
                        }
                    }
                    while (i < b.Length && b[i] != ',' && b[i] != '}' && b[i] != ']' && !OnTyhja(b[i])) i++;
                }

                void OhitaMerkkijono()
                {
                    i++; // "
                    while (b[i] != '"') i += b[i] == '\\' ? 2 : 1;
                    i++;
                }

                public string Merkkijono()
                {
                    Odota('"');
                    int alku = i;
                    bool pako = false;
                    while (b[i] != '"') { if (b[i] == '\\') { pako = true; i++; } i++; }
                    int loppu = i++;
                    if (!pako) return Encoding.UTF8.GetString(b, alku, loppu - alku);
                    var sb = new StringBuilder();
                    for (int k = alku; k < loppu; k++)
                    {
                        if (b[k] != '\\') { sb.Append((char)b[k]); continue; } // avaimet ja ISO-koodit ovat ASCIIta
                        char c = (char)b[++k];
                        switch (c)
                        {
                            case 'n': sb.Append('\n'); break;
                            case 't': sb.Append('\t'); break;
                            case 'r': sb.Append('\r'); break;
                            case 'b': sb.Append('\b'); break;
                            case 'f': sb.Append('\f'); break;
                            case 'u':
                                sb.Append((char)System.Convert.ToInt32(Encoding.ASCII.GetString(b, k + 1, 4), 16));
                                k += 4;
                                break;
                            default: sb.Append(c); break;
                        }
                    }
                    return sb.ToString();
                }

                /// <summary>
                /// JSON-luku ilman merkkijonoa: mantissa kokonaislukuna ja jako kymmenen potenssilla
                /// (≤ 22 tarkka, joten 7.022 = 7022 / 1e3 pyöristyy oikein).
                /// </summary>
                double Luku()
                {
                    Ws();
                    bool miinus = false;
                    if (b[i] == '-') { miinus = true; i++; }
                    else if (b[i] == '+') i++;
                    long m = 0;
                    int numeroita = 0, eksp = 0;
                    int alku = i;
                    while (i < b.Length && b[i] >= '0' && b[i] <= '9')
                    {
                        if (numeroita < 18) { m = m * 10 + (b[i] - '0'); if (m != 0) numeroita++; }
                        else eksp++;
                        i++;
                    }
                    bool nahty = i > alku;
                    if (i < b.Length && b[i] == '.')
                    {
                        i++;
                        nahty |= i < b.Length && b[i] >= '0' && b[i] <= '9';
                        while (i < b.Length && b[i] >= '0' && b[i] <= '9')
                        {
                            if (numeroita < 18) { m = m * 10 + (b[i] - '0'); if (m != 0) numeroita++; eksp--; }
                            i++;
                        }
                    }
                    if (i < b.Length && (b[i] == 'e' || b[i] == 'E'))
                    {
                        i++;
                        bool em = false;
                        if (b[i] == '-') { em = true; i++; }
                        else if (b[i] == '+') i++;
                        int e = 0;
                        while (i < b.Length && b[i] >= '0' && b[i] <= '9') { e = e * 10 + (b[i] - '0'); i++; }
                        eksp += em ? -e : e;
                    }
                    if (!nahty)
                        throw new System.FormatException("GeoJSON: luku puuttuu kohdassa " + i);
                    double arvo = m;
                    if (eksp < 0) arvo = -eksp < Potenssit.Length ? arvo / Potenssit[-eksp] : arvo / System.Math.Pow(10, -eksp);
                    else if (eksp > 0) arvo = eksp < Potenssit.Length ? arvo * Potenssit[eksp] : arvo * System.Math.Pow(10, eksp);
                    return miinus ? -arvo : arvo;
                }

                void Ws() { while (i < b.Length && OnTyhja(b[i])) i++; }

                void Odota(char c)
                {
                    if (i >= b.Length || b[i] != c)
                        throw new System.FormatException($"GeoJSON: odotettiin '{c}' kohdassa {i}");
                    i++;
                }

                static bool OnTyhja(byte c) => c == ' ' || c == '\n' || c == '\r' || c == '\t';
                static bool OnLukuAlku(byte c) => (c >= '0' && c <= '9') || c == '-' || c == '+' || c == '.';
            }
        }
    }
}
