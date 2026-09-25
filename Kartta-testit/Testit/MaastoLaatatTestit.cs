// Löydös 80 / BUILD 16: aloitusnäytön esilatauksen maastolaatat (Kartta/MaastoLaatat.cs).
using System.Linq;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class MaastoLaatatTestit
    {
        // Karttasepän layer.jsonin muoto (2026-09-24-maailma, lyhennetty): tasot 0–1 kokonaan, tasolla 2 aukko.
        const string Layer = "{\"tilejson\": \"2.1.0\", \"version\": \"1.0.0\", \"scheme\": \"tms\",\n" +
            " \"tiles\": [\"{z}/{x}/{y}.terrain?v=2026-09-24-maailma\"], \"maxzoom\": 12,\n" +
            " \"available\": [[{\"startX\": 0, \"startY\": 0, \"endX\": 1, \"endY\": 0}],\n" +
            "  [{\"startX\": 0, \"startY\": 0, \"endX\": 3, \"endY\": 1}],\n" +
            "  [{\"startX\": 0, \"startY\": 0, \"endX\": 7, \"endY\": 1}, {\"startX\": 0, \"startY\": 2, \"endX\": 2, \"endY\": 3}]],\n" +
            " \"attribution\": \"x\"}";

        [Testi]
        static void LontoonLaatatTmsRuudukossa()
        {
            // Lontoo (51,507, −0,128): taso 10 = 2048 × 1024 laattaa, rivi 0 etelässä (curl-tarkistettu ämpäristä 25.9.).
            Oleta.Sama((1023, 805), MaastoLaatat.Laatta(10, 51.507, -0.128));
            Oleta.Sama((4093, 3220), MaastoLaatat.Laatta(12, 51.507, -0.128));
            Oleta.Sama((0, 0), MaastoLaatat.Laatta(0, -90.0, -180.0));
            Oleta.Sama((1, 0), MaastoLaatat.Laatta(0, 89.9, 179.9));
            // Pituus kiertyy, leveys rajataan.
            Oleta.Sama(MaastoLaatat.Laatta(5, 10.0, -170.0), MaastoLaatat.Laatta(5, 10.0, 190.0));
            Oleta.Sama((0, 31), MaastoLaatat.Laatta(5, 90.0, -180.0));
        }

        [Testi]
        static void TilesPohjaJaVersio()
        {
            Oleta.Sama("{z}/{x}/{y}.terrain?v=2026-09-24-maailma", MaastoLaatat.TilesPohja(Layer));
            Oleta.Sama("{z}/{x}/{y}.terrain?v=1.2.0", MaastoLaatat.TilesPohja("{\"version\":\"1.2.0\",\"tiles\":[\"{z}/{x}/{y}.terrain?v={version}\"]}"));
            Oleta.Sama(null, MaastoLaatat.TilesPohja("{\"name\":\"x\"}"));
        }

        [Testi]
        static void SaatavuusTasoittain()
        {
            var s = MaastoLaatat.Saatavuus(Layer, 3);
            Oleta.Tosi(s != null && s.Length == 4);
            Oleta.Sama(1, s[0].Count);
            Oleta.Sama(2, s[2].Count);
            // Taso 3 puuttuu available-kentästä: ei saatavilla (Cesium ei pyydä sitä).
            Oleta.Sama(0, s[3].Count);
            Oleta.Tosi(MaastoLaatat.Saatavilla(s, 2, 7, 1));
            Oleta.Tosi(MaastoLaatat.Saatavilla(s, 2, 2, 3));
            Oleta.Tosi(!MaastoLaatat.Saatavilla(s, 2, 3, 2), "aukko tasolla 2");
            Oleta.Tosi(!MaastoLaatat.Saatavilla(s, 3, 0, 0));
            // Ilman available-kenttää kaikki kelpaavat.
            Oleta.Sama(null, MaastoLaatat.Saatavuus("{\"tiles\":[\"a\"]}", 5));
            Oleta.Tosi(MaastoLaatat.Saatavilla(null, 9, 1, 1));
            // Vain pyydetyt tasot luetaan.
            Oleta.Sama(1, MaastoLaatat.Saatavuus(Layer, 0).Length);
        }

        [Testi]
        static void YmpariltaVainSaatavilla()
        {
            var s = MaastoLaatat.Saatavuus(Layer, 2);
            var p = MaastoLaatat.Ymparilta("julisteet/maasto/v/", MaastoLaatat.TilesPohja(Layer), s, 30.0, -60.0,
                new[] { (2, 1), (1, 0) });
            // Taso 2: laatta (2, 2); säde 1 → x 1–3, y 1–3; aukko (x 3, y 2–3) ja (x ≥ 3, y ≥ 2) pois.
            Oleta.Tosi(p.Contains("julisteet/maasto/v/2/2/2.terrain?v=2026-09-24-maailma"), string.Join(" ", p));
            Oleta.Tosi(!p.Any(x => x.StartsWith("julisteet/maasto/v/2/3/2.") || x.StartsWith("julisteet/maasto/v/2/3/3.")));
            Oleta.Sama(7, p.Count(x => x.StartsWith("julisteet/maasto/v/2/")));
            Oleta.Tosi(p.Last() == "julisteet/maasto/v/1/1/1.terrain?v=2026-09-24-maailma", p.Last());
            // Ei pohjaa → ei polkuja; toistot pois.
            Oleta.Sama(0, MaastoLaatat.Ymparilta("k/", null, s, 0, 0, new[] { (1, 1) }).Count);
            Oleta.Sama(2, MaastoLaatat.Ymparilta("k/", "{z}/{x}/{y}", null, 0, 0, new[] { (0, 1), (0, 1) }).Count);
        }

        /// <summary>
        /// Oikea layer.json (valinnainen): MAASTO_LAYER=&lt;layer.json&gt; ./kaanna.sh MaastoLaatat. 2026-09-24-maailma:
        /// Lontoon ympäriltä tasolla 7 säteellä 2 yksi Pohjanmeren laatta puuttuu (7/128/103 ei, 404 ämpärissä),
        /// esilatauksen säteillä (KarttaKerrokset.AloitusMaasto) kaikki löytyvät.
        /// </summary>
        [Testi]
        static void OikeaLayerJson()
        {
            string polku = System.Environment.GetEnvironmentVariable("MAASTO_LAYER");
            if (string.IsNullOrEmpty(polku)) return;
            string json = System.IO.File.ReadAllText(polku);
            var s = MaastoLaatat.Saatavuus(json, 12);
            Oleta.Tosi(s != null && s.Length == 13);
            Oleta.Tosi(!MaastoLaatat.Saatavilla(s, 7, 128, 103), "Pohjanmeri 7/128/103");
            Oleta.Tosi(MaastoLaatat.Saatavilla(s, 12, 4093, 3220), "Lontoo z12");
            var p = MaastoLaatat.Ymparilta("m/", MaastoLaatat.TilesPohja(json), s, 51.507, -0.128, new[] { (7, 2) });
            Oleta.Sama(24, p.Count);
            System.Console.WriteLine($"      layer.json: {string.Join(" ", s.Select((l, z) => $"z{z}:{l.Count}"))}");
        }
    }
}
