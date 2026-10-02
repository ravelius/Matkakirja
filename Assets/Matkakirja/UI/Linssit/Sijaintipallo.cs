// SIJAINTIPALLO (Linssiseppä 1.10.2026; omistaja klo 00.1x Päätoimittajan kautta: "pystyisikö näytölle tekemään ilman pilviä ja
// muuta ylimääräistä pienen maapallon, joka näyttäisi pisteellä aina kyseisen kuvan maapallolla? se saisi pyörähtää pehmeästi
// aina uuteen paikkaa jos nuolinäppäimillä selataan kohteita."): astronautin kameran kuvanäkymän vasemmassa alakulmassa
// (pikkukuvanauhan yllä) pieni pallo (puhelin 72 pt, tabletti 96 pt). Pinta BMNG Z1 (4 tiiltä, kuukausi kuten kyydissä), meripihkan piste kohteessa, joka
// on pallon keskellä. Selatessa (‹ ›, nuolinäppäimet, pyyhkäisy) pallo kiertyy lyhintä reittiä 0,7 s ease-in-out.
// Toteutus: oma kerros 12 ja ortokamera RenderTextureen (320², MSAA 4), piirto vain liikkeen aikana (kamera päällä liikkeen
// ja yhden kehyksen ajan) → levossa ei kustannusta. Pääkamera ei piirrä kerrosta 12. A/B `ui linssi sijaintipallo 0|1`.
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering.Universal;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Sijaintipallo
    {
        public const int Kerros = 12;
        public static bool Paalla = true;
        /// <summary>Koko (pt): puhelimella 120, tabletilla 160 (omistaja: "pienen maapallon"; 2.10. "Pieni karttapallo vähän
        /// isompana" → 94 / 125; 2.10. 21.3x "Maapallokuvake suuremmaksi" → +28 %).</summary>
        static float KokoPt => UiKerros.Tabletti ? 160f : 120f;
        /// <summary>iPhonen vaakatilassa pallo ruudun vasempaan alakulmaan turva-alueen ulkopuolelle (omistaja 2.10. 21.3x
        /// "siirtyy selvästi enemmän vasempaan alakulmaan"): kuva on keskellä, ja sen vasemmalla puolella on vapaa kaistale.</summary>
        const float VaakaReuna = 8f;
        const float KestoS = 0.7f, Sade = 1000f;
        const float Vasen = 12f, Alas = 62f, Rako = 6f, MinKokoPt = 62f;   // min 48 → 62 (+30 %, omistaja 2.10.)
        const string PintaJuuri = "https://media.matkakirja.app/julisteet/pallo/bmng/";

        readonly VisualElement el;
        GameObject juuri;
        Transform pallo;
        Camera kamera;
        Material materiaali;
        RenderTexture rt;
        Quaternion alku = Quaternion.identity, loppu = Quaternion.identity;
        float t0 = -1f;
        int piirtoKehyksia;
        bool pintaHaettu;
        Vector3 kohde = new Vector3(0, 0, -1);
        IVisualElementScheduledItem ajo;

        public Sijaintipallo(VisualElement isa)
        {
            el = new VisualElement { name = "mk-astrokuva__sijaintipallo", pickingMode = PickingMode.Ignore };
            var s = el.style;
            s.position = Position.Absolute; s.left = Vasen; s.bottom = Alas; s.width = KokoPt; s.height = KokoPt;
            s.display = DisplayStyle.None;
            isa.Add(el);
        }

        /// <summary>Kuvanäkymän kohde (lat, lon asteina); animoi = selaus (pehmeä kierto), muuten heti.</summary>
        public void Kohteeseen(double lat, double lon, bool animoi)
        {
            if (!Paalla) { el.style.display = DisplayStyle.None; return; }
            if (!Varmista()) return;
            el.style.display = DisplayStyle.Flex;
            double la = lat * Mathf.Deg2Rad, lo = lon * Mathf.Deg2Rad;
            kohde = new Vector3((float)(System.Math.Cos(la) * System.Math.Cos(lo)), (float)System.Math.Sin(la), (float)(System.Math.Cos(la) * System.Math.Sin(lo)));
            materiaali.SetVector("_Kohde", kohde);
            var uusi = Asento(kohde);
            // Kesken kierron uusi kohde: jatketaan nykyisestä asennosta (ei hyppyä).
            if (animoi && Quaternion.Angle(pallo.localRotation, uusi) > 0.5f) { alku = pallo.localRotation; loppu = uusi; t0 = Time.unscaledTime; }
            else { pallo.localRotation = uusi; t0 = -1f; }
            piirtoKehyksia = 2;
            kamera.enabled = true;
            ajo ??= el.schedule.Execute(Paivita).Every(0);
            ajo.Resume();
        }

        public VisualElement Isa => el.parent;

        /// <summary>
        /// Koko kuvan mukaan (<paramref name="kuva"/> isän koordinaateissa): jos kuva on pallon korkeudella ja ulottuu sen
        /// kohdalle (vaaka), pallo pienenee reunukseen (vähintään 48 pt); pystyssä kuva on yläpuolella → täysi koko.
        /// </summary>
        public void Mitoita(Rect kuva, float isanKorkeus)
        {
            if (float.IsNaN(isanKorkeus) || isanKorkeus <= 0f || kuva.width <= 0f) return;
            float koko = KokoPt;
            var isa = el.parent;
            float isanLeveys = isa != null ? isa.layout.width : 0f;
            // iPhone vaaka: vasen reuna ruudun reunasta (turva-alueen vasen kaistale mukaan), alareuna ennallaan nauhan yläpuolella.
            bool puhelinVaaka = !UiKerros.Tabletti && isanLeveys > isanKorkeus;
            float vasen = puhelinVaaka && isa != null && !float.IsNaN(isa.layout.x) ? VaakaReuna - isa.layout.x : Vasen;
            el.style.left = vasen;
            float yla = isanKorkeus - Alas - koko;
            bool samallaKorkeudella = kuva.yMax > yla && kuva.yMin < isanKorkeus - Alas;
            if (samallaKorkeudella && kuva.xMin < vasen + koko + Rako)
                koko = Mathf.Clamp(kuva.xMin - vasen - Rako, MinKokoPt, KokoPt);
            el.style.width = koko; el.style.height = koko;
        }

        public void Piilota()
        {
            el.style.display = DisplayStyle.None;
            if (kamera != null) kamera.enabled = false;
            ajo?.Pause();
        }

        /// <summary>Asento, jossa kohde on kameraa kohti (maailma −Z) ja pohjoinen ylös.</summary>
        static Quaternion Asento(Vector3 p)
        {
            Vector3 ylos = Vector3.up - p * p.y;
            if (ylos.sqrMagnitude < 1e-6f) ylos = new Vector3(-p.x, 0, -p.z);   // navalla: mikä tahansa meridiaani
            var q1 = Quaternion.LookRotation(p, ylos.normalized);
            return Quaternion.Euler(0f, 180f, 0f) * Quaternion.Inverse(q1);
        }

        void Paivita()
        {
            if (pallo == null) { ajo?.Pause(); return; }
            if (t0 >= 0f)
            {
                float t = Mathf.Clamp01((Time.unscaledTime - t0) / KestoS);
                float e = t * t * (3f - 2f * t);   // ease-in-out
                pallo.localRotation = Quaternion.Slerp(alku, loppu, e);   // lyhin reitti
                if (t >= 1f) { t0 = -1f; piirtoKehyksia = 2; }
                return;
            }
            if (piirtoKehyksia-- > 0) return;
            kamera.enabled = false;   // RenderTexture säilyttää viimeisen kuvan
            ajo.Pause();
        }

        bool Varmista()
        {
            if (juuri != null) return true;
            var sh = Resources.Load<Shader>("Varjostimet/Sijaintipallo");
            if (sh == null) { Debug.LogWarning("MATKAKIRJA sijaintipallo: varjostin puuttuu"); Paalla = false; return false; }
            juuri = new GameObject("Sijaintipallo");
            Object.DontDestroyOnLoad(juuri);
            var p = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            Object.Destroy(p.GetComponent<Collider>());
            p.name = "Pallo";
            p.layer = Kerros;
            p.transform.SetParent(juuri.transform, false);
            p.transform.localScale = Vector3.one * (2f * Sade);
            materiaali = new Material(sh) { name = "Sijaintipallo" };
            var r = p.GetComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            pallo = p.transform;

            rt = new RenderTexture(320, 320, 16, RenderTextureFormat.ARGB32) { name = "Sijaintipallo", antiAliasing = 4, hideFlags = HideFlags.HideAndDontSave };
            rt.Create();
            var kg = new GameObject("SijaintipallonKamera");
            kg.transform.SetParent(juuri.transform, false);
            kg.transform.localPosition = new Vector3(0, 0, -3f * Sade);
            kamera = kg.AddComponent<Camera>();
            kamera.orthographic = true;
            kamera.orthographicSize = Sade * 1.02f;
            kamera.nearClipPlane = Sade; kamera.farClipPlane = 5f * Sade;
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = new Color(0, 0, 0, 0);
            kamera.cullingMask = 1 << Kerros;
            kamera.targetTexture = rt;
            kamera.allowHDR = false; kamera.allowMSAA = true;
            kamera.depth = -50;
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null) { d.renderPostProcessing = false; d.renderShadows = false; d.requiresDepthTexture = false; d.requiresColorTexture = false; }
            kamera.enabled = false;
            // Muut kamerat eivät piirrä kerrosta 12 (pallo on maan keskipisteessä, mutta varmuuden vuoksi).
            foreach (var c in Camera.allCameras) if (c != kamera) c.cullingMask &= ~(1 << Kerros);
            el.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(rt));
            if (!pintaHaettu) { pintaHaettu = true; UiKerros.Hae().StartCoroutine(HaePinta()); }
            return true;
        }

        IEnumerator HaePinta()
        {
            var tex = new Texture2D(512, 512, TextureFormat.RGB24, false) { name = "SijaintipallonPinta", wrapMode = TextureWrapMode.Repeat, filterMode = FilterMode.Bilinear };
            int kk = System.DateTime.UtcNow.Month;
            for (int x = 0; x < 2; x++)
                for (int y = 0; y < 2; y++)
                {
                    // XYZ y = 0 pohjoisessa, ämpärin polku samoin (ei reverseY, tarkistettu curlilla 1.10.). Unityn rivi 0 alhaalla: pohjoinen ylös.
                    string url = $"{PintaJuuri}{kk:00}/1/{x}/{y}.jpg";
                    using var r = UnityWebRequestTexture.GetTexture(url);
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) { Debug.LogWarning("MATKAKIRJA sijaintipallo: " + url + " " + r.error); continue; }
                    var t = DownloadHandlerTexture.GetContent(r);
                    if (t.width != 256 || t.height != 256) { Object.Destroy(t); continue; }
                    tex.SetPixels(x * 256, (1 - y) * 256, 256, 256, t.GetPixels());
                    Object.Destroy(t);
                }
            tex.Apply(false, true);
            materiaali.SetTexture("_MainTex", tex);
            if (kamera != null) { kamera.enabled = true; piirtoKehyksia = 2; ajo?.Resume(); }
        }
    }
}
