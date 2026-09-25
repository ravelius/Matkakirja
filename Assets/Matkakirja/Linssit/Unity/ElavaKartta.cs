// ELÄVÄ KARTTA, "ISOISÄN MUSTE": videon kohtaus natiivissa (Linssiseppä 26.9.2026, Fablen käsky: aikajana
// paikkamerkein ja ensimmäinen video; Raamattu ELÄVÄ KARTTA, vain natiivi).
//
// Koreografia ja ajoitukset ovat puhtaassa ytimessä (Linssit/Ydin/Elava/ElavaKohtaus.cs); tämä komponentti lataa
// aineiston, rakentaa paikkamerkkien verkot ja piirtää kohtauksen tilan joka kehys. Paikkamerkit (Natiiviseppä tekee
// pallon puolen rajapintoina, muut roolit datana):
//   huntu         Huntu.shader maakuntien kolmioilla (→ Paljastus(keskus, säde, t) laattavarjostimessa)
//   joet, rajat   Kynaviiva.shader (→ Viivapiirto(kerros, osuus)); joet käsin (KreikanAineisto)
//   maakunnat     Maakuntapinta.shader (→ Maakuntavari(id, t)); sävyt Maakuntajako.Taytto kuten pelin maakuntakerros
//   nostot        Laikka.shader (→ Pelikoodarin kokoluokat ja himmeät jäljet, Natiivisepän piirto)
//   aurinko       OIKEA: kartan rinnevalo Aurinko.Atsimuutti/KorkeusAst (Natiivisepän rajapinta Aurinko(atsimuutti, korkeus))
//   nimi, merkit  TextMeshPro Snell Roundhandilla ja läikät (→ Natiivi-UI:n kartussi ja merkit)
//   laiva, savu   Laiva.shader ja Pehmeapiste.shader (→ Karttasepän 1873-reitit, Natiivisepän laiva/boidit)
//   hämärä        OIKEA: KarttaKerrokset.PallonSavy; yövalot Pehmeapisteinä (→ Yövalot(maski käydyt))
// Kamera: PalloKierto.Kuvaa joka kehys (lennon kuvauksen rajapinta: kohde, etäisyys, kallistus, suuntima).
//
// KOMENNOT (Documents/linssi-komento.txt): "elava kreikka [alku s] [nopeus]" soittaa kohtauksen, "elava kuva <s>"
// pysäyttää kohtaan s (pysäytyskuvat), "elava jatka", "elava pois" (kartta ennalleen), "elava tila" ja "elava ui 0|1"
// (käyttöliittymä piiloon kohtauksen ajaksi, oletus 0 = piiloon).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Matkakirja.Linssit.Vesistot;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class ElavaKartta : MonoBehaviour
    {
        public static ElavaKartta Instanssi { get; private set; }

        const double HuntuKorkeus = 1500, ViivaKorkeus = 1800, LaikkaKorkeus = 2000, NimiKorkeus = 2500;
        const double MaanSade = 6371000;
        /// <summary>Läikän säde metreinä luokittain (pääkohde, kohde, pieni).</summary>
        static readonly double[] LaikanSade = { 9000, 6000, 4000 };
        const double LaivanPituus = 16000, SavunNousu = 2200, SavunAjelehdus = 1800;
        const float ValonKokoPx = 46f;

        enum Vaihe { Lataa, Soi, Kuva, Loppu }

        LinssiOhjain ohjain;
        PalloKierto kierto;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        ElavaKohtaus kohtaus;
        Vaihe vaihe = Vaihe.Lataa;
        double t, alkuPyynto;
        float nopeus = 1;
        bool kuvaPyynto;
        string edellinenVaihe = "";
        readonly List<float> kehykset = new List<float>();
        double loppuHetki = -1;

        // Grafiikka
        readonly List<UnityEngine.Object> roskat = new List<UnityEngine.Object>();
        Material huntu, taytto, rajat, joet, reitti, laikat, valot, savu, laiva;
        Mesh laikkaMesh, valoMesh, savuMesh, laivaMesh;
        readonly List<Vector4> laikkaTila = new List<Vector4>();
        TextMeshPro nimi;
        float nimenMinX, nimenMaxX;
        GameObject laivaOlio;

        /// <summary>Käyttöliittymä piiloon videon ajaksi (komento "elava ui 0|1"): kartta ilman yläpalkkia ja nappeja.</summary>
        public static bool UiPiiloon = true;

        // Pelin tila talteen
        bool tilaTalteen;
        readonly List<(UnityEngine.UIElements.UIDocument Dokumentti, UnityEngine.UIElements.StyleEnum<UnityEngine.UIElements.DisplayStyle> Nakyvyys)> piilotetutUi =
            new List<(UnityEngine.UIElements.UIDocument, UnityEngine.UIElements.StyleEnum<UnityEngine.UIElements.DisplayStyle>)>();
        readonly List<Canvas> piilotetutKanvasit = new List<Canvas>();
        string varitasoEnnen;
        double aurinkoEnnen, aurinkoKorkeusEnnen;

        // Aineisto (maakuntarajat jäsennetään kerran istunnossa: 8 Mt, ~0,3 s taustasäikeessä).
        static List<ElavaMaakunta> kreikanMaakunnat;

        // ── Komennot ──────────────────────────────────────────────────────

        public static void Komento(string[] osat, LinssiOhjain ohjain)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            double Luku(int i, double oletus) =>
                osat.Length > i && double.TryParse(osat[i].Replace(',', '.'), System.Globalization.NumberStyles.Float,
                    System.Globalization.CultureInfo.InvariantCulture, out var v) ? v : oletus;
            var e = Instanssi;
            switch (mita)
            {
                case "kreikka":
                case "kuva":
                    if (e != null) e.Lopeta();
                    e = Luo(ohjain);
                    e.alkuPyynto = Luku(2, 0);
                    e.nopeus = (float)(mita == "kuva" ? 1 : Luku(3, 1));
                    e.kuvaPyynto = mita == "kuva";
                    e.StartCoroutine(e.Valmistele());
                    break;
                case "jatka":
                    if (e != null && e.kohtaus != null) { e.vaihe = Vaihe.Soi; e.Kirjaa($"jatkuu {e.t:F2} s"); }
                    break;
                case "ui":
                    UiPiiloon = !(osat.Length > 2 && osat[2] == "1");
                    ohjain.Kirjaa("elävä: käyttöliittymä " + (UiPiiloon ? "piiloon kohtauksen ajaksi" : "näkyvissä"));
                    break;
                case "pois":
                    if (e != null) e.Lopeta();
                    ohjain.Kirjaa("elävä: pois");
                    break;
                default:
                    ohjain.Kirjaa(e == null ? "elävä: ei käynnissä" : e.Kuvaus());
                    break;
            }
        }

        static ElavaKartta Luo(LinssiOhjain ohjain)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            var g = kierto.georeferenssi;
            var go = new GameObject("ElavaKartta");
            go.transform.SetParent(g.transform, false);
            var e = go.AddComponent<ElavaKartta>();
            e.ohjain = ohjain;
            e.kierto = kierto;
            e.georeferenssi = g;
            e.kamera = kierto.GetComponent<Camera>();
            Instanssi = e;
            return e;
        }

        void Kirjaa(string s) => ohjain?.Kirjaa("elävä: " + s);

        string Kuvaus() => kohtaus == null ? $"elävä: {vaihe}, aineisto latautuu"
            : $"elävä: {vaihe} {t:F2}/{ElavaKohtaus.Kesto:F1} s [{kohtaus.Vaihe(t)}], kamera {kohtaus.KameranAsento(t)}, " +
              $"maakuntia {kohtaus.Maakunnat.Count}, rajoja {kohtaus.Rajat.Count}, jokia {kohtaus.Joet.Count}, nostoja {kohtaus.Nostot.Count}";

        // ── Lataus ja rakennus ───────────────────────────────────────────

        IEnumerator Valmistele()
        {
            float alku = Time.realtimeSinceStartup;
            if (kreikanMaakunnat == null)
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti("maakuntarajat", x => teksti = x, true);
                if (teksti == null) { Kirjaa("maakuntarajat puuttuu paketista"); yield break; }
                Maakuntajako jako = null;
                var tehtava = Task.Run(() => jako = Maakuntajako.Lue(Matkakirja.Peli.MiniJson.Jasenna(teksti)));
                while (!tehtava.IsCompleted) yield return null;
                if (tehtava.IsFaulted || jako == null) { Kirjaa("maakuntarajat: jäsennys kaatui " + tehtava.Exception?.GetBaseException().Message); yield break; }
                var m = jako.Hae(KreikanAineisto.Maa);
                if (m == null) { Kirjaa("maakuntarajat: ei maata " + KreikanAineisto.Maa); yield break; }
                var lista = new List<ElavaMaakunta>();
                for (int i = 0; i < m.Alueet.Count; i++)
                {
                    var a = m.Alueet[i];
                    var em = new ElavaMaakunta { Id = a.Id, Nimi = a.Nimi, Varinumero = m.Varit != null && i < m.Varit.Length ? m.Varit[i] : i % 5, Keskus = new LatLon(a.KeskusLat, a.KeskusLon) };
                    foreach (var r in a.Renkaat) if (r.Length >= 3) em.Renkaat.Add(r.Select(p => new LatLon(p.Lat, p.Lon)).ToArray());
                    lista.Add(em);
                }
                kreikanMaakunnat = lista;
            }
            kohtaus = new ElavaKohtaus(KreikanAineisto.Ateena, kreikanMaakunnat, KreikanAineisto.Joet, KreikanAineisto.Nostot,
                KreikanAineisto.HeraavaMaakunta, KreikanAineisto.NapautettavaNosto, KreikanAineisto.Laivareitti,
                KreikanAineisto.KuljettuReitti, ohjain.KokoPallonKorkeus, Aurinko.Atsimuutti, Aurinko.KorkeusAst);

            // Kolmiot taustasäikeessä (korvanleikkaus; Kreikan rannikko ja saaret).
            List<(int Maakunta, Jarvikolmiot.Verkko Verkko)> verkot = null;
            var kolmiointi = Task.Run(() =>
            {
                var l = new List<(int, Jarvikolmiot.Verkko)>();
                for (int i = 0; i < kohtaus.Maakunnat.Count; i++)
                    foreach (var r in kohtaus.Maakunnat[i].Renkaat) l.Add((i, Jarvikolmiot.Laske(r, 1.0)));
                verkot = l;
            });
            while (!kolmiointi.IsCompleted) yield return null;
            if (kolmiointi.IsFaulted) { Kirjaa("kolmiointi kaatui " + kolmiointi.Exception?.GetBaseException().Message); yield break; }

            Rakenna(verkot);
            TilaTalteen();
            t = Math.Max(0, Math.Min(ElavaKohtaus.Kesto, alkuPyynto));
            vaihe = kuvaPyynto ? Vaihe.Kuva : Vaihe.Soi;
            Kirjaa($"valmis {(Time.realtimeSinceStartup - alku) * 1000:F0} ms: {kohtaus.Maakunnat.Count} maakuntaa, {kohtaus.Rajat.Count} rajaa, " +
                   $"{kohtaus.Joet.Count} jokea, {kohtaus.Nostot.Count} nostoa ({kohtaus.HeraavanNostoja} heräävässä), " +
                   $"{verkot.Sum(v => v.Verkko.Kolmiot.Count) / 3} kolmiota; {(kuvaPyynto ? $"kuva {t:F2} s" : $"soi {t:F2} s:sta, nopeus {nopeus:F2}")}");
        }

        Vector3 Paikka(LatLon p, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        static Vector3 Suunta(LatLon p)
        {
            double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180;
            return new Vector3((float)(Math.Cos(la) * Math.Cos(lo)), (float)(Math.Cos(la) * Math.Sin(lo)), (float)Math.Sin(la));
        }

        /// <summary>Paikallinen itä, pohjoinen ja ylös georeferenssin avaruudessa (yksikkövektorit).</summary>
        (Vector3 Ita, Vector3 Pohjoinen, Vector3 Ylos) Kanta(LatLon p)
        {
            double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180;
            var ita = new double3(-Math.Sin(lo), Math.Cos(lo), 0);
            var pohj = new double3(-Math.Sin(la) * Math.Cos(lo), -Math.Sin(la) * Math.Sin(lo), Math.Cos(la));
            var ylos = new double3(Math.Cos(la) * Math.Cos(lo), Math.Cos(la) * Math.Sin(lo), Math.Sin(la));
            Vector3 U(double3 d) => ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(d)).normalized;
            return (U(ita), U(pohj), U(ylos));
        }

        Material Materiaali(string varjostin)
        {
            var s = Resources.Load<Shader>("Varjostimet/" + varjostin);
            if (s == null) { Kirjaa("varjostin puuttuu: " + varjostin); return null; }
            var m = new Material(s);
            roskat.Add(m);
            return m;
        }

        GameObject Kappale(string nimi, Mesh mesh, params Material[] m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterials = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        Mesh UusiMesh(string nimi)
        {
            var m = new Mesh { name = nimi, indexFormat = IndexFormat.UInt32 };
            roskat.Add(m);
            return m;
        }

        void Rakenna(List<(int Maakunta, Jarvikolmiot.Verkko Verkko)> verkot)
        {
            // Maakunnat ja huntu: samat kolmiot, kaksi alimeshiä (täyttö ja huntu).
            var paikat = new List<Vector3>();
            var varit = new List<Color>();
            var suunnat = new List<Vector3>();
            var tiedot = new List<Vector3>();
            var korostus = new List<Vector3>();
            var kolmiot = new List<int>();
            foreach (var (mi, v) in verkot)
            {
                var m = kohtaus.Maakunnat[mi];
                var (r, g, b, a) = Maakuntajako.Taytto(m.Varinumero, false, true);
                var (kr, kg, kb, ka) = Maakuntajako.Taytto(m.Varinumero, true, true);
                var vari = new Color((float)r, (float)g, (float)b).linear;
                vari.a = (float)a;
                var kv = new Color((float)kr, (float)kg, (float)kb).linear;
                int pohja = paikat.Count;
                foreach (var p in v.Karjet)
                {
                    paikat.Add(Paikka(p, HuntuKorkeus));
                    varit.Add(vari);
                    suunnat.Add(Suunta(p));
                    tiedot.Add(new Vector3(mi, (float)kohtaus.Sytytys[mi], (float)ka));
                    korostus.Add(new Vector3(kv.r, kv.g, kv.b));
                }
                foreach (int i in v.Kolmiot) kolmiot.Add(pohja + i);
            }
            var pinta = UusiMesh("Maakunnat ja huntu");
            pinta.SetVertices(paikat);
            pinta.SetColors(varit);
            pinta.SetUVs(0, suunnat);
            pinta.SetUVs(1, tiedot);
            pinta.SetUVs(2, korostus);
            pinta.subMeshCount = 2;
            pinta.SetTriangles(kolmiot, 0);
            pinta.SetTriangles(kolmiot, 1);
            pinta.RecalculateBounds();
            taytto = Materiaali("Maakuntapinta");
            huntu = Materiaali("Huntu");
            if (taytto != null && huntu != null)
            {
                taytto.SetFloat("_Kesto", (float)ElavaKohtaus.MaakunnanTaytto);
                taytto.SetFloat("_AsettunutOsuus", (float)ElavaKohtaus.AsettunutOsuus);
                taytto.SetFloat("_Heraava", kohtaus.Heraava);
                taytto.SetVector("_TulvaKeskus", Suunta(kohtaus.TulvaKeskus));
                taytto.SetFloat("_TulvaReuna", (float)(4.0 / 6371));
                huntu.SetVector("_Keskus", Suunta(kohtaus.Keskus));
                huntu.SetFloat("_Reuna", (float)(ElavaKohtaus.HuntuReunaKm / 6371));
                huntu.SetFloat("_Kohina", (float)(45.0 / 6371));
                Kappale("Maakunnat ja huntu", pinta, taytto, huntu);
            }

            // Kynäviivat: rajat (ruskea muste), joet (sininen muste), reitti (punainen muste).
            rajat = Viivat("Maakuntarajat", kohtaus.Rajat, new Color(0.25f, 0.18f, 0.11f, 0.9f), 1.5f);
            joet = Viivat("Joet", kohtaus.Joet, new Color(0.17f, 0.35f, 0.55f, 0.95f), 1.9f);
            reitti = Viivat("Kuljettu reitti", new List<Piirtoviiva> { kohtaus.Reitti }, new Color(0.70f, 0.16f, 0.12f, 0.95f), 2.6f);

            // Musteläikät: nostot + heräävän maakunnan löydösmerkit (4 pientä läikkää nimen alle).
            laikat = Materiaali("Laikka");
            laikkaMesh = UusiMesh("Musteläikät");
            RakennaLaikat();
            if (laikat != null) Kappale("Musteläikät", laikkaMesh, laikat);

            // Yövalot ja savu: kameraan käännetyt neliöt (CPU joka kehys).
            valot = Materiaali("Pehmeapiste");
            if (valot != null) { valot.SetFloat("_Lahde", (float)BlendMode.One); valot.SetFloat("_Kohde", (float)BlendMode.One); valot.SetFloat("_Ydin", 6); valot.SetFloat("_Halo", 0.45f); }
            valoMesh = UusiMesh("Yövalot");
            if (valot != null) Kappale("Yövalot", valoMesh, valot);
            savu = Materiaali("Pehmeapiste");
            if (savu != null) { savu.SetFloat("_Ydin", 2.5f); savu.SetFloat("_Halo", 0.2f); savu.renderQueue = 3016; }
            savuMesh = UusiMesh("Savu");
            if (savu != null) Kappale("Savu", savuMesh, savu);

            laiva = Materiaali("Laiva");
            laivaMesh = UusiMesh("Laiva");
            laivaMesh.SetVertices(new Vector3[4]);
            laivaMesh.SetUVs(0, new List<Vector2> { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) });
            laivaMesh.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
            if (laiva != null) { laivaOlio = Kappale("Laiva", laivaMesh, laiva); laivaOlio.SetActive(false); }

            RakennaNimi();
        }

        Material Viivat(string nimi, List<Piirtoviiva> viivat, Color vari, float paksuus)
        {
            var m = Materiaali("Kynaviiva");
            if (m == null) return null;
            var paikat = new List<Vector3>();
            var seuraavat = new List<Vector3>();
            var puolet = new List<Vector2>();
            var piirto = new List<Vector4>();
            var kolmiot = new List<int>();
            var u = new List<Vector3>();
            foreach (var v in viivat)
            {
                int n = v.Pisteet.Length;
                if (n < 2) continue;
                u.Clear();
                for (int i = 0; i < n; i++) u.Add(Paikka(v.Pisteet[i], ViivaKorkeus));
                int pohja = paikat.Count;
                for (int i = 0; i < n; i++)
                {
                    Vector3 seur = i < n - 1 ? u[i + 1] : u[i] + (u[i] - u[i - 1]);
                    for (int s = 0; s < 2; s++)
                    {
                        paikat.Add(u[i]);
                        seuraavat.Add(seur);
                        puolet.Add(new Vector2(s == 0 ? -1 : 1, (float)v.Matkat[i]));
                        piirto.Add(new Vector4((float)v.Alku, (float)v.Kesto, (float)v.Pituus, 0));
                    }
                }
                for (int i = 0; i < n - 1; i++)
                {
                    int a = pohja + i * 2;
                    kolmiot.Add(a); kolmiot.Add(a + 1); kolmiot.Add(a + 2);
                    kolmiot.Add(a + 1); kolmiot.Add(a + 3); kolmiot.Add(a + 2);
                }
            }
            var mesh = UusiMesh(nimi);
            mesh.SetVertices(paikat);
            mesh.SetUVs(0, seuraavat);
            mesh.SetUVs(1, puolet);
            mesh.SetUVs(2, piirto);
            mesh.SetTriangles(kolmiot, 0);
            mesh.RecalculateBounds();
            m.SetColor("_BaseColor", vari);
            m.SetFloat("_Paksuus", paksuus);
            Kappale(nimi, mesh, m);
            return m;
        }

        /// <summary>Läikkien neliöt: 4 kärkeä per nosto ja 4 löydösmerkkiä heräävän maakunnan nimen alle.</summary>
        void RakennaLaikat()
        {
            var paikat = new List<Vector3>();
            var kulmat = new List<Vector2>();
            var tx = new List<Vector3>();
            var ty = new List<Vector3>();
            var siemen = new List<Vector2>();
            var kolmiot = new List<int>();
            laikkaTila.Clear();
            var rnd = new System.Random(1873);
            void Lisaa(LatLon p, double sade, float luokka)
            {
                var (ita, pohj, _) = Kanta(p);
                var c = Paikka(p, LaikkaKorkeus);
                int pohja = paikat.Count;
                float s = (float)rnd.NextDouble();
                foreach (var k in new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) })
                {
                    paikat.Add(c);
                    kulmat.Add(k);
                    tx.Add(ita * (float)sade);
                    ty.Add(pohj * (float)sade);
                    siemen.Add(new Vector2(s, 0));
                    laikkaTila.Add(new Vector4(0, 0, 1, luokka));
                }
                kolmiot.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
            }
            foreach (var n in kohtaus.Nostot) Lisaa(n.Nosto.Paikka, LaikanSade[(int)n.Nosto.Luokka], (float)n.Nosto.Luokka);
            // Löydösmerkit: rivi pieniä läikkiä nimen eteläpuolelle (luokka 2 = ei hehkua).
            int merkit = Math.Max(1, kohtaus.HeraavanNostoja);
            for (int i = 0; i < merkit; i++)
            {
                double dLon = (i - (merkit - 1) / 2.0) * 0.045;
                Lisaa(new LatLon(kohtaus.NimenPaikka.Lat - 0.11, kohtaus.NimenPaikka.Lon + dLon), 1500, 2);
            }
            laikkaMesh.SetVertices(paikat);
            laikkaMesh.SetUVs(0, kulmat);
            laikkaMesh.SetUVs(1, tx);
            laikkaMesh.SetUVs(2, ty);
            laikkaMesh.SetUVs(3, laikkaTila);
            laikkaMesh.SetUVs(4, siemen);
            laikkaMesh.SetTriangles(kolmiot, 0);
            laikkaMesh.RecalculateBounds();
            // Läikät kasvavat varjostimessa: rajat varmuuden vuoksi isommiksi, ettei Unity karsi niitä.
            var b = laikkaMesh.bounds;
            b.Expand(40000);
            laikkaMesh.bounds = b;
        }

        static TMP_FontAsset kasiala;

        TMP_FontAsset Kasiala()
        {
            if (kasiala != null) return kasiala;
            foreach (var tyyli in new[] { "Bold", "Regular", "Black" })
            {
                try { kasiala = TMP_FontAsset.CreateFontAsset("Snell Roundhand", tyyli); }
                catch (Exception e) { Kirjaa($"Snell Roundhand {tyyli}: {e.Message}"); }
                if (kasiala != null) { Kirjaa("käsiala: Snell Roundhand " + tyyli); break; }
            }
            return kasiala ?? KarttaKerrokset.Instanssi?.merkit?.fontti;
        }

        void RakennaNimi()
        {
            if (kohtaus.Heraava < 0) return;
            var fontti = Kasiala();
            if (fontti == null) { Kirjaa("nimi: ei fonttia"); return; }
            var go = new GameObject("Maakunnan nimi");
            go.transform.SetParent(transform, false);
            nimi = go.AddComponent<TextMeshPro>();
            nimi.font = fontti;
            nimi.text = KreikanAineisto.HeraavanNimi;
            nimi.fontSize = 36;
            nimi.alignment = TextAlignmentOptions.Center;
            nimi.textWrappingMode = TextWrappingModes.NoWrap;
            nimi.color = new Color(0.22f, 0.15f, 0.09f, 1f);
            nimi.rectTransform.sizeDelta = new Vector2(80, 12);
            var mat = nimi.fontMaterial;           // oma instanssi: piirto viimeisenä, ei syvyyskilpaa
            mat.renderQueue = 3017;
            if (mat.HasProperty("_ZTestMode")) mat.SetFloat("_ZTestMode", (float)CompareFunction.Always);
            var (ita, pohj, ylos) = Kanta(kohtaus.NimenPaikka);
            go.transform.localPosition = Paikka(new LatLon(kohtaus.NimenPaikka.Lat + 0.02, kohtaus.NimenPaikka.Lon), NimiKorkeus);
            // Nimi makaa kartalla pohjoinen ylös: paikallinen +X itään, +Y pohjoiseen, katse ylhäältä (−ylös).
            go.transform.localRotation = Quaternion.LookRotation(-ylos, pohj);
            // TMP:n 3D-tekstissä fonttikoko 10 = 1 yksikkö: koko 36 → rivi ~3,6 yksikköä → noin 14 km kartalla.
            go.transform.localScale = Vector3.one * 3900f;
            nimi.ForceMeshUpdate();
            var info = nimi.textInfo;
            nimenMinX = float.MaxValue; nimenMaxX = float.MinValue;
            for (int i = 0; i < info.characterCount; i++)
            {
                var c = info.characterInfo[i];
                if (!c.isVisible) continue;
                nimenMinX = Mathf.Min(nimenMinX, c.bottomLeft.x);
                nimenMaxX = Mathf.Max(nimenMaxX, c.topRight.x);
            }
            PaivitaNimi(0);
        }

        /// <summary>Käsialan kirjoitus: kynän x kulkee vasemmalta oikealle, kärjet häivytetään sen mukaan.</summary>
        void PaivitaNimi(double osuus)
        {
            if (nimi == null || nimenMaxX <= nimenMinX) return;
            var info = nimi.textInfo;
            float pehmeys = (nimenMaxX - nimenMinX) * 0.08f;
            float kyna = Mathf.Lerp(nimenMinX - pehmeys, nimenMaxX + pehmeys, (float)osuus);
            for (int i = 0; i < info.characterCount; i++)
            {
                var c = info.characterInfo[i];
                if (!c.isVisible) continue;
                var varit = info.meshInfo[c.materialReferenceIndex].colors32;
                var kar = info.meshInfo[c.materialReferenceIndex].vertices;
                for (int k = 0; k < 4; k++)
                {
                    int vi = c.vertexIndex + k;
                    float a = Mathf.Clamp01((kyna - kar[vi].x) / pehmeys);
                    var v = varit[vi];
                    v.a = (byte)(255 * a);
                    varit[vi] = v;
                }
            }
            nimi.UpdateVertexData(TMP_VertexDataUpdateFlags.Colors32);
        }

        // ── Pelin tila ──────────────────────────────────────────────────

        void TilaTalteen()
        {
            var k = KarttaKerrokset.Instanssi;
            if (k != null)
            {
                foreach (var kerros in new[] { "kaupungit", "nimiot", "nappula", "pisteet" }) k.Nakyvyys(kerros, false);
                if (k.varitaso != null) { varitasoEnnen = k.varitaso.Pakotettu; k.varitaso.Pakotettu = KreikanAineisto.Maa; }
            }
            aurinkoEnnen = Aurinko.Atsimuutti;
            aurinkoKorkeusEnnen = Aurinko.KorkeusAst;
            if (UiPiiloon)
            {
                foreach (var d in FindObjectsByType<UnityEngine.UIElements.UIDocument>(FindObjectsSortMode.None))
                {
                    var juuri = d.rootVisualElement;
                    if (juuri == null) continue;
                    piilotetutUi.Add((d, juuri.style.display));
                    juuri.style.display = UnityEngine.UIElements.DisplayStyle.None;
                }
                foreach (var c in FindObjectsByType<Canvas>(FindObjectsSortMode.None))
                    if (c.enabled && c.isRootCanvas && c.renderMode == RenderMode.ScreenSpaceOverlay) { c.enabled = false; piilotetutKanvasit.Add(c); }
            }
            tilaTalteen = true;
        }

        void Palauta()
        {
            if (!tilaTalteen) return;
            tilaTalteen = false;
            var k = KarttaKerrokset.Instanssi;
            if (k != null)
            {
                foreach (var kerros in new[] { "kaupungit", "nimiot", "nappula", "pisteet" }) k.Nakyvyys(kerros, true);
                if (k.varitaso != null) k.varitaso.Pakotettu = varitasoEnnen;
            }
            foreach (var (d, nakyvyys) in piilotetutUi)
                if (d != null && d.rootVisualElement != null) d.rootVisualElement.style.display = nakyvyys;
            piilotetutUi.Clear();
            foreach (var c in piilotetutKanvasit) if (c != null) c.enabled = true;
            piilotetutKanvasit.Clear();
            KarttaKerrokset.PallonSavy(null);
            Aurinko.Atsimuutti = aurinkoEnnen;
            Aurinko.KorkeusAst = aurinkoKorkeusEnnen;
            if (kierto != null) kierto.SeurantaLoppui();
        }

        void Lopeta()
        {
            Palauta();
            if (Instanssi == this) Instanssi = null;
            Destroy(gameObject);
        }

        // ── Kehys ─────────────────────────────────────────────────────────

        void OnEnable() => PallonLepo.Animoi(Animoi, "elävä kartta");
        void OnDisable() => PallonLepo.Poista(Animoi);
        bool Animoi() => vaihe == Vaihe.Soi || vaihe == Vaihe.Kuva;

        void Update()
        {
            if (kohtaus == null || vaihe == Vaihe.Lataa) return;
            if (vaihe == Vaihe.Soi)
            {
                t += Time.unscaledDeltaTime * nopeus;
                kehykset.Add(Time.unscaledDeltaTime * 1000f);
                if (t >= ElavaKohtaus.Kesto)
                {
                    t = ElavaKohtaus.Kesto;
                    vaihe = Vaihe.Loppu;
                    loppuHetki = Time.realtimeSinceStartupAsDouble;
                    var j = kehykset.OrderBy(x => x).ToList();
                    Kirjaa($"valmis {t:F1} s, kehyksiä {j.Count}, mediaani {j[j.Count / 2]:F1} ms, p95 {j[(int)(j.Count * 0.95)]:F1} ms, max {j[j.Count - 1]:F1} ms");
                }
            }
            string v = kohtaus.Vaihe(t);
            if (v != edellinenVaihe) { Kirjaa($"{t:F2} s: {v}"); edellinenVaihe = v; }
            Sovella(t);
            // Pito lopussa, sitten kartta ennalleen (video päättyy pitoon; "elava pois" palauttaa heti).
            if (vaihe == Vaihe.Loppu && Time.realtimeSinceStartupAsDouble - loppuHetki > 4) Lopeta();
        }

        void Sovella(double aika)
        {
            float ta = (float)aika;
            // Kamera: lennon kuvauksen rajapinta (asettaa kameran heti tässä kehyksessä).
            var a = kohtaus.KameranAsento(aika);
            kierto.Kuvaa(a.Lat, a.Lon, a.EtaisyysM, a.Kallistus, a.Suuntima, 0);

            // Aurinko ja hämärä (oikeat kartan rajapinnat).
            Aurinko.Atsimuutti = kohtaus.Aurinko(aika, out double korkeus);
            Aurinko.KorkeusAst = korkeus;
            double hamara = kohtaus.Hamara(aika);
            KarttaKerrokset.PallonSavy(hamara > 0 ? (float)(1 - 0.62 * hamara) : (float?)null);

            if (huntu != null)
            {
                huntu.SetFloat("_Sade", (float)(kohtaus.HuntuSadeKm(aika) / 6371.0));
                huntu.SetFloat("_Vesiraja", (float)kohtaus.Vesiraja(aika));
                huntu.SetFloat("_Peitto", kohtaus.HuntuNakyy(aika) ? 0.8f : 0f);
            }
            if (taytto != null)
            {
                taytto.SetFloat("_Aika", ta);
                taytto.SetFloat("_Asettuminen", (float)kohtaus.Asettuminen(aika));
                var (sade, valmis) = kohtaus.Tulva(aika);
                taytto.SetFloat("_TulvaSade", (float)(sade / 6371.0));
                taytto.SetFloat("_TulvaValmis", (float)valmis);
            }
            foreach (var m in new[] { rajat, joet, reitti })
                if (m != null) { m.SetFloat("_Aika", ta); m.SetFloat("_Kerroin", LinssiOhjain.Pistekerroin); }
            PaivitaLaikat(aika);
            PaivitaNimi(kohtaus.NimiOsuus(aika));
            PaivitaLaiva(aika);
            PaivitaValot(aika);
        }

        void PaivitaLaikat(double aika)
        {
            if (laikkaMesh == null || laikkaTila.Count == 0) return;
            int n = kohtaus.Nostot.Count;
            for (int i = 0; i < n; i++)
            {
                var (mitta, peitto, roiske) = kohtaus.Nosto(i, aika);
                // Napautuksen rengas: pääkohteen oma roiske uudelleen (ElavaKohtaus.NapautusRengas).
                if (i == kohtaus.Napautus)
                {
                    var (_, rp) = kohtaus.NapautusRengas(aika);
                    if (rp > 0) roiske = 1 - rp;
                }
                for (int k = 0; k < 4; k++)
                {
                    var v = laikkaTila[i * 4 + k];
                    laikkaTila[i * 4 + k] = new Vector4((float)mitta, (float)peitto, (float)roiske, v.w);
                }
            }
            var (merkkiMitta, merkkiPeitto) = kohtaus.Merkit(aika);
            int merkit = (laikkaTila.Count / 4) - n;
            for (int j = 0; j < merkit; j++)
                for (int k = 0; k < 4; k++)
                {
                    var v = laikkaTila[(n + j) * 4 + k];
                    float p = (float)merkkiPeitto * (j == 0 ? 0.95f : 0.28f);
                    laikkaTila[(n + j) * 4 + k] = new Vector4((float)merkkiMitta, p, 1, v.w);
                }
            laikkaMesh.SetUVs(3, laikkaTila);
        }

        void PaivitaLaiva(double aika)
        {
            var tila = kohtaus.LaivanTila(aika);
            if (laivaOlio == null) return;
            if (laivaOlio.activeSelf != tila.Nakyy) laivaOlio.SetActive(tila.Nakyy);
            var puhallukset = kohtaus.Savu(aika).ToList();
            if (!tila.Nakyy && puhallukset.Count == 0) { savuMesh.Clear(); return; }
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            Vector3 KameraLokaali() => gt.InverseTransformPoint(kt.position);
            var kameraL = KameraLokaali();
            if (tila.Nakyy)
            {
                var (ita, pohj, ylos) = Kanta(tila.Paikka);
                var c = Paikka(tila.Paikka, 300);
                Vector3 kohti = kameraL - c;
                Vector3 oikea = Vector3.Cross(ylos, kohti).normalized;
                if (oikea.sqrMagnitude < 1e-6f) oikea = ita;
                float s = (float)(tila.Suunta * Math.PI / 180);
                Vector3 kulku = ita * Mathf.Sin(s) + pohj * Mathf.Cos(s);
                float suunta = Vector3.Dot(kulku, oikea) >= 0 ? 1 : -1;
                float puoli = (float)(LaivanPituus / 2), korkeus = (float)(LaivanPituus / 2);
                laivaMesh.SetVertices(new[] { c - oikea * puoli, c + oikea * puoli, c + oikea * puoli + ylos * korkeus, c - oikea * puoli + ylos * korkeus });
                laivaMesh.RecalculateBounds();
                laiva.SetFloat("_Suunta", suunta);
                laiva.SetFloat("_Peitto", (float)tila.Peitto);
                laiva.SetFloat("_Aika", (float)aika);
            }
            // Savu: puhallus syntyy piipusta laivan paikassa syntyhetkellä, nousee, ajelehtii perään ja haalenee.
            var paikat = new List<Vector3>();
            var varit = new List<Color>();
            var kulmat = new List<Vector2>();
            var kolmiot = new List<int>();
            foreach (var p in puhallukset)
            {
                var (ita, pohj, ylos) = Kanta(p.Paikka);
                float s = (float)(p.Suunta * Math.PI / 180);
                Vector3 kulku = ita * Mathf.Sin(s) + pohj * Mathf.Cos(s);
                float ika = (float)p.Ika, u = ika / (float)ElavaKohtaus.SavunIka;
                Vector3 keski = Paikka(p.Paikka, 300) + ylos * (float)(LaivanPituus * 0.25 + SavunNousu * (1 - Mathf.Exp(-ika * 1.4f)) * 1.6)
                                - kulku * (float)(SavunAjelehdus * ika) + kulku * (float)(LaivanPituus * 0.03);
                float koko = (float)(1400 + 3800 * Mathf.Sqrt(u));
                Vector3 kohti = (kameraL - keski).normalized;
                Vector3 oikea = Vector3.Cross(ylos, kohti).normalized * koko;
                Vector3 yla = Vector3.Cross(kohti, oikea).normalized * koko;
                float peitto = Mathf.Clamp01(ika / 0.12f) * (1 - u) * 0.55f * (float)kohtaus.LaivanTila(Math.Min(aika, ElavaKohtaus.HetkiLoppu - 0.01)).Peitto;
                int pohja = paikat.Count;
                paikat.Add(keski - oikea - yla); paikat.Add(keski + oikea - yla); paikat.Add(keski + oikea + yla); paikat.Add(keski - oikea + yla);
                var vari = new Color(0.36f, 0.33f, 0.30f, peitto);
                for (int k = 0; k < 4; k++) varit.Add(vari);
                kulmat.Add(new Vector2(-1, -1)); kulmat.Add(new Vector2(1, -1)); kulmat.Add(new Vector2(1, 1)); kulmat.Add(new Vector2(-1, 1));
                kolmiot.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
            }
            savuMesh.Clear();
            savuMesh.SetVertices(paikat);
            savuMesh.SetColors(varit);
            savuMesh.SetUVs(0, kulmat);
            savuMesh.SetTriangles(kolmiot, 0);
            savuMesh.RecalculateBounds();
        }

        void PaivitaValot(double aika)
        {
            if (valoMesh == null) return;
            var paikat = new List<Vector3>();
            var varit = new List<Color>();
            var kulmat = new List<Vector2>();
            var kolmiot = new List<int>();
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            var kameraL = gt.InverseTransformPoint(kt.position);
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            for (int i = 0; i < kohtaus.Valot.Count; i++)
            {
                double voima = kohtaus.ValonVoima(i, aika);
                if (voima <= 0.001) continue;
                var c = Paikka(kohtaus.Valot[i].Paikka, 3000);
                Vector3 kohti = kameraL - c;
                float etaisyys = kohti.magnitude;
                // Koko ruutupisteinä (sama kaikilla korkeuksilla), pieni värinä kuin kaupungin valot.
                float koko = ValonKokoPx * LinssiOhjain.Pistekerroin * 2f * etaisyys * tanPuoli / Mathf.Max(1, Screen.height) * 0.5f;
                koko *= (float)(0.8 + 0.4 * voima);
                var (_, _, ylos) = Kanta(kohtaus.Valot[i].Paikka);
                Vector3 k = kohti / Mathf.Max(etaisyys, 1);
                Vector3 oikea = Vector3.Cross(ylos, k).normalized * koko;
                Vector3 yla = Vector3.Cross(k, oikea).normalized * koko;
                float varina = 0.92f + 0.08f * Mathf.Sin((float)aika * 7.3f + i * 1.7f);
                var vari = new Color(1.0f, 0.78f, 0.42f, (float)voima * varina);
                int pohja = paikat.Count;
                paikat.Add(c - oikea - yla); paikat.Add(c + oikea - yla); paikat.Add(c + oikea + yla); paikat.Add(c - oikea + yla);
                for (int q = 0; q < 4; q++) varit.Add(vari);
                kulmat.Add(new Vector2(-1, -1)); kulmat.Add(new Vector2(1, -1)); kulmat.Add(new Vector2(1, 1)); kulmat.Add(new Vector2(-1, 1));
                kolmiot.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
            }
            valoMesh.Clear();
            valoMesh.SetVertices(paikat);
            valoMesh.SetColors(varit);
            valoMesh.SetUVs(0, kulmat);
            valoMesh.SetTriangles(kolmiot, 0);
            valoMesh.RecalculateBounds();
        }

        void OnDestroy()
        {
            Palauta();
            foreach (var o in roskat) if (o != null) Destroy(o);
            if (nimi != null && nimi.fontMaterial != null) Destroy(nimi.fontMaterial);
            if (Instanssi == this) Instanssi = null;
        }
    }
}
