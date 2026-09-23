// MiniJson: perustyypit, escapet ja virheet.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    public static class MiniJsonTestit
    {
        [Testi] static void PerustyypitJaSisakkaisyys()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(" {\"a\": [1, -2.5, 3e2, 0.125E-1], \"b\": {\"c\": true, \"d\": false, \"e\": null}, \"f\": \"x\", \"g\": [], \"h\": {}} "));
            var a = MiniJson.Taulukko(o["a"]);
            Oleta.Sama(1.0, (double)a[0]);
            Oleta.Sama(-2.5, (double)a[1]);
            Oleta.Sama(300.0, (double)a[2]);
            Oleta.Sama(0.0125, (double)a[3]);
            var b = MiniJson.Objekti(o["b"]);
            Oleta.Sama(true, (bool)b["c"]);
            Oleta.Sama(false, (bool)b["d"]);
            Oleta.Tosi(b.ContainsKey("e") && b["e"] == null, "null säilyy avaimena");
            Oleta.Sama("x", (string)o["f"]);
            Oleta.Sama(0, MiniJson.Taulukko(o["g"]).Count);
            Oleta.Sama(0, MiniJson.Objekti(o["h"]).Count);
            Oleta.Tosi(MiniJson.Jasenna("null") == null, "pelkkä null");
            Oleta.Sama(-0.0, (double)MiniJson.Jasenna("-0"));
        }

        [Testi] static void Escapet()
        {
            Oleta.Sama("a\"b\\c/d\b\f\n\r\te", (string)MiniJson.Jasenna("\"a\\\"b\\\\c\\/d\\b\\f\\n\\r\\te\""));
            Oleta.Sama("Åbo ä", (string)MiniJson.Jasenna("\"\\u00c5bo \\u00E4\""));
            Oleta.Sama("😀", (string)MiniJson.Jasenna("\"\\ud83d\\ude00\""));
            Oleta.Sama("ääkköset suoraan", (string)MiniJson.Jasenna("\"ääkköset suoraan\""));
        }

        [Testi] static void TarkatLuvutKuinJs()
        {
            // JS:n lyhin esitys luetaan takaisin bittitäsmällisesti.
            Oleta.Tosi(0.6270739405881613 == (double)MiniJson.Jasenna("0.6270739405881613"), "mulberry32(1)");
            Oleta.Tosi(51.5051 == (double)MiniJson.Jasenna("51.5051"), "lat");
            Oleta.Tosi(4294967295.0 == (double)MiniJson.Jasenna("4294967295"), "2^32-1");
        }

        [Testi] static void VirheetHeittavat()
        {
            foreach (var huono in new[] { "", "{", "[1,]", "{\"a\" 1}", "\"abc", "tru", "01", "1.", "-", "\"\\x\"", "\"\\u12\"", "[1] 2", "{'a':1}", "\"a\nb\"" })
            {
                bool heitti = false;
                try { MiniJson.Jasenna(huono); } catch (FormatException) { heitti = true; }
                Oleta.Tosi(heitti, "pitäisi heittää: " + huono);
            }
        }
    
        [Testi] static void NullTurvallisetLuvut()
        {
            // Objekti(null) heittää yhä (tallennus ja reitit nojaavat siihen).
            bool heitti = false;
            try { MiniJson.Objekti(null); } catch (FormatException) { heitti = true; }
            Oleta.Tosi(heitti, "Objekti(null) heittää");
            Oleta.Tosi(MiniJson.ObjektiTaiNull(null) == null, "ObjektiTaiNull(null)");
            Oleta.Tosi(MiniJson.ObjektiTaiNull(1.0) == null, "ObjektiTaiNull(luku)");
            Oleta.Sama(0, MiniJson.TaulukkoTaiTyhja(null).Count);
            Oleta.Sama(0, System.Linq.Enumerable.Count(MiniJson.Alkiot("{\"nimi\":\"x\"}")));
            Oleta.Sama(0, System.Linq.Enumerable.Count(MiniJson.Alkiot("{\"alkiot\":null}")));
            Oleta.Sama(0, System.Linq.Enumerable.Count(MiniJson.Alkiot("null")));
            var a = System.Linq.Enumerable.ToList(MiniJson.Alkiot("{\"alkiot\":[null,{\"id\":\"a\"},3,{\"id\":\"b\"}]}"));
            Oleta.Sama(2, a.Count);
            Oleta.Sama("b", MiniJson.Teksti(a[1], "id"));
            // Kokoelmalukijat: puuttuva alkiot-kenttä tai null-alkio ei kaada.
            var k = Matkakirja.Natiivi.Kuvakokoelmat.Lue("{\"nimi\":\"kuvakysymykset\"}", "{\"alkiot\":[null]}");
            Oleta.Sama(0, k.Kuvat.Count);
            Oleta.Sama(0, k.Liput.Count);
        }
}
}
