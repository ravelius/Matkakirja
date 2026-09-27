// ELÄVÄ KARTTA: pallon rajapinnat saapumiselle (sovittu Natiivisepän kanssa 26.9.2026, hänen luovutuksensa g).
//
// Natiiviseppä asettaa toteutukset Kartasta (Kartta viittaa Ydiniin, joten kumpikaan ei odota toista käännöksessä):
//   ElavaPallo.PysyvatKerrokset = nakyvissa => { maaKartta.Saapuminen(!nakyvissa); nostoKerros.Saapuminen(!nakyvissa); };
//   PalloKierto.AjaSaapumisnakymaan: ElavaPallo.IlmoitaSaapuminenAlkaa(kestoS) ja lopussa IlmoitaSaapuminenPaattyi().
// Asettamaton = Linssisepän paikkamerkki (pysyvät kerrokset ennallaan, aikajana alkaa pelin saapumisesta). Hunnun
// paljastus (Varitaso.Paljastus) poistui saapumisesta 27.9.2026 (omistaja 08.3x: saapuminen on vain maakuntien täyttö).
using System;

namespace Matkakirja.Linssit.Elava
{
    public static class ElavaPallo
    {
        /// <summary>
        /// Pelin pysyvät maakuntien täyttö, rajat ja nostomerkit: false = piiloon saapumisen ajaksi, true = takaisin
        /// (0,3 s:n häivytys, MaaKartta.Saapuminen ja NostoKerros.Saapuminen). null = kerrokset ennallaan.
        /// </summary>
        public static Action<bool> PysyvatKerrokset;

        /// <summary>Saapumisnäkymäajo alkaa (kesto s): elävä saapuminen sovittaa aikajanansa ajoon.</summary>
        public static event Action<double> SaapuminenAlkaa;
        /// <summary>Saapumisnäkymäajo päättyi.</summary>
        public static event Action SaapuminenPaattyi;

        public static void IlmoitaSaapuminenAlkaa(double kestoS) => SaapuminenAlkaa?.Invoke(kestoS);
        public static void IlmoitaSaapuminenPaattyi() => SaapuminenPaattyi?.Invoke();

        /// <summary>Onko Natiivisepän pallopuoli kytketty (muuten paikkamerkit).</summary>
        public static bool Kytketty => PysyvatKerrokset != null;
    }
}
