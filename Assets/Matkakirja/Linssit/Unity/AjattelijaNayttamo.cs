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
//
// KIERROKSET 2– (web #3884): kierros vaihtaa päälauseen tykin (oma atlasrivi, kohta edestä tai sivulta), taustavirran
// asettelun (sama 20 riviä, kierroksen siemen) ja yhden kaikupaikan (tekstuuri vaihdetaan; kaiut eivät ole päällekkäin).
// Kamera kulkee pidon jälkeen Blenderin avaimilla (AjattelijaAikajana.Kamerakayra), ensimmäinen avain on oma pito.
//
// AIKAJANA (v13–v14, web 088b64d0c asetaAikajana; data a.Aikajana): koko kohtaus yhtenä aikajanana Blenderin avaimin —
// kamera (leikkaukset ja ajot), aurinko (paikka, energia, väri), ympäristövalo askelina, pyyhkäisy (valo 1), rakovalo
// (valo 2: suorakaidekuvio ja oma varjokartta), varjolevy (näkymätön, vain varjokarttoihin), lainausten videotykki
// (projektori 0; v14 kortti paikallaan ilman kaksoisvalotusta ja syvyyssumeutta), kaksi kaikupaikkaa vuorotellen
// (_Kaiku/_Kaiku2), väistökehät, savumaski ja porrastettu taustavirta (rintama, häivytys, virtakerroin). Kierrokset jäävät
// käyttämättä kuten webissä. Seepia (testikomento, web ?kaikuvari=seepia) palauttaa lämpimän tykki- ja kaikuvärin.
using System;
using System.Collections.Generic;
using System.Linq;
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
        /// <summary>A/B-kokeet webin pariteettiin ("ajattelija koe …"): normaalikartta, kipsi, spekulaari ja reunavalon kerroin.</summary>
        public static bool KoeNormaali = true, KoeKipsi = true;
        public static float KoeSpekulaari = 1f, KoeReuna = 1f;
        /// <summary>Kuvan skaala ruudun pikseleistä (0 = automaattinen: @3-näytöllä 2/3 eli webin devicePixelRatio ≤ 2).</summary>
        public static float SkaalaOhitus;
        /// <summary>Seepia (web ?kaikuvari=seepia, "ajattelija seepia 1"): lämmin tykki- ja kaikuväri aikajana-tilassa.</summary>
        public static bool Seepia;
        /// <summary>Savu pois (web ?savu=0, "ajattelija savu 0").</summary>
        public static bool SavuPois;

        AjattelijaData a;
        Camera kamera;
        RenderTexture kuva;
        Mesh mesh, peiteMesh;
        Material mat, varjoMat, peiteMat;
        Texture2D normaali, kipsi, atlas;
        Vector3[] paikat;
        int[] kolmiot;
        Dictionary<int, float> syke;
        public string Virhe { get; private set; }

        // Johdetut (webin avaaAjattelija): osuma otsalla, lentoasento, tykit, kaiku.
        Vector3 osP, osN, lentoC, lentoT, paa, tahtays, remPaikka, remKatse, kaikuSuunta;
        float tykki, w;
        List<VirtaRivi> virta;
        readonly List<float> virtaVoima = new List<float>();
        int kaikuIndeksi = -1;

        /// <summary>Kierroksen päälausetykki (web lauseTykki + kierroksen ajat); 0 = kierros 1, sitten bystiin osuneet kierrokset 2–.</summary>
        sealed class KierrosTykki
        {
            public AjattelijaPaalause Lause; public AtlasRivi Rivi; public Vector3 Paikka, Kohde; public float S0;
            public double[] Vieritys, Lahde, Virta; public uint Siemen; public double Alku;
        }
        /// <summary>Kierroksen kaiku (web kaiut[k]): kuva latautuu ämpäristä, Tk null siihen asti.</summary>
        sealed class KaikuPaikka
        {
            public string Kuva; public Vector3 Paikka, Kohde; public double Etaisyys, Lev, Blend, Voima, Liuku;
            public double[] Ruudut, Savy, Tayte; public Texture2D Tk;
        }
        readonly List<KierrosTykki> kierrokset = new List<KierrosTykki>();
        readonly List<KaikuPaikka> kaiut = new List<KaikuPaikka>();   // kierroksittain, null = ei kaikua
        List<double[]> kaikuIkkunat = new List<double[]>();
        int nykyKierros = -1;
        Func<double, AjattelijaOtos> kierrosKamera;
        // Kaiun täyte (web tayteMalli = kierroksen 1 kaiun täyte tai oletus); paikka seuraa kierroksen kaikua.
        double tayteOsuus, tayteKeila, tayteBlend;
        Vector3 tayteVari, tayteP, tayteKohde;
        bool tayteAsetettu;
        bool malliValmis;
        /// <summary>
        /// Valmistelu (valintakortin aikana, AjattelijatSovitin): kamera pois päältä, pieni kuva (sama muoto ja MSAA, joten
        /// varjostinten tilat käännetään samoina), kuvaa ei julkaista. Aktivoi() ottaa näyttämön käyttöön napautuksessa.
        /// </summary>
        bool valmistelu;
        public bool MalliValmis => malliValmis;
        float vinjetti, vinjettiAika = -1;
        // Varjokartat: 0 aurinko (2048, lähi 0,6, kauko 2,2), 2 rakovalo (1024, lähi 0,3, kauko 1,8; web rako.shadow).
        VarjoKartta varjoAurinko, varjoRako;

        // ── Aikajana (v13–v14) ──
        AjattelijaAikajanaData aj;
        Func<double, AjattelijaOtos> kameraAj;
        Func<double, (double[] paikka, double energia, double[] vari)> aurinkoAj;
        Vector3 auringonKohde;
        sealed class AjTykki
        {
            public AikajanaTykki T; public AtlasRivi Rivi; public Vector3 PaikkaT, KohdeT; public float Korkeus, Ala, S0; public double Alku, Loppu;
        }
        sealed class AjKaiku
        {
            public AikajanaKaiku K; public string Kuva; public bool Varissa, Sovita; public Vector3 PaikkaT, KohdeT; public Texture2D Tk;
        }
        readonly List<AjTykki> tykitAj = new List<AjTykki>();
        readonly List<AjKaiku> kaiutAj = new List<AjKaiku>();
        readonly List<(Vector3 kohde, double sade, double[] ruudut)> vaistot = new List<(Vector3, double, double[])>();
        readonly int[] kaikuPaikassa = { -1, -1 };
        int tykkiNyt = -1;
        bool kaikuVarissa;   // viimeksi suunnattu kaikukuva on valmiiksi värissä (sarjan seepiaversio): valo neutraali
        double virranAlku, porrasLoppu;
        Mesh levyMesh;
        Texture2D savu;
        readonly Vector4[] vaistoT = new Vector4[4];
        static readonly double[] PerusVari = { 1.0, 0.95, 0.88 };

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
            IdPeite = Shader.PropertyToID("_Peite"), IdHimmennys = Shader.PropertyToID("_HimmennysVari"),
            IdVaisto = Shader.PropertyToID("_PVaisto"), IdSavuTila = Shader.PropertyToID("_SavuTila"), IdSavuKanava = Shader.PropertyToID("_SavuKanava"),
            IdVKuvio = Shader.PropertyToID("_VKuvio"), IdPVari = Shader.PropertyToID("_PVari"), IdPKaikuVari = Shader.PropertyToID("_PKaikuVari"),
            IdKaikuMuoto = Shader.PropertyToID("_PKaikuMuoto"), IdPeiteTausta = Shader.PropertyToID("_PeiteTausta");

        /// <summary>Blender (x, y, z) → Unity (x, z, y).</summary>
        public static Vector3 B(double[] v) => new Vector3((float)v[0], (float)v[2], (float)v[1]);
        /// <summary>Unity → Blender (sama vaihto; webin t2b).</summary>
        static double[] UB(Vector3 v) => new double[] { v.x, v.z, v.y };
        /// <summary>Pystykenttä asteina Blenderin pystysensorista (24 mm) ja polttovälistä.</summary>
        public static float KenttaMm(double mm) => (float)(2 * Math.Atan(12 / mm) * 180 / Math.PI);

        /// <summary>
        /// Näyttämö (kamera, musta kuva, materiaalit). atlas = esivalmisteltu tekstiatlas (AtlasTekstuuri), null = myöhemmin
        /// AsetaAtlas-kutsulla; lataaAtlas = vanha tie (atlas puretaan heti pääsäikeellä).
        /// </summary>
        public static AjattelijaNayttamo Luo(AjattelijaData a, Texture2D atlasValmis = null, bool lataaAtlas = false, bool valmistelu = false)
        {
            var go = new GameObject("AjattelijaNayttamo") { layer = Kerros };
            var n = go.AddComponent<AjattelijaNayttamo>();
            n.a = a;
            n.valmistelu = valmistelu;
            n.w = Avain / 95f;   // Blenderin wateista three.js:n voimaksi (aurinko 95 W = AVAIN)
            n.tykki = Avain * 220f / 95f * TykkiKerroin;
            n.LuoKamera();
            n.LuoMateriaalit();
            if (atlasValmis != null) n.AsetaAtlas(atlasValmis);
            else if (lataaAtlas) n.LataaAtlas();
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
            // sRGB-arvoina SetVectorilla: SetColor linearisoisi värin, ja varjostin sekoittaa sRGB:nä (AjattelijaPeite.hlsl).
            var h = (Color)Tyylikirja.Himmennys.Tumma;
            peiteMat.SetVector(IdHimmennys, new Vector4(h.r, h.g, h.b, h.a));
            // Taulukot kiinteällä pituudella ensimmäisestä asetuksesta (Unity lukitsee taulukon koon).
            AsetaTaulukot();
            mat.SetVectorArray(IdVPaikka, vPaikka); mat.SetVectorArray(IdVSuunta, vSuunta); mat.SetVectorArray(IdVVari, vVari);
            mat.SetVectorArray(IdVaisto, vaistoT);
            mat.SetFloat("_VKuvioEtaisyys", (float)AjattelijaAikajana.RakoEtaisyys);
            varjoAurinko = new VarjoKartta(mat, varjoMat, 0, VarjoKoko, VarjoLahi, VarjoKauko);
            varjoRako = new VarjoKartta(mat, new Material(varjoMat) { name = "AjattelijaVarjoRako" }, 2, 1024, 0.3f, 1.8f);
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

        /// <summary>Atlas pääsäikeellä (varatie, jos esivalmistelu puuttuu).</summary>
        public void LataaAtlas()
        {
            var ta = Resources.Load<TextAsset>(a.Atlas.Tiedosto);
            if (ta == null) { Virhe = "atlas puuttuu: " + a.Atlas.Tiedosto; return; }
            AsetaAtlas(LueKuva(ta.bytes, true, "atlas", yksiKanava: true));
            Resources.UnloadAsset(ta);
        }

        /// <summary>Atlas käyttöön (omistus näyttämölle).</summary>
        public void AsetaAtlas(Texture2D t)
        {
            if (t == null || atlas != null) return;
            atlas = t;
            atlas.wrapModeU = TextureWrapMode.Repeat;   // toistorivit (päälause rajataan varjostimessa)
            atlas.wrapModeV = TextureWrapMode.Clamp;
            atlas.anisoLevel = 16;
            mat.SetTexture("_Atlas", atlas);
        }

        // ── ESIVALMISTELU (Päätoimittaja 3.10.2026: napautuksesta kytkimeen ≤ 1,5 s; "malli 1925 ms" pääsäikeellä) ──────
        // Valintakortin aikana: atlaksen PNG ja GLB puretaan taustasäikeellä (PuraHarmaaPng, DioraamaGlb.Lue), tekstuurit
        // luodaan pääsäikeellä ruutu kerrallaan (AtlasTekstuuri, NormaaliKuva, KipsiKuva). Napautuksen jälkeen jää vain
        // verkon kokoaminen ja säteet (AsetaMalli(GlbMalli, …)).

        /// <summary>Muuntimen harmaasävy-PNG raa'aksi R8-dataksi (AjattelijaData.PuraHarmaaPng, säieturvallinen).</summary>
        public static (int lev, int kork, byte[] data)? PuraHarmaaPng(byte[] png) => AjattelijaData.PuraHarmaaPng(png);

        /// <summary>Puretusta atlaksesta R8-tekstuuri mippeineen (pääsäie).</summary>
        public static Texture2D AtlasTekstuuri((int lev, int kork, byte[] data)? purettu)
        {
            if (purettu == null) return null;
            var (lev, kork, data) = purettu.Value;
            var t = new Texture2D(lev, kork, TextureFormat.R8, true, true) { name = "Ajattelija:atlas" };
            t.SetPixelData(data, 0);
            t.Apply(true, true);
            return t;
        }

        /// <summary>GLB:n upotettu normaalikartta (pääsäie); null, jos ei ole.</summary>
        public static Texture2D NormaaliKuva(GlbMalli m) =>
            m != null && m.Kuvat.Count > 0 && m.Kuvat[0] != null ? LueKuva(m.Kuvat[0], true, "normaali") : null;

        /// <summary>Kipsin mikronormaali (pääsäie).</summary>
        public static Texture2D KipsiKuva(byte[] tavut) => tavut == null ? null : LueKuva(tavut, true, "kipsi");

        /// <summary>
        /// PNG/JPG tekstuuriksi (lineaarinen, mipit). Yksikanavainen atlas pidetään R8:na: LoadImage voi antaa RGBA32:n
        /// (4096² = 64 Mt), joten se muunnetaan (16 Mt + mipit).
        /// </summary>
        static Texture2D LueKuva(byte[] tavut, bool mipit, string nimi, bool yksiKanava = false)
        {
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, mipit, true) { name = "Ajattelija:" + nimi };
            if (!t.LoadImage(tavut, false)) { Destroy(t); return null; }
            // LoadImage ei säilytä lineaarisuutta (A/B 2.10.: kipsin mikronormaali sRGB-purettuna vinoutti normaalit ja kirkasti
            // reunavalon ~3×): data kopioidaan lineaariseen tekstuuriin (normaalikartat, kipsi, kaiku ja atlas ovat dataa, web NoColorSpace).
            if (t.isDataSRGB)
            {
                var l = new Texture2D(t.width, t.height, t.format, mipit, true) { name = t.name };
                l.SetPixelData(t.GetPixelData<byte>(0), 0);
                Destroy(t);
                t = l;
            }
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
            if (valmistelu) l = k = 64;
            if (kuva != null && kuva.width == l && kuva.height == k) return;
            VapautaKuva();
            kuva = new RenderTexture(l, k, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB)
            { name = "AjattelijaKuva", antiAliasing = 4, useMipMap = false };
            kuva.Create();
            kamera.targetTexture = kuva;
            if (valmistelu) { kamera.enabled = false; return; }
            NykyinenKuva = kuva;
            KuvaVaihtui?.Invoke(kuva);
        }

        /// <summary>
        /// Lämmitys valmistelussa: yksi aikajanan ruutu kaikilla valoilla (aurinko, rako, varjolevy → molemmat varjokartat)
        /// ja kuva pieneen kohteeseen, jotta Metal kääntää kipsi-, peite- ja varjovarjostimet ennen napautusta.
        /// </summary>
        public void Lammita()
        {
            if (!malliValmis) return;
            Aseta(false, a.Aikajana != null ? 140 : a.Ajat.Kysymys[0]);
            kamera.Render();
            Aseta(true, 1);
            kamera.Render();
        }

        /// <summary>Valmisteltu näyttämö käyttöön: täysikokoinen kuva julkaistaan ja kamera päälle.</summary>
        public void Aktivoi()
        {
            if (!valmistelu) return;
            valmistelu = false;
            VarmistaKuva();
            if (NykyinenKuva != kuva) { NykyinenKuva = kuva; KuvaVaihtui?.Invoke(kuva); }
            kamera.enabled = true;
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
            GlbMalli m;
            try { m = DioraamaGlb.Lue(glb, true); }
            catch (Exception e) { virhe = Virhe = e.Message; return false; }
            return AsetaMalli(m, NormaaliKuva(m), out virhe);
        }

        /// <summary>Esivalmisteltu malli ja normaalikartta (omistus näyttämölle).</summary>
        public bool AsetaMalli(GlbMalli m, Texture2D normaaliValmis, out string virhe)
        {
            virhe = null;
            if (m == null || m.Osat.Count == 0) { virhe = Virhe = "malli tyhjä"; if (normaaliValmis != null) Destroy(normaaliValmis); return false; }
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
            if ((normaali = normaaliValmis) != null)
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
            if (!Kohta(lause.Sade, null, out osP, out osN)) { virhe = "säde ei osu bystiin"; return false; }
            Lentoasento((float)lause.KameraKulma, (float)lause.KameraMatka);
            // Taustavirta: rivit projektoreille (AjattelijaAikajana.Taustavirta = webin arvonta).
            var tv = a.Taustavirta;
            AsetaVirta(tv.Siemen);
            kaikuIndeksi = 1 + virta.Count;
            mat.SetVector("_PVari", new Vector4((float)a.TykkiVari[0], (float)a.TykkiVari[1], (float)a.TykkiVari[2], 1));
            // Kierros 1: päälause (CLIP, kromaattinen aberraatio ja syvyyspehmeys) ja kaiku otsalla.
            kierrokset.Clear();
            kaiut.Clear();
            kierrokset.Add(LauseTykki(lause, osP, osN, a.Atlas.Paikat[0], a.Ajat.Vieritys, a.Ajat.Lahde, tv.Ajat, tv.Siemen, 0));
            kaiut.Add(null);
            // Aikajana-tilassa kaiut tulevat aikajanasta (web kk = AJ ? null : a.kaiku) eikä kierroksia käytetä.
            aj = a.Aikajana;
            if (aj != null)
            {
                nykyKierros = 0;
                JohdaAikajana();
                AsetaTaulukot();
                return true;
            }
            var kk = a.Kaiku;
            if (kk != null)
            {
                kaiut[0] = new KaikuPaikka
                {
                    Kuva = kk.Kuva, Kohde = osP, Paikka = osP + (osN + B(kk.Vino)).normalized * (float)kk.Etaisyys, Etaisyys = kk.Etaisyys,
                    Lev = kk.Lev, Blend = kk.Blend, Voima = kk.Voima, Liuku = kk.Liuku, Ruudut = a.Ajat.Kaiku, Savy = kk.Savy, Tayte = kk.TayteSuunta,
                };
                kaikuSuunta = (osN + B(kk.KameraSuunta)).normalized;
            }
            tayteOsuus = kk?.TayteOsuus ?? 0.10; tayteKeila = kk?.TayteKeila ?? 45; tayteBlend = kk?.TayteBlend ?? 0.7;
            tayteVari = kk != null ? new Vector3((float)kk.TayteVari[0], (float)kk.TayteVari[1], (float)kk.TayteVari[2]) : new Vector3(0.90f, 0.94f, 1.0f);
            // Kierrokset 2–: päälause edestä tai sivulta, kaiku omaan kohtaansa; bystin ohi menevä kierros jätetään pois (web).
            if (a.Kierrokset != null)
                foreach (var k in a.Kierrokset.Lista)
                {
                    if (!Kohta(k.Lause.Sade, k.Lause.Sivulta, out var kp, out var kn))
                    {
                        Debug.LogWarning("MATKAKIRJA linssit: ajattelijan kierroksen päälause ei osu bystiin " + k.PaalauseAvain);
                        continue;
                    }
                    kierrokset.Add(LauseTykki(k.Lause, kp, kn, a.Atlas.Paikat[k.AtlasRivi], k.Vieritys, k.Lahde, k.Virta, k.Siemen, k.Virta[0]));
                    kaiut.Add(null);
                    var kc = k.Kaiku;
                    if (kc == null || !Kohta(kc.KohdeSade, kc.KohdeSivulta, out var ko, out var kon)) continue;
                    kaiut[kaiut.Count - 1] = new KaikuPaikka
                    {
                        Kuva = kc.Kuva, Kohde = ko, Paikka = ko + (kon + B(kc.Vino)).normalized * (float)kc.Etaisyys, Etaisyys = kc.Etaisyys,
                        Lev = kc.Lev, Blend = !double.IsNaN(kc.Blend) ? kc.Blend : kk?.Blend ?? 0.3, Voima = kc.Voima, Liuku = kc.Liuku,
                        Ruudut = kc.Ruudut, Savy = kc.Savy ?? kk?.Savy ?? new[] { 1.0, 0.78, 0.52 }, Tayte = kc.TayteSuunta ?? kk?.TayteSuunta,
                    };
                }
            // Auringon hiipumisen ikkunat: kaikki kaiut (aurinko ja maailma hiipuvat 45 ruudussa kunkin kaiun ajaksi).
            kaikuIkkunat = kaiut.Where(e => e != null).Select(e => e.Ruudut).ToList();
            nykyKierros = -1;
            AsetaKierros(0);
            // Kierrosten 2– kamera: Blenderin avaimet; ensimmäinen avain (kierroksen 1 pito) tämän näkymän omasta pidosta.
            kierrosKamera = null;
            if (a.Kierrokset != null && kierrokset.Count > 1)
            {
                var pito = kk != null ? KaikuKamera(1) : Kaari(1);
                var avaimet = new List<AjattelijaOtos>
                {
                    new AjattelijaOtos { R = a.Ajat.Pito, Paikka = UB(pito.paikka), Katse = UB(pito.katse), Mm = kk != null ? kk.KameraMm : a.Linssi },
                };
                avaimet.AddRange(a.Kierrokset.Kamera.Skip(1));
                kierrosKamera = AjattelijaAikajana.Kamerakayra(avaimet);
            }
            AsetaTaulukot();
            return true;
        }

        // ── Aikajana (v13–v14, web asetaAikajana) ─────────────────────────────────────────────────────

        /// <summary>Webin aikajana-alustus: kamera, aurinko, lainausten tykit, kaiut, porrastus, väistökehät ja varjolevy.</summary>
        void JohdaAikajana()
        {
            kameraAj = AjattelijaAikajana.AikajanaKamera(aj.Kamera);
            aurinkoAj = AjattelijaAikajana.AikajanaAurinko(aj.AurinkoKohde, aj.Aurinko);
            auringonKohde = B(aj.AurinkoKohde);
            // Lainausten videotykit: yksi projektoripaikka (0), suunnataan lainaus kerrallaan. Kortti (v14): koko kortti mahtuu
            // leveyteen (luvuista nauha_lev_m, muuten lauseKortti.leveys), keila 1,15 × leveys, ei vieritystä.
            tykitAj.Clear();
            foreach (var t in aj.Tykit)
            {
                var rivi = a.Atlas.Paikat[t.AtlasRivi];
                double lev = !double.IsNaN(t.Leveys) ? t.Leveys : aj.KorttiLeveys;
                double korkeus = aj.Kortti ? lev * rivi.Korkeus / rivi.Lev : !double.IsNaN(t.Korkeus) ? t.Korkeus : t.Lause.Korkeus;
                double nauhaLev = korkeus * rivi.Lev / rivi.Korkeus;
                double ala = aj.Kortti ? lev * 1.15 : t.Ala;
                tykitAj.Add(new AjTykki
                {
                    T = t, Rivi = rivi, PaikkaT = B(t.Paikka), KohdeT = B(new[] { t.Paikka[0] + t.Suunta[0] * 0.6, t.Paikka[1] + t.Suunta[1] * 0.6, t.Paikka[2] + t.Suunta[2] * 0.6 }),
                    Korkeus = (float)korkeus, Ala = (float)ala, S0 = (float)(0.5 + ala / 2 / nauhaLev),
                    Alku = t.Energia[0][0], Loppu = t.Energia[t.Energia.Count - 1][0],
                });
            }
            tykkiNyt = -1;
            // Kaiut: kaksi paikkaa vuorotellen (kaiut 1, 3 → _Kaiku; 2, 4 → _Kaiku2). Kaikusarja (web ?kaikusarja, oletus
            // aikajanan kaikusarja): sarjan kuva sovitetaan suurimpaan mittaan omalla mittasuhteellaan; seepiaversio lipulla.
            kaiutAj.Clear();
            for (int j = 0; j < aj.Kaiut.Count; j++)
            {
                var k = aj.Kaiut[j];
                string kuva = KaikunKuva(aj, j, out bool varissa, out bool sovita);
                kaiutAj.Add(new AjKaiku
                {
                    K = k, Kuva = kuva, Varissa = varissa, Sovita = sovita, PaikkaT = B(k.Paikka),
                    KohdeT = B(new[] { k.Paikka[0] + k.Suunta[0] * 0.6, k.Paikka[1] + k.Suunta[1] * 0.6, k.Paikka[2] + k.Suunta[2] * 0.6 }),
                });
            }
            kaikuPaikassa[0] = kaikuPaikassa[1] = -1;
            kaikuVarissa = false;
            mat.SetVector(IdKaikuMuoto, Vector4.zero);
            virranAlku = aj.Virta.FirstOrDefault(x => x[1] > 0)?[0] ?? 0;
            // Porrastus (v14): ala → vasen → oikea → ylä, ylärivit vasta kysymyksen jälkeen.
            porrasLoppu = aj.Porrastus ? AjattelijaAikajana.Porrastus(virta, aj.PorrasAlku, aj.PorrasVali, aj.PorrasHaivytys, a.Ajat.Kysymys[1]) : 0;
            // Väistökehät (v13c) ja v14:n lainauskortit: kortin keskipiste pinnalla säteellä tykin suunnassa, säde 0,6 × leveys,
            // ellei luvuissa jo ole kehää, joka kattaa yli puolet kortin ajasta (alle 5 cm:n päässä).
            vaistot.Clear();
            foreach (var v in aj.Vaisto) vaistot.Add((B(v.Kohde), v.Sade, v.Ruudut));
            if (aj.Kortti)
            {
                int luvuista = vaistot.Count;
                foreach (var t in tykitAj)
                {
                    var suunta = (t.KohdeT - t.PaikkaT).normalized;
                    bool osui = Osuma(t.PaikkaT, suunta, 10f, out float tt, out _);
                    var piste = t.PaikkaT + suunta * tt;
                    bool kattaa = vaistot.Take(luvuista).Any(v => Math.Min(v.ruudut[1], t.Loppu) - Math.Max(v.ruudut[0], t.Alku) > (t.Loppu - t.Alku) / 2
                        && Vector3.Distance(v.kohde, osui ? piste : v.kohde) < 0.05f);
                    double lev = !double.IsNaN(t.T.Leveys) ? t.T.Leveys : aj.KorttiLeveys;
                    if (osui && !kattaa) vaistot.Add((piste, lev * 0.6, new[] { t.Alku, t.Loppu }));
                }
            }
            // Varjolevy (v14b, Sokrates): näkymätön vaakalevy, vain varjokarttoihin ruuduissa ruudut[0]…ruudut[1].
            if (aj.VarjolevyKeski != null)
            {
                var c = B(aj.VarjolevyKeski);
                float hx = (float)aj.VarjolevyKoko[0] / 2, hz = (float)aj.VarjolevyKoko[1] / 2;
                levyMesh = new Mesh { name = "AjattelijaVarjolevy" };
                levyMesh.vertices = new[] { c + new Vector3(-hx, 0, -hz), c + new Vector3(hx, 0, -hz), c + new Vector3(hx, 0, hz), c + new Vector3(-hx, 0, hz) };
                levyMesh.triangles = new[] { 0, 2, 1, 0, 3, 2 };
                levyMesh.bounds = new Bounds(c, new Vector3(2 * hx, 0.01f, 2 * hz));
            }
            AsetaAikajananVarit();
            mat.SetVector(IdSavuTila, Vector4.zero);
            pMaara = kaikuIndeksi + 2;
        }

        /// <summary>Aikajanan kaiun j kuva kaikusarjasta (web sarjanKuva): pelkkä kuva, seepialla seepiaversio, muuten harmaa.</summary>
        static string KaikunKuva(AjattelijaAikajanaData aj, int j, out bool varissa, out bool sovita)
        {
            aj.Kaikusarjat.TryGetValue(aj.Kaikusarja ?? "", out var sarja);
            var e = sarja != null && j < sarja.Count ? sarja[j] : null;
            varissa = false;
            sovita = e != null;
            if (e == null) return aj.Kaiut[j].Kuva;
            if (e.Kuva != null && e.Harmaa == null && e.Seepia == null) return e.Kuva;
            if (Seepia && e.Seepia != null) { varissa = true; return e.Seepia; }
            return e.Harmaa ?? e.Kuva ?? aj.Kaiut[j].Kuva;
        }

        /// <summary>
        /// Kohtauksen ämpäriaineistot (esilataus valintakortin aikana, AjattelijatSovitin): malli, kipsi, kaikukuvat, syke ja
        /// savu tavuina; äänet erikseen (AanetPolut). Samat polut, joita näyttämö pyytää kohtauksen alussa.
        /// </summary>
        public static IEnumerable<string> Aineistot(AjattelijaData a)
        {
            yield return a.Malli;
            yield return a.Kipsi;
            var aj = a.Aikajana;
            if (aj != null)
            {
                for (int j = 0; j < aj.Kaiut.Count; j++) yield return KaikunKuva(aj, j, out _, out _);
                if (!string.IsNullOrEmpty(aj.Syke)) yield return aj.Syke;
                if (aj.SavuKuva != null && !SavuPois) yield return aj.SavuKuva;
                yield break;
            }
            if (a.Kaiku != null) yield return a.Kaiku.Kuva;
            if (a.Kierrokset != null)
            {
                foreach (var k in a.Kierrokset.Lista) if (k.Kaiku != null) yield return k.Kaiku.Kuva;
                if (!string.IsNullOrEmpty(a.Kierrokset.Syke)) yield return a.Kierrokset.Syke;
            }
            else if (!string.IsNullOrEmpty(a.Syke)) yield return a.Syke;
        }

        /// <summary>Tykki- ja kaikuväri (web: aikajanan tykkiVari, väritön 1/1/1; seepialla ajattelijan lämmin tykki.vari ja kaiun sävy).</summary>
        void AsetaAikajananVarit()
        {
            var tv = aj.TykkiVari != null && !Seepia ? aj.TykkiVari : a.TykkiVari;
            mat.SetVector(IdPVari, new Vector4((float)tv[0], (float)tv[1], (float)tv[2], 1));
            var kv = kaikuVarissa ? new[] { 1.0, 1.0, 1.0 } : KaikuValo();
            mat.SetVector(IdPKaikuVari, new Vector4((float)kv[0], (float)kv[1], (float)kv[2], 1));
        }

        double[] KaikuValo() => Seepia ? (a.Kaiku?.Savy ?? new[] { 1.0, 0.78, 0.52 }) : (aj.KaikuVari ?? new[] { 1.0, 1.0, 1.0 });

        /// <summary>Webin suuntaaTykki: lainauksen j tykki projektoriin 0 (kortti terävänä: ei ca:ta eikä syvyyssumeutta, pystysiirto).</summary>
        void SuuntaaTykki(int j)
        {
            if (j == tykkiNyt || j < 0 || j >= tykitAj.Count) return;
            tykkiNyt = j;
            var t = tykitAj[j];
            AsetaProjektori(0, t.PaikkaT, t.KohdeT, 0.6f, t.Korkeus, t.Rivi, t.Ala, (float)t.T.Blend,
                vM: aj.Kortti ? (float)aj.KorttiSiirto : 0, ca: aj.Kortti ? 0 : (float)a.Ca, syvyys: aj.Kortti ? 0 : (float)a.SyvyysTykki);
        }

        /// <summary>Webin suuntaaKaiku: kaiun j kuva paikkaan j % 2 (vasta kun kuva on latautunut).</summary>
        void SuuntaaKaiku(int j)
        {
            if (j < 0) return;
            var k = kaiutAj[j];
            int s = j % 2;
            if (kaikuPaikassa[s] == j || k.Tk == null) return;
            kaikuPaikassa[s] = j;
            mat.SetTexture(s == 0 ? "_Kaiku" : "_Kaiku2", k.Tk);
            var muoto = mat.GetVector(IdKaikuMuoto);
            float m = k.Tk.format == TextureFormat.Alpha8 ? 2 : k.Tk.format == TextureFormat.R8 || k.Tk.format == TextureFormat.R16 ? 1 : 0;
            if (s == 0) muoto.x = m; else muoto.y = m;
            mat.SetVector(IdKaikuMuoto, muoto);
            int w = k.Tk.width, h = k.Tk.height;
            // v13b: kuva-alan mitat viennistä (lev, kork); sarjan kuva samaan suurimpaan mittaan, muuten keilasta ja mittasuhteesta.
            bool mitat = !double.IsNaN(k.K.Lev);
            double koko = mitat ? Math.Max(k.K.Lev, k.K.Kork) : k.K.Ala;
            double lev = mitat && !k.Sovita ? k.K.Lev : (w >= h ? koko : koko * w / h);
            double kork = !double.IsNaN(k.K.Kork) && !k.Sovita ? k.K.Kork : lev * h / w;
            kaikuVarissa = k.Varissa;
            AsetaAikajananVarit();
            AsetaProjektori(kaikuIndeksi + s, k.PaikkaT, k.KohdeT, 0.6f, (float)kork, null, (float)Math.Max(lev, kork), (float)k.K.Blend,
                onKaiku: true, kuvaLev: w, kuvaKork: h, kaikuTila: s + 2);
        }

        /// <summary>Webin asetaAikajana: ruutu r (1…aikajana.loppu).</summary>
        void AsetaAikajana(double r, ref float vinjettiKohde, ref float lahde)
        {
            kamera.backgroundColor = TaustaVari;
            var kc = kameraAj(r);
            AsetaKamera(B(kc.Paikka), B(kc.Katse), kc.Mm);
            vinjettiKohde = AjattelijaAikajana.VinjettiAikajana(a.Ajat, r) ? 1 : 0;
            lahde = 0;
            AsetaAikajananVarit();

            // Aurinko avaimista (paikka, energia, väri); ympäristövalo askelina (v14b: 0 silmä- ja partakuvissa).
            var au = aurinkoAj(r);
            var valoP = B(au.paikka);
            var av = au.vari ?? PerusVari;
            float aurinko = (float)au.energia * w;
            Spotti(0, valoP, auringonKohde, a.AvainKeila, 1.0, new Vector3((float)av[0], (float)av[1], (float)av[2]), aurinko, varjo: true);
            double ymp = aj.Ymparisto != null ? AjattelijaAikajana.AskelAvain(aj.Ymparisto, r)[1] : 1;
            float maailma = Tayte * (float)(a.IntroTayte * ymp);
            mat.SetVector(IdTaivas, new Vector4(0.9f, 0.92f, 1.0f, 0) * maailma);
            mat.SetVector(IdMaa, new Vector4(0.25f, 0.25f, 0.28f, 0) * maailma);
            Spotti(3, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);   // kaiun täyte ei ole käytössä aikajanassa
            bool levy = AjattelijaAikajana.RuutuValilla(r, aj.VarjolevyRuudut);
            if (aurinko > 0) varjoAurinko.Piirra(mesh, levy ? levyMesh : null, valoP, auringonKohde, (float)a.AvainKeila);

            // Pyyhkäisy (valo 1): kapea sivuvalo, kohde avaimista tai suunnasta.
            if (aj.Pyyhkaisy)
            {
                var pp = B(aj.PyyhkaisyPaikka);
                Vector3 kohde = aj.PyyhkaisyKohteet != null ? B(AjattelijaAikajana.AvainArvo(aj.PyyhkaisyKohteet, r))
                    : pp + B(aj.PyyhkaisySuunta ?? new[] { 0.0, 1, 0 }) * 0.6f;
                var pv = aj.PyyhkaisyVari ?? PerusVari;
                Spotti(1, pp, kohde, aj.PyyhkaisyKeila, aj.PyyhkaisyBlend, new Vector3((float)pv[0], (float)pv[1], (float)pv[2]),
                    (float)AjattelijaAikajana.AvainArvo(aj.PyyhkaisyEnergia, r) * w);
            }
            else Spotti(1, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);

            // Rakovalo (valo 2, v14b): avaimet askelina, kuvio suorakaide, E = P / A' (kerroin W · RD² / A' × 30), oma varjo.
            if (aj.Rako != null)
            {
                var ra = AjattelijaAikajana.AskelAvain(aj.Rako, r);
                var rj = AjattelijaAikajana.Rako(ra.Koko, ra.KokoY, ra.Spread);
                double e = aj.RakoEnergia != null ? AjattelijaAikajana.AvainArvo(aj.RakoEnergia, r) : ra.Energia;
                var rp = B(ra.Paikka);
                var rk = B(new[] { ra.Paikka[0] + ra.Suunta[0] * AjattelijaAikajana.RakoEtaisyys, ra.Paikka[1] + ra.Suunta[1] * AjattelijaAikajana.RakoEtaisyys,
                    ra.Paikka[2] + ra.Suunta[2] * AjattelijaAikajana.RakoEtaisyys });
                var rv = aj.RakoVari ?? new[] { 1.0, 1.0, 1.0 };
                float keila = (float)(2 * rj.Kulma * 180 / Math.PI);
                // three.js SpotLight penumbra 0 = kova keila; pieni pehmeys välttää smoothstepin nollavälin.
                Spotti(2, rp, rk, keila, 0.002, new Vector3((float)rv[0], (float)rv[1], (float)rv[2]), (float)(Math.Max(0, e) * w * rj.Kerroin), varjo: true);
                mat.SetVector(IdVKuvio, new Vector4((float)(ra.Koko / 2), (float)(ra.KokoY / 2), (float)rj.Sumeus, e > 0 ? 1 : 0));
                if (e > 0) varjoRako.Piirra(mesh, levy ? levyMesh : null, rp, rk, keila);
            }
            else
            {
                Spotti(2, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                mat.SetVector(IdVKuvio, Vector4.zero);
            }

            // Lainaus: tykki, jonka energia-avainten väli sisältää ruudun (muuten seuraava, sammuksissa).
            int j = AjattelijaAikajana.TykkiRuudussa(aj.Tykit, r);
            SuuntaaTykki(j);
            var t = tykitAj[j];
            bool kiintea = aj.Kortti || t.T.Kiintea;
            pa[0].w = kiintea || t.T.Vierii == null ? 0 : (float)AjattelijaAikajana.VieritysSiirto(t.T.Vierii, r, t.S0);
            pb[0].w = tykki * (float)AjattelijaAikajana.AvainArvo(t.T.Energia, r) / 220f;

            // Kaiut: kummassakin paikassa sen hetken kaiku (tai viimeksi ollut).
            float sk = syke != null && syke.TryGetValue((int)Math.Round(r), out var sy) ? sy : 1f;
            for (int s = 0; s < 2; s++)
            {
                int i = AjattelijaAikajana.KaikuPaikassa(aj.Kaiut, s, r);
                int ind = kaikuIndeksi + s;
                if (i < 0) { pb[ind].w = 0; continue; }
                SuuntaaKaiku(i);
                if (kaikuPaikassa[s] != i) { pb[ind].w = 0; continue; }
                var k = aj.Kaiut[i];
                double ka = k.Energia[0][0], kl = k.Energia[k.Energia.Count - 1][0];
                pa[ind].w = (float)AjattelijaAikajana.KaikuSiirto(k.Liuku, new[] { ka, kl }, r);
                pb[ind].w = (float)AjattelijaAikajana.AvainArvo(k.Energia, r) * w * KaikuVoima * sk;
            }

            // Väistökehät: enintään neljä samanaikaista (kaiut ja v14:n lainauskortit).
            int n = 0;
            foreach (var v in vaistot)
            {
                if (n >= 4) break;
                if (!(r > v.ruudut[0] && r < v.ruudut[1])) continue;
                vaistoT[n++] = new Vector4(v.kohde.x, v.kohde.y, v.kohde.z, (float)AjattelijaAikajana.VaistoSade(v.sade, v.ruudut, r));
            }
            for (; n < 4; n++) vaistoT[n] = Vector4.zero;
            mat.SetVectorArray(IdVaisto, vaistoT);

            // Savu (v13c, oletuksena päällä): 8 s:n silmukka, ruutu neljänä kanavana 8 × 8 laatassa.
            if (savu != null && !SavuPois)
            {
                var (su, sv, kanava) = AjattelijaAikajana.SavuRuutu(r, aj.SavuKesto, aj.SavuFps, aj.SavuRuutuja);
                mat.SetVector(IdSavuTila, new Vector4(1, (float)aj.SavuAla, (float)su, (float)sv));
                mat.SetVector(IdSavuKanava, new Vector4(kanava == 0 ? 1 : 0, kanava == 1 ? 1 : 0, kanava == 2 ? 1 : 0, kanava == 3 ? 1 : 0));
            }
            else mat.SetVector(IdSavuTila, Vector4.zero);

            // Taustavirta: porrastettu sisääntulo (v14) tai vaiheittainen kerroin, siirto = nopeus × ruudut virran alusta.
            float vv = (float)aj.VirtaVoima;
            double vk = AjattelijaAikajana.AvainArvo(aj.Virta, r);
            bool kaikki = r >= porrasLoppu;
            for (int i = 0; i < virta.Count; i++)
            {
                var v = virta[i];
                if (aj.Porrastus)
                {
                    var (siirto, rintama, kerroin) = AjattelijaAikajana.PorrasTila(v, r, aj.PorrasHaivytys, aj.PorrasRintama, aj.PorrasReuna, vk, kaikki);
                    pa[v.I].w = (float)siirto;
                    pg[v.I].w = (float)rintama;
                    pb[v.I].w = virtaVoima[i] * vv * (float)kerroin;
                }
                else
                {
                    pa[v.I].w = (float)(v.Nopeus * (r - virranAlku));
                    pg[v.I].w = 0;
                    pb[v.I].w = virtaVoima[i] * vv * (float)vk;
                }
            }
            pMaara = kaikuIndeksi + 2;
        }

        /// <summary>Kohta bystillä (web kohta): sivulta [y, z] säteellä x = 2 → −x tai edestä [x, z] säteellä y = −2 → +y.</summary>
        bool Kohta(double[] sade, double[] sivulta, out Vector3 p, out Vector3 n)
        {
            Vector3 alku, suunta;
            if (sivulta != null) { alku = B(new[] { 2.0, sivulta[0], sivulta[1] }); suunta = B(new[] { -1.0, 0.0, 0.0 }); }
            else { alku = B(new[] { sade[0], -2.0, sade[1] }); suunta = B(new[] { 0.0, 1.0, 0.0 }); }
            p = default;
            if (!Osuma(alku, suunta, 10f, out float t, out n)) return false;
            p = alku + suunta * t;
            return true;
        }

        /// <summary>Webin lauseTykki: paikka normaalin ja vinouden suunnassa, vieritysväli s0 nauhan leveydestä.</summary>
        KierrosTykki LauseTykki(AjattelijaPaalause l, Vector3 p, Vector3 n, AtlasRivi rivi, double[] vieritys, double[] lahde, double[] virtaAjat,
            uint siemen, double alku)
        {
            float nauhaLev = (float)l.Korkeus * (float)rivi.Lev / (float)rivi.Korkeus;
            return new KierrosTykki
            {
                Lause = l, Rivi = rivi, Kohde = p, Paikka = p + (n + B(l.Vino)).normalized * (float)l.Etaisyys, S0 = 0.5f + (float)l.Ala / 2f / nauhaLev,
                Vieritys = vieritys, Lahde = lahde, Virta = virtaAjat, Siemen = siemen, Alku = alku,
            };
        }

        /// <summary>Webin asetaVirta: taustavirran rivit projektoreille 1… siemenellä (kierrokset 2– omalla siemenellään).</summary>
        void AsetaVirta(uint siemen)
        {
            var tv = a.Taustavirta;
            virta = AjattelijaAikajana.Taustavirta(a, siemen);
            virtaVoima.Clear();
            foreach (var v in virta)
            {
                var pj = tv.Projektorit[v.Projektori];
                var kohde = B(pj.Kohde);
                var paikka = kohde + B(pj.Suunta).normalized * (float)tv.Etaisyys;
                // v14: nauha riviTila-kertaisena (kirjaimet atlaksessa 1 / riviTila -kokoisina; koko pinnalla ennallaan).
                AsetaProjektori(v.I, paikka, kohde, (float)tv.Etaisyys, (float)(v.Korkeus * tv.RiviTila), a.Atlas.Paikat[v.I], (float)pj.Ala, (float)tv.Blend,
                    (float)v.Kulma, (float)v.VM, toisto: true);
                virtaVoima.Add(tykki * (float)tv.VoimaKerroin * (float)v.Kirkkaus * RivitKerroin);
            }
        }

        /// <summary>Webin asetaKierros: päälauseen tykki, taustavirran asettelu (siemen vaihtuu) ja kaikupaikka kierrokselle k.</summary>
        void AsetaKierros(int k)
        {
            if (k == nykyKierros) return;
            var edellinen = nykyKierros >= 0 ? kierrokset[nykyKierros] : null;
            nykyKierros = k;
            var kt = kierrokset[k];
            AsetaProjektori(0, kt.Paikka, kt.Kohde, (float)kt.Lause.Etaisyys, (float)kt.Lause.Korkeus, kt.Rivi, (float)kt.Lause.Ala,
                ca: (float)a.Ca, syvyys: (float)a.SyvyysTykki);
            if (edellinen != null && edellinen.Siemen != kt.Siemen) AsetaVirta(kt.Siemen);
            SovitaKaiku(k);
        }

        /// <summary>Webin sovitaKaiku: kaikupaikka kierroksen k kaiulle (tai pois, jos kaikua ei ole tai kuva ei ole vielä latautunut).</summary>
        void SovitaKaiku(int k)
        {
            var e = kaiut[k];
            pMaara = 1 + virta.Count;
            if (e == null) return;
            tayteP = e.Kohde + B(e.Tayte).normalized;
            tayteKohde = e.Kohde;
            tayteAsetettu = true;
            if (e.Tk == null) return;
            mat.SetTexture("_Kaiku", e.Tk);
            mat.SetVector("_PKaikuVari", new Vector4((float)e.Savy[0], (float)e.Savy[1], (float)e.Savy[2], 1));
            float korkeus = (float)e.Lev * e.Tk.height / e.Tk.width;
            AsetaProjektori(kaikuIndeksi, e.Paikka, e.Kohde, (float)e.Etaisyys, korkeus, null, Mathf.Max((float)e.Lev, korkeus), (float)e.Blend,
                onKaiku: true, kuvaLev: e.Tk.width, kuvaKork: e.Tk.height);
            pMaara = kaikuIndeksi + 1;
        }

        /// <summary>Kierroksen (bystiin osuneet) ruudussa r: viimeinen, jonka virran alku on saavutettu (web kierrosRuudussa).</summary>
        int KierrosRuudussa(double r)
        {
            int k = 0;
            for (int j = 1; j < kierrokset.Count; j++) if (r >= kierrokset[j].Alku) k = j;
            return k;
        }

        /// <summary>Nykyisen kierroksen päälause (lähderivin kreikka ja viite).</summary>
        public AjattelijaPaalause Lause => nykyKierros >= 0 ? kierrokset[nykyKierros].Lause : a.Paalause;
        /// <summary>Nykyisen kierroksen lähderivin ruudut.</summary>
        public double[] LahdeAjat => nykyKierros >= 0 ? kierrokset[nykyKierros].Lahde : a.Ajat.Lahde;

        /// <summary>Ladattavat kaikukuvat (kierros, ämpäripolku) bystiin osuneille kaiuille; AsetaMallin jälkeen.</summary>
        public IEnumerable<(int kierros, string kuva)> Kaikukuvat()
        {
            if (aj != null)
            {
                for (int j = 0; j < kaiutAj.Count; j++) yield return (j, kaiutAj[j].Kuva);
                yield break;
            }
            for (int k = 0; k < kaiut.Count; k++) if (kaiut[k] != null) yield return (k, kaiut[k].Kuva);
        }

        /// <summary>Savumaskin ämpäripolku (aikajana, ei "ajattelija savu 0"); null = ei savua.</summary>
        public string SavuKuva => aj != null && !SavuPois ? aj.SavuKuva : null;

        /// <summary>Savumaski latautui (web: ei mippejä, lineaarinen suodatus; ydin → 1 − vahvuus).</summary>
        public void AsetaSavu(byte[] tavut)
        {
            if (tavut == null || aj == null || savu != null) return;
            savu = LueKuva(tavut, false, "savu");
            if (savu == null) return;
            savu.wrapMode = TextureWrapMode.Clamp;
            savu.filterMode = FilterMode.Bilinear;
            mat.SetTexture("_Savu", savu);
            double vahvuus = aj.SavuVahvuus, ydin = aj.SavuYdin;
            mat.SetFloat("_SavuC0", vahvuus > 1 - ydin ? (float)((ydin - (1 - vahvuus)) / vahvuus) : 0f);
            AsetaSavunPehmeys();
        }

        /// <summary>Testikomento `ajattelija savupehmeys <säde>` / `savuharso <0..1>` (NaN = datan arvo); vaikuttaa heti.</summary>
        public static double PehmeysOhitus = double.NaN, HarsoOhitus = double.NaN;

        public void AsetaSavunPehmeys()
        {
            if (aj == null || mat == null) return;
            double r = double.IsNaN(PehmeysOhitus) ? aj.SavuPehmeys : PehmeysOhitus;
            double h = double.IsNaN(HarsoOhitus) ? aj.SavuHarso : HarsoOhitus;
            mat.SetVector("_SavuPehmeys", new Vector4((float)r, (float)h, 0, 0));
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
            bool onKaiku = false, float kuvaLev = 0, float kuvaKork = 0, int kaikuTila = 1)
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
            // z: kaiku (1 kierrokset, 2 _Kaiku, 3 _Kaiku2; web pF.z), w: v14 rintama (asetetaan ruuduittain).
            pg[i] = new Vector4(Mathf.Cos(puoli * (1 - blend)), toisto ? 0 : 0.5f, onKaiku ? kaikuTila : 0, 0);
            return nauhaLev;
        }

        public void AsetaKipsi(byte[] tavut) => AsetaKipsi(KipsiKuva(tavut));

        /// <summary>Esivalmisteltu kipsi (omistus näyttämölle).</summary>
        public void AsetaKipsi(Texture2D t)
        {
            if (t == null) return;
            if (kipsi != null) { Destroy(t); return; }
            kipsi = t;
            kipsi.wrapMode = TextureWrapMode.Repeat;
            kipsi.anisoLevel = 8;
            mat.SetTexture("_Detalji", kipsi);
            mat.SetFloat("_KipsiPaalla", 1f);
        }

        /// <summary>Kierroksen k kaikukuva latautui (Kaikukuvat()); kaikupaikka heti, jos kierros on käynnissä.</summary>
        public void AsetaKaiku(int k, byte[] tavut)
        {
            if (aj != null)
            {
                if (tavut == null || !malliValmis || k < 0 || k >= kaiutAj.Count || kaiutAj[k].Tk != null) return;
                var t = LueKuva(tavut, false, "kaiku" + k);
                if (t == null) return;
                t.wrapMode = TextureWrapMode.Clamp;
                t.anisoLevel = 16;   // terävä myös viistossa (v13b)
                kaiutAj[k].Tk = t;
                return;
            }
            if (tavut == null || !malliValmis || k < 0 || k >= kaiut.Count || kaiut[k] == null || kaiut[k].Tk != null) return;
            var tk = LueKuva(tavut, false, "kaiku" + k);
            if (tk == null) return;
            tk.wrapMode = TextureWrapMode.Clamp;
            kaiut[k].Tk = tk;
            if (k != nykyKierros) return;
            SovitaKaiku(k);
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
            mat.SetFloat("_Spekulaari", KoeSpekulaari);
            mat.SetFloat("_NormaaliPaalla", KoeNormaali && normaali != null ? 1f : 0f);
            mat.SetFloat("_KipsiPaalla", KoeKipsi && kipsi != null ? 1f : 0f);
            if (prologi)
            {
                var pr = a.Prologi;
                float h = (float)AjattelijaAikajana.Hehku(pr, r);
                var vari = new Vector3((float)pr.Vari[0], (float)pr.Vari[1], (float)pr.Vari[2]);
                Spotti(0, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                // Reunavalot valopaikoissa 1–3 (v14: kolmas päälaelle, Linnanrakentaja 78b883452 v14.prologi_valot).
                for (int i = 0; i < 3; i++)
                {
                    var v = i < pr.Valot.Count ? pr.Valot[i] : null;
                    if (v == null) { Spotti(1 + i, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0); continue; }
                    Spotti(1 + i, B(v.Paikka), B(v.Kohde), v.Keila, v.Blend, vari, (float)v.Teho * w * h * KoeReuna);
                }
                mat.SetVector(IdVKuvio, Vector4.zero);
                mat.SetVector(IdTaivas, Vector4.zero); mat.SetVector(IdMaa, Vector4.zero);
                kamera.backgroundColor = Color.black;
                AsetaKamera(B(pr.Kamera.Paikka), B(pr.Kamera.Katse), pr.Kamera.Mm);
            }
            else if (aj != null) AsetaAikajana(r, ref vinjettiKohde, ref lahde);
            else
            {
                kamera.backgroundColor = TaustaVari;
                mat.SetVector(IdVKuvio, Vector4.zero);
                int kierros = KierrosRuudussa(r);
                AsetaKierros(kierros);
                var kt = kierrokset[kierros];
                // Ilman kierrosten kameraa (kierros ei osunut bystiin) kamera jää pitoon kuten webissä.
                var kh = AjattelijaAikajana.Kamera(a, kierrosKamera != null ? r : Math.Min(r, t.Pito));
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
                    case KameraVaihe.Kierrokset:
                    {
                        var c = kierrosKamera(r);
                        paikka = B(c.Paikka); katse = B(c.Katse); mm = c.Mm; break;
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
                lahde = (float)AjattelijaAikajana.Nakyvyys(r, kt.Lahde, 10);

                // Aurinko: polku introssa, Rembrandt sen jälkeen; hiipuu jokaisen kaiun ajaksi, samoin maailma.
                var sv = B(AjattelijaAikajana.AuringonSuunta(a, r));
                float hiipuu = (float)AjattelijaAikajana.Hiipuu(kaikuIkkunat, r);
                var valoP = paa + sv * (float)a.AvainEtaisyys;
                Spotti(0, valoP, tahtays, a.AvainKeila, 1.0, new Vector3(1f, 0.95f, 0.88f), Avain * hiipuu, varjo: true);
                Spotti(1, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                Spotti(2, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                // v11 (web #3892): alkukuvissa maailman täyte intro.tayte-kertaiseksi, varjopuoli lähes mustaksi.
                float maailma = Tayte * hiipuu * (float)AjattelijaAikajana.MaailmaKerroin(a, r);
                mat.SetVector(IdTaivas, new Vector4(0.9f, 0.92f, 1.0f, 0) * maailma);
                mat.SetVector(IdMaa, new Vector4(0.25f, 0.25f, 0.28f, 0) * maailma);
                float kaikuK = 1 - hiipuu;
                // Täyte kierroksen kaiun kohdassa (paikka jää edellisen kaiun kohdalle kierroksella, jolla kaikua ei ole).
                if (tayteAsetettu)
                    Spotti(3, tayteP, tayteKohde, tayteKeila, tayteBlend, tayteVari, Avain * (float)tayteOsuus * KaikuTayte * kaikuK);
                else Spotti(3, Vector3.zero, Vector3.forward, 1, 0, Vector3.zero, 0);
                var e = kaiut[kierros];
                if (e?.Tk != null)
                {
                    pa[kaikuIndeksi].w = (float)AjattelijaAikajana.KaikuSiirto(e.Liuku, e.Ruudut, r);
                    float s = syke != null && syke.TryGetValue((int)Math.Round(r), out var sk) ? sk : 1f;
                    pb[kaikuIndeksi].w = (float)e.Voima * w * KaikuVoima * kaikuK * s;
                }
                if (hiipuu > 0) varjoAurinko.Piirra(mesh, null, valoP, tahtays, (float)a.AvainKeila);

                // Päälause vierii −s0 → s0; teho nousee ja laskee 6 ruudussa. Taustavirta: häivytys ja siirto = nopeus × ruudut.
                pa[0].w = (float)AjattelijaAikajana.VieritysSiirto(kt.Vieritys, r, kt.S0);
                pb[0].w = tykki * (float)AjattelijaAikajana.VieritysTeho(kt.Vieritys, r);
                float vk = (float)AjattelijaAikajana.VirtaVoima(kt.Virta, r);
                double r0 = kt.Virta[0];
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
            // Peite (vinjetti ja lähderivin liukuväri): taustalle peitteen kolmio, bystille kipsin varjostin (sama lasku).
            var peite = new Vector4(Mathf.SmoothStep(0, 1, vinjetti), lahde, 0.12f + turva, 0);
            peiteMat.SetVector(IdPeite, peite);
            mat.SetVector(IdPeite, peite);
            mat.SetVector(IdHimmennys, peiteMat.GetVector(IdHimmennys));
            var bg = kamera.backgroundColor;
            peiteMat.SetVector(IdPeiteTausta, new Vector4(bg.r, bg.g, bg.b, 1));
        }

        /// <summary>
        /// Spottivalon varjokartta valon perspektiivistä (URP:n lisävalojen varjot ovat projektissa pois): bysti ja aikajanan
        /// varjolevy (näkymätön, vain varjo) piirretään AjattelijaVarjo-varjostimella; uudelleen vain, kun valo tai levy muuttuu.
        /// </summary>
        sealed class VarjoKartta
        {
            readonly Material kipsi, varjoMat;
            readonly int indeksi, koko;
            readonly float lahi, kauko;
            RenderTexture rt;
            CommandBuffer komennot;
            Vector3 paikka = new Vector3(float.NaN, 0, 0), kohde;
            float keila;
            Mesh levy;

            public VarjoKartta(Material kipsi, Material varjoMat, int indeksi, int koko, float lahi, float kauko)
            {
                this.kipsi = kipsi; this.varjoMat = varjoMat; this.indeksi = indeksi; this.koko = koko; this.lahi = lahi; this.kauko = kauko;
            }

            public void Piirra(Mesh bysti, Mesh levyNyt, Vector3 valo, Vector3 kohdeNyt, float keilaAsteina)
            {
                string nimi = indeksi == 0 ? "" : "2";
                if (rt == null)
                {
                    rt = new RenderTexture(koko, koko, 16, RenderTextureFormat.RHalf, RenderTextureReadWrite.Linear)
                    { name = "AjattelijaVarjo" + nimi, filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp };
                    rt.Create();
                    kipsi.SetTexture("_Varjo" + nimi, rt);
                    komennot = new CommandBuffer { name = "AjattelijaVarjo" + nimi };
                }
                if ((valo - paikka).sqrMagnitude < 1e-10f && (kohdeNyt - kohde).sqrMagnitude < 1e-10f && keila == keilaAsteina && levy == levyNyt) return;
                paikka = valo; kohde = kohdeNyt; keila = keilaAsteina; levy = levyNyt;
                var nakyma = Matrix4x4.TRS(valo, Quaternion.LookRotation(kohdeNyt - valo, Ylos), new Vector3(1, 1, -1)).inverse;
                var proj = Matrix4x4.Perspective(keilaAsteina, 1f, lahi, kauko);
                kipsi.SetMatrix(indeksi == 0 ? IdVarjoVP : Shader.PropertyToID("_Varjo2VP"), proj * nakyma);
                kipsi.SetVector(indeksi == 0 ? IdVarjoTiedot : Shader.PropertyToID("_Varjo2Tiedot"), new Vector4(lahi, kauko, VarjoHarha, 1f / koko));
                varjoMat.SetMatrix(IdVarjoGpuVP, GL.GetGPUProjectionMatrix(proj, true) * nakyma);
                varjoMat.SetVector(IdVarjoValo, new Vector4(valo.x, valo.y, valo.z, lahi));
                varjoMat.SetFloat(IdVarjoKauko, kauko);
                komennot.Clear();
                komennot.SetRenderTarget(rt);
                komennot.ClearRenderTarget(true, true, Color.white);
                komennot.DrawMesh(bysti, Matrix4x4.identity, varjoMat, 0, 0);
                if (levyNyt != null) komennot.DrawMesh(levyNyt, Matrix4x4.identity, varjoMat, 0, 0);
                Graphics.ExecuteCommandBuffer(komennot);
            }

            public void Tuhoa()
            {
                if (rt != null) { rt.Release(); Destroy(rt); }
                komennot?.Release();
                if (indeksi != 0 && varjoMat != null) Destroy(varjoMat);   // rakovalon oma kopio
            }
        }

        public string Kuvaus() =>
            $"näyttämö {(kuva != null ? $"{kuva.width}×{kuva.height}" : "-")}, malli {(malliValmis ? $"{mesh.vertexCount} kärkeä" : "ei")}"
            + $", normaali {(normaali != null ? $"{normaali.format}{(normaali.isDataSRGB ? " sRGB" : " lin")}" : "-")}, atlas {(atlas != null ? $"{atlas.width}×{atlas.height} {atlas.format}" : "-")}"
            + $", kipsi {(kipsi != null ? (kipsi.isDataSRGB ? "sRGB" : "lin") : "-")}"
            + $", kaiut {(kaiut.Any(e => e != null) ? string.Join("/", kaiut.Where(e => e != null).Select(e => e.Tk != null ? $"{e.Tk.width}×{e.Tk.height}" : "-")) : "-")}"
            + (aj != null
                ? $", aikajana {aj.Loppu:F0} r, lainauksia {tykitAj.Count} (kortti {(aj.Kortti ? "on" : "ei")}), kaiut {string.Join("/", kaiutAj.Select(k => k.Tk != null ? $"{k.Tk.width}×{k.Tk.height}" : "-"))}"
                  + $", savu {(savu != null ? $"{savu.width}×{savu.height}" : "-")}, porrastus {(aj.Porrastus ? porrasLoppu.ToString("F0") : "-")}, seepia {(Seepia ? 1 : 0)}"
                : $", kierros {nykyKierros + 1}/{kierrokset.Count}")
            + $", syke {syke?.Count ?? 0}, tykkejä {pMaara}{(Virhe != null ? ", virhe " + Virhe : "")}";

        public void Tuhoa()
        {
            bool julkaistu = kuva != null && NykyinenKuva == kuva;
            VapautaKuva();
            if (julkaistu) { NykyinenKuva = null; KuvaVaihtui?.Invoke(null); }
            varjoAurinko?.Tuhoa();
            varjoRako?.Tuhoa();
            foreach (var t in new UnityEngine.Object[] { normaali, kipsi, atlas, mesh, peiteMesh, mat, varjoMat, peiteMat, levyMesh, savu })
                if (t != null) Destroy(t);
            foreach (var e in kaiut) if (e?.Tk != null) Destroy(e.Tk);
            foreach (var e in kaiutAj) if (e.Tk != null) Destroy(e.Tk);
            if (this != null && gameObject != null) Destroy(gameObject);
        }
    }
}
