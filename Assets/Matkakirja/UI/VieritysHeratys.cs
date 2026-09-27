// VIERITYKSEN HERÄTYS (omistajan löydös 137, Pelikoodari 25.9.2026: "nostojen sivun vieritys tökkii").
// Ruudunpaivitys pitää täyden taajuuden kosketuksen ajan ja 0,5 s sen jälkeen. UI Toolkitin ScrollView jatkaa
// sormen noustua hitausliikkeellä (inertia) pidempään, ja loppuliuku piirtyi LEPO-tilassa 30 fps:llä — nykivästi,
// kuten lehden piirto ennen löydöstä 101. Tämä seuraa jokaisen paneelin ScrollView-elementtejä: kun vierityspalkin
// arvo muuttuu, Ruudunpaivitys.Herata pitää täyden taajuuden liikkeen loppuun asti. Uudet ScrollViewit löytyvät
// kerran sekunnissa (kyselyn hinta on pieni ja vain paneeleista, joissa jotain muuttui).
// Komento `vieritys` (peli-komento.txt): muutokset, joista ei-täydessä tilassa (mittari), ja `vieritys pois|paalle`.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class VieritysHeratys : MonoBehaviour
    {
        /// <summary>Herätyksen pituus (s) jokaisesta muutoksesta: kattaa kehysvälin ja hitausliikkeen seuraavan askeleen.</summary>
        const float HeratysS = 0.25f;

        public static bool Paalla { get; set; } = true;
        public static int Muutoksia { get; private set; }
        /// <summary>Muutokset, jotka piirtyivät ilman täyttä taajuutta (ennen herätystä): nykivyyden mittari.</summary>
        public static int Hitaita { get; private set; }

        static VieritysHeratys instanssi;
        readonly HashSet<ScrollView> seuratut = new HashSet<ScrollView>();
        readonly List<ScrollView> loydetyt = new List<ScrollView>();
        float seuraavaHaku;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { instanssi = null; Paalla = true; Muutoksia = Hitaita = 0; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("VieritysHeratys");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<VieritysHeratys>();
        }

        public static string Kuvaus() => $"vieritys: herätys {(Paalla ? "päällä" : "pois")}, seurattuja {instanssi?.seuratut.Count ?? 0}, "
                                         + $"muutoksia {Muutoksia}, niistä ilman täyttä taajuutta {Hitaita}";

        public static void NollaaLaskurit() { Muutoksia = Hitaita = 0; }

        void Update()
        {
            if (Time.unscaledTime < seuraavaHaku) return;
            seuraavaHaku = Time.unscaledTime + 1f;
            seuratut.RemoveWhere(s => s == null || s.panel == null);
            foreach (var d in FindObjectsByType<UIDocument>(FindObjectsSortMode.None))
            {
                if (d.rootVisualElement == null) continue;
                loydetyt.Clear();
                d.rootVisualElement.Query<ScrollView>().ToList(loydetyt);
                foreach (var s in loydetyt)
                    if (seuratut.Add(s)) Kytke(s);
            }
        }

        /// <summary>
        /// Testikomento `vieritys koe`: jäljittelee hitausliikettä ilman kosketusta (simulaattoria ei voi pyyhkäistä
        /// komennoilla) — näkyvän, vieritettävän ScrollView'n kohta liukuu 1,5 s hidastuen. Laskurit nollataan alussa.
        /// </summary>
        public static string Koe()
        {
            if (instanssi == null) return "ei käynnissä";
            // Näkyvistä (koko vanhempiketju esillä) se, jossa on eniten vieritettävää.
            ScrollView kohde = null;
            float paras = 10f;
            foreach (var s in instanssi.seuratut)
            {
                if (s == null || s.panel == null || !Naytetaan(s)) continue;
                float vara = s.contentContainer.layout.height - s.contentViewport.layout.height;
                if (vara > paras) { paras = vara; kohde = s; }
            }
            if (kohde == null) return "ei vieritettävää ScrollView'tä näkyvissä";
            NollaaLaskurit();
            instanssi.StartCoroutine(Liu(kohde));
            return null;
        }

        /// <summary>
        /// Testikomento `vieritys kestokoe [s]` (vierityksen lämpö- ja CPU-mittaus, omistaja 27.9. klo 17.0x): toistuvia heittoja
        /// Kosketusvierityksen iOS-hidastuvuudella (0,998/ms) s sekuntia (oletus 300), suunta kääntyy reunalla; jokainen kehys kutsuu
        /// Ruudunpaivitys.Vierita kuten oikea veto/inertia. Kehysajat kehysajat.jsonl:ään, yhteenveto lokiin.
        /// </summary>
        public static string Kestokoe(float sekuntia)
        {
            if (instanssi == null) return "ei käynnissä";
            ScrollView kohde = null;
            float paras = 10f;
            foreach (var s in instanssi.seuratut)
            {
                if (s == null || s.panel == null || !Naytetaan(s)) continue;
                float vara = s.contentContainer.layout.height - s.contentViewport.layout.height;
                if (vara > paras) { paras = vara; kohde = s; }
            }
            if (kohde == null) return "ei vieritettävää ScrollView'tä näkyvissä";
            if (kestokoe != null) instanssi.StopCoroutine(kestokoe);
            kestokoe = instanssi.StartCoroutine(Kesto(kohde, sekuntia > 0 ? sekuntia : 300f, paras));
            return null;
        }

        static Coroutine kestokoe;

        static System.Collections.IEnumerator Kesto(ScrollView s, float kesto, float suurin)
        {
            float alku = Time.realtimeSinceStartup, nopeus = 0f, suunta = 1f; // nopeus pt/ms
            int kehyksia = 0, heittoja = 0;
            while (Time.realtimeSinceStartup - alku < kesto && s.panel != null)
            {
                if (Mathf.Abs(nopeus) * 1000f < 10f) { nopeus = 2.5f * suunta; heittoja++; } // uusi heitto ~2 500 pt/s
                Ruudunpaivitys.Vierita();
                yield return null;
                kehyksia++;
                float dt = Time.unscaledDeltaTime * 1000f, k = Mathf.Pow(0.998f, dt);
                float y = s.scrollOffset.y + nopeus * (k - 1f) / Mathf.Log(0.998f);
                nopeus *= k;
                if (y <= 0f || y >= suurin) { y = Mathf.Clamp(y, 0f, suurin); nopeus = 0f; suunta = -suunta; }
                s.scrollOffset = new Vector2(s.scrollOffset.x, y);
            }
            float t = Time.realtimeSinceStartup - alku;
            kestokoe = null;
            Debug.Log($"MATKAKIRJA vieritys kestokoe: {t:0} s, {kehyksia} kehystä ({kehyksia / Mathf.Max(t, 0.01f):0.0} fps), {heittoja} heittoa");
        }

        static bool Naytetaan(VisualElement e)
        {
            for (; e != null; e = e.hierarchy.parent)
                if (e.resolvedStyle.display == DisplayStyle.None || e.resolvedStyle.visibility == Visibility.Hidden) return false;
            return true;
        }

        static System.Collections.IEnumerator Liu(ScrollView s)
        {
            float alku = Time.realtimeSinceStartup, nopeus = 1400f; // pt/s, hidastuu kuten UI Toolkitin elastisuus
            int kehyksia = 0;
            while (Time.realtimeSinceStartup - alku < 1.5f && s.panel != null)
            {
                yield return null;
                kehyksia++;
                nopeus *= Mathf.Pow(0.135f, Time.unscaledDeltaTime); // ~135 ms aikavakio
                var o = s.scrollOffset;
                s.scrollOffset = new Vector2(o.x, o.y + nopeus * Time.unscaledDeltaTime);
            }
            Debug.Log($"MATKAKIRJA {Kuvaus()}; koe: {kehyksia} kehystä 1,5 s:ssa ({kehyksia / 1.5f:0} fps)");
        }

        static void Kytke(ScrollView s)
        {
            s.verticalScroller.valueChanged += _ => Muuttui();
            s.horizontalScroller.valueChanged += _ => Muuttui();
        }

        static void Muuttui()
        {
            Muutoksia++;
            var r = Ruudunpaivitys.Instanssi;
            if (r != null && r.Nyt != Ruudunpaivitys.Tila.Taysi) Hitaita++;
            if (Paalla) Ruudunpaivitys.Herata(HeratysS);
        }
    }
}
