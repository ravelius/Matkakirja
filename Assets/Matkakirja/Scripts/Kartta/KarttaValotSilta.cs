// Silta Kartan aihevaloista Natiivi-UI:n karttaselitteeseen (Natiiviseppä).
// AiheValot on Matkakirja.Kartta-asmdefissä, joka ei näe Assembly-CSharpin
// UiPalvelut-rajapintaa, joten sovitin asuu täällä ja asettaa
// UiPalvelut.KarttaValot kohtauksen latauduttua.
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class KarttaValotSilta : IKarttaValot
    {
        readonly AiheValot valot;
        KarttaValotSilta(AiheValot valot) { this.valot = valot; }

        public IReadOnlyDictionary<string, int> Laskurit => valot.Laskurit;
        public string Valittu => valot.Valittu;
        public void Valitse(string aihe) => valot.Valitse(aihe);
        public event Action Muuttui
        {
            add => valot.Muuttui += value;
            remove => valot.Muuttui -= value;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            var v = UnityEngine.Object.FindAnyObjectByType<AiheValot>();
            if (v != null) UiPalvelut.KarttaValot = new KarttaValotSilta(v);
        }
    }
}
