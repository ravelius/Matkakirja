/*
 * MAASTOKOHTEET — VEN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs VEN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/VEN.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Venezuelan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Angelinputous yhdyssanana, Orinoco sellaisenaan; Pico Bolívarille ei ole fi-artikkelia, ja nimi on espanjankielinen erisnimi.
 */
export const MAASTOKOHTEET_VEN = [
  {
    id: 'picobolivar',
    nimi: 'Pico Bolívar',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi köysirata ei vie huipulle asti?',
      'Kuka oli Simón Bolívar?',
    ],
    nappi: 'Venezuelan korkein huippu',
    // -71.0458 E / 8.5417 N — en-Wikipedia "Pico Bolívar" (-71,046 / 8,542)
    laudat: {
      maailmankartta: { x: 3465.1, y: 2926.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pico Bolívar on Venezuelan korkein vuori, 4 978 metriä, ja se kohoaa Méridan '
      + 'osavaltiossa. Huipulle pääsee vain kävellen: Méridan köysirata, joka valmistuessaan '
      + 'oli maailman korkein ja pisin, päättyy Pico Espejolle, ja siitä eteenpäin on '
      + 'kiivettävä. Huippu on nimetty Venezuelan itsenäisyyssankarin Simón Bolívarin mukaan. '
      + 'Vuorta kutsuttiin aiemmin nimellä La Columna, ja sen vieressä kohoavat El León 4 743 '
      + 'metriin ja El Toro 4 695 metriin. Uuden nimen ehdotti Tulio Febres Cordero vuonna '
      + '1925, ja se vahvistettiin virallisesti 30. joulukuuta 1934.',
    lahde: 'en-Wikipedia "Pico Bolívar", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'angelinputous',
    nimi: 'Angelinputous',
    // Putous on joen kohta, ei oma maastoluokkansa: tyyppi 'joki' pitää
    // kortin ylärivin oikeana ilman uutta luokkaa. Sama ratkaisu kuin
    // Argentiinan Iguassun putouksilla (js/packs/maastokohteet-arg.js).
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on tepui?',
      'Miksi putouksen korkeudesta ollaan epävarmoja?',
    ],
    korostukset: ['tepui|tepui'],
    nappi: 'Maailman korkein vesiputous',
    // -62.5356 E / 5.9675 N — en-Wikipedia "Angel Falls" (-62,536 / 5,968)
    laudat: {
      maailmankartta: { x: 3748.8, y: 3012.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Angelinputous on maailman korkein katkeamaton vesiputous: kokonaiskorkeus 979 metriä '
      + 'ja yhtenäinen vapaa pudotus 807 metriä. Vesi syöksyy Auyán-tepui -vuoren reunan yli '
      + 'Canaiman kansallispuistossa Gran Sabanan alueella. Tepui on hiekkakivinen pöytävuori, '
      + 'ja Auyán-tepui tarkoittaa pemónin kielellä jumalten taloa; sen lakiylängön pinta-ala '
      + 'on 667 neliökilometriä. Putouksen vesi virtaa Körepajokea myöten lopulta Orinocoon. '
      + 'Korkeus on mitattu kaukaa, ja siksi on yhä epäselvää, onko maailman korkein putous '
      + 'tämä vai Etelä-Afrikan Tugela.',
    lahde: 'en-Wikipedia "Angel Falls" ja "Auyán-tepui", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'orinoco',
    nimi: 'Orinoco',
    tyyppi: 'joki',
    kysymykset: [
      'Miten yksi joki riittää maan liikenneväyläksi?',
      'Miksi Orinocon virtaama on niin suuri?',
    ],
    korostukset: ['llanos|Llanosin'],
    nappi: 'Venezuelan valtavirta',
    // -63.5 E / 8.15 N — joen uoma Ciudad Bolívarin kohdalla; en-Wikipedia "Orinoco" antaa koordinaatiksi suiston (-62,25 / 8,617)
    laudat: {
      maailmankartta: { x: 3716.7, y: 2939.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Orinoco on Etelä-Amerikan pisimpiä jokia, 2 140 kilometriä. Sen valuma-alue on noin '
      + 'miljoona neliökilometriä, josta 65 prosenttia on Venezuelan ja 35 prosenttia Kolumbian '
      + 'puolella. Virtaamaltaan se on maailman kolmanneksi suurin joki, suistossa 39 000 '
      + 'kuutiometriä sekunnissa; syy on runsas sade, keskimäärin 2 300 millimetriä vuodessa '
      + 'koko valuma-alueella. Joki sivuhaaroineen on Itä- ja Sisä-Venezuelan sekä Kolumbian '
      + 'Llanosin tasangon tärkein liikenneväylä. Suurin sivujoki on Guaviare.',
    lahde: 'en-Wikipedia "Orinoco", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

