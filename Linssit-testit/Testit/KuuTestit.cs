// ISS-realismi 4b: Kuun paikka (Meeus esimerkki 47.a) ja vaihe tunnetuilla täysi- ja uusikuilla, sekä ECI → ECEF.
using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class KuuTestit
    {
        const double Deg = Math.PI / 180;

        [Testi]
        static void MeeusinEsimerkkiLyhennetyllaSarjalla()
        {
            // Meeus 47.a: 1992-04-12 0h TD: RA 134,688470°, dec 13,768368°, etäisyys 368 409,7 km.
            var k = Kuu.Suunta(2448724.5);
            double ra = (Math.Atan2(k.y, k.x) / Deg + 360) % 360, dec = Math.Asin(k.z) / Deg;
            Oleta.Tosi(Math.Abs(ra - 134.688470) < 0.6, $"RA {ra:F3}");
            Oleta.Tosi(Math.Abs(dec - 13.768368) < 0.6, $"dec {dec:F3}");
            Oleta.Tosi(Math.Abs(k.km - 368409.7) < 3000, $"etäisyys {k.km:F0}");
        }

        [Testi]
        static void TaysikuuJaUusikuu()
        {
            // Täysikuu 2024-01-25 17.54 UTC ja uusikuu 2024-01-11 11.57 UTC.
            var taysi = Kuu.Vaihe(Aika.Jd(2024, 1, 25, 17.9));
            var uusi = Kuu.Vaihe(Aika.Jd(2024, 1, 11, 11.95));
            Oleta.Tosi(taysi.valaistu > 0.99, $"täysikuu {taysi.valaistu:F3} ({taysi.vaihekulma:F1}°)");
            Oleta.Tosi(uusi.valaistu < 0.01, $"uusikuu {uusi.valaistu:F3} ({uusi.vaihekulma:F1}°)");
        }

        [Testi]
        static void EciEcefKiertaaGmstnVerran()
        {
            double jd = 2460600.25;
            double g = Aika.Gmst(jd);
            // ECI-suunta, jonka rektaskensio on GMST, on ECEF:ssä Greenwichin meridiaanilla (pituus 0).
            var e = Kuu.Ecef((Math.Cos(g), Math.Sin(g), 0), jd);
            Oleta.Tosi(Math.Abs(e.x - 1) < 1e-9 && Math.Abs(e.y) < 1e-9, $"({e.x:F6}, {e.y:F6})");
        }
    }
}
