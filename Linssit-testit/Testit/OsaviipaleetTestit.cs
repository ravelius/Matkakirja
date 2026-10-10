// OSAVIIPALEET REITILLÄ (Siirtoseppä 10.10.2026, PT 11.4x erä 2): pelaajan reitillä (reitti:pelaaja-*) ei saa olla alle 0,5 m:n
// kävelyosaa kahden muun välissä. Ohut viipale vaihtaa osaa kahdesti peräkkäin: tarkistuspisteet, anteeksianto (kiinniOsa) ja
// äänten seinäsääntö (Askelaani.Kuuluvuus) näkevät turhan osanvaihdon (v46z: palatsi y 8,4–8,6 kirkkotorni-portaiden ja
// kappeli-kavelyn välissä, kiinni 70 -testin selvitys).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OsaviipaleetTestit
    {
        const double Askel = 0.02, MinViipale = 0.5;
        // Odottavat viipaleet (väli, osa), jotka LR korjaa; tyhjä = ei yhtään. v47a poisti palatsi-viipaleen (rajat.min z −10,6).
        static readonly (int I, string Osa)[] OdottaaKorjausta = { };

        /// <summary>Reitin ohuet viipaleet: (väli i → i+1, osa, pituus m, alun paikka).</summary>
        public static List<(int I, string Osa, double Pituus, (double X, double Y, double Z) P)> Viipaleet()
        {
            var d = Huonesimulaatio.Data; var r = Huonesimulaatio.Reitti; var ulos = new List<(int, string, double, (double, double, double))>();
            for (int i = 0; i + 1 < r.Count; i++)
            {
                var a = r[i]; var b = r[i + 1];
                double dx = b.X - a.X, dy = b.Y - a.Y, dz = b.Z - a.Z, pit = Math.Sqrt(dx * dx + dy * dy + dz * dz);
                int n = Math.Max(1, (int)Math.Ceiling(pit / Askel));
                var osat = new List<(string Osa, int Alku, int Loppu)>();
                for (int s = 0; s <= n; s++)
                {
                    double t = (double)s / n; string o = Askelaani.Osa(d, a.X + dx * t, a.Y + dy * t, a.Z + dz * t);
                    if (osat.Count > 0 && osat[osat.Count - 1].Osa == o) osat[osat.Count - 1] = (o, osat[osat.Count - 1].Alku, s);
                    else osat.Add((o, s, s));
                }
                for (int j = 1; j + 1 < osat.Count; j++)
                {
                    double p = (osat[j].Loppu - osat[j].Alku + 1) * pit / n;
                    if (osat[j].Osa != null && osat[j - 1].Osa != null && osat[j + 1].Osa != null && p < MinViipale && osat[j - 1].Osa != osat[j].Osa)
                    {
                        double t = (double)osat[j].Alku / n;
                        ulos.Add((i, osat[j].Osa, p, (a.X + dx * t, a.Y + dy * t, a.Z + dz * t)));
                    }
                }
            }
            return ulos;
        }

        [Testi] static void EiOhuitaOsiaReitilla()
        {
            var odotetut = new HashSet<(int, string)>(OdottaaKorjausta);
            foreach (var v in Viipaleet())
            {
                bool odottaa = odotetut.Remove((v.I, v.Osa));
                Console.WriteLine($"      {v.I + 1} → {v.I + 2}: {v.Osa} {v.Pituus:F2} m ({v.P.X:F1}, {v.P.Y:F1}, {v.P.Z:F1}){(odottaa ? " odottaa LR:n korjausta" : "")}");
                Oleta.Tosi(odottaa, $"reitti {v.I + 1} → {v.I + 2}: {v.Osa}-viipale {v.Pituus:F2} m < {MinViipale} m ({v.P.X:F1}, {v.P.Y:F1}, {v.P.Z:F1})");
            }
            foreach (var (i, o) in odotetut) Oleta.Tosi(false, $"{o}-viipale {i + 1} → {i + 2} korjattu: poista OdottaaKorjausta-rivi");
        }
    }
}
