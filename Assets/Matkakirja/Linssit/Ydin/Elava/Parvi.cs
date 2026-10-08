// ELÄVÄ KAUPUNKI: LINTUPARVET (Linssiseppä 8.10.2026; suunnitelma B2): lokit kaartelevat vesien yllä, kyyhkyt toreilla ja parvet
// lennossa. Kevyt malli ilman naapurihakua: jokainen lintu kiertää parven keskusta omalla säteellään ja kulmanopeudellaan,
// korkeus aaltoilee, ja keskus vaeltaa hitaasti alueensa sisällä (rajattu ympyrä). Siiven vaihe varjostimelle (lyönti/liito).
// Deterministinen (siemen). Puhdas C#: Linssit-testit (ParviTestit).
using System;

namespace Matkakirja.Linssit.Elava
{
    public sealed class Parvi
    {
        public readonly int Maara;
        public readonly double[] X, Y, Z, Suuntima, Siipi;   // paikka (m), suunta (°) ja siiven vaihe 0–1
        readonly double[] sade, kulma, kulmaNopeus, korkeus, aalto;
        readonly double alueX, alueZ, alueSade;
        double keskusX, keskusZ, vaellusKulma, aika;
        readonly Random rnd;

        /// <summary>Parvi alueen (keskus, säde m) yllä korkeudella (m) pinnasta; säde = kiertoympyrän tyypillinen säde (m).</summary>
        public Parvi(int maara, double alueX, double alueZ, double alueSade, double korkeusM, double sadeM, int siemen)
        {
            Maara = Math.Max(1, maara); rnd = new Random(siemen);
            this.alueX = keskusX = alueX; this.alueZ = keskusZ = alueZ; this.alueSade = Math.Max(1, alueSade);
            X = new double[Maara]; Y = new double[Maara]; Z = new double[Maara]; Suuntima = new double[Maara]; Siipi = new double[Maara];
            sade = new double[Maara]; kulma = new double[Maara]; kulmaNopeus = new double[Maara]; korkeus = new double[Maara]; aalto = new double[Maara];
            for (int i = 0; i < Maara; i++)
            {
                sade[i] = sadeM * (0.6 + 0.8 * rnd.NextDouble()); kulma[i] = rnd.NextDouble() * 2 * Math.PI;
                double v = 9 + 4 * rnd.NextDouble();   // lentonopeus 9–13 m/s (lokki)
                kulmaNopeus[i] = (rnd.NextDouble() < 0.8 ? 1 : -1) * v / sade[i];
                korkeus[i] = korkeusM * (0.8 + 0.4 * rnd.NextDouble()); aalto[i] = rnd.NextDouble() * 6.28;
            }
            vaellusKulma = rnd.NextDouble() * 6.28;
            Paivita(0);
        }

        public void Paivita(double dt)
        {
            dt = Math.Max(0, Math.Min(0.25, dt)); aika += dt;
            // Keskus vaeltaa 1,5 m/s, kääntyy hitaasti ja pysyy alueen sisällä (palaa kohti keskustaa reunalla).
            vaellusKulma += (rnd.NextDouble() - 0.5) * 0.6 * dt;
            double dx = keskusX - alueX, dz = keskusZ - alueZ, r = Math.Sqrt(dx * dx + dz * dz);
            if (r > alueSade * 0.7) vaellusKulma = Math.Atan2(-dx, -dz);
            keskusX += Math.Sin(vaellusKulma) * 1.5 * dt; keskusZ += Math.Cos(vaellusKulma) * 1.5 * dt;
            for (int i = 0; i < Maara; i++)
            {
                kulma[i] += kulmaNopeus[i] * dt;
                double c = Math.Cos(kulma[i]), s = Math.Sin(kulma[i]);
                X[i] = keskusX + s * sade[i]; Z[i] = keskusZ + c * sade[i];
                Y[i] = korkeus[i] + 3 * Math.Sin(aika * 0.7 + aalto[i]);
                // Lentosuunta on ympyrän tangentti kiertosuuntaan.
                double tx = c * Math.Sign(kulmaNopeus[i]), tz = -s * Math.Sign(kulmaNopeus[i]);
                Suuntima[i] = Math.Atan2(tx, tz) * 180 / Math.PI;
                // Siipi: lyöntijaksot ja liito vuorotellen (lokki liitää paljon).
                double jakso = (aika * 0.25 + aalto[i] * 0.16) % 1.0;
                Siipi[i] = jakso < 0.35 ? (aika * 3.2 + aalto[i]) % 1.0 : 0.25;
            }
        }
    }
}
