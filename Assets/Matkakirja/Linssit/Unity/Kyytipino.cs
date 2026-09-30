// KYYTIPINO: ISS-kyydin filminen sävytys (fotorealismi osa 0, Linssiseppä 30.9.2026; omistaja "Miten ISS:n maapallonäkymästä
// saisi vielä fotorealistisemman?", suunnitelma docs/raportit/iss-fotorealismi-suunnitelma-20260930.md). Kartoitus 30.9.:
// kyydissä kamera piirsi HDR-puskuriin ilman sävytystä (Filmipino vain aloituslennolla), joten kirkkaat kohdat (sunglint,
// pilvet auringossa, kaupunkien valot) leikkautuivat valkoisiksi eikä bloomia ollut. Nyt kyydin ajan (tila ≠ Kauko) globaali
// volyymi: ACES-sävytys, valotus (EV) ja hillitty bloom kirkkaimmille (kiilto, valot). UI Toolkit (Cupola-kehys, paneeli)
// piirtyy jälkikäsittelyn jälkeen, joten se ei muutu. Profiili on Resources/Kyytipino.asset (Rakennus.KyytipinoProfiili),
// koska URP karsii käännöksestä variantit, joita mikään mukana oleva profiili ei käytä.
// Kevennys vain ≤ iPhone 15 Pro (omistajan linja: täysi laatu muille): bloom pois. A/B `astro kyyti savytys 0|1`,
// `astro kyyti valotus <EV>`, `astro kyyti bloom 0|1`.
// ISS-kamera (Linssiseppä 2, 30.9.): filmirae ja polttovälin vinjetti samaan profiiliin, oletuksena pois, `astro kyyti filmi 0|1`.
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public static class Kyytipino
    {
        public static bool Pois;
        /// <summary>Valotus (EV): ACES tummentaa keskisävyjä noin 0,8:aan, joten lähtötaso +0,5 (säädetään NASA-vertailusta).</summary>
        public static float Valotus = 0.5f;
        public static bool BloomPois;
        /// <summary>Filmirae ja vinjetti (ISS-kameran valokuvatuntu), oletuksena pois.</summary>
        public static bool Filmi;

        static Volume volyymi;
        static ColorAdjustments vari;
        static Bloom hehku;
        static FilmGrain rae;
        static Vignette vinjetti;
        static bool paalla, haettu;

        /// <summary>Kevyt laite: iPhone, jonka mallitunnus on ≤ iPhone16,x (iPhone 15 Pro ja vanhemmat).</summary>
        public static bool KevytLaite
        {
            get
            {
                string m = SystemInfo.deviceModel ?? "";
                if (!m.StartsWith("iPhone")) return false;
                int pilkku = m.IndexOf(',');
                return pilkku > 6 && int.TryParse(m.Substring(6, pilkku - 6), out int suku) && suku <= 16;
            }
        }

        /// <summary>Joka kehys (AstronauttiKerros.LateUpdate): kyydissä pino päälle, muuten pois; muutokset vain tilan vaihtuessa.</summary>
        public static void Paivita(Camera kamera, bool kyydissa)
        {
            bool haluttu = kyydissa && !Pois && kamera != null;
            if (haluttu && !Hae()) haluttu = false;
            if (haluttu != paalla)
            {
                paalla = haluttu;
                if (volyymi != null) { volyymi.enabled = haluttu; volyymi.weight = haluttu ? 1f : 0f; }
                var data = kamera != null ? kamera.GetUniversalAdditionalCameraData() : null;
                if (data != null && (haluttu || data.renderPostProcessing)) data.renderPostProcessing = haluttu;
            }
            if (!paalla) return;
            // Filmipino tai muu voi kytkeä jälkikäsittelyn pois kesken kyydin: palautetaan.
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null && !d.renderPostProcessing) d.renderPostProcessing = true;
            if (vari != null && !Mathf.Approximately(vari.postExposure.value, Valotus)) vari.postExposure.Override(Valotus);
            bool bloom = !BloomPois && !KevytLaite;
            if (hehku != null && hehku.active != bloom) hehku.active = bloom;
            if (rae != null && rae.active != Filmi) rae.active = Filmi;
            if (vinjetti != null && vinjetti.active != Filmi) vinjetti.active = Filmi;
        }

        static bool Hae()
        {
            if (haettu) return volyymi != null;
            haettu = true;
            var profiili = Resources.Load<VolumeProfile>("Kyytipino");
            if (profiili == null) { Debug.LogWarning("MATKAKIRJA kyytipino: Resources/Kyytipino puuttuu, ei sävytystä"); return false; }
            var go = new GameObject("Kyytipino");
            Object.DontDestroyOnLoad(go);
            volyymi = go.AddComponent<Volume>();
            volyymi.isGlobal = true;
            volyymi.priority = 20;   // Filmipinon (10) yläpuolella; lennot ja kyyti eivät ole yhtä aikaa
            volyymi.weight = 0f;
            volyymi.enabled = false;
            volyymi.sharedProfile = profiili;
            // Ajonaikainen kopio (profile): valotuksen säätö ei kirjoita assetiin editorissa.
            volyymi.profile.TryGet(out vari);
            volyymi.profile.TryGet(out hehku);
            volyymi.profile.TryGet(out rae);
            volyymi.profile.TryGet(out vinjetti);
            return true;
        }

        public static string Tila() =>
            $"kyytipino {(paalla ? "päällä" : "pois")}, valotus {Valotus:+0.0;-0.0} EV, bloom {(hehku != null && hehku.active ? "päällä" : "pois")}, filmi {(Filmi ? "päällä" : "pois")}"
            + (KevytLaite ? " (kevyt laite)" : "");
    }
}
