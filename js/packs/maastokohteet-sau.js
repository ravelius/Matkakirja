/*
 * MAASTOKOHTEET — SAU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SAU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SAU.json. Työkalu laskee laudan
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
 * Saudi-Arabian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Rub al-Khali on maan tunnusmaasto ja mukana aavikkona: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js).
 *
 * MAAILMAN ERÄ M9 (6.9.2026) lisäsi listaan seitsemän KOHDETTA — Hegra,
 * Al-Ahsan keidas, Jubbahin kalliotaide, Al-Ukhdud, Rijal Almaa, Qaryat
 * al-Faw ja Vanha Jedda — sekä yhden MAASTOKOHTEEN (Farasansaaret,
 * tyyppi 'saari'). Lähin uusi merkki on Vanha Jedda 20,5 lautayksikön
 * päässä Mekasta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat
 * pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen. Pois jäivät
 * kaupunkisäännön takia Diriyahin At-Turaif (5 yksikköä Riadista) ja
 * nimiölimityksen takia Al-Ulan vanhakaupunki (Hegran vieressä);
 * Tayman kohde jätettiin tekemättä, koska erän skandaali "Tayman kivi"
 * vie sen paikan kartalla.
 */
export const MAASTOKOHTEET_SAU = [
  {
    id: 'jabalsawda',
    nimi: 'Jabal Sawda',
    tyyppi: 'vuori',
    kysymykset: [
      'Kumpi on korkeampi, Jabal Sawda vai Jabal Ferwa?',
      'Mikä on Soudah Peaks -hanke?',
    ],
    korostukset: ['as-Sūda|as-Sūdan'],
    nappi: 'Kiistelty korkein kohta',
    // 42.3683 E / 18.2667 N — en-Wikipedia "Jabal Sawda"
    laudat: {
      maailmankartta: { x: 7245.6, y: 2595.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Saudi-Arabian korkeimmalle huipulle pääsee köysiradalla — ja juuri siksi sen '
      + 'korkeudella on väliä. Viranomaiset kirjaavat Jabal Sawdan maan korkeimmaksi kohdaksi, '
      + '3 015 metriä, mutta vuoden 2018 mittaus antoi 2 999 metriä, jolloin naapuri Jabal '
      + 'Ferwa kolmella metrillä ohittaisi sen. Virallinen luku on silti se, jonka mukaan '
      + 'hanketta myydään: kruununprinssi ilmoitti syyskuussa 2023 Soudah Peaks -hankkeesta, '
      + 'ylellisestä vuoristomatkailukohteesta juuri 3 015 metrin korkeudessa, jonka on määrä '
      + 'tuoda kaksi miljoonaa matkailijaa vuoteen 2033 mennessä. Vuoren juurella on as-Sūdan '
      + 'kylä, josta köysirata nousee.',
    lahde: 'en-Wikipedia "Jabal as-Sūda", johdanto-osa ja osio "Soudah Peaks" (tarkistettu '
      + '1.9.2026).',
  },
  {
    id: 'rubalkhali',
    nimi: 'Rub al-Khali',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi aavikon nimi on Tyhjä neljännes?',
      'Voiko aavikon poikki matkustaa?',
    ],
    korostukset: ['Tyhjä neljännes'],
    nappi: 'Tyhjä neljännes',
    // 50 E / 20 N — en-Wikipedia "Rub' al Khali"
    laudat: {
      maailmankartta: { x: 7500, y: 2536 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rub al-Khali, arabiaksi Tyhjä neljännes, peittää suurimman osan Arabian niemimaan '
      + 'eteläisestä kolmanneksesta. Hiekkaa on noin 650 000 neliökilometrin alalla — '
      + 'Saudi-Arabian lisäksi Omanin, Arabiemiirikuntien ja Jemenin puolella. Se on osa '
      + 'laajempaa Arabian aavikkoa ja yksi maailman suurimmista yhtenäisistä '
      + 'hiekka-aavikoista.',
    lahde: 'en-Wikipedia "Rub\' al Khali", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'punainenmeri',
    nimi: 'Punainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Punainenmeri levenee vuosi vuodelta?',
      'Miten Suezin kanava muutti merenkulun?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Meri kahden mantereen raossa',
    // 38.3 E / 21.2 N — ulappa Jiddan edustalla; artikkelin oma keskipiste on 38 / 22
    laudat: {
      maailmankartta: { x: 7110, y: 2494.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Punainenmeri on pitkä ja kapea meri Arabian niemimaan ja Afrikan välissä: 2 250 '
      + 'kilometriä pitkä mutta leveimmilläänkin vain 355 kilometriä. Etelässä se yhtyy '
      + 'valtamereen Bab-el-Mandebin salmen kautta, pohjoisessa Suezin kanava vie Välimerelle. '
      + 'Meren alla kulkee Punaisenmeren hautavajoama, osa Suurta hautavajoamaa — kaksi '
      + 'mannerlaattaa erkanee siinä toisistaan.',
    lahde: 'en-Wikipedia "Red Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 6.9.2026 — SEITSEMÄN KOHDETTA JA YKSI
   * MAASTOKOHDE. Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Saudi-Arabialla oli kaksi maastokohdetta ja yksi kohde
   * (docs/moduulit/karttanostot-kattavuus.md, Lähi-itä). Kaikki
   * kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Vanha Jedda 20,5 lautayksikön päässä Mekasta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'hegra',
    nimi: 'Hegra',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Hegra säilyi niin hyvin?',
      'Kuka rakensi kalliohaudat?',
    ],
    korostukset: ['nabatealaiset|nabatealaisten'],
    nappi: 'Petran eteläinen sisarkaupunki',
    // 37.9525 E / 26.7867 N — en-Wikipedia "Hegra"
    // Lähin pelikaupunki: Medina 98,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7098.4, y: 2297 },
    },
    teksti: 'Hegra eli Mada\'in Salih on kalliokaupunki Saudi-Arabian luoteisosassa, Al-Ulan '
      + 'seudulla. Suurin osa jäänteistä on nabatealaisten ajalta: kaupunki oli valtakunnan '
      + 'eteläisin ja pääkaupunki Petran jälkeen sen toiseksi suurin. Hiekkakiviharjuihin on '
      + 'veistetty 131 koristeltua kalliohautaa neljälle hautausmaalle runsaan kolmentoista '
      + 'kilometrin matkalle. Kuiva ilmasto, se ettei paikkaa asutettu uudelleen, ja seudun '
      + 'omat uskomukset ovat säilyttäneet raunion poikkeuksellisen hyvin — Koraani kertoo '
      + 'alueella asuneesta thamudilaisten kansasta ja sen rangaistuksesta, mistä paikka sai '
      + 'kirotun maineen. Unesco otti Hegran luetteloonsa 2008 Saudi-Arabian ensimmäisenä '
      + 'maailmanperintökohteena.',
    lahde: 'en-Wikipedia "Hegra", johdanto-osa sekä osiot "Recent developments" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'alahsa',
    nimi: 'Al-Ahsan keidas',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka monta palmua keitaalla kasvaa?',
      'Mistä keitaan vesi tulee?',
    ],
    korostukset: ['artesiaanilähde|artesiaanilähteestä'],
    nappi: 'Maailman suurin keidas',
    // 49.6167 E / 25.4333 N — en-Wikipedia "Al-Ahsa Oasis"
    // Lähin pelikaupunki: Doha 63,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7487.2, y: 2345.3 },
    },
    teksti: 'Al-Ahsa on keidas ja historiallinen maakunta Itä-Saudi-Arabiassa, noin '
      + 'kuudenkymmenen kilometrin päässä Persianlahden rannikosta. Runsaan 85 neliökilometrin '
      + 'alallaan se on maailman suurin keidas: siellä kasvaa yli 2,5 miljoonaa palmua, '
      + 'joukossa taatelipalmuja. Vesi tulee valtavasta pohjavesivarastosta ja nousee pintaan '
      + 'yli 280 artesiaanilähteestä, joten hiekka-aavikon keskellä voi viljellä ympäri vuoden. '
      + 'Nimi on monikko sanasta al-Hisa, joka tarkoittaa hiekkamaata, jonka alla on vettä '
      + 'pidättävä läpäisemätön kerros. Unescon maailmanperintöluetteloon keidas pääsi 2018.',
    lahde: 'en-Wikipedia "Al-Ahsa Oasis", johdanto-osa sekä osiot "Description" ja '
      + '"Etymology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jubbah',
    nimi: 'Jubbahin kalliotaide',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä vanhimmat kalliokuvat esittävät?',
      'Milloin kameli ilmestyi kuviin?',
    ],
    korostukset: ['muinaisjärvi|muinaisjärvi'],
    nappi: 'Kahdeksantuhatta vuotta kalliossa',
    // 40.9667 E / 28.0167 N — en-Wikipedia "Rock Art of Hail Province"
    // Lähin pelikaupunki: Medina 134,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7198.9, y: 2252.8 },
    },
    teksti: 'Jubbahin kylän luona Nafudin aavikolla kohoaa Jabal Umm Sinmanin harju, jonka '
      + 'itärinteet ovat täynnä kalliopiirroksia. Harju nousee 1 264 metriin ja kohoaa lähes '
      + '450 metriä aavikon yläpuolelle; sen juurella oli aikoinaan muinaisjärvi, jopa 20 '
      + 'kilometriä pitkä ja viisi leveä. Kuvat kertovat kahdeksantuhannen vuoden ajan '
      + 'sopeutumista ilmaston muutoksiin: vanhimmissa on villivuohia, karjan ja hevosen '
      + 'kesyttämisen jälkeen ne ilmestyivät kuviin, ja kun järvet kuivuivat kolmetuhatta '
      + 'vuotta sitten, kalliolle tuli kameli sekä thamudilaista ja arabialaista kirjoitusta. '
      + 'Unesco otti Jubbahin ja Al-Shuwaymisin kohteet luetteloonsa 2015 Saudi-Arabian '
      + 'neljäntenä maailmanperintökohteena.',
    lahde: 'en-Wikipedia "Rock Art in the Ha\'il Region", johdanto-osa sekä osiot '
      + '"Inscription criteria" ja "Description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'alukhdud',
    nimi: 'Al-Ukhdud',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Najran oli tärkeä kauppapaikka?',
      'Kuka valloitti Najranin vuonna 24 eaa.?',
    ],
    korostukset: ['suitsuke|suitsukkeen'],
    nappi: 'Karavaaniteiden risteys',
    // 44.1322 E / 17.4922 N — en-Wikipedia "Najran"
    // Lähin pelikaupunki: Sana 73,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7304.4, y: 2622.5 },
    },
    teksti: 'Vanha Najran on nykyään raunioina Al-Ukhdudin kaivauspaikalla nykykaupungin '
      + 'kaakkoispuolella. Se oli hedelmällisen laakson keskellä oleva kaupunki- ja '
      + 'kauppakeskus, joka eli suitsukkeen, kankaan ja nahan kaupasta kahden karavaanitien '
      + 'risteyksessä: toinen kulki Hadramautista Hejaziin ja Välimerelle, toinen koilliseen '
      + 'Mesopotamiaan. Hesekielin kirja mainitsee sen kauppakumppanina nimellä Ra\'mah, ja '
      + 'vuonna 24 eaa. roomalainen maaherra Aelius Gallus valtasi sen retkellään Etelä-Arabiaan; '
      + 'Ptolemaios kutsui sitä 100-luvulla metropoliksi. Vanhaa kaupunkia ympäröi 220 kertaa '
      + '230 metrin neliökivimuuri parvekkeineen, ja kaivauksista on löytynyt lasia, metallia, '
      + 'keramiikkaa ja pronssia — museon tunnetuin esine on pronssinen leijonanpää.',
    lahde: 'en-Wikipedia "Najran", johdanto-osa sekä osiot "Early history" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'rijalalmaa',
    nimi: 'Rijal Almaa',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka maalaa al-Qatt-kuviot?',
      'Miksi kylä rikastui?',
    ],
    korostukset: ['al-Qatt|al-Qatt-taide'],
    nappi: 'Kivitornit Asirin vuorilla',
    // 42.2833 E / 18.1833 N — en-Wikipedia "Rijal Almaa"
    // Lähin pelikaupunki: Sana 115,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7242.8, y: 2598.8 },
    },
    teksti: 'Rijal Almaa on yli 900 vuotta vanha kylä Asirin maakunnassa, viitisenkymmentä '
      + 'kilometriä Abhasta länteen. Sen paikka oli erinomainen: kylän kautta kulkivat Jemenistä '
      + 'ja Levantista Mekkaan ja Medinaan matkaavat, ja siitä tuli seudun kauppakeskus. Kylässä '
      + 'on noin kuusikymmentä monikerroksista taloa kivestä, savesta ja puusta, ja jotkin niistä '
      + 'nousevat kahdeksaan kerrokseen värillisine puuikkunoineen. Sisäseinillä on al-Qatt-taidetta, '
      + 'jossa kylän naiset latovat sopusointuisia kuvioita ja värejä. Keskellä kylää on Al '
      + 'Al-wan -palatsissa toimiva kotiseutumuseo, jossa on yli kaksituhatta esinettä ja '
      + 'asiakirjaa yhdeksässätoista osastossa.',
    lahde: 'en-Wikipedia "Rijal Almaa", johdanto-osa sekä osiot "Description" ja "Museum" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'qaryatalfaw',
    nimi: 'Qaryat al-Faw',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen kuningaskunnan pääkaupunki Qaryat al-Faw oli?',
      'Mitä muita nimiä kaupungilla oli?',
    ],
    korostukset: ['Kinda|Kindan'],
    nappi: 'Punainen kaupunki aavikon reunalla',
    // 45.15 E / 19.8 N — en-Wikipedia "Qaryat al-Faw"
    // Lähin pelikaupunki: Sana 155,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7338.3, y: 2542.9 },
    },
    teksti: 'Qaryat al-Faw oli aikoinaan Kindan kuningaskunnan pääkaupunki ja on nykyään '
      + 'kaivauspaikka Rub al-Khalin luoteisreunalla, kauppatiellä, joka yhdisti niemimaan '
      + 'etelän sen koillisosaan. Kaivauksissa on tullut esiin asuintaloja, toreja, katuja, '
      + 'hautausmaita, temppeleitä ja kaivoja — vesikaivoja oli yli seitsemäntoista. Asukkaat '
      + 'kutsuivat kaupunkia kukoistuksensa aikaan myös Punaiseksi kaupungiksi ja Puutarhojen '
      + 'kaupungiksi, ja sen suojelusjumala oli Kahl. Kaupunki syntyi 300-luvulla eaa., kukoisti '
      + '200-luvulta eaa. 200-luvulle jaa. ja hylättiin pian sen jälkeen, kun kindalaiset '
      + 'siirtyivät noin vuonna 300 Hadramautiin. Unescon maailmanperintökohde siitä tuli '
      + 'heinäkuussa 2024.',
    lahde: 'en-Wikipedia "Qaryat al-Faw", johdanto-osa sekä osiot "Geography", "History" ja '
      + '"Religion" (tarkistettu 6.9.2026).',
  },
  {
    id: 'vanhajedda',
    nimi: 'Vanha Jedda',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä roshan-ikkunat ovat?',
      'Milloin Al-Baladin muurit purettiin?',
    ],
    korostukset: ['roshan|roshan-ikkuna'],
    nappi: 'Mekan portti Punaisellamerellä',
    // 39.19 E / 21.485 N — en-Wikipedia "Al-Balad, Jeddah"
    // Lähin pelikaupunki: Mekka 20,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7139.7, y: 2484.3 },
    },
    teksti: 'Al-Balad tarkoittaa yksinkertaisesti kaupunkia, ja se on Jeddan historiallinen '
      + 'ydin: kaupunginosa perustettiin 600-luvulla ja se oli vuosisatoja koko Jeddan keskusta. '
      + 'Hejazilaiselle talolle on ominaista puinen roshan-ikkuna ja puinen ristikkoparveke '
      + 'mashrabiya. Puolustusmuurit purettiin 1940-luvulla, ja kun öljyvarat rikastuttivat '
      + 'kaupunkia 1970- ja 1980-luvuilla, moni jeddalainen muutti pohjoiseen uusille alueille. '
      + 'Kaupunki alkoi suojella vanhaa keskustaansa 1970-luvulla ja perusti 1991 oman '
      + 'suojeluyhdistyksen; Unescon maailmanperintöluetteloon Al-Balad pääsi 2014.',
    lahde: 'en-Wikipedia "Al-Balad, Jeddah", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'farasansaaret',
    nimi: 'Farasansaaret',
    tyyppi: 'saari',
    kysymykset: [
      'Kuinka moni Farasanin saarista on asuttu?',
      'Mitä roomalaiset tekivät saarilla?',
    ],
    korostukset: ['korallisaari|korallisaaria'],
    nappi: 'Rooman kaukaisin etuvartio',
    // 42.0 E / 16.7 N — en-Wikipedia "Farasan Islands"
    // Lähin pelikaupunki: Sana 86,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7233.3, y: 2649.7 },
    },
    teksti: 'Farasansaaret ovat Punaisenmeren saaristo noin neljänkymmenen kilometrin päässä '
      + 'Jizanin rannikosta. Saaria ja luotoja on lähes kaksisataa, useimmat korallisaaria, ja '
      + 'ne levittäytyvät 1 050 neliökilometrin merialueelle; asuttuja on vain kolme — Suuri '
      + 'Farasan, Sajid ja Qummah. Saaristo on matala, korkein kohta on 70 metriä, ja se koostuu '
      + 'korallikalkkitasangoista, hiekkadyyneistä ja tasangoista. Vuoden 144 latinankielinen '
      + 'piirtokirjoitus Suurelta Farasanilta todistaa roomalaisesta laivasto- ja '
      + 'sotilasläsnäolosta: saaret olivat pitkään Rooman kaukaisin etuvartio, lähes 4 000 '
      + 'kilometrin päässä Roomasta. Unescon biosfäärialue saaristosta tuli 2021.',
    lahde: 'en-Wikipedia "Farasan Islands", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

