// LINSSIEN SOPIMUS: natiivin linssit (Linssiseppä 23.9.2026).
//
// Puhdas C# 9 ilman UnityEngineä (asmdef Matkakirja.Linssit.Ydin,
// noEngineReferences), testataan Linssit-testit/kaanna.sh:lla.
// Verkkopelin vastineet: js/linssit/rekisteri.js (LINSSI-olio: tunnus,
// jarjestys, nimi, lyhyt, ikoni, valokuva, lahde, selite) ja
// js/pallolauta/linssit.js (laudan linssimoottori: kalvo, kalvoRuudulle,
// zoomirajat, pura).
//
// Linssi ei koske Cesiumiin, kameraan eikä UI:hin suoraan: kaikki kulkee
// ILinssiYmparisto-rajapinnan kautta. Unity-puolen sovitin (Linssit/Unity/)
// toteuttaa sen Natiivisepän KarttaKerrokset- ja PalloKierto-luokilla ja
// Natiivi-UI:n peitteellä. Siksi linssin koko elinkaari testataan ilman
// editoria.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    /// <summary>Aineiston lähde ja lisenssi (web LINSSI.lahde).</summary>
    public sealed class Lahde
    {
        public string Aineisto;
        public string Lisenssi;
        public string Osoite;
        public string Haettu;   // ISO-päivä
    }

    /// <summary>Selitekortin rivi (web LINSSI.selite()).</summary>
    public readonly struct SeliteRivi
    {
        public readonly string Vari;     // "#rrggbb"
        public readonly string Teksti;
        public SeliteRivi(string vari, string teksti) { Vari = vari; Teksti = teksti; }
    }

    /// <summary>Linssin staattiset tiedot valitsimelle ja kortille.</summary>
    public sealed class LinssiTiedot
    {
        public string Id;          // web tunnus
        public string Nimi;
        public string Lyhyt;       // valitsimen alarivi
        public int Jarjestys;      // valitsimen järjestys, kymmenen välein
        /// <summary>24×24 SVG-polut ilman svg-kuorta (web ikoni); UI muuntaa.</summary>
        public string Ikoni;
        /// <summary>Paperin rakeisuus pois linssin ajaksi (web valokuva).</summary>
        public bool Valokuva;
        /// <summary>Keskeneräinen linssi (web kesken: true): valitsin merkitsee sen.</summary>
        public bool Kesken;
        public Lahde Lahde;
        public IReadOnlyList<SeliteRivi> Selite = Array.Empty<SeliteRivi>();

        /// <summary>
        /// Pillerivalikon Linssit-näkymän esikatselun esittely (web LINSSI.esittely, #3611, 1–2 lausetta, enintään 160 merkkiä):
        /// linssimoduulin JSON:sta, muuten LinssiEsittelyt-taulusta. null = ei esittelyä (UI näyttää Lyhyen).
        /// </summary>
        public string Esittely { get => esittely ?? LinssiEsittelyt.Esittely(Id); set => esittely = value; }
        /// <summary>Esikatselun havainnekuvan osoite (web LINSSI.havainnekuva); null = ei kuvaa (UI näyttää varustekuvan).</summary>
        public string Havainnekuva { get => havainnekuva ?? LinssiEsittelyt.Havainnekuva(Id); set => havainnekuva = value; }
        string esittely, havainnekuva;
    }

    /// <summary>Rasterikerroksen tiilitys (Cesiumin projektiot).</summary>
    public enum Projektio { WebMercator, Geographic }

    /// <summary>Tiilitetty rasterikerros pallon pinnalle.</summary>
    public sealed class Rasteri
    {
        /// <summary>Osoite {z}/{x}/{y}-paikoin (y alas, OSM-järjestys).</summary>
        public string Url;
        public Projektio Projektio = Projektio.WebMercator;
        public int MinTaso;
        public int MaxTaso;
        public float Alfa = 1f;

        /// <summary>
        /// Osoite Cesiumin UrlTemplate-kerrokselle: Cesiumin {y} laskee etelästä,
        /// joten OSM-järjestyksen {y} vaihdetaan {reverseY}:ksi (kuten
        /// Rakennus.LaattaUrl). Ilman tätä reliefi piirtyi iPadilla vaakaraitoina
        /// (Natiivisepän löydös 23.9.2026, 741352b).
        /// </summary>
        public string CesiumUrl => Url?.Replace("{y}", "{reverseY}");
    }

    /// <summary>Rasterikerroksen lataustila näkyvällä alueella.</summary>
    public enum KerrosTila
    {
        /// <summary>Näkyvän alueen laattoja on vielä tulossa.</summary>
        Latautuu,
        /// <summary>Näkyvän alueen kaikki laatat ovat ruudulla.</summary>
        Valmis,
        /// <summary>Kerros ei tule (osoite ei vastaa, kerros purettu).</summary>
        Luovutti,
    }

    /// <summary>
    /// Pallon kerrokset (Natiivisepän KarttaKerrokset sovittimen takana).
    /// Avaimet: linssin omat rasterit sekä pelin sisäiset kerrokset
    /// (RAJAPINTA.md luku 4): "laatat", "maasto", "kaupungit", "nimiot",
    /// "reitit", "napakannet".
    /// </summary>
    public interface IKarttaKerrokset
    {
        void LisaaRasteri(string avain, Rasteri rasteri);
        void Poista(string avain);
        void Nakyvyys(string avain, bool nakyvissa);
        KerrosTila Tila(string avain);
    }

    /// <summary>Kameran asento: katsoo maan keskipisteeseen (PalloKierto).</summary>
    public readonly struct Nakyma
    {
        public readonly double Lat, Lon, Korkeus, Kallistus;
        public Nakyma(double lat, double lon, double korkeus, double kallistus = 0)
        { Lat = lat; Lon = lon; Korkeus = korkeus; Kallistus = kallistus; }
        public override string ToString() => $"({Lat:F2}, {Lon:F2}, {Korkeus:F0} m, {Kallistus:F0}°)";
    }

    /// <summary>
    /// Kamera kiertää katsekohdetta (PalloKierto.Kuvaa): katsekohde (leveys, pituus, korkeus ellipsoidista metreinä),
    /// silmän etäisyys siitä metreinä, kallistus kohteen pystysuorasta asteina (0 = suoraan alas) ja suuntima, johon
    /// katse osoittaa (0 = pohjoiseen, 90 = itään). ISS:n kyyti (Iss.IssKyyti) asettaa tämän joka kehys.
    /// </summary>
    public readonly struct Kuvakulma
    {
        public readonly double Lat, Lon, EtaisyysM, Kallistus, Suuntima, KatseKorkeusM;
        public Kuvakulma(double lat, double lon, double etaisyysM, double kallistus, double suuntima, double katseKorkeusM = 0)
        { Lat = lat; Lon = lon; EtaisyysM = etaisyysM; Kallistus = kallistus; Suuntima = suuntima; KatseKorkeusM = katseKorkeusM; }
        public override string ToString() => $"({Lat:F2}, {Lon:F2}, {EtaisyysM / 1000:F0} km, {Kallistus:F0}°, {Suuntima:F0}°, katse {KatseKorkeusM / 1000:F0} km)";
    }

    /// <summary>
    /// Nimetty äänisilmukka (Linnanrakentaja erä 2, dioraama): oma AudioSource poolista, ei jaa
    /// Aanisoittimen 5 kiinteää kanavaa. <see cref="ILinssiYmparisto.Silmukka"/> palauttaa tämän.
    /// </summary>
    public interface ISilmukka
    {
        /// <summary>Taso 0…1, liu'utus liukuS sekunnissa (0 = heti); kutsutaan joka ruutu kameran mukaan.</summary>
        void Voimakkuus(float taso, float liukuS);
        /// <summary>Häivytys nollaan ja vapautus; turvallinen kutsua useaan kertaan (myös Lopeta-jälkeen).</summary>
        void Lopeta(float haiveS = 0.35f);
    }

    /// <summary>
    /// Kaikki, mitä linssi saa pelistä. Toteutus: Linssit/Unity/ (sovitin) ja
    /// testeissä vale-ympäristö.
    /// </summary>
    public interface ILinssiYmparisto
    {
        IKarttaKerrokset Kerrokset { get; }

        /// <summary>Kameran nykyinen asento.</summary>
        Nakyma Kamera { get; }
        /// <summary>
        /// Kamera-ajo asentoon (PalloKierto.Aja); 0 s = hyppy. Pehmennys 0…1 → 0…1,
        /// null = webin oletusprofiili (siirtoajonPehmennys). Kallistukseen (asteina): ajo kallistaa kameran
        /// tähän; null = pelaajan kallistus säilyy (kohde.Kallistus ei vaikuta, kuten ennen radiouudistusta).
        /// </summary>
        void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null, double? kallistukseen = null);
        /// <summary>
        /// Linssin zoomikaista metreinä (web lauta.zoomirajat): katto loitonnukselle (saa ylittää koko pallon, maan rajat eivät
        /// silloin ole voimassa) ja valinnainen lattia lähimmälle korkeudelle; null = pelin oma raja.
        /// </summary>
        void ZoomiKatto(double? maxKorkeus, double? minKorkeus = null);
        /// <summary>
        /// Kamera heti avaruuteen keskuksen yläpuolelle, korkeus pallon säteinä, kallistus 0 (web ihmisen
        /// matkan avaaKaukaisuus: AVARUUDEN_KORKEUS 300, katto levennetty hetkeksi). Seuraava AjaKamera lähtee
        /// tästä korkeudesta, vaikka se on pelin loitonnuksen katon yläpuolella.
        /// </summary>
        void KameraAvaruuteen(double lat, double lon, double pallonSateita);
        /// <summary>Korkeus, jolla koko pallo mahtuu ruutuun (web kokoPallonKorkeus).</summary>
        double KokoPallonKorkeus { get; }
        /// <summary>Korkeus, jolla ruudun LEVEYS näyttää annetun kaaren (asteina).</summary>
        double KorkeusLeveydelle(double leveysAsteina);
        /// <summary>Ruudun leveys / korkeus.</summary>
        double Kuvasuhde { get; }
        /// <summary>Kameran pystysuora näkökenttä asteina (web PALLO_FOV 50).</summary>
        double Nakokulma { get; }
        /// <summary>Kameran suuntima asteina (0 = pohjoinen ylhäällä), kuvauksen aloitusta varten.</summary>
        double Suuntima { get; }

        /// <summary>
        /// Kamera kiinni kuvaukseen (PalloKierto.Kuvaa): asento asetetaan heti, joten liikkuvaa kohdetta kuvataan kutsumalla
        /// tätä joka kehys. Keskeyttää ajon ja eleet, kunnes <see cref="KuvausLoppui"/>.
        /// </summary>
        void Kuvaa(Kuvakulma asento);
        /// <summary>Kuvaus päättyi (PalloKierto.SeurantaLoppui): eleet ja pelaajan kamera palaavat.</summary>
        void KuvausLoppui();
        /// <summary>
        /// Kameran pystysuora kenttäkulma asteina (ISS:n Cupola-ikkuna 80°). Ensimmäinen kutsu tallentaa kameran oman arvon;
        /// null palauttaa sen (Natiiviseppä 28.9.: ei kovakoodattua 50°:ta, myös linssin purussa).
        /// </summary>
        void Kenttakulma(double? asteina);

        /// <summary>
        /// Pelin kerrokset (kaupunkien nimet ja pisteet, nappula, nostot,
        /// luentakuva) näkyviin tai piiloon. Web: body.aikajana-paalla
        /// (LINSSIPORTTI). Reitit ja rannat jäävät.
        /// </summary>
        void Pelikerrokset(bool nakyvissa);

        /// <summary>Tumma odotuspeite koko ruudun yli (linssin avausta varten).</summary>
        void Peite(bool paalla);

        /// <summary>Taustamusiikki pitoon linssin ajaksi (web pidaMusiikkiKiinni).</summary>
        void MusiikkiPitoon(bool pidossa);

        /// <summary>
        /// Linssin oma raita (web aikajana.js aloitaMusiikki / lopetaMusiikki → siirtymamusiikki.js):
        /// laji kaaresta ("keksinnot", "ihmisen-matka"); null = feidaus pois. Sama laji ei ala alusta.
        /// </summary>
        void LinssiMusiikki(string laji);
        /// <summary>Raidan taso (web saadaMusiikki): 1 ajossa, AjonTaukoHimmennys tauolla ja lopussa.</summary>
        void LinssiMusiikkiHimmennys(double taso);

        /// <summary>
        /// Linssin äänitehoste (Pelikoodari 26.9.2026, Fable hyväksyi; Linssisepän toiveet
        /// docs/raportit/linssien-aanitoiveet-20260925.md): nimi = tehosteen tunnus (esim. "keksinto", "vuosi",
        /// "pilvisyoksy"), voima 0…1 kertoo äänenvoimakkuuden tehosteiden väylällä. Tuntematon nimi ei soi (loki).
        /// </summary>
        void Tehoste(string nimi, float voima = 1f);
        /// <summary>
        /// Linssin taustaääni silmukkana (esim. "astro-humina"); null = häivytys pois. Sama tunnus ei ala alusta.
        /// Silmukka ristihäivytetään, ettei mp3:n sauma kuulu (Linssisepän huomio).
        /// </summary>
        void Taustaaani(string tunnus);
        /// <summary>
        /// Nimetty taustasilmukka (Linnanrakentaja erä 2, dioraama): oma kahva poolista, ei jaa Taustaaanin
        /// paikkaa eikä 5 kanavaa, ja monta voi olla auki yhtä aikaa (toisin kuin Taustaaani). Tunnus on valmis
        /// URL (sovitin laskee sen, esim. AmpariJuuri + Aanet[id].Tiedosto), jotta Mukana.Polku ja levyvälimuisti
        /// löytävät sen samalla putkella kuin kanavat. Puuttuva tai virheellinen ääni: kahva palautuu silti
        /// (ei koskaan null), ei soi, yksi loki.
        /// </summary>
        ISilmukka Silmukka(string tunnus);
        /// <summary>
        /// Dioraaman repliikki (kertaluonteinen puhe) alkoi/loppui: merkitään AaniTilan puhujaksi samalla
        /// reunarajapinnalla kuin Kertojan ja Pulun puhe (Aanisoitin.PuluPuhuu; oma tunnus "dioraama-repliikki"
        /// Aanisoittimen puolella), joten pelin 5 äänikanavaa väistyvät repliikin ajan kuten muullakin esitetyllä
        /// puheella. Sovitin soittaa itse äänen tämän rajapinnan ulkopuolella (EsityksenAani-malli); tämä vain
        /// merkitsee puhujan. Tuplakutsu samalla arvolla on turvallinen (vain reuna vaikuttaa).
        /// </summary>
        void Repliikki(bool puhuu);

        /// <summary>Käyttäjä on pyytänyt vähennettyä liikettä.</summary>
        bool VahennettyLiike { get; }

        /// <summary>Monotoninen aika sekunteina (testeissä käsin).</summary>
        double Aika { get; }
    }

    /// <summary>
    /// Yksi linssi. Rekisteri kutsuu: Avaa → Paivita joka kehys → Sulje.
    /// Sulje on turvallinen missä vaiheessa tahansa (myös peitteen aikana).
    /// </summary>
    public interface ILinssi
    {
        LinssiTiedot Tiedot { get; }
        bool Auki { get; }
        void Avaa(ILinssiYmparisto ymparisto);
        void Paivita();
        void Sulje();
    }
}
