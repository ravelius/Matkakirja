// Harhautusheiton tähtäys (pelattavuusmalli 2.4): kantama 3–9 m katseen pystykulmasta, rata laskeutuu kantaman päähän.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class HeittorataTestit
    {
        [Testi] static void KantamaKatseesta()
        {
            Oleta.Tosi(Math.Abs(Heittorata.Kantama(0) - 6) < 1e-9, "suoraan eteen 6 m");
            Oleta.Tosi(Math.Abs(Heittorata.Kantama(-25) - 3) < 1e-9 && Math.Abs(Heittorata.Kantama(-60) - 3) < 1e-9, "alas 3 m (raja)");
            Oleta.Tosi(Math.Abs(Heittorata.Kantama(25) - 9) < 1e-9 && Math.Abs(Heittorata.Kantama(70) - 9) < 1e-9, "ylös 9 m (raja)");
            Oleta.Tosi(Heittorata.Kantama(10) > Heittorata.Kantama(-10), "ylempi katse kauemmas");
        }

        [Testi] static void RataLaskeutuuKantamanPaahan()
        {
            // Euler-askel 1 ms: esine lähtee 1,3 m:n korkeudelta ja osuu lattiaan (y = 0) ±0,15 m kantamasta.
            foreach (double r in new[] { 3.0, 4.5, 6.0, 7.5, 9.0 })
            {
                var (vx, vy) = Heittorata.Nopeus(r);
                double x = 0, y = Heittorata.KasiM, dt = 0.001, t = 0;
                while (y > 0 && t < 5) { x += vx * dt; vy -= Heittorata.G * dt; y += vy * dt; t += dt; }
                Oleta.Tosi(Math.Abs(x - r) < 0.15, $"kantama {r} m → osuma {x:F2} m");
                Oleta.Tosi(t > 0.4 && t < 1.6, $"lento {t:F2} s (luettava kaari)");
            }
        }

        [Testi] static void KyyrystaMatalammalta()
        {
            // Kyyryssä käsi ~0,8 m: sama kantama vaatii suuremman nopeuden, osuma silti kantaman päässä.
            var (vx, vy) = Heittorata.Nopeus(6, 0.8);
            double x = 0, y = 0.8, dt = 0.001;
            while (y > 0) { x += vx * dt; vy -= Heittorata.G * dt; y += vy * dt; }
            Oleta.Tosi(Math.Abs(x - 6) < 0.15, $"kyyryssä 6 m → {x:F2} m");
        }
    }
}
