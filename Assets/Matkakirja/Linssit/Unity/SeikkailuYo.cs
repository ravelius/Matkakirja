// HISTORIAMOOTTORI: YÖ JA ALKUKUVA (Siirtoseppä 8.10.2026; omistajan palaute Olavinlinnasta 18.3x). (2) "paljon pimeämpi ympäristö":
// pelattavan palan ajaksi oma globaali Volume (valotus −1,1 EV, kylmempi ja vähemmän värikylläinen; liekit ja kuu jäävät valoiksi, koska
// ne ovat kirkkaimmat kohdat ja kukkivat). (3) "alussa ei vilahda linna lintuperspektiivistä": kuva on musta palan alusta siihen asti,
// kun veneen (tai jatkon pelaajan) kamera on käytössä, ja avautuu 1,2 s:ssa suoraan veneestä. Poistuu palan mukana.
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuYo : MonoBehaviour
    {
        public static SeikkailuYo Aktiivinen { get; private set; }
        public const float ValotusEV = -1.1f, Kylmyys = -18f, Kyllaisyys = -25f, AvausS = 1.2f;
        Volume yo, musta; VolumeProfile yoProfiili, mustaProfiili;
        bool auki; float mustaPaino = 1f;

        public static SeikkailuYo Luo(Transform isa, bool mustaAlku)
        {
            Poista();
            var go = new GameObject("Seikkailu yö") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var y = go.AddComponent<SeikkailuYo>();
            y.yo = go.AddComponent<Volume>(); y.yo.isGlobal = true; y.yo.priority = 105f; y.yo.weight = 1f;
            y.yoProfiili = ScriptableObject.CreateInstance<VolumeProfile>(); y.yoProfiili.name = "SeikkailuYo";
            var ca = y.yoProfiili.Add<ColorAdjustments>(true);
            ca.postExposure.Override(ValotusEV); ca.saturation.Override(Kyllaisyys); ca.contrast.Override(8f);
            y.yoProfiili.Add<WhiteBalance>(true).temperature.Override(Kylmyys);
            // Grafiikka (omistaja 8.10. 19.5x, juna 169): liekit hehkuvat (bloom vain kirkkaimmille, lämmin sävy), kylmä yö ja lämpimät
            // liekit split toningilla, hento vinjetti. RP-assetin oletusprofiilin (Bloom, Vignette 0,2, Neutral) päälle prioriteetilla 105.
            var bl = y.yoProfiili.Add<Bloom>(true);
            bl.threshold.Override(1.0f); bl.intensity.Override(0.9f); bl.scatter.Override(0.7f); bl.tint.Override(new Color(1f, 0.82f, 0.62f));
            var st = y.yoProfiili.Add<SplitToning>(true);
            st.shadows.Override(new Color(0.36f, 0.46f, 0.62f)); st.highlights.Override(new Color(1f, 0.74f, 0.48f)); st.balance.Override(-15f);
            var vi = y.yoProfiili.Add<Vignette>(true);
            vi.intensity.Override(0.3f); vi.smoothness.Override(0.45f);
            y.yo.profile = y.yoProfiili;
            AsetaUsva();
            y.musta = go.AddComponent<Volume>(); y.musta.isGlobal = true; y.musta.priority = 130f;
            y.mustaProfiili = ScriptableObject.CreateInstance<VolumeProfile>(); y.mustaProfiili.name = "SeikkailuAlkuMusta";
            y.mustaProfiili.Add<ColorAdjustments>(true).postExposure.Override(-12f);
            y.musta.profile = y.mustaProfiili;
            y.auki = !mustaAlku; y.mustaPaino = mustaAlku ? 1f : 0f; y.musta.weight = y.mustaPaino;
            y.luotu = Time.unscaledTime;
            Aktiivinen = y;
            return y;
        }

        /// <summary>Seikkailun kamera on käytössä (vene tai pelaaja): alun musta avautuu.</summary>
        public void Avaa() { if (!auki) { auki = true; avausAlkaa = Time.unscaledTime + ViiveS; } }
        public const float ViiveS = 0.8f;   // kameran vaihdon blendi ehtii loppuun mustan alla (ei lintuperspektiiviä blendin aikana)
        float avausAlkaa, luotu = float.MaxValue;
        public const float VaraS = 8f;

        void Update()
        {
            if (!auki && Time.unscaledTime - luotu > VaraS) Avaa();   // vara: vene ei latautunut → ei jäädä mustaan
            if (!auki || Time.unscaledTime < avausAlkaa) return;
            mustaPaino = Mathf.MoveTowards(mustaPaino, 0f, Time.unscaledDeltaTime / AvausS);
            musta.weight = mustaPaino * mustaPaino * (3f - 2f * mustaPaino);
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; Shader.SetGlobalVector(IdUsva, Vector4.zero); if (a != null) Destroy(a.gameObject); }

        // Usva (juna 169, DioraamaUsva.hlsl): pinta vedenpinnan yllä (Saimaa y ≈ 0), paksuus 1,6 m, tiheys 0,05/m, kuunvalon harmaa.
        static readonly int IdUsva = Shader.PropertyToID("_DioraamaUsva"), IdUsvaVari = Shader.PropertyToID("_DioraamaUsvaVari");
        public static Vector4 Usva = new Vector4(1.2f, 1.6f, 0.05f, 0.55f);
        public static Color UsvaVari = new Color(0.10f, 0.12f, 0.16f);
        static void AsetaUsva() { Shader.SetGlobalVector(IdUsva, Usva); Shader.SetGlobalVector(IdUsvaVari, (Vector4)UsvaVari.linear); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            if (yoProfiili != null) Destroy(yoProfiili);
            if (mustaProfiili != null) Destroy(mustaProfiili);
        }
    }
}
