using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI ANKKURI (merenkulku), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color AnRauta = Ramppi(0xdccaa6), AnRautaVarjo = Ramppi(0xc3ab82), AnRengas = Ramppi(0xe8dab9);
        static readonly Color AnKoysi = Ramppi(0xeadcbc), AnKoysi2 = Ramppi(0xc7aa7c), AnKoysi3 = Ramppi(0x7d6142), AnMuste = Ramppi(0x3b2f22);

        /// <summary>Ankkurin kallistus taaksepäin (°, kuten rattaalla: pystyssä se näkyisi ylhäältä viivana) ja mittakaava.</summary>
        const float AnKallistus = 25f, AnSkaala = 1.1f;

        /// <summary>
        /// MERENKULKU: ankkuri köysineen (merkki-merenkulku.png oikeana 3D-esineenä, ilman poikkitukkia kuten kuvamerkissä).
        /// Rengas ylhäällä, viistetty varsi, kaarevat käsivarret ja niiden päissä väkäset (kolmion muotoiset kärjet
        /// harjanteineen), alhaalla terävä kruunu. Köysi nousee renkaan aukosta, kiertää renkaan oikean alakaaren yli eteen ja
        /// riippuu vapaana varren oikealla puolella noin varren puoliväliin, alapää kaartuu ulospäin: kolme kierteistä säiettä
        /// (vaalea, keski, tumma) ja musteviiva käännetystä kuoresta. Seisoo kruunullaan ja nojaa 25° taaksepäin, joten
        /// ylhäältäkin näkyy ankkurin muoto. Leveys 0,88, korkeus 0,85. Ääriviivaosat: rengas, varsi ja käsivarret
        /// kärkineen (köysi saa viivansa kuoresta). LOD1 (≤ 200): harvemmat renkaat, kaaret ja köyden palat.
        /// </summary>
        static void AnkkuriOsat(Rakentaja r, bool lod1)
        {
            float fi = AnKallistus * Mathf.Deg2Rad, cf = Mathf.Cos(fi), sf = Mathf.Sin(fi);
            const float korkeus = 0.85f;                                    // paikallinen (renkaan yläreuna)
            float z0 = -(korkeus * AnSkaala * sf) * 0.5f;                   // keskitys: juuri edessä, rengas takana
            Vector3 M(Vector3 p) { p *= AnSkaala; return new Vector3(p.x, p.y * cf - p.z * sf, p.y * sf + p.z * cf + z0); }

            // Rengas: torus renkaan tasossa, putken poikkileikkaus neliö (kärki eteen; LOD1 kolmio).
            {
                int n = lod1 ? 8 : 12, k = lod1 ? 3 : 4;
                var c = new Vector3(0f, 0.765f, 0f); const float R = 0.064f, rp = 0.02f;
                r.AloitaOsa();
                for (int i = 0; i < n; i++)
                    for (int j = 0; j < k; j++)
                    {
                        float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, b0 = j * Mathf.PI * 2f / k, b1 = (j + 1) * Mathf.PI * 2f / k;
                        Vector3 T(float a, float b) => c + new Vector3(Mathf.Cos(a) * (R + rp * Mathf.Cos(b)), Mathf.Sin(a) * (R + rp * Mathf.Cos(b)), rp * Mathf.Sin(b));
                        var keski = c + new Vector3(Mathf.Cos((a0 + a1) * 0.5f), Mathf.Sin((a0 + a1) * 0.5f), 0f) * R;
                        r.NelioKeskelta(M(T(a0, b0)), M(T(a1, b0)), M(T(a1, b1)), M(T(a0, b1)), M(keski), AnRengas);
                    }
                r.LopetaOsa();
            }

            // Varsi: viistetty kuusikulmio (tasainen etupinta), levenee alaspäin; yläpää renkaan sisällä.
            {
                float[] y = lod1 ? new[] { 0.05f, 0.72f } : new[] { 0.05f, 0.4f, 0.72f };
                var p = new Vector3[y.Length, 6];
                for (int s = 0; s < y.Length; s++)
                {
                    float t = (y[s] - 0.05f) / 0.67f, w = Mathf.Lerp(0.037f, 0.027f, t), dd = Mathf.Lerp(0.026f, 0.021f, t);
                    var kulmat = new[] { new Vector3(w, 0f, 0f), new Vector3(w * 0.5f, 0f, dd), new Vector3(-w * 0.5f, 0f, dd), new Vector3(-w, 0f, 0f), new Vector3(-w * 0.5f, 0f, -dd), new Vector3(w * 0.5f, 0f, -dd) };
                    for (int i = 0; i < 6; i++) p[s, i] = kulmat[i] + new Vector3(0f, y[s], 0f);
                }
                r.AloitaOsa();
                for (int s = 0; s + 1 < y.Length; s++)
                    for (int i = 0; i < 6; i++)
                    {
                        int q = (i + 1) % 6;
                        var keski = new Vector3(0f, (y[s] + y[s + 1]) * 0.5f, 0f);
                        r.NelioKeskelta(M(p[s, i]), M(p[s, q]), M(p[s + 1, q]), M(p[s + 1, i]), M(keski), i == 3 || i == 5 ? AnRautaVarjo : AnRauta);
                    }
                int yl = y.Length - 1;
                for (int i = 1; i < 5; i++) r.KolmioUlos(M(p[yl, 0]), M(p[yl, i]), M(p[yl, i + 1]), M(p[yl, 0] + Vector3.up) - M(p[yl, 0]), AnRauta);
                r.LopetaOsa();
            }

            // Käsivarret, väkäset ja kruunu: yksi ääriviivaosa.
            r.AloitaOsa();
            {
                var cK = new Vector3(0f, 0.42f, 0f); const float Ra = 0.37f, loppu = -32f;
                int m = lod1 ? 3 : 5;
                foreach (float sx in new[] { -1f, 1f })
                {
                    var pts = new Vector3[m + 1]; var lev = new float[m + 1]; var syv = new float[m + 1];
                    for (int s = 0; s <= m; s++)
                    {
                        float t = s / (float)m, a = Mathf.Lerp(-90f, loppu, t) * Mathf.Deg2Rad;
                        pts[s] = cK + new Vector3(sx * Mathf.Cos(a) * Ra, Mathf.Sin(a) * Ra, 0f);
                        lev[s] = Mathf.Lerp(0.034f, 0.023f, t); syv[s] = Mathf.Lerp(0.025f, 0.018f, t);
                    }
                    AnPutki(r, M, pts, syv, lev, 4, (j, i) => AnRauta, Vector3.forward, false, false);
                    // Väkänen: litteä kolmio (kärki ylös-ulos, väkä sisään-alas), harjanne edessä ja takana.
                    float ae = loppu * Mathf.Deg2Rad;
                    var E = pts[m];
                    var tng = new Vector3(-sx * Mathf.Sin(ae), Mathf.Cos(ae), 0f);    // kaaren suunta ulospäin
                    var nrm = new Vector3(sx * Mathf.Cos(ae), Mathf.Sin(ae), 0f);     // kaaresta poispäin (alas-ulos)
                    Vector3 T = E + tng * 0.14f + nrm * 0.014f, O = E + nrm * 0.042f - tng * 0.014f, B = E - nrm * 0.08f - tng * 0.09f;
                    var G = (T + O + B) / 3f;
                    foreach (float sz in new[] { -1f, 1f })
                    {
                        var H = G + new Vector3(0f, 0f, sz * 0.026f);
                        r.KolmioKeskelta(M(T), M(O), M(H), M(G), AnRauta);
                        r.KolmioKeskelta(M(O), M(B), M(H), M(G), AnRautaVarjo);
                        r.KolmioKeskelta(M(B), M(T), M(H), M(G), AnRauta);
                    }
                }
                // Kruunu: nelitahkoinen kärki alaspäin käsivarsien liitoksessa.
                var kk = new Vector3(0f, 0.035f, 0f);
                Vector3 ala = new Vector3(0f, 0f, 0f);
                var kul = new[] { new Vector3(0.034f, 0.055f, 0f), new Vector3(0f, 0.055f, 0.024f), new Vector3(-0.034f, 0.055f, 0f), new Vector3(0f, 0.055f, -0.024f) };
                for (int i = 0; i < 4; i++) r.KolmioKeskelta(M(kul[i]), M(kul[(i + 1) % 4]), M(ala), M(kk), AnRautaVarjo);
            }
            r.LopetaOsa();

            // Köysi kuten kuvamerkissä: renkaan aukosta oikean alakaaren yli eteen ja vapaana alas varren oikealle puolelle
            // noin puoliväliin, alapää kaartuu ulos. Kolme säiettä kierteisenä (poikkileikkaus kiertyy 60° palaa kohden) ja
            // musteviiva käännetystä kuoresta. Palat ovat lyhyitä, joten ääriviivapiirto ei paksunna köyttä möykyksi.
            {
                var cR = new Vector3(0f, 0.765f, 0f); float ar = -62f * Mathf.Deg2Rad;
                var u = new Vector3(Mathf.Cos(ar), Mathf.Sin(ar), 0f);
                var Q = cR + u * 0.064f;
                var pts = new System.Collections.Generic.List<Vector3>();
                // Kierros renkaan putken ympäri: takaa (piilossa) aukon kautta eteen.
                foreach (float bd in lod1 ? new[] { 120f, 250f } : new[] { 110f, 180f, 240f, 295f })
                {
                    float b = bd * Mathf.Deg2Rad;
                    pts.Add(Q + (u * Mathf.Cos(b) + Vector3.forward * Mathf.Sin(b)) * 0.038f);
                }
                pts.AddRange(lod1
                    ? new[] { new Vector3(0.074f, 0.628f, -0.016f), new Vector3(0.1f, 0.565f, -0.012f), new Vector3(0.126f, 0.5f, -0.009f), new Vector3(0.18f, 0.452f, -0.008f) }
                    : new[] { new Vector3(0.062f, 0.652f, -0.02f), new Vector3(0.084f, 0.62f, -0.016f), new Vector3(0.099f, 0.585f, -0.013f),
                        new Vector3(0.108f, 0.55f, -0.011f), new Vector3(0.117f, 0.52f, -0.01f), new Vector3(0.134f, 0.494f, -0.009f),
                        new Vector3(0.156f, 0.47f, -0.008f), new Vector3(0.18f, 0.452f, -0.008f) });
                var p = pts.ToArray();
                var sade = new float[p.Length]; var kuori = new float[p.Length];
                for (int i = 0; i < p.Length; i++) { sade[i] = 0.018f; kuori[i] = 0.026f; }
                AnPutki(r, M, p, sade, sade, 3, (j, i) => i == 0 ? AnKoysi : i == 1 ? AnKoysi2 : AnKoysi3, Vector3.forward, true, true, 60f * Mathf.Deg2Rad);
                AnPutki(r, M, p, kuori, kuori, lod1 ? 3 : 4, (j, i) => AnMuste, Vector3.forward, false, false, 0f, true);
            }
        }

        /// <summary>
        /// Putki pisteiden kautta mallin paikallisessa avaruudessa (M muuntaa maailmaan): poikkileikkaus k-kulmio, jonka
        /// puoliakselit s1 (kehyksen normaali) ja s2 (sivuvektori) annetaan pisteittäin; kehys kuljetetaan ilman kiertymää
        /// alkaen ylos0:sta. Väri palan ja tahkon mukaan (kierteellä tahko seuraa säiettä); kierre = poikkileikkauksen kierto
        /// palaa kohden (rad, tahkot kolmioidaan antiprismana); käännetty = tahkot sisäänpäin (musteviivan kuori, joka näkyy
        /// vain putken ääriviivan ympärillä). Päät suljetaan halutessa.
        /// </summary>
        static void AnPutki(Rakentaja r, Func<Vector3, Vector3> M, Vector3[] pts, float[] s1, float[] s2, int k, Func<int, int, Color> vari, Vector3 ylos0,
            bool alkuKansi, bool loppuKansi, float kierre = 0f, bool kaannetty = false)
        {
            int m = pts.Length;
            var ren = new Vector3[m, k];
            var ylos = ylos0;
            for (int j = 0; j < m; j++)
            {
                var t = (j == 0 ? pts[1] - pts[0] : j == m - 1 ? pts[m - 1] - pts[m - 2] : pts[j + 1] - pts[j - 1]).normalized;
                var b = Vector3.Cross(t, ylos);
                if (b.sqrMagnitude < 1e-8f) b = Vector3.Cross(t, Vector3.right);
                b = b.normalized;
                var nn = Vector3.Cross(b, t).normalized;
                ylos = nn;
                for (int i = 0; i < k; i++)
                {
                    float a = i * Mathf.PI * 2f / k + j * kierre;
                    ren[j, i] = pts[j] + nn * (Mathf.Cos(a) * s1[j]) + b * (Mathf.Sin(a) * s2[j]);
                }
            }
            for (int j = 0; j + 1 < m; j++)
            {
                var keski = M((pts[j] + pts[j + 1]) * 0.5f);
                for (int i = 0; i < k; i++)
                {
                    int q = (i + 1) % k;
                    Vector3 A = M(ren[j, i]), B = M(ren[j + 1, i]), C = M(ren[j + 1, q]), D = M(ren[j, q]);
                    if (kaannetty) r.NelioUlos(A, B, C, D, keski - (A + B + C + D) * 0.25f, vari(j, i));
                    else if (kierre != 0f) r.NelioKeskelta(D, A, B, C, keski, vari(j, i));   // lävistäjä B–D: kierretty pala kuperana
                    else r.NelioKeskelta(A, B, C, D, keski, vari(j, i));
                }
            }
            if (alkuKansi)
                for (int i = 1; i + 1 < k; i++)
                    r.KolmioKeskelta(M(ren[0, 0]), M(ren[0, i]), M(ren[0, i + 1]), M(pts[0] + (pts[1] - pts[0]).normalized * 0.01f), vari(0, 0));
            if (loppuKansi)
                for (int i = 1; i + 1 < k; i++)
                    r.KolmioKeskelta(M(ren[m - 1, 0]), M(ren[m - 1, i]), M(ren[m - 1, i + 1]), M(pts[m - 1] + (pts[m - 2] - pts[m - 1]).normalized * 0.01f), vari(m - 2, 0));
        }

        static Mesh AnkkuriRunko() { var r = new Rakentaja(); AnkkuriOsat(r, false); return r.Verkko("kategoria-Ankkuri"); }
        static Mesh AnkkuriLod1() { var r = new Rakentaja(); AnkkuriOsat(r, true); return r.Verkko("kategoria-Ankkuri-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaAnkkuri3D(bool lod1 = false) => lod1 ? AnkkuriLod1() : AnkkuriRunko();

        static readonly bool ankkuriMalli = RekisteroiKategoria(Kategoriasymboli.Ankkuri, new Erikoismalli { Runko = AnkkuriRunko, Lod1 = AnkkuriLod1, Lahi = AnkkuriLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta Erikoismalli.Lahi, 1.0.29) ----

        /// <summary>
        /// LÄHITASO: sama ankkuri köysineen lähizoomiin (Erikoismalli.Lahi: korvaa LOD0:n, kun kartan kerroin ≥ 4, enintään
        /// kolmelle lähimmälle). Sama siluetti, mittasuhteet, värit, rajat ja sommitelma kuin LOD0:ssa (rengas, varsi, kaarevat
        /// käsivarret väkäsineen, kruunu ja renkaasta riippuva köysi; seisoo kruunullaan ja nojaa 25° taakse), mutta 1 758
        /// kolmiota (LOD0 376, noin 4,7 ×) lähikuvan yksityiskohtiin: rengas sileänä toruksena (18 × 8), varren kulmat viistetty
        /// valoreunoiksi ja etupinnassa matala keskiharja, varren pää pyöristettynä silmänä renkaan ympärillä, käsivarret 12
        /// palana harja edessä ja takana (sivukulmat viistetty), väkäsissä keskiharja ja viistetty terä, kruunu kahdeksana
        /// tahkona; köysi LOD0:n reittiä pitkin sileänä käyränä kolmena erillisenä säikeenä (kolmilehtinen, kiertyvä
        /// poikkileikkaus; vaalea, keski ja tumma säie), musteviiva kuuden tahkon käännetystä kuoresta, vapaassa päässä tumma
        /// sidos ja lyhyt purkautunut tupsu. Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi); samat ääriviivaosat kuin
        /// LOD0:ssa (rengas, varsi, käsivarret; köysi kuoren musteviivalla).
        /// </summary>
        static void AnkkuriLahiOsat(Rakentaja r)
        {
            float fi = AnKallistus * Mathf.Deg2Rad, cf = Mathf.Cos(fi), sf = Mathf.Sin(fi);
            const float korkeus = 0.85f;
            float z0 = -(korkeus * AnSkaala * sf) * 0.5f;
            Vector3 M(Vector3 p) { p *= AnSkaala; return new Vector3(p.x, p.y * cf - p.z * sf, p.y * sf + p.z * cf + z0); }

            // Rengas: sama torus (keskiö, säde ja putken paksuus kuin LOD0:ssa), 18 × 8 tahkoa, kärki eteen.
            {
                const int n = 18, k = 8;
                var c = new Vector3(0f, 0.765f, 0f); const float R = 0.064f, rp = 0.02f;
                r.AloitaOsa();
                for (int i = 0; i < n; i++)
                    for (int j = 0; j < k; j++)
                    {
                        float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, b0 = j * Mathf.PI * 2f / k, b1 = (j + 1) * Mathf.PI * 2f / k;
                        Vector3 T(float a, float b) => c + new Vector3(Mathf.Cos(a) * (R + rp * Mathf.Cos(b)), Mathf.Sin(a) * (R + rp * Mathf.Cos(b)), rp * Mathf.Sin(b));
                        var keski = c + new Vector3(Mathf.Cos((a0 + a1) * 0.5f), Mathf.Sin((a0 + a1) * 0.5f), 0f) * R;
                        r.NelioKeskelta(M(T(a0, b0)), M(T(a1, b0)), M(T(a1, b1)), M(T(a0, b1)), M(keski), AnRengas);
                    }
                r.LopetaOsa();
            }

            // Varsi: LOD0:n kuusikulmio (tasainen etupinta, tummat viisteet), kulmat viistetty kapeiksi valoreunoiksi, seitsemän
            // väliä ja yläpää hieman levenevänä silmänä renkaan sisällä.
            {
                float[] y = { 0.05f, 0.1f, 0.22f, 0.34f, 0.46f, 0.58f, 0.66f, 0.72f };
                const int nk = 13;
                var p = new Vector3[y.Length, nk];
                for (int s = 0; s < y.Length; s++)
                {
                    float t = (y[s] - 0.05f) / 0.67f, w = Mathf.Lerp(0.037f, 0.027f, t), dd = Mathf.Lerp(0.026f, 0.021f, t);
                    if (y[s] > 0.63f) { w += 0.002f; dd += 0.001f; }
                    var kulmat = new[] { new Vector3(w, 0f, 0f), new Vector3(w * 0.5f, 0f, dd), new Vector3(-w * 0.5f, 0f, dd), new Vector3(-w, 0f, 0f), new Vector3(-w * 0.5f, 0f, -dd), new Vector3(w * 0.5f, 0f, -dd) };
                    // Kulmat 0–5 viistettyinä (kaksi kärkeä kulmaa kohden) ja etupinnan keskelle matala harja (kärki 10).
                    int o = 0;
                    for (int i = 0; i < 6; i++)
                    {
                        var v = kulmat[i]; var ed = kulmat[(i + 5) % 6]; var se = kulmat[(i + 1) % 6];
                        p[s, o++] = v + (ed - v) * 0.14f + new Vector3(0f, y[s], 0f);
                        p[s, o++] = v + (se - v) * 0.14f + new Vector3(0f, y[s], 0f);
                        if (i == 4) p[s, o++] = new Vector3(0f, y[s], -dd - 0.0035f * Mathf.Clamp01((y[s] - 0.05f) / 0.12f));
                    }
                }
                r.AloitaOsa();
                for (int s = 0; s + 1 < y.Length; s++)
                    for (int i = 0; i < nk; i++)
                    {
                        int q = (i + 1) % nk;
                        var keski = new Vector3(0f, (y[s] + y[s + 1]) * 0.5f, 0f);
                        // Pääpinnat LOD0:n väreillä (tummat viisteet 3 ja 5), kulmaviisteet ja etuharjan puolikkaat vaaleina.
                        int f = i <= 9 ? i / 2 : i == 10 ? 4 : (i - 1) / 2;
                        bool viiste = i <= 9 ? i % 2 == 0 : i == 11;
                        var vari = viiste ? AnRauta : (f == 3 || f == 5 ? AnRautaVarjo : AnRauta);
                        r.NelioKeskelta(M(p[s, i]), M(p[s, q]), M(p[s + 1, q]), M(p[s + 1, i]), M(keski), vari);
                    }
                int yl = y.Length - 1;
                for (int i = 1; i + 1 < nk; i++) r.KolmioUlos(M(p[yl, 0]), M(p[yl, i]), M(p[yl, i + 1]), M(p[yl, 0] + Vector3.up) - M(p[yl, 0]), AnRauta);
                // Silmä: varren pyöristetty pää, jonka läpi rengas kulkee (lieriö x-akselin suuntaan renkaan alimman kohdan ympärillä,
                // päät viistetty).
                var silma = new Vector3(0f, 0.701f, 0f);
                const int ns = 10;
                float[] sx = { -0.029f, -0.0235f, 0.0235f, 0.029f }, sr = { 0.019f, 0.025f, 0.025f, 0.019f };
                Vector3 S(int j, int i) { float a = (i + 0.5f) * Mathf.PI * 2f / ns; return silma + new Vector3(sx[j], Mathf.Cos(a) * sr[j], Mathf.Sin(a) * sr[j]); }
                for (int j = 0; j + 1 < sx.Length; j++)
                    for (int i = 0; i < ns; i++)
                        r.NelioKeskelta(M(S(j, i)), M(S(j, (i + 1) % ns)), M(S(j + 1, (i + 1) % ns)), M(S(j + 1, i)), M(silma), AnRauta);
                foreach (int j in new[] { 0, sx.Length - 1 })
                    for (int i = 1; i + 1 < ns; i++) r.KolmioKeskelta(M(S(j, 0)), M(S(j, i)), M(S(j, i + 1)), M(silma), AnRautaVarjo);
                r.LopetaOsa();
            }

            // Käsivarret, kärjet ja kruunu: yksi ääriviivaosa kuten LOD0:ssa.
            r.AloitaOsa();
            {
                var cK = new Vector3(0f, 0.42f, 0f); const float Ra = 0.37f, loppu = -32f;
                const int m = 12;
                // Poikkileikkaus: LOD0:n timantti (harja edessä ja takana), sivukulmat viistetty kapeiksi pinnoiksi.
                var poikki = new[] { new Vector2(1f, 0f), new Vector2(0.16f, 1f), new Vector2(-0.16f, 1f), new Vector2(-1f, 0f), new Vector2(-0.16f, -1f), new Vector2(0.16f, -1f) };
                foreach (float sx in new[] { -1f, 1f })
                {
                    var pts = new Vector3[m + 1]; var lev = new float[m + 1]; var syv = new float[m + 1];
                    for (int s = 0; s <= m; s++)
                    {
                        float t = s / (float)m, a = Mathf.Lerp(-90f, loppu, t) * Mathf.Deg2Rad;
                        pts[s] = cK + new Vector3(sx * Mathf.Cos(a) * Ra, Mathf.Sin(a) * Ra, 0f);
                        lev[s] = Mathf.Lerp(0.034f, 0.023f, t); syv[s] = Mathf.Lerp(0.025f, 0.018f, t);
                    }
                    AnLhPutki(r, M, pts, syv, lev, poikki, 0f, (j, i) => AnRauta, Vector3.forward, false, false);
                    float ae = loppu * Mathf.Deg2Rad;
                    var E = pts[m];
                    var tng = new Vector3(-sx * Mathf.Sin(ae), Mathf.Cos(ae), 0f);
                    var nrm = new Vector3(sx * Mathf.Cos(ae), Mathf.Sin(ae), 0f);
                    AnLhKarki(r, M, E, tng, nrm);
                }
                // Kruunu: kärki alaspäin, kahdeksan tahkoa ja pyöristetty vyötärö (LOD0:n neljä kulmaa ennallaan).
                var ren1 = new Vector3[8]; var ren2 = new Vector3[8];
                var kul = new[] { new Vector3(0.034f, 0f, 0f), new Vector3(0f, 0f, 0.024f), new Vector3(-0.034f, 0f, 0f), new Vector3(0f, 0f, -0.024f) };
                for (int i = 0; i < 4; i++)
                {
                    ren1[2 * i] = kul[i]; ren1[2 * i + 1] = (kul[i] + kul[(i + 1) % 4]) * 0.5f * 1.12f;
                }
                for (int i = 0; i < 8; i++) { ren2[i] = ren1[i] * 0.56f + new Vector3(0f, 0.026f, 0f); ren1[i] += new Vector3(0f, 0.055f, 0f); }
                var kk = new Vector3(0f, 0.035f, 0f);
                for (int i = 0; i < 8; i++)
                {
                    int q = (i + 1) % 8;
                    r.NelioKeskelta(M(ren1[i]), M(ren1[q]), M(ren2[q]), M(ren2[i]), M(kk), AnRautaVarjo);
                    r.KolmioKeskelta(M(ren2[i]), M(ren2[q]), M(Vector3.zero), M(kk), AnRautaVarjo);
                }
            }
            r.LopetaOsa();

            // Köysi LOD0:n reittiä pitkin (Catmull–Rom LOD0:n pisteiden kautta): kolme erillistä säiettä kolmilehtisenä
            // poikkileikkauksena, joka kiertyy säikeen nousun mukaan (vaalea, keski ja tumma säie kuten LOD0:ssa), musteviiva
            // käännetystä kuoresta, ja vapaassa päässä tumma sidos ja lyhyt purkautunut tupsu.
            {
                var cR = new Vector3(0f, 0.765f, 0f); float ar = -62f * Mathf.Deg2Rad;
                var u = new Vector3(Mathf.Cos(ar), Mathf.Sin(ar), 0f);
                var Q = cR + u * 0.064f;
                var ohj = new System.Collections.Generic.List<Vector3>();
                foreach (float bd in new[] { 110f, 180f, 240f, 295f })
                {
                    float b = bd * Mathf.Deg2Rad;
                    ohj.Add(Q + (u * Mathf.Cos(b) + Vector3.forward * Mathf.Sin(b)) * 0.038f);
                }
                ohj.AddRange(new[] { new Vector3(0.062f, 0.652f, -0.02f), new Vector3(0.084f, 0.62f, -0.016f), new Vector3(0.099f, 0.585f, -0.013f),
                    new Vector3(0.108f, 0.55f, -0.011f), new Vector3(0.117f, 0.52f, -0.01f), new Vector3(0.134f, 0.494f, -0.009f),
                    new Vector3(0.156f, 0.47f, -0.008f), new Vector3(0.18f, 0.452f, -0.008f) });
                var p = AnLhSilea(ohj.ToArray(), 3);
                int np = p.Length;
                // Säikeen nousu: kierre lasketaan kuljetusta matkasta (noin yksi säie köyden paksuuden matkalla).
                var kierto = new float[np];
                for (int i = 1; i < np; i++) kierto[i] = kierto[i - 1] + (p[i] - p[i - 1]).magnitude * (Mathf.PI * 2f / 0.1f);
                var sade = new float[np]; var kuori = new float[np];
                for (int i = 0; i < np; i++) { sade[i] = 0.018f; kuori[i] = 0.0245f; }
                var lehti = new Vector2[6];
                for (int i = 0; i < 6; i++) { float a = i * Mathf.PI / 3f, rr = i % 2 == 0 ? 1f : 0.62f; lehti[i] = new Vector2(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr); }
                AnLhPutki(r, M, p, sade, sade, lehti, 0f, (j, i) => ((i + 1) / 2) % 3 == 0 ? AnKoysi : ((i + 1) / 2) % 3 == 1 ? AnKoysi2 : AnKoysi3,
                    Vector3.forward, true, true, kierto);
                var kuusi = new Vector2[6];
                for (int i = 0; i < 6; i++) { float a = (i + 0.5f) * Mathf.PI / 3f; kuusi[i] = new Vector2(Mathf.Cos(a), Mathf.Sin(a)); }
                AnLhPutki(r, M, p, kuori, kuori, kuusi, 0f, (j, i) => AnMuste, Vector3.forward, false, false, null, true);
                // Sidos vapaan pään lähellä (tumma nauha) ja purkautuneet säikeet sen alla.
                var tn = (p[np - 1] - p[np - 2]).normalized;
                var sp = new[] { p[np - 1] - tn * 0.024f, p[np - 1] - tn * 0.012f };
                AnLhPutki(r, M, sp, new[] { 0.0205f, 0.0205f }, new[] { 0.0205f, 0.0205f }, kuusi, 0f, (j, i) => AnKoysi3, Vector3.forward, false, false);
                var ylos = Vector3.Cross(tn, Vector3.forward).normalized;
                var sivu = Vector3.Cross(tn, ylos).normalized;
                for (int i = 0; i < 3; i++)
                {
                    float a = i * Mathf.PI * 2f / 3f + 0.4f;
                    var o = (ylos * Mathf.Cos(a) + sivu * Mathf.Sin(a)) * 0.009f;
                    var alku = p[np - 1] - tn * 0.004f + o;
                    var loppuP = p[np - 1] + tn * (0.008f + 0.002f * i) + o * 1.6f;
                    AnLhPutki(r, M, new[] { alku, loppuP }, new[] { 0.0072f, 0.0035f }, new[] { 0.0072f, 0.0035f }, new[] { new Vector2(1f, 0f), new Vector2(-0.5f, 0.87f), new Vector2(-0.5f, -0.87f) },
                        0f, (j, q) => i == 0 ? AnKoysi : i == 1 ? AnKoysi2 : AnKoysi3, Vector3.forward, false, true);
                }
            }
        }

        /// <summary>
        /// Lähitason väkänen (LOD0:n kolmio T–O–B samoin mitoin): keskiharja käsivarren päästä kärkeen, harjasta laskevat
        /// sisätahkot, jyrkempi viistetty terä kaikilla kolmella reunalla (valoviiva kuten taotussa terässä) ja 0,008:n
        /// paksuinen reunapinta.
        /// </summary>
        static void AnLhKarki(Rakentaja r, Func<Vector3, Vector3> M, Vector3 E, Vector3 tng, Vector3 nrm)
        {
            Vector3 T = E + tng * 0.14f + nrm * 0.014f, O = E + nrm * 0.042f - tng * 0.014f, B = E - nrm * 0.08f - tng * 0.09f;
            var G = (T + O + B) / 3f;
            // Terän sisäreuna: kolmio kutistettuna (kärki harjaa pitkin), syvyys reunan ja harjan välissä.
            Vector3 T1 = T + (E - T) * 0.14f, O1 = O + (G - O) * 0.3f, B1 = B + (G - B) * 0.24f, R1 = (E + T1) * 0.5f;
            const float reuna = 0.004f, sisa = 0.0115f;
            foreach (float sz in new[] { -1f, 1f })
            {
                var z = new Vector3(0f, 0f, sz);
                Vector3 t0 = T + z * reuna * 0.5f, o0 = O + z * reuna, b0 = B + z * reuna;
                Vector3 t1 = T1 + z * sisa * 0.8f, o1 = O1 + z * sisa, b1 = B1 + z * sisa, h0 = E + z * 0.026f, h1 = R1 + z * 0.019f;
                // Terä (viisteet) reunoilta sisäreunaan.
                r.NelioKeskelta(M(t0), M(o0), M(o1), M(t1), M(G), AnRauta);
                r.NelioKeskelta(M(o0), M(b0), M(b1), M(o1), M(G), AnRautaVarjo);
                r.NelioKeskelta(M(b0), M(t0), M(t1), M(b1), M(G), AnRauta);
                // Sisätahkot harjalle.
                r.KolmioKeskelta(M(h0), M(h1), M(o1), M(G), AnRauta);
                r.KolmioKeskelta(M(h1), M(t1), M(o1), M(G), AnRauta);
                r.KolmioKeskelta(M(h0), M(b1), M(h1), M(G), AnRautaVarjo);
                r.KolmioKeskelta(M(h1), M(b1), M(t1), M(G), AnRautaVarjo);
                r.KolmioKeskelta(M(h0), M(o1), M(b1), M(G), AnRautaVarjo);
            }
            // Reunapinta etu- ja takaterän välissä.
            var P = new[] { T, O, B };
            for (int i = 0; i < 3; i++)
            {
                var a = P[i]; var c = P[(i + 1) % 3];
                float za = i == 0 ? reuna * 0.5f : reuna, zc = i == 2 ? reuna * 0.5f : reuna;
                r.NelioKeskelta(M(a - Vector3.forward * za), M(c - Vector3.forward * zc), M(c + Vector3.forward * zc), M(a + Vector3.forward * za), M(G), AnRauta);
            }
        }

        /// <summary>Catmull–Rom-käyrä ohjauspisteiden kautta: jokainen väli jaetaan jako-osaan (päät pysyvät paikallaan).</summary>
        static Vector3[] AnLhSilea(Vector3[] c, int jako)
        {
            var o = new System.Collections.Generic.List<Vector3>();
            for (int i = 0; i + 1 < c.Length; i++)
            {
                Vector3 p0 = c[Mathf.Max(0, i - 1)], p1 = c[i], p2 = c[i + 1], p3 = c[Mathf.Min(c.Length - 1, i + 2)];
                for (int s = 0; s < jako; s++)
                {
                    float t = s / (float)jako, t2 = t * t, t3 = t2 * t;
                    o.Add((p1 * 2f + (p2 - p0) * t + (p0 * 2f - p1 * 5f + p2 * 4f - p3) * t2 + (p1 * 3f - p0 - p2 * 3f + p3) * t3) * 0.5f);
                }
            }
            o.Add(c[c.Length - 1]);
            return o.ToArray();
        }

        /// <summary>
        /// Putki kuten <see cref="AnPutki"/>, mutta vapaalla poikkileikkauksella: muoto = poikkileikkauksen pisteet
        /// (x kehyksen normaalin suuntaan kertaa s1, y sivuvektorin suuntaan kertaa s2), kierto = poikkileikkauksen kiertokulma
        /// pisteittäin (rad; null = ei kiertoa). Väri palan j ja tahkon i mukaan; käännetty = tahkot sisäänpäin (musteviiva).
        /// </summary>
        static void AnLhPutki(Rakentaja r, Func<Vector3, Vector3> M, Vector3[] pts, float[] s1, float[] s2, Vector2[] muoto, float kulma0, Func<int, int, Color> vari,
            Vector3 ylos0, bool alkuKansi, bool loppuKansi, float[] kierto = null, bool kaannetty = false)
        {
            int m = pts.Length, k = muoto.Length;
            var ren = new Vector3[m, k];
            var ylos = ylos0;
            for (int j = 0; j < m; j++)
            {
                var t = (j == 0 ? pts[1] - pts[0] : j == m - 1 ? pts[m - 1] - pts[m - 2] : pts[j + 1] - pts[j - 1]).normalized;
                var b = Vector3.Cross(t, ylos);
                if (b.sqrMagnitude < 1e-8f) b = Vector3.Cross(t, Vector3.right);
                b = b.normalized;
                var nn = Vector3.Cross(b, t).normalized;
                ylos = nn;
                float kk = kulma0 + (kierto != null ? kierto[j] : 0f), ck = Mathf.Cos(kk), sk = Mathf.Sin(kk);
                for (int i = 0; i < k; i++)
                {
                    float x = muoto[i].x * ck - muoto[i].y * sk, y = muoto[i].x * sk + muoto[i].y * ck;
                    ren[j, i] = pts[j] + nn * (x * s1[j]) + b * (y * s2[j]);
                }
            }
            for (int j = 0; j + 1 < m; j++)
            {
                var keski = M((pts[j] + pts[j + 1]) * 0.5f);
                for (int i = 0; i < k; i++)
                {
                    int q = (i + 1) % k;
                    Vector3 A = M(ren[j, i]), B = M(ren[j + 1, i]), C = M(ren[j + 1, q]), D = M(ren[j, q]);
                    if (kaannetty) r.NelioUlos(A, B, C, D, keski - (A + B + C + D) * 0.25f, vari(j, i));
                    else if (kierto != null) r.NelioKeskelta(D, A, B, C, keski, vari(j, i));
                    else r.NelioKeskelta(A, B, C, D, keski, vari(j, i));
                }
            }
            if (alkuKansi)
                for (int i = 1; i + 1 < k; i++)
                    r.KolmioKeskelta(M(ren[0, 0]), M(ren[0, i]), M(ren[0, i + 1]), M(pts[0] + (pts[1] - pts[0]).normalized * 0.01f), vari(0, 0));
            if (loppuKansi)
                for (int i = 1; i + 1 < k; i++)
                    r.KolmioKeskelta(M(ren[m - 1, 0]), M(ren[m - 1, i]), M(ren[m - 1, i + 1]), M(pts[m - 1] + (pts[m - 2] - pts[m - 1]).normalized * 0.01f), vari(m - 2, 0));
        }

        static Mesh AnkkuriLahi() { var r = new Rakentaja(); AnkkuriLahiOsat(r); return r.Verkko("kategoria-Ankkuri-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaAnkkuri3DLahi() => AnkkuriLahi();
    }
}
