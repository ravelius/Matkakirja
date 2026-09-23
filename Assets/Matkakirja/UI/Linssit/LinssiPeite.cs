// ODOTUSPEITE (Natiivi-UI): webin js/linssit/topografia.js ODOTUSPEITE
// rgba(20, 16, 10, 0.96) koko ruudun yli. Linssiseppä nostaa peitteen
// SAMASSA kehyksessä, jossa linssi valitaan (LinssiOhjain.PeiteKasittelija),
// ja laskee sen, kun linssin kerros on oikeasti ruudulla. Siksi peite tulee
// heti ilman häivytystä (pelaaja ei näe paljasta karttaa välissä) ja lähtee
// pehmeästi (320 ms). Peite ottaa kosketukset, jottei palloa pyöritetä
// näkymättömänä; linssin sulkunappi (kerros 38) jää sen päälle.
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiPeite
    {
        const int HaivytysMs = 320;
        readonly VisualElement peite;
        IVisualElementScheduledItem piilotus;

        public bool Paalla { get; private set; }

        public LinssiPeite(UiKerros kerros)
        {
            peite = Rakenne.El("mk-linssipeite", kerros.Juuri(LinssiUi.Ylakerros));
            peite.style.display = DisplayStyle.None;
        }

        /// <summary>LinssiOhjain.PeiteKasittelija: päälle heti, pois häivyttäen.</summary>
        public void Aseta(bool paalla)
        {
            if (paalla == Paalla) return;
            Paalla = paalla;
            piilotus?.Pause();
            if (paalla)
            {
                // Sama kehys: ei siirtymää sisään (luokka ilman transitionia).
                peite.RemoveFromClassList("mk-linssipeite--haipyy");
                peite.style.opacity = 1f;
                peite.pickingMode = PickingMode.Position;
                peite.style.display = DisplayStyle.Flex;
                return;
            }
            peite.pickingMode = PickingMode.Ignore;
            peite.AddToClassList("mk-linssipeite--haipyy");
            peite.style.opacity = 0f;
            piilotus = peite.schedule.Execute(() => { if (!Paalla) peite.style.display = DisplayStyle.None; }).StartingIn(HaivytysMs);
        }
    }
}
