/*
 * MAASTOKOHTEET — DNK. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs DNK --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/DNK.json. Työkalu laskee laudan
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
 * Tanskan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_DNK = [
  {
    id: 'mllehj',
    nimi: 'Møllehøj',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten näin matala kumpu voi olla maan korkein?',
      'Mikä on Grönlannin korkein vuori?',
    ],
    korostukset: ['Jyllanti|Jyllannin'],
    nappi: 'Tanskan katto — 170,86 metriä',
    // 9.8262 E / 55.9772 N — en-Wikipedia "Møllehøj"
    laudat: {
      maailmankartta: { x: 6160.9, y: 1120.2 },
      europe: { x: 399.9, y: 421.4 },
    },
    teksti: 'Møllehøj on emämaan Tanskan korkein luonnollinen kohta: 170,86 metriä merenpinnasta. '
      + 'Se kohoaa Jyllannin sisämaan viljelysmaisemassa, eikä maassa ole yhtään vuorta — koko '
      + 'Tanska on jääkauden jälkeensä jättämää alavaa moreenimaata. Tanskan kuningaskunnan '
      + 'korkein kohta on aivan muualla, Grönlannin jäätiköiden keskellä.',
    lahde: 'en-Wikipedia "Møllehøj", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Vattimeri on?',
      'Miksi Jyllannin länsirannikko on niin suora?',
    ],
    nappi: 'Jyllannin läntinen meri',
    // 7.4 E / 56.2 N — ulappa Jyllannin länsirannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 6080, y: 1109.7 },
      europe: { x: 353.3, y: 415.5 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Tanska on ainoa maa, jonka rannat ovat '
      + 'sekä tällä merellä että Itämerellä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Mitkä salmet yhdistävät Itämeren Pohjanmereen?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 12.6 E / 54.9 N — ulappa Tanskan saarten eteläpuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6253.3, y: 1170.4 },
      europe: { x: 453.1, y: 449.7 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Se on maailman suurin murtovesiallas. Tanskan salmet '
      + 'ovat sen ainoa yhteys Pohjanmerelle, ja siksi juuri ne ovat aina olleet Itämeren '
      + 'avain.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

