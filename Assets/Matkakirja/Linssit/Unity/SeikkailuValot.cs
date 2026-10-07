// HISTORIAMOOTTORI: LINNAN VALOEFEKTIT (Siirtoseppä 7.10.2026; PÄÄTOIMITTAJA 20.3x–20.4x: kynttilät, soihdut ja kuunsäteet linnaan,
// laatutasokytkin). Paketit: Vefects Candle VFX - URP (liekit, kevyet: kaikilla laitteilla) ja Kronnect Volumetric Lights 2 (URP;
// oletuksena Macilla ja M-sarjan iPadeilla, iPhonella pois kunnes mitattu). Volumetric Lightsin tyypit ovat URP:n assemblyssä
// (asmref), joten ne haetaan heijastuksella: tämä kääntyy ilman pakettia, ja puuttuva paketti ohitetaan hiljaa.
// - Liekit: Liekki(isa) luo VFX_Candle_Flame_01:n kynttilän tai lyhdyn liekiksi (DioraamaLiekit.LuoLyhty, kappelin kynttilät).
// - Kuunsäteet: Saede(paikka, suunta, …) luo spottivalon VolumetricLight-komponentilla; render feature lisätään URP:n renderereihin
//   ensimmäisellä käytöllä ja poistetaan, kun kytkin menee pois. Testi: "poikki valot volumetriset 0|1" ja "poikki valot liekit 0|1".
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuValot
    {
        static SeikkailuVfxViitteet viitteet; static bool haettu;
        static Type tyyppiValo, tyyppiFeature;
        static readonly List<ScriptableRendererFeature> lisatyt = new List<ScriptableRendererFeature>();
        /// <summary>Luodut säteet (kytkin ajon aikana näyttää/piilottaa ne; luukun säde lisäksi luukun tilan mukaan).</summary>
        static readonly List<Light> saeteet = new List<Light>();

        /// <summary>Candle VFX -liekit (kevyet, oletuksena päällä kaikilla).</summary>
        public static bool Liekit = true;
        /// <summary>Volumetriset valot: laatutaso (Mac ja M-sarjan iPad päällä, iPhone ja vanhat iPadit pois).</summary>
        public static bool Volumetriset = OletusVolumetriset();
        public static event Action Muuttui;
        /// <summary>Render feature lisätty (jokin volumetrinen säde käytössä): dioraaman kamera pyytää syvyyden vain silloin.</summary>
        public static bool Kaytossa => lisatyt.Count > 0;

        static bool OletusVolumetriset()
        {
            if (Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXEditor) return true;
            string m = SystemInfo.deviceModel ?? "";
            if (!m.StartsWith("iPad", StringComparison.Ordinal)) return false;
            // iPad13,4–13,11 (Pro M1), 13,16/17 (Air M1), 14,x (M2), 15+ ja 16,x (M3/M4); ei 13,1/2 (Air A14) eikä 13,18/19 (10. sukup.).
            var osat = m.Substring(4).Split(',');
            if (osat.Length < 2 || !int.TryParse(osat[0], out int a) || !int.TryParse(osat[1], out int b)) return false;
            if (a >= 14) return a != 14 || b < 1 || b > 2;   // iPad14,1/2 = mini 6 (A15)
            return a == 13 && (b >= 4 && b <= 11 || b == 16 || b == 17);
        }

        public static void Aseta(bool? liekit = null, bool? volumetriset = null)
        {
            if (liekit is bool l) Liekit = l;
            if (volumetriset is bool v)
            {
                Volumetriset = v;
                if (!v) PoistaFeature(); else VarmistaFeature();
                saeteet.RemoveAll(x => x == null);
                foreach (var s in saeteet) { var vl = tyyppiValo != null ? s.GetComponent(tyyppiValo) as Behaviour : null; if (vl != null) vl.enabled = v; s.enabled = v; }
            }
            Muuttui?.Invoke();
        }

        static void Hae()
        {
            if (haettu) return;
            haettu = true;
            viitteet = Resources.Load<SeikkailuVfxViitteet>("Seikkailu/SeikkailuVfx");
            foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            {
                tyyppiValo ??= asm.GetType("VolumetricLights.VolumetricLight");
                tyyppiFeature ??= asm.GetType("VolumetricLights.VolumetricLightsRenderFeature");
            }
        }

        /// <summary>Kynttilän liekki VFX:nä isän lapseksi (isän skaala kumotaan). Null, jos pois tai paketti puuttuu.</summary>
        public static GameObject Liekki(Transform isa, int kerros)
        {
            Hae();
            if (!Liekit || viitteet == null || viitteet.KynttilanLiekki == null || isa == null) return null;
            var go = UnityEngine.Object.Instantiate(viitteet.KynttilanLiekki, isa, false);
            go.name = "Kynttilän liekki (VFX)";
            var s = isa.lossyScale;
            go.transform.localScale = new Vector3(s.x != 0 ? 1f / s.x : 1f, s.y != 0 ? 1f / s.y : 1f, s.z != 0 ? 1f / s.z : 1f);
            foreach (var t in go.GetComponentsInChildren<Transform>(true)) t.gameObject.layer = kerros;
            foreach (var l in go.GetComponentsInChildren<Light>(true)) l.enabled = false;   // valo tulee pelin omista valoista
            foreach (var a in go.GetComponentsInChildren<AudioSource>(true)) a.enabled = false;
            return go;
        }

        /// <summary>Volumetrinen säde (kuunvalo ilmaraosta tai luukusta): spottivalo + VolumetricLight. Null, jos laatutaso pois tai paketti puuttuu.</summary>
        public static Light Saede(Transform isa, Vector3 paikka, Vector3 suunta, Color vari, float voima, float kantama, float kulma, int kerros)
        {
            Hae();
            // Säde luodaan aina, kun paketti on mukana (kytkin voi tuoda sen ajon aikana); laatutaso pois → valo ja efekti pois.
            if (tyyppiValo == null || Volumetriset && !VarmistaFeature()) return null;
            var go = new GameObject("Kuunsäde (volumetrinen)") { layer = kerros };
            go.transform.SetParent(isa, false);
            go.transform.position = paikka;
            go.transform.rotation = Quaternion.LookRotation(suunta.sqrMagnitude > 1e-4f ? suunta.normalized : Vector3.down);
            var l = go.AddComponent<Light>();
            l.type = LightType.Spot; l.color = vari; l.intensity = voima; l.range = kantama; l.spotAngle = kulma; l.shadows = LightShadows.None;
            var vl = go.AddComponent(tyyppiValo);
            Kentta(vl, "density", 0.12f); Kentta(vl, "brightness", 0.8f); Kentta(vl, "noiseStrength", 0.6f); Kentta(vl, "enableDustParticles", true);
            if (!Volumetriset) { l.enabled = false; if (vl is Behaviour b) b.enabled = false; }
            saeteet.Add(l);
            return l;
        }

        static void Kentta(Component c, string nimi, object arvo)
        {
            var f = c.GetType().GetField(nimi);
            if (f != null && f.FieldType.IsInstanceOfType(arvo)) f.SetValue(c, arvo);
        }

        /// <summary>VolumetricLightsRenderFeature URP:n renderereihin (kerran); false, jos ei onnistu.</summary>
        static bool VarmistaFeature()
        {
            if (tyyppiFeature == null) return false;
            if (lisatyt.Count > 0) return true;
            var urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            var kentta = typeof(UniversalRenderPipelineAsset).GetField("m_RendererDataList", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            if (urp == null || kentta == null || !(kentta.GetValue(urp) is ScriptableRendererData[] lista)) return false;
            foreach (var rd in lista)
            {
                if (rd == null || rd.rendererFeatures.Exists(f => f != null && f.GetType() == tyyppiFeature)) continue;
                var f = (ScriptableRendererFeature)ScriptableObject.CreateInstance(tyyppiFeature);
                f.name = "Volumetric Lights (Matkakirja)";
                rd.rendererFeatures.Add(f); rd.SetDirty();
                lisatyt.Add(f);
            }
            Debug.Log($"MATKAKIRJA seikkailu: volumetriset valot päälle ({lisatyt.Count} renderöijään)");
            return true;
        }

        static void PoistaFeature()
        {
            if (lisatyt.Count == 0) return;
            var urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            var kentta = typeof(UniversalRenderPipelineAsset).GetField("m_RendererDataList", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            if (urp != null && kentta != null && kentta.GetValue(urp) is ScriptableRendererData[] lista)
                foreach (var rd in lista) if (rd != null && rd.rendererFeatures.RemoveAll(f => lisatyt.Contains(f)) > 0) rd.SetDirty();
            foreach (var f in lisatyt) if (f != null) UnityEngine.Object.Destroy(f);
            lisatyt.Clear();
        }

        /// <summary>Seikkailu suljetaan: feature pois rendereristä (muut näkymät eivät maksa siitä).</summary>
        public static void Poista() => PoistaFeature();
    }
}
