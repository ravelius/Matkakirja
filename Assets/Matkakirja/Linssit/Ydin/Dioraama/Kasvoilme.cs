// SOUTAJAN KASVOT (Natiiviseppä 11.10.2026; omistaja: "Soutajan kasvot pitää animoida äärimmäisen hyvin, jotta puhe näyttää puheelta
// ja eleet tukevat tarinaa", PT:n suunnitelma 14.2x kohta 3): puhdas ilme-, korostus- ja katsekerros FACEIT-kasvoille (ARKit-nimet)
// Visemit-suun päälle. Kaikki on hetken t funktio (ei tilaa, kehysnopeudesta riippumaton, testattava).
// - Ilme: repliikin merkinnän perusilme (neutraali, hymy, huoli, vakava, kysyva) tavoitepainoina; vaihto pehmenee Unity-puolella.
// - Korostus: suomen paino on sanan ensimmäisellä tavulla → kulmat nousevat hetkeksi lauseen ensimmäisen sanan ja pitkien sanojen
//   (≥ PitkaSana kirjainta) alussa; kysymyksen viimeisellä sanalla kulmat jäävät ylös lauseen loppuun asti.
// - Katse: silmien pikkuhypyt (sakkadit) kohteen ympärillä vakaalla siemenellä; puhuessa lauseen alussa katse käy sivussa
//   (ajatus) ja palaa. Paluuarvot asteina (vaaka + = oikealle hahmon kannalta, pysty + = ylös).
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Kasvoilme
    {
        public const string KulmaSisa = "browInnerUp", KulmaAlasV = "browDownLeft", KulmaAlasO = "browDownRight",
            KulmaUlkoV = "browOuterUpLeft", KulmaUlkoO = "browOuterUpRight", HymyV = "mouthSmileLeft", HymyO = "mouthSmileRight",
            SuruV = "mouthFrownLeft", SuruO = "mouthFrownRight", SiristysV = "eyeSquintLeft", SiristysO = "eyeSquintRight",
            LevaV = "eyeWideLeft", LevaO = "eyeWideRight", PoskiV = "cheekSquintLeft", PoskiO = "cheekSquintRight";
        /// <summary>Ilmekerroksen muodot (puuttuva muoto mallissa = -1, ohitetaan).</summary>
        public static readonly string[] Nimet = { KulmaSisa, KulmaAlasV, KulmaAlasO, KulmaUlkoV, KulmaUlkoO, HymyV, HymyO, SuruV, SuruO,
            SiristysV, SiristysO, LevaV, LevaO, PoskiV, PoskiO };
        public const int ISisa = 0, IAlasV = 1, IAlasO = 2, IUlkoV = 3, IUlkoO = 4, IHymyV = 5, IHymyO = 6, ISuruV = 7, ISuruO = 8,
            ISirV = 9, ISirO = 10, ILevaV = 11, ILevaO = 12, IPoskiV = 13, IPoskiO = 14;

        public const int PitkaSana = 7;
        public const double KorostusNousuS = 0.08, KorostusLaskuS = 0.4, KysymysS = 0.7;

        /// <summary>Perusilmeen tavoitepainot (0–1, Nimet-järjestyksessä). Tuntematon tai tyhjä = neutraali (kevyt lepo, ei kuollut).</summary>
        public static void Ilme(string ilme, float[] p)
        {
            Array.Clear(p, 0, p.Length);
            switch (ilme)
            {
                case "hymy":
                    p[IHymyV] = p[IHymyO] = 0.55f; p[IPoskiV] = p[IPoskiO] = 0.35f; p[ISirV] = p[ISirO] = 0.25f; p[IUlkoV] = p[IUlkoO] = 0.1f;
                    break;
                case "huoli":
                    p[ISisa] = 0.55f; p[ISuruV] = p[ISuruO] = 0.25f; p[ILevaV] = p[ILevaO] = 0.1f;
                    break;
                case "vakava":
                    p[IAlasV] = p[IAlasO] = 0.35f; p[ISirV] = p[ISirO] = 0.15f; p[ISuruV] = p[ISuruO] = 0.1f;
                    break;
                case "kysyva":
                    // Toinen kulma ylempänä: epäsymmetria lukee kysyvänä, symmetrinen nosto yllättyneenä.
                    p[ISisa] = 0.25f; p[IUlkoV] = 0.5f; p[IUlkoO] = 0.2f;
                    break;
                default:
                    p[IHymyV] = p[IHymyO] = 0.06f;
                    break;
            }
        }

        /// <summary>Korostus hetkellä t lisäpainoina (lisätään ilmeen päälle, Unity rajaa 0–1): kulmat korostettujen sanojen alussa ja
        /// kysymyksen lopussa.</summary>
        public static void Korostus(Kohdistus k, double t, float[] p)
        {
            Array.Clear(p, 0, p.Length);
            if (k == null || k.Merkit.Length == 0) return;
            string m = k.Merkit;
            float pulssi = 0f, kysymys = 0f;
            bool lauseAlku = true;
            for (int i = 0; i < m.Length; i++)
            {
                if (!char.IsLetter(m[i]))
                {
                    if (m[i] == '.' || m[i] == '!' || m[i] == '?') lauseAlku = true;
                    if (m[i] == '?')
                    {
                        // Kysymyksen viimeinen sana: sanan alusta kysymysmerkin loppuun + KysymysS (pehmeä lasku).
                        int s = i - 1; while (s >= 0 && !char.IsLetter(m[s])) s--;
                        while (s > 0 && char.IsLetter(m[s - 1])) s--;
                        if (s >= 0)
                        {
                            double a = k.Alut[s], b = k.Loput[i];
                            float w = (float)Math.Min(Raja((t - (a - KorostusNousuS)) / KorostusNousuS), Raja((b + KysymysS - t) / KysymysS));
                            kysymys = Math.Max(kysymys, w);
                        }
                    }
                    continue;
                }
                if (i > 0 && char.IsLetter(m[i - 1])) continue;   // vain sanan alku
                int pituus = 0; while (i + pituus < m.Length && char.IsLetter(m[i + pituus])) pituus++;
                bool korostus = lauseAlku || pituus >= PitkaSana;
                lauseAlku = false;
                if (!korostus) continue;
                double alku = k.Alut[i];
                if (t < alku - KorostusNousuS || t > alku + KorostusLaskuS) continue;
                float v = t < alku ? (float)Raja((t - (alku - KorostusNousuS)) / KorostusNousuS) : (float)(1 - Raja((t - alku) / KorostusLaskuS));
                pulssi = Math.Max(pulssi, v);
            }
            p[ISisa] = 0.3f * pulssi + 0.35f * kysymys;
            p[IUlkoV] = 0.25f * pulssi + 0.45f * kysymys;
            p[IUlkoO] = 0.25f * pulssi + 0.3f * kysymys;
        }

        /// <summary>Lauseiden alkuhetket kohdistuksesta (ensimmäinen kirjain repliikin alussa ja jokaisen . ! ? jälkeen).</summary>
        public static int LauseAlut(Kohdistus k, double[] ulos)
        {
            int n = 0; bool alku = true;
            if (k == null) return 0;
            for (int i = 0; i < k.Merkit.Length && n < ulos.Length; i++)
            {
                char c = k.Merkit[i];
                if (char.IsLetter(c)) { if (alku) ulos[n++] = k.Alut[i]; alku = false; }
                else if (c == '.' || c == '!' || c == '?') alku = true;
            }
            return n;
        }

        public const double SakkadiS = 0.04, AjatusS = 0.7;

        /// <summary>
        /// Katseen poikkeama kohteesta (asteina) hetkellä t: pikkuhypyt 0,5–1,7 s välein (±2,5° vaaka, ±1,5° pysty), siirto
        /// SakkadiS:ssa. lauseAlku = puhuessa viimeisimmän lauseen alku (NaN = ei puhetta): lauseen alussa katse käy sivussa ja
        /// alhaalla AjatusS:n ajan (siemen valitsee puolen), paitsi joka kolmannessa lauseessa (katse pysyy kuulijassa).
        /// </summary>
        public static void Katse(int siemen, double t, double lauseAlku, out float vaaka, out float pysty)
        {
            long nyt = ViimeisinHyppy(siemen, t, out double hetki);
            long ed = nyt == long.MinValue ? long.MinValue : ViimeisinHyppy(siemen, hetki - 1e-9, out _);
            Kohta(siemen, nyt, out float tv, out float tp);
            Kohta(siemen, ed, out float ev, out float ep);
            float s = nyt == long.MinValue ? 1f : (float)Raja((t - hetki) / SakkadiS);
            vaaka = ev + (tv - ev) * s; pysty = ep + (tp - ep) * s;

            if (!double.IsNaN(lauseAlku) && t >= lauseAlku && t < lauseAlku + AjatusS)
            {
                long l = (long)Math.Floor(lauseAlku * 10);
                if (Hajonta(siemen, l, 5) < 0.67)
                {
                    float puoli = Hajonta(siemen, l, 6) < 0.5 ? -1f : 1f;
                    double d = t - lauseAlku;
                    // Pois 60 ms:ssa, takaisin viimeisen 120 ms:n aikana.
                    float w = (float)Math.Min(Raja(d / 0.06), Raja((AjatusS - d) / 0.12));
                    vaaka += puoli * 11f * w; pysty -= 5f * w;
                }
            }
        }

        const double Rako = 0.6;
        /// <summary>Hypyt: 0,6 s:n raot, joista 55 %:ssa hyppy raon siemenen kohdassa (välit 0,1–2,4 s, keskimäärin ~1,1 s).</summary>
        static long ViimeisinHyppy(int siemen, double t, out double hetki)
        {
            long r = (long)Math.Floor(t / Rako);
            for (long j = r; j > r - 12; j--)
            {
                if (Hajonta(siemen, j, 2) < 0.45) continue;
                double h = j * Rako + Hajonta(siemen, j, 1) * Rako;
                if (h <= t) { hetki = h; return j; }
            }
            hetki = double.NegativeInfinity; return long.MinValue;
        }

        static void Kohta(int siemen, long j, out float v, out float p)
        {
            if (j == long.MinValue) { v = p = 0f; return; }
            v = (float)(Hajonta(siemen, j, 3) * 5 - 2.5); p = (float)(Hajonta(siemen, j, 4) * 3 - 1.5);
        }

        static double Hajonta(int siemen, long i, int kanava)
        {
            uint h = (uint)(siemen * 73856093) ^ (uint)(i * 19349663L) ^ (uint)(kanava * 83492791);
            h ^= h >> 13; h *= 0x5bd1e995; h ^= h >> 15;
            return (h % 10000) / 10000.0;
        }

        static double Raja(double x) => x < 0 ? 0 : x > 1 ? 1 : x;
    }
}
