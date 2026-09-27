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
            const float H = TvKorkeus;
            var p = TulivuoriRuudukko(lod1, out var kuru);
            int n = kuru.Length, kraatteri = lod1 ? 2 : 3, m = p.GetLength(0) - kraatteri;
            Vector3 Keski(float ss) => TvKeski(ss);
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

        /// <summary>
        /// Kartion kärkiruudukko (LOD0, LOD1 ja lähitason pohja): p[j, i] ulkorinteen renkaat j = 0 (juuri) … m − 1 (reunan
        /// ulkolaita), sitten reunan harja (m), sisäseinän alareuna (m + 1) ja LOD0:ssa pohjarengas (m + 2); kärki i = 0 edessä
        /// (−Z), kulma kasvaa vastapäivään. kuru[i] = kärki on kurussa.
        /// </summary>
        static Vector3[,] TulivuoriRuudukko(bool lod1, out bool[] kuru)
        {
            int n = lod1 ? 10 : 26;
            float[] s = lod1 ? new[] { 0f, 0.34f, 0.7f, 1f } : new[] { 0f, 0.14f, 0.34f, 0.58f, 0.8f, 1f };
            float[] rk = lod1 ? new[] { 1f, 0.69f, 0.49f, 0.35f } : new[] { 1f, 0.85f, 0.69f, 0.54f, 0.43f, 0.35f };
            const float H = TvKorkeus, Rx = 0.47f, Rz = 0.41f;
            int m = s.Length;
            // Huipun siirto taakse ja hieman oikealle (s = 1), juuri keskellä.
            Vector3 Keski(float ss) => TvKeski(ss);
            // Kurut epäsäännöllisin välein (2–4 kärkeä) ja vaihtelevan syvinä; kärki 0 on edessä (−Z).
            var kurut = lod1 ? new[] { 1, 3, 6, 8 } : new[] { 1, 4, 6, 9, 13, 15, 18, 21, 24 };
            kuru = new bool[n];
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
            return p;
        }

        /// <summary>Tulivuoren korkeus kraatterin reunaan (ilman savua).</summary>
        const float TvKorkeus = 0.5f;

        /// <summary>Kartion akseli korkeuden osuudella ss (0 juuri, 1 reuna): huippu taempana ja hieman oikealla.</summary>
        static Vector3 TvKeski(float ss) => new Vector3(0.015f * ss, 0f, 0.035f * ss);

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

        static readonly bool tulivuoriMalli = RekisteroiKategoria(Kategoriasymboli.Tulivuori, new Erikoismalli { Runko = TulivuoriRunko, Lod1 = TulivuoriLod1, Lahi = TulivuoriLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama tulivuori lähizoomiin (korvaa LOD0:n vain lähellä, enintään kolme lähintä). Pohjana LOD0:n oma
        /// kärkiruudukko (<see cref="TulivuoriRuudukko"/>, kärjet paikallaan), joten siluetti, mittasuhteet, rajat, kurut,
        /// sävyt, kraatteri, laavakielet ja savupilvi ovat samat, mutta 2 350 kolmiota (LOD0 566, noin 4,2 ×) lähikuvan
        /// yksityiskohtiin: ulkorinne kaksinkertaisena ruudukkona, rinnettä alas kulkevat uurteet (sileät pitkät tahkot) ja
        /// niiden varjon puoleiset seinät askelta tummempina vetoina varjon puolella (kaiverruksen viivoitus), kurut
        /// syvempinä, pyöristetty ja rosoinen kraatterin reuna, sisäseinässä kerrostuma (jyrkänne, vaaleampi hylly,
        /// jyrkänne), laavakielet LOD0:n levyisinä ja värisinä mutta reunavalleina kohoavina levyinä tylppine kärkineen,
        /// kuusi laavapommia rinteen juurella, savupallot pehmeämpinä ja hieman poimuisina sekä pieni savuhattara kraatterin
        /// suulla (savu nousee kraatterista). Tahkot suunnataan ylös. Ääriviivaosat kuten LOD0: kartio ja savupilvi.
        /// </summary>
        static void TulivuoriLahiOsat(Rakentaja r)
        {
            const float H = TvKorkeus;
            const int n = 26, m = 6, N = 2 * n, M = 2 * (m - 1);      // ulkorinne: LOD0:n renkaat 0 … m − 1 → 0 … M
            var p = TulivuoriRuudukko(false, out var kuru);
            var c1 = TvKeski(1f);
            // Ulkorinne: LOD0:n kärjet paikallaan (parilliset indeksit), välikärjet LOD0:n tahkoilta; uurteen paikka vaihtelee.
            var q = new Vector3[M + 1, N];
            for (int jj = 0; jj <= M; jj++)
                for (int ii = 0; ii < N; ii++)
                {
                    int j0 = jj / 2, j1 = Mathf.Min(m - 1, j0 + (jj & 1)), i0 = ii / 2, i1 = (i0 + (ii & 1)) % n;
                    float t = (ii & 1) == 1 && jj > 0 && jj < M ? 0.5f + 0.05f * KvKohina(ii, jj / 2 + 80) : 0.5f;
                    q[jj, ii] = (Vector3.Lerp(p[j0, i0], p[j0, i1], t) + Vector3.Lerp(p[j1, i0], p[j1, i1], t)) * 0.5f;
                }
            // Siirrot pystysuoraan (pinta pysyy korkeuskenttänä): uurteet ja kurut alas; juuri ja reunan ulkolaita paikallaan.
            var v = (Vector3[,])q.Clone();
            float Vaaka(Vector3 a, Vector3 b) { var d = b - a; d.y = 0f; return d.magnitude; }
            for (int jj = 1; jj < M; jj++)
            {
                float vaimennus = Mathf.Clamp01(jj / 2f) * Mathf.Clamp01((M - jj) / 2f);
                for (int ii = 0; ii < N; ii++)
                {
                    int iv = (ii + N - 1) % N, io = (ii + 1) % N;
                    var nn = Vector3.Cross(q[jj + 1, ii] - q[jj - 1, ii], q[jj, io] - q[jj, iv]).normalized;
                    if (nn.y < 0f) nn = -nn;
                    float s;
                    if ((ii & 1) == 1)
                    {
                        // Uurre: syvyys vaihtelee sileästi rinnettä alas (kohina LOD0:n renkailla, välirenkaissa keskiarvo), joten
                        // uurteen seinät ovat tasaisia pitkiä tahkoja.
                        float kohina = (KvKohina(ii, jj / 2 + 40) + KvKohina(ii, (jj + 1) / 2 + 40)) * 0.5f;
                        s = -0.22f * Vaaka(q[jj, iv], q[jj, io]) * (0.8f + 0.2f * kohina);
                    }
                    else
                    {
                        var vierus = (q[jj, (ii + 2) % N] + q[jj, (ii + N - 2) % N]) * 0.5f;
                        float kupera = Vector3.Dot(q[jj, ii] - vierus, nn);
                        s = kupera < 0f ? Mathf.Max(kupera * 0.4f, -0.08f * Vaaka(q[jj, (ii + N - 2) % N], q[jj, (ii + 2) % N])) : 0f;
                    }
                    var w = q[jj, ii] + Vector3.up * (s * vaimennus / Mathf.Max(0.35f, nn.y));
                    w.y = Mathf.Max(0f, w.y);
                    v[jj, ii] = w;
                }
            }

            var savyt = new[] { TvSavy0, TvSavy1, TvSavy2, TvSavy3 };
            Color Savy(int t) => t < 0 ? KsSeepia : savyt[Mathf.Min(3, t)];
            var valo = new Vector3(-0.45f, 0.8f, 0.4f).normalized;
            r.AloitaOsa();
            for (int ii = 0; ii < N; ii++)
            {
                int iq = (ii + 1) % N, i0 = ii / 2, q0 = (i0 + 1) % n;
                bool rinne = kuru[i0] || kuru[q0];
                int uurre = (ii & 1) == 1 ? ii : iq;
                bool vasen = (ii & 1) == 0;
                // Viivoitus kuten vuoressa: uurteen varjon puoleinen seinä askelta tummempana vetona rinteen alaosasta reunan
                // alle; valon puoleinen rinne (luode) puhtaana.
                float kulma = (ii + 0.5f) * Mathf.PI * 2f / N - Mathf.PI * 0.5f;
                var tangentti = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma)) * (vasen ? 1f : -1f);
                bool varjoSeina = Vector3.Dot(tangentti, valo) < -0.02f;
                float valoon = Vector3.Dot(new Vector3(Mathf.Cos(kulma), 0f, Mathf.Sin(kulma)), new Vector3(valo.x, 0f, valo.z).normalized);
                float alku = valoon > 0.3f ? 2f : 0.08f + 0.3f * (0.5f + 0.5f * KvKohina(uurre, 70));      // valon puoli ilman vetoja
                for (int jj = 0; jj < M; jj++)
                {
                    int j0 = jj / 2;
                    // LOD0:n sävy: harjanne vaalein, kurun kylki keskisävy, alin vyö askelta tummempi, osa kasvoista tummempia.
                    int t = Mathf.Max(0, (rinne ? 2 : 3) - (j0 == 0 ? 1 : 0) - (KvKohina(i0 * 5 + j0, 29) > 0.5f ? 1 : 0));
                    float osuus = (jj + 0.5f) / M;
                    bool viiva = varjoSeina && osuus > alku && osuus < 0.92f && KvKohina(uurre * 13 + jj / 2, 71) > -0.75f;
                    var vari = Savy(viiva ? t - 1 : t);
                    Vector3 a = v[jj, ii], b = v[jj + 1, ii], c = v[jj + 1, iq], d = v[jj, iq];
                    if (vasen) { r.KolmioUlos(a, b, c, Vector3.up, vari); r.KolmioUlos(a, c, d, Vector3.up, vari); }
                    else { r.KolmioUlos(a, b, d, Vector3.up, vari); r.KolmioUlos(b, c, d, Vector3.up, vari); }
                }
            }

            // Kraatteri: reunan ulkolaita (rinteen ylin rengas) → pyöristetty reuna → rosoinen harja → sisäseinän jyrkänne →
            // vaaleampi hylly → jyrkänne → LOD0:n sisäseinän alareuna → pohjarengas → pohja. Säteet kärjen suunnan vaakavektorista
            // (LOD0: sisäseinän alareuna = 0,55 × säde), välikärjet LOD0:n kärkien puolivälistä.
            Vector3 Vaakavektori(int i) { var h = p[m + 1, i] - c1 - Vector3.up * (H - 0.075f); h.y = 0f; return h / 0.55f; }
            Vector3 Kerros(int ii, float osuus, float y, int siemen, float kohina)
            {
                int i0 = ii / 2, i1 = (i0 + (ii & 1)) % n;
                var h = (Vaakavektori(i0) + Vaakavektori(i1)) * 0.5f;
                return c1 + h * osuus + Vector3.up * (y + kohina * KvKohina(ii, siemen));
            }
            Vector3 Kesk(int j, int ii) { int i0 = ii / 2, i1 = (i0 + (ii & 1)) % n; return (p[j, i0] + p[j, i1]) * 0.5f; }
            var renkaat = new Vector3[8, N];
            for (int ii = 0; ii < N; ii++)
            {
                var harja = Kesk(m, ii);
                if ((ii & 1) == 1) harja += Vector3.up * (0.006f * KvKohina(ii, 90));             // rosoinen harja välikärjissä
                renkaat[0, ii] = v[M, ii];                                                          // reunan ulkolaita
                renkaat[1, ii] = (v[M, ii] + harja) * 0.5f + Vector3.up * 0.007f;                 // pyöristetty reuna
                renkaat[2, ii] = harja;
                renkaat[3, ii] = Kerros(ii, 0.76f, H - 0.012f, 91, 0.004f);                        // jyrkänteen alareuna
                renkaat[4, ii] = Kerros(ii, 0.7f, H - 0.02f, 92, 0.003f);                          // hyllyn sisälaita
                renkaat[5, ii] = Kerros(ii, 0.605f, H - 0.06f, 93, 0.003f);                        // alempi jyrkänne
                renkaat[6, ii] = Kesk(m + 1, ii);                                                   // LOD0:n sisäseinän alareuna
                renkaat[7, ii] = Kesk(m + 2, ii);                                                   // pohjarengas
            }
            var pohja = c1 + Vector3.up * (H - 0.115f);
            var akseli = c1 + Vector3.up * (H + 0.25f);
            var ulkoKeski = c1 + Vector3.up * (H - 0.3f);
            var kerrosVarit = new[] { TvReuna, TvReuna, TvSeina, TvLaava2, TvSeina, TvSeina, TvPohja };
            for (int ii = 0; ii < N; ii++)
            {
                int iq = (ii + 1) % N;
                for (int k = 0; k < 7; k++)
                {
                    Vector3 a = renkaat[k, ii], b = renkaat[k + 1, ii], c = renkaat[k + 1, iq], d = renkaat[k, iq];
                    var sk = (a + b + c + d) * 0.25f;
                    // Reunan ulkopinta ulos ja ylös, harjasta sisään kaikki kraatterin akselia kohti ja ylös.
                    r.NelioUlos(a, b, c, d, k < 2 ? sk - ulkoKeski : akseli - sk, kerrosVarit[k]);
                }
                r.KolmioUlos(pohja, renkaat[7, ii], renkaat[7, iq], Vector3.up, TvPohja);
            }

            // Laavakielet samoissa kuruissa kuin LOD0:ssa (LOD0:n kuru g → lähitason kärkirivi 2g, alin rengas 2 × ala).
            foreach (var (g, ala) in new[] { (1, 2), (24, 3), (6, 3) }) TvlLaava(r, q, N, M, 2 * g, 2 * ala);

            // Laavapommit rinteellä (pienet irtokappaleet): kulma asteina (−90 = edessä), rengas (0 = juuri) ja koko.
            Vector3 Pinta(float jf, float kulmaAst)
            {
                float iff = Mathf.Repeat(kulmaAst + 90f, 360f) / 360f * N;
                int j0 = Mathf.Min(M - 1, (int)jf), i0 = (int)iff % N, i1 = (i0 + 1) % N;
                float tj = jf - j0, ti = iff - (int)iff;
                return Vector3.Lerp(Vector3.Lerp(v[j0, i0], v[j0, i1], ti), Vector3.Lerp(v[j0 + 1, i0], v[j0 + 1, i1], ti), tj);
            }
            var pommit = new (float kulma, float jf, float koko)[] { (-100f, 1.2f, 0.032f), (-58f, 0.8f, 0.026f), (-135f, 1.7f, 0.026f), (-18f, 0.6f, 0.03f), (-80f, 2.6f, 0.02f), (160f, 1.0f, 0.028f) };
            for (int k = 0; k < pommit.Length; k++)
            {
                var (kulma, jf, koko) = pommit[k];
                TvlPommi(r, Pinta(jf, kulma), koko, kulma * 1.3f + 37f * k, 700 + k);
            }
            r.LopetaOsa();

            // Savupilvi: samat kolme palloa kuin LOD0:ssa, pehmeämpinä ja poimuisina (oma ääriviivaosa).
            r.AloitaOsa();
            var pallot = new[] { (new Vector3(0.1f, 0.585f, 0.12f), 0.07f), (new Vector3(0.19f, 0.64f, 0.14f), 0.066f), (new Vector3(0.13f, 0.7f, 0.17f), 0.058f) };
            for (int k = 0; k < pallot.Length; k++)
            {
                var (c, rad) = pallot[k];
                TvlSavupallo(r, c, rad, rad * 0.86f, rad, 10, 1.1f * k, k % 2 == 0 ? TvSavu : TvSavu2);
            }
            // Pieni savuhattara kraatterin suulla alimman pallon alla: savu nousee kraatterista.
            TvlSavupallo(r, new Vector3(0.062f, 0.528f, 0.09f), 0.032f, 0.026f, 0.03f, 8, 0.4f, TvSavu2);
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason laavakieli kurun kärkiriviä g pitkin reunan ulkolaidasta (rengas M) renkaaseen loppu, leveys ja värit kuten
        /// LOD0:ssa (0,24 → 0,5 LOD0:n kärkivälistä kummallekin puolelle; ylin osa tumma, alempi vaaleampi). Kieli täyttää kurun
        /// levynä LOD0:n pinnan (q) yläpuolella uurteiden (v) päällä: viiden kärjen poikkileikkaus (reuna, reunavalli, uoma,
        /// reunavalli, reuna), joten kieli kohoaa reunavalleina; kärki tylppänä pyöreänä lohkona, keskellä pieni lovi.
        /// </summary>
        static void TvlLaava(Rakentaja r, Vector3[,] q, int N, int M, int g, int loppu)
        {
            Vector3 Ulos(Vector3 piste) { var d = piste - TvKeski(0f); d.y = 0f; return (d.normalized * 0.75f + Vector3.up * 0.66f).normalized; }
            // Piste kärkirivin g sivulla osuudella f LOD0:n kärkivälistä (puoli = −1 tai 1): pinta = uurrettu (reuna) tai LOD0:n.
            Vector3 Sivu(Vector3[,] w, int jj, int puoli, float f)
            {
                float u = f * 2f;                                       // lähitason kärkiväleinä (g → g ± 1 → g ± 2)
                int k1 = (g + puoli + N) % N, k2 = (g + 2 * puoli + N) % N;
                return u <= 1f ? Vector3.Lerp(w[jj, g], w[jj, k1], u) : Vector3.Lerp(w[jj, k1], w[jj, k2], u - 1f);
            }
            Vector3 Piste(int jj, int k, float f)
            {
                var ul = Ulos(q[jj, g]);
                switch (k)
                {
                    case 0: return Sivu(q, jj, -1, f) + ul * 0.004f;
                    case 1: return Sivu(q, jj, -1, f * 0.6f) + ul * 0.012f;
                    case 2: return q[jj, g] + ul * 0.009f;
                    case 3: return Sivu(q, jj, 1, f * 0.6f) + ul * 0.012f;
                    default: return Sivu(q, jj, 1, f) + ul * 0.004f;
                }
            }
            int askelia = M - loppu;
            var edel = new Vector3[5];
            for (int s = 0; s <= askelia; s++)
            {
                int jj = M - s;
                float f = Mathf.Lerp(0.24f, 0.5f, s / (float)Mathf.Max(1, askelia));
                var nyt = new Vector3[5];
                for (int k = 0; k < 5; k++) nyt[k] = Piste(jj, k, f);
                if (s > 0)
                    for (int k = 0; k < 4; k++)
                    {
                        var vari = s <= 2 ? TvLaava : TvLaava2;
                        r.NelioUlos(edel[k], edel[k + 1], nyt[k + 1], nyt[k], Ulos(q[jj, g]), vari);
                    }
                edel = nyt;
            }
            // Tylppä pyöreä kärki kuten LOD0:ssa (reunat 0,28 ja keskus 0,42 LOD0:n vyöstä alempana), keskellä pieni lovi
            // kahden lohkon välissä.
            float[] kielet = { 0.26f, 0.4f, 0.36f, 0.42f, 0.28f };
            var karki = new Vector3[5];
            for (int k = 0; k < 5; k++) karki[k] = Vector3.Lerp(Piste(loppu, k, 0.44f), Piste(loppu - 2, k, 0.44f), kielet[k]);
            for (int k = 0; k < 4; k++) r.NelioUlos(edel[k], edel[k + 1], karki[k + 1], karki[k], Ulos(q[loppu, g]), TvLaava2);
        }

        /// <summary>Laavapommi: pyöristetty epäsäännöllinen kivi (viisi kylkeä eri mittaisina, vino laki), juuri rinteen sisällä;
        /// valosta poispäin olevat kyljet tummempia. 15 kolmiota.</summary>
        static void TvlPommi(Rakentaja r, Vector3 p, float koko, float kierto, int siemen)
        {
            const int k = 5;
            var q = Quaternion.Euler(0f, kierto, 0f);
            float juuri = Mathf.Max(0f, p.y - koko) - p.y;
            var ala = new Vector3[k];
            var ola = new Vector3[k];
            for (int i = 0; i < k; i++)
            {
                float a = (i + 0.3f * KvKohina(siemen, i + 30)) * Mathf.PI * 2f / k, s = koko * (0.8f + 0.3f * KvKohina(siemen, i));
                var suunta = q * new Vector3(Mathf.Cos(a) * s, 0f, Mathf.Sin(a) * s * 0.8f);
                ala[i] = p + suunta + Vector3.up * juuri;
                ola[i] = p + suunta * 0.68f + Vector3.up * (koko * (0.32f + 0.1f * KvKohina(siemen, i + 10)));
            }
            var laki = p + Vector3.up * (koko * 0.5f) + q * new Vector3(0.2f * koko * KvKohina(siemen, 20), 0f, 0.15f * koko * KvKohina(siemen, 21));
            var keski = p + Vector3.up * (koko * 0.15f);
            var valo = new Vector3(-0.45f, 0f, 0.4f);
            for (int i = 0; i < k; i++)
            {
                int j = (i + 1) % k;
                var ulos = ala[i] + ala[j] - p * 2f; ulos.y = 0f;
                r.NelioKeskelta(ala[i], ala[j], ola[j], ola[i], keski, Vector3.Dot(ulos, valo) < 0f ? TvLaava2 : TvSavy0);
                r.KolmioKeskelta(ola[i], ola[j], laki, keski, TvSavy1);
            }
        }

        /// <summary>Lähitason savupallo: 10 sektoria ja viisi vyötä (navat kärkinä), vaakasäde poimuttuu kolmeksi pullistumaksi
        /// (vaihe = kierto); napa samassa kohdassa kuin LOD0:n pallossa (rajat ennallaan). 80 kolmiota.</summary>
        static void TvlSavupallo(Rakentaja r, Vector3 c, float rx, float ry, float rz, int sektorit, float vaihe, Color vari)
        {
            float[] lev = { -Mathf.PI * 0.5f, -0.95f, -0.35f, 0.25f, 0.85f, Mathf.PI * 0.5f };
            Vector3 P(int k, int i)
            {
                float a = (i + 0.5f * (k % 2)) * Mathf.PI * 2f / sektorit, l = lev[k];
                float poimu = 1f + 0.025f * Mathf.Cos(3f * a + vaihe) * Mathf.Cos(l);
                return c + new Vector3(Mathf.Cos(a) * Mathf.Cos(l) * rx * poimu, Mathf.Sin(l) * ry, Mathf.Sin(a) * Mathf.Cos(l) * rz * poimu);
            }
            for (int i = 0; i < sektorit; i++)
            {
                int q = (i + 1) % sektorit;
                r.KolmioKeskelta(P(0, 0), P(1, i), P(1, q), c, vari);
                for (int k = 1; k < 4; k++) r.NelioKeskelta(P(k, i), P(k, q), P(k + 1, q), P(k + 1, i), c, vari);
                r.KolmioKeskelta(P(5, 0), P(4, i), P(4, q), c, vari);
            }
        }

        static Mesh TulivuoriLahi() { var r = new Rakentaja(); TulivuoriLahiOsat(r); return r.Verkko("kategoria-Tulivuori-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaTulivuori3DLahi() => TulivuoriLahi();
    }
}
