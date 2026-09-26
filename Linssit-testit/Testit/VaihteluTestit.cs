// Elävien elementtien vaihtelu ja tauot (omistaja 26.9.2026 klo 16.5x: ei monotoniaa).
using System;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class VaihteluTestit
    {
        [Testi] static void SiemenToistaa()
        {
            var a = new Vaihtelu(7); var b = new Vaihtelu(7);
            for (double t = 0; t < 900; t += 3.7) Oleta.Tosi(Math.Abs(a.Tavoite(t) - b.Tavoite(t)) < 1e-12, "sama siemen, sama tahti");
        }

        [Testi] static void KarusellinTaukoTuleeJaKestaa()
        {
            var v = new Vaihtelu(3) { KayMinS = 60, KayMaxS = 150, SeisooMinS = 20, SeisooMaxS = 60, TaukoTod = 1 };
            double seisoi = 0, pisin = 0, nyt = 0;
            for (double t = 0; t < 1200; t += 0.5)
            {
                if (v.Seisoo(t)) { seisoi += 0.5; nyt += 0.5; pisin = Math.Max(pisin, nyt); } else nyt = 0;
            }
            Oleta.Tosi(seisoi > 60, "pysähtyy 20 minuutissa useasti: " + seisoi);
            Oleta.Tosi(pisin >= 20 && pisin <= 62, "tauko 20–60 s: " + pisin);
        }

        [Testi] static void SiirtymatPehmeita()
        {
            var v = new Vaihtelu(11) { TaukoTod = 1, Puuska = 0 };
            double ed = v.Tavoite(0);
            for (double t = 0.05; t < 1200; t += 0.05)
            {
                double n = v.Tavoite(t);
                Oleta.Tosi(Math.Abs(n - ed) < 0.05, $"ei hyppyä hetkellä {t:F2}: {ed:F3} → {n:F3}");
                ed = n;
            }
        }

        [Testi] static void PuuskatVaihtelevatMyllyssa()
        {
            var v = new Vaihtelu(5) { TaukoTod = 0, Puuska = 0.35 };
            double min = 9, max = 0;
            for (double t = 1; t < 120; t += 0.25) { double n = v.Tavoite(t); min = Math.Min(min, n); max = Math.Max(max, n); }
            Oleta.Tosi(max - min > 0.4, $"puuskat vaihtelevat: {min:F2}–{max:F2}");
            Oleta.Tosi(min > 0.5, "tauoton mylly ei pysähdy puuskissa");
        }
    }
}
