// Silta Kartan Alueista Natiivi-UI:n offline-osioon (IOfflineLataus, UI/UiPalvelut.cs).
// Alueet on Matkakirja.Kartta-asmdefissä, joka ei näe Assembly-CSharpia, joten sovitin
// asuu täällä ja asettaa UiPalvelut.Offline kohtauksen latauduttua (Natiiviseppä).
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class OfflineSilta : IOfflineLataus
    {
        readonly Alueet alueet;
        readonly List<OfflineMaa> maat = new List<OfflineMaa>();

        OfflineSilta(Alueet alueet)
        {
            this.alueet = alueet;
            alueet.Muuttui += Paivita;
            Paivita();
        }

        void Paivita()
        {
            var l = alueet.Luettelo;
            while (maat.Count < l.Count) maat.Add(new OfflineMaa());
            if (maat.Count > l.Count) maat.RemoveRange(l.Count, maat.Count - l.Count);
            for (int i = 0; i < l.Count; i++)
            {
                var a = l[i];
                var m = maat[i];
                m.Id = a.Id; m.Nimi = a.Nimi; m.Tavut = a.Tavut; m.Ladattu = a.Ladattu; m.Virhe = a.Virhe;
                m.Tila = a.Tila switch
                {
                    Alueet.Tila.Jonossa => OfflineTila.Jonossa,
                    Alueet.Tila.Latautuu => OfflineTila.Latautuu,
                    Alueet.Tila.Valmis => OfflineTila.Valmis,
                    Alueet.Tila.Virhe => OfflineTila.Virhe,
                    _ => OfflineTila.Ei,
                };
            }
            Muuttui?.Invoke();
        }

        public IReadOnlyList<OfflineMaa> Maat => maat;
        public event Action Muuttui;
        public void Lataa(string id) => alueet.Lataa(id);
        public void Peru(string id) => alueet.Peru(id);
        public void Poista(string id) => alueet.Poista(id);
        public long VapaaTila => -1;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            var a = UnityEngine.Object.FindAnyObjectByType<Alueet>();
            if (a != null) UiPalvelut.Offline = new OfflineSilta(a);
        }
    }
}
