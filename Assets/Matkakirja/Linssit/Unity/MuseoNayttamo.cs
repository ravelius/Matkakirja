// TAIDEMUSEON NÄYTTÄMÖ (Linssiseppä 10.10.2026): dioraaman tapa (DioraamaNayttamo) ilman linnan osia: oma juuri, oma kamera
// kerroksessa DioraamaNayttamo.Kerros (9; linssit eivät ole auki yhtä aikaa), kuva RenderTextureen, jonka MuseoTaulu näyttää koko
// ruudulla LinssiUi.MustaKerroksessa (kartan UI jää alle). Volume: Neutral-sävykartoitus (aineistoraportti C2.4: säilyttää
// pohjavärit), hehku minimiin, vinjetti 0,1; samat efektit kuin Filmipino.assetissa, joten variantit säilyvät buildissa.
// Valaistus on MuseoValaistu-varjostimessa (ei Unityn valoja): tämä luokka asettaa globaalit (_MuseoSpot*, _MuseoHaja,
// _MuseoValotus) kameran paikan mukaan joka ruudussa (24 lähintä keilaa, hajavalo pehmeästi osasta toiseen).
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class MuseoNayttamo : MonoBehaviour
    {
        public const int Kerros = DioraamaNayttamo.Kerros;
        public const int Spotteja = 24;
        /// <summary>Taustaväri (ei näy salin sisällä): tumma lämmin harmaa.</summary>
        public static readonly Color Tausta = new Color(0.06f, 0.055f, 0.05f, 1f);
        /// <summary>Kuva-arvon lisävalotus (EV) salin EV100:n päälle; QA-kytkin "museo valotus x".</summary>
        public static float ValotusKorjausEv = 0f;

        static readonly int IdMaara = Shader.PropertyToID("_MuseoSpotMaara"), IdP = Shader.PropertyToID("_MuseoSpotP"),
            IdD = Shader.PropertyToID("_MuseoSpotD"), IdV = Shader.PropertyToID("_MuseoSpotV"),
            IdHaja = Shader.PropertyToID("_MuseoHaja"), IdValotus = Shader.PropertyToID("_MuseoValotus");

        public Camera Kamera { get; private set; }
        public RenderTexture Kuva { get; private set; }
        public static event System.Action<RenderTexture> KuvaVaihtui;
        public static RenderTexture NykyinenKuva { get; private set; }

        Camera pallonKamera;
        Volume volyymi;
        VolumeProfile profiili;
        readonly Vector4[] p = new Vector4[Spotteja], d = new Vector4[Spotteja], v = new Vector4[Spotteja];
        struct Keila { public Vector3 P, D; public float CosUlko, CosSisa; public Vector3 Vari; }
        readonly List<Keila> keilat = new List<Keila>();
        Vector3 haja; float ev = 7f; bool hajaAsetettu;

        public static MuseoNayttamo Luo(Camera pallonKamera)
        {
            var go = new GameObject("MuseoNayttamo");
            var n = go.AddComponent<MuseoNayttamo>();
            n.pallonKamera = pallonKamera;
            n.LuoKamera();
            return n;
        }

        /// <summary>sali.json-koordinaatit (glTF, oikeakätinen) → Unity (vasenkätinen): z käännetään.</summary>
        public static Vector3 U(V3 a) => new Vector3((float)a.X, (float)a.Y, (float)-a.Z);

        void LuoKamera()
        {
            var kg = new GameObject("MuseoKamera");
            kg.transform.SetParent(transform, false);
            Kamera = kg.AddComponent<Camera>();
            Kamera.clearFlags = CameraClearFlags.SolidColor;
            Kamera.backgroundColor = Tausta;
            Kamera.cullingMask = 1 << Kerros;
            Kamera.nearClipPlane = 0.05f;
            Kamera.farClipPlane = 200f;
            Kamera.fieldOfView = 58f;
            Kamera.depth = (pallonKamera != null ? pallonKamera.depth : 0f) + 1f;
            Kamera.allowHDR = true;
            var data = Kamera.GetUniversalAdditionalCameraData();
            data.renderType = CameraRenderType.Base;
            data.renderPostProcessing = true;
            data.renderShadows = false;
            data.requiresDepthTexture = false;
            data.volumeLayerMask = 1 << Kerros;
            Laatutaso.KaytaAjallista(Kamera, Laatutaso.Ajallinen);

            var vg = new GameObject("MuseoVolume") { layer = Kerros };
            vg.transform.SetParent(transform, false);
            volyymi = vg.AddComponent<Volume>();
            volyymi.isGlobal = true;
            volyymi.priority = 100f;
            profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            profiili.name = "MuseoProfiili";
            profiili.Add<Tonemapping>(true).mode.Override(TonemappingMode.Neutral);
            var bloom = profiili.Add<Bloom>(true);
            bloom.threshold.Override(1.4f); bloom.intensity.Override(0.12f); bloom.scatter.Override(0.5f);
            var vinjetti = profiili.Add<Vignette>(true);
            vinjetti.intensity.Override(0.1f); vinjetti.smoothness.Override(0.5f);
            volyymi.profile = profiili;
        }

        /// <summary>Keilat salin ripustuksista (vain ripustetut teokset valaistaan: tyhjä paikka ei hehku).</summary>
        public void AsetaKeilat(Sali s)
        {
            keilat.Clear();
            foreach (var r in s.Ripustukset)
            {
                var k = r.Paikka.Valo; if (k == null) continue;
                double I = MuseoValo.Voimakkuus(k, r.Paikka.Keskipiste, r.Paikka.Normaali);
                var (ulko, sisa) = MuseoValo.Kartio(k);
                var c = MuseoValo.Kelvin(k.Kelvin);
                var suunta = U(k.Suunta).normalized;
                keilat.Add(new Keila { P = U(k.Paikka), D = suunta, CosUlko = (float)ulko, CosSisa = (float)sisa, Vari = new Vector3((float)(c.R * I), (float)(c.G * I), (float)(c.B * I)) });
            }
        }

        /// <summary>Joka ruutu: kameran asento, lähimmät keilat ja osan hajavalo/valotus (pehmeä siirtymä osasta toiseen).</summary>
        public void Paivita(Sali s, MuseoAsento a, float dt)
        {
            VarmistaKuva();
            var kp = U(a.P);
            Kamera.transform.position = kp;
            var katse = U(a.Katse) - kp;
            if (katse.sqrMagnitude > 1e-6f) Kamera.transform.rotation = Quaternion.LookRotation(katse, Vector3.up);

            keilat.Sort((x, y) => (x.P - kp).sqrMagnitude.CompareTo((y.P - kp).sqrMagnitude));
            int n = Mathf.Min(Spotteja, keilat.Count);
            for (int i = 0; i < n; i++)
            {
                var k = keilat[i];
                p[i] = new Vector4(k.P.x, k.P.y, k.P.z, k.CosUlko);
                d[i] = new Vector4(k.D.x, k.D.y, k.D.z, k.CosSisa);
                v[i] = new Vector4(k.Vari.x, k.Vari.y, k.Vari.z, 0);
            }
            Shader.SetGlobalInt(IdMaara, n);
            Shader.SetGlobalVectorArray(IdP, p);
            Shader.SetGlobalVectorArray(IdD, d);
            Shader.SetGlobalVectorArray(IdV, v);

            var osa = s.OsaPisteessa(a.P) ?? s.Osat.Find(o => o.Sisalla(a.P, 1.0));
            if (osa != null)
            {
                var c = MuseoValo.Kelvin(osa.Kelvin);
                double e = MuseoValo.Hajavalo(osa);
                var tavoite = new Vector3((float)(c.R * e), (float)(c.G * e), (float)(c.B * e));
                float w = hajaAsetettu ? 1f - Mathf.Exp(-dt / 0.8f) : 1f;
                haja = Vector3.Lerp(haja, tavoite, w);
                ev = Mathf.Lerp(ev, (float)osa.Ev100, w);
                hajaAsetettu = true;
            }
            Shader.SetGlobalVector(IdHaja, new Vector4(haja.x, haja.y, haja.z, 0));
            Shader.SetGlobalFloat(IdValotus, (float)MuseoValo.Valotus(ev - ValotusKorjausEv));
        }

        void VarmistaKuva()
        {
            int w = Mathf.Max(64, Mathf.RoundToInt(Screen.width * DioraamaNayttamo.KuvaSkaala));
            int h = Mathf.Max(64, Mathf.RoundToInt(Screen.height * DioraamaNayttamo.KuvaSkaala));
            if (Kuva != null && Kuva.width == w && Kuva.height == h) return;
            VapautaKuva();
            Kuva = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "MuseoKuva", antiAliasing = 1, useMipMap = false };
            Kuva.Create();
            Kamera.targetTexture = Kuva;
            NykyinenKuva = Kuva;
            KuvaVaihtui?.Invoke(Kuva);
        }

        void VapautaKuva()
        {
            if (Kuva == null) return;
            if (Kamera != null) Kamera.targetTexture = null;
            Kuva.Release(); Destroy(Kuva); Kuva = null;
        }

        public void Tuhoa()
        {
            VapautaKuva();
            NykyinenKuva = null;
            KuvaVaihtui?.Invoke(null);
            if (profiili != null) Destroy(profiili);
            Destroy(gameObject);
        }
    }
}
