// Löydös 127: pelaajan maan kehän aineisto (Kartta/Geojson.cs): maapolygonit.geojson (renkaat) ja Karttasepän
// maamaa.geojson (maa–maa-rajat, MultiLineString) sekä kehän janat avoimille viivoille (Kehaviivat).
// Oikealla aineistolla: MAAMAA=<maamaa.geojson[.gz]> [MAAPOLYGONIT=<maapolygonit.geojson>] ./kaanna.sh Geojson
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class GeojsonTestit
    {
        static Dictionary<string, List<(double Lon, double Lat)[]>> Lue(string json) => Geojson.Lue(Encoding.UTF8.GetBytes(json));

        [Testi]
        static void MaamaaMultiLineStringAvoimiksiViivoiksi()
        {
            // Karttasepän muoto: properties.iso, MultiLineString; saarimaa tyhjänä.
            var t = Lue("{\"type\":\"FeatureCollection\",\"kuvaus\":\"x\",\"features\":[" +
                        "{\"type\":\"Feature\",\"properties\":{\"iso\":\"GRC\"},\"geometry\":{\"type\":\"MultiLineString\",\"coordinates\":" +
                        "[[[20.0,39.7],[20.5,40.1],[21.0,40.8]],[[26.6,41.7],[26.0,41.0]]]}}," +
                        "{\"type\":\"Feature\",\"properties\":{\"iso\":\"ISL\"},\"geometry\":{\"type\":\"MultiLineString\",\"coordinates\":[]}}," +
                        "{\"type\":\"Feature\",\"geometry\":{\"coordinates\":[[[8.0,47.0],[9.0,47.0],[8.5,46.0],[8.0,47.0]]],\"type\":\"MultiLineString\"}," +
                        "\"properties\":{\"iso\":\"CHE\"}}]}");
            Oleta.Sama(2, t.Count, "saarimaa (tyhjä) jää pois");
            Oleta.Sama(2, t["GRC"].Count, "GRC kaksi viivaa");
            Oleta.Sama(3, t["GRC"][0].Length, "ensimmäinen viiva 3 pistettä");
            Oleta.Tosi(t["GRC"][1][1] == (26.0, 41.0), "toinen viiva sellaisenaan");
            Oleta.Tosi(!t.ContainsKey("ISL"), "ISL ei kehää");
            Oleta.Sama(4, t["CHE"][0].Length, "kenttien järjestys vapaa; koko rengas avoimena viivana");
        }

        [Testi]
        static void MaapolygonitRenkaiksiKutenEnnen()
        {
            var t = Lue("{\"features\":[{\"properties\":{\"iso\":\"FRA\",\"nimi\":\"Ranska\"},\"geometry\":{\"type\":\"MultiPolygon\"," +
                        "\"coordinates\":[[[[2,48],[3,48],[3,49],[2,48]]],[[[9,42],[9.5,42],[9.2,43],[9,42]]]]}}," +
                        "{\"properties\":{\"iso\":\"FRA\"},\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-52,4],[-53,5],[-52,5],[-52,4]]]}}," +
                        "{\"properties\":null,\"geometry\":null}]}");
            Oleta.Sama(1, t.Count, "yksi maa");
            Oleta.Sama(3, t["FRA"].Count, "saman maan featuret yhdistyvät");
            Oleta.Tosi(t["FRA"][0][0] == t["FRA"][0][3], "sulkeva piste mukana");
        }

        [Testi]
        static void GzipPuretaan()
        {
            var raaka = Encoding.UTF8.GetBytes("{\"features\":[{\"properties\":{\"iso\":\"AUT\"},\"geometry\":{\"coordinates\":[[[9.5,47.5],[17.1,48.0]]]}}]}");
            var ms = new MemoryStream();
            using (var gz = new GZipStream(ms, CompressionLevel.Optimal, true)) gz.Write(raaka, 0, raaka.Length);
            var t = Geojson.Lue(Geojson.Pura(ms.ToArray()));
            Oleta.Sama(1, t["AUT"].Count, "gzip");
            Oleta.Tosi(ReferenceEquals(raaka, Geojson.Pura(raaka)), "pakkaamaton sellaisenaan");
        }

        [Testi]
        static void KehanJanatAvoimelleJaRenkaalle()
        {
            // Rengas: viimeisestä ensimmäiseen (GeoJSONin sulkeva piste = nollajana, jonka piirto ohittaa); avoin viiva ei sulje.
            Oleta.Sama(4, Kehaviivat.Janoja(4, false), "rengas");
            Oleta.Sama(3, Kehaviivat.Janoja(4, true), "avoin");
            Oleta.Sama(0, Kehaviivat.Janoja(1, true), "yksi piste");
            Oleta.Sama(0, Kehaviivat.Loppu(3, 4, false), "rengas sulkeutuu");
            Oleta.Sama(3, Kehaviivat.Loppu(2, 4, true), "avoin etenee");
        }

        [Testi]
        static void LavistajaSaumanYli()
        {
            // Tšukotkan rengas 170°…-170° (20° leveä) eikä koko maailman levyinen; leveys kavennetaan cos φ:llä.
            var v = new (double Lon, double Lat)[] { (170, 65), (179, 66), (-179, 67), (-170, 65) };
            double l = Kehaviivat.Lavistaja(v);
            double odotus = Math.Sqrt(Math.Pow(20 * Math.Cos(66 * Math.PI / 180), 2) + 4);
            Oleta.Tosi(Math.Abs(l - odotus) < 1e-9, $"lävistäjä {l:0.000} (odotus {odotus:0.000})");
            // Lyhyt rajanpätkä (esim. Samoksen kärki): alle 10 px:n lävistäjä ruudulla karsiutuu varjostimessa.
            var p = new (double Lon, double Lat)[] { (27.03, 37.70), (27.05, 37.69) };
            Oleta.Tosi(Kehaviivat.Lavistaja(p) < 0.03, "pätkä");
        }

        [Testi]
        static void OikeaMaamaaAineisto()
        {
            var polku = Environment.GetEnvironmentVariable("MAAMAA");
            if (string.IsNullOrEmpty(polku) || !File.Exists(polku)) return;
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var t = Geojson.Lue(Geojson.Pura(File.ReadAllBytes(polku)));
            long ms = kello.ElapsedMilliseconds;
            int viivoja = 0, pisteita = 0;
            foreach (var m in t.Values) foreach (var v in m) { viivoja++; pisteita += v.Length; }
            Console.WriteLine($"      {polku}: {t.Count} maata, {viivoja} viivaa, {pisteita} pistettä, {ms} ms (Mac)");
            Oleta.Tosi(t.Count > 80 && t.Count <= 135, "maita (saarimaat puuttuvat)");
            Oleta.Tosi(t.ContainsKey("GRC") && t["GRC"].Count >= 1 && !t.ContainsKey("ISL"), "GRC rajat, ISL ei");
            var che = t["CHE"];
            Oleta.Tosi(che.Count == 1 && che[0][0] == che[0][che[0].Length - 1], "CHE koko rengas yhtenä viivana");
            // Karttasepän lupaus: samat kärjet kuin maapolygonit.geojsonissa (viiva osuu entiseen kohtaan).
            var pp = Environment.GetEnvironmentVariable("MAAPOLYGONIT");
            if (string.IsNullOrEmpty(pp) || !File.Exists(pp)) return;
            var renkaat = Geojson.Lue(Geojson.Pura(File.ReadAllBytes(pp)));
            foreach (var iso in new[] { "GRC", "AUT", "FRA", "EGY", "SRB" })
            {
                var karjet = new HashSet<(double, double)>();
                foreach (var r in renkaat[iso]) foreach (var q in r) karjet.Add(q);
                int ohi = 0, n = 0;
                foreach (var v in t[iso]) foreach (var q in v) { n++; if (!karjet.Contains(q)) ohi++; }
                Console.WriteLine($"      {iso}: {t[iso].Count} viivaa, {n} pistettä, renkaan ulkopuolisia {ohi}");
                Oleta.Sama(0, ohi, iso + ": kärjet renkaasta");
            }
        }
    }
}
