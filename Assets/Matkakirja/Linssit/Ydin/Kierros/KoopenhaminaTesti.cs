// Kööpenhaminan testikohteet elävälle oppaalle (Linssiseppä 5.10.2026): Päätoimittajan 15 nähtävyyttä, koordinaatit tarkistettu
// CesiumJS-kehystyksessä (proto-3d/tyokalut/linssiseppa-ajot/lontoo-koe/kbh.json). Komento "opas testi": silmukka saa nämä
// järjestyksessä ilman workeria ja ääntä (kesto KestoS), jotta lento, kehystys, esilataus ja UI voidaan todentaa simulla.
namespace Matkakirja.Linssit.Kierros
{
    public static class KoopenhaminaTesti
    {
        static OpasKohde K(string id, string nimi, string alarivi, double lat, double lon, double koko, double korkeus) =>
            new OpasKohde { Id = id, Nimi = nimi, Alarivi = alarivi, Lat = lat, Lon = lon, KokoM = koko, KorkeusM = korkeus, KestoS = 9 };

        public static readonly OpasKohde[] Kohteet =
        {
            K("radhus", "Raatihuone", "Rådhuspladsen", 55.6757, 12.5696, 110, 105),
            K("tivoli", "Tivoli", "Huvipuisto vuodesta 1843", 55.6737, 12.5681, 300, 20),
            K("christiansborg", "Christiansborg", "Kansankäräjät", 55.6761, 12.5803, 180, 106),
            K("diamant", "Musta timantti", "Kuninkaallinen kirjasto", 55.6735, 12.5822, 90, 30),
            K("frelsers", "Vor Frelsers Kirke", "Kierreportaat tornin ympäri", 55.6728, 12.5944, 70, 90),
            K("copenhill", "CopenHill", "Hiihtorinne voimalan katolla", 55.6825, 12.6212, 200, 85),
            K("opera", "Ooppera", "Holmen", 55.6818, 12.6007, 160, 32),
            K("havfrue", "Pieni merenneito", "Langelinie", 55.6929, 12.5993, 40, 2),
            K("kastellet", "Kastellet", "Tähtilinnoitus", 55.6913, 12.5950, 500, 10),
            K("amalienborg", "Amalienborg", "Kuninkaanlinna", 55.6840, 12.5930, 200, 25),
            K("marmor", "Marmorikirkko", "Frederiks Kirke", 55.6849, 12.5891, 60, 46),
            K("rosenborg", "Rosenborg", "Linna ja Kuninkaan puutarha", 55.6858, 12.5773, 120, 40),
            K("rundetaarn", "Rundetaarn", "Pyöreä torni 1642", 55.6814, 12.5758, 40, 35),
            K("stroget", "Strøget", "Kävelykatu", 55.6786, 12.5790, 300, 15),
            K("nyhavn", "Nyhavn", "Kanava ja värikkäät talot", 55.67985, 12.5905, 250, 15),
        };

        /// <summary>Oppaan alku Kööpenhaminan yllä (Raatihuoneentorilta koilliseen).</summary>
        public static readonly Kuvakulma Alku = new Kuvakulma(55.6790, 12.5760, 2200, 55, 40, 45);
    }
}
