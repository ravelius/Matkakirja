/*
 * MAASTOKOHTEET — ARE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ARE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ARE.json. Työkalu laskee laudan
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
 * Arabiemiraattien maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maan tunnusmaasto on Rub al-Khalin hiekka-aavikko, ja se on mukana aavikkona: tyyppi 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js), kuten SAU:n Rub al-Khalissa ja MNG:n Gobissa. Merkki on Liwan keitaan dyyneillä Abu Dhabin emiraatissa — aavikon ARE-osuudessa, ei SAU:n merkin päällä.
 */
export const MAASTOKOHTEET_ARE = [
  {
    id: 'rubalkhali',
    nimi: 'Rub al-Khali',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Keitä Liwan keitailla asui ennen öljyä?',
      'Kuinka korkeaksi dyyni voi kasvaa?',
    ],
    korostukset: ['Liwa|Liwan'],
    nappi: 'Tyhjän neljänneksen reuna',
    // 53.78 E / 23 N — Liwan keitaan dyynit; en-Wikipedia "Liwa Oasis" keskipiste 23°08′N 53°46′E, merkki keitaan kaaren eteläpuolen hiekalla
    laudat: {
      maailmankartta: { x: 7626, y: 2431.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rub al-Khali, Tyhjä neljännes, on noin 650 000 neliökilometrin hiekka-aavikko '
      + 'Saudi-Arabian, Omanin, Arabiemiraattien ja Jemenin alueella, ja sen dyynit kasvavat '
      + 'jopa 250-metrisiksi. Arabiemiraattien osuus on Abu Dhabin emiraatin etelää, jossa '
      + 'hiekan pohjoisreunaa seuraa Liwan keitaiden satakilometrinen kaari — Abu Dhabin ja '
      + 'Dubain hallitsijasukujen synnyinseutu, jonka Bani Yas -heimo eli taatelitarhoista ja '
      + 'kausittaisesta helmenpyynnistä. Liwan laidalla kohoaa noin 300-metrinen Moreebin '
      + 'dyyni.',
    lahde: 'en-Wikipedia "Rub\' al Khali" ja "Liwa Oasis", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'jebeljais',
    nimi: 'Jebel Jais',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta ei ole huippu?',
      'Mikä Hajarin vuoristo on?',
    ],
    korostukset: ['Hajar|Hajarin'],
    nappi: 'Korkein kohta — mutta ei huippu',
    // 56.1842 E / 25.9531 N — en-Wikipedia "Jebel Jais"
    laudat: {
      maailmankartta: { x: 7706.1, y: 2326.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jebel Jais on Hajarin vuoriston vuori Ras al-Khaimahin emiraatin ja Omanin rajalla. '
      + 'Sen varsinainen huippu, 1 934 metriä, on Omanin puolella — Arabiemiraattien korkein '
      + 'kohta on saman vuoren rinteellä 1 892 metrissä, kohouma jolla on vain kymmenisen '
      + 'metriä omaa korkeutta. Korkein kokonaan maan puolella oleva huippu on viereinen Jabal '
      + 'ar Rahrah, 1 691 metriä.',
    lahde: 'en-Wikipedia "Jebel Jais", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Hormuzinsalmi on?',
      'Miksi lahden rannoilla sukellettiin helmiä?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmen'],
    nappi: 'Matala meri helmien ja öljyn päällä',
    // 53 E / 25.3 N — ulappa Abu Dhabin edustalla; artikkelin oma keskipiste 52 / 26 on lähellä
    laudat: {
      maailmankartta: { x: 7600, y: 2350.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Arabian niemimaan ja Iranin välinen sisämeri, Arabianmeren ja Intian '
      + 'valtameren jatke. Avomerelle siitä pääsee vain idästä, kapean Hormuzinsalmen kautta '
      + 'Omaninlahteen, ja luoteisrannan muodostaa Shatt al-Arabin suisto. Lähes koko '
      + 'Arabiemiraattien rannikko ja kaikki sen suuret kaupungit ovat tämän lahden rannalla.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

