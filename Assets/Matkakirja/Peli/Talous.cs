// TALOUS (talouden vaihe 1, omistaja 27.9.2026 klo 10.3x; web PR #3394,
// docs/raportit/talous-suunnitelma-20260927.md): päiväkulut ja rahattomuus.
//
// Ruoka ja majoitus maksetaan joka vuorokauden vaihtuessa (Matka.PaataVuoro →
// Matka.VeloitaPaivakulut), summa kerrottuna maan hintatasolla (12 / 20 / 32 £).
// Reitillä yö kuluu kulkuneuvossa: vain ruoka, reitin lähtöpään (Reitti.A)
// hintatasolla. Pankin apu (STRANDED_AID, Matka.TarvitseeApua) on poistettu:
// jos päiväkulu ei mene läpi, maksetaan mitä on, loppu jää rästiin
// (Pelaaja.Rasti) ja alkaa kahden vuorokauden varoitus (Pelaaja.Rahaton,
// RahattomuusVuoroja). Ellei kassa nouse, matka päättyy (Matka.PaataMatka).
//
// Hintataso luetaan kaupungin maasta (Kaupunki.Maa, ISO3 = web
// pack.map.cityCountry; sama data paketin kaupungit-kokoelmassa).
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    /// <summary>Maan hintataso (web 'edullinen' | 'keski' | 'kallis').</summary>
    public enum Hintataso { Edullinen, Keski, Kallis }

    /// <summary>Pelaajan päiväkulu nyt (web paivakulu(p): {ruoka, majoitus, yhteensa, taso, matkalla}).</summary>
    public readonly struct Paivakulu
    {
        public readonly int Ruoka;
        public readonly int Majoitus;
        public readonly Hintataso Taso;
        public readonly bool Matkalla;
        public Paivakulu(int ruoka, int majoitus, Hintataso taso, bool matkalla)
        {
            Ruoka = ruoka; Majoitus = majoitus; Taso = taso; Matkalla = matkalla;
        }
        public int Yhteensa => Ruoka + Majoitus;
    }

    /// <summary>Rahattomuuden varoitus (web p.rahaton = {alkuVuoro, paiva}).</summary>
    public sealed class Rahattomuus
    {
        /// <summary>Kierros (VuoroLaskuri), jolla rahat loppuivat.</summary>
        public int AlkuVuoro;
        /// <summary>Matkapäivä, jona rahat loppuivat.</summary>
        public int Paiva;
    }

    /// <summary>Matka päättyi rahattomuuteen (web game.matkaPaattyi = {pelaaja, kaupunki, paiva}).</summary>
    public sealed class MatkanLoppu
    {
        /// <summary>Pelaajan Id.</summary>
        public int Pelaaja;
        /// <summary>Kaupungin NIMI (web city?.name), null jos matka päättyi reitillä.</summary>
        public string Kaupunki;
        public int Paiva;
    }

    /// <summary>Talouden vakiot ja maiden hintatasot (js/game.js, js/packs/hintatasot.js).</summary>
    public static class Talous
    {
        public const int PaivakuluRuoka = 8;        // PAIVAKULU_RUOKA
        public const int PaivakuluMajoitus = 12;    // PAIVAKULU_MAJOITUS
        public const int RahattomuusVuoroja = 8;    // RAHATTOMUUS_VUOROJA: 2 vrk × 4 vuoroa (TURN_HOURS 6)

        /// <summary>HINTATASON_KERTOIMET: edullinen 0,6, keski 1, kallis 1,6.</summary>
        public static double Kerroin(Hintataso t) => t switch
        {
            Hintataso.Edullinen => 0.6,
            Hintataso.Kallis => 1.6,
            _ => 1.0,
        };

        /// <summary>Web Math.round(x): puolikas ylöspäin (positiivisilla sama kuin floor(x + 0,5)).</summary>
        public static int Pyorista(double x) => (int)System.Math.Floor(x + 0.5);

        /// <summary>Maan hintataso ISO3-tunnuksesta; puuttuva tai tuntematon maa on keskitasoa.</summary>
        public static Hintataso MaanTaso(string iso3) =>
            iso3 != null && Hintatasot.TryGetValue(iso3, out var t) ? t : Hintataso.Keski;

        /// <summary>
        /// PEILI: js/packs/hintatasot.js (HINTATASOT). Vain poikkeukset — puuttuva
        /// maa on keskitasoa. Kun web muuttaa taulua, päivitä tämä samalla
        /// (Peli-testit/Testit/TalousTestit.cs vertaa web-tiedostoon, jos se on saatavilla).
        /// </summary>
        public static readonly IReadOnlyDictionary<string, Hintataso> Hintatasot = Rakenna();

        static Dictionary<string, Hintataso> Rakenna()
        {
            var d = new Dictionary<string, Hintataso>(System.StringComparer.Ordinal);
            foreach (var m in new[]
            {
                "AUS", "AUT", "BEL", "CAN", "CHE", "DEU", "DNK", "FIN", "FRA", "GBR", "GRL", "HKG",
                "IRL", "ISL", "JPN", "KOR", "KWT", "LUX", "NLD", "NOR", "NZL", "QAT", "SGP", "SWE",
                "USA", "ARE",
            }) d[m] = Hintataso.Kallis;
            foreach (var m in new[]
            {
                "AFG", "BOL", "CMR", "COD", "COL", "DZA", "EGY", "ETH", "GHA", "GTM",
                "IDN", "IND", "IRN", "IRQ", "KAZ", "KEN", "LBR", "LKA", "MAR", "MDG",
                "MLI", "MMR", "MNG", "MOZ", "NIC", "NPL", "PAK", "PHL", "PRY", "SDN",
                "SDS", "SEN", "SLE", "SOM", "SYR", "TCD", "THA", "TUN", "TUR", "TZA",
                "UGA", "UKR", "UZB", "VEN", "VNM", "YEM", "ZWE",
            }) d[m] = Hintataso.Edullinen;
            return d;
        }
    }
}
