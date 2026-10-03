// AJATTELIJAT-LINSSI NATIIVISSA (Linssiseppä 2, 2.10.2026; Päätoimittaja: "web on malli … tee natiivista samalla tavalla
// datapohjainen. Silloin Marcus ja Platon tulevat pelkkinä datoina."). Web: js/linssit/ajattelija.js (moottori) ja
// js/linssit/ajattelija-<tunnus>.js (data, Pelikoodarin PR #3840).
//
// AJATTELIJAT OVAT DATAA: Linssit/Resources/Ajattelijat/<tunnus>.json syntyy webin datamoduulista työkalulla
// tyokalut/ajattelijat-natiiviin.mjs (myös tekstiatlas <tunnus>-atlas.bytes webin piirraAtlas-funktiolla). Moottori ei
// tunne yhtäkään ajattelijaa nimeltä; uusi ajattelija = työkalun ajo, ei koodimuutosta. Tarkista() on webin
// tarkistaAjattelija() sellaisenaan (samat kentät, sama järjestys), joten vajaa data hylätään samoin kuin webissä.
//
// Luvut ovat Blenderin koordinaateissa (metrit, z ylös, kasvot −y) kuten webin datassa; Unity-puoli muuntaa
// (x, y, z) → (x, z, y) (webin b2t → three.js (x, z, −y), ja glTF → Unity peilaa z:n).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Ajattelijat
{
    public sealed class AjattelijaOtos
    {
        public double R; public double[] Paikka, Katse; public double Mm;
    }

    public sealed class AjattelijaSpotti
    {
        public double[] Paikka, Kohde; public double Teho, Keila, Blend;
    }

    public sealed class AjattelijaPaalause
    {
        public string Fi, El, Viite;
        /// <summary>Kohta bystillä: Sade [x, z] edestä tai (kierrokset 2–, web #3884) Sivulta [y, z] säteellä x = 2 → −x.</summary>
        public double[] Sade, Sivulta, Vino;
        public double Ala, Etaisyys, Korkeus, KameraKulma, KameraMatka;
    }

    public sealed class AjattelijaAjat
    {
        public double[] Nimi, Kysymys, Lahesty, Vieritys, Lahde, Kaiku;
        public double KaariLoppu, Pito;
    }

    public sealed class AjattelijaPrologi
    {
        public double Kytkin, Taysi, Loppu;
        public AjattelijaOtos Kamera;
        public double[] Vari;
        public List<AjattelijaSpotti> Valot = new List<AjattelijaSpotti>();
    }

    public sealed class AjattelijaKaiku
    {
        public string Kuva;
        public double Lev, Etaisyys, Voima, Liuku, Blend;
        public double[] Vino, Savy;
        // Kaiun kamera (v10): suunta normaaliin lisättynä, matka alku → loppu, liuku, polttoväli, siirtymän ruudut.
        public double[] KameraSuunta, KameraMatka;
        public double KameraLiuku, KameraMm, KameraSiirtyma;
        // Täyte: osuus auringon voimasta, suunta, väri, keila, pehmeys.
        public double TayteOsuus, TayteKeila, TayteBlend;
        public double[] TayteSuunta, TayteVari;
    }

    /// <summary>Kierroksen 2– kaiku (web #3884 kierrokset.lista[].kaiku); puuttuvat Blend ja Savy kierroksen 1 kaiusta.</summary>
    public sealed class AjattelijaKierrosKaiku
    {
        public string Kuva;
        /// <summary>Kohde: KohdeSade [x, z] edestä tai KohdeSivulta [y, z] sivulta (toinen null).</summary>
        public double[] KohdeSade, KohdeSivulta, Ruudut, Vino, Savy, TayteSuunta;
        public double Etaisyys, Lev, Voima, Liuku, Blend = double.NaN;
    }

    /// <summary>Kierros 2– (web kierrokset.lista[]): päälause ja sen atlasrivi, ajat [vieritys, lähde, virta r0–r3], siemen, kaiku.</summary>
    public sealed class AjattelijaKierros
    {
        public string PaalauseAvain;
        public AjattelijaPaalause Lause;
        public int AtlasRivi;
        public double[] Vieritys, Lahde, Virta;
        public uint Siemen;
        public AjattelijaKierrosKaiku Kaiku;
    }

    /// <summary>
    /// Kierrokset 2– (web #3884 a.kierrokset, Blender v9/v10): yksi ääniraita ja syke koko kohtaukselle, loppuruutu (lappu)
    /// ja kameran avaimet [ruutu, paikka, katse, mm]; ensimmäinen avain on kierroksen 1 pito (näyttämö korvaa sen omalla).
    /// </summary>
    public sealed class AjattelijaKierrokset
    {
        public string Puhe, Musiikki, Syke;
        public double Loppu;
        public List<AjattelijaKierros> Lista = new List<AjattelijaKierros>();
        public List<AjattelijaOtos> Kamera = new List<AjattelijaOtos>();
    }

    public sealed class AjattelijaProjektori
    {
        public double[] Kohde, Suunta; public double Ala; public int Riveja;
        /// <summary>v14: kauempana pinnasta olevan projektorin pehmeyskerroin (sumeus × pehmeys atlakseen); oletus 1.</summary>
        public double Pehmeys = 1;
    }

    public sealed class AjattelijaRivi
    {
        public string Kieli, Fontti, Teksti;
    }

    public sealed class AjattelijaTaustavirta
    {
        public double Etaisyys, Blend, VoimaKerroin, Kulma;
        /// <summary>Tahti pinnalla (web #3891 nopeus, Blender v11): mm/s ja vaihtelu ± (kertoimet tasavälein 1 ± vaihtelu).</summary>
        public double Mms, Vaihtelu;
        /// <summary>
        /// v14 (web 088b64d0c): sumeus em-osuutena (atlakseen), riviTila (kirjaimet 1 / riviTila -kokoisina, nauha riviTila-kertaisena),
        /// riviKorkeus (atlaksen nauha px) ja riviKoko (rivikorkeuden kerroin pinnalla). Puuttuvat: 0, 1, 96, 1.
        /// </summary>
        public double Sumeus, RiviTila = 1, RiviKorkeus = 96, RiviKoko = 1;
        /// <summary>
        /// Natiivin rajat (Päätoimittaja 4.10., omistaja TF 133): nauhan suurin korkeus ruudun korkeudesta (rajaKoko, 0 = pois;
        /// yli rajan rivi häivyttyy välillä raja … raja × 1,3) ja geometrisen N·L:n häivytys rajaKulma [pois alle, täysi yli].
        /// </summary>
        public double RajaKoko = OletusRajaKoko;
        public double[] RajaKulma = { 0.1, 0.25 };
        public const double OletusRajaKoko = 0.08;
        public uint Siemen;
        public double[] Rivikork, Ajat;
        public Dictionary<string, double[]> Kirkkaus = new Dictionary<string, double[]>();
        public List<AjattelijaProjektori> Projektorit = new List<AjattelijaProjektori>();
        public List<AjattelijaRivi> Rivit = new List<AjattelijaRivi>();
    }

    /// <summary>Atlaksen rivi (webin piirraAtlas paikat): y ja korkeus pikseleinä, lev = rivin (toistolla laatan) leveys.</summary>
    public sealed class AtlasRivi
    {
        public double Y, Korkeus, Lev, UMax; public bool Sumea;
    }

    public sealed class AjattelijaAtlas
    {
        public string Tiedosto; public int Leveys, Korkeus;
        public List<AtlasRivi> Paikat = new List<AtlasRivi>();
    }

    /// <summary>Aikajanan kamera-avain (web aikajanaKamera): Ajo = 'BEZIER' (ajo seuraavaan), muuten leikkaus (CONSTANT).</summary>
    public sealed class AikajanaKameraAvain
    {
        public double R; public double[] Paikka, Katse; public double Mm; public bool Ajo;
    }

    /// <summary>Aikajanan auringon avain (web aikajanaAurinko): paikka, energia (W) ja väri (null = perusväri).</summary>
    public sealed class AikajanaAurinkoAvain
    {
        public double R; public double[] Paikka; public double Energia; public double[] Vari;
    }

    /// <summary>Lainauksen videotykki (aikajana.tykit): energia-avaimet [ruutu, W], kiinteä tai vieritys, v14b kortin leveys.</summary>
    public sealed class AikajanaTykki
    {
        public string PaalauseAvain;
        public AjattelijaPaalause Lause;
        public int AtlasRivi;
        public double[] Paikka, Suunta, Vierii;
        public double Ala, Blend, Korkeus = double.NaN, Leveys = double.NaN;
        public bool Kiintea;
        public List<double[]> Energia = new List<double[]>();
    }

    /// <summary>Aikajanan kaiku (aikajana.kaiut): kuva-ala (lev × kork tai keila), liuku ja energia-avaimet.</summary>
    public sealed class AikajanaKaiku
    {
        public string Kuva;
        public double[] Paikka, Suunta, Ruudut;
        public double Ala, Lev = double.NaN, Kork = double.NaN, Blend, Liuku;
        public List<double[]> Energia = new List<double[]>();
    }

    /// <summary>Väistökehä (v13c): taustavirta jättää kohteen ympärille tyhjän kehän ruutujen ajaksi.</summary>
    public sealed class AikajanaVaisto
    {
        public double[] Kohde, Ruudut; public double Sade;
    }

    /// <summary>Rakovalon avain (v14b): [ruutu, paikka, suunta, energia, [koko, koko_y], spread°] askelina.</summary>
    public sealed class RakoAvain
    {
        public double R; public double[] Paikka, Suunta; public double Energia, Koko, KokoY, Spread;
    }

    /// <summary>Kaikusarjan kuva (v13c): pelkkä kuva tai harmaa- ja seepiaversiot.</summary>
    public sealed class KaikusarjanKuva
    {
        public string Kuva, Harmaa, Seepia;
    }

    /// <summary>
    /// AIKAJANA (v13–v14, web a.aikajana, tools/ajattelija-aikajana.mjs Linnanrakentajan Blender-luvuista): koko kohtaus
    /// yhtenä aikajanana, kierrokset eivät ole käytössä. Avaimet Blenderin sellaisinaan (ruudut 30 r/s, koordinaatit Blender).
    /// </summary>
    public sealed class AjattelijaAikajanaData
    {
        public double Loppu;
        public List<AikajanaKameraAvain> Kamera = new List<AikajanaKameraAvain>();
        public double[] AurinkoKohde;
        public List<AikajanaAurinkoAvain> Aurinko = new List<AikajanaAurinkoAvain>();
        // Pyyhkäisy (valinnainen): kapea sivuvalo, kohde avaimista tai suunnasta.
        public bool Pyyhkaisy;
        public double[] PyyhkaisyPaikka, PyyhkaisySuunta, PyyhkaisyVari;
        public double PyyhkaisyKeila, PyyhkaisyBlend;
        public List<double[]> PyyhkaisyEnergia = new List<double[]>();
        public List<(double R, double[] Kohde)> PyyhkaisyKohteet;
        public List<AikajanaTykki> Tykit = new List<AikajanaTykki>();
        public List<AikajanaKaiku> Kaiut = new List<AikajanaKaiku>();
        public List<double[]> Virta = new List<double[]>();
        public List<AikajanaVaisto> Vaisto = new List<AikajanaVaisto>();
        // Savumaski (v13c): 240 ruutua neljänä kanavana 8 × 8 laatassa; null = ei savua.
        public string SavuKuva;
        public double SavuAla, SavuKesto, SavuFps, SavuRuutuja, SavuYdin = 0.28, SavuVahvuus;
        /// <summary>
        /// Pehmeä savu (omistaja TF 133): maskin sumennus laatan uv:nä ja harso (tummennuksen osuus, 1 = webin v5-varjo).
        /// Oletukset natiivin itsetarkistuksesta; data voi antaa omat (savu.pehmeys, savu.harso).
        /// </summary>
        public double SavuPehmeys = OletusSavuPehmeys, SavuHarso = OletusSavuHarso;
        public const double OletusSavuPehmeys = 0.04, OletusSavuHarso = 0.5;
        public double[] TykkiVari, KaikuVari;
        // Rakovalo (v14b), ympäristövalon kerroin [[ruutu, kerroin]] ja varjolevy (vain varjo).
        public List<RakoAvain> Rako;
        public List<double[]> RakoEnergia;   // vanha muoto (ilman avaimia): energia avainArvona
        public double[] RakoVari;
        public List<double[]> Ymparisto;
        public double[] VarjolevyKeski, VarjolevyKoko, VarjolevyRuudut;
        // Päälainaus korttina (v14) ja porrastettu taustavirta.
        public bool Kortti;
        public double KorttiMerkkeja, KorttiLeveys, KorttiSiirto;
        public bool Porrastus;
        public double PorrasAlku, PorrasVali, PorrasHaivytys, PorrasRintama, PorrasReuna = 1;
        public double VirtaVoima = 1;
        public string Puhe, Musiikki, Syke, Kaikusarja;
        public Dictionary<string, List<KaikusarjanKuva>> Kaikusarjat = new Dictionary<string, List<KaikusarjanKuva>>();
    }

    public sealed class AjattelijaKappale
    {
        public string Otsikko, Teksti;
    }

    public sealed class AjattelijaData
    {
        public string Tunnus, Nimi, Vuodet, Kysymys, Malli, Kipsi, Syke, Puhe, Musiikki;
        public List<string> NimiRivit = new List<string>();
        public double[] Paa;
        public double[] AvainSuunta, AvainTahtays;
        public double AvainEtaisyys, AvainKeila;
        public AjattelijaOtos Rembrandt;
        public AjattelijaPaalause Paalause;
        public double Linssi, Kierto, Liuku, Ca, SyvyysTykki;
        public double[] TykkiVari;
        public AjattelijaAjat Ajat;
        public AjattelijaPrologi Prologi;
        public List<AjattelijaOtos> IntroOtokset = new List<AjattelijaOtos>();
        /// <summary>Auringon polku introssa: (ruutu, suunta).</summary>
        public List<(double R, double[] Suunta)> IntroValo = new List<(double, double[])>();
        /// <summary>Maailman täyte alkukuvissa (web #3892 intro.tayte, osuus TAYTE:sta ennen nimeä); puuttuu → 1.</summary>
        public double IntroTayte = 1;
        public AjattelijaKaiku Kaiku;
        /// <summary>Kierrokset 2– (valinnainen; Marcuksella ei vielä ole). Aikajana-tilassa ei käytössä.</summary>
        public AjattelijaKierrokset Kierrokset;
        /// <summary>Aikajana (v13–v14, valinnainen): kun on, kierrokset jäävät käyttämättä (web KR = AJ ? null : …).</summary>
        public AjattelijaAikajanaData Aikajana;
        public AjattelijaTaustavirta Taustavirta;
        public AjattelijaAtlas Atlas;
        public string ElamaOtsikko;
        public List<AjattelijaKappale> Elama = new List<AjattelijaKappale>();
        public List<string> PulunKysymykset = new List<string>();
        /// <summary>Kartan pää (web #3843 kartta.maa ISO3 ja kartta.glb); null = ei karttapäätä.</summary>
        public string KarttaMaa, KarttaGlb;
        /// <summary>Kiinteä karttapiste [lat, lng] (web kartta.piste) tai null.</summary>
        public double[] KarttaPiste;

        /// <summary>Webin tarkistaAjattelija: puuttuvat pakolliset kentät (tyhjä = kelpaa). Natiivin lisäys: atlas.</summary>
        public static List<string> Tarkista(Dictionary<string, object> a)
        {
            var puuttuu = new List<string>();
            void Vaadi(bool ehto, string nimi) { if (!ehto) puuttuu.Add(nimi); }
            Vaadi(a != null && K(a, "tunnus") is string, "tunnus");
            if (a == null) return puuttuu;
            foreach (var k in new[] { "nimi", "vuodet", "kysymys", "malli", "kipsi" }) Vaadi(K(a, k) is string s && s.Length > 0, k);
            foreach (var k in new[] { "paa", "tausta", "linssi", "kierto", "liuku", "ca", "syvyys" }) Vaadi(K(a, k) != null, k);
            var av = O(a, "avainvalo");
            Vaadi(K(av, "suunta") != null && K(av, "tahtays") != null, "avainvalo");
            Vaadi(K(O(O(a, "otokset"), "rembrandt"), "paikka") != null, "otokset.rembrandt");
            var lauseAvain = K(O(a, "kierros"), "paalause") as string;
            var lause = lauseAvain != null ? O(O(a, "paalauseet"), lauseAvain) : null;
            Vaadi(Tosi(K(lause, "fi")) && Tosi(K(lause, "el")) && Tosi(K(lause, "viite")) && Tosi(K(lause, "sade")) && Tosi(K(lause, "vino")),
                "kierros.paalause → paalauseet");
            var ajat = O(a, "ajat");
            foreach (var k in new[] { "nimi", "kysymys", "lahesty", "vieritys", "lahde", "kaariLoppu", "kaiku", "pito" }) Vaadi(K(ajat, k) != null, "ajat." + k);
            Vaadi(Pituus(K(O(a, "prologi"), "valot")) > 0, "prologi");
            var intro = O(a, "intro");
            Vaadi(Pituus(K(intro, "otokset")) > 0 && Pituus(K(intro, "valo")) > 0, "intro");
            var tv = O(a, "taustavirta");
            Vaadi(Pituus(K(tv, "rivit")) > 0 && Pituus(K(tv, "projektorit")) > 0 && Nro0(K(O(tv, "nopeus"), "mms")) > 0, "taustavirta");
            Vaadi(K(O(a, "fontit"), "iowan") != null, "fontit.iowan");
            var kaiku = K(a, "kaiku");
            if (kaiku != null) Vaadi(Tosi(K(kaiku as Dictionary<string, object>, "kuva")) && Tosi(K(kaiku as Dictionary<string, object>, "kamera")), "kaiku");
            var elama = K(a, "elama");
            if (elama != null) Vaadi(Tosi(K(elama as Dictionary<string, object>, "otsikko")) && Pituus(K(elama as Dictionary<string, object>, "kappaleet")) > 0, "elama");
            var pk = K(a, "pulunKysymykset");
            if (pk != null) Vaadi(pk is List<object> l && l.Count > 0, "pulunKysymykset");
            var aani = O(a, "aani");
            Vaadi(Tosi(K(aani, "puhe")) && Tosi(K(aani, "musiikki")), "aani");
            Vaadi(Tosi(K(O(a, "tykki"), "vari")), "tykki");
            // Valinnainen aikajana (v13): kamera, aurinko, tykit (päälauseet atlakseen), kaiut, virta ja ääni.
            var ajd = O(a, "aikajana");
            if (ajd != null)
            {
                Vaadi(Nro0(K(ajd, "loppu")) > 0 && Pituus(K(ajd, "kamera")) > 0 && Pituus(K(O(ajd, "aurinko"), "avaimet")) > 0 && Pituus(K(ajd, "virta")) > 0,
                    "aikajana");
                Vaadi(Tosi(K(O(ajd, "aani"), "puhe")) && Tosi(K(O(ajd, "aani"), "musiikki")), "aikajana.aani");
                var tl = MiniJson.TaulukkoTaiTyhja(K(ajd, "tykit"));
                for (int i = 0; i < tl.Count; i++)
                {
                    var l = K(tl[i] as Dictionary<string, object>, "paalause") is string pa ? O(O(a, "paalauseet"), pa) : null;
                    Vaadi(Tosi(K(l, "fi")) && Nro0(K(l, "korkeus")) != 0, $"aikajana.tykit[{i}]");
                }
                var kl0 = MiniJson.TaulukkoTaiTyhja(K(ajd, "kaiut"));
                for (int i = 0; i < kl0.Count; i++)
                {
                    var k = kl0[i] as Dictionary<string, object>;
                    Vaadi(Tosi(K(k, "kuva")) && Pituus(K(k, "energia")) > 0, $"aikajana.kaiut[{i}]");
                }
            }
            // Valinnaiset kierrokset 2– (Blender v9/v10): päälause, ajat, kaiku ja kameran avaimet.
            var kr = O(a, "kierrokset");
            if (K(a, "kierrokset") != null)
            {
                var kra = O(kr, "aani");
                Vaadi(Tosi(K(kra, "puhe")) && Tosi(K(kra, "musiikki")) && Nro0(K(kr, "loppu")) > Nro0(K(ajat, "pito")), "kierrokset.aani/loppu");
                var kam = K(kr, "kamera") as List<object>;
                Vaadi(kam != null && kam.Count >= 2 && Ruutu(kam[0]) == Nro0(K(ajat, "pito")) && Ruutu(kam[kam.Count - 1]) == Nro0(K(kr, "loppu")),
                    "kierrokset.kamera");
                var kl = MiniJson.TaulukkoTaiTyhja(K(kr, "lista"));
                for (int i = 0; i < kl.Count; i++)
                {
                    var k = kl[i] as Dictionary<string, object>;
                    var l = K(k, "paalause") is string pa ? O(O(a, "paalauseet"), pa) : null;
                    Vaadi(Tosi(K(l, "fi")) && Tosi(K(l, "el")) && Tosi(K(l, "viite")) && (Tosi(K(l, "sade")) || Tosi(K(l, "sivulta"))) && Tosi(K(l, "vino"))
                        && Nro0(K(l, "ala")) != 0 && Nro0(K(l, "korkeus")) != 0, $"kierrokset.lista[{i}].paalause");
                    foreach (var avain in new[] { "vieritys", "lahde", "virta" }) Vaadi(K(k, avain) is List<object>, $"kierrokset.lista[{i}].{avain}");
                    if (K(k, "kaiku") is Dictionary<string, object> kc)
                        Vaadi(Tosi(K(kc, "kuva")) && (Tosi(K(O(kc, "kohde"), "sade")) || Tosi(K(O(kc, "kohde"), "sivulta"))) && Tosi(K(kc, "ruudut")),
                            $"kierrokset.lista[{i}].kaiku");
                }
                Vaadi(kl.Count > 0, "kierrokset.lista");
            }
            // Natiivi: tekstiatlas (tyokalut/ajattelijat-natiiviin.mjs); ilman sitä videotykillä ei ole kuvaa. Rivit: päälause,
            // taustavirta ja kierrosten 2– päälauseet (aikajana-tilassa aikajanan lainaukset).
            var atlas = O(a, "atlas");
            int lisarivit = ajd != null ? Pituus(K(ajd, "tykit")) : Pituus(K(kr, "lista"));
            Vaadi(Tosi(K(atlas, "tiedosto")) && Pituus(K(atlas, "paikat")) == 1 + Pituus(K(tv, "rivit")) + lisarivit, "atlas");
            return puuttuu;
        }

        /// <summary>Lukee tarkistetun datan (Tarkista() tyhjä). Heittää, jos kenttä puuttuu.</summary>
        public static AjattelijaData Lue(Dictionary<string, object> a)
        {
            var d = new AjattelijaData
            {
                Tunnus = T(a, "tunnus"), Nimi = T(a, "nimi"), Vuodet = T(a, "vuodet"), Kysymys = T(a, "kysymys"),
                Malli = T(a, "malli"), Kipsi = T(a, "kipsi"), Syke = T(a, "syke"),
                Paa = V(a, "paa"), Linssi = L(a, "linssi"), Kierto = L(a, "kierto"), Liuku = L(a, "liuku"),
                Ca = L(a, "ca"), SyvyysTykki = L(a, "syvyys"),
            };
            foreach (var r in MiniJson.TaulukkoTaiTyhja(K(a, "nimiRivit"))) d.NimiRivit.Add(r as string);
            if (d.NimiRivit.Count == 0) d.NimiRivit.Add(d.Nimi);
            var av = O(a, "avainvalo");
            d.AvainSuunta = V(av, "suunta"); d.AvainTahtays = V(av, "tahtays"); d.AvainEtaisyys = L(av, "etaisyys"); d.AvainKeila = L(av, "keila");
            d.Rembrandt = Otos(O(O(a, "otokset"), "rembrandt"));
            d.Paalause = Lause(O(O(a, "paalauseet"), T(O(a, "kierros"), "paalause")));
            d.TykkiVari = V(O(a, "tykki"), "vari");
            var aj = O(a, "ajat");
            d.Ajat = new AjattelijaAjat
            {
                Nimi = V(aj, "nimi"), Kysymys = V(aj, "kysymys"), Lahesty = V(aj, "lahesty"), Vieritys = V(aj, "vieritys"),
                Lahde = V(aj, "lahde"), Kaiku = V(aj, "kaiku"), KaariLoppu = L(aj, "kaariLoppu"), Pito = L(aj, "pito"),
            };
            var pr = O(a, "prologi");
            d.Prologi = new AjattelijaPrologi
            {
                Kytkin = L(pr, "kytkin"), Taysi = L(pr, "taysi"), Loppu = L(pr, "loppu"), Kamera = Otos(O(pr, "kamera")), Vari = V(pr, "vari"),
            };
            foreach (var v in MiniJson.TaulukkoTaiTyhja(K(pr, "valot")))
            {
                var o = v as Dictionary<string, object>;
                d.Prologi.Valot.Add(new AjattelijaSpotti { Paikka = V(o, "paikka"), Kohde = V(o, "kohde"), Teho = L(o, "teho"), Keila = L(o, "keila"), Blend = L(o, "blend") });
            }
            var intro = O(a, "intro");
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(intro, "otokset")))
            {
                var l = (List<object>)x;
                d.IntroOtokset.Add(new AjattelijaOtos { R = Nro(l[0]), Paikka = Vek(l[1]), Katse = Vek(l[2]), Mm = Nro(l[3]) });
            }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(intro, "valo")))
            {
                var l = (List<object>)x;
                d.IntroValo.Add((Nro(l[0]), Vek(l[1])));
            }
            d.IntroTayte = Lv(intro, "tayte", 1);
            if (K(a, "kaiku") is Dictionary<string, object> kk)
            {
                var kam = O(kk, "kamera"); var tay = O(kk, "tayte");
                d.Kaiku = new AjattelijaKaiku
                {
                    Kuva = T(kk, "kuva"), Lev = L(kk, "lev"), Vino = V(kk, "vino"), Etaisyys = L(kk, "etaisyys"), Voima = L(kk, "voima"),
                    Liuku = L(kk, "liuku"), Savy = V(kk, "savy"), Blend = L(kk, "blend"),
                    KameraSuunta = V(kam, "suunta"), KameraMatka = V(kam, "matka"), KameraLiuku = L(kam, "liuku"), KameraMm = L(kam, "mm"),
                    KameraSiirtyma = L(kam, "siirtyma"),
                    TayteOsuus = L(tay, "osuus"), TayteSuunta = V(tay, "suunta"), TayteVari = V(tay, "vari"), TayteKeila = L(tay, "keila"),
                    TayteBlend = L(tay, "blend"),
                };
            }
            if (K(a, "kierrokset") is Dictionary<string, object> kr)
            {
                var kra = O(kr, "aani");
                d.Kierrokset = new AjattelijaKierrokset { Puhe = T(kra, "puhe"), Musiikki = T(kra, "musiikki"), Syke = T(kr, "syke"), Loppu = L(kr, "loppu") };
                int rivit = MiniJson.TaulukkoTaiTyhja(K(O(a, "taustavirta"), "rivit")).Count;
                foreach (var x in MiniJson.TaulukkoTaiTyhja(K(kr, "lista")))
                {
                    var o = x as Dictionary<string, object>;
                    var k = new AjattelijaKierros
                    {
                        PaalauseAvain = T(o, "paalause"), Lause = Lause(O(O(a, "paalauseet"), T(o, "paalause"))),
                        AtlasRivi = 1 + rivit + d.Kierrokset.Lista.Count,
                        Vieritys = V(o, "vieritys"), Lahde = V(o, "lahde"), Virta = V(o, "virta"),
                        Siemen = K(o, "siemen") is object sm ? (uint)Nro(sm) : (uint)L(O(a, "taustavirta"), "siemen"),
                    };
                    if (K(o, "kaiku") is Dictionary<string, object> kc)
                    {
                        var ko = O(kc, "kohde");
                        k.Kaiku = new AjattelijaKierrosKaiku
                        {
                            Kuva = T(kc, "kuva"), KohdeSade = K(ko, "sade") is object ks ? Vek(ks) : null,
                            KohdeSivulta = K(ko, "sivulta") is object kv ? Vek(kv) : null, Ruudut = V(kc, "ruudut"), Vino = V(kc, "vino"),
                            Etaisyys = L(kc, "etaisyys"), Lev = L(kc, "lev"), Voima = L(kc, "voima"), Liuku = L(kc, "liuku"),
                            Blend = Lv(kc, "blend", double.NaN), Savy = K(kc, "savy") is object sv ? Vek(sv) : null,
                            TayteSuunta = K(O(kc, "tayte"), "suunta") is object ts ? Vek(ts) : null,
                        };
                    }
                    d.Kierrokset.Lista.Add(k);
                }
                foreach (var x in MiniJson.TaulukkoTaiTyhja(K(kr, "kamera")))
                {
                    var l = (List<object>)x;
                    d.Kierrokset.Kamera.Add(new AjattelijaOtos { R = Nro(l[0]), Paikka = Vek(l[1]), Katse = Vek(l[2]), Mm = Nro(l[3]) });
                }
            }
            if (K(a, "aikajana") is Dictionary<string, object> ajd) d.Aikajana = LueAikajana(a, ajd);
            var tv = O(a, "taustavirta");
            d.Taustavirta = new AjattelijaTaustavirta
            {
                Etaisyys = L(tv, "etaisyys"), Blend = L(tv, "blend"), VoimaKerroin = L(tv, "voimaKerroin"), Kulma = L(tv, "kulma"),
                Siemen = (uint)L(tv, "siemen"), Rivikork = V(tv, "rivikork"), Ajat = V(tv, "ajat"),
                Mms = L(O(tv, "nopeus"), "mms"), Vaihtelu = Lv(O(tv, "nopeus"), "vaihtelu", 0),
                Sumeus = Lv(tv, "sumeus", 0), RiviTila = Lv(tv, "riviTila", 1), RiviKorkeus = Lv(tv, "riviKorkeus", 96), RiviKoko = Lv(tv, "riviKoko", 1),
                RajaKoko = Lv(tv, "rajaKoko", AjattelijaTaustavirta.OletusRajaKoko),
            };
            if (K(tv, "rajaKulma") != null) d.Taustavirta.RajaKulma = V(tv, "rajaKulma");
            foreach (var kv in O(tv, "kirkkaus")) d.Taustavirta.Kirkkaus[kv.Key] = Vek(kv.Value);
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(tv, "projektorit")))
            {
                var o = x as Dictionary<string, object>;
                d.Taustavirta.Projektorit.Add(new AjattelijaProjektori
                {
                    Kohde = V(o, "kohde"), Suunta = V(o, "suunta"), Ala = L(o, "ala"), Riveja = (int)L(o, "riveja"), Pehmeys = Lv(o, "pehmeys", 1),
                });
            }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(tv, "rivit")))
            {
                var l = (List<object>)x;
                d.Taustavirta.Rivit.Add(new AjattelijaRivi { Kieli = l[0] as string, Fontti = l[1] as string, Teksti = l[2] as string });
            }
            var at = O(a, "atlas");
            d.Atlas = new AjattelijaAtlas { Tiedosto = T(at, "tiedosto"), Leveys = (int)L(at, "leveys"), Korkeus = (int)L(at, "korkeus") };
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(at, "paikat")))
            {
                var o = x as Dictionary<string, object>;
                d.Atlas.Paikat.Add(new AtlasRivi { Y = L(o, "y"), Korkeus = L(o, "korkeus"), Lev = L(o, "lev"), UMax = L(o, "uMax"), Sumea = MiniJson.Totuus(o, "sumea") });
            }
            if (K(a, "elama") is Dictionary<string, object> el)
            {
                d.ElamaOtsikko = T(el, "otsikko");
                foreach (var x in MiniJson.TaulukkoTaiTyhja(K(el, "kappaleet")))
                {
                    var o = x as Dictionary<string, object>;
                    d.Elama.Add(new AjattelijaKappale { Otsikko = T(o, "otsikko"), Teksti = T(o, "teksti") });
                }
            }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(a, "pulunKysymykset"))) if (x is string s) d.PulunKysymykset.Add(s);
            var aani = O(a, "aani");
            d.Puhe = T(aani, "puhe"); d.Musiikki = T(aani, "musiikki");
            var kartta = O(a, "kartta");
            d.KarttaMaa = T(kartta, "maa"); d.KarttaGlb = T(kartta, "glb");
            // Kiinteä karttapiste [lat, lng] (omistaja 2.10. 16.5x, web #3866 kartta.piste): pää karttaobjektina.
            d.KarttaPiste = kartta != null && K(kartta, "piste") is List<object> kp && kp.Count == 2 ? Vek(kp) : null;
            return d;
        }

        /// <summary>Aikajana (v13–v14) webin kentistä; valinnaiset osat null tai oletus kuten webin ?? -lausekkeet.</summary>
        static AjattelijaAikajanaData LueAikajana(Dictionary<string, object> a, Dictionary<string, object> o)
        {
            var aj = new AjattelijaAikajanaData { Loppu = L(o, "loppu"), VirtaVoima = Lv(o, "virtaVoima", 1), Kaikusarja = T(o, "kaikusarja") };
            List<double[]> Avaimet(object v) => MiniJson.TaulukkoTaiTyhja(v).Select(x => Vek(x)).ToList();
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(o, "kamera")))
            {
                var l = (List<object>)x;
                aj.Kamera.Add(new AikajanaKameraAvain { R = Nro(l[0]), Paikka = Vek(l[1]), Katse = Vek(l[2]), Mm = Nro(l[3]), Ajo = l.Count > 4 && (l[4] as string) == "BEZIER" });
            }
            var au = O(o, "aurinko");
            aj.AurinkoKohde = V(au, "kohde");
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(au, "avaimet")))
            {
                var l = (List<object>)x;
                aj.Aurinko.Add(new AikajanaAurinkoAvain { R = Nro(l[0]), Paikka = Vek(l[1]), Energia = Nro(l[2]), Vari = l.Count > 3 && l[3] != null ? Vek(l[3]) : null });
            }
            if (K(o, "pyyhkaisy") is Dictionary<string, object> py)
            {
                aj.Pyyhkaisy = true;
                aj.PyyhkaisyPaikka = V(py, "paikka"); aj.PyyhkaisyKeila = L(py, "keila"); aj.PyyhkaisyBlend = L(py, "blend");
                aj.PyyhkaisySuunta = K(py, "suunta") is object ps ? Vek(ps) : null;
                aj.PyyhkaisyVari = K(py, "vari") is object pv ? Vek(pv) : null;
                aj.PyyhkaisyEnergia = Avaimet(K(py, "energia"));
                if (K(py, "kohteet") is List<object> kohteet)
                    aj.PyyhkaisyKohteet = kohteet.Select(x => { var l = (List<object>)x; return (Nro(l[0]), Vek(l[1])); }).ToList();
            }
            int rivit = MiniJson.TaulukkoTaiTyhja(K(O(a, "taustavirta"), "rivit")).Count;
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(o, "tykit")))
            {
                var t = x as Dictionary<string, object>;
                string avain = T(t, "paalause");
                aj.Tykit.Add(new AikajanaTykki
                {
                    PaalauseAvain = avain, Lause = TykinLause(O(O(a, "paalauseet"), avain)), AtlasRivi = 1 + rivit + aj.Tykit.Count,
                    Paikka = V(t, "paikka"), Suunta = V(t, "suunta"), Ala = L(t, "ala"), Blend = Lv(t, "blend", 0.45),
                    Energia = Avaimet(K(t, "energia")), Korkeus = Lv(t, "korkeus", double.NaN), Kiintea = MiniJson.Totuus(t, "kiintea"),
                    Vierii = K(t, "vierii") is object vi ? Vek(vi) : null, Leveys = Lv(t, "leveys", double.NaN),
                });
            }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(o, "kaiut")))
            {
                var k = x as Dictionary<string, object>;
                aj.Kaiut.Add(new AikajanaKaiku
                {
                    Kuva = T(k, "kuva"), Paikka = V(k, "paikka"), Suunta = V(k, "suunta"), Ala = Lv(k, "ala", 0.1), Lev = Lv(k, "lev", double.NaN),
                    Kork = Lv(k, "kork", double.NaN), Blend = Lv(k, "blend", 0.3), Liuku = Lv(k, "liuku", 0),
                    Ruudut = K(k, "ruudut") is object ru ? Vek(ru) : null, Energia = Avaimet(K(k, "energia")),
                });
            }
            aj.Virta = Avaimet(K(o, "virta"));
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(o, "vaisto")))
            {
                var v = x as Dictionary<string, object>;
                aj.Vaisto.Add(new AikajanaVaisto { Kohde = V(v, "kohde"), Sade = L(v, "sade"), Ruudut = V(v, "ruudut") });
            }
            if (K(o, "savu") is Dictionary<string, object> sa && T(sa, "kuva") is string sk && sk.Length > 0)
            {
                aj.SavuKuva = sk; aj.SavuAla = L(sa, "ala"); aj.SavuKesto = L(sa, "kesto"); aj.SavuFps = L(sa, "fps"); aj.SavuRuutuja = L(sa, "ruutuja");
                aj.SavuYdin = Lv(sa, "ydin", 0.28); aj.SavuVahvuus = Lv(sa, "vahvuus", 0);
                aj.SavuPehmeys = Lv(sa, "pehmeys", AjattelijaAikajanaData.OletusSavuPehmeys); aj.SavuHarso = Lv(sa, "harso", AjattelijaAikajanaData.OletusSavuHarso);
            }
            aj.TykkiVari = K(o, "tykkiVari") is object tv ? Vek(tv) : null;
            aj.KaikuVari = K(o, "kaikuVari") is object kv ? Vek(kv) : null;
            if (K(o, "rako") is Dictionary<string, object> rk)
            {
                aj.RakoVari = K(rk, "vari") is object rv ? Vek(rv) : null;
                if (K(rk, "avaimet") is List<object> ra)
                    aj.Rako = ra.Select(x =>
                    {
                        var l = (List<object>)x; var koko = Vek(l[4]);
                        return new RakoAvain { R = Nro(l[0]), Paikka = Vek(l[1]), Suunta = Vek(l[2]), Energia = Nro(l[3]), Koko = koko[0], KokoY = koko[1], Spread = Nro(l[5]) };
                    }).ToList();
                else
                {
                    // Vanha muoto (web: [[1, paikka, suunta, 0, koko, 1,2]] ja energia avainArvona).
                    var koko = K(rk, "koko") is object ko ? Vek(ko) : new[] { 0.34, 0.014 };
                    aj.Rako = new List<RakoAvain> { new RakoAvain { R = 1, Paikka = V(rk, "paikka"), Suunta = V(rk, "suunta"), Koko = koko[0], KokoY = koko[1], Spread = 1.2 } };
                    aj.RakoEnergia = Avaimet(K(rk, "energia"));
                }
            }
            aj.Ymparisto = K(o, "ymparisto") is object ym ? Avaimet(ym) : null;
            if (K(o, "varjolevy") is Dictionary<string, object> vl)
            {
                aj.VarjolevyKeski = V(vl, "keski"); aj.VarjolevyKoko = V(vl, "koko"); aj.VarjolevyRuudut = V(vl, "ruudut");
            }
            if (K(o, "lauseKortti") is Dictionary<string, object> lk)
            {
                aj.Kortti = true;
                aj.KorttiMerkkeja = L(lk, "merkkeja"); aj.KorttiLeveys = L(lk, "leveys"); aj.KorttiSiirto = Lv(lk, "siirto", 0);
            }
            if (K(o, "virtaPorrastus") is Dictionary<string, object> vp)
            {
                aj.Porrastus = true;
                aj.PorrasAlku = L(vp, "alku"); aj.PorrasVali = L(vp, "vali"); aj.PorrasHaivytys = L(vp, "haivytys");
                aj.PorrasRintama = L(vp, "rintama"); aj.PorrasReuna = Lv(vp, "reuna", 1);
            }
            var aani = O(o, "aani");
            aj.Puhe = T(aani, "puhe"); aj.Musiikki = T(aani, "musiikki"); aj.Syke = T(o, "syke");
            if (O(o, "kaikusarjat") is Dictionary<string, object> ks)
                foreach (var kv2 in ks)
                    aj.Kaikusarjat[kv2.Key] = MiniJson.TaulukkoTaiTyhja(kv2.Value).Select(x => x is string kuva ? new KaikusarjanKuva { Kuva = kuva }
                        : new KaikusarjanKuva { Kuva = T(x as Dictionary<string, object>, "kuva"), Harmaa = T(x as Dictionary<string, object>, "harmaa"),
                            Seepia = T(x as Dictionary<string, object>, "seepia") }).ToList();
            return aj;
        }

        /// <summary>Lainauksen päälause: vain teksti ja korkeus pakollisia (kysymys- ja 30e-lauseilla ei ole kohtaa bystillä).</summary>
        static AjattelijaPaalause TykinLause(Dictionary<string, object> l) => new AjattelijaPaalause
        {
            Fi = T(l, "fi"), El = T(l, "el") ?? "", Viite = T(l, "viite") ?? "", Korkeus = L(l, "korkeus"),
            Sade = K(l, "sade") is object s ? Vek(s) : null, Sivulta = K(l, "sivulta") is object sv ? Vek(sv) : null,
            Vino = K(l, "vino") is object vi ? Vek(vi) : null, Ala = Lv(l, "ala", double.NaN), Etaisyys = Lv(l, "etaisyys", double.NaN),
        };

        /// <summary>
        /// Muuntimen harmaasävy-PNG (8 bit, suodatin 0, tyokalut/ajattelijat-natiiviin.mjs) raa'aksi R8-dataksi Unityn
        /// rivijärjestyksessä (rivi 0 alimpana, kuten LoadImage). Säieturvallinen; null = muu muoto (varatie LoadImage).
        /// </summary>
        public static (int lev, int kork, byte[] data)? PuraHarmaaPng(byte[] png)
        {
            try
            {
                if (png == null || png.Length < 33 || png[1] != 0x50 || png[2] != 0x4E || png[3] != 0x47) return null;
                int B32(int i) => png[i] << 24 | png[i + 1] << 16 | png[i + 2] << 8 | png[i + 3];
                int lev = 0, kork = 0;
                var idat = new System.IO.MemoryStream();
                for (int k = 8; k + 12 <= png.Length;)
                {
                    int n = B32(k);
                    string tyyppi = System.Text.Encoding.ASCII.GetString(png, k + 4, 4);
                    if (tyyppi == "IHDR")
                    {
                        lev = B32(k + 8); kork = B32(k + 12);
                        if (png[k + 16] != 8 || png[k + 17] != 0 || png[k + 20] != 0) return null;   // 8 bit harmaa, ei lomitusta
                    }
                    else if (tyyppi == "IDAT") idat.Write(png, k + 8, n);
                    k += 12 + n;
                }
                if (lev <= 0 || kork <= 0) return null;
                var raaka = new byte[(lev + 1) * kork];
                idat.Position = 2;   // zlib-otsake
                using (var d = new System.IO.Compression.DeflateStream(idat, System.IO.Compression.CompressionMode.Decompress))
                {
                    int luettu = 0;
                    while (luettu < raaka.Length) { int x = d.Read(raaka, luettu, raaka.Length - luettu); if (x <= 0) return null; luettu += x; }
                }
                var data = new byte[lev * kork];
                for (int y = 0; y < kork; y++)
                {
                    if (raaka[y * (lev + 1)] != 0) return null;   // muu suodatin kuin 0
                    Buffer.BlockCopy(raaka, y * (lev + 1) + 1, data, (kork - 1 - y) * lev, lev);
                }
                return (lev, kork, data);
            }
            catch (Exception) { return null; }
        }

        /// <summary>JSON-tekstistä: (data, null) tai (null, syy).</summary>
        public static (AjattelijaData data, string virhe) Jasenna(string json)
        {
            Dictionary<string, object> o;
            try { o = MiniJson.Objekti(MiniJson.Jasenna(json)); }
            catch (Exception e) { return (null, "JSON: " + e.Message); }
            var puuttuu = Tarkista(o);
            if (puuttuu.Count > 0) return (null, "puuttuvat kentät: " + string.Join(", ", puuttuu));
            try { return (Lue(o), null); }
            catch (Exception e) { return (null, "luku: " + e.Message); }
        }

        static object K(Dictionary<string, object> o, string k) => o != null && o.TryGetValue(k, out var v) ? v : null;
        static Dictionary<string, object> O(Dictionary<string, object> o, string k) => K(o, k) as Dictionary<string, object>;
        static bool Tosi(object v) => v != null && !(v is string s && s.Length == 0) && !(v is bool b && !b);
        static int Pituus(object v) => v is List<object> l ? l.Count : 0;
        static string T(Dictionary<string, object> o, string k) => K(o, k) as string;
        static double Nro(object v) => Convert.ToDouble(v, CultureInfo.InvariantCulture);
        static double L(Dictionary<string, object> o, string k) => Nro(K(o, k) ?? throw new FormatException(k + " puuttuu"));
        static double Lv(Dictionary<string, object> o, string k, double oletus) => K(o, k) is object v ? Nro(v) : oletus;
        static double[] Vek(object v) => ((List<object>)v).Select(Nro).ToArray();
        static double[] V(Dictionary<string, object> o, string k) => Vek(K(o, k) ?? throw new FormatException(k + " puuttuu"));
        /// <summary>Luku tai 0 (webin ?? 0 ja totuusarvo: puuttuva tai muu kuin luku ei kelpaa).</summary>
        static double Nro0(object v) => v is double d ? d : 0;
        static double Ruutu(object avain) => avain is List<object> l && l.Count > 0 ? Nro0(l[0]) : double.NaN;
        static AjattelijaPaalause Lause(Dictionary<string, object> l) => new AjattelijaPaalause
        {
            Fi = T(l, "fi"), El = T(l, "el"), Viite = T(l, "viite"),
            Sade = K(l, "sade") is object s ? Vek(s) : null, Sivulta = K(l, "sivulta") is object sv ? Vek(sv) : null, Vino = V(l, "vino"),
            Ala = L(l, "ala"), Etaisyys = L(l, "etaisyys"), Korkeus = L(l, "korkeus"),
            KameraKulma = Lv(l, "kameraKulma", 38), KameraMatka = Lv(l, "kameraMatka", 0.09),
        };
        static AjattelijaOtos Otos(Dictionary<string, object> o) => new AjattelijaOtos { Paikka = V(o, "paikka"), Katse = V(o, "katse"), Mm = L(o, "mm") };
    }
}
