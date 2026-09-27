using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI VAAKA (kauppa), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color VaMessinki = Ramppi(0xc2a67a), VaVarjo = Ramppi(0x9a7a52), VaKuppi = Ramppi(0xc9a878), VaReuna = Ramppi(0xefe3c6), VaVarsiVari = Ramppi(0xe2cda3), VaNaru = Ramppi(0x4a3a29), VaNuppi = Ramppi(0xdcc398);
        /// <summary>Kupin keskipisteen etäisyys keskeltä (= varren puolipituus), kupin pohjan korkeus, varren korkeus päissä
        /// ja kaaren nousu keskellä.</summary>
        const float VaKuppiX = 0.315f, VaKuppiY = 0.195f, VaVarsiY = 0.625f, VaKaari = 0.018f;

        /// <summary>
        /// KAUPPA: orsivaaka (merkki-kauppa.png oikeana 3D-esineenä). Pyöreä kaksiportainen jalka kellomaisella kaulalla,
        /// ohut pylväs kauluksineen ja pallonuppi ylhäällä; loivasti kaartuva varsi kapenee päitä kohti, päissä nupit,
        /// keskellä akselinapa. Kummankin nupin alta riippuu matala kuppi kolmesta ohuesta narusta (LOD1: kahdesta),
        /// vaaka tasapainossa. Leveys 0,96, korkeus 0,8. Ylhäältä: vaalea varsi kahden pronssisen kupin yli, kupeissa narujen
        /// tähti, pieni tumma jalka keskellä. Ääriviivaosat: jalka, pylväs, varsi, napa ja kupit (narut ilman). LOD1 (≤ 200):
        /// harvempi sorvaus, suora varsi ilman nuppeja ja napaa, kaksi narua kuppia kohden.
        /// </summary>
        static void VaakaOsat(Rakentaja r, bool lod1)
        {
            // Jalka: kaksi porrasta ja kellomainen kaula.
            r.AloitaOsa();
            VaSorvi(r, Vector3.zero, lod1 ? new[] { (0.125f, 0f), (0.116f, 0.03f), (0.03f, 0.12f) }
                : new[] { (0.125f, 0f), (0.127f, 0.022f), (0.09f, 0.03f), (0.088f, 0.052f), (0.056f, 0.068f), (0.03f, 0.12f) },
                lod1 ? 8 : 10, j => lod1 ? VaVarjo : j == 4 ? VaMessinki : VaVarjo);
            r.LopetaOsa();
            // Pylväs: kaulus puolivälissä, yläpäässä pallonuppi (alapää jalan kaulan sisällä).
            r.AloitaOsa();
            VaSorvi(r, Vector3.zero, lod1 ? new[] { (0.034f, 0.1f), (0.02f, 0.16f), (0.017f, 0.715f), (0.05f, 0.76f), (0f, 0.805f) }
                : new[] { (0.036f, 0.1f), (0.025f, 0.16f), (0.023f, 0.29f), (0.04f, 0.31f), (0.023f, 0.33f), (0.02f, 0.715f), (0.05f, 0.75f), (0.042f, 0.787f), (0f, 0.805f) },
                lod1 ? 4 : 6, j => lod1 ? (j == 3 ? VaNuppi : VaMessinki) : (j >= 5 ? VaNuppi : VaMessinki));
            r.LopetaOsa();

            VaVarsi(r, lod1);
            if (!lod1)
            {
                // Akselinapa varren keskellä ja tumma tappi (kuusikulmio) sen etu- ja takapinnassa.
                var napa = new Vector3(0f, VaVarsiKorkeus(0f), 0f);
                r.AloitaOsa();
                VaLieriZ(r, napa, 0.04f, 0.03f, 8, VaNuppi);
                r.LopetaOsa();
                foreach (float sz in new[] { -1f, 1f })
                    for (int i = 1; i < 5; i++)
                    {
                        Vector3 Kk(int k) => napa + new Vector3(Mathf.Cos(k * Mathf.PI / 3f) * 0.013f, Mathf.Sin(k * Mathf.PI / 3f) * 0.013f, sz * 0.0315f);
                        r.KolmioUlos(Kk(0), Kk(i), Kk(i + 1), new Vector3(0f, 0f, sz), VaNaru);
                    }
            }

            foreach (float sx in new[] { -1f, 1f })
            {
                float x = sx * VaKuppiX, yAla = VaVarsiKorkeus(x) - 0.011f;
                var kiinni = new Vector3(x, yAla - 0.022f, 0f);
                // Kuppi: matala malja, ulkopinta tumma, reuna vaalea ja sisäpinta pronssinen (maan sävystä erottuva).
                r.AloitaOsa();
                VaSorvi(r, new Vector3(x, VaKuppiY, 0f), lod1 ? new[] { (0f, 0f), (0.12f, 0.014f), (0.166f, 0.052f), (0f, 0.03f) }
                    : new[] { (0f, 0f), (0.09f, 0.008f), (0.15f, 0.03f), (0.166f, 0.052f), (0.152f, 0.054f), (0.11f, 0.034f), (0f, 0.024f) },
                    lod1 ? 8 : 10, j => lod1 ? (j == 2 ? VaKuppi : VaVarjo) : (j >= 4 ? VaKuppi : j == 3 ? VaReuna : VaVarjo));
                r.LopetaOsa();
                // Narut kupin reunalta kiinnityskohtaan: kolme, kaksi edessä (V kuten kuvamerkissä) ja yksi takana (LOD1: kaksi).
                int nn = lod1 ? 2 : 3;
                for (int k = 0; k < nn; k++)
                {
                    float a = lod1 ? k * Mathf.PI : Mathf.PI * (0.5f + k * 2f / 3f);
                    float rr = lod1 ? 0.115f : 0.136f;
                    var reuna = new Vector3(x + Mathf.Cos(a) * rr, VaKuppiY + 0.047f, Mathf.Sin(a) * rr);
                    // Paloina: kunkin palan vaakamitta jää ääriviivan minimin (0,035) alle, joten naru pysyy ohuena viivana.
                    int pal = lod1 ? 2 : 3;
                    for (int q = 0; q < pal; q++)
                        VaTanko(r, Vector3.Lerp(reuna, kiinni, q / (float)pal), Vector3.Lerp(reuna, kiinni, (q + 1) / (float)pal), 0.007f, 3, VaNaru);
                }
            }
        }

        /// <summary>Varren keskiviivan korkeus kohdassa x (loiva kaari, keskellä VaKaari ylempänä).</summary>
        static float VaVarsiKorkeus(float x) => VaVarsiY + VaKaari * (1f - (x / VaKuppiX) * (x / VaKuppiX));

        /// <summary>Varsi: suorakulmainen poikkileikkaus kaarta pitkin, kapenee päitä kohti; päissä nupit (LOD0). Yksi osa.
        /// Vaaleampi kuin kupit, jotta se erottuu niiden päällä ylhäältä katsottuna.</summary>
        static void VaVarsi(Rakentaja r, bool lod1)
        {
            int m = lod1 ? 2 : 6;
            float L = VaKuppiX;
            var k = new Vector3[m + 1, 4];
            var c = new Vector3[m + 1];
            for (int s = 0; s <= m; s++)
            {
                float x = -L + 2f * L * s / m;
                c[s] = new Vector3(x, VaVarsiKorkeus(x), 0f);
                var n = new Vector3(2f * VaKaari * x / (L * L), 1f, 0f).normalized;   // ylös, kohtisuoraan kaarta vastaan
                float hh = 0.016f - 0.005f * Mathf.Abs(x) / L, hd = 0.021f;
                var etu = new Vector3(0f, 0f, -hd);
                k[s, 0] = c[s] + n * hh + etu; k[s, 1] = c[s] + n * hh - etu; k[s, 2] = c[s] - n * hh - etu; k[s, 3] = c[s] - n * hh + etu;
            }
            r.AloitaOsa();
            for (int s = 0; s < m; s++)
                for (int e = 0; e < 4; e++)
                    r.NelioKeskelta(k[s, e], k[s + 1, e], k[s + 1, (e + 1) % 4], k[s, (e + 1) % 4], (c[s] + c[s + 1]) * 0.5f, VaVarsiVari);
            r.NelioKeskelta(k[0, 0], k[0, 1], k[0, 2], k[0, 3], c[0] + Vector3.right * 0.01f, VaVarsiVari);
            r.NelioKeskelta(k[m, 0], k[m, 1], k[m, 2], k[m, 3], c[m] - Vector3.right * 0.01f, VaVarsiVari);
            if (!lod1)
                foreach (float sx in new[] { -1f, 1f })
                    r.Timantti(new Vector3(sx * (L + 0.008f), VaVarsiKorkeus(L), 0f), 0.022f, 0.024f, VaNuppi, 6);
            r.LopetaOsa();
        }

        /// <summary>Lyhyt lieriö z-akselin suuntaan (napa, tappi): keskipiste, säde, puolisyvyys ja kulmien määrä; päädyt mukana.</summary>
        static void VaLieriZ(Rakentaja r, Vector3 c, float sade, float puoli, int n, Color vari)
        {
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * sade, d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * sade;
                Vector3 e = new Vector3(0f, 0f, -puoli), t = new Vector3(0f, 0f, puoli);
                r.NelioKeskelta(c + d0 + e, c + d1 + e, c + d1 + t, c + d0 + t, c, vari);
                if (i > 0 && i < n - 1)
                {
                    var d00 = new Vector3(sade, 0f, 0f);
                    r.KolmioUlos(c + d00 + e, c + d0 + e, c + d1 + e, Vector3.back, vari);
                    r.KolmioUlos(c + d00 + t, c + d0 + t, c + d1 + t, Vector3.forward, vari);
                }
            }
        }

        /// <summary>Ohut tanko pisteestä a pisteeseen b (naru, koukku): n-kulmainen, ilman päätyjä.</summary>
        static void VaTanko(Rakentaja r, Vector3 a, Vector3 b, float sade, int n, Color vari)
        {
            var t = (b - a).normalized;
            var u = Vector3.Cross(t, Vector3.forward);
            if (u.sqrMagnitude < 1e-6f) u = Vector3.Cross(t, Vector3.right);
            u = u.normalized; var v = Vector3.Cross(t, u).normalized;
            var keski = (a + b) * 0.5f;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 d0 = (u * Mathf.Cos(a0) + v * Mathf.Sin(a0)) * sade, d1 = (u * Mathf.Cos(a1) + v * Mathf.Sin(a1)) * sade;
                r.NelioKeskelta(a + d0, b + d0, b + d1, a + d1, keski, vari);
            }
        }

        /// <summary>Sorvattu pinta pystyakselin ympäri (ks. MjSorvi): aine profiilin kulkusuunnasta vasemmalla, säde 0 päässä
        /// tekee viuhkan, väri profiilin väleittäin.</summary>
        static void VaSorvi(Rakentaja r, Vector3 p, (float sade, float y)[] prof, int n, Func<int, Color> vari)
        {
            for (int j = 0; j + 1 < prof.Length; j++)
            {
                var (r0, y0) = prof[j]; var (r1, y1) = prof[j + 1];
                float nr = y1 - y0, ny = r0 - r1;
                for (int i = 0; i < n; i++)
                {
                    float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n, am = (a0 + a1) * 0.5f;
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

        static Mesh VaakaRunko() { var r = new Rakentaja(); VaakaOsat(r, false); return r.Verkko("kategoria-Vaaka"); }
        static Mesh VaakaLod1() { var r = new Rakentaja(); VaakaOsat(r, true); return r.Verkko("kategoria-Vaaka-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaVaaka3D(bool lod1 = false) => lod1 ? VaakaLod1() : VaakaRunko();

        static readonly bool vaakaMalli = RekisteroiKategoria(Kategoriasymboli.Vaaka, new Erikoismalli { Runko = VaakaRunko, Lod1 = VaakaLod1 });
    }
}
