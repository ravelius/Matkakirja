using System.Globalization;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// POHJAKARTAN SÄVY (omistajan löydös 27.9.2026 klo 17.2x Fablen kautta: epäterävämpi kuva on miellyttävämpi,
    /// maitomaisempi): kontrasti ja mustan nosto varjostimessa ilman uudelleenpolttoa. Tileset-varjostimen globaali
    /// _pohjaSavy (Shaders/Cesium/Lahde~/tee_tileset.py, RadioHamara-funktion alku): x = kontrastin muutos keskiharmaan
    /// ympäri sRGB-avaruudessa (0 = ennallaan, −0,3 = pehmeämpi), y = mustan nosto valkoista kohti 0–1 (0 = ennallaan).
    /// Oletus = nykyinen kuva (0, 0). Valinta säilyy laitteella (PlayerPrefs), jotta omistaja voi kokeilla arvoja
    /// kehittäjävalikon liukusäätimillä (Natiivi-UI) ja arvo pysyy seuraavaan käynnistykseen.
    /// Komento: `pohja savy [kontrasti nosto]` (ilman arvoja tila lokiin).
    /// </summary>
    public static class Pohjasavy
    {
        public const string KontrastiAvain = "matkakirja-pohja-kontrasti", NostoAvain = "matkakirja-pohja-nosto";
        /// <summary>Liukusäätimien rajat (Natiivi-UI).</summary>
        public const float KontrastiMin = -0.5f, KontrastiMax = 0.3f, NostoMin = 0f, NostoMax = 0.4f;
        static readonly int Id = Shader.PropertyToID("_pohjaSavy");

        /// <summary>Kontrastin muutos (0 = ennallaan).</summary>
        public static float Kontrasti { get; private set; }
        /// <summary>Mustan nosto 0–1 (0 = ennallaan).</summary>
        public static float Nosto { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Alusta()
        {
            Kontrasti = PlayerPrefs.GetFloat(KontrastiAvain, 0f);
            Nosto = PlayerPrefs.GetFloat(NostoAvain, 0f);
            Paivita();
        }

        /// <summary>Uudet arvot heti kartalle; tallenna = false liukusäätimen vedon aikana (levylle vasta irrotettaessa).</summary>
        public static void Aseta(float kontrasti, float nosto, bool tallenna = true)
        {
            Kontrasti = Mathf.Clamp(kontrasti, KontrastiMin, KontrastiMax);
            Nosto = Mathf.Clamp(nosto, NostoMin, NostoMax);
            Paivita();
            if (!tallenna) return;
            if (Kontrasti == 0f) PlayerPrefs.DeleteKey(KontrastiAvain); else PlayerPrefs.SetFloat(KontrastiAvain, Kontrasti);
            if (Nosto == 0f) PlayerPrefs.DeleteKey(NostoAvain); else PlayerPrefs.SetFloat(NostoAvain, Nosto);
            PlayerPrefs.Save();
        }

        static void Paivita()
        {
            Shader.SetGlobalVector(Id, new Vector4(Kontrasti, Nosto, 0f, 0f));
            // Lepopiirto: yksi kehys uusilla arvoilla.
            PallonLepo.Muuttui("pohjan sävy");
        }

        public static string Kuvaus() =>
            "pohjan sävy: kontrasti " + Kontrasti.ToString("+0.00;-0.00;0", CultureInfo.InvariantCulture) +
            ", mustan nosto " + Nosto.ToString("0.00", CultureInfo.InvariantCulture) + (Kontrasti == 0f && Nosto == 0f ? " (oletus)" : "");
    }
}
