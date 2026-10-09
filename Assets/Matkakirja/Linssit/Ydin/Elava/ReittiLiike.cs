// ELÄVÄ KAUPUNKI: KULKIJAT REITEILLÄ (Linssiseppä 8.10.2026; omistaja 20.4x, suunnitelma docs/raportit/pallo-elava-kaupunki-20261008.md
// B1/B4/B5): lautat, jokiveneet, autot, raitiovaunut ja junat kulkevat OSM-reittien polylinjoja pitkin. Koordinaatit metreinä
// kaupungin paikallisessa tasossa (x itä, z pohjoinen). Edestakainen reitti (lautta laiturilta laiturille) kääntyy päissä tauon
// jälkeen, kiertävä reitti jatkuu alusta. Suunta pehmennetään katsomalla ennakkomatkan päähän (ei nykäystä mutkissa).
// Sijoittelu deterministinen (siemen), joten testit ja kuvaparit toistuvat. Puhdas C#: Linssit-testit (ReittiLiikeTestit).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class Reitti
    {
        public readonly double[] X, Z, Matka;   // pisteet ja kertymä (m)
        /// <summary>Pisteiden korkeus (m; veneillä oma vesipinta, ei Googlen laattoja), tai null.</summary>
        public readonly double[] Y;
        public readonly bool Kiertava;
        /// <summary>Yksisuuntainen katu (B4): kulkija palaa loppupäästä alkuun (kuvassa piilossa päissä), ei käänny.</summary>
        public bool Yksisuunta;
        public double Pituus => Matka[Matka.Length - 1];

        public Reitti(IReadOnlyList<(double x, double z)> pisteet, bool kiertava, IReadOnlyList<double> korkeudet = null)
        {
            if (pisteet == null || pisteet.Count < 2) throw new ArgumentException("reitissä vähintään kaksi pistettä");
            int n = pisteet.Count + (kiertava ? 1 : 0);
            X = new double[n]; Z = new double[n]; Matka = new double[n];
            for (int i = 0; i < n; i++) { var p = pisteet[i % pisteet.Count]; X[i] = p.x; Z[i] = p.z; if (i > 0) Matka[i] = Matka[i - 1] + Math.Sqrt((X[i] - X[i - 1]) * (X[i] - X[i - 1]) + (Z[i] - Z[i - 1]) * (Z[i] - Z[i - 1])); }
            Kiertava = kiertava;
            if (korkeudet != null && korkeudet.Count == pisteet.Count) { Y = new double[n]; for (int i = 0; i < n; i++) Y[i] = korkeudet[i % pisteet.Count]; }
        }

        /// <summary>Korkeus matkalla s (lineaarinen pisteiden välillä); 0 ilman korkeuksia.</summary>
        public double Korkeus(double s)
        {
            if (Y == null) return 0;
            var (lo, u) = Kohta(s);
            return lo + 1 < Y.Length ? Y[lo] + (Y[lo + 1] - Y[lo]) * u : Y[lo];
        }

        (int lo, double u) Kohta(double s)
        {
            double L = Pituus;
            s = Kiertava ? ((s % L) + L) % L : Math.Max(0, Math.Min(L, s));
            int lo = 0, hi = Matka.Length - 1;
            while (hi - lo > 1) { int m = (lo + hi) / 2; if (Matka[m] <= s) lo = m; else hi = m; }
            double seg = Matka[hi] - Matka[lo];
            return (lo, seg > 1e-9 ? (s - Matka[lo]) / seg : 0);
        }

        /// <summary>Paikka matkalla s (rajattu tai kiedottu).</summary>
        public (double x, double z) Paikka(double s)
        {
            var (lo, u) = Kohta(s);
            int hi = Math.Min(lo + 1, X.Length - 1);
            return (X[lo] + (X[hi] - X[lo]) * u, Z[lo] + (Z[hi] - Z[lo]) * u);
        }
    }

    public sealed class ReittiLiike
    {
        public sealed class Kulkija
        {
            public int Reitti; public double S, Nopeus, Tauko; public int Suunta = 1;
            public double X, Y, Z, Suuntima;   // paikka (m; Y reitin korkeudesta) ja suunta (°, 0 = pohjoinen, myötäpäivään)
        }

        public readonly List<Reitti> Reitit = new List<Reitti>();
        public readonly List<Kulkija> Kulkijat = new List<Kulkija>();
        /// <summary>Tauko edestakaisen reitin päässä (s) ja suunnan ennakkomatka (m).</summary>
        public double PaassaTaukoS = 8, EnnakkoM = 25;

        /// <summary>Lisää reitille kulkijat tasaisin välein (väli m, nopeus m/s), poikkeama siemenestä.</summary>
        public void Lisaa(Reitti r, double valiM, double nopeus, int siemen)
        {
            Reitit.Add(r); int ri = Reitit.Count - 1;
            var rnd = new Random(siemen);
            int n = Math.Max(1, (int)(r.Pituus / Math.Max(1, valiM)));
            for (int i = 0; i < n; i++)
            {
                var k = new Kulkija { Reitti = ri, S = (i + 0.3 * rnd.NextDouble()) * r.Pituus / n, Nopeus = nopeus * (0.85 + 0.3 * rnd.NextDouble()), Suunta = !r.Kiertava && !r.Yksisuunta && rnd.NextDouble() < 0.5 ? -1 : 1 };
                Paikanna(k); Kulkijat.Add(k);
            }
        }

        public void Paivita(double dt)
        {
            dt = Math.Max(0, Math.Min(0.25, dt));
            foreach (var k in Kulkijat)
            {
                var r = Reitit[k.Reitti];
                if (k.Tauko > 0) { k.Tauko -= dt; if (k.Tauko <= 0) k.Suunta = -k.Suunta; else continue; }
                k.S += k.Suunta * k.Nopeus * dt;
                if (r.Yksisuunta && k.S >= r.Pituus) { k.S = 0; k.Suunta = 1; }
                else if (!r.Kiertava && (k.S <= 0 || k.S >= r.Pituus)) { k.S = Math.Max(0, Math.Min(r.Pituus, k.S)); k.Tauko = PaassaTaukoS; }
                Paikanna(k);
            }
        }

        void Paikanna(Kulkija k)
        {
            var r = Reitit[k.Reitti];
            var p = r.Paikka(k.S); k.X = p.x; k.Z = p.z; k.Y = r.Korkeus(k.S);
            // Suunta ennakkopisteestä (taaksepäin ja eteenpäin puolikas ennakko): mutkat kääntyvät pehmeästi. Tauolla suunta pysyy.
            if (k.Tauko > 0) return;
            var a = r.Paikka(k.S - k.Suunta * EnnakkoM * 0.5); var b = r.Paikka(k.S + k.Suunta * EnnakkoM * 0.5);
            double dx = b.x - a.x, dz = b.z - a.z;
            if (dx * dx + dz * dz > 1e-6) k.Suuntima = Math.Atan2(dx, dz) * 180 / Math.PI;
        }
    }
}
