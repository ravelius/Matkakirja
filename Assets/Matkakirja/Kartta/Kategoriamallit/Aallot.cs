using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI AALLOT (luonto: meri, joki, järvi, saari), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color AaVaahto = Ramppi(0xf8f4ea), AaHarja = Ramppi(0xf1e8d4), AaKynsi = Ramppi(0xe0d2b8), AaKylki = Ramppi(0xe6d9bd);
        static readonly Color AaSelka = Ramppi(0xd3c1a0), AaSelka2 = Ramppi(0xc2aa82), AaSelka3 = Ramppi(0xab9068);
        static readonly Color AaViiva = Ramppi(0x4f3e2b), AaPutki = Ramppi(0x4a3a28), AaPutki2 = Ramppi(0x6b5238), AaPohja = Ramppi(0x8a6a44);

        /// <summary>
        /// LUONTO: VESI, kaksi murtuvaa aaltoa (merkki-meri.png:n aalto oikeana 3D-esineenä). Aallon etupäässä murtuva kierre
        /// (selkä, vaahtoharja, oikealle kaartuva huuli, sisään kääntyvä kärki, tumma putki, kovera etupinta ja matala häntä)
        /// päätypintana kohti katsojaa (−Z); taaksepäin loivasti kaartuvaa harjalinjaa pitkin poikkileikkaus liukuu
        /// murtumattomaksi mainingiksi ja madaltuu mereen, ja vaahto vaihtuu seepiaksi. Poikkileikkaus nojaa 35° taakse, joten
        /// kierre näkyy ylhäältäkin ja kallistettuna lähes suoraan (eteen kaartuva huuli peittäisi putken 35–90°:n
        /// katselukulmista). Iso aalto takana vasemmalla (korkeus 0,55), pieni edessä oikealla (0,36). Päätypinnassa vaalea
        /// vaahtohuuli ja seepiarunko sekä musteiset kiertoviivat, selässä musteinen virtausviiva ja ison kierteen vieressä
        /// kolme vaahtopisaraa. Leveys 0,95, syvyys 0,79. Ääriviivaosa aaltoa kohden. LOD1: 15 pisteen profiili, kaksi
        /// pyyhkäisyväliä, ei viivoja eikä pisaroita.
        /// </summary>
        static void AallotOsat(Rakentaja r, bool lod1)
        {
            AaProfiilit(lod1, out var kierre, out var maininki, out var varitK, out var varitM, out int huuliA, out int huuliJ);
            // Iso aalto takana vasemmalla: päätypinta edessä, harjalinja loivasti kaartuen taakse.
            var viivatIso = lod1 ? null : new[]
            {
                new[] { new Vector2(0.021f, 0.283f), new Vector2(0.082f, 0.318f), new Vector2(0.149f, 0.295f), new Vector2(0.18f, 0.233f), new Vector2(0.159f, 0.185f) },
                new[] { new Vector2(-0.2f, 0.035f), new Vector2(-0.12f, 0.1f), new Vector2(-0.06f, 0.165f), new Vector2(-0.02f, 0.215f) },
                new[] { new Vector2(-0.1f, 0.03f), new Vector2(-0.04f, 0.085f), new Vector2(-0.01f, 0.14f) },
            };
            var pisarat = lod1 ? null : new[] { new Vector3(0.235f, 0.17f, 0.03f), new Vector3(0.215f, 0.1f, 0.025f), new Vector3(0.26f, 0.11f, 0.02f) };
            AaAalto(r, new Vector3(-0.19f, 0f, -0.14f), new Vector3(-0.15f, 0f, 0.1f), new Vector3(-0.21f, 0f, 0.34f), 2.0f, 0.92f, 35f,
                lod1 ? 2 : 6, kierre, maininki, varitK, varitM, huuliA, huuliJ, viivatIso, pisarat);
            // Pieni aalto edessä oikealla.
            var viivatPieni = lod1 ? null : new[]
            {
                new[] { new Vector2(0.021f, 0.283f), new Vector2(0.082f, 0.318f), new Vector2(0.149f, 0.295f), new Vector2(0.18f, 0.233f) },
                new[] { new Vector2(-0.19f, 0.04f), new Vector2(-0.1f, 0.12f), new Vector2(-0.03f, 0.2f) },
            };
            AaAalto(r, new Vector3(0.27f, 0f, -0.34f), new Vector3(0.3f, 0f, -0.16f), new Vector3(0.26f, 0f, 0.02f), 1.32f, 0.68f, 35f,
                lod1 ? 2 : 5, kierre, maininki, varitK, varitM, huuliA, huuliJ, viivatPieni, null);
        }

        /// <summary>
        /// Aallon profiilit (LOD0, LOD1 ja lähitason pohja): kierre (murtuva pää) ja maininki samoin kärkiindeksein, kaistojen
        /// värit kummallekin ja päätypinnan jako (huuli = vaahto kärkiväleillä huuliA … huuliJ, muu runko).
        /// </summary>
        static void AaProfiilit(bool lod1, out Vector2[] kierre, out Vector2[] maininki, out Color[] varitK, out Color[] varitM, out int huuliA, out int huuliJ)
        {
            var S = AaSelka; var S2 = AaSelka2; var S3 = AaSelka3;
            if (!lod1)
            {
                // Avoin kierre keskipisteen (0,09; 0,225) ympäri: selkä 0–5 (kaista 2–3 on musteinen virtausviiva), huulen
                // ulkopinta 6–11 (säde 0,11), sisään kääntyvä kärki 12, huulen sisäpinta 13–16 (säde 0,07), putken takaseinä
                // 17–18, etupinta 19 ja häntä 20–21.
                kierre = new[]
                {
                    new Vector2(-0.30f, 0f), new Vector2(-0.19f, 0.07f), new Vector2(-0.162f, 0.098f), new Vector2(-0.149f, 0.111f),
                    new Vector2(-0.11f, 0.15f), new Vector2(-0.05f, 0.225f), new Vector2(-0.005f, 0.28f), new Vector2(0.06f, 0.336f),
                    new Vector2(0.148f, 0.325f), new Vector2(0.196f, 0.253f), new Vector2(0.177f, 0.175f), new Vector2(0.126f, 0.148f),
                    new Vector2(0.09f, 0.165f), new Vector2(0.134f, 0.188f), new Vector2(0.158f, 0.243f), new Vector2(0.115f, 0.293f),
                    new Vector2(0.05f, 0.282f), new Vector2(0.015f, 0.2f), new Vector2(0.02f, 0.12f), new Vector2(0.06f, 0.05f),
                    new Vector2(0.16f, 0.014f), new Vector2(0.30f, 0f),
                };
                // Maininki: samat pisteet loivalla kummulla (huulen pisteet eturinteellä järjestyksessä).
                maininki = new[]
                {
                    new Vector2(-0.30f, 0f), new Vector2(-0.19f, 0.06f), new Vector2(-0.162f, 0.081f), new Vector2(-0.149f, 0.091f),
                    new Vector2(-0.11f, 0.12f), new Vector2(-0.05f, 0.16f), new Vector2(-0.005f, 0.18f), new Vector2(0.03f, 0.185f),
                    new Vector2(0.06f, 0.18f), new Vector2(0.085f, 0.17f), new Vector2(0.1f, 0.16f), new Vector2(0.11f, 0.152f),
                    new Vector2(0.115f, 0.147f), new Vector2(0.12f, 0.14f), new Vector2(0.125f, 0.132f), new Vector2(0.13f, 0.124f),
                    new Vector2(0.135f, 0.116f), new Vector2(0.14f, 0.108f), new Vector2(0.15f, 0.09f), new Vector2(0.17f, 0.06f),
                    new Vector2(0.22f, 0.025f), new Vector2(0.30f, 0f),
                };
                varitK = new[] { S3, S2, AaViiva, S2, S, AaHarja, AaVaahto, AaVaahto, AaVaahto, AaKynsi, AaKynsi, AaKynsi, AaPutki2, AaPutki, AaPutki, AaPutki, AaPutki, AaPutki2, AaPohja, S3, S3 };
                varitM = new[] { S2, S, AaViiva, S, S, S, AaHarja, AaKynsi, S, S, S, S, S, S, S, S, S, S2, S2, S2, S2 };
                huuliA = 6; huuliJ = 16;
            }
            else
            {
                kierre = new[]
                {
                    new Vector2(-0.30f, 0f), new Vector2(-0.11f, 0.15f), new Vector2(-0.005f, 0.28f), new Vector2(0.06f, 0.336f),
                    new Vector2(0.148f, 0.325f), new Vector2(0.196f, 0.253f), new Vector2(0.177f, 0.175f), new Vector2(0.126f, 0.148f),
                    new Vector2(0.09f, 0.165f), new Vector2(0.145f, 0.215f), new Vector2(0.115f, 0.293f), new Vector2(0.05f, 0.282f),
                    new Vector2(0.015f, 0.2f), new Vector2(0.06f, 0.05f), new Vector2(0.30f, 0f),
                };
                maininki = new[]
                {
                    new Vector2(-0.30f, 0f), new Vector2(-0.11f, 0.12f), new Vector2(-0.005f, 0.18f), new Vector2(0.04f, 0.185f),
                    new Vector2(0.08f, 0.172f), new Vector2(0.1f, 0.16f), new Vector2(0.11f, 0.152f), new Vector2(0.115f, 0.147f),
                    new Vector2(0.12f, 0.14f), new Vector2(0.125f, 0.132f), new Vector2(0.13f, 0.124f), new Vector2(0.14f, 0.108f),
                    new Vector2(0.15f, 0.09f), new Vector2(0.19f, 0.04f), new Vector2(0.30f, 0f),
                };
                varitK = new[] { S2, S, AaVaahto, AaVaahto, AaVaahto, AaKynsi, AaKynsi, AaKynsi, AaPutki2, AaPutki, AaPutki, AaPutki, AaPutki2, AaPohja };
                varitM = new[] { S2, S, AaHarja, AaKynsi, S, S, S, S, S, S, S, S, S2, S2 };
                huuliA = 2; huuliJ = 11;
            }
        }

        /// <summary>
        /// Yksi aalto: profiili (x = eteenpäin eli harjalinjan oikealle puolelle, y = ylös) pyyhkäistynä harjalinjaa pitkin
        /// (toisen asteen Bézier a → k → b maassa, a edessä). Alkupäässä kierre ja tasainen päätypinta (korvat leikaten,
        /// huuli ja runko omina monikulmioinaan); taaksepäin profiili liukuu mainingiksi (värit varitK → varitM), korkeus
        /// laskee loppua kohti nollaan, ja poikkileikkaus nojaa kallistus-asteen verran taakse. Viivat = päätypinnan
        /// kiertoviivat ja pisarat = vaahtopisarat (x, y, etäisyys pinnasta) profiilin koordinaateissa. Yksi ääriviivaosa.
        /// </summary>
        static void AaAalto(Rakentaja r, Vector3 a, Vector3 k, Vector3 b, float korkeus, float syvyys, float kallistus, int asemia,
            Vector2[] kierre, Vector2[] maininki, Color[] varitK, Color[] varitM, int huuliA, int huuliJ, Vector2[][] viivat, Vector3[] pisarat)
        {
            int np = kierre.Length;
            float cb = Mathf.Cos(kallistus * Mathf.Deg2Rad), sb = Mathf.Sin(kallistus * Mathf.Deg2Rad);
            var pts = new Vector3[asemia + 1, np];
            var prof = new Vector2[asemia + 1, np];
            var kiert = new float[asemia + 1];
            var eta = new float[asemia + 1];
            var sig = new float[asemia + 1];
            var eteen = new Vector3[asemia + 1];
            var ylos = new Vector3[asemia + 1];
            var suunta = new Vector3[asemia + 1];
            for (int j = 0; j <= asemia; j++)
            {
                float t = j / (float)asemia, u = 1f - t;
                var C = a * (u * u) + k * (2f * u * t) + b * (t * t);
                var T = (k - a) * (2f * u) + (b - k) * (2f * t);
                T.y = 0f; T = T.normalized;
                var F = new Vector3(T.z, 0f, -T.x);
                float amp = Mathf.Pow(Mathf.Max(0f, Mathf.Cos(Mathf.PI * 0.5f * Mathf.Pow(t, 2.2f))), 0.5f);
                kiert[j] = Mathf.Pow(Mathf.Max(0f, 1f - t / 0.75f), 1.3f);
                eta[j] = korkeus * amp;
                sig[j] = syvyys * (0.4f + 0.6f * Mathf.Pow(amp, 0.6f));
                eteen[j] = F; suunta[j] = T;
                // Poikkileikkaus nojaa taakse (harjalinjan suuntaan), joten päätypinnan kierre näkyy myös ylhäältä.
                ylos[j] = Vector3.up * cb + T * sb;
                for (int i = 0; i < np; i++)
                {
                    var q = new Vector2(Mathf.Lerp(maininki[i].x, kierre[i].x, kiert[j]), Mathf.Lerp(maininki[i].y, kierre[i].y, kiert[j]));
                    prof[j, i] = q;
                    pts[j, i] = C + F * (q.x * sig[j]) + ylos[j] * (q.y * eta[j]);
                }
            }
            r.AloitaOsa();
            for (int j = 0; j < asemia; j++)
            {
                float e = (eta[j] + eta[j + 1]) * 0.5f, sg = (sig[j] + sig[j + 1]) * 0.5f;
                var F = (eteen[j] + eteen[j + 1]).normalized;
                var U = (ylos[j] + ylos[j + 1]).normalized;
                var varit = (kiert[j] + kiert[j + 1]) * 0.5f > 0.4f ? varitK : varitM;
                for (int i = 0; i + 1 < np; i++)
                {
                    // Profiilin ulkonormaali (−dy, dx) skaalattuna pyyhkäisyn kertoimilla (asemien keskiarvo).
                    float ds = (prof[j, i + 1].x - prof[j, i].x + prof[j + 1, i + 1].x - prof[j + 1, i].x) * 0.5f;
                    float dy = (prof[j, i + 1].y - prof[j, i].y + prof[j + 1, i + 1].y - prof[j + 1, i].y) * 0.5f;
                    var ulos = F * (-dy * e) + U * (ds * sg);
                    r.NelioUlos(pts[j, i], pts[j + 1, i], pts[j + 1, i + 1], pts[j, i + 1], ulos, varit[i]);
                }
            }
            // Päätypinta (alkupää): normaali eteen ja ylös (kohtisuoraan F:ää ja nojaavaa ylös-suuntaa vastaan).
            var eteenpain = Vector3.Cross(ylos[0], eteen[0]).normalized;
            if (Vector3.Dot(eteenpain, suunta[0]) > 0f) eteenpain = -eteenpain;
            // Kaksi monikulmiota: huuli (vaahto) ja runko (vaalea seepia), jaettuna janalla huuliJ → huuliA.
            var huuli = new List<int>();
            for (int i = huuliA; i <= huuliJ; i++) huuli.Add(i);
            var runko = new List<int>();
            for (int i = 0; i <= huuliA; i++) runko.Add(i);
            for (int i = huuliJ; i < np; i++) runko.Add(i);
            foreach (var (osa, vari) in new[] { (huuli, AaVaahto), (runko, AaKylki) })
            {
                var monik = new Vector2[osa.Count];
                for (int i = 0; i < osa.Count; i++) monik[i] = kierre[osa[i]];
                foreach (var (i0, i1, i2) in AaKorvat(monik))
                    r.KolmioUlos(pts[0, osa[i0]], pts[0, osa[i1]], pts[0, osa[i2]], eteenpain, vari);
            }
            Vector3 V(Vector3 q) => a + eteen[0] * (q.x * sig[0]) + ylos[0] * (q.y * eta[0]) + eteenpain * q.z;
            if (viivat != null)
            {
                // Kiertoviivat päätypinnassa: ohut nauha 0,002 pinnan edessä, päät kapenevat.
                foreach (var viiva in viivat)
                    for (int i = 0; i + 1 < viiva.Length; i++)
                    {
                        Vector3 p0 = V(new Vector3(viiva[i].x, viiva[i].y, 0.002f)), p1 = V(new Vector3(viiva[i + 1].x, viiva[i + 1].y, 0.002f));
                        var sivu = Vector3.Cross(eteenpain, p1 - p0).normalized * 0.008f;
                        float kapea0 = i == 0 ? 0.3f : 1f, kapea1 = i + 2 == viiva.Length ? 0.3f : 1f;
                        r.NelioUlos(p0 - sivu * kapea0, p1 - sivu * kapea1, p1 + sivu * kapea1, p0 + sivu * kapea0, eteenpain, AaViiva);
                    }
            }
            r.LopetaOsa();
            // Vaahtopisarat päätypinnan edessä; pienet, ei ääriviivaa.
            if (pisarat != null)
                foreach (var q in pisarat)
                    r.Timantti(V(q), 0.6f * q.z, 0.6f * q.z, AaVaahto, 4);
        }

        /// <summary>Yksinkertaisen monikulmion kolmiointi korvia leikaten (viimeisestä kärjestä suljetaan ensimmäiseen).</summary>
        static List<(int, int, int)> AaKorvat(Vector2[] p)
        {
            var tulos = new List<(int, int, int)>();
            var jaljella = new List<int>();
            for (int i = 0; i < p.Length; i++) jaljella.Add(i);
            float Ala(Vector2 a, Vector2 b, Vector2 c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
            float kokonais = 0f;
            for (int i = 0; i < p.Length; i++) { var q = p[(i + 1) % p.Length]; kokonais += p[i].x * q.y - q.x * p[i].y; }
            float merkki = kokonais >= 0f ? 1f : -1f;
            int varmistus = 0;
            while (jaljella.Count > 3 && varmistus++ < 400)
            {
                bool loytyi = false;
                for (int n = 0; n < jaljella.Count; n++)
                {
                    int ia = jaljella[(n + jaljella.Count - 1) % jaljella.Count], ib = jaljella[n], ic = jaljella[(n + 1) % jaljella.Count];
                    if (Ala(p[ia], p[ib], p[ic]) * merkki <= 1e-7f) continue;
                    bool sisalla = false;
                    foreach (int m in jaljella)
                    {
                        if (m == ia || m == ib || m == ic) continue;
                        if (Ala(p[ia], p[ib], p[m]) * merkki >= 0f && Ala(p[ib], p[ic], p[m]) * merkki >= 0f && Ala(p[ic], p[ia], p[m]) * merkki >= 0f) { sisalla = true; break; }
                    }
                    if (sisalla) continue;
                    tulos.Add((ia, ib, ic));
                    jaljella.RemoveAt(n);
                    loytyi = true;
                    break;
                }
                if (!loytyi) break;
            }
            if (jaljella.Count == 3) tulos.Add((jaljella[0], jaljella[1], jaljella[2]));
            return tulos;
        }

        static Mesh AallotRunko() { var r = new Rakentaja(); AallotOsat(r, false); return r.Verkko("kategoria-Aallot"); }
        static Mesh AallotLod1() { var r = new Rakentaja(); AallotOsat(r, true); return r.Verkko("kategoria-Aallot-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaAallot3D(bool lod1 = false) => lod1 ? AallotLod1() : AallotRunko();

        static readonly bool aallotMalli = RekisteroiKategoria(Kategoriasymboli.Aallot, new Erikoismalli { Runko = AallotRunko, Lod1 = AallotLod1, Lahi = AallotLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: samat kaksi murtuvaa aaltoa lähizoomiin (korvaa LOD0:n vain lähellä, enintään kolme lähintä). Samat
        /// harjalinjat, mitat, kallistus, profiilit ja värit kuin LOD0:ssa (<see cref="AaProfiilit"/>, <see cref="AaAalto"/>),
        /// joten siluetti ja sommitelma pysyvät (rajat samat paitsi syvyys +0,0025 tiheämmän pyyhkäisyn vuoksi), mutta 2 471
        /// kolmiota (LOD0 554, noin 4,5 ×) lähikuvan yksityiskohtiin: profiilin kärkivälit puolitettuina sileästi (pyöreämpi
        /// kierre ja huuli), pyyhkäisy kaksinkertaisena (sileä harjalinja), selässä kolme musteista virtausviivaa yhden
        /// sijaan, päätypinnan kiertoviivat sileinä ja rungossa kaksi (pienessä yksi) lisäviivaa kuvamerkin kaiverruksen
        /// tapaan, huulen etureuna kuohuvina pullistumina (tasoittuu mainingissa), vaahtokielet valumassa harjalta selkää
        /// alas ja enemmän eri kokoisia vaahtopisaroita (7 + 2). Ääriviivaosa aaltoa kohden kuten LOD0.
        /// </summary>
        static void AallotLahiOsat(Rakentaja r)
        {
            AalProfiilit(out var kierre, out var maininki, out var varitK, out var varitM, out int huuliA, out int huuliJ);
            AaProfiilit(false, out var kierre0, out var maininki0, out _, out _, out _, out _);
            // Iso aalto takana vasemmalla (kuten LOD0): sileät kiertoviivat ja kaksi lisäviivaa rungossa, seitsemän pisaraa.
            Vector3 aI = new Vector3(-0.19f, 0f, -0.14f), kI = new Vector3(-0.15f, 0f, 0.1f), bI = new Vector3(-0.21f, 0f, 0.34f);
            var viivatIso = new[]
            {
                AalSilea(new[] { new Vector2(0.021f, 0.283f), new Vector2(0.082f, 0.318f), new Vector2(0.149f, 0.295f), new Vector2(0.18f, 0.233f), new Vector2(0.159f, 0.185f) }),
                AalSilea(new[] { new Vector2(-0.2f, 0.035f), new Vector2(-0.12f, 0.1f), new Vector2(-0.06f, 0.165f), new Vector2(-0.02f, 0.215f) }),
                AalSilea(new[] { new Vector2(-0.1f, 0.03f), new Vector2(-0.04f, 0.085f), new Vector2(-0.01f, 0.14f) }),
                AalSilea(new[] { new Vector2(-0.155f, 0.022f), new Vector2(-0.1f, 0.075f), new Vector2(-0.058f, 0.128f) }),
                AalSilea(new[] { new Vector2(-0.035f, 0.018f), new Vector2(-0.008f, 0.05f), new Vector2(0.004f, 0.088f) }),
            };
            var pisaratIso = new[]
            {
                new Vector3(0.235f, 0.17f, 0.03f), new Vector3(0.215f, 0.1f, 0.025f), new Vector3(0.26f, 0.11f, 0.02f),
                new Vector3(0.255f, 0.205f, 0.016f), new Vector3(0.28f, 0.15f, 0.013f), new Vector3(0.245f, 0.06f, 0.014f), new Vector3(0.29f, 0.08f, 0.011f),
            };
            AaAalto(r, aI, kI, bI, 2.0f, 0.92f, 35f, 12, kierre, maininki, varitK, varitM, huuliA, huuliJ, viivatIso, pisaratIso);
            AalVaahtokielet(r, aI, kI, bI, 2.0f, 0.92f, 35f, kierre0, maininki0, new[] { (0.07f, 4.72f), (0.15f, 4.62f), (0.23f, 4.78f), (0.31f, 4.66f) });
            // Pieni aalto edessä oikealla.
            Vector3 aP = new Vector3(0.27f, 0f, -0.34f), kP = new Vector3(0.3f, 0f, -0.16f), bP = new Vector3(0.26f, 0f, 0.02f);
            var viivatPieni = new[]
            {
                AalSilea(new[] { new Vector2(0.021f, 0.283f), new Vector2(0.082f, 0.318f), new Vector2(0.149f, 0.295f), new Vector2(0.18f, 0.233f) }),
                AalSilea(new[] { new Vector2(-0.19f, 0.04f), new Vector2(-0.1f, 0.12f), new Vector2(-0.03f, 0.2f) }),
                AalSilea(new[] { new Vector2(-0.1f, 0.03f), new Vector2(-0.04f, 0.085f), new Vector2(-0.01f, 0.14f) }),
            };
            var pisaratPieni = new[] { new Vector3(0.235f, 0.16f, 0.022f), new Vector3(0.255f, 0.1f, 0.016f) };
            AaAalto(r, aP, kP, bP, 1.32f, 0.68f, 35f, 10, kierre, maininki, varitK, varitM, huuliA, huuliJ, viivatPieni, pisaratPieni);
            AalVaahtokielet(r, aP, kP, bP, 1.32f, 0.68f, 35f, kierre0, maininki0, new[] { (0.09f, 4.7f), (0.2f, 4.6f), (0.3f, 4.75f) });
        }

        /// <summary>
        /// Pyyhkäisyn pinta kuten <see cref="AaAalto"/>:ssa: asema t (0 = päätypinta, 1 = hännän pää) ja profiilin murtoindeksi s
        /// (LOD0:n profiilissa); normaali ulospäin. Lähitason irtoyksityiskohtien paikoitukseen.
        /// </summary>
        static Vector3 AalPinta(Vector3 a, Vector3 k, Vector3 b, float korkeus, float syvyys, float kallistus, Vector2[] kierre, Vector2[] maininki,
            float t, float s, out Vector3 normaali)
        {
            float cb = Mathf.Cos(kallistus * Mathf.Deg2Rad), sb = Mathf.Sin(kallistus * Mathf.Deg2Rad), u = 1f - t;
            var C = a * (u * u) + k * (2f * u * t) + b * (t * t);
            var T = (k - a) * (2f * u) + (b - k) * (2f * t);
            T.y = 0f; T = T.normalized;
            var F = new Vector3(T.z, 0f, -T.x);
            float amp = Mathf.Pow(Mathf.Max(0f, Mathf.Cos(Mathf.PI * 0.5f * Mathf.Pow(t, 2.2f))), 0.5f);
            float kiert = Mathf.Pow(Mathf.Max(0f, 1f - t / 0.75f), 1.3f);
            float eta = korkeus * amp, sig = syvyys * (0.4f + 0.6f * Mathf.Pow(amp, 0.6f));
            var ylos = Vector3.up * cb + T * sb;
            int i0 = Mathf.Min(kierre.Length - 2, (int)s);
            Vector2 P(int i) => AalLerp(maininki[i], kierre[i], kiert);
            var q = AalLerp(P(i0), P(i0 + 1), s - i0);
            var d = P(i0 + 1) - P(i0);
            normaali = (F * (-d.y * eta) + ylos * (d.x * sig)).normalized;
            return C + F * (q.x * sig) + ylos * (q.y * eta);
        }

        /// <summary>
        /// Vaahtokielet selässä: kuohuharjan vaahto (LOD0:n profiilin kaista 5 → 6) valuu kielinä selkää alas (asema t ≤ 0,32,
        /// jossa harja on vielä vaahtoa; kielen kärki profiilin murtoindeksissä); kielen yläreuna leveä, kärki pyöreähkö, 0,004
        /// pinnan yläpuolella. 3 kolmiota kieltä kohden, ei omaa ääriviivaa.
        /// </summary>
        static void AalVaahtokielet(Rakentaja r, Vector3 a, Vector3 k, Vector3 b, float korkeus, float syvyys, float kallistus,
            Vector2[] kierre0, Vector2[] maininki0, (float t, float karki)[] kielet)
        {
            const float yla = 5.3f, lev = 0.028f;
            foreach (var (t, karki) in kielet)
            {
                Vector3 Piste(float tt, float s) { var p = AalPinta(a, k, b, korkeus, syvyys, kallistus, kierre0, maininki0, tt, s, out var n); return p + n * 0.004f; }
                float keski = (yla + karki) * 0.5f;
                Vector3 A = Piste(t - lev, yla), B = Piste(t + lev, yla), C = Piste(t + lev * 0.55f, keski), D = Piste(t - lev * 0.55f, keski), E = Piste(t, karki);
                AalPinta(a, k, b, korkeus, syvyys, kallistus, kierre0, maininki0, t, keski, out var ulos);
                r.NelioUlos(A, B, C, D, ulos, AaVaahto);
                r.KolmioUlos(D, C, E, ulos, AaVaahto);
            }
        }

        /// <summary>
        /// Lähitason profiilit LOD0:n profiileista: jokainen kärkiväli puolitetaan nelipistesäännöllä (samat kärjet, sileä
        /// kierre), paitsi selän kaistat 0 ja 4, joihin lisätään kapea musteinen virtausviiva (LOD0:ssa viiva vain kaistalla 2),
        /// ja huulen etureunan kaistat 8–10, jotka saavat kuohuvan pullistuman. Kaistojen värit periytyvät LOD0:n kaistalta,
        /// huulen rajat siirtyvät uusiin indekseihin.
        /// </summary>
        static void AalProfiilit(out Vector2[] kierre, out Vector2[] maininki, out Color[] varitK, out Color[] varitM, out int huuliA, out int huuliJ)
        {
            AaProfiilit(false, out var k0, out var m0, out var vk0, out var vm0, out int a0, out int j0);
            var k = new List<Vector2>(); var mm = new List<Vector2>(); var vk = new List<Color>(); var vm = new List<Color>();
            var indeksi = new int[k0.Length];
            for (int i = 0; i < k0.Length; i++)
            {
                indeksi[i] = k.Count;
                k.Add(k0[i]); mm.Add(m0[i]);
                if (i + 1 == k0.Length) break;
                float[] viiva = i == 0 ? new[] { 0.5f, 0.62f } : i == 4 ? new[] { 0.42f, 0.56f } : null;
                if (i >= 8 && i <= 10)
                {
                    // Huulen etureuna kuohuna (kuvamerkin vaahtoharja): kaistan kolme välipistettä työnnetään kierteen keskeltä
                    // ulospäin (0,011; 0,019; 0,011), joten reunaan tulee pyöreä pullistuma ja LOD0:n kärkiin lovet. Vain
                    // kierteessä: taaempana, missä profiili liukuu mainingiksi, kuohu tasoittuu.
                    var keski = new Vector2(0.09f, 0.225f);
                    float[] osuudet = { 0.25f, 0.5f, 0.75f }, tyonto = { 0.011f, 0.019f, 0.011f };
                    for (int t = 0; t < 3; t++)
                    {
                        var q = t == 1 ? AalPuoli(k0, i) : AalLerp(k0[i], k0[i + 1], osuudet[t]);
                        k.Add(q + (q - keski).normalized * tyonto[t]);
                        mm.Add(AalLerp(m0[i], m0[i + 1], osuudet[t]));
                    }
                    for (int t = 0; t < 4; t++) { vk.Add(vk0[i]); vm.Add(vm0[i]); }
                }
                else if (viiva != null)
                {
                    foreach (float f in viiva) { k.Add(AalLerp(k0[i], k0[i + 1], f)); mm.Add(AalLerp(m0[i], m0[i + 1], f)); }
                    vk.Add(vk0[i]); vk.Add(AaViiva); vk.Add(vk0[i]);
                    vm.Add(vm0[i]); vm.Add(AaViiva); vm.Add(vm0[i]);
                }
                else
                {
                    k.Add(AalPuoli(k0, i)); mm.Add(AalPuoli(m0, i));
                    vk.Add(vk0[i]); vk.Add(vk0[i]); vm.Add(vm0[i]); vm.Add(vm0[i]);
                }
            }
            // Huulen laki ei nouse LOD0:n lakea korkeammaksi (rajat ennallaan): puolivälit leikataan LOD0:n suurimpaan korkeuteen.
            float yMax = 0f, mMax = 0f;
            foreach (var q in k0) yMax = Mathf.Max(yMax, q.y);
            foreach (var q in m0) mMax = Mathf.Max(mMax, q.y);
            for (int i = 0; i < k.Count; i++) { k[i] = new Vector2(k[i].x, Mathf.Min(k[i].y, yMax)); mm[i] = new Vector2(mm[i].x, Mathf.Min(mm[i].y, mMax)); }
            kierre = k.ToArray(); maininki = mm.ToArray(); varitK = vk.ToArray(); varitM = vm.ToArray();
            huuliA = indeksi[a0]; huuliJ = indeksi[j0];
        }

        static Vector2 AalLerp(Vector2 a, Vector2 b, float t) => a + (b - a) * t;

        /// <summary>Nelipistesäännön puoliväli kärkien i ja i + 1 välissä (päissä suora puoliväli).</summary>
        static Vector2 AalPuoli(Vector2[] P, int i) =>
            i >= 1 && i + 2 < P.Length ? (P[i] + P[i + 1]) * (9f / 16f) - (P[i - 1] + P[i + 2]) * (1f / 16f) : (P[i] + P[i + 1]) * 0.5f;

        /// <summary>Murtoviiva sileämmäksi: jokaisen välin puoliväli nelipistesäännöllä.</summary>
        static Vector2[] AalSilea(Vector2[] P)
        {
            var tulos = new List<Vector2>();
            for (int i = 0; i < P.Length; i++) { tulos.Add(P[i]); if (i + 1 < P.Length) tulos.Add(AalPuoli(P, i)); }
            return tulos.ToArray();
        }

        static Mesh AallotLahi() { var r = new Rakentaja(); AallotLahiOsat(r); return r.Verkko("kategoria-Aallot-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaAallot3DLahi() => AallotLahi();
    }
}
