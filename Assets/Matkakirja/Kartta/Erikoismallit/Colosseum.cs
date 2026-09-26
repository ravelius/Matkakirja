using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI COLOSSEUM (speksi docs/raportit/erikoismallit/colosseum.md, omistaja hyväksyi 22.0x).
    /// Tunnistus sekunnissa: soikea neljän kerroksen rengas, jonka pohjoinen ulkoseinä on ehjä ja korkea ja eteläinen sortunut
    /// (porrastettu sisärengas näkyy) — epäsymmetria on tunnistettavin piirre; kaariaukot tasaisena rytminä; areenan pohjalla
    /// paljastunut maanalainen ruudukko (hypogeum) ja itäpäässä rekonstruoitu lattia.
    /// Mitat: 189 × 156 m, korkeus 48 m (yksikkö 1,0 = 189 m, pystyliioittelu 1,3); pitkä akseli 70° pohjoisesta.
    /// Liikkuvat osat:
    ///   velarium0–15  kangassektorit, saranoituna seinän harjaan: auki vaakasuorassa kohti keskustaa, kiinni riippuen seinän
    ///                 sisäpuolella; aukeavat aaltona sektori kerrallaan (harvinainen ~1/10 ja napautus)
    ///   parvi         pääskyparvi kaartelee pohjoisseinän yllä (perusliike; lähestyttäessä nousee)
    ///   valot         alimman kerroksen kaarten lämmin yövalaistus (kuuluisa yönäkymä)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        const float CoA = 0.5f, CoB = 0.413f, CoKerros = 0.075f, CoUllakko = 0.08f;
        /// <summary>Pitkän akselin (u) ja lyhyen akselin (v) suunnat: pitkä akseli 70° pohjoisesta itään.</summary>
        static readonly Vector3 CoU = new Vector3(Mathf.Sin(70f * Mathf.PI / 180f), 0f, Mathf.Cos(70f * Mathf.PI / 180f));
        static readonly Vector3 CoV = new Vector3(Mathf.Sin(160f * Mathf.PI / 180f), 0f, Mathf.Cos(160f * Mathf.PI / 180f));
        const int CoOsia = 40;
        /// <summary>Sisärenkaan korkeus (kaksi kerrosta) ja katsomon ylin porras sen harjan tasolla.</summary>
        const float CoSisaKorkeus = CoKerros * 2f + 0.012f;
        static float CoKorkeus => CoKerros * 3f + CoUllakko;

        /// <summary>Ellipsin piste parametrilla t (rad) ja puoliakseleilla a, b korkeudella y.</summary>
        static Vector3 CoE(float t, float a, float b, float y = 0f) => CoU * (a * Mathf.Cos(t)) + CoV * (b * Mathf.Sin(t)) + Vector3.up * y;
        static float CoT(int i) => i * Mathf.PI * 2f / CoOsia;
        /// <summary>Ehjä ulkoseinä pohjoisessa (v-komponentti negatiivinen eli sin t &lt; 0), porrastetut päät.</summary>
        static float CoUlkoKorkeus(int i)
        {
            // Segmentit 21–38 ehjiä (t ≈ 1,05π … 1,95π), päissä porrastus.
            if (i >= 22 && i <= 37) return CoKorkeus;
            if (i == 21 || i == 38) return CoKerros * 2.6f;
            if (i == 20 || i == 39) return CoKerros * 1.5f;
            return 0f;
        }

        static readonly Color CoTravertiini = Hex(0xe6d8b6), CoTravertiiniVarjo = Hex(0xd3c29c), CoAukko = Hex(0x5f4a32),
            CoAskelma1 = Hex(0xd8c9a4), CoAskelma2 = Hex(0xc4b28b), CoAreena = Hex(0x6d573c), CoLattia = Hex(0xd9cba7);

        static void CoNelio(Rakentaja r, Vector3 a, Vector3 b, Vector3 c, Vector3 d, Vector3 ulos, Color vari) => r.NelioUlos(a, b, c, d, ulos, vari);

        static Mesh ColosseumRunko()
        {
            var r = new Rakentaja();
            float h = CoKorkeus;
            // 1. Ulkoseinä pohjoisessa (ulkopinta, sisäpinta, harja) ja päätyjen poikkileikkaukset; yksi ääriviivaosa.
            r.AloitaOsa();
            for (int i = 0; i < CoOsia; i++)
            {
                float hh = CoUlkoKorkeus(i);
                if (hh <= 0f) continue;
                float t0 = CoT(i), t1 = CoT(i + 1);
                Vector3 o0 = CoE(t0, CoA, CoB), o1 = CoE(t1, CoA, CoB);
                Vector3 s0 = CoE(t0, CoA * 0.93f, CoB * 0.93f), s1 = CoE(t1, CoA * 0.93f, CoB * 0.93f);
                Vector3 y = Vector3.up * hh;
                var ulos = (o0 + o1) * 0.5f;
                CoNelio(r, o0, o1, o1 + y, o0 + y, ulos, CoTravertiini);
                CoNelio(r, s0, s1, s1 + y, s0 + y, -ulos, CoTravertiiniVarjo);
                CoNelio(r, o0 + y, o1 + y, s1 + y, s0 + y, Vector3.up, CoTravertiiniVarjo);
                // Porrastuksen pystypinnat (raunion leikkaus), kun naapurisegmentti on matalampi.
                float hEd = CoUlkoKorkeus((i + CoOsia - 1) % CoOsia), hSe = CoUlkoKorkeus((i + 1) % CoOsia);
                if (hEd < hh) CoNelio(r, o0 + Vector3.up * hEd, s0 + Vector3.up * hEd, s0 + y, o0 + y, o0 - o1, CoTravertiiniVarjo);
                if (hSe < hh) CoNelio(r, o1 + Vector3.up * hSe, s1 + Vector3.up * hSe, s1 + y, o1 + y, o1 - o0, CoTravertiiniVarjo);
                // Kaariaukot kolmessa kerroksessa ja ullakon pienet ikkunat.
                var n = ((o0 + o1) * 0.5f).normalized;
                var keski = (o0 + o1) * 0.5f;
                float lev = (o1 - o0).magnitude;
                for (int k = 0; k < 3; k++)
                {
                    float yk = CoKerros * k + CoKerros * 0.55f;
                    if (yk + CoKerros * 0.3f > hh) break;
                    r.Holvi(keski + Vector3.up * yk, n, lev * 0.5f, CoKerros * 0.66f, CoAukko);
                }
                if (hh >= CoKorkeus && i % 2 == 0)
                    r.Laatta(keski + Vector3.up * (CoKerros * 3f + CoUllakko * 0.55f), n, lev * 0.22f, CoUllakko * 0.3f, CoAukko);
            }
            r.LopetaOsa();
            // 2. Sisärengas koko kierroksella (etelässä se on julkisivu, pohjoisessa ulkoseinän takana): ulkopinta ja harja.
            // Kaksi kerrosta: sortuneella puolella julkisivu on selvästi ehjää pohjoisseinää matalampi (tunnusmerkki).
            float hs = CoSisaKorkeus;
            r.AloitaOsa();
            for (int i = 0; i < CoOsia; i++)
            {
                float t0 = CoT(i), t1 = CoT(i + 1);
                Vector3 o0 = CoE(t0, CoA * 0.93f, CoB * 0.93f), o1 = CoE(t1, CoA * 0.93f, CoB * 0.93f);
                Vector3 s0 = CoE(t0, CoA * 0.86f, CoB * 0.86f), s1 = CoE(t1, CoA * 0.86f, CoB * 0.86f);
                Vector3 y = Vector3.up * hs;
                var ulos = (o0 + o1) * 0.5f;
                bool julkisivu = CoUlkoKorkeus(i) <= 0f;
                if (julkisivu)
                {
                    CoNelio(r, o0, o1, o1 + y, o0 + y, ulos, CoTravertiini);
                    var n = ulos.normalized; var keski = (o0 + o1) * 0.5f; float lev = (o1 - o0).magnitude;
                    for (int k = 0; k < 2; k++)
                        r.Holvi(keski + Vector3.up * (CoKerros * k + CoKerros * 0.55f), n, lev * 0.5f, CoKerros * 0.64f, CoAukko);
                }
                CoNelio(r, o0 + y, o1 + y, s1 + y, s0 + y, Vector3.up, CoTravertiiniVarjo);
            }
            r.LopetaOsa();
            // 3. Katsomo: kolme porrastettua kaistaa sisärenkaasta areenan podiumiin, vuorotellen kahdella sävyllä.
            var portaat = new (float a, float b, float y)[] { (0.43f, 0.355f, CoSisaKorkeus), (0.37f, 0.29f, 0.12f), (0.31f, 0.225f, 0.085f), (0.25f, 0.165f, 0.05f) };
            const int kOsia = 24;
            r.AloitaOsa();
            for (int k = 0; k + 1 < portaat.Length; k++)
                for (int i = 0; i < kOsia; i++)
                {
                    float t0 = i * Mathf.PI * 2f / kOsia, t1 = (i + 1) * Mathf.PI * 2f / kOsia;
                    var (a0, b0, y0) = portaat[k]; var (a1, b1, y1) = portaat[k + 1];
                    CoNelio(r, CoE(t0, a0, b0, y0), CoE(t1, a0, b0, y0), CoE(t1, a1, b1, y1), CoE(t0, a1, b1, y1), Vector3.up,
                        k % 2 == 0 ? CoAskelma1 : CoAskelma2);
                }
            // Säteittäiset käytävät (vomitoria) katsomon yli tummina viivoina 45°:n välein.
            for (int i = 0; i < 8; i++)
            {
                float t = i * Mathf.PI / 4f + Mathf.PI / 8f, dt = 0.018f;
                var (a0, b0, y0) = portaat[0]; var (a3, b3, y3) = portaat[3];
                CoNelio(r, CoE(t - dt, a0, b0, y0 + 0.002f), CoE(t + dt, a0, b0, y0 + 0.002f), CoE(t + dt * 1.6f, a3, b3, y3 + 0.002f),
                    CoE(t - dt * 1.6f, a3, b3, y3 + 0.002f), Vector3.up, Color.Lerp(CoAskelma2, EmSeepia, 0.45f));
            }
            // Podiumin seinä areenan ympärillä.
            for (int i = 0; i < kOsia; i++)
            {
                float t0 = i * Mathf.PI * 2f / kOsia, t1 = (i + 1) * Mathf.PI * 2f / kOsia;
                Vector3 a = CoE(t0, 0.25f, 0.165f, 0.055f), b = CoE(t1, 0.25f, 0.165f, 0.055f);
                Vector3 c = CoE(t1, 0.25f, 0.165f, 0.02f), d = CoE(t0, 0.25f, 0.165f, 0.02f);
                CoNelio(r, a, b, c, d, -(a + b), CoTravertiiniVarjo);
            }
            r.LopetaOsa();
            // 4. Areena: tumma hypogeum-pohja, vaaleat käytäväseinät pituus- ja poikkisuuntaan, itäpäässä rekonstruoitu lattia.
            r.AloitaOsa();
            for (int i = 0; i < kOsia; i++)
            {
                float t0 = i * Mathf.PI * 2f / kOsia, t1 = (i + 1) * Mathf.PI * 2f / kOsia;
                r.KolmioUlos(Vector3.up * 0.02f, CoE(t0, 0.25f, 0.165f, 0.02f), CoE(t1, 0.25f, 0.165f, 0.02f), Vector3.up, CoAreena);
            }
            for (int j = -2; j <= 2; j++)
            {
                float v = j * 0.055f;
                float pituus = 0.22f * Mathf.Sqrt(Mathf.Max(0.05f, 1f - (v / 0.165f) * (v / 0.165f)));
                r.Seina(CoU * -pituus + CoV * v + Vector3.up * 0.02f, CoU * pituus * 0.35f + CoV * v + Vector3.up * 0.02f, 0.018f, 0.009f, CoLattia, CoLattia);
            }
            foreach (float u in new[] { -0.16f, -0.08f, 0f })
                r.Seina(CoU * u - CoV * 0.13f + Vector3.up * 0.02f, CoU * u + CoV * 0.13f + Vector3.up * 0.02f, 0.018f, 0.009f, CoLattia, CoLattia);
            r.Seina(CoU * 0.17f - CoV * 0.11f + Vector3.up * 0.02f, CoU * 0.17f + CoV * 0.11f + Vector3.up * 0.02f, 0.02f, 0.09f, CoLattia, CoLattia);
            r.LopetaOsa();
            return r.Verkko("Colosseum");
        }

        /// <summary>Harjan korkeus segmentissä i (ulkoseinä pohjoisessa, sisärengas etelässä).</summary>
        static float CoHarja(int i) => CoUlkoKorkeus(i) > 0f ? Mathf.Max(CoUlkoKorkeus(i), CoSisaKorkeus) : CoSisaKorkeus;
        static float CoHarjaSkaala(int i) => CoUlkoKorkeus(i) >= CoKorkeus ? 0.965f : 0.895f;

        /// <summary>
        /// Velariumin sektori s (0–15): trapetsi harjalta (pivot, sektorin keskellä) kohti keskustan aukkoa (skaala 0,45) pienellä
        /// notkolla; kaksipuolinen kangas. Lepoasento (skaala 1) = auki; animoija rullaa sen kiinni skaalaamalla kohti pivotia
        /// (skaala 0,02 = kiinni harjalla), sektori kerrallaan aaltona.
        /// </summary>
        static Mesh ColosseumVelarium(int s)
        {
            var r = new Rakentaja();
            int i0 = s * CoOsia / 16, i1 = (s + 1) * CoOsia / 16;
            var pivot = CoVelariumPivot(s);
            float tk = (CoT(i0) + CoT(i1)) * 0.5f;
            float sk = CoHarjaSkaala(i0), hy = CoHarja((i0 + i1) / 2) + 0.004f;
            Vector3 A = CoE(CoT(i0), CoA * sk, CoB * sk, hy) - pivot, B = CoE(CoT(i1), CoA * sk, CoB * sk, hy) - pivot;
            Vector3 C = CoE(CoT(i1), CoA * 0.45f, CoB * 0.45f, hy - 0.035f) - pivot, D = CoE(CoT(i0), CoA * 0.45f, CoB * 0.45f, hy - 0.035f) - pivot;
            Vector3 M = CoE(tk, CoA * 0.72f, CoB * 0.72f, hy - 0.03f) - pivot;
            var vari = s % 2 == 0 ? EmKangas : Color.Lerp(EmKangas, EmPaperi, 0.45f);
            // Kaksi kolmioparia notkon kautta (kangas roikkuu keskeltä), molemmin puolin.
            r.KalvoKolmio(A, B, M, vari); r.KalvoKolmio(B, C, M, vari); r.KalvoKolmio(C, D, M, vari); r.KalvoKolmio(D, A, M, vari);
            return r.Verkko("Colosseum-velarium" + s);
        }

        static Vector3 CoVelariumPivot(int s)
        {
            int i0 = s * CoOsia / 16, i1 = (s + 1) * CoOsia / 16;
            float tk = (CoT(i0) + CoT(i1)) * 0.5f;
            float sk = CoHarjaSkaala(i0);
            return CoE(tk, CoA * sk, CoB * sk, CoHarja((i0 + i1) / 2) + 0.004f);
        }

        static Vector3 CoVelariumSarana(int s)
        {
            int i0 = s * CoOsia / 16, i1 = (s + 1) * CoOsia / 16;
            return (CoE(CoT(i1), CoA, CoB) - CoE(CoT(i0), CoA, CoB)).normalized;
        }

        /// <summary>Pääskyparvi: 8 pientä tummaa lintua renkaassa (säde 0,11), siivet V-kulmassa; pivot renkaan keskellä.</summary>
        static Mesh ColosseumParvi()
        {
            var r = new Rakentaja();
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI * 2f / 8f + (i % 3) * 0.2f;
                float sade = 0.08f + 0.04f * ((i * 5) % 3) / 2f;
                var p = new Vector3(Mathf.Cos(a) * sade, 0.02f * ((i * 7) % 3), Mathf.Sin(a) * sade);
                var eteen = new Vector3(-Mathf.Sin(a), 0f, Mathf.Cos(a));   // lentosuunta kiertoon
                var sivu = Vector3.Cross(Vector3.up, eteen);
                Vector3 nokka = p + eteen * 0.008f, pyrsto = p - eteen * 0.006f;
                r.KalvoKolmio(nokka, pyrsto, p + sivu * 0.016f + Vector3.up * 0.006f - eteen * 0.006f, EmMuste);
                r.KalvoKolmio(nokka, pyrsto, p - sivu * 0.016f + Vector3.up * 0.006f - eteen * 0.006f, EmMuste);
            }
            return r.Verkko("Colosseum-parvi");
        }

        /// <summary>Yövalot: alimman kerroksen kaaret ehjällä ulkoseinällä ja sisärenkaan julkisivulla lämpimänä hehkuna.</summary>
        static Mesh ColosseumValot()
        {
            var r = new Rakentaja();
            for (int i = 0; i < CoOsia; i++)
            {
                bool ulko = CoUlkoKorkeus(i) >= CoKerros * 1.5f;
                float s = ulko ? 1f : 0.93f;
                Vector3 o0 = CoE(CoT(i), CoA * s, CoB * s), o1 = CoE(CoT(i + 1), CoA * s, CoB * s);
                var keski = (o0 + o1) * 0.5f; var n = keski.normalized; float lev = (o1 - o0).magnitude;
                for (int k = 0; k < 1; k++)
                    r.Holvi(keski + n * 0.0015f + Vector3.up * (CoKerros * k + CoKerros * 0.55f), n, lev * 0.46f, CoKerros * 0.6f, EmIkkunavalo);
            }
            return r.Verkko("Colosseum-valot");
        }

        static readonly Vector3 CoParviPivot = CoE(1.5f * Mathf.PI, CoA * 0.7f, CoB * 0.7f, 0.48f);

        static LiikkuvaOsaMaaritys[] ColosseumOsat()
        {
            var osat = new List<LiikkuvaOsaMaaritys>();
            for (int s = 0; s < 16; s++)
            {
                int sk = s;
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "velarium" + s, Verkko = () => ColosseumVelarium(sk), Pivot = CoVelariumPivot(s),
                    Liike = Liike.Aalto, Akseli = CoVelariumSarana(s), Laajuus = 1f, KayS = 60f, TaukoS = 80f });
            }
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "parvi", Verkko = ColosseumParvi, Pivot = CoParviPivot, Liike = Liike.Kierto,
                Akseli = Vector3.up, Nopeus = 0.1f, KayS = 15f, TaukoS = 40f });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = ColosseumValot, Pivot = Vector3.zero, Liike = Liike.Valahdys });
            return osat.ToArray();
        }

        static readonly bool colosseum = Rekisteroi("colosseum",
            new Erikoismalli { Runko = ColosseumRunko, Osat = ColosseumOsat, Kolmiot0 = 1150 });
    }
}
