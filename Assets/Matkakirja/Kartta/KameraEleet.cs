using System;

namespace Matkakirja
{
    /// <summary>Kahden sormen eleen lukittu tila (<see cref="KameraEleet.Paata"/>).</summary>
    public enum Elelukko
    {
        /// <summary>Mikään kynnys ei ole vielä ylittynyt: kamera ei liiku.</summary>
        Ei,
        /// <summary>Yhdensuuntainen pystyveto: vain kallistus muuttuu (ei zoomia, kiertoa eikä siirtoa).</summary>
        Kallistus,
        /// <summary>Nipistys + kierto + keskipisteen siirto: zoomi, suuntima ja panorointi; kallistus pysyy.</summary>
        NipistysKierto,
    }

    /// <summary>
    /// PALLON ELEIDEN PUHTAAT OSAT (omistajan build 9 -löydökset 28, 30 ja 31, 24.9.2026; natiivin omia, ei webissä):
    /// kahden sormen eleen lukitus, kallistusraja korkeuden mukaan, tuplanapautus, ruudun vedon kierto suuntiman
    /// mukaan ja kameran rako maastoon. Ei UnityEngineä: testit Peli-testit/Testit/KameraEleetTestit.cs.
    /// Kaikki ruudun mitat ovat pisteitä (iOS pt = näytön pikselit / PalloKierto.Pistekerroin), kulmat asteita.
    /// </summary>
    public static class KameraEleet
    {
        // ELELUKITUS kuten Apple Maps / Google Earth: eleen alussa kerätään liikettä, kunnes jokin kynnys ylittyy,
        // ja tila lukitaan siihen asti, kun sormia on alle kaksi.

        /// <summary>Nipistys: sormien välin suhteellinen muutos |ln(väli / alkuväli)| (0,07 ≈ 7 %, 200 pt:n välillä 14 pt).</summary>
        public const double NipistysKynnys = 0.07;
        /// <summary>Kierto: sormiparin kulman muutos asteina.</summary>
        public const double KiertoKynnysAst = 7.0;
        /// <summary>Kallistus: kummankin sormen pystysiirto samaan suuntaan vähintään näin monta pistettä.</summary>
        public const double KallistusKynnysPt = 12.0;
        /// <summary>Kallistuksessa keskipisteen pystysiirron pitää olla vähintään näin moninkertainen vaakasiirtoon.</summary>
        public const double KallistusPystysuhde = 1.5;
        /// <summary>Kahden sormen siirto ilman nipistystä ja kallistusta (vaaka tai vino) panoroi tämän jälkeen.</summary>
        public const double SiirtoKynnysPt = 20.0;

        /// <summary>
        /// Lukitseeko kahden sormen ele (sormet a ja b eleen alussa a0, b0 ja nyt a, b; pisteinä, y ylöspäin).
        /// Nipistys tai kierto voittaa, jos se ylittyy samassa kehyksessä kuin kallistus: kallistus vaatii, että
        /// väli ja kulma pysyvät kynnystensä alla.
        /// </summary>
        public static Elelukko Paata((double x, double y) a0, (double x, double y) b0,
            (double x, double y) a, (double x, double y) b)
        {
            double vali0 = Pituus(b0.x - a0.x, b0.y - a0.y), vali = Pituus(b.x - a.x, b.y - a.y);
            double nipistys = vali0 > 1e-3 && vali > 1e-3 ? Math.Abs(Math.Log(vali / vali0)) : 0;
            double kierto = Math.Abs(KulmaMuutos(a0, b0, a, b));
            if (nipistys >= NipistysKynnys || kierto >= KiertoKynnysAst) return Elelukko.NipistysKierto;

            double dya = a.y - a0.y, dyb = b.y - b0.y;
            double kx = (a.x - a0.x + b.x - b0.x) * 0.5, ky = (dya + dyb) * 0.5;
            bool samaan = dya * dyb > 0;
            if (samaan && Math.Min(Math.Abs(dya), Math.Abs(dyb)) >= KallistusKynnysPt
                && Math.Abs(ky) >= KallistusPystysuhde * Math.Abs(kx))
                return Elelukko.Kallistus;
            // Vaakasuuntainen tai vino kahden sormen veto: panorointi (NipistysKierto siirtää keskipisteen mukana).
            if (Pituus(kx, ky) >= SiirtoKynnysPt && Math.Abs(ky) < KallistusPystysuhde * Math.Abs(kx))
                return Elelukko.NipistysKierto;
            return Elelukko.Ei;
        }

        /// <summary>
        /// Sormiparin (a → b) kulman muutos asteina välillä −180…180, vastapäivään positiivinen
        /// (y ylöspäin kuten Unityn ruutu).
        /// </summary>
        public static double KulmaMuutos((double x, double y) a0, (double x, double y) b0,
            (double x, double y) a, (double x, double y) b)
        {
            double k0 = Math.Atan2(b0.y - a0.y, b0.x - a0.x), k1 = Math.Atan2(b.y - a.y, b.x - a.x);
            return Kiedo((k1 - k0) * 180.0 / Math.PI);
        }

        /// <summary>
        /// Suuntiman muutos sormiparin kierrosta: kun sormet kiertävät vastapäivään, kartta kiertyy sormien mukana
        /// vastapäivään, joten pohjoinen kääntyy ruudulla vasemmalle ja ruudun yläreuna osoittaa itään päin
        /// (suuntima kasvaa). Siis Δsuuntima = +Δkulma.
        /// </summary>
        public static double SuuntimanMuutos(double kulmaMuutosAst) => kulmaMuutosAst;

        // KALLISTUSRAJA (löydös 28 b): pelikorkeuksilla täysi, laskee vasta pallon mittakaavassa.

        /// <summary>Kallistus on täysi tähän korkeuteen asti (m).</summary>
        public const double KallistusTaysiM = 1_500_000.0;
        /// <summary>Kallistus on nolla tästä korkeudesta ylöspäin (m).</summary>
        public const double KallistusNollaM = 7_000_000.0;

        /// <summary>
        /// Sallittu kallistus korkeudella (kameran etäisyys katsottavasta pisteestä, m): maxKallistus, kun korkeus ≤
        /// taysiM, 0, kun ≥ nollaM, välillä smootherstep. Pelaajan tallennettua kallistusta ei leikata tällä:
        /// käytetty kallistus = min(tallennettu, raja), joten lähemmäs zoomatessa alkuperäinen kallistus palaa.
        /// </summary>
        public static double KallistusRaja(double korkeusM, double maxKallistus,
            double taysiM = KallistusTaysiM, double nollaM = KallistusNollaM)
        {
            double t = (korkeusM - taysiM) / Math.Max(1.0, nollaM - taysiM);
            return maxKallistus * (1.0 - Smootherstep(t));
        }

        /// <summary>Smootherstep 6t⁵ − 15t⁴ + 10t³ (t rajattuna 0–1).</summary>
        public static double Smootherstep(double t)
        {
            double x = Math.Max(0.0, Math.Min(1.0, t));
            return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
        }

        // TUPLANAPAUTUS (löydös 30): pohjoinen ylös. Ensimmäinen napautus käsitellään heti; toinen tunnistetaan.

        public const double TuplaAikaS = 0.3;
        public const double TuplaMatkaPt = 30.0;

        /// <summary>
        /// Onko napautus (aika s, paikka pt) edellisen napautuksen pari: enintään <see cref="TuplaAikaS"/> myöhemmin
        /// ja <see cref="TuplaMatkaPt"/> päässä. edellinenAika &lt; 0 = ei edellistä.
        /// </summary>
        public static bool OnTupla(double edellinenAika, (double x, double y) edellinen, double aika, (double x, double y) paikka)
        {
            if (edellinenAika < 0) return false;
            double dt = aika - edellinenAika;
            return dt >= 0 && dt <= TuplaAikaS && Pituus(paikka.x - edellinen.x, paikka.y - edellinen.y) <= TuplaMatkaPt;
        }

        // RUUDUN VETO KIERTYNEESSÄ NÄKYMÄSSÄ (löydös 30 ii).

        /// <summary>
        /// Ruudun siirto (dx oikealle, dy ylös) maan suuntiin (itä, pohjoinen), kun ruudun yläreuna osoittaa
        /// suuntimaan (0 = pohjoinen, 90 = itä). Ruudun oikea reuna on silloin suuntima + 90°.
        /// </summary>
        public static (double ita, double pohjoinen) RuutuMaahan(double dx, double dy, double suuntimaAst)
        {
            double b = suuntimaAst * Math.PI / 180.0, c = Math.Cos(b), s = Math.Sin(b);
            return (dx * c + dy * s, -dx * s + dy * c);
        }

        /// <summary>Kulma välille −180…180.</summary>
        public static double Kiedo(double ast) => ((ast % 360.0) + 540.0) % 360.0 - 180.0;

        // KAMERAN RAKO MAASTOON (löydös 31): kallistus 85° vie kameran lähelle maata.

        /// <summary>Kameran vähimmäisrako maanpintaan: 150 m tai 1 % etäisyydestä, suurempi.</summary>
        public static double VahimmaisRako(double etaisyysM) => Math.Max(150.0, etaisyysM * 0.01);

        /// <summary>
        /// Silmän korkeus pallon pinnasta (säde R), kun kamera on etäisyydellä d pisteestä korkeudella a ja
        /// kallistettuna k astetta pystysuorasta (pallomalli; ellipsoidin litistys ei vaikuta rakoon).
        /// </summary>
        public static double SilmanKorkeus(double a, double d, double kallistusAst, double R)
        {
            double ra = R + a, c = Math.Cos(kallistusAst * Math.PI / 180.0);
            return Math.Sqrt(Math.Max(0.0, ra * ra + d * d + 2.0 * ra * d * c)) - R;
        }

        /// <summary>
        /// Suurin kallistus (≤ pyydetty), jolla silmä on vähintään korkeudella minKorkeus. Jos kallistus 0 ei riitä,
        /// palauttaa kallistuksen 0 ja etäisyyden, jolla silmä on tasan minKorkeudella (kamera nousee).
        /// </summary>
        public static (double kallistus, double etaisyys) Maastolle(double a, double d, double kallistusAst,
            double minKorkeus, double R)
        {
            if (SilmanKorkeus(a, d, kallistusAst, R) >= minKorkeus) return (kallistusAst, d);
            double ra = R + a, rm = R + minKorkeus;
            double c = d > 1e-6 ? (rm * rm - ra * ra - d * d) / (2.0 * ra * d) : 2.0;
            if (c <= 1.0) return (Math.Min(kallistusAst, Math.Acos(Math.Max(-1.0, c)) * 180.0 / Math.PI), d);
            return (0.0, Math.Max(d, minKorkeus - a));
        }

        static double Pituus(double x, double y) => Math.Sqrt(x * x + y * y);
    }
}
