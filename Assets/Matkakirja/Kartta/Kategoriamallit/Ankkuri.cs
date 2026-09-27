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

        static readonly bool ankkuriMalli = RekisteroiKategoria(Kategoriasymboli.Ankkuri, new Erikoismalli { Runko = AnkkuriRunko, Lod1 = AnkkuriLod1 });
    }
}
