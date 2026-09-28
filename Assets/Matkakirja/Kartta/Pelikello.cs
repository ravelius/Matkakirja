// PELIKELLO (Natiivi-UI, aloituslento v3f; rajapinta Natiivisepän kanssa 28.9.2026): pelin kello aloituskaupungin
// valinnasta lennon loppuun. Omistaja 28.9. klo 09.38: kello ja "Päivä 1/80" näkyvät jo aloituskaupungin valinnassa
// (etenee normaalivauhtia), lennossa kello kiihtyy; kohdekaupunkien alle lentoaika pelin 6 h:n ikkunoin ("+6 h",
// "+12 h") Lontoosta.
//
// Kirjoittajia kaksi: valinnassa kellokomponentti kasvattaa Tunnit-arvoa reaaliajassa (dt / 3600), kun Lennossa on
// false; lennossa Nappula asettaa Lennossa = true ja kirjoittaa Tunnit = lähtö + lentoaika · kiihdytys(t / kesto).
// Päivän ja yön raja lukee kellon samasta luokasta. Puhdas C# ilman UnityEngineä (Kartta-testit).
//
// Lentoaika: isoympyräetäisyys / 800 km/h pyöristettynä ylöspäin pelin vuoroon (6 h, web game.js TURN_HOURS,
// natiivissa Matka.cs), vähintään yksi vuoro: Eurooppa, Kairo ja Moskova +6 h, New York ja San Francisco +12 h.
using System;

namespace Matkakirja
{
    public static class Pelikello
    {
        /// <summary>Pelin vuoro tunteina (web game.js TURN_HOURS).</summary>
        public const int VuoroTunnit = 6;
        /// <summary>Lentokoneen matkanopeus lentoajan arvioon (km/h).</summary>
        public const double LentoNopeus = 800.0;
        /// <summary>Matkan pituus päivinä ("Päivä 1/80").</summary>
        public const int MatkanPaivat = 80;
        const double MaanSade = 6371.0;

        /// <summary>Pelitunteja matkan alusta (lähtö = 0).</summary>
        public static double Tunnit;
        /// <summary>Lontoon kello lähdössä tunteina (UTC). v3f2 (omistaja 28.9. klo 15.3x v3f2-videosta: "päivä voisi tulla
        /// aiemmin"): 02.30, jolloin valinnassa koko Eurooppa on yössä (Moskova −8°, porvarillinen hämärä alkaa −6°:sta) ja
        /// aamu tulee lennolla ennen ohitusta (Ateena 5,4 s; lähdöllä 01.00 8,4 s).</summary>
        public const double OletusAlkuKelloUtc = 2.5;
        public static double AlkuKelloUtc = OletusAlkuKelloUtc;
        /// <summary>true lennon ajan (Nappula kirjoittaa Tunnit); false = valinta, kello etenee reaaliajassa.</summary>
        public static bool Lennossa;
        /// <summary>true aloituskaupungin valinnan ajan (kellonäyttö kirjoittaa joka ruutu); päivän ja yön raja
        /// (Kartta/Paivanvalo.cs) on päällä valinnassa ja lennossa.</summary>
        public static bool Valinnassa;

        /// <summary>Kellonaika 0–24 h (Lontoo).</summary>
        public static double Kellonaika => ((AlkuKelloUtc + Tunnit) % 24 + 24) % 24;
        /// <summary>Matkan päivä, lähtöpäivä = 1.</summary>
        public static int Paiva => 1 + (int)Math.Floor((AlkuKelloUtc + Tunnit) / 24);

        /// <summary>Kello näyttömuodossa "01.00" (suomalainen piste).</summary>
        public static string KelloTeksti
        {
            get
            {
                int min = (int)Math.Floor(Kellonaika * 60.0 + 1e-6) % (24 * 60);
                return $"{min / 60:00}.{min % 60:00}";
            }
        }

        /// <summary>"Päivä 1/80".</summary>
        public static string PaivaTeksti => $"Päivä {Paiva}/{MatkanPaivat}";

        /// <summary>Isoympyräetäisyys kilometreinä (haversine).</summary>
        public static double EtaisyysKm(double lat0, double lon0, double lat1, double lon1)
        {
            double r = Math.PI / 180.0;
            double dLat = (lat1 - lat0) * r, dLon = (lon1 - lon0) * r;
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                       + Math.Cos(lat0 * r) * Math.Cos(lat1 * r) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2.0 * MaanSade * Math.Asin(Math.Min(1.0, Math.Sqrt(a)));
        }

        /// <summary>Lentoaika pelitunteina: etäisyys / 800 km/h ylöspäin 6 h:n ikkunaan, vähintään yksi vuoro.</summary>
        public static int LentoTunnit(double lat0, double lon0, double lat1, double lon1)
        {
            double h = EtaisyysKm(lat0, lon0, lat1, lon1) / LentoNopeus;
            int vuoroja = Math.Max(1, (int)Math.Ceiling(h / VuoroTunnit - 1e-9));
            return vuoroja * VuoroTunnit;
        }

        /// <summary>Kohdekaupungin nimen alle: "+6 h".</summary>
        public static string LentoaikaTeksti(int tunnit) => $"+{tunnit} h";

        /// <summary>Valinnan kello: reaaliaikainen eteneminen (dt sekunteina), ei lennon aikana.</summary>
        public static void Etene(double dtSekunteina)
        {
            if (Lennossa || dtSekunteina <= 0) return;
            Tunnit += dtSekunteina / 3600.0;
        }

        /// <summary>Uusi matka: kello lähtöhetkeen.</summary>
        public static void Nollaa(double alkuKelloUtc = OletusAlkuKelloUtc)
        {
            AlkuKelloUtc = alkuKelloUtc;
            Tunnit = 0;
            Lennossa = false;
            Valinnassa = false;
        }
    }
}
