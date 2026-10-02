// LINNAN YMPÄRISTÖ JA JÄRVI (Olavinlinna, Siirtoseppä 1.10.2026; omistajan hyväksymä ympäristösuunnitelma, Päätoimittajan
// tilaus: vesi on linnan kriittisellä polulla). Linnanrakentajan aineisto (MML, CC BY 4.0): Kyrönsalmen rannat 4 × 4 km
// laatutasoittain (glb + ortokuva), puut laserkeilauksen latvoista korttipareina, 20 km:n horisonttirengas ja veden
// syvyyskartta. Koordinaatit kuten kuoressa (DioraamaGlb.Lue(…, true); Blender x itä → Unity x, Blender y pohjoinen → Unity z).
//
// JÄRVI: Boat Attack -vesijärjestelmän (Unity Companion License) porttaus, ks. DioraamaVesi.shader. Planaariheijastus
// (Boat Attack PlanarReflections.cs, Unity 6: RenderSingleCamera → RenderPipeline.SubmitRenderRequest): peilattu kamera
// piirtää näyttämön kerroksen ennen pääkameraa omaan kuvaansa (vesi piilossa, vino leikkaustaso vedenpintaan,
// GL.invertCulling). Resoluutio laatutason mukaan: huippu ½, normaali ⅓, kevyt ei heijastusta (taivaan liukuma).
//
// Budjetti (Linnanrakentajalle 1.10.): ympäristö kevyt 50k / normaali 150k / huippu 400k kolmiota, puut yhtenä meshinä.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaYmparisto
    {
        /// <summary>Ympäristö ladattu (DioraamaNayttamo: kauempi kaukotaso ja ilmaperspektiivin sumu).</summary>
        public static bool Kaytossa { get; private set; }
        /// <summary>Kehittäjä: "poikki vesi heijastus 0|1" (null = laatutason mukaan).</summary>
        public static bool? HeijastusPakotettu;

        static readonly int IdAallot = Shader.PropertyToID("_VesiAallot"), IdParam = Shader.PropertyToID("_VesiParam"),
            IdSyvyysParam = Shader.PropertyToID("_SyvyysParam"), IdMata = Shader.PropertyToID("_VesiMata"),
            IdSyva = Shader.PropertyToID("_VesiSyva"), IdTaivasYla = Shader.PropertyToID("_VesiTaivasYla"),
            IdTaivasAla = Shader.PropertyToID("_VesiTaivasAla"), IdAurinko = Shader.PropertyToID("_VesiAurinko"),
            IdHeijastus = Shader.PropertyToID("_VesiHeijastus"), IdKuva = Shader.PropertyToID("_Kuva"),
            IdPinta = Shader.PropertyToID("_Pinta"), IdSyvyys = Shader.PropertyToID("_Syvyys"),
            IdHehku = Shader.PropertyToID("_VesiHehku"), IdKiiltoSuunta = Shader.PropertyToID("_VesiKiiltoSuunta"),
            IdTaivasHorisontti = Shader.PropertyToID("_TaivasHorisontti"), IdTaivasLaki = Shader.PropertyToID("_TaivasLaki"),
            IdTaivasKajo = Shader.PropertyToID("_TaivasKajo"), IdTaivasAurinko = Shader.PropertyToID("_TaivasAurinko"),
            IdTaivasParam = Shader.PropertyToID("_TaivasParam"), IdTaivasKuva = Shader.PropertyToID("_TaivasKuva");

        // Järven aallot (amplitudi m, suunta °, aallonpituus m): tyyni Saimaa, lounaistuuli.
        static readonly Vector4[] Aallot =
        {
            new Vector4(0.030f, 200f, 2.2f, 0), new Vector4(0.025f, 232f, 3.1f, 0),
            new Vector4(0.040f, 188f, 5.3f, 0), new Vector4(0.018f, 255f, 1.4f, 0),
        };

        readonly Transform juuri;
        GameObject go, vesiGo, taivasGo;
        Material taivasMat;
        float taivasSuunta;
        Renderer vesiRenderer;
        Material vesiMat;
        Camera heijastusKamera;
        RenderTexture heijastusKuva;
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        int kerta;
        float vesiY;

        public string Tila { get; private set; } = "ei ladattu";

        public DioraamaYmparisto(Transform juuri) { this.juuri = juuri; }

        public IEnumerator Lataa(Ymparisto y, float vesiTaso, Func<string, string> url, Action<string> kirjaa, Func<bool> kuoriValmis = null)
        {
            Tyhjenna();
            if (y == null) yield break;
            int oma = ++kerta;
            Kaytossa = true;
            vesiY = vesiTaso;
            go = new GameObject("Ymparisto") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            float alku = Time.realtimeSinceStartup;
            LuoVesi();
            LuoTaivas();
            var taso = DioraamaUlkokuori.Valittu;
            // Linna ensin (1.10. mittaus: ympäristön lataukset kilpailivat kuoren kanssa, kuoren kevyt taso 11 → 23 s):
            // järvi ja taivaskupoli ovat heti, mutta ympäristön tiedostot haetaan vasta kun kuoren kevyt taso on valmis
            // (enintään 25 s odotus).
            if (kuoriValmis != null)
            {
                float odotus = Time.realtimeSinceStartup;
                while (!kuoriValmis() && Time.realtimeSinceStartup - odotus < 25f) { if (oma != kerta) yield break; yield return null; }
                kirjaa?.Invoke($"poikki: ympäristö: kuori valmis, lataus alkaa {Time.realtimeSinceStartup - alku:F1} s");
            }
            bool hamaraTaivas = DioraamaValot.TunnelmaTaivas < 0.99f && !string.IsNullOrEmpty(y.TaivasHamara);
            string taivasKuva = hamaraTaivas ? y.TaivasHamara : y.Taivas;
            string taivasAstc = hamaraTaivas ? y.TaivasHamaraAstc : y.TaivasAstc;
            if (!string.IsNullOrEmpty(taivasKuva)) yield return LataaTaivas(taivasKuva, (float)y.TaivasSuunta, url, kirjaa, oma, taivasAstc);
            if (oma != kerta) yield break;
            Tila = "vesi";

            if (!string.IsNullOrEmpty(y.SyvyysKuva)) yield return LataaSyvyys(y, url, kirjaa, oma);
            if (oma != kerta) yield break;

            // NOPEA ENSILATAUS (Päätoimittaja 1.10.: TF 91 huippu 93 s ennen kuin maastoa näkyi): ensin kevyt maasto glb:n omalla
            // 2k-kuvalla (≈ 2 Mt, ei erillistä ortoa), sitten horisontti, puut ja aluskasvit, ja lopuksi laitteen oma taso
            // taustalla; se korvaa kevyen vasta valmiina. Puhelimessa huipputason orto on 4k (ruudulla ei eroa 8k:hon,
            // lataus ~22 Mt vs ~90 Mt); iPad ja Mac ennallaan 8k.
            string maasto = taso == DioraamaUlkokuori.Laatu.Huippu ? y.Huippu : taso == DioraamaUlkokuori.Laatu.Normaali ? y.Normaali : y.Kevyt;
            bool puhelin = SystemInfo.deviceModel != null && SystemInfo.deviceModel.StartsWith("iPhone");
            string orto = taso == DioraamaUlkokuori.Laatu.Huippu ? (puhelin && !string.IsNullOrEmpty(y.OrtoNormaali) ? y.OrtoNormaali : y.OrtoHuippu)
                : taso == DioraamaUlkokuori.Laatu.Normaali ? y.OrtoNormaali : y.OrtoKevyt;
            var esikatselu = new List<UnityEngine.Object>();
            bool porrastus = taso != DioraamaUlkokuori.Laatu.Kevyt && !string.IsNullOrEmpty(y.Kevyt) && y.Kevyt != maasto;
            // Ensilataus v2: esikatselun kuva kevyen tason ASTC-ortosta (ei runtime-pakkausta); tukematon → glb:n kuva.
            string esiOrto = y.OrtoKevyt != null && y.OrtoKevyt.EndsWith(".astcm", StringComparison.OrdinalIgnoreCase) ? y.OrtoKevyt : null;
            if (porrastus) yield return LataaMalli("maasto-esikatselu", y.Kevyt, esiOrto, url, kirjaa, oma, null, DioraamaUlkokuori.Laatu.Kevyt, esikatselu);
            else if (!string.IsNullOrEmpty(maasto)) yield return LataaMalli("maasto", maasto, orto, url, kirjaa, oma, y.Maasto, taso);
            if (oma != kerta) yield break;
            kirjaa?.Invoke($"poikki: ympäristö: ensimmäinen maasto näkyvissä {Time.realtimeSinceStartup - alku:F1} s");
            if (!string.IsNullOrEmpty(y.Horisontti)) yield return LataaMalli("horisontti", y.Horisontti, y.HorisonttiKuva, url, kirjaa, oma, astc: y.HorisonttiKuvaAstc);
            if (oma != kerta) yield break;
            if (!string.IsNullOrEmpty(y.Puut) && !string.IsNullOrEmpty(y.PuukortitTiedot ?? y.Puukortit)) yield return LataaPuut(y, taso, url, kirjaa, oma);
            if (oma != kerta) yield break;
            yield return DioraamaAluskasvit.Lataa(y, taso, url, kirjaa, go.transform, luodut, () => oma == kerta);   // Linssiseppä 2, 1.10.
            if (oma != kerta) yield break;
            if (porrastus && !string.IsNullOrEmpty(maasto))
            {
                yield return LataaMalli("maasto", maasto, orto, url, kirjaa, oma, y.Maasto, taso);
                if (oma != kerta) yield break;
                foreach (var o in esikatselu) { luodut.Remove(o); if (o != null) UnityEngine.Object.Destroy(o); }
                kirjaa?.Invoke($"poikki: ympäristö: maasto {taso} korvasi esikatselun {Time.realtimeSinceStartup - alku:F1} s");
            }
            Tila = $"valmis ({taso}, heijastus {HeijastusSkaala(taso):F2})";
            kirjaa?.Invoke($"poikki: ympäristö valmis ({taso}, {Time.realtimeSinceStartup - alku:F1} s)");
        }

        // --- JÄRVI ----------------------------------------------------------------------------------------------------

        void LuoVesi()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaVesi");
            if (varjostin == null) return;
            vesiMat = new Material(varjostin) { name = "Ymparisto:vesi" };
            luodut.Add(vesiMat);
            var pinta = Resources.Load<TextAsset>("Dioraama/VesiPinta");
            if (pinta != null)
            {
                var t = new Texture2D(2, 2, TextureFormat.RGBA32, true, true) { name = "VesiPinta", wrapMode = TextureWrapMode.Repeat, filterMode = FilterMode.Trilinear, anisoLevel = 2 };
                if (t.LoadImage(pinta.bytes, false)) { t.Apply(true, true); vesiMat.SetTexture(IdPinta, t); luodut.Add(t); }
                else UnityEngine.Object.Destroy(t);
            }
            Shader.SetGlobalVectorArray(IdAallot, Aallot);
            Shader.SetGlobalVector(IdSyvyysParam, Vector4.zero);
            // Tumma järvi (Saimaan ruskehtava vesi): runko vain varjoissa, pinta peilaa taivasta.
            Shader.SetGlobalColor(IdMata, new Color(0.11f, 0.12f, 0.10f));
            Shader.SetGlobalColor(IdSyva, new Color(0.035f, 0.055f, 0.065f));
            Shader.SetGlobalColor(IdTaivasYla, new Color(0.56f, 0.64f, 0.74f));
            Shader.SetGlobalColor(IdTaivasAla, DioraamaNayttamo.TaustaVari);
            Shader.SetGlobalColor(IdAurinko, new Color(1f, 0.85f, 0.62f));

            const float R = 10000f;
            var m = new Mesh { name = "Ymparisto:vesi" };
            m.SetVertices(new[] { new Vector3(-R, vesiY, -R), new Vector3(-R, vesiY, R), new Vector3(R, vesiY, R), new Vector3(R, vesiY, -R) });
            m.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
            m.bounds = new Bounds(new Vector3(0, vesiY, 0), new Vector3(2 * R, 1, 2 * R));
            luodut.Add(m);
            vesiGo = new GameObject("Ymparisto:vesi") { layer = DioraamaNayttamo.Kerros };
            vesiGo.transform.SetParent(go.transform, false);
            vesiGo.AddComponent<MeshFilter>().sharedMesh = m;
            var r = vesiGo.AddComponent<MeshRenderer>();
            r.sharedMaterial = vesiMat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            vesiRenderer = r;
        }

        IEnumerator LataaSyvyys(Ymparisto y, Func<string, string> url, Action<string> kirjaa, int oma)
        {
            byte[] tavut = null;
            yield return DioraamaLevyvalimuisti.Hae(url(y.SyvyysKuva), 60, t => tavut = t);
            if (oma != kerta || tavut == null) { if (tavut == null) kirjaa?.Invoke("poikki: ympäristö: syvyyskartta ei latautunut (vakiosyvyys)"); yield break; }
            var raaka = new Texture2D(2, 2, TextureFormat.RGBA32, false, true);
            float r0 = DioraamaRuutu.Alku();
            if (!raaka.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(raaka); kirjaa?.Invoke("poikki: ympäristö: syvyyskartta ei jäsentynyt"); yield break; }
            DioraamaRuutu.Kirjaa(kirjaa, "syvyys LoadImage", r0);
            yield return null;
            if (oma != kerta) { UnityEngine.Object.Destroy(raaka); yield break; }
            // Harmaa PNG voi latautua Alpha8:na: arvo luetaan kanavasta, jossa se on, ja talletetaan R8:ksi (neljännes muistia).
            var p = raaka.GetPixels32();
            bool alfa = raaka.format == TextureFormat.Alpha8;
            var r8 = new byte[p.Length];
            for (int i = 0; i < p.Length; i++) r8[i] = alfa ? p[i].a : p[i].r;
            var syv = new Texture2D(raaka.width, raaka.height, TextureFormat.R8, false, true)
            { name = "Ymparisto:syvyys", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            syv.SetPixelData(r8, 0);
            syv.Apply(false, true); DioraamaRuutu.Gpu(kirjaa, syv);
            UnityEngine.Object.Destroy(raaka);
            luodut.Add(syv);
            yield return null;
            vesiMat?.SetTexture(IdSyvyys, syv);
            double koko = syv.width * y.SyvyysPikseliM;
            // Kuvan vasen yläkulma on (origoX, origoY) Blenderissä = Unityn (x, z); tekstuurin v = 0 on kuvan alareuna.
            Shader.SetGlobalVector(IdSyvyysParam, new Vector4((float)y.SyvyysOrigoX, (float)(y.SyvyysOrigoY - koko), (float)(1.0 / koko), (float)(255.0 * y.SyvyysKerroinM)));
            kirjaa?.Invoke($"poikki: ympäristö: syvyyskartta {syv.width}² ({koko:F0} m, enintään {255.0 * y.SyvyysKerroinM:F0} m)");
        }

        static float HeijastusSkaala(DioraamaUlkokuori.Laatu taso)
        {
            if (HeijastusPakotettu == false) return 0f;
            if (HeijastusPakotettu == true) return 0.5f;
            return taso == DioraamaUlkokuori.Laatu.Huippu ? 0.5f : taso == DioraamaUlkokuori.Laatu.Normaali ? 0.33f : 0f;
        }

        /// <summary>Vianetsintä ("poikki vesi siirto"): vedenpinnan pystysiirto metreinä datan tasosta.</summary>
        public void SiirraVesi(float m) { if (vesiGo != null) vesiGo.transform.localPosition = new Vector3(0, m, 0); }

        /// <summary>Joka ruutu pääkameran asettamisen jälkeen (DioraamaNayttamo.Paivita): aika ja planaariheijastus.</summary>
        public void Paivita(Camera kamera)
        {
            if (vesiMat == null || kamera == null) return;
            float skaala = HeijastusSkaala(DioraamaUlkokuori.Valittu);
            // Linnan avautuessa (iPad 2.10.: 81–100 ms:n BehaviourUpdate-ruudut, pääsäie odotti GPU:ta): heijastuskameran
            // SubmitRenderRequest jonottaa renderisäikeen taakse, kun edellisessä ruudussa ladattiin iso tekstuuri tai mesh.
            // Silloin käytetään edellisen ruudun heijastusta (vesi liikkuu hitaasti, ero ei näy).
            bool heijastus;
            if (skaala > 0f && heijastusKuva != null && DioraamaRuutu.LatausTuore) heijastus = true;
            else using (HeijastusMerkki.Auto()) heijastus = skaala > 0f && PiirraHeijastus(kamera, skaala);
            // 1.10. ensimmäinen kuva: linnan heijastus jäi pintakuvion alle → fresnel-bias 0,03 → 0,10 ja pintanormaali 0,35 → 0,22.
            Shader.SetGlobalVector(IdParam, new Vector4(Time.time, heijastus ? 1f : 0f, 0.22f, 0.10f));
            // Taivaan liukuma (kevyt taso ja heijastuksen tausta) tunnelman mukaan: horisontti = kameran tausta (sumun väri),
            // lakipiste hieman tummempi ja sinisempi (hämärässä ennen vaalea liukuma näkyi tummaa taivasta vasten).
            var tausta = kamera.backgroundColor;
            Shader.SetGlobalColor(IdTaivasAla, tausta);
            Shader.SetGlobalColor(IdTaivasYla, new Color(tausta.r * 0.75f, tausta.g * 0.82f, Mathf.Min(1f, tausta.b * 0.95f + 0.04f)));
            // Hämärä (DioraamaTunnelma): horisontin vaaleanpunainen kajo ja matalan auringon oranssit kiillot lounaasta
            // (valaistus.aurinko atsimuutti 225°, korkeus 6°); päivällä heikko kajo ja kirkas kiilto korkeammalta.
            bool hamara = DioraamaValot.TunnelmaTaivas < 0.99f;
            Shader.SetGlobalColor(IdHehku, hamara ? new Color(0.30f, 0.15f, 0.16f) : new Color(0.12f, 0.13f, 0.14f));
            Shader.SetGlobalColor(IdAurinko, hamara ? new Color(1f, 0.55f, 0.30f) : new Color(1f, 0.90f, 0.72f));
            float az = 225f * Mathf.Deg2Rad, kork = (hamara ? 6f : 30f) * Mathf.Deg2Rad;
            var kiilto = DioraamaNayttamo.UnityPiste(new Matkakirja.Linssit.Dioraama.V3(Mathf.Sin(az) * Mathf.Cos(kork), Mathf.Sin(kork), -Mathf.Cos(az) * Mathf.Cos(kork)));
            Shader.SetGlobalVector(IdKiiltoSuunta, new Vector4(kiilto.x, kiilto.y, kiilto.z, hamara ? 0.5f : 0.4f));
            // Taivas (Päätoimittaja 1.10.): liukuväri hämärässä tummasta lakipisteestä sumun väriseen horisonttiin, auringon
            // puolella vaaleanpunainen/oranssi kajo (sama suunta kuin veden kiilloilla); kuva ohittaa liukuvärin.
            if (taivasGo != null)
            {
                taivasGo.transform.position = kamera.transform.position;
                Shader.SetGlobalColor(IdTaivasHorisontti, tausta);
                Shader.SetGlobalColor(IdTaivasLaki, hamara ? new Color(0.055f, 0.07f, 0.13f) : new Color(0.40f, 0.53f, 0.74f));
                Shader.SetGlobalColor(IdTaivasKajo, hamara ? new Color(0.78f, 0.45f, 0.42f, 0.85f) : new Color(1f, 0.93f, 0.82f, 0.35f));
                Shader.SetGlobalVector(IdTaivasAurinko, kiilto);
                bool kuva = taivasMat != null && taivasMat.GetTexture(IdTaivasKuva) != null;
                Shader.SetGlobalVector(IdTaivasParam, new Vector4(kuva ? 1f : 0f, -taivasSuunta / 360f, 0, 0));
            }
        }

        static readonly Unity.Profiling.ProfilerMarker HeijastusMerkki = new Unity.Profiling.ProfilerMarker("Update.Linssi.Dioraama.Heijastus");

        bool PiirraHeijastus(Camera kamera, float skaala)
        {
            var kohde = kamera.targetTexture;
            int w = Mathf.Max(32, Mathf.RoundToInt((kohde != null ? kohde.width : kamera.pixelWidth) * skaala));
            int h = Mathf.Max(32, Mathf.RoundToInt((kohde != null ? kohde.height : kamera.pixelHeight) * skaala));
            if (heijastusKuva == null || heijastusKuva.width != w || heijastusKuva.height != h)
            {
                if (heijastusKuva != null) { heijastusKuva.Release(); UnityEngine.Object.Destroy(heijastusKuva); }
                heijastusKuva = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB)
                { name = "VesiHeijastus", antiAliasing = 1, useMipMap = false };
                heijastusKuva.Create();
                Shader.SetGlobalTexture(IdHeijastus, heijastusKuva);
            }
            if (heijastusKamera == null)
            {
                var kg = new GameObject("VesiHeijastusKamera");
                kg.transform.SetParent(go.transform, false);
                heijastusKamera = kg.AddComponent<Camera>();
                heijastusKamera.enabled = false;
                var data = heijastusKamera.GetUniversalAdditionalCameraData();
                data.renderShadows = false;
                data.renderPostProcessing = false;
                data.requiresColorOption = CameraOverrideOption.Off;
                data.requiresDepthOption = CameraOverrideOption.Off;
                data.antialiasing = AntialiasingMode.None;
            }
            var hk = heijastusKamera;
            hk.CopyFrom(kamera);
            hk.enabled = false;
            hk.useOcclusionCulling = false;
            hk.targetTexture = heijastusKuva;

            // Boat Attack UpdateReflectionCamera: peilaus vedenpinnan suhteen ja vino leikkaustaso (ei vedenalaista).
            var normaali = Vector3.up;
            var paikka = new Vector3(0, vesiY, 0);
            const float Leikkausvara = 0.07f;
            float d = -Vector3.Dot(normaali, paikka) - Leikkausvara;
            var peili = Peilimatriisi(new Vector4(normaali.x, normaali.y, normaali.z, d));
            hk.worldToCameraMatrix = kamera.worldToCameraMatrix * peili;
            var m = hk.worldToCameraMatrix;
            var cp = m.MultiplyPoint(paikka + normaali * Leikkausvara);
            var cn = m.MultiplyVector(normaali).normalized;
            hk.projectionMatrix = kamera.CalculateObliqueMatrix(new Vector4(cn.x, cn.y, cn.z, -Vector3.Dot(cp, cn)));

            var pyynto = new UniversalRenderPipeline.SingleCameraRequest { destination = heijastusKuva };
            if (!RenderPipeline.SupportsRenderRequest(hk, pyynto)) return false;
            bool vesiNakyi = vesiRenderer != null && vesiRenderer.enabled;
            if (vesiRenderer != null) vesiRenderer.enabled = false;
            GL.invertCulling = true;
            try { RenderPipeline.SubmitRenderRequest(hk, pyynto); }
            finally
            {
                GL.invertCulling = false;
                if (vesiRenderer != null) vesiRenderer.enabled = vesiNakyi;
            }
            return true;
        }

        static Matrix4x4 Peilimatriisi(Vector4 t)
        {
            var r = Matrix4x4.identity;
            r.m00 = 1f - 2f * t.x * t.x; r.m01 = -2f * t.x * t.y; r.m02 = -2f * t.x * t.z; r.m03 = -2f * t.w * t.x;
            r.m10 = -2f * t.y * t.x; r.m11 = 1f - 2f * t.y * t.y; r.m12 = -2f * t.y * t.z; r.m13 = -2f * t.w * t.y;
            r.m20 = -2f * t.z * t.x; r.m21 = -2f * t.z * t.y; r.m22 = 1f - 2f * t.z * t.z; r.m23 = -2f * t.w * t.z;
            r.m30 = 0f; r.m31 = 0f; r.m32 = 0f; r.m33 = 1f;
            return r;
        }

        // --- TAIVAS ---------------------------------------------------------------------------------------------------

        void LuoTaivas()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaTaivas");
            if (varjostin == null) return;
            taivasMat = new Material(varjostin) { name = "Ymparisto:taivas" };
            luodut.Add(taivasMat);
            // Pallo 32 × 16 (sisäpinta näkyy, Cull Off), säde 12 km (kaukotaso 16 km).
            const int S = 32, K = 16; const float R = 12000f;
            var p = new List<Vector3>(); var t = new List<int>();
            for (int k = 0; k <= K; k++)
            {
                float fi = Mathf.PI * k / K - Mathf.PI * 0.5f;
                for (int s = 0; s <= S; s++)
                {
                    float th = 2f * Mathf.PI * s / S;
                    p.Add(new Vector3(Mathf.Cos(fi) * Mathf.Sin(th), Mathf.Sin(fi), Mathf.Cos(fi) * Mathf.Cos(th)) * R);
                }
            }
            for (int k = 0; k < K; k++)
                for (int s = 0; s < S; s++)
                {
                    int a = k * (S + 1) + s, b = a + S + 1;
                    t.Add(a); t.Add(b); t.Add(a + 1); t.Add(a + 1); t.Add(b); t.Add(b + 1);
                }
            var m = new Mesh { name = "Ymparisto:taivas" };
            m.SetVertices(p); m.SetTriangles(t, 0);
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2 * R);
            luodut.Add(m);
            taivasGo = new GameObject("Ymparisto:taivas") { layer = DioraamaNayttamo.Kerros };
            taivasGo.transform.SetParent(go.transform, false);
            taivasGo.AddComponent<MeshFilter>().sharedMesh = m;
            var r = taivasGo.AddComponent<MeshRenderer>();
            r.sharedMaterial = taivasMat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        /// <summary>Ensilataus v2: valmiiksi pakattu ASTC-mipketju (.astcm) suoraan GPU:lle (ei purkua eikä pakkausta).
        /// tulos(null), jos polkua ei ole, lataus epäonnistui tai laite ei tue ASTC:tä (simulaattori) → kutsuja käyttää png/jpg:tä.</summary>
        internal static IEnumerator LataaAstc(string polku, string nimi, bool lineaarinen, TextureWrapMode kaari, Func<string, string> url,
            Action<string> kirjaa, List<UnityEngine.Object> luodut, Action<Texture2D> tulos)
        {
            if (string.IsNullOrEmpty(polku)) { tulos(null); yield break; }
            // Tukematon laite (simulaattori): ei turhaa latausta, suoraan png/jpg.
            if (!SystemInfo.SupportsTextureFormat(TextureFormat.ASTC_4x4)) { tulos(null); yield break; }
            byte[] tavut = null;
            yield return DioraamaLevyvalimuisti.Hae(url(polku), 120, b => tavut = b);
            if (tavut == null) { kirjaa?.Invoke($"poikki: ympäristö: {nimi} ASTC ei latautunut, png/jpg varalla"); tulos(null); yield break; }
            float r0 = DioraamaRuutu.Alku();
            var k = DioraamaAstc.Lue(tavut, nimi + ":astc", out string syy, kaari, 0, lineaarinen);
            DioraamaRuutu.Kirjaa(kirjaa, nimi + " ASTC", r0);
            if (k == null) { kirjaa?.Invoke($"poikki: ympäristö: {nimi} ASTC ei käytössä ({syy}), png/jpg varalla"); tulos(null); yield break; }
            luodut?.Add(k);
            DioraamaRuutu.Gpu(kirjaa, k);
            yield return null; // GPU-lataus omassa ruudussaan
            tulos(k);
        }

        IEnumerator LataaTaivas(string polku, float suunta, Func<string, string> url, Action<string> kirjaa, int oma, string astc = null)
        {
            Texture2D valmis = null;
            yield return LataaAstc(astc, "Ymparisto:taivas", false, TextureWrapMode.Repeat, url, kirjaa, luodut, t => valmis = t);
            if (oma != kerta || taivasMat == null) yield break;
            if (valmis != null)
            {
                valmis.filterMode = FilterMode.Trilinear;
                taivasMat.SetTexture(IdTaivasKuva, valmis);
                taivasSuunta = suunta;
                kirjaa?.Invoke($"poikki: ympäristö: taivas {valmis.width}×{valmis.height} ASTC");
                yield break;
            }
            byte[] tavut = null;
            yield return DioraamaLevyvalimuisti.Hae(url(polku), 60, b => tavut = b);
            if (oma != kerta || taivasMat == null) yield break;
            var k = new Texture2D(2, 2, TextureFormat.RGBA32, false, false) { name = "Ymparisto:taivas", wrapMode = TextureWrapMode.Repeat, filterMode = FilterMode.Bilinear };
            float r0 = DioraamaRuutu.Alku();
            if (tavut == null || !k.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(k); kirjaa?.Invoke("poikki: ympäristö: taivas ei latautunut, liukuväri"); yield break; }
            DioraamaRuutu.Kirjaa(kirjaa, "taivas LoadImage", r0);
            luodut.Add(k);
            yield return null;
            r0 = DioraamaRuutu.Alku(); k.Compress(true); DioraamaRuutu.Kirjaa(kirjaa, "taivas Compress", r0);
            yield return null;
            k.Apply(false, true); DioraamaRuutu.Gpu(kirjaa, k);
            yield return null; // GPU-lataus omassa ruudussaan ennen kuin kuva vaihtuu liukuvärin tilalle
            if (oma != kerta || taivasMat == null) yield break;
            taivasMat.SetTexture(IdTaivasKuva, k);
            taivasSuunta = suunta;
            kirjaa?.Invoke($"poikki: ympäristö: taivas {k.width}×{k.height}");
        }

        // --- MAASTO JA HORISONTTI -------------------------------------------------------------------------------------

        IEnumerator LataaMalli(string nimi, string polku, string kuvaPolku, Func<string, string> url, Action<string> kirjaa, int oma,
            MaastoKerrokset splat = null, DioraamaUlkokuori.Laatu taso = DioraamaUlkokuori.Laatu.Kevyt, List<UnityEngine.Object> kohteet = null,
            string astc = null)
        {
            byte[] tavut = null;
            float alku = Time.realtimeSinceStartup;
            yield return DioraamaLevyvalimuisti.Hae(url(polku), 180, t => tavut = t);
            if (oma != kerta) yield break;
            if (tavut == null) { kirjaa?.Invoke($"poikki: ympäristö: {nimi} ei latautunut"); yield break; }
            GlbMalli malli = null; string virhe = null;
            var tehtava = Task.Run(() => { try { malli = DioraamaGlb.Lue(tavut, true); } catch (Exception e) { virhe = e.Message; } });
            while (!tehtava.IsCompleted) yield return null;
            if (oma != kerta) yield break;
            if (malli == null) { kirjaa?.Invoke($"poikki: ympäristö: {nimi} virhe: {virhe}"); yield break; }

            Texture2D kuva = null;
            // Ensilataus v2: erillinen ASTC-kenttä (horisontti_kuva_astc) ensin; tukematon → kuvaPolku (jpg) kuten ennen.
            if (!string.IsNullOrEmpty(astc))
            {
                yield return LataaAstc(astc, "Ymparisto:" + nimi, false, TextureWrapMode.Clamp, url, kirjaa, luodut, t => kuva = t);
                if (oma != kerta) yield break;
                if (kuva != null) kohteet?.Add(kuva);
            }
            byte[] kuvaTavut = null;
            if (kuva == null && !string.IsNullOrEmpty(kuvaPolku)) yield return DioraamaLevyvalimuisti.Hae(url(kuvaPolku), 120, t => kuvaTavut = t);
            if (oma != kerta) yield break;
            // KAIKKI mesh-solmut (1.10. juurisyy: Osat on vain ensimmäisen mesh-solmun osat, ja huippu- ja normaalitason
            // maasto on 2 × 2 lohkoa omina solmuinaan → kolme lohkoa puuttui, ja aitat ja rannat jäivät veden alle).
            // Lohkosolmuilla ei ole muunnoksia; mahdollinen translaatio (jo Unity-kehyksessä) lisätään paikkoihin.
            var osat = new List<(GlbOsa osa, Vector3 siirto)>();
            foreach (var solmu in malli.Solmut)
                foreach (var o in solmu.Osat)
                    osat.Add((o, solmu.Vanhempi < 0 ? new Vector3(solmu.Translation[0], solmu.Translation[1], solmu.Translation[2]) : Vector3.zero));
            if (osat.Count == 0) foreach (var o in malli.Osat) osat.Add((o, Vector3.zero));
            if (kuva == null && kuvaTavut == null) foreach (var (o, _) in osat) if (o.Kuva >= 0 && o.Kuva < malli.Kuvat.Count) { kuvaTavut = malli.Kuvat[o.Kuva]; break; }
            // Paketin orto voi olla ASTC (.astcm, kuten kuoressa): laite käyttää sitä suoraan; tukematon (simulaattori) →
            // glb:n upotettu JPEG.
            if (kuva == null && kuvaTavut != null && kuvaPolku != null && kuvaPolku.EndsWith(".astcm", StringComparison.OrdinalIgnoreCase))
            {
                float a0 = DioraamaRuutu.Alku();
                kuva = DioraamaAstc.Lue(kuvaTavut, "Ymparisto:" + nimi + ":astc", out string syy);
                DioraamaRuutu.Kirjaa(kirjaa, nimi + " ASTC", a0);
                if (kuva != null) { luodut.Add(kuva); kohteet?.Add(kuva); DioraamaRuutu.Gpu(kirjaa, kuva); yield return null; }
                else
                {
                    kirjaa?.Invoke($"poikki: ympäristö: {nimi} ASTC ei käytössä ({syy}), glb:n kuva");
                    kuvaTavut = null;
                    foreach (var (o, _) in osat) if (o.Kuva >= 0 && o.Kuva < malli.Kuvat.Count) { kuvaTavut = malli.Kuvat[o.Kuva]; break; }
                }
            }
            if (kuva == null && kuvaTavut != null)
            {
                kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
                { name = "Ymparisto:" + nimi, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
                float r0 = DioraamaRuutu.Alku();
                if (kuva.LoadImage(kuvaTavut, false))
                {
                    luodut.Add(kuva); kohteet?.Add(kuva);
                    DioraamaRuutu.Kirjaa(kirjaa, nimi + " LoadImage", r0);
                    yield return null;
                    r0 = DioraamaRuutu.Alku(); kuva.Compress(true); DioraamaRuutu.Kirjaa(kirjaa, nimi + " Compress", r0);
                    yield return null;
                    kuva.Apply(true, true); DioraamaRuutu.Gpu(kirjaa, kuva);
                    yield return null;
                }
                else { UnityEngine.Object.Destroy(kuva); kuva = null; }
                if (oma != kerta) yield break;
            }
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            if (varjostin == null) { kirjaa?.Invoke("poikki: ympäristö: DioraamaMaasto-varjostin puuttuu"); yield break; }
            var mat = new Material(varjostin) { name = "Ymparisto:" + nimi };
            if (kuva != null) mat.SetTexture(IdKuva, kuva);
            luodut.Add(mat);
            kohteet?.Add(mat);
            int kolmiot = 0;
            var piirrot = new List<Renderer>(); // päälle vasta kun kaikki lohkot, kuva ja maanpinta ovat GPU:lla
            foreach (var (o, siirto) in osat)
            {
                int n = o.Paikat.Length / 3;
                var p = new Vector3[n]; var uv = new Vector2[n]; var nr = new Vector3[n];
                for (int i = 0; i < n; i++)
                {
                    p[i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]) + siirto;
                    nr[i] = o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]) : Vector3.up;
                    uv[i] = o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero;
                }
                var mesh = new Mesh { name = "Ymparisto:" + nimi, indexFormat = n > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
                mesh.SetVertices(p); mesh.SetNormals(nr); mesh.SetUVs(0, uv); mesh.SetTriangles(o.Kolmiot, 0);
                mesh.RecalculateBounds();
                mesh.UploadMeshData(true); DioraamaRuutu.Mesh(kirjaa, mesh);
                luodut.Add(mesh);
                kohteet?.Add(mesh);
                kolmiot += o.Kolmiot.Length / 3;
                yield return null; // yksi lohko (≈ 100 k kolmiota) per ruutu
                if (oma != kerta) yield break;
                var t = new GameObject("Ymparisto:" + nimi) { layer = DioraamaNayttamo.Kerros };
                kohteet?.Add(t);
                t.transform.SetParent(go.transform, false);
                t.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = t.AddComponent<MeshRenderer>();
                r.sharedMaterial = mat;
                r.shadowCastingMode = ShadowCastingMode.Off;
                r.receiveShadows = false;
                r.enabled = false;
                piirrot.Add(r);
            }
            kirjaa?.Invoke($"poikki: ympäristö: {nimi} {osat.Count} lohkoa, {kolmiot} kolmiota, " +
                           $"{(kuva != null ? kuva.width + "² " + kuva.format : "ei kuvaa")}, {Time.realtimeSinceStartup - alku:F1} s");
            if (splat != null && taso != DioraamaUlkokuori.Laatu.Kevyt) yield return LataaSplat(mat, splat, taso, url, kirjaa, oma);
            if (oma != kerta) yield break;
            foreach (var r in piirrot) if (r != null) r.enabled = true;
        }

        // --- MAANPINNAN KERROKSET (splat) -----------------------------------------------------------------------------

        static readonly int IdSplatAlue = Shader.PropertyToID("_SplatAlue"), IdSplatParam = Shader.PropertyToID("_SplatParam"),
            IdSplatToisto0 = Shader.PropertyToID("_SplatToisto0"), IdSplatToisto1 = Shader.PropertyToID("_SplatToisto1"),
            IdSplatKeski0 = Shader.PropertyToID("_SplatKeski0"), IdSplatKeski1 = Shader.PropertyToID("_SplatKeski1");
        /// <summary>Kehittäjä: "poikki vesi maasto 0|1|auto" (null = laatutason mukaan).</summary>
        public static bool? SplatPakotettu;

        /// <summary>Huippu: 6 kerrosta + normaalit, maski [splat-0, splat-1]; normaali: 4 kerrosta ilman normaaleja,
        /// maski_normaali. Jokaisen kerroksen keskikirkkaus lasketaan pienestä mipistä ennen pakkausta.</summary>
        IEnumerator LataaSplat(Material mat, MaastoKerrokset s, DioraamaUlkokuori.Laatu taso, Func<string, string> url, Action<string> kirjaa, int oma)
        {
            if (SplatPakotettu == false) yield break;
            float alku = Time.realtimeSinceStartup;
            bool huippu = taso == DioraamaUlkokuori.Laatu.Huippu;
            int kerroksia = Math.Min(huippu ? 6 : 4, s.Kerrokset.Count);
            var maskit = huippu ? s.Maski : new List<string> { s.MaskiNormaali ?? (s.Maski.Count > 0 ? s.Maski[0] : null) };
            for (int i = 0; i < maskit.Count && i < 2; i++)
            {
                if (string.IsNullOrEmpty(maskit[i])) continue;
                byte[] t = null;
                yield return DioraamaLevyvalimuisti.Hae(url(maskit[i]), 60, b => t = b);
                if (oma != kerta) yield break;
                Texture2D mk = null;
                yield return Kuva(t, true, "Ymparisto:splat-maski" + i, false, kirjaa, (kt, _) => mk = kt);
                if (oma != kerta) yield break;
                if (mk == null) { kirjaa?.Invoke($"poikki: ympäristö: splat-maski {i} ei latautunut, pelkkä ilmakuva"); yield break; }
                mk.wrapMode = TextureWrapMode.Clamp;
                mat.SetTexture(i == 0 ? "_SplatMaski0" : "_SplatMaski1", mk);
            }
            var toisto = new float[8]; var keski = new float[8];
            for (int k = 0; k < kerroksia; k++)
            {
                var (id, diff, nor, toistoM) = s.Kerrokset[k];
                // Ensilataus v2 (iPad Dev 1.10.: runtime-Compress odotti grafiikkasäiettä 100–170 ms): ASTC + datan keski ensin.
                var (diffAstc, norAstc, keskiData) = k < s.KerroksetAstc.Count ? s.KerroksetAstc[k] : (null, null, (double?)null);
                Texture2D dk = null; float kirkkaus = 0.5f;
                if (keskiData.HasValue)
                {
                    yield return LataaAstc(diffAstc, "Ymparisto:splat-" + id, false, TextureWrapMode.Repeat, url, kirjaa, luodut, t => dk = t);
                    if (oma != kerta) yield break;
                    if (dk != null) kirkkaus = (float)keskiData.Value;
                }
                if (dk == null)
                {
                    byte[] d = null;
                    yield return DioraamaLevyvalimuisti.Hae(url(diff), 60, b => d = b);
                    if (oma != kerta) yield break;
                    yield return Kuva(d, false, "Ymparisto:splat-" + id, true, kirjaa, (kt, b) => { dk = kt; kirkkaus = b; });
                    if (oma != kerta) yield break;
                }
                if (dk == null) { kirjaa?.Invoke($"poikki: ympäristö: kerros {id} ei latautunut, pelkkä ilmakuva"); yield break; }
                mat.SetTexture("_SplatDiff" + k, dk);
                if (huippu)
                {
                    Texture2D nk = null;
                    yield return LataaAstc(norAstc, "Ymparisto:splat-nor-" + id, true, TextureWrapMode.Repeat, url, kirjaa, luodut, t => nk = t);
                    if (oma != kerta) yield break;
                    if (nk == null && !string.IsNullOrEmpty(nor))
                    {
                        byte[] n = null;
                        yield return DioraamaLevyvalimuisti.Hae(url(nor), 60, b => n = b);
                        if (oma != kerta) yield break;
                        yield return Kuva(n, true, "Ymparisto:splat-nor-" + id, false, kirjaa, (kk, _) => nk = kk);
                        if (oma != kerta) yield break;
                    }
                    if (nk != null) mat.SetTexture("_SplatNor" + k, nk);
                }
                toisto[k] = 1f / Mathf.Max(0.1f, (float)toistoM);
                keski[k] = 1f / Mathf.Max(0.05f, kirkkaus);
                yield return null;
            }
            mat.SetVector(IdSplatAlue, new Vector4((float)s.MinX, (float)s.MinZ, (float)(1.0 / (s.MaxX - s.MinX)), (float)(1.0 / (s.MaxZ - s.MinZ))));
            mat.SetVector(IdSplatToisto0, new Vector4(toisto[0], toisto[1], toisto[2], toisto[3]));
            mat.SetVector(IdSplatToisto1, new Vector4(toisto[4], toisto[5], 0, 0));
            mat.SetVector(IdSplatKeski0, new Vector4(keski[0], keski[1], keski[2], keski[3]));
            mat.SetVector(IdSplatKeski1, new Vector4(keski[4], keski[5], 0, 0));
            mat.SetVector(IdSplatParam, new Vector4(kerroksia, (float)s.LahiM, huippu ? 1f : 0f, 0.8f));
            kirjaa?.Invoke($"poikki: ympäristö: maanpinta {kerroksia} kerrosta{(huippu ? " + normaalit" : "")}, {Time.realtimeSinceStartup - alku:F1} s");
        }

        /// <summary>JPEG/PNG → pakattu mip-tekstuuri (linear = normaalit/maskit). kirkkaus = keskimääräinen luminanssi
        /// (lineaarinen, 16² mipistä) ennen pakkausta; maskia ei pakata (painojen tarkkuus).</summary>
        /// Ensilataus v2: LoadImage, Compress ja Apply kukin omassa ruudussaan; tulos(tekstuuri | null, kirkkaus).
        IEnumerator Kuva(byte[] tavut, bool lineaarinen, string nimi, bool pakkaa, Action<string> kirjaa, Action<Texture2D, float> tulos)
        {
            float kirkkaus = 0.5f;
            if (tavut == null) { tulos(null, kirkkaus); yield break; }
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, true, lineaarinen)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Repeat, anisoLevel = 4 };
            float r0 = DioraamaRuutu.Alku();
            if (!t.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(t); tulos(null, kirkkaus); yield break; }
            luodut.Add(t);
            int mip = Mathf.Max(0, t.mipmapCount - 5);
            var px = t.GetPixels(mip);
            double summa = 0;
            foreach (var c in px) summa += 0.2126 * c.linear.r + 0.7152 * c.linear.g + 0.0722 * c.linear.b;
            if (px.Length > 0) kirkkaus = (float)(summa / px.Length);
            DioraamaRuutu.Kirjaa(kirjaa, nimi + " LoadImage", r0);
            yield return null;
            if (pakkaa || lineaarinen && !nimi.Contains("maski"))
            {
                r0 = DioraamaRuutu.Alku(); t.Compress(true); DioraamaRuutu.Kirjaa(kirjaa, nimi + " Compress", r0);
                yield return null;
            }
            t.Apply(true, true); DioraamaRuutu.Gpu(kirjaa, t);
            yield return null;
            tulos(t, kirkkaus);
        }

        // --- PUUT -----------------------------------------------------------------------------------------------------

        static readonly int IdPuuNormaali = Shader.PropertyToID("_Normaali"), IdPuuNormaaliPaalla = Shader.PropertyToID("_NormaaliPaalla");
        internal static readonly int IdHivutusAlku = Shader.PropertyToID("_HivutusAlku");
        sealed class Kortti { public float U0, U1, V0, V1, KorttiPerPuu = 1.04f, LeveysPerKorkeus = 0.5f; }

        IEnumerator LataaPuut(Ymparisto y, DioraamaUlkokuori.Laatu taso, Func<string, string> url, Action<string> kirjaa, int oma)
        {
            byte[] kortitJson = null, puutJson = null, atlasTavut = null;
            string tiedot = y.PuukortitTiedot ?? y.Puukortit; // uusi muoto: puukortit = png, puukortit_tiedot = json
            yield return DioraamaLevyvalimuisti.Hae(url(tiedot), 60, t => kortitJson = t);
            yield return DioraamaLevyvalimuisti.Hae(url(y.Puut), 120, t => puutJson = t);
            if (oma != kerta) yield break;
            if (kortitJson == null || puutJson == null) { kirjaa?.Invoke("poikki: ympäristö: puut eivät latautuneet"); yield break; }
            string atlasNimi = null;
            try { atlasNimi = MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(kortitJson))), "atlas"); } catch { }
            string kansio = tiedot.Contains("/") ? tiedot.Substring(0, tiedot.LastIndexOf('/') + 1) : "";
            string atlasPolku = y.PuukortitTiedot != null && !string.IsNullOrEmpty(y.Puukortit) ? y.Puukortit : kansio + (atlasNimi ?? "puukortit.png");
            // Ensilataus v2: ASTC-atlas (puukortit_astc) ensin; tukematon/puuttuu → png kuten ennen.
            Texture2D atlasAstc = null;
            yield return LataaAstc(y.PuukortitAstc, "Ymparisto:puukortit", false, TextureWrapMode.Clamp, url, kirjaa, luodut, t => atlasAstc = t);
            if (oma != kerta) yield break;
            if (atlasAstc == null)
            {
                yield return DioraamaLevyvalimuisti.Hae(url(atlasPolku), 60, t => atlasTavut = t);
                if (oma != kerta) yield break;
                if (atlasTavut == null) { kirjaa?.Invoke("poikki: ympäristö: puukorttien atlas ei latautunut"); yield break; }
            }

            float alku = Time.realtimeSinceStartup;
            Vector3[] p = null; Vector2[] uv0 = null, uv1 = null; Vector4[] tan = null; Color32[] v = null; int[] kolmiot = null; string virhe = null; int puita = 0;
            var tehtava = Task.Run(() =>
            {
                try
                {
                    var kj = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(kortitJson)));
                    var lajit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kj, "lajit"));
                    var kortit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kj, "kortit"));
                    Kortti LueKortti(string nimi)
                    {
                        var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kortit, nimi));
                        if (k == null) return null;
                        var u = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "u")); var vv = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "v"));
                        return new Kortti
                        {
                            U0 = u.Count > 0 && u[0] is double a ? (float)a : 0f, U1 = u.Count > 1 && u[1] is double b ? (float)b : 1f,
                            V0 = vv.Count > 0 && vv[0] is double c ? (float)c : 0f, V1 = vv.Count > 1 && vv[1] is double e ? (float)e : 1f,
                            KorttiPerPuu = (float)(MiniJson.Luku(k, "kortti_per_puu") ?? 1.04), LeveysPerKorkeus = (float)(MiniJson.Luku(k, "leveys_per_korkeus") ?? 0.5),
                        };
                    }
                    var lajiKortit = new Dictionary<int, List<Kortti>>();
                    // Puukortit v3 (#3763): muunnokset[laji] = ["<laji>-0", …]; puut.json:n 7. sarake valitsee muunnoksen paikan mukaan.
                    var lajiMuunnokset = new Dictionary<int, List<Kortti>>();
                    var muunnokset = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kj, "muunnokset"));
                    if (muunnokset != null)
                        foreach (var kv in muunnokset)
                            if (int.TryParse(kv.Key, out int li))
                            {
                                var lista = new List<Kortti>();
                                foreach (var nimi in MiniJson.TaulukkoTaiTyhja(kv.Value))
                                    if (nimi is string ns && LueKortti(ns) is Kortti km) lista.Add(km);
                                if (lista.Count > 0) lajiMuunnokset[li] = lista;
                            }
                    if (lajit != null)
                        foreach (var kv in lajit)
                            if (int.TryParse(kv.Key, out int li) && kv.Value is string ln)
                            {
                                var lista = new List<Kortti>();
                                var k1 = LueKortti(ln); if (k1 != null) lista.Add(k1);
                                var k2 = LueKortti(ln + "2"); if (k2 != null) lista.Add(k2); // koivu2: vaihtelu samalle lajille
                                if (lista.Count > 0) lajiKortit[li] = lista;
                            }

                    const int L = 7; // x, y, z_maa, korkeus, latvus_r, laji, muunnos
                    var puut = DioraamaLuvut.Rivit(puutJson, "puut", L, out var sar, out int riveja) ?? new float[0];
                    var tasot = DioraamaLuvut.Objekti(puutJson, "tasot");
                    string tasoNimi = taso == DioraamaUlkokuori.Laatu.Huippu ? "huippu" : taso == DioraamaUlkokuori.Laatu.Normaali ? "normaali" : "kevyt";
                    int oletus = taso == DioraamaUlkokuori.Laatu.Huippu ? 25000 : taso == DioraamaUlkokuori.Laatu.Normaali ? 10000 : 3500;
                    int n = Math.Min(riveja, (int)(MiniJson.Luku(tasot, tasoNimi) ?? oletus));
                    p = new Vector3[n * 8]; uv0 = new Vector2[n * 8]; uv1 = new Vector2[n * 8]; tan = new Vector4[n * 8]; v = new Color32[n * 8]; kolmiot = new int[n * 12];
                    int k0 = 0;
                    for (int i = 0; i < n; i++)
                    {
                        if (sar[i] < 6) continue;
                        int o0 = i * L;
                        float bx = puut[o0], by = puut[o0 + 1], bz = puut[o0 + 2], kork = puut[o0 + 3];
                        int laji = (int)puut[o0 + 5];
                        if (!lajiKortit.TryGetValue(laji, out var vaihtoehdot) && !lajiKortit.TryGetValue(0, out vaihtoehdot)) continue;
                        uint hsh = (uint)(i * 2654435761u) ^ (uint)(bx * 73856093f) ^ (uint)(by * 19349663f);
                        var kortti = sar[i] >= 7 && !float.IsNaN(puut[o0 + 6]) && lajiMuunnokset.TryGetValue(laji, out var mlista)
                            ? mlista[Math.Max(0, (int)puut[o0 + 6]) % mlista.Count]
                            : vaihtoehdot[(int)(hsh % (uint)vaihtoehdot.Count)];
                        float korkeus = kork * kortti.KorttiPerPuu, puoli = korkeus * kortti.LeveysPerKorkeus * 0.5f;
                        float kulma = (hsh >> 8) % 360 * Mathf.Deg2Rad;
                        var juuriP = new Vector3(bx, bz, by); // Blender (x itä, y pohjoinen, z ylös) → Unity (x, y ylös, z)
                        byte kirkkaus = (byte)(hsh >> 16 & 0xFF), vaihe = (byte)(hsh >> 24 & 0xFF);
                        for (int q = 0; q < 2; q++)
                        {
                            float a = kulma + q * Mathf.PI * 0.5f;
                            var sivu = new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a)) * puoli;
                            int b = k0 * 4;
                            p[b] = juuriP - sivu; p[b + 1] = juuriP + sivu;
                            p[b + 2] = juuriP + sivu + Vector3.up * korkeus; p[b + 3] = juuriP - sivu + Vector3.up * korkeus;
                            uv0[b] = new Vector2(kortti.U0, kortti.V0); uv0[b + 1] = new Vector2(kortti.U1, kortti.V0);
                            uv0[b + 2] = new Vector2(kortti.U1, kortti.V1); uv0[b + 3] = new Vector2(kortti.U0, kortti.V1);
                            uv1[b] = uv1[b + 1] = new Vector2(0, 0); uv1[b + 2] = uv1[b + 3] = new Vector2(1, 0);
                            for (int c = 0; c < 4; c++) { v[b + c] = new Color32(kirkkaus, vaihe, 0, 255); tan[b + c] = new Vector4(Mathf.Cos(a), 0, Mathf.Sin(a), 1); }
                            int ti = k0 * 6;
                            kolmiot[ti] = b; kolmiot[ti + 1] = b + 2; kolmiot[ti + 2] = b + 1;
                            kolmiot[ti + 3] = b; kolmiot[ti + 4] = b + 3; kolmiot[ti + 5] = b + 2;
                            k0++;
                        }
                        puita++;
                    }
                    if (k0 * 4 < p.Length)
                    {
                        Array.Resize(ref p, k0 * 4); Array.Resize(ref uv0, k0 * 4); Array.Resize(ref uv1, k0 * 4);
                        Array.Resize(ref v, k0 * 4); Array.Resize(ref tan, k0 * 4); Array.Resize(ref kolmiot, k0 * 6);
                    }
                }
                catch (Exception e) { virhe = e.Message; }
            });
            while (!tehtava.IsCompleted) yield return null;
            if (oma != kerta) yield break;
            if (p == null || p.Length == 0) { kirjaa?.Invoke($"poikki: ympäristö: puut virhe: {virhe ?? "ei puita"}"); yield break; }

            float r0;
            var atlas = atlasAstc;
            if (atlas != null) atlas.anisoLevel = 2;
            else
            {
                atlas = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
                { name = "Ymparisto:puukortit", filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
                r0 = DioraamaRuutu.Alku();
                if (!atlas.LoadImage(atlasTavut, false)) { UnityEngine.Object.Destroy(atlas); kirjaa?.Invoke("poikki: ympäristö: puukorttien atlas ei jäsentynyt"); yield break; }
                luodut.Add(atlas);
                DioraamaRuutu.Kirjaa(kirjaa, "puukortit LoadImage", r0);
                yield return null;
                r0 = DioraamaRuutu.Alku(); atlas.Compress(true); DioraamaRuutu.Kirjaa(kirjaa, "puukortit Compress", r0);
                yield return null;
                atlas.Apply(true, true); DioraamaRuutu.Gpu(kirjaa, atlas);
                yield return null;
                if (oma != kerta) yield break;
            }
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaPuu");
            if (varjostin == null) { kirjaa?.Invoke("poikki: ympäristö: DioraamaPuu-varjostin puuttuu"); yield break; }
            var mat = new Material(varjostin) { name = "Ymparisto:puut" };
            mat.SetTexture(IdKuva, atlas);
            luodut.Add(mat);
            // Normaalikartta (v3) vain normaali/huippu-tasolla: kevyellä tasolla tasainen kortti riittää (lataus ja muisti).
            string normaaliTila = "ei";
            Texture2D normAstc = null;
            if (!string.IsNullOrEmpty(y.PuukortitNormaaliAstc) && taso != DioraamaUlkokuori.Laatu.Kevyt)
            {
                yield return LataaAstc(y.PuukortitNormaaliAstc, "Ymparisto:puukortit-normaali", true, TextureWrapMode.Clamp, url, kirjaa, luodut, t => normAstc = t);
                if (oma != kerta) yield break;
                if (normAstc != null && normAstc.width == atlas.width && normAstc.height == atlas.height)
                {
                    mat.SetTexture(IdPuuNormaali, normAstc);
                    mat.SetFloat(IdPuuNormaaliPaalla, 1);
                    normaaliTila = $"{normAstc.width}×{normAstc.height} ASTC";
                }
                else normAstc = null;
            }
            if (normAstc == null && !string.IsNullOrEmpty(y.PuukortitNormaali) && taso != DioraamaUlkokuori.Laatu.Kevyt)
            {
                byte[] normTavut = null;
                yield return DioraamaLevyvalimuisti.Hae(url(y.PuukortitNormaali), 60, t => normTavut = t);
                if (oma != kerta) yield break;
                var norm = new Texture2D(2, 2, TextureFormat.RGBA32, true, true)
                { name = "Ymparisto:puukortit-normaali", filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
                r0 = DioraamaRuutu.Alku();
                if (normTavut != null && norm.LoadImage(normTavut, false) && norm.width == atlas.width && norm.height == atlas.height)
                {
                    luodut.Add(norm);
                    DioraamaRuutu.Kirjaa(kirjaa, "puukortit-normaali LoadImage", r0);
                    yield return null;
                    r0 = DioraamaRuutu.Alku(); norm.Compress(true); DioraamaRuutu.Kirjaa(kirjaa, "puukortit-normaali Compress", r0);
                    yield return null;
                    norm.Apply(true, true); DioraamaRuutu.Gpu(kirjaa, norm);
                    yield return null;
                    if (oma != kerta) yield break;
                    mat.SetTexture(IdPuuNormaali, norm);
                    mat.SetFloat(IdPuuNormaaliPaalla, 1);
                    normaaliTila = $"{norm.width}×{norm.height}";
                }
                else { UnityEngine.Object.Destroy(norm); normaaliTila = normTavut == null ? "ei latautunut" : "koko ei vastaa atlasta"; }
            }
            var mesh = new Mesh { name = "Ymparisto:puut", indexFormat = IndexFormat.UInt32 };
            mesh.SetVertices(p); mesh.SetUVs(0, uv0); mesh.SetUVs(1, uv1); mesh.SetTangents(tan); mesh.SetColors(v); mesh.SetTriangles(kolmiot, 0);
            mesh.RecalculateBounds();
            mesh.UploadMeshData(true); DioraamaRuutu.Mesh(kirjaa, mesh);
            luodut.Add(mesh);
            yield return null;
            if (oma != kerta) yield break;
            mat.SetFloat(IdHivutusAlku, Time.timeSinceLevelLoad); // DioraamaPuu: alfaraja laskee 0,5 s:ssa → puut kasvavat näkyviin
            var t = new GameObject("Ymparisto:puut") { layer = DioraamaNayttamo.Kerros };
            t.transform.SetParent(go.transform, false);
            t.AddComponent<MeshFilter>().sharedMesh = mesh;
            var rr = t.AddComponent<MeshRenderer>();
            rr.sharedMaterial = mat;
            rr.shadowCastingMode = ShadowCastingMode.Off;
            rr.receiveShadows = false;
            kirjaa?.Invoke($"poikki: ympäristö: puut {puita} ({kolmiot.Length / 3} kolmiota, {atlas.width}×{atlas.height} {atlas.format}, normaali {normaaliTila}), {Time.realtimeSinceStartup - alku:F1} s");
        }

        public void Tyhjenna()
        {
            kerta++;
            Kaytossa = false;
            Tila = "ei ladattu";
            if (heijastusKuva != null) { heijastusKuva.Release(); UnityEngine.Object.Destroy(heijastusKuva); heijastusKuva = null; }
            foreach (var o in luodut) if (o != null) UnityEngine.Object.Destroy(o);
            luodut.Clear();
            if (go != null) UnityEngine.Object.Destroy(go);
            go = null; vesiGo = null; vesiRenderer = null; vesiMat = null; heijastusKamera = null; taivasGo = null; taivasMat = null;
        }
    }

    /// <summary>ENSILATAUS v2 (Päätoimittaja 1.10.2026: "kun linna on näkyvissä, yksikään ruutu ei kestä yli ~100 ms"):
    /// pääsäikeen raskaat vaiheet (LoadImage, Compress, Apply = GPU-lataus, mesh-lataus) tehdään kukin omassa ruudussaan
    /// (kutsuja tekee yield return null väliin), ja yli 40 ms:n vaihe kirjataan lokiin ("poikki: raskas …"), jotta laite-
    /// mittaus näyttää jäljelle jääneet piikit.</summary>
    internal static class DioraamaRuutu
    {
        public static float Alku() => Time.realtimeSinceStartup;
        public static void Kirjaa(Action<string> kirjaa, string vaihe, float alku)
        {
            float ms = (Time.realtimeSinceStartup - alku) * 1000f;
            if (ms > 40f) kirjaa?.Invoke($"poikki: raskas {vaihe} {ms:F0} ms (ruutu {Time.frameCount})");
        }
        /// <summary>GPU-lataus (Apply) lokiin ruutunumerolla: laitemittauksen piikit kohdistuvat tekstuuriin.</summary>
        public static void Gpu(Action<string> kirjaa, Texture t)
        {
            if (t == null) return;
            Ladattu();
            kirjaa?.Invoke($"poikki: gpu {t.name} {t.width}×{t.height} {t.graphicsFormat} (ruutu {Time.frameCount})");
        }

        /// <summary>Mesh-lataus lokiin ruutunumerolla (kuten Gpu tekstuureille).</summary>
        public static void Mesh(Action<string> kirjaa, Mesh m)
        {
            if (m == null) return;
            Ladattu();
            kirjaa?.Invoke($"poikki: gpu {m.name} mesh {m.vertexCount} kärkeä (ruutu {Time.frameCount})");
        }

        static int viimeisinLataus = -10;
        /// <summary>Iso GPU-lataus (tekstuuri tai mesh) tässä ruudussa: renderisäie on varattu seuraavan ruudun ajan.</summary>
        public static void Ladattu() => viimeisinLataus = Time.frameCount;
        /// <summary>Lataus tässä tai edellisessä ruudussa: vältä pääsäikeen GPU-synkronointia (heijastuksen piirto).</summary>
        public static bool LatausTuore => Time.frameCount - viimeisinLataus <= 1;
    }

    /// <summary>ENSILATAUS v2 (iPad-mittaus 1.10.: puiden vaiheessa 100–220 ms:n ruutuja): puut.json (4,5 Mt, ~65 000 riviä) ja
    /// aluskasvien lista jäsennettiin MiniJsonilla, joka loi riviä kohden listan ja laatikoidut luvut (~1 M oliota) →
    /// roskienkeruu pysäytti myös pääsäikeen. Tämä lukee numerotaulukon suoraan tavuista tasaiseen float-taulukkoon.</summary>
    internal static class DioraamaLuvut
    {
        /// <summary>Taulukko avaimen <paramref name="avain"/> alla: [[a, b, …], …] → rivit × leveys (puuttuva = NaN) ja rivin
        /// sarakemäärä. null, jos avainta ei löydy.</summary>
        public static float[] Rivit(byte[] j, string avain, int leveys, out int[] sarakkeet, out int rivit)
        {
            sarakkeet = null; rivit = 0;
            int p = Etsi(j, "\"" + avain + "\"", 0);
            if (p < 0) return null;
            while (p < j.Length && j[p] != (byte)'[') p++;
            p++;
            var arvot = new List<float>(1 << 16); var maarat = new List<int>(1 << 14);
            while (p < j.Length)
            {
                byte c = j[p];
                if (c == (byte)']') break;
                if (c != (byte)'[') { p++; continue; }
                p++;
                int n = 0;
                while (p < j.Length && j[p] != (byte)']')
                {
                    c = j[p];
                    if (c == (byte)'-' || c == (byte)'+' || c == (byte)'.' || (c >= (byte)'0' && c <= (byte)'9'))
                    {
                        float v = Luku(j, ref p);
                        if (n < leveys) arvot.Add(v);
                        n++;
                    }
                    else if (c == (byte)'n') { if (n < leveys) arvot.Add(float.NaN); n++; p += 4; } // null
                    else p++;
                }
                for (int k = n; k < leveys; k++) arvot.Add(float.NaN);
                maarat.Add(Math.Min(n, leveys));
                p++;
            }
            rivit = maarat.Count; sarakkeet = maarat.ToArray();
            return arvot.ToArray();
        }

        /// <summary>Pieni objekti avaimen alla (esim. "tasot") MiniJsonilla ilman koko tiedoston jäsennystä.</summary>
        public static Dictionary<string, object> Objekti(byte[] j, string avain)
        {
            int p = Etsi(j, "\"" + avain + "\"", 0);
            if (p < 0) return null;
            while (p < j.Length && j[p] != (byte)'{') { if (j[p] == (byte)'[' || j[p] == (byte)',') return null; p++; }
            int alku = p, syvyys = 0;
            for (; p < j.Length; p++)
            {
                if (j[p] == (byte)'{') syvyys++;
                else if (j[p] == (byte)'}' && --syvyys == 0) break;
            }
            if (p >= j.Length) return null;
            try { return MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(j, alku, p - alku + 1))); } catch { return null; }
        }

        static int Etsi(byte[] j, string s, int alku)
        {
            var b = System.Text.Encoding.UTF8.GetBytes(s);
            for (int i = alku; i <= j.Length - b.Length; i++)
            {
                int k = 0;
                while (k < b.Length && j[i + k] == b[k]) k++;
                if (k == b.Length) return i + b.Length;
            }
            return -1;
        }

        static float Luku(byte[] j, ref int p)
        {
            bool neg = false;
            if (j[p] == (byte)'-') { neg = true; p++; } else if (j[p] == (byte)'+') p++;
            double v = 0, jako = 1;
            while (p < j.Length && j[p] >= (byte)'0' && j[p] <= (byte)'9') v = v * 10 + (j[p++] - (byte)'0');
            if (p < j.Length && j[p] == (byte)'.')
            {
                p++;
                while (p < j.Length && j[p] >= (byte)'0' && j[p] <= (byte)'9') { v = v * 10 + (j[p++] - (byte)'0'); jako *= 10; }
            }
            v /= jako;
            if (p < j.Length && (j[p] == (byte)'e' || j[p] == (byte)'E'))
            {
                p++;
                bool eneg = false;
                if (p < j.Length && (j[p] == (byte)'-' || j[p] == (byte)'+')) eneg = j[p++] == (byte)'-';
                int e = 0;
                while (p < j.Length && j[p] >= (byte)'0' && j[p] <= (byte)'9') e = e * 10 + (j[p++] - (byte)'0');
                v *= Math.Pow(10, eneg ? -e : e);
            }
            return (float)(neg ? -v : v);
        }
    }
}
