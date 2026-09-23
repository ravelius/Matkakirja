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

    /// <summary>Kysymyksen muoto näkymälle (Peli.KysymysMuoto ilman pelilogiikan riippuvuutta).</summary>
    public enum KysymysLaji { Visa, Vaite, Kuva, Lippu, Tapahtuma, Pulma }

    /// <summary>
    /// Avoimen kysymyksen näytettävä tila. Ohjain rakentaa tämän uudelleen jokaisen
    /// teon jälkeen ja kutsuu Nayta uudestaan (sama olio ei muutu näkymän alla).
    /// </summary>
    public sealed class KysymysNaytto
    {
        public KysymysLaji Laji;
        /// <summary>Esim. "Pariisi · aarrekysymys", "Kohtaaminen", "Kaupungin tutkiminen".</summary>
        public string Otsikko;
        /// <summary>Kysyjä ja tilanne kursiivilla, esim. "kahvilan tarjoilija kysyy".</summary>
        public string Kehys;
        public string Kysymys;
        /// <summary>Väittämän paikka (Vaite), muuten null.</summary>
        public string Paikka;
        /// <summary>Kuvan tai lipun osoite (Kuva, Lippu), muuten null. https-osoite.</summary>
        public string KuvaUrl;
        /// <summary>Kuvan lähde/attribuutio pienellä, tai null.</summary>
        public string KuvaLahde;
        public List<string> Vaihtoehdot = new List<string>();
        /// <summary>50:50:n piilottamat vaihtoehdot (indeksit Vaihtoehdot-listaan).</summary>
        public List<int> Piilotetut = new List<int>();

        /// <summary>Ostettu vihje, tai null.</summary>
        public string Vihje;
        /// <summary>Vihjenappi näkyvissä (vihje olemassa, ei ostettu, ei vastattu).</summary>
        public bool VihjeTarjolla;
        public int VihjeHinta;
        /// <summary>50:50-nappi näkyvissä (neljä vaihtoehtoa, ei käytetty, ei vastattu).</summary>
        public bool PuolitusTarjolla;
        public int PuolitusHinta;
        /// <summary>Pelaajan raha (napit harmaana, jos ei riitä; ohjain kertoo virheen Viestinä).</summary>
        public int Raha;
        public string Valuutta = "£";
        /// <summary>Aikaraja sekunteina tai null (ei aikarajaa, esim. pulma). Jäljellä tulee PaivitaAika-kutsuilla.</summary>
        public int? Sekunnit;

        // --- tulos (Vastattu = true) ---
        public bool Vastattu;
        /// <summary>Valittu indeksi; -1 = aika loppui.</summary>
        public int Valittu = -1;
        public int Oikea;
        public bool Oikein;
        public bool AikaLoppui;
        public string Fakta;
        public List<string> Lahteet = new List<string>();
        /// <summary>Löytö tai palkkio yhdellä rivillä ("Löysit: Kätketty matka-arkku, 640 £"), tai null.</summary>
        public string Loyto;
        /// <summary>Jatka-napin teksti tuloksen jälkeen.</summary>
        public string JatkaTeksti = "Jatka matkaa";

        /// <summary>Hetkellinen ilmoitus (esim. "Rahat eivät riitä"), tai null.</summary>
        public string Viesti;
    }

    /// <summary>Kysymysnäkymän takaisinkutsut (ohjain kutsuu pelilogiikkaa).</summary>
    public sealed class KysymysToiminnot
    {
        public Action<int> Vastaa;
        public Action Vihje;
        public Action Puolita;
        /// <summary>Tuloksen jälkeen: sulkee kysymyksen.</summary>
        public Action Jatka;
    }

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

    /// <summary>
    /// Näkymätehdas. Kenttä null = UGUI-varanäkymä. Aseta ennen kohtauksen
    /// latausta (BeforeSceneLoad); PeliOhjain luo näkymät AfterSceneLoad-vaiheessa.
    /// </summary>
    public static class PeliNakymat
    {
        public static Func<GameObject, ITilarivi> Tilarivi;
        public static Func<GameObject, IMatkaValinta> MatkaValinta;
        public static Func<GameObject, IKysymysNakyma> Kysymys;
    }
}
