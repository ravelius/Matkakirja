/*
 * MAASTOKOHTEET — RUS. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs RUS --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/RUS.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on KURATOIDULLA reitillä (tools/fokuskartta/maat.mjs
 * FOKUSMAAT.RUS), joten 4 kohdetta istuu suoraan lehteen poltetun
 * nimen tai hachure-kolmion päälle.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Venäjän maastokohteet. Faktat en-Wikipediasta 29.8.2026. Venäjällä on KURATOITU fokuslehti (tools/fokuskartta/maat.mjs FOKUSMAAT.RUS), jonka meret ovat JÄÄMERI, BARENTSINMERI, OHOTANMERI ja BERINGINMERI — Barentsinmeren merkki istuu siis lehteen poltetun nimen päälle. Vuoria lehdellä ei ole yhtään. Suurin osa maasta on Euroopan laudan kaavan (lon -11...41) itäpuolella, joten useimmat kohteet saavat vain maailmankartan rivin.
 */
export const MAASTOKOHTEET_RUS = [
  {
    id: 'elbrus',
    nimi: 'Elbrus',
    tyyppi: 'vuori',
    kysymykset: [
      'Onko Elbrus Euroopassa vai Aasiassa?',
      'Milloin Elbrus viimeksi purkautui?',
    ],
    korostukset: ['Kaukasus|Kaukasuksen'],
    nappi: 'Euroopan korkein vuori',
    // 42.4392 E / 43.355 N — en-Wikipedia "Mount Elbrus"
    laudat: {
      maailmankartta: { x: 7248, y: 1669 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Elbrus on Venäjän ja Euroopan korkein vuori. Se on sammunut kerrostulivuori, joka '
      + 'kohoaa 5 642 metriin, ja samalla Euraasian korkein tulivuori sekä maailman '
      + 'kymmenenneksi hallitsevin huippu. Se sijaitsee Kabardi-Balkarian tasavallassa '
      + 'Etelä-Venäjällä ja on Kaukasuksen vuoriston korkein huippu.',
    lahde: 'en-Wikipedia "Mount Elbrus", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'narodnaja',
    nimi: 'Narodnaja',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Uralia pidetään maanosien rajana?',
      'Mistä vuoren nimi tulee?',
    ],
    korostukset: ['Ural|Uralin'],
    nappi: 'Uralin korkein huippu',
    // 60.1167 E / 65.0333 N — en-Wikipedia "Mount Narodnaya"
    laudat: {
      maailmankartta: { x: 7837.2, y: 664.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Narodnaja on Uralin korkein huippu, 1 894 metriä. Se on Hanti-Mansian autonomisen '
      + 'piirikunnan ja Komin tasavallan rajalla, ja korkein kohta on puoli kilometriä rajasta '
      + 'itään Tutkimusharjanteella. Nimi saattaa viitata Naroda-jokeen, joka saa alkunsa '
      + 'vuorelta.',
    lahde: 'en-Wikipedia "Mount Narodnaya", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'barentsinmeri',
    nimi: 'Barentsinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Willem Barentsz oli?',
      'Miksi Murmansk ei jäädy talvella?',
    ],
    korostukset: ['Willem Barentsz|Willem Barentszilta'],
    nappi: 'Meri, joka on nimetty hollantilaiselta',
    // 38 E / 74.5 N — en-Wikipedia "Barents Sea" — sama piste kuin lehteen poltettu nimi BARENTSINMERI
    laudat: {
      maailmankartta: { x: 7100, y: 100.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Barentsinmeri on Jäämeren reunameri Norjan ja Venäjän pohjoisrannikoilla, ja se on '
      + 'jaettu Norjan ja Venäjän aluevesiksi. Venäläiset tunsivat sen aiemmin '
      + 'Murmanskinmerenä. Nykyinen nimi tulee hollantilaiselta merenkulkijalta Willem '
      + 'Barentszilta. Venäjän puoleisella rannalla se on maan ainoa pohjoinen meri, jonka '
      + 'satamia lämmin merivirta pitää auki läpi talven.',
    lahde: 'en-Wikipedia "Barents Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jaameri',
    nimi: 'Jäämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka paksua Jäämeren jää on?',
      'Miksi jotkut kutsuvat sitä Atlantin suistoksi?',
    ],
    korostukset: ['Beringinsalmi|Beringinsalmi'],
    nappi: 'Valtameristä pienin ja matalin',
    // 120 E / 81 N — lehteen poltetun nimen JÄÄMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 9833.3, y: -365.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jäämeri on maailman viidestä valtamerestä pienin, matalin ja kylmin: pinta-alaa noin '
      + '14 060 000 neliökilometriä. Se ulottuu pohjoisnavan ympäriltä etelään noin 60. '
      + 'leveyspiirille ja sitä ympäröivät Euraasia ja Pohjois-Amerikka; rajat kulkevat '
      + 'maastonmuotoja pitkin, Tyynenmeren puolella Beringinsalmi ja Atlantin puolella '
      + 'Grönlanti–Skotlanti-harjanne. Suurimman osan vuodesta se on merijään peitossa. Osa '
      + 'tutkijoista kutsuu sitä Pohjoiseksi napamereksi tai jopa Atlantin suistoksi.',
    lahde: 'en-Wikipedia "Arctic Ocean", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ohotanmeri',
    nimi: 'Ohotanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä ovat Kuriilit?',
      'Miksi Sahalin on niin pitkä ja kapea?',
    ],
    korostukset: ['Kamtšatka|Kamtšatkan'],
    nappi: 'Meri, joka on nimetty satamalta',
    // 150 E / 54.3 N — lehteen poltetun nimen OHOTANMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 10833.3, y: 1198.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ohotanmeri on Luoteis-Tyynenmeren reunameri. Sitä rajaavat idässä Venäjän Kamtšatkan '
      + 'niemimaa, kaakossa Kuriilit, etelässä Japanin Hokkaido, lännessä Sahalinin saari sekä '
      + 'lännessä ja pohjoisessa Itä-Siperian rannikko. Koillisnurkassa on Šelihovinlahti. Meri '
      + 'on saanut nimensä Ohotskin satamasta, joka puolestaan on nimetty Ohota-joen mukaan.',
    lahde: 'en-Wikipedia "Sea of Okhotsk", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'beringinmeri',
    nimi: 'Beringinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Vitus Bering oli?',
      'Kuinka kapea Beringinsalmi on?',
    ],
    korostukset: ['Vitus Bering|Vitus Beringin'],
    nappi: 'Kahden mantereen raja',
    // 180 E / 58.5 N — lehteen poltetun nimen BERINGINMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 11833.3, y: 999.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Beringinmeri on Pohjois-Tyynenmeren reunameri, ja yhdessä Beringinsalmen kanssa se '
      + 'muodostaa rajan maailman kahden suurimman mantereen, Euraasian ja Amerikan, välille. '
      + 'Sen pinta-ala on yli 2 000 000 neliökilometriä: idässä ja koillisessa on Alaska, '
      + 'lännessä Venäjän Kaukoitä ja Kamtšatka. Nimi tulee Tanskassa syntyneeltä venäläiseltä '
      + 'merenkulkijalta Vitus Beringiltä, joka vuonna 1728 purjehti ensimmäisenä '
      + 'eurooppalaisena sen halki Tyyneltämereltä pohjoiseen Jäämerelle.',
    lahde: 'en-Wikipedia "Bering Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'volga',
    nimi: 'Volga',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Volga ei laske mereen vaan järveen?',
      'Mikä Rusin kaganaatti oli?',
    ],
    korostukset: ['Kaspianmeri|Kaspianmereen'],
    nappi: 'Euroopan pisin joki',
    // 47.8975 E / 45.695 N — en-Wikipedia "Volga" — joen suisto Kaspianmerellä
    laudat: {
      maailmankartta: { x: 7429.9, y: 1573 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Volga on Euroopan pisin joki ja maailman pisin sisävaluma-alueen joki: 3 531 '
      + 'kilometriä ja valuma-alue 1 360 000 neliökilometriä. Se virtaa Keski-Venäjältä '
      + 'Etelä-Venäjälle ja laskee Kaspianmereen, ei valtamereen. Sitä pidetään yleisesti '
      + 'Venäjän kansallisjokena, ja sen varrelle syntyi noin vuonna 830 varhainen '
      + 'valtiomuodostelma Rusin kaganaatti.',
    lahde: 'en-Wikipedia "Volga", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ob',
    nimi: 'Ob',
    tyyppi: 'joki',
    kysymykset: [
      'Mitkä ovat Siperian kolme suurta jokea?',
      'Miksi Siperian joet virtaavat pohjoiseen?',
    ],
    korostukset: ['Altai|Altain'],
    nappi: 'Kolmesta Siperian suuresta läntisin',
    // 71.3947 E / 66.5339 N — en-Wikipedia "Ob (river)" — joen suu Obinlahdella
    laudat: {
      maailmankartta: { x: 8213.2, y: 582 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ob on Länsi-Siperian suuri joki, ja yhdessä sivujokensa Irtyšin kanssa se muodostaa '
      + 'maailman seitsemänneksi pisimmän jokijärjestelmän: 5 410 kilometriä. Joki syntyy Bijan '
      + 'ja Katunin yhtymäkohdassa, ja molemmat saavat alkunsa Altain vuorilta. Se on läntisin '
      + 'kolmesta suuresta Siperian joesta, jotka laskevat Jäämereen.',
    lahde: 'en-Wikipedia "Ob (river)", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

