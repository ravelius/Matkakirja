using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Matkakirja
{
    /// <summary>
    /// MUSTA VERHO (omistajan löydös 84, build 14): aloituslennon alussa kuva häivytetään mustaan, lennon pinta
    /// (värillinen topografiakartta, KarttaKerrokset.LentoPohja) latautuu verhon takana, ja verho häivytetään pois
    /// vasta, kun pinta on valmis. Oma ruudun peittävä Canvas UI:n päällä mutta Aloitusverhon alla. Luodaan
    /// ensimmäisellä käytöllä; läpinäkyvänä ei ota kosketuksia.
    /// </summary>
    public sealed class Mustaverho : MonoBehaviour
    {
        /// <summary>Häivytys mustaan ja takaisin (s), pehmeä ease in/out (KAMERA-AJOT).</summary>
        public const float Haivytys = 0.5f;

        static Mustaverho instanssi;
        CanvasGroup ryhma;
        Coroutine ajo;

        /// <summary>Verhon peitto 0–1 (1 = täysin musta).</summary>
        public static float Peitto => instanssi != null ? instanssi.ryhma.alpha : 0f;

        static Mustaverho Hae()
        {
            if (instanssi != null) return instanssi;
            var go = new GameObject("Mustaverho");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<Mustaverho>();
            return instanssi;
        }

        void Awake()
        {
            var canvas = gameObject.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = short.MaxValue - 1;
            ryhma = gameObject.AddComponent<CanvasGroup>();
            ryhma.alpha = 0f;
            ryhma.blocksRaycasts = false;
            var tausta = new GameObject("Musta", typeof(RectTransform), typeof(Image));
            tausta.transform.SetParent(transform, false);
            var tr = (RectTransform)tausta.transform;
            tr.anchorMin = Vector2.zero; tr.anchorMax = Vector2.one; tr.offsetMin = tr.offsetMax = Vector2.zero;
            tausta.GetComponent<Image>().color = Color.black;
        }

        /// <summary>Häivytä peittoon <paramref name="tavoite"/> (0 tai 1) ajassa s; odotettava (yield return).</summary>
        public static Coroutine Haivyta(float tavoite, float s = Haivytys)
        {
            var v = Hae();
            if (v.ajo != null) v.StopCoroutine(v.ajo);
            v.ajo = v.StartCoroutine(v.Aja(tavoite, s));
            return v.ajo;
        }

        /// <summary>Verho heti pois (keskeytys: lento peruttu tai uusi ajo).</summary>
        public static void Pois()
        {
            if (instanssi == null) return;
            if (instanssi.ajo != null) instanssi.StopCoroutine(instanssi.ajo);
            instanssi.ajo = null;
            instanssi.ryhma.alpha = 0f;
            instanssi.ryhma.blocksRaycasts = false;
        }

        IEnumerator Aja(float tavoite, float s)
        {
            float alku = ryhma.alpha;
            ryhma.blocksRaycasts = true;
            for (float t = 0; t < s; t += Time.unscaledDeltaTime)
            {
                float x = t / s;
                ryhma.alpha = Mathf.Lerp(alku, tavoite, x * x * (3f - 2f * x));
                yield return null;
            }
            ryhma.alpha = tavoite;
            ryhma.blocksRaycasts = tavoite > 0f;
            ajo = null;
        }
    }
}
