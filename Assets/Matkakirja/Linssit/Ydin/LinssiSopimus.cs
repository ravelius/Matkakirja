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
        /// <summary>Loitonnuksen katto metreinä; null = pelin oma raja.</summary>
        void ZoomiKatto(double? maxKorkeus);
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
