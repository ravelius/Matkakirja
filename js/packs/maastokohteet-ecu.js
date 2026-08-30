/*
 * MAASTOKOHTEET — ECU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ECU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ECU.json. Työkalu laskee laudan
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
 * Ecuadorin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Chimborazo ja Cotopaxi sellaisenaan, muoto Guayaquilinlahti fi-Wikipedian artikkelista Ecuador. Galápagos jätettiin pois: se on lon -90,5 eli maan fokuslehden rajauksen ulkopuolella (tarkistettu osuuLehteen-tarkistuksella), joten merkki jäisi pelaajan ulottumattomiin.
 */
export const MAASTOKOHTEET_ECU = [
  {
    id: 'chimborazo',
    nimi: 'Chimborazo',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten Chimborazo voittaa Mount Everestin?',
      'Mikä on päiväntasaajapullistuma?',
    ],
    korostukset: ['päiväntasaajapullistuma|päiväntasaajapullistumalla'],
    nappi: 'Kaukaisin piste maapallon keskipisteestä',
    // -78.8175 E / -1.4692 N — en-Wikipedia "Chimborazo" (-78,818 / -1,469)
    laudat: {
      maailmankartta: { x: 3206.1, y: 3260.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Chimborazo on kerrostulivuori Andien läntisessä ketjussa ja Ecuadorin korkein vuori, 6 '
      + '263 metriä. Merenpinnasta mitattuna se ei ole lähelläkään Mount Everestin 8 849:ää '
      + 'metriä, mutta silti sen huippu on maapallon pinnan kaukaisin piste planeetan '
      + 'keskipisteestä: vuori seisoo päiväntasaajapullistumalla, jossa maapallo itse työntyy '
      + 'ulospäin. Andien huipuista se on korkeudeltaan 39:s. Viimeisin tunnettu purkaus '
      + 'ajoittuu noin vuoteen 550.',
    lahde: 'en-Wikipedia "Chimborazo", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cotopaxi',
    nimi: 'Cotopaxi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on lahar?',
      'Miksi tulivuoren alla lasketaan maanjäristyksiä?',
    ],
    korostukset: ['lahar|laharien'],
    nappi: 'Yksi maailman korkeimmista toimivista tulivuorista',
    // -78.4378 E / -0.6806 N — en-Wikipedia "Cotopaxi" (-78,438 / -0,681)
    laudat: {
      maailmankartta: { x: 3218.7, y: 3234.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cotopaxi on toimiva kerrostulivuori Andeilla, Cotopaxin kansallispuistossa noin 50 '
      + 'kilometriä Quitosta etelään. Se on Ecuadorin toiseksi korkein huippu Chimborazon '
      + 'jälkeen, 5 897 metriä, ja yksi maailman korkeimmista toimivista tulivuorista. '
      + 'Purkauksia tunnetaan 87, ja niiden laharien eli mutavirtojen jäljiltä vuorta ympäröi '
      + 'joukko laaksoja. Uusin purkausjakso alkoi lokakuussa 2022, ja Ecuadorin geofysiikan '
      + 'laitos laski sen jälkeen noin 8 000 maanjäristystä eli 1 600 tapausta kuukaudessa.',
    lahde: 'en-Wikipedia "Cotopaxi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'guayaquilinlahti',
    nimi: 'Guayaquilinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi lahden pohjassa on murtumia?',
      'Mitkä joet tuovat vetensä Guayaquilinlahteen?',
    ],
    nappi: 'Tyynenmeren suurin suisto',
    // -80.5 E / -3 N — en-Wikipedia "Gulf of Guayaquil" (-80,5 / -3,0)
    laudat: {
      maailmankartta: { x: 3150, y: 3311.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guayaquilinlahti on laaja Tyynenmeren vesialue Etelä-Amerikan länsirannikolla. '
      + 'Pohjoisrajana on Santa Elenan kaupunki Ecuadorissa ja eteläisenä Cabo Blanco Perussa, '
      + 'joten lahti on kahden maan yhteinen. Nimensä se on saanut Guayaquilin kaupungilta. '
      + 'Lahteen laskevat sekä Ecuadorin että Perun jokia: Guayas, Jubones, Zarumilla ja '
      + 'Tumbes. Lahden alla kulkee joukko murtumia, joista tärkeimmät ovat '
      + 'pohjois-eteläsuuntaisia ja jatkuvat mantereen puolelle. Ne voivat aiheuttaa '
      + 'vaarallisia maanjäristyksiä.',
    lahde: 'en-Wikipedia "Gulf of Guayaquil", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

