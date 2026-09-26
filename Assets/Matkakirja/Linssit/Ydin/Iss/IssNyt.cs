// ISS NYT (ISS-linssin suunnitelma docs/raportit/iss-linssi-suunnitelma-20260926.md, omistaja hyväksyi 14.4x): ISS:n
// todellinen paikka ja maajälki UTC-kellosta. Puhdas C#. TLE tulee Unity-puolelta (ämpäri → välimuisti → buildin
// tiedosto, Siirtosepän iss-tle.json #3334); Aseta pitää uusimman epookin. Kun TLE on yli 30 vrk vanha tai sitä ei ole,
// käytetään havainnollista 51,6°:n rataa oikealla kierrosajalla (suunnitelma, "Kun verkkoa ei ole").
using System;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Iss
{
    /// <summary>Radan laatu TLE:n iän mukaan: ≤ 7 vrk tarkka, 7–30 vrk arvio, muuten havainnollinen.</summary>
    public enum RadanLaatu { Tarkka, Arvio, Havainnollinen }

    public static class IssNyt
    {
        public const double TarkkaVrk = 7, ArvioVrk = 30;
        /// <summary>Havainnollisen radan kierrosaika (s, ISS noin 92,9 min) ja tähtivuorokausi (s).</summary>
        public const double KierrosS = 5574, TahtivuorokausiS = 86164.0905;
        /// <summary>Maajäljen uudelleenlaskennan väli (s): 2 × 240 SGP4-pistettä on liian raskas joka kehykseen.</summary>
        public const double KaarenValiS = 10;

        static Tle tle;
        static Rata rata;

        /// <summary>UTC-kello (testit korvaavat).</summary>
        public static Func<DateTime> Kello = () => DateTime.UtcNow;

        public static Tle Tle => tle;
        /// <summary>Kasvaa, kun TLE vaihtuu (kutsuja laskee maajäljen uudelleen).</summary>
        public static int Versio { get; private set; }

        /// <summary>Asettaa TLE:n, jos se on käyttökelpoinen ja uudempi (epookki) kuin nykyinen. true = vaihtui.</summary>
        public static bool Aseta(Tle t)
        {
            if (t == null || !t.TarkisteOk || (tle != null && t.EpookkiJd <= tle.EpookkiJd)) return false;
            var r = new Rata(t);
            if (!r.Kaytettavissa) return false;
            tle = t; rata = r; Versio++;
            return true;
        }

        public static void Nollaa() { tle = null; rata = null; Versio++; }

        /// <summary>TLE:n ikä vuorokausina hetkellä utc (∞ ilman TLE:tä).</summary>
        public static double IkaVrk(DateTime utc) => tle == null ? double.PositiveInfinity : Aika.Jd(utc) - tle.EpookkiJd;

        public static RadanLaatu Laatu(DateTime utc)
        {
            double ika = Math.Abs(IkaVrk(utc));
            return ika <= TarkkaVrk ? RadanLaatu.Tarkka : ika <= ArvioVrk ? RadanLaatu.Arvio : RadanLaatu.Havainnollinen;
        }

        /// <summary>ISS:n alapiste hetkellä utc (SGP4 tai havainnollinen rata).</summary>
        public static LatLon Paikka(DateTime utc) => Paikka(Aika.Jd(utc), Laatu(utc) != RadanLaatu.Havainnollinen);

        static LatLon Paikka(double jd, bool sgp4)
        {
            if (sgp4 && rata.Alapiste(jd, out double lat, out double lon, out _)) return new LatLon(lat, lon);
            // Havainnollinen: 51,6°:n ympyrärata, jonka alla maa kiertyy länteen tähtivuorokauden tahdissa.
            double s = (jd - 2451545.0) * 86400.0;
            return Astronautti.Astronauttimatikka.RadanPiste(360.0 * (s % KierrosS) / KierrosS, -360.0 * (s % TahtivuorokausiS) / TahtivuorokausiS);
        }

        /// <summary>
        /// Maajälki puoli kierrosta taakse ja eteen hetkestä utc valmiiseen taulukkoon (pisteitä = pituus − 1, keskipiste on
        /// ISS). Kutsuja laskee sen KaarenValiS:n välein.
        /// </summary>
        public static void Kaari(DateTime utc, LatLon[] ulos)
        {
            int n = ulos.Length - 1;
            if (n < 1) return;
            bool sgp4 = Laatu(utc) != RadanLaatu.Havainnollinen;
            double kierrosVrk = (sgp4 ? rata.KierrosMin * 60 : KierrosS) / 86400.0, jd0 = Aika.Jd(utc);
            for (int k = 0; k <= n; k++) ulos[k] = Paikka(jd0 + kierrosVrk * ((double)k / n - 0.5), sgp4);
        }
    }
}
