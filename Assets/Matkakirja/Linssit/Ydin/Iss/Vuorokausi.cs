// VUOROKAUDENAIKA ISS-KYYDISSÄ (omistaja 1.10.2026 Päätoimittajan kautta): aamu, päivä, ilta tai yö pysyy ISS:n alla, kun asema
// kulkee. Rata, Kuu ja tähdet kulkevat oikeassa (simuloidussa) ajassa; vain aurinko (valaistus, ilmakehä, yökuori ja kaupunkien
// valot) lasketaan omasta kellostaan (IssNyt.AurinkoKello), jonka siirto pitää auringon tuntikulman ISS:n alapisteessä
// valinnan mukaisena: aamu = aurinko idässä 10°:ssa, päivä = keskipäivä, ilta = kultainen tunti lännessä 5°:ssa, yö =
// keskiyö (keskikesän napa-alueilla aurinko ei laske −18°:een). null = LIVE (oikea aika). Puhdas C#.
using System;

namespace Matkakirja.Linssit.Iss
{
    public static class Vuorokausi
    {
        public const int Aamu = 0, Paiva = 1, Ilta = 2, Yo = 3;
        public static readonly string[] Nimet = { "Aamu", "Päivä", "Ilta", "Yö" };
        /// <summary>Valittu vuorokaudenaika; null = LIVE (aurinko oikeassa ajassa).</summary>
        public static int? Valittu;
        public const double AamuKorkeus = 10, IltaKorkeus = 5;

        /// <summary>Tavoitetuntikulma asteina (+ = aurinko lännessä eli iltapäivä) leveydellä lat ja deklinaatiolla dekl.</summary>
        public static double Tuntikulma(int valinta, double lat, double dekl)
        {
            switch (valinta)
            {
                case Paiva: return 0;
                case Yo: return 180;
                default:
                    double e = valinta == Aamu ? AamuKorkeus : IltaKorkeus, r = Math.PI / 180;
                    double c = (Math.Sin(e * r) - Math.Sin(lat * r) * Math.Sin(dekl * r)) / (Math.Cos(lat * r) * Math.Cos(dekl * r));
                    double h = Math.Acos(Math.Max(-1, Math.Min(1, c))) / r;   // napapäivä/-yö: lähin mahdollinen
                    return valinta == Aamu ? -h : h;
            }
        }

        /// <summary>Auringon kellon siirto tunteina (−12…12), jolla auringon tuntikulma pisteessä (lat, lon) on valinnan mukainen.</summary>
        public static double SiirtoTunteina(int valinta, double jd, double lat, double lon)
        {
            Aurinko.Alihajapiste(jd, out double dekl, out double slon);
            double nyt = Kulma(lon - slon);                        // kasvaa noin 15° tunnissa
            return Kulma(Tuntikulma(valinta, lat, dekl) - nyt) / 15.0;
        }

        /// <summary>Auringon hetki: utc + siirto valitulle vuorokaudenajalle ISS:n alapisteessä (lat, lon); LIVE = utc.</summary>
        public static DateTime AurinkoAika(DateTime utc, double lat, double lon) =>
            Valittu is int v ? utc.AddHours(SiirtoTunteina(v, Aika.Jd(utc), lat, lon)) : utc;

        static double Kulma(double a) => ((a % 360) + 540) % 360 - 180;
    }
}
