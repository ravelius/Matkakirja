// TAVLIN 3D-NOPAT (Siirtoseppä 5.10.2026; suunnitelma docs/raportit/tavli-suunnitelma-20261005.md kohta 4 "Nopat"):
// Linnanrakentajan noppa.glb (_valmiit/tavli-laudat/v1/nopat, atlas upotettuna; Resources/Pelit/Tavli/noppa-glb.bytes)
// piirretään omalla kameralla RenderTextureen samalla kaavalla kuin ajattelijoiden kipsipäät (UI/AjattelijaPaat.cs):
// DioraamaGlb.Lue(unityyn), AjattelijaPaa-varjostin (normaalikartta pois, sävykerroin = käytetyn nopan himmennys), oma
// kerros 14, kamera päällä vain vierinnän ajan + kaksi ruutua (RenderTexture säilyttää kuvan). Kuva näytetään laudan
// lapsielementissä (ei osumia), varjo laudan omana kerroksena (TavliLauta piirtää Varjot()).
//   - TULOS ENSIN: Tavli.Heita/AsetaHeitto arpoo silmäluvut Satunnainen-lähteestä; nopat vain näyttävät sen (toistettava).
//   - LIIKERATA: heittäjän puoliskolle (vaalea oikea, tumma vasen; pysähtymiskeskukset tavli-mitat.json), kaksi pomppua
//     |cos|-käyrällä, sivuttaisliike ulos hidastuen. Lopussa tahko n ylöspäin: loppuasento = satunnainen kierto pystyakselin
//     ympäri × kierto, joka vie glb:n lapsen "tahko-n" suunnan (Unityn akseleilla, kestää z-peilauksen) ylös; väliasento =
//     loppuasento × pienenevä pyöräytys satunnaisen akselin ympäri (päättyy tarkasti loppuasentoon).
//   - Maailma: laudan kuvan pikseli (px, py) → (px / 100, y, −py / 100) juuren suhteen; kamera kohtisuoraan ylhäältä
//     (ylös = laudan yläreuna), näkökenttä täsmälleen laudan kokoinen tasolla y = 0.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class TavliNopat
    {
        public const int Kerros = 14;
        const string Polku = "Pelit/Tavli/noppa-glb";
        const float Mittakaava = 100f, KameraKorkeus = 40f;
        /// <summary>Vierinnän kesto (suunnitelma 0,6–0,9 s); ensimmäinen kosketus lautaan kohdassa EnsimmainenIsku × Kesto.</summary>
        public const float Kesto = 0.8f, EnsimmainenIsku = 0.2f;
        const int RtLeveys = 1024, RtKorkeus = 768;
        /// <summary>Käytetyn nopan sävykerroin (himmennys).</summary>
        const float Himmea = 0.45f;

        public readonly VisualElement Kuva;
        readonly Action muuttui;
        GameObject juuri;
        Camera kamera;
        RenderTexture rt;
        Mesh verkko;
        Texture2D atlas;
        readonly Material[] mat = new Material[2];
        readonly Transform[] noppa = new Transform[2];
        readonly Vector3[] tahkot = new Vector3[7];
        bool ladattu, virhe, nakyvissa;
        int piirtoKehyksia;
        float alku = -1f, sivu;
        Vector2 oikea, vasen;
        readonly Vector3[] lahto = new Vector3[2], loppu = new Vector3[2], akseli = new Vector3[2];
        readonly Quaternion[] loppuKierto = new Quaternion[2];
        readonly float[] kulma = new float[2];
        readonly bool[] himmea = new bool[2];
        static int seuraava;

        /// <summary>3D-nopat käytössä (glb ja varjostin latautuivat).</summary>
        public bool Toimii => ladattu && !virhe;
        public bool Pyorii => alku >= 0f;

        public TavliNopat(VisualElement lauta, Action muuttui)
        {
            this.muuttui = muuttui;
            Kuva = new VisualElement { pickingMode = PickingMode.Ignore, name = "tavli-nopat" };
            Kuva.style.position = Position.Absolute;
            Kuva.style.left = 0; Kuva.style.top = 0; Kuva.style.right = 0; Kuva.style.bottom = 0;
            Kuva.style.display = DisplayStyle.None;
            lauta.Add(Kuva);
        }

        /// <summary>Lataa nopan (kerran). Pysähtymiskeskukset ja nopan sivu laudan kuvan pikseleinä.</summary>
        public void Lataa(Vector2 oikeaKeskus, Vector2 vasenKeskus, float sivuPx, Vector2 lautaPx)
        {
            oikea = oikeaKeskus; vasen = vasenKeskus; sivu = sivuPx / Mittakaava;
            if (ladattu || virhe) return;
            try { Rakenna(lautaPx); ladattu = true; }
            catch (Exception e)
            {
                virhe = true;
                Debug.LogWarning("MATKAKIRJA tavli: 3D-nopat eivät latautuneet (" + e.Message + "), heitto näkyy tilarivillä");
                Pura();
                virhe = true;
            }
        }

        void Rakenna(Vector2 lautaPx)
        {
            var data = Resources.Load<TextAsset>(Polku) ?? throw new Exception("noppa-glb puuttuu");
            var varjostin = Resources.Load<Shader>("AjattelijaPaa") ?? throw new Exception("varjostin puuttuu");
            var m = DioraamaGlb.Lue(data.bytes, true);
            Resources.UnloadAsset(data);
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
            verkko = new Mesh { name = "TavliNoppa", indexFormat = n > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            verkko.vertices = paikat; verkko.normals = normaalit; verkko.uv = uv; verkko.triangles = o.Kolmiot;
            if (o.Normaalit == null) verkko.RecalculateNormals();
            verkko.RecalculateTangents();
            verkko.RecalculateBounds();

            // Tahkojen suunnat glb:n lapsista "tahko-1" … "tahko-6" (Linnanrakentaja: kestävät akselimuunnoksen).
            foreach (var s in m.Solmut)
                if (s.Nimi != null && s.Nimi.StartsWith("tahko-") && int.TryParse(s.Nimi.Substring(6), out int t) && t >= 1 && t <= 6)
                    tahkot[t] = new Vector3(s.Translation[0], s.Translation[1], s.Translation[2]).normalized;
            for (int t = 1; t <= 6; t++) if (tahkot[t].sqrMagnitude < 0.5f) throw new Exception("tahko-" + t + " puuttuu");

            int vi = o.Kuva >= 0 && o.Kuva < m.Kuvat.Count ? o.Kuva : 0;
            if (vi < m.Kuvat.Count && m.Kuvat[vi] != null)
            {
                atlas = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "TavliNoppa:atlas", wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
                if (!atlas.LoadImage(m.Kuvat[vi], false)) throw new Exception("atlas ei latautunut");
                atlas.Apply(true, true);
            }

            int i0 = seuraava++;
            juuri = new GameObject("TavliNopat");
            UnityEngine.Object.DontDestroyOnLoad(juuri);
            juuri.transform.position = new Vector3(-6000f - i0 * 100f, -5000f, 0f); // kaukana kaikesta (myös AjattelijaPaat 5000, −5000)
            float w = lautaPx.x / Mittakaava, h = lautaPx.y / Mittakaava;
            rt = new RenderTexture(RtLeveys, RtKorkeus, 16, RenderTextureFormat.ARGB32) { name = "TavliNopat", antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
            rt.Create();
            var kg = new GameObject("Kamera");
            kg.transform.SetParent(juuri.transform, false);
            kg.transform.localPosition = new Vector3(w / 2f, KameraKorkeus, -h / 2f);
            kg.transform.localRotation = Quaternion.LookRotation(Vector3.down, Vector3.forward);
            kamera = kg.AddComponent<Camera>();
            kamera.fieldOfView = 2f * Mathf.Atan(h / 2f / KameraKorkeus) * Mathf.Rad2Deg;
            kamera.nearClipPlane = 1f; kamera.farClipPlane = KameraKorkeus + 10f;
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = Color.clear;
            kamera.cullingMask = 1 << Kerros;
            kamera.targetTexture = rt;
            kamera.allowHDR = false; kamera.allowMSAA = true;
            kamera.depth = -50;
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null) { d.renderPostProcessing = false; d.renderShadows = false; d.requiresDepthTexture = false; d.requiresColorTexture = false; }
            kamera.enabled = false;
            foreach (var c in Camera.allCameras) if (c != kamera) c.cullingMask &= ~(1 << Kerros);

            // Valo kohti laudan vasenta yläkulmaa (kuten laudan ja nappuloiden leivottu valo).
            var valo = new Vector4(-0.35f, 1f, 0.35f, 0f).normalized;
            for (int k = 0; k < 2; k++)
            {
                mat[k] = new Material(varjostin) { name = "TavliNoppa:" + k };
                if (atlas != null) mat[k].SetTexture("_MainTex", atlas);
                mat[k].SetFloat("_NormaaliPaalla", 0f);
                mat[k].SetFloat("_Karheus", 0.32f); // glb: roughnessFactor 0,32
                mat[k].SetVector("_Valo", valo);
                mat[k].SetVector("_Savy", Vector4.one);
                var g = new GameObject("Noppa" + k) { layer = Kerros };
                g.transform.SetParent(juuri.transform, false);
                g.transform.localScale = Vector3.one * sivu;
                g.AddComponent<MeshFilter>().sharedMesh = verkko;
                var r = g.AddComponent<MeshRenderer>();
                r.sharedMaterial = mat[k];
                r.shadowCastingMode = ShadowCastingMode.Off;
                r.receiveShadows = false;
                noppa[k] = g.transform;
            }
            Kuva.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(rt));
            UiKerros.Hae().JokaRuutu += Ruutu;
        }

        /// <summary>Vierintä: heittäjä 0 (vaalea, oikea puolisko) tai 1 (tumma, vasen). a ja b = jo arvottu tulos.</summary>
        public void Heita(int a, int b, int heittaja)
        {
            himmea[0] = himmea[1] = false;
            if (!Toimii) return;
            var keskus = heittaja == 0 ? oikea : vasen;
            // Heittäjän puolelta (vaalea alhaalta oikealta, tumma ylhäältä vasemmalta) laudalle; kumpikin noppa omalla kaistallaan.
            float suunta = heittaja == 0 ? 1f : -1f;
            for (int k = 0; k < 2; k++)
            {
                float dx = (k == 0 ? -1f : 1f) * sivu * 0.68f + UnityEngine.Random.Range(-0.15f, 0.15f) * sivu;
                float dy = UnityEngine.Random.Range(-0.12f, 0.12f) * sivu;
                loppu[k] = new Vector3(keskus.x / Mittakaava + dx, sivu / 2f, -keskus.y / Mittakaava + dy);
                lahto[k] = loppu[k] + new Vector3(suunta * sivu * (1.2f + 0.3f * k), sivu * 1.6f, -suunta * sivu * (2.6f + 0.4f * k));
                int arvo = k == 0 ? a : b;
                loppuKierto[k] = Quaternion.AngleAxis(UnityEngine.Random.Range(-35f, 35f), Vector3.up) * Quaternion.FromToRotation(tahkot[arvo], Vector3.up);
                akseli[k] = (Vector3.Cross(new Vector3(-suunta, 0f, suunta), Vector3.up).normalized + UnityEngine.Random.insideUnitSphere * 0.35f).normalized;
                kulma[k] = UnityEngine.Random.Range(540f, 900f);
                mat[k].SetVector("_Savy", Vector4.one);
            }
            alku = Time.realtimeSinceStartup;
            nakyvissa = true;
            Kuva.style.display = DisplayStyle.Flex;
            Asettele(0f);
            kamera.enabled = true;
        }

        /// <summary>Käytetyt silmäluvut himmeiksi (tuplissa ensimmäinen noppa kahden käytön jälkeen, toinen neljän).</summary>
        public void Himmenna(bool eka, bool toka)
        {
            if (himmea[0] == eka && himmea[1] == toka) return;
            himmea[0] = eka; himmea[1] = toka;
            if (!Toimii) return;
            for (int k = 0; k < 2; k++) mat[k].SetVector("_Savy", himmea[k] ? new Vector4(Himmea, Himmea, Himmea, 0f) : Vector4.one);
            Piirra();
        }

        public void Piilota()
        {
            alku = -1f; nakyvissa = false;
            Kuva.style.display = DisplayStyle.None;
            muuttui?.Invoke();
        }

        void Piirra()
        {
            if (!Toimii || !nakyvissa) return;
            kamera.enabled = true;
            piirtoKehyksia = 2;
        }

        void Ruutu()
        {
            if (!Toimii) return;
            if (alku >= 0f)
            {
                float t = Mathf.Clamp01((Time.realtimeSinceStartup - alku) / Kesto);
                Asettele(t);
                muuttui?.Invoke();
                if (t >= 1f) { alku = -1f; piirtoKehyksia = 2; }
                return;
            }
            if (kamera.enabled && piirtoKehyksia-- <= 0) kamera.enabled = false;
        }

        void Asettele(float t)
        {
            float s = 1f - (1f - t) * (1f - t) * (1f - t);
            for (int k = 0; k < 2; k++)
            {
                // Kaksi pomppua: korkeus (1 − t)² · |cos(2,5 π t)| (nollat 0,2, 0,6 ja 1,0).
                float y = (lahto[k].y - loppu[k].y) * (1f - t) * (1f - t) * Mathf.Abs(Mathf.Cos(2.5f * Mathf.PI * t));
                var p = Vector3.Lerp(lahto[k], loppu[k], s);
                p.y = loppu[k].y + y;
                noppa[k].localPosition = p;
                noppa[k].localRotation = loppuKierto[k] * Quaternion.AngleAxis(kulma[k] * (1f - s), akseli[k]);
            }
        }

        /// <summary>Noppien varjot laudan kuvan pikseleinä (TavliLauta piirtää nappulan varjokuvalla): keskus, koko, peitto.</summary>
        public IEnumerable<(Vector2 Px, float Koko, float A)> Varjot()
        {
            if (!Toimii || !nakyvissa) yield break;
            for (int k = 0; k < 2; k++)
            {
                var p = noppa[k].localPosition;
                float h = Mathf.Max(0f, p.y - sivu / 2f) / sivu;
                var px = new Vector2(p.x * Mittakaava + h * sivu * 18f, -p.z * Mittakaava + h * sivu * 18f);
                yield return (px, sivu * Mittakaava * (1.45f + 0.25f * h), 1f / (1f + h));
            }
        }

        public void Pura()
        {
            if (ladattu) UiKerros.Hae().JokaRuutu -= Ruutu;
            ladattu = false; virhe = false; alku = -1f; nakyvissa = false;
            Kuva.style.backgroundImage = StyleKeyword.None;
            Kuva.style.display = DisplayStyle.None;
            if (kamera != null) kamera.targetTexture = null;
            if (rt != null) { rt.Release(); UnityEngine.Object.Destroy(rt); rt = null; }
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            for (int k = 0; k < 2; k++) if (mat[k] != null) { UnityEngine.Object.Destroy(mat[k]); mat[k] = null; }
            if (verkko != null) UnityEngine.Object.Destroy(verkko);
            if (atlas != null) UnityEngine.Object.Destroy(atlas);
            juuri = null; kamera = null; verkko = null; atlas = null;
        }
    }
}
