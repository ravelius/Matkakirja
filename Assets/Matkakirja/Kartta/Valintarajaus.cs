// VALINTANÄKYMÄN RAJAUS KELLON ALLE (aloituslento v3f, Natiiviseppä 28.9.2026; v3f-laiteajo klo 14.30: oikean yläkulman
// pelikello peitti Moskovan renkaan ja nimen). Aloituskaupungin valinnan pallonäkymä (web aloitusvalinnanKorkeus: keskus
// 30° N 17° E, ankkurit Lontoo ja Ateena 78 %:iin ruudun puolikkaasta) siirtyy pohjoiseen juuri sen verran, että näkyvien
// valittavien kaupunkien nimet jäävät kellon varauksen (Natiivi-UI:n Pelikellonaytto.YlaVaraus) alle. Jos siirto veisi
// valittavan tai ankkurin alarajan alle (matala vaakaruutu), kamera loitontaa ja siirto lasketaan uudelleen. Ilman kelloa
// (varaus 0) näkymä on ennallaan. Puhdas C# ilman UnityEngineä (Kartta-testit).
//
// Malli: pallo (säde 1), kamera etäisyydellä D keskuksesta suoraan keskipisteen yllä, katse keskustaan ja pohjoinen ylös
// (PalloKierto, kallistus 0). Ruutukoordinaatit −1…1, y ylös: x = itä / ((D − u) · suhde · tan), y = pohjoinen / ((D − u) · tan),
// missä u on pisteen komponentti keskipisteen suuntaan ja tan = tan(pystysuora fov / 2). Piste näkyy, kun u > 1 / D.
// Keskipisteen siirto pohjoiseen laskee jokaisen näkyvän pisteen y:tä ja loitonnus pienentää |y|:tä (molemmat monotonisia),
// joten pienin riittävä siirto löytyy puolitushaulla.
using System;
using System.Collections.Generic;

namespace Matkakirja
{
    public static class Valintarajaus
    {
        /// <summary>Suurin keskipisteen siirto pohjoiseen (°).</summary>
        public const double MaxSiirto = 25.0;
        /// <summary>Loitonnusaskel (korkeus pinnasta × kerroin) ja askelten enimmäismäärä.</summary>
        public const double LoitonnusKerroin = 1.04;
        public const int MaxLoitonnukset = 40;

        /// <summary>
        /// Web aloitusvalinnanKorkeus (etäisyys säteinä keskuksesta): pallon säde pallonOsuus ruudun korkeudesta, ja
        /// ankkurikaupungit mahtuvat vara-osuuteen ruudun puolikkaasta kumpaankin suuntaan.
        /// </summary>
        public static double AnkkuriEtaisyys(double lat0, double lon0, double tan, double suhde, double pallonOsuus, double vara,
            IReadOnlyList<(double Lat, double Lon)> ankkurit)
        {
            double d = 1.0 / Math.Max(1e-6, Math.Sin(Math.Atan(2 * pallonOsuus * tan)));
            double a0 = Rad(lat0), b0 = Rad(lon0);
            if (ankkurit != null)
                foreach (var k in ankkurit)
                {
                    if (double.IsNaN(k.Lat)) continue;
                    double a = Rad(k.Lat), b = Rad(k.Lon);
                    double vx = Math.Cos(a) * Math.Cos(b), vy = Math.Cos(a) * Math.Sin(b), vz = Math.Sin(a);
                    double e = -Math.Sin(b0) * vx + Math.Cos(b0) * vy;
                    double n = -Math.Sin(a0) * Math.Cos(b0) * vx - Math.Sin(a0) * Math.Sin(b0) * vy + Math.Cos(a0) * vz;
                    double u = Math.Cos(a0) * Math.Cos(b0) * vx + Math.Cos(a0) * Math.Sin(b0) * vy + Math.Sin(a0) * vz;
                    d = Math.Max(d, Math.Max(u + Math.Abs(e) / Math.Max(1e-6, vara * suhde * tan),
                                             u + Math.Abs(n) / Math.Max(1e-6, vara * tan)));
                }
            return d;
        }

        /// <summary>Pisteen ruutupaikka (−1…1, y ylös); false = horisontin takana.</summary>
        public static bool Ruutu(double keskusLat, double keskusLon, double d, double tan, double suhde, double lat, double lon,
            out double x, out double y)
        {
            x = y = 0;
            double a0 = Rad(keskusLat), b0 = Rad(keskusLon), a = Rad(lat), b = Rad(lon);
            double vx = Math.Cos(a) * Math.Cos(b), vy = Math.Cos(a) * Math.Sin(b), vz = Math.Sin(a);
            double u = Math.Cos(a0) * Math.Cos(b0) * vx + Math.Cos(a0) * Math.Sin(b0) * vy + Math.Sin(a0) * vz;
            if (u * d <= 1.0) return false;
            double ita = -Math.Sin(b0) * vx + Math.Cos(b0) * vy;
            double pohjoinen = -Math.Sin(a0) * Math.Cos(b0) * vx - Math.Sin(a0) * Math.Sin(b0) * vy + Math.Cos(a0) * vz;
            x = ita / ((d - u) * suhde * tan);
            y = pohjoinen / ((d - u) * tan);
            return true;
        }

        /// <summary>
        /// Rajattu näkymä: keskipisteen leveys (pituus pysyy lon0:ssa) ja etäisyys D säteinä keskuksesta.
        /// ylaY = suurin sallittu valittavan pisteen y (1 − 2 · (kellon varaus + nimen yläreuna pisteestä) / ruudun korkeus);
        /// alaY = pienin sallittu y valittaville ja ankkureille. Valittavista huomioidaan ne, jotka lähtönäkymässä
        /// (lat0, lon0, d0) ovat horisontin edessä, vaakasuunnassa ruudulla (|x| ≤ 1) eivätkä alareunan alla (y ≥ −1).
        /// </summary>
        public static (double Lat, double D) Sovita(double lat0, double lon0, double d0, double tan, double suhde, double ylaY,
            double alaY, IReadOnlyList<(double Lat, double Lon)> valittavat, IReadOnlyList<(double Lat, double Lon)> ankkurit)
        {
            var mukana = new List<(double Lat, double Lon)>();
            if (valittavat != null)
                foreach (var p in valittavat)
                    if (Ruutu(lat0, lon0, d0, tan, suhde, p.Lat, p.Lon, out double x, out double y) && Math.Abs(x) <= 1.0 && y >= -1.0)
                        mukana.Add(p);
            if (mukana.Count == 0 || Yla(mukana, lat0, lon0, d0, tan, suhde, ylaY)) return (lat0, d0);

            var alaPisteet = new List<(double Lat, double Lon)>(mukana);
            if (ankkurit != null) alaPisteet.AddRange(ankkurit);
            double h0 = d0 - 1.0;
            for (int k = 0; k <= MaxLoitonnukset; k++)
            {
                double d = 1.0 + h0 * Math.Pow(LoitonnusKerroin, k);
                if (!Yla(mukana, lat0 + MaxSiirto, lon0, d, tan, suhde, ylaY)) continue;
                double lo = lat0, hi = lat0 + MaxSiirto;
                if (Yla(mukana, lo, lon0, d, tan, suhde, ylaY)) hi = lo;
                else
                    for (int i = 0; i < 40; i++)
                    {
                        double m = 0.5 * (lo + hi);
                        if (Yla(mukana, m, lon0, d, tan, suhde, ylaY)) hi = m; else lo = m;
                    }
                if (Ala(alaPisteet, hi, lon0, d, tan, suhde, alaY)) return (hi, d);
            }
            return (lat0, d0);
        }

        /// <summary>Mikään näkyvä piste ei ole ylärajan yllä (siirrossa horisontin taakse painuvat ovat alareunassa: Ala).</summary>
        static bool Yla(List<(double Lat, double Lon)> pisteet, double lat, double lon, double d, double tan, double suhde, double ylaY)
        {
            foreach (var p in pisteet)
                if (Ruutu(lat, lon, d, tan, suhde, p.Lat, p.Lon, out _, out double y) && y > ylaY) return false;
            return true;
        }

        /// <summary>Kaikki pisteet näkyvät ja ovat alarajan yllä.</summary>
        static bool Ala(List<(double Lat, double Lon)> pisteet, double lat, double lon, double d, double tan, double suhde, double alaY)
        {
            foreach (var p in pisteet)
                if (!Ruutu(lat, lon, d, tan, suhde, p.Lat, p.Lon, out _, out double y) || y < alaY) return false;
            return true;
        }

        static double Rad(double aste) => aste * Math.PI / 180.0;
    }
}
