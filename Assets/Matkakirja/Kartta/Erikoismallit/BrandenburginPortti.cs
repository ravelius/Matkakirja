using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI BRANDENBURGIN PORTTI (speksi docs/raportit/erikoismallit/brandenburgin-portti.md, omistajan jono 27.9.
    /// klo 01.4x). Berliinin maamerkki (Kaupunki = "berliini", nosto ei ole pääkartalla kuten Colosseum).
    /// Tunnistus sekunnissa: kaksi kuuden doorilaisen pylvään riviä (itä ja länsi), viisi kulkuaukkoa, joista keskimmäinen
    /// levein, raskas palkisto ja porrastettu attika, jonka päällä tumma kvadriga (neljä hevosta ja Victoria) itään päin;
    /// sivuilla matalat vartiohuoneet pylväikköineen. Mittakaava 1,0 = 70 m (leveys sivusiipineen 65,5 m → 0,94),
    /// pystyliioittelu 1,25. SUUNTA TYYLITELTY: todellisuudessa julkisivu ja kvadriga ovat itään (Pariser Platz), mutta
    /// kallistettu kamera katsoo etelästä, joten julkisivu käännetään etelään (−Z) ja leveys itä–länteen (X); muuten portti
    /// näkyisi kallistettuna päädystä.
    /// Liikkuvat osat:
    ///   vaunut          hevosvaunut ajavat aukiolta (etelä) keskiaukon läpi pohjoiseen ja takaisin (perusliike)
    ///   ilotulitus0–2   uudenvuoden ilotulitus portin yllä (harvinainen ja napautus)
    ///   valot           yöllä valaistut kulkuaukot ja kvadriga
    /// </summary>
    public sealed partial class Symbolimallit
    {
        const float BpPylvas = 0.25f, BpPalkki = 0.045f, BpSyvyys = 0.079f, BpPylvasZ = 0.068f;
        /// <summary>Pylväiden (ja niiden takaisten väliseinien) paikat X-akselilla: keskiaukko 0,104, muut 0,074.</summary>
        static readonly float[] BpPylvaatX = { -0.23f, -0.156f, -0.052f, 0.052f, 0.156f, 0.23f };
        static readonly Color BpKivi = Hex(0xe4d8bc), BpKiviVarjo = Hex(0xcdbf9f), BpPronssi = Hex(0x5c4a36), BpAukko = Hex(0x6b5840);

        static Mesh BrandenburginPorttiRunko()
        {
            var r = new Rakentaja();
            // Portti yhtenä ääriviivaosana: väliseinät, pylväät, palkisto ja attika.
            r.AloitaOsa();
            foreach (float x in BpPylvaatX)
            {
                // Väliseinä (pylväiden välissä etelä–pohjoinen) ja kummankin julkisivun pylväs.
                r.Laatikko(new Vector3(x, 0f, 0f), new Vector3(0.03f, BpPylvas, BpPylvasZ * 2f), BpKiviVarjo, BpKivi);
                foreach (float z in new[] { -BpPylvasZ, BpPylvasZ })
                {
                    r.Pylvas(new Vector3(x, 0f, z), 0.0135f, BpPylvas, 8, BpKivi);
                    r.Laatikko(new Vector3(x, BpPylvas - 0.008f, z), new Vector3(0.034f, 0.008f, 0.034f), BpKivi, BpKivi);
                }
            }
            // Palkisto (arkkitraavi, triglyfifriisi, reunalista) koko portin yli ja porrastettu attika keskellä.
            r.Laatikko(new Vector3(0f, BpPylvas, 0f), new Vector3(0.5f, BpPalkki, BpSyvyys * 2f + 0.012f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, BpPylvas + BpPalkki, 0f), new Vector3(0.46f, 0.02f, BpSyvyys * 2f - 0.01f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, BpPylvas + BpPalkki + 0.02f, 0f), new Vector3(0.2f, 0.022f, BpSyvyys * 1.5f), BpKivi, BpKivi);
            r.LopetaOsa();
            // Kulkuaukkojen varjo julkisivuissa (pylväiden välissä, muste-seepia), ei omaa ääriviivaa.
            for (int i = 0; i + 1 < BpPylvaatX.Length; i++)
            {
                float x = (BpPylvaatX[i] + BpPylvaatX[i + 1]) * 0.5f, lev = BpPylvaatX[i + 1] - BpPylvaatX[i] - 0.034f;
                foreach (float z in new[] { -BpSyvyys, BpSyvyys })
                    r.Laatta(new Vector3(x, BpPylvas * 0.5f, z * 0.55f), new Vector3(0f, 0f, Mathf.Sign(z)), lev, BpPylvas, BpAukko);
            }
            // Kvadriga attikan päällä julkisivun suuntaan (etelä): neljä hevosta rinnakkain, vaunu ja Victoria sauvoineen.
            float y = BpPylvas + BpPalkki + 0.042f;
            r.AloitaOsa();
            for (int h = 0; h < 4; h++)
            {
                float x = -0.036f + h * 0.024f;
                r.Laatikko(new Vector3(x, y + 0.014f, -0.012f), new Vector3(0.014f, 0.022f, 0.05f), BpPronssi, BpPronssi);   // runko
                r.Laatikko(new Vector3(x, y + 0.03f, -0.042f), new Vector3(0.011f, 0.03f, 0.014f), BpPronssi, BpPronssi);    // kaula ja pää
                r.Laatikko(new Vector3(x, y, -0.012f), new Vector3(0.008f, 0.014f, 0.04f), BpPronssi, BpPronssi);            // jalat
            }
            r.Laatikko(new Vector3(0f, y, 0.028f), new Vector3(0.05f, 0.03f, 0.03f), BpPronssi, BpPronssi);                 // vaunu
            r.Timantti(new Vector3(0f, y + 0.062f, 0.03f), 0.011f, 0.032f, BpPronssi, 4);                                   // Victoria
            r.Laatikko(new Vector3(0.016f, y + 0.03f, 0.02f), new Vector3(0.004f, 0.075f, 0.004f), BpPronssi, BpPronssi);  // sauva
            r.Timantti(new Vector3(0.016f, y + 0.11f, 0.02f), 0.012f, 0.012f, BpPronssi, 6);                                // seppele
            r.LopetaOsa();
            // Vartiohuoneet sivuilla: matala kivitalo ja neljän pylvään portiikki aukiolle päin (etelään ja pohjoiseen).
            foreach (float s in new[] { -1f, 1f })
            {
                var p = new Vector3(s * 0.36f, 0f, 0f);
                r.AloitaOsa();
                r.Laatikko(p, new Vector3(0.1f, 0.13f, 0.1f), BpKiviVarjo, BpKivi);
                r.HarjaZ(p + Vector3.up * 0.13f, new Vector3(0.1f, 0.035f, 0.12f), EmKatto, BpKivi);
                foreach (float z in new[] { -0.066f, 0.066f })
                    foreach (float dx in new[] { -0.03f, 0.03f })
                        r.Pylvas(p + new Vector3(dx, 0f, z), 0.008f, 0.12f, 6, BpKivi);
                r.LopetaOsa();
                // Matala muuri portista vartiohuoneeseen.
                r.Seina(new Vector3(s * 0.26f, 0f, 0f), new Vector3(s * 0.31f, 0f, 0f), 0.07f, 0.05f, BpKiviVarjo, BpKivi);
            }
            return r.Verkko("BrandenburginPortti");
        }

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: triglyfien urat, metopit, reliefikentän pohja, ikkunat ja ovet, kulkuaukon
        /// syvin varjo, katon räystäskaista, kattolaattojen saumat ja kulkuaukon lattia. Ominaisuuksina, koska Em-paletti on toisessa tiedostossa
        /// (staattisten kenttien alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color BpLUra => Color.Lerp(BpKiviVarjo, BpAukko, 0.6f);
        static Color BpLMetopi => Color.Lerp(BpKivi, BpKiviVarjo, 0.55f);
        static Color BpLKentta => Color.Lerp(BpKiviVarjo, BpAukko, 0.3f);
        static Color BpLIkkuna => Color.Lerp(BpAukko, EmMuste, 0.4f);
        static Color BpLSyva => Color.Lerp(BpAukko, EmMuste, 0.45f);
        static Color BpLRaystas => Color.Lerp(EmKatto, EmPaperi, 0.35f);
        static Color BpLSauma => Color.Lerp(BpKivi, BpKiviVarjo, 0.75f);
        static Color BpLLattia => Color.Lerp(BpKiviVarjo, BpAukko, 0.55f);

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (portti, kvadriga, kaksi vartiohuonetta; kulkuaukkojen varjot ja muurit omina pieninä osinaan) ja osien pivotit kuin
        /// rungossa, noin 2,8 × kolmiot lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; vaunut, ilotulitus ja valot pysyvät
        /// ennallaan (kulkuaukkojen varjot rungon paikoilla, joten yövalot osuvat niihin).
        ///   pylväät    kaksitoista uurrettua ja hieman kapenevaa doorilaista pylvästä jalkalaattoineen, echinus ja abakus
        ///   palkisto   arkkitraavi, taenia-lista, friisi, jossa triglyfit uurteineen pylväiden kohdalla ja niiden välissä
        ///              (metopit syvemmällä), sekä ulkoneva reunalista
        ///   attika     alaporras kattolistoineen ja paneeleineen, attika jalka- ja kattolistoineen; etupuolella reliefikenttä
        ///              (Rauhan kulkue), katolla laattasaumat
        ///   kvadriga   neljä hevosta (runko, kaareva kaula, pää, jalkaparit ja häntä; uloimmat päät hieman ulospäin ja etujalka
        ///              koholla), vaunu pyörineen ja Victoria mekkoineen, siipineen ja sauvaa pitelevine käsivarsineen; sauvassa
        ///              tammiseppele, risti ja kotka
        ///   aukot      rungon varjolaatat samoilla paikoilla, yläosassa syvempi varjo holvin alla, varjoinen lattia ja vaalea
        ///              kynnyskivi julkisivun linjassa
        ///   sivut      vartiohuoneiden pylväiköt palkkeineen, räystäskaistainen katto, kolmiopäädyn kenttä ja akroteri, ovi
        ///              kehyksineen, sivuikkunat ja kattolista; matalissa muureissa kansikivet ja paneelit
        /// </summary>
        static Mesh BrandenburginPorttiLahi()
        {
            var r = new Rakentaja();
            // 1. Portti yhtenä ääriviivaosana kuten rungossa: väliseinät, pylväät, palkisto ja porrastettu attika.
            r.AloitaOsa();
            foreach (float x in BpPylvaatX)
            {
                r.Laatikko(new Vector3(x, 0f, 0f), new Vector3(0.03f, BpPylvas, BpPylvasZ * 2f), BpKiviVarjo, BpKivi);
                foreach (float z in new[] { -BpPylvasZ, BpPylvasZ })
                    BpLPylvas(r, new Vector3(x, 0f, z), 0.0135f, BpPylvas, 8, 0.0355f, true);
            }
            // Palkisto rungon palkin mitoissa (0,25–0,295): arkkitraavi, taenia, friisi (metopien taso) ja reunalista.
            float y = BpPylvas;
            r.Laatikko(new Vector3(0f, y, 0f), new Vector3(0.49f, 0.017f, 0.165f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.017f, 0f), new Vector3(0.494f, 0.0035f, 0.169f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.0205f, 0f), new Vector3(0.486f, 0.0145f, BpLFriisiZ * 2f), BpLMetopi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.035f, 0f), new Vector3(0.5f, BpPalkki - 0.035f, BpSyvyys * 2f + 0.012f), BpKivi, BpKivi);
            // Attikan alaporras (rungon 0,295–0,315) kattolistoineen ja attika (0,315–0,337) jalka- ja kattolistoineen.
            y = BpPylvas + BpPalkki;
            r.Laatikko(new Vector3(0f, y, 0f), new Vector3(0.456f, 0.0165f, BpSyvyys * 2f - 0.014f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.0165f, 0f), new Vector3(0.46f, 0.0035f, BpSyvyys * 2f - 0.01f), BpKivi, BpKivi);
            y += 0.02f;
            r.Laatikko(new Vector3(0f, y, 0f), new Vector3(0.2f, 0.004f, BpSyvyys * 1.5f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.004f, 0f), new Vector3(0.194f, 0.0145f, BpSyvyys * 1.5f - 0.006f), BpKivi, BpKivi);
            r.Laatikko(new Vector3(0f, y + 0.0185f, 0f), new Vector3(0.2f, 0.0035f, BpSyvyys * 1.5f), BpKivi, BpKivi);
            // Katon laattasaumat alaportaan tasanteilla (attikan sivuilla) ja attikan katolla; portin osassa, koska ne ovat
            // pitkiä (omina osinaan ne saisivat oman ääriviivan).
            foreach (float s in new[] { -1f, 1f })
                for (int i = 0; i < 4; i++)
                    BpLSaumaVaaka(r, new Vector3(s * (0.128f + i * 0.026f), y + 0.0004f, 0f), Vector3.forward, 0.0012f, BpSyvyys * 2f - 0.016f);
            foreach (float x in new[] { -0.066f, 0.066f })
                BpLSaumaVaaka(r, new Vector3(x, y + 0.022f + 0.0004f, 0f), Vector3.forward, 0.0012f, BpSyvyys * 1.5f - 0.004f);
            r.LopetaOsa();

            // Triglyfit friisissä (pienet osat, ei ääriviivaa): pylväiden kohdalla, kaksi sivuaukkojen ja kolme keskiaukon kohdalla;
            // uloimmat siirretty friisin kulmaan (doorilainen kulmatriglyfi). Etelässä urat, pohjoisessa ja päädyissä pelkkä kivi.
            var tx = new System.Collections.Generic.List<float>();
            for (int i = 0; i + 1 < BpPylvaatX.Length; i++)
            {
                float a = BpPylvaatX[i], b = BpPylvaatX[i + 1];
                int n = b - a > 0.09f ? 4 : 3;
                for (int j = 0; j < n; j++) tx.Add(Mathf.Lerp(a, b, j / (float)n));
            }
            tx.Add(BpPylvaatX[BpPylvaatX.Length - 1]);
            tx[0] = -0.2388f;
            tx[tx.Count - 1] = 0.2388f;
            float yf = BpPylvas + 0.0205f;
            foreach (float x in tx)
            {
                BpLTriglyfi(r, new Vector3(x, yf, -BpLFriisiZ), Vector3.back, true);
                BpLTriglyfi(r, new Vector3(x, yf, BpLFriisiZ), Vector3.forward, false);
            }
            foreach (float s in new[] { -1f, 1f })
                foreach (float z in new[] { -BpPylvasZ, 0f, BpPylvasZ })
                    BpLTriglyfi(r, new Vector3(s * 0.243f, yf, z), new Vector3(s, 0f, 0f), false);
            // Arkkitraavin saumat pylväiden kohdalla (etelä).
            foreach (float x in BpPylvaatX)
                r.Laatta(new Vector3(x, BpPylvas + 0.0085f, -0.0825f), Vector3.back, 0.0012f, 0.014f, BpLSauma);

            // Alaportaan paneelit sivuaukkojen kohdalla ja attikan reliefikenttä (Rauhan kulkue) etelässä; pohjoisessa tyhjä kenttä.
            float ya = BpPylvas + BpPalkki + 0.0085f;
            foreach (float s in new[] { -1f, 1f })
                foreach (float x in new[] { 0.128f, 0.19f })
                    foreach (float z in new[] { -1f, 1f })
                        r.Laatta(new Vector3(s * x, ya, z * (BpSyvyys - 0.007f)), new Vector3(0f, 0f, z), 0.044f, 0.0085f, BpLKentta);
            // Reliefikenttä neljänä lohkona (pieniä osia ilman omaa ääriviivaa).
            float yr = BpPylvas + BpPalkki + 0.02f + 0.0115f, zr = BpSyvyys * 0.75f - 0.003f;
            for (int j = 0; j < 4; j++)
            {
                float x = -0.0615f + j * 0.041f;
                r.Laatta(new Vector3(x, yr, -zr), Vector3.back, 0.041f, 0.0095f, BpLKentta);
                r.Laatta(new Vector3(x, yr, zr), Vector3.forward, 0.041f, 0.0095f, BpLKentta);
            }
            var kulkue = new (float x, float lev, float kork)[]
            {
                (-0.069f, 0.009f, 0.0075f), (-0.056f, 0.006f, 0.0085f), (-0.043f, 0.01f, 0.007f), (-0.028f, 0.006f, 0.0085f),
                (-0.013f, 0.008f, 0.008f), (0.004f, 0.012f, 0.0075f), (0.021f, 0.006f, 0.0085f), (0.036f, 0.009f, 0.007f),
                (0.051f, 0.006f, 0.0085f), (0.066f, 0.01f, 0.0075f),
            };
            foreach (var (x, lev, kork) in kulkue)
                BpLUlkonema(r, new Vector3(x, yr - 0.0045f, -zr - 0.0015f), Vector3.back, lev, kork, 0.0022f, BpKivi, BpKivi);

            // 2. Kulkuaukot: rungon varjolaatat samoilla paikoilla (yövalot osuvat niihin); yläosassa syvempi varjo holvin alla,
            // aukon lattia varjossa ja vaalea kynnyskivi julkisivun linjassa.
            for (int i = 0; i + 1 < BpPylvaatX.Length; i++)
            {
                float x = (BpPylvaatX[i] + BpPylvaatX[i + 1]) * 0.5f, lev = BpPylvaatX[i + 1] - BpPylvaatX[i] - 0.034f;
                foreach (float z in new[] { -BpSyvyys, BpSyvyys })
                {
                    float sz = Mathf.Sign(z);
                    var n = new Vector3(0f, 0f, sz);
                    r.Laatta(new Vector3(x, BpPylvas * 0.34f, z * 0.55f), n, lev, BpPylvas * 0.68f, BpAukko);
                    r.Laatta(new Vector3(x, BpPylvas * 0.84f, z * 0.55f), n, lev, BpPylvas * 0.32f, BpLSyva);
                    // Lattia ja kynnys pieninä osina (keskiaukossa kahtena puolikkaana), ettei niille tule omaa ääriviivaa.
                    float l = BpPylvaatX[i + 1] - BpPylvaatX[i] - 0.03f, z0 = z * 0.55f + sz * 0.0015f, z1 = sz * 0.0745f, z2 = sz * 0.0815f;
                    int osia = l > 0.06f ? 2 : 1;
                    for (int j = 0; j < osia; j++)
                    {
                        float xa = x - l * 0.5f + l * j / osia, xb = xa + l / osia;
                        r.NelioUlos(new Vector3(xa, 0.0008f, z0), new Vector3(xb, 0.0008f, z0), new Vector3(xb, 0.0008f, z1),
                            new Vector3(xa, 0.0008f, z1), Vector3.up, BpLLattia);
                        r.NelioUlos(new Vector3(xa, 0.0012f, z1), new Vector3(xb, 0.0012f, z1), new Vector3(xb, 0.0012f, z2),
                            new Vector3(xa, 0.0012f, z2), Vector3.up, BpKiviVarjo);
                    }
                }
            }

            // 3. Kvadriga attikan päällä julkisivun suuntaan (etelä), yksi ääriviivaosa kuten rungossa.
            BpLKvadriga(r, BpPylvas + BpPalkki + 0.042f);

            // 4. Vartiohuoneet (omat ääriviivaosat kuten rungossa) ja matalat muurit portista vartiohuoneeseen.
            foreach (float s in new[] { -1f, 1f })
            {
                var p = new Vector3(s * 0.36f, 0f, 0f);
                r.AloitaOsa();
                r.Laatikko(p, new Vector3(0.1f, 0.13f, 0.1f), BpKiviVarjo, BpKivi);
                r.Laatikko(p + Vector3.up * 0.121f, new Vector3(0.104f, 0.009f, 0.104f), BpKivi, BpKivi);
                r.HarjaRaystas(p + Vector3.up * 0.13f, new Vector3(0.1f, 0.035f, 0.12f), false, EmKatto, BpLRaystas, BpKivi, 0.16f);
                foreach (float z in new[] { -0.066f, 0.066f })
                {
                    foreach (float dx in new[] { -0.03f, 0.03f })
                        BpLPylvas(r, p + new Vector3(dx, 0f, z), 0.008f, 0.12f, 6, 0.021f, false);
                    r.Laatikko(p + new Vector3(0f, 0.12f, z * 0.955f), new Vector3(0.082f, 0.0095f, 0.023f), BpKivi, BpKivi);
                    // Akroteri päädyn huipulla.
                    r.Kartio(p + new Vector3(0f, 0.163f, Mathf.Sign(z) * 0.058f), 0.0045f, 0.011f, 4, BpKivi);
                }
                r.LopetaOsa();
                foreach (float z in new[] { -1f, 1f })
                {
                    var n = new Vector3(0f, 0f, z);
                    // Päätykolmion kenttä (tympanon) ja ovi kehyksineen ja otsalistoineen pylväikön takana.
                    r.KolmioUlos(p + new Vector3(-0.034f, 0.1357f, z * 0.0612f), p + new Vector3(0.034f, 0.1357f, z * 0.0612f),
                        p + new Vector3(0f, 0.1575f, z * 0.0612f), n, BpLKentta);
                    r.Laatta(p + new Vector3(0f, 0.031f, z * 0.05f), n, 0.027f, 0.062f, BpKivi);
                    r.Laatta(p + new Vector3(0f, 0.027f, z * 0.0503f), n, 0.018f, 0.054f, BpLIkkuna);
                    BpLUlkonema(r, p + new Vector3(0f, 0.062f, z * 0.05f), n, 0.031f, 0.004f, 0.003f, BpKivi, BpKivi);
                }
                // Sivuikkunat: kaksi ulkosivulla, yksi muurin yllä portin puolella; kehys ja vaalea ikkunalauta.
                foreach (float z in new[] { -0.024f, 0.024f })
                    BpLIkkunaKehys(r, p + new Vector3(s * 0.05f, 0.075f, z), new Vector3(s, 0f, 0f), 0.014f, 0.026f);
                BpLIkkunaKehys(r, p + new Vector3(-s * 0.05f, 0.098f, 0f), new Vector3(-s, 0f, 0f), 0.014f, 0.02f);
                // Matala muuri portista vartiohuoneeseen: rungon muuri, kansikivi ja upotettu paneeli kummallakin puolella.
                r.Seina(new Vector3(s * 0.26f, 0f, 0f), new Vector3(s * 0.31f, 0f, 0f), 0.07f, 0.05f, BpKiviVarjo, BpKivi);
                r.Laatikko(new Vector3(s * 0.285f, 0.066f, 0f), new Vector3(0.05f, 0.0055f, 0.056f), BpKivi, BpKivi);
                foreach (float z in new[] { -1f, 1f })
                    r.Laatta(new Vector3(s * 0.285f, 0.034f, z * 0.025f), new Vector3(0f, 0f, z), 0.03f, 0.036f, BpLKentta);
            }
            return r.Verkko("BrandenburginPortti-lahi");
        }

        /// <summary>Friisin (metopien) puolisyvyys: triglyfit ulkonevat siitä taenian tasolle.</summary>
        const float BpLFriisiZ = 0.0805f;

        /// <summary>
        /// Lähitason doorilainen pylväs rungon pylvään paikalla (rungossa kahdeksankulmainen varsi ja laatikkokapiteeli):
        /// neliölaatta jalkana (jalka = true), uurrettu ja hieman kapeneva varsi (n uurretta), levenevä echinus ja abakus rungon
        /// kapiteelin kohdalla (leveys abakus). Portin pylväs 68 kolmiota, vartiohuoneen 50.
        /// </summary>
        static void BpLPylvas(Rakentaja r, Vector3 p, float sade, float kork, int uurteita, float abakus, bool jalka)
        {
            float yj = jalka ? 0.006f : 0f, yA = kork - abakus * 0.2f, yE = yA - sade * 0.37f;
            if (jalka) r.Laatikko(p, new Vector3(sade * 2.4f, yj, sade * 2.4f), BpKivi, BpKivi);
            BpLUurrettu(r, p + Vector3.up * yj, sade, sade * 0.9f, yE - yj, uurteita, BpKivi);
            r.Vaippa(p + Vector3.up * yE, sade * 0.9f, sade * 1.22f, yA - yE, 8, BpKivi, Mathf.PI / 8f);
            r.Laatikko(p + Vector3.up * yA, new Vector3(abakus, kork - yA, abakus), BpKivi, BpKivi);
        }

        /// <summary>Uurrettu pylvään varsi: 2n tahkoa, joiden kärjet vuorottelevat särmän (säde) ja uurteen pohjan (0,86 × säde)
        /// välillä, joten valo piirtää uurteet vuorottelevina juovina; särmä etelään. Kapenee säteestä r0 säteeseen r1. Ei kansia
        /// (jalka ja kapiteeli peittävät). 4n kolmiota.</summary>
        static void BpLUurrettu(Rakentaja r, Vector3 p, float r0, float r1, float h, int n, Color vari)
        {
            var yla = Vector3.up * h;
            var keski = p + yla * 0.5f;
            Vector3 K(int i, float rr, float yy)
            {
                float a = i * Mathf.PI / n - Mathf.PI * 0.5f, k = i % 2 == 0 ? 1f : 0.86f;
                return p + new Vector3(Mathf.Cos(a) * rr * k, yy, Mathf.Sin(a) * rr * k);
            }
            for (int i = 0; i < 2 * n; i++)
                r.NelioKeskelta(K(i, r0, 0f), K(i + 1, r0, 0f), K(i + 1, r1, h), K(i, r1, h), keski, vari);
        }

        /// <summary>Triglyfi friisissä: taenian tasolle ulkoneva kivi (etupinta ja valoa saava yläpinta), etelässä kaksi tummaa
        /// uraa. Keskipohja p metopien pinnassa, ulospäin n. 4 tai 8 kolmiota, pieni osa.</summary>
        static void BpLTriglyfi(Rakentaja r, Vector3 p, Vector3 n, bool urat)
        {
            const float lev = 0.0085f, kork = 0.0145f;
            BpLUlkonema(r, p, n, lev, kork, 0.0032f, BpKivi, BpKivi);
            if (!urat) return;
            var t = Vector3.Cross(Vector3.up, n).normalized;
            var q = p + n * 0.0032f + Vector3.up * (kork * 0.45f);
            foreach (float j in new[] { -0.17f, 0.17f })
                r.Laatta(q + t * (lev * j) - n * 0.0011f, n, 0.0014f, kork * 0.8f, BpLUra);
        }

        /// <summary>Seinästä ulkoneva matala laatta (triglyfi, reliefihahmo, otsalista, ikkunalauta): etupinta ja yläpinta;
        /// keskipohja p seinän pinnassa, ulospäin n, leveys, korkeus ja ulkonema. 4 kolmiota, pieni osa.</summary>
        static void BpLUlkonema(Rakentaja r, Vector3 p, Vector3 n, float lev, float kork, float ulk, Color etu, Color yla)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n) * (lev * 0.5f);
            Vector3 e = n * ulk, y = Vector3.up * kork;
            r.AloitaOsa();
            r.NelioUlos(p - t + e, p + t + e, p + t + e + y, p - t + e + y, n, etu);
            r.NelioUlos(p - t + y, p + t + y, p + t + e + y, p - t + e + y, Vector3.up, yla);
            r.LopetaOsa();
        }

        /// <summary>Vaakapinnan sauma (kattolaatat): kapea nauha keskipisteestä p suuntaan d molempiin suuntiin (pituus), 2 kolmiota.</summary>
        static void BpLSaumaVaaka(Rakentaja r, Vector3 p, Vector3 d, float lev, float pituus)
        {
            var s = Vector3.Cross(Vector3.up, d).normalized * (lev * 0.5f);
            var l = d.normalized * (pituus * 0.5f);
            r.NelioUlos(p - l - s, p + l - s, p + l + s, p - l + s, Vector3.up, BpLSauma);
        }

        /// <summary>Ikkuna vaalealla kehyksellä ja ikkunalaudalla: keskipiste p seinän pinnassa, ulospäin n. 8 kolmiota.</summary>
        static void BpLIkkunaKehys(Rakentaja r, Vector3 p, Vector3 n, float lev, float kork)
        {
            r.Laatta(p, n, lev + 0.005f, kork + 0.005f, BpKivi);
            r.Laatta(p + n * 0.0003f, n, lev, kork, BpLIkkuna);
            BpLUlkonema(r, p - Vector3.up * (kork * 0.5f + 0.0045f), n, lev + 0.008f, 0.002f, 0.0035f, BpKivi, BpKivi);
        }

        /// <summary>Kupera kuusitahkoinen kappale kahdeksasta kärjestä k[x + 2y + 4z] (x, y, z ∈ {0, 1}; 0 = −, 1 = +):
        /// tahkot ulospäin keskipisteestä, pohja (−y) vain pyydettäessä. 10 tai 12 kolmiota.</summary>
        static void BpLKappale(Rakentaja r, Vector3[] k, Color vari, bool pohja = false)
        {
            var c = Vector3.zero;
            foreach (var v in k) c += v;
            c /= 8f;
            r.NelioKeskelta(k[0], k[2], k[6], k[4], c, vari);
            r.NelioKeskelta(k[1], k[3], k[7], k[5], c, vari);
            r.NelioKeskelta(k[2], k[3], k[7], k[6], c, vari);
            r.NelioKeskelta(k[0], k[1], k[3], k[2], c, vari);
            r.NelioKeskelta(k[4], k[5], k[7], k[6], c, vari);
            if (pohja) r.NelioKeskelta(k[0], k[1], k[5], k[4], c, vari);
        }

        /// <summary>Kappale kahden pystyn poikkileikkauksen välillä: takaleikkaus (keskipohja a, puolileveys wa, korkeus ha) ja
        /// etuleikkaus (b, wb, hb); leveys x-akselilla. Hevosen runko, kaula, pää ja jalat; alapinta (pohja) vain, kun se
        /// näkyy kameralle (nouseva kaula). 10 tai 12 kolmiota.</summary>
        static void BpLJakso(Rakentaja r, Vector3 a, float wa, float ha, Vector3 b, float wb, float hb, Color vari, bool pohja = false)
        {
            var k = new Vector3[8];
            for (int i = 0; i < 8; i++)
            {
                bool etu = (i & 4) != 0, yla = (i & 2) != 0;
                var c = etu ? b : a;
                float w = etu ? wb : wa, h = etu ? hb : ha;
                k[i] = c + new Vector3((i & 1) == 0 ? -w : w, yla ? h : 0f, 0f);
            }
            BpLKappale(r, k, vari, pohja);
        }

        /// <summary>Suora palkki pisteestä a pisteeseen b (käsivarsi): poikkileikkaus leveys × korkeus, korkeus pystytason suuntaan.
        /// 12 kolmiota.</summary>
        static void BpLPalkki(Rakentaja r, Vector3 a, Vector3 b, float lev, float kork, Color vari)
        {
            var d = (b - a).normalized;
            var s = Vector3.Cross(d, Vector3.up).normalized * (lev * 0.5f);
            var u = Vector3.Cross(s, d).normalized * (kork * 0.5f);
            var k = new Vector3[8];
            for (int i = 0; i < 8; i++)
                k[i] = ((i & 4) == 0 ? a : b) + ((i & 1) == 0 ? -s : s) + ((i & 2) == 0 ? -u : u);
            BpLKappale(r, k, vari, true);
        }

        /// <summary>
        /// Lähitason kvadriga rungon kvadrigan paikalla (attikan katto y, julkisivun suunta etelä −Z), yksi ääriviivaosa: neljä
        /// hevosta rinnakkain (runko, kaareva kaula, pää, etu- ja takajalkapari sekä häntä; uloimmat päät kääntyvät hieman
        /// ulospäin ja nostavat etujalkaa), vaunu pyörineen ja Victoria (mekko, vartalo, pää, siivet ja sauvaa kohottava
        /// käsivarsi); sauvan päässä tammiseppele, jonka sisällä risti ja päällä kotka.
        /// </summary>
        static void BpLKvadriga(Rakentaja r, float y)
        {
            var c = BpPronssi;
            r.AloitaOsa();
            for (int h = 0; h < 4; h++)
            {
                float x = -0.036f + h * 0.024f;
                float kaanto = h == 0 ? -0.004f : h == 3 ? 0.004f : 0f;
                float nosto = h == 1 || h == 2 ? 0.004f : 0f;
                // Runko kahtena jaksona: kapeampi lanne takana, leveä keskivartalo ja rinta edessä.
                BpLJakso(r, new Vector3(x, y + 0.018f, 0.014f), 0.005f, 0.016f, new Vector3(x, y + 0.015f, -0.006f), 0.0066f, 0.021f, c);
                BpLJakso(r, new Vector3(x, y + 0.015f, -0.006f), 0.0066f, 0.021f, new Vector3(x, y + 0.013f, -0.03f), 0.006f, 0.023f, c);
                // Kaula rinnasta ylös ja eteen (kaari), pää niskasta alas ja eteen turpaan.
                BpLJakso(r, new Vector3(x, y + 0.024f, -0.024f), 0.0046f, 0.014f, new Vector3(x + kaanto * 0.6f, y + 0.05f + nosto, -0.039f), 0.0032f, 0.01f, c, true);
                BpLJakso(r, new Vector3(x + kaanto * 0.6f, y + 0.051f + nosto, -0.038f), 0.0034f, 0.011f, new Vector3(x + kaanto, y + 0.041f + nosto, -0.051f), 0.0025f, 0.007f, c);
                // Jalkaparit (uloimmilla etujalka koholla) ja häntä.
                BpLJakso(r, new Vector3(x, y, -0.021f), 0.0042f, 0.017f, new Vector3(x, y + (h == 0 || h == 3 ? 0.004f : 0f), -0.029f), 0.0042f, 0.016f, c);
                BpLJakso(r, new Vector3(x, y, 0.009f), 0.0042f, 0.019f, new Vector3(x, y, 0.001f), 0.0042f, 0.02f, c);
                r.KalvoKolmio(new Vector3(x - 0.0015f, y + 0.033f, 0.012f), new Vector3(x + 0.0015f, y + 0.033f, 0.012f), new Vector3(x, y + 0.014f, 0.02f), c);
            }
            // Vaunu: kaareva etukaide (leveämpi ylhäältä) ja pyörät sivuilla.
            var k = new Vector3[8];
            for (int i = 0; i < 8; i++)
            {
                bool etu = (i & 4) == 0, yla = (i & 2) != 0;
                float w = yla ? 0.02f : 0.016f;
                k[i] = new Vector3((i & 1) == 0 ? -w : w, y + (yla ? 0.03f : 0.004f), etu ? (yla ? 0.012f : 0.017f) : 0.041f);
            }
            BpLKappale(r, k, c);
            foreach (float s in new[] { -1f, 1f })
                for (int i = 0; i < 6; i++)
                {
                    float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                    var m = new Vector3(s * 0.0215f, y + 0.012f, 0.032f);
                    r.KolmioUlos(m, m + new Vector3(0f, Mathf.Sin(a0), Mathf.Cos(a0)) * 0.012f, m + new Vector3(0f, Mathf.Sin(a1), Mathf.Cos(a1)) * 0.012f,
                        new Vector3(s, 0f, 0f), c);
                }
            // Victoria: mekko, vartalo, hartiat, pää, siivet ja oikea käsivarsi sauvalle.
            var v = new Vector3(0f, y + 0.02f, 0.03f);
            r.Vaippa(v, 0.0085f, 0.0052f, 0.042f, 6, c, Mathf.PI / 6f);
            r.Vaippa(v + Vector3.up * 0.042f, 0.0052f, 0.0062f, 0.01f, 6, c, Mathf.PI / 6f);
            for (int i = 0; i < 6; i++)
            {
                float a0 = Mathf.PI / 6f + i * Mathf.PI / 3f, a1 = a0 + Mathf.PI / 3f;
                var q = v + Vector3.up * 0.052f;
                r.KolmioUlos(q, q + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * 0.0062f, q + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * 0.0062f, Vector3.up, c);
            }
            r.Timantti(v + Vector3.up * 0.0585f, 0.0038f, 0.005f, c, 4);
            // Siivet selästä ylös ja ulos: leveä sulkapinta kahtena lohkona, kärki pää korkeammalla.
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 j0 = v + new Vector3(s * 0.0025f, 0.044f, 0.006f), j1 = v + new Vector3(s * 0.0025f, 0.056f, 0.005f);
                Vector3 m0 = v + new Vector3(s * 0.0108f, 0.053f, 0.009f), m1 = v + new Vector3(s * 0.0098f, 0.078f, 0.009f);
                Vector3 k0 = v + new Vector3(s * 0.0192f, 0.065f, 0.012f), k1 = v + new Vector3(s * 0.0165f, 0.088f, 0.011f);
                r.Kalvo(j0, j1, m1, m0, c);
                r.Kalvo(m0, m1, k1, k0, c);
            }
            BpLPalkki(r, v + new Vector3(0.005f, 0.049f, -0.001f), new Vector3(0.0155f, y + 0.074f, 0.0205f), 0.0036f, 0.0032f, c);
            // Sauva ja sen päässä tammiseppele (etelään päin), risti ja kotka.
            r.Laatikko(new Vector3(0.016f, y + 0.03f, 0.02f), new Vector3(0.0035f, 0.075f, 0.0035f), c, c);
            var sp = new Vector3(0.016f, y + 0.11f, 0.02f);
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f), d1 = new Vector3(Mathf.Cos(a1), Mathf.Sin(a1), 0f);
                r.NelioUlos(sp + d0 * 0.0075f, sp + d1 * 0.0075f, sp + d1 * 0.0115f, sp + d0 * 0.0115f, Vector3.back, c);
                r.NelioUlos(sp + d0 * 0.0115f, sp + d1 * 0.0115f, sp + d1 * 0.0115f + Vector3.forward * 0.004f, sp + d0 * 0.0115f + Vector3.forward * 0.004f,
                    (d0 + d1) * 0.5f, c);
            }
            r.NelioUlos(sp + new Vector3(-0.0074f, -0.0012f, 0.0005f), sp + new Vector3(0.0074f, -0.0012f, 0.0005f), sp + new Vector3(0.0074f, 0.0012f, 0.0005f),
                sp + new Vector3(-0.0074f, 0.0012f, 0.0005f), Vector3.back, c);
            r.NelioUlos(sp + new Vector3(-0.0012f, -0.0074f, 0.0005f), sp + new Vector3(0.0012f, -0.0074f, 0.0005f), sp + new Vector3(0.0012f, 0.0074f, 0.0005f),
                sp + new Vector3(-0.0012f, 0.0074f, 0.0005f), Vector3.back, c);
            r.Timantti(sp + Vector3.up * 0.0148f, 0.0028f, 0.004f, c, 4);
            foreach (float s in new[] { -1f, 1f })
                r.KalvoKolmio(sp + new Vector3(s * 0.001f, 0.0165f, 0.001f), sp + new Vector3(s * 0.0065f, 0.0205f, 0.001f), sp + new Vector3(s * 0.0045f, 0.0128f, 0.001f), c);
            r.LopetaOsa();
        }

        /// <summary>Hevosvaunut (pivot maassa keskellä, kulkusuunta +Z eli pohjoiseen): hevonen edessä, vaunu takana.</summary>
        static Mesh BrandenburginPorttiVaunut()
        {
            // Liioiteltu noin 1,5-kertaiseksi (laite 27.9. klo 03.1x: vaunut erottuivat vain viivana).
            var r = new Rakentaja();
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, 0.018f, 0.033f), new Vector3(0.015f, 0.02f, 0.045f), EmMuste, EmMuste);   // hevonen
            r.Laatikko(new Vector3(0f, 0.033f, 0.06f), new Vector3(0.012f, 0.024f, 0.015f), EmMuste, EmMuste);  // pää
            r.Laatikko(new Vector3(0f, 0f, 0.033f), new Vector3(0.009f, 0.018f, 0.033f), EmMuste, EmMuste);     // jalat
            r.Laatikko(new Vector3(0f, 0.009f, -0.024f), new Vector3(0.033f, 0.033f, 0.05f), EmSeepia, EmKatto); // vaunu
            r.LopetaOsa();
            return r.Verkko("BrandenburginPortti-vaunut");
        }

        /// <summary>Ilotulituksen raketti: kahdeksan kultaista kipinää tähtenä (pivot keskellä), skaalautuu keskeltä auki.</summary>
        static Mesh BrandenburginPorttiIlotulitus()
        {
            var r = new Rakentaja();
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI / 4f;
                var d = new Vector3(Mathf.Cos(a), Mathf.Sin(a), Mathf.Sin(a + 1f) * 0.35f).normalized;
                r.Timantti(d * 0.05f, 0.006f, 0.006f, EmKulta, 4);
            }
            r.Timantti(Vector3.zero, 0.008f, 0.008f, EmVaahto, 4);
            return r.Verkko("BrandenburginPortti-ilotulitus");
        }

        /// <summary>Yövalot: kulkuaukot hehkuvat lämpiminä (valaistu portti) ja palkiston valonauha.</summary>
        static Mesh BrandenburginPorttiValot()
        {
            var r = new Rakentaja();
            for (int i = 0; i + 1 < BpPylvaatX.Length; i++)
            {
                float x = (BpPylvaatX[i] + BpPylvaatX[i + 1]) * 0.5f, lev = BpPylvaatX[i + 1] - BpPylvaatX[i] - 0.034f;
                foreach (float z in new[] { -BpSyvyys, BpSyvyys })
                    r.Laatta(new Vector3(x, BpPylvas * 0.45f, z * 0.56f), new Vector3(0f, 0f, Mathf.Sign(z)), lev * 0.9f, BpPylvas * 0.8f, EmIkkunavalo);
            }
            foreach (float z in new[] { -BpSyvyys, BpSyvyys })
                r.Laatta(new Vector3(0f, BpPylvas + BpPalkki * 0.5f, z * 1.01f), new Vector3(0f, 0f, Mathf.Sign(z)), 0.46f, BpPalkki * 0.5f, EmIkkunavalo);
            return r.Verkko("BrandenburginPortti-valot");
        }

        /// <summary>Ilotulituksen paikat portin yllä (keskellä ja sivuilla, eri korkeuksilla).</summary>
        static readonly Vector3[] BpRaketit = { new Vector3(-0.18f, 0.5f, 0f), new Vector3(0.04f, 0.56f, 0f), new Vector3(0.21f, 0.48f, 0f) };

        static LiikkuvaOsaMaaritys[] BrandenburginPorttiOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "vaunut", Verkko = BrandenburginPorttiVaunut, Pivot = new Vector3(0f, 0.002f, 0f), Liike = Liike.Liuku,
                Akseli = Vector3.forward, Laajuus = 0.36f, KayS = 12f, TaukoS = 30f },
            new LiikkuvaOsaMaaritys { Nimi = "ilotulitus0", Verkko = BrandenburginPorttiIlotulitus, Pivot = BpRaketit[0], Liike = Liike.Valahdys },
            new LiikkuvaOsaMaaritys { Nimi = "ilotulitus1", Verkko = BrandenburginPorttiIlotulitus, Pivot = BpRaketit[1], Liike = Liike.Valahdys },
            new LiikkuvaOsaMaaritys { Nimi = "ilotulitus2", Verkko = BrandenburginPorttiIlotulitus, Pivot = BpRaketit[2], Liike = Liike.Valahdys },
            new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = BrandenburginPorttiValot, Pivot = Vector3.zero, Liike = Liike.Valahdys },
        };

        static readonly bool brandenburginPortti = Rekisteroi("brandenburgin-portti",
            new Erikoismalli { Runko = BrandenburginPorttiRunko, Osat = BrandenburginPorttiOsat, Lahi = BrandenburginPorttiLahi, Kolmiot0 = 900, KokoKerroin = 1.5f, Kaupunki = "berliini" });
    }
}
