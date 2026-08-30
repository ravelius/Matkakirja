/*
 * MAASTOKOHTEET — CHL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHL.json. Työkalu laskee laudan
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
 * Chilen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: aavikon fi-artikkeli on Atacama, tulivuoren nimi Ojos del Salado sellaisenaan.
 */
export const MAASTOKOHTEET_CHL = [
  {
    id: 'ojosdelsalado',
    nimi: 'Ojos del Salado',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi näin korkealla vuorella ei ole jäätikköä?',
      'Kumpi on korkeampi, Ojos del Salado vai Aconcagua?',
    ],
    nappi: 'Maailman korkein tulivuori',
    // -68.5414 E / -27.1097 N — en-Wikipedia "Ojos del Salado" (-68,541 / -27,110)
    laudat: {
      maailmankartta: { x: 3548.6, y: 4137.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ojos del Salado on uinuva yhdistelmätulivuori Argentiinan ja Chilen rajalla, maailman '
      + 'korkein tulivuori ja Chilen korkein huippu, 6 893 metriä. Ylärinteet ovat '
      + 'päällekkäisiä laavakupoleja, laavavirtoja ja kraattereita. Etelä-Amerikan kuivan '
      + 'vyöhykkeen laidalla ilma on niin kuivaa, ettei kunnon jäätikköä tai pysyvää lunta '
      + 'synny — silti itähuipun kraatterissa on noin sadan metrin levyinen kraatterijärvi 6 '
      + '480 metrissä, maailman korkein järvi. Viimeisin purkaus ajoittuu noin vuoteen 750. '
      + 'Ensinousun tekivät kaksi puolalaista vuonna 1937.',
    lahde: 'en-Wikipedia "Ojos del Salado", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tyynimeri',
    nimi: 'Tyynimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuri osa maapallosta on Tyyntämerta?',
      'Miksi Tyynimeri jakautuu kahteen kiertoon?',
    ],
    nappi: 'Maapallon suurin ja syvin meri',
    // -73.5 E / -36 N — ulappa Chilen keskiosan rannikon edustalla; en-Wikipedia "Pacific Ocean" antaa keskipisteeksi -160 / 0
    laudat: {
      maailmankartta: { x: 3383.3, y: 4465.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tyynimeri on maapallon valtameristä suurin ja syvin. Sen pinta-ala on noin 165 250 000 '
      + 'neliökilometriä eli 46 prosenttia maapallon vesipinnasta ja 32 prosenttia koko '
      + 'planeetan pinnasta — enemmän kuin kaikki mantereet yhteensä. Keskisyvyys on 4 000 '
      + 'metriä, ja Mariaanien haudan Challengerin syvänne painuu 10 928 metriin, maailman '
      + 'syvimpään tunnettuun kohtaan. Coriolisvoima jakaa meren kahteen lähes erilliseen '
      + 'kiertoon, jotka kohtaavat päiväntasaajalla. Chile rajautuu tähän mereen koko pitkän '
      + 'pituutensa matkalta.',
    lahde: 'en-Wikipedia "Pacific Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'atacama',
    nimi: 'Atacama',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miten paikka voi olla sateeton neljäsataa vuotta?',
      'Miksi tähtitornit rakennetaan juuri Atacamaan?',
    ],
    korostukset: ['sadevarjo|sadevarjon'],
    nappi: 'Maailman kuivin aavikko',
    // -69.25 E / -24.5 N — en-Wikipedia "Atacama Desert" (-69,25 / -24,5)
    laudat: {
      maailmankartta: { x: 3525, y: 4044.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atacama on aavikkoylänkö Tyynenmeren rannikolla Pohjois-Chilessä, 1 600 kilometriä '
      + 'pitkä kaistale Andien länsipuolella ja pinta-alaltaan 105 000 neliökilometriä. Se on '
      + 'maapallon kuivin ei-polaarinen aavikko. Kuivuus johtuu kaksipuolisesta sadevarjosta: '
      + 'Andit pysäyttävät Atlantin kosteuden ja rannikkovuoret Tyynenmeren, ja kylmä '
      + 'Humboldtin virta vahvistaa ilmiötä. Sadetta tulee noin 15 millimetriä vuodessa, ja '
      + 'joillakin sääasemilla ei ole mitattu sadetta koskaan. Korkeus, kuiva ilma ja '
      + 'valosaasteen puute tekevät Atacamasta maailman parhaita tähtitieteen paikkoja.',
    lahde: 'en-Wikipedia "Atacama Desert", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

