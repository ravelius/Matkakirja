/*
 * MAASTOKOHTEET — EGY. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs EGY --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/EGY.json. Työkalu laskee laudan
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
 * Egyptin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Vuoreksi on valittu Siinainvuori (vakiintunut suomennos, ikonisin), ja Egyptin korkein huippu Mount Catherine (2 629 m) mainitaan sen tekstissä — Catherinelle ei ole vakiintunutta suomennosta.
 */
export const MAASTOKOHTEET_EGY = [
  {
    id: 'siinainvuori',
    nimi: 'Siinainvuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi kolme uskontoa pitää tätä vuorta pyhänä?',
      'Mikä on Egyptin korkein huippu?',
    ],
    korostukset: ['Mooses|Mooses'],
    nappi: 'Kymmenen käskyn vuori',
    // 33.9754 E / 28.5394 N — en-Wikipedia "Mount Sinai"
    laudat: {
      maailmankartta: { x: 6965.8, y: 2234 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Siinainvuori eli arabiaksi Jabal Musa, \'Mooseksen vuori\', kohoaa 2 285 metriin Siinain '
      + 'niemimaalla. Se on tunnetuin niistä paikoista, joita on esitetty Raamatun '
      + 'Siinainvuoreksi — vuoreksi, jolla Mooses sai Jumalalta kymmenen käskyä juutalaisuuden, '
      + 'kristinuskon ja islamin pyhien kirjoitusten mukaan. Vuorta ympäröivät joka puolelta '
      + 'korkeammat huiput: aivan vieressä kohoaa Mount Catherine, joka on 2 629 metrillään '
      + 'koko Egyptin korkein.',
    lahde: 'en-Wikipedia "Mount Sinai", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'punainenmeri',
    nimi: 'Punainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Punaisenmeren korallit voivat niin hyvin?',
      'Mikä on Suuri hautavajoama?',
    ],
    korostukset: ['Suezin kanava|Suezin kanavalle'],
    nappi: 'Maailman pohjoisin trooppinen meri',
    // 34.5 E / 26.5 N — ulappa Hurghadan edustalla; en-Wikipedia "Red Sea" antaa keskipisteeksi 38 / 22
    laudat: {
      maailmankartta: { x: 6983.3, y: 2307.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Punainenmeri on Afrikan ja Arabian niemimaan välinen Intian valtameren sisämeri ja '
      + 'maailman pohjoisin trooppinen meri. Sen pohjoispäässä Siinain niemimaan molemmin '
      + 'puolin aukeavat Akabanlahti ja Suezinlahti, joka johtaa Suezin kanavalle. Meri on '
      + 'laajalti matala, ja sen matalikoilla elää yli tuhat selkärangatonta ja parisataa '
      + 'korallilajia; pohjassa kulkee Punaisenmeren hautavajoama, osa Suurta hautavajoamaa.',
    lahde: 'en-Wikipedia "Red Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'niili',
    nimi: 'Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä Niilin vesi oikeastaan tulee?',
      'Miksi joen tulva oli muinaiselle Egyptille siunaus?',
    ],
    nappi: 'Maailman pisin joki',
    // 32.65 E / 25.7 N — Luxorin kohta joen keskijuoksulla Egyptissä; en-Wikipedia "Nile" antaa koordinaatiksi Kairon 31,14 / 30,17
    laudat: {
      maailmankartta: { x: 6921.7, y: 2335.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niili on 7 088 kilometrillään maailman pisin joki, vaikka se kuljettaa paljon vähemmän '
      + 'vettä kuin Amazon tai Kongo. Sen kaksi päähaaraa, Valkoinen ja Sininen Niili, yhtyvät '
      + 'Sudanin Khartumissa, mistä joki jatkaa Nubian aavikon ja Egyptin halki ja laskee '
      + 'Välimereen leveänä suistona Aleksandrian luona. Muinainen Egypti rakentui kokonaan '
      + 'tämän joen varaan: vuotuinen tulva levitti pelloille ravinteikasta lietettä.',
    lahde: 'en-Wikipedia "Nile", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

