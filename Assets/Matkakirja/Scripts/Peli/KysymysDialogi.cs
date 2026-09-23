// Kysymys natiivina UGUI-varanäkymänä (Pelikoodari, erä 4). Natiivi-UI tekee
// lopullisen näkymän UI Toolkitilla samaan rajapintaan (IKysymysNakyma,
// NakymaSopimukset.cs); tämä pitää kysymysvirran testattavana siihen asti.
//
// Modaalinen paneeli turva-alueen keskellä: otsikko, kehys (kysyjä), kysymys,
// kuva tai lippu, vaihtoehtonapit, vihje- ja 50:50-napit sekä aikapalkki.
// Vastauksen jälkeen vaihtoehdot värittyvät (oikea vihreä, väärä valinta
// punainen), alle fakta, lähteet ja löytö sekä Jatka-nappi. Sisältö vierii,
// jos se ei mahdu ruudulle. Himmennyksen napautus ei sulje kysymystä.
//
// Näkymä rakennetaan uudelleen jokaisessa Nayta-kutsussa (ohjain kutsuu sen
// jokaisen teon jälkeen); kuva ladataan vain, kun osoite vaihtuu.
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

namespace Matkakirja.Natiivi
{
    public sealed class KysymysDialogi : MonoBehaviour, IKysymysNakyma
    {
        public TMP_FontAsset fontti;
        public Color pohja = new Color32(0xf3, 0xea, 0xd3, 0xfa);
        public Color muste = new Color32(0x33, 0x27, 0x1b, 0xff);
        public Color nappi = new Color32(0xe4, 0xd4, 0xb0, 0xff);
        public Color nappiPainettu = new Color32(0xcf, 0xbb, 0x8f, 0xff);
        public Color oikeaVari = new Color32(0xb9, 0xd3, 0x9a, 0xff);
        public Color vaaraVari = new Color32(0xe0, 0xa4, 0x93, 0xff);
        public Color aikaVari = new Color32(0x8a, 0x5a, 0x2b, 0xff);
        public Color himmennys = new Color(0.10f, 0.08f, 0.06f, 0.45f);
        public float haive = 0.18f;

        const float Leveys = 350f, Reuna = 16f, Vali = 8f, NapinKorkeus = 46f;

        RectTransform turva, paneeli, sisalto, aikaPalkki;
        ScrollRect vieritys;
        CanvasGroup ryhma;
        TextMeshProUGUI aikaTeksti;
        RawImage kuva;
        string kuvaUrl;
        Coroutine kuvaLataus;
        float kohde, alfa;
        int? sekunnit;
        Rect viimeTurva;
        Vector2Int viimeKoko;

        public bool Auki => kohde > 0;

        /// <summary>Viimeksi näytetty tila (testikomentojen tilaraporttiin).</summary>
        public KysymysNaytto Nakyva { get; private set; }

        public void Rakenna(TMP_FontAsset kirjasin)
        {
            if (turva != null) return;
            if (kirjasin != null) fontti = kirjasin;

            var canvasGo = new GameObject("Kysymys", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(transform, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 30;
            Tilarivi.Skaalain(canvasGo.GetComponent<CanvasScaler>());

            var modaali = new GameObject("Modaali", typeof(RectTransform), typeof(CanvasGroup));
            modaali.transform.SetParent(canvasGo.transform, false);
            Tayta((RectTransform)modaali.transform);
            ryhma = modaali.GetComponent<CanvasGroup>();
            ryhma.alpha = 0;
            ryhma.blocksRaycasts = false;
            ryhma.interactable = false;

            // Himmennys ottaa napautukset vastaan (Image on raycast-kohde), mutta ei sulje.
            var tausta = new GameObject("Himmennys", typeof(RectTransform), typeof(Image));
            tausta.transform.SetParent(modaali.transform, false);
            Tayta((RectTransform)tausta.transform);
            tausta.GetComponent<Image>().color = himmennys;

            turva = Tilarivi.Turvaalue(modaali.transform);
            var p = new GameObject("Paneeli", typeof(RectTransform), typeof(Image));
            p.transform.SetParent(turva, false);
            paneeli = (RectTransform)p.transform;
            paneeli.anchorMin = paneeli.anchorMax = paneeli.pivot = new Vector2(0.5f, 0.5f);
            p.GetComponent<Image>().color = pohja;

            // Aikapalkki paneelin yläreunaan.
            var ap = new GameObject("Aikapalkki", typeof(RectTransform), typeof(Image));
            ap.transform.SetParent(paneeli, false);
            aikaPalkki = (RectTransform)ap.transform;
            aikaPalkki.anchorMin = new Vector2(0, 1);
            aikaPalkki.anchorMax = new Vector2(1, 1);
            aikaPalkki.pivot = new Vector2(0, 1);
            aikaPalkki.sizeDelta = new Vector2(0, 4);
            ap.GetComponent<Image>().color = aikaVari;
            aikaTeksti = Teksti(paneeli, "Aika", 13, FontStyles.Italic);
            aikaTeksti.alignment = TextAlignmentOptions.TopRight;
            var at = aikaTeksti.rectTransform;
            at.anchorMin = at.anchorMax = at.pivot = new Vector2(1, 1);
            at.sizeDelta = new Vector2(60, 18);
            at.anchoredPosition = new Vector2(-10, -8);

            // Vierivä sisältö.
            var v = new GameObject("Vieritys", typeof(RectTransform), typeof(RectMask2D), typeof(ScrollRect));
            v.transform.SetParent(paneeli, false);
            var vrt = (RectTransform)v.transform;
            Tayta(vrt);
            vrt.offsetMax = new Vector2(0, -6);
            sisalto = new GameObject("Sisalto", typeof(RectTransform)).GetComponent<RectTransform>();
            sisalto.SetParent(vrt, false);
            sisalto.anchorMin = sisalto.anchorMax = sisalto.pivot = new Vector2(0.5f, 1);
            vieritys = v.GetComponent<ScrollRect>();
            vieritys.viewport = vrt;
            vieritys.content = sisalto;
            vieritys.horizontal = false;
            vieritys.movementType = ScrollRect.MovementType.Clamped;
            vieritys.scrollSensitivity = 20;
        }

        static void Tayta(RectTransform rt)
        {
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
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
            t.textWrappingMode = TextWrappingModes.Normal;
            t.overflowMode = TextOverflowModes.Overflow;
            t.raycastTarget = false;
            return t;
        }

        void Varit(Button b, Color perus)
        {
            var c = b.colors;
            c.normalColor = Color.white;
            c.highlightedColor = Color.white;
            c.selectedColor = Color.white;
            c.disabledColor = new Color(1, 1, 1, 0.5f);
            c.pressedColor = new Color(nappiPainettu.r / Mathf.Max(0.01f, perus.r), nappiPainettu.g / Mathf.Max(0.01f, perus.g),
                nappiPainettu.b / Mathf.Max(0.01f, perus.b), 1f);
            c.fadeDuration = 0.06f;
            b.colors = c;
        }

        /// <summary>Lisää tekstin sisältöön kohtaan y; palauttaa uuden y:n.</summary>
        float Lisaa(string teksti, float koko, FontStyles tyyli, float y, float leveys, Color? vari = null,
            TextAlignmentOptions tasaus = TextAlignmentOptions.Center)
        {
            if (string.IsNullOrEmpty(teksti)) return y;
            var t = Teksti(sisalto, "Teksti", koko, tyyli);
            t.text = teksti;
            t.alignment = tasaus;
            if (vari.HasValue) t.color = vari.Value;
            float k = Mathf.Ceil(t.GetPreferredValues(teksti, leveys, 0).y) + 2;
            Ylhaalta(t.rectTransform, y, k, leveys);
            return y + k + Vali;
        }

        static void Ylhaalta(RectTransform rt, float y, float korkeus, float leveys)
        {
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 1);
            rt.pivot = new Vector2(0.5f, 1);
            rt.sizeDelta = new Vector2(leveys, korkeus);
            rt.anchoredPosition = new Vector2(0, -y);
        }

        float Nappi(string teksti, float y, float leveys, float x, Color vari, bool kaytossa, Action painettu, float koko = 17)
        {
            var go = new GameObject("Nappi", typeof(RectTransform), typeof(Image), typeof(Button));
            go.transform.SetParent(sisalto, false);
            go.GetComponent<Image>().color = vari;
            var b = go.GetComponent<Button>();
            Varit(b, vari);
            b.interactable = kaytossa;
            if (painettu != null) b.onClick.AddListener(() => { if (Auki) painettu(); });
            var t = Teksti(go.transform, "Teksti", koko, FontStyles.Normal);
            t.text = teksti;
            float tl = leveys - 20;
            float k = Mathf.Max(NapinKorkeus, Mathf.Ceil(t.GetPreferredValues(teksti, tl, 0).y) + 16);
            var rt = (RectTransform)go.transform;
            Ylhaalta(rt, y, k, leveys);
            rt.anchoredPosition = new Vector2(x, -y);
            var trt = t.rectTransform;
            trt.anchorMin = Vector2.zero;
            trt.anchorMax = Vector2.one;
            trt.offsetMin = new Vector2(10, 4);
            trt.offsetMax = new Vector2(-10, -4);
            return k;
        }

        public void Nayta(KysymysNaytto d, KysymysToiminnot t)
        {
            if (turva == null) Rakenna(fontti);
            Nakyva = d;
            for (int i = sisalto.childCount - 1; i >= 0; i--) Destroy(sisalto.GetChild(i).gameObject);
            kuva = null;

            float leveys = Leveys - 2 * Reuna;
            float y = Reuna + 4;
            y = Lisaa(d.Otsikko, 14, FontStyles.SmallCaps, y, leveys);
            y = Lisaa(d.Kehys, 15, FontStyles.Italic, y, leveys);
            y = Lisaa(d.Paikka, 17, FontStyles.Bold, y, leveys);
            y = Lisaa(d.Kysymys, 20, FontStyles.Normal, y, leveys);

            if (!string.IsNullOrEmpty(d.KuvaUrl))
            {
                var kg = new GameObject("Kuva", typeof(RectTransform), typeof(RawImage));
                kg.transform.SetParent(sisalto, false);
                kuva = kg.GetComponent<RawImage>();
                kuva.color = new Color(1, 1, 1, 0);
                float kk = d.Laji == KysymysLaji.Lippu ? 120 : 180;
                Ylhaalta((RectTransform)kg.transform, y, kk, leveys);
                y += kk + Vali;
                y = Lisaa(d.KuvaLahde, 10, FontStyles.Italic, y - Vali + 2, leveys);
                LataaKuva(d.KuvaUrl);
            }

            y += 4;
            for (int i = 0; i < d.Vaihtoehdot.Count; i++)
            {
                if (d.Piilotetut.Contains(i)) continue;
                int indeksi = i;
                var vari = nappi;
                if (d.Vastattu)
                {
                    if (i == d.Oikea) vari = oikeaVari;
                    else if (i == d.Valittu) vari = vaaraVari;
                    else vari = new Color(nappi.r, nappi.g, nappi.b, 0.55f);
                }
                y += Nappi(d.Vaihtoehdot[i], y, leveys, 0, vari, !d.Vastattu, () => t?.Vastaa?.Invoke(indeksi)) + Vali;
            }

            if (!d.Vastattu)
            {
                if (!string.IsNullOrEmpty(d.Vihje)) y = Lisaa("Vihje: " + d.Vihje, 15, FontStyles.Italic, y + 2, leveys);
                y = Lisaa(d.Huomautus, 14, FontStyles.Italic, y, leveys);
                string puolitusTeksti = d.PuolitusTeksti ?? $"50:50 {d.PuolitusHinta} {d.Valuutta}";
                bool puolitusKay = !d.PuolitusHarmaa && d.Raha >= d.PuolitusHinta;
                bool vihje = d.VihjeTarjolla, puolitus = d.PuolitusTarjolla;
                if (vihje || puolitus)
                {
                    float puoli = (leveys - Vali) / 2;
                    float kv = 0;
                    if (vihje && puolitus)
                    {
                        kv = Nappi($"Vihje {d.VihjeHinta} {d.Valuutta}", y, puoli, -(puoli + Vali) / 2, nappi, d.Raha >= d.VihjeHinta, () => t?.Vihje?.Invoke(), 15);
                        Nappi(puolitusTeksti, y, puoli, (puoli + Vali) / 2, nappi, puolitusKay, () => t?.Puolita?.Invoke(), 15);
                    }
                    else if (vihje)
                        kv = Nappi($"Vihje {d.VihjeHinta} {d.Valuutta}", y, puoli, 0, nappi, d.Raha >= d.VihjeHinta, () => t?.Vihje?.Invoke(), 15);
                    else
                        kv = Nappi(puolitusTeksti, y, d.PuolitusTeksti != null ? leveys : puoli, 0, nappi, puolitusKay, () => t?.Puolita?.Invoke(), 15);
                    y += kv + Vali;
                }
            }
            else
            {
                if (d.Laji != KysymysLaji.Tapahtumakortti)
                {
                    string tulos = d.AikaLoppui ? "Aika loppui." : d.Oikein ? "Oikein!" : "Väärin.";
                    y = Lisaa(tulos, 20, FontStyles.Bold, y + 4, leveys);
                }
                y = Lisaa(d.Loyto, 17, FontStyles.Normal, y, leveys);
                y = Lisaa(d.Fakta, 15, FontStyles.Normal, y, leveys, null, TextAlignmentOptions.Left);
                if (d.Lahteet != null && d.Lahteet.Count > 0)
                    y = Lisaa("Lähde: " + string.Join(", ", d.Lahteet), 11, FontStyles.Italic, y, leveys, null, TextAlignmentOptions.Left);
                y += Nappi(d.JatkaTeksti ?? "Jatka", y + 4, leveys * 0.7f, 0, nappi, true, () => t?.Jatka?.Invoke()) + Vali + 4;
            }
            y = Lisaa(d.Viesti, 14, FontStyles.Italic, y, leveys, vaaraVari * 0.6f + muste * 0.4f);
            y += Reuna - Vali;

            sisalto.sizeDelta = new Vector2(Leveys, y);
            if (!Auki) sisalto.anchoredPosition = Vector2.zero;
            // Paneeli enintään turva-alueen korkeus − marginaali; loput vierii.
            float maksimi = Mathf.Max(200, turva.rect.height - 40);
            paneeli.sizeDelta = new Vector2(Leveys, Mathf.Min(y + 6, maksimi));

            sekunnit = d.Vastattu ? null : d.Sekunnit;
            aikaPalkki.gameObject.SetActive(sekunnit.HasValue);
            aikaTeksti.gameObject.SetActive(sekunnit.HasValue);

            kohde = 1;
            ryhma.blocksRaycasts = true;
            ryhma.interactable = true;
        }

        public void PaivitaAika(float jaljellaS)
        {
            if (!sekunnit.HasValue || aikaPalkki == null) return;
            float osuus = Mathf.Clamp01(jaljellaS / Mathf.Max(1, sekunnit.Value));
            aikaPalkki.anchorMax = new Vector2(osuus, 1);
            aikaTeksti.text = Mathf.CeilToInt(Mathf.Max(0, jaljellaS)) + " s";
        }

        public void Piilota()
        {
            kohde = 0;
            sekunnit = null;
            if (ryhma == null) return;
            ryhma.blocksRaycasts = false;
            ryhma.interactable = false;
        }

        void LataaKuva(string url)
        {
            if (url == kuvaUrl && kuvaLataus == null && ladattu != null) { Aseta(ladattu); return; }
            if (kuvaLataus != null) StopCoroutine(kuvaLataus);
            kuvaUrl = url;
            kuvaLataus = StartCoroutine(Lataa(url));
        }

        Texture2D ladattu;

        IEnumerator Lataa(string url)
        {
            using var r = UnityWebRequestTexture.GetTexture(url);
            r.timeout = 20;
            yield return r.SendWebRequest();
            kuvaLataus = null;
            if (r.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning("MATKAKIRJA kysymys: kuva ei latautunut " + url + ": " + r.error);
                yield break;
            }
            if (ladattu != null) Destroy(ladattu);
            ladattu = DownloadHandlerTexture.GetContent(r);
            Aseta(ladattu);
        }

        void Aseta(Texture2D tex)
        {
            if (kuva == null || tex == null) return;
            kuva.texture = tex;
            kuva.color = Color.white;
            // Sovita kuvasuhde laatikkoon.
            var rt = kuva.rectTransform;
            float lk = rt.sizeDelta.x, kk = rt.sizeDelta.y;
            float suhde = (float)tex.width / Mathf.Max(1, tex.height);
            float l = Mathf.Min(lk, kk * suhde);
            rt.sizeDelta = new Vector2(l, l / suhde);
        }

        void Update()
        {
            if (turva == null) return;
            Tilarivi.PaivitaTurvaalue(turva, ref viimeTurva, ref viimeKoko);
            if (Mathf.Approximately(alfa, kohde)) return;
            alfa = Mathf.MoveTowards(alfa, kohde, Time.unscaledDeltaTime / haive);
            ryhma.alpha = alfa * alfa * (3f - 2f * alfa);
        }

        void OnDestroy()
        {
            if (ladattu != null) Destroy(ladattu);
        }
    }
}
