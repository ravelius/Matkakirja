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

        static readonly bool kellotorniMalli = RekisteroiKategoria(Kategoriasymboli.Kellotorni, new Erikoismalli { Runko = KellotorniRunko, Lod1 = KellotorniLod1 });
    }
}
