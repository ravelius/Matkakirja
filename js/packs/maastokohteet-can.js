/*
 * MAASTOKOHTEET — CAN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CAN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CAN.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on KURATOIDULLA reitillä (tools/fokuskartta/maat.mjs
 * FOKUSMAAT.CAN), joten 3 kohdetta istuu suoraan lehteen poltetun
 * nimen tai hachure-kolmion päälle.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Kanadan maastokohteet. Maa on KURATOIDULLA reitillä: lehden kolme merennimeä (JÄÄMERI, HUDSONINLAHTI, ATLANTTI) ovat tools/fokuskartta/maat.mjs FOKUSMAAT.CAN meret-taulussa, ja lon/lat on otettu SIITÄ taulusta, jotta merkki istuu poltetun nimen päälle täsmälleen kuten Kreikassa. Taulussa EI ole vuoret-riviä, joten lehdellä ei ole yhtään hachure-kolmiota eikä maalle ole poimittu vuorikohdetta — uusia pisteitä taulun ulkopuolelta ei keksitty. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_CAN = [
  {
    id: 'jaameri',
    nimi: 'Jäämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Luoteisväylää etsittiin niin sitkeästi?',
      'Miten merijään sulaminen muuttaa Kanadan pohjoista?',
    ],
    korostukset: ['Luoteisväylä|Luoteisväylä', 'merijää|Merijään'],
    nappi: 'Valtameristä pienin ja matalin',
    // -105 E / 82 N — lehden oma merennimen paikka, maat.mjs FOKUSMAAT.CAN.meret
    laudat: {
      maailmankartta: { x: 2333.3, y: -444.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jäämeri on maailman viidestä valtamerestä pienin ja matalin: pinta-alaa on noin 14 060 '
      + '000 neliökilometriä ja keskisyvyyttä 1 038 metriä. Syvin kohta, Framinsalmen Molloyn '
      + 'hauta, painuu noin 5 550 metriin. Suolapitoisuus on valtamerten alhaisin, koska '
      + 'haihtuminen on vähäistä ja joet tuovat runsaasti makeaa vettä. Merijään ala vaihtelee '
      + 'vuodenaikojen mukaan noin seitsemän miljoonaa neliökilometriä: laajimmillaan jää on '
      + 'huhtikuussa ja pienimmillään syyskuussa. Kanadan pohjoisen saariston läpi kulkee '
      + 'Luoteisväylä, ja meren toisella laidalla Siperian rannikkoa myötäilee Koillisväylä.',
    lahde: 'en-Wikipedia "Arctic Ocean", johdanto-osa ja osio Sea ice (tarkistettu 30.8.2026).',
  },
  {
    id: 'hudsoninlahti',
    nimi: 'Hudsoninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi maankuori kohoaa yhä jääkauden jälkeen?',
      'Mitä Hudson\'s Bay Company oikeastaan teki?',
    ],
    korostukset: ['turkiskauppa|turkiskauppaan', 'mannerjäätikkö|mannerjäätikkö'],
    nappi: 'Sisämeri, joka jäätyy joka talvi',
    // -87.3 E / 60.3 N — lehden oma merennimen paikka, maat.mjs FOKUSMAAT.CAN.meret
    laudat: {
      maailmankartta: { x: 2923.3, y: 910.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hudsoninlahti on Jäämeren reunameri ja Kanadan oma sisämeri: pinta-alaa noin 1 230 000 '
      + 'neliökilometriä, keskisyvyyttä vain noin 100 metriä ja syvimmilläänkin 270 metriä. '
      + 'Lahti on jäässä joulukuun puolivälistä kesäkuun puoliväliin. Henry Hudson purjehti '
      + 'sinne laivallaan Discovery elokuussa 1610, ja vuonna 1670 Englannin kruunu myönsi '
      + 'Hudson\'s Bay Companylle oikeuden turkiskauppaan koko lahden valuma-alueella. Alueella '
      + 'mitataan poikkeuksellisen heikko painovoima: neljännes tai jopa lähes puolet siitä '
      + 'selittyy sillä, että maankuori kohoaa yhä, kun mannerjäätikkö suli sen päältä.',
    lahde: 'en-Wikipedia "Hudson Bay", johdanto-osa sekä osiot History ja Geology (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Mistä Golfvirta saa alkunsa?',
      'Kuinka kauan jäävuori kestää Atlantilla?',
    ],
    korostukset: ['Golfvirta|Golfvirta', 'jäävuori|jäävuoria'],
    nappi: 'Meri, jonka yli väki tuli',
    // -50 E / 45 N — lehden oma merennimen paikka, maat.mjs FOKUSMAAT.CAN.meret
    laudat: {
      maailmankartta: { x: 4166.7, y: 1601.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on valtameristä toiseksi suurin: pinta-alaa noin 85 133 000 neliökilometriä '
      + 'eli noin 17 prosenttia maapallon pinnasta, ja keskisyvyyttä 3 646 metriä. Kanadan '
      + 'itärannikko avautuu sen luoteiskulmaan, ja Newfoundlandin edustalle ajautuu joka vuosi '
      + 'Grönlannin jäätiköistä ja Baffininlahdesta irronneita jäävuoria. Golfvirta lähtee '
      + 'koilliseen Pohjois-Amerikan rannikolta Hatterasniemen kohdalta ja kuljettaa lämmintä '
      + 'vettä Pohjois-Atlantille; ilman sitä Pohjois-Atlantin ja Euroopan lämpötilat '
      + 'romahtaisivat.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa ja osio Circulation, sekä "Baffin Bay", '
      + 'johdanto-osa (tarkistettu 30.8.2026).',
  },
];

