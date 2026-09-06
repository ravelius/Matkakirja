/*
 * MAASTOKOHTEET — PER. Perun maasto ja kahdeksan kohdetta kartalle.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Perulla oli laskurin mukaan yksi karttamerkki — eläintäky vikunja
 * (js/packs/elaintakyt.js) — eikä yhtäkään kohdetta tai maastokohdetta
 * (docs/moduulit/karttanostot-kattavuus.md, Etelä-Amerikka). Tämä
 * tiedosto on maailman erän M17 Perun osuus: KAHDEKSAN KOHDETTA ja
 * KOLME MAASTOKOHDETTA, sama malli kuin erässä M4
 * (js/packs/maastokohteet-can.js).
 *
 * NELJÄ PELIKAUPUNKIA. Laudalla ovat Lima, Machu Picchu, Titicaca ja
 * Iquitos. Uutta merkkiä ei saa panna pelikaupungin kohdalle
 * (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js), joten jokaisen
 * kohteen etäisyys on mitattu kaikkiin neljään ja koko laudan muihin
 * kaupunkeihin. Lähin uusi merkki on Ballestas-saaret 45,8
 * lautayksikön päässä Limasta; jokaisen kohteen lähin kaupunki on
 * kirjattu sen koordinaattirivin viereen.
 *
 * SÄÄNTÖ N3 (sama nimi kartalla vain kerran). Laudan oma nimitaulu
 * (js/packs/maailmankartta-nimet.js) kantaa jo Andit, Amazonin,
 * Marañónin, Ucayalin ja Titicacan. Yhtäkään niistä ei ole tässä
 * listassa: jokimaastokohteeksi valittiin Apurímac, jota kartalla ei
 * ole kertaakaan, ja järven sijasta kolmikossa on saariryhmä.
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/PER.json ei ole, joten kolme
 * maastokohdetta on valittu itse ja koordinaatit on laskettu koneella
 * työkalun omalla kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista).
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Perulla rajaus ON olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.PER,
 * lauta maailmankartta, x 3046,2–3619,8 / y 3102,6–3943,8), joten
 * vartio pätee tähänkin tiedostoon eikä sitä ole kierretty: jokainen
 * alla oleva piste on tarkistettu rajausta vasten yksitellen.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_PER = [
  /* ================================================================
   * MAASTO — kolme kohdetta: vuori, joki ja saariryhmä.
   * ============================================================== */
  {
    id: 'huascaran',
    nimi: 'Huascarán',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on maapallon tropiikin korkein kohta?',
      'Mitä nimi Mataraju tarkoittaa?',
    ],
    korostukset: ['Cordillera Blanca|Cordillera Blancassa', 'Mataraju|Mataraju'],
    nappi: 'Tropiikin korkein huippu, 6 768 metriä',
    // -77.60417 E / -9.12167 N — en-Wikipedia "Huascarán"
    // Lähin pelikaupunki: Lima 115,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3246.5, y: 3516.4 },
    },
    teksti: 'Huascarán on vuori Ancashin departementissa läntisten Andien Cordillera '
      + 'Blancassa. Sen eteläinen huippu nousee 6 768 metriin ja on Perun, pohjoisten Andien '
      + 'ja koko maapallon tropiikin korkein kohta; Etelä-Amerikan vuorista se on neljänneksi '
      + 'korkein Aconcaguan, Ojos del Saladon ja Monte Pississin jälkeen. Vielä 1900-luvulle '
      + 'asti vuorella ei ollut yhtä yleisesti hyväksyttyä nimeä, vaan jokainen kylä käytti '
      + 'omaansa. Nimi Huascarán mainittiin ensi kerran 1850 muodossa Huascan, ja se tulee '
      + 'todennäköisesti alapuolisesta Huashcon kylästä — sen oma nimi tulee ketšuan '
      + 'köyttä tarkoittavasta sanasta waska. Paikalliset kutsuvat vuorta mieluummin '
      + 'nimellä Mataraju, ancashinketšuaksi "kaksoislumihuiput".',
    lahde: 'en-Wikipedia "Huascarán", johdanto-osa ja osio "Names" (tarkistettu 6.9.2026).',
  },
  {
    id: 'apurimac',
    nimi: 'Apurímac',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä nimi Apurímac tarkoittaa?',
      'Miksi jokea pidetään Amazonin kaukaisimpana latvana?',
    ],
    korostukset: ['Mismi|Mismin', 'oraakkeli|oraakkeli'],
    nappi: 'Päällikkö, joka puhuu',
    // -73.97889 E / -12.26278 N — en-Wikipedia "Apurímac River"
    // Lähin pelikaupunki: Machu Picchu 59,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3367.4, y: 3622.3 },
    },
    teksti: 'Apurímac saa alkunsa Mismin harjanteen sulamisvesistä 5 597 metrin korkeudelta '
      + 'Arequipan maakunnassa, alle 160 kilometriä Tyynenmeren rannikolta. Nimi on ketšuaa: '
      + 'apu on päällikkö ja rimaq se, joka puhuu — siis pääoraakkeli. Jokea on pidetty '
      + 'Amazonin kaukaisimpana latvana. Se virtaa luoteeseen Cuscon ohi kapeissa rotkoissa, '
      + 'jotka ovat paikoin 3 000 metriä syviä eli lähes kaksi kertaa Grand Canyonin syvyisiä, '
      + 'ja putoukset ja kosket katkovat matkaa: kuudesta yrityksestä laskea joki kokonaan '
      + 'vain kaksi on onnistunut. 730 kilometrin jälkeen se yhtyy Mantaroon ja muuttuu '
      + 'Eneksi, sitten Tamboksi ja lopulta Ucayaliksi, joka on Amazonin pääuoma. '
      + '1200-luvulla inkat rakensivat joen yli sillan.',
    lahde: 'en-Wikipedia "Apurímac River", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ballestas',
    nimi: 'Ballestas-saaret',
    tyyppi: 'saari',
    kysymykset: [
      'Mitkä eläimet saarilla elävät?',
      'Mikä on El Candelabro?',
    ],
    korostukset: ['humboldtinpingviini|humboldtinpingviini', 'El Candelabro|El Candelabro'],
    nappi: 'Kalliosaaret, joilla merileijonat tulevat veneen viereen',
    // -76.39639 E / -13.73583 N — en-Wikipedia "Ballestas Islands"
    // Lähin pelikaupunki: Lima 45,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3286.8, y: 3672.2 },
    },
    teksti: 'Ballestas-saaret ovat pieni saariryhmä Paracasin kylän edustalla Piscon '
      + 'provinssissa Perun eteläisellä rannikolla. Ne ovat lähinnä kalliomuodostumia ja '
      + 'kattavat vain noin 0,12 neliökilometriä, mutta ne ovat tärkeä merieläinten '
      + 'turvapaikka: siellä elävät muun muassa humboldtinpingviini, guanomerimetso, '
      + 'perunsuula, perunpelikaani ja inkatiira sekä kaksi hyljelajia, karvahylkeet ja '
      + 'merileijonat. Saarille pääsee Paracasista veneretkellä, joka kestää tavallisesti '
      + 'kaksi tuntia, ja merileijonat tulevat usein aivan veneiden viereen. Matkalla näkyy '
      + 'Paracasin niemimaan rinteessä El Candelabro, suuri geoglyfi, joka on saattanut olla '
      + 'merenkulkijoiden maamerkki; sen alkuperää ei tiedetä.',
    lahde: 'en-Wikipedia "Ballestas Islands", johdanto-osa sekä osiot "Geography" ja "Access" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M17, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'nazcan-viivat',
    nimi: 'Nazcan viivat',
    tyyppi: 'historia',
    kysymykset: [
      'Miten viivat on tehty?',
      'Miksi ne ovat säilyneet kaksituhatta vuotta?',
    ],
    korostukset: ['geoglyfi|geoglyfejä', 'rautaoksidi|rautaoksidin'],
    nappi: '1 300 kilometriä viivaa autiomaassa',
    // -75.135 E / -14.6975 N — en-Wikipedia "Nazca lines"
    // Lähin pelikaupunki: Lima 92,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3328.8, y: 3704.9 },
    },
    teksti: 'Nazcan viivat ovat geoglyfejä Nazcan autiomaassa Etelä-Perussa, ja ne tehtiin '
      + 'vuosina 500 eaa. – 500 jaa. Tekotapa oli yksinkertainen: pinnalta siirrettiin pois '
      + 'punaruskean rautaoksidin peittämät kivet, jolloin alta paljastui keltaharmaa maa. '
      + 'Viivat ovat tyypillisesti 10–15 senttiä syviä ja useimmiten runsaat 33 senttiä '
      + 'leveitä. Yhteispituutta on yli 1 300 kilometriä, ja alue kattaa noin 50 '
      + 'neliökilometriä. Suurin osa viivoista kulkee suoraan, mutta joukossa on myös eläin- '
      + 'ja kasviaiheita, jotka on yleensä piirretty yhdellä yhtenäisellä viivalla; suurimmat '
      + 'ovat noin 370 metriä pitkiä ja erottuvat parhaiten noin 500 metrin korkeudesta. '
      + 'Kuiva, tyyni ja vakaa ilmasto on säilyttänyt ne lähes itsestään. 2000-luvulla '
      + 'droonit ovat paljastaneet satoja uusia kuvioita.',
    lahde: 'en-Wikipedia "Nazca lines", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'chan-chan',
    nimi: 'Chan Chan',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupunki sai vetensä?',
      'Mitä ciudadelat olivat?',
    ],
    korostukset: ['ciudadela|ciudadelat', 'chimú|chimújen'],
    nappi: 'Savikaupunki, jossa ei sada',
    // -79.07444 E / -8.10583 N — en-Wikipedia "Chan Chan"
    // Lähin pelikaupunki: Lima 166,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3197.5, y: 3482.3 },
    },
    teksti: 'Chan Chan oli Chimorin valtakunnan pääkaupunki ja esikolumbiaanisen ajan suurin '
      + 'kaupunki koko Etelä-Amerikassa. Se sijaitsee Mochen laakson suulla viisi kilometriä '
      + 'Trujillosta länteen ja oli chimújen pääkaupunki vuodesta 900 vuoteen 1470, jolloin '
      + 'inkat kukistivat heidät. Seutu on Pohjois-Perun rannikkoaavikon kuivimpia, joten '
      + 'kaupungin makea vesi tuli Andeilta valuvista joista ja jaettiin kastelujärjestelmillä. '
      + 'Kaupunki levisi 20 neliökilometrin alalle, ja sen tiiviissä kuuden neliökilometrin '
      + 'ytimessä olivat ciudadelat — valtavat rakennuskokonaisuudet, joissa oli aukioita, '
      + 'varastoja ja kuninkaallisten hautalavoja. Alempien luokkien käsityöläiset asuivat '
      + 'pienissä epäsäännöllisissä huoneryhmissä, jotka toimivat usein myös verstaina.',
    lahde: 'en-Wikipedia "Chan Chan", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'caral',
    nimi: 'Caral',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanha Caral on?',
      'Mikä oli Áspero?',
    ],
    korostukset: ['Áspero|Áspero', 'olmeekki|olmeekkeja'],
    nappi: 'Amerikan vanhin kaupunki, 5 000 vuotta',
    // -77.52028 E / -10.89361 N — en-Wikipedia "Caral"
    // Lähin pelikaupunki: Lima 59,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3249.3, y: 3576 },
    },
    teksti: 'Caral eli Caral-Supen pyhä kaupunki on arkeologinen alue Supen piirikunnassa '
      + '182 kilometriä Limasta pohjoiseen, 23 kilometriä rannikolta ja 350 metrin '
      + 'korkeudessa. Sille annetaan 5 000 vuoden ikä, ja sitä pidetään Amerikkojen '
      + 'vanhimpana kaupunkina ja yhtenä maailman vanhimmista. Mistään muualta Amerikoista ei '
      + 'ole löydetty yhtä varhain näin monenlaisia monumentaalirakennuksia. Caralin '
      + 'kulttuuri kehittyi vuosina 3000–1800 eaa. eli 1 500 vuotta ennen olmeekkeja, jotka '
      + 'olivat Mesoamerikan ensimmäinen monimutkainen yhteiskunta. Kaupungissa asui yli '
      + '3 000 ihmistä, ja alue on yli 60 hehtaaria. Läheisesti siihen liittyi rannikon '
      + 'kalastajakaupunki Áspero Supejoen suulla; sieltä on löydetty ihmisuhrien jäänteitä. '
      + 'Unesco on julistanut Caralin maailmanperintökohteeksi.',
    lahde: 'en-Wikipedia "Caral", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kuelap',
    nimi: 'Kuélap',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi porttikäytävä kapenee?',
      'Minkä muotoisia rakennukset ovat?',
    ],
    korostukset: ['chachapoya|chachapoyat', 'El Tintero|El Tintero'],
    nappi: 'Muurikaupunki pilvimetsän harjanteella',
    // -77.92711 E / -6.4263 N — en-Wikipedia "Kuélap"
    // Lähin pelikaupunki: Iquitos 179,7 lautayksikköä (Lima 217,0).
    laudat: {
      maailmankartta: { x: 3235.8, y: 3426 },
    },
    teksti: 'Kuélap on muurien ympäröimä asuinpaikka vuoristossa Amazonasin alueen '
      + 'eteläosassa. Sen rakensivat chachapoyat 500-luvulla harjanteelle, joka kohoaa '
      + 'Utcubamban laakson yllä 3 000 metrin korkeudessa; ympärillä on pilvimetsää '
      + 'orkideoineen. Alue on noin kuusi hehtaaria, 584 metriä pohjoisesta etelään ja '
      + 'leveimmillään 110 metriä. Muurit ovat 10–20 metriä korkeat ja ladottu huolellisesti '
      + 'työstetyistä kalkkikiviharkoista, joista osa painaa kolme tonnia. Sisään pääsee '
      + 'kolmesta portista; pääportti on puolisuunnikkaan muotoinen ja kapenee niin, että '
      + 'lopulta läpi mahtuu yksi ihminen kerrallaan. Paikan 421 rakennuksesta kaikki viittä '
      + 'lukuun ottamatta ovat pyöreitä, ja osassa on vinoneliö- ja siksakkuvioisia '
      + 'friisejä. Keskellä on 5,5 metriä korkea rakennus, jota kutsutaan nimellä El Tintero, '
      + 'mustepullo.',
    lahde: 'en-Wikipedia "Kuélap", johdanto-osa sekä osiot "Location" ja "Architecture" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sipan',
    nimi: 'Sipán',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi Sipánin herran haudan?',
      'Miten tavalliset ihmiset maksoivat veronsa?',
    ],
    korostukset: ['moche|mochejen', 'adobe|adobetiilistä'],
    nappi: 'Kuninkaanhauta, joka säilyi ryöstäjiltä',
    // -79.60222 E / -6.80139 N — en-Wikipedia "Huaca Rajada"
    // Lähin pelikaupunki: Lima 213,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3179.9, y: 3438.5 },
    },
    teksti: 'Huaca Rajada eli Sipán on mochejen arkeologinen alue Lambayequen laaksossa '
      + 'Pohjois-Perussa. Se tunnetaan Sipánin herran haudasta, jonka Walter Alva ja hänen '
      + 'vaimonsa Susana Meneses alkoivat kaivaa esiin 1987. Kaupunki ajoitetaan vuosiin '
      + '50–700 jaa. eli samaan aikaan mochejen kanssa. Kuninkaalliset haudat kaivettiin '
      + 'esiin vuosina 1987–1990, ja ne ovat yksi viime vuosikymmenten tärkeimmistä '
      + 'arkeologisista löydöistä: moni hauta oli ryöstetty, mutta jäljelle jääneet esineet '
      + 'kertovat mochejen hallitsijoista ja tavoista. Haudat on rakennettu adobetiilistä '
      + 'pyramidin muotoon, ja El Niñon toistuvat sateet ovat kuluttaneet niitä. Tavalliset '
      + 'ihmiset maksoivat veronsa työnä, ja hautalavojen tiiliin lyötiin merkkejä, joilla '
      + 'tehtyä työtä seurattiin.',
    lahde: 'en-Wikipedia "Huaca Rajada", johdanto-osa ja osio "Significance" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'chavin-de-huantar',
    nimi: 'Chavín de Huántar',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on Lanzón?',
      'Miksi paikka valittiin juuri tähän?',
    ],
    korostukset: ['Lanzón|Lanzón', 'chavín|chavínit'],
    nappi: 'Käytävien temppeli rannikon ja viidakon välissä',
    // -77.17845 E / -9.59278 N — en-Wikipedia "Chavín de Huántar"
    // Lähin pelikaupunki: Lima 96,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3260.7, y: 3532.2 },
    },
    teksti: 'Chavín de Huántar on arkeologinen alue Ancashin alueella 434 kilometriä Limasta '
      + 'pohjoiseen, 3 180 metrin korkeudessa Cordillera Blancan itäpuolella. Vanhimmat '
      + 'rakenteet ovat vuodelta 1200 eaa., ja paikkaa asuttivat chavínit, merkittävä '
      + 'inkoja edeltänyt kulttuuri, noin vuoteen 400–500 eaa. Sijainti Marañónin latvoilla '
      + 'rannikon ja viidakon välissä teki siitä luontevan paikan sekä tavaroiden että '
      + 'ajatusten vaihdolle. Vanha temppeli on sisäänpäin kääntynyt rakennus, jonka käytävät '
      + 'kiertävät pyöreää sisäpihaa; sen keskellä olevassa galleriassa seisoo Lanzón, '
      + 'ihmisvartaloinen ja kissapäinen veistos, jota pidetään paikan ylimpänä jumalana. '
      + 'Uusi temppeli rakennettiin vuosina 500–200 eaa. Alue on maailmanperintökohde.',
    lahde: 'en-Wikipedia "Chavín de Huántar", johdanto-osa ja osio "Site description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'arequipa',
    nimi: 'Arequipa',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Arequipaa sanotaan Perun laillisuuden pääkaupungiksi?',
      'Milloin kaupunki perustettiin?',
    ],
    korostukset: ['Chili|Chilijoen', 'perustuslakituomioistuin|perustuslakituomioistuimen'],
    nappi: 'Perun toinen kaupunki, Limaa vastaan',
    // -71.53694 E / -16.39889 N — en-Wikipedia "Arequipa"
    // Lähin pelikaupunki: Titicaca 75,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3448.8, y: 3763 },
    },
    teksti: 'Arequipa on Etelä-Perun kaupunki ja samannimisen departementin pääkaupunki; '
      + 'vuoden 2025 ennusteen mukaan siellä asuu 1 195 700 ihmistä, joten se on Liman jälkeen '
      + 'maan toiseksi suurin. Se on Perun perustuslakituomioistuimen virallinen kotipaikka, '
      + 'ja siksi sitä kutsutaan Perun laillisuuden pääkaupungiksi. Kaupunki levittäytyy '
      + 'Chilijoen molemmille rannoille laaksoon, jota rajaavat pohjoisessa ja idässä Andit '
      + 'ja etelässä ja lännessä matalat rannikkokukkulat. Se perustettiin 15. elokuuta 1540, '
      + 'ja Kaarle V:n asiakirja teki siitä kaupungin 25. syyskuuta 1541. Arequipa on maan '
      + 'toiseksi teollistunein kaupunki: siellä tehdään muun muassa kamelieläinten villasta '
      + 'kudottuja tekstiilejä sekä kupari- ja molybdeenirikastetta. Itsenäistymisen jälkeen '
      + 'se toimi vastapainona Liman keskitetylle vallalle.',
    lahde: 'en-Wikipedia "Arequipa", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'colcan-kanjoni',
    nimi: 'Colcan kanjoni',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka syvä kanjoni on?',
      'Mitä andenes tarkoittaa?',
    ],
    korostukset: ['andenes|andenes', 'andienkondori|andienkondori'],
    nappi: 'Kolme kilometriä syvä, portaita reunoja myöten',
    // -71.87917 E / -15.59722 N — en-Wikipedia "Colca Canyon"
    // Lähin pelikaupunki: Machu Picchu 78,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3437.4, y: 3735.6 },
    },
    teksti: 'Colcan kanjoni on Colcajoen uurtama rotko Etelä-Perussa noin 160 kilometriä '
      + 'Arequipasta luoteeseen. Syvyyttä on noin 3 270 metriä, mikä tekee siitä yhden '
      + 'maailman syvimmistä kanjoneista, ja pituutta noin 70 kilometriä. Laakso on '
      + 'värikäs ja asuttu: siellä elää yhä collagua- ja cabana-kulttuurien väkeä, joka '
      + 'ylläpitää esi-isiensä tapoja ja viljelee inkoja vanhempia porrasterasseja eli '
      + 'andenes-pengermiä. Kylät on perustettu espanjalaisaikana, kun varakuningas '
      + 'Francisco de Toledo määräsi 1570-luvulla hajallaan asuvat siirtymään keskitettyihin '
      + 'asutuksiin. Kanjonissa elää andienkondori, jonka siipiväli on 2,1–2,7 metriä ja jota '
      + 'katsellaan Cruz del Condorin näköalapaikalta; siinä kohdassa pohja on 1 200 metriä '
      + 'reunan alapuolella. Colca on Perun kolmanneksi vierailluin matkakohde.',
    lahde: 'en-Wikipedia "Colca Canyon", johdanto-osa sekä osiot "History" ja "Attractions" '
      + '(tarkistettu 6.9.2026).',
  },
];
