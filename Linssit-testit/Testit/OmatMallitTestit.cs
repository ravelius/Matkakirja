using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OmatMallitTestit
    {
        const string Json = "{\"tekija\":\"Pyramidien 3D-malli: Matkakirja\",\"kohteet\":[" +
            "{\"id\":\"kheops\",\"lat\":29.97917,\"lon\":31.13417,\"korkeus\":77.1,\"leikkaus\":[[29.9802415,31.1354049],[29.9781003,31.135407],[29.9780985,31.1329351],[29.9802397,31.132933]],\"tileset\":\"kheops/tileset.json\"}," +
            "{\"id\":\"paha\",\"lat\":29.9,\"lon\":31.1,\"leikkaus\":[[1,2],[3,4],[5,6]],\"tileset\":\"../x/tileset.json\"}," +
            "{\"id\":\"vajaa\",\"lat\":29.9,\"lon\":31.1,\"leikkaus\":[[1,2],[3,4]],\"tileset\":\"v/tileset.json\"}]}";

        [Testi] static void LukuJaSuodatus()
        {
            var p = OmatMallit.Lue(Json);
            Oleta.Sama("Pyramidien 3D-malli: Matkakirja", p.Tekija);
            Oleta.Sama(1, p.Kohteet.Count, "polku ylös ja alle 3 leikkauspistettä pois");
            var k = p.Kohteet[0];
            Oleta.Sama("kheops/tileset.json", k.Tileset);
            Oleta.Tosi(Math.Abs(k.KorkeusM - 77.1) < 1e-9 && k.Leikkaus.Count == 4);
            Oleta.Tosi(OmatMallit.Lue("[1]") == null, "väärä muoto = null");
        }

        [Testi] static void LahellaJaPaikallinen()
        {
            var p = OmatMallit.Lue(Json);
            Oleta.Sama(1, OmatMallit.Lahella(p, 30.0444, 31.2357).Count, "Kairon keskusta noin 12 km");
            Oleta.Sama(0, OmatMallit.Lahella(p, 48.8584, 2.2945).Count, "Pariisi kaukana");
            var l = OmatMallit.Paikallinen(p.Kohteet[0].Leikkaus, p.Kohteet[0].Lat, p.Kohteet[0].Lon);
            // Kheops: jalanjälki 230 m + 2 × 4 m ≈ 238 m sivu, keskellä.
            double leveys = l[0].e - l[2].e, korkeus = l[0].n - l[1].n;
            Oleta.Tosi(Math.Abs(leveys - 238.5) < 1.5 && Math.Abs(korkeus - 238.1) < 1.5, $"sivut {leveys:F1} × {korkeus:F1} m");
            Oleta.Tosi(Math.Abs(l[0].e + l[2].e) < 2 && Math.Abs(l[0].n + l[1].n) < 2, "keskitetty");
        }
    
        // KORKEUS (PT 9.10. päätös 2, Map Tiles C4): ei Googlen pinnan mukaista korjausta; näyte vain kehittäjätilassa lokiin.
        [Testi] static void KorkeusVainOmastaMallista()
        {
            Oleta.Tosi(!OmatMallit.GooglenPintaLokiin(false, false), "pelaaja: ei näytteitä");
            Oleta.Tosi(!OmatMallit.GooglenPintaLokiin(true, true), "oma korkeusmalli: ei näytteitä");
            Oleta.Tosi(OmatMallit.GooglenPintaLokiin(true, false), "kehittäjä: vain loki");
            // Unity-osa ei siirrä mallia eikä leikkausankkuria Googlen pinnan mukaan (lähdetarkistus).
            string u = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "CesiumOmatMallit.cs"));
            int i = u.IndexOf("async void MittaaKorkeudet()", StringComparison.Ordinal), j = u.IndexOf("static (string json", i, StringComparison.Ordinal);
            string m = u.Substring(i, j - i);
            Oleta.Tosi(!m.Contains("localPosition") && !m.Contains("longitudeLatitudeHeight =") && !u.Contains("KorjausRajaM"), "ei korkeuskorjausta Googlen pinnasta");
        }

        // Kohdekohtainen krediitti (Concorde 9.10.: IGN + OSM) paketin tekijän rinnalla, kukin kerran.
        [Testi] static void KohteenOmaKrediitti()
        {
            var p = OmatMallit.Lue("{\"tekija\":\"Pyramidien 3D-malli: Matkakirja\",\"kohteet\":[" +
                "{\"id\":\"khufu\",\"lat\":29.979,\"lon\":31.134,\"korkeus\":80,\"leikkaus\":[[29.98,31.13],[29.98,31.14],[29.97,31.14]],\"tileset\":\"khufu/tileset.json\"}," +
                "{\"id\":\"concorde\",\"lat\":48.8656,\"lon\":2.3212,\"korkeus\":76.8,\"tekija\":\"Concorde: © IGN, © OSM\",\"leikkaus\":[[48.866,2.32],[48.866,2.323],[48.865,2.323]],\"tileset\":\"concorde/tileset.json\"}]}");
            Oleta.Sama(2, p.Kohteet.Count);
            Oleta.Sama("Concorde: © IGN, © OSM", p.Kohteet[1].Tekija);
            Oleta.Sama("Pyramidien 3D-malli: Matkakirja · Concorde: © IGN, © OSM", OmatMallit.Tekijat(p, p.Kohteet));
            Oleta.Sama("Concorde: © IGN, © OSM", OmatMallit.Tekijat(p, new[] { p.Kohteet[1] }));
            Oleta.Sama(null, OmatMallit.Tekijat(p, new OmatMallit.Kohde[0]));
        }
}
}
