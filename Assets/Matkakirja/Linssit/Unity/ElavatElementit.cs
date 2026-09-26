// ELÄVÄT ELEMENTIT kaupungeissa (omistaja 26.9.2026 klo 10.0x: niukkuus ja sulava, elävä animointi; selvitys
// docs/raportit/elavat-elementit-selvitys-20260926.md, omistaja hyväksyi järjestyksen). Yksi liikkuva aihe kaupunkia
// kohden, ja kukin aihe on yksi Aihe-määrittely: paikka, yksilöt ruudulla, runko, pyörivä osa ja animaatio.
//   kokeilu 1  Zaandamin kolme tuulimyllyä (vain siivet pyörivät, 7–9 s/kierros)
//   kokeilu 2  Tivolin ketjukaruselli Kööpenhaminassa (katos 10 s/kierros, istuimet keinuvat ulospäin aaltoillen, lamput)
//
// Mallit ovat proseduraalisia low-poly-malleja löydöksen 160 paletilla (MalliVarit) ja varjostimella
// Matkakirja/Linssit/Malli. Natiivisepän Blender-mallit voivat korvata ne myöhemmin (sama juuri ja sama pyörivä osa).
// Piirto: Elava-layer ja ElavaKerros.Animoi (161 B): kamera paikallaan piirretään vain aiheet 30 fps:llä talletetun
// kartan päälle, ja kun mikään aihe ei näy (korkeus, horisontti), animaatio ei käy (0 kehystä). Aito 3D-asento (omistaja
// 17.1x: ylhäältä katto, kallistettaessa kylki; pop-up poistettu): pystyssä pinnan normaalin mukaan ja käännettynä aiheen
// Suunta-kulmaan pohjoisesta. Koko vakio ruudulla, näkyvyys 15–600 km, häivytys 450 km:stä. Vähennetty
// liike ja ElavaKerros.Staattinen pysäyttävät liikkeen pehmeästi (0,6 s).
// Komento: "elava elementit tila|0|1" (myös "elava myllyt").
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class ElavatElementit : MonoBehaviour
    {
        public const double NakyyAlkaenM = 15_000, NakyyAstiM = 600_000, HaipyyAlkaenM = 450_000;
        public const float PehmeysS = 0.6f, RuutuVara = 0.12f;

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
            public Func<Mesh> Lapsi;          // valinnainen: pyörivän osan lapset (karusellin istuimet)
            public Func<Mesh> Valot;          // valinnainen: roottorin lamput (hillitty hehku, ei valaistusta)
            public Vector3[] LastenPaikat;    // lasten paikat roottorin avaruudessa
            public Action<Transform, Transform[], float, float> Animoi;   // (roottori, lapset, aika s, nopeus 0–1)
            /// <summary>Maapohjan säde mallin yksiköissä (omistaja 16.5x: ei leijuntaa, jokainen aihe istuu maahan).</summary>
            public float PohjaSade = 0.6f;
            /// <summary>Mallin +z-suunta asteina pohjoisesta myötäpäivään (myllyt tuuleen lounaaseen, näkyvät etelän kallistuksesta).</summary>
            public float Suunta = 180f;
            /// <summary>Värien haalistus kohti pergamenttia (Malli-varjostimen _Haalistus).</summary>
            public float Haalistus;
            // Ajonaikaiset
            public readonly List<Yksilo> Oliot = new();
            /// <summary>Vaihtelu ja tauot yksilölle i (omistaja 16.5x: ei monotoniaa), siemenellä toistettava.</summary>
            public Func<int, Vaihtelu> Vaihtelu;
            public readonly List<Transform> Pohjat = new();
            public int Kolmioita;
            public bool Nakyvissa;
            public float Peitto = -1;
            public Material Materiaali, PohjaMateriaali, ValoMateriaali;
        }

        static readonly Aihe[] Aiheet =
        {
            new Aihe
            {
                // Myllyt: puuskat ±35 %, ja joskus yksi seisoo 25–70 s (20 % jaksoista).
                Vaihtelu = i => new Vaihtelu(101 + i) { KayMinS = 90, KayMaxS = 240, SeisooMinS = 25, SeisooMaxS = 70, TaukoTod = 0.2, Puuska = 0.35 },
                Nimi = "myllyt", Paikka = new LatLon(52.4735, 4.8166), KokoPt = 34f,   // Zaanse Schans, Zaandam
                Yksilot = new[] { (-26f, -4f, 0f), (0f, 3f, 2.4f), (25f, -2f, 5.1f) },
                Runko = MyllyGeometria.Runko, Roottori = MyllyGeometria.Siivet, PohjaSade = 0.45f, Suunta = 210f,
                // Siivet akselin ympäri, jokaisella oma tahti (7,4 / 8,3 / 9,1 s): tahti vaiheesta.
                Animoi = (roottori, _, t, _) =>
                {
                    roottori.localPosition = MyllyGeometria.Akseli;
                    roottori.localRotation = Quaternion.Euler(-MyllyGeometria.AkselinNousu, 0, 0) * Quaternion.Euler(0, 0, t * 360f / 8.3f);
                },
            },
            new Aihe
            {
                // Karuselli: käy 60–150 s, hidastuu, seisoo 20–60 s ja kiihtyy uudelleen.
                Vaihtelu = i => new Vaihtelu(211 + i) { KayMinS = 60, KayMaxS = 150, SeisooMinS = 20, SeisooMaxS = 60, TaukoTod = 1, Puuska = 0.05 },
                Nimi = "karuselli", Paikka = new LatLon(55.6737, 12.5681), KokoPt = 38f,   // Tivoli, Kööpenhamina
                Yksilot = new[] { (0f, 0f, 0f) },
                Runko = KaruselliGeometria.Runko, Roottori = KaruselliGeometria.Katos, Lapsi = KaruselliGeometria.Istuin,
                Valot = KaruselliGeometria.Lamput,
                PohjaSade = 0.95f, Haalistus = 0.25f,
                LastenPaikat = KaruselliGeometria.Ripustukset(),
                Animoi = KaruselliGeometria.Animoi,
            },
        };

        static ElavatElementit instanssi;
        public static bool Paalla = true;
        static double AikaSiirto;

        LinssiOhjain ohjain;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        readonly List<UnityEngine.Object> roskat = new();
        Func<bool> kaynnissa;
        float liike;
        bool jokinNakyvissa, jokinLiikkuu;

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
            // "elava elementit siirra <s>": aikataulun kello siirtyy (todennus: hidastus ja tauko videolle).
            if (arvo != null && arvo.StartsWith("siirra ") && double.TryParse(arvo.Substring(7), System.Globalization.NumberStyles.Float,
                System.Globalization.CultureInfo.InvariantCulture, out var siirto)) AikaSiirto += siirto;
            if (arvo == "0" || arvo == "1") { Paalla = arvo == "1"; PallonLepo.Muuttui("elävät elementit"); }
            o.Kirjaa("elävät elementit: " + Tila());
        }

        public static string Tila()
        {
            if (instanssi == null) return "ei kytketty";
            var osat = new List<string>();
            double nyt = Time.unscaledTimeAsDouble + AikaSiirto;
            foreach (var a in Aiheet)
            {
                var yk = a.Oliot.Count > 0 ? a.Oliot[0] : null;
                string tauko = yk?.Aikataulu == null ? "" : $", nopeus {yk.Nopeus:F2}, seuraava tauko {yk.Aikataulu.SeuraavaTauko(nyt) - nyt:F0} s";
                osat.Add($"{a.Nimi} {(a.Nakyvissa ? $"näkyvissä (peitto {a.Peitto:F2})" : "ei näkyvissä")}, {a.Kolmioita} kolmiota{tauko}");
            }
            return $"{(Paalla ? "päällä" : "pois")}; {string.Join("; ", osat)}; liike {instanssi.liike:F2}, kerros {ElavaKerros.Nyt}";
        }

        void Start()
        {
            var s = Resources.Load<Shader>("Varjostimet/Malli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA elävät elementit: Malli-varjostin puuttuu"); enabled = false; return; }
            foreach (var a in Aiheet)
            {
                a.Oliot.Clear();
                a.Materiaali = new Material(s) { name = a.Nimi };
                a.Materiaali.SetFloat("_Haalistus", a.Haalistus);
                roskat.Add(a.Materiaali);
                // Maapohja ja pehmeä varjo: maaston päällä (ZTest Always, ZWrite Off), mallia ennen (jono 3010).
                a.PohjaMateriaali = new Material(s) { name = a.Nimi + " pohja", renderQueue = 3010 };
                a.PohjaMateriaali.SetFloat("_ZTest", (float)CompareFunction.Always);
                a.PohjaMateriaali.SetFloat("_ZWrite", 0);
                a.PohjaMateriaali.SetFloat("_Ymparisto", 1);
                roskat.Add(a.PohjaMateriaali);
                var pohja = MaaPohja.Mesh(); roskat.Add(pohja);
                var runko = a.Runko(); var roottori = a.Roottori(); var lapsi = a.Lapsi?.Invoke(); var valot = a.Valot?.Invoke();
                roskat.Add(runko); roskat.Add(roottori); if (lapsi != null) roskat.Add(lapsi);
                Material valoMateriaali = null;
                if (valot != null)
                {
                    // Lamput: täysi kirkkaus ilman valaistusta ja haalistusta (hillitty hehku, ei bloomia).
                    roskat.Add(valot);
                    valoMateriaali = new Material(s) { name = a.Nimi + " valot" };
                    valoMateriaali.SetFloat("_Ymparisto", 1);
                    roskat.Add(valoMateriaali);
                    a.ValoMateriaali = valoMateriaali;
                }
                int lapsia = a.LastenPaikat?.Length ?? 0;
                a.Kolmioita = (runko.triangles.Length + roottori.triangles.Length + (valot != null ? valot.triangles.Length : 0)
                    + (lapsi != null ? lapsi.triangles.Length * lapsia : 0)) / 3;
                foreach (var (_, _, vaihe) in a.Yksilot)
                {
                    var pt = new GameObject(a.Nimi + " pohja").transform;
                    pt.SetParent(transform, false);
                    Kappale(pt, "Pohja", pohja, a.PohjaMateriaali);
                    pt.gameObject.SetActive(false);
                    a.Pohjat.Add(pt);
                    var juuri = new GameObject(a.Nimi).transform;
                    juuri.SetParent(transform, false);
                    Kappale(juuri, "Runko", runko, a.Materiaali);
                    var rt = new GameObject("Roottori").transform;
                    rt.SetParent(juuri, false);
                    Kappale(rt, "Roottori", roottori, a.Materiaali);
                    if (valot != null) Kappale(rt, "Valot", valot, valoMateriaali);
                    var lapset = new Transform[lapsia];
                    for (int i = 0; i < lapsia; i++)
                    {
                        lapset[i] = new GameObject("Lapsi").transform;
                        lapset[i].SetParent(rt, false);
                        Kappale(lapset[i], "Lapsi", lapsi, a.Materiaali);
                    }
                    juuri.gameObject.SetActive(false);
                    a.Oliot.Add(new Yksilo { Juuri = juuri, Roottori = rt, Lapset = lapset, Vaihe = vaihe, Aikataulu = a.Vaihtelu?.Invoke(a.Oliot.Count) });
                    a.Animoi(rt, lapset, vaihe, 0f);
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
            kaynnissa = () => jokinNakyvissa && jokinLiikkuu;
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
            var napa = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1));

            // Liike pehmeästi kohti 1/0 (PehmeysS): vähennetty liike, Staattinen ja pois-kytkin.
            liike = Mathf.MoveTowards(liike, Liikkuu() ? 1f : 0f, Time.unscaledDeltaTime / PehmeysS);
            double seina = Time.unscaledTimeAsDouble + AikaSiirto;
            bool liikkuu = false;

            bool jokin = false;
            foreach (var a in Aiheet)
            {
                Vector3 juuri = Paikka(a.Paikka, 25);
                Vector3 ylos = (juuri - c0).normalized;
                Vector3 pohjoinen = Vector3.ProjectOnPlane(napa, ylos).normalized;
                // Näkyy: korkeusikkuna, juuri kameran puolella (ei horisontin takana) ja ruudulla reunavaralla (simulaattori
                // 26.9.: ruudun ulkopuolinen aihe piti elävän kerroksen käynnissä turhaan).
                float p = Paalla && korkeus >= NakyyAlkaenM && korkeus <= NakyyAstiM && Vector3.Dot(kameraL - juuri, ylos) > 0
                    && Ruudulla(gt.TransformPoint(juuri))
                    ? Mathf.Clamp01((float)((NakyyAstiM - korkeus) / (NakyyAstiM - HaipyyAlkaenM))) : 0f;
                bool nyt = p > 0.001f;
                if (nyt != a.Nakyvissa)
                {
                    a.Nakyvissa = nyt;
                    foreach (var o in a.Oliot) o.Juuri.gameObject.SetActive(nyt);
                    foreach (var po in a.Pohjat) po.gameObject.SetActive(nyt);
                    PallonLepo.Muuttui("elävät elementit");
                }
                if (!Mathf.Approximately(p, a.Peitto))
                {
                    a.Peitto = p; a.Materiaali.SetFloat("_Peitto", p); a.PohjaMateriaali.SetFloat("_Peitto", p);
                    if (a.ValoMateriaali != null) a.ValoMateriaali.SetFloat("_Peitto", p);
                }
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
                    var yk = a.Oliot[i];
                    var j = yk.Juuri;
                    var (x, y, _) = a.Yksilot[i];
                    // Nosto kameraa kohti rungon syvyyden verran, ettei pop-up-malli painu maaston sisään (ZTest LEqual).
                    Vector3 maassa = juuri + (oikea * x + eteen * y) * pt;
                    // Aito 3D: pystyssä pinnan normaalin mukaan, +z aiheen Suunta-kulmaan pohjoisesta; hieman maan yllä.
                    j.localPosition = maassa + ylos * (0.01f * kerroin);
                    // Maapohja makaa pinnalla juuren alla (ellipsinä kallistettaessa), säde aiheen mukaan.
                    var pj = a.Pohjat[i];
                    pj.localPosition = maassa + ylos * 20f;
                    pj.localRotation = Quaternion.LookRotation(eteen, ylos);
                    pj.localScale = Vector3.one * (a.PohjaSade * kerroin);
                    j.localRotation = Quaternion.AngleAxis(a.Suunta, ylos) * Quaternion.LookRotation(pohjoinen, ylos);
                    j.localScale = Vector3.one * kerroin;
                    // Vaihtelu ja tauot: yksilön nopeus aikataulusta × liike; aika kulkee nopeuden mukaan.
                    float tavoite = liike * (float)(yk.Aikataulu?.Tavoite(seina) ?? 1.0);
                    yk.Nopeus = Mathf.MoveTowards(yk.Nopeus, tavoite, Time.unscaledDeltaTime / PehmeysS);
                    yk.Aika += yk.Nopeus * Time.unscaledDeltaTime;
                    if (yk.Nopeus > 0.0001f || tavoite > 0.0001f) liikkuu = true;
                    if (yk.Nopeus > 0.0001f || !yk.Asetettu)
                    {
                        a.Animoi(yk.Roottori, yk.Lapset, yk.Aika + yk.Vaihe, Mathf.Clamp01(yk.Nopeus));
                        yk.Asetettu = true;
                    }
                }
            }
            jokinNakyvissa = jokin;
            jokinLiikkuu = liikkuu;
        }

        /// <summary>Juuri ruudulla RuutuVara-osuuden reunavaralla (aihe ulottuu juuresta noin koon verran).</summary>
        bool Ruudulla(Vector3 maailma)
        {
            var v = kamera.WorldToViewportPoint(maailma);
            return v.z > 0 && v.x > -RuutuVara && v.x < 1 + RuutuVara && v.y > -RuutuVara && v.y < 1 + RuutuVara;
        }

        /// <summary>Yksi animoitu yksilö: oliot, aikataulu (Vaihtelu) ja oma nopeus ja aika.</summary>
        sealed class Yksilo
        {
            public Transform Juuri, Roottori;
            public Transform[] Lapset;
            public float Vaihe, Nopeus, Aika;
            public Vaihtelu Aikataulu;
            public bool Asetettu;
        }

        Vector3 Paikka(LatLon q, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.Lon, q.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }
    }

    /// <summary>
    /// Maapohja (omistaja 26.9. klo 16.5x: "näyttää leijuvan ilmassa"): pinnalla makaava pehmeäreunainen kiekko, jonka
    /// keskellä on tumma pehmeä varjo ja reunalla vaalea sage-sävy häipyen nollaan. Säde 1, +y ylös (pinnan normaali).
    /// </summary>
    public static class MaaPohja
    {
        public static Mesh Mesh()
        {
            const int sivuja = 32;
            var renkaat = new (float r, Color c)[]
            {
                (0f, WithA(MalliVarit.Varjo, 0.42f)), (0.28f, WithA(MalliVarit.Varjo, 0.32f)),
                (0.55f, WithA(MalliVarit.SageVaalea, 0.30f)), (0.8f, WithA(MalliVarit.SageVaalea, 0.16f)), (1f, WithA(MalliVarit.SageVaalea, 0f)),
            };
            var p = new List<Vector3>(); var n = new List<Vector3>(); var c = new List<Color>(); var t = new List<int>();
            p.Add(Vector3.zero); n.Add(Vector3.up); c.Add(renkaat[0].c);
            for (int k = 1; k < renkaat.Length; k++)
                for (int i = 0; i < sivuja; i++)
                {
                    float a = i * Mathf.PI * 2 / sivuja;
                    p.Add(new Vector3(Mathf.Cos(a) * renkaat[k].r, 0, Mathf.Sin(a) * renkaat[k].r)); n.Add(Vector3.up); c.Add(renkaat[k].c);
                }
            for (int i = 0; i < sivuja; i++) t.AddRange(new[] { 0, 1 + (i + 1) % sivuja, 1 + i });
            for (int k = 1; k < renkaat.Length - 1; k++)
            {
                int a0 = 1 + (k - 1) * sivuja, b0 = 1 + k * sivuja;
                for (int i = 0; i < sivuja; i++)
                {
                    int i1 = (i + 1) % sivuja;
                    t.AddRange(new[] { a0 + i, a0 + i1, b0 + i1, a0 + i, b0 + i1, b0 + i });
                }
            }
            var m = new Mesh { name = "Maapohja" };
            m.SetVertices(p); m.SetNormals(n); m.SetColors(c); m.SetTriangles(t, 0);
            m.RecalculateBounds();
            return m;
        }

        static Color WithA(Color v, float a) { v.a = a; return v; }
    }

    /// <summary>Löydöksen 160 paletti (Sisältökirjurin poiminta 26.9.) ja tummempi sage varjopinnoille.</summary>
    public static class MalliVarit
    {
        public static readonly Color Sage = Hex(0x7a9a92), SageVarjo = Hex(0x5f7e77), Varjo = Hex(0x887858),
            Pinta = Hex(0xc8b898), Valo = Hex(0xe8d8b8), Terrakotta = Hex(0xb8785e);
        /// <summary>Hillityt sävyt (omistaja 16.5x karusellista: värit alemmas, sage ja pergamentti hallitsevat).</summary>
        public static readonly Color SageVaalea = Color.Lerp(Sage, Valo, 0.45f), TerrakottaHimmea = Color.Lerp(Terrakotta, Pinta, 0.45f);

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
        public void Vaippa(float y0, float r0, float y1, float r1, Color ala, Color yla, int sivuja = 8, float ox = 0, float oz = 0)
        {
            var o = new Vector3(ox, 0, oz);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja, a1 = (i + 1) * Mathf.PI * 2 / sivuja + Mathf.PI / sivuja;
                Vector3 p00 = new(Mathf.Cos(a0) * r0, y0, Mathf.Sin(a0) * r0), p10 = new(Mathf.Cos(a1) * r0, y0, Mathf.Sin(a1) * r0);
                Vector3 p01 = new(Mathf.Cos(a0) * r1, y1, Mathf.Sin(a0) * r1), p11 = new(Mathf.Cos(a1) * r1, y1, Mathf.Sin(a1) * r1);
                // Tahkojen vuorottelu antaa kaiverruksen laudoitusvaikutelman ilman tekstuuria.
                Nelio(p00 + o, p10 + o, p11 + o, p01 + o, Color.Lerp(ala, yla, i % 2 == 0 ? 0.35f : 0.6f));
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

        /// <summary>Oktaedri (8 kolmiota): lamppujen nuppi keskipisteestä säteellä r.</summary>
        public void Nuppi(Vector3 k, float r, Color v)
        {
            Vector3 x = new(r, 0, 0), y = new(0, r, 0), z = new(0, 0, r);
            Kolmio(k + y, k + x, k + z, v); Kolmio(k + y, k + z, k - x, v); Kolmio(k + y, k - x, k - z, v); Kolmio(k + y, k - z, k + x, v);
            Kolmio(k - y, k + z, k + x, v); Kolmio(k - y, k - x, k + z, v); Kolmio(k - y, k - z, k - x, v); Kolmio(k - y, k + x, k - z, v);
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
    /// Proseduraalinen ketjukaruselli (Tivoli, kokeilu 2; omistaja 16.5x: "vaunut lentävät sivuilla iloisemmin ja elävämmin
    /// eri tasoissa"). Runko on paikallaan pysyvä lava (puut poistettu 17.1x). Katos (pyörivä osa) on raidallinen kartiokatto
    /// helmoineen ja keskipylväs; Lamput (erillinen, valaisematon materiaali) kiertävät helman reunaa; istuimet riippuvat
    /// ketjuissa helman ripustuspisteistä (Ripustukset). Animoi: katos pyörii 10 s/kierros; ripustuspisteiden korkeus aaltoilee
    /// kehän ympäri (katto kallistuu hitaasti kuin aaltokaruselli) ja istuimet keinuvat ulospäin keskipakoisesti nopeuden
    /// mukaan (pysähtyessä ne laskeutuvat pystyyn ease-käyrällä), kukin hieman eri vaiheessa.
    /// </summary>
    public static class KaruselliGeometria
    {
        const int Istuimia = 12, Lamppuja = 20;
        const float RipustusSade = 0.52f, RipustusKorkeus = 0.64f, Ketju = 0.30f;
        static Vector3[] ripustukset;

        public static Vector3[] Ripustukset()
        {
            if (ripustukset != null) return ripustukset;
            ripustukset = new Vector3[Istuimia];
            for (int i = 0; i < Istuimia; i++)
            {
                float a = i * Mathf.PI * 2 / Istuimia;
                ripustukset[i] = new Vector3(Mathf.Cos(a) * RipustusSade, RipustusKorkeus, Mathf.Sin(a) * RipustusSade);
            }
            return ripustukset;
        }

        /// <summary>Katoksen kierto, aaltoileva kehä ja keskipakoinen keinunta (ease: nopeus², pysähtyessä pystyyn).</summary>
        public static void Animoi(Transform katos, Transform[] istuimet, float t, float nopeus)
        {
            katos.localRotation = Quaternion.Euler(0, t * 36f, 0);
            float n = nopeus * nopeus * (3f - 2f * nopeus);   // smoothstep
            var r = Ripustukset();
            for (int i = 0; i < istuimet.Length; i++)
            {
                float fi = i * Mathf.PI * 2 / istuimet.Length;
                Vector3 ulos = new Vector3(Mathf.Cos(fi), 0, Mathf.Sin(fi)), tangentti = new Vector3(-Mathf.Sin(fi), 0, Mathf.Cos(fi));
                // Aalto kiertää kehää 7 s:n jaksolla: ripustus nousee ja laskee ±0,06, joten istuimet lentävät eri tasoissa.
                float aalto = Mathf.Sin(fi - t * Mathf.PI * 2 / 7f);
                istuimet[i].localPosition = r[i] + new Vector3(0, 0.06f * aalto * n, 0);
                // Keinunta ulospäin: 30° perusta + 8° aallon mukaan + 3° oma värinä (2,3 s), nopeuden mukaan.
                float kulma = n * (30f + 8f * aalto + 3f * Mathf.Sin(t * Mathf.PI * 2 / 2.3f + i * 1.7f));
                istuimet[i].localRotation = Quaternion.AngleAxis(kulma, tangentti) * Quaternion.LookRotation(tangentti, Vector3.up);
            }
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
            r.Vaippa(0.05f, 0.07f, 0.66f, 0.06f, MalliVarit.Varjo, MalliVarit.Pinta, 8);            // keskipylväs
            r.VaippaRaidat(0.60f, 0.58f, 0.67f, 0.58f, MalliVarit.Valo, MalliVarit.TerrakottaHimmea);  // helma (ainoa aksentti)
            r.VaippaRaidat(0.67f, 0.60f, 0.96f, 0.05f, MalliVarit.SageVaalea, MalliVarit.Valo);        // kartiokatto
            r.Kansi(0.60f, 0.58f, MalliVarit.Varjo, 16, ylos: false);                                // katon alapinta
            r.Laatikko(new Vector3(0, 1.0f, 0), new Vector3(0.012f, 0.05f, 0.012f), MalliVarit.Varjo);   // tanko
            r.Kolmio(new Vector3(0.012f, 1.05f, 0), new Vector3(0.11f, 1.025f, 0), new Vector3(0.012f, 1.0f, 0), MalliVarit.TerrakottaHimmea);  // viiri
            return r.Mesh("Karuselli: katos");
        }

        /// <summary>
        /// Lamput (omistaja 17.1x: lisää valoja, hillitty hehku): helman alareuna tiheästi (36), katon kuudellatoista
        /// kylkiviivalla kolme kullakin (48) ja keskipylväässä kuusi. Oktaedrinuput valaisemattomalla materiaalilla.
        /// </summary>
        public static Mesh Lamput()
        {
            var r = new MalliRakenne();
            var lamppu = MalliVarit.Hex(0xfff0c8);
            for (int i = 0; i < 36; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2 / 36;
                r.Nuppi(new Vector3(Mathf.Cos(a) * 0.595f, 0.605f, Mathf.Sin(a) * 0.595f), 0.011f, lamppu);
            }
            for (int i = 0; i < 16; i++)
            {
                float a = i * Mathf.PI * 2 / 16;
                for (int k = 1; k <= 3; k++)
                {
                    float u = k / 4f, sade = Mathf.Lerp(0.60f, 0.05f, u) + 0.008f, y = Mathf.Lerp(0.67f, 0.96f, u) + 0.006f;
                    r.Nuppi(new Vector3(Mathf.Cos(a) * sade, y, Mathf.Sin(a) * sade), 0.009f, lamppu);
                }
            }
            for (int k = 0; k < 6; k++)
            {
                float a = k * Mathf.PI * 2 / 6;
                r.Nuppi(new Vector3(Mathf.Cos(a) * 0.075f, 0.35f, Mathf.Sin(a) * 0.075f), 0.01f, lamppu);
            }
            return r.Mesh("Karuselli: lamput");
        }

        /// <summary>Istuin ketjuineen: ripustuspiste origossa, ketjut alas (−y) Ketju-pituudelta, istuin +z-suuntaan katsoen.</summary>
        public static Mesh Istuin()
        {
            var r = new MalliRakenne();
            const float leveys = 0.035f;
            r.Laatikko(new Vector3(leveys, -Ketju * 0.5f, 0), new Vector3(0.003f, Ketju * 0.5f, 0.003f), MalliVarit.Varjo);    // ketjut
            r.Laatikko(new Vector3(-leveys, -Ketju * 0.5f, 0), new Vector3(0.003f, Ketju * 0.5f, 0.003f), MalliVarit.Varjo);
            r.Laatikko(new Vector3(0, -Ketju - 0.006f, 0.008f), new Vector3(leveys + 0.006f, 0.006f, 0.028f), MalliVarit.Valo);   // istuin
            r.Laatikko(new Vector3(0, -Ketju + 0.03f, -0.018f), new Vector3(leveys + 0.006f, 0.032f, 0.004f), MalliVarit.SageVaalea); // selkä
            r.Laatikko(new Vector3(0, -Ketju - 0.03f, 0.03f), new Vector3(0.012f, 0.022f, 0.004f), MalliVarit.Varjo);       // jalkatuki
            return r.Mesh("Karuselli: istuin");
        }
    }
}
