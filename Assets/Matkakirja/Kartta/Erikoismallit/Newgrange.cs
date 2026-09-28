using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI NEWGRANGE (Brú na Bóinne, Irlanti; speksi docs/raportit/erikoismallit/newgrange.md, omistaja hyväksyi
    /// elämänidean 27.9.2026, erä 6). Nosto kohde:newgrange, 53,6947 N −6,4756 E, taso 1 (historia).
    /// Tunnistus sekunnissa: matala vihreä nurmikupu, jonka etupuolta kiertää valkoinen kvartsijulkisivu sirppinä, sirpin keskellä
    /// tumma sisäänkäynti ja kattoaukko, juurella harmaa reunakivikehä, edessä suuren kiven kehän pystykivet ja kapea Boynen mutka,
    /// jolla uivat valkoiset laulujoutsenet.
    /// Mitat: 1,0 ≈ 130 m. Kumpu on 0,654 × 0,608 (85 × 79 m) ja pystyliioittelu 2,0 (kumpu 0,186, reunakivet 0,018), koska 30°:n
    /// kamera lyhentää 12 m:n kummun litteäksi levyksi. Julkisivu on korotettu 0,072:een ja kallistettu hieman taakse, ja sen yllä
    /// on loiva kvartsikaista 0,085:een: etelään katsova julkisivu on varjossa (valo luoteesta), joten 0,057:n pystymuuri ei
    /// lukenut 40 pt:ssä valkoisena sirppinä eikä näkynyt ylhäältä. Suuren kehän kivet on tuotu 7–10 m:n päähän reunasta, ja Boyne
    /// on tyylitelty kapeaksi (0,058) mutkaksi heti kivien eteen. Joutsenet ovat noin 4-kertaisia (uiva 0,044).
    /// SUUNTA TYYLITELTY: todellisuudessa sisäänkäynti ja julkisivu katsovat kaakkoon (talvipäivänseisauksen auringonnousu,
    /// OpenStreetMap noin 139°). Malli on käännetty noin 41° myötäpäivään (ylhäältä), joten sisäänkäynti katsoo suoraan kameraan
    /// (−Z) ja Boynen mutka on edessä (todellisuudessa etelä–kaakossa noin 0,7 km:n päässä). Kummun pitkä akseli (85 m) on X:llä.
    /// Liikkuvat osat (liike: malli/Elava/ErikoisLiikeNewgrange.cs, NewgrangeLiike):
    ///   joutsen0–5    uiva laulujoutsen (pivot vesirajassa kotipaikalla joella; siemen näyttää 3–6)
    ///   vana0–5       joutsenen V-vana ja nousun ja laskun vaahtojuova (pivot sama kuin joutsenella)
    ///   lento0–5      lentävä joutsen, kaula suorana ja siivet levällään (pivot sama kuin joutsenella)
    ///   sade          talvipäivänseisauksen kultainen säde mallin etureunasta kattoaukkoon (pivot etureunassa)
    ///   kattoaukko    kattoaukon hehku (pivot kattoaukossa)
    ///   kaytava1–3    käytävän linja hehkuu kummun pinnalla kolmena pätkänä (pivot kunkin alussa pinnalla)
    ///   kammio        ristinmuotoinen kammio hehkuu kummun läpi (pivot keskellä pinnalla)
    ///   pari0–1       yön legenda: Aenguksen ja Caerin joutsenpari lentää kummun yli (pivot kummun yllä)
    /// Kaikki liikkuvat osat ovat pienistä paloista ilman ääriviivaryhmää.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Kummun puoliakselit (X 85 m, Z 79 m) ja keskipisteen z (jalanjäljen keskikohta on juuressa).</summary>
        const float NgrKx = 0.327f, NgrKz = 0.304f, NgrKumpuZ = 0.07f;
        /// <summary>Reunakivikehä: yläpinnan korkeus ja ulkopinnan normitettu säde alhaalla ja ylhäällä. Julkisivu ja muuri
        /// alkavat reunakivien yläpinnan takareunasta (NgrJuuri).</summary>
        const float NgrReunaH = 0.018f, NgrReunaAla = 1.035f, NgrReunaYla = 1.029f, NgrJuuri = 0.99f;
        /// <summary>Julkisivu (etukaari): yläreunan säde ja korkeus sekä kvartsiharjan sisäreuna. Julkisivu kallistuu hieman taakse,
        /// jotta valkoinen sirppi näkyy myös ylhäältä. Takana kuivakivimuurin yläreuna.</summary>
        const float NgrJulkisivuRho = 0.91f, NgrJulkisivuH = 0.072f, NgrHarjaRho = 0.87f, NgrHarjaH = 0.085f,
            NgrMuuriRho = 0.972f, NgrMuuriH = 0.03f;
        /// <summary>Julkisivun kaari: täysi korkeus ±73° sisäänkäynnistä, ja se madaltuu muuriksi 12°:n matkalla (noin puolet
        /// kehästä, kuten ilmakuvassa).</summary>
        const float NgrJulkisivuTaysi = 73f, NgrJulkisivuRampa = 12f;
        /// <summary>Kuvun renkaat (normitettu säde ja korkeus) ja laki: jyrkkä reuna, laaja ja lähes tasainen laki.</summary>
        static readonly float[] NgrRengasRho = { 0.74f, 0.55f, 0.33f };
        static readonly float[] NgrRengasY = { 0.135f, 0.168f, 0.182f };
        const float NgrLakiY = 0.186f;
        /// <summary>Kuvun sektorit rungossa ja lähitasossa (sektorin kärki on sisäänkäynnin akselilla −90°).</summary>
        const int NgrSektorit = 32, NgrLahiSektorit = 48;

        /// <summary>Sisäänkäynti: syvennyksen puolileveys, takaseinän z ja aukkojen korkeudet (oven alareuna on reunakivien
        /// yläpinnan tasossa).</summary>
        const float NgrOviPuoli = 0.027f, NgrTakaseinaZ = -0.203f;
        const float NgrOviYla = 0.041f, NgrKansiYla = 0.0465f, NgrAukkoYla = 0.058f, NgrAukkoKansiYla = 0.064f, NgrLaattaY = 0.0755f;

        /// <summary>Boyne: keskilinja z = Z0 + K · x² (mutka, päät kaartuvat kummun puolelle), puolileveys ja veden pinta.
        /// SAMAT VAKIOT liikeytimessä (NewgrangeLiike): muuta molemmat.</summary>
        const float NgrJokiZ0 = -0.352f, NgrJokiK = 0.35f, NgrJokiPuoli = 0.029f, NgrVesiY = 0.0015f;
        /// <summary>Joutsenten kotipaikat joella (x); pivotit ovat keskilinjalla veden pinnassa. SAMA TAULUKKO liikeytimessä.</summary>
        static readonly float[] NgrKotiX = { -0.235f, -0.14f, -0.05f, 0.045f, 0.135f, 0.225f };

        /// <summary>Talvipäivänseisauksen säde: pivot mallin etureunassa akselilla ja pää kattoaukossa.</summary>
        static readonly Vector3 NgrSadePivot = new Vector3(0f, 0.012f, -0.392f);
        /// <summary>Käytävän pätkien rajat (normitettu säde akselilla): kattoaukon yläpuolelta renkaille ja käytävän päähän (19 m),
        /// ja kammion keskipiste (noin 22 m sisäänkäynnistä).</summary>
        static readonly float[] NgrKaytavaRho = { 0.87f, 0.74f, 0.645f, 0.55f };
        const float NgrKammioRho = 0.45f, NgrHehkuNosto = 0.003f;
        /// <summary>Yön joutsenparin pivotit kummun yllä.</summary>
        static readonly Vector3 NgrPari0 = new Vector3(-0.03f, 0.28f, 0f), NgrPari1 = new Vector3(0.03f, 0.28f, 0f);

        // ---- Paletti (Em-seepiaramppi; yksi aksentti = kulta vain tapahtumassa) ----

        /// <summary>Nurmikupu hillittynä oliivina (keskisävy, jottei laaja pinta lue tyhjänä maana).</summary>
        static readonly Color NgrNurmi = Hex(0xa4a975);
        /// <summary>Kuivakivimuuri ja reunakivet lämpimän harmaina (kolme sävyä vuorotellen) sekä reunakivien yläpinta.</summary>
        static readonly Color NgrMuuri = Hex(0x9a9281), NgrReuna = Hex(0x9a9383), NgrReuna2 = Hex(0xa39c8b), NgrReuna3 = Hex(0x938c7c),
            NgrReunaLaki = Hex(0xaaa392);
        /// <summary>Suuren kehän pystykivet ja niiden laki.</summary>
        static readonly Color NgrPysty = Hex(0xa89f8a), NgrPystyLaki = Hex(0xbfb6a0);
        /// <summary>Kvartsijulkisivu (paperi), sen yläreunan kvartsiraja lähitasossa ja graniittimukulat.</summary>
        static readonly Color NgrKvartsi = Hex(0xece5d3), NgrKvartsiRaja = Hex(0xf6f1e3), NgrGraniitti = Hex(0x6b6253);
        /// <summary>Sisäänkäynti: syvennys, ovi ja kattoaukko (muste), oven ja kattoaukon kansikivet ja katon laatta.</summary>
        static readonly Color NgrSyvennys = Hex(0x5f584c), NgrAukko = Hex(0x2f261c), NgrKansikivi = Hex(0xb7af9b), NgrLaatta = Hex(0x7a7262);
        /// <summary>Sisäänkäyntikivi K1 (vaaleampi kivi) ja kaislat.</summary>
        static readonly Color NgrK1 = Hex(0xa39b88), NgrKaisla = Hex(0x8e9566);
        /// <summary>Joutsen: lämmin valkoinen, nokan tyvi keltainen (laulujoutsenen tuntomerkki) ja kärki muste; legendan pari
        /// kirkkaan valkoinen.</summary>
        static readonly Color NgrJoutsenVari = Hex(0xf4f0e6), NgrNokka = Hex(0xd6b24e), NgrPariVari = Hex(0xfbf8f0);
        /// <summary>Kultainen hehku (kuten Nidarosin ruusuikkuna): ydin ja kehä; uloin vyö EmKulta.</summary>
        static readonly Color NgrYdin = Hex(0xfff0cc), NgrKeha = Hex(0xf0c070);

        // ---- Geometrian apurit ----

        /// <summary>Kummun piste: kulma φ (astetta, −90 = sisäänkäynti kameraa kohti), normitettu säde ρ ja korkeus y.</summary>
        static Vector3 NgrP(float phi, float rho, float y)
        {
            float a = phi * Mathf.PI / 180f;
            return new Vector3(NgrKx * rho * Mathf.Cos(a), y, NgrKumpuZ + NgrKz * rho * Mathf.Sin(a));
        }

        /// <summary>Kulmien ero (−180…180).</summary>
        static float NgrKulmaEro(float a, float b)
        {
            float d = (a - b) % 360f;
            if (d > 180f) d -= 360f;
            if (d < -180f) d += 360f;
            return d;
        }

        /// <summary>Julkisivun osuus kulmassa φ: 1 etukaarella, 0 takana muurin kohdalla, pehmeä siirtymä päissä.</summary>
        static float NgrOsuus(float phi)
        {
            float d = Mathf.Abs(NgrKulmaEro(phi, -90f));
            return 1f - Mathf.SmoothStep(0f, 1f, (d - NgrJulkisivuTaysi) / NgrJulkisivuRampa);
        }

        /// <summary>Julkisivun tai muurin yläreuna kulmassa φ.</summary>
        static Vector3 NgrYla(float phi)
        {
            float f = NgrOsuus(phi);
            return NgrP(phi, Mathf.Lerp(NgrMuuriRho, NgrJulkisivuRho, f), Mathf.Lerp(NgrMuuriH, NgrJulkisivuH, f));
        }

        /// <summary>Kuvun alin rengas (kvartsiharjan sisäreuna; takana sama kuin muurin yläreuna).</summary>
        static Vector3 NgrHarja(float phi)
        {
            float f = NgrOsuus(phi);
            return NgrP(phi, Mathf.Lerp(NgrMuuriRho, NgrHarjaRho, f), Mathf.Lerp(NgrMuuriH, NgrHarjaH, f));
        }

        /// <summary>Kuvun pinnan korkeus akselilla (φ = −90°) normitetulla säteellä ρ (renkaiden välillä lineaarinen kuten verkossa).</summary>
        static float NgrKupuY(float rho)
        {
            if (rho >= NgrHarjaRho) return NgrHarjaH;
            float r0 = NgrHarjaRho, y0 = NgrHarjaH;
            for (int k = 0; k < NgrRengasRho.Length; k++)
            {
                float r1 = NgrRengasRho[k], y1 = NgrRengasY[k];
                if (rho >= r1) return Mathf.Lerp(y0, y1, (r0 - rho) / (r0 - r1));
                r0 = r1; y0 = y1;
            }
            return Mathf.Lerp(y0, NgrLakiY, (r0 - rho) / r0);
        }

        /// <summary>Kuvun pinnan piste akselilla (x = 0) normitetulla säteellä ρ.</summary>
        static Vector3 NgrAkselilla(float rho) => new Vector3(0f, NgrKupuY(rho), NgrKumpuZ - NgrKz * rho);

        /// <summary>Janan a → b piste, jonka x on annettu (sisäänkäynnin syvennyksen reunat sektorin jänteellä).</summary>
        static Vector3 NgrLeikkaa(Vector3 a, Vector3 b, float x) => Vector3.Lerp(a, b, (x - a.x) / (b.x - a.x));

        /// <summary>Piste n-sektorisen renkaan jänteellä kulmassa φ (verkon pinta, ei ellipsin kaari).</summary>
        static Vector3 NgrJanteella(float phi, float rho, float y, int n)
        {
            float d = 360f / n;
            float k = (float)Math.Floor((phi + 90f) / d);
            float p0 = -90f + k * d;
            return Vector3.Lerp(NgrP(p0, rho, y), NgrP(p0 + d, rho, y), (phi - p0) / d);
        }

        /// <summary>Julkisivun pinnan piste (jänteillä) kulmassa φ ja suhteellisella korkeudella s (0 = juuri, 1 = yläreuna) sekä
        /// pinnan suunnat: t vaakasuunta ja u ylös pintaa pitkin, n ulospäin.</summary>
        static Vector3 NgrJulkisivulla(float phi, float s, int n, out Vector3 t, out Vector3 u, out Vector3 nn)
        {
            Vector3 a = NgrJanteella(phi, NgrJuuri, NgrReunaH, n);
            float f = NgrOsuus(phi);
            Vector3 b = NgrJanteella(phi, Mathf.Lerp(NgrMuuriRho, NgrJulkisivuRho, f), Mathf.Lerp(NgrMuuriH, NgrJulkisivuH, f), n);
            Vector3 a2 = NgrJanteella(phi + 0.5f, NgrJuuri, NgrReunaH, n);
            t = (a2 - a); t.y = 0f; t = t.normalized;
            u = (b - a).normalized;
            nn = Vector3.Cross(u, t).normalized;
            var ulos = a - new Vector3(0f, a.y, NgrKumpuZ); ulos.y = 0f;
            if (Vector3.Dot(nn, ulos) < 0f) nn = -nn;
            return Vector3.Lerp(a, b, s);
        }

        /// <summary>Nelikulmio tason pinnalle: keskipiste c, suunnat t (leveys) ja u (korkeus), etupuoli n:n suuntaan.</summary>
        static void NgrPintaLaatta(Rakentaja r, Vector3 c, Vector3 t, Vector3 u, float w, float h, Vector3 n, Color vari)
        {
            Vector3 a = t * (w * 0.5f), b = u * (h * 0.5f);
            r.NelioUlos(c - a - b, c + a - b, c + a + b, c - a + b, n, vari);
        }

        /// <summary>Kuusikulmio tason pinnalle (graniittimukula, spiraalin pyörre): 4 kolmiota.</summary>
        static void NgrKuusikulmio(Rakentaja r, Vector3 c, Vector3 t, Vector3 u, float rx, float ry, float kulma, Vector3 n, Color vari)
        {
            var p = new Vector3[6];
            for (int i = 0; i < 6; i++)
            {
                float a = kulma + i * Mathf.PI / 3f;
                p[i] = c + t * (Mathf.Cos(a) * rx) + u * (Mathf.Sin(a) * ry);
            }
            r.KolmioUlos(p[0], p[1], p[2], n, vari);
            r.KolmioUlos(p[0], p[2], p[3], n, vari);
            r.KolmioUlos(p[0], p[3], p[5], n, vari);
            r.KolmioUlos(p[3], p[4], p[5], n, vari);
        }

        /// <summary>Kapeneva monikulmainen särmiö akselia a → b pitkin (kaula, pää, nokka, runko): renkaat akselia vastaan
        /// kohtisuorassa tasossa, säteet ra → rb, sivuja k, kansi valinnainen. Ei ääriviivaa (pieni osa).</summary>
        static void NgrSarmio(Rakentaja r, Vector3 a, Vector3 b, float ra, float rb, int k, Color vari, float kulma = 0f,
            bool alkukansi = false, bool loppukansi = false)
        {
            var ak = (b - a).normalized;
            var apu = Mathf.Abs(ak.y) > 0.9f ? Vector3.forward : Vector3.up;
            var e1 = Vector3.Cross(apu, ak).normalized;
            var e2 = Vector3.Cross(ak, e1).normalized;
            var keski = (a + b) * 0.5f;
            var d = new Vector3[k];
            for (int i = 0; i < k; i++) { float an = kulma + i * Mathf.PI * 2f / k; d[i] = e1 * Mathf.Cos(an) + e2 * Mathf.Sin(an); }
            for (int i = 0; i < k; i++)
            {
                int j = (i + 1) % k;
                if (rb > 1e-5f) r.NelioKeskelta(a + d[i] * ra, a + d[j] * ra, b + d[j] * rb, b + d[i] * rb, keski, vari);
                else r.KolmioKeskelta(a + d[i] * ra, a + d[j] * ra, b, keski, vari);
            }
            // Kannet viuhkana ensimmäisestä kärjestä (k − 2 kolmiota).
            for (int i = 1; i + 1 < k; i++)
            {
                if (alkukansi) r.KolmioUlos(a + d[0] * ra, a + d[i] * ra, a + d[i + 1] * ra, -ak, vari);
                if (loppukansi && rb > 1e-5f) r.KolmioUlos(b + d[0] * rb, b + d[i] * rb, b + d[i + 1] * rb, ak, vari);
            }
        }

        /// <summary>Toistettava pseudosatunnainen luku 0–1 (mallin rakentamiseen, sama joka kerta).</summary>
        static float NgrArpa(int n)
        {
            unchecked
            {
                uint h = (uint)n * 2654435761u ^ 0x5bd1e995u;
                h ^= h >> 15; h *= 2246822519u; h ^= h >> 13; h *= 3266489917u; h ^= h >> 16;
                return (h & 0xffffff) / (float)0x1000000;
            }
        }

        /// <summary>Boynen keskilinja (z kohdassa x) ja puolileveys (päät kapenevat karttaan).</summary>
        static float NgrJokiZ(float x) => NgrJokiZ0 + NgrJokiK * x * x;
        static float NgrJokiLeveys(float x)
        {
            float a = Mathf.Abs(x);
            return NgrJokiPuoli * (1f - 0.62f * Mathf.SmoothStep(0f, 1f, (a - 0.36f) / 0.14f));
        }

        // ---- Runko ----

        static Mesh NewgrangeRunko()
        {
            var r = new Rakentaja();
            NgrJoki(r, false);
            NgrKumpu(r, false);
            NgrSisaankayntikivi(r, false);
            NgrPystykivet(r, false);
            NgrKaislat(r, false);
            return r.Verkko("Newgrange");
        }

        /// <summary>
        /// Kumpu yhtenä ääriviivaosana (reunakivet, julkisivu, kuivakivimuuri, kvartsiharja, kupu, sisäänkäynti ja
        /// graniittimukulat), joten musteviiva kiertää kummun juurta. Sektorin kärki on sisäänkäynnin akselilla, jolloin käytävän
        /// ja kammion hehku asettuu kuvun tasaisille kaistoille. Lähitasossa reunakivet ovat yksittäisiä kiviä.
        /// </summary>
        static void NgrKumpu(Rakentaja r, bool lahi)
        {
            int n = lahi ? NgrLahiSektorit : NgrSektorit;
            r.AloitaOsa();
            if (lahi) NgrLhReunakivet(r);
            for (int i = 0; i < n; i++) NgrSektori(r, i, n, lahi);
            NgrSisaankaynti(r, n, lahi);
            NgrMukulat(r, n, lahi);
            if (lahi) { NgrLhMuurinRivit(r, n); NgrLhK52(r); }
            r.LopetaOsa();
        }

        /// <summary>Reunakiven sävy (kolme sävyä vuorotellen rungon kaistassa).</summary>
        static Color NgrReunaSavy(int i) => (i % 3) == 0 ? NgrReuna : (i % 3) == 1 ? NgrReuna2 : NgrReuna3;

        /// <summary>
        /// Yksi sektori: rungossa reunakivikaista (ulkopinta ja yläpinta), julkisivu tai kuivakivimuuri, kvartsiharja (etukaarella)
        /// ja kuvun kaistat lakeen asti. Sisäänkäynnin molemmin puolin olevat sektorit leikataan syvennyksen reunaan.
        /// </summary>
        static void NgrSektori(Rakentaja r, int i, int n, bool lahi)
        {
            float d = 360f / n, p0 = -90f + i * d, p1 = p0 + d;
            var keski = new Vector3(0f, -0.4f, NgrKumpuZ);
            if (!lahi)
            {
                Vector3 a0 = NgrP(p0, NgrReunaAla, 0f), a1 = NgrP(p1, NgrReunaAla, 0f);
                Vector3 b0 = NgrP(p0, NgrReunaYla, NgrReunaH), b1 = NgrP(p1, NgrReunaYla, NgrReunaH);
                Vector3 c0 = NgrP(p0, NgrJuuri, NgrReunaH), c1 = NgrP(p1, NgrJuuri, NgrReunaH);
                r.NelioKeskelta(a0, a1, b1, b0, keski, NgrReunaSavy(i));
                r.NelioKeskelta(b0, b1, c1, c0, keski, NgrReunaLaki);
            }
            // Julkisivu tai muuri (juuresta yläreunaan) ja kvartsiharja (yläreunasta kuvun alimpaan renkaaseen).
            Vector3 j0 = NgrP(p0, NgrJuuri, NgrReunaH), j1 = NgrP(p1, NgrJuuri, NgrReunaH);
            Vector3 w0 = NgrYla(p0), w1 = NgrYla(p1), e0 = NgrHarja(p0), e1 = NgrHarja(p1);
            float fm = NgrOsuus(p0 + d * 0.5f);
            bool harja = NgrOsuus(p0) > 0.001f || NgrOsuus(p1) > 0.001f;
            Vector3 fj0 = j0, fj1 = j1, fw0 = w0, fw1 = w1, fe0 = e0, fe1 = e1;
            if (i == 0)
            {
                fj0 = NgrLeikkaa(j0, j1, NgrOviPuoli); fw0 = NgrLeikkaa(w0, w1, NgrOviPuoli); fe0 = NgrLeikkaa(e0, e1, NgrOviPuoli);
            }
            else if (i == n - 1)
            {
                fj1 = NgrLeikkaa(j0, j1, -NgrOviPuoli); fw1 = NgrLeikkaa(w0, w1, -NgrOviPuoli); fe1 = NgrLeikkaa(e0, e1, -NgrOviPuoli);
            }
            Color seina = fm > 0.5f ? NgrKvartsi : NgrMuuri;
            if (lahi && fm > 0.5f)
            {
                // Lähitaso: julkisivun yläreunassa kirkkaampi kvartsiraja (oma kaista, ei päällekkäistä pintaa).
                Vector3 m0 = Vector3.Lerp(fj0, fw0, 0.9f), m1 = Vector3.Lerp(fj1, fw1, 0.9f);
                r.NelioKeskelta(fj0, fj1, m1, m0, keski, seina);
                r.NelioKeskelta(m0, m1, fw1, fw0, keski, NgrKvartsiRaja);
            }
            else r.NelioKeskelta(fj0, fj1, fw1, fw0, keski, seina);
            if (harja) r.NelioKeskelta(fw0, fw1, fe1, fe0, keski, NgrKvartsi);
            // Kuvun kaistat ja laki.
            Vector3 q0 = e0, q1 = e1;
            for (int k = 0; k < NgrRengasRho.Length; k++)
            {
                Vector3 s0 = NgrP(p0, NgrRengasRho[k], NgrRengasY[k]), s1 = NgrP(p1, NgrRengasRho[k], NgrRengasY[k]);
                r.NelioKeskelta(q0, q1, s1, s0, keski, NgrNurmi);
                q0 = s0; q1 = s1;
            }
            r.KolmioKeskelta(q0, q1, new Vector3(0f, NgrLakiY, NgrKumpuZ), keski, NgrNurmi);
        }

        /// <summary>
        /// Sisäänkäynti julkisivun keskellä: tumma syvennys (sivuseinät, lattia ja takaseinä), ovi ja sen kansikivi, kattoaukko ja
        /// sen koristeltu kansikivi sekä katon laatta syvennyksen yllä (ylhäältä harmaa suorakulmio valkoisessa sirpissä).
        /// Lähitasossa sivuseinät kaartuvat sisään, kansikivissä on kaiverrukset ja ovessa näkyvät käytävän ensimmäiset pystykivet.
        /// </summary>
        static void NgrSisaankaynti(Rakentaja r, int n, bool lahi)
        {
            float d = 360f / n;
            float xo = NgrOviPuoli;
            // Syvennyksen reunat sektorien jänteillä (samat pisteet kuin julkisivun leikkauksessa).
            Vector3 jv = NgrLeikkaa(NgrP(-90f - d, NgrJuuri, NgrReunaH), NgrP(-90f, NgrJuuri, NgrReunaH), -xo);
            Vector3 jo = NgrLeikkaa(NgrP(-90f, NgrJuuri, NgrReunaH), NgrP(-90f + d, NgrJuuri, NgrReunaH), xo);
            Vector3 wv = NgrLeikkaa(NgrYla(-90f - d), NgrYla(-90f), -xo), wo = NgrLeikkaa(NgrYla(-90f), NgrYla(-90f + d), xo);
            Vector3 ev = NgrLeikkaa(NgrHarja(-90f - d), NgrHarja(-90f), -xo), eo = NgrLeikkaa(NgrHarja(-90f), NgrHarja(-90f + d), xo);
            Vector3 jk = NgrP(-90f, NgrJuuri, NgrReunaH), wk = NgrYla(-90f), ek = NgrHarja(-90f);
            float zb = NgrTakaseinaZ, y0 = NgrReunaH, yl = NgrLaattaY;
            // Takaseinän alanurkat ja ylänurkat.
            float xb = lahi ? xo - 0.004f : xo;
            Vector3 bv0 = new Vector3(-xb, y0, zb), bo0 = new Vector3(xb, y0, zb), bv1 = new Vector3(-xb, yl, zb), bo1 = new Vector3(xb, yl, zb);
            // Sivuseinät (lähitasossa kaartuvat kahtena lohkona syvennykseen).
            if (lahi)
            {
                Vector3 mv0 = Vector3.Lerp(jv, bv0, 0.5f) + new Vector3(0.0022f, 0f, 0f), mo0 = Vector3.Lerp(jo, bo0, 0.5f) - new Vector3(0.0022f, 0f, 0f);
                Vector3 mv1 = Vector3.Lerp(wv, bv1, 0.5f) + new Vector3(0.0022f, 0f, 0f), mo1 = Vector3.Lerp(wo, bo1, 0.5f) - new Vector3(0.0022f, 0f, 0f);
                mv1.y = Mathf.Lerp(wv.y, yl, 0.5f); mo1.y = Mathf.Lerp(wo.y, yl, 0.5f);
                r.NelioUlos(jv, mv0, mv1, wv, new Vector3(1f, 0f, -0.3f), NgrKvartsi);
                r.NelioUlos(mv0, bv0, bv1, mv1, new Vector3(1f, 0f, -0.6f), NgrSyvennys);
                r.NelioUlos(jo, mo0, mo1, wo, new Vector3(-1f, 0f, -0.3f), NgrKvartsi);
                r.NelioUlos(mo0, bo0, bo1, mo1, new Vector3(-1f, 0f, -0.6f), NgrSyvennys);
                // Lattia (kulunut kivi) ja katon laatta kolmena palana.
                r.NelioUlos(jv, jk, new Vector3(0f, y0, zb), bv0, Vector3.up, NgrLaatta);
                r.NelioUlos(jk, jo, bo0, new Vector3(0f, y0, zb), Vector3.up, NgrLaatta);
            }
            else
            {
                r.NelioUlos(jv, bv0, bv1, wv, Vector3.right, NgrSyvennys);
                r.NelioUlos(jo, bo0, bo1, wo, Vector3.left, NgrSyvennys);
                r.NelioUlos(jv, jk, new Vector3(0f, y0, zb), bv0, Vector3.up, NgrSyvennys);
                r.NelioUlos(jk, jo, bo0, new Vector3(0f, y0, zb), Vector3.up, NgrSyvennys);
            }
            // Takaseinä.
            r.NelioUlos(bv0, bo0, bo1, bv1, Vector3.back, NgrSyvennys);
            // Katon laatta: julkisivun yläreunasta kuvun alimpaan renkaaseen (kaksi puolikasta jänteillä).
            Vector3 lv = wv, lo = wo; lv.y = yl; lo.y = yl;
            Vector3 lk = wk; lk.y = yl;
            r.NelioUlos(lv, lk, ek, ev, Vector3.up, NgrLaatta);
            r.NelioUlos(lk, lo, eo, ek, Vector3.up, NgrLaatta);
            // Laatan etureuna (julkisivun yläreunan ja laatan välinen pieni pystypinta).
            r.NelioUlos(wv, wk, lk, lv, Vector3.back, NgrLaatta);
            r.NelioUlos(wk, wo, lo, lk, Vector3.back, NgrLaatta);
            // Ovi, kansikivi, kattoaukko ja kattoaukon kansikivi takaseinän edessä.
            float zo = zb - 0.0008f, zk = zb - 0.0016f;
            r.NelioUlos(new Vector3(-0.0085f, y0, zo), new Vector3(0.0085f, y0, zo), new Vector3(0.0085f, NgrOviYla, zo), new Vector3(-0.0085f, NgrOviYla, zo),
                Vector3.back, NgrAukko);
            r.NelioUlos(new Vector3(-0.0135f, NgrOviYla, zk), new Vector3(0.0135f, NgrOviYla, zk), new Vector3(0.0135f, NgrKansiYla, zk),
                new Vector3(-0.0135f, NgrKansiYla, zk), Vector3.back, NgrKansikivi);
            r.NelioUlos(new Vector3(-0.0075f, NgrKansiYla, zo), new Vector3(0.0075f, NgrKansiYla, zo), new Vector3(0.0075f, NgrAukkoYla, zo),
                new Vector3(-0.0075f, NgrAukkoYla, zo), Vector3.back, NgrAukko);
            r.NelioUlos(new Vector3(-0.014f, NgrAukkoYla, zk), new Vector3(0.014f, NgrAukkoYla, zk), new Vector3(0.014f, NgrAukkoKansiYla, zk),
                new Vector3(-0.014f, NgrAukkoKansiYla, zk), Vector3.back, NgrKansikivi);
            if (!lahi) return;
            // Lähitaso: kansikivien kaiverrukset (kattoaukon kansikiven X-kuvio ja oven kansikiven urat) ja käytävän
            // ensimmäiset pystykivet oviaukossa.
            float zu = zk - 0.0006f;
            for (int k = 0; k < 4; k++)
            {
                float x = -0.009f + k * 0.006f;
                r.KolmioUlos(new Vector3(x - 0.0022f, NgrAukkoYla + 0.0008f, zu), new Vector3(x + 0.0022f, NgrAukkoYla + 0.0008f, zu),
                    new Vector3(x, NgrAukkoKansiYla - 0.0008f, zu), Vector3.back, NgrSyvennys);
            }
            r.NelioUlos(new Vector3(-0.0105f, NgrOviYla + 0.0019f, zu), new Vector3(0.0105f, NgrOviYla + 0.0019f, zu),
                new Vector3(0.0105f, NgrOviYla + 0.0027f, zu), new Vector3(-0.0105f, NgrOviYla + 0.0027f, zu), Vector3.back, NgrSyvennys);
            foreach (float s in new[] { -1f, 1f })
            {
                float x0 = s * 0.0068f, x1 = s * 0.0042f, zp = zb - 0.0012f;
                r.NelioUlos(new Vector3(x0, y0, zp), new Vector3(x1, y0, zp), new Vector3(x1, NgrOviYla - 0.002f, zp), new Vector3(x0, NgrOviYla - 0.0015f, zp),
                    Vector3.back, NgrMuuri);
            }
        }

        /// <summary>Graniittimukulat julkisivussa (tummat pyöreät kivet kvartsin seassa): rungossa 20 nelikulmiota, lähitasossa 46
        /// kuusikulmiota; paikat siemenestä, eivät sisäänkäynnin kohdalla.</summary>
        static void NgrMukulat(Rakentaja r, int n, bool lahi)
        {
            int maara = lahi ? 46 : 20;
            int k = 0;
            for (int m = 0; k < maara && m < 400; m++)
            {
                float phi = Mathf.Lerp(-90f - 70f, -90f + 70f, NgrArpa(m * 3 + 1));
                if (Mathf.Abs(phi + 90f) < 7.5f) continue;
                float s = Mathf.Lerp(0.16f, 0.84f, NgrArpa(m * 3 + 2));
                var c = NgrJulkisivulla(phi, s, n, out var t, out var u, out var nn) + nn * 0.0011f;
                float koko = lahi ? Mathf.Lerp(0.0026f, 0.0038f, NgrArpa(m * 3 + 3)) : 0.0034f;
                if (lahi) NgrKuusikulmio(r, c, t, u, koko, koko * 0.85f, NgrArpa(m * 7 + 5) * 1.0f, nn, NgrGraniitti);
                else NgrPintaLaatta(r, c, t, u, koko * 1.9f, koko * 1.55f, nn, NgrGraniitti);
                k++;
            }
        }

        /// <summary>Sisäänkäyntikivi K1 (noin 3 × 1,2 m, spiraalikoristeinen) makaa reunakivien edessä akselilla. Pieni osa ilman
        /// ääriviivaa. Lähitasossa etupinnalla kolmoisspiraali (kolme pyörrettä).</summary>
        static void NgrSisaankayntikivi(Rakentaja r, bool lahi)
        {
            float zc = NgrKumpuZ - NgrKz * NgrReunaAla - 0.0055f;
            const float L = 0.0145f, D = 0.0062f, H = 0.0175f;
            // Pyöristetty kivi: kahdeksankulmainen pohja ja hieman kapeampi laki.
            var ala = new Vector3[8]; var yla = new Vector3[8];
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI / 4f + Mathf.PI / 8f;
                float cx = Mathf.Cos(a), cz = Mathf.Sin(a);
                ala[i] = new Vector3(cx * L, 0f, zc + cz * D);
                yla[i] = new Vector3(cx * L * 0.9f, H * (0.93f + 0.07f * Mathf.Abs(cz)), zc + cz * D * 0.7f);
            }
            var keski = new Vector3(0f, H * 0.4f, zc);
            for (int i = 0; i < 8; i++)
            {
                int j = (i + 1) % 8;
                // Vain kameran ja ylhäältä näkyvät pinnat (takapinnat reunakiviä vasten jätetään pois).
                if (Mathf.Sin(i * Mathf.PI / 4f + Mathf.PI / 4f) > 0.75f) continue;
                r.NelioKeskelta(ala[i], ala[j], yla[j], yla[i], keski, NgrK1);
            }
            r.KolmioUlos(yla[0], yla[1], yla[2], Vector3.up, NgrK1);
            r.KolmioUlos(yla[0], yla[2], yla[7], Vector3.up, NgrK1);
            r.KolmioUlos(yla[7], yla[2], yla[3], Vector3.up, NgrK1);
            r.KolmioUlos(yla[7], yla[3], yla[6], Vector3.up, NgrK1);
            r.KolmioUlos(yla[6], yla[3], yla[4], Vector3.up, NgrK1);
            r.KolmioUlos(yla[6], yla[4], yla[5], Vector3.up, NgrK1);
            if (!lahi) return;
            // Kolmoisspiraali etupinnalla: kolme pyörrettä kahtena sisäkkäisenä kaarena.
            float zf = zc - D * 0.93f - 0.0004f;
            foreach (var (sx, sy, rr) in new[] { (-0.0075f, 0.0085f, 0.0034f), (0.0005f, 0.0095f, 0.0036f), (0.0082f, 0.0082f, 0.0032f) })
            {
                for (int k = 0; k < 7; k++)
                {
                    float a0 = k * 0.95f, a1 = (k + 1) * 0.95f;
                    float r0 = rr * (1f - k * 0.1f), r1 = rr * (1f - (k + 1) * 0.1f);
                    var c0 = new Vector3(sx + Mathf.Cos(a0) * r0, sy + Mathf.Sin(a0) * r0 * 0.9f, zf);
                    var c1 = new Vector3(sx + Mathf.Cos(a1) * r1, sy + Mathf.Sin(a1) * r1 * 0.9f, zf);
                    var nrm = new Vector3(-(c1.y - c0.y), c1.x - c0.x, 0f).normalized * 0.00045f;
                    r.NelioUlos(new Vector3(c0.x - nrm.x, c0.y - nrm.y, zf), new Vector3(c1.x - nrm.x, c1.y - nrm.y, zf),
                        new Vector3(c1.x + nrm.x, c1.y + nrm.y, zf), new Vector3(c0.x + nrm.x, c0.y + nrm.y, zf), Vector3.back, NgrSyvennys);
                }
            }
        }

        /// <summary>Suuren kiven kehän pystykivet: kulma φ, normitettu säde, korkeus, leveys, paksuus ja kallistus. Neljä
        /// korkeinta sisäänkäynnin edessä (aukko akselilla säteelle), muut sivuilla lyhyempinä ja osin katkenneina.</summary>
        static readonly (float phi, float rho, float h, float w, float t, float kallistus)[] NgrPystyTaulu =
        {
            (-98.5f, 1.235f, 0.041f, 0.0125f, 0.0085f, 0.06f), (-106.5f, 1.225f, 0.036f, 0.012f, 0.008f, -0.1f),
            (-81.5f, 1.235f, 0.042f, 0.013f, 0.0085f, -0.05f), (-73.5f, 1.225f, 0.035f, 0.0115f, 0.008f, 0.12f),
            (-117f, 1.215f, 0.028f, 0.011f, 0.0075f, 0.15f), (-128f, 1.255f, 0.019f, 0.0105f, 0.0075f, -0.2f),
            (-139f, 1.225f, 0.03f, 0.011f, 0.008f, 0.08f), (-151f, 1.25f, 0.022f, 0.0105f, 0.0075f, -0.12f),
            (-63f, 1.22f, 0.03f, 0.0115f, 0.008f, -0.1f), (-53.5f, 1.25f, 0.02f, 0.01f, 0.0075f, 0.2f),
            (-42f, 1.215f, 0.027f, 0.011f, 0.0075f, -0.08f), (-30f, 1.245f, 0.016f, 0.0105f, 0.007f, 0.1f),
        };

        /// <summary>Pystykivet pieninä osina ilman ääriviivaa: rungossa nelisivuinen kapeneva kivi ja laki (10 kolmiota), lähitasossa
        /// epäsäännöllisempi kuusisivuinen kivi (16 kolmiota).</summary>
        static void NgrPystykivet(Rakentaja r, bool lahi)
        {
            for (int s = 0; s < NgrPystyTaulu.Length; s++)
            {
                var k = NgrPystyTaulu[s];
                var p = NgrP(k.phi, k.rho, 0f);
                float a = k.phi * Mathf.PI / 180f;
                // Pitkä sivu kehän tangentin suuntaan.
                var tang = new Vector3(-NgrKx * Mathf.Sin(a), 0f, NgrKz * Mathf.Cos(a)).normalized;
                var rad = new Vector3(tang.z, 0f, -tang.x);
                int sivuja = lahi ? 6 : 4;
                var ala = new Vector3[sivuja]; var yla = new Vector3[sivuja];
                for (int i = 0; i < sivuja; i++)
                {
                    float b = (i + 0.5f) * Mathf.PI * 2f / sivuja;
                    float kohina = lahi ? 0.85f + 0.3f * NgrArpa(s * 31 + i) : 1f;
                    float cx = Mathf.Cos(b) * kohina, cz = Mathf.Sin(b) * kohina;
                    ala[i] = p + tang * (cx * k.w * 0.72f) + rad * (cz * k.t * 0.72f);
                    float hy = k.h * (lahi ? 0.9f + 0.18f * NgrArpa(s * 31 + i + 11) : (i % 2 == 0 ? 1f : 0.93f));
                    yla[i] = p + tang * (cx * k.w * 0.5f + k.kallistus * k.h * 0.3f) + rad * (cz * k.t * 0.52f) + Vector3.up * hy;
                }
                var keski = p + Vector3.up * (k.h * 0.45f);
                for (int i = 0; i < sivuja; i++)
                {
                    int j = (i + 1) % sivuja;
                    r.NelioKeskelta(ala[i], ala[j], yla[j], yla[i], keski, NgrPysty);
                }
                for (int i = 1; i + 1 < sivuja; i++) r.KolmioKeskelta(yla[0], yla[i], yla[i + 1], keski - Vector3.up * 0.05f, NgrPystyLaki);
            }
        }

        /// <summary>
        /// Boynen mutka: vesi pienistä paloista (kukin alle ääriviivan kynnyksen), joten joella ei ole ääriviivaa eikä tummaa
        /// rantakaistaa; kameran puoleinen reuna ja kapenevat päät rajautuvat suoraan karttaan. Lähitasossa veden väreily.
        /// </summary>
        static void NgrJoki(Rakentaja r, bool lahi)
        {
            // 16 lohkoa pituussuunnassa ja kaksi poikittain (keskilinjan molemmin puolin): mutkan päissäkin jokainen pala on alle
            // ääriviivan kynnyksen (puolileveys alle 0,035).
            const int palat = 16;
            for (int i = 0; i < palat; i++)
            {
                float a = Mathf.Lerp(-0.5f, 0.5f, i / (float)palat), b = Mathf.Lerp(-0.5f, 0.5f, (i + 1) / (float)palat);
                float za = NgrJokiZ(a), zb = NgrJokiZ(b), wa = NgrJokiLeveys(a), wb = NgrJokiLeveys(b);
                r.NelioUlos(new Vector3(a, NgrVesiY, za - wa), new Vector3(b, NgrVesiY, zb - wb), new Vector3(b, NgrVesiY, zb),
                    new Vector3(a, NgrVesiY, za), Vector3.up, EmVesi);
                r.NelioUlos(new Vector3(a, NgrVesiY, za), new Vector3(b, NgrVesiY, zb), new Vector3(b, NgrVesiY, zb + wb),
                    new Vector3(a, NgrVesiY, za + wa), Vector3.up, EmVesi);
            }
            if (!lahi) return;
            // Väreily: ohuita vaaleita viiruja virran suuntaan.
            var vari = Color.Lerp(EmVesi, EmVaahto, 0.45f);
            for (int k = 0; k < 11; k++)
            {
                float x = Mathf.Lerp(-0.42f, 0.42f, (k + 0.5f) / 11f) + (NgrArpa(k + 700) - 0.5f) * 0.03f;
                float w = (NgrArpa(k + 720) - 0.5f) * 1.2f * NgrJokiLeveys(x);
                float l = 0.012f + 0.01f * NgrArpa(k + 740);
                float z0 = NgrJokiZ(x - l) + w, z1 = NgrJokiZ(x + l) + w;
                r.NelioUlos(new Vector3(x - l, NgrVesiY + 0.0003f, z0 - 0.0006f), new Vector3(x + l, NgrVesiY + 0.0003f, z1 - 0.0006f),
                    new Vector3(x + l, NgrVesiY + 0.0003f, z1 + 0.0006f), new Vector3(x - l, NgrVesiY + 0.0003f, z0 + 0.0006f), Vector3.up, vari);
            }
        }

        /// <summary>Kaislat joen kummun puoleisella rannalla lähellä päitä (pienet pyramidit ilman ääriviivaa).</summary>
        static void NgrKaislat(Rakentaja r, bool lahi)
        {
            float[] xs = lahi ? new[] { -0.47f, -0.445f, -0.415f, -0.385f, -0.3f, 0.31f, 0.39f, 0.42f, 0.448f, 0.475f }
                              : new[] { -0.465f, -0.43f, -0.395f, 0.4f, 0.437f, 0.47f };
            for (int i = 0; i < xs.Length; i++)
            {
                float x = xs[i];
                float z = NgrJokiZ(x) + NgrJokiLeveys(x) + 0.003f + 0.004f * NgrArpa(i + 50);
                float h = 0.014f + 0.008f * NgrArpa(i + 60);
                r.Pyramidi(new Vector3(x, 0f, z), 0.011f, 0.008f, h, NgrKaisla);
            }
        }

        // ---- LIIKKUVAT OSAT ----

        /// <summary>Joutsenen i kotipaikka (pivot) joella veden pinnassa.</summary>
        static Vector3 NgrKoti(int i) => new Vector3(NgrKotiX[i], NgrVesiY, NgrJokiZ(NgrKotiX[i]));

        /// <summary>
        /// Uiva laulujoutsen (pivot vesirajassa keskellä, keula +Z): kuusikulmainen runko hieman veden alta, pyrstö koholla,
        /// suora pystykaula (laulujoutsen pitää kaulaa suorana), pää ja nokka, jonka tyvi on keltainen ja kärki musta, sekä pohja
        /// (sukellus). Pituus 0,044 ja kaula 0,036 (noin 4 × todellinen, jotta joutsen näkyy 40 pt:ssä valkoisena pisteenä).
        /// </summary>
        static Mesh NewgrangeJoutsen()
        {
            var r = new Rakentaja();
            const float yb = -0.002f;
            var ala = new[] { new Vector3(0f, yb, -0.019f), new Vector3(-0.0092f, yb, -0.011f), new Vector3(-0.0102f, yb, 0.0035f),
                new Vector3(0f, yb, 0.0125f), new Vector3(0.0102f, yb, 0.0035f), new Vector3(0.0092f, yb, -0.011f) };
            // Pyrstö hieman koholla ja suippona (sukeltaessa se osoittaa ylös).
            var yla = new[] { new Vector3(0f, 0.0135f, -0.0228f), new Vector3(-0.0058f, 0.012f, -0.0105f), new Vector3(-0.0064f, 0.0126f, 0.0028f),
                new Vector3(0f, 0.0112f, 0.0092f), new Vector3(0.0064f, 0.0126f, 0.0028f), new Vector3(0.0058f, 0.012f, -0.0105f) };
            var keski = new Vector3(0f, 0.004f, -0.003f);
            for (int i = 0; i < 6; i++)
            {
                int j = (i + 1) % 6;
                r.NelioKeskelta(ala[i], ala[j], yla[j], yla[i], keski, NgrJoutsenVari);
            }
            r.KolmioUlos(yla[0], yla[1], yla[5], Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(yla[1], yla[2], yla[5], Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(yla[2], yla[4], yla[5], Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(yla[2], yla[3], yla[4], Vector3.up, NgrJoutsenVari);
            // Pohja (näkyy vain sukeltaessa, kun perä nousee pystyyn).
            r.KolmioUlos(ala[0], ala[1], ala[5], -Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(ala[1], ala[2], ala[5], -Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(ala[2], ala[4], ala[5], -Vector3.up, NgrJoutsenVari);
            r.KolmioUlos(ala[2], ala[3], ala[4], -Vector3.up, NgrJoutsenVari);
            // Kaula, pää ja nokka.
            NgrSarmio(r, new Vector3(0f, 0.0085f, 0.0078f), new Vector3(0f, 0.0345f, 0.0102f), 0.0029f, 0.0022f, 3, NgrJoutsenVari, Mathf.PI / 2f);
            NgrSarmio(r, new Vector3(0f, 0.0338f, 0.0078f), new Vector3(0f, 0.0333f, 0.0158f), 0.0031f, 0.0026f, 3, NgrJoutsenVari, -Mathf.PI / 2f, true);
            NgrSarmio(r, new Vector3(0f, 0.0333f, 0.0158f), new Vector3(0f, 0.0327f, 0.0198f), 0.0024f, 0.0018f, 3, NgrNokka, -Mathf.PI / 2f);
            NgrSarmio(r, new Vector3(0f, 0.0327f, 0.0198f), new Vector3(0f, 0.0322f, 0.0232f), 0.0018f, 0f, 3, EmMuste, -Mathf.PI / 2f);
            return r.Verkko("Newgrange-joutsen");
        }

        /// <summary>Vana (pivot joutsenen pivotissa): kaksi vaaleaa viirua levenee rungon alta taaksepäin (−Z). Ohut tehoste ilman
        /// ääriviivaryhmää; liikeydin skaalaa sitä vauhdin mukaan (nousussa ja laskussa pidempi vaahtojuova).</summary>
        static Mesh NewgrangeVana()
        {
            var r = new Rakentaja();
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(s * 0.004f, 0.0006f, -0.007f), b = new Vector3(s * 0.0155f, 0.0006f, -0.05f);
                var t = new Vector3(0.002f, 0f, 0f);
                r.NelioUlos(a - t, b - t * 0.3f, b + t * 0.3f, a + t, Vector3.up, EmVaahto);
            }
            return r.Verkko("Newgrange-vana");
        }

        /// <summary>Lentävä joutsen (pivot rungon keskellä, keula +Z): kapea runko, kaula ja pää suorana eteen, keltainen nokka sekä
        /// leveät siivet levällään (kaksipuoliset, kärjet hieman koholla). Siipiväli 0,084 × koko, 33 kolmiota.</summary>
        static void NgrLentava(Rakentaja r, float k, Color vari)
        {
            Vector3 P(float x, float y, float z) => new Vector3(x * k, y * k, z * k);
            // Runko: pitkänomainen kaksoispyramidi.
            Vector3 hanta = P(0f, 0.0008f, -0.021f), rinta = P(0f, 0f, 0.0125f);
            var keha = new[] { P(0.0058f, 0f, -0.003f), P(0f, 0.0044f, -0.003f), P(-0.0058f, 0f, -0.003f), P(0f, -0.0038f, -0.003f) };
            var kk = P(0f, 0f, -0.003f);
            for (int i = 0; i < 4; i++)
            {
                int j = (i + 1) % 4;
                r.KolmioKeskelta(keha[i], keha[j], hanta, kk, vari);
                r.KolmioKeskelta(keha[j], keha[i], rinta, kk, vari);
            }
            // Kaula ja pää suoraan eteen, nokka keltamusta.
            NgrSarmio(r, P(0f, 0.0006f, 0.0105f), P(0f, 0.0013f, 0.0352f), 0.0024f * k, 0.0026f * k, 3, vari, Mathf.PI / 2f);
            NgrSarmio(r, P(0f, 0.0012f, 0.0352f), P(0f, 0.0006f, 0.0418f), 0.0021f * k, 0f, 3, NgrNokka, Mathf.PI / 2f);
            // Siivet: sisäpaneeli ja taaksepäin pyyhkäisty ulkopaneeli, molemmat kaksipuolisina.
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 j0 = P(s * 0.0042f, 0.0012f, 0.0065f), j1 = P(s * 0.0042f, 0.0012f, -0.0085f);
                Vector3 m0 = P(s * 0.022f, 0.0026f, 0.0035f), m1 = P(s * 0.022f, 0.0026f, -0.0115f);
                Vector3 t0 = P(s * 0.042f, 0.0055f, -0.0045f), t1 = P(s * 0.042f, 0.0055f, -0.0125f);
                r.Kalvo(j0, m0, m1, j1, vari);
                r.Kalvo(m0, t0, t1, m1, vari);
            }
        }

        static Mesh NewgrangeLento()
        {
            var r = new Rakentaja();
            NgrLentava(r, 1f, NgrJoutsenVari);
            return r.Verkko("Newgrange-lento");
        }

        /// <summary>Aenguksen ja Caerin joutsen (yön legenda): sama lentävä joutsen 1,15-kertaisena ja kirkkaan valkoisena.</summary>
        static Mesh NewgrangePari()
        {
            var r = new Rakentaja();
            NgrLentava(r, 1.15f, NgrPariVari);
            return r.Verkko("Newgrange-pari");
        }

        /// <summary>Kattoaukon keskipiste (kattoaukon hehkun pivot) ja säteen pää.</summary>
        static Vector3 NgrAukonKeski => new Vector3(0f, (NgrKansiYla + NgrAukkoYla) * 0.5f, NgrTakaseinaZ);

        /// <summary>
        /// Talvipäivänseisauksen säde (pivot mallin etureunassa akselilla): matalan auringon kultainen nauha nousee loivasti joen ja
        /// pystykivien välistä kattoaukkoon ja kapenee sitä kohti; uloin vyö EmKulta, kehä ja kirkas ydin. Kolme lohkoa (kukin
        /// alle ääriviivan kynnyksen), ei ääriviivaryhmää. Liikeydin kasvattaa sen skaalalla etureunasta kattoaukkoon.
        /// </summary>
        static Mesh NewgrangeSade()
        {
            var r = new Rakentaja();
            var loppu = NgrAukonKeski + new Vector3(0f, 0f, -0.0022f) - NgrSadePivot;
            var ak = loppu.normalized;
            var sivu = Vector3.right;
            var ylos = Vector3.Cross(ak, sivu);
            if (ylos.y < 0f) ylos = -ylos;
            const int lohkot = 3;
            for (int i = 0; i < lohkot; i++)
            {
                float t0 = i / (float)lohkot, t1 = (i + 1) / (float)lohkot;
                Vector3 p0 = loppu * t0, p1 = loppu * t1;
                float w0 = Mathf.Lerp(0.017f, 0.0072f, t0), w1 = Mathf.Lerp(0.017f, 0.0072f, t1);
                r.NelioUlos(p0 - sivu * w0, p1 - sivu * w1, p1 + sivu * w1, p0 + sivu * w0, ylos, NgrKeha);
                var o = ylos * 0.0006f;
                r.NelioUlos(p0 - sivu * (w0 * 0.42f) + o, p1 - sivu * (w1 * 0.42f) + o, p1 + sivu * (w1 * 0.42f) + o, p0 + sivu * (w0 * 0.42f) + o, ylos, NgrYdin);
            }
            return r.Verkko("Newgrange-sade");
        }

        /// <summary>Kattoaukon hehku (pivot kattoaukon keskellä): kirkas ydin aukon edessä ja kultainen kehys sen ympärillä.</summary>
        static Mesh NewgrangeKattoaukko()
        {
            var r = new Rakentaja();
            float z = -0.0014f, hw = 0.0075f, hh = (NgrAukkoYla - NgrKansiYla) * 0.5f;
            r.NelioUlos(new Vector3(-hw, -hh, z), new Vector3(hw, -hh, z), new Vector3(hw, hh, z), new Vector3(-hw, hh, z), Vector3.back, NgrYdin);
            float ow = hw + 0.0045f, oh = hh + 0.0035f, z2 = z + 0.0003f;
            r.NelioUlos(new Vector3(-ow, -oh, z2), new Vector3(ow, -oh, z2), new Vector3(ow, -hh, z2), new Vector3(-ow, -hh, z2), Vector3.back, NgrKeha);
            r.NelioUlos(new Vector3(-ow, hh, z2), new Vector3(ow, hh, z2), new Vector3(ow, oh, z2), new Vector3(-ow, oh, z2), Vector3.back, NgrKeha);
            r.NelioUlos(new Vector3(-ow, -hh, z2), new Vector3(-hw, -hh, z2), new Vector3(-hw, hh, z2), new Vector3(-ow, hh, z2), Vector3.back, NgrKeha);
            r.NelioUlos(new Vector3(hw, -hh, z2), new Vector3(ow, -hh, z2), new Vector3(ow, hh, z2), new Vector3(hw, hh, z2), Vector3.back, NgrKeha);
            // Valo syvennyksen lattialla oven edessä (kattoaukon läpi tuleva säde osuu käytävään).
            float yl = NgrReunaH - NgrAukonKeski.y + 0.0004f;
            r.NelioUlos(new Vector3(-0.006f, yl, -0.001f), new Vector3(0.006f, yl, -0.001f), new Vector3(0.006f, yl, -0.009f), new Vector3(-0.006f, yl, -0.009f),
                Vector3.up, NgrKeha);
            return r.Verkko("Newgrange-kattoaukko");
        }

        /// <summary>Käytävän pätkän j (1–3) alku kuvun pinnalla (pivot) ja loppu.</summary>
        static Vector3 NgrKaytavaAlku(int j) => NgrAkselilla(NgrKaytavaRho[j - 1]) + Vector3.up * NgrHehkuNosto;
        static Vector3 NgrKaytavaLoppu(int j) => NgrAkselilla(NgrKaytavaRho[j]) + Vector3.up * NgrHehkuNosto;

        /// <summary>Käytävän pätkä j kuvun pinnalla (pivot pätkän alussa): kultainen kehä ja kirkas ydin yhdellä kuvun kaistalla
        /// (taso), joten skaala kasvattaa sitä pinnalla kohti kammiota.</summary>
        static Mesh NgrKaytava(int j)
        {
            var r = new Rakentaja();
            Vector3 a = Vector3.zero, b = NgrKaytavaLoppu(j) - NgrKaytavaAlku(j);
            var sivu = Vector3.right;
            var ylos = Vector3.Cross(b.normalized, sivu);
            if (ylos.y < 0f) ylos = -ylos;
            const float w = 0.0075f;
            var m = (a + b) * 0.5f;
            r.NelioUlos(a - sivu * w, m - sivu * w, m + sivu * w, a + sivu * w, ylos, NgrKeha);
            r.NelioUlos(m - sivu * w, b - sivu * w, b + sivu * w, m + sivu * w, ylos, NgrKeha);
            var o = ylos * 0.0005f;
            r.NelioUlos(a - sivu * (w * 0.4f) + o, m - sivu * (w * 0.4f) + o, m + sivu * (w * 0.4f) + o, a + sivu * (w * 0.4f) + o, ylos, NgrYdin);
            r.NelioUlos(m - sivu * (w * 0.4f) + o, b - sivu * (w * 0.4f) + o, b + sivu * (w * 0.4f) + o, m + sivu * (w * 0.4f) + o, ylos, NgrYdin);
            return r.Verkko("Newgrange-kaytava" + j);
        }

        static Mesh NewgrangeKaytava1() => NgrKaytava(1);
        static Mesh NewgrangeKaytava2() => NgrKaytava(2);
        static Mesh NewgrangeKaytava3() => NgrKaytava(3);

        /// <summary>Kammion keskipiste kuvun pinnalla (pivot).</summary>
        static Vector3 NgrKammioPivot => NgrAkselilla(NgrKammioRho) + Vector3.up * NgrHehkuNosto;

        /// <summary>
        /// Ristinmuotoinen kammio (pivot keskellä pinnalla): pyöreä kultainen kehä (valaistu holvikammio) ja sen sisällä kirkas
        /// ristinmuotoinen ydin, eli keskikammio, lyhyet sivusyvennykset ja perän syvennys kuten Wakemanin pohjapiirroksessa, sekä
        /// käytävän pää. Kaikki on kuvun kaistan tasossa (kaistojen 0,55–0,33 välillä), joten skaala kasvattaa sen keskeltä kummun
        /// pinnalla. Pyöreä kehä pitää ääriviivan pyöreänä, jottei hehku lue kristillisenä ristinä (hauta on noin 3100 eaa.).
        /// </summary>
        static Mesh NewgrangeKammio()
        {
            var r = new Rakentaja();
            Vector3 eteen = NgrAkselilla(NgrKammioRho - 0.05f) - NgrAkselilla(NgrKammioRho + 0.05f);
            eteen = eteen.normalized;   // kohti lakea (pois sisäänkäynniltä)
            var sivu = Vector3.right;
            var ylos = Vector3.Cross(eteen, sivu);
            if (ylos.y < 0f) ylos = -ylos;
            void Laatta(float u0, float u1, float v0, float v1, float o, Color vari) =>
                r.NelioUlos(sivu * u0 + eteen * v0 + ylos * o, sivu * u1 + eteen * v0 + ylos * o, sivu * u1 + eteen * v1 + ylos * o,
                    sivu * u0 + eteen * v1 + ylos * o, ylos, vari);
            float L = NgrKz * (NgrKaytavaRho[3] - NgrKammioRho) - 0.001f;   // käytävän kolmannen pätkän loppuun (kaistan rajalle)
            // Kehä: kahdeksankulmio hieman keskipisteen perän puolella ja käytävän pään kaista.
            var c = eteen * 0.002f;
            const int n = 8;
            Vector3 K(int i) { float a = Mathf.PI / 8f + i * Mathf.PI * 2f / n; return c + sivu * (Mathf.Cos(a) * 0.025f) + eteen * (Mathf.Sin(a) * 0.023f); }
            for (int i = 1; i + 1 < n; i++) r.KolmioUlos(K(0), K(i), K(i + 1), ylos, NgrKeha);
            Laatta(-0.0058f, 0.0058f, -L, -0.019f, 0f, NgrKeha);
            // Ydin: keskikammio, sivusyvennykset, perän syvennys ja käytävän pää.
            const float o = 0.0005f;
            Laatta(-0.0085f, 0.0085f, -0.0085f, 0.0085f, o, NgrYdin);
            Laatta(-0.0175f, -0.0085f, -0.0045f, 0.0045f, o, NgrYdin);
            Laatta(0.0085f, 0.0175f, -0.0045f, 0.0045f, o, NgrYdin);
            Laatta(-0.0045f, 0.0045f, 0.0085f, 0.0165f, o, NgrYdin);
            Laatta(-0.003f, 0.003f, -L, -0.0085f, o, NgrYdin);
            return r.Verkko("Newgrange-kammio");
        }

        /// <summary>
        /// Liikkuvat osat (Natiivisepän rajapinta). Liikkeen laskee NewgrangeLiike avaimen ja osan nimen mukaan: joutsenet, vanat ja
        /// lentävät joutsenet siirtyvät kotipaikastaan (pivot) joella ja sen yllä, hehkut kasvavat skaalalla pivotistaan.
        /// </summary>
        static LiikkuvaOsaMaaritys[] NewgrangeOsat()
        {
            var osat = new System.Collections.Generic.List<LiikkuvaOsaMaaritys>();
            for (int i = 0; i < NgrKotiX.Length; i++)
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "joutsen" + i, Verkko = NewgrangeJoutsen, Pivot = NgrKoti(i), Liike = Liike.Liuku, Akseli = Vector3.right,
                    Laajuus = 0.05f, KayS = 12f, TaukoS = 50f });
            for (int i = 0; i < NgrKotiX.Length; i++)
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "vana" + i, Verkko = NewgrangeVana, Pivot = NgrKoti(i), Liike = Liike.Liuku, Akseli = Vector3.right, Laajuus = 0.05f });
            for (int i = 0; i < NgrKotiX.Length; i++)
                osat.Add(new LiikkuvaOsaMaaritys { Nimi = "lento" + i, Verkko = NewgrangeLento, Pivot = NgrKoti(i), Liike = Liike.Nousu, Akseli = Vector3.up, Laajuus = 0.08f });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "sade", Verkko = NewgrangeSade, Pivot = NgrSadePivot, Liike = Liike.Aalto, Akseli = Vector3.forward, Laajuus = 1f });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kattoaukko", Verkko = NewgrangeKattoaukko, Pivot = NgrAukonKeski, Liike = Liike.Valahdys });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kaytava1", Verkko = NewgrangeKaytava1, Pivot = NgrKaytavaAlku(1), Liike = Liike.Aalto, Akseli = Vector3.forward });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kaytava2", Verkko = NewgrangeKaytava2, Pivot = NgrKaytavaAlku(2), Liike = Liike.Aalto, Akseli = Vector3.forward });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kaytava3", Verkko = NewgrangeKaytava3, Pivot = NgrKaytavaAlku(3), Liike = Liike.Aalto, Akseli = Vector3.forward });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "kammio", Verkko = NewgrangeKammio, Pivot = NgrKammioPivot, Liike = Liike.Valahdys });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "pari0", Verkko = NewgrangePari, Pivot = NgrPari0, Liike = Liike.Liuku, Akseli = Vector3.forward, Laajuus = 0.7f });
            osat.Add(new LiikkuvaOsaMaaritys { Nimi = "pari1", Verkko = NewgrangePari, Pivot = NgrPari1, Liike = Liike.Liuku, Akseli = Vector3.forward, Laajuus = 0.7f });
            return osat.ToArray();
        }

        static readonly bool newgrange = Rekisteroi("newgrange",
            new Erikoismalli { Runko = NewgrangeRunko, Osat = NewgrangeOsat, Lahi = NewgrangeLahi, Kolmiot0 = 1346, KokoKerroin = 1.5f });

        // ---- LÄHITASO ----

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat (kumpu
        /// yhtenä osana, pienet osat ilman ääriviivaa) ja osien pivotit kuin rungossa. Kuvun profiili on sama, joten käytävän ja
        /// kammion hehku osuu pintaan molemmilla tasoilla. Lisäksi:
        ///   kumpu        97 reunakiveä yksittäin (korkeusvaihtelu ja saumat), takana K52 koristeineen, julkisivun graniittimukulat
        ///                tiheämpinä kuusikulmioina, julkisivun yläreunan kvartsiraja ja takana kuivakivimuurin kivirivit
        ///   sisäänkäynti kaartuvat sivumuurit, kansikivien kaiverrukset ja käytävän ensimmäiset pystykivet oviaukossa
        ///   ympäristö    sisäänkäyntikiven kolmoisspiraali, pystykivet epäsäännöllisempinä, soratie kummun ympäri ja
        ///                sisäänkäynnin eteen, joen väreily, kaislat ja muutama puu joen rannalla
        /// </summary>
        static Mesh NewgrangeLahi()
        {
            var r = new Rakentaja();
            NgrJoki(r, true);
            NgrLhSoratie(r);
            NgrKumpu(r, true);
            NgrSisaankayntikivi(r, true);
            NgrPystykivet(r, true);
            NgrKaislat(r, true);
            NgrLhPuut(r);
            return r.Verkko("Newgrange-lahi");
        }

        /// <summary>
        /// Lähitason reunakivet: 97 kiveä yksittäin (1,7–4,5 m, keskimäärin noin 2,7 m), korkeus 0,018–0,0215 kiveltä toiselle, ja
        /// kivien välissä kapeat saumat, joista näkyy tumma taustakaista.
        /// </summary>
        static void NgrLhReunakivet(Rakentaja r)
        {
            const int kivia = 97;
            var keski = new Vector3(0f, -0.4f, NgrKumpuZ);
            var saumaVari = Color.Lerp(NgrReuna3, EmMuste, 0.45f);
            // Tumma taustakaista kivien takana (48 lohkoa).
            for (int i = 0; i < NgrLahiSektorit; i++)
            {
                float p0 = -90f + i * 360f / NgrLahiSektorit, p1 = p0 + 360f / NgrLahiSektorit;
                r.NelioKeskelta(NgrP(p0, 1.02f, 0f), NgrP(p1, 1.02f, 0f), NgrP(p1, 1.018f, 0.0172f), NgrP(p0, 1.018f, 0.0172f), keski, saumaVari);
                r.NelioKeskelta(NgrP(p0, 1.018f, 0.0172f), NgrP(p1, 1.018f, 0.0172f), NgrP(p1, NgrJuuri, 0.0172f), NgrP(p0, NgrJuuri, 0.0172f), keski, saumaVari);
            }
            // Kivien pituudet siemenestä, normitettuna koko kehälle; ensimmäinen kivi (K1:n takana) keskitetään akselille.
            var pit = new float[kivia];
            float summa = 0f;
            for (int i = 0; i < kivia; i++) { pit[i] = 0.6f + 1.1f * NgrArpa(i + 300); summa += pit[i]; }
            float phi = -90f - 360f * pit[0] / summa * 0.5f;
            Color[] savyt = { NgrReuna, NgrReuna2, NgrReuna3, NgrReunaLaki };
            for (int i = 0; i < kivia; i++)
            {
                float span = 360f * pit[i] / summa;
                float a0 = phi + span * 0.035f, a1 = phi + span * 0.965f;
                phi += span;
                float h = 0.018f + 0.0035f * NgrArpa(i + 400);
                var vari = savyt[(int)(NgrArpa(i + 500) * 3.99f)];
                // Pitkä kivi kahtena lohkona, jotta se seuraa kaarta.
                int lohkot = span > 4.5f ? 2 : 1;
                for (int l = 0; l < lohkot; l++)
                {
                    float b0 = Mathf.Lerp(a0, a1, l / (float)lohkot), b1 = Mathf.Lerp(a0, a1, (l + 1) / (float)lohkot);
                    float h0 = h * (l == 0 ? 0.94f : 1f), h1 = h * (l == lohkot - 1 ? 0.94f : 1f);
                    r.NelioKeskelta(NgrP(b0, NgrReunaAla, 0f), NgrP(b1, NgrReunaAla, 0f), NgrP(b1, NgrReunaYla, h1), NgrP(b0, NgrReunaYla, h0), keski, vari);
                    r.NelioKeskelta(NgrP(b0, NgrReunaYla, h0), NgrP(b1, NgrReunaYla, h1), NgrP(b1, 0.985f, h1), NgrP(b0, 0.985f, h0), keski,
                        Color.Lerp(vari, NgrReunaLaki, 0.5f));
                }
            }
        }

        /// <summary>Kuivakivimuurin kivirivit takana (kaksi tummempaa vaakaviivaa muurin pinnalla ilman julkisivua).</summary>
        static void NgrLhMuurinRivit(Rakentaja r, int n)
        {
            var vari = Color.Lerp(NgrMuuri, EmMuste, 0.3f);
            for (int i = 0; i < n; i++)
            {
                float d = 360f / n, p0 = -90f + i * d, p1 = p0 + d;
                if (NgrOsuus(p0) > 0.001f || NgrOsuus(p1) > 0.001f) continue;
                Vector3 j0 = NgrP(p0, NgrJuuri, NgrReunaH), j1 = NgrP(p1, NgrJuuri, NgrReunaH), w0 = NgrYla(p0), w1 = NgrYla(p1);
                var ulos = (j0 + j1) * 0.5f - new Vector3(0f, 0f, NgrKumpuZ); ulos.y = 0f;
                var o = ulos.normalized * 0.0006f;
                foreach (float s in new[] { 0.36f, 0.7f })
                {
                    Vector3 a0 = Vector3.Lerp(j0, w0, s) + o, a1 = Vector3.Lerp(j1, w1, s) + o;
                    Vector3 b0 = Vector3.Lerp(j0, w0, s + 0.1f) + o, b1 = Vector3.Lerp(j1, w1, s + 0.1f) + o;
                    r.NelioUlos(a0, a1, b1, b0, ulos + Vector3.up * 0.4f, vari);
                }
            }
        }

        /// <summary>K52 kummun takana sisäänkäyntiä vastapäätä: reunakiven ulkopinnalla spiraalit ja salmiakkikuvio.</summary>
        static void NgrLhK52(Rakentaja r)
        {
            var c = NgrP(90f, NgrReunaAla + 0.004f, 0.0095f);
            var n = new Vector3(0f, 0.15f, 1f).normalized;
            var t = Vector3.left;
            var u = Vector3.Cross(n, t).normalized;
            if (u.y < 0f) u = -u;
            var vari = NgrSyvennys;
            NgrKuusikulmio(r, c + t * -0.007f, t, u, 0.0028f, 0.0028f, 0.3f, n, vari);
            NgrKuusikulmio(r, c + t * 0.007f, t, u, 0.0028f, 0.0028f, 0.1f, n, vari);
            for (int k = -1; k <= 1; k++)
            {
                var m = c + t * (k * 0.0035f) + u * 0.001f;
                r.NelioUlos(m - t * 0.0016f, m - u * 0.0022f, m + t * 0.0016f, m + u * 0.0022f, n, vari);
            }
        }

        /// <summary>Soratie kummun ympäri ja levennys sisäänkäynnin eteen (pienet palat maan tasossa, ei ääriviivaa; hillitty
        /// keskisävy, ettei vaalea kaista lue tyhjänä maana).</summary>
        static void NgrLhSoratie(Rakentaja r)
        {
            var vari = Hex(0xc4b898);
            const int n = 48;
            float y = 0.0008f;
            for (int i = 0; i < n; i++)
            {
                float p0 = -90f + i * 360f / n, p1 = p0 + 360f / n;
                float ulko0 = 1.095f + (Mathf.Abs(NgrKulmaEro(p0, -90f)) < 12f ? 0.05f : 0f);
                float ulko1 = 1.095f + (Mathf.Abs(NgrKulmaEro(p1, -90f)) < 12f ? 0.05f : 0f);
                r.NelioUlos(NgrP(p0, 1.04f, y), NgrP(p1, 1.04f, y), NgrP(p1, ulko1, y), NgrP(p0, ulko0, y), Vector3.up, vari);
            }
        }

        /// <summary>Muutama puu joen rannalla (vain lähitasossa: 40 pt:ssä puut luettaisiin nuolina).</summary>
        static void NgrLhPuut(Rakentaja r)
        {
            foreach (var (x, dz, k) in new[] { (-0.455f, 0.03f, 1f), (-0.415f, 0.052f, 0.8f), (0.43f, 0.036f, 0.95f), (0.47f, 0.02f, 0.75f) })
            {
                float z = NgrJokiZ(x) + NgrJokiLeveys(x) + dz;
                r.Vaippa(new Vector3(x, 0f, z), 0.0024f * k, 0.0018f * k, 0.012f * k, 3, EmSeepia);
                r.Kartio(new Vector3(x, 0.009f * k, z), 0.012f * k, 0.03f * k, 6, EmPuu);
            }
        }
    }
}
