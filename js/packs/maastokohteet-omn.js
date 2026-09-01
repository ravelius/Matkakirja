/*
 * MAASTOKOHTEET — OMN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs OMN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/OMN.json. Työkalu laskee laudan
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
 * Omanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Jabal Shamsin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 3 018 m); johdanto sanoo vain, että vuori on maan korkein.
 */
export const MAASTOKOHTEET_OMN = [
  {
    id: 'jabalshams',
    nimi: 'Jabal Shams',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren nimi on Auringon vuori?',
      'Miten kanjoni syntyy aavikkomaahan?',
    ],
    korostukset: ['Al Nakhur|Al Nakhurin'],
    nappi: 'Arabian suuri kanjoni',
    // 57.2639 E / 23.2369 N — en-Wikipedia "Jebel Shams"
    laudat: {
      maailmankartta: { x: 7742.1, y: 2423 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Omanin korkeimmalle huipulle ei pääse kukaan. Jabal Shamsin pohjoishuippu on 3 009 '
      + 'metriä korkea, ja sen päällä on sotilastukikohta suljetulla alueella; retkeilijöille '
      + 'jää eteläinen huippu, kaksitoista metriä matalampi, jonne turistiministeriön '
      + 'merkitsemä W4-polku vie. Nimi tarkoittaa Auringon vuorta, ja sen kerrotaan tulevan '
      + 'siitä, että auringonnousu osuu Omanissa ensimmäisenä juuri tälle huipulle. Vuoren '
      + 'kyljessä aukeaa Al Nakhurin rotko, jota kutsutaan Arabian Grand Canyoniksi. Korkeus '
      + 'näkyy myös lämpötilassa: kesällä huipulla on noin kaksikymmentä astetta, talvella '
      + 'pakkasta — kaksisataaneljäkymmentä kilometriä Muscatista ja aivan toinen ilmasto.',
    lahde: 'en-Wikipedia "Jebel Shams", johdanto-osa sekä osiot "Description" ja "Climate" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'omaninlahti',
    nimi: 'Omaninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on hapeton merialue?',
      'Miksi Hormuzinsalmi on maailmankaupalle tärkeä?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmeen'],
    nappi: 'Portti Persianlahdelle',
    // 58.9 E / 24.2 N — ulappa Muscatin koillispuolella; artikkelin oma keskipiste on 58 / 25
    laudat: {
      maailmankartta: { x: 7796.7, y: 2389 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Vuonna 2018 tutkijat vahvistivat, että Omaninlahti on käytännössä kuollut. Sen lähes '
      + '165 000 neliökilometrin ulapasta on tullut yksi maailman suurimmista hapettomista '
      + 'merialueista — Floridan kokoinen vyöhyke, jossa merieläimille ei riitä happea. Syitä '
      + 'on kaksi yhtä aikaa: meri lämpenee, ja mailta huuhtoutuu siihen lannoitteiden typpeä '
      + 'ja fosforia. Silti lahti on yhä yksi maailman vilkkaimmin liikennöidyistä vesistä. Se '
      + 'yhdistää Arabianmeren Hormuzinsalmeen, jonka läpi kulkee kolmannes maailman '
      + 'nesteytetystä maakaasusta ja viidennes öljystä. Aina 1700-luvulle asti lahtea '
      + 'kutsuttiin Makranin mereksi, ja se nimi näkyy yhä vanhoissa kartoissa.',
    lahde: 'en-Wikipedia "Gulf of Oman", osiot "Ecology", "International trade" ja "Alternative '
      + 'names" (tarkistettu 1.9.2026).',
  },
];

