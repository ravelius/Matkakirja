/*
 * MAASTOKOHTEET — FIN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FIN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FIN.json. Työkalu laskee laudan
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
 * Suomen maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_FIN = [
  {
    id: 'halti',
    nimi: 'Halti',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Suomen korkein kohta ei ole huippu?',
      'Mikä on korkein kokonaan Suomessa oleva tunturi?',
    ],
    korostukset: ['Enontekiö|Enontekiön'],
    nappi: 'Suomen korkein kohta — mutta ei huippu',
    // 21.2789 E / 69.3228 N — en-Wikipedia "Halti"
    laudat: {
      maailmankartta: { x: 6542.6, y: 422.5 },
      europe: { x: 619.8, y: 70.4 },
    },
    teksti: 'Halti on tunturi Norjan ja Suomen rajalla. Sen varsinainen huippu Ráisduottarháldi on '
      + 'Norjan puolella, noin kilometrin päässä rajasta, ja Suomen puolen korkein kohta on 1 '
      + '324 metrissä oleva Hálditšohkka — maan korkein piste, mutta rinteellä eikä huipulla. '
      + 'Rajan mutka juontuu Ruotsin ja Tanskan rajasopimuksesta vuodelta 1734, jolloin '
      + 'rajapyykit lyötiin sinne minne oli kätevintä ja raja sovittiin kulkevaksi suoraan '
      + 'niiden välillä.',
    lahde: 'en-Wikipedia "Halti", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanlahti',
    nimi: 'Pohjanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Merenkurkku on?',
      'Miksi Pohjanlahden rannat nousevat yhä?',
    ],
    korostukset: ['Merenkurkku|Merenkurkkuun'],
    nappi: 'Itämeren pohjoisin haara',
    // 21.6 E / 62.8 N — ulappa Merenkurkun pohjoispuolella; artikkelin oma keskipiste on 20 / 63
    laudat: {
      maailmankartta: { x: 6553.3, y: 783.1 },
      europe: { x: 625.9, y: 242 },
    },
    teksti: 'Pohjanlahti on Itämeren pohjoisin haara Suomen länsirannikon ja Pohjois-Ruotsin '
      + 'itärannikon välissä. Se jakautuu kolmeen osaan: Perämereen, Merenkurkkuun ja '
      + 'Selkämereen. Lahden eteläpäässä on Ahvenanmaa, Ahvenanmeren ja Saaristomeren välissä.',
    lahde: 'en-Wikipedia "Gulf of Bothnia", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'suomenlahti',
    nimi: 'Suomenlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä joki laskee Suomenlahden pohjukkaan?',
      'Miksi lahden ympäristöongelmat ovat pahimpia juuri täällä?',
    ],
    korostukset: ['Neva|Neva'],
    nappi: 'Itämeren itäisin haara',
    // 25.2 E / 59.9 N — en-Wikipedia "Gulf of Finland" (26 / 59,83), siirretty hieman länteen lahden keskiulapalle
    laudat: {
      maailmankartta: { x: 6673.3, y: 930.7 },
      europe: { x: 695, y: 318.2 },
    },
    teksti: 'Suomenlahti on Itämeren itäisin haara. Se ulottuu Suomen ja Viron välissä itään '
      + 'Pietariin asti, jonne Neva laskee. Lahden rannoilla ovat myös Helsinki ja Tallinna, ja '
      + 'koska lahti on matala, Itämeren ympäristöongelmat näkyvät siinä kaikkein selvimmin.',
    lahde: 'en-Wikipedia "Gulf of Finland", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'kemijoki',
    nimi: 'Kemijoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Kemijoella uitettiin tukkeja?',
      'Mikä Ounasjoki on?',
    ],
    korostukset: ['Ounasjoki|Ounasjoki'],
    nappi: 'Suomen pisin joki',
    // 25.6 E / 66.4 N — keskijuoksu Rovaniemen yläpuolella; artikkelin koordinaatti 24,45 / 65,77 on suistossa Kemissä
    laudat: {
      maailmankartta: { x: 6686.7, y: 589.5 },
      europe: { x: 702.7, y: 147.3 },
    },
    teksti: 'Kemijoki on 550 kilometrin pituinen ja Suomen pisin joki. Se virtaa etelään Kemijärven '
      + 'ja Rovaniemen kautta ja laskee Pohjanlahteen Kemissä. Rovaniemen kohdalla siihen yhtyy '
      + 'Ounasjoki.',
    lahde: 'en-Wikipedia "Kemijoki", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

