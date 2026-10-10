// OMIEN MALLIEN AURINKOVARJOT (LS2 9.10.2026; PT: "toimivat aurinkovarjot poistaisivat litteyden kaikista omista malleista").
// Kaupunkinäkymän oma suuntavalo _OmaAurinko-suunnassa (kaupungin aurinko laattojen leivotulla atsimuutilla, LS2 10.10., ei kartan kameraa seuraavaa valoa) kaupungin kerroksessa
// ja vain sitä valaisemassa; muilta suuntavaloilta (kartan "Valo") kaupungin kerros pois cullingMaskista, väri ja voima kirkkaimmasta.
// JUURISYY (KOE google-tyyli c166e6799, raportti docs/raportit/varjot-juurisyy-20261009.md): PalloKierron kaukotaso "etäisyys + maapallon
// halkaisija" (12 757 km, lähi 50 m) romahdutti URP:n kaskadit lähitason kokoisiksi (säde 29 m) → ei varjoja. Varjojen ajaksi kaupunki-
// kameran kaukotaso rajataan horisonttiin × 1,5 + 20 km (≥ 30 km) beginCameraRenderingissa. Mobiili (PT 9.10.): varjokartta 2048² ja
// 2 kaskadia, varjomatka 1000 m; Mac pitää laatuasetuksen (Ultra 4096², 4 kaskadia, 1500 m). Kaikki palautetaan Pois-kutsussa.
// Rajat: Googlen laatat eivät heitä eivätkä ota vastaan varjoja (vain omat mallit itseensä). Asetukset "omavarjot 0|1", "omavarjomatka m".
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public static class OmatVarjot
    {
        /// <summary>Päällä oletuksena vasta Natiivisepän kustannuskuittauksella (PT 9.10.).</summary>
        public static bool Paalla = false;
        public static float? MatkaAsetettu;
        public static bool Mobiili => Application.isMobilePlatform;
        static Light aurinko; static UniversalRenderPipelineAsset urp;
        static float alkuMatka = -1f; static int alkuResoluutio = -1, alkuKaskadit = -1; static Light alkuSun;
        static readonly List<(Light valo, int maski)> rajatut = new List<(Light, int)>();
        static Transform juuri; static bool kytketty;
        static Camera kaukoKamera; static float kaukoAlku = -1f, kaukoAsetettu = -1f;
        static readonly int IdOmaAurinko = Shader.PropertyToID("_OmaAurinko");

        /// <summary>Joka kehys (CesiumOmatMallit.Kamera): omien mallien juuri ja onko malleja.</summary>
        public static void Paivita(Transform mallienJuuri, bool malleja, System.Action<string> kirjaa)
        {
            juuri = mallienJuuri;
            Vector4 a = Shader.GetGlobalVector(IdOmaAurinko);
            if (!Paalla || !malleja || juuri == null || a.y <= 0.02f) { Pois(); return; }   // yöllä ei suoraa aurinkoa
            int kerros = juuri.gameObject.layer, bitti = 1 << kerros;
            if (aurinko == null)
            {
                alkuSun = RenderSettings.sun;
                var go = new GameObject("Kaupungin aurinko (omien mallien varjot)") { layer = kerros };
                aurinko = go.AddComponent<Light>();
                aurinko.type = LightType.Directional; aurinko.shadows = LightShadows.Soft; aurinko.shadowStrength = 0.8f; aurinko.cullingMask = bitti;
                foreach (var v in Object.FindObjectsByType<Light>(FindObjectsSortMode.None))
                {
                    if (v == aurinko || v.type != LightType.Directional || (v.cullingMask & bitti) == 0) continue;
                    rajatut.Add((v, v.cullingMask)); v.cullingMask &= ~bitti;
                }
                urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
                if (urp != null)
                {
                    alkuMatka = urp.shadowDistance; alkuResoluutio = urp.mainLightShadowmapResolution; alkuKaskadit = urp.shadowCascadeCount;
                    urp.shadowDistance = MatkaAsetettu ?? (Mobiili ? 1000f : 1500f);
                    if (Mobiili) { urp.mainLightShadowmapResolution = 2048; urp.shadowCascadeCount = 2; }
                }
                if (!kytketty) { RenderPipelineManager.beginCameraRendering += KameraAlkaa; kytketty = true; }
                kirjaa?.Invoke($"omat varjot päälle: varjomatka {urp?.shadowDistance:F0} m, kartta {urp?.mainLightShadowmapResolution}², kaskadit {urp?.shadowCascadeCount}{(Mobiili ? " (mobiili)" : "")}");
            }
            Light lahde = alkuSun;
            foreach (var (v, _) in rajatut) if (v != null && v.isActiveAndEnabled && (lahde == null || v.intensity > lahde.intensity)) lahde = v;
            if (lahde != null && lahde != aurinko) { aurinko.color = lahde.color; aurinko.intensity = lahde.intensity; }
            if (alkuSun != null && alkuSun != aurinko) alkuSun.enabled = false;
            aurinko.transform.rotation = Quaternion.LookRotation(-new Vector3(a.x, a.y, a.z));
            RenderSettings.sun = aurinko;
        }

        public static void Pois()
        {
            if (aurinko == null) return;
            Object.Destroy(aurinko.gameObject); aurinko = null;
            if (alkuSun != null) alkuSun.enabled = true;
            RenderSettings.sun = alkuSun; alkuSun = null;
            foreach (var (v, m) in rajatut) if (v != null) v.cullingMask = m;
            rajatut.Clear();
            if (urp != null && alkuMatka >= 0f) { urp.shadowDistance = alkuMatka; urp.mainLightShadowmapResolution = alkuResoluutio; urp.shadowCascadeCount = alkuKaskadit; }
            alkuMatka = -1f;
            if (kaukoKamera != null && kaukoAlku > 0f && Mathf.Abs(kaukoKamera.farClipPlane - kaukoAsetettu) < 1f) kaukoKamera.farClipPlane = kaukoAlku;
            kaukoKamera = null; kaukoAlku = kaukoAsetettu = -1f;
        }

        static void KameraAlkaa(ScriptableRenderContext ctx, Camera c)
        {
            if (aurinko == null || juuri == null || c.cameraType != CameraType.Game || (c.cullingMask & (1 << juuri.gameObject.layer)) == 0) return;
            double h = System.Math.Max(100.0, c.transform.position.y + 50.0);
            float raja = (float)System.Math.Max(30000.0, 1.5 * System.Math.Sqrt(2.0 * 6371000.0 * h + h * h) + 20000.0);
            if (Mathf.Abs(c.farClipPlane - kaukoAsetettu) >= 1f) { kaukoKamera = c; kaukoAlku = c.farClipPlane; }   // joku muu asetti uuden
            if (c.farClipPlane > raja) { c.farClipPlane = raja; kaukoAsetettu = raja; }
        }
    }
}
