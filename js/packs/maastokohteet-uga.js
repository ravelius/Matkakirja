/*
 * MAASTOKOHTEET — UGA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UGA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UGA.json. Työkalu laskee laudan
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
 * Ugandan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Victorianjärvi kulkee pelin symbolitaksonomiassa merenä (luonto-symboli; erillistä järvityyppiä ei ole); nimiasu on fi-Wikipedian Victorianjärvi.
 */
export const MAASTOKOHTEET_UGA = [
  {
    id: 'mountstanley',
    nimi: 'Mount Stanley',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi lähes päiväntasaajalla on jäätiköitä?',
      'Kenen mukaan vuori on nimetty?',
    ],
    korostukset: ['Ruwenzori|Ruwenzori-vuoristossa'],
    nappi: 'Afrikan neljänneksi korkein',
    // 29.8717 E / 0.3858 N — en-Wikipedia "Mount Stanley"
    laudat: {
      maailmankartta: { x: 6829.1, y: 3198.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Stanley eli Ngaliema kohoaa Ruwenzori-vuoristossa 5 109 metriin: se on sekä '
      + 'Ugandan että Kongon demokraattisen tasavallan korkein vuori ja koko Afrikan '
      + 'neljänneksi korkein. Sen huiput ovat niin korkealla, että ne kannattelevat jäätiköitä '
      + 'käytännössä päiväntasaajalla. Vuori kuuluu Ruwenzorin kansallispuistoon, joka on '
      + 'Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Mount Stanley", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'victorianjarvi',
    nimi: 'Victorianjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä jättiläisjärvi oikeastaan on?',
      'Minkä joen latvavesi järvi on?',
    ],
    nappi: 'Afrikan suurin järvi',
    // 32.7 E / -0.3 N — järven Ugandan-puoleinen selkä Entebben eteläpuolella; artikkelin keskipiste 33 / -1 on Tansanian vesillä
    laudat: {
      maailmankartta: { x: 6923.3, y: 3221.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Victorianjärvi on Afrikan suurin järvi ja maailman suurin trooppinen järvi: lähes 60 '
      + '000 neliökilometriä, pinta-alaltaan makeista vesistä toinen vain Pohjois-Amerikan '
      + 'Yläjärvelle. Jättiläinen on kuitenkin matala — keskisyvyys on vain noin 40 metriä, '
      + 'sillä järvi täyttää loivan painanteen ylängöllä. Sen vesistä alkaa Valkoinen Niili.',
    lahde: 'en-Wikipedia "Lake Victoria" ja "White Nile", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'niili',
    nimi: 'Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Niilin matka alkaa?',
      'Mitä järviä joki läpäisee matkallaan?',
    ],
    nappi: 'Maailman pisimmän joen alku',
    // 33.2 E / 0.43 N — Jinja, jossa joki purkautuu Victorianjärvestä; Niili-artikkelin koordinaatti 31,14 / 30,17 on Egyptissä
    laudat: {
      maailmankartta: { x: 6940, y: 3197.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ugandassa alkaa maailman pisimmän joen matka: Valkoinen Niili purkautuu '
      + 'Victorianjärvestä ja kulkee Kyogajärven kautta Albertjärvelle — näitä osuuksia '
      + 'kutsutaan Victorian Niiliksi ja Albertin Niiliksi. Koko Niilillä on mittaa 7 088 '
      + 'kilometriä ennen kuin sen vedet ovat perillä Välimeressä.',
    lahde: 'en-Wikipedia "White Nile" ja "Nile", johdanto-osat (tarkistettu 30.8.2026).',
  },
];

