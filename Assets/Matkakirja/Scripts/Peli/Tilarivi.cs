// Tilarivi ruudun yläreunassa: raha, päivä, vuorokaudenaika ja sijainti
// (PeliApu.TilaTeksti) sekä lyhyt viesti sen alla (noppa, lipun hinta,
// pankkiapu). Rakennetaan koodista UGUI + TextMeshPro kuten NimiKortti,
// samoilla pergamenttisävyillä. Pysyy safe arean sisällä (lovi, Dynamic
// Island, pyöristetyt kulmat) myös näytön kääntyessä.
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Matkakirja.Natiivi
{
    public sealed class Tilarivi : MonoBehaviour, ITilarivi
    {
        public TMP_FontAsset fontti;
        public Color pohja = new Color32(0xf3, 0xea, 0xd3, 0xf2);
        public Color muste = new Color32(0x33, 0x27, 0x1b, 0xff);
        public float haive = 0.25f;

        RectTransform turva;
        TextMeshProUGUI rivi, viesti;
        CanvasGroup viestiRyhma;
        RectTransform palkki;
        float viestiLoppuu, viestiAlfa;
        Rect viimeTurva;
        Vector2Int viimeKoko;

        /// <summary>
        /// Rakentaa näkymän. Kutsutaan heti AddComponentin jälkeen (fontti
        /// annetaan tässä, koska Awake ajetaan ennen kuin kenttää ehtii asettaa).
        /// </summary>
        public void Rakenna(TMP_FontAsset kirjasin)
        {
            if (turva != null) return;
            if (kirjasin != null) fontti = kirjasin;
            var canvasGo = new GameObject("Tilarivi", typeof(Canvas), typeof(CanvasScaler));
            canvasGo.transform.SetParent(transform, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 15;
            Skaalain(canvasGo.GetComponent<CanvasScaler>());

            turva = Turvaalue(canvasGo.transform);

            var palkkiGo = new GameObject("Palkki", typeof(RectTransform), typeof(Image));
            palkkiGo.transform.SetParent(turva, false);
            palkki = (RectTransform)palkkiGo.transform;
            palkki.anchorMin = new Vector2(0.5f, 1);
            palkki.anchorMax = new Vector2(0.5f, 1);
            palkki.pivot = new Vector2(0.5f, 1);
            palkki.sizeDelta = new Vector2(340, 30);
            palkki.anchoredPosition = new Vector2(0, -6);
            var kuva = palkkiGo.GetComponent<Image>();
            kuva.color = pohja;
            kuva.raycastTarget = false;

            rivi = Teksti(palkki, "Rivi", 15, FontStyles.Normal);
            rivi.text = "Matkakirja latautuu…";

            var viestiGo = new GameObject("Viesti", typeof(RectTransform), typeof(CanvasGroup));
            viestiGo.transform.SetParent(turva, false);
            var vrt = (RectTransform)viestiGo.transform;
            vrt.anchorMin = new Vector2(0.5f, 1);
            vrt.anchorMax = new Vector2(0.5f, 1);
            vrt.pivot = new Vector2(0.5f, 1);
            vrt.sizeDelta = new Vector2(320, 24);
            vrt.anchoredPosition = new Vector2(0, -40);
            viestiRyhma = viestiGo.GetComponent<CanvasGroup>();
            viestiRyhma.alpha = 0;
            viestiRyhma.blocksRaycasts = false;
            var vpohja = viestiGo.AddComponent<Image>();
            vpohja.color = new Color(pohja.r, pohja.g, pohja.b, pohja.a * 0.85f);
            vpohja.raycastTarget = false;
            viesti = Teksti(vrt, "Teksti", 13, FontStyles.Italic);
        }

        /// <summary>
        /// Mitoitus kuten Natiivi-UI:n UiKerros (Fable 24.9.2026): iPadilla 1 UI-yksikkö = 1 iOS-piste = webin
        /// CSS-px (ConstantPixelSize, UiKerros.PikseliaPisteessa); puhelimella viiteruutu 393 × 852
        /// (iPhone 15 -pisteet) kuten NimiKortissa. `ui skaala piste|viite|auto` vaihtaa ajon aikana.
        /// </summary>
        internal static void Skaalain(CanvasScaler s)
        {
            AsetaSkaala(s);
            if (s.GetComponent<PisteSkaalain>() == null) s.gameObject.AddComponent<PisteSkaalain>();
        }

        internal static void AsetaSkaala(CanvasScaler s)
        {
            if (UiKerros.Pisteskaala)
            {
                s.uiScaleMode = CanvasScaler.ScaleMode.ConstantPixelSize;
                s.scaleFactor = UiKerros.PikseliaPisteessa;
            }
            else
            {
                s.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
                s.referenceResolution = new Vector2(393, 852);
                s.matchWidthOrHeight = 0.5f;
            }
        }

        /// <summary>Seuraa UiKerros-skaalan vaihtoa (testikomento, kierto) ja asettaa canvasin uudelleen.</summary>
        sealed class PisteSkaalain : MonoBehaviour
        {
            CanvasScaler s;
            bool piste;
            float kerroin;
            void Awake() { s = GetComponent<CanvasScaler>(); piste = UiKerros.Pisteskaala; kerroin = UiKerros.PikseliaPisteessa; }
            void Update()
            {
                if (s == null) return;
                bool p = UiKerros.Pisteskaala;
                float k = UiKerros.PikseliaPisteessa;
                if (p == piste && k == kerroin) return;
                piste = p; kerroin = k;
                AsetaSkaala(s);
            }
        }

        /// <summary>Koko ruudun lapsi, jonka ankkurit seurataan Screen.safeAreaan (PaivitaTurvaalue).</summary>
        internal static RectTransform Turvaalue(Transform isa)
        {
            var go = new GameObject("Turvaalue", typeof(RectTransform));
            go.transform.SetParent(isa, false);
            var rt = (RectTransform)go.transform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
            return rt;
        }

        internal static bool PaivitaTurvaalue(RectTransform rt, ref Rect viime, ref Vector2Int koko)
        {
            var alue = Screen.safeArea;
            var nyt = new Vector2Int(Screen.width, Screen.height);
            if (alue == viime && nyt == koko) return false;
            viime = alue;
            koko = nyt;
            if (nyt.x <= 0 || nyt.y <= 0) return false;
            rt.anchorMin = new Vector2(alue.xMin / nyt.x, alue.yMin / nyt.y);
            rt.anchorMax = new Vector2(alue.xMax / nyt.x, alue.yMax / nyt.y);
            return true;
        }

        TextMeshProUGUI Teksti(Transform isa, string nimi, float koko, FontStyles tyyli)
        {
            var t = new GameObject(nimi, typeof(RectTransform)).AddComponent<TextMeshProUGUI>();
            t.transform.SetParent(isa, false);
            if (fontti != null) t.font = fontti;
            t.fontSize = koko;
            t.fontStyle = tyyli;
            t.color = muste;
            t.alignment = TextAlignmentOptions.Center;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            t.overflowMode = TextOverflowModes.Ellipsis;
            t.raycastTarget = false;
            var rt = t.rectTransform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = new Vector2(10, 0);
            rt.offsetMax = new Vector2(-10, 0);
            return t;
        }

        /// <summary>Tilarivin teksti (PeliApu.TilaTeksti).</summary>
        public void Aseta(string teksti)
        {
            if (rivi == null || rivi.text == teksti) return;
            rivi.text = teksti;
            // Palkki kasvaa tekstin mukaan, enintään ruudun levyiseksi.
            float tila = turva.rect.width > 0 ? turva.rect.width : 393f; // ennen ensimmäistä asettelua viiteleveys
            float leveys = Mathf.Min(rivi.GetPreferredValues(teksti).x + 28f, tila - 16f);
            palkki.sizeDelta = new Vector2(Mathf.Max(200f, leveys), palkki.sizeDelta.y);
        }

        /// <summary>Lyhyt viesti tilarivin alle; häipyy kestoS sekunnin päästä.</summary>
        public void Viesti(string teksti, float kestoS = 3f)
        {
            if (viesti == null || string.IsNullOrEmpty(teksti)) return;
            viesti.text = teksti;
            viestiLoppuu = Time.unscaledTime + kestoS;
        }

        /// <summary>Nykyinen tilarivin teksti.</summary>
        public string Rivi => rivi != null ? rivi.text : null;

        void Update()
        {
            if (turva == null) return;
            PaivitaTurvaalue(turva, ref viimeTurva, ref viimeKoko);
            float kohde = Time.unscaledTime < viestiLoppuu ? 1f : 0f;
            if (!Mathf.Approximately(viestiAlfa, kohde))
            {
                viestiAlfa = Mathf.MoveTowards(viestiAlfa, kohde, Time.unscaledDeltaTime / haive);
                viestiRyhma.alpha = viestiAlfa * viestiAlfa * (3f - 2f * viestiAlfa);
            }
        }
    }
}
