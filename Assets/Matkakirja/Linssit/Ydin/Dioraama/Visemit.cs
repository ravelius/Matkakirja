// HUULISYNKKA (FACEIT, Päätoimittaja 6.10.2026, juna 150): puheen merkkikohdistuksesta (Aani.Kohdistus) seitsemän ARKit-suumuodon
// painot hetkellä t. Suomen kirjain → tavoitepainot (avoimet vokaalit jawOpen, o funnel, u/y pucker, m/p/b close, f/v
// rollLower, muut konsonantit pieni jawOpen); kukin merkki nousee 60 ms ennen alkuaan ja laskee 90 ms loppunsa jälkeen,
// ja kunkin muodon paino on lähimpien merkkien maksimi (ei summaa → ei yliavautumista). Puhdas ja kehysnopeudesta riippumaton.
// Räpäytys (Rapaytys): hahmon siemenellä keskimäärin 4 s välein (yksi räpäys per 4 s:n ikkuna), 150 ms kolmio, sama t → sama tila.
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Visemit
    {
        public const string Leuka = "jawOpen", Suppu = "mouthFunnel", Pyorea = "mouthPucker", Kiinni = "mouthClose", Alahuuli = "mouthRollLower",
            VenytysV = "mouthStretchLeft", VenytysO = "mouthStretchRight";
        public static readonly string[] Nimet = { Leuka, Suppu, Pyorea, Kiinni, Alahuuli, VenytysV, VenytysO };
        public const double NousuS = 0.06, LaskuS = 0.09;

        /// <summary>Merkin tavoitepainot (Nimet-järjestyksessä, 0–1).</summary>
        public static void Tavoite(char c, float[] p)
        {
            Array.Clear(p, 0, p.Length);
            // Linnanrakentajan arvot 6.10.2026 (Faceit-peili 94a0df22): välilyönti ja välimerkit 0 (lasku hoitaa häivytyksen).
            switch (char.ToLowerInvariant(c))
            {
                case 'a': case 'ä': p[0] = 0.6f; break;
                case 'o': case 'ö': p[0] = 0.35f; p[1] = 0.8f; break;
                case 'u': case 'y': case 'w': p[2] = 0.9f; break;
                case 'e': case 'i': p[0] = 0.25f; p[5] = p[6] = 0.4f; break;
                case 'm': case 'p': case 'b': p[3] = 1f; break;
                case 'f': case 'v': p[4] = 0.6f; break;
                default:
                    if (char.IsLetter(c)) p[0] = 0.15f;
                    break;
            }
        }

        /// <summary>Painot hetkellä t (s klipin alusta) taulukkoon ulos (pituus Nimet.Length).</summary>
        public static void Laske(Kohdistus k, double t, float[] ulos)
        {
            Array.Clear(ulos, 0, ulos.Length);
            if (k == null || k.Merkit.Length == 0) return;
            // Ensimmäinen merkki, jonka laskuvaihe voi vielä vaikuttaa (loppu + LaskuS ≥ t): binäärihaku alkujen mukaan riittää,
            // koska merkit ovat aikajärjestyksessä.
            int lo = 0, hi = k.Merkit.Length - 1;
            while (lo < hi) { int mid = (lo + hi) / 2; if (k.Loput[mid] + LaskuS < t) lo = mid + 1; else hi = mid; }
            var p = new float[Nimet.Length];
            for (int i = lo; i < k.Merkit.Length && k.Alut[i] - NousuS <= t; i++)
            {
                double a = k.Alut[i], b = Math.Max(k.Loput[i], a);
                double kerroin = Math.Min(Raja((t - (a - NousuS)) / NousuS), Raja(((b + LaskuS) - t) / LaskuS));
                if (kerroin <= 0) continue;
                Tavoite(k.Merkit[i], p);
                for (int j = 0; j < p.Length; j++) ulos[j] = Math.Max(ulos[j], (float)(p[j] * kerroin));
            }
        }

        /// <summary>Räpäytys 0–1 hetkellä t: hahmon siemenellä keskimäärin 4 s välein, 150 ms (75 ms kiinni, 75 ms auki).</summary>
        public static float Rapaytys(int siemen, double t)
        {
            if (t < 0) return 0;
            // Välit deterministisesti: 4 s:n ikkunassa yksi räpäys satunnaisessa kohdassa (keskimäärin 4 s väli).
            const double Ikkuna = 4.0, Kesto = 0.15;
            long w = (long)Math.Floor(t / Ikkuna);
            uint h = (uint)(siemen * 73856093) ^ (uint)(w * 19349663L);
            h ^= h >> 13; h *= 0x5bd1e995; h ^= h >> 15;
            double kohta = w * Ikkuna + (h % 1000) / 1000.0 * (Ikkuna - Kesto);
            double d = t - kohta;
            if (d < 0 || d > Kesto) return 0;
            return (float)(1 - Math.Abs(d - Kesto / 2) / (Kesto / 2));
        }

        static double Raja(double x) => x < 0 ? 0 : x > 1 ? 1 : x;
    }
}
