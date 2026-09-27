using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI KELLOTORNI (kulttuuri), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color KtKivi = Ramppi(0xefe4cc), KtKivi2 = Ramppi(0xe3d4b2), KtKivi3 = Ramppi(0xf4ecda), KtPielet = Ramppi(0xbca788);
        static readonly Color KtSisa = Ramppi(0x3b2f22), KtKello = Ramppi(0xc4ad86), KtKatto = Ramppi(0xb09670), KtRaystas = Ramppi(0xdccdab);
        static readonly Color KtHuippu = Ramppi(0x6b5238);

        /// <summary>Tornin puolileveys (varsi), kellokerroksen aukon puolileveys ja seinän paksuus.</summary>
        const float KtW = 0.11f, KtAukko = 0.042f, KtSeina = 0.03f;

        /// <summary>
        /// KULTTUURI: KELLOTORNI (merkki-kulttuuri.png oikeana 3D-esineenä). Hoikka neliön muotoinen kivitorni kuvamerkin
        /// mittasuhtein: porrastettu jalusta viistoine yläosineen, alavarsi kolmena kivikertana (saumat musteytimen päällä),
        /// vyölista, avoin kellokerros (neljä kulmapilaria, joka sivulla suippokaarinen aukko, tumma sisus ja lattia, keskellä
        /// riippuva vaalea kello), kaksiosainen räystäslista, korkea kahdeksankulmainen suippo kypärä (vaalea räystäskaista,
        /// harja edessä kuten kuvamerkissä) ja huipussa pallo ja piikki. Leveys 0,30 (jalusta), varsi 0,22, korkeus 0,91.
        /// Ääriviivaosat: jalusta, jokainen kivikerta, vyölista, kellokerros (kello sen sisällä), räystäslista ja kypärä.
        /// LOD1 (≤ 200): varsi yhtenä kappaleena, aukot tummina suippokaarilaattoina, ei kelloa eikä piikkiä.
        /// </summary>
        static void KellotorniOsat(Rakentaja r, bool lod1)
        {
            const float w = KtW;
            const float jalka = 0.04f, viisto = 0.065f, vyo0 = 0.24f, vyo1 = 0.262f, holvi = 0.455f, karki = 0.495f, kerros1 = 0.53f;
            const float lista0 = 0.54f, lista1 = 0.565f, kyparaK = 0.3f;

            // Jalusta: porras ja viisto yläosa (yksi osa).
            r.AloitaOsa();
            r.Laatikko(Vector3.zero, new Vector3(0.3f, jalka, 0.3f), KtKivi2, KtKivi);
            {
                float a = 0.14f, b = 0.114f;
                var k = new Vector3(0f, jalka, 0f);
                Vector3 V(float x, float y, float z) => new Vector3(x, y, z);
                var ala = new[] { V(-a, jalka, -a), V(a, jalka, -a), V(a, jalka, a), V(-a, jalka, a) };
                var yla = new[] { V(-b, viisto, -b), V(b, viisto, -b), V(b, viisto, b), V(-b, viisto, b) };
                for (int i = 0; i < 4; i++) r.NelioKeskelta(ala[i], ala[(i + 1) % 4], yla[(i + 1) % 4], yla[i], k, KtKivi);
                r.NelioUlos(yla[0], yla[1], yla[2], yla[3], Vector3.up, KtKivi3);
            }
            r.LopetaOsa();

            if (lod1)
            {
                // Varsi ja kellokerros yhtenä kappaleena, aukot tummina laattoina (samassa ääriviivaosassa).
                r.AloitaOsa();
                r.Laatikko(new Vector3(0f, viisto, 0f), new Vector3(2f * w, kerros1 - viisto, 2f * w), KtKivi, KtKivi);
                for (int k = 0; k < 4; k++) KtAukkoLaatta(r, k, w, vyo1 + 0.01f, holvi, karki);
                r.LopetaOsa();
                r.Laatikko(new Vector3(0f, vyo0, 0f), new Vector3(0.252f, vyo1 - vyo0, 0.252f), KtKivi2, KtKivi3);
            }
            else
            {
                // Alavarsi: kolme kivikertaa (saumat näkyvät musteytimen päällä).
                KsYdin(r, new Vector3(0f, (viisto + vyo0) * 0.5f, 0f), new Vector3(w - 0.017f, (vyo0 - viisto) * 0.5f - 0.004f, w - 0.017f));
                float[] kerrat = { viisto, 0.123f, 0.182f, vyo0 };
                var savyt = new[] { KtKivi, KtKivi3, KtKivi2 };
                for (int i = 0; i + 1 < kerrat.Length; i++)
                    KsLohko(r, new Vector3(0f, (kerrat[i] + kerrat[i + 1]) * 0.5f, 0f), new Vector3(w, (kerrat[i + 1] - kerrat[i]) * 0.5f, w), savyt[i], 0f, 0f, true, 0.012f);
                // Vyölista.
                r.Laatikko(new Vector3(0f, vyo0, 0f), new Vector3(0.252f, vyo1 - vyo0, 0.252f), KtKivi2, KtKivi3);
                KtKellokerros(r, w, vyo1, holvi, karki, kerros1);
            }

            // Räystäslista: ohut alalista ja ulkoneva laatta (yksi osa).
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, kerros1, 0f), new Vector3(0.24f, lista0 - kerros1, 0.24f), KtKivi2, KtKivi2);
            r.Laatikko(new Vector3(0f, lista0, 0f), new Vector3(0.274f, lista1 - lista0, 0.274f), KtKivi, KtKivi3);
            r.LopetaOsa();

            // Kypärä: kahdeksankulmainen suippo katto räystäskaistalla (kärki edessä → harja keskellä kuten kuvamerkissä).
            var kp = new Vector3(0f, lista1, 0f);
            float rs = 0.118f;
            r.AloitaOsa();
            r.KartioRaystas(kp, rs, kyparaK, 8, KtKatto, KtRaystas, 0.15f);
            r.LopetaOsa();

            // Huippu: pallo ja piikki (pienet, ei ääriviivaa).
            float yk = lista1 + kyparaK;
            r.Timantti(new Vector3(0f, yk + 0.013f, 0f), 0.016f, 0.016f, KtHuippu, 4);
            if (!lod1) r.Pyramidi(new Vector3(0f, yk + 0.022f, 0f), 0.011f, 0.011f, 0.025f, KtHuippu);
        }

        /// <summary>Sivun k kehys: ulospäin N ja oikealle T (ulkoa katsoen); k = 0 edessä (−Z), 1 oikealla, 2 takana, 3 vasemmalla.</summary>
        static (Vector3 n, Vector3 t) KtSivu(int k)
        {
            switch (k & 3)
            {
                case 0: return (new Vector3(0f, 0f, -1f), new Vector3(1f, 0f, 0f));
                case 1: return (new Vector3(1f, 0f, 0f), new Vector3(0f, 0f, 1f));
                case 2: return (new Vector3(0f, 0f, 1f), new Vector3(-1f, 0f, 0f));
                default: return (new Vector3(-1f, 0f, 0f), new Vector3(0f, 0f, -1f));
            }
        }

        /// <summary>
        /// Avoin kellokerros (yksi ääriviivaosa): neljä L-muotoista kulmapilaria lattiasta y0 holvin alkuun ys, niiden päällä
        /// umpinainen kaista ys–y1, jonka jokaisella sivulla suippokaaren kärki (yk) tummana syvennyksenä; sisäpinnat ja lattia
        /// musteen värisiä, joten aukot näkyvät tummina, ja keskellä riippuu kello palkista.
        /// </summary>
        static void KtKellokerros(Rakentaja r, float w, float y0, float ys, float yk, float y1)
        {
            const float ow = KtAukko, t = KtSeina;
            r.AloitaOsa();
            for (int k = 0; k < 4; k++)
            {
                var (N, T) = KtSivu(k);
                var (N1, T1) = KtSivu(k + 1);
                Vector3 P(float u, float y, float d) => N * (w - d) + T * u + Vector3.up * y;
                Vector3 Q(float u, float y, float d) => N1 * (w - d) + T1 * u + Vector3.up * y;
                // Kulmapilari sivun k oikeassa ja sivun k+1 vasemmassa päässä.
                r.NelioUlos(P(ow, y0, 0f), P(w, y0, 0f), P(w, ys, 0f), P(ow, ys, 0f), N, k % 2 == 0 ? KtKivi : KtKivi3);
                r.NelioUlos(Q(-w, y0, 0f), Q(-ow, y0, 0f), Q(-ow, ys, 0f), Q(-w, ys, 0f), N1, k % 2 == 0 ? KtKivi3 : KtKivi);
                r.NelioUlos(P(ow, y0, 0f), P(ow, y0, t), P(ow, ys, t), P(ow, ys, 0f), -T, KtPielet);
                r.NelioUlos(Q(-ow, y0, 0f), Q(-ow, y0, t), Q(-ow, ys, t), Q(-ow, ys, 0f), T1, KtPielet);
                r.NelioUlos(P(ow, y0, t), P(w - t, y0, t), P(w - t, ys, t), P(ow, ys, t), -N, KtSisa);
                r.NelioUlos(Q(-(w - t), y0, t), Q(-ow, y0, t), Q(-ow, ys, t), Q(-(w - t), ys, t), -N1, KtSisa);
                // Kaista ja suippokaaren kärki.
                Vector3 A = P(-w, ys, 0f), B = P(-ow, ys, 0f), C = P(0f, yk, 0f), D = P(ow, ys, 0f), E = P(w, ys, 0f), F = P(w, y1, 0f), G = P(-w, y1, 0f);
                var kivi = k % 2 == 0 ? KtKivi : KtKivi3;
                r.KolmioUlos(A, B, G, N, kivi); r.KolmioUlos(B, C, G, N, kivi); r.KolmioUlos(C, F, G, N, kivi);
                r.KolmioUlos(C, D, F, N, kivi); r.KolmioUlos(D, E, F, N, kivi);
                Vector3 B1 = P(-ow, ys, t), C1 = P(0f, yk, t), D1 = P(ow, ys, t);
                float h = yk - ys;
                r.NelioUlos(B, C, C1, B1, T * h - Vector3.up * ow, KtPielet);
                r.NelioUlos(C, D, D1, C1, -T * h - Vector3.up * ow, KtPielet);
                r.KolmioUlos(B1, C1, D1, N, KtSisa);
            }
            // Lattia (tumma, näkyy aukoista).
            float l = w - 0.003f;
            r.NelioUlos(new Vector3(-l, y0 + 0.001f, -l), new Vector3(l, y0 + 0.001f, -l), new Vector3(l, y0 + 0.001f, l), new Vector3(-l, y0 + 0.001f, l), Vector3.up, KtSisa);
            // Kello riippuu palkista kerroksen alaosassa: 55°:n kallistuksessa katse laskee aukon yläreunasta keskelle
            // 0,7 × syvyys, joten kellon yläpää on aukon yläreunan alapuolella ja kello näkyy tummaa sisusta vasten.
            float kyla = y0 + 0.115f;
            r.Laatikko(new Vector3(0f, kyla, 0f), new Vector3(2f * (w - t), 0.014f, 0.016f), KtPielet, KtPielet);
            // Kello: sorvattu profiili (säde, korkeus palkista alaspäin), kuusi sektoria.
            var kello = new[] { (0f, 0.002f), (0.018f, 0.01f), (0.021f, 0.03f), (0.03f, 0.056f), (0.035f, 0.068f) };
            const int ns = 6;
            var kk = new Vector3(0f, kyla - 0.035f, 0f);
            Vector3 KP(int j, int i)
            {
                float a = (i + 0.5f) * Mathf.PI * 2f / ns;
                return new Vector3(Mathf.Cos(a) * kello[j].Item1, kyla - kello[j].Item2, Mathf.Sin(a) * kello[j].Item1);
            }
            for (int i = 0; i < ns; i++)
            {
                int q = (i + 1) % ns;
                r.KolmioKeskelta(KP(0, 0), KP(1, i), KP(1, q), kk, KtKello);
                for (int j = 1; j + 1 < kello.Length; j++) r.NelioKeskelta(KP(j, i), KP(j + 1, i), KP(j + 1, q), KP(j, q), kk, KtKello);
            }
            r.LopetaOsa();
        }

        /// <summary>LOD1: kellokerroksen aukko sivulla k tummana suippokaarilaattana (suorakulmio y0–ys ja kärki yk), 3 kolmiota.</summary>
        static void KtAukkoLaatta(Rakentaja r, int k, float w, float y0, float ys, float yk)
        {
            var (N, T) = KtSivu(k);
            Vector3 P(float u, float y) => N * (w + 0.002f) + T * u + Vector3.up * y;
            const float ow = KtAukko;
            Vector3 a = P(-ow, y0), b = P(ow, y0), c = P(ow, ys), d = P(0f, yk), e = P(-ow, ys);
            r.KolmioUlos(a, b, c, N, KtSisa);
            r.KolmioUlos(a, c, e, N, KtSisa);
            r.KolmioUlos(e, c, d, N, KtSisa);
        }

        static Mesh KellotorniRunko() { var r = new Rakentaja(); KellotorniOsat(r, false); return r.Verkko("kategoria-Kellotorni"); }
        static Mesh KellotorniLod1() { var r = new Rakentaja(); KellotorniOsat(r, true); return r.Verkko("kategoria-Kellotorni-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaKellotorni3D(bool lod1 = false) => lod1 ? KellotorniLod1() : KellotorniRunko();

        static readonly bool kellotorniMalli = RekisteroiKategoria(Kategoriasymboli.Kellotorni, new Erikoismalli { Runko = KellotorniRunko, Lod1 = KellotorniLod1, Lahi = KellotorniLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta Erikoismalli.Lahi, 1.0.29) ----

        /// <summary>Lähitason sauma alavarren kivissä: ohuempi kuin LOD0:n 0,012, koska viisteet leventävät näkyvää saumaa.</summary>
        const float KtLhSauma = 0.007f;

        /// <summary>
        /// LÄHITASO: sama kellotorni lähizoomiin (Erikoismalli.Lahi: korvaa LOD0:n, kun kartan kerroin ≥ 4, enintään kolmelle
        /// lähimmälle). Sama siluetti, mittasuhteet, värit, rajat ja sommitelma kuin LOD0:ssa (porrastettu jalusta, kolmen
        /// kivikerran alavarsi, vyölista, avoin kellokerros kelloineen, räystäslista, kahdeksankulmainen kypärä, pallo ja piikki),
        /// mutta 1 258 kolmiota (LOD0 268, noin 4,7 ×) lähikuvan yksityiskohtiin: jalustan laatta viistetty ja viisto profiloitu
        /// (pystynauha, viisto, yläviiste); alavarren jokainen kivikerta kahtena kivenä vuorottelevin pystysaumoin (juokseva
        /// muuraus), särmät viistetty, kivet hieman kallellaan ja kaksi hiushalkeamaa; vyö- ja räystäslista profiloitu (ala- ja
        /// yläviisteet); kellokerroksen pystykulmat viistetty, pilareissa piirretyt vaakasaumat, suippokaariaukoissa viistetty
        /// kehys, kaaren yllä vesilista ja aukon pohjalla kivinen ikkunalauta; palkki viistetty ja kello kymmenkulmainen
        /// tarkemmalla profiililla; kypärässä kellomainen räystäskaista, kuusi liuskekivikerrosta loivin alahuulin (vaakaviivat)
        /// ja harjarivat taitteissa; huipussa kaulus, pyöreä pallo ja ohut piikki. Kaiverrustyyli ennallaan: seepiarampin värit
        /// (Ramppi) ja musteydin saumoissa. Käyttää Kaari.cs:n lähitason apureita (KlKappale, KlLaatikko, KlViisteet,
        /// KlKallistus, KlHalkeama, KlP).
        /// </summary>
        static void KellotorniLahiOsat(Rakentaja r)
        {
            const float w = KtW;
            const float jalka = 0.04f, viisto = 0.065f, vyo0 = 0.24f, vyo1 = 0.262f, holvi = 0.455f, karki = 0.495f, kerros1 = 0.53f;
            const float lista0 = 0.54f, lista1 = 0.565f, kyparaK = 0.3f;
            const float s = KtLhSauma * 0.5f;
            var suora = Quaternion.Euler(0f, 0f, 0f);

            // Jalusta: viistetty porraslaatta ja profiloitu viisto (pystynauha, viisto ja yläviiste), yksi osa kuten LOD0:ssa.
            r.AloitaOsa();
            KlKappale(r, KlLaatikko(new Vector3(0f, jalka * 0.5f, 0f), new Vector3(0.15f, jalka * 0.5f, 0.15f), suora), KlViisteet(0.005f, 700, 2), KtKivi2, true);
            KtLhProfiili(r, new[] { (0.14f, jalka), (0.14f, jalka + 0.005f), (0.1175f, viisto - 0.003f), (0.114f, viisto) }, new[] { KtKivi, KtKivi, KtKivi3 }, KtKivi3);
            r.LopetaOsa();

            // Alavarsi: LOD0:n kolme kivikertaa, kukin kahtena kivenä (pystysauma vuorotellen kuin juoksevassa muurauksessa),
            // särmät viistetty, kivet hieman kallellaan; musteydin näkyy saumoista. Kaksi hiushalkeamaa.
            KsYdin(r, new Vector3(0f, (viisto + vyo0) * 0.5f, 0f), new Vector3(w - 0.017f, (vyo0 - viisto) * 0.5f - 0.004f, w - 0.017f));
            float[] kerrat = { viisto, 0.123f, 0.182f, vyo0 };
            float[] saumaX = { 0.03f, -0.04f, 0.014f };
            var savyt = new[] { KtKivi, KtKivi3, KtKivi2 };
            for (int i = 0; i < 3; i++)
            {
                float y0 = kerrat[i] + (i == 0 ? 0f : s), y1 = kerrat[i + 1] - s;
                for (int j = 0; j < 2; j++)
                {
                    float x0 = j == 0 ? -w + s : saumaX[i] + s, x1 = j == 0 ? saumaX[i] - s : w - s;
                    int sk = 710 + 10 * i + j;
                    var p = new Vector3((x0 + x1) * 0.5f, (y0 + y1) * 0.5f, 0.0008f * KvKohina(sk, 7));
                    var h = new Vector3((x1 - x0) * 0.5f, (y1 - y0) * 0.5f, w - s);
                    int lohkeama = new[] { -1, 3, -1, -1, 1, -1 }[2 * i + j];
                    var t = KlKappale(r, KlLaatikko(p, h, KlKallistus(sk, 0.2f)), KlViisteet(0.0032f, sk, lohkeama), savyt[(i + j) % 3]);
                    if (i == 0 && j == 1) KlHalkeama(r, t[4], 0.0035f, KlP(0.066f, 0.114f), KlP(0.071f, 0.104f), KlP(0.069f, 0.095f), KlP(0.077f, 0.085f));
                    if (i == 1 && j == 0)
                    {
                        KlHalkeama(r, t[4], 0.004f, KlP(-0.094f, 0.171f), KlP(-0.082f, 0.163f), KlP(-0.074f, 0.152f), KlP(-0.061f, 0.146f));
                        KlHalkeama(r, t[4], 0.003f, KlP(-0.082f, 0.163f), KlP(-0.084f, 0.151f));
                    }
                }
            }

            // Vyölista: profiloitu nauha (alaviiste, pystypinta ja yläviiste), vaalea yläpinta kuten LOD0:ssa.
            r.AloitaOsa();
            KtLhProfiili(r, new[] { (0.118f, vyo0), (0.126f, vyo0 + 0.005f), (0.126f, vyo1 - 0.004f), (0.121f, vyo1) }, new[] { KtKivi2, KtKivi2, KtKivi3 }, KtKivi3);
            r.LopetaOsa();

            KtLhKellokerros(r, w, vyo1, holvi, karki, kerros1);

            // Räystäslista: alalista, ulkonevan laatan alaviiste, otsa ja yläviiste (yksi osa).
            r.AloitaOsa();
            KtLhProfiili(r, new[] { (0.12f, kerros1), (0.12f, lista0), (0.131f, lista0), (0.137f, lista0 + 0.006f), (0.137f, lista1 - 0.004f), (0.132f, lista1) },
                new[] { KtKivi2, KtKivi2, KtKivi2, KtKivi, KtKivi3 }, KtKivi3);
            r.LopetaOsa();

            // Kypärä: räystäslauta ja kellomainen räystäskaista (vaalea), liuskekivikerrokset pienin portain ja harjarivat.
            const int n = 8;
            float rs = 0.118f, yr = lista1 + kyparaK * 0.15f, rr = rs * 0.85f, yk = lista1 + kyparaK;
            var kp = new Vector3(0f, 0f, 0f);
            r.AloitaOsa();
            KtLhKaista(r, kp, rs, lista1, rs, lista1 + 0.0045f, n, KtRaystas);
            KtLhKaista(r, kp, rs, lista1 + 0.0045f, rs - 0.0085f, lista1 + 0.021f, n, KtRaystas);
            KtLhKaista(r, kp, rs - 0.0085f, lista1 + 0.021f, rr, yr, n, KtRaystas);
            float[] kerrosY = { yr, 0.652f, 0.694f, 0.736f, 0.778f, 0.82f };
            float Rk(float y) => rr * (yk - y) / (yk - yr);
            const float potku = 0.0028f;
            for (int i = 0; i < kerrosY.Length; i++)
            {
                // Kerroksen alareuna loivempana huulena (potku ulos), yläosa kartion kaltevuudella: vaaka­viivat kuin kaiverruksessa.
                float ya = kerrosY[i], yb = i + 1 < kerrosY.Length ? kerrosY[i + 1] : yk, ym = ya + 0.3f * (yb - ya);
                KtLhKaista(r, kp, Rk(ya) + potku, ya - 0.0025f, Rk(ym), ym, n, KtKatto);
                KtLhKaista(r, kp, Rk(ym), ym, Rk(yb), yb, n, KtKatto);
            }
            // Harjarivat kahdeksalla taitteella räystäskaistasta huipun kaulukseen.
            for (int i = 0; i < n; i++)
            {
                float a = i * Mathf.PI * 2f / n;
                var u = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var tv = new Vector3(-u.z, 0f, u.x);
                Vector3 H(float y, float nosto) { float rk = Rk(y) + nosto; return u * rk + Vector3.up * y; }
                var ulosN = (u * (yk - yr) + Vector3.up * rr).normalized;
                float y0 = yr - 0.003f, y1 = 0.846f;
                // Rivan tyvi tahkoilla (tangentin suuntaan siirretty kärki vedetään tahkon tasoon), harja ulospäin.
                float vino = Mathf.Tan(Mathf.PI / n);
                Vector3 Tyvi(float y, float lev, float sgn) => H(y, 0f) + tv * (sgn * lev) - u * (lev * vino);
                Vector3 a0 = Tyvi(y0, 0.0045f, -1f), a1 = Tyvi(y1, 0.0022f, -1f), b0 = H(y0, 0f) + ulosN * 0.0055f, b1 = H(y1, 0f) + ulosN * 0.0035f;
                Vector3 c0 = Tyvi(y0, 0.0045f, 1f), c1 = Tyvi(y1, 0.0022f, 1f);
                r.NelioUlos(a0, a1, b1, b0, ulosN - tv, KtKatto);
                r.NelioUlos(b0, b1, c1, c0, ulosN + tv, KtKatto);
            }
            r.LopetaOsa();

            // Huippu: kaulus, pallo ja piikki (pienet, ei ääriviivaa kuten LOD0:ssa).
            r.AloitaOsa();
            KtLhSorvi(r, Vector3.zero, new[] { (0.0068f, 0.847f), (0.0068f, 0.856f), (0.003f, 0.8615f), (0f, 0.8615f) }, 8, 0f, _ => KtHuippu);
            var pallo = new (float, float)[7];
            for (int i = 0; i < 7; i++) { float b = Mathf.PI * (i / 6f - 0.5f); pallo[i] = (Mathf.Cos(b) * 0.0155f, 0.878f + Mathf.Sin(b) * 0.0155f); }
            pallo[0] = (0f, 0.8625f); pallo[6] = (0f, 0.8935f);
            KtLhSorvi(r, Vector3.zero, pallo, 8, Mathf.PI / 8f, _ => KtHuippu);
            KtLhSorvi(r, Vector3.zero, new[] { (0.0038f, 0.8925f), (0.0033f, 0.897f), (0f, 0.912f) }, 6, 0f, _ => KtHuippu);
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason kellokerros (yksi ääriviivaosa kuten LOD0:ssa): pystykulmat viistetty, jokainen suippokaariaukko
        /// viistetyllä kehyksellä (kehyksen ulkoreuna pinnassa, sisäreuna LOD0:n aukon kohdalla), aukon pohjalla kivinen
        /// ikkunalauta, pielet, kaaren alapinnat, tumma sisus ja lattia kuten LOD0:ssa; palkki viistettynä ja kello
        /// kymmenkulmaisena sorvattuna profiilina (kruunu, olka, vyötärö, äänireuna ja huuli).
        /// </summary>
        static void KtLhKellokerros(Rakentaja r, float w, float y0, float ys, float yk, float y1)
        {
            const float ow = KtAukko, t = KtSeina, c = 0.0065f, e = 0.0075f, lauta = 0.011f, ulk = 0.003f;
            float oo = ow + e, wc = w - c, yb = y0 + lauta;
            // Kehyksen ulkoreunan suippokaari: LOD0:n kaaren suora siirrettynä e:n verran ulospäin (pielen ja kärjen leikkaukset).
            float ay = yk - ys, al = Mathf.Sqrt(ow * ow + ay * ay);
            var nn = new Vector2(-ay / al, ow / al); var dd = new Vector2(ow / al, ay / al);
            var b0 = new Vector2(-ow, ys) + nn * e;
            float ysO = b0.y + dd.y * ((-oo - b0.x) / dd.x), ykO = b0.y + dd.y * ((0f - b0.x) / dd.x);
            r.AloitaOsa();
            for (int k = 0; k < 4; k++)
            {
                var (N, T) = KtSivu(k);
                var (N1, T1) = KtSivu(k + 1);
                Vector3 P(float u, float y, float d) => N * (w - d) + T * u + Vector3.up * y;
                Vector3 Q(float u, float y, float d) => N1 * (w - d) + T1 * u + Vector3.up * y;
                var kivi = k % 2 == 0 ? KtKivi : KtKivi3;
                // Pilarien etupinnat ja viistetty pystykulma (sivulta k sivulle k+1).
                r.NelioUlos(P(-wc, y0, 0f), P(-oo, y0, 0f), P(-oo, ysO, 0f), P(-wc, ysO, 0f), N, kivi);
                r.NelioUlos(P(oo, y0, 0f), P(wc, y0, 0f), P(wc, ysO, 0f), P(oo, ysO, 0f), N, kivi);
                r.NelioUlos(P(wc, y0, 0f), Q(-wc, y0, 0f), Q(-wc, y1, 0f), P(wc, y1, 0f), N + N1, KtKivi2);
                // Kaista ja suippokaaren kärki (kehyksen ulkoreuna).
                Vector3 A = P(-wc, ysO, 0f), B = P(-oo, ysO, 0f), C = P(0f, ykO, 0f), D = P(oo, ysO, 0f), E = P(wc, ysO, 0f), F = P(wc, y1, 0f), G = P(-wc, y1, 0f);
                r.KolmioUlos(A, B, G, N, kivi); r.KolmioUlos(B, C, G, N, kivi); r.KolmioUlos(C, F, G, N, kivi);
                r.KolmioUlos(C, D, F, N, kivi); r.KolmioUlos(D, E, F, N, kivi);
                // Vesilista (hupulista) kaaren yllä: kapea ulkoneva nauha kehyksen ulkopuolella, kärki keskellä.
                const float g = 0.0045f, lw = 0.0042f, pd = 0.0032f;
                foreach (float sgn in new[] { -1f, 1f })
                {
                    float q1 = e + g, q2 = e + g + lw;
                    Vector3 i0 = P(sgn * (ow + q1), KtLhKaariY(ow, ys, nn, dd, q1, true), -pd), i1 = P(0f, KtLhKaariY(ow, ys, nn, dd, q1, false), -pd);
                    Vector3 o0 = P(sgn * (ow + q2), KtLhKaariY(ow, ys, nn, dd, q2, true), -pd), o1 = P(0f, KtLhKaariY(ow, ys, nn, dd, q2, false), -pd);
                    var nu = T * (-sgn * nn.x) + Vector3.up * nn.y;
                    r.NelioUlos(i0, i1, o1, o0, N, kivi);
                    r.NelioUlos(o0, o1, o1 + N * pd, o0 + N * pd, nu, kivi);
                }
                // Piirretyt vaakasaumat pilareissa (kivikerrat kuten alavarressa), myös viistetyn kulman yli.
                foreach (float ys2 in new[] { 0.327f, 0.392f })
                {
                    const float sl = 0.0013f;
                    r.NelioUlos(P(-wc + 0.001f, ys2 - sl, -0.0006f), P(-oo - 0.001f, ys2 - sl, -0.0006f), P(-oo - 0.001f, ys2 + sl, -0.0006f), P(-wc + 0.001f, ys2 + sl, -0.0006f), N, KtSisa);
                    r.NelioUlos(P(oo + 0.001f, ys2 - sl, -0.0006f), P(wc - 0.001f, ys2 - sl, -0.0006f), P(wc - 0.001f, ys2 + sl, -0.0006f), P(oo + 0.001f, ys2 + sl, -0.0006f), N, KtSisa);
                    var kn = (N + N1).normalized * 0.0006f;
                    r.NelioUlos(P(wc, ys2 - sl, 0f) + kn, Q(-wc, ys2 - sl, 0f) + kn, Q(-wc, ys2 + sl, 0f) + kn, P(wc, ys2 + sl, 0f) + kn, N + N1, KtSisa);
                }
                // Viistetty kehys: pielten ja kaaren viisteet pinnasta e:n syvyyteen.
                Vector3 Bi = P(-ow, ys, e), Ci = P(0f, yk, e), Di = P(ow, ys, e);
                float h = yk - ys;
                r.NelioUlos(P(-oo, yb, 0f), P(-oo, ysO, 0f), Bi, P(-ow, yb, e), T + N, KtPielet);
                r.NelioUlos(P(oo, yb, 0f), P(oo, ysO, 0f), Di, P(ow, yb, e), -T + N, KtPielet);
                r.NelioUlos(B, C, Ci, Bi, (T * h - Vector3.up * ow).normalized + N, KtPielet);
                r.NelioUlos(C, D, Di, Ci, (-T * h - Vector3.up * ow).normalized + N, KtPielet);
                // Pielet ja kaaren alapinnat syvyydestä e seinän paksuuteen, tumma kärki sisäpinnassa.
                Vector3 B1 = P(-ow, ys, t), C1 = P(0f, yk, t), D1 = P(ow, ys, t);
                r.NelioUlos(P(-ow, yb, e), P(-ow, yb, t), B1, Bi, T, KtPielet);
                r.NelioUlos(P(ow, yb, e), P(ow, yb, t), D1, Di, -T, KtPielet);
                r.NelioUlos(Bi, Ci, C1, B1, T * h - Vector3.up * ow, KtPielet);
                r.NelioUlos(Ci, Di, D1, C1, -T * h - Vector3.up * ow, KtPielet);
                r.KolmioUlos(B1, C1, D1, N, KtSisa);
                // Sisäpinnat (tummat) aukon molemmin puolin.
                r.NelioUlos(P(ow, y0, t), P(w - t, y0, t), P(w - t, ys, t), P(ow, ys, t), -N, KtSisa);
                r.NelioUlos(P(-(w - t), y0, t), P(-ow, y0, t), P(-ow, ys, t), P(-(w - t), ys, t), -N, KtSisa);
                // Ikkunalauta: kivi aukon pohjalla, hieman pinnan edessä, viistetty etureuna.
                float us = oo + 0.004f, bv = 0.003f;
                r.NelioUlos(P(-us, y0, -ulk), P(us, y0, -ulk), P(us, yb - bv, -ulk), P(-us, yb - bv, -ulk), N, KtKivi3);
                r.NelioUlos(P(-us, yb - bv, -ulk), P(us, yb - bv, -ulk), P(us, yb, -ulk + bv), P(-us, yb, -ulk + bv), N + Vector3.up, KtKivi3);
                r.NelioUlos(P(-us, yb, -ulk + bv), P(us, yb, -ulk + bv), P(us, yb, t), P(-us, yb, t), Vector3.up, KtKivi3);
                foreach (float sgn in new[] { -1f, 1f })
                {
                    var sv = T * sgn;
                    r.NelioUlos(P(sgn * us, y0, -ulk), P(sgn * us, y0, 0f), P(sgn * us, yb, 0f), P(sgn * us, yb - bv, -ulk), sv, KtKivi3);
                    r.KolmioUlos(P(sgn * us, yb - bv, -ulk), P(sgn * us, yb, 0f), P(sgn * us, yb, -ulk + bv), sv, KtKivi3);
                }
            }
            // Lattia (tumma, näkyy aukoista).
            float l = w - 0.003f;
            r.NelioUlos(new Vector3(-l, y0 + 0.001f, -l), new Vector3(l, y0 + 0.001f, -l), new Vector3(l, y0 + 0.001f, l), new Vector3(-l, y0 + 0.001f, l), Vector3.up, KtSisa);
            // Palkki (viistetty) ja kello: sama ripustus kuin LOD0:ssa, kymmenen sektoria ja tarkempi profiili.
            float kyla = y0 + 0.115f;
            KlKappale(r, KlLaatikko(new Vector3(0f, kyla + 0.007f, 0f), new Vector3(w - t, 0.007f, 0.008f), Quaternion.Euler(0f, 0f, 0f)), KlViisteet(0.0025f, 760), KtPielet);
            var kello = new[] { (0f, 0.0025f), (0.011f, 0.0045f), (0.0175f, 0.0095f), (0.0203f, 0.019f), (0.0218f, 0.033f), (0.0262f, 0.0475f),
                (0.0315f, 0.0575f), (0.0357f, 0.0638f), (0.0352f, 0.068f) };
            var prof = new (float, float)[kello.Length];
            for (int j = 0; j < kello.Length; j++) prof[j] = (kello[j].Item1, kyla - kello[j].Item2);
            KtLhSorvi(r, Vector3.zero, prof, 10, Mathf.PI / 10f, j => KtKello, true);
            r.LopetaOsa();
        }

        /// <summary>Suippokaaren (pielen puoliväli ow, kaaren alku ys, kärki ow:n ja ys:n kaaresta) q:n verran ulospäin siirretyn
        /// sivun korkeus pielen kohdalla u = −(ow + q) (alku = true) tai keskellä u = 0 (kärki).</summary>
        static float KtLhKaariY(float ow, float ys, Vector2 nn, Vector2 dd, float q, bool alku)
        {
            var bq = new Vector2(-ow, ys) + nn * q;
            return bq.y + dd.y * ((alku ? -(ow + q) : 0f) - bq.x) / dd.x;
        }

        /// <summary>Neliön muotoinen profiilinauha (jalustan viisto, vyö- ja räystäslista): profiili (puolileveys, korkeus)
        /// alhaalta ylös kaikille neljälle sivulle jiiratuin kulmin, väri väleittäin, ja lopuksi kansi viimeisen pisteen
        /// korkeudella (kansivärillä).</summary>
        static void KtLhProfiili(Rakentaja r, (float h, float y)[] prof, Color[] vari, Color kansi)
        {
            var k = new Vector3(0f, (prof[0].y + prof[prof.Length - 1].y) * 0.5f, 0f);
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (h0, y0) = prof[j]; var (h1, y1) = prof[j + 1];
                for (int i = 0; i < 4; i++)
                {
                    var (N, T) = KtSivu(i);
                    Vector3 A = N * h0 - T * h0 + Vector3.up * y0, B = N * h0 + T * h0 + Vector3.up * y0;
                    Vector3 C = N * h1 + T * h1 + Vector3.up * y1, D = N * h1 - T * h1 + Vector3.up * y1;
                    var ulos = N * (y1 - y0) + Vector3.up * (h0 - h1);
                    if (ulos.sqrMagnitude < 1e-10f) continue;
                    r.NelioUlos(A, B, C, D, ulos, vari[j]);
                }
            }
            var (hk, yk) = prof[prof.Length - 1];
            r.NelioUlos(new Vector3(-hk, yk, -hk), new Vector3(hk, yk, -hk), new Vector3(hk, yk, hk), new Vector3(-hk, yk, hk), Vector3.up, kansi);
        }

        /// <summary>Kahdeksankulmaisen (n-kulmaisen) kypärän vaakakaista: kartion pinta säteestä r0 korkeudella y0 säteeseen
        /// r1 korkeudella y1 (kärjet kulmissa i · 2π/n kuten KartioRaystas, kärki edessä); r1 = 0 tekee huipun.</summary>
        static void KtLhKaista(Rakentaja r, Vector3 p, float r0, float y0, float r1, float y1, int n, Color vari)
        {
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var ulos = new Vector3(Mathf.Cos(am) * (y1 - y0), r0 - r1, Mathf.Sin(am) * (y1 - y0));
                Vector3 A = p + d0 * r0 + Vector3.up * y0, B = p + d1 * r0 + Vector3.up * y0, C = p + d1 * r1 + Vector3.up * y1, D = p + d0 * r1 + Vector3.up * y1;
                if (r1 <= 0f) r.KolmioUlos(A, B, C, ulos, vari);
                else r.NelioUlos(A, B, C, D, ulos, vari);
            }
        }

        /// <summary>Sorvattu pinta pystyakselin ympäri (kuten MjSorvi): profiili (säde, korkeus) kulkee niin, että aine jää
        /// kulkusuunnasta vasemmalle (tai oikealle, jos alas = true: profiili ylhäältä alas); säde 0 profiilin päässä tekee
        /// viuhkan. Ensimmäinen kärki kulmassa kulma0.</summary>
        static void KtLhSorvi(Rakentaja r, Vector3 p, (float sade, float y)[] prof, int n, float kulma0, Func<int, Color> vari, bool alas = false)
        {
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (r0, y0) = prof[j]; var (r1, y1) = prof[j + 1];
                float nr = (y1 - y0) * (alas ? -1f : 1f), ny = (r0 - r1) * (alas ? -1f : 1f);
                for (int i = 0; i < n; i++)
                {
                    float a0 = kulma0 + i * Mathf.PI * 2f / n, a1 = kulma0 + (i + 1) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
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

        static Mesh KellotorniLahi() { var r = new Rakentaja(); KellotorniLahiOsat(r); return r.Verkko("kategoria-Kellotorni-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaKellotorni3DLahi() => KellotorniLahi();
    }
}
