// Pienet rakennusapurit UI Toolkit -näkymille (Natiivi-UI). Luokkanimet
// vastaavat Resources/MatkakirjaUI/Matkakirja.uss:n valitsimia.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Rakenne
    {
        /// <summary>
        /// iOS: kun järjestelmän näppäimistö (ja sen syöteikkuna) sulkeutuu, kenttä jää UI Toolkitissa fokukseen, ja
        /// jokainen seuraava napautus missä tahansa avaa näppäimistön uudelleen eikä osu kohteeseensa (Laitetestaajan
        /// T2 24.9.: Raamatun kentät). Kenttä vapautetaan fokuksesta heti, kun näppäimistö on ollut näkyvissä ja
        /// piiloutui. Ei vaikutusta, jos alusta ei käytä kosketusnäppäimistöä.
        /// </summary>
        public static void VapautaNappaimistonSulkeutuessa(TextField k)
        {
            if (k == null) return;
            IVisualElementScheduledItem vahti = null;
            k.RegisterCallback<FocusInEvent>(_ =>
            {
                if (!TouchScreenKeyboard.isSupported) return;
                bool nahty = false;
                float alku = Time.unscaledTime;
                vahti?.Pause();
                vahti = k.schedule.Execute(() =>
                {
                    if (TouchScreenKeyboard.visible) { nahty = true; return; }
                    // Näppäimistö ei avautunut lainkaan (ulkoinen näppäimistö): vahti pois hetken päästä.
                    if (!nahty) { if (Time.unscaledTime - alku > 2f) vahti?.Pause(); return; }
                    vahti?.Pause();
                    k.Blur();
                }).Every(120);
            });
            k.RegisterCallback<FocusOutEvent>(_ => vahti?.Pause());
        }

        public static VisualElement El(string luokka, VisualElement isa = null, PickingMode poiminta = PickingMode.Position)
        {
            var e = new VisualElement { pickingMode = poiminta };
            Luokat(e, luokka);
            isa?.Add(e);
            return e;
        }

        public static Label Teksti(string teksti, string luokka, VisualElement isa = null)
        {
            var l = new Label(teksti) { pickingMode = PickingMode.Ignore };
            Luokat(l, luokka);
            isa?.Add(l);
            return l;
        }

        /// <summary>Nappi: valinnainen ikoni (Ikonit.*) ja teksti (null = ei tekstiä). Painallus = clicked.</summary>
        public static Button Nappi(string teksti, string luokka, Action painettu, VisualElement isa = null, string ikoni = null)
        {
            var b = new Button(painettu) { text = "" };
            // Oletusteeman napin tyylit pois: ulkoasu kokonaan Matkakirja.uss:stä.
            b.RemoveFromClassList(Button.ussClassName);
            b.AddToClassList("mk-nappi");
            Luokat(b, luokka);
            if (ikoni != null) b.Add(new SvgIkoni(ikoni));
            if (teksti != null) Teksti(teksti, "mk-nappi__teksti", b); // "" = teksti asetetaan myöhemmin
            isa?.Add(b);
            return b;
        }

        public static SvgIkoni Ikoni(string merkinta, string luokka, VisualElement isa = null)
        {
            var i = new SvgIkoni(merkinta);
            Luokat(i, luokka);
            isa?.Add(i);
            return i;
        }

        public static void Luokat(VisualElement e, string luokat)
        {
            if (string.IsNullOrEmpty(luokat)) return;
            foreach (var l in luokat.Split(' ')) if (l.Length > 0) e.AddToClassList(l);
        }

        /// <summary>Taustakuva tekstuurista (Kuviot), venyy elementin kokoon.</summary>
        public static T Tausta<T>(T e, Texture2D t) where T : VisualElement
        {
            e.style.backgroundImage = new StyleBackground(t);
            return e;
        }

        /// <summary>
        /// Näyttää tai piilottaa elementin häivytyksellä: luokka "mk-auki" ohjaa
        /// USS:n opacity/translate-siirtymää, display vaihtuu siirtymän jälkeen.
        /// </summary>
        public static void Nayta(VisualElement e, bool auki, int kestoMs = 220)
        {
            // Versiolaskuri: vain viimeisimmän kutsun viivästetty askel saa toimia
            // (näytä + piilota samassa ruudussa ei jätä elementtiä näkyviin).
            var versio = new NayttoVersio();
            e.userData = versio;
            bool Voimassa() => ReferenceEquals(e.userData, versio);
            if (auki)
            {
                e.style.display = DisplayStyle.Flex;
                // Luokka seuraavassa ruudussa, jotta siirtymä alkaa piilosta.
                e.schedule.Execute(() => { if (Voimassa()) e.AddToClassList("mk-auki"); });
            }
            else
            {
                e.RemoveFromClassList("mk-auki");
                e.schedule.Execute(() => { if (Voimassa()) e.style.display = DisplayStyle.None; }).StartingIn(kestoMs);
            }
        }

        sealed class NayttoVersio { }

        /// <summary>
        /// JSON-taulukko tai null. MiniJson.Taulukko heittää myös puuttuvasta kentästä (null),
        /// joten valinnaiset kentät luetaan tällä (tuotannon v11:n maat ilman tervehdyksiä
        /// kaatoi koko UiSisallon jäsennyksen).
        /// </summary>
        public static System.Collections.Generic.List<object> Lista(object arvo) => arvo as System.Collections.Generic.List<object>;
        /// <summary>
        /// JSON-olio tai null (MiniJson.Objekti heittää puuttuvasta kentästä FormatExceptionin, jolloin
        /// koko jäsennys kaatui: esim. maat ilman maakarttaa → maalehden otsikossa ISO-koodi).
        /// </summary>
        public static System.Collections.Generic.Dictionary<string, object> Olio(object arvo) => arvo as System.Collections.Generic.Dictionary<string, object>;

        /// <summary>
        /// ScrollView.ScrollTo turvallisesti viiveellä: elementti on voinut poistua (odotusrivi,
        /// sirut) ennen kuin ajastus ehtii. ScrollTo heittää silloin ArgumentExceptionin, ja
        /// UI Toolkitin ajastin yrittää heittävää tehtävää uudelleen joka ruudussa (laitteella
        /// kymmeniä virheitä pinossa) — siksi tarkistus ja poikkeuksen nielaisu.
        /// </summary>
        public static void Vierita(ScrollView v, VisualElement e, long viiveMs = 0)
        {
            if (v == null || e == null) return;
            v.schedule.Execute(() =>
            {
                if (e.panel == null || !v.contentContainer.Contains(e)) return;
                try { v.ScrollTo(e); } catch (System.ArgumentException) { }
            }).StartingIn(viiveMs);
        }

        /// <summary>
        /// CSS-gridin repeat(auto-fill, minmax(min, 1fr)) + gap UI Toolkitissa: sarakkeita niin
        /// monta kuin mahtuu, lapset venyvät tasaleveiksi. koko(lapsi, leveys) asettaa
        /// lapsen mittasuhteen (esim. juliste 2:3), koska USS:ssä ei ole aspect-ratiota.
        /// </summary>
        public static void Ruudukko(VisualElement r, float min, float rako, System.Action<VisualElement, float> koko = null)
        {
            r.style.flexDirection = FlexDirection.Row;
            r.style.flexWrap = Wrap.Wrap;
            void Asettele()
            {
                float w = r.contentRect.width;
                if (float.IsNaN(w) || w <= 0) return;
                int sarakkeet = Mathf.Max(1, Mathf.FloorToInt((w + rako) / (min + rako)));
                float lw = Mathf.Floor((w - rako * (sarakkeet - 1)) / sarakkeet);
                for (int i = 0; i < r.childCount; i++)
                {
                    var c = r[i];
                    c.style.width = lw;
                    c.style.marginRight = (i % sarakkeet == sarakkeet - 1) ? 0 : rako;
                    c.style.marginBottom = rako;
                    koko?.Invoke(c, lw);
                }
            }
            r.RegisterCallback<GeometryChangedEvent>(e => { if (!Mathf.Approximately(e.oldRect.width, e.newRect.width)) Asettele(); });
            r.schedule.Execute(Asettele);
        }
    }
}
