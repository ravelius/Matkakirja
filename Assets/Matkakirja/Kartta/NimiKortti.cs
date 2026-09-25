using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Matkakirja
{
    /// <summary>
    /// Kaupungin nimikortti ruudun alareunassa: nimi, maa ja kaupungin tyyppi
    /// pergamenttipohjalla. Kortti häivytetään näkyviin, kun kamera on saapunut,
    /// ja piiloon seuraavasta kosketuksesta. Käyttöliittymä rakennetaan koodista,
    /// joten kohtauksessa ei ole käsin tehtyä UI:ta.
    /// </summary>
    public class NimiKortti : MonoBehaviour
    {
        public TMP_FontAsset fontti;
        public Color pohja = new Color32(0xf3, 0xea, 0xd3, 0xf2);
        public Color muste = new Color32(0x33, 0x27, 0x1b, 0xff);
        public float haive = 0.25f;

        CanvasGroup ryhma;
        TextMeshProUGUI nimi, tiedot;
        float kohde, alfa;

        void Awake()
        {
            var canvasGo = new GameObject("Nimikortti", typeof(Canvas), typeof(CanvasScaler), typeof(CanvasGroup));
            canvasGo.transform.SetParent(transform, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 10;
            var skaalain = canvasGo.GetComponent<CanvasScaler>();
            skaalain.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            skaalain.referenceResolution = new Vector2(393, 852);
            skaalain.matchWidthOrHeight = 0.5f;
            ryhma = canvasGo.GetComponent<CanvasGroup>();
            ryhma.alpha = 0;
            ryhma.blocksRaycasts = false;

            var kortti = new GameObject("Kortti", typeof(RectTransform), typeof(Image));
            kortti.transform.SetParent(canvasGo.transform, false);
            var rt = (RectTransform)kortti.transform;
            rt.anchorMin = new Vector2(0.5f, 0);
            rt.anchorMax = new Vector2(0.5f, 0);
            rt.pivot = new Vector2(0.5f, 0);
            rt.sizeDelta = new Vector2(320, 86);
            rt.anchoredPosition = new Vector2(0, 44);
            kortti.GetComponent<Image>().color = pohja;

            nimi = Teksti(kortti.transform, "Nimi", 30, new Vector2(0, 14));
            tiedot = Teksti(kortti.transform, "Tiedot", 15, new Vector2(0, -22));
            tiedot.fontStyle = FontStyles.Italic;
        }

        TextMeshProUGUI Teksti(Transform isa, string nimi, float koko, Vector2 paikka)
        {
            var t = new GameObject(nimi, typeof(RectTransform)).AddComponent<TextMeshProUGUI>();
            t.transform.SetParent(isa, false);
            t.font = fontti;
            t.fontSize = koko;
            t.color = muste;
            t.alignment = TextAlignmentOptions.Center;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            var rt = t.rectTransform;
            rt.anchorMin = new Vector2(0, 0.5f);
            rt.anchorMax = new Vector2(1, 0.5f);
            rt.sizeDelta = new Vector2(-24, 34);
            rt.anchoredPosition = paikka;
            return t;
        }

        public void Nayta(Sisalto.Kaupunki k)
        {
            nimi.text = k.nimi;
            var osat = new System.Collections.Generic.List<string>();
            if (!string.IsNullOrEmpty(k.maa2)) osat.Add(k.maa2);
            if (!string.IsNullOrEmpty(k.tyyppi)) osat.Add(k.tyyppi);
            if (k.lentokentta) osat.Add("lentokenttä");
            if (k.aloitus) osat.Add("aloituskaupunki");
            tiedot.text = string.Join(" · ", osat);
            kohde = 1;
        }

        public void Piilota() => kohde = 0;

        public bool Naky => kohde > 0;

        void Update()
        {
            if (Mathf.Approximately(alfa, kohde)) return;
            alfa = Mathf.MoveTowards(alfa, kohde, Time.unscaledDeltaTime / haive);
            ryhma.alpha = alfa * alfa * (3f - 2f * alfa);
        }

        // LÄMPÖERÄ (PallonLepo): uGUI-kortin häivytys 0,25 s (ei kuulu Natiivi-UI:n lepokyselyyn).
        void OnEnable() => PallonLepo.Animoi(Haivyttaa, "nimikortti");
        void OnDisable() => PallonLepo.Poista(Haivyttaa);
        bool Haivyttaa() => !Mathf.Approximately(alfa, kohde);
    }
}
