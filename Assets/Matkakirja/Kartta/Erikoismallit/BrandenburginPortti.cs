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

        /// <summary>Hevosvaunut (pivot maassa keskellä, kulkusuunta +Z eli pohjoiseen): hevonen edessä, vaunu takana.</summary>
        static Mesh BrandenburginPorttiVaunut()
        {
            var r = new Rakentaja();
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, 0.012f, 0.022f), new Vector3(0.01f, 0.014f, 0.03f), EmMuste, EmMuste);   // hevonen
            r.Laatikko(new Vector3(0f, 0.022f, 0.04f), new Vector3(0.008f, 0.016f, 0.01f), EmMuste, EmMuste);   // pää
            r.Laatikko(new Vector3(0f, 0f, 0.022f), new Vector3(0.006f, 0.012f, 0.022f), EmMuste, EmMuste);     // jalat
            r.Laatikko(new Vector3(0f, 0.006f, -0.016f), new Vector3(0.022f, 0.022f, 0.034f), EmSeepia, EmKatto); // vaunu
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
            new Erikoismalli { Runko = BrandenburginPorttiRunko, Osat = BrandenburginPorttiOsat, Kolmiot0 = 900, KokoKerroin = 1.5f, Kaupunki = "berliini" });
    }
}
