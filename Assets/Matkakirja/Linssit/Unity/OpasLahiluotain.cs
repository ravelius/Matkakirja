// OPPAAN VAPAAN TILAN LÄHILUOTAIN (Päätoimittaja 6.10.2026 ilta: "läheisyystarkistus syvyyspuskurista … jos lähin geometria on
// alle 40 m, liikettä ei sallita sinne ja kamera nousee"). Pinnan pistenäytteet (SampleHeightMostDetailed) osuvat ristikon
// (Eiffel, koe-152 iPad 14b) aukoista maahan, joten kamera pääsi ristikon viereen. Pieni pois päältä oleva kamera piirtää vain
// kaupungin kerroksen (CesiumKaupunki.Kerros) 48 × 32 -syvyystekstuuriin (URP: Depth-muotoinen kohde → pelkkä syvyyspiirto)
// toivotun liikkeen suuntaan 35° alaspäin, pysty-FOV 100° (horisontin yläpuolelta 15° lähes suoraan alas), 6 kertaa sekunnissa.
// Syvyys kopioidaan R-float-tekstuuriin (Varjostimet/OpasSyvyys) ja luetaan AsyncGPUReadbackilla (pääsäie ei odota GPU:ta);
// lähin etäisyys (säde, ei pelkkä syvyys) → OpasVapaaLento.EsteM. Muisti 48 × 32 × 8 t ≈ 12 kt. Kamera ei ole Cesiumin
// valintakamera: luotain näkee vain jo ladatut laatat (päänäkymä katsoo liikkeen suuntaan).
using System;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    sealed class OpasLahiluotain : IDisposable
    {
        public const int Leveys = 48, Korkeus = 32;
        public const float ValiS = 1f / 6, AlasAst = 35f, PystyFov = 100f, KaukoM = 400f, LahiM = 0.5f;
        Camera kamera; RenderTexture syvyys, ulos; Material muunnin;
        float seuraava; bool kesken, eiTukea;
        /// <summary>Lähin kaupungin geometria luotaimen kuvassa (m); ääretön = ei mitään KaukoM:n sisällä.</summary>
        public double LahinM { get; private set; } = double.PositiveInfinity;
        public int Mittauksia { get; private set; }

        /// <summary>Kerran kehyksessä vapaassa tilassa pääkameran asennon jälkeen: suunta = toivotun liikkeen suunta pääkameran
        /// suunnasta (astetta, + oikealle), ylos = paikallinen ylös-suunta Unityn maailmassa (CesiumKaupunki.Ylos).</summary>
        public void Paivita(Camera paa, double suuntaEro, Vector3 ylos)
        {
            if (paa == null || eiTukea || kesken || Time.unscaledTime < seuraava) return;
            if (kamera == null && !Luo(paa)) return;
            seuraava = Time.unscaledTime + ValiS;
            var eteen = Vector3.ProjectOnPlane(paa.transform.forward, ylos);
            if (eteen.sqrMagnitude < 1e-6f) eteen = Vector3.ProjectOnPlane(paa.transform.up, ylos);
            eteen = Quaternion.AngleAxis((float)suuntaEro, ylos) * eteen.normalized;
            kamera.transform.SetPositionAndRotation(paa.transform.position, Quaternion.LookRotation(eteen, ylos) * Quaternion.Euler(AlasAst, 0, 0));
            kamera.cullingMask = 1 << CesiumKaupunki.Kerros;
            kamera.Render();
            muunnin.SetTexture("_Syvyys", syvyys);
            Graphics.Blit(null, ulos, muunnin, 0);
            kesken = true;
            AsyncGPUReadback.Request(ulos, 0, TextureFormat.RFloat, Luettu);
        }

        void Luettu(AsyncGPUReadbackRequest p)
        {
            kesken = false;
            if (p.hasError || kamera == null) return;
            var d = p.GetData<float>();
            bool kaanteinen = SystemInfo.usesReversedZBuffer;
            double tanV = Math.Tan(PystyFov * 0.5 * Math.PI / 180), tanH = tanV * Leveys / Korkeus;
            double lahin = double.PositiveInfinity;
            for (int y = 0; y < Korkeus; y++)
                for (int x = 0; x < Leveys; x++)
                {
                    double z = Etaisyys(d[y * Leveys + x], kaanteinen);
                    if (z >= KaukoM * 0.98) continue;
                    double nx = ((x + 0.5) / Leveys * 2 - 1) * tanH, ny = ((y + 0.5) / Korkeus * 2 - 1) * tanV;
                    lahin = Math.Min(lahin, z * Math.Sqrt(1 + nx * nx + ny * ny));
                }
            LahinM = lahin; Mittauksia++;
        }

        /// <summary>Raaka syvyys (0…1) → silmäsyvyys (m) perspektiivikameralle; käänteinen Z: 1 lähellä, 0 kaukana.</summary>
        public static double Etaisyys(double raaka, bool kaanteinen)
        {
            double n = LahiM, f = KaukoM;
            return kaanteinen ? n * f / (n + raaka * (f - n)) : n * f / (f - raaka * (f - n));
        }

        bool Luo(Camera paa)
        {
            var v = Resources.Load<Shader>("Varjostimet/OpasSyvyys");
            if (v == null || !v.isSupported || !SystemInfo.supportsAsyncGPUReadback || !SystemInfo.SupportsRenderTextureFormat(RenderTextureFormat.RFloat))
            { eiTukea = true; return false; }
            muunnin = new Material(v) { name = "OpasSyvyys" };
            syvyys = new RenderTexture(Leveys, Korkeus, 24, RenderTextureFormat.Depth) { name = "OpasLuotainSyvyys", filterMode = FilterMode.Point };
            ulos = new RenderTexture(Leveys, Korkeus, 0, RenderTextureFormat.RFloat) { name = "OpasLuotain", filterMode = FilterMode.Point };
            syvyys.Create(); ulos.Create();
            var go = new GameObject("OpasLahiluotain") { hideFlags = HideFlags.DontSave };
            kamera = go.AddComponent<Camera>();
            kamera.enabled = false;
            kamera.fieldOfView = PystyFov; kamera.aspect = (float)Leveys / Korkeus;
            kamera.nearClipPlane = LahiM; kamera.farClipPlane = KaukoM;
            kamera.allowHDR = false; kamera.allowMSAA = false; kamera.useOcclusionCulling = false;
            kamera.clearFlags = CameraClearFlags.Depth;
            kamera.targetTexture = syvyys;
            var u = kamera.GetUniversalAdditionalCameraData();
            u.renderPostProcessing = false; u.renderShadows = false; u.requiresDepthTexture = false; u.requiresColorTexture = false;
            u.antialiasing = AntialiasingMode.None;
            return true;
        }

        public void Dispose()
        {
            if (kamera != null) UnityEngine.Object.Destroy(kamera.gameObject);
            if (syvyys != null) { syvyys.Release(); UnityEngine.Object.Destroy(syvyys); }
            if (ulos != null) { ulos.Release(); UnityEngine.Object.Destroy(ulos); }
            if (muunnin != null) UnityEngine.Object.Destroy(muunnin);
            kamera = null; syvyys = ulos = null; muunnin = null; kesken = false; LahinM = double.PositiveInfinity;
        }
    }
}
