// ELÄVÄT ELEMENTIT kaupungeissa (omistaja 26.9.2026 klo 10.0x: niukkuus ja sulava, elävä animointi; selvitys
// docs/raportit/elavat-elementit-selvitys-20260926.md, omistaja hyväksyi järjestyksen). Yksi liikkuva aihe kaupunkia
// kohden, ja kukin aihe on yksi Aihe-määrittely: paikka, yksilöt ruudulla, runko, pyörivä osa ja animaatio.
//   kokeilu 1  Zaandamin kolme tuulimyllyä (vain siivet pyörivät, 7–9 s/kierros)
//   kokeilu 2  Tivolin ketjukaruselli Kööpenhaminassa (katos 10 s/kierros, istuimet keinuvat ulospäin aaltoillen, lamput)
//   kokeilu 3  Pariisin kiinnitetty ilmapallo Tuileries'ssa (nousu ja lasku 24 s, kori heiluu 5 s, köysi vintturiin)
//   kokeilu 4  Venetsian gondolit Canal Grandella (kaksi vastakkaisiin suuntiin, matka 30 s airon tahdissa, odotus päissä)
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
            new Aihe
            {
                // Ilmapallo: ajaa 50–130 s (2–5 nousua), ja vintturi pysähtyy välillä 15–45 s (pallo jää paikalleen
                // ilmaan tai maahan, kori asettuu pystyyn); vintturin tahti vaihtelee ±8 %.
                Vaihtelu = i => new Vaihtelu(307 + i) { KayMinS = 50, KayMaxS = 130, SeisooMinS = 15, SeisooMaxS = 45, TaukoTod = 0.7, Puuska = 0.08 },
                Nimi = "ilmapallo", Paikka = new LatLon(48.8634, 2.3275), KokoPt = 40f,   // Jardin des Tuileries, Pariisi
                // 40 pt ruudulla ylös (kallistettaessa taakse): Tuileries on vain 2 km Pariisin pisteestä, ja simulaattorissa
                // 26.9. pallo peitti pisteen.
                Yksilot = new[] { (0f, 40f, 0f) },
                Runko = IlmapalloGeometria.Asema, Roottori = IlmapalloGeometria.Pallo, Lapsi = IlmapalloGeometria.Koysi,
                LastenPaikat = new[] { Vector3.zero },
                // Suunta: tuuli lounaasta, joten pallo nojaa koilliseen (+z).
                PohjaSade = 0.7f, Haalistus = 0.25f, Suunta = 45f,
                Animoi = IlmapalloGeometria.Animoi,
            },
            new Aihe
            {
                // Gondolit: soutavat 90–200 s, ja joskus molemmat lepäävät 10–25 s; soututahti vaihtelee ±10 %. Omat
                // odotukset päissä ovat GondoliGeometria.Animoissa (laiturissa odotus, rakenteellinen tauko).
                Vaihtelu = i => new Vaihtelu(409 + i) { KayMinS = 90, KayMaxS = 200, SeisooMinS = 10, SeisooMaxS = 25, TaukoTod = 0.25, Puuska = 0.1 },
                Nimi = "gondolit", Paikka = new LatLon(45.4380, 12.3358), KokoPt = 56f,   // Canal Grande, Rialto
                // Ylös Venetsian pisteestä kuten Pariisin pallo (pistettä ei peitetä).
                Yksilot = new[] { (0f, 44f, 0f) },
                Runko = GondoliGeometria.Kaupunki, Roottori = GondoliGeometria.Rialto, Lapsi = GondoliGeometria.Gondoli,
                LastenPaikat = new Vector3[2],
                // Suunta 0: kaavan +z on pohjoinen, joten S-mutka on oikein päin.
                PohjaSade = 0.85f, Haalistus = 0.25f, Suunta = 0f,
                Animoi = GondoliGeometria.Animoi,
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

        /// <summary>Ohut nelikulmainen tanko pisteestä a pisteeseen b (köydet, ripustusnarut), 8 kolmiota.</summary>
        public void Tanko(Vector3 a, Vector3 b, float paksuus, Color v)
        {
            Vector3 d = (b - a).normalized;
            Vector3 u = Vector3.Cross(d, Mathf.Abs(d.y) < 0.9f ? Vector3.up : Vector3.right).normalized * paksuus;
            Vector3 w = Vector3.Cross(d, u).normalized * paksuus;
            Nelio(a + u + w, a + u - w, b + u - w, b + u + w, v);
            Nelio(a - u - w, a - u + w, b - u + w, b - u - w, v);
            Nelio(a - u + w, a + u + w, b + u + w, b - u + w, v);
            Nelio(a + u - w, a - u - w, b - u - w, b + u - w, v);
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

    /// <summary>
    /// Proseduraalinen kiinnitetty ilmapallo (kokeilu 3, Pariisi; selvitys: Giffardin pallo Tuileries'ssa). Runko (Asema) on
    /// paikallaan pysyvä pyöreä lava, jonka keskellä on laskeutumiskehä ja reunalla vintturihuone ja pylväät. Pallo (pyörivä
    /// osa) on terrakottainen kupu, ekvaattorivyö, kantorengas, narut ja kori; juuri on lavan tasossa, ja kori lepää kehässä.
    /// Koysi (lapsi) kulkee korin pohjasta vintturiin ja venyy korkeuden mukaan. Animoi: 24 s:n jakso (maassa 2 s, nousu 9 s,
    /// ylhäällä 3 s, lasku 9 s, maassa 1 s), ylhäällä pallo nojaa tuulen alle (+z), ja kori heiluu 5 s:n jaksolla kuvun
    /// keskipisteen ympäri, heilunta nopeuden ja korkeuden mukaan (maassa ja pysähtyessä pystyyn).
    /// </summary>
    public static class IlmapalloGeometria
    {
        const float KupuY = 0.54f, KupuR = 0.26f, KoriAla = 0.06f, KoriYla = 0.13f, RengasY = 0.22f, Korkein = 1.0f, Nojaus = 0.14f;
        static readonly Vector3 Vintturi = new Vector3(0, 0.05f, 0);

        static float Pehmea(float x) { x = Mathf.Clamp01(x); return x * x * (3f - 2f * x); }

        /// <summary>Korkeus (0–Korkein) jakson hetkellä t: maassa, nousu, ylhäällä, lasku.</summary>
        public static float Korkeus(float t)
        {
            float u = Mathf.Repeat(t, 24f);
            if (u < 2f) return 0f;
            if (u < 11f) return Korkein * Pehmea((u - 2f) / 9f);
            if (u < 14f) return Korkein;
            if (u < 23f) return Korkein * (1f - Pehmea((u - 14f) / 9f));
            return 0f;
        }

        public static void Animoi(Transform pallo, Transform[] lapset, float t, float nopeus)
        {
            float h = Korkeus(t);
            float n = Pehmea(nopeus) * Mathf.Clamp01(h / 0.15f);
            float w = t * Mathf.PI * 2f / 5f;
            // Heilunta kuvun keskipisteen ympäri: kori piirtää pienen soikion (5° ja 3°, eri vaiheissa).
            var r = Quaternion.Euler(5f * n * Mathf.Sin(w), 0, 3f * n * Mathf.Sin(w * 0.77f + 1f));
            var kupu = new Vector3(0, KupuY, 0);
            Vector3 p = new Vector3(0, h, Nojaus * h) + kupu - r * kupu;
            pallo.localPosition = p;
            pallo.localRotation = r;
            if (lapset == null || lapset.Length == 0) return;
            // Köysi pallon avaruudessa korin pohjasta vintturiin (runko = pallon isän isä, pallo on sen suora lapsi).
            Vector3 b = new Vector3(0, KoriAla, 0), q = Quaternion.Inverse(r) * (Vintturi - p);
            Vector3 d = q - b;
            var koysi = lapset[0];
            koysi.localPosition = b;
            koysi.localRotation = d.sqrMagnitude > 1e-8f ? Quaternion.FromToRotation(Vector3.down, d) : Quaternion.identity;
            koysi.localScale = new Vector3(1, Mathf.Max(0.001f, d.magnitude), 1);
        }

        public static Mesh Asema()
        {
            var r = new MalliRakenne();
            r.Vaippa(0f, 0.46f, 0.05f, 0.44f, MalliVarit.Varjo, MalliVarit.Pinta, 16);            // lava
            r.Kansi(0.05f, 0.44f, MalliVarit.Pinta, 16);
            r.Vaippa(0.05f, 0.12f, 0.075f, 0.12f, MalliVarit.Varjo, MalliVarit.Varjo, 12);        // laskeutumiskehä
            r.Laatikko(new Vector3(0, 0.10f, -0.33f), new Vector3(0.09f, 0.05f, 0.055f), MalliVarit.Pinta);   // vintturihuone
            r.Nelio(new Vector3(-0.10f, 0.15f, -0.39f), new Vector3(0.10f, 0.15f, -0.39f), new Vector3(0.10f, 0.19f, -0.33f), new Vector3(-0.10f, 0.19f, -0.33f), MalliVarit.Varjo);
            r.Nelio(new Vector3(-0.10f, 0.19f, -0.33f), new Vector3(0.10f, 0.19f, -0.33f), new Vector3(0.10f, 0.15f, -0.27f), new Vector3(-0.10f, 0.15f, -0.27f), MalliVarit.Varjo);
            for (int i = 0; i < 8; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2 / 8;
                r.Laatikko(new Vector3(Mathf.Cos(a) * 0.41f, 0.09f, Mathf.Sin(a) * 0.41f), new Vector3(0.01f, 0.04f, 0.01f), MalliVarit.Varjo);   // pylväät
            }
            return r.Mesh("Ilmapallo: asema");
        }

        public static Mesh Pallo()
        {
            var r = new MalliRakenne();
            // Kupu: 12 kaistaa × 8 leveysvyötä, kaistat vuorotellen kahdella terrakotan sävyllä (ainoa aksentti).
            const int kaistoja = 12, vyot = 8;
            Color c1 = MalliVarit.TerrakottaHimmea, c2 = Color.Lerp(MalliVarit.Terrakotta, MalliVarit.TerrakottaHimmea, 0.4f);
            Vector3 P(int i, int j)
            {
                float lat = -Mathf.PI / 2 + Mathf.PI * j / vyot, lon = Mathf.PI * 2 * i / kaistoja;
                return new Vector3(Mathf.Cos(lat) * Mathf.Cos(lon) * KupuR, KupuY + Mathf.Sin(lat) * KupuR, Mathf.Cos(lat) * Mathf.Sin(lon) * KupuR);
            }
            for (int i = 0; i < kaistoja; i++)
                for (int j = 0; j < vyot; j++)
                {
                    Color c = i % 2 == 0 ? c1 : c2;
                    if (j == 0) r.Kolmio(P(i, 0), P(i, 1), P(i + 1, 1), c);
                    else if (j == vyot - 1) r.Kolmio(P(i, j), P(i, j + 1), P(i + 1, j), c);
                    else r.Nelio(P(i, j), P(i, j + 1), P(i + 1, j + 1), P(i + 1, j), c);
                }
            r.Vaippa(KupuY - 0.012f, KupuR + 0.004f, KupuY + 0.012f, KupuR + 0.004f, MalliVarit.Varjo, MalliVarit.Varjo, 12);   // ekvaattorivyö
            r.Nuppi(new Vector3(0, KupuY + KupuR + 0.01f, 0), 0.02f, MalliVarit.Varjo);                              // venttiili
            r.Vaippa(RengasY - 0.006f, 0.07f, RengasY + 0.006f, 0.07f, MalliVarit.Varjo, MalliVarit.Varjo, 8);       // kantorengas
            // Narut: kahdeksan kuvun alavyöltä (−35°) kantorenkaaseen ja neljä renkaasta koriin.
            float la = -35f * Mathf.Deg2Rad;
            for (int i = 0; i < 8; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2 / 8;
                Vector3 yla = new Vector3(Mathf.Cos(a) * Mathf.Cos(la) * KupuR, KupuY + Mathf.Sin(la) * KupuR, Mathf.Sin(a) * Mathf.Cos(la) * KupuR);
                Vector3 ala = new Vector3(Mathf.Cos(a) * 0.07f, RengasY, Mathf.Sin(a) * 0.07f);
                r.Tanko(ala, yla, 0.003f, MalliVarit.Varjo);
            }
            for (int i = 0; i < 4; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2 / 4;
                r.Tanko(new Vector3(Mathf.Cos(a) * 0.055f, KoriYla, Mathf.Sin(a) * 0.055f), new Vector3(Mathf.Cos(a) * 0.07f, RengasY, Mathf.Sin(a) * 0.07f), 0.003f, MalliVarit.Varjo);
            }
            r.Vaippa(KoriAla, 0.065f, KoriYla, 0.08f, MalliVarit.Varjo, MalliVarit.Pinta, 8);    // kori
            r.Kansi(KoriAla, 0.065f, MalliVarit.Varjo, 8, ylos: false);
            r.Kansi(KoriYla - 0.01f, 0.075f, MalliVarit.Varjo, 8);
            return r.Mesh("Ilmapallo: pallo");
        }

        /// <summary>Köysi: origosta alas (−y) yhden yksikön; Animoi venyttää sen vintturiin.</summary>
        public static Mesh Koysi()
        {
            var r = new MalliRakenne();
            r.Tanko(Vector3.zero, Vector3.down, 0.004f, MalliVarit.Varjo);
            var m = r.Mesh("Ilmapallo: köysi");
            return m;
        }
    }

    /// <summary>
    /// Proseduraalinen Venetsia-vinjetti (kokeilu 4; selvitys: kaksi gondolia Canal Grandella vastakkaisiin suuntiin, airo
    /// keinuu 3 s). Kaavamainen käänteinen S-mutka (oma käyrä, ei johdettu kartta-aineistosta): luoteesta itään Rialtolle,
    /// volta lounaaseen ja itään San Marcon altaaseen. Runko (Kaupunki): vesi, rantakadut ja matalat palatsit kanavan
    /// varrella. Roottori (Rialto) on paikallaan pysyvä silta. Lapset: kaksi gondolia, jotka kulkevat kanavaa edestakaisin
    /// 30 s:n matkoin (smootherstep ja airon vedot 3 s:n välein), odottavat päissä 7 / 11 s ja keinuvat vedon tahdissa.
    /// </summary>
    public static class GondoliGeometria
    {
        const float Leveys = 0.07f, Ranta = 0.014f, VesiY = 0.006f, RantaY = 0.012f, MatkaS = 30f, VetoS = 3f;
        static readonly Vector2[] Ohjaus =
        {
            new(-0.62f, 0.06f), new(-0.38f, 0.17f), new(-0.13f, 0.24f), new(0.08f, 0.16f), new(0.10f, -0.02f),
            new(-0.06f, -0.16f), new(0.04f, -0.27f), new(0.32f, -0.29f), new(0.58f, -0.22f),
        };
        static Vector3[] polku;
        static float[] matkat;

        static void Varmista()
        {
            if (polku != null) return;
            // Catmull–Rom ohjauspisteiden läpi, 12 näytettä väliä kohden; kaarenpituus taulukkoon.
            var p = new List<Vector3>();
            for (int i = 0; i < Ohjaus.Length - 1; i++)
            {
                Vector2 a = Ohjaus[Mathf.Max(0, i - 1)], b = Ohjaus[i], c = Ohjaus[i + 1], d = Ohjaus[Mathf.Min(Ohjaus.Length - 1, i + 2)];
                for (int k = 0; k < 12; k++)
                {
                    float t = k / 12f, t2 = t * t, t3 = t2 * t;
                    var q = 0.5f * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (3 * b - a - 3 * c + d) * t3);
                    p.Add(new Vector3(q.x, 0, q.y));
                }
            }
            var viim = Ohjaus[Ohjaus.Length - 1];
            p.Add(new Vector3(viim.x, 0, viim.y));
            polku = p.ToArray();
            matkat = new float[polku.Length];
            for (int i = 1; i < polku.Length; i++) matkat[i] = matkat[i - 1] + Vector3.Distance(polku[i - 1], polku[i]);
        }

        /// <summary>Piste ja suunta kanavan osuudella u (0–1) kaarenpituuden mukaan.</summary>
        static (Vector3 p, Vector3 suunta) Kohta(float u)
        {
            Varmista();
            float s = Mathf.Clamp01(u) * matkat[matkat.Length - 1];
            int i = 1;
            while (i < matkat.Length - 1 && matkat[i] < s) i++;
            float v = Mathf.InverseLerp(matkat[i - 1], matkat[i], s);
            var d = polku[i] - polku[i - 1];
            return (Vector3.Lerp(polku[i - 1], polku[i], v), d.sqrMagnitude > 1e-10f ? d.normalized : Vector3.forward);
        }

        static float Pehmea(float x) { x = Mathf.Clamp01(x); return x * x * x * (x * (x * 6 - 15) + 10); }

        /// <summary>
        /// Gondolin i osuus kanavalla hetkellä t (edestakaisin): matka 30 s ja odotus päissä (7 / 11 s). Airon vedot:
        /// aika etenee (1 − 0,35 cos 2πt/3)-painolla, joten vauhti sykkii vedon tahdissa mutta ei koskaan pysähdy.
        /// </summary>
        public static (float u, bool liikkuu, float veto) Osuus(int i, float t)
        {
            float odotus = i == 0 ? 7f : 11f, jakso = 2 * (MatkaS + odotus);
            float tt = Mathf.Repeat(t + i * 19f, jakso);
            bool paluu = tt >= MatkaS + odotus;
            float m = paluu ? tt - MatkaS - odotus : tt;
            if (m >= MatkaS) return (paluu == (i == 0) ? 0.06f : 0.94f, false, 0);
            float tau = (m - 0.35f * VetoS / (2 * Mathf.PI) * Mathf.Sin(2 * Mathf.PI * m / VetoS)) / MatkaS;
            float u = Mathf.Lerp(0.06f, 0.94f, Pehmea(tau));
            // Gondoli 1 lähtee vastakkaisesta päästä.
            bool eteen = paluu == (i == 1);
            return (eteen ? u : 1 - u, true, Mathf.Sin(2 * Mathf.PI * m / VetoS));
        }

        public static void Animoi(Transform silta, Transform[] gondolit, float t, float nopeus)
        {
            silta.localPosition = Vector3.zero;
            silta.localRotation = Quaternion.identity;
            if (gondolit == null) return;
            for (int i = 0; i < gondolit.Length; i++)
            {
                var (u, liikkuu, veto) = Osuus(i, t);
                var (p, suunta) = Kohta(u);
                // Oikeanpuoleinen liikenne: kumpikin pysyy kulkusuuntaansa nähden oikealla, joten ne ohittavat toisensa.
                var (_, perus) = Kohta(Mathf.Clamp(u + 0.01f, 0, 1));
                bool eteen = Osuus(i, t + 0.05f).u >= u;
                var kulku = eteen ? perus : -perus;
                if (!liikkuu) kulku = i == 0 ? suunta : -suunta;
                var oikea = Vector3.Cross(Vector3.up, kulku).normalized;
                gondolit[i].localPosition = p + oikea * (Leveys * 0.22f) + Vector3.up * VesiY;
                // Keinunta vedon tahdissa (1,5° kallistus, 0,8° nokka), laiturissa hiljainen maininki.
                float n = nopeus * nopeus * (3 - 2 * nopeus);
                float rulla = liikkuu ? 1.5f * veto * n : 0.5f * Mathf.Sin(t * 0.9f + i);
                gondolit[i].localRotation = Quaternion.LookRotation(kulku, Vector3.up) * Quaternion.Euler(0.8f * veto * n, 0, rulla);
            }
        }

        public static Mesh Kaupunki()
        {
            Varmista();
            var r = new MalliRakenne();
            Color vesi = Color.Lerp(MalliVarit.Sage, MalliVarit.Valo, 0.25f);
            // Vesi ja rantakadut nauhoina polun normaalin suuntaan.
            for (int i = 1; i < polku.Length; i++)
            {
                Vector3 a = polku[i - 1], b = polku[i];
                Vector3 na = Normaali(i - 1), nb = Normaali(i);
                Nauha(r, a, b, na, nb, -Leveys / 2, Leveys / 2, VesiY, vesi);
                Nauha(r, a, b, na, nb, Leveys / 2, Leveys / 2 + Ranta, RantaY, MalliVarit.Pinta);
                Nauha(r, a, b, na, nb, -Leveys / 2 - Ranta, -Leveys / 2, RantaY, MalliVarit.Pinta);
            }
            // Palatsit: matalat laatikot vuorotellen rannoilla, katolla tummempi sävy (tasavarjostus erottaa).
            for (int k = 0; k < 18; k++)
            {
                float u = 0.04f + 0.92f * k / 17f;
                var (p, suunta) = Kohta(u);
                var n = Vector3.Cross(Vector3.up, suunta).normalized;
                float puoli = k % 2 == 0 ? 1 : -1, h = 0.018f + 0.012f * ((k * 7) % 3);
                var keski = p + n * puoli * (Leveys / 2 + Ranta + 0.022f) + Vector3.up * (RantaY + h);
                var q = Quaternion.LookRotation(suunta, Vector3.up);
                Palatsi(r, keski, q, new Vector3(0.02f, h, 0.024f), k % 3 == 0 ? MalliVarit.Valo : MalliVarit.Pinta);
            }
            return r.Mesh("Venetsia: kanava");
        }

        static Vector3 Normaali(int i)
        {
            var d = polku[Mathf.Min(polku.Length - 1, i + 1)] - polku[Mathf.Max(0, i - 1)];
            return Vector3.Cross(Vector3.up, d).normalized;
        }

        static void Nauha(MalliRakenne r, Vector3 a, Vector3 b, Vector3 na, Vector3 nb, float o0, float o1, float y, Color c)
        {
            var yy = Vector3.up * y;
            r.Nelio(a + na * o0 + yy, a + na * o1 + yy, b + nb * o1 + yy, b + nb * o0 + yy, c);
        }

        /// <summary>Kierretty laatikko (palatsi): sivut värillä c, katto Varjo-sävyllä.</summary>
        static void Palatsi(MalliRakenne r, Vector3 k, Quaternion q, Vector3 h, Color c)
        {
            Vector3 x = q * new Vector3(h.x, 0, 0), y = new Vector3(0, h.y, 0), z = q * new Vector3(0, 0, h.z);
            r.Nelio(k - x - y + z, k + x - y + z, k + x + y + z, k - x + y + z, c);
            r.Nelio(k + x - y - z, k - x - y - z, k - x + y - z, k + x + y - z, c);
            r.Nelio(k - x - y - z, k - x - y + z, k - x + y + z, k - x + y - z, Color.Lerp(c, MalliVarit.Varjo, 0.25f));
            r.Nelio(k + x - y + z, k + x - y - z, k + x + y - z, k + x + y + z, Color.Lerp(c, MalliVarit.Varjo, 0.25f));
            r.Nelio(k - x + y + z, k + x + y + z, k + x + y - z, k - x + y - z, Color.Lerp(MalliVarit.TerrakottaHimmea, MalliVarit.Varjo, 0.3f));
        }

        /// <summary>Rialton silta kanavan poikki (paikallaan; Aiheen pyörivä osa, joka ei pyöri).</summary>
        public static Mesh Rialto()
        {
            var r = new MalliRakenne();
            var (p, suunta) = Kohta(0.36f);
            var q = Quaternion.LookRotation(Vector3.Cross(Vector3.up, suunta), Vector3.up);
            float pituus = Leveys / 2 + Ranta + 0.006f;
            Palatsi(r, p + Vector3.up * (RantaY + 0.008f), q, new Vector3(0.014f, 0.008f, pituus), MalliVarit.Valo);
            return r.Mesh("Venetsia: Rialto");
        }

        /// <summary>Gondoli: tumma kapea runko (nokka ja perä koholla), terrakotta-katos ja gondolieeri perässä; +z eteen.</summary>
        public static Mesh Gondoli()
        {
            var r = new MalliRakenne();
            Color runko = new Color(0.20f, 0.17f, 0.13f), kansi = new Color(0.27f, 0.23f, 0.18f);
            const float L = 0.075f, W = 0.011f;
            // Runko viidellä poikkileikkauksella: leveys kapenee päitä kohti ja reuna nousee.
            var z = new[] { -L, -L * 0.6f, 0f, L * 0.6f, L };
            var w = new[] { 0.001f, W * 0.8f, W, W * 0.8f, 0.001f };
            var yy = new[] { 0.014f, 0.008f, 0.007f, 0.008f, 0.018f };
            for (int i = 1; i < z.Length; i++)
            {
                Vector3 a0 = new(-w[i - 1], yy[i - 1], z[i - 1]), a1 = new(w[i - 1], yy[i - 1], z[i - 1]);
                Vector3 b0 = new(-w[i], yy[i], z[i]), b1 = new(w[i], yy[i], z[i]);
                Vector3 alaA = new(0, 0, z[i - 1] * 0.9f), alaB = new(0, 0, z[i] * 0.9f);
                r.Nelio(a0, a1, b1, b0, kansi);                 // kansi
                r.Nelio(alaA, a0, b0, alaB, runko);             // kyljet
                r.Nelio(a1, alaA, alaB, b1, runko);
            }
            r.Laatikko(new Vector3(0, 0.013f, 0.004f), new Vector3(0.006f, 0.004f, 0.012f), MalliVarit.TerrakottaHimmea);   // katos
            r.Laatikko(new Vector3(0, 0.02f, -0.05f), new Vector3(0.003f, 0.009f, 0.003f), runko);                          // gondolieeri
            r.Tanko(new Vector3(0.006f, 0.026f, -0.05f), new Vector3(0.016f, 0.0f, -0.03f), 0.0012f, runko);                // airo
            return r.Mesh("Venetsia: gondoli");
        }
    }
}
