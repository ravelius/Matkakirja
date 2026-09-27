using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koriste 10: kartografinen merihirviö, vanhan kartan käärme (1873-ornamentti). Harvinainen lisälaji kaikilla
    /// merillä (MeriKoristeet: Harvinainen = true): näytös 10 s, tauko 5–10 min. Pää nousee kaulan varassa vedestä, kolme
    /// kaarta nousee perässä vuorotellen, kaaret aaltoilevat hetken ja käärme painuu takaisin pää edellä. Kaiverrettu
    /// seepiatyyli: raidallinen ruskea selkä harjanteena, vaalea vatsa, terrakotta harja ja evät (ainoa aksentti). Hymyilyttävä
    /// eikä pelottava: pyöreä kuono, isot silmät päälaella, pää kallistuu uteliaasti. Harvinainen (noin 1/10): pää nousee
    /// korkeammalle ja katselee ympärilleen. Veden alla näkyy tumma läpikuultava varjo, joka yhdistää kaaret yhdeksi otukseksi
    /// ja ennakoi nousua näytöksen alussa.
    /// +z eteen (pää), +y ylös, meren pinta y = 0. Lapset: 0–2 kaaret (edestä taakse), 3 kaula, 4 pää.
    /// </summary>
    public static class MeriHirvio
    {
        public const string Nimi = "merihirvio";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri", "itameri", "jaameri" };
        /// <summary>Kuonon kärjestä viimeisen kaaren päähän noin 0,27 yksikköä → noin 66 pt.</summary>
        public const float KokoPt = 245f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(947, 10f, 10f, 300f, 600f);
        public const int Lapsia = 3, Lapsia2 = 1, Lapsia3 = 1;

        static readonly Color Selka = MalliVarit.Hex(0x5a4230), SelkaVaalea = MalliVarit.Hex(0x8b6e4d);
        static readonly Color Vatsa = MalliVarit.Hex(0xdcc9a1), Harja = MalliVarit.Terrakotta;
        static readonly Color Silma = new Color(0.98f, 0.97f, 0.93f), Pupilli = MalliVarit.Hex(0x221c17);
        static readonly Color Varjo = new Color(0.33f, 0.26f, 0.19f, 0.16f);

        /// <summary>
        /// Kaarten keskipisteet (x, z), koot ja kierrot (°): kaaret vuorottelevat ±28°, joten runko mutkittelee ylhäältä
        /// katsottuna ja kaaret näkyvät kaarina myös rannikon suunnasta (päästä) katsottuna.
        /// </summary>
        static readonly float[] KaariZ = { 0.03f, -0.037f, -0.095f }, KaariX = { 0.004f, -0.002f, 0.003f };
        static readonly float[] KaariKoko = { 1f, 0.86f, 0.72f }, KaariKierto = { 28f, -28f, 26f };
        const float KaariR = 0.024f, KaulaZ = 0.08f;
        /// <summary>Kaaret pystysuunnassa venytettyinä (puoliellipsi), jotta ne erottuvat kaarina myös loivasti kallistetussa näkymässä.</summary>
        const float KaariKorkeus = 1.35f;
        /// <summary>Kaulan suora tyvi ja kaaren säde: pään liitos kaulan avaruudessa (0, H0 + Rk, Rk).</summary>
        const float H0 = 0.012f, Rk = 0.028f, PaaKoko = 1.3f;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Mallit ----

        /// <summary>Juuri: vedenalainen varjo kaulan tyvestä kaarten kautta pyrstöön (häipyvä nauha, kapenee pyrstöä kohti).</summary>
        public static Mesh Roottori()
        {
            var r = new MalliRakenne();
            var p = new[] { new Vector3(0f, 0.0006f, KaulaZ + 0.004f), new Vector3(KaariX[0], 0.0006f, KaariZ[0]),
                new Vector3(KaariX[1], 0.0006f, KaariZ[1]), new Vector3(KaariX[2], 0.0006f, KaariZ[2]), new Vector3(-0.006f, 0.0006f, -0.14f) };
            float[] leveys = { 0.016f, 0.02f, 0.018f, 0.014f, 0.002f }, alfa = { 0.5f, 1f, 1f, 0.8f, 0f };
            for (int i = 0; i < p.Length - 1; i++)
            {
                Vector3 s0 = Sivu(p, i) * (leveys[i] * 0.5f), s1 = Sivu(p, i + 1) * (leveys[i + 1] * 0.5f);
                Color c0 = Varjo, c1 = Varjo;
                c0.a *= alfa[i]; c1.a *= alfa[i + 1];
                r.NelioVarit(p[i] + s0, p[i] - s0, p[i + 1] - s1, p[i + 1] + s1, c0, c0, c1, c1);
            }
            return r.Mesh("Meri: merihirviön varjo");
        }

        /// <summary>Polun sivusuunta (vaakatasossa) pisteessä i.</summary>
        static Vector3 Sivu(Vector3[] p, int i)
        {
            var d = p[Mathf.Min(i + 1, p.Length - 1)] - p[Mathf.Max(i - 1, 0)];
            return Vector3.Cross(Vector3.up, d).normalized;
        }

        /// <summary>
        /// Kaari (lapsi): puoliympyrä y–z-tasossa (säde 0,024, keskipiste origossa vedenpinnalla), kolmiopoikkileikkaus harja
        /// ulospäin ja vaalea vatsa kaaren sisäpuolella, kaksi terrakotta-piikkiä harjalla ja häipyvä vaahtorengas tyvellä.
        /// Animaatio nostaa kaaren y-skaalalla, joten päät ja rengas pysyvät pinnassa.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            const int n = 5;
            var c = new Vector3[n];
            var fii = new float[n];
            for (int i = 0; i < n; i++)
            {
                fii[i] = Mathf.PI * i / (n - 1);
                c[i] = new Vector3(0f, KaariR * Mathf.Sin(fii[i]), -KaariR * Mathf.Cos(fii[i]));
            }
            Putki(r, c, fii, 0.0085f, 0.0085f, 0.0055f, 0.0055f, 0.0095f, 0.0095f);
            // Harjan piikit (terrakotta): taaksepäin kallistuneet kolmiot kaaren laella.
            float yla = KaariR + 0.0085f;
            r.Kolmio(new Vector3(0f, yla - 0.002f, 0.009f), new Vector3(0f, yla + 0.008f, -0.001f), new Vector3(0f, yla - 0.001f, -0.002f), Harja);
            r.Kolmio(new Vector3(0f, yla - 0.001f, -0.003f), new Vector3(0f, yla + 0.0055f, -0.011f), new Vector3(0f, yla - 0.002f, -0.011f), Harja);
            Rengas(r, KaariR + 0.0105f, 0.0135f, 0.011f, 0.011f, 5);
            return r.Mesh("Meri: merihirviön kaari");
        }

        /// <summary>
        /// Kaula (lapsi): suora tyvi vedestä (0,012) ja neljänneskaari eteen (säde 0,028), jonka päässä on pään liitos; harja
        /// selkäpuolella, vaalea kurkku edessä, vaahtorengas tyvellä. Nousu ja harvinaisen korkea kaula y-skaalalla.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            const int n = 5;
            var c = new Vector3[n];
            var fii = new float[n];
            c[0] = Vector3.zero; fii[0] = 0f;
            for (int i = 1; i < n; i++)
            {
                fii[i] = Mathf.PI * 0.5f * (i - 1) / (n - 2);
                c[i] = new Vector3(0f, H0 + Rk * Mathf.Sin(fii[i]), Rk - Rk * Mathf.Cos(fii[i]));
            }
            Putki(r, c, fii, 0.0085f, 0.0068f, 0.0055f, 0.0045f, 0.0098f, 0.0075f);
            Rengas(r, 0.012f, 0.0128f, 0.01f, 0.01f, 5);
            return r.Mesh("Meri: merihirviön kaula");
        }

        /// <summary>
        /// Pää (lapsi): origo kaulan liitoksessa, +z kuonoon. Kuusikulmainen pyöreä kallo ja lyhyt kuono (litteä päälaki),
        /// isot valkoiset silmät päälaella pupillit eteenpäin, terrakotta-harja takaraivolla ja pienet korvaevät.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            // Renkaat takaraivosta kuonoon: z, puolileveys, puolikorkeus ja keskikohdan y; kuusikulmio, jossa litteä päälaki.
            float[] rz = { -0.004f, 0.007f, 0.019f }, rl = { 0.0075f, 0.0128f, 0.0106f }, rk = { 0.007f, 0.011f, 0.0078f }, ry = { 0.0005f, 0.002f, 0f };
            var p = new Vector3[3, 6];
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 6; j++)
                {
                    float a = j * Mathf.PI / 3f;
                    p[i, j] = new Vector3(rl[i] * Mathf.Cos(a), ry[i] + rk[i] * Mathf.Sin(a), rz[i]);
                }
            // Tahko j on kärkien j ja j + 1 välissä: 1 päälaki (vaalea selkä), 0 ja 2 yläkyljet (selkä), 3–5 posket ja leuka (vatsa).
            for (int i = 0; i < 2; i++)
                for (int j = 0; j < 6; j++)
                    r.Nelio(p[i + 1, j], p[i, j], p[i, (j + 1) % 6], p[i + 1, (j + 1) % 6], PaanVari(j));
            var kuono = new Vector3(0f, -0.0004f, 0.0265f);
            for (int j = 0; j < 6; j++) r.Kolmio(kuono, p[2, j], p[2, (j + 1) % 6], PaanVari(j));

            // Silmät: valkoiset kupolit päälaen reunoilla (kuin sammakolla), pupilli etureunalla.
            foreach (float puoli in new[] { -1f, 1f })
            {
                var k = new Vector3(0.0072f * puoli, 0.0122f, 0.0095f);
                const float s = 0.0062f;
                Vector3 x = new Vector3(s * puoli, 0f, 0f), y = new Vector3(0f, s, 0f), z = new Vector3(0f, 0f, s);
                Vector3 ylos = k + y, ulos = k + x, eteen = k + z, sisaan = k - x, taakse = k - z;
                KolmioUlos(r, ylos, ulos, eteen, k, Silma); KolmioUlos(r, ylos, eteen, sisaan, k, Silma);
                KolmioUlos(r, ylos, sisaan, taakse, k, Silma); KolmioUlos(r, ylos, taakse, ulos, k, Silma);
                // Pupilli: pieni vinoneliö kupolin etureunalla (ylä- ja etukärjen välissä), joten katse on eteenpäin.
                var nk = new Vector3(0f, 0.7071f, 0.7071f);
                var g = k + new Vector3(0f, s * 0.5f, s * 0.5f) + nk * 0.0005f;
                Vector3 ex = new Vector3(s * 0.34f, 0f, 0f), ey = new Vector3(0f, s * 0.3f, -s * 0.3f);
                r.Nelio(g + ey, g + ex, g - ey, g - ex, Pupilli);
            }
            // Harja: viuhka takaraivolla, piikit vuorotellen pitkiä ja lyhyitä.
            var tyvi = new Vector3(0f, 0.0105f, -0.001f);
            float[] kulma = { 10f, 40f, 70f, 100f }, pituus = { 0.014f, 0.009f, 0.013f, 0.007f };
            for (int i = 0; i < kulma.Length - 1; i++)
            {
                float a0 = kulma[i] * Mathf.Deg2Rad, a1 = kulma[i + 1] * Mathf.Deg2Rad;
                r.Kolmio(tyvi, tyvi + new Vector3(0f, Mathf.Sin(a0), -Mathf.Cos(a0)) * pituus[i], tyvi + new Vector3(0f, Mathf.Sin(a1), -Mathf.Cos(a1)) * pituus[i + 1], Harja);
            }
            // Korvaevät takaraivon sivuilla, hieman riippuvina.
            foreach (float puoli in new[] { -1f, 1f })
                r.Kolmio(new Vector3(0.0088f * puoli, 0.0055f, 0f), new Vector3(0.0175f * puoli, 0.002f, -0.009f), new Vector3(0.0078f * puoli, 0.0015f, -0.004f), Harja);
            // Iso pää suhteessa kaulaan (vauvakaava: hymyilyttää eikä pelota).
            for (int i = 0; i < r.P.Count; i++) r.P[i] = r.P[i] * PaaKoko;
            return r.Mesh("Meri: merihirviön pää");
        }

        static Color PaanVari(int tahko) => tahko == 1 ? SelkaVaalea : tahko == 0 || tahko == 2 ? Selka : Vatsa;

        /// <summary>Kolmio, jonka normaali osoittaa pois pisteestä keskus (silmien kupolit molemmilla puolilla).</summary>
        static void KolmioUlos(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Vector3 keskus, Color v)
        {
            if (Vector3.Dot(Vector3.Cross(b - a, c - a), (a + b + c) / 3f - keskus) < 0f) r.Kolmio(a, c, b, v);
            else r.Kolmio(a, b, c, v);
        }

        /// <summary>
        /// Kolmiopoikkileikkauksinen putki y–z-tasossa: asemat c (keskiviiva), kulma φ (tangentti (0, cos φ, sin φ), ulkonormaali
        /// (0, sin φ, −cos φ)), harjan korkeus a, vatsan syvyys b ja puolileveys w lineaarisesti päästä päähän. Harjan kyljet
        /// vuorottelevat asemittain tummana ja vaaleana (kaiverruksen raidat), vatsa vaalea.
        /// </summary>
        static void Putki(MalliRakenne r, Vector3[] c, float[] fii, float a0, float a1, float b0, float b1, float w0, float w1)
        {
            int n = c.Length;
            var harja = new Vector3[n];
            var vas = new Vector3[n];
            var oik = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                float u = i / (float)(n - 1);
                var N = new Vector3(0f, Mathf.Sin(fii[i]), -Mathf.Cos(fii[i]));
                var w = new Vector3(Mathf.Lerp(w0, w1, u), 0f, 0f);
                harja[i] = c[i] + N * Mathf.Lerp(a0, a1, u);
                vas[i] = c[i] - N * Mathf.Lerp(b0, b1, u) - w;
                oik[i] = c[i] - N * Mathf.Lerp(b0, b1, u) + w;
            }
            for (int i = 0; i < n - 1; i++)
            {
                Color v = i % 2 == 0 ? Selka : SelkaVaalea;
                r.Nelio(vas[i], vas[i + 1], harja[i + 1], harja[i], v);
                r.Nelio(harja[i], harja[i + 1], oik[i + 1], oik[i], v);
                r.Nelio(oik[i], oik[i + 1], vas[i + 1], vas[i], Vatsa);
            }
        }

        /// <summary>Vaahtorengas vedenpinnalla (ellipsi): sisäreuna (puoliakselit z, x) vaahtoa, ulkoreuna (+ leveys) häipyy.</summary>
        static void Rengas(MalliRakenne r, float sz, float sx, float lz, float lx, int sektoreita)
        {
            Color sisa = MeriGeometria.Vaahto, ulko = MeriGeometria.Vaahto;
            sisa.a = 0.55f; ulko.a = 0f;
            for (int i = 0; i < sektoreita; i++)
            {
                float a0 = i * Mathf.PI * 2f / sektoreita, a1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                Vector3 s0 = new Vector3(Mathf.Sin(a0) * sx, 0.0012f, Mathf.Cos(a0) * sz), s1 = new Vector3(Mathf.Sin(a1) * sx, 0.0012f, Mathf.Cos(a1) * sz);
                Vector3 u0 = new Vector3(Mathf.Sin(a0) * (sx + lx), 0.0012f, Mathf.Cos(a0) * (sz + lz)), u1 = new Vector3(Mathf.Sin(a1) * (sx + lx), 0.0012f, Mathf.Cos(a1) * (sz + lz));
                r.NelioVarit(s0, s1, u1, u0, sisa, sisa, ulko, ulko);
            }
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 0.8f) * Pehmea((pituus - s) / 0.8f);
        }

        /// <summary>
        /// Merihirviön näytös (10 s): pää nousee kaulan varassa (0,4–1,7 s, kuono ensin alas ja sitten uteliaasti ylös), kaaret
        /// nousevat edestä taakse 0,45 s:n välein, aaltoilevat (y-skaala ±10 %, aalto kulkee taaksepäin) ja pää keinuu, kääntyilee
        /// ja kallistuu; sitten pää painuu ensin ja kaaret perässä (6,5–9,1 s). Merellä x −0,08…−0,1, uintisuunta rannikon
        /// suuntaan pohjoiseen tai etelään (±10°) jaksosta, eteneminen hidas (0,03 näytöksessä). Harvinainen: kaula nousee 1,8-kertaiseksi pystyyn ja pää katsoo vasemmalle, oikealle ja takaisin.
        /// </summary>
        public static void Animoi(Transform juuri, Transform[] lapset, float t, float nopeus)
        {
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float suunta = (Aikataulu.Arvo(n, 3) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 4) - 0.5f) * 20f;
            var kierto = Quaternion.Euler(0f, suunta, 0f);
            float x0 = -0.08f - 0.02f * Aikataulu.Arvo(n, 5);
            juuri.localPosition = new Vector3(x0, 0f, 0f) + kierto * new Vector3(0f, 0f, -0.015f + 0.003f * s);
            juuri.localRotation = kierto;

            // Kaaret: nousu ja painuminen vuorotellen, aaltoilu ja leveyden pehmeä kasvu (renkaat leviävät).
            for (int k = 0; k < Lapsia; k++)
            {
                var kaari = lapset[k];
                float e = Pehmea((s - 1f - 0.45f * k) / 1.3f) * (1f - Pehmea((s - 6.9f - 0.45f * k) / 1.3f));
                if (e < 0.002f) { kaari.localScale = Vector3.zero; continue; }
                float aalto = 1f + 0.1f * Mathf.Sin(s * 2.6f - k * 1.2f) * Pehmea((s - 2.6f) / 1.5f);
                float leveys = Pehmea(e / 0.3f) * KaariKoko[k], koko = KaariKoko[k];
                kaari.localPosition = new Vector3(KaariX[k], 0f, KaariZ[k]);
                kaari.localRotation = Quaternion.Euler(0f, KaariKierto[k], 0f);
                kaari.localScale = new Vector3(leveys, koko * KaariKorkeus * e * aalto, leveys);
            }

            // Kaula: nousu ja pieni sivuheilahdus; harvinaisessa 1,8-kertainen ja taaksepäin oikaistu kuin periskooppi.
            var kaula = lapset[Lapsia];
            float ek = Pehmea((s - 0.4f) / 1.3f) * (1f - Pehmea((s - 6.5f) / 1.2f));
            float harvinainen = harv ? Pehmea((s - 2f) / 1f) * (1f - Pehmea((s - 5.9f) / 0.9f)) : 0f;
            float korkeus = ek * (1f + 0.8f * harvinainen) * (1f + 0.04f * Mathf.Sin(s * 2.2f));
            float kaulaLeveys = Pehmea(ek / 0.3f);
            var kaulaAsento = Quaternion.Euler(0f, 6f * Mathf.Sin(s * 1.3f + 0.5f) * (1f - harvinainen), 0f) * Quaternion.Euler(-18f * harvinainen, 0f, 0f);
            var kaulaPaikka = new Vector3(0f, 0f, KaulaZ);
            kaula.localPosition = kaulaPaikka;
            kaula.localRotation = kaulaAsento;
            kaula.localScale = ek > 0.002f ? new Vector3(kaulaLeveys, korkeus, kaulaLeveys) : Vector3.zero;

            // Pää kaulan päässä: nousee kuono alaspäin ja kohottaa katseensa; keinuu, kääntyilee ja kallistuu uteliaasti.
            var paa = lapset[Lapsia + 1];
            if (ek < 0.002f) { paa.localScale = Vector3.zero; return; }
            paa.localPosition = kaulaPaikka + kaulaAsento * new Vector3(0f, (H0 + Rk) * korkeus, Rk * kaulaLeveys);
            float nyokkays = Mathf.Lerp(55f, -8f, Pehmea(ek * 1.2f)) + 4f * Mathf.Sin(s * 2.2f + 1f);
            float kaanto = 12f * Mathf.Sin(s * 1.1f + 0.3f), kallistus = 7f * Mathf.Sin(s * 0.9f + 2f);
            if (harv)
            {
                // Katselu: vasemmalle (2,4–3,2 s), pito, oikealle (4–5 s), pito ja takaisin (5,7–6,4 s); pitojen aikana kallistus.
                float vasen = Pehmea((s - 2.4f) / 0.8f), oikea = Pehmea((s - 4f) / 1f), takaisin = Pehmea((s - 5.7f) / 0.7f);
                float katse = 70f * vasen - 140f * oikea + 70f * takaisin;
                kaanto = Mathf.Lerp(kaanto, katse, harvinainen);
                kallistus = Mathf.Lerp(kallistus, 14f * (vasen - 2f * oikea + takaisin), harvinainen);
                nyokkays += 10f * harvinainen;   // kaulan 18° oikaisu kumotaan, ja kuono nousee 8° (katse ylös)
            }
            paa.localRotation = kaulaAsento * Quaternion.Euler(0f, kaanto, 0f) * Quaternion.Euler(nyokkays, 0f, kallistus);
            paa.localScale = Vector3.one * Pehmea(ek / 0.35f);
        }
    }
}
