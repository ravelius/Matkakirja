/*
 * MAASTOKOHTEET — SLE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SLE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SLE.json. Työkalu laskee laudan
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
 * Sierra Leonen maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_SLE = [
  {
    id: 'bintumani',
    nimi: 'Bintumani',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä eläimiä Bintumanin sademetsissä elää?',
      'Kummalla nimellä vuori tunnetaan, Bintumani vai Loma Mansa?',
    ],
    nappi: 'Loma-vuorten korkein',
    // -11.1167 E / 9.225 N — en-Wikipedia "Mount Bintumani"
    laudat: {
      maailmankartta: { x: 5462.8, y: 2903.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bintumani, toiselta nimeltään Loma Mansa, on Sierra Leonen ja koko Loma-vuoriston '
      + 'korkein huippu: 1 945 metriä. Sen alarinteitä peittävät sademetsät, joissa elää muun '
      + 'muassa kääpiövirtahepoja, kääpiökrokotiileja, kalastajapöllöjä ja lukuisia kädellisiä.',
    lahde: 'en-Wikipedia "Mount Bintumani", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Ketkä ylittivät Atlantin ensimmäisinä?',
      'Miksi vuotta 1492 pidetään käännekohtana?',
    ],
    nappi: 'Länsi-Afrikan portti maailmalle',
    // -13.7 E / 8.1 N — ulappa Freetownin edustalla; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5376.7, y: 2940.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, joka erottaa Amerikan mantereet '
      + 'Afrikasta ja Euraasiasta. Ensimmäisinä sen tiedetään ylittäneen norjalaisten '
      + 'viikinkien, mutta vasta Kolumbuksen retki vuonna 1492 avasi valtameren ylittävän '
      + 'liikenteen ja löytöretkien aikakauden. Sierra Leonen koko rannikko avautuu tälle '
      + 'valtamerelle.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'rokel',
    nimi: 'Rokel',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Rokelin suisto on suojeltu?',
      'Mitkä vuoret jakavat joen valuma-alueen?',
    ],
    nappi: 'Sierra Leonen suurin joki',
    // -12.8 E / 8.55 N — en-Wikipedia "Rokel River" — koordinaatti on joen keskijuoksulla
    laudat: {
      maailmankartta: { x: 5406.7, y: 2925.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rokel, toiselta nimeltään Seli, on Sierra Leonen suurin joki, jonka valuma-alue on yli '
      + '10 000 neliökilometriä. Sen laaja suisto, lähes 3 000 neliökilometriä, nimettiin '
      + 'kansainvälisesti tärkeäksi Ramsar-kosteikoksi vuonna 1999. Valuma-aluetta jakavat '
      + 'Gbengben ja Kabalan kukkulat sekä Sula-vuoret.',
    lahde: 'en-Wikipedia "Rokel River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

