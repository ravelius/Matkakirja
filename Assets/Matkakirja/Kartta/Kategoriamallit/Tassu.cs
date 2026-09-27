using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI TASSU (eläimet; kuvamerkki merkki-elain.png on pöllönpoikanen), ks. KategoriaApurit.cs ja
    /// proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color TaKasvo = Ramppi(0xf4ecda), TaReuna = Ramppi(0xa38866), TaPaa = Ramppi(0xd6c5aa), TaPaa2 = Ramppi(0xc9b38c);
        static readonly Color TaVatsa = Ramppi(0xebe0c6), TaSelka = Ramppi(0xc4ad86), TaSiipi = Ramppi(0xbca788), TaSiipi2 = Ramppi(0x9c7e58);
        static readonly Color TaSiipi3 = Ramppi(0x8a6a44), TaMuste = Ramppi(0x3b2f22), TaIiris = Ramppi(0x4a3a28), TaValkea = Ramppi(0xf8f4ea);
        static readonly Color TaNokka = Ramppi(0x7a5e3c), TaVarvas = Ramppi(0x9c7e58), TaTupsu = Ramppi(0xa38866), TaTapla = Ramppi(0x9c7e58);

        /// <summary>Pään kasvojen kallistus ylös (°): pöllö katsoo ylöspäin, joten kasvot ja silmät näkyvät myös ylhäältä ja
        /// kallistettuna lähes suoraan edestä.</summary>
        const float TaKatse = 42f;

        /// <summary>
        /// ELÄIMET: PÖLLÖNPOIKANEN (merkki-elain.png oikeana 3D-esineenä; enum-nimi Tassu säilyy). Pyöreä munamainen vartalo
        /// (vaalea vatsa, jossa seepiatäpliä riveissä), iso pää, jonka litteät kasvot katsovat 42° ylöspäin (vaalea kasvolevy
        /// ja tummempi reunus), suuret pyöreät silmät (musteinen reuna, vaalea kehä, tumma iiris ja valopilkku), pieni alaspäin
        /// osoittava nokka, korvatupsut pään yläkulmissa, kylkiin taitetut siivet lomittaisina höyhenriveinä (vaaleasta tummaan) ja
        /// varpaat maassa vatsan edessä. Leveys 0,63, korkeus 0,81, syvyys 0,47. Ääriviivaosat: pää (silmineen, nokkineen ja
        /// tupsuineen), vartalo (täplineen ja jalkoineen) ja kumpikin siipi. LOD1: harvempi pää, vartalo ja siivet, silmissä
        /// kolme kiekkoa ilman valopilkkua, ei täpliä eikä varpaita.
        /// </summary>
        static void TassuOsat(Rakentaja r, bool lod1)
        {
            // ---- Vartalo: elliptiset renkaat (y, rx, rz, cz) alhaalta ylös, ei pohjaa eikä kantta (pää peittää yläpään). ----
            var renkaat = lod1
                ? new[] { (0.02f, 0.14f, 0.12f, -0.02f), (0.19f, 0.25f, 0.21f, -0.02f), (0.36f, 0.23f, 0.19f, -0.005f), (0.52f, 0.15f, 0.13f, 0.01f) }
                : new[] { (0.015f, 0.135f, 0.115f, -0.02f), (0.085f, 0.215f, 0.18f, -0.02f), (0.19f, 0.25f, 0.21f, -0.02f), (0.31f, 0.245f, 0.205f, -0.01f),
                          (0.42f, 0.21f, 0.18f, 0f), (0.52f, 0.15f, 0.13f, 0.01f) };
            int nv = lod1 ? 8 : 12;
            Vector3 Keha(int j, int i)
            {
                var (y, rx, rz, cz) = renkaat[j];
                float a = -Mathf.PI * 0.5f + i * Mathf.PI * 2f / nv;
                return new Vector3(Mathf.Cos(a) * rx, y, cz + Mathf.Sin(a) * rz);
            }
            r.AloitaOsa();
            for (int j = 0; j + 1 < renkaat.Length; j++)
                for (int i = 0; i < nv; i++)
                {
                    int q = (i + 1) % nv;
                    // Vatsa (etu ±60°) vaalea, muu selkä.
                    float kulma = Mathf.Abs(Mathf.DeltaAngle(0f, (i + 0.5f) * 360f / nv));
                    var c = kulma < 62f ? TaVatsa : TaSelka;
                    var keski = new Vector3(0f, (renkaat[j].Item1 + renkaat[j + 1].Item1) * 0.5f, -0.01f);
                    r.NelioKeskelta(Keha(j, i), Keha(j + 1, i), Keha(j + 1, q), Keha(j, q), keski, c);
                }
            if (!lod1)
            {
                // Vatsan täplät: pienet alaspäin osoittavat seepiakolmiot riveissä vatsan pinnassa.
                var taplat = new[] { (-0.06f, 0.37f), (0.06f, 0.37f), (-0.11f, 0.28f), (0f, 0.28f), (0.11f, 0.28f), (-0.06f, 0.19f), (0.06f, 0.19f), (0f, 0.11f) };
                foreach (var (x, y) in taplat) TaTaplaKolmio(r, renkaat, x, y);
                // Varpaat: kolme kummassakin jalassa vatsan edessä maassa.
                foreach (float s in new[] { -1f, 1f })
                    for (int k = -1; k <= 1; k++)
                    {
                        float a = (-90f + k * 26f + s * 8f) * Mathf.Deg2Rad;
                        var jalka = new Vector3(s * 0.085f, 0f, -0.14f);
                        var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                        var sivu = new Vector3(-d.z, 0f, d.x) * 0.014f;
                        Vector3 kanta = jalka - d * 0.01f, karki = jalka + d * (k == 0 ? 0.075f : 0.062f) + Vector3.up * 0.004f, harja = jalka + Vector3.up * 0.03f;
                        var kv = (kanta + karki + harja) / 3f - Vector3.up * 0.01f;
                        r.KolmioKeskelta(kanta - sivu, harja, karki, kv, TaVarvas);
                        r.KolmioKeskelta(harja, kanta + sivu, karki, kv, TaVarvas);
                        r.KolmioKeskelta(kanta - sivu, kanta + sivu, harja, kv, TaVarvas);
                    }
            }
            r.LopetaOsa();

            // ---- Siivet: taitettu siipi kylkeä vasten, elliptiset renkaat ylhäältä alas ja kärki taakse-alas. ----
            foreach (float s in new[] { -1f, 1f }) TaSiipiOsa(r, s, lod1);

            // ---- Pää: katkaistu ellipsoidi, litteät kasvot katsovat ylös-eteen (TaKatse). ----
            float k0 = TaKatse * Mathf.Deg2Rad;
            var D = new Vector3(0f, Mathf.Sin(k0), -Mathf.Cos(k0));   // kasvojen normaali
            var U = new Vector3(0f, Mathf.Cos(k0), Mathf.Sin(k0));    // pään "ylös" kasvojen tasossa
            var X = Vector3.right;
            var Hc = new Vector3(0f, 0.6f, 0.03f);
            const float ha = 0.245f, hb = 0.215f, hc = 0.21f, hd = 0.12f;   // säteet X, U, D ja kasvotason etäisyys
            float psiF = Mathf.PI - (float)Math.Acos(hd / hc);   // kasvotason kulma takanavasta
            float[] psit = lod1 ? new[] { 0f, 1.25f, psiF } : new[] { 0f, 0.8f, 1.45f, 1.95f, psiF };
            int np = lod1 ? 8 : 12;
            Vector3 Paa(int j, int i)
            {
                float ps = psit[j], th = i * Mathf.PI * 2f / np + Mathf.PI * 0.5f;
                return Hc + D * (-hc * Mathf.Cos(ps)) + (X * (ha * Mathf.Cos(th)) + U * (hb * Mathf.Sin(th))) * Mathf.Sin(ps);
            }
            var Fc = Hc + D * hd;   // kasvojen keskipiste
            r.AloitaOsa();
            for (int j = 0; j + 1 < psit.Length; j++)
                for (int i = 0; i < np; i++)
                {
                    int q = (i + 1) % np;
                    Color c = j == psit.Length - 2 ? TaReuna : ((i + j) % 3 == 0 ? TaPaa2 : TaPaa);
                    if (j == 0) r.KolmioKeskelta(Paa(0, 0), Paa(1, i), Paa(1, q), Hc, c);
                    else r.NelioKeskelta(Paa(j, i), Paa(j + 1, i), Paa(j + 1, q), Paa(j, q), Hc, c);
                }
            // Kasvolevy.
            int jf = psit.Length - 1;
            for (int i = 0; i < np; i++) r.KolmioUlos(Fc, Paa(jf, i), Paa(jf, (i + 1) % np), D, TaKasvo);
            // Silmät: musteinen reuna, vaalea kehä, tumma iiris ja valopilkku (kiekot kasvolevyn edessä).
            foreach (float s in new[] { -1f, 1f })
            {
                var sc = Fc + X * (s * 0.088f) + U * 0.018f;
                TaKiekko(r, sc + D * 0.003f, D, X, U, 0.072f, lod1 ? 8 : 12, TaMuste);
                TaKiekko(r, sc + D * 0.006f, D, X, U, 0.06f, lod1 ? 8 : 12, TaValkea);
                TaKiekko(r, sc + D * 0.009f, D, X, U, 0.042f, lod1 ? 6 : 10, TaIiris);
                if (!lod1) TaKiekko(r, sc + X * 0.013f + U * 0.015f + D * 0.012f, D, X, U, 0.012f, 4, TaValkea);
            }
            // Nokka: pieni alaspäin osoittava kolmiopyramidi silmien välissä.
            {
                Vector3 L = Fc + X * -0.024f + U * -0.02f + D * 0.004f, Rr = Fc + X * 0.024f + U * -0.02f + D * 0.004f;
                Vector3 B = Fc + U * -0.085f + D * 0.004f, A = Fc + U * -0.045f + D * 0.05f;
                var nk = (L + Rr + B) / 3f;
                r.KolmioKeskelta(L, Rr, A, nk, TaNokka);
                r.KolmioKeskelta(L, B, A, nk, TaNokka);
                r.KolmioKeskelta(Rr, B, A, nk, TaNokka);
            }
            // Korvatupsut pään yläkulmissa (osoittavat ylös ja hieman ulos).
            foreach (float s in new[] { -1f, 1f })
            {
                var kanta = Hc + X * (s * 0.15f) + U * 0.14f + D * -0.03f;
                var karki = Hc + X * (s * 0.205f) + U * 0.25f + D * -0.02f;
                var p1 = kanta + X * (s * 0.045f);
                var p2 = kanta - X * (s * 0.02f) + D * 0.035f;
                var p3 = kanta - X * (s * 0.02f) - D * 0.04f;
                var tk = kanta + (karki - kanta) * 0.25f;
                r.KolmioKeskelta(p1, p2, karki, tk, TaTupsu);
                r.KolmioKeskelta(p2, p3, karki, tk, TaTupsu);
                r.KolmioKeskelta(p3, p1, karki, tk, TaTupsu);
            }
            r.LopetaOsa();
        }

        /// <summary>Taitettu siipi kyljessä s (−1 vasen, +1 oikea): elliptiset renkaat (y, x, z, paksuus, leveys) ylhäältä alas,
        /// pyöreä olkapää ja kärki taakse-alas; höyhenrivit tummenevat kärkeä kohti ja joka toinen höyhen on lomittain
        /// tummempi. Oma ääriviivaosa.</summary>
        static void TaSiipiOsa(Rakentaja r, float s, bool lod1)
        {
            var renkaat = lod1
                ? new[] { (0.44f, 0.205f, 0.02f, 0.045f, 0.1f), (0.26f, 0.255f, 0.04f, 0.06f, 0.145f) }
                : new[] { (0.45f, 0.2f, 0.02f, 0.045f, 0.1f), (0.36f, 0.24f, 0.03f, 0.06f, 0.145f), (0.23f, 0.255f, 0.045f, 0.058f, 0.14f), (0.12f, 0.232f, 0.07f, 0.04f, 0.095f) };
            var yla = new Vector3(s * 0.16f, 0.5f, 0.02f);
            var karki = new Vector3(s * 0.19f, 0.04f, 0.13f);
            int n = lod1 ? 5 : 7;
            Vector3 P(int j, int i)
            {
                var (y, x, z, px, lz) = renkaat[j];
                float a = i * Mathf.PI * 2f / n;
                return new Vector3(s * (x + Mathf.Cos(a) * px), y, z + Mathf.Sin(a) * lz);
            }
            // Höyhenrivit: sävy tummenee olkapäästä kärkeen, ja joka toinen höyhen (lomittain) on askelta tummempi.
            var savyt = new[] { TaPaa, TaPaa2, TaSiipi, TaSiipi2, TaSiipi3 };
            var perus = lod1 ? new[] { 1, 2, 3 } : new[] { 1, 1, 2, 2, 3 };
            Color Rivi(int rivi, int i) => savyt[perus[rivi] + ((i + rivi) % 2)];
            r.AloitaOsa();
            int m = renkaat.Length;
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                var k0 = new Vector3(s * renkaat[0].Item2, renkaat[0].Item1 - 0.03f, renkaat[0].Item3);
                r.KolmioKeskelta(yla, P(0, i), P(0, q), k0, Rivi(0, i));
                for (int j = 0; j + 1 < m; j++)
                {
                    var kk = new Vector3(s * (renkaat[j].Item2 + renkaat[j + 1].Item2) * 0.5f, (renkaat[j].Item1 + renkaat[j + 1].Item1) * 0.5f, (renkaat[j].Item3 + renkaat[j + 1].Item3) * 0.5f);
                    r.NelioKeskelta(P(j, i), P(j + 1, i), P(j + 1, q), P(j, q), kk, Rivi(j + 1, i));
                }
                var km = new Vector3(s * renkaat[m - 1].Item2, renkaat[m - 1].Item1 - 0.03f, renkaat[m - 1].Item3 + 0.02f);
                r.KolmioKeskelta(karki, P(m - 1, i), P(m - 1, q), km, Rivi(m, i));
            }
            r.LopetaOsa();
        }

        /// <summary>Vatsan täplä: pieni alaspäin osoittava kolmio vartalon etupinnassa kohdassa (x, y); jokainen kärki
        /// lasketaan pinnalle (renkaiden välissä lineaarisesti), 0,003 pinnan edessä, joten täplä ei irtoa kaarevalta kyljeltä.</summary>
        static void TaTaplaKolmio(Rakentaja r, (float y, float rx, float rz, float cz)[] renkaat, float x, float y)
        {
            Vector3 Pinta(float px, float py)
            {
                int j = 0;
                while (j + 2 < renkaat.Length && renkaat[j + 1].y < py) j++;
                var (y0, rx0, rz0, cz0) = renkaat[j];
                var (y1, rx1, rz1, cz1) = renkaat[j + 1];
                float t = Mathf.Clamp01((py - y0) / (y1 - y0));
                float rx = Mathf.Lerp(rx0, rx1, t), rz = Mathf.Lerp(rz0, rz1, t), cz = Mathf.Lerp(cz0, cz1, t);
                return new Vector3(px, py, cz - rz * Mathf.Sqrt(Mathf.Max(0f, 1f - (px / rx) * (px / rx))) - 0.003f);
            }
            var ulos = new Vector3(x * 2f, 0.1f, -1f);
            r.KolmioUlos(Pinta(x + 0.02f, y + 0.011f), Pinta(x - 0.02f, y + 0.011f), Pinta(x, y - 0.018f), ulos, TaTapla);
        }

        /// <summary>Litteä kiekko pinnan edessä: keskipiste c, normaali n, tason akselit x ja u, säde, sektorit. Ei omaa osaa.</summary>
        static void TaKiekko(Rakentaja r, Vector3 c, Vector3 n, Vector3 x, Vector3 u, float sade, int sektorit, Color vari)
        {
            for (int i = 0; i < sektorit; i++)
            {
                float a0 = i * Mathf.PI * 2f / sektorit, a1 = (i + 1) * Mathf.PI * 2f / sektorit;
                r.KolmioUlos(c, c + (x * Mathf.Cos(a0) + u * Mathf.Sin(a0)) * sade, c + (x * Mathf.Cos(a1) + u * Mathf.Sin(a1)) * sade, n, vari);
            }
        }

        static Mesh TassuRunko() { var r = new Rakentaja(); TassuOsat(r, false); return r.Verkko("kategoria-Tassu"); }
        static Mesh TassuLod1() { var r = new Rakentaja(); TassuOsat(r, true); return r.Verkko("kategoria-Tassu-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaTassu3D(bool lod1 = false) => lod1 ? TassuLod1() : TassuRunko();

        static readonly bool tassuMalli = RekisteroiKategoria(Kategoriasymboli.Tassu, new Erikoismalli { Runko = TassuRunko, Lod1 = TassuLod1 });
    }
}
