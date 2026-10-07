// HISTORIAMOOTTORI: kävelygeometrian data (Linnanrakentajan kavely v1; kultaiset/kavely-v1-osat.json ja -merkit.json).
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KavelyDataTestit
    {
        static KavelyData Kultainen() => KavelyData.Lue(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "kavely-v1-osat.json")),
            File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "kavely-v1-merkit.json")));

        [Testi] static void OsatJaTiedostot()
        {
            var d = Kultainen();
            Oleta.Sama(1, d.Versio);
            Oleta.Tosi(d.Osat.ContainsKey("vesiportti") && d.Osat.ContainsKey("keittio-G102") && d.Osat.ContainsKey("kirkkotorni-portaat") && d.Osat.ContainsKey("ulkoalue"), "osat");
            var k = d.Osat["keittio-G102"];
            Oleta.Sama("keittio-G102.glb", k.Nakyva); Oleta.Sama("keittio-G102-tormays.glb", k.Tormays); Oleta.Sama("keittio-G102-kavely.glb", k.Kavely);
            Oleta.Tosi(k.KattoY is double ky && Math.Abs(ky - 2.8) < 1e-9, "katto_y");
            Oleta.Tosi(k.Portaalit.Count == 1 && k.Portaalit[0].Laji == "ovi" && k.Portaalit[0].Tunnus == "keittio-piha", "portaali");
            Oleta.Tosi(Math.Abs(k.RajatMin[0] + 25.3) < 1e-9 && Math.Abs(k.RajatMax[2] - 17.28) < 1e-9, "rajat");
            Oleta.Tosi(d.Esineet.Count == 6 && d.Esineet["kauha"] == "esine-kauha.glb", "esineet");
        }

        [Testi] static void MerkitJaLeikkaukset()
        {
            var d = Kultainen();
            Oleta.Sama(20, d.Merkit.Count);
            Oleta.Sama(3, d.Lajia("piilo").Count()); Oleta.Sama(4, d.Lajia("esine").Count()); Oleta.Sama(4, d.Lajia("partio").Count());
            var l = d.Osat["keittio-G102"].Leikkaukset.Single();
            Oleta.Tosi(l.Sisalla(-19.7, -0.5, 13.4) && !l.Sisalla(-30, -0.5, 13.4), "keittiön sisätila leikataan");
            var v = d.Osat["vesiportti"].Leikkaukset[1];   // kierretty käytävä (kierto_y −0,6153)
            Oleta.Tosi(v.Sisalla(v.X, v.Y, v.Z), "kierretty särmiö: keskipiste sisällä");
            double c = Math.Cos(v.KiertoY), s = Math.Sin(v.KiertoY), pituus = v.KokoX / 2 - 0.5;
            Oleta.Tosi(v.Sisalla(v.X + c * pituus, v.Y, v.Z + s * pituus) && !v.Sisalla(v.X - s * 3, v.Y, v.Z + c * 3), "kierretty särmiö: pituussuunta sisällä, sivu ulkona");
        }

        [Testi] static void TyhjaJaRikkinainen()
        {
            var d = KavelyData.Lue("", null);
            Oleta.Tosi(d.Osat.Count == 0 && d.Merkit.Count == 0, "tyhjä");
            var e = KavelyData.Lue("{\"osat\": {\"x\": 5}}", "[{\"paikka\": [1,2,3]}]");
            Oleta.Tosi(e.Osat.Count == 0 && e.Merkit.Count == 0, "rikkinäinen ohitetaan");
        }
    
        [Testi] static void EsineHeitettavaJaKierto()
        {
            var d = KavelyData.Lue("{\"osat\": {}}", "[{\"nimi\": \"esine:nauris\", \"paikka\": [1, 2, 3], \"glb\": \"esine-nauris.glb\", \"heitettava\": true}, " +
                "{\"nimi\": \"vene:laituri\", \"paikka\": [0, -7, 0], \"kierto_y\": 2.1}, {\"nimi\": \"esine:kivi\", \"paikka\": [0, 0, 0]}]");
            var n = System.Linq.Enumerable.First(d.Lajia("esine"));
            Oleta.Tosi(n.Heitettava && n.Glb == "esine-nauris.glb" && n.Tunnus == "nauris", "heitettävä esine");
            Oleta.Tosi(!System.Linq.Enumerable.Last(d.Lajia("esine")).Heitettava, "ilman kenttää ei heitettävä");
            Oleta.Tosi(System.Linq.Enumerable.First(d.Lajia("vene")).KiertoY == 2.1, "kierto_y");
        }
}
}
