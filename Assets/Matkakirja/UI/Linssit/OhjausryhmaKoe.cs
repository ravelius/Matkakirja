// OHJAUSNAPPI-KOE (omistaja 2.10.2026 klo 14.16 ja 14.44, ehdotuksen kuvat ennen laajaa toteutusta): `ui ohjausnapit 0|1|2`.
//   1 = rivi: linssin ja linnan kuvakenapit (‹ paluu, ↻, säätönappi, taikalasit, ✕) yhteen ohjausryhmään oikeaan yläkulmaan.
//   2 = valikko: kaikki kuvakenapit yhteen hampurilaiseen (OHJAUSNAPPI-neliö) oikeaan yläkulmaan; lista LinssiValikko-pohjalla
//       (linssin valinnat, Kertoja, Taustamusiikki, Sulje linssi viimeisenä).
// Alkuperäiset napit piilotetaan (visible = false); ryhmän nappi näkyy, kun alkuperäinen näkyisi (valikko: kun ✕ näkyisi),
// ja toiminnot ovat samat. 0 → kaikki kuten ennen.
using System;
using System.Collections.Generic;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OhjausryhmaKoe
    {
        /// <summary>0 = pois, 1 = rivi, 2 = valikko.</summary>
        public static int Tila;
        /// <summary>Testikomento `ui ohjausnapit auki`: valikkotilan lista auki kuvaa varten.</summary>
        public static OhjausryhmaKoe Viimeisin;
        public void AvaaValikko() { if (Tila == 2) valikko.Avaa(); }

        readonly VisualElement ryhma, ylaraja, valikkoNappi;
        readonly LinssiValikko valikko;
        readonly List<(VisualElement Alkup, Button Uusi)> parit = new List<(VisualElement, Button)>();
        int edellinen;

        /// <param name="ylaraja">Elementti, jonka yläreunaan ryhmä asettuu (linssin ✕: sen paikka huomioi yläpalkin ja astronautin tilan).</param>
        public OhjausryhmaKoe(VisualElement isa, VisualElement ylaraja, IEnumerable<(VisualElement Alkup, string Ikoni, string Nimi, Action Toiminto)> napit,
            LinssiValikko valikko)
        {
            this.ylaraja = ylaraja;
            this.valikko = valikko;
            ryhma = Ohjausnappi.Ryhma(isa);
            ryhma.style.display = DisplayStyle.None;
            foreach (var n in napit)
            {
                var b = Ohjausnappi.Nappi(n.Ikoni, n.Nimi, n.Toiminto, ryhma);
                b.style.display = DisplayStyle.None;
                parit.Add((n.Alkup, b));
            }
            valikkoNappi = valikko.Nappi;
            ryhma.Add(valikkoNappi);
            valikkoNappi.style.display = DisplayStyle.None;
            ryhma.schedule.Execute(Paivita).Every(100);
            Viimeisin = this;
        }

        void Paivita()
        {
            if (Tila != edellinen)
            {
                edellinen = Tila;
                foreach (var (a, _) in parit) if (a != null) a.visible = Tila == 0;
                if (Tila != 2) valikko.Sulje();
            }
            ryhma.style.display = Tila != 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (Tila == 0) return;
            bool linssiAuki = false;
            foreach (var (a, u) in parit)
            {
                bool nakyy = a != null && Nakyy(a);
                if (ReferenceEquals(a, ylaraja)) linssiAuki = nakyy;
                u.style.display = Tila == 1 && nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            }
            valikkoNappi.style.display = Tila == 2 && linssiAuki ? DisplayStyle.Flex : DisplayStyle.None;
            if (Tila == 2 && !linssiAuki) valikko.Sulje();
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
