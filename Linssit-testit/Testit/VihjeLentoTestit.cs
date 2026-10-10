// VIHJEEN VALOKIPINÄN LENTO (Pelikoodari 11.10.2026, PT A4): alkaa katseen edestä, päättyy kohteeseen, kesto rajoissa, lähestyy koko ajan.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VihjeLentoTestit
    {
        static double M((double X, double Y, double Z) a, (double X, double Y, double Z) b) =>
            Math.Sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y) + (a.Z - b.Z) * (a.Z - b.Z));

        [Testi] static void AlustaKohteeseenRajoissa()
        {
            foreach (var kohde in new[] { (0.5, 1.0, 0.3), (6.0, 0.2, -3.0), (40.0, 5.0, 25.0), (-2.0, 1.0, 0.0) })
            {
                var l = new VihjeLento((0, 1.5, 0), kohde);
                Oleta.Tosi(l.Kesto >= VihjeLento.MinS && l.Kesto <= VihjeLento.MaxS, $"kesto {l.Kesto:F2}");
                Oleta.Tosi(M(l.Paikka(0), (0, 1.5, 0)) < 1e-9, "alku");
                double ed = double.MaxValue, maksY = double.MinValue; (double X, double Y, double Z) p = default;
                while (!l.Perilla)
                {
                    p = l.Paivita(1 / 60.0);
                    double vaaka = Math.Sqrt((p.X - kohde.Item1) * (p.X - kohde.Item1) + (p.Z - kohde.Item3) * (p.Z - kohde.Item3));
                    Oleta.Tosi(vaaka <= ed + 1e-9, "lähestyy vaakatasossa"); ed = vaaka; maksY = Math.Max(maksY, p.Y);
                }
                Oleta.Tosi(M(p, kohde) < 1e-6, $"perillä {M(p, kohde):F3} m");
                Oleta.Tosi(maksY <= Math.Max(1.5, kohde.Item2) + VihjeLento.KaariM + 1e-9, "kaari enintään KaariM");
            }
        }

        [Testi] static void Taso1LentaaVainNakymanUlkopuolelle()
        {
            Oleta.Tosi(!VihjeLento.Lentaa(1, true), "taso 1 näkyvissä: ei lentoa");
            Oleta.Tosi(VihjeLento.Lentaa(1, false) && VihjeLento.Lentaa(2, true) && VihjeLento.Lentaa(3, true), "muut lentävät");
        }
    }
}
