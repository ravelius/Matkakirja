// UI-KERROS: natiivin Matkakirjan UI Toolkit -pohja (Natiivi-UI, 23.9.2026).
//
// Luo ajonaikaisesti (ei Rakennus.cs-muutoksia, ei kohtausmuutoksia) yhden
// PanelSettingsin per piirtokerros ja jokaiselle UIDocumentin. Kerrokset
// lomittuvat UGUI:n ScreenSpaceOverlay-canvasten kanssa sortingOrderin mukaan
// (RAJAPINTA.md: 10 nimikortti, 15 tilarivi, 20 matkavalinta, 25 linssit,
// 30 pelidialogit, 40 valikot, kartuscha, pulu).
//
// Mitoitus: laitteella (iPad Fable 24.9., iPhone 25.9.2026) 1 UI-yksikkö = 1 iOS-piste = webin CSS-px (ConstantPixelSize, pikseliä
// pisteessä): viiteruutu 393 × 852 (editori ja `ui skaala viite`) teki iPad Pro 11":n UI:sta 1,74-kertaisen ja
// iPhonen vaaka-asennon 1,35-kertaisen webiin verrattuna. Testikomento
// `ui skaala piste|viite|auto` vaihtaa ajon aikana (PlayerPrefs matkakirja-ui-skaala). Jokaisen kerroksen juuren
// lapsi "mk-turva" (position absolute) seuraa reunoillaan Screen.safeAreaa (lovi, Dynamic Island, kotipalkki).
//
// Kosketukset: PalloKierto lukee Input Systemiä suoraan. PeittaaPisteen kertoo,
// osuuko ruudun piste johonkin poimittavaan UI-elementtiin (pickingMode
// Position); läpinäkyvät kehykset ovat pickingMode Ignore.
//
// Lämpö (Pelikoodarin lämpöerä 25.9.2026, Kartta/Ruudunpaivitys): UI on rauhassa, kun yksikään kerros ei ole
// muuttunut (IPanel.isDirty) RauhaS-aikaan. Paneelit päivittyvät (ajastimet, transitiot, asettelu) PreLateUpdatessa
// ennen LateUpdatea, joten joka kehyksen näyte näkee kaikki muutokset ennen piirtoa. USS-transitio herättää täyden
// taajuuden kestonsa ajaksi (TransitionRunEvent), ja käsin ajetut kehysanimaatiot (Every(16)) kutsuvat
// Ruudunpaivitys.Heratan itse. Testikomento `ui rauha` kertoo tilan.
using System;
using System.Collections.Generic;
using System.Linq;
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

        public const int Tilarivi = 15, Matkavalinta = 20, Pelidialogit = 30, Valikot = 40, Traileri = 45;
        /// <summary>Nostomerkit kartalla (NostotKartalla): nimikortin (10) yllä, tilarivin (15) alla.</summary>
        public const int Nostot = 12;

        static UiKerros instanssi;

        readonly Dictionary<int, UIDocument> dokumentit = new Dictionary<int, UIDocument>();
        readonly Dictionary<int, VisualElement> turvat = new Dictionary<int, VisualElement>();
        ThemeStyleSheet teema;
        Rect viimeTurva;
        Vector2Int viimeKoko;
        bool nakyvissa = true;
        readonly Dictionary<int, Vector4> reunat = new Dictionary<int, Vector4>();

        /// <summary>UI on rauhassa, kun mikään kerros ei ole muuttunut näin pitkään (s).</summary>
        public const float RauhaS = 0.5f;
        /// <summary>Transition herätyksen yläraja (s): pitkätkään häivytykset eivät pidä täyttä taajuutta kauemmin.</summary>
        const float TransitioKatto = 3f;
        float viimeMuutos = float.NegativeInfinity;
        int muuttunutKerros = -1, transitioita;
        readonly Queue<float> muutokset = new Queue<float>();
        /// <summary>Muutosnäytteen tapa: false = IPanel.isDirty, true = paneelin sisäinen versio (heijastus). `ui rauha tapa`.</summary>
        public static bool VersioTapa;
        static readonly System.Reflection.PropertyInfo versioOminaisuus = typeof(IPanel).Assembly
            .GetType("UnityEngine.UIElements.BaseVisualElementPanel")?
            .GetProperty("version", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.NonPublic);
        readonly Dictionary<int, uint> versiot = new Dictionary<int, uint>();
        /// <summary>Diagnostiikka: kerroksen likaiset ja versiomuuttuneet kehykset (ui rauha nollaa).</summary>
        readonly Dictionary<int, (int Likainen, int Versio)> laskurit = new Dictionary<int, (int, int)>();
        int laskurinKehykset;
        public static bool Diagnostiikka;

        /// <summary>Turva-alueen reunat muuttuivat (kierto, ensimmäinen asettelu).</summary>
        public event Action TurvaMuuttui;

        /// <summary>Kerroksen turva-alueen reunat paneelin pisteinä: x vasen, y ylä, z oikea, w ala.</summary>
        /// <summary>Turva-alueet ja TurvaMuuttui uudelleen seuraavassa ruudussa (esim. yläpalkin vaakatila vaihtui).</summary>
        public void PakotaTurva() => viimeKoko = default;

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
            Ruudunpaivitys.UiRauhassa = Rauhassa;
            teema = Resources.Load<ThemeStyleSheet>(TeemaPolku);
            if (teema == null) Debug.LogWarning("MATKAKIRJA ui: teemaa Resources/" + TeemaPolku + " ei löytynyt");
        }

        void OnDestroy()
        {
            if (instanssi == this) instanssi = null;
            if (Ruudunpaivitys.UiRauhassa == (Func<bool>)Rauhassa) Ruudunpaivitys.UiRauhassa = null;
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

        /// <summary>
        /// Kerroksen piirtojärjestys ajon aikana (oletus = kerroksen numero). Pulu ja chat nousevat lehden päälle
        /// lehden ajaksi (web: pulun nappi ja paneeli asuvat ylimmässä dialogissa, livianDialogikoti).
        /// </summary>
        public void AsetaJarjestys(int kerros, int jarjestys)
        {
            var d = Dokumentti(kerros);
            if (d.panelSettings != null && d.panelSettings.sortingOrder != jarjestys) d.panelSettings.sortingOrder = jarjestys;
        }

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
            AsetaSkaala(asetukset);
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
            juuri.RegisterCallback<TransitionRunEvent>(TransitioAlkoi, TrickleDown.TrickleDown);
            dokumentit[kerros] = d;
            return d;
        }

        const string SkaalaAvain = "matkakirja-ui-skaala";

        /// <summary>Tabletti (iPad): mallinimi tai, simulaattorissa, kuvasuhde alle 1,6 (iPadit 1,33–1,45, iPhonet ≥ 2).</summary>
        public static bool Tabletti
        {
            get
            {
                if (SystemInfo.deviceModel.StartsWith("iPad", StringComparison.Ordinal)) return true;
                if (!Application.isMobilePlatform) return false;
                float pitka = Mathf.Max(Screen.width, Screen.height), lyhyt = Mathf.Max(1, Mathf.Min(Screen.width, Screen.height));
                return pitka / lyhyt < 1.6f;
            }
        }

        /// <summary>
        /// Pisteskaala käytössä: iPadilla ja iPhonella oletuksena (Fable 25.9.2026: iPhonen vaaka 874 × 402 kuten webin
        /// CSS-px, viiteruutu teki siitä 648 × 298 ja UI:sta ~35 % webiä suuremman), editorissa viiteruutu.
        /// Testikomennolla pakotettavissa (piste | viite).
        /// </summary>
        public static bool Pisteskaala
        {
            get
            {
                string s = PlayerPrefs.GetString(SkaalaAvain, "");
                return s == "piste" || (s != "viite" && (Tabletti || Application.isMobilePlatform));
            }
        }

        /// <summary>
        /// Pikseliä iOS-pisteessä. iPadit ovat @2x (dpi / 132, mini 326 dpi → 2; tuntematon dpi → 2). iPhonella dpi ei kelpaa
        /// (iPadin kaava antoi iPhone 17 Pro -simulaattorissa ×2 ja paneelin 603 × 1311, Pelikoodari 25.9.): lyhyt sivu
        /// ≥ 1000 px on @3x (1080–1320), muuten @2x (SE 750, 11/XR 828).
        /// </summary>
        public static float PikseliaPisteessa
        {
            get
            {
                if (Tabletti) return Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 132f)) : 2f;
                return Mathf.Min(Screen.width, Screen.height) >= 1000 ? 3f : 2f;
            }
        }

        static void AsetaSkaala(PanelSettings asetukset)
        {
            if (Pisteskaala)
            {
                asetukset.scaleMode = PanelScaleMode.ConstantPixelSize;
                asetukset.scale = PikseliaPisteessa;
                return;
            }
            asetukset.scaleMode = PanelScaleMode.ScaleWithScreenSize;
            asetukset.referenceResolution = Viiteruutu;
            asetukset.screenMatchMode = PanelScreenMatchMode.MatchWidthOrHeight;
            asetukset.match = 0.5f;
            asetukset.scale = 1f;
        }

        /// <summary>Testikomento: skaala "piste", "viite" tai "auto" (tyhjä) kaikille kerroksille heti.</summary>
        public void VaihdaSkaala(string tila)
        {
            if (tila == "piste" || tila == "viite") PlayerPrefs.SetString(SkaalaAvain, tila);
            else PlayerPrefs.DeleteKey(SkaalaAvain);
            PlayerPrefs.Save();
            foreach (var d in dokumentit.Values) if (d.panelSettings != null) AsetaSkaala(d.panelSettings);
            viimeKoko = default; // turva-alueet uudelleen uudella skaalalla
        }

        /// <summary>Koko UI näkyviin tai pois (PeliOhjain.AsetaKaytossa, 3D-mittaukset).</summary>
        public void Nayta(bool paalla)
        {
            nakyvissa = paalla;
            foreach (var d in dokumentit.Values)
                if (d.rootVisualElement != null) d.rootVisualElement.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
        }

        public bool Nakyvissa => nakyvissa;

        /// <summary>Kaikki luodut kerrokset juurineen (diagnostiikka: UiKomennot "ui peitteet").</summary>
        public IEnumerable<(int Kerros, VisualElement Juuri)> Juuret =>
            dokumentit.OrderBy(kv => kv.Key).Select(kv => (kv.Key, kv.Value.rootVisualElement));

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

        void LateUpdate()
        {
            // Lämpö: muutosnäyte joka kehys (ks. tiedoston alku); Ruudunpaivitys (LateUpdate, järjestys 10000) lukee sen.
            if (!nakyvissa) return;
            bool versio = (VersioTapa || Diagnostiikka) && versioOminaisuus != null;
            if (Diagnostiikka) laskurinKehykset++;
            bool muuttui = false;
            foreach (var pari in dokumentit)
            {
                var p = pari.Value.rootVisualElement?.panel;
                if (p == null) continue;
                bool likainen = p.isDirty, versioMuuttui = false;
                if (versio)
                {
                    uint v = 0;
                    try { v = (uint)versioOminaisuus.GetValue(p); } catch (Exception) { }
                    versioMuuttui = versiot.TryGetValue(pari.Key, out var ennen) && ennen != v;
                    versiot[pari.Key] = v;
                }
                if (Diagnostiikka)
                {
                    laskurit.TryGetValue(pari.Key, out var l);
                    laskurit[pari.Key] = (l.Likainen + (likainen ? 1 : 0), l.Versio + (versioMuuttui ? 1 : 0));
                }
                if (muuttui || !(VersioTapa && versioOminaisuus != null ? versioMuuttui : likainen)) continue;
                muuttui = true;
                float nyt = Time.unscaledTime;
                viimeMuutos = nyt;
                muuttunutKerros = pari.Key;
                muutokset.Enqueue(nyt);
                while (muutokset.Count > 0 && nyt - muutokset.Peek() > 2f) muutokset.Dequeue();
                if (!Diagnostiikka) break;
            }
        }

        /// <summary>UI rauhassa (Ruudunpaivitys.UiRauhassa): piilotettu UI tai ei muutosta RauhaS-aikaan.</summary>
        public bool Rauhassa() => !nakyvissa || Time.unscaledTime - viimeMuutos >= RauhaS;

        void TransitioAlkoi(TransitionRunEvent e)
        {
            transitioita++;
            if (!(e.target is VisualElement v)) return;
            float kesto = 0f, viive = 0f;
            foreach (var t in v.resolvedStyle.transitionDuration) kesto = Mathf.Max(kesto, Sekunteina(t));
            foreach (var t in v.resolvedStyle.transitionDelay) viive = Mathf.Max(viive, Sekunteina(t));
            Ruudunpaivitys.Herata(Mathf.Min(kesto + viive, TransitioKatto) + 0.05f);
        }

        static float Sekunteina(TimeValue t) => t.unit == TimeUnit.Millisecond ? t.value / 1000f : t.value;

        /// <summary>Diagnostiikka (`ui rauha laskurit`): kerroksittain likaiset/versiomuuttuneet kehykset nollauksesta.</summary>
        public string Laskurit(bool nollaa)
        {
            var sb = new System.Text.StringBuilder($"{laskurinKehykset} kehystä, versio {(versioOminaisuus != null ? "saatavilla" : "EI saatavilla")}, tapa {(VersioTapa ? "versio" : "isDirty")}:");
            foreach (var pari in laskurit.OrderBy(kv => kv.Key)) sb.Append($" [{pari.Key}] likainen {pari.Value.Likainen} versio {pari.Value.Versio}");
            if (nollaa) { laskurit.Clear(); laskurinKehykset = 0; }
            return sb.ToString();
        }

        /// <summary>
        /// Diagnostiikka (`ui rauha erot`): kuva kaikista näkyvistä elementeistä (paikka, opasiteetti, muunnos, teksti,
        /// värit); kahden kuvan erot kertovat, mikä elementti muuttuu levossa.
        /// </summary>
        public Dictionary<VisualElement, string> Tilakuva()
        {
            var kuva = new Dictionary<VisualElement, string>();
            foreach (var pari in dokumentit)
            {
                var juuri = pari.Value.rootVisualElement;
                if (juuri == null) continue;
                var pino = new Stack<VisualElement>();
                pino.Push(juuri);
                while (pino.Count > 0)
                {
                    var e = pino.Pop();
                    var r = e.resolvedStyle;
                    if (r.display == DisplayStyle.None) continue;
                    var wb = e.worldBound;
                    string t = e is TextElement te ? te.text : null;
                    kuva[e] = $"k{pari.Key} {wb.x:0.0},{wb.y:0.0} {wb.width:0.0}x{wb.height:0.0} o{r.opacity:0.000} v{r.visibility} "
                        + $"t{r.translate.x}/{r.translate.y} r{r.rotate.angle.value:0.00} s{r.scale.value.x:0.000} "
                        + $"bg{r.backgroundColor} c{r.color} bc{r.borderTopColor} {t}";
                    foreach (var lapsi in e.hierarchy.Children()) pino.Push(lapsi);
                }
            }
            return kuva;
        }

        public static string Polku(VisualElement e)
        {
            var osat = new List<string>();
            for (var x = e; x != null && osat.Count < 6; x = x.hierarchy.parent)
                osat.Add(!string.IsNullOrEmpty(x.name) ? "#" + x.name : x.GetClasses().FirstOrDefault() ?? x.GetType().Name);
            osat.Reverse();
            return string.Join(" > ", osat);
        }

        /// <summary>Testikomento `ui rauha`: rauhan tila, viimeisin muuttunut kerros ja muutoskehykset 2 s:ssa.</summary>
        public string RauhaKuvaus()
        {
            float nyt = Time.unscaledTime;
            while (muutokset.Count > 0 && nyt - muutokset.Peek() > 2f) muutokset.Dequeue();
            return $"rauhassa {Rauhassa()}, viimeisin muutos {(float.IsInfinity(viimeMuutos) ? "-" : (nyt - viimeMuutos).ToString("0.00") + " s sitten")} "
                + $"(kerros {muuttunutKerros}), muutoskehyksiä 2 s:ssa {muutokset.Count}, transitioita {transitioita}, "
                + (Ruudunpaivitys.Instanssi != null ? Ruudunpaivitys.Instanssi.Kuvaus() : "ei ruudunpäivitystä");
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
