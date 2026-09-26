using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using UnityEngine;
using UnityEngine.Experimental.Rendering;
using UnityEngine.Rendering;
using UnityEngine.Rendering.RenderGraphModule;
using UnityEngine.Rendering.RenderGraphModule.Util;
using UnityEngine.Rendering.Universal;

namespace Matkakirja
{
    /// <summary>
    /// ELÄVÄ KERROS (omistajan linjaus 26.9.2026 klo 10.0x: niukkuus ja sulava, elävä animointi; löydös 161 B). Kun kamera on
    /// paikallaan ja kartassa animoituu vain Elava-layerin kohteita (lippu, myöhemmin kynäviiva, hetket, maailmanpyörä,
    /// eläimet), kartta piirretään KERRAN ja vain animoidut kohteet 30 fps:llä talletettua väriä ja syvyyttä vasten. Kun
    /// mikään ei animoi, piirto seis (0 kehystä), ja kameran liike palauttaa täyden piirron heti.
    /// Rajapinta lukittu Linssisepän kanssa: proto-3d/lokit/elava-kerros-rajapinta.md.
    ///
    /// KÄYTTÖ: kohde layerille <see cref="Taso"/> (GameObject tai DrawMesh/RenderPrimitives layer-parametrilla), ja
    /// animaatio <see cref="Animoi"/>(käynnissä, nimi, fps, pohja) OnEnablessa ja <see cref="Poista"/> OnDisablessa.
    /// Liikkeessä ja kerroksessa sama varjostin ja renderQueue, joten siirtymä on saumaton. pohja = true: animaatio muuttaa
    /// itse karttaa (ElavaHerays), ja koko kartta piirretään fps:llä ajon ajan (PallonLepo). <see cref="Staattinen"/>
    /// (lämpö serious tai virransäästö): animoija jättää kohteen paikalleen, eikä kerros käynnisty.
    ///
    /// TILAT: TAYSI (kamera liikkuu, laatat tai UI muuttuvat, pohja-animaatio: pääkamera piirtää kaiken), KAAPPAUS (yksi
    /// kehys: pääkamera ilman Elava-layeria + kopio väristä ja syvyydestä ennen jälkikäsittelyä, ElavaKamera samassa
    /// kehyksessä perään), KERROS (pääkamera pois, ElavaKamera piirtää pohjan väri + SV_Depth -kopiona ja Elava-kohteet;
    /// bloom ja värikorjaus kerran kuten täydessä piirrossa). Ruudunpaivitys päättää tilan: KERROS vain PAIKALLAAN-tilan
    /// sijaan (pallo lepää, UI rauhassa), kun jokin kerroksen animaatio käy.
    /// Komennot: `pallo kerros tila|pois|paalle|pakota taysi|kerros|auto` (Komennot.cs), ja tila näkyy `pallo lepo` -rivillä.
    /// </summary>
    [DefaultExecutionOrder(10010)]   // Ruudunpaivityksen (10000) jälkeen: sen päätös tästä kehyksestä
    public sealed class ElavaKerros : MonoBehaviour
    {
        public const string TasoNimi = "Elava";
        public const int OletusFps = 30;

        public enum Lupa { Sallittu, Staattinen }
        public enum Tila { Taysi, Kaappaus, Kerros }
        public enum Pakotus { Auto, Taysi, Kerros }

        sealed class Animaatio { public Func<bool> kaynnissa; public string nimi; public int fps; public bool pohja; }

        static readonly List<Animaatio> animaatiot = new List<Animaatio>();
        static readonly HashSet<string> kaatuneet = new HashSet<string>();
        static ElavaKerros instanssi;
        static int taso = -2;
        static bool pyydetty;
        static int pyydettyFps = OletusFps;

        /// <summary>Kerros käytössä (komento `pallo kerros pois|paalle`). Pois = animaatiot piirtävät koko kartan (PallonLepo).</summary>
        public static bool Kaytossa = true;
        /// <summary>Mittauksiin: pakota tila (auto = Ruudunpaivitys päättää).</summary>
        public static Pakotus Pakota = Pakotus.Auto;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            animaatiot.Clear(); kaatuneet.Clear(); instanssi = null; taso = -2; pyydetty = false;
            Kaytossa = true; Pakota = Pakotus.Auto; pyydettyFps = OletusFps;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("ElavaKerros");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<ElavaKerros>();
            PallonLepo.Animoi(PohjaAnimoituu, "elävä pohja");
            PallonLepo.Animoi(TaysiVaralla, "elävä (täysi piirto)");
        }

        // ---- Rajapinta ----

        /// <summary>Unity-layer "Elava" (ProjectSettings/TagManager, layer 8). −1, jos puuttuu (kerros ei käytössä).</summary>
        public static int Taso => taso != -2 ? taso : (taso = LayerMask.NameToLayer(TasoNimi));

        /// <summary>Animaatiot staattisina: lämpö serious/critical tai virransäästö (Lampo.Kuuma). Kerros ei käynnisty.</summary>
        public static bool Staattinen => Lampo.Kuuma;

        /// <summary>Kerroksen nykyinen tila (TAYSI, KAAPPAUS, KERROS).</summary>
        public static Tila Nyt => instanssi != null ? instanssi.tila : Tila.Taysi;

        /// <summary>Pääkamera on kerroksen takia pois (PallonLepo: kamera katsotaan päällä olevaksi).</summary>
        public static bool KerrosPaalla => instanssi != null && instanssi.tila == Tila.Kerros;

        /// <summary>
        /// Rekisteröi animaation: <paramref name="kaynnissa"/> tosi, kun kohde muuttuu (pidä halpana). fps = tarvittu taajuus
        /// (kerroksen fps on käynnissä olevien suurin). pohja = animaatio muuttaa itse karttaa (koko kartta piirretään).
        /// Palauttaa <see cref="Lupa.Staattinen"/>, jos animaatiot ovat nyt staattisia (kysy myös <see cref="Staattinen"/>).
        /// </summary>
        public static Lupa Animoi(Func<bool> kaynnissa, string nimi, int fps = OletusFps, bool pohja = false)
        {
            if (kaynnissa == null) return Staattinen ? Lupa.Staattinen : Lupa.Sallittu;
            bool loytyi = false;
            foreach (var a in animaatiot) if (a.kaynnissa == kaynnissa) { a.nimi = nimi; a.fps = fps; a.pohja = pohja; loytyi = true; }
            if (!loytyi) animaatiot.Add(new Animaatio { kaynnissa = kaynnissa, nimi = string.IsNullOrEmpty(nimi) ? "?" : nimi, fps = Mathf.Clamp(fps, 1, 60), pohja = pohja });
            return Staattinen ? Lupa.Staattinen : Lupa.Sallittu;
        }

        /// <summary>Poistaa animaation (sama delegaatti kuin Animoi-kutsussa).</summary>
        public static void Poista(Func<bool> kaynnissa)
        {
            for (int i = animaatiot.Count - 1; i >= 0; i--) if (animaatiot[i].kaynnissa == kaynnissa) animaatiot.RemoveAt(i);
        }

        /// <summary>Pohja (kartta) muuttui kerran (reitti tai hehku valmis): uusi kaappaus muutaman kehyksen päästä.</summary>
        public static void PohjaMuuttui() => PallonLepo.Muuttui("elävä pohja");

        /// <summary>
        /// Ruudunpaivitys: PAIKALLAAN-tilassa, tarvitaanko kerros (jokin kerroksen animaatio käy ja kerros on käytettävissä).
        /// fps = käynnissä olevien suurin.
        /// </summary>
        public static bool Tarvitaan(out int fps)
        {
            fps = 0;
            if (Pakota == Pakotus.Taysi || !Kaytettavissa()) return false;
            bool jokin = Pakota == Pakotus.Kerros;
            foreach (var a in animaatiot)
                if (!a.pohja && Kysy(a)) { jokin = true; fps = Math.Max(fps, a.fps); }
            if (fps == 0) fps = OletusFps;
            return jokin;
        }

        /// <summary>Ruudunpaivitys kertoo tämän kehyksen päätöksen (LateUpdate 10000); ElavaKerros vaihtaa kamerat (10010).</summary>
        public static void Pyyda(bool kerros, int fps) { pyydetty = kerros; pyydettyFps = fps; }

        /// <summary>Tila lokiin (`pallo lepo`, `pallo kerros tila`).</summary>
        public static string Kuvaus()
        {
            var sb = new StringBuilder("elävä kerros ");
            sb.Append(Nyt.ToString().ToUpperInvariant());
            if (!Kaytossa) sb.Append(" (pois käytöstä)");
            else if (Taso < 0) sb.Append(" (layer ").Append(TasoNimi).Append(" puuttuu)");
            else if (instanssi != null && instanssi.materiaali == null) sb.Append(" (varjostin puuttuu)");
            if (Staattinen) sb.Append(" (staattinen: lämpö/virransäästö)");
            if (Pakota != Pakotus.Auto) sb.Append(" pakotettu ").Append(Pakota);
            sb.Append(", animoi:");
            int n = 0;
            foreach (var a in animaatiot)
                if (Kysy(a)) { sb.Append(' ').Append(a.nimi).Append(a.pohja ? "(pohja)" : "").Append('@').Append(a.fps); n++; }
            if (n == 0) sb.Append(" ei yhtään");
            if (instanssi != null)
            {
                sb.Append(", kaappauksia ").Append(instanssi.kaappauksia);
                if (instanssi.kaapattuAika > 0f)
                    sb.Append(" (viimeisin ").Append((Time.unscaledTime - instanssi.kaapattuAika).ToString("0.0", CultureInfo.InvariantCulture)).Append(" s sitten, ")
                      .Append(instanssi.vari != null ? instanssi.vari.width + "×" + instanssi.vari.height : "-").Append(')');
                sb.Append(", kerroskehyksiä ").Append(instanssi.kerrosKehyksia);
            }
            return sb.ToString();
        }

        // ---- PallonLepon ehdot ----

        static bool PohjaAnimoituu()
        {
            foreach (var a in animaatiot) if (a.pohja && Kysy(a)) return true;
            return false;
        }

        /// <summary>Kerros ei käytettävissä (pois, ei layeria, lämpö): kerroksen animaatiot piirtävät koko kartan kuten ennen.</summary>
        static bool TaysiVaralla()
        {
            if (Kaytettavissa() && Pakota != Pakotus.Taysi) return false;
            foreach (var a in animaatiot) if (!a.pohja && Kysy(a)) return true;
            return false;
        }

        static bool Kaytettavissa() =>
            Kaytossa && !Staattinen && Taso >= 0 && instanssi != null && instanssi.materiaali != null
            && !PalloKierto.PorttiSumea && !PalloKierto.KuvaSumea;

        static bool Kysy(Animaatio a)
        {
            try { return a.kaynnissa(); }
            catch (Exception ex)
            {
                if (kaatuneet.Add(a.nimi)) Debug.LogWarning("MATKAKIRJA elävä kerros: ehto " + a.nimi + " kaatui: " + ex.Message);
                return false;
            }
        }

        // ---- Kamerat ----

        Tila tila = Tila.Taysi;
        Camera paa, elava;
        PalloKierto kierto;
        int alkuMaski;
        Material materiaali;
        RenderTexture vari, syvyys;
        RTHandle variKahva, syvyysKahva;
        Kaappausvaihe kaappausvaihe;
        Pohjavaihe pohjavaihe;
        bool kaappausPyydetty, kaapattu, kytketty;
        int kaappauksia, kerrosKehyksia;
        float kaapattuAika;
        static readonly int SyvyysId = Shader.PropertyToID("_ElavaSyvyys");

        void Awake()
        {
            var s = Resources.Load<Shader>("ElavaKerros");
            if (s != null && s.isSupported) materiaali = new Material(s) { name = "ElavaKerros", hideFlags = HideFlags.HideAndDontSave };
            else Debug.LogWarning("MATKAKIRJA elävä kerros: varjostin puuttuu, kerros ei käytössä");
            kaappausvaihe = new Kaappausvaihe(this);
            pohjavaihe = new Pohjavaihe(this);
            RenderPipelineManager.beginCameraRendering += Ennen;
            kytketty = true;
        }

        void OnDestroy()
        {
            if (kytketty) RenderPipelineManager.beginCameraRendering -= Ennen;
            Palauta();
            variKahva?.Release(); syvyysKahva?.Release();
            if (vari != null) { vari.Release(); Destroy(vari); }
            if (syvyys != null) { syvyys.Release(); Destroy(syvyys); }
            if (materiaali != null) Destroy(materiaali);
            if (instanssi == this) instanssi = null;
        }

        void LateUpdate()
        {
            bool halu = pyydetty && Kaytettavissa();
            pyydetty = false;
            if (paa == null) Etsi();
            if (paa == null || Taso < 0) { tila = Tila.Taysi; return; }
            if (!halu) { if (tila != Tila.Taysi) Palauta(); return; }

            if (tila == Tila.Taysi)
            {
                // Kaappaus tässä kehyksessä: pääkamera ilman Elava-layeria, ElavaKamera piirtää perään.
                alkuMaski = paa.cullingMask;
                paa.cullingMask = alkuMaski & ~(1 << Taso);
                kaappausPyydetty = true;
                kaapattu = false;
                AsetaElava();
                elava.enabled = true;
                tila = Tila.Kaappaus;
            }
            else if (tila == Tila.Kaappaus)
            {
                if (kaapattu)
                {
                    paa.enabled = false;
                    paa.cullingMask = alkuMaski;
                    tila = Tila.Kerros;
                }
                else kaappausPyydetty = true;   // edellinen kehys ei ehtinyt (esim. piirto ohitettiin): uudelleen
            }
            if (elava != null)
            {
                // Sama näkymä kuin pääkameralla (lapsi: paikka ja asento samat; projektio kopioidaan).
                if (elava.fieldOfView != paa.fieldOfView) elava.fieldOfView = paa.fieldOfView;
                if (elava.nearClipPlane != paa.nearClipPlane) elava.nearClipPlane = paa.nearClipPlane;
                if (elava.farClipPlane != paa.farClipPlane) elava.farClipPlane = paa.farClipPlane;
            }
            if (tila == Tila.Kerros) kerrosKehyksia++;
        }

        void Etsi()
        {
            kierto = FindAnyObjectByType<PalloKierto>();
            paa = kierto != null ? kierto.GetComponent<Camera>() : null;
        }

        void AsetaElava()
        {
            if (elava == null)
            {
                var go = new GameObject("ElavaKamera");
                go.transform.SetParent(paa.transform, false);
                elava = go.AddComponent<Camera>();
                elava.enabled = false;
            }
            elava.CopyFrom(paa);
            elava.cullingMask = 1 << Taso;
            elava.depth = paa.depth + 1;
            elava.clearFlags = CameraClearFlags.SolidColor;
            elava.targetTexture = null;
            elava.transform.localPosition = Vector3.zero;
            elava.transform.localRotation = Quaternion.identity;
            var a = paa.GetUniversalAdditionalCameraData();
            var b = elava.GetUniversalAdditionalCameraData();
            if (a != null && b != null)
            {
                b.renderType = CameraRenderType.Base;
                b.renderPostProcessing = a.renderPostProcessing;
                b.volumeLayerMask = a.volumeLayerMask;
                b.volumeTrigger = a.volumeTrigger != null ? a.volumeTrigger : paa.transform;
                b.antialiasing = a.antialiasing;
                b.antialiasingQuality = a.antialiasingQuality;
                b.dithering = a.dithering;
                b.stopNaN = a.stopNaN;
                b.renderShadows = false;
                b.requiresDepthTexture = false;
                b.requiresColorTexture = false;
            }
        }

        /// <summary>Takaisin täyteen piirtoon: pääkamera päälle (ellei peitto), maski ennalleen, ElavaKamera pois.</summary>
        void Palauta()
        {
            if (paa != null)
            {
                if (tila != Tila.Taysi) paa.cullingMask = alkuMaski;
                if (tila == Tila.Kerros) paa.enabled = !(kierto != null && kierto.Peitetty);
            }
            if (elava != null) elava.enabled = false;
            kaappausPyydetty = false;
            tila = Tila.Taysi;
        }

        void Ennen(ScriptableRenderContext _, Camera c)
        {
            if (materiaali == null) return;
            if (c == paa && kaappausPyydetty) c.GetUniversalAdditionalCameraData()?.scriptableRenderer?.EnqueuePass(kaappausvaihe);
            else if (c == elava && elava != null && vari != null) c.GetUniversalAdditionalCameraData()?.scriptableRenderer?.EnqueuePass(pohjavaihe);
        }

        void Varmista(int w, int h, GraphicsFormat muoto)
        {
            if (vari != null && vari.width == w && vari.height == h && vari.graphicsFormat == muoto) return;
            variKahva?.Release(); syvyysKahva?.Release();
            if (vari != null) { vari.Release(); Destroy(vari); }
            if (syvyys != null) { syvyys.Release(); Destroy(syvyys); }
            vari = new RenderTexture(w, h, muoto, GraphicsFormat.None) { name = "Matkakirja elävä pohja", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp };
            syvyys = new RenderTexture(w, h, GraphicsFormat.R32_SFloat, GraphicsFormat.None) { name = "Matkakirja elävä syvyys", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp };
            vari.Create(); syvyys.Create();
            variKahva = RTHandles.Alloc(vari);
            syvyysKahva = RTHandles.Alloc(syvyys);
            materiaali.SetTexture(SyvyysId, syvyys);
        }

        /// <summary>Pääkameran väri ja syvyys ennen jälkikäsittelyä (läpinäkyvien jälkeen) talteen.</summary>
        sealed class Kaappausvaihe : ScriptableRenderPass
        {
            readonly ElavaKerros k;
            public Kaappausvaihe(ElavaKerros k)
            {
                this.k = k;
                renderPassEvent = RenderPassEvent.AfterRenderingTransparents;
                requiresIntermediateTexture = true;
            }

            public override void RecordRenderGraph(RenderGraph renderGraph, ContextContainer frameData)
            {
                var r = frameData.Get<UniversalResourceData>();
                if (!k.kaappausPyydetty || r.isActiveTargetBackBuffer) return;
                var kuvaus = renderGraph.GetTextureDesc(r.activeColorTexture);
                k.Varmista(Mathf.Max(1, kuvaus.width), Mathf.Max(1, kuvaus.height), kuvaus.colorFormat);
                var vari = renderGraph.ImportTexture(k.variKahva);
                var syv = renderGraph.ImportTexture(k.syvyysKahva);
                renderGraph.AddBlitPass(r.activeColorTexture, vari, Vector2.one, Vector2.zero, passName: "Matkakirja elävä kaappaus väri");
                renderGraph.AddBlitPass(new RenderGraphUtils.BlitMaterialParameters(r.activeDepthTexture, syv, k.materiaali, 0), "Matkakirja elävä kaappaus syvyys");
                k.kaappausPyydetty = false;
                k.kaapattu = true;
                k.kaappauksia++;
                k.kaapattuAika = Time.unscaledTime;
            }
        }

        /// <summary>ElavaKameran alussa: talletettu väri kohteeseen ja syvyys SV_Depthinä (Elava-kohteet testaavat sitä).</summary>
        sealed class Pohjavaihe : ScriptableRenderPass
        {
            readonly ElavaKerros k;
            sealed class Data { public TextureHandle vari; public Material materiaali; }

            public Pohjavaihe(ElavaKerros k)
            {
                this.k = k;
                renderPassEvent = RenderPassEvent.BeforeRenderingOpaques;
                requiresIntermediateTexture = true;
            }

            public override void RecordRenderGraph(RenderGraph renderGraph, ContextContainer frameData)
            {
                var r = frameData.Get<UniversalResourceData>();
                if (k.variKahva == null || r.isActiveTargetBackBuffer) return;
                using (var b = renderGraph.AddRasterRenderPass<Data>("Matkakirja elävä pohja", out var d))
                {
                    d.vari = renderGraph.ImportTexture(k.variKahva);
                    d.materiaali = k.materiaali;
                    b.UseTexture(d.vari);
                    b.UseTexture(renderGraph.ImportTexture(k.syvyysKahva));
                    b.SetRenderAttachment(r.activeColorTexture, 0, AccessFlags.Write);
                    b.SetRenderAttachmentDepth(r.activeDepthTexture, AccessFlags.Write);
                    b.SetRenderFunc((Data dd, RasterGraphContext ctx) =>
                        Blitter.BlitTexture(ctx.cmd, dd.vari, new Vector4(1, 1, 0, 0), dd.materiaali, 1));
                }
            }
        }
    }
}
