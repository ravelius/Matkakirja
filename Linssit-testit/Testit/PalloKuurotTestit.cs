// Sadekuurot itsestään (omistaja TF 168, Päätoimittaja juna 170): harvoin, pehmeästi, osa ukkoskuuroja, ei ilman sallintaa.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class PalloKuurotTestit
    {
        [Testi] static void KuurotHarvoinJaPehmeasti()
        {
            var k = new PalloKuurot(4); int kuuroja = 0, ukkosia = 0; bool ed = false; double edV = 0, maxMuutos = 0, kuuroAika = 0;
            const double dt = 0.5;
            for (double t = 0; t < 3 * 3600; t += dt)
            {
                var p = k.Paivita(dt, true);
                bool nyt = k.Voima > 0;
                if (nyt && !ed) kuuroja++;
                if (k.UkkonenAlkoi) ukkosia++;
                if (nyt) kuuroAika += dt;
                maxMuutos = Math.Max(maxMuutos, Math.Abs(k.Voima - edV) / dt);
                Oleta.Tosi(p.Sade <= 0.65 + 1e-9 && p.Ukkonen <= 1, "painot rajoissa");
                ed = nyt; edV = k.Voima;
            }
            Oleta.Tosi(kuuroja >= 6 && kuuroja <= 16, $"3 h: {kuuroja} kuuroa (harvoin)");
            Oleta.Tosi(ukkosia >= 1 && ukkosia < kuuroja, $"osa ukkoskuuroja ({ukkosia}/{kuuroja})");
            Oleta.Tosi(kuuroAika < 0.4 * 3 * 3600, $"kuuroa {kuuroAika / 60:F0} min / 180 min");
            Oleta.Tosi(maxMuutos < 1.0 / PalloKuurot.RamppiS * 1.6, $"pehmeä voimistuminen ({maxMuutos:F3}/s)");
            var e = new PalloKuurot(4); for (double t = 0; t < 3600; t += dt) { e.Paivita(dt, false); Oleta.Tosi(e.Voima == 0, "ei sallittu → ei kuuroa"); }
            // Sää vaihtuu kesken kuuron: hiipuu RamppiS:ssa, ei katkea.
            var h = new PalloKuurot(4); double tt = 0; while (h.Voima < 0.99 && tt < 7200) { h.Paivita(dt, true); tt += dt; }
            double v0 = h.Voima; h.Paivita(dt, false);
            Oleta.Tosi(h.Voima > 0.9 * v0, "ei katkea heti");
            for (int i = 0; i < (int)(PalloKuurot.RamppiS / dt) + 2; i++) h.Paivita(dt, false);
            Oleta.Tosi(h.Voima == 0, "hiipunut RamppiS:ssa");
            // Säätehosteisiin sekoitus: selkeällä kuuro tuo sateen.
            var s = new PalloSaaVaikutus(1); for (int i = 0; i < 20; i++) s.Paivita(0.5, PalloSaa.Selkea, null, new SaaPainot { Sade = 0.6, Harmaus = 0.5 });
            Oleta.Tosi(s.Nyt.Sade > 0.59 && s.Nyt.Harmaus > 0.49, "kuuro säätehosteissa");
        }
    }
}
