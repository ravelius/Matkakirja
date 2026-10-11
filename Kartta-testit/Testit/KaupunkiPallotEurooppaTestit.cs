// KUUMAILMAPALLOT KOKO EUROOPAN NÄKYMÄSSÄ (Kartta/KaupunkiPalloMitat.cs; PT 11.10. 16.5x, juna 182): pallo pienenee 84 → 52 pt
// Euroopan sovituskorkeuteen eikä Pariisin tai Tukholman pallo peitä yhtään houkutinta (eurooppa 1.4, iPhone ja iPad pysty).
// Oma tiedosto (ei KaupunkiPallotTestit.cs), jotta NUI:n haarat yhdistyvät ilman ristiriitaa.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KaupunkiPallotEurooppaTestit
    {
        const double R = 6378137.0, Fov = 50.0, Rad = Math.PI / 180.0;
        // Houkuttimien ytimen säde (pt): Houkuttimet.YdinMinPt / 2.
        static readonly float YdinSade = (float)(Houkuttimet.YdinMinPt / 2);
        static readonly Dictionary<string, (double Lat, double Lon)> Paikat = new Dictionary<string, (double, double)>
        {
            ["alpit"] = (46.5, 9.8), ["lontoo"] = (51.507, -0.128), ["edinburgh"] = (55.953, -3.188), ["istanbul"] = (41.008, 28.978),
            ["amsterdam"] = (52.37, 4.895), ["berliini"] = (52.52, 13.405), ["ateena"] = (37.984, 23.728),
        };
        static readonly (string Id, double Lat, double Lon)[] Pallot = { ("pariisi", 48.857, 2.352), ("tukholma", 59.33, 18.07) };

        /// <summary>Kamera Euroopan keskipisteessä korkeudella h (m), pohjoinen ylös: piste ruudulle (pt, y alas).</summary>
        static (float X, float Y) Ruudulle(double lat, double lon, double h, double w, double hh)
        {
            double d = 1 + h / R, la = EurooppaLoitonnus.KeskiLat * Rad, lo = EurooppaLoitonnus.KeskiLon * Rad;
            double[] c = { Math.Cos(la) * Math.Cos(lo), Math.Cos(la) * Math.Sin(lo), Math.Sin(la) };
            double[] e = { -Math.Sin(lo), Math.Cos(lo), 0 };
            double[] n = { -Math.Sin(la) * Math.Cos(lo), -Math.Sin(la) * Math.Sin(lo), Math.Cos(la) };
            double[] p = { Math.Cos(lat * Rad) * Math.Cos(lon * Rad), Math.Cos(lat * Rad) * Math.Sin(lon * Rad), Math.Sin(lat * Rad) };
            double pc = p[0] * c[0] + p[1] * c[1] + p[2] * c[2];
            double[] v = { p[0] - d * c[0], p[1] - d * c[1], p[2] - d * c[2] };
            double z = d - pc, s = hh / 2 / Math.Tan(Fov / 2 * Rad);
            return ((float)(w / 2 + (v[0] * e[0] + v[1] * e[1]) / z * s), (float)(hh / 2 - (v[0] * n[0] + v[1] * n[1] + v[2] * n[2]) / z * s));
        }

        [Testi]
        static void PalloPieneeEuroopanKorkeudella()
        {
            // Raja ennallaan: NakyyAstiM:ssä KokoKaukaPt; ilman Euroopan korkeutta vakio kuten ennen.
            Oleta.Tosi(KaupunkiPalloMitat.Koko(KaupunkiPalloMitat.NakyyAstiM, 13_579_000) == KaupunkiPalloMitat.KokoKaukaPt, "raja ennallaan");
            Oleta.Tosi(KaupunkiPalloMitat.Koko(10_000_000) == KaupunkiPalloMitat.KokoKaukaPt, "ilman Euroopan korkeutta 84 pt");
            Oleta.Tosi(KaupunkiPalloMitat.Koko(13_579_000, 13_579_000) == KaupunkiPalloMitat.KokoEurooppaPt
                       && KaupunkiPalloMitat.Koko(20_000_000, 8_004_000) == KaupunkiPalloMitat.KokoEurooppaPt, "Euroopan katolla ja yli 52 pt");
            float ed = float.MaxValue;
            foreach (double h in new[] { 2_600_000.0, 4_000_000, 6_000_000, 8_000_000, 11_000_000, 13_579_000 })
            {
                float k = KaupunkiPalloMitat.Koko(h, 13_579_000);
                Oleta.Tosi(k <= ed && k >= KaupunkiPalloMitat.KokoEurooppaPt && k <= KaupunkiPalloMitat.KokoKaukaPt, $"pienenee {h}: {k}");
                ed = k;
            }
        }

        [Testi]
        static void PallotEivatPeitaHoukuttimia()
        {
            foreach (var (lab, w, hh) in new[] { ("iPhone pysty", 402.0, 874.0), ("iPad pysty", 1032.0, 1376.0) })
            {
                double h = EurooppaLoitonnus.SovitusKorkeus(Fov, w / hh) * R;
                float koko = KaupunkiPalloMitat.Koko(h, h);
                var pisteet = Houkuttimet.Lista.Select(x => x.Vapaa ? (x.Lat, x.Lon) : Paikat[x.Id])
                    .Select(p => Ruudulle(p.Item1, p.Item2, h, w, hh)).ToList();
                foreach (var pallo in Pallot)
                {
                    var a = Ruudulle(pallo.Lat, pallo.Lon, h, w, hh);
                    bool oikea = KaupunkiPalloMitat.VaistavaPuoli(a.X, a.Y, koko, pisteet, false);
                    float vara = KaupunkiPalloMitat.Vara(a.X, a.Y, koko, oikea, pisteet);
                    Oleta.Tosi(vara >= YdinSade, $"{lab}: {pallo.Id} {koko:0} pt {(oikea ? "oikealle" : "vasemmalle")}, vara {vara:0.0} pt ≥ ytimen säde {YdinSade}");
                    Console.WriteLine($"  kaupunkipallot {lab} ({h / 1000:0} km): {pallo.Id} {koko:0} pt {(oikea ? "oikealle" : "vasemmalle")}, " +
                                      $"lähin houkutin {vara:0.0} pt = {vara * (lab.StartsWith("iPhone") ? 3 : 2):0} px muodosta");
                }
            }
            // Väistön puoli: piste suoraan vasemman kallistuksen kuoressa → oikealle; tyhjällä listalla nykyinen.
            var vasenKuori = new List<(float X, float Y)> { (100f - 0.24f * 52f, 200f - 0.79f * 52f) };
            Oleta.Tosi(KaupunkiPalloMitat.VaistavaPuoli(100f, 200f, 52f, vasenKuori, false), "väistää oikealle");
            Oleta.Tosi(!KaupunkiPalloMitat.VaistavaPuoli(100f, 200f, 52f, new List<(float X, float Y)>(), false), "ei pisteitä: ennallaan");
            // Muodon osuudet samat kuin PalloNappi (UI/KaupunkiPallot.cs).
            string ui = System.IO.File.ReadAllText("../Assets/Matkakirja/UI/KaupunkiPallot.cs");
            Oleta.Tosi(ui.Contains("KuoriX = 0.26f, KuoriY = 0.18f, KuoriRx = 0.19f, KuoriRy = 0.19f, KoriX = 0.26f, KoriY = 0.63f, KoriR = 0.05f"),
                       "PalloNappi-osuudet = KaupunkiPalloMitat");
        }
    }
}
