// ELÄVÄT ELEMENTIT kaupungeissa (omistaja 26.9.2026 klo 10.0x: niukkuus ja sulava, elävä animointi; selvitys
// docs/raportit/elavat-elementit-selvitys-20260926.md, omistaja hyväksyi järjestyksen). Yksi liikkuva aihe kaupunkia
// kohden, ja kukin aihe on yksi Aihe-määrittely: paikka, yksilöt ruudulla, runko, pyörivä osa ja animaatio.
//   kokeilu 1  Zaandamin kolme tuulimyllyä (vain siivet pyörivät, 7–9 s/kierros)
//   kokeilu 2  Tivolin karuselli Kööpenhaminassa (katos ja hevoset pyörivät 10 s/kierros, hevoset nousevat 2,5 s)
//
// Mallit ovat proseduraalisia low-poly-malleja löydöksen 160 paletilla (MalliVarit) ja varjostimella
// Matkakirja/Linssit/Malli. Natiivisepän Blender-mallit voivat korvata ne myöhemmin (sama juuri ja sama pyörivä osa).
// Piirto: Elava-layer ja ElavaKerros.Animoi (161 B): kamera paikallaan piirretään vain aiheet 30 fps:llä talletetun
// kartan päälle, ja kun mikään aihe ei näy (korkeus, horisontti), animaatio ei käy (0 kehystä). Pop-up-asento
// (ruudun ylös, kameraa kohti SivuKulma), koko vakio ruudulla, näkyvyys 15–600 km, häivytys 450 km:stä. Vähennetty
// liike ja ElavaKerros.Staattinen pysäyttävät liikkeen pehmeästi (0,6 s).
// Komento: "elava elementit tila|0|1" (myös "elava myllyt").
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class ElavatElementit : MonoBehaviour
    {
        public const double NakyyAlkaenM = 15_000, NakyyAstiM = 600_000, HaipyyAlkaenM = 450_000;
        public const float PehmeysS = 0.6f, SivuKulma = 25f;

        /// <summary>
        /// Yksi aihe: paikka, koko ruutupisteinä, yksilöt (siirto ruudulla pisteinä, vaihe), mallit ja animaatio. Animoi saa
        /// yksilön pyörivän osan, sen lapset ja ajan (s, nopeus huomioitu) ja asettaa niiden paikallisen asennon.
        /// </summary>
        sealed class Aihe
        {
            public string Nimi;
            public LatLon Paikka;
            public float KokoPt;
            public (float x, float y, float vaihe)[] Yksilot;
            public Func<Mesh> Runko, Roottori;
            public Func<Mesh> Lapsi;          // valinnainen: pyörivän osan lapset (karusellin hevoset)
            public Vector3[] LastenPaikat;    // lasten paikat roottorin avaruudessa
            public Action<Transform, Transform[], float> Animoi;
            // Ajonaikaiset
            public readonly List<(Transform juuri, Transform roottori, Transform[] lapset, float vaihe)> Oliot = new();
            public int Kolmioita;
            public bool Nakyvissa;
            public float Peitto = -1;
            public Material Materiaali;
        }

        static readonly Aihe[] Aiheet =
        {
            new Aihe
            {
                Nimi = "myllyt", Paikka = new LatLon(52.4735, 4.8166), KokoPt = 34f,   // Zaanse Schans, Zaandam
                Yksilot = new[] { (-26f, -4f, 0f), (0f, 3f, 2.4f), (25f, -2f, 5.1f) },
                Runko = MyllyGeometria.Runko, Roottori = MyllyGeometria.Siivet,
                // Siivet akselin ympäri, jokaisella oma tahti (7,4 / 8,3 / 9,1 s): tahti vaiheesta.
                Animoi = (roottori, _, t) =>
                {
                    roottori.localPosition = MyllyGeometria.Akseli;
                    roottori.localRotation = Quaternion.Euler(-MyllyGeometria.AkselinNousu, 0, 0) * Quaternion.Euler(0, 0, t * 360f / 8.3f);
                },
            },
            new Aihe
            {
                Nimi = "karuselli", Paikka = new LatLon(55.6737, 12.5681), KokoPt = 38f,   // Tivoli, Kööpenhamina
                Yksilot = new[] { (0f, 0f, 0f) },
                Runko = KaruselliGeometria.Runko, Roottori = KaruselliGeometria.Katos, Lapsi = KaruselliGeometria.Hevonen,
                LastenPaikat = KaruselliGeometria.HevostenPaikat(),
                // Katos ja hevoset 10 s/kierros pystyakselin ympäri; hevoset nousevat ja laskevat 2,5 s, vuorotellen.
                Animoi = (roottori, lapset, t) =>
                {
                    roottori.localRotation = Quaternion.Euler(0, t * 36f, 0);
                    for (int i = 0; i < lapset.Length; i++)
                    {
                        var q = KaruselliGeometria.HevostenPaikat()[i];
                        float nousu = 0.045f * Mathf.Sin((t / 2.5f + (i % 2) * 0.5f) * Mathf.PI * 2);
                        lapset[i].localPosition = q + new Vector3(0, nousu, 0);
                        lapset[i].localRotation = Quaternion.LookRotation(Vector3.Cross(Vector3.up, q).normalized, Vector3.up);
                    }
                },
            },
        };

        static ElavatElementit instanssi;
        public static bool Paalla = true;

        LinssiOhjain ohjain;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        readonly List<UnityEngine.Object> roskat = new();
        Func<bool> kaynnissa;
        float nopeus, aika;
        bool jokinNakyvissa;

        public static void Kytke(LinssiOhjain o)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null || instanssi != null) return;
            var go = new GameObject("ElavatElementit");
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            instanssi = go.AddComponent<ElavatElementit>();
            instanssi.ohjain = o;
            instanssi.georeferenssi = kierto.georeferenssi;
            instanssi.kamera = kierto.GetComponent<Camera>();
        }

        /// <summary>Testikomento "elava elementit tila|0|1".</summary>
        public static void Testi(string arvo, LinssiOhjain o)
        {
            if (arvo == "0" || arvo == "1") { Paalla = arvo == "1"; PallonLepo.Muuttui("elävät elementit"); }
            o.Kirjaa("elävät elementit: " + Tila());
        }

        public static string Tila()
        {
            if (instanssi == null) return "ei kytketty";
            var osat = new List<string>();
            foreach (var a in Aiheet) osat.Add($"{a.Nimi} {(a.Nakyvissa ? $"näkyvissä (peitto {a.Peitto:F2})" : "ei näkyvissä")}, {a.Kolmioita} kolmiota");
            return $"{(Paalla ? "päällä" : "pois")}; {string.Join("; ", osat)}; liike {instanssi.nopeus:F2}, kerros {ElavaKerros.Nyt}";
        }

        void Start()
        {
            var s = Resources.Load<Shader>("Varjostimet/Malli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA elävät elementit: Malli-varjostin puuttuu"); enabled = false; return; }
            foreach (var a in Aiheet)
            {
                a.Oliot.Clear();
                a.Materiaali = new Material(s) { name = a.Nimi };
                roskat.Add(a.Materiaali);
                var runko = a.Runko(); var roottori = a.Roottori(); var lapsi = a.Lapsi?.Invoke();
                roskat.Add(runko); roskat.Add(roottori); if (lapsi != null) roskat.Add(lapsi);
                int lapsia = a.LastenPaikat?.Length ?? 0;
                a.Kolmioita = (runko.triangles.Length + roottori.triangles.Length + (lapsi != null ? lapsi.triangles.Length * lapsia : 0)) / 3;
                foreach (var (_, _, vaihe) in a.Yksilot)
                {
                    var juuri = new GameObject(a.Nimi).transform;
                    juuri.SetParent(transform, false);
                    Kappale(juuri, "Runko", runko, a.Materiaali);
                    var rt = new GameObject("Roottori").transform;
                    rt.SetParent(juuri, false);
                    Kappale(rt, "Roottori", roottori, a.Materiaali);
                    var lapset = new Transform[lapsia];
                    for (int i = 0; i < lapsia; i++)
                    {
                        lapset[i] = new GameObject("Lapsi").transform;
                        lapset[i].SetParent(rt, false);
                        Kappale(lapset[i], "Lapsi", lapsi, a.Materiaali);
                    }
                    juuri.gameObject.SetActive(false);
                    a.Oliot.Add((juuri, rt, lapset, vaihe));
                    a.Animoi(rt, lapset, vaihe);
                }
            }
            Debug.Log($"MATKAKIRJA elävät elementit: {Tila()}");
        }

        void Kappale(Transform isa, string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(isa, false);
            if (ElavaKerros.Taso >= 0) go.layer = ElavaKerros.Taso;
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        void OnEnable()
        {
            kaynnissa = () => jokinNakyvissa && (nopeus > 0.001f || Liikkuu());
            ElavaKerros.Animoi(kaynnissa, "elävät elementit", 30);
        }

        void OnDisable() { if (kaynnissa != null) ElavaKerros.Poista(kaynnissa); }

        void OnDestroy()
        {
            foreach (var o in roskat) if (o != null) Destroy(o);
            if (instanssi == this) instanssi = null;
        }

        bool Liikkuu() => Paalla && !ElavaKerros.Staattinen && !(ohjain != null && ohjain.VahennettyLiike);

        void LateUpdate()
        {
            if (kamera == null || georeferenssi == null) return;
            var gt = georeferenssi.transform;
            Vector3 kameraL = gt.InverseTransformPoint(kamera.transform.position);
            var c0 = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double korkeus = (kameraL - c0).magnitude - 6_371_000;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            // Pop-up-asento (simulaattori 26.9.: pinnan normaalin mukaan pystyssä ylhäältä katsottuna näkyi vain katto):
            // aihe seisoo ruudun ylösuuntaan ja katsoo kameraa kohti SivuKulma-kierrettynä; kallistettaessa ruudun ylös
            // lähestyy pinnan normaalia, joten aihe nousee pystyyn.
            Vector3 kameraYlos = gt.InverseTransformDirection(kamera.transform.up).normalized;
            Vector3 kohtiKameraa = -gt.InverseTransformDirection(kamera.transform.forward).normalized;
            var asento = Quaternion.AngleAxis(SivuKulma, kameraYlos) * Quaternion.LookRotation(kohtiKameraa, kameraYlos);

            // Liike pehmeästi kohti 1/0 (PehmeysS); aika kulkee nopeuden mukaan (animaatiot ajan funktioita).
            nopeus = Mathf.MoveTowards(nopeus, Liikkuu() ? 1f : 0f, Time.unscaledDeltaTime / PehmeysS);
            aika += nopeus * Time.unscaledDeltaTime;

            bool jokin = false;
            foreach (var a in Aiheet)
            {
                Vector3 juuri = Paikka(a.Paikka, 25);
                Vector3 ylos = (juuri - c0).normalized;
                float p = Paalla && korkeus >= NakyyAlkaenM && korkeus <= NakyyAstiM && Vector3.Dot(kameraL - juuri, ylos) > 0
                    ? Mathf.Clamp01((float)((NakyyAstiM - korkeus) / (NakyyAstiM - HaipyyAlkaenM))) : 0f;
                bool nyt = p > 0.001f;
                if (nyt != a.Nakyvissa)
                {
                    a.Nakyvissa = nyt;
                    foreach (var o in a.Oliot) o.juuri.gameObject.SetActive(nyt);
                    PallonLepo.Muuttui("elävät elementit");
                }
                if (!Mathf.Approximately(p, a.Peitto)) { a.Peitto = p; a.Materiaali.SetFloat("_Peitto", p); }
                if (!a.Nakyvissa) continue;
                jokin = true;
                // Koko ruudulla vakio; yksilöiden rivi asettuu ruudulla vaakaan kamerasta riippumatta.
                float pt = 2f * LinssiOhjain.Pistekerroin * (kameraL - juuri).magnitude * tanPuoli / Mathf.Max(1, Screen.height);
                Vector3 oikea = gt.InverseTransformDirection(kamera.transform.right);
                oikea = (oikea - ylos * Vector3.Dot(oikea, ylos)).normalized;
                Vector3 eteen = Vector3.Cross(oikea, ylos);
                float kerroin = a.KokoPt * pt;
                for (int i = 0; i < a.Oliot.Count; i++)
                {
                    var (j, rt, lapset, vaihe) = a.Oliot[i];
                    var (x, y, _) = a.Yksilot[i];
                    // Nosto kameraa kohti rungon syvyyden verran, ettei pop-up-malli painu maaston sisään (ZTest LEqual).
                    j.localPosition = juuri + (oikea * x + eteen * y) * pt + kohtiKameraa * (0.55f * kerroin);
                    j.localRotation = asento;
                    j.localScale = Vector3.one * kerroin;
                    if (nopeus > 0.0001f) a.Animoi(rt, lapset, aika * (1f + 0.07f * i) + vaihe);
                }
            }
            jokinNakyvissa = jokin;
        }

        Vector3 Paikka(LatLon q, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.Lon, q.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }
    }

    /// <summary>Löydöksen 160 paletti (Sisältökirjurin poiminta 26.9.) ja tummempi sage varjopinnoille.</summary>
    public static class MalliVarit
    {
        public static readonly Color Sage = Hex(0x7a9a92), SageVarjo = Hex(0x5f7e77), Varjo = Hex(0x887858),
            Pinta = Hex(0xc8b898), Valo = Hex(0xe8d8b8), Terrakotta = Hex(0xb8785e);

        public static Color Hex(int rgb) => new Color(((rgb >> 16) & 255) / 255f, ((rgb >> 8) & 255) / 255f, (rgb & 255) / 255f, 1f);
    }

    /// <summary>Tasavarjostetun low-poly-mallin rakentaja (omat normaalit tahkoittain, kärkivärit).</summary>
    public sealed class MalliRakenne
    {
        public readonly List<Vector3> P = new(), N = new();
        public readonly List<Color> C = new();
        public readonly List<int> T = new();

        public void Nelio(Vector3 a, Vector3 b, Vector3 c, Vector3 d, Color v)
        {
            var n = Vector3.Cross(b - a, d - a).normalized;
            int k = P.Count;
            P.AddRange(new[] { a, b, c, d }); for (int i = 0; i < 4; i++) { N.Add(n); C.Add(v); }
            T.AddRange(new[] { k, k + 1, k + 2, k, k + 2, k + 3 });
        }

        public void Kolmio(Vector3 a, Vector3 b, Vector3 c, Color v)
        {
            var n = Vector3.Cross(b - a, c - a).normalized;
            int k = P.Count;
            P.AddRange(new[] { a, b, c }); for (int i = 0; i < 3; i++) { N.Add(n); C.Add(v); }
            T.AddRange(new[] { k, k + 1, k + 2 });
        }

        /// <summary>Kahdeksankulmainen kapeneva vaippa korkeuksilta y0 → y1 säteillä r0 → r1.</summary>
        public void Vaippa(float y0, float r0, float y1, float r1, Color ala, Color yla, int sivuja = 8)
        {
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja, a1 = (i + 1) * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja;
                Vector3 p00 = new(Mathf.Cos(a0) * r0, y0, Mathf.Sin(a0) * r0), p10 = new(Mathf.Cos(a1) * r0, y0, Mathf.Sin(a1) * r0);
                Vector3 p01 = new(Mathf.Cos(a0) * r1, y1, Mathf.Sin(a0) * r1), p11 = new(Mathf.Cos(a1) * r1, y1, Mathf.Sin(a1) * r1);
                // Tahkojen vuorottelu antaa kaiverruksen laudoitusvaikutelman ilman tekstuuria.
                Nelio(p00, p10, p11, p01, Color.Lerp(ala, yla, i % 2 == 0 ? 0.35f : 0.6f));
            }
        }

        /// <summary>Raidallinen vaippa (karusellin katos): tahkot vuorotellen värein c1 ja c2.</summary>
    public void VaippaRaidat(float y0, float r0, float y1, float r1, Color c1, Color c2, int sivuja = 16)
    {
        for (int i = 0; i < sivuja; i++)
        {
            float a0 = i * Mathf.PI * 2 / sivuja, a1 = (i + 1) * Mathf.PI * 2 / sivuja;
            Vector3 p00 = new(Mathf.Cos(a0) * r0, y0, Mathf.Sin(a0) * r0), p10 = new(Mathf.Cos(a1) * r0, y0, Mathf.Sin(a1) * r0);
            Vector3 p01 = new(Mathf.Cos(a0) * r1, y1, Mathf.Sin(a0) * r1), p11 = new(Mathf.Cos(a1) * r1, y1, Mathf.Sin(a1) * r1);
            Nelio(p00, p10, p11, p01, i % 2 == 0 ? c1 : c2);
        }
    }

    public void Kansi(float y, float r, Color v, int sivuja = 8, bool ylos = true)
        {
            var keski = new Vector3(0, y, 0);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja, a1 = (i + 1) * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja;
                Vector3 p0 = new(Mathf.Cos(a0) * r, y, Mathf.Sin(a0) * r), p1 = new(Mathf.Cos(a1) * r, y, Mathf.Sin(a1) * r);
                if (ylos) Kolmio(keski, p1, p0, v); else Kolmio(keski, p0, p1, v);
            }
        }

        /// <summary>Laatikko keskipisteestä puolikoolla (siipipuut, lavan tuet).</summary>
        public void Laatikko(Vector3 k, Vector3 h, Color v)
        {
            Vector3 x = new(h.x, 0, 0), y = new(0, h.y, 0), z = new(0, 0, h.z);
            Nelio(k - x - y + z, k + x - y + z, k + x + y + z, k - x + y + z, v);
            Nelio(k + x - y - z, k - x - y - z, k - x + y - z, k + x + y - z, v);
            Nelio(k - x - y - z, k - x - y + z, k - x + y + z, k - x + y - z, v);
            Nelio(k + x - y + z, k + x - y - z, k + x + y - z, k + x + y + z, v);
            Nelio(k - x + y + z, k + x + y + z, k + x + y - z, k - x + y - z, v);
            Nelio(k - x - y - z, k + x - y - z, k + x - y + z, k - x - y + z, v);
        }

        public Mesh Mesh(string nimi)
        {
            var m = new Mesh { name = nimi };
            m.SetVertices(P); m.SetNormals(N); m.SetColors(C); m.SetTriangles(T, 0);
            m.RecalculateBounds();
            m.bounds = new Bounds(m.bounds.center, m.bounds.size + Vector3.one * 0.8f);   // siivet pyörivät
            return m;
        }
    }

    /// <summary>
    /// Proseduraalinen hollantilainen kattomylly (smock mill), korkeus 1 yksikkö, juuri origossa, +y ylös, +z tuuleen päin.
    /// Kahdeksankulmainen kapeneva runko, lava (stelling), kupolimainen lakki ja neljä ristikkosiipeä. Tasainen varjostus
    /// (omat normaalit tahkoittain) ja kärkivärit löydöksen 160 paletista.
    /// </summary>
    public static class MyllyGeometria
    {
        public const float AkselinNousu = 10f;
        public static readonly Vector3 Akseli = new Vector3(0, 0.70f, 0.15f);

        static Color Sage => MalliVarit.Sage; static Color SageVarjo => MalliVarit.SageVarjo; static Color Varjo => MalliVarit.Varjo;
        static Color Pinta => MalliVarit.Pinta; static Color Valo => MalliVarit.Valo; static Color Terrakotta => MalliVarit.Terrakotta;

        public static Mesh Runko()
        {
            var r = new MalliRakenne();
            r.Vaippa(0f, 0.30f, 0.20f, 0.27f, Pinta, Varjo);                     // tiilijalusta
            r.Vaippa(0.20f, 0.27f, 0.62f, 0.17f, SageVarjo, Sage);               // kattomyllyn vaippa
            r.Vaippa(0.215f, 0.40f, 0.235f, 0.40f, Varjo, Varjo);                // lavan reuna
            r.Kansi(0.235f, 0.40f, Varjo);                                       // lava
            r.Kansi(0.215f, 0.40f, Varjo, ylos: false);
            r.Vaippa(0.62f, 0.19f, 0.72f, 0.15f, Terrakotta, Varjo);             // lakki
            r.Vaippa(0.72f, 0.15f, 0.80f, 0.05f, Varjo, Terrakotta);
            r.Kansi(0.80f, 0.05f, Varjo);
            r.Laatikko(new Vector3(0, 0.70f, 0.09f), new Vector3(0.025f, 0.025f, 0.07f), Varjo);   // akselin pää
            r.Laatikko(new Vector3(0, 0.07f, 0.29f), new Vector3(0.05f, 0.07f, 0.012f), Varjo);    // ovi
            return r.Mesh("Mylly: runko");
        }

        public static Mesh Siivet()
        {
            var r = new MalliRakenne();
            const float pituus = 0.52f, leveys = 0.10f, alku = 0.07f;
            for (int i = 0; i < 4; i++)
            {
                var q = Quaternion.Euler(0, 0, i * 90f);
                // Siipipuu (keskeltä kärkeen) ja ristikko sen toisella puolella: kehys ja kolme poikkipuuta.
                var puoli = i % 2 == 0 ? new Vector3(0.012f, pituus * 0.5f, 0.01f) : new Vector3(pituus * 0.5f, 0.012f, 0.01f);
                r.Laatikko(q * new Vector3(0, pituus * 0.5f, 0), puoli, Varjo);
                Vector3 a = q * new Vector3(0.012f, alku, 0), b = q * new Vector3(leveys, alku, 0),
                    c = q * new Vector3(leveys, pituus, 0), d = q * new Vector3(0.012f, pituus, 0);
                r.Nelio(a, b, c, d, Valo);
                for (int k = 1; k <= 3; k++)
                {
                    float t = alku + (pituus - alku) * k / 4f;
                    Vector3 p0 = q * new Vector3(0.012f, t - 0.006f, 0.002f), p1 = q * new Vector3(leveys, t - 0.006f, 0.002f),
                        p2 = q * new Vector3(leveys, t + 0.006f, 0.002f), p3 = q * new Vector3(0.012f, t + 0.006f, 0.002f);
                    r.Nelio(p0, p1, p2, p3, Varjo);
                }
            }
            r.Laatikko(Vector3.zero, new Vector3(0.03f, 0.03f, 0.02f), Varjo);   // napa
            return r.Mesh("Mylly: siivet");
        }
    }

    /// <summary>
    /// Proseduraalinen karuselli (Tivoli, kokeilu 2): leveys 1,16, korkeus noin 0,9, juuri origossa, +y ylös. Runko on
    /// paikallaan pysyvä lava; Katos (pyörivä osa) on raidallinen kartiokatto helmoineen, keskipylväs ja kahdeksan tankoa;
    /// hevoset ovat katoksen lapsia (HevostenPaikat), ja ne nousevat ja laskevat tankoja pitkin.
    /// </summary>
    public static class KaruselliGeometria
    {
        const int Hevosia = 8;
        const float HevostenSade = 0.38f, HevostenKorkeus = 0.2f;
        static Vector3[] paikat;

        public static Vector3[] HevostenPaikat()
        {
            if (paikat != null) return paikat;
            paikat = new Vector3[Hevosia];
            for (int i = 0; i < Hevosia; i++)
            {
                float a = i * Mathf.PI * 2 / Hevosia + Mathf.PI / Hevosia;
                paikat[i] = new Vector3(Mathf.Cos(a) * HevostenSade, HevostenKorkeus, Mathf.Sin(a) * HevostenSade);
            }
            return paikat;
        }

        public static Mesh Runko()
        {
            var r = new MalliRakenne();
            r.Vaippa(0f, 0.60f, 0.05f, 0.58f, MalliVarit.Varjo, MalliVarit.Pinta, 16);
            r.Kansi(0.05f, 0.58f, MalliVarit.Pinta, 16);
            r.Vaippa(0.05f, 0.62f, 0.02f, 0.66f, MalliVarit.Varjo, MalliVarit.Varjo, 16);   // porras
            return r.Mesh("Karuselli: lava");
        }

        public static Mesh Katos()
        {
            var r = new MalliRakenne();
            r.Vaippa(0.05f, 0.08f, 0.52f, 0.07f, MalliVarit.Varjo, MalliVarit.Pinta, 8);           // keskipylväs
            r.VaippaRaidat(0.46f, 0.58f, 0.53f, 0.58f, MalliVarit.Valo, MalliVarit.Terrakotta);     // helma
            r.VaippaRaidat(0.53f, 0.60f, 0.84f, 0.05f, MalliVarit.Terrakotta, MalliVarit.Valo);     // kartiokatto
            r.Kansi(0.46f, 0.58f, MalliVarit.Varjo, 16, ylos: false);                              // katon alapinta
            r.Laatikko(new Vector3(0, 0.88f, 0), new Vector3(0.012f, 0.05f, 0.012f), MalliVarit.Varjo);   // tanko
            r.Kolmio(new Vector3(0.012f, 0.93f, 0), new Vector3(0.11f, 0.905f, 0), new Vector3(0.012f, 0.88f, 0), MalliVarit.Terrakotta);  // viiri
            foreach (var q in HevostenPaikat())
                r.Laatikko(new Vector3(q.x, 0.285f, q.z), new Vector3(0.008f, 0.235f, 0.008f), MalliVarit.Pinta);   // tangot
            return r.Mesh("Karuselli: katos");
        }

        /// <summary>Hevonen +z eteenpäin, keskipiste origossa: runko, kaula, pää, satula ja neljä jalkaa laukassa.</summary>
        public static Mesh Hevonen()
        {
            var r = new MalliRakenne();
            r.Laatikko(new Vector3(0, 0, 0), new Vector3(0.028f, 0.032f, 0.075f), MalliVarit.Valo);             // runko
            r.Laatikko(new Vector3(0, 0.045f, 0.07f), new Vector3(0.02f, 0.035f, 0.018f), MalliVarit.Valo);       // kaula
            r.Laatikko(new Vector3(0, 0.08f, 0.1f), new Vector3(0.018f, 0.018f, 0.035f), MalliVarit.Valo);        // pää
            r.Laatikko(new Vector3(0, 0.06f, 0.055f), new Vector3(0.006f, 0.03f, 0.02f), MalliVarit.Varjo);       // harja
            r.Laatikko(new Vector3(0, 0.036f, -0.005f), new Vector3(0.03f, 0.006f, 0.03f), MalliVarit.Terrakotta); // satula
            r.Laatikko(new Vector3(0, 0.01f, -0.09f), new Vector3(0.006f, 0.03f, 0.012f), MalliVarit.Varjo);      // häntä
            foreach (var (x, z, kallistus) in new[] { (0.017f, 0.05f, 35f), (-0.017f, 0.05f, 35f), (0.017f, -0.055f, -30f), (-0.017f, -0.055f, -30f) })
            {
                var q = Quaternion.Euler(kallistus, 0, 0);
                var k = new Vector3(x, -0.03f, z) + q * new Vector3(0, -0.035f, 0);
                r.Laatikko(k, new Vector3(0.006f, 0.035f, 0.006f), MalliVarit.Varjo);   // jalat (akselin suuntaiset, kallistus paikasta)
            }
            return r.Mesh("Karuselli: hevonen");
        }
    }
}
