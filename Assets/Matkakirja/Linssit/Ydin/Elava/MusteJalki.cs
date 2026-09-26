// ELÄVÄ KARTTA, kohta 2: löytämättömän noston musteen jälki (Linssiseppä 26.9.2026). Puhdas C#: sama muoto kuin videon
// Laikka.shaderissa (rikottu reuna kulman mukaan, muste pakkautuu reunaan, kolme roiskepisaraa), mutta valmiina
// peitto- ja tummumakarttoina, jotta Natiivi-UI:n UI Toolkit -merkki (NostotKartalla) voi näyttää sen kuvana.
// Löydön käyrä (Loyto) muuttaa jäljen täydeksi merkiksi 0,3 s:ssa.
using System;

namespace Matkakirja.Linssit.Elava
{
    public static class MusteJalki
    {
        /// <summary>Löydön animaation kesto (s).</summary>
        public const double LoytoKesto = 0.3;
        /// <summary>Löytämättömän jäljen peitto (videossa 0,5; pääkohde 0,62).</summary>
        public const double JaljenPeitto = 0.5;

        static double Hajautus(double x, double y)
        {
            double v = Math.Sin(x * 127.1 + y * 311.7) * 43758.5453;
            return v - Math.Floor(v);
        }

        static double Kohina(double x, double y)
        {
            double ix = Math.Floor(x), iy = Math.Floor(y), fx = x - ix, fy = y - iy;
            fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
            double a = Hajautus(ix, iy), b = Hajautus(ix + 1, iy), c = Hajautus(ix, iy + 1), d = Hajautus(ix + 1, iy + 1);
            return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
        }

        static double Smoothstep(double a, double b, double x)
        {
            double t = Math.Max(0, Math.Min(1, (x - a) / (b - a)));
            return t * t * (3 - 2 * t);
        }

        /// <summary>
        /// Jäljen kartat koko × koko (rivi 0 alhaalla): peitto 0–1 ja tummuma 0–1 (reunaan pakkautunut muste). Läikän säde on
        /// 1 / Laajuus kuvan puolikkaasta, jotta roiskepisarat mahtuvat. Siemen valitsee muodon (sama tunnus = sama jälki).
        /// </summary>
        public static (float[] Peitto, float[] Tummuma) Laske(int koko, int siemen)
        {
            const double Laajuus = 1.6;
            var peitto = new float[koko * koko];
            var tummuma = new float[koko * koko];
            double s = (siemen & 0xffff) / 65535.0 * 17.13;
            double aa = Laajuus * 2.0 / koko;
            for (int y = 0; y < koko; y++)
                for (int x = 0; x < koko; x++)
                {
                    double cx = ((x + 0.5) / koko * 2 - 1) * Laajuus, cy = ((y + 0.5) / koko * 2 - 1) * Laajuus;
                    double r = Math.Sqrt(cx * cx + cy * cy);
                    double ux = r > 1e-6 ? cx / r : 1, uy = r > 1e-6 ? cy / r : 0;
                    double rr = 1 + 0.30 * (Kohina(ux * 1.6 + s, uy * 1.6 + s) - 0.5) + 0.10 * (Kohina(ux * 5.0 + s * 1.7, uy * 5.0 + s * 1.7) - 0.5);
                    double runko = 1 - Smoothstep(rr - aa, rr + aa, r);
                    double reuna = Smoothstep(rr - 0.38, rr - 0.03, r) * runko;
                    double pisarat = 0;
                    for (int k = 0; k < 3; k++)
                    {
                        double kulma = (s + k * 2.1) * 2 * Math.PI;
                        double f = s * (k + 1) - Math.Floor(s * (k + 1));
                        double qx = Math.Cos(kulma) * (1.25 + 0.2 * f), qy = Math.Sin(kulma) * (1.25 + 0.2 * f);
                        double d = Math.Sqrt((cx - qx) * (cx - qx) + (cy - qy) * (cy - qy));
                        pisarat = Math.Max(pisarat, 1 - Smoothstep(0.07, 0.07 + aa, d));
                    }
                    int i = y * koko + x;
                    peitto[i] = (float)Math.Min(1, runko * (0.72 + 0.28 * reuna) + pisarat * 0.8);
                    tummuma[i] = (float)(0.3 * reuna);
                }
            return (peitto, tummuma);
        }

        /// <summary>Pääkohteen hehku (gaussinen, reunassa nolla) koko × koko.</summary>
        public static float[] Hehku(int koko)
        {
            var h = new float[koko * koko];
            for (int y = 0; y < koko; y++)
                for (int x = 0; x < koko; x++)
                {
                    double cx = (x + 0.5) / koko * 2 - 1, cy = (y + 0.5) / koko * 2 - 1, r2 = cx * cx + cy * cy;
                    h[y * koko + x] = (float)(Math.Exp(-r2 * 3.2) * Math.Max(0, Math.Min(1, (1 - r2) * 4)));
                }
            return h;
        }

        /// <summary>Löydön käyrä t = 0…LoytoKesto: mittakaava (pieni jousi yli 1:n) ja peitto jäljestä täyteen.</summary>
        public static (double Mittakaava, double Peitto) Loyto(double t)
        {
            double u = Math.Max(0, Math.Min(1, t / LoytoKesto));
            double c1 = 1.7, c3 = c1 + 1, v = u - 1;
            double mitta = 0.85 + 0.15 * (1 + c3 * v * v * v + c1 * v * v);
            return (mitta, JaljenPeitto + (1 - JaljenPeitto) * (1 - (1 - u) * (1 - u)));
        }
    }
}
