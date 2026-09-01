/*
 * MAASTOKOHTEET — YEM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs YEM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/YEM.json. Työkalu laskee laudan
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
 * Jemenin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Jabal an-Nabi Shu'aybin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 3 666 m); johdanto sanoo, että vuori on koko Arabian niemimaan korkein. Sokotra on saari-tyypin kohde — sama tyyppi on kohdemallissa tuettu (js/fokuskohteet.js KOHDE_TYYPIT).
 */
export const MAASTOKOHTEET_YEM = [
  {
    id: 'jabalannabishuayb',
    nimi: 'Jabal an-Nabi Shu\'ayb',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Arabian korkein vuori on Jemenissä?',
      'Kuka oli profeetta Shuayb?',
    ],
    korostukset: ['Sarawat|Sarawatin'],
    nappi: 'Koko Arabian korkein',
    // 43.9758 E / 15.2792 N — en-Wikipedia "Jabal An-Nabi Shu'ayb"
    laudat: {
      maailmankartta: { x: 7299.2, y: 2698.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kaikki Arabian niemimaan yli kolmetuhatmetriset huiput ovat Jemenissä, ja korkein '
      + 'niistä on Jabal an-Nabi Shu\'ayb, profeetta Shuaybin vuori: 3 666 metriä aivan Sanaan '
      + 'kupeessa. Se kuuluu Sarawatin vuoristoon, joka juoksee Punaisenmeren rannan '
      + 'suuntaisesti koko Jemenin länsilaidan pituudelta ja kääntyy sitten itään Adeninlahden '
      + 'rinnalle. Vuoristo on syntynyt tulivuorista, ja sen läntiset rinteet saavat enemmän '
      + 'sadetta kuin mikään muu kohta niemimaalla — itäpuolen loivemmat rinteet ovat vadien '
      + 'uurtamia, ja niissä viljellään, koska Intian valtameren monsuuni yltää sinne asti. '
      + 'Rinteillä elää hamadryaspaviaaneja, ja arabianleopardistakin on tehty havaintoja.',
    lahde: 'en-Wikipedia "Sarawat Mountains", johdanto-osa sekä osiot "Geology" ja "Wildlife" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'adeninlahti',
    nimi: 'Adeninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi lahti levenee joka vuosi?',
      'Mikä Bab-el-Mandeb on?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Lahti joka levenee yhä',
    // 45.6 E / 12.55 N — ulappa Adenin edustalla; artikkelin oma keskipiste 48 / 12 on lahden keskellä etelämpänä
    laudat: {
      maailmankartta: { x: 7353.3, y: 2791 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Adeninlahti on syvä lahti Jemenin ja Afrikan sarven välissä. Luoteessa se yhtyy '
      + 'Punaiseenmereen Bab-el-Mandebin salmen kautta ja idässä Arabianmereen. Lahden keskellä '
      + 'kulkee Adeninharjanne, jonka liikunta leventää lahtea noin 15 millimetriä vuodessa — '
      + 'meri siis kasvaa hitaasti. Antiikin kreikkalaisille lahti oli osa Erythrainmerta, '
      + 'tärkeimpiä tunnettuja vesiä.',
    lahde: 'en-Wikipedia "Gulf of Aden", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sokotra',
    nimi: 'Sokotra',
    // Saari, ei meri: 'saari' on kohdemallin oma tyyppi
    // (js/fokuskohteet.js KOHDE_TYYPIT) ja saa luonto-symbolin
    // tyyppijohdolla, joten symboli-kenttää ei tarvita.
    tyyppi: 'saari',
    kysymykset: [
      'Voiko saari kuulua eri maanosaan kuin valtionsa?',
      'Mitä soqotri-kieli on?',
    ],
    korostukset: ['soqotri|soqotria'],
    nappi: 'Saari kahden maailman välissä',
    // 53.92 E / 12.51 N — en-Wikipedia "Socotra"
    laudat: {
      maailmankartta: { x: 7630.7, y: 2792.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sokotra on Jemenin saari Intian valtameressä, 380 kilometriä Arabian niemimaalta '
      + 'etelään mutta vain 232 kilometriä Afrikan sarvesta itään. Hallinnollisesti se on '
      + 'Jemeniä, mutta geologisesti Afrikkaa: saari on Somalian mannerlaatasta irronnut '
      + 'sirpale. Se on saariryhmänsä kuudesta saaresta ylivoimaisesti suurin, ja sen asukkaat '
      + 'puhuvat arabian ohella omaa soqotria.',
    lahde: 'en-Wikipedia "Socotra", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

