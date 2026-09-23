// YHTEISET SOPIMUKSET: natiivin Matkakirjan pelilogiikka (Pelikoodari 23.9.2026).
//
// Puhdas C# 9 ilman UnityEngineä: käännetään ja testataan Unityn mukana
// tulevalla dotnetilla (./kaanna.sh) ja Unityssä asmdef Matkakirja.Peli.
// Verkkopelin vastineet: js/rules.js (reittiverkko), js/game.js (pelitila,
// matka), js/game.js mulberry32 (satunnaisuus). Sisältö luetaan Siirtosepän
// paketista (sisalto/1/v1/kokoelmat/kaupungit.json ja reitit.json, skeema 1.1).
//
// TÄMÄ TIEDOSTO ON RAJAPINTA: muutokset vain Pelikoodarin kautta, jotta
// rinnakkaiset osat (reittiverkko, pelitila+matka, lehtikuori) pysyvät
// yhteensopivina.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    /// <summary>Reitin laji. Paketissa laji on 'maa', 'sea' tai 'lento'.</summary>
    public enum ReitinLaji { Maa, Meri, Lento }

    /// <summary>Kaupunki sisältöpaketista (kokoelma kaupungit, skeema 1.1).</summary>
    public sealed class Kaupunki
    {
        public string Id;
        public string Nimi;
        public string Maa;       // ISO3 tai null
        public string Maa2;      // ISO2 tai null
        public string Manner;    // esim. "europe" tai null
        public double Lat;
        public double Lon;
        public bool Saari;
        public bool Lentokentta;
        public bool Aloitus;
        public string Tyyppi;    // ambience, esim. "kaupunki"
    }

    /// <summary>
    /// Reitti sisältöpaketista (kokoelma reitit): maa- ja merireitit ovat
    /// laudan kaaria (askeleet, meren maksu), lentoreitit erillinen lista.
    /// Tunnus kuten verkkopelissä edgeId(a,b) = "a|b" (järjestysherkkä).
    /// </summary>
    public sealed class Reitti
    {
        public string Id;        // "a|b" maa/meri; "lento:a|b" lennoille
        public string A;
        public string B;
        public ReitinLaji Laji;
        public int Askeleet;     // data.steps (lennoilla 0)
        public int Maksu;        // meri: data.fee ?? 100; muut 0
    }

    /// <summary>Pelaajan sijainti: kaupungissa tai reitin varrella (askel idx 1..Askeleet-1).</summary>
    public readonly struct Sijainti : IEquatable<Sijainti>
    {
        public readonly string Kaupunki;   // ei null, kun kaupungissa
        public readonly string Reitti;     // reitin tunnus, kun reitin varrella
        public readonly int Askel;         // idx reitillä (web: pos.idx)
        Sijainti(string kaupunki, string reitti, int askel) { Kaupunki = kaupunki; Reitti = reitti; Askel = askel; }
        public static Sijainti KaupungissaSijainti(string id) => new Sijainti(id, null, 0);
        public static Sijainti ReitillaSijainti(string reitti, int askel) => new Sijainti(null, reitti, askel);
        public bool Kaupungissa => Kaupunki != null;
        /// <summary>Sama avain kuin web posKey: "c:id" tai "e:a|b:idx".</summary>
        public string Avain => Kaupungissa ? "c:" + Kaupunki : "e:" + Reitti + ":" + Askel;
        public bool Equals(Sijainti o) => Avain == o.Avain;
        public override bool Equals(object o) => o is Sijainti s && Equals(s);
        public override int GetHashCode() => Avain.GetHashCode();
        public override string ToString() => Avain;
    }

    /// <summary>Yksi laillinen siirto nopanheiton jälkeen (web findMoves: {pos, path}).</summary>
    public sealed class Siirto
    {
        public Sijainti Kohde;
        public List<Sijainti> Polku;   // askeleet kohteeseen, lähtö EI mukana (web path; pituus = käytetyt askeleet)
    }

    /// <summary>Kulkutapa (web travelMode). Pysy = 'stay' (tehtävä kaupungissa).</summary>
    public enum Kulkutapa { Maa, Meri, Lento, Bussi, Pysy }

    /// <summary>Pelin vaihe (web phase).</summary>
    public enum Vaihe { Aloitus, Toiminta, Heitto, Siirto, Kysymys, Ohi }

    /// <summary>Vuorokaudenaika (web timeOfDay).</summary>
    public enum Vuorokaudenaika { Aamu, Keskipaiva, Ilta, Yo }

    /// <summary>Hinnat ja vakiot (js/rules.js, js/game.js).</summary>
    public static class Vakiot
    {
        public const int AloitusRaha = 300;   // START_MONEY
        public const int BussiHinta = 50;     // BUS_FARE
        public const int MeriHinta = 100;     // SEA_FARE = SEA_FEE
        public const int LentoHinta = 300;    // FLIGHT_PRICE
        public const int HataApu = 100;       // STRANDED_AID
        public const int VuoronTunnit = 6;    // TURN_HOURS
    }

    /// <summary>
    /// Reittiverkko (js/rules.js buildBoard, stepsFrom, findMoves,
    /// reachableCities). Toteutus: Peli/Reittiverkko.cs.
    /// </summary>
    public interface IReittiverkko
    {
        IReadOnlyDictionary<string, Kaupunki> Kaupungit { get; }
        /// <summary>Maa- ja merireitit tunnuksella "a|b".</summary>
        IReadOnlyDictionary<string, Reitti> Reitit { get; }
        /// <summary>Kaupungista lähtevien maa/merireittien tunnukset (web adj).</summary>
        IReadOnlyList<string> Naapurireitit(string kaupunki);
        /// <summary>Lentoreitit (web pack.airRoutes), molempiin suuntiin käytettävissä.</summary>
        IReadOnlyList<Reitti> Lennot { get; }
        /// <summary>Hae reitti kummin päin tahansa (web edgeId(a,b) ?? edgeId(b,a)).</summary>
        Reitti HaeReitti(string a, string b);
        /// <summary>Lailliset siirrot (web findMoves), avaimena Sijainti.Avain.</summary>
        IReadOnlyDictionary<string, Siirto> Siirrot(Sijainti lahto, int silmaluku, Kulkutapa tapa);
        /// <summary>Rahalla saavutettavat kaupungit (web reachableCities).</summary>
        ISet<string> Saavutettavat(string lahto, int raha);
        /// <summary>Sama reitin varrelta (web needsAid kutsuu myös edge-sijainnilla).</summary>
        ISet<string> Saavutettavat(Sijainti lahto, int raha);
    }

    /// <summary>
    /// Kamera 3D-puolelta (3D-selvittäjä toteuttaa PalloKierto/KaupunkiMerkit):
    /// ajo kohteeseen ja tieto napautetusta kaupungista.
    /// </summary>
    public interface IKamera
    {
        void Aja(double lat, double lon, double korkeus, float kestoS, Action valmis);
        event Action<string> KaupunkiNapautettu;
    }

    /// <summary>Kaupunkilehti WKWebView-kuoressa (index.html?lehti=id, verkkopelin #2942).</summary>
    public interface ILehti
    {
        void Avaa(string kaupunki);
        event Action<string> Suljettu;
    }
}
