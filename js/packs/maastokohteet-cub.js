/*
 * MAASTOKOHTEET — CUB. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CUB --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CUB.json. Työkalu laskee laudan
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
 * Kuuban maastokohteet. Faktat en-Wikipediasta 30.8.2026; Karibianmeri on fi-Wikipedian artikkelinimi, Pico Turquino säilyy espanjankielisenä kuten muutkin vuorennimet.
 */
export const MAASTOKOHTEET_CUB = [
  {
    id: 'picoturquino',
    nimi: 'Pico Turquino',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli José Martí?',
      'Millainen metsä Sierra Maestran rinteillä kasvaa?',
    ],
    korostukset: ['José Martí|José Martín', 'Sierra Maestra|Sierra Maestran'],
    nappi: 'Kuuban korkein huippu',
    // -76.83583 E / 19.98944 N — en-Wikipedia "Pico Turquino", infolaatikko 19°59′22″N 76°50′09″W
    laudat: {
      maailmankartta: { x: 3272.1, y: 2536.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pico Turquino on Kuuban korkein kohta, 1 974 metriä. Se kohoaa Sierra Maestran '
      + 'vuoristossa saaren kaakkoisosassa Santiago de Cuban maakunnassa, ja huippu kuuluu '
      + 'Turquinon kansallispuistoon, jonka pinta-ala on 229 neliökilometriä. Laella on Jilma '
      + 'Maderan veistämä José Martín rintakuva, joka nostettiin sinne vuonna 1953 '
      + 'itsenäisyystaistelijan syntymän satavuotisjuhlaksi. Vuori on ollut myös poliittinen '
      + 'symboli: Fidel Castron joukot nousivat huipulle vuonna 1957, ja Che Guevaran mukaan '
      + 'paikalla oli liikkeelle lähes mystinen merkitys juuri siksi, että se oli maan korkein '
      + 'kohta.',
    lahde: 'en-Wikipedia "Pico Turquino", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'karibianmeri',
    nimi: 'Karibianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä saaret kuuluvat Suuriin Antilleihin?',
      'Miksi Karibialla riehuu niin paljon hurrikaaneja?',
    ],
    korostukset: ['Suuret Antillit|Suurten Antillien'],
    nappi: 'Antillien meri',
    // -79.2 E / 20.5 N — ulappa Kuuban etelärannikolla Batabanónlahden edustalla; en-Wikipedia "Caribbean Sea" antaa meren keskipisteeksi -75 / 15
    laudat: {
      maailmankartta: { x: 3193.3, y: 2518.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Karibianmeri levittäytyy Kuuban etelä- ja itäpuolelle: pinta-alaa on noin 2 754 000 '
      + 'neliökilometriä. Kuuba on Suurten Antillien läntisin ja suurin saari, ja Kuubasta '
      + 'Puerto Ricoon ulottuva saariketju muodostaa koko meren pohjoisrajan. Kansainvälisen '
      + 'merikartoitusjärjestön mukaan raja kulkee Kuuban ja Haitin välisen Windwardin salmen '
      + 'kautta. Idässä Pienet Antillit erottavat meren Atlantista, etelässä rajana on '
      + 'Etelä-Amerikan rannikko Venezuelasta Kolumbiaan. Syvin kohta on Caymanin hauta, 7 686 '
      + 'metriä merenpinnan alapuolella.',
    lahde: 'en-Wikipedia "Caribbean Sea", johdanto-osa ja osio Extent (tarkistettu 30.8.2026).',
  },
];

