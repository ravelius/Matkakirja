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
            y.yo.profile = y.yoProfiili;
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

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            if (yoProfiili != null) Destroy(yoProfiili);
            if (mustaProfiili != null) Destroy(mustaProfiili);
        }
    }
}
