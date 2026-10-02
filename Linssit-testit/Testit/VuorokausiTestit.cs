// VUOROKAUDENAIKA ISS-KYYDISSÄ (omistaja 1.10.2026): auringon kello pitää valitun tuntikulman ISS:n alapisteessä.
using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class VuorokausiTestit
    {
        static double Tuntikulma(DateTime t, double lon)
        {
            Aurinko.Alihajapiste(Aika.Jd(t), out _, out double slon);
            return ((lon - slon) % 360 + 540) % 360 - 180;
        }

        static double Korkeus(DateTime t, double lat, double lon)
        {
            Aurinko.Alihajapiste(Aika.Jd(t), out double dekl, out double slon);
            double r = Math.PI / 180, h = (lon - slon) * r;
            return Math.Asin(Math.Sin(lat * r) * Math.Sin(dekl * r) + Math.Cos(lat * r) * Math.Cos(dekl * r) * Math.Cos(h)) / r;
        }

        [Testi]
        static void ValintaPysyyAlapisteessa()
        {
            var t0 = new DateTime(2026, 10, 1, 7, 13, 0, DateTimeKind.Utc);
            try
            {
                foreach (var (lat, lon) in new[] { (60.2, 24.9), (41.9, 12.5), (-33.9, 151.2), (10.0, -80.0) })
                {
                    Vuorokausi.Valittu = Vuorokausi.Paiva;
                    Oleta.Tosi(Math.Abs(Tuntikulma(Vuorokausi.AurinkoAika(t0, lat, lon), lon)) < 0.5, $"päivä = keskipäivä ({lat}, {lon})");
                    Vuorokausi.Valittu = Vuorokausi.Yo;
                    Oleta.Tosi(Math.Abs(Math.Abs(Tuntikulma(Vuorokausi.AurinkoAika(t0, lat, lon), lon)) - 180) < 0.5, "yö = keskiyö");
                    Vuorokausi.Valittu = Vuorokausi.Aamu;
                    var aamu = Vuorokausi.AurinkoAika(t0, lat, lon);
                    Oleta.Tosi(Tuntikulma(aamu, lon) < 0 && Math.Abs(Korkeus(aamu, lat, lon) - Vuorokausi.AamuKorkeus) < 0.6, "aamu: idässä 11°");
                    Vuorokausi.Valittu = Vuorokausi.Ilta;
                    var ilta = Vuorokausi.AurinkoAika(t0, lat, lon);
                    Oleta.Tosi(Tuntikulma(ilta, lon) > 0 && Math.Abs(Korkeus(ilta, lat, lon) - Vuorokausi.IltaKorkeus) < 0.6, "ilta: lännessä 7°");
                    Oleta.Tosi(Math.Abs((ilta - t0).TotalHours) <= 12.01, "siirto enintään 12 h");
                }
            }
            finally { Vuorokausi.Valittu = null; }
        }

        [Testi]
        static void LiveOnOikeaAika()
        {
            Vuorokausi.Valittu = null;
            var t = new DateTime(2026, 10, 1, 12, 0, 0, DateTimeKind.Utc);
            Oleta.Sama(t, Vuorokausi.AurinkoAika(t, 60, 25));
        }
    }
}
