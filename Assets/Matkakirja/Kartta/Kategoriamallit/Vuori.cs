using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI VUORI (luonto: vuori), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// LUONTO: VUORI (merkki-vuori.png oikeana 3D-esineenä). Terävä päähuippu hieman keskeltä taaksepäin, neljä harjannetta
        /// (pitkät itään ja länteen kuten kuvamerkin rinteet, lyhyemmät eteen ja taakse), oikean harjanteen sivuhuippu, kurut
        /// harjanteiden välissä tummempina ja rosoinen lumiraja (lumi vaalein, varjopuoli hieman tummempi). Juuri maassa
        /// epäsäännöllisenä soikiona (0,9 × 0,6), korkeus 0,72, ei jalustaa. Ylhäältä: tähtimäinen harjanne- ja lumikuvio, kallistettuna
        /// kuvamerkin siluetti. Yksi ääriviivaosa. LOD1: harvempi verkko.
        /// </summary>
        static void VuoriRinteet(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 12 : 26, m = lod1 ? 3 : 7;
            var p = VuoriRuudukko(n, m, out var harj);
            var huippu = p[0, 0];
            // Tahkojen suunnan viitepiste syvällä maan alla: rinne on korkeuskenttä, joten jokainen tahko katsoo ylös.
            // (Keskipiste 0,2 × huipun korkeudella käänsi juuren loivat tahkot nurin: LOD0:ssa 38/338, k1-löydös.)
            var keski = new Vector3(huippu.x, -4f, huippu.z);
            Color Vari(float korkeus, int i)
            {
                // Lumiraja rosoisena: 0,62–0,74 huipun korkeudesta harjanteen ja kohinan mukaan.
                float raja = huippu.y * (0.7f - 0.1f * harj[i] + 0.06f * KvKohina(i, 11));
                if (korkeus > raja) return harj[i] > 0.3f ? KvLumi : KvLumiVarjo;
                return harj[i] > 0.35f ? KvHarjanne : harj[i] > 0.15f ? KvRinne : KvKuru;
            }
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                for (int j = 0; j < m; j++)
                {
                    float kork = (p[j, i].y + p[j + 1, i].y + p[j, q].y + p[j + 1, q].y) * 0.25f;
                    var c = Vari(kork, harj[i] >= harj[q] ? i : q);
                    if (j == 0) r.KolmioKeskelta(p[0, i], p[1, i], p[1, q], keski, c);
                    else r.NelioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], p[j, q], keski, c);
                }
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Rinteiden kärkiruudukko (LOD0, LOD1 ja lähitason pohja): p[j, i], renkaat j = 0 (huippu, kaikki i samassa
        /// pisteessä) … m (juuri maassa), kärjet i kiertäen itä = 0; harj[i] = harjanteen voimakkuus kärjen suunnassa.
        /// </summary>
        static Vector3[,] VuoriRuudukko(int n, int m, out float[] harj)
        {
            var huippu = new Vector3(0.02f, 0.72f, 0.03f);
            // Harjanteet: suunta (rad, 0 = itä, π/2 = pohjoinen/taakse), voimakkuus ja leveys.
            var harjanteet = new (float a, float voima, float leveys)[]
            {
                (0.05f, 0.55f, 0.32f), (Mathf.PI + 0.08f, 0.5f, 0.3f), (-Mathf.PI * 0.5f + 0.25f, 0.35f, 0.26f), (Mathf.PI * 0.5f - 0.2f, 0.3f, 0.28f),
                (-0.55f, 0.18f, 0.2f), (Mathf.PI + 0.6f, 0.16f, 0.2f),
            };
            float Harjanne(float a)
            {
                float h = 0f;
                foreach (var (ha, voima, lev) in harjanteet)
                {
                    float da = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, ha * Mathf.Rad2Deg)) * Mathf.Deg2Rad;
                    h += voima * Mathf.Exp(-(da / lev) * (da / lev));
                }
                return h;
            }
            var p = new Vector3[m + 1, n];
            harj = new float[n];
            for (int i = 0; i < n; i++)
            {
                float a = i * Mathf.PI * 2f / n;
                harj[i] = Harjanne(a);
                // Pohjan säde: soikio, harjanteiden kohdalla pidempi, ja rosoa.
                float R = 1f / Mathf.Sqrt(Mathf.Pow(Mathf.Cos(a) / 0.45f, 2f) + Mathf.Pow(Mathf.Sin(a) / 0.3f, 2f));
                R *= 0.86f + 0.3f * harj[i] + 0.05f * KvKohina(i, 7);
                for (int j = 0; j <= m; j++)
                {
                    float rr = j / (float)m;
                    if (j == 0) { p[j, i] = huippu; continue; }
                    // Korkeus: kupera laskeva profiili, harjanteet pysyvät korkeampina keskivälillä, rosoa.
                    // Kovera profiili (terävä huippu, loiveneva juuri); harjanteet veitsenteräksi, kurut syvemmiksi.
                    float h = huippu.y * Mathf.Pow(1f - rr, 1.9f) * (1f + 0.9f * harj[i] * Mathf.Sin(Mathf.PI * Mathf.Pow(rr, 0.8f)) - 0.18f * (1f - Mathf.Min(1f, harj[i] * 3f)) * Mathf.Sin(Mathf.PI * rr));
                    // Rosoinen harjanne: harjanteilla kohina on isompi (hammasmainen siluetti kuten kuvamerkissä).
                    h += (0.025f + 0.05f * harj[i]) * KvKohina(i * 31 + j, 3) * Mathf.Sin(Mathf.PI * rr);
                    // Sivuhuippu itäisellä (oikealla) harjanteella.
                    float dI = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, 5f)) * Mathf.Deg2Rad;
                    h += 0.2f * Mathf.Exp(-(dI / 0.18f) * (dI / 0.18f)) * Mathf.Exp(-Mathf.Pow((rr - 0.42f) / 0.1f, 2f));
                    // Länsiharjanteen pienempi kyhmy (kuvamerkin vasen rinne).
                    float dL = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, 185f)) * Mathf.Deg2Rad;
                    h += 0.09f * Mathf.Exp(-(dL / 0.18f) * (dL / 0.18f)) * Mathf.Exp(-Mathf.Pow((rr - 0.6f) / 0.1f, 2f));
                    if (j == m) h = 0f;
                    // Säteen tihennys huipun ympärille (terävä kärki): paikka rr^1,15, korkeus yllä rr:stä.
                    float x = huippu.x + Mathf.Cos(a) * R * Mathf.Pow(rr, 1.15f), z = huippu.z + Mathf.Sin(a) * R * Mathf.Pow(rr, 1.15f);
                    p[j, i] = new Vector3(x, Mathf.Max(0f, h), z);
                }
            }
            return p;
        }

        static Mesh VuoriRunko() { var r = new Rakentaja(); VuoriRinteet(r, false); return r.Verkko("kategoria-Vuori"); }
        static Mesh VuoriLod1() { var r = new Rakentaja(); VuoriRinteet(r, true); return r.Verkko("kategoria-Vuori-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaVuori3D(bool lod1 = false) => lod1 ? VuoriLod1() : VuoriRunko();

        static readonly bool vuoriMalli = RekisteroiKategoria(Kategoriasymboli.Vuori, new Erikoismalli { Runko = VuoriRunko, Lod1 = VuoriLod1, Lahi = VuoriLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama vuori lähizoomiin (korvaa LOD0:n vain lähellä, enintään kolme lähintä). Pohjana LOD0:n oma
        /// kärkiruudukko (<see cref="VuoriRuudukko"/>, kärjet paikallaan), joten siluetti, mittasuhteet, rajat, harjanteet,
        /// sivuhuippu, värit ja lumihuippu ovat samat, mutta 1 488 kolmiota (LOD0 338, noin 4,4 ×) lähikuvan yksityiskohtiin:
        /// ruudukko kaksinkertaisena kumpaankin suuntaan; rinteillä rinnettä alas kulkevat uurteet, joiden varjon puoleinen
        /// seinä on askelta tummempi katkeileva veto (kuvamerkin kaiverrusviivoitus: varjon puolella pitkät, luoteen valon
        /// puolella lyhyet); kurut syvempinä; pääharjanteilla rosoiset hampaat; lumiraja tiheämpänä sahalaitana ja lumikielet
        /// uurteissa rajan alapuolella; seitsemän lohkaretta kurujen suilla juurella. Siirrot ovat pystysuoria, joten pinta
        /// pysyy korkeuskenttänä, ja tahkot suunnataan ylös (LOD0:ssa osa juuren loivista tahkoista on nurin ja ääriviiva
        /// näkyy niiden läpi; lähitasossa ei). Kaiverrustyyli ennallaan: seepiarampin värit ja lumen kärkivärit. Yksi
        /// ääriviivaosa kuten LOD0.
        /// </summary>
        static void VuoriLahiRinteet(Rakentaja r)
        {
            const int n = 26, m = 7, N = 2 * n, M = 2 * m;
            var p = VuoriRuudukko(n, m, out var harj);
            var huippu = p[0, 0];
            // Pohja: LOD0:n kärjet paikallaan (parilliset indeksit), välikärjet LOD0:n tahkoilta.
            var q = new Vector3[M + 1, N];
            for (int jj = 0; jj <= M; jj++)
                for (int ii = 0; ii < N; ii++)
                {
                    int j0 = jj / 2, j1 = Mathf.Min(m, j0 + (jj & 1)), i0 = ii / 2, i1 = (i0 + (ii & 1)) % n;
                    // Uurteen paikka kaistaleella vaihtelee (0,38–0,62), joten uurteet eivät ole säännöllinen kampa.
                    float t = (ii & 1) == 1 && jj > 0 && jj < M ? 0.5f + 0.12f * KvKohina(ii, jj / 2 + 80) : 0.5f;
                    var ala = Vector3.Lerp(p[j0, i0], p[j0, i1], t);
                    var yla = Vector3.Lerp(p[j1, i0], p[j1, i1], t);
                    q[jj, ii] = (ala + yla) * 0.5f;
                }
            // Siirrot pystysuoraan (pinta pysyy korkeuskenttänä, ei poimuja): uurteet (kulmavälikärjet) ja kurut alas, harjanteen
            // hampaat ylös. Syvyys s on pinnan normaalin suunnassa ja jaetaan normaalin pystykomponentilla (jyrkässä seinässä sama
            // uurteen syvyys kuin loivassa).
            var v = (Vector3[,])q.Clone();
            float Vaaka(Vector3 a, Vector3 b) { var d = b - a; d.y = 0f; return d.magnitude; }
            for (int jj = 1; jj < M; jj++)
            {
                float rr = jj / (float)M, vaimennus = Mathf.Clamp01((rr - 0.05f) / 0.2f) * Mathf.Clamp01((1f - rr) / 0.12f);
                for (int ii = 0; ii < N; ii++)
                {
                    int iv = (ii + N - 1) % N, io = (ii + 1) % N;
                    var nn = Vector3.Cross(q[jj, io] - q[jj, iv], q[jj + 1, ii] - q[jj - 1, ii]).normalized;
                    if (nn.y < 0f) nn = -nn;
                    float s;
                    if ((ii & 1) == 1)
                    {
                        // Uurre: syvyys 0,24 × LOD0:n kärkiväli vaakatasossa (kaiverruksen viivoitus rinnettä alas).
                        // Parittomilla renkailla matalampi: uurre on kallion taitteissa katkeileva, ei tasainen kouru.
                        s = -0.24f * Vaaka(q[jj, iv], q[jj, io]) * (0.75f + 0.25f * KvKohina(ii, jj + 40)) * ((jj & 1) == 1 ? 0.55f : 1f);
                    }
                    else
                    {
                        var vierus = (q[jj, (ii + 2) % N] + q[jj, (ii + N - 2) % N]) * 0.5f;
                        float kupera = Vector3.Dot(q[jj, ii] - vierus, nn);
                        int i = ii / 2;
                        if (kupera < 0f) s = Mathf.Max(kupera * 0.5f, -0.1f * Vaaka(q[jj, (ii + N - 2) % N], q[jj, (ii + 2) % N]));   // kuru syvemmäksi
                        else if ((jj & 1) == 1 && harj[i] > 0.2f)                                                                     // harjanteen hammas
                            s = (0.008f + 0.012f * (0.5f + 0.5f * KvKohina(i * 7 + jj, 50))) * Mathf.Clamp01((harj[i] - 0.2f) / 0.3f);
                        else if ((jj & 1) == 1) s = 0.004f * KvKohina(i * 7 + jj, 51);                                              // kylkikallion kyhmy
                        else s = 0f;
                    }
                    var w = q[jj, ii] + Vector3.up * (s * vaimennus / Mathf.Max(0.35f, nn.y));
                    w.y = Mathf.Clamp(w.y, 0f, huippu.y - 0.004f);
                    v[jj, ii] = w;
                }
            }
            float Raja(int i) => huippu.y * (0.7f - 0.1f * harj[i] + 0.06f * KvKohina(i, 11));
            var valo = new Vector3(-0.45f, 0.8f, 0.4f).normalized;
            Color Vari(Vector3 a, Vector3 b, Vector3 c, int i, int uurteella, int uurre, bool viiva)
            {
                // LOD0:n väri kaistaleen värikärjestä; lumiraja uurteessa alempana (lumikieli), kylkiharjalla ylempänä.
                float raja = Raja(i) + huippu.y * (uurteella >= 2 ? -(0.02f + 0.07f * (0.5f + 0.5f * KvKohina(uurre, 60))) : 0.015f);
                if ((a.y + b.y + c.y) / 3f > raja) return harj[i] > 0.3f ? KvLumi : KvLumiVarjo;
                // Viivoitus: askelta tummempi (harjanne → rinne → kuru → seepia).
                if (harj[i] > 0.35f) return viiva ? KvRinne : KvHarjanne;
                if (harj[i] > 0.15f) return viiva ? KvKuru : KvRinne;
                return viiva ? KsSeepia : KvKuru;
            }
            r.AloitaOsa();
            for (int ii = 0; ii < N; ii++)
            {
                int iq = (ii + 1) % N, i0 = ii / 2, i1 = (i0 + 1) % n, iv = harj[i0] >= harj[i1] ? i0 : i1;
                int uurre = (ii & 1) == 1 ? ii : iq;                    // tämän puolikaistaleen uurre (pariton indeksi)
                bool vasen = (ii & 1) == 0;                              // uurre oikealla (iq), muuten vasemmalla (ii)
                // Kaiverruksen viivoitus: uurteen varjon puoleinen seinä (seinä kallistuu uurretta kohti, poispäin luoteen valosta)
                // tummempana vetona lumirajan alta rinteelle; vedon pituus uurteittain, valon puolella lyhyempi.
                float kulma = (ii + 0.5f) * Mathf.PI * 2f / N;
                var tangentti = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma)) * (vasen ? 1f : -1f);
                bool varjoSeina = Vector3.Dot(tangentti, valo) < -0.02f;
                float valoon = Vector3.Dot(new Vector3(Mathf.Cos(kulma), 0f, Mathf.Sin(kulma)), new Vector3(valo.x, 0f, valo.z).normalized);
                float loppu = valoon > 0.3f ? 0.3f + 0.2f * (0.5f + 0.5f * KvKohina(uurre, 70)) : 0.6f + 0.36f * (0.5f + 0.5f * KvKohina(uurre, 70));
                for (int jj = 0; jj < M; jj++)
                {
                    Vector3 a = v[jj, ii], b = v[jj + 1, ii], c = v[jj + 1, iq], d = v[jj, iq];
                    float rr = (jj + 0.5f) / M;
                    // Vedot katkeilevat (noin joka neljäs pari soluja väliin), kuten käsin kaiverretussa viivoituksessa.
                    bool viiva = varjoSeina && rr > 0.12f && rr < loppu && KvKohina(uurre * 13 + jj / 2, 71) > -0.5f;
                    void Kolmio(Vector3 k0, Vector3 k1, Vector3 k2, int uurteella) =>
                        r.KolmioUlos(k0, k1, k2, Vector3.up, Vari(k0, k1, k2, iv, uurteella, uurre, viiva));
                    if (jj == 0) { Kolmio(huippu, b, c, 1); continue; }
                    // Lävistäjä peilattuna uurteen suhteen: uurteen puoleiset kolmiot saavat kaksi uurrekärkeä.
                    if (vasen) { Kolmio(a, b, c, 1); Kolmio(a, c, d, 2); }
                    else { Kolmio(a, b, d, 2); Kolmio(b, c, d, 1); }
                }
            }
            // Lohkareet kurujen suilla juurella (pienet irtokappaleet kuten Kaaren irtokivet), rinteeseen upotettuina.
            Vector3 Pinta(float jf, float kulmaAst)
            {
                float iff = Mathf.Repeat(kulmaAst, 360f) / 360f * N;
                int j0 = Mathf.Min(M - 1, (int)jf), i0 = (int)iff % N, i1 = (i0 + 1) % N;
                float tj = jf - j0, ti = iff - (int)iff;
                return Vector3.Lerp(Vector3.Lerp(v[j0, i0], v[j0, i1], ti), Vector3.Lerp(v[j0 + 1, i0], v[j0 + 1, i1], ti), tj);
            }
            var lohkareet = new (float kulma, float jf, float koko)[]
            {
                (-15f, 12.2f, 0.03f), (-55f, 12.6f, 0.026f), (-110f, 12.4f, 0.032f), (-160f, 12.8f, 0.024f), (130f, 12.5f, 0.028f),
                (40f, 12.3f, 0.025f), (-95f, 13.2f, 0.018f),
            };
            for (int k = 0; k < lohkareet.Length; k++)
            {
                var (kulma, jf, koko) = lohkareet[k];
                VulLohkare(r, Pinta(jf, kulma), koko, kulma * 1.7f + 20f * k, 900 + k);
            }
            r.LopetaOsa();
        }

        /// <summary>Lohkare: epäsäännöllinen kivi (pohjan ja olan kulmat toistettavasti siirrettyinä, vino laki), juuri
        /// syvällä rinteen sisällä, joten rinteen alapuolelle ei jää rakoa; laki vaalea, valosta poispäin olevat kyljet
        /// kurun sävyssä (kaiverruksen varjopuoli). 12 kolmiota.</summary>
        static void VulLohkare(Rakentaja r, Vector3 p, float koko, float kierto, int siemen)
        {
            var q = Quaternion.Euler(0f, kierto, 0f);
            float hx = koko, hz = koko * 0.75f, h = koko * 0.75f;
            float juuri = Mathf.Max(0f, p.y - koko) - p.y;                       // juuri rinteen sisällä, ei maan alla (rajat ennallaan)
            Vector3 K(float x, float z, int k) => p + q * new Vector3(x + 0.25f * koko * KvKohina(siemen, k), juuri, z + 0.25f * koko * KvKohina(siemen, k + 20));
            var ala = new[] { K(-hx, -hz, 0), K(hx, -hz, 1), K(hx, hz, 2), K(-hx, hz, 3) };
            var yla = new Vector3[4];
            for (int i = 0; i < 4; i++)
            {
                var a = ala[i]; a.y = p.y;
                yla[i] = Vector3.Lerp(a, p, 0.3f) + Vector3.up * (h * (0.7f + 0.25f * KvKohina(siemen, i + 40)));
            }
            var laki = p + Vector3.up * (h * 1.1f) + q * new Vector3(0.2f * koko * KvKohina(siemen, 50), 0f, 0.2f * koko * KvKohina(siemen, 51));
            var keski = p + Vector3.up * (h * 0.3f);
            var valo = new Vector3(-0.45f, 0f, 0.4f);
            for (int i = 0; i < 4; i++)
            {
                int j = (i + 1) % 4;
                var ulos = (ala[i] + ala[j]) * 0.5f - p; ulos.y = 0f;
                r.NelioKeskelta(ala[i], ala[j], yla[j], yla[i], keski, Vector3.Dot(ulos, valo) < 0f ? KvKuru : KvRinne);
                r.KolmioKeskelta(yla[i], yla[j], laki, keski, KvHarjanne);
            }
        }

        static Mesh VuoriLahi() { var r = new Rakentaja(); VuoriLahiRinteet(r); return r.Verkko("kategoria-Vuori-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaVuori3DLahi() => VuoriLahi();
    }
}
