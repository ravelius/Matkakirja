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
            IdPinta = Shader.PropertyToID("_Pinta"), IdSyvyys = Shader.PropertyToID("_Syvyys");

        // Järven aallot (amplitudi m, suunta °, aallonpituus m): tyyni Saimaa, lounaistuuli.
        static readonly Vector4[] Aallot =
        {
            new Vector4(0.030f, 200f, 2.2f, 0), new Vector4(0.025f, 232f, 3.1f, 0),
            new Vector4(0.040f, 188f, 5.3f, 0), new Vector4(0.018f, 255f, 1.4f, 0),
        };

        readonly Transform juuri;
        GameObject go, vesiGo;
        Renderer vesiRenderer;
        Material vesiMat;
        Camera heijastusKamera;
        RenderTexture heijastusKuva;
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        int kerta;
        float vesiY;

        public string Tila { get; private set; } = "ei ladattu";

        public DioraamaYmparisto(Transform juuri) { this.juuri = juuri; }

        public IEnumerator Lataa(Ymparisto y, float vesiTaso, Func<string, string> url, Action<string> kirjaa)
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
            var taso = DioraamaUlkokuori.Valittu;
            Tila = "vesi";

            if (!string.IsNullOrEmpty(y.SyvyysKuva)) yield return LataaSyvyys(y, url, kirjaa, oma);
            if (oma != kerta) yield break;

            string maasto = taso == DioraamaUlkokuori.Laatu.Huippu ? y.Huippu : taso == DioraamaUlkokuori.Laatu.Normaali ? y.Normaali : y.Kevyt;
            string orto = taso == DioraamaUlkokuori.Laatu.Huippu ? y.OrtoHuippu : taso == DioraamaUlkokuori.Laatu.Normaali ? y.OrtoNormaali : y.OrtoKevyt;
            if (!string.IsNullOrEmpty(maasto)) yield return LataaMalli("maasto", maasto, orto, url, kirjaa, oma, y.Maasto, taso);
            if (oma != kerta) yield break;
            if (!string.IsNullOrEmpty(y.Horisontti)) yield return LataaMalli("horisontti", y.Horisontti, y.HorisonttiKuva, url, kirjaa, oma);
            if (oma != kerta) yield break;
            if (!string.IsNullOrEmpty(y.Puut) && !string.IsNullOrEmpty(y.Puukortit)) yield return LataaPuut(y, taso, url, kirjaa, oma);
            if (oma != kerta) yield break;
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
            Shader.SetGlobalColor(IdMata, new Color(0.31f, 0.37f, 0.33f));
            Shader.SetGlobalColor(IdSyva, new Color(0.13f, 0.20f, 0.23f));
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
            if (!raaka.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(raaka); kirjaa?.Invoke("poikki: ympäristö: syvyyskartta ei jäsentynyt"); yield break; }
            // Harmaa PNG voi latautua Alpha8:na: arvo luetaan kanavasta, jossa se on, ja talletetaan R8:ksi (neljännes muistia).
            var p = raaka.GetPixels32();
            bool alfa = raaka.format == TextureFormat.Alpha8;
            var r8 = new byte[p.Length];
            for (int i = 0; i < p.Length; i++) r8[i] = alfa ? p[i].a : p[i].r;
            var syv = new Texture2D(raaka.width, raaka.height, TextureFormat.R8, false, true)
            { name = "Ymparisto:syvyys", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            syv.SetPixelData(r8, 0);
            syv.Apply(false, true);
            UnityEngine.Object.Destroy(raaka);
            luodut.Add(syv);
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

        /// <summary>Joka ruutu pääkameran asettamisen jälkeen (DioraamaNayttamo.Paivita): aika ja planaariheijastus.</summary>
        public void Paivita(Camera kamera)
        {
            if (vesiMat == null || kamera == null) return;
            float skaala = HeijastusSkaala(DioraamaUlkokuori.Valittu);
            bool heijastus = skaala > 0f && PiirraHeijastus(kamera, skaala);
            Shader.SetGlobalVector(IdParam, new Vector4(Time.time, heijastus ? 1f : 0f, 0.35f, 0.03f));
        }

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

        // --- MAASTO JA HORISONTTI -------------------------------------------------------------------------------------

        IEnumerator LataaMalli(string nimi, string polku, string kuvaPolku, Func<string, string> url, Action<string> kirjaa, int oma,
            MaastoKerrokset splat = null, DioraamaUlkokuori.Laatu taso = DioraamaUlkokuori.Laatu.Kevyt)
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

            byte[] kuvaTavut = null;
            if (!string.IsNullOrEmpty(kuvaPolku)) yield return DioraamaLevyvalimuisti.Hae(url(kuvaPolku), 120, t => kuvaTavut = t);
            if (oma != kerta) yield break;
            if (kuvaTavut == null) foreach (var o in malli.Osat) if (o.Kuva >= 0 && o.Kuva < malli.Kuvat.Count) { kuvaTavut = malli.Kuvat[o.Kuva]; break; }
            Texture2D kuva = null;
            if (kuvaTavut != null)
            {
                kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
                { name = "Ymparisto:" + nimi, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
                if (kuva.LoadImage(kuvaTavut, false)) { kuva.Compress(true); kuva.Apply(true, true); luodut.Add(kuva); }
                else { UnityEngine.Object.Destroy(kuva); kuva = null; }
            }
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            if (varjostin == null) { kirjaa?.Invoke("poikki: ympäristö: DioraamaMaasto-varjostin puuttuu"); yield break; }
            var mat = new Material(varjostin) { name = "Ymparisto:" + nimi };
            if (kuva != null) mat.SetTexture(IdKuva, kuva);
            luodut.Add(mat);
            int kolmiot = 0;
            foreach (var o in malli.Osat)
            {
                int n = o.Paikat.Length / 3;
                var p = new Vector3[n]; var uv = new Vector2[n]; var nr = new Vector3[n];
                for (int i = 0; i < n; i++)
                {
                    p[i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]);
                    nr[i] = o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]) : Vector3.up;
                    uv[i] = o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero;
                }
                var mesh = new Mesh { name = "Ymparisto:" + nimi, indexFormat = n > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
                mesh.SetVertices(p); mesh.SetNormals(nr); mesh.SetUVs(0, uv); mesh.SetTriangles(o.Kolmiot, 0);
                mesh.RecalculateBounds();
                mesh.UploadMeshData(true);
                luodut.Add(mesh);
                kolmiot += o.Kolmiot.Length / 3;
                var t = new GameObject("Ymparisto:" + nimi) { layer = DioraamaNayttamo.Kerros };
                t.transform.SetParent(go.transform, false);
                t.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = t.AddComponent<MeshRenderer>();
                r.sharedMaterial = mat;
                r.shadowCastingMode = ShadowCastingMode.Off;
                r.receiveShadows = false;
            }
            kirjaa?.Invoke($"poikki: ympäristö: {nimi} {malli.Osat.Count} lohkoa, {kolmiot} kolmiota, " +
                           $"{(kuva != null ? kuva.width + "² " + kuva.format : "ei kuvaa")}, {Time.realtimeSinceStartup - alku:F1} s");
            if (splat != null && taso != DioraamaUlkokuori.Laatu.Kevyt) yield return LataaSplat(mat, splat, taso, url, kirjaa, oma);
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
                var mk = Kuva(t, true, "Ymparisto:splat-maski" + i, false, out _);
                if (mk == null) { kirjaa?.Invoke($"poikki: ympäristö: splat-maski {i} ei latautunut, pelkkä ilmakuva"); yield break; }
                mk.wrapMode = TextureWrapMode.Clamp;
                mat.SetTexture(i == 0 ? "_SplatMaski0" : "_SplatMaski1", mk);
            }
            var toisto = new float[8]; var keski = new float[8];
            for (int k = 0; k < kerroksia; k++)
            {
                var (id, diff, nor, toistoM) = s.Kerrokset[k];
                byte[] d = null, n = null;
                yield return DioraamaLevyvalimuisti.Hae(url(diff), 60, b => d = b);
                if (huippu && !string.IsNullOrEmpty(nor)) yield return DioraamaLevyvalimuisti.Hae(url(nor), 60, b => n = b);
                if (oma != kerta) yield break;
                var dk = Kuva(d, false, "Ymparisto:splat-" + id, true, out float kirkkaus);
                if (dk == null) { kirjaa?.Invoke($"poikki: ympäristö: kerros {id} ei latautunut, pelkkä ilmakuva"); yield break; }
                mat.SetTexture("_SplatDiff" + k, dk);
                if (n != null) { var nk = Kuva(n, true, "Ymparisto:splat-nor-" + id, false, out _); if (nk != null) mat.SetTexture("_SplatNor" + k, nk); }
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
        Texture2D Kuva(byte[] tavut, bool lineaarinen, string nimi, bool pakkaa, out float kirkkaus)
        {
            kirkkaus = 0.5f;
            if (tavut == null) return null;
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, true, lineaarinen)
            { name = nimi, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Repeat, anisoLevel = 4 };
            if (!t.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(t); return null; }
            int mip = Mathf.Max(0, t.mipmapCount - 5);
            var px = t.GetPixels(mip);
            double summa = 0;
            foreach (var c in px) summa += 0.2126 * c.linear.r + 0.7152 * c.linear.g + 0.0722 * c.linear.b;
            if (px.Length > 0) kirkkaus = (float)(summa / px.Length);
            if (pakkaa || lineaarinen && !nimi.Contains("maski")) t.Compress(true);
            t.Apply(true, true);
            luodut.Add(t);
            return t;
        }

        // --- PUUT -----------------------------------------------------------------------------------------------------

        sealed class Kortti { public float U0, U1, V0, V1, KorttiPerPuu = 1.04f, LeveysPerKorkeus = 0.5f; }

        IEnumerator LataaPuut(Ymparisto y, DioraamaUlkokuori.Laatu taso, Func<string, string> url, Action<string> kirjaa, int oma)
        {
            byte[] kortitJson = null, puutJson = null, atlasTavut = null;
            yield return DioraamaLevyvalimuisti.Hae(url(y.Puukortit), 60, t => kortitJson = t);
            yield return DioraamaLevyvalimuisti.Hae(url(y.Puut), 120, t => puutJson = t);
            if (oma != kerta) yield break;
            if (kortitJson == null || puutJson == null) { kirjaa?.Invoke("poikki: ympäristö: puut eivät latautuneet"); yield break; }
            string atlasNimi = null;
            try { atlasNimi = MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(kortitJson))), "atlas"); } catch { }
            string kansio = y.Puukortit.Contains("/") ? y.Puukortit.Substring(0, y.Puukortit.LastIndexOf('/') + 1) : "";
            yield return DioraamaLevyvalimuisti.Hae(url(kansio + (atlasNimi ?? "puukortit.png")), 60, t => atlasTavut = t);
            if (oma != kerta) yield break;
            if (atlasTavut == null) { kirjaa?.Invoke("poikki: ympäristö: puukorttien atlas ei latautunut"); yield break; }

            float alku = Time.realtimeSinceStartup;
            Vector3[] p = null; Vector2[] uv0 = null, uv1 = null; Color32[] v = null; int[] kolmiot = null; string virhe = null; int puita = 0;
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
                    if (lajit != null)
                        foreach (var kv in lajit)
                            if (int.TryParse(kv.Key, out int li) && kv.Value is string ln)
                            {
                                var lista = new List<Kortti>();
                                var k1 = LueKortti(ln); if (k1 != null) lista.Add(k1);
                                var k2 = LueKortti(ln + "2"); if (k2 != null) lista.Add(k2); // koivu2: vaihtelu samalle lajille
                                if (lista.Count > 0) lajiKortit[li] = lista;
                            }

                    var pj = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(puutJson)));
                    var rivit = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(pj, "puut"));
                    var tasot = MiniJson.ObjektiTaiNull(MiniJson.Kentta(pj, "tasot"));
                    string tasoNimi = taso == DioraamaUlkokuori.Laatu.Huippu ? "huippu" : taso == DioraamaUlkokuori.Laatu.Normaali ? "normaali" : "kevyt";
                    int oletus = taso == DioraamaUlkokuori.Laatu.Huippu ? 25000 : taso == DioraamaUlkokuori.Laatu.Normaali ? 10000 : 3500;
                    int n = Math.Min(rivit.Count, (int)(MiniJson.Luku(tasot, tasoNimi) ?? oletus));
                    p = new Vector3[n * 8]; uv0 = new Vector2[n * 8]; uv1 = new Vector2[n * 8]; v = new Color32[n * 8]; kolmiot = new int[n * 12];
                    int k0 = 0;
                    for (int i = 0; i < n; i++)
                    {
                        if (!(rivit[i] is List<object> r) || r.Count < 6) continue;
                        float bx = (float)(double)r[0], by = (float)(double)r[1], bz = (float)(double)r[2], kork = (float)(double)r[3];
                        int laji = (int)(double)r[5];
                        if (!lajiKortit.TryGetValue(laji, out var vaihtoehdot) && !lajiKortit.TryGetValue(0, out vaihtoehdot)) continue;
                        uint hsh = (uint)(i * 2654435761u) ^ (uint)(bx * 73856093f) ^ (uint)(by * 19349663f);
                        var kortti = vaihtoehdot[(int)(hsh % (uint)vaihtoehdot.Count)];
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
                            for (int c = 0; c < 4; c++) v[b + c] = new Color32(kirkkaus, vaihe, 0, 255);
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
                        Array.Resize(ref v, k0 * 4); Array.Resize(ref kolmiot, k0 * 6);
                    }
                }
                catch (Exception e) { virhe = e.Message; }
            });
            while (!tehtava.IsCompleted) yield return null;
            if (oma != kerta) yield break;
            if (p == null || p.Length == 0) { kirjaa?.Invoke($"poikki: ympäristö: puut virhe: {virhe ?? "ei puita"}"); yield break; }

            var atlas = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Ymparisto:puukortit", filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
            if (!atlas.LoadImage(atlasTavut, false)) { UnityEngine.Object.Destroy(atlas); kirjaa?.Invoke("poikki: ympäristö: puukorttien atlas ei jäsentynyt"); yield break; }
            atlas.Compress(true);
            atlas.Apply(true, true);
            luodut.Add(atlas);
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaPuu");
            if (varjostin == null) { kirjaa?.Invoke("poikki: ympäristö: DioraamaPuu-varjostin puuttuu"); yield break; }
            var mat = new Material(varjostin) { name = "Ymparisto:puut" };
            mat.SetTexture(IdKuva, atlas);
            luodut.Add(mat);
            var mesh = new Mesh { name = "Ymparisto:puut", indexFormat = IndexFormat.UInt32 };
            mesh.SetVertices(p); mesh.SetUVs(0, uv0); mesh.SetUVs(1, uv1); mesh.SetColors(v); mesh.SetTriangles(kolmiot, 0);
            mesh.RecalculateBounds();
            mesh.UploadMeshData(true);
            luodut.Add(mesh);
            var t = new GameObject("Ymparisto:puut") { layer = DioraamaNayttamo.Kerros };
            t.transform.SetParent(go.transform, false);
            t.AddComponent<MeshFilter>().sharedMesh = mesh;
            var rr = t.AddComponent<MeshRenderer>();
            rr.sharedMaterial = mat;
            rr.shadowCastingMode = ShadowCastingMode.Off;
            rr.receiveShadows = false;
            kirjaa?.Invoke($"poikki: ympäristö: puut {puita} ({kolmiot.Length / 3} kolmiota, {atlas.width}×{atlas.height} {atlas.format}), {Time.realtimeSinceStartup - alku:F1} s");
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
            go = null; vesiGo = null; vesiRenderer = null; vesiMat = null; heijastusKamera = null;
        }
    }
}
