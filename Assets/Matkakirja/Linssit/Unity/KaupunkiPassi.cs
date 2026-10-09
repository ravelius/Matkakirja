// KAUPUNGIN KOKO RUUDUN PASSI (Linssiseppä 9.10.2026; yövalojen juurisyy omilla simudiagnooseilla): FullScreenPassRendererFeature ajoi
// yövalot ja muotokorostuksen kamerapinon päällyskameroille, joiden syvyys on tyhjä, eikä peruskameran tulosta jäänyt näkyviin. Tämä passi
// lisätään vain kaupungin peruskameralle (beginCameraRendering, kuten PalloSumennus) jälkikäsittelyn jälkeen: värikopio → materiaali
// (Blit.hlsl:n Vert, _BlitTexture) kameran väriin, syvyystekstuuri luettavissa (_CameraDepthTexture). Diagnoosi: Tila.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.RenderGraphModule;
using UnityEngine.Rendering.RenderGraphModule.Util;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiPassi
    {
        sealed class Vaihe : ScriptableRenderPass
        {
            public Material materiaali; public string nimi;
            sealed class Data { public TextureHandle lahde; public Material materiaali; public Vector4 tekseli, kameraP; public Matrix4x4 invVP; }
            static readonly MaterialPropertyBlock lohko = new MaterialPropertyBlock();
            static readonly int IdBlit = Shader.PropertyToID("_BlitTexture"), IdSkaala = Shader.PropertyToID("_BlitScaleBias"), IdTekseli = Shader.PropertyToID("_BlitTexture_TexelSize");
            static readonly int IdInvVP = Shader.PropertyToID("_KaupunkiInvVP"), IdKamera = Shader.PropertyToID("_KaupunkiKamera");

            public Vaihe(string n)
            {
                nimi = n;
                // 9.10. rajausajo (dea3b1ab8): peruskameralla vain AfterRenderingPostProcessing näkyy ruudulla (aiemmat vaiheet
                // korvautuivat jälkikäsittelyssä); syvyys on yhä luettavissa, korin päällyskamera piirtää päälle.
                renderPassEvent = RenderPassEvent.AfterRenderingPostProcessing;
                requiresIntermediateTexture = true;
                ConfigureInput(ScriptableRenderPassInput.Depth);
                profilingSampler = new ProfilingSampler(n);
            }

            public override void RecordRenderGraph(RenderGraph rg, ContextContainer frameData)
            {
                var res = frameData.Get<UniversalResourceData>();
                var cam = frameData.Get<UniversalCameraData>();
                tila = $"{nimi}: {cam.camera.name}, tapahtuma {renderPassEvent}, takapuskuri {res.isActiveTargetBackBuffer}, syvyys {res.cameraDepthTexture.IsValid()}";
                if (materiaali == null || res.isActiveTargetBackBuffer) return;
                // Kameran matriisit itse (jälkikäsittelyn jälkeen globaalit voivat olla koko ruudun piirron).
                // Käänteinen näkymä-projektio osista (9.10. simu 8e75e3c5: paikka NaN kaikissa pikseleissä): projektion käänteismatriisi
                // erikseen ja kameran maailmamatriisi; yhdistetyn VP:n käänteinen voi rappeutua (Unity palauttaa nollamatriisin).
                var invP = cam.GetGPUProjectionMatrix(0).inverse;
                var invVP = cam.camera.cameraToWorldMatrix * invP;
                bool ok = Kelpaa(invVP);
                if (!ok) { invVP = (cam.GetGPUProjectionMatrix(0) * cam.GetViewMatrix(0)).inverse; }
                matriisiTila = $"invVP {(Kelpaa(invVP) ? "ok" : "VIRHE")} (osista {(ok ? "ok" : "virhe")}, P det {cam.GetGPUProjectionMatrix(0).determinant:G3}, near {cam.camera.nearClipPlane:G3} far {cam.camera.farClipPlane:G3})";
                materiaali.SetMatrix(IdInvVP, invVP);
                materiaali.SetVector(IdKamera, cam.camera.transform.position);
                var kuvaus = rg.GetTextureDesc(res.activeColorTexture);
                kuvaus.name = "Matkakirja " + nimi + " kopio"; kuvaus.clearBuffer = false; kuvaus.msaaSamples = MSAASamples.None;
                var kopio = rg.CreateTexture(kuvaus);
                rg.AddBlitPass(res.activeColorTexture, kopio, Vector2.one, Vector2.zero, passName: "Matkakirja " + nimi + " kopio");
                using (var b = rg.AddRasterRenderPass<Data>("Matkakirja " + nimi, out var d, profilingSampler))
                {
                    d.lahde = kopio; d.materiaali = materiaali; d.invVP = invVP; d.kameraP = cam.camera.transform.position; d.tekseli = new Vector4(1f / kuvaus.width, 1f / kuvaus.height, kuvaus.width, kuvaus.height);
                    b.UseTexture(kopio, AccessFlags.Read);
                    if (res.cameraDepthTexture.IsValid()) b.UseTexture(res.cameraDepthTexture, AccessFlags.Read);
                    b.UseAllGlobalTextures(true);
                    b.AllowPassCulling(false);   // 9.10. simu: passi kirjattiin peruskameralle (syvyys ok), mutta tulos ei näkynyt → ei karsintaa
                    b.SetRenderAttachment(res.activeColorTexture, 0, AccessFlags.Write);
                    b.SetRenderFunc((Data x, RasterGraphContext c) =>
                    {
                        lohko.Clear(); lohko.SetTexture(IdBlit, x.lahde); lohko.SetVector(IdSkaala, new Vector4(1, 1, 0, 0));
                        // 9.10. simu 754c1590: MPB ei aseta tekselikokoa → naapurit samaan pisteeseen, normaali NaN, yö mustana.
                        lohko.SetVector(IdTekseli, x.tekseli);
                        lohko.SetMatrix(IdInvVP, x.invVP); lohko.SetVector(IdKamera, x.kameraP);   // myös lohkoon (varmistus)
                        c.cmd.DrawProcedural(Matrix4x4.identity, x.materiaali, 0, MeshTopology.Triangles, 3, 1, lohko);
                    });
                }
            }
            public string tila, matriisiTila;
            static bool Kelpaa(Matrix4x4 m)
            {
                bool nolla = true;
                for (int i = 0; i < 16; i++) { float a = m[i]; if (float.IsNaN(a) || float.IsInfinity(a)) return false; if (a != 0f) nolla = false; }
                return !nolla;
            }
        }

        /// <summary>
        /// SYVYYSKOPIO (9.10. simu 6a07a258: jälkikäsittelyn jälkeen _CameraDepthTexture on tyhjä, ja aiemmat vaiheet korvautuvat
        /// jälkikäsittelyssä): läpinäkyvien jälkeen kameran syvyys kopioidaan omaan R32-tekstuuriin _KaupunkiSyvyys, jota passit lukevat.
        /// </summary>
        sealed class SyvyysVaihe : ScriptableRenderPass
        {
            public RTHandle kohde; public string tila;
            public SyvyysVaihe()
            {
                renderPassEvent = RenderPassEvent.AfterRenderingTransparents;
                ConfigureInput(ScriptableRenderPassInput.Depth);
                profilingSampler = new ProfilingSampler("Matkakirja kaupungin syvyys");
            }
            public override void RecordRenderGraph(RenderGraph rg, ContextContainer frameData)
            {
                var res = frameData.Get<UniversalResourceData>();
                var kuvaus = frameData.Get<UniversalCameraData>().cameraTargetDescriptor;
                if (!res.cameraDepthTexture.IsValid()) { tila = "syvyys: ei tekstuuria"; return; }
                if (kohde == null || kohde.rt == null || kohde.rt.width != kuvaus.width || kohde.rt.height != kuvaus.height)
                {
                    kohde?.Release();
                    kohde = RTHandles.Alloc(kuvaus.width, kuvaus.height, colorFormat: UnityEngine.Experimental.Rendering.GraphicsFormat.R32_SFloat, filterMode: FilterMode.Point, name: "Matkakirja kaupungin syvyys");
                }
                var dst = rg.ImportTexture(kohde);
                rg.AddBlitPass(res.cameraDepthTexture, dst, Vector2.one, Vector2.zero, passName: "Matkakirja kaupungin syvyys");
                tila = $"syvyys: kopio {kuvaus.width}×{kuvaus.height}";
                foreach (var v in aktiiviset.Values) v.materiaali?.SetTexture(IdSyvyys, kohde);
            }
        }
        static readonly SyvyysVaihe syvyysVaihe = new SyvyysVaihe();
        static readonly int IdSyvyys = Shader.PropertyToID("_KaupunkiSyvyys");

        static readonly Dictionary<string, Vaihe> vaiheet = new Dictionary<string, Vaihe>();
        static readonly Dictionary<string, Vaihe> aktiiviset = new Dictionary<string, Vaihe>();
        /// <summary>Kaupungin peruskamera (KaupunkiYovalot.Paivita asettaa joka kehys).</summary>
        public static Camera Kamera;
        /// <summary>Diagnoosi: passin tapahtuma (opas yovalotvaihe N); null = AfterRenderingPostProcessing.</summary>
        public static RenderPassEvent? Tapahtuma;
        static bool kytketty;
        /// <summary>Diagnoosi (opas passi &lt;nimi&gt; 0|1): passit, joita ei lisätä vaikka aktiivisia.</summary>
        public static readonly HashSet<string> Estetyt = new HashSet<string>();

        /// <summary>Passi (nimi) päälle tällä materiaalilla seuraavista kehyksistä alkaen; null = pois.</summary>
        public static void Aseta(string nimi, Material m)
        {
            if (m == null) { aktiiviset.Remove(nimi); return; }
            if (!vaiheet.TryGetValue(nimi, out var v)) vaiheet[nimi] = v = new Vaihe(nimi);
            v.materiaali = m; aktiiviset[nimi] = v;
            if (!kytketty) { RenderPipelineManager.beginCameraRendering += Ennen; kytketty = true; }
        }

        static void Ennen(ScriptableRenderContext _, Camera c)
        {
            if (c == null || c != Kamera || aktiiviset.Count == 0) return;
            var r = c.GetUniversalAdditionalCameraData()?.scriptableRenderer;
            if (r == null) return;
            r.EnqueuePass(syvyysVaihe);
            foreach (var v in aktiiviset.Values) { if (Estetyt.Contains(v.nimi)) continue; if (Tapahtuma.HasValue) v.renderPassEvent = Tapahtuma.Value; r.EnqueuePass(v); }
        }

        /// <summary>Diagnoosi (opas ssao 0|1): nykyisen renderöijän SSAO-ominaisuus päälle/pois; palauttaa tilan.</summary>
        public static string Ssao(bool? paalla)
        {
            if (!(GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) || urp.rendererDataList.Length == 0) return "ssao: ei URP:tä";
            var tulos = "";
            foreach (var f in urp.rendererDataList[0].rendererFeatures)
            {
                if (f == null || !f.GetType().Name.Contains("AmbientOcclusion")) continue;
                if (paalla.HasValue) f.SetActive(paalla.Value);
                tulos += $"{f.name} {(f.isActive ? "päällä" : "pois")} ";
            }
            return "ssao: " + (tulos == "" ? "ei ominaisuutta" : tulos.Trim());
        }

        public static string Tila(string nimi) => (vaiheet.TryGetValue(nimi, out var v) ? (v.tila ?? $"{nimi}: ei vielä ajettu") + (v.matriisiTila != null ? ", " + v.matriisiTila : "") + (aktiiviset.ContainsKey(nimi) ? "" : " (pois)") : $"{nimi}: ei luotu") + ", " + (syvyysVaihe.tila ?? "syvyys: ei vielä");
    }
}
