using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI STONEHENGE (speksi docs/raportit/erikoismallit/stonehenge.md, omistaja hyväksyi 22.0x).
    /// Tunnistus sekunnissa: sarsenkehä (pystykivet ja yhtenäinen kansikivirengas koillisessa, aukkoja lounaassa), sisällä
    /// viisi trilithonia hevosenkengän muodossa, joka avautuu koilliseen; kantapääkivi akselilla koillisessa; matala valli.
    /// Mittakaava tarkennettu speksistä (1,0 = 60 m, ei 110 m): sarsenkehä 33 m → halkaisija 0,55, jotta kehä erottuu 60 pt:ssä
    /// renkaana eikä pisteinä; valli ja kantapääkivi tuotu kehän lähelle (0,44–0,5). Pystyliioittelu 1,8.
    /// Musteella piirretään vain kivet: valli on osa ilman ääriviivaa, ja ruoho on kartta (ei mitali).
    /// Liikkuvat osat:
    ///   valli         paikallaan (ei ääriviivaa); ruoho on kartta (ei nurmilevyä)
    ///   lammas1–3     kolme lammasta laiduntaa (perusliike: askel, pysähdys, käännös; lähestyttäessä päät ylös)
    ///   aurinko       auringonnousu kantapääkiven takaa (harvinainen ~1/10 ja napautus)
    ///   sade          kultainen säde maassa kantapääkiveltä kehän läpi (auringonnousun aikana)
    ///   kuu           kalpea kuu samassa suunnassa yöllä
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Juhannusakselin suunta (atsimuutti 50° pohjoisesta itään): yksikkövektori mallin avaruudessa.</summary>
        static readonly Vector3 ShAkseli = new Vector3(Mathf.Sin(50f * Mathf.PI / 180f), 0f, Mathf.Cos(50f * Mathf.PI / 180f));
        const float ShKehaSade = 0.275f, ShKiviKorkeus = 0.123f, ShKansiPaksuus = 0.024f;
        /// <summary>Kantapääkiven paikka (akselilla vallin kohdalla).</summary>
        static Vector3 ShKantapaa => ShAkseli * 0.43f;

        /// <summary>Suunta atsimuutista (astetta pohjoisesta itään) mallin avaruudessa.</summary>
        static Vector3 ShSuunta(float atsimuutti)
        {
            float a = atsimuutti * Mathf.PI / 180f;
            return new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
        }

        /// <summary>Kivi: pohjan keskipiste, tangenttisuunta, leveys, paksuus ja korkeus (Seina keskeltä).</summary>
        static void ShKivi(Rakentaja r, Vector3 p, Vector3 tangentti, float leveys, float paksuus, float korkeus, Color sivu, Color laki)
        {
            var t = new Vector3(tangentti.x, 0f, tangentti.z).normalized * (leveys * 0.5f);
            r.Seina(p - t, p + t, korkeus, paksuus, sivu, laki);
        }

        static readonly Color[] ShKivet = { Hex(0xc4b18c), Hex(0xb7a47f), Hex(0xcdbb96), Hex(0xbba985) };
        static readonly Color ShKiviLaki = Hex(0xe2d6b6);
        /// <summary>Valli vaaleana seepiana ja ruoho paperina eli karttana (speksi kohta 5; ei vihreää levyä, kartta, ei mitali).</summary>
        static readonly Color ShValli = Hex(0xc9b58c), ShVallinLaki = Hex(0xdccba5);

        static Mesh StonehengeRunko()
        {
            var r = new Rakentaja();
            // Sarsenkehä: 30 paikkaa 12° välein akselista myötäpäivään; pystyssä ne, jotka seisovat nykyään (koillinen lähes
            // ehjä, lounaassa aukkoja), kansikivet ehjinä koillisen kaarella.
            bool[] pysty = new bool[30];
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 15, 16, 21, 22, 23 }) pysty[i] = true;
            Vector3 Keha(int i, float sade) => ShSuunta(50f + i * 12f) * sade;
            // Sarsenkehä (pystykivet ja kansikivet) yhtenä ääriviivaosana: muste kiertää kehän ulkoreunaa.
            r.AloitaOsa();
            for (int i = 0; i < 30; i++)
            {
                if (!pysty[i]) continue;
                var p = Keha(i, ShKehaSade);
                var tangentti = Vector3.Cross(Vector3.up, p);
                ShKivi(r, p, tangentti, 0.034f, 0.024f, ShKiviKorkeus, ShKivet[i % ShKivet.Length], ShKiviLaki);
            }
            // Kansikivet: yhtenäinen kaari pystykivien päällä (27 → 8) ja kaksi yksittäistä.
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 10, 22 })
            {
                var a = Keha(i, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                var b = Keha((i + 1) % 30, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                r.Seina(a, b, ShKansiPaksuus, 0.028f, ShKivet[(i + 2) % ShKivet.Length], ShKiviLaki);
            }
            r.LopetaOsa();
            // Kaatuneet kivet makaavat säteen suuntaan.
            foreach (int i in new[] { 13, 18, 19, 25 })
            {
                var p = Keha(i, ShKehaSade + 0.045f);
                var s = p.normalized;
                r.Seina(p - s * 0.05f, p + s * 0.05f, 0.022f, 0.034f, ShKivet[i % ShKivet.Length], ShKiviLaki);
            }

            // Trilithonit: hevosenkenkä kehän sisällä (säde 0,135), avautuu koilliseen; suurin lounaassa (akseli + 180°).
            var trilithonit = new (float kulma, float korkeus, bool ehja)[]
            {
                (180f, 0.225f, false), (132f, 0.19f, true), (228f, 0.19f, true), (84f, 0.165f, true), (276f, 0.165f, true),
            };
            r.AloitaOsa();
            foreach (var (kulma, h, ehja) in trilithonit)
            {
                var suunta = ShSuunta(50f + kulma);
                var keski = suunta * 0.135f;
                var tangentti = Vector3.Cross(Vector3.up, suunta).normalized;
                var vasen = keski - tangentti * 0.026f;
                var oikea = keski + tangentti * 0.026f;
                ShKivi(r, vasen, tangentti, 0.036f, 0.03f, h, ShKivet[1], ShKiviLaki);
                if (ehja)
                {
                    ShKivi(r, oikea, tangentti, 0.036f, 0.03f, h, ShKivet[2], ShKiviLaki);
                    r.Seina(vasen - tangentti * 0.02f + Vector3.up * h, oikea + tangentti * 0.02f + Vector3.up * h, 0.026f, 0.03f, ShKivet[0], ShKiviLaki);
                }
                else
                {
                    // Suuri trilithon: toinen pystykivi ja kansikivi kaatuneina keskelle (kuten nykyään).
                    var maassa = keski - suunta * 0.06f;
                    r.Seina(maassa - tangentti * 0.055f, maassa + tangentti * 0.055f, 0.024f, 0.036f, ShKivet[3], ShKiviLaki);
                    var kansi = keski - suunta * 0.02f + tangentti * 0.05f;
                    r.Seina(kansi - suunta * 0.04f, kansi + suunta * 0.04f, 0.02f, 0.028f, ShKivet[0], ShKiviLaki);
                }
            }
            r.LopetaOsa();
            // Kantapääkivi akselilla ja kaksi asemakiveä.
            r.Kallio(ShKantapaa, 0.05f, 0.042f, 0.034f, 0.03f, 0.105f, 6, 5, ShKivet[3], ShKiviLaki);
            foreach (float kulma in new[] { 50f + 125f, 50f - 55f })
                ShKivi(r, ShSuunta(kulma) * 0.39f, Vector3.Cross(Vector3.up, ShSuunta(kulma)), 0.026f, 0.02f, 0.05f, ShKivet[0], ShKiviLaki);
            return r.Verkko("Stonehenge");
        }

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: pystyuurteet, kulmien vaaleat viisteet (kaiverruksen valokohta), sinikivet
        /// (tummempi kivi seepiaan päin), alttarikivi, murtopinnat ja kaatuneen kansikiven tappireiät. Ominaisuuksina, koska
        /// Em-paletti on toisessa tiedostossa (staattisten kenttien alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color ShLUurre => Color.Lerp(ShKivet[1], EmMuste, 0.42f);
        static Color ShLSini => Color.Lerp(ShKivet[1], EmSeepia, 0.45f);
        static Color ShLSiniLaki => Color.Lerp(ShKiviLaki, EmSeepia, 0.28f);
        static Color ShLAlttari => Color.Lerp(ShKivet[3], EmKivi, 0.6f);
        static Color ShLMurtuma => Color.Lerp(ShKivet[0], EmSeepia, 0.25f);
        static Color ShLReikaVari => Color.Lerp(EmSeepia, EmMuste, 0.55f);
        /// <summary>Viisteen sävy: kiven oma väri vaalennettuna kohti lakia (särmät erottuvat vaaleina viivoina).</summary>
        static Color ShLViiste(Color sivu) => Color.Lerp(sivu, ShKiviLaki, 0.45f);
        /// <summary>Kansikivien jiiri: puolet kehän 12°:n taitteesta (tan 6°), jolloin vierekkäiset kansikivet kohtaavat saumana.</summary>
        const float ShLJiiri = 0.1051f;

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (sarsenkehä, trilithonit, kaatuneet kivet ja kantapääkivi omina osinaan) ja osien pivotit kuin rungossa, noin 2,9 ×
        /// kolmiot lähikuvan yksityiskohtiin (1 653, runko 568). Korvaa rungon vain lähellä; valli, lampaat, aurinko, säde ja kuu pysyvät ennallaan.
        ///   sarsenkehä   pystykivet rapautuneina: 1–3 lohjennutta kulmaa vaaleina viisteinä (leveys vaihtelee kulmittain ja
        ///                korkeudella), leveillä tahkoilla tummat pystyuurteet, kivi kapenee ylöspäin; kansikivet viistein
        ///                särmin ja tummin saumoin (jiiri); paljailla lailla tapit (tappiliitos)
        ///   trilithonit  samat rapautuneet kivet; Suuren trilithonin pystyssä olevan kiven laella iso tappi, kaatunut pystykivi
        ///                kahtena kappaleena alttarikiven päällä ja kaatuneen kansikiven tappireiät ylöspäin
        ///   sinikivet    sisäkehä (sarsenkehän ja trilithonien välissä) ja hevosenkenkä trilithonien sisällä erillisinä
        ///                pienempinä, tummempina kivinä: osa kallellaan, muutama tynkä ja yksi kaatumassa
        ///   muut         kaatuneet sarsenit halkeamineen (yksi murtunut kahtia), kantapääkivi karheana uurteisena lohkareena,
        ///                asemakivet ja teuraskivi (Slaughter Stone) maassa akselilla kehän ja kantapääkiven välissä
        /// </summary>
        static Mesh StonehengeLahi()
        {
            var r = new Rakentaja();
            bool[] pysty = new bool[30];
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 15, 16, 21, 22, 23 }) pysty[i] = true;
            bool[] kansi = new bool[30];
            foreach (int i in new[] { 26, 27, 28, 29, 0, 1, 2, 3, 4, 5, 6, 7, 10, 22 }) kansi[i] = true;
            Vector3 Keha(int i, float sade) => ShSuunta(50f + i * 12f) * sade;

            // 1. Sarsenkehä yhtenä ääriviivaosana kuten rungossa: rapautuneet pystykivet, tapit paljailla lailla ja kansikivet.
            r.AloitaOsa();
            for (int i = 0; i < 30; i++)
            {
                if (!pysty[i]) continue;
                var p = Keha(i, ShKehaSade);
                var t = Vector3.Cross(Vector3.up, p).normalized;
                bool vasen = kansi[(i + 29) % 30], oikea = kansi[i];
                ShLKivi(r, p, t, 0.034f, 0.024f, ShKiviKorkeus, ShKivet[i % ShKivet.Length], ShKiviLaki, 100 + i, vasen && oikea ? 0 : 1);
                var laki = p + Vector3.up * ShKiviKorkeus;
                if (!vasen) ShLTappi(r, laki - t * 0.0075f, t, 0.0078f, 0.0042f, ShKiviLaki);
                if (!oikea) ShLTappi(r, laki + t * 0.0075f, t, 0.0078f, 0.0042f, ShKiviLaki);
            }
            for (int i = 0; i < 30; i++)
            {
                if (!kansi[i]) continue;
                var a = Keha(i, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                var b = Keha((i + 1) % 30, ShKehaSade) + Vector3.up * ShKiviKorkeus;
                bool edellinen = kansi[(i + 29) % 30], seuraava = kansi[(i + 1) % 30];
                ShLKansi(r, a, b, ShKansiPaksuus, 0.028f, ShKivet[(i + 2) % ShKivet.Length], ShKiviLaki, 0.0036f,
                    edellinen ? ShLJiiri : 0f, seuraava ? ShLJiiri : 0f);
            }
            r.LopetaOsa();
            // Kaatuneet kivet säteen suuntaan kuten rungossa (kukin oma osansa) halkeamineen; kivi 19 on murtunut kahtia.
            foreach (int i in new[] { 13, 18, 19, 25 })
            {
                var p = Keha(i, ShKehaSade + 0.045f);
                var s = p.normalized;
                var vari = ShKivet[i % ShKivet.Length];
                if (i == 19)
                {
                    var sv = Vector3.Cross(Vector3.up, s);
                    r.AloitaOsa();
                    ShLMakaava(r, p - s * 0.05f, p - s * 0.004f, 0.022f, 0.034f, vari, ShKiviLaki, 200 + i, false, true);
                    ShLMakaava(r, p + s * 0.003f + sv * 0.004f, p + s * 0.05f + sv * 0.009f, 0.021f, 0.033f, vari, ShKiviLaki, 220 + i, true, false);
                    r.LopetaOsa();
                }
                else ShLMakaava(r, p - s * 0.05f, p + s * 0.05f, 0.022f, 0.034f, vari, ShKiviLaki, 200 + i, false, false, i != 18);
            }

            // 2. Trilithonit yhtenä ääriviivaosana kuten rungossa (hevosenkenkä avautuu koilliseen); keskellä alttarikivi.
            var trilithonit = new (float kulma, float korkeus, bool ehja)[]
            {
                (180f, 0.225f, false), (132f, 0.19f, true), (228f, 0.19f, true), (84f, 0.165f, true), (276f, 0.165f, true),
            };
            r.AloitaOsa();
            int nro = 0;
            foreach (var (kulma, h, ehja) in trilithonit)
            {
                nro++;
                var suunta = ShSuunta(50f + kulma);
                var keski = suunta * 0.135f;
                var tangentti = Vector3.Cross(Vector3.up, suunta).normalized;
                var vasen = keski - tangentti * 0.026f;
                var oikea = keski + tangentti * 0.026f;
                if (ehja)
                {
                    ShLKivi(r, vasen, tangentti, 0.036f, 0.03f, h, ShKivet[1], ShKiviLaki, 300 + nro, 0);
                    ShLKivi(r, oikea, tangentti, 0.036f, 0.03f, h, ShKivet[2], ShKiviLaki, 320 + nro, 0);
                    ShLKansi(r, vasen - tangentti * 0.02f + Vector3.up * h, oikea + tangentti * 0.02f + Vector3.up * h, 0.026f, 0.03f,
                        ShKivet[0], ShKiviLaki, 0.004f, 0f, 0f);
                }
                else
                {
                    // Suuri trilithon: pystyssä olevan kiven laella iso tappi (kärki rungon lakikorkeudella); toinen pystykivi
                    // kaatuneena kahtena kappaleena alttarikiven päällä ja kansikivi kumollaan (tappireiät ylöspäin), kuten nykyään.
                    const float tappi = 0.0075f;
                    ShLKivi(r, vasen, tangentti, 0.036f, 0.03f, h - tappi, ShKivet[1], ShKiviLaki, 300 + nro, 1);
                    ShLTappi(r, vasen + Vector3.up * (h - tappi), tangentti, 0.013f, tappi, ShKiviLaki);
                    var maassa = keski - suunta * 0.06f;
                    var alttari = keski - suunta * 0.088f + tangentti * 0.008f;
                    var ak = (tangentti * 0.95f + suunta * 0.31f).normalized;
                    ShLMakaava(r, alttari - ak * 0.046f, alttari + ak * 0.04f, 0.008f, 0.022f, ShLAlttari, Color.Lerp(ShLAlttari, ShKiviLaki, 0.45f), 330);
                    ShLMakaava(r, maassa - tangentti * 0.055f, maassa - tangentti * 0.004f, 0.024f, 0.036f, ShKivet[3], ShKiviLaki, 331, false, true);
                    ShLMakaava(r, maassa + tangentti * 0.003f - suunta * 0.004f, maassa + tangentti * 0.055f - suunta * 0.011f, 0.023f, 0.035f,
                        ShKivet[3], ShKiviLaki, 332, true, false);
                    var kk = keski - suunta * 0.02f + tangentti * 0.05f;
                    ShLMakaava(r, kk - suunta * 0.04f, kk + suunta * 0.04f, 0.02f, 0.028f, ShKivet[0], ShKiviLaki, 333);
                    foreach (float f in new[] { -0.021f, 0.019f }) ShLReika(r, kk + suunta * f + Vector3.up * 0.0205f, suunta, 0.0056f, 0.0045f);
                }
            }
            r.LopetaOsa();

            // 3. Kantapääkivi karheana lohkareena rungon jalanjäljellä ja kaksi asemakiveä; teuraskivi maassa akselilla.
            ShLKantapaa(r, ShKantapaa);
            int an = 0;
            foreach (float kulma in new[] { 50f + 125f, 50f - 55f })
                ShLKivi(r, ShSuunta(kulma) * 0.39f, Vector3.Cross(Vector3.up, ShSuunta(kulma)), 0.026f, 0.02f, 0.05f, ShKivet[0], ShKiviLaki, 400 + an++, 2, 2);
            var poikki = Vector3.Cross(Vector3.up, ShAkseli);
            var teuras = ShAkseli * 0.35f - poikki * 0.012f;
            // Matala (0,008), jotta auringonnousun säde (0,01 maasta) kulkee sen yli eikä välky sen laen kanssa.
            ShLMakaava(r, teuras - poikki * 0.034f - ShAkseli * 0.005f, teuras + poikki * 0.028f + ShAkseli * 0.004f, 0.008f, 0.026f,
                ShKivet[2], ShKiviLaki, 410);

            // 4. Sinikivet: sisäkehä sarsenkehän ja trilithonien välissä (koillinen tiheä, lounas harva, kuten nykyään; osa
            // kallellaan, tynkiä ja yksi kaatumassa) ja hevosenkenkä trilithonien sisällä, symmetrinen akselin suhteen ja korkein
            // lounaan puolella kuten trilithonit (Suuren trilithonin edessä kaatuneiden kivien kohdalla ei kiviä).
            // Tyyppi: 0 pystyssä, 1 kallellaan, 2 tynkä, 3 kaatumassa; kivet 12°:n välein (sarsenien väleissä) pienellä heitolla,
            // lounaasta ja idästä puuttuu kuusi.
            var sinikeha = new (float kulma, int tyyppi)[]
            {
                (8f, 0), (20f, 0), (32f, 0), (44f, 0), (56f, 0), (68f, 0), (80f, 1), (92f, 0), (104f, 0), (128f, 2), (140f, 0),
                (152f, 0), (164f, 3), (176f, 0), (200f, 2), (224f, 1), (248f, 2), (272f, 0), (296f, 1), (308f, 0), (320f, 0),
                (332f, 0), (344f, 1), (356f, 0),
            };
            var sat = new System.Random(1873);
            foreach (var (kulma, tyyppi) in sinikeha)
            {
                var d = ShSuunta(kulma + 6f * ((float)sat.NextDouble() - 0.5f));
                var p = d * (0.205f + 0.006f * ((float)sat.NextDouble() - 0.5f));
                var tt = Vector3.Cross(Vector3.up, d);
                float lev = 0.016f + 0.005f * (float)sat.NextDouble(), kork = 0.036f + 0.02f * (float)sat.NextDouble();
                float heilahdus = (float)sat.NextDouble() - 0.5f;
                var kallistus = tyyppi == 1 ? (d * 0.8f + tt * heilahdus).normalized * (kork * 0.32f) : tyyppi == 3 ? tt * (kork * 0.75f) : Vector3.zero;
                ShLSinikivi(r, p, tt + d * (0.2f * heilahdus), lev, 0.012f, tyyppi == 2 ? 0.016f : tyyppi == 3 ? kork * 0.6f : kork, kallistus, 500 + (int)kulma);
            }
            foreach (var (kulma, kork) in new[] { (147f, 0.05f), (160f, 0.058f), (173f, 0.066f), (287f, 0.064f), (300f, 0.056f), (313f, 0.05f) })
            {
                var d = ShSuunta(kulma);
                ShLSinikivi(r, d * 0.092f, Vector3.Cross(Vector3.up, d), 0.016f, 0.012f, kork, kulma == 300f ? d * 0.01f : Vector3.zero, 600 + (int)kulma);
            }
            return r.Verkko("Stonehenge-lahi");
        }

        /// <summary>
        /// Lähitason pystykivi (rungossa ShKivi eli Seina): pohjan keskipiste p, tangentti, leveys, paksuus ja korkeus kuten
        /// rungossa. Poikkileikkaus on suorakulmio, jonka kulmista 1–3 on lohjennut: viisteen leveys vaihtelee kulmittain ja
        /// alhaalta ylös, ja viisteet ovat vaaleampia (kaiverruksen valokohdat särmillä). Leveillä tahkoilla kolme tummaa
        /// pystyuurretta (oletus; kapenevat päistään), ja kivi kapenee hieman ylöspäin. Laki: 0 = kansikiven alla (ei piirretä),
        /// 1 = paljas tasainen laki (tappeja varten, enintään 6 kolmiota), 2 = kupera ja epätasainen (8). 16–20 kolmiota ja laki;
        /// oma osa.
        /// </summary>
        static void ShLKivi(Rakentaja r, Vector3 p, Vector3 tangentti, float leveys, float paksuus, float korkeus, Color sivu, Color laki,
            int siemen, int lakityyppi, int uurteita = 3)
        {
            var sat = new System.Random(siemen);
            float S() => (float)sat.NextDouble();
            var t = new Vector3(tangentti.x, 0f, tangentti.z).normalized;
            var n = Vector3.Cross(Vector3.up, t);
            float hw = leveys * 0.5f, hd = paksuus * 0.5f, m = Mathf.Min(hw, hd);
            float kt = 0.9f + 0.05f * S(), kn = 0.92f + 0.05f * S();
            // Lohjenneet kulmat: kukin kulma on viistetty todennäköisyydellä 0,55 (vähintään yksi ja enintään kolme); terävän kulman
            // viistetahko surkastuu nollaksi, eikä sitä piirretä.
            var lohki = new float[4];
            int lohkeamia = 0;
            for (int k = 0; k < 4; k++) { lohki[k] = S() < 0.55f ? 1f : 0f; lohkeamia += (int)lohki[k]; }
            if (lohkeamia == 0) lohki[siemen % 4] = 1f;
            if (lohkeamia == 4) lohki[(siemen + 2) % 4] = 0f;
            Vector2[] Leikkaus(float sx, float sz)
            {
                float c0 = lohki[0] * m * (0.12f + 0.33f * S()), c1 = lohki[1] * m * (0.12f + 0.33f * S()),
                    c2 = lohki[2] * m * (0.12f + 0.33f * S()), c3 = lohki[3] * m * (0.12f + 0.33f * S());
                float x = hw * sx, z = hd * sz;
                return new[]
                {
                    new Vector2(-x + c0, -z), new Vector2(x - c1, -z), new Vector2(x, -z + c1), new Vector2(x, z - c2),
                    new Vector2(x - c2, z), new Vector2(-x + c3, z), new Vector2(-x, z - c3), new Vector2(-x, -z + c0),
                };
            }
            var qa = Leikkaus(1f, 1f); var qy = Leikkaus(kt, kn);
            const int N = 8;
            var ala = new Vector3[N]; var yla = new Vector3[N];
            for (int i = 0; i < N; i++)
            {
                ala[i] = p + t * qa[i].x + n * qa[i].y;
                yla[i] = p + t * qy[i].x + n * qy[i].y + Vector3.up * (lakityyppi == 2 ? korkeus * (0.955f + 0.03f * S()) : korkeus);
                // Terävässä kulmassa kaksi pistettä yhtyy: sama korkeus, ettei laelle jää pystysuoraa suikaletta.
                if (i > 0 && Mathf.Abs(qy[i].x - qy[i - 1].x) + Mathf.Abs(qy[i].y - qy[i - 1].y) < 1e-7f) yla[i] = yla[i - 1];
            }
            if (Mathf.Abs(qy[0].x - qy[N - 1].x) + Mathf.Abs(qy[0].y - qy[N - 1].y) < 1e-7f) yla[N - 1] = yla[0];
            var keski = p + Vector3.up * (korkeus * 0.5f);
            var viiste = ShLViiste(sivu);
            r.AloitaOsa();
            for (int i = 0; i < N; i++) r.NelioKeskelta(ala[i], ala[(i + 1) % N], yla[(i + 1) % N], yla[i], keski, i % 2 == 0 ? sivu : viiste);
            // Pystyuurteet leveillä tahkoilla (reunat 0 → 1 ja 4 → 5): toisella kaksi, toisella yksi (vuorotellen kivittäin).
            int kaksi = siemen % 2 == 0 ? 0 : 4;
            foreach (int e in new[] { 0, 4 })
                for (int u = 0; u < (e == kaksi ? uurteita - 1 : 1); u++)
                {
                    float s0 = e != kaksi ? 0.35f + 0.3f * S() : u == 0 ? 0.2f + 0.2f * S() : 0.58f + 0.22f * S(), s1 = s0 + 0.08f * (S() - 0.5f);
                    float f0 = 0.04f + 0.2f * S(), f1 = 0.72f + 0.24f * S();
                    ShLUurrePinnalla(r, ala[e], ala[e + 1], yla[e], yla[e + 1], s0, s1, f0, f1, keski, 0.0011f + 0.0007f * S());
                }
            // Kansikiven alla oleva laki jää piiloon (jiirisaumat sulkevat kehän), joten sitä ei piirretä.
            if (lakityyppi != 0)
            {
                if (lakityyppi == 1) for (int i = 1; i + 1 < N; i++) r.KolmioUlos(yla[0], yla[i], yla[i + 1], Vector3.up, laki);
                else
                {
                    var k = Vector3.zero;
                    foreach (var v in yla) k += v;
                    k = k / N + Vector3.up * (korkeus * 0.035f);
                    for (int i = 0; i < N; i++) r.KolmioUlos(k, yla[i], yla[(i + 1) % N], Vector3.up, laki);
                }
            }
            r.LopetaOsa();
        }

        /// <summary>Tumma uurre (tai halkeama) nelikulmaisella pinnalla a0–a1 (ala) ja b0–b1 (ylä): kohdat s0 → s1 reunan
        /// suunnassa ja f0 → f1 korkeussuunnassa; kapea, päistään suippo vinoneliö hieman pinnan edessä. 2 kolmiota.</summary>
        static void ShLUurrePinnalla(Rakentaja r, Vector3 a0, Vector3 a1, Vector3 b0, Vector3 b1, float s0, float s1, float f0, float f1,
            Vector3 keski, float leveys)
        {
            Vector3 P(float s, float f) => Vector3.Lerp(Vector3.Lerp(a0, a1, s), Vector3.Lerp(b0, b1, s), f);
            var nrm = Vector3.Cross(a1 - a0, b0 - a0).normalized;
            var kp = (a0 + a1 + b0 + b1) * 0.25f;
            if (Vector3.Dot(nrm, kp - keski) < 0f) nrm = -nrm;
            var sivu = (a1 - a0).normalized * (leveys * 0.5f);
            var nosto = nrm * 0.0006f;
            Vector3 A = P(s0, f0) + nosto, B = P(s1, f1) + nosto, M = P((s0 + s1) * 0.5f, (f0 + f1) * 0.5f) + nosto;
            r.NelioUlos(A, M + sivu, B, M - sivu, nrm, ShLUurre);
        }

        /// <summary>Tappi pystykiven laella (tappiliitos kansikiven reikään): matala katkaistu nelisivuinen pyramidi, jonka
        /// tasainen laki valaistuu (nuppi, ei kuoppa); pohjan keskipiste p, sivu ja korkeus. 10 kolmiota.</summary>
        static void ShLTappi(Rakentaja r, Vector3 p, Vector3 tangentti, float koko, float korkeus, Color vari)
        {
            var t = new Vector3(tangentti.x, 0f, tangentti.z).normalized * (koko * 0.5f);
            var n = Vector3.Cross(Vector3.up, t);
            Vector3[] a = { p - t - n, p + t - n, p + t + n, p - t + n };
            var b = new Vector3[4];
            for (int i = 0; i < 4; i++) b[i] = p + (a[i] - p) * 0.62f + Vector3.up * korkeus;
            var k = p + Vector3.up * (korkeus * 0.3f);
            for (int i = 0; i < 4; i++) r.NelioKeskelta(a[i], a[(i + 1) % 4], b[(i + 1) % 4], b[i], k, vari);
            r.NelioUlos(b[0], b[1], b[2], b[3], Vector3.up, vari);
        }

        /// <summary>
        /// Lähitason kansikivi (rungossa Seina a → b): pohjan päätepisteet a ja b, korkeus ja paksuus kuten rungossa; yläsärmät
        /// viistetty (vaaleat viisteet), pohja ei näy. Jiiri (tan puolikulmasta) pidentää päädyn ulkoreunaa ja lyhentää
        /// sisäreunaa, jolloin kehän vierekkäiset kansikivet kohtaavat ilman rakoa; jiiripäässä ei päätytahkoa, ja b-päähän
        /// piirretään tumma sauma (ulkotahko, laki, sisätahko). Pitkät tahkot 10 kolmiota, kukin avoin pääty 4 ja sauma 6.
        /// </summary>
        static void ShLKansi(Rakentaja r, Vector3 a, Vector3 b, float korkeus, float paksuus, Color sivu, Color laki, float viiste,
            float jiiriA, float jiiriB)
        {
            var t = b - a; t.y = 0f;
            var tu = t.normalized;
            var n = Vector3.Cross(Vector3.up, t).normalized;
            float hd = paksuus * 0.5f, c = viiste;
            var q = new[] { new Vector2(-hd, 0f), new Vector2(-hd, korkeus - c), new Vector2(-hd + c, korkeus), new Vector2(hd - c, korkeus),
                new Vector2(hd, korkeus - c), new Vector2(hd, 0f) };
            // n osoittaa kehän keskustaan (x < 0 = ulkoreuna): ulkoreunaa jatketaan ja sisäreunaa lyhennetään jiirin verran.
            Vector3 A(int i) => a + n * q[i].x + Vector3.up * q[i].y + tu * (q[i].x * jiiriA);
            Vector3 B(int i) => b + n * q[i].x + Vector3.up * q[i].y - tu * (q[i].x * jiiriB);
            var keski = (a + b) * 0.5f + Vector3.up * (korkeus * 0.5f);
            var vv = ShLViiste(sivu);
            r.AloitaOsa();
            for (int i = 0; i + 1 < q.Length; i++) r.NelioKeskelta(A(i), B(i), B(i + 1), A(i + 1), keski, i == 2 ? laki : i == 1 || i == 3 ? vv : sivu);
            for (int i = 1; i + 1 < q.Length; i++)
            {
                if (jiiriA == 0f) r.KolmioKeskelta(A(0), A(i), A(i + 1), keski, sivu);
                if (jiiriB == 0f) r.KolmioKeskelta(B(0), B(i), B(i + 1), keski, sivu);
            }
            // Sauma seuraavaan kansikiveen (jiiripää b): tumma viiva ulkotahkolla, laella ja sisätahkolla.
            if (jiiriB > 0f)
            {
                ShLUurrePinnalla(r, A(0), B(0), A(1), B(1), 0.988f, 0.988f, 0f, 1f, keski, 0.0017f);
                ShLUurrePinnalla(r, A(2), B(2), A(3), B(3), 0.99f, 0.99f, -0.1f, 1.1f, keski, 0.0017f);
                ShLUurrePinnalla(r, A(5), B(5), A(4), B(4), 0.988f, 0.988f, 0f, 1f, keski, 0.0017f);
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason maassa makaava kivi (rungossa Seina a → b maassa): pituus a → b, korkeus ja leveys kuten rungossa; yläsärmät
        /// lohjenneet (vaaleat viisteet, leveys vaihtelee), laella pitkittäinen taite, ja kivi kapenee b:tä kohti. Murtunut pää
        /// saa murtopinnan sävyn; halkeama = tumma murtoviiva laen poikki. 12 kolmiota, päädyt 2 × 5 ja halkeama 4; oma osa.
        /// </summary>
        static void ShLMakaava(Rakentaja r, Vector3 a, Vector3 b, float korkeus, float leveys, Color sivu, Color laki, int siemen,
            bool murtoA = false, bool murtoB = false, bool halkeama = false)
        {
            var sat = new System.Random(siemen);
            float S() => (float)sat.NextDouble();
            var t = b - a; t.y = 0f;
            var s = Vector3.Cross(Vector3.up, t).normalized;
            float hw = leveys * 0.5f, m = Mathf.Min(hw, korkeus);
            float c0 = m * (0.25f + 0.3f * S()), c1 = m * (0.25f + 0.3f * S());
            float u = hw * (0.6f * S() - 0.3f), g = korkeus * (0.06f + 0.06f * S());
            var q = new[] { new Vector2(-hw, 0f), new Vector2(-hw, korkeus - c0), new Vector2(-hw + c0, korkeus), new Vector2(u, korkeus - g),
                new Vector2(hw - c1, korkeus), new Vector2(hw, korkeus - c1), new Vector2(hw, 0f) };
            float kb = 0.88f + 0.08f * S();
            Vector3 A(int i) => a + s * q[i].x + Vector3.up * q[i].y;
            Vector3 B(int i) => b + s * (q[i].x * kb) + Vector3.up * (q[i].y * kb);
            var keski = (a + b) * 0.5f + Vector3.up * (korkeus * 0.4f);
            var vv = ShLViiste(sivu);
            r.AloitaOsa();
            for (int i = 0; i + 1 < q.Length; i++) r.NelioKeskelta(A(i), B(i), B(i + 1), A(i + 1), keski, i == 2 || i == 3 ? laki : i == 1 || i == 4 ? vv : sivu);
            for (int i = 1; i + 1 < q.Length; i++)
            {
                r.KolmioKeskelta(A(0), A(i), A(i + 1), keski, murtoA ? ShLMurtuma : sivu);
                r.KolmioKeskelta(B(0), B(i), B(i + 1), keski, murtoB ? ShLMurtuma : sivu);
            }
            if (halkeama)
            {
                // Murtoviiva laen poikki kahtena palana (laen taitteen kohdalla mutka).
                float f0 = 0.3f + 0.4f * S(), f1 = f0 + 0.12f * (S() - 0.5f), f2 = f1 + 0.1f * (S() - 0.5f);
                ShLUurrePinnalla(r, A(2), A(3), B(2), B(3), 0.1f, 1f, f0, f1, keski, 0.0024f);
                ShLUurrePinnalla(r, A(3), A(4), B(3), B(4), 0f, 0.9f, f1, f2, keski, 0.0024f);
            }
            r.LopetaOsa();
        }

        /// <summary>Tappireikä kumollaan olevan kansikiven päällä: tumma kuusikulmio (ellipsi) pinnan tasossa, keskipiste p,
        /// pitkä akseli suuntaan. 4 kolmiota.</summary>
        static void ShLReika(Rakentaja r, Vector3 p, Vector3 suunta, float pituus, float leveys)
        {
            var u = new Vector3(suunta.x, 0f, suunta.z).normalized;
            var v = Vector3.Cross(Vector3.up, u);
            var P = new Vector3[6];
            for (int i = 0; i < 6; i++)
            {
                float a = i * Mathf.PI / 3f;
                P[i] = p + u * (Mathf.Cos(a) * pituus * 0.5f) + v * (Mathf.Sin(a) * leveys * 0.5f);
            }
            for (int i = 1; i < 5; i++) r.KolmioUlos(P[0], P[i], P[i + 1], Vector3.up, ShLReikaVari);
        }

        /// <summary>
        /// Lähitason kantapääkivi (rungossa Kallio(p, 0,05, 0,042, 0,034, 0,03, 0,105, 6, siemen 5)): rungon kuusi kulmaa samoilla
        /// satunnaisluvuilla (sama jalanjälki ja korkeus), väliin kohinaiset kulmat ja keskelle pullistuva rengas, laki kupera;
        /// tummat uurteet etelä- ja koillispuolella. Karhea, muokkaamaton lohkare. 60 kolmiota ja uurteet 8, oma osa kuten rungossa.
        /// </summary>
        static void ShLKantapaa(Rakentaja r, Vector3 p)
        {
            const float rx = 0.05f, rz = 0.042f, tx = 0.034f, tz = 0.03f, h = 0.105f;
            const int k = 6;
            var sat = new System.Random(5);
            var ala = new Vector3[2 * k]; var yla = new Vector3[2 * k]; var kes = new Vector3[2 * k];
            for (int i = 0; i < k; i++)
            {
                float a = i * Mathf.PI * 2f / k;
                float s = 0.85f + 0.3f * (float)sat.NextDouble();
                float s2 = s * (0.9f + 0.2f * (float)sat.NextDouble());
                ala[2 * i] = p + new Vector3(Mathf.Cos(a) * rx * 0.5f * s, 0f, Mathf.Sin(a) * rz * 0.5f * s);
                yla[2 * i] = p + new Vector3(Mathf.Cos(a) * tx * 0.5f * s2, h * (0.94f + 0.12f * (float)sat.NextDouble()), Mathf.Sin(a) * tz * 0.5f * s2);
            }
            var sat2 = new System.Random(1873);
            for (int i = 0; i < k; i++)
            {
                int j = 2 * i + 1, e = 2 * i, q = (2 * i + 2) % (2 * k);
                float ka = 1f + 0.06f * ((float)sat2.NextDouble() - 0.3f), kb = 1f + 0.08f * ((float)sat2.NextDouble() - 0.3f);
                ala[j] = p + ((ala[e] + ala[q]) * 0.5f - p) * ka;
                var y = p + ((yla[e] + yla[q]) * 0.5f - p) * kb;
                yla[j] = new Vector3(y.x, (yla[e].y + yla[q].y) * 0.5f + 0.004f * ((float)sat2.NextDouble() - 0.5f), y.z);
            }
            for (int i = 0; i < 2 * k; i++)
            {
                float f = 0.45f + 0.08f * ((float)sat2.NextDouble() - 0.5f), pull = 1.06f + 0.06f * (float)sat2.NextDouble();
                var m = Vector3.Lerp(ala[i], yla[i], f);
                var ms = new Vector3(p.x, m.y, p.z);
                kes[i] = ms + (m - ms) * pull;
            }
            var keski = Vector3.zero;
            foreach (var v in yla) keski += v;
            keski = keski / (2 * k) + Vector3.up * 0.009f;
            var sisa = p + Vector3.up * (h * 0.5f);
            r.AloitaOsa();
            for (int i = 0; i < 2 * k; i++)
            {
                int j = (i + 1) % (2 * k);
                r.NelioKeskelta(ala[i], ala[j], kes[j], kes[i], sisa, ShKivet[3]);
                r.NelioKeskelta(kes[i], kes[j], yla[j], yla[i], sisa, ShKivet[3]);
                r.KolmioUlos(keski, yla[i], yla[j], Vector3.up, ShKiviLaki);
            }
            // Uurteet: kahdella eteläpuolen ja yhdellä koillispuolen tahkolla (näkyvät kartan oletuskulmasta ja akselin suunnasta).
            foreach (var (i, ala0, s0, s1) in new[] { (8, true, 0.35f, 0.5f), (9, false, 0.55f, 0.4f), (1, false, 0.45f, 0.6f) })
            {
                int j = (i + 1) % (2 * k);
                if (ala0) ShLUurrePinnalla(r, ala[i], ala[j], kes[i], kes[j], s0, s1, 0.15f, 1f, sisa, 0.0016f);
                ShLUurrePinnalla(r, kes[i], kes[j], yla[i], yla[j], ala0 ? s1 : s0, ala0 ? s1 + 0.05f : s1, 0f, 0.8f, sisa, 0.0016f);
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Sinikivi (lähitaso): pieni suorakaiteen muotoinen pilari, pohjan keskipiste p, suunta (tangentti), leveys, paksuus ja
        /// korkeus; laki kapenee, on hieman vino ja siirtyy kallistuksen verran (kallellaan oleva kivi). 10 kolmiota, oma pieni osa
        /// (ei ääriviivaa).
        /// </summary>
        static void ShLSinikivi(Rakentaja r, Vector3 p, Vector3 tangentti, float leveys, float paksuus, float korkeus, Vector3 kallistus, int siemen)
        {
            var sat = new System.Random(siemen);
            float S() => (float)sat.NextDouble();
            var t = new Vector3(tangentti.x, 0f, tangentti.z).normalized;
            var n = Vector3.Cross(Vector3.up, t);
            float hw = leveys * 0.5f, hd = paksuus * 0.5f, k = 0.74f + 0.12f * S();
            var ala = new[] { p - t * hw - n * hd, p + t * hw - n * hd, p + t * hw + n * hd, p - t * hw + n * hd };
            var huippu = p + kallistus + Vector3.up * korkeus;
            var yla = new Vector3[4];
            for (int i = 0; i < 4; i++) yla[i] = huippu + (ala[i] - p) * k + Vector3.up * (korkeus * 0.08f * (S() - 0.5f));
            var keski = p + kallistus * 0.5f + Vector3.up * (korkeus * 0.5f);
            r.AloitaOsa();
            for (int i = 0; i < 4; i++) r.NelioKeskelta(ala[i], ala[(i + 1) % 4], yla[(i + 1) % 4], yla[i], keski, ShLSini);
            r.NelioUlos(yla[0], yla[1], yla[2], yla[3], Vector3.up, ShLSiniLaki);
            r.LopetaOsa();
        }

        /// <summary>Valli: matala rengas (sisärinne, laki, ulkorinne) 0,44–0,5 ja aukko koillisessa akselin kohdalla.</summary>
        static Mesh StonehengeValli()
        {
            var r = new Rakentaja();
            const int n = 30;
            float[] sade = { 0.44f, 0.458f, 0.482f, 0.5f };
            float[] kork = { 0.002f, 0.014f, 0.014f, 0.002f };
            for (int i = 0; i < n; i++)
            {
                float a0 = i * 360f / n, a1 = (i + 1) * 360f / n;
                // Aukko akselin kohdalla (avenue).
                float keski = (a0 + a1) * 0.5f;
                float ero = Mathf.Abs(((keski - 50f) % 360f + 540f) % 360f - 180f);
                if (ero < 10f) continue;
                for (int k = 0; k < 3; k++)
                {
                    Vector3 p00 = ShSuunta(a0) * sade[k] + Vector3.up * kork[k], p01 = ShSuunta(a1) * sade[k] + Vector3.up * kork[k];
                    Vector3 p10 = ShSuunta(a0) * sade[k + 1] + Vector3.up * kork[k + 1], p11 = ShSuunta(a1) * sade[k + 1] + Vector3.up * kork[k + 1];
                    r.NelioUlos(p00, p10, p11, p01, Vector3.up, k == 1 ? ShVallinLaki : ShValli);
                }
            }
            return r.Verkko("Stonehenge-valli");
        }

        /// <summary>Lammas: vaalea runko ja tumma pää (+Z eteen), pivot maassa keskellä.</summary>
        static Mesh StonehengeLammas()
        {
            var r = new Rakentaja();
            r.Laatikko(new Vector3(0f, 0.008f, 0f), new Vector3(0.018f, 0.016f, 0.03f), EmVaahto, EmVaahto);
            r.Laatikko(new Vector3(0f, 0.013f, 0.019f), new Vector3(0.01f, 0.01f, 0.01f), EmMuste, EmMuste);
            return r.Verkko("Stonehenge-lammas");
        }

        /// <summary>Aurinko: kultainen kahdeksankulmainen kaksoispyramidi (näkyy ylhäältä ja sivulta); pivot keskellä.</summary>
        static Mesh StonehengeAurinko()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.036f, 0.036f, EmKulta, 8);
            return r.Verkko("Stonehenge-aurinko");
        }

        /// <summary>Kuu: sama muoto kalpeana.</summary>
        static Mesh StonehengeKuu()
        {
            var r = new Rakentaja();
            r.Timantti(Vector3.zero, 0.03f, 0.03f, EmVaahto, 8);
            return r.Verkko("Stonehenge-kuu");
        }

        /// <summary>Säde: kultainen kaista maassa kantapääkiveltä (pivot) kehän keskustan läpi lounaaseen (0,62 akselia pitkin),
        /// levenee kohti keskustaa; animaatio skaalaa sen pivotista (kivestä) esiin.</summary>
        static Mesh StonehengeSade()
        {
            var r = new Rakentaja();
            var sivu = Vector3.Cross(Vector3.up, ShAkseli).normalized;
            Vector3 y = Vector3.up * 0.004f, loppu = -ShAkseli * 0.62f;
            r.NelioUlos(-sivu * 0.016f + y, sivu * 0.016f + y, loppu + sivu * 0.035f + y, loppu - sivu * 0.035f + y, Vector3.up, EmKulta);
            return r.Verkko("Stonehenge-sade");
        }

        /// <summary>
        /// Maatason osien nosto (laite 27.9.: liioiteltu maasto peitti 0,002:n korkeudella olevan nurmilevyn ja vallin osittain,
        /// koska malli on kartalla kymmenien kilometrien levyinen): valli, lampaat ja säde 0,006 yksikköä maan yläpuolella.
        /// </summary>
        static readonly Vector3 ShMaataso = new Vector3(0f, 0.006f, 0f);

        /// <summary>Lampaiden lepopaikat (vallin sisällä lounaassa ja etelässä). ShMaataso:n jälkeen:
        /// staattiset kentät alustetaan tekstijärjestyksessä, ja ennen 27.9. lampaat jäivät korkeudelle 0.</summary>
        static readonly Vector3[] ShLampaat = { ShSuunta(200f) * 0.36f + ShMaataso, ShSuunta(225f) * 0.38f + ShMaataso, ShSuunta(160f) * 0.37f + ShMaataso };

        /// <summary>
        /// Liikkuvat osat (Natiivisepän rajapinta). Liikkeen laskee Linssisepän liikeydin avaimen ja osan nimen mukaan.
        /// Säteen pivot on kantapääkivessä, ja se on rakennettu suoraan akselin suuntaan: animoija skaalaa sen kivestä esiin.
        /// </summary>
        static LiikkuvaOsaMaaritys[] StonehengeOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "valli", Verkko = StonehengeValli, Pivot = ShMaataso, Liike = Liike.Liuku },
            new LiikkuvaOsaMaaritys { Nimi = "lammas1", Verkko = StonehengeLammas, Pivot = ShLampaat[0], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 20f },
            new LiikkuvaOsaMaaritys { Nimi = "lammas2", Verkko = StonehengeLammas, Pivot = ShLampaat[1], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 25f },
            new LiikkuvaOsaMaaritys { Nimi = "lammas3", Verkko = StonehengeLammas, Pivot = ShLampaat[2], Liike = Liike.Liuku, Akseli = Vector3.forward,
                Laajuus = 0.04f, KayS = 6f, TaukoS = 30f },
            new LiikkuvaOsaMaaritys { Nimi = "aurinko", Verkko = StonehengeAurinko, Pivot = ShAkseli * 0.5f, Liike = Liike.Nousu, Akseli = Vector3.up,
                Laajuus = 0.11f, KayS = 28f, TaukoS = 80f },
            new LiikkuvaOsaMaaritys { Nimi = "sade", Verkko = StonehengeSade, Pivot = ShKantapaa + ShMaataso, Liike = Liike.Aalto, Akseli = -ShAkseli, Laajuus = 1f },
            new LiikkuvaOsaMaaritys { Nimi = "kuu", Verkko = StonehengeKuu, Pivot = ShAkseli * 0.5f + Vector3.up * 0.1f, Liike = Liike.Valahdys },
        };

        static readonly bool stonehenge = Rekisteroi("stonehenge",
            new Erikoismalli { Runko = StonehengeRunko, Osat = StonehengeOsat, Lahi = StonehengeLahi, Kolmiot0 = 858, KokoKerroin = 1.5f });
    }
}
