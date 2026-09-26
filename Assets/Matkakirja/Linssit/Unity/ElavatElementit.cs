// ELÄVÄT ELEMENTIT kaupungeissa (omistaja 26.9.2026 klo 10.0x: niukkuus ja sulava, elävä animointi; selvitys
// docs/raportit/elavat-elementit-selvitys-20260926.md, omistaja hyväksyi järjestyksen). Kokeilu 1: Zaandamin kolme
// tuulimyllyä Amsterdamin vieressä. Vain siivet pyörivät (1 kierros 7–9 s, eri vaiheissa), runko on paikallaan.
//
// Malli on proseduraalinen low-poly (tämä tiedosto, noin 300 kolmiota myllyä kohden) löydöksen 160 paletilla:
// runko sage #7a9a92 varjostettuna, lakki ja lava varjo #887858, siivet valo #e8d8b8 ja puut varjo. Natiivisepän
// Blender-malli voi korvata sen myöhemmin (sama juuri, sama siipiakseli). Varjostin Matkakirja/Linssit/Malli.
//
// Piirto: Elava-layer ja ElavaKerros.Animoi (161 B), joten kamera paikallaan piirretään vain siivet 30 fps:llä
// talletetun kartan päälle, ja kun myllyt eivät näy (korkeus, ruutu), animaatio ei käy (0 kehystä). Koko on vakio
// ruudulla (MyllyPt), kuten kaupunkimerkeillä, ja näkyvyys on 15–600 km:n korkeudella, häivytys 450–600 km:n välillä.
// Vähennetty liike ja ElavaKerros.Staattinen (lämpö, virransäästö) pysäyttävät siivet (pehmeästi 0,6 s).
// Komento: "elava myllyt tila|0|1".
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
        /// <summary>Myllyn korkeus ruutupisteinä (liioiteltu, jotta aihe erottuu maakuntanäkymässä).</summary>
        public const float MyllyPt = 34f;
        public const double NakyyAlkaenM = 15_000, NakyyAstiM = 600_000, HaipyyAlkaenM = 450_000;
        public const float PehmeysS = 0.6f;

        /// <summary>Zaanse Schans (Zaandam), Amsterdamin vieressä.</summary>
        static readonly LatLon Zaandam = new LatLon(52.4735, 4.8166);
        /// <summary>Myllyt ruudulla (itä, pohjoinen) pisteinä juuresta, kierrosaika ja vaihe.</summary>
        static readonly (float x, float y, float kierrosS, float vaihe)[] Myllyt =
        {
            (-26f, -4f, 7.4f, 0f), (0f, 3f, 8.3f, 31f), (25f, -2f, 9.1f, 67f),
        };

        static ElavatElementit instanssi;
        public static bool Paalla = true;

        LinssiOhjain ohjain;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        Material materiaali;
        Mesh runkoMesh, siivetMesh;
        readonly List<(Transform juuri, Transform siivet, float kierrosS, float kulma)> myllyt = new();
        readonly List<UnityEngine.Object> roskat = new();
        Func<bool> kaynnissa;
        float nopeus, peitto = -1;
        bool nakyvissa;

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

        /// <summary>Testikomento "elava myllyt tila|0|1".</summary>
        public static void Testi(string arvo, LinssiOhjain o)
        {
            if (arvo == "0" || arvo == "1") { Paalla = arvo == "1"; PallonLepo.Muuttui("elävät elementit"); }
            o.Kirjaa("elävät elementit: " + Tila());
        }

        public static string Tila() => instanssi == null ? "ei kytketty" :
            $"myllyt {(Paalla ? "päällä" : "pois")}, {(instanssi.nakyvissa ? "näkyvissä" : "ei näkyvissä")}, peitto {instanssi.peitto:F2}, " +
            $"siivet {instanssi.nopeus:F2} × nopeus, kolmioita {(instanssi.runkoMesh == null ? 0 : (instanssi.runkoMesh.triangles.Length + instanssi.siivetMesh.triangles.Length) / 3)} / mylly, kerros {ElavaKerros.Nyt}";

        void Start()
        {
            var s = Resources.Load<Shader>("Varjostimet/Malli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA elävät elementit: Malli-varjostin puuttuu"); enabled = false; return; }
            materiaali = new Material(s) { name = "Mylly" };
            roskat.Add(materiaali);
            runkoMesh = MyllyGeometria.Runko(); roskat.Add(runkoMesh);
            siivetMesh = MyllyGeometria.Siivet(); roskat.Add(siivetMesh);
            foreach (var (_, _, kierros, vaihe) in Myllyt)
            {
                var juuri = new GameObject("Mylly").transform;
                juuri.SetParent(transform, false);
                Kappale(juuri, "Runko", runkoMesh);
                var siivet = new GameObject("Siivet").transform;
                siivet.SetParent(juuri, false);
                siivet.localPosition = MyllyGeometria.Akseli;
                siivet.localRotation = Quaternion.Euler(-MyllyGeometria.AkselinNousu, 0, 0);
                Kappale(siivet, "Siipiristi", siivetMesh);
                myllyt.Add((juuri, siivet, kierros, vaihe));
            }
            Debug.Log($"MATKAKIRJA elävät elementit: myllyt Zaandamissa, {Tila()}");
        }

        void Kappale(Transform isa, string nimi, Mesh mesh)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(isa, false);
            if (ElavaKerros.Taso >= 0) go.layer = ElavaKerros.Taso;
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        void OnEnable()
        {
            kaynnissa = () => nakyvissa && (nopeus > 0.001f || Liikkuu());
            ElavaKerros.Animoi(kaynnissa, "myllyt", 30);
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
            if (materiaali == null || kamera == null) return;
            var gt = georeferenssi.transform;
            Vector3 kameraL = gt.InverseTransformPoint(kamera.transform.position);
            var c0 = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double korkeus = (kameraL - c0).magnitude - 6_371_000;
            Vector3 juuri = Paikka(Zaandam, 25);
            Vector3 ylos = (juuri - c0).normalized;
            // Näkyy: korkeusikkuna ja juuri kameran puolella (horisontin takana piiloon).
            float p = Paalla && korkeus >= NakyyAlkaenM && korkeus <= NakyyAstiM && Vector3.Dot(kameraL - juuri, ylos) > 0
                ? Mathf.Clamp01((float)((NakyyAstiM - korkeus) / (NakyyAstiM - HaipyyAlkaenM))) : 0f;
            bool nyt = p > 0.001f;
            if (nyt != nakyvissa)
            {
                nakyvissa = nyt;
                foreach (var m in myllyt) m.juuri.gameObject.SetActive(nyt);
                PallonLepo.Muuttui("elävät elementit");
            }
            if (!Mathf.Approximately(p, peitto)) { peitto = p; materiaali.SetFloat("_Peitto", p); }
            if (!nakyvissa) return;

            // Koko ruudulla vakio: ruutupisteen pituus juuren kohdalla.
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float pt = 2f * LinssiOhjain.Pistekerroin * (kameraL - juuri).magnitude * tanPuoli / Mathf.Max(1, Screen.height);
            Vector3 ita = PinnanIta(ylos);
            // Ruudun suunnat pinnalla: myllyrivi asettuu ruudulla vaakaan kamerasta riippumatta.
            Vector3 oikea = gt.InverseTransformDirection(kamera.transform.right);
            oikea = (oikea - ylos * Vector3.Dot(oikea, ylos)).normalized;
            Vector3 eteen = Vector3.Cross(oikea, ylos);

            // Siivet: nopeus pehmeästi kohti 1/0 (PehmeysS), kulma ajan mukaan.
            float tavoite = Liikkuu() ? 1f : 0f;
            nopeus = Mathf.MoveTowards(nopeus, tavoite, Time.unscaledDeltaTime / PehmeysS);
            float kerroin = MyllyPt * pt;
            for (int i = 0; i < myllyt.Count; i++)
            {
                var (j, s, kierrosS, kulma) = myllyt[i];
                var (x, y, _, _) = Myllyt[i];
                j.localPosition = juuri + (oikea * x + eteen * y) * pt;
                // Siivet tuuleen (länsi, vallitseva tuuli): mylly katsoo länteen, ja runko on pystyssä pinnan normaalin mukaan.
                j.localRotation = Quaternion.LookRotation(-ita, ylos);
                j.localScale = Vector3.one * kerroin;
                kulma = (kulma + 360f * nopeus * Time.unscaledDeltaTime / kierrosS) % 360f;
                s.localRotation = Quaternion.Euler(-MyllyGeometria.AkselinNousu, 0, 0) * Quaternion.Euler(0, 0, kulma);
                myllyt[i] = (j, s, kierrosS, kulma);
            }
        }

        Vector3 PinnanIta(Vector3 ylos)
        {
            // ECEF-akseli z (pohjoisnapa) georeferenssin avaruudessa; itä = z × ylös.
            var napa = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1));
            var ita = Vector3.Cross(napa, ylos);
            return ita.sqrMagnitude > 1e-8f ? ita.normalized : Vector3.right;
        }

        Vector3 Paikka(LatLon q, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.Lon, q.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
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

        static readonly Color Sage = Hex(0x7a9a92), SageVarjo = Hex(0x5f7e77), Varjo = Hex(0x887858),
            Pinta = Hex(0xc8b898), Valo = Hex(0xe8d8b8), Terrakotta = Hex(0xb8785e);

        static Color Hex(int rgb) => new Color(((rgb >> 16) & 255) / 255f, ((rgb >> 8) & 255) / 255f, (rgb & 255) / 255f, 1f);

        sealed class Rakenne
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

        public static Mesh Runko()
        {
            var r = new Rakenne();
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
            var r = new Rakenne();
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
}
