// HISTORIAMOOTTORI V2: VENESAAPUMINEN (Siirtoseppä 7.10.2026; arkkitehtuuri docs/raportit/siirtoseppa-historiamoottori-20261007.md
// kohdat 7 ja 11). Puhdas ydin: veneen paikka, kulkusuunta ja soutukello ajan funktiona. Unity-sovitin (SeikkailuVene) asettaa
// veneen solmut, soittaa veneen "soutu"- ja soutajan "ele_soutu"-leikkeet SAMASTA kellosta (Linnanrakentajan soutu.json: 2,0 s,
// t 0 = saalis eli lavat menevät veteen, sama asento 0 ja 2,0 s) ja luovuttaa kameran pelaajalle laiturilla.
// - Reitti: Catmull-Rom pisteiden kautta (glTF: x itä, y ylös, z etelä), kaarenpituudella parametrisoitu.
// - Nopeus: soutuveto työntää (vedon 0–0,9 s aikana kiihtyy, palautuksessa liukuu), alussa pehmeä lähtö ja lopussa liuku laituriin
//   ilman vetoja; matka skaalataan niin, että vene on tasan kestoS:n kohdalla perillä.
// - Soutukello pysähtyy viimeisen kokonaisen vedon loppuun ennen liukua (asento 0 = lavat vedessä, lepo).
// - Suunta: reitin tangentti, viimeiset metrit kääntyy laiturin kiinnityssuuntaan (LoppuSuunta, radiaaneina glTF:n y-akselin ympäri
//   kuten kavely-merkkien kierto_y; null = tangentti).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public readonly struct VeneTila
    {
        public readonly double X, Y, Z, SuuntaX, SuuntaZ, Nopeus, SoutuAika;
        public readonly bool Perilla;
        public VeneTila(double x, double y, double z, double sx, double sz, double v, double soutu, bool perilla)
        { X = x; Y = y; Z = z; SuuntaX = sx; SuuntaZ = sz; Nopeus = v; SoutuAika = soutu; Perilla = perilla; }
    }

    public sealed class Venesaapuminen
    {
        public const double SoutuS = 2.0, VetoS = 0.9, LiukuS = 5.0, LahtoS = 2.0, Aalto = 0.45, KaantoM = 6.0;
        const double Askel = 1 / 120.0;

        readonly List<(double X, double Y, double Z)> pisteet;
        readonly double[] matkat;      // näytteiden kumulatiivinen matka
        readonly (double X, double Y, double Z)[] naytteet;
        readonly double[] sAjassa;     // kuljettu matka ajan funktiona (Askel välein)
        readonly double? loppuSuunta;
        public double KestoS { get; }
        public double Pituus { get; }
        /// <summary>Viimeisen vedon loppu (soutukello pysähtyy tähän, sitten liuku).</summary>
        public double SoutuLoppuS { get; }

        public Venesaapuminen(IReadOnlyList<(double X, double Y, double Z)> reitti, double kestoS = 50, double? loppuSuunta = null)
        {
            if (reitti == null || reitti.Count < 2) throw new ArgumentException("reitissä vähintään 2 pistettä");
            pisteet = new List<(double X, double Y, double Z)>(reitti);
            KestoS = Math.Max(LahtoS + LiukuS + SoutuS, kestoS);
            this.loppuSuunta = loppuSuunta;
            // Kaarenpituus: 64 näytettä per väli.
            const int N = 64;
            int n = (pisteet.Count - 1) * N + 1;
            naytteet = new (double X, double Y, double Z)[n]; matkat = new double[n];
            for (int i = 0; i < n; i++)
            {
                int v = Math.Min(i / N, pisteet.Count - 2); double u = (i - v * N) / (double)N;
                naytteet[i] = CatmullRom(v, u);
                if (i > 0) matkat[i] = matkat[i - 1] + Etaisyys(naytteet[i - 1], naytteet[i]);
            }
            Pituus = matkat[n - 1];
            // Nopeusprofiili: vetojen määrä = kokonaiset vedot ennen liukua.
            int vetoja = (int)Math.Floor((KestoS - LiukuS) / SoutuS);
            SoutuLoppuS = vetoja * SoutuS;
            int m = (int)Math.Ceiling(KestoS / Askel) + 1;
            sAjassa = new double[m];
            double vLiuku = 0;
            for (int i = 1; i < m; i++)
            {
                double t = (i - 0.5) * Askel, v;
                if (t < SoutuLoppuS)
                {
                    double vaihe = t % SoutuS;
                    // Veto: puolisinin työntö; palautus: hidas lasku. Keskiarvo ~1.
                    double tyonto = vaihe < VetoS ? Math.Sin(Math.PI * vaihe / VetoS) : -0.35 * Math.Sin(Math.PI * (vaihe - VetoS) / (SoutuS - VetoS));
                    v = 1 + Aalto * tyonto;
                    if (t < LahtoS) v *= Pehmea(t / LahtoS);
                    vLiuku = v;
                }
                else
                {
                    // Liuku laituriin: nopeus laskee pehmeästi nollaan.
                    double u = Math.Min(1, (t - SoutuLoppuS) / Math.Max(1e-6, KestoS - SoutuLoppuS));
                    v = vLiuku * (1 - Pehmea(u));
                }
                sAjassa[i] = sAjassa[i - 1] + v * Askel;
            }
            double kerroin = sAjassa[m - 1] > 0 ? Pituus / sAjassa[m - 1] : 0;
            for (int i = 0; i < m; i++) sAjassa[i] *= kerroin;
        }

        static double Pehmea(double u) { u = Math.Max(0, Math.Min(1, u)); return u * u * (3 - 2 * u); }
        static double Etaisyys((double X, double Y, double Z) a, (double X, double Y, double Z) b)
        { double dx = b.X - a.X, dy = b.Y - a.Y, dz = b.Z - a.Z; return Math.Sqrt(dx * dx + dy * dy + dz * dz); }

        (double X, double Y, double Z) CatmullRom(int v, double u)
        {
            var p1 = pisteet[v]; var p2 = pisteet[v + 1];
            (double X, double Y, double Z) p0 = v > 0 ? pisteet[v - 1] : (2 * p1.X - p2.X, 2 * p1.Y - p2.Y, 2 * p1.Z - p2.Z);
            (double X, double Y, double Z) p3 = v + 2 < pisteet.Count ? pisteet[v + 2] : (2 * p2.X - p1.X, 2 * p2.Y - p1.Y, 2 * p2.Z - p1.Z);
            double u2 = u * u, u3 = u2 * u;
            double C(double a, double b, double c, double d) => 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
            return (C(p0.X, p1.X, p2.X, p3.X), C(p0.Y, p1.Y, p2.Y, p3.Y), C(p0.Z, p1.Z, p2.Z, p3.Z));
        }

        /// <summary>Kuljettu matka hetkellä t (0…Pituus).</summary>
        public double Matka(double t)
        {
            if (t <= 0) return 0;
            double i = t / Askel; int a = (int)Math.Floor(i);
            if (a >= sAjassa.Length - 1) return Pituus;
            return sAjassa[a] + (sAjassa[a + 1] - sAjassa[a]) * (i - a);
        }

        (double X, double Y, double Z) PisteMatkalla(double s)
        {
            if (s <= 0) return naytteet[0];
            if (s >= Pituus) return naytteet[naytteet.Length - 1];
            int lo = 0, hi = matkat.Length - 1;
            while (hi - lo > 1) { int k = (lo + hi) / 2; if (matkat[k] <= s) lo = k; else hi = k; }
            double u = (s - matkat[lo]) / Math.Max(1e-9, matkat[hi] - matkat[lo]);
            var a = naytteet[lo]; var b = naytteet[hi];
            return (a.X + (b.X - a.X) * u, a.Y + (b.Y - a.Y) * u, a.Z + (b.Z - a.Z) * u);
        }

        public VeneTila Tila(double t)
        {
            double s = Matka(t);
            var p = PisteMatkalla(s);
            var e = PisteMatkalla(Math.Max(0, Math.Min(Pituus, s + 0.5))); var r = PisteMatkalla(Math.Max(0, s - 0.5));
            double sx = e.X - r.X, sz = e.Z - r.Z, l = Math.Sqrt(sx * sx + sz * sz);
            if (l < 1e-9) { sx = 0; sz = 1; } else { sx /= l; sz /= l; }
            if (loppuSuunta is double ls)
            {
                // Viimeiset KaantoM metriä: tangentti → kiinnityssuunta (glTF: kierto_y radiaaneina, keula +z paikallisesti).
                double w = Pehmea(1 - (Pituus - s) / KaantoM);
                double lx = Math.Sin(ls), lz = Math.Cos(ls);
                double kx = sx + (lx - sx) * w, kz = sz + (lz - sz) * w, kl = Math.Sqrt(kx * kx + kz * kz);
                if (kl > 1e-9) { sx = kx / kl; sz = kz / kl; }
            }
            double v = (Matka(t + 0.05) - Matka(t - 0.05)) / 0.1;
            double soutu = t <= 0 ? 0 : t < SoutuLoppuS ? t % SoutuS : 0;
            return new VeneTila(p.X, p.Y, p.Z, sx, sz, Math.Max(0, v), soutu, t >= KestoS);
        }
    }
}
