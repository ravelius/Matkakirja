/*
 * UNKARIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan ja
 * Tšekin jälkeen Unkari.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin,
 * Kreikan, Itävallan, Alankomaiden, Belgian, Puolan ja Tšekin pakat: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Unkarin kuningaskunta on Itävalta-Unkarin kaksoismonarkian
 * osa vuodesta 1867 (Frans Joosef kuninkaana), ja `nappi`-alaotsikot
 * kertovat kohteen 1873. Vuoden 1873 jälkeiset kohteet (Ópusztaszerin
 * Feszty-panoraama 1894, Ipolytarnócin polku 1986, Tisza-tó 1973) ovat
 * mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin.
 * Budapestin muodostuminen (1873) on kaupungin oma asia.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `hun-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/hun/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Budapest, Unkarin ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 3 lautayksikön päässä nykyisistä merkeistä ja
 * keskenään yli 8 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.HUN:iin. Unkarissa on jo 23 nostoa; Balaton, Tokaj,
 * Hortobágy, Eger, Pécs, Pannonhalma, Hollókő ja Aggtelek ovat niiden
 * joukossa eikä niitä toisteta. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Unkarin fokuslehden
 * rajaukseen (`osuuLehteen`). Ipolytarnóc on pelin karkean maailmankartan
 * HUN-renkaan ulkopuolella (0,5 lautayksikköä); Esztergom (0,8) ja
 * Villány (1,9) ovat aivan reunalla, ja niiden koordinaatit ovat
 * Wikipedian todelliset.
 */

/** Unkarin hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_HUN = [
  {
    id: 'hahmotelma-heviz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-heviz-84c0220b.jpg',
      lyhyt: 'Hévízin lämpöjärven höyryävä pinta talvella ja vanha järvenrantarakennus.',
      selite: 'Kuva on otettu talvella. Hévízin lämmin vesi pysyy uintikelpoisena pakkasella, ja järven pinnalta nousee usvaa.',
      lahde: 'Valokuva: Ivanhoe, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ivanhoe',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Hévíz,_Thermal_bath_in_winter.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-heviz-ba3d13e9.jpg',
        lyhyt: 'Purppuranpunaisia lumpeenkukkia lehtineen Hévízin järvellä.',
        selite: 'Lumpeet kasvavat Hévízin lämpimässä vedessä; kuvassa kukkivat lumpeet ja niiden pyöreät lehdet.',
        lahde: 'Valokuva: Kovacsapartman, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Kovacsapartman',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Heviz-tavirozsa.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Hévízin järvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mitä nimi Hévíz tarkoittaa?',
      'Kuinka usein Hévízin järven vesi vaihtuu kokonaan?',
    ],
    korostukset: ['lämpöjärvi|lämpöjärvi'],
    nappi: 'Kuuma järvi Balatonin läheisyydessä; lumpeet tuodaan sinne vasta 1898',
    // 17.19305556 E / 46.78722222 N — en-Wikipedia "Lake Hévíz"
    laudat: {
      maailmankartta: { x: 6406.4, y: 1527.5 },
      europe: { x: 541.3, y: 663.1 },
    },
    teksti: 'Hévízin järvi sijaitsee Hévízin kaupungissa Balatonin länsipään lähellä, kahdeksan '
      + 'kilometrin päässä Keszthelystä, ja nimi Hévíz tarkoittaa kuumaa vettä. Se on '
      + 'Euroopan suurin uitavissa oleva lämpöjärvi, jonka vesi nousee kahdesta lähteestä 38 '
      + 'metrin syvyisessä luolassa. Virtaus on niin voimakas, että järven vesi vaihtuu '
      + 'kokonaan kolmen ja puolen vuorokauden välein; päälähde antaa 90 prosenttia vedestä '
      + 'ja on 41-asteinen, ja järven lämpötila on kesällä 33–35 ja talvella 22 astetta, '
      + 'jolloin pinnalle voi nousta sumua. Lumpeet ovat suuri turistinähtävyys: Lovassy '
      + 'Sándor toi Nymphaea rubran järveen vuonna 1898.',
    lahde: 'en-Wikipedia "Lake Hévíz", johdanto-osa ja osiot "Ecology" ja "Flora and fauna" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä tekee Hévízin järvestä erityisen Euroopassa?',
      vaihtoehdot: [
        'Syvin tulivuoren kraatterijärvi',
        'Suurin uimakelpoinen lämpöjärvi',
        'Suolaisin sisämaan järvi',
        'Korkein vuoristojärvi',
      ],
      oikea: 1,
      fakta: 'Järven pohjalla on turvekerros, joka on jopa kahdeksan metriä paksu.',
    },
  },
  {
    id: 'hahmotelma-velence',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-velence-2c737c4e.jpg',
      lyhyt: 'Purjevene ja uimareita Velencei-tavella, ruovikon takana kukkulat ja asutusta.',
      selite: 'Velencei-tó on matala arotyyppinen järvi, jonka rantaa reunustaa laaja ruovikko. Kuva on otettu Gárdonyn rannalta.',
      lahde: 'Valokuva: Christo, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gárdony,_Velencei-tó,_45.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-velence-09a610ec.jpg',
        lyhyt: 'Tyyni Velencei-tó, ruovikkoa ja kukkuloita sekä rinteille levittäytyvä asutus.',
        selite: 'Kuva on otettu Gárdonyn rannalta vuonna 2017. Järven takana kohoavat Velencen kukkulat.',
        lahde: 'Valokuva: Christo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Christo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gárdony,_Velencei-tó,_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Velencei-tó',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Kuinka suuri osa Velencei-tón pinta-alasta on ruovikkoa?',
      'Miksi Velencei-tó on yksi Euroopan lämpimimmistä järvistä?',
    ],
    korostukset: ['ruovikko|ruovikkoa'],
    nappi: 'Matala, lämmin järvi Budapestin ja Székesfehérvárin välissä',
    // 18.6 E / 47.20833333 N — en-Wikipedia "Lake Velence"
    laudat: {
      maailmankartta: { x: 6453.3, y: 1509.7 },
      europe: { x: 568.3, y: 652 },
    },
    teksti: 'Velencei-tó on Unkarin kolmanneksi suurin luonnonjärvi, umpiallas, ja suosittu '
      + 'lomakohde unkarilaisten keskuudessa. Sen pinta-ala on 26 neliökilometriä, josta '
      + 'kolmasosa on ruovikkoa. Aurinkoisen ilmaston ja järven matalan veden ansiosta se on '
      + 'yksi Euroopan lämpimimmistä järvistä, ja sen lämpötila voi kesällä nousta 26–28 '
      + 'asteeseen. Järvi sijaitsee Fejérin läänissä Velencen kukkuloiden juurella, '
      + 'M7-moottoritien varrella Budapestin ja Székesfehérvárin välissä. Osa järvestä on '
      + 'lintujen suojelualuetta.',
    lahde: 'en-Wikipedia "Lake Velence", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tiszato',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-tiszato-6cf2997f.jpg',
      lyhyt: 'Retkiveneitä ruovikon reunustamalla vesiuralla Tisza-tavella.',
      selite: 'Kuvassa kaksi retkivenettä Tisza-tavella elokuussa 2018. Järven rannat ovat ruovikkoa ja puustoa.',
      lahde: 'Valokuva: Texaner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Texaner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poroszló_034.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-tiszato-791e00eb.jpg',
        lyhyt: 'Kiskören vesivoimalan pato ja portit Tisza-joella.',
        selite: 'Kiskören vesivoimalaitos ja sen pato Tisza-joella. Tämä pato tekee Tisza-tavasta tekojärven.',
        lahde: 'Valokuva: Lajos Gál, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lajos Gál',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Erőmű_látkép_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Tisza-tó',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Milloin Tiszan pato rakennettiin?',
      'Miksi unkarilaiset alkoivat lomailla Tisza-tólla?',
    ],
    korostukset: ['tekojärvi|tekojärvi'],
    nappi: 'Tisza-joen tulvien vielä avoin laakso; järvi syntyy padon myötä vasta 1970-luvulla',
    // 20.66666667 E / 47.6 N — en-Wikipedia "Lake Tisza"
    laudat: {
      maailmankartta: { x: 6522.2, y: 1493.2 },
      europe: { x: 608, y: 641.7 },
    },
    teksti: 'Tisza-tó eli Kiskören tekojärvi on Unkarin suurin tekojärvi, Heves-läänin '
      + 'kaakkoiskulmassa. Osana Tisza-joen tulvatorjuntahanketta Tiszan pato rakennettiin '
      + 'vuonna 1973, ja täyttö valmistui 1990-luvulla, jolloin syntyi 127 neliökilometrin '
      + 'järvi; se on 27 kilometriä pitkä, keskimäärin 1,3 metriä syvä ja enimmillään 17 '
      + 'metriä syvä, ja siinä on 43 neliökilometriä pieniä saaria. Kun järvi valmistui, '
      + 'unkarilaiset alkoivat lomailla siellä, koska se oli edullisempi ja vähemmän '
      + 'ruuhkainen kuin perinteinen lomakohde Balaton. Järvessä on monipuolinen lintu-, '
      + 'kasvi- ja eläinlajisto, ja Poroszlón ekokeskus esittelee Tiszan laakson luontoa.',
    lahde: 'en-Wikipedia "Lake Tisza", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kiskunsag',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-kiskunsag-fb95faa9.jpg',
      lyhyt: 'Perinneasuinen csikós seisoo hevosten selässä ja ohjaa ruskeita hevosia Bugacin aroilla.',
      selite: 'Kuva on otettu Bugacissa, Kiskunságin alueella. Taustalla aukeaa tasainen puszta.',
      lahde: 'Valokuva: isol, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'isol',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hungria_-_Bugac_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-kiskunsag-001eccfb.jpg',
        lyhyt: 'Hiekkainen polku kulkee ruohoisten hiekkadyynien halki Kiskunságissa.',
        selite: 'Fülöpházan hiekkadyynit Kiskunságin kansallispuistossa. Dyynien pinnalla kasvaa ruohoa ja tummia katajapensaita.',
        lahde: 'Valokuva: Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pasztilla aka Attila Terbócs',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fülöpháza_Sand-Drifts_2020_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Kiskunságin puszta',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Milloin Kiskunságin kansallispuisto perustettiin?',
      'Mikä luonnonilmiö on Fülöpházan lähellä?',
    ],
    korostukset: ['puszta|puszta'],
    nappi: 'Suuren tasangon puszta, jonka vanhaa paimentolaiselämää elvytetään nykyään',
    // 19.4 E / 46.88333333 N — en-Wikipedia "Kiskunság National Park"
    laudat: {
      maailmankartta: { x: 6480, y: 1523.4 },
      europe: { x: 583.7, y: 660.6 },
    },
    teksti: 'Kiskunságin kansallispuisto sijaitsee Tonavan ja Tisza-joen välisellä alueella '
      + 'Bács-Kiskunin läänissä, ja se perustettiin vuonna 1975; Unesco on julistanut sen '
      + 'biosfäärialueeksi. Puisto kattaa 530 neliökilometriä Suuren Unkarin tasangon '
      + 'Pikku-Kumanian alueella, ja se koostuu seitsemästä erillisestä osasta. Yksi niistä '
      + 'on Kiskunságin puszta, jossa vuosittain järjestetään tapahtumia, joissa elvytetään '
      + 'vanhaa paimentolais- ja karjanhoitoperinnettä. Fülöpházan lähellä on hiekkadyynejä, '
      + 'joiden sanotaan liikkuvan otollisessa tuulessa, ja alueen alkalisilla järvillä pesii '
      + 'ja lepää kymmeniä tuhansia muuttolintuja.',
    lahde: 'en-Wikipedia "Kiskunság National Park", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-badacsony',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-badacsony-54dadd03.jpg',
      lyhyt: 'Tasalakinen Badacsony-vuori kohoaa Balatonin rannalla, rinteillä pieniä taloja ja viinitarhaterasseja.',
      selite: 'Kuva on otettu järveltä Badacsonytomajin suuntaan. Vuoren rinteillä erottuvat rakennukset ja terassoidut viljelmät.',
      lahde: 'Valokuva: Horsee, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Horsee',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Badacsonytomaj_látkép.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-badacsony-fc3563e3.jpg',
        lyhyt: 'Pystysuuntaisia basalttipylväitä pistää esiin metsäisestä rinteestä Badacsony-vuorella.',
        selite: 'Badacsonyn basalttiurut ovat vuoren tulivuorikivestä muodostuneita pylväsmäisiä kalliomuodostelmia.',
        lahde: 'Valokuva: BeOCeKa, Wikimedia Commons (CC0).',
        tekija: 'BeOCeKa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Badascony_basaltorgeln.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Badacsony',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mistä kivilajista Badacsonyn läheiset vuoret koostuvat?',
      'Minkä viinialueen keskus Badacsony on?',
    ],
    korostukset: ['basaltti|basalttivuoret'],
    nappi: 'Balatonin basalttivuori, jonka rinteillä runoilija Kisfaludy asui',
    // 17.49583611 E / 46.80351111 N — en-Wikipedia "Badacsony"
    laudat: {
      maailmankartta: { x: 6416.5, y: 1526.8 },
      europe: { x: 547.1, y: 662.7 },
    },
    teksti: 'Badacsony on Balatonin pohjoisrannalla Länsi-Unkarissa oleva alue, vuoren huippu ja '
      + 'alueen kaupunki. Läheiset basalttivuoret ovat ainutlaatuisia geologisia jäänteitä ja '
      + 'harvinaisten kasvien ja eläinten elinympäristö: nämä yksittäiset, erikoisen '
      + 'muotoiset kukkulat syntyivät tulivuoritoiminnassa ennen kuin Pannonia oli aktiivinen '
      + 'geologinen alue. Badacsony on Badacsonyn viinialueen keskus. Runoilija Sándor '
      + 'Kisfaludy asui vuorella ja tapasi siellä vaimonsa Róza Szegedyn; tapahtumaa '
      + 'muistetaan pienessä näyttelyssä, ja Kisfaludyn entinen talo on nykyään ravintola.',
    lahde: 'en-Wikipedia "Badacsony", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka runoilija asui Badacsony-vuorella ja tapasi siellä tulevan vaimonsa?',
      vaihtoehdot: [
        'Sándor Petőfi',
        'János Arany',
        'Mihály Vörösmarty',
        'Sándor Kisfaludy',
      ],
      oikea: 3,
      fakta: 'Badacsonysta lähtee katamaraanilautta Fonyódiin.',
    },
  },
  {
    id: 'hahmotelma-gemenc',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-gemenc-38e79fd9.jpg',
      lyhyt: 'Tonava levenee Gemencin tulvametsän reunustamana.',
      selite: 'Leveä Tonava virtaa Duna–Dráva-kansallispuistossa, ja vastarannalla kohoaa tiheä tulvametsä.',
      lahde: 'Valokuva: Pear Blossom, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Pear Blossom',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Danube_at_Gemenc.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-gemenc-dcd15f59.jpg',
        lyhyt: 'Gemencin metsäjunan kapearaiteinen rata halkoo tulvametsää.',
        selite: 'Kapearaiteinen Gemencin metsärautatie kulkee paljaiden lehtipuiden välissä Keselyűsin kohdalla; radan vieressä on pino tukkeja.',
        lahde: 'Valokuva: Szeder László, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Szeder László',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:HU-TO-Őcsény03.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gemenc',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mikä on Gemencin metsän erikoisuus Tonavan varrella?',
      'Minkä eläimen kanta on maailmankuulu?',
    ],
    korostukset: ['hirvikanta|hirvikanta'],
    nappi: 'Tonavan tulvametsä, jonka hirvikanta on maailmankuulu',
    // 18.8865 E / 46.25305556 N — en-Wikipedia "Gemenc"
    laudat: {
      maailmankartta: { x: 6462.9, y: 1549.8 },
      europe: { x: 573.8, y: 677.1 },
    },
    teksti: 'Gemenc on ainutlaatuinen metsä Szekszárdin ja Bajan välissä Unkarissa, ja se on '
      + 'Tonavan ainoa jäljellä oleva vuorovesialue Unkarissa. Metsän eläimistöön kuuluvat '
      + 'hirvet, villisiat, haikarat, muuttohaukat ja merikotkat; hirvikanta on '
      + 'maailmankuulu, koska sen perimä on erinomainen ja sarvet vaikuttavia. Veden lähellä '
      + 'kasvaa pajuja ja poppeleita ja kauempana laajoja tammi-saarni-jalavametsiä. Metsä on '
      + 'elinympäristö Freyerin keisarikiitäjälle sekä 13 muulle suojellulle perhoslajille, '
      + 'ja se kuuluu Tonava-Dráva-kansallispuistoon.',
    lahde: 'en-Wikipedia "Gemenc", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä tekee Gemencistä ainutlaatuisen Unkarissa?',
      vaihtoehdot: [
        'Tonavan ainoa vuorovesialue',
        'Unkarin suurin havumetsä',
        'Unkarin korkein vuorimetsä',
        'Unkarin ainoa saarimetsä',
      ],
      oikea: 0,
      fakta: 'Gemenc on osa Tonava-Dráva-kansallispuistoa.',
    },
  },
  {
    id: 'hahmotelma-esztergom',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-esztergom-b37eef8c.jpg',
      lyhyt: 'Esztergomin basilika kohoaa linnavuorella Tonavan yllä.',
      selite: 'Vihreäkupolinen basilika ja sen vieressä oleva linnan rakennusryhmä näkyvät Tonavan yli katsottuna syksyisessä auringonvalossa, ja joki heijastaa maiseman.',
      lahde: 'Valokuva: Gábor Bejó (artbejo), Wikimedia Commons (CC0).',
      tekija: 'Gábor Bejó (artbejo)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Az_esztergomi_bazilika_derűs_időben.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-esztergom-c5f1e5c1.jpg',
        lyhyt: 'Basilikan Tonavan puoleinen julkisivu ja kupoli lähikuvassa.',
        selite: 'Esztergomin katedraalin (basilikan) Tonavan puoleinen julkisivu kohoaa kukkulan päällä; kupolin vihreä katto ja pylväiden koristeelliset päät erottuvat.',
        lahde: 'Valokuva: Globetrotter19, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Globetrotter19',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Esztergom_2016,_Főszékesegyház_dunai_homlokzata_a_Berényi_utca_felől.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Esztergomin basilika',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä on Unkarin suurin kirkko?',
      'Mitä osmanit tekivät Esztergomin kirkolle vuonna 1543?',
    ],
    korostukset: ['basilika|basilika'],
    nappi: 'Unkarin primaatin uusi katedraali, joka vihittiin käyttöön 1856',
    // 18.73638889 E / 47.79888889 N — en-Wikipedia "Esztergom Basilica"
    laudat: {
      maailmankartta: { x: 6457.9, y: 1484.8 },
      europe: { x: 570.9, y: 636.5 },
    },
    teksti: 'Esztergomin basilika eli Neitsyt Marian taivaaseenottamisen ja Pyhän Adalbertin '
      + 'primaattikatedraali on Unkarin katolisen kirkon istuin ja Esztergom-Budapestin '
      + 'arkkihiippakunnan äitikirkko. Se on Unkarin suurin kirkko: sisäpinta-ala on 5 600 '
      + 'neliömetriä, pituus 118 metriä, leveys 49 metriä ja kupoli kohoaa ulkoa 100 metrin '
      + 'korkeuteen. Kirkko on rakennettu Linnavuoren huipulle aiempien kirkkojen '
      + 'perustuksille; ensimmäisen, Pyhän Adalbertin kirkon rakennutti Tapani I vuosina '
      + '1001–1010 Unkarin ensimmäiseksi tuomiokirkoksi. Vuonna 1543 osmanit valtasivat '
      + 'kaupungin, purkivat kirkon kuorin ja käyttivät loppua moskeijana. Nykyisen '
      + 'katedraalin peruskivi laskettiin vuonna 1822, ja yläkirkko vihittiin käyttöön 31. '
      + 'elokuuta 1856.',
    lahde: 'en-Wikipedia "Esztergom Basilica", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä osmanit tekivät Esztergomin katedraalille vuonna 1543?',
      vaihtoehdot: [
        'Se poltettiin maan tasalle',
        'Se muutettiin ruutivarastoksi',
        'Kuori purettiin, loppu moskeijaksi',
        'Se muutettiin sotilassairaalaksi',
      ],
      oikea: 2,
      fakta: 'Kryptaan on rakennettu vuonna 1831 muinaisegyptiläiseen tyyliin hautakammio, jossa lepäävät entiset arkkipiispat.',
    },
  },
  {
    id: 'hahmotelma-mohacs',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-mohacs-8a3f9454.jpg',
      lyhyt: 'Mohácsin historiallisen muistopuiston portti kaartuu kivikehyksenä.',
      selite: 'Mohácsin taistelun muistopuiston sisäänkäynnin kivinen suippokaari ja sen sisällä metallinen ristikkoportti, taustalla lasinen rakennus.',
      lahde: 'Valokuva: Motacilla, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Motacilla',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sátorhely_Bélletes_kapu.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-mohacs-28c15518.jpg',
        lyhyt: 'Muistopuiston metalliristikkoportti lähikuvassa vastavalossa.',
        selite: 'Kivikaaren sisällä on tiheä mustan metallin ristikko, jonka kuvio muistuttaa itämaista koristetta; portti avautuu muistopuiston puolelle.',
        lahde: 'Valokuva: Chmee2 or Valtameri, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Chmee2 or Valtameri',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mohács_Historical_Monumen_(2).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Mohács',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuosina Mohácsin lähellä käytiin kaksi kuuluisaa taistelua?',
      'Minkä nimistä karnevaalia Mohácsissa vietetään joka kevät?',
    ],
    korostukset: ['Busójárás|Busójárás'],
    nappi: 'Tonavan rantakaupunki, jonka vuoden 1526 taistelu on Unkarin suuri muisto',
    // 18.67985 E / 45.99593 N — en-Wikipedia "Mohács"
    laudat: {
      maailmankartta: { x: 6456, y: 1560.5 },
      europe: { x: 569.9, y: 683.9 },
    },
    teksti: 'Mohács on Baranyan läänin kaupunki Tonavan oikealla rannalla Etelä-Unkarissa. '
      + 'Kaupungin lähellä käytiin kaksi kuuluisaa taistelua, vuosina 1526 ja 1687, ja ne '
      + 'merkitsivät Osmanien vallan alkua ja loppua Unkarissa. Roomalaisaikana Tonavan '
      + 'rannalla oli sotilasleiri, ja Osmanien vallan aikana Mohács oli Mohácsin sanjakin '
      + 'hallintokeskus. Enemmistö asukkaista oli vuoteen 1945 asti Tonavan švaabeja. Joka '
      + 'kevät kaupungissa pidetään Busójárás-karnevaali, jonka Unesco kirjasi aineettoman '
      + 'kulttuuriperinnön luetteloon vuonna 2009.',
    lahde: 'en-Wikipedia "Mohács", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-szigetvar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-szigetvar-1daaef47.jpg',
      lyhyt: 'Szigetvárin linnan pyöreä muuri ja portti vanhassa mustavalkokuvassa.',
      selite: 'Kivinen linnan muuri kaartuu puiston yli, ja vasemmalla näkyy linnan päärportti; kuvassa on ohikulkijoita ja vanha henkilöauto.',
      lahde: 'Valokuva: Fortepan (ID 21789), lahjoittaja Lechner Nonprofit Kft. Dokumentációs Központ, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Fortepan (ID 21789), lahjoittaja Lechner Nonprofit Kft. Dokumentációs Központ',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szigetvár,_a_vár_főkapuja._Fortepan_21789.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-szigetvar-2ed49cc8.jpg',
        lyhyt: 'Szigetvárin linnan päärportti lähikuvassa vanhassa sepiakuvassa.',
        selite: 'Tiilimuuriin rakennettu holvikaari avautuu linnan sisäpihalle; portin ympärillä on rapattuja pilastereita, ja etualalla kukkii pensas.',
        lahde: 'Valokuva: Fortepan (ID 92325), lahjoittaja Ebner, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Fortepan (ID 92325), lahjoittaja Ebner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szigetvár,_a_vár_főkapuja._Fortepan_92325.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Szigetvár',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka linnanpäällikkö puolusti Szigetvária vuonna 1566?',
      'Mitä nimi Szigetvár tarkoittaa?',
    ],
    korostukset: ['Zrinski|Zrinskin'],
    nappi: 'Suleimanin viimeisen sotaretken kohde; Osmanien valta päättyy täällä vasta 1689',
    // 17.79944444 E / 46.0475 N — en-Wikipedia "Szigetvár"
    laudat: {
      maailmankartta: { x: 6426.6, y: 1558.4 },
      europe: { x: 552.9, y: 682.6 },
    },
    teksti: 'Szigetvár on noin 12 000 asukkaan kaupunki Baranyan läänissä Etelä-Unkarissa; nimi '
      + 'tarkoittaa saarilinnaa, ja vuonna 2011 parlamentti antoi kaupungille arvonimen '
      + 'Civitas Invicta. Linnoitus sai alkunsa vuonna 1420, kun Ozsvát Anthemi rakennutti '
      + 'ensimmäiset tiilirakennukset Almás-joen soiselle tulva-alueelle. Nikola Zrinski '
      + 'nimitettiin linnanpäälliköksi vuonna 1561, ja hänen johdollaan linnasta tehtiin '
      + 'hyökkäysretkiä aina Tonavalle asti. Vuonna 1566 72-vuotias ja huonokuntoinen '
      + 'sulttaani Suleiman johti armeijansa henkilökohtaisesti Szigetváriin; linnoitusta '
      + 'piiritettiin 6. elokuuta alkaen, Suleiman kuoli luonnollisiin syihin 6. tai 7. '
      + 'syyskuuta, ja linnoitus kaatui seuraavana päivänä. Piiritys tunnetaan Zrinskin ja '
      + 'hänen miestensä viimeisestä rohkeasta hyökkäyksestä.',
    lahde: 'en-Wikipedia "Szigetvár", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miten sulttaani Suleiman kuoli Szigetvárin piirityksen aikana?',
      vaihtoehdot: [
        'Hän kaatui muurin valtauksessa',
        'Hän kuoli luonnollisiin syihin',
        'Hänet myrkytettiin leirissä',
        'Hän hukkui Almás-jokeen',
      ],
      oikea: 1,
      fakta: 'Vuonna 2016 alkaneet kaivaukset paljastivat Suleimanin haudan läheisen tuhoutuneen Turbékin asutuksen alueelta.',
    },
  },
  {
    id: 'hahmotelma-sarospatak',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sarospatak-790b1001.jpg',
      lyhyt: 'Sárospatakin linna kohoaa kivimuurien ja puiston takana.',
      selite: 'Linnan kivinen torniosa ja valkoiset asuinsiivet näkyvät kukkulaa pitkin kulkevan muurin ja paljaiden puiden takaa.',
      lahde: 'Valokuva: h_laca, Wikimedia Commons (CC BY 3.0).',
      tekija: 'h_laca',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sárospatak_-_Vár_-_látkép_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sarospatak-19c3e8d6.jpg',
        lyhyt: 'Vanha piirros Sárospatakin linnan valkoisesta siivestä ja tornista.',
        selite: 'Károly Csernan piirros esittää linnan valkoista asuinsiipeä, sen kulmaerkkeriä ja vasemmalla kivistä torniosaa; edessä kävelee kaksi henkilöä.',
        lahde: 'Piirros: Károly Cserna, Wikimedia Commons (public domain).',
        tekija: 'Károly Cserna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sárospatak_castle_Cserna.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Sárospatak',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenen tyttären syntymäpaikaksi Sárospatakin linna perinteisesti tunnetaan?',
      'Kuka johti vapaussotaa Habsburgeja vastaan vuosina 1703–1711?',
    ],
    korostukset: ['Rákóczi|Rákóczien'],
    nappi: 'Rákóczien linna Bodrog-joen laaksossa; Pyhän Elisabetin syntymäpaikaksi sanottu',
    // 21.56636 E / 48.31897 N — en-Wikipedia "Sárospatak"
    laudat: {
      maailmankartta: { x: 6552.2, y: 1462.6 },
      europe: { x: 625.3, y: 622.8 },
    },
    teksti: 'Sárospatak on kaupunki Borsod-Abaúj-Zemplénin läänissä Pohjois-Unkarissa Bodrog-joen '
      + 'laaksossa, 70 kilometriä Miskolcista koilliseen; sitä kutsutaan usein pelkästään '
      + 'Pataksi, ja se on kulttuurikeskus ja historiallinen kaupunki. Kaupunki sai '
      + 'kaupunkioikeudet vuonna 1201 kuningas Emerikiltä, ja keskiajalla se oli tärkeä, '
      + 'koska lähellä kulki kauppareitti Puolaan. Linna, jonka Andreas II rakennutti, '
      + 'tunnetaan perinteisesti hänen tyttärensä Pyhän Elisabetin syntymäpaikkana. Linnan '
      + 'omistivat myöhemmin muun muassa Perényin, Dobón ja Rákóczien suvut, ja runoilija '
      + 'Bálint Balassi meni siellä naimisiin Krisztina Dobón kanssa. Kaupunkilaiset '
      + 'osallistuivat aktiivisesti Frans II Rákóczin johtamaan vapaussotaan Habsburgeja '
      + 'vastaan vuosina 1703–1711.',
    lahde: 'en-Wikipedia "Sárospatak", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sopron',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sopron-33c510ec.jpg',
      lyhyt: 'Soprónin Tulitorni kohoaa vanhan kaupungin katujen yllä.',
      selite: 'Kuvassa Tulitorni ja sen alla oleva portti, oikealla kaupungintalon julkisivu. Tulitorni on Soprónin tunnetuin symboli.',
      lahde: 'Valokuva: Zeitblick, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zeitblick',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fire_Tower_Sopron_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sopron-c52b50eb.jpg',
        lyhyt: 'Soprónin Pääaukio, Tulitorni ja barokkinen Pyhän kolminaisuuden patsas.',
        selite: 'Vanhan kaupungin Pääaukion (Fő tér) historiallisia rakennuksia ja Tulitornin vihreä huippu. Etualalla kohoaa kolminaisuuspatsas.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sopron_Haupt-Platz_04.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sopron-73e2551c.jpg',
        lyhyt: 'Tulitornin "Uskollisuuden portti" veistoksineen.',
        selite: 'Tulitornin eteläpuolella oleva Uskollisuuden portti tehtiin vuoden 1921 kansanäänestyksen muistoksi, jossa Sopron ja kahdeksan naapurikylää halusivat jäädä Unkarille. Portin päällä on kuvanveistäjän tekemä veistosryhmä.',
        lahde: 'Valokuva: Pennyjey, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Pennyjey',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gate_of_Faith_%28Firewatch_Tower_in_Sopron%29.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Sopron',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä Soprónia kutsuttiin roomalaisaikana?',
      'Minkä lisänimen kaupunki sai vuoden 1921 kansanäänestyksen jälkeen?',
    ],
    korostukset: ['Scarbantia|Scarbantia'],
    nappi: 'Ödenburg, Unkarin rajakaupunki, jossa roomalaisen Scarbantian muurit ovat yhä jäljellä',
    // 16.58305 E / 47.68489 N — en-Wikipedia "Sopron"
    laudat: {
      maailmankartta: { x: 6386.1, y: 1489.6 },
      europe: { x: 529.6, y: 639.5 },
    },
    teksti: 'Sopron on kaupunki Unkarissa Itävallan rajalla lähellä Neusiedlinjärveä eli Fertőä. '
      + 'Roomalaisaikana paikalla oli Scarbantia-niminen kaupunki, jonka foorumin paikalla on '
      + 'nykyään Soprónin pääaukio. Osmanit ryöstivät kaupungin vuonna 1529 mutta eivät '
      + 'miehittäneet sitä, ja vuonna 1676 kaupunki tuhoutui tulipalossa, minkä jälkeen '
      + 'nykyinen barokkikaupunki syntyi. Itävalta-Unkarin hajottua Soprónin kuuluminen '
      + 'Unkariin ratkaistiin kiistanalaisessa paikallisessa kansanäänestyksessä 14. '
      + 'joulukuuta 1921, jossa 65 prosenttia äänesti Unkarin puolesta; siitä lähtien '
      + 'kaupunkia on kutsuttu nimellä Civitas Fidelissima eli uskollisin kaupunki. Kaupunki '
      + 'oli myös vuoden 1989 Paneurooppalaisen piknikin paikka.',
    lahde: 'en-Wikipedia "Sopron", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Soprónia kutsutaan uskollisimmaksi kaupungiksi?',
      vaihtoehdot: [
        'Torjui osmanien piirityksen',
        'Pysyi keisarin puolella 1848',
        'Maksoi veronsa valittamatta',
        'Äänesti Unkariin kuulumisesta',
      ],
      oikea: 3,
      fakta: 'Soprónin rajalla vuonna 1989 pidetyssä Paneurooppalaisessa piknikissä yli 600 itäsaksalaista pakeni länteen.',
    },
  },
  {
    id: 'hahmotelma-jak',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-jak-91fc7eed.jpg',
      lyhyt: 'Ják-kirkon kaksitorninen länsijulkisivu ja portaali.',
      selite: 'Romaanisen apottikirkon julkisivu kahden teräväkärkisen tornin välissä. Alhaalla näkyy koristeellinen portaali apostoli- ja Kristus-veistoksineen.',
      lahde: 'Valokuva: Tatra623, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Tatra623',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:J%C3%A1k_church.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-jak-dad34fba.jpg',
        lyhyt: 'Ják-kirkon romaaninen portaali lähikuvassa.',
        selite: 'Portaalin sisäänkäynti on koristettu monikerroksisin kaarin, ja sen yläpuolella on rivi pyhien hahmojen veistoksia. Ovella on kivileijonat.',
        lahde: 'Valokuva: Nxr-at, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nxr-at',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_portal_of_Abbey_church_in_J%C3%A1k_01.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-jak-5803511f.jpg',
        lyhyt: 'Ják-kirkko sivusta katsottuna, vasemmalla pyöreä kappeli.',
        selite: 'Kirkon tornit, pitkä päälaiva ja pyöreät apsikset näkyvät sivusta. Vasemmalla on valkoinen pyöreä kappeli.',
        lahde: 'Valokuva: Tatra623, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tatra623',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:J%C3%A1k_templom.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ják',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka perusti Jákin benediktiiniluostarin?',
      'Minkä tyylinen Jákin kirkko on?',
    ],
    korostukset: ['romaaninen|romaaninen'],
    nappi: 'Benediktiiniluostarin romaaninen kirkko Länsi-Unkarissa',
    // 16.58244 E / 47.13931 N — en-Wikipedia "Ják"
    laudat: {
      maailmankartta: { x: 6386.1, y: 1512.7 },
      europe: { x: 529.6, y: 653.8 },
    },
    teksti: 'Ják on kylä Vasin läänissä Unkarin läntisellä rajalla. Kylän Pyhän Yrjön '
      + 'seurakuntakirkko on Unkarin parhaiten säilynyt romaaninen kirkko, ja se rakennettiin '
      + 'alun perin benediktiiniluostarin kirkoksi, jonka perusti kreivi Martin Ják. Kirkko '
      + 'on koristettu sekä ulkoa että sisältä rikkailla veistoksilla, ja sen kolme laivaa ja '
      + 'kolme apsidia muodostavat basilikarakenteen. Pylväänpäät on veistetty kasvi- ja '
      + 'eläinaiheilla, ja pääoven edessä oli aikoinaan kylän rotunda.',
    lahde: 'en-Wikipedia "Ják", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tata',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-tata-e91152c2.jpg',
      lyhyt: 'Tatan linna heijastuu Öreg-tó-järven pintaan.',
      selite: 'Järven rannalla kohoava linna, jonka ympärillä on kiviset linnamuurit. Linna heijastuu tyynestä vedestä.',
      lahde: 'Valokuva: Barry dinning, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Barry dinning',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tata_Castle_5.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-tata-99ef6a2e.jpg',
        lyhyt: 'Tatan linna ja vallit Öreg-tó-järven puolelta.',
        selite: 'Linnaa ympäröivät vanhat kivimuurit, joiden edessä on järven vesi. Kuva on otettu järven toiselta rannalta.',
        lahde: 'Valokuva: EtelkaCsilla, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'EtelkaCsilla',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tatai_v%C3%A1r-_az_%C3%96reg_t%C3%B3_fel%C5%91l.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-tata-e95a2ae3.jpg',
        lyhyt: 'Tatan linnan tornirakennus ja kaari-ikkunainen siipi linnan pihalta nähtynä.',
        selite: 'Linnan pihasta katsottuna näkyy kivinen tornirakennus ja kaari-ikkunoin varustettu siipi. Etualalla on vanhojen muurien jäännöksiä.',
        lahde: 'Valokuva: Antissimo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Antissimo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_Tata_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tata',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka kuningas rakennutti Tatan linnan uudelleen renessanssityyliin?',
      'Kuka päällikkö puolusti Tatan linnaa vuonna 1526?',
    ],
    korostukset: ['Corvinus|Corvinuksen'],
    nappi: 'Matthias Corvinuksen renessanssilinna, joka kestää osmanien hyökkäykset',
    // 18.3238 E / 47.6526 N — en-Wikipedia "Tata, Hungary"
    laudat: {
      maailmankartta: { x: 6444.1, y: 1491 },
      europe: { x: 563, y: 640.3 },
    },
    teksti: 'Tata on Komárom-Esztergomin läänin kaupunki Luoteis-Unkarissa, noin 70 kilometrin '
      + 'päässä Budapestista Gerecsen ja Vértesin vuorten välisessä laaksossa. Sen '
      + 'ensimmäinen maininta on vuodelta 1221. Linnan rakennutti Lackfin suku, ja sen '
      + 'kukoistuskausi oli Matthias Corvinuksen aikana, jonka määräyksestä se rakennettiin '
      + 'uudelleen renessanssityyliin. Kun turkkilaiset voittivat Mohácsin taistelun vuonna '
      + '1526 ja kuningas Ludvig II kaatui, linnan päällikkö kreivi György Cseszneky puolusti '
      + 'linnaa onnistuneesti ryöstelevältä osmanien armeijalta. Osmanien vallan aikana Tatan '
      + 'linna oli tärkeä linnoitus.',
    lahde: 'en-Wikipedia "Tata, Hungary", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-diosgyor',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-diosgyor-259a384f.jpg',
      lyhyt: 'Diósgyőrin linnan kulmatornit ja muurit.',
      selite: 'Restauroitu linna kohoaa Miskolcin Diósgyőrin kaupunginosassa. Kuvassa näkyvät nelikulmaiset kivitornit ja ulkomuurin jäänteet.',
      lahde: 'Valokuva: ArBePa, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ArBePa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Diosgyori_var8%281%29.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-diosgyor-acde6f2e.jpg',
        lyhyt: 'Vesivärimaalaus Diósgyőrin linnan rauniotorneista vuonna 1921.',
        selite: 'Ödön Bartuksen maalaus vuodelta 1921 esittää linnan rauniona ennen restaurointia. Etualalla on kylän talot ja lammikko.',
        lahde: 'Maalaus: Ödön Bartus, Wikimedia Commons (public domain).',
        tekija: 'Ödön Bartus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bartus_%C3%96d%C3%B6n_%E2%80%93_A_di%C3%B3sgy%C5%91ri_v%C3%A1r_%281921%29.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-diosgyor-560e07f6.jpg',
        lyhyt: 'Diósgyőrin linnan sisäpiha kaarikäytävineen.',
        selite: 'Linnan restauroitu sisäpiha on päällystetty kiveyksellä, ja ympärillä kulkee kaarien tukema parveke. Taustalla kohoaa kivitorni ja etäämmällä metsäisiä kukkuloita.',
        lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palickap',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Di%C3%B3sgy%C5%91r,_v%C3%A1r_%2803%29.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Diósgyőrin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Diósgyőr tarkoittaa?',
      'Minkä kuninkaan aikana linna kukoisti?',
    ],
    korostukset: ['Ludvig Suuri|Ludvig Suuren'],
    nappi: 'Kuninkaiden entinen lomalinna, joka menetti sotilaallisen merkityksensä osmanien ajan jälkeen',
    // 20.68333333 E / 48.1 N — en-Wikipedia "Diósgyőr"
    laudat: {
      maailmankartta: { x: 6522.8, y: 1472 },
      europe: { x: 608.3, y: 628.6 },
    },
    teksti: 'Diósgyőr on historiallinen kaupunki Unkarissa, nykyään osa Miskolcia, ja sen '
      + 'keskiaikainen linna oli Unkarin kuninkaiden ja kuningattarien suosikkiloma-asunto. '
      + 'Nimi tulee sanoista dió eli saksanpähkinä ja győr, vanha muoto sanasta gyűrű eli '
      + 'rengas, joka viittaa ensimmäisen linnan pyöreään muotoon. Ensimmäinen linna '
      + 'rakennettiin luultavasti 1100-luvulla mutta tuhoutui mongolien hyökkäyksessä; '
      + 'nykyinen linna rakennettiin todennäköisesti Béla IV:n aikana 1200-luvulla. Linnan '
      + 'kukoistuskausi oli Ludvig Suuren hallituskaudella, ja vuonna 1364 lähellä oleva '
      + 'Miskolc liitettiin Diósgyőrin tilaan. Osmanit valtasivat alueen vuoden 1596 jälkeen, '
      + 'ja linna menetti sotilaallisen merkityksensä.',
    lahde: 'en-Wikipedia "Diósgyőr", johdanto-osa ja osio "The history of Diósgyőr and the '
      + 'castle" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sumeg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sumeg-a7a8acea.jpg',
      lyhyt: 'Sümegin linna kohoaa kukkulan huipulla.',
      selite: 'Linna sijaitsee Sümegin yläpuolella kartiomaisella kukkulalla. Kuvassa näkyvät linnan muurit ja punakattoiset tornit.',
      lahde: 'Valokuva: Peter Stehlik, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Peter Stehlik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hungary,_S%C3%BCmeg_Castle.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-sumeg-d8ffdaa6.jpg',
        lyhyt: 'Sümegin linnan sisäpiha tykkeineen ja kiviseinineen.',
        selite: 'Linnan sisäpihalla on vanhan mallinen tykki ja kivestä muurattuja seiniä. Puuportaat johtavat ylemmille kerroksille.',
        lahde: 'Valokuva: Qasinka, Wikimedia Commons (CC0).',
        tekija: 'Qasinka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2016_S%C3%BCmeg_Castle_2.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Sümegin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka kuningas rakennutti Sümegin linnan?',
      'Minkä hyökkäyksen aikana kuningas asui linnassa?',
    ],
    korostukset: ['Béla IV|Béla IV'],
    nappi: 'Linnanmäen huipulla oleva rajalinnoitus, jonka itävaltalaiset polttivat 1713',
    // 17.2825 E / 46.9825 N — en-Wikipedia "Castle of Sümeg"
    laudat: {
      maailmankartta: { x: 6409.4, y: 1519.3 },
      europe: { x: 543, y: 658 },
    },
    teksti: 'Sümegin linna on Sümegin kaupungin luona Veszprémin läänissä oleva linna. Béla IV '
      + 'rakennutti sen 1200-luvun puolivälissä tai lopulla Linnanmäen huipulle noin 32 '
      + 'kilometriä Balatonilta pohjoiseen, ja hän asui siellä mongolien hyökkäyksen aikana '
      + '1241–1242. Myöhemmin Stefanus V lahjoitti sen Veszprémin roomalaiskatoliselle '
      + 'arkkihiippakunnalle. Vuonna 1552, kun turkkilaiset valtasivat Veszprémin, linna '
      + 'rakennettiin uudelleen ja vahvistettiin rajalinnoitukseksi, ja vuonna 1713 '
      + 'itävaltalaisjoukot sytyttivät sen tuleen Rákóczin vapaussodan jälkeen. Linnaa '
      + 'pidetään Unkarin parhaiten säilyneenä linnoituksena.',
    lahde: 'en-Wikipedia "Castle of Sümeg", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ipolytarnoc',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-ipolytarnoc-417c152a.jpg',
      lyhyt: 'Ilmakuva Ipolytarnócin fossiilialueesta: kävijäkeskus ja metsäinen laakso.',
      selite: 'Ilmakuvassa näkyy Ipolytarnócin fossiilien luonnonsuojelualueen kävijäkeskus, lampi ja ympäröivä metsä.',
      lahde: 'Valokuva: VargaA, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'VargaA',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nature_Reserve_Ipolytarn%C3%B3c_Fossils_Aerial.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-ipolytarnoc-215b977e.jpg',
        lyhyt: 'Ipolytarnócin kävijäkeskuksen aaltomainen valkoinen julkisivu ja sisäänkäynti.',
        selite: 'Kuvassa on Ipolytarnócin kävijäkeskuksen sisäänkäynti, jonka kyltissä lukee Ősfenyő.',
        lahde: 'Valokuva: Darinko, Wikimedia Commons (public domain).',
        tekija: 'Darinko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ipolytarnoc_01.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Ipolytarnóc',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä Ipolytarnócia joskus kutsutaan?',
      'Mikä sai fossiilit säilymään?',
    ],
    korostukset: ['fossiili|fossiileja'],
    nappi: 'Tulivuoren tuhkaan hautautunut viidakko odottaa tutkijoita; geologinen polku avataan vasta 1986',
    // 19.62635 E / 48.2365 N — en-Wikipedia "Ipolytarnóc"
    laudat: {
      maailmankartta: { x: 6487.5, y: 1466.1 },
      europe: { x: 588, y: 625 },
    },
    teksti: 'Ipolytarnóc on kylä Nógrádin läänissä, ja sen lähellä on Ipolytarnócin fossiilien '
      + 'luonnonsuojelualue. Paikkaa kutsutaan joskus esihistorialliseksi Pompejiksi: siellä '
      + 'on 17–23 miljoonaa vuotta vanhoja fossiileja, joihin kuuluu 24 hailajin hampaita, '
      + 'lähes 100 metriä korkea kivettynyt mänty, yli 15 000 subtrooppista lehteä ja yli 3 '
      + '000 eläimen jalanjälkeä 11 lajilta. Fossiilit säilyivät, koska tulivuoren purkaus '
      + 'hautasi koko subtrooppisen viidakon tuhkan alle. Alue on suojeltu vuodesta 1944, ja '
      + 'geologinen polku avattiin yleisölle vuonna 1986.',
    lahde: 'en-Wikipedia "Ipolytarnóc", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-szentendre',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-szentendre-7b07b00b.jpg',
      lyhyt: 'Szentendren Fő tér: kivipäällystetty tori, vanhat talot ja kivinen ristipylväs.',
      selite: 'Kuvassa on Szentendren vanhankaupungin Fő tér -tori, jonka reunustalla on värikkäitä vanhoja rakennuksia ja tornin huippu kohoaa talojen takaa.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20190502_F%C5%91_t%C3%A9r_Szentendre_1250_2069_DxO.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-szentendre-ff11e9ed.jpg',
        lyhyt: 'Olkikattoinen talonpoikaistalo ja puinen kellotorni Szentendren ulkoilmamuseossa.',
        selite: 'Kuvassa on Unkarin ulkoilmamuseon (Skanzen) alueella valkoiseksi rapattu, olkikattoinen talo ja lastukattoinen puinen kellotorni.',
        lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Palickap',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szentendre,_Skanzen_74.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Szentendre',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Milloin Szentendre sai kaupunkioikeudet?',
      'Mikä Szentendren museo on Unkarin tunnetuin?',
    ],
    korostukset: ['taiteilija|taiteilijoistaan'],
    nappi: 'Barokkikaupunki Tonavan mutkassa, joka sai kaupunkioikeudet vuosi sitten (1872)',
    // 19.06858 E / 47.7044 N — en-Wikipedia "Szentendre"
    laudat: {
      maailmankartta: { x: 6469, y: 1488.8 },
      europe: { x: 577.3, y: 639 },
    },
    teksti: 'Szentendre on jokivarsikaupunki Pestin läänissä Budapestin ja Pilis-Visegrádin '
      + 'vuorten välissä, ja se tunnetaan museoistaan, gallerioistaan ja taiteilijoistaan. '
      + 'Nimi perustuu keskiaikaiseen latinankieliseen muotoon Sankt Andrae eli Pyhä Andreas, '
      + 'ja se mainitaan ensimmäisen kerran vuonna 1146 erään opiskelijan testamentissa. Kun '
      + 'osmanit oli ajettu pois, alueelle muutti ulkomaisia uudisasukkaita, ja kaupungin '
      + 'vaurauden näkee barokkitaloista; Szentendre sai kaupunkioikeudet vuonna 1872. '
      + 'Rauhallinen maakuntaelämä on houkutellut taiteilijoita 1900-luvun alusta, ja '
      + 'Szentendren taiteilijayhdyskunta perustettiin vuonna 1929. Unkarin ulkoilmamuseo '
      + 'Skanzen perustettiin vuonna 1967.',
    lahde: 'en-Wikipedia "Szentendre", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kalocsa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-kalocsa-95790acf.jpg',
      lyhyt: 'Kalocsan arkkipiispankatedraalin kaksi kellotornia ja patsaat julkisivun huipulla.',
      selite: 'Kuvassa on Kalocsan arkkipiispallisen katedraalin barokkijulkisivun yläosa: kaksi kellotornia ja niiden välissä patsaat.',
      lahde: 'Valokuva: Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pasztilla aka Attila Terbócs',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalocsa,_%C3%A9rseki_sz%C3%A9kesegyh%C3%A1z_2020_05.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-kalocsa-d54324a6.jpg',
        lyhyt: 'Kalocsa-tyylinen värikäs kukkakoruompelu valkoisella kankaalla.',
        selite: 'Kuvassa on Kalocsan koruompelun tyyliin tehty kukkakuvio, jossa on punaisia, keltaisia, violetteja ja vaaleanpunaisia kukkia sekä vihreitä lehtiä.',
        lahde: 'Valokuva: さえぼー, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'さえぼー',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalocsa_embroidery_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kalocsa',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä mausteen viljelystä Kalocsa on tunnettu?',
      'Mikä rakennus Kalocsassa on tähtitieteen käytössä?',
    ],
    korostukset: ['paprika|paprikan'],
    nappi: 'Arkkipiispan kaupunki Tonavan rannalla, jossa paprikaa viljellään',
    // 18.98579 E / 46.53347 N — en-Wikipedia "Kalocsa"
    laudat: {
      maailmankartta: { x: 6466.2, y: 1538.1 },
      europe: { x: 575.7, y: 669.8 },
    },
    teksti: 'Kalocsa on Bács-Kiskunin läänin kaupunki Tonavan vasemman rannan lähellä, 142 '
      + 'kilometriä Budapestista etelään, ja se on yksi Unkarin vanhimmista kaupungeista sekä '
      + 'yhden maan neljästä katolisesta arkkipiispasta istuin. Kaupungissa on hieno '
      + 'katedraali, arkkipiispan palatsi, tähtitorni, pappisseminaari ja opettajakouluja. '
      + 'Asukkaat ja kaupungin laajat yhteismaat elävät pääasiassa paprikan, hedelmien, '
      + 'pellavan, hampun ja viljan viljelystä sekä vesilintujen pyynnistä ja kalastuksesta. '
      + 'Nykyinen arkkipiispakunta perustettiin noin vuonna 1135, ja sen edeltäjäksi sanotaan '
      + 'kuningas Tapani Pyhän vuonna 1000 perustamaa piispakuntaa.',
    lahde: 'en-Wikipedia "Kalocsa", johdanto-osa ja osio "Description" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä kasvin viljelystä kalocsalaiset elävät muun muassa?',
      vaihtoehdot: [
        'Riisistä',
        'Tupakasta',
        'Paprikasta',
        'Sokerijuurikkaasta',
      ],
      oikea: 2,
      fakta: 'Kalocsan ensimmäinen arkkipiispa Asztrik toi kruunun paavilta Tapanille.',
    },
  },
  {
    id: 'hahmotelma-villany',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-villany-278167ce.jpg',
      lyhyt: 'Tynnyririvit tiilivetoisessa viinikellarissa Villányssa.',
      selite: 'Kuvassa on Bock-viinitilan kellari Villányssa: puutynnyreitä pitkän tiilikaarisen käytävän varrella.',
      lahde: 'Valokuva: Thaler Tamas, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Thaler Tamas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BockPinceFotoThalerTamas.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-villany-66b136b0.jpg',
        lyhyt: 'Viinitarhoja Villányn länsipuolella Szársomlyó-vuoren juurella.',
        selite: 'Kuvassa on viiniköynnösrivejä ja niiden takana Szársomlyó-vuoren rinne Villányn länsipuolella.',
        lahde: 'Valokuva: Jacquesverlaeken, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jacquesverlaeken',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vineyards_ouest_of_Villany_257.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Villány',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mitä nimi Villány tarkoittaa?',
      'Mitkä alueet kohtaavat Villányn kohdalla?',
    ],
    korostukset: ['viini|viinistään'],
    nappi: 'Salaman kaupunki Baranyan viinikukkuloilla; postitoimisto avattiin 1867',
    // 18.45562 E / 45.86951 N — en-Wikipedia "Villány"
    laudat: {
      maailmankartta: { x: 6448.5, y: 1565.8 },
      europe: { x: 565.5, y: 687.2 },
    },
    teksti: 'Villány on Baranyan läänin kaupunki, joka on kuuluisa viinistään. Nimi tulee unkarin '
      + 'sanasta villám eli salama. Kaupunki sijaitsee kolmen suuren maantieteellisen alueen '
      + 'kohtaamispaikassa: Suuri Unkarin tasanko on etelässä, Baranyan kukkulat pohjoisessa '
      + 'ja Villányn vuoret lännessä; tasangolla harjoitetaan maataloutta, ja vuoret ja '
      + 'kukkulat sopivat viininviljelyyn. Vuoteen 1945 asti asukkaat olivat Tonavan '
      + 'švaabeja. Kaupungin lähellä sijaitsevasta fossiilipaikasta on löydetty runsaasti '
      + 'alapleistoseenin selkärankaisten fossiileja.',
    lahde: 'en-Wikipedia "Villány", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-fertod',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-fertod-81b1fa68.jpg',
      lyhyt: 'Eszterházan palatsin barokkijulkisivu, kaareva siipi ja puutarha Fertődissä.',
      selite: 'Kuvassa on Esterházy-palatsin pääsisäänkäynti kaksihaaraisine portaineen sekä kaareva sivusiipi ja leikatut puutarhakuviot etualalla.',
      lahde: 'Valokuva: Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pasztilla aka Attila Terbócs',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fert%C5%91d,_Esterh%C3%A1zy-kast%C3%A9ly_2022_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-fertod-2e969ff0.jpg',
        lyhyt: 'Palatsin kunniapiha suihkulähteineen ja muotopuutarhoineen.',
        selite: 'Kuvassa on Eszterházan palatsin kunniapiha (Ehrenhof) ylhäältä katsottuna: suihkulähde, kuvioidut nurmikot ja punakattoiset sivusiivet.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fert%C3%B6d_Schloss_Eszterh%C3%A1zy_Ehrenhof_2.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-fertod-5403ac92.jpg',
        lyhyt: 'Kullattuja enkelinpäitä palatsin kappelin koristeissa.',
        selite: 'Lähikuvassa on kullattuja enkelipäitä ja siivet Esterházy-palatsin kappelin barokkikoristeluissa.',
        lahde: 'Valokuva: Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pasztilla aka Attila Terbócs',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fert%C5%91d,_Esterh%C3%A1zy-kast%C3%A9ly_k%C3%A1poln%C3%A1ja_2022_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Fertőd (Eszterháza)',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka ruhtinas rakennutti Eszterházan palatsin?',
      'Millä vuosikymmenellä palatsi rakennettiin?',
    ],
    korostukset: ['Esterházy|Esterházyn'],
    nappi: 'Ruhtinas Esterházyn 1760-luvulla rakennuttama palatsi Itävallan rajan lähellä',
    // 16.88144 E / 47.61866 N — en-Wikipedia "Fertőd"
    laudat: {
      maailmankartta: { x: 6396, y: 1492.4 },
      europe: { x: 535.3, y: 641.2 },
    },
    teksti: 'Fertőd on Győr-Moson-Sopronin läänin kaupunki lähellä Itävallan rajaa. Se '
      + 'muodostettiin vuonna 1950, kun Eszterházan ja Süttörin kaupungit yhdistettiin. '
      + 'Kaupungissa on yksi Unkarin tunnetuimmista palatseista, Eszterháza, jonka ruhtinas '
      + 'Nikolaus I Esterházy rakennutti 1760-luvulla. Vaikutusvaltaisen Esterházyn suvun '
      + 'jäseniä on haudattu suvun hautausmaalle noin kaksi kilometriä palatsista koilliseen.',
    lahde: 'en-Wikipedia "Fertőd", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mezokovesd',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-mezokovesd-45002bc4.jpg',
      lyhyt: 'Kolme tyttöä matyó-kansanpuvuissa kulkee Mezőkövesdin Mátyás király -katua vuonna 1948.',
      selite: 'Mustavalkoinen valokuva Mezőkövesdin Mátyás király -kadulta vuodelta 1948. Tytöt kantavat raidoitettuja ja kirjailtuja matyó-hameita ja röyhelöhihaisia paitoja.',
      lahde: 'Valokuva: Fortepan / Lissák Tivadar, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Fortepan / Lissák Tivadar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mez%C5%91k%C3%B6vesd_1948,_M%C3%A1ty%C3%A1s_kir%C3%A1ly_%C3%BAt._L%C3%A1nyok_maty%C3%B3_n%C3%A9pviseletben._Fortepan_73059.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-mezokovesd-b050f6ef.jpg',
        lyhyt: 'Musta matyó-hame, jonka helmaa koristavat punaiset ruusut ja värikkäät kukat.',
        selite: 'Kuvassa roikkuu musta hame, jonka helmassa on tiheää, värikästä matyó-kirjontaa ja mustaa tupsureunusta. Kukka-aiheet ovat matyó-kirjonnan tunnusmerkki.',
        lahde: 'Valokuva: Naturpuur, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Naturpuur',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maty%C3%B3_embroidery_from_Hungury,_EU.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-mezokovesd-9508ed40.jpg',
        lyhyt: 'Mezőkövesdin Matyó-Vár-lahjatavarakaupan julkisivu on maalattu matyó-kukkakuvioin.',
        selite: 'Kaupan valkoisen seinän reunoja kehystävät punaiset ja siniset matyó-tyyliset kukkakoristeet. Kauppa myy matyó-kansantaiteen tuotteita Mátyás király -kadulla.',
        lahde: 'Valokuva: Globetrotter19, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Globetrotter19',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maty%C3%B3-V%C3%A1r_Aj%C3%A1nd%C3%A9kbolt,_2018_Mez%C5%91k%C3%B6vesd.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Mezőkövesd',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kenen kuninkaan nimestä matyó-kansan nimen arvellaan tulevan?',
      'Milloin rautatie ulottui Mezőkövesdiin?',
    ],
    korostukset: ['matyó|matyó-kansan'],
    nappi: 'Matyó-kansan kaupunki, jonne rautatie tuli 1860',
    // 20.58333333 E / 47.81666667 N — en-Wikipedia "Mezőkövesd"
    laudat: {
      maailmankartta: { x: 6519.4, y: 1484 },
      europe: { x: 606.4, y: 636 },
    },
    teksti: 'Mezőkövesd on kaupunki Borsod-Abaúj-Zemplénin läänissä Pohjois-Unkarissa, 50 '
      + 'kilometrin päässä Miskolcista ja 15 kilometrin päässä Egeristä. Vuonna 1464 kaupunki '
      + 'sai sinetin ja etuoikeuksia kuningas Matthias Corvinukselta, ja matyó-kansan nimen '
      + 'arvellaan tulevan hänen nimestään. Turkkilaiset miehittivät kaupungin vuonna 1544, '
      + 'ja se tuhoutui täysin vuonna 1552 ja uudelleen vuonna 1596, eikä sitä '
      + 'jälleenrakennettu lähes sataan vuoteen. Vuonna 1784 kaupunki vapautui '
      + 'feodaalivelvoitteistaan, ja rautatie ulottui sinne vuonna 1860. Matyó-talot ja '
      + '1800-luvun maalaiskaupungin tunnelmaa henkivät kadut ovat nähtävyys, ja matyó-museo '
      + 'esittelee kansan perinnettä.',
    lahde: 'en-Wikipedia "Mezőkövesd", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-godollo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-godollo-f247499a.jpg',
      lyhyt: 'Gödöllön kuninkaallisen linnan sisäpiha ja kupolin kruunaama päärakennus kesäpäivänä.',
      selite: 'Barokkilinnan päärakennuksen keskiosa kellotauluineen ja punaruskeine kupoleineen avautuu sisäpihalle. Julkisivun ikkunoita reunustavat vaaleanpunainen ja vaaleansininen rokokoo-koristelu.',
      lahde: 'Kuva: Zizzi, Wikimedia Commons (public domain).',
      tekija: 'Zizzi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:G%C3%B6d%C3%B6ll%C5%91i_Grassalkovich-kast%C3%A9ly_udvara.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-godollo-663b53af.jpg',
        lyhyt: 'Gödöllön linnan julkisivun kolme korkeaa kaari-ikkunaa ja koristeellinen rautaparveke.',
        selite: 'Lähikuvassa näkyvät stukkokoristeiset ikkunakehykset ja taottu rautaparveke, jonka keskellä on Grassalkovichien vaakuna. Väreinä ovat vaaleanpunainen, valkoinen ja vaaleansininen.',
        lahde: 'Valokuva: Rlevente, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Rlevente',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Royal_Palace_of_G%C3%B6d%C3%B6ll%C5%91_003.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Gödöllön palatsi',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä ylimyssuku rakennutti Gödöllön palatsin alun perin?',
      'Kenelle palatsi lahjoitettiin vuonna 1867?',
    ],
    korostukset: ['Grassalkovich|Grassalkovichin'],
    nappi: 'Kuninkaallinen kesäpaikka, jonka Unkarin valtio lahjoitti Frans Joosefille ja Sisille vuonna 1867',
    // 19.3667 E / 47.6 N — en-Wikipedia "Gödöllő"
    laudat: {
      maailmankartta: { x: 6478.9, y: 1493.2 },
      europe: { x: 583, y: 641.7 },
    },
    teksti: 'Gödöllő on Pestin läänin kaupunki noin 30 kilometriä Budapestin laitamilta '
      + 'koilliseen. Sen palatsin rakennutti alun perin Grassalkovichin ylimyssuku, ja '
      + 'myöhemmin Itävallan keisari ja Unkarin kuningas Frans Joosef ja hänen puolisonsa '
      + 'Elisabeth eli Sisi viettivät siellä kesiään. Unkarin valtio osti kartanon takaisin '
      + 'belgialaiselta pankilta maaliskuussa 1867 ja lahjoitti sen palatsineen Frans '
      + 'Joosefille ja Elisabethille kruunajaislahjaksi; siitä lähtien kuninkaallinen perhe '
      + 'vietti siellä pääasiassa kevättä ja syksyä, mikä nosti kaupungin elämää '
      + 'merkittävästi. Pohjoinen rautatie kulkee kaupungin läheltä kuninkaallisen kesäpaikan '
      + 'vuoksi, ja kaasutehdas valmistui vuoteen 1874 mennessä.',
    lahde: 'en-Wikipedia "Gödöllő", johdanto-osa ja osio "Habsburg rule" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kenelle Unkarin valtio lahjoitti Gödöllön palatsin vuonna 1867 kruunajaislahjaksi?',
      vaihtoehdot: [
        'Kuningas Matthias Corvinukselle',
        'Ruhtinas Nikolaus Esterházylle',
        'Frans Joosefille ja Sisille',
        'Kreivi Gyula Andrássylle',
      ],
      oikea: 2,
      fakta: 'Kuninkaallisen kesäpaikan vuoksi pohjoinen rautatie kulkee Gödöllön läheltä.',
    },
  },
  {
    id: 'hahmotelma-gyula',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-gyula-32e703d9.jpg',
      lyhyt: 'Gyulan punatiilinen linna, sen tornit ja ratsastajapatsas sinistä taivasta vasten.',
      selite: 'Gyulan goottilainen tiililinna kohoaa muurinsyrjien ja vartiotornin kanssa. Etualalla on ratsastajapatsas tiilijalustalla, ja muurien päällä liehuu lippuja.',
      lahde: 'Valokuva: Szalax, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Szalax',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gyula_Castle_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-gyula-e1ccf371.jpg',
        lyhyt: 'Gyulan Várfürdő-kylpylän punatiilinen pääsisäänkäynti.',
        selite: 'Kylpylän sisäänkäyntirakennus on tiilinen ja muistuttaa muodoltaan linnan tornia. Sisäänkäynnin edessä on kukkapylväitä ja pyöräparkki.',
        lahde: 'Valokuva: Visitgyula2024, Wikimedia Commons (CC0).',
        tekija: 'Visitgyula2024',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gyulai-varfurdo-bejarat.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Gyula',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka Unkarin kansallislaulun säveltäjä syntyi Gyulassa?',
      'Kuinka kauan linnan puolustajat kestivät piirityksen vuonna 1566?',
    ],
    korostukset: ['Erkel|Erkel'],
    nappi: 'Tiililinna Fehér-Körösin varrella; Erkelin, kansallislaulun säveltäjän, syntymäkaupunki',
    // 21.28333333 E / 46.65 N — en-Wikipedia "Gyula, Hungary"
    laudat: {
      maailmankartta: { x: 6542.8, y: 1533.2 },
      europe: { x: 619.8, y: 666.7 },
    },
    teksti: 'Gyula on Békésin läänin kaupunki Suurella Unkarin tasangolla Fehér-Körös-joen '
      + 'varrella, 235 kilometriä Budapestista kaakkoon ja viiden kilometrin päässä Romanian '
      + 'rajasta. Se on tunnetuin keskiaikaisesta linnastaan ja lämpökylpylästään, ja '
      + 'kaupungissa ovat syntyneet Unkarin kansallislaulun säveltäjä Ferenc Erkel sekä '
      + 'Albrecht Dürerin isä. Ensimmäinen maininta on vuodelta 1313, ja linnan rakennus '
      + 'alkoi 1300-luvulla mutta valmistui vasta 1500-luvun puolivälissä. Heinäkuun 1566 '
      + 'alussa 27 000–30 000 miehen osmanien armeija piiritti 2 000 miehen linnaa, ja '
      + 'puolustajat antautuivat 59–63 päivän piirityksen jälkeen; mikään muu 1500-luvun '
      + 'unkarilaislinna ei kestänyt piirittäjiä niin kauan.',
    lahde: 'en-Wikipedia "Gyula, Hungary", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-opusztaszer',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-opusztaszer-cac056ad.jpg',
      lyhyt: 'Ópusztaszerin rotunda-rakennus, jonka sisällä Feszty-panoraama on esillä, järven takana.',
      selite: 'Suuri kartiomainen, metallikattoinen rotunda kohoaa kansallisen perintöpuiston järven takana. Feszty-panoraama on tässä rakennuksessa.',
      lahde: 'Valokuva: Pasztilla (Attila Terbócs), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pasztilla (Attila Terbócs)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%93pusztaszeri_Nemzeti_T%C3%B6rt%C3%A9neti_Eml%C3%A9kpark,_Rotunda_2021_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-opusztaszer-38006e19.jpg',
        lyhyt: 'Yksityiskohta Árpád Fesztyn panoraamamaalauksesta: kaapuun pukeutunut hahmo kohottaa kätensä rovion ääressä.',
        selite: 'Maalauksessa kaapuun pukeutunut hahmo levittää kätensä hirsirovion edessä, ja vieressä seisoo parrakas mies kaareva sapeli kädessään. Kuva on yksityiskohta Árpád Fesztyn Unkarilaisten saapuminen -panoraamasta.',
        lahde: 'Maalaus: Árpád Feszty, Wikimedia Commons (public domain).',
        tekija: 'Árpád Feszty',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Feszty-korkep.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-opusztaszer-86bb2cd1.jpg',
        lyhyt: 'Ópusztaszerin Árpád-muistomerkki, kolonnadi jonka huipulla seisoo patsas.',
        selite: 'Pylväikön huipulla on aseistetun hahmon patsas, ja friisissä lukee 896–1896. Muistomerkki seisoo Ópusztaszerin kansallisessa perintöpuistossa.',
        lahde: 'Valokuva: Pasztilla (Attila Terbócs), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pasztilla (Attila Terbócs)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%93pusztaszeri_Nemzeti_T%C3%B6rt%C3%A9neti_Eml%C3%A9kpark,_%C3%81rp%C3%A1d-eml%C3%A9km%C5%B1_2021_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ópusztaszer',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä tapahtumaa Feszty-panoraama kuvaa?',
      'Minkä juhlan kunniaksi panoraama maalattiin?',
    ],
    korostukset: ['Feszty-panoraama|Feszty-panoraama'],
    nappi: 'Unkarilaisten maahantulon tuhatvuotisjuhla lähestyy; panoraama maalataan vasta 1892–1894',
    // 20.09620278 E / 46.48949167 N — en-Wikipedia "Ópusztaszer National Heritage Park"
    laudat: {
      maailmankartta: { x: 6503.2, y: 1539.9 },
      europe: { x: 597, y: 670.9 },
    },
    teksti: 'Ópusztaszerin kansallinen perintöpuisto on Unkarin historian ulkoilmamuseo '
      + 'Csongrádin läänissä. Se perustettiin vuonna 1982, ja se on kuuluisin '
      + 'Feszty-panoraamasta, Árpád Fesztyn ja hänen apulaistensa maalaamasta syklooramasta, '
      + 'joka kuvaa unkarilaisten maahantulon alkua Karpaattien altaalle vuonna 895. Maalaus '
      + 'valmistui 13. toukokuuta 1894 tapahtuman tuhannennen vuosipäivän kunniaksi; se on 15 '
      + 'metriä korkea ja 120 metriä pitkä ja yksi vain 16 maailman olemassa olevasta '
      + 'syklooramasta. Puisto esittelee myös muinaisen ja varhaisen uuden ajan Unkarin '
      + 'arkeologiaa ja etnografiaa, ja panoraama on ollut pysyvästi esillä vuodesta 1995.',
    lahde: 'en-Wikipedia "Ópusztaszer National Heritage Park", johdanto-osa ja osio "The '
      + 'Rotunda" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä tapahtumaa Ópusztaszerin Feszty-panoraama kuvaa?',
      vaihtoehdot: [
        'Unkarilaisten maahantuloa',
        'Mohácsin taistelua',
        'Budapestin perustamista',
        'Tapani Pyhän kruunajaisia',
      ],
      oikea: 0,
      fakta: 'Panoraaman maisemat maalasi suurelta osin László Mednyánszky.',
    },
  },
  {
    id: 'hahmotelma-herend',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-herend-9eb0fc5b.jpg',
      lyhyt: 'Käsinmaalattuja Herendin posliinilautasia, väripurkkeja ja pensseleitä työpöydällä.',
      selite: 'Pöydällä on kukka- ja perhoskuvioin koristeltuja lautasia ja posliinikiviä sekä laatikollinen jauhemaisia posliiniemalivärejä. Posliinit ovat koristelu- ja maalausvaiheen jälkeen Herendin posliinimuseossa.',
      lahde: 'Valokuva: Davidi Vardi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Davidi Vardi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Painting_process_of_porcelain.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hun-nosto-herend-b1d37b58.jpg',
        lyhyt: 'Katettu pöytä täynnä Herendin posliinia: kuppeja, teekannu, lautasia ja eläinhahmoja.',
        selite: 'Pöydälle on aseteltu kultareunaisia astioita, kalapatsas ja verkkokuvioista posliinia. Pöytä on esillä Herendin posliinitehtaan vierailukeskuksessa.',
        lahde: 'Valokuva: Davidi Vardi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Davidi Vardi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porcelain_product_table.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Herendin posliini',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Kuka otti Herendin tehtaan haltuunsa velkojana vuonna 1839?',
      'Minkä kuningattaren mukaan yksi Herendin kuvioista on nimetty?',
    ],
    korostukset: ['posliini|posliinimanufaktuuri'],
    nappi: 'Herend on jo kuningattaren tilaama; Fischer Farkasházy nimeää itsensä hovihankkijaksi vuonna 1872',
    // 17.75138889 E / 47.13277778 N — en-Wikipedia "Herend Porcelain Manufactory"
    laudat: {
      maailmankartta: { x: 6425, y: 1512.9 },
      europe: { x: 552, y: 654 },
    },
    teksti: 'Herendin posliinimanufaktuuri on unkarilainen yritys, joka on erikoistunut '
      + 'ylellisiin käsinmaalattuihin ja kullattuihin posliiniesineisiin; se perustettiin '
      + 'vuonna 1826, ja se sijaitsee Herendin kaupungissa Veszprémin lähellä. Vince Stingl '
      + 'perusti tehtaan savitavaratehtaaksi, mutta rahat loppuivat, ja hänen velkojansa Mór '
      + 'Fischer otti sen haltuunsa vuonna 1839 ja aloitti taideposliinin valmistuksen; '
      + 'vuoteen 1849 mennessä hän myi tuotteita Unkarin aatelistolle. 1800-luvun '
      + 'puolivälissä tehdas oli Habsburgien hovin ja aristokraattisten asiakkaiden hankkija '
      + 'ympäri Eurooppaa, ja se esitteli töitään Vienissä 1845, Lontoossa 1851, New Yorkissa '
      + '1853 ja Pariisissa 1855. Tilauksia tuli hoveista, muun muassa kuningatar '
      + 'Viktorialta, Frans Joosef I:ltä ja Maximilian I:ltä Meksikosta. Vuonna 1865 Frans '
      + 'Joosef antoi Fischerille aatelisarvon, ja vuodesta 1872 tämä käytti nimeä Mór '
      + 'Fischer Farkasházy, kuninkaallinen hankkija.',
    lahde: 'en-Wikipedia "Herend Porcelain Manufactory", johdanto-osa ja osio "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka otti Herendin tehtaan haltuunsa velkojana vuonna 1839?',
      vaihtoehdot: [
        'Vince Stingl',
        'Mór Fischer',
        'Lajos Kossuth',
        'Prinssi Esterházy',
      ],
      oikea: 1,
      fakta: 'Herendin kuvioita on nimetty ensimmäisten asiakkaiden mukaan, muun muassa kuningatar Viktorian, Esterházyn ja Rothschildin.',
    },
  },
];
