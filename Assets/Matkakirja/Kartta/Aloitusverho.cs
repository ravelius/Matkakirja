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
    ///
    /// ALOITUSLOGO (omistaja 6.10. 16.2x, Päätoimittaja; uusi pohja): musta ruutu, jonka keskellä Matkakirja-logo valkoisena
    /// ja pienenä (<see cref="LogoOsuus"/> lyhyestä sivusta). Logo häivytetään sisään (<see cref="LogoSisaan"/>), se pysyy
    /// latauksen ajan (vähintään <see cref="LogoVahintaan"/>), ja koko verho häivytetään ulos (<see cref="Haivytys"/>)
    /// aloitusruutuun. iOS:n LaunchScreen on musta (Natiiviseppä d7c55dab), joten musta jatkuu saumatta ensimmäisestä ruudusta.
    /// Lähde 720 px (ei skaalausta ylöspäin millään laitteella: iPad Pro 13" ~620 px, iPhone ~360 px), mipmapit.
    /// </summary>
    public sealed class Aloitusverho : MonoBehaviour
    {
        /// <summary>Aloituslogon tausta: sama #000000 kuin iOS:n LaunchScreen (välähdyksetön siirtymä).</summary>
        public static readonly Color Musta = Color.black;
        public const string ValkoinenLogoPolku = "Aloitusruutu-logo-valkoinen";
        /// <summary>Logon leveys lyhyestä sivusta (omistaja: "aika pienellä keskitettynä").</summary>
        public const float LogoOsuus = 0.3f;
        public const float LogoSisaan = 0.6f, LogoVahintaan = 1f;
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
        /// <summary>
        /// Portin odotus (s): verho lähtee vasta, kun aloitusportti on auki (PalloKierto.PorttiSumea; UI avaa sen, kun
        /// sisältö on luettu), jottei valmis pallo näy hetkeä ilman aloitusnäkymää. Tämän jälkeen pelkkä pallo riittää
        /// (kehittäjän suorat aloitukset, joissa porttia ei avata).
        /// </summary>
        public const float PorttiOdotus = 5f;

        public static Aloitusverho Instanssi { get; private set; }
        public static bool Nakyvissa => Instanssi != null;

        CanvasGroup ryhma;
        RectTransform logo;
        RawImage logoKuva;
        float logonSuhde = 176f / 720f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void Luo()
        {
            if (!Application.isPlaying || Instanssi != null) return;
            var go = new GameObject("Aloitusverho");
            DontDestroyOnLoad(go);
            go.AddComponent<Aloitusverho>();
        }

        // LÄMPÖERÄ (PallonLepo): verho näkyy = käynnistys (laatat latautuvat takana) ja häivytys 0,5 s; uGUI-kerros ei
        // kuulu Natiivi-UI:n lepokyselyyn (UiRauhassa), joten verho pitää pallon hereillä, kunnes se on poistettu.
        void OnEnable() => PallonLepo.Animoi(Nakyy, "aloitusverho");
        void OnDisable() => PallonLepo.Poista(Nakyy);
        bool Nakyy() => Instanssi == this;

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
            tausta.GetComponent<Image>().color = Musta;

            var tex = Resources.Load<Texture2D>(ValkoinenLogoPolku);
            if (tex != null)
            {
                logonSuhde = tex.height / (float)tex.width;
                var kuva = new GameObject("Logo", typeof(RectTransform), typeof(RawImage));
                kuva.transform.SetParent(transform, false);
                logoKuva = kuva.GetComponent<RawImage>();
                logoKuva.texture = tex;
                logoKuva.color = new Color(1f, 1f, 1f, 0f); // häivytetään sisään (Odota)
                logo = (RectTransform)kuva.transform;
                logo.anchorMin = logo.anchorMax = logo.pivot = new Vector2(0.5f, 0.5f);
                Mitoita();
            }
            StartCoroutine(Odota());
        }

        void Mitoita()
        {
            if (logo == null) return;
            float leveys = Mathf.Min(Screen.width, Screen.height) * LogoOsuus;
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
            float logoAlku = Time.realtimeSinceStartup;
            while (Time.realtimeSinceStartup - alku < Katto || Time.realtimeSinceStartup - logoAlku < LogoSisaan + LogoVahintaan)
            {
                // Logo sisään pehmeästi (smoothstep) ensimmäisestä ruudusta; verho pysyy vähintään sisäänhäivytys + LogoVahintaan.
                if (logoKuva != null)
                {
                    float x = Mathf.Clamp01((Time.realtimeSinceStartup - logoAlku) / LogoSisaan);
                    logoKuva.color = new Color(1f, 1f, 1f, x * x * (3f - 2f * x));
                }
                bool logoValmis = Time.realtimeSinceStartup - logoAlku >= LogoSisaan + LogoVahintaan;
                if (pallo == null) pallo = FindAnyObjectByType<Cesium3DTileset>();
                // Yhteinen ehto (BUILD 16): ≥ 90 % ja tasaantunut 300 ms, ≥ 10 kehystä (ValmiusEhto). Ehto luetaan joka
                // kehys (tasaantumisen ikkuna), mutta verho lähtee vasta, kun portti on auki tai PorttiOdotus kulunut.
                bool valmis = Valmius.Tasaantunut(ehto, pallo);
                bool portti = PalloKierto.PorttiSumea || Time.realtimeSinceStartup - alku >= PorttiOdotus;
                if (valmis && portti && logoValmis) { syy = PalloKierto.PorttiSumea ? "valmis" : "valmis:ei-porttia"; break; }
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
