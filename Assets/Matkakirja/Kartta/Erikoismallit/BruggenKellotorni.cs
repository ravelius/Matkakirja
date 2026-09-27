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

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: kaikuaukkojen säleiköt, talojen spaarveld-syvennykset ja pollarit.
        /// Ominaisuuksina, koska Em-paletti on toisessa tiedostossa (staattisten kenttien alustusjärjestys osittaisluokan
        /// tiedostojen välillä ei ole taattu).</summary>
        static Color BbLhSaleet => Color.Lerp(BbAukko, BbKivireuna, 0.42f);
        static Color BbLhSyvennys(Color seina) => Color.Lerp(seina, BbAukko, 0.2f);
        static Color BbLhPollari => Color.Lerp(EmMuste, BbTiili, 0.35f);
        /// <summary>Tornin koristeiden taso: rungon tavoin 0,004 pinnan edessä (yövalon hehku on 0,002:ssa).</summary>
        const float BbLhEteen = 0.004f;

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (torni, Hallen siivet, arkadi, kanava, silta ja jokainen talo) ja osien pivotit kuin rungossa, noin 2,6 × kolmiot
        /// (2 135) lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; vene, vana, nuotit ja valot pysyvät ennallaan: tornin
        /// ikkunat, ovi, kaikuaukot ja kello ovat rungon tasoissa yövalon hehkun edessä (tummat myös yöllä), syvennykset ja
        /// listavyöt hehkun takana (valaistu pinta on yöllä yhtenäinen).
        ///   torni   kivisokkeli, listavyöt ja spaarveld-syvennykset, kulmatornien kivikonsolit, ampumaraot ja räystäskaista,
        ///           käytävien kaiteet (etelässä aukotetut), sisäpihan suippokaarinen ovi, suippokaari-ikkunat kivikehyksineen
        ///           ja ristikkoineen, pinaakkelien raot; lyhdyssä kulmaruoteet, sokeat suippokaaret, listavyö ja konsolirivi,
        ///           kaikuaukot säleikköineen ja lautoineen, kellotaulu kivikehyksineen ja tuntimerkkeineen, kruunun kaiteen
        ///           suippoaukot
        ///   Halle   siipien eteläpäädyissä suippokaari-ikkunat, ovi ja sokkeli, lonkan kattolyhty, pitkillä lappeilla
        ///           kattoikkunat; arkadin kaaret oikeina aukkoina (tumma galleria ja lattia takana), pylväät ja reunalista
        ///   kanava  pohjoisrannan reunakivi ja portaat veteen länsipäässä, pollarit, kaksi kanavalyhtyä, väreily avovedellä ja
        ///           Nepomukin patsas sillalla
        ///   talot   flaamilainen julkisivu: spaarveld-syvennykset, ristikkoikkunat kahdessa kerroksessa ja päädyssä,
        ///           listakivi päädyn juurella, kivisokkeli ja savupiippu
        /// </summary>
        static Mesh BruggenKellotorniLahi()
        {
            var r = new Rakentaja();
            BbLhTorni(r);
            BbLhTorniKoristeet(r);
            BbLhHalle(r);
            BbLhKanava(r);
            BbSilta(r);
            BbLhNepomuk(r);
            BbJoutsen(r, new Vector3(0.13f, BbVesiY, BbKanavaZ + BbKanavaPuoli - 0.016f), Mathf.PI);
            BbJoutsen(r, new Vector3(0.162f, BbVesiY, BbKanavaZ + BbKanavaPuoli - 0.024f), Mathf.PI * 0.92f);
            BbLhTalo(r, new Vector3(-0.445f, 0f, BbTaloZ), 0.095f, 0.085f, 0.1f, 0.07f, BbTaloSeinat[0], 0);
            BbLhTalo(r, new Vector3(-0.345f, 0f, BbTaloZ), 0.1f, 0.09f, 0.12f, 0.075f, BbTaloSeinat[1], 1);
            BbLhTalo(r, new Vector3(0.345f, 0f, BbTaloZ), 0.1f, 0.09f, 0.115f, 0.075f, BbTaloSeinat[2], 2);
            BbLhTalo(r, new Vector3(0.445f, 0f, BbTaloZ), 0.095f, 0.085f, 0.095f, 0.065f, BbTaloSeinat[3], 3);
            return r.Verkko("BruggenKellotorni-lahi");
        }

        /// <summary>
        /// Lähitason torni yhtenä ääriviivaosana: rungon massat (kerrokset, käytävät, kulmatornit, pinaakkelit, kahdeksankulmio ja
        /// kruunu) samoilla mitoilla sekä siluettia myötäilevät lisät: kivisokkeli ja listavyöt, kulmatornien konsolit,
        /// käytävien kaiteet, lyhdyn kulmaruoteet, listavyö ja konsolirivi kruunun alla.
        /// </summary>
        static void BbLhTorni(Rakentaja r)
        {
            var c = new Vector3(0f, 0f, BbTorniZ);
            var up = Vector3.up;
            float p1 = BbLeveys1 * 0.5f, p2 = BbLeveys2 * 0.5f;
            r.AloitaOsa();
            // 1. kerros, sokkeli, vyö oven ja ikkunan välissä ja käytävä kulmatorneineen; tornien alla kiviset konsolit ja
            // kartiokatoissa räystäskaista kuten Hallen katoilla.
            r.Laatikko(c, new Vector3(BbLeveys1, BbK1, BbLeveys1), BbTiili, BbTiili);
            r.Laatikko(c, new Vector3(BbLeveys1 + 0.006f, 0.022f, BbLeveys1 + 0.006f), BbKivireuna, BbKivireuna);
            BbLhVyo(r, c, p1, 0.112f, 0.119f);
            r.Laatikko(c + up * (BbK1 - 0.016f), new Vector3(BbLeveys1 + 0.022f, 0.03f, BbLeveys1 + 0.022f), BbKivireuna, BbKivireuna);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    var k = c + new Vector3(sx * p1, 0f, sz * p1);
                    r.Pylvas(k + up * (BbK1 - 0.075f), 0.022f, 0.12f, 6, BbTiiliVaalea);
                    r.KartioRaystas(k + up * (BbK1 + 0.045f), 0.025f, 0.045f, 6, BbLiuske, BbLiuskeRaystas, 0.25f);
                    BbLhKonsoli(r, k + up * (BbK1 - 0.075f), 0.022f, 0.04f, 6, BbKivireuna);
                }
            // Käytävän kaide kulmatornien välissä: etelässä viisi aukkoa, muilla sivuilla umpinainen.
            float e1 = p1 + 0.011f;
            foreach (var n in new[] { Vector3.back, Vector3.right, Vector3.left, Vector3.forward })
                BbLhKaide(r, c, n, e1, 0.075f, BbK1 + 0.014f, 0.013f, 0.004f, n.z < -0.5f ? 5 : 0);
            // 2. kerros ja vyö ikkunoiden alla, käytävä ja sen kaide kulmapinaakkelien välissä.
            r.Laatikko(c + up * (BbK1 + 0.014f), new Vector3(BbLeveys2, BbK2 - BbK1 - 0.014f, BbLeveys2), BbTiiliVaalea, BbTiiliVaalea);
            BbLhVyo(r, c, p2, 0.408f, 0.415f);
            r.Laatikko(c + up * (BbK2 - 0.016f), new Vector3(BbLeveys2 + 0.018f, 0.026f, BbLeveys2 + 0.018f), BbKivireuna, BbKivireuna);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    var k = c + new Vector3(sx * (p2 - 0.004f), 0f, sz * (p2 - 0.004f));
                    r.Pylvas(k + up * (BbK2 - 0.03f), 0.014f, 0.13f, 4, BbHiekkakiviVarjo);
                    r.Kartio(k + up * (BbK2 + 0.1f), 0.017f, 0.12f, 4, BbHiekkakiviVarjo);
                }
            float e2 = p2 + 0.009f;
            foreach (var n in new[] { Vector3.back, Vector3.right, Vector3.left })
                BbLhKaide(r, c, n, e2, 0.067f, BbK2 + 0.01f, 0.012f, 0.004f, n.z < -0.5f ? 5 : 0);
            // Kahdeksankulmio (hiekkakivi), kulmaruoteet (paitsi kaksi tornin taakse jäävää), listavyö kellon ja kaikuaukkojen
            // välissä ja konsolirivi kruunun kaiteen ulokkeen alla kameran puoleisilla sivuilla.
            float rk = BbApoteemi / Mathf.Cos(Mathf.PI / 8f);
            r.Vaippa(c + up * (BbK2 + 0.01f), rk, rk, BbK3 - BbK2 - 0.01f, 8, BbHiekkakivi, BbKulma0);
            for (int k = 0; k < 8; k++)
            {
                if (k == 1 || k == 2) continue;   // kärjet 67,5° ja 112,5° (pohjoinen) eivät näy
                BbLhRuode(r, c, rk, BbKulma0 + k * Mathf.PI / 4f, 0.0042f, 0.0048f, BbK2 + 0.01f, BbK3 - 0.006f, BbHiekkakiviVarjo);
            }
            var nakyvat = new[] { 0, 4, 5, 6, 7 };   // sivut k · 45°: itä, länsi, lounas, etelä, kaakko
            BbLhOktaVyo(r, c, nakyvat, 0.004f, 0.776f, 0.783f, BbHiekkakiviVarjo, BbKivireuna);
            foreach (int k in nakyvat)
            {
                float a = k * Mathf.PI / 4f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = Vector3.Cross(Vector3.up, n);
                for (int j = -1; j <= 1; j++)
                {
                    var q = c + n * (BbApoteemi + 0.0074f) + t * (j * 0.021f) + up * (BbK3 - 0.013f);
                    r.NelioUlos(q - t * 0.0035f, q + t * 0.0035f, q + t * 0.0035f + up * 0.008f, q - t * 0.0035f + up * 0.008f, n, BbHiekkakiviVarjo);
                }
            }
            // Kruunu kuten rungossa: kaide, tasakatto ja kahdeksan pinaakkelia.
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
                r.Kartio(c + d0 * ((ru + rs) * 0.5f) + up * y1, 0.012f, i % 2 == 0 ? 0.085f : 0.06f, 4, BbHiekkakivi);
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Lähitason tornin koristeet ilman omaa ääriviivaa rungon tasoissa (0,004 pinnan edessä; lyhdyn eteläsivulla 2. kerroksen
        /// pinnan tasossa kuten rungossa), joten yövalon hehku jää niiden taakse: sisäpihan ovi ja 1. kerroksen ikkuna, 2. kerroksen
        /// ikkunat, kulmatornien ja pinaakkelien raot, kaikuaukot (kameran puolella säleiköin, pohjoisessa rungon aukot),
        /// kellotaulu ja kruunun kaiteen suippoaukot.
        /// </summary>
        static void BbLhTorniKoristeet(Rakentaja r)
        {
            var c = new Vector3(0f, 0f, BbTorniZ);
            var up = Vector3.up;
            float p1 = BbLeveys1 * 0.5f, p2 = BbLeveys2 * 0.5f, y2 = (BbK1 + BbK2) * 0.5f + 0.01f;
            // Spaarvelden (suippokaariset syvennykset, Bruggen tiiligotiikan tunnusmerkki) 0,001 pinnan edessä eli hehkun takana:
            // 1. kerroksessa ikkunan ympärillä ja sen molemmin puolin, 2. kerroksessa kummankin ikkunan ympärillä.
            var syv1 = BbLhSyvennys(BbTiili);
            var t1 = c + Vector3.back * (p1 + 0.001f);
            BbLhAukkoMuoto(r, t1 + up * 0.128f, Vector3.back, 0.066f, 0.177f, syv1);
            foreach (float s in new[] { -1f, 1f })
                BbLhAukkoMuoto(r, t1 + Vector3.right * (s * 0.057f) + up * 0.128f, Vector3.back, 0.022f, 0.162f, syv1);
            var t2 = c + Vector3.back * (p2 + 0.001f);
            foreach (float s in new[] { -1f, 1f })
                BbLhAukkoMuoto(r, t2 + Vector3.right * (s * 0.036f) + up * 0.419f, Vector3.back, 0.044f, 0.179f, BbLhSyvennys(BbTiiliVaalea));
            // 1. kerros: suippokaarinen ovi sisäpihalle ja rungon ikkunan paikalla suippokaari-ikkuna ristikkoineen.
            var s1 = c + Vector3.back * (p1 + BbLhEteen);
            BbLhAukko(r, s1, Vector3.back, 0.034f, 0.085f, 2, BbKivireuna, BbKivireuna);
            BbLhAukko(r, s1 + up * 0.16f, Vector3.back, 0.04f, 0.11f, 0, BbKivireuna, BbKivireuna);
            // 2. kerros: etelässä ikkunat ristikkoineen, idässä ja lännessä kevyemmin (näkyvät vain sivulta).
            foreach (var n in new[] { Vector3.back, Vector3.right, Vector3.left })
            {
                var t = Vector3.Cross(Vector3.up, n);
                foreach (float s in new[] { -1f, 1f })
                    BbLhAukko(r, c + n * (p2 + BbLhEteen) + t * (s * 0.036f) + up * (y2 - 0.075f), n, 0.028f, 0.15f, n.z < -0.5f ? 0 : 3,
                        BbKivireuna, BbKivireuna);
            }
            // Kulmatornien ampumaraot ja pinaakkelien raot kameran puoleisilla tahkoilla (etelän kulmissa).
            foreach (float sx in new[] { -1f, 1f })
            {
                var k1 = c + new Vector3(sx * p1, 0f, -p1);
                foreach (float a in new[] { 270f, sx > 0f ? 330f : 210f })
                {
                    var n = new Vector3(Mathf.Cos(a * Mathf.PI / 180f), 0f, Mathf.Sin(a * Mathf.PI / 180f));
                    r.Laatta(k1 + n * (0.022f * 0.866f) + up * 0.293f, n, 0.0045f, 0.022f, BbAukko);
                }
                var k2 = c + new Vector3(sx * (p2 - 0.004f), 0f, -(p2 - 0.004f));
                foreach (float a in new[] { 225f, 315f })
                {
                    var n = new Vector3(Mathf.Cos(a * Mathf.PI / 180f), 0f, Mathf.Sin(a * Mathf.PI / 180f));
                    r.Laatta(k2 + n * (0.014f * 0.7071f) + up * 0.697f, n, 0.0045f, 0.036f, BbAukko);
                }
            }
            // Kaikuaukot: kameran puoleisilla viidellä sivulla säleiköt, pystypuite, kivikehys ja lauta; pohjoisessa rungon aukot.
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI / 4f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                float etaisyys = i == 6 ? p2 + 0.0025f : BbApoteemi + 0.0025f;   // i = 6 → suunta −Z (etelä)
                if (i >= 1 && i <= 3) r.Holvi(c + n * etaisyys + up * (BbK2 + 0.25f), n, 0.026f, 0.17f, BbAukko);
                else BbLhAukko(r, c + n * (etaisyys + 0.0015f) + up * (BbK2 + 0.165f), n, 0.026f, 0.17f, 1, BbHiekkakiviVarjo, BbLhSaleet);
            }
            // Lyhdyn alavyöhyke itä-, länsi- ja viistosivuilla (etelässä kello): kaksi sokeaa suippokaarta listavyön alla,
            // 0,001 pinnan edessä eli viistosivujen hehkun takana.
            foreach (int k in new[] { 0, 4, 5, 7 })
            {
                float a = k * Mathf.PI / 4f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = Vector3.Cross(Vector3.up, n);
                foreach (float s in new[] { -1f, 1f })
                    BbLhAukkoMuoto(r, c + n * (BbApoteemi + 0.001f) + t * (s * 0.0135f) + up * 0.668f, n, 0.017f, 0.097f, BbHiekkakiviVarjo);
            }
            // Kellotaulu: tumma taulu, kivikehys, neljä tuntimerkkiä ja rungon viisarit.
            var kp = c + Vector3.back * (p2 + 0.0045f) + up * (BbK2 + 0.085f);
            const int kk = 12;
            for (int i = 0; i < kk; i++)
            {
                float a0 = i * Mathf.PI * 2f / kk, a1 = (i + 1) * Mathf.PI * 2f / kk;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f), d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f);
                r.KolmioUlos(kp, kp + d0 * 0.0205f, kp + d1 * 0.0205f, Vector3.back, BbKello);
                r.NelioUlos(kp + d0 * 0.0205f, kp + d1 * 0.0205f, kp + d1 * 0.0255f, kp + d0 * 0.0255f, Vector3.back, BbKivireuna);
            }
            var vp = kp + Vector3.back * 0.001f;
            for (int i = 0; i < 4; i++)
            {
                float a = i * Mathf.PI * 0.5f;
                var d = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f);
                var e = new Vector3(-d.y, d.x, 0f);
                var m = vp + d * 0.0165f;
                r.NelioUlos(m - d * 0.0025f - e * 0.0014f, m + d * 0.0025f - e * 0.0014f, m + d * 0.0025f + e * 0.0014f, m - d * 0.0025f + e * 0.0014f,
                    Vector3.back, BbKivireuna);
            }
            r.NelioUlos(vp + new Vector3(-0.002f, 0f, 0f), vp + new Vector3(0.002f, 0f, 0f), vp + new Vector3(0.002f, 0.015f, 0f),
                vp + new Vector3(-0.002f, 0.015f, 0f), Vector3.back, BbKivireuna);
            r.NelioUlos(vp + new Vector3(0f, -0.002f, 0f), vp + new Vector3(0.011f, -0.002f, 0f), vp + new Vector3(0.011f, 0.002f, 0f),
                vp + new Vector3(0f, 0.002f, 0f), Vector3.back, BbKivireuna);
            // Kruunun kaiteen suippoaukot kameran puoleisilla sivuilla (kaksi sivua kohden).
            float ru = BbApoteemi / Mathf.Cos(Mathf.PI / 8f) + 0.008f, au = ru * Mathf.Cos(Mathf.PI / 8f) + 0.0006f;
            foreach (int k in new[] { 0, 4, 5, 6, 7 })
            {
                float a = k * Mathf.PI / 4f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = Vector3.Cross(Vector3.up, n);
                foreach (float s in new[] { -1f, 1f })
                    BbLhAukko(r, c + n * au + t * (s * 0.0165f) + up * (BbK3 + 0.006f), n, 0.011f, 0.027f, 4, BbAukko, BbAukko);
            }
        }

        /// <summary>
        /// Suippokaari-aukko: alareunan keskipiste p koristetasossa, ulospäin, leveys ja kokonaiskorkeus laki mukaan lukien
        /// (tasasivuinen suippokaari, kaksi lohkoa puolelleen). Tumma aukko 6 kolmiota; laji 0 ikkuna: kehys (pielet ja kaarinauha
        /// 12), pystypuite, välipuite ja lakiruutu (6) ja lauta (4); 1 kaikuaukko: kehys, pystypuite, viisi sälettä ja lauta;
        /// 2 ovi: kehys; 3 kevyt ikkuna: kaarinauha ja lauta; 4 pelkkä aukko. Kehys ja ristikko 0,0006 aukon edessä.
        /// </summary>
        static void BbLhAukko(Rakentaja r, Vector3 p, Vector3 ulos, float lev, float kork, int laji, Color kehys, Color ristikko)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            float w = lev * 0.5f, R = lev, ka = Mathf.Min(lev * 0.866f, kork * 0.6f), sy = ka / (lev * 0.866f), ys = kork - ka;
            float b = Mathf.Max(0.0032f, lev * 0.13f), e = 0.0006f;
            Vector3 P(float x, float y, float d) => p + t * x + Vector3.up * y + n * d;
            // Kaaren piste: puoli −1 vasen kaari (keskipiste oikeassa syntykohdassa), +1 oikea; säde rr, kulma th.
            Vector3 K(float puoli, float rr, float th, float d) => P(puoli * (rr * Mathf.Cos(th) - w), ys + rr * Mathf.Sin(th) * sy, d);
            float thR = Mathf.PI / 3f, thB = (float)Math.Acos(w / (R + b));
            r.NelioUlos(P(-w, 0f, 0f), P(w, 0f, 0f), P(w, ys, 0f), P(-w, ys, 0f), n, BbAukko);
            var M = P(0f, ys, 0f);
            foreach (float puoli in new[] { -1f, 1f })
                for (int k = 0; k < 2; k++)
                    r.KolmioUlos(M, K(puoli, R, thR * k * 0.5f, 0f), K(puoli, R, thR * (k + 1) * 0.5f, 0f), n, BbAukko);
            if (laji == 4) return;
            // Kehys: kaarinauha (kaikki paitsi 4) ja pielet (ikkuna, kaikuaukko ja ovi).
            foreach (float puoli in new[] { -1f, 1f })
            {
                for (int k = 0; k < 2; k++)
                    r.NelioUlos(K(puoli, R, thR * k * 0.5f, e), K(puoli, R + b, thB * k * 0.5f, e), K(puoli, R + b, thB * (k + 1) * 0.5f, e),
                        K(puoli, R, thR * (k + 1) * 0.5f, e), n, kehys);
                if (laji != 3)
                    r.NelioUlos(P(puoli * w, 0f, e), P(puoli * (w + b), 0f, e), P(puoli * (w + b), ys, e), P(puoli * w, ys, e), n, kehys);
            }
            float m = Mathf.Max(0.0015f, lev * 0.05f);
            if (laji == 0)
            {
                float yc = ys + ka * 0.4f, hh = ka * 0.22f, hw = w * 0.36f, yt = ys * 0.55f;
                r.NelioUlos(P(-m, 0f, e), P(m, 0f, e), P(m, yc - hh, e), P(-m, yc - hh, e), n, ristikko);
                r.NelioUlos(P(-w, yt - m, e), P(w, yt - m, e), P(w, yt + m, e), P(-w, yt + m, e), n, ristikko);
                r.NelioUlos(P(0f, yc - hh, e), P(hw, yc, e), P(0f, yc + hh, e), P(-hw, yc, e), n, ristikko);
            }
            else if (laji == 1)
            {
                float sh = ys * 0.05f;
                for (int k = 0; k < 5; k++)
                {
                    float y = ys * (0.1f + 0.19f * k);
                    r.NelioUlos(P(-w, y, e), P(w, y, e), P(w, y + sh, e), P(-w, y + sh, e), n, ristikko);
                }
                r.NelioUlos(P(-m, 0f, e + 0.0003f), P(m, 0f, e + 0.0003f), P(m, ys + ka * 0.3f, e + 0.0003f), P(-m, ys + ka * 0.3f, e + 0.0003f), n, kehys);
            }
            if (laji == 0 || laji == 1 || laji == 3)
            {
                // Ikkunalauta: valaistu yläpinta ja kapea etupinta aukon alareunassa.
                r.NelioUlos(P(-w - b, 0f, 0f), P(w + b, 0f, 0f), P(w + b, 0f, 0.0035f), P(-w - b, 0f, 0.0035f), Vector3.up, kehys);
                r.NelioUlos(P(-w - b, -0.0025f, 0.0035f), P(w + b, -0.0025f, 0.0035f), P(w + b, 0f, 0.0035f), P(-w - b, 0f, 0.0035f), n, kehys);
            }
        }

        /// <summary>Listavyö tornin eteläpinnassa (pinta etäisyydellä puoli keskeltä) korkeuksilla y0 … y1: etu- ja yläpinta 0,001
        /// pinnan edessä eli yövalon hehkun (0,002) takana, joten valaistu pinta on yöllä yhtenäinen. Vain eteläpinnassa: ympäri
        /// kiertävän vyön yläpinta näkyisi ylhäältä vaaleana viivana tornin kyljissä. 4 kolmiota.</summary>
        static void BbLhVyo(Rakentaja r, Vector3 c, float puoli, float y0, float y1)
        {
            float z = c.z - puoli - 0.001f, zs = c.z - puoli;
            r.NelioUlos(new Vector3(-puoli, y0, z), new Vector3(puoli, y0, z), new Vector3(puoli, y1, z), new Vector3(-puoli, y1, z), Vector3.back, BbKivireuna);
            r.NelioUlos(new Vector3(-puoli, y1, z), new Vector3(puoli, y1, z), new Vector3(puoli, y1, zs), new Vector3(-puoli, y1, zs), Vector3.up, BbKivireuna);
        }

        /// <summary>Kivikonsoli kulmatornin alla: ylösalainen kartio tornin pohjasta (p, säde) alas kärkeen (korkeus kork). 6 kolmiota
        /// (sivuja kappaletta).</summary>
        static void BbLhKonsoli(Rakentaja r, Vector3 p, float sade, float kork, int sivuja, Color vari)
        {
            var karki = p - Vector3.up * kork;
            var keski = p - Vector3.up * (kork * 0.3f);
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, p + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade,
                    karki, keski, vari);
            }
        }

        /// <summary>Käytävän kaide: neliön sivu suuntaan n etäisyydellä e keskeltä, pituus ±puoli, korkeus y0 … y0 + kork, paksuus;
        /// ulko-, sisä- ja yläpinta (6 kolmiota) ja ulkopinnassa aukkoja tummina suorakulmioina (2 kolmiota kukin).</summary>
        static void BbLhKaide(Rakentaja r, Vector3 c, Vector3 n, float e, float puoli, float y0, float kork, float paksuus, int aukkoja)
        {
            var t = Vector3.Cross(Vector3.up, n);
            Vector3 U(float s, float d, float y) => c + n * d + t * s + Vector3.up * y;
            float y1 = y0 + kork, ei = e - paksuus;
            r.NelioUlos(U(-puoli, e, y0), U(puoli, e, y0), U(puoli, e, y1), U(-puoli, e, y1), n, BbKivireuna);
            r.NelioUlos(U(-puoli, ei, y0), U(puoli, ei, y0), U(puoli, ei, y1), U(-puoli, ei, y1), -n, BbHiekkakiviVarjo);
            r.NelioUlos(U(-puoli, ei, y1), U(puoli, ei, y1), U(puoli, e, y1), U(-puoli, e, y1), Vector3.up, BbKivireuna);
            for (int i = 0; i < aukkoja; i++)
            {
                float s = -puoli + (i + 0.5f) * 2f * puoli / aukkoja, w = puoli / aukkoja * 0.5f;
                r.NelioUlos(U(s - w, e + 0.0006f, y0 + kork * 0.25f), U(s + w, e + 0.0006f, y0 + kork * 0.25f), U(s + w, e + 0.0006f, y1 - kork * 0.2f),
                    U(s - w, e + 0.0006f, y1 - kork * 0.2f), n, BbAukko);
            }
        }

        /// <summary>Kahdeksankulmion kulmaruode kärjessä kulmalla a (säde rk): tyvi leveys w pitkin viereisiä sivuja, ulkonema ulk,
        /// korkeudet y0 … y1; kaksi viistoa tahkoa ja kansi (5 kolmiota).</summary>
        static void BbLhRuode(Rakentaja r, Vector3 c, float rk, float a, float w, float ulk, float y0, float y1, Color vari)
        {
            var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
            var V = c + d * rk;
            var e1 = (c + new Vector3(Mathf.Cos(a - Mathf.PI / 4f), 0f, Mathf.Sin(a - Mathf.PI / 4f)) * rk - V).normalized;
            var e2 = (c + new Vector3(Mathf.Cos(a + Mathf.PI / 4f), 0f, Mathf.Sin(a + Mathf.PI / 4f)) * rk - V).normalized;
            Vector3 B1 = V + e1 * w, B2 = V + e2 * w, T = V + d * ulk, Y0 = Vector3.up * y0, Y1 = Vector3.up * y1;
            var keski = V - d * 0.01f + Vector3.up * ((y0 + y1) * 0.5f);
            r.NelioKeskelta(B1 + Y0, T + Y0, T + Y1, B1 + Y1, keski, vari);
            r.NelioKeskelta(T + Y0, B2 + Y0, B2 + Y1, T + Y1, keski, vari);
            r.KolmioUlos(B1 + Y1, T + Y1, B2 + Y1, Vector3.up, vari);
        }

        /// <summary>Kahdeksankulmion listavyö annetuilla sivuilla (sivu k osoittaa kulmaan k · 45°): etu- ja yläpinta, ulkonema ulk
        /// apoteemin yli, korkeudet y0 … y1 (4 kolmiota sivulta).</summary>
        static void BbLhOktaVyo(Rakentaja r, Vector3 c, int[] sivut, float ulk, float y0, float y1, Color etu, Color yla)
        {
            float rk = BbApoteemi / Mathf.Cos(Mathf.PI / 8f), ru = (BbApoteemi + ulk) / Mathf.Cos(Mathf.PI / 8f);
            Vector3 Y0 = Vector3.up * y0, Y1 = Vector3.up * y1;
            foreach (int k in sivut)
            {
                float a = k * Mathf.PI / 4f, a0 = a - Mathf.PI / 8f, a1 = a + Mathf.PI / 8f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                r.NelioUlos(c + d0 * ru + Y0, c + d1 * ru + Y0, c + d1 * ru + Y1, c + d0 * ru + Y1, n, etu);
                r.NelioUlos(c + d0 * rk + Y1, c + d1 * rk + Y1, c + d1 * ru + Y1, c + d0 * ru + Y1, Vector3.up, yla);
            }
        }

        /// <summary>
        /// Lähitason Halle: rungon siivet ja lonkkakatot samana ääriviivaosana, eteläisellä lonkalla kattolyhty ja pitkillä
        /// lappeilla kattoikkunat; siipien eteläpäädyissä sokkeli, rungon ikkunoiden paikoilla suippokaari-ikkunat ja niiden välissä
        /// ovi; arkadi (BbLhArkadi) kaarineen.
        /// </summary>
        static void BbLhHalle(Rakentaja r)
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
                // Sokkeli eteläpäädyssä.
                float ze = BbHalleEtela - 0.002f;
                r.NelioUlos(new Vector3(xa, 0f, ze), new Vector3(xb, 0f, ze), new Vector3(xb, 0.008f, ze), new Vector3(xa, 0.008f, ze), Vector3.back, BbKivireuna);
                r.NelioUlos(new Vector3(xa, 0.008f, ze), new Vector3(xb, 0.008f, ze), new Vector3(xb, 0.008f, BbHalleEtela), new Vector3(xa, 0.008f, BbHalleEtela),
                    Vector3.up, BbKivireuna);
                // Kattolyhty eteläisellä lonkalla (lonkan kaltevuus: nousu katon korkeus räystäältä harjan päähän).
                float z0 = BbHalleEtela - 0.006f, a = (xb - xa + 0.012f) * 0.5f, k = BbHalleKatto / a;
                BbLhKattolyhty(r, new Vector3((xa + xb) * 0.5f, 0f, z0 + a * 0.25f), BbHalleSeina + BbHalleKatto * 0.25f, k, 0.032f, 0.026f, 0.014f);
            }
            r.LopetaOsa();
            // Kattoikkunat pitkillä lappeilla: kolme lapetta kohden, lappeen suuntaisina tummina ruutuina.
            foreach (float s in new[] { -1f, 1f })
            {
                float xa = Mathf.Min(s * BbHalleSisaX, s * BbHalleX) - 0.006f, xb = Mathf.Max(s * BbHalleSisaX, s * BbHalleX) + 0.006f;
                float xc = (xa + xb) * 0.5f, a = (xb - xa) * 0.5f;
                foreach (float puoli in new[] { -1f, 1f })
                {
                    var nn = new Vector3(puoli * BbHalleKatto, a, 0f).normalized;
                    foreach (var (z, f) in new[] { (0.04f, 0.45f), (0.12f, 0.45f), (0.2f, 0.45f) })
                    {
                        // f = osuus räystäältä harjalle.
                        var q = new Vector3(xc + puoli * a * (1f - f), BbHalleSeina + BbHalleKatto * f, z) + nn * 0.0008f;
                        var ylos = new Vector3(-puoli * a, BbHalleKatto, 0f).normalized;
                        Vector3 sv = Vector3.forward * 0.009f, yv = ylos * 0.011f;
                        r.NelioUlos(q - sv - yv, q + sv - yv, q + sv + yv, q - sv + yv, nn, BbAukko);
                    }
                }
            }
            // Siipien eteläpäätyjen suippokaari-ikkunat rungon paikoilla (kaarinauha ja lauta) ja niiden välissä ovi (sokkelin edessä).
            foreach (float s in new[] { -1f, 1f })
            {
                float xk = s * (BbHalleSisaX + BbHalleX) * 0.5f;
                foreach (float dx in new[] { -0.036f, 0.036f })
                    BbLhAukko(r, new Vector3(xk + dx, BbHalleSeina * 0.48f - 0.026f, BbHalleEtela - 0.0015f), Vector3.back, 0.018f, 0.052f, 3,
                        BbKivireuna, BbKivireuna);
                BbLhAukko(r, new Vector3(xk, 0f, BbHalleEtela - 0.0025f), Vector3.back, 0.02f, 0.046f, 2, BbKivireuna, BbKivireuna);
            }
            BbLhArkadi(r);
        }

        /// <summary>Kattolyhty (pieni päätyikkuna) lonkan lappeella, joka nousee pohjoiseen kaltevuudella k: etuseinä ja päätykolmio
        /// etelään, kyljet, harjakatto ja tumma ikkuna. p = etuseinän alareunan keskikohta (y lasketaan lappeesta: yb), leveys,
        /// seinän korkeus ja päädyn korkeus. 12 kolmiota.</summary>
        static void BbLhKattolyhty(Rakentaja r, Vector3 p, float yb, float k, float lev, float hs, float hp)
        {
            float w = lev * 0.5f;
            var y = Vector3.up;
            Vector3 A = new Vector3(p.x - w, yb, p.z), B = new Vector3(p.x + w, yb, p.z);
            Vector3 A1 = A + y * hs, B1 = B + y * hs, H = new Vector3(p.x, yb + hs + hp, p.z);
            float ze = hs / k, zh = (hs + hp) / k;
            var keski = new Vector3(p.x, yb + hs * 0.5f, p.z + ze * 0.5f);
            r.NelioUlos(A, B, B1, A1, Vector3.back, BbSeinaHalle);
            r.KolmioUlos(A1, B1, H, Vector3.back, BbSeinaHalle);
            r.KolmioKeskelta(A, A1, A1 + Vector3.forward * ze, keski, BbSeinaHalle);
            r.KolmioKeskelta(B, B1, B1 + Vector3.forward * ze, keski, BbSeinaHalle);
            var o = Vector3.back * 0.003f;
            r.NelioKeskelta(A1 + o - Vector3.right * 0.002f, H + o, H + Vector3.forward * zh, A1 + Vector3.forward * ze - Vector3.right * 0.002f, keski, EmKatto);
            r.NelioKeskelta(B1 + o + Vector3.right * 0.002f, H + o, H + Vector3.forward * zh, B1 + Vector3.forward * ze + Vector3.right * 0.002f, keski, EmKatto);
            r.NelioUlos(new Vector3(p.x - w * 0.62f, yb + hs * 0.1f, p.z - 0.0003f), new Vector3(p.x + w * 0.62f, yb + hs * 0.1f, p.z - 0.0003f),
                new Vector3(p.x + w * 0.62f, yb + hs * 0.93f, p.z - 0.0003f), new Vector3(p.x - w * 0.62f, yb + hs * 0.93f, p.z - 0.0003f), Vector3.back, BbKivireuna);
            r.NelioUlos(new Vector3(p.x - w * 0.46f, yb + hs * 0.2f, p.z - 0.0006f), new Vector3(p.x + w * 0.46f, yb + hs * 0.2f, p.z - 0.0006f),
                new Vector3(p.x + w * 0.46f, yb + hs * 0.84f, p.z - 0.0006f), new Vector3(p.x - w * 0.46f, yb + hs * 0.84f, p.z - 0.0006f), Vector3.back, BbAukko);
        }

        /// <summary>
        /// Arkadi (rungossa Seina + neljä holvikuvaa). Ääriviivaosa on rungon muurin kuori (pohjois- ja yläpinta, päädyt) ja
        /// eteläpinnan pohjoiseen käännetty kopio: kamera (aina etelästä) karsii sen, mutta ääriviivan kasvatus (Cull Off) piirtää sen
        /// kuten rungon eteläpinnan, joten musteviiva on sama kuin rungossa. Varsinainen eteläpinta neljine oikeine kaariaukkoineen
        /// (kaari kolmena lohkona), tumma galleria ja lattia aukkojen takana, pylväät ja reunalista ovat pieninä osina ilman omaa
        /// ääriviivaa: ääriviivaosan sisällä niiden kasvatetut kopiot tummentaisivat musteviivaa arkadin alla.
        /// </summary>
        static void BbLhArkadi(Rakentaja r)
        {
            float zs = BbHalleEtela + 0.005f, zn = BbHalleEtela + 0.035f, xa = -BbHalleSisaX, xb = BbHalleSisaX, h = 0.045f;
            const float syv = 0.011f, aw = 0.013f, ays = 0.023f;
            Vector3 S(float x, float y) => new Vector3(x, y, zs);
            Vector3 N(float x, float y) => new Vector3(x, y, zn);
            r.AloitaOsa();
            r.NelioUlos(S(xa, 0f), S(xb, 0f), S(xb, h), S(xa, h), Vector3.forward, BbArkadi);   // kuoren eteläpinta pohjoiseen päin
            r.NelioUlos(N(xa, 0f), N(xb, 0f), N(xb, h), N(xa, h), Vector3.forward, BbArkadi);
            r.NelioUlos(S(xa, 0f), N(xa, 0f), N(xa, h), S(xa, h), Vector3.left, BbArkadi);
            r.NelioUlos(S(xb, 0f), N(xb, 0f), N(xb, h), S(xb, h), Vector3.right, BbArkadi);
            r.NelioUlos(S(xa, h), S(xb, h), N(xb, h), N(xa, h), Vector3.up, BbKivireuna);
            r.LopetaOsa();
            // Pilarit (täysi korkeus) aukkojen välissä ja päissä.
            float edellinen = xa;
            for (int i = 0; i <= 4; i++)
            {
                float xs = i < 4 ? -0.0675f + i * 0.045f - aw : xb;
                r.NelioUlos(S(edellinen, 0f), S(xs, 0f), S(xs, h), S(edellinen, h), Vector3.back, BbArkadi);
                if (i < 4) edellinen = xs + 2f * aw;
            }
            // Kaarien yläpuoliset kentät (kaari kolmena lohkona kuten Colosseumin aukoissa) ja galleria aukkojen takana.
            for (int i = 0; i < 4; i++)
            {
                float xc = -0.0675f + i * 0.045f;
                Vector3 A(int j) { float f = j * Mathf.PI / 3f; return S(xc + aw * Mathf.Cos(f), ays + aw * Mathf.Sin(f)); }
                Vector3 TR = S(xc + aw, h), TL = S(xc - aw, h);
                r.KolmioUlos(A(0), A(1), TR, Vector3.back, BbArkadi);
                r.KolmioUlos(TR, TL, A(1), Vector3.back, BbArkadi);
                r.KolmioUlos(A(1), A(2), TL, Vector3.back, BbArkadi);
                r.KolmioUlos(A(2), A(3), TL, Vector3.back, BbArkadi);
                var d = Vector3.forward * syv;
                r.NelioUlos(S(xc - aw, 0f) + d, S(xc + aw, 0f) + d, S(xc + aw, ays + aw) + d, S(xc - aw, ays + aw) + d, Vector3.back, BbAukko);
                r.NelioUlos(S(xc - aw, 0.0006f), S(xc + aw, 0.0006f), S(xc + aw, 0.0006f) + d, S(xc - aw, 0.0006f) + d, Vector3.up,
                    Color.Lerp(BbKivireuna, BbAukko, 0.45f));
            }
            // Reunalista neljänä kappaleena (kukin alle ääriviivarajan) ja pylväät (puolipylväät pilarien keskellä).
            var eteen = Vector3.back * 0.0025f;
            for (int i = 0; i < 4; i++)
            {
                float x0 = Mathf.Lerp(xa, xb, i / 4f), x1 = Mathf.Lerp(xa, xb, (i + 1) / 4f);
                r.NelioUlos(S(x0, h - 0.005f) + eteen, S(x1, h - 0.005f) + eteen, S(x1, h) + eteen, S(x0, h) + eteen, Vector3.back, BbKivireuna);
                r.NelioUlos(S(x0, h) + eteen, S(x1, h) + eteen, S(x1, h), S(x0, h), Vector3.up, BbKivireuna);
            }
            for (int i = 0; i <= 4; i++)
            {
                float x = -0.09f + i * 0.045f;
                r.NelioUlos(S(x - 0.0022f, 0f) + Vector3.back * 0.0015f, S(x + 0.0022f, 0f) + Vector3.back * 0.0015f,
                    S(x + 0.0022f, h - 0.005f) + Vector3.back * 0.0015f, S(x - 0.0022f, h - 0.005f) + Vector3.back * 0.0015f, Vector3.back, BbKivireuna);
            }
        }

        /// <summary>
        /// Lähitason kanava: rungon vesi ja rantamuurit samana ääriviivaosana, pohjoisrannan vesipinnassa vaalea reunakivi ja
        /// länsipäässä portaat veteen (veneen kääntöympyrän ulkopuolella); rannoilla pollarit (pienet, ei ääriviivaa).
        /// </summary>
        static void BbLhKanava(Rakentaja r)
        {
            float z0 = BbKanavaZ - BbKanavaPuoli, z1 = BbKanavaZ + BbKanavaPuoli;
            r.AloitaOsa();
            r.NelioUlos(new Vector3(-0.5f, BbVesiY, z0), new Vector3(0.5f, BbVesiY, z0), new Vector3(0.5f, BbVesiY, z1), new Vector3(-0.5f, BbVesiY, z1),
                Vector3.up, EmVesi);
            r.Laatikko(new Vector3(0f, 0f, z0 - BbRantaLeveys * 0.5f), new Vector3(1f, BbRantaY, BbRantaLeveys), EmKivi, EmKiviVaalea);
            r.Laatikko(new Vector3(0f, 0f, z1 + BbRantaLeveys * 0.5f), new Vector3(1f, BbRantaY, BbRantaLeveys), EmKivi, EmKiviVaalea);
            // Reunakivi pohjoisrannan vesipinnan yläreunassa (kameraa kohti): ulkoneva vaalea kaista.
            float zr = z1 - 0.0015f, yr = BbRantaY - 0.0035f;
            r.NelioUlos(new Vector3(-0.5f, yr, zr), new Vector3(0.5f, yr, zr), new Vector3(0.5f, BbRantaY, zr), new Vector3(-0.5f, BbRantaY, zr), Vector3.back,
                EmKiviVaalea);
            r.NelioUlos(new Vector3(-0.5f, BbRantaY, zr), new Vector3(0.5f, BbRantaY, zr), new Vector3(0.5f, BbRantaY, z1), new Vector3(-0.5f, BbRantaY, z1),
                Vector3.up, EmKiviVaalea);
            // Portaat veteen pohjoisrannan länsipäässä (laskevat länteen rantamuurin viertä).
            for (int k = 0; k < 3; k++)
                r.Laatikko(new Vector3(-0.444f - k * 0.009f, BbVesiY - 0.001f, z1 - 0.0045f),
                    new Vector3(0.009f, BbRantaY - BbVesiY + 0.001f - 0.0025f * (k + 1), 0.009f), EmKivi, EmKiviVaalea);
            r.LopetaOsa();
            // Pollarit rantamuurien harjalla (veneen laituri länsipäässä ja kadunvarsi).
            foreach (var (x, z) in new[] { (-0.425f, z0 - 0.006f), (-0.3f, z0 - 0.006f), (0.03f, z0 - 0.006f), (0.29f, z0 - 0.006f),
                (-0.41f, z1 + 0.006f), (-0.07f, z1 + 0.006f), (0.22f, z1 + 0.006f) })
                r.Laatikko(new Vector3(x, BbRantaY, z), new Vector3(0.0045f, 0.0085f, 0.0045f), BbLhPollari, BbLhPollari);
            // Väreily: muutama vaalea vaakaviiru avovedellä rantojen tuntumassa (veneen reitin ja joutsenten ulkopuolella; vana
            // piirtyy niiden päälle).
            var vire = Color.Lerp(EmVesi, EmVaahto, 0.45f);
            foreach (var (x, z, l) in new[] { (-0.31f, z0 + 0.012f, 0.05f), (-0.06f, z0 + 0.009f, 0.04f), (0.17f, z0 + 0.013f, 0.055f),
                (0.39f, z0 + 0.01f, 0.04f), (-0.13f, z1 - 0.011f, 0.045f), (0.03f, z1 - 0.014f, 0.035f), (0.32f, z1 - 0.012f, 0.05f) })
                r.NelioUlos(new Vector3(x - l * 0.5f, BbVesiY + 0.0003f, z - 0.0012f), new Vector3(x + l * 0.5f, BbVesiY + 0.0003f, z - 0.0012f),
                    new Vector3(x + l * 0.5f, BbVesiY + 0.0003f, z + 0.0012f), new Vector3(x - l * 0.5f, BbVesiY + 0.0003f, z + 0.0012f), Vector3.up, vire);
            // Kanavalyhdyt eteläisellä rantamuurilla sillan molemmin puolin: ohut pylväs ja tumma lyhty.
            foreach (float x in new[] { BbSiltaX - 0.045f, BbSiltaX + 0.045f })
            {
                var q = new Vector3(x, BbRantaY, z0 - 0.006f);
                r.Pylvas(q, 0.0018f, 0.03f, 4, BbLhPollari);
                r.Timantti(q + Vector3.up * 0.0335f, 0.0045f, 0.0045f, BbLhPollari, 4);
            }
        }

        /// <summary>Nepomukin patsas Nepomucenusbrugin itäkaiteella sillan laella: jalusta, kapeneva hahmo ja pää (pienet, ei
        /// ääriviivaa).</summary>
        static void BbLhNepomuk(Rakentaja r)
        {
            var p = new Vector3(BbSiltaX + BbSiltaLeveys * 0.5f - 0.004f, 0.034f + 0.012f, BbKanavaZ);
            r.Laatikko(p, new Vector3(0.009f, 0.007f, 0.011f), EmKiviVaalea, EmKiviVaalea);
            var hahmo = Color.Lerp(EmKivi, EmSeepia, 0.35f);
            r.Vaippa(p + Vector3.up * 0.007f, 0.0036f, 0.0024f, 0.016f, 6, hahmo);
            r.Timantti(p + Vector3.up * 0.0262f, 0.0028f, 0.0034f, hahmo, 4);
        }

        /// <summary>
        /// Lähitason porraspäätytalo: rungon talon massat (runko, harjakatto, takapääty ja kolme askelmaa) samana ääriviivaosana
        /// ja listakivi päädyn juurella; julkisivussa kaksi spaarveld-syvennystä (Bruggen tiilijulkisivun tunnusmerkki), niissä
        /// ristikkoikkunat kahdessa kerroksessa, päädyssä ristikkoikkuna ja ylimpänä luukku; harjan takaosassa savupiippu.
        /// </summary>
        static void BbLhTalo(Rakentaja r, Vector3 p, float leveys, float syvyys, float h, float paaty, Color seina, int nro)
        {
            const int askelmia = 3;
            const float paksuus = 0.012f;
            float x = leveys * 0.5f, zt = p.z + syvyys;
            r.AloitaOsa();
            r.Laatikko(p + Vector3.forward * (syvyys * 0.5f), new Vector3(leveys, h, syvyys), seina, seina);
            float hr = paaty * (askelmia - 0.5f) / askelmia;
            float z0 = p.z + paksuus;
            Vector3 eL0 = new Vector3(p.x - x, h, z0), eL1 = new Vector3(p.x - x, h, zt), eR0 = new Vector3(p.x + x, h, z0), eR1 = new Vector3(p.x + x, h, zt);
            Vector3 hj0 = new Vector3(p.x, h + hr, z0), hj1 = new Vector3(p.x, h + hr, zt);
            var keski = new Vector3(p.x, h + hr * 0.3f, (z0 + zt) * 0.5f);
            BbLape(r, eL1, eL0, hj0, hj1, keski, BbTaloKatto, BbTaloRaystas, 0.2f);
            BbLape(r, eR0, eR1, hj1, hj0, keski, BbTaloKatto, BbTaloRaystas, 0.2f);
            r.KolmioKeskelta(eL1, eR1, hj1, keski, seina);
            for (int k = 0; k < askelmia; k++)
            {
                float w = leveys * (1f - k / (float)askelmia) - (k > 0 ? 0.004f : 0f);
                r.Laatikko(new Vector3(p.x, h + k * paaty / askelmia, p.z + paksuus * 0.5f), new Vector3(w, paaty / askelmia, paksuus), seina, BbKivireuna);
            }
            // Listakivi päädyn juurella (julkisivun levyinen, ulkoneva).
            float zl = p.z - 0.002f;
            r.NelioUlos(new Vector3(p.x - x, h - 0.005f, zl), new Vector3(p.x + x, h - 0.005f, zl), new Vector3(p.x + x, h, zl), new Vector3(p.x - x, h, zl),
                Vector3.back, BbKivireuna);
            r.NelioUlos(new Vector3(p.x - x, h, zl), new Vector3(p.x + x, h, zl), new Vector3(p.x + x, h, p.z), new Vector3(p.x - x, h, p.z), Vector3.up, BbKivireuna);
            // Kivisokkeli julkisivun juurella rantamuurin päällä.
            r.NelioUlos(new Vector3(p.x - x, 0f, p.z - 0.0008f), new Vector3(p.x + x, 0f, p.z - 0.0008f), new Vector3(p.x + x, 0.0055f, p.z - 0.0008f),
                new Vector3(p.x - x, 0.0055f, p.z - 0.0008f), Vector3.back, BbKivireuna);
            r.LopetaOsa();
            // Spaarvelden: kaksi suippokaarista syvennystä maasta listakiven alle, ikkunasarakkeiden kohdalla.
            var syvennys = BbLhSyvennys(seina);
            foreach (float s in new[] { -1f, 1f })
                BbLhAukkoMuoto(r, new Vector3(p.x + s * x * 0.45f, 0.006f, p.z - 0.0006f), Vector3.back, leveys * 0.3f, h - 0.012f, syvennys);
            // Ristikkoikkunat: yläkerta rungon paikoilla, alakerta, päätyikkuna ja luukku ylimmällä askelmalla.
            foreach (float s in new[] { -1f, 1f })
            {
                BbLhRistikkoikkuna(r, new Vector3(p.x + s * x * 0.45f, h * 0.62f, p.z), leveys * 0.22f, h * 0.26f);
                BbLhRistikkoikkuna(r, new Vector3(p.x + s * x * 0.45f, h * 0.27f, p.z), leveys * 0.22f, h * 0.24f);
            }
            BbLhRistikkoikkuna(r, new Vector3(p.x, h + paaty * 0.3f, p.z), leveys * 0.18f, paaty * 0.3f);
            r.Laatta(new Vector3(p.x, h + paaty * 0.76f, p.z), Vector3.back, leveys * 0.09f, paaty * 0.15f, BbAukko);
            // Savupiippu harjan takaosassa (tumma hormi ylhäällä).
            float sx = (nro % 2 == 0 ? 1f : -1f) * x * 0.35f;
            float yk = h + hr * (1f - Mathf.Abs(sx) / x) - 0.009f;
            r.Laatikko(new Vector3(p.x + sx, yk, p.z + syvyys * 0.72f), new Vector3(0.0085f, h + hr + 0.013f - yk, 0.0085f), seina, BbAukko);
        }

        /// <summary>Suippokaaren muotoinen pinta (spaarveld-syvennys) ilman kehystä: sama muoto kuin BbLhAukko laji 4 omalla
        /// värillään. 6 kolmiota.</summary>
        static void BbLhAukkoMuoto(Rakentaja r, Vector3 p, Vector3 ulos, float lev, float kork, Color vari)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            float w = lev * 0.5f, ka = Mathf.Min(lev * 0.866f, kork * 0.6f), sy = ka / (lev * 0.866f), ys = kork - ka;
            Vector3 P(float xx, float y) => p + t * xx + Vector3.up * y;
            Vector3 K(float puoli, float th) => P(puoli * (lev * Mathf.Cos(th) - w), ys + lev * Mathf.Sin(th) * sy);
            r.NelioUlos(P(-w, 0f), P(w, 0f), P(w, ys), P(-w, ys), n, vari);
            var M = P(0f, ys);
            foreach (float puoli in new[] { -1f, 1f })
                for (int k = 0; k < 2; k++)
                    r.KolmioUlos(M, K(puoli, Mathf.PI / 6f * k), K(puoli, Mathf.PI / 6f * (k + 1)), n, vari);
        }

        /// <summary>Flaamilainen ristikkoikkuna julkisivussa (etelä): tumma ruutu 0,0015 ja vaalea pysty- ja välipuite 0,0021 pinnan
        /// edessä; keskipiste p julkisivun tasossa. 6 kolmiota.</summary>
        static void BbLhRistikkoikkuna(Rakentaja r, Vector3 p, float lev, float kork)
        {
            r.Laatta(p, Vector3.back, lev, kork, BbAukko);
            var q = p + Vector3.back * 0.0021f;
            float m = 0.0014f, w = lev * 0.5f, yt = kork * 0.12f;
            r.NelioUlos(q + new Vector3(-m, -kork * 0.5f, 0f), q + new Vector3(m, -kork * 0.5f, 0f), q + new Vector3(m, kork * 0.5f, 0f), q + new Vector3(-m, kork * 0.5f, 0f),
                Vector3.back, BbKivireuna);
            r.NelioUlos(q + new Vector3(-w, yt - m, 0f), q + new Vector3(w, yt - m, 0f), q + new Vector3(w, yt + m, 0f), q + new Vector3(-w, yt + m, 0f),
                Vector3.back, BbKivireuna);
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
            new Erikoismalli { Runko = BruggenKellotorniRunko, Osat = BruggenKellotorniOsat, Lahi = BruggenKellotorniLahi, Kolmiot0 = 1043, KokoKerroin = 1.5f });
    }
}
