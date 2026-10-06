// KAUPUNGIN TERÄVÖITYS (omistaja 6.10. 19.1x kuvanlaatulista kohta 1, Linssiseppä; junaan 153 kuvaparin ja iPad-mittauksen jälkeen):
// Varjostimet/KaupunkiTerava (kontrastimukautuva, AMD CAS:n periaate) URP:n FullScreenPassRendererFeaturena oletusrendereriin
// vain kaupunkinäkymän ajaksi; sulkiessa feature poistetaan. Vahvuus KaupunkiKuva-asetuksista ("terava 0.5"; 0 = pois).
// Kustannus: yksi koko ruudun passi 5 näytteellä (iPad Pro 13" 2752×2064 ≈ 5,7 Mpx), ei välipuskureita omasta takaa.
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiTerava
    {
        static FullScreenPassRendererFeature feature;
        static Material materiaali;
        static ScriptableRendererData data;
        static readonly int IdTerava = Shader.PropertyToID("_Terava");

        /// <summary>Kytke päälle tai säädä vahvuutta (0 = pois). Kutsutaan KaupunkiKuvasta avauksessa ja asetusten muuttuessa.</summary>
        public static void Aseta(float vahvuus)
        {
            if (vahvuus <= 0f) { Pois(); return; }
            if (feature == null && !Luo()) return;
            materiaali.SetFloat(IdTerava, Mathf.Clamp01(vahvuus));
        }

        static bool Luo()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/KaupunkiTerava");
            if (varjostin == null || !(GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) || urp.rendererDataList.Length == 0)
            { Debug.Log("MATKAKIRJA kaupunki: terävöitys ei käytettävissä (varjostin tai URP puuttuu)"); return false; }
            data = urp.rendererDataList[0];
            if (data == null) return false;
            materiaali = new Material(varjostin) { name = "KaupunkiTerava" };
            feature = ScriptableObject.CreateInstance<FullScreenPassRendererFeature>();
            feature.name = "Matkakirja kaupunki terävöitys";
            feature.injectionPoint = FullScreenPassRendererFeature.InjectionPoint.AfterRenderingPostProcessing;
            feature.fetchColorBuffer = true;
            feature.requirements = ScriptableRenderPassInput.None;
            feature.passMaterial = materiaali;
            feature.passIndex = 0;
            data.rendererFeatures.Add(feature);
            data.SetDirty();
            Debug.Log("MATKAKIRJA kaupunki: terävöitys päällä");
            return true;
        }

        public static void Pois()
        {
            if (feature == null) return;
            if (data != null) { data.rendererFeatures.Remove(feature); data.SetDirty(); }
            Object.Destroy(feature);
            if (materiaali != null) Object.Destroy(materiaali);
            feature = null; materiaali = null; data = null;
            Debug.Log("MATKAKIRJA kaupunki: terävöitys pois");
        }
    }
}
