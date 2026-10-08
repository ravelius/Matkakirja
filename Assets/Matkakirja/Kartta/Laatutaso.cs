// LAATUTASON VALINTA KÄYNNISTYKSESSÄ (omistaja 8.10.2026 19.5x; Natiiviseppä, juna 169): Laitetaso.Valitse ennen ensimmäistä
// kohtausta, jotta kaikki URP-assetin välimuistiin ottavat luokat (Ruudunpaivitys, DioraamaValot, SeikkailuValot, PalloSumennus,
// KaupunkiKuva) näkevät valitun tason assetin. Tasoa EI vaihdeta ajon aikana (Siirtoseppä 8.10.: DioraamaValot palauttaa
// linnan sulkeutuessa alkuperäiset arvot samaan assettiin); lämpö keventää Ultraa Ruudunpaivitys.SovellaLampossa (MSAA pois).
// Seikkailu lukee tason nimestä (QualitySettings.names[GetQualityLevel()] sisältää "Ultra") → nimi pysyy.
// Kehittäjän pakotus: PlayerPrefs "laatutaso" = auto | Ultra | Mobile | PC (voimaan seuraavassa käynnistyksessä).
using UnityEngine;

namespace Matkakirja
{
    public static class Laatutaso
    {
        public const string Avain = "laatutaso";

        public static string Nyt
        {
            get { var n = QualitySettings.names; int i = QualitySettings.GetQualityLevel(); return i >= 0 && i < n.Length ? n[i] : ""; }
        }

        public static bool Ultra => Nyt == Laitetaso.Ultra;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void Valitse()
        {
            bool mac = Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXEditor;
            string pakotus = Laitetaso.Pakotus(PlayerPrefs.GetString(Avain, "auto"));
            string taso = pakotus ?? Laitetaso.Valitse(SystemInfo.deviceModel, SystemInfo.processorType, mac);
            if (Application.isEditor && pakotus == null) taso = Nyt;   // editori: projektin oma valinta
            int i = System.Array.IndexOf(QualitySettings.names, taso);
            if (i >= 0 && i != QualitySettings.GetQualityLevel()) QualitySettings.SetQualityLevel(i, true);
            Debug.Log($"MATKAKIRJA laatutaso: {Nyt}{(i < 0 ? $" (taso {taso} puuttuu)" : "")}{(pakotus != null ? " (pakotettu)" : "")}, " +
                      $"{SystemInfo.deviceModel}, {SystemInfo.processorType}, RAM {SystemInfo.systemMemorySize} Mt");
        }
    }
}
