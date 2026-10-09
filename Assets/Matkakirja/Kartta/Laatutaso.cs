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

        // ---- AJALLINEN REUNANPEHMENNYS (TAA; omistaja 8.10. 19.5x, raportti #4220 kohta 7; Natiiviseppä, juna 169) ----
        // URP 17.3 (UniversalCameraData.IsTemporalAAEnabled) ajaa TAA:n vain kameralla, jolla on jälkikäsittely päällä, MSAA 1, EI
        // kamerapinoa (base, jolla overlay-kameroita, tai overlay) eikä dynaamista resoluutiota. STP (skaalain) vaatii lisäksi
        // renderScale < 1. Siksi TAA kytketään kamerakohtaisesti (KaytaAjallista) niissä näkymissä, joissa ehdot täyttyvät
        // (seikkailun dioraamakamera omaan RT:hen); kuumana pois (Ruudunpaivitys.SovellaLampo → AsetaKuuma), Muuttui kertoo kameroille.
        static bool? ajallinenLaite;
        static bool kuuma;
        public static event System.Action Muuttui;

        /// <summary>Ajallinen reunanpehmennys tällä laitteella nyt (Ultra/Huippu ja ei kuuma). Pakotus PlayerPrefs "ajallinen" = 0/1.</summary>
        public static bool Ajallinen
        {
            get
            {
                ajallinenLaite ??= PlayerPrefs.HasKey("ajallinen") ? PlayerPrefs.GetInt("ajallinen") == 1
                    : Laitetaso.OnkoAjallinen(SystemInfo.deviceModel, SystemInfo.processorType,
                        Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXEditor);
                return ajallinenLaite.Value && !kuuma;
            }
        }

        /// <summary>Lämpö (Ruudunpaivitys): kuumana ajallinen pois, viileänä takaisin.</summary>
        public static void AsetaKuuma(bool k)
        {
            if (kuuma == k) return;
            bool ennen = Ajallinen; kuuma = k;
            if (ennen != Ajallinen) Muuttui?.Invoke();
        }

        /// <summary>
        /// Kameran TAA päälle/pois (päällä: antialiasing TAA, laatu High, allowMSAA pois; pois: antialiasing None, allowMSAA takaisin).
        /// Kutsuja huolehtii jälkikäsittelystä (renderPostProcessing) ja siitä, ettei kamera ole pinossa; RT:n antiAliasing oltava 1.
        /// </summary>
        public static void KaytaAjallista(Camera kamera, bool paalla)
        {
            if (kamera == null) return;
            var d = UnityEngine.Rendering.Universal.CameraExtensions.GetUniversalAdditionalCameraData(kamera);
            if (d == null) return;
            if (paalla)
            {
                d.antialiasing = UnityEngine.Rendering.Universal.AntialiasingMode.TemporalAntiAliasing;
                d.taaSettings.quality = UnityEngine.Rendering.Universal.TemporalAAQuality.High;
                kamera.allowMSAA = false;
            }
            else if (d.antialiasing == UnityEngine.Rendering.Universal.AntialiasingMode.TemporalAntiAliasing)
            {
                d.antialiasing = UnityEngine.Rendering.Universal.AntialiasingMode.None;
                kamera.allowMSAA = true;
            }
        }

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
