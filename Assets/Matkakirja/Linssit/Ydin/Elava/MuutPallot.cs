// ELÄVÄ KAUPUNKI: MUUT PALLOT (Linssiseppä 8.10.2026; suunnitelma B3): muutama kuumailmapallo kaupungin yllä 300–800 m:n korkeudella
// ajelehtii tuulen mukana (yhteinen suunta, omat nopeudet), nousee ja laskee hitaasti, ja poltin syttyy nousun alussa. Alueen
// (keskus, säde) reunan yli ajautunut pallo palaa tuulen yläpuolelle reunan taakse (kuvan ulkopuolelle). Deterministinen
// (siemen). Puhdas C#: ElavaKaupunkiTestit.
using System;

namespace Matkakirja.Linssit.Elava
{
    public sealed class MuutPallot
    {
        public readonly int Maara;
        public readonly double[] X, Y, Z, Kierto, Poltin;   // paikka (m; Y korkeus maasta), hidas kierto (°), polttimen voima 0–1
        public readonly int[] Paletti;
        readonly double[] nopeus, korkeus, vaihe;
        readonly double sade, tuuliX, tuuliZ;
        readonly Random rnd;
        double aika;
        public const double AlinM = 300, YlinM = 800;

        public MuutPallot(int maara, double sadeM, double tuuliSuuntaAst, double tuuliMs, int siemen)
        {
            Maara = Math.Max(0, maara); sade = Math.Max(100, sadeM); rnd = new Random(siemen);
            double a = tuuliSuuntaAst * Math.PI / 180;   // suunta, johon tuuli puhaltaa (0 = pohjoiseen)
            tuuliX = Math.Sin(a) * tuuliMs; tuuliZ = Math.Cos(a) * tuuliMs;
            X = new double[Maara]; Y = new double[Maara]; Z = new double[Maara]; Kierto = new double[Maara]; Poltin = new double[Maara];
            Paletti = new int[Maara]; nopeus = new double[Maara]; korkeus = new double[Maara]; vaihe = new double[Maara];
            for (int i = 0; i < Maara; i++)
            {
                double r = sade * Math.Sqrt(rnd.NextDouble()) * 0.9, k = rnd.NextDouble() * 2 * Math.PI;
                X[i] = Math.Sin(k) * r; Z[i] = Math.Cos(k) * r;
                nopeus[i] = 0.8 + 0.4 * rnd.NextDouble(); korkeus[i] = AlinM + (YlinM - AlinM - 100) * rnd.NextDouble();
                vaihe[i] = rnd.NextDouble() * 100; Kierto[i] = rnd.NextDouble() * 360; Paletti[i] = (siemen + i) % 6;
            }
            Paivita(0);
        }

        public void Paivita(double dt)
        {
            dt = Math.Max(0, Math.Min(0.25, dt)); aika += dt;
            for (int i = 0; i < Maara; i++)
            {
                X[i] += tuuliX * nopeus[i] * dt; Z[i] += tuuliZ * nopeus[i] * dt;
                if (X[i] * X[i] + Z[i] * Z[i] > sade * sade)
                {
                    // Takaisin tuulen yläpuolelle reunan sisäpuolelle, sivuttain satunnaisesti.
                    double tl = Math.Sqrt(tuuliX * tuuliX + tuuliZ * tuuliZ);
                    double ux = tl > 1e-6 ? tuuliX / tl : 0, uz = tl > 1e-6 ? tuuliZ / tl : 1, sivu = (rnd.NextDouble() * 2 - 1) * 0.6 * sade;
                    X[i] = -ux * sade * 0.85 + uz * sivu; Z[i] = -uz * sade * 0.85 - ux * sivu;
                }
                // Korkeus aaltoilee hitaasti (jakso ~3–4 min, ±60 m); poltin palaa, kun pallo nousee nopeimmin.
                double t = aika / 200.0 * 2 * Math.PI + vaihe[i];
                Y[i] = korkeus[i] + 60 * Math.Sin(t);
                double nousu = Math.Cos(t);
                Poltin[i] = nousu > 0.6 && Math.Sin(aika * 0.9 + vaihe[i] * 3) > 0.3 ? 1 : 0;
                Kierto[i] = (Kierto[i] + 0.8 * dt) % 360;
            }
        }
    }
}
