/*
 * MAASTOKOHTEET — ITA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ITA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ITA.json. Työkalu laskee laudan
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
 * Italian maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-ita.js (Vesuvius, Etna, Dolomiitit, Po, Sardinia), joten tässä ovat vain puuttuvat rantameret. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_ITA = [
  {
    id: 'adrianmeri',
    nimi: 'Adrianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Venetsia rakennettiin juuri tänne?',
      'Mikä Otranton salmi on?',
    ],
    korostukset: ['Otranton salmi|Otranton salmesta'],
    nappi: 'Välimeren pohjoisin haara',
    // 15 E / 43 N — en-Wikipedia "Adriatic Sea" — koko meren likimääräinen keskipiste, ei täsmäpaikka
    laudat: {
      maailmankartta: { x: 6333.3, y: 1683.4 },
      europe: { x: 499.2, y: 762.7 },
    },
    teksti: 'Adrianmeri erottaa Apenniinien niemimaan Balkanin niemimaasta. Se on Välimeren '
      + 'pohjoisin haara ja ulottuu Otranton salmesta luoteeseen Pon laaksoon asti. Rantaa '
      + 'sillä on kuudella maalla: Albanialla, Bosnia ja Hertsegovinalla, Kroatialla, '
      + 'Italialla, Montenegrolla ja Slovenialla.',
    lahde: 'en-Wikipedia "Adriatic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tyrrhenanmeri',
    nimi: 'Tyrrhenanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Keitä tyrrhenialaiset olivat?',
      'Mitkä saaret ovat Tyrrhenanmerellä?',
    ],
    korostukset: ['etruskit|etruskeihin'],
    nappi: 'Meri, joka on nimetty etruskien mukaan',
    // 12 E / 40 N — en-Wikipedia "Tyrrhenian Sea" — meren keskipiste
    laudat: {
      maailmankartta: { x: 6233.3, y: 1802.9 },
      europe: { x: 441.6, y: 841.6 },
    },
    teksti: 'Tyrrhenanmeri on osa Välimerta Italian länsirannikolla. Sen nimi tulee '
      + 'tyrrhenialaisista, jotka on samastettu Italian etruskeihin. Meri jää Apenniinien '
      + 'niemimaan, Sardinian, Korsikan ja Sisilian väliin.',
    lahde: 'en-Wikipedia "Tyrrhenian Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ligurianmeri',
    nimi: 'Ligurianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Keitä liguurit olivat?',
      'Mitä eroa on Ligurianmerellä ja Tyrrhenanmerellä?',
    ],
    nappi: 'Meri, joka muistaa muinaisen kansan',
    // 9 E / 43.5 N — en-Wikipedia "Ligurian Sea" — meren keskipiste
    laudat: {
      maailmankartta: { x: 6133.3, y: 1663.1 },
      europe: { x: 384, y: 749.6 },
    },
    teksti: 'Ligurianmeri on Välimeren haara Luoteis-Italian ja Korsikan välissä. Sen uskotaan '
      + 'saaneen nimensä muinaisesta liguurien kansasta, joka asui näillä rannoilla ennen '
      + 'roomalaisia. Meri jää Tyrrhenanmeren pohjoispuolelle.',
    lahde: 'en-Wikipedia "Ligurian Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

