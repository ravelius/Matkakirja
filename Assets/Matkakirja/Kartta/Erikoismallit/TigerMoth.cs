using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LENTO V3: de Havilland DH.82A Tiger Moth (omistaja hyväksyi speksin 26.9.2026 klo 23.5x: SEEPIANA; speksi
    /// docs/raportit/lento-v3-speksi.md kohta 4, viitekuvat Commonsista, malli oma). Mallinsepän Rakentajalla kuten
    /// erikoismallit (sama seepiaramppi ja ääriviivan osajako).
    /// Tunnistus sekunnissa: kaksitaso, jonka yläsiipi on porrastettu eteen ja ulkosiivet nuolimaiset; N-tuet ja
    /// vaijerit siipien välissä, kapea rivimoottorin nokka ja pakoputki vasemmalla kyljellä, kaksi avointa ohjaamoa
    /// peräkkäin (edessä Fogg punaisella huivilla, takana nimetön lentäjä), pyöreä peräsin ja kannuspyörätön pyrstö.
    /// Koneen avaruus: +Z nokka (potkurin akseli, Potkurit-komponentin akseli), +Y ylös, +X oikea siipi. Yläsiiven
    /// kärkiväli 1,0 (8,94 m, joten 1 m = 0,1119), potkurin akseli y = 0, potkurin napa z = +0,40, peräsimen takareuna
    /// z = −0,43. Rakennettu lentoasentoon (runko vaakatasossa); kolmipisteasennossa maassa noin 11° nokka ylös.
    /// Osat: runko (kaikki kiinteä), potkuri (napa origossa, lavat XY-tasossa, kierto +Z:n ympäri; Potkurit-komponentin
    /// nimi "Potkuri"), huivi (Foggin huivi, kiinnitys origossa, liehuu −Z:aan; lepatus komponentilla).
    /// Kolmiot: runko noin 1 250, potkuri 44, huivi 16.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Metri koneen yksiköissä (yläsiiven kärkiväli 8,94 m = 1,0).</summary>
        const float TmM = 1f / 8.94f;
        /// <summary>Potkurin napa (koneen avaruudessa): Potkuri-lapsiolion paikka.</summary>
        public static readonly Vector3 TigerMothNapa = new Vector3(0f, 0f, 0.4f);
        /// <summary>Foggin huivin kiinnitys (etuohjaamon matkustajan niska): Huivi-lapsiolion paikka.</summary>
        public static readonly Vector3 TigerMothHuivinKiinnitys = new Vector3(0f, 0.082f, 0.063f);
        /// <summary>Potkurin säde (1,98 m halkaisija): PotkuriKiekon säde.</summary>
        public const float TigerMothPotkurinSade = 0.99f * TmM;

        // Seepiaväritys (paletti 21.4x): kangas paperia, konepelti ja tuet seepiaa, aukot ja renkaat mustetta; aksentti
        // punainen (#9a3b2c) vain huivissa ja potkurin kärjissä (noin 4 % pinnasta).
        static readonly Color TmKangas = Hex(0xefe4cc), TmKangasVarjo = Hex(0xe2d3b0), TmPelti = Hex(0xcdbd98), TmTuki = Hex(0x8a6a44);
        static readonly Color TmMuste = Hex(0x3b2f22), TmPuu = Hex(0x76603f), TmPunainen = Hex(0x9a3b2c), TmNahka = Hex(0x5e4630);
        static readonly Color TmLasi = Hex(0xf4efe2), TmPeraSaumat = Hex(0xb8a27a), TmRunko = Hex(0xe6d8b8), TmRaita = Hex(0x6f5638);
        static readonly Color TmLasit = Hex(0xd9d2bf);

        // ---- Mitat (koneen yksiköissä) ----
        const float TmAlaY = -0.052f;          // alasiiven juuri (rungon alapitkäpuut)
        const float TmVali = 0.165f;           // siipiväli (1,48 m)
        const float TmJanne = 0.146f;          // siiven jänne (1,31 m)
        const float TmPaksuus = 0.016f;        // profiilin paksuus (11 %)
        const float TmNuoli = 11f;             // ulkosiipien nuolikulma (etureuna, astetta)
        const float TmVstylaY = 3f, TmVstalaY = 3.5f;   // V-kulmat (ylä ja ala)
        const float TmYlaEtu = 0.266f, TmAlaEtu = 0.199f;   // siipien etureuna juuressa (porrastus 0,6 m)
        const float TmEtuOhjaamo = 0.075f, TmTakaOhjaamo = -0.036f;

        /// <summary>
        /// Rungon poikkileikkaus (13 kärkeä): leveys ±w, keskikorkeus cy, korkeus ±h, yläviiste, kannen kupu (osuus h:sta) ja
        /// kyljissä sivuraidan reunat (raita hieman keskiviivan yläpuolella, leveys 0,24 h). Järjestys oikealta ylhäältä
        /// vastapäivään edestä katsottuna; nelikulmiot 5 ja 11 ovat raita.
        /// </summary>
        static Vector3[] TmRengas(float z, float cy, float w, float h, float yla, float ala, float kupu)
        {
            float ty = h * yla, tx = w * yla, by = h * ala, bx = w * ala, rs = cy + 0.15f * h, rw = 0.12f * h;
            return new[]
            {
                new Vector3(w, cy + h - ty, z), new Vector3(w - tx, cy + h, z), new Vector3(0f, cy + h + kupu * h, z), new Vector3(-(w - tx), cy + h, z),
                new Vector3(-w, cy + h - ty, z), new Vector3(-w, rs + rw, z), new Vector3(-w, rs - rw, z), new Vector3(-w, cy - h + by, z),
                new Vector3(-(w - bx), cy - h, z), new Vector3(w - bx, cy - h, z), new Vector3(w, cy - h + by, z), new Vector3(w, rs - rw, z),
                new Vector3(w, rs + rw, z),
            };
        }

        /// <summary>Rungon asemat nokasta pyrstöön: (z, keskikorkeus, puolileveys, puolikorkeus, yläviiste). Käänteinen rivimoottori:
        /// potkurin akseli on konepellin yläreunassa ja sylinterit roikkuvat alla, joten nokka on korkea ja kapea ja keskikorkeus
        /// akselin alapuolella; ohjaamojen kohdalla yläkansi on pyöristetty (kilpikonnakansi).</summary>
        static readonly (float z, float cy, float w, float h, float yla, float kupu)[] TmRunkoAsemat =
        {
            (0.388f, -0.016f, 0.016f, 0.026f, 0.30f, 0.05f),
            (0.370f, -0.022f, 0.030f, 0.044f, 0.30f, 0.06f),
            (0.330f, -0.020f, 0.037f, 0.052f, 0.30f, 0.07f),
            (0.255f, -0.010f, 0.042f, 0.060f, 0.35f, 0.06f),
            (0.170f, -0.002f, 0.046f, 0.064f, 0.45f, 0.0f),
            (0.050f, 0.000f, 0.046f, 0.064f, 0.50f, 0.0f),
            (-0.080f, 0.002f, 0.043f, 0.060f, 0.50f, 0.04f),
            (-0.200f, 0.007f, 0.033f, 0.046f, 0.50f, 0.16f),
            (-0.320f, 0.013f, 0.019f, 0.029f, 0.45f, 0.2f),
            (-0.398f, 0.018f, 0.006f, 0.012f, 0.40f, 0.1f),
        };

        /// <summary>Rungon yläkannen korkeus kohdassa z (ohjaamot, tuet).</summary>
        static float TmKansi(float z)
        {
            for (int i = 0; i + 1 < TmRunkoAsemat.Length; i++)
            {
                var a = TmRunkoAsemat[i]; var b = TmRunkoAsemat[i + 1];
                if (z <= a.z && z >= b.z)
                {
                    float t = (a.z - z) / (a.z - b.z);
                    return Mathf.Lerp(a.cy + a.h * (1f + a.kupu), b.cy + b.h * (1f + b.kupu), t);
                }
            }
            return 0.064f;
        }

        /// <summary>Rungon puolileveys kohdassa z.</summary>
        static float TmLeveys(float z)
        {
            for (int i = 0; i + 1 < TmRunkoAsemat.Length; i++)
            {
                var a = TmRunkoAsemat[i]; var b = TmRunkoAsemat[i + 1];
                if (z <= a.z && z >= b.z) return Mathf.Lerp(a.w, b.w, (a.z - z) / (a.z - b.z));
            }
            return 0.046f;
        }

        /// <summary>Siiven asema: etureunan piste, jänne ja paksuus. Profiili viisikulmiona (etureuna, yläpinnan kaari 12 % ja
        /// 40 %, takareuna, alapinta 30 %).</summary>
        static Vector3[] TmProfiili(Vector3 etu, float janne, float paksuus)
        {
            return new[]
            {
                etu,
                etu + new Vector3(0f, 0.75f * paksuus, -0.12f * janne),
                etu + new Vector3(0f, paksuus, -0.40f * janne),
                etu + new Vector3(0f, 0.08f * paksuus, -janne),
                etu + new Vector3(0f, -0.2f * paksuus, -0.30f * janne),
            };
        }

        /// <summary>Siipi asemista (sisältä ulos): profiilien väliset pinnat ulospäin ja päätykannet. Yksi ääriviivaosa.</summary>
        static void TmSiipi(Rakentaja r, (Vector3 etu, float janne, float paksuus)[] asemat, Color pinta, bool kansiSisa, bool kansiUlko)
        {
            r.AloitaOsa();
            var p = new Vector3[asemat.Length][];
            for (int i = 0; i < asemat.Length; i++) p[i] = TmProfiili(asemat[i].etu, asemat[i].janne, asemat[i].paksuus);
            for (int i = 0; i + 1 < asemat.Length; i++)
            {
                var keski = (TmKeskipiste(p[i]) + TmKeskipiste(p[i + 1])) * 0.5f;
                for (int k = 0; k < 5; k++)
                {
                    int q = (k + 1) % 5;
                    r.NelioKeskelta(p[i][k], p[i + 1][k], p[i + 1][q], p[i][q], keski, pinta);
                }
            }
            if (kansiSisa) TmKansiProfiili(r, p[0], TmKeskipiste(p[0]) - TmKeskipiste(p[1]), pinta);
            if (kansiUlko) TmKansiProfiili(r, p[asemat.Length - 1], TmKeskipiste(p[asemat.Length - 1]) - TmKeskipiste(p[asemat.Length - 2]), pinta);
            r.LopetaOsa();
        }

        static Vector3 TmKeskipiste(Vector3[] p)
        {
            var s = Vector3.zero;
            foreach (var v in p) s += v;
            return s / p.Length;
        }

        static void TmKansiProfiili(Rakentaja r, Vector3[] p, Vector3 ulos, Color vari)
        {
            var k = TmKeskipiste(p);
            for (int i = 0; i < p.Length; i++) r.KolmioUlos(k, p[i], p[(i + 1) % p.Length], ulos, vari);
        }

        /// <summary>Ulkosiiven asemat juuresta kärkeen: nuoli (etureuna taaksepäin), V-kulma ja pyöristetty kärki (neljä
        /// asemaa, joissa jänne lyhenee ja etureuna vetäytyy).</summary>
        static (Vector3, float, float)[] TmUlkosiipi(float x0, float x1, float y0, float z0, float vKulma, float puoli)
        {
            float nuoli = Mathf.Tan(TmNuoli * Mathf.Deg2Rad), v = Mathf.Tan(vKulma * Mathf.Deg2Rad);
            Vector3 Etu(float x) => new Vector3(x * puoli, y0 + (x - x0) * v, z0 - (x - x0) * nuoli);
            float kaari = 0.055f;
            var lista = new System.Collections.Generic.List<(Vector3, float, float)>
            {
                (Etu(x0), TmJanne, TmPaksuus),
                (Etu((x0 + x1 - kaari) * 0.5f), TmJanne, TmPaksuus * 0.95f),
            };
            // Pyöristetty kärki: jänne 1 → 0,3, etureuna vetäytyy 35 % lyhennyksestä (takareuna kaartuu eteen 65 %).
            float[] osuus = { 0f, 0.55f, 0.85f, 1f };
            float[] kerroin = { 1f, 0.9f, 0.68f, 0.3f };
            for (int i = 0; i < osuus.Length; i++)
            {
                float x = x1 - kaari + kaari * osuus[i];
                float janne = TmJanne * kerroin[i];
                var etu = Etu(x) + new Vector3(0f, 0f, -(TmJanne - janne) * 0.35f);
                lista.Add((etu, janne, TmPaksuus * (0.9f - 0.3f * osuus[i])));
            }
            return lista.ToArray();
        }

        /// <summary>Virtaviivainen tuki pisteestä a pisteeseen b: poikkileikkaus leveys (virtauksen suuntaan, +Z) × paksuus.</summary>
        static void TmTanko(Rakentaja r, Vector3 a, Vector3 b, float leveys, float paksuus, Color vari)
        {
            var d = (b - a).normalized;
            var uz = Vector3.forward - d * Vector3.Dot(Vector3.forward, d);
            if (uz.sqrMagnitude < 1e-6f) uz = Vector3.right - d * Vector3.Dot(Vector3.right, d);
            uz = uz.normalized * (leveys * 0.5f);
            var ux = Vector3.Cross(d, uz).normalized * (paksuus * 0.5f);
            var keski = (a + b) * 0.5f;
            r.AloitaOsa();
            r.NelioKeskelta(a + ux + uz, b + ux + uz, b + ux - uz, a + ux - uz, keski, vari);
            r.NelioKeskelta(a - ux + uz, b - ux + uz, b - ux - uz, a - ux - uz, keski, vari);
            r.NelioKeskelta(a + ux + uz, b + ux + uz, b - ux + uz, a - ux + uz, keski, vari);
            r.NelioKeskelta(a + ux - uz, b + ux - uz, b - ux - uz, a - ux - uz, keski, vari);
            r.LopetaOsa();
        }

        /// <summary>Pyörä x-akselin suuntaisena sylinterinä: keskipiste, säde, leveys; kulutuspinta musteena, navat kankaana.</summary>
        static void TmPyora(Rakentaja r, Vector3 k, float sade, float leveys)
        {
            const int n = 10;
            var x = new Vector3(leveys * 0.5f, 0f, 0f);
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                var d0 = new Vector3(0f, Mathf.Cos(a0), Mathf.Sin(a0)) * sade; var d1 = new Vector3(0f, Mathf.Cos(a1), Mathf.Sin(a1)) * sade;
                r.NelioKeskelta(k - x + d0, k + x + d0, k + x + d1, k - x + d1, k, TmMuste);
                r.KolmioUlos(k + x, k + x + d0, k + x + d1, Vector3.right, TmPelti);
                r.KolmioUlos(k - x, k - x + d0, k - x + d1, Vector3.left, TmPelti);
            }
            r.LopetaOsa();
        }

        /// <summary>Litteä levy ääriviivasta (peräsin, eväke): pisteet (z, y) x-tasossa ±paksuus/2, sivut ja reunat.</summary>
        static void TmLevy(Rakentaja r, (float z, float y)[] reuna, float paksuus, Color vari)
        {
            int n = reuna.Length;
            var o = new Vector3[n]; var v = new Vector3[n];
            var k = Vector3.zero;
            for (int i = 0; i < n; i++)
            {
                o[i] = new Vector3(paksuus * 0.5f, reuna[i].y, reuna[i].z); v[i] = new Vector3(-paksuus * 0.5f, reuna[i].y, reuna[i].z);
                k += new Vector3(0f, reuna[i].y, reuna[i].z);
            }
            k /= n;
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                r.KolmioUlos(new Vector3(paksuus * 0.5f, k.y, k.z), o[i], o[q], Vector3.right, vari);
                r.KolmioUlos(new Vector3(-paksuus * 0.5f, k.y, k.z), v[i], v[q], Vector3.left, vari);
                var sivu = (o[i] + o[q]) * 0.5f - new Vector3(paksuus * 0.5f, k.y, k.z);
                r.NelioUlos(o[i], o[q], v[q], v[i], new Vector3(0f, sivu.y, sivu.z), vari);
            }
            r.LopetaOsa();
        }

        /// <summary>Pää nahkakypärässä: matala pallo (8 × 4), lentolasit otsalla vaaleana nauhana (+Z eteen).</summary>
        static void TmPaa(Rakentaja r, Vector3 k, float sade)
        {
            const int n = 8, rr = 4;
            var p = new Vector3[rr + 1, n];
            for (int j = 0; j <= rr; j++)
                for (int i = 0; i < n; i++)
                {
                    float fi = Mathf.PI * (j / (float)rr - 0.5f), th = i * Mathf.PI * 2f / n;
                    p[j, i] = k + new Vector3(Mathf.Cos(fi) * Mathf.Sin(th), Mathf.Sin(fi) * 1.1f, Mathf.Cos(fi) * Mathf.Cos(th)) * sade;
                }
            r.AloitaOsa();
            for (int j = 0; j < rr; j++)
                for (int i = 0; i < n; i++)
                {
                    int q = (i + 1) % n;
                    // Lentolasit: ylemmän keskivyön etusektorit (th ≈ 0) vaaleina.
                    bool lasit = j == 2 && (i == 0 || i == n - 1);
                    if (j == 0) r.KolmioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], k, TmNahka);
                    else if (j == rr - 1) r.KolmioKeskelta(p[j, i], p[j + 1, i], p[j, q], k, TmNahka);
                    else r.NelioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], p[j, q], k, lasit ? TmLasit : TmNahka);
                }
            r.LopetaOsa();
        }

        /// <summary>Tiger Mothin kiinteä osa: runko ja konepelti, ohjaamot, matkustajat, siivet, tuet ja vaijerit, pyrstö,
        /// laskuteline ja pakoputki.</summary>
        public static Mesh TigerMothRunko()
        {
            var r = new Rakentaja();

            // Runko: poikkileikkaukset nokasta pyrstöön; konepelti (z > 0,25) peltinä, kyljissä tumma sivuraita nokasta
            // pyrstöön (klassinen siviiliväritys, erottaa rungon vaaleista siivistä ja kartasta).
            r.AloitaOsa();
            var renkaat = new Vector3[TmRunkoAsemat.Length][];
            for (int i = 0; i < TmRunkoAsemat.Length; i++)
            {
                var a = TmRunkoAsemat[i];
                renkaat[i] = TmRengas(a.z, a.cy, a.w, a.h, a.yla, 0.22f, a.kupu);
            }
            int m = renkaat[0].Length;
            for (int i = 0; i + 1 < renkaat.Length; i++)
            {
                var keski = new Vector3(0f, (TmRunkoAsemat[i].cy + TmRunkoAsemat[i + 1].cy) * 0.5f, (TmRunkoAsemat[i].z + TmRunkoAsemat[i + 1].z) * 0.5f);
                bool pelti = TmRunkoAsemat[i + 1].z >= 0.25f;
                for (int k = 0; k < m; k++)
                {
                    int q = (k + 1) % m;
                    var c = k == 5 || k == 11 ? TmRaita : pelti ? TmPelti : k == 8 ? TmKangasVarjo : TmRunko;
                    r.NelioKeskelta(renkaat[i][k], renkaat[i + 1][k], renkaat[i + 1][q], renkaat[i][q], keski, c);
                }
            }
            TmKansiProfiili(r, renkaat[0], Vector3.forward, TmPelti);
            TmKansiProfiili(r, renkaat[renkaat.Length - 1], Vector3.back, TmRunko);
            r.LopetaOsa();

            // Ohjaamot: mustat aukot yläkannessa, tuulilasit edessä, nahkakypäräiset päät ja hartiat.
            foreach (float zc in new[] { TmEtuOhjaamo, TmTakaOhjaamo })
            {
                float y = TmKansi(zc) + 0.0015f, w = TmLeveys(zc) * 0.48f;
                r.NelioUlos(new Vector3(-w, y, zc + 0.036f), new Vector3(w, y, zc + 0.036f), new Vector3(w, y, zc - 0.034f), new Vector3(-w, y, zc - 0.034f), Vector3.up, TmMuste);
                // Tuulilasi: kallistettu taakse, kaksipuolinen.
                float yl = TmKansi(zc + 0.045f);
                r.Kalvo(new Vector3(-0.02f, yl, zc + 0.048f), new Vector3(0.02f, yl, zc + 0.048f), new Vector3(0.016f, yl + 0.022f, zc + 0.036f), new Vector3(-0.016f, yl + 0.022f, zc + 0.036f), TmLasi);
                // Hartiat ja pää: nahkakypärä pallona, lentolasit otsalla (vaalea nauha edessä).
                r.Laatikko(new Vector3(0f, y - 0.004f, zc - 0.012f), new Vector3(0.042f, 0.018f, 0.026f), TmNahka, TmNahka);
                TmPaa(r, new Vector3(0f, y + 0.027f, zc - 0.01f), 0.0135f);
            }
            // Foggin huivin solmu kaulassa (punainen, liehuva osa on oma verkko).
            r.Timantti(new Vector3(0f, TmKansi(TmEtuOhjaamo) + 0.017f, TmEtuOhjaamo - 0.004f), 0.011f, 0.005f, TmPunainen, 6);

            // Yläsiipi: keskiosa (suora, polttoainesäiliön kohouma) ja nuolimaiset ulkosiivet.
            float yY = TmAlaY + TmVali;
            TmSiipi(r, new[] { (new Vector3(-0.095f, yY, TmYlaEtu), TmJanne, TmPaksuus), (new Vector3(0.095f, yY, TmYlaEtu), TmJanne, TmPaksuus) }, TmKangas, false, false);
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, yY + TmPaksuus * 0.7f, TmYlaEtu - 0.05f), new Vector3(0.12f, 0.009f, 0.07f), TmKangasVarjo, TmKangas);
            r.LopetaOsa();
            foreach (float puoli in new[] { -1f, 1f })
                TmSiipi(r, TmUlkosiipi(0.095f, 0.5f, yY, TmYlaEtu, TmVstylaY, puoli), TmKangas, false, true);
            // Alasiivet rungon kyljistä; siivekkeet vain alasiivissä (takareunan ulko-osa varjokankaana).
            float xJuuri = TmLeveys(TmAlaEtu - 0.07f);
            foreach (float puoli in new[] { -1f, 1f })
            {
                TmSiipi(r, TmUlkosiipi(xJuuri, 0.485f, TmAlaY, TmAlaEtu, TmVstalaY, puoli), TmKangas, true, true);
                float nuoli = Mathf.Tan(TmNuoli * Mathf.Deg2Rad), v = Mathf.Tan(TmVstalaY * Mathf.Deg2Rad);
                Vector3 Te(float x) => new Vector3(x * puoli, TmAlaY + (x - xJuuri) * v + 0.08f * TmPaksuus + 0.0008f, TmAlaEtu - (x - xJuuri) * nuoli - TmJanne);
                Vector3 s = new Vector3(0f, 0.004f, 0.034f);
                r.NelioUlos(Te(0.25f), Te(0.42f), Te(0.42f) + s, Te(0.25f) + s, Vector3.up, TmPeraSaumat);
            }

            // Tuet: N-tuet (etu- ja takasalko sekä vinotuki) ulkona ja keskiosan tukisalot rungolle.
            float etuSalko = 0.25f * TmJanne, takaSalko = 0.7f * TmJanne;
            Vector3 Siipipiste(bool yla, float x, float salko, float puoli)
            {
                float x0 = yla ? 0.095f : xJuuri, y0 = yla ? yY : TmAlaY, z0 = yla ? TmYlaEtu : TmAlaEtu;
                float vk = yla ? TmVstylaY : TmVstalaY;
                float xx = Mathf.Max(x, x0);
                return new Vector3(x * puoli, y0 + (xx - x0) * Mathf.Tan(vk * Mathf.Deg2Rad) + (yla ? -0.2f : 0.5f) * TmPaksuus,
                    z0 - (xx - x0) * Mathf.Tan(TmNuoli * Mathf.Deg2Rad) - salko);
            }
            foreach (float puoli in new[] { -1f, 1f })
            {
                const float xN = 0.335f;
                var alaEtu = Siipipiste(false, xN, etuSalko, puoli); var ylaEtu = Siipipiste(true, xN + 0.004f, etuSalko, puoli);
                var alaTaka = Siipipiste(false, xN, takaSalko, puoli); var ylaTaka = Siipipiste(true, xN + 0.004f, takaSalko, puoli);
                TmTanko(r, alaEtu, ylaEtu, 0.012f, 0.005f, TmTuki);
                TmTanko(r, alaTaka, ylaTaka, 0.012f, 0.005f, TmTuki);
                TmTanko(r, alaTaka, ylaEtu, 0.009f, 0.004f, TmTuki);
                // Keskiosan tukisalot: rungon yläpitkäpuista yläsiiven keskiosan salkoihin (hieman ulospäin).
                float zt1 = TmYlaEtu - etuSalko, zt2 = TmYlaEtu - takaSalko;
                TmTanko(r, new Vector3(0.036f * puoli, TmKansi(zt1 - 0.02f) - 0.004f, zt1 - 0.02f), new Vector3(0.07f * puoli, yY - 0.002f, zt1), 0.01f, 0.004f, TmTuki);
                TmTanko(r, new Vector3(0.036f * puoli, TmKansi(zt2 - 0.02f) - 0.004f, zt2 - 0.02f), new Vector3(0.07f * puoli, yY - 0.002f, zt2), 0.01f, 0.004f, TmTuki);
                TmTanko(r, new Vector3(0.036f * puoli, TmKansi(zt2 - 0.02f) - 0.004f, zt2 - 0.02f), new Vector3(0.07f * puoli, yY - 0.002f, zt1), 0.007f, 0.003f, TmTuki);
                // Vaijerit: lento- ja laskuvaijerit ristiin N-tukien ja rungon välissä (ohuet, musteena).
                var runkoAla = new Vector3(TmLeveys(TmAlaEtu - etuSalko) * puoli, TmAlaY + 0.004f, TmAlaEtu - etuSalko);
                var runkoYla = new Vector3(0.075f * puoli, yY, TmYlaEtu - etuSalko);
                TmTanko(r, runkoAla, ylaEtu + new Vector3(-0.012f * puoli, 0f, 0f), 0.0022f, 0.0022f, TmMuste);
                TmTanko(r, runkoAla + new Vector3(0f, 0f, -0.02f), ylaTaka + new Vector3(-0.012f * puoli, 0f, 0f), 0.0022f, 0.0022f, TmMuste);
                TmTanko(r, runkoYla, alaEtu + new Vector3(-0.012f * puoli, 0f, 0f), 0.0022f, 0.0022f, TmMuste);
            }

            // Pyrstö: korkeusvakaaja pyöristetyin kärjin ja pyöreä peräsin (sivuvakaaja edessä).
            const float zVakaaja = -0.33f, yVakaaja = 0.02f, jVakaaja = 0.082f;
            foreach (float puoli in new[] { -1f, 1f })
            {
                var asemat = new (Vector3, float, float)[]
                {
                    (new Vector3(0.012f * puoli, yVakaaja, zVakaaja), jVakaaja, 0.008f),
                    (new Vector3(0.1f * puoli, yVakaaja, zVakaaja - 0.012f), jVakaaja * 0.95f, 0.007f),
                    (new Vector3(0.132f * puoli, yVakaaja, zVakaaja - 0.022f), jVakaaja * 0.75f, 0.006f),
                    (new Vector3(0.148f * puoli, yVakaaja, zVakaaja - 0.036f), jVakaaja * 0.45f, 0.005f),
                };
                TmSiipi(r, asemat, TmKangas, false, true);
            }
            TmLevy(r, new (float, float)[] { (-0.30f, 0.032f), (-0.372f, 0.118f), (-0.372f, 0.030f) }, 0.006f, TmKangas);
            TmLevy(r, new (float, float)[]
            {
                (-0.372f, 0.132f), (-0.392f, 0.14f), (-0.414f, 0.132f), (-0.428f, 0.105f), (-0.434f, 0.06f), (-0.43f, 0.01f),
                (-0.418f, -0.022f), (-0.39f, -0.03f), (-0.372f, -0.018f),
            }, 0.006f, TmKangas);

            // Laskuteline: kaksi pyörää siiven etureunan alla, etu- ja takajalka sekä puoliakseli; kannus pyrstössä.
            foreach (float puoli in new[] { -1f, 1f })
            {
                var akseli = new Vector3(0.085f * puoli, TmAlaY - 0.105f, 0.225f);
                TmPyora(r, akseli + new Vector3(0.006f * puoli, 0f, 0f), 0.03f, 0.012f);
                TmTanko(r, akseli, new Vector3(0.042f * puoli, TmAlaY - 0.012f, 0.262f), 0.01f, 0.005f, TmTuki);
                TmTanko(r, akseli, new Vector3(0.042f * puoli, TmAlaY - 0.012f, 0.16f), 0.01f, 0.005f, TmTuki);
                TmTanko(r, akseli, new Vector3(0.004f * puoli, TmAlaY - 0.03f, 0.215f), 0.008f, 0.004f, TmTuki);
            }
            TmTanko(r, new Vector3(0f, 0.004f, -0.37f), new Vector3(0f, -0.04f, -0.39f), 0.008f, 0.005f, TmTuki);

            // Pakoputki vasemmalla kyljellä: sarja konepellin sivulta taakse etuohjaamon alle.
            TmTanko(r, new Vector3(-0.041f, -0.035f, 0.33f), new Vector3(-0.047f, -0.048f, 0.2f), 0.007f, 0.007f, TmPuu);
            TmTanko(r, new Vector3(-0.047f, -0.048f, 0.2f), new Vector3(-0.048f, -0.052f, 0.02f), 0.007f, 0.007f, TmPuu);

            // Navan mutteri ja potkurin kiinnitys nokassa (lavat ovat oma osansa).
            r.AloitaOsa();
            var napa = TigerMothNapa;
            for (int i = 0; i < 6; i++)
            {
                float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                var d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * 0.011f; var d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * 0.011f;
                r.NelioKeskelta(napa + d0 + Vector3.back * 0.012f, napa + d1 + Vector3.back * 0.012f, napa + d1, napa + d0, napa + Vector3.back * 0.006f, TmPelti);
                r.KolmioUlos(napa + d0, napa + d1, napa + Vector3.forward * 0.01f, Vector3.forward, TmPelti);
            }
            r.LopetaOsa();
            return r.Verkko("TigerMoth");
        }

        /// <summary>
        /// Potkuri: kaksi puista lapaa (halkaisija 1,98 m), kierre 25° tyvessä → 12° kärjessä, punaiset kärjet (aksentti).
        /// Napa origossa, lavat XY-tasossa (±Y), pyörimisakseli +Z (Potkurit-komponentti, lapsen nimi "Potkuri").
        /// </summary>
        public static Mesh TigerMothPotkuri()
        {
            var r = new Rakentaja();
            float R = TigerMothPotkurinSade;
            foreach (float puoli in new[] { -1f, 1f })
            {
                float[] sade = { 0.012f, 0.55f * R, 0.86f * R, R };
                float[] janne = { 0.02f, 0.02f, 0.016f, 0.011f };
                float[] kierre = { 25f, 17f, 13f, 12f };
                var p = new Vector3[sade.Length][];
                for (int i = 0; i < sade.Length; i++)
                {
                    var q = Quaternion.AngleAxis(kierre[i] * puoli, Vector3.up);
                    float c = janne[i] * 0.5f, t = 0.0022f;
                    p[i] = new[]
                    {
                        new Vector3(0f, sade[i] * puoli, 0f) + q * new Vector3(c, 0f, 0f), new Vector3(0f, sade[i] * puoli, 0f) + q * new Vector3(0f, 0f, t),
                        new Vector3(0f, sade[i] * puoli, 0f) + q * new Vector3(-c, 0f, 0f), new Vector3(0f, sade[i] * puoli, 0f) + q * new Vector3(0f, 0f, -t),
                    };
                }
                r.AloitaOsa();
                for (int i = 0; i + 1 < sade.Length; i++)
                {
                    var keski = new Vector3(0f, (sade[i] + sade[i + 1]) * 0.5f * puoli, 0f);
                    var vari = i == sade.Length - 2 ? TmPunainen : TmPuu;
                    for (int k = 0; k < 4; k++)
                    {
                        int q = (k + 1) % 4;
                        r.NelioKeskelta(p[i][k], p[i + 1][k], p[i + 1][q], p[i][q], keski, vari);
                    }
                }
                r.NelioUlos(p[sade.Length - 1][0], p[sade.Length - 1][1], p[sade.Length - 1][2], p[sade.Length - 1][3], new Vector3(0f, puoli, 0f), TmPunainen);
                r.LopetaOsa();
            }
            return r.Verkko("TigerMoth-potkuri");
        }

        /// <summary>
        /// Foggin huivi: punainen nauha niskasta taakse (kiinnitys origossa, liehuu −Z:aan), neljä lenkkiä loivalla aallolla,
        /// kaksipuolinen. Lepatus (2,5–4 Hz, amplitudi kohinana) on komponentin kierto kiinnityksen ympäri.
        /// </summary>
        public static Mesh TigerMothHuivi()
        {
            var r = new Rakentaja();
            const int lenkit = 4;
            const float pituus = 0.075f, leveys = 0.011f;
            r.AloitaOsa();
            for (int i = 0; i < lenkit; i++)
            {
                float u0 = i / (float)lenkit, u1 = (i + 1) / (float)lenkit;
                Vector3 P(float u) => new Vector3(0.006f * Mathf.Sin(u * Mathf.PI * 2.2f), -0.012f * u - 0.01f * u * u, -pituus * u);
                float w0 = leveys * (1f - 0.35f * u0) * 0.5f, w1 = leveys * (1f - 0.35f * u1) * 0.5f;
                var a = P(u0); var b = P(u1);
                r.Kalvo(a + new Vector3(0f, w0, 0f), b + new Vector3(0f, w1, 0f), b - new Vector3(0f, w1, 0f), a - new Vector3(0f, w0, 0f), TmPunainen);
            }
            r.LopetaOsa();
            return r.Verkko("TigerMoth-huivi");
        }
    }
}
