// KOHTEEN MUOTO (9.10.): L-muotoinen rakennus pihalla (reikä) rasteroituu oikein: sisällä täysi, pihalla ja ulkona tyhjä, reuna pehmeä.
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KohdeMuotoTestit
    {
        [Testi] static void LMuotoJaPiha()
        {
            var ulko = new List<(double, double)> { (0, 0), (60, 0), (60, 20), (20, 20), (20, 60), (0, 60) };
            var piha = new List<(double, double)> { (5, 5), (12, 5), (12, 12), (5, 12) };
            var m = KohdeMuoto.Rasteroi(new List<List<(double x, double z)>> { ulko, piha });
            Oleta.Tosi(m != null && m.SivuM > 60 + 2 * KohdeMuoto.MarginaaliM - 1e-6, "sivu kattaa muodon ja marginaalin");
            Oleta.Tosi(m.Arvo(40, 10) > 0.95 && m.Arvo(10, 40) > 0.95, "L:n molemmat siivet sisällä");
            Oleta.Tosi(m.Arvo(40, 40) < 0.05, "L:n sisäkulma ulkona");
            Oleta.Tosi(m.Arvo(8.5, 8.5) < 0.6, "piha (reikä) tyhjempi");
            Oleta.Tosi(m.Arvo(-20, 30) < 0.01, "kaukana ulkona tyhjä");
            double reuna = m.Arvo(60, 10);
            Oleta.Tosi(reuna > 0.2 && reuna < 0.8, $"reuna pehmeä {reuna:F2}");
            var enu = KohdeMuoto.Enu(new List<(double, double)> { (48.8566, 2.3522), (48.8576, 2.3522) }, 48.8566, 2.3522);
            Oleta.Tosi(System.Math.Abs(enu[1].z - 111.132) < 0.01 && System.Math.Abs(enu[1].x) < 1e-9, "ENU pohjoiseen");
        }
    }
}
