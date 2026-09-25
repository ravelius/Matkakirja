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
        [Tooltip("Sisältöpaketin kokoelma: maarajat (maat, ISO3) tai maakuntarajat (\"ISO:tunnus\", B17).")]
        public string kokoelma = "maarajat";
        [Tooltip("Piilotetaanko kaupungit ja nimiöt tilan ajaksi (maatila kyllä, maakuntien värjäys ei).")]
        public bool piilotaKaupungit = true;
        [Tooltip("Piirtojärjestys kuorten kesken (maakunnat maiden päälle).")]
        public int jonoLisa = 0;
        [Tooltip("Tunnuskartan rajaus (länsi, etelä, itä, pohjoinen) asteina; nollat = koko maailma. " +
                 "Maakunnille Eurooppa: sama tekstuurimuisti, noin 9× tarkempi raja. Rajauksen ulkopuoliset alueet jätetään pois.")]
        public Vector4 rajaus;
        [Tooltip("Rajat vektoriviivoina (Shaders/Rajaviiva), tarkkuus ei riipu tunnuskartasta. null = rajat " +
                 "tunnuskartasta varjostimessa (maatila). Korostetun alueen raja piirtyy edelleen varjostimessa.")]
        public Material rajaMateriaali;
        [Tooltip("Vektorirajat vasta tästä ruudun tiheydestä (laitepikseliä/aste), web VEKTORIT_RAJAT_PX_ASTE 30 " +
                 "(js/pallovektorit.js:171). Kaukana vakioleveä viiva sulaa läiskäksi (löydös 74 d). 0 = aina.")]
        public float rajatMinTiheys = (float)Vektorisolut.RajatTiheys;

        public event Action<string> MaaNapautettu;
        public bool Paalla { get; private set; }
        public bool Valmis => tunnukset != null;

        MaatAineisto aineisto;
        MaaOsuma osuma;
        readonly Dictionary<string, int> indeksi = new Dictionary<string, int>();
        readonly Dictionary<string, Savy> korostukset = new Dictionary<string, Savy>();
        Savy perus = new Savy(new Rgba(0, 0, 0, 0), new Rgba(0.23f, 0.18f, 0.13f, 0.8f));
        Texture2D tunnukset, paletti;
        MeshRenderer kuori, rajat;
        Material rajaOma;
        bool latausAlkanut;
        // Linssi piilottaa pelikerrokset (KarttaKerrokset "kaupungit" pois) → kerros pois (web lauta.js:5098).
        bool linssit;
        // Vektorirajojen peiton kerroin 0–1 (Viivaleveys.AluerajaHaive) ja viimeksi luettu tiheys (px/°).
        float rajaHaive;
        float rajaTiheys;

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
            if (kerrokset != null && piilotaKaupungit)
            {
                kerrokset.Nakyvyys("kaupungit", !paalla);
                kerrokset.Nakyvyys("nimiot", !paalla);
            }
            if (paalla && !latausAlkanut) StartCoroutine(Lataa());
            PaivitaNakyvyys();
        }

        /// <summary>
        /// Linssi piilotti pelikerrokset (KarttaKerrokset.Nakyvyys("kaupungit", false), LinssiOhjain.Pelikerrokset):
        /// maakuntakerros pois linssin ajaksi kuten webissä (js/pallolauta/lauta.js:5098
        /// maakunnat?.asetaMaa(linssiPaalla() ? null : korostusIso)). Löydös 74 d: ihmisen matkan avaruuspallossa
        /// valitun maakunnan rajat jäivät Euroopan päälle. Pelaajan valinta säilyy ja palaa linssin sulkeutuessa.
        /// Vain maakuntien kerros kuuntelee tätä; maatila (maat) on itse linssin työkalu.
        /// </summary>
        public void Linssit(bool paalla)
        {
            if (linssit == paalla) return;
            linssit = paalla;
            PaivitaNakyvyys();
        }

        bool NakyyNyt => Paalla && Valmis && !linssit;

        /// <summary>Kuori heti; vektorirajat häivytetään LateUpdatessa tiheyden mukaan (Viivaleveys.AluerajaHaive).</summary>
        void PaivitaNakyvyys()
        {
            if (kuori != null) kuori.enabled = NakyyNyt;
            if (rajat != null && !NakyyNyt) { rajaHaive = 0f; rajat.enabled = false; }
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
            if (!PalloKierto.Sade(kamera, ruutu, out Ray r)) return false;
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
            yield return Sisalto.HaeTeksti(kokoelma, t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning($"MATKAKIRJA maat: {kokoelma}.json puuttuu tästä paketista"); latausAlkanut = false; yield break; }
            float alku = Time.realtimeSinceStartup;
            bool rajattu = rajaus.z > rajaus.x && rajaus.w > rajaus.y;
            double lon0 = rajattu ? rajaus.x : -180, lat1 = rajattu ? rajaus.w : 90;
            double lonVali = rajattu ? rajaus.z - rajaus.x : 360, latVali = rajattu ? rajaus.w - rajaus.y : 180;
            int w = leveys, h = (int)math.round(leveys * latVali / lonVali);
            var r4 = rajaus;
            MaatAineisto aineistoT = null;
            byte[] kartta = null;
            List<Maa> jarjestys = null;
            bool vektorirajat = rajaMateriaali != null;
            List<(double3 a, double3 b)> janat = null;
            var tehtava = Task.Run(() =>
            {
                var juuri = Peli.MiniJson.Jasenna(teksti);
                aineistoT = MaatAineisto.LueRajat(juuri);
                jarjestys = new List<Maa>(aineistoT.Maat.Values);
                // Rajatussa kartassa vain rajauksen sisään osuvat alueet (FRA:n merentakaiset pois).
                if (rajattu) jarjestys.RemoveAll(m => m.E < r4.x || m.W > r4.z || m.N < r4.y || m.S > r4.w);
                jarjestys.Sort((x, y) => string.CompareOrdinal(x.Id, y.Id));
                if (jarjestys.Count > 255) jarjestys.RemoveRange(255, jarjestys.Count - 255);
                kartta = Rasteroi(jarjestys, w, h, lon0, lat1, lonVali, latVali, !rajattu);
                if (vektorirajat)
                {
                    // Skeema 1.25: "kaaret" (Siirtoseppä) = jokainen raja kerran, samat pisteet kuin renkaissa.
                    // Vanhemmissa paketeissa janat renkaista (naapurien harvennus eroaa → osin tuplana).
                    var kaaret = (juuri as Dictionary<string, object>)?.GetValueOrDefault("kaaret") as List<object>;
                    janat = kaaret != null ? JanatKaarista(kaaret, r4, rajattu) : Janat(jarjestys);
                }
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
                name = "Maatunnukset", filterMode = FilterMode.Point,
                wrapModeU = rajattu ? TextureWrapMode.Clamp : TextureWrapMode.Repeat,
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
            if (janat != null) TeeRajat(janat);
            Debug.Log($"MATKAKIRJA maat ({kokoelma}): {jarjestys.Count} aluetta, tunnuskartta {w}×{h}, " +
                      $"{janat?.Count ?? 0} rajajanaa, {(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
            PaivitaNakyvyys();
        }

        /// <summary>
        /// Parillisuussäännön juoviorasterointi: jokaiselle maalle kerätään reunojen
        /// leikkaukset riveittäin (pikselin keskikohta) ja täytetään parit. x kiertää
        /// leveyden yli (päivämääräraja, renkaat voivat jatkua yli ±180°).
        /// </summary>
        static byte[] Rasteroi(List<Maa> maat, int w, int h, double lon0, double lat1, double lonVali, double latVali, bool kierra)
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
                        double x0 = (p0.Lon - lon0) / lonVali * w, y0 = (lat1 - p0.Lat) / latVali * h;
                        double x1 = (p1.Lon - lon0) / lonVali * w, y1 = (lat1 - p1.Lat) / latVali * h;
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
                            int xx = kierra ? ((x % w) + w) % w : x;
                            if (xx < 0 || xx >= w) continue;
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
                bool korostettu = korostukset.TryGetValue(p.Key, out var k);
                var s = korostettu ? k : perus;
                px[p.Value] = C(s.Taytto);
                // Vektorirajojen kanssa varjostin piirtää vain korostetun alueen rajan.
                px[256 + p.Value] = rajat != null && !korostettu ? new Color32(0, 0, 0, 0) : C(s.Reuna);
            }
            AsetaRajanVari();
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
            kuori.sharedMaterial.renderQueue = materiaali.renderQueue + jonoLisa;
            kuori.sharedMaterial.SetTexture("_Tunnus", tunnukset);
            kuori.sharedMaterial.SetTexture("_Paletti", paletti);
            // Raja 1 laitepikseli kuten webin polygonStrokeColor (ei Pistekerrointa).
            kuori.sharedMaterial.SetFloat("_ReunaLeveys", 0.5f);
            bool rj = rajaus.z > rajaus.x && rajaus.w > rajaus.y;
            kuori.sharedMaterial.SetVector("_Alue", rj ? new Vector4(rajaus.x, rajaus.w, rajaus.z - rajaus.x, rajaus.w - rajaus.y)
                                                       : new Vector4(-180, 90, 360, 180));
            kuori.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            kuori.receiveShadows = false;
            kuori.enabled = false;
        }

        /// <summary>
        /// Rajajanat renkaista ECEF-pisteinä (taustasäikeessä). Naapurien yhteinen raja on
        /// aineistossa kahdesti: sama jana (1e-5° pyöristys, suunnasta riippumatta) piirretään kerran.
        /// </summary>
        List<(double3 a, double3 b)> Janat(List<Maa> maat)
        {
            var nahty = new HashSet<(long, long, long, long)>();
            var ulos = new List<(double3, double3)>();
            (long, long) Q((double Lon, double Lat) p) => ((long)math.round(p.Lon * 1e5), (long)math.round(p.Lat * 1e5));
            double3 E((double Lon, double Lat) p) => CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            foreach (var m in maat)
                foreach (var rengas in m.Renkaat)
                    for (int i = 0; i < rengas.Length; i++)
                    {
                        var a = rengas[i];
                        var b = rengas[(i + 1) % rengas.Length];
                        var qa = Q(a); var qb = Q(b);
                        if (qa == qb) continue;
                        var avain = qa.CompareTo(qb) < 0 ? (qa.Item1, qa.Item2, qb.Item1, qb.Item2) : (qb.Item1, qb.Item2, qa.Item1, qa.Item2);
                        if (!nahty.Add(avain)) continue;
                        ulos.Add((E(a), E(b)));
                    }
            return ulos;
        }

        /// <summary>Janat kaarista ([[lon, lat], …] kukin), rajauksen ulkopuoliset pois.</summary>
        List<(double3 a, double3 b)> JanatKaarista(List<object> kaaret, Vector4 r4, bool rajattu)
        {
            var ulos = new List<(double3, double3)>();
            double3 E(double lon, double lat) => CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
            foreach (var k in kaaret)
            {
                if (!(k is List<object> pisteet) || pisteet.Count < 2) continue;
                double3? edellinen = null;
                foreach (var p in pisteet)
                {
                    if (!(p is List<object> l) || l.Count < 2 || !(l[0] is double lon) || !(l[1] is double lat)) { edellinen = null; continue; }
                    bool sisalla = !rajattu || (lon >= r4.x && lon <= r4.z && lat >= r4.y && lat <= r4.w);
                    var e = E(lon, lat);
                    if (edellinen.HasValue && sisalla) ulos.Add((edellinen.Value, e));
                    edellinen = sisalla ? e : (double3?)null;
                }
            }
            return ulos;
        }

        /// <summary>Janoista nauhaverkko Rajaviiva-varjostimelle: jokainen jana on oma nelikulmionsa.</summary>
        void TeeRajat(List<(double3 a, double3 b)> janat)
        {
            if (rajat != null || janat.Count == 0) return;
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
                int v = i * 4;
                paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                puolet[v] = new Vector2(-1, 0); puolet[v + 1] = new Vector2(1, 0);
                puolet[v + 2] = new Vector2(-1, 0); puolet[v + 3] = new Vector2(1, 0);
                int t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 1; kolmiot[t + 2] = v + 2;
                kolmiot[t + 3] = v + 1; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var mesh = new Mesh { name = "Aluerajat", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.vertices = paikat;
            mesh.SetUVs(0, toiset);
            mesh.SetUVs(1, puolet);
            mesh.triangles = kolmiot;
            mesh.RecalculateBounds();
            var go = new GameObject("Aluerajat");
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            rajat = go.AddComponent<MeshRenderer>();
            rajaOma = new Material(rajaMateriaali);
            rajaOma.renderQueue = rajaMateriaali.renderQueue + jonoLisa;
            float kerroin = PalloKierto.Pistekerroin;
            rajaOma.SetFloat("_Kerroin", kerroin);
            rajat.sharedMaterial = rajaOma;
            rajat.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            rajat.receiveShadows = false;
            rajat.enabled = false;
            PaivitaPaletti();
        }

        /// <summary>Perussävyn reuna × häive (kaukana 0, lähellä 1).</summary>
        void AsetaRajanVari()
        {
            if (rajaOma == null) return;
            rajaOma.SetColor("_BaseColor", new Color(perus.Reuna.R, perus.Reuna.G, perus.Reuna.B, perus.Reuna.A * rajaHaive));
        }

        /// <summary>Ruudun tiheys (px/°) viimeksi, kun vektorirajat olivat mahdollisia (tila-komennot, mittarit).</summary>
        public float RajaTiheys => rajaTiheys;
        /// <summary>Vektorirajojen peiton kerroin 0–1 (0 = piilossa: kaukana, linssissä tai tila pois).</summary>
        public float RajaHaive => rajaHaive;

        void LateUpdate()
        {
            if (rajaOma == null || rajat == null || georeferenssi == null) return;
            bool sallittu = NakyyNyt;
            if (!sallittu && rajaHaive <= 0f && !rajat.enabled) return;
            // Löydös 74 d: vakioleveä viiva (Rajaviiva _Paksuus pisteinä) sulaa kaukana läiskäksi, joten rajat vasta
            // webin rajojen tiheydestä (Viivaleveys.AluerajaHaive). Kaksi sädettä kehyksessä (Pintaosuma.Tiheys).
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            rajaTiheys = sallittu ? Pintaosuma.Tiheys(georeferenssi, kamera) : 0f;
            float uusi = Viivaleveys.AluerajaHaive(rajaHaive, sallittu, rajaTiheys, rajatMinTiheys, Time.unscaledDeltaTime);
            if (uusi != rajaHaive) { rajaHaive = uusi; AsetaRajanVari(); }
            rajat.enabled = rajaHaive > 0f;
            if (!rajat.enabled) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            rajaOma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
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
