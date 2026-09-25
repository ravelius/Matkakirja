// ELÄVÄ KARTTA: KREIKAN PROTOTYYPPIAINEISTO videota varten (Linssiseppä 26.9.2026).
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA (scratchpadin tee-aineisto.mjs pelin origin/main 7ec55db71:stä).
//   Nostot: js/packs/nostoankkurit-grc.js (paikka) ja js/packs/nostojen-kokoluokat.js (Sisältökirjuri #3263, 62 nostoa:
//   12 pääkohdetta, 31 kohdetta, 19 pientä). Pelattavassa versiossa luokka tulee sisältöpaketin skeemasta (Siirtoseppä).
//   Joet: PAIKKAMERKKI. Natural Earthin karsitussa jokiaineistossa (js/packs/maasto-vedet.js, scalerank ≤ 4) ei ole
//   yhtään Kreikan jokea, joten 11 pääjokea on piirretty käsin noin 5–10 km:n tarkkuudella ja tarkistettu Natural
//   Earthin maapolygonia vasten (suistot ja rajalta tulevat alut 0,2–4 km rannan tai rajan takana). Oikea aineisto
//   (NE 10m rivers_lake_centerlines, Kreikka) pyydetään Karttasepältä ennen pelattavaa versiota.
//   Laivareitti ja kuljettu reitti: PAIKKAMERKKEJÄ (Karttasepän 1873-laivareitit ja pelaajan oma reitti myöhemmin).
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Elava
{
    public static class KreikanAineisto
    {
        public const string Maa = "GRC";
        /// <summary>Saapumiskaupunki: Ateena (pelin kaupunkidata).</summary>
        public static readonly LatLon Ateena = new LatLon(37.9838, 23.7275);
        /// <summary>Herätettävä maakunta (maakuntarajat-kokoelman tunnus) ja napautettava nosto (Marathon, pääkohde).</summary>
        public const string HeraavaMaakunta = "GRC:Attiki";
        public const string NapautettavaNosto = "nosto:marathon";
        /// <summary>Heräävän maakunnan nimi käsialalla (suomeksi; aineistossa "Attiki").</summary>
        public const string HeraavanNimi = "Attika";

        public static readonly ElavaNosto[] Nostot =
        {
            new ElavaNosto("nosto:aliakmonas", 39.9693, 21.6950, Kokoluokka.Pieni),
            new ElavaNosto("nosto:antikythera", 35.8662, 23.3000, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:delfoi", 38.4738, 22.4850, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:egeanmeri", 39.0008, 25.0010, Kokoluokka.Kohde),
            new ElavaNosto("nosto:epidauros", 37.5967, 23.0750, Kokoluokka.Kohde),
            new ElavaNosto("nosto:ermoupoli", 37.4330, 24.9170, Kokoluokka.Pieni),
            new ElavaNosto("nosto:evros", 41.6766, 26.4770, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-arta", 39.1521, 20.9750, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-athos", 40.1928, 24.2797, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-bassae", 37.3543, 21.9006, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-chios", 38.3782, 26.0660, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-delos", 37.4294, 25.3155, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-kalavryta", 38.0346, 22.1180, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-kastoria", 40.5177, 21.2660, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-kerkini", 41.2170, 23.0840, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-korfu", 39.5997, 19.8710, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-lavrio", 37.8428, 24.0141, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-meteora", 39.7145, 21.6320, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:hahmotelma-metsovo", 39.7706, 21.1850, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-milos", 36.6873, 24.4310, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-missolonghi", 38.3704, 21.4280, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-monemvasia", 36.7373, 23.0570, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-naoussa", 40.6335, 21.9976, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-navagio", 37.8586, 20.6240, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-navarino", 36.9852, 21.6726, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-pelion", 39.4388, 23.0450, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-pella", 40.5044, 22.5445, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-philippi", 41.0130, 24.2870, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-prespa", 40.8994, 21.0320, Kokoluokka.Pieni),
            new ElavaNosto("nosto:hahmotelma-samaria", 35.2702, 23.9600, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-samothrace", 40.4493, 25.5860, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-sounion", 37.6917, 24.0039, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-thermopylae", 38.8056, 22.5620, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:hahmotelma-vergina", 40.3184, 22.3039, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-vikos", 39.9693, 20.7290, Kokoluokka.Kohde),
            new ElavaNosto("nosto:hahmotelma-zagori", 39.8675, 20.6990, Kokoluokka.Pieni),
            new ElavaNosto("nosto:ioannina", 39.6635, 20.8520, Kokoluokka.Pieni),
            new ElavaNosto("nosto:iraklion", 35.3415, 25.1330, Kokoluokka.Kohde),
            new ElavaNosto("nosto:joonianmeri", 38.0010, 19.0010, Kokoluokka.Kohde),
            new ElavaNosto("nosto:kalamata", 37.0373, 22.1120, Kokoluokka.Pieni),
            new ElavaNosto("nosto:knossos", 35.2939, 25.0232, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:korintin-kanava", 37.9337, 22.9850, Kokoluokka.Kohde),
            new ElavaNosto("nosto:kreetanmeri", 35.9005, 24.5990, Kokoluokka.Kohde),
            new ElavaNosto("nosto:marathon", 38.1535, 23.9630, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:nafplio", 37.6155, 22.7990, Kokoluokka.Kohde),
            new ElavaNosto("nosto:nosto-sofia-korut", 37.7290, 22.7570, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:olympia", 37.6382, 21.6290, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:olympos", 40.0863, 22.3580, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:parnassos", 38.5429, 22.6420, Kokoluokka.Kohde),
            new ElavaNosto("nosto:patras", 38.2491, 21.7340, Kokoluokka.Kohde),
            new ElavaNosto("nosto:pikkupollo", 37.7497, 26.8340, Kokoluokka.Pieni),
            new ElavaNosto("nosto:pindos", 39.5001, 21.3500, Kokoluokka.Kohde),
            new ElavaNosto("nosto:psiloritis", 35.2305, 24.7700, Kokoluokka.Kohde),
            new ElavaNosto("nosto:reunuskilpikonna", 38.4993, 23.9990, Kokoluokka.Pieni),
            new ElavaNosto("nosto:rodoksen-kolossi", 36.3834, 28.2170, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:santorini", 36.4151, 25.4330, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:skandaali-simonides-kasikirjoitusvaarentaja", 36.6158, 27.8388, Kokoluokka.Kohde),
            new ElavaNosto("nosto:smolikas", 40.0889, 20.9150, Kokoluokka.Pieni),
            new ElavaNosto("nosto:strymonas", 41.8019, 23.1650, Kokoluokka.Pieni),
            new ElavaNosto("nosto:taygetos", 36.9538, 22.3520, Kokoluokka.Kohde),
            new ElavaNosto("nosto:thessaloniki", 40.6392, 22.9370, Kokoluokka.Paakohde),
            new ElavaNosto("nosto:traakianmeri", 40.4011, 25.0490, Kokoluokka.Pieni),
        };

        /// <summary>PAIKKAMERKKI: Kreikan pääjoet käsin (ks. yläkommentti), [lat, lon] lähteestä suistoon.</summary>
        public static readonly ElavaJoki[] Joet =
        {
            new ElavaJoki("Aliakmonas", new[] { 40.43, 21.00,  40.40, 21.12,  40.30, 21.22,  40.18, 21.35,  40.10, 21.48,  40.12, 21.66,  40.18, 21.82,  40.24, 21.96,  40.25, 22.05,  40.33, 22.10,  40.45, 22.15,  40.52, 22.30,  40.50, 22.45,  40.48, 22.62 }),
            new ElavaJoki("Axios", new[] { 41.12, 22.55,  40.98, 22.58,  40.85, 22.62,  40.72, 22.66,  40.60, 22.70,  40.53, 22.73 }),
            new ElavaJoki("Strymonas", new[] { 41.38, 23.36,  41.28, 23.25,  41.20, 23.18,  41.12, 23.22,  41.03, 23.35,  40.95, 23.55,  40.86, 23.75,  40.79, 23.85 }),
            new ElavaJoki("Nestos", new[] { 41.57, 24.12,  41.42, 24.30,  41.30, 24.45,  41.20, 24.62,  41.08, 24.72,  40.95, 24.77,  40.86, 24.80 }),
            new ElavaJoki("Evros", new[] { 41.72, 26.35,  41.60, 26.55,  41.45, 26.60,  41.35, 26.52,  41.20, 26.32,  41.02, 26.33,  40.88, 26.18,  40.75, 26.04 }),
            new ElavaJoki("Acheloos", new[] { 39.72, 21.22,  39.55, 21.30,  39.38, 21.38,  39.20, 21.45,  39.05, 21.50,  38.90, 21.52,  38.75, 21.40,  38.62, 21.32,  38.45, 21.22,  38.33, 21.10 }),
            new ElavaJoki("Pineios", new[] { 39.78, 21.38,  39.68, 21.55,  39.58, 21.75,  39.56, 21.95,  39.60, 22.18,  39.64, 22.40,  39.75, 22.52,  39.88, 22.60,  39.92, 22.70 }),
            new ElavaJoki("Alfeios", new[] { 37.35, 22.20,  37.42, 22.10,  37.52, 22.00,  37.60, 21.85,  37.64, 21.70,  37.64, 21.58,  37.61, 21.45 }),
            new ElavaJoki("Evrotas", new[] { 37.28, 22.28,  37.15, 22.38,  37.05, 22.44,  36.93, 22.55,  36.81, 22.68 }),
            new ElavaJoki("Sperchios", new[] { 38.92, 21.92,  38.90, 22.10,  38.88, 22.30,  38.86, 22.52 }),
            new ElavaJoki("Arachthos", new[] { 39.74, 21.12,  39.55, 21.05,  39.40, 21.00,  39.25, 20.98,  39.15, 20.98,  39.03, 21.00 }),
        };

        /// <summary>PAIKKAMERKKI: höyrylaiva Pireuksesta Saroninlahdelle kohti Egeanmerta (noin 27 km; 1873-reitti Karttasepältä).</summary>
        public static readonly LatLon[] Laivareitti =
        {
            new LatLon(37.935, 23.620), new LatLon(37.905, 23.600), new LatLon(37.850, 23.598),
            new LatLon(37.785, 23.632), new LatLon(37.715, 23.705),
        };

        /// <summary>PAIKKAMERKKI: pelaajan kuljettu reitti ja käydyt kaupungit (kirjoitettu maailma), vanhimmasta Ateenaan.</summary>
        public static readonly (string Nimi, LatLon Paikka)[] KuljettuReitti =
        {
            ("Lontoo", new LatLon(51.5074, -0.1278)), ("Pariisi", new LatLon(48.8566, 2.3522)),
            ("Marseille", new LatLon(43.2965, 5.3698)), ("Rooma", new LatLon(41.9028, 12.4964)),
            ("Ateena", new LatLon(37.9838, 23.7275)),
        };
    }
}
