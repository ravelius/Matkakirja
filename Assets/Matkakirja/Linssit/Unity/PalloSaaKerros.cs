// PALLON SÄÄKERROS (omistaja 8.10.2026, Päätoimittaja: kevyet tehosteet ensin, A/B COZYllä myöhemmin; juna 166): sade, lumi ja
// salaman välähdys koko ruudun nelikulmiona (Varjostimet/SaaKerros) omalla URP-overlay-kameralla kaupunkikameran pinossa
// (kerros 21, kuten YksityiskohtaKortti). Pois päältä, kun sadetta, lunta tai salamaa ei ole (ei piirtokustannusta).
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public sealed class PalloSaaKerros
    {
        public const int Kerros = 21;
        const float Etaisyys = 1f, Fov = 60f;
        Camera perus, overlay;
        Transform tasko;
        Material mat;
        static readonly int IdSade = Shader.PropertyToID("_Sade"), IdLumi = Shader.PropertyToID("_Lumi"), IdSalama = Shader.PropertyToID("_Salama"),
            IdTuuli = Shader.PropertyToID("_Tuuli"), IdAika = Shader.PropertyToID("_Aika"), IdAspect = Shader.PropertyToID("_Aspect"), IdSumu = Shader.PropertyToID("_Sumu");

        /// <summary>Joka kehys: painot (PalloSaaVaikutus), salama 0–1, tuuli m/s ja aika s.</summary>
        public void Aseta(Camera kamera, SaaPainot w, double salama, double tuuliMs, float aika)
        {
            bool tarvitaan = kamera != null && (w.Sade > 0.005 || w.Lumi > 0.005 || w.Sumu > 0.005 || salama > 0.001);
            if (!tarvitaan) { if (tasko != null) tasko.gameObject.SetActive(false); return; }
            Varmista(kamera);
            if (mat == null) return;
            overlay.aspect = kamera.aspect;
            float k = 2f * Etaisyys * Mathf.Tan(Fov * 0.5f * Mathf.Deg2Rad);
            tasko.localScale = new Vector3(k * kamera.aspect * 1.02f, k * 1.02f, 1f);
            tasko.localPosition = new Vector3(0f, 0f, Etaisyys);
            mat.SetFloat(IdSade, Mathf.SmoothStep(0f, 1f, (float)w.Sade));
            mat.SetFloat(IdLumi, Mathf.SmoothStep(0f, 1f, (float)w.Lumi));
            mat.SetFloat(IdSalama, (float)salama);
            mat.SetFloat(IdSumu, Mathf.SmoothStep(0f, 1f, (float)w.Sumu));
            mat.SetFloat(IdTuuli, 0.08f + Mathf.Clamp((float)tuuliMs / 40f, 0f, 0.35f));
            mat.SetFloat(IdAika, aika);
            mat.SetFloat(IdAspect, Mathf.Max(0.1f, kamera.aspect));
            tasko.gameObject.SetActive(true);
        }

        void Varmista(Camera kamera)
        {
            if (overlay != null && perus == kamera) return;
            Sulje();
            perus = kamera;
            var go = new GameObject("Pallon sääkerros (overlay)") { layer = Kerros };
            go.transform.SetParent(kamera.transform, false);
            overlay = go.AddComponent<Camera>();
            overlay.clearFlags = CameraClearFlags.Depth;
            overlay.cullingMask = 1 << Kerros;
            overlay.fieldOfView = Fov;
            overlay.nearClipPlane = 0.1f; overlay.farClipPlane = 10f;
            overlay.GetUniversalAdditionalCameraData().renderType = CameraRenderType.Overlay;
            var pd = kamera.GetUniversalAdditionalCameraData();
            if (pd != null && !pd.cameraStack.Contains(overlay)) pd.cameraStack.Add(overlay);
            var sh = Resources.Load<Shader>("Varjostimet/SaaKerros");
            if (sh == null) { Debug.Log("MATKAKIRJA linssit: sääkerroksen varjostin puuttuu"); return; }
            mat = new Material(sh) { name = "SaaKerros" };
            var q = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Object.Destroy(q.GetComponent<Collider>());
            q.name = "Sääkerros"; q.layer = Kerros;
            q.transform.SetParent(go.transform, false);
            var r = q.GetComponent<MeshRenderer>();
            r.sharedMaterial = mat; r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; r.receiveShadows = false;
            tasko = q.transform;
            tasko.gameObject.SetActive(false);
        }

        /// <summary>Kaikki pois (opas suljettu tai kamera vaihtui).</summary>
        public void Sulje()
        {
            if (perus != null && overlay != null)
            {
                var d = perus.GetUniversalAdditionalCameraData();
                if (d != null) d.cameraStack.Remove(overlay);
            }
            if (overlay != null) Object.Destroy(overlay.gameObject);
            if (mat != null) Object.Destroy(mat);
            overlay = null; perus = null; tasko = null; mat = null;
        }
    }
}
