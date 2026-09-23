// Matkavalinta natiivina käyttöliittymänä (Pelikoodari, erä 3): kaupungin
// nimi, pelaajan raha ja päivä sekä yksi nappi per kulkutapa (bussi, lento,
// liftaus, laiva; PeliApu.Vaihtoehdot) hintoineen, ja Peruuta. Lisäksi
// kartan alareunan "Heitä noppaa" -nappi, kun matka on kesken reitillä.
//
// Rakennetaan koodista UGUI + TextMeshPro kuten NimiKortti (pergamentti
// #f3ead3, muste #33271b, EB Garamond). Napit tarvitsevat EventSystemin
// (Input System -moduuli), jonka PeliOhjain luo, jos kohtauksessa ei ole.
//
// PalloKierto lukee kosketukset suoraan Input Systemistä eikä tiedä
// käyttöliittymästä: PeittaaPisteen kertoo PeliOhjaimelle, osuiko napautus
// tähän näkymään, jotta pallon napautus ohitetaan.
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Matkakirja.Natiivi
{
    public sealed class MatkaDialogi : MonoBehaviour
    {
        public TMP_FontAsset fontti;
        public Color pohja = new Color32(0xf3, 0xea, 0xd3, 0xf8);
        public Color muste = new Color32(0x33, 0x27, 0x1b, 0xff);
        public Color nappi = new Color32(0xe4, 0xd4, 0xb0, 0xff);
        public Color nappiPainettu = new Color32(0xcf, 0xbb, 0x8f, 0xff);
        public Color himmennys = new Color(0.10f, 0.08f, 0.06f, 0.35f);
        public float haive = 0.18f;

        const float Leveys = 320f, Reuna = 16f, RivinKorkeus = 58f, Vali = 8f;

        RectTransform turva, paneeli, rivit, heittoNappi;
        CanvasGroup ryhma, heittoRyhma;
        TextMeshProUGUI otsikko, alaotsikko, heittoTeksti;
        Action peruuta, heita;
        float kohde, alfa, heittoKohde, heittoAlfa;
        Rect viimeTurva;
        Vector2Int viimeKoko;

        /// <summary>Onko matkavalinta auki (modaalinen: pallon napautukset ohitetaan).</summary>
        public bool Auki => kohde > 0;
        public bool HeittoNakyy => heittoKohde > 0;
        public string Otsikko => otsikko != null ? otsikko.text : null;

        /// <summary>Rakentaa näkymän (fontti annetaan tässä; Awake ajetaan ennen kentän asetusta).</summary>
        public void Rakenna(TMP_FontAsset kirjasin)
        {
            if (turva != null) return;
            if (kirjasin != null) fontti = kirjasin;

            var canvasGo = new GameObject("Matkavalinta", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(transform, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 20;
            Tilarivi.Skaalain(canvasGo.GetComponent<CanvasScaler>());
            turva = Tilarivi.Turvaalue(canvasGo.transform);

            // --- modaalinen valinta: himmennys (napautus = peruuta) ja paneeli ---
            var modaali = new GameObject("Modaali", typeof(RectTransform), typeof(CanvasGroup));
            modaali.transform.SetParent(canvasGo.transform, false);
            Tayta((RectTransform)modaali.transform);
            ryhma = modaali.GetComponent<CanvasGroup>();
            ryhma.alpha = 0;
            ryhma.blocksRaycasts = false;
            ryhma.interactable = false;

            var tausta = new GameObject("Himmennys", typeof(RectTransform), typeof(Image), typeof(Button));
            tausta.transform.SetParent(modaali.transform, false);
            Tayta((RectTransform)tausta.transform);
            tausta.GetComponent<Image>().color = himmennys;
            var taustaNappi = tausta.GetComponent<Button>();
            taustaNappi.transition = Selectable.Transition.None;
            taustaNappi.onClick.AddListener(() => Peruuta());

            // Paneeli turva-alueen keskelle (modaalin lapsi, mutta ankkurit turva-alueesta).
            var turvaModaali = Tilarivi.Turvaalue(modaali.transform);
            var p = new GameObject("Paneeli", typeof(RectTransform), typeof(Image));
            p.transform.SetParent(turvaModaali, false);
            paneeli = (RectTransform)p.transform;
            paneeli.anchorMin = paneeli.anchorMax = paneeli.pivot = new Vector2(0.5f, 0.5f);
            p.GetComponent<Image>().color = pohja; // estää himmennyksen napautuksen paneelin läpi

            otsikko = Teksti(paneeli, "Otsikko", 28, FontStyles.Normal);
            alaotsikko = Teksti(paneeli, "Alaotsikko", 14, FontStyles.Italic);
            rivit = new GameObject("Rivit", typeof(RectTransform)).GetComponent<RectTransform>();
            rivit.SetParent(paneeli, false);

            // --- heittonappi kartan alareunaan (ei modaalinen) ---
            var h = new GameObject("Heitto", typeof(RectTransform), typeof(CanvasGroup), typeof(Image), typeof(Button));
            h.transform.SetParent(turva, false);
            heittoNappi = (RectTransform)h.transform;
            heittoNappi.anchorMin = heittoNappi.anchorMax = new Vector2(0.5f, 0);
            heittoNappi.pivot = new Vector2(0.5f, 0);
            heittoNappi.sizeDelta = new Vector2(260, 48);
            heittoNappi.anchoredPosition = new Vector2(0, 148); // NimiKortin (44 + 86) yläpuolelle
            h.GetComponent<Image>().color = pohja;
            var hb = h.GetComponent<Button>();
            Varit(hb);
            hb.onClick.AddListener(() => heita?.Invoke());
            heittoRyhma = h.GetComponent<CanvasGroup>();
            heittoRyhma.alpha = 0;
            heittoRyhma.blocksRaycasts = false;
            heittoRyhma.interactable = false;
            heittoTeksti = Teksti(heittoNappi, "Teksti", 19, FontStyles.Normal);
            Tayta(heittoTeksti.rectTransform, 8);
        }

        static void Tayta(RectTransform rt, float sisennys = 0)
        {
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = new Vector2(sisennys, 0);
            rt.offsetMax = new Vector2(-sisennys, 0);
        }

        void Varit(Button b)
        {
            var c = b.colors;
            c.normalColor = Color.white;
            c.highlightedColor = Color.white;
            c.selectedColor = Color.white;
            c.pressedColor = new Color(nappiPainettu.r / Mathf.Max(0.01f, nappi.r), nappiPainettu.g / Mathf.Max(0.01f, nappi.g),
                nappiPainettu.b / Mathf.Max(0.01f, nappi.b), 1f);
            c.fadeDuration = 0.06f;
            b.colors = c;
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
            return t;
        }

        /// <summary>Asettaa lapsen paneelin yläreunasta alkaen (y alaspäin).</summary>
        static void Ylhaalta(RectTransform rt, float y, float korkeus, float leveys)
        {
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 1);
            rt.pivot = new Vector2(0.5f, 1);
            rt.sizeDelta = new Vector2(leveys, korkeus);
            rt.anchoredPosition = new Vector2(0, -y);
        }

        RectTransform Nappi(Transform isa, string ylarivi, string alarivi, Action painettu)
        {
            var go = new GameObject("Nappi " + ylarivi, typeof(RectTransform), typeof(Image), typeof(Button));
            go.transform.SetParent(isa, false);
            go.GetComponent<Image>().color = nappi;
            var b = go.GetComponent<Button>();
            Varit(b);
            b.onClick.AddListener(() => painettu());
            var rt = (RectTransform)go.transform;
            var yla = Teksti(rt, "Nimi", 19, FontStyles.Normal);
            if (string.IsNullOrEmpty(alarivi))
                Tayta(yla.rectTransform, 10);
            else
            {
                var ala = Teksti(rt, "Selite", 13, FontStyles.Italic);
                ala.text = alarivi;
                yla.rectTransform.anchorMin = new Vector2(0, 0.45f);
                yla.rectTransform.anchorMax = new Vector2(1, 1);
                yla.rectTransform.offsetMin = new Vector2(10, 0);
                yla.rectTransform.offsetMax = new Vector2(-10, -2);
                ala.rectTransform.anchorMin = new Vector2(0, 0);
                ala.rectTransform.anchorMax = new Vector2(1, 0.45f);
                ala.rectTransform.offsetMin = new Vector2(10, 4);
                ala.rectTransform.offsetMax = new Vector2(-10, 0);
            }
            yla.text = ylarivi;
            return rt;
        }

        /// <summary>
        /// Näyttää matkavalinnan: rivit = (nimi, selite), valittu(indeksi) ja
        /// peruuta (myös himmennyksen napautus). Tyhjä rivilista näyttää vain
        /// alaotsikon viestin ja Peruuta-napin.
        /// </summary>
        public void Nayta(string ylaotsikko, string ala, IReadOnlyList<(string Nimi, string Selite)> vaihtoehdot,
            Action<int> valittu, Action peru)
        {
            if (turva == null) Rakenna(fontti);
            peruuta = peru;
            for (int i = rivit.childCount - 1; i >= 0; i--) Destroy(rivit.GetChild(i).gameObject);

            float leveys = Leveys - 2 * Reuna;
            float y = Reuna;
            otsikko.text = ylaotsikko;
            Ylhaalta(otsikko.rectTransform, y, 38, leveys); y += 38;
            alaotsikko.text = ala;
            Ylhaalta(alaotsikko.rectTransform, y, 22, leveys); y += 22 + 12;

            float rivitAlku = y;
            int n = vaihtoehdot?.Count ?? 0;
            for (int i = 0; i < n; i++)
            {
                int indeksi = i;
                var r = Nappi(rivit, vaihtoehdot[i].Nimi, vaihtoehdot[i].Selite, () => { if (Auki) valittu?.Invoke(indeksi); });
                Ylhaalta(r, i * (RivinKorkeus + Vali), RivinKorkeus, leveys);
            }
            float rivitKorkeus = n * (RivinKorkeus + Vali);
            Ylhaalta(rivit, rivitAlku, rivitKorkeus, leveys);
            y += rivitKorkeus + 4;

            var peruNappi = Nappi(rivit, "Peruuta", null, () => Peruuta());
            // Peruuta rivien perään (rivit-kansion sisällä, joten se poistuu seuraavassa Naytassa).
            Ylhaalta(peruNappi, rivitKorkeus + 4, 42, leveys * 0.6f);
            ((RectTransform)peruNappi).GetComponent<Image>().color = new Color(nappi.r, nappi.g, nappi.b, 0.55f);
            rivit.sizeDelta = new Vector2(leveys, rivitKorkeus + 4 + 42);
            y += 42 + Reuna;
            paneeli.sizeDelta = new Vector2(Leveys, y);

            kohde = 1;
            ryhma.blocksRaycasts = true;
            ryhma.interactable = true;
        }

        public void Piilota()
        {
            kohde = 0;
            peruuta = null;
            if (ryhma == null) return;
            ryhma.blocksRaycasts = false;
            ryhma.interactable = false;
        }

        /// <summary>Peruuta-nappi tai himmennyksen napautus: sulkee ja kertoo kutsujalle.</summary>
        public void Peruuta()
        {
            if (!Auki) return;
            var p = peruuta;
            Piilota();
            p?.Invoke();
        }

        /// <summary>Kartan "Heitä noppaa" -nappi (matka kesken reitillä).</summary>
        public void NaytaHeitto(string teksti, Action painettu)
        {
            if (turva == null) Rakenna(fontti);
            heittoTeksti.text = teksti;
            heita = painettu;
            heittoKohde = 1;
            heittoRyhma.blocksRaycasts = true;
            heittoRyhma.interactable = true;
        }

        public void PiilotaHeitto()
        {
            heittoKohde = 0;
            heita = null;
            if (heittoRyhma == null) return;
            heittoRyhma.blocksRaycasts = false;
            heittoRyhma.interactable = false;
        }

        /// <summary>Osuuko näytön piste (pikseleinä) tähän näkymään: auki ollessa koko ruutu, muuten heittonappi.</summary>
        public bool PeittaaPisteen(Vector2 ruutu)
        {
            if (Auki) return true;
            return HeittoNakyy && heittoNappi != null
                && RectTransformUtility.RectangleContainsScreenPoint(heittoNappi, ruutu, null);
        }

        void Update()
        {
            if (turva == null) return;
            Tilarivi.PaivitaTurvaalue(turva, ref viimeTurva, ref viimeKoko);
            // Modaalin turva-alue on sen oma lapsi; päivitetään samaan.
            var turvaModaali = (RectTransform)paneeli.parent;
            turvaModaali.anchorMin = turva.anchorMin;
            turvaModaali.anchorMax = turva.anchorMax;
            Haivyta(ref alfa, kohde, ryhma);
            Haivyta(ref heittoAlfa, heittoKohde, heittoRyhma);
        }

        void Haivyta(ref float a, float k, CanvasGroup g)
        {
            if (Mathf.Approximately(a, k)) return;
            a = Mathf.MoveTowards(a, k, Time.unscaledDeltaTime / haive);
            g.alpha = a * a * (3f - 2f * a);
        }
    }
}
