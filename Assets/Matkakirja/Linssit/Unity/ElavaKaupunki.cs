// ELÄVÄ KAUPUNKI, UNITY-OSA (Linssiseppä 8.10.2026; omistaja 20.4x, suunnitelma docs/raportit/pallo-elava-kaupunki-20261008.md B1 + B2):
// kaupunkinäkymän avautuessa (CesiumKaupunki.Avattu) Resources/Elava/elava-<kohde>.json, jos kaupunki on paketin säteellä: lautat,
// työmatkaveneet, saaristolaivat, höyrylaivat ja pikkuveneet kulkevat OSM-reittejä (Ydin VesiLiikenne + ReittiLiike) ja lokit
// kiertävät vesillä (Ydin Parvi). Mallit Ydin VeneMalleista (oma proseduraalinen geometria), varjostimet ElavaKohde ja ElavaVana.
// Paikka: CesiumGlobeAnchor paketin origoon (paikalliset akselit itä, ylös, pohjoinen), korkeus paketista = oma vesipinta (Map Tiles
// C4: ei korkeuksia Googlen laatoista) + VesiNostoM (Linssiseppä 2:n oma vesipinta nostaa veden; liitetään, kun molemmat ovat mainissa).
// KEHITYSKAUPUNGIT (omistaja 20.4x, PT 21.58): elävä kaupunki vain Kehityskaupungit-listan kaupungeissa (Tukholma, Pariisi).
// MUUT PALLOT (B3, kehityskaupungeissa, myös ilman vesipakettia): Ydin MuutPallot 2/4/6 palloa 300–800 m:n korkeudella
// georeferenssin maan korkeudesta, ajelehtivat tuulen mukana PallotSadeM:n alueella; piilossa alle PalloLahinM:n päässä kamerasta.
// KATULIIKENNE (B4, 9.10.): autot pääkaduilla ja raitiovaunut (Ydin KatuLiikenne), kun oma korkeusmalli on muistissa
// (OpasSovitin.OmaMaa; maa kolmen pisteen pienimmästä, ettei katupuu nosta autoa); oikea kaista kaksisuuntaisilla, päissä piilossa.
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
        public const float NakyvaM = 6000f, ParviNakyvaM = 1500f, PallotSadeM = 3500f, PalloLahinM = 400f, AutoNakyvaM = 2500f, RaitioNakyvaM = 4000f, KaistaM = 1.8f;   // PT 22.35: muut pallot vähintään 400 m:n päässä kamerasta
        /// <summary>Paketit (id, origo): lisätään, kun tyokalut/elava_kaupunki.py on ajettu kaupungille.</summary>
        static readonly (string Id, double Lat, double Lon, double SadeM)[] Paketit = { ("tukholma", 59.3299, 18.07382, 15000), ("pariisi", 48.86122, 2.35092, 15000) };

        static Material kohdeMat, vanaMat;
        static readonly Dictionary<int, Mesh> veneVerkot = new Dictionary<int, Mesh>(), vanaVerkot = new Dictionary<int, Mesh>();
        static Mesh lokki, siipiO, siipiV, kyyhky, kSiipiO, kSiipiV;
        static readonly Dictionary<int, Mesh> palloVerkot = new Dictionary<int, Mesh>();
        MuutPallot pallot; Transform[] palloT; float maaM;
        string katuJson; KatuLiikenne katu; int autoRaja; float katuYritys = -9f; double lat0, lon0;
        static readonly Dictionary<int, Mesh> autoVerkot = new Dictionary<int, Mesh>(); static Mesh raitioVerkko;
        readonly List<Transform> autoT = new List<Transform>(), raitioT = new List<Transform>();

        VesiLiikenne liikenne;
        sealed class VeneOlio { public Transform T; public ReittiLiike.Kulkija K; public float Vaihe, Pituus; }
        readonly List<VeneOlio> veneet = new List<VeneOlio>();
        sealed class ParviOlio { public Parvi P; public VesiLiikenne.ParviPaikka Paikka; public GameObject Juuri; public Transform[] Lokit, Vasen, Oikea; public double Pinta = double.NaN; public float Haettu = -9f; }
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
            string kj = null;
            if (ta != null)
            {
                kj = ta.text;
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
            e2.katuJson = kj != null && kj.Contains("\"kadut\"") ? kj : null; e2.autoRaja = new[] { 80, 200, 500 }[taso]; e2.lat0 = lat; e2.lon0 = lon;
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
            kyyhky = Verkko(VeneMallit.KyyhkynVartalo(), "Kyyhky"); kSiipiO = Verkko(VeneMallit.LokinSiipi(1, true), "Kyyhkyn siipi O"); kSiipiV = Verkko(VeneMallit.LokinSiipi(-1, true), "Kyyhkyn siipi V");
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
                    // LS2 9.10. (omistaja TF 168, juna 170): tarkemmat mallit Tukholman tyypeille (TarkatVeneet), muut VeneMalleista.
                    string nimi = VeneMallit.Tyypit[t];
                    var vv = TarkatVeneet.Tukee(nimi) ? TarkatVeneet.Luo(nimi) : VeneMallit.Luo(nimi);
                    veneVerkot[t] = m = Verkko(vv, "Vene " + VeneMallit.Tyypit[t]);
                    vanaVerkot[t] = Verkko(VeneMallit.Vana(vv.Pituus, vv.Leveys), "Vana " + VeneMallit.Tyypit[t]);
                }
                var g = Olio("vene " + VeneMallit.Tyypit[t], transform, m, kohdeMat);
                if (vanaMat != null) Olio("vana", g.transform, vanaVerkot[t], vanaMat).transform.localPosition = new Vector3(0, 0.12f, 0);
                // LS2: savu piipusta (VeneSavu; lapsi vanan jälkeen, GetChild(0) pysyy vanana).
                var piippuP = TarkatVeneet.Piippu(VeneMallit.Tyypit[t]);
                if (piippuP != null)
                {
                    var piippu = new GameObject("piippu").transform; piippu.SetParent(g.transform, false);
                    piippu.localPosition = new Vector3(piippuP[0], piippuP[1], piippuP[2]);
                    VeneSavu.Liita(piippu, VeneMallit.Tyypit[t]);
                }
                VeneAanet.Liita(this, g, VeneMallit.Tyypit[t]);   // LS2: laivan ääni (Pelikoodarin elava-kaupunki-v1)
                veneet.Add(new VeneOlio { T = g.transform, K = k, Vaihe = (i++ * 2.399f) % 6.283f, Pituus = m.bounds.size.z });
            }
            int s = 1;
            foreach (var pp in liikenne.Parvet)
            {
                // Lokit vesien yllä 18–30 m:ssä; kyyhkyt aukioilla 6–12 m:ssä tiukemmissa kaarissa (maa omasta korkeusmallista, B2).
                var po = new ParviOlio { Paikka = pp, P = pp.Kyyhky ? new Parvi(pp.Maara, pp.X, pp.Z, pp.Alue, 6 + 3 * (s % 3), 12 + 4 * (s % 2), 7 * s++)
                    : new Parvi(pp.Maara, pp.X, pp.Z, pp.Alue, 18 + 6 * (s % 3), 35 + 10 * (s % 2), 7 * s++), Pinta = pp.Kyyhky ? double.NaN : pp.Vesi };
                po.Juuri = new GameObject("lokit " + pp.Nimi) { layer = kerros };
                po.Juuri.transform.SetParent(transform, false);
                po.Lokit = new Transform[pp.Maara]; po.Vasen = new Transform[pp.Maara]; po.Oikea = new Transform[pp.Maara];
                for (int j = 0; j < pp.Maara; j++)
                {
                    var g = Olio(pp.Kyyhky ? "kyyhky" : "lokki", po.Juuri.transform, pp.Kyyhky ? kyyhky : lokki, kohdeMat);
                    g.transform.localScale = Vector3.one * 1.6f;   // pallon etäisyydeltä erottuva (~1 m siipien kärkiväli × 1,6)
                    po.Lokit[j] = g.transform;
                    po.Vasen[j] = Olio("siipi", g.transform, pp.Kyyhky ? kSiipiV : siipiV, kohdeMat).transform;
                    po.Oikea[j] = Olio("siipi", g.transform, pp.Kyyhky ? kSiipiO : siipiO, kohdeMat).transform;
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

        /// <summary>Maan korkeus paikallisessa ENU:ssa omasta korkeusmallista (NaN = ei muistissa): pienin kolmesta pisteestä.</summary>
        double Maa(double x, double z)
        {
            double cl = System.Math.Cos(lat0 * System.Math.PI / 180), h = double.NaN;
            foreach (var (dx, dz) in new[] { (0.0, 0.0), (4.0, 0.0), (0.0, 4.0) })
            {
                double hh = OpasSovitin.OmaMaa(lat0 + (z + dz) / 111132.0, lon0 + (x + dx) / (111320.0 * cl));
                if (!double.IsNaN(hh)) h = double.IsNaN(h) ? hh : System.Math.Min(h, hh);
            }
            return double.IsNaN(h) ? h : h - (x * x + z * z) / (2 * 6371000.0);
        }

        void RakennaKatu()
        {
            if (katuJson == null || katu != null || Time.unscaledTime - katuYritys < 2f) return;
            katuYritys = Time.unscaledTime;
            if (double.IsNaN(OpasSovitin.OmaMaa(lat0, lon0))) return;   // korkeusmalli ei vielä muistissa
            try { katu = KatuLiikenne.Lue(katuJson, Maa, autoRaja, 20261009); }
            catch (System.Exception e) { Debug.Log("MATKAKIRJA kaupunki: katuliikenne virhe " + e.Message); katuJson = null; return; }
            katuJson = null;
            int i = 0;
            foreach (var k in katu.Autot.Kulkijat)
            {
                int v = (i++ * 7 + 3) % VeneMallit.AutoVarit.Length;
                if (!autoVerkot.TryGetValue(v, out var m)) autoVerkot[v] = m = Verkko(VeneMallit.Auto(v), "Auto " + v);
                autoT.Add(Olio("auto", transform, m, kohdeMat).transform);
            }
            raitioVerkko ??= Verkko(VeneMallit.Raitiovaunu(), "Raitiovaunu");
            foreach (var k in katu.Raitiot.Kulkijat) raitioT.Add(Olio("raitiovaunu", transform, raitioVerkko, kohdeMat).transform);
            Debug.Log($"MATKAKIRJA kaupunki: katuliikenne {katu.Autot.Kulkijat.Count} autoa {katu.Autot.Reitit.Count} kadulla, {katu.Raitiot.Kulkijat.Count} raitiovaunua");
        }

        void PaivitaKatu(ReittiLiike l, List<Transform> tt, Vector3 c, float nakyva, bool kaistat)
        {
            for (int i = 0; i < tt.Count && i < l.Kulkijat.Count; i++)
            {
                var k = l.Kulkijat[i];
                float dx = (float)k.X - c.x, dz = (float)k.Z - c.z;
                bool nakyy = dx * dx + dz * dz < nakyva * nakyva && !KatuLiikenne.Piilossa(l, k);
                if (tt[i].gameObject.activeSelf != nakyy) tt[i].gameObject.SetActive(nakyy);
                if (!nakyy) continue;
                float h = (float)k.Suuntima * Mathf.Deg2Rad;
                float siirto = kaistat && !l.Reitit[k.Reitti].Yksisuunta ? KaistaM : 0f;   // oikea kaista
                tt[i].localPosition = new Vector3((float)k.X + Mathf.Cos(h) * siirto, (float)k.Y, (float)k.Z - Mathf.Sin(h) * siirto);
                tt[i].localRotation = Quaternion.Euler(0, (float)k.Suuntima, 0);
            }
        }

        void LateUpdate()
        {
            if (kamera == null || !kamera.isActiveAndEnabled) kamera = Camera.main;
            float dt = Time.deltaTime, t = Time.time;
            AsetaValo();
            VeneAanet.Paivita();
            Vector3 c = kamera != null ? transform.InverseTransformPoint(kamera.transform.position) : Vector3.zero;
            RakennaKatu();
            if (katu != null)
            {
                katu.Autot.Paivita(dt); katu.Raitiot.Paivita(dt);
                PaivitaKatu(katu.Autot, autoT, c, AutoNakyvaM, true);
                PaivitaKatu(katu.Raitiot, raitioT, c, RaitioNakyvaM, false);
            }
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
                // LS2: vana omalla vesipinnalla (KaupunkiVesi.Vana); oma vanaverkko vain, kun omaa vettä ei ole.
                bool omaVesi = KaupunkiVesi.Nakyvissa;
                if (v.T.childCount > 0) { var vana = v.T.GetChild(0).gameObject; bool nk = liikkuu > 0 && !omaVesi; if (vana.activeSelf != nk) vana.SetActive(nk); }
                if (omaVesi && liikkuu > 0) { var f = v.T.forward; KaupunkiVesi.Vana(veneet.IndexOf(v), v.T.position, new Vector2(f.x, f.z).normalized, (float)k.Nopeus, v.Pituus); }
            }
            foreach (var p in parvet)
            {
                float dx = (float)p.Paikka.X - c.x, dz = (float)p.Paikka.Z - c.z;
                bool nakyy = dx * dx + dz * dz < (ParviNakyvaM + (float)p.Paikka.Alue) * (ParviNakyvaM + (float)p.Paikka.Alue);
                // Kyyhkyt: aukion maa omasta korkeusmallista (OpasSovitin.OmaMaa, ellipsoidi → paikallinen ENU: kaarevuuden lasku
                // d²/2R); kunnes malli on muistissa, parvi on piilossa (haku kerran sekunnissa).
                if (p.Paikka.Kyyhky && double.IsNaN(p.Pinta) && nakyy && Time.unscaledTime - p.Haettu > 1f)
                {
                    p.Haettu = Time.unscaledTime;
                    double h = OpasSovitin.OmaMaa(p.Paikka.Lat, p.Paikka.Lon);
                    if (!double.IsNaN(h)) p.Pinta = h - (p.Paikka.X * p.Paikka.X + p.Paikka.Z * p.Paikka.Z) / (2 * 6371000.0);
                }
                nakyy &= !double.IsNaN(p.Pinta);
                if (p.Juuri.activeSelf != nakyy) p.Juuri.SetActive(nakyy);
                if (!nakyy) continue;
                p.P.Paivita(dt);
                for (int j = 0; j < p.Lokit.Length; j++)
                {
                    p.Lokit[j].localPosition = new Vector3((float)p.P.X[j], (float)(p.Pinta + p.P.Y[j]) + (p.Paikka.Kyyhky ? 0f : nosto), (float)p.P.Z[j]);
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
