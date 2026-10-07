// KAUPUNGIN YÖVALOT (kuvanlaatujärjestys kohta 2, Päätoimittaja 6.10.; omistaja: natrium-oranssi): moottoriton osa. NASA Black
// Marble 2016 (500 m) Euroopan yhden asteen laattoina ämpärissä (linssit/kaupunki/yovalot-2026-10-06/{lat}_{lon}.jpg, lounaiskulma,
// 240 px / aste; tyokalut/kaupunki_yovalot.py). Kamera tarvitsee ympärilleen 3 × 3 laattaa (~330 × 220 km Keski-Euroopassa);
// varjostin (KaupunkiYovalot.shader) muuntaa ruudun pisteen syvyydestä asteiksi ja lukee valon voimakkuuden: kaukana pehmeä hehku,
// lähellä katuvalopisteet, joiden tiheys seuraa Black Marblea. Valot syttyvät hämärässä (aurinko −2…−8°).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class KaupunkiYovalot
    {
        public const string Juuri = "https://media.matkakirja.app/linssit/kaupunki/yovalot-2026-10-06/";
        public const int PxAste = 240, Ruudukko = 3;
        /// <summary>VAIN EUROOPPA: laattojen alue (lat 34–72, lon −25…45).</summary>
        public const int LatMin = 34, LatMax = 72, LonMin = -25, LonMax = 45;

        /// <summary>Laatan nimi lounaiskulmasta ("48_2", "38_-10"). Invariantti kulttuuri: fi-FI kirjoittaisi miinuksen U+2212:na.</summary>
        public static string Nimi(int lat, int lon) =>
            lat.ToString(System.Globalization.CultureInfo.InvariantCulture) + "_" + lon.ToString(System.Globalization.CultureInfo.InvariantCulture);

        /// <summary>3 × 3 -ruudukon lounaiskulma pisteen ympärille (keskimmäinen laatta sisältää pisteen).</summary>
        public static (int lat, int lon) Kulma(double lat, double lon) => ((int)Math.Floor(lat) - 1, (int)Math.Floor(lon) - 1);

        /// <summary>Ruudukon laatat (rivi 0 etelässä, sarake 0 lännessä) — vain alueen sisällä olevat; muut ovat pimeitä.</summary>
        public static List<(int rivi, int sarake, string nimi)> Laatat(double lat, double lon)
        {
            var (la, lo) = Kulma(lat, lon);
            var l = new List<(int, int, string)>();
            for (int r = 0; r < Ruudukko; r++)
                for (int s = 0; s < Ruudukko; s++)
                {
                    int a = la + r, o = lo + s;
                    if (a >= LatMin && a < LatMax && o >= LonMin && o < LonMax) l.Add((r, s, Nimi(a, o)));
                }
            return l;
        }

        /// <summary>Ruudukon tekstuurikoordinaatti (0–1, v = 0 etelässä) asteista.</summary>
        public static (double u, double v) Uv((int lat, int lon) kulma, double lat, double lon) =>
            ((lon - kulma.lon) / Ruudukko, (lat - kulma.lat) / Ruudukko);

        /// <summary>Valojen osuus auringon korkeudesta: syttyvät −2°:ssa, täysi −8°:ssa (porvarillinen hämärä).</summary>
        public static double OsuusAuringosta(double korkeus) => Math.Max(0, Math.Min(1, (-2 - korkeus) / 6));

        /// <summary>Valojen osuus kellosta (asetuksen tunti tai pelaajan valinta): ilta 20–21.5 syttyy, aamu 4.5–6 sammuu.</summary>
        public static double OsuusTunnista(double tunti)
        {
            tunti %= 24; if (tunti < 0) tunti += 24;
            if (tunti >= 21.5 || tunti <= 4.5) return 1;
            if (tunti > 20) return (tunti - 20) / 1.5;
            if (tunti < 6) return (6 - tunti) / 1.5;
            return 0;
        }

        /// <summary>Pitääkö ruudukko ladata uudelleen: kamera on siirtynyt toisen keskilaatan alueelle.</summary>
        public static bool Vaihtuu((int lat, int lon)? nyt, double lat, double lon) => nyt == null || nyt.Value != Kulma(lat, lon);
    }
}
