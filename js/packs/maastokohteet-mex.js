/*
 * MAASTOKOHTEET — MEX. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MEX --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MEX.json. Työkalu laskee laudan
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
 * Meksikon maastokohteet. Faktat en-Wikipediasta 30.8.2026; nimiasut Pico de Orizaba, Meksikonlahti ja Karibianmeri ovat fi-Wikipedian artikkelinimiä. Maalla on ennestään js/packs/fokuskohteet-mex.js, jossa on yksi kohde (Templo Mayor) — sitä ei ole koskettu eikä toistettu.
 */
export const MAASTOKOHTEET_MEX = [
  {
    id: 'picodeorizaba',
    nimi: 'Pico de Orizaba',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi trooppisella vuorella on jäätiköitä?',
      'Milloin Orizaba voi purkautua seuraavan kerran?',
    ],
    korostukset: ['nahuatl|Nahuatliksi', 'kerrostulivuori|Kerrostulivuori'],
    nappi: 'Tähtivuori, Meksikon korkein',
    // -97.2683 E / 19.03 N — en-Wikipedia "Pico de Orizaba", infolaatikko 19°01′48″N 97°16′06″W
    laudat: {
      maailmankartta: { x: 2591.1, y: 2569.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pico de Orizaba on Meksikon korkein vuori ja koko Pohjois-Amerikan korkein tulivuori, '
      + '5 636 metriä. Nahuatliksi se on Citlaltépetl, tähtivuori: citlalin tarkoittaa tähteä '
      + 'ja tepetl vuorta. Kerrostulivuori kohoaa Veracruzin ja Pueblan rajalla, ja sen '
      + 'suhteellinen korkeus 4 922 metriä on maailman seitsemänneksi suurin — tulivuorista '
      + 'vain Kilimanjaro erottuu ympäristöstään jyrkemmin. Huipulla on yhdeksän jäätikköä, '
      + 'joista Gran Glaciar Norte on Meksikon suurin. Viimeisin purkaus oli vuonna 1846; vuori '
      + 'on uinuva mutta yhä aktiivinen.',
    lahde: 'en-Wikipedia "Pico de Orizaba", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'meksikonlahti',
    nimi: 'Meksikonlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Golfvirta saa alkunsa juuri täältä?',
      'Miksi hurrikaanit voimistuvat Meksikonlahdella?',
    ],
    korostukset: ['Golfvirta|Golfvirta'],
    nappi: 'Lahti, josta Golfvirta lähtee',
    // -93.5 E / 24.5 N — ulappa Veracruzin ja Tamaulipasin edustalla; en-Wikipedia "Gulf of Mexico" antaa altaan keskipisteeksi -90 / 25
    laudat: {
      maailmankartta: { x: 2716.7, y: 2378.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Meksikonlahti on noin 1 550 000 neliökilometrin merialue, jota reunustavat Meksiko, '
      + 'Yhdysvallat ja Kuuba. Syvin kohta on Sigsbeen syvänne, 3 750–4 384 metriä. Allas '
      + 'syntyi noin 300 miljoonaa vuotta sitten laattojen liikkeen tuloksena. Vesi virtaa '
      + 'lahteen Karibianmereltä Yucatáninsalmen kautta Yucatánin virtana ja poistuu '
      + 'Floridansalmesta Floridan virtana, josta tulee Golfvirta. Meksikonlahti on siis se '
      + 'allas, jossa Atlantin tärkein lämmin merivirta ottaa vauhtinsa.',
    lahde: 'en-Wikipedia "Gulf of Mexico", johdanto-osa ja osiot Geology ja Water circulation '
      + '(tarkistettu 30.8.2026).',
  },
  {
    id: 'karibianmeri',
    nimi: 'Karibianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miten valliriutta oikeastaan syntyy?',
      'Miksi Karibianmeri on niin lämmin?',
    ],
    korostukset: ['valliriutta|valliriutta'],
    nappi: 'Yucatánin edustan riuttameri',
    // -86.75 E / 20.4 N — ulappa Yucatánin niemimaan itärannikolla Cozumelin tienoilla; en-Wikipedia "Caribbean Sea" antaa meren keskipisteeksi -75 / 15
    laudat: {
      maailmankartta: { x: 2941.7, y: 2522.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Karibianmeri levittäytyy Yucatánin niemimaan itäpuolelta Etelä-Amerikan rannikolle: '
      + 'pinta-alaa noin 2 754 000 neliökilometriä. Pohjoisessa sitä rajaavat Suuret Antillit '
      + 'Kuubasta Puerto Ricoon, idässä Pienet Antillit Neitsytsaarilta Trinidadiin. Syvin '
      + 'kohta on Caymanin hauta, 7 686 metriä merenpinnan alapuolella. Yucatánin itärannikkoa '
      + 'myötäilee Mesoamerikan riutta, joka jatkuu tuhat kilometriä Meksikon, Belizen, '
      + 'Guatemalan ja Hondurasin edustalla ja on maailman toiseksi pisin valliriutta.',
    lahde: 'en-Wikipedia "Caribbean Sea", johdanto-osa ja osio Extent (tarkistettu 30.8.2026).',
  },
];

