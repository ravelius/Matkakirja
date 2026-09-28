// ISS:N KYYTI (omistajan kysymys 27.9.2026 klo 23.5x: "pääseekö astronautin kamerassa jo iss:n kyytiin?"; Linssisepän
// suositus docs/raportit/iss-kyyti-suositus-20260928.md, Pelikoodari kuittasi webin samoilla luvuilla). Kolme tilaa
// napautuksella: kaukonäkymä → seuranta (kamera ISS:n takana ja yllä 1 200 km, kallistus 55°) → Cupola-ikkuna (silmä ISS:ssä,
// katse radan suuntaan 55° alas, kenttäkulma 80°) → takaisin seurantaan; ✕ palaa kaukonäkymään.
//
// Puhdas C#: kameran asento (Kuvakulma) ISS:n paikasta, korkeudesta ja maajäljen suunnasta, sekä siirtymät asentojen
// välillä. Kohde liikkuu ajon aikana (7,66 km/s), joten siirtymä sekoittaa lähtöasennon ja kohdetilan TÄMÄN kehyksen
// asennon, eikä valmista kamera-ajoa voi käyttää. Unity-sovitin vie asennon PalloKierto.Kuvaa-metodille.
using System;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Iss
{
    public enum KyydinTila { Kauko, Seuranta, Ikkuna }

    /// <summary>ISS tällä hetkellä: alapiste, korkeus ellipsoidista (m) ja maajäljen suunta (asteina).</summary>
    public readonly struct IssHetki
    {
        public readonly LatLon Paikka;
        public readonly double KorkeusM, Suuntima;
        public IssHetki(LatLon paikka, double korkeusM, double suuntima) { Paikka = paikka; KorkeusM = korkeusM; Suuntima = suuntima; }
    }

    /// <summary>Kyydin kameran asennot pallomallilla (säde 6 371 km; ellipsoidin ero on kilometrejä, ei näy).</summary>
    public static class IssKuvakulma
    {
        public const double MaanSadeM = 6_371_000;
        /// <summary>Seuranta: silmän etäisyys ISS:stä ja kallistus ISS:n pystysuorasta (ISS maan reunan alla, kaari yllä).</summary>
        public const double SeurannanEtaisyysM = 1_200_000, SeurannanKallistus = 55;
        /// <summary>Ikkuna: katse radan suuntaan näin monta astetta vaakatason alapuolelle (horisontti 420 km:stä 20,3°).</summary>
        public const double IkkunanKatseAlas = 55;
        /// <summary>Cupolan keskilasin kenttäkulma pystyyn (lasi 80 cm, silmä 45 cm:n päässä).</summary>
        public const double IkkunanKentta = 80;

        const double Deg = Math.PI / 180;

        public static Kuvakulma Seuranta(in IssHetki iss) =>
            new Kuvakulma(iss.Paikka.Lat, iss.Paikka.Lon, SeurannanEtaisyysM, SeurannanKallistus, iss.Suuntima, iss.KorkeusM);

        /// <summary>
        /// Ikkuna: silmä ISS:ssä, katse maajäljen suuntaan <paramref name="alas"/> astetta vaakatason alapuolelle. Katsekohde
        /// on maan piste, johon katse osuu: nadiirikulma η = 90° − alas, kohteen zeniittikulma ζ = asin((R + h) / R · sin η),
        /// keskuskulma θ = ζ − η ja etäisyys ρ = R sin θ / sin η (420 km, 55°: θ 2,69°, ρ 521 km, ζ 37,7°). Kallistus on ζ ja
        /// suuntima kohteessa isoympyrän loppusuunta, jolloin silmä osuu ISS:ään.
        /// </summary>
        public static Kuvakulma Ikkuna(in IssHetki iss, double alas = IkkunanKatseAlas)
        {
            double r = MaanSadeM, h = Math.Max(1000, iss.KorkeusM);
            // Katseen on osuttava maahan: horisontin alapuolella vähintään 1°.
            double horisontti = Math.Acos(r / (r + h)) / Deg;
            alas = Math.Max(alas, horisontti + 1);
            double eta = (90 - alas) * Deg;
            double zeta = Math.Asin(Math.Min(1, (r + h) / r * Math.Sin(eta)));
            double theta = zeta - eta;
            double rho = eta > 1e-9 ? r * Math.Sin(theta) / Math.Sin(eta) : h;
            Kohde(iss.Paikka.Lat, iss.Paikka.Lon, iss.Suuntima, theta / Deg, out double lat, out double lon, out double loppu);
            return new Kuvakulma(lat, lon, rho, zeta / Deg, loppu, 0);
        }

        /// <summary>Kaukonäkymän asento pelaajan kamerasta (katse alas, suuntima säilyy).</summary>
        public static Kuvakulma Kauko(double lat, double lon, double korkeusM, double kallistus, double suuntima) =>
            new Kuvakulma(lat, lon, korkeusM, kallistus, suuntima, 0);

        /// <summary>Isoympyrän alkusuunta pisteestä a pisteeseen b (asteina 0…360).</summary>
        public static double Suunta(double lat1, double lon1, double lat2, double lon2)
        {
            double p1 = lat1 * Deg, p2 = lat2 * Deg, dl = (lon2 - lon1) * Deg;
            double y = Math.Sin(dl) * Math.Cos(p2), x = Math.Cos(p1) * Math.Sin(p2) - Math.Sin(p1) * Math.Cos(p2) * Math.Cos(dl);
            return (Math.Atan2(y, x) / Deg + 360) % 360;
        }

        /// <summary>Piste isoympyrällä: lähtö, suunta ja keskuskulma (asteina) → kohde ja loppusuunta.</summary>
        public static void Kohde(double lat, double lon, double suunta, double kaari, out double lat2, out double lon2, out double loppu)
        {
            double p1 = lat * Deg, l1 = lon * Deg, b = suunta * Deg, d = kaari * Deg;
            double p2 = Math.Asin(Math.Sin(p1) * Math.Cos(d) + Math.Cos(p1) * Math.Sin(d) * Math.Cos(b));
            double l2 = l1 + Math.Atan2(Math.Sin(b) * Math.Sin(d) * Math.Cos(p1), Math.Cos(d) - Math.Sin(p1) * Math.Sin(p2));
            lat2 = p2 / Deg;
            lon2 = ((l2 / Deg) + 540) % 360 - 180;
            loppu = (Suunta(lat2, lon2, lat, lon) + 180) % 360;
        }

        /// <summary>
        /// Asentojen sekoitus (t = 0…1, jo pehmennetty): katsekohde isoympyrää pitkin (slerp), etäisyys logaritmisesti
        /// (tasainen zoomin tuntu 18 000 km → 1 200 km), kallistus ja katsekorkeus lineaarisesti, suuntima lyhintä tietä.
        /// </summary>
        public static Kuvakulma Sekoita(in Kuvakulma a, in Kuvakulma b, double t)
        {
            if (t <= 0) return a;
            if (t >= 1) return b;
            Yksikko(a.Lat, a.Lon, out double ax, out double ay, out double az);
            Yksikko(b.Lat, b.Lon, out double bx, out double by, out double bz);
            double c = Math.Max(-1, Math.Min(1, ax * bx + ay * by + az * bz)), w = Math.Acos(c);
            double x, y, z;
            if (w < 1e-9) { x = ax; y = ay; z = az; }
            else
            {
                double s = Math.Sin(w), ka = Math.Sin((1 - t) * w) / s, kb = Math.Sin(t * w) / s;
                x = ka * ax + kb * bx; y = ka * ay + kb * by; z = ka * az + kb * bz;
            }
            double lat = Math.Atan2(z, Math.Sqrt(x * x + y * y)) / Deg, lon = Math.Atan2(y, x) / Deg;
            double et = Math.Exp(Math.Log(Math.Max(1, a.EtaisyysM)) * (1 - t) + Math.Log(Math.Max(1, b.EtaisyysM)) * t);
            double ds = ((b.Suuntima - a.Suuntima) % 360 + 540) % 360 - 180;
            return new Kuvakulma(lat, lon, et, a.Kallistus + (b.Kallistus - a.Kallistus) * t, (a.Suuntima + ds * t + 360) % 360,
                a.KatseKorkeusM + (b.KatseKorkeusM - a.KatseKorkeusM) * t);
        }

        /// <summary>Keskuskulma (asteina) kahden pisteen välillä.</summary>
        public static double Kaari(double lat1, double lon1, double lat2, double lon2)
        {
            Yksikko(lat1, lon1, out double ax, out double ay, out double az);
            Yksikko(lat2, lon2, out double bx, out double by, out double bz);
            return Math.Acos(Math.Max(-1, Math.Min(1, ax * bx + ay * by + az * bz))) / Deg;
        }

        static void Yksikko(double lat, double lon, out double x, out double y, out double z)
        {
            double p = lat * Deg, l = lon * Deg;
            x = Math.Cos(p) * Math.Cos(l); y = Math.Cos(p) * Math.Sin(l); z = Math.Sin(p);
        }
    }

    /// <summary>
    /// Cupolan valaistus (omistajan palaute 28.9.2026: valonlähteet tuovat luonnolliset valoisuuden muutokset sisäpintaan):
    /// onko ISS auringossa (sylinterivarjo: maan varjossa, kun aurinko on yli sivukulman verran pinnan alla), maavalo (maa
    /// alla päiväpuolella kirkas, yöpuolella hämärä) ja aurinko kameran koordinaateissa ruudun valonsuunnaksi.
    /// </summary>
    public static class CupolanValo
    {
        /// <summary>
        /// Auringossa, kun dot(ylös, aurinko) &gt; −√(1 − (R / (R + h))²): muuten aurinko on maan takana (420 km: −0,35 eli
        /// aurinko 20° horisontin alla). Palauttaa 0…1 pehmeällä reunalla (auringonnousu ISS:ltä kestää ~10 s).
        /// </summary>
        public static double Aurinkoisuus(double ylosDotAurinko, double korkeusKm)
        {
            double r = 6371.0 / (6371.0 + Math.Max(0, korkeusKm));
            double raja = -Math.Sqrt(Math.Max(0, 1 - r * r));
            return Pehmea((ylosDotAurinko - raja) / 0.02 + 0.5);
        }

        /// <summary>Maavalo 0,15…1: maa alla päiväpuolella kirkas, hämärässä himmenee, yöllä kaupunkien ja kuun valo.</summary>
        public static double Maavalo(double ylosDotAurinko) => 0.15 + 0.85 * Pehmea((ylosDotAurinko + 0.15) / 0.45);

        /// <summary>
        /// Aurinko kameran koordinaateissa (x oikealle, y ylös, z eteen) → ruudun valonsuunta (x, y) ja syvyys (z, &gt; 0 = edessä).
        /// Takana oleva aurinko valaisee kehystä sivulta (z rajataan), mutta ei koskaan suoraan edestä ruudun ulkopuolelta.
        /// </summary>
        public static (double x, double y, double z) Ruudulle(double x, double y, double z)
        {
            double l = Math.Sqrt(x * x + y * y + z * z);
            if (l < 1e-9) return (0, 1, 0);
            return (x / l, y / l, z / l);
        }

        static double Pehmea(double t)
        {
            t = t < 0 ? 0 : t > 1 ? 1 : t;
            return t * t * (3 - 2 * t);
        }
    }

    /// <summary>
    /// Kyydin tilakone: napautus vie seuraavaan tilaan, Poistu kaukonäkymään. Paivita antaa joka kehys kameran asennon ja
    /// kenttäkulman (siirtymän aikana sekoitettuna). Kaukonäkymässä kamera on pelaajan, joten asentoa ei anneta.
    /// </summary>
    public sealed class IssKyyti
    {
        /// <summary>Siirtymien kestot (s): kaukaa seurantaan (+ enintään 1,5 s, jos ISS on pallon toisella puolella), seurannan
        /// ja ikkunan välillä, sekä paluu kaukonäkymään.</summary>
        public const double KyytiinS = 2.5, KyytiinLisaS = 1.5, IkkunaanS = 1.2, KaukoonS = 2.0;
        /// <summary>Paluun korkeus avauskorkeuden osuutena (astronautin kameran lepokorkeus).</summary>
        public const double PaluuKorkeus = 0.72;

        /// <summary>Tila, johon ollaan menossa tai jossa ollaan.</summary>
        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kamera on kyydissä (seuranta, ikkuna tai siirtymä niiden välillä tai paluu kesken).</summary>
        public bool Kyydissa => Tila != KyydinTila.Kauko || siirtyy;
        public bool Siirtyy => siirtyy;

        Kuvakulma alku, viimeisin;
        double alkuKentta, viimeisinKentta, t0, kesto;
        bool siirtyy;
        double paluuKorkeus;

        /// <summary>Napautus: kauko → seuranta → ikkuna → seuranta. <paramref name="nykyinen"/> on kameran asento nyt.</summary>
        public void Napauta(in Kuvakulma nykyinen, in IssHetki iss, double kentta, double nyt, bool vahennetty)
        {
            switch (Tila)
            {
                case KyydinTila.Kauko:
                    double kaari = IssKuvakulma.Kaari(nykyinen.Lat, nykyinen.Lon, iss.Paikka.Lat, iss.Paikka.Lon);
                    Aloita(KyydinTila.Seuranta, nykyinen, kentta, nyt, vahennetty ? 0 : KyytiinS + KyytiinLisaS * kaari / 180);
                    break;
                case KyydinTila.Seuranta:
                    Aloita(KyydinTila.Ikkuna, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : IkkunaanS);
                    break;
                case KyydinTila.Ikkuna:
                    Aloita(KyydinTila.Seuranta, siirtyy ? viimeisin : nykyinen, siirtyy ? viimeisinKentta : kentta, nyt, vahennetty ? 0 : IkkunaanS);
                    break;
            }
        }

        /// <summary>✕: paluu kaukonäkymään ISS:n alapisteen ylle korkeudelle <paramref name="kaukoKorkeusM"/>.</summary>
        public void Poistu(double kaukoKorkeusM, double nyt, bool vahennetty)
        {
            if (!Kyydissa || (Tila == KyydinTila.Kauko && siirtyy)) return;
            paluuKorkeus = kaukoKorkeusM;
            Aloita(KyydinTila.Kauko, viimeisin, viimeisinKentta, nyt, vahennetty ? 0 : KaukoonS);
        }

        /// <summary>Kyyti pois heti (linssi suljetaan): ei asentoa, kenttäkulma palautetaan kutsujan puolella.</summary>
        public void Nollaa() { Tila = KyydinTila.Kauko; siirtyy = false; }

        void Aloita(KyydinTila uusi, in Kuvakulma nykyinen, double kentta, double nyt, double kestoS)
        {
            Tila = uusi;
            alku = nykyinen;
            alkuKentta = kentta;
            t0 = nyt;
            kesto = Math.Max(0, kestoS);
            siirtyy = true;
        }

        /// <summary>
        /// Tämän kehyksen asento ja kenttäkulma. false = kamera on pelaajan (kaukonäkymä, myös heti paluun päätyttyä:
        /// <paramref name="paluuValmis"/> kertoo, että kutsujan pitää lopettaa kuvaus ja palauttaa kenttäkulma).
        /// </summary>
        public bool Paivita(double nyt, in IssHetki iss, double perusKentta, out Kuvakulma asento, out double kentta, out bool paluuValmis)
        {
            paluuValmis = false;
            asento = default;
            kentta = perusKentta;
            if (!Kyydissa) return false;
            Kuvakulma kohde;
            double kohdeKentta = perusKentta;
            switch (Tila)
            {
                case KyydinTila.Seuranta: kohde = IssKuvakulma.Seuranta(iss); break;
                case KyydinTila.Ikkuna: kohde = IssKuvakulma.Ikkuna(iss); kohdeKentta = IssKuvakulma.IkkunanKentta; break;
                default:
                    kohde = IssKuvakulma.Kauko(Math.Max(-55, Math.Min(55, iss.Paikka.Lat)), iss.Paikka.Lon, paluuKorkeus, 0, 0);
                    break;
            }
            double u = kesto <= 0 ? 1 : Math.Max(0, Math.Min(1, (nyt - t0) / kesto));
            double s = Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea(u);
            asento = siirtyy ? IssKuvakulma.Sekoita(alku, kohde, s) : kohde;
            kentta = siirtyy ? alkuKentta + (kohdeKentta - alkuKentta) * s : kohdeKentta;
            if (u >= 1) siirtyy = false;
            viimeisin = asento;
            viimeisinKentta = kentta;
            if (Tila == KyydinTila.Kauko && !siirtyy) { paluuValmis = true; return true; }
            return true;
        }
    }
}
