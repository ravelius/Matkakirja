// PALLON POLTIN (Linssiseppä 8.10.2026): liekki vain nousussa (fysiikkasääntö), syttyy nopeasti, purske vähintään 1,2 s, hiipuu.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class PoltinTestit
    {
        [Testi] static void LiekkiVainNousussa()
        {
            var p = new Poltin(); const double dt = 1 / 60.0;
            for (int i = 0; i < 300; i++) p.Paivita(dt, i < 150 ? 0 : -3);   // lepo ja lasku
            Oleta.Tosi(!p.Palaa && p.Taso == 0, "ei liekkiä levossa eikä laskussa");
            int syttyi = 0; double t = 0;
            for (; t < 0.2; t += dt) { p.Paivita(dt, 3); if (p.Syttyi) syttyi++; }
            Oleta.Tosi(syttyi == 1 && p.Taso > 0.99, $"syttyy kerran ja täyteen 0,2 s:ssa (taso {p.Taso:F2})");
            p.Paivita(dt, 0);   // nousu loppuu heti: purske jatkuu
            for (t = 0; t < 0.9; t += dt) p.Paivita(dt, 0);
            Oleta.Tosi(p.Palaa, "purske vähintään 1,2 s");
            for (t = 0; t < 1.0; t += dt) p.Paivita(dt, 0);
            Oleta.Tosi(!p.Palaa && p.Taso == 0, "hiipuu purskeen jälkeen");
            double min = 9, max = 0; var q = new Poltin();
            for (t = 0; t < 3; t += dt) { q.Paivita(dt, 3); if (t > 0.3) { min = Math.Min(min, q.Liekki); max = Math.Max(max, q.Liekki); } }
            Oleta.Tosi(min > 0.7 && max < 1.06 && max - min > 0.1, $"lepatus {min:F2}–{max:F2}");
        }
    }
}
