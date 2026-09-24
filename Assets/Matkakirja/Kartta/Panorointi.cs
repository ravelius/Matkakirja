using System;

namespace Matkakirja
{
    /// <summary>
    /// PANOROINTI RUUTUPISTEESEEN (Natiivi-UI:n pyyntö, löydös 48, build 12): kameran katselupiste (pituus, leveys),
    /// jolla annettu maan pinnan piste projisoituu annettuun ruutupisteeseen, kun korkeus, kallistus ja suuntima pysyvät.
    /// Puhdas osa ilman UnityEngineä (Kartta-testit): projektio annetaan funktiona, ja PalloKierto.Panoroi antaa sen
    /// samalla asennonlaskulla kuin kameran päivitys (PalloKierto.LaskeAsento), joten geometria ei haaraudu.
    ///
    /// Ratkaisu on Newtonin menetelmä numeerisella Jacobin matriisilla (sekanttiaskel = kaksi lisäprojektiota
    /// kierrosta kohden) ja askeleen puolituksella: jos täysi askel ei pienennä virhettä, askel puolitetaan
    /// enintään viidesti. Hyvällä alkuarvauksella (maa maalipikselin alla, PalloKierto) 2–3 kierrosta riittää
    /// alle pikselin virheeseen.
    ///
    /// Web: js/pallolauta/lauta.js napautaKaupunki siirtää kameran keskipistettä laudan yksiköissä
    /// (kameranTila().skaala); pallolla sama siirto on tämä ratkaisu, koska kallistus ja suuntima tekevät
    /// ruudun ja maan välisestä kuvauksesta epälineaarisen.
    /// </summary>
    public static class Panorointi
    {
        /// <summary>Web LIUSKAN_AJO_MS = 420 (js/pallolauta/kamera.js, PAATOKSET 34 kohta 14 a).</summary>
        public const float LiuskanAjoS = 0.42f;

        /// <summary>Web LIUSKAN_AJON_RAMPPI = 0,12: siirtoajonPehmennys lyhyellä kiihdytyksellä (100 ms:ssa viidennes matkasta).</summary>
        public const double LiuskanRamppi = 0.12;

        /// <summary>
        /// Projektio: kameran katselupisteellä (pituus, leveys) kohdepisteen ruutupaikka pikseleinä (origo vasen
        /// alakulma). false = piste on kameran takana (ei projektiota).
        /// </summary>
        public delegate bool Projektio(double pituus, double leveys, out double x, out double y);

        public struct Tulos
        {
            public double Pituus, Leveys;
            /// <summary>Jäljelle jäävä virhe ruudulla pikseleinä (∞ = projektio ei onnistunut alussakaan).</summary>
            public double Virhe;
            public int Kierroksia;
            /// <summary>Virhe on toleranssin sisällä.</summary>
            public bool Onnistui;
        }

        /// <summary>
        /// Ratkaisee katselupisteen. <paramref name="askel"/> = derivaatan erotusaskel asteina leveyssuunnassa (noin
        /// muutaman pikselin kaari; pituussuunnassa jaetaan cos(leveys):llä). Leveys rajataan ±<paramref name="maxLeveys"/>
        /// (PalloKierto.maxLeveys), pituus kiedotaan −180…180. Palauttaa parhaan löydetyn pisteen myös epäonnistuessa.
        /// </summary>
        public static Tulos Ratkaise(Projektio f, double pituus0, double leveys0, double maaliX, double maaliY,
            double askel, double maxLeveys = 80.0, double toleranssi = 0.25, int kierroksia = 8)
        {
            double pit = Kiedo(pituus0), lev = Rajaa(leveys0, maxLeveys);
            var tulos = new Tulos { Pituus = pit, Leveys = lev, Virhe = double.PositiveInfinity };
            if (!f(pit, lev, out double x, out double y) || !Aarellinen(x, y)) return tulos;
            double ex = x - maaliX, ey = y - maaliY, e = Math.Sqrt(ex * ex + ey * ey);
            tulos.Virhe = e;
            double h = Math.Max(1e-9, Math.Abs(askel));
            for (int k = 0; k < kierroksia && e > toleranssi; k++)
            {
                tulos.Kierroksia = k + 1;
                // Jacobin matriisi eteenpäin-erotuksin; napojen lähellä leveysaskel käännetään rajan sisäpuolelle.
                double hLon = h / Math.Max(0.2, Math.Cos(lev * Math.PI / 180.0));
                double hLat = lev + h > maxLeveys ? -h : h;
                if (!f(Kiedo(pit + hLon), lev, out double xa, out double ya) || !Aarellinen(xa, ya)) break;
                if (!f(pit, lev + hLat, out double xb, out double yb) || !Aarellinen(xb, yb)) break;
                double j11 = (xa - x) / hLon, j21 = (ya - y) / hLon;
                double j12 = (xb - x) / hLat, j22 = (yb - y) / hLat;
                double det = j11 * j22 - j12 * j21;
                if (!(Math.Abs(det) > 1e-12)) break;
                double dPit = (-ex * j22 + ey * j12) / det;
                double dLev = (ex * j21 - ey * j11) / det;
                bool parani = false;
                for (double s = 1.0; s >= 1.0 / 32.0; s *= 0.5)
                {
                    double p1 = Kiedo(pit + dPit * s), l1 = Rajaa(lev + dLev * s, maxLeveys);
                    if (!f(p1, l1, out double x1, out double y1) || !Aarellinen(x1, y1)) continue;
                    double ex1 = x1 - maaliX, ey1 = y1 - maaliY, e1 = Math.Sqrt(ex1 * ex1 + ey1 * ey1);
                    if (e1 >= e) continue;
                    pit = p1; lev = l1; x = x1; y = y1; ex = ex1; ey = ey1; e = e1;
                    parani = true;
                    break;
                }
                if (!parani) break;
            }
            tulos.Pituus = pit;
            tulos.Leveys = lev;
            tulos.Virhe = e;
            tulos.Onnistui = e <= toleranssi;
            return tulos;
        }

        /// <summary>
        /// Alkuarvaus: kamera siirtyy saman verran kuin maalipikselin alla oleva maa (maaPituus, maaLeveys) on
        /// kohteesta, eli kohde tulee maalipikselin alle, jos kuvaus olisi siirron suhteen tasainen. Tarkka
        /// pohjoinen-ylös-kameralle tasaisella maalla; muuten Newton korjaa loput.
        /// </summary>
        public static (double pituus, double leveys) Alkuarvaus(double kameraPituus, double kameraLeveys,
            double maaPituus, double maaLeveys, double kohdePituus, double kohdeLeveys, double maxLeveys = 80.0) =>
            (Kiedo(kameraPituus + Kiedo(kohdePituus - maaPituus)), Rajaa(kameraLeveys + kohdeLeveys - maaLeveys, maxLeveys));

        public static double Kiedo(double lon) => ((lon % 360.0) + 540.0) % 360.0 - 180.0;

        static double Rajaa(double lat, double max) => Math.Max(-max, Math.Min(max, lat));

        static bool Aarellinen(double x, double y) => !double.IsNaN(x) && !double.IsInfinity(x) && !double.IsNaN(y) && !double.IsInfinity(y);
    }
}
