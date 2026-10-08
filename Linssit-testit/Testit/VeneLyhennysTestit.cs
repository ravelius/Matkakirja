// VENESAAPUMINEN LYHYEMMÄKSI (Siirtoseppä 8.10.2026; omistaja: "soutukohtaus aivan liian pitkä"): reitin loppuosa enintään maxM metriä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VeneLyhennysTestit
    {
        [Testi] static void LoppuosaSailyy()
        {
            // Olavinlinnan vene:* (v45b, glTF x/z): alku → muuri → portti → laituri, noin 107 m.
            var r = new List<(double, double, double)> { (-131.85, -7, 110.1), (-80.12, -7, 49.06), (-66.04, -7, 31.49), (-63.09, -7, 28.1) };
            var l = Venesaapuminen.Lyhenna(r, 46);
            var v = new Venesaapuminen(l, 22);
            Oleta.Tosi(Math.Abs(v.Pituus - 46) < 0.01, $"pituus {v.Pituus:F2} m");
            Oleta.Tosi(l[l.Count - 1] == r[r.Count - 1] && l.Count == 4, "loppu (laituri) ja muuri–portti ennallaan, alku reitin varrella");
            Oleta.Tosi(Venesaapuminen.Lyhenna(r, 500).Count == 4 && Math.Abs(new Venesaapuminen(Venesaapuminen.Lyhenna(r, 500), 50).Pituus - new Venesaapuminen(r, 50).Pituus) < 1e-6, "pitkä raja: koko reitti");
            Oleta.Tosi(Venesaapuminen.Lyhenna(new List<(double, double, double)>(), 10).Count == 0, "tyhjä");
        }
    }
}
