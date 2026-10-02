// OHJAUSNAPPI-pohja (omistaja 2.10.2026 klo 14.16; EHDOTUS ennen omistajan OK:ta): kuvakenappi neliönä pyöristetyin kulmin
// ja näkymän napit yhteen ohjausryhmään (tyylikirja pohjat.OHJAUSNAPPI, web #3854). Ulkoasu Pohjat/ohjausnappi.uss (näkyvä
// nappi.ohjaus 40 pt, osuma 44 pt, kulma-nappi, kuvake 22 pt, viiva 1,75). Järjestys: ‹ ensin, näkymän toiminnot, ✕ viimeisenä.
using System;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Ohjausnappi
    {
        /// <summary>Ohjausryhmä: vaakarivi oikeaan yläkulmaan (isän turva-alueen sisään).</summary>
        public static VisualElement Ryhma(VisualElement isa, string teema = "harmaa")
            => Rakenne.El("mk-ohjausryhma tk-teema-" + teema, isa, PickingMode.Ignore);

        /// <summary>Kuvakenappi ryhmään: <paramref name="ikoni"/> = Ikonit.*, <paramref name="nimi"/> = VoiceOver-nimi.
        /// Teema tulee ryhmän (tai muun isän) tk-teema-*-luokasta; <paramref name="teema"/> asettaa sen napille itselleen.</summary>
        public static Button Nappi(string ikoni, string nimi, Action painettu, VisualElement ryhma, string teema = null)
        {
            var b = Rakenne.Nappi(null, teema == null ? "mk-ohjausnappi" : "mk-ohjausnappi tk-teema-" + teema, painettu, ryhma, ikoni);
            b.tooltip = nimi;
            return b;
        }
    }
}
