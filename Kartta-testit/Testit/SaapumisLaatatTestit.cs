// Laattojen esilataus erä 2 (Natiiviseppä 26.9.2026): kohdekaupungin saapumisnäkymän laatat (Kartta/SaapumisLaatat.cs).
// Mitoitus pyyntölokilla: /Users/Shared/Claude/proto-3d/lokit/laatta-esilataus/era2 (rooma-1, pariisi-2, amsterdam-1).
using System.Collections.Generic;
using System.Linq;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class SaapumisLaatatTestit
    {
        const double Sade = 6378.137;   // pallonsäteet → km (PalloKierto: Korkeus × WGS84:n iso akseli)
        const double Fov = 50.0, Kuvasuhde = 1206.0 / 2622.0;   // iPhone 18 Pro -simulaattorin kamera

        // Mitatut saapumisnäkymät (MATKAKIRJA saapuminen: … → (lat, lon) korkeus R).
        static readonly (string nimi, double lat, double lon, double korkeusR)[] Nakymat =
        {
            ("rooma", 42.408, 12.483, 0.2392), ("pariisi", 46.739, 2.352, 0.2234), ("amsterdam", 52.249, 4.883, 0.0633),
        };

        static (List<(int z, int x, int y)> pohja, List<(int z, int x, int y)> maasto) Laske(double lat, double lon, double korkeusR)
        {
            double h = korkeusR * Sade;
            var a = SaapumisLaatat.Alue(lat, lon, h, Fov, Kuvasuhde);
            var (p0, p1) = SaapumisLaatat.Tasot(SaapumisLaatat.Taso(h, SaapumisLaatat.RasteriKerroin, 0, 9));
            var (m0, m1) = SaapumisLaatat.Tasot(SaapumisLaatat.Taso(h, SaapumisLaatat.MaastoKerroin, 0, 12));
            return (SaapumisLaatat.Mercator(a, p0, p1), SaapumisLaatat.Maantieteellinen(a, m0, m1));
        }

        [Testi]
        static void PaatasoSeuraaMitattua()
        {
            // Pyyntöloki: 1 526 ja 1 425 km → pohja Z8 ja maasto Z7; 404 km → pohja Z9 ja maasto Z9.
            Oleta.Sama(8, SaapumisLaatat.Taso(0.2392 * Sade, SaapumisLaatat.RasteriKerroin, 0, 9));
            Oleta.Sama(8, SaapumisLaatat.Taso(0.2234 * Sade, SaapumisLaatat.RasteriKerroin, 0, 9));
            Oleta.Sama(9, SaapumisLaatat.Taso(0.0633 * Sade, SaapumisLaatat.RasteriKerroin, 0, 9));
            Oleta.Sama(7, SaapumisLaatat.Taso(0.2392 * Sade, SaapumisLaatat.MaastoKerroin, 0, 12));
            Oleta.Sama(7, SaapumisLaatat.Taso(0.2234 * Sade, SaapumisLaatat.MaastoKerroin, 0, 12));
            Oleta.Sama(9, SaapumisLaatat.Taso(0.0633 * Sade, SaapumisLaatat.MaastoKerroin, 0, 12));
            // Rajaus: pohjan ylin taso 9 (pohja z0–9), kaukaa alin 0.
            Oleta.Sama(9, SaapumisLaatat.Taso(50.0, SaapumisLaatat.RasteriKerroin, 0, 9));
            Oleta.Sama(0, SaapumisLaatat.Taso(1e9, SaapumisLaatat.RasteriKerroin, 0, 9));
            Oleta.Sama((6, 8), SaapumisLaatat.Tasot(8));
            // Päätaso alle Z6: kaikki buildin paketissa, ei esiladattavaa (tyhjä väli).
            var (a, b) = SaapumisLaatat.Tasot(5);
            Oleta.Tosi(a > b, "tyhjä väli");
        }

        [Testi]
        static void MitatutLaatatEnnusteessa()
        {
            // Mitattujen joukosta poimittuja (luokka, z, x, y): kuuluvat ennusteeseen.
            var mitatut = new Dictionary<string, (bool maasto, int z, int x, int y)[]>
            {
                ["rooma"] = new[] { (false, 6, 34, 22), (false, 7, 68, 44), (false, 8, 139, 90), (false, 8, 137, 94), (true, 6, 67, 46), (true, 7, 134, 93) },
                ["pariisi"] = new[] { (false, 6, 34, 19), (false, 7, 67, 48), (false, 8, 132, 91), (true, 6, 63, 46), (true, 7, 133, 93) },
                ["amsterdam"] = new[] { (false, 7, 66, 44), (false, 8, 130, 84), (false, 9, 263, 166), (true, 7, 132, 102), (true, 8, 262, 204), (true, 9, 525, 405) },
            };
            foreach (var (nimi, lat, lon, k) in Nakymat)
            {
                var (pohja, maasto) = Laske(lat, lon, k);
                foreach (var (m, z, x, y) in mitatut[nimi])
                    Oleta.Tosi((m ? maasto : pohja).Contains((z, x, y)), $"{nimi}: {(m ? "maasto" : "pohja")} {z}/{x}/{y}");
            }
        }

        [Testi]
        static void MaaratKuinMitoituksessa()
        {
            // Mitoituksen määrät (lokit/laatta-esilataus/era2/mitoitus.txt, sama malli Pythonilla): pohja ja maasto tasoittain.
            var odotettu = new Dictionary<string, (int[] pohja, int[] maasto)>
            {
                ["rooma"] = (new[] { 28, 50, 128 }, new[] { 40, 96 }),
                ["pariisi"] = (new[] { 35, 60, 144 }, new[] { 42, 108 }),
                ["amsterdam"] = (new[] { 20, 35, 66 }, new[] { 30, 48, 130 }),
            };
            foreach (var (nimi, lat, lon, k) in Nakymat)
            {
                var (pohja, maasto) = Laske(lat, lon, k);
                var p = pohja.GroupBy(t => t.z).OrderBy(g => g.Key).Select(g => g.Count()).ToArray();
                var m = maasto.GroupBy(t => t.z).OrderBy(g => g.Key).Select(g => g.Count()).ToArray();
                Oleta.Sama(string.Join(",", odotettu[nimi].pohja), string.Join(",", p), nimi + " pohja");
                Oleta.Sama(string.Join(",", odotettu[nimi].maasto), string.Join(",", m), nimi + " maasto");
            }
        }

        [Testi]
        static void JarjestysKarkeinJaKeskiEnsin()
        {
            var (pohja, _) = Laske(46.739, 2.352, 0.2234);
            for (int i = 1; i < pohja.Count; i++) Oleta.Tosi(pohja[i - 1].z <= pohja[i].z, "karkein taso ensin");
            var keski = SaapumisLaatat.MercatorXY(8, 46.739, 2.352);
            Oleta.Sama((8, keski.x, keski.y), pohja.First(t => t.z == 8), "keskipisteen laatta tason ensimmäisenä");
            Oleta.Sama(pohja.Count, pohja.Distinct().Count(), "ei kaksoiskappaleita");
        }

        [Testi]
        static void PituusKiertyy()
        {
            // Kohde päivämäärärajalla (Fidži 178°): laatat molemmin puolin, kaikki ruudukossa.
            var a = SaapumisLaatat.Alue(-17.7, 178.4, 1500, Fov, Kuvasuhde);
            var l = SaapumisLaatat.Mercator(a, 8, 8);
            Oleta.Tosi(l.Any(t => t.x == 255) && l.Any(t => t.x == 0), "x kiertyy 255 → 0");
            Oleta.Tosi(l.All(t => t.x >= 0 && t.x < 256 && t.y >= 0 && t.y < 256));
            var g = SaapumisLaatat.Maantieteellinen(a, 7, 7);
            Oleta.Tosi(g.Any(t => t.x == 255) && g.Any(t => t.x == 0), "maasto: x kiertyy 255 → 0");
            // Kaukaa koko pallo: taso 2 kokonaan, ei kaksoiskappaleita.
            var k = SaapumisLaatat.Alue(0, 0, 40000, Fov, 2.0);
            var z2 = SaapumisLaatat.Mercator(k, 2, 2);
            Oleta.Sama(z2.Count, z2.Distinct().Count());
            Oleta.Tosi(z2.Count <= 16);
        }

        [Testi]
        static void AvainYhdistaaSamanNakyman()
        {
            Oleta.Sama(SaapumisLaatat.Avain("ITA", 42.408, 12.483, 1525.7), SaapumisLaatat.Avain("ITA", 42.5, 12.3, 1560));
            Oleta.Tosi(SaapumisLaatat.Avain("ITA", 42.408, 12.483, 1525.7) != SaapumisLaatat.Avain("FRA", 42.408, 12.483, 1525.7));
            Oleta.Tosi(SaapumisLaatat.Avain("ITA", 42.408, 12.483, 1525.7) != SaapumisLaatat.Avain("ITA", 42.408, 14.0, 1525.7));
            Oleta.Tosi(SaapumisLaatat.Avain("ITA", 42.408, 12.483, 1525.7) != SaapumisLaatat.Avain("ITA", 42.408, 12.483, 900));
        }
    }
}
