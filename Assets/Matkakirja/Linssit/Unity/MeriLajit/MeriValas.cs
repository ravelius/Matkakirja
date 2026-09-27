// MEREN KORISTEIDEN LAATUTASO, ERÄ 1: VALAS (ryhävalas). Speksi docs/raportit/meri-laatu-speksi-20260927.md (Linssiseppä
// 27.9.2026, omistaja: "Nuo voisi tehdä korkeammalla laadulla"). Korvaa MeriGeometria.ValaanSelka/Suihku/Pyrsto/ValasAnimoi.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// VALAS (ryhävalas) MeriMalli-varjostimelle. Näytös (12–16 s, aikataulu ja siemen 911 ennallaan): nousee pintaan
    /// vaahtorenkaan keskelle, puhaltaa tuuhean V-suihkun, notkahtaa, puhaltaa toisen kerran ja sukeltaa: selkä kaartuu
    /// korkeaksi kyttyräksi ja pyrstönvarsi ja lavat nousevat pintaan sen taakse (koko valas näkyy), selkä painuu, lavat
    /// kääntyvät pystyyn kuvioitu alapinta taaksepäin, vesi kuohuu varren tyvellä, ja pyrstö liukuu veteen; jalanjälki
    /// (vaalea soikio vaahtoreunuksella) laajenee ja jää. Harvinainen (noin 1/10, ei koskaan ensimmäinen näytös): valas jää
    /// makaamaan pintaan, ja pyrstö läiskähtää kahdesti roiskekruunuineen ennen sukellusta.
    ///
    /// Rakenne (mallin avaruus: +z pää, +y ylös, meren pinta y = 0, 1 yksikkö = 250 pt; näkyvä selkä 0,21 ≈ 53 pt):
    ///   Roottori  jalanjälki ja vaahtorengas (vesikerros, 312 kolmiota; kaukotaso 156): paikallaan näytöksen ajan
    ///             pintautumiskohdan ja pyrstön nivelen välissä. Animoi asettaa roottorin paikan, kierron (uintisuunta) ja
    ///             TASAISEN skaalan 0,45–1,4 (vaahto leviää pintautuessa, jalanjälki uusiutuu sukelluksessa); lasten paikat ja
    ///             skaalat kompensoidaan (lapsi = (p − c) / s), joten lapset pysyvät omissa vesipisteissään myös roottorin
    ///             kallistuksessa (KallistaVainRoottori, LapsetOmaanPisteeseen). Integraattori ei saa asettaa roottorin skaalaa.
    ///   Lapsi     (1) selkä (742): kaareva runko (Pinta 20 × 10), laakea kyhmyinen kuono, suihkuaukot, selkäevä kyttyrän
    ///             päällä, vaalea leuka; vesikerros ensin: pinnan alla näkyvä haamu (koko ruumis, pyrstönvarsi ja lavat
    ///             musteena), pitkät vaaleat rintaevät tummin reunoin, vaahtokaulus ääriviivan ulkopuolella ja vana. Nousu,
    ///             notkahdus, kaari ja painuminen y-skaalalla nivelen ympäri (vesi pysyy pinnassa).
    ///   Lapsi2    (10) suihkupallo (128): puhallukset, harvinaisen läiskäytyksen roiskeet ja pyrstön tyven kuohu.
    ///   Lapsi3    (1) pyrstö (320): pyrstönvarsi ja lavat uintiasennossa (ääriviiva kiertää lavat), sahalaitainen takareuna
    ///             ja lovi, tumma yläpinta ja kuvioitu alapinta; Animoi kääntää sen x-akselin ympäri pystyyn ja kasvattaa ja
    ///             painaa sen z-skaalalla (nousee vedestä ja liukuu veteen nivelen kohdalla). Ei vesikerrosta (laite: Cull Back).
    /// LOD0 yhteensä 2 654 kolmiota. Värit vain rampista (Rampi, kärjen alfa 0) ja vesikerroksen Vaahto/VarjoVari; ei
    /// korostusväriä. Animoi ei allokoi (vain rakenteita ja staattisia taulukoita).
    /// </summary>
    public static class MeriValas
    {
        public const string Nimi = "valas";
        public static readonly string[] Meret = { "atlantti", "jaameri" };
        public const float KokoPt = 250f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(911, 12f, 16f, 60f, 150f);
        public const int Lapsia = 1, Lapsia2 = 10, Lapsia3 = 1;

        // ---- Mitat ----
        // Selän asemat pyrstönvarresta (−z) kuonoon (+z): puolileveys vesirajassa (W) ja korkeus vesirajasta (H). Kyttyrä
        // selkäevän kohdalla, kuono matala ja leveä, pyrstönvarsi painuu veteen takana.
        static readonly float[] AsemaZ = { -0.106f, -0.100f, -0.092f, -0.082f, -0.071f, -0.060f, -0.049f, -0.037f, -0.024f, -0.010f,
            0.004f, 0.018f, 0.032f, 0.046f, 0.058f, 0.070f, 0.081f, 0.090f, 0.097f, 0.102f, 0.106f };
        static readonly float[] AsemaW = { 0f, 0.0035f, 0.0065f, 0.0095f, 0.0125f, 0.0150f, 0.0165f, 0.0172f, 0.0175f, 0.0178f,
            0.0182f, 0.0190f, 0.0205f, 0.0215f, 0.0218f, 0.0212f, 0.0196f, 0.0172f, 0.0140f, 0.0098f, 0f };
        static readonly float[] AsemaH = { 0f, 0.0028f, 0.0085f, 0.0150f, 0.0205f, 0.0248f, 0.0262f, 0.0235f, 0.0196f, 0.0166f,
            0.0150f, 0.0142f, 0.0136f, 0.0128f, 0.0115f, 0.0100f, 0.0084f, 0.0068f, 0.0050f, 0.0032f, 0f };
        // Koko valas pinnan alla (haamu): puolileveys kuonosta pyrstönvarteen, alfa keskellä (syvemmällä haaleampi).
        static readonly float[] HaamuZ = { 0.112f, 0.106f, 0.096f, 0.082f, 0.064f, 0.044f, 0.022f, 0.000f, -0.024f, -0.048f,
            -0.072f, -0.094f, -0.114f, -0.132f, -0.148f, -0.160f };
        static readonly float[] HaamuW = { 0f, 0.0125f, 0.0195f, 0.0250f, 0.0292f, 0.0318f, 0.0330f, 0.0328f, 0.0315f, 0.0285f,
            0.0235f, 0.0170f, 0.0112f, 0.0078f, 0.0060f, 0.0052f };
        static readonly float[] HaamuA = { 0.36f, 0.38f, 0.38f, 0.38f, 0.38f, 0.38f, 0.38f, 0.38f, 0.38f, 0.37f,
            0.35f, 0.31f, 0.26f, 0.22f, 0.19f, 0.17f };
        const int Ymparys = 10;
        /// <summary>Selkäevä kyttyrän päällä, suihkuaukot kuonon takana ja pyrstön nivel selän takaosassa (pyrstönvarren tyvi on
        /// selän sisällä, joten varsi jatkaa selkää saumatta).</summary>
        const float EvaZ = -0.052f, AukkoZ = 0.050f, NivelZ = -0.078f;
        /// <summary>Pyrstön lavat: kärkiväli ±LapaX, tyvi pyrstönvarren päässä.</summary>
        const float LapaX = 0.053f, VarsiZ = -0.058f;
        const float PallonSade = 0.01f;
        // Vesikerrosten korkeudet (myöhempi kerros ylempänä, jotta syvyystesti päästää sen läpi).
        const float YLaikka = 0.0001f, YHaamu = 0.0015f, YEvaReuna = 0.002f, YEva = 0.0023f, YVaahto = 0.0026f;

        /// <summary>Suihkuaukon korkeus selän pinnalla (lasketaan kerran).</summary>
        static readonly float AukkoH = PintaY(0f, AukkoZ);

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y * y; }

        // =====================================================================================================================
        // Roottori: jalanjälki
        // =====================================================================================================================

        /// <summary>Pintautumisen vaahtorengas ja jalanjälki: sileä vaalea soikio (sisällä alfa 0,07–0,12, jotta selän
        /// ääriviiva ei haalistu), vaahtoreunus (0,28) valaan ulkopuolella ja pehmeä ulkoreuna; muoto hieman
        /// epäsäännöllinen. Säteet 0,064 × 0,118 skaalassa 1 (selkä mahtuu lähes reunuksen sisään).</summary>
        public static Mesh Roottori() => Laikka(24, "valas: jalanjälki");

        /// <summary>Kaukotaso: sama soikio harvemmin sektorein.</summary>
        public static Mesh RoottoriKauko() => Laikka(12, "valas: jalanjälki kauko");

        static Mesh Laikka(int sektoreita, string nimi)
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            float[] sade = { 0f, 0.5f, 0.66f, 0.72f, 0.8f, 0.93f, 1.0f, 1.12f };
            float[] alfa = { 0.08f, 0.08f, 0.12f, 0.07f, 0.1f, 0.28f, 0.16f, 0f };
            const float rx = 0.064f, rz = 0.118f;
            for (int i = 0; i < sektoreita; i++)
            {
                float k0 = i * Mathf.PI * 2f / sektoreita, k1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                float m0 = 1f + 0.06f * Mathf.Sin(3f * k0 + 0.7f) + 0.04f * Mathf.Sin(5f * k0 + 2.1f);
                float m1 = 1f + 0.06f * Mathf.Sin(3f * k1 + 0.7f) + 0.04f * Mathf.Sin(5f * k1 + 2.1f);
                for (int j = 0; j < sade.Length - 1; j++)
                {
                    Vector3 a0 = LaikkaPiste(k0, sade[j] * m0, rx, rz), a1 = LaikkaPiste(k1, sade[j] * m1, rx, rz);
                    Vector3 b0 = LaikkaPiste(k0, sade[j + 1] * m0, rx, rz), b1 = LaikkaPiste(k1, sade[j + 1] * m1, rx, rz);
                    Color ca = MeriRakentaja.Alfa(MeriRakentaja.Vaahto, alfa[j]), cb = MeriRakentaja.Alfa(MeriRakentaja.Vaahto, alfa[j + 1]);
                    if (j == 0) r.KolmioVarit(a0, b1, b0, ca, cb, cb);
                    else r.NelioVarit(a0, a1, b1, b0, ca, ca, cb, cb);
                }
            }
            return r.Verkko(nimi);
        }

        static Vector3 LaikkaPiste(float k, float s, float rx, float rz) => new Vector3(Mathf.Cos(k) * rx * s, YLaikka, Mathf.Sin(k) * rz * s);

        // =====================================================================================================================
        // Lapsi: selkä ja sen vesikerros
        // =====================================================================================================================

        /// <summary>Selän korkeus vesirajasta pituuskohdassa z (lineaarinen asemien välillä).</summary>
        static float Taulu(float[] arvot, float z)
        {
            if (z <= AsemaZ[0]) return arvot[0];
            for (int i = 1; i < AsemaZ.Length; i++)
                if (z <= AsemaZ[i]) return Mathf.Lerp(arvot[i - 1], arvot[i], (z - AsemaZ[i - 1]) / (AsemaZ[i] - AsemaZ[i - 1]));
            return arvot[arvot.Length - 1];
        }

        /// <summary>Poikkileikkauksen eksponentti: kuono laakea (0,62), selkä pyöreä (0,95).</summary>
        static float Eksponentti(float z) => Mathf.Lerp(0.95f, 0.62f, Mathf.SmoothStep(0f, 1f, (z - 0.025f) / 0.04f));

        /// <summary>Selän pinnan korkeus kohdassa (x, z): poikkileikkaus x = W·|cos φ|^e, y = H·(sin φ)^e.</summary>
        static float PintaY(float x, float z)
        {
            float w = Taulu(AsemaW, z), h = Taulu(AsemaH, z), e = Eksponentti(z);
            if (w < 1e-5f) return 0f;
            float c = Mathf.Pow(Mathf.Clamp01(Mathf.Abs(x) / w), 1f / e);
            return h * Mathf.Pow(Mathf.Sqrt(Mathf.Max(0f, 1f - c * c)), e);
        }

        static Vector3 SelkaPiste(int i, float v)
        {
            float z = AsemaZ[i], w = AsemaW[i], h = AsemaH[i], e = Eksponentti(z);
            float f = Mathf.PI * v, c = Mathf.Cos(f), sn = Mathf.Max(0f, Mathf.Sin(f));
            float x = w * (c < 0f ? -1f : 1f) * Mathf.Pow(Mathf.Abs(c), e);
            return new Vector3(x, h * Mathf.Pow(sn, e), z);
        }

        static Color SelkaVari(float u, float v)
        {
            int n = AsemaZ.Length - 1;
            int i = Mathf.Min(n - 1, (int)(u * n));
            float z = 0.5f * (AsemaZ[i] + AsemaZ[i + 1]);
            // Poikkileikkaus: vesirajan märkä kaista vaalea, kylki tumma, harja valoa heijastava (kaiverruksen pyöreys).
            float q = Mathf.Abs(v - 0.5f) * 2f;                        // 0 harja … 1 vesiraja
            float s = q > 0.8f ? 0.6f : q > 0.6f ? 0.42f : q > 0.4f ? 0.46f : q > 0.2f ? 0.52f : 0.6f;
            if (z > 0.04f) s += 0.08f;                                  // laakea kuono vaaleampi (kyhmyt erottuvat)
            if (z > 0.03f && q > 0.8f) s = 1.0f;                        // leuka ja kurkku vaaleat vesirajassa (ryhävalaan vatsapuoli)
            if (z < -0.035f && z > -0.07f) s -= 0.05f;                  // kyttyrä ja selkäevän tyvi
            return R(s);
        }

        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            // Vesikerros ensin (piirtyy rungon alle): haamu, rintaevät, vaahtokaulus ja vana.
            r.Vesi = true;
            Haamu(r);
            Rintaevat(r);
            // Vaahtokaulus ääriviivan ulkopuolella (1,2 pt = 0,0048 yksikköä), jottei vaahto haalista mustetta.
            Reunus(r, YVaahto, 0.0046f, 0.003f, 0.0065f, 0.0045f, MeriRakentaja.Vaahto, 0.34f, 0f);
            foreach (float puoli in new[] { -1f, 1f })
                r.Nauha(new Vector3(puoli * 0.008f, YVaahto, -0.097f), new Vector3(puoli * 0.25f, 0f, -1f), 0.05f, 0.002f, 0.007f,
                    MeriRakentaja.Vaahto, 0.22f, 0f, 2);
            r.Vesi = false;

            // Runko: yksi osa (ääriviiva koko selän ympäri).
            int m = AsemaZ.Length;
            r.Pinta((u, v) => SelkaPiste(Mathf.Min(m - 1, (int)(u * (m - 1) + 0.5f)), v), m - 1, Ymparys,
                SelkaVari, false,
                (u, v) => new Vector3(Mathf.Cos(Mathf.PI * v), Mathf.Sin(Mathf.PI * v), u > 0.9f ? 0.7f : u < 0.1f ? -0.7f : 0f));

            // Selkäevä kyttyrän päällä: pieni, taaksepäin kallistuva (ryhävalaan tunnusmerkki).
            {
                float zf = EvaZ + 0.009f, zr = EvaZ - 0.009f, yb = PintaY(0f, EvaZ) - 0.0008f;
                var ef = new Vector3(0f, PintaY(0f, zf) - 0.0008f, zf); var er = new Vector3(0f, PintaY(0f, zr) - 0.0008f, zr);
                var karki = new Vector3(0f, yb + 0.012f, EvaZ - 0.010f);
                var dx = new Vector3(0.0017f, 0f, 0f);
                var c = R(0.4f);
                r.AloitaOsa();
                r.KolmioUlos(ef - dx, er - dx, karki, Vector3.left, c);
                r.KolmioUlos(ef + dx, karki, er + dx, Vector3.right, c);
                r.KolmioUlos(ef - dx, karki, ef + dx, new Vector3(0f, 0.5f, 1f), c);
                r.KolmioUlos(er - dx, er + dx, karki, new Vector3(0f, 0.3f, -1f), c);
                r.LopetaOsa();
            }

            // Kyhmyt (ryhävalaan kuonon nystyt): keskirivi ja kaksi sivuriviä pieniä nelitahkoisia kumpuja.
            float[] kz = { 0.099f, 0.091f, 0.083f, 0.075f, 0.067f };
            foreach (float z in kz) Kyhmy(r, 0f, z, 0.0019f);
            float[] sz = { 0.094f, 0.085f, 0.076f, 0.067f, 0.088f, 0.078f, 0.068f };
            for (int i = 0; i < sz.Length; i++)
            {
                float z = sz[i], f = i < 4 ? 0.4f : 0.72f;
                float x = Taulu(AsemaW, z) * f;
                Kyhmy(r, x, z, 0.0017f); Kyhmy(r, -x, z, 0.0017f);
            }
            // Suihkuaukot: kaksi tummaa rakoa V-muodossa ja roiskesuoja edessä.
            Kyhmy(r, 0f, AukkoZ + 0.0065f, 0.0024f);
            foreach (float puoli in new[] { -1f, 1f })
            {
                var a = new Vector3(puoli * 0.0012f, 0f, AukkoZ + 0.0025f); var b = new Vector3(puoli * 0.0026f, 0f, AukkoZ - 0.0022f);
                var sivu = new Vector3(0.0006f, 0f, 0f);
                Vector3 p0 = a - sivu, p1 = a + sivu, p2 = b + sivu, p3 = b - sivu;
                p0.y = PintaY(p0.x, p0.z) + 0.0003f; p1.y = PintaY(p1.x, p1.z) + 0.0003f;
                p2.y = PintaY(p2.x, p2.z) + 0.0003f; p3.y = PintaY(p3.x, p3.z) + 0.0003f;
                r.NelioUlos(p0, p1, p2, p3, Vector3.up, R(0.1f));
            }
            return r.Verkko("valas: selkä");
        }

        /// <summary>Nelitahkoinen kumpu selän pinnalla (kyhmy, roiskesuoja): vaalea huippu rampissa, ei ääriviivaa.</summary>
        static void Kyhmy(MeriRakentaja r, float x, float z, float sade)
        {
            float y = PintaY(x, z) - 0.0003f;
            var huippu = new Vector3(x, PintaY(x, z) + sade * 0.85f, z);
            r.AloitaOsa();
            for (int i = 0; i < 4; i++)
            {
                float k0 = (i + 0.5f) * Mathf.PI * 0.5f, k1 = (i + 1.5f) * Mathf.PI * 0.5f;
                var a = new Vector3(x + Mathf.Cos(k0) * sade, 0f, z + Mathf.Sin(k0) * sade);
                var b = new Vector3(x + Mathf.Cos(k1) * sade, 0f, z + Mathf.Sin(k1) * sade);
                a.y = Mathf.Max(y, PintaY(a.x, a.z) - 0.0003f); b.y = Mathf.Max(y, PintaY(b.x, b.z) - 0.0003f);
                var ulos = new Vector3(Mathf.Cos((k0 + k1) * 0.5f), 0.8f, Mathf.Sin((k0 + k1) * 0.5f));
                r.KolmioUlos(a, b, huippu, ulos, R(0.95f));
            }
            r.LopetaOsa();
        }

        /// <summary>Selän vesirajan ääriviiva (oikea puoli takaa kuonoon, vasen kuonosta taakse).</summary>
        static Vector3[] Vesiraja()
        {
            int m = AsemaZ.Length;
            var p = new Vector3[2 * m - 2];
            int k = 0;
            for (int i = 0; i < m; i++) p[k++] = new Vector3(AsemaW[i], 0f, AsemaZ[i]);
            for (int i = m - 2; i >= 1; i--) p[k++] = new Vector3(-AsemaW[i], 0f, AsemaZ[i]);
            return p;
        }

        /// <summary>Reunus vesirajan ympäri (vaahtokaulus): sisäreuna sisa, leveys kyljissä l, kuonolla lKuono ja
        /// pyrstönvarressa lTaka; sisällä alfa a0, ulkona a1.</summary>
        static void Reunus(MeriRakentaja r, float y, float sisa, float l, float lKuono, float lTaka, Color vari, float a0, float a1)
        {
            var p = Vesiraja();
            int n = p.Length;
            var ulk = new Vector3[n]; var sis = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                Vector3 a = p[(i + n - 1) % n], b = p[(i + 1) % n];
                var t = b - a; var nn = new Vector3(t.z, 0f, -t.x).normalized;
                if (Vector3.Dot(nn, new Vector3(p[i].x, 0f, p[i].z * 0.3f)) < 0f) nn = -nn;
                float z = p[i].z;
                float lev = z > 0.07f ? Mathf.Lerp(l, lKuono, (z - 0.07f) / 0.036f) : z < -0.07f ? Mathf.Lerp(l, lTaka, (-0.07f - z) / 0.036f) : l;
                sis[i] = p[i] + nn * sisa; sis[i].y = y;
                ulk[i] = p[i] + nn * (sisa + lev); ulk[i].y = y;
            }
            Color c0 = MeriRakentaja.Alfa(vari, a0), c1 = MeriRakentaja.Alfa(vari, a1);
            for (int i = 0; i < n; i++)
            {
                int j = (i + 1) % n;
                r.NelioVarit(sis[i], sis[j], ulk[j], ulk[i], c0, c0, c1, c1);
            }
        }

        /// <summary>Pinnan alla näkyvä valas (vesikerros, muste): koko ruumis kuonosta pyrstönvarteen (selkää leveämpi, joten
        /// näkyvä selkä on kapea harjanne sen keskellä) ja lavat syvällä haaleina. Antaa ylhäältä koko valaan siluetin.</summary>
        static void Haamu(MeriRakentaja r)
        {
            var v = MeriRakentaja.VarjoVari;
            const float reuna = 0.005f;
            int m = HaamuZ.Length;
            for (int i = 0; i < m - 1; i++)
                foreach (float puoli in new[] { -1f, 1f })
                {
                    float z0 = HaamuZ[i], z1 = HaamuZ[i + 1], w0 = HaamuW[i], w1 = HaamuW[i + 1];
                    Vector3 k0 = new Vector3(0f, YHaamu, z0), k1 = new Vector3(0f, YHaamu, z1);
                    Vector3 r0 = new Vector3(puoli * w0, YHaamu, z0), r1 = new Vector3(puoli * w1, YHaamu, z1);
                    // Kuonon kärjessä pehmeä reuna eteenpäin, muualla sivulle.
                    Vector3 u0 = r0 + (i == 0 ? new Vector3(0f, 0f, reuna) : new Vector3(puoli * reuna, 0f, 0f));
                    Vector3 u1 = r1 + new Vector3(puoli * reuna, 0f, 0f);
                    Color c0 = MeriRakentaja.Alfa(v, HaamuA[i]), c1 = MeriRakentaja.Alfa(v, HaamuA[i + 1]);
                    Color e0 = MeriRakentaja.Alfa(v, HaamuA[i] * 0.8f), e1 = MeriRakentaja.Alfa(v, HaamuA[i + 1] * 0.8f), o = MeriRakentaja.Alfa(v, 0f);
                    r.NelioVarit(k0, r0, r1, k1, c0, e0, e1, c1);
                    r.NelioVarit(r0, u0, u1, r1, e0, o, o, e1);
                }
            // Lavat syvällä haaleina (tyvi, etureuna, kärki, takareuna ja lovi).
            float zt = HaamuZ[m - 1];
            foreach (float puoli in new[] { -1f, 1f })
            {
                var tyvi = new Vector3(0f, YHaamu, zt + 0.002f); var etu = new Vector3(puoli * 0.028f, YHaamu, zt - 0.010f);
                var karki = new Vector3(puoli * 0.05f, YHaamu, zt - 0.028f); var taka = new Vector3(puoli * 0.024f, YHaamu, zt - 0.026f);
                var lovi = new Vector3(0f, YHaamu, zt - 0.017f);
                Color c = MeriRakentaja.Alfa(v, 0.14f), e = MeriRakentaja.Alfa(v, 0.06f);
                r.KolmioVarit(tyvi, etu, lovi, c, e, c);
                r.KolmioVarit(etu, karki, taka, e, MeriRakentaja.Alfa(v, 0.02f), e);
                r.KolmioVarit(etu, taka, lovi, e, e, c);
            }
        }

        /// <summary>Rintaevät pinnan alla: pitkät (noin kolmannes ruumiista), vaaleat ja kyhmyisellä etureunalla; tumma pehmeä
        /// reuna ensin, jotta vaalea evä erottuu vaaleasta merestä.</summary>
        static void Rintaevat(MeriRakentaja r)
        {
            float[] t = { 0f, 0.12f, 0.26f, 0.40f, 0.54f, 0.68f, 0.80f, 0.90f, 1f };
            float[] w = { 0.0058f, 0.0086f, 0.0090f, 0.0086f, 0.0078f, 0.0065f, 0.0050f, 0.0033f, 0f };
            float[] b = { 0f, 0.0006f, 0.0015f, 0.0003f, 0.0014f, 0.0003f, 0.0012f, 0.0004f, 0f };
            foreach (float puoli in new[] { -1f, 1f })
            {
                var juuri = new Vector3(puoli * 0.027f, 0f, 0.036f);
                var karki = new Vector3(puoli * 0.094f, 0f, -0.024f);
                var akseli = (karki - juuri).normalized;
                var eteen = new Vector3(-akseli.z, 0f, akseli.x);
                if (eteen.z < 0f) eteen = -eteen;
                float pituus = (karki - juuri).magnitude;
                int m = t.Length;
                var keski = new Vector3[m]; var et = new Vector3[m]; var ta = new Vector3[m];
                for (int i = 0; i < m; i++)
                {
                    // Evä kaartuu hieman taaksepäin (banaani).
                    keski[i] = juuri + akseli * (pituus * t[i]) - eteen * (0.004f * Mathf.Sin(Mathf.PI * t[i]));
                    et[i] = keski[i] + eteen * (w[i] + b[i]);
                    ta[i] = keski[i] - eteen * w[i];
                }
                // Tumma pehmeä reuna.
                var v = MeriRakentaja.VarjoVari;
                Color rc = MeriRakentaja.Alfa(v, 0.24f);
                for (int i = 0; i < m - 1; i++)
                {
                    Vector3 e0 = Y(et[i] + eteen * 0.0018f, YEvaReuna), e1 = Y(et[i + 1] + eteen * 0.0018f, YEvaReuna);
                    Vector3 t0 = Y(ta[i] - eteen * 0.0018f, YEvaReuna), t1 = Y(ta[i + 1] - eteen * 0.0018f, YEvaReuna);
                    r.NelioVarit(t0, t1, e1, e0, rc, rc, rc, rc);
                }
                // Vaalea täyttö: tyvessä kirkkaampi, kärkeä kohti syvemmälle häipyvä.
                for (int i = 0; i < m - 1; i++)
                {
                    float a0 = Mathf.Lerp(0.78f, 0.52f, t[i]), a1 = Mathf.Lerp(0.78f, 0.52f, t[i + 1]);
                    Color c0 = MeriRakentaja.Alfa(MeriRakentaja.Vaahto, a0), c1 = MeriRakentaja.Alfa(MeriRakentaja.Vaahto, a1);
                    r.NelioVarit(Y(ta[i], YEva), Y(ta[i + 1], YEva), Y(et[i + 1], YEva), Y(et[i], YEva), c0, c1, c1, c0);
                }
            }
        }

        static Vector3 Y(Vector3 p, float y) { p.y = y; return p; }

        // =====================================================================================================================
        // Lapsi2: suihkupallo
        // =====================================================================================================================

        /// <summary>Suihkupallo: paperinvaalea pallo (ramppi 1,95), ääriviiva erottaa sen vaaleasta merestä.</summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja();
            r.Pallo(Vector3.zero, PallonSade, R(1.95f), 2);
            return r.Verkko("valas: suihku");
        }

        // =====================================================================================================================
        // Lapsi3: pyrstö
        // =====================================================================================================================

        // Lavan muoto (lavan tasossa, uintiasento): etureuna pyyhkäisty taakse, takareuna sahalaitainen ja lovi keskellä,
        // kärjet suippoina; kärjet taipuvat vatsapuolelle (pystyssä taaksepäin), joten pyrstö ei ole sivulta pelkkä viiva.
        const int LapaAsemia = 8, LapaJanne = 3;
        static float LapaEtu(float s) => -0.052f - 0.018f * s - 0.027f * s * s * s * s;
        static float LapaTaipuma(float s) => -0.006f * s * s;

        static float LapaTaka(float s, int i)
        {
            float z = s < 0.07f ? Mathf.Lerp(-0.072f, -0.085f, s / 0.07f) : -0.085f - 0.012f * Mathf.Pow(s, 1.5f);
            if (i > 0 && i < LapaAsemia) z += (i % 2 == 1) ? -0.0018f : 0.0005f;   // sahalaita
            return z;
        }

        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            // Pyrstönvarsi: litistynyt (korkea ja kapea) putki nivelestä lapoihin; selkäpuoli tumma, vatsakölin puoli vaaleampi.
            // Päät suljettu: avoimesta päästä näkyisi ääriviivan muste (harvinaisessa nivel on koholla kameraa kohti).
            r.AloitaOsa();
            r.Pinta((u, v) => VarsiPiste(u, v), 6, 10,
                (u, v) => R(Mathf.Sin(2f * Mathf.PI * v) > -0.25f ? 0.46f : 0.8f), false,
                (u, v) => new Vector3(Mathf.Cos(2f * Mathf.PI * v), Mathf.Sin(2f * Mathf.PI * v), 0f));
            for (int i = 0; i < 10; i++)
            {
                Vector3 e0 = VarsiPiste(0f, i / 10f), e1 = VarsiPiste(0f, (i + 1) / 10f);
                Vector3 t0 = VarsiPiste(1f, i / 10f), t1 = VarsiPiste(1f, (i + 1) / 10f);
                r.KolmioUlos(new Vector3(0f, 0f, e0.z + 0.002f), e0, e1, Vector3.forward, R(0.46f));
                r.KolmioUlos(new Vector3(0f, 0f, t0.z - 0.001f), t0, t1, Vector3.back, R(0.46f));
            }
            r.LopetaOsa();

            // Lavat: yksi osa (ääriviiva kiertää koko lavan sahalaitoineen); yläpinta tumma, alapinta kuvioitu.
            var yla = R(0.4f);
            r.AloitaOsa();
            for (int puoliI = 0; puoliI < 2; puoliI++)
            {
                float puoli = puoliI == 0 ? -1f : 1f;
                for (int i = 0; i < LapaAsemia; i++)
                    for (int j = 0; j < LapaJanne; j++)
                    {
                        r.NelioUlos(LapaPiste(puoli, i, j, 1f), LapaPiste(puoli, i + 1, j, 1f), LapaPiste(puoli, i + 1, j + 1, 1f),
                            LapaPiste(puoli, i, j + 1, 1f), Vector3.up, yla);
                        r.NelioUlos(LapaPiste(puoli, i, j, -1f), LapaPiste(puoli, i + 1, j, -1f), LapaPiste(puoli, i + 1, j + 1, -1f),
                            LapaPiste(puoli, i, j + 1, -1f), -Vector3.up, AlaVari(puoli, i, j));
                    }
            }
            r.LopetaOsa();

            // Pyrstössä ei vesikerrosta: vesikolmiot kääntyvät aina ylös (laitteen Cull Back), joten pystyyn nousevan lavan
            // kalvot eivät näkyisi. Valuva vesi = litistetyt suihkupallot varren tyvellä (Animoi).
            return r.Verkko("valas: pyrstö");
        }

        static Vector3 VarsiPiste(float u, float v)
        {
            float z = Mathf.Lerp(0.004f, VarsiZ - 0.002f, u);
            float w = Mathf.Lerp(0.0078f, 0.0042f, u), h = Mathf.Lerp(0.0112f, 0.0072f, u);
            float f = 2f * Mathf.PI * v;
            return new Vector3(w * Mathf.Cos(f), h * Mathf.Sin(f), z);
        }

        /// <summary>Lavan piste: puoli ±1, asema i (0 keskellä … LapaAsemia kärjessä), jänne j (0 etureuna … LapaJanne
        /// takareuna), pinta +1 ylä / −1 ala.</summary>
        static Vector3 LapaPiste(float puoli, int i, int j, float pinta)
        {
            float s = i / (float)LapaAsemia;
            float ze = LapaEtu(s), zt = LapaTaka(s, i);
            if (i == LapaAsemia) zt = ze;
            float tau = j / (float)LapaJanne;
            float z = Mathf.Lerp(ze, zt, tau);
            float paksuus = 0.0026f * Mathf.Sqrt(Mathf.Max(0f, 1f - s * s)) * Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * tau)), 0.8f);
            return new Vector3(puoli * s * LapaX, LapaTaipuma(s) + pinta * paksuus, z);
        }

        /// <summary>Alapinnan vaalea kenttä (ei takareunan tummaa reunaa, kärkiä, keskustaa eikä läiskiä).</summary>
        static bool AlaVaalea(float puoli, int i, int j)
        {
            float s = (i + 0.5f) / LapaAsemia;
            if (j == LapaJanne - 1 || s > 0.86f || s < 0.13f) return false;
            return MeriGeometria.Arpa(911, i * 7 + j * 3 + (puoli > 0f ? 50 : 0), 17) >= 0.2f;
        }

        /// <summary>Alapinnan kuvio (ryhävalaan tunniste): vaalea lapa, tumma sahalaitainen takareuna ja kärjet, keskellä
        /// seepia ja epäsymmetrisiä tummia läiskiä.</summary>
        static Color AlaVari(float puoli, int i, int j)
        {
            float s = (i + 0.5f) / LapaAsemia;
            if (j == LapaJanne - 1) return R(0.45f);
            if (s > 0.86f) return R(0.5f);
            if (s < 0.13f) return R(1.0f);
            return AlaVaalea(puoli, i, j) ? R(2f) : R(0.9f);
        }

        // =====================================================================================================================
        // Näytös
        // =====================================================================================================================

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 0.8f) * Pehmea((pituus - s) / 0.8f);
        }

        /// <summary>Uintipolku (whale frame): hidas eteneminen ja siemenen kaarre; kulma asteina.</summary>
        static void Polku(float s, float vauhti, float kaarre, out float x, out float z, out float kulma)
        {
            float q = s / 14f;
            z = -0.075f + vauhti * s;
            x = kaarre * 0.014f * q * q;
            kulma = Mathf.Atan2(kaarre * 0.028f * q / 14f, vauhti) * Mathf.Rad2Deg;
        }

        /// <summary>Lapsen paikka whale framessa p, kierto q ja skaala; roottorin (c, s) kompensointi.</summary>
        static void Aseta(Transform l, Vector3 p, Quaternion q, Vector3 koko, Vector3 c, float s)
        {
            float k = 1f / s;
            l.localPosition = (p - c) * k;
            l.localRotation = q;
            l.localScale = koko * k;
        }

        static void Piilota(Transform l) => l.localScale = Vector3.zero;

        // Puhalluksen pallot: korkeus (osuus suihkun korkeudesta, 1 = latva), sivu (V-muoto, ± levenee ylöspäin) ja syvyys.
        static readonly float[] PuhF = { 1.0f, 0.93f, 0.86f, 0.77f, 0.68f, 0.58f, 0.47f, 0.35f, 0.22f, 0.1f };
        static readonly float[] PuhX = { 0.85f, -1.0f, 0.3f, -0.55f, 1.0f, -0.8f, 0.55f, -0.4f, 0.3f, -0.15f };
        static readonly float[] PuhZ = { 0.2f, -0.6f, 0.9f, 0.1f, -0.7f, 0.5f, -0.2f, 0.6f, -0.4f, 0.1f };

        /// <summary>Puhalluksen pallo k hetkellä aika (s puhalluksen alusta): suihku ampuu ylös noin 0,4 s:ssa (latva
        /// ensin), levenee V:ksi ja pensaaksi, ajelehtii tuulen mukana ja häipyy alhaalta ylöspäin (2,6 s).</summary>
        static bool Puhallus(float aika, int k, float voima, float tuuli, out Vector3 siirto, out float koko)
        {
            float a = (aika - 0.03f * k) / 2.6f;
            siirto = Vector3.zero; koko = 0f;
            if (a < 0f || a > 1f) return false;
            float f = PuhF[k];
            float y = 0.11f * voima * f * Ulos(a / 0.16f) + 0.018f * a * f;
            float x = PuhX[k] * (0.003f + 0.16f * y) * (1f + 0.5f * a) + tuuli * 0.02f * a * f;
            float z = PuhZ[k] * 0.005f - 0.022f * a * (0.3f + f);
            siirto = new Vector3(x, y, z);
            float kasvu = 0.4f + 0.6f * Ulos(a / 0.25f) + 0.25f * a;
            float haipyy = 1f - Pehmea((a - (0.3f + 0.4f * f)) / 0.3f);
            koko = (0.5f + 0.95f * f) * Mathf.Sqrt(voima) * kasvu * haipyy;
            return koko > 0.02f;
        }

        /// <summary>Läiskäytyksen roiske k: kruunu iskukohdasta (lapojen suunnassa leveämpi), kaari ylös ja takaisin.</summary>
        static bool Roiske(float aika, int k, out Vector3 siirto, out float koko)
        {
            float a = (aika - 0.02f * k) / 1.1f;
            siirto = Vector3.zero; koko = 0f;
            if (a < 0f || a > 1f) return false;
            float kulma = k * 2.39996f;
            float r = (0.012f + 0.045f * Ulos(a)) * (0.7f + 0.075f * ((k * 7) % 5));
            siirto = new Vector3(Mathf.Cos(kulma) * r, 0.04f * Mathf.Sin(Mathf.PI * a) * (0.6f + 0.13f * ((k * 3) % 4)), Mathf.Sin(kulma) * r * 0.6f);
            koko = 0.95f * Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * a)), 0.7f);
            return koko > 0.02f;
        }

        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (roottori == null || lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);

            // Näytöksen vaihtelu siemenestä (EI MONOTONIAA): suunta, vauhti ja kaarre, puhallusten voima ja tuuli, kaaren
            // korkeus, notkahduksen ajoitus ja keinunnan vaihe.
            float suunta = (Aikataulu.Arvo(n, 3) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 4) - 0.5f) * 50f;
            float vauhti = 0.0072f + 0.0032f * Aikataulu.Arvo(n, 5);
            float kaarre = (Aikataulu.Arvo(n, 6) - 0.5f) * 1.2f;
            float voima1 = 0.85f + 0.3f * Aikataulu.Arvo(n, 7), voima2 = 0.72f + 0.38f * Aikataulu.Arvo(n, 8);
            float tuuli = (Aikataulu.Arvo(n, 9) - 0.5f) * 2f;
            float kaari = 1.28f + 0.34f * Aikataulu.Arvo(n, 10);
            float vaihe = Aikataulu.Arvo(n, 11) * 6.283f;
            float p1 = 0.65f + 0.35f * Aikataulu.Arvo(n, 12);
            float notkoAlku = (0.27f + 0.07f * Aikataulu.Arvo(n, 13)) * pituus;
            float p2 = notkoAlku + 2.1f;
            float sukellus = Mathf.Max(pituus - 6.2f, p2 + 0.9f);
            float f0 = sukellus + 1.15f, isku1 = f0 + 1.2f, isku2 = f0 + 2.3f;

            // ---- Selkä: nousu, notkahdus, kaari ja painuminen (y-skaala), kaaressa pää painuu (z-skaala takapäästä) ----
            Polku(s, vauhti, kaarre, out float bx, out float bz, out float bkulma);
            float nousu = Mathf.Lerp(0.12f, 1f, Pehmea(s / 1.6f));
            float notko = 1f - 0.45f * Mathf.Sin(Mathf.PI * Mathf.Clamp01((s - notkoAlku) / 2.2f));
            float aalto = 1f + 0.04f * Mathf.Sin(1.9f * s + vaihe);
            float sy, sz = 1f, sk = 1f;
            if (!harv)
            {
                // Kaari: selkä nousee korkeaksi kyttyräksi ja lyhenee edestä nivelen suuntaan (pää painuu), ja samalla
                // pyrstönvarsi ja lavat nousevat pintaan sen taakse (pyrstönvarren kaari, koko valas näkyy); sitten selkä
                // painuu ja haamu kutistuu syvemmälle, kun lavat nousevat. Ei kallistusta: nokan painaminen veisi pään ja evät
                // jalanjäljen alle, jolloin syvyystesti peittäisi ne ja ääriviiva jäisi näkyviin.
                float ka = Pehmea((s - sukellus) / 0.9f), kb = Pehmea((s - sukellus - 0.95f) / 1.0f);
                sy = nousu * notko * aalto * (1f + (kaari - 1f) * ka) * (1f - kb);
                sz = 1f - 0.18f * ka;
                sk = 1f - 0.3f * kb;
            }
            else
            {
                float kh = Pehmea((s - sukellus) / 1.2f), kb = Pehmea((s - isku2 - 0.2f) / 0.9f);
                sy = nousu * notko * aalto * (1f - 0.45f * kh) * (1f - kb);
                sk = 1f - 0.3f * kb;
            }
            // Selkä skaalautuu nivelen (pyrstönvarren tyvi) ympäri, joten varsi pysyy kiinni selässä; keinunta pienenee matalana.
            var yawB = Quaternion.Euler(0f, bkulma, 0f);
            var selkaQ = yawB * Quaternion.Euler(0f, 0f, 0.8f * Mathf.Min(1f, sy) * Mathf.Sin(0.9f * s + vaihe));
            var selkaS = new Vector3(sk, sy, sz * sk);
            var selkaP = new Vector3(bx, 0f, bz) + yawB * new Vector3(0f, 0f, NivelZ) - selkaQ * new Vector3(0f, 0f, NivelZ * selkaS.z);
            var aukko = selkaP + selkaQ * new Vector3(0f, AukkoH * sy, AukkoZ * selkaS.z);

            // ---- Pyrstö: nivel seuraa selkää, kunnes lavat nousevat (harvinaisessa koko ajan, valas makaa pinnassa) ----
            Polku(harv ? s : Mathf.Min(s, f0), vauhti, kaarre, out float fx, out float fz, out float fkulma);
            var yawF = Quaternion.Euler(0f, fkulma, 0f);
            var nivel = new Vector3(fx, 0f, fz) + yawF * new Vector3(0f, 0f, NivelZ);
            // Pyrstönvarsi ja lavat tulevat pintaan kaaren aikana (lavat vaakatasossa pinnassa, nivel koholla selän
            // takapään päällä), ja f0:sta lavat kääntyvät pystyyn nivelen laskiessa vesirajaan.
            float sa = s - sukellus - 0.3f, sp = s - f0, alfa = -2f, kz = 0f, kierre = 0f;
            if (sa >= 0f)
            {
                float esiin = Pehmea(sa / 0.6f);
                if (!harv)
                {
                    float ylos = Pehmea(sp / 1.2f), alas = Pehmea((sp - 2.2f) / 1.1f);
                    alfa = Mathf.Lerp(-2f, 94f, ylos) + 10f * alas + 2.5f * Mathf.Sin(sp * 2.3f + vaihe) * ylos;
                    kz = Mathf.Lerp(0.3f, 1f, esiin) * (1f - alas);
                    kierre = 4f * Mathf.Sin(sp * 1.7f + vaihe) * ylos;
                }
                else
                {
                    // Harvinainen: lavat nousevat korkeammalle ja läiskähtävät kahdesti pintaan (isku1, isku2).
                    if (sp < 0f) alfa = -2f;
                    else if (sp < 0.9f) alfa = Mathf.Lerp(-2f, 92f, Pehmea(sp / 0.9f));
                    else if (sp < 1.2f) alfa = Mathf.Lerp(92f, -2f, Pehmea((sp - 0.9f) / 0.3f));
                    else if (sp < 2.0f) alfa = Mathf.Lerp(-2f, 92f, Pehmea((sp - 1.2f) / 0.8f));
                    else if (sp < 2.3f) alfa = Mathf.Lerp(92f, -2f, Pehmea((sp - 2.0f) / 0.3f));
                    kz = Mathf.Lerp(0.3f, 1.05f, esiin) * (1f - Pehmea((sp - 2.45f) / 0.6f));
                }
            }
            // Nivel on vaakatasossa vesirajan yläpuolella (lavat lepäävät pinnassa eivätkä painu jalanjäljen alle).
            var nivelP = nivel + new Vector3(0f, 0.012f * (1f - Mathf.Clamp01(alfa / 45f)), 0f);
            var pyrstoQ = yawF * Quaternion.Euler(alfa, 0f, 0f) * Quaternion.Euler(0f, 0f, kierre);

            // ---- Roottori: vaahtorengas ja jalanjälki paikallaan pintautumiskohdan ja pyrstön nivelen välissä (ne ovat
            // lähes samassa kohdassa, koska valas etenee näytöksen aikana noin puolet selän pituudesta): vaahto leviää
            // pintautuessa, laajenee hitaasti, ja jalanjälki uusiutuu lapojen noustessa ja läiskäytyksissä ----
            Polku(0f, vauhti, kaarre, out float x0, out float z0, out float _);
            Polku(f0, vauhti, kaarre, out float gx, out float gz, out float gkulma);
            var nivelF0 = new Vector3(gx, 0f, gz) + Quaternion.Euler(0f, gkulma, 0f) * new Vector3(0f, 0f, NivelZ);
            var c = 0.5f * (new Vector3(x0, 0f, z0 - 0.01f) + nivelF0);
            float sr = 0.45f + 0.6f * Pehmea(s / 2.2f) + 0.06f * Mathf.Clamp01((s - 2.2f) / 6f) + 0.22f * Pehmea((s - f0 + 0.3f) / 2.2f);
            if (harv) sr += 0.1f * (Pehmea((s - isku1) / 0.35f) + Pehmea((s - isku2) / 0.35f));
            var kierto = Quaternion.Euler(0f, suunta, 0f);
            roottori.localRotation = kierto;
            roottori.localPosition = kierto * c;
            roottori.localScale = new Vector3(sr, sr, sr);

            // ---- Lapset ----
            if (sy > 0.06f) Aseta(lapset[0], selkaP, selkaQ, selkaS, c, sr);
            else Piilota(lapset[0]);

            var pyrsto = lapset[Lapsia + Lapsia2];
            if (sa >= 0f && kz > 0.03f) Aseta(pyrsto, nivelP, pyrstoQ, new Vector3(1f, 1f, kz), c, sr);
            else Piilota(pyrsto);

            var isku = nivel + yawF * new Vector3(0f, 0f, -0.075f);
            for (int k = 0; k < Lapsia2; k++)
            {
                var pallo = lapset[Lapsia + k];
                Vector3 p; float koko;
                if (Puhallus(s - p1, k, voima1, tuuli, out var d, out koko)) p = aukko + yawB * d;
                else if (Puhallus(s - p2, k, voima2, tuuli, out d, out koko)) p = aukko + yawB * d;
                else if (harv && (Roiske(s - isku1, k, out d, out koko) || Roiske(s - isku2, k, out d, out koko))) p = isku + yawF * d;
                else if (!harv && sp > 0.35f && sp < 3.4f && kz > 0.08f && k >= 2)
                {
                    // Valuva vesi: kahdeksan litistettyä palloa pyrstönvarren tyvelle vesirajaan (lavoilta valuva vesi kuohuu
                    // renkaana; tipat pieninä palloina näyttivät ruskeilta helmiltä), sykkivät ja hiipuvat pyrstön liukuessa.
                    float kulma = (k - 2) * 0.785f + 0.4f, sade = 0.012f + 0.007f * ((k * 5) % 3) * 0.5f;
                    float syke = 0.8f + 0.2f * Mathf.Sin(sp * 7f + k * 1.9f);
                    float l = (0.45f + 0.08f * (k % 3)) * Pehmea((sp - 0.35f) / 0.5f) * (1f - Pehmea((sp - 2.9f) / 0.5f)) * syke;
                    p = nivel + yawF * new Vector3(Mathf.Cos(kulma) * sade, 0.0015f, Mathf.Sin(kulma) * sade * 0.8f - 0.004f);
                    if (l < 0.02f) { Piilota(pallo); continue; }
                    Aseta(pallo, p, Quaternion.identity, new Vector3(l, l * 0.45f, l), c, sr);
                    continue;
                }
                else { Piilota(pallo); continue; }
                Aseta(pallo, p, Quaternion.identity, new Vector3(koko, koko, koko), c, sr);
            }
        }
    }
}
