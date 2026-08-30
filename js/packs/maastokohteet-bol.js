/*
 * MAASTOKOHTEET — BOL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs BOL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/BOL.json. Työkalu laskee laudan
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
 * Bolivian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Salar de Uyuni sellaisenaan, järven fi-artikkeli on Titicaca ja suomalaisessa tekstissä vakiintunut asu Titicacajärvi (vrt. Victorianjärvi).
 */
export const MAASTOKOHTEET_BOL = [
  {
    id: 'nevadosajama',
    nimi: 'Nevado Sajama',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten puu kasvaa viiden kilometrin korkeudessa?',
      'Miksi tulivuoren sammumisajasta ei olla varmoja?',
    ],
    nappi: 'Bolivian korkein huippu',
    // -68.8831 E / -18.1081 N — en-Wikipedia "Nevado Sajama", tietolaatikko (18°06′29″S 68°52′59″W)
    laudat: {
      maailmankartta: { x: 3537.2, y: 3821.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Nevado Sajama on sammunut tulivuori ja Bolivian korkein huippu, 6 542 metriä. Se '
      + 'kohoaa Oruron departementissa Sajaman kansallispuistossa, ja rakenteeltaan se on '
      + 'kerrostulivuori useiden laavakupolien päällä. Milloin se viimeksi purkautui, ei ole '
      + 'selvillä: arvio osuu jonnekin pleistoseeni- tai holoseenikauteen. Huippua peittää '
      + 'jäähattu. Rinteillä kasvaa Polylepis tarapacana -puita vielä 5 000 metrin korkeudessa, '
      + 'mikä tekee niistä maailman korkeimmalla kasvavia metsiä. Aymaran kielellä vuori on '
      + 'Chak Xaña.',
    lahde: 'en-Wikipedia "Nevado Sajama", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'titicacajarvi',
    nimi: 'Titicacajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miten laiva on saatu neljän kilometrin korkeuteen?',
      'Miksi järven vesi on hieman suolaista?',
    ],
    korostukset: ['Andit|Andien'],
    nappi: 'Maailman korkein purjehduskelpoinen järvi',
    // -68.95 E / -16.1 N — järven Bolivian-puoleinen osa; en-Wikipedia "Lake Titicaca" antaa keskipisteeksi -69,325 / -15,825
    laudat: {
      maailmankartta: { x: 3535, y: 3752.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Titicacajärvi makaa Andien ylängöllä Bolivian ja Perun rajalla 3 812 metrin '
      + 'korkeudessa, ja sitä sanotaan usein maailman korkeimmaksi purjehduskelpoiseksi '
      + 'järveksi. Se on Etelä-Amerikan suurin järvi sekä pinta-alaltaan että vesimäärältään: 8 '
      + '372 neliökilometriä, 896 kuutiokilometriä vettä ja syvimmillään 281 metriä. Maailman '
      + 'järvistä se on kahdeksastoista. Järveä sanotaan makeanvesijärveksi, vaikka vesi on '
      + 'lievästi murtovettä. Siihen laskee 27 jokea, mutta pois vettä vie vain haihtuminen ja '
      + 'yksi ainoa laskujoki, Desaguadero.',
    lahde: 'en-Wikipedia "Lake Titicaca", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'salardeuyuni',
    nimi: 'Salar de Uyuni',
    // Suolatasanko ei ole vuori, meri eikä joki: tyyppi 'muu' + symboli
    // 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) —
    // kortin ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi satelliitit tähtäävät suolatasankoon?',
      'Mihin litiumia tarvitaan?',
    ],
    nappi: 'Maailman suurin suolatasanko',
    // -67.4891 E / -20.1338 N — en-Wikipedia "Salar de Uyuni" (-67,489 / -20,134)
    laudat: {
      maailmankartta: { x: 3583.7, y: 3891.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Salar de Uyuni on maailman suurin suolatasanko, noin 10 582 neliökilometriä, ja se '
      + 'levittäytyy Bolivian altiplanolle 3 656 metrin korkeuteen. Sen paikalla oli '
      + 'myöhäisellä pleistoseenikaudella seitsemän järven sarja; kun ne kuivuivat, pohjalle '
      + 'jäi kahdeksan metriä paksu suolakuori. Tasanko on poikkeuksellisen tasainen: '
      + 'korkeusero koko alueella on alle metrin, ja siksi sitä käytetään satelliittien '
      + 'korkeusmittarien kalibrointiin. Suolan alla on litiumpitoista suolaliuosta. Sateen '
      + 'jälkeen ohut vesikerros muuttaa tasangon 129 kilometriä leveäksi peiliksi.',
    lahde: 'en-Wikipedia "Salar de Uyuni", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

