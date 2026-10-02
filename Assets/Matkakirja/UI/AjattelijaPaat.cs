// AJATTELIJOIDEN KIPSIPÄÄT KARTALLA (Linssiseppä 2.10.2026; omistaja 2.10. klo 12.34, 16.4x ja 16.5x; web #3866
// js/ajattelijapaat.js luoPaanPiirtaja ja KIPSI_KARTALLA ovat malli). Pää ladataan ämpäristä (ajattelijat/kartta/v1/<tunnus>-kartta.glb, Linnanrakentaja
// _valmiit/ajattelijat-kartta/v1: yksi verkko, kipsiväri + normaalikartta 512 px, glTF Y ylös, kasvot +Z, pivot kaulan juuressa)
// ja piirretään omalla kameralla RenderTextureen, jonka UI/Erikoisnostot.cs näyttää PÄÄ-napissa. (UI-kansiossa, koska
// Kartta-kokoonpano ei näe AjattelijatSovitinta.)
//
//  - Kehys: DioraamaGlb (unityyn) peilaa z:n, joten kasvot ovat −Z:ssa ja kamera on webin (0, 0,12, 0,72 × 1,5) peilikuvassa
//    (0, 0,12, −1,08), katse (0, 0,12, 0), fov 30; kangas 1,5 × pää varjolle. Webin kierto (x −12°, y kääntö, XYZ) peilattuna:
//    x +12°, y −kääntö.
//  - Varjo paperille (web ShadowMaterial 0,1 pään takana, peitto 0,26): pään oma siluetti (RenderTexturen alfa) siirrettynä
//    valoa vastaan ja pienennettynä paperin syvyyden perspektiivillä, sumennettuna (AjattelijaVarjo.shader), näytetään pään alla
//    (Varjo). Verkon projektio tasolle (kerros 14, simulaattori 8a201be6) jäi webiä pienemmäksi, joten siitä luovuttiin.
//  - Valo: annetaan webin tapaan kameran koordinaateissa (x oikea, y ylös, z kohti katsojaa) ja muunnetaan maailmaan.
//  - Oma kerros 13 (8 Elava, 9 dioraama, 10 pieni liike, 11 taivas, 12 sijaintipallo); muut kamerat eivät piirrä sitä.
//  - Piirto vain pyydettäessä: kamera päällä kaksi ruutua ja RenderTexture säilyttää kuvan (kuten Sijaintipallo).
using System;
using System.Collections;
using System.IO;
using Matkakirja.Linssit.Ajattelijat;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi ajattelijan pää: RenderTexture (Kuva) ja tila.</summary>
    public sealed class AjattelijaPaa
    {
        public AjattelijaData Data;
        public RenderTexture Kuva, Varjo;
        public bool Valmis;
        public string Virhe;
        internal GameObject Juuri, Malli;
        internal Camera Kamera;
        internal Material Materiaali, VarjoMat;
        internal RenderTexture Vali;
        internal Vector2 ValoXY;
        internal Texture2D Vari, Normaali;
        internal Mesh Verkko;
        internal int PiirtoKehyksia;
        internal bool Purettu;
        /// <summary>Malli valmis (tai epäonnistui): UI piirtää ensimmäisen kuvan.</summary>
        public event Action Latautui;
        internal void Kerro() => Latautui?.Invoke();
    }

    public static class AjattelijaPaat
    {
        public const int Kerros = 13;
        /// <summary>Kipsin sävykerroin (web KIPSI_KARTALLA.savy); A/B `ui erikoisnostot kipsi r g b`.</summary>
        public static Vector4 Savy = new Vector4(1.0f, 1.03f, 1.1f, 0f);
        /// <summary>
        /// Web KIPSI_KARTALLA.varjo peitto 0,26; siluetin siirto (osuus kankaasta) ja mittakaava vastaavat webin paperia 0,1 pään
        /// takana valon korkeudella 58° (webin kuvasta: varjo ~27 % pään korkeudesta leuan alle); sumennuksen askel tekseleinä.
        /// A/B `ui erikoisnostot varjo peitto sumennus siirto mittakaava`.
        /// </summary>
        public static float VarjoPeitto = 0.26f, VarjoSumennus = 1.0f, VarjoSiirto = 0.24f, VarjoMittakaava = 0.85f;
        const float Kangas = 1.5f, KameraZ = -0.72f * Kangas, KameraY = 0.12f, KatseY = 0.12f, Fov = 30f;
        const int MaskiPx = 96;
        static int seuraava;
        static Shader varjostin, varjoVarjostin;

        static string Kansio => Path.Combine(Application.persistentDataPath, "ajattelijat-kartta");

        /// <summary>Luo pään ja aloittaa mallin latauksen (välimuisti → ämpäri). pikselit = RenderTexturen sivu.</summary>
        public static AjattelijaPaa Luo(AjattelijaData a, int pikselit, MonoBehaviour ajaja)
        {
            var p = new AjattelijaPaa { Data = a };
            varjostin ??= Resources.Load<Shader>("AjattelijaPaa");
            varjoVarjostin ??= Resources.Load<Shader>("AjattelijaVarjo");
            if (varjostin == null || varjoVarjostin == null) { p.Virhe = "varjostin puuttuu"; return p; }
            int i = seuraava++;
            p.Juuri = new GameObject("AjattelijaPaa:" + a.Tunnus);
            UnityEngine.Object.DontDestroyOnLoad(p.Juuri);
            // Kaukana kaikesta (muut kamerat eivät piirrä kerrosta, mutta varmuuden vuoksi).
            p.Juuri.transform.position = new Vector3(5000f + i * 10f, -5000f, 0f);

            p.Kuva = new RenderTexture(pikselit, pikselit, 16, RenderTextureFormat.ARGB32)
                { name = "AjattelijaPaa:" + a.Tunnus, antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
            p.Kuva.Create();
            var kg = new GameObject("Kamera");
            kg.transform.SetParent(p.Juuri.transform, false);
            kg.transform.localPosition = new Vector3(0f, KameraY, KameraZ);
            kg.transform.LookAt(p.Juuri.transform.TransformPoint(new Vector3(0f, KatseY, 0f)));
            var k = p.Kamera = kg.AddComponent<Camera>();
            k.fieldOfView = Fov;
            k.nearClipPlane = 0.05f; k.farClipPlane = 5f;
            k.clearFlags = CameraClearFlags.SolidColor;
            k.backgroundColor = Color.clear;
            k.cullingMask = 1 << Kerros;
            k.targetTexture = p.Kuva;
            k.allowHDR = false; k.allowMSAA = true;
            k.depth = -50;
            var d = k.GetUniversalAdditionalCameraData();
            if (d != null) { d.renderPostProcessing = false; d.renderShadows = false; d.requiresDepthTexture = false; d.requiresColorTexture = false; }
            k.enabled = false;
            // Varjo: pään siluetista sumennettuna (Askel) → Varjo (näytetään pään alla).
            p.Vali = new RenderTexture(MaskiPx, MaskiPx, 0, RenderTextureFormat.ARGB32) { name = "AjattelijaVarjoVali", hideFlags = HideFlags.HideAndDontSave };
            p.Varjo = new RenderTexture(MaskiPx, MaskiPx, 0, RenderTextureFormat.ARGB32) { name = "AjattelijaVarjo:" + a.Tunnus, hideFlags = HideFlags.HideAndDontSave };
            p.Vali.Create(); p.Varjo.Create();
            p.VarjoMat = new Material(varjoVarjostin) { name = "AjattelijaVarjo:" + a.Tunnus };
            foreach (var c in Camera.allCameras) if (c != k) c.cullingMask &= ~(1 << Kerros);
            ajaja.StartCoroutine(Lataa(p));
            return p;
        }

        static IEnumerator Lataa(AjattelijaPaa p)
        {
            string polku = p.Data.KarttaGlb;
            if (string.IsNullOrEmpty(polku)) { p.Virhe = "ei kartta.glb:tä"; p.Kerro(); yield break; }
            string tiedosto = Path.Combine(Kansio, Path.GetFileName(polku));
            byte[] glb = null;
            if (File.Exists(tiedosto)) { try { glb = File.ReadAllBytes(tiedosto); } catch (Exception) { } }
            if (glb == null)
            {
                using var r = UnityWebRequest.Get(AjattelijatSovitin.Osoite(polku));
                r.timeout = 60;
                yield return r.SendWebRequest();
                if (p.Purettu) yield break;
                if (r.result != UnityWebRequest.Result.Success) { p.Virhe = $"lataus {r.responseCode} {r.error}"; Debug.LogWarning("MATKAKIRJA erikoisnostot: " + polku + ": " + p.Virhe); p.Kerro(); yield break; }
                glb = r.downloadHandler.data;
                try
                {
                    Directory.CreateDirectory(Kansio);
                    File.WriteAllBytes(tiedosto + ".uusi", glb);
                    if (File.Exists(tiedosto)) File.Delete(tiedosto);
                    File.Move(tiedosto + ".uusi", tiedosto);
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA erikoisnostot: välimuistiin ei voitu kirjoittaa: " + e.Message); }
            }
            if (p.Purettu) yield break;
            try { Rakenna(p, glb); }
            catch (Exception e) { p.Virhe = e.Message; Debug.LogWarning("MATKAKIRJA erikoisnostot: " + p.Data.Tunnus + ": " + e.Message); }
            p.Kerro();
        }

        static void Rakenna(AjattelijaPaa p, byte[] glb)
        {
            var m = DioraamaGlb.Lue(glb, true);
            var o = m.Osat[0];
            int n = o.Paikat.Length / 3;
            var paikat = new Vector3[n];
            var normaalit = new Vector3[n];
            var uv = new Vector2[n];
            for (int i = 0; i < n; i++)
            {
                paikat[i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]);
                if (o.Normaalit != null) normaalit[i] = new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]);
                if (o.Uv != null) uv[i] = new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]);   // glTF:n v ylhäältä, Unityn alhaalta
            }
            p.Verkko = new Mesh { name = "AjattelijaPaa:" + p.Data.Tunnus, indexFormat = n > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            p.Verkko.vertices = paikat;
            p.Verkko.normals = normaalit;
            p.Verkko.uv = uv;
            p.Verkko.triangles = o.Kolmiot;
            if (o.Normaalit == null) p.Verkko.RecalculateNormals();
            p.Verkko.RecalculateTangents();
            p.Verkko.RecalculateBounds();

            p.Materiaali = new Material(varjostin) { name = "AjattelijaPaa:" + p.Data.Tunnus };
            // Kuvat: baseColorTexture (o.Kuva) on kipsiväri, toinen upotettu kuva normaalikartta (Linnanrakentajan vienti).
            int vi = o.Kuva >= 0 && o.Kuva < m.Kuvat.Count ? o.Kuva : -1;
            if (vi >= 0) p.Vari = LueKuva(m.Kuvat[vi], false, "vari");
            for (int i = 0; i < m.Kuvat.Count && p.Normaali == null; i++)
                if (i != vi && m.Kuvat[i] != null) p.Normaali = LueKuva(m.Kuvat[i], true, "normaali");
            if (p.Vari != null) p.Materiaali.SetTexture("_MainTex", p.Vari);
            if (p.Normaali != null) p.Materiaali.SetTexture("_NormalMap", p.Normaali);
            p.Materiaali.SetFloat("_NormaaliPaalla", p.Normaali != null ? 1f : 0f);

            p.Malli = new GameObject("Malli") { layer = Kerros };
            p.Malli.transform.SetParent(p.Juuri.transform, false);
            p.Malli.AddComponent<MeshFilter>().sharedMesh = p.Verkko;
            var r = p.Malli.AddComponent<MeshRenderer>();
            r.sharedMaterial = p.Materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            p.Valmis = true;
        }

        static Texture2D LueKuva(byte[] tavut, bool lineaarinen, string nimi)
        {
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, true, lineaarinen) { name = "AjattelijaPaa:" + nimi, wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
            if (!t.LoadImage(tavut, false)) { UnityEngine.Object.Destroy(t); return null; }
            t.Apply(true, true);
            return t;
        }

        /// <summary>
        /// Piirtää pään: kääntö (aste, + = katsojan oikealle, nenä kohti keskustaa) ja valon suunta kameran koordinaateissa kuten
        /// webissä (x oikea, y ylös, z kohti katsojaa). Kamera on päällä kaksi ruutua; <see cref="Askel"/> sammuttaa sen.
        /// </summary>
        public static void Piirra(AjattelijaPaa p, float kaanto, Vector3 valoKamerassa)
        {
            if (p == null || !p.Valmis || p.Purettu) return;
            var t = p.Juuri.transform;
            // Webin XYZ-järjestys (Rx · Ry) peilattuna: x +12°, y −kääntö.
            p.Malli.transform.localRotation = Quaternion.AngleAxis(ErikoisnostoMitat.KallistusAste, Vector3.right) * Quaternion.AngleAxis(-kaanto, Vector3.up);
            var maailma = p.Kamera.transform.TransformDirection(new Vector3(valoKamerassa.x, valoKamerassa.y, -valoKamerassa.z)).normalized;
            p.Materiaali.SetVector("_Valo", maailma);
            p.Materiaali.SetVector("_Savy", Savy);
            float xy = Mathf.Sqrt(valoKamerassa.x * valoKamerassa.x + valoKamerassa.y * valoKamerassa.y);
            p.ValoXY = xy > 1e-3f ? new Vector2(valoKamerassa.x / xy, valoKamerassa.y / xy) : Vector2.up;
            p.Kamera.enabled = true;
            p.PiirtoKehyksia = 2;
        }

        /// <summary>Joka ruutu: sammuttaa kamerat, joiden kuva on piirretty (RenderTexture säilyttää sen).</summary>
        public static void Askel(AjattelijaPaa p)
        {
            if (p?.Kamera == null || !p.Kamera.enabled) return;
            // Edellisen ruudun pää on piirretty: siluetti siirrettynä valoa vastaan, sumennus vaaka + pysty (viimeisellä peitto).
            float a = VarjoSumennus / MaskiPx;
            p.VarjoMat.SetFloat("_Peitto", 0f);
            p.VarjoMat.SetVector("_Siirto", new Vector4(-p.ValoXY.x * VarjoSiirto, -p.ValoXY.y * VarjoSiirto, 0f, 0f));
            p.VarjoMat.SetFloat("_Mittakaava", VarjoMittakaava);
            p.VarjoMat.SetVector("_Suunta", new Vector4(a, 0f, 0f, 0f));
            Graphics.Blit(p.Kuva, p.Vali, p.VarjoMat, 1);
            p.VarjoMat.SetFloat("_Peitto", VarjoPeitto);
            p.VarjoMat.SetVector("_Siirto", Vector4.zero);
            p.VarjoMat.SetFloat("_Mittakaava", 1f);
            p.VarjoMat.SetVector("_Suunta", new Vector4(0f, a, 0f, 0f));
            Graphics.Blit(p.Vali, p.Varjo, p.VarjoMat, 1);
            if (p.PiirtoKehyksia-- <= 0) p.Kamera.enabled = false;
        }

        /// <summary>Diagnostiikka `ui erikoisnostot varjokuva`: maski ja varjo PNG:ksi Documentsiin, alfan summa ja maksimi.</summary>
        public static string VarjoKuva(AjattelijaPaa p)
        {
            if (p?.Varjo == null) return "ei varjoa";
            string Tallenna(RenderTexture rt, string nimi)
            {
                var vanha = RenderTexture.active;
                RenderTexture.active = rt;
                var t = new Texture2D(rt.width, rt.height, TextureFormat.RGBA32, false);
                t.ReadPixels(new Rect(0, 0, rt.width, rt.height), 0, 0);
                t.Apply(false);
                RenderTexture.active = vanha;
                double summa = 0; float maks = 0;
                foreach (var c in t.GetPixels32()) { summa += c.a; maks = Mathf.Max(maks, c.a); }
                File.WriteAllBytes(Path.Combine(Application.persistentDataPath, "varjo-" + nimi + "-" + p.Data.Tunnus + ".png"), t.EncodeToPNG());
                UnityEngine.Object.Destroy(t);
                return $"{nimi} alfa summa {summa / 255:0} maks {maks:0}";
            }
            return Tallenna(p.Kuva, "paa") + ", " + Tallenna(p.Varjo, "varjo");
        }

        public static void Pura(AjattelijaPaa p)
        {
            if (p == null || p.Purettu) return;
            p.Purettu = true;
            if (p.Kamera != null) p.Kamera.targetTexture = null;
            foreach (var rt in new[] { p.Kuva, p.Varjo, p.Vali })
                if (rt != null) { rt.Release(); UnityEngine.Object.Destroy(rt); }
            if (p.VarjoMat != null) UnityEngine.Object.Destroy(p.VarjoMat);
            if (p.Juuri != null) UnityEngine.Object.Destroy(p.Juuri);
            if (p.Materiaali != null) UnityEngine.Object.Destroy(p.Materiaali);
            if (p.Verkko != null) UnityEngine.Object.Destroy(p.Verkko);
            if (p.Vari != null) UnityEngine.Object.Destroy(p.Vari);
            if (p.Normaali != null) UnityEngine.Object.Destroy(p.Normaali);
        }
    }
}
