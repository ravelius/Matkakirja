/*
 * MAASTOKOHTEET — NGA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NGA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NGA.json. Työkalu laskee laudan
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
 * Nigerian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nigerjoen merkki on Lokojassa, jossa Benue yhtyy siihen — suisto olisi lehden eteläreunassa ja kahden joen tarina kerrotaan juuri yhtymäkohdassa.
 */
export const MAASTOKOHTEET_NGA = [
  {
    id: 'chappalwaddi',
    nimi: 'Chappal Waddi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorta kutsutaan kuoleman vuoreksi?',
      'Mitä Mambillan ylängön taruissa vuorella ratkaistiin?',
    ],
    nappi: 'Länsi-Afrikan korkein huippu',
    // 11.715 E / 7.0361 N — en-Wikipedia "Chappal Waddi"
    laudat: {
      maailmankartta: { x: 6223.8, y: 2976.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Chappal Waddi kohoaa 2 419 metriin Taraban osavaltiossa Kamerunin rajan tuntumassa, ja '
      + 'se on sekä Nigerian että koko Länsi-Afrikan korkein kohta. Vuoren alkuperäinen '
      + 'mambilankielinen nimi on Gang, ja ylängön vanhoissa taruissa juuri tällä vuorella '
      + 'ratkaistiin, tuliko satovuodesta hyvä vai huono. Se tunnetaan myös kuoleman vuorena.',
    lahde: 'en-Wikipedia "Chappal Waddi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä nollameridiaani ja päiväntasaaja leikkaavat?',
      'Mitkä suuret joet laskevat Guineanlahteen?',
    ],
    nappi: 'Trooppisen Atlantin kulmaus',
    // 5 E / 3.3 N — ulappa Nigerin suiston edustalla; artikkelin oma keskipiste on nollasaarella (0 / 0)
    laudat: {
      maailmankartta: { x: 6000, y: 3101.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa, joka ulottuu Liberian Cape '
      + 'Palmasista Gabonin Cape Lopeziin. Juuri tässä lahdessa maapallon koordinaatiston '
      + 'nollapiste — päiväntasaajan ja nollameridiaanin leikkauskohta — osuu avomerelle. '
      + 'Lahteen laskevat monet suuret joet, muiden muassa Niger ja Volta.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'nigerjoki',
    nimi: 'Nigerjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Niger virtaa puolikuun muotoisen kaaren?',
      'Mikä on Nigerin suisto?',
    ],
    korostukset: ['Benue|Benuen'],
    nappi: 'Länsi-Afrikan pääjoki',
    // 6.74 E / 7.8 N — Lokoja, jossa Benue yhtyy Nigeriin; artikkelin koordinaatti 6,469 / 5,322 on suistossa
    laudat: {
      maailmankartta: { x: 6058, y: 2951 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niger on Länsi-Afrikan pääjoki ja Afrikan kolmanneksi pisin, noin 4 180 kilometriä — '
      + 'edellä ovat vain Niili ja Kongo. Se saa alkunsa Guinean ylängöltä läheltä Sierra '
      + 'Leonen rajaa ja kiertää suuren puolikuun muotoisen kaaren Malin ja Nigerin kautta, '
      + 'kunnes laskee Guineanlahteen valtavan suistonsa läpi. Merkki on Lokojassa, jossa '
      + 'jokeen yhtyy sen suurin sivujoki Benue.',
    lahde: 'en-Wikipedia "Niger River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'benue',
    nimi: 'Benue',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä Benuen nimi tarkoittaa?',
      'Miksi joki on tärkeä kuljetusreitti?',
    ],
    nappi: 'Virtahepojen joki',
    // 8.53 E / 7.73 N — Makurdi joen keskijuoksulla; artikkelin koordinaatti 6,757 / 7,753 on yhtymäkohdassa Lokojassa
    laudat: {
      maailmankartta: { x: 6117.7, y: 2953.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Benue on Nigerjoen suurin sivujoki ja Nigerian toiseksi pisin joki. Lähes koko sen '
      + 'noin 1 400 kilometrin pituus on kesäkuukausina purjehduskelpoista, joten se on '
      + 'seutunsa tärkeä kuljetusväylä. Nimi tulee tiv-kielen sanasta, joka tarkoittaa '
      + 'virtahepojen jokea.',
    lahde: 'en-Wikipedia "Benue River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

