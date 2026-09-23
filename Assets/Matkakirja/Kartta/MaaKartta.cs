using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Maatila (Linssisepän vertailu ja maatiedot, RAJAPINTA.md luku 4): maat täyttöinä ja
    /// rajoina pallon päällä, napautus osuu maahan (ISO3). Toteuttaa Linssit.Ydinin
    /// IMaaKartta-rajapinnan; linssit saavat sen <see cref="KarttaKerrokset.Maat"/>-kentästä.
    ///
    /// Aineisto: sisältöpaketin kokoelmat/maarajat.json (Siirtoseppä, nippu 4). Maat
    /// rasteroidaan taustasäikeessä tasakulmaiseen tunnuskarttaan (parillisuussääntö,
    /// päivämääräraja kiertää), ja varjostin (Shaders/MaaTaytto) värittää sen paletista.
    /// Sävyn vaihto kirjoittaa vain 256×2-paletin, joten korostus on ilmainen.
    /// </summary>
    public class MaaKartta : MonoBehaviour, IMaaKartta
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public KarttaKerrokset kerrokset;
        public Material materiaali;
        [Tooltip("Tunnuskartan leveys (korkeus on puolet). 4096 ≈ 0,09° per pikseli.")]
        public int leveys = 4096;
        [Tooltip("Kuoren korkeus ellipsoidin yläpuolella, metreinä.")]
        public double korkeus = 0.0;
        [Tooltip("Napautuksen toleranssi asteina (rannikkokaupungit osuvat maahan).")]
        public double toleranssi = 0.5;

        public event Action<string> MaaNapautettu;
        public bool Paalla { get; private set; }
        public bool Valmis => tunnukset != null;

        MaatAineisto aineisto;
        MaaOsuma osuma;
        readonly Dictionary<string, int> indeksi = new Dictionary<string, int>();
        readonly Dictionary<string, Savy> korostukset = new Dictionary<string, Savy>();
        Savy perus = new Savy(new Rgba(0, 0, 0, 0), new Rgba(0.23f, 0.18f, 0.13f, 0.8f));
        Texture2D tunnukset, paletti;
        MeshRenderer kuori;
        bool latausAlkanut;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kerrokset == null) kerrokset = GetComponent<KarttaKerrokset>();
            if (kierto != null) kierto.Napautettu += Napautus;
        }

        void OnDestroy()
        {
            if (kierto != null) kierto.Napautettu -= Napautus;
        }

        // ---- IMaaKartta ----

        public void MaaTila(bool paalla)
        {
            Paalla = paalla;
            if (kerrokset != null)
            {
                kerrokset.Nakyvyys("kaupungit", !paalla);
                kerrokset.Nakyvyys("nimiot", !paalla);
            }
            if (paalla && !latausAlkanut) StartCoroutine(Lataa());
            if (kuori != null) kuori.enabled = paalla && Valmis;
        }

        public void MaaPerussavy(Savy savy) { perus = savy; PaivitaPaletti(); }

        public void Korosta(string iso3, Savy savy)
        {
            if (string.IsNullOrEmpty(iso3)) return;
            korostukset[iso3] = savy;
            PaivitaPaletti();
        }

        public void KorostusPois(string iso3)
        {
            if (iso3 == null) korostukset.Clear(); else korostukset.Remove(iso3);
            PaivitaPaletti();
        }

        /// <summary>Maa pisteessä (sama osumatesti kuin napautuksessa), tai null.</summary>
        public string MaaPisteessa(double lat, double lon) => osuma?.Hae(lat, lon, toleranssi);

        // ---- Napautus ----

        void Napautus(Vector2 ruutu)
        {
            if (!Paalla) return;
            if (osuma == null || kierto == null) { Debug.Log($"MATKAKIRJA maat: napautus ohitettu (osuma {osuma != null}, kierto {kierto != null})"); return; }
            if (!RuutuPallolle(ruutu, out double lat, out double lon)) { Debug.Log($"MATKAKIRJA maat: napautus {ruutu} ohi pallon"); return; }
            var iso3 = osuma.Hae(lat, lon, toleranssi);
            Debug.Log($"MATKAKIRJA maat: napautus {lat:0.00} {lon:0.00} → {iso3 ?? "meri"}");
            if (iso3 != null) MaaNapautettu?.Invoke(iso3);
        }

        /// <summary>Näytön piste (pikseleinä, origo vasen alakulma) → leveys ja pituus ellipsoidilla.</summary>
        public bool RuutuPallolle(Vector2 ruutu, out double lat, out double lon)
        {
            lat = lon = 0;
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) kamera = Camera.main;
            if (kamera == null || georeferenssi == null) return false;
            // Pallotesti Unityn avaruudessa (säde = päiväntasaajan säde): napojen virhe on alle
            // 21 km, mikä mahtuu osumatestin 0,5°:n toleranssiin. Osuma muunnetaan ECEF:ksi ja
            // siitä leveydeksi ja pituudeksi.
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
            double3 osumaU = o + s * (-B - math.sqrt(D));
            double3 ecef = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(osumaU);
            double3 llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
            lon = llh.x; lat = llh.y;
            return true;
        }

        // ---- Lataus ja rasterointi ----

        IEnumerator Lataa()
        {
            latausAlkanut = true;
            string teksti = null;
            yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning("MATKAKIRJA maat: maarajat.json puuttuu (paketti ennen nippua 4?)"); latausAlkanut = false; yield break; }
            float alku = Time.realtimeSinceStartup;
            int w = leveys, h = leveys / 2;
            MaatAineisto aineistoT = null;
            byte[] kartta = null;
            List<Maa> jarjestys = null;
            var tehtava = Task.Run(() =>
            {
                aineistoT = MaatAineisto.LueRajat(Peli.MiniJson.Jasenna(teksti));
                jarjestys = new List<Maa>(aineistoT.Maat.Values);
                jarjestys.Sort((x, y) => string.CompareOrdinal(x.Id, y.Id));
                if (jarjestys.Count > 255) jarjestys.RemoveRange(255, jarjestys.Count - 255);
                kartta = Rasteroi(jarjestys, w, h);
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted)
            {
                Debug.LogError("MATKAKIRJA maat: rasterointi kaatui: " + tehtava.Exception?.GetBaseException());
                latausAlkanut = false;
                yield break;
            }
            aineisto = aineistoT;
            osuma = new MaaOsuma(aineisto);
            indeksi.Clear();
            for (int i = 0; i < jarjestys.Count; i++) indeksi[jarjestys[i].Id] = i + 1;

            tunnukset = new Texture2D(w, h, TextureFormat.R8, false, true)
            {
                name = "Maatunnukset", filterMode = FilterMode.Point, wrapModeU = TextureWrapMode.Repeat,
                wrapModeV = TextureWrapMode.Clamp,
            };
            tunnukset.SetPixelData(kartta, 0);
            tunnukset.Apply(false, true);
            // sRGB (linear = false): webin värit ovat sRGB:tä, ja URP muuntaa näytteen lineaariseksi.
            // Lineaarisena täyttö näkyi iPadilla haaleana (Linssisepän kontaktiarkki 23.9.).
            paletti = new Texture2D(256, 2, TextureFormat.RGBA32, false, false)
            {
                name = "Maapaletti", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp,
            };
            PaivitaPaletti();
            TeeKuori();
            Debug.Log($"MATKAKIRJA maat: {jarjestys.Count} maata, tunnuskartta {w}×{h}, " +
                      $"{(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
            if (kuori != null) kuori.enabled = Paalla;
        }

        /// <summary>
        /// Parillisuussäännön juoviorasterointi: jokaiselle maalle kerätään reunojen
        /// leikkaukset riveittäin (pikselin keskikohta) ja täytetään parit. x kiertää
        /// leveyden yli (päivämääräraja, renkaat voivat jatkua yli ±180°).
        /// </summary>
        static byte[] Rasteroi(List<Maa> maat, int w, int h)
        {
            var kartta = new byte[w * h];
            var rivit = new List<float>[h];
            for (int m = 0; m < maat.Count; m++)
            {
                byte arvo = (byte)(m + 1);
                int yMin = h, yMax = -1;
                foreach (var rengas in maat[m].Renkaat)
                {
                    for (int i = 0; i < rengas.Length; i++)
                    {
                        var p0 = rengas[i];
                        var p1 = rengas[(i + 1) % rengas.Length];
                        double x0 = (p0.Lon + 180.0) / 360.0 * w, y0 = (90.0 - p0.Lat) / 180.0 * h;
                        double x1 = (p1.Lon + 180.0) / 360.0 * w, y1 = (90.0 - p1.Lat) / 180.0 * h;
                        if (y0 == y1) continue;
                        double ya = Math.Min(y0, y1), yb = Math.Max(y0, y1);
                        int r0 = Math.Max(0, (int)Math.Ceiling(ya - 0.5));
                        int r1 = Math.Min(h - 1, (int)Math.Ceiling(yb - 0.5) - 1);
                        for (int r = r0; r <= r1; r++)
                        {
                            double yc = r + 0.5;
                            double x = x0 + (yc - y0) * (x1 - x0) / (y1 - y0);
                            (rivit[r] ??= new List<float>()).Add((float)x);
                            if (r < yMin) yMin = r;
                            if (r > yMax) yMax = r;
                        }
                    }
                }
                for (int r = yMin; r <= yMax; r++)
                {
                    var l = rivit[r];
                    if (l == null || l.Count < 2) { l?.Clear(); continue; }
                    l.Sort();
                    int rivi = r * w;
                    for (int i = 0; i + 1 < l.Count; i += 2)
                    {
                        int xa = (int)Math.Ceiling(l[i] - 0.5), xb = (int)Math.Ceiling(l[i + 1] - 0.5) - 1;
                        for (int x = xa; x <= xb; x++)
                        {
                            int xx = ((x % w) + w) % w;
                            kartta[rivi + xx] = arvo;
                        }
                    }
                    l.Clear();
                }
            }
            return kartta;
        }

        void PaivitaPaletti()
        {
            if (paletti == null) return;
            var px = new Color32[256 * 2];
            Color32 C(Rgba v) => new Color32((byte)(v.R * 255), (byte)(v.G * 255), (byte)(v.B * 255), (byte)(v.A * 255));
            foreach (var p in indeksi)
            {
                var s = korostukset.TryGetValue(p.Key, out var k) ? k : perus;
                px[p.Value] = C(s.Taytto);
                px[256 + p.Value] = C(s.Reuna);
            }
            paletti.SetPixels32(px);
            paletti.Apply(false);
        }

        void TeeKuori()
        {
            if (kuori != null || materiaali == null) return;
            var go = new GameObject("Maakuori");
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = Verkko(180, 90);
            kuori = go.AddComponent<MeshRenderer>();
            kuori.sharedMaterial = new Material(materiaali);
            kuori.sharedMaterial.SetTexture("_Tunnus", tunnukset);
            kuori.sharedMaterial.SetTexture("_Paletti", paletti);
            kuori.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            kuori.receiveShadows = false;
            kuori.enabled = false;
        }

        /// <summary>Tasakulmainen ellipsoidikuori: rivit pohjoisesta etelään, uv = (lon, 0 pohjoisessa … 1 etelässä).</summary>
        Mesh Verkko(int sektoreita, int kehia)
        {
            int n = (kehia + 1) * (sektoreita + 1);
            var paikat = new Vector3[n];
            var uv = new Vector2[n];
            int i = 0;
            for (int k = 0; k <= kehia; k++)
            {
                double lat = 90.0 - 180.0 * k / kehia;
                for (int s = 0; s <= sektoreita; s++)
                {
                    double lon = -180.0 + 360.0 * s / sektoreita;
                    double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
                    paikat[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                    // Tunnuskartan rivi 0 on pohjoisin (SetPixelData: v = 0), joten v kasvaa etelään.
                    uv[i] = new Vector2((float)s / sektoreita, (float)k / kehia);
                    i++;
                }
            }
            var kolmiot = new int[kehia * sektoreita * 6];
            int t = 0;
            for (int k = 0; k < kehia; k++)
                for (int s = 0; s < sektoreita; s++)
                {
                    int a = k * (sektoreita + 1) + s, b = a + 1, c = a + sektoreita + 1, d = c + 1;
                    // Etupuoli ulospäin (Unityn vasenkätinen kierto georeferenssin akseleilla;
                    // varmistettu iPadilla: väärä kierto näytti takapuolen maat peilattuina).
                    kolmiot[t++] = a; kolmiot[t++] = b; kolmiot[t++] = c;
                    kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c;
                }
            var m = new Mesh { name = "Maakuori", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            m.vertices = paikat;
            m.uv = uv;
            m.triangles = kolmiot;
            m.RecalculateBounds();
            return m;
        }
    }
}
