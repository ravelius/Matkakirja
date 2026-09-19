/*
 * ITÄVALLAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin ja Kreikan jälkeen Itävalta.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin ja
 * Kreikan pakat: jokaisella nostolla on valmis sisältö — `teksti` 3–5
 * virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). Vuoden 1873 jälkeiset kohteet (Mayerling
 * 1889, Kreuzensteinin jälleenrakennus 1874–1906, Kitzbühelin hiihto) ovat
 * mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873
 * eteenpäin ("tänne nousee myöhemmin…"). Wienin maailmannäyttelyä 1873
 * ei nosteta (Wienin oma asia).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `aut-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/aut/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * aidosti kaupungin (Wien, Itävallan ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 8 lautayksikön päässä (raja KAUPUNGIN_KOHDALLA_SADE
 * on 7), ja js/fokuskohteet.js liittää rivit KOHDE_MAAT.AUT:iin.
 * `lahi: true` on sama lähizoomiportti kuin Ranskan hahmotelmalla
 * (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Itävallan fokuslehden
 * rajaukseen (`osuuLehteen`) ja on pelin karkean maailmankartan
 * AUT-renkaan sisällä (Itävallassa ei ole saaria eikä rannikkoa).
 */

/** Itävallan hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_AUT = [
  {
    id: 'hahmotelma-neusiedl',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-neusiedl-d726531c.jpg',
      lyhyt: 'Ruovikkokaistat reunustavat kapeaa vesiväylää Neusiedlinjärvellä.',
      selite: 'Kuva on otettu Illmitzin kohdalta Burgenlandista, ja vesiväylän varrella kasvaa tiheää ruovikkoa. Kaukana taustalla näkyy veneiden mastoja.',
      lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Dguendel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Illmitz,_am_Neusiedler_See,_Schilfg%C3%BCrtel.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-neusiedl-7d5f981f.jpg',
        lyhyt: 'Auringonlasku Neusiedlinjärven yllä, etualalla laiturin paaluja ja taustalla purjeveneiden mastoja.',
        selite: 'Kuva on otettu Rustin kohdalta Neusiedlinjärveltä Burgenlandista.',
        lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jakub Hałun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Neusiedl_in_Rust_during_sunset,_20220424_1941_4889.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Neusiedlinjärvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Neusiedlinjärvi on niin matala?',
      'Mikä tekee Neusiedlinjärvestä UNESCO-kohteen?',
    ],
    korostukset: ['suolainen|suolainen'],
    nappi: 'Keski-Euroopan suurin päätyjärvi, joka ulottuu Unkarin puolelle',
    // 16.75 E / 47.83333333 N — en-Wikipedia "Lake Neusiedl"
    laudat: {
      maailmankartta: { x: 6391.7, y: 1483.3 },
      europe: { x: 532.8, y: 635.6 },
    },
    teksti: 'Neusiedlinjärvi eli unkariksi Fertő tó on Keski- ja Länsi-Euroopan suurin päätyjärvi '
      + 'ja Euroopan toiseksi suurin sellainen Kaspianmeren jälkeen; se sijaitsee Itävallan '
      + 'ja Unkarin rajalla. Järvi on suolainen ja kattaa 315 neliökilometriä, josta 240 on '
      + 'Itävallan puolella. Se on pohjoisesta etelään noin 36 kilometriä pitkä ja enintään '
      + '1,8 metriä syvä. Ympäröivä maisema on ollut asuttua noin vuodesta 6000 eaa., ja '
      + 'järven ympärillä olevat kylät ovat vuosisatojen ajan olleet paikallisten ihmisten ja '
      + 'laajempien kulttuurien kauppa- ja kohtaamispaikkoja. UNESCO merkitsi järven ja sen '
      + 'ympäristön maailmanperintöluetteloon vuonna 2001.',
    lahde: 'en-Wikipedia "Lake Neusiedl", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-woerthersee',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-woerthersee-a171b5e5.jpg',
      lyhyt: 'Ilmakuva Wörtherseestä Kärntenissä, taustalla lumihuippuisia Alppeja.',
      selite: 'Ilmakuva näyttää järven pitkänä sinisenä vesialueena vehreiden mäkien ympäröimänä.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_W%C3%B6rthersee_(view_from_the_southeast).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-woerthersee-c987a3c3.jpg',
        lyhyt: 'Maria Wörthin kirkko kohoaa niemellä Wörtherseen rannalla.',
        selite: 'Kirkko sijaitsee pienellä niemellä Maria Wörthin kylässä Wörtherseen rannalla Kärntenissä.',
        lahde: 'Valokuva: Chillibiene, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Chillibiene',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kirche_Maria_W%C3%B6rth_am_W%C3%B6rthersee.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Wörthersee',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Wörthersee on tullut kesäpaikaksi?',
      'Mikä Südbahn oli?',
    ],
    korostukset: ['Südbahn|Südbahn'],
    nappi: 'Kärntenin järvi, jonka rannoille rautatie toi Wienin ylhäisön',
    // 14.15 E / 46.625 N — en-Wikipedia "Wörthersee"
    laudat: {
      maailmankartta: { x: 6305, y: 1534.3 },
      europe: { x: 482.9, y: 667.4 },
    },
    teksti: 'Wörthersee on järvi Itävallan eteläisessä Kärntenin osavaltiossa, ja se on Kärntenin '
      + 'suurin järvi. Järvi on noin 16,5 kilometriä pitkä ja 1,5 kilometriä leveä, ja se '
      + 'ulottuu Klagenfurtin laitamilta Veldenin lahdelle. Sen vesi on erottuvan sinivihreää '
      + 'ja läpinäkyvää, ja rannoilla on tiheitä metsiä, joiden takaa näkyvät lumihuippuiset '
      + 'Alpit. 1800-luvun alussa järven soiset rannat olivat vain muutaman köyhän talonpojan '
      + 'kotina. Kun Itävallan eteläinen rautatie, Südbahn, avattiin Klagenfurtiin vuonna '
      + '1863, Wörthersee muuttui nopeasti Wienin aatelin ja varakkaan porvariston '
      + 'eksklusiiviseksi kesäpaikaksi, ja erityisesti Veldenistä ja Pörtschachista kehittyi '
      + 'päämatkailukohteita.',
    lahde: 'en-Wikipedia "Wörthersee", johdanto-osa ja osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-traunsee',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-traunsee-0656ed0b.jpg',
      lyhyt: 'Traunstein-vuori kohoaa jyrkkänä Traunjärven ylle.',
      selite: 'Yli 1 690 metriä korkea Traunstein nousee suoraan järven rannalta, ja järven pinnalla näkyy pieni vene.',
      lahde: 'Valokuva: Sjunnesson, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Sjunnesson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Traunsee_and_Traunstein_2016.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-traunsee-5d8ba3dc.jpg',
        lyhyt: 'Vanha värikuva Gmundenin kaupungista ja Traunjärvestä vuoristomaisemassa.',
        selite: 'Värillinen valokuva on otettu noin vuoden 1900 tienoilla, ja siinä näkyy Gmundenin kirkontorni sekä Traunjärven takana kohoavat vuoret.',
        lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gmunden_Traunsee_1900.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Traunsee',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Kuinka syvä Traunsee on?',
      'Mikä Lungy on?',
    ],
    korostukset: ['Traunstein|Traunstein'],
    nappi: 'Salzkammergutin syvin järvi, jonka rannalla kohoaa Traunstein',
    // 13.8 E / 47.86666667 N — en-Wikipedia "Traunsee"
    laudat: {
      maailmankartta: { x: 6293.3, y: 1481.9 },
      europe: { x: 476.2, y: 634.7 },
    },
    teksti: 'Traunsee on järvi Salzkammergutissa Ylä-Itävallassa. Sen pinta-ala on noin 24,5 '
      + 'neliökilometriä ja suurin syvyys 191 metriä, joten se on kokonaan Itävallan alueella '
      + 'sijaitsevista järvistä syvin ja tilavuudeltaan suurin; vain rajalla oleva Bodenjärvi '
      + 'on syvempi ja suurempi. Järven pohjoispäässä on Gmunden ja eteläpäässä Ebensee, ja '
      + 'sitä ympäröivät vuoret, joihin kuuluu Traunstein. Järven nähtävyyksiin kuuluu '
      + 'keskiaikainen Schloss Ort -linna. Paikallinen legenda kertoo vesihevosesta, joka '
      + 'asuu järvessä, ja paikalliset kutsuvat sitä nimellä "Lungy".',
    lahde: 'en-Wikipedia "Traunsee", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä olento paikallisen legendan mukaan asuu Traunjärvessä?',
      vaihtoehdot: [
        'Jättiläismäinen vesikäärme',
        'Kultaa vartioiva lohikäärme',
        'Kalanpyrstöinen vedenneito',
        'Järvessä asuva vesihevonen',
      ],
      oikea: 3,
      fakta: 'Traunjärven pohjoispäässä sijaitsee Gmunden ja eteläpäässä Ebensee.',
    },
  },
  {
    id: 'hahmotelma-zell-am-see',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-zell-am-see-28be7e16.jpg',
      lyhyt: 'Zell am Seen kaupunki lepää Zeller Seen rannalla, taustalla lumihuippuinen vuori.',
      selite: 'Järven tyyni pinta heijastaa metsäistä rinnettä, jonka juurella kaupunki sijaitsee.',
      lahde: 'Valokuva: Frans Berkelaar, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Frans Berkelaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zeller_See_by_Zell_am_See_-_Salzburg_-_AT_(48765686192).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-zell-am-see-83eecd6a.jpg',
        lyhyt: 'Näkymä rinteeltä Zeller Seelle ja Zell am Seen kaupunkiin Alppien keskellä.',
        selite: 'Kuva näyttää järven, laakson ja kaupungin sekä taustalla kohoavat Alppien huiput Salzburgin osavaltiossa.',
        lahde: 'Valokuva: Arne Müseler, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Arne Müseler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zell_am_see_zeller_see.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
    ],
    nimi: 'Zell am See',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Missä Zell am See sijaitsee?',
      'Miksi kaupunki on hiihtokeskus?',
    ],
    korostukset: ['Schmittenhöhe|Schmittenhöhe'],
    nappi: 'Alppijärven ranta, jonne Euroopan ylhäisö on tullut jo 1800-luvulta',
    // 12.8 E / 47.31666667 N — en-Wikipedia "Zell am See"
    laudat: {
      maailmankartta: { x: 6260, y: 1505.2 },
      europe: { x: 457, y: 649.2 },
    },
    teksti: 'Zell am See on Zell am Seen piirikunnan hallinnollinen keskus Salzburgin '
      + 'osavaltiossa Itävallassa. Se sijaitsee Kitzbühelin Alpeilla, ja se on tärkeä '
      + 'matkailukohde hiihtokeskustensa ja Zellinjärven rannan vuoksi. Zell am See on ollut '
      + 'Euroopan aateliston suosima talvi- ja kesäpaikka 1800-luvulta lähtien. Kaupunki on '
      + 'noin 80 kilometriä Salzburgista etelään ja 30 kilometriä Itävallan korkeimmasta '
      + 'vuoresta Großglocknerista pohjoiseen, ja sen historiallinen keskusta on 68 metriä '
      + 'syvän Zellinjärven läntisellä rannalla. Kaupungin oma kotivuori on 1 965 metrin '
      + 'korkuinen Schmittenhöhe.',
    lahde: 'en-Wikipedia "Zell am See", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-millstatt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-millstatt-7867f5dc.jpg',
      lyhyt: 'Näkymä Millstätter Seelle, Millstattin kylään ja Reißeckin vuoristoon syksyllä.',
      selite: 'Valokuva on otettu kaakkoon päin: järven takana näkyy Millstattin taajama ja vuoret.',
      lahde: 'Valokuva: Johann Jaritz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Johann Jaritz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Millstatt_am_Millstaetter_See_und_Rei%C3%9Feck_08112015_8850.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-millstatt-1160db81.jpg',
        lyhyt: 'Vanha kaiverros Millstattin luostarista.',
        selite: 'Kaiverros on J. W. Valvasorin Kärntenin topografiateoksesta ja esittää Millstattin luostarin rakennuksia vuoristoisessa maisemassa.',
        lahde: 'Kaiverrus: J. W. Valvasor, Wikimedia Commons (public domain).',
        tekija: 'J. W. Valvasor',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Millstatt_Valvasor.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Millstätter See',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi järvi on niin syvä?',
      'Miksi vesi on lämmintä kesällä?',
    ],
    korostukset: ['vuono|vuonomainen'],
    nappi: 'Kärntenin syvä vuoristojärvi, jonka rannat ovat jyrkät kuin vuonon',
    // 13.57972222 E / 46.795 N — en-Wikipedia "Millstätter See"
    laudat: {
      maailmankartta: { x: 6286, y: 1527.1 },
      europe: { x: 471.9, y: 662.9 },
    },
    teksti: 'Millstätter See eli Millstattin järvi on järvi Kärntenissä Itävallassa. Se sijaitsee '
      + '588 metrin korkeudessa Gurktalin Alpeilla Spittal an der Draun kaupungin lähellä, ja '
      + 'sen pinta-ala on 13,3 neliökilometriä. Se on Kärntenin toiseksi suurin järvi '
      + 'Wörthersee jälkeen, mutta 142 metrin syvyydellään selvästi tilavin. Jyrkkien '
      + 'rantojensa vuoksi järvi on vuonomainen. Pohjoisessa kohoavat jopa 2 100 metrin '
      + 'korkuiset Millstätter Alpe -vuoret suojaavat järveä kylmiltä tuulilta, joten veden '
      + 'lämpötila voi nousta kesällä 25 asteeseen. Järven nimi tulee pohjoisrannalla '
      + 'olevasta Millstattin kauppalasta, ja lähes asumaton eteläranta on ollut suojelualue '
      + 'vuodesta 1970.',
    lahde: 'en-Wikipedia "Millstätter See", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi Millstätter Seen vesi voi lämmetä kesällä jopa 25 asteeseen?',
      vaihtoehdot: [
        'Voimalaitosten lämmin vesi',
        'Matala järvi lämpenee nopeasti',
        'Vuoret suojaavat kylmiltä tuulilta',
        'Pohjasta nousee kuumia lähteitä',
      ],
      oikea: 2,
      fakta: 'Lähes asumaton eteläranta on ollut suojelualue vuodesta 1970.',
    },
  },
  {
    id: 'hahmotelma-oetscher',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-oetscher-e3239c8f.jpg',
      lyhyt: 'Ötscher, Ala-Itävallan kalkkialppien 1 893 metriä korkea huippu, Annabergista katsottuna.',
      selite: 'Kuva näyttää Ötscherin itäpuolelta Annabergin kunnasta metsäisten rinteiden yllä.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Annaberg_-_%C3%96tscher,_Ostansicht.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-oetscher-87f828af.jpg',
        lyhyt: 'Schleierfall-vesiputous virtaa kallioseinämää alas Ötschergräbenin rotkossa.',
        selite: 'Vesiputous sijaitsee Ötscher-Tormäuerin luonnonpuiston Ötschergräbenissä.',
        lahde: 'Valokuva: Haeferl, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Haeferl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Naturpark_%C3%96tscher-Torm%C3%A4uer_-_Schleierfall.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ötscher',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mistä Ötscherin nimi tulee?',
      'Missä Ybbstalin Alpit sijaitsevat?',
    ],
    korostukset: ['Ybbstalin Alppeihin|Ybbstalin Alppeihin'],
    nappi: 'Ala-Itävallan tunnettu huippu, jonka nimi kuulostaa isän pienennösmuodolta',
    // 15.20277778 E / 47.85583333 N — en-Wikipedia "Ötscher"
    laudat: {
      maailmankartta: { x: 6340.1, y: 1482.3 },
      europe: { x: 503.1, y: 635 },
    },
    teksti: 'Ötscher on 1 893 metriä korkea huomattava huippu Ala-Itävallan lounaisosassa. Sen '
      + 'nimellä on slaavilaiset juuret, ja se tarkoittaa suunnilleen sanan isä '
      + 'pienennösmuotoa. Ötscherin seutu kuuluu Ybbstalin Alppeihin, jotka ovat osa '
      + 'Pohjoisia kalkkialppeja. Lilienfeldin ja Scheibbsin piirikuntien raja kulkee suoraan '
      + 'sen huipulla.',
    lahde: 'en-Wikipedia "Ötscher", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-grossvenediger',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-grossvenediger-f6cb324d.jpg',
      lyhyt: 'Vanha värillinen painokuva Großvenedigerin lumihuipuista ja jäätikön kielekkeestä.',
      selite: 'Kuvassa on 1800-luvun painokuva Großvenedigerista: lumipeitteiset huiput, laajat jäätikkövirrat ja jäätikön kieleke tumman kalliorinteen välissä. Kuva on skannattu vanhasta kirjasta.',
      lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
      tekija: 'tekijä tuntematon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grossvenediger_1874.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-grossvenediger-f632629b.jpg',
        lyhyt: 'Alte Prager Hütte ja Schlatenkees-jäätikkö Großvenedigerin juurella.',
        selite: 'Kivinen vuoristomaja ja Schlatenkees-jäätikkö Hohe Tauernin alueella. Jäätikön takana kohoaa Venedigerryhmän huippuja.',
        lahde: 'Valokuva: Whgler, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Whgler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alte_Prager_Hütte_Schlatenkees.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-grossvenediger-95076b1f.jpg',
        lyhyt: 'Anton Hanschin maalaus Großvenedigerin lumisesta vuoristosta.',
        selite: 'Maalauksessa aurinko valaisee Großvenedigerin lumihuippuja etualan kalliolakea vasten.',
        lahde: 'Maalaus: Anton Hansch, Wikimedia Commons (public domain).',
        tekija: 'Anton Hansch',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Anton_Hansch_-_The_Grossvenediger_-_WGA11204.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Großvenediger',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi vuorta kutsutaan nimellä Suuri venetsialainen?',
      'Kuka nousi huipulle ensimmäisenä?',
    ],
    korostukset: ['Kürsinger|Kürsinger'],
    nappi: 'Hohe Tauernin jäätikkövuori, jonka huipulle on noustu vasta 1841',
    // 12.34555556 E / 47.10944444 N — en-Wikipedia "Großvenediger"
    laudat: {
      maailmankartta: { x: 6244.9, y: 1513.9 },
      europe: { x: 448.2, y: 654.6 },
    },
    teksti: 'Großvenediger on Venediger-ryhmän päähuippu Hohe Tauernin vuoristossa Tirolin '
      + '(Itä-Tirol) ja Salzburgin rajalla. Sitä pidetään yleensä Itävallan neljänneksi '
      + 'korkeimpana vuorena, ja jäätikön peittämä huippu kuuluu Hohe Tauernin '
      + 'kansallispuistoon. Alun perin vuorta kutsuttiin nimellä Stützerkopf, ja nimi '
      + 'Großvenediger, suuri venetsialainen, on ensimmäisen kerran kirjattu vuoden 1797 '
      + 'rajamittauksesta; nimen alkuperä on epäselvä, ja se juontuu todennäköisesti solia '
      + 'ylittäneistä venetsialaisista kauppiaista. Ensimmäinen onnistunut nousu tehtiin 3. '
      + 'syyskuuta 1841 Josef Schwabin johtamana, ja mukana oli kirjailija ja vuorikiipeilijä '
      + 'Ignaz von Kürsinger.',
    lahde: 'en-Wikipedia "Großvenediger", johdanto-osa ja osiot "Name" ja "Climbing history" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mihin nimi Großvenediger, suuri venetsialainen, uskotaan viittaavan?',
      vaihtoehdot: [
        'Venetsiaan laskevaan jokeen',
        'Solia ylittäneisiin kauppiaisiin',
        'Venetsialaiseen ensinousijaan',
        'Huipulta näkyvään laguuniin',
      ],
      oikea: 1,
      fakta: 'Vuorta kutsuttiin alun perin nimellä Stützerkopf.',
    },
  },
  {
    id: 'hahmotelma-mariazell',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mariazell-44878f81.jpg',
      lyhyt: 'Mariazellin basilika ja sen tornit kaupungin ja metsäisten vuorten keskellä.',
      selite: 'Ylhäältä otetussa kuvassa Mariazellin basilikan vaaleanpunaiset ja valkoiset barokkitornit sekä musta huippu nousevat pikkukaupungin kattojen yläpuolelle. Taustalla kohoavat Steiermarkin metsäiset vuoret.',
      lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Uoaei1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilika_Mariazell_20171104_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mariazell-8b3e8914.jpg',
        lyhyt: 'Mariazellin basilikan kullattu pääalttari ja krusifiksi.',
        selite: 'Pääalttarin runsaasti kullattu koristelu, marmoripylväät ja keskellä kulkeva krusifiksi kohoavat holvin freskon alla. Alttarin juurella on hopeinen maapallo.',
        lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Uoaei1',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilika_Mariazell_Hochaltar_01.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
      },
    ],
    nimi: 'Mariazell',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Mariazellin ihmekuva on?',
      'Milloin kirkko laajennettiin?',
    ],
    korostukset: ['pyhiinvaelluskohde|pyhiinvaelluskohde'],
    nappi: 'Keski-Euroopan pyhiinvaelluskohde, jonka ihmeitä tekevää kuvaa palvotaan',
    // 15.31638889 E / 47.77305556 N — en-Wikipedia "Mariazell"
    laudat: {
      maailmankartta: { x: 6343.9, y: 1485.9 },
      europe: { x: 505.3, y: 637.2 },
    },
    teksti: 'Mariazell on itävaltalainen kaupunki Steiermarkin kaakkoisosassa, ja se on tunnettu '
      + 'talviurheilun keskuksena ja pyhiinvaelluskohteena. Se sijaitsee 143 kilometriä '
      + 'Grazista pohjoiseen Salza-joen laaksossa Pohjois-Steiermarkin Alppien keskellä. '
      + 'Kaupunki on katolilaisten pyhiinvaelluskohde Itävallasta ja naapurimaista. Palvonnan '
      + 'kohteena on lehmuspuuhun veistetty Neitsyt Marian kuva, jonka uskotaan tekevän '
      + 'ihmeitä; se tuotiin paikalle vuonna 1157 ja on nykyään kappelissa, jota koristavat '
      + 'hopeaesineet. Kappeli on osa suurta kirkkoa, joka rakennettiin vuonna 1644 '
      + 'laajennukseksi Unkarin kuningas Ludvig I:n pienemmälle kirkolle, jonka hän '
      + 'rakennutti voitettuaan ottomaanit vuonna 1363.',
    lahde: 'en-Wikipedia "Mariazell", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-heiligenkreuz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-heiligenkreuz-c8491d1c.jpg',
      lyhyt: 'Heiligenkreuzin luostari noin vuoden 1830 kivipiirroksessa.',
      selite: 'Vanhassa mustavalkoisessa kivipiirroksessa laajat luostarirakennukset ja kirkon torni nousevat Wienerwaldin kukkuloiden keskellä. Etualalla lepäävät kulkijat ja ohitse ajaa hevosvaunu.',
      lahde: 'Kivipiirros: A. Stein ja F. Wolf, Wikimedia Commons (public domain).',
      tekija: 'A. Stein ja F. Wolf',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stift_Heiligenkreuz_um_1830.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-heiligenkreuz-9106cf49.jpg',
        lyhyt: 'Heiligenkreuzin goottilaisen luostarikäytävän pylväsarkadit ja sisäpiha.',
        selite: 'Kuva on otettu luostarin 1200-luvun goottilaisen kreuzgangin eli klaustrin pylväiden lomasta. Näkymässä on ruusuikkuna sekä nurmikkoinen ja kukkaistutuksin koristeltu sisäpiha.',
        lahde: 'Valokuva: Wolfgang Sauber, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wolfgang Sauber',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stift_Heiligenkreuz_-_Kreuzgang_4.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Heiligenkreuzin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka perusti Heiligenkreuzin?',
      'Mikä on Pyhän Ristin reliikki?',
    ],
    korostukset: ['sisterssiläisluostari|sisterssiläisluostari'],
    nappi: 'Maailman vanhin yhtäjaksoisesti asuttu sisterssiläisluostari',
    // 16.13122 E / 48.0551 N — en-Wikipedia "Heiligenkreuz Abbey"
    laudat: {
      maailmankartta: { x: 6371, y: 1473.9 },
      europe: { x: 520.9, y: 629.8 },
    },
    teksti: 'Heiligenkreuzin luostari on sisterssiläisluostari Heiligenkreuzin kylässä Wienin '
      + 'metsän eteläosassa Ala-Itävallassa, noin 13 kilometriä Badenista luoteeseen. Se on '
      + 'maailman vanhin yhtäjaksoisesti asuttu sisterssiläisluostari. Itävallan markkreivi '
      + 'Leopold III perusti sen vuonna 1133 poikansa Otton pyynnöstä, ja ensimmäiset '
      + 'kaksitoista munkkia ja apotti Gottschalk tulivat Burgundin Morimondin luostarista. '
      + 'Luostari vihittiin 11. syyskuuta 1133, ja se sai nimensä Pyhä Risti uskonnollisesta '
      + 'omistautumisesta ristin kautta tapahtuvalle lunastukselle. Vuonna 1188 Leopold V '
      + 'lahjoitti luostarille Pyhän Ristin reliikin, joka on yhä nähtävillä.',
    lahde: 'en-Wikipedia "Heiligenkreuz Abbey", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-kremsmuenster',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kremsmuenster-26fcbe8d.jpg',
      lyhyt: 'Ilmakuva Kremsmünsterin luostarista ja sen sisäpihoista.',
      selite: 'Ilmakuvassa laaja valkoinen luostarikompleksi kohoaa kukkulan reunalla sisäpihoineen ja kirkkoineen. Oikealla näkyy korkea observatoriotorni sekä lampia.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Kremsmünster_Abbey_(view_from_the_southeast).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kremsmuenster-a577e5b5.jpg',
        lyhyt: 'Kremsmünsterin luostarin Mathematischer Turm eli tähtitorni.',
        selite: 'Monikerroksinen valkoinen tähtitorni, jota kutsutaan myös matemaattiseksi torniksi, kohoaa luostarin rakennusten yläpuolella kupolikattoisine observatorio-osineen.',
        lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Isiwal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kremsmünster_Stift_Sternwarte_Moschee.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
      },
    ],
    nimi: 'Kremsmünsterin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka perusti Kremsmünsterin?',
      'Mitä Kremsmünsterin tähtitornissa tehtiin?',
    ],
    korostukset: ['Matemaattinen torni|Matemaattinen torni'],
    nappi: 'Benediktiiniluostari, jonka tähtitorni on rakennettu 1700-luvulla',
    // 14.13055556 E / 48.055 N — en-Wikipedia "Kremsmünster Abbey"
    laudat: {
      maailmankartta: { x: 6304.4, y: 1473.9 },
      europe: { x: 482.5, y: 629.8 },
    },
    teksti: 'Kremsmünsterin luostari on benediktiiniluostari Kremsmünsterissä Ylä-Itävallassa. '
      + 'Baijerin herttua Tassilo III perusti sen vuonna 777, ja perimätiedon mukaan hän '
      + 'perusti sen paikalle, jossa villisika haavoitti kuolettavasti hänen poikaansa '
      + 'Guntheria metsästyksessä. Luostari sai runsaasti lahjoituksia perustajalta sekä '
      + 'Kaarle Suurelta ja hänen seuraajiltaan, ja sen apotit käyttivät aikoinaan '
      + 'piispallista toimivaltaa. 1700-luvun tunnetuin apotti Alexander Fixlmillner '
      + 'rakennutti suuren observatorion, ja luostarin eteläsiiven päässä on 51 metriä korkea '
      + 'Matemaattinen torni, jossa observatorio sijaitsee.',
    lahde: 'en-Wikipedia "Kremsmünster Abbey", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mikä tapahtui perimätiedon mukaan paikalla, jolle Kremsmünsterin luostari perustettiin?',
      vaihtoehdot: [
        'Salama tappoi herttuan',
        'Herttuan poika parani ihmeellisesti',
        'Villisika surmasi herttuan pojan',
        'Kaarle Suuri voitti vihollisensa',
      ],
      oikea: 2,
      fakta: 'Kremsmünsterin apotit käyttivät aikoinaan piispallista toimivaltaa.',
    },
  },
  {
    id: 'hahmotelma-admont',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-admont-4c1d9122.jpg',
      lyhyt: 'Admontin luostarikirjaston barokkinen sali kirjahyllyineen ja kattofresko.',
      selite: 'Kuva on otettu Admontin luostarikirjaston parvelta. Valkoiset ja kullatut kirjahyllyt reunustavat salia, lattia on kuvioitua marmoria ja katossa on maalattuja kupolifreskoja.',
      lahde: 'Valokuva: Jorge Royan, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jorge Royan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Austria_-_Admont_Abbey_Library_-_1277.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-admont-da29190c.jpg',
        lyhyt: 'Ilmakuva Admontin luostarista, kaksitorniselta kirkolta ja ympäröivältä laaksolta.',
        selite: 'Ylhäältä otetussa kuvassa Admontin luostarin pitkä valkoinen rakennuskompleksi ja goottilaisen kirkon kaksi terävää tornia nousevat vehreässä laaksossa. Taustalla kohoavat Steiermarkin vuoret.',
        lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'C.Stadler/Bwag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Admont_-_Benediktinerstift.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Admontin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Admontin luostarin kirjasto on?',
      'Mitä luostarille tapahtui vuonna 1865?',
    ],
    korostukset: ['kirjasto|kirjasto'],
    nappi: 'Enns-joen luostari, jonka tulipalo tuhosi 1865 ja jota rakennetaan yhä',
    // 14.46111111 E / 47.57305556 N — en-Wikipedia "Admont"
    laudat: {
      maailmankartta: { x: 6315.4, y: 1494.3 },
      europe: { x: 488.9, y: 642.4 },
    },
    teksti: 'Admontin luostari on benediktiiniluostari Enns-joen varrella Admontin kaupungissa '
      + 'Steiermarkissa. Se on Steiermarkin vanhin säilynyt luostari, ja se väittää '
      + 'sisältävänsä maailman suurimman luostarikirjaston sekä pitkään kerätyn tieteellisen '
      + 'kokoelman. Luostari tunnetaan barokkiarkkitehtuuristaan, taiteestaan ja '
      + 'käsikirjoituksistaan. Se sijaitsee Gesäusen kansallispuiston rajalla, ja nimi Admont '
      + 'tulee latinan sanoista ad montes, vuorten luona. Salzburgin arkkipiispa Gebhard '
      + 'perusti luostarin vuonna 1074, ja 27. huhtikuuta 1865 tulipalo tuhosi lähes koko '
      + 'luostarin. Kirjasto saatiin pelastettua, ja jälleenrakennus alkoi seuraavana vuonna '
      + 'mutta ei ollut valmis vielä vuonna 1890.',
    lahde: 'en-Wikipedia "Admont Abbey", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-hochosterwitz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hochosterwitz-8574dad2.jpg',
      lyhyt: 'Hochosterwitzin linna kohoaa jyrkän kalliokukkulan huipulla.',
      selite: 'Länsipuolelta otetussa kuvassa Hochosterwitzin linna kaikkine muureineen ja torneineen nojaa metsäisen kalliokukkulan laelle sinistä taivasta vasten.',
      lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Uoaei1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Hochosterwitz_Westseite_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hochosterwitz-2014d7d9.jpg',
        lyhyt: 'Hochosterwitzin linnan Landschaftstor eli 8. portti ja näköala Kärntenin maisemaan.',
        selite: 'Kuva näyttää yhden linnaa suojaavista porteista: liuskekattoinen porttitorni, siihen liittyvät kivimuurit ja tie kulkevat kalliokukkulan rinteessä. Alhaalla levittyvät Kärntenin pellot ja kukkulat.',
        lahde: 'Valokuva: Johann Jaritz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Johann Jaritz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Georgen_am_Längsee_Burg_Hochosterwitz_08_Landschaftstor_1570_01062015_4304.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
      },
    ],
    nimi: 'Hochosterwitz',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linna on rakennettu 14 portilla?',
      'Kuka Khevenhüller oli?',
    ],
    korostukset: ['Khevenhüller|Khevenhüller'],
    nappi: 'Kärntenin kalliolinna, jonka neljätoista porttia nousevat huipulle',
    // 14.45361111 E / 46.755 N — en-Wikipedia "Hochosterwitz Castle"
    laudat: {
      maailmankartta: { x: 6315.1, y: 1528.8 },
      europe: { x: 488.7, y: 663.9 },
    },
    teksti: 'Hochosterwitzin linna on Itävallan vaikuttavimpiin keskiaikaisiin linnoihin luettu '
      + 'linna 172 metriä korkealla dolomiittikalliolla Sankt Georgen am Längsee -kunnan '
      + 'lähellä Sankt Veit an der Glanin itäpuolella Kärntenissä. Se sijaitsee 664 metrin '
      + 'korkeudessa Zollfeldin tasangon reunalla, ja se näkyy selkeällä säällä jopa 30 '
      + 'kilometrin päähän. Kalliolla on ollut asutusta pronssikaudesta lähtien, ja se '
      + 'mainitaan ensimmäisen kerran vuoden 860 asiakirjassa. Vuonna 1571 paroni George '
      + 'Khevenhüller osti linnan ja linnoitti sen turkkilaisten hyökkäysten uhan vuoksi '
      + 'rakentaen asehuoneen ja 14 porttia vuosina 1570–1586. Turistit saavat kävellä 620 '
      + 'metriä pitkän polun porttien läpi linnaan.',
    lahde: 'en-Wikipedia "Hochosterwitz Castle", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-riegersburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-riegersburg-ce3afaac.jpg',
      lyhyt: 'Riegersburgin linna kohoaa jyrkän tulivuorikallion päällä.',
      selite: 'Kuvassa Riegersburgin linna Steiermarkissa, punakattoinen päärakennus kellotorneineen kallion huipulla. Linnan ensimmäinen maininta on vuodelta 1138.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Riegersburg_-_Burg,_S%C3%BCdwestansicht.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-riegersburg-ff6d59bb.jpg',
        lyhyt: 'Ilmakuva Riegersburgin linnan muureista ja bastioneista.',
        selite: 'Kuvassa Riegersburgin linna ja sen ympärillä kiertävät linnoitusmuurit ja bastionit viinitarhaterasseineen. Näkökulma on ylhäältä, toisin kuin pääkuvassa.',
        lahde: 'Valokuva: Asurnipal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Asurnipal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Riegersburg-Castle-02ASD.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-riegersburg-8fd69e18.jpg',
        lyhyt: 'Vuoden 1830 litografia Riegersburgin linnasta ja sen alapuolisesta kylästä.',
        selite: 'Kuparipiirroksen tyylinen litografia esittää Riegersburgin linnaa kalliollaan ja sen juurella olevaa kylää. Painos on julkaistu Grazissa J. F. Kaiserin sarjassa Steiermarkin kaupunkien, markkinapaikkojen ja linnojen näkymiä 1824-1833.',
        lahde: 'Kaiverrus/litografia: J. F. Kaiser (Graz), skannaus Hubertl, Wikimedia Commons (public domain).',
        tekija: 'J. F. Kaiser (Graz), skannaus Hubertl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:244_Schloss_Riegersburg_-_J.F.Kaiser_Lithografirte_Ansichten_der_Steiermark_1830.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Riegersburg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linna on tulivuoren päällä?',
      'Kuka omistaa Riegersburgin?',
    ],
    korostukset: ['tulivuori|tulivuoren'],
    nappi: 'Sammuneen tulivuoren päällä oleva Steiermarkin linna',
    // 15.9325 E / 47.00472222 N — en-Wikipedia "Riegersburg Castle"
    laudat: {
      maailmankartta: { x: 6364.4, y: 1518.3 },
      europe: { x: 517.1, y: 657.4 },
    },
    teksti: 'Riegersburgin linna on keskiaikainen linna sammuneen tulivuoren päällä Riegersburgin '
      + 'kaupungin yläpuolella Steiermarkin osavaltiossa Itävallassa. Linnan omistaa '
      + 'Liechtensteinin ruhtinassuku, ja siinä on museo, jossa on vaihtuvia näyttelyjä. '
      + 'Linna on rakennettu kukkulalle, joka on suuren kerrostulivuoren kiinteytyneen '
      + 'sisuksen jäänne; tulivuori sammui todennäköisesti noin kaksi miljoonaa vuotta '
      + 'sitten, ja linnan rakentamiseen on käytetty kukkulan muinaista basalttia. Kukkulan '
      + 'huippu on 482 metriä merenpinnan yläpuolella. Alueella on asuttu tuhansia vuosia, ja '
      + 'linnan historia alkaa vuodesta 1122, jolloin ensimmäinen tunnettu asukas oli ritari '
      + 'Rudiger von Hohenberg.',
    lahde: 'en-Wikipedia "Riegersburg Castle", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kreuzenstein',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kreuzenstein-07f1f0f2.jpg',
      lyhyt: 'Burg Kreuzensteinin sisäpiha, jossa on hirsirunkoinen galleria ja kaarisilta.',
      selite: 'Kuvassa Kreuzensteinin linnan sisäpihan panoraama: puoliristikkorakenteinen rakennus, kaarien kannattama parveke ja kivinen kaarisilta pihan poikki.',
      lahde: 'Valokuva: Michael Kranewitter, Wikimedia Commons (CC BY 2.5).',
      tekija: 'Michael Kranewitter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Kreuzenstein_-_Panorama_Burghof.JPG',
      lisenssi: 'CC BY 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kreuzenstein-887a1c40.jpg',
        lyhyt: 'Burg Kreuzenstein etelästä metsäisen rinteen yläpuolella.',
        selite: 'Korkearesoluutioinen kokonäkymä Kreuzensteinin linnasta etelästä: torneja, tiilikattoja ja pyöreä linnan torni kohoavat metsän yläpuolelle.',
        lahde: 'Valokuva: A-F-Weiss, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'A-F-Weiss',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Kreuzenstein,_S%C3%BCdansicht.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kreuzenstein-575a2c0e.jpg',
        lyhyt: 'Kreuzensteinin torneja ja muureja alhaalta katsottuna.',
        selite: 'Yksityiskohtakuva Kreuzensteinin linnasta: kivimuureja, nurkkatorni, kapea koristeellinen kärkitorni ja goottilaisia ikkunoita.',
        lahde: 'Valokuva: Anna Saini, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Anna Saini',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Kreuzenstein_10.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Burg Kreuzenstein',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Kreuzenstein on sekä uus- että alkuperäinen?',
      'Kuka Wilczek oli?',
    ],
    korostukset: ['Wilczek|Wilczekin'],
    nappi: 'Rauniolinna, jonka jälleenrakennus alkaa vuonna 1874',
    // 16.30888889 E / 48.37916667 N — en-Wikipedia "Burg Kreuzenstein"
    laudat: {
      maailmankartta: { x: 6377, y: 1460.1 },
      europe: { x: 524.3, y: 621.2 },
    },
    teksti: 'Burg Kreuzenstein on linna Leobendorfin lähellä Ala-Itävallassa, 265 metrin '
      + 'korkeudessa merenpinnasta. Se rakennettiin keskiaikaisen linnan jäänteille, joka oli '
      + 'rappeutunut ja purettu kolmikymmenvuotisen sodan aikana. Linna oli tarkoitettu '
      + 'Wilczekin suvun sukuhaudaksi, ja kreivi Johann Nepomuk Wilczek, tunnettu '
      + 'napa-alueiden tutkimusmatkailija, aloitti sen jälleenrakennuksen vuonna 1874 '
      + 'Sleesian hiilikaivostensa tuotoilla. Kreivi osti eri puolilta Eurooppaa '
      + 'keskiaikaisten rakennusten osia, joista linna koottiin uskottavan näköiseksi, joten '
      + 'sitä voidaan pitää sekä uus- että alkuperäisenä keskiaikaisena rakenteena. Linna '
      + 'sijaitsee Wienistä ja Tonavasta pohjoiseen Korneuburgin ja Stockerauin välillä.',
    lahde: 'en-Wikipedia "Burg Kreuzenstein", johdanto-osa ja osiot "Reconstruction under the '
      + 'Counts of Wilczek" ja "Location" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millä rahoilla kreivi Wilczek rahoitti Burg Kreuzensteinin jälleenrakennuksen?',
      vaihtoehdot: [
        'Sleesian hiilikaivosten tuotoilla',
        'Napa-retkien palkkioilla',
        'Keisarin lahjoituksella',
        'Valtion rakennusavustuksella',
      ],
      oikea: 0,
      fakta: 'Linnan oli määrä toimia Wilczekin suvun sukuhautana.',
    },
  },
  {
    id: 'hahmotelma-forchtenstein',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-forchtenstein-0157fd62.jpg',
      lyhyt: 'Forchtensteinin linna kohoaa metsäisen kallion päälle.',
      selite: 'Kuvassa Forchtensteinin linnan kaakkoisnäkymä: valkoinen päärakennus, torni ja paksut ulkomuurit kohoavat metsäisen rinteen yläpuolelle. Linna on jyrkällä dolomiittikalliolla Rosalia-vuoriston itärinteellä.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Forchtenstein_-_Burg_(1).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-forchtenstein-7acff593.jpg',
        lyhyt: 'Forchtensteinin linnan sisäpiha, jossa on koristemaalattu julkisivu ja patsas.',
        selite: 'Kuvassa linnan sisäpiha: vaalea julkisivu on koristeltu maalatuin medaljongein ja kuvin, ja pihan keskellä on kivipatsas.',
        lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Dguendel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Forchtenstein,_der_Innenhof.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Forchtenstein',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä Esterházyt olivat?',
      'Mitä aarrekammiossa säilytettiin?',
    ],
    korostukset: ['Esterházy|Esterházy'],
    nappi: 'Burgenlandin linnoitus, jonne Esterházyt kokoavat ihmeiden aarrekammion',
    // 16.33083333 E / 47.70944444 N — en-Wikipedia "Forchtenstein Castle"
    laudat: {
      maailmankartta: { x: 6377.7, y: 1488.6 },
      europe: { x: 524.8, y: 638.8 },
    },
    teksti: 'Forchtensteinin linna on myöhäiskeskiajalla rakennettu linna Forchtensteinin kunnan '
      + 'lähellä Pohjois-Burgenlandissa Itävallassa, 511 metrin korkeudessa. Linna on '
      + 'Mattersburgin eteläpuolella Wulka-laakson yläpuolella. Sen ensimmäisen osan, 50 '
      + 'metriä korkean päätornin, rakensivat 1400-luvun alussa Mattersburgin herrat, jotka '
      + 'nimittivät itseään myöhemmin Forchtensteinin herroiksi. Noin vuonna 1450 suku kuoli '
      + 'sukupuuttoon, ja linna siirtyi Habsburgeille, jotka omistivat sen 170 vuotta. Vuonna '
      + '1622 Nikolaus Esterházy sai linnan keisari Ferdinand II:lta, ja Esterházy-suku '
      + 'vahvisti ja koristeli sitä; suvun aikana linnasta tuli aseiden, arkistojen, '
      + 'kronometrien, koneiden ja muiden "ihmeiden" säilytyspaikka, ja aarrekammioon pääsi '
      + 'vain salaisen käytävän kautta.',
    lahde: 'en-Wikipedia "Forchtenstein Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-bad-ischl',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bad-ischl-c24a55f6.jpg',
      lyhyt: 'Kaiservilla Bad Ischlissä, keisarillinen huvila puiston takana.',
      selite: 'Kuvassa Bad Ischlin Kaiservilla, keltainen huvila harmaine kattoineen, sekä sen edessä oleva suihkulähde ja puistoa. Huvila oli keisarillisen perheen kesäpaikka.',
      lahde: 'Valokuva: Toffel, Wikimedia Commons (public domain).',
      tekija: 'Toffel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaiservilla_Bad_Ischl.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bad-ischl-921f3fb4.jpg',
        lyhyt: 'Bad Ischlin Trinkhalle, klassistinen pylväshalli kaupungin keskustassa.',
        selite: 'Kuvassa Trinkhalle Auböckplatzilla: valkoinen pylväshalli kullattuine korinttilaisine pylväänpäineen. Rakennus valmistui 1829-1831 arkkitehti Franz Lösslin suunnitelmin klassistiseen tyyliin suolakylpylärakennukseksi.',
        lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'C.Stadler/Bwag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bad_Ischl_-_Trinkhalle.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bad Ischl',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi keisari valitsi Bad Ischlin kesäpaikakseen?',
      'Miten suola liittyy Ischliin?',
    ],
    korostukset: ['Kaiservilla|Kaiservilla'],
    nappi: 'Keisari Frans Joosefin kesäpaikka Salzkammergutissa',
    // 13.63333333 E / 47.72027778 N — en-Wikipedia "Bad Ischl"
    laudat: {
      maailmankartta: { x: 6287.8, y: 1488.1 },
      europe: { x: 473, y: 638.6 },
    },
    teksti: 'Bad Ischl on kylpylä Ylä-Itävallan eteläosassa Traun-joen varrella Salzkammergutin '
      + 'keskellä. Sen Kaiservilla oli Itävalta-Unkarin hallitsijoiden, keisari Frans '
      + 'Joosefin ja keisarinna Elisabethin, kesäasunto. Ihmiset ovat asuneet Ischlin '
      + 'seudulla jo esihistoriallisen Hallstatt-kulttuurin ajasta lähtien. Vuonna 1563 '
      + 'avattiin ensimmäinen suolakaivos ja vuonna 1571 suolan haihdutusallas. Kun suolavesi '
      + 'tuli 1800-luvun alussa lääketieteellisesti suosituksi, Ischl muuttui muodikkaaksi '
      + 'kylpyläkaupungiksi; Hotel Post avattiin vuonna 1828, ja vuonna 1849 keisari Frans '
      + 'Joosef I valitsi kaupungin kesäasunnokseen. Vuonna 2024 Bad Ischl oli yksi Euroopan '
      + 'kulttuuripääkaupungeista.',
    lahde: 'en-Wikipedia "Bad Ischl", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-gmunden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-gmunden-7aff5e24.jpg',
      lyhyt: 'Schloss Ort saarella Traunseessä ja Gmundenin kaupunki taustalla.',
      selite: 'Kuvassa Schloss Ort valkoisine torneineen Traunseen saarella, puusilta linnaan ja Gmundenin rantakaupunki taustalla. Linna kuuluu Salzkammergutin vanhimpiin rakennuksiin.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gmunden_-_Schloss_Ort_(1).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-gmunden-b60f3878.jpg',
        lyhyt: 'Gmundenin raatihuone ja kaupungin tori.',
        selite: 'Kuvassa Gmundenin raatihuone vihreine ja valkoisine julkisivuineen ja kellopelitorneineen. Julkisivu on vuodelta 1756 ja kellopeli on tehty Meissenissä Gmundner Keramikin koristeaiheilla; kellot roikkuvat ylimmässä loggiassa.',
        lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Isiwal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gmunden_Rathaus-0397.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gmunden',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Gmundner Keramik on?',
      'Mikä Traunstein on?',
    ],
    korostukset: ['Gmundner Keramik|Gmundner Keramik'],
    nappi: 'Traunseen rannan kaupunki, jonka vuoret kohoavat suoraan järvestä',
    // 13.79944444 E / 47.91805556 N — en-Wikipedia "Gmunden"
    laudat: {
      maailmankartta: { x: 6293.3, y: 1479.7 },
      europe: { x: 476.1, y: 633.4 },
    },
    teksti: 'Gmunden on kaupunki Ylä-Itävallassa, ja siellä asuu noin 13 200 ihmistä. Se '
      + 'sijaitsee Traunseen ja Traun-joen äärellä, ja sitä ympäröivät korkeat vuoret, joihin '
      + 'kuuluvat Traunstein (1 660 metriä), Erlakogel (1 570 metriä), Wilder Kogel (2 090 '
      + 'metriä) ja Höllengebirge. Kaupungin ympäristön nähtävyyksiin kuuluvat Traunin putous '
      + '16 kilometriä pohjoiseen, Schloss Ort -linna ja keramiikkatehdas, joka valmistaa '
      + 'Gmundner Keramik -nimistä keramiikkaa. Myös kaupungintalo on suosittu kohde. '
      + 'Gmundenin seudulla illyyrialaiset louhivat suolaa jo vuonna 1000 eaa.',
    lahde: 'en-Wikipedia "Gmunden", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kitzbuehel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kitzbuehel-808613c1.jpg',
      lyhyt: 'Kitzbühelin vanhankaupungin Vorderstadt-katu lumisena päivänä.',
      selite: 'Kuvassa Kitzbühelin Vorderstadtin eteläosa: värikkäitä, korkeita talonpäätyjä, lunta kadulla ja kirkontorni taustalla.',
      lahde: 'Valokuva: Ricardalovesmonuments, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ricardalovesmonuments',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vorderstadt_Kitzb%C3%BChel_S%C3%BCdteil.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-kitzbuehel-006168e6.jpg',
        lyhyt: 'Kitzbühelin kaupunki laaksossa ja vihreä vuorenrinne sen yläpuolella.',
        selite: 'Kuvassa Kitzbühelin kaupunki kirkkoineen alppilaaksossa ja metsäinen, niittyinen vuorenrinne kaupungin yläpuolella. Kuva on otettu ylempää rinteeltä.',
        lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Dguendel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kitzb%C3%BChel,_Ortsansicht,_Bild_2.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Kitzbühel',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Hahnenkamm-kilpailu on?',
      'Milloin Kitzbühelissä louhittiin kuparia?',
    ],
    korostukset: ['Hahnenkamm|Hahnenkamm'],
    nappi: 'Tirolin keskiaikainen kaivoskaupunki, jonka hiihtoperinne on vasta syntymässä',
    // 12.39194444 E / 47.44638889 N — en-Wikipedia "Kitzbühel"
    laudat: {
      maailmankartta: { x: 6246.4, y: 1499.7 },
      europe: { x: 449.1, y: 645.8 },
    },
    teksti: 'Kitzbühel on keskiaikainen kaupunki Kitzbühelin Alpeilla Tirolissa Itävallassa, noin '
      + '100 kilometriä Innsbruckista itään ja Kitzbühelin piirikunnan hallinnollinen keskus. '
      + 'Se on yksi maailman kuuluisimmista ja eksklusiivisimmista hiihtokeskuksista, jossa '
      + 'vierailee kansainvälistä ylintä seurapiiriä. Vuosittain järjestettävä '
      + 'Hahnenkamm-kilpailu on maailman vaikeimpana pidetty hiihtokilpailu. Kitzbühel '
      + 'sijaitsee Zell am Seen ja Innsbruckin välissä Leukentalin laaksossa Kitzbüheler Ache '
      + '-joen varrella. Ensimmäiset tunnetut asukkaat olivat illyyrialaiset, jotka louhivat '
      + 'kuparia kukkuloilla vuosien 1100 ja 800 eaa. välillä.',
    lahde: 'en-Wikipedia "Kitzbühel", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-piber',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-piber-8e336811.jpg',
      lyhyt: 'Tammoja ja varsoja Piberin tallissa.',
      selite: 'Lipizzan-tammoja ja varsoja olkien peittämässä karsinassa Piberin liittovaltion siitostilalla Steiermarkissa.',
      lahde: 'Valokuva: Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Dennis G. Jarvis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Austria-01113_-_Mares_and_Foals_(21463209278).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-piber-ec51698d.jpg',
        lyhyt: 'Näkymä lännestä Piberin kylään ja siitostilalle.',
        selite: 'Niityt ja metsäiset vuoret ympäröivät Piberin kylää ja Bundesgestütiä Steiermarkissa; kuva on otettu Knobelbergin suunnalta.',
        lahde: 'Valokuva: Liuthalas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Liuthalas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Piber_Ansicht_von_Westen_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-piber-26f8a751.jpg',
        lyhyt: 'Vanha lipizzan-hevonen Piberin tilan pihassa.',
        selite: 'Eläkkeellä oleva vanha lipizzan seisoo hiekkakentällä Piberin siitostilalla; taustalla keltainen talousrakennus ja vaunut.',
        lahde: 'Valokuva: Sarras, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Sarras',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alter_Lipizzaner_in_Rente.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Piber',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mitä Espanjalainen ratsastuskoulu on?',
      'Miksi lipizzaneja kasvatetaan Piberissä?',
    ],
    korostukset: ['lipizzan|lipizzanhevosten'],
    nappi: 'Entisen luostarin siitostalli, jonka hevoset ovat vasta tulossa lipizzaneiksi',
    // 15.10027778 E / 47.08055556 N — en-Wikipedia "Piber Federal Stud"
    laudat: {
      maailmankartta: { x: 6336.7, y: 1515.1 },
      europe: { x: 501.1, y: 655.4 },
    },
    teksti: 'Piberin valtion siitoslaitos eli Bundesgestüt Piber on lipizzanhevosten kasvatukseen '
      + 'omistettu talli Piberin kylässä lähellä Köflachin kaupunkia Länsi-Steiermarkissa. '
      + 'Talli perustettiin vuonna 1798 sotahevosten kasvatusta varten, ja lipizzanien '
      + 'kasvatus alkoi vuonna 1920; nykyisin se on pääasiallinen laitos, joka tuottaa '
      + 'Espanjalaisen ratsastuskoulun käyttämät orit. Piberin linna oli aiemmin Pyhän '
      + 'Lambrechtin luostari. Vuonna 1867 talli siirtyi Itävalta-Unkarin keisarillisen '
      + 'maatalousministeriön hallintaan. Yksi Piberin päätavoitteista on ylläpitää '
      + 'olennainen osa Itävallan kulttuuriperintöä ja säilyttää yksi kauneimmista '
      + 'hevosroduista alkuperäisessä muodossaan.',
    lahde: 'en-Wikipedia "Piber Federal Stud", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä varten Piberin valtion talli perustettiin vuonna 1798?',
      vaihtoehdot: [
        'Ratsastuskoulun oriiden kasvatukseen',
        'Sotahevosten kasvatukseen',
        'Ravihevosten jalostukseen',
        'Vetohevosten kasvatukseen',
      ],
      oikea: 1,
      fakta: 'Piberin linna oli aiemmin Pyhän Lambrechtin luostari.',
    },
  },
  {
    id: 'hahmotelma-eisenstadt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-eisenstadt-f060ca09.jpg',
      lyhyt: 'Esterházyn linna Eisenstadtissa edestä katsottuna.',
      selite: 'Esterházyn ruhtinassuvun barokkilinnan keltainen julkisivu ja tornit Burgenlandin Eisenstadtissa.',
      lahde: 'Valokuva: Johann Jaritz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Johann Jaritz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eisenstadt_Schloss_Esterhazy_16082003_01.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-eisenstadt-98fa0ac2.jpg',
        lyhyt: 'Haydn-sali Esterházyn linnassa.',
        selite: 'Haydn-salin maalattu katto ja koristeelliset seinät Eisenstadtin Esterházyn linnassa.',
        lahde: 'Valokuva: Martin Geisler, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Martin Geisler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:EisenstadtSchloss_Haydn-Saal.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-eisenstadt-bccac3b4.jpg',
        lyhyt: 'Haydn-mausoleumin koristeellinen rautaportti.',
        selite: 'Kuvassa on Eisenstadtin Haydn-mausoleumin taidokas rautaportti; portin takana näkyy valkoinen hautamonumentti.',
        lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'C.Stadler/Bwag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eisenstadt_-_Haydn-Mausoleum.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Eisenstadt',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka Joseph Haydn oli?',
      'Miksi Eisenstadt oli osa Unkaria?',
    ],
    korostukset: ['Haydn|Haydn'],
    nappi: 'Esterházyjen unkarilainen hovikaupunki, jossa Haydn on palvellut',
    // 16.51666667 E / 47.85 N — en-Wikipedia "Eisenstadt"
    laudat: {
      maailmankartta: { x: 6383.9, y: 1482.6 },
      europe: { x: 528.3, y: 635.1 },
    },
    teksti: 'Eisenstadt on Burgenlandin osavaltion pääkaupunki Itävallassa; kaupungissa asuu noin '
      + '16 100 ihmistä, ja se on Itävallan pienin osavaltion pääkaupunki. Se sijaitsee '
      + 'Leithavuorten juurella. Vuosina 1648–1921 Kismarton eli Eisenstadt kuului '
      + 'Habsburgien valtakunnan Unkarin kuningaskuntaan ja oli unkarilaisen '
      + 'Esterházy-aatelissuvun kotipaikka. Sinä aikana säveltäjä Joseph Haydn asui ja '
      + 'työskenteli Eisenstadtissa hovimuusikkona Esterházyjen suojeluksessa. Haydnin '
      + 'nimittäminen ruhtinaan Hofkapellmeisteriksi aloitti kaupungin suuren taiteellisen '
      + 'kauden. Kaupungin Bergkirchessä on Haydnin hauta. Burgenland liitettiin Itävaltaan '
      + 'vuonna 1921, ja Eisenstadtista tuli osavaltion pääkaupunki vuonna 1925.',
    lahde: 'en-Wikipedia "Eisenstadt", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lienz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-lienz-2f8e4f99.jpg',
      lyhyt: 'Panoraama Lienzin kaupungista Schlossbergiltä.',
      selite: 'Näkymä Schlossbergiltä Lienzin kaupunkiin ja sitä ympäröivään laaksoon, jota vuoret rajaavat molemmin puolin.',
      lahde: 'Valokuva: Je-str, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Je-str',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lienz.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-lienz-f3ccbaad.jpg',
        lyhyt: 'Schloss Bruckin linna syksyisten puiden takaa.',
        selite: 'Korkea torni ja kiviset muurit Lienzin Schloss Bruckin linnassa Itä-Tirolissa.',
        lahde: 'Valokuva: Lambert Oitzinger, Wikimedia Commons (CC BY-SA 3.0 AT).',
        tekija: 'Lambert Oitzinger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_Bruck.JPG',
        lisenssi: 'CC BY-SA 3.0 AT',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-lienz-b9f7c700.jpg',
        lyhyt: 'Lienz ja Spitzkofl vanhassa värikuvassa.',
        selite: 'Photochrom-painokuva Lienzin kaupungista ja sen takana kohoavasta Spitzkoflin vuoresta Tirolissa Itävalta-Unkarin ajalta.',
        lahde: 'Kuva: Photochrom Print Collection, Wikimedia Commons (public domain).',
        tekija: 'Photochrom Print Collection',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lienz,_with_the_Spitzkolft_(i.e.,_Spitzkofl),_Tyrol,_Austro-Hungary-LCCN2002711061.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Lienz',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Missä Itä-Tirol on?',
      'Mikä megafaani on?',
    ],
    korostukset: ['Isel|Iselin'],
    nappi: 'Itä-Tirolin keskiaikainen kaupunki, jossa Drau ja Isel yhtyvät',
    // 12.76972222 E / 46.82972222 N — en-Wikipedia "Lienz"
    laudat: {
      maailmankartta: { x: 6259, y: 1525.7 },
      europe: { x: 456.4, y: 662 },
    },
    teksti: 'Lienz on keskiaikainen kaupunki Tirolin osavaltiossa Itävallassa. Se on Lienzin '
      + 'piirikunnan hallinnollinen keskus, joka kattaa koko Itä-Tirolin. Lienz sijaitsee '
      + 'Iselin ja Draun jokien yhtymäkohdassa Itäalpeilla, pohjoisessa olevan Hohe Tauernin '
      + 'vuoriston ja etelässä olevien Gailtalin Alppien välissä. Iselsbergin sola yhdistää '
      + 'sen Kärntenin Winklerniin. Lienzin alue on ollut asuttua pronssikaudelta noin '
      + 'vuodesta 2000 eaa. lähtien, ja kelttejä siellä asui noin vuodesta 300 eaa. Kaupunki '
      + 'sijaitsee yhden Alppien tai koko maailman suurimmista alppimegafaaneista juurella: '
      + 'se on 350 metriä korkea ja säteeltään 2,5 kilometriä.',
    lahde: 'en-Wikipedia "Lienz", johdanto-osa ja osiot "Geography" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-bregenzerwald',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bregenzerwald-9614f04d.jpg',
      lyhyt: 'Kukkaruukuin koristeltu talonpoikaistalo Augissa.',
      selite: 'Puuverhoiltu talonpoikaistalo, jonka ikkunoita koristavat runsaat kukat, Augissa Bregenzerwaldissa.',
      lahde: 'Valokuva: Böhringer Friedrich, Wikimedia Commons (CC BY-SA 2.5).',
      tekija: 'Böhringer Friedrich',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Argenau_116.JPG',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bregenzerwald-3165e759.jpg',
        lyhyt: 'Puinen talonpoikaistalo Augissa vuoren juurella.',
        selite: 'Suojeltu talonpoikaistalo Augissa Bregenzerwaldissa; sen takana kohoaa kallioinen vuori.',
        lahde: 'Valokuva: Böhringer Friedrich, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Böhringer Friedrich',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Au,_Argenzipfel_77.JPG',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bregenzerwald-35cea700.jpg',
        lyhyt: 'Näkymä Schwarzenbergin kylään.',
        selite: 'Niityt, metsät ja lumihuippuiset vuoret Schwarzenbergin kylän ympärillä Vorarlbergissa; kylän kirkontorni erottuu.',
        lahde: 'Valokuva: Asurnipal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Asurnipal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schwarzenberg-Blick_von_Ratzen_zum_Dorf-02ASD.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bregenzerwald',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Bregenzerwaldin juustoreitti on?',
      'Missä Bregenzerwaldin päälaakso on?',
    ],
    korostukset: ['juustoreitti|juustoreitti'],
    nappi: 'Vorarlbergin vuoristometsä, jonka alpeilla valmistetaan juustoa',
    // 9.88 E / 47.26555556 N — en-Wikipedia "Bregenz Forest"
    laudat: {
      maailmankartta: { x: 6162.7, y: 1507.3 },
      europe: { x: 400.9, y: 650.5 },
    },
    teksti: 'Bregenzerwald on yksi Vorarlbergin osavaltion pääalueista Itävallassa, ja se kuuluu '
      + 'Pohjoisiin kalkkialppeihin. Se on Bregenzer Ach -joen valuma-alue, ja siellä asuu '
      + 'noin 31 400 ihmistä. Alue rajoittuu lännessä Bodenjärven seutuun Reinin laaksossa ja '
      + 'pohjoisessa Saksaan ja Baijeriin. Asukkaat jakavat alueen usein kahteen osaan: '
      + 'Vorderwaldiin eli alempaan Bregenzerwaldiin ja Hinterwaldiin eli ylempään '
      + 'Bregenzerwaldiin, jossa vuoret nousevat jopa 2 000 metriin. Bezauta pidetään '
      + 'historiallisista syistä päämarkkinakaupunkina, ja alueella kulkee juustoreitti; '
      + '1900-luvun alussa lukemattomilla alpeilla ja tiloilla harjoitettiin maanviljelyä, '
      + 'karjanhoitoa ja juuston valmistusta.',
    lahde: 'en-Wikipedia "Bregenz Forest", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-steyr',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-steyr-37b0e31e.jpg',
      lyhyt: 'Ennsjoki ja Steyrin vanhankaupungin talot.',
      selite: 'Steyr sijaitsee Ennsin ja Steyr-joen yhtymäkohdassa; kuvassa joen pato, kirkon tornit ja vanhankaupungin talot.',
      lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Isiwal',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Steyr_Enns_Steyrmündung-5485.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-steyr-0eafe8ed.jpg',
        lyhyt: 'Museum Arbeitswelt joen rannalla Steyrissä.',
        selite: 'Museum Arbeitswelt Steyrissä: keltaisia ja punatiilisiä rakennuksia joen rannalla.',
        lahde: 'Valokuva: Christoph Waghubinger (Lewenstein), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Christoph Waghubinger (Lewenstein)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Museum_Arbeitswelt.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-steyr-1c98b049.jpg',
        lyhyt: 'Schloss Lamberg Steyrin vanhankaupungin yllä.',
        selite: 'Laaja punakattoinen Schloss Lamberg kohoaa vanhankaupungin talojen yläpuolella; kuva on otettu Ennsdorfin kaupunginosasta.',
        lahde: 'Valokuva: Christoph Waghubinger (Lewenstein), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Christoph Waghubinger (Lewenstein)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_Lamberg.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Steyr',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä Steyr-Daimler-Puch oli?',
      'Missä Steyr ja Enns kohtaavat?',
    ],
    korostukset: ['Steyr-Daimler-Puch|Steyr-Daimler-Puch'],
    nappi: 'Ylä-Itävallan teollisuuskaupunki, jonka jokien yhtymäkohdassa Werndl perustaa tehtaan',
    // 14.41666667 E / 48.03333333 N — en-Wikipedia "Steyr"
    laudat: {
      maailmankartta: { x: 6313.9, y: 1474.8 },
      europe: { x: 488, y: 630.3 },
    },
    teksti: 'Steyr on Ylä-Itävallan osavaltion kaupunki, joka on Itävallan kahdestoista '
      + 'väkirikkain kaupunki ja Ylä-Itävallan kolmanneksi suurin. Sillä on pitkä historia '
      + 'valmistuskeskuksena, ja siitä on saanut nimensä useita siellä toimineita '
      + 'valmistajia, kuten entinen Steyr-Daimler-Puch-konserni. Kaupungin läpi virtaavat '
      + 'Steyr- ja Enns-joet, jotka kohtaavat keskustan lähellä Lambergin linnan ja Pyhän '
      + 'Mikaelin kirkon alla. Vuonna 1830 seppä Leopold Werndl perusti Steyriin asetehtaan, '
      + 'jonka hänen poikansa Josef ja Franz Werndl perustivat uudelleen osakeyhtiöksi vuonna '
      + '1864; vuodesta 1869 sen nimi oli Österreichische Waffenfabriksgesellschaft.',
    lahde: 'en-Wikipedia "Steyr", johdanto-osa ja osiot "Geography" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Millaisen yrityksen seppä Leopold Werndl perusti Steyriin vuonna 1830?',
      vaihtoehdot: [
        'Kutomon',
        'Olutpanimon',
        'Kellotehtaan',
        'Asetehtaan',
      ],
      oikea: 3,
      fakta: 'Steyr- ja Enns-joet kohtaavat kaupungin keskustan lähellä Lambergin linnan ja Pyhän '
        + 'Mikaelin kirkon alla.',
    },
  },
  {
    id: 'hahmotelma-hall-in-tirol',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hall-in-tirol-e74cdad2.jpg',
      lyhyt: 'Burg Haseggin Münzturm ja Hallin tornit vuorten edessä.',
      selite: 'Näkymä Haller Innbrückeltä Burg Haseggin Münzturmiin; taustalla Hallin kaupungin kirkontornit ja Tirolin vuoret.',
      lahde: 'Valokuva: Hermann Hammer (User:Haneburger), Wikimedia Commons (CC0).',
      tekija: 'Hermann Hammer (User:Haneburger)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hall_in_Tirol_mit_Türmen.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hall-in-tirol-04907bd1.jpg',
        lyhyt: 'Ylhäältä otettu näkymä Hallin kaupunkiin ja vuoristoon.',
        selite: 'Hallin kaupungin katot ja kirkko sekä taustalla kohoava vuoristo.',
        lahde: 'Valokuva: -wuppertaler, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: '-wuppertaler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:AUT_Hall_in_Tirol,_Burg_Hasegg_004.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-hall-in-tirol-c46851fc.jpg',
        lyhyt: 'Hallin kaupunginkirkon torni sinisen hetken valossa.',
        selite: 'Hallin Stadtpfarrkirchen kellotorni ja goottilainen ikkuna sinisen hetken aikaan; kuva on otettu Langer Graben -kadulta.',
        lahde: 'Valokuva: Hermann Hammer (User:Haneburger), Wikimedia Commons (CC0).',
        tekija: 'Hermann Hammer (User:Haneburger)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hall_in_Tirol,_Stadtpfarrkirche_zu_blauen_Stunde.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Hall in Tirol',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mistä Hall-nimi tulee?',
      'Miten suolavesi kulki kaivokselta kaupunkiin?',
    ],
    korostukset: ['suola|suolaa'],
    nappi: 'Suolan kaupunki Inn-joen varrella, jonka nimi tarkoittaa suolaa',
    // 11.5 E / 47.28333333 N — en-Wikipedia "Hall in Tirol"
    laudat: {
      maailmankartta: { x: 6216.7, y: 1506.6 },
      europe: { x: 432, y: 650 },
    },
    teksti: 'Hall in Tirol on kaupunki Innsbruck-Landin piirikunnassa Tirolissa Itävallassa, noin '
      + 'viisi kilometriä Innsbruckista itään Inn-laaksossa 574 metrin korkeudessa. Hall '
      + 'mainitaan ensimmäisen kerran suolatehtaana Thaurin linnan lähellä vuoden 1232 '
      + 'asiakirjassa, ja nykyinen nimi on vuodelta 1256; kuten Halle, Hallein, Schwäbisch '
      + 'Hall ja Hallstatt, se johtuu keltinkielisestä suolaa tarkoittavasta sanasta. Absamin '
      + 'suolakaivos Hall-laaksossa oli 1200-luvulta alkaen kaupungin pääelinkeino: '
      + 'ensimmäinen kaivoskäytävä tehtiin vuonna 1272 kreivi Meinhard II:n käskystä, ja '
      + 'suolavesi johdettiin 10 kilometrin pituista putkea pitkin haihdutusaltaalle. '
      + 'Hallista tuli kaupunki vuonna 1303, ja suolakauppa vei tavaraa aina Sveitsiin, '
      + 'Mustaanmetsään ja Reinin laaksoon asti.',
    lahde: 'en-Wikipedia "Hall in Tirol", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miten suolavesi johdettiin Absamin suolakaivoksesta Hallin haihdutusaltaalle?',
      vaihtoehdot: [
        'Tynnyreissä hevosvaunuilla',
        'Puulautoilla Inn-jokea pitkin',
        'Kymmenen kilometrin putkea pitkin',
        'Vuoreen louhitussa kanavassa',
      ],
      oikea: 2,
      fakta: 'Hallin suolakauppa vei tavaraa aina Sveitsiin, Mustaanmetsään ja Reinin laaksoon '
        + 'asti.',
    },
  },
  {
    id: 'hahmotelma-ferlach',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-ferlach-58af6087.jpg',
      lyhyt: 'Ferlachin Pyhän Martinin seurakuntakirkon torni Kirchgassen varrella.',
      selite: 'Kuvassa on Ferlachin kaupunkiseurakunnan Pyhän Martinin kirkon (Stadtpfarrkirche Sankt Martin) torni sipulikupoleineen ja kolmiokuviointeineen Kärntenin Ferlachissa.',
      lahde: 'Valokuva: Johann Jaritz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Johann Jaritz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ferlach_Kirchgasse_22_Stadtpfarrkirche_Sankt_Martin_17052011_288.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-ferlach-bfa77914.jpg',
        lyhyt: 'Näkymä Hollenburgilta Draun yli Ferlachin ympäristön Karawankeille.',
        selite: 'Hollenburgilta otetussa kuvassa Drau-joki virtaa laakson pohjalla ja taustalla kohoavat Karawankien vuoret, muun muassa Košuta (Koschuta) ja Ferlacher Horn.',
        lahde: 'Valokuva: Schreckgespenst, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Schreckgespenst',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ferlacher_Horn_von_Hollenburg.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ferlach',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi Ferlachista tuli asesepänkaupunki?',
      'Missä Ferlach on?',
    ],
    korostukset: ['asesepän|asesepänperinteestään'],
    nappi: 'Itävallan eteläisin kaupunki, jonka asesepät ovat mestareita',
    // 14.3 E / 46.53333333 N — en-Wikipedia "Ferlach"
    laudat: {
      maailmankartta: { x: 6310, y: 1538.1 },
      europe: { x: 485.8, y: 669.8 },
    },
    teksti: 'Ferlach on Klagenfurt-Landin piirikunnan kaupunki Kärntenissä ja Itävallan eteläisin '
      + 'kaupunki. Se on tunnettu vuosisatoja vanhasta asesepänperinteestään, joka on ollut '
      + 'osa Itävallan aineetonta kulttuuriperintöä vuodesta 2010. Kaupunki sijaitsee Draun '
      + 'Rosental-laaksossa noin 17 kilometriä Klagenfurtista etelään, ja Karavankien harja '
      + 'muodostaa etelässä rajan Slovenian kanssa. Kärntenin herttuakunnan pääkaupungin '
      + 'siirto lähellä olevaan Klagenfurtiin noin vuoden 1518 tienoilla edisti ratkaisevasti '
      + 'Ferlachin kehittymistä ampuma-asevalmistuksen keskukseksi. Keisarinna Maria Teresian '
      + 'aikana kaupungin asesepistä tuli Habsburgien monarkian pääasiallisia asetoimittajia, '
      + 'ja Ferlachin aseita käyttivät myös Espanjan, Ranskan ja Turkin armeijat.',
    lahde: 'en-Wikipedia "Ferlach", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-st-anton',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-st-anton-08b90bb2.jpg',
      lyhyt: 'Näkymä St. Antonin kylään Galzig-gondolin yli.',
      selite: 'Rinteeltä otetussa kuvassa St. Anton am Arlberg levittyy laaksoon vuorten ja metsäisten rinteiden ympäröimänä; kirkon torni erottuu kylän keskeltä ja etualalla ylittää Galzig-gondoli.',
      lahde: 'Valokuva: Keimzelle, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Keimzelle',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blick_auf_St._Anton_-_Gondel_der_Galzig-Bahn.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-st-anton-2f34a0cb.jpg',
        lyhyt: 'St. Antonin rautatieaseman laituri ja Arlbergin tunnelin itäportaali.',
        selite: 'Kuvassa on St. Antonin aseman laituri, jonka päässä raiteet katoavat Arlbergin tunneliin; itäportaalin raiteiden katettu osuus on laiturin päätepiste.',
        lahde: 'Valokuva: 32-Fuß-Freak, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: '32-Fuß-Freak',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bhf_St._Anton_und_viergleisiges_Ostportal.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-st-anton-751193d0.jpg',
        lyhyt: 'Vanha mustavalkokuva St. Antonin kylästä ja Arlbergin radasta vuodelta 1941.',
        selite: 'Vorarlbergin maakuntakirjaston kokoelman mustavalkoisessa kuvassa vuodelta 1941 näkyvät St. Antonin kylä, rata sekä ympäröivät rinteet ja vuoret.',
        lahde: 'Valokuva: Sammlung Risch-Lau, Vorarlberger Landesbibliothek, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Sammlung Risch-Lau, Vorarlberger Landesbibliothek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Arlbergbahn_km101_St._Anton,_volare_o_6627_3000px.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'St. Anton am Arlberg',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Arlbergin hospiisi oli?',
      'Miksi St. Anton on hiihdon kehto?',
    ],
    korostukset: ['Arlberg|Arlbergin'],
    nappi: 'Arlbergin solan kylä, jossa hospiisi auttoi matkaajia jo keskiajalla',
    // 10.26666667 E / 47.11666667 N — en-Wikipedia "St. Anton am Arlberg"
    laudat: {
      maailmankartta: { x: 6175.6, y: 1513.6 },
      europe: { x: 408.3, y: 654.4 },
    },
    teksti: 'St. Anton am Arlberg, tavallisesti St. Anton, on kylä ja hiihtokeskus Tirolin '
      + 'osavaltiossa Itävallassa. Se sijaitsee Tirolin Alpeilla, ja köysiradat ja '
      + 'tuolihissit nousevat siellä 2 811 metriin, jolloin pystysuora pudotus on 1 507 '
      + 'metriä. St. Anton on suosittu kesäkohde myös vaeltajien ja vuorikiipeilijöiden '
      + 'keskuudessa. Hiihdolla on St. Antonissa pitkä historia: alueen hiihtoopettajat '
      + 'muuttivat 1930-luvulla Yhdysvaltoihin ja auttoivat tekemään lajin tunnetuksi. Kylä '
      + 'on osa Arlbergin hiihtoaluetta, johon kuuluu 94 köysirataa ja hissiä sekä 340 '
      + 'kilometriä kunnostettuja rinteitä. Lähellä olevassa Pyhän Christophin kylässä paimen '
      + 'Heinrich Findelkind rakensi 1300-luvulla hospiisin suojaksi Arlbergin solan '
      + 'ylittäville matkaajille.',
    lahde: 'en-Wikipedia "St. Anton am Arlberg", johdanto-osa ja osio "Activities" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miten St. Antonin hiihtoperinne levisi 1930-luvulla ulkomaille?',
      vaihtoehdot: [
        'Opettajat muuttivat Yhdysvaltoihin',
        'Olympiajoukkue lähti kylästä',
        'Kilpahiihtäjät voittivat olympiakultaa',
        'Oppikirja käännettiin monille kielille',
      ],
      oikea: 0,
      fakta: 'Lähellä sijaitsevassa Pyhän Christophin kylässä paimen Heinrich Findelkind rakensi '
        + '1300-luvulla hospiisin suojaksi Arlbergin solan ylittäville matkaajille.',
    },
  },
  {
    id: 'hahmotelma-oberndorf',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-oberndorf-3bac6dac.jpg',
      lyhyt: 'Oberndorfin Stille Nacht -muistokappeli.',
      selite: 'Kahdeksankulmainen Stille-Nacht-Gedächtniskapelle Oberndorf bei Salzburgissa kesäkuvassa: vaaleat seinät, puuhalkolaattakatteinen kupolikatto ja pieni lanterniini.',
      lahde: 'Valokuva: Michael Burgholzer, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michael Burgholzer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oberndorf,_Stille-Nacht-Kapelle_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-oberndorf-68d33a5c.jpg',
        lyhyt: 'Joseph Mohrin ja Franz Xaver Gruberin pronssinen muistomerkki.',
        selite: 'Oberndorfin Mohr-Gruber-Denkmal esittää Stille Nacht -joululaulun sanoittajaa Joseph Mohria ja säveltäjää Franz Xaver Gruberia, joka soittaa kitaraa.',
        lahde: 'Valokuva: Rufus46, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rufus46',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mohr-Gruber-Denkmal_Oberndorf_bei_Salzburg-1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-oberndorf-b29eed3d.jpg',
        lyhyt: 'Salzach-joen ylittävä silta Oberndorfin ja Laufenin välillä.',
        selite: 'Salzachin yli Oberndorfin ja Laufenin välillä kulkeva rautainen riippusilta rakennettiin vuosina 1902-1903; pylväiden päällä on siipiään levittäviä kotkia.',
        lahde: 'Valokuva: Rufus46, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rufus46',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Salzachbrücke_Laufen_Oberndorf_bei_Salzburg-1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Oberndorf',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka sävelsi Stille Nachtin?',
      'Miksi Oberndorf ja Laufen on jaettu kahtia?',
    ],
    korostukset: ['Stille Nacht|Stille Nacht'],
    nappi: 'Salzachin varren kirkko, jossa Stille Nacht -laulu on jo kaikunut vuodesta 1818',
    // 12.94166667 E / 47.94166667 N — en-Wikipedia "Oberndorf bei Salzburg"
    laudat: {
      maailmankartta: { x: 6264.7, y: 1478.7 },
      europe: { x: 459.7, y: 632.7 },
    },
    teksti: 'Oberndorf bei Salzburg on pieni kaupunki Salzburgin osavaltiossa Itävallassa, noin '
      + '17 kilometriä Salzburgin kaupungista pohjoiseen Salzach-joen varrella. Joen toisella '
      + 'puolella on Baijerin Laufen. Kaupunki jaettiin kahtia Napoleonin sotien jälkeen, kun '
      + 'Salzburgin arkkipiispakunta jaettiin vuonna 1816 Wienin kongressin jälkeen Baijerin '
      + 'kuningaskunnan ja Itävallan keisarikunnan kesken. Oberndorf on tunnettu '
      + 'maailmanlaajuisesti Stille Nacht -joululaulun syntypaikkana: koulumestari Franz '
      + 'Xaver Gruber ja nuori pappi Joseph Mohr esittivät laulun ensimmäisen kerran '
      + 'jouluaattona 1818 Nikolauskirchessä. 1890-luvulla Salzachin tulvat tuhosivat suuren '
      + 'osan Oberndorfia, kirkko purettiin lopulta ja sen paikalle rakennettiin '
      + 'muistokappeli vuonna 1937.',
    lahde: 'en-Wikipedia "Oberndorf bei Salzburg", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi Oberndorf on Itävallassa, vaikka joen toisen puolen Laufen on Baijerissa?',
      vaihtoehdot: [
        'Salzachin tulva muutti uomaa',
        'Baijerin kuningas osti rannan',
        'Kansanäänestys ratkaisi rajan',
        'Arkkipiispakunta jaettiin 1816',
      ],
      oikea: 3,
      fakta: 'Stille Nacht -joululaulu esitettiin ensimmäisen kerran jouluaattona 1818 '
        + 'Nikolauskirchessä.',
    },
  },
  {
    id: 'hahmotelma-mayerling',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mayerling-4d035966.jpg',
      lyhyt: 'Mayerlingin karmeliittaluostarin kappeli ja rakennukset ilmasta.',
      selite: 'Ilmakuvassa näkyy Mayerlingin karmeliittaluostari (Karmel Mayerling) Ala-Itävallassa, jonka goottilaistyylinen kappeli on rakennettu entisen metsästyshuvilan paikalle.',
      lahde: 'Valokuva: C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.Stadler/Bwag',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alland_-_Karmel_Mayerling_(a).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mayerling-87523bd8.jpg',
        lyhyt: 'Mayerlingin karmeliittaluostarin kappelin julkisivu ja sivusiipi.',
        selite: 'Kuvassa on Mayerlingin karmeliittaluostarin kirkko sivusta katsottuna: vaalea kivijulkisivu suippokaari-ikkunoineen ja kirjava kattokuvio.',
        lahde: 'Kuva: Allander, Wikimedia Commons (public domain).',
        tekija: 'Allander',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mayerling_Kirche_und_Karmelkloster.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-mayerling-d5e8f375.jpg',
        lyhyt: 'Mayerlingin karmeliittakappelin goottilaisen julkisivun yksityiskohta.',
        selite: 'Lähikuvassa on kappelin päätyjulkisivu koristeellisine kiviyksityiskohtineen ja lasimaalausikkunoineen; päädyssä lukee vuosiluku 1889.',
        lahde: 'Valokuva: GuentherZ, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'GuentherZ',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2015-04-05_(4)_Mayerling_Karmel.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mayerling',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka kruununprinssi Rudolf oli?',
      'Mikä Mayerlingin huvilasta tuli?',
    ],
    korostukset: ['Rudolf|Rudolf'],
    nappi: 'Wienin metsän kylä, jossa Rudolfin metsästyshuvila rakennetaan myöhemmin',
    // 16.09833333 E / 48.04694444 N — en-Wikipedia "Mayerling"
    laudat: {
      maailmankartta: { x: 6369.9, y: 1474.2 },
      europe: { x: 520.3, y: 630 },
    },
    teksti: 'Mayerling on pieni kylä Ala-Itävallassa, ja se kuuluu Allandin kuntaan Badenin '
      + 'piirikunnassa. Se sijaitsee Schwechat-joen varrella Wienin metsässä, 24 kilometriä '
      + 'Wienistä lounaaseen. Vuodesta 1550 alkaen kylä kuului Heiligenkreuzin luostarille. '
      + 'Vuonna 1886 keisari Frans Joosefin ja keisarinna Elisabethin ainoa poika, '
      + 'kruununprinssi Rudolf, hankki kartanon ja muutti sen metsästyshuvilaksi; '
      + 'kruununprinssi kuoli siellä 30. tammikuuta 1889. Tarkkoja tapahtumia ei tiedetä. '
      + 'Kuoleman jälkeen keisari Frans Joosef, joka halusi lahjoittaa uuden kirkon, muutti '
      + 'metsästyshuvilan luostariksi, jonka asukkaiksi tulivat karmeliittanunnat.',
    lahde: 'en-Wikipedia "Mayerling", johdanto-osa ja osio "The Mayerling incident" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-bad-gastein',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bad-gastein-8542c4cd.jpg',
      lyhyt: 'Gasteinin vesiputous virtaa Bad Gasteinin keskustan halki.',
      selite: 'Gasteiner Ache -joen vesiputous syöksyy kallioseinämän kautta keskelle Bad Gasteinin taloja; etualalla on sillan kaide.',
      lahde: 'Valokuva: Naturpuur, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Naturpuur',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gasteiner_Wasserfall,_Bad_Gastein_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bad-gastein-ea3bff8f.jpg',
        lyhyt: 'Bad Gasteinin Grand Hotel de l\'Europe.',
        selite: 'Myöhäishistorismin tyyliin rakennettu hotelli valmistui vuosina 1906-1909 tuomiorakentaja Matthäus Schlagerin piirustusten mukaan.',
        lahde: 'Valokuva: Helmlechner, Wikimedia Commons (CC0).',
        tekija: 'Helmlechner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grand_Hotel_de_l’Europe_Bad_Gastein_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/aut-nosto-bad-gastein-2c9937f6.jpg',
        lyhyt: 'Gasteinin vesiputous alhaalta katsottuna.',
        selite: 'Kuvassa vesiputous syöksyy metsäisen rinteen ja Bad Gasteinin talojen välistä; putouksen vieressä on entinen voimalaitos.',
        lahde: 'Valokuva: Man77, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Man77',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bad_Gastein_Wasserfall_von_unten.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bad Gastein',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Bad Gastein on kylpyläkaupunki?',
      'Kuka Paracelsus oli?',
    ],
    korostukset: ['Paracelsus|Paracelsus'],
    nappi: 'Vesiputouksen kylpyläkaupunki, jossa keisarikin on hakenut terveyttä',
    // 13.01666667 E / 47.1 N — en-Wikipedia "Bad Gastein"
    laudat: {
      maailmankartta: { x: 6267.2, y: 1514.3 },
      europe: { x: 461.1, y: 654.9 },
    },
    teksti: 'Bad Gastein on kylpyläkaupunki St. Johann im Pongaun piirikunnassa Itävallassa. Se '
      + 'sijaitsee kauniisti Hohe Tauernin vuoriston korkeassa laaksossa, ja se on tunnettu '
      + 'Gasteinin vesiputouksesta ja monista suurista hotellirakennuksista. Kaupungin '
      + 'keskusta on vesiputouksen luona noin tuhannen metrin korkeudessa merenpinnasta. Sana '
      + 'Bad tarkoittaa kylpyä, ja kaupungin maine perustuu paikallisen '
      + 'Heilstollen-parannustunnelin kuumaan lähdeveteen, jota Paracelsus (1493–1541) oli '
      + 'tutkinut. 1500-luvulla Gasteinin kuumat lähteet alkoivat olla suosittu '
      + 'kylpylämatkakohde, ja Salzburgin arkkipiispa Colloredo rakennutti kaupunkiin '
      + 'klassistisen palatsin, joka kunnostettiin julkiseksi kylpylaitokseksi vuonna 1807; '
      + 'samana vuonna kaupunkia kävi katsomassa myös keisari Frans II.',
    lahde: 'en-Wikipedia "Bad Gastein", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
];
