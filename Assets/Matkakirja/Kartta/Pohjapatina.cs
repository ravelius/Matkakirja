using System.Globalization;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// RAE JA PATINA (omistajan tilaus 27.9.2026 klo 23.4x Fablen kautta): paperin rae ja vanhenemisen patina varjostimessa
    /// ilman uudelleenpolttoa, jotta omistaja voi kokeilla tasoja laitteella; hyvät arvot poltetaan myöhemmin laattoihin
    /// (tools/patina.mjs, resepti "kevyt"). Tileset-varjostimen globaalit (Shaders/Cesium/Lahde~/tee_tileset.py,
    /// RadioHamara-funktion alku, sama sRGB-kierros kuin Pohjasavyssä ja polton kaava r·k, g·k(1 − 0,35 l), b·k(1 − l)):
    ///   _pohjaRae    x = voimakkuus 0–1 (pikselirae ±0,15 ja 2,4 px:n nyppy ±0,11; 0,5 ≈ polton "täysi" 0,072/0,054,
    ///                poltossa nyt "kevyt" 0,027/0,020),
    ///                y = koko laitepikseleinä 1–6 (rakeen solu = pikselin jalanjälki × koko)
    ///   _pohjaPatina x = tahrat 0–1 (maailmaan sidotut laikut, 3 oktaavia 870 km:stä, voima 0,15; poltossa 0,055),
    ///                y = kellastuminen 0–1 (lämpö + haalistus pergamentin valkoiseen),
    ///                z = reunatummennus 0–1 (ruudun vinjetti, eksponentti 2,4, voima 0,35)
    /// Kohina on staattinen ja sidottu kartan pintaan (pinnan suunta), ei ruudun filmirae eikä animoitu: levossa kuva ei muutu
    /// eikä lisäpiirtoa tule (lämpösääntö). Oletus 0 = nykyinen kuva täsmälleen (varjostin ohittaa lohkon). Valinta säilyy
    /// laitteella (PlayerPrefs) kuten Pohjasavy. Komento: `pohja patina [rae koko tahrat kellastuminen reuna]`.
    /// </summary>
    public static class Pohjapatina
    {
        public const string RaeAvain = "matkakirja-pohja-rae", KokoAvain = "matkakirja-pohja-rae-koko",
            TahratAvain = "matkakirja-pohja-tahrat", KellastusAvain = "matkakirja-pohja-kellastus", ReunaAvain = "matkakirja-pohja-reuna";
        /// <summary>Liukusäätimien rajat (kehittäjäpaneeli).</summary>
        public const float KokoMin = 1f, KokoMax = 6f, OletusKoko = 2f;
        static readonly int RaeId = Shader.PropertyToID("_pohjaRae"), PatinaId = Shader.PropertyToID("_pohjaPatina");

        /// <summary>Rakeen voimakkuus 0–1 (0 = ei raetta).</summary>
        public static float Rae { get; private set; }
        /// <summary>Rakeen koko laitepikseleinä.</summary>
        public static float Koko { get; private set; } = OletusKoko;
        /// <summary>Vanhenemisen laikut 0–1.</summary>
        public static float Tahrat { get; private set; }
        /// <summary>Kellastuminen ja haalistuminen 0–1.</summary>
        public static float Kellastus { get; private set; }
        /// <summary>Reunatummennus 0–1.</summary>
        public static float Reuna { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Alusta()
        {
            Rae = PlayerPrefs.GetFloat(RaeAvain, 0f);
            Koko = PlayerPrefs.GetFloat(KokoAvain, OletusKoko);
            Tahrat = PlayerPrefs.GetFloat(TahratAvain, 0f);
            Kellastus = PlayerPrefs.GetFloat(KellastusAvain, 0f);
            Reuna = PlayerPrefs.GetFloat(ReunaAvain, 0f);
            Paivita();
        }

        /// <summary>Uudet arvot heti kartalle; tallenna = false liukusäätimen vedon aikana (levylle vasta irrotettaessa).</summary>
        public static void Aseta(float rae, float koko, float tahrat, float kellastus, float reuna, bool tallenna = true)
        {
            Rae = Mathf.Clamp01(rae);
            Koko = Mathf.Clamp(koko, KokoMin, KokoMax);
            Tahrat = Mathf.Clamp01(tahrat);
            Kellastus = Mathf.Clamp01(kellastus);
            Reuna = Mathf.Clamp01(reuna);
            Paivita();
            if (!tallenna) return;
            Tallenna(RaeAvain, Rae, 0f);
            Tallenna(KokoAvain, Koko, OletusKoko);
            Tallenna(TahratAvain, Tahrat, 0f);
            Tallenna(KellastusAvain, Kellastus, 0f);
            Tallenna(ReunaAvain, Reuna, 0f);
            PlayerPrefs.Save();
        }

        static void Tallenna(string avain, float arvo, float oletus)
        {
            if (arvo == oletus) PlayerPrefs.DeleteKey(avain); else PlayerPrefs.SetFloat(avain, arvo);
        }

        static void Paivita()
        {
            Shader.SetGlobalVector(RaeId, new Vector4(Rae, Koko, 0f, 0f));
            Shader.SetGlobalVector(PatinaId, new Vector4(Tahrat, Kellastus, Reuna, 0f));
            // Lepopiirto: yksi kehys uusilla arvoilla.
            PallonLepo.Muuttui("pohjan patina");
        }

        /// <summary>Oletus (0 = nykyinen kuva, koko 2 px).</summary>
        public static bool Oletus => Rae == 0f && Tahrat == 0f && Kellastus == 0f && Reuna == 0f;

        public static string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            return "pohjan patina: rae " + Rae.ToString("0.00", ic) + " (koko " + Koko.ToString("0.#", ic) + " px), tahrat "
                   + Tahrat.ToString("0.00", ic) + ", kellastuminen " + Kellastus.ToString("0.00", ic) + ", reunatummennus "
                   + Reuna.ToString("0.00", ic) + (Oletus ? " (oletus)" : "");
        }
    }
}
