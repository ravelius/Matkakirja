using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI BRUGGEN KELLOTORNI (Belfort van Brugge; speksi docs/raportit/erikoismallit/brugge-belfry.md, omistajan
    /// elämänidea hyväksytty 27.9. klo 07.5x). Nosto kohde:hahmotelma-brugge-belfry, Belgia, 51,2089 N 3,224 E, taso 1.
    /// Tunnistus sekunnissa: korkea kellotorni, jonka kaksi alinta kerrosta ovat neliön muotoisia ja tiiliä (kulmatornit ja
    /// neljä korkeaa kulmapinaakkelia) ja ylin kerros vaalea kahdeksankulmainen hiekkakivilyhty kruunuineen; tornin juurella
    /// U-muotoinen Halle (kaksi pitkää liuskekattoista siipeä ja sisäpiha, torni U:n pohjana Markt-aukion puolella). Edessä
    /// reien kanava siltoineen, pieni kanavavene ja flaamilaiset porraspäätytalot.
    /// Mittakaava: vaakasuunnassa 1,0 ≈ 80 m (Hallen leveys 44 m → 0,54; syvyys 84 m lyhennetty 0,40:ään), torni 83 m →
    /// kruunu 1,09 ja pinaakkelit 1,17 (pystyliioittelu noin 1,1). Halle on madallettu (harja kuvista arvioiden noin 25 m →
    /// 0,19), joten torni kohoaa ympäristöään noin 1,7 kertaa jyrkemmin kuin todellisuudessa. Kahdeksankulmio on liioiteltu:
    /// lähes toisen kerroksen levyinen ja 36 % tornin korkeudesta, jotta vaalea lyhty erottuu 60 pt:ssä. Pohjan rajat
    /// x −0,5…0,5 ja z −0,333…0,332, juuri pohjan keskellä.
    /// SUUNTA TODELLINEN: torni on Hallen pohjoispäässä Markt-aukion puolella ja Halle jatkuu etelään. Etelästä kallistuva
    /// kamera katsoo siis sisäpihan yli torniin kuten Oude Burgilta ja Rozenhoedkaailta. Kanava on TYYLITELTY: todellisuudessa
    /// Dijver ja Rozenhoedkaai ovat noin 200 m kaakkoon, mutta Bruggen kuuluisin näkymä on kanava etualalla ja kellotorni
    /// takana, joten reien kulkee mallissa Hallen eteläpuolella itä–länsi-suunnassa. Tornin 87 cm:n kallistusta ei mallinneta.
    /// Liikkuvat osat:
    ///   vene        kanavavene liukuu reiellä laiturilta sillan ali toiseen päähän, kääntyy ja palaa (perusliike)
    ///   vana        veneen perään levenevä vaalea vana (näkyy vain vauhdissa, skaala vauhdin mukaan)
    ///   savel0–5    kellopelin kultaiset nuotit nousevat kahdeksankulmion kruunusta kierteenä (harvinainen ja napautus)
    ///   valot       yöllä tornin eteläpinnat ja sisäpiha valaistaan lämpimiksi (valaisematon hehku, ei bloomia)
    ///   valot1–2    kahdeksankulmion kaakkois- ja lounaissivun hehku (omat pivotit, jotta hehku kasvaa tasossaan)
    ///   kruunu      yöllä kruunun katto hehkuu lyhtynä (oma pivot, jotta hehku syttyy paikallaan)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Tornin keskipisteen Z (pohjoinen, Markt-aukion puoli) ja kerrosten leveydet (1. ja 2. kerros).</summary>
        const float BbTorniZ = 0.215f, BbLeveys1 = 0.19f, BbLeveys2 = 0.17f;
        /// <summary>Kerrosten yläreunat: 1. kerros (käytävä kulmatorneineen), 2. kerros (kulmapinaakkelit) ja kahdeksankulmio.</summary>
        const float BbK1 = 0.34f, BbK2 = 0.64f, BbK3 = 1.04f;
        /// <summary>Kahdeksankulmion apoteemi (sivun etäisyys akselista; 2. kerroksen puolileveys on 0,085) ja kruunun korkeus.</summary>
        const float BbApoteemi = 0.079f, BbKruunuH = 0.045f;
        /// <summary>Hallen siivet: ulkoreuna ±0,27, sisäreuna ±0,095 (tornin levyinen sisäpiha), etelä- ja pohjoispää.</summary>
        const float BbHalleX = 0.27f, BbHalleSisaX = 0.095f, BbHalleEtela = -0.1f, BbHallePohjoinen = 0.3f;
        const float BbHalleSeina = 0.09f, BbHalleKatto = 0.1f;
        /// <summary>Kanava (reien): keskilinja, leveys, veden pinta ja rantamuurien yläreuna.</summary>
        const float BbKanavaZ = -0.255f, BbKanavaPuoli = 0.062f, BbVesiY = 0.004f, BbRantaY = 0.012f, BbRantaLeveys = 0.012f;
        /// <summary>Porraspäätytalojen julkisivujen linja (kanavan pohjoisen rantamuurin takana).</summary>
        const float BbTaloZ = BbKanavaZ + BbKanavaPuoli + BbRantaLeveys;
        /// <summary>Silta kanavan yli (Hallen länsisiiven edessä) ja veneen reitin puolipituus.</summary>
        const float BbSiltaX = -0.2f, BbSiltaLeveys = 0.05f, BbVeneMatka = 0.36f;

        /// <summary>Kahdeksankulmion kärkien suunta: ensimmäinen kärki 22,5°, joten sivut osoittavat pääilmansuuntiin.</summary>
        const float BbKulma0 = Mathf.PI / 8f;

        // ---- Paletti (Em-seepiaramppi; yksi aksentti = kultaiset nuotit) ----
        static readonly Color BbTiili = Hex(0x8d6d50), BbTiiliVaalea = Hex(0x9d7d5d), BbKivireuna = Hex(0xd8c9a6), BbHiekkakivi = Hex(0xe6dbbf),
            BbHiekkakiviVarjo = Hex(0xcdbf9f), BbAukko = Hex(0x4f4030), BbLiuske = Hex(0x6e5a40), BbLiuskeRaystas = Hex(0x9a8666),
            BbKello = Hex(0x3f3328), BbSeinaHalle = Hex(0x957557), BbArkadi = Hex(0xd6c7a2), BbKruunuKatto = Hex(0x8f7a5c),
            BbHehkuKivi = Hex(0xf4d898);
        static readonly Color[] BbTaloSeinat = { Hex(0xb08b67), Hex(0xe6dabd), Hex(0x9a7658), Hex(0xc4a27c) };
        static readonly Color BbTaloKatto = Hex(0x7d6647), BbTaloRaystas = Hex(0xa38c68), BbVeneRunko = Hex(0x4a3b2b), BbVeneSisa = Hex(0xe8dcc0);

        // ---- Runko ----

        static Mesh BruggenKellotorniRunko()
        {
            var r = new Rakentaja();
            BbTorni(r);
            BbTorniKoristeet(r);
            BbHalle(r);
            BbKanava(r);
            BbSilta(r);
            // Reien joutsenpari pohjoisrannan tuntumassa (Bruggen joutsenet; paikallaan, pienet: lähizoomin hymy).
            BbJoutsen(r, new Vector3(0.13f, BbVesiY, BbKanavaZ + BbKanavaPuoli - 0.016f), Mathf.PI);
            BbJoutsen(r, new Vector3(0.162f, BbVesiY, BbKanavaZ + BbKanavaPuoli - 0.024f), Mathf.PI * 0.92f);
            // Porraspäätytalot kanavan pohjoisrannalla Hallen molemmin puolin, päädyt kanavalle (etelään) päin.
            BbTalo(r, new Vector3(-0.445f, 0f, BbTaloZ), 0.095f, 0.085f, 0.1f, 0.07f, BbTaloSeinat[0]);
            BbTalo(r, new Vector3(-0.345f, 0f, BbTaloZ), 0.1f, 0.09f, 0.12f, 0.075f, BbTaloSeinat[1]);
            BbTalo(r, new Vector3(0.345f, 0f, BbTaloZ), 0.1f, 0.09f, 0.115f, 0.075f, BbTaloSeinat[2]);
            BbTalo(r, new Vector3(0.445f, 0f, BbTaloZ), 0.095f, 0.085f, 0.095f, 0.065f, BbTaloSeinat[3]);
            return r.Verkko("BruggenKellotorni");
        }

        /// <summary>
        /// Kellotorni yhtenä ääriviivaosana: 1. kerros (tiili) ja käytävä neljine kulmatorneineen, 2. kerros ja käytävä neljine
        /// korkeine kulmapinaakkeleineen, vaalea kahdeksankulmio ja kruunu (kaide, tasakatto ja kahdeksan pinaakkelia).
        /// </summary>
        static void BbTorni(Rakentaja r)
        {
            var c = new Vector3(0f, 0f, BbTorniZ);
            var up = Vector3.up;
            float p1 = BbLeveys1 * 0.5f, p2 = BbLeveys2 * 0.5f;
            r.AloitaOsa();
            // 1. kerros ja sen käytävä (ulkoneva kivireunus) kulmatorneineen.
            r.Laatikko(c, new Vector3(BbLeveys1, BbK1, BbLeveys1), BbTiili, BbTiili);
            r.Laatikko(c + up * (BbK1 - 0.016f), new Vector3(BbLeveys1 + 0.022f, 0.03f, BbLeveys1 + 0.022f), BbKivireuna, BbKivireuna);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    var k = c + new Vector3(sx * p1, 0f, sz * p1);
                    r.Pylvas(k + up * (BbK1 - 0.075f), 0.022f, 0.12f, 6, BbTiiliVaalea);
                    r.Kartio(k + up * (BbK1 + 0.045f), 0.025f, 0.045f, 6, BbLiuske);
                }
            // 2. kerros (kapeampi) ja sen käytävä; kulmissa korkeat pinaakkelit kahdeksankulmion alaosan vierellä.
            r.Laatikko(c + up * (BbK1 + 0.014f), new Vector3(BbLeveys2, BbK2 - BbK1 - 0.014f, BbLeveys2), BbTiiliVaalea, BbTiiliVaalea);
            r.Laatikko(c + up * (BbK2 - 0.016f), new Vector3(BbLeveys2 + 0.018f, 0.026f, BbLeveys2 + 0.018f), BbKivireuna, BbKivireuna);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    var k = c + new Vector3(sx * (p2 - 0.004f), 0f, sz * (p2 - 0.004f));
                    r.Pylvas(k + up * (BbK2 - 0.03f), 0.014f, 0.13f, 4, BbHiekkakiviVarjo);
                    r.Kartio(k + up * (BbK2 + 0.1f), 0.017f, 0.12f, 4, BbHiekkakiviVarjo);
                }
            // Kahdeksankulmio (hiekkakivi), sivut pääilmansuuntiin.
            float rk = BbApoteemi / Mathf.Cos(Mathf.PI / 8f);
            r.Vaippa(c + up * (BbK2 + 0.01f), rk, rk, BbK3 - BbK2 - 0.01f, 8, BbHiekkakivi, BbKulma0);
            // Kruunu: kaide (ulko-, sisä- ja yläpinta), tasakatto kaiteen sisällä ja kahdeksan pinaakkelia kärjissä.
            float ru = rk + 0.008f, rs = rk - 0.006f, y0 = BbK3 - 0.006f, y1 = BbK3 + BbKruunuH, yk = BbK3 + 0.018f;
            for (int i = 0; i < 8; i++)
            {
                float a0 = BbKulma0 + i * Mathf.PI / 4f, a1 = a0 + Mathf.PI / 4f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var n = (d0 + d1).normalized;
                Vector3 u0 = c + d0 * ru, u1 = c + d1 * ru, s0 = c + d0 * rs, s1 = c + d1 * rs;
                r.NelioUlos(u0 + up * y0, u1 + up * y0, u1 + up * y1, u0 + up * y1, n, BbHiekkakivi);
                r.NelioUlos(s0 + up * yk, s1 + up * yk, s1 + up * y1, s0 + up * y1, -n, BbHiekkakiviVarjo);
                r.NelioUlos(u0 + up * y1, u1 + up * y1, s1 + up * y1, s0 + up * y1, Vector3.up, BbKivireuna);
                r.KolmioUlos(c + up * yk, s0 + up * yk, s1 + up * yk, Vector3.up, BbKruunuKatto);
                // Pinaakkelit kärjissä, joka toinen korkeampi.
                r.Kartio(c + d0 * ((ru + rs) * 0.5f) + up * y1, 0.012f, i % 2 == 0 ? 0.085f : 0.06f, 4, BbHiekkakivi);
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Tornin pintakoristeet ilman omaa ääriviivaa (sisäviivat kärkiväreinä): 1. kerroksen ikkuna sisäpihalle, 2. kerroksen
        /// korkeat ikkunat etelään, itään ja länteen, kahdeksankulmion kaikuaukot joka sivulla ja kellotaulu eteläsivulla. Koristeet ovat 0,004 pinnan edessä, ja
        /// yövalon hehku on niiden ja pinnan välissä (0,002), joten aukot näkyvät tummina myös valaistua tornia vasten.
        /// </summary>
        static void BbTorniKoristeet(Rakentaja r)
        {
            var c = new Vector3(0f, 0f, BbTorniZ);
            float p2 = BbLeveys2 * 0.5f, y2 = (BbK1 + BbK2) * 0.5f + 0.01f;
            // 1. kerroksen korkea ikkuna sisäpihalle (Hallen siipien välissä näkyvä eteläpinta).
            r.Holvi(c + Vector3.back * (BbLeveys1 * 0.5f + 0.0025f) + Vector3.up * 0.215f, Vector3.back, 0.04f, 0.11f, BbAukko);
            // 2. kerroksen ikkunat (kaksi rinnakkain sivua kohden).
            foreach (var n in new[] { Vector3.back, Vector3.right, Vector3.left })
            {
                var t = Vector3.Cross(Vector3.up, n);
                foreach (float s in new[] { -1f, 1f })
                    r.Holvi(c + n * (p2 + 0.0025f) + t * (s * 0.036f) + Vector3.up * y2, n, 0.028f, 0.15f, BbAukko);
            }
            // Kahdeksankulmion kaikuaukot (kellokammio): korkea suippokaari joka sivulla. Eteläsivun aukko ja kello ovat
            // 2. kerroksen pinnan tasossa (0,006 kahdeksankulmion edessä), koska sen yövalo on samassa tasossa.
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI / 4f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                float etaisyys = i == 6 ? p2 + 0.0025f : BbApoteemi + 0.0025f;   // i = 6 → suunta −Z (etelä)
                r.Holvi(c + n * etaisyys + Vector3.up * (BbK2 + 0.25f), n, 0.026f, 0.17f, BbAukko);
            }
            // Kellotaulu eteläsivulla lyhdyn alaosassa: tumma kiekko ja vaaleat viisarit.
            var kp = c + Vector3.back * (p2 + 0.0045f) + Vector3.up * (BbK2 + 0.085f);
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                r.KolmioUlos(kp, kp + new Vector3(Mathf.Cos(a0) * 0.024f, Mathf.Sin(a0) * 0.024f, 0f),
                    kp + new Vector3(Mathf.Cos(a1) * 0.024f, Mathf.Sin(a1) * 0.024f, 0f), Vector3.back, BbKello);
            }
            var vp = kp + Vector3.back * 0.001f;
            r.NelioUlos(vp + new Vector3(-0.002f, 0f, 0f), vp + new Vector3(0.002f, 0f, 0f), vp + new Vector3(0.002f, 0.018f, 0f),
                vp + new Vector3(-0.002f, 0.018f, 0f), Vector3.back, BbKivireuna);
            r.NelioUlos(vp + new Vector3(0f, -0.002f, 0f), vp + new Vector3(0.013f, -0.002f, 0f), vp + new Vector3(0.013f, 0.002f, 0f),
                vp + new Vector3(0f, 0.002f, 0f), Vector3.back, BbKivireuna);
        }

        /// <summary>
        /// Halle (hallirakennus) U:na: kaksi pitkää tiilisiipeä korkeine liuskekattoineen (lonkkakatot räystäskaistalla) tornin
        /// molemmin puolin, sisäpiha niiden välissä ja etelässä matala renessanssiarkadi, joka sulkee pihan. Yksi ääriviivaosa.
        /// </summary>
        static void BbHalle(Rakentaja r)
        {
            r.AloitaOsa();
            foreach (float s in new[] { -1f, 1f })
            {
                float x0 = s * BbHalleSisaX, x1 = s * BbHalleX;
                float xa = Mathf.Min(x0, x1), xb = Mathf.Max(x0, x1);
                var p = new Vector3((xa + xb) * 0.5f, 0f, (BbHalleEtela + BbHallePohjoinen) * 0.5f);
                r.Laatikko(p, new Vector3(xb - xa, BbHalleSeina, BbHallePohjoinen - BbHalleEtela), BbSeinaHalle, BbSeinaHalle);
                BbLonkkakatto(r, xa - 0.006f, xb + 0.006f, BbHalleEtela - 0.006f, BbHallePohjoinen + 0.006f, BbHalleSeina, BbHalleKatto,
                    EmKatto, BbLiuskeRaystas);
            }
            r.LopetaOsa();
            // Siipien eteläpäädyissä kaksi korkeaa suippokaari-ikkunaa (sisäviivoina).
            foreach (float s in new[] { -1f, 1f })
            {
                float xk = s * (BbHalleSisaX + BbHalleX) * 0.5f;
                foreach (float dx in new[] { -0.036f, 0.036f })
                    r.Holvi(new Vector3(xk + dx, BbHalleSeina * 0.48f, BbHalleEtela), Vector3.back, 0.018f, 0.052f, BbAukko);
            }
            // Etelän arkadigalleria (matala, vaalea) sulkee sisäpihan; kaaret pihalle ja kadulle päin sisäviivoina.
            r.Seina(new Vector3(-BbHalleSisaX, 0f, BbHalleEtela + 0.02f), new Vector3(BbHalleSisaX, 0f, BbHalleEtela + 0.02f), 0.045f, 0.03f,
                BbArkadi, BbKivireuna);
            for (int i = 0; i < 4; i++)
            {
                float x = -0.0675f + i * 0.045f;
                r.Holvi(new Vector3(x, 0.02f, BbHalleEtela + 0.005f), Vector3.back, 0.026f, 0.032f, BbAukko);
            }
        }

        /// <summary>
        /// Lonkkakatto räystäskaistalla: räystään suorakulmio x0..x1 × z0..z1 korkeudella y, harjan korkeus hr, harja pidemmän
        /// sivun suuntaan ja lonkat 45°:n kulmassa. Lappeiden alareunassa vaalea kaista, jotta katon muoto erottuu ylhäältä.
        /// 14 kolmiota.
        /// </summary>
        static void BbLonkkakatto(Rakentaja r, float x0, float x1, float z0, float z1, float y, float hr, Color katto, Color raystas)
        {
            const float osuus = 0.2f;
            float xc = (x0 + x1) * 0.5f, zc = (z0 + z1) * 0.5f;
            var keski = new Vector3(xc, y + hr * 0.3f, zc);
            Vector3 A = new Vector3(x0, y, z0), B = new Vector3(x1, y, z0), C = new Vector3(x1, y, z1), D = new Vector3(x0, y, z1);
            Vector3 H0, H1;
            if (z1 - z0 >= x1 - x0)
            {
                float a = (x1 - x0) * 0.5f;
                H0 = new Vector3(xc, y + hr, z0 + a); H1 = new Vector3(xc, y + hr, z1 - a);
                BbLape(r, D, A, H0, H1, keski, katto, raystas, osuus);   // länsilape
                BbLape(r, B, C, H1, H0, keski, katto, raystas, osuus);   // itälape
                BbLonkka(r, A, B, H0, keski, katto, raystas, osuus);     // etelälonkka
                BbLonkka(r, C, D, H1, keski, katto, raystas, osuus);     // pohjoislonkka
            }
            else
            {
                float a = (z1 - z0) * 0.5f;
                H0 = new Vector3(x0 + a, y + hr, zc); H1 = new Vector3(x1 - a, y + hr, zc);
                BbLape(r, A, B, H1, H0, keski, katto, raystas, osuus);
                BbLape(r, C, D, H0, H1, keski, katto, raystas, osuus);
                BbLonkka(r, D, A, H0, keski, katto, raystas, osuus);
                BbLonkka(r, B, C, H1, keski, katto, raystas, osuus);
            }
        }

        /// <summary>Lape räystäältä r0 → r1 harjalle (h1 on r1:n ja h0 r0:n puolella): kaista räystäsvärillä, loput kattovärillä.</summary>
        static void BbLape(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0, Vector3 keski, Color katto, Color raystas, float osuus)
        {
            Vector3 a = Vector3.Lerp(r0, h0, osuus), b = Vector3.Lerp(r1, h1, osuus);
            r.NelioKeskelta(r0, r1, b, a, keski, raystas);
            r.NelioKeskelta(a, b, h1, h0, keski, katto);
        }

        /// <summary>Lonkkakolmio räystäältä r0 → r1 harjan päähän t räystäskaistalla.</summary>
        static void BbLonkka(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 t, Vector3 keski, Color katto, Color raystas, float osuus)
        {
            Vector3 a = Vector3.Lerp(r0, t, osuus), b = Vector3.Lerp(r1, t, osuus);
            r.NelioKeskelta(r0, r1, b, a, keski, raystas);
            r.KolmioKeskelta(a, b, t, keski, katto);
        }

        /// <summary>
        /// Kanava (reien) itä–länsi koko mallin leveydeltä: vesikaista ja matalat vaaleat rantamuurit molemmin puolin, yksi
        /// ääriviivaosa (musteviiva kiertää kanavan). Vesi on hieman rantamuurien alapuolella.
        /// </summary>
        static void BbKanava(Rakentaja r)
        {
            float z0 = BbKanavaZ - BbKanavaPuoli, z1 = BbKanavaZ + BbKanavaPuoli;
            r.AloitaOsa();
            r.NelioUlos(new Vector3(-0.5f, BbVesiY, z0), new Vector3(0.5f, BbVesiY, z0), new Vector3(0.5f, BbVesiY, z1), new Vector3(-0.5f, BbVesiY, z1),
                Vector3.up, EmVesi);
            r.Laatikko(new Vector3(0f, 0f, z0 - BbRantaLeveys * 0.5f), new Vector3(1f, BbRantaY, BbRantaLeveys), EmKivi, EmKiviVaalea);
            r.Laatikko(new Vector3(0f, 0f, z1 + BbRantaLeveys * 0.5f), new Vector3(1f, BbRantaY, BbRantaLeveys), EmKivi, EmKiviVaalea);
            r.LopetaOsa();
        }

        /// <summary>
        /// Kaareva kivisilta kanavan yli (Nepomucenusbrugin tapaan): kansi nousee keskeltä, kaiteet molemmilla reunoilla. Kansi
        /// on vedestä 0,03 ylhäällä, joten vene liukuu sen ali (syvyyspuskuri peittää veneen hetkeksi).
        /// </summary>
        static void BbSilta(Rakentaja r)
        {
            float z0 = BbKanavaZ - BbKanavaPuoli - BbRantaLeveys - 0.004f, z1 = BbKanavaZ + BbKanavaPuoli + BbRantaLeveys + 0.004f;
            float xa = BbSiltaX - BbSiltaLeveys * 0.5f, xb = BbSiltaX + BbSiltaLeveys * 0.5f, ya = BbRantaY + 0.002f, yc = 0.034f;
            // Kannen profiili: päät rantamuurin tasolla, keskellä kaaren laki.
            var z = new[] { z0, BbKanavaZ - 0.03f, BbKanavaZ + 0.03f, z1 };
            var y = new[] { ya, yc, yc, ya };
            r.AloitaOsa();
            for (int i = 0; i < 3; i++)
            {
                Vector3 a0 = new Vector3(xa, y[i], z[i]), b0 = new Vector3(xb, y[i], z[i]), a1 = new Vector3(xa, y[i + 1], z[i + 1]), b1 = new Vector3(xb, y[i + 1], z[i + 1]);
                r.NelioUlos(a0, b0, b1, a1, Vector3.up, EmKiviVaalea);
                // Sivupinnat vedenpintaan asti (kaaren aukko näkyy vain sivulta, jota kamera ei katso).
                r.NelioUlos(new Vector3(xa, BbVesiY, z[i]), new Vector3(xa, BbVesiY, z[i + 1]), a1, a0, Vector3.left, EmKivi);
                r.NelioUlos(new Vector3(xb, BbVesiY, z[i]), new Vector3(xb, BbVesiY, z[i + 1]), b1, b0, Vector3.right, EmKivi);
                // Kaiteet kannen reunoilla.
                foreach (float x in new[] { xa + 0.004f, xb - 0.004f })
                {
                    Vector3 k0 = new Vector3(x, y[i], z[i]), k1 = new Vector3(x, y[i + 1], z[i + 1]);
                    Vector3 kh = Vector3.up * 0.012f, kx = Vector3.right * 0.004f;
                    r.NelioUlos(k0 - kx + kh, k0 + kx + kh, k1 + kx + kh, k1 - kx + kh, Vector3.up, EmKiviVaalea);
                    r.NelioUlos(k0 - kx, k1 - kx, k1 - kx + kh, k0 - kx + kh, Vector3.left, EmKivi);
                    r.NelioUlos(k0 + kx, k1 + kx, k1 + kx + kh, k0 + kx + kh, Vector3.right, EmKivi);
                }
            }
            // Eteläpää (kameraan päin): kannen ja kaiteiden etupinta.
            r.NelioUlos(new Vector3(xa, BbVesiY, z0), new Vector3(xb, BbVesiY, z0), new Vector3(xb, ya, z0), new Vector3(xa, ya, z0), Vector3.back, EmKivi);
            r.LopetaOsa();
        }

        /// <summary>Joutsen vedellä: valkoinen runko (matala kiila), kaula, pää ja tumma nokka; p = vesirajan keskipiste,
        /// suunta = nokan suunta (rad itäakselista vastapäivään ylhäältä). Noin 20 kolmiota, ei ääriviivaa (pieni).</summary>
        static void BbJoutsen(Rakentaja r, Vector3 p, float suunta)
        {
            var e = new Vector3(Mathf.Cos(suunta), 0f, -Mathf.Sin(suunta));   // eteenpäin (ylhäältä vastapäivään +X:stä)
            var s = Vector3.Cross(Vector3.up, e);
            Vector3 pyrsto = p - e * 0.013f, rinta = p + e * 0.009f, vasen = p + s * 0.007f, oikea = p - s * 0.007f;
            var selka = p - e * 0.002f + Vector3.up * 0.008f;
            var keski = p + Vector3.up * 0.002f;
            r.KolmioKeskelta(pyrsto, vasen, selka, keski, EmVaahto);
            r.KolmioKeskelta(oikea, pyrsto, selka, keski, EmVaahto);
            r.KolmioKeskelta(vasen, rinta, selka, keski, EmVaahto);
            r.KolmioKeskelta(rinta, oikea, selka, keski, EmVaahto);
            // Kaula (S-mutkan sijaan suora, hieman taakse kallistuva) ja pää nokkineen.
            var k0 = p + e * 0.006f + Vector3.up * 0.004f;
            var k1 = p + e * 0.004f + Vector3.up * 0.021f;
            var kl = s * 0.0016f;
            r.Kalvo(k0 - kl, k0 + kl, k1 + kl, k1 - kl, EmVaahto);
            r.Kalvo(k0 - e * 0.0016f, k0 + e * 0.0016f, k1 + e * 0.0016f, k1 - e * 0.0016f, EmVaahto);
            r.KalvoKolmio(k1 - kl + Vector3.up * 0.002f, k1 + kl + Vector3.up * 0.002f, k1 + e * 0.009f, EmMuste);
            r.Timantti(k1 + Vector3.up * 0.002f, 0.0028f, 0.0028f, EmVaahto, 4);
        }

        /// <summary>
        /// Flaamilainen porraspäätytalo: julkisivun alakeskipiste p kanavan puolella (etelä), leveys, syvyys (pohjoiseen), seinän
        /// korkeus ja päädyn korkeus. Harjakatto pohjois–etelä-suunnassa ja julkisivun porraspääty (kolme askelmaa, vaalea
        /// kivireuna askelmien päällä), joka nousee lappeiden yli; kaksi tummaa ikkunaa. Yksi ääriviivaosa.
        /// </summary>
        static void BbTalo(Rakentaja r, Vector3 p, float leveys, float syvyys, float h, float paaty, Color seina)
        {
            const int askelmia = 3;
            const float paksuus = 0.012f;
            float x = leveys * 0.5f, zt = p.z + syvyys;
            r.AloitaOsa();
            r.Laatikko(p + Vector3.forward * (syvyys * 0.5f), new Vector3(leveys, h, syvyys), seina, seina);
            // Harjakatto porraspäädyn takana (harja hieman ylimmän askelman alapuolella).
            float hr = paaty * (askelmia - 0.5f) / askelmia;
            float z0 = p.z + paksuus;
            Vector3 eL0 = new Vector3(p.x - x, h, z0), eL1 = new Vector3(p.x - x, h, zt), eR0 = new Vector3(p.x + x, h, z0), eR1 = new Vector3(p.x + x, h, zt);
            Vector3 hj0 = new Vector3(p.x, h + hr, z0), hj1 = new Vector3(p.x, h + hr, zt);
            var keski = new Vector3(p.x, h + hr * 0.3f, (z0 + zt) * 0.5f);
            BbLape(r, eL1, eL0, hj0, hj1, keski, BbTaloKatto, BbTaloRaystas, 0.2f);
            BbLape(r, eR0, eR1, hj1, hj0, keski, BbTaloKatto, BbTaloRaystas, 0.2f);
            r.KolmioKeskelta(eL1, eR1, hj1, keski, seina);
            // Porraspääty: askelmat kapenevat ylöspäin.
            for (int k = 0; k < askelmia; k++)
            {
                float w = leveys * (1f - k / (float)askelmia) - (k > 0 ? 0.004f : 0f);
                r.Laatikko(new Vector3(p.x, h + k * paaty / askelmia, p.z + paksuus * 0.5f), new Vector3(w, paaty / askelmia, paksuus), seina, BbKivireuna);
            }
            r.LopetaOsa();
            // Ikkunat julkisivussa (sisäviivat): kaksi kerrosta, ylempi päädyssä.
            r.Laatta(new Vector3(p.x - x * 0.45f, h * 0.62f, p.z), Vector3.back, leveys * 0.22f, h * 0.26f, BbAukko);
            r.Laatta(new Vector3(p.x + x * 0.45f, h * 0.62f, p.z), Vector3.back, leveys * 0.22f, h * 0.26f, BbAukko);
            r.Laatta(new Vector3(p.x, h + paaty * 0.3f, p.z), Vector3.back, leveys * 0.18f, paaty * 0.3f, BbAukko);
        }

        // ---- Liikkuvat osat ----

        /// <summary>
        /// Kanavavene (pivot vesirajassa keskellä, keula +X eli itään): tumma runko suippenevalla keulalla, tumma reunus ja
        /// vaalea avoin sisus kolmella penkkirivillä (Bruggen avoimet kiertoajeluveneet). Liioiteltu noin kaksinkertaiseksi
        /// (0,12 × 0,04), jotta vene erottuu 60 pt:ssä.
        /// </summary>
        static Mesh BruggenKellotorniVene()
        {
            var r = new Rakentaja();
            // Rungon ääriviiva vastapäivään ylhäältä: perä, keula ja kyljet.
            var reuna = new[] { new Vector3(-0.056f, 0f, -0.02f), new Vector3(0.032f, 0f, -0.02f), new Vector3(0.06f, 0f, 0f),
                new Vector3(0.032f, 0f, 0.02f), new Vector3(-0.056f, 0f, 0.02f) };
            const float hr = 0.012f, sisa = 0.0055f;
            var yla = Vector3.up * hr;
            var keski = new Vector3(0f, hr * 0.5f, 0f);
            for (int i = 0; i < reuna.Length; i++)
            {
                var a = reuna[i]; var b = reuna[(i + 1) % reuna.Length];
                r.NelioKeskelta(a, b, b + yla, a + yla, keski, BbVeneRunko);
            }
            // Reunus (tumma) ja sisus (vaalea) samassa tasossa.
            var sisus = new[] { new Vector3(-0.056f + sisa, hr, -0.02f + sisa), new Vector3(0.029f, hr, -0.02f + sisa), new Vector3(0.046f, hr, 0f),
                new Vector3(0.029f, hr, 0.02f - sisa), new Vector3(-0.056f + sisa, hr, 0.02f - sisa) };
            for (int i = 0; i < reuna.Length; i++)
            {
                int j = (i + 1) % reuna.Length;
                r.NelioUlos(reuna[i] + yla, reuna[j] + yla, sisus[j], sisus[i], Vector3.up, EmMuste);
            }
            r.KolmioUlos(sisus[0], sisus[1], sisus[3], Vector3.up, BbVeneSisa);
            r.KolmioUlos(sisus[0], sisus[3], sisus[4], Vector3.up, BbVeneSisa);
            r.KolmioUlos(sisus[1], sisus[2], sisus[3], Vector3.up, BbVeneSisa);
            // Penkkirivit (tummat viivat poikittain) ja perämies perässä.
            foreach (float x in new[] { -0.03f, -0.005f, 0.02f })
                r.NelioUlos(new Vector3(x - 0.004f, hr + 0.0006f, -0.0145f), new Vector3(x + 0.004f, hr + 0.0006f, -0.0145f),
                    new Vector3(x + 0.004f, hr + 0.0006f, 0.0145f), new Vector3(x - 0.004f, hr + 0.0006f, 0.0145f), Vector3.up, EmSeepia);
            r.Laatikko(new Vector3(-0.047f, hr, 0f), new Vector3(0.01f, 0.014f, 0.012f), EmMuste, EmMuste);
            return r.Verkko("BruggenKellotorni-vene");
        }

        /// <summary>Vana: kaksi vaaleaa viirua levenee veneen perästä taaksepäin (pivot veneen keskellä, samassa kehyksessä kuin
        /// vene); skaala seuraa vauhtia, joten seisova vene ei jätä vanaa.</summary>
        static Mesh BruggenKellotorniVana()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
            {
                // Viiru kapenee loppua kohti (vaahto hälvenee), ja keskikohdassa pieni taite ulospäin.
                Vector3 a = new Vector3(-0.048f, 0.0005f, s * 0.012f), m = new Vector3(-0.09f, 0.0005f, s * 0.027f), b = new Vector3(-0.135f, 0.0005f, s * 0.038f);
                var t = new Vector3(0f, 0f, 0.003f);
                r.NelioUlos(a - t, m - t * 0.7f, m + t * 0.7f, a + t, Vector3.up, EmVaahto);
                r.NelioUlos(m - t * 0.7f, b - t * 0.25f, b + t * 0.25f, m + t * 0.7f, Vector3.up, EmVaahto);
            }
            return r.Verkko("BruggenKellotorni-vana");
        }

        /// <summary>Nuottien taso: kallistettu 45° etelään ja ylös, joten nuotti näkyy ylhäältä, 30°:n kallistuksesta ja reunalta.
        /// Nuotin pystysuunta osoittaa ylös ja pohjoiseen (ruudulla ylös).</summary>
        static readonly Vector3 BbNuottiNormaali = new Vector3(0f, 0.7071068f, -0.7071068f);
        static Vector3 BbG(float s, float t, float koko) => new Vector3(s * koko, t * 0.7071068f * koko, t * 0.7071068f * koko);

        /// <summary>Nuotin muoto tasossa (s oikealle, t ylös, yksikkö = nuotin korkeus): kuusikulmainen pää, varsi ja lippu tai palkki.</summary>
        static void BbNuotinMuoto(Rakentaja r, bool pari, float koko, float laajennus, Vector3 siirto, Color vari)
        {
            float e = laajennus;
            // Pää(t): kallistettu soikio kuusikulmiona.
            int paita = pari ? 2 : 1;
            for (int j = 0; j < paita; j++)
            {
                float ps = j * 0.58f, pt = j * 0.1f;
                var kulmat = new Vector3[6];
                for (int i = 0; i < 6; i++)
                {
                    float a = i * Mathf.PI / 3f;
                    float px = Mathf.Cos(a) * (0.27f + e), py = Mathf.Sin(a) * (0.19f + e);
                    const float kallistus = 0.35f;
                    kulmat[i] = BbG(ps + px * Mathf.Cos(kallistus) - py * Mathf.Sin(kallistus), pt + px * Mathf.Sin(kallistus) + py * Mathf.Cos(kallistus), koko) + siirto;
                }
                for (int i = 1; i < 5; i++) r.KolmioUlos(kulmat[0], kulmat[i], kulmat[i + 1], BbNuottiNormaali, vari);
                // Varsi pään oikeasta reunasta ylös.
                float vx = ps + 0.225f, v0 = pt + 0.05f, v1 = pari ? pt + 0.98f : 0.98f;
                r.NelioUlos(BbG(vx - 0.045f - e, v0 - e, koko) + siirto, BbG(vx + 0.045f + e, v0 - e, koko) + siirto,
                    BbG(vx + 0.045f + e, v1 + e, koko) + siirto, BbG(vx - 0.045f - e, v1 + e, koko) + siirto, BbNuottiNormaali, vari);
            }
            if (pari)
            {
                // Palkki varsien yläpäiden välillä (hieman nouseva).
                r.NelioUlos(BbG(0.18f - e, 0.86f - e, koko) + siirto, BbG(0.85f + e, 0.96f - e, koko) + siirto,
                    BbG(0.85f + e, 1.1f + e, koko) + siirto, BbG(0.18f - e, 1.0f + e, koko) + siirto, BbNuottiNormaali, vari);
            }
            else
            {
                // Lippu varren yläpäästä alas oikealle.
                r.NelioUlos(BbG(0.18f - e, 0.98f + e, koko) + siirto, BbG(0.29f + e, 0.98f + e, koko) + siirto,
                    BbG(0.56f + e, 0.56f - e, koko) + siirto, BbG(0.45f - e, 0.6f - e, koko) + siirto, BbNuottiNormaali, vari);
            }
        }

        /// <summary>
        /// Kellopelin nuotti (pivot kruunun keskellä, nuotti keskitetty origoon): kultainen nuotti (♪ tai kaksi palkitettua ♫)
        /// tumman kaiverrusreunan päällä (sama muoto laajennettuna ja hieman taaempana) ja pieni vaalea kimallus päässä.
        /// </summary>
        static Mesh BbNuotti(bool pari)
        {
            var r = new Rakentaja();
            float koko = pari ? 0.072f : 0.078f;
            var keskitys = BbG(pari ? -0.4f : -0.2f, -0.45f, koko);
            BbNuotinMuoto(r, pari, koko, 0.07f, keskitys - BbNuottiNormaali * 0.003f, EmMuste);
            BbNuotinMuoto(r, pari, koko, 0f, keskitys, EmKulta);
            // Kimallus: pieni vaalea kolmio pään yläreunassa.
            int paita = pari ? 2 : 1;
            for (int j = 0; j < paita; j++)
            {
                var k = BbG(j * 0.58f - 0.06f, j * 0.1f + 0.05f, koko) + keskitys + BbNuottiNormaali * 0.001f;
                r.KolmioUlos(k, k + BbG(0.12f, 0.03f, koko), k + BbG(0.02f, 0.1f, koko), BbNuottiNormaali, EmVaahto);
            }
            return r.Verkko(pari ? "BruggenKellotorni-nuotti2" : "BruggenKellotorni-nuotti");
        }

        static Mesh BruggenKellotorniNuotti() => BbNuotti(false);
        static Mesh BruggenKellotorniNuottiPari() => BbNuotti(true);

        /// <summary>
        /// Yövalot, eteläpinta (pivot tornin eteläpinnan juuressa): lämmin hehku 1. ja 2. kerroksen eteläpinnoilla ja
        /// kahdeksankulmion eteläsivulla (kaikki lähes samassa pystytasossa pivotin kanssa, joten hehku kasvaa juuresta ylöspäin
        /// eikä välähdä) sekä puoliympyrän muotoinen valoläikkä sisäpihalla tornin juurella.
        /// </summary>
        static Mesh BruggenKellotorniValot()
        {
            var r = new Rakentaja();
            // Geometria mallin avaruudessa miinus pivot (osan verkko on pivotin suhteen).
            var o = BbValotPivot;
            float z1 = BbTorniZ - BbLeveys1 * 0.5f - 0.0005f, z2 = BbTorniZ - BbLeveys2 * 0.5f - 0.0005f;
            var etela = Vector3.back;
            r.Laatta(new Vector3(0f, BbK1 * 0.5f, z1) - o, etela, BbLeveys1 - 0.03f, BbK1 - 0.06f, EmIkkunavalo);
            r.Laatta(new Vector3(0f, (BbK1 + BbK2) * 0.5f, z2) - o, etela, BbLeveys2 - 0.03f, BbK2 - BbK1 - 0.07f, EmIkkunavalo);
            r.Laatta(new Vector3(0f, (BbK2 + BbK3) * 0.5f + 0.005f, z2) - o, etela, BbSivu - 0.012f, BbK3 - BbK2 - 0.07f, BbHehkuKivi);
            // Sisäpihan valoläikkä: puoliympyrä tornin juuresta etelään (vaakasuora, maan tasossa).
            var k = new Vector3(0f, 0.0015f, z1 - 0.003f) - o;
            for (int i = 0; i < 6; i++)
            {
                float a0 = Mathf.PI + i * Mathf.PI / 6f, a1 = a0 + Mathf.PI / 6f;
                r.KolmioUlos(k, k + new Vector3(Mathf.Cos(a0) * 0.085f, 0f, Mathf.Sin(a0) * 0.11f), k + new Vector3(Mathf.Cos(a1) * 0.085f, 0f, Mathf.Sin(a1) * 0.11f),
                    Vector3.up, EmIkkunavalo);
            }
            return r.Verkko("BruggenKellotorni-valot");
        }

        /// <summary>Kahdeksankulmion sivun pituus.</summary>
        static float BbSivu => 2f * BbApoteemi * Mathf.Sin(Mathf.PI / 8f) / Mathf.Cos(Mathf.PI / 8f);

        /// <summary>Kahdeksankulmion viistosivun (puoli +1 = kaakko, −1 = lounas) ulkonormaali.</summary>
        static Vector3 BbViisto(float puoli) => new Vector3(puoli * 0.7071068f, 0f, -0.7071068f);

        /// <summary>Viistosivun yövalon pivot: sivun alareunan keskellä hehkun tasossa (0,002 pinnan edessä), joten hehku kasvaa
        /// omassa tasossaan alhaalta ylös.</summary>
        static Vector3 BbViistoPivot(float puoli) => new Vector3(0f, BbK2 + 0.03f, BbTorniZ) + BbViisto(puoli) * (BbApoteemi + 0.002f);

        /// <summary>Yövalo kahdeksankulmion viistosivulla (kaakko tai lounas), pivot sivun alareunassa.</summary>
        static Mesh BbValoViisto(float puoli)
        {
            var r = new Rakentaja();
            var n = BbViisto(puoli);
            float h = BbK3 - BbK2 - 0.07f;
            // Laatta siirtää pintaa 0,0015 normaalin suuntaan, joten keskipiste on sen verran pivotin tason takana.
            r.Laatta(Vector3.up * (h * 0.5f) - n * 0.0015f, n, BbSivu - 0.012f, h, BbHehkuKivi);
            return r.Verkko(puoli > 0 ? "BruggenKellotorni-valot1" : "BruggenKellotorni-valot2");
        }

        static Mesh BruggenKellotorniValotKaakko() => BbValoViisto(1f);
        static Mesh BruggenKellotorniValotLounas() => BbValoViisto(-1f);

        /// <summary>Kruunun hehku (pivot kruunun katon keskellä): lämmin kahdeksankulmio katon tasossa, syttyy paikallaan.</summary>
        static Mesh BruggenKellotorniKruunu()
        {
            var r = new Rakentaja();
            float rs = BbApoteemi / Mathf.Cos(Mathf.PI / 8f) - 0.006f;
            for (int i = 0; i < 8; i++)
            {
                float a0 = BbKulma0 + i * Mathf.PI / 4f, a1 = a0 + Mathf.PI / 4f;
                r.KolmioUlos(Vector3.zero, new Vector3(Mathf.Cos(a0) * rs, 0f, Mathf.Sin(a0) * rs), new Vector3(Mathf.Cos(a1) * rs, 0f, Mathf.Sin(a1) * rs),
                    Vector3.up, EmIkkunavalo);
            }
            return r.Verkko("BruggenKellotorni-kruunu");
        }

        /// <summary>Osien paikat: veneen reitin keskikohta vesirajassa, kellopelin nuottien lähtö kruunun keskeltä, yövalojen
        /// pivot tornin eteläpinnan juuressa ja kruunun hehkun pivot kruunun katon keskellä.</summary>
        static readonly Vector3 BbVenePivot = new Vector3(0f, BbVesiY + 0.0005f, BbKanavaZ);
        static readonly Vector3 BbNuottiPivot = new Vector3(0f, BbK3 + BbKruunuH + 0.02f, BbTorniZ);
        static readonly Vector3 BbValotPivot = new Vector3(0f, 0f, BbTorniZ - BbLeveys1 * 0.5f - 0.002f);
        static readonly Vector3 BbKruunuPivot = new Vector3(0f, BbK3 + 0.0185f, BbTorniZ);

        static LiikkuvaOsaMaaritys[] BruggenKellotorniOsat()
        {
            var osat = new LiikkuvaOsaMaaritys[12];
            osat[0] = new LiikkuvaOsaMaaritys { Nimi = "vene", Verkko = BruggenKellotorniVene, Pivot = BbVenePivot, Liike = Liike.Liuku,
                Akseli = Vector3.right, Laajuus = BbVeneMatka, KayS = 16f, TaukoS = 30f };
            osat[1] = new LiikkuvaOsaMaaritys { Nimi = "vana", Verkko = BruggenKellotorniVana, Pivot = BbVenePivot, Liike = Liike.Liuku,
                Akseli = Vector3.right, Laajuus = BbVeneMatka, KayS = 16f, TaukoS = 30f };
            for (int k = 0; k < 6; k++)
                osat[2 + k] = new LiikkuvaOsaMaaritys { Nimi = "savel" + k, Verkko = k % 2 == 0 ? (Func<Mesh>)BruggenKellotorniNuotti : BruggenKellotorniNuottiPari,
                    Pivot = BbNuottiPivot, Liike = Liike.Nousu, Akseli = Vector3.up };
            osat[8] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = BruggenKellotorniValot, Pivot = BbValotPivot, Liike = Liike.Valahdys };
            osat[9] = new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = BruggenKellotorniValotKaakko, Pivot = BbViistoPivot(1f), Liike = Liike.Valahdys };
            osat[10] = new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = BruggenKellotorniValotLounas, Pivot = BbViistoPivot(-1f), Liike = Liike.Valahdys };
            osat[11] = new LiikkuvaOsaMaaritys { Nimi = "kruunu", Verkko = BruggenKellotorniKruunu, Pivot = BbKruunuPivot, Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool bruggenKellotorni = Rekisteroi("brugge-belfry",
            new Erikoismalli { Runko = BruggenKellotorniRunko, Osat = BruggenKellotorniOsat, Kolmiot0 = 1043, KokoKerroin = 1.5f });
    }
}
