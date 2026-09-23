// Pienet rakennusapurit UI Toolkit -näkymille (Natiivi-UI). Luokkanimet
// vastaavat Resources/MatkakirjaUI/Matkakirja.uss:n valitsimia.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Rakenne
    {
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
    }
}
