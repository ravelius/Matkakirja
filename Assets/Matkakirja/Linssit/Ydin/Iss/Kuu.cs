// ISS-REALISMI 4b (omistajan kortti 28.9.2026): Kuu oikeassa paikassa ja vaiheessa. Kuun suunta ja etäisyys UTC-kellosta
// Meeusin (Astronomical Algorithms, luku 47) lyhennetyllä sarjalla: pituuden kuusi ja leveyden neljä suurinta termiä sekä
// etäisyyden neljä, tarkkuus noin 0,3° (Kuun näennäinen halkaisija on 0,52°, joten paikka on oikea puolen kiekon sisällä).
// Tulos ekliptikaalisista koordinaateista ekvatoriaalisiin (ECI, J2000-tasauspiste riittää) ja maahan GMST-kierrolla kuten
// Aurinko. Vaihe auringon ja Kuun välisestä kulmasta (valaistu osuus (1 + cos i) / 2). Puhdas C#, verkkoa ei tarvita.
using System;

namespace Matkakirja.Linssit.Iss
{
    public static class Kuu
    {
        const double Deg = Math.PI / 180;

        /// <summary>Kuun suunta ECI-koordinaatistossa (yksikkövektori) ja etäisyys (km) juliaanisena päivänä (UTC).</summary>
        public static (double x, double y, double z, double km) Suunta(double jd)
        {
            double t = (jd - 2451545.0) / 36525.0;
            double lp = 218.3164477 + 481267.88123421 * t;          // keskipituus
            double d = (297.8501921 + 445267.1114034 * t) * Deg;    // elongaatio
            double m = (357.5291092 + 35999.0502909 * t) * Deg;     // Auringon keskianomalia
            double mp = (134.9633964 + 477198.8675055 * t) * Deg;   // Kuun keskianomalia
            double f = (93.2720950 + 483202.0175233 * t) * Deg;     // leveysargumentti
            double pituus = lp
                + 6.288774 * Math.Sin(mp) + 1.274027 * Math.Sin(2 * d - mp) + 0.658314 * Math.Sin(2 * d)
                + 0.213618 * Math.Sin(2 * mp) - 0.185116 * Math.Sin(m) - 0.114332 * Math.Sin(2 * f);
            double leveys = 5.128122 * Math.Sin(f) + 0.280602 * Math.Sin(mp + f) + 0.277693 * Math.Sin(mp - f)
                + 0.173237 * Math.Sin(2 * d - f);
            double km = 385000.56 - 20905.355 * Math.Cos(mp) - 3699.111 * Math.Cos(2 * d - mp) - 2955.968 * Math.Cos(2 * d)
                - 569.925 * Math.Cos(2 * mp);
            double eps = (23.439291 - 0.0130042 * t) * Deg;
            double l = pituus * Deg, b = leveys * Deg;
            double xe = Math.Cos(b) * Math.Cos(l), ye = Math.Cos(b) * Math.Sin(l), ze = Math.Sin(b);
            // Ekliptikaalinen → ekvatoriaalinen (kierto x-akselin ympäri ekliptikan kaltevuudella).
            return (xe, ye * Math.Cos(eps) - ze * Math.Sin(eps), ye * Math.Sin(eps) + ze * Math.Cos(eps), km);
        }

        /// <summary>ECI-yksikkövektori maahan kiinnitettyyn (ECEF) GMST-kierrolla.</summary>
        public static (double x, double y, double z) Ecef((double x, double y, double z) eci, double jd)
        {
            double g = Aika.Gmst(jd), c = Math.Cos(g), s = Math.Sin(g);
            return (c * eci.x + s * eci.y, -s * eci.x + c * eci.y, eci.z);
        }

        /// <summary>Kuun vaihekulma i (0 = täysikuu, 180° = uusikuu) ja valaistu osuus (1 + cos i) / 2.</summary>
        public static (double vaihekulma, double valaistu) Vaihe(double jd)
        {
            var k = Suunta(jd);
            var a = Aurinko.Suunta(jd);
            // Elongaatio ψ Maasta katsottuna; vaihekulma i ≈ 180° − ψ (Kuu on lähellä verrattuna Aurinkoon).
            double psi = Math.Acos(Math.Max(-1, Math.Min(1, k.x * a.x + k.y * a.y + k.z * a.z)));
            double i = Math.PI - psi;
            return (i / Deg, (1 + Math.Cos(i)) / 2);
        }
    }
}
