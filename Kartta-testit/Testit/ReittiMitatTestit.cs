// Build 13, pariteetti B4/B5/B23: reittikerroksen puhtaat mitat webin js/pallolauta/reitit.js:n mukaan (Kartta/ReittiMitat.cs).
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ReittiMitatTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-9) => Math.Abs(a - b) < tol;

        [Testi]
        static void PisteMatkallaKuinPointAlong()
        {
            // Kaksi osaa: 0 → (10, 0) → (10, 30), yhteensä 40.
            var polku = new List<(double X, double Y)> { (0, 0), (10, 0), (10, 30) };
            var a = ReittiMitat.PisteMatkalla(polku, 0.25);
            Oleta.Tosi(Lahella(a.X, 10) && Lahella(a.Y, 0), $"t 0,25 = taite, saatiin {a}");
            var b = ReittiMitat.PisteMatkalla(polku, 0.5);
            Oleta.Tosi(Lahella(b.X, 10) && Lahella(b.Y, 10), $"t 0,5, saatiin {b}");
            var c = ReittiMitat.PisteMatkalla(polku, 1.5);
            Oleta.Tosi(Lahella(c.X, 10) && Lahella(c.Y, 30), "t > 1 = loppupää");
            var d = ReittiMitat.PisteMatkalla(polku, -1);
            Oleta.Tosi(Lahella(d.X, 0) && Lahella(d.Y, 0), "t < 0 = alkupää");
            var e = ReittiMitat.PisteMatkalla(new List<(double X, double Y)> { (3, 4) }, 0.7);
            Oleta.Tosi(e.X == 3 && e.Y == 4, "yksi piste");
        }

        [Testi]
        static void PisteMatkallaNollaosa()
        {
            // Päällekkäiset pisteet (d2 = 0 Catmull–Romissa) eivät jaa nollalla.
            var polku = new List<(double X, double Y)> { (0, 0), (0, 0), (4, 0) };
            var p = ReittiMitat.PisteMatkalla(polku, 0.5);
            Oleta.Tosi(Lahella(p.X, 2) && Lahella(p.Y, 0), $"saatiin {p}");
        }

        [Testi]
        static void HelmetValipisteissa()
        {
            var h = ReittiMitat.HelmienOsuudet(4);
            Oleta.Sama(3, h.Count, "neljä askelta → kolme helmeä");
            Oleta.Tosi(Lahella(h[0], 0.25) && Lahella(h[1], 0.5) && Lahella(h[2], 0.75), "i / askelia");
            Oleta.Sama(0, ReittiMitat.HelmienOsuudet(1).Count, "yksi askel: ei helmiä");
            Oleta.Sama(0, ReittiMitat.HelmienOsuudet(0).Count, "0 → vähintään 1");
            Oleta.Sama(0, ReittiMitat.HelmienOsuudet(double.NaN).Count, "NaN → 1");
            Oleta.Sama(2, ReittiMitat.HelmienOsuudet(2.5).Count, "Math.round(2,5) = 3");
        }

        [Testi]
        static void HelmenMitatKuinWebissa()
        {
            Oleta.Tosi(Lahella(ReittiMitat.HelmenTaytePt, 10.6, 1e-5), "täyte 15 − 2 · 2,2");
            // Kohdemerkki-varjostin: reunus säteen molemmin puolin → ulkoreuna 7,5, täyte näkyvissä säteellä 5,3.
            Oleta.Tosi(Lahella(ReittiMitat.HelmenKeskiSadePt + ReittiMitat.HelmenReunaPt / 2, 7.5, 1e-5), "ulkosäde 7,5");
            Oleta.Tosi(Lahella(ReittiMitat.HelmenKeskiSadePt - ReittiMitat.HelmenReunaPt / 2, 5.3, 1e-5), "täytteen säde 5,3");
            Oleta.Tosi(Lahella(ReittiMitat.VarjonKorkeusSuhde, 0.9), "varjo 0,9 × viivan korkeus");
        }

        [Testi]
        static void LentokaariParaabelina()
        {
            Oleta.Tosi(Lahella(ReittiMitat.LentokaarenHuippu(180), 0.5), "180° → 0,5 sädettä");
            Oleta.Tosi(Lahella(ReittiMitat.LentokaarenHuippu(360), 0.5), "yläraja 1");
            Oleta.Tosi(Lahella(ReittiMitat.LentokaarenHuippu(36), 0.1), "36° → 0,1");
            Oleta.Tosi(Lahella(ReittiMitat.LentokaarenHuippu(1), 0.5 * 0.02), "alaraja 0,02");
            Oleta.Tosi(ReittiMitat.KaarenNousu(0) == 0 && ReittiMitat.KaarenNousu(1) == 0, "päät pinnassa");
            Oleta.Tosi(Lahella(ReittiMitat.KaarenNousu(0.5), 1), "huippu keskellä");
            Oleta.Tosi(Lahella(ReittiMitat.KaarenNousu(0.25), 0.75), "4 · 0,25 · 0,75");
        }
    }
}
