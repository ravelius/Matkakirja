using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI KINDERDIJKIN MYLLYT (speksi docs/raportit/erikoismallit/kinderdijk.md, omistajan jono 27.9. klo 01.4x;
    /// v3 27.9. klo 08.4x laitteen jälkeen: v2 näkyi pelikoossa "tikapuuna", jossa kanavat hallitsivat ja myllyt jäivät
    /// 2 pt:n tapeiksi). Tunnistus sekunnissa: kaksi riviä isoja tuulimyllyjä siipiristeineen kanavien varrella.
    /// Tyylitelty suunta: kanavat kulkevat idästä länteen, ja rivit ovat kameraa kohti (oikeasti kanavat kulkevat
    /// pohjoisluoteesta etelään), jolloin myllyt näkyvät vierekkäin eivätkä peräkkäin. Kuusi myllyä kahdeksan sijaan
    /// (etu- ja takarivi lomittain), mittakaava liioiteltu noin 20-kertaiseksi (runko 0,22, siipiväli 0,24), jotta
    /// siipiristit erottuvat myös pienten maiden kynnyskoossa (33 pt). Etualalla Nederwaardin pyöreät tiilimyllyt, takana
    /// Overwaardin kahdeksankulmaiset ruokomyllyt. Siivet kohti kameraa (tuuli etelälounaasta, tyylitelty).
    /// Liikkuvat osat:
    ///   siivet0–5   siipiristit pyörivät napansa ympäri (akseli etelälounaaseen), numerointi lännestä itään kummastakin
    ///               rivistä vuorotellen: perusliike 1–3 myllyä kerrallaan, harvinainen aalto kaikki kuusi lännestä itään,
    ///               lähestyttäessä ensimmäinen herää
    ///   valot       yöllä ikkunat ja valaistusviikon hehku myllyjen edessä
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Siipien suunta (tuulen tulosuunta etelälounas, tyylitelty kameraa kohti): siipiristin taso on kohtisuorassa
        /// tätä vastaan, ja siivet pyörivät tämän akselin ympäri. Sama vakio liikeytimessä (KinderdijkLiike.Akseli).</summary>
        static readonly Vector3 KdTuuli = new Vector3(-0.25881904f, 0f, -0.96592583f);
        const float KdRunko = 0.22f, KdNapa = 0.225f, KdSiipi = 0.12f, KdSiipiLeveys = 0.034f;
        /// <summary>Myllyjen määrä (liikeytimessä KinderdijkLiike.Myllyja).</summary>
        const int KdMyllyja = 6;

        /// <summary>Kanavat (etukanava Nederwaardin rivin edessä, takakanava rivien välissä): alku (länsipää), suunta
        /// (atsimuutti pohjoisesta itään, tyylitelty itään) ja pituus.</summary>
        static readonly (Vector3 alku, float atsimuutti, float pituus)[] KdKanavat =
        {
            (new Vector3(-0.46f, 0f, -0.19f), 90f, 0.92f),
            (new Vector3(-0.46f, 0f, 0.07f), 90f, 0.92f),
        };

        static Vector3 KdSuunta(float atsimuutti)
        {
            float a = atsimuutti * Mathf.PI / 180f;
            return new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
        }

        /// <summary>Myllyn paikka: rivi k (0 = etu, pyöreät tiilimyllyt; 1 = taka, ruokomyllyt), järjestys i (0–2) lännestä
        /// itään. Takarivi on puolen välin verran lännempänä, joten myllyt näkyvät eturivin välistä.</summary>
        static Vector3 KdMylly(int k, int i) => k == 0 ? new Vector3(-0.225f + i * 0.3f, 0f, -0.1f) : new Vector3(-0.375f + i * 0.3f, 0f, 0.16f);

        /// <summary>Siipiosan j (0–5) mylly: numerointi lännestä itään rivien välillä vuorotellen (taka, etu, taka, …).</summary>
        static Vector3 KdOsanMylly(int j) => KdMylly(j % 2 == 0 ? 1 : 0, j / 2);

        static readonly Color KdTiili = Hex(0x80634a), KdTiiliVaalea = Hex(0x9a7c5e), KdRuoko = Hex(0x958665), KdRuokoTumma = Hex(0x7c6e52);
        static readonly Color KdPuu = Hex(0x3e3024), KdPurje = Hex(0xddcfae), KdKaisla = Hex(0x8c9468);

        static Mesh KinderdijkRunko()
        {
            var r = new Rakentaja();
            // Kanavat vesikaistoina (ei pohjalevyä eikä penkereitä: pelto on kartta). Vesi ja kaislat ovat yksi
            // ääriviivaryhmä, jolloin musteviiva kiertää vain kanavan reunan: v3:n esikatselussa penkereet ja erilliset
            // ääriviivat tekivät kanavista pelikoossa raskaita "hyllyjä" myllyjen alle.
            foreach (var (alku, atsimuutti, pituus) in KdKanavat)
            {
                var d = KdSuunta(atsimuutti);
                var s = Vector3.Cross(Vector3.up, d).normalized;
                Vector3 a = alku + Vector3.up * 0.003f, b = alku + d * pituus + Vector3.up * 0.003f;
                r.AloitaOsa();
                r.NelioUlos(a - s * 0.026f, b - s * 0.026f, b + s * 0.026f, a + s * 0.026f, Vector3.up, EmVesi);
                // Kaislikkotupsuja kanavan reunoilla (ilman ääriviivaa, pienet).
                for (int i = 1; i < 6; i++)
                {
                    var p = alku + d * (pituus * i / 6f) + s * (i % 2 == 0 ? 0.03f : -0.03f);
                    r.Kartio(p, 0.009f, 0.014f, 4, KdKaisla);
                }
                r.LopetaOsa();
            }
            // Myllyt: etualalla pyöreät tiilimyllyt (maahan asti ulottuvat siivet, ruokolakki), takana kahdeksankulmaiset
            // ruokomyllyt tiilijalalla (korkea lakki). Ovi etelään kameraa kohti.
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 3; i++)
                {
                    var p = KdMylly(k, i);
                    r.AloitaOsa();
                    if (k == 0)
                    {
                        r.Vaippa(p, 0.05f, 0.032f, KdRunko, 10, i % 2 == 0 ? KdTiili : KdTiiliVaalea);
                        r.Kartio(p + Vector3.up * KdRunko, 0.04f, 0.045f, 8, KdRuokoTumma);
                        r.Laatta(p + new Vector3(0f, 0.022f, -0.049f), Vector3.back, 0.018f, 0.036f, KdPuu);
                    }
                    else
                    {
                        r.Vaippa(p, 0.058f, 0.056f, 0.022f, 8, KdTiili, Mathf.PI / 8f);   // tiilijalka
                        r.Vaippa(p + Vector3.up * 0.022f, 0.055f, 0.032f, KdRunko - 0.022f, 8, i % 2 == 0 ? KdRuoko : KdRuokoTumma, Mathf.PI / 8f);
                        r.Kartio(p + Vector3.up * KdRunko, 0.038f, 0.05f, 8, KdRuokoTumma);
                        r.Laatta(p + new Vector3(0f, 0.04f, -0.05f), Vector3.back, 0.018f, 0.034f, KdPuu);
                    }
                    // Akseli ja napa: lyhyt tumma palkki lakista siipien puolelle.
                    r.Laatikko(p + Vector3.up * (KdNapa - 0.008f) + KdTuuli * 0.034f, new Vector3(0.016f, 0.016f, 0.016f), KdPuu, KdPuu);
                    r.LopetaOsa();
                }
            // Wisboomin pumppaamo takarivin itäpäässä: tiilihalli harjakatolla ja korkea piippu.
            var w = new Vector3(0.4f, 0f, 0.25f);
            r.AloitaOsa();
            r.Laatikko(w, new Vector3(0.1f, 0.035f, 0.055f), KdTiili, KdTiili);
            r.Harja(w + Vector3.up * 0.035f, new Vector3(0.1f, 0.025f, 0.055f), EmKatto, KdTiili);
            r.Vaippa(w + new Vector3(0.062f, 0f, 0f), 0.011f, 0.007f, 0.12f, 6, KdTiiliVaalea);
            r.LopetaOsa();
            return r.Verkko("Kinderdijk");
        }

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: tervattu jalka, ikkuna-aukot, maalatut kehykset ja lakin lauta, veden heijastus
        /// ja väre sekä pumppaamon räystäskaista. Ominaisuuksina, koska Em-paletti on toisessa tiedostossa (staattisten kenttien
        /// alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color KdLTerva => Color.Lerp(KdTiili, EmMuste, 0.45f);
        static Color KdLAukko => Color.Lerp(KdPuu, EmMuste, 0.3f);
        static Color KdLKehys => Color.Lerp(KdPurje, KdTiiliVaalea, 0.15f);
        static Color KdLHeijastus => Color.Lerp(EmVesi, KdTiili, 0.3f);
        static Color KdLVare => Color.Lerp(EmVesi, EmVaahto, 0.55f);
        static Color KdLRaystas => Color.Lerp(EmKatto, EmPaperi, 0.35f);

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (kaksi kanavaa kaislikkoineen, kuusi myllyä, pumppaamo) ja osien pivotit kuin rungossa, noin 2,8 × kolmiot lähikuvan
        /// yksityiskohtiin. Korvaa rungon vain lähellä; siipiristit (liikkuvat osat) ja valot pysyvät ennallaan (navat, ovet ja
        /// ikkunat rungon paikoilla, joten siivet ja yövalot osuvat niihin). Yksityiskohdat ovat siellä, missä lepäävät siivet eivät
        /// peitä: rungon alaosassa, itäpuolella, lakissa navan yläpuolella ja kanavissa. Pinnan yksityiskohdat ovat pieniä osia
        /// ilman omaa ääriviivaa; kaislat kuuluvat kanavan ääriviivaryhmään kuten rungossa.
        ///   pyöreät    tervattu jalka, kaksi ulkonevaa tiilikerrosta (valoisa yläreuna ja varjoviiva), kehystetty ovi
        ///              kynnyskivineen, ikkuna oven yllä, matala ikkuna oven vieressä ja korkea itäpuolella, maalatut kehykset
        ///   kahdeksan- tiilijalka ja sen yli levenevä ruokohelma, kaksi ruokokaistan sidosta (valoisa reuna ja varjoviiva),
        ///   kulmaiset  kehystetty ovi helman yllä, ikkuna oven yllä, matala ikkuna lounaassa ja korkea kaakossa
        ///   lakit      ruokolakin sidosnauha ja lakin tumma etulauta sekä vaalea parta (baard) akselin alla, napa kuten rungossa
        ///   kanavat    kaislatuppaat neljästä korresta rungon viidellä paikalla ja kanavan päissä, myllyjen kapenevat heijastukset
        ///              ja väreet
        ///   pumppaamo  räystäskaistainen katto, neljä kaari-ikkunaa kehyksineen ja räystäslista; piipussa jalusta, kahdeksankulmainen
        ///              varsi, levenevä kruunu ja tumma suu
        /// </summary>
        static Mesh KinderdijkLahi()
        {
            var r = new Rakentaja();
            // 1. Kanavat kuten rungossa (vesi ja kaislat yhtenä ääriviivaryhmänä); kaislatuppaat rungon paikoilla ja kanavan päissä.
            foreach (var (alku, atsimuutti, pituus) in KdKanavat)
            {
                var d = KdSuunta(atsimuutti);
                var s = Vector3.Cross(Vector3.up, d).normalized;
                Vector3 a = alku + Vector3.up * 0.003f, b = alku + d * pituus + Vector3.up * 0.003f;
                r.AloitaOsa();
                r.NelioUlos(a - s * 0.026f, b - s * 0.026f, b + s * 0.026f, a + s * 0.026f, Vector3.up, EmVesi);
                for (int i = 0; i <= 6; i++)
                {
                    float t = i == 0 ? 0.035f : i == 6 ? 0.965f : i / 6f;
                    var p = alku + d * (pituus * t) + s * (i % 2 == 0 ? 0.03f : -0.03f);
                    KdLKaislat(r, p, d, i % 2 == 0 ? 1f : -1f, i == 0 || i == 6 ? 0.8f : 1f);
                }
                r.LopetaOsa();
            }
            // Myllyjen heijastukset kanavassa (tumma kapeneva juova veden pinnassa myllyn edessä) ja väre niiden poikki; pienet osat.
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 3; i++)
                {
                    var p = KdMylly(k, i);
                    float zk = KdKanavat[k].alku.z, y = 0.0036f;
                    r.NelioUlos(new Vector3(p.x - 0.024f, y, zk + 0.024f), new Vector3(p.x + 0.024f, y, zk + 0.024f), new Vector3(p.x + 0.015f, y, zk - 0.02f),
                        new Vector3(p.x - 0.015f, y, zk - 0.02f), Vector3.up, KdLHeijastus);
                    r.NelioUlos(new Vector3(p.x - 0.03f, y + 0.0004f, zk - 0.0035f), new Vector3(p.x + 0.022f, y + 0.0004f, zk - 0.0035f),
                        new Vector3(p.x + 0.022f, y + 0.0004f, zk - 0.0015f), new Vector3(p.x - 0.03f, y + 0.0004f, zk - 0.0015f), Vector3.up, KdLVare);
                }

            // 2. Myllyt: vaipat, lakki ja napa omina ääriviivaosinaan kuten rungossa. Pinnan yksityiskohdat (kerrokset, ovet,
            // ikkunat, lakin sidos ja laudat) ovat pieniä osia ryhmän ulkopuolella: ryhmässä niiden kasvatettu ääriviiva näkyisi
            // rungon ääriviivassa tummina viiksinä.
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 3; i++)
                {
                    var p = KdMylly(k, i);
                    var vari = k == 0 ? (i % 2 == 0 ? KdTiili : KdTiiliVaalea) : (i % 2 == 0 ? KdRuoko : KdRuokoTumma);
                    float lakkiR = k == 0 ? 0.04f : 0.038f, lakkiH = k == 0 ? 0.045f : 0.05f;
                    r.AloitaOsa();
                    if (k == 0)
                    {
                        // Pyöreä tiilimylly: rungon vaippa tervattuna jalkana ja tiilenä.
                        const float yT = 0.016f;
                        float rT = Mathf.Lerp(0.05f, 0.032f, yT / KdRunko);
                        r.Vaippa(p, 0.05f, rT, yT, 10, KdLTerva);
                        r.Vaippa(p + Vector3.up * yT, rT, 0.032f, KdRunko - yT, 10, vari);
                    }
                    else
                    {
                        // Kahdeksankulmainen ruokomylly: tiilijalka, jalan yli levenevä ruokohelma ja ruokovaippa.
                        r.Vaippa(p, 0.058f, 0.056f, 0.022f, 8, KdTiili, Mathf.PI / 8f);
                        r.Vaippa(p + Vector3.up * 0.02f, 0.0595f, 0.0545f, 0.008f, 8, vari, Mathf.PI / 8f);
                        r.Vaippa(p + Vector3.up * 0.022f, 0.055f, 0.032f, KdRunko - 0.022f, 8, vari, Mathf.PI / 8f);
                    }
                    r.Kartio(p + Vector3.up * KdRunko, lakkiR, lakkiH, 8, KdRuokoTumma);
                    r.Laatikko(p + Vector3.up * (KdNapa - 0.008f) + KdTuuli * 0.034f, new Vector3(0.016f, 0.016f, 0.016f), KdPuu, KdPuu);
                    r.LopetaOsa();
                    if (k == 0)
                    {
                        // Kaksi ulkonevaa tiilikerrosta (valoisa yläreuna ja varjoviiva), kehystetty ovi kynnyskivineen rungon oven
                        // paikalla, ikkuna oven yllä, matala ikkuna oven vieressä ja korkea itäpuolella (lepäävien siipien ohi).
                        foreach (float yk in new[] { 0.099f, 0.168f })
                            KdLKerros(r, p, 0.05f, 0.032f, KdRunko, 10, 0f, yk, vari);
                        KdLOvi(r, p + new Vector3(0f, 0f, -0.049f), 0.018f, 0.036f, 0.004f);
                        KdLIkkuna(r, p, 0.05f, 0.032f, KdRunko, 10, 270f, 0.08f, 0.011f, 0.015f);
                        KdLIkkuna(r, p, 0.05f, 0.032f, KdRunko, 10, 234f, 0.046f, 0.011f, 0.015f);
                        KdLIkkuna(r, p, 0.05f, 0.032f, KdRunko, 10, 306f, 0.145f, 0.011f, 0.016f);
                    }
                    else
                    {
                        // Kaksi ruokokaistan sidosta (valoisa reuna ja varjoviiva), kehystetty ovi rungon oven paikalla helman yllä, ikkuna
                        // oven yllä (yövalon kohdalla), matala ikkuna lounaassa ja korkea kaakossa.
                        var q = p + Vector3.up * 0.022f;
                        const float h = KdRunko - 0.022f;
                        foreach (float yk in new[] { 0.095f, 0.172f })
                            KdLKerros(r, q, 0.055f, 0.032f, h, 8, Mathf.PI / 8f, yk - 0.022f, vari);
                        KdLOvi(r, p + new Vector3(0f, 0.028f, -0.0495f), 0.018f, 0.032f, 0f);
                        KdLIkkuna(r, q, 0.055f, 0.032f, h, 8, 270f, 0.056f, 0.011f, 0.014f);
                        KdLIkkuna(r, q, 0.055f, 0.032f, h, 8, 225f, 0.043f, 0.011f, 0.014f);
                        KdLIkkuna(r, q, 0.055f, 0.032f, h, 8, 315f, 0.128f, 0.011f, 0.016f);
                    }
                    KdLLakinSidos(r, p, lakkiR, lakkiH);
                }

            // 3. Wisboomin pumppaamo (oma ääriviivaosa kuten rungossa): halli räystäskaistaisella katolla, kaari-ikkunat ja
            // räystäslista etelässä, piippu jalustoineen ja kruunuineen.
            var w = new Vector3(0.4f, 0f, 0.25f);
            r.AloitaOsa();
            r.Laatikko(w, new Vector3(0.1f, 0.035f, 0.055f), KdTiili, KdTiili);
            r.HarjaRaystas(w + Vector3.up * 0.035f, new Vector3(0.1f, 0.025f, 0.055f), true, EmKatto, KdLRaystas, KdTiili, 0.18f);
            var piippu = w + new Vector3(0.062f, 0f, 0f);
            r.Laatikko(piippu, new Vector3(0.026f, 0.016f, 0.026f), KdTiili, KdTiiliVaalea);
            r.Vaippa(piippu + Vector3.up * 0.016f, 0.0105f, 0.0072f, 0.096f, 8, KdTiiliVaalea, Mathf.PI / 8f);
            r.Vaippa(piippu + Vector3.up * 0.112f, 0.0072f, 0.0092f, 0.004f, 8, KdTiiliVaalea, Mathf.PI / 8f);
            r.Vaippa(piippu + Vector3.up * 0.116f, 0.0092f, 0.0088f, 0.004f, 8, KdTiili, Mathf.PI / 8f);
            r.Kiekko(piippu + Vector3.up * 0.12f, 0.0088f, 0.0088f, 8, KdTiiliVaalea);
            r.Kiekko(piippu + Vector3.up * 0.1203f, 0.0062f, 0.0062f, 8, KdLAukko);
            r.LopetaOsa();
            for (int j = 0; j < 4; j++)
            {
                var q = w + new Vector3(-0.036f + j * 0.024f, 0.0175f, -0.0275f);
                r.Laatta(q, Vector3.back, 0.0145f, 0.024f, KdLKehys);
                r.Holvi(q + new Vector3(0f, -0.0005f, -0.0003f), Vector3.back, 0.0095f, 0.019f, KdLAukko);
            }
            // Räystäslista kahtena puolikkaana (pieniä osia ilman omaa ääriviivaa).
            foreach (float x in new[] { -0.025f, 0.025f })
                r.Laatta(w + new Vector3(x, 0.0325f, -0.0275f), Vector3.back, 0.05f, 0.003f, KdLKehys);
            return r.Verkko("Kinderdijk-lahi");
        }

        /// <summary>Kaislatupas kanavan reunalla (rungon kaislakartion paikalla ja ulottumassa): neljä kortta (kaksipuoliset
        /// kolmiot), keskimmäiset pitkät ja lähes pystyssä, reunimmaiset kallellaan ulospäin; d = kanavan suunta, puoli = ranta
        /// (+1 / −1), koko skaalaa korret. 8 kolmiota.</summary>
        static void KdLKaislat(Rakentaja r, Vector3 p, Vector3 d, float puoli, float koko)
        {
            var s = Vector3.Cross(Vector3.up, d).normalized * puoli;
            for (int j = 0; j < 4; j++)
            {
                float t = j - 1.5f;
                bool keski = j == 1 || j == 2;
                var jalka = p + d * (0.0052f * t) + s * (keski ? 0f : 0.002f);
                var kalt = d * (0.0035f * t) + s * (keski ? 0.002f : 0.007f);
                var h = Vector3.up * ((keski ? (j == 1 ? 0.027f : 0.023f) : 0.018f) * koko);
                r.KalvoKolmio(jalka - d * 0.0026f, jalka + d * 0.0026f, jalka + h + kalt, keski ? KdKaisla : Color.Lerp(KdKaisla, KdRuokoTumma, 0.35f));
            }
        }

        /// <summary>Ohut vyö vaipan pinnassa (tiilikerros, ruokokaistan sidos): vaipan (keskipohja p, säteet r0 → r1, korkeus h,
        /// sivuja, ensimmäisen kärjen kulma) eteläpuoliskon sivuilla korkeudella y … y + paksuus, ulk verran pinnan ulkopuolella.
        /// 2 kolmiota sivua kohden (pyöreä 10, kahdeksankulmainen 6).</summary>
        static void KdLVyo(Rakentaja r, Vector3 p, float r0, float r1, float h, int sivuja, float kulma, float y, float paksuus, float ulk, Color vari)
        {
            float ra = Mathf.Lerp(r0, r1, y / h) + ulk, rb = Mathf.Lerp(r0, r1, (y + paksuus) / h) + ulk;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = kulma + i * Mathf.PI * 2f / sivuja, a1 = a0 + Mathf.PI * 2f / sivuja;
                if (Mathf.Sin((a0 + a1) * 0.5f) > -0.2f) continue;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                Vector3 ya = Vector3.up * y, yb = Vector3.up * (y + paksuus);
                r.NelioUlos(p + d0 * ra + ya, p + d1 * ra + ya, p + d1 * rb + yb, p + d0 * rb + yb, (d0 + d1) * 0.5f, vari);
            }
        }

        /// <summary>Ikkuna vaipan (keskipohja p, säteet r0 → r1, korkeus h, sivuja) sivun keskellä suunnassa aste (kompassikulma
        /// XZ-tasossa, 270 = etelä; sivun keskikohta) korkeudella y: vaalea maalattu kehys ja tumma aukko sivun pinnassa sen
        /// kallistuksen mukaisesti vain 0,5–0,9 tuhannesosaa pinnan edessä, joten rungon yövalolaatta (1,7 tuhannesosaa edessä)
        /// peittää etuikkunan yöllä. 4 kolmiota, pieni osa.</summary>
        static void KdLIkkuna(Rakentaja r, Vector3 p, float r0, float r1, float h, int sivuja, float aste, float y, float lev, float kork)
        {
            float a = aste * Mathf.PI / 180f, k = Mathf.Cos(Mathf.PI / sivuja);
            var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
            var t = Vector3.Cross(Vector3.up, d);
            // Piste sivun pinnassa (kallistus mukana) korkeudella yy, vaakasiirto tt, ulk verran pinnan edessä.
            Vector3 P(float yy, float tt, float ulk) => p + d * (Mathf.Lerp(r0, r1, yy / h) * k + ulk) + Vector3.up * yy + t * tt;
            var n = d + Vector3.up * ((r0 - r1) * k / h);
            float w = lev * 0.5f, hk = kork * 0.5f, kw = 0.0025f;
            r.NelioUlos(P(y - hk - kw, -w - kw, 0.0005f), P(y - hk - kw, w + kw, 0.0005f), P(y + hk + kw, w + kw, 0.0005f), P(y + hk + kw, -w - kw, 0.0005f),
                n, KdLKehys);
            r.NelioUlos(P(y - hk, -w, 0.0009f), P(y - hk, w, 0.0009f), P(y + hk, w, 0.0009f), P(y + hk, -w, 0.0009f), n, KdLAukko);
        }

        /// <summary>Kehystetty ovi etelään rungon oven paikalla (alareuna p, leveys ja korkeus kuten rungossa) ja vaalea kynnyskivi
        /// oven edessä (kynnys = kynnyksen korkeus maasta; 0 = ei kynnystä). 4–6 kolmiota.</summary>
        static void KdLOvi(Rakentaja r, Vector3 p, float lev, float kork, float kynnys)
        {
            r.Laatta(p + Vector3.up * (kynnys + kork * 0.5f + 0.0015f), Vector3.back, lev + 0.006f, kork + 0.003f, KdLKehys);
            r.Laatta(p + Vector3.up * (kynnys + kork * 0.5f) + Vector3.back * 0.0004f, Vector3.back, lev, kork, KdPuu);
            if (kynnys > 0f)
                r.NelioUlos(p + new Vector3(-lev * 0.65f, kynnys, 0.002f), p + new Vector3(lev * 0.65f, kynnys, 0.002f), p + new Vector3(lev * 0.65f, kynnys, -0.006f),
                    p + new Vector3(-lev * 0.65f, kynnys, -0.006f), Vector3.up, KdLKehys);
        }

        /// <summary>Ulkoneva kerros vaipan pinnassa (tiilikerros, ruokokaistan sidos): valoisa yläreuna ja sen alla varjoviiva
        /// eteläpuoliskolla korkeudella y (vaippa kuten KdLVyo). 4 kolmiota sivua kohden.</summary>
        static void KdLKerros(Rakentaja r, Vector3 p, float r0, float r1, float h, int sivuja, float kulma, float y, Color vari)
        {
            KdLVyo(r, p, r0, r1, h, sivuja, kulma, y, 0.0024f, 0.0013f, Color.Lerp(vari, KdPurje, 0.3f));
            KdLVyo(r, p, r0, r1, h, sivuja, kulma, y - 0.0034f, 0.0034f, 0.0009f, Color.Lerp(vari, EmMuste, 0.45f));
        }

        /// <summary>Lakin yksityiskohdat rungon lakin (kartio säde, korkeus rungon kohdalla KdRunko) päällä: tumma ruokokaistan sidos
        /// kolmanneksen korkeudella etupuolella, lakin etulauta akselin takana ja vaalea maalattu parta (baard) akselin alla.
        /// 12 kolmiota, pieniä osia.</summary>
        static void KdLLakinSidos(Rakentaja r, Vector3 p, float sade, float kork)
        {
            var q = p + Vector3.up * KdRunko;
            float y0 = kork * 0.34f, y1 = y0 + kork * 0.11f;
            float r0 = sade * (1f - y0 / kork) + 0.0009f, r1 = sade * (1f - y1 / kork) + 0.0009f;
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                if (Mathf.Sin((a0 + a1) * 0.5f) > -0.2f) continue;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var n = (d0 + d1) * 0.5f + Vector3.up * (sade / kork);
                r.NelioUlos(q + d0 * r0 + Vector3.up * y0, q + d1 * r0 + Vector3.up * y0, q + d1 * r1 + Vector3.up * y1, q + d0 * r1 + Vector3.up * y1, n,
                    Color.Lerp(KdRuokoTumma, EmMuste, 0.4f));
            }
            // Lakin etulauta akselin takana ja parta (maalattu lauta) sen alla, kohti tuulta.
            r.Laatta(p + Vector3.up * (KdNapa - 0.001f) + KdTuuli * 0.0335f, KdTuuli, 0.024f, 0.022f, KdPuu);
            r.Laatta(p + Vector3.up * (KdNapa - 0.0135f) + KdTuuli * 0.036f, KdTuuli, 0.026f, 0.0065f, KdLKehys);
        }

        /// <summary>
        /// Siipiristi pivot napassa: neljä siipeä siipitason (kohtisuorassa tuulta vastaan) suuntiin 0°, 90°, 180°, 270°
        /// (pystyristi = myllärin lepoasento). Siipi = tumma varsi, purjekangas varren jättöreunalla, tumma reunarima ja
        /// kaksi poikkirimaa (ristikko erottuu paperista myös pienenä), kaksipuolisina.
        /// </summary>
        static Mesh KinderdijkSiivet()
        {
            var r = new Rakentaja();
            var u = Vector3.up;
            var s = Vector3.Cross(KdTuuli, Vector3.up).normalized;
            for (int k = 0; k < 4; k++)
            {
                float a = k * Mathf.PI * 0.5f;
                var d = u * Mathf.Cos(a) + s * Mathf.Sin(a);
                var e = -u * Mathf.Sin(a) + s * Mathf.Cos(a);
                Vector3 v0 = d * 0.006f, v1 = d * (KdSiipi + 0.004f), n = e * 0.0045f;
                r.Kalvo(v0 - n, v1 - n, v1 + n, v0 + n, KdPuu);
                Vector3 p0 = d * 0.03f + e * 0.0045f, p1 = d * KdSiipi + e * 0.0045f, w = e * KdSiipiLeveys, rima = e * 0.004f;
                r.Kalvo(p0, p1, p1 + w, p0 + w, KdPurje);
                r.Kalvo(p0 + w, p1 + w, p1 + w + rima, p0 + w + rima, KdPuu);
                for (int j = 1; j <= 2; j++)
                {
                    var c = d * (0.03f + (KdSiipi - 0.03f) * j / 3f);
                    Vector3 h = d * 0.0025f;
                    r.Kalvo(c + e * 0.0045f - h, c + e * 0.0045f + h, c + w + h, c + w - h, KdPuu);
                }
            }
            return r.Verkko("Kinderdijk-siivet");
        }

        /// <summary>Yövalot: lämmin ikkuna jokaisen myllyn etelärinteessä siipien alapuolella ja valaistusviikon hehku
        /// myllyn edessä kanavan pinnalla (heijastus; näkyy myös pienenä).</summary>
        static Mesh KinderdijkValot()
        {
            var r = new Rakentaja();
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 3; i++)
                {
                    var p = KdMylly(k, i);
                    r.Laatta(p + new Vector3(0f, 0.075f, k == 0 ? -0.042f : -0.046f), Vector3.back, 0.022f, 0.03f, EmIkkunavalo);
                    r.Kiekko(p + new Vector3(0f, 0.006f, -0.088f), 0.075f, 0.036f, 10, EmIkkunavalo);
                }
            return r.Verkko("Kinderdijk-valot");
        }

        static LiikkuvaOsaMaaritys[] KinderdijkOsat()
        {
            var osat = new LiikkuvaOsaMaaritys[KdMyllyja + 1];
            for (int j = 0; j < KdMyllyja; j++)
            {
                var p = KdOsanMylly(j);
                osat[j] = new LiikkuvaOsaMaaritys { Nimi = "siivet" + j, Verkko = KinderdijkSiivet, Pivot = p + Vector3.up * KdNapa + KdTuuli * 0.048f,
                    Liike = Liike.Kierto, Akseli = KdTuuli, Nopeus = 0.2f, KayS = 40f, TaukoS = 70f };
            }
            osat[KdMyllyja] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = KinderdijkValot, Pivot = Vector3.zero, Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool kinderdijk = Rekisteroi("kinderdijk",
            new Erikoismalli { Runko = KinderdijkRunko, Osat = KinderdijkOsat, Lahi = KinderdijkLahi, Kolmiot0 = 900, KokoKerroin = 1.5f });
    }
}
