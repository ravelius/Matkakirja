// LAATUTASO LAITTEEN MUKAAN (omistaja 8.10.2026 19.5x: "Tee ja ota käyttöön kaikki mahdolliset grafiikan parannukset ja lisää
// muistin käyttöä niin paljon kuin pystyy"; Päätoimittaja: Ultra M-sarjan laitteille, vanhemmat kevyempi taso automaattisesti;
// Natiiviseppä, juna 169). Puhdas päätös (Kartta-testit/LaitetasoTestit), Unity-puoli Laatutaso.cs.
//   Ultra  = Ultra_RPAsset: lisävalojen varjot, pehmeät varjot (High), varjokartat 4096, 4 kaskadia, MSAA 4×, SSAO, HDR, renderScale 1
//   Mobile = Mobile_RPAsset (iPhone ja A-sarjan iPadit ennallaan), PC = PC_RPAsset (Intel-Mac ja editori ennallaan)
// M-sarjan iPad: mallitunnuksen pääversio ≥ 13 paitsi alla luetellut A-sarjan iPadit (sama luettelo korjaa SeikkailuValot-säännön,
// joka luki A16-iPadin ja mini A17 Pron M-sarjaksi). Mac: prosessori "Apple …" (deviceModel ei kerro: MacBookPro18,x on M1 Pro).
using System;

namespace Matkakirja
{
    public static class Laitetaso
    {
        public const string Ultra = "Ultra", Mobile = "Mobile", PC = "PC";

        // Pääversio ≥ 13, mutta A-sarjan piiri: Air 4 (A14), iPad 10 (A14), mini 6 (A15), iPad A16, mini A17 Pro.
        static readonly string[] ASarjanIpadit =
            { "iPad13,1", "iPad13,2", "iPad13,18", "iPad13,19", "iPad14,1", "iPad14,2", "iPad15,7", "iPad15,8", "iPad16,1", "iPad16,2" };

        /// <summary>M-sarjan iPad (mallitunnus) tai Apple silicon -Mac (prosessorin nimi).</summary>
        public static bool OnkoMSarja(string malli, string prosessori, bool mac)
        {
            if (mac) return (prosessori ?? "").StartsWith("Apple", StringComparison.Ordinal);
            malli ??= "";
            if (!malli.StartsWith("iPad", StringComparison.Ordinal)) return false;
            int pilkku = malli.IndexOf(',');
            if (pilkku <= 4 || !int.TryParse(malli.Substring(4, pilkku - 4), out int paa)) return false;
            return paa >= 13 && Array.IndexOf(ASarjanIpadit, malli) < 0;
        }

        /// <summary>Tason nimi QualitySettingsissa: Ultra M-sarjalle, muuten alustan nykyinen oletus (iOS Mobile, Mac PC).</summary>
        public static string Valitse(string malli, string prosessori, bool mac) =>
            OnkoMSarja(malli, prosessori, mac) ? Ultra : mac ? PC : Mobile;

        /// <summary>Kehittäjän pakotus (PlayerPrefs "laatutaso"): auto, Ultra, Mobile tai PC; tuntematon = auto.</summary>
        public static string Pakotus(string arvo) =>
            arvo == Ultra || arvo == Mobile || arvo == PC ? arvo : null;
    }
}
