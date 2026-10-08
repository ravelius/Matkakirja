// OPPAAN YKSITYISKOHTAKUVA 3D-KORTTINA (omistaja 7.10. 10.1x, Päätoimittaja 16.5x, juna 163): kuva noin 40 % ruudusta
// NOSTOKORTTI-kehyksessä (varjostin Varjostimet/Nostokortti, värit Tyylikirja.Paperi), 3D-tasona hieman keskustaa kohti
// kääntyneenä; lentää oikealta sisään, pysyy OpasYksityiskohdat.NayttoS ja poistuu kaukaisuuteen oikeaan yläkulmaan (omistaja
// 7.10. 10.2x). Koko, lepopaikka ja liike KorttiAsettelusta: levossa kortti ei peitä nappeja (Napit-laatikot OpasValikolta);
// liikkeen aikana napit piirtyvät kortin päälle (UI Toolkitin ruutupaneelit kamerapinon jälkeen, tarkistus NapitPaalla). Oma
// URP-overlay-kamera kerroksella 17 kaupunkikameran pinossa (kuten PalloKori). Alakaistassa vain kuvateksti (omistaja 22.5x: tekijät eivät näy kortissa).
// CC BY / BY-SA -maininta näytetään muualla (Tekijarivi datassa). Yksi kortti kerrallaan; Piilota() vie kortin heti pois (valikko tai chat aukesi).
using System.Collections;
using System.Collections.Generic;
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
        /// <summary>Sisääntulo ja poistuminen (s). Koko ja paikka: KorttiAsettelu.</summary>
        public const float SisaanS = 0.6f, PoisS = 0.8f;
        const float Etaisyys = 10f, Fov = KorttiAsettelu.FovAste;
        /// <summary>Näkyvien nappien ruutulaatikot (pikselit, origo vasen alakulma); OpasValikko asettaa. Kortti väistää ne.</summary>
        public static System.Func<System.Collections.Generic.List<KorttiAsettelu.Laatikko>> Napit;

        readonly MonoBehaviour o;
        Camera perus, overlay;
        Transform kortti;
        Material mat;
        TextMeshPro teksti;
        Texture2D kuva;
        Coroutine ajo;
        int vuoro;

        public YksityiskohtaKortti(MonoBehaviour omistaja) { o = omistaja; }

        // ESILATAUS (Päätoimittaja 8.10. 07.5x, juna 164 -video: Louvren saapumisessa 4 ruutua jähmettyi, kun Pein kortin
        // 1280×1595-kuva haettiin ja siirtyi näytönohjaimelle juuri saapumishetkellä): seuraavan kohteen kuvat haetaan jo
        // edellisellä pysähdyksellä (OpasSovitin.EsilataaKortit), ja Aja käyttää valmista tekstuuria. Ilman mipmappeja (kortti
        // ~40 % ruudusta; vähemmän pääsäikeen työtä). Enintään EsiladattujaMax kuvaa, vanhin pois.
        public const int EsiladattujaMax = 6;
        static readonly Dictionary<string, Texture2D> esiladatut = new Dictionary<string, Texture2D>();
        static readonly Queue<string> esiJarjestys = new Queue<string>();
        static readonly HashSet<string> esiHaussa = new HashSet<string>();

        public static void Esilataa(MonoBehaviour omistaja, string url)
        {
            if (omistaja == null || string.IsNullOrEmpty(url) || esiladatut.ContainsKey(url) || !esiHaussa.Add(url)) return;
            omistaja.StartCoroutine(EsilataaAjo(url));
        }

        static UnityWebRequest Pyynto(string url, int timeout)
        {
            var par = DownloadedTextureParams.Default;
            par.readable = false; par.mipmapChain = false;
            return new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET, new DownloadHandlerTexture(par), null) { timeout = timeout };
        }

        static IEnumerator EsilataaAjo(string url)
        {
            using (var p = Pyynto(url, 15))
            {
                yield return p.SendWebRequest();
                esiHaussa.Remove(url);
                if (p.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA opas: yksityiskohtakuvan esilataus epäonnistui ({p.responseCode}) {url}"); yield break; }
                var t = DownloadHandlerTexture.GetContent(p);
                if (t == null) yield break;
                while (esiJarjestys.Count >= EsiladattujaMax)
                {
                    var vanha = esiJarjestys.Dequeue();
                    if (esiladatut.TryGetValue(vanha, out var vt)) { Object.Destroy(vt); esiladatut.Remove(vanha); }
                }
                esiladatut[url] = t; esiJarjestys.Enqueue(url);
            }
        }

        /// <summary>Esiladattu tekstuuri omaksi (poistuu välimuistista; kortti tuhoaa sen piilottaessaan), muuten null.</summary>
        static Texture2D OtaEsiladattu(string url)
        {
            if (string.IsNullOrEmpty(url) || !esiladatut.TryGetValue(url, out var t)) return null;
            esiladatut.Remove(url);
            return t;
        }

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
            var esi = OtaEsiladattu(k.Url);
            if (esi != null) kuva = esi;
            else
            using (var p = Pyynto(k.Url, 3))
            {
                yield return p.SendWebRequest();
                if (v != vuoro) yield break;
                if (p.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA opas: yksityiskohtakuva ei latautunut ({p.responseCode}) {k.Url}"); yield break; }
                kuva = DownloadHandlerTexture.GetContent(p);
            }
            if (kuva == null || (peittaa != null && peittaa())) { Piilota(); yield break; }
            Varmista(kamera);
            overlay.aspect = kamera.aspect;
            mat.SetTexture("_MainTex", kuva);

            // Koko, lepopaikka ja liike KorttiAsettelusta: ruutulaatikko 3D-kallistuksen jälkeen ei leikkaa näkyviä nappeja
            // (Napit, OpasValikko) koko näkyvän liikkeen aikana; pystykuva enintään 72 % / 56 % ruudun korkeudesta.
            float w = Screen.width, h = Screen.height;
            float kuvasuhde = kuva.height > 0 ? (float)kuva.width / kuva.height : 1.5f;
            var napit = Napit?.Invoke();
            NapitPaalla();
            var asettelu = KorttiAsettelu.Laske(w, h, Screen.dpi > 0 ? Screen.dpi / 163f : 2f, kuvasuhde, napit);
            if (!asettelu.Mahtuu)
            {
                Debug.Log($"MATKAKIRJA opas: yksityiskohtakuva ohitettu, ei vapaata paikkaa nappien välissä ({napit?.Count ?? 0} nappia) {k.KohdeId} \"{k.Ankkuri}\"");
                Piilota(); yield break;
            }
            float lev = asettelu.Lev, kork = asettelu.Kork, sis = asettelu.Sis, alaPx = asettelu.AlaPx;
            mat.SetVector("_Koko", new Vector4(lev, kork, 0, 0));
            mat.SetFloat("_KulmaPt", 12f * lev / 320f);
            mat.SetFloat("_ReunaPt", Mathf.Max(1f, lev / 320f));
            mat.SetFloat("_SisennysPt", sis);
            mat.SetFloat("_AlaPt", alaPx);

            // Ruutupikselit → overlay-kameran tasolle etäisyydellä Etaisyys (KorttiAsettelu.FovAste = Fov).
            float yksikko = 2f * Etaisyys * Mathf.Tan(Fov * 0.5f * Mathf.Deg2Rad) / h;
            kortti.localScale = new Vector3(lev * yksikko, kork * yksikko, 1f);

            // Omistaja 22.5x: vain kuvateksti, ei tekijää eikä lisenssiä (ne näytetään muualla, Tekijarivi datassa).
            teksti.text = OpasYksityiskohdat.KortinTeksti(k);
            // Teksti kortin paikallisissa yksiköissä (kortti 1 × 1): alakaistaan, vasemmalle sisennyksen verran.
            var tt = teksti.rectTransform;
            tt.localScale = new Vector3(1f / (lev * yksikko), 1f / (kork * yksikko), 1f) * yksikko;
            tt.sizeDelta = new Vector2(lev - 2 * sis, alaPx);
            tt.localPosition = new Vector3(0f, -0.5f + (sis * 0.5f + alaPx * 0.5f) / kork, -0.001f);
            // Koko sovitetaan kaistaan (yksi rivi: kuvateksti); 1 tekstiyksikkö = 1 ruutupikseli.
            teksti.fontSizeMax = alaPx * 12f; teksti.fontSizeMin = alaPx * 0.05f;
            teksti.alignment = TextAlignmentOptions.MidlineLeft;


            Nakyy = true;
            kortti.gameObject.SetActive(true);
            teksti.ForceMeshUpdate();
            Debug.Log($"MATKAKIRJA opas: yksityiskohtakuvan teksti {teksti.textInfo.characterCount} merkkiä, {teksti.textInfo.lineCount} riviä, koko {teksti.fontSize:F0}, jono {teksti.fontSharedMaterial?.renderQueue}/{mat.renderQueue}");
            Debug.Log($"MATKAKIRJA opas: yksityiskohtakuva näkyviin {k.KohdeId} \"{k.Ankkuri}\" ({kuva.width}×{kuva.height}{(esi != null ? ", esiladattu" : "")}), lepo {asettelu.LepoLaatikko} ({w:0}×{h:0}, {napit?.Count ?? 0} nappia väistetty)");
            // Sisään oikealta kaukaa pienenä, hidastuen; kasvaa lepopaikkaa lähestyessään (KorttiAsettelu.Sisaan).
            for (float t = 0f; t < SisaanS; t += Time.unscaledDeltaTime)
            {
                if (peittaa != null && peittaa()) { Piilota(); yield break; }
                var (a, alfa) = KorttiAsettelu.Sisaan(asettelu, t / SisaanS);
                Aseta(a, yksikko, alfa);
                yield return null;
            }
            Aseta(asettelu.Lepo, yksikko, 1f);
            float loppu = Time.unscaledTime + (float)OpasYksityiskohdat.NayttoS - SisaanS;
            while (Time.unscaledTime < loppu)
            {
                if (peittaa != null && peittaa()) { Piilota(); yield break; }
                yield return null;
            }
            // Pois: kiihtyen kauas oikeaan yläkulmaan; häivytetty ennen ensimmäistä nappikohtaa (KorttiAsettelu.PoisLoppu).
            for (float t = 0f; t < PoisS; t += Time.unscaledDeltaTime)
            {
                var (a, alfa) = KorttiAsettelu.Pois(asettelu, t / PoisS);
                Aseta(a, yksikko, alfa);
                yield return null;
            }
            Piilota();
        }

        static bool napitTarkistettu;

        /// <summary>
        /// Kerran: napit ovat kortin päällä vain, jos jokainen UI-dokumentti piirtää ruutupaneeliin (ei RenderTextureen, joka
        /// koostettaisiin kamerapinoon). Poikkeus kirjataan lokiin.
        /// </summary>
        static void NapitPaalla()
        {
            if (napitTarkistettu) return;
            napitTarkistettu = true;
            int rt = 0, kaikki = 0;
            foreach (var d in Object.FindObjectsByType<UnityEngine.UIElements.UIDocument>(FindObjectsSortMode.None))
            {
                if (d == null || d.panelSettings == null) continue;
                kaikki++;
                if (d.panelSettings.targetTexture != null) rt++;
            }
            Debug.Log($"MATKAKIRJA opas: yksityiskohtakortti, napit kortin päällä: {(rt == 0 ? "kyllä" : "EI")} ({kaikki} UI-dokumenttia, {rt} tekstuuriin)");
        }

        void Aseta(KorttiAsettelu.Asento a, float yksikko, float alfa)
        {
            kortti.localPosition = new Vector3(a.X * a.Syvyys * yksikko, a.Y * a.Syvyys * yksikko, Etaisyys * a.Syvyys);
            kortti.localRotation = Quaternion.Euler(0f, a.Kaanto, 0f);
            mat.SetFloat("_Alfa", alfa);
            teksti.alpha = alfa;
        }
    }
}
