// ISS-KAMERA: WGS84 ↔ UTM, Sentinel-2-ruudut ovat UTM-vyöhykkeissä (MGRS-tunnuksen kaksi
// ensimmäistä numeroa). Krügerin sarja 6. kertalukuun (Karney 2011): virhe alle millimetrin vyöhykkeen sisällä, joten
// kuvan uudelleenprojisointi (GPU) voi luottaa laattojen kulmapisteisiin.
using System;

namespace Matkakirja.Linssit.IssKamera
{
    public static class Utm
    {
        const double A = 6378137.0, F = 1 / 298.257223563, K0 = 0.9996, ItaNolla = 500000;
        /// <summary>
        /// Eteläisen pallonpuoliskon väärä pohjoiskoordinaatti (EPSG 327xx): S2-ruudut leveysvyöhykkeillä C–M (koko maailman indeksi
        /// 4.10.2026; ilman tätä eteläiset ruudut jäivät tyhjiksi, simu: Uluru 0 Mt). Etelä merkitään negatiivisena vyöhykkeenä.
        /// </summary>
        public const double EtelaNolla = 10_000_000;
        static readonly double N = F / (2 - F), AA;
        static readonly double[] Al = new double[7], Be = new double[7];

        static Utm()
        {
            double n = N, n2 = n * n, n3 = n2 * n, n4 = n3 * n, n5 = n4 * n, n6 = n5 * n;
            AA = A / (1 + n) * (1 + n2 / 4 + n4 / 64 + n6 / 256);
            Al[1] = n / 2 - 2 * n2 / 3 + 5 * n3 / 16 + 41 * n4 / 180 - 127 * n5 / 288 + 7891 * n6 / 37800;
            Al[2] = 13 * n2 / 48 - 3 * n3 / 5 + 557 * n4 / 1440 + 281 * n5 / 630 - 1983433 * n6 / 1935360;
            Al[3] = 61 * n3 / 240 - 103 * n4 / 140 + 15061 * n5 / 26880 + 167603 * n6 / 181440;
            Al[4] = 49561 * n4 / 161280 - 179 * n5 / 168 + 6601661 * n6 / 7257600;
            Al[5] = 34729 * n5 / 80640 - 3418889 * n6 / 1995840;
            Al[6] = 212378941 * n6 / 319334400;
            Be[1] = n / 2 - 2 * n2 / 3 + 37 * n3 / 96 - n4 / 360 - 81 * n5 / 512 + 96199 * n6 / 604800;
            Be[2] = n2 / 48 + n3 / 15 - 437 * n4 / 1440 + 46 * n5 / 105 - 1118711 * n6 / 3870720;
            Be[3] = 17 * n3 / 480 - 37 * n4 / 840 - 209 * n5 / 4480 + 5569 * n6 / 90720;
            Be[4] = 4397 * n4 / 161280 - 11 * n5 / 504 - 830251 * n6 / 7257600;
            Be[5] = 4583 * n5 / 161280 - 108847 * n6 / 3991680;
            Be[6] = 20648693 * n6 / 638668800;
        }

        /// <summary>Vyöhykkeen keskimeridiaani (astetta).</summary>
        public static double Keskimeridiaani(int vyohyke) => Math.Abs(vyohyke) * 6 - 183;

        /// <summary>Leveys/pituus (astetta) → UTM itä, pohjoinen (m) annetussa vyöhykkeessä (myös naapurivyöhykkeen ulkopuolelle).</summary>
        public static (double ita, double pohjoinen) Eteen(double lat, double lon, int vyohyke)
        {
            double fi = lat * Math.PI / 180, la = (lon - Keskimeridiaani(vyohyke)) * Math.PI / 180;
            double e = Math.Sqrt(F * (2 - F));
            double t = Math.Sinh(Atanh(Math.Sin(fi)) - e * Atanh(e * Math.Sin(fi)));
            double xi = Math.Atan2(t, Math.Cos(la)), eta = Atanh(Math.Sin(la) / Math.Sqrt(1 + t * t));
            double x = xi, y = eta;
            for (int j = 1; j <= 6; j++) { x += Al[j] * Math.Sin(2 * j * xi) * Math.Cosh(2 * j * eta); y += Al[j] * Math.Cos(2 * j * xi) * Math.Sinh(2 * j * eta); }
            return (ItaNolla + K0 * AA * y, K0 * AA * x + (vyohyke < 0 ? EtelaNolla : 0));
        }

        /// <summary>UTM itä, pohjoinen (m) → leveys, pituus (astetta).</summary>
        public static (double lat, double lon) Taakse(double ita, double pohjoinen, int vyohyke)
        {
            if (vyohyke < 0) pohjoinen -= EtelaNolla;
            double xi = pohjoinen / (K0 * AA), eta = (ita - ItaNolla) / (K0 * AA), x = xi, y = eta;
            for (int j = 1; j <= 6; j++) { x -= Be[j] * Math.Sin(2 * j * xi) * Math.Cosh(2 * j * eta); y -= Be[j] * Math.Cos(2 * j * xi) * Math.Sinh(2 * j * eta); }
                        double la = Math.Atan2(Math.Sinh(y), Math.Cos(x));
            // tau' → tau (Newton, Karney 2011 yht. 19–21; 2–3 kierrosta riittää)
            double e = Math.Sqrt(F * (2 - F)), taup = Math.Sin(x) / Math.Sqrt(Math.Sinh(y) * Math.Sinh(y) + Math.Cos(x) * Math.Cos(x)), tau = taup;
            for (int i = 0; i < 4; i++)
            {
                double s = Math.Sqrt(1 + tau * tau), sig = Math.Sinh(e * Atanh(e * tau / s));
                double tp = tau * Math.Sqrt(1 + sig * sig) - sig * s;
                tau += (taup - tp) / Math.Sqrt(1 + tp * tp) * (1 + (1 - e * e) * tau * tau) / ((1 - e * e) * s);
            }
            return (Math.Atan(tau) * 180 / Math.PI, Keskimeridiaani(vyohyke) + la * 180 / Math.PI);
        }

        /// <summary>MGRS-ruudun (esim. "35VLG") UTM-vyöhyke; eteläinen (leveysvyöhyke C–M, esim. "52JER") negatiivisena.</summary>
        public static int Vyohyke(string mgrs)
        {
            int v = int.Parse(mgrs.Substring(0, 2));
            char b = mgrs.Length > 2 ? char.ToUpperInvariant(mgrs[2]) : 'N';
            return b >= 'C' && b <= 'M' ? -v : v;
        }

        static double Atanh(double x) => 0.5 * Math.Log((1 + x) / (1 - x));
    }
}
