// MEREN KORISTEIDEN LAATUTASO: MERIHIRVIÖ (Olaus Magnuksen Carta Marinan merikäärme, 1539). Speksi
// docs/raportit/meri-laatu-speksi-20260927.md (Linssiseppä 27.9.2026). Korvaa MalliRakenne-version; aikataulu, siemen 947,
// näytöksen kesto 10 s ja tauot 5–10 min ennallaan.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MERIHIRVIÖ MeriMalli-varjostimelle (harvinainen laji: rekisteri pitää Harvinainen = true). Kaiverrettu merikäärme:
    /// vaahto kuohahtaa, pää harjoineen nousee kaulan varassa, suomuvyöiset kaaret murtavat pinnan edestä taakse ja pyrstöevä
    /// nousee viimeisenä. Kaaret aaltoilevat (aalto kulkee taaksepäin), pää keinuu ja vilkaisee sivulle, pyrstö huiskii.
    /// Sukellus pää edellä, kaaret perässä ja pyrstö viimeisenä. Harvinainen (noin 1/10, ei koskaan ensimmäinen näytös): kaula
    /// kohoaa korkealle ja pää suihkuttaa vesipatsaan, jonka pisarat putoavat vaahdoksi kaulan ympärille.
    ///
    /// Rakenne (+z pää, +y ylös, meren pinta y = 0, 1 yksikkö = 245 pt):
    ///   Roottori  pyrstö omassa vesipisteessään (liioitellun perspektiivin kallistus roottorin origon ympäri pitää pyrstön ja
    ///             sen vaahdon yhdessä). Animoi asettaa roottorin paikan, kierron (uintisuunta ja pyrstön huiskaus, vain y-akseli)
    ///             ja TASAISEN skaalan 0,02–1,2 (pyrstö nousee ja painuu); lasten paikat, kierrot ja skaalat kompensoidaan
    ///             (lapsi = R⁻¹(p − c)/s), joten lapset pysyvät omissa vesipisteissään. Integraattori ei saa asettaa roottorin
    ///             skaalaa.
    ///   Lapsi     (4) kaari: suomuvyöinen putki (tumma selkä harjanteineen ja piikkeineen, vaalea vatsa), vesikerros ensin:
    ///             varjo, vedenalainen jatke molemmista jaloista ja vaahtorenkaat. Nousu, aaltoilu ja painuminen y-skaalalla.
    ///   Lapsi2    (1) kaula ja pää yhtenä kappaleena (origo kaulan vesipisteessä, pää sen yläpuolella, joten kallistus ei
    ///             irrota niitä): harja, avoin kita hampaineen, kieli (ainoa korostus), silmät, sarvet ja poskievät;
    ///             vesikerros: varjo, vaahtorengas keulakuohuineen, väreilyrengas ja Kelvinin vana. Animoi kääntää sitä vain
    ///             y-akselin ympäri (nyökkäys enintään ±3,5°, jotta vesikerros pysyy pinnassa), nousu ja kohoaminen y-skaalalla.
    ///   Lapsi3    (10) vesipallo (säde 0,0075, ilman ääriviivaa): pinnan murtumisen ja sukelluksen roiskeet, kidasta tippuvat
    ///             pisarat ja harvinaisen suihkun pisarat (pinnassa litistettyinä vaahtorenkaina).
    /// Värit vain rampista (Rampi, kärjen alfa 0), kieli korostuksena (Punainen, alfa 1; 1,3 % kaulan ja pään kiinteästä
    /// pinta-alasta) ja vesikerroksen Vaahto/VarjoVari. Kolmiot: LOD0 2 708 (pyrstö 240 + kaari 348 × 4 + kaula ja pää 756 +
    /// pallo 32 × 10), kaukotaso 100 (yhteensä 2 568). Animoi ei allokoi.
    /// </summary>
    public static class MeriHirvio
    {
        public const string Nimi = "merihirvio";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri", "itameri", "jaameri" };
        public const float KokoPt = 245f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(947, 10f, 10f, 300f, 600f);
        public const int Lapsia = 4, Lapsia2 = 1, Lapsia3 = 10;

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        /// <summary>Nopea alku, pehmeä loppu (nousu pinnasta: litistynyt vaihe lyhyt).</summary>
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y * y; }
        /// <summary>Pehmeä alku, nopea loppu (sukellus).</summary>
        static float Sisaan(float x) { x = Mathf.Clamp01(x); return x * x * x; }
        static Color Vaahto(float a) => MeriRakentaja.Alfa(MeriRakentaja.Vaahto, a);
        static Color Varjo(float a) => MeriRakentaja.Alfa(MeriRakentaja.VarjoVari, a);

        /// <summary>Ääriviivan leveys mallin yksiköissä (1,2 pt): vaahto alkaa sen ulkopuolelta, jottei se haalista mustetta.</summary>
        const float Reuna = 1.2f / KokoPt;
        // Vesikerrosten korkeudet (myöhempi kerros ylempänä, jotta syvyystesti päästää sen läpi).
        const float YVarjo = 0.0003f, YKieli = 0.0008f, YVana = 0.0013f, YVaahto = 0.0019f;

        // =====================================================================================================================
        // Yhteiset rakentajat
        // =====================================================================================================================

        /// <summary>
        /// Putki keskiviivan c renkaiden kautta: renkaan i kärki j (kulma θ = 2πj/sivut, 0 = selkä) = c + sx·w·sin θ + dn·h·cos θ,
        /// h = hd selän ja hv vatsan puolella, selkäkärjessä lisäksi harjanne k. Jokainen rengasväli on oma osansa, joten
        /// ääriviiva seuraa kaarta myös sivulta katsottuna. Kärjet y &lt; minY nostetaan pintaan (vedenraja). Palauttaa kärjet.
        /// </summary>
        static Vector3[,] Putki(MeriRakentaja r, Vector3[] c, Vector3[] sx, Vector3[] dn, float[] w, float[] hd, float[] hv,
            float[] k, int sivut, System.Func<int, int, Color> vari, float minY = -1f)
        {
            int n = c.Length;
            var p = new Vector3[n, sivut];
            for (int i = 0; i < n; i++)
                for (int j = 0; j < sivut; j++)
                {
                    float th = j * 2f * Mathf.PI / sivut, cs = Mathf.Cos(th), sn = Mathf.Sin(th);
                    float h = cs >= 0f ? hd[i] : hv[i];
                    var v = c[i] + sx[i] * (w[i] * sn) + dn[i] * (h * cs + (j == 0 ? k[i] : 0f));
                    if (v.y < minY) v.y = minY;
                    p[i, j] = v;
                }
            for (int i = 0; i < n - 1; i++)
            {
                r.AloitaOsa();
                var keski = (c[i] + c[i + 1]) * 0.5f;
                for (int j = 0; j < sivut; j++)
                {
                    int j1 = (j + 1) % sivut;
                    var ulos = (p[i, j] + p[i, j1] + p[i + 1, j] + p[i + 1, j1]) * 0.25f - keski;
                    r.NelioUlos(p[i, j], p[i + 1, j], p[i + 1, j1], p[i, j1], ulos, vari(i, j));
                }
                r.LopetaOsa();
            }
            // Nivelten täytteet: rengasvälien omat ääriviivat laajenevat eri suuntiin, joten kaaren sisäkaarteeseen jäisi
            // raot; renkaan sisällä piilossa oleva vinoneliö (oma osa) täyttää ne.
            for (int i = 1; i < n - 1; i++)
            {
                Vector3 a = Lahemmas(p[i, 0], c[i]), b = Lahemmas(p[i, sivut / 4], c[i]), d = Lahemmas(p[i, sivut / 2], c[i]), e = Lahemmas(p[i, 3 * sivut / 4], c[i]);
                var ulos = Vector3.Cross(b - a, d - a);
                r.AloitaOsa(); r.KolmioUlos(a, b, d, ulos, vari(i, 0)); r.KolmioUlos(a, d, e, ulos, vari(i, 0)); r.LopetaOsa();
            }
            return p;
        }

        static Vector3 Lahemmas(Vector3 v, Vector3 keski) => keski + (v - keski) * 0.9f;

        /// <summary>Kansi renkaan i kärjistä kärkeen: viuhka, etupuoli suuntaan kärki − renkaan keskipiste.</summary>
        static void Kansi(MeriRakentaja r, Vector3[,] p, int i, Vector3 karki, System.Func<int, Color> vari)
        {
            int sivut = p.GetLength(1);
            var keski = Vector3.zero;
            for (int j = 0; j < sivut; j++) keski += p[i, j];
            keski /= sivut;
            r.AloitaOsa();
            for (int j = 0; j < sivut; j++)
            {
                int j1 = (j + 1) % sivut;
                var ulos = (p[i, j] + p[i, j1]) * 0.5f - keski + (karki - keski) * 1.5f;
                r.KolmioUlos(p[i, j], p[i, j1], karki, ulos, vari(j));
            }
            r.LopetaOsa();
        }

        /// <summary>Vedenalainen jatke (vesikerros, muste): jalasta suuntaan ±z kapeneva ja häipyvä kieli pehmein reunoin.</summary>
        static void Kieli(MeriRakentaja r, Vector3 alku, Vector3 suunta, float pituus, float leveys, float alfa)
        {
            suunta.y = 0f; suunta = suunta.normalized;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized;
            const int jaot = 3;
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 c0 = alku + suunta * (pituus * q0), c1 = alku + suunta * (pituus * q1);
                float w0 = leveys * (1f - 0.75f * q0), w1 = leveys * (1f - 0.75f * q1);
                Color k0 = Varjo(alfa * (1f - q0)), k1 = Varjo(alfa * (1f - q1)), e = Varjo(0f);
                r.NelioVarit(c0 - sivu * (w0 * 0.45f), c0 + sivu * (w0 * 0.45f), c1 + sivu * (w1 * 0.45f), c1 - sivu * (w1 * 0.45f), k0, k0, k1, k1);
                r.NelioVarit(c0 + sivu * (w0 * 0.45f), c0 + sivu * w0, c1 + sivu * w1, c1 + sivu * (w1 * 0.45f), k0, e, e, k1);
                r.NelioVarit(c0 - sivu * w0, c0 - sivu * (w0 * 0.45f), c1 - sivu * (w1 * 0.45f), c1 - sivu * w1, e, k0, k1, e);
            }
        }

        /// <summary>
        /// Vaahtorengas (vesikerros): säteet sade[] ja alfat alfa[] keskeltä ulos; rengas pullistuu suuntaan eteen kertoimella
        /// pullistus (keulakuohu tai jättö) ja on hieman epäsäännöllinen (vaihe).
        /// </summary>
        static void Vaahtorengas(MeriRakentaja r, Vector3 keski, float[] sade, float[] alfa, int sektoreita, Vector3 eteen,
            float pullistus, float vaihe)
        {
            for (int i = 0; i < sektoreita; i++)
            {
                float k0 = i * Mathf.PI * 2f / sektoreita, k1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                for (int j = 0; j < sade.Length - 1; j++)
                {
                    Vector3 a0 = RengasPiste(keski, k0, sade[j], j, eteen, pullistus, vaihe), a1 = RengasPiste(keski, k1, sade[j], j, eteen, pullistus, vaihe);
                    Vector3 b0 = RengasPiste(keski, k0, sade[j + 1], j + 1, eteen, pullistus, vaihe), b1 = RengasPiste(keski, k1, sade[j + 1], j + 1, eteen, pullistus, vaihe);
                    r.NelioVarit(a0, a1, b1, b0, Vaahto(alfa[j]), Vaahto(alfa[j]), Vaahto(alfa[j + 1]), Vaahto(alfa[j + 1]));
                }
            }
        }

        static Vector3 RengasPiste(Vector3 keski, float k, float sade, int taso, Vector3 eteen, float pullistus, float vaihe)
        {
            var d = new Vector3(Mathf.Cos(k), 0f, Mathf.Sin(k));
            float etu = Mathf.Max(0f, Vector3.Dot(d, eteen));
            float m = 1f + (taso > 0 ? pullistus * etu * etu : 0f) + (taso > 0 ? 0.09f * Mathf.Sin(3f * k + vaihe) + 0.05f * Mathf.Sin(5f * k + 2f * vaihe) : 0f);
            return keski + d * (sade * m);
        }

        // =====================================================================================================================
        // Lapsi: kaari
        // =====================================================================================================================

        /// <summary>Kaari koossa 1: jalat z = ±KaariR vedenpinnassa, keskiviivan laki KaariH (puoliellipsi), putken
        /// puolileveys KaariW ja -korkeus KaariD, selän harjanne KaariHarja.</summary>
        const float KaariR = 0.0225f, KaariH = 0.040f, KaariW = 0.0086f, KaariD = 0.0092f, KaariHarja = 0.0016f;
        const int KaariJaot = 12;

        static Vector3 KaariC(float f) => new Vector3(0f, KaariH * Mathf.Sin(f), -KaariR * Mathf.Cos(f));
        static Vector3 KaariT(float f) => new Vector3(0f, KaariH * Mathf.Cos(f), KaariR * Mathf.Sin(f)).normalized;
        static Vector3 KaariN(float f) { var t = KaariT(f); return new Vector3(0f, t.z, -t.y); }

        /// <summary>Suomuvyöt: vierekkäiset renkaat vuorottelevat tummempana ja vaaleampana (kaiverruksen raidat); selkä tumma,
        /// kyljet siirtyvät vaaleaan vatsaan.</summary>
        static float Suomu(int i, int j)
        {
            bool b = (i & 1) == 0;
            switch (j)
            {
                case 0: case 7: return b ? 0.26f : 0.7f;
                case 1: case 6: return b ? 0.5f : 0.95f;
                case 2: case 5: return b ? 1.0f : 1.28f;
                default: return b ? 1.48f : 1.72f;
            }
        }

        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            // Vesikerros ensin: varjo, vedenalaiset jatkeet ja vaahtorenkaat (keulakuohu etujalassa, jättö takajalassa).
            r.Vesi = true;
            r.Soikio(new Vector3(0f, YVarjo, 0f), 0.014f, KaariR + 0.014f, MeriRakentaja.VarjoVari, 0.13f, 0f, 12);
            Kieli(r, new Vector3(0f, YKieli, -KaariR), Vector3.back, 0.017f, KaariW * 1.5f, 0.3f);
            Kieli(r, new Vector3(0f, YKieli, KaariR), Vector3.forward, 0.017f, KaariW * 1.5f, 0.3f);
            float s0 = KaariD + KaariHarja + Reuna + 0.0004f;
            float[] sade = { s0, s0 + 0.003f, s0 + 0.0085f }, alfa = { 0.62f, 0.4f, 0f };
            Vaahtorengas(r, new Vector3(0f, YVaahto, KaariR), sade, alfa, 10, Vector3.forward, 0.9f, 0.4f);
            Vaahtorengas(r, new Vector3(0f, YVaahto, -KaariR), sade, alfa, 10, Vector3.back, 0.5f, 2.1f);
            r.Vesi = false;

            int n = KaariJaot + 1;
            var c = new Vector3[n]; var sx = new Vector3[n]; var dn = new Vector3[n];
            var w = new float[n]; var hd = new float[n]; var hv = new float[n]; var k = new float[n];
            for (int i = 0; i < n; i++)
            {
                float f = Mathf.PI * i / KaariJaot;
                c[i] = KaariC(f); sx[i] = Vector3.right; dn[i] = KaariN(f);
                w[i] = KaariW; hd[i] = KaariD; hv[i] = KaariD * 0.9f; k[i] = KaariHarja;
            }
            Putki(r, c, sx, dn, w, hd, hv, k, 8, (i, j) => R(Suomu(i, j)), 0f);

            // Selkäpiikit (ei ääriviivaa: osa alle kynnyksen): kolme taaksepäin kallistuvaa piikkiä kaaren laella.
            foreach (float fs in new[] { 0.33f, 0.5f, 0.67f })
            {
                float f = Mathf.PI * fs;
                Vector3 a = KaariC(f - 0.16f) + KaariN(f - 0.16f) * (KaariD + KaariHarja * 0.6f);
                Vector3 b = KaariC(f + 0.12f) + KaariN(f + 0.12f) * (KaariD + KaariHarja * 0.6f);
                Vector3 karki = KaariC(f - 0.05f) + KaariN(f) * (KaariD + KaariHarja + 0.0062f) - KaariT(f) * 0.0035f;
                r.KalvoKolmio(a, b, karki, R(0.2f));
            }
            return r.Verkko("merihirviö: kaari");
        }

        // =====================================================================================================================
        // Lapsi2: kaula ja pää
        // =====================================================================================================================

        const float KaulaH = 0.074f;
        const int KaulaJaot = 12;
        static Vector3 KaulaC(float u) => new Vector3(0f, KaulaH * u, -0.014f * u + 0.018f * u * u * u);
        static Vector3 KaulaT(float u) => new Vector3(0f, KaulaH, -0.014f + 0.054f * u * u).normalized;
        static Vector3 KaulaN(float u) { var t = KaulaT(u); return new Vector3(0f, t.z, -t.y); }
        static float KaulaW(float u) => Mathf.Lerp(0.0094f, 0.0066f, u);

        // Pää kaulan avaruudessa: origo PaaJ (kaulan yläpää), kallistus (negatiivinen = kuono ylös) ja koko.
        static readonly Vector3 PaaJ = new Vector3(0f, KaulaH + 0.0012f, 0.0056f);
        const float PaaKallistus = -14f, PaaKoko = 1.4f;
        static Vector3 Paa(Vector3 v) => PaaJ + Quaternion.Euler(PaaKallistus, 0f, 0f) * (v * PaaKoko);
        static Vector3 PaaS(Vector3 v) => Quaternion.Euler(PaaKallistus, 0f, 0f) * v;

        // Pään asemat (pään avaruus: +z kuonoon, y ylös): puolileveys, yläosan ja alaosan korkeus ja keskikohdan y.
        static readonly float[] PaaZ = { -0.0075f, -0.0025f, 0.0055f, 0.0130f, 0.0210f, 0.0285f, 0.0335f };
        static readonly float[] PaaW = { 0.0052f, 0.0074f, 0.0080f, 0.0066f, 0.0055f, 0.0045f, 0.0031f };
        static readonly float[] PaaYla = { 0.0046f, 0.0072f, 0.0084f, 0.0064f, 0.0050f, 0.0040f, 0.0027f };
        static readonly float[] PaaAla = { 0.0040f, 0.0056f, 0.0050f, 0.0036f, 0.0028f, 0.0022f, 0.0016f };
        static readonly float[] PaaY = { 0.0002f, 0.0006f, 0.0008f, 0.0000f, -0.0006f, -0.0010f, -0.0011f };
        // Alaleuka (ennen avausta): asemat; sarana ja avauskulma.
        static readonly float[] LeukaZ = { -0.0010f, 0.0080f, 0.0170f, 0.0250f };
        static readonly float[] LeukaW = { 0.0060f, 0.0055f, 0.0046f, 0.0034f };
        static readonly float[] LeukaYla = { 0.0012f, 0.0011f, 0.0010f, 0.0008f };
        static readonly float[] LeukaAla = { 0.0028f, 0.0025f, 0.0021f, 0.0016f };
        static readonly float[] LeukaY = { -0.0048f, -0.0052f, -0.0050f, -0.0046f };
        static readonly Vector3 Sarana = new Vector3(0f, -0.0040f, -0.0010f);
        const float LeukaAuki = 33f;
        static Vector3 Leuka(Vector3 v) => Sarana + Quaternion.Euler(LeukaAuki, 0f, 0f) * (v - Sarana);

        /// <summary>Pään päälaki (suihkun lähtö) ja alaleuan kärki (pisarat) kaulan avaruudessa.</summary>
        static readonly Vector3 Paalaki = Paa(new Vector3(0f, 0.0095f, 0.004f));
        static readonly Vector3 LeuanKarki = Paa(Leuka(new Vector3(0f, -0.0062f, 0.026f)));

        static float KaulaSuomu(int i, int j)
        {
            bool b = (i & 1) == 0;
            switch (j)
            {
                case 0: case 7: return b ? 0.30f : 0.56f;
                case 1: case 6: return b ? 0.5f : 0.8f;
                case 2: case 5: return b ? 1.05f : 1.25f;
                default: return b ? 1.5f : 1.72f;
            }
        }

        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja();
            // Vesikerros: varjo, vedenalainen jatke taaksepäin, vana, vaahtorengas keulakuohuineen ja väreilyrengas.
            r.Vesi = true;
            r.Soikio(new Vector3(0f, YVarjo, -0.003f), 0.018f, 0.022f, MeriRakentaja.VarjoVari, 0.14f, 0f, 14);
            Kieli(r, new Vector3(0f, YKieli, -0.004f), Vector3.back, 0.02f, 0.013f, 0.3f);
            foreach (float puoli in new[] { -1f, 1f })
            {
                // Kelvinin kiila ±19,5° kaulan tyveltä: vaalea kapea nauha, joka levenee ja häipyy.
                var alku = new Vector3(puoli * 0.011f, YVana, -0.004f);
                var suunta = new Vector3(puoli * Mathf.Sin(19.5f * Mathf.Deg2Rad), 0f, -Mathf.Cos(19.5f * Mathf.Deg2Rad));
                Vana(r, alku, suunta, 0.068f, 0.003f, 0.0085f, 0.45f);
            }
            float s0 = KaulaW(0f) * 1.05f + 0.0012f + Reuna + 0.0004f;
            Vaahtorengas(r, new Vector3(0f, YVaahto, 0f), new[] { s0, s0 + 0.0035f, s0 + 0.0095f }, new[] { 0.66f, 0.45f, 0f }, 14, Vector3.forward, 0.8f, 1.3f);
            Vaahtorengas(r, new Vector3(0f, YVaahto - 0.0002f, 0f), new[] { s0 + 0.012f, s0 + 0.0145f, s0 + 0.0175f }, new[] { 0f, 0.3f, 0f }, 20, Vector3.forward, 0.5f, 2.2f);
            r.Vesi = false;

            // Kaula: suomuvyöinen putki, tyvi hieman taaksepäin ja yläpää eteen (joutsenen S), selkä tumma, kurkku vaalea.
            int n = KaulaJaot + 1;
            var c = new Vector3[n]; var sx = new Vector3[n]; var dn = new Vector3[n];
            var w = new float[n]; var hd = new float[n]; var hv = new float[n]; var k = new float[n];
            for (int i = 0; i < n; i++)
            {
                float u = i / (float)KaulaJaot * 1.04f;
                c[i] = KaulaC(u); sx[i] = Vector3.right; dn[i] = KaulaN(u);
                w[i] = KaulaW(u); hd[i] = KaulaW(u) * 1.05f; hv[i] = KaulaW(u) * 0.95f; k[i] = 0.0012f;
            }
            Putki(r, c, sx, dn, w, hd, hv, k, 8, (i, j) => R(KaulaSuomu(i, j)), 0f);

            // Harja: sahalaita kaulan selässä, piikit vuorotellen tummina ja vaaleina, pisimmät pään takana.
            for (int i = 4; i < KaulaJaot; i++)
            {
                float u0 = i / (float)KaulaJaot, u1 = (i + 1) / (float)KaulaJaot, um = (u0 + u1) * 0.5f;
                var a = KaulaC(u0) + KaulaN(u0) * (KaulaW(u0) * 1.05f + 0.0008f);
                var b = KaulaC(u1) + KaulaN(u1) * (KaulaW(u1) * 1.05f + 0.0008f);
                float l = Mathf.Lerp(0.0065f, 0.0125f, (u0 - 0.33f) / 0.67f);
                var suunta = Quaternion.AngleAxis((i & 1) == 0 ? 32f : -32f, KaulaT(um)) * KaulaN(um);
                var karki = KaulaC(um) + KaulaN(um) * KaulaW(um) + suunta * l - KaulaT(um) * (l * 0.55f);
                r.KalvoKolmio(a, b, karki, R(((i >> 1) & 1) == 0 ? 0.22f : 1.95f));
            }

            Paa(r);
            return r.Verkko("merihirviö: kaula ja pää");
        }

        static Color PaaVari(int i, int j)
        {
            bool b = (i & 1) == 0;
            switch (j)
            {
                case 0: case 7: return R(b ? 0.52f : 0.78f);
                case 1: case 6: return R(b ? 0.8f : 1.0f);
                case 2: case 5: return R(1.2f);
                default: return i >= 2 ? R(0.12f) : R(1.45f);   // kitalaki suun sisällä, leuan alus takana
            }
        }

        static Color LeukaVari(int i, int j)
        {
            switch (j)
            {
                case 0: case 7: return R(0.16f);       // suun pohja
                case 1: case 6: return R(0.3f);
                case 2: case 5: return R(1.25f);
                default: return R(1.6f);               // leuan alus
            }
        }

        /// <summary>Pää kaulan avaruuteen: kallo ja yläleuka, alaleuka avoimena, suun pohja, kieli, torahampaat, silmät,
        /// sarvet, päälaen harja ja poskievät.</summary>
        static void Paa(MeriRakentaja r)
        {
            var sx = PaaS(Vector3.right); var yl = PaaS(Vector3.up);
            // Kallo ja yläleuka.
            int n = PaaZ.Length;
            var c = new Vector3[n]; var sxa = new Vector3[n]; var dn = new Vector3[n];
            var w = new float[n]; var hd = new float[n]; var hv = new float[n]; var k = new float[n];
            for (int i = 0; i < n; i++)
            {
                c[i] = Paa(new Vector3(0f, PaaY[i], PaaZ[i])); sxa[i] = sx; dn[i] = yl;
                w[i] = PaaW[i] * PaaKoko; hd[i] = PaaYla[i] * PaaKoko; hv[i] = PaaAla[i] * PaaKoko; k[i] = 0.0006f * PaaKoko;
            }
            var p = Putki(r, c, sxa, dn, w, hd, hv, k, 8, PaaVari);
            Kansi(r, p, n - 1, Paa(new Vector3(0f, -0.0008f, 0.0368f)), j => R(j == 0 || j == 7 ? 0.5f : j == 3 || j == 4 ? 0.12f : 1.0f));
            Kansi(r, p, 0, Paa(new Vector3(0f, 0.0004f, -0.0098f)), j => R(0.45f));

            // Alaleuka avattuna saranan ympäri.
            int m = LeukaZ.Length;
            var lc = new Vector3[m]; var lsx = new Vector3[m]; var ldn = new Vector3[m];
            var lw = new float[m]; var lhd = new float[m]; var lhv = new float[m]; var lk = new float[m];
            var leukaYlos = PaaS(Quaternion.Euler(LeukaAuki, 0f, 0f) * Vector3.up);
            for (int i = 0; i < m; i++)
            {
                lc[i] = Paa(Leuka(new Vector3(0f, LeukaY[i], LeukaZ[i]))); lsx[i] = sx; ldn[i] = leukaYlos;
                lw[i] = LeukaW[i] * PaaKoko; lhd[i] = LeukaYla[i] * PaaKoko; lhv[i] = LeukaAla[i] * PaaKoko; lk[i] = 0f;
            }
            var lp = Putki(r, lc, lsx, ldn, lw, lhd, lhv, lk, 8, LeukaVari);
            Kansi(r, lp, m - 1, Paa(Leuka(new Vector3(0f, -0.0048f, 0.0285f))), j => R(j == 0 || j == 7 ? 0.16f : 1.4f));

            // Nielu: tumma väliseinä suun perällä, jottei avoimesta kidasta näy läpi.
            {
                var y0 = Paa(new Vector3(-0.0048f, -0.0035f, 0.001f)); var y1 = Paa(new Vector3(0.0048f, -0.0035f, 0.001f));
                var a0 = Paa(Leuka(new Vector3(-0.0048f, -0.0036f, 0.001f))); var a1 = Paa(Leuka(new Vector3(0.0048f, -0.0036f, 0.001f)));
                r.AloitaOsa(); r.NelioUlos(y0, y1, a1, a0, PaaS(Vector3.forward), R(0.08f)); r.LopetaOsa();
            }

            // Kieli (korostus): haarautuva, suun pohjalla ja hieman kidan ulkopuolelle.
            {
                Vector3 L(float x, float z) => Paa(Leuka(new Vector3(x, -0.0034f, z)));
                var kc = MeriRakentaja.Punainen;
                r.KalvoKolmio(L(-0.0013f, 0.004f), L(0.0013f, 0.004f), L(0f, 0.022f), kc);
                r.KalvoKolmio(L(-0.0009f, 0.018f), L(0.0001f, 0.021f), L(-0.0022f, 0.0305f), kc);
                r.KalvoKolmio(L(-0.0001f, 0.021f), L(0.0009f, 0.018f), L(0.0022f, 0.0305f), kc);
            }

            // Hampaat (paperi, ei ääriviivaa): yläleuan huulesta alas (keskimmäinen torahammas pisin) ja alaleuasta ylös, joten
            // avoin kita erottuu vaaleana sahalaitana tumman pään ja vaalean alaleuan välissä.
            foreach (float puoli in new[] { -1f, 1f })
            {
                float[] hzz = { 0.0115f, 0.0185f, 0.0255f }, hp = { 0.0024f, 0.0046f, 0.0022f };
                for (int q = 0; q < hzz.Length; q++)
                {
                    float z = hzz[q], ww = PaaArvo(PaaW, z), y = PaaArvo(PaaY, z) - PaaArvo(PaaAla, z) * 0.72f, x = puoli * ww * 0.66f;
                    r.KalvoKolmio(Paa(new Vector3(x, y + 0.0004f, z - 0.0013f)), Paa(new Vector3(x, y + 0.0004f, z + 0.0011f)),
                        Paa(new Vector3(x, y - hp[q], z + 0.0003f)), R(1.95f));
                }
                float[] az = { 0.0085f, 0.0165f, 0.0225f };
                for (int q = 0; q < az.Length; q++)
                {
                    float z = az[q], ii = Mathf.Clamp(z / 0.009f, 0f, 2.99f);
                    int i0 = (int)ii; float f = ii - i0;
                    float ww = Mathf.Lerp(LeukaW[i0], LeukaW[i0 + 1], f), y = Mathf.Lerp(LeukaY[i0], LeukaY[i0 + 1], f) + Mathf.Lerp(LeukaYla[i0], LeukaYla[i0 + 1], f) * 0.7f;
                    float x = puoli * ww * 0.64f;
                    r.KalvoKolmio(Paa(Leuka(new Vector3(x, y - 0.0004f, z - 0.0011f))), Paa(Leuka(new Vector3(x, y - 0.0004f, z + 0.0011f))),
                        Paa(Leuka(new Vector3(x, y + 0.0024f, z - 0.0002f))), R(1.95f));
                }
            }

            // Silmät: paperinvaalea kupu kulmakaaren alla ja musteinen pupilli eteenpäin.
            foreach (float puoli in new[] { -1f, 1f })
            {
                var e = Paa(new Vector3(puoli * 0.0068f, 0.0042f, 0.0062f));
                var ulos = PaaS(new Vector3(puoli * 0.85f, 0.45f, 0.2f)).normalized;
                var t1 = PaaS(Vector3.forward); var t2 = Vector3.Cross(ulos, t1).normalized; t1 = Vector3.Cross(t2, ulos).normalized;
                const float es = 0.0024f;
                var huippu = e + ulos * (es * 0.75f);
                r.AloitaOsa();
                for (int q = 0; q < 5; q++)
                {
                    float a0 = q * Mathf.PI * 2f / 5f, a1 = (q + 1) * Mathf.PI * 2f / 5f;
                    var b0 = e + (t1 * Mathf.Cos(a0) + t2 * Mathf.Sin(a0)) * es; var b1 = e + (t1 * Mathf.Cos(a1) + t2 * Mathf.Sin(a1)) * es;
                    r.KolmioUlos(b0, b1, huippu, ulos, R(1.9f));
                }
                r.LopetaOsa();
                var pk = huippu + t1 * 0.0006f + ulos * 0.0002f;
                r.AloitaOsa();
                r.KolmioUlos(pk + t1 * 0.0009f, pk + t2 * 0.0007f, pk - t2 * 0.0007f, ulos, R(0.02f));
                r.KolmioUlos(pk - t1 * 0.0006f, pk - t2 * 0.0007f, pk + t2 * 0.0007f, ulos, R(0.02f));
                r.LopetaOsa();
            }

            // Sarvet (luunvaaleat), taaksepäin kaartuvat kahdessa osassa (osa alle ääriviivan kynnyksen).
            foreach (float puoli in new[] { -1f, 1f })
            {
                var a = Paa(new Vector3(puoli * 0.003f, 0.0062f, 0.0f));
                var b = Paa(new Vector3(puoli * 0.0062f, 0.0098f, -0.0075f));
                var d = Paa(new Vector3(puoli * 0.0085f, 0.0118f, -0.0155f));
                r.Tanko(a, b, 0.0014f, 0.0009f, 4, R(1.6f));
                r.Tanko(b, d, 0.0009f, 0.0002f, 4, R(1.6f));
            }

            // Päälaen harja: sahalaita kulmakaarelta niskaan (jatkuu kaulan harjaksi).
            float[] hz = { 0.0105f, 0.0055f, 0.0005f, -0.0045f };
            for (int i = 0; i < hz.Length - 1; i++)
            {
                var a = Paa(new Vector3(0f, PaaHuippu(hz[i]) - 0.0005f, hz[i]));
                var b = Paa(new Vector3(0f, PaaHuippu(hz[i + 1]) - 0.0005f, hz[i + 1]));
                var karki = Paa(new Vector3(0f, PaaHuippu(hz[i]) + 0.0058f + 0.0012f * i, (hz[i] + hz[i + 1]) * 0.5f - 0.0042f));
                r.KalvoKolmio(a, b, karki, R((i & 1) == 0 ? 1.6f : 0.22f));
            }

            // Poskievät saranan takana: kolmipiikkinen viuhka (kalvo vaalea, piikit musteena), joka kehystää pään.
            foreach (float puoli in new[] { -1f, 1f })
            {
                var tyvi = Paa(new Vector3(puoli * 0.0066f, -0.0010f, -0.0030f));
                var y1 = Paa(new Vector3(puoli * 0.0112f, 0.0052f, -0.0118f));
                var y2 = Paa(new Vector3(puoli * 0.0135f, 0.0002f, -0.0150f));
                var y3 = Paa(new Vector3(puoli * 0.0116f, -0.0058f, -0.0112f));
                r.AloitaOsa();
                r.KalvoKolmio(tyvi, y1, y2, R(1.6f));
                r.KalvoKolmio(tyvi, y2, y3, R(1.35f));
                r.LopetaOsa();
                var sivu = PaaS(new Vector3(puoli * 0.0003f, 0f, 0f));
                foreach (var karki in new[] { y1, y2, y3 })
                {
                    var d = (karki - tyvi).normalized; var lev = Vector3.Cross(d, PaaS(Vector3.right)).normalized * 0.0006f;
                    r.KalvoKolmio(tyvi + sivu + lev, tyvi + sivu - lev, karki + sivu, R(0.15f));
                }
            }
        }

        static float PaaArvo(float[] arvot, float z)
        {
            if (z <= PaaZ[0]) return arvot[0];
            for (int i = 1; i < PaaZ.Length; i++)
                if (z <= PaaZ[i]) return Mathf.Lerp(arvot[i - 1], arvot[i], (z - PaaZ[i - 1]) / (PaaZ[i] - PaaZ[i - 1]));
            return arvot[arvot.Length - 1];
        }

        /// <summary>Pään yläpinnan korkeus pään avaruudessa kohdassa z (asemien välillä lineaarisesti).</summary>
        static float PaaHuippu(float z)
        {
            if (z <= PaaZ[0]) return PaaY[0] + PaaYla[0];
            for (int i = 1; i < PaaZ.Length; i++)
                if (z <= PaaZ[i])
                {
                    float q = (z - PaaZ[i - 1]) / (PaaZ[i] - PaaZ[i - 1]);
                    return Mathf.Lerp(PaaY[i - 1] + PaaYla[i - 1], PaaY[i] + PaaYla[i], q);
                }
            return PaaY[PaaY.Length - 1] + PaaYla[PaaYla.Length - 1];
        }

        /// <summary>Vana (vesikerros): vaalea nauha, joka levenee l0 → l1 ja häipyy alfa → 0; pehmeät reunat.</summary>
        static void Vana(MeriRakentaja r, Vector3 alku, Vector3 suunta, float pituus, float l0, float l1, float alfa)
        {
            suunta = suunta.normalized;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized;
            const int jaot = 4;
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 c0 = alku + suunta * (pituus * q0), c1 = alku + suunta * (pituus * q1);
                float w0 = Mathf.Lerp(l0, l1, q0) * 0.5f, w1 = Mathf.Lerp(l0, l1, q1) * 0.5f;
                float a0 = alfa * (1f - q0) * (1f - q0), a1 = alfa * (1f - q1) * (1f - q1);
                Color k0 = Vaahto(a0), k1 = Vaahto(a1), e = Vaahto(0f);
                r.NelioVarit(c0 - sivu * (w0 * 0.4f), c0 + sivu * (w0 * 0.4f), c1 + sivu * (w1 * 0.4f), c1 - sivu * (w1 * 0.4f), k0, k0, k1, k1);
                r.NelioVarit(c0 + sivu * (w0 * 0.4f), c0 + sivu * w0, c1 + sivu * w1, c1 + sivu * (w1 * 0.4f), k0, e, e, k1);
                r.NelioVarit(c0 - sivu * w0, c0 - sivu * (w0 * 0.4f), c1 - sivu * (w1 * 0.4f), c1 - sivu * w1, e, k0, k1, e);
            }
        }

        // =====================================================================================================================
        // Lapsi3: vesipallo
        // =====================================================================================================================

        const float PalloR = 0.0075f;

        /// <summary>Vesipallo: paperinvaalea (ramppi 1,95) ilman ääriviivaa, pehmeä vaalea vaahto (Fable 27.9.2026 klo 18.3x:
        /// pintaan litistetyt pallot näkyivät lähikuvassa paksuina mustina renkaina).</summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja(1f);
            r.Pallo(Vector3.zero, PalloR, R(1.95f), 1);
            return r.Verkko("merihirviö: vesipallo");
        }

        // =====================================================================================================================
        // Roottori: pyrstö
        // =====================================================================================================================

        public static Mesh Roottori() => Pyrsto(false);
        public static Mesh RoottoriKauko() => Pyrsto(true);

        static Vector3 PyrstoC(float u) => new Vector3(0f, 0.026f * Mathf.Sin(1.35f * u) / Mathf.Sin(1.35f), -0.020f * u - 0.006f * u * u);
        static Vector3 PyrstoT(float u) => new Vector3(0f, 0.026f * 1.35f * Mathf.Cos(1.35f * u) / Mathf.Sin(1.35f), -0.020f - 0.012f * u).normalized;

        /// <summary>
        /// Pyrstö (roottori, origo vesipisteessä, +z kohti päätä): ruumiin loppu nousee vedestä taaksepäin, kapenee ja päättyy
        /// haarukkaiseen pyrstöevään (piikit musteena, kalvo vaaleana; lohkot kiertyvät ±34° V:ksi, joten evä ei ole koskaan
        /// täysin syrjittäin).
        /// Vesikerros: varjo, vedenalainen jatke kohti viimeistä kaarta ja vaahtorengas. Kaukotaso harvemmin jaoin.
        /// </summary>
        static Mesh Pyrsto(bool kauko)
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            r.Soikio(new Vector3(0f, YVarjo, -0.012f), 0.012f, 0.022f, MeriRakentaja.VarjoVari, 0.12f, 0f, kauko ? 8 : 12);
            if (!kauko) Kieli(r, new Vector3(0f, YKieli, 0.002f), Vector3.forward, 0.016f, 0.011f, 0.28f);
            float s0 = 0.0068f + Reuna;
            Vaahtorengas(r, new Vector3(0f, YVaahto, 0f), kauko ? new[] { s0, s0 + 0.0075f } : new[] { s0, s0 + 0.0035f, s0 + 0.008f },
                kauko ? new[] { 0.45f, 0f } : new[] { 0.5f, 0.34f, 0f }, kauko ? 8 : 10, Vector3.back, 0.6f, 0.9f);
            r.Vesi = false;

            int jaot = kauko ? 5 : 8, sivut = kauko ? 6 : 8;
            int n = jaot + 1;
            var c = new Vector3[n]; var sx = new Vector3[n]; var dn = new Vector3[n];
            var w = new float[n]; var hd = new float[n]; var hv = new float[n]; var k = new float[n];
            for (int i = 0; i < n; i++)
            {
                float u = i / (float)jaot;
                var t = PyrstoT(u);
                c[i] = PyrstoC(u); sx[i] = Vector3.right; dn[i] = new Vector3(0f, -t.z, t.y);
                // dn: selkäpuoli ylös/eteen (pyrstö nousee taaksepäin, joten selkä on keskiviivan etupuolella).
                float lev = Mathf.Lerp(0.0068f, 0.0024f, u);
                w[i] = lev; hd[i] = lev * 1.05f; hv[i] = lev * 0.95f; k[i] = kauko ? 0f : 0.001f;
            }
            Putki(r, c, sx, dn, w, hd, hv, k, sivut, (i, j) => R(sivut == 8 ? Suomu(i, j) : (j == 0 || j == 5 ? 0.4f : j == 1 || j == 4 ? 0.9f : 1.5f)), 0f);

            // Pyrstöevä: piikit kärjestä viuhkana taaksepäin (ylä- ja alalohko, lovi keskellä), kalvo piikkien välissä.
            var karki = PyrstoC(1f);
            var kierto = Quaternion.AngleAxis(12f, PyrstoT(1f));
            // Lohkot kiertyvät vastakkaisiin suuntiin (V), joten evä näkyy myös takaa ja edestä katsottuna.
            float[] kulma = { 66f, 42f, 14f, -12f, -34f }, pituus = { 0.025f, 0.0205f, 0.0125f, 0.019f, 0.0155f }, kierre = { 34f, 20f, 0f, -20f, -34f };
            var karjet = new Vector3[kulma.Length];
            for (int i = 0; i < kulma.Length; i++)
            {
                float a = kulma[i] * Mathf.Deg2Rad;
                karjet[i] = karki + kierto * (Quaternion.AngleAxis(kierre[i], Vector3.back) * new Vector3(0f, Mathf.Sin(a), -Mathf.Cos(a))) * pituus[i];
            }
            r.AloitaOsa();
            for (int i = 0; i < kulma.Length - 1; i++) r.KalvoKolmio(karki, karjet[i], karjet[i + 1], R(1.45f));
            r.LopetaOsa();
            if (!kauko)
            {
                var sivu = kierto * Vector3.right * 0.0004f;
                for (int i = 0; i < kulma.Length; i++)
                {
                    var d = (karjet[i] - karki).normalized;
                    var levea = Vector3.Cross(d, kierto * Vector3.right).normalized * 0.0007f;
                    foreach (float puoli in new[] { -1f, 1f })
                        r.KalvoKolmio(karki + sivu * puoli + levea, karki + sivu * puoli - levea, karjet[i] + sivu * puoli, R(0.15f));
                }
            }
            return r.Verkko(kauko ? "merihirviö: pyrstö kauko" : "merihirviö: pyrstö");
        }

        // =====================================================================================================================
        // Näytös
        // =====================================================================================================================

        // Olion avaruus (origo kaulan vesipisteessä, +z uintisuunta): kaarten paikat, koot ja kierrot (vuorotellen ±24°, joten
        // ruumis mutkittelee ylhäältä katsottuna ja kaaret näkyvät kaarina joka suunnasta), pyrstön vesipiste.
        static readonly float[] KaariZ = { -0.047f, -0.098f, -0.146f, -0.190f };
        static readonly float[] KaariX = { 0.000f, 0.001f, -0.001f, 0.001f };
        static readonly float[] KaariKoko = { 1f, 0.94f, 0.87f, 0.8f };
        static readonly float[] KaariKierto = { 24f, -24f, 24f, -24f };
        /// <summary>Pyrstön vesipiste viimeisen näkyvän kaaren takana.</summary>
        const float PyrstoTakana = 0.041f;
        /// <summary>Kaulan vesipiste juuren keskeltä uintisuuntaan (olio on noin kuonosta pyrstöön keskitetty).</summary>
        const float KaulaEdella = 0.125f;

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 0.8f) * Pehmea((pituus - s) / 0.8f);
        }

        static void Aseta(Transform l, Vector3 p, Quaternion q, Vector3 koko, Vector3 c, Quaternion iR, float k)
        {
            l.localPosition = iR * (p - c) * k;
            l.localRotation = iR * q;
            l.localScale = koko * k;
        }

        static void Piilota(Transform l) => l.localScale = Vector3.zero;

        /// <summary>
        /// Merihirviön näytös (10 s). Pää murtaa pinnan vaahdon ja roiskeiden keskeltä (0,3–0,65 s:sta), kaaret nousevat edestä
        /// taakse 0,34 s:n välein roiskeineen ja pyrstö viimeisenä; kaaret aaltoilevat (y-skaala ±13–23 %, aalto kulkee
        /// taaksepäin), kaula keinuu ja vilkaisee sivulle, kidasta tippuu pisaroita, pyrstö huiskii; sukellus 6,95–7,25 s:sta pää
        /// edellä roiskeineen, kaaret perässä ja pyrstö viimeisenä häivytyksen aikana. Siemenestä vaihtelevat suunta (rannikon
        /// mukaan pohjoiseen tai etelään ±10°) ja hidas kaarre, vauhti, aallon tahti, voima ja vaihe, kaarten määrä (4, joka
        /// kolmannessa 3; ensimmäinen näytös aina 4), vilkaisun hetki ja puoli ja ajoitukset. Harvinainen: kaula kohoaa
        /// 1,55-kertaiseksi (2,2–7,1 s) ja pää suihkuttaa kahdesti kaksi pisarasuihkua, joiden pisarat laskeutuvat
        /// vaahtorenkaiksi.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (roottori == null || lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);

            // ---- Näytöksen vaihtelu siemenestä (EI MONOTONIAA) ----
            float suunta = (Aikataulu.Arvo(n, 3) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 4) - 0.5f) * 20f;
            float x0 = -0.08f - 0.02f * Aikataulu.Arvo(n, 5);
            float vauhti = 0.0022f + 0.0024f * Aikataulu.Arvo(n, 6);
            float kaarre = (Aikataulu.Arvo(n, 7) - 0.5f) * 12f;
            float omega = 1.8f + 0.9f * Aikataulu.Arvo(n, 8), vaihe = Aikataulu.Arvo(n, 9) * 6.2832f;
            float aalto = 0.13f + 0.1f * Aikataulu.Arvo(n, 10);
            int kaaria = n > 0 && Aikataulu.Arvo(n, 11) < 0.3f ? 3 : 4;   // ensimmäinen näytös aina perusmuodossa
            float tPaa = 0.3f + 0.35f * Aikataulu.Arvo(n, 12);
            float tSukellus = 6.95f + 0.3f * Aikataulu.Arvo(n, 13) + 0.32f * (4 - kaaria) + (harv ? 0.25f : 0f);
            float tVilkaisu = 2.9f + 2.2f * Aikataulu.Arvo(n, 14), vilkaisu = Aikataulu.Arvo(n, 15) < 0.5f ? -1f : 1f;
            float tTippa = 3.1f + 2.4f * Aikataulu.Arvo(n, 16);

            var Rh = Quaternion.Euler(0f, suunta + kaarre * (s / pituus - 0.5f), 0f);
            var F = new Vector3(x0, 0f, 0f) + Rh * new Vector3(0f, 0f, KaulaEdella - 0.015f + vauhti * s);

            // ---- Roottori: pyrstö nousee viimeisen kaaren jälkeen, huiskii ja painuu viimeisenä ----
            float tPyrsto = tPaa + 0.55f + 0.34f * kaaria + 0.15f;
            float pNousu = Pehmea((s - tPyrsto) / 0.55f), pLasku = Pehmea((s - tSukellus - 0.3f - 0.32f * kaaria - 0.35f) / 0.7f);
            float heilautus = Pehmea((s - tSukellus - 0.3f - 0.32f * kaaria) / 0.35f) * (1f - pLasku);
            float sP = Mathf.Max(0.02f, pNousu * (1f - pLasku) * (1f + 0.2f * heilautus));
            float huiskaus = 13f * Mathf.Sin(1.15f * s + vaihe) + 9f * Mathf.Sin(2.3f * s + 1.7f * vaihe) * Pehmea((s - tPyrsto - 1f) / 1f);
            var Rr = Rh * Quaternion.Euler(0f, huiskaus, 0f);
            var c = F + Rh * new Vector3(0.003f, 0f, KaariZ[kaaria - 1] - PyrstoTakana);
            roottori.localPosition = c;
            roottori.localRotation = Rr;
            roottori.localScale = new Vector3(sP, sP, sP);
            var iR = Quaternion.Inverse(Rr);
            float kk = 1f / sP;

            // ---- Kaaret ----
            for (int i = 0; i < Lapsia; i++)
            {
                var l = lapset[i];
                float nousu = Pehmea((s - tPaa - 0.55f - 0.34f * i) / 1.0f);
                float lasku = Sisaan((s - tSukellus - 0.3f - 0.32f * i) / 0.95f);   // pysyy ylhäällä ja painuu nopeasti (lyhyt litteä vaihe)
                float e = nousu * (1f - lasku);
                if (i >= kaaria || e < 0.004f) { Piilota(l); continue; }
                float aaltoilu = Pehmea((s - tPaa - 1.8f) / 1.4f) * (1f - lasku);
                float y = e * (1f + aalto * Mathf.Sin(omega * s - 1.15f * i + vaihe) * aaltoilu);
                float lev = KaariKoko[i] * Mathf.Lerp(0.45f, 1f, Pehmea(e / 0.45f));
                float kierre = KaariKierto[i] + 5f * Mathf.Sin(0.7f * s + 1.3f * i + vaihe);
                var p = F + Rh * new Vector3(KaariX[i], 0f, KaariZ[i]);
                Aseta(l, p, Rh * Quaternion.Euler(0f, kierre, 0f), new Vector3(lev, KaariKoko[i] * y, lev), c, iR, kk);
            }

            // ---- Kaula ja pää ----
            var kaula = lapset[Lapsia];
            float kNousu = Ulos((s - tPaa) / 1.0f), kLasku = Sisaan((s - tSukellus) / 0.8f);
            float ek = kNousu * (1f - kLasku);
            const float tKohoa = 2.2f, tKohoaLoppu = 6.3f, tSuihku1 = 3.1f, tSuihku2 = 4.9f;
            float kohoa = harv ? Pehmea((s - tKohoa) / 0.9f) * (1f - Pehmea((s - tKohoaLoppu) / 0.8f)) : 0f;
            float ky = ek * (1f + 0.55f * kohoa) * (1f + 0.035f * Mathf.Sin(2.3f * s + vaihe));
            float vilk = Pehmea((s - tVilkaisu) / 0.45f) * (1f - Pehmea((s - tVilkaisu - 1.3f) / 0.5f));
            // Kaula kääntyy vain y-akselin ympäri, ja sen mukana kääntyy kaulan vana, joten keinunta ja vilkaisu ovat maltillisia.
            float kaanto = (8f * Mathf.Sin(0.85f * s + vaihe) + 3f * Mathf.Sin(1.9f * s + 2f * vaihe)) * (1f - kohoa) + 19f * vilkaisu * vilk * (1f - kohoa);
            float nyok = 3.5f * Mathf.Sin(1.7f * s + 0.5f * vaihe) * Pehmea(ek * ek);   // litistynyt pää ei nyökkää veden alle
            var kq = Rh * Quaternion.Euler(nyok, kaanto, 0f);
            if (ek < 0.004f) Piilota(kaula);
            else Aseta(kaula, F, kq, new Vector3(1f, ky, 1f), c, iR, kk);

            // ---- Vesipallot ----
            var laki = F + kq * new Vector3(Paalaki.x, Paalaki.y * ky, Paalaki.z);
            var leuka = F + kq * new Vector3(LeuanKarki.x, LeuanKarki.y * ky, LeuanKarki.z);
            for (int i = 0; i < Lapsia3; i++)
            {
                var l = lapset[Lapsia + Lapsia2 + i];
                Vector3 p; float koko; float litistys = 1f;
                if (harv && (Suihku(s - tSuihku1, i, laki.y, out var d, out koko, out litistys) || Suihku(s - tSuihku2, i, laki.y, out d, out koko, out litistys)))
                    p = new Vector3(laki.x, 0f, laki.z) + Rh * d;
                else if (i < 4 && Roiske(s - tPaa - 0.2f, i, 1f, out d, out koko)) p = F + Rh * d;
                else if (i < 4 && Roiske(s - tSukellus - 0.35f, i, 0.8f, out d, out koko)) p = F + Rh * d;
                else if (i >= 4 && i < 4 + Lapsia && i - 4 < kaaria && Roiske(s - tPaa - 0.75f - 0.34f * (i - 4), i, 0.6f, out d, out koko))
                {
                    int ki = i - 4;
                    var jalka = Quaternion.Euler(0f, KaariKierto[ki], 0f) * new Vector3(0f, 0f, KaariR * KaariKoko[ki]);
                    p = F + Rh * (new Vector3(KaariX[ki], 0f, KaariZ[ki]) + jalka + new Vector3(d.x * 0.55f, d.y, d.z * 0.55f));
                }
                else if (!harv && i >= 8 && Tippa(s - tTippa - 1.1f * (i - 8), leuka.y, out float ty, out koko))
                    p = new Vector3(leuka.x, ty, leuka.z);
                else { Piilota(l); continue; }
                Aseta(l, p, Rh, new Vector3(koko, koko * litistys, koko), c, iR, kk);
            }
        }

        /// <summary>Roiske i (0–3 kaulan ympärillä, 4–7 kaaren etujalassa): pallo nousee kaarena pinnasta ja putoaa (0,8 s).</summary>
        static bool Roiske(float aika, int i, float voima, out Vector3 siirto, out float koko)
        {
            float a = (aika - 0.05f * (i & 3)) / 0.8f;
            siirto = Vector3.zero; koko = 0f;
            if (a < 0f || a > 1f) return false;
            float kulma = (i * 2.39996f) + 0.6f;
            float sade = (0.012f + 0.012f * a) * (0.85f + 0.1f * (i % 3));
            koko = (0.75f + 0.25f * voima) * Mathf.Pow(Mathf.Sin(Mathf.PI * Mathf.Min(1f, a * 1.2f)), 0.6f);
            siirto = new Vector3(Mathf.Cos(kulma) * sade, PalloR * koko + 0.016f * voima * Mathf.Sin(Mathf.PI * a) * (0.8f + 0.1f * (i % 3)), Mathf.Sin(kulma) * sade * 0.8f);
            return koko > 0.04f;
        }

        /// <summary>Kidasta tippuva pisara: putoaa leuan kärjestä pintaan (painovoima) ja litistyy hetkeksi.</summary>
        static bool Tippa(float aika, float y0, out float y, out float koko)
        {
            y = 0f; koko = 0f;
            if (aika < 0f || aika > 1.0f) return false;
            float pohja = PalloR * 0.55f;
            y = Mathf.Max(pohja, y0 - 0.5f * 0.35f * aika * aika);
            koko = aika < 0.15f ? 0.55f * aika / 0.15f : y > pohja + 0.0001f ? 0.55f : 0.55f * (1f - Pehmea((aika - 0.8f) / 0.2f));
            return koko > 0.03f;
        }

        /// <summary>Suihkun pisaroiden kokovaihtelu (helminauha eikä yhtenäinen letku).</summary>
        static readonly float[] SuihkuKoko = { 1.1f, 0.8f, 1.0f, 0.72f, 0.9f, 1.05f, 0.78f, 0.95f, 0.7f, 0.86f };

        /// <summary>
        /// Harvinaisen suihkun pisara i: kaksi suihkua päälaelta (pisarat 0–4 oikealle, 5–9 vasemmalle ja hieman eteen, 0,1 s
        /// välein, joten ne muodostavat helminauhan kaaren), painovoima kaartaa ne alas; kun pisaran alapinta osuu pintaan, se
        /// litistyy musteenreunaiseksi vaahtorenkaaksi ja kutistuu pois. siirto olion avaruudessa päälaen vesipisteestä, y =
        /// keskipisteen korkeus. Yksi suihkaus kestää noin 2 s; näytöksessä kaksi (3,1 ja 4,9 s), eivätkä ne käytä samaa
        /// palloa yhtä aikaa.
        /// </summary>
        static bool Suihku(float aika, int i, float y0, out Vector3 siirto, out float koko, out float litistys)
        {
            siirto = Vector3.zero; koko = 0f; litistys = 1f;
            int k = i % 5;
            float puoli = i < 5 ? 1f : -1f;
            float a = aika - 0.1f * k - (i < 5 ? 0f : 0.05f);
            if (a < 0f) return false;
            const float g = 0.9f;
            float v0 = 0.3f * (1f - 0.07f * k);
            float vaihtelu = SuihkuKoko[i];
            float pohja = PalloR * 1.3f * vaihtelu;   // pisaran alapinta pysyy pinnassa: lento päättyy, kun keskipiste on säteen korkeudella
            float y = y0 + v0 * a - 0.5f * g * a * a;
            float lento = (v0 + Mathf.Sqrt(v0 * v0 + 2f * g * Mathf.Max(0f, y0 - pohja))) / g;
            float ta = Mathf.Min(a, lento);
            float kulma = puoli * (0.7f + 0.16f * k), vs = 0.088f - 0.012f * k;
            siirto = new Vector3(Mathf.Sin(kulma) * vs * ta, Mathf.Max(pohja, y), (Mathf.Cos(kulma) * vs * 0.45f + 0.006f) * ta);
            if (a < lento)
            {
                koko = Mathf.Lerp(0.6f, 1.3f, Pehmea(a / 0.3f)) * vaihtelu;
                return true;
            }
            float b = (a - lento) / 0.55f;
            if (b > 1f) return false;
            litistys = 0.3f;
            koko = Mathf.Lerp(1.05f, 1.3f, b) * (1f - Pehmea((b - 0.4f) / 0.6f)) * vaihtelu;
            siirto.y = PalloR * 0.3f * koko + 0.0003f;
            return koko > 0.05f;
        }
    }
}
