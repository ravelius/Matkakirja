// KOHTEEN KATSEEN OLETUKSET YTIMESSÄ (omistaja TF 180, PT juna 181; Linssiseppä 11.10.): workerin opasdata (R2 opas/esittely-v1e,
// tools/pollo/aineistot.js) antaa katse_suunta- ja katse_kaari-kentät vain osalle kohteista, eikä tästä reposta voi muuttaa sitä.
// Kun omistaja pyytää kohteelle tiettyä näkymää ennen kuin data on workerissa, oletus asetetaan tässä paikan mukaan (kohde alle
// SadeM:n päässä). Workerin oma katse_suunta voittaa aina (oletusta ei käytetä). Kun sama tieto on workerissa, rivi poistetaan.
//  - Notre-Dame (omistaja TF 180: "pysähdyksessä kamera laskeutuu nopeammin ja kaartaa länsijulkisivun eteen"): julkisivun
//    normaali OSM-pohjapiirroksesta (Resources/Elava/muodot-pariisi.json Q2981, pienin rajaava suorakaide: pituusakseli
//    116,6° / 296,6°, länsipääty 57 m kohteen pisteestä suunnassa 301°) → kamera kirkon länsipuolella katsoen 117°:een.
//    Kierto päättyy julkisivun eteen (katse_loppu) ja laskeutuminen on valmis kierron puolivälissä (lasku_osuus 0,5).
//    Workeriin: {"katse_suunta": 117, "katse_loppu": true, "lasku_osuus": 0.5} Notre-Damen esittelyriville.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasKatseOletukset
    {
        public const double SadeM = 100;

        public sealed class Oletus { public string Nimi; public double Lat, Lon, KatseSuunta, KatseKaari, LaskuOsuus = 1; public bool KatseLoppu; }

        public static readonly Oletus[] Kohteet =
        {
            new Oletus { Nimi = "Notre-Dame", Lat = 48.8530, Lon = 2.3498, KatseSuunta = 117, KatseLoppu = true, LaskuOsuus = 0.5 },
        };

        /// <summary>Oletus paikassa (lat, lon) tai null.</summary>
        public static Oletus Hae(double lat, double lon)
        {
            foreach (var o in Kohteet) if (KierrosLento.EtaisyysM(o.Lat, o.Lon, lat, lon) < SadeM) return o;
            return null;
        }

        /// <summary>
        /// AUKION KESKUSMONUMENTTI (PT 11.10. 09.2x, iPhone-ajo e0689c677: pystykuvassa Concorden obeliski oli oikeassa reunassa, koska
        /// workerin aukion piste on ~19 m obeliskista): pallon pystykuvan aukiokehys kiertää monumenttia (OpasKuvaus.LeveysKuvaan).
        /// Paikka Wikidatasta (P625). Ei riviä → aukion piste.
        /// </summary>
        public static readonly (string nimi, double lat, double lon, double monLat, double monLon)[] AukionMonumentit =
        {
            ("Concorden aukio: Luxorin obeliski (Q1503331)", 48.8656331, 2.3212357, 48.865475, 2.321133),
        };
        public const double MonumenttiSadeM = 60;

        /// <summary>Aukion (lat, lon) keskusmonumentin paikka tai null.</summary>
        public static (double lat, double lon)? Monumentti(double lat, double lon)
        {
            foreach (var m in AukionMonumentit) if (KierrosLento.EtaisyysM(m.lat, m.lon, lat, lon) < MonumenttiSadeM) return (m.monLat, m.monLon);
            return null;
        }

        /// <summary>Täydentää workerin kohteen (katse_suunta puuttuu) paikan oletuksella.</summary>
        public static void Taydenna(OpasKohde k)
        {
            if (k == null || k.Kysymys || !double.IsNaN(k.KatseSuunta) || !(Hae(k.Lat, k.Lon) is Oletus o)) return;
            k.KatseSuunta = o.KatseSuunta; k.KatseKaari = o.KatseKaari; k.KatseLoppu = o.KatseLoppu; k.LaskuOsuus = o.LaskuOsuus;
        }
    }
}
