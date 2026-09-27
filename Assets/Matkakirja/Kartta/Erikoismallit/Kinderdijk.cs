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
            new Erikoismalli { Runko = KinderdijkRunko, Osat = KinderdijkOsat, Kolmiot0 = 900, KokoKerroin = 1.5f });
    }
}
