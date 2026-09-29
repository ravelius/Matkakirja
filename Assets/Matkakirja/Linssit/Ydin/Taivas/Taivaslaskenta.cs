// TÄHTITAIVAAN LASKENTA (Linssiseppä 29.9.2026; omistaja NATIIVI ENSIN, ehdotus docs/raportit/natiivi-ensin-linssit-20260929.md
// kohta 1): taivaankappaleet ECI-suunnasta paikalliseen horisonttiin (itä, ylös, pohjoinen), paikallinen tähtiaika, auringon
// korkeus ja taivaan sävy sen mukaan (päivä, porvarillinen, nauttinen ja tähtitieteellinen hämärä, yö). Puhdas C#; aurinko ja
// Kuu Iss.Aurinko / Iss.Kuu (Meeus), GMST Iss.Aika. Testit Linssit-testit/Testit/TaivasTestit.cs.
using System;

namespace Matkakirja.Linssit.Taivas
{
    /// <summary>Suunta paikallisessa horisontissa: itä, ylös, pohjoinen (Unityn x, y, z).</summary>
    public readonly struct Horisontti
    {
        public readonly double Ita, Ylos, Pohjoinen;
        public Horisontti(double ita, double ylos, double pohjoinen) { Ita = ita; Ylos = ylos; Pohjoinen = pohjoinen; }
        /// <summary>Korkeus horisontista asteina.</summary>
        public double Korkeus => Math.Asin(Math.Max(-1, Math.Min(1, Ylos))) * 180 / Math.PI;
        /// <summary>Atsimuutti pohjoisesta itään asteina (0…360).</summary>
        public double Atsimuutti => (Math.Atan2(Ita, Pohjoinen) * 180 / Math.PI + 360) % 360;
    }

    public static class Taivaslaskenta
    {
        const double Deg = Math.PI / 180;

        /// <summary>Paikallinen tähtiaika radiaaneina: GMST + itäinen pituus.</summary>
        public static double Lst(double jd, double lonAsteina) => Iss.Aika.Gmst(jd) + lonAsteina * Deg;

        /// <summary>
        /// ECI → horisontti -muunnoksen rivit (itä, ylös, pohjoinen) leveydellä lat ja tähtiajalla lst. Varjostin saa rivit
        /// vektoreina (matriisi-uniform ilman Properties-lohkoa jää SRP:ssä nollaksi, muistio natiivi-drawmesh-srp-matriisi).
        /// </summary>
        public static ((double x, double y, double z) Ita, (double x, double y, double z) Ylos, (double x, double y, double z) Pohjoinen)
            Rivit(double latAsteina, double lst)
        {
            double f = latAsteina * Deg, c = Math.Cos(lst), s = Math.Sin(lst), cf = Math.Cos(f), sf = Math.Sin(f);
            return ((-s, c, 0), (cf * c, cf * s, sf), (-sf * c, -sf * s, cf));
        }

        /// <summary>ECI-yksikkövektori horisonttiin.</summary>
        public static Horisontti Horisonttiin((double x, double y, double z) eci, double latAsteina, double lst)
        {
            var (e, u, n) = Rivit(latAsteina, lst);
            return new Horisontti(e.x * eci.x + e.y * eci.y + e.z * eci.z, u.x * eci.x + u.y * eci.y + u.z * eci.z,
                n.x * eci.x + n.y * eci.y + n.z * eci.z);
        }

        /// <summary>Rektaskensio ja deklinaatio (asteina) ECI-yksikkövektoriksi.</summary>
        public static (double x, double y, double z) Eci(double raAsteina, double decAsteina)
        {
            double a = raAsteina * Deg, d = decAsteina * Deg;
            return (Math.Cos(d) * Math.Cos(a), Math.Cos(d) * Math.Sin(a), Math.Sin(d));
        }

        public static Horisontti Aurinko(double jd, double lat, double lon) => Horisonttiin(Iss.Aurinko.Suunta(jd), lat, Lst(jd, lon));

        public static Horisontti Kuu(double jd, double lat, double lon)
        {
            var k = Iss.Kuu.Suunta(jd);
            return Horisonttiin((k.x, k.y, k.z), lat, Lst(jd, lon));
        }

        /// <summary>
        /// Tähtien näkyvyys auringon korkeudesta (asteina): päivällä 0, porvarillisen hämärän lopussa (−6°) kirkkaimmat alkavat
        /// näkyä, tähtitieteellisessä yössä (−18°) kaikki. Pehmeä käyrä, jotta illan eteneminen näkyy.
        /// </summary>
        public static double TahtienNakyvyys(double aurinkoKorkeus)
        {
            double t = Math.Max(0, Math.Min(1, (-aurinkoKorkeus - 1) / 15.0));
            return t * t * (3 - 2 * t);
        }

        /// <summary>Taivaan väri (RGB 0…1) zeniitissä ja horisontissa auringon korkeudesta: päivän sininen → hämärän oranssi → yö.</summary>
        public static ((double r, double g, double b) Zeniitti, (double r, double g, double b) Horisontti) Savy(double aurinkoKorkeus)
        {
            // Avainkohdat: päivä (+10°), auringonlasku (0°), porvarillinen (−6°), nauttinen (−12°) ja yö (−18°).
            double[] k = { 10, 0, -6, -12, -18 };
            var z = new[] { (0.16, 0.38, 0.78), (0.20, 0.33, 0.62), (0.08, 0.12, 0.30), (0.03, 0.05, 0.13), (0.006, 0.010, 0.030) };
            var h = new[] { (0.62, 0.78, 0.95), (0.98, 0.62, 0.34), (0.55, 0.30, 0.28), (0.12, 0.10, 0.18), (0.012, 0.016, 0.040) };
            if (aurinkoKorkeus >= k[0]) return (z[0], h[0]);
            if (aurinkoKorkeus <= k[4]) return (z[4], h[4]);
            int i = 0;
            while (aurinkoKorkeus < k[i + 1]) i++;
            double t = (k[i] - aurinkoKorkeus) / (k[i] - k[i + 1]);
            return (Lerp(z[i], z[i + 1], t), Lerp(h[i], h[i + 1], t));
        }

        static (double, double, double) Lerp((double, double, double) a, (double, double, double) b, double t) =>
            (a.Item1 + (b.Item1 - a.Item1) * t, a.Item2 + (b.Item2 - a.Item2) * t, a.Item3 + (b.Item3 - a.Item3) * t);
    }
}
