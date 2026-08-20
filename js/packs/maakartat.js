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
//
// RAJAT HAETAAN LÄHTEESTÄ ITSE, EIKÄ KOSKAAN OTETA VASTAAN VALMIINA
// (Fablen ohje 9.8.2026 Lähi-idän erien jälkeen). Väärä rajaluku ei
// riko mitään näkyvästi — se vain siirtää jokaisen kaupunkipisteen,
// ja virhe huomataan vasta kuvasta. Siksi:
//
//  1. Hae top/bottom/left/right sivulta
//     `Module:Location map/data/<Maa>` (en.wikipedia, action=raw) ja
//     katso samalla, onko valitsemasi tiedosto moduulin `image1`.
//     Jos kartta on Tschubbyn `Reliefkarte`-perhettä, rajat ovat
//     yhden hypyn takana: tiedostosivu sanoo "Grenzen: <maa> adm
//     location map.svg", ja juuri se tiedosto on moduulin `image`.
//     Lue ketju molemmista päistä.
//  2. Jos käytät tutkimusapuria, HAE RAJAT ITSE ENNEN KUIN LUET SEN
//     RAPORTIN. Silloin sinulla on riippumaton vertailukohta etkä
//     vahvista vain sitä mitä apuri ehdotti.
//  3. Ristiinvarmista kuvasuhteesta: px/° pitkittäin ja
//     leveyspiireittäin, ja suhteen pitäisi olla lähellä arvoa
//     1/cos(keskileveysaste). Muutaman prosentin heitto on normaali —
//     osa karttaperheen kuvista ilmoittaa oman venytyksensä
//     ("N/S stretching NNN %"), joka saa poiketa geometriasta
//     (esim. Kypros 115 % vs. 122 %). Se ei vaikuta
//     prosenttiasemointiin, koska akselit ovat lineaarisia asteissa.
//  4. Todenna lopuksi pisteet pelin omalla karttapiste()-funktiolla
//     kuvan päälle piirrettynä ja KATSO KUVA.
//
// SVG kelpaa pohjakuvaksi (Syyria): Special:FilePath?width=1000
// rasteroi sen PNG:ksi. Testattu 9.8.2026.
//
// Kun lähteet ovat eri mieltä luvusta, sitä EI kirjoiteta täsmällisenä
// (Fablen linjaus: Moreebin dyyni). Ks. ARE, YEM, CYP ja SYR — kaikissa
// on kommentti siitä, mikä luku jätettiin pois ja miksi.

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
     * jota pelaaja ei usko ennen kuin näkee kuvan: kokonainen kaupunki
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
     * Laudan pohjoisin Suomen kohde (id 'lappi') on Rovaniemi: se
     * istuu napapiirillä eli kartan opettavaisimmalla näkymättömällä
     * viivalla, ja se on se Lapin paikka, jonka suomalainen pelaaja
     * tuntee. Laudalla kohteen nimi on 17.8.2026 alkaen Rovaniemi.
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
     * Suomalainen pelaaja tietää maastaan paljon, joten nosto on
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
     * jonka pelaaja löytää itse, eikä yksikään sen rantakaupunki ole
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
  /*
   * Tästä alkaa Lähi-idän lauta. Turkki ja Egypti ovat jo yllä
   * (Euroopan ja Afrikan laudoilta) ja kelpaavat sellaisenaan: niiden
   * kaupunkilistat kattavat myös Lähi-idän laudan kaupungit.
   */
  ARE: {
    /*
     * Moduulin oma image1, ja tiedostosivu ilmoittaa samat rajat itse
     * ("Equirectangular projection, N/S stretching 109 %"). Tarkistin
     * luvut Module:Location map/data/United Arab Emirates -sivulta.
     *
     * VAIHTOEHTOJA EI OLE: Commonsin `Relief location maps of the
     * United Arab Emirates` sisältää vain tämän tiedoston ja
     * `Relief maps of the United Arab Emirates` on tyhjä (9.8.2026).
     * 1228 px riittää lehden noin 680 fyysiselle pikselille.
     *
     * Rajaus vetää mukaan koko maan: läntinen kärki on noin 51,6°
     * (raja 51,4) ja itärannikko 56,4° (raja 56,6). Pohjoisreunassa
     * näkyy Omanille kuuluva Musandam — se selittää lapselle, miksi
     * maa loppuu kesken ennen Hormuzinsalmea.
     *
     * Tässä karttaperheessä maata EI ole sävytetty naapureista
     * erottuvaksi; muoto luetaan rajaviivasta. Sama koskee Omania.
     */
    tiedosto: 'United Arab Emirates relief location map.jpg',
    lahde: 'NordNordWest ja Uwe Dedering, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 26.5, etela: 22.4, lansi: 51.4, ita: 56.6 },
    /*
     * Kolme rannikkokaupunkia Persianlahdella, Fujaira vuorten
     * toisella puolella Omaninlahdella — siitä näkee, että maa ulottuu
     * kahdelle merelle — ja Al-Ain keitaana sisämaassa. Liwa on mukana
     * kuudentena, koska ilman sitä kartan koko eteläpuolisko jäisi
     * tyhjäksi; se on myös noston dyynin naapuri. Liwa ei ole kaupunki
     * vaan noin 50 kylän keidas, ja koordinaatti on Mezaira'an.
     */
    kaupungit: [
      { nimi: 'Abu Dhabi', lat: 24.45, lon: 54.3833, paa: true },
      { nimi: 'Dubai', lat: 25.25, lon: 55.2833 },
      { nimi: 'Ras al-Khaima', lat: 25.7667, lon: 55.95 },
      { nimi: 'Fujaira', lat: 25.1333, lon: 56.3333 },
      { nimi: 'Al-Ain', lat: 24.2, lon: 55.7667 },
      { nimi: 'Liwa', lat: 23.1323, lon: 53.7966 },
    ],
    nosto: {
      otsikko: 'Hiekkavuori, jota autot yrittävät kiivetä',
      tiedosto: 'Moreeb001.jpg',
      /*
       * DYYNIN KORKEUTTA EI ANNETA LUKUNA, ja se on tietoinen valinta.
       * Wikipedia ja festivaalin järjestäjä toistavat lukua 300 metriä
       * ja 50 asteen rinnettä, mutta SRTM-30m-korkeusprofiili dyynin
       * poikki antaa tasangoksi 87–95 m ja harjaksi 190–201 m eli noin
       * 100–115 metrin korkeuseron. Lähteet ovat siis ristiriidassa,
       * eikä lastenlehteen kuulu kiistanalainen täsmäluku. Älä lisää
       * 300:aa takaisin.
       */
      teksti: 'Arabiemiraattien eteläosa on Rub al-Khalia eli Tyhjää '
        + 'neljännestä, maailman suurinta yhtenäistä hiekka-aavikkoa: '
        + 'noin 650 000 neliökilometriä, lähes kaksi Suomea. Hiekka on '
        + 'ruosteenpunaista, koska jyvissä on rautaa. Aavikon '
        + 'pohjoisreunalla kaartuu Liwan keidas — noin viisikymmentä '
        + 'kylää sadan kilometrin matkalla, taatelipalmujen varjossa. '
        + 'Ne ovat Arabiemiraattien eteläisimmät asutut paikat, ja '
        + 'niiden takana alkaa pelkkä hiekka. Keitaasta 25 kilometriä '
        + 'etelään kohoaa Moreebin dyyni, korkea hiekkaseinämä keskellä '
        + 'tasankoa. Hiekka on niin pehmeää, ettei siinä pitäisi pystyä '
        + 'ajamaan ylöspäin. Silti sitä yritetään: vuodesta 2004 alkaen '
        + 'talvinen festivaali on tuonut rinteen juurelle '
        + 'moottoripyöriä ja erikoisrakennettuja maastureita, jotka '
        + 'lähtevät täydellä kaasulla suoraan ylös. Harva pääsee '
        + 'huipulle asti — pehmeä hiekka syö vauhdin, ja auto valuu '
        + 'takaisin alas. Kuvan suorat urat rinteessä ovat renkaiden '
        + 'jälkiä.',
      selite: 'Moreebin dyyni Liwan eteläpuolella. Hiekkaseinämän yli '
        + 'nousee kolme suoraa uraa — kilpa-ajojen jälkiä. Alhaalla '
        + 'näkyy kisa-alueen aita, valonheitinmastot ja tasainen '
        + 'lähtökenttä.',
      lahde: 'Nepenthes, Wikimedia Commons (CC BY-SA 3.0)',
      // Liwasta ja Moreebista ei ole fi-artikkelia; aavikko on lähin
      // oikea kohde eikä "melkein oikea".
      wiki: 'Rub al-Khali',
    },
  },
  OMN: {
    /*
     * Moduulin oma image1, ja tiedostosivu ilmoittaa samat rajat itse
     * ("Equirectangular projection, N/S stretching 107 %"). Tarkistin
     * luvut Module:Location map/data/Oman -sivulta.
     *
     * MUSANDAM MAHTUU: eksklaavin pohjoiskärki on noin 26,4° ja kartan
     * yläraja 26,6°, joten Hormuzinsalmen suulla oleva erillinen pala
     * Omania näkyy kokonaan — Khasab osuu 4,1 %:n korkeudelle. Se on
     * tälle maalle olennaista, ja siksi myös nosto kertoo siitä.
     *
     * ÄLÄ VAIHDA `Oman location map Topographic.png`:hen, vaikka se on
     * 3039 px ja rajat ovat samat: sen lisenssi on pelkkä GFDL-1.2/1.3
     * (migration=not-eligible), ei PD eikä CC.
     *
     * Kuvasuhde on pysty (1537 × 2000), joten lehden 340 px:n
     * leveydellä kartta on noin 440 px korkea — samaa luokkaa kuin
     * Italia. Vasen puolisko on Saudi-Arabian aavikkoa; se on tämän
     * rajauksen hinta, muuta rajausta ei ole tarjolla.
     */
    tiedosto: 'Oman relief location map.jpg',
    lahde: 'Carport, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 26.6, etela: 16.5, lansi: 51.8, ita: 60.1 },
    /*
     * Laudan kohteet Masqat ja Salalah ovat kartan vastakkaisissa
     * päissä (29,6 % ja 94,9 %) — jo se kertoo, miten pitkä maa on.
     * Väliin tarvittiin Duqm, muuten 40 % kartasta olisi tyhjää.
     * Khasab on mukana Musandamin takia, Nizwa näyttää sisämaan
     * vuorten juuren ja Sur Arabian itäisimmän kärjen.
     */
    kaupungit: [
      { nimi: 'Masqat', lat: 23.6086, lon: 58.5919, paa: true },
      { nimi: 'Khasab', lat: 26.184, lon: 56.2478 },
      { nimi: 'Nizwa', lat: 22.9333, lon: 57.5315 },
      { nimi: 'Sur', lat: 22.571, lon: 59.526 },
      { nimi: 'Duqm', lat: 19.6617, lon: 57.7047 },
      { nimi: 'Salalah', lat: 17.0167, lon: 54.0833 },
    ],
    // Kartta herättää heti kysymyksen: miksi ylhäällä on erillinen
    // pala? Nosto vastaa siihen.
    nosto: {
      otsikko: 'Vuonot, joihin vuoret vajoavat',
      tiedosto: 'Khor Ash Sham (cropped esVoy).jpg',
      teksti: 'Kartan yläreunassa on erillinen pala Omania: '
        + 'Musandamin niemimaa. Sinne ei pääse omasta maasta kulkematta '
        + 'Arabiemiraattien läpi. Maakunta on noin 1 800 '
        + 'neliökilometriä ja siellä asuu vajaat 50 000 ihmistä, mutta '
        + 'sen kärki vartioi Hormuzinsalmea, josta kulkee suuri osa '
        + 'maailman öljylaivoista. Rannikko näyttää vuonoilta, vaikka '
        + 'jäätikkö ei ole niitä koskaan kaivanut. Syy on maan alla: '
        + 'Arabian mannerlaatta työntyy Euraasian laatan alle, ja '
        + 'niemimaan pohjoiskärki painuu noin kuusi millimetriä '
        + 'vuodessa. Vuosituhansien mittaan meri on täyttänyt vanhat '
        + 'laaksot, ja vuoret jatkuvat suoraan veden alle — korkein '
        + 'huippu Jabal Harim yltää 2 087 metriin, ja moneen kylään '
        + 'pääsee yhä vain veneellä. Pohjoisimmassa Kumzarin kylässä '
        + 'puhutaan omaa kieltä, joka on sukua persialle. Yhdessä '
        + 'poukamassa on pikkuruinen Telegraph Island, jonne britit '
        + 'rakensivat vuonna 1864 lennätinaseman — kuumuus oli niin '
        + 'sietämätöntä, että asema hylättiin runsaassa kymmenessä '
        + 'vuodessa.',
      selite: 'Matkustajia kuljettava dhow-vene Khor Ash Shamin '
        + 'poukamassa Musandamissa, Omanin lippu perässä. Paljaat '
        + 'kalliot laskeutuvat suoraan veteen ilman rantakaistaletta, '
        + 'ja takana häämöttää poukaman jatko niemi niemeltä.',
      lahde: 'Robert Haandrikman, Wikimedia Commons (CC BY 2.0)',
      wiki: 'Musandamin niemimaa',
    },
  },
  KWT: {
    /*
     * Sijaintikarttaperheessä EI OLE Kuwaitista relief-versiota
     * (etsitty 9.8.2026), eikä `Module:Location map/data/Kuwait`
     * määrittele `image1`:tä lainkaan — tarkistin moduulin itse.
     * Tämä on Tschubbyn SRTM3-kartta, jonka tiedostosivu ilmoittaa
     * itse "Grenzen: Kuwait adm location map.svg", ja juuri se
     * tiedosto on moduulin `image`, jonka rajat ovat alla. Rajat ovat
     * siis yhden hypyn takana kuten Unkarilla ja Tanskalla; tarkistin
     * ketjun molemmista päistä.
     *
     * Ketju varmistettiin myös laskemalla: kuva on 1601 × 1382 px eli
     * 667 px/° pitkittäin ja 768 px/° leveyspiireittäin. Suhde 1,151
     * vastaa tasaväliprojektiota leveyspiirillä 29,3° (1/cos = 1,147)
     * 0,4 %:n tarkkuudella.
     *
     * Vaihtoehto `Kuwait Physiography.jpg` (CIA, PD) HYLÄTTY: se on
     * Lambert Conformal Conic -projektiossa, jolloin prosenttiasemointi
     * ei toimi lainkaan, ja kuvassa on valmiina englanninkieliset
     * nimet, punainen tieverkko ja legenda.
     *
     * Merialueilla ei ole yhtään viivaa. Katsottu 680 px:ssä.
     */
    tiedosto: 'Reliefkarte Kuwait.png',
    lahde: 'Tschubby, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 30.2, etela: 28.4, lansi: 46.4, ita: 48.8 },
    /*
     * Viisi pistettä, ei kuutta: AL JAHRA ON TAHALLAAN POIS. Se on
     * maan kolmanneksi suurin kaupunki mutta käytännössä samalla
     * leveyspiirillä pääkaupungin kanssa (29,35° vs. 29,37°). Koska
     * nimi aukeaa itään aina kun x on alle 60 %, "Al Jahra" törmäisi
     * suoraan "Kuwait"-nimeen — kokeiltu selaimessa 680 px:n
     * leveydellä. Läntisempää korvaajaa ei ole: Kuwaitin autiomaan
     * puolella ei ole paikkaa, jolla olisi Wikipedia-artikkeli.
     *
     * Loput näyttävät maan koko pituuden, ja kartalta näkee että
     * kaikki asutus on kapealla rantakaistalla ja lännessä on hiekkaa.
     */
    kaupungit: [
      { nimi: 'Kuwait', lat: 29.37, lon: 47.978, paa: true },
      { nimi: 'Failaka', lat: 29.433, lon: 48.333 },
      { nimi: 'Bubiyan', lat: 29.783, lon: 48.183 },
      { nimi: 'Al Ahmadi', lat: 29.083, lon: 48.083 },
      { nimi: 'Al Wafra', lat: 28.639, lon: 47.931 },
    ],
    nosto: {
      otsikko: 'Saari, jonka Aleksanteri nimesi Ikarokseksi',
      tiedosto: 'Antiquities of Failaka island 02.JPG',
      teksti: 'Kuwaitinlahden suulla, 20 kilometrin päässä '
        + 'pääkaupungista, on Failakan saari: 12 kilometriä pitkä ja '
        + 'kuusi leveä, litteä kuin pöytä. Sen hiekan alta on kaivettu '
        + 'esiin kolme eri aikaa. Vanhin on pronssikautinen kylä noin '
        + 'vuodelta 2000 eaa. Savenpalasesta löytyi kaiverrus, jossa '
        + 'mainitaan jumala Inzakin temppeli — merkki siitä, että '
        + 'saari kuului Dilmunin kauppamaailmaan. Sitten tulivat '
        + 'kreikkalaiset. Aleksanteri Suuri antoi saarelle nimen '
        + 'Ikaros, koska se muistutti kooltaan ja muodoltaan '
        + 'samannimistä Egeanmeren saarta, ja vuosina 300–200 eaa. '
        + 'rannalle nousi kreikkalainen siirtokunta. Kivistä on luettu '
        + 'jopa Susan käskynhaltijan määräys siirtää Artemiin temppeli '
        + 'ja perustaa gymnasion. Saaren keskellä on lisäksi kirkon '
        + 'rauniot, ehkä 600-luvulta. Nuorin kerros on tyhjä kylä: '
        + 'ennen vuotta 1990 Failakalla asui noin 5 800 ihmistä, mutta '
        + 'Irakin miehityksen jälkeen vain harvat palasivat. Juomavesi '
        + 'tulee saarelle yhä mantereelta merenalaista putkea pitkin.',
      selite: 'Kaivausaluetta Failakan länsipäässä: kivimuurien '
        + 'rajaamia huoneita ja kynnyksiä, ja aivan takana '
        + 'Persianlahti.',
      lahde: 'Bo hessin, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Failaka',
    },
  },
  QAT: {
    /*
     * Moduulin oma image1, ja rajat on dokumentoitu kahdesti:
     * `Module:Location map/data/Qatar` (tarkistettu) ja tiedostosivun
     * oma "Grenzen"-rivi. Kuvasuhde varmistaa saman: 1460 × 1400 px
     * antaa suhteen 1,110, ja tasaväliprojektio leveyspiirillä 25,35°
     * vaatii 1,106.
     *
     * MERIALUEIDEN VIIVAT OVAT TÄMÄN KARTAN TUNNETTU VIKA, ja se
     * hyväksyttiin tietoisesti. Kaakkoisnurkassa kelluu Qatarin ja
     * Arabiemiraattien meriraja, jonka päässä on pieni silmukka; se
     * näyttää lapsen silmään pikemminkin naarmulta kuin rajalta.
     * Juuri tällainen viiva hylkäsi Kreikan vaihtoehtoisen kartan —
     * täällä hylkäys ei ole mahdollinen, koska muuta relief-karttaa ei
     * ole olemassa. `Qatar rel95.jpg` (CIA, PD) on Lambert Conformal
     * Conic -projektiossa, joten prosenttiasemointi ei toimisi sillä
     * lainkaan, ja se on täynnä nimiä ja teitä. Katsottu 680 px:ssä
     * eli lehden omassa koossa: virhe näkyy mutta on pieni ja meressä.
     * Jos Commonsiin joskus ilmestyy siisti Qatarin korkokartta,
     * tämän saa vaihtaa.
     */
    tiedosto: 'Reliefkarte Katar.png',
    lahde: 'Tschubby, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 26.3, etela: 24.4, lansi: 50.3, ita: 52.5 },
    /*
     * Kuusi pistettä kiertää koko niemimaan: pohjoiskärki, koillis-
     * rannikko, pääkaupunki idässä, länsirannan öljykaupunki, etelän
     * satama ja lounaan ainoa maarajanylityspaikka Saudi-Arabiaan.
     * Niistä näkee, että maa on peukalon muotoinen niemi ja että
     * kaikki suuri on itärannalla.
     *
     * Al Wakra (25,18 / 51,61) jätettiin pois: se on vain nelisen
     * prosenttiyksikköä Dohasta ja nimet menisivät päällekkäin.
     */
    kaupungit: [
      { nimi: 'Doha', lat: 25.287, lon: 51.533, paa: true },
      { nimi: 'Al Ruwais', lat: 26.133, lon: 51.217 },
      { nimi: 'Al Khor', lat: 25.684, lon: 51.506 },
      { nimi: 'Dukhan', lat: 25.419, lon: 50.792 },
      { nimi: 'Mesaieed', lat: 24.98, lon: 51.55 },
      { nimi: 'Abu Samra', lat: 24.75, lon: 50.852 },
    ],
    nosto: {
      otsikko: 'Helmikaupunki, jonka hiekka nieli',
      teksti: 'Qatarin luoteisrannikolla, 85 kilometrin päässä '
        + 'Dohasta, on al-Zubarah. Vuonna 1766 sinne muutti '
        + 'kauppiassukuja Kuwaitista, ja rannalle nousi muurien '
        + 'ympäröimä helmikaupunki. Sen satamasta lähdettiin '
        + 'helmisimpukoiden pyyntiin ja purjehdittiin Intiaan asti, ja '
        + 'parhaimmillaan siellä asui ehkä 6 000–9 000 ihmistä. Osa '
        + 'suvuista lähti myöhemmin valloittamaan Bahrainia, ja '
        + 'kaupungin merkitys alkoi hiipua. Vuonna 1811 Masqatin '
        + 'sulttaanille uskolliset joukot tuhosivat sen, ja kivitalot '
        + 'sortuivat. Raunioille jäi vielä kalastajia ja '
        + 'helmenpyytäjiä, mutta 1900-luvun alkuun mennessä paikka oli '
        + 'tyhjä. Sitten tuuli teki työnsä ja hiekka peitti kadut, '
        + 'muurit ja kynnykset. Se osoittautui hyväksi säilöjäksi: kun '
        + 'arkeologit alkoivat kaivaa, alta paljastui kokonainen '
        + 'kaupunkipohja — huoneet, kujat ja kaupunginmuuri melkein '
        + 'siinä asennossa kuin ne jäivät. Raunioiden vieressä seisoo '
        + 'vuonna 1938 rakennettu linnoitus. Al-Zubarah on Qatarin '
        + 'ainoa Unescon maailmanperintökohde; listalle se pääsi '
        + 'vuonna 2013.',
      tiedosto: 'Ruins in Zubarah on a cloudy day.jpg',
      selite: 'Kaivettuja talonseiniä al-Zubarahin rauniokaupungissa. '
        + 'Vasemmalla siintää Persianlahti, ja aavikon yli työntyy '
        + 'sadekuuron tumma rintama.',
      lahde: 'Alex Sergeev, Wikimedia Commons (CC BY-SA 3.0)',
      wiki: 'Al-Zubarah',
    },
  },
  SAU: {
    /*
     * Moduulin oma image1, ja rajat on dokumentoitu kahdesti:
     * `Module:Location map/data/Saudi Arabia` (hain sen itse) ja
     * tiedostosivun oma rivi "Equirectangular projection, N/S
     * stretching 110 %". Ei yhtään hyppyä ketjussa.
     *
     * Kuvasuhde varmistaa saman: 2003 × 1668 px antaa 91,88 px/°
     * pitkittäin ja 101,09 px/° leveyspiireittäin eli suhteen 1,1002,
     * ja tasaväliprojektio keskileveysasteella 24,25° vaatii 1,0968 —
     * 0,3 %:n tarkkuus.
     *
     * Merialueet ovat puhtaat: Punaisellamerellä ei ole yhtään viivaa
     * ja Persianlahdella vain kaksi 1–2 px:n merkkiä, jotka eivät
     * erotu lehden koossa. Vaihtoehtoa ei ole — Tschubbyn
     * `Reliefkarte Saudi-Arabien.png` ei ole olemassa.
     *
     * Tiedostosivun {{BadJPG}} on huoltomerkintä (kartan "pitäisi"
     * olla SVG), ei lisenssi- eikä laatuongelma; sama karttaperhe on
     * käytössä jo Kreikalla ja Omanilla.
     */
    tiedosto: 'Saudi Arabia relief location map.jpg',
    lahde: 'Carport, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 32.5, etela: 16.0, lansi: 34.2, ita: 56.0 },
    /*
     * Laudan kolme kohdetta Riad, Mekka ja Medina ovat mukana. Loput
     * piirtävät maan muodon: Tabuk luoteisnurkkaan, Dammam
     * Persianlahdelle ja Abha Asirin vuorille etelään.
     *
     * JIDDA ON TAHALLAAN POIS. Se on maan toiseksi suurin kaupunki,
     * mutta osuu kolmen prosenttiyksikön päähän Mekasta eli noin
     * 10 pikselin päähän lehden koossa — nimet menisivät päällekkäin,
     * ja laudan kaupunki voittaa.
     *
     * Kaakkoisneljännes jää tyhjäksi. Se on Rub al-Khali; siellä ei
     * ole kaupunkeja, joten tyhjyys on totta eikä puute.
     */
    kaupungit: [
      { nimi: 'Riad', lat: 24.6333, lon: 46.7167, paa: true },
      { nimi: 'Tabuk', lat: 28.3833, lon: 36.5833 },
      { nimi: 'Dammam', lat: 26.4333, lon: 50.1 },
      { nimi: 'Medina', lat: 24.4667, lon: 39.6 },
      { nimi: 'Mekka', lat: 21.4225, lon: 39.8262 },
      { nimi: 'Abha', lat: 18.2167, lon: 42.5 },
    ],
    // Kartalla Medina on radan pääteasema ja Tabuk yksi sen
    // asemakaupungeista, joten nosto selittää kaksi pistettä kerralla.
    nosto: {
      otsikko: 'Juna, joka ei koskaan päässyt Mekkaan',
      /*
       * Kuvassa on tekijän oma vesileima veturin astinlaudalla
       * ("Photo by Ahmad Hasanat"). Se on kirjattu tähän, jottei sitä
       * löydetä myöhemmin ilmoittamattomana vikana: katsoin kuvan
       * lehden 500 px:n koossa eikä leima erotu lainkaan. Vaihtoehto
       * oli museohallin sisäkuva, jonka seinällä on töhryjä — selvästi
       * huonompi. Lisenssi on kunnossa (CC BY-SA 4.0).
       */
      tiedosto: 'Al-Ulla Hijaz Railway.jpg',
      teksti: 'Vuonna 1900 Osmanien sulttaani Abdulhamid II käski '
        + 'rakentaa rautatien Damaskoksesta Medinaan. Rata oli ennen '
        + 'kaikkea pyhiinvaeltajia varten: matka, johon '
        + 'kamelikaravaanilla kului noin neljäkymmentä päivää, taittui '
        + 'junalla viidessä. Rahat kerättiin suureksi osaksi '
        + 'lahjoituksina muslimeilta ympäri maailmaa. Kiskoväli oli '
        + 'kapea, vain 1 050 millimetriä, ja rata eteni aavikolla '
        + 'asema asemalta. Vaikeinta ei ollut kiskojen naulaaminen '
        + 'vaan vesi: höyryveturi juo enemmän kuin matkustajat, ja '
        + 'autiomaan osuuksilla vesi, ruoka ja rakennustarpeet '
        + 'kannettiin työmaalle kameleilla. Ensimmäinen juna saapui '
        + 'Medinaan 1. syyskuuta 1908, ja valmista oli silloin '
        + '1 300 kilometriä. Mekkaan olisi ollut vielä neljäsataa, '
        + 'mutta sitä pätkää ei rakennettu koskaan. Junat lakkasivat '
        + 'kulkemasta vuoteen 1920 mennessä, ja Saudi-Arabian puolella '
        + 'rata jäi hiekkaan: asemarakennuksia ja vetureita seisoo yhä '
        + 'paikoillaan. Ratapenkkaa myös kaivellaan yhä, koska '
        + 'kerrotaan, että radalta jäi maahan piilotettua kultaa.',
      selite: 'Kunnostettu höyryveturi ja vaunurivi Hijazin radan '
        + 'vanhalla asemalla Al-Ulassa. Veturin edessä on kiiloiksi '
        + 'taivutettu puskin, savupiipun takana vihreä höyrykupu, ja '
        + 'kauempana soratasanteen laidalla näkyvät aseman matalat '
        + 'rakennukset.',
      lahde: 'Ahmad AlHasanat, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Hijazin rautatie',
    },
  },
  YEM: {
    /*
     * Moduulin oma image1, ja tiedostosivu ilmoittaa samat rajat itse
     * ("Equirectangular projection, N/S stretching 104 %"). Hain
     * luvut `Module:Location map/data/Yemen` -sivulta.
     *
     * Kuvasuhde varmistaa: 1693 × 1106 px antaa 131,24 px/°
     * pitkittäin ja 136,54 px/° leveyspiireittäin eli suhteen 1,0404,
     * ja tasaväliprojektio keskileveysasteella 15,45° vaatii 1,0375.
     *
     * SOKOTRA MAHTUU: saari on 53,3–54,55° E ja 12,1–12,7° N, kartan
     * itäraja 54,7 ja eteläraja 11,4, joten koko saaristo näkyy
     * kaakkoisnurkassa. Siksi Sokotra on myös kaupunkilistalla ja
     * noston aihe. Huom: laudan maamuodoista se on tahallaan
     * pudotettu (irrallinen läiskä avomerellä) — maakartta ja lauta
     * ovat tässä eri mieltä tarkoituksella.
     *
     * ÄLÄ VAIHDA `Yemen location map Topographic.png`:hen, vaikka se
     * on moduulin image2 ja 2350 px: sen lisenssi on pelkkä GFDL 1.2,
     * ei PD eikä CC. Tschubbyn `Reliefkarte Jemen.png` ei ole
     * olemassa, joten muuta vaihtoehtoa ei ole.
     *
     * MERIRAJA HYVÄKSYTTY TIETOISESTI: Adeninlahdella Sokotrasta
     * lounaaseen kulkee katkoviivainen Jemenin ja Somalian meriraja.
     * Se lukee rajaviivana eikä naarmuna, ja koska kelvollista
     * vaihtoehtoa ei ole, tilanne on sama kuin Qatarissa.
     */
    tiedosto: 'Yemen relief location map.jpg',
    lahde: 'Carport, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 19.5, etela: 11.4, lansi: 41.8, ita: 54.7 },
    /*
     * Laudan kohteet Sana ja Aden ovat mukana. Hodeida merkitsee
     * Punaisenmeren rannikon, Sayun Hadramautin sisämaan, Mukalla
     * itäisen sataman ja Sokotra sen, että maahan kuuluu kaukainen
     * saari.
     *
     * TAIZZ ON TAHALLAAN POIS. Se mahtuisi ilman törmäystä, mutta jää
     * Sanan ja Adenin väliin samaan läntiseen vuoristoon eikä kerro
     * kartasta mitään uutta; Sayun kertoo Hadramautin.
     *
     * Sana ja Hodeida ovat ahtain pari: pystyväli on noin 15 px
     * lehden leveydellä. Tarkistettu piirtämällä pisteet kuvan
     * päälle. Aden istuu rantaviivalla, koska Adenin niemimaa on
     * kartan yleistyksessä muutaman pikselin kokoinen — se on oikein.
     */
    kaupungit: [
      { nimi: 'Sana', lat: 15.3483, lon: 44.2064, paa: true },
      { nimi: 'Sayun', lat: 15.9436, lon: 48.7878 },
      { nimi: 'Hodeida', lat: 14.7979, lon: 42.9545 },
      { nimi: 'Mukalla', lat: 14.5425, lon: 49.1242 },
      { nimi: 'Aden', lat: 12.7833, lon: 45.0167 },
      { nimi: 'Sokotra', lat: 12.5, lon: 53.87 },
    ],
    // Kartan kaakkoisnurkassa on erillinen saari; nosto vastaa siihen,
    // mikä se on.
    nosto: {
      otsikko: 'Saari, jonka puut vuotavat punaista',
      tiedosto: 'Ancient Dragon\'s Blood Trees, Socotra Island (13510645265).jpg',
      /*
       * ETÄISYYKSIÄ EI ANNETA KILOMETREINÄ. en.wikipedia sanoo 380 km
       * Arabian niemimaasta ja 232 km Afrikan sarvesta, fi.wikipedia
       * noin 300 ja noin 240. Koska wiki-linkki osoittaa juuri
       * fi-artikkeliin, täsmäluku olisi ristiriidassa sen kanssa,
       * jonka lukija näkee klikatessaan. Suunta on molempien mukaan
       * sama, ja se riittää.
       */
      teksti: 'Jemenille kuuluu Sokotran saari, joka on kaukana '
        + 'keskellä Intian valtamerta. Matkaa Arabian niemimaalle on '
        + 'satoja kilometrejä, ja Afrikan sarvi on selvästi lähempänä '
        + 'kuin oma emämaa. Saari on 132 kilometriä pitkä, ja sen '
        + 'keskellä kohoaa vuoristo. Se irtosi mantereesta niin kauan '
        + 'sitten, että kasvit ehtivät kehittyä omanlaisikseen: '
        + '835 putkilokasvilajista runsas kolmannes kasvaa '
        + 'luonnonvaraisena vain täällä. Kuuluisin on '
        + 'sokotrantraakkipuu, jota sanotaan myös '
        + 'lohikäärmeenveripuuksi. Se kasvaa yhdeksänmetriseksi, ja '
        + 'sen oksat haarautuvat aina kahtia, kunnes latvus '
        + 'levittäytyy tiiviiksi sateenvarjoksi. Lehtiä on vain '
        + 'nuorimpien oksien kärjissä, ja puu pudottaa ne kerralla '
        + 'kolmen tai neljän vuoden välein. Nimi tulee mahlasta: '
        + 'runkoon tehdystä viillosta tihkuu tummanpunaista pihkaa. '
        + 'Sillä on värjätty villaa, liimattu saviastioita ja tehty '
        + 'lääkettä ja huulipunaa. Saarella kasvaa myös maailman '
        + 'ainoa puuksi kasvava kurkkukasvi, jonka runko on paksu '
        + 'kuin pullo. Saarelaisia on noin 50 000, ja he puhuvat '
        + 'arabian lisäksi omaa kieltään sokotraa. Unesco otti saaren '
        + 'maailmanperintöluetteloon vuonna 2008.',
      selite: 'Kaksi sokotrantraakkipuuta kivisellä ylätasangolla. '
        + 'Etummaisen paksu vaalea runko jakautuu ylhäällä sadoiksi '
        + 'ruskeiksi oksiksi, ja vain niiden kärjissä on vihreää — '
        + 'latvus on niin tiivis, että sen alle jää varjoa kuin '
        + 'katokseen.',
      lahde: 'Rod Waddington, Wikimedia Commons (CC BY-SA 2.0)',
      wiki: 'Sokotra',
    },
  },
  CYP: {
    /*
     * Moduulin oma image1, ja rajat on dokumentoitu kahdesti: sekä
     * `Module:Location map/data/Cyprus` (hain sen itse) että
     * tiedostosivu ("N/S stretching 115 %").
     *
     * VENYTYS ON 115 %, EI 1/cos(35,1°) = 122 %, eikä se ole virhe.
     * Kuva on 2126 × 1268 px eli 787 px/° pitkittäin ja 906 px/°
     * leveyspiireittäin; suhde 1,150 vastaa ilmoitettua 115:tä mutta
     * jää 5,9 % todellisesta geometriasta. Venytys on tässä
     * karttaperheessä vapaa parametri — Tschubbyn Zypern-kartta
     * ilmoittaa SAMAT rajat mutta on piirretty 122 %:lla. Se ei
     * vaikuta prosenttiasemointiin, koska molemmat akselit ovat
     * lineaarisia asteissa, ja pisteet osuvat rannoille.
     *
     * KUVA ON MATALA: 1,68:1, joten lehden 340 px:n leveydellä
     * kartta on vain noin 203 px korkea — pelin matalin maakartta.
     * Saari täyttää silti kehyksen, koska rajaus on tiukka.
     *
     * ÄLÄ VAIHDA Tschubbyn `Reliefkarte Zypern.png`:hen: siinä on
     * koko piirijako umpiviivoina ja siniset joet päälle.
     *
     * Kartassa näkyy YK:n puskurivyöhyke ohuena katkoviivana ja
     * tukikohta-alueiden ääriviivat kaakossa. Ne ovat kartan omia
     * merkintöjä, eikä ilman niitä olevaa versiota ole olemassa;
     * oikeassa koossa ne ovat hiusviivoja. Kaupungit on valittu
     * pelkän maantieteen mukaan koko saarelta.
     */
    tiedosto: 'Cyprus relief location map.jpg',
    lahde: 'Carport, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 35.8, etela: 34.4, lansi: 32.1, ita: 34.8 },
    /*
     * FAMAGUSTA ON TAHALLAAN POIS. Se osuu 67,7 %:n kohdalle, saa
     * siis luokan nimi-vasen, ja nimi aukeaisi länteen suoraan
     * Nikosian nimen päälle — pystyeroa on vain 3,6 % eli noin 7 px.
     * Kokeiltu selaimessa. Tilalla Rizokarpaso, joka näyttää
     * Karpasian niemen; ilman sitä kartan itäkolmannes olisi tyhjä.
     *
     * Loput piirtävät saaren muodon: Pafos länsikärki, Limassol
     * etelärannikko, Larnaka kaakko, Kyrenia pohjoisrannikko ja
     * Nikosia keskellä Mesaorían tasankoa.
     */
    kaupungit: [
      { nimi: 'Nikosia', lat: 35.1794, lon: 33.4047, paa: true },
      { nimi: 'Kyrenia', lat: 35.3403, lon: 33.3192 },
      { nimi: 'Rizokarpaso', lat: 35.5986, lon: 34.3806 },
      { nimi: 'Larnaka', lat: 34.9036, lon: 33.6214 },
      { nimi: 'Limassol', lat: 34.6747, lon: 33.0414 },
      { nimi: 'Pafos', lat: 34.7667, lon: 32.4167 },
    ],
    nosto: {
      otsikko: 'Sienisukeltaja löysi laivan saviruukkujen alta',
      tiedosto: 'Girne Kyrenia Castle Shipwreck Museum 02.jpg',
      /*
       * Uppoamisvuotta ei anneta tarkkana: INA sanoo 295 eaa. ja
       * fi.wikipedia 306 eaa. "Noin 300 eaa." on totta molempien
       * mukaan. Samasta syystä myllynkivet ovat "lähes kolmekymmentä"
       * (lähteissä 27 tai 29) ja ruukut "yli neljäsataa" (400–500).
       */
      teksti: 'Vuonna 1965 sienisukeltaja Andreas Kariolou huomasi '
        + 'Kyrenian edustalla merenpohjassa kasan saviruukkuja. '
        + 'Niiden alla oli laiva. Se makasi noin 27 metrin syvyydessä '
        + 'vajaan kahden kilometrin päässä rannasta, ja arkeologit '
        + 'nostivat sen pintaan pala palalta kesinä 1968 ja 1969. '
        + 'Runko oli aleppomäntyä ja noin 14 metriä pitkä, ja siitä '
        + 'oli säilynyt yli puolet. Laiva upposi noin 300 eaa. Se oli '
        + 'silloin jo vanha: arvioiden mukaan se oli purjehtinut '
        + 'kahdeksankymmentä vuotta. Lastina oli yli neljäsataa '
        + 'viiniruukkua, enimmäkseen Rodokselta, lähes kolmekymmentä '
        + 'myllynkiveä painolastina ja ruukuittain manteleita — niitä '
        + 'laskettiin tuhansia. Miehistön koko selvisi keittiöstä: '
        + 'juomakuppeja, lusikoita ja öljykannuja löytyi neljä '
        + 'kutakin, joten merimiehiä oli luultavasti neljä. Laiva on '
        + 'nyt esillä Kyrenian linnan hylkymuseossa, ja sen kuva on '
        + 'Kyproksen 10, 20 ja 50 sentin kolikoissa.',
      selite: 'Kyrenialaisen laivan runko hylkymuseossa puisten '
        + 'pukkien päällä. Kaaret ja lankut ovat mustuneet, mutta '
        + 'kylki ja pohja ovat lähes kokonaisia; taustalla '
        + 'museosalin sininen seinä ja valkoinen kaareva katto.',
      lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Kyrenialainen laiva',
    },
  },
  SYR: {
    /*
     * `Syria relief location map.jpg` EI OLE OLEMASSA (tarkistettu
     * 9.8.2026, 404) — perheen nimeäminen poikkeaa tässä maassa.
     * Tämä on moduulin oma image1, ja rajat on dokumentoitu kolmesti
     * samoina: Module:Location map/data/Syria (hain sen itse), tämän
     * tiedoston oma sivu ja moduulin image-tiedoston malline.
     *
     * Kuvasuhde vahvistaa ketjun: 921 × 806 px eli 118,1 px/°
     * pitkittäin ja 143,9 px/° leveyspiireittäin. Suhde 1,219 vastaa
     * tasaväliprojektiota leveyspiirillä 34,8° (1,217) 0,14 %:n
     * tarkkuudella — erän tarkin osuma.
     *
     * TÄMÄ OLI PELIN ENSIMMÄINEN SVG-MAAKARTTA (Irak on toinen). Se ei
     * ole ongelma: pelin kuvaosoite on Special:FilePath?width=1000, ja
     * testasin sen — Commons rasteroi SVG:n PNG:ksi (content-type
     * image/png). Pieni kanvaasi ei siis rajoita tarkkuutta.
     *
     * ÄLÄ VAIHDA Tschubbyn `Reliefkarte Syrien.png`:hen, vaikka se on
     * 2597 px ja lisenssi kelpaa: se on tasavärinen, Syyria ei erotu
     * naapureista ja Eufrat sekä Assadjärvi hukkuvat taustaan. Tässä
     * ne erottuvat ja naapurimaat on himmennetty.
     */
    tiedosto: 'Syria physical location map.svg',
    lahde: 'NordNordWest ja Urutseg, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 37.6, etela: 32.0, lansi: 34.9, ita: 42.7 },
    /*
     * Laudan kohteet Damaskos ja Aleppo ovat kartan vastakkaisissa
     * päissä. Latakia näyttää rannikon, Hama Oronteksen laakson,
     * Palmyra keskiaavikon ja Dair al-Zaur Eufratin mutkan idässä —
     * ilman viimeistä kartan itäpuolisko olisi tyhjä.
     *
     * HOMS JÄTETTY POIS Haman hyväksi, vaikka se on isompi kaupunki:
     * pisteet ovat käytännössä samalla pituuspiirillä ja vain 7 %
     * erillään pystysuunnassa, eikä toinen kertoisi kartalla mitään
     * lisää. Hama on lisäksi noston paikka.
     */
    kaupungit: [
      { nimi: 'Damaskos', lat: 33.5131, lon: 36.2919, paa: true },
      { nimi: 'Aleppo', lat: 36.2167, lon: 37.1667 },
      { nimi: 'Latakia', lat: 35.5167, lon: 35.7833 },
      { nimi: 'Hama', lat: 35.1333, lon: 36.75 },
      { nimi: 'Palmyra', lat: 34.55, lon: 38.28 },
      { nimi: 'Dair al-Zaur', lat: 35.3333, lon: 40.15 },
    ],
    nosto: {
      otsikko: 'Puiset jättipyörät nostavat jokea ylös',
      tiedosto: 'Hama noria 8287.jpg',
      /*
       * WIKI OSOITTAA JOKEEN EIKÄ KAUPUNKIIN, ja se on harkittu.
       * fi.wikipedian `Hama` mainitsee kyllä vesirattaat, mutta sen
       * kolmas kappale kertoo vuoden 1982 verilöylystä. Peli välttää
       * sotaa ja väkivaltaa tarkoituksella, eikä vesirattaista
       * kertovan jutun "lue lisää" saa viedä lasta sinne. `Orontes`
       * on neutraali ja aiheen vieressä: juuri se joki nostetaan
       * rattailla ylös. Jos Fable haluaa tarkemman osuman, `Hama` on
       * vaihtoehto — mutta se on tarinapuolen päätös.
       *
       * Rattaiden määrää ei anneta tarkkana: en.wikipedia sanoo 17,
       * fi.wikipedia 16. "Toistakymmentä" on totta molempien mukaan.
       */
      teksti: 'Haman läpi virtaa Orontesjoki. Sen rannat ovat korkeat '
        + 'eikä vesi nouse itsestään pelloille, joten kaupunkiin '
        + 'rakennettiin nooria: valtavia puisia vesirattaita, joita '
        + 'joki itse pyörittää. Mikään moottori ei niitä liikuta, '
        + 'pelkkä virtaus riittää. Rattaan kehällä on laatikoita. Ne '
        + 'painuvat veteen, täyttyvät ja nousevat ylös, kunnes '
        + 'kaatavat vetensä kivikouruun, joka vie veden puutarhoihin '
        + 'ja taloihin. Rattaita on jäljellä toistakymmentä. Suurin '
        + 'niistä, al-Muhammadijja, on halkaisijaltaan 21 metriä eli '
        + 'seitsenkerroksisen talon korkuinen, ja sen kouruun on '
        + 'hakattu vuosiluku 1361. Pienin on seitsemän metriä. '
        + 'Akselit veistetään pähkinäpuusta ja muut osat enimmäkseen '
        + 'poppelista, ja puu on vaihdettava uuteen noin viidentoista '
        + 'vuoden välein. Kääntyessään rattaat narisevat ja voihkivat '
        + 'niin että ääni kuuluu kauas. Haman nuoret ovat vanhastaan '
        + 'kiivenneet rattaan kyytiin ja hypänneet ylhäältä jokeen.',
      selite: 'Yksi Haman suurista vesirattaista Orontesjoen '
        + 'rannalla. Puinen kehä kohoaa kivimuurin takaa korkeammalle '
        + 'kuin viereisen rakennuksen holvikaaret, ja joen vihreässä '
        + 'vedessä näkyy rattaan ja kupolien heijastus.',
      lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Orontes',
    },
  },
  IRQ: {
    /*
     * `Iraq relief location map.jpg` EI OLE OLEMASSA (tarkistettu
     * 9.8.2026, 404) — Irakista ei ole tehty perheen relief-versiota.
     * Tämä on moduulin oma image1, ja rajat on dokumentoitu kolmesti
     * samoina: Module:Location map/data/Iraq (hain sen itse),
     * `Iraq location map.svg` ("N/S stretching 115 %") ja
     * `Iraq adm location map.svg` ({{Location map series N}}).
     *
     * KUVASUHTEEN JA GEOMETRIAN ERO ON TAHALLINEN, EI VIRHE.
     * 1238 × 1260 px antaa 117,9 px/° pitkittäin ja 135,5 px/°
     * leveyspiireittäin eli suhteen 1,149, joka osuu kartan omaan
     * ilmoitettuun 115 %:n venytykseen 0,08 %:n tarkkuudella.
     * Tasaväliprojektio keskileveysasteella 33,1° vaatisi 1,193, eli
     * kartta on 3,7 % litteämpi kuin geometrinen ihanne. Sarja
     * pyöristää venytyksen tasalukuun. Prosenttiasemointiin tällä ei
     * ole vaikutusta: rajaus on sama neliö ja molemmat akselit ovat
     * lineaarisia asteissa.
     *
     * VASEMMASSA ALANURKASSA ON KORKEUSASTEIKON SELITELAATIKKO, pelin
     * ainoa. Se peittää Saudi-Arabian ja Jordanian kulmaa, ei
     * yhtäkään kaupunkia, ja lehden koossa se näyttää kartan
     * selitteeltä eikä virheeltä.
     *
     * ÄLÄ VAIHDA Tschubbyn `Reliefkarte Irak.png`:hen, vaikka se on
     * 2861 px, ilman selitelaatikkoa ja lisenssi kelpaa
     * (Cc-by-sa-3.0-migrated): se on litteä, koko Irak on tasaista
     * vihreää, Tigris ja Eufrat hukkuvat taustaan eivätkä suot erotu.
     * Tässä joet, järvet ja Hammarin suot näkyvät sinisenä ja Irak
     * erottuu naapureista vaaleampana.
     */
    tiedosto: 'Iraq physical map.svg',
    lahde: 'Urutseg, Wikimedia Commons (CC0)',
    rajat: { pohjoinen: 37.7, etela: 28.4, lansi: 38.4, ita: 48.9 },
    /*
     * Laudan kohteet Bagdad ja Mosul ovat mukana. Loput piirtävät
     * maan lävitse kulkevan jokilinjan: Kirkuk koillisen vuorten
     * juurelle, Najaf Eufratin länsipuolelle, Nasiriyya soiden
     * reunaan ja Basra Shatt al-Arabin varteen. Kartalta näkee sen,
     * mikä Irakissa on olennaista — asutus on kahden joen varressa.
     *
     * ERBIL ON TAHALLAAN POIS. Se on Irakin Kurdistanin pääkaupunki
     * ja kiinnostavampi kuin Kirkuk, mutta osuu kohtaan 53,4 % /
     * 16,2 %: Mosulin nimi aukeaa itään pisteestä 45,0 % ja ulottuu
     * noin 55 %:iin, ja pystyeroa on vain 1,6 % eli kuusi pikseliä.
     * Nimet menisivät päällekkäin, eikä .nimi-vasen auta, koska sen
     * laukaisee vasta x > 60. Kirkuk täyttää saman kolkan.
     *
     * RAMADI ON POIS SAMASTA SYYSTÄ: se on käytännössä Bagdadin
     * leveyspiirillä (y-ero 1,2 % ≈ 4 px) ja sen nimi törmäisi
     * Bagdadin pisteeseen. Siksi länsipuolisko jää tyhjäksi — se on
     * Anbarin aavikko, joten tyhjyys on totta eikä puute.
     *
     * Najafin koordinaatti on en.wikipediasta: fi.wikipedian
     * pyöristetty 32 / 44,55 on 26 km liian idässä ja siirtäisi
     * pisteen Eufratin väärälle puolelle.
     */
    kaupungit: [
      { nimi: 'Bagdad', lat: 33.3333, lon: 44.4333, paa: true },
      { nimi: 'Mosul', lat: 36.3417, lon: 43.1292 },
      { nimi: 'Kirkuk', lat: 35.4667, lon: 44.3167 },
      { nimi: 'Najaf', lat: 31.9959, lon: 44.3148 },
      { nimi: 'Nasiriyya', lat: 31.0439, lon: 46.2575 },
      { nimi: 'Basra', lat: 30.5, lon: 47.8167 },
    ],
    // Nasiriyya ja Basra ovat kartalla soiden laidalla, ja Hammarin
    // suot näkyvät kuvassa sinisenä läiskänä niiden välissä. Nosto
    // kertoo, mitä siellä tehdään.
    nosto: {
      otsikko: 'Talo, jossa ei ole yhtään naulaa',
      tiedosto: 'Roofing of reed Mudhif - guesthouse, Southern marshlands, Iraq.jpg',
      /*
       * WIKI OSOITTAA JOKEEN EIKÄ SUOHON, ja se on Fablen päätös
       * (9.8.2026), sama linja kuin Syyrian Hama/Orontes-ratkaisussa.
       * Aiheen tarkka osuma olisi `Etelä-Irakin Ahwar` (Unescon kohde
       * 2016), mutta sen kolmannessa kappaleessa on lause Saddam
       * Husseinin kostosta suoarabeille. Tässä pelissä ei ole sorto-
       * eikä sotamainintoja edes yhden lauseen verran silloin, kun
       * neutraali vaihtoehto on olemassa. `Eufrat` on neutraali ja
       * aiheen vieressä: juuri sen ja Tigriksen leviäminen tekee nämä
       * suot. `Suoarabit` on tästä syystä poissuljettu kokonaan —
       * siellä sama asia on jo ingressissä.
       *
       * Soiden pinta-alaa ei anneta: lähteet sanovat 9 000, 15 000 ja
       * 20 000 neliökilometriä. Kaarien lukumäärää ei myöskään:
       * "aina pariton" on yleisesti siteerattu mutta lähteetön.
       */
      teksti: 'Etelä-Irakissa Tigris ja Eufrat leviävät ennen mereen '
        + 'laskuaan laajoiksi kosteikoiksi. Siellä kasvaa '
        + 'qasab-niminen järviruoko, sormen paksuista ja jopa viiden '
        + 'metrin korkuista, ja siitä rakennetaan taloja ilman '
        + 'ainuttakaan naulaa, lautaa tai kiveä. Ruoko sidotaan '
        + 'tiukoiksi pylväiksi, pylväät työnnetään maahan vinosti '
        + 'vastakkain ja taivutetaan yhteen kaariksi. Kaarien päälle '
        + 'kääritään punottuja ruokomattoja, joihin jätetään reikiä '
        + 'valoa ja ilmaa varten. Valmis mudhif eli kylän vierastalo '
        + 'on kuin keltainen tunneli, ja sen ovi osoittaa aina '
        + 'Mekkaan. Englantilainen matkaaja Gertrude Bell istui '
        + 'yhdessä niistä vuonna 1918 ja kirjoitti kotiin, että talo '
        + 'oli täydellisen säännöllinen keltainen tunneli ja lähes '
        + 'viidenkymmenen metrin pituinen. Rakennustapa on '
        + 'hämmästyttävän vanha: Urukin raunioista löytyi noin '
        + '5 300 vuotta vanha kaiverrus, jossa on täsmälleen '
        + 'samanlainen kaarikattoinen ruokotalo. Talo tehdään '
        + 'uudestaan noin kymmenen vuoden välein, eikä se haittaa — '
        + 'ruoko kasvaa suolla joka kesä uudelleen.',
      selite: 'Mudhif nousee Etelä-Irakin soilla. Ruokokaaret on jo '
        + 'pystytetty riviin ja seinät verhottu punotuilla matoilla; '
        + 'katolla kaksi miestä sitoo suoria ruokokimppuja '
        + 'paikoilleen. Vasemmalla nojaa pitkä seiväs, jota pitkin '
        + 'ylös kiivetään.',
      lahde: 'Hassan Al-Jarrah, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Eufrat',
    },
  },
  IRN: {
    /*
     * Moduulin oma image1, ja rajat on dokumentoitu kahdesti:
     * `Module:Location map/data/Iran` (hain sen itse) ja tiedostosivun
     * oma teksti ("Equirectangular projection. Strechted by 118.0%.").
     * Ei yhtään hyppyä ketjussa.
     *
     * Kuvasuhde vahvistaa saman: 1200 × 1071 px antaa 58,5 px/°
     * pitkittäin ja 69,1 px/° leveyspiireittäin eli suhteen 1,180,
     * joka on kartan oma ilmoitettu 118,0 %. Tasaväliprojektio
     * keskileveysasteella 32,25° vaatii 1,182 — 0,17 %:n tarkkuus,
     * Lähi-idän erän toiseksi tarkin osuma Syyrian jälkeen.
     *
     * Merialueet ovat puhtaat: Persianlahti ja Kaspianmeri ovat ilman
     * merirajaviivoja. Kartan harmaat viivat ovat maakunta- ja
     * valtakunnanrajoja, kaikki maalla.
     *
     * ÄLÄ VAIHDA `Iran relief location light map.jpg`:hen, vaikka
     * rajat, koko ja lisenssi ovat samat: vaalennettu versio on pesty,
     * Zagrosin harjanteet katoavat ja Iran erottuu naapureista
     * huonommin. Muita vaihtoehtoja ei ole —
     * `Iran physical location map.svg` ja `Reliefkarte Iran.png`
     * eivät ole olemassa (404, tarkistettu 9.8.2026).
     *
     * Iranin valtionraja on tässä perheessä vain ohut harmaa viiva;
     * maa erottuu väristä eikä viivasta. Se on tyylin hinta.
     */
    tiedosto: 'Iran relief location map.jpg',
    lahde: 'Uwe Dedering, Wikimedia Commons (CC BY-SA 3.0)',
    rajat: { pohjoinen: 40.0, etela: 24.5, lansi: 43.5, ita: 64.0 },
    /*
     * Laudan kolme kohdetta Teheran, Isfahan ja Tabriz ovat mukana.
     * Loput venyttävät kartan täyteen: Mashhad koilliseen 78,6 %:iin,
     * Shiraz Zagrosin eteläpäähän ja Bandar Abbas Hormuzinsalmelle.
     * Ilman kahta viimeistä puolet kartasta olisi tyhjää.
     *
     * BANDAR ABBAS OSUU JUURI RAJAN YLI: x = 62,3 % > 60, joten se saa
     * automaattisesti luokan .nimi-vasen ja nimi aukeaa länteen. Se on
     * välttämätöntä — kaksitoista merkkiä itään auetessaan valuisi
     * kuvan reunan yli.
     *
     * YAZD ON TAHALLAAN POIS, vaikka se olisi tähän maahan sopiva
     * (tuulenpyydystornit, qanatit): se osuu kohtaan 53,0 % / 52,3 %,
     * ja Isfahanin nimi aukeaa itään pisteestä 39,9 % ulottuen noin
     * 54 %:iin. Pystyeroa on vain 4,9 % eli 15 px, kun nimet ovat
     * 13 px korkeita. Ahvaz on pois samasta syystä. Siksi lounainen
     * Khuzestan jää tyhjäksi.
     *
     * Itä ja kaakko jäävät Mashhadia lukuun ottamatta tyhjiksi.
     * Siellä ovat Dasht-e Kavir ja Dasht-e Lut, joten tyhjyys on
     * totta eikä puute.
     *
     * Nimiasu on pelin arkimuoto eikä fi.wikipedian translitteraatio:
     * Mashhad (fi-artikkeli "Mašhad") ja Shiraz (fi-artikkeli
     * "Šīrāz"), samaan tapaan kuin laudalla.
     */
    kaupungit: [
      { nimi: 'Teheran', lat: 35.6962, lon: 51.423, paa: true },
      { nimi: 'Tabriz', lat: 38.0739, lon: 46.296 },
      { nimi: 'Mashhad', lat: 36.287, lon: 59.614 },
      { nimi: 'Isfahan', lat: 32.658, lon: 51.669 },
      { nimi: 'Shiraz', lat: 29.61, lon: 52.5425 },
      { nimi: 'Bandar Abbas', lat: 27.177, lon: 56.266 },
    ],
    // Kartta on melkein kauttaaltaan ruskeaa ylänköä ja aavikkoa, ja
    // silti sinne mahtuu kaupunkeja. Nosto kertoo miten.
    nosto: {
      otsikko: 'Joki, joka virtaa maan alla',
      /*
       * Kuva on juuri se Gonabadin Qasabeh-qanat, josta teksti kertoo:
       * tiedostosivun persiankielinen kuvaus sanoo sen, ja kuva on
       * otettu pitkällä valotusajalla.
       *
       * ÄLÄ VAIHDA tiedostoon `Puits de creusement et de maintenance
       * d'un qanat en Iran.jpg`, vaikka se on Commonsin paras ilmakuva
       * kuilujonosta ja vaikka se on merkitty CC BY-SA 4.0:ksi: sen
       * oma lähderivi kertoo sen olevan ruutukaappaus Arte-kanavan
       * dokumentista, jota lataaja ei voi lisensoida. Jos ilmakuva
       * joskus tarvitaan, aidosti vapaa vastine on
       * `Irán, aéreas (2000) 08.jpg` (LBM1948, CC BY-SA 4.0).
       *
       * Kaksi lukua on jätetty tahallaan pois. Emäkaivon syvyyttä
       * ("yli 300 m") ei saatu varmennettua: Unescon sivu ei vastaa ja
       * Wikipedia antaa toisen qanatin kohdalla 122 m. Qanatien
       * lukumäärästä Iranissa lähteet ovat suorassa ristiriidassa:
       * 50 000, 37 000, 34 355 ja 33 691.
       */
      tiedosto: 'Ghasabe Qanats of Gonabad.jpg',
      teksti: 'Iranin ylängöllä sataa vähän, mutta vuorten juurella '
        + 'maan alla on vettä. Noin kolmetuhatta vuotta sitten '
        + 'keksittiin, miten se saadaan kylään ilman pumppua: '
        + 'kaivetaan maan alle tunneli, joka laskee hyvin loivasti. '
        + 'Ensin kaivetaan syvä emäkaivo sinne mistä vesi löytyy, '
        + 'sitten tunnelia kohti kylää. Matkan varrelle tehdään '
        + 'pystykuiluja muutaman kymmenen metrin välein. Niitä pitkin '
        + 'maa nostetaan ylös ämpäreillä, niistä tulee tunneliin '
        + 'ilmaa, ja niistä kaivaja laskeutuu myöhemmin korjaamaan '
        + 'sortumia. Kaltevuus pitää osata: liian loivassa vesi '
        + 'seisoo, liian jyrkässä virta syö tunnelin rikki. Maan alla '
        + 'vesi ei myöskään haihdu auringossa. Ylhäältä katsottuna '
        + 'valmis qanat näyttää kraatterien jonolta, joka juoksee '
        + 'halki aavikon. Useimmat qanatit ovat alle viiden '
        + 'kilometrin mittaisia, mutta Gonabadin Qasabeh-qanatissa on '
        + '427 kuilua ja tunnelia 33 kilometriä. Se kaivettiin noin '
        + '2 700 vuotta sitten ja antaa yhä vetensä lähes '
        + '40 000 ihmiselle.',
      selite: 'Gonabadin Qasabeh-qanatin tunneli pitkällä '
        + 'valotusajalla kuvattuna. Käsin hakattu kallioholvi kaartuu '
        + 'korkealle, seinien kuopat ja iskunjäljet näkyvät '
        + 'lämpimässä valossa, ja pohjalla juokseva vesi katoaa '
        + 'sileänä nauhana pimeään.',
      lahde: 'Tavasoli mohsen, Wikimedia Commons (CC BY-SA 4.0)',
      wiki: 'Persian qanatit',
    },
  },
};

/*
 * Kaupunkisivun lopun kohdekartta (omistajan toive 7.8.2026: "kuin
 * huvipuiston kartassa" — mahdollisimman yksinkertainen pohja ja
 * muutama kuuluisa kohde, joista osa avaa artikkelin). Sama
 * sijaintikarttaperhe ja prosenttiasemointi kuin MAAKARTAT-taulussa.
 * Kohteen wiki on tarkistettu fi.wikipedian artikkeli; ilman wikiä
 * piste on pelkkä merkki.
 *
 * Tässä luki aiemmin, että nimiVasen kääntäisi nimen pisteen
 * vasemmalle puolelle ahtaassa paikassa. SELLAISTA KENTTÄÄ EI OLE
 * KOSKAAN OLLUT, eikä sitä tarvita: kartalla näkyy vain numero, ja
 * nimet ovat kuvan alla selitelistassa. Tooltip on tarkoituksella
 * keskitetty eikä tunnista reunoja (css/styles.css:8833). Lupaus
 * ehti harhauttaa useaa sessiota ehdottamaan kenttää, joten se on
 * kirjattu tähän eikä vain poistettu. Löytö: Sonnet 1:n QA.
 *
 * KAKSI RAJAUSTA, KUN KARTTA JATKUU REUNOJEN YLI (omistajan tilaus
 * 15.8.2026: "sitä voisi lisätä piirroksessa että kartta jatkuisi
 * pidemmälle"):
 *
 *   rajat        ydinrajaus — se, minkä lehti näyttää LEPOTILASSA.
 *                Sama luku kuin ennen; esittelytekstien sijainti-
 *                viittaukset ("oikeassa alanurkassa") tarkoittavat
 *                tätä näkymää.
 *   piirtoRajat  koko piirretty alue samasta keskipisteestä
 *                (nykyisillä kaupungeilla 1,6-kertainen). Vapaaehtoinen:
 *                ilman sitä kartta toimii kuten ennen.
 *
 * Kaikki prosenttiluvut — kohdepisteet (karttapiste), mittajana
 * (mittakaava) ja kainalot — ovat prosentteja PIIRRETYSTÄ KUVASTA eli
 * piirtoRajat-alueesta silloin kun se on olemassa. Lehti asemoi lavan
 * niin, että ydinrajaus täyttää kehyksen (ui.js: ydinAla), joten
 * lepotilan näkymä pysyy pikselilleen entisenä ja reunus paljastuu
 * vasta zoomatessa.
 */
export const KAUPUNKIKARTAT = {
  /*
   * Vanha Masqat (nippu 2, 12.8.2026). Kuvassa on vain muurien
   * sisäinen vanhakaupunki — Mutrahin suuki neljän kilometrin päässä
   * jää tarkoituksella ulos (perustelu tools/piirra-kaupunkikartta.mjs).
   *
   * OMN-maalehti kertoo Bahlan ja Jabreenin linnoista mutta EI
   * Masqatin omista kohteista, joten tämä kaupunki on lähes kokonaan
   * vapaata aihepiiriä — poikkeus Persianlahden kaupunkien joukossa.
   * Kuudes kohde, hindutemppeli, ei ole linnake eikä palatsi: sen
   * takia rajausta siirrettiin ensin etelämmäs ja sitten lännemmäs,
   * jotta sen numeroympyrä ei istu mittakaavajanan päällä.
   */
  /*
   * Bagdadin Rusafa (nippu 2, 13.8.2026). Kartta on Tigrisin itäranta:
   * Mutanabbin kirjakatu, Qushlan kellotorniaukio, abbasidipalatsi,
   * Khan Mirjan, Mustansiriya-koulu ja Bagdadin museo mahtuvat kaikki
   * runsaan kilometrin ruutuun. Länsirannalta otetaan mukaan sen
   * verran, että sillat näkyvät.
   *
   * KARTTA VAATI palvelutiet: true. Rusafan kujat on OSM:ssä merkitty
   * service- ja footway-teiksi, joten vakiokysely löysi vain
   * kolmasosan kaduista ja kuva näytti autiolta — perustelu ja
   * mittaukset tools/piirra-kaupunkikartta.mjs:n bagdad-lohkossa.
   *
   * RAJAUS SISÄLLÖLLE: peli ei käsittele nykykonflikteja. Bagdadin
   * kohdalla se tarkoittaa, ettei vuoden 2003 sotaa, miehitystä,
   * pommi-iskuja eikä Mutanabbin kadun vuoden 2007 iskua käsitellä.
   * Kohteet kuvataan kulttuurikohteina omalla historiallaan.
   * Mustansiriya-koulu on JO IRQ-maalehdessä (neljä koulukuntaa saman
   * pihan ympärillä, vihkiminen 1233) ja asia-valokuvat.js:n
   * kuvatekstissä, joten sen nähtävyysjuttu kertoo eri asian.
   */
  /*
   * İzmirin vanha keskusta (nippu 2, 13.8.2026). Konakin aukio
   * kellotorneineen lännessä, Kemeraltin basaari keskellä ja antiikin
   * agora idässä — kaikki kävelymatkan päässä. Kadifekalen linnavuori
   * jää ulos (perustelu tools/piirra-kaupunkikartta.mjs).
   *
   * RAJAUS SISÄLLÖLLE: peli ei käsittele nykykonflikteja. İzmirin
   * kohdalla se tarkoittaa, ettei vuoden 1919 maihinnousua, Kreikan ja
   * Turkin sotaa eikä vuoden 1922 paloa käsitellä — OSM:ssä on kaksi
   * battlefield-merkintää juuri tämän kartan alueella, eivätkä ne ole
   * lehden aiheita. Kohteet kuvataan kulttuurikohteina.
   */
  /*
   * Ankaran Ulus (nippu 2, 13.8.2026). Vanha Ankara on kokonaan tässä
   * ruudussa: linnavuori itäreunassa, Augustuksen temppeli ja
   * roomalainen kylpylä pohjoisessa, Anatolian sivilisaatioiden museo
   * etelässä. Kızılayn moderni keskusta jää tarkoituksella ulos.
   *
   * RAJAUS SISÄLLÖLLE: peli ei käsittele nykykonflikteja. Ankaran
   * kartalla on OSM:ssä sekä vuoden 2016 muistomerkki että
   * vapaussotamuseo; kumpikaan ei ole lehden aihe. Kohteet kuvataan
   * antiikin, bysantin ja ottomaanien kerroksina.
   */
  /*
   * Aleppon vanhakaupunki (nippu 2, 13.8.2026). AVAIN ON halab eikä
   * aleppo: laudan kaupunki-id on halab (js/packs/middleeast.js), ja
   * KAUPUNKIKARTAT haetaan sillä id:llä. Väärällä avaimella kartta ei
   * renderöidy lainkaan eikä virhettä näy missään — tämä huomattiin
   * vasta selaintarkistuksessa ("aleppo ei laudalla").
   *
   * Linnoitus omalla
   * kummullaan idässä, kaupunginportit lännessä ja etelässä, khanit
   * keskellä. Rajaus on tiukka, koska kujaverkko on tiheä.
   *
   * RAJAUS SISÄLLÖLLE ON TÄMÄN KAUPUNGIN TÄRKEIN SÄÄNTÖ. Peli ei
   * käsittele nykykonflikteja, ja Raamatun rajaus nimeää syyrialaiset
   * kohteet nimenomaan kulttuurikohteina. Aleppon lehti kertoo siis
   * ajasta ennen ensimmäistä maailmansotaa: ajjubidien linnoitus,
   * mamelukkien khanit, ottomaanien talot.
   *
   * KAKSI KOHDETTA JÄTETTIIN TARKOITUKSELLA POIS, vaikka ne ovat
   * kaupungin tunnetuimpia: Umaijadien suurmoskeija ja Souq
   * al-Madinan katettu suuki. Kummankin englanninkielinen artikkeli
   * on nykyään pääosin tuhon kuvausta, eikä niistä saa kirjoitettua
   * kulttuurijuttua ilman että lähde vie sotaan. Valitut kuusi
   * kohdetta ovat sellaisia, joista on kerrottavaa rakennuksena.
   */
  /*
   * Damaskoksen vanhakaupunki (nippu 2, 13.8.2026). Sama rajaus kuin
   * Aleppossa: peli ei käsittele nykykonflikteja, ja syyrialaiset
   * kohteet ovat kulttuurikohteita. Lehti kertoo roomalaisesta,
   * ajjubidien, mamelukkien ja ottomaanien Damaskoksesta.
   *
   * Suora katu (Via Recta) on VARATTU: siitä on jo kuvateksti
   * asia-valokuvat.js:ssä, joten se ei ole karttakohde eikä jutun aihe.
   */
  damaskos: {
    polku: 'assets/kartat/damaskos-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 33.516, etela: 33.5045, lansi: 36.299, ita: 36.32,
    },
    esittely: 'Damaskoksen vanhakaupunki on suorakaide, ja sen muoto '
      + 'on roomalainen: kaupunki kaavoitettiin ruutuun, ja itä-länsi- '
      + 'akseli kulkee yhä läpi koko kartan. Muurit ovat paikoin samoja '
      + 'kuin roomalaisaikana, ja portit ovat niissä samoissa kohdissa.\n\n'
      + 'Keskellä on suuri suorakaiteen muotoinen piha-alue, joka on '
      + 'ollut pyhä paikka kolmella eri tavalla: siinä seisoi ensin '
      + 'aramealainen temppeli, sitten roomalainen Jupiterin temppeli, '
      + 'sitten kirkko ja lopulta moskeija. Sama muuri on kiertänyt '
      + 'niitä kaikkia.',
    kohteet: [
      { nimi: 'Damaskoksen linnoitus', lat: 33.5119, lon: 36.3021 },
      { nimi: 'Umaijadien moskeija', lat: 33.5116, lon: 36.3067 },
      { nimi: 'Hamidiyyan suuki', lat: 33.5114, lon: 36.3082 },
      { nimi: "Khan As'ad Pashan", lat: 33.5093, lon: 36.3067 },
      { nimi: 'Itäportti', lat: 33.5094, lon: 36.3179 },
      { nimi: 'Kisanin portti', lat: 33.5065, lon: 36.3157 },
    ],
  },
  tokio: {
    polku: 'assets/kartat/tokio-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 35.7245, etela: 35.705, lansi: 139.7645, ita: 139.801,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, 17.8.2026).
    piirtoRajat: {
      pohjoinen: 35.73035, etela: 35.69915, lansi: 139.75355, ita: 139.81195,
    },
    varikartta: 'assets/kartat/tokio-varikartta.png',
    esittely: 'Kartalla on kaksi erilaista Tokiota. Vasemmassa '
      + 'laidassa on laaja puisto, jonka eteläkärjessä on '
      + 'munanmuotoinen lampi, ja sen kupeessa kulkee etelästä '
      + 'pohjoiseen leveä ratapiha katkoviivoineen. Oikea puoli on '
      + 'aivan toisenlainen: pikkukatujen ruudukkoa niin tiheässä, '
      + 'että korttelit ovat vain kymmenien metrien kokoisia.\n\n'
      + 'Se tiheä puoli on shitamachi, alakaupunki, ja se on Tokion '
      + 'vanhinta kaupunkia. Oikeassa alakulmassa mutkittelee '
      + 'Sumida-joki, ja sen ja ruudukon välissä erottuu pieni '
      + 'suorakaiteen muotoinen alue: Sensō-jin temppelipiiri. '
      + 'Kohteet jakautuvat kahteen ryhmään aivan kuin kaupunkikin — '
      + 'idässä Kaminarimon, Sensō-ji ja niiden takana huvipuisto '
      + 'Hanayashiki, ja lännessä Uenon kukkulalla puisto, '
      + 'kansallismuseo, Kan\'ei-ji, Tōshō-gū, Shitamachi-museo ja '
      + 'Iwasakien talo. Väliin jää asema, jonne pohjoisen junat '
      + 'tulevat.',
    kohteet: [
      /*
       * KYMMENEN KOHDETTA (kohdemäärien nosto 18.8.2026; ennen kuusi).
       * Neljä lisättyä ovat Ueno Tōshō-gū, Uenon asema, Hanayashiki ja
       * Kyū-Iwasaki-tei. Pisteet en-Wikipedian coord-malleista ja
       * Wikidatan P625:stä, ristiintarkistettuina Overpassista.
       *
       * MIKSI EI PÄÄTOIMITTAJAN ESITTÄMIÄ NELJÄÄ. Keisarillisen
       * palatsin itäpuutarhat (35,686/139,757), Meiji-pyhäkkö
       * (35,676/139,699) ja Shibuyan risteys (35,660/139,700) ovat
       * kaikki tämän rajauksen ULKOPUOLELLA — 5–10 km lännessä ja
       * etelässä — eikä Tokion maamerkkejä saa yhteen ruutuun (ks.
       * tools/piirra-kaupunkikartta.mjs:n tokio-lohko). Yanakan vanha
       * kortteli (35,7276) jää 345 metriä pohjoisrajan yli eli
       * reunukselle, jossa se ei näkyisi lepotilassa lainkaan.
       * Kappabashi ja Ameya-yokochō mahtuisivat, mutta ne ovat jo
       * kaupunkilehden oppaan omina jaksoina ("Katu, jolla myydään
       * muoviruokaa", "Torikuja radan alla") — juttu olisi ollut
       * saman tekstin toisinto. Nämä neljä eivät ole lehdessä.
       *
       * Kaikki kymmenen ajettu tools/tarkista-karttapisteet.mjs:llä:
       * maalla, mittakaavajanan ulkopuolella, ja ainoa päällekkäisyys
       * on Sensō-ji × Hanayashiki 8 % eli "tavallista".
       */
      { nimi: 'Kaminarimon', lat: 35.7111, lon: 139.7964 },
      { nimi: 'Sensō-ji', lat: 35.7147, lon: 139.7968 },
      { nimi: 'Hanayashiki', lat: 35.7155, lon: 139.7947 },
      { nimi: 'Kan\'ei-ji', lat: 35.7214, lon: 139.7743 },
      { nimi: 'Tokion kansallismuseo', lat: 35.7191, lon: 139.7758 },
      { nimi: 'Ueno Tōshō-gū', lat: 35.7154, lon: 139.7706 },
      { nimi: 'Uenon asema', lat: 35.7134, lon: 139.7767 },
      { nimi: 'Uenon puisto', lat: 35.7122, lon: 139.7711 },
      { nimi: 'Shitamachi-museo', lat: 35.7102, lon: 139.7726 },
      { nimi: 'Kyū-Iwasaki-tei', lat: 35.7097, lon: 139.7678 },
    ],
  },
  soul: {
    polku: 'assets/kartat/soul-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 37.587, etela: 37.5655, lansi: 126.9695, ita: 126.9985,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, 17.8.2026).
    piirtoRajat: {
      pohjoinen: 37.59345, etela: 37.55905, lansi: 126.9608, ita: 127.0072,
    },
    varikartta: 'assets/kartat/soul-varikartta.png',
    esittely: 'Soul on kymmenen miljoonan asukkaan kaupunki, mutta '
      + 'tämä kartta näyttää siitä vain kaksi ja puoli kilometriä: sen '
      + 'nurkan, josta kaikki alkoi. Joseon-dynastia siirsi '
      + 'pääkaupunkinsa tänne vuonna 1394 ja rakensi kolme asiaa '
      + 'ensimmäisenä — palatsin, esi-isien pyhäkön ja kellotornin. Ne '
      + 'kaikki ovat yhä kartalla, ja niiden väliin mahtuu kävellen '
      + 'puoli tuntia.\n\nKartan ilme syntyy kolmesta suuresta '
      + 'aitauksesta, jotka rikkovat muuten tiheän ruudukon. '
      + 'Vasemmalla ylhäällä on Gyeongbokgungin palatsi paksun '
      + 'muurin sisällä; sen alueella erottuu kaksi vesiallasta, iso '
      + 'suorakaide ja pieni pyöreä lampi. Oikeassa yläkulmassa on '
      + 'toinen ja vielä laajempi aitaus, Changdeokgung, jonka '
      + 'takapihalla mutkittelee metsäinen puutarha omine '
      + 'lampineen. Sen alapuolella on soikea vihreä saareke: '
      + 'Jongmyon pyhäkkö, jonne kuninkaiden sielut kannettiin '
      + 'kuoleman jälkeen.\n\nKuvan alalaidassa kulkee lännestä itään '
      + 'kapea vesiviiva. Se on Cheonggyecheon, puro joka jakoi vanhan '
      + 'kaupungin pohjoiseen ja eteläiseen puoliskoon — sen '
      + 'pohjoispuolta sanotaan yhä Bukchoniksi eli pohjoiskyläksi. '
      + 'Puron ja palatsien välissä on Jongno, kellokatu, ja sen '
      + 'varrella loput kohteet: Insadongin käsityökatu, Jogyesan '
      + 'temppeli, Tapgol-puisto ja Bosingak. Palatsin edessä seisoo '
      + 'Gwanghwamun, jonka kautta koko akseli alkaa. Namsanin torni, '
      + 'Han-joki ja Gangnam jäävät kaikki tämän ruudun ulkopuolelle '
      + 'etelään.',
    kohteet: [
      /*
       * YHDEKSÄN KOHDETTA (kohdemäärien nosto 18.8.2026; ennen kuusi).
       * Pisteet lähteistä eikä arvattuina: en-Wikipedian coord-malleista
       * ja Wikidatan P625:stä (Jongmyo, Insa-dong), koska
       * en-artikkelissa ei aina ole koordinaattia lainkaan.
       *
       * MIKSI EI PÄÄTOIMITTAJAN ESITTÄMIÄ KAHTA. Namdaemun eli
       * Sungnyemun (37,5600) on 610 metriä eteläreunan alapuolella ja
       * N Seoul Tower (37,5512) kokonaan toisella kukkulalla — sen
       * esittelyteksti sanoo itsekin, että Namsan jää ulos.
       * Kummankin tilalle otettiin saman roolin täyttävä kohde
       * rajauksen sisältä: portiksi Gwanghwamun ja asukkaiden omaksi
       * paikaksi Jogyesa. Cheonggyecheon mahtuisi (Cheonggyen aukio
       * 37,569/126,978, tarkistettu maalle), mutta se on jo
       * kaupunkilehden oppaan jaksona "Puro moottoritien alta".
       *
       * fi-Wikipedia tarkistettu rajapinnasta: palatsin artikkeli on
       * nimellä `Gyeongbok` (ei Gyeongbokgung), ja Changdeokgung sekä
       * Jongmyo ovat omilla nimillään. Bukchonista, Tapgol-puistosta,
       * Bosingakista, Gwanghwamunista, Insadongista ja Jogyesasta EI
       * ole fi-artikkelia, joten ne nojaavat omaan juttuunsa.
       *
       * tarkista-karttapisteet: kaikki yhdeksän maalla, yksikään ei
       * peitä mittakaavajanaa eikä yksikään pari mene päällekkäin.
       */
      { nimi: 'Gyeongbokgung', lat: 37.5799, lon: 126.9768, wiki: 'Gyeongbok' },
      { nimi: 'Gwanghwamun', lat: 37.576, lon: 126.977 },
      { nimi: 'Bukchonin hanok-kylä', lat: 37.5831, lon: 126.9836 },
      { nimi: 'Changdeokgung', lat: 37.5794, lon: 126.9928, wiki: 'Changdeokgung' },
      { nimi: 'Jongmyo', lat: 37.5747, lon: 126.9936, wiki: 'Jongmyo' },
      { nimi: 'Insadong', lat: 37.573, lon: 126.9862 },
      { nimi: 'Jogyesa', lat: 37.5739, lon: 126.9819 },
      { nimi: 'Tapgol-puisto', lat: 37.5711, lon: 126.9885 },
      { nimi: 'Bosingak', lat: 37.5699, lon: 126.9834 },
    ],
  },
  shanghai: {
    polku: 'assets/kartat/shanghai-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 31.248, etela: 31.224, lansi: 121.4655, ita: 121.4955,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, 17.8.2026).
    piirtoRajat: {
      pohjoinen: 31.2552, etela: 31.2168, lansi: 121.4565, ita: 121.5045,
    },
    varikartta: 'assets/kartat/shanghai-varikartta.png',
    esittely: 'Kartan oikeaa laitaa hallitsee leveä joki, joka kaartaa '
      + 'alhaalta ylös ja poistuu yläkulmasta. Se on Huangpu, ja sen '
      + 'länsirannalla kulkeva kaartuva katu on Bund eli kiinaksi '
      + 'Waitan. Vasemmalta tulee toinen, paljon kapeampi vesi, joka '
      + 'mutkittelee kuin nauha ja yhtyy jokeen oikeassa yläkulmassa: '
      + 'se on Suzhou-puro. Näiden kahden veden kainalo on se paikka, '
      + 'jossa ulkomaiset kauppahuoneet aloittivat vuonna 1846 — '
      + 'Shanghai avattiin sopimussatamaksi 1843, ja isoisän matkan '
      + 'aikaan Bund oli jo täynnä kauppahuoneiden '
      + 'konttoreita.\n\nKuvan alaosassa erottuu jotain, mitä muualla '
      + 'kartalla ei ole: soikea katukehä, jonka sisällä kadut ovat '
      + 'aivan eri kokoisia kuin ulkopuolella. Kehä on vanhan '
      + 'kaupunginmuurin paikka. Muuri rakennettiin 1553 japanilaisia '
      + 'merirosvoja vastaan ja purettiin 1912; sen tilalle tuli katu, '
      + 'ja kehän sisään jäi kiinalainen vanhakaupunki kujineen. Juuri '
      + 'siellä on Yu-puutarha. Kehän ulkopuolinen ruutukaava on '
      + 'sopimussataman aikaista uutta kaupunkia.\n\nVasemmalla '
      + 'puolella on iso vihreä alue, Kansanpuisto ja Kansanaukio. Se '
      + 'oli 1860-luvulta lähtien laukkaradan sisäkenttä, ja radan '
      + 'soikea muoto näkyy yhä katujen kulmissa. Sieltä itään lähtee '
      + 'Nanjing-katu, kaupungin kauppakatu, joka johtaa suoraan '
      + 'Bundille. Pudongin pilvenpiirtäjät ovat joen toisella '
      + 'puolella heti kartan itäreunan takana — ne tulevat näkyviin, '
      + 'kun karttaa suurentaa.',
    kohteet: [
      /*
       * YHDEKSÄN KOHDETTA (kohdemäärien nosto 18.8.2026; ennen kuusi).
       * Pisteet en-Wikipedian coord-malleista ja Wikidatan P625:stä
       * (Shanghain museo, Kaupunginjumalan temppeli, Dajingin
       * pavilonki); Fuyoun moskeijan piste on Overpassista, koska
       * artikkelin koordinaatti on pyöristetty kahteen desimaaliin ja
       * osoittaisi kortteleiden yli.
       *
       * KAUPUNGINJUMALAN TEMPPELI OTETTIIN NYT MUKAAN, vaikka tässä
       * luki ennen että se jätettiin pois. Syy oli mitattu — 165
       * metriä Yu-puutarhasta — ja se mitattiin uudelleen: reunuksen
       * jälkeen (piirtoRajat 1,6× 17.8.2026) lava on 1,6-kertainen
       * pikseleissä, ja tarkista-karttapisteet antaa peittoasteeksi
       * 13 % eli "tavallista, ei toimenpidettä". Vanhan kaupungin
       * tärkeintä paikkaa ei kannata jättää pois 13 prosentin takia.
       *
       * MIKSI EI PÄÄTOIMITTAJAN ESITTÄMIÄ KOLMEA. Jing'anin temppeli
       * (121,445), Tianzifang (31,210) ja Longhua (31,174/121,450)
       * ovat kaikki rajauksen ulkopuolella — Longhua kahdeksan
       * kilometriä etelässä. Tilalle valittiin kolme vanhan kaupungin
       * kohdetta, jotka ovat samalla vastapaino sopimussataman
       * puolelle: temppeli, kaupunginmuurin viimeinen pala ja
       * moskeija, jonka kaupungin oma muslimiyhteisö rakensi 1870.
       *
       * fi-Wikipedia tarkistettu rajapinnasta: Bundista, Yu-
       * puutarhasta ja Nanjing-kadusta ei ole fi-artikkelia, joten
       * ne nojaavat omaan juttuunsa. Ei myöskään kolmesta uudesta.
       */
      { nimi: 'Bund', lat: 31.238, lon: 121.4861 },
      // Silta saa olla vedellä (tarkista-karttapisteet.mjs): piste on
      // sillan keskellä Suzhou-puron päällä, koska juuri se on kohde.
      { nimi: 'Waibaidun silta', lat: 31.2431, lon: 121.49 },
      { nimi: 'Rauhanhotelli', lat: 31.2411, lon: 121.4846 },
      { nimi: 'Yu-puutarha', lat: 31.2292, lon: 121.4875 },
      { nimi: 'Kaupunginjumalan temppeli', lat: 31.2278, lon: 121.4881 },
      { nimi: 'Fuyoun moskeija', lat: 31.2298, lon: 121.4842 },
      { nimi: 'Nanjing-katu', lat: 31.2347, lon: 121.4744 },
      { nimi: 'Shanghain museo', lat: 31.2303, lon: 121.4706 },
      { nimi: 'Dajingin pavilonki', lat: 31.2265, lon: 121.4788 },
    ],
  },
  isfahan: {
    polku: 'assets/kartat/isfahan-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 32.6725, etela: 32.6485, lansi: 51.666, ita: 51.689,
    },
    esittely: 'Isfahanin vanha kaupunki on kartalla tiheä kujaverkko, '
      + 'jonka läpi vedetään kaksi eri-ikäistä viivastoa. Vanhempi on '
      + 'orgaaninen: lyhyitä mutkittelevia kujia, jotka kiertävät '
      + 'kortteleita eivätkä noudata mitään ruudukkoa. Uudempi on '
      + 'suora, ja se näkyy leveinä väylinä, jotka halkovat kuvan '
      + 'luoteesta kaakkoon ja lännestä itään.\n\n'
      + 'Keskellä kuvaa erottuu pieni vaalea suorakaide, joka ei ole '
      + 'rakennus vaan vesiallas: se on kaupungin suuren aukion '
      + 'keskellä. Aukion laidoilla ovat Ali Qapu ja Shaahin moskeija, '
      + 'ja niistä pohjoiseen johtaa basaari, joka päättyy '
      + 'Jameh-moskeijaan kartan yläosassa. Etelässä ovat Hasht '
      + 'Behesht ja Chahar Baghin koulu leveän puistokadun varrella.',
    kohteet: [
      { nimi: 'Jameh-moskeija', lat: 32.6697, lon: 51.6853 },
      { nimi: 'Isfahanin basaari', lat: 32.6631, lon: 51.6753 },
      { nimi: 'Ali Qapu', lat: 32.6572, lon: 51.6767 },
      { nimi: 'Shaahin moskeija', lat: 32.6544, lon: 51.6775 },
      { nimi: 'Hasht Behesht', lat: 32.6534, lon: 51.6702 },
      { nimi: 'Chahar Baghin koulu', lat: 32.6513, lon: 51.6693 },
    ],
  },
  teheran: {
    polku: 'assets/kartat/teheran-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 35.692, etela: 35.6715, lansi: 51.4115, ita: 51.4365,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, E00-viimeistely 17.8.2026). Reunukselle jäävät
    // Baharestanin aukio idässä ja Park-e Shahr lännessä; lepotilassa
    // lehti näyttää yhä pelkän rajat-alueen.
    piirtoRajat: {
      pohjoinen: 35.69815, etela: 35.66535, lansi: 51.404, ita: 51.444,
    },
    varikartta: 'assets/kartat/teheran-varikartta.png',
    esittely: 'Teheranin vanha ydin on kartalla ruutu, jonka halki '
      + 'kulkee kaksi pitkää suoraa väylää pohjoisesta etelään. '
      + 'Vasemmassa laidassa on laaja puisto, jonka sisäiset polut '
      + 'kiertävät soikioina, ja sen alapuolella korttelit ovat suuria '
      + 'ja harvakatuisia.\n\n'
      + 'Idässä ja etelässä kuva muuttuu toisenlaiseksi: siellä on '
      + 'tiheä kujaverkko, jossa viivat ovat ohuita ja lyhyitä. '
      + 'Eteläreunan tiheä tilkku on basaari — se ei ole yksi halli '
      + 'vaan katettujen kujien kortteli, ja juuri siksi sen kujat '
      + 'näkyvät kartalla jalankulkureitteinä eivätkä katuina. '
      + 'Kohteet nousevat etelästä pohjoiseen: basaari alimpana, sen '
      + 'yläpuolella Golestanin palatsi ja Dar al-Fonun, niiden '
      + 'pohjoispuolella Toopkhanen aukio keskellä kuvaa, ja ylimpänä '
      + 'kansallismuseo ja Bagh-e Mellin portti lännessä sekä '
      + 'Masoudiehin talo ja Sepahsalarin moskeija idässä.',
    kohteet: [
      /*
       * KAHDEKSAN KOHDETTA (kohdemäärien nosto 18.8.2026; ennen kuusi).
       * Molemmat lisätyt ovat en-Wikipedian coord-malleista
       * (Imam Khomeini Square, National Garden).
       *
       * MIKSI EI PÄÄTOIMITTAJAN ESITTÄMIÄ. Teheranin basaari on jo
       * listan ensimmäinen kohde, ja sekä Tabiat-silta (35,7546) että
       * Milad-torni (35,7448/51,3752) ovat kilometrejä rajauksen
       * ulkopuolella pohjoisessa ja lännessä. Tilalle valittiin kaksi
       * kohdetta, jotka ovat rajauksen sisällä ja tyhjässä keskiosassa:
       * Toopkhanen aukio, kaupungin ensimmäinen moderni aukio vuodelta
       * 1867 eli isoisän matkan ajalta, ja Bagh-e Mellin portti.
       *
       * NIMI ON ARKIMUOTO EIKÄ VIRALLINEN: aukion virallinen nimi on
       * nykyään Imam Khomeinin aukio, mutta teheranilaiset sanovat
       * yhä Toopkhaneh, ja peli kertoo paikan sen omalla historialla
       * (Raamattu: geopolitiikka kuvataan, ei tuomita). Nimenvaihdot
       * kerrotaan jutussa.
       *
       * tarkista-karttapisteet: kaikki kahdeksan maalla, ei janan
       * päällä, ei yhtään päällekkäistä paria.
       */
      { nimi: 'Teheranin basaari', lat: 35.675, lon: 51.4194 },
      { nimi: 'Golestanin palatsi', lat: 35.6797, lon: 51.4203 },
      { nimi: 'Dar al-Fonun', lat: 35.6838, lon: 51.4219 },
      { nimi: 'Toopkhanen aukio', lat: 35.6857, lon: 51.4215 },
      { nimi: 'Iranin kansallismuseo', lat: 35.687, lon: 51.4146 },
      { nimi: 'Bagh-e Mellin portti', lat: 35.6877, lon: 51.4168 },
      { nimi: 'Masoudiehin talo', lat: 35.689, lon: 51.4281 },
      { nimi: 'Sepahsalarin moskeija', lat: 35.6888, lon: 51.4329 },
    ],
  },
  tabriz: {
    polku: 'assets/kartat/tabriz-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 38.085, etela: 38.07, lansi: 46.286, ita: 46.304,
    },
    esittely: 'Tabrizin keskusta on kartalla ruutu, jonka poikki kulkee '
      + 'kaksi leveää väylää ja jonka koillisnurkassa mutkittelee joen '
      + 'uoma tienpenkereiden välissä. Pohjoisosassa kujaverkko tihenee '
      + 'ja rakennusten ääriviivoja on tiheässä: siellä on basaari, joka '
      + 'ei ole yksi halli vaan katettujen kujien ja pihojen verkosto.\n\n'
      + 'Muualla kadut ovat pitkiä ja suoria ja liikenneympyrät '
      + 'erottuvat selvästi. Kohteet jakautuvat kahteen ryhmään: '
      + 'basaari ja perustuslakitalo ylhäällä, ja alempana Arg, '
      + 'Saat-torni, museo ja Sininen moskeija samalla itä-länsi-linjalla.',
    kohteet: [
      { nimi: 'Tabrizin basaari', lat: 38.0808, lon: 46.2922 },
      { nimi: 'Perustuslakitalo', lat: 38.0829, lon: 46.2899 },
      { nimi: 'Arg', lat: 38.0724, lon: 46.2886 },
      { nimi: 'Saat-torni', lat: 38.0736, lon: 46.2954 },
      { nimi: 'Azerbaidžanin museo', lat: 38.0735, lon: 46.299 },
      { nimi: 'Sininen moskeija', lat: 38.0736, lon: 46.3011 },
    ],
  },
  riad: {
    polku: 'assets/kartat/riad-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 24.65, etela: 24.628, lansi: 46.7, ita: 46.722,
    },
    esittely: 'Riadin kartalla on kaksi päätä. Alalaidassa on vanha '
      + 'ydin: Masmakin linnoitus ja Imam Turkin suurmoskeija ovat '
      + 'parinsadan metrin päässä toisistaan, ja niiden ympärillä '
      + 'korttelit ovat pieniä. Ylälaidassa on Murabban kortteli, jonne '
      + 'hallinto siirtyi vanhan ytimen ulkopuolelle.\n\n'
      + 'Kahden pään väli on runsaat kaksi kilometriä, ja se näkyy '
      + 'kartalla leveinä suorina väylinä. Korttelit ovat ympärillä '
      + 'isoja, ja mittakaavaero vanhan ytimen ja muun kartan välillä '
      + 'erottuu suoraan.',
    kohteet: [
      { nimi: 'Masmakin linnoitus', lat: 24.6311, lon: 46.7133 },
      { nimi: 'Imam Turkin suurmoskeija', lat: 24.6307, lon: 46.7108 },
      { nimi: 'Punainen palatsi', lat: 24.6425, lon: 46.7092 },
      { nimi: 'Riadin vesitorni', lat: 24.645, lon: 46.7122 },
      { nimi: 'Murabban palatsi', lat: 24.6465, lon: 46.7093 },
      { nimi: 'Saudi-Arabian kansallismuseo', lat: 24.6472, lon: 46.7108 },
    ],
  },
  /*
   * LUXORIN PNG PIIRRETTIIN UUDELLEEN 20.8.2026, ja rajat ovat
   * tarkoituksella ennallaan. Vanha kuva oli laiha, koska temppelialueet
   * ovat OSM:ssä historic=ruins / archaeological_site -alueita, joita
   * piirtäjä ei silloin hakenut; nyt hakee, ja luxor-rajaus sai
   * rauniokaupunki-lipun (tools/piirra-kaupunkikartta.mjs). Muutos on
   * mitattu: tarkista-karttapisteet luki ennen viisi kuudesta pisteestä
   * paljaalta paperilta (#f6eeda), nyt neljä kuudesta osuu rauniolaikun
   * päälle (#ece0c2). Alla oleva esittely kuvaa siis vasta nyt sitä,
   * mitä kuvassa oikeasti on: Karnakin muurin sisällä näkyvät pihat ja
   * salit, ja Mutin piirin pyhä järvi erottuu hevosenkenkänä.
   */
  luxor: {
    polku: 'assets/kartat/luxor-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 25.7225, etela: 25.693, lansi: 32.6335, ita: 32.6625,
    },
    esittely: 'Luxorin kartta on kapea kaistale Niilin itärantaa, ja '
      + 'sillä on kaksi päätä. Eteläpäässä on Luxorin temppeli aivan '
      + 'rannan tuntumassa, pohjoispäässä Karnakin laaja temppelialue '
      + 'omine muureineen. Väli on runsaat kaksi kilometriä, ja se '
      + 'kuljettiin ennen suoraan: temppeliltä toiselle vei sfinksien '
      + 'reunustama kuja.\n\n'
      + 'Karnakin ulkomuuri erottuu kartalla paksuna suorakaiteena, ja '
      + 'sen sisällä näkyvät temppelin pihat ja salit. Eteläpuolella on '
      + 'oma muurinsa ympäröimä Mutin alue, jonka pyhä järvi on '
      + 'hevosenkengän muotoinen. Nykyinen kaupunki on kasvanut '
      + 'temppelien väliin ja ympärille.',
    kohteet: [
      { nimi: 'Luxorin temppeli', lat: 25.6996, lon: 32.6394 },
      { nimi: 'Luxorin museo', lat: 25.7077, lon: 32.6445 },
      { nimi: 'Sfinksikuja', lat: 25.7084, lon: 32.6485 },
      { nimi: 'Mutin temppeli', lat: 25.7111, lon: 32.656 },
      { nimi: 'Khonsun temppeli', lat: 25.7168, lon: 32.6559 },
      { nimi: 'Karnakin suuri pylvässali', lat: 25.7186, lon: 32.6579 },
    ],
  },
  halab: {
    polku: 'assets/kartat/halab-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 36.2075, etela: 36.193, lansi: 37.146, ita: 37.168,
    },
    esittely: 'Aleppon vanhakaupunki on kartalla helppo tunnistaa: '
      + 'kuvan oikeassa laidassa on soikea rengas, ja se on '
      + 'linnoituksen vallihauta. Linnoitus seisoo omalla kummullaan '
      + 'keskellä kaupunkia, ja kumpu on osin ihmisten tekemä — '
      + 'asuinkerroksia on kasautunut päällekkäin tuhansien vuosien '
      + 'ajan.\n\n'
      + 'Kummun ympärillä kujat ovat kapeita ja mutkittelevia, ja '
      + 'niiden verkosto on keskiaikainen. Kaupunki oli karavaanitien '
      + 'pää: idästä tullut tavara purettiin täällä ja jatkoi matkaa '
      + 'Välimerelle. Siitä ovat jäljelle jääneet khanit, kauppiaiden '
      + 'majatalot, joita on kartan keskiosassa useita.',
    kohteet: [
      { nimi: 'Aleppon linnoitus', lat: 36.1994, lon: 37.1625 },
      { nimi: 'Antiokian portti', lat: 36.1989, lon: 37.1516 },
      { nimi: 'Qinnesrinin portti', lat: 36.1945, lon: 37.1559 },
      { nimi: 'Saippuakhan', lat: 36.2000, lon: 37.1581 },
      { nimi: 'Arghunin sairaala', lat: 36.1967, lon: 37.1569 },
      { nimi: 'Beit Ajiqbash', lat: 36.2060, lon: 37.1565 },
    ],
  },
  ankara: {
    polku: 'assets/kartat/ankara-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 39.948, etela: 39.936, lansi: 32.851, ita: 32.868,
    },
    esittely: 'Ankara on Turkin pääkaupunki vuodesta 1923, mutta tämä '
      + 'kartta ei ole siitä kaupungista. Ulus on se Ankara, joka oli '
      + 'olemassa jo silloin: linnavuori, jonka muurit näkyvät kuvan '
      + 'oikeassa laidassa, ja sen juurella kortteleita, joissa on '
      + 'roomalaisia, bysanttilaisia ja ottomaanisia kerroksia '
      + 'päällekkäin.\n\n'
      + 'Kaupunki oli pitkään pieni maakuntakeskus, ja juuri siksi '
      + 'antiikin kerros säilyi — sitä ei rakennettu pois. Kartan '
      + 'pohjoisreunassa on roomalaisen kylpylän pohjakaava, keskellä '
      + 'Augustuksen temppeli ja idässä linnavuori, ja niiden välit '
      + 'kävelee alle puolessa tunnissa.',
    kohteet: [
      { nimi: 'Ankaran linna', lat: 39.9415, lon: 32.8654 },
      { nimi: 'Augustuksen temppeli', lat: 39.9442, lon: 32.8583 },
      { nimi: 'Roomalainen kylpylä', lat: 39.9464, lon: 32.8533 },
      { nimi: 'Julianuksen pylväs', lat: 39.9433, lon: 32.8559 },
      { nimi: 'Anatolian sivilisaatioiden museo', lat: 39.9380, lon: 32.8618 },
      { nimi: 'Linnanportin kellotorni', lat: 39.9377, lon: 32.8637 },
    ],
  },
  izmir: {
    polku: 'assets/kartat/izmir-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 38.426, etela: 38.413, lansi: 27.124, ita: 27.142,
    },
    esittely: 'İzmir on rakennettu lahden pohjukkaan, ja sen vanha '
      + 'keskusta on puolikuun muotoinen. Muoto ei ole sattumaa: '
      + 'kartan keskellä kaartuvat kadut seuraavat antiikin sataman '
      + 'rantaviivaa, joka on sittemmin täytetty maaksi. Basaari '
      + 'kasvoi umpeenkasvaneen sataman päälle.\n\n'
      + 'Kemeraltin kujat, Konakin aukio ja roomalainen agora ovat '
      + 'kaikki saman kilometrin sisällä, ja niiden välissä kaupunki '
      + 'on yhtenäistä vanhaa rakennuskantaa: moskeijoita, '
      + 'karavaaniseraajeja ja katettuja käytäviä.',
    kohteet: [
      { nimi: 'İzmirin kellotorni', lat: 38.4189, lon: 27.1287 },
      { nimi: 'Kemeraltin basaari', lat: 38.4187, lon: 27.1329 },
      { nimi: 'Hisarin moskeija', lat: 38.4215, lon: 27.1336 },
      { nimi: 'Sulu Han', lat: 38.4216, lon: 27.1361 },
      { nimi: 'Smyrnan agora', lat: 38.4190, lon: 27.1384 },
      { nimi: 'Salepçioğlun moskeija', lat: 38.4170, lon: 27.1325 },
    ],
  },
  bagdad: {
    polku: 'assets/kartat/bagdad-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 33.348, etela: 33.332, lansi: 44.376, ita: 44.400,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, E00-viimeistely 17.8.2026). Lepotilassa lehti näyttää
    // yhä tarkalleen yllä olevan rajat-alueen; reunus paljastuu
    // zoomatessa ja panoroitaessa.
    piirtoRajat: {
      pohjoinen: 33.3528, etela: 33.3272, lansi: 44.3688, ita: 44.4072,
    },
    varikartta: 'assets/kartat/bagdad-varikartta.png',
    esittely: 'Bagdad perustettiin vuonna 762 Tigrisin länsirannalle '
      + 'täydellisen pyöreäksi kaupungiksi. Siitä ei ole jäljellä '
      + 'mitään: pyöreä kaupunki on maan alla nykykaupunginosien '
      + 'kohdalla, eikä sen muuria ole löydetty. Kaupungin vanha '
      + 'säilynyt puoli on toisella rannalla.\n\n'
      + 'Tämä kartta on Rusafa, Tigrisin itäranta. Kaikki kuvan '
      + 'kohteet ovat kävelymatkan päässä toisistaan, ja ne ovat eri '
      + 'aikakausilta: abbasidien 1200-luku, al-Wazirin moskeija 1599, '
      + 'Mirjanin karavaaniseraaji 1359, Haydarkhanan moskeija '
      + '1820-luvulta, ottomaanien kasarmiaukio ja 1900-luvun '
      + 'kirjakatu.',
    kohteet: [
      /*
       * KAHDEKSAN KOHDETTA (kohdemäärien nosto 18.8.2026; ennen kuusi).
       * Molemmat lisätyt pisteet Overpassista ja ristiintarkistettu
       * en-Wikipedian coord-mallista (al-Wazeer 33,3392/44,3885).
       *
       * MIKSI EI PÄÄTOIMITTAJAN ESITTÄMIÄ. Mustansiriya-koulu ja
       * Mutanabbin kirjakatu OLIVAT JO listalla, ja al-Rashid-kadulla
       * on jo oma nostonsa kaupunkilehden arkisivulla ("Ensimmäinen
       * leveä katu"). Kartalta puuttui sen sijaan kokonaan yksi
       * rakennustyyppi: moskeija. Nyt niitä on kaksi, kahdelta eri
       * vuosisadalta ja saman kadun varrelta.
       *
       * RAJAUS SISÄLLÖLLE PÄTEE MYÖS NÄIHIN (ks. lohkon alku):
       * Haydarkhanan moskeijan 1900-luvun mielenosoitushistoria
       * kuvataan lyhyesti ja tuomitsematta, eikä vuoden 2003 jälkeistä
       * aikaa käsitellä.
       *
       * tarkista-karttapisteet: molemmat maalla, ei janan päällä.
       * al-Wazir menee 12–15 % päällekkäin museon ja Mustansiriyan
       * kanssa, mikä on työkalun asteikolla "tavallista".
       */
      { nimi: 'Mutanabbin katu', lat: 33.3410, lon: 44.3888 },
      { nimi: 'Qushlan kellotorni', lat: 33.3412, lon: 44.3860 },
      { nimi: 'Abbasidipalatsi', lat: 33.3431, lon: 44.3835 },
      { nimi: 'Haydarkhanan moskeija', lat: 33.3425, lon: 44.3894 },
      { nimi: 'Khan Mirjan', lat: 33.3386, lon: 44.3925 },
      { nimi: 'Mustansiriya-koulu', lat: 33.3385, lon: 44.3896 },
      { nimi: 'Bagdadin museo', lat: 33.3401, lon: 44.3895 },
      { nimi: 'al-Wazirin moskeija', lat: 33.3392, lon: 44.3885 },
    ],
  },
  masqat: {
    polku: 'assets/kartat/masqat-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 23.6205, etela: 23.6085, lansi: 58.5805, ita: 58.602,
    },
    esittely: 'Masqat ei ole yksi kaupunki vaan jono pieniä lahtia '
      + 'vuorten välissä. Vanha Masqat on niistä itäisin: puolikuun '
      + 'muotoinen poukama, jonka ympärillä kalliot nousevat suoraan '
      + 'ylös. Juuri siksi kaupunki syntyi tähän — poukama on '
      + 'luonnonsatama, jonne pääsee mereltä mutta jonne maitse '
      + 'pääsee vain kahdesta portista. Portugalilaiset ottivat '
      + 'sataman 1507 ja rakensivat sen suulle kaksi linnaketta, '
      + 'Jalalin ja Miranin, jotka valvovat väylää edelleen. Muuri '
      + 'kiersi kaupungin, ja portit suljettiin öisin vielä '
      + '1970-luvulla.'
      + '\n\n'
      + 'Kartalla meri tulee sisään oikealta ja ylhäältä, ja '
      + 'poukaman ympärillä kulkee ohut rantaviiva. Vanhankaupungin '
      + 'kadut näkyvät keskellä pienenä tiheänä ruudukkona — se on '
      + 'koko historiallinen Masqat, alle kilometrin levyinen. '
      + 'Katkoviivat ovat vanhan kaupunginmuurin jäänteitä. '
      + 'Ympärillä oleva vaalea ala ei ole tyhjää tonttimaata vaan '
      + 'paljasta vuorta: siihen ei ole rakennettu, koska siihen ei '
      + 'voi rakentaa. Kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      { nimi: 'Masqatin portti', lat: 23.6175, lon: 58.5869 },
      { nimi: 'Al-Miranin linnake', lat: 23.6172, lon: 58.5931 },
      { nimi: 'Al-Jalalin linnake', lat: 23.6167, lon: 58.5979 },
      { nimi: 'Al Alamin palatsi', lat: 23.6160, lon: 58.5947 },
      { nimi: 'Bait Al Zubair', lat: 23.6155, lon: 58.5921 },
      { nimi: 'Motishwar Mandir', lat: 23.6097, lon: 58.5882 },
    ],
  },
  /*
   * Kuwait City (nippu 2, 12.8.2026). Kolme kohdetta on jo KWT-
   * maalehdessä omina juttuinaan — Kuwait-tornit, suurmoskeija ja
   * Mubarakiyan tori (maalehdessä ruokajuttuna) — koska maalehti
   * kirjoitettiin ennen kuin kaupungilla oli lehteä. Niiden
   * nähtävyysjutut kertovat siksi eri asian kuin maalehti.
   *
   * Kansallismuseo ja kansalliskirjasto jätettiin pois, vaikka
   * molemmat olisivat kelvollisia: ne ovat parinsadan metrin päässä
   * Sadu Housesta, ja numeroympyrät olisivat menneet päällekkäin.
   */
  kuwait: {
    polku: 'assets/kartat/kuwait-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 29.392, etela: 29.366, lansi: 47.962, ita: 48.010,
    },
    esittely: 'Kuwait City on rakennettu lahden kaarelle, ja koko '
      + 'kaupunki katsoo veteen päin. Vanha kaupunki oli 1950-luvulle '
      + 'asti pieni: muurin sisällä asui muutama kymmenentuhatta '
      + 'ihmistä, ja muurin ulkopuolella alkoi aavikko. Öljy muutti '
      + 'mittakaavan kerralla. Vanha savitiilikaupunki purettiin '
      + 'lähes kokonaan 1950- ja 1960-luvuilla ja tilalle piirrettiin '
      + 'uusi keskusta kehäteineen — juuri ne kaaret, jotka kartalla '
      + 'erottuvat leveimpinä viivoina. Vanhasta kaupungista jäivät '
      + 'jäljelle tori, muutama portti ja rannan palatsi.'
      + '\n\n'
      + 'Kartalla meri on ylhäällä ja vasemmalla. Rannassa erottuu '
      + 'satamien suorakulmaisia altaita, ja oikeassa yläkulmassa '
      + 'niemi työntyy veteen: siinä ovat Kuwait-tornit. Kehätiet '
      + 'kaartavat rannan suuntaisesti, ja niiden väliin jäävät '
      + 'korttelit ovat sitä tiheämpiä mitä lähempänä rantaa ollaan. '
      + 'Vasemmassa alakulmassa näkyy pieni tiheä ruudukko: se on '
      + 'vanhan torin kortteli, ainoa kohta jossa kadut ovat yhä '
      + 'kapeita. Kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      { nimi: 'Kuwait-tornit', lat: 29.3900, lon: 48.0031 },
      { nimi: 'Al Hamra -torni', lat: 29.3790, lon: 47.9932 },
      { nimi: 'Seifin palatsi', lat: 29.3808, lon: 47.9711 },
      { nimi: 'Kuwaitin suurmoskeija', lat: 29.3789, lon: 47.9747 },
      { nimi: 'Mubarakiyan tori', lat: 29.3748, lon: 47.9741 },
      { nimi: 'Sadu House', lat: 29.3744, lon: 47.9672 },
    ],
  },
  /*
   * Nikosia (nippu 2, 12.8.2026). Rajaus on pieni, koska venetsialaisten
   * muurien kehä on halkaisijaltaan vain noin puolitoista kilometriä.
   *
   * KOHTEIKSI EI VALITTU muuria, Famagustan porttia eikä Ledran katua,
   * vaikka ne ovat kaupungin tunnetuimmat: kaikki kolme on jo varattu
   * muualla pelissä (asia-valokuvat.js:n kuvatekstit ja Nikosian
   * kulttuurivisa). Tilalle otettiin kuusi kohdetta, joista mikään ei
   * esiinny pelissä ennestään. Selimiyen viereinen Bedesten jätettiin
   * pois, koska se on kolmenkymmenen metrin päässä moskeijasta ja
   * numeroympyrät olisivat menneet päällekkäin — se kerrotaan
   * Selimiyen jutun sisällä.
   */
  nikosia: {
    polku: 'assets/kartat/nikosia-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 35.184, etela: 35.166, lansi: 33.350, ita: 33.378,
    },
    esittely: 'Nikosia on tasangon keskellä, ei rannikolla, ja se on '
      + 'ainoa Kyproksen suurista kaupungeista jota ei perustettu '
      + 'sataman viereen. Kaupunki kasvoi joen mutkaan, ja sen muoto '
      + 'päätettiin kerralla vuonna 1567: venetsialaiset purkivat '
      + 'keskiaikaisen kaupungin laidat ja rakensivat tilalle '
      + 'ympyränmuotoisen muurin, jossa on yksitoista nuolenkärjen '
      + 'muotoista bastionia. Kehä on kartan selvin muoto, ja se on '
      + 'yhä kaupungin sisärengas: muurin sisäpuoli on vanhakaupunki, '
      + 'ulkopuoli nykyistä Nikosiaa.'
      + '\n\n'
      + 'Kartalla tähtimuoto erottuu heti keskeltä. Sen sisällä kadut '
      + 'ovat kapeita ja mutkittelevia, ulkopuolella suoria ja leveitä '
      + '— ero näkyy viivojen tiheydestä. Muurin ympärillä kiertää '
      + 'vaaleampi kaistale: se on entinen vallihauta, jossa kasvaa '
      + 'nykyään puita ja jonka pohjalla on puistoja ja '
      + 'urheilukenttiä. Vanhankaupungin kohteet ovat kävelymatkan '
      + 'päässä toisistaan; kartan itäreunassa kulkeva leveä väylä on '
      + 'jo muurien ulkopuolella. Kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      { nimi: 'Selimiyen moskeija', lat: 35.1765, lon: 33.3645 },
      { nimi: 'Büyük Han', lat: 35.1763, lon: 33.3625 },
      { nimi: 'Faneromenin kirkko', lat: 35.1735, lon: 33.3625 },
      { nimi: 'Omeryen hamam', lat: 35.1726, lon: 33.3654 },
      { nimi: 'Kyproksen museo', lat: 35.1717, lon: 33.3553 },
      { nimi: 'Leventis-museo', lat: 35.1706, lon: 33.3617 },
    ],
  },
  /*
   * Doha (nippu 2:n pilottikaupunki, 12.8.2026). Rajaus kattaa vanhan
   * ytimen Corniche-rantakadun kaaressa; West Bayn tornit jäävät
   * pohjoiseen kartan ulkopuolelle tarkoituksella (ks. perustelu
   * tools/piirra-kaupunkikartta.mjs:n KAUPUNGIT-taulussa).
   *
   * Kohteista kolme — Souq Waqif, Islamilaisen taiteen museo ja
   * kansallismuseo — on jo Qatarin MAALEHDESSÄ omina juttuinaan,
   * koska maalehti kirjoitettiin ennen kuin Dohalla oli lehteä.
   * Niiden nähtävyysjutut kertovat siksi eri asian kuin maalehti
   * (docs/raportit/lehtityo-2026-08-12-nippu2-suunnittelu.md).
   */
  doha: {
    polku: 'assets/kartat/doha-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 25.302, etela: 25.278, lansi: 51.518, ita: 51.556,
    },
    esittely: 'Doha kasvoi matalan lahden pohjukkaan. Vielä 1900-luvun '
      + 'alussa se oli helmenpyyntisatama, jonka talot seisoivat aivan '
      + 'rantaviivassa: vesi tuli nykyisten kortteleiden kohdalle, ja '
      + 'veneet vedettiin hiekalle. Öljyn jälkeen rantaa siirrettiin. '
      + 'Lahden pohjukkaa täytettiin 1970- ja 1980-luvuilla niin '
      + 'paljon, että syntyi kokonaan uutta maata, ja sen reunaa '
      + 'kiertämään rakennettiin Corniche — seitsemän kilometrin '
      + 'kaari, joka on kartan selvin muoto. Vanha kaupunki jäi sen '
      + 'taakse sisämaahan: Souq Waqif ja Msheirebin kortteli ovat '
      + 'siellä, missä ranta ennen oli.'
      + '\n\n'
      + 'Kartalla meri tulee sisään ylhäältä ja kaartaa vasemmalta '
      + 'oikealle. Rantaviivan myötäistä kaarta seuraa leveä katu; se '
      + 'on Corniche. Keskellä ylhäällä työntyy veteen niemeke, jonka '
      + 'kärjessä on Islamilaisen taiteen museo omalla tekosaarellaan '
      + '— se erottuu kartalta selvästi, koska sen ympärillä ei ole '
      + 'mitään muuta. Oikeassa reunassa vesi työntyy takaisin maalle: '
      + 'siellä on vanha satama. Cornichen eteläpuolella katuverkko '
      + 'muuttuu tiheäksi kujien seitiksi, ja juuri siinä ovat tori ja '
      + 'linnake. Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * VESITARKISTIN VAROITTAA TÄSTÄ PISTEESTÄ, JA SE ON OIKEIN NÄIN.
       * tools/tarkista-karttapisteet.mjs sanoo "vettä 100 %", koska
       * museon oma tekosaari ei piirry Overpassin aineistosta
       * monikulmiona — mutta museo todella seisoo lahdella irti
       * rannasta (en-Wikipedia: 25,2950 / 51,5393, ja sama sanotaan
       * QAT-maalehden jutussa "seisoo omalla saarellaan"). Piste on
       * siis totuudenmukainen; työkalun ohje sallii veden sillan ja
       * majakan kohdalla, ja tämä on sama tapaus. ÄLÄ SIIRRÄ pistettä
       * rannalle — se osoittaisi väärään paikkaan.
       */
      { nimi: 'Islamilaisen taiteen museo', lat: 25.2950, lon: 51.5393 },
      { nimi: 'Corniche', lat: 25.2904, lon: 51.5352 },
      { nimi: 'Souq Waqif', lat: 25.2882, lon: 51.5332 },
      { nimi: 'Qatarin kansallismuseo', lat: 25.2868, lon: 51.5495 },
      { nimi: 'Al Koot -linnake', lat: 25.2866, lon: 51.5310 },
      { nimi: 'Msheireb', lat: 25.2828, lon: 51.5256 },
    ],
  },
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
      /*
       * Neljä lisäkohdetta 18.8.2026 (6 → 10, lehden viimeistely).
       * Koordinaatit Nominatimista, kaikki rajauksen sisällä ja
       * vähintään 13 prosenttiyksikön päässä lähimmästä naapurista,
       * joten numeroympyrät eivät mene päällekkäin. Kaksi osuu
       * määritelmän mukaan vedelle: silta ylittää lahden ja
       * Neitsyttorni seisoo omalla luodollaan salmessa — molemmat ovat
       * oikein, ks. tools/tarkista-karttapisteet.mjs:n otsake.
       */
      { nimi: 'Süleymaniyen moskeija', lat: 41.0162, lon: 28.964 },
      { nimi: 'Galatan silta', lat: 41.0201, lon: 28.9731 },
      { nimi: 'Sirkecin asema', lat: 41.0152, lon: 28.9764 },
      { nimi: 'Neitsyttorni', lat: 41.0211, lon: 29.0041 },
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
    /*
     * Värikartta satelliitin tilalle (omistajan päätös 15.8.2026, ks.
     * berliini alla). Sama juliste samalta piirtoRajat-alueelta —
     * Suomenlinnan kainalo piirtyy väreissä samoille
     * prosenttipaikoille kuin piirroksessa.
     */
    varikartta: 'assets/kartat/helsinki-varikartta.png',
    /*
     * Rajaus leveni neljänneksellä 15.8.2026 (sama omistajan tilaus
     * kuin Berliinissä): 3,7 × 3,3 km → 4,7 × 4,1 km samasta
     * keskipisteestä. Perustelut ja hylätty epäsymmetrinen vaihtoehto
     * on kirjattu tools/piirra-kaupunkikartta.mjs:n helsinki-lohkoon.
     * Lyhyesti: symmetrinen laajennus riitti tuomaan Kallion kirkon
     * ja Linnanmäen kuvaan, ja niemen kärki pysyi irti alalaidasta.
     *
     * JA JULISTE JATKUU TÄMÄN YLI (omistajan tilaus 15.8.2026, ks.
     * berliini alla): piirtoRajat on 1,6-kertainen ala samasta
     * keskipisteestä eli 7,5 × 6,6 km. Lepotilassa lehti näyttää yhä
     * yllä olevan rajat-alueen; reunuksella ovat Seurasaari ja
     * Meilahti lännessä, Vallila ja Kumpula pohjoisessa sekä
     * Korkeasaari idässä. Juuri se avovesi, jota ydinrajaukseen ei
     * saanut ottaa, on nyt reunuksella, jossa se ei syö kuvan ydintä.
     * Värikartta on piirretty samalta piirtoRajat-alueelta ja kattaa
     * myös reunuksen.
     */
    rajat: { pohjoinen: 60.1877, etela: 60.1508, lansi: 24.9076, ita: 24.9919 },
    piirtoRajat: { pohjoinen: 60.19877, etela: 60.13973, lansi: 24.88231, ita: 25.01719 },
    /*
     * Kainalokartta Suomenlinnasta. Se on lehden historiaosion
     * pääkohde eikä mahdu mihinkään järkevään päärajaukseen — 3 km
     * kaakkoon. Ruutu on sijoitettu kuvan kaakkoiskulman avomerelle,
     * eli se peittää samalla sen alueen, jossa muuten olisi vähiten
     * katsottavaa, ja se on oikea suunta.
     *
     * Korkeus on työkalun laskema (leveys × pääkuvan kuvasuhde /
     * kainalon kuvasuhde); älä muuta sitä käsin. Levennys 15.8.2026
     * muutti pääkuvan kuvasuhdetta hitusen, ja luku päivittyi
     * 28.85 → 28.81.
     *
     * LUVUT OVAT PROSENTTEJA PIIRRETYSTÄ KUVASTA, ja reunus 15.8.2026
     * muutti ne kaikki. Ruutu on lepotilan näkymässä täsmälleen
     * entisessä kohdassaan: ydinrajaus alkaa laajennetussa kuvassa
     * kohdasta 18,75 % ja on 62,5 % leveä ja korkea, joten vanhat
     * luvut muuntuivat kaavalla 18,75 + vanha × 0,625 (mitat ×
     * 0,625): x 76 → 66.25, y 69.15 → 61.97, leveys 22 → 13.75,
     * korkeus 28.81 → 18 (tarkka arvo 18,0042; vanha 28.81 oli
     * pyöristetty luvusta 28,8067). Ruudun koko pikseleinä ei muutu,
     * koska kuvakin leveni samassa suhteessa.
     */
    kainalot: [
      { rajat: { pohjoinen: 60.152, etela: 60.1368, lansi: 24.969, ita: 24.9955 },
        x: 66.25, y: 61.97, leveys: 13.75, korkeus: 18 },
    ],
    esittely: 'Helsinki ei ole aina ollut tässä. Kustaa Vaasa perusti sen '
      + 'vuonna 1550 Vantaanjoen suulle Tallinnan kilpailijaksi, mutta '
      + 'satama oli matala, ja vuonna 1640 koko kaupunki siirrettiin '
      + 'runsaat viisi kilometriä etelämmäs Vironniemen kärkeen. Niemellä '
      + 'on merta kolmella sivulla, ja edustalla on saaria ja matalikkoja, '
      + 'joiden välistä laiva pääsee vain kapeita väyliä pitkin. Siksi '
      + 'Ruotsi alkoi 1748 rakentaa väylän suulle merilinnoitusta. Kun '
      + 'Venäjän keisari valitsi Helsingin pääkaupungiksi vuonna 1812, '
      + 'linnoitus oli jo valmiina.\n\nKartalla niemi näkyy kokonaan. '
      + 'Idässä työntyy mereen Katajanokka, joka oli ennen kiinni '
      + 'mantereessa; nyt sen erottaa kaivettu kanava, jonka yli kulkee '
      + 'neljä siltaa. Väliin jää Eteläsatama, jonka perukassa on '
      + 'Kauppatori. Ylhäällä oleva lahti on Töölönlahti — se näyttää '
      + 'järveltä, mutta on merenlahti, jonka rautatiepenger sulkee: veden '
      + 'ainoa tie mereen kulkee penkereen ali kapeana väylänä. Penkereeltä '
      + 'etelään levittäytyy kartan levein raita, ratapiha, joka päättyy '
      + 'päärautatieasemaan. Rata loppuu siihen: junat peruuttavat ulos. '
      + 'Oikeassa alanurkassa on oma pieni kartta Suomenlinnasta.',
    kohteet: [
      /*
       * Lännestä itään ja lopuksi etelään. Kauppatori jätettiin pois
       * vaikka se mahtuisi: se olisi kasannut kolmannen numeron
       * Senaatintorin ja Katajanokan väliin. Se mainitaan esittelyssä
       * nimeltä, ja silakkamarkkinat ovat lehdessä omana nostonaan.
       *
       * Kallion kirkko jäi ennen 22 metriä pohjoisrajan ulkopuolelle,
       * eikä rajaa nostettu, koska 60,187 olisi vaatinut 4,3 km
       * leveän kuvan. Levennys 15.8.2026 teki juuri sen (4,7 km), ja
       * omistajan päätöksellä (15.8.) Kallion kirkko ja Linnanmäki
       * ovat nyt myös kohdelistalla.
       */
      { nimi: 'Temppeliaukion kirkko', lat: 60.1731, lon: 24.9253, wiki: 'Temppeliaukion kirkko' },
      /*
       * Wikipedian piste (60,1884) on huvipuiston keskellä 78 m
       * rajauksen yläpuolella; ympyrä seisoo siksi puiston
       * eteläosassa pääportin puolella rajauksen sisällä — sama
       * ratkaisu kuin London Eyellä, jonka keskipiste osui jokeen.
       * Piste on aivan ylälaidassa, joten ympyrä voi leikkautua
       * lepotilassa hieman; reunuslaajennus (piirtoRajat) väljentää
       * tämän aikanaan.
       */
      { nimi: 'Linnanmäki', lat: 60.1869, lon: 24.9401, wiki: 'Linnanmäki' },
      { nimi: 'Päärautatieasema', lat: 60.1719, lon: 24.9414, wiki: 'Helsingin päärautatieasema' },
      { nimi: 'Kaisaniemen puisto', lat: 60.1747, lon: 24.9458, wiki: 'Kaisaniemen puisto' },
      { nimi: 'Kallion kirkko', lat: 60.1842, lon: 24.9492, wiki: 'Kallion kirkko' },
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
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 52.39435, etela: 52.34715, lansi: 4.8518, ita: 4.9382 },
    varikartta: 'assets/kartat/amsterdam-varikartta.png',
    esittely: 'Amsterdam syntyi padosta. Amstel-joki laski ennen suoraan '
      + 'IJ-lahteen, ja lahdesta pääsi merelle. Noin vuonna 1270 joki '
      + 'padottiin, ja padon päälle kasvoi kylä Amstelredam — siitä tuli '
      + 'Amsterdam. Pato oli myös lastauspaikka: merilaivat jäivät lahden '
      + 'puolelle, jokiveneet toiselle, ja tavara kannettiin välissä. Maa '
      + 'oli pehmeää suota, joten kanavia kaivettiin sekä kulkuväyliksi '
      + 'että kuivattamaan maata. Pato on yhä paikallaan, mutta sen päällä '
      + 'on nyt aukio, jonka nimi on lyhyesti Dam.\n\nKartalla näkyy '
      + 'kolme puolikuuta: Herengracht, Keizersgracht ja Prinsengracht, '
      + 'joita alettiin kaivaa vuonna 1613. Vesi pilkkoo keskustan noin '
      + 'yhdeksäksikymmeneksi saareksi, ja niitä yhdistää toistatuhatta '
      + 'siltaa. Ylhäällä levittäytyy avoin vesi, entinen merenlahti IJ, ja '
      + 'siellä on kaupungin satama. Keskusasema ei ole rannalla vaan veden '
      + 'päällä: se rakennettiin 1880-luvulla kolmelle tekosaarelle, jotka '
      + 'kasattiin hiekasta lahden pohjaan.',
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
    // Värikartta satelliitin tilalle (omistajan päätös 15.8.2026,
    // ks. berliini alla): sama juliste samalta piirtoRajat-alueelta.
    varikartta: 'assets/kartat/pariisi-varikartta.png',
    /*
     * Rajaus leveni neljänneksellä 15.8.2026 (sama omistajan tilaus
     * kuin Berliinissä): 6,6 × 5,0 km → 8,3 × 6,2 km samasta
     * keskipisteestä. Kohdepisteet lasketaan tästä lohkosta
     * (karttapiste), joten ne siirtyivät kuvassa itsestään. Sekä
     * piirros että satelliittikuva on haettu uudelleen tällä
     * rajauksella.
     *
     * Eteläreuna maksoi takaisin sen, minkä vanha rajaus joutui
     * jättämään: Panthéon ja Luxembourgin puutarha ovat nyt kuvassa
     * (ks. kohteet-lohkon kommentti).
     *
     * JA JULISTE JATKUU TÄMÄN YLI (omistajan tilaus 15.8.2026, ks.
     * berliini alla): piirtoRajat on 1,6-kertainen ala samasta
     * keskipisteestä eli 13,3 × 10,0 km. Lepotilassa lehti näyttää
     * yhä yllä olevan rajat-alueen; reunuksella ovat muun muassa Bois
     * de Boulognen itälaita ja Père-Lachaise. Värikartta on piirretty
     * samalta piirtoRajat-alueelta ja kattaa myös reunuksen.
     */
    rajat: { pohjoinen: 48.8976, etela: 48.8414, lansi: 2.2657, ita: 2.3788 },
    piirtoRajat: { pohjoinen: 48.91446, etela: 48.82454, lansi: 2.23177, ita: 2.41273 },
    esittely: 'Pariisi alkoi saarelta. Seine haarautuu keskellä kaupunkia '
      + 'kahdeksi kapeaksi uomaksi, ja niiden väliin jää Île de la Cité — '
      + 'saari, joka on kymmenen katua pitkä ja viisi leveä. Kapeat haarat '
      + 'oli helppo ylittää ja saari helppo puolustaa, joten kelttiläinen '
      + 'kalastajakylä ja sen jälkeen roomalaisten Lutetia asettuivat juuri '
      + 'tähän. Kaupunki kasvoi saarelta molemmille rannoille, ja joen '
      + 'suuri kaari on yhä sen selkäranka.\n\nKartan keskellä näkyy '
      + 'saari, josta sillat vievät molemmille rannoille. Vanhin Seinen '
      + 'silloista on Pont Neuf, joka rakennettiin vuosina 1578–1607 — nimi '
      + 'tarkoittaa uutta siltaa. Vasemmalla tusina katua kohtaa yhdessä '
      + 'pisteessä ja piirtää kartalle tähden; sen keskellä seisoo '
      + 'Riemukaari. Ylhäällä oikealla kohoaa Montmartre, kaupungin korkein '
      + 'kukkula, 130 metriä merenpinnan yläpuolella, ja sen laella on '
      + 'valkoinen Sacré-Cœur.',
    kohteet: [
      /*
       * Laaja rajaus, 15.8.2026 alkaen 8,3 km (pelin laajin on nyt
       * Berliinin 10,2 km). Se on tietoinen poikkeus tiiviiseen
       * ydinkeskustaan: Eiffel-torni ja Sacré-Cœur ovat 4,8 km:n
       * päässä toisistaan, ja lapsen kaksi tunnetuinta kohdetta
       * kuuluvat samaan kuvaan. Pariisin korttelit ovat isoja, joten
       * kuva ei silti mene puuroksi.
       *
       * Vanha hinta oli etelälaita: Panthéon ja Luxembourgin
       * puutarha jäivät ulkopuolelle. Levennys 15.8.2026 toi ne
       * kuvaan, ja omistajan päätöksellä (15.8.) ne ovat nyt myös
       * kohdelistalla — järjestys kulkee edelleen lännestä itään.
       * Panthéonin fi-artikkelilla ei ole koordinaatteja;
       * 48,8462/2,3464 on rakennuksen tunnettu sijainti.
       */
      { nimi: 'Eiffel-torni', lat: 48.8583, lon: 2.2945, wiki: 'Eiffel-torni' },
      { nimi: 'Riemukaari', lat: 48.8738, lon: 2.295, wiki: 'Riemukaari (Pariisi)' },
      { nimi: 'Concorden aukio', lat: 48.8656, lon: 2.3212, wiki: 'Place de la Concorde' },
      { nimi: 'Louvre', lat: 48.861, lon: 2.3358, wiki: 'Louvre' },
      // Puiston keskipiste on suuri kahdeksankulmainen allas
      // (vesitarkistin nappasi) — piste seisoo länsinurmikoilla.
      { nimi: 'Luxembourgin puisto', lat: 48.8467, lon: 2.3352, wiki: 'Luxembourgin puisto' },
      { nimi: 'Sacré-Cœur', lat: 48.8868, lon: 2.343, wiki: 'Sacré-Cœur' },
      { nimi: 'Panthéon', lat: 48.8462, lon: 2.3464, wiki: 'Panthéon' },
      { nimi: 'Notre-Dame', lat: 48.853, lon: 2.3499, wiki: 'Notre-Damen katedraali' },
      /*
       * KOLME LISÄKOHDETTA (paketti O4, omistajan linjaus 16.8.2026:
       * "Nähtävyyksiä voi olla 6–15 per kaupunki"). Listan lopussa,
       * jotta kartan numerointi 1–8 ei siirry. Koordinaatit
       * fi-Wikipedian artikkeleista (prop=coordinates), ja kaikki
       * kolme ovat kartan rajojen sisällä (pohjoinen 48,8976, etelä
       * 48,8414, länsi 2,2657, itä 2,3788) — siksi Père-Lachaise
       * (itä 2,3933) ja katakombit (etelä 48,8338) EIVÄT ole mukana:
       * ne vaatisivat kartan uudelleenrajauksen.
       *
       * Ei piirroksia (miniatyyrit.js): nämä näkyvät
       * numeroympyröinä, kunnes miniatyyrit generoidaan. Sama
       * ratkaisu kuin paketissa K1.
       */
      { nimi: 'Orsayn taidemuseo', lat: 48.86, lon: 2.3266, wiki: 'Orsayn taidemuseo' },
      { nimi: 'Palais Garnier', lat: 48.8719, lon: 2.3317, wiki: 'Palais Garnier' },
      { nimi: 'Place des Vosges', lat: 48.8556, lon: 2.3656, wiki: 'Place des Vosges' },
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
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 50.1013, etela: 50.0677, lansi: 14.3628, ita: 14.4652 },
    varikartta: 'assets/kartat/praha-varikartta.png',
    esittely: 'Praha kasvoi Vltavan mutkaan. Joki on Tšekin pisin, 430 '
      + 'kilometriä, ja Prahan kohdalla se kaartaa jyrkän kallioharjanteen '
      + 'ympäri. Harjanteen päälle perustettiin 800-luvulla linna, ja '
      + 'vastarannan tasaiselle maalle syntyi kauppiaiden Vanhakaupunki. '
      + 'Linna on Guinnessin mukaan maailman suurin muinaislinna: 570 '
      + 'metriä pitkä ja keskimäärin 128 metriä leveä.\n\nKartan halki '
      + 'kulkee joki, ja sen yli vie Kaarlensilta: 516 metriä pitkä, '
      + 'kuusitoista kaarta. Se oli yli neljäsataa vuotta Prahan ainoa '
      + 'silta — seuraava valmistui vasta 1841. Vanhankaupungin kadut ovat '
      + 'kapeita ja mutkaisia, ja ne kulkevat pari metriä alkuperäistä '
      + 'ylempänä: 1200-luvulla koko kaupunginosan maanpinta nostettiin '
      + 'tulvien takia, ja vanhat pohjakerrokset jäivät kellareiksi.',
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
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 48.2296, etela: 48.1784, lansi: 16.3208, ita: 16.4232 },
    varikartta: 'assets/kartat/wien-varikartta.png',
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
        x: 20, y: 57.85, leveys: 18.75, korkeus: 22.15 },
    ],
    esittely: 'Wien seisoo kohdassa, jossa Tonava tulee ulos vuorten '
      + 'välistä. Lännessä nousee Wienerwald, Alppien viimeinen '
      + 'kukkulaselänne, ja idässä alkaa tasainen lakeus, joka jatkuu '
      + 'Unkariin asti. Roomalaiset huomasivat paikan ensin: he perustivat '
      + 'tänne Vindobonan leirin lähes kaksituhatta vuotta sitten, sillä '
      + 'Tonava oli heidän valtakuntansa pohjoisraja. Vanhakaupunki ei '
      + 'silti ole ison joen rannalla vaan sen sivuhaaran, Donaukanalin, '
      + 'varrella — pääuoma suoristettiin nykyiselle paikalleen vasta '
      + '1870-luvulla.\n\nKartan keskellä näkyy soikea katukehä. Se on '
      + 'Ring: kaupunginmuuri purettiin keisarin käskystä, ja tilalle '
      + 'avattiin 1865 yli viisi kilometriä pitkä puistokatu, jonka '
      + 'varrelle rakennettiin ooppera, raatihuone ja museot. Kehän sisällä '
      + 'kadut ovat kapeita ja mutkaisia, ulkopuolella leveitä ja suoria. '
      + 'Koillisessa kaartaa Donaukanal, ja sen takana levittäytyy Praterin '
      + 'vihreä — entinen keisarin metsästysmaa, jonka reunalla pyörii '
      + 'jättiratas.',
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
      /*
       * Täydennys 6 → 10 kohteeseen (18.8.2026, Kairon lehden
       * viimeistely nykystandardiin): Abdeenin palatsi, Sulttaani
       * Hassanin moskeija, Bab Zuweila ja Al-Azhar-puisto.
       * Koordinaatit Nominatimista; yhdelläkään neljästä ei ole
       * suomenkielistä artikkelia, joten ne ovat pelkkiä merkkejä
       * kuten torni ja museo. Kaikki mahtuvat alkuperäiseen
       * rajaukseen. Bab Zuweila esiintyy kannen Roberts-galleriassa
       * litografiana — nähtävyysjuttu on kirjoitettu tarkoituksella
       * eri kulmasta (portin käyttötavat, ei basaarikauppa).
       */
      { nimi: 'Abdeenin palatsi', lat: 30.0434, lon: 31.2478 },
      { nimi: 'Ibn Tulunin moskeija', lat: 30.0288, lon: 31.2497, wiki: 'Ibn Tulunin moskeija' },
      { nimi: 'Sulttaani Hassanin moskeija', lat: 30.0324, lon: 31.2562 },
      { nimi: 'Bab Zuweila', lat: 30.0428, lon: 31.2579 },
      { nimi: 'Saladinin linnoitus', lat: 30.0287, lon: 31.2599, wiki: 'Saladinin linnoitus' },
      { nimi: 'Khan el-Khalili', lat: 30.0477, lon: 31.2622, wiki: 'Khan el-Khalili' },
      { nimi: 'Al-Azhar-puisto', lat: 30.0401, lon: 31.2641 },
    ],
  },
  tripoli: {
    polku: 'assets/kartat/tripoli-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: {
      pohjoinen: 32.9009, etela: 32.8942, lansi: 13.174, ita: 13.1822,
    },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, 17.8.2026). Reunukselle jäävät satama ja Marttyyrien
    // aukio; lepotilassa lehti näyttää yhä pelkän rajat-alueen.
    piirtoRajat: {
      pohjoinen: 32.90291, etela: 32.89219, lansi: 13.17154, ita: 13.18466,
    },
    varikartta: 'assets/kartat/tripoli-varikartta.png',
    esittely: 'Tripolin vanhakaupunki näkyy kartalla yhtenä selvänä '
      + 'kuviona: tumma viiva kiertää viisikulmion, ja sen sisällä on '
      + 'yhtenäinen vaalea ala muutamine ohuine viivoineen. Viiva on '
      + 'kaupunginmuuri, ja ala on medina — se näyttää kartalla '
      + 'tyhjältä siksi, että sen kujat ovat liian kapeita ajettaviksi '
      + 'eikä niitä ole kaikkia edes merkitty karttoihin. Viisikulmion '
      + 'muodon vanhakaupunki sai '
      + '1500-luvun puolivälissä, kun ottomaanien ensimmäinen '
      + 'käskynhaltija Darghut rakensi linnoitukset uudelleen. Muurin '
      + 'sisäpuoli on vain noin kuudensadan metrin levyinen, eli koko '
      + 'medina kävellään ristiin vartissa.\n\n'
      + 'Kaupunki on paljon muuriaan vanhempi. Foinikialaiset '
      + 'perustivat tähän Oean, ja roomalaisajan suora ristikkokaava '
      + 'on yhä kujaverkon alla. Kahden pääkadun risteykseen '
      + 'pystytettiin vuonna 165 Marcus Aureliuksen riemukaari, joka '
      + 'on kartan pohjoisosassa. Kaakkoisnurkassa muurin ulkopuolella '
      + 'kohoaa Punainen linna omalla kalliollaan, ja sen takana '
      + 'kartta jatkuu satamaan: meri tulee kuvaan ylhäältä ja '
      + 'oikealta, sillä medina on niemekkeellä. Kartan kohteista '
      + 'pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * SEITSEMÄN KOHDETTA pohjoisesta etelään (kohdemäärien nosto
       * 18.8.2026; ennen kuusi). Koordinaatit on ristiintarkistettu
       * Overpassista ja en-Wikipedian coord-malleista.
       *
       * GURGIN MOSKEIJA OTETTIIN NYT MUKAAN, ja se kumoaa sen mitä
       * tässä luki. Vanha peruste oli mitattu: moskeija on 56 metriä
       * riemukaaresta, ja kuuden kohteen aikaan numeroympyrät olisivat
       * osuneet lähes päällekkäin. Luku mitattiin uudelleen sen
       * jälkeen, kun kartalle tuli reunus (piirtoRajat 1,6×
       * 17.8.2026): lava on nyt 1,6-kertainen pikseleissä, ja
       * tarkista-karttapisteet antaa parille peittoasteeksi 3 % eli
       * "tavallista, ei toimenpidettä". Este on siis poistunut, ja
       * päätoimittajan tilaus (18.8.2026) nimesi juuri Gurgin.
       *
       * PÄÄLLEKKÄISYYS OPPAAN KANSSA on tietoinen ja sama kuin
       * riemukaarella ja kellotornilla: oppaan jakso "Meren puolella
       * oleva moskeija" kertoo rakennuksen osat, ja nähtävyysjuttu
       * kertoo rakennuttajan ja ajankohdan. Kuvatiedostot ovat eri.
       *
       * MARTTYYRIEN AUKIO on yhä pois: se jää muurin ulkopuolelle
       * reunukselle, ja sen tunnettuus on nykypolitiikkaa, joka ei
       * kuulu peliin (Raamattu: turvalinjat).
       */
      { nimi: 'Marcus Aureliuksen riemukaari', lat: 32.8999, lon: 13.1758 },
      { nimi: 'Gurgin moskeija', lat: 32.8995, lon: 13.1754 },
      { nimi: 'Darghutin moskeija', lat: 32.8988, lon: 13.1772 },
      { nimi: 'Vanhankaupungin kellotorni', lat: 32.8962, lon: 13.1792 },
      { nimi: 'Punainen linna', lat: 32.8960, lon: 13.1806 },
      { nimi: 'Karamanlin moskeija', lat: 32.8952, lon: 13.1796 },
      { nimi: 'an-Naqan moskeija', lat: 32.8953, lon: 13.1788 },
    ],
  },
  lontoo: {
    // Ydinkeskustan julistekartta samalla työkalulla kuin Berliinin
    // (tools/piirra-kaupunkikartta.mjs). Rajaus Hyde Parkin itälaidalta
    // Tower Bridgelle: Thames kaartaa kuvan halki, ja kaikki kuusi
    // kohdetta mahtuvat alueelle.
    polku: 'assets/kartat/lontoo-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    // Värikartta satelliitin tilalle (omistajan päätös 15.8.2026,
    // ks. berliini alla): sama juliste samalta piirtoRajat-alueelta.
    varikartta: 'assets/kartat/lontoo-varikartta.png',
    /*
     * Rajaus leveni neljänneksellä 15.8.2026 (sama omistajan tilaus
     * kuin Berliinissä): 6,9 × 3,6 km → 8,7 × 4,5 km samasta
     * keskipisteestä. Kohdepisteet lasketaan tästä lohkosta
     * (karttapiste), joten ne siirtyivät kuvassa itsestään — käsin ei
     * korjattu mitään. Tower Bridge oli ennen itälaidassa 85 %:n
     * kohdalla, nyt 78 %:ssa. Sekä piirros että satelliittikuva on
     * haettu uudelleen tällä rajauksella.
     *
     * JA JULISTE JATKUU TÄMÄN YLI (omistajan tilaus 15.8.2026, ks.
     * berliini alla): piirtoRajat on 1,6-kertainen ala samasta
     * keskipisteestä eli 13,9 × 7,2 km. Lepotilassa lehti näyttää yhä
     * yllä olevan rajat-alueen; reunuksella on Regent's Park ja
     * Kensington Gardens pohjoisessa ja lännessä. Värikartta on
     * piirretty samalta piirtoRajat-alueelta ja kattaa myös reunuksen.
     */
    rajat: { pohjoinen: 51.5291, etela: 51.4884, lansi: -0.1725, ita: -0.0475 },
    piirtoRajat: { pohjoinen: 51.54131, etela: 51.47619, lansi: -0.21, ita: -0.01 },
    esittely: 'Lontoo ei ole yksi kaupunki vaan kaksi, jotka kasvoivat '
      + 'yhteen: idässä City of London, roomalaisten muurien rajaama '
      + 'neliökilometri, jossa tehdään rahaa, ja lännessä Westminster, '
      + 'jossa tehdään päätöksiä. Väliin jäänyt maa täyttyi vähitellen '
      + 'taloilla.\n\nThames on vuorovesijoki: pinta nousee ja laskee '
      + 'Lontoon kohdalla noin seitsemän metriä kahdesti päivässä, ja '
      + 'laskuveden aikaan rannalta löytyy yhä savipiippuja ja '
      + 'keskiaikaisia nuppineuloja.',
    kohteet: [
      {
        nimi: 'Buckinghamin palatsi',
        lat: 51.5014,
        lon: -0.1419,
        wiki: 'Buckinghamin palatsi',
      },
      {
        nimi: 'Trafalgar Square',
        lat: 51.508,
        lon: -0.1281,
        wiki: 'Trafalgar Square',
      },
      {
        nimi: 'Big Ben',
        lat: 51.5007,
        lon: -0.1246,
        wiki: 'Big Ben',
      },
      {
        nimi: 'Lontoon silmä',
        // Ratas kaartuu joen yli mutta seisoo South Bankilla, ja
        // keskipiste osui Thamesiin (vesitarkistin 9.8.2026). Piste on
        // nyt rakenteen juuressa rannalla.
        lat: 51.5031,
        lon: -0.1191,
        wiki: 'London Eye',
      },
      {
        nimi: 'Pyhän Paavalin katedraali',
        lat: 51.5138,
        lon: -0.0984,
        wiki: 'Pyhän Paavalin katedraali',
      },
      {
        nimi: 'Tower Bridge',
        lat: 51.5055,
        lon: -0.0754,
        wiki: 'Tower Bridge',
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
    /*
     * VÄRIKARTTA SATELLIITIN TILALLE (omistajan päätös 15.8.2026:
     * "Joo vaihda väri berliiniin" — satelliitti oli liian epäselvä,
     * ja "pelkät värit samaan piirros karttaan voisi olla toimivin
     * ratkaisu"). Sama juliste samoista OSM-aineistoista ja SAMALTA
     * piirtoRajat-alueelta (tools/piirra-kaupunkikartta.mjs --vari),
     * joten zoomi, panorointi ja reunus toimivat täsmälleen kuten
     * piirroksessa — vain paletti vaihtuu: siniset vedet, vihreät
     * puistot, ruskeat kadut. Berliini on pilotti; muut
     * satelliittikaupungit vaihdetaan, kun paletti on todettu hyväksi
     * pelissä. Lehti näyttää vivun Piirros/Värikartta, kun tämä
     * kenttä on olemassa (ui.js).
     */
    varikartta: 'assets/kartat/berliini-varikartta.png',
    /*
     * Rajaus leveni neljänneksellä 15.8.2026 (omistajan tilaus:
     * "voisi jatkua hieman nykyistä laajemmalle alueelle"): 8,1 × 6,1
     * km → 10,2 × 7,7 km samasta keskipisteestä. Kohdepisteet
     * lasketaan tästä lohkosta (karttapiste), joten ne siirtyivät
     * kuvassa itsestään — käsin ei korjattu mitään. Sekä piirros että
     * satelliittikuva on haettu uudelleen tällä rajauksella.
     *
     * JA JULISTE JATKUU TÄMÄN YLI (omistajan tilaus 15.8.2026: "sitä
     * voisi lisätä piirroksessa että kartta jatkuisi pidemmälle").
     * piirtoRajat on 1,6-kertainen ala samasta keskipisteestä eli
     * 16,3 × 12,3 km, ja PNG on piirretty siitä. Lepotilassa lehti
     * näyttää yhä tarkalleen yllä olevan rajat-alueen; reunus tulee
     * näkyviin vasta zoomatessa, kun panorointi jatkuu sen puolelle.
     * Kohdepisteet ovat prosentteina piirretystä kuvasta (karttapiste),
     * joten ne siirtyivät kuvassa itsestään — ruudulla ne ovat samassa
     * kohdassa kuin ennen.
     *
     * Värikartta on piirretty samalta piirtoRajat-alueelta, joten se
     * kattaa myös reunuksen — panorointi toimii siinä kuten
     * piirroksessa.
     */
    rajat: { pohjoinen: 52.547, etela: 52.478, lansi: 13.325, ita: 13.475 },
    piirtoRajat: { pohjoinen: 52.5677, etela: 52.4573, lansi: 13.28, ita: 13.52 },
    esittely: 'Berliini on rakennettu veden ja metsän keskelle: siltoja on '
      + 'noin 1 700 — moninkertaisesti Venetsian verran — ja kolmasosa '
      + 'kaupungista on puistoa, metsää tai järveä. Vaakunassa seisoo musta '
      + 'karhu, ja karhupatsaita tulee kaduilla vastaan vähän väliä.\n\n'
      + 'Kylmän sodan jäljet näkyvät yhä: muurin linja on merkitty '
      + 'keskustaan katukiveyksen kaksoisrivinä, ja idän ja lännen '
      + 'katuvalot hohtavat öisin eri sävyissä.',
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
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 59.3507, etela: 59.3043, lansi: 18.006, ita: 18.134 },
    varikartta: 'assets/kartat/tukholma-varikartta.png',
    esittely: 'Tukholma seisoo siinä, missä Mälaren-järvi purkautuu '
      + 'Itämereen. Kapeikossa vesi virtaa kuin joessa — sen nimi on '
      + 'Strömmen, ja siinä saa onkia lohta keskellä kaupunkia. Juuri tämä '
      + 'paikka teki kaupungista tärkeän: 1200-luvulla salmi suljettiin '
      + 'paaluilla, jotka pysäyttivät vieraat laivat ennen järveä.\n\n'
      + 'Kartan keskellä on Gamla stan, vanhakaupunki, jonka kujat '
      + 'kiertelevät samoja mutkia kuin keskiajalla. Kapein niistä on 90 '
      + 'senttiä leveä. Idässä levittäytyy Djurgården, entinen kuninkaan '
      + 'metsästyspuisto, jossa ovat nyt museot ja huvipuisto.',
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
      // Portin edusta eikä altaan reuna: entinen piste osui
      // telakka-altaaseen (vesitarkistin 9.8.2026).
      { nimi: 'Arsenaali', lat: 45.4344, lon: 12.3506, wiki: 'Arsenale' },
    ],
  },
  rooma: {
    polku: 'assets/kartat/rooma-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 41.9135, etela: 41.8845, lansi: 12.4455, ita: 12.5005 },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 41.9222, etela: 41.8758, lansi: 12.429, ita: 12.517 },
    varikartta: 'assets/kartat/rooma-varikartta.png',
    esittely: 'Rooma syntyi Tiberin mutkaan noin 25 kilometriä merestä '
      + 'ylävirtaan, ja paikan valitsi joki. Keskellä virtaa on saari, '
      + 'Isola Tiberina, joka jakaa uoman kahdeksi kapeaksi haaraksi. Siinä '
      + 'kohtaa joen yli pääsi kahlaamalla, eikä toista yhtä helppoa '
      + 'ylityspaikkaa ollut pitkään matkaan. Kahlaamon ympärillä kohoaa '
      + 'seitsemän kukkulaa, ja niiden välinen suo kuivattiin viemärillä '
      + 'nimeltä Cloaca Maxima. Kuivatusta notkosta tuli Forum Romanum, '
      + 'kaupungin tori.\n\nKartalla Tiber tulee alhaalta, tekee kaksi '
      + 'jyrkkää mutkaa ja poistuu ylälaidasta. Vasemmalle puolelle jokea '
      + 'jää Vatikaani, oikealle vanhakaupunki. Sen kujaverkko on niin '
      + 'sekava, että muutamat suorat kadut erottuvat siitä heti — ne on '
      + 'puhkaistu talojen läpi vasta myöhemmin. Oikeassa alalaidassa '
      + 'katuverkko harvenee ja tilalle tulee antiikin alue: siellä ovat '
      + 'Forum ja Colosseum.',
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
  oslo: {
    polku: 'assets/kartat/oslo-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 59.918, etela: 59.901, lansi: 10.7135, ita: 10.761 },
    esittely: 'Oslo on vuonon perukassa. Oslovuono työntyy merestä '
      + 'noin sata kilometriä sisämaahan, ja kaupunki on sen '
      + 'pohjoisimmassa päässä, siinä missä vesi loppuu ja metsäiset '
      + 'kukkulat alkavat. Metsä ei ole kaukana: kaupungin pohjoisosista '
      + 'pääsee raitiovaunulla suoraan Nordmarkaan, joka on suurempi '
      + 'kuin koko rakennettu kaupunki. Keskusta on rakennettu '
      + 'suoraviivaiseksi ruuduksi 1600-luvulla, kun vanha puukaupunki '
      + 'oli palanut ja Tanskan kuningas Kristian IV käski rakentaa '
      + 'uuden linnoituksen suojaan — kaupunki kantoi hänen nimeään '
      + 'Kristianiana aina vuoteen 1925.\n\nKartalla vuono on '
      + 'vasemmalla alhaalla ja kaupunki kiertyy sen ympärille. '
      + 'Keskustan kadut ovat suoria ja risteävät suorassa kulmassa, '
      + 'mikä erottaa Oslon Tallinnan tai Vilnan kaltaisista '
      + 'keskiaikaisista kaupungeista. Yksi katu kulkee vinosti muiden '
      + 'poikki: se on Karl Johans gate, joka vie kuninkaanlinnalta '
      + 'tuomiokirkolle ja rautatieasemalle. Niemellä sataman kupeessa '
      + 'näkyy tumma vallirengas — Akershusin linnoitus, joka on '
      + 'seisonut paikallaan 1300-luvulta. Oopperatalo on veden '
      + 'toisella puolella oikealla, ja sen katolle voi kävellä. '
      + 'Lehden laivamuseot eli viikinkilaiva, Fram ja Kon-Tiki ovat '
      + 'Bygdøyn niemellä kolme ja puoli kilometriä lännessä, kartan '
      + 'ulkopuolella. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * VIIDELLÄ KUUDESTA ON PAIKAN OMA WIKI — kartaston paras
       * osuus, ja se kertoo enemmän fi.wikipediasta kuin Oslosta.
       * Kuninkaanlinnasta ei ole artikkelia millään kokeillulla
       * nimellä.
       */
      { nimi: 'Kuninkaanlinna', lat: 59.9169, lon: 10.7275 },
      { nimi: 'Karl Johans gate', lat: 59.9139, lon: 10.74, wiki: 'Karl Johans gate' },
      { nimi: 'Oslon tuomiokirkko', lat: 59.9128, lon: 10.7442, wiki: 'Oslon tuomiokirkko' },
      { nimi: 'Kaupungintalo', lat: 59.912, lon: 10.7335, wiki: 'Oslon kaupungintalo' },
      { nimi: 'Akershusin linnoitus', lat: 59.9075, lon: 10.7365, wiki: 'Akershusin linnoitus' },
      { nimi: 'Oopperatalo', lat: 59.9075, lon: 10.7522, wiki: 'Oslon oopperatalo' },
    ],
  },
  kobenhavn: {
    polku: 'assets/kartat/kobenhavn-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 55.6945, etela: 55.669, lansi: 12.5555, ita: 12.6116 },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, Eurooppa-erä 1 15.8.2026).
    piirtoRajat: { pohjoinen: 55.70215, etela: 55.66135, lansi: 12.53867, ita: 12.62843 },
    varikartta: 'assets/kartat/kobenhavn-varikartta.png',
    esittely: 'Kööpenhamina on satamakaupunki kahden saaren välissä. Vanha '
      + 'kaupunki on Sjællandin puolella ja sen vastarannalla on Amager, ja '
      + 'niiden välissä kulkee satamakanava, jota pitkin laivat pääsevät '
      + 'kaupungin läpi. Nimi tarkoittaa kauppasatamaa. Kaupunki on hyvin '
      + 'matala — korkeimmat asiat ovat kirkontornit — ja se on rakennettu '
      + 'veden ehdoilla: kanavia on kaivettu lisää sinne, missä niitä '
      + 'tarvittiin, ja vanhat vallihaudat ovat nykyään järviä keskellä '
      + 'kaupunkia. Isoisän matkan aikaan Kööpenhaminassa asui jo yli sata '
      + 'tuhatta ihmistä, ja kaupungin ympäriltä oli juuri purettu muurit, '
      + 'jotka olivat estäneet sitä kasvamasta.\n\nKartalla kanava kulkee '
      + 'ylhäältä alas oikeanpuoleisen kolmanneksen halki. Vasemmalla ovat '
      + 'pitkulaiset järvet, jotka ovat entisiä vallihautoja, ja niiden ja '
      + 'kanavan välissä on vanha kaupunki kapeine katuineen. Oikeassa '
      + 'yläkulmassa erottuu tähden muotoinen linnoitus vallihautoineen: se '
      + 'on Kastellet, ja sen takana rannalla istuu Pieni merenneito. '
      + 'Kanavan itäpuolella on Christianshavn, jonka omat kanavat näkyvät '
      + 'suorina juovina — se rakennettiin hollantilaiseen tapaan '
      + 'kaivamalla.',
    kohteet: [
      /*
       * AMALIENBORG ON ANSA. fi.wikipedian `Amalienborg` EI ole
       * Tanskan kuninkaanlinna vaan ruotsalainen panimo
       * (Amalienborg Aktiebolags Bryggeri). Linnasta ei ole
       * artikkelia, joten kohde on pelkkä merkki. Älä linkitä.
       *
       * `Pieni merenneito` yksinään on satu; patsaasta kertoo
       * `Pieni merenneito (patsas)`, ja kohde tarkoittaa patsasta.
       */
      // Patsas istuu kivellä vedessä; piste on rantapromenadilla,
      // jotta se osuu maalle (vesitarkistin).
      { nimi: 'Pieni merenneito', lat: 55.6926, lon: 12.5989, wiki: 'Pieni merenneito (patsas)' },
      { nimi: 'Amalienborg', lat: 55.6841, lon: 12.5934 },
      { nimi: 'Rundetårn', lat: 55.6813, lon: 12.5757, wiki: 'Rundetårn' },
      // Nyhavn on kanava, ja kuuluisa osa on pohjoisen laiturin
      // värikkäät talot — piste on laiturilla eikä vedessä.
      { nimi: 'Nyhavn', lat: 55.6802, lon: 12.59, wiki: 'Nyhavn' },
      { nimi: 'Christiansborgin linna', lat: 55.6761, lon: 12.5797, wiki: 'Christiansborgin linna' },
      { nimi: 'Tivoli', lat: 55.6737, lon: 12.5681 },
      /*
       * KOLME LISÄKOHDETTA (paketti K1) — kartan numerointi tulee
       * järjestyksestä, joten nämä tulevat listan loppuun eivätkä
       * siirrä vanhoja 1–6:ta. Ei piirroksia (miniatyyrit.js):
       * kartalla numeroympyrät, kuten koodi tekee kohteelle ilman
       * piirrosta.
       *
       * KAKSI ANSAA fi.wikipediassa, molemmat tarkistettu
       * rajapinnasta:
       *  - `Vapahtajan kirkko` OHJAA Kristuksen kirkastumisen
       *    kirkkoon. Christianshavnin kirkosta kertoo
       *    `Vapahtajamme kirkko` (tanskaksi Vor Frelsers Kirke).
       *  - `Kastellet` yksinään on TUKHOLMAN Kastellholmenin
       *    linnoitus. Kööpenhaminan tähtilinnoitus on
       *    `Kastellet (Kööpenhamina)`.
       */
      { nimi: 'Vapahtajan kirkko', lat: 55.6729, lon: 12.594, wiki: 'Vapahtajamme kirkko' },
      { nimi: 'Rosenborgin linna', lat: 55.6859, lon: 12.5773, wiki: 'Rosenborgin linna' },
      { nimi: 'Kastellet', lat: 55.6912, lon: 12.5938, wiki: 'Kastellet (Kööpenhamina)' },
    ],
  },
  tampere: {
    polku: 'assets/kartat/tampere-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 61.509, etela: 61.489, lansi: 23.715, ita: 23.783 },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari, 17.8.2026).
    piirtoRajat: { pohjoinen: 61.515, etela: 61.483, lansi: 23.6946, ita: 23.8034 },
    varikartta: 'assets/kartat/tampere-varikartta.png',
    esittely: 'Tampere on rakennettu kannakselle kahden järven väliin. '
      + 'Näsijärvi on kartan yläreunassa ja Pyhäjärvi alalaidassa, ja '
      + 'niiden pinnoilla on kahdeksantoista metriä korkeuseroa. Ero '
      + 'purkautuu Tammerkoskena, joka juoksee kartan keskellä '
      + 'pohjoisesta etelään noin kilometrin matkan. Juuri se koski on '
      + 'koko kaupungin syy: sen partaalle nousivat 1800-luvulla '
      + 'puuvillatehdas, verkatehdas, paperitehdas ja konepajat, ja '
      + 'kaupunkia alettiin kutsua Pohjolan Manchesteriksi. Isoisän '
      + 'matkan aikaan Tampereella asui noin kuusi tuhatta ihmistä ja '
      + 'Finlaysonin tehdas oli Pohjoismaiden suurin '
      + 'työpaikka.\n\nKartalla kosken länsipuolella on Finlaysonin '
      + 'punatiilinen tehdaskortteli ja itäpuolella Tampella, jonka '
      + 'verstaassa toimii nykyään museokeskus Vapriikki. Kosken yli '
      + 'kulkee kaupungin pääkatu Hämeenkatu, joka jatkuu oikealle '
      + 'rautatieasemalle asti — rata näkyy kuvassa pystysuorana '
      + 'juovana keskustan takana. Vasemmalla kohoaa Pyynikinharju, '
      + 'maailman korkein pitkittäisharju, ja sen laella seisoo '
      + 'punagraniittinen näkötorni. Pohjoisessa Näsijärven rantaan '
      + 'työntyy Särkänniemen niemi, jonka kärjessä on Näsinneula.',
    kohteet: [
      /*
       * Kahdeksan kohdetta, kaikki tarkistettu fi-Wikipedian
       * rajapinnasta (action=query&redirects) — yksikään otsikko ei
       * ole täsmennyssivu eikä kaima:
       *   Näsinneula · Finlaysonin tehdasalue · Hämeensilta ·
       *   Tampereen tuomiokirkko · Museokeskus Vapriikki ·
       *   Pyynikin näkötorni (17.8.2026) · Tallipiha ·
       *   Amurin työläismuseokortteli (18.8.2026)
       * Hämeensillan piste on SILLALLA eli veden päällä; se on
       * sallittua (tarkista-karttapisteet.mjs: sillat ja majakat).
       *
       * YKSI ANSA 18.8.2026 lisätyistä:
       *  - `Amurin työläismuseokortteli` OHJAA artikkeliin
       *    `Amurin museokortteli`; wiki-kenttään kirjataan
       *    ohjauksen kohde, kuten muillakin kartoilla.
       */
      // Torni seisoo niemen kärjessä: piste on siirretty muutaman
      // kymmenen metriä sisämaahan, jottei numeroympyrä istu vedessä.
      { nimi: 'Näsinneula', lat: 61.5052, lon: 23.7422, wiki: 'Näsinneula' },
      { nimi: 'Finlaysonin tehdasalue', lat: 61.4996, lon: 23.753, wiki: 'Finlaysonin tehdasalue' },
      { nimi: 'Museokeskus Vapriikki', lat: 61.5022, lon: 23.7657, wiki: 'Museokeskus Vapriikki' },
      { nimi: 'Hämeensilta', lat: 61.4979, lon: 23.7626, wiki: 'Hämeensilta' },
      { nimi: 'Tampereen tuomiokirkko', lat: 61.4966, lon: 23.7744, wiki: 'Tampereen tuomiokirkko' },
      { nimi: 'Pyynikin näkötorni', lat: 61.4936, lon: 23.7208, wiki: 'Pyynikin näkötorni' },
      // Kuninkaankatu 4, Finlaysonin tehdasalueen pohjoisreunassa
      // (OSM: tourism=attraction).
      { nimi: 'Tallipiha', lat: 61.5034, lon: 23.7546, wiki: 'Tallipiha' },
      // Satakunnankatu 49; sama piste kuin fi-Wikipedian
      // koordinaatti (61,4993 / 23,7434) kymmenen metrin sisällä.
      { nimi: 'Amurin työläismuseokortteli', lat: 61.4993, lon: 23.7434, wiki: 'Amurin museokortteli' },
    ],
  },
  firenze: {
    polku: 'assets/kartat/firenze-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 43.778, etela: 43.7605, lansi: 11.243, ita: 11.27 },
    // Laajennus 1,6 samasta keskipisteestä (piirra-kaupunkikartta
    // --vari).
    piirtoRajat: { pohjoinen: 43.78325, etela: 43.75525, lansi: 11.2349, ita: 11.2781 },
    varikartta: 'assets/kartat/firenze-varikartta.png',
    esittely: 'Firenzen vanhakaupunki on pieni: kartan reunasta reunaan on '
      + 'noin kaksi kilometriä, ja kaikki kohteet ovat kävelymatkan päässä '
      + 'toisistaan. Kaupunki alkoi roomalaisena varuskuntana vuonna 59 '
      + 'eaa., ja sen suorakulmainen sotilasruutukaava on yhä kartalla '
      + 'näkyvissä keskellä muuten mutkittelevaa kujaverkkoa. Keskiajalla '
      + 'kaupunki kasvoi villakankaan ja pankkien varassa niin isoksi, '
      + 'että se joutui rakentamaan muurinsa kolmesti uudelleen. Viimeiset '
      + 'muurit purettiin 1860-luvulla, kun Firenze oli Italian '
      + 'pääkaupunki, ja niiden paikalle tuli leveä kehäkatujen '
      + 'rengas — se erottuu kartalla vanhan ytimen ympärillä.\n\nArno '
      + 'virtaa kartan halki lännestä itään ja jakaa kaupungin kahtia. '
      + 'Pohjoispuolella on vanha ydin: Duomon kupoli, Signorian aukio ja '
      + 'Uffizi joen rannassa. Eteläpuolta sanotaan Oltrarnoksi eli '
      + '"Arnon takaiseksi", ja siellä ovat käsityöläisten korttelit ja '
      + 'Bobolin puutarhan iso vihreä kiila. Joen yli johtaa useita '
      + 'siltoja, joista vanhin ja kuuluisin on Ponte Vecchio — kartalla '
      + 'se erottuu siitä, että sen päällä on taloja.',
    kohteet: [
      /*
       * NELJÄ ANSAA fi.wikipediassa, kaikki tarkistettu
       * rajapinnasta (17.8.2026, täydennys 18.8.2026):
       *  - `Boboli` ja `Bobolin puutarha` EIVÄT ole artikkeleita;
       *    puutarhasta ei ole fi-artikkelia lainkaan, joten kohde jää
       *    ilman wiki-linkkiä ja nojaa omaan juttuunsa.
       *  - `Santa Croce` yksinään on täsmennyssivu; Firenzen kirkosta
       *    kertoo `Basilica di Santa Croce`.
       *  - `Galleria dell'Accademia` ja `Accademia (museo)` eivät ole
       *    artikkeleita. `Accademia di belle arti di Firenze` kertoo
       *    TAIDEAKATEMIASTA eli oppilaitoksesta, ei museosta, joten
       *    sitä ei linkitetä väärän kohteen nimissä: museo jää ilman
       *    wiki-linkkiä kuten Boboli.
       *  - `Bargello` yksinään puuttuu; rakennuksesta ja museosta
       *    kertoo `Bargellon palatsi`.
       */
      { nimi: 'Duomo', lat: 43.7731, lon: 11.256, wiki: 'Santa Maria del Fiore' },
      { nimi: 'Palazzo Vecchio', lat: 43.7694, lon: 11.2558, wiki: 'Palazzo Vecchio' },
      { nimi: 'Uffizi', lat: 43.7676, lon: 11.2553, wiki: 'Uffizi' },
      // Silta saa olla vedellä (tarkista-karttapisteet.mjs): piste on
      // sillan keskellä, koska juuri se on kohde.
      { nimi: 'Ponte Vecchio', lat: 43.768, lon: 11.2531, wiki: 'Ponte Vecchio' },
      { nimi: 'Santa Croce', lat: 43.7686, lon: 11.2624, wiki: 'Basilica di Santa Croce' },
      // Puutarha on iso; piste on sen pohjoispäässä Pitti-palatsin
      // takana, jotta se ei osu kartan vasempaan alanurkkaan
      // mittakaavajanan päälle.
      { nimi: 'Bobolin puutarha', lat: 43.7645, lon: 11.25 },
      // Via Ricasoli 58–60. Piste on rajauksen pohjoisreunan
      // tuntumassa (43,778) mutta reilut sata metriä sen sisällä.
      { nimi: 'Galleria dell\'Accademia', lat: 43.7769, lon: 11.2589 },
      { nimi: 'Santa Maria Novella', lat: 43.7746, lon: 11.2494, wiki: 'Santa Maria Novella' },
      { nimi: 'Bargello', lat: 43.7704, lon: 11.2583, wiki: 'Bargellon palatsi' },
    ],
  },
  dubrovnik: {
    polku: 'assets/kartat/dubrovnik-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 42.6442, etela: 42.6388, lansi: 18.1035, ita: 18.1148 },
    esittely: 'Dubrovnik on kaupunki muurin sisällä. Vanhakaupunki on '
      + 'vain noin viisisataa metriä pitkä ja kolmesataa leveä, ja sen '
      + 'ympäri kiertää yhtenäinen kivimuuri, joka on paikoin '
      + 'kuusi metriä paksu ja kaksikymmentäviisi metriä korkea. '
      + 'Muurilla voi kävellä koko kierroksen. Kaupunki oli satojen '
      + 'vuosien ajan oma pieni valtionsa, Ragusan tasavalta, jolla '
      + 'oli omat lakinsa, oma laivastonsa ja oma tapansa selvitä '
      + 'isompien naapureiden välissä: se maksoi veroa sekä '
      + 'Venetsialle että sulttaanille eikä sotinut kummankaan '
      + 'kanssa. Rikkaudet tulivat suolasta ja merenkulusta. '
      + 'Kaupunki rakennettiin uudestaan kivestä vuoden 1667 '
      + 'maanjäristyksen jälkeen, ja siksi talot ovat keskenään '
      + 'samannäköisiä — samaa kiveä, samat kattotiilet, sama '
      + 'korkeus.\n\nKartalla on melkein pelkkä vanhakaupunki, alle '
      + 'kilometrin levyinen pala. Tumma viiva kuvan keskellä on '
      + 'muuri, ja siitä erottuvat pyöreät tornit: ylhäällä on '
      + 'Minčetan torni, kaupungin korkein kohta. Muurin sisällä '
      + 'kulkee vasemmalta oikealle yksi leveä suora — se on Stradun, '
      + 'kaupungin pääkatu, jonka molemmilta puolilta lähtee kapeita '
      + 'kujia ja portaita rinnettä ylös. Kujat eivät näy kartalla '
      + 'kaikki, koska ne ovat enimmäkseen portaita. Oikealla on '
      + 'vanhasatama aallonmurtajineen, ja vasemmalla omalla '
      + 'kalliollaan Lovrijenacin linnake, joka vartioi sisääntuloa '
      + 'merelle päin. Lokrumin saari, jonne laivat joutuivat '
      + 'odottamaan karanteeniin, on kartan ulkopuolella runsaan '
      + 'kilometrin päässä kaakossa. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään, kuten muillakin kartoilla.
       *
       * VAIN KATEDRAALILLA ON PAIKAN OMA WIKI, ja se on tarkistettu
       * hakemalla. fi.wikipediassa ei ole artikkelia Stradunista,
       * Minčetasta, Lovrijenacista, Pilen portista, Sponzan
       * palatsista eikä rektorinpalatsista — koko muurikaupungista on
       * vain katedraali ja Lokrumin saari, joka jää kartan
       * ulkopuolelle.
       */
      { nimi: 'Minčetan torni', lat: 42.643, lon: 18.1082 },
      { nimi: 'Pilen portti', lat: 42.6415, lon: 18.1067 },
      // Rektorinpalatsi jätettiin pois: se on parikymmentä metriä
      // katedraalista, ja kaksi numeroympyrää olisi mennyt päällekkäin.
      { nimi: 'Sponzan palatsi', lat: 42.6414, lon: 18.1101 },
      // Laiturille eikä altaaseen (vesitarkistin).
      { nimi: 'Vanhasatama', lat: 42.6416, lon: 18.1113 },
      // Linnake seisoo omalla kalliollaan; aineiston piste osui
      // meren puolelle (vesitarkistin).
      { nimi: 'Lovrijenacin linnake', lat: 42.641, lon: 18.106 },
      { nimi: 'Dubrovnikin katedraali', lat: 42.6403, lon: 18.1103, wiki: 'Dubrovnikin katedraali' },
    ],
  },
  riika: {
    polku: 'assets/kartat/riika-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 56.956, etela: 56.941, lansi: 24.0908, ita: 24.1293 },
    esittely: 'Riika kasvoi Väinäjoen suulle. Joki on leveä ja syvä, ja '
      + 'sen kautta pääsi sisämaahan asti — siksi tähän syntyi '
      + 'kauppapaikka, josta tuli Baltian suurin kaupunki. '
      + 'Vanhakaupunki on joen itärannalla, ja siellä talot ovat '
      + 'kapeita ja korkeita, koska tontista maksettiin leveyden '
      + 'mukaan. Kaupunkia ympäröi keskiajalla muuri, mutta se '
      + 'purettiin 1800-luvulla. Muurin paikalle ei rakennettu '
      + 'taloja vaan puisto ja kanava, ja juuri se tekee Riian '
      + 'kartasta helposti tunnistettavan: vanhakaupunkia kiertää '
      + 'vihreä kaari.\n\nKartalla on vanhakaupunki keskellä, Väinäjoki '
      + 'vasemmalla ja puistovyöhyke oikealla. Kanava mutkittelee '
      + 'puiston läpi kuin pieni joki — se on entinen vallihauta. '
      + 'Vanhankaupungin kadut ovat lyhyitä ja kaartuvia, eivätkä ne '
      + 'muodosta ruutua kuten uudemmissa kaupunginosissa: keskiajalla '
      + 'katu kulki sinne, minne pääsi. Alhaalla oikealla erottuu '
      + 'viisi isoa hallia rivissä. Ne ovat keskustorin hallit, ja ne '
      + 'olivat alun perin ilmalaivojen halleja, jotka siirrettiin '
      + 'tänne ja koottiin uudestaan toriksi. Jugend-kortteli, josta '
      + 'Riika on kuuluisa, jää kartan ulkopuolelle runsaan kilometrin '
      + 'päähän pohjoiseen. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * NELJÄLLÄ KUUDESTA ON PAIKAN OMA WIKI, tarkistettu hakemalla.
       * Kaksi ansaa kirjattu tähän, jotta niihin ei astuta uudelleen:
       *  - `Vapaudenpatsas` on fi.wikipediassa NEW YORKIN
       *    Vapaudenpatsas, ei Riian; Riian patsaasta ei ole
       *    artikkelia, joten kohde on pelkkä merkki.
       *  - `Mustapäiden talo` ilman tarkennetta on täsmennyssivu.
       *    Oikea artikkeli on `Mustapäiden talo (Riika)`.
       */
      { nimi: 'Vapaudenpatsas', lat: 56.9512, lon: 24.1132 },
      { nimi: 'Kolme veljestä', lat: 56.9497, lon: 24.103 },
      { nimi: 'Riian tuomiokirkko', lat: 56.9494, lon: 24.1042, wiki: 'Riian tuomiokirkko' },
      { nimi: 'Pyhän Pietarin kirkko', lat: 56.9475, lon: 24.1094, wiki: 'Pyhän Pietarin kirkko (Riika)' },
      { nimi: 'Mustapäiden talo', lat: 56.9472, lon: 24.1063, wiki: 'Mustapäiden talo (Riika)' },
      { nimi: 'Keskustori', lat: 56.944, lon: 24.1146, wiki: 'Riian keskustori' },
    ],
  },
  vilna: {
    polku: 'assets/kartat/vilna-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 54.688, etela: 54.6705, lansi: 25.2695, ita: 25.307 },
    esittely: 'Vilna on rakennettu kahden joen yhtymäkohtaan. Iso joki '
      + 'on Neris ja pieni on Vilnia, ja kaupunki on saanut nimensä '
      + 'pienemmästä. Niiden väliin jää kukkula, jonka päällä on '
      + 'linnan torni — siitä kaupunki alkoi 1300-luvulla. '
      + 'Vanhakaupunki levisi kukkulan eteläpuolelle, ja siitä tuli '
      + 'yksi Euroopan laajimmista: kujia on satoja ja kirkkoja '
      + 'toistasataa, koska Vilnassa asui rinnakkain katolisia, '
      + 'ortodokseja, juutalaisia ja muslimeja, ja jokainen rakensi '
      + 'omansa. Kaupunkia ympäröi ennen muuri yhdeksine portteineen. '
      + 'Niistä on jäljellä yksi, Aamuportti, ja pätkä muuria sen '
      + 'kummallakin puolella.\n\nKartalla vanhakaupunki on keskellä '
      + 'pystysuorana vyöhykkeenä: se alkaa ylhäältä tuomiokirkon '
      + 'aukiolta ja päättyy alhaalla Aamuportille, ja matkaa on noin '
      + 'puolitoista kilometriä. Kujat piirtyvät tiheänä verkkona, '
      + 'jossa korttelit ovat epäsäännöllisiä — mikään katu ei kulje '
      + 'suoraan päästä päähän. Oikealla mutkittelee Vilnia, ja sen '
      + 'takana on oma kolkkansa: Užupis, joka julistautui '
      + 'tasavallaksi ja kirjoitti itselleen perustuslain. Ylhäällä '
      + 'kaartaa Neris isona koukkuna. Tumma viivanpätkä '
      + 'vanhankaupungin eteläreunassa on jäljellä oleva '
      + 'kaupunginmuuri. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /*
       * KOLMELLA KUUDESTA ON PAIKAN OMA WIKI, tarkistettu hakemalla.
       * fi.wikipediassa ei ole artikkelia Gediminaksen tornista,
       * Aamuportista eikä Pyhän Annan kirkosta.
       */
      { nimi: 'Gediminaksen torni', lat: 54.6868, lon: 25.2905 },
      { nimi: 'Vilnan tuomiokirkko', lat: 54.6858, lon: 25.2874, wiki: 'Vilnan tuomiokirkko' },
      { nimi: 'Pyhän Annan kirkko', lat: 54.6829, lon: 25.2942 },
      { nimi: 'Vilnan yliopisto', lat: 54.6819, lon: 25.2867, wiki: 'Vilnan yliopisto' },
      { nimi: 'Užupis', lat: 54.681, lon: 25.2977, wiki: 'Užupis' },
      { nimi: 'Aamuportti', lat: 54.6733, lon: 25.2896 },
    ],
  },
  tromssa: {
    polku: 'assets/kartat/tromssa-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 69.6575, etela: 69.6365, lansi: 18.937, ita: 19.013 },
    esittely: 'Tromssa on rakennettu saarelle. Tromsøya on noin '
      + 'yhdeksän kilometriä pitkä ja kolme leveä, ja kaupungin '
      + 'keskusta on sen itärannalla, kapean salmen varrella. Salmi '
      + 'on Tromssan koko olemassaolon syy: se on syvä ja jäätyy '
      + 'harvoin, koska Golfvirta tuo lämmintä vettä napapiirin '
      + 'pohjoispuolelle asti. Siksi täältä pääsi merelle silloinkin, '
      + 'kun Itämeri oli umpijäässä. Isoisän matkan aikaan 1870-luvulla '
      + 'Tromssa oli noin viiden tuhannen asukkaan puukaupunki, josta '
      + 'lähdettiin pohjoiseen: hylkeenpyytäjien ja jäämerenkalastajien '
      + 'laivat purjehtivat täältä Huippuvuorille ja Novaja Zemljalle, '
      + 'ja myöhemmin samasta satamasta lähtivät myös naparetkikunnat. '
      + 'Kaupunkia sanottiin Pohjolan Pariisiksi, koska merimiehet '
      + 'ihmettelivät, että näin kaukana pohjoisessa oli katulyhtyjä, '
      + 'kauppoja ja soittokunta.\n\nKartalla on salmi keskellä ja kaksi '
      + 'rantaa. Vasemmalla on saari ja sen keskusta, jossa kadut '
      + 'kulkevat tiiviinä ruutuna rannan suuntaisesti — pisin niistä '
      + 'on Storgata, kaupungin vanha pääkatu. Rannassa erottuvat '
      + 'satamalaiturit sormina, ja niiden juurella on puinen '
      + 'tuomiokirkko. Oikealla on manner, Tromsdalenin puoli, jonne '
      + 'noustaan jyrkkää rinnettä; siellä sijaitsevat '
      + 'Jäämerenkatedraali ja köysirata, joka vie vuorelle. Rantoja '
      + 'yhdistää yksi kaari: Tromssan silta valmistui vuonna 1960, ja '
      + 'sitä ennen salmen yli mentiin lautalla — aivan kuten Dubaissa. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään, kuten Dubaissa ja Odessassa.
       *
       * KOLMELLA KUUDESTA ON PAIKAN OMA WIKI, ja se on tarkistettu
       * hakemalla eikä oletettu. fi.wikipediassa EI ole artikkelia
       * Polaarimuseosta, Tromssan sillasta eikä Fjellheisenistä, joten
       * ne ovat pelkkiä merkkejä. Polarian artikkeli on nimellä
       * `Polaria (akvaario)`, koska pelkkä `Polaria` on
       * täsmennyssivu — sitä ei saa linkittää.
       */
      { nimi: 'Polaarimuseo', lat: 69.6543, lon: 18.9631 },
      { nimi: 'Tromssan silta', lat: 69.6516, lon: 18.9742 },
      { nimi: 'Tromssan tuomiokirkko', lat: 69.6497, lon: 18.956, wiki: 'Tromssan tuomiokirkko' },
      { nimi: 'Jäämerenkatedraali', lat: 69.6489, lon: 18.9976, wiki: 'Jäämerenkatedraali' },
      { nimi: 'Polaria', lat: 69.6455, lon: 18.9515, wiki: 'Polaria (akvaario)' },
      { nimi: 'Fjellheisenin köysirata', lat: 69.6395, lon: 18.9958 },
    ],
  },
  dubai: {
    polku: 'assets/kartat/dubai-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 25.276, etela: 25.256, lansi: 55.284, ita: 55.312 },
    esittely: 'Dubai kasvoi lahdelman ympärille. Khor Dubai ei ole '
      + 'joki vaan kapea suolaisen veden lahti, joka työntyy '
      + 'Persianlahdesta noin neljätoista kilometriä sisämaahan. Se '
      + 'on luonnonsatama: avomereltä pääsee tyyneen veteen, jossa ei '
      + 'ole aallokkoa, ja lasti voidaan purkaa suoraan rannalle. '
      + 'Lahden etelärannalle syntyi Bur Dubai ja pohjoisrannalle '
      + 'Deira, eikä niiden välillä ollut pitkään aikaan yhtään '
      + 'siltaa — toiselle puolelle mentiin veneellä. 1870-luvulla '
      + 'Dubai oli muutaman tuhannen asukkaan kylä, joka eli kahdesta '
      + 'asiasta: kaupasta ja helmistä. Kesäisin miehet purjehtivat '
      + 'matalikoille ja sukelsivat simpukoiden perään ilman mitään '
      + 'happilaitteita, pelkkä nenäpuristin nenässä ja kivi jalassa. '
      + 'Helmenpyynti oli kaupungin tärkein elinkeino 1930-luvulle '
      + 'asti. Vanhin yhä pystyssä oleva rakennus on Al Fahidin '
      + 'linnoitus vuodelta 1787.\n\nKartalla on vain vanha kaupunki, '
      + 'noin kolmen kilometrin levyinen pala. Lahti kaartaa kuvan '
      + 'halki isona koukkuna: se tulee sisään ylhäältä, kiertää '
      + 'vasemmalla niemen ympäri ja jatkaa oikealle. Niemi on Al '
      + 'Shindagha, ja sen takana kartan ulkopuolella aukeaa avomeri. '
      + 'Kapeimmillaan lahti on tässä kohdassa vain parisataa metriä '
      + 'leveä, ja juuri siitä pikkuveneet eli abrat kulkevat '
      + 'rannalta toiselle. Lahden eteläreuna on piirtynyt '
      + 'sahalaitaiseksi: ranta ei ole siellä suora vaan porrastettu '
      + 'pieniksi ulokkeiksi, joiden väliin veneet mahtuvat. '
      + 'Etelässä on Bur Dubai, '
      + 'pohjoisessa Deira, ja molemmilla puolilla katuverkko '
      + 'muuttuu rannan lähellä tiheäksi kujien seitiksi — siellä '
      + 'ovat suukit eli kauppakujat. Dubain kuuluisat pilvenpiirtäjät '
      + 'eivät näy kartalla lainkaan: Burj Khalifa on kahdeksan '
      + 'kilometriä lounaassa, kaukana tämän kuvan ulkopuolella. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /*
       * Numerointi pohjoisesta etelään, kuten Odessassa.
       *
       * VAIN YHDELLÄ ON PAIKAN OMA WIKI, ja se on tarkistettu tulos
       * eikä laiskuutta: fi.wikipediassa ei ole artikkelia Al
       * Fahidista, Bastakiasta, Khor Dubaista, Bur Dubaista eikä
       * kultasuukista. Koko vanhasta kaupungista on vain
       * `Dubain museo`. ANSA: `Deira` on fi.wikipediassa
       * anglosaksinen kuningaskunta Pohjois-Englannissa — älä linkitä
       * sitä. Lähin oikea maamerkkiartikkeli on `Deiran kellotorni`,
       * mutta se on kolme kilometriä idässä rajauksen ulkopuolella ja
       * 1960-luvulta, eli väärältä vuosisadalta tähän karttaan.
       *
       * Dhow-sataman `Dhow` on tietoinen poikkeus taloa sääntöön
       * "wiki on artikkeli juuri tästä paikasta": se selittää sanan,
       * joka on kohteen omassa nimessä, eikä vie lasta muualle.
       * Helmenpyynnistä ja basaareista ON fi-artikkelit, mutta niitä
       * EI liitetty Al Shindaghaan ja kultasuukiin — nimi ja artikkeli
       * eivät vastaisi toisiaan, ja lue lisää veisi paikan sijaan
       * aiheeseen. Helmenpyynti kerrotaan esittelyssä.
       *
       * Al Shindaghan piste on Shindaghan museokorttelissa eikä
       * Sheikh Saeedin talossa (25.2679 / 55.2901), vaikka talo on
       * niemen tunnetuin rakennus: talon koordinaatti osuu pelin
       * omalla karttapiste()-funktiolla veteen, koska ranta kaartaa
       * juuri siinä. Tarkistettu pikselistä.
       *
       * Dhow-satama on samasta syystä siirretty laiturin maapuolelle
       * (25.2671 / 55.3056). Aineiston mukainen laituripiste
       * 25.2664 / 55.3058 jäi noin 50 metriä veden puolelle.
       */
      { nimi: 'Kultasuuk', lat: 25.2701, lon: 55.2982 },
      { nimi: 'Dhow-satama', lat: 25.2671, lon: 55.3056, wiki: 'Dhow' },
      { nimi: 'Al Shindagha', lat: 25.2665, lon: 55.289 },
      { nimi: 'Abra-laiturit', lat: 25.265, lon: 55.2953 },
      { nimi: 'Bastakian kaupunginosa', lat: 25.2639, lon: 55.3 },
      { nimi: 'Al Fahidin linnoitus', lat: 25.2632, lon: 55.2972, wiki: 'Dubain museo' },
      /*
       * Neljä lisäkohdetta 18.8.2026 (6 → 10, lehden viimeistely).
       * Koordinaatit Nominatimista. Kaksi ehdokasta putosi lähdepohjan
       * takia (Naifin linnoituksesta ei ole Wikipedia-artikkelia, Al
       * Seefin artikkeli on pääosin kritiikkiä), joten tilalle tulivat
       * kaksi suukia.
       *
       * TEKSTIILISUUKIN PISTE ON SUUKIN LÄNTINEN PÄÄ eikä Nominatimin
       * rekisteröity POI: POI olisi jäänyt 5,4 prosenttiyksikön päähän
       * abra-laitureista ja numeroympyrät olisivat menneet päällekkäin.
       * Länsipää on yhä Ali Bin Abi Talib -kadulla suukin sisällä ja
       * 8,8 pp päässä lähimmästä naapurista.
       *
       * SUURI MOSKEIJA jää 6,1 pp päähän abra-laitureista. Se on
       * oikeasti noin 150 metriä linnoituksesta, joten pistettä ei voi
       * siirtää kauemmas rehellisesti — pieni tiheys tällä kohtaa on
       * karttatosiasia, ei virhe.
       */
      { nimi: 'Al Ahmadiyan koulu', lat: 25.2684, lon: 55.2949 },
      { nimi: 'Maustesuuk', lat: 25.2676, lon: 55.2971 },
      { nimi: 'Suuri moskeija', lat: 25.2644, lon: 55.2968 },
      { nimi: 'Tekstiilisuuk', lat: 25.2635, lon: 55.294 },
    ],
  },

  /*
   * PETRA (Opus 19.8.2026). Ensimmäinen kohdekartta, joka ei ole
   * kaupunki vaan raunioalue. Rajaus, sen perustelu ja piirtotyökalun
   * rauniokaupunki-lippu ovat tools/piirra-kaupunkikartta.mjs:ssä.
   *
   * KOHTEIDEN KOORDINAATIT ovat OpenStreetMapin nimetyistä
   * historic-kohteista (haettu Overpassista 19.8.2026), paitsi
   * Al-Khazneh ja Ad Deir, joiden luvut ovat en-Wikipedian
   * artikkeleista — ne täsmäävät OSM:n kanssa neljännen desimaalin
   * tarkkuudella.
   *
   * PYLVÄSKATU JÄI POIS, vaikka se on Petran tunnetuin katu. Syy on
   * mitattu: sen piste olisi ollut 2,8 prosenttiyksikön päässä Suuren
   * temppelin pisteestä eli numeroympyrät olisivat menneet
   * päällekkäin. Sama koskee Temenos-porttia (2,1 pp) ja puutarha- ja
   * allaskompleksia (2,4 pp): laakson keskusta on niin tiivis, ettei
   * siihen mahdu enempää ympyröitä. Kaikki kolme kerrotaan silti —
   * pylväskatu ja portti Suuren temppelin ja Qasr al-Bintin jutuissa,
   * puutarhakompleksi Tiede ja kivi -sivun vesinostossa.
   *
   * KOHTEITA ON YHDEKSÄN EIKÄ KYMMENTÄ, ja se on lähdepohjan päätös.
   * Kymmenenneksi oli valittu Bab as-Siqin obeliskihauta, joka on
   * kartalla hyvässä paikassa ja josta on tarkistettu kuva — mutta
   * siitä EI ole omaa Wikipedia-artikkelia (haettu 19.8.2026:
   * Obelisk Tomb, Bab as-Siq Triclinium ja Obelisk Tomb (Petra)
   * vastasivat kaikki 404). Ilman lähdettä juttua ei kirjoiteta.
   */
  /*
   * JERUSALEM (Opus 19.8.2026). Muurien sisäinen vanhakaupunki.
   * Rajaus ja piirtotyökalun lippujen perustelut ovat
   * tools/piirra-kaupunkikartta.mjs:ssä.
   *
   * KOHTEITA ON KUUSI, ja se on kuvavalinnan sanelema raja eikä
   * kartoituksen. Leijonaportista, Siionin portista, Lantaportista ja
   * Gihonin lähteestä EI löytynyt yhtään vapaasti lisensoitua kuvaa
   * ilman tunnistettavia ihmisiä — ei nykykuvista eikä 1900-luvun
   * alun PD-kokoelmista, jotka käytiin läpi erikseen juuri tästä
   * syystä. Koska jokainen kohde tarvitsee jutun ja jokainen juttu
   * kuvan, nämä jätettiin pois sen sijaan että olisi julkaistu
   * kuvaton juttu tai rikottu kuvasääntöä. Ne voidaan lisätä myöhemmin,
   * jos kelvollinen kuva löytyy.
   *
   * Daavidin torni jäi pois eri syystä,
   * vaikka se on vanhankaupungin tunnetuimpia rakennuksia: sen piste
   * on noin viidenkymmenen metrin päässä Jaffan portista, eli 3,5
   * prosenttiyksikköä, ja numeroympyrät olisivat menneet päällekkäin.
   * Linnoitus kerrotaan Jaffan portin jutussa.
   *
   * SIILOAN ALLAS JA DAAVIDIN KAUPUNKI jäivät myös pois, koska ne ovat
   * muurien eteläpuolella rajauksen ulkopuolella. Ne kerrotaan lehden
   * Vesi-sivulla, jonne ne kuuluvatkin.
   *
   * Koordinaatit ovat kohteiden omista en-Wikipedian artikkeleista
   * (haettu 19.8.2026). Damaskoksen portin luku on artikkelin
   * wikitekstin coord-mallista, koska rajapinta ei palauttanut sille
   * koordinaattia.
   */
  jerusalem: {
    polku: 'assets/kartat/jerusalem-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 31.7865, etela: 31.772, lansi: 35.221, ita: 35.244 },
    esittely: 'Jerusalem on vuoristokaupunki. Se kohoaa lähes '
      + 'kahdeksansadan metrin korkeuteen Juudean vuorilla, ja sitä '
      + 'ympäröi kolme laaksoa — siksi kaupunki on aina ollut helppo '
      + 'puolustaa ja vaikea kastella. Omaa jokea ei ole, joten koko '
      + 'asutuksen paikan ratkaisi yksi lähde: Gihon, joka pulppuaa '
      + 'Kidronin laakson kalliossa. Nykyiset muurit eivät ole '
      + 'muinaiset vaan ottomaanien työtä: sulttaani Suleiman määräsi '
      + 'rauniona olleet muurit rakennettavaksi uudelleen vuonna 1535, '
      + 'ja työ tehtiin vuosina 1537–1541. Kiveä on 4 018 metrin '
      + 'matkalla, keskikorkeus on noin kaksitoista metriä ja paksuus '
      + 'kaksi ja puoli metriä, ja muuria kiertää 34 tornia. '
      + 'Liikennöityjä portteja on seitsemän. Muurit ja vanhakaupunki '
      + 'hyväksyttiin Unescon maailmanperintöluetteloon vuonna 1981. '
      + 'Vielä 1800-luvun puoliväliin asti koko kaupunki mahtui '
      + 'muurien sisään; ensimmäinen kortteli niiden ulkopuolelle '
      + 'rakennettiin vasta vuonna 1860.\n\nKartalla on vain '
      + 'vanhakaupunki, runsaan kahden kilometrin levyinen pala. '
      + 'Muuri erottuu kuvassa tummana yhtenäisenä viivana, joka '
      + 'kiertää koko alueen — se on kartan selkäranka. Sen sisällä ei '
      + 'ole juuri katuja vaan kujia, ja siksi verkko näyttää '
      + 'tiheämmältä kuin muissa kaupungeissa: leveys riittää '
      + 'jalankulkijalle ja aasille, ei vaunulle. Oikeassa laidassa '
      + 'erottuu suuri suorakaide, jota kujat eivät halkaise: se on '
      + 'temppelivuoren aitaus, vanhankaupungin pinta-alasta noin '
      + 'kuudesosa. Länsilaidassa muuri kaartaa ulos ja sisään — '
      + 'siellä on Jaffan portti, josta lähti 1800-luvulla ainoa '
      + 'ajokelpoinen tie rannikolle. Kartan ulkopuolelle jäävät '
      + 'etelään Daavidin kaupungin kaivausalue ja Siiloan allas. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään. */
      { nimi: 'Damaskoksen portti', lat: 31.7816, lon: 35.2305 },
      { nimi: 'Pyhän haudan kirkko', lat: 31.7783, lon: 35.2297 },
      { nimi: 'Kalliomoskeija', lat: 31.778, lon: 35.2354 },
      { nimi: 'Läntinen muuri', lat: 31.7767, lon: 35.2345 },
      { nimi: 'Jaffan portti', lat: 31.7766, lon: 35.2276 },
      { nimi: 'Al-Aqsa-moskeija', lat: 31.7761, lon: 35.2358 },
    ],
  },

  petra: {
    polku: 'assets/kartat/petra-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 30.341, etela: 30.3175, lansi: 35.427, ita: 35.4665 },
    esittely: 'Petra ei ole rakennettu vaan veistetty. Nabatealaiset, '
      + 'arabialainen kansa, asettuivat näille vuorille 300-luvulla '
      + 'eKr., ja kaupungista tuli heidän kuningaskuntansa pääkaupunki '
      + '100-luvulla eKr. Nimi oli heidän omalla kielellään Raqmu. '
      + 'Rikkaus tuli kaupasta: suitsuke ja mausteet kulkivat '
      + 'eteläisestä Arabiasta Välimerelle, ja reitti kulki tästä '
      + 'laaksosta. Kukoistuskaudellaan 100-luvulla jKr. kaupungissa '
      + 'arvioidaan asuneen noin kaksikymmentätuhatta ihmistä keskellä '
      + 'puoliaavikkoa, jossa sataa runsaat sata millimetriä vuodessa. '
      + 'Se onnistui, koska vesi otettiin talteen: padot, kallioon '
      + 'louhitut vesikourut ja naamioidut sadevesisäiliöt keräsivät '
      + 'jokaisen kuuron. Rooma liitti kuningaskunnan valtakuntaansa '
      + 'vuonna 106 jKr., ja vuoden 363 maanjäristys rikkoi sekä '
      + 'rakennuksia että vesijärjestelmän. Kauppa siirtyi merille, ja '
      + 'kaupunki hiljeni. Länsimaat unohtivat sen sijainnin kokonaan, '
      + 'kunnes sveitsiläinen Johann Ludwig Burckhardt tuli vuonna 1812 '
      + 'paikalliseksi pukeutuneena katsomaan, mitä beduiinit '
      + 'tarkoittivat puhuessaan raunioista vuorten takana. Unescon '
      + 'maailmanperintöluetteloon Petra hyväksyttiin 6. joulukuuta '
      + '1985.\n\nKartalla on muinaiskaupunki kokonaan, runsaan neljän '
      + 'kilometrin levyinen pala vuoristoa. Katuja ei ole: kaikki '
      + 'kartan viivat ovat polkuja, ja ne ovat tämän kaupungin kadut. '
      + 'Oikeasta laidasta tulee sisään Siq, kapea rotko, jota pitkin '
      + 'jokainen saapuu — se mutkittelee kohti keskustaa ja päättyy '
      + 'Al-Khaznehin eteen. Sieltä polku kääntyy luoteeseen ja '
      + 'levenee laaksoksi, jonka pohjalla erottuvat suorakaiteina '
      + 'Suuren temppelin ja Qasr al-Bintin kaivausalueet. Laakson '
      + 'pohjoisreunaa seuraa kuninkaanhautojen rivi ja eteläreunaa '
      + 'teatteri, joka on kokonaan louhittu kallioon. Vasemmassa '
      + 'ylälaidassa, kilometrin päässä ylämäkeä, on Ad Deir; sinne '
      + 'noustaan portaita, jotka näkyvät kartalla mutkittelevana '
      + 'polkuna. Alalaidan haarova viivasto on kuivien uomien verkko '
      + '— vettä niissä on vain sadekuuron jälkeen, ja silloin paljon. '
      + 'Kartan kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Dubaissa ja Odessassa. */
      { nimi: 'Ad Deir', lat: 30.3382, lon: 35.431 },
      { nimi: 'Bysanttilainen kirkko', lat: 30.3306, lon: 35.4444 },
      { nimi: 'Kuninkaanhaudat', lat: 30.3295, lon: 35.451 },
      { nimi: 'Qasr al-Bint', lat: 30.3295, lon: 35.4401 },
      { nimi: 'Suuri temppeli', lat: 30.3288, lon: 35.4423 },
      { nimi: 'Teatteri', lat: 30.3248, lon: 35.447 },
      { nimi: 'Siq', lat: 30.3232, lon: 35.4567 },
      { nimi: 'Al-Khazneh', lat: 30.3221, lon: 35.4515 },
      { nimi: 'Uhripaikka', lat: 30.3215, lon: 35.447 },
    ],
  },

  /*
   * PERSEPOLIS (20.8.2026). Lehti julkaistiin v932:ssa ILMAN karttaa,
   * koska Overpass oli silloin alhaalla — tässä se puuttuva kartta.
   *
   * KOORDINAATIT OVAT OVERPASSISTA EIVÄTKÄ WIKIPEDIASTA, ja ero on
   * kohteen mittainen. en-Wikipedian Gate of All Nations -artikkeli
   * antaa portille pisteen 29,934444 / 52,891389, mutta OSM:ssä portti
   * (way 95531813) on 29,93618 / 52,889078 eli 250 metriä koillisempana;
   * Wikipedian piste osuisi tällä kartalla aarrekammion kohdalle.
   * Apadanan artikkelin koordinaatti on sekin koko kohteen piste
   * (29,935 / 52,890, lähteenä de-Wikipedia) eikä salin oma. Rajaus on
   * 770 × 520 metriä, joten 250 metrin heitto olisi kolmannes kuvan
   * leveydestä — Tokion kansallismuseon ennakkotapaus pätee tässäkin.
   * Kaikki kahdeksan pistettä ovat siksi OSM:n rakennusalueiden
   * keskipisteitä (haettu 20.8.2026).
   *
   * KAKSI KOHDETTA JÄI POIS TARKOITUKSELLA. Artakserkses II:n hauta on
   * 200 metriä muita idempänä, ja koska se on OSM:ssä historic=tomb eikä
   * ruins, piirtäjä ei hae sitä lainkaan: laajemmalla rajauksella kuvan
   * oikea kolmannes oli tyhjää paperia yhden numeroympyrän ympärillä
   * (kokeiltu ja katsottu). Persepoliksen museo on kartalla rakennuksena
   * mutta ei kohteena — se on nykyrakennus, ja lehden kohteet ovat
   * akhaimenidiaikaisia.
   */
  persepolis: {
    polku: 'assets/kartat/persepolis-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 29.9372, etela: 29.9325, lansi: 52.8858, ita: 52.8938 },
    esittely: 'Persepolis ei ole kaupunki vaan yksi rakennusryhmä. '
      + 'Kreikkalaiset antoivat sille nimen Persepolis eli persialaisten '
      + 'kaupunki; persialaisten omalla kielellä paikka oli Pārsa, sama '
      + 'sana kuin koko maakunnan nimi. Vanhimmat jäänteet ovat vuodelta '
      + '515 eKr. Dareios I rakennutti terassin ja sen ensimmäiset '
      + 'palatsit, ja rakentaminen jatkui valtakunnan loppuun asti. '
      + 'Terassi on 125 000 neliömetriä: osa siitä on muurattu tasangolle '
      + 'ja osa louhittu Rahmat-vuoren kylkeen, ja päämateriaali oli '
      + 'harmaa kalkkikivi. Hallinnon todelliset pääkaupungit olivat '
      + 'muualla — Susa, Babylon ja Ekbatana — ja se selittää, miksi '
      + 'kreikkalaiset eivät tunteneet paikkaa ennen kuin Aleksanteri '
      + 'valtasi sen vuonna 330 eKr. Sen jälkeen katosi nimikin: '
      + 'sasanidiruhtinas Shapur Sakanshah kutsui raunioita vuonna 311 '
      + 'nimellä Sad-stūn eli sata pylvästä, ja keskiajalla ne olivat '
      + 'Tahti Jamshid, Jamshidin valtaistuin, ja Tšehel Minar, '
      + 'neljäkymmentä minareettia. Vieressä virtaa pieni Pulvar-joki, '
      + 'joka laskee Kur-jokeen.\n\nKartalla on koko kohde: vajaan '
      + 'kahdeksansadan metrin levyinen pala tasankoa vuoren juurella. '
      + 'Keskellä on terassi, ja sen reuna piirtyy sahalaitaisena. '
      + 'Porrastus ei ole koriste vaan puolustusta: kulmikas tukimuuri '
      + 'antoi puolustajille näkymän ulkosivun jokaiseen kohtaan, kuten '
      + 'linnassa. Terassin sisällä ei ole katuja vaan ohuita viivoja, '
      + 'jotka erottavat palatsit toisistaan — nämä viivat ovat '
      + 'perustuksia eivätkä kujia. Luoteisnurkassa on kaksoisportaikko '
      + 'ja sen päässä Kaikkien kansojen portti, josta jokainen astui '
      + 'sisään. Idässä kartta nousee vuorelle: polut kiipeävät '
      + 'rinnettä, ja niiden yläpäässä on Artakserkses III:n kallioon '
      + 'louhittu hauta. Lännestä tullaan nykyistä tuloreittiä, jonka '
      + 'varrella ovat lipunmyynti ja pysäköintialueet. Vasemmassa '
      + 'alakulmassa erottuu tähtimäinen kaava pienen altaan ympärillä: '
      + 'sinne pystytettiin vuonna 1971 telttakaupunki valtakunnan '
      + 'kaksituhatviisisataavuotisjuhliin — viisikymmentä telttaa '
      + 'tähtikuvioon suihkulähteen ympärille. Teltat ovat poissa, '
      + 'mutta tiet ja allas ovat kartalla yhä. Alalaidassa kaivausalue '
      + 'jatkuu terassin eteläpuolelle. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Petrassa ja Medinassa. */
      { nimi: 'Kaikkien kansojen portti', lat: 29.93618, lon: 52.889078 },
      { nimi: 'Artakserkses III:n hauta', lat: 29.935872, lon: 52.892459 },
      { nimi: 'Sadan pylvään sali', lat: 29.9353, lon: 52.891028 },
      { nimi: 'Apadana', lat: 29.935107, lon: 52.88951 },
      { nimi: 'Kolmen oven sali', lat: 29.934664, lon: 52.890555 },
      { nimi: 'Aarrekammio', lat: 29.934446, lon: 52.891737 },
      { nimi: 'Tachara', lat: 29.934382, lon: 52.889554 },
      { nimi: 'Hadishin palatsi', lat: 29.933952, lon: 52.890206 },
    ],
  },

  /*
   * MEDINA (20.8.2026). Rajaus on keskusta: Profeetan moskeija
   * keskellä, kolmen kehätien sisus ja luoteen suunnassa Qiblatayn.
   * Kainalossa oikeassa alakulmassa on Quba, joka on 3,5 kilometriä
   * kaakkoon eikä mahtuisi samaan rajaukseen ilman että keskusta
   * kutistuisi lukukelvottomaksi — sama ratkaisu kuin Helsingissä ja
   * Budapestissa.
   *
   * KAKSI KOHDETTA JÄI POIS TARKOITUKSELLA. Uhud-vuori on runsaat
   * neljä kilometriä pohjoiseen eli rajauksen ulkopuolella; se on
   * lehden kuvissa ja teksteissä. Ruman kaivo jäi pois, koska siitä ei
   * ole vapaata kuvaa muuta kuin porttikyltti — Jerusalemin
   * ennakkotapaus: ei kuvaa, ei kohdetta. Kaivo mainitaan lehden
   * teksteissä.
   *
   * Koordinaatit ovat kohteiden omista en-Wikipedian artikkeleista ja
   * ne on tarkistettu erikseen (haettu 20.8.2026).
   */
  medina: {
    polku: 'assets/kartat/medina-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 24.499, etela: 24.456, lansi: 39.571, ita: 39.624 },
    kainalot: [
      { rajat: { pohjoinen: 24.4455, etela: 24.433, lansi: 39.61, ita: 39.6245 },
        x: 78, y: 76.8, leveys: 20, korkeus: 21.24, suunta: '3,5 km kaakkoon' },
    ],
    esittely: 'Medina on keidas, joka syntyi kolmen kuivan laakson '
      + 'yhtymäkohtaan: Wadi al-Aqiqin, Wadi al-Aqlin ja Wadi al-Himdhin '
      + 'pohjavesi teki vuoristoisen aavikon keskelle vihreän läikän, ja '
      + 'sen varassa paikalla on asuttu ainakin 800-luvulta eKr. Silloin '
      + 'kaupunki tunnettiin nimellä Yathrib, ja siihen aikaan siellä '
      + 'asuivat sekä juutalaiset heimot että Jemenistä muuttaneet Aws ja '
      + 'Khazraj. Vuonna 622 Muhammad muutti tänne Mekasta, ja tapahtuma '
      + 'antoi islamille sekä ajanlaskun alun että ensimmäisen '
      + 'kaupunkiyhteisön. Mekan jälkeen Medina on islamin toiseksi pyhin '
      + 'kaupunki. Keskiajalla se oli soikea muurikaupunki: yhdeksästä '
      + 'kahteentoista metriin korkea muuri kiersi sitä torneineen, ja '
      + 'sisään pääsi neljästä portista. Osmanit hallitsivat kaupunkia '
      + 'vuodesta 1517, ja 1900-luvun alussa sulttaani Abdul Hamid II toi '
      + 'sinne lennättimen, voimalaitoksen ja Hidžaz-radan. Muurit '
      + 'purettiin Saudi-Arabian aikana.\n\nKartalla ei siksi näy '
      + 'muureista mitään. Niiden paikalla ovat kolme kehätietä — King '
      + 'Faisal Road, King Abdullah Road ja King Khalid Road — jotka '
      + 'kaartavat keskustan ympäri renkaina. Renkaiden sisällä erottuu '
      + 'suorakaiteena Profeetan moskeija aukioineen: se on kartan '
      + 'suurin yksittäinen rakennus, ja sen vieressä idässä on iso '
      + 'aukea, jolta rakennukset on purettu moskeijan laajennushanketta '
      + 'varten. Hautausmaa Al-Baqi on kiinni moskeijan itäkyljessä, ja '
      + 'lounaassa kadun mutkassa on vanha Hidžaz-radan asema, jonne '
      + 'junat tulivat Damaskoksesta vuosina 1908–1920. Luoteeseen '
      + 'mentäessä katuverkko '
      + 'harvenee ja rinne nousee: siellä ovat Seitsemän moskeijaa ja '
      + 'kauimpana Qiblatayn. Oikean alakulman kainalossa on Quba, '
      + 'kolmen ja puolen kilometrin päässä kaakossa — se oli oma '
      + 'kylänsä keitaan laidalla, kunnes kaupunki kasvoi sen '
      + 'ympärille. Kartalta '
      + 'jää pohjoiseen Uhud-vuori, 1 077 metriä korkea ja kaupungin '
      + 'korkein kohta. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Petrassa ja Dubaissa. */
      { nimi: 'Qiblatayn-moskeija', lat: 24.4841, lon: 39.5789 },
      { nimi: 'Seitsemän moskeijaa', lat: 24.4768, lon: 39.596 },
      { nimi: 'Profeetan moskeija', lat: 24.4683, lon: 39.6108 },
      { nimi: 'Al-Baqin hautausmaa', lat: 24.4669, lon: 39.6164 },
      { nimi: 'Al-Ghamama-moskeija', lat: 24.4658, lon: 39.607 },
      { nimi: 'Hidžaz-radan asema', lat: 24.4617, lon: 39.6002 },
      { nimi: 'Quba-moskeija', lat: 24.4392, lon: 39.6172 },
    ],
  },
  /*
   * MEKAN KOHDEKARTTA (20.8.2026). Rajaus on noin 3,1 × 3,1 km, ja
   * kohteet on numeroitu pohjoisesta etelään kuten Medinassa.
   *
   * YKSI KOHDE SUURELLE MOSKEIJALLE, vaikka siellä on neljä
   * lehdessä kerrottua paikkaa. Kaaba, Maqam Ibrahim, Zamzamin kaivo
   * ja Safan kukkula ovat kaikki moskeijan sisällä muutaman
   * kymmenen metrin säteellä toisistaan — Zamzam on
   * en-Wikipedian Masjid al-Haram -artikkelin mukaan 20 metriä
   * Kaabasta itään ja Safa 130 metriä kaakkoon — joten erillisinä
   * pisteinä niiden numeroympyrät menisivät päällekkäin (Petran
   * oppi). Ne kerrotaan Suuren moskeijan jutussa.
   *
   * KARTALTA JÄIVÄT POIS Al-Adlin hautausmaa (itäinen vuorenrinne
   * olisi venyttänyt ruudun tyhjäksi) sekä Arafat, Mina ja
   * Muzdalifah, jotka ovat 5–20 kilometrin päässä eivätkä mahdu
   * mihinkään järkevään rajaukseen. Ne kerrotaan oppaassa.
   *
   * KAINALOSSA Jabal al-Nour, 5,3 km koilliseen. Se on ainoa
   * kaupungin ulkopuolinen kohde, joka on lehdessä omana juttunaan,
   * ja samalla kaupungin korkein kohta (642 m, en-Wikipedia
   * "Mecca" ja "Jabal al-Nour").
   *
   * KAINALON KORKEUS 19,9 on laskettu piirtäjän omalla kaavalla
   * (tools/piirra-kaupunkikartta.mjs: leveys × kuvasuhde(rajat) /
   * kuvasuhde(kainalon rajat)) eikä kirjoitettu käsin. Fablen
   * speksissä luki 24,55, mutta se ei vastaa piirrettyä kuvaa:
   * piirtäjä antaa kuvan korkeudeksi 1600 / kuvasuhde(rajat) = 1604
   * pikseliä, ja mekka-keskusta.png on tarkalleen 1600 × 1604 —
   * samalla kaavalla myös Medinan 21,24 täsmää. Väärä korkeus olisi
   * siirtänyt kainalon numeroympyrän eri kohtaan kuin kartan oma
   * piirros.
   */
  mekka: {
    polku: 'assets/kartat/mekka-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 21.4425, etela: 21.4145, lansi: 39.816, ita: 39.846 },
    kainalot: [
      { rajat: { pohjoinen: 21.4645, etela: 21.4515, lansi: 39.8545, ita: 39.8685 },
        x: 78, y: 2, leveys: 20, korkeus: 19.9, suunta: '5,3 km koilliseen' },
    ],
    esittely: 'Mekka on kapeassa laaksossa paljaiden vuorten välissä, ja '
      + 'juuri laakso selittää koko kaupungin muodon. Se on Hidžazissa, '
      + 'kahdensadan kilometrin levyisellä vuorikaistaleella Nafudin '
      + 'aavikon ja Punaisenmeren välissä, seitsemänkymmenen kilometrin '
      + 'päässä Jeddan satamasta sisämaahan ja 277 metrin korkeudessa — '
      + 'yksi Hidžazin matalimmista kaupungeista, vaikka sen omat huiput '
      + 'kohoavat tuhanteen metriin. Keskustaa kutsutaan nimellä Mekan '
      + 'kuoppa, ja siihen kuuluvat al-Taneemin, Bakkahin ja Abqarin '
      + 'notkot. Kauppa kulki täältä Afrikasta ja Kaukoidästä kohti '
      + 'Syyriaa, ja pyhiinvaellus on pitänyt kaupunkia pystyssä siitä '
      + 'lähtien. Nykyään kaupunkia kiertää neljä kehätietä ja sen alue '
      + 'on yli 1 200 neliökilometriä, jaettuna 34 kaupunginosaan.'
      + '\n\nKartalla se näkyy heti. Kuvan alavasemmalla erottuu soikea '
      + 'kehä, ja sen sisällä kadut lähtevät keskipisteestä säteittäin '
      + 'kuin pyörän puolat: keskellä on Suuri moskeija, ja kaupunki on '
      + 'rakennettu sen ympärille eikä toisin päin. Kehän eteläreunalla '
      + 'kohoaa kellotornikompleksi sillä kukkulalla, jolla ennen seisoi '
      + 'Ajyadin linnoitus. Moskeijasta pohjoiseen kadut jatkuvat laakson '
      + 'mukaan: aivan kehän tuntumassa on Mekan kirjasto, ja kauempana '
      + 'pohjoisessa ensin Jinnien moskeija ja sitten Jannat al-Mu\'allan '
      + 'hautausmaa. Leveät kaaret, jotka halkovat karttaa reunasta '
      + 'reunaan, ovat kehäteitä ja moottoriteitä. Kartan itäosassa katuja '
      + 'on harvassa, ja tyhjyys on aitoa maastoa eikä puuttuvaa tietoa — '
      + 'siellä nousee vuorenrinne, jolle ei ole rakennettu. Oikean '
      + 'ylänurkan kainalossa on Jabal al-Nour, viiden ja kolmen '
      + 'kymmenyksen kilometrin päässä koilliseen. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Medinassa ja Petrassa. */
      { nimi: 'Jabal al-Nour', lat: 21.4581, lon: 39.8614 },
      { nimi: 'Jannat al-Mu\'alla', lat: 21.4369, lon: 39.8292 },
      { nimi: 'Jinnien moskeija', lat: 21.4334, lon: 39.829 },
      { nimi: 'Mekan kirjasto', lat: 21.425, lon: 39.83 },
      { nimi: 'Suuri moskeija', lat: 21.4225, lon: 39.8262 },
      { nimi: 'Kellotorni', lat: 21.4189, lon: 39.8264 },
    ],
  },

  /*
   * SANA (erä 4, 20.8.2026). Rajaus on Unescon vanhakaupunki ja sen
   * välitön ympärys, 1,9 × 1,7 km. Ruutu on tarkoituksella pieni:
   * kaikki lehden kohteet ovat muurien sisällä tai niiden vieressä,
   * eikä uuden kaupungin kymmenien kilometrien laakso mahtuisi samaan
   * kuvaan ilman että vanhakaupunki kutistuisi läikäksi.
   *
   * KOORDINAATIT OVAT OVERPASSISTA (haettu 20.8.2026), ja tähän on
   * syy. Kolme en-Wikipedian coord-mallia on tässä kaupungissa
   * epäluotettava:
   *  - Al-Bakiriyya-moskeija: artikkelin coord on 15,35306 / 44,2150,
   *    eli 12 metrin päässä Suuresta moskeijasta. OSM:n
   *    مسجد البكيلية on 15,35599 / 44,21975 eli 560 metriä
   *    koillisempana, mikä vastaa artikkelin omaa kuvausta
   *    vanhankaupungin itäosasta. Overpass voittaa (v925, v932, v937).
   *  - Ghumdanin palatsi: artikkelin coord 15,353115 / 44,214722 on
   *    sekin käytännössä Suuren moskeijan piste, vaikka sama artikkeli
   *    sanoo raunioiden ulottuvan moskeijasta itään ja Bab al-Jemenin
   *    pohjoispuolelle. OSM:n قصر غمدان قصر السلاح on 640 metriä
   *    idempänä. Kohde JÄTETTIIN SILTI POIS: raunioista ei ole
   *    Commonsissa yhtään vapaata vähintään 1 200 pikselin kuvaa.
   *  - Bab al-Yaman: wikidata-lähtöinen coord 15,3512 / 44,2159 on
   *    28 metriä OSM:n pisteestä. Ero on alle sadan metrin, joten
   *    kumpi tahansa kelpaisi; käytetään Overpassia yhdenmukaisuuden
   *    vuoksi.
   *
   * KOLME KOHDETTA JÄI POIS KUVAN PUUTTEESSA (Jerusalemin
   * ennakkotapaus): Ghumdanin palatsi, Bab al-Salam ja Bab es-Shaub.
   * Kaksi ensimmäistä ovat OSM:ssä historic=monument, mutta
   * Commonsista ei löydy niistä kelvollista kuvaa.
   *
   * KAKSI KOHDETTA ON MYÖS LEHDEN NOSTOISSA (Suolatori ja
   * Bab al-Yaman). Aihetoisto on tässä hyväksytty samalla perusteella
   * kuin Medinan Quba: eri tiedosto ja eri näkökulma — nostot
   * kertovat torin tavaroista ja portin messinkirenkaista, jutut
   * kaupungin torikorttelista ja muurin porteista.
   */
  sana: {
    polku: 'assets/kartat/sana-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 15.363, etela: 15.348, lansi: 44.206, ita: 44.224 },
    esittely: 'Sana on yksi maailman korkeimmalla sijaitsevista '
      + 'pääkaupungeista: vanhakaupunki on runsaan 2 200 metrin '
      + 'korkeudessa omannimisellään tasangolla, jota rajaavat idässä '
      + 'Jabal Nuqum ja lännessä Jemenin korkeimman vuoren juuret. '
      + 'Ensimmäinen tunnettu maininta kaupungista on 400-luvulta eKr. '
      + 'muinaiseteläarabialaisella musnad-kirjoituksella, ja nimi '
      + 'juontuu sabalaisesta sanasta masnaa, linnoitus. Saban '
      + 'valtakunta perusti paikalle toisen pääkaupunkinsa '
      + 'ensimmäisellä vuosisadalla jaa., ja al-Hamdanin mukaan '
      + 'sabalaiset myös muurasivat kaupungin hallitsijansa Shar '
      + 'Awtarin aikana. Islamin tulon jälkeen Sana oli pitkään '
      + 'hallintokeskus, ja sitä hallitsivat vuoron perään sulayhidit, '
      + 'hamdanidit, ajjubidit ja zaidiitti-imaamit. Osmanit valtasivat '
      + 'kaupungin 1547, menettivät sen 1629 ja palasivat 1872.'
      + '\n\nKartalla vanhakaupunki erottuu heti. Keskellä on tiheä '
      + 'kujaverkko, jollaista ei ole missään muualla ruudussa: kujat '
      + 'ovat niin kapeita, että ne on merkitty OpenStreetMapiin '
      + 'jalankulkuväyliksi ja huoltoteiksi eivätkä kaduiksi. Sitä '
      + 'kiertää soikea kehä, joka on kaupunginmuurin paikalla, ja '
      + 'muurin jäänteet piirtyvät tummina pätkinä idässä ja '
      + 'pohjoisessa — loput on purettu 1960-luvulta alkaen, samoin '
      + 'useimmat porteista. Eteläreunassa on Bab al-Yaman ja '
      + 'pohjoisreunassa sen vastapari Bab es-Shaub. Vanhankaupungin '
      + 'länsipuolella kulkee pohjoisesta etelään al-Sailah, tulvauoma '
      + 'joka on kuivana aikana ajotie; sen toisella puolella on '
      + 'al-Mahdin moskeija ja siitä länteen Bir al-Azabin '
      + 'osmaniaikainen puutarhakaupunginosa. Ruudun ulkopuolelle jää '
      + 'idässä Jabal Nuqum, joka kohoaa noin 500 metriä kaupungin '
      + 'yläpuolelle; se kerrotaan oppaassa. Kartan kohteista pääsee '
      + 'lukemaan lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Medinassa ja Mekassa. */
      { nimi: 'Al-Bakiriyyan moskeija', lat: 15.35599, lon: 44.21975 },
      { nimi: 'Suolatori', lat: 15.35496, lon: 44.21584 },
      { nimi: 'Talhan moskeija', lat: 15.35399, lon: 44.21238 },
      { nimi: 'Suuri moskeija', lat: 15.35315, lon: 44.2149 },
      { nimi: 'Al-Mahdin moskeija', lat: 15.35308, lon: 44.20922 },
      { nimi: 'Bab al-Yaman', lat: 15.35095, lon: 44.21591 },
    ],
  },

  /*
   * ADEN (erä 4, 20.8.2026). Pääruutu on Crater eli Seera, sammuneen
   * tulivuoren pohja, ja kainalossa Tawahi eli entinen Steamer Point
   * runsaat kuusi kilometriä länsiluoteeseen. Väli on kannasta ja
   * satamavesiä, joten yhteen ruutuun pakotettuna kraatteri kutistuisi
   * lukukelvottomaksi — sama ratkaisu kuin Medinassa (Quba) ja
   * Mekassa (Jabal al-Nour).
   *
   * VAIN NELJÄ KOHDETTA, mikä on kaksi alle talon alarajan, ja syy on
   * kuvissa eikä koordinaateissa. Overpass antaa Craterista kymmenkunta
   * nimettyä kohdetta — Siran linna 12,77896 / 45,04967, Aidrus-
   * moskeija 12,77212 / 45,03647, Adenin minareetti 12,77825 /
   * 45,03987, Adenin portti 12,78816 / 45,02663 — mutta Commonsissa
   * ei ole yhdestäkään niistä vapaata vähintään 1 200 pikselin kuvaa.
   * Siran linnan parhaat tiedostot ovat 1 080 ja 665 pikseliä leveitä,
   * Aidrus-moskeijan 791 ja 720, ja Adenin kirjaston ainoassa
   * kelpokokoisessa kuvassa on poliittisia julisteita ja tunnistettava
   * henkilö. "Ei kuvaa, ei kohdetta" (Jerusalemin ennakkotapaus).
   * Kaikki neljä kerrotaan kartan esittelyssä ja lehden teksteissä.
   *
   * KOORDINAATIT: Kansallismuseo, Craterin tori ja Tawilan altaat ovat
   * Overpassista (haettu 20.8.2026). Altaiden osalta en-Wikipedian
   * coord 12,7743 / 45,0290 ja Overpassin 12,77459 / 45,02912 ovat
   * 35 metrin päässä toisistaan eli samaa mieltä. Siran linnalla ero
   * on 120 metriä (Wikipedia 12,780044 / 45,049821), eli yli sadan —
   * Overpass olisi voittanut, mutta kohde jäi joka tapauksessa pois.
   * KAINALON Steamer Point on POIKKEUS: OSM:ssä ei ole Big Ben Adenia
   * eikä muutakaan nimettyä pistettä kaupunginosan ytimessä, joten
   * koordinaatti on en-Wikipedian Big Ben Aden -artikkelista
   * (12,789904 / 44,98151). Se on kirjattu tähän, koska se on ainoa
   * kartan piste, joka ei tule Overpassista.
   *
   * TARKISTA-KARTTAPISTEET VAROITTAA YHDESTÄ PISTEESTÄ: Tawilan
   * altaat osuu vesialueelle. Varoitus on oikea mutta tässä
   * tarkoituksellinen — altaat ovat OSM:ssä natural=water, koska ne
   * ovat vesialtaita, ja piste osuu siis juuri siihen kohteeseen,
   * jonka se nimeää. Pistettä EI siirretty rannalle: siirto veisi
   * numeron pois altaista. Muut kolme pistettä ovat maalla.
   */
  aden: {
    polku: 'assets/kartat/aden-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 12.791, etela: 12.769, lansi: 45.023, ita: 45.053 },
    kainalot: [
      { rajat: { pohjoinen: 12.7955, etela: 12.7845, lansi: 44.9755, ita: 44.9875 },
        x: 14, y: 2, leveys: 20, korkeus: 25, suunta: '6 km länsiluoteeseen' },
    ],
    esittely: 'Aden on kaksi niemeä ja niiden väliin jäävä '
      + 'luonnonsatama. Kreikkalaiset tunsivat paikan nimellä Eudaimon '
      + 'eli onnekas, ja Punaisenmeren kaupan jälleenlaivauspaikkana se '
      + 'oli tärkeä jo ennen ajanlaskun alkua; Periplus kuvasi sen '
      + 'sanoilla "kylä rannalla". Antiikin aikaan Aden oli enemmän '
      + 'saari kuin niemi, koska mantereeseen yhdistävä kannas oli '
      + 'nykyistä kapeampi. Kaupunkia hallitsivat vuorollaan '
      + 'himjarilaiset, zurayidit, ajjubidit ja rasulidit, ja '
      + '1300-luvulla käynyt Ibn Battuta kirjoitti muistiin sen '
      + 'vesialtaat: "nämä altaat keräävät sadeveden yksinomaan '
      + 'kaupunkilaisten juomavedeksi". Osmanit ottivat kaupungin 1538, '
      + 'ja britit vuonna 1839 — heille se oli hiiliasema Bombayn ja '
      + 'Suezin välissä.'
      + '\n\nKartan pääruutu on Crater, jonka nimi on kirjaimellinen: '
      + 'korttelit ovat sammuneen tulivuoren pohjalla. Katuverkko on '
      + 'säännöllinen ruudukko, ja se päättyy joka suunnassa samalla '
      + 'tavalla — rinteeseen. Ruudun etelä- ja länsilaidan tyhjyys on '
      + 'aitoa maastoa eikä puuttuvaa aineistoa: siellä nousee Jabal '
      + 'Shamsanin vuoristo, jonka huiput ylittävät 500 metriä. '
      + 'Pohjoisreunassa katu kaartaa kapean solan läpi ulos '
      + 'kraatterista — se on Main Pass eli Adenin portti, kaupungin '
      + 'ainoa maayhteys, jonka osmaniaikainen holvikaari purettiin '
      + 'vuonna 1963 tien leventämiseksi. Idässä meri työntyy '
      + 'kraatterin kylkeen, ja lahden keskellä on kalliosaari: siellä '
      + 'seisoo Siran linna, jonka vanhin osa on 1000-luvulta ja joka '
      + 'kesti sekä portugalilaisten että osmanien hyökkäykset. '
      + 'Vasemmassa ylänurkassa on kainalokartta Tawahista eli '
      + 'entisestä Steamer Pointista, jonne höyrylaivat tulivat ja '
      + 'matkustajat nousivat maihin. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään; kainalo ensin, kuten Mekassa. */
      { nimi: 'Steamer Point', lat: 12.789904, lon: 44.98151 },
      { nimi: 'Kansallismuseo', lat: 12.77892, lon: 45.04306 },
      { nimi: 'Craterin tori', lat: 12.77755, lon: 45.03497 },
      { nimi: 'Tawilan altaat', lat: 12.77459, lon: 45.02912 },
    ],
  },
    /*
   * SALALAHIN KOHDEKARTTA (Opus 20.8.2026). Kaupungille kirjoitettiin
   * lehti elokuussa nimenomaan ILMAN kohdekarttaa, ja perustelu luki
   * kulttuuri-kategoriat.js:ssä: "lähteellisiä kohteita on kaksi, ja
   * ne ovat sama paikka". Perustelu oli liian tiukka. Se laski vain
   * ne kohteet, joilla on OMA en-Wikipedian artikkeli. Kun mukaan
   * otetaan en-Wikivoyagen Salalah-sivu — sama lähdekäytäntö kuin
   * Tripolin lehdessä — kohteita on seitsemän, ja jokaisella niistä
   * on koordinaatti sekä vapaa kuva Commonsissa.
   *
   * RAJAUS on 5,9 × 4,6 km ja tahallaan leveä: Salalah on nauha meren
   * ja Dhofarin vuorten välissä, ja kohteet ovat rivissä rannikon
   * suuntaan eivätkä ytimen ympärillä. Numerointi on siksi LÄNNESTÄ
   * ITÄÄN eikä pohjoisesta etelään kuten Medinassa ja Mekassa —
   * pohjois-eteläsuunnassa koko kartta on vain neljä kilometriä, ja
   * numerot menisivät sekaisin.
   *
   * KOORDINAATIT: Wikivoyagen see-merkinnät ja Overpass antavat
   * viidessä kohteessa saman pisteen sadan metrin sisällä. Kahdessa
   * ne eroavat enemmän, ja talon sääntö on että Overpass voittaa:
   *  - Al-Husnin palatsi: Wikivoyage 16,999768 / 54,099334, Overpass
   *    16,9993 / 54,09682 — ero noin 270 metriä, käytetty Overpassia;
   *  - Al-Haffan basaari: Wikivoyage 17,00072 / 54,10335, Overpass
   *    17,00291 / 54,10246 — ero noin 260 metriä, käytetty Overpassia.
   * Al-Baleedissa ero on 106 metriä (Wikivoyage 17,006929 /
   * 54,132433), ja sekin ratkaistiin Overpassin hyväksi.
   *
   * SALALAH MUSEUM JÄI POIS. Kulttuurikeskuksen museo (17,0225 /
   * 54,0866) olisi ollut kahdeksas kohde, mutta siitä ei ole
   * Commonsissa yhtään vapaata kuvaa, ja sen mukaan ottaminen olisi
   * levittänyt rajauksen 6,7 kilometriin. Se mainitaan oppaassa.
   */
  salalah: {
    polku: 'assets/kartat/salalah-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 17.033, etela: 16.9915, lansi: 54.088, ita: 54.143 },
    esittely: 'Salalah on Omanin eteläisen Dhofarin maakunnan pääkaupunki '
      + 'ja maan kolmanneksi suurin kaupunki, runsaat kolmesataakolme'
      + 'kymmentätuhatta asukasta. Se on aina ollut Dhofarin oma '
      + 'keskus. Seudun huippukausi oli 1200-luku, jolloin suitsuke'
      + 'kauppa teki rannikosta rikkaan; sen jälkeen alue hiipui, ja '
      + '1800-luvulla se liitettiin Masqatin ja Omanin sulttaanikuntaan. '
      + 'Vuosina 1932–1970 Salalah oli sulttaani Said bin Taimurin '
      + 'asuinpaikka ja käytännössä maan pääkaupunki, ja hänen '
      + 'poikansa Qaboos syntyi täällä vuonna 1940. Kun Qaboos nousi '
      + 'valtaan vuonna 1970, hän siirsi pääkaupungin Masqatiin. '
      + 'Kesäkuusta syyskuun alkuun puhaltava khareef-monsuuni tekee '
      + 'ympäröivistä vuorista vihreät, ja se on nykyään kaupungin '
      + 'tärkein matkailukausi.\n\n'
      + 'Kartalla kaupunki on nauha. Meri on alalaidassa, ja rannan '
      + 'suuntaisesti kulkee kaksi pitkää katua: alempi rantatie ja '
      + 'ylempi As Sultan Qaboos, joka on kaupungin selkäranka. Niiden '
      + 'väliin jää tiheä ruutukaava lännessä ja itään mentäessä yhä '
      + 'harvempi verkko — se ei ole puuttuvaa tietoa vaan kookos- ja '
      + 'banaanitarhoja, joita keitaan pohjavesi elättää. Oikeassa '
      + 'alakulmassa erottuu selvästi rajattu suorakaide veden '
      + 'ympärillä: se on Al-Baleedin arkeologinen puisto, ja sen '
      + 'keskellä näkyvät keskiaikaisen Zafarin perustusrivit. Puiston '
      + 'vesi on Khawr al-Balid, entinen lahti, joka kuroutui umpeen '
      + 'järveksi ja lopetti sataman. Kartalta jää pohjoiseen Salalahin '
      + 'lentoasema, runsaan kilometrin päähän yläreunasta, ja lännessä '
      + 'kulttuurikeskuksen museo. Kartan kohteista pääsee lukemaan '
      + 'lisää napauttamalla.',
    kohteet: [
      /* Numerointi lännestä itään — ks. lohkon esittely. */
      { nimi: 'Sultan Qaboosin moskeija', lat: 17.0172, lon: 54.0939 },
      { nimi: 'Al-Husnin palatsi', lat: 16.9993, lon: 54.0968 },
      { nimi: 'Al-Haffan basaari', lat: 17.0029, lon: 54.1025 },
      { nimi: 'Nabi Umranin hauta', lat: 17.0214, lon: 54.1113 },
      { nimi: 'Burj an-Nahda', lat: 17.025, lon: 54.1118 },
      { nimi: 'Al-Baleedin puisto', lat: 17.0069, lon: 54.1335 },
      { nimi: 'Suitsukemuseo', lat: 17.0094, lon: 54.1361 },
    ],
  },
  /*
   * MOSULIN KOHDEKARTTA (Opus 20.8.2026). Tässäkin kumotaan aiempi
   * "ei kohdekarttaa" -perustelu, joka luki kulttuuri-kategoriat.js:ssä:
   * "kaupungin rakennuksia koskevat artikkelit kertovat pääosin
   * vuosien 2014-2017 tuhosta". Se pitää artikkeleista paikkansa,
   * mutta EI KOHTEISTA: jokaisesta seitsemästä kohteesta on
   * kirjoitettavissa täysi juttu pelkällä 1900-lukua edeltävällä
   * aineistolla, ja juuri niin on tehty. Yksikään juttu ei kerro
   * tuhosta eikä jälleenrakennuksesta, eikä yksikään kuvateksti
   * väitä mitään kohteen nykytilasta — kuvat on valittu vuosilta
   * 1849–2013 ja kuvateksteissä on vuosiluku.
   *
   * RAJAUS KATTAA MOLEMMAT RANNAT. Vanhakaupunki on Tigriin
   * länsirannalla, mutta antiikin Ninive on itärannalla runsaan
   * kilometrin päässä joesta, ja kaupungin nimi tarkoittaa juuri
   * liitoskohtaa näiden kahden välillä. Pelkkä länsiranta olisi
   * jättänyt Niniven pois. Ruutu on 5,2 × 4,0 km.
   *
   * OSM-AINEISTO EI OLE HARVAA, vaikka Fablen speksi varoitti siitä.
   * Rajauksen kysely palautti 2 604 elementtiä, ja vanhankaupungin
   * kujasto piirtyy kartalle tiheimpänä kohtana koko kuvassa —
   * tiheämpänä kuin itärannan ruutukaava. Jalkakäytävä- ja
   * palvelutielippujen kanssa (ks. tools/piirra-kaupunkikartta.mjs)
   * kujat tulevat mukaan sellaisina kuin ne ovat.
   *
   * KOORDINAATIT ovat kohteiden omista en-Wikipedian artikkeleista.
   * Overpass antaa jokaiselle seitsemälle vastineen, ja suurin ero on
   * Niniven linnavuorella 80 metriä (Wikipedia 36,3594 / 43,1528,
   * Overpass 36,35945 / 43,15188) — sadan metrin rajan alla, joten
   * artikkelin koordinaatti kelpaa. Al-Masfin moskeijalla ei ole
   * artikkelissaan koordinaattia lainkaan, joten se on ainoana
   * suoraan Overpassista (36,34641 / 43,13223).
   */
  mosul: {
    polku: 'assets/kartat/mosul-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 36.368, etela: 36.332, lansi: 43.112, ita: 43.17 },
    esittely: 'Mosulin arabiankielinen nimi al-Mawsil tarkoittaa '
      + 'liitoskohtaa, ja kartta näyttää miksi. Tigris halkoo kuvan '
      + 'luoteesta kaakkoon, ja joen kaksi rantaa ovat kaksi eri '
      + 'kaupunkia. Itärannalla, runsaan kilometrin päässä vedestä, '
      + 'ovat Kuyunjikin ja Nabi Yunusin kummut: ne ovat antiikin '
      + 'Ninive, jonka Sanherib teki Assyrian pääkaupungiksi noin '
      + 'vuonna 700 eKr. ja josta tuli aikansa suurin kaupunki '
      + 'maailmassa. Kaupunkia kiersi kahdentoista kilometrin muuri, '
      + 'sen sisällä oli seitsemänsataaviisikymmentä hehtaaria ja '
      + 'muurissa viisitoista porttia. Ninive kukistui vuonna 612 eKr. '
      + 'Länsiranta on nuorempi: sinne perustettiin Mepsila, jonka '
      + 'rakensivat Niniven entiset asukkaat oman pääkaupunkinsa '
      + 'raunioista, ja se otti Tigriin ylityspaikan tehtävän tiellä, '
      + 'joka yhdisti Assyrian Anatoliaan. Kaupunki on 223 metrin '
      + 'korkeudessa Ylä-Mesopotamiassa, ja se on Bagdadin jälkeen '
      + 'Irakin toiseksi suurin.\n\n'
      + 'Kartalla erot näkyvät heti. Kuvan vasen puolisko on tiheintä '
      + 'kujastoa koko kartastossa: se on vanhakaupunki, jonka '
      + 'katuverkko syntyi ennen autoja ja jota osmanivallan alussa '
      + 'kehuttiin seitsemästä portistaan, sairaalastaan ja katetusta '
      + 'basaaristaan. Sen pohjoislaidalla joen mutkassa on Bash '
      + 'Tapian linna, yksi kaupunginmuurin seitsemästä linnakkeesta, '
      + 'ja hieman siitä sisämaahan Qara Saray eli Musta palatsi. '
      + 'Kujaston keskeltä löytyvät Al-Nurin ja Al-Nabi Jirjisin '
      + 'moskeijat, ja pohjoisempaa Al-Masfi, jonka paikalla seisoi '
      + 'kaupungin ensimmäinen perjantaimoskeija. Itäranta on '
      + 'päinvastainen: leveitä suoria katuja ja säännöllisiä '
      + 'kortteleita. Sen keskellä avautuu kartan suurin yhtenäinen '
      + 'alue, jolla ei ole katuja lainkaan — se on Niniven muurien '
      + 'sisäpuoli, ja sen halki mutkittelee Khosr-joki. Kartan '
      + 'kohteista pääsee lukemaan lisää napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Medinassa ja Mekassa. */
      { nimi: 'Kuyunjikin kumpu', lat: 36.3594, lon: 43.1528 },
      { nimi: 'Bash Tapian linna', lat: 36.3554, lon: 43.1216 },
      { nimi: 'Qara Saray', lat: 36.3528, lon: 43.1257 },
      { nimi: 'Nabi Yunusin kumpu', lat: 36.3481, lon: 43.1594 },
      { nimi: 'Al-Masfin moskeija', lat: 36.3464, lon: 43.1322 },
      { nimi: 'Al-Nabi Jirjisin moskeija', lat: 36.3443, lon: 43.1303 },
      { nimi: 'Al-Nurin moskeija', lat: 36.3431, lon: 43.1267 },
    ],
  },
  /*
   * BANGKOK (20.8.2026). Rajaus on Rattanakosinin saari ja sen
   * itäpuoli, noin 4,8 × 3,4 km: lännessä Wat Arun Thonburin
   * rannalla, keskellä keinosaari palatseineen, idässä Wat Saketin
   * Kultainen vuori ja Yaowarat ja kaakossa Hua Lamphongin
   * rautatieasema. Kaikki yhdeksän kohdetta mahtuvat samaan ruutuun,
   * joten kainaloa ei tarvita.
   *
   * DAMNOEN SADUAKIN KELLUVA TORI JÄI POIS TARKOITUKSELLA: se on
   * koordinaateista laskettuna noin 63 kilometriä lounaaseen (Floating
   * market -artikkelin sanallinen arvio on "noin 100 km"; koordinaatit
   * voittavat leipätekstin, v925/v932/v937) eikä sovi mihinkään
   * kaupunkikartan rajaukseen. Se kerrotaan matkaoppaassa päiväretkenä
   * — sama ratkaisu kuin Medinan Uhud-vuorella.
   *
   * WAT PHRA KAEW JA SUURPALATSI OVAT MOLEMMAT KARTALLA, vaikka
   * temppeli on palatsin muurien sisällä: pisteiden väli on noin 150
   * metriä eli numeroympyrät mahtuvat vierekkäin (tarkistettu
   * tools/tarkista-karttapisteet.mjs:llä). Ne ovat lehden kannalta
   * kaksi eri nähtävyyttä, toisin kuin Mekan moskeijan sisäkohteet,
   * jotka olivat kymmenien metrien päässä toisistaan.
   *
   * Koordinaatit ovat kohteiden omista en-Wikipedian artikkeleista ja
   * ne on tarkistettu erikseen (haettu 20.8.2026).
   */
  bangkok: {
    polku: 'assets/kartat/bangkok-keskusta.png',
    lahde: '© OpenStreetMap-tekijät (ODbL)',
    rajat: { pohjoinen: 13.7625, etela: 13.7315, lansi: 100.4805, ita: 100.5245 },
    esittely: 'Bangkok on nuori pääkaupunki vanhalla paikalla. Kylä '
      + 'nimeltä Bangkok oli Chao Phrayan varrella jo Ayutthayan '
      + 'kaudella, ja kun Ayutthaya tuhoutui 1767, kuningas Taksin '
      + 'perusti uuden pääkaupungin Thonburiin joen länsirannalle. '
      + 'Rama I siirsi sen 1782 itärannalle ja kaivatti kanavat, jotka '
      + 'tekivät Rattanakosinista keinotekoisen saaren; tiilet uusiin '
      + 'muureihin haettiin proomuilla Ayutthayan raunioista. Kaupunki '
      + 'eli veden varassa: kanavat eli khlongit olivat sen katuja, ja '
      + 'ulkomaalaiset kutsuivat sitä idän Venetsiaksi. Ensimmäinen '
      + 'länsimaiseen tapaan rakennettu katu Charoen Krung valmistui '
      + 'vasta 1864, ja Rama V:n kaudella katuverkko kasvoi kanavien '
      + 'rinnalle — silloin syntyi myös kiinalaiskorttelin pääkatu '
      + 'Yaowarat.\n\n'
      + 'Kartalla joki on pääosassa: Chao Phraya tulee kuvaan '
      + 'vasemmasta ylänurkasta, kaartaa suuren S-mutkan kuvan '
      + 'vasemmassa puoliskossa ja poistuu alalaidasta. Mutkan sisään '
      + 'jää Rattanakosinin saari, jonka erottaa mantereesta '
      + 'kanavarengas — vanha vallihauta piirtyy kapeana vesiuomana '
      + 'katujen lomassa. Saaren kärjessä ovat '
      + 'Sanam Luangin avoin kenttä sekä Suurpalatsin ja Wat Phra '
      + 'Kaew\'n suuri kortteli, ja heti niiden alapuolella Wat Pho. '
      + 'Joen toisella puolella lounaassa on Wat Arun ja sen ympärillä '
      + 'Thonburin kanavien verkko. Itään mentäessä katuverkko '
      + 'tihenee: keskellä ovat Jättiläiskeinun aukio ja Kultaisen '
      + 'vuoren kukkula, kaakossa Yaowaratin vino katu kiinalais'
      + 'kortteleineen ja sen takana Hua Lamphongin asema '
      + 'ratapihoineen. Kartan kohteista pääsee lukemaan lisää '
      + 'napauttamalla.',
    kohteet: [
      /* Numerointi pohjoisesta etelään, kuten Medinassa ja Mekassa. */
      { nimi: 'Sanam Luang', lat: 13.755, lon: 100.4931 },
      { nimi: 'Wat Saket ja Kultainen vuori', lat: 13.7539, lon: 100.5083 },
      { nimi: 'Sao Ching Cha', lat: 13.7519, lon: 100.5014 },
      { nimi: 'Wat Phra Kaew', lat: 13.7514, lon: 100.4925 },
      { nimi: 'Suurpalatsi', lat: 13.7501, lon: 100.492 },
      { nimi: 'Wat Pho', lat: 13.7464, lon: 100.4936 },
      { nimi: 'Wat Arun', lat: 13.7436, lon: 100.4889 },
      { nimi: 'Yaowarat', lat: 13.7411, lon: 100.5083 },
      { nimi: 'Hua Lamphong', lat: 13.7389, lon: 100.5167 },
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
/*
 * MITTAKAAVAJANA kohdekartan kulmaan (omistajan toive 9.8.2026
 * testipelistä: "Google Maps -tyyliin, pieni vaakajana joka kertoo
 * minkä matkan tietty pituus vastaa todellisuudessa").
 *
 * Jana lasketaan rajauksesta eikä kirjoiteta käsin: jokaisen
 * kohdekartan rajat ovat asteina, ja kuva täyttää rajauksen leveyden
 * tarkalleen (ks. suoraPiste), joten x-prosentti on suoraan matkan
 * osuus. Uusi kaupunki saa janan ilman että tähän kosketaan.
 *
 * Pituus valitaan karttojen vakiosarjasta 1 / 2 / 2,5 / 5 × 10ⁿ, ja
 * tavoite on neljäsosa kartan leveydestä. Sarjasta poikkeaminen
 * antaisi tarkemman osuman mutta rumemman luvun: "700 m" ei ole
 * mittakaavajana vaan sattuma. Siksi Dubain kaltaisessa tiiviissä
 * rajauksessa (2,8 km) jana jää 500 metriin eli 18 prosenttiin, ja se
 * on oikea valinta — vaihtoehto olisi ollut kilometri, joka veisi yli
 * kolmanneksen kuvasta.
 *
 * Leveysaste kaventaa pituuspiirejä, joten kilometrit lasketaan
 * rajauksen keskileveydellä. Ilman kosinia Tromssan kartta väittäisi
 * olevansa kolme kertaa todellista leveämpi.
 */
const JANAN_PITUUDET = [
  50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000,
];

export function mittakaava(kartta) {
  /*
   * Vain suorakulmaiselle rajaukselle. Laea-kartoissa (maiden
   * korkokartat) mittakaava vaihtelee kuvan sisällä, joten yksi jana
   * valehtelisi reunoilla — palautetaan mieluummin null kuin väärä
   * luku. Kainaloita ei myöskään huomioida: jana kertoo pääkartan
   * mittakaavan, ja kainalo on oma kuvansa omalla rajauksellaan.
   */
  if (kartta?.projektio === 'laea') return null;
  const r = kartta?.rajat;
  if (!r) return null;
  const keskileveys = ((r.pohjoinen + r.etela) / 2) * (Math.PI / 180);
  /*
   * KAKSI LEVEYTTÄ, KUN KUVA ON YDINRAJAUSTA LAAJEMPI (piirtoRajat,
   * ks. ydinAla). Janan PITUUS valitaan siitä, mitä lepotilassa
   * näkyy — ydinrajauksen leveydestä — jotta jana on kuvassa saman
   * mittainen kuin ennen laajennusta. Sen OSUUS taas lasketaan koko
   * piirretystä kuvasta, koska lehti antaa janalle leveyden
   * prosentteina lavasta eli kuvasta. Ilman tätä jakoa jana olisi
   * lepotilassa 1,6-kertainen: neljäsosa laajemmasta kuvasta on
   * reilusti yli neljäsosa siitä, mikä kehyksessä näkyy.
   */
  const p = kartta.piirtoRajat ?? r;
  const metria = (p.ita - p.lansi) * 111320 * Math.cos(keskileveys);
  const ydinMetria = (r.ita - r.lansi) * 111320 * Math.cos(keskileveys);
  if (!Number.isFinite(metria) || metria <= 0) return null;
  const tavoite = ydinMetria * 0.25;
  let paras = JANAN_PITUUDET[0];
  for (const pituus of JANAN_PITUUDET) {
    if (Math.abs(pituus - tavoite) < Math.abs(paras - tavoite)) paras = pituus;
  }
  const osuus = (paras / metria) * 100;
  return {
    metria: paras,
    osuus,
    // Sama jana osuutena SIITÄ, MITÄ LEPOTILASSA NÄKYY. Osuus on
    // lehden CSS-leveys, ydinOsuus on se mitta, jolla janan koko
    // arvioidaan (tests/mittakaava.test.mjs). Laajentamattomalla
    // kartalla ne ovat sama luku.
    ydinOsuus: (paras / ydinMetria) * 100,
    // Teksti valmiina: alle kilometrin metreinä, muuten kilometreinä
    // ja pilkulla, koska peli on suomeksi ("1,5 km" eikä "1.5 km").
    teksti: paras < 1000
      ? `${paras} m`
      : `${String(paras / 1000).replace('.', ',')} km`,
  };
}

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
  // Prosentit ovat aina PIIRRETYSTÄ KUVASTA. Kun kuva on ydinrajausta
  // laajempi (piirtoRajat, ks. ydinAla), sama piste on kuvassa eri
  // kohdassa kuin ydinrajauksessa — mutta lehden lava on silloin
  // yhtä paljon kehystä suurempi, joten piste osuu ruudulla samaan
  // paikkaan kuin ennen.
  return suoraPiste(kartta.piirtoRajat ?? kartta.rajat, lat, lon);
}

/**
 * Ydinrajauksen paikka piirretyssä kuvassa prosentteina (x, y,
 * leveys, korkeus).
 *
 * KARTTA JATKUU REUNOJEN YLI (omistajan tilaus 15.8.2026: "sitä
 * voisi lisätä piirroksessa että kartta jatkuisi pidemmälle").
 * Juliste piirretään ydinrajausta laajemmalta alueelta samasta
 * keskipisteestä (piirtoRajat), mutta lepotilassa lehti näyttää
 * täsmälleen ydinrajauksen (rajat) — reunus paljastuu vasta
 * zoomatessa ja panoroitaessa. Tämä funktio kertoo, missä kohtaa
 * kuvaa ydinrajaus on, ja siitä lasketaan sekä lavan koko ja
 * asemointi (ui.js) että panoroinnin rajat.
 *
 * Ilman piirtoRajat-lohkoa vastaus on koko kuva, jolloin kaikki
 * laskenta palautuu sanasta sanaan entiselleen — vanhat kartat eivät
 * siis muutu millään tavalla.
 */
/**
 * Rajauksen kuvasuhde: leveys yhtä korkeusyksikköä kohden.
 *
 * Sama kaava kuin piirtäjässä (tools/piirra-kaupunkikartta.mjs), ja
 * sen on pysyttävä samana: lehti mitoittaa kehyksen ja lavan tällä,
 * ja piirtäjä valitsi kuvan korkeuden samalla luvulla. Leveyspiirit
 * kapenevat pohjoiseen, joten venytys otetaan rajauksen
 * keskileveydeltä.
 */
export function karttaKuvasuhde(rajat) {
  const venytys = 1 / Math.cos(((rajat.pohjoinen + rajat.etela) / 2) * (Math.PI / 180));
  return (rajat.ita - rajat.lansi) / ((rajat.pohjoinen - rajat.etela) * venytys);
}

export function ydinAla(kartta) {
  const p = kartta?.piirtoRajat;
  const r = kartta?.rajat;
  if (!p || !r) return { x: 0, y: 0, leveys: 100, korkeus: 100 };
  return {
    x: ((r.lansi - p.lansi) / (p.ita - p.lansi)) * 100,
    y: ((p.pohjoinen - r.pohjoinen) / (p.pohjoinen - p.etela)) * 100,
    leveys: ((r.ita - r.lansi) / (p.ita - p.lansi)) * 100,
    korkeus: ((r.pohjoinen - r.etela) / (p.pohjoinen - p.etela)) * 100,
};
}
