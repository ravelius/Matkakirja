// HISTORIAMOOTTORI V2 (Siirtoseppä 7.10.2026): venesaapumisen ydin — perillä tasan kestossa, vedot työntävät, soutukello lepää
// liu'un aikana, loppusuunta kiinnitykseen.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VenesaapuminenTestit
    {
        static readonly List<(double, double, double)> Reitti = new List<(double, double, double)>
        { (0, 0, 120), (10, 0, 40), (5, 0, 8), (0, 0, 0) };

        [Testi] static void PerillaKestossaJaLiikkuuEteen()
        {
            var v = new Venesaapuminen(Reitti, 50);
            var alku = v.Tila(0); var loppu = v.Tila(50);
            Oleta.Tosi(Math.Abs(alku.Z - 120) < 1e-6 && Math.Abs(loppu.X) < 1e-6 && Math.Abs(loppu.Z) < 1e-6, $"alku ja loppu reitin päissä ({loppu.X:F3}, {loppu.Z:F3})");
            Oleta.Tosi(loppu.Perilla && !v.Tila(49.9).Perilla, "perillä vasta kestossa");
            double edellinen = -1;
            for (double t = 0; t <= 50; t += 0.25) { double s = v.Matka(t); Oleta.Tosi(s >= edellinen - 1e-9, $"matka ei vähene ({t:F2})"); edellinen = s; }
            Oleta.Tosi(v.Tila(20).SuuntaZ < -0.5, "keula kohti laituria (−z)");
        }

        [Testi] static void VedotTyontavatJaLiukuLepaa()
        {
            var v = new Venesaapuminen(Reitti, 50);
            // Vedon keskellä nopeampi kuin palautuksen keskellä (sama veto, ei lähtöä).
            double veto = v.Tila(10 * Venesaapuminen.SoutuS + 0.45).Nopeus, palautus = v.Tila(10 * Venesaapuminen.SoutuS + 1.45).Nopeus;
            Oleta.Tosi(veto > palautus * 1.2, $"veto {veto:F2} > palautus {palautus:F2}");
            Oleta.Tosi(Math.Abs(v.SoutuLoppuS % Venesaapuminen.SoutuS) < 1e-9 && v.SoutuLoppuS <= 50 - Venesaapuminen.LiukuS, $"soutu loppuu vedon rajalla ({v.SoutuLoppuS})");
            Oleta.Sama(0.0, v.Tila(v.SoutuLoppuS + 0.5).SoutuAika);
            Oleta.Tosi(Math.Abs(v.Tila(3.3).SoutuAika - 1.3) < 1e-9, "soutukello = t mod 2,0");
            Oleta.Tosi(v.Tila(49.95).Nopeus < 0.05, $"pysähtyy laituriin ({v.Tila(49.95).Nopeus:F3})");
        }

        [Testi] static void LoppusuuntaKiinnitykseen()
        {
            var v = new Venesaapuminen(Reitti, 50, loppuSuunta: Math.PI / 2);   // keula itään (+x)
            var l = v.Tila(50);
            Oleta.Tosi(Math.Abs(l.SuuntaX - 1) < 1e-3 && Math.Abs(l.SuuntaZ) < 1e-3, $"loppusuunta +x ({l.SuuntaX:F3}, {l.SuuntaZ:F3})");
            Oleta.Tosi(v.Tila(25).SuuntaZ < -0.5, "matkalla yhä tangentti");
        }
    }
}
