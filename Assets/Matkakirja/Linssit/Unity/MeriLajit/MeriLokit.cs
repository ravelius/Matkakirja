// MEREN KORISTEIDEN LAATUTASO: LOKIT (harmaalokkiparvi). Speksi docs/raportit/meri-laatu-speksi-20260927.md (Linssiseppä
// 27.9.2026, omistaja: "Nuo voisi tehdä korkeammalla laadulla", lokeille "siiven lyönti"). Korvaa vanhan MeriLokit-luokan
// (aikataulu, siemen 929, näytöksen kesto ja tauot sekä lapsi-idea ennallaan).
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// LOKIT MeriMalli-varjostimelle. 5–7 harmaalokkia kaartelee väljänä parvena omilla soikeilla kierroksillaan, lyö
    /// siivillään puuskittain (oma tahti 2,0–2,8 Hz ja vaihe siemenestä) ja liitää välillä kallistuen kaarteeseen (±40°);
    /// varjo pinnalla kertoo korkeuden. Osa näytöksistä alkaa lokeilla, jotka kelluvat pinnalla ja nousevat parveen
    /// (juoksu, syvät lyönnit, roiske ja rengas), ja pitkissä näytöksissä yksi lokki laskeutuu välillä ja nousee taas.
    /// Lopuksi lokit irtoavat vuorollaan kierrokselta (kuten ennen), liitävät alas väljään lauttaan, jarruttavat siivet V:nä,
    /// koskettavat pintaa (pieni roiske ja rengas), taittavat siivet selälle mustat kärjet ristiin ja kelluvat keinuen nokka
    /// tuuleen. Harvinainen (noin 1/10, ei ensimmäinen näytös, kuten ennen): lokit syöksyvät vuorotellen kalaan siivet taakse
    /// vedettyinä, roiske ja suihku nousevat, lokki on hetken pinnan alla ja pulpahtaa kellumaan renkaan keskelle.
    /// EI MONOTONIAA: parven koko (5–7), kierrosten säde (0,88–1,12) ja suunta, tuuli, siivenlyöntipuuskat, kallistuvuus,
    /// lokkien koko, alkukellujat, välilasku ja se, jääkö yksi lokki lentoon, vaihtelevat näytöksittäin.
    ///
    /// Rakenne (mallin avaruus: +z rannikon suunta, −x merelle, +y ylös, meren pinta y = 0, 1 yksikkö = 250 pt; siipiväli
    /// 0,064 ≈ 16 pt ≈ 48 px):
    ///   Roottori  parven keskipiste (sama paikka kuin ennen); verkko on näkymätön paikanpitäjä (1 kolmio), koska kaikki
    ///             näkyvä liikkuu lapsina. Animoi ei kierrä eikä skaalaa roottoria (skaala 1).
    ///   Lapsi     (7) lokin runko (126): pää, kaula, runko, perä, lyhyt pyrstö ja nokka; paperi, selkä (satula) vaalea
    ///             seepia, nokka seepia. Origo linnussa (x, korkeus, z): LapsetOmaanPisteeseen pitää vesipisteen (x, z)
    ///             kallistamattomana ja korkeus kallistuu näkymän mukana kuten varjonkin kohdalla.
    ///   Lapsi2    (14) siipi (48): 0–6 oikeat, 7–13 vasemmat. Olkanivel origossa; pitkä kapea siipi, jonka ranne on
    ///             etummaisena ja käsisiipi pyyhkäisee taakse terävään mustaan kärkeen (ylhäältä M), kyynärvarressa valkoinen
    ///             takareuna, etureuna 0,0020–0,0005 paksu (ohut siipi ei katoa ilman MSAA:ta). Verkko on y-symmetrinen, joten
    ///             vasen siipi on sama verkko rullattuna 180° (R_z(180° − θ)·R_y(β) on peilikuva ilman negatiivista skaalaa;
    ///             harness ja laite laskevat normaalit oikein). Siivenlyönti on aito kierto olkanivelen ympäri (+54…−34°,
    ///             ylälyönnissä ranne koukistuu: pyyhkäisy taakse ja lyhennys); kellumassa siipi kiertyy selälle (taitto).
    ///   Lapsi3    (14) vesi (84): 0–6 varjot ja 7–13 renkaat SAMASTA verkosta. Pystyssä verkko näyttää pehmeän
    ///             mustesoikion (varjo, alfa 0,13) ja y-skaala 1e-5 litistää muut osat näkymättömiksi; kun lapsi käännetään
    ///             180° x-akselin ympäri, varjo kääntyy alas (karsitaan) ja näkyviin tulee vaahtokruunu: litteänä rengas
    ///             (laskeutuminen, nousu, pulpahdus, kelluvan vesiraja), y-skaalalla nostettuna roiske piikkeineen ja
    ///             keskisuihkuineen (syöksy, kosketus). Verkko kootaan omalla apurilla (Vesiverkko), koska MeriRakentaja
    ///             kääntää vesikolmiot aina ylös; laitteen Cull Back karsii alaspäin osoittavat osat kuten harnessikin.
    /// Ääriviivaa ei ole: jokainen osa on alle 0,006 yksikön puolileveydeltään (siivet ja runko rakennetaan pieninä osina),
    /// koska 1,2 pt:n musteviiva peittäisi 5 px:n siiven möykyksi; luettavuus tulee mustista kärjistä, rampin kontrastista
    /// ja kaiverrusreunasta. Piilotus skaalalla 0. LOD0 yhteensä 1 + 7 × 126 + 14 × 48 + 14 × 84 = 2 731 kolmiota; kaukotaso
    /// vaihtaa vain roottorin (1). Värit vain rampista (Rampi, kärjen alfa 0) ja vesikerroksen Vaahto/VarjoVari; ei
    /// korostusväriä. Animoi ei allokoi (rakenteita ja staattisia taulukoita; näytöksen suunnitelma kerran näytöstä kohden),
    /// ja tilojen rajat liukuvat kierroksen asentoon (ei hyppyjä 60 fps:llä, testi/Tarkista.cs).
    /// </summary>
    public static class MeriLokit
    {
        public const string Nimi = "lokit";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri", "itameri", "jaameri" };
        /// <summary>Lokin siipiväli 0,064 yksikköä → noin 16 pt ja parvi kierroksillaan noin 0,3 × 0,2 → 75 × 50 pt.</summary>
        public const float KokoPt = 250f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(929, 12f, 20f, 40f, 120f);
        public const int Lapsia = 7, Lapsia2 = 14, Lapsia3 = 14;
        const int Max = Lapsia;

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y * y; }

        // =====================================================================================================================
        // Roottori
        // =====================================================================================================================

        /// <summary>Näkymätön paikanpitäjä (vesikolmio alfalla 0, alle pikselin): parven keskipiste.</summary>
        public static Mesh Roottori() => Paikanpitaja("lokit: parven keskipiste");

        /// <summary>Kaukotaso: sama paikanpitäjä (lapset pysyvät).</summary>
        public static Mesh RoottoriKauko() => Paikanpitaja("lokit: parven keskipiste kauko");

        static Mesh Paikanpitaja(string nimi)
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            r.Kolmio(new Vector3(0f, -0.002f, 0f), new Vector3(0.0005f, -0.002f, 0f), new Vector3(0f, -0.002f, 0.0005f),
                MeriRakentaja.Alfa(MeriRakentaja.Vaahto, 0f));
            return r.Verkko(nimi);
        }

        // =====================================================================================================================
        // Lapsi: lokin runko
        // =====================================================================================================================

        // Rungon asemat pyrstön tyvestä (−z) nokan tyveen (+z): z, puolileveys, puolikorkeus ja keskikohdan korkeus. Ensimmäinen ja
        // viimeinen asema ovat pisteitä (kärjet suljettu).
        static readonly float[] RZ = { -0.0094f, -0.0068f, -0.0034f, 0.0002f, 0.0036f, 0.0058f, 0.0078f, 0.0098f, 0.0113f };
        static readonly float[] RW = { 0f, 0.0022f, 0.0032f, 0.0034f, 0.0028f, 0.0020f, 0.0025f, 0.0021f, 0f };
        static readonly float[] RH = { 0f, 0.0019f, 0.0027f, 0.0028f, 0.0025f, 0.0019f, 0.0024f, 0.0020f, 0f };
        static readonly float[] RY = { 0.0005f, 0.0003f, 0f, -0.0001f, 0.0001f, 0.0005f, 0.0009f, 0.0009f, 0.0007f };
        const int Keha = 8;
        /// <summary>Selän satula (vaalea seepia) asemien välillä ja kehän yläosassa.</summary>
        const float SatulaZ0 = -0.0070f, SatulaZ1 = 0.0040f;

        static Vector3 Poikki(int i, float kulma) =>
            new Vector3(RW[i] * Mathf.Cos(kulma), RY[i] + RH[i] * Mathf.Sin(kulma), RZ[i]);

        /// <summary>Runko (126 kolmiota): loftattu 8-kulmainen runko pienin nelikulmioin (ei ääriviivaa), pyrstö ja nokka.</summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            int m = RZ.Length;
            float d = Mathf.PI * 2f / Keha, siirto = d * 0.5f;
            for (int i = 0; i < m - 1; i++)
                for (int k = 0; k < Keha; k++)
                {
                    float a0 = siirto + k * d, a1 = a0 + d, am = a0 + d * 0.5f;
                    Vector3 p00 = Poikki(i, a0), p01 = Poikki(i, a1), p10 = Poikki(i + 1, a0), p11 = Poikki(i + 1, a1);
                    var ulos = new Vector3(Mathf.Cos(am), Mathf.Sin(am), 0f);
                    float zk = (RZ[i] + RZ[i + 1]) * 0.5f;
                    bool satula = zk > SatulaZ0 && zk < SatulaZ1 && Mathf.Sin(am) > 0.3f;
                    // Paperi; selkä vaalea seepia; vatsa hieman tummempi paperi (kaiverruksen alasävy).
                    var vari = satula ? R(1.55f) : Mathf.Sin(am) < -0.3f ? R(1.85f) : R(2f);
                    r.NelioUlos(p00, p10, p11, p01, ulos, vari);
                }
            // Pyrstö: lyhyt suora viuhka perän alta, hieman koholla; ylä- ja alapinta ja reunat (näkyy sivultakin).
            {
                float z0 = -0.0080f, z1 = -0.0128f, w0 = 0.0016f, w1 = 0.0025f, y0 = 0.0006f, y1 = 0.0005f, p = 0.00022f;
                Vector3 a = new Vector3(-w0, y0 + p, z0), b = new Vector3(w0, y0 + p, z0), c = new Vector3(w1, y1 + p, z1), e = new Vector3(-w1, y1 + p, z1);
                Vector3 a2 = new Vector3(-w0, y0 - p, z0), b2 = new Vector3(w0, y0 - p, z0), c2 = new Vector3(w1, y1 - p, z1), e2 = new Vector3(-w1, y1 - p, z1);
                r.NelioUlos(a, b, c, e, Vector3.up, R(2f));
                r.NelioUlos(a2, b2, c2, e2, -Vector3.up, R(1.9f));
                r.NelioUlos(b, b2, c2, c, Vector3.right, R(1.9f));
                r.NelioUlos(a, a2, e2, e, -Vector3.right, R(1.9f));
                r.NelioUlos(e, c, c2, e2, -Vector3.forward, R(1.9f));
            }
            // Nokka: nelitahkoinen kärki pään edessä, kärki hieman alas (seepia; keltaista ei paletissa).
            {
                float zb = 0.0104f, wb = 0.00072f, hb = 0.00070f, yb = 0.00074f;
                var karki = new Vector3(0f, 0.00040f, 0.0140f);
                Vector3 y = new Vector3(0f, yb + hb, zb), o = new Vector3(wb, yb, zb), a = new Vector3(0f, yb - hb, zb), v = new Vector3(-wb, yb, zb);
                r.KolmioUlos(y, o, karki, new Vector3(0.5f, 1f, 0.3f), R(1.05f));
                r.KolmioUlos(o, a, karki, new Vector3(0.5f, -1f, 0.3f), R(0.95f));
                r.KolmioUlos(a, v, karki, new Vector3(-0.5f, -1f, 0.3f), R(0.95f));
                r.KolmioUlos(v, y, karki, new Vector3(-0.5f, 1f, 0.3f), R(1.05f));
            }
            return r.Verkko("lokit: lokin runko");
        }

        // =====================================================================================================================
        // Lapsi2: siipi
        // =====================================================================================================================

        // Oikean siiven asemat olkanivelestä (x = 0) kärkeen: x, etureunan z, takareunan z ja etureunan paksuus. Ranne x = 0,0118
        // on siiven etummainen kohta, käsisiipi pyyhkäisee taakse terävään kärkeen (ylhäältä M-ääriviiva). Verkko on
        // y-symmetrinen (ylä- ja alapinta samanväriset, profiili suora), joten vasen siipi on sama verkko 180° rullattuna
        // (R_z(180° − θ)·R_y(β) = peilikuva) ilman negatiivista skaalaa.
        static readonly float[] SX = { 0f, 0.0060f, 0.0118f, 0.0168f, 0.0212f, 0.0255f, 0.0298f };
        static readonly float[] SE = { 0.0034f, 0.0046f, 0.0055f, 0.0040f, 0.0020f, 0.0000f, -0.0052f };
        static readonly float[] ST = { -0.0052f, -0.0048f, -0.0036f, -0.0041f, -0.0050f, -0.0057f, -0.0062f };
        static readonly float[] SP = { 0.0020f, 0.0020f, 0.0018f, 0.0016f, 0.0013f, 0.0011f, 0.0005f };
        // Värit väleittäin: pinnat (vaalea seepia, kärki muste) ja etureuna (valkoinen, kärjessä muste).
        static readonly float[] SPinta = { 1.58f, 1.58f, 1.56f, 1.52f, 0.14f, 0.10f };
        static readonly float[] SEtu = { 1.95f, 1.95f, 1.92f, 1.75f, 0.20f, 0.15f };
        /// <summary>Valkoinen takareuna kolmella ensimmäisellä välillä (kyynärvarsi), leveys 17 % jänteestä.</summary>
        const int ValkoinenReuna = 3; const float TakareunaOsuus = 0.17f;

        /// <summary>Oikea siipi (48 kolmiota) olkanivel origossa: yläpinta, alapinta ja etureuna kuutena välinä, kyynärvarressa
        /// valkoinen takareuna (ei ääriviivaa: jokainen väli alle 0,006 puolileveydeltään). Etureuna 0,0020 → 0,0005 paksu, jottei
        /// syrjittäin nähty siipi katoa ilman MSAA:ta.</summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja();
            int m = SX.Length;
            var yt = new Vector3[m]; var ya = new Vector3[m]; var tr = new Vector3[m];
            for (int i = 0; i < m; i++)
            {
                yt[i] = new Vector3(SX[i], SP[i] * 0.5f, SE[i]);
                ya[i] = new Vector3(SX[i], -SP[i] * 0.5f, SE[i]);
                tr[i] = new Vector3(SX[i], 0f, ST[i]);
            }
            for (int i = 0; i < m - 1; i++)
            {
                if (i < ValkoinenReuna)
                {
                    // Kyynärvarren valkoinen takareuna (harmaalokin tuntomerkki ylhäältä): pinta kahtena kaistana.
                    Vector3 k0 = Vector3.Lerp(tr[i], new Vector3(SX[i], 0f, SE[i]), TakareunaOsuus), k1 = Vector3.Lerp(tr[i + 1], new Vector3(SX[i + 1], 0f, SE[i + 1]), TakareunaOsuus);
                    Vector3 ky0 = k0 + Vector3.up * (SP[i] * 0.5f * TakareunaOsuus), ky1 = k1 + Vector3.up * (SP[i + 1] * 0.5f * TakareunaOsuus);
                    Vector3 ka0 = k0 - Vector3.up * (SP[i] * 0.5f * TakareunaOsuus), ka1 = k1 - Vector3.up * (SP[i + 1] * 0.5f * TakareunaOsuus);
                    r.NelioUlos(yt[i], yt[i + 1], ky1, ky0, Vector3.up, R(SPinta[i]));
                    r.NelioUlos(ky0, ky1, tr[i + 1], tr[i], Vector3.up, R(1.97f));
                    r.NelioUlos(ya[i], ka0, ka1, ya[i + 1], -Vector3.up, R(SPinta[i]));
                    r.NelioUlos(ka0, tr[i], tr[i + 1], ka1, -Vector3.up, R(1.97f));
                }
                else
                {
                    r.NelioUlos(yt[i], yt[i + 1], tr[i + 1], tr[i], Vector3.up, R(SPinta[i]));
                    r.NelioUlos(ya[i], tr[i], tr[i + 1], ya[i + 1], -Vector3.up, R(SPinta[i]));
                }
                var etu = new Vector3(-(SE[i + 1] - SE[i]), 0f, SX[i + 1] - SX[i]);
                r.NelioUlos(ya[i], ya[i + 1], yt[i + 1], yt[i], etu, R(SEtu[i]));
            }
            return r.Verkko("lokit: siipi");
        }

        // =====================================================================================================================
        // Lapsi3: vesi (varjo pystyssä, rengas ja roiske käännettynä)
        // =====================================================================================================================

        /// <summary>
        /// Vesilapsen verkko (84 kolmiota) kahdessa roolissa, yksikkökoossa (lapsen skaala antaa koon):
        ///   pystyssä: pehmeä mustesoikio (säde 1, ydin alfa 0,13 säteelle 0,45, reuna 0) ylöspäin;
        ///   käännettynä (180° x-akselin ympäri): vaahtokruunu (sisäreuna 0,55 alfa 0, harja 0,8 alfa 0,45 korkeudella 1 tai
        ///   0,55 vuorotellen, ulkoreuna 1,0 alfa 0) ja kolme ristikkäistä pystysuihkua (korkeus 1,8, tyvi alfa 0,95).
        /// Kruunu ja suihkut rakennetaan käännettyinä (y ja z vastaluvuiksi), joten pystyssä ne osoittavat alas: kruunu karsitaan
        /// ja pystysuihkut litistyvät y-skaalalla viivoiksi. Käännettynä varjo osoittaa alas ja karsitaan.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new Vesiverkko();
            // Varjo: ydin ja pehmeä reuna (10 sektoria).
            var v = MeriRakentaja.VarjoVari;
            const int ns = 10;
            Color ydin = MeriRakentaja.Alfa(v, 0.13f), keski = MeriRakentaja.Alfa(v, 0.12f), reuna = MeriRakentaja.Alfa(v, 0f);
            const float y = 0.0002f;
            for (int i = 0; i < ns; i++)
            {
                float k0 = i * Mathf.PI * 2f / ns, k1 = (i + 1) * Mathf.PI * 2f / ns;
                Vector3 s0 = new Vector3(Mathf.Cos(k0) * 0.45f, y, Mathf.Sin(k0) * 0.45f), s1 = new Vector3(Mathf.Cos(k1) * 0.45f, y, Mathf.Sin(k1) * 0.45f);
                Vector3 u0 = new Vector3(Mathf.Cos(k0), y, Mathf.Sin(k0)), u1 = new Vector3(Mathf.Cos(k1), y, Mathf.Sin(k1));
                r.KolmioYlos(new Vector3(0f, y, 0f), s0, s1, ydin, keski, keski, false);
                r.KolmioYlos(s0, u0, u1, keski, reuna, reuna, false);
                r.KolmioYlos(s0, u1, s1, keski, reuna, keski, false);
            }
            // Vaahtokruunu (12 sektoria), käännettynä.
            var vaahto = MeriRakentaja.Vaahto;
            const int nk = 12;
            Color c0 = MeriRakentaja.Alfa(vaahto, 0f), harja = MeriRakentaja.Alfa(vaahto, 0.45f);
            for (int i = 0; i < nk; i++)
            {
                float k0 = (i + 0.5f) * Mathf.PI * 2f / nk, k1 = (i + 1.5f) * Mathf.PI * 2f / nk;
                float h0 = i % 2 == 0 ? 1f : 0.55f, h1 = i % 2 == 0 ? 0.55f : 1f;
                Vector3 si0 = new Vector3(Mathf.Cos(k0) * 0.55f, 0f, Mathf.Sin(k0) * 0.55f), si1 = new Vector3(Mathf.Cos(k1) * 0.55f, 0f, Mathf.Sin(k1) * 0.55f);
                Vector3 ha0 = new Vector3(Mathf.Cos(k0) * 0.8f, h0, Mathf.Sin(k0) * 0.8f), ha1 = new Vector3(Mathf.Cos(k1) * 0.8f, h1, Mathf.Sin(k1) * 0.8f);
                Vector3 ul0 = new Vector3(Mathf.Cos(k0), 0f, Mathf.Sin(k0)), ul1 = new Vector3(Mathf.Cos(k1), 0f, Mathf.Sin(k1));
                r.KolmioYlos(si0, ha0, ha1, c0, harja, harja, true);
                r.KolmioYlos(si0, ha1, si1, c0, harja, c0, true);
                r.KolmioYlos(ha0, ul0, ul1, harja, c0, c0, true);
                r.KolmioYlos(ha0, ul1, ha1, harja, c0, harja, true);
            }
            // Keskisuihku: kolme ristikkäistä pystykolmiota molemmin puolin (litteänä viivoja, eli näkymättömiä).
            Color tyvi = MeriRakentaja.Alfa(vaahto, 0.95f), latva = MeriRakentaja.Alfa(vaahto, 0.3f);
            for (int j = 0; j < 3; j++)
            {
                float a = j * Mathf.PI / 3f + 0.3f;
                var sivu = new Vector3(Mathf.Cos(a) * 0.34f, 0f, Mathf.Sin(a) * 0.34f);
                var karki = new Vector3(0f, 1.8f, 0f);
                r.Kolmio(-sivu, sivu, karki, tyvi, tyvi, latva, true);
                r.Kolmio(sivu, -sivu, karki, tyvi, tyvi, latva, true);
            }
            return r.Verkko("lokit: varjo ja rengas");
        }

        /// <summary>Vesilapsen oma verkkoapuri: vesikolmiot (UV1 = vesimerkki, kärkiväri ja -alfa sellaisenaan) annetussa
        /// kiertosuunnassa, valinnaisesti käännettyinä 180° x-akselin ympäri (y, z → −y, −z; kiertosuunta säilyy).</summary>
        sealed class Vesiverkko
        {
            readonly List<Vector3> v = new List<Vector3>(), n = new List<Vector3>();
            readonly List<Color> c = new List<Color>();
            readonly List<Vector2> u = new List<Vector2>();
            readonly List<int> t = new List<int>();

            static Vector3 F(Vector3 p) => new Vector3(p.x, -p.y, -p.z);

            /// <summary>Kolmio etupuoli ylöspäin (kruunun omassa avaruudessa), sitten valinnaisesti käännettynä.</summary>
            public void KolmioYlos(Vector3 a, Vector3 b, Vector3 d, Color ca, Color cb, Color cd, bool kaanna)
            {
                if (Vector3.Cross(b - a, d - a).y < 0f) { var s = b; b = d; d = s; var sc = cb; cb = cd; cd = sc; }
                Kolmio(a, b, d, ca, cb, cd, kaanna);
            }

            public void Kolmio(Vector3 a, Vector3 b, Vector3 d, Color ca, Color cb, Color cd, bool kaanna)
            {
                if (kaanna) { a = F(a); b = F(b); d = F(d); }
                var nn = Vector3.Cross(b - a, d - a);
                if (nn.sqrMagnitude < 1e-14f) return;
                nn.Normalize();
                int i = v.Count;
                Lisaa(a, nn, ca); Lisaa(b, nn, cb); Lisaa(d, nn, cd);
                t.Add(i); t.Add(i + 1); t.Add(i + 2);
            }

            void Lisaa(Vector3 p, Vector3 nn, Color vari)
            {
                var lin = vari.linear; lin.a = vari.a;
                v.Add(p); n.Add(nn); c.Add(lin); u.Add(MeriRakentaja.VesiMerkki);
            }

            public Mesh Verkko(string nimi)
            {
                var m = new Mesh { name = "Meri-" + nimi };
                m.SetVertices(v); m.SetNormals(n); m.SetColors(c); m.SetUVs(1, u); m.SetTriangles(t, 0);
                m.RecalculateBounds();
                return m;
            }
        }

        // =====================================================================================================================
        // Näytös
        // =====================================================================================================================

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : MeriGeometria.Pehmea(s / 1.5f) * MeriGeometria.Pehmea((pituus - s) / 1.5f);
        }

        // Liito alas, siipien taitto, syöksy, pinnan alla, kelluvan kääntyminen tuuleen ja nousu (s); roiskeen ja renkaan elinaika.
        const float Liito = 1.8f, Taitto = 0.35f, Syoksy = 0.5f, Pinnalla = 0.55f, Kaanto = 1.6f, Nousu = 2.6f, Avaus = 0.25f;
        const float RoiskeIka = 1.4f, RengasIka = 0.75f, NousuRengasIka = 1.0f;
        /// <summary>Kelluvan rungon keskikohta pinnasta (vatsa hieman pinnan alla), varjon ja renkaan korkeus, litistys.</summary>
        const float KelluY = 0.0014f, VarjoY = 0.0003f, RengasY = 0.0004f, Litea = 1e-5f;
        /// <summary>Laskeutumispaikat parven keskeltä (väljä lautta, ±0,008 jaksosta); 5 ensimmäistä kuten ennen.</summary>
        static readonly float[] LauttaX = { -0.026f, 0.012f, -0.03f, 0.018f, -0.012f, 0.036f, -0.048f };
        static readonly float[] LauttaZ = { 0.05f, 0.018f, -0.012f, -0.036f, -0.066f, 0.058f, 0.022f };
        // Olkanivel rungossa: siivet auki ja taitettuina (oikea puoli; vasen peilattuna).
        static readonly Vector3 OlkaAuki = new Vector3(0.0026f, 0.0012f, 0.0020f), OlkaKiinni = new Vector3(0.0012f, 0.0023f, 0.0034f);
        // Taitettu siipi: kierto (rulla θ, pyyhkäisy β) ja skaalat (pituus, paksuus, leveys).
        const float TaitettuTheta = -12f, TaitettuBeta = 95f, TaitettuSx = 0.62f, TaitettuSy = 0.30f, TaitettuSz = 0.25f;
        /// <summary>Siivet ylhäällä V:nä laskeutumisen kosketuksessa (taiton alkuasento).</summary>
        const float LaskuTheta = 65f;

        // Tilat.
        const int Lentaa = 0, Nousee = 1, Laskee = 2, Kelluu = 3, Syoksyy = 4, Pinnanalla = 5;

        // ---- Näytöksen suunnitelma (kerran näytöstä kohden, ei allokaatiota) ----
        static int planN = -1, parvi;
        static float planL, kierrosP, tuuliP, skaalaP;
        static bool planHarv;
        static readonly float[] Irti = new float[Max], Ylos = new float[Max], Lasku = new float[Max], Aikaisin = new float[Max];
        static readonly int[] Paikka = new int[Max], YlosPaikka = new int[Max];
        static readonly int[] Kokeilu = new int[Max];
        static readonly bool[] Varattu = new bool[LauttaPaikkoja];
        static readonly float[,] PariArvo = new float[Max, LauttaPaikkoja], PariAika = new float[Max, LauttaPaikkoja];
        static float parasSumma;
        static int laskeutujia;
        const int LauttaPaikkoja = 7;

        /// <summary>Lautan paikat näytöksessä (juuren avaruudessa, ±0,008 jaksosta), laskettu suunnitelmassa.</summary>
        static readonly Vector3[] LauttaP = new Vector3[LauttaPaikkoja];

        /// <summary>Lautan paikka j nykyisessä näytöksessä (n = suunnitelman näytös).</summary>
        static Vector3 Lautta(int n, int j) => LauttaP[j];

        /// <summary>
        /// Näytöksen suunnitelma: parven koko (5–7), kierrosten säde ja suunta, tuuli, alkukellujat ja välilasku (nousuajat ja
        /// kellumispaikat) sekä loppulaskeutumisten irtoamishetket ja lautan paikat (kuten ennen: kullekin lokin ja paikan
        /// parille irtoamishetki, jolloin suora hidastuva liito päättyisi lähimmäs paikkaa, ja paikat jaetaan niin, että liidot
        /// taipuvat yhteensä vähiten). Harvinaisessa syöksyt 42 %:n kohdalta 0,6 s välein.
        /// </summary>
        static void Suunnittele(int n, float L)
        {
            planN = n; planL = L; planHarv = Aikataulu.Harvinainen(n);
            float a9 = Aikataulu.Arvo(n, 9);
            parvi = a9 < 0.3f ? 5 : a9 < 0.7f ? 6 : 7;
            skaalaP = 0.88f + 0.24f * Aikataulu.Arvo(n, 8);
            kierrosP = Aikataulu.Arvo(n, 5) < 0.5f ? 1f : -1f;
            tuuliP = (Aikataulu.Arvo(n, 6) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 7) - 0.5f) * 50f;
            for (int g = 0; g < Max; g++) { Irti[g] = 1e9f; Ylos[g] = -1f; Lasku[g] = -1f; Aikaisin[g] = 0f; Paikka[g] = g; YlosPaikka[g] = g; }
            for (int j = 0; j < LauttaPaikkoja; j++)
                LauttaP[j] = new Vector3(LauttaX[j] + (Aikataulu.Arvo(n, 80 + j) - 0.5f) * 0.016f, 0f, LauttaZ[j] + (Aikataulu.Arvo(n, 130 + j) - 0.5f) * 0.016f);
            if (planHarv)
            {
                laskeutujia = parvi;
                for (int g = 0; g < parvi; g++) Irti[g] = 0.42f * L + g * 0.6f + (Aikataulu.Arvo(n, 70 + g) - 0.5f) * 0.3f;
                return;
            }
            // Loppulaskeutujat: kaikki, tai joka kolmannessa näytöksessä viimeinen jää kaartelemaan häivytykseen asti.
            laskeutujia = Aikataulu.Arvo(n, 17) < 0.3f ? parvi - 1 : parvi;
            float vali = Mathf.Min(0.75f, 3.2f / (laskeutujia - 1));
            // Välilasku (pitkä näytös): lentoon jäävä tai viimeinen laskeutuja laskeutuu välillä ja nousee taas.
            int vl = -1;
            if (L >= 15f && Aikataulu.Arvo(n, 19) < 0.6f)
            {
                vl = laskeutujia < parvi ? parvi - 1 : laskeutujia - 1;
                Lasku[vl] = 0.2f * L + 0.08f * L * Aikataulu.Arvo(n, 29);
                float kellu = 1.4f + 1.2f * Aikataulu.Arvo(n, 37);
                Ylos[vl] = Lasku[vl] + Liito + kellu;
                // Kellumispaikka: lautan paikka, joka on lähimpänä suoran hidastuvan liidon päätä.
                var a = Lento(n, vl, Lasku[vl]); var vv = Nopeus(n, vl, Lasku[vl]);
                var luonteva = new Vector3(a.x + vv.x * Liito / 3f, 0f, a.z + vv.z * Liito / 3f);
                float paras = 1e9f;
                for (int j = 0; j < LauttaPaikkoja; j++)
                {
                    float e = (Lautta(n, j) - luonteva).sqrMagnitude;
                    if (e < paras) { paras = e; YlosPaikka[vl] = j; }
                }
                Aikaisin[vl] = Ylos[vl] + Nousu + 0.4f;
            }
            // Alkukellujat (noin puolessa näytöksistä 1–2): kelluvat lautan reunapaikoilla ja nousevat parveen 1,3–3 s:n kohdalla.
            float a18 = Aikataulu.Arvo(n, 18);
            int alku = a18 < 0.3f ? 1 : a18 < 0.5f ? 2 : 0;
            for (int j = 0, g = laskeutujia - 1; j < alku && g >= 1; g--)
            {
                if (g == vl) continue;
                Ylos[g] = 1.3f + 1.2f * Aikataulu.Arvo(n, 27 + j) + 0.5f * j;
                YlosPaikka[g] = j == 0 ? 5 : 6;
                Aikaisin[g] = Ylos[g] + Nousu + 0.4f;
                j++;
            }
            // Loppulaskeutumiset: irtoamishetket ja paikat.
            for (int k = 0; k < laskeutujia; k++)
            {
                float nimellinen = L - 2.6f - (laskeutujia - 1 - k) * vali - Liito;
                for (int j = 0; j < LauttaPaikkoja; j++) { PariArvo[k, j] = -1e9f; PariAika[k, j] = Mathf.Max(nimellinen, Aikaisin[k]); }
                for (float d = -0.4f; d <= 2.5f; d += 0.05f)
                {
                    float ti = nimellinen - d;
                    if (ti < Aikaisin[k]) continue;
                    var a = Lento(n, k, ti); var vv = Nopeus(n, k, ti);
                    var luonteva = new Vector3(a.x + vv.x * Liito / 3f, 0f, a.z + vv.z * Liito / 3f);
                    for (int j = 0; j < LauttaPaikkoja; j++)
                    {
                        float arvo = -(Lautta(n, j) - luonteva).magnitude - 0.004f * Mathf.Abs(d);
                        if (arvo > PariArvo[k, j]) { PariArvo[k, j] = arvo; PariAika[k, j] = ti; }
                    }
                }
            }
            parasSumma = -1e9f;
            for (int j = 0; j < LauttaPaikkoja; j++) Varattu[j] = false;
            Jaa(0, 0f);
            for (int k = 0; k < laskeutujia; k++) Irti[k] = PariAika[k, Paikka[k]];
        }

        /// <summary>Paikkojen jako laskeutujille k… (rekursio vapaiden paikkojen yli; paras summa talteen). Parien arvot ovat ≤ 0,
        /// joten summa vain pienenee: haara, joka ei enää voi voittaa parasta, karsitaan (7 laskeutujaa: 5 040 → muutama sata).</summary>
        static void Jaa(int k, float summa)
        {
            if (summa <= parasSumma) return;
            if (k == laskeutujia)
            {
                if (summa > parasSumma) { parasSumma = summa; for (int i = 0; i < laskeutujia; i++) Paikka[i] = Kokeilu[i]; }
                return;
            }
            for (int j = 0; j < LauttaPaikkoja; j++)
            {
                if (Varattu[j]) continue;
                Varattu[j] = true; Kokeilu[k] = j;
                Jaa(k + 1, summa + PariArvo[k, j]);
                Varattu[j] = false;
            }
        }

        /// <summary>
        /// Lokin paikka kierroksella hetkellä s (juuren avaruudessa, kuten ennen): oma keskipiste, säde (vaihtelee ±10 %,
        /// rannikon suuntaan 1,75-kertainen, näytöksen skaala 0,88–1,12), kierrosaika ja vaihe jaksosta; korkeus aaltoilee.
        /// </summary>
        static Vector3 Lento(int n, int g, float s)
        {
            float sade = (0.045f + 0.02f * Aikataulu.Arvo(n, 10 + g)) * skaalaP * (1f + 0.1f * Mathf.Sin(s * 0.6f + g * 1.1f));
            float aika = 5f + 1.6f * Aikataulu.Arvo(n, 20 + g);
            float kulma = g * (Mathf.PI * 2f / parvi) + Aikataulu.Arvo(n, 30 + g) * 0.8f + kierrosP * 2f * Mathf.PI * s / aika;
            float cx = (Aikataulu.Arvo(n, 40 + g) - 0.5f) * 0.02f, cz = (Aikataulu.Arvo(n, 50 + g) - 0.5f) * 0.06f;
            float h = 0.05f + 0.028f * Aikataulu.Arvo(n, 60 + g) + 0.012f * Mathf.Sin(s * 0.8f + g * 2f);
            return new Vector3(cx + sade * Mathf.Cos(kulma), h, cz + 1.75f * sade * Mathf.Sin(kulma));
        }

        static Vector3 Nopeus(int n, int g, float s) => (Lento(n, g, s + 0.02f) - Lento(n, g, s - 0.02f)) / 0.04f;

        static Vector3 Hermite(Vector3 a, Vector3 ta, Vector3 b, Vector3 tb, float u)
        {
            u = Mathf.Clamp01(u);
            float u2 = u * u, u3 = u2 * u;
            return a * (2f * u3 - 3f * u2 + 1f) + ta * (u3 - 2f * u2 + u) + b * (3f * u2 - 2f * u3) + tb * (u3 - u2);
        }

        /// <summary>Laskeutumisliito: Hermiten kaari kierroksen pisteestä (tangentti) kohteeseen (lopputangentti 0); korkeus
        /// kuutiona kelluntakorkeuteen.</summary>
        static Vector3 LiitoPiste(int n, int g, float t0, Vector3 kohde, float u)
        {
            var a = Lento(n, g, t0); var v = Nopeus(n, g, t0);
            var p = Hermite(new Vector3(a.x, 0f, a.z), new Vector3(v.x, 0f, v.z) * Liito, new Vector3(kohde.x, 0f, kohde.z), Vector3.zero, u);
            u = Mathf.Clamp01(u);
            p.y = KelluY + (a.y - KelluY) * (1f - 3f * u * u + 2f * u * u * u);
            return p;
        }

        /// <summary>Nousu kelluntapaikasta: Hermiten kaari kohti liittymispistettä (alussa juoksu pinnalla), loppu kierroksen
        /// tangentilla; korkeus nousee juoksun jälkeen pehmeästi kierroksen korkeuteen.</summary>
        static Vector3 NousuPiste(int n, int g, float u)
        {
            var kp = Lautta(n, YlosPaikka[g]);
            float te = Ylos[g] + Nousu;
            var b = Lento(n, g, te); var vb = Nopeus(n, g, te);
            var suunta = new Vector3(b.x - kp.x, 0f, b.z - kp.z).normalized;
            var p = Hermite(new Vector3(kp.x, 0f, kp.z), suunta * (0.035f * Nousu), new Vector3(b.x, 0f, b.z), new Vector3(vb.x, 0f, vb.z) * Nousu, u);
            p.y = KelluY + (b.y - KelluY) * Pehmea((u - 0.12f) / 0.88f);
            return p;
        }

        /// <summary>Syöksyn suunta (kierroksen tangentti irtoamishetkellä) ja alkupiste.</summary>
        static Vector3 SyoksyEteen(int n, int g)
        {
            var v = Nopeus(n, g, Irti[g]);
            var e = new Vector3(v.x, 0f, v.z);
            return e.sqrMagnitude > 1e-10f ? e.normalized : Vector3.forward;
        }

        /// <summary>Tila ja paikka hetkellä s (juuren avaruudessa). u = edistyminen tilassa (0–1) tai aika tilan alusta.</summary>
        static Vector3 Rata(int n, int g, float s, out int tila, out float u)
        {
            u = 0f;
            // Nousuikkuna (alkukelluja tai välilasku): ennen välilaskua lennetään kierrosta.
            if (Ylos[g] >= 0f && s < Ylos[g] + Nousu && !(Lasku[g] >= 0f && s < Lasku[g]))
            {
                var kp = Lautta(n, YlosPaikka[g]);
                if (Lasku[g] >= 0f && s < Lasku[g] + Liito) { tila = Laskee; u = (s - Lasku[g]) / Liito; return LiitoPiste(n, g, Lasku[g], kp, u); }
                if (s < Ylos[g]) { tila = Kelluu; u = Lasku[g] >= 0f ? s - Lasku[g] - Liito : 100f; return new Vector3(kp.x, KelluY, kp.z); }
                tila = Nousee; u = (s - Ylos[g]) / Nousu; return NousuPiste(n, g, u);
            }
            if (s >= Irti[g])
            {
                if (!planHarv)
                {
                    var kohde = Lautta(n, Paikka[g]);
                    if (s < Irti[g] + Liito) { tila = Laskee; u = (s - Irti[g]) / Liito; return LiitoPiste(n, g, Irti[g], kohde, u); }
                    tila = Kelluu; u = s - Irti[g] - Liito; return new Vector3(kohde.x, KelluY, kohde.z);
                }
                var p0 = Lento(n, g, Irti[g]); var eteen = SyoksyEteen(n, g);
                float ts = s - Irti[g];
                if (ts < Syoksy)
                {
                    tila = Syoksyy; u = ts / Syoksy;
                    var p = p0 + eteen * (0.035f * u);
                    p.y = p0.y * (1f - u * u);
                    return p;
                }
                if (ts < Syoksy + Pinnalla) { tila = Pinnanalla; u = ts - Syoksy; var p = p0 + eteen * 0.035f; p.y = 0f; return p; }
                tila = Kelluu; u = ts - Syoksy - Pinnalla;
                var q = p0 + eteen * 0.047f;
                q.y = KelluY - 0.004f * (1f - Pehmea(u / 0.18f));
                return q;
            }
            tila = Lentaa; return Lento(n, g, s);
        }

        /// <summary>Kulmaero (−180…180).</summary>
        static float Ero(float a, float b) => Mathf.Repeat(b - a + 180f, 360f) - 180f;

        static float Suunta(Vector3 d) => Mathf.Atan2(d.x, d.z) * Mathf.Rad2Deg;

        /// <summary>
        /// Näytös: lokit kaartelevat, lyövät siivillään puuskittain ja liitävät kallistuen; alkukellujat nousevat ja välilaskija
        /// käy pinnalla; lopuksi laskeutuminen lauttaan tai (harvinainen) syöksyt. Lapset: 0–6 rungot, 7–13 oikeat ja 14–20
        /// vasemmat siivet, 21–27 varjot, 28–34 renkaat.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            if (n != planN || pituus != planL) Suunnittele(n, pituus);
            roottori.localPosition = new Vector3(-0.09f + (Aikataulu.Arvo(n, 3) - 0.5f) * 0.01f, 0f, (Aikataulu.Arvo(n, 4) - 0.5f) * 0.1f);
            roottori.localRotation = Quaternion.identity;
            roottori.localScale = Vector3.one;
            var kaanto = Quaternion.AngleAxis(180f, Vector3.right);

            for (int g = 0; g < Lapsia; g++)
            {
                var runko = lapset[g];
                var oikea = lapset[Lapsia + g];
                var vasen = lapset[Lapsia + Lapsia + g];
                var varjo = lapset[Lapsia + Lapsia2 + g];
                var rengas = lapset[Lapsia + Lapsia2 + Lapsia + g];
                if (g >= parvi)
                {
                    runko.localScale = Vector3.zero; oikea.localScale = Vector3.zero; vasen.localScale = Vector3.zero;
                    varjo.localScale = Vector3.zero; rengas.localScale = Vector3.zero;
                    continue;
                }
                float koko = 0.94f + 0.12f * Aikataulu.Arvo(n, 170 + g);
                var p = Rata(n, g, s, out int tila, out float u);

                // ---- Suunta, kallistus ja nyökkäys ----
                // Kierroksen asento hetkellä s on siirtymien pohja: nousun loppu, liidon alku ja syöksyn alku liukuvat siihen,
                // joten kallistus ja nyökkäys eivät hyppää tilan vaihtuessa.
                float kallistuvuus = 0.6f + 0.8f * Aikataulu.Arvo(n, 160 + g);
                RataAsento(n, g, Lentaa, s, kallistuvuus, out float kSuunta, out float kKall, out float kNyok);
                float suunta = kSuunta, kall = kKall, nyok = kNyok;
                if (tila == Nousee || tila == Laskee)
                {
                    // Suunta ja kaarre saman tilan radasta; laskeutumisen lopussa suunta pysyy (kaaren loppu voisi koukata).
                    float sk = tila == Laskee ? Mathf.Min(s, (ValiLasku(g, s) ? Lasku[g] : Irti[g]) + 0.6f * Liito) : s;
                    RataAsento(n, g, tila, sk, kallistuvuus, out suunta, out kall, out nyok);
                }

                // ---- Siivet: lyönti tai liito (θ rulla olkanivelen ympäri, β pyyhkäisy taakse, skaalat) ----
                float taajuus = 2.0f + 0.8f * Aikataulu.Arvo(n, 100 + g);
                float vaihe = s * taajuus + Aikataulu.Arvo(n, 110 + g);
                float c = Mathf.Cos(vaihe * 2f * Mathf.PI), sn = Mathf.Sin(vaihe * 2f * Mathf.PI);
                float yla = Mathf.Max(0f, -sn);
                float puuska = Pehmea(Mathf.Sin(s * (0.75f + 0.45f * Aikataulu.Arvo(n, 120 + g)) + 6.28f * Aikataulu.Arvo(n, 140 + g)) * 2.2f
                    - 0.3f + 0.8f * Aikataulu.Arvo(n, 150 + g));
                float thetaLyonti = 10f + 44f * c, betaLyonti = 16f * yla, sxLyonti = 1f - 0.15f * yla;
                float thetaLiito = 4f + 1.5f * Mathf.Sin(s * 1.3f + g);
                float theta = Mathf.Lerp(thetaLiito, thetaLyonti, puuska), beta = betaLyonti * puuska, sx = Mathf.Lerp(1f, sxLyonti, puuska);
                float sy = 1f, sz = 1f, taitto = 0f;
                bool piilossa = false;

                // Rengas (käännetty vesilapsi): keskipiste, säde, korkeus (roiske) ja elinaika; ei renkaita = −1.
                Vector3 rPaikka = Vector3.zero; float rSade = 0f, rKorkeus = Litea, rSoikeus = 1f; bool rNakyy = false;

                if (tila == Nousee)
                {
                    float ts = u * Nousu;
                    // Avaus taitetusta, sitten syvät lyönnit (amplitudi 1,2 juoksussa); runko nokka ylös juoksussa. Viimeisellä
                    // neljänneksellä asento liukuu kierroksen asentoon (lyönti tai liito puuskan mukaan, kallistus, nyökkäys).
                    float loppuun = Pehmea((u - 0.75f) / 0.25f);
                    theta = Mathf.Lerp(10f + 44f * 1.2f * c, theta, loppuun);
                    beta = Mathf.Lerp(14f * yla, beta, loppuun); sx = Mathf.Lerp(1f - 0.12f * yla, sx, loppuun);
                    taitto = 1f - Pehmea(ts / Avaus);
                    nyok = Mathf.Lerp(nyok + 4f + 12f * Pehmea(ts / 0.25f) * (1f - Pehmea((u - 0.1f) / 0.5f)), kNyok, loppuun);
                    kall = Mathf.Lerp(kall * Pehmea(u / 0.4f), kKall, loppuun);
                    suunta += Ero(suunta, kSuunta) * loppuun;
                    // Nousurengas lähtöpaikalla ja juoksun roiskeet.
                    if (ts < NousuRengasIka)
                    {
                        var kp = Lautta(n, YlosPaikka[g]);
                        float ika = ts / NousuRengasIka;
                        rNakyy = true; rPaikka = kp;
                        rSade = koko * (0.008f + 0.024f * Ulos(ika));
                        rKorkeus = Litea + 0.0028f * Pehmea(ika / 0.1f) * (1f - Pehmea((ika - 0.3f) / 0.35f));
                    }
                }
                else if (tila == Laskee)
                {
                    // Lyönnit loppuvat, liito; lopussa siivet nousevat V:ksi ja jarruttavat hitain lyönnein; nokka ylös.
                    theta = Mathf.Lerp(theta, thetaLiito, Pehmea(u / 0.25f));
                    beta *= 1f - Pehmea(u / 0.25f); sx = Mathf.Lerp(sx, 1f, Pehmea(u / 0.25f));
                    float v = Pehmea((u - 0.55f) / 0.35f);
                    // Jarrulyönnit päättyvät yläasentoon (LaskuTheta) juuri kosketuksessa, josta taitto jatkaa.
                    theta = Mathf.Lerp(theta, LaskuTheta - 10f + 10f * Mathf.Sin((u - 0.55f) * 9f - 2.48f), v);
                    // Alussa kallistus ja nyökkäys kierroksen arvoista (liidon kaarre eroaa kierroksen kaarteesta).
                    float alusta = 1f - Pehmea(u / 0.2f);
                    kall = Mathf.Lerp(kall, kKall, alusta) * (1f - Pehmea(u / 0.3f));
                    nyok = Mathf.Lerp(-3f * Pehmea(u / 0.2f) + 18f * Pehmea((u - 0.6f) / 0.4f), kNyok, alusta);
                }
                else if (tila == Kelluu)
                {
                    // u = aika kosketuksesta (alkukellujalla suuri). Taitto siivet ylhäältä selälle; kääntyy tuuleen; keinuu.
                    float laskeutui = KelluSuunta(n, g, s);
                    suunta = laskeutui;
                    float keinu = Mathf.Sin(s * 2.1f + g * 1.3f);
                    p.y += 0.0005f * keinu * Pehmea(u / 0.5f);
                    bool syoksysta = planHarv;
                    // Nyökkäys laskeutumisen oiennuksesta (15°) tai pulpahduksesta kellunnan keinuntaan.
                    float kellu = 2.5f * Mathf.Sin(s * 2.1f + g * 1.3f - 0.8f) + 4f;
                    nyok = Mathf.Lerp(syoksysta ? 0f : 15f, kellu, Pehmea(u / 0.5f));
                    kall = 2f * Mathf.Sin(s * 1.7f + g * 2.3f) * Pehmea(u / 0.5f);
                    theta = syoksysta ? 20f : LaskuTheta; beta = syoksysta ? 55f : 0f; sx = syoksysta ? 0.75f : 1f;
                    taitto = Pehmea(u / Taitto);
                    // Laskeutumisen rengas (syöksyn rengas alla roiskeena); sen jälkeen kelluvan vesiraja (pieni soikea rengas),
                    // joka kasvaa rungon alta esiin.
                    if (!syoksysta && u < RengasIka)
                    {
                        float ika = u / RengasIka;
                        rNakyy = true; rPaikka = p;
                        rSade = koko * (0.009f + 0.020f * Ulos(ika));
                        rKorkeus = Litea + 0.0035f * (1f - Pehmea(ika / 0.3f));
                    }
                    else
                    {
                        float esiin = Pehmea((u - (syoksysta ? 0.9f : RengasIka + 0.15f)) / 0.6f);
                        rNakyy = esiin > 0.01f; rPaikka = p;
                        rSade = koko * 0.0078f * (1f + 0.05f * keinu) * esiin; rSoikeus = 1.85f;
                    }
                }
                else if (tila == Syoksyy)
                {
                    var eteen = SyoksyEteen(n, g);
                    suunta = Suunta(eteen);
                    nyok = Mathf.Lerp(kNyok, -70f, Pehmea(u / 0.35f));
                    kall = kKall * (1f - Pehmea(u / 0.25f));
                    float k = Pehmea(u / 0.4f);
                    theta = Mathf.Lerp(theta, 20f, k); beta = Mathf.Lerp(beta, 55f, k); sx = Mathf.Lerp(sx, 0.75f, k);
                }
                else if (tila == Pinnanalla)
                {
                    piilossa = true;
                }

                // Syöksyn roiske (harvinainen): kruunu ja suihku sisääntulokohdassa, sitten rengas.
                if (planHarv && s >= Irti[g] + Syoksy && s < Irti[g] + Syoksy + RoiskeIka)
                {
                    // Roiske nousee ja painuu renkaaksi, joka laajenee pulpahtaneen lokin ympärille (yksi tapahtuma).
                    float ika = (s - Irti[g] - Syoksy) / RoiskeIka;
                    var p0 = Lento(n, g, Irti[g]);
                    rNakyy = true; rPaikka = p0 + SyoksyEteen(n, g) * 0.035f; rSoikeus = 1f;
                    rSade = koko * (0.008f + 0.024f * Ulos(ika / 0.9f));
                    rKorkeus = Litea + 0.027f * Pehmea(ika / 0.07f) * (1f - Pehmea((ika - 0.16f) / 0.3f));
                }

                // ---- Asetus ----
                if (piilossa)
                {
                    runko.localScale = Vector3.zero; oikea.localScale = Vector3.zero; vasen.localScale = Vector3.zero; varjo.localScale = Vector3.zero;
                }
                else
                {
                    var kierto = Quaternion.Euler(-nyok, suunta, kall);
                    runko.localPosition = p;
                    runko.localRotation = kierto;
                    // Kelluva lokki on pulleampi (taitetut siivet kylkien päällä).
                    runko.localScale = new Vector3(koko * (1f + 0.22f * taitto), koko * (1f + 0.06f * taitto), koko);
                    // Siipiasento: auki (θ, β, sx) → taitettu (θ, β, skaalat ja olkanivel) taiton mukaan.
                    float th = Mathf.Lerp(theta, TaitettuTheta, taitto), be = Mathf.Lerp(beta, TaitettuBeta, taitto);
                    float kx = Mathf.Lerp(sx, TaitettuSx, taitto), ky = Mathf.Lerp(sy, TaitettuSy, taitto), kz = Mathf.Lerp(sz, TaitettuSz, taitto);
                    var olka = Vector3.Lerp(OlkaAuki, OlkaKiinni, taitto) * koko;
                    oikea.localPosition = p + kierto * olka;
                    oikea.localRotation = kierto * Quaternion.AngleAxis(th, Vector3.forward) * Quaternion.AngleAxis(be, Vector3.up);
                    oikea.localScale = new Vector3(kx * koko, ky * koko, kz * koko);
                    vasen.localPosition = p + kierto * new Vector3(-olka.x, olka.y, olka.z);
                    vasen.localRotation = kierto * Quaternion.AngleAxis(180f - th, Vector3.forward) * Quaternion.AngleAxis(be, Vector3.up);
                    vasen.localScale = new Vector3(kx * koko, ky * koko, kz * koko);
                    // Varjo: pehmeä soikio linnun alla; leveys siipien vaakaprojektiosta (lyönti ja kallistus näkyvät varjossa).
                    float puoliVali = (0.0026f + 0.0298f * kx * Mathf.Cos(th * Mathf.Deg2Rad) * Mathf.Cos(be * Mathf.Deg2Rad)) * Mathf.Abs(Mathf.Cos(kall * Mathf.Deg2Rad));
                    float vx = koko * Mathf.Max(0.0045f, 0.95f * puoliVali), vz = koko * 0.0118f;
                    varjo.localPosition = new Vector3(p.x, VarjoY, p.z);
                    varjo.localRotation = Quaternion.AngleAxis(suunta, Vector3.up);
                    varjo.localScale = new Vector3(vx, Litea, vz);
                }
                if (rNakyy)
                {
                    rengas.localPosition = new Vector3(rPaikka.x, RengasY, rPaikka.z);
                    rengas.localRotation = Quaternion.AngleAxis(rSoikeus != 1f ? suunta : 25f * g, Vector3.up) * kaanto;
                    rengas.localScale = new Vector3(rSade, rKorkeus, rSade * rSoikeus);
                }
                else rengas.localScale = Vector3.zero;
            }
        }

        /// <summary>Suunta (kulkusuunta), kallistus (kaarteen mukaan, ±40°) ja nyökkäys (nousu/lasku, ±20°) tilan radasta
        /// keskierotuksella hetken s ympäriltä.</summary>
        static void RataAsento(int n, int g, int tila, float s, float kallistuvuus, out float suunta, out float kall, out float nyok)
        {
            const float dt = 0.05f;
            var pa = TilaPiste(n, g, tila, s - dt); var pb = TilaPiste(n, g, tila, s); var pc = TilaPiste(n, g, tila, s + dt);
            var d1 = new Vector3(pb.x - pa.x, 0f, pb.z - pa.z); var d2 = new Vector3(pc.x - pb.x, 0f, pc.z - pb.z);
            suunta = Suunta(d1 + d2);
            float kaarre = d1.sqrMagnitude > 1e-12f && d2.sqrMagnitude > 1e-12f ? Ero(Suunta(d1), Suunta(d2)) / dt : 0f;
            float vaaka = (d1 + d2).magnitude / (2f * dt);
            kall = Mathf.Clamp(-0.42f * kaarre * kallistuvuus, -40f, 40f);
            nyok = Mathf.Clamp(Mathf.Atan2((pc.y - pa.y) / (2f * dt), Mathf.Max(0.01f, vaaka)) * Mathf.Rad2Deg * 0.8f, -20f, 20f);
        }

        /// <summary>Saman tilan rata hetkellä s (suunnan ja kaarteen keskierotukseen; tilan rajojen yli jatkettuna).</summary>
        static Vector3 TilaPiste(int n, int g, int tila, float s)
        {
            if (tila == Lentaa) return Lento(n, g, s);
            if (tila == Nousee)
            {
                float u = (s - Ylos[g]) / Nousu;
                return u > 1f ? Lento(n, g, s) : NousuPiste(n, g, Mathf.Max(0f, u));
            }
            // Laskee: välilasku tai loppulasku.
            bool vali = ValiLasku(g, s);
            float t0 = vali ? Lasku[g] : Irti[g];
            if (s < t0) return Lento(n, g, s);
            var kohde = Lautta(n, vali ? YlosPaikka[g] : Paikka[g]);
            return LiitoPiste(n, g, t0, kohde, (s - t0) / Liito);
        }

        /// <summary>Välilaskun vaihe (liito, kellunta) ennen välinousua.</summary>
        static bool ValiLasku(int g, float s) => Lasku[g] >= 0f && s < Ylos[g];

        /// <summary>Kelluvan suunta: laskeutumissuunnasta tuuleen (Kaanto); ennen nousua käännös nousun suuntaan; alkukelluja
        /// aloittaa tuuleen päin.</summary>
        static float KelluSuunta(int n, int g, float s)
        {
            float tuuli = tuuliP + (Aikataulu.Arvo(n, 190 + g) - 0.5f) * 24f;
            float suunta;
            // Laskeutumissuunta: liidon suunta 60 %:n kohdalla (kaaren loppu voisi koukata).
            bool loppu = s >= Irti[g];
            if (planHarv && loppu) suunta = Suunta(SyoksyEteen(n, g));
            else if (loppu || Lasku[g] >= 0f)
            {
                float t0 = loppu ? Irti[g] : Lasku[g];
                var kohde = Lautta(n, loppu ? Paikka[g] : YlosPaikka[g]);
                var a = LiitoPiste(n, g, t0, kohde, 0.525f); var b = LiitoPiste(n, g, t0, kohde, 0.675f);
                suunta = Suunta(new Vector3(b.x - a.x, 0f, b.z - a.z));
            }
            else suunta = tuuli;
            float kosketus = loppu ? Irti[g] + (planHarv ? Syoksy + Pinnalla : Liito) : Lasku[g] >= 0f ? Lasku[g] + Liito : -100f;
            suunta += Ero(suunta, tuuli) * Pehmea((s - kosketus) / Kaanto);
            // Ennen nousua: käännös kohti nousun suuntaa viimeisen sekunnin aikana.
            if (!loppu && Ylos[g] >= 0f && s < Ylos[g])
            {
                var kp = Lautta(n, YlosPaikka[g]);
                var b = Lento(n, g, Ylos[g] + Nousu);
                float nousuun = Suunta(new Vector3(b.x - kp.x, 0f, b.z - kp.z));
                suunta += Ero(suunta, nousuun) * Pehmea((s - (Ylos[g] - 1.1f)) / 1.0f);
            }
            return suunta;
        }
    }
}
