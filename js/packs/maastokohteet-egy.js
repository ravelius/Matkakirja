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
/*
 * MAAILMAN ERÄ M9 (6.9.2026) lisäsi listaan neljä KOHDETTA — Abu
 * Simbel, Abydos, Philae ja Wadi al-Hitan. Lähin uusi merkki on Abydos
 * 29,6 lautayksikön päässä Luxorista (KAUPUNGIN_KOHDALLA_SADE 7),
 * joten kaikki ovat pääkartan merkkejä. Kairon, Luxorin ja Siinain
 * kohdalle ei tehty mitään: Saqqara ja Dahshur ovat 6–9 yksikön päässä
 * Kairo-laatasta, Karnak on jo maan fokuskohde
 * (js/packs/fokuskohteet-egy.js) ja Pyhän Katariinan luostari on
 * käytännössä Siinai-laatan päällä. Erä on kuvaton, ja jokaisen
 * kohteen lähin pelikaupunki on kirjattu sen koordinaattirivin
 * viereen.
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
  /* ================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 6.9.2026 — NELJÄ KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Egyptillä
   * oli kolme maastokohdetta, neljä kohdetta
   * (js/packs/fokuskohteet-egy.js) ja kolme historian hetkeä. Kaikki
   * neljä uutta ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Abydos 29,6 lautayksikön päässä Luxorista (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026.
   * ============================================================== */
  {
    id: 'abusimbel',
    nimi: 'Abu Simbel',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti Abu Simbelin temppelit?',
      'Miksi temppelit siirrettiin 1968?',
    ],
    korostukset: ['kalliotemppeli|kalliotemppeliä'],
    nappi: 'Vuori, joka siirrettiin',
    // 31.6256 E / 22.3372 N — en-Wikipedia "Abu Simbel"
    // Lähin pelikaupunki: Luxor 123,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6887.5, y: 2454.5 },
    },
    teksti: 'Abu Simbel on kaksi valtavaa kalliotemppeliä Ylä-Egyptissä lähellä Sudanin rajaa, '
      + 'Nasserjärven länsirannalla. Ne hakattiin vuoren kylkeen 1200-luvulla eaa. faarao '
      + 'Ramses II:n aikana, ja hänen jättimäisistä kalliokuvistaan on tullut Egyptin tunnuksia; '
      + 'jalkojen juuressa näkyvät pienempinä puoliso Nefertari ja lapset. Suuri temppeli on '
      + 'omistettu Ramsekselle itselleen ja pieni temppeli Nefertarille, ja veistokset '
      + 'muistavat Kadeshin taistelua. Ramses rakensi Nubiaan useita temppeleitä tehdäkseen '
      + 'vaikutuksen paikallisiin — Nubia oli Egyptille tärkeä kullan ja muiden kalliiden '
      + 'kauppatavaroiden lähde. Vuonna 1968 koko kokonaisuus siirrettiin korkeammalle, jottei '
      + 'Assuanin padon tekojärvi peittäisi sitä: temppelit sijoitettiin keinotekoisen kukkulan '
      + 'sisään puolalaisen arkeologin Kazimierz Michałowskin johdolla osana kansainvälistä '
      + 'Nubian muistomerkkien pelastuskampanjaa.',
    lahde: 'en-Wikipedia "Abu Simbel", johdanto-osa ja osio "Construction" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'abydos',
    nimi: 'Abydos',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on Abydoksen kuningasluettelo?',
      'Miksi Abydokseen haluttiin haudata?',
    ],
    korostukset: ['kuningasluettelo|kuningasluettelo'],
    nappi: 'Ensimmäisten faaraoiden hautakaupunki',
    // 31.9194 E / 26.1847 N — en-Wikipedia "Abydos, Egypt"
    // Lähin pelikaupunki: Luxor 29,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6897.3, y: 2318.5 },
    },
    teksti: 'Abydos oli yksi muinaisen Egyptin vanhimmista kaupungeista, noin yhdentoista '
      + 'kilometrin päässä Niilistä länteen. Se on maan tärkeimpiä kaivauspaikkoja: pyhässä '
      + 'kaupungissa oli useita temppeleitä ja Umm el-Qaabin kuninkaallinen hautausmaa, johon '
      + 'varhaisimmat faaraot haudattiin. Näitä hautoja alettiin myöhemmin pitää niin '
      + 'merkittävinä, että alueelle haudatuksi tuleminen muuttui tavoiteltavaksi — ja niin '
      + 'kaupungin merkitys kulttipaikkana kasvoi. Nykyään Abydos tunnetaan Seti I:n '
      + 'muistotemppelistä, jonka seinässä on 19. dynastian piirtokirjoitus: Abydoksen '
      + 'kuningasluettelo, joka esittää aikajärjestyksessä useimpien faaraoiden kartussit '
      + 'Menesistä Ramses I:een. Temppelin seinillä on myös foinikialaisia ja aramealaisia '
      + 'töhryjä, niin sanotut Abydoksen graffitit.',
    lahde: 'en-Wikipedia "Abydos, Egypt", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'philae',
    nimi: 'Philae',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä uhkasi Philaen temppeleitä?',
      'Minne saaren rakennukset siirrettiin?',
    ],
    korostukset: ['Agilkia|Agilkian'],
    nappi: 'Niilin helmi, joka muutti saarta',
    // 32.8844 E / 24.0131 N — en-Wikipedia "Philae temple complex"
    // Lähin pelikaupunki: Luxor 60,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6929.5, y: 2395.6 },
    },
    teksti: 'Philaen temppelialue on saarelle rakennettu kokonaisuus Assuanin matalan padon '
      + 'tekoaltaassa. Alun perin se oli Philaen saarella Niilin ensimmäisen kataraktin luona '
      + 'Ylä-Egyptissä, mutta koskialue on ollut toistuvasti veden alla siitä lähtien, kun '
      + 'matala pato rakennettiin 1902. Kun uusi Assuanin pato rakennettiin 1960–1970, temppeli '
      + 'olisi jäänyt kokonaan veden alle, eikä sitä aluksi otettu mukaan Nubian '
      + 'pelastushankkeeseen. Kokonaisuuden maine — sitä oli kutsuttu Niilin helmeksi, ja '
      + 'Pierre Loti oli kirjoittanut siitä teoksen La Mort de Philae vuonna 1909 — sai '
      + 'Unescon jäsenmaat kuitenkin liikkeelle, ja järjestettiin kansainvälinen kilpailu '
      + 'pelastustavasta. Voittanut egyptiläinen ehdotus purki saaren 95 rakennelmaa ja '
      + 'kokosi ne uudelleen 12,40 metriä korkeammalle viereiselle Agilkian luodolle, joka '
      + 'tasattiin sitä varten; työ kesti vuodesta 1977 vuoteen 1980.',
    lahde: 'en-Wikipedia "Philae temple complex", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'wadialhitan',
    nimi: 'Wadi al-Hitan',
    tyyppi: 'muu',
    symboli: 'luonto',
    kysymykset: [
      'Mitä valaan fossiileissa on jäljellä maaeläimestä?',
      'Kuinka pitkä on suurin löydetty luuranko?',
    ],
    korostukset: ['arkeoseetti|arkeoseettejä'],
    nappi: 'Valaiden laakso keskellä aavikkoa',
    // 30.0417 E / 29.2694 N — en-Wikipedia "Wadi al-Hitan"
    // Lähin pelikaupunki: Kairo 47,6 lautayksikköä. Fossiililaakso ei
    // ole vuori eikä joki: tyyppi 'muu' + symboli 'luonto'.
    laudat: {
      maailmankartta: { x: 6834.7, y: 2207.5 },
    },
    teksti: 'Wadi al-Hitan eli Valaiden laakso on paleontologinen kohde Faiyumin '
      + 'maakunnassa noin 150 kilometriä Kairosta lounaaseen. Se otettiin Unescon '
      + 'maailmanperintöluetteloon heinäkuussa 2005 satojen fossiilien takia: ne ovat '
      + 'arkeoseettejä, valaiden varhaisia ja nyt sukupuuttoon kuolleita muotoja, ja ne '
      + 'valaisevat yhtä evoluution suurista arvoituksista — miten maalla elänyt eläin muuttui '
      + 'valtameren nisäkkääksi. Luurangoissa on jo nykyvalaan virtaviivainen ruumis, mutta '
      + 'kallo ja hampaat ovat vanhakantaiset, ja niissä on odottamatta myös takajalat, jalkaterät '
      + 'ja varpaat, joita ei tunnettu yhdestäkään arkeoseetistä aiemmin. Suurin luuranko yltää '
      + '21 metriin ja etuevissä on hyvin kehittyneet viisisormiset räpylät. Ensimmäiset '
      + 'valaanluurangot löydettiin talvella 1902–1903, mutta paikka jäi kahdeksaksi '
      + 'vuosikymmeneksi vähälle huomiolle, koska sinne oli vaikea päästä.',
    lahde: 'en-Wikipedia "Wadi al-Hitan", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
];

