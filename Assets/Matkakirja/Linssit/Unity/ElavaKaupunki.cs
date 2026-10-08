// ELÄVÄ KAUPUNKI, UNITY-OSA (Linssiseppä 8.10.2026; omistaja 20.4x, suunnitelma docs/raportit/pallo-elava-kaupunki-20261008.md B1 + B2):
// kaupunkinäkymän avautuessa (CesiumKaupunki.Avattu) Resources/Elava/elava-<kohde>.json, jos kaupunki on paketin säteellä: lautat,
// työmatkaveneet, saaristolaivat, höyrylaivat ja pikkuveneet kulkevat OSM-reittejä (Ydin VesiLiikenne + ReittiLiike) ja lokit
// kiertävät vesillä (Ydin Parvi). Mallit Ydin VeneMalleista (oma proseduraalinen geometria), varjostimet ElavaKohde ja ElavaVana.
// Paikka: CesiumGlobeAnchor paketin origoon (paikalliset akselit itä, ylös, pohjoinen), korkeus paketista = oma vesipinta (Map Tiles
// C4: ei korkeuksia Googlen laatoista) + VesiNostoM (Linssiseppä 2:n oma vesipinta nostaa veden; liitetään, kun molemmat ovat mainissa).
// KEHITYSKAUPUNGIT (omistaja 20.4x, PT 21.58): elävä kaupunki vain Kehityskaupungit-listan kaupungeissa (Tukholma, Pariisi).
// MUUT PALLOT (B3, kehityskaupungeissa, myös ilman vesipakettia): Ydin MuutPallot 2/4/6 palloa 300–800 m:n korkeudella
// georeferenssin maan korkeudesta, ajelehtivat tuulen mukana PallotSadeM:n alueella; piilossa alle PalloLahinM:n päässä kamerasta.
// Näkyvyys: veneet NakyvaM ja parvet ParviNakyvaM kameran ympäriltä. Määrä muistin mukaan (15 / 40 / 100). Krediitti: Krediitti
// (© OpenStreetMap contributors, ODbL) Lähteet-näkymään. Kytkin: asetukset.json "elava.Paalla" (oletus 1), komento `opas elava 0|1`.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Elava;
using Matkakirja.Linssit.Kierros;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class ElavaKaupunki : MonoBehaviour
    {
        /// <summary>Komennon pakotus (null = asetus elava.Paalla, oletus päällä).</summary>
        public static bool? Pakko;
        public static bool Paalla => Pakko ?? Matkakirja.Peli.Asetus.Luku("elava.Paalla", 1) != 0;
        /// <summary>Veden nosto oman vesipinnan päällä (m), kun Linssiseppä 2:n vesi on käytössä; 0 = Googlen vesi.</summary>
        public static float VesiNostoM;
        /// <summary>Näkyvillä olevan paketin krediitti (null = ei elävää kaupunkia).</summary>
        public static string Krediitti { get; private set; }
        public static ElavaKaupunki Nykyinen { get; private set; }
        public const float NakyvaM = 6000f, ParviNakyvaM = 1500f, PallotSadeM = 3500f, PalloLahinM = 400f;   // PT 22.35: muut pallot vähintään 400 m:n päässä kamerasta
        /// <summary>Paketit (id, origo): lisätään, kun tyokalut/elava_kaupunki.py on ajettu kaupungille.</summary>
        static readonly (string Id, double Lat, double Lon, double SadeM)[] Paketit = { ("tukholma", 59.3299, 18.07382, 15000) };

        static Material kohdeMat, vanaMat;
        static readonly Dictionary<int, Mesh> veneVerkot = new Dictionary<int, Mesh>(), vanaVerkot = new Dictionary<int, Mesh>();
        static Mesh lokki, siipiO, siipiV;
        static readonly Dictionary<int, Mesh> palloVerkot = new Dictionary<int, Mesh>();
        MuutPallot pallot; Transform[] palloT; float maaM;

        VesiLiikenne liikenne;
        sealed class VeneOlio { public Transform T; public ReittiLiike.Kulkija K; public float Vaihe; }
        readonly List<VeneOlio> veneet = new List<VeneOlio>();
        sealed class ParviOlio { public Parvi P; public VesiLiikenne.ParviPaikka Paikka; public GameObject Juuri; public Transform[] Lokit, Vasen, Oikea; }
        readonly List<ParviOlio> parvet = new List<ParviOlio>();
        Camera kamera;
        int kerros;
        CesiumKaupunki kaupunki;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            CesiumKaupunki.Avattu -= Avaa; CesiumKaupunki.Avattu += Avaa;
            CesiumKaupunki.Suljettu -= Sulje; CesiumKaupunki.Suljettu += Sulje;
        }

        static void Sulje(CesiumKaupunki _)
        {
            if (Nykyinen != null) Destroy(Nykyinen.gameObject);
            Nykyinen = null; Krediitti = null;
        }

        static void Avaa(CesiumKaupunki k)
        {
            Sulje(k);
            var gr = k?.Georef;
            if (!Paalla || gr == null || Kehityskaupungit.Lahella(gr.latitude, gr.longitude) == null) return;
            string id = null;
            foreach (var p in Paketit)
                if (Etaisyys(p.Lat, p.Lon, gr.latitude, gr.longitude) < p.SadeM) { id = p.Id; break; }
            int taso = SystemInfo.systemMemorySize >= 7000 ? 2 : SystemInfo.systemMemorySize >= 5000 ? 1 : 0;
            int raja = new[] { 15, 40, 100 }[taso];
            VesiLiikenne l = null;
            var ta = id != null ? Resources.Load<TextAsset>("Elava/elava-" + id) : null;
            if (id != null && ta == null) Debug.Log($"MATKAKIRJA kaupunki: elävä {id}: paketti puuttuu");
            if (ta != null)
            {
                try { l = VesiLiikenne.Lue(ta.text, raja, 20261008); }
                catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: elävä {id}: paketti virheellinen ({e.Message})"); }
                finally { Resources.UnloadAsset(ta); }
            }
            double lat = l != null ? l.Lat : gr.latitude, lon = l != null ? l.Lon : gr.longitude;
            var go = new GameObject("Elävä kaupunki " + (id ?? "")) { layer = CesiumKaupunki.Kerros };
            go.transform.SetParent(gr.transform, false);
            var ankkuri = go.AddComponent<CesiumGlobeAnchor>();
            ankkuri.adjustOrientationForGlobeWhenMoving = true;
            ankkuri.longitudeLatitudeHeight = new double3(lon, lat, 0);
            ankkuri.rotationEastUpNorth = quaternion.identity;
            var e2 = go.AddComponent<ElavaKaupunki>();
            e2.liikenne = l; e2.kerros = CesiumKaupunki.Kerros; e2.kaupunki = k;
            // Muiden pallojen korkeus georeferenssin origon korkeudesta (kohteen maa, ei luettu Googlen laatoista tässä).
            e2.maaM = (float)gr.height;
            int siemen = Mathf.Abs((int)(lat * 1000) * 31 + (int)(lon * 1000));
            e2.pallot = new MuutPallot(new[] { 2, 4, 6 }[taso], PallotSadeM, siemen % 360, 3.0, siemen);
            e2.Rakenna();
            Nykyinen = e2; Krediitti = l?.Krediitti;
            Debug.Log($"MATKAKIRJA kaupunki: elävä {id ?? "-"}: {l?.Liike.Kulkijat.Count ?? 0} venettä {l?.Reitteja ?? 0} reitillä (raja {raja}), {l?.Parvet.Count ?? 0} lokkiparvea, {e2.pallot.Maara} muuta palloa");
        }

        static Mesh Verkko(VeneVerkko v, string nimi)
        {
            int n = v.Karkia;
            var p = new Vector3[n]; var no = new Vector3[n]; var c = new Color32[n];
            for (int i = 0; i < n; i++)
            {
                p[i] = new Vector3(v.Paikat[i * 3], v.Paikat[i * 3 + 1], v.Paikat[i * 3 + 2]);
                no[i] = new Vector3(v.Normaalit[i * 3], v.Normaalit[i * 3 + 1], v.Normaalit[i * 3 + 2]);
                c[i] = new Color32(v.Varit[i * 4], v.Varit[i * 4 + 1], v.Varit[i * 4 + 2], v.Varit[i * 4 + 3]);
            }
            var m = new Mesh { name = nimi };
            m.SetVertices(p); m.SetNormals(no); m.SetColors(c); m.SetTriangles(v.Kolmiot, 0); m.RecalculateBounds(); m.UploadMeshData(true);
            return m;
        }

        static void Materiaalit()
        {
            if (kohdeMat != null) return;
            var a = Shader.Find("Matkakirja/Linssit/ElavaKohde"); var b = Shader.Find("Matkakirja/Linssit/ElavaVana");
            kohdeMat = new Material(a != null ? a : Shader.Find("Universal Render Pipeline/Unlit")) { name = "Elävä kohde", enableInstancing = true };
            vanaMat = b != null ? new Material(b) { name = "Elävä vana" } : null;
            lokki = Verkko(VeneMallit.LokinVartalo(), "Lokki"); siipiO = Verkko(VeneMallit.LokinSiipi(1), "Lokin siipi O"); siipiV = Verkko(VeneMallit.LokinSiipi(-1), "Lokin siipi V");
        }

        GameObject Olio(string nimi, Transform v, Mesh m, Material mat)
        {
            var g = new GameObject(nimi) { layer = kerros };
            g.transform.SetParent(v, false);
            g.AddComponent<MeshFilter>().sharedMesh = m;
            var r = g.AddComponent<MeshRenderer>(); r.sharedMaterial = mat;
            r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false; r.lightProbeUsage = LightProbeUsage.Off; r.reflectionProbeUsage = ReflectionProbeUsage.Off;
            return g;
        }

        void Rakenna()
        {
            Materiaalit();
            palloT = new Transform[pallot.Maara];
            for (int j = 0; j < pallot.Maara; j++)
            {
                int pv = pallot.Paletti[j];
                if (!palloVerkot.TryGetValue(pv, out var pm)) palloVerkot[pv] = pm = Verkko(VeneMallit.Pallo(pv), "Muu pallo " + pv);
                palloT[j] = Olio("muu pallo", transform, pm, kohdeMat).transform;
            }
            if (liikenne == null) return;
            int i = 0;
            foreach (var k in liikenne.Liike.Kulkijat)
            {
                int t = liikenne.Tyyppi(k);
                if (!veneVerkot.TryGetValue(t, out var m))
                {
                    var vv = VeneMallit.Luo(VeneMallit.Tyypit[t]);
                    veneVerkot[t] = m = Verkko(vv, "Vene " + VeneMallit.Tyypit[t]);
                    vanaVerkot[t] = Verkko(VeneMallit.Vana(vv.Pituus, vv.Leveys), "Vana " + VeneMallit.Tyypit[t]);
                }
                var g = Olio("vene " + VeneMallit.Tyypit[t], transform, m, kohdeMat);
                if (vanaMat != null) Olio("vana", g.transform, vanaVerkot[t], vanaMat).transform.localPosition = new Vector3(0, 0.12f, 0);
                veneet.Add(new VeneOlio { T = g.transform, K = k, Vaihe = (i++ * 2.399f) % 6.283f });
            }
            int s = 1;
            foreach (var pp in liikenne.Parvet)
            {
                var po = new ParviOlio { Paikka = pp, P = new Parvi(pp.Maara, pp.X, pp.Z, pp.Alue, 18 + 6 * (s % 3), 35 + 10 * (s % 2), 7 * s++) };
                po.Juuri = new GameObject("lokit " + pp.Nimi) { layer = kerros };
                po.Juuri.transform.SetParent(transform, false);
                po.Lokit = new Transform[pp.Maara]; po.Vasen = new Transform[pp.Maara]; po.Oikea = new Transform[pp.Maara];
                for (int j = 0; j < pp.Maara; j++)
                {
                    var g = Olio("lokki", po.Juuri.transform, lokki, kohdeMat);
                    g.transform.localScale = Vector3.one * 1.6f;   // pallon etäisyydeltä erottuva (~1 m siipien kärkiväli × 1,6)
                    po.Lokit[j] = g.transform;
                    po.Vasen[j] = Olio("siipi", g.transform, siipiV, kohdeMat).transform;
                    po.Oikea[j] = Olio("siipi", g.transform, siipiO, kohdeMat).transform;
                }
                po.Juuri.SetActive(false);
                parvet.Add(po);
            }
        }

        static readonly int IdAurinko = Shader.PropertyToID("_ElavaAurinko"), IdAurinkoVari = Shader.PropertyToID("_ElavaAurinkoVari"),
            IdYla = Shader.PropertyToID("_ElavaTaivasYla"), IdAla = Shader.PropertyToID("_ElavaTaivasAla");

        void AsetaValo()
        {
            double[] C(Color c) => new double[] { c.r, c.g, c.b };
            var k = KoriValaistus.Laske(KaupunkiKuva.KoriAurinkoKorkeus, KaupunkiKuva.KoriAtsimuutti, C(KaupunkiKuva.KoriLaki), C(KaupunkiKuva.KoriHorisontti), KaupunkiKuva.Saa.Harmaus);
            var s = transform.TransformDirection(new Vector3((float)k.AurinkoX, (float)k.AurinkoY, (float)k.AurinkoZ)).normalized;
            Shader.SetGlobalVector(IdAurinko, s);
            Shader.SetGlobalVector(IdAurinkoVari, new Vector4((float)k.AurinkoVari[0], (float)k.AurinkoVari[1], (float)k.AurinkoVari[2], 0));
            Shader.SetGlobalVector(IdYla, new Vector4((float)k.TaivasYla[0], (float)k.TaivasYla[1], (float)k.TaivasYla[2], 0));
            Shader.SetGlobalVector(IdAla, new Vector4((float)k.TaivasAla[0], (float)k.TaivasAla[1], (float)k.TaivasAla[2], 0));
        }

        void LateUpdate()
        {
            if (kamera == null || !kamera.isActiveAndEnabled) kamera = Camera.main;
            float dt = Time.deltaTime, t = Time.time;
            AsetaValo();
            Vector3 c = kamera != null ? transform.InverseTransformPoint(kamera.transform.position) : Vector3.zero;
            if (pallot != null)
            {
                pallot.Paivita(dt);
                for (int j = 0; j < pallot.Maara; j++)
                {
                    var p = new Vector3((float)pallot.X[j], maaM + (float)pallot.Y[j], (float)pallot.Z[j]);   // maaM = georef-origon korkeus (oma korkeusmalli)
                    bool nakyy = (p - c).sqrMagnitude > PalloLahinM * PalloLahinM;
                    if (palloT[j].gameObject.activeSelf != nakyy) palloT[j].gameObject.SetActive(nakyy);
                    // Kori heilahtaa hieman (köysien varassa), kuori kiertyy hitaasti.
                    palloT[j].localPosition = p;
                    palloT[j].localRotation = Quaternion.Euler(0.8f * Mathf.Sin(t * 0.5f + j), (float)pallot.Kierto[j], 0.8f * Mathf.Sin(t * 0.4f + 2 * j));
                }
            }
            if (liikenne == null) return;
            liikenne.Liike.Paivita(dt);
            // Linssiseppä 2:n oma vesipinta (sama origo kuin paketilla) nostaa veden NostoM:llä; muuten Googlen vesi.
            float nosto = kaupunki != null && kaupunki.Vesi?.Juuri != null ? KaupunkiVesi.NostoM : VesiNostoM;
            foreach (var v in veneet)
            {
                var k = v.K;
                float dx = (float)k.X - c.x, dz = (float)k.Z - c.z;
                bool nakyy = dx * dx + dz * dz < NakyvaM * NakyvaM;
                if (v.T.gameObject.activeSelf != nakyy) v.T.gameObject.SetActive(nakyy);
                if (!nakyy) continue;
                // Keinunta: pieni nyökkäys ja kallistus (aallokko), vauhdissa keula hieman koholla.
                float liikkuu = k.Tauko > 0 ? 0f : 1f;
                float nyokkays = 0.6f * Mathf.Sin(t * 0.9f + v.Vaihe) - 0.5f * liikkuu, kallistus = 0.9f * Mathf.Sin(t * 0.7f + v.Vaihe * 1.7f);
                v.T.localPosition = new Vector3((float)k.X, (float)k.Y + nosto + 0.05f * Mathf.Sin(t * 1.1f + v.Vaihe), (float)k.Z);
                v.T.localRotation = Quaternion.Euler(nyokkays, (float)k.Suuntima, kallistus);
                if (v.T.childCount > 0) { var vana = v.T.GetChild(0).gameObject; if (vana.activeSelf != (liikkuu > 0)) vana.SetActive(liikkuu > 0); }
            }
            foreach (var p in parvet)
            {
                float dx = (float)p.Paikka.X - c.x, dz = (float)p.Paikka.Z - c.z;
                bool nakyy = dx * dx + dz * dz < (ParviNakyvaM + (float)p.Paikka.Alue) * (ParviNakyvaM + (float)p.Paikka.Alue);
                if (p.Juuri.activeSelf != nakyy) p.Juuri.SetActive(nakyy);
                if (!nakyy) continue;
                p.P.Paivita(dt);
                for (int j = 0; j < p.Lokit.Length; j++)
                {
                    p.Lokit[j].localPosition = new Vector3((float)p.P.X[j], (float)(p.Paikka.Vesi + p.P.Y[j]) + nosto, (float)p.P.Z[j]);
                    p.Lokit[j].localRotation = Quaternion.Euler(0, (float)p.P.Suuntima[j], 0);
                    // Liito (Siipi 0,25) loivassa V:ssä 6°, lyönnit −20…+32°.
                    float siipi = 6f + 26f * Mathf.Sin(2f * Mathf.PI * ((float)p.P.Siipi[j] - 0.25f));
                    p.Vasen[j].localRotation = Quaternion.Euler(0, 0, -siipi);
                    p.Oikea[j].localRotation = Quaternion.Euler(0, 0, siipi);
                }
            }
        }

        void OnDestroy() { if (Nykyinen == this) { Nykyinen = null; Krediitti = null; } }

        static double Etaisyys(double la1, double lo1, double la2, double lo2)
        {
            const double R = 6371000, A = System.Math.PI / 180;
            double x = (lo2 - lo1) * A * System.Math.Cos((la1 + la2) * 0.5 * A), y = (la2 - la1) * A;
            return R * System.Math.Sqrt(x * x + y * y);
        }
    }
}
