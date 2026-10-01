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
        /// <summary>Oletuksena pois junassa, kunnes fotorealismi on hyväksytty (Päätoimittaja 30.9.).</summary>
        public static bool Pois = true;
        /// <summary>Valotus (EV): ACES tummentaa keskisävyjä noin 0,8:aan, joten lähtötaso +0,5 (säädetään NASA-vertailusta).</summary>
        public static float Valotus = 0.5f;
        /// <summary>
        /// Automaattivalotus auringon mukaan (Linssiseppä 2:n Helsinki-kuva 30.9.: aurinko 9° → noin 1 EV alivalottunut): kamera
        /// valottaa maan kirkkauden mukaan kuten astronautin kamera. Lisä = 1,1 EV × (0,5 − sin korkeus) / 0,5, kun aurinko on
        /// 0…30° kameran alla olevassa pisteessä; yöllä +0,3 (kaupunkien valot), hämärässä liuku. A/B `astro kyyti autovalotus 0|1`.
        /// </summary>
        public static bool AutoValotus = true;
        static float autoLisa;
        /// <summary>Auringon korkeuden sini kameran alapisteessä (AstronauttiKerros joka kehys; NaN = ei tiedossa).</summary>
        public static float AurinkoSin = float.NaN;
        static float AutoLisa(float s)
        {
            if (float.IsNaN(s)) return 0f;
            float paiva = 1.1f * Mathf.Clamp01((0.5f - s) / 0.5f);
            return s >= 0f ? paiva : Mathf.Lerp(0.3f, 1.1f, Mathf.Clamp01((s + 0.1f) / 0.1f));
        }
        /// <summary>
        /// S2-PINNAN SÄVYTYS (Linssiseppä 1.10.2026, S2-suunnitelma): Euroopan Sentinel-2 on BMNG:tä vaaleampi, sinisempi ja
        /// litteämpi kuin NASA ISS067-E-286475 (RGB 74/91/102, hajonta 27 vs NASA 66/77/82, 45). Kun S2 on kyydin pinnalla
        /// (<see cref="S2"/>, AstronauttiKerros.PaivitaS2), värisäätöön kontrasti, kylläisyys ja lämpö (värisuodin: + = punaisempi,
        /// vähemmän sinistä). A/B `astro kyyti s2savy <kontrasti> <kylläisyys> <lämpö>`; arvot NASA-vertailusta.
        /// </summary>
        public static bool S2;
        public static float S2Kontrasti = 30f, S2Kyllaisyys = -10f, S2Lampo = 1f;   // NASA-vertailu 1.10. v3 (ero 79 → 28)
        static Color Suodin(float lampo) => new Color(1f + 0.06f * lampo, 1f, 1f - 0.10f * lampo);
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
            // Automaattivalotus liukuu 1 EV/s, ettei valotus hypi kelauksessa.
            autoLisa = Mathf.MoveTowards(autoLisa, AutoValotus ? AutoLisa(AurinkoSin) : 0f, Time.unscaledDeltaTime);
            float ev = Valotus + autoLisa;
            if (vari != null && Mathf.Abs(vari.postExposure.value - ev) > 0.005f) vari.postExposure.Override(ev);
            if (vari != null)
            {
                float kon = S2 ? S2Kontrasti : 0f, kyl = S2 ? S2Kyllaisyys : 0f;
                var suodin = S2 ? Suodin(S2Lampo) : Color.white;
                if (Mathf.Abs(vari.contrast.value - kon) > 0.05f) vari.contrast.Override(kon);
                if (Mathf.Abs(vari.saturation.value - kyl) > 0.05f) vari.saturation.Override(kyl);
                if (vari.colorFilter.value != suodin) vari.colorFilter.Override(suodin);
            }
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
            $"kyytipino {(paalla ? "päällä" : "pois")}, valotus {Valotus:+0.0;-0.0} EV + auto {autoLisa:+0.00;-0.00} (sin {AurinkoSin:0.00}), bloom {(hehku != null && hehku.active ? "päällä" : "pois")}, filmi {(Filmi ? "päällä" : "pois")}, s2 {(S2 ? "päällä" : "pois")} sävy {S2Kontrasti:0}/{S2Kyllaisyys:0}/{S2Lampo:0.0}"
            + (KevytLaite ? " (kevyt laite)" : "");
    }
}
