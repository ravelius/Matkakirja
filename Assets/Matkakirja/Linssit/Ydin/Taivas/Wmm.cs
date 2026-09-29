// WORLD MAGNETIC MODEL 2025 (NOAA NCEI ja BGS, public domain; kertoimet WMM2025.COF 13.11.2024, voimassa 2025–2030):
// magneettinen deklinaatio (kompassin poikkeama todellisesta pohjoisesta) paikassa ja hetkessä. Tähtitaivaan gyro
// (TaivasNayttamo, Linssiseppä 29.9.2026) saa asennon magneettisen pohjoisen kehyksessä (CoreMotion, ei sijaintilupaa), ja
// tämä kääntää sen todelliseen pohjoiseen kartalla katsotun paikan mukaan. Pallofunktiokehitelmä asteeseen 12 Schmidtin
// puolinormeeratuilla Legendren funktioilla, geodeettinen → geosentrinen leveys (WGS84), kuten WMM:n raportissa.
// Testit Linssit-testit/Testit/WmmTestit.cs (NOAA:n WMM2025_TestValues).
using System;

namespace Matkakirja.Linssit.Taivas
{
    public static class Wmm
    {
        public const double Epookki = 2025.0;
        const int N = 12;
        const double A = 6371.2, WgsA = 6378.137, WgsF = 1 / 298.257223563;

        // n, m, g, h, g', h' (nT, nT/vuosi).
        static readonly double[] Kertoimet =
        {
            1, 0, -29351.8, 0.0, 12.0, 0.0,
            1, 1, -1410.8, 4545.4, 9.7, -21.5,
            2, 0, -2556.6, 0.0, -11.6, 0.0,
            2, 1, 2951.1, -3133.6, -5.2, -27.7,
            2, 2, 1649.3, -815.1, -8.0, -12.1,
            3, 0, 1361.0, 0.0, -1.3, 0.0,
            3, 1, -2404.1, -56.6, -4.2, 4.0,
            3, 2, 1243.8, 237.5, 0.4, -0.3,
            3, 3, 453.6, -549.5, -15.6, -4.1,
            4, 0, 895.0, 0.0, -1.6, 0.0,
            4, 1, 799.5, 278.6, -2.4, -1.1,
            4, 2, 55.7, -133.9, -6.0, 4.1,
            4, 3, -281.1, 212.0, 5.6, 1.6,
            4, 4, 12.1, -375.6, -7.0, -4.4,
            5, 0, -233.2, 0.0, 0.6, 0.0,
            5, 1, 368.9, 45.4, 1.4, -0.5,
            5, 2, 187.2, 220.2, 0.0, 2.2,
            5, 3, -138.7, -122.9, 0.6, 0.4,
            5, 4, -142.0, 43.0, 2.2, 1.7,
            5, 5, 20.9, 106.1, 0.9, 1.9,
            6, 0, 64.4, 0.0, -0.2, 0.0,
            6, 1, 63.8, -18.4, -0.4, 0.3,
            6, 2, 76.9, 16.8, 0.9, -1.6,
            6, 3, -115.7, 48.8, 1.2, -0.4,
            6, 4, -40.9, -59.8, -0.9, 0.9,
            6, 5, 14.9, 10.9, 0.3, 0.7,
            6, 6, -60.7, 72.7, 0.9, 0.9,
            7, 0, 79.5, 0.0, -0.0, 0.0,
            7, 1, -77.0, -48.9, -0.1, 0.6,
            7, 2, -8.8, -14.4, -0.1, 0.5,
            7, 3, 59.3, -1.0, 0.5, -0.8,
            7, 4, 15.8, 23.4, -0.1, 0.0,
            7, 5, 2.5, -7.4, -0.8, -1.0,
            7, 6, -11.1, -25.1, -0.8, 0.6,
            7, 7, 14.2, -2.3, 0.8, -0.2,
            8, 0, 23.2, 0.0, -0.1, 0.0,
            8, 1, 10.8, 7.1, 0.2, -0.2,
            8, 2, -17.5, -12.6, 0.0, 0.5,
            8, 3, 2.0, 11.4, 0.5, -0.4,
            8, 4, -21.7, -9.7, -0.1, 0.4,
            8, 5, 16.9, 12.7, 0.3, -0.5,
            8, 6, 15.0, 0.7, 0.2, -0.6,
            8, 7, -16.8, -5.2, -0.0, 0.3,
            8, 8, 0.9, 3.9, 0.2, 0.2,
            9, 0, 4.6, 0.0, -0.0, 0.0,
            9, 1, 7.8, -24.8, -0.1, -0.3,
            9, 2, 3.0, 12.2, 0.1, 0.3,
            9, 3, -0.2, 8.3, 0.3, -0.3,
            9, 4, -2.5, -3.3, -0.3, 0.3,
            9, 5, -13.1, -5.2, 0.0, 0.2,
            9, 6, 2.4, 7.2, 0.3, -0.1,
            9, 7, 8.6, -0.6, -0.1, -0.2,
            9, 8, -8.7, 0.8, 0.1, 0.4,
            9, 9, -12.9, 10.0, -0.1, 0.1,
            10, 0, -1.3, 0.0, 0.1, 0.0,
            10, 1, -6.4, 3.3, 0.0, 0.0,
            10, 2, 0.2, 0.0, 0.1, -0.0,
            10, 3, 2.0, 2.4, 0.1, -0.2,
            10, 4, -1.0, 5.3, -0.0, 0.1,
            10, 5, -0.6, -9.1, -0.3, -0.1,
            10, 6, -0.9, 0.4, 0.0, 0.1,
            10, 7, 1.5, -4.2, -0.1, 0.0,
            10, 8, 0.9, -3.8, -0.1, -0.1,
            10, 9, -2.7, 0.9, -0.0, 0.2,
            10, 10, -3.9, -9.1, -0.0, -0.0,
            11, 0, 2.9, 0.0, 0.0, 0.0,
            11, 1, -1.5, 0.0, -0.0, -0.0,
            11, 2, -2.5, 2.9, 0.0, 0.1,
            11, 3, 2.4, -0.6, 0.0, -0.0,
            11, 4, -0.6, 0.2, 0.0, 0.1,
            11, 5, -0.1, 0.5, -0.1, -0.0,
            11, 6, -0.6, -0.3, 0.0, -0.0,
            11, 7, -0.1, -1.2, -0.0, 0.1,
            11, 8, 1.1, -1.7, -0.1, -0.0,
            11, 9, -1.0, -2.9, -0.1, 0.0,
            11, 10, -0.2, -1.8, -0.1, 0.0,
            11, 11, 2.6, -2.3, -0.1, 0.0,
            12, 0, -2.0, 0.0, 0.0, 0.0,
            12, 1, -0.2, -1.3, 0.0, -0.0,
            12, 2, 0.3, 0.7, -0.0, 0.0,
            12, 3, 1.2, 1.0, -0.0, -0.1,
            12, 4, -1.3, -1.4, -0.0, 0.1,
            12, 5, 0.6, -0.0, -0.0, -0.0,
            12, 6, 0.6, 0.6, 0.1, -0.0,
            12, 7, 0.5, -0.1, -0.0, -0.0,
            12, 8, -0.1, 0.8, 0.0, 0.0,
            12, 9, -0.4, 0.1, 0.0, -0.0,
            12, 10, -0.2, -1.0, -0.1, -0.0,
            12, 11, -1.3, 0.1, -0.0, 0.0,
            12, 12, -0.7, 0.2, -0.1, -0.1
        };

        static readonly double[,] G = new double[N + 1, N + 1], H = new double[N + 1, N + 1], Gd = new double[N + 1, N + 1], Hd = new double[N + 1, N + 1];
        static readonly double[,] Schmidt = new double[N + 1, N + 1];

        static Wmm()
        {
            for (int i = 0; i + 5 < Kertoimet.Length; i += 6)
            {
                int n = (int)Kertoimet[i], m = (int)Kertoimet[i + 1];
                G[n, m] = Kertoimet[i + 2]; H[n, m] = Kertoimet[i + 3]; Gd[n, m] = Kertoimet[i + 4]; Hd[n, m] = Kertoimet[i + 5];
            }
            for (int n = 0; n <= N; n++)
                for (int m = 0; m <= n; m++)
                {
                    double s = 1;
                    for (int k = n - m + 1; k <= n + m; k++) s /= k;   // (n − m)! / (n + m)!
                    Schmidt[n, m] = Math.Sqrt((m == 0 ? 1 : 2) * s);
                }
        }

        /// <summary>Desimaalivuosi UTC-hetkestä (WMM:n aika).</summary>
        public static double Vuosi(DateTime utc)
        {
            var alku = new DateTime(utc.Year, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return utc.Year + (utc - alku).TotalDays / (DateTime.IsLeapYear(utc.Year) ? 366.0 : 365.0);
        }

        /// <summary>Deklinaatio asteina (itäinen positiivinen) geodeettisessa pisteessä (lat, lon asteina, korkeus km) vuonna vuosi.</summary>
        public static double Deklinaatio(double lat, double lon, double vuosi, double korkeusKm = 0)
        {
            double dt = vuosi - Epookki;
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            double e2 = WgsF * (2 - WgsF), sf = Math.Sin(f), cf = Math.Cos(f);
            double rc = WgsA / Math.Sqrt(1 - e2 * sf * sf);
            double p = (rc + korkeusKm) * cf, z = (rc * (1 - e2) + korkeusKm) * sf;
            double r = Math.Sqrt(p * p + z * z);
            double fc = Math.Asin(z / r);                               // geosentrinen leveys
            double ct = Math.Sin(fc), st = Math.Max(1e-10, Math.Cos(fc)); // colatitude θ: cos θ = sin φ', sin θ = cos φ'
            var P = new double[N + 1, N + 1];
            var dP = new double[N + 1, N + 1];
            // Normeeraamattomat Legendren funktiot (ilman Condon–Shortleyn etumerkkiä) ja derivaatat θ:n suhteen.
            for (int m = 0; m <= N; m++)
            {
                double pmm = 1;
                for (int k = 1; k <= m; k++) pmm *= (2 * k - 1) * st;
                P[m, m] = pmm;
                if (m + 1 <= N) P[m + 1, m] = ct * (2 * m + 1) * pmm;
                for (int n = m + 2; n <= N; n++) P[n, m] = ((2 * n - 1) * ct * P[n - 1, m] - (n + m - 1) * P[n - 2, m]) / (n - m);
            }
            for (int n = 0; n <= N; n++)
                for (int m = 0; m <= n; m++)
                    dP[n, m] = (n * ct * P[n, m] - (n + m) * (n > m ? P[n - 1, m] : 0)) / st;
            double x = 0, y = 0, zz = 0;
            for (int n = 1; n <= N; n++)
            {
                double ar = Math.Pow(A / r, n + 2);
                for (int m = 0; m <= n; m++)
                {
                    double g = G[n, m] + dt * Gd[n, m], h = H[n, m] + dt * Hd[n, m];
                    double cm = Math.Cos(m * l), sm = Math.Sin(m * l);
                    double pn = Schmidt[n, m] * P[n, m], dpn = Schmidt[n, m] * dP[n, m];
                    x += ar * (g * cm + h * sm) * dpn;
                    y += ar * m * (g * sm - h * cm) * pn;
                    zz -= ar * (n + 1) * (g * cm + h * sm) * pn;
                }
            }
            y /= st;
            // Geosentrinen → geodeettinen kehys.
            double d = fc - f;
            double xg = x * Math.Cos(d) - zz * Math.Sin(d);
            return Math.Atan2(y, xg) * 180 / Math.PI;
        }
    }
}
