// Pelin näkymien rajapinnat (Pelikoodari ↔ Natiivi-UI, sovittu 23.9.2026).
//
// Pelikoodari omistaa ohjaimet (PeliOhjain: vuo, aikarajat, pelin teot,
// syötelukko) ja nämä rajapinnat; Natiivi-UI toteuttaa visuaaliset näkymät
// UI Toolkitilla (Assets/Matkakirja/UI). Näkymä saa pelkkää dataa ja kutsuu
// takaisinkutsuja; se ei kutsu pelilogiikkaa (Matka, Kysely) itse.
//
// Tehdas: Natiivi-UI asettaa PeliNakymat-kentät omasta koodistaan
// [RuntimeInitializeOnLoadMethod(BeforeSceneLoad)]:lla. Asettamaton kenttä =
// Pelikoodarin UGUI-varanäkymä (Tilarivi, MatkaDialogi, KysymysDialogi).
// Tehdas saa PeliOhjaimen GameObjectin, johon näkymän voi lisätä komponenttina.
// Sopimus kokonaisuudessaan: /Users/Shared/Claude/proto-3d/RAJAPINTA.md.
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>Tilarivi: pelaajan tila (raha, päivä, sijainti) ja lyhyet viestit.</summary>
    public interface ITilarivi
    {
        /// <summary>Pysyvä tilarivi.</summary>
        void Aseta(string teksti);
        /// <summary>Hetkellinen viesti tilarivin tilalle kestoS sekunniksi.</summary>
        void Viesti(string teksti, float kestoS = 3f);
        /// <summary>Näkyvä teksti (testikomentojen tilaraporttiin).</summary>
        string Rivi { get; }
    }

    /// <summary>
    /// Matkavalinta (modaalinen) ja kartan alareunan toimintonappi
    /// ("Heitä noppaa" kesken reitin, "Tutki kaupunkia" kaupungissa).
    /// </summary>
    public interface IMatkaValinta
    {
        /// <summary>
        /// Näyttää valinnan: rivit = (nimi, selite); valittu(indeksi) tai peru
        /// (Peruuta-nappi ja himmennyksen napautus). Tyhjä lista = vain viesti ja Peruuta.
        /// </summary>
        void Nayta(string otsikko, string alaotsikko, IReadOnlyList<(string Nimi, string Selite)> vaihtoehdot,
            Action<int> valittu, Action peru);
        void Piilota();
        /// <summary>Kuten Peruuta-nappi: sulkee ja kutsuu peru-takaisinkutsua.</summary>
        void Peruuta();
        /// <summary>Kartan alareunan toimintonappi (ei modaalinen).</summary>
        void NaytaHeitto(string teksti, Action painettu);
        void PiilotaHeitto();
        /// <summary>Osuuko näytön piste (pikseleinä, origo vasen alakulma) näkymään: auki = koko ruutu, muuten nappi.</summary>
        bool PeittaaPisteen(Vector2 ruutu);
        bool Auki { get; }
        bool HeittoNakyy { get; }
        string Otsikko { get; }
    }

    // KysymysLaji, KysymysNaytto ja KysymysToiminnot: KysymysApu.cs (ilman UnityEngineä, testattavissa).

    /// <summary>Kysymys (modaalinen): kysymys, vaihtoehdot, vihje, 50:50, aikaraja ja tulos.</summary>
    public interface IKysymysNakyma
    {
        /// <summary>Avaa tai päivittää näkymän (sama kutsu jokaisen teon jälkeen).</summary>
        void Nayta(KysymysNaytto tila, KysymysToiminnot toiminnot);
        /// <summary>Aikarajan jäljellä oleva aika (ohjain kutsuu joka ruudussa, kun Sekunnit != null).</summary>
        void PaivitaAika(float jaljellaS);
        void Piilota();
        bool Auki { get; }
    }

    /// <summary>Kaupunkikortin rivit (web kaupunkiliuska); null = rivi piiloon.</summary>
    public sealed class KaupunkiToiminnot
    {
        /// <summary>"Lue kaupunkilehti".</summary>
        public Action LueLehti;
        /// <summary>"Liiku tänne" → matkavalinta (muu kuin oma kaupunki).</summary>
        public Action Liiku;
        public string LiikuTeksti;
        /// <summary>"Tutki kaupunkia" (oma kaupunki, tehtävä tarjolla).</summary>
        public Action Tutki;
        public string TutkiTeksti;
        /// <summary>Sulje-nappi tai ohi-napautus: kortti kiinni, kartta.</summary>
        public Action Sulje;
    }

    /// <summary>
    /// Kaupunkikortti kaupungin napautuksesta (Natiivi-UI). Kortti hakee
    /// näyttödatansa (maa, lippu, kansikuva, johdanto) itse sisältöpaketista;
    /// pelin tila tulee KaupunkiToiminnot-riveinä. Kortti ei ole modaalinen:
    /// toisen kaupungin napautus näyttää kortin uudelleen (Nayta uudella id:llä).
    /// </summary>
    public interface IKaupunkiKortti
    {
        void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot toiminnot);
        void Piilota();
        bool Auki { get; }
    }

    /// <summary>
    /// Näkymätehdas. Kenttä null = UGUI-varanäkymä. Aseta ennen kohtauksen
    /// latausta (BeforeSceneLoad); PeliOhjain luo näkymät AfterSceneLoad-vaiheessa.
    /// </summary>
    public static class PeliNakymat
    {
        public static Func<GameObject, ITilarivi> Tilarivi;
        public static Func<GameObject, IMatkaValinta> MatkaValinta;
        public static Func<GameObject, IKysymysNakyma> Kysymys;
        /// <summary>Asettamaton = ei korttia: napautus avaa matkavalinnan suoraan (erän 3 vuo).</summary>
        public static Func<GameObject, IKaupunkiKortti> KaupunkiKortti;
    }
}
