// VIRTALOHKON LUKIJA: jäsennetty JSON → tyypitetyt luokat (Aineisto.cs).
//
// Syöte on valmiiksi jäsennetty olio samassa muodossa kuin
// Matkakirja.Peli.MiniJson tuottaa: objekti → Dictionary<string, object>,
// taulukko → List<object>, numero → double (myös long/int/float käyvät),
// true/false → bool, null → null. Ydin ei viittaa Peli-kokoonpanoon, joten
// jäsennys tehdään kutsujan päässä:
//
//   var lohko = MiniJson.Objekti(MiniJson.Jasenna(teksti));   // Peli
//   var aineisto = AineistonLukija.Lue(lohko);                 // Ydin
//
// Sisältöpaketissa (media.matkakirja.app/sisalto/1/v2/) lohko on moduulin
// js/linssit/ihmisen-matka.js exportissa LINSSI polussa aikajana.virrat;
// LueLinssista hakee sen koko LINSSI-oliosta.
//
// Puuttuva kenttä saa JS-laskennan oletuksen (`??`). Ero `luisu: null`
// (terävä portti) ja puuttuvan luisun (oletuskaista) välillä säilyy.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Virrat
{
    public static class AineistonLukija
    {
        /// <summary>LINSSI-olio (tai sisältöpaketin exportti) → sen aikajana.virrat-lohko.</summary>
        public static VirtaAineisto LueLinssista(object linssi)
        {
            var o = Olio(linssi, "LINSSI");
            if (o.TryGetValue("arvo", out var arvo) && arvo is Dictionary<string, object> kaare) o = kaare;
            var aikajana = Olio(Kentta(o, "aikajana"), "aikajana");
            return Lue(Kentta(aikajana, "virrat"));
        }

        /// <summary>Virtalohko { virrat, retki, vanha, peitto, maamaski, vanat, pysakit, piirtokerroin? }.</summary>
        public static VirtaAineisto Lue(object lohko)
        {
            var o = Olio(lohko, "virrat-lohko");
            var a = new VirtaAineisto
            {
                Virrat = Lista(Kentta(o, "virrat"), LueVirta),
                Retki = Kentta(o, "retki") != null ? LueVirta(Kentta(o, "retki")) : null,
                Vanha = Kentta(o, "vanha") != null ? LueVanha(Kentta(o, "vanha")) : null,
                Maamaski = Kentta(o, "maamaski") != null ? LueMaamaski(Kentta(o, "maamaski")) : null,
                Vanat = Kentta(o, "vanat") != null ? LueVanat(Kentta(o, "vanat")) : null,
                Pysakit = Lista(Kentta(o, "pysakit"), LuePysakki),
                Piirtokerroin = Luku(Kentta(o, "piirtokerroin")),
            };
            if (Kentta(o, "peitto") is Dictionary<string, object> p)
            {
                a.Peitto = new PeittoAsetus
                {
                    Vanha = Luku(Kentta(p, "vanha")) ?? 0.75,
                    Rintama = Luku(Kentta(p, "rintama")) ?? 0.95,
                    Meri = Luku(Kentta(p, "meri")) ?? 0.42,
                };
            }
            return a;
        }

        public static Virta LueVirta(object arvo)
        {
            var o = Olio(arvo, "virta");
            var v = new Virta
            {
                Tunnus = Teksti(o, "tunnus"),
                Nimi = Teksti(o, "nimi"),
                Yhteenveto = Teksti(o, "yhteenveto"),
                Vari = Kentta(o, "vari") != null ? LueVari(Kentta(o, "vari")) : null,
                Nopeus = LueNopeus(Kentta(o, "nopeus")),
                Alue = LaatikotTai(Kentta(o, "alue")),
                Pois = LaatikotTai(Kentta(o, "pois")),
                Lahteet = Lista(Kentta(o, "lahteet"), LueLahde),
                LahteetToisesta = Lista(Kentta(o, "lahteetToisesta"), LueLahdeToisesta),
                Portit = Lista(Kentta(o, "portit"), LuePortti),
                Ylitykset = Lista(Kentta(o, "ylitykset"), LueYlitys),
                Nauhat = Lista(Kentta(o, "nauhat"), LueNauha),
                Peitto = Luku(Kentta(o, "peitto")),
                Sammuu = Luvut(Kentta(o, "sammuu")),
            };
            if (Luku(Kentta(o, "sisamaa")) is double s) v.Sisamaa = s;
            if (Luku(Kentta(o, "reuna")) is double r) v.Reuna = r;
            return v;
        }

        public static Laatikko LueLaatikko(object arvo)
        {
            var o = Olio(arvo, "laatikko");
            return new Laatikko { Lat = Luvut(Kentta(o, "lat")), Lon = Luvut(Kentta(o, "lon")) };
        }

        static Laatikko[] LaatikotTai(object arvo) => arvo == null ? null : Lista(arvo, LueLaatikko);

        static Nopeus LueNopeus(object arvo)
        {
            if (arvo == null) return null;
            if (arvo is List<object> taulu)
            {
                var rivit = new double[taulu.Count][];
                for (var k = 0; k < taulu.Count; k += 1) rivit[k] = Luvut(taulu[k]);
                return new Nopeus { Taulu = rivit };
            }
            return Nopeus.VakioNopeus(Luku(arvo) ?? throw new FormatException("nopeus: odotettiin lukua tai taulua"));
        }

        static Lahde LueLahde(object arvo)
        {
            var o = Olio(arvo, "lähde");
            return new Lahde
            {
                Nimi = Teksti(o, "nimi"),
                Lat = Luku(Kentta(o, "lat")) ?? double.NaN,
                Lon = Luku(Kentta(o, "lon")) ?? double.NaN,
                Aika = Luku(Kentta(o, "aika")) ?? double.NaN,
            };
        }

        static LahdeToisesta LueLahdeToisesta(object arvo)
        {
            var o = Olio(arvo, "lahteetToisesta");
            return new LahdeToisesta
            {
                Nimi = Teksti(o, "nimi"),
                Virta = Teksti(o, "virta"),
                Lue = LuePiste(Kentta(o, "lue")),
                Lat = Luku(Kentta(o, "lat")) ?? double.NaN,
                Lon = Luku(Kentta(o, "lon")) ?? double.NaN,
                Ikkuna = Luvut(Kentta(o, "ikkuna")),
                Kesto = Luku(Kentta(o, "kesto")) ?? 0,
            };
        }

        static Portti LuePortti(object arvo)
        {
            var o = Olio(arvo, "portti");
            var p = new Portti
            {
                Nimi = Teksti(o, "nimi"),
                Alue = LaatikotTai(Kentta(o, "alue")) ?? new Laatikko[0],
                Avautuu = Luku(Kentta(o, "avautuu")) ?? double.NaN,
                Hajonta = Luku(Kentta(o, "hajonta")) ?? 0,
                Reuna = Luku(Kentta(o, "reuna")),
            };
            if (o.TryGetValue("luisu", out var luisu))
            {
                if (luisu == null) p.LuisuPois = true;
                else
                {
                    var l = Olio(luisu, "luisu");
                    p.Luisu = new LuisuAsetus { Leveys = Luku(Kentta(l, "leveys")), Vuodet = Luku(Kentta(l, "vuodet")) };
                }
            }
            return p;
        }

        static Ylitys LueYlitys(object arvo)
        {
            var o = Olio(arvo, "ylitys");
            return new Ylitys
            {
                Nimi = Teksti(o, "nimi"),
                A = LuePiste(Kentta(o, "a")),
                B = LuePiste(Kentta(o, "b")),
                Ikkuna = Luvut(Kentta(o, "ikkuna")),
                Kesto = Luku(Kentta(o, "kesto")) ?? 0,
            };
        }

        static Nauha LueNauha(object arvo)
        {
            var o = Olio(arvo, "nauha");
            var n = new Nauha { Nimi = Teksti(o, "nimi"), MeriSade = Luku(Kentta(o, "meriSade")) };
            if (Luku(Kentta(o, "sade")) is double s) n.Sade = s;
            if (Kentta(o, "pisteet") is List<object> pisteet)
            {
                n.Pisteet = new double[pisteet.Count][];
                for (var k = 0; k < pisteet.Count; k += 1) n.Pisteet[k] = Luvut(pisteet[k]);
            }
            return n;
        }

        static VirranVari LueVari(object arvo)
        {
            var o = Olio(arvo, "vari");
            return new VirranVari
            {
                Vanha = Teksti(o, "vanha"),
                Rintama = Teksti(o, "rintama"),
                Liuku = Kentta(o, "liuku") == null ? null : Lista(Kentta(o, "liuku"), (a) =>
                {
                    var s = Olio(a, "liuku");
                    return new VariAskel { Aika = Luku(Kentta(s, "aika")) ?? 0, Vanha = Teksti(s, "vanha"), Rintama = Teksti(s, "rintama") };
                }),
            };
        }

        static VanhaVaesto LueVanha(object arvo)
        {
            var o = Olio(arvo, "vanha");
            var v = new VanhaVaesto
            {
                Tunnus = Teksti(o, "tunnus"),
                Nimi = Teksti(o, "nimi"),
                Alue = LaatikotTai(Kentta(o, "alue")) ?? new Laatikko[0],
                Nakyy = Luvut(Kentta(o, "nakyy")),
                Haipyy = Luvut(Kentta(o, "haipyy")),
            };
            if (Kentta(o, "vari") is Dictionary<string, object> vari)
            {
                var rgb = Luvut(Kentta(vari, "rgb"));
                if (rgb != null) v.Rgb = Array.ConvertAll(rgb, (x) => (int)x);
                v.VariPeitto = Luku(Kentta(vari, "peitto")) ?? 0;
            }
            if (Luku(Kentta(o, "reuna")) is double r) v.Reuna = r;
            if (Luku(Kentta(o, "pehmeys")) is double p) v.Pehmeys = p;
            return v;
        }

        static Maamaski LueMaamaski(object arvo)
        {
            var o = Olio(arvo, "maamaski");
            var m = new Maamaski { Juoksut = Teksti(o, "juoksut"), Peitot = Teksti(o, "peitot") };
            if (Luku(Kentta(o, "leveys")) is double l) m.Leveys = (int)l;
            if (Luku(Kentta(o, "korkeus")) is double k) m.Korkeus = (int)k;
            return m;
        }

        static VananPaate LuePaate(object arvo, string tunnus)
        {
            var o = Olio(arvo, "vanan pääte");
            return new VananPaate
            {
                Tunnus = Teksti(o, "tunnus") ?? tunnus,
                Virta = Teksti(o, "virta"),
                Paate = LuePiste(Kentta(o, "paate")),
                Paksuus = Luku(Kentta(o, "paksuus")) ?? 0,
            };
        }

        static VanatAineisto LueVanat(object arvo)
        {
            var o = Olio(arvo, "vanat");
            var v = new VanatAineisto
            {
                Selkaranka = Kentta(o, "selkaranka") != null ? LuePaate(Kentta(o, "selkaranka"), "selkaranka") : null,
                Haarat = Lista(Kentta(o, "haarat"), (a) => LuePaate(a, null)),
                Nauhat = Kentta(o, "nauhat") as string,
                Kotipesat = Lista(Kentta(o, "kotipesat"), (a) =>
                {
                    var k = Olio(a, "kotipesä");
                    return new KotipesaAsetus { Tunnus = Teksti(k, "tunnus"), Sade = Luku(Kentta(k, "sade")) ?? 350 };
                }),
            };
            if (Luku(Kentta(o, "nauhanPaksuus")) is double np) v.NauhanPaksuus = np;
            if (Kentta(o, "yksinkertaistus") is Dictionary<string, object> y)
            {
                v.Yksinkertaistus = new Yksinkertaistus
                {
                    DpKm = Luku(Kentta(y, "dpKm")) ?? 60,
                    AikaV = Luku(Kentta(y, "aikaV")) ?? 1500,
                    AikaOsuus = Luku(Kentta(y, "aikaOsuus")) ?? 0.06,
                    Chaikin = (int)(Luku(Kentta(y, "chaikin")) ?? 2),
                    HaaranEroKm = Luku(Kentta(y, "haaranEroKm")) ?? 100,
                };
            }
            if (Kentta(o, "kaista") is Dictionary<string, object> k2)
            {
                v.Kaista = new Kaista
                {
                    LeveysKm = Luku(Kentta(k2, "leveysKm")) ?? 200,
                    MeriKerroin = Luku(Kentta(k2, "meriKerroin")) ?? 0.3,
                    Peitto = Luku(Kentta(k2, "peitto")) ?? 0.5,
                    Alueet = Lista(Kentta(k2, "alueet"), (a) =>
                    {
                        var s = Olio(a, "kaistan alue");
                        return new KaistanAlue
                        {
                            Nimi = Teksti(s, "nimi"),
                            Lat = Luvut(Kentta(s, "lat")),
                            Lon = Luvut(Kentta(s, "lon")),
                            Kerroin = Luku(Kentta(s, "kerroin")) ?? 1,
                            Pehmeys = Luku(Kentta(s, "pehmeys")),
                        };
                    }),
                };
            }
            return v;
        }

        static Pysakki LuePysakki(object arvo)
        {
            var o = Olio(arvo, "pysäkki");
            return new Pysakki
            {
                Tunnus = Teksti(o, "tunnus"),
                Lat = Luku(Kentta(o, "lat")) ?? double.NaN,
                Lon = Luku(Kentta(o, "lon")) ?? double.NaN,
                VuosiaSitten = Luku(Kentta(o, "vuosiaSitten")) ?? double.NaN,
            };
        }

        /* ------------------------------------------------------------ apurit */

        static LatLon LuePiste(object arvo)
        {
            var o = Olio(arvo, "piste");
            return new LatLon(Luku(Kentta(o, "lat")) ?? double.NaN, Luku(Kentta(o, "lon")) ?? double.NaN);
        }

        static Dictionary<string, object> Olio(object arvo, string mika) =>
            arvo as Dictionary<string, object> ?? throw new FormatException(mika + ": odotettiin objektia");

        static object Kentta(Dictionary<string, object> o, string nimi) => o.TryGetValue(nimi, out var a) ? a : null;

        static string Teksti(Dictionary<string, object> o, string nimi) => Kentta(o, nimi) as string;

        /// <summary>Luku mistä tahansa numerotyypistä; null, jos puuttuu tai ei ole luku.</summary>
        public static double? Luku(object arvo)
        {
            switch (arvo)
            {
                case double d: return d;
                case float f: return f;
                case long l: return l;
                case int i: return i;
                case decimal m: return (double)m;
                case string s when double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var p): return p;
                default: return null;
            }
        }

        static double[] Luvut(object arvo)
        {
            if (!(arvo is List<object> lista)) return null;
            var ulos = new double[lista.Count];
            for (var k = 0; k < lista.Count; k += 1) ulos[k] = Luku(lista[k]) ?? double.NaN;
            return ulos;
        }

        static T[] Lista<T>(object arvo, Func<object, T> muunna)
        {
            if (arvo == null) return new T[0];
            if (!(arvo is List<object> lista)) throw new FormatException("odotettiin taulukkoa");
            var ulos = new T[lista.Count];
            for (var k = 0; k < lista.Count; k += 1) ulos[k] = muunna(lista[k]);
            return ulos;
        }
    }
}
