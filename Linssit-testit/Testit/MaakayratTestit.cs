// Vertailun maakäyrät verkkopelin kultaisia arvoja vasten (kultaiset/maakayrat.json,
// tee-maakayrat.mjs: webin piirraVertailu vale-DOMissa; paketti/maakayrat-ote.json).
// Jokainen SVG-osa verrataan merkkijonona samassa muodossa kuin web kirjoittaa attribuutit.
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Maat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class MaakayratTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("maakayrat.json"))).RootElement;
        static MaakayratAineisto aineisto;
        static MaakayratAineisto A() => aineisto ??= MaakayratAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(Polku("paketti/maakayrat-ote.json"))));

        static string Web(JsonElement o) => o.GetProperty("tyyppi").GetString() switch
        {
            "line" => $"line {S(o, "class")} {S(o, "x1")} {S(o, "y1")} {S(o, "x2")} {S(o, "y2")}",
            "text" => $"text {S(o, "class")} {S(o, "x")} {S(o, "y")} {S(o, "text-anchor")} {S(o, "teksti")}",
            "polyline" => $"polyline {S(o, "class")} {S(o, "points")}",
            "circle" => $"circle {S(o, "class")} {S(o, "cx")} {S(o, "cy")} {S(o, "r")}",
            var t => "? " + t,
        };
        static string S(JsonElement o, string k) => o.TryGetProperty(k, out var v) ? v.GetString() : "-";

        static string Natiivi(KayraOsa o) => o.Tyyppi switch
        {
            "line" => $"line {o.Luokka} {Js.Luku(o.X1)} {Js.Luku(o.Y1)} {Js.Luku(o.X2)} {Js.Luku(o.Y2)}",
            "text" => $"text {o.Luokka} {Js.Luku(o.X)} {Js.Luku(o.Y)} {o.Ankkuri} {o.Teksti}",
            "polyline" => $"polyline {o.Luokka} {string.Join(" ", o.Pisteet.Select(p => Js.Fixed(p.X, 1) + "," + Js.Fixed(p.Y, 1)))}",
            "circle" => $"circle {o.Luokka} {Js.Fixed(o.X, 1)} {Js.Fixed(o.Y, 1)} {Js.Luku(o.R)}",
            var t => "? " + t,
        };

        [Testi] static void VaritJaVakiluvunSanat()
        {
            var k = K();
            Oleta.Sama(string.Join(",", k.GetProperty("varit").EnumerateArray().Select(e => e.GetString())), string.Join(",", Maakayrat.Varit));
            foreach (var r in k.GetProperty("vaki").EnumerateArray())
                Oleta.Sama(r[1].GetString(), Maakayrat.MuotoileVaki(r[0].GetDouble()), "vaki " + r[0]);
        }

        [Testi] static void ToFixedKutenV8()
        {
            // Tarkat puolikkaat nollasta poispäin, muut tarkasta binaariarvosta (1.005 → 1.00).
            Oleta.Sama("0.3", Js.Fixed(0.25, 1));
            Oleta.Sama("7.3", Js.Fixed(7.25, 1));
            Oleta.Sama("1.00", Js.Fixed(1.005, 2));
            Oleta.Sama("0.3", Js.Fixed(0.35, 1));
            Oleta.Sama("100.0", Js.Fixed(99.95, 1));
            Oleta.Sama("-0.1", Js.Fixed(-0.05, 1));
            Oleta.Sama("0.0", Js.Fixed(0.04, 1));
        }

        [Testi] static void VertailutKutenWebissa()
        {
            int osia = 0;
            foreach (var v in K().GetProperty("vertailut").EnumerateArray())
            {
                var isot = v.GetProperty("isot").EnumerateArray().Select(e => e.GetString()).ToList();
                var kuva = Maakayrat.Vertailu(isot, A());
                string nimi = string.Join("+", isot);
                Oleta.Sama(v.GetProperty("tyhja").ValueKind == JsonValueKind.Null ? null : v.GetProperty("tyhja").GetString(), kuva.Tyhja, nimi);
                Oleta.Sama(v.GetProperty("lahde").ValueKind == JsonValueKind.Null ? null : v.GetProperty("lahde").GetString(), kuva.Lahderivi, nimi);
                var kortit = v.GetProperty("kortit").EnumerateArray().Select(e => e.GetString()).ToList();
                Oleta.Sama(string.Join("|", kortit), string.Join("|", kuva.Maat.Select(m => $"vertailu-kortti {m.Luokka}-kortti")), nimi + " värit");
                var lohkot = v.GetProperty("lohkot").EnumerateArray().ToList();
                Oleta.Sama(lohkot.Count, kuva.Lohkot.Count, nimi + " lohkoja");
                for (int i = 0; i < lohkot.Count; i++)
                {
                    var w = lohkot[i];
                    var n = kuva.Lohkot[i];
                    Oleta.Sama(w.GetProperty("otsikko").GetString(), n.Otsikko);
                    Oleta.Sama(w.GetProperty("seloste").GetString(), n.Seloste);
                    Oleta.Sama($"0 0 {Js.Luku(n.Leveys)} {Js.Luku(n.Korkeus)}", w.GetProperty("viewBox").GetString());
                    var wo = w.GetProperty("osat").EnumerateArray().Select(Web).ToList();
                    var no = n.Osat.Select(Natiivi).ToList();
                    Oleta.Sama(wo.Count, no.Count, $"{nimi} / {n.Otsikko}: osia");
                    for (int j = 0; j < wo.Count; j++) Oleta.Sama(wo[j], no[j], $"{nimi} / {n.Otsikko} osa {j}");
                    osia += wo.Count;
                }
            }
            Oleta.Sama(550, osia);
        }
    }
}
