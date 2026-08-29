/*
 * MAASTOKOHTEET — CHE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHE.json. Työkalu laskee laudan
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
 * Sveitsin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_CHE = [
  {
    id: 'dufourspitze',
    nimi: 'Dufourspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka Guillaume-Henri Dufour oli?',
      'Kuinka monta neljäntuhannen metrin huippua Monte Rosassa on?',
    ],
    korostukset: ['Monte Rosa|Monte Rosa'],
    nappi: 'Sveitsin korkein huippu',
    // 7.8667 E / 45.9369 N — en-Wikipedia "Monte Rosa" (massiivin koordinaatti)
    laudat: {
      maailmankartta: { x: 6095.6, y: 1563 },
      europe: { x: 362.2, y: 685.5 },
    },
    teksti: 'Dufourspitze on 4 634 metriä korkea ja Alppien sekä Länsi-Euroopan toiseksi korkein '
      + 'vuori heti Mont Blancin jälkeen. Se on Monte Rosa -massiivin korkein huippu '
      + 'Pennialpeilla ja kokonaan Sveitsin puolella, ja se on nimetty maanmittari '
      + 'Guillaume-Henri Dufourin mukaan. Massiivissa on useita muitakin yli neljäntuhannen '
      + 'metrin huippuja, ja se on vedenjakaja Rhônen ja Pon vesistöjen välillä.',
    lahde: 'en-Wikipedia "Monte Rosa", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'matterhorn',
    nimi: 'Matterhorn',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka nousi Matterhornille ensimmäisenä?',
      'Miksi Matterhorn on niin tarkan pyramidin muotoinen?',
    ],
    korostukset: ['Pennialpit|Pennialpeilla'],
    nappi: 'Maailman kuvatuin vuori',
    // 7.6586 E / 45.9764 N — en-Wikipedia "Matterhorn"
    laudat: {
      maailmankartta: { x: 6088.6, y: 1561.3 },
      europe: { x: 358.2, y: 684.4 },
    },
    teksti: 'Matterhorn seisoo Sveitsin ja Italian rajalla päävedenjakajalla, ja sen 4 478 metrin '
      + 'huippu on lähes symmetrinen pyramidi Pennialpeilla Monte Rosan alueella. Sitä on '
      + 'kutsuttu vuorten vuoreksi ja Sveitsin sekä koko Alppien tunnukseksi. Sitä on myös '
      + 'kuvattu maailman kauneimmaksi vuoreksi ja väitetty maailman valokuvatuimmaksi.',
    lahde: 'en-Wikipedia "Matterhorn", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jungfrau',
    nimi: 'Jungfrau',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Eiger ja Mönch?',
      'Miten Jungfraulle päästään nykyään?',
    ],
    nappi: 'Kolmen vuoren muurista korkein',
    // 7.9626 E / 46.5368 N — en-Wikipedia "Jungfrau"
    laudat: {
      maailmankartta: { x: 6098.8, y: 1538 },
      europe: { x: 364.1, y: 669.7 },
    },
    teksti: 'Jungfrau kohoaa 4 158 metriin ja on yksi Bernin Alppien päähuipuista Bernin ja '
      + 'Valais\'n kantonien välissä, puolimatkassa Interlakenista Fieschiin. Yhdessä Eigerin ja '
      + 'Mönchin kanssa se muodostaa valtavan vuorimuurin, joka kohoaa Bernin Oberlandin ja '
      + 'Sveitsin ylätasangon yllä. Muuri on Sveitsin Alppien tunnistettavimpia näkyjä.',
    lahde: 'en-Wikipedia "Jungfrau", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rein',
    nimi: 'Rein',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Reinin varsinainen lähde on?',
      'Kuinka monen maan rajaa Rein muodostaa?',
    ],
    nappi: 'Joki, joka alkaa Sveitsistä',
    // 9.53 E / 46.85 N — Chur Alppien Reinin varrella; artikkelin koordinaatti 4,081 / 51,982 on suistossa Alankomaissa
    laudat: {
      maailmankartta: { x: 6151, y: 1524.8 },
      europe: { x: 394.2, y: 661.4 },
    },
    teksti: 'Rein on yksi Euroopan suurista joista, ja se alkaa Graubündenin kantonista '
      + 'Kaakkois-Sveitsin Alpeilta. Se muodostaa osan Sveitsin ja Liechtensteinin sekä '
      + 'Sveitsin ja Itävallan rajasta, ja Bodenjärvestä alaspäin osan Sveitsin ja Saksan '
      + 'rajasta. Sieltä se jatkaa Ranskan ja Saksan rajaa, kääntyy pohjoiseen Saksan halki ja '
      + 'laskee lopulta Alankomaissa Pohjanmereen.',
    lahde: 'en-Wikipedia "Rhine", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rhone',
    nimi: 'Rhône',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Rhône-jäätikkö on?',
      'Miksi Genevenjärvi on niin kirkas?',
    ],
    nappi: 'Joki, joka syntyy jäätiköllä',
    // 7.36 E / 46.23 N — Sion Valais'n Rhône-laaksossa; artikkelin koordinaatti 4,846 / 43,331 on suistossa Ranskassa
    laudat: {
      maailmankartta: { x: 6078.7, y: 1550.8 },
      europe: { x: 352.5, y: 677.8 },
    },
    teksti: 'Rhône saa alkunsa Alpeilta Sveitsin Valais\'n kantonista, virtaa Genevenjärven läpi ja '
      + 'jatkaa siitä Kaakkois-Ranskaan ja Välimereen. Sveitsin puolella se kulkee koko '
      + 'Valais\'n laakson pituudelta. Arles\'n kohdalla lähellä suistoa se jakautuu Suureksi ja '
      + 'Pieneksi Rhôneksi.',
    lahde: 'en-Wikipedia "Rhône", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

