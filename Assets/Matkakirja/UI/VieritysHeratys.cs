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
