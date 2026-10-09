// KAUPUNGIN KOKO RUUDUN PASSI (Linssiseppä 9.10.2026; yövalojen juurisyy omilla simudiagnooseilla): FullScreenPassRendererFeature ajoi
// yövalot ja muotokorostuksen kamerapinon päällyskameroille, joiden syvyys on tyhjä, eikä peruskameran tulosta jäänyt näkyviin. Tämä passi
// lisätään vain kaupungin peruskameralle (beginCameraRendering, kuten PalloSumennus) ennen jälkikäsittelyä: värikopio → materiaali
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
            sealed class Data { public TextureHandle lahde; public Material materiaali; }
            static readonly MaterialPropertyBlock lohko = new MaterialPropertyBlock();
            static readonly int IdBlit = Shader.PropertyToID("_BlitTexture"), IdSkaala = Shader.PropertyToID("_BlitScaleBias");

            public Vaihe(string n)
            {
                nimi = n;
                renderPassEvent = RenderPassEvent.BeforeRenderingPostProcessing;
                requiresIntermediateTexture = true;
                ConfigureInput(ScriptableRenderPassInput.Depth);
                profilingSampler = new ProfilingSampler(n);
            }

            public override void RecordRenderGraph(RenderGraph rg, ContextContainer frameData)
            {
                var res = frameData.Get<UniversalResourceData>();
                var cam = frameData.Get<UniversalCameraData>();
                tila = $"{nimi}: {cam.camera.name}, takapuskuri {res.isActiveTargetBackBuffer}, syvyys {res.cameraDepthTexture.IsValid()}";
                if (materiaali == null || res.isActiveTargetBackBuffer) return;
                var kuvaus = rg.GetTextureDesc(res.activeColorTexture);
                kuvaus.name = "Matkakirja " + nimi + " kopio"; kuvaus.clearBuffer = false; kuvaus.msaaSamples = MSAASamples.None;
                var kopio = rg.CreateTexture(kuvaus);
                rg.AddBlitPass(res.activeColorTexture, kopio, Vector2.one, Vector2.zero, passName: "Matkakirja " + nimi + " kopio");
                using (var b = rg.AddRasterRenderPass<Data>("Matkakirja " + nimi, out var d, profilingSampler))
                {
                    d.lahde = kopio; d.materiaali = materiaali;
                    b.UseTexture(kopio, AccessFlags.Read);
                    if (res.cameraDepthTexture.IsValid()) b.UseTexture(res.cameraDepthTexture, AccessFlags.Read);
                    b.UseAllGlobalTextures(true);
                    b.AllowPassCulling(false);   // 9.10. simu: passi kirjattiin peruskameralle (syvyys ok), mutta tulos ei näkynyt → ei karsintaa
                    b.SetRenderAttachment(res.activeColorTexture, 0, AccessFlags.Write);
                    b.SetRenderFunc((Data x, RasterGraphContext c) =>
                    {
                        lohko.Clear(); lohko.SetTexture(IdBlit, x.lahde); lohko.SetVector(IdSkaala, new Vector4(1, 1, 0, 0));
                        c.cmd.DrawProcedural(Matrix4x4.identity, x.materiaali, 0, MeshTopology.Triangles, 3, 1, lohko);
                    });
                }
            }
            public string tila;
        }

        static readonly Dictionary<string, Vaihe> vaiheet = new Dictionary<string, Vaihe>();
        static readonly Dictionary<string, Vaihe> aktiiviset = new Dictionary<string, Vaihe>();
        /// <summary>Kaupungin peruskamera (KaupunkiYovalot.Paivita asettaa joka kehys).</summary>
        public static Camera Kamera;
        static bool kytketty;

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
            foreach (var v in aktiiviset.Values) r.EnqueuePass(v);
        }

        public static string Tila(string nimi) => vaiheet.TryGetValue(nimi, out var v) ? (v.tila ?? $"{nimi}: ei vielä ajettu") + (aktiiviset.ContainsKey(nimi) ? "" : " (pois)") : $"{nimi}: ei luotu";
    }
}
