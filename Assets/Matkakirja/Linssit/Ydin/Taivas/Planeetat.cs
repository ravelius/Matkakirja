// PLANEETAT TÄHTITAIVAALLE (Linssiseppä 29.9.2026, erä 3): paljaalla silmällä näkyvät planeetat JPL:n likiarvoisilla
// Keplerin elementeillä (E. M. Standish, "Approximate Positions of the Planets", taulukko 1, voimassa 1800–2050; NASA/JPL,
// public domain; tarkkuus heliosentrisesti 15–600″, maasta katsottuna selvästi alle asteen). Tulos on geosentrinen suunta
// ekvaattorikoordinaatistossa (J2000, prekessio 2000→2026 noin 0,35° jätetään pois), sama kehys kuin BSC5-tähdillä.
// Testit Linssit-testit/Testit/TaivasTestit.cs.
using System;

namespace Matkakirja.Linssit.Taivas
{
    public sealed class Planeetta
    {
        public string Nimi;
        /// <summary>Tyypillinen magnitudi (koko ja kirkkaus ruudulla), väri RGB 0…1.</summary>
        public float Magnitudi;
        public (float r, float g, float b) Vari;
        internal double[] E; // a, e, I, L, ϖ, Ω ja niiden muutokset vuosisadassa
    }

    public static class Planeetat
    {
        const double Deg = Math.PI / 180, Eps = 23.43928 * Deg;

        // JPL taulukko 1: a [au], e, I [°], L [°], pitkä perihelli ϖ [°], nouseva solmu Ω [°]; sitten muutokset / vuosisata.
        static readonly double[] Maa = { 1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0,
            0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0 };

        public static readonly Planeetta[] Kaikki =
        {
            new Planeetta { Nimi = "Merkurius", Magnitudi = 0.0f, Vari = (0.85f, 0.82f, 0.75f), E = new[] {
                0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593,
                0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081 } },
            new Planeetta { Nimi = "Venus", Magnitudi = -4.2f, Vari = (1.0f, 0.97f, 0.88f), E = new[] {
                0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255,
                0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418 } },
            new Planeetta { Nimi = "Mars", Magnitudi = 0.8f, Vari = (1.0f, 0.62f, 0.42f), E = new[] {
                1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891,
                0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343 } },
            new Planeetta { Nimi = "Jupiter", Magnitudi = -2.4f, Vari = (1.0f, 0.94f, 0.82f), E = new[] {
                5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909,
                -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106 } },
            new Planeetta { Nimi = "Saturnus", Magnitudi = 0.6f, Vari = (1.0f, 0.9f, 0.7f), E = new[] {
                9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448,
                -0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794 } },
        };

        /// <summary>Heliosentrinen paikka J2000-ekliptikan kehyksessä (au) juliaanisena päivänä jd.</summary>
        static (double x, double y, double z) Helio(double[] e, double jd)
        {
            double t = (jd - 2451545.0) / 36525.0;
            double a = e[0] + e[6] * t, ek = e[1] + e[7] * t, i = (e[2] + e[8] * t) * Deg, l = e[3] + e[9] * t;
            double wp = e[4] + e[10] * t, om = e[5] + e[11] * t;
            double w = (wp - om) * Deg, o = om * Deg;
            double m = ((l - wp) % 360 + 540) % 360 - 180;
            double mr = m * Deg, ea = mr + ek * Math.Sin(mr);
            for (int k = 0; k < 8; k++) ea -= (ea - ek * Math.Sin(ea) - mr) / (1 - ek * Math.Cos(ea));
            double xp = a * (Math.Cos(ea) - ek), yp = a * Math.Sqrt(1 - ek * ek) * Math.Sin(ea);
            double cw = Math.Cos(w), sw = Math.Sin(w), co = Math.Cos(o), so = Math.Sin(o), ci = Math.Cos(i), si = Math.Sin(i);
            return ((cw * co - sw * so * ci) * xp + (-sw * co - cw * so * ci) * yp,
                (cw * so + sw * co * ci) * xp + (-sw * so + cw * co * ci) * yp,
                sw * si * xp + cw * si * yp);
        }

        /// <summary>Planeetan geosentrinen suunta (ECI-yksikkövektori, J2000-ekvaattori) ja etäisyys (au).</summary>
        public static ((double x, double y, double z) Suunta, double Au) Paikka(Planeetta p, double jd)
        {
            var h = Helio(p.E, jd);
            var m = Helio(Maa, jd);
            double x = h.x - m.x, y = h.y - m.y, z = h.z - m.z;
            // Ekliptikka → ekvaattori.
            double ye = Math.Cos(Eps) * y - Math.Sin(Eps) * z, ze = Math.Sin(Eps) * y + Math.Cos(Eps) * z;
            double r = Math.Sqrt(x * x + ye * ye + ze * ze);
            return ((x / r, ye / r, ze / r), r);
        }

        /// <summary>Rektaskensio ja deklinaatio asteina (testit ja tila).</summary>
        public static (double Ra, double Dec) RaDec((double x, double y, double z) s) =>
            ((Math.Atan2(s.y, s.x) / Deg + 360) % 360, Math.Asin(Math.Max(-1, Math.Min(1, s.z))) / Deg);
    }
}
