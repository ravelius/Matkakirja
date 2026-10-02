// OHJAUSNAPPI-KOE (omistaja 2.10.2026 klo 14.16, ehdotuksen kuvapari ennen laajaa toteutusta): `ui ohjausnapit 1|0`.
// Linssin ja linnan kuvakenapit (‹ paluu, ↻ kertoja uudelleen, säätönappi, taikalasit, ✕) yhteen ohjausryhmään oikeaan
// yläkulmaan Ohjausnappi-pohjalla. Alkuperäiset napit piilotetaan (visible = false) ja ryhmän nappi näkyy, kun alkuperäinen
// näkyisi; toiminnot ovat samat. Lippu pois → kaikki kuten ennen.
using System;
using System.Collections.Generic;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OhjausryhmaKoe
    {
        public static bool Paalla;

        readonly VisualElement ryhma, ylaraja;
        readonly List<(VisualElement Alkup, Button Uusi)> parit = new List<(VisualElement, Button)>();
        bool edellinen;

        /// <param name="ylaraja">Elementti, jonka yläreunaan ryhmä asettuu (linssin ✕: sen paikka huomioi yläpalkin ja astronautin tilan).</param>
        public OhjausryhmaKoe(VisualElement isa, VisualElement ylaraja, IEnumerable<(VisualElement Alkup, string Ikoni, string Nimi, Action Toiminto)> napit)
        {
            this.ylaraja = ylaraja;
            ryhma = Ohjausnappi.Ryhma(isa);
            ryhma.style.display = DisplayStyle.None;
            foreach (var n in napit)
            {
                var b = Ohjausnappi.Nappi(n.Ikoni, n.Nimi, n.Toiminto, ryhma);
                b.style.display = DisplayStyle.None;
                parit.Add((n.Alkup, b));
            }
            ryhma.schedule.Execute(Paivita).Every(100);
        }

        void Paivita()
        {
            if (Paalla != edellinen)
            {
                edellinen = Paalla;
                foreach (var (a, _) in parit) if (a != null) a.visible = !Paalla;
            }
            ryhma.style.display = Paalla ? DisplayStyle.Flex : DisplayStyle.None;
            if (!Paalla) return;
            foreach (var (a, u) in parit) u.style.display = a != null && Nakyy(a) ? DisplayStyle.Flex : DisplayStyle.None;
            float yla = ylaraja.resolvedStyle.top;
            if (!float.IsNaN(yla)) ryhma.style.top = yla;
        }

        static bool Nakyy(VisualElement e)
        {
            if (e.panel == null) return false;
            for (var x = e; x != null; x = x.hierarchy.parent)
                if (x.resolvedStyle.display == DisplayStyle.None) return false;
            return true;
        }
    }
}
