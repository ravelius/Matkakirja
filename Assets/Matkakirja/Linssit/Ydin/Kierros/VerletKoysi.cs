// PALLON KÖYSI VERLET-KETJUNA (Linssiseppä 8.10.2026; pallo Unreal-tasolle kohta 5): köysi korin reunasta kuvun suulle on ketju,
// jonka päät ovat kiinni ja välisolmut liikkuvat painovoiman ja korin kiihtyvyyden hitausvoiman mukaan (Verlet-integrointi,
// pituusrajoitteet, vaimennus). Sovitin (PalloKori) taivuttaa köysiverkkoa Poikkeama(t):n mukaan: köysi notkahtaa ja värähtelee
// kiihdytyksissä eikä enää käänny jäykkänä. Koordinaatit köyden omassa kehyksessä: y pitkin köyttä ylös, x ja z poikittain.
// Puhdas C#: Linssit-testit (VerletKoysiTestit).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class VerletKoysi
    {
        public const int Solmuja = 12, Alivaiheita = 4, Iteraatioita = 8;
        public const double Painovoima = 9.81, Vaimennus = 0.985, Loysyys = 0.998;   // kireä: kupu vetää köyttä ylös (löysä köysi nurjahtaa painovoimasta)
        readonly double pituus;
        readonly double[] x = new double[Solmuja + 1], y = new double[Solmuja + 1], z = new double[Solmuja + 1];
        readonly double[] px = new double[Solmuja + 1], py = new double[Solmuja + 1], pz = new double[Solmuja + 1];

        public VerletKoysi(double pituus)
        {
            this.pituus = Math.Max(0.01, pituus);
            for (int i = 0; i <= Solmuja; i++) { y[i] = py[i] = this.pituus * i / Solmuja; }
        }

        /// <summary>Askel: korin kiihtyvyys köyden kehyksessä (ax poikittain, az poikittain, m/s²); hitausvoima on vastakkainen.</summary>
        public void Paivita(double dt, double ax, double az)
        {
            dt = Math.Max(0, Math.Min(0.1, dt));
            double h = dt / Alivaiheita, seg = pituus * Loysyys / Solmuja;
            for (int s = 0; s < Alivaiheita; s++)
            {
                for (int i = 1; i < Solmuja; i++)
                {
                    double vx = (x[i] - px[i]) * Vaimennus, vy = (y[i] - py[i]) * Vaimennus, vz = (z[i] - pz[i]) * Vaimennus;
                    px[i] = x[i]; py[i] = y[i]; pz[i] = z[i];
                    x[i] += vx - ax * h * h; y[i] += vy - Painovoima * h * h; z[i] += vz - az * h * h;
                }
                for (int k = 0; k < Iteraatioita; k++)
                    for (int i = 0; i < Solmuja; i++)
                    {
                        double dx = x[i + 1] - x[i], dy = y[i + 1] - y[i], dz = z[i + 1] - z[i], d = Math.Sqrt(dx * dx + dy * dy + dz * dz);
                        if (d < 1e-9) continue;
                        double e = (d - seg) / d;
                        bool a = i == 0, b = i + 1 == Solmuja;   // päät kiinni
                        double wa = a ? 0 : b ? 1 : 0.5, wb = b ? 0 : a ? 1 : 0.5;
                        x[i] += dx * e * wa; y[i] += dy * e * wa; z[i] += dz * e * wa;
                        x[i + 1] -= dx * e * wb; y[i + 1] -= dy * e * wb; z[i + 1] -= dz * e * wb;
                    }
            }
        }

        /// <summary>Poikkeama suorasta köydestä kohdassa t (0 = korin reuna, 1 = kuvun suu): (x, z) poikittain samoissa yksiköissä kuin pituus.</summary>
        public (double x, double z) Poikkeama(double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double f = t * Solmuja; int i = Math.Min(Solmuja - 1, (int)f); double u = f - i;
            return (x[i] + (x[i + 1] - x[i]) * u, z[i] + (z[i + 1] - z[i]) * u);
        }

        public double SuurinPoikkeama { get { double m = 0; for (int i = 0; i <= Solmuja; i++) m = Math.Max(m, Math.Sqrt(x[i] * x[i] + z[i] * z[i])); return m; } }
    }
}
