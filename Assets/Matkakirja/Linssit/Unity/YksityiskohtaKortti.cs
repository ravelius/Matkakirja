// OPPAAN YKSITYISKOHTAKUVA 3D-KORTTINA (omistaja 7.10. 10.1x, Päätoimittaja 16.5x, juna 163): kuva noin 40 % ruudusta
// NOSTOKORTTI-kehyksessä (varjostin Varjostimet/Nostokortti, värit Tyylikirja.Paperi), 3D-tasona hieman keskustaa kohti
// kääntyneenä; lentää oikealta sisään, pysyy OpasYksityiskohdat.NayttoS ja poistuu kaukaisuuteen oikeaan yläkulmaan. Oma
// URP-overlay-kamera kerroksella 17 kaupunkikameran pinossa (kuten PalloKori). Alakaistassa kuvateksti ja tekijärivi
// (CC BY / BY-SA vaativat maininnan). Yksi kortti kerrallaan; Piilota() vie kortin heti pois (valikko tai chat aukesi).
using System.Collections;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Natiivi;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public sealed class YksityiskohtaKortti
    {
        public const int Kerros = 17;
        /// <summary>Sisääntulo ja poistuminen (s); kortin leveys osuutena ruudun pidemmästä sivusta (enintään 80 % leveydestä).</summary>
        public const float SisaanS = 0.6f, PoisS = 0.8f, LeveysOsuus = 0.4f;
        const float Etaisyys = 10f, Fov = 40f, KaantoAste = 14f, AlaPt = 44f, SisennysOsuus = 0.04f;

        readonly MonoBehaviour o;
        Camera perus, overlay;
        Transform kortti;
        Material mat;
        TextMeshPro teksti;
        Texture2D kuva;
        Coroutine ajo;
        int vuoro;

        public YksityiskohtaKortti(MonoBehaviour omistaja) { o = omistaja; }

        /// <summary>Kortti näkyvissä (sisääntulosta poistumisen loppuun).</summary>
        public bool Nakyy { get; private set; }

        /// <summary>Näyttää kuvan kameran päällä; edellinen kortti poistuu heti. Lataus ennen sisääntuloa (enintään 3 s).</summary>
        public void Nayta(Camera kamera, OpasYksityiskohdat.Kuva k, System.Func<bool> peittaa)
        {
            if (kamera == null || k == null) return;
            Piilota();
            int v = ++vuoro;
            ajo = o.StartCoroutine(Aja(kamera, k, peittaa, v));
        }

        /// <summary>Kortti pois heti (valikko tai chat aukesi, opas sulkeutui).</summary>
        public void Piilota()
        {
            vuoro++;
            if (ajo != null) { o.StopCoroutine(ajo); ajo = null; }
            if (kortti != null) kortti.gameObject.SetActive(false);
            if (kuva != null) { Object.Destroy(kuva); kuva = null; }
            Nakyy = false;
        }

        /// <summary>Kaikki pois (opas suljettu).</summary>
        public void Sulje()
        {
            Piilota();
            PuraKamera();
        }

        /// <summary>Kamera, materiaali ja kortti pois (ei kosketa ladattuun kuvaan eikä käynnissä olevaan ajoon).</summary>
        void PuraKamera()
        {
            if (perus != null && overlay != null)
            {
                var d = perus.GetUniversalAdditionalCameraData();
                if (d != null) d.cameraStack.Remove(overlay);
            }
            if (overlay != null) Object.Destroy(overlay.gameObject);
            if (mat != null) Object.Destroy(mat);
            overlay = null; perus = null; kortti = null; mat = null; teksti = null;
        }

        void Varmista(Camera kamera)
        {
            if (overlay != null && perus == kamera) return;
            // JUURISYY (iPad-simu 21.32, NullReferenceException Aja-kohdassa): Sulje → Piilota tuhosi juuri ladatun kuvan ja pysäytti
            // käynnissä olevan ajon ensimmäisellä kerralla; vain kamera puretaan.
            PuraKamera();
            perus = kamera;
            var go = new GameObject("Yksityiskohtakortti (overlay)") { layer = Kerros };
            go.transform.SetParent(kamera.transform, false);
            overlay = go.AddComponent<Camera>();
            overlay.clearFlags = CameraClearFlags.Depth;
            overlay.cullingMask = 1 << Kerros;
            overlay.fieldOfView = Fov;
            overlay.nearClipPlane = 0.1f; overlay.farClipPlane = 200f;
            overlay.GetUniversalAdditionalCameraData().renderType = CameraRenderType.Overlay;
            var pd = kamera.GetUniversalAdditionalCameraData();
            if (pd != null && !pd.cameraStack.Contains(overlay)) pd.cameraStack.Add(overlay);
            var sh = Resources.Load<Shader>("Varjostimet/Nostokortti");
            // Kortti piirretään ennen tekstiä (iPad-simu 21.42: molemmat läpinäkyvien jonossa 3000, ja käännetyssä kortissa teksti
            // lajittui etäisyydeltään tason taakse → paperi peitti kuvatekstin).
            mat = new Material(sh != null ? sh : Shader.Find("Universal Render Pipeline/Unlit")) { name = "Nostokortti", renderQueue = 2950 };
            mat.SetColor("_Paperi", (Color)Tyylikirja.Paperi.Pinta);
            mat.SetColor("_Reuna", (Color)Tyylikirja.Paperi.Reunus);
            var q = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Object.Destroy(q.GetComponent<Collider>());
            q.name = "Kortti"; q.layer = Kerros;
            q.transform.SetParent(go.transform, false);
            var r = q.GetComponent<MeshRenderer>();
            r.sharedMaterial = mat; r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; r.receiveShadows = false;
            kortti = q.transform;
            var t = new GameObject("Kuvateksti") { layer = Kerros };
            t.transform.SetParent(kortti, false);
            teksti = t.AddComponent<TextMeshPro>();
            var fontti = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.merkit != null ? KarttaKerrokset.Instanssi.merkit.fontti : null;
            if (fontti != null) teksti.font = fontti;
            teksti.alignment = TextAlignmentOptions.Left;
            teksti.color = (Color)Tyylikirja.Paperi.Muste;
            // iPad-simu 21.32: Ellipsis-tila pudotti rivit, kun automaattinen koko ei mahtunut kaistaan → rivit ylivuotavat
            // mieluummin kuin katoavat (CC BY -maininta näkyy aina), koko sovitetaan laajalta alueelta.
            teksti.textWrappingMode = TextWrappingModes.NoWrap;
            teksti.overflowMode = TextOverflowModes.Overflow;
            teksti.enableAutoSizing = true;
            kortti.gameObject.SetActive(false);
        }

        IEnumerator Aja(Camera kamera, OpasYksityiskohdat.Kuva k, System.Func<bool> peittaa, int v)
        {
            using (var p = UnityWebRequestTexture.GetTexture(k.Url, true))
            {
                p.timeout = 3;
                yield return p.SendWebRequest();
                if (v != vuoro) yield break;
                if (p.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA opas: yksityiskohtakuva ei latautunut ({p.responseCode}) {k.Url}"); yield break; }
                kuva = DownloadHandlerTexture.GetContent(p);
            }
            if (kuva == null || (peittaa != null && peittaa())) { Piilota(); yield break; }
            Varmista(kamera);
            overlay.aspect = kamera.aspect;
            mat.SetTexture("_MainTex", kuva);

            // Mitat pisteinä: leveys 40 % pidemmästä sivusta, enintään 80 % leveydestä; kuva-alue säilyttää kuvasuhteen.
            float w = Screen.width, h = Screen.height;
            float lev = Mathf.Min(LeveysOsuus * Mathf.Max(w, h), 0.8f * w);
            float sis = SisennysOsuus * lev, alaPx = AlaPt * Mathf.Max(1f, Screen.dpi > 0 ? Screen.dpi / 163f : 2f);
            float kuvasuhde = kuva.height > 0 ? (float)kuva.width / kuva.height : 1.5f;
            float kork = (lev - 2 * sis) / kuvasuhde + 2 * sis + alaPx;
            mat.SetVector("_Koko", new Vector4(lev, kork, 0, 0));
            mat.SetFloat("_KulmaPt", 12f * lev / 320f);
            mat.SetFloat("_ReunaPt", Mathf.Max(1f, lev / 320f));
            mat.SetFloat("_SisennysPt", sis);
            mat.SetFloat("_AlaPt", alaPx);

            // Ruutupikselit → overlay-kameran tasolle etäisyydellä Etaisyys.
            float yksikko = 2f * Etaisyys * Mathf.Tan(Fov * 0.5f * Mathf.Deg2Rad) / h;
            kortti.localScale = new Vector3(lev * yksikko, kork * yksikko, 1f);
            bool pysty = h > w * 1.2f;
            // Lepopaikka: vaakaruudulla oikealla, pystyssä keskellä yläpuolella (alarivin napit vapaana).
            // Vaakaruudulla oikean reunan napit (tauko ja seuraava, ~0,78 × leveys alkaen) jäävät kortin oikealle puolelle
            // (Päätoimittaja 21.4x, iPad-kuva: kortti peitti ne): oikea reuna enintään 0,74 × leveys (kääntö lähentää oikeaa reunaa).
            float cx = pysty ? 0f : Mathf.Min(0.22f * w, 0.74f * w - 0.5f * w - 0.55f * lev);
            var lepo = new Vector3(cx * yksikko, (pysty ? 0.12f * h : 0.06f * h) * yksikko, Etaisyys);
            var tulo = new Vector3((0.5f * w + lev) * yksikko, lepo.y, Etaisyys);
            var lahto = new Vector3(0.9f * w * yksikko, 0.9f * h * yksikko, Etaisyys * 3f);
            // Kääntö Y:n ympäri: positiivinen kulma kääntää etupinnan (−Z) vasemmalle eli oikealla olevan kortin keskustaa kohti.
            float kaanto = KaantoAste * (pysty ? 0.5f : 1f);

            string rivi = string.IsNullOrWhiteSpace(k.Kuvateksti) ? "" : k.Kuvateksti.Trim();
            string tekija = OpasYksityiskohdat.Tekijarivi(k);
            teksti.text = rivi.Length > 0 && tekija.Length > 0 ? $"{rivi}\n<size=70%>{tekija}</size>" : rivi + tekija;
            // Teksti kortin paikallisissa yksiköissä (kortti 1 × 1): alakaistaan, vasemmalle sisennyksen verran.
            var tt = teksti.rectTransform;
            tt.localScale = new Vector3(1f / (lev * yksikko), 1f / (kork * yksikko), 1f) * yksikko;
            tt.sizeDelta = new Vector2(lev - 2 * sis, alaPx);
            tt.localPosition = new Vector3(0f, -0.5f + (sis * 0.5f + alaPx * 0.5f) / kork, -0.001f);
            // Koko sovitetaan kaistaan (2 riviä: kuvateksti ja tekijä); 1 tekstiyksikkö = 1 ruutupikseli.
            teksti.fontSizeMax = alaPx * 12f; teksti.fontSizeMin = alaPx * 0.05f;
            teksti.alignment = TextAlignmentOptions.MidlineLeft;


            Nakyy = true;
            kortti.gameObject.SetActive(true);
            teksti.ForceMeshUpdate();
            Debug.Log($"MATKAKIRJA opas: yksityiskohtakuvan teksti {teksti.textInfo.characterCount} merkkiä, {teksti.textInfo.lineCount} riviä, koko {teksti.fontSize:F0}, jono {teksti.fontSharedMaterial?.renderQueue}/{mat.renderQueue}");
            Debug.Log($"MATKAKIRJA opas: yksityiskohtakuva näkyviin {k.KohdeId} \"{k.Ankkuri}\" ({kuva.width}×{kuva.height})");
            // Sisään: pehmeä hidastus.
            for (float t = 0f; t < SisaanS; t += Time.unscaledDeltaTime)
            {
                if (peittaa != null && peittaa()) { Piilota(); yield break; }
                float u = 1f - Mathf.Pow(1f - Mathf.Clamp01(t / SisaanS), 3f);
                Aseta(Vector3.Lerp(tulo, lepo, u), Mathf.Lerp(kaanto * 2.2f, kaanto, u), 1f);
                yield return null;
            }
            Aseta(lepo, kaanto, 1f);
            float loppu = Time.unscaledTime + (float)OpasYksityiskohdat.NayttoS - SisaanS;
            while (Time.unscaledTime < loppu)
            {
                if (peittaa != null && peittaa()) { Piilota(); yield break; }
                yield return null;
            }
            // Pois: kiihtyen kauas oikeaan yläkulmaan, häivytys viimeisellä kolmanneksella.
            for (float t = 0f; t < PoisS; t += Time.unscaledDeltaTime)
            {
                float u = Mathf.Clamp01(t / PoisS), e = u * u;
                Aseta(Vector3.Lerp(lepo, lahto, e), kaanto, 1f - Mathf.Clamp01((u - 0.66f) / 0.34f));
                yield return null;
            }
            Piilota();
        }

        void Aseta(Vector3 paikka, float kaanto, float alfa)
        {
            kortti.localPosition = paikka;
            kortti.localRotation = Quaternion.Euler(0f, kaanto, 0f);
            mat.SetFloat("_Alfa", alfa);
            teksti.alpha = alfa;
        }
    }
}
