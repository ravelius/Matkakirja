using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTE: MAJAKKALAIVA uudella laatutasolla (omistaja 27.9.2026: "Nuo voisi tehdä korkeammalla laadulla"; speksi
    /// docs/raportit/meri-laatu-speksi-20260927.md, erän 1 kaava). Korvaa vanhan MeriMajakkalaivan samalla nimellä,
    /// merillä, koolla ja aikataululla (siemen 942): laiva ankkurissa, heiluu hitaasti ankkurin ympäri, keinuu mainingissa,
    /// ja lyhdyn keila kiertää vedenpinnalla. Verkot MeriRakentajalla MeriMalli-varjostimelle.
    ///
    /// Klassinen Pohjanmeren ja Itämeren majakkalaiva: PUNAINEN runko (korostusväri kylkien yläosassa ja lyhdyn kuvussa,
    /// vain tällä lajilla, noin 14 % näkyvästä alasta pelikoossa 35°:ssa), tumma vesirajan kaista (ei nimeä: keksitty
    /// asemanimi samana kaikissa maissa esittäisi fiktiota faktana, Fable 27.9.2026 klo 18.3x), vaalea kaide, kaareva kansilinja, kylki
    /// kallistuu taitteesta sisään (ylhäältä punainen reunus) ja pyöreä perä. Keskellä vankka lyhtytorni haruksineen:
    /// tasanne kaiteineen (paperi ja muste), lyhty lasiruutuineen ja punainen kupu, huipputangossa musta päivämerkkipallo.
    /// Pieni kansirakennus (sumutorvi, kattoikkuna, savupiippu), kaksi pelastusvenettä taaveteissa, perämasto
    /// ratsastuspurjeineen, ankkuripeli ja kettinki keulan kettinkiaukosta veteen (väre siinä, missä kettinki katoaa).
    /// Vesikerros roottorin alussa: pehmeä varjo, virran keulakuohu ja kylkien viikset sekä perän pyörteet (ei vanavettä).
    ///
    /// Rakenne (+z keula, +y ylös, meren pinta y = 0, 1 yksikkö = KokoPt pistettä; origo lyhtytornin tyvessä vesirajassa,
    /// runko 0,128 ≈ 36 pt). Kaikki lapset ovat roottorin origossa (x = z = 0), joten ElavatElementitin
    /// LapsetOmaanPisteeseen ei irrota niitä laivasta liioitellussa perspektiivissä:
    ///   Lapsi  (3) keila: vaalea kiila vedenpinnalla (vesikerros, Vaahto alfa ≤ 0,25, säteittäiset juovat), kiertää tornin
    ///          ympäri vaakatasossa (keinunta kumottu): 0 pääkeila, 1 vastakkainen keila noin joka kolmannessa näytöksessä
    ///          (kahden keilan tunnus, muuten skaala 0), 2 harvinaisen leimahduksen kirkaste (sama kiila päällekkäin, leveys
    ///          kasvaa leimahduksen mukana).
    ///   Lapsi2 (1) leimahdus: lyhdyn ympärille vaakasuora hehkurengas ja kahdeksan sädettä (vesikerros), lyhdyn korkeudella.
    ///   Lapsi3 (4) sumutorven äänirenkaat: ohut vaahtorengas vedenpinnalla, laajenee laivasta (kaksi harjaa törähdystä kohden).
    /// Harvinainen (noin 1/10, kuten vanhassa): sumutorvi, kaksi törähdystä 3,2 s:n välein, pari 36 s:n välein: jokaisesta
    /// törähdyksestä kaksi laajenevaa rengasta, lyhty leimahtaa ja keila kirkastuu ja pitenee.
    /// Animoi on deterministinen ajasta eikä allokoi.
    /// </summary>
    public static class MeriMajakkalaiva
    {
        public const string Nimi = "majakkalaiva";
        public static readonly string[] Meret = { "pohjanmeri", "itameri" };
        /// <summary>Runko 0,128 yksikköä → noin 36 pt (sama mittakaava kuin merilaivalla).</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(942, 60f, 180f, 20f, 60f);
        const int Renkaita = 4;
        public const int Lapsia = 3, Lapsia2 = 1, Lapsia3 = Renkaita;

        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Ääriviivan raja: osa, jonka vaakasuora puolileveys on tätä pienempi, jää ilman ääriviivaa (köydet,
        /// kettinki, torni, veneet); runko, kansirakennus, lyhtykokonaisuus ja ratsastuspurje saavat viivan.</summary>
        const float ReunaMinimi = 0.007f;
        const float KeulaZ = 0.066f, PeraPullistus = 0.0045f;
        const float Leveys = 0.0145f;
        /// <summary>Parrasvarustuksen korkeus kannesta ja sisäpinnan etäisyys ulkopinnasta.</summary>
        const float Kaide = 0.0024f, KaideSisa = 0.0014f;
        /// <summary>Vesirajan tumma kaista (y 0 → SaapasY) ja kyljen taite (leveimmillään), jonka yläpuolella kylki kallistuu
        /// sisään (ylhäältä näkyy punainen reunus kannen ympärillä).</summary>
        const float SaapasY = 0.0040f, PolviY = 0.0058f;
        /// <summary>Lyhtytorni origossa: torni kannelta tasanteelle, tasanne, lyhty, kupu ja päivämerkkipallo.</summary>
        const float TorniYla = 0.0560f, TasanneY = 0.0582f, TasanneR = 0.0090f, LyhtyAla = 0.0591f, LasiAla = 0.0604f,
            LasiYla = 0.0690f, LyhtyR = 0.0058f, KupuYla = 0.0736f, PalloY = 0.0898f, PalloR = 0.0046f, HuippuY = 0.0968f;
        /// <summary>Lyhdyn keskikorkeus (leimahduksen hehku).</summary>
        const float LyhtyKeskiY = 0.5f * (LasiAla + LasiYla);
        /// <summary>Kansirakennus (tornin takana), perämasto ja pelastusveneet.</summary>
        const float TaloZ0 = -0.0335f, TaloZ1 = -0.0062f, TaloLeveys = 0.0148f, TaloKorkeus = 0.0066f;
        const float PeramastoZ = -0.0505f, PeramastoYla = 0.0445f, VeneZ = -0.0405f;
        /// <summary>Kettinki: kettinkiaukko oikealla keulassa ja kohta, jossa kettinki katoaa veteen (heilunnan napa).</summary>
        static readonly Vector3 Kettinkiaukko = new Vector3(0.0066f, 0.0118f, 0.0586f);
        static readonly Vector3 AnkkuriPiste = new Vector3(0.0032f, 0f, 0.0885f);
        /// <summary>Lasten vesikerrosten korkeudet: myöhemmin piirtyvä ylempänä, jotta syvyystesti päästää sen läpi, ja
        /// roottorin vesikerroksen (≤ 0,0012) yläpuolella myös suurimmassa keinunnassa (kallistus 6°, nyökkäys 1,8°, nousu).</summary>
        const float KeilaY = 0.0048f, RengasY = 0.0052f;
        /// <summary>Viivojen säde (≥ 0,0008 ≈ 0,45 pt; laitteella MSAA pois).</summary>
        const float Viiva = 0.0008f;

        // ---- Värit: vain B-seepiaramppi (alfa 0) ja pelin punainen (alfa 1) ----

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static readonly Color Punainen = MeriRakentaja.Punainen;
        static readonly Color Saapas = R(0.22f), KaideYla = R(1.95f), KaideSisaVari = R(1.6f), KansiVari = R(1.18f);
        static readonly Color TaloSeina = R(1.8f), TaloKatto = R(1.95f), Ikkuna = R(0.4f), Ovi = R(0.55f);
        static readonly Color TorniVari = R(1.5f), Jalusta = R(1.1f), TasanneYla = R(1.95f), TasanneReuna = R(1.45f);
        static readonly Color Kaiteet = R(0.22f), LyhtyJalka = R(1.2f), Lasi = R(1.98f), Puite = R(0.2f), Reunus = R(0.3f);
        static readonly Color Kupu = MeriRakentaja.Punainen, Nuppi = R(0.3f), Pallovari = R(0.08f), Tanko = R(0.6f);
        static readonly Color MastoVari = R(0.7f), Purje = R(1.97f), Puomi = R(0.6f), Koysi = R(0.35f);
        static readonly Color Vene = R(1.85f), VenePeite = R(1.3f), Taavetti = R(0.5f);
        static readonly Color Kettinki = R(0.18f), Aukko = R(0.05f), Peli = R(0.55f), PeliKansi = R(0.8f), Messinki = R(1.55f);
        static readonly Color Tuuletin = R(1.8f), Suu = R(0.2f), Luukku = R(0.95f), LuukkuKansi = R(0.75f), Piippu = R(0.25f);

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y; }

        // ---- Rungon muoto ----

        /// <summary>Kannen korkeus kohdassa z: kansilinja nousee keulaan selvästi (majakkalaivan korkea keula), perään vähän.</summary>
        static float KansiY(float z)
        {
            if (z >= 0f) return 0.0100f + 0.0058f * Mathf.Pow(Mathf.Clamp01(z / KeulaZ), 2.2f);
            float p = Mathf.Clamp01(-z / 0.0615f);
            return 0.0100f + 0.0021f * p * p;
        }

        /// <summary>Parrasvarustuksen korkeus: keulassa korkeampi.</summary>
        static float KaideH(float z) => Kaide + 0.0010f * Mathf.Clamp01((z - 0.040f) / 0.026f);

        /// <summary>Kannen reunan puolileveys: täyteläinen pyöreä keula ja pyöreään peräkaareen kapeneva perä.</summary>
        static float Puoli(float z)
        {
            const float zEtu = 0.010f, zTaka = -0.022f, zPera = -0.057f;
            if (z >= zEtu)
            {
                float q = Mathf.Clamp01((z - zEtu) / (KeulaZ - zEtu));
                return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(q, 2.1f)), 0.58f);
            }
            if (z <= zTaka)
            {
                float p = Mathf.Clamp01((zTaka - z) / (zTaka - zPera));
                return Leveys * (1f - 0.42f * p * p);
            }
            return Leveys;
        }

        /// <summary>Kyljen poikkileikkaus: siirto ulos kannen reunasta korkeudella y (vesiraja hieman sisempänä, taite
        /// leveimpänä, kansi ja kaide kallistuvat sisään).</summary>
        static float Profiili(float y, float d, float h)
        {
            if (y <= SaapasY) return Mathf.Lerp(-0.0004f, 0.0004f, y / SaapasY);
            if (y <= PolviY) return Mathf.Lerp(0.0004f, 0.0019f, (y - SaapasY) / (PolviY - SaapasY));
            if (y <= d) return Mathf.Lerp(0.0019f, 0f, (y - PolviY) / (d - PolviY));
            return Mathf.Lerp(0f, -0.0006f, (y - d) / h);
        }

        /// <summary>Keulavarsi ja perä kallistuvat: vesirajassa z kerrotaan 0,905:llä, kannella 1:llä.</summary>
        static float Rake(float y, float d) => 0.905f + 0.095f * Mathf.Pow(Mathf.Clamp01(y / d), 0.8f);

        static readonly float[] Asemat = { 0.0625f, 0.058f, 0.052f, 0.045f, 0.037f, 0.028f, 0.018f, 0.008f, -0.004f, -0.016f,
            -0.027f, -0.037f, -0.045f, -0.052f, -0.057f };
        static readonly float[] AsematKauko = { 0.058f, 0.045f, 0.028f, 0.008f, -0.016f, -0.037f, -0.052f, -0.057f };

        /// <summary>Rungon ääriviiva ylhäältä kannen reunan tasolla (x, z): keulan kärki, oikea kylki keulasta perään, peräkaari
        /// ja vasen kylki perästä keulaan.</summary>
        static Vector2[] Silmukka(bool kauko, out int asemia, out int kaaria)
        {
            var a = kauko ? AsematKauko : Asemat;
            asemia = a.Length; kaaria = kauko ? 2 : 5;
            var p = new Vector2[1 + 2 * asemia + kaaria];
            int k = 0;
            p[k++] = new Vector2(0f, KeulaZ);
            for (int i = 0; i < asemia; i++) p[k++] = new Vector2(Puoli(a[i]), a[i]);
            float xs = Puoli(a[asemia - 1]), zs = a[asemia - 1];
            for (int i = 1; i <= kaaria; i++) { float q = Mathf.PI * i / (kaaria + 1); p[k++] = new Vector2(xs * Mathf.Cos(q), zs - PeraPullistus * Mathf.Sin(q)); }
            for (int i = asemia - 1; i >= 0; i--) p[k++] = new Vector2(-Puoli(a[i]), a[i]);
            return p;
        }

        /// <summary>Kyljen piste: silmukan piste p, ulkonormaali nn, korkeus y.</summary>
        static Vector3 Kylki(Vector2 p, Vector3 nn, float y)
        {
            float d = KansiY(p.y), h = KaideH(p.y), rk = Rake(y, d), o = Profiili(y, d, h);
            return new Vector3(p.x + nn.x * o, y, p.y * rk + nn.z * o);
        }

        // ---- Mallit ----

        public static Mesh Roottori() => Rakenna(false);

        /// <summary>Kaukotaso (≤ 800 kolmiota): sama siluetti harvemmin jaoin, ilman kaiteen
        /// pylväitä, ikkunoita, tuulettimia ja köysiä.</summary>
        public static Mesh RoottoriKauko() => Rakenna(true);

        static Mesh Rakenna(bool kauko)
        {
            var r = new MeriRakentaja(ReunaMinimi);
            Vesikerros(r, kauko);
            Runko(r, kauko);
            Kansirakenteet(r, kauko);
            Torni(r, kauko);
            Peramasto(r, kauko);
            for (int k = 0; k < 2; k++) Pelastusvene(r, k == 0 ? 1f : -1f, kauko);
            KeulanVarusteet(r, kauko);
            return r.Verkko(kauko ? "majakkalaiva-kauko" : "majakkalaiva");
        }

        // ---- Vesikerros ----

        /// <summary>Vesinelikulmio kärkiväreineen (rakentaja kääntää vesikolmiot ylös).</summary>
        static void VesiNelio(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        {
            r.KolmioVarit(a, b, d, ca, cb, cd);
            r.KolmioVarit(a, d, e, ca, cd, ce);
        }

        /// <summary>Pehmeäreunainen vaahtojuova käyrää pitkin: keskellä alfa, reunoilla 0 (reunat eivät porrastu ilman MSAA:ta).</summary>
        static void Juova(MeriRakentaja r, System.Func<float, Vector3> kaari, System.Func<float, float> leveys,
            System.Func<float, float> alfa, Color vari, int jaot)
        {
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 p0 = kaari(q0), p1 = kaari(q1);
                Vector3 s0 = Sivu(kaari, q0) * (0.5f * leveys(q0)), s1 = Sivu(kaari, q1) * (0.5f * leveys(q1));
                Color c0 = MeriRakentaja.Alfa(vari, alfa(q0)), c1 = MeriRakentaja.Alfa(vari, alfa(q1)), nolla = MeriRakentaja.Alfa(vari, 0f);
                VesiNelio(r, p0 - s0, p0, p1, p1 - s1, nolla, c0, c1, nolla);
                VesiNelio(r, p0, p0 + s0, p1 + s1, p1, c0, nolla, nolla, c1);
            }
        }

        static Vector3 Sivu(System.Func<float, Vector3> kaari, float q)
        {
            var t = kaari(Mathf.Min(1f, q + 0.01f)) - kaari(Mathf.Max(0f, q - 0.01f));
            t.y = 0f;
            return Vector3.Cross(Vector3.up, t).normalized;
        }

        /// <summary>
        /// Vesikerros roottorin alussa (ankkurissa, ei vanavettä): pehmeä varjo rungon alla (Animoi ei tiedä kartan
        /// ilmansuuntia, joten keskellä), vesirajan ohut vaahtoreunus, virran keulakuohu sirppinä keulavarren ympärillä ja
        /// kylkien viikset taakse, perän kaksi pientä pyörrettä ja kettingin väre (sirppi vastavirtaan ja V myötävirtaan).
        /// </summary>
        static void Vesikerros(MeriRakentaja r, bool kauko)
        {
            r.Vesi = true;
            var vaahto = MeriRakentaja.Vaahto;
            r.Soikio(new Vector3(0f, 0.0002f, -0.0015f), 0.0275f, 0.0820f, MeriRakentaja.VarjoVari, 0.17f, 0f, kauko ? 12 : 20);
            // Vesirajan vaahtoreunus kylkiä pitkin (virta ohittaa rungon: keulassa kirkkaampi).
            if (!kauko)
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f;
                    Juova(r, q => { float z = Mathf.Lerp(0.050f, -0.050f, q); return new Vector3(p * (0.985f * Puoli(z / 0.905f) + 0.0012f), 0.0006f, z); },
                        q => Mathf.Lerp(0.0030f, 0.0020f, q), q => Mathf.Lerp(0.50f, 0.14f, q), vaahto, 8);
                }
            // Keulakuohu: sirppi keulavarren edessä (virta tulee keulasta).
            int n = kauko ? 5 : 9;
            var kk = new Vector3(0f, 0.0009f, 0.0592f);
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.Lerp(-1.9f, 1.9f, i / (float)n), a1 = Mathf.Lerp(-1.9f, 1.9f, (i + 1) / (float)n);
                Vector3 s0 = kk + new Vector3(Mathf.Sin(a0) * 0.0040f, 0f, Mathf.Cos(a0) * 0.0030f), s1 = kk + new Vector3(Mathf.Sin(a1) * 0.0040f, 0f, Mathf.Cos(a1) * 0.0030f);
                Vector3 u0 = kk + new Vector3(Mathf.Sin(a0) * 0.0078f, 0f, Mathf.Cos(a0) * 0.0075f), u1 = kk + new Vector3(Mathf.Sin(a1) * 0.0078f, 0f, Mathf.Cos(a1) * 0.0075f);
                float r0 = 0.68f - 0.25f * Mathf.Abs(a0) / 1.9f, r1 = 0.68f - 0.25f * Mathf.Abs(a1) / 1.9f;
                var nolla = MeriRakentaja.Alfa(vaahto, 0f);
                VesiNelio(r, s0, s1, u1, u0, MeriRakentaja.Alfa(vaahto, r0), MeriRakentaja.Alfa(vaahto, r1), nolla, nolla);
            }
            // Kylkien viikset keulan olkapäiltä taakse (loiva virta: lyhyet ja himmeät).
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f, a = 21f * Mathf.Deg2Rad;
                var alku = new Vector3(p * 0.0075f, 0.0010f, 0.0525f);
                var suunta = new Vector3(p * Mathf.Sin(a), 0f, -Mathf.Cos(a));
                Juova(r, q => alku + suunta * (0.045f * q), q => Mathf.Lerp(0.0028f, 0.0055f, q), q => 0.48f * (1f - q) * (1f - 0.3f * q), vaahto, kauko ? 2 : 4);
            }
            // Perän pyörteet: kaksi lyhyttä kaarevaa juovaa perän takana, ja himmeä sileä kaista virran alapuolella.
            if (!kauko)
            {
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f;
                    Juova(r, q => new Vector3(p * (0.0045f + 0.004f * Mathf.Sin(Mathf.PI * q)), 0.0008f, -0.0585f - 0.022f * q),
                        q => 0.0022f, q => 0.30f * Mathf.Sin(Mathf.PI * Mathf.Min(1f, q * 1.3f)) * (1f - 0.5f * q), vaahto, 5);
                }
                Juova(r, q => new Vector3(0f, 0.0007f, -0.060f - 0.040f * q), q => Mathf.Lerp(0.008f, 0.014f, q), q => 0.16f * (1f - q), vaahto, 3);
            }
            // Kettingin väre: pieni sirppi kettingin vastavirran puolella ja V myötävirtaan (kohti laivaa).
            var kp = AnkkuriPiste + new Vector3(0f, 0.0011f, 0f);
            int m = kauko ? 3 : 6;
            for (int i = 0; i < m; i++)
            {
                float a0 = Mathf.Lerp(-1.6f, 1.6f, i / (float)m), a1 = Mathf.Lerp(-1.6f, 1.6f, (i + 1) / (float)m);
                Vector3 s0 = kp + new Vector3(Mathf.Sin(a0) * 0.0010f, 0f, Mathf.Cos(a0) * 0.0010f), s1 = kp + new Vector3(Mathf.Sin(a1) * 0.0010f, 0f, Mathf.Cos(a1) * 0.0010f);
                Vector3 u0 = kp + new Vector3(Mathf.Sin(a0) * 0.0032f, 0f, Mathf.Cos(a0) * 0.0030f), u1 = kp + new Vector3(Mathf.Sin(a1) * 0.0032f, 0f, Mathf.Cos(a1) * 0.0030f);
                var nolla = MeriRakentaja.Alfa(vaahto, 0f);
                VesiNelio(r, s0, s1, u1, u0, MeriRakentaja.Alfa(vaahto, 0.5f), MeriRakentaja.Alfa(vaahto, 0.5f), nolla, nolla);
            }
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f, a = 28f * Mathf.Deg2Rad;
                var alku = kp + new Vector3(p * 0.0012f, 0f, -0.0004f);
                var suunta = new Vector3(p * Mathf.Sin(a), 0f, -Mathf.Cos(a));
                Juova(r, q => alku + suunta * (0.011f * q), q => Mathf.Lerp(0.0016f, 0.0026f, q), q => 0.34f * (1f - q), vaahto, kauko ? 1 : 3);
            }
            r.Vesi = false;
        }

        // ---- Runko ----

        /// <summary>
        /// Runko yhtenä ääriviivaosana: kyljet (kaide → punainen parras ja kylki → taite → tumma vesirajan kaista), vaalea
        /// kaiteen yläpinta, parrasvarustuksen sisäpinta ja kansi. Kylki kallistuu taitteesta sisään, joten ylhäältä näkyy
        /// punainen reunus ja 35°:ssa yläkylki valaistuu hieman.
        /// </summary>
        static void Runko(MeriRakentaja r, bool kauko)
        {
            var p = Silmukka(kauko, out int asemia, out int kaaria);
            int m = p.Length;
            var reuna = new Vector3[m]; var karki = new Vector3[m];
            for (int i = 0; i < m; i++) { var e = p[(i + 1) % m] - p[i]; reuna[i] = new Vector3(-e.y, 0f, e.x).normalized; }
            for (int i = 0; i < m; i++) karki[i] = (reuna[(i + m - 1) % m] + reuna[i]).normalized;
            var r0 = new Vector3[m]; var rs = new Vector3[m]; var rp = new Vector3[m]; var rd = new Vector3[m];
            var rk = new Vector3[m]; var ri = new Vector3[m]; var kansi = new Vector3[m];
            for (int i = 0; i < m; i++)
            {
                float d = KansiY(p[i].y), h = KaideH(p[i].y);
                r0[i] = Kylki(p[i], karki[i], 0f);
                rs[i] = Kylki(p[i], karki[i], SaapasY);
                rp[i] = Kylki(p[i], karki[i], PolviY);
                rd[i] = Kylki(p[i], karki[i], d);
                rk[i] = Kylki(p[i], karki[i], d + h);
                ri[i] = new Vector3(p[i].x - karki[i].x * KaideSisa, d + h, p[i].y - karki[i].z * KaideSisa);
                kansi[i] = new Vector3(p[i].x - karki[i].x * KaideSisa, d, p[i].y - karki[i].z * KaideSisa);
            }
            r.AloitaOsa();
            for (int i = 0; i < m; i++)
            {
                int j = (i + 1) % m;
                var ulos = reuna[i];
                r.NelioUlos(r0[i], r0[j], rs[j], rs[i], ulos, Saapas);
                r.NelioUlos(rs[i], rs[j], rp[j], rp[i], ulos, Punainen);
                r.NelioUlos(rp[i], rp[j], rd[j], rd[i], ulos + Vector3.up * 0.3f, Punainen);
                r.NelioUlos(rd[i], rd[j], rk[j], rk[i], ulos, Punainen);
                r.NelioUlos(rk[i], rk[j], ri[j], ri[i], Vector3.up, KaideYla);
                r.NelioUlos(ri[i], ri[j], kansi[j], kansi[i], Vector3.up - ulos, KaideSisaVari);
            }
            // Kansi: keulan kärki kolmiona, kaistat asemittain, peräkaari viuhkana.
            int vasen(int i) => m - i;
            r.KolmioUlos(kansi[0], kansi[1], kansi[vasen(1)], Vector3.up, KansiVari);
            for (int i = 1; i < asemia; i++) r.NelioUlos(kansi[i], kansi[i + 1], kansi[vasen(i + 1)], kansi[vasen(i)], Vector3.up, KansiVari);
            var keski = (kansi[asemia] + kansi[asemia + kaaria + 1]) * 0.5f;
            for (int i = asemia; i <= asemia + kaaria; i++) r.KolmioUlos(keski, kansi[i], kansi[i + 1], Vector3.up, KansiVari);
            r.LopetaOsa();
        }

        // ---- Kansirakenteet ----

        /// <summary>Pieni kansirakennus tornin takana (ikkunat, ovi, kattoikkuna, savupiippu ja sumutorvi katolla), luukku ja
        /// kaksi tuuletinta tornin edessä.</summary>
        static void Kansirakenteet(MeriRakentaja r, bool kauko)
        {
            float zc = 0.5f * (TaloZ0 + TaloZ1), pit = TaloZ1 - TaloZ0;
            float y = Mathf.Min(KansiY(TaloZ0), KansiY(TaloZ1)) - 0.0003f, katto = y + TaloKorkeus;
            r.Laatikko(new Vector3(0f, y, zc), new Vector3(TaloLeveys, TaloKorkeus, pit), TaloSeina, TaloKatto);
            if (!kauko)
            {
                // Ikkunat kyljissä ja ovi etuseinässä.
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f, x = p * (0.5f * TaloLeveys + 0.0001f);
                    for (int i = 0; i < 3; i++)
                    {
                        float z = TaloZ0 + (i + 0.5f) * pit / 3f, w = 0.0022f, y0 = y + 0.38f * TaloKorkeus, y1 = y + 0.72f * TaloKorkeus;
                        r.NelioUlos(new Vector3(x, y0, z - w), new Vector3(x, y0, z + w), new Vector3(x, y1, z + w), new Vector3(x, y1, z - w), new Vector3(p, 0f, 0f), Ikkuna);
                    }
                }
                float zo = TaloZ1 + 0.0001f;
                r.NelioUlos(new Vector3(-0.0017f, y + 0.0003f, zo), new Vector3(0.0017f, y + 0.0003f, zo), new Vector3(0.0017f, y + 0.8f * TaloKorkeus, zo),
                    new Vector3(-0.0017f, y + 0.8f * TaloKorkeus, zo), Vector3.forward, Ovi);
                // Kattoikkuna, savupiippu ja sumutorvi (messinkinen torvi katon etureunassa, suu eteen).
                r.Laatikko(new Vector3(0f, katto, -0.0215f), new Vector3(0.0054f, 0.0012f, 0.0060f), TaloSeina, LuukkuKansi);
                r.Tanko(new Vector3(-0.0042f, katto, -0.0285f), new Vector3(-0.0042f, katto + 0.0048f, -0.0285f), Viiva, Viiva, 4, Piippu, true);
                r.Tanko(new Vector3(0.0040f, katto, -0.0105f), new Vector3(0.0040f, katto + 0.0022f, -0.0105f), 0.0005f, 0.0005f, 3, Messinki, false);
                r.Tanko(new Vector3(0.0040f, katto + 0.0022f, -0.0112f), new Vector3(0.0040f, katto + 0.0026f, -0.0072f), 0.0004f, 0.0013f, 5, Messinki, true);
                // Tuulettimet tornin edessä: putki ja suu eteen.
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f, zt = 0.0105f, yt = KansiY(zt);
                    var ala = new Vector3(p * 0.0058f, yt - 0.0002f, zt);
                    var yla = ala + new Vector3(0f, 0.0042f, 0f);
                    r.Tanko(ala, yla, 0.0008f, 0.0008f, 5, Tuuletin, false);
                    r.Tanko(yla - new Vector3(0f, 0.0006f, 0.0004f), yla + new Vector3(0f, 0.0004f, 0.0012f), 0.0010f, 0.0016f, 6, Tuuletin, false);
                    var suu = yla + new Vector3(0f, 0.0004f, 0.00125f);
                    for (int i = 0; i < 6; i++)
                    {
                        float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                        r.KolmioUlos(suu, suu + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * 0.0013f, suu + new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f) * 0.0013f, Vector3.forward, Suu);
                    }
                }
            }
            // Luukku tornin edessä.
            float zl = 0.027f;
            r.Laatikko(new Vector3(0f, KansiY(zl) - 0.0002f, zl), new Vector3(0.0068f, 0.0014f, 0.0060f), Luukku, LuukkuKansi);
        }

        // ---- Lyhtytorni ----

        /// <summary>Monikulmainen prisma (vaippa, valinnaisesti kansi) akselilla y: säde r, korkeudet y0 → y1, sivuja n.</summary>
        static void Prisma(MeriRakentaja r, float r0, float r1, float y0, float y1, int n, Color vaippa, Color? kansi, float kierto = 0f)
        {
            for (int i = 0; i < n; i++)
            {
                float a0 = kierto + i * 2f * Mathf.PI / n, a1 = kierto + (i + 1) * 2f * Mathf.PI / n, am = 0.5f * (a0 + a1);
                Vector3 s0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), s1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var ulos = new Vector3(Mathf.Cos(am), (r0 - r1) / Mathf.Max(1e-5f, y1 - y0), Mathf.Sin(am));
                r.NelioUlos(s0 * r0 + Vector3.up * y0, s1 * r0 + Vector3.up * y0, s1 * r1 + Vector3.up * y1, s0 * r1 + Vector3.up * y1, ulos, vaippa);
                if (kansi.HasValue && r1 > 1e-5f) r.KolmioUlos(Vector3.up * y1, s0 * r1 + Vector3.up * y1, s1 * r1 + Vector3.up * y1, Vector3.up, kansi.Value);
            }
        }

        /// <summary>
        /// Lyhtytorni origossa: vankka torni kannelta (tyvessä kaulus), kartiomainen kannatin, paperinen tasanne ja musteinen
        /// kaide pylväineen, lyhty (jalka, vaaleat lasiruudut tummin puittein, reunus) ja punainen kupu (korostus: lyhdyn
        /// tunnistaa pelikoossa punaisesta kuvusta ja mustasta pallosta) yhtenä ääriviivaosana; tuuletinnuppi, harukset
        /// (keulaharus ja kaksi vanttia), huipputanko ja musta päivämerkkipallo, joka on kuvun yläpuolella erillään myös 35°:ssa.
        /// </summary>
        static void Torni(MeriRakentaja r, bool kauko)
        {
            int n = kauko ? 6 : 10;
            float kansi = KansiY(0f);
            // Kaulus ja torni (ohuet: ei ääriviivaa; keskisävyinen torni erottuu merestä ja punaisesta kyljestä).
            r.Tanko(new Vector3(0f, kansi - 0.0003f, 0f), new Vector3(0f, kansi + 0.0016f, 0f), 0.0044f, 0.0042f, n, Jalusta, true);
            r.Tanko(new Vector3(0f, kansi, 0f), new Vector3(0f, TorniYla, 0f), 0.0034f, 0.0027f, n, TorniVari, false);
            // Lyhtykokonaisuus yhtenä osana (ääriviiva kiertää tasanteen, lasin ja kuvun).
            r.AloitaOsa();
            Prisma(r, 0.0027f, TasanneR * 0.92f, TorniYla, TasanneY, n, Jalusta, null);
            Prisma(r, TasanneR, TasanneR, TasanneY, LyhtyAla, n, TasanneReuna, TasanneYla, Mathf.PI / n);
            Prisma(r, LyhtyR + 0.0002f, LyhtyR + 0.0002f, LyhtyAla, LasiAla, n, LyhtyJalka, null, Mathf.PI / n);
            Prisma(r, LyhtyR, LyhtyR, LasiAla, LasiYla, n, Lasi, null, Mathf.PI / n);
            Prisma(r, LyhtyR + 0.0006f, LyhtyR + 0.0006f, LasiYla, LasiYla + 0.0006f, n, Reunus, Reunus, Mathf.PI / n);
            // Kupu: kaksi kaistaa ja kärki.
            float ky = LasiYla + 0.0006f;
            Prisma(r, LyhtyR + 0.0006f, 0.0040f, ky, ky + 0.0024f, n, Kupu, null, Mathf.PI / n);
            Prisma(r, 0.0040f, 0f, ky + 0.0024f, KupuYla, n, Kupu, null, Mathf.PI / n);
            r.LopetaOsa();
            if (!kauko)
            {
                // Lasiruutujen puitteet kulmissa (kapeat tummat nauhat lasin päällä).
                for (int i = 0; i < n; i++)
                {
                    float a = i * 2f * Mathf.PI / n + Mathf.PI / n;
                    var s = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                    var t = new Vector3(-s.z, 0f, s.x) * 0.00050f;
                    var p = s * (LyhtyR * 1.004f + 0.0001f);
                    r.NelioUlos(p - t + Vector3.up * LasiAla, p + t + Vector3.up * LasiAla, p + t + Vector3.up * LasiYla, p - t + Vector3.up * LasiYla, s, Puite);
                }
                // Tuuletinnuppi kuvun huipulla.
                r.Pallo(new Vector3(0f, KupuYla + 0.0005f, 0f), 0.0011f, Nuppi, 0);
            }
            // Tasanteen kaide: pylväät monikulmion kulmissa ja kaidepuu (jokainen pala oma osansa: ei ääriviivaa).
            float kr = TasanneR - 0.0005f, ky0 = LyhtyAla, ky1 = LyhtyAla + 0.0033f;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * 2f * Mathf.PI / n + Mathf.PI / n, a1 = (i + 1) * 2f * Mathf.PI / n + Mathf.PI / n;
                Vector3 s0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * kr, s1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * kr;
                if (!kauko) r.Tanko(s0 + Vector3.up * ky0, s0 + Vector3.up * ky1, Viiva, Viiva, 3, Kaiteet, false);
                r.Tanko(s0 + Vector3.up * ky1, s1 + Vector3.up * ky1, Viiva, Viiva, 3, Kaiteet, false);
            }
            // Harukset: keulaharus tasanteen alta keulavarren kaiteelle ja kaksi vanttia taakse kaiteelle (ohuet viivat paloina).
            if (!kauko)
            {
                var kiinni = new Vector3(0f, TorniYla - 0.0020f, 0f);
                Pala(r, kiinni + new Vector3(0f, 0f, 0.0022f), new Vector3(0f, KansiY(KeulaZ) + KaideH(KeulaZ), KeulaZ - 0.0020f), Viiva, Viiva, 3, Koysi);
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f;
                    Pala(r, kiinni + new Vector3(p * 0.0020f, 0f, -0.0010f), KaidePiste(-0.0090f, p), Viiva, Viiva, 3, Koysi);
                }
            }
            // Huipputanko ja päivämerkkipallo.
            r.Tanko(new Vector3(0f, KupuYla, 0f), new Vector3(0f, HuippuY, 0f), 0.0010f, 0.0008f, 4, Tanko, true);
            r.Pallo(new Vector3(0f, PalloY, 0f), PalloR, Pallovari, kauko ? 1 : 2);
            if (!kauko) r.Pallo(new Vector3(0f, HuippuY + 0.0004f, 0f), 0.0008f, Tanko, 0);
        }

        // ---- Perämasto ja ratsastuspurje ----

        static Vector3 KaidePiste(float z, float puoli) => new Vector3(puoli * (Puoli(z) - 0.0006f), KansiY(z) + KaideH(z), z);

        /// <summary>Ohut tanko paloina, joiden vaakamitta jää ääriviivarajan alle (köysi ei saa paksua viivaa).</summary>
        static void Pala(MeriRakentaja r, Vector3 a, Vector3 b, float r0, float r1, int sivuja, Color vari)
        {
            var d = b - a;
            float vaaka = Mathf.Sqrt(d.x * d.x + d.z * d.z), pala = 1.6f * ReunaMinimi;
            int n = 1 + (int)(vaaka / pala);
            for (int i = 0; i < n; i++)
            {
                float q0 = i / (float)n, q1 = (i + 1) / (float)n;
                r.Tanko(a + d * q0, a + d * q1, Mathf.Lerp(r0, r1, q0), Mathf.Lerp(r0, r1, q1), sivuja, vari, false);
            }
        }

        /// <summary>
        /// Perämasto ja ratsastuspurje (pitää majakkalaivan keulan tuulta ja virtaa vasten): kolmion muotoinen purje
        /// maston ja perän yli ulottuvan puomin välissä, hieman kaareva (kaksipuolinen kalvo, ääriviiva), puomi, skuutti
        /// peräkaiteelle ja kaksi vanttia.
        /// </summary>
        static void Peramasto(MeriRakentaja r, bool kauko)
        {
            float kansi = KansiY(PeramastoZ);
            r.Tanko(new Vector3(0f, kansi, PeramastoZ), new Vector3(0f, PeramastoYla, PeramastoZ - 0.0008f), 0.0012f, 0.0008f, kauko ? 4 : 5, MastoVari, true);
            var halssi = new Vector3(0f, kansi + 0.0040f, PeramastoZ - 0.0012f);
            var huippu = new Vector3(0f, PeramastoYla - 0.0025f, PeramastoZ - 0.0015f);
            var kulma = new Vector3(0f, kansi + 0.0056f, -0.0700f);
            var nl = new Vector3(1f, 0f, 0f);
            int j = kauko ? 2 : 4;
            r.Pinta((u, v) => Vector3.Lerp(Vector3.Lerp(halssi, kulma, u), huippu, v) + nl * (0.0014f * Mathf.Sin(Mathf.PI * u) * Mathf.Sin(Mathf.PI * Mathf.Min(1f, 0.15f + v))),
                j, j, (u, v) => Purje, true);
            Pala(r, halssi - new Vector3(0f, 0.0006f, 0f), kulma - new Vector3(0f, 0.0006f, 0f), 0.0007f, 0.0006f, kauko ? 3 : 4, Puomi);
            if (kauko) return;
            Pala(r, kulma - new Vector3(0f, 0.0008f, 0f), new Vector3(0f, KansiY(-0.060f) + KaideH(-0.060f), -0.0605f), Viiva, Viiva, 3, Koysi);
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Pala(r, new Vector3(0f, PeramastoYla - 0.006f, PeramastoZ - 0.0007f), KaidePiste(PeramastoZ + 0.004f, p), Viiva, Viiva, 3, Koysi);
            }
        }

        // ---- Pelastusveneet ----

        /// <summary>Pelastusvene taaveteissa kyljen ulkopuolella perämaston edessä: vaalea kaksikeulainen runko ja tummempi peite,
        /// taavetit kaiteelta kaarena veneen päälle (pieni: ei ääriviivaa).</summary>
        static void Pelastusvene(MeriRakentaja r, float p, bool kauko)
        {
            const float L = 0.0118f, B = 0.0021f, D = 0.0017f;
            float zc = VeneZ, yc = KansiY(zc) + 0.0048f, xc = p * (Puoli(zc) + 0.0027f);
            int n = kauko ? 2 : 4;
            for (int i = 0; i < n; i++)
            {
                float s0 = -1f + 2f * i / n, s1 = -1f + 2f * (i + 1) / n;
                float b0 = B * Mathf.Pow(Mathf.Max(0f, 1f - s0 * s0), 0.55f), b1 = B * Mathf.Pow(Mathf.Max(0f, 1f - s1 * s1), 0.55f);
                for (int k = 0; k < 2; k++)
                {
                    float q = k == 0 ? 1f : -1f;
                    Vector3 g0 = new Vector3(xc + q * b0, yc, zc + 0.5f * L * s0), g1 = new Vector3(xc + q * b1, yc, zc + 0.5f * L * s1);
                    Vector3 k0 = new Vector3(xc + q * 0.35f * b0, yc - D, zc + 0.44f * L * s0), k1 = new Vector3(xc + q * 0.35f * b1, yc - D, zc + 0.44f * L * s1);
                    r.NelioUlos(k0, k1, g1, g0, new Vector3(q, -0.3f, 0f), Vene);
                }
                Vector3 h0 = new Vector3(xc, yc + 0.0006f * Mathf.Max(0f, 1f - s0 * s0), zc + 0.5f * L * s0), h1 = new Vector3(xc, yc + 0.0006f * Mathf.Max(0f, 1f - s1 * s1), zc + 0.5f * L * s1);
                r.NelioUlos(new Vector3(xc + b0, yc, zc + 0.5f * L * s0), new Vector3(xc + b1, yc, zc + 0.5f * L * s1), h1, h0, Vector3.up, VenePeite);
                r.NelioUlos(h0, h1, new Vector3(xc - b1, yc, zc + 0.5f * L * s1), new Vector3(xc - b0, yc, zc + 0.5f * L * s0), Vector3.up, VenePeite);
            }
            if (kauko) return;
            foreach (float dz in new[] { -0.0040f, 0.0040f })
            {
                var tyvi = KaidePiste(zc + dz, p) - new Vector3(0f, 0.0012f, 0f);
                var polvi = new Vector3(p * (Puoli(zc + dz) + 0.0008f), yc + 0.0040f, zc + dz);
                var karki = new Vector3(xc, yc + 0.0034f, zc + dz);
                r.Tanko(tyvi, polvi, 0.0006f, 0.0006f, 3, Taavetti, false);
                r.Tanko(polvi, karki, 0.0006f, 0.0006f, 3, Taavetti, false);
            }
        }

        // ---- Keula: ankkuripeli, kettinkiaukko ja kettinki ----

        /// <summary>
        /// Ankkuripeli keulakannella (jalusta ja rumpu), tumma kettinkiaukko oikeassa keulassa ja
        /// kettinki aukosta eteen ja alas veteen (loiva riippu, lenkit vuorottain paksumpina); vesikerroksen väre on
        /// täsmälleen siinä, missä kettinki katoaa veteen (AnkkuriPiste, heilunnan napa).
        /// </summary>
        static void KeulanVarusteet(MeriRakentaja r, bool kauko)
        {
            // Ankkuripeli: matala jalusta ja rumpu poikittain (kettinki kulkee kannen alta kettinkiaukolle).
            float zp = 0.049f, yp = KansiY(zp);
            r.Laatikko(new Vector3(0f, yp - 0.0002f, zp), new Vector3(0.0072f, 0.0019f, 0.0034f), Peli, PeliKansi);
            r.Tanko(new Vector3(-0.0040f, yp + 0.0022f, zp), new Vector3(0.0040f, yp + 0.0022f, zp), 0.0012f, 0.0012f, kauko ? 4 : 6, Kettinki, true);
            // Kettinkiaukko: tumma soikio kyljessä (normaali ulos keulan suuntaan).
            var ulos = new Vector3(0.78f, 0.05f, 0.62f).normalized;
            var t1 = Vector3.Cross(Vector3.up, ulos).normalized; var t2 = Vector3.up;
            int n = kauko ? 4 : 7;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * 2f * Mathf.PI / n, a1 = (i + 1) * 2f * Mathf.PI / n;
                var c = Kettinkiaukko + ulos * 0.00025f;
                r.KolmioUlos(c, c + (t1 * Mathf.Cos(a0) * 0.0013f + t2 * Mathf.Sin(a0) * 0.0010f), c + (t1 * Mathf.Cos(a1) * 0.0013f + t2 * Mathf.Sin(a1) * 0.0010f), ulos, Aukko);
            }
            // Kettinki kettinkiaukosta eteen ja alas veteen.
            var alku = Kettinkiaukko + ulos * 0.0003f;
            var loppu = AnkkuriPiste - new Vector3(0f, 0.0006f, 0f);
            int m = kauko ? 3 : 10;
            for (int i = 0; i < m; i++)
            {
                float q0 = i / (float)m, q1 = (i + 1) / (float)m;
                Vector3 a = Vector3.Lerp(alku, loppu, q0) - new Vector3(0f, 0.0022f * Mathf.Sin(Mathf.PI * q0), 0f);
                Vector3 b = Vector3.Lerp(alku, loppu, q1) - new Vector3(0f, 0.0022f * Mathf.Sin(Mathf.PI * q1), 0f);
                float rr = kauko ? 0.0009f : (i % 2 == 0 ? 0.00105f : 0.0008f);
                r.Tanko(a, b, rr, rr, kauko ? 3 : 4, Kettinki, false);
            }
        }

        // ---- Lapset ----

        /// <summary>
        /// Keila (lapset 0–2, vesikerros): vaakasuora kiila vedenpinnalla, kärki origossa (tornin alla: runko peittää kärjen
        /// syvyystestissä) ja suunta +z, puolikulma 12,5° (leveys kasvaa ulospäin 12 %), pituus 0,215. Alfa (Vaahto ≤ 0,25)
        /// nousee rungon kohdalla, on suurimmillaan noin 0,05:ssä ja häipyy kärkeä kohti; poikittain pehmeät reunat ja viisi
        /// säteittäistä juovaa (kaiverrusilme lähikuvassa, pelikoossa vaalea kiila). 100 kolmiota.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            float[] sade = { 0.008f, 0.022f, 0.050f, 0.095f, 0.150f, 0.215f };
            float[] aS = { 0f, 0.21f, 0.25f, 0.20f, 0.09f, 0f };
            const int J = 10;
            float puoli = 12.5f * Mathf.Deg2Rad;
            var p = new Vector3[sade.Length, J + 1];
            var c = new Color[sade.Length, J + 1];
            for (int i = 0; i < sade.Length; i++)
                for (int j = 0; j <= J; j++)
                {
                    float u = j / (float)J, a = Mathf.Lerp(-puoli, puoli, u);
                    // Leveys kasvaa hieman ulospäin (keila hajoaa): kulma 1,0 → 1,12.
                    float lev = 1f + 0.12f * i / (sade.Length - 1f);
                    p[i, j] = new Vector3(Mathf.Sin(a * lev) * sade[i], 0f, Mathf.Cos(a * lev) * sade[i]);
                    float reuna = Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * u)), 0.7f);
                    float juova = j % 2 == 1 ? 1f : 0.72f;
                    c[i, j] = MeriRakentaja.Alfa(MeriRakentaja.Vaahto, aS[i] * reuna * (j == 0 || j == J ? 0f : juova));
                }
            for (int i = 0; i + 1 < sade.Length; i++)
                for (int j = 0; j < J; j++)
                    VesiNelio(r, p[i, j], p[i + 1, j], p[i + 1, j + 1], p[i, j + 1], c[i, j], c[i + 1, j], c[i + 1, j + 1], c[i, j + 1]);
            r.Vesi = false;
            return r.Verkko("majakkalaiva-keila");
        }

        /// <summary>
        /// Leimahdus (lapsi 2, vesikerros): lyhdyn ympärille vaakasuora hehkurengas (alfa 0,5 lasin kohdalta → 0) ja
        /// kahdeksan sädettä (pitkät ja lyhyet vuorotellen), origo lyhdyn keskellä; Animoi skaalaa sen leimahduksen mukaan.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(1f);
            r.Vesi = true;
            var v = MeriRakentaja.Vaahto;
            r.Rengas(Vector3.zero, LyhtyR, LyhtyR, 0.0125f, 0.0125f, v, 0.5f, 0f, 16);
            for (int k = 0; k < 8; k++)
            {
                float a = k * Mathf.PI / 4f + Mathf.PI / 8f, pit = k % 2 == 0 ? 0.030f : 0.019f, w = k % 2 == 0 ? 0.0016f : 0.0012f;
                var s = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)); var t = new Vector3(-s.z, 0f, s.x);
                var tyvi = s * (LyhtyR + 0.0004f);
                r.KolmioVarit(tyvi - t * w, s * pit, tyvi + t * w, MeriRakentaja.Alfa(v, 0.6f), MeriRakentaja.Alfa(v, 0f), MeriRakentaja.Alfa(v, 0.6f));
            }
            r.Vesi = false;
            return r.Verkko("majakkalaiva-leimahdus");
        }

        /// <summary>
        /// Sumutorven äänirengas (lapset 3–6, vesikerros): ohut vaahtorengas säteellä 1 (Animoi skaalaa säteen), pehmeät
        /// reunat (alfa 0 → 0,2 → 0) ja hieman epäsäännöllinen muoto (käsin kaiverrettu). Uloin harja johtaa, sisempi seuraa.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            var v = MeriRakentaja.Vaahto;
            const int n = 30;
            for (int i = 0; i < n; i++)
            {
                float k0 = i * 2f * Mathf.PI / n, k1 = (i + 1) * 2f * Mathf.PI / n;
                float m0 = 1f + 0.018f * Mathf.Sin(3f * k0 + 0.4f) + 0.012f * Mathf.Sin(7f * k0 + 1.9f);
                float m1 = 1f + 0.018f * Mathf.Sin(3f * k1 + 0.4f) + 0.012f * Mathf.Sin(7f * k1 + 1.9f);
                Vector3 d0 = new Vector3(Mathf.Cos(k0), 0f, Mathf.Sin(k0)) * m0, d1 = new Vector3(Mathf.Cos(k1), 0f, Mathf.Sin(k1)) * m1;
                Color nolla = MeriRakentaja.Alfa(v, 0f), huippu = MeriRakentaja.Alfa(v, 0.2f);
                VesiNelio(r, d0 * 0.955f, d1 * 0.955f, d1, d0, nolla, nolla, huippu, huippu);
                VesiNelio(r, d0, d1, d1 * 1.022f, d0 * 1.022f, huippu, huippu, nolla, nolla);
            }
            r.Vesi = false;
            return r.Verkko("majakkalaiva-rengas");
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Sumutorven törähdyspari hetkellä s (harvinainen näytös, vanhan ajoitus): aika parin alusta tai −1. Kaksi törähdystä
        /// 3,2 s:n välein, pari toistuu 36 s:n välein 12–18 s:sta alkaen, kunhan pari renkaineen mahtuu ennen lyhdyn sammumista.
        /// </summary>
        static float Pari(int n, float s, float pituus)
        {
            float p0 = 12f + 6f * Aikataulu.Arvo(n, 7);
            if (s < p0) return -1f;
            float pari = p0 + 36f * (int)((s - p0) / 36f);
            if (pari + 7f > pituus - 4f) return -1f;
            return s - pari;
        }

        /// <summary>Leimahduksen voimakkuus törähdyksen iästä a: nousu 0,25 s, pito 0,55 s, lasku 1 s.</summary>
        static float Leimahdus(float a) => a < 0f ? 0f : Pehmea(a / 0.25f) * (1f - Pehmea((a - 0.8f) / 1f));

        /// <summary>Mainingin sarjat: 22–34 s:n välein noin 8 s:n ryhmä isompia aaltoja, voimakkuus sarjoittain siemenestä.</summary>
        static float Sarja(int n, float s)
        {
            float jakso = 22f + 12f * Aikataulu.Arvo(n, 14), x = s + jakso * Aikataulu.Arvo(n, 15);
            int i = (int)(x / jakso);
            float w = x - i * jakso;
            if (w > 8f) return 0f;
            float k = Mathf.Sin(Mathf.PI * w / 8f);
            return k * k * (0.45f + 0.55f * MeriGeometria.Arpa(942 + n, i, 3));
        }

        /// <summary>
        /// Majakkalaivan näytös: laiva ankkurissa merellä (x −0,065…−0,105 kuten vanhassa), keula virtaa vasten pohjoiseen tai
        /// etelään (±15° jaksosta), ja se heiluu hitaasti ankkurin ympäri (napa on kettingin vesikohta, amplitudi 4–8° ja
        /// jakso 38–56 s siemenestä). Keinunta: kallistus 1,5–2,8° (jakso 4,6–6,4 s) ja nyökkäys, mainingin sarjoissa
        /// enemmän; nousu. Lyhty syttyy näytöksen alussa (keila kasvaa 2,5 s) ja sammuu lopussa; keila kiertää vaakatasossa
        /// 7,5–11,5 s:ssa, suunta, vaihe ja pituus näytöksittäin. Harvinainen: sumutorvi (renkaat, leimahdus ja kirkas keila).
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float x0 = -0.065f - 0.04f * Aikataulu.Arvo(n, 4);
            float suunta = (Aikataulu.Arvo(n, 3) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 5) - 0.5f) * 30f;
            float v = t + Aikataulu.Arvo(n, 6) * 20f;

            // Heilunta ankkurin ympäri: keula pysyy kettingin luona ja perä heilahtaa.
            float hA = 4f + 4f * Aikataulu.Arvo(n, 8), hJ = 38f + 18f * Aikataulu.Arvo(n, 9);
            float heilu = hA * (Mathf.Sin(v * 2f * Mathf.PI / hJ) + 0.3f * Mathf.Sin(v * 2f * Mathf.PI / (0.47f * hJ) + 1.1f)) / 1.2f;
            // Keinunta mainingissa (kaksi taajuutta, sarjoissa isompi).
            float sarja = Sarja(n, s);
            float kA = (1.5f + 1.3f * Aikataulu.Arvo(n, 10)) * (1f + 0.7f * sarja), kJ = 4.6f + 1.8f * Aikataulu.Arvo(n, 11);
            float kv = v * 2f * Mathf.PI / kJ;
            float kallistus = kA * (Mathf.Sin(kv) + 0.3f * Mathf.Sin(2.37f * kv + 1f));
            float nyokkays = (0.7f + 0.5f * Aikataulu.Arvo(n, 12)) * (1f + 0.5f * sarja) * Mathf.Sin(v * 2f * Mathf.PI / (3.3f + 1.2f * Aikataulu.Arvo(n, 13)) + 2f);
            float nousu = 0.0006f * (1f + 0.6f * sarja) * Mathf.Sin(v * 1.37f);
            var kierto = Quaternion.Euler(0f, suunta + heilu, 0f);
            var keinunta = Quaternion.Euler(nyokkays, 0f, kallistus);
            var ankkuri = new Vector3(x0, 0f, 0f) + Quaternion.Euler(0f, suunta, 0f) * AnkkuriPiste;
            roottori.localPosition = ankkuri - kierto * AnkkuriPiste + new Vector3(0f, nousu, 0f);
            roottori.localRotation = kierto * keinunta;
            roottori.localScale = Vector3.one;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var tasoon = Quaternion.Inverse(keinunta);

            // Sumutorvi (harvinainen): törähdysten iät parin alusta.
            float u = harv ? Pari(n, s, pituus) : -1f;
            float ua = u, ub = u < 0f ? -1f : u - 3.2f;
            float leim = u < 0f ? 0f : Mathf.Max(Leimahdus(ua), Leimahdus(ub));

            // Keila: lyhty syttyy ja sammuu, kiertää vaakatasossa (keinunta kumottu); leimahduksessa pitempi ja kirkkaampi.
            float valo = Pehmea((s - 1f) / 2.5f) * Pehmea((pituus - 1.5f - s) / 2.5f);
            // Tunnus näytöksittäin: noin joka kolmannessa kaksi vastakkaista keilaa (hitaampi kierros), muuten yksi; kierroksen
            // kesto, suunta, vaihe, keilan pituus ja leveys siemenestä.
            bool kaksi = Aikataulu.Arvo(n, 20) < 0.35f;
            float kierrosS = (7.5f + 4f * Aikataulu.Arvo(n, 16)) * (kaksi ? 1.4f : 1f), kiertosuunta = Aikataulu.Arvo(n, 17) < 0.5f ? 1f : -1f;
            float kulma = kiertosuunta * 360f * Mathf.Repeat(s / kierrosS + Aikataulu.Arvo(n, 18), 1f);
            float pit = (0.88f + 0.24f * Aikataulu.Arvo(n, 19)) * valo, lev = (0.85f + 0.35f * Aikataulu.Arvo(n, 21)) * valo;
            var paikka = tasoon * new Vector3(0f, KeilaY - nousu, 0f);
            var asento = tasoon * Quaternion.Euler(0f, kulma, 0f);
            var keila = lapset[0];
            keila.localPosition = paikka;
            keila.localRotation = asento;
            keila.localScale = valo > 0.001f ? new Vector3(lev * (1f + 0.3f * leim), 1f, pit * (1f + 0.3f * leim)) : Vector3.zero;
            var toinen = lapset[1];
            toinen.localPosition = paikka;
            toinen.localRotation = tasoon * Quaternion.Euler(0f, kulma + 180f, 0f);
            toinen.localScale = kaksi && valo > 0.001f ? new Vector3(lev * (1f + 0.3f * leim), 1f, 0.86f * pit * (1f + 0.3f * leim)) : Vector3.zero;
            var kirkas = lapset[2];
            kirkas.localPosition = paikka + tasoon * new Vector3(0f, 0.0001f, 0f);
            kirkas.localRotation = asento;
            kirkas.localScale = leim * valo > 0.01f ? new Vector3(lev * leim * (1f + 0.3f * leim), 1f, pit * (1f + 0.3f * leim)) : Vector3.zero;

            // Leimahdus lyhdyn ympärillä (kiertyy keilan mukana, kallistuu laivan mukana).
            var hehku = lapset[Lapsia];
            hehku.localPosition = new Vector3(0f, LyhtyKeskiY, 0f);
            hehku.localRotation = Quaternion.Euler(0f, kulma, 0f);
            float hk = (0.55f + 0.45f * leim) * Mathf.Min(1f, leim * 3f);
            hehku.localScale = hk > 0.01f ? Vector3.one * hk : Vector3.zero;

            // Äänirenkaat: kustakin törähdyksestä kaksi harjaa (0,4 s välein); säde kasvaa hidastuen 0,03 → 0,23, sisempi harja
            // katoaa aiemmin.
            for (int k = 0; k < Renkaita; k++)
            {
                var rengas = lapset[Lapsia + Lapsia2 + k];
                float a = (k < 2 ? ua : ub) - 0.4f * (k % 2);
                float elina = k % 2 == 0 ? 3.0f : 2.3f;
                if (u < 0f || a <= 0f || a >= elina) { rengas.localScale = Vector3.zero; continue; }
                float sade = 0.030f + 0.20f * Ulos(a / 3.0f) * (k % 2 == 0 ? 1f : 0.93f);
                rengas.localPosition = tasoon * new Vector3(0f, RengasY - nousu + 0.0001f * k, 0f);
                rengas.localRotation = tasoon;
                rengas.localScale = new Vector3(sade, 1f, sade);
            }
        }
    }
}
