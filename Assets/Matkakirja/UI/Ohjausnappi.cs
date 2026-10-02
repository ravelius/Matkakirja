// OHJAUSNAPPI-pohja (omistaja 2.10.2026 klo 14.16; EHDOTUS ennen omistajan OK:ta): kuvakenappi neliönä pyöristetyin kulmin
// ja näkymän napit yhteen ohjausryhmään. Ulkoasu Pohjat/ohjausnappi.uss (näkyvä 40 pt, osuma 44 pt, kulma-nappi, kuvake 22 pt,
// viiva 1,75). Järjestys ryhmässä: ‹ ensin, sitten näkymän säätimet, ✕ viimeisenä oikealla.
using System;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Ohjausnappi
    {
        /// <summary>Ohjausryhmä: vaakarivi oikeaan yläkulmaan (isän turva-alueen sisään).</summary>
        public static VisualElement Ryhma(VisualElement isa) => Rakenne.El("mk-ohjausryhma", isa, PickingMode.Ignore);

        /// <summary>Kuvakenappi ryhmään: <paramref name="ikoni"/> = Ikonit.*, <paramref name="nimi"/> = VoiceOver-nimi.
        /// harmaa = omistajan 16.9. harmaa (valokuvan, 3D:n ja avaruuden päällä); muuten teema isän tk-teema-*-luokasta.</summary>
        public static Button Nappi(string ikoni, string nimi, Action painettu, VisualElement ryhma, bool harmaa = true)
        {
            var b = Rakenne.Nappi(null, harmaa ? "mk-ohjausnappi mk-ohjausnappi--harmaa" : "mk-ohjausnappi", painettu, ryhma, ikoni);
            b.tooltip = nimi;
            return b;
        }
    }
}
