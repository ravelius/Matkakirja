/*
 * MAASTOKOHTEET — COL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs COL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/COL.json. Työkalu laskee laudan
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
 * Kolumbian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: joen fi-artikkeli on Magdalena, meren asu Karibianmeri; Pico Cristóbal Colón sellaisenaan.
 */
export const MAASTOKOHTEET_COL = [
  {
    id: 'picocristobalcolon',
    nimi: 'Pico Cristóbal Colón',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Kolumbian korkeimmasta huipusta ei olla varmoja?',
      'Miten lumi pysyy vuorella näin lähellä päiväntasaajaa?',
    ],
    nappi: 'Lumihuippu meren rannalla',
    // -73.6867 E / 10.8383 N — en-Wikipedia "Pico Cristóbal Colón" (-73,687 / 10,838)
    laudat: {
      maailmankartta: { x: 3377.1, y: 2848.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pico Cristóbal Colón on mahdollisesti Kolumbian korkein vuori, ilmoitettu korkeus 5 '
      + '775 metriä. Rinnalla on lähes yhtä korkea Pico Simón Bolívar, eikä kummankaan '
      + 'paremmuudesta olla varmoja — toinen niistä on maailman viidenneksi topografisesti '
      + 'hallitsevin huippu. Lähin korkeampi vuori, Cayambe, on 1 288 kilometrin päässä. '
      + 'Molemmat kuuluvat Sierra Nevada de Santa Martan vuoristoon, joka nousee erillään '
      + 'Andeista aivan Karibianmeren rannalta. Huipuilla on pysyvä lumipeite. Tämä on '
      + 'Etelä-Amerikan korkein kohta Andien ulkopuolella.',
    lahde: 'en-Wikipedia "Pico Cristóbal Colón", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'karibianmeri',
    nimi: 'Karibianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on Caymanin hauta?',
      'Miksi Karibianmeren rannoilla on niin monta lahtea?',
    ],
    nappi: 'Antillien rajaama meri',
    // -75.5 E / 11.8 N — ulappa Kolumbian pohjoisrannikon edustalla Cartagenan ja Santa Martan kohdalla; en-Wikipedia "Caribbean Sea" antaa keskipisteeksi -75 / 15
    laudat: {
      maailmankartta: { x: 3316.7, y: 2816.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Karibianmeri on Pohjois-Atlantin sivumeri läntisen pallonpuoliskon tropiikissa. Sitä '
      + 'rajaavat pohjoisessa Suuret Antillit Kuubasta Puerto Ricoon, idässä Pienet Antillit, '
      + 'etelässä Venezuelan ja Kolumbian rannikko ja lännessä Väli-Amerikka. Pinta-alaa on '
      + 'noin 2 754 000 neliökilometriä, mikä tekee siitä maailman suurimpia meriä. Syvin kohta '
      + 'on Caymanin hauta Caymansaarten ja Jamaikan välissä, 7 686 metriä pinnan alla. Meressä '
      + 'on maailman toiseksi suurin valliriutta, tuhat kilometriä pitkä Keski-Amerikan riutta.',
    lahde: 'en-Wikipedia "Caribbean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'magdalena',
    nimi: 'Magdalena',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen suulla on vaikea purjehtia?',
      'Miten yksi joki voi elättää kaksi kolmasosaa maasta?',
    ],
    nappi: 'Kolumbian valtasuoni',
    // -74.6 E / 8.5 N — joen alajuoksu Magdalenan laaksossa; en-Wikipedia "Magdalena River" antaa koordinaatiksi suun Barranquillan kohdalla (-74,85 / 11,117)
    laudat: {
      maailmankartta: { x: 3346.7, y: 2927.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Magdalena on Kolumbian päävirta. Se kulkee pohjoiseen noin 1 528 kilometriä maan '
      + 'länsipuoliskon halki omassa laaksossaan ja laskee lopulta Karibianmereen. Alajuoksu on '
      + 'suurelta osin purjehduskelpoinen aina Hondaan asti, jossa kosket alkavat, vaikka '
      + 'suistossa liikkuvat hiekkasärkät haittaavat kulkua. Joen valuma-alue on 273 000 '
      + 'neliökilometriä eli 24 prosenttia koko maan pinta-alasta, ja sillä alueella asuu 66 '
      + 'prosenttia kolumbialaisista. Nimi tulee Raamatun Maria Magdalenasta.',
    lahde: 'en-Wikipedia "Magdalena River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

