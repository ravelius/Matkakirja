using System;
using System.Collections.Generic;
using Unity.Mathematics;

namespace Matkakirja
{
    /// <summary>
    /// Reitin polku samalla kaavalla kuin verkkopelissä, jotta pallolle piirretty
    /// viiva osuu laattoihin poltettuun reittiin:
    ///
    ///   1. laudan (Miller) pisteet: kaupunki → via-pisteet tai kaksi pientä
    ///      tiivisteestä laskettua mutkaa (maareitit) → kaupunki
    ///      (js/rules.js edgePolyline, hashLuku01);
    ///   2. sauma avataan kiertävällä laudalla (avaaSauma);
    ///   3. tasoitus epätasavälisellä Catmull–Romilla, 14 pistettä väliä kohden (densify);
    ///   4. päät siirretään kaupunkien pallopisteisiin lineaarisella liu'ulla
    ///      (js/pallo.js pallonKorjattuPoly);
    ///   5. laudalta asteiksi (Miller-käänteis, docs/raportit/natiivi-laattaosoitteet).
    /// </summary>
    public static class ReittiGeometria
    {
        // Pelilaudan Miller-arkki (pyramidi.json projektio, Karttaseppä 23.9.2026).
        public const double Leveys = 12000.0;
        const double Lon0 = -175.0;
        const double Pohjoinen = 76.0;
        static readonly double S = Leveys / (2.0 * math.PI_DBL);
        static readonly double Y0 = MillerY(math.radians(Pohjoinen));

        static double MillerY(double phi) => -1.25 * math.log(math.tan(math.PI_DBL / 4.0 + 0.4 * phi));

        /// <summary>Asteet laudalle (x, y). x välillä [0, Leveys).</summary>
        public static double2 Laudalle(double lat, double lon)
        {
            double l = math.radians(lon - Lon0);
            l = ((l % (2 * math.PI_DBL)) + 2 * math.PI_DBL) % (2 * math.PI_DBL);
            return new double2(l * S, (MillerY(math.radians(lat)) - Y0) * S);
        }

        /// <summary>Laudalta asteiksi (lat, lon), lon välillä [-180, 180).</summary>
        public static double2 Asteiksi(double x, double y)
        {
            double lon = math.degrees(x / S) + Lon0;
            lon = ((lon + 180.0) % 360.0 + 360.0) % 360.0 - 180.0;
            double my = y / S + Y0;
            double phi = (math.atan(math.exp(-my / 1.25)) - math.PI_DBL / 4.0) / 0.4;
            return new double2(math.degrees(phi), lon);
        }

        /// <summary>js/rules.js hashLuku01 (FNV-1a, 32 bit) → [0, 1).</summary>
        public static double HashLuku01(string avain)
        {
            uint h = 2166136261;
            foreach (char c in avain)
            {
                h ^= c;
                h = unchecked(h * 16777619);
            }
            return (h % 100003u) / 100003.0;
        }

        /// <summary>Reitin laudan polku (edgePolyline + avaaSauma + densify).</summary>
        public static List<double2> LaudanPolku(string id, string tyyppi, double2 a, double2 b, List<double2> via)
        {
            var pisteet = new List<double2> { a };
            if (via != null && via.Count > 0)
            {
                pisteet.AddRange(via);
            }
            else if (tyyppi != "sea")
            {
                double2 d = b - a;
                double pituus = math.length(d);
                if (pituus == 0) pituus = 1;
                var n = new double2(-d.y / pituus, d.x / pituus);
                double mutka = math.min(pituus * 0.035, 7.0);
                double[] osuudet = { 0.33, 0.68 };
                for (int i = 0; i < 2; i++)
                {
                    double heilahdus = (HashLuku01(id + ":bend:" + i) - 0.5) * 2.0 * mutka;
                    pisteet.Add(a + d * osuudet[i] + n * heilahdus);
                }
            }
            pisteet.Add(b);
            return Tihenna(AvaaSauma(pisteet), 14);
        }

        static List<double2> AvaaSauma(List<double2> p)
        {
            if (p.Count < 2) return p;
            var ulos = new List<double2> { p[0] };
            double siirto = 0;
            for (int i = 1; i < p.Count; i++)
            {
                double x = p[i].x + siirto;
                double edellinen = ulos[i - 1].x;
                while (x - edellinen > Leveys / 2) { x -= Leveys; siirto -= Leveys; }
                while (edellinen - x > Leveys / 2) { x += Leveys; siirto += Leveys; }
                ulos.Add(new double2(x, p[i].y));
            }
            return ulos;
        }

        /// <summary>js/rules.js densify: epätasavälinen Catmull–Rom (alpha 0,5) Bézier-muodossa.</summary>
        static List<double2> Tihenna(List<double2> p, int valia)
        {
            if (p.Count < 3) return p;
            double2 P(int i) => p[math.clamp(i, 0, p.Count - 1)];
            var ulos = new List<double2> { p[0] };
            for (int i = 0; i < p.Count - 1; i++)
            {
                double2 p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
                double d1 = math.sqrt(math.length(p1 - p0));
                double d2 = math.sqrt(math.length(p2 - p1));
                double d3 = math.sqrt(math.length(p3 - p2));
                if (d2 == 0)
                {
                    for (int s = 1; s <= valia; s++) ulos.Add(p2);
                    continue;
                }
                double2 c1 = d1 > 0
                    ? (d1 * d1 * p2 - d2 * d2 * p0 + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1) / (3 * d1 * (d1 + d2))
                    : p1;
                double2 c2 = d3 > 0
                    ? (d3 * d3 * p1 - d2 * d2 * p3 + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2) / (3 * d3 * (d3 + d2))
                    : p2;
                for (int s = 1; s <= valia; s++)
                {
                    double t = (double)s / valia, u = 1 - t;
                    ulos.Add(u * u * u * p1 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * p2);
                }
            }
            return ulos;
        }

        /// <summary>
        /// Kaupungin laudan pisteen siirtymä sen pallopisteeseen (pallonOmatPisteet),
        /// kierrettynä lyhimpään suuntaan.
        /// </summary>
        public static double2 Siirtyma(double2 lauta, double lat, double lon)
        {
            double2 d = Laudalle(lat, lon) - lauta;
            while (d.x > Leveys / 2) d.x -= Leveys;
            while (d.x < -Leveys / 2) d.x += Leveys;
            return d;
        }

        /// <summary>pallonKorjattuPoly: päiden siirtymät liukuvat polun pituuden mukaan.</summary>
        public static List<double2> Korjaa(List<double2> p, double2 a, double2 b)
        {
            if (p.Count < 2) return p;
            double yhteensa = 0;
            var pituudet = new double[p.Count];
            for (int i = 1; i < p.Count; i++) { pituudet[i] = math.length(p[i] - p[i - 1]); yhteensa += pituudet[i]; }
            var ulos = new List<double2>(p.Count);
            double kertyma = 0;
            for (int i = 0; i < p.Count; i++)
            {
                kertyma += pituudet[i];
                double t = yhteensa > 0 ? kertyma / yhteensa : math.min(1, i);
                ulos.Add(p[i] + a * (1 - t) + b * t);
            }
            return ulos;
        }

        /// <summary>Isoympyrän piste osuudella t (lentokaaret).</summary>
        public static double2 Isoympyra(double lat1, double lon1, double lat2, double lon2, double t)
        {
            double3 A = Suunta(lat1, lon1), B = Suunta(lat2, lon2);
            double w = math.acos(math.clamp(math.dot(A, B), -1, 1));
            double3 P = w < 1e-9 ? A : (math.sin((1 - t) * w) * A + math.sin(t * w) * B) / math.sin(w);
            return new double2(math.degrees(math.asin(math.clamp(P.z, -1, 1))), math.degrees(math.atan2(P.y, P.x)));
        }

        public static double3 Suunta(double lat, double lon)
        {
            double f = math.radians(lat), l = math.radians(lon);
            return new double3(math.cos(f) * math.cos(l), math.cos(f) * math.sin(l), math.sin(f));
        }

        /// <summary>Isoympyräkulma asteina.</summary>
        public static double Kulma(double lat1, double lon1, double lat2, double lon2) =>
            math.degrees(math.acos(math.clamp(math.dot(Suunta(lat1, lon1), Suunta(lat2, lon2)), -1, 1)));
    }
}
