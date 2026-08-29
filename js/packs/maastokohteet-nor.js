/*
 * MAASTOKOHTEET — NOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NOR.json. Työkalu laskee laudan
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
 * Norjan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_NOR = [
  {
    id: 'galdhpiggen',
    nimi: 'Galdhøpiggen',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Jotunheimen tarkoittaa?',
      'Onko Galdhøpiggenilla jäätikköä?',
    ],
    korostukset: ['Jotunheimen|Jotunheimenin'],
    nappi: 'Pohjois-Euroopan korkein',
    // 8.3125 E / 61.6364 N — en-Wikipedia "Galdhøpiggen"
    laudat: {
      maailmankartta: { x: 6110.4, y: 843.1 },
      europe: { x: 370.8, y: 272.6 },
    },
    teksti: 'Galdhøpiggen on Norjan, Skandinavian ja koko Pohjois-Euroopan korkein vuori: 2 469 '
      + 'metriä. Se sijaitsee Lomin kunnassa Innlandetin maakunnassa Jotunheimenin vuoristossa '
      + 'Jotunheimenin kansallispuiston sisällä. Ympärillä kohoaa tiheä joukko muita huippuja — '
      + 'Keilhaus topp, Store Styggehøe, Storjuvtinden ja Skardstinden muiden muassa.',
    lahde: 'en-Wikipedia "Galdhøpiggen", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'norjanmeri',
    nimi: 'Norjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Norjan rannikko pysyy sulana talvella?',
      'Mikä Jan Mayenin harjanne on?',
    ],
    nappi: 'Meri, joka ei jäädy',
    // 6 E / 66.4 N — ulappa Norjan länsirannikon edustalla; artikkelin oma keskipiste on 2 / 69
    laudat: {
      maailmankartta: { x: 6033.3, y: 589.5 },
      europe: { x: 326.4, y: 147.3 },
    },
    teksti: 'Norjanmeri on reunameri Norjasta luoteeseen, Pohjanmeren ja Grönlanninmeren välissä, '
      + 'ja se rajautuu koillisessa Barentsinmereen. Lounaassa sen erottaa Atlantista Islannin '
      + 'ja Färsaarten välinen vedenalainen harjanne, pohjoisessa Jan Mayenin harjanne erottaa '
      + 'sen Grönlanninmerestä. Meri luetaan joko Atlanttiin tai Jäämereen kuuluvaksi.',
    lahde: 'en-Wikipedia "Norwegian Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'barentsinmeri',
    nimi: 'Barentsinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Willem Barentsz oli?',
      'Miksi merta kutsuttiin ennen Murmanskinmereksi?',
    ],
    korostukset: ['Willem Barentsz|Willem Barentszin'],
    nappi: 'Meri, joka on nimetty hollantilaiselta',
    // 26 E / 71.3 N — ulappa Finnmarkin rannikon edustalla; artikkelin oma keskipiste on 40 / 75
    laudat: {
      maailmankartta: { x: 6700, y: 303.8 },
      europe: { x: 710.4, y: 18.4 },
    },
    teksti: 'Barentsinmeri on Jäämeren reunameri Norjan ja Venäjän pohjoisrannikoilla, ja se on '
      + 'jaettu Norjan ja Venäjän aluevesiksi. Venäläiset tunsivat sen aiemmin '
      + 'Murmanskinmerenä. Nykyinen nimi tulee hollantilaiselta merenkulkijalta Willem '
      + 'Barentszilta.',
    lahde: 'en-Wikipedia "Barents Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'glomma',
    nimi: 'Glomma',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Glommaa käytettiin tukinuittoon?',
      'Mihin Glomma laskee?',
    ],
    nappi: 'Norjan pisin joki',
    // 11.56 E / 60.88 N — Elverum joen keskijuoksulla; artikkelin koordinaatti 10,931 / 59,218 on suistossa
    laudat: {
      maailmankartta: { x: 6218.7, y: 881.6 },
      europe: { x: 433.2, y: 292.5 },
    },
    teksti: 'Glomma eli Glåma on Norjan pisin ja vesirikkain joki. Sen kokonaispituus on 621 '
      + 'kilometriä, ja valuma-alue kattaa 13 prosenttia koko Norjan pinta-alasta — kaikki maan '
      + 'eteläosassa.',
    lahde: 'en-Wikipedia "Glomma", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

