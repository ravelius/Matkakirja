using UnityEngine;
using UnityEngine.Experimental.Rendering;
using UnityEngine.Rendering;
using UnityEngine.Rendering.RenderGraphModule;
using UnityEngine.Rendering.RenderGraphModule.Util;
using UnityEngine.Rendering.Universal;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSPORTIN SUMENNUS (omistajan löydös 17, build 6; web .start-gate backdrop-filter: blur(6px)).
    ///
    /// Keino: URP:n renderScale lasketaan portin ajaksi (pallo piirretään pieneen kuvaan), ja
    /// pienennetyn kuvan päälle ajetaan erotettava Gauss (Shaders/Sumennus.shader, σ ≈ 2,94
    /// tekseliä) ennen kuin URP skaalaa kuvan ruudulle bilineaarisesti. Tekselin koko valitaan
    /// niin, että kokonaishajonta on <see cref="sumennusPt"/> × Pistekerroin laitepikseliä
    /// (CSS:n blur(6px) on Gaussin keskihajonta 6 px = 6 pt). iPad (2×): renderScale 0,25,
    /// iPhone (3×): 0,17 — piirto on 6 % tai 3 % koko ruudun pikseleistä, joten portti on
    /// halvempi kuin pelinäkymä (web: "efekti ei saa viedä etusivulla tehoja").
    ///
    /// Pelkkä renderScale ei riitä: URP:n alaraja on 0,1, ja bilineaarinen suurennus antaa
    /// siitä vain σ ≈ 0,5 tekseliä (iPadilla 2,5 pt, kolmannes webistä) ja kulmikkaan
    /// ristikuvion. Automaattinen suodin (Auto) valitsisi kokonaislukusuhteella pistenäytteen,
    /// joten portin ajaksi suodin on Linear.
    ///
    /// UI Toolkit ei sumene: URP piirtää ruudun UI:n (overlay) takapuskuriin vasta
    /// loppuskaalauksen jälkeen täydellä resoluutiolla, ja tämä vaihe koskee vain kameran kuvaa.
    ///
    /// KAAPPAUS (löydös 132): <see cref="PyydaKaappaus"/> kopioi seuraavan piirretyn kehyksen sumennetun kuvan pieneen
    /// RenderTextureen (<see cref="Kaappaus"/>) jälkikäsittelyn jälkeen (Filmipinon sävykartoitus ja bloom mukana),
    /// jotta kokoruudun kuvan ajaksi pallon kamera voidaan sammuttaa ja UI näyttää pysäytyskuvan. Kuva on pienen
    /// kuvan kokoinen (renderScale), joten muistia kuluu vähän; se on valmiiksi sumea, joten skaalaus ei näy.
    /// </summary>
    sealed class PalloSumennus
    {
        /// <summary>Webin blur(6px): keskihajonta pisteinä (iOS point = CSS px).</summary>
        public float sumennusPt = 6f;
        /// <summary>Kokonaishajonta pienen kuvan tekseleinä: Gauss 2,94 ja piirto + bilineaarinen suurennus ≈ 0,5.</summary>
        const float TekselinHajonta = 2.98f;

        readonly Camera kamera;
        readonly Material materiaali;
        readonly Vaihe vaihe;
        readonly Kaappausvaihe kaappausvaihe;
        UniversalRenderPipelineAsset asetus;
        float alkuperainenSkaala = -1f;
        UpscalingFilterSelection alkuperainenSuodin;
        bool kytketty;

        /// <summary>Häivytysosuus 0–1 (0 = ei sumennusta, mutta pieni kuva yhä käytössä).</summary>
        public float Osuus { get => vaihe.osuus; set => vaihe.osuus = Mathf.Clamp01(value); }
        public bool Paalla { get; private set; }
        /// <summary>Portin renderScale (laitetestaajan mittaus lokista).</summary>
        public float Skaala { get; private set; } = 1f;

        public PalloSumennus(Camera kamera, Material materiaali)
        {
            this.kamera = kamera;
            this.materiaali = materiaali;
            vaihe = new Vaihe { materiaali = materiaali };
            kaappausvaihe = new Kaappausvaihe();
        }

        /// <summary>Kaapattu sumea kuva (null ennen ensimmäistä kaappausta ja <see cref="VapautaKaappaus"/>-kutsun jälkeen).</summary>
        public RenderTexture Kaappaus => kaappausvaihe.kuva;
        /// <summary>Pyydetty kaappaus on kirjattu piirtoon (kuva on käytettävissä tästä kehyksestä alkaen).</summary>
        public bool Kaapattu => kaappausvaihe.kaapattu;

        /// <summary>Kopioi seuraavan piirretyn kehyksen kuvan <see cref="Kaappaus"/>-tekstuuriin (kerran).</summary>
        public void PyydaKaappaus()
        {
            kaappausvaihe.kaapattu = false;
            kaappausvaihe.pyydetty = true;
            if (!kytketty) { RenderPipelineManager.beginCameraRendering += Ennen; kytketty = true; }
        }

        /// <summary>Pyyntö pois ja tekstuuri vapaaksi (UI on jo irrottanut sen).</summary>
        public void VapautaKaappaus()
        {
            kaappausvaihe.pyydetty = false;
            kaappausvaihe.kaapattu = false;
            kaappausvaihe.Vapauta();
        }

        /// <summary>
        /// Lämmön perusskaala (Ruudunpaivitys: 0,7 kuumana, muuten null): Palauta palauttaa tähän eikä tallennettuun
        /// arvoon, koska lämpötaso voi vaihtua sumennuksen aikana (Natiiviseppä 25.9.). null = tallennettu arvo.
        /// </summary>
        public static float? PerusSkaala;

        /// <summary>Pieni kuva ja sumennusvaihe päälle (true) tai alkuperäinen renderScale takaisin (false).</summary>
        public void Aseta(bool paalla)
        {
            if (paalla == Paalla) return;
            Paalla = paalla;
            asetus ??= GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            if (paalla)
            {
                float kerroin = PalloKierto.Pistekerroin;
                // Ilman materiaalia (kohtaus rakennettu ennen Sumennus.shaderia) jää vain pieni kuva.
                Skaala = materiaali != null
                    ? Mathf.Clamp(TekselinHajonta / (sumennusPt * kerroin), UniversalRenderPipeline.minRenderScale, 1f)
                    : UniversalRenderPipeline.minRenderScale;
                if (asetus != null)
                {
                    alkuperainenSkaala = asetus.renderScale;
                    alkuperainenSuodin = asetus.upscalingFilter;
                    asetus.renderScale = Skaala;
                    asetus.upscalingFilter = UpscalingFilterSelection.Linear;
                }
                if (!kytketty && materiaali != null) { RenderPipelineManager.beginCameraRendering += Ennen; kytketty = true; }
                Debug.Log($"MATKAKIRJA pallo: aloitusportin sumennus {sumennusPt:0.#} pt (renderScale {Skaala:0.###}, " +
                          $"Gauss {(materiaali != null ? "päällä" : "puuttuu: vain pieni kuva")}, pistekerroin {kerroin:0})");
            }
            else
            {
                Palauta();
                Debug.Log("MATKAKIRJA pallo: aloitusportin sumennus pois");
            }
        }

        /// <summary>Alkuperäinen renderScale ja suodin takaisin (myös OnDisable: editorissa asetus on tiedosto).</summary>
        public void Palauta()
        {
            Paalla = false;
            kaappausvaihe.pyydetty = false;
            if (kytketty) { RenderPipelineManager.beginCameraRendering -= Ennen; kytketty = false; }
            if (asetus != null && alkuperainenSkaala > 0f)
            {
                asetus.renderScale = PerusSkaala ?? alkuperainenSkaala;
                asetus.upscalingFilter = alkuperainenSuodin;
            }
            alkuperainenSkaala = -1f;
            Skaala = 1f;
        }

        void Ennen(ScriptableRenderContext _, Camera c)
        {
            if (c != kamera) return;
            var data = c.GetUniversalAdditionalCameraData();
            if (Paalla && vaihe.osuus > 0f) data?.scriptableRenderer?.EnqueuePass(vaihe);
            if (kaappausvaihe.pyydetty) data?.scriptableRenderer?.EnqueuePass(kaappausvaihe);
        }

        /// <summary>
        /// Jälkikäsittelyn jälkeinen kopio pieneen sRGB-tekstuuriin (lineaarinen väriavaruus: kirjoitus koodaa, UI:n
        /// näytteistys purkaa). Jos kuva menee jo suoraan takapuskuriin (ei välikuvaa), yritetään seuraavassa kehyksessä.
        /// </summary>
        sealed class Kaappausvaihe : ScriptableRenderPass
        {
            public bool pyydetty, kaapattu;
            public RenderTexture kuva;
            RTHandle kahva;

            public Kaappausvaihe()
            {
                renderPassEvent = RenderPassEvent.AfterRenderingPostProcessing;
                requiresIntermediateTexture = true;
            }

            public override void RecordRenderGraph(RenderGraph renderGraph, ContextContainer frameData)
            {
                var resurssit = frameData.Get<UniversalResourceData>();
                if (!pyydetty || resurssit.isActiveTargetBackBuffer) return;
                var kuvaus = frameData.Get<UniversalCameraData>().cameraTargetDescriptor;
                int w = Mathf.Max(1, kuvaus.width), h = Mathf.Max(1, kuvaus.height);
                if (kuva == null || kuva.width != w || kuva.height != h)
                {
                    Vapauta();
                    kuva = new RenderTexture(w, h, GraphicsFormat.R8G8B8A8_SRGB, GraphicsFormat.None)
                        { name = "Matkakirja pysäytyskuva", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
                    kuva.Create();
                    kahva = RTHandles.Alloc(kuva);
                }
                var kohde = renderGraph.ImportTexture(kahva);
                renderGraph.AddBlitPass(resurssit.activeColorTexture, kohde, Vector2.one, Vector2.zero, passName: "Matkakirja pysäytyskuva");
                pyydetty = false;
                kaapattu = true;
                Debug.Log($"MATKAKIRJA pallo: pysäytyskuva kaapattu {w}×{h}");
            }

            public void Vapauta()
            {
                kahva?.Release();
                kahva = null;
                if (kuva != null) { kuva.Release(); Object.Destroy(kuva); }
                kuva = null;
            }
        }

        sealed class Vaihe : ScriptableRenderPass
        {
            public Material materiaali;
            public float osuus;
            static readonly int Askel = Shader.PropertyToID("_Askel");

            public Vaihe()
            {
                renderPassEvent = RenderPassEvent.BeforeRenderingPostProcessing;
                requiresIntermediateTexture = true;
            }

            public override void RecordRenderGraph(RenderGraph renderGraph, ContextContainer frameData)
            {
                var resurssit = frameData.Get<UniversalResourceData>();
                if (materiaali == null || resurssit.isActiveTargetBackBuffer) return;
                var kuvaus = frameData.Get<UniversalCameraData>().cameraTargetDescriptor;
                kuvaus.depthBufferBits = 0;
                kuvaus.msaaSamples = 1;
                var lahde = resurssit.activeColorTexture;
                var vali = UniversalRenderer.CreateRenderGraphTexture(renderGraph, kuvaus, "Matkakirja sumennus", false, FilterMode.Bilinear);
                materiaali.SetVector(Askel, new Vector4(osuus / Mathf.Max(1, kuvaus.width), osuus / Mathf.Max(1, kuvaus.height), 0, 0));
                renderGraph.AddBlitPass(new RenderGraphUtils.BlitMaterialParameters(lahde, vali, materiaali, 0), "Matkakirja sumennus vaaka");
                renderGraph.AddBlitPass(new RenderGraphUtils.BlitMaterialParameters(vali, lahde, materiaali, 1), "Matkakirja sumennus pysty");
            }
        }
    }
}
