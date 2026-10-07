// KAUPUNKIPALLON KUVA (Linssiseppä 2, 7.10.2026; UI/KaupunkiPallot.cs näyttää sen jokaisen sallitun kaupungin napissa).
// Malli: Linnanrakentajan kiinnitetty kuumailmapallo (_valmiit/ilmapallo-v1/glb/ilmapallo_keski.glb, 2 842 kolmiota, oma työ,
// lähteet _valmiit/ilmapallo-v1/LAHTEET.md): yksi verkko, yksi materiaali (64 px palettilaatat Tyylikirjan väreistä), mitat
// metreinä (kuori Ø 12 m, laki 36 m), +Y ylös, origo ankkuripaalun juuressa, pallo kallistuu tuulessa +X:ään (kuvassa peilattuna vasemmalle). Sovelluksen
// mukana (Resources/KaupunkiPallo/ilmapallo_keski.bytes, 171 kt), joten pallot näkyvät heti ilman latausta.
//
//  - Kaikki pallot ovat samanlaisia: kuva piirretään kerran omalla ortokameralla RenderTextureen ja jaetaan napeille.
//  - Kehys: neliö, jonka sivu on mallin korkeus / (1 − AnkkuriOsuus − 2 % yläreuna); origo (köyden pää) kuvan vaakakeskellä
//    ja KaupunkiPalloMitat.AnkkuriOsuus kuvan alareunasta. Kamera katsoo hieman ylhäältä (10°), jotta kori näkyy.
//  - Varjostin: ajattelijapäiden AjattelijaPaa (sama valo ja sävykartoitus kuin päillä kartalla), sävykerroin 1, ei normaalikarttaa.
//  - Oma kerros 13 kuten päät (muut kamerat eivät piirrä sitä), kaukana päistä (x −5000).
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiPalloKuva
    {
        public RenderTexture Kuva;
        public bool Valmis;
        public string Virhe;
        GameObject juuri;
        Camera kamera;
        int piirtoKehyksia;

        const float KameraKallistus = 10f, YlaVara = 0.02f;

        public static KaupunkiPalloKuva Luo(int pikselit)
        {
            var k = new KaupunkiPalloKuva();
            try { k.Rakenna(pikselit); }
            catch (System.Exception e) { k.Virhe = e.Message; Debug.LogWarning("MATKAKIRJA kaupunkipallot: " + e.Message); }
            return k;
        }

        void Rakenna(int pikselit)
        {
            var varjostin = Resources.Load<Shader>("AjattelijaPaa");
            var glb = Resources.Load<TextAsset>("KaupunkiPallo/ilmapallo_keski");
            if (varjostin == null || glb == null) { Virhe = varjostin == null ? "varjostin puuttuu" : "malli puuttuu"; return; }
            var m = DioraamaGlb.Lue(glb.bytes, true);
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
            var verkko = new Mesh { name = "KaupunkiPallo", indexFormat = n > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            verkko.vertices = paikat;
            verkko.normals = normaalit;
            verkko.uv = uv;
            verkko.triangles = o.Kolmiot;
            if (o.Normaalit == null) verkko.RecalculateNormals();
            verkko.RecalculateTangents();
            verkko.RecalculateBounds();

            var mat = new Material(varjostin) { name = "KaupunkiPallo" };
            if (o.Kuva >= 0 && o.Kuva < m.Kuvat.Count && m.Kuvat[o.Kuva] != null)
            {
                // Palettilaatat: ei mipmappeja eikä suodatusta, jottei naapurilaatan väri vuoda reunoille.
                var t = new Texture2D(2, 2, TextureFormat.RGBA32, false, false) { name = "KaupunkiPallo:paletti", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Point };
                if (t.LoadImage(m.Kuvat[o.Kuva], false)) mat.SetTexture("_MainTex", t);
            }
            mat.SetFloat("_NormaaliPaalla", 0f);
            mat.SetVector("_Savy", new Vector4(1f, 1f, 1f, 0f));

            juuri = new GameObject("KaupunkiPalloKuva");
            Object.DontDestroyOnLoad(juuri);
            juuri.transform.position = new Vector3(-5000f, -5000f, 0f);
            var malli = new GameObject("Malli") { layer = AjattelijaPaat.Kerros };
            malli.transform.SetParent(juuri.transform, false);
            // Peilattu x: pallo kallistuu vasemmalle, poispäin pelaajan kaupungin kutsukortista, joka avautuu nastan oikealle
            // puolelle ja peitti oikealle kallistuvan pallon (simu 81409e09 Rooma: napautus osui korttiin). Negatiivinen skaala
            // kääntää kolmioiden kierron, ja Unity vaihtaa culling-suunnan automaattisesti.
            malli.transform.localScale = new Vector3(-1f, 1f, 1f);
            malli.AddComponent<MeshFilter>().sharedMesh = verkko;
            var r = malli.AddComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;

            // Neliökehys: origo vaakakeskellä ja AnkkuriOsuus alareunasta; sivu mallin korkeudesta (ja leveydestä varmuudeksi).
            var b = verkko.bounds;
            float ala = KaupunkiPalloMitat.AnkkuriOsuus;
            float sivu = Mathf.Max(b.max.y / (1f - ala - YlaVara), 2f * Mathf.Max(Mathf.Abs(b.min.x), Mathf.Abs(b.max.x)) * 1.05f);
            Kuva = new RenderTexture(pikselit, pikselit, 16, RenderTextureFormat.ARGB32)
                { name = "KaupunkiPallo", antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
            Kuva.Create();
            var kg = new GameObject("Kamera");
            kg.transform.SetParent(juuri.transform, false);
            // Mallin edestä (DioraamaGlb peilaa z:n, joten edestä = −Z), 10° ylhäältä; ortokamera, jottei pallo vääristy.
            var suunta = Quaternion.Euler(KameraKallistus, 0f, 0f);
            float kesY = sivu * (0.5f - ala);
            kg.transform.localRotation = suunta;
            kg.transform.localPosition = new Vector3(0f, kesY, 0f) - suunta * Vector3.forward * (sivu * 2f);
            kamera = kg.AddComponent<Camera>();
            kamera.orthographic = true;
            kamera.orthographicSize = sivu / 2f;
            kamera.nearClipPlane = 0.1f; kamera.farClipPlane = sivu * 4f;
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = Color.clear;
            kamera.cullingMask = 1 << AjattelijaPaat.Kerros;
            kamera.targetTexture = Kuva;
            kamera.allowHDR = false; kamera.allowMSAA = true;
            kamera.depth = -50;
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null) { d.renderPostProcessing = false; d.renderShadows = false; d.requiresDepthTexture = false; d.requiresColorTexture = false; }
            foreach (var c in Camera.allCameras) if (c != kamera) c.cullingMask &= ~(1 << AjattelijaPaat.Kerros);
            // Valo kuten päillä: ylhäältä ja edestä (kameran koordinaateissa x 0, y cos 58°, z sin 58°).
            float kor = 58f * Mathf.Deg2Rad;
            var valo = kg.transform.TransformDirection(new Vector3(0.35f, Mathf.Cos(kor), -Mathf.Sin(kor))).normalized;
            mat.SetVector("_Valo", valo);
            kamera.enabled = true;
            piirtoKehyksia = 2;
            Valmis = true;
        }

        /// <summary>Joka ruutu: kamera pois, kun kuva on piirretty (RenderTexture säilyttää sen).</summary>
        public void Askel()
        {
            if (kamera == null || !kamera.enabled) return;
            if (piirtoKehyksia-- <= 0) kamera.enabled = false;
        }
    }
}
