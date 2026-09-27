// MEREN KORISTEIDEN LAATUTASO: DELFIINIT (pullokuonodelfiinit). Speksi docs/raportit/meri-laatu-speksi-20260927.md
// (Linssiseppä 27.9.2026, omistaja: "Nuo voisi tehdä korkeammalla laadulla"; delfiineille "kaari"). Korvaa vanhan
// MeriDelfiinit-lajin samalla nimellä, merillä, koolla ja aikataululla (siemen 923, näytös 6–10 s, tauko 40–90 s).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// DELFIINIT MeriMalli-varjostimelle. Näytös (aikataulu ja siemen 923 ennallaan): 2–3 pullokuonodelfiinin parvi ui
    /// rannikon suuntaan pohjoiseen tai etelään (jaksosta) ja etenee tasaisesti Matka-yksikköä kuten vanha laji. Jokainen
    /// delfiini hyppää muodostelmapaikastaan parven tahdissa (2,05–2,35 s) porrastetusti kärjestä tai perästä alkaen:
    /// kiihdyttää pinnan alla (haamu), puhkaisee pinnan nokka edellä (pisararoiske ja rengas), kaartaa puhtaan kaaren
    /// (painopiste paraabelilla, lakikorkeus noin puoli ruumiinpituutta; asento seuraa lentorataa, nokka ylös lähtiessä ja
    /// alas sukeltaessa, ja runko kiertyy rataa nopeammin, jolloin pyrstö näyttää potkaisevan) ja sukeltaa nokka edellä
    /// kapeaan roiskeeseen ja renkaaseen. Pinnalla varjo seuraa runkoa. Sukelluksen jälkeen haamu liukuu ja kutistuu pois
    /// (syvälle) ja nousee heti takaisin paikalleen muodostelmaan (vanhan lajin "jää pinnan alla takaisin paikalleen"),
    /// joten hypyt saavat olla pitkiä kaaria parven kulkematta liian kauas. Joskus delfiini ei hyppää vaan kääntyy pinnassa
    /// (selkäevä nousee ja painuu). EI MONOTONIAA: 2 tai 3 delfiiniä, muodostelman peilaus, tahti, järjestys ja porrastus,
    /// hypyn korkeus, jyrkkyys, kesto ja suunta (±12°), pintakäännökset ja suuntapoikkeamat siemenestä. Harvinainen (noin
    /// 1/10, ei koskaan ensimmäinen näytös): viimeisen delfiinin viimeinen hyppy on korkea kierrehyppy (kiertyy
    /// pituusakselinsa ympäri, vaalea vatsa välähtää) ja sukellus nostaa ison roiskeen (kruunu ja keskipatsas, iso rengas).
    ///
    /// Rakenne (mallin avaruus: +z uintisuunta, +y ylös, meren pinta y = 0; 1 yksikkö = 250 pt; delfiini nokasta pyrstön
    /// kärkiin 0,106 ≈ 26 pt). LOD0 2 870 kolmiota, kaukotaso sama (roottori tyhjä):
    ///   Roottori  tyhjä verkko (kuten vanhassa lajissa): roottori kallistuu liioitellussa perspektiivissä oman origonsa
    ///             ympäri ja piirtyy ennen lapsia, joten parven levyinen vesikerros siinä kirjoittaisi syvyyden lasten veden ja
    ///             runkojen eteen. Animoi asettaa sen parven keskelle uintisuuntaan, skaala 1 (lapsia ei tarvitse korjata).
    ///   Lapsi     (3 × 372) delfiini (kiinteä, ääriviiva): virtaviivainen runko (Pinta 15 × 10, selkä kaartuu hieman),
    ///             selvä nokka ja jyrkkä otsa (meloni), sirppimäinen selkäevä, rintaevät (kolmiot ääriviivarajan alla) ja
    ///             vaakasuorat pyrstön lavat omana ääriviivaosanaan; tumma selkä 0,42, viitan raja 0,46–0,9, kylki 1,5,
    ///             vaalea vatsa ja alaleuka 1,8. Origo painopisteessä. Nousussa ja sukelluksessa runko puristuu
    ///             pituusakselinsa suuntaan vesirajaan (nokka tai pyrstö paikallaan), koska pinta ei peitä veden alle jäävää
    ///             osaa laitteella.
    ///   Lapsi2    (3 × 120) haamu ja varjo (vesikerros: siluetti rintaevineen ja lapoineen, pehmeä reuna, lyhyt vana) ja
    ///             selkäevä pystylevynä (kiinteä, ei ääriviivaa): delfiinin vesipisteessä koko ajan. Uidessa tumma haamu;
    ///             hypyssä sama muoto on rungon alla varjona (z-skaala = cos kallistus); sukeltaessa xz-skaala → 0.
    ///             Pintakäännöksessä y-skaala nostaa evän; muulloin y-skaala 0,00001 litistää pystylevyn näkymättömäksi.
    ///   Lapsi3    (17 × 82) roiskeosa, kaksi roolia yhdellä verkolla: vesirengas (vesikerros, sisälevy ja harja) ja
    ///             pisara (pieni paperinen pallo renkaan tason päällä, ei ääriviivaa). Rengasrooli (paikat 0–5):
    ///             pystyssä vesipisteessä, xz-skaala = säde, y-skaala 0,6, jolloin pisara on renkaan keskellä pieni litteä
    ///             vaahtohiutale. Pisararooli (6–16): käännetty 180° x-akselin ympäri, jolloin vesirengas osoittaa alas ja
    ///             Cull Back piilottaa sen (laite ja piirra.py), ja litistetty pisara lentää heittoliikkeenä pinnan
    ///             yläpuolella ja katoaa, kun sen alareuna osuu veteen. Renkaat kiertävät paikoissa järjestyksessä (vanhin
    ///             väistyy, kun uusi syntyy), pisarat varaavat vapaan paikan (ison roiskeen pisarat ensin).
    /// Laitteen ääriviivapiirto (Cull Off, ZWrite Off, ennen mallia) piirtää jokaisen kiinteän kolmion musteena, myös
    /// ääriviivattomat; siksi mikään kiinteä osa ei jää veden (syvyyden kirjoittava vesikerros) alle piiloon: runko puristuu
    /// vesirajaan vatsan syvyys huomioiden, pisarat pysyvät pinnan yläpuolella ja renkaan hiutale on sen tason päällä.
    /// Vesikerrosten korkeudet: renkaat 0,0004, haamut 0,0008 (laitteella lapset piirtyvät etäisyysjärjestyksessä, ja vesi
    /// kirjoittaa syvyyden: haamu jää aina päällimmäiseksi). Lasten paikat asetetaan roottorin avaruudessa, ja jokaisen lapsen
    /// origo on sen omassa vesipisteessä tai sen yläpuolella (LapsetOmaanPisteeseen: hyppäävä delfiini nousee suoraan
    /// vesipisteensä yläpuolelle myös liioitellussa perspektiivissä). Värit vain rampista (Rampi, kärjen alfa 0) ja
    /// vesikerroksen Vaahto/VarjoVari. Animoi ei allokoi: suunnitelma lasketaan näytöksen vaihtuessa staattisiin taulukoihin.
    /// </summary>
    public static class MeriDelfiinit
    {
        public const string Nimi = "delfiinit";
        public static readonly string[] Meret = { "valimeri", "atlantti" };
        /// <summary>Delfiini 0,106 yksikköä → noin 26 pt; parvi hypyissä noin 0,3 → 75 pt (valaan mittakaava).</summary>
        public const float KokoPt = 250f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(923, 6f, 10f, 40f, 90f);
        const int Renkaita = 6, Pisaroita = 11;
        public const int Lapsia = 3, Lapsia2 = 3, Lapsia3 = Renkaita + Pisaroita;

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y * y; }
        static float Kupu(float u, float p) => Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * Mathf.Clamp01(u))), p);

        // =====================================================================================================================
        // Mitat
        // =====================================================================================================================

        // Rungon asemat pyrstön tyvestä (−z) nokan kärkeen (+z): puolileveys W, selkä YT ja vatsa YB painopisteen tasosta.
        // Nokka (rostrum) on ohut ja matala, otsa (meloni) nousee siitä jyrkästi, ja pyrstönvarsi on sivuttain litistynyt.
        static readonly float[] RZ = { -0.0540f, -0.0480f, -0.0400f, -0.0310f, -0.0220f, -0.0130f, -0.0040f, 0.0050f, 0.0130f,
            0.0200f, 0.0252f, 0.0290f, 0.0314f, 0.0345f, 0.0385f, 0.0415f };
        static readonly float[] RW = { 0f, 0.0013f, 0.0022f, 0.0038f, 0.0060f, 0.0077f, 0.0085f, 0.0086f, 0.0080f,
            0.0070f, 0.0058f, 0.0042f, 0.0024f, 0.0016f, 0.0010f, 0f };
        static readonly float[] RT = { 0.0012f, 0.0030f, 0.0048f, 0.0066f, 0.0081f, 0.0092f, 0.0097f, 0.0096f, 0.0090f,
            0.0080f, 0.0065f, 0.0042f, 0.0012f, 0.0004f, -0.0003f, -0.0012f };
        static readonly float[] RB = { 0.0004f, -0.0016f, -0.0032f, -0.0050f, -0.0066f, -0.0079f, -0.0085f, -0.0085f, -0.0079f,
            -0.0069f, -0.0058f, -0.0047f, -0.0038f, -0.0031f, -0.0023f, -0.0014f };
        const int Ymparys = 10;
        /// <summary>Selän kaari: nokka ja pyrstö painuvat keskikohtaa alemmas (kaareva selkä myötäilee lentorataa).</summary>
        const float KaariK = 0.0026f;
        /// <summary>Nokan kärki ja pyrstön kärjet mallissa (puristus vesirajaan ja roiskeiden paikat).</summary>
        const float NokkaZ = 0.0415f, NokkaY = -0.0013f, PeraZ = -0.0665f, PeraY = -0.0030f;

        static float Kaari(float z) { float q = z / 0.05f; return -KaariK * q * q; }

        // Selkäevä (sirppimäinen): korkeuden osuus t, etureuna ja takareuna z:na; kärki taaksepäin takareunan yli.
        static readonly float[] EvaT = { 0f, 0.36f, 0.7f, 1f };
        static readonly float[] EvaEtu = { -0.0010f, -0.0050f, -0.0128f, -0.0232f };
        static readonly float[] EvaTaka = { -0.0175f, -0.0163f, -0.0176f, -0.0232f };
        const float EvaKorkeus = 0.0128f;

        // Pyrstön lavat (oikea puoli, vasen peilattuna): kärkiväli ±0,0158, etureuna pyyhkäisty taakse, lovi keskellä.
        static readonly float[] LapaS = { 0f, 0.4f, 0.75f, 1f };
        static readonly float[] LapaEtu = { -0.0512f, -0.0536f, -0.0584f, -0.0665f };
        static readonly float[] LapaTaka = { -0.0590f, -0.0606f, -0.0622f, -0.0665f };
        const float LapaX0 = 0.0010f, LapaX1 = 0.0158f;

        // Vesikerrosten korkeudet: haamu renkaiden yläpuolella. Laitteella lapset piirtyvät etäisyysjärjestyksessä, ja vesi
        // kirjoittaa syvyyden: jos haamu piirtyy ensin, rengas jää sen alle (haamu päällimmäisenä kuten kuuluukin).
        const float YRengas = 0.0004f, YHaamu = 0.0008f;
        /// <summary>Renkaan säde verkossa (xz-skaala 1) sekä pisaran säde ja keskipisteen korkeus (pisara lepää renkaan
        /// tason päällä).</summary>
        const float RengasSade = 0.012f, PisaraSade = 0.0022f, PisaraY = 0.0022f;
        /// <summary>Pisaran säde pisararoolissa koossa 1 (verkon pisara on pieni, jotta renkaan keskellä oleva hiutale pysyy
        /// pienenä) ja korkeus leveyteen nähden (litteä vaahtohiutale).</summary>
        const float PisaraMitta = 0.0045f, Litistys = 0.55f;

        // =====================================================================================================================
        // Roottori (tyhjä)
        // =====================================================================================================================

        /// <summary>Tyhjä roottori (kuten vanhassa lajissa): roottori kallistuu liioitellussa perspektiivissä oman origonsa
        /// ympäri ja piirtyy ennen lapsia, joten parven levyinen vesikerros siinä kirjoittaisi syvyyden lasten veden ja
        /// rungon eteen (lapset pysyvät vesipisteissään kallistamattomina). Kaikki näkyvä on lapsissa.</summary>
        public static Mesh Roottori() => new MeriRakentaja(1f).Verkko("delfiinit: tyhjä");

        /// <summary>Kaukotaso: sama tyhjä verkko (lapset eivät vaihdu kaukotasossa).</summary>
        public static Mesh RoottoriKauko() => new MeriRakentaja(1f).Verkko("delfiinit: tyhjä kauko");

        // =====================================================================================================================
        // Lapsi: delfiini
        // =====================================================================================================================

        static Vector3 RunkoPiste(int i, float v)
        {
            float z = RZ[i], k = Kaari(z);
            float ym = 0.5f * (RT[i] + RB[i]) + k, hh = 0.5f * (RT[i] - RB[i]);
            float f = 2f * Mathf.PI * v;
            return new Vector3(RW[i] * Mathf.Sin(f), ym + hh * Mathf.Cos(f), z);
        }

        /// <summary>Selän harjan korkeus kohdassa z (evän tyvi).</summary>
        static float HarjaY(float z)
        {
            for (int i = 1; i < RZ.Length; i++)
                if (z <= RZ[i])
                {
                    float q = (z - RZ[i - 1]) / (RZ[i] - RZ[i - 1]);
                    return Mathf.Lerp(RT[i - 1], RT[i], q) + Kaari(z);
                }
            return RT[RT.Length - 1] + Kaari(z);
        }

        /// <summary>Rungon väri: tumma viitta selässä (rajan kohta vaihtelee: kapea päässä, syvä evän edessä), vaaleampi
        /// kylki ja vaalea vatsa; nokan yläpuoli tumma ja alaleuka vaalea.</summary>
        static Color RunkoVari(float u, float v)
        {
            int n = RZ.Length - 1;
            int i = Mathf.Min(n - 1, (int)(u * n));
            float z = 0.5f * (RZ[i] + RZ[i + 1]);
            float a = (v <= 0.5f ? v : 1f - v) * 360f;     // 0 selkä … 180 vatsa
            if (z > 0.0312f) return R(a < 72f ? 0.5f : 1.75f);
            if (a < 36f) return R(0.42f);
            if (a < 72f) return R(z > 0.012f ? 0.9f : z > -0.024f ? 0.46f : 0.66f);
            if (a < 108f) return R(z < -0.036f ? 0.9f : 1.5f);
            return R(z < -0.036f ? 1.3f : 1.8f);
        }

        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            // Runko ja selkäevä yhtenä osana: ääriviiva kiertää koko rungon (evän ohut levy ei saa omaa paksua viivaa).
            r.AloitaOsa();
            int m = RZ.Length;
            r.Pinta((u, v) => RunkoPiste(Mathf.Min(m - 1, (int)(u * (m - 1) + 0.5f)), v), m - 1, Ymparys, RunkoVari, false,
                (u, v) => new Vector3(Mathf.Sin(2f * Mathf.PI * v), Mathf.Cos(2f * Mathf.PI * v), u > 0.93f ? 0.8f : u < 0.07f ? -0.8f : 0f));
            Eva(r, R(0.40f), true);
            r.LopetaOsa();

            // Rintaevät: pienet kaksipuoliset lehdet (kolmiot alle ääriviivarajan, joten ne eivät möykkyydy).
            foreach (float p in new[] { -1f, 1f })
            {
                var a = new Vector3(p * 0.0068f, -0.0046f + Kaari(0.0158f), 0.0158f);
                var b = new Vector3(p * 0.0066f, -0.0053f + Kaari(0.0088f), 0.0088f);
                var d = new Vector3(p * 0.0126f, -0.0073f + Kaari(0.0110f), 0.0110f);
                var c = new Vector3(p * 0.0178f, -0.0098f + Kaari(0.0012f), 0.0012f);
                r.KalvoKolmio(a, d, b, R(0.55f));
                r.KalvoKolmio(d, c, b, R(0.55f));
            }

            // Pyrstön lavat omana osanaan (ääriviiva kiertää lavat ja loven).
            r.AloitaOsa();
            Lavat(r, R(0.42f), R(1.3f));
            r.LopetaOsa();
            return r.Verkko("delfiinit: delfiini");
        }

        /// <summary>Selkäevä: linssimäinen poikkileikkaus (paksuus tyvessä 0,0016), sirppimäinen muoto. Kiinteä runko-osa
        /// (tyvi harjassa) tai haamun pystylevy (tyvi y = 0, ei paksuutta).</summary>
        static void Eva(MeriRakentaja r, Color c, bool rungossa)
        {
            for (int i = 0; i + 1 < EvaT.Length; i++)
            {
                if (rungossa)
                {
                    foreach (float p in new[] { -1f, 1f })
                    {
                        Vector3 e0 = EvaPiste(i, 0, p, true), m0 = EvaPiste(i, 1, p, true), t0 = EvaPiste(i, 2, p, true);
                        Vector3 e1 = EvaPiste(i + 1, 0, p, true), m1 = EvaPiste(i + 1, 1, p, true), t1 = EvaPiste(i + 1, 2, p, true);
                        var ulos = new Vector3(p, 0f, 0f);
                        r.NelioUlos(e0, m0, m1, e1, ulos, c);
                        r.NelioUlos(m0, t0, t1, m1, ulos, c);
                    }
                }
                else
                {
                    r.Kalvo(EvaPiste(i, 0, 0f, false), EvaPiste(i, 2, 0f, false), EvaPiste(i + 1, 2, 0f, false), EvaPiste(i + 1, 0, 0f, false), c);
                }
            }
        }

        /// <summary>Evän piste: asema i, j = 0 etureuna, 1 keskijänne (paksuus), 2 takareuna; puoli ±1.</summary>
        static Vector3 EvaPiste(int i, int j, float puoli, bool rungossa)
        {
            float t = EvaT[i], ze = EvaEtu[i], zt = EvaTaka[i];
            float z = j == 0 ? ze : j == 2 ? zt : Mathf.Lerp(ze, zt, 0.38f);
            float y = rungossa ? HarjaY(z) - 0.0008f + (EvaKorkeus + 0.0008f) * t : 0.0135f * t;
            float x = j == 1 ? puoli * 0.0008f * (1f - t) : 0f;
            return new Vector3(x, y, z);
        }

        static Vector3 LapaPiste(float puoli, int i, int j, float pinta)
        {
            float s = LapaS[i];
            float ze = LapaEtu[i], zt = LapaTaka[i];
            float c = j / 2f;
            float z = Mathf.Lerp(ze, zt, c);
            float paksuus = 0.0008f * (1f - s) * Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * c)), 0.7f);
            float x = puoli * Mathf.Lerp(LapaX0, LapaX1, s);
            return new Vector3(x, Kaari(z) + 0.0004f + pinta * paksuus + 0.0012f * s * s, z);
        }

        /// <summary>Lavat: yläpinta tumma, alapinta vaaleampi; keskikaistale yhdistää lavat loven kohdalla.</summary>
        static void Lavat(MeriRakentaja r, Color yla, Color ala)
        {
            foreach (float p in new[] { -1f, 1f })
                for (int i = 0; i + 1 < LapaS.Length; i++)
                    for (int j = 0; j < 2; j++)
                    {
                        r.NelioUlos(LapaPiste(p, i, j, 1f), LapaPiste(p, i + 1, j, 1f), LapaPiste(p, i + 1, j + 1, 1f), LapaPiste(p, i, j + 1, 1f), Vector3.up, yla);
                        r.NelioUlos(LapaPiste(p, i, j, -1f), LapaPiste(p, i + 1, j, -1f), LapaPiste(p, i + 1, j + 1, -1f), LapaPiste(p, i, j + 1, -1f), -Vector3.up, ala);
                    }
            for (int j = 0; j < 2; j++)
            {
                r.NelioUlos(LapaPiste(-1f, 0, j, 1f), LapaPiste(1f, 0, j, 1f), LapaPiste(1f, 0, j + 1, 1f), LapaPiste(-1f, 0, j + 1, 1f), Vector3.up, yla);
                r.NelioUlos(LapaPiste(-1f, 0, j, -1f), LapaPiste(1f, 0, j, -1f), LapaPiste(1f, 0, j + 1, -1f), LapaPiste(-1f, 0, j + 1, -1f), -Vector3.up, ala);
            }
        }

        // =====================================================================================================================
        // Lapsi2: haamu ja varjo, vana ja selkäevä
        // =====================================================================================================================

        static readonly int[] HaamuI = { 0, 1, 2, 3, 5, 7, 9, 10, 11, 12, 14, 15 };

        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(1f);
            r.Vesi = true;
            var v = MeriRakentaja.VarjoVari;
            const float reuna = 0.0028f;
            for (int q = 0; q + 1 < HaamuI.Length; q++)
            {
                int i0 = HaamuI[q], i1 = HaamuI[q + 1];
                float z0 = RZ[i0], z1 = RZ[i1];
                float w0 = RW[i0] * 1.08f + 0.0005f, w1 = RW[i1] * 1.08f + 0.0005f;
                if (i0 == 0) w0 = 0.0006f;
                if (i1 == RZ.Length - 1) w1 = 0.0004f;
                float ak0 = HaamuAlfa(z0), ak1 = HaamuAlfa(z1);
                foreach (float p in new[] { -1f, 1f })
                {
                    Vector3 k0 = new Vector3(0f, 0f, z0), k1 = new Vector3(0f, 0f, z1);
                    Vector3 s0 = new Vector3(p * w0, 0f, z0), s1 = new Vector3(p * w1, 0f, z1);
                    Vector3 u0 = s0 + new Vector3(p * reuna, 0f, i0 == 0 ? -reuna * 0.6f : 0f);
                    Vector3 u1 = s1 + new Vector3(p * reuna, 0f, i1 == RZ.Length - 1 ? reuna * 0.8f : 0f);
                    Color c0 = MeriRakentaja.Alfa(v, ak0), c1 = MeriRakentaja.Alfa(v, ak1);
                    Color e0 = MeriRakentaja.Alfa(v, ak0 * 0.8f), e1 = MeriRakentaja.Alfa(v, ak1 * 0.8f), o = MeriRakentaja.Alfa(v, 0f);
                    r.NelioVarit(k0, s0, s1, k1, c0, e0, e1, c1);
                    r.NelioVarit(s0, u0, u1, s1, e0, o, o, e1);
                }
            }
            // Rintaevät ja lavat samalla tummuudella kuin haamu (ylhäältä delfiinin tuntomerkit: sivuille ja taakse
            // osoittavat rintaevät ja leveä vaakasuora pyrstö).
            foreach (float p in new[] { -1f, 1f })
            {
                Color c = MeriRakentaja.Alfa(v, 0.28f), k = MeriRakentaja.Alfa(v, 0.12f);
                r.KolmioVarit(new Vector3(p * 0.0066f, 0f, 0.0160f), new Vector3(p * 0.0185f, 0f, 0.0010f), new Vector3(p * 0.0064f, 0f, 0.0085f), c, k, c);
                for (int i = 0; i + 1 < LapaS.Length; i++)
                {
                    Vector3 e0 = LapaTaso(p, i, 0), e1 = LapaTaso(p, i + 1, 0), t0 = LapaTaso(p, i, 2), t1 = LapaTaso(p, i + 1, 2);
                    Color a0 = MeriRakentaja.Alfa(v, i == 0 ? 0.28f : 0.24f), a1 = MeriRakentaja.Alfa(v, i + 1 == LapaS.Length - 1 ? 0.12f : 0.24f);
                    r.NelioVarit(e0, e1, t1, t0, a0, a1, a1, a0);
                }
                r.KolmioVarit(new Vector3(0f, 0f, -0.0500f), LapaTaso(p, 0, 0), LapaTaso(p, 0, 2), MeriRakentaja.Alfa(v, 0.28f), MeriRakentaja.Alfa(v, 0.28f), MeriRakentaja.Alfa(v, 0.28f));
            }
            // Lyhyt vana pyrstön takana.
            r.Nauha(new Vector3(0f, 0f, -0.069f), Vector3.back, 0.05f, 0.0024f, 0.0075f, MeriRakentaja.Vaahto, 0.3f, 0f, 3);
            r.Vesi = false;
            // Selkäevä pystylevynä (ei paksuutta, joten litistettynä se katoaa).
            Eva(r, R(0.40f), false);
            return r.Verkko("delfiinit: haamu");
        }

        static float HaamuAlfa(float z) => z > 0.031f ? 0.24f : z < -0.036f ? 0.26f : 0.32f;

        /// <summary>Lavan ääriviivan piste vaakatasossa (haamu): asema i, 0 etureuna, 2 takareuna.</summary>
        static Vector3 LapaTaso(float puoli, int i, int j)
        {
            float x = puoli * (Mathf.Lerp(LapaX0, LapaX1, LapaS[i]) + 0.0006f);
            return new Vector3(x, 0f, j == 0 ? LapaEtu[i] + 0.0006f : LapaTaka[i] - 0.0006f);
        }

        // =====================================================================================================================
        // Lapsi3: vesirengas ja pisara
        // =====================================================================================================================

        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja(1f);
            r.Vesi = true;
            const int sektoreita = 10;
            float[] sade = { 0f, 0.5f, 0.78f, 1f };
            float[] alfa = { 0.08f, 0.04f, 0.22f, 0f };
            var c = MeriRakentaja.Vaahto;
            for (int i = 0; i < sektoreita; i++)
            {
                float k0 = i * Mathf.PI * 2f / sektoreita, k1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                float m0 = 1f + 0.07f * Mathf.Sin(3f * k0 + 0.4f) + 0.04f * Mathf.Sin(5f * k0 + 1.7f);
                float m1 = 1f + 0.07f * Mathf.Sin(3f * k1 + 0.4f) + 0.04f * Mathf.Sin(5f * k1 + 1.7f);
                for (int j = 0; j + 1 < sade.Length; j++)
                {
                    Vector3 a0 = RengasPiste(k0, sade[j] * m0), a1 = RengasPiste(k1, sade[j] * m1);
                    Vector3 b0 = RengasPiste(k0, sade[j + 1] * m0), b1 = RengasPiste(k1, sade[j + 1] * m1);
                    Color ca = MeriRakentaja.Alfa(c, alfa[j]), cb = MeriRakentaja.Alfa(c, alfa[j + 1]);
                    if (j == 0) r.KolmioVarit(a0, b1, b0, ca, cb, cb);
                    else r.NelioVarit(a0, a1, b1, b0, ca, ca, cb, cb);
                }
            }
            r.Vesi = false;
            r.Pallo(new Vector3(0f, PisaraY, 0f), PisaraSade, R(1.95f), 1);
            return r.Verkko("delfiinit: roiske");
        }

        static Vector3 RengasPiste(float k, float s) => new Vector3(Mathf.Cos(k) * RengasSade * s, 0f, Mathf.Sin(k) * RengasSade * s);

        // =====================================================================================================================
        // Näytöksen suunnitelma (lasketaan kerran näytöstä kohden staattisiin taulukoihin)
        // =====================================================================================================================

        const int MaxD = 3, MaxA = 4, MaxH = MaxD * MaxA;
        /// <summary>Muodostelma parven kehyksessä (+z kulkusuuntaan): kärki edellä, kaksi viistosti takana.</summary>
        static readonly float[] PaikkaX = { 0.004f, 0.042f, -0.038f }, PaikkaZ = { 0.06f, -0.004f, -0.062f };
        /// <summary>Parven matka näytöksessä (kuten vanhassa lajissa: juuri kulkee tasaisesti kohdan yli).</summary>
        const float Matka = 0.40f;
        /// <summary>Ensimmäinen hyppy (näytös on häivytyksen jälkeen lähes näkyvissä).</summary>
        const float Alku = 0.7f;
        const float Painovoima = 0.42f;
        /// <summary>Kiihdytys ennen nousua, liuku sukelluksen jälkeen, haamun sukellus (kutistuu pois) ja nousu (kasvaa).</summary>
        const float TauIn = 0.25f, TauUlos = 0.3f, Sukellus = 0.4f, Nousu = 0.45f, Kaanne = 0.95f;

        static int suunnN = int.MinValue; static bool suunnHarv; static float suunnPituus;
        static int delfiineja;
        static float vauhti, suunta, x0;
        static readonly float[] dX = new float[MaxD], dZ = new float[MaxD], dPsi = new float[MaxD], dVaihe = new float[MaxD];
        static readonly int[] hyppyja = new int[MaxD];
        // Hypyt (k * MaxA + j): laji 1 hyppy, 2 pintakäännös.
        static readonly int[] hLaji = new int[MaxH];
        static readonly float[] hT = new float[MaxH], hA = new float[MaxH], hH = new float[MaxH], hYe = new float[MaxH], hR = new float[MaxH];
        static readonly float[] hTh = new float[MaxH], hFlex = new float[MaxH], hUNokka = new float[MaxH], hULoppu = new float[MaxH];
        static readonly float[] hKierre = new float[MaxH], hDv = new float[MaxH], hPsi = new float[MaxH];

        // Roisketapahtumat: aika, paikka (parven kehyksessä), koko ja laji (0 nousu, 1 sukellus, 2 pintakäännös, 3 iso
        // sukellus, 4 korkea nousu).
        const int MaxTap = 26;
        static int tapahtumia;
        static readonly float[] tS = new float[MaxTap], tX = new float[MaxTap], tZ = new float[MaxTap], tKoko = new float[MaxTap], tKulma = new float[MaxTap];
        static readonly int[] tLaji = new int[MaxTap], tJarj = new int[MaxTap];
        // Pisarat: alku, loppu (osuu veteen), paikka, nopeudet, koko ja paikka lapsissa (−1 = ei mahtunut).
        const int MaxPis = 120;
        static int pisaroita;
        static readonly float[] pS = new float[MaxPis], pL = new float[MaxPis], pX = new float[MaxPis], pZ = new float[MaxPis];
        static readonly float[] pVx = new float[MaxPis], pVz = new float[MaxPis], pVy = new float[MaxPis], pKoko = new float[MaxPis], pKulma = new float[MaxPis];
        static readonly int[] pPaikka = new int[MaxPis];

        static void Suunnittele(int n, float pituus, bool harv)
        {
            suunnN = n; suunnHarv = harv; suunnPituus = pituus;
            var at = Aikataulu;
            // Parvi: 2 tai 3 delfiiniä (harvinaisessa aina 3), suunta rannikkoa pitkin pohjoiseen tai etelään ±7°, sivusiirto
            // merelle päin ja muodostelman peilaus (kuten vanhassa lajissa); parvi etenee tasaisesti Matka-yksikköä.
            delfiineja = harv || at.Arvo(n, 7) >= 0.3f ? 3 : 2;
            float peili = at.Arvo(n, 6) < 0.5f ? 1f : -1f;
            suunta = (at.Arvo(n, 3) < 0.5f ? 0f : 180f) + (at.Arvo(n, 4) - 0.5f) * 14f;
            x0 = -0.08f + (at.Arvo(n, 5) - 0.5f) * 0.04f;
            vauhti = Matka / pituus;
            for (int k = 0; k < MaxD; k++)
            {
                dX[k] = PaikkaX[k] * peili; dZ[k] = PaikkaZ[k];
                dPsi[k] = (at.Arvo(n, 8 + k) - 0.5f) * 9f * Mathf.Deg2Rad;
                dVaihe[k] = at.Arvo(n, 14 + k) * 6.283f;
            }
            // Kahden delfiinin parvessa muodostelma on kärki ja yksi viistosti takana (peilattu satunnaisesti).
            if (delfiineja == 2) { dX[1] = (at.Arvo(n, 17) < 0.5f ? 1f : -1f) * 0.04f; dZ[1] = -0.02f; dZ[0] = 0.045f; }

            // Hypyt: parven tahti 2,05–2,35 s ja delfiinit porrastetusti (0,35–0,65 s) kärjestä tai perästä alkaen, joten
            // ilmassa on lähes aina joku; jokaisella ±0,15 s vaihtelu. Viimeinen sukellus ehtii ennen häivytystä.
            float tahti = 2.05f + 0.3f * at.Arvo(n, 20);
            bool takaa = at.Arvo(n, 21) < 0.4f;
            float porras = 0.35f + 0.3f * at.Arvo(n, 22);
            for (int k = 0; k < MaxD; k++)
            {
                hyppyja[k] = 0;
                if (k >= delfiineja) continue;
                int jarj = takaa ? delfiineja - 1 - k : k;
                bool korkeaDelfiini = harv && k == delfiineja - 1;
                float raja = pituus - (korkeaDelfiini ? 2.2f : 1.35f);
                for (int j = 0; j < MaxA; j++)
                {
                    int L = k * MaxA + j;
                    float T = Alku + jarj * porras + j * tahti + (at.Arvo(n, 100 + L) - 0.5f) * 0.3f;
                    if (j > 0 && T > raja) break;
                    hT[L] = Mathf.Min(T, raja);
                    hyppyja[k] = j + 1;
                }
                for (int j = 0; j < hyppyja[k]; j++)
                {
                    int L = k * MaxA + j;
                    bool korkea = korkeaDelfiini && j == hyppyja[k] - 1;
                    // Pintakäännös hypyn sijaan joskus (ei ensimmäinen eikä harvinainen hyppy): EI MONOTONIAA.
                    bool kaanne = !korkea && j > 0 && hLaji[L - 1] == 1 && at.Arvo(n, 140 + L) < 0.18f;
                    hLaji[L] = kaanne ? 2 : 1;
                    // Hypyn muoto: lakikorkeus 0,050–0,066 (painopiste noin puoli ruumiinpituutta pinnan yllä), lähtökulma
                    // 58–66°, ilma-aika korkeuden mukaan, suunta ±12°; harvinaisessa korkea (0,11) ja jyrkkä kaari ja kierre.
                    float h = korkea ? 0.11f : 0.05f + 0.016f * at.Arvo(n, 160 + L);
                    float th0 = (korkea ? 66f : 58f + 8f * at.Arvo(n, 180 + L)) * Mathf.Deg2Rad;
                    hFlex[L] = (korkea ? 4f : 6f) * Mathf.Deg2Rad;
                    hA[L] = korkea ? 1.2f : 0.62f * Mathf.Sqrt(h / 0.034f) * (0.95f + 0.1f * at.Arvo(n, 200 + L));
                    hTh[L] = th0;
                    hYe[L] = NokkaZ * Mathf.Sin(th0 + hFlex[L]) + NokkaY * Mathf.Cos(th0 + hFlex[L]);
                    hH[L] = h + hYe[L];
                    hR[L] = 4f * hH[L] * Mathf.Cos(th0) / Mathf.Sin(th0);
                    hKierre[L] = korkea ? 360f * (at.Arvo(n, 80) < 0.5f ? 1f : -1f) : 0f;
                    hUNokka[L] = Ratkaise(L, NokkaZ, NokkaY, 0.5f, 1.5f);
                    hULoppu[L] = Ratkaise(L, PeraZ, PeraY, 0.8f, 2f);
                    hDv[L] = kaanne ? 0f : hR[L] / hA[L] - vauhti;
                    hPsi[L] = dPsi[k] + (korkea ? 0f : (at.Arvo(n, 220 + L) - 0.5f) * 24f * Mathf.Deg2Rad);
                }
            }

            // Roisketapahtumat.
            tapahtumia = 0;
            for (int k = 0; k < delfiineja; k++)
                for (int j = 0; j < hyppyja[k]; j++)
                {
                    int L = k * MaxA + j;
                    if (hLaji[L] == 2) { LisaaTapahtuma(2, hT[L] + 0.12f, k, L, -0.012f, 0.5f); continue; }
                    bool korkea = hKierre[L] != 0f;
                    // Nousu: nokka puhkaisee pinnan; sukellus: nokka osuu pintaan.
                    LisaaTapahtuma(korkea ? 4 : 0, hT[L], k, L, NokkaZ * Mathf.Cos(hTh[L] + hFlex[L]), korkea ? 1.2f : 1f);
                    float se = hT[L] + hA[L] * hUNokka[L];
                    LisaaTapahtuma(korkea ? 3 : 1, se, k, L, NokkaZ * Mathf.Cos(Kulma(L, hUNokka[L])), korkea ? 2.6f : 0.8f);
                }
            // Järjestys ajan mukaan (lisäyslajittelu, ei allokointia).
            for (int a = 1; a < tapahtumia; a++)
                for (int b = a; b > 0 && tS[tJarj[b]] < tS[tJarj[b - 1]]; b--) { int x = tJarj[b]; tJarj[b] = tJarj[b - 1]; tJarj[b - 1] = x; }

            // Pisarat tapahtumittain, paikat ahneesti (paikka vapaa, jos sen pisarat eivät ole ilmassa samaan aikaan).
            // Harvinaisen ison roiskeen pisarat varataan ensin, jotta muiden delfiinien samanaikaiset roiskeet eivät vie
            // paikkoja.
            pisaroita = 0;
            for (int vaihe = 0; vaihe < 2; vaihe++)
                for (int q = 0; q < tapahtumia; q++)
                {
                    int e = tJarj[q];
                    int laji = tLaji[e];
                    if ((laji == 3) != (vaihe == 0)) continue;
                    int maara = laji == 0 ? 4 : laji == 1 ? 3 : laji == 3 ? 9 : laji == 4 ? 5 : 0;
                    for (int i = 0; i < maara && pisaroita < MaxPis; i++)
                    {
                        int p = pisaroita++;
                        float a1 = at.Arvo(n, 1000 + 16 * e + i), a2 = at.Arvo(n, 2000 + 16 * e + i), a3 = at.Arvo(n, 3000 + 16 * e + i);
                        float kulma, vy, vh, koko;
                        if (laji == 0 || laji == 4)
                        {
                            // Nousu: ensimmäinen pisara ylös nokan mukana, muut eteen ja sivuille (delfiinin vauhti).
                            kulma = (i == 0 ? 0f : (i % 2 == 1 ? 1f : -1f) * (25f + 45f * a1)) * Mathf.Deg2Rad;
                            vy = (i == 0 ? 0.16f : 0.1f + 0.04f * a2) * (laji == 4 ? 1.25f : 1f);
                            vh = i == 0 ? 0.04f : 0.02f + 0.03f * a3;
                            koko = (1.75f - 0.18f * i) * (laji == 4 ? 1.2f : 1f);
                        }
                        else if (laji == 1)
                        {
                            // Sukellus: kapea roiske ylös, taakse ja sivuille.
                            kulma = (i == 0 ? 180f : 180f + (i % 2 == 0 ? 1f : -1f) * (28f + 30f * a1)) * Mathf.Deg2Rad;
                            vy = i == 0 ? 0.12f : 0.085f + 0.03f * a2; vh = i == 0 ? 0.008f : 0.015f + 0.025f * a3;
                            koko = 1.4f - 0.15f * i;
                        }
                        else
                        {
                            // Iso roiske: kruunu joka suuntaan ja keskeltä korkea patsas.
                            kulma = (i * 360f / (maara - 1) + 20f * a1) * Mathf.Deg2Rad;
                            vy = i == maara - 1 ? 0.26f : 0.15f + 0.07f * a2; vh = i == maara - 1 ? 0.004f : 0.04f + 0.045f * a3;
                            koko = i == maara - 1 ? 3f : 2.1f + 0.7f * a2;
                        }
                        kulma += tKulma[e];
                        pS[p] = tS[e] + (laji == 3 ? 0.02f : 0.035f) * i;
                        pL[p] = pS[p] + 2f * vy / Painovoima;
                        pX[p] = tX[e] + Mathf.Sin(kulma) * 0.002f; pZ[p] = tZ[e] + Mathf.Cos(kulma) * 0.002f;
                        pVx[p] = Mathf.Sin(kulma) * vh; pVz[p] = Mathf.Cos(kulma) * vh; pVy[p] = vy;
                        pKoko[p] = koko; pKulma[p] = a1 * 360f;
                        int varattu = 0;
                        for (int q2 = 0; q2 < p; q2++)
                            if (pPaikka[q2] >= 0 && pS[p] < pL[q2] && pS[q2] < pL[p]) varattu |= 1 << pPaikka[q2];
                        pPaikka[p] = -1;
                        for (int sl = 0; sl < Pisaroita; sl++) if ((varattu & (1 << sl)) == 0) { pPaikka[p] = sl; break; }
                    }
                }
        }

        /// <summary>Roisketapahtuma delfiinin k hypyn L kohdalla hetkellä s: paikka = delfiinin painopisteen vesipiste
        /// ja lisäksi etäisyys eteen hypyn suuntaan (nokan kohta).</summary>
        static void LisaaTapahtuma(int laji, float s, int k, int L, float eteen, float koko)
        {
            if (tapahtumia >= MaxTap) return;
            int e = tapahtumia++;
            tS[e] = s; tLaji[e] = laji; tKoko[e] = koko; tJarj[e] = e;
            Vesipiste(k, s, out float x, out float z, out float psi);
            tX[e] = x + Mathf.Sin(psi) * eteen;
            tZ[e] = z + Mathf.Cos(psi) * eteen;
            tKulma[e] = psi;
        }

        /// <summary>Hypyn kulma (rad) parametrilla u: lentoradan tangentti ja kiertymä (nokka ylempänä lähtiessä, alempana
        /// sukeltaessa: runko kiertyy rataa nopeammin, ja pyrstö näyttää potkaisevan).</summary>
        static float Kulma(int L, float u) => Mathf.Atan2(4f * hH[L] * (1f - 2f * u), hR[L]) + hFlex[L] * (1f - 2f * u);

        static float PainoY(int L, float u) => 4f * hH[L] * u * (1f - u) - hYe[L];

        /// <summary>u, jossa rungon piste (z, y) laskeutuu pintaan hypyn loppupuolella (puolitushaku).</summary>
        static float Ratkaise(int L, float z, float y, float a, float b)
        {
            for (int i = 0; i < 28; i++)
            {
                float u = 0.5f * (a + b), th = Kulma(L, u);
                float korkeus = PainoY(L, u) + z * Mathf.Sin(th) + y * Mathf.Cos(th);
                if (korkeus > 0f) a = u; else b = u;
            }
            return 0.5f * (a + b);
        }

        static float Lento(int L) => hA[L] * hULoppu[L];

        /// <summary>Hypyn L etumatka muodostelmapaikkaan nähden hetkellä s: kiihdytys ennen nousua (TauIn), lennossa vakio
        /// vaakavauhti R/A ja liuku sukelluksen jälkeen (TauUlos). Sen jälkeen delfiini sukeltaa (haamu kutistuu pois) ja nousee
        /// takaisin paikalleen muodostelmaan (vanhan lajin "jää pinnan alla takaisin paikalleen").</summary>
        static float Etumatka(int L, float s)
        {
            float T = hT[L], F = Lento(L), dv = hDv[L];
            if (s <= T - TauIn) return 0f;
            if (s < T) { float x = (s - T + TauIn) / TauIn; return dv * TauIn * (x * x * x - 0.5f * x * x * x * x); }
            if (s < T + F) return dv * (0.5f * TauIn + (s - T));
            float y = Mathf.Clamp01((s - T - F) / TauUlos);
            return dv * (0.5f * TauIn + F + TauUlos * (y - y * y * y + 0.5f * y * y * y * y));
        }

        /// <summary>Delfiinin k tila hetkellä s: käynnissä oleva hyppy (L, −1 jos ei), pintakäännös, vesipiste parven
        /// kehyksessä, suunta ja haamun näkyvyys. Hypyn jälkeen haamu liukuu ja kutistuu pois (sukeltaa syvälle) ja nousee
        /// heti takaisin paikalleen muodostelmaan (kasvaa), joten parvi ei koskaan katoa; hypyssä haamu on varjona rungon alla.</summary>
        static int Tila(int k, float s, out float x, out float z, out float psi, out float nakyvyys, out int kaanne)
        {
            int L = -1; kaanne = -1;
            float etu = 0f; psi = dPsi[k]; nakyvyys = 1f;
            float sukellusLoppu = -10f;
            for (int j = 0; j < hyppyja[k]; j++)
            {
                int M = k * MaxA + j;
                float T = hT[M];
                if (hLaji[M] == 2) { if (s >= T && s < T + Kaanne) kaanne = M; continue; }
                float F = Lento(M);
                if (s < T - TauIn) break;
                if (s < T + F + Sukellus)
                {
                    etu = Etumatka(M, s); psi = hPsi[M];
                    nakyvyys = s < T + F ? 1f : 1f - Pehmea((s - T - F) / Sukellus);
                    L = s >= T && s < T + F ? M : -1;
                    break;
                }
                sukellusLoppu = T + F + Sukellus;
            }
            // Nousu paikalleen heti sukelluksen jälkeen; jos seuraava hyppy alkaa ennen kuin nousu on valmis, haamu kasvaa
            // loppuun kiihdytyksen aikana (ei hyppäystä täyteen kokoon).
            nakyvyys = Mathf.Min(nakyvyys, Pehmea((s - sukellusLoppu) / Nousu));
            float sway = Kiemura(k, s);
            x = dX[k] + Mathf.Cos(dPsi[k]) * sway + Mathf.Sin(psi) * etu;
            z = dZ[k] + vauhti * s - Mathf.Sin(dPsi[k]) * sway + Mathf.Cos(psi) * etu;
            return L;
        }

        static void Vesipiste(int k, float s, out float x, out float z, out float psi)
        {
            Tila(k, s, out x, out z, out psi, out _, out _);
        }

        /// <summary>Uinnin sivuttainen kiemurtelu (haamu heiluu hieman).</summary>
        static float Kiemura(int k, float s) => 0.0012f * Mathf.Sin(1.4f * s + dVaihe[k]);

        // =====================================================================================================================
        // Näytös
        // =====================================================================================================================

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 1f) * Pehmea((pituus - s) / 1f);
        }

        static void Piilota(Transform l) => l.localScale = Vector3.zero;

        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (roottori == null || lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            if (n != suunnN || harv != suunnHarv || pituus != suunnPituus) Suunnittele(n, pituus, harv);

            // Roottori: parven keskikohta kulkee tasaisesti kohdan yli (x0 merelle päin), kierto uintisuuntaan, skaala 1.
            var kierto = Quaternion.Euler(0f, suunta, 0f);
            float zr = -0.5f * Matka + vauhti * s;
            roottori.localPosition = new Vector3(x0, 0f, 0f) + kierto * new Vector3(0f, 0f, zr);
            roottori.localRotation = kierto;
            roottori.localScale = Vector3.one;
            float siirto = -vauhti * s;   // parven kehyksen piste (alku −Matka/2) roottorin avaruuteen: z + siirto

            for (int k = 0; k < MaxD; k++)
            {
                var runko = lapset[k];
                var haamu = lapset[Lapsia + k];
                if (k >= delfiineja) { Piilota(runko); Piilota(haamu); continue; }
                int L = Tila(k, s, out float px, out float pz, out float psi, out float nak, out int kaanne);
                pz += siirto;
                var suuntaQ = Quaternion.Euler(0f, psi * Mathf.Rad2Deg, 0f);

                if (L >= 0)
                {
                    float u = (s - hT[L]) / hA[L];
                    float th = Kulma(L, u), yc = PainoY(L, u);
                    float sn = Mathf.Sin(th), cs = Mathf.Cos(th);
                    // Näkyvä osa rungon akselilla: vesirajan yläpuoli (nokka ylös: nokasta rajaan, alas: pyrstöstä rajaan).
                    float z0 = PeraZ, z1 = NokkaZ;
                    bool nokkaYlos = sn > 0f;
                    if (Mathf.Abs(sn) > 1e-3f)
                    {
                        float raja = -(yc - 0.0085f * Mathf.Abs(cs)) / sn;
                        if (nokkaYlos) z0 = Mathf.Max(z0, raja); else z1 = Mathf.Min(z1, raja);
                    }
                    else if (yc < 0f) z1 = z0;
                    float sz = Mathf.Clamp01((z1 - z0) / (NokkaZ - PeraZ));
                    float kierre = hKierre[L] * Pehmea((u - 0.14f) / 0.74f);
                    var q = suuntaQ * Quaternion.Euler(-th * Mathf.Rad2Deg, 0f, kierre);
                    var akseli = q * Vector3.forward;
                    var paino = new Vector3(px, yc, pz);
                    float ankkuri = nokkaYlos ? NokkaZ : PeraZ;
                    if (sz > 0.02f)
                    {
                        runko.localPosition = paino + akseli * (ankkuri * (1f - sz));
                        runko.localRotation = q;
                        float sxy = 0.45f + 0.55f * sz;
                        runko.localScale = new Vector3(sxy, sxy, sz);
                    }
                    else Piilota(runko);
                    // Varjo rungon alla: sama muoto lyhentyneenä kallistuksen mukaan.
                    haamu.localPosition = new Vector3(px, YHaamu, pz);
                    haamu.localRotation = suuntaQ;
                    haamu.localScale = nak > 0.02f ? new Vector3(nak, 1e-5f, Mathf.Max(0.3f, cs) * nak) : Vector3.zero;
                }
                else
                {
                    Piilota(runko);
                    if (nak < 0.02f) { Piilota(haamu); continue; }
                    // Uinti pinnan alla: haamu kiemurtelee; pintakäännöksessä selkäevä nousee ja painuu.
                    float heilahdus = 4f * Mathf.Cos(1.4f * s + dVaihe[k]);
                    float eva = kaanne >= 0 ? Mathf.Max(1e-5f, Kupu((s - hT[kaanne]) / Kaanne, 0.7f)) : 1e-5f;
                    haamu.localPosition = new Vector3(px, YHaamu, pz);
                    haamu.localRotation = Quaternion.Euler(0f, psi * Mathf.Rad2Deg + heilahdus, 0f);
                    haamu.localScale = new Vector3(nak, eva, nak);
                }
            }

            // Renkaat: järjestyksessä paikkoihin kiertäen (uusin syrjäyttää Renkaita tapahtumaa vanhemman).
            for (int i = 0; i < Renkaita; i++)
            {
                var l = lapset[Lapsia + Lapsia2 + i];
                int e = -1;
                for (int q = i; q < tapahtumia; q += Renkaita)
                {
                    int ee = tJarj[q];
                    if (tS[ee] <= s) e = ee; else break;
                }
                if (e < 0) { Piilota(l); continue; }
                float ika = s - tS[e];
                float rho = tKoko[e] * (0.35f + 1.2f * (1f - Mathf.Pow(2.71828f, -ika / 0.3f)) + 0.28f * ika);
                l.localPosition = new Vector3(tX[e], YRengas, tZ[e] + siirto);
                l.localRotation = Quaternion.Euler(0f, 37f * e, 0f);
                l.localScale = new Vector3(rho, 0.6f, rho);
            }

            // Pisarat: heittoliike, kasvaa syntyessä, katoaa osuessaan veteen.
            var kaanto = Quaternion.Euler(180f, 0f, 0f);
            for (int i = 0; i < Pisaroita; i++)
            {
                var l = lapset[Lapsia + Lapsia2 + Renkaita + i];
                int p = -1;
                for (int q = 0; q < pisaroita; q++)
                    if (pPaikka[q] == i && pS[q] <= s && s < pL[q]) { p = q; break; }
                if (p < 0) { Piilota(l); continue; }
                float a = s - pS[p];
                float koko = pKoko[p] * Ulos(a / 0.06f) * (1f - 0.35f * a / (pL[p] - pS[p]));
                // Litistetty pisara: ylätahkot kääntyvät kohti valoa, joten vaahto on vaalea (pyöreä pisara näytti ruskealta
                // helmeltä; valaan agentin havainto 27.9.). Pisara on kokonaan pinnan yläpuolella: syntyy pinnan päältä ja
                // katoaa, kun sen alareuna osuu veteen (laitteen ääriviivapiirto ei saa jäädä veden alle näkyviin).
                float sxz = koko * (PisaraMitta / PisaraSade), ky = sxz * Litistys;
                float puoli = PisaraSade * ky + 0.0008f;
                float y = puoli + pVy[p] * a - 0.5f * Painovoima * a * a;
                if (y <= puoli && a > 0.05f || koko < 0.05f) { Piilota(l); continue; }
                l.localPosition = new Vector3(pX[p] + pVx[p] * a, y + PisaraY * ky, pZ[p] + pVz[p] * a + siirto);
                l.localRotation = Quaternion.Euler(0f, pKulma[p], 0f) * kaanto;
                l.localScale = new Vector3(sxz, ky, sxz);
            }
        }
    }
}
