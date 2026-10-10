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
// SAVU JA LIPUT (B8, juna 171; ElavaSavuLiput + Ydin SavuJaLiput): savu lähimmistä savuavista piipuista ja liput lähimmistä tangoista
// (10 / 30 / 80 muistin mukaan), tuuli LIVE-säästä tai muiden pallojen varatuulesta; kytkimet `opas savu|liput 0|1`, tila Tila().
// ELÄVÄT ÄÄNET v2 (juna 172; Pelikoodarin aanet/pallo-elava-v2, ElavaAaniPankki): ohiajot lähimmistä autoista ja raitiovaunuista
// (Ydin Ohiajot), muiden pallojen poltin (Ydin PoltinAanet), ihmiset, pyörän kellot ja laivan torvet OSM-paikoissa (Ydin IhmisAanet)
// 3D-lähdepoolista (ElavaAaniPooli, 6 lähdettä) ja lipun lepatus lähimmässä lipussa (ElavaSilmukka, 3D). Puuttuva manifesti = ennallaan.
// KAUPUNKIÄÄNET v1 (juna 173; Pelikoodarin aanet/pallo-kaupunki-v1, Ydin KaupunkiAanet + PalloKaupunkiAanet): kirkonkellot ja
// maitovaahdotin 3D-poolista (nyt 8 lähdettä) OSM-pisteissä, suihkulähteet ja satamat (laiturit, satama-vesi) 3D-silmukoina, kahvila-, tori- ja hallitaustat 2D-stereona,
// vene-ohi pienissä veneissä (Ydin Ohiajot vesi). Paikallinen kello kuten KaupunkiKuva (opas tunti pakottaa). Diagnoosi
// `opas kaupunkiaanet tila`, kuuntelu `opas kaupunkiaanet kello|maito`.
// SOUNDLY-ERÄ 1 (juna 173; Ydin SoundlyAanet, PalloSoundlyAanet): lokkien huudot näkyvissä lokkiparvissa (muuten laitureilla) ja
// lokki-parvi hiljaisena 2D-taustana matalalla veden äärellä, kyyhkyt aukioilla ja kyyhkyparvissa, raitiovaunun kello näkyvissä
// raitiovaunuissa, tuntilyönnit lähimmästä kirkosta (OmatLyonnit: KaupunkiAanimaisemaSoittimen 2D-lyönnit pois). Kun uudet klipit on
// ladattu, vanha lokkiparven silmukka ja kyyhkyjen 2D-siivet (elava-kaupunki-v1) vaikenevat, ettei samaa lintua kuulu kahdesti.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Aanet;
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

        static Material kohdeMat, vanaMat, valoMat;
        string paketti;
        static readonly Dictionary<int, Mesh> veneVerkot = new Dictionary<int, Mesh>(), vanaVerkot = new Dictionary<int, Mesh>();
        static Mesh lokki, siipiO, siipiV, kyyhky, kSiipiO, kSiipiV;
        static readonly Dictionary<int, Mesh> palloVerkot = new Dictionary<int, Mesh>();
        MuutPallot pallot; Transform[] palloT; float maaM;
        string katuJson; KatuLiikenne katu; int autoRaja; float katuYritys = -9f; double lat0, lon0;
        static readonly Dictionary<int, Mesh> autoVerkot = new Dictionary<int, Mesh>(); static Mesh raitioVerkko;
        readonly List<Transform> autoT = new List<Transform>(), raitioT = new List<Transform>();
        SavuJaLiput savuData; ElavaSavuLiput savuLiput; int taso; double varaTuuliAst;

        VesiLiikenne liikenne;
        sealed class VeneOlio { public Transform T; public ReittiLiike.Kulkija K; public float Vaihe, Pituus, VanaVoima, VanaNopeus; public bool Pieni; }
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
            e2.liikenne = l; e2.kerros = CesiumKaupunki.Kerros; e2.kaupunki = k; e2.paketti = id;
            e2.katuJson = kj != null && kj.Contains("\"kadut\"") ? kj : null; e2.autoRaja = new[] { 80, 200, 500 }[taso]; e2.lat0 = lat; e2.lon0 = lon;
            // Muiden pallojen korkeus georeferenssin origon korkeudesta (kohteen maa, ei luettu Googlen laatoista tässä).
            e2.maaM = (float)gr.height;
            int siemen = Mathf.Abs((int)(lat * 1000) * 31 + (int)(lon * 1000));
            e2.pallot = new MuutPallot(new[] { 2, 4, 6 }[taso], PallotSadeM, siemen % 360, 3.0, siemen);
            e2.ohiajot = new Ohiajot(siemen); e2.poltinAanet = new PoltinAanet(siemen + 1);
            if (kj != null)
            {
                try { e2.ihmiset = IhmisAanet.Lue(kj, siemen + 2); }
                catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: elävä {id}: ihmisäänten paikat virheelliset ({e.Message})"); }
                if (kj.Contains("\"kirkot\""))
                {
                    try { e2.kaupunkiAanet = KaupunkiAanet.Lue(kj, siemen + 3); }
                    catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: elävä {id}: kaupunkiäänten pisteet virheelliset ({e.Message})"); }
                }
            }
            if (l != null) e2.veneOhi = new Ohiajot(siemen + 4, true);
            if (e2.ihmiset != null) e2.ihmiset.Saatavilla = ElavaAaniPankki.Ladattu;
            e2.soundly = new SoundlyAanet(siemen + 5, e2.kaupunkiAanet?.Laiturit, e2.kaupunkiAanet?.Aukiot);
            e2.taso = taso; e2.varaTuuliAst = siemen % 360;   // savu ja liput samaan suuntaan kuin muut pallot, kun LIVE-säätä ei ole
            if (kj != null && (kj.Contains("\"piiput\"") || kj.Contains("\"liput\"")))
            {
                try { e2.savuData = SavuJaLiput.Lue(kj, 20261009); }
                catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: elävä {id}: savu ja liput virheellinen ({e.Message})"); }
            }
            e2.Rakenna();
            Nykyinen = e2; Krediitti = l?.Krediitti;
            Debug.Log($"MATKAKIRJA kaupunki: elävä {id ?? "-"}: {l?.Liike.Kulkijat.Count ?? 0} venettä {l?.Reitteja ?? 0} reitillä (raja {raja}), {l?.Parvet.Count ?? 0} lokkiparvea, {e2.pallot.Maara} muuta palloa, {e2.savuData?.Savuavia ?? 0}/{e2.savuData?.Piiput.Count ?? 0} savuavaa piippua, {e2.savuData?.Liput.Count ?? 0} lipputankoa");
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
            var cv = Shader.Find("Matkakirja/Linssit/ElavaValo");
            valoMat = cv != null ? new Material(cv) { name = "Elävä valo" } : null;
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
            RakennaTaivas();
            if (savuData != null)
            {
                savuLiput = new ElavaSavuLiput(savuData, MaaAlla, SavuJaLiput.Maarat[taso]);
                savuLiput.Rakenna(transform, kerros, kohdeMat, Olio);
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
                veneet.Add(new VeneOlio { T = g.transform, K = k, Vaihe = (i++ * 2.399f) % 6.283f, Pituus = m.bounds.size.z, Pieni = System.Array.IndexOf(Ohiajot.VeneTyypit, VeneMallit.Tyypit[t]) >= 0 });
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

        /// <summary>Maan korkeus paikallisessa ENU:ssa omasta korkeusmallista (NaN = ei muistissa): pienin kolmesta pisteestä.
        /// 10.10. (PT, juna 175): maanpinnasta (DTM) kun ladattu, muuten pinnasta (DSM).</summary>
        double Maa(double x, double z)
        {
            double cl = System.Math.Cos(lat0 * System.Math.PI / 180), h = double.NaN;
            foreach (var (dx, dz) in new[] { (0.0, 0.0), (4.0, 0.0), (0.0, 4.0) })
            {
                double hh = OpasSovitin.OmaMaanpinta(lat0 + (z + dz) / 111132.0, lon0 + (x + dx) / (111320.0 * cl));
                if (!double.IsNaN(hh)) h = double.IsNaN(h) ? hh : System.Math.Min(h, hh);
            }
            return double.IsNaN(h) ? h : h - (x * x + z * z) / (2 * 6371000.0);
        }

        /// <summary>Maa kohteen alla (piippu, lipputanko): pienin keskeltä ja kuudesta pisteestä 25 m:n kehältä (piipun tai katon
        /// huippu ei ole maa); NaN, jos oma korkeusmalli ei ole muistissa.</summary>
        double MaaAlla(double x, double z)
        {
            double h = Maa(x, z);
            if (double.IsNaN(h)) return h;
            for (int i = 0; i < 6; i++)
            {
                double hk = Maa(x + 25 * System.Math.Cos(i * System.Math.PI / 3), z + 25 * System.Math.Sin(i * System.Math.PI / 3));
                if (!double.IsNaN(hk)) h = System.Math.Min(h, hk);
            }
            return h;
        }

        /// <summary>Diagnoosi (`opas savu|liput`): paketti, savu ja liput näkyvissä, tuuli.</summary>
        public static string Tila() => Nykyinen == null ? "elävä kaupunki: ei auki"
            : $"elävä kaupunki {Nykyinen.paketti ?? "-"}: " + (Nykyinen.savuLiput?.Tila() ?? "ei savua eikä lippuja paketissa");

        void RakennaKatu()
        {
            if (katuJson == null || katu != null || Time.unscaledTime - katuYritys < 2f) return;
            katuYritys = Time.unscaledTime;
            if (!OpasSovitin.MaanpintaValmis(lat0, lon0)) return;   // korkeusmalli tai maanpinta ei vielä ratkennut
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
            if (savuLiput != null)
            {
                var st = Saatila.Live ? OpasSovitin.SaaTiedot : null;   // LIVE-sää: tuulen mistä-suunta ja nopeus (MET Norway)
                savuLiput.Paivita(c, st?.TuulenSuuntaAst, st?.TuuliMs, varaTuuliAst);
            }
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
            PaivitaElavatAanet(c, dt);
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
                // Omistaja TF 169: vana näkyy koko ajan eikä katkea suihkuina → tauolla häipyy 4 s:ssa, lähtiessä kasvaa 2 s:ssa.
                v.VanaVoima = Mathf.MoveTowards(v.VanaVoima, liikkuu, Time.deltaTime / (liikkuu > 0 ? 2f : 4f));
                if (liikkuu > 0) v.VanaNopeus = (float)k.Nopeus;
                if (omaVesi && v.VanaVoima > 0.01f) { var f = v.T.forward; KaupunkiVesi.Vana(veneet.IndexOf(v), v.T.position, new Vector2(f.x, f.z).normalized, v.VanaNopeus * v.VanaVoima, v.Pituus); }
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
                    double h = OpasSovitin.OmaMaanpinta(p.Paikka.Lat, p.Paikka.Lon);
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
            PaivitaAanet(c);
            PaivitaTaivas(c);
        }

        // ---- ELÄVÄ TAIVAS JA VALONHEITTIMET (Päätoimittaja 9.10., juna 170; Ydin ElavaTaivas): lintuparvi V:nä päivällä, lentokone ja
        // tiivistysvana äänen tahdissa (yöllä navigointivalot), yöllä harvoin 1–2 hidasta keilaa kaupungin laidalta (ei maamerkistä:
        // Eiffelin valaistus on SETE:n suojaama, Päätoimittaja kumosi majakan). ----
        ElavaTaivas taivas; Transform parviJuuri, koneT, keilaT; Transform[] lintuT, lintuV, lintuO, keilat; Renderer vanaR; Transform[] koneValot;
        ElavaTaivas.Heitin heitinEd; double heitinMaa = double.NaN;

        static Mesh Nauha(string nimi, float pituus, float leveys, Color alku, Color loppu)
        {
            // Vaakasuora nauha z = 0 … −pituus (taakse), x ±leveys/2; väri alusta loppuun.
            var m = new Mesh { name = nimi };
            m.SetVertices(new List<Vector3> { new Vector3(-leveys / 2, 0, 0), new Vector3(leveys / 2, 0, 0), new Vector3(-leveys / 2, 0, -pituus), new Vector3(leveys / 2, 0, -pituus) });
            m.SetColors(new List<Color> { alku, alku, loppu, loppu });
            m.SetNormals(new List<Vector3> { Vector3.up, Vector3.up, Vector3.up, Vector3.up });
            m.SetTriangles(new[] { 0, 2, 1, 1, 2, 3 }, 0); m.RecalculateBounds(); m.bounds = new Bounds(m.bounds.center, m.bounds.size + Vector3.one * 50); m.UploadMeshData(true);
            return m;
        }

        static Mesh Keila(string nimi, float pituus, float alkuLeveys, float loppuLeveys, Color alku)
        {
            // Nelikulmainen katkaistu pyramidi +z-suuntaan (kaksi ristikkäistä tasoa riittää additiiviselle keilalle).
            var loppu = new Color(alku.r, alku.g, alku.b, 0f);
            float a = alkuLeveys / 2, b = loppuLeveys / 2;
            var m = new Mesh { name = nimi };
            m.SetVertices(new List<Vector3> { new Vector3(-a, 0, 0), new Vector3(a, 0, 0), new Vector3(-b, 0, pituus), new Vector3(b, 0, pituus),
                new Vector3(0, -a, 0), new Vector3(0, a, 0), new Vector3(0, -b, pituus), new Vector3(0, b, pituus) });
            m.SetColors(new List<Color> { alku, alku, loppu, loppu, alku, alku, loppu, loppu });
            m.SetTriangles(new[] { 0, 2, 1, 1, 2, 3, 4, 6, 5, 5, 6, 7 }, 0); m.RecalculateBounds(); m.UploadMeshData(true);
            return m;
        }

        static Mesh Lentokone()
        {
            // Runko ja siivet vaakatasossa (alhaalta katsottuna), harmaa; 60 m × 55 m (näkyvyyden vuoksi ~1,5 × matkustajakone).
            var m = new Mesh { name = "Lentokone" };
            Color c = new Color(0.82f, 0.84f, 0.86f, 1f);
            m.SetVertices(new List<Vector3> { new Vector3(-3, 0, 30), new Vector3(3, 0, 30), new Vector3(-3, 0, -30), new Vector3(3, 0, -30),
                new Vector3(-27, 0, 2), new Vector3(27, 0, 2), new Vector3(-27, 0, -8), new Vector3(27, 0, -8),
                new Vector3(-10, 0, -24), new Vector3(10, 0, -24), new Vector3(-10, 0, -30), new Vector3(10, 0, -30) });
            var cs = new List<Color>(); for (int i = 0; i < 12; i++) cs.Add(c); m.SetColors(cs);
            var ns = new List<Vector3>(); for (int i = 0; i < 12; i++) ns.Add(Vector3.down); m.SetNormals(ns);
            m.SetTriangles(new[] { 0, 2, 1, 1, 2, 3, 4, 6, 5, 5, 6, 7, 8, 10, 9, 9, 10, 11 }, 0); m.RecalculateBounds(); m.UploadMeshData(true);
            return m;
        }

        void RakennaTaivas()
        {
            taivas = new ElavaTaivas(Mathf.Abs((int)(lat0 * 7919 + lon0 * 104729)));
            parviJuuri = new GameObject("lintuparvi") { layer = kerros }.transform; parviJuuri.SetParent(transform, false);
            lintuT = new Transform[ElavaTaivas.ParviLintuja]; lintuV = new Transform[ElavaTaivas.ParviLintuja]; lintuO = new Transform[ElavaTaivas.ParviLintuja];
            for (int j = 0; j < lintuT.Length; j++)
            {
                var g = Olio("lintu", parviJuuri, lokki, kohdeMat); g.transform.localScale = Vector3.one * 2.2f;
                lintuT[j] = g.transform; lintuV[j] = Olio("siipi", g.transform, siipiV, kohdeMat).transform; lintuO[j] = Olio("siipi", g.transform, siipiO, kohdeMat).transform;
            }
            parviJuuri.gameObject.SetActive(false);
            koneT = Olio("lentokone", transform, Lentokone(), kohdeMat).transform;
            if (valoMat != null)
            {
                vanaR = Olio("tiivistysvana", koneT, Nauha("Tiivistysvana", 3000, 22, new Color(1f, 1f, 1f, 0.45f), new Color(1f, 1f, 1f, 0f)), valoMat).GetComponent<Renderer>();
                vanaR.transform.localPosition = new Vector3(0, 0, -32);
                koneValot = new Transform[3];
                var vv = new[] { (new Color(1f, 0.1f, 0.1f, 1f), new Vector3(-27, 0, -3)), (new Color(0.1f, 1f, 0.2f, 1f), new Vector3(27, 0, -3)), (new Color(1f, 1f, 1f, 1f), new Vector3(0, 0, -30)) };
                for (int i = 0; i < 3; i++)
                {
                    koneValot[i] = Olio("navigointivalo", koneT, Keila("Navigointivalo", 0.01f, 45f, 45f, vv[i].Item1), valoMat).transform;
                    koneValot[i].localPosition = vv[i].Item2;
                }
                keilaT = new GameObject("valonheittimet") { layer = kerros }.transform; keilaT.SetParent(transform, false);
                var km = Keila("Valonheittimen keila", (float)ElavaTaivas.HeitinPituusM, 3f, 140f, new Color(0.92f, 0.95f, 1f, 0.22f));
                keilat = new Transform[2];
                for (int i = 0; i < 2; i++) keilat[i] = Olio("keila", keilaT, km, valoMat).transform;
                keilaT.gameObject.SetActive(false);
            }
            koneT.gameObject.SetActive(false);
        }

        void PaivitaTaivas(Vector3 c)
        {
            if (taivas == null) return;
            float t = Time.time, yo = KaupunkiYovalot.Osuus;
            taivas.Paivita(t, c.x, c.y, c.z, yo < 0.3f, yo > 0.6f);
            bool parvi = taivas.Parvi != null;
            if (parviJuuri.gameObject.activeSelf != parvi) parviJuuri.gameObject.SetActive(parvi);
            if (parvi)
                for (int j = 0; j < lintuT.Length; j++)
                {
                    var b = taivas.Lintu(j, t);
                    lintuT[j].localPosition = new Vector3((float)b.x, (float)b.y, (float)b.z);
                    lintuT[j].localRotation = Quaternion.Euler(0, (float)b.suunta, 0);
                    float siipi = 6f + 30f * Mathf.Sin(2f * Mathf.PI * (float)b.siipi);
                    lintuV[j].localRotation = Quaternion.Euler(0, 0, -siipi); lintuO[j].localRotation = Quaternion.Euler(0, 0, siipi);
                }
            bool kone = taivas.Lentokone != null;
            if (koneT.gameObject.activeSelf != kone) koneT.gameObject.SetActive(kone);
            if (kone)
            {
                var k = taivas.KonePaikka(t);
                koneT.localPosition = new Vector3((float)k.x, (float)k.y, (float)k.z);
                koneT.localRotation = Quaternion.Euler(0, (float)taivas.Lentokone.Suunta, 0);
                if (vanaR != null) vanaR.enabled = yo < 0.7f;   // tiivistysvana päivällä ja hämärässä
                if (koneValot != null)
                    for (int i = 0; i < koneValot.Length; i++)
                    {
                        bool palaa = yo > 0.3f && (i < 2 || Mathf.Repeat(t, 1.3f) < 0.12f);   // valkoinen vilkku
                        if (koneValot[i].gameObject.activeSelf != palaa) koneValot[i].gameObject.SetActive(palaa);
                    }
            }
            if (keilaT != null)
            {
                var h = taivas.Valonheitin;
                bool palaa = h != null;
                if (keilaT.gameObject.activeSelf != palaa) keilaT.gameObject.SetActive(palaa);
                if (palaa)
                {
                    if (h != heitinEd) { heitinEd = h; heitinMaa = Maa(h.X, h.Z); }
                    keilaT.localPosition = new Vector3((float)h.X, (float)(double.IsNaN(heitinMaa) ? maaM : heitinMaa) + 2f, (float)h.Z);
                    float voima = (float)taivas.HeitinVoima(t);
                    for (int i = 0; i < keilat.Length; i++)
                    {
                        bool k = i < h.Maara && voima > 0.001f;
                        if (keilat[i].gameObject.activeSelf != k) keilat[i].gameObject.SetActive(k);
                        if (!k) continue;
                        var (suunta, nousu) = taivas.Keila(i, t);
                        keilat[i].localRotation = Quaternion.Euler(-(float)nousu, (float)suunta, 0);
                        keilat[i].localScale = new Vector3(1f, 1f, voima);   // syttyy ja sammuu pituutena
                    }
                }
            }
        }

        // ---- ELÄVÄN KAUPUNGIN ÄÄNET (Päätoimittaja 9.10., juna 170; Pelikoodari aanet/elava-kaupunki-v1, −23 LUFS, etäisyys soittimessa):
        // lähimmän lokkiparven silmukka etäisyyden mukaan (alle LokkiKuuluuM), kyyhkyjen siivet satunnaisesti aukion lähellä (alle
        // KyyhkyKuuluuM) ja kaukainen lentokone harvoin. Kaikki mikserin Äänimaisema-kytkimellä ja kertojan alla väistäen (OpasAanitasot.Maisema). ----
        public const string AaniJuuri = "https://media.matkakirja.app/aanet/elava-kaupunki-v1/";
        public const float LokkiKuuluuM = 600f, KyyhkyKuuluuM = 250f, LokkiTaso = 0.5f, KyyhkyTaso = 0.45f, KoneTaso = 0.22f;
        static AudioClip lokkiKlippi, kyyhky1Klippi, kyyhky2Klippi, koneKlippi; static bool aanetLadattu;
        AudioSource lokkiLahde, kertaLahde; float seuraavaKyyhky = 20f, seuraavaKone = 150f;

        // Äänirekisteri (Natiivi-UI 9.10., Ydin Aanimikseri): pallon Äänimaisema-ryhmään omina äänināan; klipin nimi = tunnus (äänivahti).
        // Taso = Kerroin("maisema", tunnus), joka sisältää ryhmän tason nykyisessä kontekstissa (korvaa Asetukset.Taso(Voima.Tausta)).
        public const string LokitId = "elava.lokit", KyyhkytId = "elava.kyyhkyt", LentokoneId = "elava.lentokone";
        static readonly string[] AaniNimet = { "lokkiparvi", "kyyhkyt-1", "kyyhkyt-2", "lentokone" };
        static readonly string[] KlippiNimet = { LokitId, KyyhkytId + "-1", KyyhkytId + "-2", LentokoneId };

        System.Collections.IEnumerator LataaAanet()
        {
            aanetLadattu = true;
            var m = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
            m.Rekisteroi("pallo", "maisema", LokitId, "Lokkiparvi", LokitId);
            m.Rekisteroi("pallo", "maisema", KyyhkytId, "Kyyhkyjen siivet", KlippiNimet[1], KlippiNimet[2]);
            m.Rekisteroi("pallo", "maisema", LentokoneId, "Kaukainen lentokone", LentokoneId);
            var nimet = AaniNimet;
            var klipit = new AudioClip[nimet.Length];
            for (int i = 0; i < nimet.Length; i++)
                using (var r = UnityEngine.Networking.UnityWebRequestMultimedia.GetAudioClip(Matkakirja.Linssit.Aanet.KaupunkiSilmukat.Osoite(AaniJuuri + nimet[i] + ".mp3", KaupunkiAanimaisemaSoitin.Juuri), AudioType.MPEG))   // lokkiparvi → kaupunkisilmukat-v1
                {
                    // Pakattuna (juna 174, muisti): kaupunkisilmukat-v1:n 110 s lokkiparvi purettuna ~19 Mt, pakattuna ~2,6 Mt.
                    ((UnityEngine.Networking.DownloadHandlerAudioClip)r.downloadHandler).compressed = true;
                    r.timeout = 20;
                    yield return r.SendWebRequest();
                    if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success) klipit[i] = UnityEngine.Networking.DownloadHandlerAudioClip.GetContent(r);
                    if (klipit[i] != null) klipit[i].name = KlippiNimet[i];
                    if (i == 0 && klipit[0] != null) yield return SaumatonSilmukka.HaeTagi(r.url, klipit[0]);   // lokkiparvi: saumaton liitos
                }
            lokkiKlippi = klipit[0]; kyyhky1Klippi = klipit[1]; kyyhky2Klippi = klipit[2]; koneKlippi = klipit[3];
            Debug.Log($"MATKAKIRJA kaupunki: elävän kaupungin äänet {System.Array.FindAll(klipit, x => x != null).Length}/{nimet.Length}");
        }

        void PaivitaAanet(Vector3 c)
        {
            if (!aanetLadattu) StartCoroutine(LataaAanet());
            bool paalla = Matkakirja.Natiivi.Asetukset.Paalla(Matkakirja.Natiivi.Kytkin.Aanimaisema) && OpasSovitin.Auki;
            float lokkiD = float.MaxValue, kyyhkyD = float.MaxValue;
            foreach (var p in parvet)
            {
                if (!p.Juuri.activeSelf) continue;
                float y = double.IsNaN(p.Pinta) ? c.y : (float)p.Pinta;
                float d = Mathf.Max(0f, Vector3.Distance(new Vector3((float)p.Paikka.X, y, (float)p.Paikka.Z), c) - (float)p.Paikka.Alue * 0.5f);
                if (p.Paikka.Kyyhky) kyyhkyD = Mathf.Min(kyyhkyD, d); else lokkiD = Mathf.Min(lokkiD, d);
            }
            if (lokkiLahde == null) { lokkiLahde = gameObject.AddComponent<AudioSource>(); lokkiLahde.loop = true; lokkiLahde.playOnAwake = false; lokkiLahde.spatialBlend = 0; lokkiLahde.volume = 0; SaumatonSilmukka.Kiinnita(lokkiLahde); }
            if (kertaLahde == null) { kertaLahde = gameObject.AddComponent<AudioSource>(); kertaLahde.playOnAwake = false; kertaLahde.spatialBlend = 0; }
            bool vaisto = OpasSovitin.OpasAaniSoi;
            var mk = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;   // TF 169: kaikki pallon äänet mikserin ryhmiin; 9.10. äänikohtaisesti
            float lokkiK = mk.Kerroin("maisema", LokitId), kyyhkyK = mk.Kerroin("maisema", KyyhkytId), koneK = mk.Kerroin("maisema", LentokoneId);
            float lokkiOsuus = Mathf.Clamp01(1f - lokkiD / LokkiKuuluuM);
            bool uudetLinnut = ElavaAaniPankki.Ladattu(PalloSoundlyAanet.LokkiParvi);   // Soundly-erä: vanha silmukka ja 2D-siivet pois
            float lokkiTavoite = paalla && lokkiKlippi != null && !uudetLinnut ? (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(LokkiTaso * lokkiOsuus * lokkiOsuus, vaisto) * lokkiK : 0f;
            if (lokkiTavoite > 0.001f && !lokkiLahde.isPlaying) { lokkiLahde.clip = lokkiKlippi; lokkiLahde.Play(); }
            lokkiLahde.volume = (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Liuku(lokkiLahde.volume, lokkiTavoite, Time.unscaledDeltaTime);
            if (lokkiLahde.isPlaying && lokkiLahde.volume < 0.0005f && lokkiTavoite <= 0) lokkiLahde.Stop();
            float tu = Time.unscaledTime;
            if (paalla && kyyhkyD < KyyhkyKuuluuM && tu > seuraavaKyyhky && kyyhky2Klippi != null && !ElavaAaniPankki.Ladattu(PalloSoundlyAanet.KyyhkySiivet[0]))
            {
                seuraavaKyyhky = tu + UnityEngine.Random.Range(15f, 35f);
                var klippi = kyyhky1Klippi != null && UnityEngine.Random.value < 0.3f ? kyyhky1Klippi : kyyhky2Klippi;
                kertaLahde.PlayOneShot(klippi, (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(KyyhkyTaso * (1f - kyyhkyD / KyyhkyKuuluuM), vaisto) * kyyhkyK);
            }
            if (tu > seuraavaKone && !vaisto)
            {
                // Lentokone näkyy ja kuuluu yhdessä (ElavaTaivas.AloitaKone); ääni vain Äänimaisema-kytkimellä.
                seuraavaKone = tu + UnityEngine.Random.Range(240f, 420f);
                taivas?.AloitaKone(Time.time, c.x, c.z);
                if (paalla && koneKlippi != null && koneK > 0.001f) kertaLahde.PlayOneShot(koneKlippi, (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(KoneTaso, false) * koneK);
            }
        }

        // ---- ELÄVÄT ÄÄNET v2 (Linssiseppä 9.10., PT junaan 172; Ydin PalloElavaAanet, Ohiajot, PoltinAanet, IhmisAanet): kerta-äänet
        // 3D-poolista äänen paikkaan (ajoneuvo, pallo, OSM-paikka) ja lipun lepatus silmukkana lähimmässä lipussa. Kaikki Äänimaisema-
        // kytkimellä, kertojan alla väistäen ja mikserin Kerroin(ryhmä, tunnus):lla (ElavaAaniPooli / ElavaAaniPankki.Kerroin). ----
        Ohiajot ohiajot; PoltinAanet poltinAanet; IhmisAanet ihmiset; ElavaAaniPooli pooli; ElavaSilmukka lippuSilmukka;
        int ohiKahva; Vector3 edKamera; bool edKameraOn; double kameraKorkeus = double.NaN; float korkeusHaettu = -9f;
        public const int RaitioAvain = 100000;

        void PaivitaElavatAanet(Vector3 c, float dt)
        {
            ElavaAaniPankki.Kaynnista();
            bool paalla = Matkakirja.Natiivi.Asetukset.Paalla(Matkakirja.Natiivi.Kytkin.Aanimaisema) && OpasSovitin.Auki, vaisto = OpasSovitin.OpasAaniSoi;
            pooli ??= new ElavaAaniPooli(transform, 12);   // juna 173: kirkonkellot (8 s), vene-ohi (9 s), maitovaahdotin, tuntilyönnit päällekkäin (9 s), linnut
            pooli.Paivita(paalla, vaisto);
            // Kameran nopeus paketin ENU:ssa (suhteellinen liike ohiajoille); hyppy (siirtymä, origo) ei ole nopeutta.
            Vector3 kv = edKameraOn && dt > 1e-4f ? (c - edKamera) / dt : Vector3.zero;
            if (kv.sqrMagnitude > 150f * 150f) kv = Vector3.zero;
            edKamera = c; edKameraOn = true;
            double nyt = Time.timeAsDouble;
            if (katu != null && ohiajot != null)
            {
                ohiajot.Aloita(nyt);
                OhiEhdokkaat(katu.Autot, autoT, false, c, kv, 0);
                OhiEhdokkaat(katu.Raitiot, raitioT, true, c, kv, RaitioAvain);
                var o = ohiajot.Valitse(pooli.Soi(ohiKahva));
                if (o != null && paalla)
                {
                    var tt = o.Avain >= RaitioAvain ? raitioT[o.Avain - RaitioAvain] : autoT[o.Avain];
                    ohiKahva = pooli.Soita(o.Tunnus, (float)o.Taso, 1f, tt.localPosition, tt, vaisto);
                }
            }
            if (pallot != null && poltinAanet != null)
            {
                var p = poltinAanet.Paivita(nyt, pallot, c.x, c.y, c.z, maaM, PalloLahinM);
                if (p != null && paalla) pooli.Soita(p.Tunnus, (float)p.Taso, 1f, palloT[p.Pallo].localPosition, palloT[p.Pallo], vaisto);
            }
            // Kameran korkeus omasta maasta (puolen sekunnin välein; NaN, kunnes korkeusmalli on muistissa → ei ihmis- eikä kaupunkiääniä).
            if ((ihmiset != null || kaupunkiAanet != null || soundly != null) && Time.unscaledTime - korkeusHaettu > 0.5f) { korkeusHaettu = Time.unscaledTime; double m = Maa(c.x, c.z); kameraKorkeus = double.IsNaN(m) ? double.NaN : c.y - m; }
            if (ihmiset != null)
            {
                var t = ihmiset.Paivita(nyt, c.x, c.z, kameraKorkeus);
                if (t != null && paalla)
                {
                    double m = Maa(t.X, t.Z);
                    if (!double.IsNaN(m))
                    {
                        int kahva = pooli.Soita(t.Tunnus, (float)t.Taso, (float)t.Savel, new Vector3((float)t.X, (float)m + 1.5f, (float)t.Z), null, vaisto);
                        if (System.Array.IndexOf(PalloElavaAanet.Sorina, t.Tunnus) >= 0) sorinaKahva = kahva;   // tori-ulko −6 dB sorinan ajan
                        if (System.Array.IndexOf(PalloKaupunkiAanet.PyoranKelloPisteet, t.Tunnus) >= 0) Debug.Log($"MATKAKIRJA kaupunki: kaupunkiääni {t.Tunnus} {t.EtaisyysM:F0} m, taso {t.Taso:F2}");
                    }
                }
            }
            PaivitaKaupunkiAanet(c, kv, nyt, dt, paalla, vaisto);
            lippuSilmukka ??= new ElavaSilmukka(transform, PalloElavaAanet.LippuLepatus, true);
            float lt = 0f; Vector3 lp = default;
            if (paalla && savuLiput != null)
            {
                float d = savuLiput.LahinLippu(c, out lp);
                lt = (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Maisema(PalloElavaAanet.LipunTaso(d, savuLiput.Tuuli.Ms), vaisto) * ElavaAaniPankki.Kerroin(PalloElavaAanet.LippuLepatus);
            }
            lippuSilmukka.Paivita(lt, Time.unscaledDeltaTime, (float)PalloElavaAanet.SilmukkaHaivytysS, lt > 0f ? lp : (Vector3?)null);
        }

        // ---- KAUPUNKIÄÄNET v1 (juna 173; Ydin KaupunkiAanet, PalloKaupunkiAanet) ----
        KaupunkiAanet kaupunkiAanet; Ohiajot veneOhi; int veneKahva, sorinaKahva;
        readonly Dictionary<int, ElavaSilmukka> suihkuSilmukat = new Dictionary<int, ElavaSilmukka>(), satamaSilmukat = new Dictionary<int, ElavaSilmukka>();
        readonly Dictionary<int, float> suihkuMaa = new Dictionary<int, float>(), satamaMaa = new Dictionary<int, float>();
        readonly Dictionary<string, Stack<ElavaSilmukka>> vapaatSuihkut = new Dictionary<string, Stack<ElavaSilmukka>>();
        readonly List<int> suihkuPois = new List<int>(); readonly HashSet<int> suihkuNyt = new HashSet<int>();
        ElavaSilmukka[] taustaSilmukat;
        const float KaupunkiLiukuS = 0.25f;   // Ydin liu'uttaa jo (suihku 1 s, taustat 2,5 s); tämä vain väistön ja mikserin muutoksille

        void PaivitaKaupunkiAanet(Vector3 c, Vector3 kv, double nyt, float dt, bool paalla, bool vaisto)
        {
            float udt = Time.unscaledDeltaTime;
            if (veneOhi != null)
            {
                // Vene-ohi pienistä näkyvistä veneistä (VeneTyypit); ääni alkaa huipun verran ennen lähintä kohtaa ja seuraa venettä.
                const float Raja = (float)Ohiajot.KuuluuM + 40f;
                veneOhi.Aloita(nyt);
                for (int i = 0; i < veneet.Count; i++)
                {
                    var v = veneet[i];
                    if (!v.Pieni || !v.T.gameObject.activeSelf) continue;
                    Vector3 r = v.T.localPosition - c;
                    if (r.x * r.x + r.z * r.z > Raja * Raja) continue;
                    float h = (float)v.K.Suuntima * Mathf.Deg2Rad, n = v.K.Tauko > 0 ? 0f : (float)v.K.Nopeus;
                    veneOhi.Ehdokas(i, false, r.x, r.y, r.z, n * Mathf.Sin(h) - kv.x, -kv.y, n * Mathf.Cos(h) - kv.z);
                }
                var o = veneOhi.Valitse(pooli.Soi(veneKahva));
                if (o != null && paalla) { var tt = veneet[o.Avain].T; veneKahva = pooli.Soita(o.Tunnus, (float)o.Taso, 1f, tt.localPosition, tt, vaisto); }
            }
            PaivitaSoundly(c, nyt, dt, paalla, vaisto);
            if (kaupunkiAanet == null) return;
            float pakko = KaupunkiKuva.TuntiNyt;   // paikallinen kello kuten valaistus (opas tunti pakottaa)
            double tunti = pakko >= 0 ? pakko : KaupunkiValo.PaikallinenTunti(System.DateTime.UtcNow, lon0);
            kaupunkiAanet.Paivita(nyt, dt, c.x, c.z, kameraKorkeus, tunti, pooli.Soi(sorinaKahva));
            double maaKamera = c.y - (double.IsNaN(kameraKorkeus) ? 0 : kameraKorkeus);
            if (paalla)
                foreach (var k in kaupunkiAanet.Kerrat)
                {
                    double m = Maa(k.X, k.Z); if (double.IsNaN(m)) m = maaKamera;
                    pooli.Soita(k.Tunnus, (float)k.Taso, 1f, new Vector3((float)k.X, (float)(m + k.Y), (float)k.Z), null, vaisto);
                    if (k.Tunnus != PalloKaupunkiAanet.Maitovaahdotin && k.Lyonti <= 1) Debug.Log($"MATKAKIRJA kaupunki: kaupunkiääni {k.Tunnus}{(k.Lyonti == 1 ? " (tuntilyönnit)" : k.Tasatunti ? " (tasatunti)" : "")} {k.EtaisyysM:F0} m, taso {k.Taso:F2}");
                }
            // Suihkulähteet ja satamat: 3D-silmukka pisteessä; Ydin häivyttää valinnan vaihtuessa, poistuva soi nollaan ennen kierrätystä.
            float nosto = kaupunki != null && kaupunki.Vesi?.Juuri != null ? KaupunkiVesi.NostoM : VesiNostoM;
            PisteSilmukat(kaupunkiAanet.Suihkut, suihkuSilmukat, suihkuMaa, maaKamera, 1f, paalla, vaisto, udt);
            PisteSilmukat(kaupunkiAanet.Satamat, satamaSilmukat, satamaMaa, maaKamera, nosto + 0.5f, paalla, vaisto, udt);
            // Taustat 2D-stereona (kahvila, tori, halli).
            if (taustaSilmukat == null)
            {
                taustaSilmukat = new ElavaSilmukka[KaupunkiAanet.TaustaTunnukset.Length];
                for (int i = 0; i < taustaSilmukat.Length; i++) taustaSilmukat[i] = new ElavaSilmukka(transform, KaupunkiAanet.TaustaTunnukset[i], false);
            }
            for (int i = 0; i < taustaSilmukat.Length; i++)
            {
                string tn = KaupunkiAanet.TaustaTunnukset[i];
                float tt = paalla ? (float)OpasAanitasot.Maisema(kaupunkiAanet.Tausta[i], vaisto) * ElavaAaniPankki.Kerroin(tn) : 0f;
                taustaSilmukat[i].Paivita(tt, udt, paalla ? KaupunkiLiukuS : (float)PalloElavaAanet.SilmukkaHaivytysS);
            }
        }

        void PisteSilmukat(List<KaupunkiAanet.Suihku> pisteet, Dictionary<int, ElavaSilmukka> silmukat, Dictionary<int, float> maat, double maaKamera, float nosto, bool paalla, bool vaisto, float udt)
        {
            suihkuNyt.Clear();
            foreach (var s in pisteet)
            {
                suihkuNyt.Add(s.Piste);
                if (!silmukat.TryGetValue(s.Piste, out var sl))
                {
                    if (!vapaatSuihkut.TryGetValue(s.Tunnus, out var pino)) vapaatSuihkut[s.Tunnus] = pino = new Stack<ElavaSilmukka>();
                    silmukat[s.Piste] = sl = pino.Count > 0 ? pino.Pop() : new ElavaSilmukka(transform, s.Tunnus, true);
                }
                // Korkeus: laiturilla paketin vesipinta (+ oman veden nosto), suihkulähteellä oma maa (välimuistissa), muuten kameran maa.
                if (!maat.TryGetValue(s.Piste, out float sm))
                {
                    double m = !double.IsNaN(s.Y) ? s.Y : Maa(s.X, s.Z);
                    sm = (float)(double.IsNaN(m) ? maaKamera : m);
                    if (!double.IsNaN(m)) maat[s.Piste] = sm;
                }
                float st = paalla ? (float)OpasAanitasot.Maisema(s.Taso, vaisto) * ElavaAaniPankki.Kerroin(s.Tunnus) : 0f;
                sl.Paivita(st, udt, KaupunkiLiukuS, new Vector3((float)s.X, sm + nosto, (float)s.Z));
            }
            suihkuPois.Clear();
            foreach (var kvp in silmukat)
            {
                if (suihkuNyt.Contains(kvp.Key)) continue;
                kvp.Value.Paivita(0f, udt, KaupunkiLiukuS);
                if (kvp.Value.Taso < 0.0005f) suihkuPois.Add(kvp.Key);
            }
            foreach (int p in suihkuPois) { var sl = silmukat[p]; sl.Hiljaa(); vapaatSuihkut[sl.Tunnus].Push(sl); silmukat.Remove(p); }
        }

        // ---- SOUNDLY-ERÄ 1 (juna 173): linnut ja raitiovaunun kello ----
        SoundlyAanet soundly; ElavaSilmukka lokkiParviSilmukka;

        /// <summary>Kaupunkiäänien omat tuntilyönnit käytössä (kirkot paketissa ja Soundly-kellot ladattu): soitin ei lyö omiaan.</summary>
        public static bool OmatLyonnit => Nykyinen != null && Nykyinen.kaupunkiAanet != null && Nykyinen.kaupunkiAanet.Kirkot.Count > 0
            && ElavaAaniPankki.Ladattu(PalloSoundlyAanet.Lyonnit[0]);

        void PaivitaSoundly(Vector3 c, double nyt, float dt, bool paalla, bool vaisto)
        {
            if (soundly == null) return;
            soundly.Aloita(nyt, c.x, c.y, c.z, kameraKorkeus);
            for (int i = 0; i < parvet.Count; i++)
                if (parvet[i].Juuri.activeSelf && parvet[i].Lokit.Length > 0) { var p = parvet[i].Lokit[0].localPosition; soundly.Parvi(i, p.x, p.y, p.z, parvet[i].Paikka.Kyyhky); }
            for (int i = 0; i < raitioT.Count; i++)
                if (raitioT[i].gameObject.activeSelf) { var p = raitioT[i].localPosition; soundly.Raitio(i, p.x, p.y, p.z); }
            soundly.Valitse(dt);
            if (paalla)
                foreach (var t in soundly.Kerrat)
                {
                    Transform seuraa = t.Avain < 0 ? null : t.Laji == SoundlyAanet.Laji.Raitio ? raitioT[t.Avain] : parvet[t.Avain].Lokit[0];
                    pooli.Soita(t.Tunnus, (float)t.Taso, 1f, new Vector3((float)t.X, (float)t.Y, (float)t.Z), seuraa, vaisto);
                }
            lokkiParviSilmukka ??= new ElavaSilmukka(transform, PalloSoundlyAanet.LokkiParvi, false);
            float lt = paalla ? (float)OpasAanitasot.Maisema(soundly.LokkiParvi, vaisto) * ElavaAaniPankki.Kerroin(PalloSoundlyAanet.LokkiParvi) : 0f;
            lokkiParviSilmukka.Paivita(lt, Time.unscaledDeltaTime, paalla ? KaupunkiLiukuS : (float)PalloElavaAanet.SilmukkaHaivytysS);
        }

        /// <summary>Diagnoosi (`opas kaupunkiaanet tila`): Ytimen tila, manifestit ja soivat kaupunkisilmukat.</summary>
        public static string KaupunkiAanetTila()
        {
            var n = Nykyinen;
            string ydin = n == null ? "elävä kaupunki ei auki" : n.kaupunkiAanet?.Tila() ?? $"elävä {n.paketti ?? "-"}: ei kaupunkiäänten pisteitä paketissa";
            var soi = new List<string>();
            if (n?.taustaSilmukat != null) foreach (var t in n.taustaSilmukat) if (t.Taso > 0.001f) soi.Add($"{t.Tunnus} {t.Taso:F3}");
            if (n != null) foreach (var s in n.suihkuSilmukat.Values) if (s.Taso > 0.001f) soi.Add($"{s.Tunnus} {s.Taso:F3}");
            if (n != null) foreach (var s in n.satamaSilmukat.Values) if (s.Taso > 0.001f) soi.Add($"{s.Tunnus} {s.Taso:F3}");
            if (n?.lokkiParviSilmukka != null && n.lokkiParviSilmukka.Taso > 0.001f) soi.Add($"{PalloSoundlyAanet.LokkiParvi} {n.lokkiParviSilmukka.Taso:F3}");
            return $"{ydin}; {n?.soundly?.Tila() ?? "linnut -"}; omat lyönnit {(OmatLyonnit ? "kyllä" : "ei")}; soi [{string.Join(", ", soi)}]; vene-ohi {(n?.veneOhi != null ? $"{n.veneet.FindAll(v => v.Pieni).Count} pientä venettä" : "-")}; {ElavaAaniPankki.Tila()}";
        }

        /// <summary>Kuuntelu: seuraava kirkonkello tai maitovaahdotin heti, kun ehdot täyttyvät (kamera matalalla, kirkko/café lähellä).</summary>
        public static void PakotaKaupunkiAani(string mita) { Nykyinen?.kaupunkiAanet?.Pakota(mita); Nykyinen?.ihmiset?.Pakota(mita); }   // pyora: IhmisAanet

        void OhiEhdokkaat(ReittiLiike l, List<Transform> tt, bool raitio, Vector3 c, Vector3 kv, int avain)
        {
            const float Raja = (float)Ohiajot.KuuluuM + 40f;
            for (int i = 0; i < tt.Count && i < l.Kulkijat.Count; i++)
            {
                if (!tt[i].gameObject.activeSelf) continue;
                Vector3 r = tt[i].localPosition - c;
                if (r.x * r.x + r.z * r.z > Raja * Raja) continue;
                var k = l.Kulkijat[i];
                float h = (float)k.Suuntima * Mathf.Deg2Rad, n = k.Tauko > 0 ? 0f : (float)k.Nopeus;
                ohiajot.Ehdokas(avain + i, raitio, r.x, r.y, r.z, n * Mathf.Sin(h) - kv.x, -kv.y, n * Mathf.Cos(h) - kv.z);
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
