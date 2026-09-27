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

        // ---- LÄHITASO (omistaja 27.9. klo 08.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: aukkojen kynnykset, rauniokivet ja reunalistojen yläpinnat. Ominaisuuksina, koska
        /// Em-paletti on toisessa tiedostossa (staattisten kenttien alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color CoLKynnys => Color.Lerp(CoTravertiiniVarjo, CoAukko, 0.7f);
        static Color CoLKivi => Color.Lerp(CoTravertiiniVarjo, EmSeepia, 0.2f);
        static Color CoLListanYla => Color.Lerp(CoTravertiini, CoTravertiiniVarjo, 0.4f);
        /// <summary>Kaariaukkojen syvyys: tumma käytävä näkyy aukosta, kynnys aukon alareunassa.</summary>
        const float CoLSyvyys = 0.008f;
        /// <summary>Kaaren leveys jänteestä: rungon kaarikuvio (leveys 0,5) kiertyy ellipsillä osin seinän taakse, joten se näkyy
        /// kapeampana; oikea aukko 0,42 näyttää samalta ja on lähempänä todellisia mittasuhteita (4,2 m × 7 m).</summary>
        const float CoLKaarenOsuus = 0.42f;

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (ulkoseinä, sisärengas, katsomo, areena) ja osien pivotit kuin rungossa, noin 2,8 × kolmiot lähikuvan yksityiskohtiin.
        /// Korvaa rungon vain lähellä; velarium, parvi ja valot pysyvät ennallaan (kaaret samoilla paikoilla, joten yövalot osuvat
        /// niihin).
        ///   ulkoseinä  kolmen kerroksen kaaret oikeina aukkoina (kynnys ja tumma käytävä syvyydessä), puolipylväät kaarten
        ///              välissä, reunalistat kerrosten rajoilla ja harjalla; ullakon suorakulmaiset ikkunat syvyyksineen;
        ///              sisäpinnalla ylimmän kerroksen kaaret ja ullakon ikkunat; porrastetuissa päissä käytävien
        ///              holvit leikkauspinnassa ja rikkonainen harja
        ///   etelä      sortuneella puolella sisärenkaan kaksi kaarikerrosta aukkoina, säteisseinien katkenneet tyngät ja raunion
        ///              kiviä (pienet kappaleet ilman ääriviivaa)
        ///   katsomo    kolme porrasta (maeniana): kaista viettää kuten rungossa ja päättyy kaidemuuriin, jonka yli seuraava alkaa;
        ///              portaat sektorien välissä, podiumin portit
        ///   areena     rungon hypogeum ja itäpään rekonstruoidun lattian lankut
        /// </summary>
        static Mesh ColosseumLahi()
        {
            var r = new Rakentaja();
            var sat = new System.Random(1873);
            // 1. Ulkoseinä pohjoisessa: julkisivu kaistoittain oikeine aukkoineen; yksi ääriviivaosa kuten rungossa.
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
                // Kaarikerrokset: rungon aukot (leveys puolet jänteestä, korkeus 0,66 kerrosta) samoilla ehdoilla; käytävä takana.
                float yAla = 0f;
                for (int k = 0; k < 3; k++)
                {
                    float yk = CoKerros * k + CoKerros * 0.55f;
                    if (yk + CoKerros * 0.3f > hh) break;
                    CoLAukko(r, o0, o1, ulos, CoKerros * k, CoKerros * (k + 1), CoLKaarenOsuus, yk - CoKerros * 0.33f, yk + CoKerros * 0.33f,
                        CoLSyvyys, 3, true, CoTravertiini);
                    yAla = CoKerros * (k + 1);
                }
                CoLKaytava(r, o0, o1, ulos, CoKerros * 0.2f, yAla - CoKerros * 0.1f, CoLSyvyys);
                if (hh >= CoKorkeus)
                {
                    // Ullakko: suorakulmainen ikkuna joka toisessa segmentissä (rungon paikka ja koko).
                    float yu = CoKerros * 3f;
                    if (i % 2 == 0)
                    {
                        CoLAukko(r, o0, o1, ulos, yu, hh, 0.22f, yu + CoUllakko * 0.4f, yu + CoUllakko * 0.7f, 0.007f, 0, true, CoTravertiini);
                        CoLKaytava(r, Vector3.Lerp(o0, o1, 0.3f), Vector3.Lerp(o0, o1, 0.7f), ulos, yu + CoUllakko * 0.35f, yu + CoUllakko * 0.75f, 0.007f);
                    }
                    else CoNelio(r, o0 + Vector3.up * yu, o1 + Vector3.up * yu, o1 + y, o0 + y, ulos, CoTravertiini);
                }
                else if (hh > yAla) CoNelio(r, o0 + Vector3.up * yAla, o1 + Vector3.up * yAla, o1 + y, o0 + y, ulos, CoTravertiini);
                // Reunalistat kerrosten rajoilla ja harjalla (kivikerrokset: vaalea yläpinta, varjon puoleinen etupinta).
                for (int k = 1; k <= 3; k++)
                {
                    float yl = CoKerros * k;
                    if (yl + 0.004f > hh) break;
                    CoLVyo(r, i, CoA, CoB, 0.005f, yl - 0.0045f, yl + 0.0015f, CoTravertiiniVarjo, CoLListanYla);
                }
                if (hh >= CoKorkeus) CoLVyo(r, i, CoA, CoB, 0.0055f, hh - 0.007f, hh, CoTravertiiniVarjo, CoLListanYla);
                // Sisäpinta ja harja kuten rungossa; sisäpinnalla ylimmän kaarikerroksen ja ullakon aukot (näkyvät sisärenkaan yli).
                CoNelio(r, s0, s1, s1 + y, s0 + y, -ulos, CoTravertiiniVarjo);
                CoNelio(r, o0 + y, o1 + y, s1 + y, s0 + y, Vector3.up, CoTravertiiniVarjo);
                if (hh >= CoKorkeus)
                {
                    var sk = (s0 + s1) * 0.5f; float sl = (s1 - s0).magnitude;
                    r.Holvi(sk + Vector3.up * (CoKerros * 2.55f), -ulos, sl * 0.5f, CoKerros * 0.62f, CoAukko);
                    if (i % 2 == 0) r.Laatta(sk + Vector3.up * (CoKerros * 3f + CoUllakko * 0.55f), -ulos, sl * 0.2f, CoUllakko * 0.28f, CoAukko);
                }
                // Porrastetut päät: raunion leikkauspinta käytävien holveineen ja rikkonainen harja.
                float hEd = CoUlkoKorkeus((i + CoOsia - 1) % CoOsia), hSe = CoUlkoKorkeus((i + 1) % CoOsia);
                if (hEd < hh) CoLLeikkaus(r, o0, s0, o0 - o1, hEd, hh);
                if (hSe < hh) CoLLeikkaus(r, o1, s1, o1 - o0, hSe, hh);
                if (hh < CoKorkeus)
                {
                    float f = 0.3f + 0.4f * (float)sat.NextDouble();
                    var p = Vector3.Lerp(Vector3.Lerp(o0, o1, f), Vector3.Lerp(s0, s1, f), 0.5f) + y;
                    CoLKivilohko(r, p, (float)sat.NextDouble() * Mathf.PI, 0.014f, 0.022f, 0.008f + 0.008f * (float)sat.NextDouble(),
                        CoLKivi, CoTravertiiniVarjo);
                }
            }
            r.LopetaOsa();
            // Puolipylväät kaarten välissä (segmenttien taitteissa), kun molemmat naapurit ovat kerroksen korkuisia. Omina pieninä
            // osinaan (ei ääriviivaa): ulkoseinän osassa niiden kasvatetut kopiot tummentaisivat musteviivaa pilarien kohdalta.
            for (int b = 0; b < CoOsia; b++)
            {
                float hmin = Mathf.Min(CoUlkoKorkeus((b + CoOsia - 1) % CoOsia), CoUlkoKorkeus(b));
                if (hmin <= 0f) continue;
                float tb = CoT(b);
                Vector3 pb = CoE(tb, CoA, CoB), nb = CoLNormaali(tb, CoA, CoB);
                for (int k = 0; k < 3; k++)
                {
                    if (CoKerros * (k + 1) > hmin) break;
                    CoLHarjanne(r, pb, nb, 0.0048f, 0.0048f, CoKerros * k + (k == 0 ? 0.012f : 0.0015f), CoKerros * (k + 1) - 0.0045f, CoTravertiini);
                }
            }

            // 2. Sisärengas: etelässä kaksi kaarikerrosta oikeina aukkoina ja listat; harja koko kierroksella kuten rungossa.
            float hs = CoSisaKorkeus;
            r.AloitaOsa();
            for (int i = 0; i < CoOsia; i++)
            {
                float t0 = CoT(i), t1 = CoT(i + 1);
                Vector3 o0 = CoE(t0, CoA * 0.93f, CoB * 0.93f), o1 = CoE(t1, CoA * 0.93f, CoB * 0.93f);
                Vector3 s0 = CoE(t0, CoA * 0.86f, CoB * 0.86f), s1 = CoE(t1, CoA * 0.86f, CoB * 0.86f);
                Vector3 y = Vector3.up * hs;
                var ulos = (o0 + o1) * 0.5f;
                float hu = CoUlkoKorkeus(i);
                if (hu <= 0f)
                {
                    for (int k = 0; k < 2; k++)
                    {
                        float yk = CoKerros * k + CoKerros * 0.55f;
                        CoLAukko(r, o0, o1, ulos, CoKerros * k, CoKerros * (k + 1), CoLKaarenOsuus, yk - CoKerros * 0.32f, yk + CoKerros * 0.32f,
                            CoLSyvyys, 3, false, CoTravertiini);
                    }
                    CoLKaytava(r, o0, o1, ulos, CoKerros * 0.2f, CoKerros * 1.9f, CoLSyvyys);
                    CoNelio(r, o0 + Vector3.up * (CoKerros * 2f), o1 + Vector3.up * (CoKerros * 2f), o1 + y, o0 + y, ulos, CoTravertiini);
                    CoLVyo(r, i, CoA * 0.93f, CoB * 0.93f, 0.0045f, CoKerros - 0.0045f, CoKerros + 0.0015f, CoTravertiiniVarjo, CoLListanYla);
                    CoLVyo(r, i, CoA * 0.93f, CoB * 0.93f, 0.005f, hs - 0.006f, hs, CoTravertiiniVarjo, CoLListanYla);
                }
                else if (hu < hs)
                    // Matalan tyngän yli näkyvä sisärenkaan yläosa (rungossa aukko; lähellä siitä näkisi läpi).
                    CoNelio(r, o0 + Vector3.up * hu, o1 + Vector3.up * hu, o1 + y, o0 + y, ulos, CoTravertiini);
                CoNelio(r, o0 + y, o1 + y, s1 + y, s0 + y, Vector3.up, CoTravertiiniVarjo);
            }
            r.LopetaOsa();
            // Sortunut eteläpuoli: säteisseinien katkenneet tyngät sisärenkaan pilareista ulospäin ja raunion kiviä. Pienet erilliset
            // kappaleet (ei ääriviivaa), joten rungon musteviiva pysyy sisärenkaan kehällä.
            for (int b = 1; b < 20; b++)
            {
                float tb = CoT(b);
                float ulottuma = 0.02f + 0.03f * (float)sat.NextDouble();
                float hSisa = CoKerros * (0.45f + 1.3f * (float)sat.NextDouble()), hUlko = hSisa * (0.2f + 0.4f * (float)sat.NextDouble());
                CoLTynka(r, CoE(tb, CoA * 0.93f, CoB * 0.93f), CoE(tb, CoA * (0.93f + ulottuma), CoB * (0.93f + ulottuma)), CoLNormaali(tb, CoA, CoB),
                    0.0075f, Mathf.Min(hSisa, hs - 0.012f), hUlko, CoTravertiini, CoTravertiiniVarjo);
            }
            for (int j = 0; j < 12; j++)
            {
                float tt = Mathf.PI * (0.04f + 0.92f * (float)sat.NextDouble());
                float sk = 0.95f + 0.04f * (float)sat.NextDouble();
                CoLRaunio(r, CoE(tt, CoA * sk, CoB * sk), 0.006f + 0.006f * (float)sat.NextDouble(), 0.004f + 0.005f * (float)sat.NextDouble(),
                    (float)sat.NextDouble() * Mathf.PI, j % 3 == 0 ? CoTravertiiniVarjo : CoLKivi);
            }

            // 3. Katsomo: rungon kolme kaistaa (maeniana) portaittain. Kaista viettää kuten rungossa mutta päättyy kaidemuurin harjalle,
            // josta seuraava kaista alkaa matalammalta; portaat sektorien välissä (irti kaistan jänteistä), podiumin seinä portteineen.
            var portaat = new (float a, float b, float y)[] { (0.43f, 0.355f, CoSisaKorkeus), (0.37f, 0.29f, 0.12f), (0.31f, 0.225f, 0.085f), (0.25f, 0.165f, 0.05f) };
            const int kOsia = 24;
            const float muuri = 0.013f;
            var porras = Color.Lerp(CoAskelma2, EmSeepia, 0.45f);
            r.AloitaOsa();
            for (int k = 0; k + 1 < portaat.Length; k++)
            {
                var (a0, b0, y0) = portaat[k]; var (a1, b1, y1) = portaat[k + 1];
                float yl = y1 + muuri;
                var kaista = k % 2 == 0 ? CoAskelma1 : CoAskelma2;
                var seina = Color.Lerp(kaista, CoAukko, 0.3f);
                for (int i = 0; i < kOsia; i++)
                {
                    float t0 = i * Mathf.PI * 2f / kOsia, t1 = (i + 1) * Mathf.PI * 2f / kOsia;
                    CoNelio(r, CoE(t0, a0, b0, y0), CoE(t1, a0, b0, y0), CoE(t1, a1, b1, yl), CoE(t0, a1, b1, yl), Vector3.up, kaista);
                    Vector3 q0 = CoE(t0, a1, b1), q1 = CoE(t1, a1, b1);
                    float ya = k + 2 < portaat.Length ? y1 : 0.02f;   // alimman kaistan muuri on podiumin seinä areenaan asti
                    CoNelio(r, q0 + Vector3.up * yl, q1 + Vector3.up * yl, q1 + Vector3.up * ya, q0 + Vector3.up * ya, -(q0 + q1),
                        k + 2 < portaat.Length ? seina : CoTravertiiniVarjo);
                }
                for (int v = 0; v < 8; v++)
                {
                    float t = v * Mathf.PI / 4f + Mathf.PI / 8f;
                    float dt0 = 0.018f * (1f + 0.2f * k), dt1 = 0.018f * (1.2f + 0.2f * k);
                    CoNelio(r, CoE(t - dt0, a0, b0, y0 + 0.004f), CoE(t + dt0, a0, b0, y0 + 0.004f), CoE(t + dt1, a1, b1, yl + 0.004f),
                        CoE(t - dt1, a1, b1, yl + 0.004f), Vector3.up, porras);
                }
            }
            for (int j = 0; j < 4; j++)
            {
                var p = CoE(j * Mathf.PI * 0.5f, 0.25f, 0.165f);
                r.Laatta(p + Vector3.up * 0.036f, -p, 0.018f, 0.028f, CoAukko);
            }
            r.LopetaOsa();

            // 4. Areena kuten rungossa: tumma hypogeum-pohja, käytäväseinät ja itäpään rekonstruoitu lattia, nyt lankkuineen.
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
            var lankku = Color.Lerp(CoLattia, EmSeepia, 0.4f);
            for (int j = 0; j < 7; j++)
            {
                float u = 0.13f + 0.0133f * j;
                Vector3 a = CoU * u - CoV * 0.108f + Vector3.up * 0.0408f, b = CoU * u + CoV * 0.108f + Vector3.up * 0.0408f;
                r.NelioUlos(a - CoU * 0.0008f, b - CoU * 0.0008f, b + CoU * 0.0008f, a + CoU * 0.0008f, Vector3.up, lankku);
            }
            r.LopetaOsa();
            return r.Verkko("Colosseum-lahi");
        }

        /// <summary>Ellipsin (a, b) ulospäin osoittava vaakanormaali parametrilla t.</summary>
        static Vector3 CoLNormaali(float t, float a, float b) => (CoU * (Mathf.Cos(t) / a) + CoV * (Mathf.Sin(t) / b)).normalized;

        /// <summary>
        /// Julkisivukaista jänteellä p0 → p1 (maatason pisteet) korkeuksilla y0 … y1, jossa on todellinen aukko: seinäpinta aukon
        /// ympärillä (kaarella m lohkoa: 10 kolmiota, m = 3) ja kynnys syvyyteen; tumma käytävä aukon takana piirretään erikseen
        /// (CoLKaytava, yksi koko segmentille). Aukko keskellä: leveys osuutena jänteestä, alareuna yb ja laki yt; m = 0 antaa
        /// suorakulmaisen aukon (ullakon ikkunat, 8 kolmiota). Pieliä ja kaaren alapintaa ei tarvita: kamera on aina yläpuolella,
        /// ja vinosta kulmasta aukosta näkyy käytävän tumma pinta.
        /// </summary>
        static void CoLAukko(Rakentaja r, Vector3 p0, Vector3 p1, Vector3 ulos, float y0, float y1, float osuus, float yb, float yt,
            float syvyys, int m, bool kynnys, Color pinta)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            float L = (p1 - p0).magnitude;
            Vector3 P(float s, float yy) => p0 + (p1 - p0) * s + Vector3.up * yy;
            float sa = 0.5f - osuus * 0.5f, sb = 0.5f + osuus * 0.5f, w = osuus * L * 0.5f;
            float ys = m > 0 ? yt - w : yt;
            Vector3 BL = P(0f, y0), BR = P(1f, y0), TR = P(1f, y1), TL = P(0f, y1);
            r.NelioUlos(BL, BR, P(sb, yb), P(sa, yb), n, pinta);
            r.NelioUlos(BR, TR, P(sb, ys), P(sb, yb), n, pinta);
            r.NelioUlos(TL, BL, P(sa, yb), P(sa, ys), n, pinta);
            if (m > 0)
            {
                Vector3 A(int j) { float f = j * Mathf.PI / m; return P(0.5f + w * Mathf.Cos(f) / L, ys + w * Mathf.Sin(f)); }
                int kaanne = (m - 1) / 2;
                for (int j = 0; j <= kaanne; j++) r.KolmioUlos(A(j), A(j + 1), TR, n, pinta);
                r.KolmioUlos(TR, TL, A(kaanne + 1), n, pinta);
                for (int j = kaanne + 1; j < m; j++) r.KolmioUlos(A(j), A(j + 1), TL, n, pinta);
            }
            else r.NelioUlos(P(sa, yt), P(sb, yt), TR, TL, n, pinta);
            if (kynnys) r.NelioUlos(P(sa, yb), P(sb, yb), P(sb, yb) - n * syvyys, P(sa, yb) - n * syvyys, Vector3.up, CoLKynnys);
        }

        /// <summary>Aukkojen takana näkyvä tumma käytävä: jänteen p0 → p1 suuntainen pinta syvyydellä, korkeuksilla y0 … y1.</summary>
        static void CoLKaytava(Rakentaja r, Vector3 p0, Vector3 p1, Vector3 ulos, float y0, float y1, float syvyys)
        {
            var d = -new Vector3(ulos.x, 0f, ulos.z).normalized * syvyys;
            r.NelioUlos(p0 + d + Vector3.up * y0, p1 + d + Vector3.up * y0, p1 + d + Vector3.up * y1, p0 + d + Vector3.up * y1, ulos, CoAukko);
        }

        /// <summary>Pystysuora harjanne seinän taitteessa (puolipylväs): kaksi viistoa tahkoa ulospäin, 4 kolmiota;
        /// valon puoli vaalenee ja toinen tummuu, joten harjanne erottuu viivaparina.</summary>
        static void CoLHarjanne(Rakentaja r, Vector3 b, Vector3 n, float puoliLev, float ulk, float y0, float y1, Color vari)
        {
            var t = Vector3.Cross(Vector3.up, n) * puoliLev;
            Vector3 a = Vector3.up * y0, y = Vector3.up * y1, k = b + n * ulk;
            var keski = b - n * 0.01f + (a + y) * 0.5f;
            r.AloitaOsa();
            r.NelioKeskelta(b - t + a, k + a, k + y, b - t + y, keski, vari);
            r.NelioKeskelta(k + a, b + t + a, b + t + y, k + y, keski, vari);
            r.LopetaOsa();
        }

        /// <summary>Reunalista segmentillä i: ulkoneva etupinta ja yläpinta korkeuksilla y0 … y1; ellipsiä (a, b) laajennetaan
        /// ulkoneman verran, joten naapurisegmenttien listat liittyvät saumatta.</summary>
        static void CoLVyo(Rakentaja r, int i, float a, float b, float ulk, float y0, float y1, Color etu, Color yla)
        {
            float t0 = CoT(i), t1 = CoT(i + 1);
            Vector3 s0 = CoE(t0, a, b), s1 = CoE(t1, a, b), u0 = CoE(t0, a + ulk, b + ulk), u1 = CoE(t1, a + ulk, b + ulk);
            var ulos = (u0 + u1) * 0.5f;
            r.NelioUlos(u0 + Vector3.up * y0, u1 + Vector3.up * y0, u1 + Vector3.up * y1, u0 + Vector3.up * y1, ulos, etu);
            r.NelioUlos(s0 + Vector3.up * y1, s1 + Vector3.up * y1, u1 + Vector3.up * y1, u0 + Vector3.up * y1, Vector3.up, yla);
        }

        /// <summary>Raunion leikkauspinta porrastetussa päässä (ulkopinnan piste o, sisäpinnan piste s, suunta kohti matalampaa
        /// naapuria): leikkaus ja käytävien holvit tummina kerroksittain.</summary>
        static void CoLLeikkaus(Rakentaja r, Vector3 o, Vector3 s, Vector3 suunta, float ala, float yla)
        {
            CoNelio(r, o + Vector3.up * ala, s + Vector3.up * ala, s + Vector3.up * yla, o + Vector3.up * yla, suunta, CoTravertiiniVarjo);
            float syv = (o - s).magnitude;
            for (int k = 0; k < 3; k++)
            {
                float y0 = Mathf.Max(ala, CoKerros * k), y1 = CoKerros * (k + 1);
                if (y1 - 0.012f > yla || y1 - y0 < 0.03f) continue;
                r.Holvi((o + s) * 0.5f + Vector3.up * ((y0 + y1) * 0.5f - 0.004f), suunta, syv * 0.55f, (y1 - y0) * 0.62f, CoAukko);
            }
        }

        /// <summary>Kivilohko (rikkonainen harja): keskipohja p, kierto (rad), mitat; sivut ja kansi (10 kolmiota).</summary>
        static void CoLKivilohko(Rakentaja r, Vector3 p, float kierto, float lev, float syv, float kork, Color sivu, Color kansi)
        {
            var ex = new Vector3(Mathf.Cos(kierto), 0f, Mathf.Sin(kierto)) * (lev * 0.5f);
            var ez = new Vector3(-Mathf.Sin(kierto), 0f, Mathf.Cos(kierto)) * (syv * 0.5f);
            Vector3 A = p - ex - ez, B = p + ex - ez, C = p + ex + ez, D = p - ex + ez, y = Vector3.up * kork;
            var k = p + y * 0.5f;
            r.NelioKeskelta(A, B, B + y, A + y, k, sivu);
            r.NelioKeskelta(B, C, C + y, B + y, k, sivu);
            r.NelioKeskelta(C, D, D + y, C + y, k, sivu);
            r.NelioKeskelta(D, A, A + y, D + y, k, sivu);
            r.NelioUlos(A + y, B + y, C + y, D + y, Vector3.up, kansi);
        }

        /// <summary>Raunion kivi maassa: matala nelisivuinen pyramidi (4 kolmiota), keskipohja p, säde, korkeus ja kierto (rad).</summary>
        static void CoLRaunio(Rakentaja r, Vector3 p, float sade, float kork, float kierto, Color vari)
        {
            Vector3 huippu = p + Vector3.up * kork, keski = p + Vector3.up * (kork * 0.3f);
            for (int j = 0; j < 4; j++)
            {
                float a0 = kierto + j * Mathf.PI * 0.5f, a1 = kierto + (j + 1) * Mathf.PI * 0.5f;
                float s0 = sade * (j % 2 == 0 ? 1f : 0.7f), s1 = sade * (j % 2 == 0 ? 0.7f : 1f);
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * s0, p + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * s1,
                    huippu, keski, vari);
            }
        }

        /// <summary>Säteisseinän katkennut tynkä sisärenkaasta ulospäin (a → b): sivut, pääty ja viisto murtopinta (8 kolmiota).</summary>
        static void CoLTynka(Rakentaja r, Vector3 a, Vector3 b, Vector3 n, float paksuus, float hA, float hB, Color sivu, Color murtuma)
        {
            var t = Vector3.Cross(Vector3.up, n) * (paksuus * 0.5f);
            Vector3 ya = Vector3.up * hA, yb = Vector3.up * hB;
            var k = (a + b) * 0.5f + Vector3.up * ((hA + hB) * 0.25f);
            r.NelioKeskelta(a - t, b - t, b - t + yb, a - t + ya, k, sivu);
            r.NelioKeskelta(a + t, b + t, b + t + yb, a + t + ya, k, sivu);
            r.NelioKeskelta(b - t, b + t, b + t + yb, b - t + yb, k, sivu);
            r.NelioUlos(a - t + ya, a + t + ya, b + t + yb, b - t + yb, Vector3.up, murtuma);
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
            new Erikoismalli { Runko = ColosseumRunko, Osat = ColosseumOsat, Lahi = ColosseumLahi, Kolmiot0 = 1420, KokoKerroin = 1.5f, Kaupunki = "rooma" });
    }
}
