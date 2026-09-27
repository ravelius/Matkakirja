using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI SALAMA (skandaalit), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// SKANDAALI: kivinen huutomerkki (merkki-huuto.png oikeana 3D-esineenä). Kapeneva palkki kiviä kuten raunioitunut kaari:
        /// jalkakivi viisteineen, kolme runkokiveä (leveä ylhäällä, kapea alhaalla) ja viistetty kapiteeli erillisinä kivinä,
        /// joiden saumoista näkyy musteydin; alla hakattu kivipallo, jonka päällä palkki lepää lyhyen mustetapin varassa, joten
        /// väli näkyy kuvamerkin tapaan tummana. Halkeamia palkin ja kapiteelin etupinnalla ja pallossa. Koko merkki on
        /// kallistettu 20° taaksepäin pallon ympäri, ja kapiteelin kanteen on kaiverrettu pieni huutomerkki: suoraan ylhäältä
        /// näkyy kansi merkkeineen, lyhentynyt palkki ja pallo, ja kallistettuna merkki kääntyy lähes suoraan katsojaan päin.
        /// Leveys 0,28, korkeus 0,86, syvyys 0,46 (keskitetty), ei jalustaa (pallo on maassa).
        /// LOD1: yksi runkokivi, harvempi pallo, ei halkeamia, tappia eikä ydintä.
        /// </summary>
        static void SalamaOsat(Rakentaja r, bool lod1)
        {
            float kal = SaKallistus * Mathf.Deg2Rad;
            const float jalka0 = 0.285f, jalka1 = 0.355f, runko1 = 0.755f, katto = 0.885f, kapSyv = 0.13f;
            var pallo = new Vector3(0f, SaPalloSade, 0f);
            // Kallistus taaksepäin pallon keskipisteen ympäri (pallo pysyy maassa); koko merkki siirretään eteen niin, että
            // syvyysrajat ovat keskellä (pallon etureuna ja kapiteelin takayläkulma yhtä kaukana origosta).
            float takaZ = (katto - 0.035f - SaPalloSade) * Mathf.Sin(kal) + (kapSyv - KsSauma * 0.5f) * Mathf.Cos(kal);
            var siirto = new Vector3(0f, 0f, -0.5f * (takaZ - SaPalloSade));
            Vector3 T(Vector3 p)
            {
                var d = p - pallo;
                return pallo + siirto + new Vector3(d.x, d.y * Mathf.Cos(kal) - d.z * Mathf.Sin(kal), d.y * Mathf.Sin(kal) + d.z * Mathf.Cos(kal));
            }
            const float syv = 0.068f;                           // rungon puolisyvyys
            float Leveys(float y) => Mathf.Lerp(0.07f, 0.108f, (y - jalka1) / (runko1 - jalka1));

            // Musteydin: palkin sisällä (sisennetty kivipinnoista), näkyy vain saumoista.
            const float sis = 0.02f;
            if (!lod1)
                SaKivi(r, T, new[] { (jalka0 + 0.02f, Leveys(jalka1) - sis, syv - sis), (runko1, Leveys(runko1) - sis, syv - sis), (katto - 0.03f, Leveys(runko1) - sis, syv - sis) },
                    KsMuste, true, 0f);

            // Jalkakivi: suora kylki ja viiste runkoon.
            SaKivi(r, T, new[] { (jalka0, 0.1f, 0.088f), (jalka1 - 0.018f, 0.1f, 0.088f), (jalka1, Leveys(jalka1) + 0.012f, syv + 0.01f) }, KsPohja);
            // Runkokivet (kapenevat alaspäin).
            float[] y = lod1 ? new[] { jalka1, runko1 } : new[] { jalka1, 0.49f, 0.625f, runko1 };
            for (int k = 0; k + 1 < y.Length; k++)
            {
                float y0 = y[k], y1 = y[k + 1];
                SaKivi(r, T, new[] { (y0, Leveys(y0), syv), (y1, Leveys(y1), syv) }, k == 1 ? KsKivi2 : k == 2 ? KsKivi3 : KsKivi);
            }
            // Kapiteeli: alaviiste rungosta ulos, suora kylki ja yläviiste kattoon.
            SaKivi(r, T, new[] { (runko1, Leveys(runko1) + 0.012f, syv + 0.012f), (runko1 + 0.028f, 0.152f, kapSyv), (katto - 0.035f, 0.152f, kapSyv), (katto, 0.124f, kapSyv - 0.028f) }, KsKivi3);

            // Pallo (ei kierretä kallistuksen mukana, joten alanapa pysyy maassa) ja tappi.
            Vector3 Siirretty(Vector3 p) => p + siirto;
            SaPallo(r, Siirretty, pallo, SaPalloSade, lod1 ? 8 : 12, lod1 ? 5 : 8, lod1 ? 0f : 0.035f, KsKivi2);
            SaKaiverrus(r, T, katto - KsSauma * 0.5f + 0.0015f, lod1);
            if (lod1) return;
            SaKivi(r, T, new[] { (SaPalloSade * 2f - 0.01f, 0.013f, 0.013f), (jalka0 + 0.01f, 0.013f, 0.013f) }, KsMuste, true, 0f);

            // Halkeamat etupinnalla (−Z), kuten kuvamerkissä.
            float z = -(syv - KsSauma * 0.5f) - 0.0012f;
            SaHalkeama(r, T, z, new[] { new Vector2(-0.05f, 0.73f), new Vector2(-0.02f, 0.68f), new Vector2(-0.035f, 0.64f) });
            SaHalkeama(r, T, z, new[] { new Vector2(0.03f, 0.6f), new Vector2(0.01f, 0.55f), new Vector2(0.03f, 0.51f) });
            SaHalkeama(r, T, z, new[] { new Vector2(-0.02f, 0.46f), new Vector2(0.015f, 0.42f) });
            SaHalkeama(r, T, -(kapSyv - KsSauma * 0.5f) - 0.0012f, new[] { new Vector2(0.06f, 0.84f), new Vector2(0.09f, 0.81f) });
            // Pallon halkeama: lyhyt murtoviiva etupinnalla.
            SaPalloHalkeama(r, Siirretty, pallo, SaPalloSade, new[] { (-0.5f, 0.35f), (-0.2f, 0.1f), (0.05f, 0.2f) });
        }

        /// <summary>Pallon säde ja koko merkin kallistus taaksepäin (astetta).</summary>
        const float SaPalloSade = 0.085f, SaKallistus = 20f;

        /// <summary>Kapiteelin kansen kaiverrus (muste): pieni huutomerkki pitkittäin kohti +Z:aa (ylhäältä katsottuna pystyssä),
        /// korkeudella y paikallisesti.</summary>
        static void SaKaiverrus(Rakentaja r, Func<Vector3, Vector3> T, float y, bool lod1)
        {
            var ylos = T(new Vector3(0f, y + 1f, 0f)) - T(new Vector3(0f, y, 0f));
            Vector3 V(float x, float z) => T(new Vector3(x, y, z));
            // Palkki: levenee taaksepäin kuten kuvamerkin varsi.
            r.NelioUlos(V(-0.012f, -0.02f), V(0.012f, -0.02f), V(0.022f, 0.085f), V(-0.022f, 0.085f), ylos, KsMuste);
            // Piste: kahdeksankulmio.
            var k = new Vector2(0f, -0.058f);
            for (int i = 0; i < (lod1 ? 4 : 8); i++)
            {
                int m = lod1 ? 4 : 8;
                float a0 = i * Mathf.PI * 2f / m, a1 = (i + 1) * Mathf.PI * 2f / m;
                r.KolmioUlos(V(k.x, k.y), V(k.x + Mathf.Cos(a0) * 0.02f, k.y + Mathf.Sin(a0) * 0.02f), V(k.x + Mathf.Cos(a1) * 0.02f, k.y + Mathf.Sin(a1) * 0.02f), ylos, KsMuste);
            }
        }

        /// <summary>
        /// Kivi: renkaat (korkeus, puolileveys, puolisyvyys) alhaalta ylös, kylki renkaiden välissä ja katto; sauma kutistaa
        /// kiven joka suunnasta puolella saumasta. T vie paikallisen pisteen malliin (kallistus). Pohja piirretään, jos pohja.
        /// Oma ääriviivaosa.
        /// </summary>
        static void SaKivi(Rakentaja r, Func<Vector3, Vector3> T, (float y, float lx, float lz)[] renkaat, Color vari, bool pohja = true, float sauma = KsSauma)
        {
            float s = sauma * 0.5f;
            int m = renkaat.Length;
            var p = new Vector3[m, 4];
            for (int j = 0; j < m; j++)
            {
                var (y, lx, lz) = renkaat[j];
                if (j == 0) y += s;
                if (j == m - 1) y -= s;
                lx -= s; lz -= s;
                p[j, 0] = T(new Vector3(-lx, y, -lz)); p[j, 1] = T(new Vector3(lx, y, -lz));
                p[j, 2] = T(new Vector3(lx, y, lz)); p[j, 3] = T(new Vector3(-lx, y, lz));
            }
            var keski = T(new Vector3(0f, (renkaat[0].y + renkaat[m - 1].y) * 0.5f, 0f));
            r.AloitaOsa();
            for (int j = 0; j + 1 < m; j++)
                for (int i = 0; i < 4; i++)
                    r.NelioKeskelta(p[j, i], p[j, (i + 1) % 4], p[j + 1, (i + 1) % 4], p[j + 1, i], keski, vari);
            r.NelioKeskelta(p[m - 1, 0], p[m - 1, 1], p[m - 1, 2], p[m - 1, 3], keski, vari);
            if (pohja) r.NelioKeskelta(p[0, 0], p[0, 1], p[0, 2], p[0, 3], keski, vari);
            r.LopetaOsa();
        }

        /// <summary>Hakattu kivipallo: keskipiste c, säde rr, n sektoria ja m kerrosta, toistettava kohina säteessä. Oma osa.</summary>
        static void SaPallo(Rakentaja r, Func<Vector3, Vector3> T, Vector3 c, float rr, int n, int m, float kohina, Color vari)
        {
            var p = new Vector3[m + 1, n];
            for (int j = 0; j <= m; j++)
            {
                float th = Mathf.PI * j / m;
                for (int i = 0; i < n; i++)
                {
                    float a = i * Mathf.PI * 2f / n;
                    float s = j == 0 || j == m ? 1f : 1f + kohina * KvKohina(i * 7 + j * 13, 53);
                    p[j, i] = T(c + new Vector3(Mathf.Sin(th) * Mathf.Cos(a), Mathf.Cos(th), Mathf.Sin(th) * Mathf.Sin(a)) * (rr * s));
                }
            }
            var k = T(c);
            r.AloitaOsa();
            for (int j = 0; j < m; j++)
                for (int i = 0; i < n; i++)
                {
                    int q = (i + 1) % n;
                    r.NelioKeskelta(p[j, i], p[j, q], p[j + 1, q], p[j + 1, i], k, vari);
                }
            r.LopetaOsa();
        }

        /// <summary>Halkeama: murtoviiva (x, y) kiven etupinnalla syvyydellä z, ohuina musteviivoina.</summary>
        static void SaHalkeama(Rakentaja r, Func<Vector3, Vector3> T, float z, Vector2[] pisteet, float leveys = 0.008f)
        {
            for (int i = 0; i + 1 < pisteet.Length; i++)
            {
                Vector2 a = pisteet[i], b = pisteet[i + 1];
                var d = (b - a).normalized; var n = new Vector2(-d.y, d.x) * (leveys * 0.5f);
                Vector3 V(Vector2 p) => T(new Vector3(p.x, p.y, z));
                var ulos = T(new Vector3(a.x, a.y, z - 1f)) - V(a);
                r.NelioUlos(V(a - n), V(b - n), V(b + n), V(a + n), ulos, KsMuste);
            }
        }

        /// <summary>Pallon halkeama: murtoviiva pallon pinnalla, pisteet (x, y) pallon etupuolen projektiona (säteen osina).</summary>
        static void SaPalloHalkeama(Rakentaja r, Func<Vector3, Vector3> T, Vector3 c, float rr, (float x, float y)[] pisteet, float leveys = 0.008f)
        {
            Vector3 Pinta(float x, float y) { float zz = -Mathf.Sqrt(Mathf.Max(0f, 1f - x * x - y * y)); return c + new Vector3(x, y, zz) * (rr * 1.04f); }
            for (int i = 0; i + 1 < pisteet.Length; i++)
            {
                Vector3 a = Pinta(pisteet[i].x, pisteet[i].y), b = Pinta(pisteet[i + 1].x, pisteet[i + 1].y);
                var nrm = ((a + b) * 0.5f - c).normalized;
                var sivu = Vector3.Cross(b - a, nrm).normalized * (leveys * 0.5f);
                r.NelioUlos(T(a - sivu), T(b - sivu), T(b + sivu), T(a + sivu), T(c + nrm) - T(c), KsMuste);
            }
        }

        static Mesh SalamaRunko() { var r = new Rakentaja(); SalamaOsat(r, false); return r.Verkko("kategoria-Salama"); }
        static Mesh SalamaLod1() { var r = new Rakentaja(); SalamaOsat(r, true); return r.Verkko("kategoria-Salama-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaSalama3D(bool lod1 = false) => lod1 ? SalamaLod1() : SalamaRunko();

        static readonly bool salamaMalli = RekisteroiKategoria(Kategoriasymboli.Salama, new Erikoismalli { Runko = SalamaRunko, Lod1 = SalamaLod1, Lahi = SalamaLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x Fablen kautta; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama kivinen huutomerkki lähizoomiin (kartan kerroin ≥ 4, korvaa LOD0:n). Sama siluetti, mittasuhteet,
        /// värit, 20°:n kallistus ja sommitelma kuin LOD0:ssa (jalkakivi, kolme kapenevaa runkokiveä, kapiteeli, kannen
        /// kaiverrus, mustetappi ja hakattu pallo), mutta 1 052 kolmiota (LOD0 310, noin 3,4 ×) lähikuvan yksityiskohtiin:
        /// runkokivet viistettyinä, kulmat lohjenneina ja hieman kallellaan (käsin muurattu, ohuemmat saumat musteytimineen),
        /// jalkakivessä pyöristetty yläsärmä, kapiteelissa helmirengas, kovera kaula, suora kansilaatta ja kaksiviisteinen
        /// yläreuna sekä lohjennut etukulma, pyöreämpi pallo kolmine hakattuine lohkeamineen, kahdeksankulmainen tappi ja sen
        /// kaulus pallon päällä, halkeamat murtoviivoina haaroineen (LOD0:n kohdat ja muutama lisää kannessa, jalassa ja
        /// pallossa) ja kannen huutomerkki kuvamerkin muotoisena. Kaiverrustyyli ennallaan:
        /// seepiarampin värit (Ramppi) ja musteydin saumoissa. Apurit (SalamaLahi-alkuiset) ovat tässä tiedostossa; kivet
        /// ja halkeamat käyttävät kaaren lähitason apureita (Kl, Kaari.cs).
        /// </summary>
        static void SalamaLahiOsat(Rakentaja r)
        {
            float kal = SaKallistus * Mathf.Deg2Rad;
            const float jalka0 = 0.285f, jalka1 = 0.355f, runko1 = 0.755f, katto = 0.885f, kapSyv = 0.13f, syv = 0.068f;
            var pallo = new Vector3(0f, SaPalloSade, 0f);
            // Sama kallistus ja siirto kuin LOD0:ssa (vaihto lähitasoon ei saa hypätä).
            float takaZ = (katto - 0.035f - SaPalloSade) * Mathf.Sin(kal) + (kapSyv - KsSauma * 0.5f) * Mathf.Cos(kal);
            var siirto = new Vector3(0f, 0f, -0.5f * (takaZ - SaPalloSade));
            Vector3 T(Vector3 p)
            {
                var d = p - pallo;
                return pallo + siirto + new Vector3(d.x, d.y * Mathf.Cos(kal) - d.z * Mathf.Sin(kal), d.y * Mathf.Sin(kal) + d.z * Mathf.Cos(kal));
            }
            Vector3 Rt(Vector3 v) => T(v) - T(Vector3.zero);
            float Leveys(float y) => Mathf.Lerp(0.07f, 0.108f, (y - jalka1) / (runko1 - jalka1));
            // Pystysaumat ohuempia kuin LOD0:ssa (viisteet leventävät näkyvää saumaa), vaakamitat kuten LOD0:ssa (sama siluetti).
            const float s = KlSauma * 0.5f, sh = KsSauma * 0.5f, sis = 0.02f;

            // Musteydin kuten LOD0:ssa (näkyy vain saumoista).
            SaKivi(r, T, new[] { (jalka0 + 0.02f, Leveys(jalka1) - sis, syv - sis), (runko1, Leveys(runko1) - sis, syv - sis), (katto - 0.03f, Leveys(runko1) - sis, syv - sis) },
                KsMuste, true, 0f);

            // Jalkakivi: viistetty pohja, suora kylki, pyöristetty yläsärmä ja viiste runkoon (LOD0:n profiili).
            float jl = 0.1f - sh, jz = 0.088f - sh;
            SalamaLahiKivi(r, T, new[]
            {
                (jalka0 + s, jl - 0.005f, jz - 0.005f, 0.004f), (jalka0 + s + 0.005f, jl, jz, 0.007f), (jalka1 - 0.022f, jl, jz, 0.007f),
                (jalka1 - 0.016f, jl - 0.004f, jz - 0.004f, 0.006f), (jalka1 - s, Leveys(jalka1) + 0.012f - sh, syv + 0.01f - sh, 0.006f),
            }, KsPohja, 11, null);

            // Runkokivet (kapenevat alaspäin): viistetyt särmät, kaksi lohjennutta etukulmaa (iso ja pienempi), pieni
            // kallistus ja sisennys.
            float[] y = { jalka1, 0.49f, 0.625f, runko1 };
            int[] lohkeama = { 3, 0, 2 }, toinen = { 0, 3, 1 };
            var etu = new KlTaso[3];
            for (int k = 0; k < 3; k++)
            {
                float y0 = y[k] + s, y1 = y[k + 1] - s;
                var P = new Vector3[8];
                for (int m = 0; m < 8; m++)
                {
                    float yy = (m & 2) == 0 ? y0 : y1, lx = ((m & 2) == 0 ? Leveys(y[k]) : Leveys(y[k + 1])) - sh;
                    P[m] = T(new Vector3((m & 1) == 0 ? -lx : lx, yy, (m & 4) == 0 ? -(syv - sh) : syv - sh));
                }
                int sk = 20 + 10 * k;
                KlAsento(P, KlKallistus(sk, 1.1f), Rt(new Vector3(0.0015f * KvKohina(sk, 5), 0f, 0.0025f * KvKohina(sk, 7))));
                var viisteet = KlViisteet(0.0055f, sk, lohkeama[k]);
                viisteet[toinen[k]] *= 1.8f;
                etu[k] = KlKappale(r, P, viisteet, k == 1 ? KsKivi2 : k == 2 ? KsKivi3 : KsKivi)[4];
            }

            // Kapiteeli: helmirengas, kovera kaula, suora kansilaatta ja kaksiviisteinen yläreuna; etuvasen yläkulma lohjennut.
            float kl = 0.152f - sh, kz = kapSyv - sh, yk = katto - sh;
            SalamaLahiKivi(r, T, new[]
            {
                (runko1 + s, Leveys(runko1) + 0.009f - sh, syv + 0.009f - sh, 0.005f),
                (runko1 + s + 0.003f, Leveys(runko1) + 0.016f - sh, syv + 0.016f - sh, 0.006f), (runko1 + s + 0.009f, Leveys(runko1) + 0.016f - sh, syv + 0.016f - sh, 0.006f),
                (runko1 + s + 0.012f, Leveys(runko1) + 0.012f - sh, syv + 0.012f - sh, 0.006f),
                (runko1 + 0.022f, Leveys(runko1) + 0.018f - sh, syv + 0.02f - sh, 0.007f), (runko1 + 0.029f, kl - 0.012f, kz - 0.018f, 0.008f),
                (runko1 + 0.034f, kl, kz, 0.008f), (katto - 0.039f, kl, kz, 0.008f), (katto - 0.033f, kl - 0.004f, kz - 0.004f, 0.008f),
                (katto - 0.02f, kl - 0.017f, kz - 0.017f, 0.007f), (yk, 0.124f - sh, kapSyv - 0.028f - sh, 0.006f),
            }, KsKivi3, 12, (j, i, p) =>
            {
                // Lohkeama: kaksi ylintä rengasta painuvat etuvasemmassa kulmassa (kärjet 7 ja 0) sisään ja alas; kannen
                // sisärengas (11) pysyy tasossa, joten vain reunakaista lohkeaa.
                if (j < 9 || j > 10 || (i != 7 && i != 0)) return p;
                float t = j == 10 ? 1f : 0.55f;
                return p + new Vector3(0.011f * t, -0.012f * t, 0.008f * t);
            }, true, 0.024f);
            SalamaLahiKaiverrus(r, T, yk + 0.0015f);
            var kapEtu = new KlTaso { P = T(new Vector3(0f, 0.82f, -kz)), N = Rt(Vector3.back).normalized };

            // Pallo (ei kallistu, alanapa maassa) ja mustetappi kuten LOD0:ssa, kahdeksankulmaisena, ja tapin kaulus pallon päällä.
            Vector3 Siirretty(Vector3 p) => p + siirto;
            SalamaLahiPallo(r, Siirretty, pallo, SaPalloSade, 20, 12, KsKivi2);
            // Tappi 0,013 kuten LOD0:ssa: kallistettuna sen syvyysmitta ylittää ääriviivan minimin, joten tapin ääriviiva
            // tummentaa palkin ja pallon välin kuvamerkin tapaan (ohuempi tappi menettäisi sen).
            SalamaLahiKivi(r, T, new[] { (SaPalloSade * 2f - 0.01f, 0.013f, 0.013f, 0.0045f), (jalka0 + 0.01f, 0.013f, 0.013f, 0.0045f) }, KsMuste, 13, null);
            SalamaLahiKivi(r, T, new[] { (SaPalloSade * 2f - 0.004f, 0.019f, 0.019f, 0.0075f), (SaPalloSade * 2f + 0.005f, 0.019f, 0.019f, 0.0075f),
                (SaPalloSade * 2f + 0.009f, 0.015f, 0.015f, 0.006f) }, KsMuste, 14, null, false);

            // Halkeamat etupinnoilla (LOD0:n kohdat murtoviivoina, lyhyet haarat loivassa kulmassa) ja pallon halkeama.
            Vector3 E(float x, float yy) => T(new Vector3(x, yy, -syv));
            Vector3 K(float x, float yy) => T(new Vector3(x, yy, -kz));
            KlHalkeama(r, etu[2], 0.0055f, E(-0.056f, 0.738f), E(-0.045f, 0.722f), E(-0.031f, 0.707f), E(-0.024f, 0.69f), E(-0.028f, 0.672f), E(-0.022f, 0.656f), E(-0.033f, 0.641f));
            KlHalkeama(r, etu[2], 0.003f, E(-0.028f, 0.672f), E(-0.041f, 0.664f), E(-0.052f, 0.662f));
            KlHalkeama(r, etu[1], 0.005f, E(0.036f, 0.606f), E(0.028f, 0.592f), E(0.017f, 0.578f), E(0.011f, 0.56f), E(0.016f, 0.545f), E(0.024f, 0.53f), E(0.029f, 0.514f));
            KlHalkeama(r, etu[1], 0.003f, E(0.017f, 0.578f), E(0.031f, 0.574f), E(0.042f, 0.567f));
            KlHalkeama(r, etu[0], 0.0045f, E(-0.026f, 0.466f), E(-0.016f, 0.455f), E(-0.009f, 0.443f), E(0.003f, 0.435f), E(0.01f, 0.424f), E(0.018f, 0.414f));
            KlHalkeama(r, etu[0], 0.003f, E(0.049f, 0.474f), E(0.052f, 0.461f), E(0.047f, 0.449f), E(0.05f, 0.438f));
            KlHalkeama(r, kapEtu, 0.005f, K(0.056f, 0.844f), K(0.066f, 0.834f), K(0.072f, 0.826f), K(0.084f, 0.82f), K(0.093f, 0.808f));
            KlHalkeama(r, kapEtu, 0.0035f, K(-0.121f, 0.845f), K(-0.113f, 0.834f), K(-0.116f, 0.822f), K(-0.109f, 0.811f));
            var kansi = new KlTaso { P = T(new Vector3(0f, yk, 0f)), N = Rt(Vector3.up).normalized };
            Vector3 Y(float x, float z) => T(new Vector3(x, yk, z));
            KlHalkeama(r, kansi, 0.004f, Y(0.097f, -0.071f), Y(0.088f, -0.058f), Y(0.084f, -0.043f), Y(0.077f, -0.03f), Y(0.075f, -0.014f));
            var jalkaEtu = new KlTaso { P = T(new Vector3(0f, 0.315f, -jz)), N = Rt(Vector3.back).normalized };
            Vector3 J(float x, float yy) => T(new Vector3(x, yy, -jz));
            KlHalkeama(r, jalkaEtu, 0.004f, J(-0.052f, 0.333f), J(-0.046f, 0.322f), J(-0.05f, 0.311f), J(-0.043f, 0.3f));
            SalamaLahiPalloHalkeama(r, Siirretty, pallo, SaPalloSade, 0.0055f, new[] { (-0.56f, 0.36f), (-0.44f, 0.28f), (-0.33f, 0.2f), (-0.22f, 0.1f), (-0.1f, 0.12f), (0.02f, 0.17f), (0.1f, 0.22f) });
            SalamaLahiPalloHalkeama(r, Siirretty, pallo, SaPalloSade, 0.003f, new[] { (-0.33f, 0.2f), (-0.37f, 0.1f), (-0.36f, 0.02f) });
            SalamaLahiPalloHalkeama(r, Siirretty, pallo, SaPalloSade, 0.004f, new[] { (0.46f, 0.55f), (0.53f, 0.45f), (0.58f, 0.35f), (0.63f, 0.26f) });
        }

        /// <summary>Pallon lohkeamat (tasot, jotka leikkaavat pallon): suunta keskipisteestä ja tason etäisyys säteen osina.</summary>
        static readonly (Vector3 n, float d)[] SalamaLahiLohkeamat =
        {
            (new Vector3(-0.55f, 0.6f, -0.58f), 0.9f), (new Vector3(0.75f, -0.05f, -0.66f), 0.93f), (new Vector3(0.28f, 0.78f, -0.56f), 0.93f),
        };

        /// <summary>Hakatun pallon säde suunnassa dir (yksikkövektori): loiva toistettava epätasaisuus ja lohkeamien tasot.
        /// Kertoo myös, onko piste lohkeaman tasolla.</summary>
        static float SalamaLahiSade(Vector3 dir, float rr, out bool lohki)
        {
            float k = Mathf.Sin(5.1f * dir.x + 1.3f) * Mathf.Sin(4.3f * dir.z + 0.2f) + 0.7f * Mathf.Sin(6.2f * dir.y + 2.1f * dir.x + 0.9f);
            float sade = rr * (1f + 0.014f * k * Mathf.Clamp01((dir.y + 0.85f) * 2f));
            lohki = false;
            foreach (var (n, d) in SalamaLahiLohkeamat)
            {
                var nn = n.normalized;
                float c = Vector3.Dot(dir, nn);
                if (c <= 0.05f) continue;
                float t = rr * d / c;
                if (t < sade) { sade = t; lohki = true; }
            }
            return sade;
        }

        /// <summary>Lähitason hakattu kivipallo: keskipiste c, säde rr, n sektoria ja m kerrosta (joka toinen kerros puoli
        /// sektoria kierrettynä); napojen säde tarkka (alanapa maassa). Kokonaan lohkeaman tasolla olevat kolmiot raunion
        /// sävyllä (tuore murtopinta). Oma ääriviivaosa.</summary>
        static void SalamaLahiPallo(Rakentaja r, Func<Vector3, Vector3> T, Vector3 c, float rr, int n, int m, Color vari)
        {
            var p = new Vector3[m + 1, n];
            var lohki = new bool[m + 1, n];
            for (int j = 0; j <= m; j++)
            {
                float th = Mathf.PI * j / m;
                for (int i = 0; i < n; i++)
                {
                    float a = (i + (j % 2) * 0.5f) * Mathf.PI * 2f / n;
                    var dir = new Vector3(Mathf.Sin(th) * Mathf.Cos(a), Mathf.Cos(th), Mathf.Sin(th) * Mathf.Sin(a));
                    float sade = j == 0 || j == m ? rr : SalamaLahiSade(dir, rr, out lohki[j, i]);
                    p[j, i] = T(c + dir * sade);
                }
            }
            var k = T(c);
            r.AloitaOsa();
            for (int j = 0; j < m; j++)
                for (int i = 0; i < n; i++)
                {
                    int q = (i + 1) % n;
                    Vector3 a0 = p[j, i], a1 = p[j, q], b0 = p[j + 1, i], b1 = p[j + 1, q];
                    // Parillisella kerroksella alarengas on puoli sektoria edellä, parittomalla jäljessä: lävistäjä sen mukaan.
                    if (j % 2 == 0)
                    {
                        r.KolmioKeskelta(a0, a1, b0, k, lohki[j, i] && lohki[j, q] && lohki[j + 1, i] ? KsRaunio : vari);
                        r.KolmioKeskelta(a1, b1, b0, k, lohki[j, q] && lohki[j + 1, q] && lohki[j + 1, i] ? KsRaunio : vari);
                    }
                    else
                    {
                        r.KolmioKeskelta(a0, b1, b0, k, lohki[j, i] && lohki[j + 1, q] && lohki[j + 1, i] ? KsRaunio : vari);
                        r.KolmioKeskelta(a0, a1, b1, k, lohki[j, i] && lohki[j, q] && lohki[j + 1, q] ? KsRaunio : vari);
                    }
                }
            r.LopetaOsa();
        }

        /// <summary>Pallon halkeama: murtoviiva hakatun pallon pinnalla (pisteet (x, y) etupuolen projektiona säteen osina),
        /// pinnan muotoa seuraten ja hieman sen edessä; keskeltä leveä, päistä kapea.</summary>
        static void SalamaLahiPalloHalkeama(Rakentaja r, Func<Vector3, Vector3> T, Vector3 c, float rr, float leveys, (float x, float y)[] pisteet)
        {
            var W = new Vector3[pisteet.Length];
            var N = new Vector3[pisteet.Length];
            for (int i = 0; i < pisteet.Length; i++)
            {
                var (x, y) = pisteet[i];
                var dir = new Vector3(x, y, -Mathf.Sqrt(Mathf.Max(0f, 1f - x * x - y * y))).normalized;
                float sade = SalamaLahiSade(dir, rr, out _);
                W[i] = c + dir * (sade + 0.0018f); N[i] = dir;
            }
            for (int i = 0; i + 1 < W.Length; i++)
            {
                bool alku = i == 0, loppu = i + 2 == W.Length;
                float w0 = leveys * (alku ? 0.35f : 1f) * 0.5f, w1 = leveys * (loppu ? 0.35f : 1f) * 0.5f;
                var nrm = (N[i] + N[i + 1]).normalized;
                var suunta = (W[i + 1] - W[i]).normalized;
                var sv = Vector3.Cross(nrm, suunta).normalized;
                Vector3 A = W[i] - suunta * (alku ? 0f : w0), B = W[i + 1] + suunta * (loppu ? 0f : w1);
                r.NelioUlos(T(A - sv * w0), T(B - sv * w1), T(B + sv * w1), T(A + sv * w0), T(c + nrm) - T(c), KsMuste);
            }
        }

        /// <summary>
        /// Lähitason kivi: renkaat (korkeus, puolileveys, puolisyvyys, pystysärmän viiste) alhaalta ylös kahdeksankulmioina
        /// (suorakulmio, jonka pystysärmät on viistetty), vaippa renkaiden välissä, kansi ja pohja; T vie paikallisen pisteen
        /// malliin (kallistus). Kärjet saavat pienen toistettavan kohinan (käsin hakattu), ja muokkaa(j, i, p) voi siirtää
        /// paikallisia kärkiä (lohjennut kulma). Tahkojen suunta profiilista, joten koverat listat kääntyvät oikein. Oma osa.
        /// </summary>
        static void SalamaLahiKivi(Rakentaja r, Func<Vector3, Vector3> T, (float y, float lx, float lz, float c)[] renkaat, Color vari, int siemen,
            Func<int, int, Vector3, Vector3> muokkaa, bool pohja = true, float kansiSisennys = 0f)
        {
            // Kannen sisärengas (sisennys > 0): lohkeama painaa vain kannen reunakaistaa, ei koko kantta.
            if (kansiSisennys > 0f)
            {
                var (yt, lxt, lzt, ct) = renkaat[renkaat.Length - 1];
                var lisa = new (float, float, float, float)[renkaat.Length + 1];
                Array.Copy(renkaat, lisa, renkaat.Length);
                lisa[renkaat.Length] = (yt, lxt - kansiSisennys, lzt - kansiSisennys, ct * 0.8f);
                renkaat = lisa;
            }
            int m = renkaat.Length;
            var p = new Vector3[m, 8];
            var l = new Vector3[m, 8];
            // Kahdeksankulmion kärjet edestä vasemmalta vastapäivään (ylhäältä): etusärmä, oikea etuviiste, oikea kylki, ...
            float[] sx = { -1f, 1f, 1f, 1f, 1f, -1f, -1f, -1f }, sz = { -1f, -1f, -1f, 1f, 1f, 1f, 1f, -1f };
            bool[] xViiste = { true, true, false, false, true, true, false, false };
            for (int j = 0; j < m; j++)
            {
                var (yy, lx, lz, c) = renkaat[j];
                for (int i = 0; i < 8; i++)
                {
                    float x = sx[i] * (xViiste[i] ? lx - c : lx), z = sz[i] * (xViiste[i] ? lz : lz - c);
                    var q = new Vector3(x + 0.0012f * KvKohina(siemen, 16 * j + 2 * i), yy, z + 0.0012f * KvKohina(siemen, 16 * j + 2 * i + 1));
                    if (muokkaa != null) q = muokkaa(j, i, q);
                    l[j, i] = q; p[j, i] = T(q);
                }
            }
            Vector3 Rt(Vector3 v) => T(v) - T(Vector3.zero);
            r.AloitaOsa();
            for (int j = 0; j + 1 < m; j++)
                for (int i = 0; i < 8; i++)
                {
                    int q = (i + 1) % 8;
                    // Ulospäin: sivun vaakanormaali × nousu − ylös × sivun etäisyyden muutos (kuten sorvauksessa).
                    Vector3 m0 = (l[j, i] + l[j, q]) * 0.5f, m1 = (l[j + 1, i] + l[j + 1, q]) * 0.5f;
                    var t = l[j, q] - l[j, i];
                    var nh = new Vector3(t.z, 0f, -t.x).normalized;
                    if (nh.x * m0.x + nh.z * m0.z < 0f) nh = -nh;
                    float d0 = nh.x * m0.x + nh.z * m0.z, d1 = nh.x * m1.x + nh.z * m1.z;
                    r.NelioUlos(p[j, i], p[j, q], p[j + 1, q], p[j + 1, i], Rt(nh * (m1.y - m0.y) - Vector3.up * (d1 - d0)), vari);
                }
            for (int e = 0; e < 2; e++)
            {
                if (e == 0 && !pohja) continue;
                int j = e == 0 ? 0 : m - 1;
                var kk = T(new Vector3(0f, renkaat[j].y, 0f));
                var ulos = Rt(e == 0 ? -Vector3.up : Vector3.up);
                for (int i = 0; i < 8; i++) r.KolmioUlos(kk, p[j, i], p[j, (i + 1) % 8], ulos, vari);
            }
            r.LopetaOsa();
        }

        /// <summary>Lähitason kannen kaiverrus (muste): huutomerkki kuvamerkin muotoisena, varsi levenee taaksepäin ja sen
        /// yläkulmat ovat viistetyt, piste on 12-kulmio; pitkittäin kohti +Z:aa korkeudella y (paikallisesti).</summary>
        static void SalamaLahiKaiverrus(Rakentaja r, Func<Vector3, Vector3> T, float y)
        {
            var ylos = T(new Vector3(0f, y + 1f, 0f)) - T(new Vector3(0f, y, 0f));
            Vector3 V(float x, float z) => T(new Vector3(x, y, z));
            var varsi = new[] { V(-0.011f, -0.021f), V(0.011f, -0.021f), V(0.02f, 0.07f), V(0.017f, 0.084f), V(-0.017f, 0.084f), V(-0.02f, 0.07f) };
            var vk = V(0f, 0.035f);
            for (int i = 0; i < varsi.Length; i++) r.KolmioUlos(vk, varsi[i], varsi[(i + 1) % varsi.Length], ylos, KsMuste);
            var k = new Vector2(0f, -0.058f);
            for (int i = 0; i < 12; i++)
            {
                float a0 = i * Mathf.PI * 2f / 12, a1 = (i + 1) * Mathf.PI * 2f / 12;
                r.KolmioUlos(V(k.x, k.y), V(k.x + Mathf.Cos(a0) * 0.021f, k.y + Mathf.Sin(a0) * 0.021f), V(k.x + Mathf.Cos(a1) * 0.021f, k.y + Mathf.Sin(a1) * 0.021f), ylos, KsMuste);
            }
        }

        static Mesh SalamaLahi() { var r = new Rakentaja(); SalamaLahiOsat(r); return r.Verkko("kategoria-Salama-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaSalama3DLahi() => SalamaLahi();
    }
}
