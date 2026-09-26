// ISS-linssi: auringon suunta ja alihajapiste UTC-kellosta (Meeus, Astronomical Algorithms luku 25, matala tarkkuus
// noin 0,01°) terminaattoria varten, sekä ISS maan varjossa (sylinterivarjo). Puhdas C#, verkkoa ei tarvita.
using System;

namespace Matkakirja.Linssit.Iss
{
    public static class Aurinko
    {
        const double Deg = Math.PI / 180;

        /// <summary>Auringon suunta TEME/ECI-koordinaatistossa (yksikkövektori) juliaanisena päivänä (UTC).</summary>
        public static (double x, double y, double z) Suunta(double jd)
        {
            double t = (jd - 2451545.0) / 36525.0;
            double l0 = (280.46646 + 36000.76983 * t + 0.0003032 * t * t) % 360;
            double m = (357.52911 + 35999.05029 * t - 0.0001537 * t * t) * Deg;
            double c = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.Sin(m) + (0.019993 - 0.000101 * t) * Math.Sin(2 * m) + 0.000289 * Math.Sin(3 * m);
            double omega = (125.04 - 1934.136 * t) * Deg;
            double lambda = (l0 + c - 0.00569 - 0.00478 * Math.Sin(omega)) * Deg;
            double eps = (23.439291 - 0.0130042 * t + 0.00256 * Math.Cos(omega)) * Deg;
            return (Math.Cos(lambda), Math.Cos(eps) * Math.Sin(lambda), Math.Sin(eps) * Math.Sin(lambda));
        }

        /// <summary>Alihajapiste: missä aurinko on zeniitissä (leveys = deklinaatio, pituus GMST:stä), asteina.</summary>
        public static void Alihajapiste(double jd, out double lat, out double lon)
        {
            var s = Suunta(jd);
            lat = Math.Asin(s.z) / Deg;
            double ra = Math.Atan2(s.y, s.x);
            lon = ((ra - Aika.Gmst(jd)) / Deg + 540) % 360 - 180;
        }

        /// <summary>Onko piste r (km, ECI) maan varjossa (sylinterimalli: auringon vastapuolella ja maan säteen sisällä).</summary>
        public static bool Varjossa((double x, double y, double z) r, double jd, double maansadeKm = 6378.137)
        {
            var s = Suunta(jd);
            double d = r.x * s.x + r.y * s.y + r.z * s.z;
            if (d >= 0) return false;
            double px = r.x - d * s.x, py = r.y - d * s.y, pz = r.z - d * s.z;
            return px * px + py * py + pz * pz < maansadeKm * maansadeKm;
        }
    }
}
