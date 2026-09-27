using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI KAARI (historia), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// HISTORIA: raunioitunut kivikaari (merkki-historia.png oikeana 3D-esineenä). Kaksi pilaria (jalka, kolme runkokiveä ja
        /// kapiteeli), korotettu puoliympyräkaari seitsemästä kaarikivestä, jonka oikea yläosa on sortunut (yksi kivi pudonnut
        /// maahan kaaren alle, viereinen lohjennut), raunioröykkiö oikean pilarin juurella ja pari irtokiveä; halkeamat
        /// etupinnalla. Leveys noin 0,95, korkeus 0,82, syvyys 0,15 (jalat 0,19). LOD1 (≤ 200, tasot 2–3): yksi runkokivi pilaria kohden, kolme raunion kiveä, ilman halkeamia, murua, irtokiviä ja ydintä.
        /// </summary>
        static void KaariKivet(Rakentaja r, bool lod1)
        {
            const float d = 0.072f;                              // puolisyvyys (ohut kuten kuvamerkissä: etumuoto hallitsee)
            float[] pilarit = { -0.34f, 0.2f };                  // pilarien keskipisteet (x)
            const float pl = 0.1f;                               // pilarin puolileveys
            const float jalka = 0.05f, kapiteeli = 0.31f, kaariAlku = 0.35f, kaariKeski = 0.46f;
            float cx = (pilarit[0] + pl + pilarit[1] - pl) * 0.5f, ri = (pilarit[1] - pl - (pilarit[0] + pl)) * 0.5f, ro = ri + 0.17f;
            var c = new Vector3(cx, kaariKeski, 0f);

            // Musteytimet (saumat): 0,02 kivipintojen sisällä, joten ne näkyvät vain kivien väleistä.
            const float sis = 0.02f;
            if (!lod1)
            {
                foreach (float px in pilarit) KsYdin(r, new Vector3(px, kaariAlku * 0.5f, 0f), new Vector3(pl - sis, kaariAlku * 0.5f - 0.01f, d - sis));
                foreach (float kx in new[] { cx - (ri + ro) * 0.5f, cx + (ri + ro) * 0.5f })
                    KsYdin(r, new Vector3(kx, (kapiteeli + kaariKeski) * 0.5f, 0f), new Vector3((ro - ri) * 0.5f - sis, (kaariKeski - kapiteeli) * 0.5f, d - sis));
            }

            // Pilarit: jalka (leveämpi), kolme runkokiveä (hieman epäsäännölliset), kapiteeli (leveämpi).
            for (int i = 0; i < pilarit.Length; i++)
            {
                float px = pilarit[i];
                KsLohko(r, new Vector3(px, jalka * 0.5f, 0f), new Vector3(pl + 0.028f, jalka * 0.5f + KsSauma * 0.5f, d + 0.022f), KsPohja, 0f, 0f, true);
                float[] y = lod1 ? new[] { jalka, kapiteeli } : new[] { jalka, 0.14f, 0.225f, kapiteeli };
                for (int k = 0; k + 1 < y.Length; k++)
                {
                    float w = pl + (k == 1 ? -0.006f : 0.004f) * (i == 0 ? 1 : -1);
                    var sivu = (k % 2 == 0 ? 0.004f : -0.004f) * (i == 0 ? 1 : -1);
                    KsLohko(r, new Vector3(px + sivu, (y[k] + y[k + 1]) * 0.5f, 0f), new Vector3(w, (y[k + 1] - y[k]) * 0.5f, d), (k + i) % 3 == 0 ? KsKivi2 : k == 1 ? KsKivi3 : KsKivi);
                }
                KsLohko(r, new Vector3(px, (kapiteeli + kaariAlku) * 0.5f, 0f), new Vector3(pl + 0.022f, (kaariAlku - kapiteeli) * 0.5f + KsSauma * 0.5f, d + 0.016f), KsPohja);
                // Korotettu kaaren kylki kapiteelin päällä (kaariAlku → kaariKeski).
                float kx = i == 0 ? cx - (ri + ro) * 0.5f : cx + (ri + ro) * 0.5f;
                KsLohko(r, new Vector3(kx, (kaariAlku + kaariKeski) * 0.5f, 0f), new Vector3((ro - ri) * 0.5f, (kaariKeski - kaariAlku) * 0.5f, d), KsKivi3);
            }

            // Kaarikivet: 7 kiveä π → 0 (vasemmalta oikealle). Kivi 5 (oikealla lakikiven vieressä) on pudonnut, kivi 6 lohjennut.
            const int n = 7;
            for (int k = 0; k < n; k++)
            {
                float a0 = Mathf.PI * (1f - k / (float)n), a1 = Mathf.PI * (1f - (k + 1) / (float)n);
                if (k == 4) continue;
                float ulko = ro + (k == 3 ? 0.02f : k % 2 == 0 ? 0.0f : -0.012f);
                if (k == 5) { a0 -= 0.12f; ulko = ri + 0.1f; }        // lohjennut: kapeampi ja matalampi
                // Ydin kiven alkusaumassa (kulma a0, säteen suuntainen laatikko), jotta sauma näkyy tummana.
                if (!lod1 && k > 0 && k != 5 && k != 6)
                {
                    float rr = (ri + Mathf.Min(ulko, ro)) * 0.5f;
                    KsYdin(r, c + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * rr, new Vector3((ro - ri) * 0.5f - sis, 0.02f, d - sis), a0 * Mathf.Rad2Deg);
                }
                KsKaarikivi(r, c, ri, ulko, a0, a1, d, k == 3 ? KsKivi3 : k % 2 == 0 ? KsKivi : KsKivi2);
            }
            // Lohjenneen reunan murut lakikiven oikealla puolella.
            if (!lod1) KsLohko(r, c + new Vector3(Mathf.Cos(Mathf.PI * 3f / 7f) * (ro + 0.005f), Mathf.Sin(Mathf.PI * 3f / 7f) * (ro + 0.005f), 0f) + new Vector3(0.035f, -0.03f, 0f),
                new Vector3(0.025f, 0.02f, d * 0.8f), KsRaunio, 20f, -25f);

            // Raunioröykkiö oikean pilarin oikealla puolella (porrastettu, kivet hieman vinossa).
            float rx = pilarit[1] + pl;
            var rauniot = new (float x0, float x1, float y0, float y1, float kierto, float kallistus)[]
            {
                (0.0f, 0.1f, 0.0f, 0.075f, 3f, 0f), (0.1f, 0.19f, 0.0f, 0.065f, -3f, 2f),
                (0.0f, 0.11f, 0.075f, 0.145f, -2f, -1f), (0.11f, 0.165f, 0.065f, 0.115f, 4f, 4f),
                (0.0f, 0.085f, 0.145f, 0.205f, 3f, -2f), (0.0f, 0.05f, 0.205f, 0.255f, -3f, 3f),
            };
            if (!lod1) KsYdin(r, new Vector3(rx + 0.06f, 0.1f, 0f), new Vector3(0.045f, 0.085f, 0.066f - 0.008f - sis));
            for (int i = 0; i < (lod1 ? 3 : rauniot.Length); i++)
            {
                var (x0, x1, y0, y1, kierto, kallistus) = rauniot[i];
                KsLohko(r, new Vector3(rx + (x0 + x1) * 0.5f, (y0 + y1) * 0.5f, 0.005f * (i % 3 - 1)), new Vector3((x1 - x0) * 0.5f, (y1 - y0) * 0.5f, 0.066f - 0.008f * (i % 2)),
                    i % 2 == 0 ? KsRaunio : KsKivi2, kierto, kallistus, y0 == 0f);
            }

            if (lod1) return;
            // Pudonnut kaarikivi kaaren alla (sortuman kohdalla) ja irtokiviä.
            KsLohko(r, new Vector3(cx + 0.1f, 0.024f, -0.02f), new Vector3(0.055f, 0.024f, 0.05f), KsRaunio, 28f, 0f, true);
            KsLohko(r, new Vector3(0.47f, 0.02f, -0.09f), new Vector3(0.03f, 0.02f, 0.026f), KsKivi2, -20f, 0f, true);
            KsLohko(r, new Vector3(-0.12f, 0.016f, -0.15f), new Vector3(0.024f, 0.016f, 0.022f), KsRaunio, 35f, 0f, true);

            // Halkeamat etupinnalla (−Z), kuten kuvamerkissä.
            float z = -d - 0.0012f;
            KsHalkeama(r, z, new Vector2(pilarit[0] - 0.05f, 0.1f), new Vector2(pilarit[0] - 0.01f, 0.07f));
            KsHalkeama(r, z, new Vector2(pilarit[0] + 0.02f, 0.2f), new Vector2(pilarit[0] + 0.06f, 0.17f));
            KsHalkeama(r, z, new Vector2(pilarit[1] - 0.04f, 0.26f), new Vector2(pilarit[1] + 0.01f, 0.24f));
            KsHalkeama(r, z, new Vector2(cx - 0.27f, 0.62f), new Vector2(cx - 0.23f, 0.58f));
        }

        static Mesh KaariRunko() { var r = new Rakentaja(); KaariKivet(r, false); return r.Verkko("kategoria-Kaari"); }
        static Mesh KaariLod1() { var r = new Rakentaja(); KaariKivet(r, true); return r.Verkko("kategoria-Kaari-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaKaari3D(bool lod1 = false) => lod1 ? KaariLod1() : KaariRunko();

        static readonly bool kaariMalli = RekisteroiKategoria(Kategoriasymboli.Kaari, new Erikoismalli { Runko = KaariRunko, Lod1 = KaariLod1, Lahi = KaariLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 08.0x Fablen kautta; Natiivisepän rajapinta 1.0.29, ei vielä rekisteröity) ----

        /// <summary>
        /// LÄHITASO: sama raunioitunut kaari lähizoomiin (näkyy vain lähellä, korvaa LOD0:n). Sama siluetti, mittasuhteet,
        /// värit ja raunion sommitelma kuin LOD0:ssa (kaksi pilaria, korotettu kaari, pudonnut ja lohjennut kaarikivi,
        /// raunioröykkiö ja irtokivet), mutta 1 864 kolmiota (LOD0 410, noin 4,5 ×) lähikuvan yksityiskohtiin: särmät viistetty ja
        /// kulmia lohjennut, jokainen kivi hieman kallellaan ja sisennetty (käsin muurattu), ohuemmat saumat musteytimineen
        /// (myös lohjenneen ja oikean kaarikiven välissä), jalassa laatta ja pyöristetty rengas, kapiteelissa kaulus,
        /// levenevä kaula ja kansilaatta, lohjenneen kiven rosoinen murtopinta ja lakikiven murut, pudonneen kiven lohjennut
        /// kulma ja siru, enemmän eri kokoisia raunion kiviä sekä murtoviivoiksi taittuvat halkeamat myös takapinnalla.
        /// Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi) ja musteytimet saumoissa. Ei vielä rekisteröity
        /// (Erikoismallin lähitasokenttä tulee rajapinnan mukana); esikatselu kirjoittaa sen tiedostoon kat-kaari-lahi.txt.
        /// </summary>
        static void KaariLahiKivet(Rakentaja r)
        {
            const float d = 0.072f;
            float[] pilarit = { -0.34f, 0.2f };
            const float pl = 0.1f;
            const float jalka = 0.05f, kapiteeli = 0.31f, kaariAlku = 0.35f, kaariKeski = 0.46f;
            float cx = (pilarit[0] + pl + pilarit[1] - pl) * 0.5f, ri = (pilarit[1] - pl - (pilarit[0] + pl)) * 0.5f, ro = ri + 0.17f;
            var c = new Vector3(cx, kaariKeski, 0f);
            const float sis = 0.02f, s = KlSauma * 0.5f;
            var suora = Quaternion.Euler(0f, 0f, 0f);

            // Musteytimet kuten LOD0:ssa; pilarin ydin hieman kapeampi, koska kivet ovat kallellaan.
            foreach (float px in pilarit) KsYdin(r, new Vector3(px, kaariAlku * 0.5f, 0f), new Vector3(pl - sis - 0.006f, kaariAlku * 0.5f - 0.01f, d - sis));
            foreach (float kx in new[] { cx - (ri + ro) * 0.5f, cx + (ri + ro) * 0.5f })
                KsYdin(r, new Vector3(kx, (kapiteeli + kaariKeski) * 0.5f, 0f), new Vector3((ro - ri) * 0.5f - sis, (kaariKeski - kapiteeli) * 0.5f, d - sis));

            // Pilarit: jalka (laatta + pyöristetty rengas), kolme runkokiveä, kapiteeli (kaulus, kaula, kansilaatta) ja kaaren kylki.
            float[] y = { jalka, 0.14f, 0.225f, kapiteeli };
            for (int i = 0; i < pilarit.Length; i++)
            {
                float px = pilarit[i];
                int si = 100 * (i + 1);
                KlKappale(r, KlLaatikko(new Vector3(px, 0.0155f, 0f), new Vector3(pl + 0.017f, 0.0155f, d + 0.011f), Quaternion.Euler(0f, 0.5f * KvKohina(si, 1), 0f)),
                    KlViisteet(0.006f, si + 1, i == 0 ? 3 : 7), KsPohja, true);
                KlKappale(r, KlLaatikko(new Vector3(px, 0.0405f, 0f), new Vector3(pl + 0.007f, 0.0095f, d + 0.002f), suora), KlViisteet(0.0075f, si + 2), KsPohja);

                for (int k = 0; k + 1 < y.Length; k++)
                {
                    float w = pl + (k == 1 ? -0.006f : 0.004f) * (i == 0 ? 1 : -1);
                    var sivu = (k % 2 == 0 ? 0.004f : -0.004f) * (i == 0 ? 1 : -1);
                    int sk = si + 10 * (k + 1);
                    var p = new Vector3(px + sivu, (y[k] + y[k + 1]) * 0.5f, 0.0035f * KvKohina(sk, 7));
                    var h = new Vector3(w - s, (y[k + 1] - y[k]) * 0.5f - s, d - s);
                    int lohkeama = new[] { 3, 4, 2, 2, 1, 7 }[i * 3 + k];
                    var t = KlKappale(r, KlLaatikko(p, h, KlKallistus(sk, 1.6f)), KlViisteet(0.0065f, sk, lohkeama),
                        (k + i) % 3 == 0 ? KsKivi2 : k == 1 ? KsKivi3 : KsKivi);
                    // Halkeamat kuten LOD0:ssa (samat kohdat), murtoviivoina; lisäksi muutama hiushalkeama ja takapinnan halkeama.
                    if (i == 0 && k == 0)
                    {
                        KlHalkeama(r, t[4], 0.0055f, KlP(-0.402f, 0.125f), KlP(-0.391f, 0.108f), KlP(-0.373f, 0.097f), KlP(-0.36f, 0.08f), KlP(-0.352f, 0.068f));
                        KlHalkeama(r, t[4], 0.0035f, KlP(-0.391f, 0.108f), KlP(-0.386f, 0.092f), KlP(-0.39f, 0.078f));
                    }
                    if (i == 0 && k == 1)
                    {
                        KlHalkeama(r, t[4], 0.0055f, KlP(-0.326f, 0.211f), KlP(-0.312f, 0.197f), KlP(-0.296f, 0.19f), KlP(-0.281f, 0.174f), KlP(-0.268f, 0.166f));
                        KlHalkeama(r, t[5], 0.0045f, KlP(-0.39f, 0.21f), KlP(-0.379f, 0.195f), KlP(-0.362f, 0.184f), KlP(-0.352f, 0.162f));
                    }
                    if (i == 1 && k == 0) KlHalkeama(r, t[4], 0.0045f, KlP(0.249f, 0.126f), KlP(0.245f, 0.112f), KlP(0.25f, 0.098f), KlP(0.246f, 0.083f));
                    if (i == 1 && k == 2)
                    {
                        KlHalkeama(r, t[4], 0.0055f, KlP(0.15f, 0.266f), KlP(0.168f, 0.259f), KlP(0.185f, 0.261f), KlP(0.2f, 0.248f), KlP(0.214f, 0.241f));
                        KlHalkeama(r, t[4], 0.0035f, KlP(0.168f, 0.259f), KlP(0.18f, 0.271f), KlP(0.197f, 0.277f));
                    }
                }

                // Kapiteeli: kaulus, ulospäin levenevä kaula ja kansilaatta (kuvamerkin profiili); yhteensä 0,31–0,35 kuten LOD0.
                KlKappale(r, KlLaatikko(new Vector3(px, 0.314f, 0f), new Vector3(pl, 0.004f, d - 0.004f), suora), KlViisteet(0.003f, si + 5), KsPohja);
                var kaula = new Vector3[8];
                for (int m = 0; m < 8; m++)
                {
                    bool yla = (m & 2) != 0;
                    float hx = yla ? pl + 0.008f : pl + 0.001f, hz = yla ? d + 0.004f : d - 0.003f;
                    kaula[m] = new Vector3(px + ((m & 1) == 0 ? -hx : hx), yla ? 0.333f : 0.318f, (m & 4) == 0 ? -hz : hz);
                }
                KlKappale(r, kaula, KlViisteet(0.003f, si + 6), KsPohja);
                KlKappale(r, KlLaatikko(new Vector3(px, 0.3415f, 0f), new Vector3(pl + 0.012f, 0.0085f, d + 0.006f), Quaternion.Euler(0f, 0.6f * KvKohina(si, 8), 0f)),
                    KlViisteet(0.0045f, si + 7, i == 0 ? 2 : 3), KsPohja);

                // Korotettu kaaren kylki kapiteelin päällä (kaariAlku → kaariKeski).
                float kx = i == 0 ? cx - (ri + ro) * 0.5f : cx + (ri + ro) * 0.5f;
                var tk = KlKappale(r, KlLaatikko(new Vector3(kx, (kaariAlku + kaariKeski) * 0.5f, 0.003f * KvKohina(si, 9)), new Vector3((ro - ri) * 0.5f - s, (kaariKeski - kaariAlku) * 0.5f - s, d - s),
                    KlKallistus(si + 40, 1.4f)), KlViisteet(0.0065f, si + 40, i == 0 ? 2 : 3), KsKivi3);
                if (i == 0) KlHalkeama(r, tk[4], 0.0045f, KlP(-0.379f, 0.446f), KlP(-0.369f, 0.43f), KlP(-0.372f, 0.414f), KlP(-0.362f, 0.4f));
                else KlHalkeama(r, tk[5], 0.004f, KlP(0.207f, 0.446f), KlP(0.219f, 0.431f), KlP(0.216f, 0.414f), KlP(0.224f, 0.398f));
            }

            // Kaarikivet: 7 kiveä π → 0 kuten LOD0:ssa; kivi 4 on pudonnut ja kivi 5 lohjennut. Saumojen musteytimet (LOD0 + 5|6).
            const int n = 7;
            for (int k = 1; k <= 3; k++)
            {
                float a = Mathf.PI * (1f - k / (float)n), ulko = ro + (k == 3 ? 0.02f : k % 2 == 0 ? 0.0f : -0.012f);
                float rr = (ri + Mathf.Min(ulko, ro)) * 0.5f;
                KsYdin(r, c + new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f) * rr, new Vector3((ro - ri) * 0.5f - sis, 0.02f, d - sis), a * Mathf.Rad2Deg);
            }
            KsYdin(r, c + new Vector3(Mathf.Cos(Mathf.PI / n), Mathf.Sin(Mathf.PI / n), 0f) * 0.212f, new Vector3(0.034f, 0.018f, d - sis), 180f / n);
            for (int k = 0; k < n; k++)
            {
                if (k == 4) continue;
                float a0 = Mathf.PI * (1f - k / (float)n), a1 = Mathf.PI * (1f - (k + 1) / (float)n);
                var vari = k == 3 ? KsKivi3 : k % 2 == 0 ? KsKivi : KsKivi2;
                int sk = 300 + 10 * k;
                if (k == 5)
                {
                    KaariLahiLohjennut(r, c, ri, a0 - 0.12f, a1, d, vari);
                    continue;
                }
                float ulko = ro + (k == 3 ? 0.02f : k % 2 == 0 ? 0.0f : -0.012f);
                float da = s / ((ri + ulko) * 0.5f);
                var P = KlAsento(KlKiila(c, ri + s, ulko - s, a0 - da, a1 + da, -(d - s), d - s), KlKallistus(sk, 1.3f), new Vector3(0f, 0f, 0.0035f * KvKohina(sk, 7)));
                var t = KlKappale(r, P, KlViisteet(0.006f, sk, new[] { 6, 3, 1, 3, -1, -1, 2 }[k]), vari);
                if (k == 1) KlHalkeama(r, t[4], 0.0055f, KlP(-0.324f, 0.636f), KlP(-0.3f, 0.625f), KlP(-0.283f, 0.603f), KlP(-0.262f, 0.592f));
                if (k == 2) KlHalkeama(r, t[5], 0.004f, KlP(-0.203f, 0.748f), KlP(-0.19f, 0.73f), KlP(-0.194f, 0.713f), KlP(-0.186f, 0.698f));
                if (k == 3) KlHalkeama(r, t[4], 0.0045f, KlP(-0.048f, 0.803f), KlP(-0.055f, 0.785f), KlP(-0.051f, 0.768f), KlP(-0.057f, 0.752f));
            }

            // Sortuneen kiven reunan murut lakikiven oikealla puolella (LOD0:n muru rosoisena) ja pienempi muru saumapinnalla.
            var muru = c + new Vector3(Mathf.Cos(Mathf.PI * 3f / 7f) * (ro + 0.005f), Mathf.Sin(Mathf.PI * 3f / 7f) * (ro + 0.005f), 0f) + new Vector3(0.035f, -0.03f, 0f);
            KlKappale(r, KlRosoinen(KlLaatikko(muru, new Vector3(0.018f, 0.013f, d * 0.8f - s), Quaternion.Euler(0f, 20f, -25f)), 401, 0.003f), KlViisteet(0.003f, 401, 5), KsRaunio);
            float am = Mathf.PI * 3f / 7f - 0.03f;
            KlKappale(r, KlRosoinen(KlLaatikko(c + new Vector3(Mathf.Cos(am), Mathf.Sin(am), 0f) * 0.25f, new Vector3(0.011f, 0.017f, 0.03f), Quaternion.Euler(0f, 0f, am * Mathf.Rad2Deg - 90f)), 402, 0.003f),
                KlViisteet(0.0025f, 402), KsRaunio);

            // Raunioröykkiö oikean pilarin oikealla puolella: LOD0:n kuusi kiveä rosoisina ja viistettyinä sekä pienempiä kiviä
            // portailla, juurella ja edessä (eri kokoja), kaksi musteydintä väleissä.
            float rx = pilarit[1] + pl;
            var rauniot = new (float x0, float x1, float y0, float y1, float kierto, float kallistus)[]
            {
                (0.0f, 0.1f, 0.0f, 0.075f, 3f, 0f), (0.1f, 0.19f, 0.0f, 0.065f, -3f, 2f),
                (0.0f, 0.11f, 0.075f, 0.145f, -2f, -1f), (0.11f, 0.165f, 0.065f, 0.115f, 4f, 4f),
                (0.0f, 0.085f, 0.145f, 0.205f, 3f, -2f), (0.0f, 0.05f, 0.205f, 0.255f, -3f, 3f),
            };
            KsYdin(r, new Vector3(rx + 0.06f, 0.1f, 0f), new Vector3(0.045f, 0.085f, 0.066f - 0.008f - sis));
            KsYdin(r, new Vector3(rx + 0.14f, 0.05f, 0f), new Vector3(0.03f, 0.035f, 0.03f));
            for (int i = 0; i < rauniot.Length; i++)
            {
                var (x0, x1, y0, y1, kierto, kallistus) = rauniot[i];
                bool maassa = y0 == 0f;
                float ya = maassa ? 0f : y0 + s, yb = y1 - s;
                var p = new Vector3(rx + (x0 + x1) * 0.5f, (ya + yb) * 0.5f, 0.005f * (i % 3 - 1));
                var h = new Vector3((x1 - x0) * 0.5f - s, (yb - ya) * 0.5f, 0.066f - 0.008f * (i % 2) - s);
                KlKappale(r, KlRosoinen(KlLaatikko(p, h, Quaternion.Euler(0f, kierto, kallistus)), 500 + i, 0.008f, maassa),
                    KlViisteet(0.008f, 500 + i, new[] { 3, 7, 3, 2, 6, 3 }[i]), i % 2 == 0 ? KsRaunio : KsKivi2, maassa);
            }
            // Pienet kivet LOD0:n rajojen sisällä (sama leveys ja maavarjo): kaksi portailla, kaksi edessä ja yksi takana maassa.
            var pienet = new (float x, float y, float z, float hx, float hy, float hz, float kierto, float kallistus, int vari, float viiste)[]
            {
                (rx + 0.168f, 0.07f, 0.01f, 0.018f, 0.012f, 0.024f, -12f, 7f, 1, 0.004f),        // alimmalla portaalla
                (rx + 0.134f, 0.118f, -0.02f, 0.016f, 0.01f, 0.02f, 14f, -9f, 0, 0.0035f),        // toisella portaalla
                (rx + 0.098f, 0f, -0.084f, 0.017f, 0.012f, 0.014f, 30f, 0f, 2, 0.004f),           // edessä maassa
                (rx + 0.042f, 0f, -0.083f, 0.009f, 0.007f, 0.009f, 40f, 0f, 1, 0f),
                (rx + 0.13f, 0f, 0.066f, 0.017f, 0.012f, 0.013f, -25f, 0f, 0, 0.003f),            // takana
            };
            for (int i = 0; i < pienet.Length; i++)
            {
                var (x, py, z, hx, hy, hz, kierto, kallistus, v, b) = pienet[i];
                bool maassa = py == 0f;
                KlKappale(r, KlRosoinen(KlLaatikko(new Vector3(x, maassa ? hy : py, z), new Vector3(hx, hy, hz), Quaternion.Euler(0f, kierto, kallistus)), 600 + i, hy * 0.3f, maassa),
                    KlViisteet(b, 600 + i), v == 0 ? KsRaunio : v == 1 ? KsKivi : KsKivi2, maassa);
            }

            // Pudonnut kaarikivi kaaren alla: kiilan muotoinen, lohjennut kulma, halkeama päällä ja siru vieressä; irtokivet kuten LOD0.
            var qp = Quaternion.Euler(0f, 28f, 0f);
            var pp = new Vector3(cx + 0.1f, 0f, -0.02f);
            var kiila = new Vector3[8];
            for (int m = 0; m < 8; m++)
            {
                float sx = (m & 1) == 0 ? -1f : 1f, hz = sx < 0f ? 0.034f : 0.044f;
                kiila[m] = pp + qp * new Vector3(sx * 0.046f, (m & 2) == 0 ? 0f : 0.037f, ((m & 4) == 0 ? -1f : 1f) * hz);
            }
            var tp = KlKappale(r, KlRosoinen(kiila, 901, 0.002f, true), KlViisteet(0.0055f, 901, 3), KsRaunio, true);
            KlHalkeama(r, tp[3], 0.0045f, pp + qp * new Vector3(-0.036f, 0.04f, 0.004f), pp + qp * new Vector3(-0.014f, 0.04f, 0.012f), pp + qp * new Vector3(0.008f, 0.04f, 0.006f), pp + qp * new Vector3(0.03f, 0.04f, -0.01f));
            KlKappale(r, KlRosoinen(KlLaatikko(pp + qp * new Vector3(0.068f, 0.008f, -0.04f), new Vector3(0.012f, 0.008f, 0.01f), Quaternion.Euler(0f, 52f, 0f)), 902, 0.002f, true),
                KlViisteet(0.002f, 902), KsRaunio, true);
            KlKappale(r, KlRosoinen(KlLaatikko(new Vector3(0.47f, 0.0145f, -0.09f), new Vector3(0.021f, 0.0145f, 0.017f), Quaternion.Euler(0f, -20f, 0f)), 911, 0.003f, true),
                KlViisteet(0.005f, 911, 6), KsKivi2, true);
            KlKappale(r, KlRosoinen(KlLaatikko(new Vector3(-0.12f, 0.0105f, -0.15f), new Vector3(0.015f, 0.0105f, 0.013f), Quaternion.Euler(0f, 35f, 0f)), 912, 0.002f, true),
                KlViisteet(0.004f, 912, 2), KsRaunio, true);
        }

        /// <summary>Lohjennut kaarikivi (LOD0:n kivi 5): runko sisäkaaresta murtopintaan, murtunut yläpää ja sortuman puoleinen
        /// kylki rosoisina murtopintoina (tummempi raunion sävy), kaksi tynkää tekee murtoreunasta sahalaitaisen ja halkeama
        /// kulkee murtopinnasta alas. Yksi ääriviivaosa.</summary>
        static void KaariLahiLohjennut(Rakentaja r, Vector3 c, float ri, float a0, float a1, float d, Color vari)
        {
            const float s = KlSauma * 0.5f;
            float r0 = ri + s, da = s / (ri + 0.05f);
            float A0 = a0 - da, A1 = a1 + da;
            // Yläkulmien säteet (i, k): murtopinta vino ja epätasainen; sortuman puoleinen kylki kapenee ylöspäin.
            float[] r1 = { 0.252f, 0.268f, 0.262f, 0.256f };
            var P = new Vector3[8];
            for (int m = 0; m < 8; m++)
            {
                int i = m & 1, j = (m >> 1) & 1, k = m >> 2;
                float a = i == 1 ? A1 : j == 1 ? A0 - 0.035f : A0, rr = j == 0 ? r0 : r1[i + 2 * k];
                P[m] = c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, (k == 0 ? -1f : 1f) * (d - s) + (j == 1 ? 0.002f * (i - 0.5f) : 0f));
            }
            r.AloitaOsa();
            var t = KlKappale(r, P, KlViisteet(0.006f, 351), vari, false, (1 << 0) | (1 << 3), KsRaunio, 351);
            // Tyngät murtopinnalla (sahalaitainen siluetti).
            KlKappale(r, KlRosoinen(KlKiila(c, 0.245f, 0.281f, 0.69f, 0.625f, -(d - s), -0.012f), 352, 0.003f), KlViisteet(0f, 352), KsRaunio);
            KlKappale(r, KlRosoinen(KlKiila(c, 0.248f, 0.274f, 0.565f, 0.505f, 0.004f, d - s - 0.006f), 353, 0.003f), KlViisteet(0f, 353), KsRaunio);
            r.LopetaOsa();
            KlHalkeama(r, t[4], 0.0045f, KlP(0.119f, 0.622f), KlP(0.114f, 0.609f), KlP(0.107f, 0.599f), KlP(0.102f, 0.585f));
        }

        static Mesh KaariLahi() { var r = new Rakentaja(); KaariLahiKivet(r); return r.Verkko("kategoria-Kaari-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso (ei vielä rekisteröity, rajapinta 1.0.29).</summary>
        public static Mesh KategoriaKaari3DLahi() => KaariLahi();

        // ---- Lähitason apurit (Kl = kategoria lähi; siirretään KategoriaApurit.cs:ään, kun muutkin symbolit saavat lähitason) ----

        /// <summary>Lähitason sauma: ohuempi kuin <see cref="KsSauma"/>, koska viisteet leventävät näkyvää saumaa.</summary>
        const float KlSauma = 0.014f;

        /// <summary>Kappaleen tahkon taso halkeamia varten: tahkon keskipiste ja ulospäin osoittava normaali.</summary>
        struct KlTaso { public Vector3 P, N; }

        /// <summary>Piste etu- tai takatahkolla (x, y); halkeama projisoi sen tahkon tasoon.</summary>
        static Vector3 KlP(float x, float y) => new Vector3(x, y, 0f);

        /// <summary>Laatikon kulmat (järjestys i + 2j + 4k: x-, y- ja z-puoli) keskipisteestä p puolikoolla h ja asennolla q.</summary>
        static Vector3[] KlLaatikko(Vector3 p, Vector3 h, Quaternion q)
        {
            var P = new Vector3[8];
            for (int m = 0; m < 8; m++)
                P[m] = p + q * new Vector3((m & 1) == 0 ? -h.x : h.x, (m & 2) == 0 ? -h.y : h.y, (m & 4) == 0 ? -h.z : h.z);
            return P;
        }

        /// <summary>Kaarikiven (kiilan) kulmat keskipisteestä c: i = kulma a0/a1, j = säde r0/r1, k = syvyys z0/z1.</summary>
        static Vector3[] KlKiila(Vector3 c, float r0, float r1, float a0, float a1, float z0, float z1)
        {
            var P = new Vector3[8];
            for (int m = 0; m < 8; m++)
            {
                float a = (m & 1) == 0 ? a0 : a1, rr = (m & 2) == 0 ? r0 : r1;
                P[m] = c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, (m & 4) == 0 ? z0 : z1);
            }
            return P;
        }

        /// <summary>Kiven epätasaisuus: pieni kierto oman keskipisteen ympäri ja siirto (sisennys tai ulonnus).</summary>
        static Vector3[] KlAsento(Vector3[] P, Quaternion q, Vector3 siirto)
        {
            var k = Vector3.zero;
            foreach (var p in P) k += p;
            k /= P.Length;
            for (int m = 0; m < P.Length; m++) P[m] = k + q * (P[m] - k) + siirto;
            return P;
        }

        /// <summary>Kiven pieni kallistus (asteina, toistettava): käsin muurattu, jokainen tahko saa hieman eri valon.</summary>
        static Quaternion KlKallistus(int siemen, float asteet) =>
            Quaternion.Euler(asteet * KvKohina(siemen, 1), asteet * 1.3f * KvKohina(siemen, 2), asteet * 0.5f * KvKohina(siemen, 3));

        /// <summary>Rosoinen kivi: kulmia siirretään toistettavasti enintään m (maassa olevan kiven pohja pysyy maassa).</summary>
        static Vector3[] KlRosoinen(Vector3[] P, int siemen, float m, bool maassa = false)
        {
            for (int q = 0; q < 8; q++)
                P[q] += new Vector3(KvKohina(siemen, 3 * q) * m, maassa && (q & 2) == 0 ? 0f : KvKohina(siemen, 3 * q + 1) * m, KvKohina(siemen, 3 * q + 2) * m);
            return P;
        }

        /// <summary>Kulmien viisteet: perusleveys ±25 % toistettavaa kohinaa; lohkeama = yhden kulman viiste 2,6 ×.</summary>
        static float[] KlViisteet(float b, int siemen, int lohkeama = -1)
        {
            var v = new float[8];
            for (int q = 0; q < 8; q++) v[q] = b * (1f + 0.25f * KvKohina(siemen, q + 11));
            if (lohkeama >= 0) v[lohkeama] = b * 2.6f;
            return v;
        }

        /// <summary>
        /// Lähitason kivi: kuusitahokas kulmapisteistä P (indeksi i + 2j + 4k), jonka jokainen kulma on viistetty omalla
        /// leveydellään b[q] (leveä viiste = lohjennut kulma, 0 = terävä). Tahkot, särmien viisteet ja kulmakolmiot: 44 kolmiota,
        /// maassa ilman pohjaa 30. Murtopinnat (bittimaski tahkoista 2 × akseli + puoli) ovat teräväreunaisia ja rosoisia
        /// (kahdeksankulmio, jonka keskiosa on kuopalla) omalla värillään. Palauttaa tahkojen tasot (sama indeksi; etu = 4,
        /// taka = 5, ylä = 3) halkeamia varten. Oma ääriviivaosa.
        /// </summary>
        static KlTaso[] KlKappale(Rakentaja r, Vector3[] P, float[] b, Color vari, bool maassa = false, int murto = 0, Color murtoVari = default, int siemen = 0)
        {
            var keski = Vector3.zero;
            for (int q = 0; q < 8; q++) keski += P[q];
            keski /= 8f;
            // Terävät tahkot: maata vasten oleva pohja ja murtopinnat (niiden särmiä ei viistetä).
            int terava = murto | (maassa ? 1 << 2 : 0);
            bool Terava(int a, int q) => (terava & (1 << (2 * a + ((q >> a) & 1)))) != 0;
            var F = new Vector3[24];                                     // tahkojen kärjet: 8 × akseli + kulma
            for (int q = 0; q < 8; q++)
            {
                Vector3 ex = P[q ^ 1] - P[q], ey = P[q ^ 2] - P[q], ez = P[q ^ 4] - P[q];
                float lx = ex.magnitude, ly = ey.magnitude, lz = ez.magnitude;
                float bq = Mathf.Min(b[q], 0.4f * Mathf.Min(lx, Mathf.Min(ly, lz)));
                Vector3 dx = Terava(0, q) ? Vector3.zero : ex * (bq / lx);
                Vector3 dy = Terava(1, q) ? Vector3.zero : ey * (bq / ly);
                Vector3 dz = Terava(2, q) ? Vector3.zero : ez * (bq / lz);
                F[q] = P[q] + dy + dz; F[8 + q] = P[q] + dx + dz; F[16 + q] = P[q] + dx + dy;
            }
            r.AloitaOsa();
            var tasot = new KlTaso[6];
            for (int a = 0; a < 3; a++)
                for (int sd = 0; sd < 2; sd++)
                {
                    int f = 2 * a + sd, u = a == 0 ? 2 : 1, v = a == 2 ? 2 : 4, q0 = sd << a;
                    int[] kk = { q0, q0 + u, q0 + u + v, q0 + v };
                    Vector3 A = F[8 * a + kk[0]], B = F[8 * a + kk[1]], C = F[8 * a + kk[2]], D = F[8 * a + kk[3]];
                    var nt = Vector3.Cross(C - A, D - B).normalized;
                    var mt = (A + B + C + D) / 4f;
                    if (Vector3.Dot(nt, mt - keski) < 0f) nt = -nt;
                    tasot[f] = new KlTaso { P = mt, N = nt };
                    if ((terava & (1 << f)) == 0) { r.NelioKeskelta(A, B, C, D, keski, vari); continue; }
                    if ((murto & (1 << f)) == 0) continue;                    // maata vasten: ei piirretä
                    // Murtopinta: reunana viereisten tahkojen ja viisteiden päät (kahdeksankulmio), sisärengas ja kuoppa.
                    int au = a == 0 ? 1 : 0, av = a == 2 ? 1 : 2;
                    var o = new Vector3[8];
                    for (int e = 0; e < 4; e++)
                    {
                        Vector3 pu = F[8 * au + kk[e]], pv = F[8 * av + kk[e]];
                        o[2 * e] = e % 2 == 0 ? pu : pv; o[2 * e + 1] = e % 2 == 0 ? pv : pu;
                    }
                    var ok = Vector3.zero;
                    foreach (var p in o) ok += p;
                    ok /= 8f;
                    float koko = Mathf.Max((o[4] - o[0]).magnitude, (o[6] - o[2]).magnitude);
                    var sisa = new Vector3[8];
                    for (int e = 0; e < 8; e++) sisa[e] = Vector3.Lerp(ok, o[e], 0.55f) + nt * (koko * 0.05f * KvKohina(siemen + f, e));
                    var kuoppa = ok - nt * (koko * 0.06f) + (o[1] - o[5]) * (0.1f * KvKohina(siemen + f, 9));
                    for (int e = 0; e < 8; e++)
                    {
                        int e2 = (e + 1) % 8;
                        r.NelioKeskelta(o[e], o[e2], sisa[e2], sisa[e], keski, murtoVari);
                        r.KolmioKeskelta(sisa[e], sisa[e2], kuoppa, keski, murtoVari);
                    }
                }
            for (int q = 0; q < 8; q++)
            {
                // Särmä akselin suuntaan kahden muun akselin tahkojen välissä; terävän tahkon särmät jäävät viisteettä.
                if ((q & 1) == 0 && !Terava(1, q) && !Terava(2, q)) r.NelioKeskelta(F[8 + q], F[8 + (q ^ 1)], F[16 + (q ^ 1)], F[16 + q], keski, vari);
                if ((q & 2) == 0 && !Terava(0, q) && !Terava(2, q)) r.NelioKeskelta(F[q], F[q ^ 2], F[16 + (q ^ 2)], F[16 + q], keski, vari);
                if ((q & 4) == 0 && !Terava(0, q) && !Terava(1, q)) r.NelioKeskelta(F[q], F[q ^ 4], F[8 + (q ^ 4)], F[8 + q], keski, vari);
                if (!Terava(0, q) && !Terava(1, q) && !Terava(2, q)) r.KolmioKeskelta(F[q], F[8 + q], F[16 + q], keski, vari);
            }
            r.LopetaOsa();
            return tasot;
        }

        /// <summary>Lähitason halkeama: murtoviiva kiven tahkolla (pisteet projisoidaan tahkon tasoon ja nostetaan hieman sen
        /// eteen), keskeltä leveä ja päistä kapea. Lyhyet palat ilman omaa ääriviivaa.</summary>
        static void KlHalkeama(Rakentaja r, KlTaso t, float leveys, params Vector3[] p)
        {
            var W = new Vector3[p.Length];
            for (int i = 0; i < p.Length; i++) W[i] = p[i] - t.N * Vector3.Dot(p[i] - t.P, t.N) + t.N * 0.0008f;
            for (int i = 0; i + 1 < p.Length; i++)
            {
                bool alku = i == 0, loppu = i + 2 == p.Length;
                float w0 = leveys * (alku ? 0.35f : 1f) * 0.5f, w1 = leveys * (loppu ? 0.35f : 1f) * 0.5f;
                var suunta = (W[i + 1] - W[i]).normalized;
                var sv = Vector3.Cross(t.N, suunta).normalized;
                Vector3 A = W[i] - suunta * (alku ? 0f : w0), B = W[i + 1] + suunta * (loppu ? 0f : w1);
                r.NelioUlos(A - sv * w0, B - sv * w1, B + sv * w1, A + sv * w0, t.N, KsMuste);
            }
        }
    }
}
