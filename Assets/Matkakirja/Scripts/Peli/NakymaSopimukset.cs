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
using Matkakirja.Peli;
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
        /// <summary>POISTUMASSA (Fablen tarkastus A6): ei enää aseteta; tehtävään mennään lehden tehtävänapista ja vihreästä pisteestä.</summary>
        public Action Tutki;
        public string TutkiTeksti;
        /// <summary>
        /// Oma kaupunki, mantereen aarre löytynyt: "Mannerlento" (web mannerLennot) →
        /// matkavalinta, jossa rivi per mantere ("Lennä Oseaniaan: Sydney"). null = ei tarjolla.
        /// </summary>
        public Action Mannerlento;
        public string MannerlentoTeksti;
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

    // --- natiivilehti (B1, sovittu Natiivi-UI:n kanssa 23.9.2026; korvaa WKWebView-kuoren) ---

    /// <summary>Mikä lehti avataan: kaupunkilehti (Kaupunki) tai maalehti (Maa = ISO3), ja mistä aiheesta/sivulta.</summary>
    public sealed class LehtiAvaus
    {
        public bool Maalehti;
        public string Kaupunki;
        public string Maa;
        public string Aihe;
        public int? Sivu;
        /// <summary>Omistaja: kaupunki tai ISO3 (Avautui/Suljettu-tapahtumien tunnus).</summary>
        public string Omistaja => Maalehti ? Maa : Kaupunki;
    }

    /// <summary>
    /// Pelin tila lehdelle (web lehtikuoren tila + fokustehtävät). Kyselyt ovat funktioita, jotta
    /// PaivitaTila ei kopioi kirjanpitoa. TehtavaNappi = lehden alanappi (web tehtavaNapinTila):
    /// teksti tai null (ei nappia); TehtavaNappiPois = näkyy harmaana.
    /// </summary>
    public sealed class LehtiTila
    {
        public int Raha;
        public int Matkapaiva;
        public bool Fokusmoodi = true;
        public Func<string, bool> KulttuuriVastattu = _ => false;
        public Func<string, string, bool> MinitehtavaVastattu = (_, __) => false;
        public Func<string, string, bool> MinitehtavaRatkaistu = (_, __) => false;
        public Func<string, bool> PullaVinkkiOstettu = _ => false;
        public Func<string, bool> JulisteLaukussa = _ => false;
        /// <summary>Web aarreAuki: aarteen jälki on jo kartalla tai laatta käännetty (avaavasta kysymyksestä vain rahaa).</summary>
        public Func<string, bool> AarreAuki = _ => false;
        public string TehtavaNappi;
        public bool TehtavaNappiPois;
    }

    public enum LehtiTekoLaji { Kulttuurivastaus, Minitehtavavastaus, JulisteMyonto, PullaVinkki, EtsiKatko, AvaaMaalehti, SivuNakyi }

    /// <summary>
    /// Lehden teko ohjaimelle (TeeTeko → KauppaTulos heti). Kentät lajin mukaan:
    /// Kulttuurivastaus (Kaupunki, Oikein), Minitehtavavastaus (Kaupunki, Aihe, Oikein, Palkkio: 10 tai 50
    /// fokus-tehtävä), JulisteMyonto (Avain), PullaVinkki (Kaupunki), EtsiKatko (Kaupunki: lehti sulkeutuu ja
    /// kohtaaminen tai kysymys alkaa), AvaaMaalehti (Maa, Aihe), SivuNakyi (Omistaja, Aihe, Sivu, SivunLaji).
    /// </summary>
    public sealed class LehtiTeko
    {
        public LehtiTekoLaji Laji;
        public string Kaupunki, Aihe, Avain, Maa, Omistaja, SivunLaji;
        public bool Oikein;
        public int Palkkio;
        public int Sivu;
    }

    /// <summary>Natiivilehti (Natiivi-UI, UI Toolkit): sisältö paketista, pelin tila ohjaimelta.</summary>
    public interface ILehtiNakyma
    {
        void Nayta(LehtiAvaus avaus, LehtiTila tila, Func<LehtiTeko, KauppaTulos> teeTeko);
        /// <summary>Tila muuttui (raha, vastatut, tehtävänappi) lehden ollessa auki.</summary>
        void PaivitaTila(LehtiTila tila);
        void Sulje();
        bool Auki { get; }
        /// <summary>Omistaja (kaupunki tai ISO3).</summary>
        event Action<string> Avautui;
        /// <summary>Omistaja; kerran per avaus, myös Sulje-kutsusta.</summary>
        event Action<string> Suljettu;
    }

    /// <summary>
    /// Sähkepinta (web js/sahke.js; Pelikoodarin ehdotus 23.9.2026, Natiivi-UI toteuttaa): pöllön tuoma
    /// paperiliuska ja retkikuntaosio. Kaveriavun nappi ja kortti kulkevat kysymysnäkymän kautta
    /// (KysymysNaytto.Kaveriapu/KaveriapuKortti, KysymysToiminnot.KysyKaverilta/KaveriapuValmis).
    /// </summary>
    public interface ISahkeNakyma
    {
        /// <summary>
        /// Liuska ruudulle (yksi kerrallaan; ohjain nostaa seuraavan jonosta, kun ruutu on vapaa):
        /// sähke = Saate + Teksti (lennättimen kirjaimin) + Alarivi; apupyyntö = Saate, Alarivi, Kysymys ja
        /// vaihtoehtonapit A–D (veikkaa(i)) sekä "En osaa auttaa". suljettu: ✕, ohitus tai veikkauksen jälkeen.
        /// </summary>
        void NaytaLiuska(SahkeViesti viesti, Action<int> veikkaa, Action suljettu);
        void SuljeLiuska();
        bool LiuskaAuki { get; }
        /// <summary>Retkikuntaosio valikon lomakkeeseen (sama kutsu päivittää; Sahkepinta.Muuttui).</summary>
        void NaytaRetkikunta(RetkikuntaNaytto tila, RetkikuntaToiminnot toiminnot);
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
        /// <summary>
        /// Saapumistraileri (web js/saapumistraileri.js): (kaupunki, saapumispuheen url
        /// tai null, valmis). PeliOhjain kutsuu kaupunkiin saavuttaessa ennen lehteä,
        /// kerran per kaupunki istunnossa, ei aarrekaupungeissa (laatta kaupungissa).
        /// Näkymä soittaa saapumispuheen itse ja kutsuu valmis (myös ohitettaessa).
        /// Asettamaton = ei traileria: saapumispuhe soi kamera-ajon aikana (entinen vuo).
        /// </summary>
        public static Action<string, string, Action> Saapumistraileri;
        /// <summary>Asettamaton = ei korttia: napautus avaa matkavalinnan suoraan (erän 3 vuo).</summary>
        public static Func<GameObject, IKaupunkiKortti> KaupunkiKortti;
        /// <summary>Natiivilehti. Asettamaton = WKWebView-kuori (LehtiKuori), kunnes se poistetaan (A4).</summary>
        public static Func<GameObject, ILehtiNakyma> Lehti;
        /// <summary>Sähkeliuska ja retkikuntaosio. Asettamaton = ei sähkepintaa natiivissa (ohjain ei pollaa).</summary>
        public static Func<GameObject, ISahkeNakyma> Sahke;
    }
}
