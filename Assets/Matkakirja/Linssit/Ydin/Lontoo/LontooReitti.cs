// LONTOO-PILOTIN REITTI (Linssiseppä 5.10.2026): 7 pysähdystä docs/raportit/lontoo-pysahdykset-20261005.md:stä ja kertojan
// tekstit docs/raportit/lontoo-kertojatekstit-20261005.md:stä (Päätoimittaja, sanatarkasti). Kehystys mitattiin CesiumJS 1.146
// -esikatselussa (proto-3d/tyokalut/linssiseppa-ajot/lontoo-koe, World Terrain + Bing + OSM Buildings): kohde, maaston
// korkeus ellipsoidista (World Terrain), katsesuunta, kallistus pystysuorasta (90° − esikatselun pitch) ja etäisyys.
namespace Matkakirja.Linssit.Lontoo
{
    public static class LontooReitti
    {
        public static readonly LinssiTiedot Tiedot = new LinssiTiedot
        {
            Id = "lontoo",
            Nimi = "Lontoo",
            Lyhyt = "Lento Lontoon yllä Greenwichistä Buckinghamin palatsille.",
            Jarjestys = 97,
            Ikoni = "<path d=\"M4 20h16M6 20V10l3-3 3 3v10M12 20V6l3-3 3 3v14\"/>",
            Valokuva = true,
            Kesken = true,
            Lahde = new Lahde
            {
                Aineisto = "Cesium World Terrain, Bing Maps Aerial ja Cesium OSM Buildings (Cesium ion); © OpenStreetMap contributors",
                Lisenssi = "Cesium ion -ehdot; OSM ODbL; Bing Maps -ehdot",
                Osoite = "https://cesium.com/platform/cesium-ion/content/",
                Haettu = "2026-10-05",
            },
        };

        static Pysahdys P(string id, string nimi, string alarivi, double lat, double lon, double maa, double nosto,
            double suuntima, double pitch, double etaisyys, string teksti) => new Pysahdys
        {
            Id = id, Nimi = nimi, Alarivi = alarivi, Lat = lat, Lon = lon, MaaM = maa, NostoM = nosto,
            Suuntima = suuntima, Kallistus = 90 + pitch, EtaisyysM = etaisyys, Teksti = teksti,
        };

        public static readonly Pysahdys[] Pysahdykset =
        {
            P("greenwich", "Greenwich", "Royal Observatory · nollameridiaani", 51.4800, -0.0035, 58.6, 20, 185, -20, 950,
              "Greenwichin mäellä seisoo kuninkaallinen observatorio, ja sen pihan halki kulkee nollameridiaani, josta maailman pituusasteet lasketaan. Katolla on yhä punainen aikapallo: se pudotetaan joka päivä tasan kello yksi, ja sen mukaan laivat tarkistivat kronometrinsä ennen lähtöä. Joen rannan barokkirakennuksiin muutti vuonna 1873 laivaston upseerikoulu."),
            P("tower", "Tower", "Tower of London · Tower Bridge", 51.5068, -0.0760, 45.0, 20, 35, -24, 700,
              "Thamesin rannalla seisoo Tower, linnoitus, jonka valkoinen torni on lähes tuhat vuotta vanha. Se on ollut kuninkaallinen asunto, vankila ja aarrekammio, ja kruununjalokivet ovat yhä sen muurien sisällä. Viereinen Tower Bridge on nuorempi kuin miltä näyttää: vuonna 1873 sitä ei vielä ollut, vaan se valmistui vasta 1894."),
            P("stpauls", "St Paul's", "Pyhän Paavalin katedraali", 51.5138, -0.0984, 62.8, 40, 25, -28, 450,
              "Cityn kattojen yllä kohoaa Pyhän Paavalin katedraalin kupoli. Christopher Wren rakensi sen Lontoon suuren palon jälkeen, ja se valmistui vuonna 1710. Toisessa maailmansodassa kupoli säilyi pommitusten keskellä, ja siitä tuli kaupungin kestävyyden kuva. Kuiskausgalleriassa seinän vierestä kuiskattu sana kuuluu kupolin toiselle puolelle."),
            P("somerset", "Somerset House", "Victoria Embankment", 51.5106, -0.1172, 50.2, 15, 355, -22, 550,
              "Joen pohjoisrantaa kulkee Victoria Embankment, rantamuuri ja katu, joka oli vuonna 1873 vasta muutaman vuoden vanha. Sen alle rakennettiin samalla viemäri, joka teki lopun Thamesin kuuluisasta hajusta. Muurin takana on Somerset House: ennen rantamuuria veneet soutivat sen suuresta kaariportista suoraan sisään."),
            P("pallmall", "Trafalgar Square", "Charing Cross · Pall Mall", 51.5072, -0.1290, 54.9, 15, 70, -24, 650,
              "Trafalgar Squarella Nelsonin pylvästä vartioivat pronssileijonat, jotka olivat vuonna 1873 vasta kuuden vuoden ikäisiä. Aukion kulmalta Charing Crossin asemalta lähtivät junat kohti Doveria ja mannerta. Lännessä alkaa Pall Mall, herrasklubien katu. Yksi niistä on Reform Club, jonka nojatuoleissa on lyöty vetoa matkoista maailman ympäri."),
            P("westminster", "Westminster", "Parlamenttitalo · Big Ben · Westminster Abbey", 51.4997, -0.1250, 49.2, 30, 265, -20, 520,
              "Joen yli näkyy parlamenttitalo, joka rakennettiin uudelleen tulipalon jälkeen ja oli vuonna 1873 juuri valmistunut. Sillan päässä seisoo kellotorni, jonka suurta kelloa kutsutaan Big Beniksi; torni itse sai nimekseen Elizabeth Tower vasta 2012. Takana kohoavassa Westminster Abbeyssa on kruunattu hallitsijat jo vuodesta 1066."),
            P("buckingham", "Buckingham Palace", "The Mall · St James's Park", 51.5014, -0.1419, 52.4, 15, 255, -24, 480,
              "The Mallin päässä on Buckinghamin palatsi, hallitsijan virka-asunto, ja sen edessä kuningatar Viktorian muistomerkki. Vuonna 1873 Viktoria hallitsi itse, mutta asui mieluummin Windsorissa, Osbornessa ja Balmoralissa. Palatsin ympärillä levittäytyvät St James's Park ja Green Park, Lontoon vihreät olohuoneet. Täältä matka jatkuu."),
        };

        /// <summary>Georeferenssin origo lennon ajaksi: reitin keskikohta (float-tarkkuus ~1 mm koko reitillä).</summary>
        public const double OrigoLat = 51.5040, OrigoLon = -0.0730, OrigoKorkeusM = 50;
    }
}
