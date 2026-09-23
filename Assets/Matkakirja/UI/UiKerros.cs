// UI-KERROS: natiivin Matkakirjan UI Toolkit -pohja (Natiivi-UI, 23.9.2026).
//
// Luo ajonaikaisesti (ei Rakennus.cs-muutoksia, ei kohtausmuutoksia) yhden
// PanelSettingsin per piirtokerros ja jokaiselle UIDocumentin. Kerrokset
// lomittuvat UGUI:n ScreenSpaceOverlay-canvasten kanssa sortingOrderin mukaan
// (RAJAPINTA.md: 10 nimikortti, 15 tilarivi, 20 matkavalinta, 25 linssit,
// 30 pelidialogit, 40 valikot, kartuscha, pulu).
//
// Mitoitus kuten UGUI-näkymissä (Tilarivi.Skaalain): viiteruutu 393 × 852
// pistettä (iPhone 15), leveys ja korkeus puoliksi. Jokaisen kerroksen juuren
// lapsi "mk-turva" (position absolute) seuraa reunoillaan Screen.safeAreaa (lovi, Dynamic Island, kotipalkki).
//
// Kosketukset: PalloKierto lukee Input Systemiä suoraan. PeittaaPisteen kertoo,
// osuuko ruudun piste johonkin poimittavaan UI-elementtiin (pickingMode
// Position); läpinäkyvät kehykset ovat pickingMode Ignore.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class UiKerros : MonoBehaviour
    {
        public const string TeemaPolku = "MatkakirjaUI/Matkakirja";
        /// <summary>Editorissa luotu PanelSettings-pohja (Create → UI Toolkit → Panel Settings Asset).</summary>
        public const string PaneeliPolku = "MatkakirjaUI/Paneeli";
        public static readonly Vector2Int Viiteruutu = new Vector2Int(393, 852);

        public const int Tilarivi = 15, Matkavalinta = 20, Pelidialogit = 30, Valikot = 40;

        static UiKerros instanssi;

        readonly Dictionary<int, UIDocument> dokumentit = new Dictionary<int, UIDocument>();
        readonly Dictionary<int, VisualElement> turvat = new Dictionary<int, VisualElement>();
        ThemeStyleSheet teema;
        Rect viimeTurva;
        Vector2Int viimeKoko;
        bool nakyvissa = true;
        readonly Dictionary<int, Vector4> reunat = new Dictionary<int, Vector4>();

        /// <summary>Turva-alueen reunat muuttuivat (kierto, ensimmäinen asettelu).</summary>
        public event Action TurvaMuuttui;

        /// <summary>Kerroksen turva-alueen reunat paneelin pisteinä: x vasen, y ylä, z oikea, w ala.</summary>
        public Vector4 Reunat(int kerros) => reunat.TryGetValue(kerros, out var r) ? r : Vector4.zero;

        /// <summary>Kerroksen ainoa instanssi (luodaan ensimmäisellä kutsulla).</summary>
        public static UiKerros Hae()
        {
            if (instanssi != null) return instanssi;
            var go = new GameObject("UiKerros");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<UiKerros>();
            return instanssi;
        }

        public static bool Olemassa => instanssi != null;

        void Awake()
        {
            if (instanssi != null && instanssi != this) { Destroy(gameObject); return; }
            instanssi = this;
            teema = Resources.Load<ThemeStyleSheet>(TeemaPolku);
            if (teema == null) Debug.LogWarning("MATKAKIRJA ui: teemaa Resources/" + TeemaPolku + " ei löytynyt");
        }

        void OnDestroy()
        {
            if (instanssi == this) instanssi = null;
        }

        /// <summary>
        /// Kerroksen turva-alueen juuri (luodaan tarvittaessa). Näkymät lisäävät
        /// omat elementtinsä tähän. Turva-alue itse ei ota kosketuksia.
        /// </summary>
        public VisualElement Turva(int kerros)
        {
            if (turvat.TryGetValue(kerros, out var t)) return t;
            var doc = Dokumentti(kerros);
            var juuri = doc.rootVisualElement;
            t = new VisualElement { name = "turva", pickingMode = PickingMode.Ignore };
            t.AddToClassList("mk-turva");
            juuri.Add(t);
            turvat[kerros] = t;
            viimeKoko = default; // pakottaa turva-alueen päivityksen
            PaivitaTurvaalueet();
            return t;
        }

        /// <summary>Kerroksen koko ruudun juuri (himmennykset, jotka peittävät myös turva-alueen ulkopuolen).</summary>
        public VisualElement Juuri(int kerros) => Dokumentti(kerros).rootVisualElement;

        UIDocument Dokumentti(int kerros)
        {
            if (dokumentit.TryGetValue(kerros, out var d)) return d;
            // Pohja-asset (editorissa luotu PanelSettings) tuo UI:n shaderit iOS-käännökseen:
            // koodissa luodulla PanelSettingsillä ei ole shaderiviitteitä, ja ne haetaan
            // nimellä unity_builtin_extrasta, johon pääsee vain viitattu shader.
            var pohja = Resources.Load<PanelSettings>(PaneeliPolku);
            if (pohja == null) Debug.LogWarning("MATKAKIRJA ui: Resources/" + PaneeliPolku + " puuttuu — UI:n shaderit voivat puuttua laitekäännöksestä");
            var asetukset = pohja != null ? Instantiate(pohja) : ScriptableObject.CreateInstance<PanelSettings>();
            asetukset.name = "Matkakirja UI " + kerros;
            asetukset.themeStyleSheet = teema;
            asetukset.scaleMode = PanelScaleMode.ScaleWithScreenSize;
            asetukset.referenceResolution = Viiteruutu;
            asetukset.screenMatchMode = PanelScreenMatchMode.MatchWidthOrHeight;
            asetukset.match = 0.5f;
            asetukset.sortingOrder = kerros;
            asetukset.clearColor = false;

            // UIDocument vaatii PanelSettingsin ennen OnEnablea: luodaan passiivisena.
            var go = new GameObject("UI " + kerros);
            go.SetActive(false);
            go.transform.SetParent(transform, false);
            d = go.AddComponent<UIDocument>();
            d.panelSettings = asetukset;
            go.SetActive(true);
            var juuri = d.rootVisualElement;
            juuri.pickingMode = PickingMode.Ignore;
            juuri.AddToClassList("mk-juuri");
            if (!nakyvissa) juuri.style.display = DisplayStyle.None;
            dokumentit[kerros] = d;
            return d;
        }

        /// <summary>Koko UI näkyviin tai pois (PeliOhjain.AsetaKaytossa, 3D-mittaukset).</summary>
        public void Nayta(bool paalla)
        {
            nakyvissa = paalla;
            foreach (var d in dokumentit.Values)
                if (d.rootVisualElement != null) d.rootVisualElement.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
        }

        public bool Nakyvissa => nakyvissa;

        /// <summary>
        /// Osuuko ruudun piste (Input Systemin pikselit, origo vasen alakulma)
        /// johonkin poimittavaan UI-elementtiin millä tahansa kerroksella.
        /// </summary>
        public bool PeittaaPisteen(Vector2 ruutu)
        {
            if (!nakyvissa) return false;
            var ylhaalta = new Vector2(ruutu.x, Screen.height - ruutu.y);
            foreach (var d in dokumentit.Values)
            {
                var juuri = d.rootVisualElement;
                var paneeli = juuri?.panel;
                if (paneeli == null) continue;
                var p = RuntimePanelUtils.ScreenToPanel(paneeli, ylhaalta);
                var osuma = paneeli.Pick(p);
                if (osuma != null && osuma != juuri) return true;
            }
            return false;
        }

        /// <summary>Staattinen oikotie (PalloKierron UiPeittaa-koukulle).</summary>
        public static bool Peittaa(Vector2 ruutu) => instanssi != null && instanssi.PeittaaPisteen(ruutu);

        static readonly Queue<Action> paasaie = new Queue<Action>();

        /// <summary>Ajaa toiminnon pääsäikeessä seuraavassa ruudussa (turvallinen mistä tahansa säikeestä).</summary>
        public static void PaaSaikeessa(Action a)
        {
            if (a == null) return;
            lock (paasaie) paasaie.Enqueue(a);
        }

        /// <summary>Joka ruudussa (esim. napautus paneelin ohi pallolle, jota UI ei näe).</summary>
        public event Action JokaRuutu;

        void Update()
        {
            PaivitaTurvaalueet();
            JokaRuutu?.Invoke();
            while (true)
            {
                Action a;
                lock (paasaie) { if (paasaie.Count == 0) break; a = paasaie.Dequeue(); }
                try { a(); } catch (Exception e) { Debug.LogException(e); }
            }
        }

        void PaivitaTurvaalueet()
        {
            var alue = Screen.safeArea;
            var koko = new Vector2Int(Screen.width, Screen.height);
            if (alue == viimeTurva && koko == viimeKoko) return;
            viimeTurva = alue;
            viimeKoko = koko;
            if (koko.x <= 0 || koko.y <= 0) return;
            bool muuttui = false;
            foreach (var pari in turvat)
            {
                var paneeli = pari.Value.panel;
                if (paneeli == null) { viimeKoko = default; continue; } // paneeli ei vielä valmis: uusi yritys seuraavassa ruudussa
                // Ruudun pikselit (origo ylhäällä) → paneelin pisteet.
                var vy = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(alue.xMin, koko.y - alue.yMax));
                var oa = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(alue.xMax, koko.y - alue.yMin));
                var taysi = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(koko.x, koko.y));
                var s = pari.Value.style;
                // Reunat (ei padding): absoluuttiset lapset asettuvat turva-alueen reunoihin.
                s.left = Mathf.Max(0, vy.x);
                s.top = Mathf.Max(0, vy.y);
                s.right = Mathf.Max(0, taysi.x - oa.x);
                s.bottom = Mathf.Max(0, taysi.y - oa.y);
                reunat[pari.Key] = new Vector4(s.left.value.value, s.top.value.value, s.right.value.value, s.bottom.value.value);
                muuttui = true;
            }
            if (muuttui) TurvaMuuttui?.Invoke();
        }
    }
}
