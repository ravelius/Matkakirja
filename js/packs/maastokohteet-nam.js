/*
 * MAASTOKOHTEET — NAM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NAM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NAM.json. Työkalu laskee laudan
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
 * Namibian maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_NAM = [
  {
    id: 'brandberg',
    nimi: 'Brandberg',
    tyyppi: 'vuori',
    kysymykset: [
      'Mistä Brandberg sai palavan nimensä?',
      'Miten 2 573 metrin Königstein-huipulle noustaan?',
    ],
    korostukset: ['Königstein|Königsteinin'],
    nappi: 'Namibian korkein vuori',
    // 14.5487 E / -21.1258 N — en-Wikipedia "Brandberg Mountain"
    laudat: {
      maailmankartta: { x: 6318.3, y: 3926.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Brandberg on Namibian korkein vuori: sen laella Namibin aavikon luoteisosassa kohoaa '
      + 'Königstein, 2 573 metriä merenpinnasta. Noin 650 neliökilometrin massiivi nousee '
      + 'suoraan tasaisilta soratasangoilta, joten se näkyy kirkkaalla säällä valtavan kauas, '
      + 'ja sen ydinalue julistettiin kansallismuistomerkiksi jo vuonna 1951. Nimi on '
      + 'afrikaansia, hollantia ja saksaa ja tarkoittaa palavaa vuorta.',
    lahde: 'en-Wikipedia "Brandberg Mountain", johdanto ja osat Location ja Origin of name '
      + '(tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuren osan maapallosta Atlantti peittää?',
      'Miksi Namibian rannikolla aavikko ulottuu mereen asti?',
    ],
    nappi: 'Valtameri aavikon reunalla',
    // 13.4 E / -23 N — ulappa Walvis Bayn edustalla; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 6280, y: 3991.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri: noin 85 miljoonaa neliökilometriä eli '
      + 'noin 17 prosenttia koko maapallon pinnasta. Namibian koko länsiraja on tämän '
      + 'valtameren rantaa, ja Namibin aavikko ulottuu paikoin suoraan rantaviivaan saakka. '
      + 'Löytöretkien aikakaudella Atlantti tunnettiin merenä, joka erotti vanhan ja uuden '
      + 'maailman toisistaan.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa; aavikon ja rannikon suhde artikkelista '
      + '"Brandberg Mountain" (tarkistettu 30.8.2026).',
  },
  {
    id: 'oranjejoki',
    nimi: 'Oranjejoki',
    tyyppi: 'joki',
    kysymykset: [
      'Missä vuoristossa Oranje saa alkunsa?',
      'Miksi joki on kahden valtion välinen raja?',
    ],
    nappi: 'Eteläisen Afrikan suuri rajajoki',
    // 16.4522 E / -28.6328 N — en-Wikipedia "Orange River" — koordinaatti on joen suulla Oranjemundin kohdalla
    laudat: {
      maailmankartta: { x: 6381.7, y: 4192.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Oranjejoki on Etelä-Afrikan pisin joki: 2 432 kilometriä Lesothon Drakensbergin '
      + 'vuorilta länteen Atlanttiin. Sen alajuoksu muodostaa Namibian ja Etelä-Afrikan välisen '
      + 'rajan, ja merkki onkin joen suulla, jossa aavikkojen halki kulkenut virta viimein '
      + 'kohtaa valtameren.',
    lahde: 'en-Wikipedia "Orange River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

