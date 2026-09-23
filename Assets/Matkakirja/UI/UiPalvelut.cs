// UI:n palvelurajapinnat muille sessioille (Natiivi-UI, 23.9.2026).
//
// Näkymä näyttää ja kysyy; työn tekee palvelun toteuttaja, joka asettaa
// itsensä tänne (esim. Awakessa). Asettamaton palvelu = osio piilossa.
//
//   Offline    Natiiviseppä: maakohtainen lataus offline-käyttöön (laatat,
//              maasto, lehdet ämpäristä). Omistajan linjaus 23.9.2026: peli
//              mahdollisimman pieni, kaikki striimataan; ratas-paneelissa
//              osio "Lataa offline-käyttöön" maittain (koko, edistyminen, poisto).
using System;
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    public enum OfflineTila { Ei, Jonossa, Latautuu, Valmis, Virhe }

    /// <summary>Yksi ladattava maa (tai alue).</summary>
    public sealed class OfflineMaa
    {
        public string Id;
        /// <summary>Näytettävä nimi, esim. "Ranska".</summary>
        public string Nimi;
        /// <summary>Koko tavuina (arvio ennen latausta).</summary>
        public long Tavut;
        /// <summary>Ladattu tavuina (Latautuu) — edistyminen = Ladattu / Tavut.</summary>
        public long Ladattu;
        public OfflineTila Tila;
        /// <summary>Virheen syy lyhyesti (Tila = Virhe), muuten null.</summary>
        public string Virhe;
    }

    public interface IOfflineLataus
    {
        /// <summary>Maat näyttöjärjestyksessä.</summary>
        IReadOnlyList<OfflineMaa> Maat { get; }
        /// <summary>Lista tai jonkin maan tila muuttui (myös edistyminen; enintään muutaman kerran sekunnissa).</summary>
        event Action Muuttui;
        void Lataa(string id);
        /// <summary>Keskeyttää jonossa olevan tai käynnissä olevan latauksen.</summary>
        void Peru(string id);
        /// <summary>Poistaa ladatun maan laitteelta.</summary>
        void Poista(string id);
        /// <summary>Laitteen vapaa tila tavuina, tai -1 jos ei tiedossa.</summary>
        long VapaaTila { get; }
    }

    public static class UiPalvelut
    {
        public static IOfflineLataus Offline;
    }
}
