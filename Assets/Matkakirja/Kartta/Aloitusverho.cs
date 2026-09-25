using System.Collections;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.UI;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSVERHO (omistajan löydös 75, build 13): iOS:n LaunchScreen (Rakennus.Aloitusruutu: pergamentti #efdcb4 ja
    /// logo musteella #46331f, leveys <see cref="LogonOsuus"/> ruudun leveydestä) jatkuu pelin ensimmäisistä
    /// kehyksistä täsmälleen samana kuvana, joten Unityn logoruutua (pois) tai mustaa välikehystä ei näy. Verho
    /// peittää myös kylmän alun: pallon laatat latautuvat sen takana, ja verho häivytetään vasta, kun pallo on
    /// ladattu (Cesium3DTileset.ComputeLoadProgress, yhteinen ehto Valmius.Tasaantunut: ≥ 90 % ja tasaantunut, BUILD 16;
    /// ennen 99 %, joka ei täyttynyt pyörivällä pallolla, löydös 80) tai <see cref="Katto"/> on kulunut.
    /// </summary>
    public sealed class Aloitusverho : MonoBehaviour
    {
        /// <summary>Web css/styles.css:85 --paper.</summary>
        public static readonly Color Pergamentti = new Color32(0xef, 0xdc, 0xb4, 0xff);
        /// <summary>Logon leveys ruudun kapeammasta sivusta (sama kuin LaunchScreenin iOSLaunchScreenFillPct).</summary>
        public const float LogonOsuus = 0.6f;
        /// <summary>Resources-polku: sama tiedosto on LaunchScreenin kuva (Rakennus.Aloitusruutu).</summary>
        public const string LogoPolku = "Aloitusruutu-logo";
        /// <summary>Pisin odotus ennen häivytystä (s), vaikka pallo ei olisi valmis (offline, hidas verkko).</summary>
        public const float Katto = 8f;
        /// <summary>Häivytys (s), pehmeä ease in/out (KAMERA-AJOT).</summary>
        public const float Haivytys = 0.5f;

        public static Aloitusverho Instanssi { get; private set; }
        public static bool Nakyvissa => Instanssi != null;

        CanvasGroup ryhma;
        RectTransform logo;
        float logonSuhde = 176f / 720f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void Luo()
        {
            if (!Application.isPlaying || Instanssi != null) return;
            var go = new GameObject("Aloitusverho");
            DontDestroyOnLoad(go);
            go.AddComponent<Aloitusverho>();
        }

        void Awake()
        {
            Instanssi = this;
            var canvas = gameObject.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = short.MaxValue;
            ryhma = gameObject.AddComponent<CanvasGroup>();
            ryhma.blocksRaycasts = true;

            var tausta = new GameObject("Pergamentti", typeof(RectTransform), typeof(Image));
            tausta.transform.SetParent(transform, false);
            var tr = (RectTransform)tausta.transform;
            tr.anchorMin = Vector2.zero; tr.anchorMax = Vector2.one; tr.offsetMin = tr.offsetMax = Vector2.zero;
            tausta.GetComponent<Image>().color = Pergamentti;

            var tex = Resources.Load<Texture2D>(LogoPolku);
            if (tex != null)
            {
                logonSuhde = tex.height / (float)tex.width;
                var kuva = new GameObject("Logo", typeof(RectTransform), typeof(RawImage));
                kuva.transform.SetParent(transform, false);
                kuva.GetComponent<RawImage>().texture = tex;
                logo = (RectTransform)kuva.transform;
                logo.anchorMin = logo.anchorMax = logo.pivot = new Vector2(0.5f, 0.5f);
                Mitoita();
            }
            StartCoroutine(Odota());
        }

        void Mitoita()
        {
            if (logo == null) return;
            float leveys = Mathf.Min(Screen.width, Screen.height) * LogonOsuus;
            logo.sizeDelta = new Vector2(leveys, leveys * logonSuhde);
        }

        void Update() => Mitoita(); // kierto ja ruudun koko

        IEnumerator Odota()
        {
            float alku = Time.realtimeSinceStartup;
            Cesium3DTileset pallo = null;
            // Valmiusdiagnostiikka (löydös 80): seuranta kehittäjälipulla, lähtörivi aina (Valmius.cs).
            Valmius.VerhoAlku("aloitusverho");
            // Verhon kevennys (BUILD 16): näkyvän kartan haut ensin, taustan esilataus tauolla verhon ajan.
            Valmius.KevennysAlku("aloitusverho");
            string syy = "katto";
            var ehto = new ValmiusEhto();
            while (Time.realtimeSinceStartup - alku < Katto)
            {
                if (pallo == null) pallo = FindAnyObjectByType<Cesium3DTileset>();
                // Yhteinen ehto (BUILD 16): ≥ 90 % ja tasaantunut 300 ms, ≥ 10 kehystä (ValmiusEhto).
                if (Valmius.Tasaantunut(ehto, pallo)) { syy = "valmis"; break; }
                yield return null;
            }
            Valmius.VerhoLoppu("aloitusverho", pallo == null ? "katto:ei-palloa" : syy,
                (Time.realtimeSinceStartup - alku) * 1000.0, pallo != null ? pallo.ComputeLoadProgress() : -1f);
            Valmius.KevennysLoppu("aloitusverho");
            VerkkoOdotus.Kirjaa("kaynnistys", "aloitusverho", (Time.realtimeSinceStartup - alku) * 1000.0);
            Debug.Log($"MATKAKIRJA aloitusverho: pois {Time.realtimeSinceStartup - alku:0.0} s " +
                      $"(pallo {(pallo != null ? pallo.ComputeLoadProgress().ToString("0") : "-")} %)");
            for (float t = 0; t < Haivytys; t += Time.unscaledDeltaTime)
            {
                float x = t / Haivytys;
                ryhma.alpha = 1f - x * x * (3f - 2f * x);
                yield return null;
            }
            Instanssi = null;
            Destroy(gameObject);
        }
    }
}
