// UI:n palvelurajapinnat muille sessioille (Natiivi-UI, 23.9.2026).
//
// Näkymä näyttää ja kysyy; työn tekee palvelun toteuttaja, joka asettaa
// itsensä tänne (esim. Awakessa). Asettamaton palvelu = osio piilossa.
//
//   Offline    Natiiviseppä: maakohtainen lataus offline-käyttöön (laatat,
//              maasto, lehdet ämpäristä). Omistajan linjaus 23.9.2026: peli
//              mahdollisimman pieni, kaikki striimataan. Palvelu lataa maittain; ratas-paneeli
//              näyttää omistajan päätöksellä (24.9.2026) vain "Kaikki" ja maanosat (OfflineMaa.Manner),
//              kullekin koko ja tila (ladattu / osittain / ei), ja kohdistaa toiminnon maanosan maihin.
//   KarttaValot  kartan aihevalot (webin js/karttavalot.js): karttaselite valitsee
//              yhden aiheen, kartta sytyttää sen merkit ja kertoo laskurit.
//   ValoNapautettu  karttavalon napautus (Natiiviseppä: AiheValot → KarttaValotSilta
//              → IlmoitaValo(id), id karttavalot.json:sta, esim. "skandaali:…");
//              Natiivi-UI avaa nostokortin (Nostokortti).
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
        /// <summary>
        /// Maanosa (europe, middleeast, africa, asia, northamerica, southamerica, oceania; Natiiviseppä /
        /// offline.json). Tyhjänä UI päättelee sen maan kaupungeista (kaupungit.manner).
        /// </summary>
        public string Manner;
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

    /// <summary>
    /// Kartan aihevalot. Aihe-id:t webin KARTTASELITE_JARJESTYS: kaikki, kaupungit,
    /// historia, ihmeet, hetket, skandaalit, luonto, elaimet, kulttuuri, kauppa, ei.
    /// </summary>
    public interface IKarttaValot
    {
        /// <summary>Aihe → näkyvien merkkien määrä nykyisellä näkymällä (puuttuva = 0).</summary>
        IReadOnlyDictionary<string, int> Laskurit { get; }
        /// <summary>Valittu aihe ("ei" = kaikki valot pois).</summary>
        string Valittu { get; }
        void Valitse(string aihe);
        /// <summary>Valinta tai laskurit muuttuivat (enintään muutaman kerran sekunnissa).</summary>
        event Action Muuttui;
    }

    public static class UiPalvelut
    {
        public static IOfflineLataus Offline;
        public static IKarttaValot KarttaValot;

        /// <summary>Karttavaloa napautettiin (id karttavalot.json:sta). Pääsäikeessä.</summary>
        public static event Action<string> ValoNapautettu;
        public static void IlmoitaValo(string id) => ValoNapautettu?.Invoke(id);
    }
}
