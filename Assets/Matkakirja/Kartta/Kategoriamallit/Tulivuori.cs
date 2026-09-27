using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI TULIVUORI (luonto: tulivuori), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color TvSavy0 = Ramppi(0xa68866), TvSavy1 = Ramppi(0xbba27c), TvSavy2 = Ramppi(0xcdb895), TvSavy3 = Ramppi(0xdfd1b3);
        static readonly Color TvReuna = Ramppi(0xf4ecda), TvSeina = Ramppi(0x5a4630), TvPohja = Ramppi(0x3b2f22);
        static readonly Color TvLaava = Ramppi(0x4a3a28), TvLaava2 = Ramppi(0x6b5238);
        static readonly Color TvSavu = Ramppi(0xf1e9d6), TvSavu2 = Ramppi(0xe2d6bd);

        /// <summary>
        /// LUONTO: TULIVUORI (kuvamerkkiä ei ole; "katkaistu kartio ja kraatteri"). Rosoinen katkaistu kartio: juuri
        /// epäsäännöllisenä soikiona (0,97 × 0,83), loivasti koveneva profiili, yhdeksän epäsäännöllisin välein olevaa kurua
        /// (sisäänpainuneina, harjanteet vaaleampina, kasvoittain vaihteleva sävy), leveä vaalea kraatterin reuna (paperi),
        /// kraatterin sisäseinä tumma seepia ja pohja muste (ylhäältä tumma aukko vaalean renkaan sisällä), kolme musteen
        /// tummaa laavakieltä kuruissa reunalta rinteen puoliväliin (levenevät ja päättyvät tylppään lohkoon) ja pieni vaalea
        /// savupilvi (kolme palloa) kraatterin takaoikealla, joten kraatteri näkyy myös ylhäältä. Huippu hieman taaempana kuin
        /// juuren keskipiste (pitkä eturinne kallistettuna). Korkeus reunaan 0,5, savun kanssa 0,75. Ääriviivaosat: kartio (laavat
        /// sen sisällä) ja savupilvi. LOD1: 10 kärkeä, kolme rinnevyötä, yksi kraatterivyö, yksi laavakieli ja kaksi savupalloa.
        /// </summary>
        static void TulivuoriOsat(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 10 : 26;
            float[] s = lod1 ? new[] { 0f, 0.34f, 0.7f, 1f } : new[] { 0f, 0.14f, 0.34f, 0.58f, 0.8f, 1f };
            float[] rk = lod1 ? new[] { 1f, 0.69f, 0.49f, 0.35f } : new[] { 1f, 0.85f, 0.69f, 0.54f, 0.43f, 0.35f };
            const float H = 0.5f, Rx = 0.47f, Rz = 0.41f;
            int m = s.Length;
            // Huipun siirto taakse ja hieman oikealle (s = 1), juuri keskellä.
            Vector3 Keski(float ss) => new Vector3(0.015f * ss, 0f, 0.035f * ss);
            // Kurut epäsäännöllisin välein (2–4 kärkeä) ja vaihtelevan syvinä; kärki 0 on edessä (−Z).
            var kurut = lod1 ? new[] { 1, 3, 6, 8 } : new[] { 1, 4, 6, 9, 13, 15, 18, 21, 24 };
            var kuru = new bool[n];
            foreach (int k in kurut) kuru[k] = true;
            var a = new float[n];
            var R = new float[n];
            for (int i = 0; i < n; i++)
            {
                a[i] = (i + 0.25f * KvKohina(i, 5)) * Mathf.PI * 2f / n - Mathf.PI * 0.5f;
                R[i] = 1f / Mathf.Sqrt(Mathf.Pow(Mathf.Cos(a[i]) / Rx, 2f) + Mathf.Pow(Mathf.Sin(a[i]) / Rz, 2f)) * (1f + 0.05f * KvKohina(i, 7));
            }
            // Kärjet: ulkorinne renkaat 0..m−1 (m−1 = reunan ulkolaita), sitten reunan harja, sisäseinä ja pohja.
            int kraatteri = lod1 ? 2 : 3;
            var p = new Vector3[m + kraatteri, n];
            for (int i = 0; i < n; i++)
            {
                var d = new Vector3(Mathf.Cos(a[i]), 0f, Mathf.Sin(a[i]));
                for (int j = 0; j < m; j++)
                {
                    float sj = s[j], kaari = Mathf.Sin(Mathf.PI * sj);
                    float syvyys = kuru[i] ? -(0.95f + 0.3f * KvKohina(i, 23)) : 0.3f;
                    float tyonto = j == m - 1 ? 0f : syvyys * (0.03f + 0.08f * kaari) + 0.045f * kaari * KvKohina(i * 11 + j, 19);
                    float y = H * sj + (kuru[i] ? -0.018f : 0.01f) * kaari;
                    if (j > 0 && j < m - 1) y += 0.02f * KvKohina(i * 7 + j, 3);
                    if (j == m - 1) y += 0.012f * KvKohina(i, 13);
                    p[j, i] = Keski(sj) + d * (rk[j] * R[i] * (1f + tyonto)) + Vector3.up * Mathf.Max(0f, y);
                }
                float rr = rk[m - 1] * R[i];
                var c1 = Keski(1f);
                p[m, i] = c1 + d * (rr * 0.86f) + Vector3.up * (H + 0.022f + 0.01f * KvKohina(i, 17));
                p[m + 1, i] = c1 + d * (rr * 0.55f) + Vector3.up * (H - 0.075f);
                if (!lod1) p[m + 2, i] = c1 + d * (rr * 0.28f) + Vector3.up * (H - 0.108f);
            }
            var pohja = Keski(1f) + Vector3.up * (H - 0.115f);
            var sisus = new Vector3(0f, H * 0.3f, 0f);
            var savyt = new[] { TvSavy0, TvSavy1, TvSavy2, TvSavy3 };
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                bool rinne = kuru[i] || kuru[q];
                for (int j = 0; j + 1 < m; j++)
                {
                    // Sävy: harjanne vaalein, kurun kylki keskisävy, alin vyö askelta tummempi, neljännes kasvoista askelta tummempia.
                    int t = (rinne ? 2 : 3) - (j == 0 ? 1 : 0) - (KvKohina(i * 5 + j, 29) > 0.5f ? 1 : 0);
                    r.NelioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], p[j, q], sisus, savyt[Mathf.Max(0, t)]);
                }
                // Reuna (ulkolaidasta harjalle) vaalea.
                r.NelioKeskelta(p[m - 1, i], p[m, i], p[m, q], p[m - 1, q], sisus, TvReuna);
                // Sisäseinä: normaali kraatterin akselia kohti ja ylös.
                var akseli = Keski(1f) + Vector3.up * (H + 0.25f);
                var sk = (p[m, i] + p[m, q] + p[m + 1, i] + p[m + 1, q]) * 0.25f;
                r.NelioUlos(p[m, i], p[m + 1, i], p[m + 1, q], p[m, q], akseli - sk, TvSeina);
                if (!lod1)
                {
                    var sk2 = (p[m + 1, i] + p[m + 1, q] + p[m + 2, i] + p[m + 2, q]) * 0.25f;
                    r.NelioUlos(p[m + 1, i], p[m + 2, i], p[m + 2, q], p[m + 1, q], akseli - sk2, TvPohja);
                }
                int viim = m + kraatteri - 1;
                r.KolmioUlos(pohja, p[viim, i], p[viim, q], Vector3.up, TvPohja);
            }
            // Laavakielet kuruissa: (kuru, alin rengas). Nauha seuraa kurun kärkiriviä reunalta alas, levenee ja päättyy
            // tylppään lohkoon; hieman pinnan yläpuolella, kartion ääriviivaosassa (ei omaa ääriviivaa).
            var laavat = lod1 ? new[] { (1, 1) } : new[] { (1, 2), (24, 3), (6, 3) };
            foreach (var (g, ala) in laavat) TvLaavakieli(r, p, n, m, g, ala);
            r.LopetaOsa();

            // Savupilvi: pallot kraatterin takaoikealta nousten (ylhäältä kraatteri jää näkyviin).
            var pallot = lod1
                ? new[] { (new Vector3(0.1f, 0.6f, 0.13f), 0.08f), (new Vector3(0.17f, 0.68f, 0.17f), 0.065f) }
                : new[] { (new Vector3(0.1f, 0.585f, 0.12f), 0.07f), (new Vector3(0.19f, 0.64f, 0.14f), 0.066f), (new Vector3(0.13f, 0.7f, 0.17f), 0.058f) };
            r.AloitaOsa();
            for (int k = 0; k < pallot.Length; k++)
            {
                var (c, rad) = pallot[k];
                TvPallo(r, c, rad, rad * 0.86f, rad, lod1 ? 5 : 7, k % 2 == 0 ? TvSavu : TvSavu2);
            }
            r.LopetaOsa();
        }

        /// <summary>Laavakieli kurun g kärkiriviä pitkin renkaasta m−1 (reunan ulkolaita) renkaaseen ala: leveys kasvaa
        /// alaspäin (osuus naapurikärkiin) ja päättyy tylppään lohkoon; 0,008 pinnan yläpuolella.</summary>
        static void TvLaavakieli(Rakentaja r, Vector3[,] p, int n, int m, int g, int ala)
        {
            int gv = (g + n - 1) % n, go = (g + 1) % n;
            Vector3 Ulos(int j)
            {
                var d = p[j, g]; d.y = 0f; d = d.normalized;
                return (d * 0.75f + Vector3.up * 0.66f).normalized;
            }
            Vector3 Nosta(Vector3 v, int j) => v + Ulos(j) * 0.008f;
            int askelia = m - 1 - ala;
            Vector3 eL = default, eC = default, eR = default;
            for (int k = 0; k <= askelia; k++)
            {
                int j = m - 1 - k;
                float f = Mathf.Lerp(0.22f, 0.5f, k / (float)Mathf.Max(1, askelia));
                Vector3 C = Nosta(p[j, g], j), L = Nosta(Vector3.Lerp(p[j, g], p[j, gv], f), j), Rr = Nosta(Vector3.Lerp(p[j, g], p[j, go], f), j);
                if (k > 0)
                {
                    var c = k <= 1 ? TvLaava : TvLaava2;
                    r.NelioUlos(eL, eC, C, L, Ulos(j), c);
                    r.NelioUlos(eC, eR, Rr, C, Ulos(j), c);
                }
                eL = L; eC = C; eR = Rr;
            }
            // Pyöreä kärki: sivut 0,28 ja keskus 0,42 vyöstä alempana (tylppä lohko, ei piikkiä).
            Vector3 Alas(int kv) => p[ala - 1, kv] - p[ala, kv];
            var L2 = Nosta(Vector3.Lerp(p[ala, g], p[ala, gv], 0.4f) + Vector3.Lerp(Alas(g), Alas(gv), 0.4f) * 0.28f, ala);
            var C2 = Nosta(p[ala, g] + Alas(g) * 0.42f, ala);
            var R2 = Nosta(Vector3.Lerp(p[ala, g], p[ala, go], 0.4f) + Vector3.Lerp(Alas(g), Alas(go), 0.4f) * 0.28f, ala);
            r.NelioUlos(eL, eC, C2, L2, Ulos(ala), TvLaava2);
            r.NelioUlos(eC, eR, R2, C2, Ulos(ala), TvLaava2);
        }

        /// <summary>Savupallo: matala monitahokas (sektorit × kolme vyötä, keskimmäinen rengas kierretty puoli sektoria),
        /// keskipiste c ja säteet rx, ry, rz. 4 × sektorit kolmiota.</summary>
        static void TvPallo(Rakentaja r, Vector3 c, float rx, float ry, float rz, int sektorit, Color vari)
        {
            float[] lev = { -Mathf.PI * 0.5f, -0.42f, 0.55f, Mathf.PI * 0.5f };
            Vector3 P(int k, int i)
            {
                float a = (i + 0.5f * (k % 2)) * Mathf.PI * 2f / sektorit, l = lev[k];
                return c + new Vector3(Mathf.Cos(a) * Mathf.Cos(l) * rx, Mathf.Sin(l) * ry, Mathf.Sin(a) * Mathf.Cos(l) * rz);
            }
            for (int i = 0; i < sektorit; i++)
            {
                int q = (i + 1) % sektorit;
                r.KolmioKeskelta(P(0, 0), P(1, i), P(1, q), c, vari);
                r.NelioKeskelta(P(1, i), P(1, q), P(2, q), P(2, i), c, vari);
                r.KolmioKeskelta(P(3, 0), P(2, i), P(2, q), c, vari);
            }
        }

        static Mesh TulivuoriRunko() { var r = new Rakentaja(); TulivuoriOsat(r, false); return r.Verkko("kategoria-Tulivuori"); }
        static Mesh TulivuoriLod1() { var r = new Rakentaja(); TulivuoriOsat(r, true); return r.Verkko("kategoria-Tulivuori-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaTulivuori3D(bool lod1 = false) => lod1 ? TulivuoriLod1() : TulivuoriRunko();

        static readonly bool tulivuoriMalli = RekisteroiKategoria(Kategoriasymboli.Tulivuori, new Erikoismalli { Runko = TulivuoriRunko, Lod1 = TulivuoriLod1 });
    }
}
