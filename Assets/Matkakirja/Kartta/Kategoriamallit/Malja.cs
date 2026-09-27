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

        static readonly bool maljaMalli = RekisteroiKategoria(Kategoriasymboli.Malja, new Erikoismalli { Runko = MaljaRunko, Lod1 = MaljaLod1, Lahi = MaljaLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta Erikoismalli.Lahi, 1.0.29) ----

        /// <summary>
        /// LÄHITASO: sama leipä ja malja lähizoomiin (Erikoismalli.Lahi: korvaa LOD0:n, kun kartan kerroin ≥ 4, enintään
        /// kolmelle lähimmälle). Sama siluetti, mittasuhteet, värit, rajat ja sommitelma kuin LOD0:ssa (soikea leipä kolmine
        /// viiltoineen edessä vasemmalla, malja takana oikealla), mutta 2 560 kolmiota (LOD0 562, noin 4,6 ×) lähikuvan
        /// yksityiskohtiin: leivän kupu 24 × 11 tahkona, pyöristetty ja maata vasten tummemmaksi paistunut alareuna ja loivat
        /// käsin muotoillun leivän kohoumat; viillot kymmenenä palana (tumma viilto, alahuulen vaalea reuna, korvan vaalea sisus
        /// kahtena tahkona ja rosoinen, koholla oleva korva); malja tiheämpänä sorvauksena (jalka ja kuppi 20, varsi 12 sektoria):
        /// jalan reunassa helmi ja porras, varren tyvessä rengas, nupin kummallakin puolella rengas ja kupin alla kannatinlaippa,
        /// kupin suulla koholla oleva reunanauha ja pyöristetty huuli. Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi);
        /// samat ääriviivaosat kuin LOD0:ssa (leipä, jalka, varsi, kuppi).
        /// </summary>
        static void MaljaLahiOsat(Rakentaja r)
        {
            MjLhLeipa(r);
            MjLhMalja(r);
        }

        /// <summary>Leivän pinta lähitasolla: LOD0:n kupu (MjLeipaPiste) ja loivat, toistettavat kohoumat, jotka häviävät
        /// maassa ja reunalla (käsin muotoiltu leipä, siluetti ennallaan).</summary>
        static Vector3 MjLhPinta(float X, float Z)
        {
            float d = Mathf.Min(1f, Mathf.Sqrt(X * X + Z * Z));
            float a = (float)Math.Atan2(Z, X);
            float kohouma = (0.0032f * Mathf.Sin(3f * a + 1.3f + 2.1f * d) + 0.0022f * Mathf.Sin(5f * a + 0.4f - 3f * d)) * Mathf.Sin(Mathf.PI * Mathf.Min(1f, d * 1.05f));
            return MjLeipaPiste(X, Z) + Vector3.up * kohouma;
        }

        static Vector3 MjLhNormaali(float X, float Z)
        {
            const float e = 0.01f;
            var n = Vector3.Cross(MjLhPinta(X, Z + e) - MjLhPinta(X, Z - e), MjLhPinta(X + e, Z) - MjLhPinta(X - e, Z)).normalized;
            return n.y < 0f ? -n : n;
        }

        /// <summary>
        /// Lähitason leipä: LOD0:n soikea kupu 24 sektorina ja 12 renkaana (pyöristetty, maata vasten tummemmaksi paistunut
        /// alareuna ja loivat kohoumat) ja kolme vinoa viiltoa samoilla paikoilla kymmenenä palana: tumma viilto, sen alahuulen
        /// vaalea reuna, korvan alapinnan vaalea sisus kahtena tahkona ja rosoinen, koholla oleva korva. Yksi ääriviivaosa.
        /// </summary>
        static void MjLhLeipa(Rakentaja r)
        {
            const int n = 24;
            float[] dt = { 0.93f, 0.975f, 1f, 0.975f, 0.93f, 0.86f, 0.77f, 0.66f, 0.53f, 0.38f, 0.21f, 0f };
            var p = new Vector3[dt.Length, n];
            for (int i = 0; i < n; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2f / n, ca = Mathf.Cos(a), sa = Mathf.Sin(a);
                for (int j = 0; j < dt.Length; j++)
                {
                    if (j == 0) p[j, i] = MjLeipaSiirto(ca * dt[j] * MjLeipaRx, 0f, sa * dt[j] * MjLeipaRz);
                    else if (j == 1) p[j, i] = MjLeipaSiirto(ca * dt[j] * MjLeipaRx, MjLeipaH * 0.06f, sa * dt[j] * MjLeipaRz);
                    else if (j == 2) p[j, i] = MjLhPinta(ca, sa);
                    else p[j, i] = MjLhPinta(ca * dt[j], sa * dt[j]);
                }
            }
            var keski = MjLeipaSiirto(0f, MjLeipaH * 0.35f, 0f);
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                for (int j = 0; j + 1 < dt.Length; j++)
                {
                    // Kupu tummempana (LOD0: renkaat < 0,7), kyljet vaaleampina ja maata vasten paistunut alareuna tummana.
                    var c = dt[j + 1] < 0.7f || j == 0 ? MjKuoriLaki : MjKuori;
                    if (dt[j + 1] <= 0f) r.KolmioKeskelta(p[j, i], p[j, q], p[j + 1, i], keski, c);
                    else r.NelioKeskelta(p[j, i], p[j, q], p[j + 1, q], p[j + 1, i], keski, c);
                }
            }

            // Viillot LOD0:n paikoilla (normitetut koordinaatit (xk ∓ 0,3, ∓0,5)), kymmenen palaa.
            const int m = 10;
            foreach (float xk in new[] { -0.42f, 0f, 0.42f })
            {
                var a0 = new Vector2(xk - 0.3f, -0.5f); var a1 = new Vector2(xk + 0.3f, 0.5f);
                var su = (a1 - a0).normalized; var sn = new Vector2(-su.y, su.x);
                const int kk = 7;
                var pv = new Vector3[m + 1, kk]; var nv = new Vector3[m + 1]; var sv = new Vector3[m + 1];
                int siemen = (int)(xk * 100f) + 50;
                for (int s = 0; s <= m; s++)
                {
                    float t = s / (float)m, lev = Mathf.Sin(Mathf.PI * t);
                    var c = a0 + (a1 - a0) * t;
                    Vector3 P = MjLhPinta(c.x, c.y), N = MjLhNormaali(c.x, c.y);
                    Vector3 sivu = (MjLhPinta(c.x + sn.x * 0.02f, c.y + sn.y * 0.02f) - P).normalized;
                    float w = 0.015f * lev, roso = 1f + 0.45f * KvKohina(siemen, s) * lev;
                    pv[s, 0] = P - sivu * (w + 0.007f * lev) + N * 0.0018f;                           // alahuulen ulkoreuna (kuoressa)
                    pv[s, 1] = P - sivu * w + N * (0.0045f + 0.002f * lev);                          // alahuulen vaalea reuna
                    pv[s, 2] = P - sivu * (w * 0.55f) + N * 0.0042f;                                 // viillon pohja (tumma)
                    pv[s, 3] = P + sivu * (w * 0.8f) + N * 0.0042f;
                    pv[s, 4] = P + sivu * (w + 0.006f * lev) + N * (0.0045f + 0.011f * lev * roso);   // sisus, alempi tahko
                    pv[s, 5] = P + sivu * (w + 0.014f * lev) + N * (0.0045f + 0.021f * lev * roso);   // korvan rosoinen reuna
                    pv[s, 6] = P + sivu * (w + 0.04f * lev) + N * 0.002f;                            // korvan ulkorinne kuoreen
                    nv[s] = N; sv[s] = sivu;
                }
                for (int s = 0; s < m; s++)
                {
                    var N = (nv[s] + nv[s + 1]).normalized; var sivu = (sv[s] + sv[s + 1]).normalized;
                    // Kaistat: alahuulen nousu, huulen vaalea sisäreuna, tumma viilto, korvan sisus (kaksi tahkoa) ja korvan ulkorinne.
                    var ulos = new[] { N - sivu * 0.4f, N + sivu * 0.6f, N, N - sivu * 0.8f, N - sivu, N + sivu };
                    var vari = new[] { MjKuoriLaki, MjKorva, MjViilto, MjKorva, MjKorva, MjKuoriLaki };
                    for (int q = 0; q + 1 < kk; q++)
                        r.NelioUlos(pv[s, q], pv[s + 1, q], pv[s + 1, q + 1], pv[s, q + 1], ulos[q], vari[q]);
                }
            }

            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason malja: sama sorvattu muoto kuin LOD0:ssa (jalka, varsi nuppeineen, tulppaanimainen kuppi, reuna ja viini)
        /// tiheämpänä (jalka ja kuppi 20, varsi 12 sektoria) ja tarkemmin profiloituna: jalan reunassa pyöristetty helmi ja
        /// porras, varren tyvessä 20-sektorinen rengas (siisti liitos jalkaan), nupin kummallakin puolella rengas, kupin alla
        /// kannatinlaippa, kupin suulla koholla oleva reunanauha ja pyöristetty huuli. Samat kolme ääriviivaosaa kuin LOD0:ssa.
        /// </summary>
        static void MjLhMalja(Rakentaja r)
        {
            r.AloitaOsa();
            MjSorvi(r, MjMaljaP, new[] { (0.158f, 0f), (0.16f, 0.006f), (0.16f, 0.012f), (0.155f, 0.017f), (0.146f, 0.0195f), (0.14f, 0.0205f),
                (0.137f, 0.024f), (0.112f, 0.034f), (0.082f, 0.048f), (0.058f, 0.064f), (0.043f, 0.081f), (0.034f, 0.098f), (0.03f, 0.11f) }, 20, _ => MjJalka);
            r.LopetaOsa();
            r.AloitaOsa();
            // Varren tyvirengas jalan päällä (20 sektoria kuten jalka, joten liitos jalkaan on siisti).
            MjSorvi(r, MjMaljaP, new[] { (0.0402f, 0.083f), (0.0402f, 0.0945f), (0.0365f, 0.0995f), (0.03f, 0.0995f) }, 20, _ => MjMalja);
            MjSorvi(r, MjMaljaP, new[] { (0.034f, 0.095f), (0.029f, 0.128f), (0.0255f, 0.16f), (0.031f, 0.1635f), (0.031f, 0.169f), (0.042f, 0.176f),
                (0.052f, 0.186f), (0.0565f, 0.197f), (0.055f, 0.207f), (0.046f, 0.217f), (0.031f, 0.2255f), (0.031f, 0.231f), (0.0255f, 0.236f),
                (0.0245f, 0.262f), (0.028f, 0.276f), (0.0395f, 0.2845f), (0.0425f, 0.2895f), (0.036f, 0.3f) }, 12, _ => MjMalja);
            r.LopetaOsa();
            var kuppi = new[] { (0.03f, 0.29f), (0.072f, 0.306f), (0.106f, 0.328f), (0.136f, 0.36f), (0.16f, 0.397f), (0.178f, 0.437f), (0.19f, 0.479f),
                (0.198f, 0.52f), (0.2022f, 0.556f), (0.2033f, 0.585f), (0.2064f, 0.5905f), (0.2064f, 0.612f), (0.2043f, 0.619f), (0.198f, 0.622f),
                (0.19f, 0.6215f), (0.183f, 0.605f), (0.172f, 0.583f), (0.162f, 0.565f), (0f, 0.565f) };
            int k = kuppi.Length;
            r.AloitaOsa();
            MjSorvi(r, MjMaljaP, kuppi, 20, j => j == k - 2 ? MjViini : j >= k - 5 ? MjSisus : MjMalja);
            r.LopetaOsa();
        }

        static Mesh MaljaLahi() { var r = new Rakentaja(); MaljaLahiOsat(r); return r.Verkko("kategoria-Malja-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaMalja3DLahi() => MaljaLahi();
    }
}
