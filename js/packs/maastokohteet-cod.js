/*
 * MAASTOKOHTEET — COD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs COD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/COD.json. Työkalu laskee laudan
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
 * Kongon demokraattisen tasavallan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Stanleylle ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia), joten nimenä on kansainvälinen asu ja kongolainen nimi Ngaliema mainitaan tekstissä.
 */
export const MAASTOKOHTEET_COD = [
  {
    id: 'mountstanley',
    nimi: 'Mount Stanley',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi päiväntasaajan vuorella on jäätiköitä?',
      'Kuka oli Henry Morton Stanley?',
    ],
    korostukset: ['Rwenzori|Rwenzori-vuoristossa'],
    nappi: 'Jäätiköitä päiväntasaajalla',
    // 29.8717 E / 0.3858 N — en-Wikipedia "Mount Stanley"
    laudat: {
      maailmankartta: { x: 6829.1, y: 3198.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Stanley eli Ngaliema kohoaa 5 109 metriin Rwenzori-vuoristossa ja on sekä Kongon '
      + 'demokraattisen tasavallan että Ugandan korkein vuori — koko Afrikassa vain kolme '
      + 'huippua on korkeampia. Vuori on niin korkea, että sen laella on jäätiköitä, vaikka '
      + 'päiväntasaaja kulkee aivan vierestä. Nimensä se sai siirtomaa-ajan '
      + 'tutkimusmatkailijalta Henry Morton Stanleylta, ja se kuuluu Unescon '
      + 'maailmanperintökohteeseen Rwenzorin kansallispuistoon.',
    lahde: 'en-Wikipedia "Mount Stanley", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tanganjikajarvi',
    nimi: 'Tanganjikajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä järvi on Tanganjikaakin syvempi?',
      'Miten järven vesi päätyy Atlanttiin?',
    ],
    korostukset: ['Baikal|Baikalin'],
    nappi: 'Maailman pisin makeanveden järvi',
    // 29.5 E / -6.1 N — en-Wikipedia "Lake Tanganyika" (29,5 / -6,1); järven länsiranta on Kongon puolella
    laudat: {
      maailmankartta: { x: 6816.7, y: 3415.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanganjika on maailman pisin makeanveden järvi, ja sekä tilavuudessa että syvyydessä '
      + 'sen edelle kiilaa vain Siperian Baikal. Järvi jakautuu neljän maan kesken, joista '
      + 'suurimmat osuudet ovat Tansanialla ja Kongon demokraattisella tasavallalla. Sen vedet '
      + 'laskevat Lukuga-jokea pitkin Kongoon ja virtaavat lopulta Atlanttiin asti.',
    lahde: 'en-Wikipedia "Lake Tanganyika", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kongo',
    nimi: 'Kongo',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki ylittää päiväntasaajan kahdesti?',
      'Mistä nimi Kongo tulee?',
    ],
    korostukset: ['Boyoman putoukset|Boyoman putousten'],
    nappi: 'Maailman syvin joki',
    // 18.3 E / 0 N — keskijuoksu Mbandakan kohdalla; en-Wikipedia "Congo River" antaa suulle 12,45 / -6,08
    laudat: {
      maailmankartta: { x: 6443.3, y: 3211.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kongo on ainoa suuri joki, joka ylittää päiväntasaajan kahdesti — se kaartaa '
      + 'pohjoiseen ja palaa takaisin etelään, ja siksi sen valuma-alueella sataa aina '
      + 'jossakin. Se on myös maailman syvin mitattu joki: syvyyksiä on todettu noin 220 '
      + 'metriä. Afrikan joista vain Niili on pidempi, ja virtaamaltaan Kongon ohittavat vain '
      + 'Amazon sekä Ganges ja Brahmaputra yhdessä. Koko vesistö Chambeshistä alkaen on 4 700 '
      + 'kilometriä pitkä, ja valuma-alue kattaa neljä miljoonaa neliökilometriä eli '
      + 'kolmetoista prosenttia Afrikan maapinta-alasta. Boyoman putousten yläpuolella joen '
      + 'nimi vaihtuu Lualabaksi. Nimi Kongo tulee joen eteläpuolella sijainneesta Kongon '
      + 'kuningaskunnasta.',
    lahde: 'en-Wikipedia "Congo River", johdanto-osa ja osio "Name" (tarkistettu 1.9.2026).',
  },
];

