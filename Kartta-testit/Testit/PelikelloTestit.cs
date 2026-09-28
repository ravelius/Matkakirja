// PELIKELLO (v3f): kello, päivä ja lentoajat 6 h:n ikkunoin (Assets/Matkakirja/Kartta/Pelikello.cs).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class PelikelloTestit
    {
        // Lontoo ja kohteet (lat, lon).
        const double LonLat = 51.5074, LonLon = -0.1278;

        static int Lento(double lat, double lon) => Pelikello.LentoTunnit(LonLat, LonLon, lat, lon);

        [Testi]
        static void LentoajatIkkunoin()
        {
            Oleta.Sama(6, Lento(48.8566, 2.3522), "Pariisi +6 h (vähintään yksi vuoro)");
            Oleta.Sama(6, Lento(37.9838, 23.7275), "Ateena +6 h");
            Oleta.Sama(6, Lento(30.0444, 31.2357), "Kairo +6 h");
            Oleta.Sama(6, Lento(55.7558, 37.6173), "Moskova +6 h");
            Oleta.Sama(12, Lento(40.7128, -74.0060), "New York +12 h (5 570 km / 800 = 7,0 h)");
            Oleta.Sama(12, Lento(37.7749, -122.4194), "San Francisco +12 h");
            Oleta.Sama(18, Lento(-34.6037, -58.3816), "Buenos Aires +18 h");
            Oleta.Sama("+12 h", Pelikello.LentoaikaTeksti(12), "teksti");
        }

        [Testi]
        static void EtaisyysHaversine()
        {
            double km = Pelikello.EtaisyysKm(LonLat, LonLon, 40.7128, -74.0060);
            Oleta.Tosi(Math.Abs(km - 5570) < 15, $"Lontoo–New York ~5 570 km, saatu {km:0}");
            Oleta.Tosi(Pelikello.EtaisyysKm(10, 20, 10, 20) < 1e-9, "sama piste 0 km");
        }

        [Testi]
        static void KelloJaPaiva()
        {
            Pelikello.Nollaa(1.0);
            Oleta.Sama("01.00", Pelikello.KelloTeksti, "lähtö 01.00");
            Oleta.Sama("Päivä 1/80", Pelikello.PaivaTeksti, "päivä 1");
            Pelikello.Etene(90 * 60);
            Oleta.Sama("02.30", Pelikello.KelloTeksti, "90 min reaaliaikaa");
            Pelikello.Lennossa = true;
            Pelikello.Etene(3600);
            Oleta.Sama("02.30", Pelikello.KelloTeksti, "lennossa Etene ei kirjoita (Nappula kirjoittaa)");
            Pelikello.Tunnit = 23.0 + 0.5;
            Oleta.Sama("00.30", Pelikello.KelloTeksti, "yli puolenyön");
            Oleta.Sama(2, Pelikello.Paiva, "päivä vaihtuu puoliltaöin");
            Pelikello.Nollaa(1.0);
            Oleta.Tosi(!Pelikello.Lennossa && Pelikello.Tunnit == 0, "nollaus");
        }
    }
}
