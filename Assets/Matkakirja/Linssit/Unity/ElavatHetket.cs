// ELÄVÄ KARTTA, kohta 5: ELÄVÄT HETKET (Linssiseppä 26.9.2026; suunnitelma §5, Raamattu ELÄVÄ KARTTA kohta 5).
// Ajastin (Ydin/Elava/Hetket) valitsee 2–5 minuutin välein 3 s:n hetken kartan näkyvältä alueelta, kun kartta on vapaa
// (ei korttia, luentaa, linssiä, herätystä eikä saapumista), kamera on ollut paikallaan ≥ LevossaS ja sitä on liikutettu
// viimeisen PoissaS:n aikana (joku katsoo). Piirto herää vain hetken ajaksi (PallonLepo.Animoi, ei joutosykkeen
// aktiivisuutta). Koot ruutupisteinä ja kaikki kameraan päin kuin vanhan kartan kuvituksessa (laiva aina pystyssä):
//   laiva  Laiva-varjostin (videon SDF-höyrylaiva), savupallot ja vaalea vana
//   juna   veturi ja kaksi vaunua tummina läiskinä, savupallot
//   parvi  11 lintua V-muodostelmassa, siivet lyövät (kaksi kapeaa läiskää linnulla)
//   sade   harmaa kuuro ja viistot juovat, kulkee länsituulessa
// Aineisto: sisältöpaketin kokoelma reitit1873 (skeema 1.46, Karttaseppä) ladataan joutilaana, ja maakunnat tulevat
// ElavaKartan välimuistista. Äänet (Ydin/Aanet/HetkienAanet: tuuli, kaukainen laivan kello, sade, junan puhallukset)
// syntetisoidaan taustasäikeessä ja soivat tehosteväylällä hiljaa. Testi: "elava hetki [laiva|juna|parvi|sade]" (heti) ja "elava hetket 0|1|tila".
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class ElavatHetket : MonoBehaviour
    {
        public static bool Paalla = true;
        public const float LevossaS = 5f, PoissaS = 600f, AineistoViiveS = 30f;
        /// <summary>Hetket vain maa- ja maakuntanäkymissä (ei kaupungin sisällä eikä koko pallolla).</summary>
        public const double AlinM = 15_000, YlinM = 2_500_000;
        const float LaivaPt = 30f, SavunIkaS = 1.5f, SavuValiS = 0.12f;
        const double Maansade = 6_371_000;

        static ElavatHetket instanssi;
        static List<Reitti1873> reitit;
        static bool reititHaussa;
        readonly Dictionary<string, AudioClip[]> aanet = new Dictionary<string, AudioClip[]>();

        LinssiOhjain ohjain;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        HetkiAjastin ajastin;
        readonly System.Random satunnainen = new System.Random();
        Hetki hetki;
        float hetkenAlku, seuraavaSavu;
        HetkenLaji? edellinen;
        Vector3 edellinenKamera;
        Quaternion edellinenKierto;
        float paikallaanAlkaen, liikkuiViimeksi = float.NegativeInfinity;
        Material terava, pehmea, laiva;
        Mesh teravaMesh, pehmeaMesh, laivaMesh;
        GameObject laivaOlio;
        readonly List<UnityEngine.Object> roskat = new List<UnityEngine.Object>();
        readonly List<(Vector3 Paikka, float Syntyi, float Suunta)> savut = new List<(Vector3, float, float)>();
        float[] juovaX, juovaVaihe;
        Func<bool> kaynnissa;

        // Tämän kehyksen kamera georeferenssin avaruudessa.
        Vector3 kameraL, oikea, yla;
        float tanPuoli;

        sealed class Rakenne
        {
            public readonly List<Vector3> Paikat = new List<Vector3>();
            public readonly List<Color> Varit = new List<Color>();
            public readonly List<Vector2> Kulmat = new List<Vector2>();
            public readonly List<int> Kolmiot = new List<int>();
            public void Tyhjenna() { Paikat.Clear(); Varit.Clear(); Kulmat.Clear(); Kolmiot.Clear(); }
            public void Aseta(Mesh m)
            {
                m.Clear();
                m.SetVertices(Paikat); m.SetColors(Varit); m.SetUVs(0, Kulmat); m.SetTriangles(Kolmiot, 0);
                m.RecalculateBounds();
            }
        }
        readonly Rakenne teravat = new Rakenne(), pehmeat = new Rakenne();

        public static void Kytke(LinssiOhjain o)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null || instanssi != null) return;
            var go = new GameObject("ElavatHetket");
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            instanssi = go.AddComponent<ElavatHetket>();
            instanssi.ohjain = o;
            instanssi.georeferenssi = kierto.georeferenssi;
            instanssi.kamera = kierto.GetComponent<Camera>();
        }

        /// <summary>Testikomento "elava hetki [laji]": hetki heti (ajastimesta, vapaudesta ja korkeudesta välittämättä).</summary>
        public static void Testi(string laji, LinssiOhjain o)
        {
            if (instanssi == null) { o.Kirjaa("elävä hetki: ei kytketty"); return; }
            HetkenLaji? l = null;
            if (!string.IsNullOrEmpty(laji))
            {
                if (Enum.TryParse(laji, true, out HetkenLaji p)) l = p;
                else { o.Kirjaa("elävä hetki: laji laiva|juna|parvi|sade"); return; }
            }
            instanssi.Lopeta();
            if (!instanssi.Aloita(l, true, out var syy)) o.Kirjaa("elävä hetki: ei aloitettu (" + syy + ")");
        }

        public static string Tila() => instanssi == null ? "ei kytketty" :
            $"{(Paalla ? "päällä" : "pois")}, seuraava {(instanssi.ajastin == null ? "?" : (instanssi.ajastin.Seuraava - Time.unscaledTime).ToString("F0"))} s, " +
            $"reitit1873 {(reitit == null ? (reititHaussa ? "haussa" : "ei") : reitit.Count.ToString())}";

        void Start()
        {
            terava = Materiaali(5f, 0f, 3013);
            pehmea = Materiaali(2.4f, 0.2f, 3016);
            var s = Resources.Load<Shader>("Varjostimet/Laiva");
            if (s != null) { laiva = new Material(s); roskat.Add(laiva); }
            teravaMesh = UusiMesh("Hetki: tummat"); pehmeaMesh = UusiMesh("Hetki: savu ja kuuro");
            laivaMesh = UusiMesh("Hetki: laiva");
            laivaMesh.SetVertices(new Vector3[4]);
            laivaMesh.SetUVs(0, new List<Vector2> { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) });
            laivaMesh.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
            if (terava != null) Kappale("Hetki: tummat", teravaMesh, terava);
            if (pehmea != null) Kappale("Hetki: savu ja kuuro", pehmeaMesh, pehmea);
            if (laiva != null) { laivaOlio = Kappale("Hetki: laiva", laivaMesh, laiva); laivaOlio.SetActive(false); }
            StartCoroutine(LataaReitit());
            StartCoroutine(Syntetisoi());
        }

        /// <summary>Hetkien äänet taustasäikeessä joutilaana, klipit pääsäikeessä ja rekisteröinti tehosteväylälle.</summary>
        IEnumerator Syntetisoi()
        {
            yield return new WaitForSecondsRealtime(AineistoViiveS);
            int taajuus = AudioSettings.outputSampleRate > 0 ? AudioSettings.outputSampleRate : 48000;
            uint siemen = (uint)Environment.TickCount | 1u;
            var tehtava = Task.Run(() =>
            {
                var tulos = new Dictionary<string, float[][]>();
                foreach (var nimi in HetkienAanet.Nimet)
                {
                    var m = new float[HetkienAanet.Muunnelmia][];
                    for (int i = 0; i < m.Length; i++) m[i] = HetkienAanet.Syntetisoi(nimi, taajuus, siemen + (uint)(i * 7919 + nimi.Length * 104729));
                    tulos[nimi] = m;
                }
                return tulos;
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted) { Debug.Log("MATKAKIRJA elävät hetket: äänisynteesi epäonnistui: " + tehtava.Exception?.InnerException?.Message); yield break; }
            foreach (var kv in tehtava.Result)
            {
                var klipit = new AudioClip[kv.Value.Length];
                for (int i = 0; i < klipit.Length; i++)
                {
                    klipit[i] = AudioClip.Create($"{kv.Key}-{i + 1}", kv.Value[i].Length, 1, taajuus, false);
                    klipit[i].SetData(kv.Value[i], 0);
                }
                aanet[kv.Key] = klipit;
                Aanet.RekisteroiTehoste(kv.Key, klipit, 1f, true);
            }
            Debug.Log($"MATKAKIRJA elävät hetket: äänet valmiit ({aanet.Count} × {HetkienAanet.Muunnelmia}, {taajuus} Hz, tehosteväylällä)");
        }

        static string AanenNimi(HetkenLaji laji) => laji switch
        {
            HetkenLaji.Laiva => HetkienAanet.Laiva,
            HetkenLaji.Juna => HetkienAanet.Juna,
            HetkenLaji.Sade => HetkienAanet.Sade,
            _ => HetkienAanet.Tuuli,
        };

        void OnEnable()
        {
            kaynnissa = () => hetki != null;
            PallonLepo.Animoi(kaynnissa, "elävä hetki");
        }

        void OnDisable()
        {
            if (kaynnissa != null) PallonLepo.Poista(kaynnissa);
        }

        void OnDestroy()
        {
            foreach (var o in roskat) if (o != null) Destroy(o);
            foreach (var nimi in aanet.Keys) Aanet.RekisteroiTehoste(nimi, (IReadOnlyList<AudioClip>)null);
            foreach (var k in aanet.Values) foreach (var c in k) if (c != null) Destroy(c);
            aanet.Clear();
            if (instanssi == this) instanssi = null;
        }

        Material Materiaali(float ydin, float halo, int jono)
        {
            var s = Resources.Load<Shader>("Varjostimet/Pehmeapiste");
            if (s == null) return null;
            var m = new Material(s);
            roskat.Add(m);
            m.SetFloat("_Ydin", ydin);
            m.SetFloat("_Halo", halo);
            m.renderQueue = jono;
            return m;
        }

        Mesh UusiMesh(string nimi)
        {
            var m = new Mesh { name = nimi };
            m.MarkDynamic();
            roskat.Add(m);
            return m;
        }

        GameObject Kappale(string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        static IEnumerator LataaReitit()
        {
            yield return new WaitForSecondsRealtime(AineistoViiveS);
            if (reitit != null || reititHaussa) yield break;
            reititHaussa = true;
            string teksti = null;
            float alku = Time.realtimeSinceStartup;
            yield return Sisalto.HaeTeksti("reitit1873", x => teksti = x, true, Taso.Muu);
            if (teksti != null)
            {
                var tehtava = Task.Run(() => Reitti1873.Jasenna(teksti));
                while (!tehtava.IsCompleted) yield return null;
                reitit = tehtava.IsFaulted ? new List<Reitti1873>() : tehtava.Result;
                int laivat = reitit.FindAll(r => r.Laiva).Count;
                Debug.Log($"MATKAKIRJA elävät hetket: reitit1873 {reitit.Count} (laivalinjoja {laivat}, ratoja {reitit.Count - laivat}), " +
                          $"{(Time.realtimeSinceStartup - alku) * 1000:F0} ms");
            }
            else Debug.Log("MATKAKIRJA elävät hetket: reitit1873 puuttuu paketista (vain parvi ja sade)");
            reititHaussa = false;
        }

        void Update()
        {
            if (georeferenssi == null || kamera == null) return;
            float nyt = Time.unscaledTime;
            // Kameran asento georeferenssin avaruudessa: paikallaan-kello ja viimeisin liike (joku katsoo).
            var gt = georeferenssi.transform;
            var kt = kamera.transform;
            var paikka = gt.InverseTransformPoint(kt.position);
            var kierto = Quaternion.Inverse(gt.rotation) * kt.rotation;
            if ((paikka - edellinenKamera).sqrMagnitude > 0.25f || Quaternion.Angle(kierto, edellinenKierto) > 0.02f)
            {
                edellinenKamera = paikka; edellinenKierto = kierto;
                paikallaanAlkaen = nyt; liikkuiViimeksi = nyt;
            }
            if (hetki != null)
            {
                float t = nyt - hetkenAlku;
                if (t >= Hetki.Kesto) Lopeta();
                else Piirra(t);
                return;
            }
            if (ajastin == null) ajastin = new HetkiAjastin(Environment.TickCount, nyt);
            if (!ajastin.Tarkista(nyt, Paalla && Vapaa(nyt))) return;
            if (!Aloita(null, false, out var syy)) Debug.Log("MATKAKIRJA elävä hetki: ohitettu (" + syy + ")");
        }

        bool Vapaa(float nyt) =>
            ElavaHerays.KarttaVapaa() && !ElavaHerays.Kaynnissa && !(ohjain != null && ohjain.VahennettyLiike) &&
            nyt - paikallaanAlkaen >= LevossaS && nyt - liikkuiViimeksi <= PoissaS;

        bool Aloita(HetkenLaji? pakota, bool testi, out string syy)
        {
            syy = null;
            if (!Nakyma(out var keskus, out var sadeKm, out var korkeus)) { syy = "pallo ei näy ruudun keskellä"; return false; }
            if (!testi && (korkeus < AlinM || korkeus > YlinM)) { syy = $"korkeus {korkeus / 1000:F0} km"; return false; }
            var h = HetkenValinta.Valitse(satunnainen, keskus, sadeKm, reitit, PelaajanMaakunnat(), edellinen, pakota);
            if (h == null) { syy = pakota.HasValue ? pakota + " ei näy" : "ei kohdetta"; return false; }
            hetki = h;
            hetkenAlku = Time.unscaledTime;
            seuraavaSavu = 0;
            edellinen = h.Laji;
            savut.Clear();
            var r = new System.Random(h.Siemen);
            juovaX = new float[28]; juovaVaihe = new float[28];
            for (int i = 0; i < juovaX.Length; i++) { juovaX[i] = (float)(r.NextDouble() * 2 - 1); juovaVaihe[i] = (float)r.NextDouble(); }
            bool soi = aanet.ContainsKey(AanenNimi(h.Laji)) && Aanet.Tehoste(AanenNimi(h.Laji));
            ohjain?.Kirjaa($"elävä hetki: {h.Laji} {h.Kohde} ({keskus.Lat:F2}, {keskus.Lon:F2}), näkymä {sadeKm:F0} km, " +
                           $"korkeus {korkeus / 1000:F0} km, rata {h.Rata.Pituus * ElavaKohtaus.KmAsteella:F0} km, ääni {(soi ? AanenNimi(h.Laji) : "ei")}");
            return true;
        }

        void Lopeta()
        {
            if (hetki == null) return;
            hetki = null;
            savut.Clear();
            teravaMesh.Clear(); pehmeaMesh.Clear();
            if (laivaOlio != null) laivaOlio.SetActive(false);
            PallonLepo.Valmistui("elävä hetki");
        }

        static IReadOnlyList<ElavaMaakunta> PelaajanMaakunnat()
        {
            var po = PeliOhjain.Instanssi;
            string k = po?.PelaajanKaupunki;
            if (k == null || po.Verkko == null || !po.Verkko.Kaupungit.TryGetValue(k, out var kk) || string.IsNullOrEmpty(kk.Maa)) return null;
            return ElavaKartta.MaakunnatMaalle(kk.Maa);
        }

        /// <summary>Ruudun keskikohdan piste pallolla, näkymän säde (ruudun kapeamman puolikkaan leveys maassa) ja kameran korkeus.</summary>
        bool Nakyma(out LatLon keskus, out double sadeKm, out double korkeus)
        {
            keskus = default; sadeKm = 0;
            var gt = georeferenssi.transform;
            double3 c = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            Vector3 oL = gt.InverseTransformPoint(kamera.transform.position);
            Vector3 dL = gt.InverseTransformDirection(kamera.transform.forward).normalized;
            double3 o = new double3(oL.x, oL.y, oL.z), d = new double3(dL.x, dL.y, dL.z), oc = o - c;
            korkeus = math.length(oc) - Maansade;
            double b = math.dot(oc, d), diskr = b * b - (math.dot(oc, oc) - Maansade * Maansade);
            if (diskr < 0) return false;
            double t = -b - math.sqrt(diskr);
            if (t <= 0) return false;
            var lla = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(
                georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(o + d * t));
            keskus = new LatLon(lla.y, lla.x);
            sadeKm = t / 1000 * Math.Tan(kamera.fieldOfView * 0.5 * Math.PI / 180) * Math.Min(1.0, kamera.aspect);
            return true;
        }

        Vector3 Paikka(LatLon p, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        /// <summary>Kulkusuunnan kulma ruudulla (radiaaneina, 0 = oikealle, vastapäivään).</summary>
        float RuutuKulma(LatLon p, double suuntima)
        {
            double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180, s = suuntima * Math.PI / 180;
            var ita = new double3(-Math.Sin(lo), Math.Cos(lo), 0);
            var pohj = new double3(-Math.Sin(la) * Math.Cos(lo), -Math.Sin(la) * Math.Sin(lo), Math.Cos(la));
            var kulku = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ita * Math.Sin(s) + pohj * Math.Cos(s));
            return Mathf.Atan2(Vector3.Dot(kulku, yla), Vector3.Dot(kulku, oikea));
        }

        /// <summary>Yhden ruutupisteen pituus metreinä pisteessä c.</summary>
        float Pt(Vector3 c) => 2f * LinssiOhjain.Pistekerroin * (kameraL - c).magnitude * tanPuoli / Mathf.Max(1, Screen.height);

        /// <summary>Kameraan päin käännetty läiskä: keskipiste c, kulma ruudulla, puolikoot pisteinä.</summary>
        void Laiska(Rakenne r, Vector3 c, float kulma, float puoliPituus, float puoliLeveys, Color vari)
        {
            float pt = Pt(c);
            Vector3 a = (oikea * Mathf.Cos(kulma) + yla * Mathf.Sin(kulma)) * (puoliPituus * pt);
            Vector3 b = (-oikea * Mathf.Sin(kulma) + yla * Mathf.Cos(kulma)) * (puoliLeveys * pt);
            int pohja = r.Paikat.Count;
            r.Paikat.Add(c - a - b); r.Paikat.Add(c + a - b); r.Paikat.Add(c + a + b); r.Paikat.Add(c - a + b);
            for (int i = 0; i < 4; i++) r.Varit.Add(vari);
            r.Kulmat.Add(new Vector2(-1, -1)); r.Kulmat.Add(new Vector2(1, -1)); r.Kulmat.Add(new Vector2(1, 1)); r.Kulmat.Add(new Vector2(-1, 1));
            r.Kolmiot.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
        }

        /// <summary>Ruutusiirros pisteinä (x oikealle, y ylös) kohdasta c.</summary>
        Vector3 Siirra(Vector3 c, float x, float y) { float pt = Pt(c); return c + (oikea * x + yla * y) * pt; }

        void Piirra(float t)
        {
            var gt = georeferenssi.transform;
            kameraL = gt.InverseTransformPoint(kamera.transform.position);
            oikea = gt.InverseTransformDirection(kamera.transform.right).normalized;
            yla = gt.InverseTransformDirection(kamera.transform.up).normalized;
            tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            teravat.Tyhjenna(); pehmeat.Tyhjenna();
            float peitto = (float)hetki.Peitto(t);
            var p = hetki.Paikka(t);
            float kulma = RuutuKulma(p, hetki.Suunta(t));
            switch (hetki.Laji)
            {
                case HetkenLaji.Laiva: PiirraLaiva(t, p, kulma, peitto); break;
                case HetkenLaji.Juna: PiirraJuna(t, kulma, peitto); break;
                case HetkenLaji.Parvi: PiirraParvi(t, p, kulma, peitto); break;
                default: PiirraSade(t, p, kulma, peitto); break;
            }
            teravat.Aseta(teravaMesh);
            pehmeat.Aseta(pehmeaMesh);
        }

        void PiirraLaiva(float t, LatLon p, float kulma, float peitto)
        {
            var c = Paikka(p, 300);
            float puoli = LaivaPt / 2 * Pt(c), suunta = Mathf.Cos(kulma) >= 0 ? 1 : -1;
            if (laivaOlio != null)
            {
                laivaOlio.SetActive(true);
                laivaMesh.SetVertices(new[] { c - oikea * puoli, c + oikea * puoli, c + oikea * puoli + yla * puoli, c - oikea * puoli + yla * puoli });
                laivaMesh.RecalculateBounds();
                laiva.SetFloat("_Suunta", suunta);
                laiva.SetFloat("_Peitto", peitto);
                laiva.SetFloat("_Aika", t);
            }
            // Vana: vaaleat läiskät radalla laivan takana, haalenevat.
            for (int k = 1; k <= 6; k++)
            {
                float tk = t - k * 0.14f;
                if (tk < 0) break;
                var q = Paikka(hetki.Paikka(tk), 300);
                Laiska(pehmeat, q, kulma, 4.5f, 1.1f, new Color(0.97f, 0.95f, 0.88f, 0.45f * (1 - k / 7f) * peitto));
            }
            // Savu piipusta (piippu keskeltä hieman perään, 0,8 korkeudella).
            Savua(t, Siirra(c, -suunta * LaivaPt * 0.05f, LaivaPt * 0.4f), suunta, peitto, new Color(0.36f, 0.33f, 0.30f, 1), 2.2f, 7f);
        }

        void PiirraJuna(float t, float kulma, float peitto)
        {
            double u = hetki.Osuus(t), pituusM = hetki.Rata.Pituus * ElavaKohtaus.KmAsteella * 1000;
            var veturi = Paikka(hetki.Rata.Piste(u), 200);
            double valiU = pituusM > 0 ? 13 * Pt(veturi) / pituusM : 0;
            var muste = new Color(0.16f, 0.12f, 0.09f, 0.9f * peitto);
            for (int k = 2; k >= 0; k--)
            {
                double uk = Math.Max(0, u - k * valiU);
                var q = hetki.Rata.Piste(uk);
                double s = HetkenGeometria.Suuntima(hetki.Rata.Piste(Math.Max(0, uk - 0.02)), hetki.Rata.Piste(Math.Min(1, uk + 0.02)));
                Laiska(teravat, Paikka(q, 200), RuutuKulma(q, s), k == 0 ? 6f : 5f, 2.4f, muste);
            }
            float suunta = Mathf.Cos(kulma) >= 0 ? 1 : -1;
            Savua(t, Siirra(veturi, 0, 3f), suunta, peitto, new Color(0.55f, 0.53f, 0.50f, 1), 2.2f, 7f);
        }

        /// <summary>Savupallot: syntyvät SavuValiS:n välein, nousevat ruudulla ylös, ajelehtivat perään ja haalenevat.</summary>
        void Savua(float t, Vector3 piippu, float suunta, float peitto, Color vari, float alkuPt, float loppuPt)
        {
            while (seuraavaSavu <= t && t < Hetki.Kesto - Hetki.Ulos)
            {
                savut.Add((piippu, seuraavaSavu, suunta));
                seuraavaSavu += SavuValiS;
            }
            for (int i = savut.Count - 1; i >= 0; i--)
            {
                var (paikka, syntyi, s) = savut[i];
                float ika = t - syntyi, u = ika / SavunIkaS;
                if (u >= 1) { savut.RemoveAt(i); continue; }
                var c = Siirra(paikka, -s * 7f * ika, 9f * (1 - Mathf.Exp(-ika * 1.6f)));
                float koko = Mathf.Lerp(alkuPt, loppuPt, Mathf.Sqrt(u));
                Laiska(pehmeat, c, 0, koko, koko, new Color(vari.r, vari.g, vari.b, Mathf.Clamp01(ika / 0.12f) * (1 - u) * 0.5f * peitto));
            }
        }

        void PiirraParvi(float t, LatLon p, float kulma, float peitto)
        {
            var johtaja = Paikka(p, 800);
            var muste = new Color(0.16f, 0.12f, 0.09f, 0.85f * peitto);
            float ca = Mathf.Cos(kulma), sa = Mathf.Sin(kulma);
            for (int i = 0; i < 11; i++)
            {
                int rivi = (i + 1) / 2;
                float puoli = i == 0 ? 0 : (i % 2 == 0 ? 1 : -1);
                float pitkin = -rivi * 12f + Mathf.Sin(t * 2.1f + i) * 1.5f, sivu = puoli * rivi * 9f + Mathf.Cos(t * 1.7f + i * 1.3f) * 1.2f;
                var lintu = Siirra(johtaja, ca * pitkin - sa * sivu, sa * pitkin + ca * sivu);
                // Siivet: "v" ruudulla pystyssä, avautuu ja sulkeutuu (lyönti 2,2 Hz, linnuittain eri vaiheessa).
                float nousu = (25f + 20f * Mathf.Sin(t * Mathf.PI * 2 * 2.2f + i * 0.7f)) * Mathf.Deg2Rad;
                Laiska(teravat, Siirra(lintu, -Mathf.Cos(nousu) * 4.1f, Mathf.Sin(nousu) * 4.1f), Mathf.PI - nousu, 4.6f, 1f, muste);
                Laiska(teravat, Siirra(lintu, Mathf.Cos(nousu) * 4.1f, Mathf.Sin(nousu) * 4.1f), nousu, 4.6f, 1f, muste);
            }
        }

        void PiirraSade(float t, LatLon p, float kulma, float peitto)
        {
            var c = Paikka(p, 2500);
            var pilvi = new Color(0.42f, 0.46f, 0.52f, 0.38f * peitto);
            Laiska(pehmeat, c, 0, 44f, 18f, pilvi);
            Laiska(pehmeat, Siirra(c, -20f, 5f), 0, 26f, 14f, pilvi);
            Laiska(pehmeat, Siirra(c, 21f, 4f), 0, 28f, 15f, pilvi);
            // Juovat putoavat pilven alta, kallistuvat tuulen suuntaan.
            float kallistus = (90f + 12f * Mathf.Sign(Mathf.Cos(kulma))) * Mathf.Deg2Rad;
            for (int i = 0; i < juovaX.Length; i++)
            {
                float putous = (juovaVaihe[i] + t * 1.6f) % 1f;
                var q = Siirra(c, juovaX[i] * 40f - Mathf.Cos(kallistus) * putous * 34f, -5f - putous * 34f);
                Laiska(teravat, q, kallistus, 6.5f, 0.9f, new Color(0.35f, 0.42f, 0.52f, 0.7f * (1 - putous) * peitto));
            }
        }
    }
}
