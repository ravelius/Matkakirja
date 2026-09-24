using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using Unity.Mathematics;
using UnityEngine;

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
    /// Aineisto: sisältöpaketin kokoelmat/maarajat.json (kuten MaaKartta), jäsennetään kerran
    /// taustasäikeessä. Nauha piirretään Rajaviiva-varjostimella omalla materiaalikopiolla.
    /// </summary>
    public class Maaraja : MonoBehaviour
    {
        /// <summary>Webin RAJA_MUSTE (paletin --raja-muste), sRGB.</summary>
        public static readonly Color Muste = new Color32(0x6b, 0x55, 0x39, 0xff);
        /// <summary>Leveys css-pikseleinä [kaukana, lähellä] (web VEKTORIT_KOROSTUS_LEVEYS_CSS).</summary>
        public static readonly Vector2 LeveysCss = new Vector2(1.6f, 3f);
        /// <summary>Tiheyden liukuma laitepikseleinä astetta kohti (web VEKTORIT_LEVEYS_TIHEYS).</summary>
        public static readonly Vector2 LeveysTiheys = new Vector2(25f, 250f);
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
            string teksti = null;
            yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning("MATKAKIRJA ääriviiva: maarajat.json puuttuu tästä paketista"); latausAlkanut = false; yield break; }
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
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
            double h = korkeus;
            List<(double3 a, double3 b, float lavistaja)> janat = null;
            var tehtava = Task.Run(() => janat = Janat(maanRenkaat, h));
            while (!tehtava.IsCompleted) yield return null;
            rakennus = null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA ääriviiva: " + tehtava.Exception?.GetBaseException()); yield break; }
            if (maa != haluttu || janat.Count == 0) yield break;
            TeeNauha(janat);
            Maa = maa;
            haiveAlku = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ääriviiva: {maa}, {maanRenkaat.Count} rengasta, {janat.Count} janaa");
        }

        /// <summary>
        /// Renkaiden janat ECEF-pisteinä (taustasäikeessä) ja kunkin renkaan laatikon lävistäjä
        /// asteina (pituus kavennettuna leveyspiirin mukaan, kuten webin rengasNakyy).
        /// </summary>
        static List<(double3 a, double3 b, float lavistaja)> Janat(List<(double Lon, double Lat)[]> renkaat, double h)
        {
            var ulos = new List<(double3, double3, float)>();
            foreach (var rengas in renkaat)
            {
                if (rengas == null || rengas.Length < 2) continue;
                double w = double.MaxValue, e = double.MinValue, s = double.MaxValue, n = double.MinValue;
                foreach (var p in rengas)
                {
                    w = math.min(w, p.Lon); e = math.max(e, p.Lon);
                    s = math.min(s, p.Lat); n = math.max(n, p.Lat);
                }
                double kerroin = math.max(0.05, math.cos(math.radians((s + n) / 2)));
                float lavistaja = (float)math.sqrt((e - w) * kerroin * (e - w) * kerroin + (n - s) * (n - s));
                double3 E((double Lon, double Lat) p) =>
                    CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, h));
                for (int i = 0; i < rengas.Length; i++)
                {
                    var a = rengas[i];
                    var b = rengas[(i + 1) % rengas.Length];
                    if (a.Lon == b.Lon && a.Lat == b.Lat) continue; // suljetun renkaan viimeinen piste
                    ulos.Add((E(a), E(b), lavistaja));
                }
            }
            return ulos;
        }

        /// <summary>
        /// Nauhaverkko Rajaviiva-varjostimelle kuten MaaKartta.TeeRajat; TEXCOORD1.y = janan pää
        /// (−1 a, +1 b) × (1 + renkaan lävistäjä asteina), ks. Shaders/Rajaviiva.shader.
        /// </summary>
        void TeeNauha(List<(double3 a, double3 b, float lavistaja)> janat)
        {
            int n = janat.Count;
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            for (int i = 0; i < n; i++)
            {
                Vector3 a = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(janat[i].a);
                Vector3 b = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(janat[i].b);
                Vector3 jatko = b + (b - a); // b-pään kärjille sama suunta kuin a-päälle
                float y = 1f + janat[i].lavistaja;
                int v = i * 4;
                paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                puolet[v] = new Vector2(-1, -y); puolet[v + 1] = new Vector2(1, -y);
                puolet[v + 2] = new Vector2(-1, y); puolet[v + 3] = new Vector2(1, y);
                int t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 1; kolmiot[t + 2] = v + 2;
                kolmiot[t + 3] = v + 1; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var mesh = new Mesh { name = "Maaraja", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.vertices = paikat;
            mesh.SetUVs(0, toiset);
            mesh.SetUVs(1, puolet);
            mesh.triangles = kolmiot;
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
            bool nakyy = suodatin.sharedMesh != null && !linssit && !piilossa;
            // Linssin jälkeen kehä palaa häiveellä kuten webissä (korostaMaa → rakennaKorostus(true)).
            if (nakyy && !nakyiEdella) haiveAlku = Time.unscaledTime;
            nakyiEdella = nakyy;
            piirto.enabled = nakyy;
            if (!nakyy) return;

            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
            float tiheys = Tiheys();
            float t = Mathf.Clamp01((tiheys - LeveysTiheys.x) / (LeveysTiheys.y - LeveysTiheys.x));
            oma.SetFloat("_Paksuus", Mathf.Lerp(LeveysCss.x, LeveysCss.y, t));
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
            if (kamera == null) return 0f;
            float matka = MittamatkaCss * PalloKierto.Pistekerroin;
            var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            if (!Leveys(kamera, keski, out double lat0) || !Leveys(kamera, keski - new Vector2(0f, matka), out double lat1))
                return 0f;
            double ero = math.abs(lat0 - lat1);
            return ero > 1e-6 ? (float)(matka / ero) : 0f;
        }

        /// <summary>Näytön pisteen leveysaste ellipsoidilla (pallotesti kuten MaaKartta.RuutuPallolle).</summary>
        bool Leveys(Camera kamera, Vector2 ruutu, out double lat)
        {
            lat = 0;
            Ray r = kamera.ScreenPointToRay(ruutu);
            var gt = georeferenssi.transform;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 o = (float3)gt.InverseTransformPoint(r.origin);
            double3 s = math.normalize((double3)(float3)gt.InverseTransformDirection(r.direction));
            double3 oc = o - keskus;
            const double a = 6378137.0;
            double B = math.dot(oc, s), C = math.dot(oc, oc) - a * a;
            double D = B * B - C;
            if (D < 0 || -B - math.sqrt(D) < 0) return false;
            double3 osuma = o + s * (-B - math.sqrt(D));
            double3 ecef = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(osuma);
            lat = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef).y;
            return true;
        }
    }
}
