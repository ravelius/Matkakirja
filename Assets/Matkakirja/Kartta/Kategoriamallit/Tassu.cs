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

        static readonly bool tassuMalli = RekisteroiKategoria(Kategoriasymboli.Tassu, new Erikoismalli { Runko = TassuRunko, Lod1 = TassuLod1, Lahi = TassuLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x Fablen kautta; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama pöllönpoikanen lähizoomiin (kartan kerroin ≥ 4, korvaa LOD0:n). Sama siluetti, mittasuhteet, värit ja
        /// sommitelma kuin LOD0:ssa (munamainen vartalo vaalein vatsoin, iso pää ylös katsovine kasvoineen, suuret silmät,
        /// pieni nokka, korvatupsut, kylkiin taitetut siivet ja varpaat vatsan edessä), mutta 1 843 kolmiota (LOD0 439,
        /// noin 4,2 ×) lähikuvan yksityiskohtiin: pyöreämpi vartalo ja harvasti täplitetty pää, vatsassa V-sulkakuviot
        /// lomittaisina riveinä (kuvamerkin tapaan), siivissä limittäiset sulkarivit teräväkärkisine sulkineen (kukin rivi
        /// hieman edellisen päällä, suljettuna pintana), kasvolevy matalana maljana koholla olevan sulkareunuksen sisällä,
        /// silmissä kupera iiris, pupilli ja kaksi valopilkkua, koukkunokka harjanteineen, korvatupsut kolmesta sulasta ja
        /// varpaat nivelineen ja tummine kynsineen.
        /// Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi) ja ääriviivaosat kuten LOD0:ssa (vartalo jalkoineen, kumpikin
        /// siipi ja pää kasvoineen). Apurit (TassuLahi-alkuiset) ovat tässä tiedostossa; silmät käyttävät LOD0:n TaKiekkoa.
        /// </summary>
        static void TassuLahiOsat(Rakentaja r)
        {
            // ---- Vartalo: tiheämmät renkaat (samat ääriarvot kuin LOD0:ssa), vatsan sulkakuviot ja varpaat. ----
            var renkaat = TassuLahiRenkaat;
            const int nv = 24;
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
                    // Vatsa (etu ±60°) vaalea, muu selkä, kuten LOD0:ssa.
                    float kulma = Mathf.Abs(Mathf.DeltaAngle(0f, (i + 0.5f) * 360f / nv));
                    var keski = new Vector3(0f, (renkaat[j].y + renkaat[j + 1].y) * 0.5f, -0.01f);
                    r.NelioKeskelta(Keha(j, i), Keha(j + 1, i), Keha(j + 1, q), Keha(j, q), keski, kulma < 62f ? TaVatsa : TaSelka);
                }
            foreach (var (x, y) in TassuLahiSulat) TassuLahiSulka(r, x, y);
            foreach (float s in new[] { -1f, 1f })
                for (int k = -1; k <= 1; k++) TassuLahiVarvas(r, s, k);
            r.LopetaOsa();

            foreach (float s in new[] { -1f, 1f }) TassuLahiSiipi(r, s);
            TassuLahiPaa(r);
        }

        /// <summary>Lähitason vartalon renkaat (y, rx, rz, cz) alhaalta ylös: LOD0:n renkaat ja niiden väliin pyöristävät renkaat.</summary>
        static readonly (float y, float rx, float rz, float cz)[] TassuLahiRenkaat =
        {
            (0.015f, 0.135f, 0.115f, -0.02f), (0.05f, 0.186f, 0.156f, -0.02f), (0.1f, 0.225f, 0.189f, -0.02f), (0.19f, 0.25f, 0.21f, -0.02f),
            (0.25f, 0.2505f, 0.2095f, -0.015f), (0.31f, 0.245f, 0.205f, -0.01f), (0.37f, 0.231f, 0.195f, -0.005f), (0.44f, 0.198f, 0.17f, 0.002f),
            (0.52f, 0.15f, 0.13f, 0.01f),
        };

        /// <summary>Vatsan V-sulkien paikat (x, y) lomittaisina riveinä (LOD0:n kahdeksan täplän alueella, tiheämpänä).</summary>
        static readonly (float x, float y)[] TassuLahiSulat =
        {
            (-0.06f, 0.37f), (0.06f, 0.37f), (-0.12f, 0.325f), (0f, 0.325f), (0.12f, 0.325f), (-0.17f, 0.28f), (-0.06f, 0.28f), (0.06f, 0.28f),
            (0.17f, 0.28f), (-0.115f, 0.235f), (0f, 0.235f), (0.115f, 0.235f), (-0.06f, 0.19f), (0.06f, 0.19f), (0f, 0.145f),
        };

        /// <summary>Piste vartalon etupinnalla kohdassa (x, y): lähitason renkaiden välissä lineaarisesti, hieman pinnan edessä.</summary>
        static Vector3 TassuLahiPinta(float px, float py)
        {
            var rr = TassuLahiRenkaat;
            int j = 0;
            while (j + 2 < rr.Length && rr[j + 1].y < py) j++;
            float t = Mathf.Clamp01((py - rr[j].y) / (rr[j + 1].y - rr[j].y));
            float rx = Mathf.Lerp(rr[j].rx, rr[j + 1].rx, t), rz = Mathf.Lerp(rr[j].rz, rr[j + 1].rz, t), cz = Mathf.Lerp(rr[j].cz, rr[j + 1].cz, t);
            return new Vector3(px, py, cz - rz * Mathf.Sqrt(Mathf.Max(0f, 1f - (px / rx) * (px / rx))) - 0.004f);
        }

        /// <summary>Vatsan sulka: alaspäin osoittava V (kaksi kapeaa sakaraa) vartalon pinnalla kohdassa (x, y).</summary>
        static void TassuLahiSulka(Rakentaja r, float x, float y)
        {
            Vector3 P(float dx, float dy) => TassuLahiPinta(x + dx, y + dy);
            var ulos = new Vector3(x * 2f, 0.1f, -1f);
            Vector3 vy = P(-0.018f, 0.01f), ky = P(0.018f, 0.01f), ala = P(0f, -0.012f), vs = P(-0.009f, 0.01f), ks = P(0.009f, 0.01f), sk = P(0f, -0.0015f);
            r.NelioUlos(vy, ala, sk, vs, ulos, TaTapla);
            r.NelioUlos(ala, ky, ks, sk, ulos, TaTapla);
        }

        /// <summary>Varvas kyljessä s ja suunnassa k (−1, 0, 1) kuten LOD0:ssa: kolmiomainen poikkileikkaus maata vasten kahtena
        /// nivelenä, pääty ja tumma kaartuva kynsi.</summary>
        static void TassuLahiVarvas(Rakentaja r, float s, int k)
        {
            float a = (-90f + k * 26f + s * 8f) * Mathf.Deg2Rad, L = k == 0 ? 0.075f : 0.062f;
            var jalka = new Vector3(s * 0.085f, 0f, -0.14f);
            var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
            var sivu = new Vector3(-d.z, 0f, d.x);
            var asemat = new[] { (-0.01f, 0.015f, 0.03f), (L * 0.48f, 0.0125f, 0.02f), (L - 0.013f, 0.009f, 0.012f) };
            var p = new Vector3[3, 3];
            for (int m = 0; m < 3; m++)
            {
                var (e, w, h) = asemat[m];
                var c = jalka + d * e;
                p[m, 0] = c + sivu * w; p[m, 1] = c + Vector3.up * h; p[m, 2] = c - sivu * w;
            }
            for (int m = 0; m < 2; m++)
            {
                var kk = jalka + d * ((asemat[m].Item1 + asemat[m + 1].Item1) * 0.5f) + Vector3.up * 0.004f;
                r.NelioKeskelta(p[m, 0], p[m + 1, 0], p[m + 1, 1], p[m, 1], kk, TaVarvas);
                r.NelioKeskelta(p[m, 1], p[m + 1, 1], p[m + 1, 2], p[m, 2], kk, TaVarvas);
            }
            var pk = jalka + d * asemat[2].Item1;
            r.KolmioUlos(p[2, 0], p[2, 1], p[2, 2], d, TaVarvas);
            // Kynsi: kapea kolmisivuinen koukku päädystä maahan.
            Vector3 k0 = pk + sivu * 0.0045f + Vector3.up * 0.002f, k1 = pk + Vector3.up * 0.009f + d * 0.001f, k2 = pk - sivu * 0.0045f + Vector3.up * 0.002f;
            var karki = jalka + d * (L + 0.003f) + Vector3.up * 0.0015f;
            var kc = pk + d * 0.004f + Vector3.up * 0.003f;
            r.KolmioKeskelta(k0, k1, karki, kc, TaIiris);
            r.KolmioKeskelta(k1, k2, karki, kc, TaIiris);
        }

        /// <summary>
        /// Lähitason siipi kyljessä s (vrt. TaSiipiOsa): LOD0:n renkaat (y, x, z, paksuus, leveys) viiden sulkarivin rajoina,
        /// yhtenä suljettuna pintana. Jokaisen rivin alareuna on 0,0045 ulompana siksakkina (parittomissa kärjissä sulan kärki
        /// alempana; olkapään rivi sileänä) ja taittuu reunan alla 0,003 sisemmäs, josta seuraava rivi jatkuu keskirenkaan
        /// kautta: rivit ovat limittäin kuin paanut, eikä rivien väliin jää rakoa (ääriviiva ei näy sen läpi). Sävyt kuten
        /// LOD0:ssa (tummenevat kärkeä kohti, sulittain lomittain). Oma osa.
        /// </summary>
        static void TassuLahiSiipi(Rakentaja r, float s)
        {
            var R = new[] { (0.45f, 0.2f, 0.02f, 0.045f, 0.1f), (0.36f, 0.24f, 0.03f, 0.06f, 0.145f), (0.23f, 0.255f, 0.045f, 0.058f, 0.14f), (0.12f, 0.232f, 0.07f, 0.04f, 0.095f) };
            var yla = new Vector3(s * 0.16f, 0.5f, 0.02f);
            var karki = new Vector3(s * 0.19f, 0.04f, 0.13f);
            const int n = 18;
            const float ulk = 0.0045f, sisa = 0.003f, lasku = 0.011f;
            // Renkaat ylhäältä alas: (rengas, lisäsäde, kärkien lasku, rivi): reuna L, taite T ja keskirengas M riveittäin.
            var renkaat = new System.Collections.Generic.List<((float y, float x, float z, float px, float lz) g, float lisa, float lasku, int rivi)>();
            for (int j = 0; j < R.Length; j++)
            {
                var (y, x, z, px, lz) = R[j];
                renkaat.Add(((y, x, z, px, lz), ulk, j == 0 ? 0f : lasku, j));
                renkaat.Add(((y - sisa, x, z, px, lz), -sisa, 0f, j + 1));
                if (j + 1 < R.Length)
                {
                    var (yb, xb, zb, pb, lb) = R[j + 1];
                    renkaat.Add((((y + yb) * 0.5f, (x + xb) * 0.5f, (z + zb) * 0.5f, (px + pb) * 0.5f, (lz + lb) * 0.5f), 0.002f, 0f, j + 1));
                }
            }
            Vector3 P(int k, int i)
            {
                var (g, lisa, lk, _) = renkaat[k];
                float a = i * Mathf.PI * 2f / n;
                float yy = g.y - (lk > 0f ? (i % 2 == 1 ? lk : -0.002f) : 0f);
                return new Vector3(s * (g.x + Mathf.Cos(a) * (g.px + lisa)), yy, g.z + Mathf.Sin(a) * (g.lz + lisa));
            }
            Vector3 Keski(int k) => new Vector3(s * renkaat[k].g.x, renkaat[k].g.y, renkaat[k].g.z);
            var savyt = new[] { TaPaa, TaPaa2, TaSiipi, TaSiipi2, TaSiipi3 };
            var perus = new[] { 1, 1, 2, 2, 3 };
            Color Vari(int rivi, int i) => savyt[perus[rivi] + ((i / 2 + rivi) % 2)];
            r.AloitaOsa();
            int m = renkaat.Count;
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                // Olkapään rivi: kärjestä ensimmäiseen reunaan.
                r.KolmioKeskelta(yla, P(0, i), P(0, q), Keski(0) - Vector3.up * 0.03f, Vari(0, i));
                for (int k = 0; k + 1 < m; k++)
                {
                    var kk = (Keski(k) + Keski(k + 1)) * 0.5f;
                    r.NelioKeskelta(P(k, i), P(k + 1, i), P(k + 1, q), P(k, q), kk, Vari(renkaat[k + 1].rivi, i));
                }
                // Viimeinen rivi: taitteesta siiven kärkeen.
                var km = new Vector3(s * R[3].Item2, R[3].Item1 - 0.03f, R[3].Item3 + 0.02f);
                r.KolmioKeskelta(karki, P(m - 1, i), P(m - 1, q), km, Vari(4, i));
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason pää (vrt. TassuOsat): sama katkaistu ellipsoidi tiheämpänä, kasvojen ympärillä koholla oleva sulkareunus,
        /// kasvolevy matalana maljana, silmät (musteen reuna, vaalea kehä, kupera iiris, pupilli ja kaksi valopilkkua),
        /// koukkunokka ja kolmisulkaiset korvatupsut. Yksi ääriviivaosa kuten LOD0:ssa.
        /// </summary>
        static void TassuLahiPaa(Rakentaja r)
        {
            float k0 = TaKatse * Mathf.Deg2Rad;
            var D = new Vector3(0f, Mathf.Sin(k0), -Mathf.Cos(k0));
            var U = new Vector3(0f, Mathf.Cos(k0), Mathf.Sin(k0));
            var X = Vector3.right;
            var Hc = new Vector3(0f, 0.6f, 0.03f);
            const float ha = 0.245f, hb = 0.215f, hc = 0.21f, hd = 0.12f;
            float psiF = Mathf.PI - (float)Math.Acos(hd / hc), psiR = psiF - 0.085f;
            float[] psit = { 0f, 0.42f, 0.8f, 1.13f, 1.45f, 1.72f, 1.95f, psiR, psiF };
            const int np = 20;
            Vector3 Paa(int j, int i)
            {
                float ps = psit[j], th = i * Mathf.PI * 2f / np + Mathf.PI * 0.5f, kerroin = j == 7 ? 1.035f : 1f;
                return Hc + D * (-hc * Mathf.Cos(ps)) + (X * (ha * Mathf.Cos(th)) + U * (hb * Mathf.Sin(th))) * (Mathf.Sin(ps) * kerroin);
            }
            var Fc = Hc + D * hd;
            r.AloitaOsa();
            for (int j = 0; j + 1 < psit.Length; j++)
                for (int i = 0; i < np; i++)
                {
                    int q = (i + 1) % np;
                    // Sulkien täplitys harvana ja epäsäännöllisenä (tiheämmässä verkossa LOD0:n vinoraidat näyttäisivät ruudukolta).
                    Color c = j >= psit.Length - 3 ? TaReuna : ((i * 7 + j * 3) % 5 == 0 ? TaPaa2 : TaPaa);
                    if (j == 0) r.KolmioKeskelta(Paa(0, 0), Paa(1, i), Paa(1, q), Hc, c);
                    else r.NelioKeskelta(Paa(j, i), Paa(j + 1, i), Paa(j + 1, q), Paa(j, q), Hc, c);
                }
            // Kasvolevy matalana maljana: reunakaista ja sisäviuhka hieman taaempana.
            int jf = psit.Length - 1;
            var kesk = Fc - D * 0.004f;
            for (int i = 0; i < np; i++)
            {
                int q = (i + 1) % np;
                Vector3 e0 = Paa(jf, i), e1 = Paa(jf, q);
                Vector3 s0 = Fc + (e0 - Fc) * 0.55f - D * 0.003f, s1 = Fc + (e1 - Fc) * 0.55f - D * 0.003f;
                r.NelioUlos(e0, e1, s1, s0, D, TaKasvo);
                r.KolmioUlos(kesk, s0, s1, D, TaKasvo);
            }
            // Silmät.
            foreach (float s in new[] { -1f, 1f })
            {
                var sc = Fc + X * (s * 0.088f) + U * 0.018f;
                TaKiekko(r, sc + D * 0.003f, D, X, U, 0.072f, 16, TaMuste);
                TaKiekko(r, sc + D * 0.006f, D, X, U, 0.06f, 16, TaValkea);
                TassuLahiKupu(r, sc + D * 0.009f, D, X, U, 0.042f, 16, 0.004f, TaIiris);
                TassuLahiKupu(r, sc + D * 0.0115f, D, X, U, 0.023f, 12, 0.0035f, TaMuste);
                TaKiekko(r, sc + X * 0.013f + U * 0.015f + D * 0.0165f, D, X, U, 0.0125f, 8, TaValkea);
                TaKiekko(r, sc - X * 0.014f - U * 0.013f + D * 0.0165f, D, X, U, 0.0055f, 6, TaValkea);
            }
            TassuLahiNokka(r, Fc, X, U, D);
            // Korvatupsut: kolme sulkaa kummassakin (LOD0:n tupsu ja kaksi lyhyempää sen vieressä).
            foreach (float s in new[] { -1f, 1f })
            {
                var kanta = Hc + X * (s * 0.15f) + U * 0.14f + D * -0.03f;
                var karki = Hc + X * (s * 0.205f) + U * 0.25f + D * -0.02f;
                TassuLahiTupsu(r, kanta, karki, X * s, D, 1f, TaTupsu);
                TassuLahiTupsu(r, kanta - X * (s * 0.022f) + D * 0.012f, kanta + (karki - kanta) * 0.7f - X * (s * 0.035f) + D * 0.016f, X * s, D, 0.65f, TaPaa2);
                TassuLahiTupsu(r, kanta + X * (s * 0.012f) - D * 0.018f, kanta + (karki - kanta) * 0.62f + X * (s * 0.028f) - D * 0.02f, X * s, D, 0.6f, TaTupsu);
            }
            r.LopetaOsa();
        }

        /// <summary>Korvatupsun sulka: kolmisivuinen pyramidi kannasta kärkeen (vrt. LOD0), kanta kerrottuna koolla.</summary>
        static void TassuLahiTupsu(Rakentaja r, Vector3 kanta, Vector3 karki, Vector3 ulos, Vector3 D, float koko, Color vari)
        {
            var p1 = kanta + ulos * (0.045f * koko);
            var p2 = kanta - ulos * (0.02f * koko) + D * (0.035f * koko);
            var p3 = kanta - ulos * (0.02f * koko) - D * (0.04f * koko);
            var tk = kanta + (karki - kanta) * 0.25f;
            r.KolmioKeskelta(p1, p2, karki, tk, vari);
            r.KolmioKeskelta(p2, p3, karki, tk, vari);
            r.KolmioKeskelta(p3, p1, karki, tk, vari);
        }

        /// <summary>Koukkunokka kasvolevyn keskellä: harjanne kaartuu ulos ja alas koukuksi, kolmiomainen poikkileikkaus (harja
        /// ja kaksi alareunaa) kolmessa asemassa ja kärki.</summary>
        static void TassuLahiNokka(Rakentaja r, Vector3 Fc, Vector3 X, Vector3 U, Vector3 D)
        {
            Vector3 P(float x, float u, float d) => Fc + X * x + U * u + D * d;
            var harja = new[] { P(0f, -0.012f, 0.007f), P(0f, -0.03f, 0.036f), P(0f, -0.055f, 0.047f) };
            var vasen = new[] { P(-0.026f, -0.03f, 0.004f), P(-0.019f, -0.048f, 0.021f), P(-0.011f, -0.066f, 0.031f) };
            var oikea = new[] { P(0.026f, -0.03f, 0.004f), P(0.019f, -0.048f, 0.021f), P(0.011f, -0.066f, 0.031f) };
            var karki = P(0f, -0.088f, 0.036f);
            for (int m = 0; m < 2; m++)
            {
                // Suunta lohkon painopisteestä (kupera särmiö).
                var k = (harja[m] + harja[m + 1] + vasen[m] + vasen[m + 1] + oikea[m] + oikea[m + 1]) / 6f;
                r.NelioKeskelta(harja[m], harja[m + 1], vasen[m + 1], vasen[m], k, TaNokka);
                r.NelioKeskelta(harja[m], oikea[m], oikea[m + 1], harja[m + 1], k, TaNokka);
                r.NelioKeskelta(vasen[m], vasen[m + 1], oikea[m + 1], oikea[m], k, TaNokka);
            }
            var kt = (harja[2] + vasen[2] + oikea[2] + karki) / 4f;
            r.KolmioKeskelta(harja[2], vasen[2], karki, kt, TaNokka);
            r.KolmioKeskelta(harja[2], karki, oikea[2], kt, TaNokka);
            r.KolmioKeskelta(vasen[2], oikea[2], karki, kt, TaNokka);
        }

        /// <summary>Matala kupu (iiris, pupilli): kiekko, jonka keskipiste on korkeus verran pinnan edessä (kiiltävä kaarevuus).</summary>
        static void TassuLahiKupu(Rakentaja r, Vector3 c, Vector3 n, Vector3 x, Vector3 u, float sade, int sektorit, float korkeus, Color vari)
        {
            var huippu = c + n * korkeus;
            for (int i = 0; i < sektorit; i++)
            {
                float a0 = i * Mathf.PI * 2f / sektorit, a1 = (i + 1) * Mathf.PI * 2f / sektorit;
                r.KolmioUlos(huippu, c + (x * Mathf.Cos(a0) + u * Mathf.Sin(a0)) * sade, c + (x * Mathf.Cos(a1) + u * Mathf.Sin(a1)) * sade, n, vari);
            }
        }

        static Mesh TassuLahi() { var r = new Rakentaja(); TassuLahiOsat(r); return r.Verkko("kategoria-Tassu-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaTassu3DLahi() => TassuLahi();
    }
}
