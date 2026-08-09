// Maa-osioiden aloitussivujen isot kartat (omistajan toive 7.8.2026:
// "maaosion aloitussivu voisi alkaa isolla maan kartalla johon
// merkitty tärkeimmät kaupungit ja maastonmuodot").
//
// Pohjakuvat ovat Wikimedia Commonsin sijaintikarttaperheen
// korkokarttoja (tekijä useimmiten TUBS): yhtenäinen tyyli, iso
// SVG-lähde ja — ratkaisevana — tiedostosivulla DOKUMENTOIDUT
// reunakoordinaatit tasavälisessä (equirectangular) projektiossa.
// Niiden ansiosta kaupunkipisteet voidaan asemoida kuvan päälle
// pelkällä prosenttilaskulla:
//   x % = (lon − lansi) / (ita − lansi) × 100
//   y % = (pohjoinen − lat) / (pohjoinen − etela) × 100
// Pystysuunnan venytys (leveyspiirit ~150 % pituuspiirien koosta)
// vaikuttaa vain kuvasuhteeseen, ei prosenttiasemointiin.
//
// Kun lisäät maan: hae "Relief Map of <maa>" / "<maa> relief
// location map" Commonsista, tarkista lisenssi (PD/CC BY/CC BY-SA),
// poimi rajat tiedostosivun "Map to illustrate ... borders"
// -kohdasta ja KATSO 480 px pikkukuva silmin kuten muutkin kuvat.
// Kaupunkien koordinaatit suomenkielisestä Wikipediasta.

/**
 * ISO3-koodi → kartta.
 *
 * tiedosto  Commonsin tiedostonimi (Special:FilePath skaalaa).
 * lahde     Lähderivi pelin vakiomuodossa.
 * rajat     Kuvan reunojen koordinaatit asteina.
 * kaupungit Piirrettävät pisteet; paa merkitsee pääkaupungin.
 */
export const MAAKARTAT = {
  EGY: {
    tiedosto: 'Egypt relief location map.jpg',
    lahde: 'Eric Gaba ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    /*
     * Rajat sijaintikarttaperheen omasta määrittelystä (Wikipedian
     * Module:Location map/data/Egypt), jossa tämä tiedosto on nimetty
     * relief-versioksi.
     *
     * Kuva on 1055 px leveä — pienin pelin korkokartoista. Suurempaa
     * ei ole: koko sijaintikarttaperheessä Egyptistä on vain tämä yksi
     * relief-versio (etsitty 7.8.2026). Riittää lehden leveydelle,
     * mutta jos Commonsiin joskus ilmestyy isompi, se kannattaa vaihtaa.
     */
    rajat: { pohjoinen: 32.1, etela: 21.3, lansi: 24.2, ita: 37.3 },
    /*
     * Viisi paikkaa, jotka kertovat maan muodon: delta (Aleksandria),
     * deltan kärki (Kairo), Niilin laakso (Luxor, Assuan) ja Siinai
     * (Sharm el-Sheikh). Kartalta näkee heti, että kaikki asutus on
     * joen varressa ja muu on aavikkoa.
     */
    kaupungit: [
      { nimi: 'Kairo', lat: 30.044, lon: 31.236, paa: true },
      { nimi: 'Aleksandria', lat: 31.2, lon: 29.92 },
      { nimi: 'Luxor', lat: 25.7, lon: 32.64 },
      { nimi: 'Assuan', lat: 24.09, lon: 32.9 },
      { nimi: 'Sharm el-Sheikh', lat: 27.91, lon: 34.33 },
    ],
    /*
     * Kuvanosto Siinailta: kartta näyttää niemimaan, mutta yksikään
     * Egyptin aihesivu ei kerro siitä mitään — kaikki katsovat Niilin
     * vartta. Aihe ei myöskään osu mihinkään olemassa olevaan nostoon
     * (tarkistettu kaikki 21). Kuva silmätarkistettu 480 px:ssä.
     */
    nosto: {
      otsikko: 'Luostari, joka ei ole koskaan sulkenut oviaan',
      tiedosto: 'Katharinenkloster Sinai BW 2.jpg',
      teksti: 'Siinain vuorten juurella toimii Pyhän Katariinan '
        + 'luostari, joka on ollut yhtäjaksoisesti käytössä 500-luvulta '
        + 'asti — pidempään kuin mikään muu kristitty luostari '
        + 'maailmassa. Muurien sisällä kasvaa karhunvatukkapensas, jota '
        + 'munkit pitävät Raamatun palavana pensaana, ja kirjastossa on '
        + 'maailman toiseksi suurin vanhojen käsikirjoitusten kokoelma '
        + 'Vatikaanin jälkeen. Luostari säilyi valloitusten läpi osin '
        + 'siksi, että sen hallussa on suojelukirje, jonka kerrotaan '
        + 'olevan profeetta Muhammadin antama — pihalla on myös '
        + 'moskeija.',
      selite: 'Pyhän Katariinan luostari Siinain paljaiden vuorten '
        + 'kainalossa. Muurit ovat 500-luvulta, keisari Justinianuksen '
        + 'rakennuttamat.',
      lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Pyhän Katariinan luostari',
    },
  },
  GBR: {
    tiedosto: 'United Kingdom relief location map.jpg',
    lahde: 'Alexrk2, Wikimedia Commons (CC BY-SA 3.0)',
    /*
     * Rajat sijaintikarttaperheen omasta määrittelystä (Wikipedian
     * Module:Location map/data/United Kingdom), jossa tämä tiedosto on
     * nimetty relief-versioksi. Kuva ulottuu Shetlannista Kanaaliin ja
     * näyttää myös Irlannin saaren — se auttaa hahmottamaan, mikä osa
     * siitä kuuluu Yhdistyneeseen kuningaskuntaan.
     */
    rajat: { pohjoinen: 61, etela: 49, lansi: -11, ita: 2.2 },
    /*
     * Neljä maata, neljä kaupunkia — ja Manchester viidentenä, koska
     * teollinen vallankumous ja ensimmäinen rautatie kuuluvat sen
     * seudulle. Pääkaupungit: Lontoo (koko valtakunta), Edinburgh
     * (Skotlanti), Cardiff (Wales) ja Belfast (Pohjois-Irlanti).
     */
    kaupungit: [
      { nimi: 'Lontoo', lat: 51.51, lon: -0.13, paa: true },
      { nimi: 'Edinburgh', lat: 55.95, lon: -3.19 },
      { nimi: 'Belfast', lat: 54.6, lon: -5.93 },
      { nimi: 'Cardiff', lat: 51.48, lon: -3.18 },
      { nimi: 'Manchester', lat: 53.48, lon: -2.24 },
    ],
    /*
     * Kuvanosto täydentää introa: se puhuu neljän maan liitosta, mutta
     * kaikki aihesivut kertovat Englannista. Tämä on Pohjois-Irlannista
     * ja tuo mukanaan tarinan, jota mikään sivu ei muuten näytä. Kuva
     * silmätarkistettu 480 px:ssä 7.8.2026.
     */
    nosto: {
      otsikko: 'Jättiläisen tie mereen',
      tiedosto: "Giant's Causeway (14).JPG",
      teksti: 'Pohjois-Irlannin rannalla on noin 40 000 kivipylvästä, '
        + 'joista useimmat ovat kuusikulmaisia kuin hunajakenno. Ne '
        + 'syntyivät 60 miljoonaa vuotta sitten, kun paksu laavakerros '
        + 'jäähtyi hitaasti ja kutistuessaan halkeili säännöllisiin '
        + 'sarakkeisiin — sama ilmiö kuin kuivuvassa mutalätäkössä, '
        + 'mutta kivessä. Tarina kertoo toisin: jättiläinen Finn '
        + 'MacCool rakensi tien Skotlantiin tapellakseen toisen '
        + 'jättiläisen kanssa. Skotlannin puolella Staffan saarella on '
        + 'samanlaisia pylväitä — tarina ja geologia osoittavat samaan '
        + 'suuntaan.',
      selite: 'Kuusikulmaiset basalttipylväät laskeutuvat mereen Antrimin '
        + 'rannikolla. Korkeimmat pylväät ovat kaksitoistametrisiä.',
      lahde: 'Chmee2, Wikimedia Commons (CC BY 3.0)',
      wiki: 'Giant’s Causeway',
    },
  },
  DEU: {
    tiedosto: 'Relief Map of Germany.svg',
    lahde: 'TUBS, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 55.1, etela: 47.2, lansi: 5.5, ita: 15.5 },
    kaupungit: [
      { nimi: 'Berliini', lat: 52.52, lon: 13.41, paa: true },
      { nimi: 'Hampuri', lat: 53.55, lon: 9.99 },
      { nimi: 'München', lat: 48.14, lon: 11.58 },
      { nimi: 'Köln', lat: 50.94, lon: 6.96 },
      { nimi: 'Frankfurt', lat: 50.11, lon: 8.68 },
    ],
    /*
     * Kuvanosto kartan ja uutisten väliin elävöittämään sivua
     * (omistajan toive 7.8.2026). Aihe täydentää introa: Rein
     * mainitaan siinä, mutta mikään Saksan sivu ei vielä näytä sitä.
     * Kuva silmätarkistettu 480 px:ssä 7.8.2026.
     */
    nosto: {
      otsikko: 'Loreley vartioi Reinin mutkaa',
      tiedosto: 'Loreley rhine valley d schmidt 08 07.jpg',
      teksti: 'Rein on Euroopan vilkkaimpia vesiteitä: proomut ja '
        + 'risteilijät kulkevat sen halki aamusta iltaan. Loreleyn '
        + '132-metrisen kallion kohdalla joki kapenee ja syvenee '
        + 'jyrkäksi mutkaksi, jonka kohinasta syntyi tarina laulavasta '
        + 'neidosta — Heinrich Heinen runona sen osaa moni saksalainen '
        + 'ulkoa. Keskireinin laaksossa linnoja on tiheämmässä kuin '
        + 'missään muualla Euroopassa, ja koko jokiosuus on Unescon '
        + 'maailmanperintökohde.',
      selite: 'Jokiristeilijä ohittaa Loreleyn kallion Reinin '
        + 'kapeimmassa mutkassa.',
      lahde: 'Dirk Schmidt, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Loreley',
    },
  },
  ITA: {
    tiedosto: 'Italy relief location map.jpg',
    lahde: 'Eric Gaba ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    // Rajat sijaintikarttaperheen omasta määrittelystä (Module:Location
    // map/data/Italy). Kuvan asteikkoreunukset vastaavat niitä:
    // 9°, 12°, 15° ja 18° pituuspiirit sekä 36°, 39°, 42° ja 45°
    // leveyspiirit osuvat oikeille kohdilleen.
    rajat: { pohjoinen: 47.4, etela: 35.3, lansi: 6.2, ita: 19.0 },
    /*
     * Kuusi paikkaa, jotka kertovat maan muodon: Po-laakson teollinen
     * pohjoinen (Milano, Venetsia), keskusta (Firenze, Rooma), etelä
     * tulivuorineen (Napoli) ja saaret (Palermo). Kartalta näkee, että
     * Apenniinit kulkevat selkärankana koko saappaan läpi.
     */
    kaupungit: [
      { nimi: 'Rooma', lat: 41.903, lon: 12.496, paa: true },
      { nimi: 'Milano', lat: 45.464, lon: 9.19 },
      { nimi: 'Venetsia', lat: 45.441, lon: 12.316 },
      { nimi: 'Firenze', lat: 43.77, lon: 11.256 },
      { nimi: 'Napoli', lat: 40.852, lon: 14.268 },
      { nimi: 'Palermo', lat: 38.116, lon: 13.362 },
    ],
    /*
     * Kuvanosto kartan ja uutisten väliin (sama paikka kuin Saksan
     * Loreley). Aihe täydentää introa: intro mainitsee kaksi valtiota
     * rajojen sisällä, mutta mikään Italian sivu ei näytä niitä — ja
     * kartalla San Marinon voi etsiä itse Adrianmeren puolelta.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Saappaan sisällä on kaksi omaa valtiota',
      tiedosto: 'Fortress of Guaita 2013-09-19.jpg',
      teksti: 'Italian rajojen sisäpuolella on kaksi valtiota, jotka '
        + 'eivät ole Italiaa. Rooman keskellä on Vatikaani, maailman '
        + 'pienin valtio: sen koko pinta-ala on alle puoli '
        + 'neliökilometriä. Toinen on San Marino, joka kiipeää Monte '
        + 'Titanon kalliolle lähelle Adrianmerta. Se kertoo olevansa '
        + 'maailman vanhin yhä toimiva tasavalta — perustamisvuodeksi '
        + 'merkitään 301 — ja sen harjanteella seisoo kolme tornia, '
        + 'jotka näkyvät myös maan lipussa. Asukkaita on noin 34 000, '
        + 'eikä rajalla ole puomia: linja-auto ajaa Riministä ylös '
        + 'vuorelle kuin mihin tahansa kaupunkiin.',
      selite: 'Guaitan torni vartioi Monte Titanon huippua San '
        + 'Marinossa.',
      lahde: 'Max Ryazanov, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'San Marino',
    },
  },
  ESP: {
    tiedosto: 'Spain rel location map.svg',
    lahde: 'NordNordWest, Wikimedia Commons (CC BY-SA 3.0 de)',
    /*
     * Rajat sijaintikarttaperheen omasta määrittelystä (Module:Location
     * map/data/Spain). Espanjan määrittelyssä on kaksi kaavaa: manner
     * ja Kanariansaaret, jotka on piirretty kuvan oikeaan alakulmaan
     * omaan laatikkoonsa. Tässä käytetään mantereen kaavaa, ja se
     * riittää: kaikki kuusi kaupunkia ovat mantereella. Jos joskus
     * lisätään Las Palmas tai Santa Cruz, sitä EI voi asemoida näillä
     * rajoilla — laatikko on eri mittakaavassa.
     */
    rajat: { pohjoinen: 44.4, etela: 34.7, lansi: -9.9, ita: 4.8 },
    kaupungit: [
      { nimi: 'Madrid', lat: 40.417, lon: -3.704, paa: true },
      { nimi: 'Barcelona', lat: 41.387, lon: 2.169 },
      { nimi: 'Valencia', lat: 39.47, lon: -0.376 },
      { nimi: 'Sevilla', lat: 37.389, lon: -5.985 },
      { nimi: 'Granada', lat: 37.177, lon: -3.599 },
      { nimi: 'Bilbao', lat: 43.263, lon: -2.935 },
    ],
    /*
     * Nosto näyttää sen, mikä kartassa on isointa ja mitä intro vain
     * nimeää: keskellä kohoava kuiva ylätasanko. Madridin oma
     * kansisivu kertoo jo, että pääkaupunki on Euroopan korkeimmalla
     * — sitä ei toisteta tässä, vaan kerrotaan millaista ylhäällä on.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Meseta on Espanjan kuiva katto',
      tiedosto: 'Murallas de Ávila - 01.jpg',
      teksti: 'Kartan keskeltä nousee Meseta, kuiva ylätasanko, joka '
        + 'peittää melkein puolet Espanjasta ja on keskimäärin '
        + '600–700 metrin korkeudella. Sen halki kulkee vuorijono, '
        + 'Sistema Central, joka jakaa tasangon kahtia; Madridista '
        + 'näkyy talvella sen lumihuippuja. Ylhäällä kesät ovat '
        + 'paahtavia ja talvet kylmiä, ja vanha sanonta lupaa Kastilian '
        + 'ilmastoksi yhdeksän kuukautta talvea ja kolme helvettiä. '
        + 'Tasangon laidalla seisoo Ávila 1 132 metrissä, korkeimpana '
        + 'Espanjan maakuntakaupungeista, ja sitä kiertää yhä '
        + 'kokonainen keskiaikainen muuri: 2,5 kilometriä ja 88 tornia.',
      selite: 'Ávilan keskiaikainen muuri kiertää kaupunkia Mesetan '
        + 'laidalla.',
      lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Ávila',
    },
  },
  SWE: {
    tiedosto: 'Sweden relief location map.jpg',
    lahde: 'Eric Gaba ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    // Rajat sijaintikarttaperheen omasta määrittelystä (Module:Location
    // map/data/Sweden). Kuva on muita kapeampi ja korkeampi (842 × 1837)
    // yksinkertaisesti siksi, että maa on sen muotoinen: 1 572 km
    // etelästä pohjoiseen.
    rajat: { pohjoinen: 69.5, etela: 55.1, lansi: 10.4, ita: 24.6 },
    /*
     * Kuusi kaupunkia etelästä pohjoiseen: neljä suurinta, pohjoisen
     * suurin (Uumaja) ja Kiiruna napapiirin yläpuolelta. Kartalta
     * näkee, miksi valtaosa väestä asuu eteläisessä kolmanneksessa —
     * pohjoisessa on tunturia ja metsää.
     */
    kaupungit: [
      { nimi: 'Tukholma', lat: 59.329, lon: 18.069, paa: true },
      { nimi: 'Göteborg', lat: 57.707, lon: 11.967 },
      { nimi: 'Malmö', lat: 55.605, lon: 13.003 },
      { nimi: 'Uppsala', lat: 59.858, lon: 17.645 },
      { nimi: 'Uumaja', lat: 63.826, lon: 20.263 },
      { nimi: 'Kiiruna', lat: 67.855, lon: 20.226 },
    ],
    /*
     * Nosto tarttuu introon kohdasta "vauraus rakennettiin raudasta".
     * Rautaa ei näytä mikään Ruotsin sivu, ja tämä on siitä se tarina,
     * jota lapsi ei usko ennen kuin näkee kuvan: kokonainen kaupunki
     * siirretään pois oman kaivoksensa alta.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Kaupunki, joka siirretään pois oman kaivoksensa alta',
      tiedosto: 'Kiruna20250819-12-kirkeflytting.jpg',
      teksti: 'Kartan pohjoispäässä, napapiirin yläpuolella, on '
        + 'Kiiruna. Sen alla on maailman suurin maanalainen '
        + 'rautakaivos, ja sitä on kaivettu niin syvälle kaupungin '
        + 'alle, että maa halkeilee — siksi koko Kiiruna siirretään '
        + 'kolme kilometriä itään. Taloja on nostettu lavettien päälle '
        + 'ja ajettu uudelle paikalle kävelyvauhtia. Elokuussa 2025 '
        + 'vuorossa oli puinen kirkko, joka on äänestetty Ruotsin '
        + 'kauneimmaksi rakennukseksi: se on niin leveä, että tietä '
        + 'piti levittää sitä varten, ja matka kesti kaksi päivää. '
        + 'Raudasta rakennettiin Ruotsin vauraus, ja täällä sitä yhä '
        + 'kaivetaan.',
      selite: 'Kiirunan kirkko matkalla uudelle paikalleen '
        + 'lavettipyörien päällä elokuussa 2025.',
      lahde: 'TorbjørnS, Wikimedia Commons (CC BY 4.0)',
      wiki: 'Kiirunan kunta',
    },
  },
  FRA: {
    tiedosto: 'France relief location map.jpg',
    lahde: 'Eric Gaba, Wikimedia Commons (CC BY-SA 4.0)',
    /*
     * Rajat sijaintikarttaperheen omasta määrittelystä (Module:Location
     * map/data/France). Kuva kattaa VAIN emämaan; Korsika mahtuu siihen
     * samassa mittakaavassa, mutta merentakaiset departementit ovat
     * omissa moduuleissaan omine karttoineen — Cayennea tai Fort-de-
     * Francea EI voi asemoida näillä rajoilla. Sama varoitus kuin
     * Espanjan Kanariansaarilla, eri syystä: siellä laatikko on kuvan
     * sisällä, täällä sitä ei ole lainkaan.
     */
    rajat: { pohjoinen: 51.5, etela: 41.0, lansi: -5.8, ita: 10.0 },
    /*
     * Kuusikulmion kärjet: keskus, Välimeri, Rhônen laakso Alppien
     * juurella, Pyreneiden juuri, Atlantin rannikko ja Reinin varsi.
     */
    kaupungit: [
      { nimi: 'Pariisi', lat: 48.857, lon: 2.351, paa: true },
      { nimi: 'Lyon', lat: 45.767, lon: 4.834 },
      { nimi: 'Marseille', lat: 43.298, lon: 5.381 },
      { nimi: 'Toulouse', lat: 43.604, lon: 1.443 },
      { nimi: 'Bordeaux', lat: 44.84, lon: -0.58 },
      { nimi: 'Strasbourg', lat: 48.58, lon: 7.75 },
    ],
    /*
     * Nosto tarttuu intron viimeiseen virkkeeseen: Ranska ei lopu
     * kartan reunaan. Se on myös rehellinen vastaus siihen, että tämä
     * kartta näyttää vain emämaan.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Euroopan raketit lähtevät sademetsästä',
      tiedosto: 'Webb Liftoff on Ariane 5 (potm2201a).jpeg',
      teksti: 'Ranska ei lopu kartan reunaan. Etelä-Amerikan '
        + 'pohjoisrannikolla on Ranskan Guayana, joka on osa Ranskaa ja '
        + 'Euroopan unionia — siksi Ranskan pisin maaraja ei ole '
        + 'Espanjan vaan Brasilian kanssa: 730 kilometriä sademetsää. '
        + 'Siellä, Kouroun kaupungin vieressä, on Euroopan '
        + 'avaruussatama. Se rakennettiin juuri tähän, koska '
        + 'päiväntasaaja on vain noin 600 kilometrin päässä: maapallon '
        + 'pyöriminen antaa raketille ilmaista vauhtia lähes 1 700 '
        + 'kilometriä tunnissa, ja itään päin on pelkkää merta. '
        + 'Joulupäivänä 2021 täältä nousi Ariane 5 ja vei mukanaan '
        + 'James Webb -avaruusteleskoopin.',
      selite: 'Ariane 5 nousee laukaisualustalta Kouroussa Ranskan '
        + 'Guayanassa joulupäivänä 2021.',
      lahde: 'ESA/CNES/Arianespace/Optique Vidéo du CSG – JM Guillon, '
        + 'Wikimedia Commons (CC BY 4.0)',
      wiki: 'Guayanan avaruuskeskus',
    },
  },
  NLD: {
    tiedosto: 'Netherlands relief location map.svg',
    lahde: 'Lencer ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0 de)',
    rajat: { pohjoinen: 53.7, etela: 50.6, lansi: 3.1, ita: 7.5 },
    /*
     * Randstadin neljä kaupunkia asettuvat länteen tiiviiksi rykelmäksi,
     * ja juuri se on kartan opetus: väki on pakkautunut rannikolle.
     * Groningen ja Maastricht antavat pohjois–etelä-mitan.
     *
     * HUOM korkokartasta: se näyttää tasangon, ei vuoria — ja se on
     * oikein. Ainoa selvä varjostus on rajojen takana Ardenneilla ja
     * Saksan puolella. Kuva ei siis ole väärä tai laadutonkaan, vaan
     * maa on sen näköinen; intro sanoo saman sanoin.
     */
    kaupungit: [
      { nimi: 'Amsterdam', lat: 52.373, lon: 4.894, paa: true },
      { nimi: 'Haag', lat: 52.084, lon: 4.318 },
      { nimi: 'Rotterdam', lat: 51.922, lon: 4.479 },
      { nimi: 'Utrecht', lat: 52.091, lon: 5.122 },
      { nimi: 'Groningen', lat: 53.217, lon: 6.567 },
      { nimi: 'Maastricht', lat: 50.845, lon: 5.696 },
    ],
    /*
     * Nosto tarttuu intron lupaukseen, että kuudesosa maasta on
     * kuivattu merestä: tässä on paikka, jossa se tapahtui yhden
     * saaren ympärillä. Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Saari, jonka ympäriltä meri vietiin pois',
      tiedosto: 'Schokland werelderfgoed hnapel 013.jpg',
      teksti: 'Schokland oli saari keskellä Zuiderzee-merta. Tulvat '
        + 'söivät sitä pala palalta, ja lopulta asukkaat mahtuivat enää '
        + 'kolmelle korkeimmalle kummulle. Vuoden 1825 suurtulvan '
        + 'jälkeen hallitus määräsi 1859, että saari on jätettävä: vesi '
        + 'oli voittanut. Sitten kävi päinvastoin. Kun Noordoostpolder '
        + 'pumpattiin kuivaksi vuonna 1942, meri katosi saaren '
        + 'ympäriltä. Nyt Schokland on loiva kumpare peltojen keskellä, '
        + 'ja sen vanha puinen merimuuri seisoo yhä paikallaan, vaikka '
        + 'aaltoja ei ole. Se on Alankomaiden ensimmäinen Unescon '
        + 'maailmanperintökohde.',
      selite: 'Schoklandin entinen kirkko kumpareellaan ja saaren vanha '
        + 'puinen merimuuri keskellä kuivattua peltoa.',
      lahde: 'Hnapel, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Schokland',
    },
  },
  CZE: {
    /*
     * POIKKEUS: tämä EI ole sijaintikarttamoduulin oma `image1`.
     * Moduuli osoittaa 1000 px:n rasteriin, jonka tekijätieto on
     * sekava; tässä käytetty SVG on saman rajauksen kuva, jonka
     * TIEDOSTOSIVU DOKUMENTOI RAJAT ITSE ja ne täsmäävät moduuliin
     * pilkulleen. Lisäksi siinä on joet piirrettynä, ja Tšekki on
     * jokien maa — Vltava ja Labe ovat intron ydintä.
     */
    tiedosto: 'Czech Republic relief location map.svg',
    lahde: 'SANtosito, Wikimedia Commons (CC BY-SA 4.0)',
    rajat: { pohjoinen: 51.3, etela: 48.3, lansi: 11.8, ita: 19.2 },
    kaupungit: [
      { nimi: 'Praha', lat: 50.083, lon: 14.417, paa: true },
      { nimi: 'Karlovy Vary', lat: 50.228, lon: 12.866 },
      { nimi: 'Plzeň', lat: 49.748, lon: 13.378 },
      { nimi: 'České Budějovice', lat: 48.975, lon: 14.475 },
      { nimi: 'Brno', lat: 49.2, lon: 16.617 },
      { nimi: 'Ostrava', lat: 49.836, lon: 18.293 },
    ],
    // Intro sanoo, että Böömiä ympäröivät vuoret joka suunnalta;
    // nosto näyttää, mitä niiden luoteiskulmassa on.
    // Kuva silmätarkistettu 480 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Euroopan suurin kiviportti Böömin reunalla',
      tiedosto: 'Pravčická brána (Prebischtor) - by Pudelek.jpg',
      teksti: 'Kartan luoteisreunalla, siinä missä Böömin vuorikehä '
        + 'kohtaa Elben, hiekkakivi on kulunut portiksi. Pravčická '
        + 'brána on Euroopan suurin luonnon hiekkakivikaari: aukko on '
        + '26,5 metriä leveä ja 16 metriä korkea, ja kaaren ohuin '
        + 'kohta on vain kolme metriä paksu. Kaaren yli sai kävellä '
        + '1980-luvulle asti, mutta kävijöiden kengät kuluttivat kiveä '
        + 'niin paljon, että se suljettiin vuonna 1982 — nyt porttia '
        + 'katsellaan viereiseltä kalliolta. Ensimmäisen Narnia-'
        + 'elokuvan maisemia kuvattiin täällä, mutta kaaren päällä '
        + 'juokseminen tehtiin studiossa.',
      selite: 'Pravčická brána Böömin Sveitsissä on Euroopan suurin '
        + 'luonnon hiekkakivikaari.',
      lahde: 'Pudelek, Wikimedia Commons (CC BY-SA 4.0)',
      // Kaarella itsellään ei ole suomenkielistä artikkelia; sen
      // kansallispuistolla on.
      wiki: 'České Švýcarskon kansallispuisto',
    },
  },
  POL: {
    tiedosto: 'Relief Map of Poland.svg',
    lahde: 'TUBS, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 55.2, etela: 48.7, lansi: 13.8, ita: 24.5 },
    /*
     * Kuusikulmio, joka piirtää maan muodon: rannikko Veikselin
     * suulla, länsi Wartan varrella, lounas Oderilla, keskusta, etelä
     * vuorten juurella ja itä.
     */
    kaupungit: [
      { nimi: 'Varsova', lat: 52.23, lon: 21.012, paa: true },
      { nimi: 'Gdańsk', lat: 54.352, lon: 18.647 },
      { nimi: 'Poznań', lat: 52.406, lon: 16.925 },
      { nimi: 'Wrocław', lat: 51.108, lon: 17.039 },
      { nimi: 'Krakova', lat: 50.065, lon: 19.945 },
      { nimi: 'Lublin', lat: 51.246, lon: 22.568 },
    ],
    // Intro päättyy siihen, että tasangolla ei ole vuoria suojana ja
    // linnoitukset rakennettiin jokien varsille; nosto näyttää niistä
    // suurimman. Kuva silmätarkistettu 480 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Maailman suurin linna on tehty tiilestä',
      tiedosto: 'Malbork Castle in the afternoon.jpg',
      teksti: 'Veikselin sivuhaaran Nogatin rannalla, keskellä '
        + 'tasankoa, seisoo Malborkin linna — pinta-alaltaan maailman '
        + 'suurin linna. Uloimmat muurit sulkevat sisäänsä 21 '
        + 'hehtaaria, nelinkertaisesti Windsorin linnan verran, eikä '
        + 'siinä ole juuri lainkaan luonnonkiveä: kaikki on poltettua '
        + 'tiiltä. Saksalainen ritarikunta alkoi rakentaa sitä 1274 ja '
        + 'siirsi päämajansa tänne 1309. Linnoja on oikeastaan kolme '
        + 'sisäkkäin, ja niiden välissä on kuivia vallihautoja. Vuonna '
        + '1945 yli puolet tuhoutui taisteluissa, ja linnaa on koottu '
        + 'takaisin 1960-luvulta asti.',
      selite: 'Malborkin tiililinna Nogat-joen rannalla '
        + 'Pohjois-Puolassa.',
      lahde: 'DerHexer, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Malborkin linna',
    },
  },
  AUT: {
    tiedosto: 'Austria relief location map.jpg',
    lahde: 'Uwe Dedering, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 49.2, etela: 46.3, lansi: 9.4, ita: 17.2 },
    /*
     * Kaupungit koko itä–länsi-akselilta (16,4° → 9,7°), koska juuri
     * se on maan muoto: Tonavan alanko pohjoisessa, Alppien laaksot
     * lännessä ja kapea kieleke Bodenjärvellä. Bregenz osuu 4,5 %:n
     * kohdalle eli aivan vasempaan laitaan — se on tarkoitus, sillä
     * ilman sitä kielekettä ei näkisi kartalta lainkaan.
     */
    kaupungit: [
      { nimi: 'Wien', lat: 48.208, lon: 16.373, paa: true },
      { nimi: 'Linz', lat: 48.303, lon: 14.291 },
      { nimi: 'Graz', lat: 47.07, lon: 15.439 },
      { nimi: 'Salzburg', lat: 47.8, lon: 13.033 },
      { nimi: 'Innsbruck', lat: 47.267, lon: 11.393 },
      { nimi: 'Bregenz', lat: 47.505, lon: 9.749 },
    ],
    /*
     * Intro päättyy Hallstattiin ja Salzburgin nimen merkitykseen;
     * nosto vie vuoren sisään. Kuva on kaivoskuvaksi hämärä, mutta
     * liukumäki erottuu siitä heti — tarkistettu silmin 480 px:ssä
     * 8.8.2026, samoin neljä hylättyä vaihtoehtoa.
     */
    nosto: {
      otsikko: 'Vanhassa suolakaivoksessa liukumäki vie alas',
      tiedosto: '1093 - Hallstatt - Salzbergwerk.JPG',
      teksti: 'Hallstattin kylän yläpuolella vuoressa on louhittu '
        + 'suolaa seitsemäntuhatta vuotta. Kerroksesta toiseen ei '
        + 'kuljeta portaita: kaivosmiehet höyläsivät puusta pitkiä '
        + 'liukumäkiä, ja niitä pitkin mennään yhä alas. Suola on '
        + 'säilyttänyt kaiken, mitä vuoreen on jäänyt — nahkakenkiä, '
        + 'kangaspaloja, työkaluja ja kantoreppuja, joita kukaan ei '
        + 'tullut hakemaan. Käytävästä on löytynyt myös kokonaiset '
        + 'puiset portaat, jotka on ajoitettu puun vuosirenkaista '
        + 'vuosiin 1344 ja 1343 eaa. Ne ovat Euroopan vanhimmat '
        + 'säilyneet portaat.',
      selite: 'Kaivosmiesten puinen liukumäki vie kerroksesta toiseen '
        + 'Hallstattin suolakaivoksessa.',
      lahde: 'Andrew Bossi, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Hallstatt',
    },
  },
  CHE: {
    /*
     * POIKKEUS kuten Tšekillä: moduulin `image1` on 64 megatavun PNG,
     * johon on lisäksi piirretty kaikki 26 kantonirajaa — levottomampi
     * kuin muut pelin maakartat. Tämä on saman rajauksen kuva samalta
     * tekijäparilta kuin Italian ja Ruotsin kartat, ja sen tiedostosivu
     * ilmoittaa rajat asteminuutteina täsmälleen moduulin arvoiksi.
     */
    tiedosto: 'Switzerland relief location map.jpg',
    lahde: 'Eric Gaba ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 47.9, etela: 45.75, lansi: 5.8, ita: 10.7 },
    /*
     * Zermatt on listalla laudan takia: Euroopan laudan kohde
     * Sveitsissä on "Alpit", ja Zermatt on ainoa näistä pisteistä,
     * joka osuu keskelle ruskeaa Alppimassiivia eikä alangolle. Näin
     * pelaaja löytää kartalta sen paikan, jossa hän on käynyt.
     */
    kaupungit: [
      { nimi: 'Bern', lat: 46.95, lon: 7.45, paa: true },
      { nimi: 'Geneve', lat: 46.204, lon: 6.141 },
      { nimi: 'Basel', lat: 47.567, lon: 7.6 },
      { nimi: 'Zürich', lat: 47.367, lon: 8.55 },
      { nimi: 'Zermatt', lat: 46.024, lon: 7.749 },
      { nimi: 'Lugano', lat: 46.0, lon: 8.95 },
    ],
    /*
     * Intro sanoo, ettei maata pidä koossa kieli vaan yhteinen tapa
     * päättää asioista. Nosto näyttää sen tavan äärimuodossaan.
     * Kaarella ei ole suomenkielistä artikkelia — Landsgemeindestä ei
     * ole fi-sivua — joten wiki osoittaa ilmiöön.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Koko kantoni äänestää torilla käsi pystyssä',
      tiedosto: 'Landsgemeinde - Glarus 2014 - 5.jpg',
      teksti: 'Sveitsissä äänestetään usein, mutta kahdessa kantonissa '
        + 'se tehdään yhä ulkona torilla. Glarusissa kokoonnutaan '
        + 'toukokuun ensimmäisenä sunnuntaina: tuhannet ihmiset '
        + 'istuvat penkeillä vuoren juurella, ja jokainen paikalla '
        + 'olija saa pyytää puheenvuoron ja ehdottaa lakiin muutosta. '
        + 'Äänestettäessä nostetaan äänestyskortti ilmaan. Kukaan ei '
        + 'laske ääniä yksitellen — kokouksen johtaja katsoo '
        + 'kohotettuja käsiä ja päättää, kumpi puoli voitti. Näin '
        + 'päätettiin vuonna 2007, että Glarusissa saa äänestää jo '
        + '16-vuotiaana. Se on yhä Sveitsin ainoa kantoni, jossa niin '
        + 'nuori pääsee mukaan.',
      selite: 'Glarusin kantonin väki äänestää äänestyskortteja '
        + 'nostaen kaupungin torilla toukokuussa 2014.',
      lahde: 'Ludovic Péron, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Suora demokratia',
    },
  },
  NOR: {
    /*
     * ÄLÄ VAIHDA TÄTÄ ISOMPAAN. Commonsissa on suurempi ja kauniimpi
     * `Norway rel location map.svg`, mutta se on KARTIOKUVAUS — pelin
     * prosenttiasemointi olettaa tasavälisen ruudukon, joten pisteet
     * valuisivat sillä vinoon eikä sitä huomaisi ilman tarkistusta.
     * Tämä on kategorian ainoa koko maan tasavälinen korkokartta.
     *
     * Kartta kattaa vain mantereen: Huippuvuoret ja Jan Mayen ovat
     * omissa moduuleissaan, joten Longyearbyeniä ei voi asemoida
     * näillä rajoilla. Sama varoitus kuin Ranskalla.
     */
    tiedosto: 'Relief Map of Norway.png',
    lahde: 'Виктор В ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 71.5, etela: 57.6, lansi: 4.1, ita: 31.6 },
    /*
     * Bergen osuu 4,5 %:n kohdalle ja Kirkkoniemi 94,4 %:iin — molemmat
     * tarkoituksella laitaan. Ilman niitä kartalta ei näkisi, että maa
     * on kapea lännessä ja kaartuu pohjoisessa Suomen yläpuolelta itään.
     */
    kaupungit: [
      { nimi: 'Oslo', lat: 59.913, lon: 10.739, paa: true },
      { nimi: 'Bergen', lat: 60.389, lon: 5.33 },
      { nimi: 'Stavanger', lat: 58.961, lon: 5.716 },
      { nimi: 'Trondheim', lat: 63.43, lon: 10.393 },
      { nimi: 'Tromssa', lat: 69.683, lon: 18.943 },
      { nimi: 'Kirkkoniemi', lat: 69.717, lon: 30.05 },
    ],
    // Intro päättyy siihen, ettei meri kaikkialla mahdu rauhassa
    // kapeikoista; nosto näyttää paikan, jossa se ei mahdu lainkaan.
    // Kuva silmätarkistettu 480 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Maailman voimakkain merivirta pyörii sillan alla',
      tiedosto: 'Apparent whirlpools of Saltstraumen seen from the air.jpg',
      teksti: 'Bodøn lähellä kaksi vuonoa on liitetty toisiinsa kolmen '
        + 'kilometrin pituisella ja vain 150 metriä leveällä salmella. '
        + 'Kun vuorovesi kääntyy, sen läpi pusertuu kuudessa tunnissa '
        + 'jopa 400 miljoonaa kuutiometriä merivettä, nopeimmillaan 40 '
        + 'kilometrin tuntivauhtia. Vesi ei mahdu kulkemaan suoraan '
        + 'vaan alkaa pyöriä: salmeen syntyy kymmenen metriä leveitä ja '
        + 'viisi metriä syviä pyörteitä, jotka katoavat yhtä äkkiä. '
        + 'Saltstraumen on maailman voimakkain vuorovesivirta, ja sen '
        + 'yli vie tavallinen maantiesilta, jolta pyörteitä katsotaan '
        + 'kaiteen takaa. Virta on nuori: se syntyi vasta pari kolme '
        + 'tuhatta vuotta sitten, kun maa nousi jääkauden jälkeen.',
      selite: 'Saltstraumenin salmi ilmasta: maantiesilta ylittää '
        + 'kapean väylän, ja vuorovesivirta piirtää veteen vaahtoisia '
        + 'pyörteitä.',
      lahde: 'Frankemann, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Saltstraumen',
    },
  },
  DNK: {
    /*
     * Tämän kuvan tiedostosivu ei ilmoita rajoja itse vaan viittaa
     * sisarkuvaansa (`Denmark location map.svg`), jonka sivu ilmoittaa
     * ne — ja ne täsmäävät moduuliin. Varmistus on siis yhden hypyn
     * takana, heikommin kuin muilla mailla, ja siksi se on kirjattu
     * tähän.
     *
     * Kuvassa on oikeassa yläkulmassa korkeusselite-laatikko. Se ei
     * osu yhdenkään kaupungin päälle. Ainoa vaihtoehto ilman
     * laatikkoa (Tschubbyn relief) ei dokumentoi koordinaattejaan
     * lainkaan, joten sitä ei voi käyttää.
     */
    tiedosto: 'Denmark physical map.svg',
    lahde: 'Urutseg, Wikimedia Commons (CC0)',
    rajat: { pohjoinen: 57.9, etela: 54.3, lansi: 7.8, ita: 15.4 },
    /*
     * Grönlanti ja Färsaaret eivät ole tällä kartalla — omat
     * moduulinsa. Bornholm on, ja siksi Rønne on listalla: se vetää
     * katseen kartan oikeaan laitaan, jossa Tanskaa on vielä jäljellä.
     * Skagen jätettiin pois pisteistä tarkoituksella, koska se on
     * noston aihe — sama ratkaisu kuin San Marino Italian kartalla.
     */
    kaupungit: [
      { nimi: 'Kööpenhamina', lat: 55.667, lon: 12.567, paa: true },
      { nimi: 'Esbjerg', lat: 55.483, lon: 8.45 },
      { nimi: 'Aalborg', lat: 57.051, lon: 9.919 },
      { nimi: 'Aarhus', lat: 56.15, lon: 10.2 },
      { nimi: 'Odense', lat: 55.4, lon: 10.383 },
      { nimi: 'Rønne', lat: 55.1, lon: 14.7 },
    ],
    // Intro alkaa kolmannessa kappaleessa siitä, että Jyllanti kapenee
    // pohjoisessa hiekkakieleksi; nosto vie sen kärkeen.
    // Kuva silmätarkistettu 480 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kartan pohjoiskärjessä kaksi merta törmää',
      tiedosto: 'Grenen (36545893426).jpg',
      teksti: 'Jyllannin pohjoisin kohta on Grenen, hiekasta kasvanut '
        + 'kieleke, jonka kärjessä Skagerrak ja Kattegat kohtaavat. '
        + 'Aallot tulevat kummaltakin puolelta ja iskeytyvät '
        + 'vastakkain keskellä hiekkaa. Uiminen on kielletty, koska '
        + 'virta on hengenvaarallinen, mutta kahlata saa: kärjessä voi '
        + 'seisoa toinen jalka Skagerrakissa ja toinen Kattegatissa. '
        + 'Kärkeen kävellään tai ajetaan Sandormenilla, traktorin '
        + 'vetämällä matkustajavaunulla. Kieleke ei ole valmis: meri '
        + 'kuljettaa hiekkaa pitkin länsirannikkoa pohjoiseen, ja kärki '
        + 'kasvaa noin kymmenen metriä vuodessa kohti Ruotsia.',
      selite: 'Grenenin hiekkakärki ilmasta: kävijät kulkevat jonossa '
        + 'kapeaa kielekettä pitkin, ja aallot murtuvat kummallakin '
        + 'puolella.',
      lahde: 'Marcus Hansson, Wikimedia Commons (CC BY 2.0)',
      // Grenenistä ei ole omaa fi-artikkelia; nimi ohjaa Skageniin.
      wiki: 'Skagen',
    },
  },
  LVA: {
    /*
     * POIKKEUS kuten Tšekillä ja Sveitsillä: moduulin oma image1 on
     * seittimäinen, koska siihen on piirretty kaikkien noin sadan
     * kunnan rajat eikä siinä ole jokia. Tämä on saman perheen kuva,
     * jonka tiedostosivu dokumentoi rajat itse ja jossa Väinäjoki
     * näkyy — se on maan selkäranka ja kartan ainoa iso viiva.
     */
    tiedosto: 'Latvia relief location map.svg',
    lahde: 'Maximilian Dörrbecker (Chumwa), Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 58.5, etela: 55.5, lansi: 20.5, ita: 28.6 },
    /*
     * Kartta on melkein kokonaan vihreä, eikä se ole vika: Latviassa ei
     * ole vuoria. Ruskeaa on vain kaksi laikkua, ja Cēsis on listalla
     * merkitsemässä niistä pohjoisempaa — ilman sitä kartalta ei näkisi,
     * että maassa ylipäätään kohoaa mitään.
     */
    kaupungit: [
      { nimi: 'Riika', lat: 56.947, lon: 24.105, paa: true },
      { nimi: 'Liepāja', lat: 56.517, lon: 21.0 },
      { nimi: 'Ventspils', lat: 57.396, lon: 21.567 },
      { nimi: 'Jelgava', lat: 56.648, lon: 23.714 },
      { nimi: 'Cēsis', lat: 57.317, lon: 25.267 },
      { nimi: 'Daugavpils', lat: 55.883, lon: 26.533 },
    ],
    // Intro päättyy siihen, että tasainen maa tekee yhden tempun.
    // Kuva silmätarkistettu 480 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kaupunki, jossa lohta sai ilmasta',
      tiedosto: '20140421-01(Vimbu lekšana Ventas rumbā).jpg',
      teksti: 'Kuldīgan kohdalla Venta-joki putoaa kalliokynnyksen '
        + 'yli. Putous on vain noin kaksi metriä korkea mutta 249 '
        + 'metriä leveä — koko Euroopan levein vesiputous, ja '
        + 'kevättulvassa se venyy vielä 275-metriseksi. Keväällä kalat '
        + 'nousevat jokea ylös kutemaan, ja kynnyksen yli on päästävä '
        + 'hyppäämällä ilmaan. 1600-luvulla Kuurinmaan herttua Jaakob '
        + 'keksi käyttää sen hyväkseen: hän teetti sata pajukoria, '
        + 'jotka aseteltiin putouksen alle, ja ylös pääsemättömät '
        + 'kalat putosivat koreihin. Kuldīgaa sanottiin kaupungiksi, '
        + 'jossa lohta saa ilmasta. Lohet ovat kadonneet, mutta '
        + 'vimpoja hyppää yhä joka kevät.',
      selite: 'Vimpoja hyppää ilmaan Ventas rumban yli Kuldīgassa: '
        + 'putous on matala mutta leveä, ja kalojen on noustava sen '
        + 'yli päästäkseen kutupaikoille.',
      lahde: 'Karlis Ustups, Wikimedia Commons (CC BY-SA 4.0)',
      // Putouksesta ei ole fi-artikkelia; kaupungilla on.
      wiki: 'Kuldīga',
    },
  },
  LTU: {
    /*
     * Tämä on moduulin oma image1, ja siinä on kaikkien 60 kunnan
     * rajat — kartta on siis levottomampi kuin naapurin Latvian.
     * Siistimpi vaihtoehto on olemassa (Tschubbyn relief), mutta sen
     * tiedostosivu ei dokumentoi reunakoordinaatteja lainkaan eikä sen
     * kuvasuhde täsmää moduulin rajaukseen, joten pisteet valuisivat
     * vinoon. Dokumentoitu rajaus voittaa kauniimman kuvan.
     */
    tiedosto: 'Relief Map of Lithuania.jpg',
    lahde: 'NordNordWest ja Виктор В, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 56.7, etela: 53.7, lansi: 20.4, ita: 27.2 },
    /*
     * Trakai on tarkoituksella pois: se on vain 0,35 astetta Vilnasta
     * länteen, joten nimet menisivät päällekkäin — ja se on noston
     * aihe, eli parempi löytää kuvasta kuin lukea kartalta.
     */
    kaupungit: [
      { nimi: 'Vilna', lat: 54.689, lon: 25.28, paa: true },
      { nimi: 'Klaipėda', lat: 55.7, lon: 21.133 },
      { nimi: 'Šiauliai', lat: 55.933, lon: 23.317 },
      { nimi: 'Panevėžys', lat: 55.733, lon: 24.35 },
      { nimi: 'Kaunas', lat: 54.9, lon: 23.933 },
      { nimi: 'Druskininkai', lat: 54.017, lon: 23.967 },
    ],
    // Intro päättyy siihen, että yhdellä järvisaarella seisoo
    // kokonainen linna. Kuva silmätarkistettu 480 px:ssä 8.8.2026;
    // toinen ehdokas hylättiin, koska torni oli rakennustelineissä.
    nosto: {
      otsikko: 'Linna omalla saarellaan keskellä järveä',
      tiedosto: 'Trakai Island Castle, Lithuania - Diliff.jpg',
      teksti: 'Vilnasta 28 kilometriä länteen on Trakai, Liettuan '
        + 'vanha pääkaupunki. Sen ympärillä on yli kaksisataa järveä, '
        + 'ja suurimman ja syvimmän, Galvėn, saarelle rakennettiin '
        + 'punatiilinen linna. Sen aloitti suuriruhtinas Kęstutis '
        + '1300-luvulla ja sai valmiiksi hänen poikansa Vytautas Suuri '
        + 'noin 1409. Vytautas myös kuoli tässä linnassa 1430, ja hän '
        + 'oli se ruhtinas, joka toi Krimiltä mukanaan karaiimit — '
        + 'heitä asuu Trakaissa yhä. Sotien jälkeen linna seisoi '
        + 'raunioina lähes kolmesataa vuotta, ja se rakennettiin '
        + 'uudelleen vasta 1950- ja 1960-luvulla.',
      selite: 'Trakain saarilinna Galvė-järvellä: punatiiliset muurit '
        + 'ja punakattoiset tornit nousevat suoraan vedestä.',
      lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Trakain linna',
    },
  },
  FIN: {
    /*
     * SUOMI ON POIKKEUS, JA SYY ON SYYTÄ LUKEA ENNEN MUUTTAMISTA.
     *
     * Suomen sijaintikarttamoduulissa EI OLE rajakoordinaatteja
     * lainkaan: se on kartioprojektion kaava (sini ja kosini
     * keskimeridiaanin ympärillä). Sen pari `Finland rel location
     * map.png` on siis kartiokuvaus, jossa pituuspiirit kaartuvat —
     * pelin suora prosenttilaskenta heittäisi sillä reunoilla useita
     * asteita, eikä sitä huomaisi katsomatta.
     *
     * Tämä kuva on sen sijaan tasavälinen (Commonsin luokka "Maps with
     * equirectangular projection"). Rajat tulevat sen sisarkuvalta,
     * johon tiedostosivu viittaa ("parameters equal to File:Finland
     * location map.svg"). Ketju on siis yhden hypyn pituinen, ja se on
     * tarkistettu piirtämällä pisteet kuvan päälle: Helsinki, Turku,
     * Tampere, Kuopio, Oulu ja Rovaniemi osuvat paikoilleen.
     */
    tiedosto: 'Finland physical map.svg',
    lahde: 'Urutseg, Wikimedia Commons (public domain)',
    rajat: { pohjoinen: 70.4, etela: 59.5, lansi: 19.0, ita: 32.0 },
    /*
     * Laudan Lappi-kohde on tässä Rovaniemi: se istuu napapiirillä eli
     * kartan opettavaisimmalla näkymättömällä viivalla, ja se on se
     * Lapin paikka, jonka suomalainen lapsi tuntee.
     */
    kaupungit: [
      { nimi: 'Helsinki', lat: 60.171, lon: 24.938, paa: true },
      { nimi: 'Turku', lat: 60.451, lon: 22.267 },
      { nimi: 'Tampere', lat: 61.498, lon: 23.761 },
      { nimi: 'Kuopio', lat: 62.893, lon: 27.678 },
      { nimi: 'Oulu', lat: 65.017, lon: 25.467 },
      { nimi: 'Rovaniemi', lat: 66.5, lon: 25.733 },
    ],
    /*
     * Suomalainen lapsi tietää maastaan paljon, joten nosto on
     * valittava niin, että se yllättää hänetkin. Merenkurkun
     * maankohoaminen olisi ollut ilmeinen valinta, mutta se on jo
     * Suomi-laudan kysymyksissä — tämä ei ole missään.
     * Kuva silmätarkistettu 480 px:ssä 8.8.2026.
     */
    nosto: {
      otsikko: 'Järvi, jonka alle jäi kolme kylää',
      tiedosto: 'Lokka reservoir 1.jpg',
      teksti: 'Kartan pohjoisosassa Sodankylässä on kaksi isoa järveä, '
        + 'joita ei ole kaivanut jääkausi vaan ihminen. Lokan altaan '
        + 'täyttö alkoi vuonna 1967 ja Porttipahta valmistui 1970, '
        + 'jotta Kemijoen voimalaitoksille riittäisi vettä ympäri '
        + 'vuoden. Lokka on Euroopan unionin suurin tekojärvi: '
        + 'ylimmällä vedenkorkeudella se peittää 418 neliökilometriä. '
        + 'Sen alle jäivät Korvasen, Rieston ja Mutenian kylät sekä '
        + 'Posoaapa, joka oli siihen asti Suomen ja Euroopan suurin '
        + 'aapasuo. Kaikkia puita ei ehditty kaataa ennen tulvitusta, '
        + 'ja kantoja on nostettu pohjasta vielä 2000-luvulla.',
      selite: 'Lokan tekojärvi patotieltä nähtynä; horisontissa '
        + 'siintävät Nattaset. Veden alla ovat vanhat kylänpaikat ja '
        + 'suo.',
      lahde: 'Htm, Wikimedia Commons (CC BY 4.0)',
      wiki: 'Lokan tekojärvi',
    },
  },
  EST: {
    /*
     * POIKKEUS: moduulin oma image1 on vain 833 px leveä, ja peli
     * pyytää kuvat tuhannen pikselin levyisinä — MediaWiki ei suurenna
     * rasteria yli alkuperäisen, joten Viro olisi jäänyt pelin
     * pienimmäksi kartaksi. Tämä on kolme kertaa isompi, ja sen
     * tiedostosivu ilmoittaa TÄSMÄLLEEN samat rajat kuin moduuli.
     */
    tiedosto: 'Reliefkarte Estland.png',
    lahde: 'Tschubby, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 60.4, etela: 57.2, lansi: 21.5, ita: 28.4 },
    /*
     * Võru on listalla siksi, että se on ainoa piste kartan ainoalla
     * ruskealla alueella — kaakon ylängöillä, joilla Suur Munamägi
     * kohoaa. Kuressaare merkitsee Saarenmaan, jolla noston kraatteri
     * on.
     */
    kaupungit: [
      { nimi: 'Tallinna', lat: 59.439, lon: 24.754, paa: true },
      { nimi: 'Kuressaare', lat: 58.25, lon: 22.483 },
      { nimi: 'Pärnu', lat: 58.383, lon: 24.5 },
      { nimi: 'Tartto', lat: 58.38, lon: 26.723 },
      { nimi: 'Narva', lat: 59.374, lon: 28.187 },
      { nimi: 'Võru', lat: 57.849, lon: 26.993 },
    ],
    // Intro päättyy siihen, että yhdellä saarella on kartalle liian
    // pieni mutta etsimisen arvoinen kohta.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Taivaalta putosi rautaa keskelle Saarenmaata',
      tiedosto: 'Kaali kraater1.jpg',
      teksti: 'Kartan läntisin iso saari on Saarenmaa, ja keskellä sen '
        + 'metsiä on täysin pyöreä kuoppa. Sen teki rautameteoriitti, '
        + 'joka hajosi ilmakehässä ja iski maahan yhdeksänä '
        + 'kappaleena. Suurin kraatteri on noin 110 metriä leveä ja 16 '
        + 'metriä syvä, ja sen pohjalla on pieni järvi. Saarella '
        + 'asuttiin jo silloin: kraatterin vallilta on löytynyt '
        + 'pronssikautisia talonpohjia, ja vallia on vahvistettu '
        + 'kivimuurilla. Törmäyksen ajankohdasta kiistellään yhä, '
        + 'sillä arviot vaihtelevat runsaan kahden ja lähes neljän '
        + 'vuosituhannen välillä.',
      selite: 'Kaalin kraatteri ylhäältä kuvattuna: pyöreä kuoppa '
        + 'metsän keskellä, pohjalla vettä.',
      lahde: 'Monika Michelson-Mõik, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Kaalin kraatteri',
    },
  },
  ISL: {
    /*
     * Pelin toiseksi pienin kartta (1200 px, vain Egyptin 1055 px on
     * pienempi). Isompaa ei ole: Commonsin koko Islanti-korkokarttojen
     * luokassa on kolme tiedostoa eikä yhtään SVG:tä. Tschubbyn
     * `Reliefkarte Island.png` on 3000 px ja kaunis, mutta sen
     * tiedostosivu ei kerro reunakoordinaatteja lainkaan — sama
     * hylkäysperuste kuin Liettuassa.
     */
    tiedosto: 'Iceland relief map.jpg',
    lahde: 'Виктор В ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 66.8, etela: 63.1, lansi: -25.0, ita: -13.0 },
    /*
     * Islannissa asutaan rannoilla, joten kaikki kuusi pistettä ovat
     * kehällä ja keskusta jää tyhjäksi — juuri se on kartan opetus.
     * Ísafjörður merkitsee Länsivuonot, Höfn Vatnajökullin juuren.
     */
    kaupungit: [
      { nimi: 'Reykjavík', lat: 64.135, lon: -21.895, paa: true },
      { nimi: 'Ísafjörður', lat: 66.067, lon: -23.117 },
      { nimi: 'Akureyri', lat: 65.683, lon: -18.1 },
      { nimi: 'Egilsstaðir', lat: 65.283, lon: -14.383 },
      { nimi: 'Höfn', lat: 64.25, lon: -15.217 },
      { nimi: 'Selfoss', lat: 63.933, lon: -20.997 },
    ],
    // Intro päättyy siihen, että jäätiköt liikkuvat; nosto näyttää
    // paikan, jonka liike synnytti sadassa vuodessa.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Jäävuoret odottavat järvessä vuoroaan mereen',
      tiedosto: 'Striped iceberg at Jökulsárlón Glacier Lagoon.jpg',
      teksti: 'Kartan suurimman valkoisen läiskän, Vatnajökullin, '
        + 'eteläreunasta työntyy jääkieleke merta kohti. Sen edessä on '
        + 'Jökulsárlón, järvi jota ei ollut olemassa sata vuotta '
        + 'sitten: jäätikkö alkoi vetäytyä, ja 1930-luvulla jäljelle '
        + 'jäänyt kuoppa täyttyi sulavedellä. Nyt se on Islannin syvin '
        + 'järvi, yli 280 metriä, ja se on nelinkertaistunut '
        + '1970-luvulta. Jäätikön reunasta lohkeaa jäävuoria, jotka '
        + 'kelluvat järvessä vuosia, kunnes ovat tarpeeksi pieniä '
        + 'mahtuakseen kapeasta uomasta mereen. Monessa on mustia '
        + 'raitoja — tuhkaa tulivuorenpurkauksista, joka jäi jään '
        + 'sisään.',
      selite: 'Tuhkaraitainen jäävuori Jökulsárlónin jäätikköjärvessä. '
        + 'Mustat juovat ovat vanhojen purkausten tuhkakerroksia.',
      lahde: 'Snowolf, Wikimedia Commons (CC BY-SA 4.0)',
      // Jökulsárlónista ei ole suomenkielistä artikkelia, joten linkki
      // vie jäätikköön, jonka reunalla järvi on. Sama ratkaisu kuin
      // Tanskan Grenen → Skagen.
      wiki: 'Vatnajökull',
    },
  },
  IRL: {
    /*
     * POIKKEUS: moduulin oma image1 `Ireland relief location map.png`
     * haalistaa Pohjois-Irlannin pois muusta saaresta. Pelin
     * Irlanti-sivu käsittelee koko saarta, joten haalistus olisi väärä
     * viesti. Tämä on saman tekijän, saman lisenssin ja saman kokoinen
     * kuva, jonka tiedostosivu ilmoittaa TÄSMÄLLEEN samat rajat kuin
     * moduuli — vain kreivikuntien piirto on eri. Rajat eivät siis
     * muutu. Sama poikkeuslaji kuin CZE, CHE ja LVA.
     *
     * Itäraja on −5,0°, joten kartan oikeaan laitaan osuu pala
     * Skotlantia (Islay ja Kintyre). Mansaari (−4,5°) ei mahdu.
     */
    tiedosto: 'Island of Ireland relief location map.png',
    lahde: 'Nilfanion, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 55.6, etela: 51.2, lansi: -11.0, ita: -5.0 },
    /*
     * Belfast on listalla tarkoituksella, vaikka se on jo Britannian
     * kartalla: se on samalla saarella, ja se tekee kartan paksun
     * rajaviivan ymmärrettäväksi. Limerick istuu Shannonin varrella,
     * jonka kartta näyttää.
     */
    kaupungit: [
      { nimi: 'Dublin', lat: 53.333, lon: -6.25, paa: true },
      { nimi: 'Belfast', lat: 54.597, lon: -5.93 },
      { nimi: 'Sligo', lat: 54.267, lon: -8.483 },
      { nimi: 'Galway', lat: 53.273, lon: -9.039 },
      { nimi: 'Limerick', lat: 52.666, lon: -8.624 },
      { nimi: 'Cork', lat: 51.897, lon: -8.47 },
    ],
    // Intro päättyy Boyne-joen mutkan kumpuun; nosto avaa sen.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kumpu, joka päästää auringon sisään kerran vuodessa',
      tiedosto: 'Newgrange (52381348388).jpg',
      teksti: 'Kartan itälaidalla, Boyne-joen mutkassa, on ruohoinen '
        + 'kumpu, joka on vanhempi kuin Stonehenge ja Egyptin '
        + 'pyramidit: Newgrange rakennettiin noin 3100 eaa. Siihen '
        + 'ladottiin 200 000 tonnia maata ja kiveä, ja sisään johtaa 19 '
        + 'metrin käytävä. Oven yläpuolella on kapea aukko, '
        + 'kattolaatikko. Talvipäivänseisauksen aamuna nouseva aurinko '
        + 'osuu siihen, ja valonjuova kulkee käytävää pitkin kammioon '
        + 'noin 17 minuutiksi. Sisään ei pääse ostamalla lippua: paikat '
        + 'arvotaan, ja kymmenistä tuhansista hakijoista valitaan '
        + 'kuusikymmentä vuodessa.',
      selite: 'Newgrangen sisäänkäynti: oven yläpuolella on '
        + 'kattolaatikon aukko, ja edessä makaa kierrekuvioitu '
        + 'porttikivi. Valkoinen kvartsiseinä on 1970-luvun '
        + 'ennallistus.',
      lahde: 'Marmontel, Wikimedia Commons (CC BY 2.0)',
      wiki: 'Newgrangen käytävähauta',
    },
  },
  PRT: {
    /*
     * Rajat EIVÄT ole tämän tiedoston omalla sivulla, vaan kahdesta
     * riippumattomasta määrittelystä, jotka molemmat nimeävät juuri
     * tämän tiedoston relief-versioksi samoille rajoille: en-wikin
     * Module:Location map/data/Portugal (image1) ja de-wikin
     * Vorlage:Positionskarte Portugal (relief). Perheen poliittinen
     * kuva `Portugal location map.svg` dokumentoi samat rajat ja 130 %
     * venytyksen. Kuvasuhde täsmää laskettuun 0,15 %:n tarkkuudella, ja
     * kahdeksan kontrollipistettä osui oikein. Sama tilanne kuin EGY.
     *
     * Kuvassa on VAIN MANNER-PORTUGALI eikä Espanjan tapaan laatikkoa:
     * Funchalia tai Ponta Delgadaa ei voi asemoida näillä rajoilla.
     */
    tiedosto: 'Reliefkarte Portugal.png',
    lahde: 'Tschubby, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 42.3, etela: 36.7, lansi: -9.8, ita: -6.0 },
    /*
     * Bragança eikä Braga: Braga menisi lähes päällekkäin Porton
     * kanssa, kun taas Bragança merkitsee koillisen vuoriston. Évora
     * on ainoa piste Tejon eteläpuolisella lakeudella.
     */
    kaupungit: [
      { nimi: 'Lissabon', lat: 38.707, lon: -9.136, paa: true },
      { nimi: 'Porto', lat: 41.162, lon: -8.622 },
      { nimi: 'Coimbra', lat: 40.211, lon: -8.429 },
      { nimi: 'Bragança', lat: 41.8, lon: -6.75 },
      { nimi: 'Évora', lat: 38.567, lon: -7.9 },
      { nimi: 'Faro', lat: 37.033, lon: -7.917 },
    ],
    // Intro päättyy siihen, että sisämaan vuorilla sataa lunta.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Vuori, jolla Portugali laskee mäkeä',
      tiedosto: 'Cântaros da Serra da Estrela.jpg',
      teksti: 'Kartan keskeltä nousee tumma harjanne, Serra da '
        + 'Estrela. Sen laella on Torre, Manner-Portugalin korkein '
        + 'kohta 1 993 metrissä, ja huipulle pääsee asfalttitietä '
        + 'pitkin. Täällä mitataan maan kylmimmät lämpötilat, pakkasta '
        + 'voi olla parikymmentä astetta, ja lunta riittää joulukuusta '
        + 'huhtikuuhun. Rinteessä toimii Portugalin ainoa '
        + 'hiihtokeskus: yhdeksän rinnettä, yhteensä kuutisen '
        + 'kilometriä. Jääkaudella vuoriston laella lepäsi jäätikkö, ja '
        + 'se kaiversi Zêzere-joelle laakson, jonka U-kirjaimen muoto '
        + 'on niin tarkka, että sitä käytetään oppikirjaesimerkkinä '
        + 'siitä, mitä jää tekee maisemalle.',
      selite: 'Cântaro-kalliot Serra da Estrelan luonnonpuistossa. '
        + 'Alarinteet ovat kesäkuussa keltaisenaan kukkivia pensaita.',
      lahde: 'Raquel Rosa, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Serra da Estrela',
    },
  },
  GRC: {
    /*
     * Moduulin oma image1. Vain 1003 px leveä, mutta pelin lehti
     * piirtää maakartan enintään noin 680 fyysisen pikselin levyisenä,
     * joten se riittää — sama peruste kuin EGY:n 1055 px:llä.
     *
     * ÄLÄ VAIHDA Tschubbyn `Reliefkarte Griechenland.png`:hen, vaikka
     * se on 2943 px ja rajat on dokumentoitu senkin sivulla: sen
     * merialueilla on ohuita tummia kaaria (hallintoalueiden
     * merirajoja), jotka näyttävät naarmuilta. Vertailtu 760 px:ssä
     * 8.8.2026 — tämä on siistimpi eikä sumene.
     */
    tiedosto: 'Greece relief location map.jpg',
    lahde: 'Lencer ja Uwe Dedering, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 42.0, etela: 34.6, lansi: 19.1, ita: 29.9 },
    /*
     * Rajaus vetää mukaan koko saariston: Kreetan eteläkärki on 34,8°
     * (raja 34,6) ja Rodos 28,2° (raja 29,9). Iraklion ja Rodos ovat
     * listalla, jotta kartalta näkee, kuinka kauas etelään ja itään
     * maa jatkuu meren yli. Nimet pelin arkimuodossa ilman aksentteja,
     * kuten muuallakin pelissä.
     */
    kaupungit: [
      { nimi: 'Ateena', lat: 37.967, lon: 23.717, paa: true },
      { nimi: 'Thessaloniki', lat: 40.65, lon: 22.9 },
      { nimi: 'Ioannina', lat: 39.667, lon: 20.85 },
      { nimi: 'Patras', lat: 38.25, lon: 21.733 },
      { nimi: 'Rodos', lat: 36.433, lon: 28.217 },
      { nimi: 'Iraklion', lat: 35.333, lon: 25.133 },
    ],
    // Intro päättyy Thessalian laidan kalliopylväisiin.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Luostarit nostettiin kalliolle korissa',
      tiedosto: 'Meteora, Greece (2016).jpg',
      teksti: 'Thessalian tasangon länsilaidalla maasta nousee '
        + 'kalliopylväitä: 24 suurta ja noin sata pienempää, '
        + 'keskimäärin 300 metriä korkeita, korkein 628. Ne ovat '
        + 'hiekkakiveä, jonka ympäriltä vesi ja maanjäristykset ovat '
        + 'kuluttaneet loput pois. Ensimmäiset erakot muuttivat '
        + 'pylväiden luoliin 1000-luvulla, ja 1300-luvulta alkaen '
        + 'laelle rakennettiin luostareita — enimmillään niitä oli yli '
        + 'kaksikymmentä. Portaita ei ollut: munkit ja kaikki '
        + 'rakennustarpeet nostettiin ylös pitkillä tikkailla tai '
        + 'vinssillä ja nostokorissa. Rappuset hakattiin kallioon vasta '
        + '1920-luvulla. Kuusi luostaria toimii yhä.',
      selite: 'Metéoran kalliopylväitä Thessaliassa. Kahden pylvään '
        + 'laella näkyy luostari, alhaalla mutkittelee tie ja takana '
        + 'kohoaa Píndos-vuoristo.',
      lahde: 'Vipers10687, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Metéora',
    },
  },
  TUR: {
    /*
     * Moduulin oma image1. Tiedostosivu ilmoittaa rajat itse ja sanoo
     * suoraan "Equirectangular projection, N/S stretching 120 %" —
     * samat luvut kuin moduulissa. Tschubbyn `Reliefkarte Türkei.png`
     * on isompi, mutta sen sivu ei dokumentoi koordinaatteja lainkaan.
     *
     * Kartta kattaa maan molemmilta mantereilta, ja Istanbul osuu
     * 18,2 %:n kohdalle — laudan kohde mahtuu hyvin.
     */
    tiedosto: 'Turkey relief location map.jpg',
    lahde: 'NordNordWest ja Uwe Dedering, Wikimedia Commons '
      + '(CC BY-SA 3.0)',
    rajat: { pohjoinen: 42.5, etela: 35.5, lansi: 25.4, ita: 45.0 },
    /*
     * Van on 91,7 %:n kohdalla eli tarkoituksella laidassa, kuten
     * Kirkkoniemi Norjassa: ilman sitä kartalta ei näkisi, kuinka
     * kauas itään maa jatkuu, eikä Vanjärveä huomaisi. İzmir
     * kirjoitetaan pelin muun sisällön tapaan ilman pistettä.
     */
    kaupungit: [
      { nimi: 'Ankara', lat: 39.927, lon: 32.864, paa: true },
      { nimi: 'Istanbul', lat: 41.013, lon: 28.976 },
      { nimi: 'Izmir', lat: 38.433, lon: 27.15 },
      { nimi: 'Antalya', lat: 36.9, lon: 30.683 },
      { nimi: 'Trabzon', lat: 41.0, lon: 39.733 },
      { nimi: 'Van', lat: 38.494, lon: 43.38 },
    ],
    // Intro päättyy kaakkoisrajan vuoren jättiläispatsaisiin.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kuninkaan pää putosi jumalten seurasta',
      tiedosto: 'Mount Nemrut sunrise.jpg',
      teksti: 'Kaakkois-Turkissa, Taurusvuorten itäpäässä, kohoaa '
        + 'Nemrut 2 150 metriin. Sen huipulle kuningas Antiokhos '
        + 'rakennutti vuonna 62 eaa. hautapyhäkön: kaksi terassia, '
        + 'itään ja länteen, ja niille rivi kahdeksan–yhdeksänmetrisiä '
        + 'istuvia patsaita. Ne esittävät kreikkalaisia ja '
        + 'persialaisia jumalia sekä kuningasta itseään, aivan yhtä '
        + 'suurena. Jossain vaiheessa patsailta katkottiin päät, eikä '
        + 'niitä ole nostettu takaisin: kivikasvot makaavat maassa '
        + 'omilla paikoillaan. Patsaiden takana kohoaa 49 metriä korkea '
        + 'kivikumpu, jonka sisään ei ole päästy — irtonainen sora '
        + 'valuu takaisin jokaiseen kaivantoon.',
      selite: 'Nemrutin huippu aamuauringossa: kivikummun juurella '
        + 'istuu rivi päättömiä jumalpatsaita, ja irronneet kivipäät '
        + 'on aseteltu niiden eteen.',
      lahde: 'Liselottediehl, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Nemrut (vuori)',
    },
  },
  HUN: {
    /*
     * Moduulin oma image1 ja SVG, joten se skaalautuu pelin pyytämään
     * kokoon pienestä kanvaasista (852 px) huolimatta.
     *
     * Rajat ovat yhden hypyn takana kuten Tanskalla ja Suomella:
     * tiedostosivu sanoo "parameters equal to
     * File:Hungary location map.svg", ja sen sivu ilmoittaa
     * N 48.8 / S 45.5 / W 15.7 / E 23.2 ja 140 %:n venytyksen. Nämä
     * ovat samat kuin moduulissa, ja pistetarkistus vahvisti ne.
     *
     * Oikeassa alakulmassa on korkeusselitelaatikko (kuten Tanskan
     * kartalla): älä vie pistettä alueelle x > 85 % ja y > 62 %.
     */
    tiedosto: 'Hungary physical map.svg',
    lahde: 'Urutseg, Wikimedia Commons (CC0)',
    rajat: { pohjoinen: 48.8, etela: 45.5, lansi: 15.7, ita: 23.2 },
    /*
     * Kuusi pistettä kartan kulmiin ja Budapest keskelle. Balaton jää
     * tarkoituksella merkitsemättä: se on kartalla iso sininen juova,
     * jonka lapsi löytää itse, eikä yksikään sen rantakaupunki ole
     * tunnettu.
     */
    kaupungit: [
      { nimi: 'Budapest', lat: 47.493, lon: 19.051, paa: true },
      { nimi: 'Győr', lat: 47.684, lon: 17.635 },
      { nimi: 'Miskolc', lat: 48.104, lon: 20.791 },
      { nimi: 'Debrecen', lat: 47.53, lon: 21.639 },
      { nimi: 'Szeged', lat: 46.254, lon: 20.146 },
      { nimi: 'Pécs', lat: 46.071, lon: 18.233 },
    ],
    // Intro päättyy idän ruohotasankoon ja sen kivisiltaan.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Yhdeksän kaaren silta keskellä ruohomerta',
      tiedosto: 'Hortobágy, 4071 Hungary - panoramio (1).jpg',
      teksti: 'Kartan itäpuoli on niin tasainen, ettei siellä näy '
        + 'yhtään kohoumaa. Siinä on Hortobágy, Euroopan laajin '
        + 'yhtenäinen ruohotasanko: kansallispuistoa on 800 '
        + 'neliökilometriä, ja Unescon listalle se otettiin ennen '
        + 'kaikkea paimenten takia. Laumoja on kaitsettu täällä yli '
        + 'neljätuhatta vuotta, ja harmaata karjaa vartioidaan yhä '
        + 'hevosen selästä. Tasangon maamerkkejä ovat vinttikaivot, '
        + 'joiden pitkät vipuvarret törröttävät taivasta vasten, ja '
        + 'Yhdeksänkaarinen silta: 167 metriä kiveä, valmiina 1833. '
        + 'Helteellä pustalla näkee kangastuksia, joissa puut '
        + 'näyttävät kelluvan ilmassa.',
      selite: 'Yhdeksänkaarinen kivisilta Hortobágyn pustalla: '
        + 'valkoinen kaide jatkuu kaaresta toiseen, alla kasvaa '
        + 'ruovikko ja ympärillä maa on tasaista joka suuntaan.',
      lahde: 'Michal Gorski, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Hortobágyn kansallispuisto',
    },
  },
  ROU: {
    tiedosto: 'Romania relief location map.svg',
    lahde: 'SANtosito ja OpenStreetMapin tekijät, Wikimedia Commons '
      + '(CC BY-SA 4.0)',
    // Moduuli ja tiedostosivu ilmoittavat samat rajat, ja moduuli on
    // yksinkertainen suorakaide ilman kaavaa.
    rajat: { pohjoinen: 48.5, etela: 43.4, lansi: 20.0, ita: 30.0 },
    /*
     * Tulcea eikä Constanța: Tonavan suisto on kartan selvin
     * yksittäinen muoto, ja kaupungit ovat vain 90 km:n päässä
     * toisistaan eli menisivät päällekkäin. Brașov osuu Karpaattien
     * mutkaan, kartan ruskeimpaan kohtaan.
     */
    kaupungit: [
      { nimi: 'Bukarest', lat: 44.433, lon: 26.104, paa: true },
      { nimi: 'Cluj-Napoca', lat: 46.767, lon: 23.583 },
      { nimi: 'Brașov', lat: 45.642, lon: 25.589 },
      { nimi: 'Timișoara', lat: 45.749, lon: 21.227 },
      { nimi: 'Iași', lat: 47.162, lon: 27.589 },
      { nimi: 'Tulcea', lat: 45.19, lon: 28.8 },
    ],
    // Intro päättyy siihen, että Tonava puhkaisee vuoret lounaassa.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kivikasvot vartioivat Tonavan solaa',
      tiedosto: 'Rock sculpture of Decebalus5.jpg',
      teksti: 'Romanian lounaisnurkassa Tonava kaivautuu Karpaattien '
        + 'ja Balkanvuorten väliin. Solaa sanotaan Rautaportiksi, ja '
        + 'se on 134 kilometriä pitkä. Ahtain kohta on Suuri Kazan: '
        + 'joki kapenee 150 metriin ja on paikoin 53 metriä syvä. '
        + 'Vuonna 1972 valmistui Rautaportti I -pato. Se nosti veden '
        + 'pintaa padon lähellä 35 metriä, ja veden alle jäivät vanha '
        + 'Orșovan kaupunki, viisi kylää ja Ada Kalehin saari, jolla '
        + 'oli oma turkkilainen yhteisönsä ja moskeija. Kaikkiaan 17 '
        + '000 ihmistä joutui muuttamaan. Vuosina 1994–2004 sola sai '
        + 'uuden vartijan: kallioon hakattiin daakialaisten viimeisen '
        + 'kuninkaan Decebaluksen kasvot, jotka ovat yli neljäkymmentä '
        + 'metriä korkeat.',
      selite: 'Decebaluksen kasvot hakattuna kalliojyrkänteeseen '
        + 'Tonavan yläpuolella; leuan alla lukee latinaksi '
        + '"DECEBALUS REX".',
      lahde: 'Sadko, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Rautaportti',
    },
  },
  BGR: {
    tiedosto: 'Relief Map of Bulgaria.jpg',
    lahde: 'NordNordWest ja Viktor V, Wikimedia Commons (CC BY-SA 3.0)',
    // Tiedostosivu: "Equirectangular projection, N/S stretching
    // 130 %", samat luvut kuin moduulissa.
    rajat: { pohjoinen: 44.4, etela: 41.1, lansi: 22.1, ita: 28.9 },
    /*
     * Kaksi rannikkokaupunkia (Varna ja Burgas) siksi, että vasta
     * niiden väli paljastaa rantaviivan mutkan. Smoljan on ainoa
     * piste kartan eteläisessä vuoristossa, noin tuhannessa metrissä.
     */
    kaupungit: [
      { nimi: 'Sofia', lat: 42.7, lon: 23.333, paa: true },
      { nimi: 'Ruse', lat: 43.856, lon: 25.971 },
      { nimi: 'Varna', lat: 43.217, lon: 27.917 },
      { nimi: 'Burgas', lat: 42.495, lon: 27.472 },
      { nimi: 'Plovdiv', lat: 42.15, lon: 24.75 },
      { nimi: 'Smoljan', lat: 41.583, lon: 24.7 },
    ],
    // Intro päättyy koilliseen, jossa tasangolta nousee yksi kallio.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Ratsastaja, joka päätyi eurokolikkoon',
      // Rivi on tarkoituksella yli mitan: peilaustyökalu lukee vain
      // ensimmäisen palan, joten nimeä ei saa katkaista (tests/media).
      tiedosto: 'Caballero de Madara, reserva histórico-arqueológica Nacional de Madara, Bulgaria, 2016-05-27, DD 39.jpg',
      teksti: 'Šumenin lähellä Koillis-Bulgariassa kohoaa lähes '
        + 'pystysuora, satametrinen kalliojyrkänne. Sen kylkeen on '
        + 'hakattu ratsastaja 23 metriä maanpinnan yläpuolelle. Kuva '
        + 'on lähes luonnollisen kokoinen: ratsastaja työntää '
        + 'keihäänsä hevosen jalkoihin kaatuneeseen leijonaan, ja '
        + 'perässä juoksee koira. Reliefi tehtiin todennäköisesti '
        + '700-luvun alussa. Sen ympärille on kaiverrettu kolme '
        + 'kreikankielistä tekstiä, joissa mainitaan kaanit Tervel, '
        + 'Krum ja Omurtag — ne kertovat Bulgarian varhaisimmista '
        + 'vuosikymmenistä. Sää on kuluttanut yksityiskohtia, joten '
        + 'ratsastajan vaatteet erottuvat huonosti. Kun Bulgaria otti '
        + 'euron käyttöön, ratsastaja päätyi sentin kolikoihin.',
      selite: 'Madaran ratsastaja kalliopinnassa: hevonen keskellä, '
        + 'ratsastaja sen selässä, koira vasemmalla alhaalla ja '
        + 'kaatunut leijona hevosen jalkojen alla.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Madaran ratsastaja',
    },
  },
  HRV: {
    /*
     * Pelin pienin kartta (731 px), mutta lehti piirtää maakartan
     * enintään noin 680 fyysisen pikselin levyisenä, joten se riittää.
     *
     * ÄLÄ VAIHDA `Relief map of Croatia.png`:hen, vaikka se on 1888 px,
     * kauniimpi, rajat on dokumentoitu sen omalla sivulla ja Wikipedian
     * moduuli listaa sen image2:ksi. Se on WORLD MERCATOR, ei
     * tasavälinen. Pelin prosenttikaava heittää sillä jopa 1 % kuvan
     * korkeudesta (~5 km) keskileveysasteilla — nolla reunoilla,
     * maksimi keskellä, eli juuri siellä missä maan pisteet ovat.
     * Poikkeama on mitattu, ei arvattu: kuvan merimaski ristikorreloitiin
     * tasavälistä sijaintikarttaa vasten kaistaleittain.
     */
    tiedosto: 'Croatia relief map.png',
    lahde: 'Nzeemin, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 46.8, etela: 42.1, lansi: 13.1, ita: 19.9 },
    /*
     * Koordinaatit ovat poikkeuksellisesti englanninkielisestä
     * Wikipediasta: suomenkielisessä ne on pyöristetty
     * kaariminuutteihin, mikä heittäisi tällä rajauksella noin 1,5 km.
     *
     * Dubrovnik on 88,5 %:n kohdalla eli lähes kartan alalaidassa —
     * juuri siksi se on listalla: se on erillään muusta maasta Bosnian
     * merikaistaleen takana, ja se on pelilaudan kohde.
     */
    kaupungit: [
      { nimi: 'Zagreb', lat: 45.813, lon: 15.978, paa: true },
      { nimi: 'Rijeka', lat: 45.327, lon: 14.441 },
      { nimi: 'Zadar', lat: 44.114, lon: 15.228 },
      { nimi: 'Split', lat: 43.508, lon: 16.44 },
      { nimi: 'Dubrovnik', lat: 42.64, lon: 18.108 },
      { nimi: 'Osijek', lat: 45.556, lon: 18.694 },
    ],
    // Intro päättyy kartan outoon aukkoon etelässä.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Silta, joka kiertää toisen maan',
      tiedosto: 'Pelješac Bridge 1.jpg',
      teksti: 'Kroatian kartalla on outo aukko: etelässä Bosnia ja '
        + 'Hertsegovinalle kuuluva noin 20 kilometrin merikaistale '
        + 'katkaisee maan kahtia. Dubrovnikiin ajava joutui '
        + 'ylittämään rajan kahdesti kahdenkymmenen kilometrin '
        + 'matkalla. Vuonna 2022 aukko kierrettiin merta pitkin: '
        + 'Pelješacin silta vietiin mantereelta niemimaalle Mali '
        + 'Stonin lahden yli. Silta on 2 404 metriä pitkä, ja sen '
        + 'alta mahtuu 55 metriä korkea laiva. Keskellä on viisi 285 '
        + 'metrin jännettä, joita köysipylonit kannattavat. '
        + 'Rakentaminen kesti neljä vuotta ja maksoi noin 420 '
        + 'miljoonaa euroa. Ensimmäisenä elokuunaan silta kantoi noin '
        + '455 000 autoa.',
      selite: 'Pelješacin silta kaartaa Mali Stonin lahden yli; '
        + 'köysipylonit kannattavat viittä 285 metrin jännettä, ja '
        + 'taustalla nousevat karstivuoret.',
      lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Pelješacin silta',
    },
  },
  BIH: {
    /*
     * SVG, joten se skaalautuu pelin pyytämään kokoon pienestä
     * kanvaasista (1063 px) huolimatta. Tiedostosivu ilmoittaa rajat
     * itse: "Equirectangular projection, N/S stretching 140 %", samat
     * luvut kuin moduulissa.
     *
     * Sama Mercator-varoitus kuin Kroatialla: `Relief map of Bosnia
     * and Herzegovina.png` on isompi ja rajat on dokumentoitu, mutta
     * se on World Mercator eikä kelpaa.
     */
    tiedosto: 'Bosnia and Herzegovina relief location map.svg',
    lahde: 'DzWiki ja NordNordWest, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 45.4, etela: 42.4, lansi: 15.5, ita: 19.9 },
    /*
     * Neum on listalla, koska se on maan ainoa merenrantakaupunki:
     * piste osuu tarkalleen siihen kohtaan, jossa vuoristomaa
     * koskettaa Adriaa. Bihać näyttää läntisen nokan, joka työntyy
     * syvälle Kroatian sisään.
     */
    kaupungit: [
      { nimi: 'Sarajevo', lat: 43.856, lon: 18.413, paa: true },
      { nimi: 'Banja Luka', lat: 44.773, lon: 17.193 },
      { nimi: 'Tuzla', lat: 44.538, lon: 18.677 },
      { nimi: 'Bihać', lat: 44.815, lon: 15.869 },
      { nimi: 'Mostar', lat: 43.344, lon: 17.808 },
      { nimi: 'Neum', lat: 42.925, lon: 17.617 },
    ],
    // Intro päättyy kaakon vuoriin, joihin ei ole menty kirveen kanssa.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Metsä, jossa puut saavat kaatua itse',
      tiedosto: 'Np sutjeska prasuma perucica vodopad skakavac.JPG',
      teksti: 'Kartan kaakkoiskulmassa, Montenegron rajalla, kasvaa '
        + 'Perućica, yksi Euroopan viimeisistä aarniometsistä. Siellä '
        + 'ei ole koskaan hakattu puuta, ja alue rauhoitettiin '
        + 'tiukasti jo vuonna 1952. Metsä täyttää noin 1 434 hehtaarin '
        + 'laakson, joka nousee 578 metristä maan korkeimmalle '
        + 'huipulle Maglićille, 2 386 metriin. Puu- ja pensaslajeja on '
        + 'yli 170 ja muita kasveja yli tuhat. Korkein mitattu kuusi '
        + 'oli 57,4 metriä, ja moni puu on noin kolmesataa vuotta '
        + 'vanha. Nisäkäslajeja on 36, muun muassa karhu, susi ja '
        + 'gemssi. Laakson pohjalla putoaa Skakavacin vesiputous noin '
        + '75 metriä.',
      selite: 'Perućican aarniometsä täyttää koko laakson pohjasta '
        + 'harjanteille asti, ja keskellä erottuu ohuena valkoisena '
        + 'juovana Skakavacin vesiputous.',
      lahde: 'Darko Gavric, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Perućica',
    },
  },
  UKR: {
    tiedosto: 'Reliefkarte Ukraine 2022.png',
    lahde: 'Tschubby, Wikimedia Commons (CC BY-SA 3.0)',
    // Moduuli on yksinkertainen suorakaide ilman kaavaa, ja kuvasuhde
    // vahvistaa rajat 0,7 %:n tarkkuudella.
    rajat: { pohjoinen: 52.7, etela: 44.1, lansi: 21.5, ita: 40.7 },
    /*
     * Mukatševo eikä Užhorod: molemmat ovat Karpaattien toisella
     * puolella ja kertovat saman asian, mutta Užhorod osuisi 4,1 %:n
     * kohdalle, jossa nimilappu leikkautuisi. Ilman kumpaakaan
     * kartalta ei näkisi, että lännessä on vuorten yli menevä kolkka.
     */
    kaupungit: [
      { nimi: 'Kiova', lat: 50.45, lon: 30.523, paa: true },
      { nimi: 'Lviv', lat: 49.843, lon: 24.027 },
      { nimi: 'Mukatševo', lat: 48.439, lon: 22.717 },
      { nimi: 'Harkova', lat: 49.992, lon: 36.231 },
      { nimi: 'Dnipro', lat: 48.468, lon: 35.04 },
      { nimi: 'Odessa', lat: 46.483, lon: 30.733 },
    ],
    // Intro päättyy läntiseen jokeen, joka kiertää kalliosaaren.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kaupunki kalliosaarella kanjonin pohjalla',
      // Sama kuin Bulgarialla: nimeä ei saa katkaista kahdelle riville.
      tiedosto: 'Вид с Армянского бастиона на Каменец-Подольскую крепость - panoramio.jpg',
      teksti: 'Ukrainan lännessä Smotrytš-joki tekee melkein täyden '
        + 'lenkin ja jättää keskelle kalliosaaren. Sen päällä on '
        + 'Kamjanets-Podilskyin vanhakaupunki, ja saarta kiertää '
        + 'kanjoni, jonka seinämät ovat paikoin viisikymmentä metriä '
        + 'korkeat. Kallio on kalkkikiveä, joka syntyi yli 400 '
        + 'miljoonaa vuotta sitten matalan meren pohjalle — '
        + 'seinämistä löytyy vieläkin muinaisten merieläinten '
        + 'jäänteitä. Kannaksen kohdalle, missä lenkki melkein '
        + 'sulkeutuu, rakennettiin linna, ja siitä johtaa '
        + 'vanhaankaupunkiin silta rotkon yli. Kaupungissa asuu noin '
        + '98 000 ihmistä, ja kanjoni on suojeltu geologisena '
        + 'luonnonmuistomerkkinä.',
      selite: 'Näkymä Armenialaiselta bastionilta linnoitukseen: '
        + 'kallio putoaa pystysuorana kanjoniin, ja Linnansilta '
        + 'johtaa kaupunkiin.',
      lahde: 'Сергей Марцынюк, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Kamjanets-Podilskyi',
    },
  },
  RUS: {
    /*
     * PELIN AINOA KARTTA, JOKA EI OLE TASAVÄLINEN. Lue tämä ennen kuin
     * kosket mihinkään.
     *
     * Venäjälle ei yksinkertaisesti ole olemassa tasavälistä
     * korkokarttaa, joka toimisi pelissä. Kaikki 106 Wikipedian
     * Module:Location map/data/Russia* -moduulia käytiin läpi
     * 8.8.2026:
     *  - Koko Venäjän ainoa dokumentoitu tasavälinen kartta on
     *    poliittinen, ei korkokartta, ja se ulottuu Itämereltä
     *    Beringinsalmelle. Sillä Moskova asettuisi 10,5 %:n ja Pietari
     *    6,25 %:n kohdalle — kaksi täplää vasemmassa reunassa ja 89 %
     *    kuvasta tyhjää Siperiaa. Lisäksi kuva ylittää 180.
     *    pituuspiirin, mitä prosenttikaava ei osaa käsitellä.
     *  - Koko Venäjän korkokartat ovat joko kartiokuvausta tai ilman
     *    dokumentoituja rajoja.
     *  - Euroopan-puoleisen Venäjän korkokartat ovat kaikki LAEA.
     * Siksi tämä on laea, ja siksi karttapiste()-funktiossa on haara.
     * Fablen päätös 8.8.2026.
     *
     * Kuva on 1181 px ja PYSTYMALLINEN (0,76) toisin kuin muut pelin
     * maakartat. Isompaa ei ole: kaikki laea-relief-variantit ovat
     * samankokoisia tai pienempiä.
     */
    tiedosto: 'European Russia laea relief location map.jpg',
    lahde: 'Uwe Dedering, Wikimedia Commons (CC BY-SA 3.0)',
    projektio: 'laea',
    /*
     * Projektiokeskus on tiedostosivulla (57,5 °N / 42,5 °E).
     * Kertoimet ja siirrot on mitattu kuvasta: ne muuntavat
     * projektion yksiköt prosenteiksi kuvan reunoista. Tiedostosivun
     * "Area of interest" EI ole kuvan reuna, joten rajat-kenttää ei
     * voi täyttää.
     */
    laea: {
      keskiLat: 57.5,
      keskiLon: 42.5,
      xKerroin: 213.4825,
      xSiirto: 50,
      yKerroin: 161.4897,
      ySiirto: 50.8673,
    },
    /*
     * Moskova ja Pietari ovat pakollisia — ne ovat pelilaudan kohteet.
     * Muut neljä on valittu näyttämään, kuinka valtava tasanko on:
     * Murmansk napapiirin pohjoispuolella, Jekaterinburg Uralin
     * takana, Sotši Kaukasuksen juurella ja Nižni Novgorod Volgan ja
     * Okan yhtymäkohdassa.
     */
    kaupungit: [
      { nimi: 'Moskova', lat: 55.756, lon: 37.618, paa: true },
      { nimi: 'Pietari', lat: 59.938, lon: 30.309 },
      { nimi: 'Murmansk', lat: 68.969, lon: 33.079 },
      { nimi: 'Nižni Novgorod', lat: 56.327, lon: 44.008 },
      { nimi: 'Jekaterinburg', lat: 56.836, lon: 60.613 },
      { nimi: 'Sotši', lat: 43.596, lon: 39.727 },
    ],
    // Intro päättyy luoteeseen, jossa järven saarella seisoo puukirkko.
    // Kuva silmätarkistettu 480 ja 900 px:ssä 8.8.2026.
    nosto: {
      otsikko: 'Kaksikymmentäkaksi kupolia ilman naulaa',
      tiedosto: 'Kizhi TransfigurationChurch 007 7869c.jpg',
      teksti: 'Äänisen saarella Karjalassa seisoo puukirkko, jonka '
        + 'alttari vihittiin kesäkuussa 1714. Kirkastuksen kirkossa on '
        + '22 sipulikupolia kolmessa kerroksessa, ja se on 37 metriä '
        + 'korkea — yhtä korkea kuin kymmenkerroksinen talo — mutta '
        + 'koko rakennus on tehty hirsistä kirveellä. Pohja on 20 '
        + 'kertaa 29 metriä ja hirret noin 30 senttiä paksua mäntyä. '
        + 'Seinissä ei ole ainuttakaan naulaa: hirret on veistetty '
        + 'lomittain nurkkasalvoksiin. Kupolit sen sijaan on katettu '
        + 'haapapaanuilla, ja niitä pitää paikoillaan noin 60 000 '
        + 'paanua ja 180 000 naulaa. Tarina kertoo, että pääkirvesmies '
        + 'teki koko kirkon yhdellä kirveellä ja heitti sen lopuksi '
        + 'järveen.',
      selite: 'Kirkastuksen kirkko Kižin saarella: 22 kupolia, kaikki '
        + 'katettu käsin veistetyillä haapapaanuilla.',
      lahde: 'Ludvig14, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Kiži',
    },
  },
};

/*
 * Kaupunkisivun lopun kohdekartta (omistajan toive 7.8.2026: "kuin
 * huvipuiston kartassa" — mahdollisimman yksinkertainen pohja ja
 * muutama kuuluisa kohde, joista osa avaa artikkelin). Sama
 * sijaintikarttaperhe ja prosenttiasemointi kuin MAAKARTAT-taulussa.
 * Kohteen wiki on tarkistettu fi.wikipedian artikkeli; ilman wikiä
 * piste on pelkkä merkki. nimiVasen kääntää nimen pisteen
 * vasemmalle puolelle, kun oikealla olisi ahdasta.
 */
export const KAUPUNKIKARTAT = {
  istanbul: {
    polku: 'assets/kartat/istanbul-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 41.0335, etela: 40.9975, lansi: 28.958, ita: 29.024 },
    esittely: 'Istanbul seisoo kahden meren välisessä kapeikossa. '
      + 'Bosporinsalmi yhdistää Mustanmeren ja Marmaranmeren ja '
      + 'erottaa samalla Euroopan Aasiasta, joten kaupunki on kahdessa '
      + 'maanosassa yhtä aikaa. Kreikkalaiset merenkulkijat perustivat '
      + 'tänne Byzantionin noin 2 700 vuotta sitten, ja paikka '
      + 'valittiin veden takia: salmen länsipuolelle työntyy niemi, '
      + 'jolla on vettä kolmella sivulla, ja niemen pohjoispuolella on '
      + 'syvä, tyyni lahti. Lahti on Kultainen sarvi, luonnonsatama, '
      + 'jonne laivat pääsevät myrskyltä suojaan. Vanhakaupunki '
      + 'rakennettiin juuri sille niemelle.\n\nKartalla niemi on '
      + 'vasemmalla alhaalla. Sen pohjoispuolella kaartaa Kultainen '
      + 'sarvi, jonka yli vie Galatan silta, pituudeltaan noin puoli '
      + 'kilometriä. Lahden takana kohoaa mäki ja sen laella Galatan '
      + 'torni. Oikealla levittäytyy Bosporinsalmi: kartan kohdalla se '
      + 'on noin kaksi kilometriä leveä, ja sen takana alkaa Aasian '
      + 'puoli, jonne pääsee lautalla Üsküdariin. Vedessä näkyy pieni '
      + 'valkoinen täplä, luodolle rakennettu Neitsyttorni. Salmen ali '
      + 'kulkee vuodesta 2013 myös junatunneli. Kartan kohteista '
      + 'pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Suuresta basaarista ei ole suomenkielistä artikkelia; se jää
       * merkiksi. Sen katetut kujat piirtyvät kartalle tunnistettavana
       * ruudukkona, joten piste osuu johonkin mikä oikeasti näkyy.
       *
       * Topkapın koordinaatti on PALATSIN KESKIPISTE eikä pääportti.
       * Portti olisi 9,5 prosenttiyksikköä Hagia Sofiasta eli numerot
       * menisivät päällekkäin; keskipiste on 13,4 ja osuu puutarhoihin,
       * jotka näkyvät kartalla. Älä siirrä sitä alaspäin.
       *
       * Yerebatan ja hippodromin obeliski ovat lehden nostoja ja
       * rajauksen sisällä, mutta 3,2 ja 2,7 prosenttiyksikön päässä
       * Hagia Sofiasta ja Sinisestä moskeijasta — kirjaimellisesti
       * naapuritontteja, joten ne eivät voi olla omia numeroitaan.
       */
      { nimi: 'Suuri basaari', lat: 41.011, lon: 28.9683 },
      { nimi: 'Sininen moskeija', lat: 41.0054, lon: 28.9768, wiki: 'Sulttaani Ahmedin moskeija' },
      { nimi: 'Hagia Sofia', lat: 41.0085, lon: 28.98, wiki: 'Hagia Sofia' },
      { nimi: 'Topkapın palatsi', lat: 41.0128, lon: 28.984, wiki: 'Topkapın palatsi' },
      { nimi: 'Galatan torni', lat: 41.0256, lon: 28.9742, wiki: 'Galatan torni' },
      { nimi: 'Üsküdar', lat: 41.0254, lon: 29.0156, wiki: 'Üsküdar' },
    ],
  },
  lissabon: {
    polku: 'assets/kartat/lissabon-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 38.7265, etela: 38.7035, lansi: -9.1505, ita: -9.118 },
    esittely: 'Lissabon seisoo kukkuloilla Tejo-joen pohjoisrannalla. '
      + 'Tejo on Iberian niemimaan pisin joki, ja Lissabonin kohdalla '
      + 'se on jo melkein meri: Kauppatorilta vastarannalle on runsaat '
      + 'kaksi kilometriä. Juuri siksi kaupunki on tässä. Laivat '
      + 'pääsivät leveään ja suojaisaan satamaan, mutta avomerelle oli '
      + 'vain noin viisitoista kilometriä. Kukkuloilta näki tulijat '
      + 'kaukaa, ja jyrkkää rinnettä oli helppo puolustaa: roomalaiset, '
      + 'maurit ja portugalilaiset rakensivat linnansa kaikki samalle '
      + 'kukkulalle.\n\nKartan alalaidassa kaartaa Tejo. Keskellä on '
      + 'suora ruudukko, noin 800 metriä leveä: se on Baixa eli '
      + 'alakaupunki. Vanha keskusta romahti maanjäristyksessä 1. '
      + 'marraskuuta 1755, ja tilalle vedettiin viivoittimella uudet '
      + 'kadut. Ruudukon molemmin puolin kadut menevät solmuun ja '
      + 'kiipeävät ylös: oikealla Alfama linnankukkulalla, vasemmalla '
      + 'Bairro Alto. Ruudukon yläkulmasta lähtee vinosti leveä '
      + 'puistokatu Avenida da Liberdade. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Glórian köysiradasta ja kansallispanteonista ei ole
       * suomenkielisiä artikkeleita; molemmat jäävät merkeiksi.
       *
       * Karmeliittiluostari on lehden maanjäristysnoston kohde ja
       * olisi ollut vahva ehdokas, mutta se on 183 metriä Rossiosta
       * eli numerot olisivat menneet päällekkäin. Rossio voitti,
       * koska siitä on artikkeli.
       */
      { nimi: 'Glórian köysirata', lat: 38.7152, lon: -9.1433 },
      { nimi: 'Rossio', lat: 38.7138, lon: -9.1393, wiki: 'Rossio' },
      { nimi: 'São Jorgen linna', lat: 38.7139, lon: -9.1335, wiki: 'Castelo de São Jorge' },
      { nimi: 'Tuomiokirkko', lat: 38.7098, lon: -9.1326, wiki: 'Lissabonin tuomiokirkko' },
      { nimi: 'Kauppatori', lat: 38.7076, lon: -9.1365, wiki: 'Praça do Comércio' },
      { nimi: 'Kansallispanteoni', lat: 38.715, lon: -9.1247 },
    ],
  },
  barcelona: {
    polku: 'assets/kartat/barcelona-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 41.4085, etela: 41.37, lansi: 2.147, ita: 2.1984 },
    esittely: 'Barcelona on rakennettu kapealle tasangolle meren ja '
      + 'vuorten väliin. Selän takana kohoaa Collserolan metsäinen '
      + 'harjanne, ja tasangon molemmissa reunoissa virtaa joki: '
      + 'lännessä Llobregat, idässä Besòs. Sataman vieressä on vielä '
      + 'yksi mäki, Montjuïc, jonka itäreuna putoaa lähes '
      + 'pystysuorana alas. Roomalaiset perustivat Barcinon pienelle '
      + 'kummulle, joka on vain noin seitsemäntoista metriä korkea. '
      + 'Kummun päällä seisoo nyt katedraali, ja kaupunki pysyi sen '
      + 'ympärillä muurien sisässä aina 1850-luvulle asti.\n\nKartan '
      + 'yläosa on pelkkää ruudukkoa. Se on Eixample, joka piirrettiin '
      + 'tyhjälle kentälle, kun muurit purettiin: korttelit ovat 113 '
      + 'metriä sivultaan ja joka kulmasta on leikattu 20 metrin '
      + 'viiste. Ruudukon poikki viistää kaksi leveää katua, ja aivan '
      + 'sen sisällä seisoo Sagrada Família. Keskellä ruudukko loppuu '
      + 'kuin veitsellä katkaistuna, ja alkaa vanhankaupungin sokkelo '
      + '— siinä kulki muuri. Alhaalla oikealla on satama ja meri. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Boquerian kauppahallista ja Kolumbuksen patsaasta ei ole
       * suomenkielisiä artikkeleita.
       *
       * Nimi on 'Arc de Triomf' eikä Riemukaari: Pariisin kartalla on
       * jo Riemukaari, ja kaksi samannimistä kohdetta eri kaupungeissa
       * sekoittaisi selitelistan.
       */
      { nimi: 'Sagrada Família', lat: 41.4035, lon: 2.1743, wiki: 'Sagrada Família' },
      { nimi: 'Casa Batlló', lat: 41.3915, lon: 2.1648, wiki: 'Casa Batlló' },
      { nimi: 'Arc de Triomf', lat: 41.391, lon: 2.1806, wiki: 'Arc de Triomf' },
      { nimi: 'Musiikkipalatsi', lat: 41.3876, lon: 2.1752, wiki: 'Palau de la Música Catalana' },
      { nimi: 'Boquerian kauppahalli', lat: 41.3817, lon: 2.1716 },
      { nimi: 'Kolumbuksen patsas', lat: 41.3758, lon: 2.1778 },
    ],
  },
  granada: {
    polku: 'assets/kartat/granada-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 37.1875, etela: 37.1675, lansi: -3.6045, ita: -3.5795 },
    esittely: 'Granada on Sierra Nevadan juurella noin 740 metrin '
      + 'korkeudessa. Kaupunki syntyi kohtaan, jossa kaksi jokea '
      + 'yhtyy: pieni Darro tulee vuorilta idästä ja laskee Geniliin, '
      + 'joka jatkaa lännen viljavalle tasangolle. Vuoret ovat '
      + 'kaupungin vesisäiliö. Ylimmillä huipuilla on lunta vielä '
      + 'toukokuussa, lumi sulaa hitaasti, ja sulamisvesi johdettiin '
      + 'kanavia pitkin pelloille, suihkulähteisiin ja puutarhoihin. '
      + 'Darron molemmin puolin nousee kaksi kukkulaa vastakkain: '
      + 'toisella on Alhambra, toisella Albaicínin valkoinen '
      + 'kaupunginosa.\n\nKartalla Darro tulee oikealta vinosti alas. '
      + 'Vanhankaupungin kohdalla se katoaa: joki katettiin 1800-luvun '
      + 'lopulla kadun alle, ja vesiviiva jatkuu talojen alitse '
      + 'Geniliin, joka kulkee kuvan alalaidassa. Oikealla '
      + 'levittäytyy metsäinen Alhambran kukkula ja sen laella '
      + 'palatsin rakennusrykelmä; alue on 142 000 neliömetriä. '
      + 'Vastapäätä ylhäällä kiemurtelee Albaicínin kujaverkko '
      + 'rinnettä ylös. Vasemmalla maa tasoittuu, ja siellä seisoo '
      + 'katedraali. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Sacromonten luolista ja Granadan katedraalista ei ole
       * suomenkielisiä artikkeleita.
       *
       * Manuel de Fallan talon wiki osoittaa säveltäjään eikä taloon,
       * koska talosta ei ole omaa artikkelia — sama ratkaisu kuin
       * Wienin jättirattaalla, joka linkittää Prateriin.
       */
      { nimi: 'Sacromonten luolat', lat: 37.1831, lon: -3.5843 },
      { nimi: 'Albaicínin näköalapaikka', lat: 37.181, lon: -3.5927, wiki: 'Albayzín' },
      { nimi: 'Generalife', lat: 37.1769, lon: -3.5851, wiki: 'Generalife' },
      { nimi: 'Granadan katedraali', lat: 37.1765, lon: -3.5992 },
      { nimi: 'Alhambra', lat: 37.1761, lon: -3.589, wiki: 'Alhambra' },
      { nimi: 'Manuel de Fallan talo', lat: 37.1734, lon: -3.5888, wiki: 'Manuel de Falla' },
    ],
  },
  edinburgh: {
    polku: 'assets/kartat/edinburgh-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 55.9615, etela: 55.9415, lansi: -3.214, ita: -3.162 },
    esittely: 'Edinburgh seisoo sammuneen tulivuoren päällä. Kallio '
      + 'jähmettyi noin 350 miljoonaa vuotta sitten niin kovaksi, '
      + 'ettei jäätikkö jaksanut kuluttaa sitä: jää kiersi kallion ja '
      + 'kaivoi maan sen molemmilta puolilta, mutta taakse jäi pitkä '
      + 'loiva rinne. Kallion laelle rakennettiin linna ja rinteelle '
      + 'kaupunki, kapealle harjanteelle, jonne pääsi vain yhtä '
      + 'tietä.\n\nKartalla näkyy kaksi kaupunkia vierekkäin. '
      + 'Alaosassa kulkee vanhankaupungin harjanne: yksi katu linnalta '
      + 'Holyroodin palatsille, vajaat kaksi kilometriä, ja sen '
      + 'molemmin puolin kapeita kujia kuin kalanruotoja. Yläosassa on '
      + 'Uusikaupunki, jonka suorat kadut ja aukiot muodostavat '
      + 'ruudukon. Sitä alettiin rakentaa vuonna 1767, kun vanha '
      + 'harjanne oli tullut täyteen. Kaupunkien välissä on vihreä '
      + 'notko. Siellä oli ennen tekojärvi nimeltä Nor Loch; se '
      + 'laskettiin kuiviin 1700-luvun lopulla, ja nyt notkossa on '
      + 'puisto ja rautatie. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Charlotte Squaresta ei ole suomenkielistä artikkelia, joten se
       * jää pelkäksi merkiksi. Se on silti listalla, koska se on ainoa
       * piste Uudenkaupungin ruutukaavan puolella — ilman sitä kartan
       * juoni jäisi kertomatta selitelistassa.
       */
      { nimi: 'Charlotte Square', lat: 55.9514, lon: -3.2086 },
      { nimi: 'Edinburghin linna', lat: 55.9487, lon: -3.2004, wiki: 'Edinburghin linna' },
      { nimi: 'St Gilesin katedraali', lat: 55.9495, lon: -3.1909, wiki: 'St Gilesin katedraali' },
      { nimi: 'Greyfriars Bobby', lat: 55.9469, lon: -3.1913, wiki: 'Greyfriars Bobby' },
      { nimi: 'Calton Hill', lat: 55.9553, lon: -3.1828, wiki: 'Calton Hill' },
      { nimi: 'Holyroodin palatsi', lat: 55.9527, lon: -3.1716, wiki: 'Holyroodin palatsi' },
    ],
  },
  marseille: {
    polku: 'assets/kartat/marseille-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 43.3065, etela: 43.2765, lansi: 5.345, ita: 5.393 },
    esittely: 'Marseille on rakennettu valkoisten kalkkikivikukkuloiden '
      + 'muodostamaan kulhoon, joka aukeaa länteen merelle. Kulhon '
      + 'pohjassa on kapea luonnonpoukama, noin kilometrin mittainen '
      + 'halkeama rannassa. Poukama on suojassa mistraalilta, '
      + 'kylmältä tuulelta, joka syöksyy tänne luoteesta. Juuri siksi '
      + 'kreikkalaiset purjehtijat pysähtyivät tähän noin 600 eaa. ja '
      + 'perustivat Massalian. Makeaa vettä kukkuloilla ei sen sijaan '
      + 'ollut juuri lainkaan: lopulta se tuotiin 80 kilometrin päästä '
      + 'kanavaa pitkin, ja kanava valmistui vuonna 1849.\n\nKartan '
      + 'keskellä on tuo poukama, Vanhasatama. Vesiallas on noin 900 '
      + 'metriä pitkä ja 400 metriä leveä, ja sitä reunustaa laituri '
      + 'kolmelta sivulta. Nykyään siinä on huviveneitä, ei '
      + 'rahtilaivoja: isot laivat siirtyivät pohjoisempiin '
      + 'satama-altaisiin 1800-luvun puolivälissä. Pohjoispuolella '
      + 'kohoaa kukkulalle vanha kaupunginosa Le Panier, ja etelässä '
      + 'nousee 149 metriä korkea kalliokieleke, jonka laella on '
      + 'Notre-Dame de la Garde. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /*
       * Saint-Victorin kirkosta ja Saint-Charlesin asemasta ei ole
       * suomenkielisiä artikkeleita; molemmat jäävät merkeiksi.
       *
       * Vanhasataman koordinaatti on ALTAAN KESKELTÄ eikä laiturilta:
       * piste kuuluu veden päälle, koska juuri allas on kaupungin syy
       * olla olemassa. Se näkyy nyt vetenä — ennen merentäyttöä se
       * piirtyi ontoksi suorakaiteeksi.
       */
      { nimi: 'MuCEM', lat: 43.2967, lon: 5.361, wiki: 'MuCEM' },
      { nimi: 'Marseillen katedraali', lat: 43.2998, lon: 5.3649, wiki: 'Marseillen katedraali' },
      { nimi: 'Saint-Victorin kirkko', lat: 43.2903, lon: 5.3656 },
      { nimi: 'Vanhasatama', lat: 43.2946, lon: 5.3693, wiki: 'Marseillen vanha satama' },
      { nimi: 'Notre-Dame de la Garde', lat: 43.2839, lon: 5.3712, wiki: 'Notre-Dame de la Garde' },
      { nimi: 'Saint-Charlesin asema', lat: 43.3032, lon: 5.3816 },
    ],
  },
  helsinki: {
    polku: 'assets/kartat/helsinki-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 60.184, etela: 60.1545, lansi: 24.916, ita: 24.9835 },
    /*
     * Kainalokartta Suomenlinnasta. Se on lehden historiaosion
     * pääkohde eikä mahdu mihinkään järkevään päärajaukseen — 3 km
     * kaakkoon. Ruutu on sijoitettu kuvan kaakkoiskulman avomerelle,
     * eli se peittää samalla sen alueen, jossa muuten olisi vähiten
     * katsottavaa, ja se on oikea suunta.
     */
    kainalot: [
      { rajat: { pohjoinen: 60.152, etela: 60.1368, lansi: 24.969, ita: 24.9955 },
        x: 76, y: 69.15, leveys: 22, korkeus: 28.85 },
    ],
    esittely: 'Helsinki ei ole aina ollut tässä. Kustaa Vaasa perusti '
      + 'sen vuonna 1550 Vantaanjoen suulle Tallinnan kilpailijaksi, '
      + 'mutta satama oli matala, ja vuonna 1640 koko kaupunki '
      + 'siirrettiin runsaat viisi kilometriä etelämmäs Vironniemen '
      + 'kärkeen. Niemellä on merta kolmella sivulla, ja edustalla on '
      + 'saaria ja matalikkoja, joiden välistä laiva pääsee vain '
      + 'kapeita väyliä pitkin. Siksi Ruotsi alkoi 1748 rakentaa '
      + 'väylän suulle merilinnoitusta. Kun Venäjän keisari valitsi '
      + 'Helsingin pääkaupungiksi vuonna 1812, linnoitus oli jo '
      + 'valmiina.\n\nKartalla niemi näkyy kokonaan. Idässä työntyy '
      + 'mereen Katajanokka, joka oli ennen kiinni mantereessa; nyt '
      + 'sen erottaa kaivettu kanava, jonka yli kulkee neljä siltaa. '
      + 'Väliin jää Eteläsatama, jonka perukassa on Kauppatori. '
      + 'Ylhäällä oleva lahti on Töölönlahti — se näyttää järveltä, '
      + 'mutta on merenlahti, jonka rautatiepenger sulkee: veden ainoa '
      + 'tie mereen kulkee penkereen ali kapeana väylänä. Penkereeltä '
      + 'etelään levittäytyy kartan levein raita, ratapiha, joka '
      + 'päättyy päärautatieasemaan. Rata loppuu siihen: junat '
      + 'peruuttavat ulos. Oikeassa alanurkassa on oma pieni kartta '
      + 'Suomenlinnasta. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään ja lopuksi etelään. Kauppatori jätettiin pois
       * vaikka se mahtuisi: se olisi kasannut kolmannen numeron
       * Senaatintorin ja Katajanokan väliin. Se mainitaan esittelyssä
       * nimeltä, ja silakkamarkkinat ovat lehdessä omana nostonaan.
       *
       * Kallion kirkko jää 22 metriä pohjoisrajan ulkopuolelle. Rajaa
       * ei nostettu, koska 60,187 olisi vaatinut 4,3 km leveän kuvan
       * ja työntänyt niemen kärjen alalaitaan.
       */
      { nimi: 'Temppeliaukion kirkko', lat: 60.1731, lon: 24.9253, wiki: 'Temppeliaukion kirkko' },
      { nimi: 'Päärautatieasema', lat: 60.1719, lon: 24.9414, wiki: 'Helsingin päärautatieasema' },
      { nimi: 'Kaisaniemen puisto', lat: 60.1747, lon: 24.9458, wiki: 'Kaisaniemen puisto' },
      { nimi: 'Tuomiokirkko', lat: 60.1703, lon: 24.9522, wiki: 'Helsingin tuomiokirkko' },
      { nimi: 'Uspenskin katedraali', lat: 60.1683, lon: 24.96, wiki: 'Uspenskin katedraali' },
      { nimi: 'Johanneksenkirkko', lat: 60.1618, lon: 24.9447, wiki: 'Johanneksenkirkko (Helsinki)' },
      // Kainalossa oikeassa alanurkassa.
      { nimi: 'Suomenlinna', lat: 60.1472, lon: 24.9864, wiki: 'Suomenlinna' },
    ],
  },
  ateena: {
    polku: 'assets/kartat/ateena-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 37.9855, etela: 37.9625, lansi: 23.707, ita: 23.758 },
    esittely: 'Ateena syntyi kallion ympärille. Akropolis kohoaa noin '
      + '90 metriä ympäröivän tasangon yli ja 156 metrin korkeuteen '
      + 'merenpinnasta. Seinämät ovat jyrkät ja sisään pääsee vain '
      + 'länsipäästä, ja rinteillä oli lähteitä, joten kukkula kesti '
      + 'pitkänkin piirityksen. Meri jäi kauas: Pireuksen satama on '
      + 'kahdeksan kilometriä lounaaseen, eikä keskustan läpi virtaa '
      + 'yhtään jokea. Ateena on siis linnavuoren kaupunki, ei sataman '
      + 'eikä joen.\n\nKartalla ei siksi näy vettä. Sen tilalla '
      + 'erottuu vaaleina laikkuina kukkuloiden puistoja: lounaassa '
      + 'metsäinen Filopáppos, keskellä Akropoliin kallio rinteineen '
      + 'ja idässä Kansallispuutarha. Koillisessa on vielä yksi '
      + 'kukkula, jota kartta ei näytä mutta numero löytää: '
      + 'Lykavittós, 277 metriä korkea ja koko keskustan korkein '
      + 'kohta. Kukkuloiden välissä vanhat kadut ovat kapeita ja '
      + 'mutkaisia. Pohjoisempana ne suoristuvat, '
      + 'sillä se osa piirrettiin 1830-luvulla kerralla uuden '
      + 'pääkaupungin ruutukaavaksi. Oikeassa alalaidassa erottuu '
      + 'hevosenkengän muotoinen stadion. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * KAKSI TÄSMENNYSSIVUANSAA, jotka on tarkistettu 9.8.2026 —
       * älä "korjaa" näitä lyhyempiin otsikoihin:
       *   'Zeus Olympioksen temppeli' on täsmennyssivu (Akragas,
       *   Ateena, Dion); Ateenan artikkeli on 'Olympoksen Zeuksen
       *   temppeli'.
       *   'Syntagman aukio' ja 'Panathinaikon-stadion' ilman tarkkeita
       *   ovat punaisia linkkejä; oikeat ovat 'Sýntagma' ja
       *   'Panathinaïkó-stadion' (huomaa ï).
       *
       * Tuulten torni on lehden oma nosto ja mahtuisi kartalle, mutta
       * se on 9,5 prosenttiyksikköä Antiikin agorasta — numerot
       * menisivät päällekkäin, joten agora voitti.
       */
      { nimi: 'Antiikin agora', lat: 37.975, lon: 23.7225, wiki: 'Agora (Ateena)' },
      { nimi: 'Akropolis', lat: 37.9715, lon: 23.7266, wiki: 'Akropolis (Ateena)' },
      { nimi: 'Zeuksen temppeli', lat: 37.9694, lon: 23.7331, wiki: 'Olympoksen Zeuksen temppeli' },
      { nimi: 'Sýntagman aukio', lat: 37.9756, lon: 23.7347, wiki: 'Sýntagma' },
      { nimi: 'Lykavittós', lat: 37.9819, lon: 23.7432, wiki: 'Lykavittós' },
      { nimi: 'Kallimarmaro', lat: 37.9683, lon: 23.7411, wiki: 'Panathinaïkó-stadion' },
    ],
  },
  amsterdam: {
    polku: 'assets/kartat/amsterdam-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 52.3855, etela: 52.356, lansi: 4.868, ita: 4.922 },
    esittely: 'Amsterdam syntyi padosta. Amstel-joki laski ennen '
      + 'suoraan IJ-lahteen, ja lahdesta pääsi merelle. Noin vuonna '
      + '1270 joki padottiin, ja padon päälle kasvoi kylä Amstelredam '
      + '— siitä tuli Amsterdam. Pato oli myös lastauspaikka: '
      + 'merilaivat jäivät lahden puolelle, jokiveneet toiselle, ja '
      + 'tavara kannettiin välissä. Maa oli pehmeää suota, joten '
      + 'kanavia kaivettiin sekä kulkuväyliksi että kuivattamaan maata. '
      + 'Pato on yhä paikallaan, mutta sen päällä on nyt aukio, jonka '
      + 'nimi on lyhyesti Dam.\n\nKartalla näkyy kolme puolikuuta: '
      + 'Herengracht, Keizersgracht ja Prinsengracht, joita alettiin '
      + 'kaivaa vuonna 1613. Vesi pilkkoo keskustan noin '
      + 'yhdeksäksikymmeneksi saareksi, ja niitä yhdistää toistatuhatta '
      + 'siltaa. Ylhäällä levittäytyy avoin vesi, entinen merenlahti '
      + 'IJ, ja siellä on kaupungin satama. Keskusasema ei ole rannalla '
      + 'vaan veden päällä: se rakennettiin 1880-luvulla kolmelle '
      + 'tekosaarelle, jotka kasattiin hiekasta lahden pohjaan. Kartan '
      + 'kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Rembrandtin talosta ei ole suomenkielistä artikkelia, joten se
       * jää pelkäksi merkiksi — se on silti listalla, koska se sitoo
       * lehden Yövartio-jutun siihen taloon, jossa taulu maalattiin.
       *
       * Van Gogh -museo ja Westerkerk hylättiin: edellinen olisi
       * osunut 92 %:n kohdalle aivan alalaitaan, jälkimmäinen on 70
       * metriä Anne Frankin talosta eli numerot olisivat menneet
       * päällekkäin.
       */
      { nimi: 'Keskusrautatieasema', lat: 52.379, lon: 4.9006, wiki: 'Amsterdamin keskusrautatieasema' },
      { nimi: 'Anne Frankin talo', lat: 52.3752, lon: 4.8841, wiki: 'Anne Frankin talo' },
      { nimi: 'Kuninkaanpalatsi', lat: 52.3731, lon: 4.8913, wiki: 'Amsterdamin kuninkaallinen palatsi' },
      { nimi: 'Rembrandtin talo', lat: 52.3693, lon: 4.9012 },
      { nimi: 'Artis-eläintarha', lat: 52.367, lon: 4.913, wiki: 'Artis (eläintarha)' },
      { nimi: 'Rijksmuseum', lat: 52.3599, lon: 4.885, wiki: 'Rijksmuseum' },
    ],
  },
  dublin: {
    polku: 'assets/kartat/dublin-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 53.355, etela: 53.335, lansi: -6.294, ita: -6.244 },
    esittely: 'Dublinilla on kaksi nimeä, ja molemmat kertovat vedestä. '
      + 'Iirinkielinen Baile Átha Cliath tarkoittaa risuista tehdyn '
      + 'kahlaamon kaupunkia: Liffey-joen yli päästiin kävellen '
      + 'kohdassa, johon oli ladottu punottuja risuaitoja. '
      + 'Englanninkielinen Dublin taas tulee sanoista dubh linn eli '
      + 'musta lammikko. Se oli tumma vuorovesiallas siinä, missä pieni '
      + 'Poddle-joki laski Liffeyhin. Viikingit perustivat altaan '
      + 'rannalle tukikohdan vuonna 841 ja pitivät siinä laivojaan. '
      + 'Allas on nykyään Dublinin linnan takapiha.\n\nKartan halki '
      + 'kulkee Liffey. Sen lähde on vuorilla vain runsaan '
      + 'kahdenkymmenen kilometrin päässä etelässä, mutta joki kiertää '
      + 'sisämaan kautta pitkän lenkin ennen kuin palaa tänne mereen. '
      + 'Joki jakaa kaupungin pohjoiseen ja eteläiseen puoleen, ja '
      + 'tällä kartalla sen ylittää toistakymmentä siltaa. Kuuluisin on '
      + 'valurautainen Ha’penny-silta vuodelta 1816: sen yli sai '
      + 'kävellä puolen pennin maksusta, ja maksua perittiin sata '
      + 'vuotta. Pohjoispuolella kohoaa 120 metriä korkea teräsneula '
      + 'Spire. Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Dublinin linnasta ja Ha’penny-sillasta ei ole suomenkielistä
       * artikkelia; molemmat jäävät pelkiksi merkeiksi. Linna on
       * listalla siksi, että se seisoo täsmälleen sillä paikalla,
       * jossa esittelyn "musta lammikko" oli.
       *
       * Christ Church olisi kelvannut ja siitä on fi-artikkeli, mutta
       * se on vain 9 prosenttiyksikköä linnasta — numerot olisivat
       * menneet päällekkäin.
       */
      { nimi: 'Guinness-panimo', lat: 53.3419, lon: -6.2867, wiki: 'Guinness Storehouse' },
      { nimi: 'Patrickin katedraali', lat: 53.3395, lon: -6.2715, wiki: 'Pyhän Patrickin katedraali (Dublin)' },
      { nimi: 'Dublinin linna', lat: 53.3427, lon: -6.2669 },
      { nimi: 'Ha’penny-silta', lat: 53.3463, lon: -6.2631 },
      { nimi: 'Spire', lat: 53.3498, lon: -6.2603, wiki: 'Spire of Dublin' },
      { nimi: 'Trinity College', lat: 53.3437, lon: -6.2545, wiki: 'Trinity College (Dublin)' },
    ],
  },
  pariisi: {
    polku: 'assets/kartat/pariisi-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 48.892, etela: 48.847, lansi: 2.277, ita: 2.3675 },
    esittely: 'Pariisi alkoi saarelta. Seine haarautuu keskellä '
      + 'kaupunkia kahdeksi kapeaksi uomaksi, ja niiden väliin jää '
      + 'Île de la Cité — saari, joka on kymmenen katua pitkä ja viisi '
      + 'leveä. Kapeat haarat oli helppo ylittää ja saari helppo '
      + 'puolustaa, joten kelttiläinen kalastajakylä ja sen jälkeen '
      + 'roomalaisten Lutetia asettuivat juuri tähän. Kaupunki kasvoi '
      + 'saarelta molemmille rannoille, ja joen suuri kaari on yhä sen '
      + 'selkäranka.\n\nKartan keskellä näkyy saari, josta sillat '
      + 'vievät molemmille rannoille. Vanhin Seinen silloista on Pont '
      + 'Neuf, joka rakennettiin vuosina 1578–1607 — nimi tarkoittaa '
      + 'uutta siltaa. Vasemmalla tusina katua kohtaa yhdessä '
      + 'pisteessä ja piirtää kartalle tähden; sen keskellä seisoo '
      + 'Riemukaari. Ylhäällä oikealla kohoaa Montmartre, kaupungin '
      + 'korkein kukkula, 130 metriä merenpinnan yläpuolella, ja sen '
      + 'laella on valkoinen Sacré-Cœur. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Pelin laajin kaupunkirajaus, 6,6 km. Se on tietoinen
       * poikkeus tiiviiseen ydinkeskustaan: Eiffel-torni ja
       * Sacré-Cœur ovat 4,8 km:n päässä toisistaan, ja lapsen kaksi
       * tunnetuinta kohdetta kuuluvat samaan kuvaan. Pariisin
       * korttelit ovat isoja, joten kuva ei silti mene puuroksi.
       * Hinta on etelälaita: Panthéon ja Luxembourgin puutarha
       * jäävät ulkopuolelle.
       */
      { nimi: 'Eiffel-torni', lat: 48.8583, lon: 2.2945, wiki: 'Eiffel-torni' },
      { nimi: 'Riemukaari', lat: 48.8738, lon: 2.295, wiki: 'Riemukaari (Pariisi)' },
      { nimi: 'Concorden aukio', lat: 48.8656, lon: 2.3212, wiki: 'Place de la Concorde' },
      { nimi: 'Louvre', lat: 48.861, lon: 2.3358, wiki: 'Louvre' },
      { nimi: 'Sacré-Cœur', lat: 48.8868, lon: 2.343, wiki: 'Sacré-Cœur' },
      { nimi: 'Notre-Dame', lat: 48.853, lon: 2.3499, wiki: 'Notre-Damen katedraali' },
    ],
  },
  budapest: {
    polku: 'assets/kartat/budapest-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 47.5125, etela: 47.4825, lansi: 19.019, ita: 19.079 },
    /*
     * Kainalokartta Sankarien aukiosta. Se on lehden kansikuva mutta
     * 3 km koilliseen, ja päärajaukseen ottaminen olisi työntänyt
     * Tonavan kuvan laitaan. Ruutu on oikeassa ylänurkassa, jossa ei
     * ole numeroituja kohteita, ja se näyttää samalla Városligetin.
     * Korkeus on työkalun laskema; älä muuta sitä käsin.
     */
    kainalot: [
      { rajat: { pohjoinen: 47.5215, etela: 47.5095, lansi: 19.07, ita: 19.092 },
        x: 70, y: 3, leveys: 28, korkeus: 30.56 },
    ],
    esittely: 'Budapest seisoo siinä, missä Budan kalkkikivikukkulat '
      + 'loppuvat ja Unkarin suuri tasanko alkaa. Raja kulkee Tonavaa '
      + 'pitkin: läntisellä rannalla maa nousee jyrkästi, itäisellä se '
      + 'on tasaista niin kauas kuin näkee. Samaa kallionrakoa myöten '
      + 'maasta nousee yli sata lämmintä lähdettä, ja niiden päälle on '
      + 'rakennettu kylpylöitä satojen vuosien ajan. Kaupunkeja oli '
      + 'pitkään kolme — Buda kukkulalla, Óbuda pohjoisessa ja Pest '
      + 'tasangolla — ja ne yhdistettiin yhdeksi vasta vuonna '
      + '1873.\n\nEro näkyy kartalla heti. Lännessä kadut mutkittelevat '
      + 'rinnettä ylös, ja Gellértinvuori kohoaa 140 metriä joen '
      + 'yläpuolelle. Idässä kadut lähtevät suorina säteinä ja kaarina '
      + 'tasangolle. Välissä virtaa Tonava. Ensimmäinen pysyvä silta '
      + 'sen yli oli Ketjusilta, joka avattiin marraskuussa 1849: 375 '
      + 'metriä pitkä ja keskijänteeltään 202 metriä, tuohon aikaan '
      + 'maailman pisimpiä. Sitä ennen rannat yhdisti ponttonisilta, '
      + 'joka oli talvella jäiden takia usein poissa käytöstä. Kartan '
      + 'kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Kolme kohdetta kummallakin rannalla, jotta kartan juoni —
       * kukkula lännessä, tasanko idässä — näkyy myös numeroissa.
       * Suuresta kauppahallista ei ole suomenkielistä artikkelia,
       * joten se jää pelkäksi merkiksi; lehden ruokasivu kertoo siitä.
       */
      { nimi: 'Kalastajanlinnake', lat: 47.5023, lon: 19.0347, wiki: 'Kalastajanlinnake' },
      { nimi: 'Ketjusilta', lat: 47.499, lon: 19.0436, wiki: 'Széchenyin ketjusilta' },
      { nimi: 'Parlamenttitalo', lat: 47.507, lon: 19.0459, wiki: 'Unkarin parlamenttitalo' },
      { nimi: 'Gellértinvuori', lat: 47.4869, lon: 19.0446, wiki: 'Gellértinvuori' },
      { nimi: 'Pyhän Tapanin kirkko', lat: 47.5008, lon: 19.054, wiki: 'Pyhän Tapanin kirkko (Budapest)' },
      { nimi: 'Suuri kauppahalli', lat: 47.4866, lon: 19.059 },
      // Kainalossa oikeassa ylänurkassa.
      { nimi: 'Sankarien aukio', lat: 47.5153, lon: 19.0781, wiki: 'Sankarien aukio (Budapest)' },
    ],
  },
  praha: {
    polku: 'assets/kartat/praha-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 50.095, etela: 50.074, lansi: 14.382, ita: 14.446 },
    esittely: 'Praha kasvoi Vltavan mutkaan. Joki on Tšekin pisin, 430 '
      + 'kilometriä, ja Prahan kohdalla se kaartaa jyrkän '
      + 'kallioharjanteen ympäri. Harjanteen päälle perustettiin '
      + '800-luvulla linna, ja vastarannan tasaiselle maalle syntyi '
      + 'kauppiaiden Vanhakaupunki. Linna on Guinnessin mukaan '
      + 'maailman suurin muinaislinna: 570 metriä pitkä ja '
      + 'keskimäärin 128 metriä leveä.\n\nKartan halki kulkee joki, ja '
      + 'sen yli vie Kaarlensilta: 516 metriä pitkä, kuusitoista '
      + 'kaarta. Se oli yli neljäsataa vuotta Prahan ainoa silta — '
      + 'seuraava valmistui vasta 1841. Vanhankaupungin kadut ovat '
      + 'kapeita ja mutkaisia, ja ne kulkevat pari metriä '
      + 'alkuperäistä ylempänä: 1200-luvulla koko kaupunginosan '
      + 'maanpinta nostettiin tulvien takia, ja vanhat pohjakerrokset '
      + 'jäivät kellareiksi. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään: Petřínin kukkulalta Václavin aukion yläpäähän.
       * Petřínin näkötornista ei ole suomenkielistä artikkelia, joten
       * se jää pelkäksi merkiksi — kukkulan oma artikkeli on kolmen
       * lauseen tynkä eikä kerro tornista lainkaan.
       *
       * Kaarlensillan koordinaatti on sillan KESKELTÄ. Wikipedian
       * 50.0864/14.4119 osoittaa itäpäähän, ja koska silta ei ole
       * suora, piste olisi näyttänyt osuvan rantaan eikä joen päälle.
       */
      { nimi: 'Petřínin näkötorni', lat: 50.0835, lon: 14.3951 },
      { nimi: 'Prahan linna', lat: 50.0903, lon: 14.401, wiki: 'Prahan linna' },
      { nimi: 'Kaarlensilta', lat: 50.0866, lon: 14.4106, wiki: 'Kaarlensilta' },
      { nimi: 'Vanhauusi synagoga', lat: 50.09, lon: 14.4186, wiki: 'Vanhauusi synagoga' },
      { nimi: 'Astronominen kello', lat: 50.087, lon: 14.4207, wiki: 'Prahan astronominen kello' },
      { nimi: 'Kansallismuseo', lat: 50.0789, lon: 14.4308, wiki: 'Prahan kansallismuseo' },
    ],
  },
  wien: {
    polku: 'assets/kartat/wien-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 48.22, etela: 48.188, lansi: 16.34, ita: 16.404 },
    /*
     * Kainalokartta Schönbrunnista. Palatsi on lehden kansikuva mutta
     * 4 km lounaaseen, ja päärajaukseen ottaminen olisi vaatinut 7,2
     * km leveän kuvan — Ring, koko kuvan juoni, olisi kutistunut
     * täpläksi. Ruutu on vasemmassa alanurkassa, jossa ei ole yhtään
     * numeroitua kohdetta. Korkeus on työkalun laskema; älä muuta sitä
     * käsin, tai numero irtoaa kartasta.
     */
    kainalot: [
      { rajat: { pohjoinen: 48.191, etela: 48.178, lansi: 16.303, ita: 16.325 },
        x: 2, y: 56, leveys: 30, korkeus: 35.44 },
    ],
    esittely: 'Wien seisoo kohdassa, jossa Tonava tulee ulos vuorten '
      + 'välistä. Lännessä nousee Wienerwald, Alppien viimeinen '
      + 'kukkulaselänne, ja idässä alkaa tasainen lakeus, joka jatkuu '
      + 'Unkariin asti. Roomalaiset huomasivat paikan ensin: he '
      + 'perustivat tänne Vindobonan leirin lähes kaksituhatta vuotta '
      + 'sitten, sillä Tonava oli heidän valtakuntansa pohjoisraja. '
      + 'Vanhakaupunki ei silti ole ison joen rannalla vaan sen '
      + 'sivuhaaran, Donaukanalin, varrella — pääuoma suoristettiin '
      + 'nykyiselle paikalleen vasta 1870-luvulla.\n\nKartan keskellä '
      + 'näkyy soikea katukehä. Se on Ring: kaupunginmuuri purettiin '
      + 'keisarin käskystä, ja tilalle avattiin 1865 yli viisi '
      + 'kilometriä pitkä puistokatu, jonka varrelle rakennettiin '
      + 'ooppera, raatihuone ja museot. Kehän sisällä kadut ovat '
      + 'kapeita ja mutkaisia, ulkopuolella leveitä ja suoria. '
      + 'Koillisessa kaartaa Donaukanal, ja sen takana levittäytyy '
      + 'Praterin vihreä — entinen keisarin metsästysmaa, jonka '
      + 'reunalla pyörii jättiratas. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään. Belvedere on 89 %:n kohdalla ja jättiratas
       * 10 %:n — molemmat tarkoituksella laidassa, koska muuten
       * kaikki kuusi kasautuisivat Ringin sisään kuvan keskelle.
       *
       * Jättirattaalla ei ole omaa suomenkielistä artikkelia, joten
       * linkki vie Prateriin, jonka johdannossa ratas mainitaan.
       * Schönbrunn ja Karl-Marx-Hof ovat lehdessä mutta 4,3 km kartan
       * ulkopuolella kumpikin — ks. rajauksen perustelu työkalussa.
       */
      { nimi: 'Raatihuone', lat: 48.2108, lon: 16.3566, wiki: 'Wienin raatihuone' },
      { nimi: 'Hofburg', lat: 48.2064, lon: 16.3657, wiki: 'Hofburg' },
      { nimi: 'Valtionooppera', lat: 48.2033, lon: 16.3692, wiki: 'Wienin valtionooppera' },
      { nimi: 'Stephansdom', lat: 48.2085, lon: 16.3731, wiki: 'Stephansdom' },
      { nimi: 'Belvedere', lat: 48.1915, lon: 16.3809, wiki: 'Belvedere' },
      { nimi: 'Jättiratas', lat: 48.2167, lon: 16.3959, wiki: 'Prater' },
      // Kainalossa. Koordinaatti on päärajauksen ulkopuolella, ja
      // karttapiste() sijoittaa sen minikarttaan sen perusteella.
      { nimi: 'Schönbrunn', lat: 48.1845, lon: 16.3119, wiki: 'Schönbrunnin linna' },
    ],
  },
  kairo: {
    // Sama työkalu kuin muissa (tools/piirra-kaupunkikartta.mjs).
    // Rajaus tehtiin kahdesti: ensimmäisessä Niili jäi kuvan vasempaan
    // reunaan ja kohteet alalaitaan. Nyt joki kulkee keskeltä, Geziran
    // saari näkyy ja kohteet jakautuvat koko kuvalle.
    polku: 'assets/kartat/kairo-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 30.068, etela: 30.018, lansi: 31.198, ita: 31.278 },
    esittely: 'Kairo on Afrikan suurin kaupunki ja kasvoi kahdesta '
      + 'suunnasta: etelässä oli arabien perustama Fustat, pohjoisessa '
      + 'fatimidien 900-luvulla rakentama linnoituskaupunki al-Qahira, '
      + 'jonka nimestä tuli Kairo. Vasta 1800-luvulla väliin '
      + 'rakennettiin leveäkatuinen keskusta Pariisin malliin.\n\n'
      + 'Niili jakaa kaupungin, ja sen keskellä on Geziran saari. '
      + 'Idässä kadut kapenevat kujiksi — se osa on Unescon '
      + 'maailmanperintökohde, jossa on yli 600 suojeltua rakennusta. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään, jotta numerot etenevät kartalla luontevasti.
       * Wikit tarkistettu fi.wikipediasta (action=query&redirects=1);
       * Kairon tornilla ja Egyptin museolla ei ole suomenkielistä
       * artikkelia, joten ne ovat pelkkiä merkkejä — se on sallittua.
       * Al-Azharin moskeija jätettiin pois, koska se osuu käytännössä
       * samaan pisteeseen Khan el-Khalilin kanssa.
       */
      { nimi: 'Kairon torni', lat: 30.0459, lon: 31.2243 },
      { nimi: 'Egyptin museo', lat: 30.0478, lon: 31.2336 },
      { nimi: 'Tahririn aukio', lat: 30.0444, lon: 31.2357, wiki: 'Tahririn aukio' },
      { nimi: 'Ibn Tulunin moskeija', lat: 30.0288, lon: 31.2497, wiki: 'Ibn Tulunin moskeija' },
      { nimi: 'Saladinin linnoitus', lat: 30.0287, lon: 31.2599, wiki: 'Saladinin linnoitus' },
      { nimi: 'Khan el-Khalili', lat: 30.0477, lon: 31.2622, wiki: 'Khan el-Khalili' },
    ],
  },
  lontoo: {
    // Ydinkeskustan julistekartta samalla työkalulla kuin Berliinin
    // (tools/piirra-kaupunkikartta.mjs). Rajaus Hyde Parkin itälaidalta
    // Tower Bridgelle: Thames kaartaa kuvan halki, ja kaikki kuusi
    // kohdetta mahtuvat alueelle.
    polku: 'assets/kartat/lontoo-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 51.525, etela: 51.4925, lansi: -0.16, ita: -0.06 },
    esittely: 'Lontoo ei ole yksi kaupunki vaan kaksi, jotka kasvoivat '
      + 'yhteen: idässä City of London, roomalaisten muurien rajaama '
      + 'neliökilometri, jossa tehdään rahaa, ja lännessä Westminster, '
      + 'jossa tehdään päätöksiä. Väliin jäänyt maa täyttyi vähitellen '
      + 'taloilla.\n\nThames on vuorovesijoki: pinta nousee ja laskee '
      + 'Lontoon kohdalla noin seitsemän metriä kahdesti päivässä, ja '
      + 'laskuveden aikaan rannalta löytyy yhä savipiippuja ja '
      + 'keskiaikaisia nuppineuloja. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      {
        nimi: 'Buckinghamin palatsi',
        lat: 51.5014,
        lon: -0.1419,
        wiki: 'Buckinghamin palatsi',
        aika: '1837',
        teksti: 'Palatsi ei ollut alun perin palatsi vaan tavallinen '
            + 'kaupunkitalo. Buckingham House rakennettiin 1703 herttualle, '
            + 'ja kuningas Yrjö III osti sen 1761 vaimolleen Charlottelle '
            + 'kodiksi. Talo tunnettiin pitkään nimellä kuningattaren talo, '
            + 'ja siellä syntyi 14 Charlotten 15 lapsesta.'
          + '\n\n'
          + 'Ensimmäinen hallitsija, joka todella muutti sisään, oli '
            + 'Viktoria 1837. Talo oli silloin surkeassa kunnossa. Savupiiput '
            + 'savusivat niin pahasti, että tulet piti antaa sammua, joten '
            + 'huoneet olivat kylmiä, ja ilmanvaihto oli niin huono, että '
            + 'sisällä haisi. Prinssi Albert korjautti viat vuoteen 1840 '
            + 'mennessä.'
          + '\n\n'
          + 'Sisään pääsi silti kuka tahansa sitkeä. Nelitoistavuotias '
            + 'Edward Jones murtautui palatsiin kolme kertaa 1838–1841. '
            + 'Kerran palvelusväki löysi hänet sohvan alta piiloutuneena, '
            + 'toisella kerralla hänet napattiin varastamasta ruokaa '
            + 'ruokakomerosta. Lehdet tekivät pojasta kuuluisuuden.'
          + '\n\n'
          + 'Kuuluisin osa on parveke, ja se on koko rakennuksen nuorimpia. '
            + 'Itäsiipi pystytettiin 1847–1849, ja työ maksettiin myymällä '
            + 'kuninkaan huvila Brightonissa. Julkisivu, jonka kaikki '
            + 'tunnistavat, verhoiltiin Portlandin kivellä vasta 1913. '
            + 'Huoneita on 775 ja puutarha on Lontoon suurin yksityinen '
            + 'puutarha.'
          + '\n\n'
          + 'Toisessa maailmansodassa palatsiin osui pommeja yhdeksän '
            + 'kertaa. Pahin isku tuhosi palatsin kappelin 1940, ja yksi '
            + 'pommi putosi sisäpihalle kuningasparin ollessa kotona. Heidät '
            + 'kuvattiin kiertämässä rikkoutunutta kotiaan, ja filmi '
            + 'näytettiin elokuvateattereissa ympäri maata.'
          + '\n\n'
          + 'Portille tullaan yhä sanomaan asioita ääneen. Toukokuussa 1914 '
            + 'poliisi kantoi Emmeline Pankhurstin pois palatsin aidan '
            + 'edestä, kun tämä yritti viedä kuninkaalle vetoomusta naisten '
            + 'äänioikeudesta. Katolla liehuva lippu kertoo, onko hallitsija '
            + 'kotona: oma kuninkaallinen lippu jos on, Union-lippu jos ei.',
        lainaus: {
          teksti: 'Olen iloinen, että meitä pommitettiin. Nyt voin katsoa East '
            + 'Endiä silmiin.',
          lahde: 'Kuningatar Elisabet syyskuussa 1940, kun pommi oli osunut palatsiin',
        },
        kuvat: [
          {
            tiedosto: 'Buckingham Palace, London - April 2009.jpg',
            selite: 'Palatsin itäjulkisivu The Mallin päästä. Vasemmalla '
              + 'Viktorian muistomerkki kullattuine voitonenkeleineen, '
              + 'katolla lipputanko, edessä kukkapenkit ja kadun täydeltä '
              + 'ihmisiä.',
            lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
          },
          {
            tiedosto: 'Guard of Buckingham Palace - 01.jpg',
            selite: 'Vartiomies vartiokopissaan palatsin keskiholvikäytävän '
              + 'vieressä. Toinen koppi on tyhjä, ja mustakullatut '
              + 'lyhtypylväät reunustavat porttia.',
            lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
          },
          {
            tiedosto: 'Band of the Welsh Guards, Buckingham Palace, London - Diliff.jpg',
            selite: 'Walesin kaartin soittokunta marssii palatsilta punatakeissa '
              + 'ja karhunnahkalakeissa. Taustalla näkyy Viktorian '
              + 'muistomerkin kullattu huippu.',
            lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
          },
          {
            tiedosto: 'Mrs Emmeline Pankhurst, Leader of the Women\'s Suffragette movement, is arrested outside Buckingham Palace while trying to present a petition to King George V in May 1914. Q81486.jpg',
            selite: 'Poliisi kantaa Emmeline Pankhurstin jalat irti maasta pois '
              + 'palatsin aidan edestä toukokuussa 1914. Ympärillä kävelee '
              + 'knalliin ja olkihattuun pukeutuneita miehiä.',
            lahde: 'Tuntematon valokuvaaja, Wikimedia Commons (PD)',
          },
        ],
      },
      {
        nimi: 'Trafalgar Square',
        lat: 51.508,
        lon: -0.1281,
        wiki: 'Trafalgar Square',
        aika: '1844',
        teksti: 'Ennen aukiota tässä olivat kuninkaan tallit. Paikan vanha nimi '
            + 'King\'s Mews tulee haukoista: mew tarkoitti sulkasatoa, ja '
            + 'täällä pidettiin metsästyshaukkoja siihen aikaan vuodesta, kun '
            + 'ne vaihtoivat höyhenensä. Kun tallit siirrettiin Buckinghamin '
            + 'palatsiin, tontti vapautui, ja aukio avattiin yleisölle 1844.'
          + '\n\n'
          + 'Keskellä seisova pylväs pystytettiin 1840–1843 muistoksi '
            + 'meritaistelusta, jonka Horatio Nelson voitti 1805 ja jossa hän '
            + 'kuoli. Suunnitelmassa pylväs oli 66 metriä korkea, mutta se '
            + 'leikattiin 44 metriin, koska niin korkeaa pidettiin '
            + 'vaarallisena. Aukio sai Trafalgarin nimen vasta 1835.'
          + '\n\n'
          + 'Leijonat tulivat vasta 1867, yli kaksikymmentä vuotta patsaan '
            + 'jälkeen. Kuvanveistäjä Edwin Landseer pyysi eläintarhasta '
            + 'kuolleen leijonan malliksi, mutta piirsi niin hitaasti, että '
            + 'raato ehti mädäntyä ja loput oli keksittävä. Siksi tassut '
            + 'muistuttavat enemmän kissan kuin leijonan tassuja. Yksi '
            + 'leijona painaa seitsemän tonnia.'
          + '\n\n'
          + 'Aukion alla on toisia leijonia. Kun eteläreunaan rakennettiin '
            + '1950-luvulla, maasta löytyi noin 120 000 vuotta vanhoja luita: '
            + 'luolaleijonia, sarvikuonoja, metsänorsuja ja virtahepoja. '
            + 'Silloin Thamesin ranta oli lämmin ja soinen, ja virtahevot '
            + 'makasivat siinä, missä nyt istutaan suihkulähteen reunalla.'
          + '\n\n'
          + 'Tästä paikasta mitataan kaikki etäisyydet Lontooseen. '
            + 'Nollapiste ei ole pylväs vaan aukion eteläkulmassa seisova '
            + 'Kaarle I:n ratsastajapatsas, joka merkitsee vanhan Charing '
            + 'Crossin paikkaa. Kun tienviitassa lukee, montako mailia '
            + 'Lontooseen on, luku on mitattu juuri tähän hevoseen asti.'
          + '\n\n'
          + 'Aukio oli pitkään kuuluisa kyyhkyistään. Parvi kasvoi '
            + 'pahimmillaan noin 35 000 linnun kokoiseksi, ja lintujen '
            + 'jätökset söivät kiveä niin pahasti, että pylvään puhdistus '
            + 'maksoi 140 000 puntaa. Siemenmyynti lopetettiin 2001 ja '
            + 'ruokinta kiellettiin 2003. Tilalle tuotiin haukka, joka lentää '
            + 'aukiolla säännöllisesti.',
        lainaus: {
          teksti: 'Englanti odottaa jokaisen tekevän velvollisuutensa.',
          lahde: 'Horatio Nelsonin lippuviesti laivastolleen Trafalgarin taistelun alkaessa 21. lokakuuta 1805',
        },
        kuvat: [
          {
            tiedosto: 'Trafalgar Square (21178394832).jpg',
            selite: 'Aukio kesäpäivänä: Nelsonin pylväs keskellä, suihkulähde '
              + 'käynnissä ja ihmisiä istumassa altaan reunalla. Reunoilla '
              + 'punaisia busseja.',
            lahde: 'Markus Trienke, Wikimedia Commons (CC BY-SA 2.0)',
          },
          {
            tiedosto: 'Landseer Lion, Trafalgar Square, London - geograph.org.uk - 6823604.jpg',
            selite: 'Kaksi Landseerin pronssileijonaa graniittijalustoillaan. '
              + 'Pieni tyttö istuu leijonan tassun päällä, ja koko on helppo '
              + 'nähdä ihmisistä.',
            lahde: 'habiloid, Wikimedia Commons (CC BY-SA 2.0)',
          },
          {
            tiedosto: 'Trafalgar Square met Nelson Column, Londen Trafalgar Square, London (titel op object), RP-F-F16341.jpg',
            selite: 'Seepianruskea valokuva aukiosta 1800-luvun lopulta. Pylvään '
              + 'ympärillä on hevosvaunuja ja omnibusseja, ja taustalla '
              + 'kohoaa kansallisgallerian kupoli.',
            lahde: 'Tuntematon valokuvaaja (Rijksmuseum), Wikimedia Commons (CC0)',
          },
          {
            tiedosto: 'London MMB 31 Trafalgar Square.jpg',
            selite: 'Nelson pylvään huipulla lähikuvassa: kolmikolkkahattu, tyhjä '
              + 'hiha ja miekka. Alla korinttilainen kapiteeli, joka on '
              + 'valettu pronssista.',
            lahde: 'mattbuck, Wikimedia Commons (CC BY-SA 3.0)',
          },
        ],
      },
      {
        nimi: 'Big Ben',
        lat: 51.5007,
        lon: -0.1246,
        wiki: 'Big Ben',
        aika: '1859',
        teksti: 'Big Ben ei ole torni. Se on kello, joka roikkuu tornin '
            + 'huipulla ja painaa 13,7 tonnia. Torni itse oli vain '
            + 'Kellotorni, kunnes se nimettiin 2012 Elisabetin torniksi. '
            + 'Korkeutta on 96 metriä ja huipulle nousee 334 porrasta — hissi '
            + 'tuli vasta vuosien 2017–2021 remontissa vanhaan '
            + 'ilmanvaihtokuiluun.'
          + '\n\n'
          + 'Ensimmäinen kello halkesi jo koekäytössä, ja uusi valettiin '
            + 'huhtikuussa 1858 Whitechapelin kellovalimossa. Se vedettiin '
            + 'valimolta tornille kärryillä, joita veti kuusitoista hevosta '
            + 'väkijoukon hurratessa. Nosto 61 metriä ylös kellohuoneeseen '
            + 'kesti 18 tuntia.'
          + '\n\n'
          + 'Syyskuussa 1859 uusikin kello halkesi. Syy oli vasara, joka '
            + 'painoi yli kaksi kertaa enemmän kuin oli sallittu. Kolmeen '
            + 'vuoteen Big Ben ei soinut lainkaan. Korjaukseksi reunasta '
            + 'lohkaistiin neliönmuotoinen pala ja kelloa käännettiin '
            + 'kahdeksasosakierros, jotta vasara osuisi ehjään kohtaan.'
          + '\n\n'
          + 'Halkeamaa ei koskaan korjattu, ja juuri se antaa Big Benille '
            + 'sen oman soinnin. Kello käy silti sekunnin tarkkuudella, ja '
            + 'sitä säädetään rahoilla: heilurin päällä on pino vanhoja '
            + 'pennejä. Yksi penni muuttaa käyntinopeutta 0,4 sekuntia '
            + 'vuorokaudessa. Koneisto vedetään käsin kolmesti viikossa.'
          + '\n\n'
          + 'Kellotaulut ovat lähes 7 metriä leveitä, ja jokaisessa on 324 '
            + 'palaa opaalilasia. Taulujen alareunassa kiertää '
            + 'latinankielinen rukous, joka kaiverrettiin siihen kuningatar '
            + 'Viktorian aikana ja on siellä edelleen.'
          + '\n\n'
          + 'Torni myös nojaa. Se seisoo savimaan päällä ja kallistuu '
            + 'huipultaan noin puoli metriä luoteeseen. Kellohuoneen yllä '
            + 'palaa lyhty nimeltä Ayrton Light, joka sytytettiin 1873 '
            + 'palamaan aina kun alahuone istuu pimeän tultua. Se suunnattiin '
            + 'alun perin Buckinghamin palatsiin, jotta Viktoria näki '
            + 'ikkunastaan, olivatko kansanedustajat yhä töissä.',
        lainaus: {
          teksti: 'DOMINE SALVAM FAC REGINAM NOSTRAM VICTORIAM PRIMAM — Herra, '
            + 'varjele kuningattaremme Viktoria ensimmäistä.',
          lahde: 'Kaikkien neljän kellotaulun alareunaan kaiverrettu teksti',
        },
        kuvat: [
          {
            tiedosto: 'Big Ben at sunset - 2014-10-27 17-30.jpg',
            selite: 'Torni hämärässä, kellotaulu valaistuna. Etualalla bussien '
              + 'valojuovat venyvät Westminsterin sillan yli, vasemmalla '
              + 'parlamenttitalon huiput.',
            lahde: 'Colin, Wikimedia Commons (CC BY-SA 4.0)',
          },
          {
            tiedosto: 'BIg Ben - Whitechapel Foundary drawing.jpg',
            selite: 'Valimon käsin väritetty piirustus vuodelta 1859: kello '
              + 'leikattuna halki ja sen oikealla puolella lyömävasara '
              + 'mittoineen.',
            lahde: 'Whitechapel Bell Foundry, Wikimedia Commons (PD)',
          },
          {
            tiedosto: 'London Big Ben Inner Clock Face 1070925-PSD.jpg',
            selite: 'Kellotaulu läheltä. Alareunassa erottuu selvästi '
              + 'latinankielinen kaiverrus, ja lasiruudut muodostavat '
              + 'verkkomaisen kuvion viisarien takana.',
            lahde: 'Ermell, Wikimedia Commons (CC BY-SA 4.0)',
          },
          {
            tiedosto: 'Westminster Clock (Big Ben) – mechanism plan, c.1854 (design by Edmund Beckett Denison; made by E J Dent).png',
            selite: 'Koneiston alkuperäinen piirustus vuodelta 1854. Kolme '
              + 'rinnakkaista rataslinjaa hoitavat käynnin, tuntilyönnin ja '
              + 'neljännessoiton; alla riippuu heiluri.',
            lahde: 'Edmund Beckett Denison, Wikimedia Commons (PD)',
          },
          {
            tiedosto: 'Houses of Parliament, London LCCN92518735.jpg',
            selite: 'Värjätty valokuva parlamenttitalosta joelta noin vuodelta '
              + '1890. Kellotorni oikealla, Viktorian torni lippuineen '
              + 'vasemmalla, edessä lastiproomuja ja hinaaja.',
            lahde: 'Library of Congress, Wikimedia Commons (PD)',
          },
        ],
      },
      {
        nimi: 'Lontoon silmä',
        lat: 51.5033,
        lon: -0.1196,
        wiki: 'London Eye',
        aika: '2000',
        teksti: 'Pyörä on 135 metriä korkea ja kehältään 120 metriä leveä, '
            + 'mutta oudointa siinä on tuki. Se roikkuu vain toiselta '
            + 'puolelta, A-kirjaimen muotoisen jalustan varassa, kuten '
            + 'polkupyörän eturenkaan pinnat yhdellä haarukalla. Toista yhtä '
            + 'korkeaa näin tuettua maisemapyörää ei maailmassa ole.'
          + '\n\n'
          + 'Idea syntyi kilpailussa, jossa etsittiin vuosituhannen '
            + 'vaihteen merkkirakennusta Lontooseen. Tuomaristo ei pitänyt '
            + 'yhtäkään ehdotusta tarpeeksi rohkeana eikä valinnut voittajaa '
            + 'lainkaan. Suunnittelijat David Marks ja Julia Barfield '
            + 'kiinnittivät oman talonsa pankkiin ja veivät hankkeen '
            + 'eteenpäin itse.'
          + '\n\n'
          + 'Pyörää ei nostettu paikalleen valmiina. Osat tuotiin jokea '
            + 'pitkin proomuilla, ja koko kehä koottiin makuulleen Thamesin '
            + 'päälle rakennetuille paalulautoille. Sitten sitä nostettiin '
            + 'pystyyn kaksi astetta tunnissa. Kun kulma oli 65 astetta, työ '
            + 'pysäytettiin viikoksi ja insinöörit valmistelivat loppunoston.'
          + '\n\n'
          + 'Kapseleita on 32, yksi jokaista Lontoon kaupunginosaa kohti. '
            + 'Ne on numeroitu 1–33, koska numeroa 13 ei ole lainkaan. Yksi '
            + 'kapseli painaa 10 tonnia ja siihen mahtuu 25 ihmistä, jotka '
            + 'saavat kävellä sisällä vapaasti.'
          + '\n\n'
          + 'Pyörä pyörii 26 senttiä sekunnissa eli hitaammin kuin ihminen '
            + 'kävelee. Siksi se ei pysähdy lainkaan, vaan kyytiin astutaan '
            + 'sen liikkuessa. Yksi kierros kestää puoli tuntia. Ylimmässä '
            + 'kohdassa kapseli on 135 metrin korkeudessa, ja se oli Lontoon '
            + 'korkein yleisölle avoin näköalapaikka vuoteen 2013 asti, '
            + 'kunnes Shard-pilvenpiirtäjä ohitti sen.'
          + '\n\n'
          + 'Alun perin pyörän piti olla väliaikainen: lupa myönnettiin '
            + 'viideksi vuodeksi. Pääministeri avasi sen juhlallisesti '
            + 'uudenvuodenaattona 1999, mutta yleisö pääsi kyytiin vasta '
            + 'maaliskuussa 2000, koska yhden kapselin kytkin ei toiminut. '
            + 'Nyt se on Britannian suosituin maksullinen nähtävyys.',
        kuvat: [
          {
            tiedosto: 'London eye and county hall pano edited 2008-02-19.jpg',
            selite: 'Koko pyörä joen toiselta rannalta. Kehää kannattavat ohuet '
              + 'teräsvaijerit kuin polkupyörän pinnat, ja kapselit erottuvat '
              + 'kehän ulkoreunalla. Oikealla County Hall.',
            lahde: 'Kim Hansen, Wikimedia Commons (CC BY-SA 4.0)',
          },
          {
            tiedosto: 'The London Eye Under Construction - August 1999.jpg',
            selite: 'Elokuu 1999: kehä makaa vielä vaakatasossa joen päälle '
              + 'rakennetuilla lautoilla, ympärillä nostureita ja hinaajia. '
              + 'Oikealla County Hallin kivijulkisivu.',
            lahde: 'Jim Linwood, Wikimedia Commons (CC BY 2.0)',
          },
          {
            tiedosto: 'London Eye Capsule, 2026-03-31.jpg',
            selite: 'Näkymä kapselista seuraavaan: ihmiset seisovat lasikapselin '
              + 'sisällä, alla kaartuu Thames siltoineen ja edessä '
              + 'levittäytyy kaupunki horisonttiin asti.',
            lahde: 'Andrew Bone, Wikimedia Commons (CC BY 4.0)',
          },
          {
            tiedosto: 'London Eye Twilight April 2006.jpg',
            selite: 'Pyörä iltahämärässä puistokäytävän päässä. Puut on '
              + 'koristeltu sinisillä valoilla, ja kehän reuna hehkuu '
              + 'lämpimänä.',
            lahde: 'Diliff, Wikimedia Commons (CC BY 2.5)',
          },
        ],
      },
      {
        nimi: 'Pyhän Paavalin katedraali',
        lat: 51.5138,
        lon: -0.0984,
        wiki: 'Pyhän Paavalin katedraali',
        aika: '1675–1710',
        teksti: 'Nykyinen kirkko on jo viides samalla kukkulalla. Ensimmäinen '
            + 'rakennettiin 600-luvun alussa, ja edellinen, valtava '
            + 'goottilainen katedraali, tuhoutui suurpalossa 1666. Uuden '
            + 'suunnittelija Christopher Wren oli koulutukseltaan '
            + 'tähtitieteilijä. Rakennusten piirtämisestä tuli hänelle '
            + 'sivutyö, joka kesti loppuelämän.'
          + '\n\n'
          + 'Wren teki ehdotuksestaan valtavan puumallin, jonka sisään '
            + 'pystyi kävelemään. Se hylättiin, ja pettynyt Wren päätti, '
            + 'ettei tee enää malleja eikä näytä piirustuksiaan kenellekään '
            + 'kesken työn. Malli seisoo yhä katedraalissa, ja siitä näkee '
            + 'kirkon, jota ei koskaan rakennettu.'
          + '\n\n'
          + 'Kupoli näyttää yksinkertaiselta, mutta niitä on kolme '
            + 'sisäkkäin. Alimpana on matala kupoli, jonka näkee '
            + 'kirkkosalista. Sen päällä nousee piiloon jäävä tiilikartio, '
            + 'joka kantaa kivilyhdyn painon. Päällimmäisenä on puusta ja '
            + 'lyijystä tehty ulkokuori, joka näyttää kaupungille komealta. '
            + 'Ketjut estävät kartiota leviämästä.'
          + '\n\n'
          + 'Kupolin sisäreunaa kiertää 30 metrin korkeudessa '
            + 'Kuiskausgalleria. Seinää vasten kuiskattu sana kulkee pyöreää '
            + 'seinämää pitkin ja kuuluu selvästi gallerian toisella puolella '
            + 'yli kolmenkymmenen metrin päässä. Ylös nousee 259 porrasta, ja '
            + 'lattia näkyy alhaalla mustavalkoisena ruutukuviona.'
          + '\n\n'
          + 'Pommitusten aikana kirkosta tuli koko maan symboli. Syyskuussa '
            + '1940 katedraalin viereen uponnut aikasytytteinen pommi '
            + 'kaivettiin varovasti esiin ja vietiin pois. Kun se myöhemmin '
            + 'räjäytettiin turvallisessa paikassa, jälkeen jäi 30 metriä '
            + 'leveä kuoppa. Joulukuun 29. yönä 1940 otettu valokuva savun '
            + 'keskellä seisovasta kupolista kiersi maailman.'
          + '\n\n'
          + 'Wren kuoli 91-vuotiaana 1723 ja on haudattu oman kirkkonsa '
            + 'kryptaan. Hänen hautakivensä on tarkoituksella tavallinen ja '
            + 'kirjoitus lyhyt. Sama lause on kaiverrettu myös mustaan '
            + 'marmoriin keskelle kirkon lattiaa, suoraan kupolin alle.',
        lainaus: {
          teksti: 'Lukija, jos etsit hänen muistomerkkiään — katso ympärillesi.',
          lahde: 'Christopher Wrenin hautakiven latinankielinen teksti kryptassa: LECTOR SI MONUMENTUM REQUIRIS CIRCUMSPICE',
        },
        kuvat: [
          {
            tiedosto: 'St Paul\'s Cathedral Dome 2020 Exterior Ground.jpg',
            selite: 'Kupoli läheltä. Lyijypinta on jaettu kaariin, huipulla on '
              + 'kivinen lyhty ja sen päällä kullattu pallo ja risti. Alla '
              + 'kiertää pylväsrivi.',
            lahde: 'Julian Herzog, Wikimedia Commons (CC BY 4.0)',
          },
          {
            tiedosto: 'The Great Model, St. Paul\'s Cathedral-24717030761.jpg',
            selite: 'Wrenin hylätty puumalli holvatussa salissa. Malli on niin '
              + 'suuri, että sen kylkeen tehdystä oviaukosta mahtuu ihminen '
              + 'sisään katsomaan.',
            lahde: 'The National Churches Trust, Wikimedia Commons (CC BY 2.0)',
          },
          {
            tiedosto: 'St Paul\'s Cathedral Nave, London, UK - Diliff.jpg',
            selite: 'Kirkkosali kohti kupolia. Lattia on mustavalkoista '
              + 'marmoriruutua, tuolirivit johtavat eteenpäin, ja kullatut '
              + 'kruunut riippuvat vaaleiden kaarien välissä.',
            lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
          },
          {
            tiedosto: 'St Paul\'s Cathedral – Whispering Gallery.jpg',
            selite: 'Näkymä Kuiskausgalleriasta alas. Kupolin maalaukset '
              + 'kaartuvat yllä, ja ruutulattia näkyy syvällä alhaalla '
              + 'pienine ihmisineen.',
            lahde: 'JackPeasePhotography, Wikimedia Commons (CC BY 2.0)',
          },
          {
            tiedosto: 'St Paul\'s Survives.jpg',
            selite: 'Kupoli kohoaa savupilvien yläpuolelle joulukuun 1940 '
              + 'pommitusyönä. Etualalla palavien talojen katot ja oikealla '
              + 'tulen kajo.',
            lahde: 'Herbert Mason, Wikimedia Commons (PD)',
          },
        ],
      },
      {
        nimi: 'Tower Bridge',
        lat: 51.5055,
        lon: -0.0754,
        wiki: 'Tower Bridge',
        aika: '1886–1894',
        teksti: 'Sillan piti ratkaista mahdoton tehtävä: itä-Lontoo tarvitsi '
            + 'ylityspaikan, mutta purjelaivojen oli yhä päästävä satamaan '
            + 'sillan kohdalta. Ehdotuksia tuli yli viisikymmentä. Laki '
            + 'määräsi lopulta, että aukon on oltava 61 metriä leveä ja '
            + 'avattuna 41 metriä korkea — ja että silta avataan laivalle '
            + 'koska tahansa, ruuhkasta riippumatta.'
          + '\n\n'
          + 'Tornit näyttävät keskiaikaisilta, mutta se on kuori. Sisällä '
            + 'on teräsluuranko, johon meni yli 11 000 tonnia terästä. Päälle '
            + 'ladottiin cornwallilaista graniittia ja Portlandin '
            + 'kalkkikiveä, koska laki vaati, että uuden sillan pitää sopia '
            + 'yhteen viereisen Lontoon Towerin kanssa.'
          + '\n\n'
          + 'Avautuva osa on jaettu kahteen läppään, ja kumpikin painaa '
            + 'noin 1 070 tonnia. Vastapainot tekevät nostosta niin kevyen, '
            + 'että läpät nousevat viidessä minuutissa. Ensimmäisen vuoden '
            + 'aikana silta avattiin 6 160 kertaa, keskimäärin 17 kertaa '
            + 'päivässä. Laivalla on yhä etuajo-oikeus auton edelle.'
          + '\n\n'
          + 'Tornien väliin rakennettiin yläkäytävät, jotta jalankulkijat '
            + 'pääsisivät yli sillan ollessa auki. Kukaan ei kuitenkaan '
            + 'jaksanut kiivetä portaita, ja käytävistä tuli taskuvarkaiden '
            + 'paikka. Ne suljettiin 1910 ja avattiin uudelleen 1982. Vuonna '
            + '2014 niihin asennettiin lasilattiat, joiden läpi näkee 42 '
            + 'metriä alas.'
          + '\n\n'
          + 'Joulukuun lopussa 1952 bussi oli sillalla, kun eteläinen läppä '
            + 'alkoi vahingossa nousta. Kuljettaja Albert Gunter painoi '
            + 'kaasun pohjaan ja hyppäsi lähes kahden metrin kuilun yli '
            + 'pohjoiselle läpälle, joka ei ollut vielä liikkunut. Rahastaja '
            + 'mursi jalkansa, ja kuljettaja sai kymmenen punnan bonuksen.'
          + '\n\n'
          + 'Silta sekoitetaan jatkuvasti naapuriinsa London Bridgeen. Kun '
            + 'vanha London Bridge myytiin 1968 amerikkalaiselle '
            + 'liikemiehelle ja koottiin uudelleen Arizonan aavikolle, syntyi '
            + 'sitkeä tarina, että ostaja luuli saavansa juuri tämän sillan. '
            + 'Ostaja kiisti sen koko loppuikänsä. Silta seisoo yhä Lake '
            + 'Havasu Cityssä.',
        kuvat: [
          {
            tiedosto: 'Puente de la Torre, Londres, Inglaterra, 2022-11-26, DD 145.jpg',
            selite: 'Silta läheltä joelta. Kaksi kivistä tornia, niiden välissä '
              + 'yläkäytävät, ja sivuille kaartuvat siniset riippuketjut.',
            lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
          },
          {
            tiedosto: 'View of the raised bascule of Tower Bridge - geograph.org.uk - 4072106.jpg',
            selite: 'Läppä pystyssä ajoradan tasolta katsottuna: tie seisoo '
              + 'mustana seinänä, keskiviiva pystysuorassa. Punainen '
              + 'liikennevalo palaa ja ihmiset odottavat.',
            lahde: 'Robert Lamb, Wikimedia Commons (CC BY-SA 2.0)',
          },
          {
            tiedosto: 'Cassier\'s Magazine - The Tower Bridge, London, on the Opening Day, June 30, 1894.jpg',
            selite: 'Avajaispäivä 30. kesäkuuta 1894 ylhäältä kuvattuna. Läpät '
              + 'ovat pystyssä, höyrylaivat kulkevat alitse ja rannat ovat '
              + 'mustanaan väkeä.',
            lahde: 'Valentine & Sons, Wikimedia Commons (PD)',
          },
          {
            tiedosto: 'Tower Bridge walkway.jpg',
            selite: 'Yläkäytävän lasilattia. Kengät seisovat lasin päällä, ja sen '
              + 'läpi näkyy ajorata autoineen ja pyöräilijöineen kymmenien '
              + 'metrien alapuolella.',
            lahde: 'Tristan Surtel, Wikimedia Commons (CC BY-SA 4.0)',
          },
          {
            tiedosto: 'London Bridge, Lake Havasu City, Arizona (3227888290).jpg',
            selite: 'Vanha London Bridge uudessa paikassaan Arizonassa. Samat '
              + 'harmaat kiviholvit kaartuvat vihertävän veden yli, taustalla '
              + 'palmuja ja aavikkotaloja.',
            lahde: 'Ken Lund, Wikimedia Commons (CC BY-SA 2.0)',
          },
        ],
      },
    ],
  },
  berliini: {
    /*
     * Ydinkeskustan julistekartta (omistajan tarkennus 7.8.2026:
     * ensimmäinen versio oli "liian epämääräinen ja liian laajalta
     * alalta" — malliksi näytetty Mapiful-juliste). Piirretty itse
     * OpenStreetMap-aineistosta pelin sävyihin:
     * tools/piirra-kaupunkikartta.mjs. Paikallinen tiedosto — ei
     * riipu verkosta eikä Commonsista.
     */
    polku: 'assets/kartat/berliini-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 52.54, etela: 52.485, lansi: 13.34, ita: 13.46 },
    esittely: 'Berliini on rakennettu veden ja metsän keskelle: '
      + 'siltoja on noin 1 700 — moninkertaisesti Venetsian verran — '
      + 'ja kolmasosa kaupungista on puistoa, metsää tai järveä. '
      + 'Vaakunassa seisoo musta karhu, ja karhupatsaita tulee '
      + 'kaduilla vastaan vähän väliä.\n\nKylmän sodan jäljet näkyvät '
      + 'yhä: muurin linja on merkitty keskustaan katukiveyksen '
      + 'kaksoisrivinä, ja idän ja lännen katuvalot hohtavat öisin '
      + 'eri sävyissä. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Järjestys on kartan numerointi (omistajan taittopäätös
       * 7.8.2026: numeroympyrät kartalla, selitteet tekstinä sen
       * ulkopuolella) — lännestä itään, jotta numerot etenevät
       * kartalla luontevasti. Jokaisen wiki on tarkistettu
       * fi.wikipedian artikkeli.
       */
      { nimi: 'Valtiopäivätalo', lat: 52.5186, lon: 13.3762, wiki: 'Valtiopäivätalo (Saksa)' },
      { nimi: 'Brandenburgin portti', lat: 52.5163, lon: 13.3777, wiki: 'Brandenburgin portti' },
      { nimi: 'Checkpoint Charlie', lat: 52.5076, lon: 13.3904, wiki: 'Checkpoint Charlie' },
      { nimi: 'Museosaari', lat: 52.5169, lon: 13.401, wiki: 'Museumsinsel' },
      { nimi: 'Tv-torni', lat: 52.5208, lon: 13.4094, wiki: 'Berliinin televisiotorni' },
      { nimi: 'East Side Gallery', lat: 52.505, lon: 13.4399, wiki: 'East Side Gallery' },
    ],
  },
  madrid: {
    /*
     * Sama työkalu kuin muissa. Madrid oli näistä vaikein rajata:
     * ydinkeskusta on tiheää pikkukatua ilman jokea tai rantaa, ja
     * ensimmäinen väljempi rajaus muuttui pelkäksi verkoksi, jossa
     * mikään ei erottunut. Kiristetty rajaus tuo esiin sen, mikä
     * Madridissa on selkärankaa: Retiron puisto idässä, kuninkaanlinnan
     * puutarhat lännessä ja niiden välissä Prado-akseli.
     */
    polku: 'assets/kartat/madrid-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 40.43, etela: 40.406, lansi: -3.72, ita: -3.675 },
    esittely: 'Madrid oli pieni linnoituskaupunki, kunnes kuningas '
      + 'Filip II siirsi hovinsa tänne vuonna 1561. Sen jälkeen '
      + 'kaupunki kasvoi ulospäin keskustastaan kuin puu '
      + 'vuosirenkaineen, ja kartalla se näkyy yhä: vanhat kadut '
      + 'mutkittelevat kapeina, uudemmat kulkevat suorina ja '
      + 'leveinä.\n\nPuerta del Solin kiveyksessä on laatta, josta '
      + 'Espanjan tiet mitataan: se on kilometri nolla, ja maan '
      + 'päätiet lähtevät siitä ulospäin kuin kellotaulun viisarit. '
      + 'Kartan itälaidan iso vihreä on Retiro, entinen kuninkaan '
      + 'puutarha, joka siirtyi kaupungille ja kaikkien käyttöön vasta '
      + '1868. Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään, eli kuninkaanlinnalta Retiron portille.
       * Jokaisen wiki on tarkistettu fi.wikipedian artikkeli;
       * Gran Vía ja Retiron puisto jäivät pois, koska niistä ei ole
       * suomenkielistä artikkelia.
       */
      { nimi: 'Kuninkaanlinna', lat: 40.418, lon: -3.7143, wiki: 'Palacio Real de Madrid' },
      { nimi: 'Plaza Mayor', lat: 40.4155, lon: -3.7074, wiki: 'Plaza Mayor' },
      { nimi: 'Puerta del Sol', lat: 40.4169, lon: -3.7033, wiki: 'Puerta del Sol' },
      { nimi: 'Cibeleen aukio', lat: 40.4192, lon: -3.6931, wiki: 'Plaza de Cibeles' },
      { nimi: 'Prado-museo', lat: 40.4138, lon: -3.6921, wiki: 'Museo del Prado' },
      { nimi: 'Alcalán portti', lat: 40.42, lon: -3.6889, wiki: 'Puerta de Alcalá' },
    ],
  },
  tukholma: {
    /*
     * Tukholma pakotti työkaluun rantaviivan tuen. Ensimmäinen ajo
     * antoi kaupungin, jonka keskellä oli tyhjiä peltoja: Saltsjön ja
     * Riddarfjärden ovat OSM:ssä rantaviivaa ja monikulmiorelaatioita,
     * eivät tavallisia vesialueita, joten ne jäivät kokonaan pois.
     * Nyt molemmat piirtyvät rantanauhana — ks. tools/
     * piirra-kaupunkikartta.mjs. Vesi on Tukholmassa kartan pääpiirre,
     * joten ilman sitä kuvaa ei olisi voinut julkaista.
     */
    polku: 'assets/kartat/tukholma-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 59.342, etela: 59.313, lansi: 18.03, ita: 18.11 },
    esittely: 'Tukholma seisoo siinä, missä Mälaren-järvi purkautuu '
      + 'Itämereen. Kapeikossa vesi virtaa kuin joessa — sen nimi on '
      + 'Strömmen, ja siinä saa onkia lohta keskellä kaupunkia. Juuri '
      + 'tämä paikka teki kaupungista tärkeän: 1200-luvulla salmi '
      + 'suljettiin paaluilla, jotka pysäyttivät vieraat laivat ennen '
      + 'järveä.\n\nKartan keskellä on Gamla stan, vanhakaupunki, '
      + 'jonka kujat kiertelevät samoja mutkia kuin keskiajalla. '
      + 'Kapein niistä on 90 senttiä leveä. Idässä levittäytyy '
      + 'Djurgården, entinen kuninkaan metsästyspuisto, jossa ovat nyt '
      + 'museot ja huvipuisto. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Lännestä itään: kaupungintalolta Skansenille. Jokaisen wiki on
       * tarkistettu fi.wikipedian artikkeli. Stortorget ja
       * Riddarholmenin kirkko ovat molemmat jo kannen kuvateksteissä,
       * joten kartalle otettiin kirkko ja aukio jätettiin pois —
       * kuninkaanlinna on sata metriä siitä eikä numeroita kannata
       * kasata päällekkäin.
       */
      { nimi: 'Kaupungintalo', lat: 59.3275, lon: 18.0542, wiki: 'Tukholman kaupungintalo' },
      { nimi: 'Riddarholmenin kirkko', lat: 59.3247, lon: 18.064, wiki: 'Riddarholmskyrkan' },
      { nimi: 'Sergelin tori', lat: 59.3326, lon: 18.0649, wiki: 'Sergelin tori' },
      { nimi: 'Kuninkaanlinna', lat: 59.3268, lon: 18.0717, wiki: 'Tukholman kuninkaanlinna' },
      { nimi: 'Vasa-museo', lat: 59.328, lon: 18.0915, wiki: 'Vasa-museo' },
      { nimi: 'Skansen', lat: 59.3255, lon: 18.1035, wiki: 'Skansen' },
    ],
  },
  venetsia: {
    /*
     * Sama työkalu kuin muissa. Venetsia on kartantekijälle poikkeus
     * kahdesti: kujat ovat OSM:ssä jalankulkuteitä (yli 5 000
     * pedestrian-tietä rajauksen sisällä, mikä on juuri se ohuin
     * katuluokka) ja laguuni on rantaviiva eikä vesialue, joten se
     * jää paperin väriseksi. Siksi rajaus on kiristetty saariryhmän
     * ympärille: ensimmäinen, väljempi rajaus jätti oikeaan
     * yläkulmaan ison tyhjän laguunin.
     */
    polku: 'assets/kartat/venetsia-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 45.445, etela: 45.4265, lansi: 12.3155, ita: 12.352 },
    esittely: 'Venetsia on rakennettu 118 saarelle keskelle matalaa '
      + 'laguunia. Talot seisovat miljoonien puupaalujen varassa, '
      + 'jotka lyötiin pohjamutaan satoja vuosia sitten ja ovat '
      + 'säilyneet hapettomassa liejussa kovina kuin kivi. Saaret on '
      + 'ommeltu yhteen sadoilla silloilla, ja jokainen niistä '
      + 'ylitetään jalan.\n\nKartan halki kaartaa S-kirjaimen '
      + 'muotoinen Canal Grande, kaupungin pääkatu: se on lähes neljä '
      + 'kilometriä pitkä, ja sen yli pääsee kuivin jaloin vain '
      + 'neljästä kohdasta. Muualla kanavan ylittää traghetto, iso '
      + 'gondoli, jossa matkustajat seisovat koko matkan ajan. Kartan '
      + 'kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi seuraa Canal Grandea lännestä itään, eli samassa
       * järjestyksessä kuin vaporetto ajaa. Jokaisen wiki on
       * tarkistettu fi.wikipedian artikkeli — Accademian sillalla,
       * Ca' d'Orolla ja Santa Lucian asemalla sellaista ei ole, joten
       * ne jäivät pois.
       */
      { nimi: 'Canal Grande', lat: 45.4415, lon: 12.3283, wiki: 'Canal Grande' },
      { nimi: 'La Fenicen oopperatalo', lat: 45.4336, lon: 12.3336, wiki: 'La Fenice' },
      { nimi: 'Rialton silta', lat: 45.438, lon: 12.3359, wiki: 'Rialton silta' },
      { nimi: 'Pyhän Markuksen tori', lat: 45.4341, lon: 12.3387, wiki: 'Pyhän Markuksen tori' },
      { nimi: 'San Giorgio Maggiore', lat: 45.4294, lon: 12.3433, wiki: 'San Giorgio Maggiore' },
      { nimi: 'Arsenaali', lat: 45.4348, lon: 12.3496, wiki: 'Arsenale' },
    ],
  },
  rooma: {
    polku: 'assets/kartat/rooma-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 41.9135, etela: 41.8845, lansi: 12.4455, ita: 12.5005 },
    esittely: 'Rooma syntyi Tiberin mutkaan noin 25 kilometriä merestä '
      + 'ylävirtaan, ja paikan valitsi joki. Keskellä virtaa on saari, '
      + 'Isola Tiberina, joka jakaa uoman kahdeksi kapeaksi haaraksi. '
      + 'Siinä kohtaa joen yli pääsi kahlaamalla, eikä toista yhtä '
      + 'helppoa ylityspaikkaa ollut pitkään matkaan. Kahlaamon '
      + 'ympärillä kohoaa seitsemän kukkulaa, ja niiden välinen suo '
      + 'kuivattiin viemärillä nimeltä Cloaca Maxima. Kuivatusta '
      + 'notkosta tuli Forum Romanum, kaupungin tori.\n\nKartalla Tiber '
      + 'tulee alhaalta, tekee kaksi jyrkkää mutkaa ja poistuu '
      + 'ylälaidasta. Vasemmalle puolelle jokea jää Vatikaani, '
      + 'oikealle vanhakaupunki. Sen kujaverkko on niin sekava, että '
      + 'muutamat suorat kadut erottuvat siitä heti — ne on puhkaistu '
      + 'talojen läpi vasta myöhemmin. Oikeassa alalaidassa katuverkko '
      + 'harvenee ja tilalle tulee antiikin alue: siellä ovat Forum ja '
      + 'Colosseum. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Numerointi kulkee lännestä itään, eli samassa järjestyksessä
       * kuin kävelijä ylittää joen ja etenee antiikin puolelle.
       *
       * Trevin wiki on fi.wikipedian kanoninen otsikko Fontana di
       * Trevi; lehden nostossa on sama artikkeli ohjauksen kautta.
       * Castel Sant’Angelossa on kaareva heittomerkki (U+2019) —
       * suora heittomerkki antaa 404:n.
       */
      { nimi: 'Pietarinkirkko', lat: 41.9022, lon: 12.4534, wiki: 'Pietarinkirkko' },
      { nimi: 'Castel Sant’Angelo', lat: 41.9031, lon: 12.4664, wiki: 'Castel Sant’Angelo' },
      { nimi: 'Espanjalaiset portaat', lat: 41.9061, lon: 12.4828, wiki: 'Espanjalaiset portaat' },
      { nimi: 'Trevin suihkulähde', lat: 41.9008, lon: 12.4831, wiki: 'Fontana di Trevi' },
      { nimi: 'Pantheon', lat: 41.8986, lon: 12.4769, wiki: 'Pantheon (Rooma)' },
      { nimi: 'Colosseum', lat: 41.8902, lon: 12.4922, wiki: 'Colosseum' },
    ],
  },
  krakova: {
    polku: 'assets/kartat/krakova-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 50.069, etela: 50.047, lansi: 19.9225, ita: 19.9585 },
    esittely: 'Krakova kasvoi Veikselin rannalle kalkkikivikukkulan '
      + 'juurelle. Kukkula on Wawel, ja se on täynnä reikiä: kalkkikiveen '
      + 'on liuennut luolia, ja suurin niistä avautuu suoraan joen '
      + 'rantaan. Sitä sanotaan Lohikäärmeen luolaksi. Kaupunki paloi '
      + 'mongolien hyökkäyksessä vuonna 1241 ja rakennettiin uudestaan '
      + '1257 kokonaan uudella kaavalla: suorakulmainen ruudukko, jonka '
      + 'keskellä on kaksisataa metriä sivultaan oleva tori. Se on yhä '
      + 'Euroopan suurimpia keskiaikaisia toreja.\n\nKartan keskellä '
      + 'näkyy soikea vihreä kehä. Siinä kulki kaupunginmuuri, joka '
      + 'purettiin 1820-luvulla, ja tilalle istutettiin puistovyö nimeltä '
      + 'Planty. Muurista jätettiin pystyyn vain pohjoispää: Barbakaani '
      + 'ja sen takana yksi portti. Kehän sisällä ovat ruudukko ja tori, '
      + 'etelässä Wawelin kukkula joen mutkassa, ja siitä alas oikealle '
      + 'Kazimierz, joka oli 1300-luvulta 1800-luvun alkuun oma '
      + 'kaupunkinsa Krakovan vieressä. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään: Barbakaanilta Plantyn kehän
       * läpi Wawelin kukkulalle ja siitä Kazimierziin.
       *
       * Kolmelta kohteelta puuttuu wiki tahallaan. Barbakaanista ei ole
       * fi.wikipediassa omaa artikkelia — pelkkä Barbakaani kertoo
       * linnoituslaitteesta yleensä eikä Krakovasta. Wawelin
       * lohikäärmeestä ei ole artikkelia lainkaan, ja lehden nosto
       * linkittää sen jo Wawelin linnaan; sama linkki kahdesti kartalla
       * olisi harhaanjohtava. Collegium Maiuksen wiki osoittaa Jagellon
       * yliopistoon, koska rakennuksesta itsestään ei ole artikkelia.
       */
      { nimi: 'Barbakaani', lat: 50.0655, lon: 19.9417 },
      { nimi: 'Collegium Maius', lat: 50.0617, lon: 19.9337, wiki: 'Jagellon yliopisto' },
      { nimi: 'Mariankirkko', lat: 50.0617, lon: 19.9392, wiki: 'Mariankirkko (Krakova)' },
      { nimi: 'Wawelin linna', lat: 50.0544, lon: 19.9366, wiki: 'Wawelin linna' },
      { nimi: 'Wawelin lohikäärme', lat: 50.053, lon: 19.9336 },
      { nimi: 'Kazimierz', lat: 50.0517, lon: 19.9449, wiki: 'Kazimierz' },
    ],
  },
  varsova: {
    polku: 'assets/kartat/varsova-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 52.2535, etela: 52.2265, lansi: 20.9995, ita: 21.043 },
    esittely: 'Varsova seisoo Veikselin länsirannalla keskellä Puolan '
      + 'tasankoa. Veiksel on Puolan pisin joki, 1 047 kilometriä, eikä '
      + 'siinä ole yhtään patoa. Kaupunki syntyi tähän kohtaan kahdesta '
      + 'syystä. Länsirannalla kulkee jyrkkä törmä, jonka päältä näki '
      + 'kauas ja jota oli helppo puolustaa, ja törmän alla oli hyvä '
      + 'lastauspaikka: viljaa vietiin täältä lautoilla Itämerelle '
      + 'asti. Vuonna 1596 kuningas siirsi hovinsa Krakovasta tänne, ja '
      + 'kauppakaupungista tuli pääkaupunki.\n\nKartalla Veiksel tulee '
      + 'ylhäältä ja kaartaa oikeaan alanurkkaan. Joki on tässä kohtaa '
      + 'noin 350 metriä leveä, ja vedessä näkyy pitkiä hiekkasaaria: '
      + 'kun jokea ei ole padottu, hiekka pääsee liikkumaan ja saaret '
      + 'vaihtavat paikkaa. Ylhäällä vasemmalla erottuu vanhankaupungin '
      + 'tiivis kujaverkko. Se rakennettiin sodan jälkeen uudelleen, ja '
      + 'apuna käytettiin Bernardo Bellotton 1700-luvulla maalaamia '
      + 'kaupunkinäkymiä: niistä laskettiin ikkunat ja koristeet '
      + 'takaisin paikoilleen. Alhaalla vasemmalla aukeaa iso tyhjä '
      + 'kenttä, ja sen keskellä seisoo Kulttuuri- ja tiedepalatsi, '
      + 'Neuvostoliiton lahja vuodelta 1955. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään, eli Kuninkaantietä pitkin
       * vanhastakaupungista Kulttuuri- ja tiedepalatsille.
       *
       * Nimet ovat Varsovan linna ja Varsovan kansallismuseo, koska
       * pelkkä Kuninkaanlinna on jo Madridissa ja Tukholmassa ja
       * Kansallismuseo Prahassa.
       *
       * Vanhankaupungin torista, Kopernikuksen tiedekeskuksesta ja
       * kansallismuseosta ei ole fi.wikipediassa artikkelia. Puolan
       * kansallismuseo on olemassa mutta kertoo museoverkostosta eikä
       * tästä rakennuksesta — älä linkitä siihen.
       */
      { nimi: 'Vanhankaupungin tori', lat: 52.2498, lon: 21.0122 },
      { nimi: 'Varsovan linna', lat: 52.2479, lon: 21.0152, wiki: 'Varsovan linna' },
      { nimi: 'Kopernikuksen tiedekeskus', lat: 52.2419, lon: 21.0286 },
      {
        nimi: 'Pyhän ristin kirkko',
        lat: 52.2387,
        lon: 21.0168,
        wiki: 'Pyhän ristin kirkko (Varsova)',
      },
      { nimi: 'Varsovan kansallismuseo', lat: 52.2317, lon: 21.0248 },
      {
        nimi: 'Kulttuuri- ja tiedepalatsi',
        lat: 52.2318,
        lon: 21.0062,
        wiki: 'Kulttuurin ja tieteen palatsi',
      },
    ],
  },
  tallinna: {
    polku: 'assets/kartat/tallinna-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 59.4505, etela: 59.431, lansi: 24.7275, ita: 24.769 },
    esittely: 'Tallinna on Suomenlahden etelärannalla, 80 kilometrin '
      + 'päässä Helsingistä. Rannassa on suojaisa lahti, johon laivat '
      + 'pääsevät tuulelta piiloon, ja aivan sen vieressä kohoaa '
      + 'kalkkikivikallio Toompea. Kallion päälle rakennettiin linna ja '
      + 'sen juurelle kauppiaiden kaupunki. Paikka oli keskellä '
      + 'kauppatietä: Novgorodista tuleva turkis ja vaha vaihtoivat '
      + 'täällä laivaa matkalla länteen. Tallinna liittyi hansaan '
      + 'vuonna 1285, ja kauppa toi rahat, joilla muuri '
      + 'rakennettiin.\n\nKartan yläreunassa on meri ja satama, jonka '
      + 'laiturit työntyvät veteen kuin sormet. Sieltä lähtee lautta '
      + 'Helsinkiin. Keskellä näkyy soikea rengas: siinä kulki '
      + 'kaupunginmuuri. Sen sisään jäi 35 hehtaaria eli noin '
      + 'viidenkymmenen jalkapallokentän verran maata, ja muurista on '
      + 'yhä pystyssä 1,85 kilometriä ja 28 tornia. Renkaan sisällä '
      + 'kadut mutkittelevat, ulkopuolella ne suoristuvat. Renkaan '
      + 'vasemmassa laidassa on oma tasaisempi laikkunsa: se on '
      + 'Toompean kallio, jonne alakaupungista nousee vain kaksi '
      + 'katua. Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään, lopuksi satama.
       *
       * Nimet ovat Raatihuoneentori ja Matkustajasatama, koska pelkkä
       * Raatihuone on jo Wienissä ja Vanhasatama Marseillessa.
       * Nevskin katedraali on lyhennetty selite: koko nimi on 30
       * merkkiä eli pidempi kuin yksikään muu kartan kohde.
       *
       * Paksusta Margareetasta ja Virun portista ei ole
       * fi.wikipediassa artikkelia. Ansa: pelkkä Raatihuoneentori on
       * täsmennyssivu, joten linkki osoittaa raatihuoneeseen.
       */
      { nimi: 'Paksu Margareeta', lat: 59.4426, lon: 24.7496 },
      { nimi: 'Olevisten kirkko', lat: 59.4413, lon: 24.7479, wiki: 'Olevisten kirkko' },
      { nimi: 'Raatihuoneentori', lat: 59.4369, lon: 24.7453, wiki: 'Tallinnan raatihuone' },
      {
        nimi: 'Nevskin katedraali',
        lat: 59.4357,
        lon: 24.7393,
        wiki: 'Aleksanteri Nevskin katedraali (Tallinna)',
      },
      { nimi: 'Virun portti', lat: 59.4365, lon: 24.7503 },
      { nimi: 'Matkustajasatama', lat: 59.4448, lon: 24.7618, wiki: 'Tallinnan satama' },
    ],
  },
  sofia: {
    polku: 'assets/kartat/sofia-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 42.705, etela: 42.681, lansi: 23.312, ita: 23.345 },
    esittely: 'Sofia on tasaisessa laaksossa noin 550 metrin '
      + 'korkeudessa. Etelässä kohoaa Vitosha-vuori ja pohjoisessa '
      + 'Balkanvuoret, ja niiden välinen sola on ollut kulkureitti '
      + 'Keski-Euroopasta Istanbuliin. Kaupunki syntyi silti veden '
      + 'takia: maan alla on 49 kivennäis- ja lämpölähdettä, ja '
      + 'roomalaiset rakensivat niiden ympärille kaupungin nimeltä '
      + 'Serdica. Keskustan hanoista tulee yhä lämmintä lähdevettä. '
      + 'Isoa jokea täällä ei ole, vain kaksi pientä: Vladajska ja '
      + 'Perlovska.\n\nKartalla sen näkee heti: leveät bulevardit '
      + 'lähtevät keskustasta säteinä joka suuntaan kuin pyörän puolat, '
      + 'eikä yksikään joki katkaise niitä. Keskeltä oikealta erottuu '
      + 'soikea aukio, ja sen keskellä seisoo Aleksanteri Nevskin '
      + 'katedraali. Alaoikealla kulkee vinosti vaalea nauha: se on '
      + 'Perlovska, joka on kaivettu aivan suoraksi. Nauhan takana '
      + 'levittäytyy Borisovan puutarha polkuineen ja järvineen. '
      + 'Alavasemmalla on iso aukea, jonka reunassa kohoaa '
      + 'Kansalliskulttuuripalatsi. Vanha keskusta on ylhäällä '
      + 'vasemmalla, mutta se ei erotu: siellä kadut vain tihenevät. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään.
       *
       * Nimi on Sofian katedraali eikä Nevskin katedraali, koska
       * jälkimmäinen on jo Tallinnassa. Wiki on pakko antaa
       * sulkumuodossa: pelkkä Aleksanteri Nevskin katedraali on
       * fi.wikipediassa täsmennyssivu, joka luettelee kuusi kirkkoa.
       *
       * Neljältä kohteelta puuttuu wiki, koska fi.wikipedian
       * Sofia-kattavuus on ohut: mineraalikylpylästä, rotundasta,
       * Borisovan puutarhasta eikä kulttuuripalatsista ole artikkelia.
       * Banja Bashin moskeija, synagoga ja Serdican rauniot jäivät
       * listalta pois kahdesta syystä: niistäkään ei ole artikkelia, ja
       * ne ovat 3–6 prosenttiyksikön päässä kylpylästä eli numerot
       * menisivät päällekkäin.
       */
      { nimi: 'Mineraalikylpylä', lat: 42.69923, lon: 23.3238 },
      { nimi: 'Pyhän Yrjön rotunda', lat: 42.69689, lon: 23.32288 },
      {
        nimi: 'Sofian katedraali',
        lat: 42.69581,
        lon: 23.33279,
        wiki: 'Aleksanteri Nevskin katedraali (Sofia)',
      },
      { nimi: 'Sofian yliopisto', lat: 42.69354, lon: 23.33528, wiki: 'Sofian yliopisto' },
      { nimi: 'Borisovan puutarha', lat: 42.6893, lon: 23.3372 },
      { nimi: 'Kansalliskulttuuripalatsi', lat: 42.68476, lon: 23.31894 },
    ],
  },
  bukarest: {
    polku: 'assets/kartat/bukarest-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 44.4445, etela: 44.4235, lansi: 26.08, ita: 26.109 },
    kainalot: [
      { rajat: { pohjoinen: 44.4565, etela: 44.4475, lansi: 26.081, ita: 26.094 },
        x: 3, y: 9, leveys: 26, korkeus: 24.86 },
    ],
    esittely: 'Bukarest on keskellä Valakian tasankoa, Karpaattien ja '
      + 'Tonavan välissä. Tonavalle on täältä noin 60 kilometriä '
      + 'etelään. Kaupunki kasvoi Dâmbovița-joen varteen: joki toi '
      + 'veden, ja ympärillä oli tammimetsää ja soita, joiden suojaan '
      + 'oli helppo kadota. Ensimmäisen kerran Bukarest mainitaan '
      + 'asiakirjassa vuonna 1459, ja sen antoi ruhtinas Vlad III. '
      + 'Dâmbovița on 286 kilometriä pitkä ja laskee '
      + 'Argeș-jokeen.\n\nKartan halki kulkee vaalea, hämmästyttävän '
      + 'suora nauha. Se on Dâmbovița, joka kaivettiin 1880-luvulla '
      + 'suoraksi kanavaksi, jottei se enää tulvisi. Ylhäällä '
      + 'vasemmalla on iso vihreä laikku ja sen keskellä mutkitteleva '
      + 'järvi: Cișmigiun puutarha. Oikealla erottuu sokkelo kapeita '
      + 'kujia — se on vanhakaupunki, ainoa osa Bukarestia, jossa kadut '
      + 'eivät ole suoria. Alhaalla vasemmalla ammottaa outo tyhjä '
      + 'alue: siellä seisoo Parlamenttipalatsi, jonka tieltä purettiin '
      + 'kokonainen kaupunginosa. Vasemmassa ylänurkassa on oma pieni '
      + 'kartta kilometrin päästä pohjoisesta, ja sen tähtimäisessä '
      + 'risteyksessä seisoo Antipan museo. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään: ateneumilta vanhaankaupunkiin
       * ja siitä lounaaseen Parlamenttipalatsille. Antipan museo on
       * viimeisenä, koska se on kainalossa eikä pääkuvassa.
       *
       * Cișmigiun koordinaatti on MITATTU KUVASTA eikä haettu
       * hakukoneesta: Nominatim palauttaa puiston osoitepisteen
       * kaakkoiskulman kadulta, ja se osuisi puiston ulkopuolelle.
       *
       * Viideltä puuttuu wiki. ÄLÄ LINKITÄ sanaa Ateneum: se on ohjaus
       * täsmennyssivulle Athenaion, joka kertoo antiikin
       * Athene-temppeleistä. Älä myöskään linkitä muotoa Dâmbovița —
       * sekin on täsmennyssivu, jokiartikkeli on Dâmbovița (joki).
       *
       * Vanhan ruhtinaanhovin wiki osoittaa Vlad III:een, koska
       * hovista itsestään ei ole artikkelia — sama ratkaisu kuin
       * Granadan Manuel de Fallan talossa ja Wienin jättirattaassa.
       * Vlad rakennutti hovin, ja hänen asiakirjansa vuodelta 1459 on
       * Bukarestin ensimmäinen maininta.
       */
      { nimi: 'Romanian ateneum', lat: 44.44136, lon: 26.09736 },
      { nimi: 'Cișmigiun puutarha', lat: 44.4372, lon: 26.0906 },
      { nimi: 'Yliopiston aukio', lat: 44.43497, lon: 26.10088 },
      { nimi: 'Stavropoleoksen kirkko', lat: 44.43178, lon: 26.09883 },
      { nimi: 'Vanha ruhtinaanhovi', lat: 44.43011, lon: 26.10131, wiki: 'Vlad III' },
      {
        nimi: 'Parlamenttipalatsi',
        lat: 44.42751,
        lon: 26.08725,
        wiki: 'Romanian parlamenttitalo',
      },
      // Kainalossa vasemmassa ylänurkassa.
      { nimi: 'Antipan museo', lat: 44.4526, lon: 26.0858 },
    ],
  },
  sarajevo: {
    polku: 'assets/kartat/sarajevo-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 43.8655, etela: 43.8535, lansi: 18.412, ita: 18.445 },
    esittely: 'Sarajevo on kapeassa laaksossa noin 500 metrin '
      + 'korkeudessa. Laakson pohjalla virtaa Miljacka-joki, ja joka '
      + 'suunnalla kohoaa vuoria: Trebević, Jahorina, Bjelašnica ja '
      + 'Igman. Samoilla vuorilla hiihdettiin talviolympialaisissa '
      + 'vuonna 1984. Kaupunki syntyi kohtaan, jossa vuoristotie ylitti '
      + 'joen ja maasta nousi lähteitä. Osmanien käskynhaltija Isa-beg '
      + 'Ishaković rakennutti tänne 1460-luvulla basaarin, sillan ja '
      + 'majatalon, ja niiden ympärille kasvoi kaupunki. Nimi tulee '
      + 'turkin sanasta saray, joka tarkoittaa hallitsijan '
      + 'taloa.\n\nKartta on leveä ja matala, koska laakso on: taloja '
      + 'mahtuu vain idästä länteen. Miljacka kulkee kuvan halki '
      + 'vaaleana nauhana ja tekee oikealla suuren mutkan, jossa laakso '
      + 'kapenee rotkoksi. Joen yläpuolella rinne on täynnä ohuita '
      + 'mutkittelevia katuja, jotka kiipeävät ylös. Alapuolella '
      + 'Trebevićin rinne on melkein tyhjä: se on liian jyrkkä, ja '
      + 'sinne nousee vain muutama serpentiinitie. Keskellä erottuu '
      + 'tiheä kujaruudukko, ja se on Baščaršijan basaari. Kartan '
      + 'kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi lännestä itään, koska laakso kulkee niin.
       *
       * Pisteet 2, 3 ja 4 ovat ahtaammassa kuin missään muussa
       * kaupungissa: välit ovat 8,2 ja 7,9 prosenttiyksikköä. Syy on
       * maantieteessä — Baščaršijan kolme kärkikohdetta ovat oikeasti
       * 200–350 metrin päässä toisistaan. Rajan (5 pp) yli mennään,
       * mutta älä lisää tähän neljättä keskustapistettä.
       *
       * Sahat-kulan kellotorni on 40 metriä pisteestä 2 eikä siksi
       * mahdu erikseen, vaikka se on lehden nosto. Moskeija valittiin,
       * koska sillä on artikkeli ja kellotornilla ei.
       *
       * Latinalaissillasta ei ole artikkelia. ÄLÄ LINKITÄ sitä
       * artikkeliin Sarajevon laukaukset: lehden nosto käyttää jo sitä,
       * ja artikkeli kertoo salamurhasta eikä sillasta.
       *
       * Baščaršijan koordinaatti on Sebiljin vesikioski basaarin
       * pohjoislaidassa.
       */
      { nimi: 'Sarajevon katedraali', lat: 43.85943, lon: 18.42536 },
      {
        nimi: 'Gazi Husrev-begin moskeija',
        lat: 43.85915,
        lon: 18.429,
        wiki: 'Gazi Husrev-begin moskeija',
      },
      { nimi: 'Baščaršija', lat: 43.85972, lon: 18.43122 },
      { nimi: 'Vijećnica', lat: 43.85917, lon: 18.43335, wiki: 'Vijećnica' },
      { nimi: 'Latinalaissilta', lat: 43.85763, lon: 18.42893 },
      { nimi: 'Keltainen linnake', lat: 43.86146, lon: 18.43772 },
    ],
  },
  kiova: {
    polku: 'assets/kartat/kiova-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 50.47, etela: 50.44, lansi: 30.499, ita: 30.539 },
    esittely: 'Kiova seisoo Dneprin länsirannalla, kohdassa jossa joen '
      + 'törmä nousee jyrkäksi kukkulaksi. Paikka valittiin kahdesta '
      + 'syystä. Kukkulan laella oli helppo puolustautua, ja sen '
      + 'juurella, joen rannassa, oli suojaisa satama. Dnepr oli '
      + 'keskiajan valtatie: sitä pitkin kuljettiin pohjoisen metsistä '
      + 'etelän kaupunkeihin, ja Kiova oli matkan puolivälissä. Siksi '
      + 'kaupunki kasvoi kahteen kerrokseen: ylhäällä kirkkojen ja '
      + 'porttien yläkaupunki, alhaalla Podil eli alakaupunki.\n\nKartan '
      + 'yläreunassa on Podilin suora ruudukko aivan joen rannassa. Sen '
      + 'alapuolella levittäytyy vaalea vihreä vyö: se on jyrkkä rinne, '
      + 'jota pitkin noustaan ylös. Rinteen laella kadut kiemurtelevat, '
      + 'ja siellä ovat kartan vanhimmat kohteet. Oikeassa yläkulmassa '
      + 'kaartaa Dnepr. Se on niin leveä, ettei kartta piirrä sitä '
      + 'yhtenä vetenä: näkyviin tulevat vain sen rannat omina '
      + 'viivoinaan, ja niiden väliin jäävä vaalea kaista on itse joki. '
      + 'Keskeltä lähtee alaviistoon leveä '
      + 'katu, Hreštšatyk: se on 1,2 kilometriä pitkä ja kulkee '
      + 'Itsenäisyyden aukion halki. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään: Podilista rinnettä ylös
       * yläkaupunkiin ja siitä Hreštšatykia pitkin etelään.
       *
       * Kiovan funikulaari on lehden kansikuva ja olisi lapselle
       * kiinnostava, mutta se jätettiin pois kahdesta syystä: siitä ei
       * ole fi-artikkelia, eikä railway=funicular ole työkalun
       * kyselyssä — numero jäisi tyhjälle vihreälle rinteelle.
       *
       * ANSAT. Pelkkä Kultainen portti on yleissivu, joka luettelee
       * useita kultaisia portteja; oikea on Kiovan kultainen portti.
       * Mariinskin palatsi osoittaa PIETARIIN, ei Kiovaan — Kiovan
       * omasta palatsista ei ole artikkelia. Pyhän Andreaksen kirkko
       * ilman täsmennettä ohjautuu täsmennyssivulle.
       */
      { nimi: 'Kontraktovan aukio', lat: 50.4636, lon: 30.5178 },
      {
        nimi: 'Andreaksen kirkko',
        lat: 50.4589,
        lon: 30.5181,
        wiki: 'Pyhän Andreaksen kirkko (Kiova)',
      },
      {
        nimi: 'Pyhän Mikaelin luostari',
        lat: 50.4557,
        lon: 30.5227,
        wiki: 'Pyhän Mikaelin kultakupolinen luostari',
      },
      {
        nimi: 'Pyhän Sofian katedraali',
        lat: 50.4528,
        lon: 30.5144,
        wiki: 'Pyhän Sofian katedraali (Kiova)',
      },
      {
        nimi: 'Itsenäisyyden aukio',
        lat: 50.45,
        lon: 30.5242,
        wiki: 'Itsenäisyyden aukio (Kiova)',
      },
      {
        nimi: 'Kiovan kultainen portti',
        lat: 50.4489,
        lon: 30.5133,
        wiki: 'Kiovan kultainen portti',
      },
    ],
  },
  pietari: {
    polku: 'assets/kartat/pietari-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 59.9545, etela: 59.9215, lansi: 30.284, ita: 30.347 },
    esittely: 'Pietaria ei ollut olemassa ennen vuotta 1703. Se '
      + 'rakennettiin Nevan suistoon, matalille ja soisille saarille, '
      + 'koska Venäjä halusi oman sataman Itämerelle. Neva on lyhyt '
      + 'mutta valtava joki: se tuo Laatokan vedet mereen ja on '
      + 'Talvipalatsin kohdalla lähes 700 metriä leveä. Maa oli niin '
      + 'märkää, että kaduille piti ensin kaivaa ojia veden johtamiseksi '
      + 'pois. Ojista tuli kanavia, ja kanavista tuli koko kaupungin '
      + 'tuntomerkki.\n\nKartan yläosassa virtaa Neva, ja sen keskellä '
      + 'on pieni tähdenmuotoinen saari: Pietari-Paavalin linnoitus, '
      + 'kaupungin ensimmäinen rakennus. Vasemmalla joki haarautuu '
      + 'kahdeksi. Alaosassa kaartaa kolme kanavaa sisäkkäisinä kaarina '
      + '— Moika, Gribojedovin kanava ja Fontanka — ja niiden poikki '
      + 'vetää suora viiva vasemmalta oikealle. Se on Nevski prospekt, '
      + 'kaupungin pääkatu. Kanavien välissä kadut ovat suoria, koska ne '
      + 'piirrettiin valmiiksi ennen kuin taloja oli. Kartan kohteista '
      + 'pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään. Tämä on pelin ainoa
       * kaupunkikartta, jolla kaikilla kuudella kohteella on
       * fi.wikipedia-artikkeli, ja väljin: pienin pariväli 18,5
       * prosenttiyksikköä.
       *
       * Iisakinkirkko olisi vaihtoehto Vaskiratsastajalle (350 metriä,
       * 9,4 pp), mutta Vaskiratsastaja on lehden kansikuva eikä
       * Iisakinkirkkoa mainita lehdessä lainkaan.
       *
       * Kesäpuutarhasta, Smolnan katedraalista ja Marsin kentästä ei
       * ole fi-artikkelia. Talvipalatsi ja Eremitaaši ovat eri
       * artikkeleita; kartta linkittää rakennukseen, lehti museoon.
       */
      {
        nimi: 'Pietari-Paavalin linnoitus',
        lat: 59.95,
        lon: 30.317,
        wiki: 'Pietari-Paavalin linnoitus',
      },
      { nimi: 'Talvipalatsi', lat: 59.9404, lon: 30.3139, wiki: 'Talvipalatsi' },
      {
        nimi: 'Verikirkko',
        lat: 59.94,
        lon: 30.3286,
        wiki: 'Kristuksen ylösnousemuksen katedraali',
      },
      { nimi: 'Vaskiratsastaja', lat: 59.9364, lon: 30.3022, wiki: 'Vaskiratsastaja' },
      { nimi: 'Kazanin katedraali', lat: 59.9343, lon: 30.3245, wiki: 'Kazanin katedraali' },
      { nimi: 'Mariinski-teatteri', lat: 59.9256, lon: 30.2961, wiki: 'Mariinski-teatteri' },
    ],
  },
  moskova: {
    polku: 'assets/kartat/moskova-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 55.7655, etela: 55.7345, lansi: 37.5915, ita: 37.6435 },
    esittely: 'Moskova syntyi kukkulalle, jonka juurella Moskova-joki '
      + 'tekee mutkan. Mutkan sisään jäävää niemekettä oli helppo '
      + 'puolustaa: vettä kahdella sivulla ja jyrkkä rinne kolmannella. '
      + 'Sinne rakennettiin puinen linnoitus, kreml, ja sen ympärille '
      + 'kaupunki. Moskova ei ole meren rannalla eikä suuren joen '
      + 'suulla, mutta se on Venäjän tasangon keskellä, kohdassa josta '
      + 'pääsee jokia pitkin joka suuntaan. Kaupunki kasvoi renkaina: '
      + 'kun se täyttyi, ympärille vedettiin uusi muuri, ja muurien '
      + 'paikoille jäivät leveät kehäkadut.\n\nKartan keskellä on '
      + 'Kremlin kolmio. Sen ympäri kiertää vaalea vesijuova: se on '
      + 'Neglinnaja-joki, joka virtaa nykyään maan alla putkessa. '
      + 'Kolmion sisällä näkyy vain muutama viiva, sillä kartta ei '
      + 'piirrä rakennuksia. Alhaalla kaartaa Moskova-joki leveänä '
      + 'nauhana ja sen eteläpuolella toinen, kapeampi vesi — tulvia '
      + 'varten kaivettu kanava. Ylhäällä ja sivuilla erottuu kaksi '
      + 'kaarta, jotka kiertävät keskustaa: Bulevardikehä ja '
      + 'Puutarhakehä. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään.
       *
       * Punainen tori, Pyhän Vasilin katedraali ja Kreml ovat 8,2–10,5
       * prosenttiyksikön päässä toisistaan, koska ne ovat oikeasti
       * naapuritontteja. Yli 5 pp:n rajan mennään, mutta älä lisää
       * tähän neljättä keskustapistettä.
       *
       * ANSAT. Pelkkä Kreml on yleissivu venäläisistä linnoituksista;
       * oikea on Moskovan Kreml. Vasili Autuaan katedraalia ei ole
       * olemassa — otsikko on Pyhän Vasilin katedraali. Pokrovan
       * katedraali osoittaa HARKOVAAN. Gorkin puisto on täsmennyssivu.
       * Bolshoi-teatteri ohjautuu muotoon Bolšoi-teatteri.
       *
       * Vapahtajan katedraali on lyhennetty selite: koko nimi olisi 29
       * merkkiä eli pidempi kuin yksikään muu kartan kohde.
       */
      { nimi: 'Bolšoi-teatteri', lat: 55.7603, lon: 37.6186, wiki: 'Bolšoi-teatteri' },
      { nimi: 'Punainen tori', lat: 55.7542, lon: 37.62, wiki: 'Punainen tori' },
      {
        nimi: 'Pyhän Vasilin katedraali',
        lat: 55.7525,
        lon: 37.6231,
        wiki: 'Pyhän Vasilin katedraali',
      },
      { nimi: 'Moskovan Kreml', lat: 55.7517, lon: 37.6178, wiki: 'Moskovan Kreml' },
      {
        nimi: 'Vapahtajan katedraali',
        lat: 55.7444,
        lon: 37.6056,
        wiki: 'Kristus Vapahtajan katedraali (Moskova)',
      },
      {
        nimi: 'Tretjakovin galleria',
        lat: 55.7414,
        lon: 37.6209,
        wiki: 'Tretjakovin galleria',
      },
    ],
  },
  odessa: {
    polku: 'assets/kartat/odessa-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 46.501, etela: 46.466, lansi: 30.724, ita: 30.776 },
    esittely: 'Odessa on Mustanmeren rannalla kohdassa, jossa maa loppuu '
      + 'jyrkkään törmään. Törmän alla on suojainen lahti, johon laivat '
      + 'pääsevät tuulelta piiloon, ja törmän päällä on tasainen aro, '
      + 'jolle mahtuu kokonainen kaupunki. Satamalle annettiin käsky '
      + 'vuonna 1794, ja siitä lasketaan Odessan ikä. Kaupunki oli heti '
      + 'kauppasatama: viljalastit tulivat aroa pitkin ja lähtivät '
      + 'täältä laivoilla maailmalle. Talot tehtiin '
      + 'simpukkakalkkikivestä, jota louhittiin suoraan kaupungin '
      + 'alta.\n\nKartan oikea kolmannes on merta. Yläreunassa on '
      + 'satama: laiturit työntyvät veteen kuin sormet, ja niiden '
      + 'ulkopuolella kaartaa aallonmurtaja, jonka kärjessä seisoo '
      + 'majakka. Vasemmalla ja alhaalla levittäytyy suora ruudukko. Se '
      + 'ei ole kasvanut itsekseen vaan piirrettiin kerralla valmiiksi, '
      + 'ja siksi kadut jatkuvat suorina kilometrikaupalla. Ruudukon ja '
      + 'sataman välissä on jyrkkä rinne, ja sitä ylös nousevat '
      + 'Potjomkinin portaat. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään: majakalta satamaan, portaita
       * ylös ruudukkoon ja sen halki Privozille.
       *
       * Vain kahdella on wiki, ja se on tarkistettu tulos: Privozista,
       * majakasta, satamasta ja kaupunginpuistosta ei ole
       * fi-artikkelia. ANSA: Vorontsovin palatsi osoittaa ALUPKAAN
       * Krimillä eikä Odessaan, ja pelkkä Potjomkin on täsmennyssivu
       * (sotamarsalkka, taistelulaiva, elokuva).
       *
       * Katakombeja ei voi merkitä kartalle: ne ovat maan alla koko
       * kaupungin alla ja museon sisäänkäynti on 12 km kaupungin
       * ulkopuolella.
       */
      { nimi: 'Vorontsovin majakka', lat: 46.4966, lon: 30.7601 },
      { nimi: 'Odessan satama', lat: 46.4908, lon: 30.7462 },
      { nimi: 'Potjomkinin portaat', lat: 46.4886, lon: 30.742, wiki: 'Potjomkinin portaat' },
      {
        nimi: 'Odessan oopperatalo',
        lat: 46.4854,
        lon: 30.7413,
        wiki: 'Odessan kansallinen akateeminen ooppera- ja balettiteatteri',
      },
      { nimi: 'Kaupunginpuisto', lat: 46.4848, lon: 30.7344 },
      { nimi: 'Privozin tori', lat: 46.4699, lon: 30.7368 },
    ],
  },
};

/*
 * Lambertin tasapinta-azimutaalinen projektio (LAEA).
 *
 * Käytössä VAIN Venäjällä, koska sille ei ole olemassa tasavälistä
 * korkokarttaa (perustelu RUS-merkinnän kommentissa). Kaava on
 * projektion vakiomuoto; kuvakohtaiset venytys- ja siirtoluvut ovat
 * kartan omassa laea-oliossa, ja ne on mitattu kuvasta.
 *
 * Älä lisää tätä muille maille etsimättä ensin tasavälistä karttaa:
 * tasavälisen kartan rajat voi tarkistaa kuka tahansa tiedostosivulta,
 * mutta nämä kertoimet joutuu mittaamaan uudestaan.
 */
function laeaPiste(laea, lat, lon) {
  const { keskiLat, keskiLon, xKerroin, xSiirto, yKerroin, ySiirto } = laea;
  const aste = Math.PI / 180;
  const k0 = keskiLat * aste;
  const k1 = lat * aste;
  const ero = (lon - keskiLon) * aste;
  // Mittakaavatekijä, joka pitää pinta-alat oikeina.
  const m = Math.sqrt(2 / (1 + Math.sin(k0) * Math.sin(k1)
    + Math.cos(k0) * Math.cos(k1) * Math.cos(ero)));
  return {
    x: xSiirto + xKerroin * m * Math.cos(k1) * Math.sin(ero),
    y: ySiirto - yKerroin * m * (Math.cos(k0) * Math.sin(k1)
      - Math.sin(k0) * Math.cos(k1) * Math.cos(ero)),
  };
}

/** Suora prosenttiosuus rajoista — tasavälisen kartan perustapaus. */
function suoraPiste(rajat, lat, lon) {
  const { pohjoinen, etela, lansi, ita } = rajat;
  return {
    x: ((lon - lansi) / (ita - lansi)) * 100,
    y: ((pohjoinen - lat) / (pohjoinen - etela)) * 100,
  };
}

/**
 * Pisteen paikka kuvassa prosentteina (left/top).
 *
 * KAINALOKARTAT (omistajan ratkaisu 9.8.2026). Kun lehdessä mainittu
 * kohde on kilometrien päässä keskustasta, sitä ei oteta päärajaukseen
 * — se levittäisi kuvan katupuuroksi — vaan piirretään omana pienenä
 * minikarttana pääkuvan tyhjään kulmaan. Kainalon kohde numeroidaan
 * samaan sarjaan, ja tämä funktio sijoittaa sen: ensin paikka kainalon
 * omassa rajauksessa, sitten se skaalataan kainaloruutuun pääkuvassa.
 *
 * Kainalo tunnistetaan KOHTEEN OMISTA KOORDINAATEISTA eikä erillisestä
 * kentästä. Se pitää datan yksinkertaisena (kohde on pelkkä lat/lon
 * kuten muutkin) eikä vaadi muutosta piirtokoodiin — piste on siksi
 * napautettava aivan kuten pääkartan pisteet. Ehto toimii, koska
 * kainalon rajaus on aina päärajauksen ULKOPUOLELLA; jos joku joskus
 * asettaa ne päällekkäin, kainalo voittaa ja piste menee väärään
 * paikkaan. Älä siis tee päällekkäistä kainaloa.
 */
export function karttapiste(kartta, lat, lon) {
  if (kartta.projektio === 'laea') return laeaPiste(kartta.laea, lat, lon);
  for (const kainalo of kartta.kainalot ?? []) {
    const r = kainalo.rajat;
    if (lat <= r.pohjoinen && lat >= r.etela && lon >= r.lansi && lon <= r.ita) {
      const sisa = suoraPiste(r, lat, lon);
      return {
        x: kainalo.x + (sisa.x / 100) * kainalo.leveys,
        y: kainalo.y + (sisa.y / 100) * kainalo.korkeus,
      };
    }
  }
  return suoraPiste(kartta.rajat, lat, lon);
}
