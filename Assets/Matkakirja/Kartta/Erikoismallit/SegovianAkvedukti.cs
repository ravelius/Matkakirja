using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI SEGOVIAN AKVEDUKTI (speksi docs/raportit/erikoismallit/segovian-akvedukti.md, omistajan jono 27.9. klo 01.4x).
    /// Tunnistus sekunnissa: pitkä kaaririvi, jonka keskellä (Plaza del Azoguejo, 28,5 m) kaksi kaarikerrosta päällekkäin ja
    /// päissä maan noustessa yksi kerros; yläreunassa vesikouru (specus) ja keskellä kapea syvennys (Neitsyt Marian patsas).
    /// Tyylitelty: 959 m:n ja 167 kaaren sijaan 1,0 ≈ 400 m ja 20 kaarta (10 kaksikerroksista keskellä), pystyliioittelu 4,4
    /// (laite 27.9. klo 03.1x: pystyliioittelu 3 jäi 30°:ssa matalaksi viivaksi),
    /// jotta kaaret erottuvat 60 pt:ssä; kulkee itä–länsi (tyylitelty, Kaari-apuri). Graniitti paperi → seepia, aukot
    /// varjossa, ei laastia eikä saumoja (liian pieniä). Paksuus liioiteltu (0,04), jotta rivi erottuu myös ylhäältä.
    /// Liikkuvat osat:
    ///   vesi    kimallus liukuu vesikourua pitkin vuorilta kaupunkiin (perusliike, käynti ja tauko)
    ///   kivi    paholaisen viimeinen kivi (harvinainen ja napautus): nousee aukiolta kaaren yli kohti kourua, jää
    ///           aamunkoitossa vajaaksi ja putoaa takaisin (legenda: paholainen hävisi yhden kiven takia)
    ///   aamu    kultainen aamunkoiton kajo kaarissa (tapahtuman lopussa)
    ///   valot   yöllä kaaret valaistaan alhaalta
    /// </summary>
    public sealed partial class Symbolimallit
    {
        const int SaKaaria = 20;
        const float SaVali = 0.05f, SaPilari = 0.013f, SaPaksuus = 0.04f, SaYla = 0.25f, SaKouru = 0.02f, SaVyo = 0.155f;
        static readonly Color SaGraniitti = Hex(0xcdbb98), SaGraniittiVarjo = Hex(0xb4a07e), SaHolvi = Hex(0x8f7a5a), SaMaa = Hex(0xd6c49c);

        /// <summary>Maan korkeus x:ssä: keskellä aukio (0), päissä rinne nousee kourun alle (kaaret madaltuvat).</summary>
        static float SaMaanKorkeus(float x)
        {
            float a = Mathf.Abs(x);
            return a < 0.24f ? 0f : Mathf.Min(SaYla - 0.025f, (a - 0.24f) / 0.26f * (SaYla - 0.025f));
        }

        static Mesh SegovianAkveduktiRunko()
        {
            var r = new Rakentaja();
            float z0 = -SaPaksuus * 0.5f, z1 = SaPaksuus * 0.5f, x0 = -SaKaaria * SaVali * 0.5f;
            r.AloitaOsa();
            // Pilarit maasta kouruun (keskellä kaksikerroksisen osan vyö erottaa kerrokset).
            for (int i = 0; i <= SaKaaria; i++)
            {
                float x = x0 + i * SaVali, g = SaMaanKorkeus(x);
                r.Laatikko(new Vector3(x, g, 0f), new Vector3(SaPilari, SaYla - g, SaPaksuus * 1.15f), SaGraniitti, SaGraniitti);
            }
            // Kaaret: kaksikerroksiset (alempi korkea, ylempi matala) siellä, missä maata on alle 0,04, muuten yksi kerros.
            for (int i = 0; i < SaKaaria; i++)
            {
                float cx = x0 + (i + 0.5f) * SaVali, g = Mathf.Max(SaMaanKorkeus(cx - SaVali * 0.5f), SaMaanKorkeus(cx + SaVali * 0.5f));
                float lev = SaVali - SaPilari;
                if (g < 0.04f)
                {
                    r.Kaari(cx, lev, SaVyo - 0.03f - lev * 0.5f, lev * 0.5f, SaVyo, z0, z1, 3, SaGraniitti, SaHolvi);
                    r.Kaari(cx, lev, SaYla - 0.02f - lev * 0.5f, lev * 0.5f, SaYla, z0, z1, 3, SaGraniitti, SaHolvi);
                }
                else if (SaYla - g > 0.035f)
                {
                    float ys = g + (SaYla - g) * 0.55f;
                    r.Kaari(cx, lev, ys, lev * 0.5f, SaYla, z0, z1, 3, SaGraniitti, SaHolvi);
                }
                else r.Laatikko(new Vector3(cx, g, 0f), new Vector3(SaVali, SaYla - g, SaPaksuus), SaGraniittiVarjo, SaGraniitti);
            }
            // Vyö kerrosten välissä (kaksikerroksinen osa) ja vesikouru koko matkalla.
            r.Laatikko(new Vector3(0f, SaVyo - 0.006f, 0f), new Vector3(0.52f, 0.008f, SaPaksuus * 1.3f), SaGraniitti, SaGraniitti);
            r.Laatikko(new Vector3(0f, SaYla, 0f), new Vector3(SaKaaria * SaVali + SaPilari, SaKouru, SaPaksuus * 1.2f), SaGraniitti, SaGraniitti);
            r.LopetaOsa();
            // Kourun uoma (tumma kaista kourun päällä, vesi liukuu sen päällä) ja syvennys patsaineen keskellä molemmin puolin.
            r.NelioUlos(new Vector3(-0.5f, SaYla + SaKouru + 0.001f, -0.005f), new Vector3(0.5f, SaYla + SaKouru + 0.001f, -0.005f),
                new Vector3(0.5f, SaYla + SaKouru + 0.001f, 0.005f), new Vector3(-0.5f, SaYla + SaKouru + 0.001f, 0.005f), Vector3.up, SaHolvi);
            foreach (float s in new[] { -1f, 1f })
            {
                r.Laatta(new Vector3(0f, SaYla - 0.012f, s * SaPaksuus * 0.6f), new Vector3(0f, 0f, s), 0.016f, 0.03f, SaHolvi);
                r.Timantti(new Vector3(0f, SaYla - 0.014f, s * SaPaksuus * 0.62f), 0.004f, 0.01f, EmKulta, 4);
            }
            // Maan rinteet päissä kaaririvin levyisinä (kaaret nousevat kaupunkiin ja vuorille päin); aukio keskellä on kartta.
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(s * 0.24f, 0.001f, 0f), b = new Vector3(s * 0.52f, SaYla - 0.02f, 0f);
                var n = new Vector3(0f, 0f, SaPaksuus * 0.6f);
                r.NelioUlos(a - n, b - n, b + n, a + n, Vector3.up, SaMaa);
            }
            return r.Verkko("SegovianAkvedukti");
        }

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: kaarikivet (kaksi vuorottelevaa sävyä ja tummempi lakikivi), listojen ja
        /// harjakivien valaistu yläpinta, saumat ja harjakiven alla oleva varjoviiva. Ominaisuuksina, koska Em-paletti on toisessa
        /// tiedostossa (staattisten kenttien alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color SaLKaarikivi1 => Color.Lerp(SaGraniittiVarjo, SaHolvi, 0.12f);
        static Color SaLKaarikivi2 => Color.Lerp(SaGraniitti, EmPaperi, 0.3f);
        static Color SaLKehys => Color.Lerp(SaGraniitti, EmPaperi, 0.2f);
        static Color SaLValo => Color.Lerp(SaGraniitti, EmPaperi, 0.35f);
        static Color SaLSauma => Color.Lerp(SaHolvi, EmMuste, 0.35f);
        /// <summary>Pilarin jalan (sokkelin) korkeus, kaarikivien säteittäinen pituus ja kanta-listojen korkeudet (alemman ja
        /// ylemmän kaarikerroksen syntykohta rungon kaarista).</summary>
        const float SaLJalka = 0.009f, SaLKaarikivi = 0.0075f;
        const float SaLAlaKanta = SaVyo - 0.03f - (SaVali - SaPilari) * 0.5f, SaLYlaKanta = SaYla - 0.02f - (SaVali - SaPilari) * 0.5f;

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (kaaririvi, uoma ja rinteet omina osinaan) ja osien pivotit kuin rungossa, noin 3 × kolmiot lähikuvan yksityiskohtiin
        /// (2 320, runko 780).
        /// Korvaa rungon vain lähellä; vesi, kivi, aamu ja valot pysyvät ennallaan (kaaret ja kouru samoilla paikoilla).
        ///   pilarit   jalkakivet (sokkeli); kaksikerroksisessa osassa alapilareissa kaksi porrastusta listoineen, niiden välissä
        ///             kivikertojen saumat ja kummankin kaarikerroksen syntykohdassa kantalista
        ///   kaaret    viisi kaarikiveä joka kaaressa (vuorottelevat sävyt, tumma lakikivi) ja pyöreämpi holvi
        ///   kouru     harjakivet ulkonevine reunoineen ja varjoviivoineen, kivien saumat harjalla ja kourun uoma syvennettynä
        ///             (vesi liukuu sen suulla kuten rungossa)
        ///   syvennys  keskipilarin kaarevalakinen syvennys kehyksineen ja Neitsyt Marian patsas molemmin puolin
        ///   muut      kerrosten välisen vyön päällä lista; rinteet ja päiden umpiosat kuten rungossa
        /// </summary>
        static Mesh SegovianAkveduktiLahi()
        {
            var r = new Rakentaja();
            float x0 = -SaKaaria * SaVali * 0.5f;
            r.AloitaOsa();
            // Pilarit: sokkeli, runko ja kaksikerroksisessa osassa porrastukset ja kantalistat.
            for (int i = 0; i <= SaKaaria; i++)
            {
                float x = x0 + i * SaVali, g = SaMaanKorkeus(x);
                SaLPilari(r, x, g, i == 0 || i == SaKaaria ? 0 : g < 0.04f ? 2 : 1);
            }
            // Kaaret kuten rungossa, nyt kaarikivin.
            for (int i = 0; i < SaKaaria; i++)
            {
                float cx = x0 + (i + 0.5f) * SaVali, g = Mathf.Max(SaMaanKorkeus(cx - SaVali * 0.5f), SaMaanKorkeus(cx + SaVali * 0.5f));
                if (g < 0.04f)
                {
                    SaLKaari(r, cx, SaLAlaKanta, SaVyo);
                    SaLKaari(r, cx, SaLYlaKanta, SaYla);
                }
                else if (SaYla - g > 0.035f) SaLKaari(r, cx, g + (SaYla - g) * 0.55f, SaYla);
                else r.Laatikko(new Vector3(cx, g, 0f), new Vector3(SaVali, SaYla - g, SaPaksuus), SaGraniittiVarjo, SaGraniitti);
            }
            // Vyö kerrosten välissä ja sen päällä lista (vaalea yläpinta), kouru harjakivineen.
            r.Laatikko(new Vector3(0f, SaVyo - 0.006f, 0f), new Vector3(0.52f, 0.008f, SaPaksuus * 1.3f), SaGraniitti, SaGraniitti);
            r.Laatikko(new Vector3(0f, SaVyo + 0.002f, 0f), new Vector3(0.516f, 0.0026f, SaPaksuus * 1.3f - 0.0045f), SaGraniitti, SaLValo);
            SaLKouru(r);
            r.LopetaOsa();
            // Kourun uoma syvennettynä (rungossa tumma kaista, oma ääriviivaosa kuten rungossa).
            SaLUoma(r);
            // Syvennys ja patsas keskipilarissa molemmin puolin.
            foreach (float s in new[] { -1f, 1f }) SaLSyvennys(r, s);
            // Maan rinteet päissä kuten rungossa.
            foreach (float s in new[] { -1f, 1f })
            {
                Vector3 a = new Vector3(s * 0.24f, 0.001f, 0f), b = new Vector3(s * 0.52f, SaYla - 0.02f, 0f);
                var n = new Vector3(0f, 0f, SaPaksuus * 0.6f);
                r.NelioUlos(a - n, b - n, b + n, a + n, Vector3.up, SaMaa);
            }
            return r.Verkko("SegovianAkvedukti-lahi");
        }

        /// <summary>
        /// Lähitason pilari (rungossa Laatikko maasta kouruun): sama runko (sivut, laki jää kourun sisään) ja tyypin mukaan
        /// jalkakivi (1, 2) sekä kaksikerroksisessa osassa (2) alapilarin kaksi porrastuslistaa, niiden välissä kivikertojen
        /// saumat ja kantalistat kummankin kaarikerroksen syntykohdassa. Listojen yläpinta on vaalea (valo), joten ne erottuvat
        /// viivoina, ja saumat tummina. 8, 18 tai 70 kolmiota.
        /// </summary>
        static void SaLPilari(Rakentaja r, float x, float g, int tyyppi)
        {
            float hx = SaPilari * 0.5f, hz = SaPaksuus * 1.15f * 0.5f, y0 = g;
            if (tyyppi > 0)
            {
                r.Laatikko(new Vector3(x, g, 0f), new Vector3(SaPilari + 0.004f, SaLJalka, SaPaksuus * 1.15f + 0.005f), SaGraniitti, SaLValo);
                y0 = g + SaLJalka;
            }
            Vector3 A = new Vector3(x - hx, 0f, -hz), B = new Vector3(x + hx, 0f, -hz), C = new Vector3(x + hx, 0f, hz), D = new Vector3(x - hx, 0f, hz);
            Vector3 ya = Vector3.up * y0, yy = Vector3.up * SaYla;
            var k = new Vector3(x, (y0 + SaYla) * 0.5f, 0f);
            r.NelioKeskelta(A + ya, B + ya, B + yy, A + yy, k, SaGraniitti);
            r.NelioKeskelta(B + ya, C + ya, C + yy, B + yy, k, SaGraniitti);
            r.NelioKeskelta(C + ya, D + ya, D + yy, C + yy, k, SaGraniitti);
            r.NelioKeskelta(D + ya, A + ya, A + yy, D + yy, k, SaGraniitti);
            if (tyyppi < 2) return;
            // Kivikertojen saumat alapilarin kolmessa osassa (kuivamuuratut graniittilohkot), molemmin puolin.
            foreach (float y in new[] { 0.0215f, 0.0525f, 0.0875f })
                foreach (float s in new[] { -1f, 1f })
                {
                    float z = s * (hz + 0.0004f);
                    r.NelioUlos(new Vector3(x - hx, y - 0.0006f, z), new Vector3(x + hx, y - 0.0006f, z), new Vector3(x + hx, y + 0.0006f, z),
                        new Vector3(x - hx, y + 0.0006f, z), new Vector3(0f, 0f, s), SaLSauma);
                }
            foreach (float y in new[] { 0.036f, 0.071f })
                r.Laatikko(new Vector3(x, y - 0.0025f, 0f), new Vector3(SaPilari + 0.0022f, 0.0025f, SaPaksuus * 1.15f + 0.0024f), SaGraniitti, SaLValo);
            r.Laatikko(new Vector3(x, SaLAlaKanta - 0.0032f, 0f), new Vector3(SaPilari + 0.0032f, 0.0032f, SaPaksuus * 1.15f + 0.0032f), SaGraniitti, SaLValo);
            // Ylemmän kerroksen kantalista: kaksikerroksisen osan päätypilareissa vain sisäpuolella (ulkopuolella on yksikerroksisen
            // kaaren umpiseinä, johon lista ei jatku).
            float ulk = 0.0016f, xa = x - hx - (x > -0.24f ? ulk : 0f), xb = x + hx + (x < 0.24f ? ulk : 0f);
            r.Laatikko(new Vector3((xa + xb) * 0.5f, SaLYlaKanta - 0.0032f, 0f), new Vector3(xb - xa, 0.0032f, SaPaksuus * 1.15f + 0.0032f), SaGraniitti, SaLValo);
        }

        /// <summary>
        /// Lähitason kaari (rungossa Kaari n = 3): puoliympyräholvi syntykohdasta ys, jänne pilarien välissä, seinä yläreunaan yt
        /// asti kummallakin puolella. Viisi kaarikiveä (säteittäinen pituus SaLKaarikivi) vuorottelevin sävyin, lakikivi
        /// tummempi; kaarikivien yläpuolinen seinä viuhkana yläkulmiin ja holvin alapinta viidessä lohkossa. 42 kolmiota.
        /// </summary>
        static void SaLKaari(Rakentaja r, float cx, float ys, float yt)
        {
            const int n = 5;
            float R = (SaVali - SaPilari) * 0.5f, w = SaLKaarikivi, z0 = -SaPaksuus * 0.5f, z1 = SaPaksuus * 0.5f;
            Vector3 P(int k, float rr, float z) { float a = Mathf.PI * (1f - (float)k / n); return new Vector3(cx + Mathf.Cos(a) * rr, ys + Mathf.Sin(a) * rr, z); }
            foreach (float z in new[] { z0, z1 })
            {
                var ulos = new Vector3(0f, 0f, z < 0f ? -1f : 1f);
                for (int k = 0; k < n; k++)
                    r.NelioUlos(P(k, R, z), P(k + 1, R, z), P(k + 1, R + w, z), P(k, R + w, z), ulos, k % 2 == 0 ? SaLKaarikivi1 : SaLKaarikivi2);
                Vector3 TL = new Vector3(cx - R - w, yt, z), TR = new Vector3(cx + R + w, yt, z);
                const int puoli = n / 2 + 1;
                for (int k = 0; k < puoli; k++) r.KolmioUlos(TL, P(k, R + w, z), P(k + 1, R + w, z), ulos, SaGraniitti);
                r.KolmioUlos(TL, P(puoli, R + w, z), TR, ulos, SaGraniitti);
                for (int k = puoli; k < n; k++) r.KolmioUlos(TR, P(k, R + w, z), P(k + 1, R + w, z), ulos, SaGraniitti);
            }
            for (int k = 0; k < n; k++)
            {
                var sisaan = new Vector3(cx, ys, 0f) - (P(k, R, 0f) + P(k + 1, R, 0f)) * 0.5f;
                r.NelioUlos(P(k, R, z0), P(k + 1, R, z0), P(k + 1, R, z1), P(k, R, z1), sisaan, SaHolvi);
            }
        }

        /// <summary>
        /// Lähitason kouru (rungossa Laatikko 1,013 × 0,02 × 0,048): samat ulkomitat; ylhäällä molemmin puolin harjakivi, jonka
        /// reuna ulkonee 0,0015 (vaalea reuna ja tumma varjoviiva sen alla), harjakivien saumat 0,1:n välein lomittain ja keskellä
        /// uoma (SaLUoma). 66 kolmiota.
        /// </summary>
        static void SaLKouru(Rakentaja r)
        {
            float xa = (SaKaaria * SaVali + SaPilari) * 0.5f, zc = SaPaksuus * 0.6f, zl = zc + 0.0015f, zu = 0.005f;
            float y0 = SaYla, y1 = SaYla + SaKouru, yl = y1 - 0.0045f;
            float x0 = -SaKaaria * SaVali * 0.5f;
            foreach (float s in new[] { -1f, 1f })
            {
                var ulos = new Vector3(0f, 0f, s);
                r.NelioUlos(new Vector3(-xa, y0, s * zc), new Vector3(xa, y0, s * zc), new Vector3(xa, yl, s * zc), new Vector3(-xa, yl, s * zc), ulos, SaGraniitti);
                r.NelioUlos(new Vector3(-xa, yl - 0.0013f, s * (zc + 0.0004f)), new Vector3(xa, yl - 0.0013f, s * (zc + 0.0004f)),
                    new Vector3(xa, yl, s * (zc + 0.0004f)), new Vector3(-xa, yl, s * (zc + 0.0004f)), ulos, SaLSauma);
                r.NelioUlos(new Vector3(-xa, yl, s * zl), new Vector3(xa, yl, s * zl), new Vector3(xa, y1, s * zl), new Vector3(-xa, y1, s * zl), ulos, SaLValo);
                r.NelioUlos(new Vector3(-xa, y1, s * zu), new Vector3(xa, y1, s * zu), new Vector3(xa, y1, s * zl), new Vector3(-xa, y1, s * zl), Vector3.up, SaGraniitti);
                // Päädyt (x = ±xa): kouru ja harjakiven reuna.
                var p = new Vector3(s, 0f, 0f);
                r.NelioUlos(new Vector3(s * xa, y0, -zc), new Vector3(s * xa, y0, zc), new Vector3(s * xa, yl, zc), new Vector3(s * xa, yl, -zc), p, SaGraniitti);
                r.NelioUlos(new Vector3(s * xa, yl, -zl), new Vector3(s * xa, yl, zl), new Vector3(s * xa, y1, zl), new Vector3(s * xa, y1, -zl), p, SaGraniitti);
                // Harjan kaistale uoman päässä.
                r.NelioUlos(new Vector3(s * 0.5f, y1, -zu), new Vector3(s * xa, y1, -zu), new Vector3(s * xa, y1, zu), new Vector3(s * 0.5f, y1, zu), Vector3.up, SaGraniitti);
                // Harjakivien saumat 0,1:n välein, etelä- ja pohjoispuolella lomittain (kuivamuuraus, ei ruudukkoa).
                for (int i = s < 0f ? 1 : 2; i < SaKaaria; i += 2)
                {
                    float x = x0 + i * SaVali;
                    r.NelioUlos(new Vector3(x - 0.0007f, y1 + 0.0004f, s * zu), new Vector3(x + 0.0007f, y1 + 0.0004f, s * zu),
                        new Vector3(x + 0.0007f, y1 + 0.0004f, s * zl), new Vector3(x - 0.0007f, y1 + 0.0004f, s * zl), Vector3.up, SaLSauma);
                }
            }
        }

        /// <summary>Kourun uoma (rungossa tumma kaista harjalla, oma ääriviivaosa): pohja 0,0045 harjan alapuolella, sisäseinät ja
        /// päädyt, tumma. 10 kolmiota.</summary>
        static void SaLUoma(Rakentaja r)
        {
            const float xu = 0.5f, zu = 0.005f;
            float y1 = SaYla + SaKouru, yp = y1 - 0.0045f;
            r.AloitaOsa();
            r.NelioUlos(new Vector3(-xu, yp, -zu), new Vector3(xu, yp, -zu), new Vector3(xu, yp, zu), new Vector3(-xu, yp, zu), Vector3.up, SaHolvi);
            foreach (float s in new[] { -1f, 1f })
            {
                r.NelioUlos(new Vector3(-xu, yp, s * zu), new Vector3(xu, yp, s * zu), new Vector3(xu, y1, s * zu), new Vector3(-xu, y1, s * zu), new Vector3(0f, 0f, -s), SaHolvi);
                r.NelioUlos(new Vector3(s * xu, yp, -zu), new Vector3(s * xu, yp, zu), new Vector3(s * xu, y1, zu), new Vector3(s * xu, y1, -zu), new Vector3(-s, 0f, 0f), SaHolvi);
            }
            r.LopetaOsa();
        }

        /// <summary>
        /// Syvennys (hornacina) keskipilarin yläosassa puolella s (−1 etelä, 1 pohjoinen), rungon tumman laatan paikalla: pilarin
        /// eteen ulkoneva kehys, jossa kaarevalakinen aukko; aukon takana tumma tausta, pielet ja kynnys. Patsas (kulta):
        /// kapeneva kaapu ja pää. Pieni osa ilman ääriviivaa kuten rungossa. 47 kolmiota.
        /// </summary>
        static void SaLSyvennys(Rakentaja r, float s)
        {
            float zp = SaPaksuus * 1.15f * 0.5f, zf = zp + 0.0028f, zb = zp + 0.0003f;
            const float fx = 0.0092f, fy0 = 0.2175f, fy1 = 0.2545f, ox = 0.0048f, oy0 = 0.2235f, oys = 0.2427f;
            Vector3 P(float x, float y, float z) => new Vector3(x, y, s * z);
            var n = new Vector3(0f, 0f, s);
            r.AloitaOsa();
            // Kehyksen etupinta aukon ympärillä (kaaressa 3 lohkoa) sekä sivut ja laki.
            Vector3 BL = P(-fx, fy0, zf), BR = P(fx, fy0, zf), TR = P(fx, fy1, zf), TL = P(-fx, fy1, zf);
            r.NelioUlos(BL, BR, P(ox, oy0, zf), P(-ox, oy0, zf), n, SaLKehys);
            r.NelioUlos(BR, TR, P(ox, oys, zf), P(ox, oy0, zf), n, SaLKehys);
            r.NelioUlos(TL, BL, P(-ox, oy0, zf), P(-ox, oys, zf), n, SaLKehys);
            Vector3 K(int j, float z) { float a = j * Mathf.PI / 3f; return P(Mathf.Cos(a) * ox, oys + Mathf.Sin(a) * ox, z); }
            r.KolmioUlos(K(0, zf), K(1, zf), TR, n, SaLKehys);
            r.KolmioUlos(TR, TL, K(1, zf), n, SaLKehys);
            r.KolmioUlos(K(1, zf), K(2, zf), TL, n, SaLKehys);
            r.KolmioUlos(K(2, zf), K(3, zf), TL, n, SaLKehys);
            foreach (float sx in new[] { -1f, 1f })
                r.NelioUlos(P(sx * fx, fy0, zp), P(sx * fx, fy0, zf), P(sx * fx, fy1, zf), P(sx * fx, fy1, zp), new Vector3(sx, 0f, 0f), SaLKehys);
            r.NelioUlos(P(-fx, fy1, zp), P(fx, fy1, zp), P(fx, fy1, zf), P(-fx, fy1, zf), Vector3.up, SaLValo);
            // Aukko: tumma tausta (suorakulmio ja puolikiekko), pielet ja kynnys.
            r.NelioUlos(P(-ox, oy0, zb), P(ox, oy0, zb), P(ox, oys, zb), P(-ox, oys, zb), n, SaHolvi);
            for (int j = 0; j < 3; j++) r.KolmioUlos(P(0f, oys, zb), K(j, zb), K(j + 1, zb), n, SaHolvi);
            foreach (float sx in new[] { -1f, 1f })
                r.NelioUlos(P(sx * ox, oy0, zb), P(sx * ox, oy0, zf), P(sx * ox, oys, zf), P(sx * ox, oys, zb), new Vector3(-sx, 0f, 0f), SaGraniittiVarjo);
            r.NelioUlos(P(-ox, oy0, zb), P(ox, oy0, zb), P(ox, oy0, zf), P(-ox, oy0, zf), Vector3.up, SaLValo);
            r.LopetaOsa();
            // Patsas: kapeneva kaapu (kuusi sivua) ja pää syvennyksen keskellä.
            var jalka = P(0f, oy0, (zb + zf) * 0.5f);
            r.AloitaOsa();
            r.Vaippa(jalka, 0.0031f, 0.0016f, 0.0158f, 6, EmKulta);
            r.Timantti(jalka + Vector3.up * 0.0178f, 0.0019f, 0.0022f, EmKulta, 4);
            r.LopetaOsa();
        }

        /// <summary>Kimallus: vaalea vesiviiru (pivot keskellä), liukuu kourua pitkin.</summary>
        static Mesh SegovianAkveduktiVesi()
        {
            var r = new Rakentaja();
            r.NelioUlos(new Vector3(-0.05f, 0f, -0.0045f), new Vector3(0.05f, 0f, -0.0045f), new Vector3(0.05f, 0f, 0.0045f), new Vector3(-0.05f, 0f, 0.0045f),
                Vector3.up, EmVesi);
            r.NelioUlos(new Vector3(-0.012f, 0.0005f, -0.003f), new Vector3(0.012f, 0.0005f, -0.003f), new Vector3(0.012f, 0.0005f, 0.003f),
                new Vector3(-0.012f, 0.0005f, 0.003f), Vector3.up, EmVaahto);
            return r.Verkko("SegovianAkvedukti-vesi");
        }

        /// <summary>Paholaisen kivi: tumma graniittilohko (pivot keskellä).</summary>
        static Mesh SegovianAkveduktiKivi()
        {
            var r = new Rakentaja();
            r.Laatikko(new Vector3(0f, -0.014f, 0f), new Vector3(0.034f, 0.028f, 0.03f), SaGraniittiVarjo, SaGraniitti);
            return r.Verkko("SegovianAkvedukti-kivi");
        }

        /// <summary>Aamunkoitto: kultainen kajo kahdeksan keskimmäisen alakaaren aukoissa (eteläpuoli, aukiolle päin).</summary>
        static Mesh SegovianAkveduktiAamu()
        {
            var r = new Rakentaja();
            for (int i = -4; i < 4; i++)
                r.Laatta(new Vector3((i + 0.5f) * SaVali, SaVyo * 0.4f, 0f), Vector3.back, SaVali - SaPilari - 0.004f, SaVyo * 0.55f, EmKulta);
            return r.Verkko("SegovianAkvedukti-aamu");
        }

        /// <summary>Yövalot: lämmin hehku alakaarien aukoissa molemmin puolin (valaistus alhaalta).</summary>
        static Mesh SegovianAkveduktiValot()
        {
            var r = new Rakentaja();
            float x0 = -SaKaaria * SaVali * 0.5f;
            for (int i = 0; i < SaKaaria; i++)
            {
                float cx = x0 + (i + 0.5f) * SaVali, g = SaMaanKorkeus(cx);
                if (SaYla - g < 0.05f) continue;
                foreach (float s in new[] { -1f, 1f })
                    r.Laatta(new Vector3(cx, g + (SaYla - g) * 0.3f, s * 0.001f), new Vector3(0f, 0f, s), SaVali - SaPilari - 0.006f, (SaYla - g) * 0.4f, EmIkkunavalo);
            }
            return r.Verkko("SegovianAkvedukti-valot");
        }

        /// <summary>Kiven lähtöpaikka aukiolla (etelän puolella) ja kohde kourun vieressä keskellä.</summary>
        static readonly Vector3 SaKiviAlku = new Vector3(0.06f, 0.03f, -0.12f);

        static LiikkuvaOsaMaaritys[] SegovianAkveduktiOsat() => new[]
        {
            new LiikkuvaOsaMaaritys { Nimi = "vesi", Verkko = SegovianAkveduktiVesi, Pivot = new Vector3(0f, SaYla + SaKouru + 0.002f, 0f), Liike = Liike.Liuku,
                Akseli = Vector3.right, Laajuus = 0.45f, KayS = 10f, TaukoS = 12f },
            new LiikkuvaOsaMaaritys { Nimi = "kivi", Verkko = SegovianAkveduktiKivi, Pivot = SaKiviAlku, Liike = Liike.Nousu, Akseli = Vector3.up },
            new LiikkuvaOsaMaaritys { Nimi = "aamu", Verkko = SegovianAkveduktiAamu, Pivot = new Vector3(0f, 0f, -SaPaksuus * 0.62f), Liike = Liike.Valahdys },
            new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = SegovianAkveduktiValot, Pivot = Vector3.zero, Liike = Liike.Valahdys },
        };

        static readonly bool segovianAkvedukti = Rekisteroi("segovian-akvedukti",
            new Erikoismalli { Runko = SegovianAkveduktiRunko, Osat = SegovianAkveduktiOsat, Lahi = SegovianAkveduktiLahi, Kolmiot0 = 1000, KokoKerroin = 1.5f });
    }
}
