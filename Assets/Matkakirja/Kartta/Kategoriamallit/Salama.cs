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

        static readonly bool salamaMalli = RekisteroiKategoria(Kategoriasymboli.Salama, new Erikoismalli { Runko = SalamaRunko, Lod1 = SalamaLod1 });
    }
}
