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
        public double[] Sade, Vino;
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

    public sealed class AjattelijaProjektori
    {
        public double[] Kohde, Suunta; public double Ala; public int Riveja;
    }

    public sealed class AjattelijaRivi
    {
        public string Kieli, Fontti, Teksti;
    }

    public sealed class AjattelijaTaustavirta
    {
        public double Etaisyys, Blend, VoimaKerroin, Kulma;
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
        public AjattelijaKaiku Kaiku;
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
            Vaadi(Pituus(K(tv, "rivit")) > 0 && Pituus(K(tv, "projektorit")) > 0, "taustavirta");
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
            // Natiivi: tekstiatlas (tyokalut/ajattelijat-natiiviin.mjs); ilman sitä videotykillä ei ole kuvaa.
            var atlas = O(a, "atlas");
            Vaadi(Tosi(K(atlas, "tiedosto")) && Pituus(K(atlas, "paikat")) == 1 + Pituus(K(tv, "rivit")), "atlas");
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
            var lause = O(O(a, "paalauseet"), T(O(a, "kierros"), "paalause"));
            d.Paalause = new AjattelijaPaalause
            {
                Fi = T(lause, "fi"), El = T(lause, "el"), Viite = T(lause, "viite"), Sade = V(lause, "sade"), Vino = V(lause, "vino"),
                Ala = L(lause, "ala"), Etaisyys = L(lause, "etaisyys"), Korkeus = L(lause, "korkeus"),
                KameraKulma = Lv(lause, "kameraKulma", 38), KameraMatka = Lv(lause, "kameraMatka", 0.09),
            };
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
            var tv = O(a, "taustavirta");
            d.Taustavirta = new AjattelijaTaustavirta
            {
                Etaisyys = L(tv, "etaisyys"), Blend = L(tv, "blend"), VoimaKerroin = L(tv, "voimaKerroin"), Kulma = L(tv, "kulma"),
                Siemen = (uint)L(tv, "siemen"), Rivikork = V(tv, "rivikork"), Ajat = V(tv, "ajat"),
            };
            foreach (var kv in O(tv, "kirkkaus")) d.Taustavirta.Kirkkaus[kv.Key] = Vek(kv.Value);
            foreach (var x in MiniJson.TaulukkoTaiTyhja(K(tv, "projektorit")))
            {
                var o = x as Dictionary<string, object>;
                d.Taustavirta.Projektorit.Add(new AjattelijaProjektori { Kohde = V(o, "kohde"), Suunta = V(o, "suunta"), Ala = L(o, "ala"), Riveja = (int)L(o, "riveja") });
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
        static AjattelijaOtos Otos(Dictionary<string, object> o) => new AjattelijaOtos { Paikka = V(o, "paikka"), Katse = V(o, "katse"), Mm = L(o, "mm") };
    }
}
