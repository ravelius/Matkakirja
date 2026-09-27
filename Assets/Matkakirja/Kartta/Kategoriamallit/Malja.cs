using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI MALJA (ruoka), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color MjKuori = Ramppi(0xdcbf8e), MjKuoriLaki = Ramppi(0xcba977), MjKorva = Ramppi(0xf4ead3), MjViilto = Ramppi(0x5a4430);
        static readonly Color MjMalja = Ramppi(0xefe5cc), MjJalka = Ramppi(0xe3d5b5), MjSisus = Ramppi(0xcdb994), MjViini = Ramppi(0x8f6d49);

        /// <summary>Leivän keskipiste, puoliakselit (pituus x, leveys z), korkeus ja kierto pystyakselin ympäri (rad).</summary>
        static readonly Vector3 MjLeipaP = new Vector3(-0.17f, 0f, -0.075f);
        const float MjLeipaRx = 0.305f, MjLeipaRz = 0.215f, MjLeipaH = 0.3f, MjLeipaKierto = 0.2f;
        /// <summary>Maljan jalan keskipiste (takana oikealla).</summary>
        static readonly Vector3 MjMaljaP = new Vector3(0.25f, 0f, 0.085f);

        /// <summary>
        /// RUOKA: leipä ja malja (merkki-ruoka.png oikeana 3D-esineenä). Edessä vasemmalla soikea leipä (0,61 × 0,43, korkeus
        /// 0,3): pyöreä kupu, alareuna hieman sisään ja kolme vinoa viiltoa (tumma viilto ja sen vieressä koholla vaalea
        /// korva). Takana oikealla malja (korkeus 0,62): levenevä jalka, varsi ja nuppi, tulppaanimainen kuppi, ohut reuna,
        /// viisto sisäpinta ja viini. Leveys 0,93. Ylhäältä: viillotettu soikea leipä ja maljan vaalea reuna viinin ympärillä.
        /// Ääriviivaosat: leipä, jalka, varsi ja kuppi. LOD1 (≤ 200): harvempi sorvaus ja kupu, viillot pelkkinä tummina
        /// viivoina ilman korvia.
        /// </summary>
        static void MaljaOsat(Rakentaja r, bool lod1)
        {
            MjLeipa(r, lod1);
            MjMaljaSorvaus(r, lod1);
        }

        /// <summary>Leivän paikallinen piste (x pituus-, z leveyssuunta) mallin avaruuteen: kierto ja siirto paikalleen.</summary>
        static Vector3 MjLeipaSiirto(float x, float y, float z)
        {
            float c = Mathf.Cos(MjLeipaKierto), s = Mathf.Sin(MjLeipaKierto);
            return MjLeipaP + new Vector3(x * c - z * s, y, x * s + z * c);
        }

        /// <summary>Leivän kuvun piste normitetuista koordinaateista (X pituus-, Z leveyssuunta, säde ≤ 1); "päiväntasaaja"
        /// 0,15 korkeudesta, laki loiva.</summary>
        static Vector3 MjLeipaPiste(float X, float Z)
        {
            float d = Mathf.Min(1f, Mathf.Sqrt(X * X + Z * Z));
            float y = MjLeipaH * (0.15f + 0.85f * Mathf.Sqrt(Mathf.Max(0f, 1f - Mathf.Pow(d, 2.2f))));
            return MjLeipaSiirto(X * MjLeipaRx, y, Z * MjLeipaRz);
        }

        static Vector3 MjLeipaNormaali(float X, float Z)
        {
            const float e = 0.01f;
            var n = Vector3.Cross(MjLeipaPiste(X, Z + e) - MjLeipaPiste(X, Z - e), MjLeipaPiste(X + e, Z) - MjLeipaPiste(X - e, Z)).normalized;
            return n.y < 0f ? -n : n;
        }

        static void MjLeipa(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 8 : 14;
            // Renkaat normitettuna säteenä: alin maassa hieman sisempänä (leipä kaartuu alleen), sitten kupu lakeen.
            float[] dt = lod1 ? new[] { 0.94f, 0.86f, 0.5f, 0f } : new[] { 0.93f, 1f, 0.95f, 0.84f, 0.66f, 0.42f, 0f };
            var p = new Vector3[dt.Length, n];
            for (int i = 0; i < n; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2f / n, ca = Mathf.Cos(a), sa = Mathf.Sin(a);
                for (int j = 0; j < dt.Length; j++)
                    p[j, i] = j == 0 ? MjLeipaSiirto(ca * dt[j] * MjLeipaRx, 0f, sa * dt[j] * MjLeipaRz) : MjLeipaPiste(ca * dt[j], sa * dt[j]);
            }
            var keski = MjLeipaSiirto(0f, MjLeipaH * 0.35f, 0f);
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                for (int j = 0; j + 1 < dt.Length; j++)
                {
                    var c = dt[j + 1] < 0.7f ? MjKuoriLaki : MjKuori;
                    if (dt[j + 1] <= 0f) r.KolmioKeskelta(p[j, i], p[j, q], p[j + 1, i], keski, c);
                    else r.NelioKeskelta(p[j, i], p[j, q], p[j + 1, q], p[j + 1, i], keski, c);
                }
            }

            // Kolme vinoa viiltoa poikki leivän: tumma viilto ja (LOD0) sen toisella puolella koholla oleva vaalea korva.
            int m = lod1 ? 2 : 4;
            foreach (float xk in new[] { -0.42f, 0f, 0.42f })
            {
                var a0 = new Vector2(xk - 0.3f, -0.5f); var a1 = new Vector2(xk + 0.3f, 0.5f);
                var su = (a1 - a0).normalized; var sn = new Vector2(-su.y, su.x);
                var pv = new Vector3[m + 1, 4]; var nv = new Vector3[m + 1]; var sv = new Vector3[m + 1];
                for (int s = 0; s <= m; s++)
                {
                    float t = s / (float)m, lev = Mathf.Sin(Mathf.PI * t);   // suippenee päistä
                    var c = a0 + (a1 - a0) * t;
                    Vector3 P = MjLeipaPiste(c.x, c.y), N = MjLeipaNormaali(c.x, c.y);
                    Vector3 sivu = (MjLeipaPiste(c.x + sn.x * 0.02f, c.y + sn.y * 0.02f) - P).normalized;
                    float w = 0.015f * lev;
                    pv[s, 0] = P - sivu * w + N * 0.004f;
                    pv[s, 1] = P + sivu * w + N * 0.004f;
                    pv[s, 2] = P + sivu * (w + 0.013f * lev) + N * (0.004f + 0.02f * lev);
                    pv[s, 3] = P + sivu * (w + 0.038f * lev) + N * 0.002f;
                    nv[s] = N; sv[s] = sivu;
                }
                for (int s = 0; s < m; s++)
                {
                    var N = (nv[s] + nv[s + 1]).normalized; var sivu = (sv[s] + sv[s + 1]).normalized;
                    r.NelioUlos(pv[s, 0], pv[s + 1, 0], pv[s + 1, 1], pv[s, 1], N, MjViilto);
                    if (lod1) continue;
                    r.NelioUlos(pv[s, 1], pv[s + 1, 1], pv[s + 1, 2], pv[s, 2], N - sivu, MjKorva);
                    r.NelioUlos(pv[s, 2], pv[s + 1, 2], pv[s + 1, 3], pv[s, 3], N + sivu, MjKuoriLaki);
                }
            }
            r.LopetaOsa();
        }

        /// <summary>Malja kolmena ääriviivaosana (jalka, varsi nuppeineen, kuppi), jotta ohut varsikin saa ääriviivan; varsi alkaa
        /// jalan sisältä ja päättyy kupin sisään, joten eri kulmamäärien saumoihin ei jää rakoja.</summary>
        static void MjMaljaSorvaus(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 8 : 12;
            r.AloitaOsa();
            MjSorvi(r, MjMaljaP, lod1 ? new[] { (0.158f, 0f), (0.16f, 0.016f), (0.04f, 0.085f) }
                : new[] { (0.158f, 0f), (0.16f, 0.016f), (0.105f, 0.036f), (0.05f, 0.07f), (0.03f, 0.11f) }, n, _ => MjJalka);
            r.LopetaOsa();
            r.AloitaOsa();
            MjSorvi(r, MjMaljaP, lod1 ? new[] { (0.034f, 0.075f), (0.028f, 0.17f), (0.056f, 0.205f), (0.036f, 0.3f) }
                : new[] { (0.034f, 0.095f), (0.026f, 0.165f), (0.052f, 0.19f), (0.056f, 0.206f), (0.03f, 0.235f), (0.027f, 0.265f), (0.036f, 0.3f) },
                lod1 ? 6 : 8, _ => MjMalja);
            r.LopetaOsa();
            // Kuppi: ulkopinta, ohut reuna, viisto sisäpinta (ylhäältä vaalea rengas viinin ympärillä) ja viinin pinta.
            var kuppi = lod1 ? new[] { (0.03f, 0.29f), (0.16f, 0.37f), (0.206f, 0.62f), (0.19f, 0.622f), (0.162f, 0.565f), (0f, 0.565f) }
                : new[] { (0.03f, 0.29f), (0.12f, 0.345f), (0.178f, 0.43f), (0.2f, 0.52f), (0.206f, 0.62f), (0.19f, 0.622f), (0.162f, 0.565f), (0f, 0.565f) };
            int k = kuppi.Length;
            r.AloitaOsa();
            MjSorvi(r, MjMaljaP, kuppi, n, j => j == k - 2 ? MjViini : j == k - 3 ? MjSisus : MjMalja);
            r.LopetaOsa();
        }

        /// <summary>Sorvattu pinta pystyakselin ympäri: profiili (säde, korkeus) kulkee niin, että aine jää kulkusuunnasta
        /// vasemmalle (ulkopinta ylös, reunan yli, sisäpinta alas), joten tahkon etupuoli saadaan profiilin normaalista.
        /// Säde 0 profiilin päässä tekee viuhkan. Väri profiilin väleittäin.</summary>
        static void MjSorvi(Rakentaja r, Vector3 p, (float sade, float y)[] prof, int n, Func<int, Color> vari)
        {
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (r0, y0) = prof[j]; var (r1, y1) = prof[j + 1];
                float nr = y1 - y0, ny = r0 - r1;
                for (int i = 0; i < n; i++)
                {
                    float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                    var ulos = new Vector3(Mathf.Cos(am) * nr, ny, Mathf.Sin(am) * nr);
                    Vector3 A = p + d0 * r0 + Vector3.up * y0, B = p + d1 * r0 + Vector3.up * y0;
                    Vector3 C = p + d1 * r1 + Vector3.up * y1, D = p + d0 * r1 + Vector3.up * y1;
                    if (r0 <= 0f) r.KolmioUlos(A, C, D, ulos, vari(j));
                    else if (r1 <= 0f) r.KolmioUlos(A, B, C, ulos, vari(j));
                    else r.NelioUlos(A, B, C, D, ulos, vari(j));
                }
            }
        }

        static Mesh MaljaRunko() { var r = new Rakentaja(); MaljaOsat(r, false); return r.Verkko("kategoria-Malja"); }
        static Mesh MaljaLod1() { var r = new Rakentaja(); MaljaOsat(r, true); return r.Verkko("kategoria-Malja-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaMalja3D(bool lod1 = false) => lod1 ? MaljaLod1() : MaljaRunko();

        static readonly bool maljaMalli = RekisteroiKategoria(Kategoriasymboli.Malja, new Erikoismalli { Runko = MaljaRunko, Lod1 = MaljaLod1 });
    }
}
