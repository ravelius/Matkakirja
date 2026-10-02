// AJATTELIJAN NÄYTTÄMÖ (Linssiseppä 2, 2.10.2026): webin js/linssit/ajattelija.js:n three.js-kohtaus Unityssä. Oma kamera
// kerroksessa 13 (vapaa: 9 Dioraama, 10–12 muut) piirtää RenderTextureen (AjattelijaNakyma näyttää sen koko ruudulla,
// Dioraaman malli). Bysti GLB:stä (DioraamaGlb, normaalikartta upotettuna), valaistus ja videotykit yhdessä varjostimessa
// (Resources/Varjostimet/AjattelijaKipsi): Unityn valoja ei käytetä, joten luvut ovat webin luvut sellaisinaan.
//
// KOORDINAATIT: data on Blenderin (x, y, z), web kääntää three.js:ään (x, z, −y) ja glTF → Unity peilaa z:n, joten
// Blender → Unity = (x, z, y). Peilaus kääntää ristitulot ja kiertojen suunnan: webin u × n on tässä n × u, ja
// setFromAxisAngle(n, θ) on AngleAxis(−θ, n). Videotykin kanta (three.js lookAt: x = up × z, y = z × x) on tässä
// x = z × up, y = x × z, jolloin tekstin jx, jy ja kuva osuvat pinnalle täsmälleen kuten webissä.
//
// WEBIN SÄÄTIMET oletusarvoin (?avain 8,5, ?tayte 0,12, ?rivit 0,75, ?tykki 1,6, ?kaikutayte 0,5, ?kaikuvoima 1,5).
// Avainvalon varjo on oma varjokartta (2048, lähi 0,6, kauko 2,2, keila 32° kuten webin SpotLight.shadow), koska URP:n
// lisävalojen varjot ovat projektissa pois.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Ajattelijat;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class AjattelijaNayttamo : MonoBehaviour
    {
        public const int Kerros = 13;
        const int Projektoreita = 24, Valoja = 4, VarjoKoko = 2048;
        const float Avain = 8.5f, Tayte = 0.12f, RivitKerroin = 0.75f, TykkiKerroin = 1.6f, KaikuTayte = 0.5f, KaikuVoima = 1.5f;
        const float VarjoLahi = 0.6f, VarjoKauko = 2.2f, VarjoHarha = 0.0015f;
        // Webin tausta #0b0c10 (sRGB, piirretään suoraan näyttöväriin) ja prologin musta.
        static readonly Color TaustaVari = new Color(11 / 255f, 12 / 255f, 16 / 255f);
        static readonly Vector3 Ylos = Vector3.up;

        /// <summary>Näyttämön kuva (AjattelijaNakyma); null, kun näyttämöä ei ole.</summary>
        public static RenderTexture NykyinenKuva { get; private set; }
        public static event Action<RenderTexture> KuvaVaihtui;
        /// <summary>Kuvan skaala ruudun pikseleistä (0 = automaattinen: @3-näytöllä 2/3 eli webin devicePixelRatio ≤ 2).</summary>
        public static float SkaalaOhitus;

        AjattelijaData a;
        Camera kamera;
        RenderTexture kuva, varjo;
        Mesh mesh, peiteMesh;
        Material mat, varjoMat, peiteMat;
        Texture2D normaali, kipsi, kaiku, atlas;
        CommandBuffer varjoKomennot;
        Vector3[] paikat;
        int[] kolmiot;
        Dictionary<int, float> syke;
        public string Virhe { get; private set; }

        // Johdetut (webin avaaAjattelija): osuma otsalla, lentoasento, tykit, kaiku.
        Vector3 osP, osN, lentoC, lentoT, paa, tahtays, remPaikka, remKatse, kaikuTykki, kaikuSuunta;
        float s0, tykki, w;
        List<VirtaRivi> virta;
        readonly List<float> virtaVoima = new List<float>();
        int kaikuIndeksi = -1;
        bool malliValmis;
        float vinjetti, vinjettiAika = -1;
        Vector3 varjoPaikka = new Vector3(float.NaN, 0, 0), varjoKohde;

        readonly Vector4[] px = new Vector4[Projektoreita], py = new Vector4[Projektoreita], pf = new Vector4[Projektoreita],
            pa = new Vector4[Projektoreita], pb = new Vector4[Projektoreita], pc = new Vector4[Projektoreita],
            pd = new Vector4[Projektoreita], pe = new Vector4[Projektoreita], pg = new Vector4[Projektoreita];
        readonly Vector4[] vPaikka = new Vector4[Valoja], vSuunta = new Vector4[Valoja], vVari = new Vector4[Valoja];
        int pMaara;

        static readonly int IdPMaara = Shader.PropertyToID("_PMaara"), IdPX = Shader.PropertyToID("_PX"), IdPY = Shader.PropertyToID("_PY"),
            IdPF = Shader.PropertyToID("_PF"), IdPA = Shader.PropertyToID("_PA"), IdPB = Shader.PropertyToID("_PB"), IdPC = Shader.PropertyToID("_PC"),
            IdPD = Shader.PropertyToID("_PD"), IdPE = Shader.PropertyToID("_PE"), IdPG = Shader.PropertyToID("_PG"),
            IdVPaikka = Shader.PropertyToID("_VPaikka"), IdVSuunta = Shader.PropertyToID("_VSuunta"), IdVVari = Shader.PropertyToID("_VVari"),
            IdTaivas = Shader.PropertyToID("_Taivas"), IdMaa = Shader.PropertyToID("_Maa"), IdVarjoVP = Shader.PropertyToID("_VarjoVP"),
            IdVarjoTiedot = Shader.PropertyToID("_VarjoTiedot"), IdVarjoGpuVP = Shader.PropertyToID("_VarjoGpuVP"),
            IdVarjoValo = Shader.PropertyToID("_VarjoValo"), IdVarjoKauko = Shader.PropertyToID("_VarjoKauko"),
            IdPeite = Shader.PropertyToID("_Peite"), IdHimmennys = Shader.PropertyToID("_HimmennysVari");

        /// <summary>Blender (x, y, z) → Unity (x, z, y).</summary>
        public static Vector3 B(double[] v) => new Vector3((float)v[0], (float)v[2], (float)v[1]);
        /// <summary>Pystykenttä asteina Blenderin pystysensorista (24 mm) ja polttovälistä.</summary>
        public static float KenttaMm(double mm) => (float)(2 * Math.Atan(12 / mm) * 180 / Math.PI);

        public static AjattelijaNayttamo Luo(AjattelijaData a)
        {
            var go = new GameObject("AjattelijaNayttamo") { layer = Kerros };
            var n = go.AddComponent<AjattelijaNayttamo>();
            n.a = a;
            n.w = Avain / 95f;   // Blenderin wateista three.js:n voimaksi (aurinko 95 W = AVAIN)
            n.tykki = Avain * 220f / 95f * TykkiKerroin;
            n.LuoKamera();
            n.LuoMateriaalit();
            n.LataaAtlas();
            return n;
        }

        void LuoKamera()
        {
            var kg = new GameObject("AjattelijaKamera") { layer = Kerros };
            kg.transform.SetParent(transform, false);
            kamera = kg.AddComponent<Camera>();
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = Color.black;
            kamera.cullingMask = 1 << Kerros;
            kamera.nearClipPlane = 0.003f;
            kamera.farClipPlane = 10f;
            kamera.allowHDR = false;     // AgX varjostimessa (kuten three.js), ei jälkikäsittelyä
            kamera.allowMSAA = true;
            var d = kamera.GetUniversalAdditionalCameraData();
            d.renderType = CameraRenderType.Base;
            d.renderPostProcessing = false;
            d.renderShadows = false;
            d.requiresDepthTexture = false;
            d.requiresColorTexture = false;
            VarmistaKuva();
        }

        void LuoMateriaalit()
        {
            mat = new Material(Resources.Load<Shader>("Varjostimet/AjattelijaKipsi")) { name = "AjattelijaKipsi" };
            varjoMat = new Material(Resources.Load<Shader>("Varjostimet/AjattelijaVarjo")) { name = "AjattelijaVarjo" };
            peiteMat = new Material(Resources.Load<Shader>("Varjostimet/AjattelijaPeite")) { name = "AjattelijaPeite" };
            peiteMat.SetColor(IdHimmennys, (Color)Tyylikirja.Himmennys.Tumma);
            // Taulukot kiinteällä pituudella ensimmäisestä asetuksesta (Unity lukitsee taulukon koon).
            AsetaTaulukot();
            mat.SetVectorArray(IdVPaikka, vPaikka); mat.SetVectorArray(IdVSuunta, vSuunta); mat.SetVectorArray(IdVVari, vVari);
            // Peite: koko ruudun kolmio leikkausavaruudessa (varjostin ohittaa matriisit), rajat suuriksi ettei karsiudu.
            peiteMesh = new Mesh { name = "AjattelijaPeite" };
            peiteMesh.vertices = new[] { new Vector3(-1, -1, 0), new Vector3(3, -1, 0), new Vector3(-1, 3, 0) };
            peiteMesh.triangles = new[] { 0, 1, 2 };
            peiteMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 1e5f);
            var pg = new GameObject("AjattelijaPeite") { layer = Kerros };
            pg.transform.SetParent(transform, false);
            pg.AddComponent<MeshFilter>().sharedMesh = peiteMesh;
            var pr = pg.AddComponent<MeshRenderer>();
            pr.sharedMaterial = peiteMat;
            pr.shadowCastingMode = ShadowCastingMode.Off;
            pr.receiveShadows = false;
        }

        void LataaAtlas()
        {
            var ta = Resources.Load<TextAsset>(a.Atlas.Tiedosto);
            if (ta == null) { Virhe = "atlas puuttuu: " + a.Atlas.Tiedosto; return; }
            atlas = LueKuva(ta.bytes, true, "atlas", yksiKanava: true);
            atlas.wrapModeU = TextureWrapMode.Repeat;   // toistorivit (päälause rajataan varjostimessa)
            atlas.wrapModeV = TextureWrapMode.Clamp;
            atlas.anisoLevel = 16;
            mat.SetTexture("_Atlas", atlas);
            Resources.UnloadAsset(ta);
        }

        /// <summary>
        /// PNG/JPG tekstuuriksi (lineaarinen, mipit). Yksikanavainen atlas pidetään R8:na: LoadImage voi antaa RGBA32:n
        /// (4096² = 64 Mt), joten se muunnetaan (16 Mt + mipit).
        /// </summary>
        static Texture2D LueKuva(byte[] tavut, bool mipit, string nimi, bool yksiKanava = false)
        {
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, mipit, true) { name = "Ajattelija:" + nimi };
            if (!t.LoadImage(tavut, false)) { Destroy(t); return null; }
            if (!yksiKanava || t.format == TextureFormat.R8 || t.format == TextureFormat.Alpha8)
            {
                t.Apply(mipit, true);
                return t;
            }
            var r8 = new Texture2D(t.width, t.height, TextureFormat.R8, mipit, true) { name = t.name };
            int bpp = t.format == TextureFormat.RGB24 ? 3 : t.format == TextureFormat.RGBA32 ? 4 : 0;
            var kohde = r8.GetPixelData<byte>(0);
            if (bpp > 0)
            {
                var lahde = t.GetPixelData<byte>(0);
                for (int i = 0; i < kohde.Length; i++) kohde[i] = lahde[i * bpp];
            }
            else
            {
                var p = t.GetPixels32();
                for (int i = 0; i < kohde.Length; i++) kohde[i] = p[i].r;
            }
            Destroy(t);
            r8.Apply(mipit, true);
            return r8;
        }

        void AsetaTaulukot()
        {
            mat.SetInt(IdPMaara, pMaara);
            mat.SetVectorArray(IdPX, px); mat.SetVectorArray(IdPY, py); mat.SetVectorArray(IdPF, pf);
            mat.SetVectorArray(IdPA, pa); mat.SetVectorArray(IdPB, pb); mat.SetVectorArray(IdPC, pc);
            mat.SetVectorArray(IdPD, pd); mat.SetVectorArray(IdPE, pe); mat.SetVectorArray(IdPG, pg);
        }

        void VarmistaKuva()
        {
            float skaala = SkaalaOhitus > 0 ? SkaalaOhitus : Screen.dpi > 300 ? 2f / 3f : 1f;
            int l = Mathf.Max(64, Mathf.RoundToInt(Screen.width * skaala)), k = Mathf.Max(64, Mathf.RoundToInt(Screen.height * skaala));
            if (kuva != null && kuva.width == l && kuva.height == k) return;
            VapautaKuva();
            kuva = new RenderTexture(l, k, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB)
            { name = "AjattelijaKuva", antiAliasing = 4, useMipMap = false };
            kuva.Create();
            kamera.targetTexture = kuva;
            NykyinenKuva = kuva;
            KuvaVaihtui?.Invoke(kuva);
        }

        void VapautaKuva()
        {
            if (kuva == null) return;
            if (kamera != null) kamera.targetTexture = null;
            kuva.Release();
            Destroy(kuva);
            kuva = null;
        }

        // ── Malli ja johdetut paikat ─────────────────────────────────────────────────────────────────

        /// <summary>GLB (L1 + upotettu normaalikartta) → bysti, osuma otsalle, lentoasento ja videotykit.</summary>
        public bool AsetaMalli(byte[] glb, out string virhe)
        {
            virhe = null;
            GlbMalli m;
            try { m = DioraamaGlb.Lue(glb, true); }
            catch (Exception e) { virhe = Virhe = e.Message; return false; }
            var o = m.Osat[0];
            int k = o.Paikat.Length / 3;
            paikat = new Vector3[k];
            var normaalit = new Vector3[k];
            var uv = new Vector2[k];
            for (int i = 0; i < k; i++)
            {
                paikat[i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]);
                if (o.Normaalit != null) normaalit[i] = new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]);
                // glTF:n v alkaa kuvan yläreunasta, Unityn alareunasta.
                if (o.Uv != null) uv[i] = new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]);
            }
            kolmiot = o.Kolmiot;
            mesh = new Mesh { name = "Ajattelija:" + a.Tunnus, indexFormat = k > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            mesh.vertices = paikat;
            mesh.normals = normaalit;
            mesh.uv = uv;
            mesh.triangles = kolmiot;
            if (o.Normaalit == null) mesh.RecalculateNormals();
            mesh.RecalculateTangents();
            mesh.RecalculateBounds();
            var bg = new GameObject("Bysti") { layer = Kerros };
            bg.transform.SetParent(transform, false);
            bg.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = bg.AddComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            var pohja = o.Vari ?? new[] { 0.86f, 0.85f, 0.82f, 1f };
            mat.SetVector("_Pohja", new Vector4(pohja[0], pohja[1], pohja[2], 0.62f));
            mat.SetFloat("_NormaaliPaalla", 0f);
            if (m.Kuvat.Count > 0 && m.Kuvat[0] != null && (normaali = LueKuva(m.Kuvat[0], true, "normaali")) != null)
            {
                normaali.anisoLevel = 8;
                normaali.wrapMode = TextureWrapMode.Repeat;
                mat.SetTexture("_NormalMap", normaali);
                mat.SetFloat("_NormaaliPaalla", 1f);
            }
            if (!Johda(out virhe)) { Virhe = virhe; return false; }
            malliValmis = true;
            return true;
        }

        bool Johda(out string virhe)
        {
            virhe = null;
            paa = B(a.Paa);
            tahtays = B(a.AvainTahtays);
            remPaikka = B(a.Rembrandt.Paikka);
            remKatse = B(a.Rembrandt.Katse);
            var lause = a.Paalause;
            // Säde edestä (Blender y = −2 → +y) otsan kohtaan: osumapiste ja pinnan normaali.
            var alku = B(new[] { lause.Sade[0], -2.0, lause.Sade[1] });
            if (!Osuma(alku, B(new[] { 0.0, 1.0, 0.0 }), 10f, out float t, out osN)) { virhe = "säde ei osu bystiin"; return false; }
            osP = alku + B(new[] { 0.0, 1.0, 0.0 }) * t;
            Lentoasento((float)lause.KameraKulma, (float)lause.KameraMatka);
            // Päälause (CLIP, kromaattinen aberraatio ja syvyyspehmeys).
            var tykinSuunta = (osN + B(lause.Vino)).normalized;
            var tykkiP = osP + tykinSuunta * (float)lause.Etaisyys;
            float nauhaLev = AsetaProjektori(0, tykkiP, osP, (float)lause.Etaisyys, (float)lause.Korkeus, a.Atlas.Paikat[0], (float)lause.Ala,
                ca: (float)a.Ca, syvyys: (float)a.SyvyysTykki);
            s0 = 0.5f + (float)lause.Ala / 2f / nauhaLev;
            // Taustavirta: rivit projektoreille (AjattelijaAikajana.Taustavirta = webin arvonta).
            var tv = a.Taustavirta;
            virta = AjattelijaAikajana.Taustavirta(tv);
            virtaVoima.Clear();
            foreach (var v in virta)
            {
                var pj = tv.Projektorit[v.Projektori];
                var kohde = B(pj.Kohde);
                var paikka = kohde + B(pj.Suunta).normalized * (float)tv.Etaisyys;
                AsetaProjektori(v.I, paikka, kohde, (float)tv.Etaisyys, (float)v.Korkeus, a.Atlas.Paikat[v.I], (float)pj.Ala, (float)tv.Blend,
                    (float)v.Kulma, (float)v.VM, toisto: true);
                virtaVoima.Add(tykki * (float)tv.VoimaKerroin * (float)v.Kirkkaus * RivitKerroin);
            }
            pMaara = 1 + virta.Count;
            mat.SetVector("_PVari", new Vector4((float)a.TykkiVari[0], (float)a.TykkiVari[1], (float)a.TykkiVari[2], 1));
            if (a.Kaiku != null)
            {
                var kk = a.Kaiku;
                kaikuIndeksi = 1 + virta.Count;
                kaikuTykki = osP + (osN + B(kk.Vino)).normalized * (float)kk.Etaisyys;
                kaikuSuunta = (osN + B(kk.KameraSuunta)).normalized;
                mat.SetVector("_PKaikuVari", new Vector4((float)kk.Savy[0], (float)kk.Savy[1], (float)kk.Savy[2], 1));
            }
            AsetaTaulukot();
            return true;
        }

        /// <summary>Lähin osuma bystiin (Möller–Trumbore kaikkiin kolmioihin); normaali säteen puolelle.</summary>
        bool Osuma(Vector3 alku, Vector3 suunta, float pisin, out float t, out Vector3 n)
        {
            t = pisin; n = Vector3.zero;
            bool osui = false;
            for (int i = 0; i < kolmiot.Length; i += 3)
            {
                Vector3 p0 = paikat[kolmiot[i]], p1 = paikat[kolmiot[i + 1]], p2 = paikat[kolmiot[i + 2]];
                Vector3 e1 = p1 - p0, e2 = p2 - p0, h = Vector3.Cross(suunta, e2);
                float det = Vector3.Dot(e1, h);
                if (Mathf.Abs(det) < 1e-12f) continue;
                float f = 1f / det;
                Vector3 s = alku - p0;
                float u = f * Vector3.Dot(s, h);
                if (u < 0 || u > 1) continue;
                Vector3 q = Vector3.Cross(s, e1);
                float v = f * Vector3.Dot(suunta, q);
                if (v < 0 || u + v > 1) continue;
                float tt = f * Vector3.Dot(e2, q);
                if (tt <= 1e-6f || tt >= t) continue;
                t = tt;
                n = Vector3.Cross(e1, e2).normalized;
                osui = true;
            }
            if (osui && Vector3.Dot(n, suunta) > 0) n = -n;
            return osui;
        }

        /// <summary>Webin lentoasento: kamera pinnan alapuolelta katsoen ylös pintaa pitkin; nostetaan, jos pinta peittää.</summary>
        void Lentoasento(float kulma, float matka)
        {
            var u = (Ylos - osN * Vector3.Dot(Ylos, osN)).normalized;
            lentoT = Vector3.Cross(osN, u).normalized;   // webin u × n peilattuna
            float k = kulma * Mathf.Deg2Rad;
            for (int i = 0; i < 8; i++)
            {
                var f = (u * Mathf.Cos(k) - osN * Mathf.Sin(k)).normalized;
                lentoC = osP - f * matka;
                var s = osP - lentoC;
                float pituus = s.magnitude;
                if (!Osuma(lentoC, s / pituus, pituus - 0.004f, out _, out _)) break;
                k += 6f * Mathf.Deg2Rad;
            }
        }

        /// <summary>Webin asetaProjektori: projektorin kanta, atlasrivi, mitat ja keila. Palauttaa nauhan leveyden.</summary>
        float AsetaProjektori(int i, Vector3 paikka, Vector3 kohde, float etaisyys, float nauhaKork, AtlasRivi rivi, float ala,
            float blend = 0.45f, float kulma = 0, float vM = 0, float ca = 0, float syvyys = 0, bool toisto = false,
            bool onKaiku = false, float kuvaLev = 0, float kuvaKork = 0)
        {
            var z = (paikka - kohde).normalized;
            var x = Vector3.Cross(z, Ylos).normalized;
            var y = Vector3.Cross(x, z);
            var f = -z;
            px[i] = new Vector4(x.x, x.y, x.z, -Vector3.Dot(x, paikka));
            py[i] = new Vector4(y.x, y.y, y.z, -Vector3.Dot(y, paikka));
            pf[i] = new Vector4(f.x, f.y, f.z, -Vector3.Dot(f, paikka));
            float lev = onKaiku ? kuvaLev : (float)rivi.Lev, kork = onKaiku ? kuvaKork : (float)rivi.Korkeus;
            float nauhaLev = nauhaKork * lev / kork;
            pa[i] = new Vector4(etaisyys, nauhaLev, nauhaKork, 0);
            pb[i] = new Vector4(Mathf.Cos(kulma), Mathf.Sin(kulma), vM, 0);
            if (onKaiku) pc[i] = new Vector4(0, 1, 0, 1);
            else
            {
                // Atlaksen rivit kankaan koordinaateissa (y alas) → Unityn v (ylös).
                float H = a.Atlas.Korkeus;
                float v0 = (float)rivi.Y / H, v1 = (float)(rivi.Y + rivi.Korkeus) / H;
                float sv0 = (float)(rivi.Y + rivi.Korkeus + 16) / H, sv1 = sv0 + (float)rivi.Korkeus / H;
                pc[i] = rivi.Sumea ? new Vector4(1 - v0, 1 - v1, 1 - sv0, 1 - sv1) : new Vector4(1 - v0, 1 - v1, 1 - v0, 1 - v1);
            }
            pd[i] = new Vector4(onKaiku ? 1 : (float)rivi.UMax, ca, syvyys, toisto ? 1 : 0);
            // Blender: spot_size = 2,4·atan(ala / 2 / etäisyys) koko kulmana, spot_blend reunan pehmeys.
            float puoli = 1.2f * Mathf.Atan(ala / 2f / etaisyys);
            pe[i] = new Vector4(paikka.x, paikka.y, paikka.z, Mathf.Cos(puoli));
            pg[i] = new Vector4(Mathf.Cos(puoli * (1 - blend)), toisto ? 0 : 0.5f, onKaiku ? 1 : 0, 0);
            return nauhaLev;
        }

        public void AsetaKipsi(byte[] tavut)
        {
            if (tavut == null || (kipsi = LueKuva(tavut, true, "kipsi")) == null) return;
            kipsi.wrapMode = TextureWrapMode.Repeat;
            kipsi.anisoLevel = 8;
            mat.SetTexture("_Detalji", kipsi);
            mat.SetFloat("_KipsiPaalla", 1f);
        }

        public void AsetaKaiku(byte[] tavut)
        {
            if (tavut == null || !malliValmis || a.Kaiku == null || (kaiku = LueKuva(tavut, false, "kaiku")) == null) return;
            kaiku.wrapMode = TextureWrapMode.Clamp;
            mat.SetTexture("_Kaiku", kaiku);
            var kk = a.Kaiku;
            float korkeus = (float)kk.Lev * kaiku.height / kaiku.width;
            AsetaProjektori(kaikuIndeksi, kaikuTykki, osP, (float)kk.Etaisyys, korkeus, null, Mathf.Max((float)kk.Lev, korkeus), (float)kk.Blend,
                onKaiku: true, kuvaLev: kaiku.width, kuvaKork: kaiku.height);
            pMaara = kaikuIndeksi + 1;
            AsetaTaulukot();
        }

        /// <summary>Syke (sokrates_syke.py): {"ruutu": kerroin} 30 r/s.</summary>
        public void AsetaSyke(string json)
        {
            try
            {
                var o = Matkakirja.Peli.MiniJson.Objekti(Matkakirja.Peli.MiniJson.Jasenna(json));
                syke = new Dictionary<int, float>();
                foreach (var kv in o)
                    if (int.TryParse(kv.Key, out int r)) syke[r] = Convert.ToSingle(kv.Value, System.Globalization.CultureInfo.InvariantCulture);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA linssit: ajattelijan syke: " + e.Message); }
        }

        // ── Ruutu ────────────────────────────────────────────────────────────────────────────────────

        void AsetaKamera(Vector3 paikka, Vector3 katse, double mm)
        {
            kamera.transform.position = paikka;
            var s = katse - paikka;
            if (s.sqrMagnitude > 1e-12f) kamera.transform.rotation = Quaternion.LookRotation(s, Ylos);
            kamera.fieldOfView = KenttaMm(mm);
        }

        void Spotti(int i, Vector3 paikka, Vector3 kohde, double keilaAsteina, double pehmeys, Vector3 vari, float voima, bool varjo = false)
        {
            var s = (kohde - paikka).normalized;
            double puoli = keilaAsteina / 2 * Math.PI / 180;
            vPaikka[i] = new Vector4(paikka.x, paikka.y, paikka.z, (float)Math.Cos(puoli));
            vSuunta[i] = new Vector4(s.x, s.y, s.z, (float)Math.Cos(puoli * (1 - pehmeys)));
            vVari[i] = new Vector4(vari.x * voima, vari.y * voima, vari.z * voima, varjo && voima > 0 ? 1 : 0);
        }

        (Vector3 paikka, Vector3 katse) Kaari(float osuus)
        {
            var kierto = Quaternion.AngleAxis(-(float)(-a.Kierto + 2 * a.Kierto * osuus), osN);   // webin setFromAxisAngle peilattuna
            var liuku = lentoT * (float)(-a.Liuku + 2 * a.Liuku * osuus);
            return (osP + kierto * (lentoC - osP) + liuku, osP + liuku * 0.5f);
        }

        (Vector3 paikka, Vector3 katse) KaikuKamera(float osuus)
        {
            var kk = a.Kaiku;
            var liuku = lentoT * (float)(kk.KameraLiuku * osuus);
            float matka = (float)(kk.KameraMatka[0] + (kk.KameraMatka[1] - kk.KameraMatka[0]) * osuus);
            return (osP + kaikuSuunta * matka + liuku, osP + liuku);
        }

        /// <summary>Webin asetaPrologi/asetaRuutu: kamera, valot, tykit ja peite ruudussa r (prologi: ruutu p).</summary>
        public void Aseta(bool prologi, double r)
        {
            VarmistaKuva();
            if (!malliValmis) return;
            var t = a.Ajat;
            float vinjettiKohde = 0, lahde = 0;
            for (int i = 0; i < Projektoreita; i++) pb[i].w = 0;
            if (prologi)
            {
                var pr = a.Prologi;
                float h = (float)AjattelijaAikajana.Hehku(pr, r);
                var vari = new Vector3((float)pr.Vari[0], (float)pr.Vari[1], (float)pr.Vari[2]);
                Spotti(0, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                for (int i = 0; i < 2; i++)
                {
                    var v = i < pr.Valot.Count ? pr.Valot[i] : null;
                    if (v == null) { Spotti(1 + i, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0); continue; }
                    Spotti(1 + i, B(v.Paikka), B(v.Kohde), v.Keila, v.Blend, vari, (float)v.Teho * w * h);
                }
                Spotti(3, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                mat.SetVector(IdTaivas, Vector4.zero); mat.SetVector(IdMaa, Vector4.zero);
                kamera.backgroundColor = Color.black;
                AsetaKamera(B(pr.Kamera.Paikka), B(pr.Kamera.Katse), pr.Kamera.Mm);
            }
            else
            {
                kamera.backgroundColor = TaustaVari;
                var kh = AjattelijaAikajana.Kamera(a, r);
                Vector3 paikka, katse; double mm;
                switch (kh.Vaihe)
                {
                    case KameraVaihe.Intro:
                        var o = a.IntroOtokset[kh.Otos];
                        paikka = B(o.Paikka); katse = B(o.Katse); mm = o.Mm; break;
                    case KameraVaihe.Rembrandt:
                        paikka = remPaikka; katse = remKatse; mm = a.Rembrandt.Mm; break;
                    case KameraVaihe.Lahesty:
                    {
                        var l = Kaari(0);
                        float k = (float)kh.K;
                        paikka = Vector3.Lerp(remPaikka, l.paikka, k); katse = Vector3.Lerp(remKatse, l.katse, k);
                        mm = a.Rembrandt.Mm + (a.Linssi - a.Rembrandt.Mm) * k; break;
                    }
                    case KameraVaihe.Kaari:
                    {
                        var l = Kaari((float)kh.Osuus);
                        paikka = l.paikka; katse = l.katse; mm = a.Linssi; break;
                    }
                    default:
                    {
                        var l = Kaari(1);
                        var kp = KaikuKamera((float)kh.Osuus);
                        float k = (float)kh.K;
                        paikka = Vector3.Lerp(l.paikka, kp.paikka, k); katse = Vector3.Lerp(l.katse, kp.katse, k);
                        mm = a.Linssi + (a.Kaiku.KameraMm - a.Linssi) * k; break;
                    }
                }
                AsetaKamera(paikka, katse, mm);
                vinjettiKohde = AjattelijaAikajana.Vinjetti(t, r) ? 1 : 0;
                lahde = (float)AjattelijaAikajana.Nakyvyys(r, t.Lahde, 10);

                // Aurinko: polku introssa, Rembrandt sen jälkeen; hiipuu kaiun ajaksi, samoin maailma.
                var sv = B(AjattelijaAikajana.AuringonSuunta(a, r));
                float hiipuu = (float)AjattelijaAikajana.Hiipuu(a, r);
                var valoP = paa + sv * (float)a.AvainEtaisyys;
                Spotti(0, valoP, tahtays, a.AvainKeila, 1.0, new Vector3(1f, 0.95f, 0.88f), Avain * hiipuu, varjo: true);
                Spotti(1, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                Spotti(2, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                mat.SetVector(IdTaivas, new Vector4(0.9f, 0.92f, 1.0f, 0) * (Tayte * hiipuu));
                mat.SetVector(IdMaa, new Vector4(0.25f, 0.25f, 0.28f, 0) * (Tayte * hiipuu));
                float kaikuK = 1 - hiipuu;
                if (a.Kaiku != null)
                {
                    var kk = a.Kaiku;
                    Spotti(3, osP + B(kk.TayteSuunta).normalized, osP, kk.TayteKeila, kk.TayteBlend,
                        new Vector3((float)kk.TayteVari[0], (float)kk.TayteVari[1], (float)kk.TayteVari[2]), Avain * (float)kk.TayteOsuus * KaikuTayte * kaikuK);
                    if (kaiku != null)
                    {
                        pa[kaikuIndeksi].w = (float)AjattelijaAikajana.KaikuSiirto(a, r);
                        float s = syke != null && syke.TryGetValue((int)Math.Round(r), out var sk) ? sk : 1f;
                        pb[kaikuIndeksi].w = (float)kk.Voima * w * KaikuVoima * kaikuK * s;
                    }
                }
                else Spotti(3, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                if (hiipuu > 0) PiirraVarjo(valoP, tahtays);

                // 38a vierii −s0 → s0; teho nousee ja laskee 6 ruudussa. Taustavirta: häivytys ja siirto = nopeus × ruudut.
                pa[0].w = (float)AjattelijaAikajana.VieritysSiirto(t, r, s0);
                pb[0].w = tykki * (float)AjattelijaAikajana.VieritysTeho(t, r);
                float vk = (float)AjattelijaAikajana.VirtaVoima(a.Taustavirta, r);
                double r0 = a.Taustavirta.Ajat[0];
                for (int i = 0; i < virta.Count; i++)
                {
                    pa[virta[i].I].w = (float)(virta[i].Nopeus * (r - r0));
                    pb[virta[i].I].w = virtaVoima[i] * vk;
                }
            }
            mat.SetVectorArray(IdVPaikka, vPaikka); mat.SetVectorArray(IdVSuunta, vSuunta); mat.SetVectorArray(IdVVari, vVari);
            AsetaTaulukot();
            // Vinjetin CSS-siirtymä 1,2 s; lähteen liukuväri seuraa lähderiviä.
            float nyt = Time.realtimeSinceStartup;
            float dt = vinjettiAika < 0 ? 10f : nyt - vinjettiAika;
            vinjettiAika = nyt;
            vinjetti = Mathf.MoveTowards(vinjetti, vinjettiKohde, dt / 1.2f);
            float turva = Screen.height > 0 ? Screen.safeArea.yMin / Screen.height : 0;
            peiteMat.SetVector(IdPeite, new Vector4(Mathf.SmoothStep(0, 1, vinjetti), lahde, 0.12f + turva, 0));
        }

        /// <summary>Avainvalon varjokartta valon perspektiivistä (vain kun valo liikkuu).</summary>
        void PiirraVarjo(Vector3 valo, Vector3 kohde)
        {
            if (varjo == null)
            {
                varjo = new RenderTexture(VarjoKoko, VarjoKoko, 16, RenderTextureFormat.RHalf, RenderTextureReadWrite.Linear)
                { name = "AjattelijaVarjo", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp };
                varjo.Create();
                mat.SetTexture("_Varjo", varjo);
                varjoKomennot = new CommandBuffer { name = "AjattelijaVarjo" };
            }
            if ((valo - varjoPaikka).sqrMagnitude < 1e-10f && (kohde - varjoKohde).sqrMagnitude < 1e-10f) return;
            varjoPaikka = valo; varjoKohde = kohde;
            var nakyma = Matrix4x4.TRS(valo, Quaternion.LookRotation(kohde - valo, Ylos), new Vector3(1, 1, -1)).inverse;
            var proj = Matrix4x4.Perspective((float)a.AvainKeila, 1f, VarjoLahi, VarjoKauko);
            mat.SetMatrix(IdVarjoVP, proj * nakyma);
            mat.SetVector(IdVarjoTiedot, new Vector4(VarjoLahi, VarjoKauko, VarjoHarha, 1f / VarjoKoko));
            varjoMat.SetMatrix(IdVarjoGpuVP, GL.GetGPUProjectionMatrix(proj, true) * nakyma);
            varjoMat.SetVector(IdVarjoValo, new Vector4(valo.x, valo.y, valo.z, VarjoLahi));
            varjoMat.SetFloat(IdVarjoKauko, VarjoKauko);
            varjoKomennot.Clear();
            varjoKomennot.SetRenderTarget(varjo);
            varjoKomennot.ClearRenderTarget(true, true, Color.white);
            varjoKomennot.DrawMesh(mesh, Matrix4x4.identity, varjoMat, 0, 0);
            Graphics.ExecuteCommandBuffer(varjoKomennot);
        }

        public string Kuvaus() =>
            $"näyttämö {(kuva != null ? $"{kuva.width}×{kuva.height}" : "-")}, malli {(malliValmis ? $"{mesh.vertexCount} kärkeä" : "ei")}"
            + $", normaali {(normaali != null ? normaali.format.ToString() : "-")}, atlas {(atlas != null ? $"{atlas.width}×{atlas.height} {atlas.format}" : "-")}"
            + $", kipsi {(kipsi != null ? "ok" : "-")}, kaiku {(kaiku != null ? $"{kaiku.width}×{kaiku.height}" : "-")}, syke {syke?.Count ?? 0}"
            + $", tykkejä {pMaara}{(Virhe != null ? ", virhe " + Virhe : "")}";

        public void Tuhoa()
        {
            VapautaKuva();
            NykyinenKuva = null;
            KuvaVaihtui?.Invoke(null);
            if (varjo != null) { varjo.Release(); Destroy(varjo); }
            varjoKomennot?.Release();
            foreach (var t in new UnityEngine.Object[] { normaali, kipsi, kaiku, atlas, mesh, peiteMesh, mat, varjoMat, peiteMat })
                if (t != null) Destroy(t);
            if (this != null && gameObject != null) Destroy(gameObject);
        }
    }
}
