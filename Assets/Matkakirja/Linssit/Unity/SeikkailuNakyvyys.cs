// HISTORIAMOOTTORI: NÄKYVYYS KUVANA (Siirtoseppä 7.10.2026; Päätoimittaja 18.6x omistajan linjan mukaan: ei valomittaria, ei HUD-osoitinta,
// ei tekstiä). Ensimmäisessä persoonassa pelaaja ei näe itseään, joten valoisuus (SeikkailuVartijat.PelaajanValoisuus, sama luku kuin
// vartijoiden näöllä) näkyy kuvassa: pimeässä reunat tummuvat pehmeästi ja kuva viilenee hieman, valossa reunat avautuvat.
// Jälkikäsittely: oma globaali Volume dioraaman kerroksessa (Vignette + WhiteBalance; samat efektit Kyytipino.assetissa ja KaupunkiKuvassa,
// joten variantit säilyvät buildissa), paino = pimeys pehmennettynä. Havaituksi tuleminen kerrotaan vartijan reaktiolla ja sydämellä.
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuNakyvyys : MonoBehaviour
    {
        /// <summary>Valoisuus, jossa kuva on täysin auki / täysin pimeä (vartijoiden asteikko 0…1, perusvalo 0,25).</summary>
        public const float Auki = 0.6f, Pimea = 0.2f, Muutos = 1.2f;
        public const float VinjettiMax = 0.42f, ViileysMax = -14f;
        Volume volyymi; VolumeProfile profiili; float paino;
        public float Pimeys => paino;

        public static SeikkailuNakyvyys Luo(Transform isa)
        {
            var go = new GameObject("Seikkailu näkyvyys") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var n = go.AddComponent<SeikkailuNakyvyys>();
            n.volyymi = go.AddComponent<Volume>(); n.volyymi.isGlobal = true; n.volyymi.priority = 110f; n.volyymi.weight = 0f;
            n.profiili = ScriptableObject.CreateInstance<VolumeProfile>(); n.profiili.name = "SeikkailuNakyvyys";
            var v = n.profiili.Add<Vignette>(true);
            v.intensity.Override(VinjettiMax); v.smoothness.Override(0.55f); v.rounded.Override(false); v.color.Override(Color.black);
            var wb = n.profiili.Add<WhiteBalance>(true);
            wb.temperature.Override(ViileysMax);
            n.volyymi.profile = n.profiili;
            return n;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            float tavoite = 0f;
            if (p != null && SeikkailuPelaaja.Ensimmainen)
                tavoite = Mathf.Clamp01((Auki - (float)SeikkailuVartijat.PelaajanValoisuus(p)) / (Auki - Pimea));
            paino = Mathf.MoveTowards(paino, tavoite, Muutos * Time.unscaledDeltaTime);
            volyymi.weight = paino * paino * (3f - 2f * paino);
        }

        void OnDestroy() { if (profiili != null) Destroy(profiili); }
    }
}
