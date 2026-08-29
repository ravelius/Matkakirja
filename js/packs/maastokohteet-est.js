/*
 * MAASTOKOHTEET — EST. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs EST --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/EST.json. Työkalu laskee laudan
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
 * Viron maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_EST = [
  {
    id: 'suurmunamagi',
    nimi: 'Suur Munamägi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Suur Munamägi tarkoittaa?',
      'Millainen on Haanjan ylänkö?',
    ],
    korostukset: ['Haanjan ylänkö|Haanjan ylänkö'],
    nappi: 'Baltian korkein kohta',
    // 27.0592 E / 57.7144 N — en-Wikipedia "Suur Munamägi"
    laudat: {
      maailmankartta: { x: 6735.3, y: 1037.6 },
      europe: { x: 730.7, y: 375.7 },
    },
    teksti: 'Suur Munamägi on Viron ja koko Baltian korkein kohta, 318 metriä merenpinnasta. Se on '
      + 'Haanjan kylän lähellä Võrumaalla Viron kaakkoiskolkassa, aivan Latvian ja Venäjän '
      + 'rajojen tuntumassa. Nimi tarkoittaa suomeksi suurta munamäkeä, ja ympäröivä Haanjan '
      + 'ylänkö on loivasti kumpuilevaa.',
    lahde: 'en-Wikipedia "Suur Munamägi", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Viron saaret ovat niin matalia?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 22.4 E / 58.4 N — ulappa Saarenmaan länsipuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6580, y: 1004.4 },
      europe: { x: 641.3, y: 357.7 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Maantieteellisesti se jää Skandinavian niemimaan '
      + 'sekä Pohjois- ja Keski-Euroopan tasangon väliin. Se on maailman suurin murtovesiallas.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'suomenlahti',
    nimi: 'Suomenlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Tallinnasta tuli hansakaupunki?',
      'Kuinka syvä Suomenlahti on?',
    ],
    korostukset: ['Neva|Neva'],
    nappi: 'Itämeren itäisin haara',
    // 25.4 E / 59.6 N — en-Wikipedia "Gulf of Finland" (26 / 59,83), siirretty Viron rannikon puolelle
    laudat: {
      maailmankartta: { x: 6680, y: 945.6 },
      europe: { x: 698.9, y: 326.1 },
    },
    teksti: 'Suomenlahti on Itämeren itäisin haara. Se ulottuu Suomen ja Viron välissä itään '
      + 'Pietariin asti, jonne Neva laskee. Lahden rannoilla ovat myös Helsinki ja Tallinna, ja '
      + 'koska lahti on matala, Itämeren ympäristöongelmat näkyvät siinä kaikkein selvimmin.',
    lahde: 'en-Wikipedia "Gulf of Finland", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

