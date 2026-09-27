using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI KINDERDIJKIN MYLLYT (speksi docs/raportit/erikoismallit/kinderdijk.md, omistajan jono 27.9. klo 01.4x).
    /// Tunnistus sekunnissa: kaksi rinnakkaista kanavaa, joiden varrella tuulimyllyjen rivit (siipiristit), ja pohjoispäässä
    /// Wisboomin pumppaamo piippuineen. Mittakaava: 1,0 ≈ 1,2 km (rivit noin 1 km); myllyt liioiteltu noin
    /// kahdeksankertaisiksi, jotta siipiristit erottuvat 60 pt:ssä (runko 0,11, siipiväli 0,16). Rivi A kivimyllyt (pyöreä
    /// tiilirunko), rivi B ruokokattoiset kahdeksankulmaiset myllyt. Kaikki siivet tuulta vastaan lounaaseen.
    /// Liikkuvat osat:
    ///   siivet0–7   siipiristit pyörivät napansa ympäri (akseli lounaaseen): perusliike 1–3 myllyä kerrallaan, harvinainen
    ///               aalto kaikki kahdeksan rivin päästä päähän, lähestyttäessä ensimmäinen herää
    ///   valot       yöllä ikkunat ja valaistusviikon hehku myllyjen juurella
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Siipien suunta (tuulen tulosuunta lounas): siipiristin taso on kohtisuorassa tätä vastaan, ja siivet
        /// pyörivät tämän akselin ympäri. Sama vakio liikeytimessä (KinderdijkLiike.Akseli).</summary>
        static readonly Vector3 KdTuuli = new Vector3(-0.7071068f, 0f, -0.7071068f);
        const float KdRunko = 0.11f, KdNapa = 0.1f, KdSiipi = 0.08f, KdSiipiLeveys = 0.017f;

        /// <summary>Kanavat (Nederwaard länsi, Overwaard itä, rinnakkain kapean penkereen erottamina): alku (pohjoispää),
        /// suunta (atsimuutti pohjoisesta itään, tyylitelty) ja pituus.</summary>
        static readonly (Vector3 alku, float atsimuutti, float pituus)[] KdKanavat =
        {
            (new Vector3(-0.27f, 0f, 0.46f), 160f, 0.94f),
            (new Vector3(-0.05f, 0f, 0.46f), 160f, 0.94f),
        };

        static Vector3 KdSuunta(float atsimuutti)
        {
            float a = atsimuutti * Mathf.PI / 180f;
            return new Vector3(Mathf.Sin(a), 0f, Mathf.Cos(a));
        }

        /// <summary>Myllyn paikka: kanava k, järjestys i (0–3) pohjoisesta etelään; myllyt kanavan länsivarrella.</summary>
        static Vector3 KdMylly(int k, int i)
        {
            var (alku, atsimuutti, pituus) = KdKanavat[k];
            var d = KdSuunta(atsimuutti);
            var sivu = Vector3.Cross(Vector3.up, d).normalized;   // vasen = länsi, kun kanava kulkee etelään
            return alku + d * (0.16f + i * (pituus - 0.24f) / 3f) + sivu * 0.055f;
        }

        static readonly Color KdTiili = Hex(0x80634a), KdTiiliVaalea = Hex(0x9a7c5e), KdRuoko = Hex(0x958665), KdRuokoTumma = Hex(0x7c6e52);
        static readonly Color KdPuu = Hex(0x4a3b2b), KdPurje = Hex(0xf2ead8), KdPenger = Hex(0xd8c8a2), KdKaisla = Hex(0x8c9468);

        static Mesh KinderdijkRunko()
        {
            var r = new Rakentaja();
            // Kanavat vesikaistoina ja penkereet niiden molemmin puolin (ei pohjalevyä: pelto on kartta).
            foreach (var (alku, atsimuutti, pituus) in KdKanavat)
            {
                var d = KdSuunta(atsimuutti);
                var s = Vector3.Cross(Vector3.up, d).normalized;
                Vector3 a = alku + Vector3.up * 0.003f, b = alku + d * pituus + Vector3.up * 0.003f;
                r.AloitaOsa();
                r.NelioUlos(a - s * 0.022f, b - s * 0.022f, b + s * 0.022f, a + s * 0.022f, Vector3.up, EmVesi);
                r.LopetaOsa();
                foreach (float puoli in new[] { -1f, 1f })
                {
                    Vector3 p0 = a + s * (0.022f * puoli), p1 = b + s * (0.022f * puoli);
                    Vector3 q0 = a + s * (0.034f * puoli) + Vector3.up * 0.004f, q1 = b + s * (0.034f * puoli) + Vector3.up * 0.004f;
                    r.NelioUlos(p0, p1, q1, q0, Vector3.up, KdPenger);
                }
                // Kaislikkotupsuja kanavan reunoilla (ilman ääriviivaa, pienet).
                for (int i = 1; i < 6; i++)
                {
                    var p = alku + d * (pituus * i / 6f) + s * (i % 2 == 0 ? 0.026f : -0.026f);
                    r.Kartio(p, 0.008f, 0.012f, 4, KdKaisla);
                }
            }
            // Myllyt: rivi A kivimyllyt (pyöreä tiilirunko, pieni lakki), rivi B kahdeksankulmaiset ruokomyllyt (korkea lakki).
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 4; i++)
                {
                    var p = KdMylly(k, i);
                    r.AloitaOsa();
                    if (k == 0)
                    {
                        r.Vaippa(p, 0.027f, 0.018f, KdRunko, 10, i % 2 == 0 ? KdTiili : KdTiiliVaalea);
                        r.Kartio(p + Vector3.up * KdRunko, 0.022f, 0.026f, 8, KdRuokoTumma);
                    }
                    else
                    {
                        r.Laatikko(p, new Vector3(0.064f, 0.014f, 0.064f), KdTiili, KdTiili);   // tiilijalka
                        r.Vaippa(p + Vector3.up * 0.014f, 0.03f, 0.017f, KdRunko - 0.014f, 8, i % 2 == 0 ? KdRuoko : KdRuokoTumma, Mathf.PI / 8f);
                        r.Kartio(p + Vector3.up * KdRunko, 0.021f, 0.028f, 8, KdRuokoTumma);
                    }
                    // Akseli ja napa: lyhyt tumma palkki lakista siipien puolelle.
                    r.Laatikko(p + Vector3.up * (KdNapa - 0.005f) + KdTuuli * 0.021f, new Vector3(0.01f, 0.01f, 0.01f), KdPuu, KdPuu);
                    r.LopetaOsa();
                }
            // Wisboomin pumppaamo pohjoispäässä kanavien välissä: tiilihalli harjakatolla ja korkea piippu.
            var w = new Vector3(-0.16f, 0f, 0.52f);
            r.AloitaOsa();
            r.Laatikko(w, new Vector3(0.09f, 0.03f, 0.05f), KdTiili, KdTiili);
            r.Harja(w + Vector3.up * 0.03f, new Vector3(0.09f, 0.02f, 0.05f), EmKatto, KdTiili);
            r.Vaippa(w + new Vector3(0.056f, 0f, 0f), 0.009f, 0.006f, 0.1f, 6, KdTiiliVaalea);
            r.LopetaOsa();
            return r.Verkko("Kinderdijk");
        }

        /// <summary>
        /// Siipiristi pivot napassa: neljä siipeä siipitason (kohtisuorassa tuulta vastaan) suuntiin 0°, 90°, 180°, 270°
        /// (pystyristi = myllärin lepoasento). Siipi = tumma varsi ja purjekangas varren jättöreunalla, kaksipuolisina.
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
                Vector3 v0 = d * 0.004f, v1 = d * (KdSiipi + 0.004f), n = e * 0.0022f;
                r.Kalvo(v0 - n, v1 - n, v1 + n, v0 + n, KdPuu);
                Vector3 p0 = d * 0.012f + e * 0.0025f, p1 = d * KdSiipi + e * 0.0025f;
                r.Kalvo(p0, p1, p1 + e * KdSiipiLeveys, p0 + e * KdSiipiLeveys, KdPurje);
            }
            return r.Verkko("Kinderdijk-siivet");
        }

        /// <summary>Yövalot: lämmin ikkunaruutu jokaisen myllyn tuulen alapuolella ja valaistusviikon hehkulevy juurella.</summary>
        static Mesh KinderdijkValot()
        {
            var r = new Rakentaja();
            for (int k = 0; k < 2; k++)
                for (int i = 0; i < 4; i++)
                {
                    var p = KdMylly(k, i);
                    r.Laatta(p + Vector3.up * 0.05f - KdTuuli * 0.024f, -KdTuuli, 0.01f, 0.015f, EmIkkunavalo);
                    r.Kiekko(p + Vector3.up * 0.002f, 0.04f, 0.04f, 8, EmIkkunavalo);
                }
            return r.Verkko("Kinderdijk-valot");
        }

        static LiikkuvaOsaMaaritys[] KinderdijkOsat()
        {
            var osat = new LiikkuvaOsaMaaritys[9];
            for (int j = 0; j < 8; j++)
            {
                var p = KdMylly(j / 4, j % 4);
                osat[j] = new LiikkuvaOsaMaaritys { Nimi = "siivet" + j, Verkko = KinderdijkSiivet, Pivot = p + Vector3.up * KdNapa + KdTuuli * 0.028f,
                    Liike = Liike.Kierto, Akseli = KdTuuli, Nopeus = 0.2f, KayS = 40f, TaukoS = 70f };
            }
            osat[8] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = KinderdijkValot, Pivot = Vector3.zero, Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool kinderdijk = Rekisteroi("kinderdijk",
            new Erikoismalli { Runko = KinderdijkRunko, Osat = KinderdijkOsat, Kolmiot0 = 700, KokoKerroin = 1.5f });
    }
}
