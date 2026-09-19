/*
 * KROATIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin, Unkarin ja Irlannin jälkeen Kroatia.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä edellisten maiden pakat: jokaisella nostolla on
 * valmis sisältö — `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Kroatia-Slavonia on Unkarin
 * kruunun alla (Nagodba 1868), Dalmatia ja Istria ovat Itävallan puolella,
 * Sotilasraja (Karlovac, Slavonski Brod, Đurđevac) on vielä Habsburgien
 * sotilashallinnossa (lakkautus 1881), ja Đakovon katedraali on Strossmayerin
 * rakennettavana (1866–82). Vukovar on Tonavan kauppakaupunki ja
 * käsitellään asiallisesti ilman sotakuvia; Kumrovec vanhana kylänä ilman
 * Tito-kulttia. Vuoden 1873 jälkeiset asiat (Krkin silta 1980, Kornatin
 * kansallispuisto 1980, Krkan kansallispuisto 1985) ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `hrv-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/hrv/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Dubrovnik, Kroatian ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 26 lautayksikön päässä kaupungin merkistä ja
 * keskenään yli 9 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.HRV:iin. Kroatiassa on jo 25 nostoa; Zagreb, Split,
 * Rijeka, Zadar, Osijek, Plitvicen järvet, Pulan areena, Hvar, Korčula,
 * Mljet, Stonin muurit, Sava, Drava ja muut ovat niiden joukossa eikä
 * niitä toisteta. `lahi: true` on sama lähizoomiportti kuin Ranskan
 * hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Kroatian fokuslehden rajaukseen
 * (`osuuLehteen`). Kymmenen saari- ja rannikkokohdetta (Neretva, Rovinj,
 * Omiš, Trogir, Pag, Krk, Kornati, Lastovo, Mali Lošinj, Vis) on pelin
 * karkean maailmankartan HRV-renkaan ULKOPUOLELLA, koska rengas on
 * yksinkertaistettu; niiden koordinaatit ovat Wikipedian todelliset.
 * Trogir on 6,3 yksikköä Splitin nykyisestä merkistä (hyväksytty).
 */

/** Kroatian hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_HRV = [
  {
    id: 'hahmotelma-krka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-krka-2d916659.jpg',
      lyhyt: 'Skradinski bukin vesiputoukset vehreän rehevän metsän keskellä.',
      selite: 'Skradinski buk on Krka-joen pisin ja tunnetuin putousportaikko Krkan kansallispuistossa. Kuvassa vesi virtaa turkoosiin altaaseen kahden porrasmaisen putouksen kautta.',
      lahde: 'Valokuva: Skot, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Skot',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skradinski_buk_waterfall_%E2%80%93_NP_Krka_%E2%80%93_2016.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-krka-84b399a3.jpg',
        lyhyt: 'Roški slap -putous vuoren rinteen alla Krka-joen rannalla.',
        selite: 'Roški slap on Krkan kansallispuiston putouksia. Kuvassa vesi syöksyy kallioisen kukkulan juurella metsän seasta joen tyyneen veteen.',
        lahde: 'Valokuva: Falk2, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Falk2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:I10_399_Ro%C5%A1ki_slap.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Krka',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Minä vuonna Krka julistettiin kansallispuistoksi?',
      'Kuinka monta kasvilajia tai alalajia Krkan puistossa on tunnistettu?',
    ],
    korostukset: ['kansallispuisto|kansallispuisto'],
    nappi: 'Dalmatian joki kanjoneineen ja putouksineen, Itävallan kruunumaata',
    // 15.97277778 E / 43.80194444 N — en-Wikipedia "Krka National Park"
    laudat: {
      maailmankartta: { x: 6365.8, y: 1650.8 },
      europe: { x: 517.9, y: 741.6 },
    },
    teksti: 'Krkan kansallispuisto on Šibenik-Kninin läänissä Dalmatian keskiosassa Krka-joen '
      + 'varrella, muutaman kilometrin koilliseen Šibenikistä. Puisto julistettiin '
      + 'kansallispuistoksi vuonna 1985, ja se on Kroatian seitsemäs kansallispuisto; sen '
      + 'pinta-ala on 109 neliökilometriä Kninin alapuolelta Skradiniin sekä Čikola-joen '
      + 'alaosan. Alueella on tunnistettu 860 kasvilajia tai alalajia ja 222 lintulajia, ja '
      + 'Krka-joessa elää kahdeksantoista kalalajia, joista kymmenen on endeemisiä. Joen '
      + 'putousten ympäristössä laventelia on Euroopan toiseksi tiheimmin, ja siksi paikalla '
      + 'on paljon ampiaisia ja mehiläisiä.',
    lahde: 'en-Wikipedia "Krka National Park", johdanto-osa ja osiot "Geography" ja '
      + '"Environment" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Krka julistettiin kansallispuistoksi?',
      vaihtoehdot: [
        '1965',
        '1975',
        '1985',
        '1995',
      ],
      oikea: 2,
      fakta: 'Krkan vesiputousten alueella on Euroopan toiseksi tiheimmin laventelia.',
    },
  },
  {
    id: 'hahmotelma-kornati',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kornati-c9741e7e.jpg',
      lyhyt: 'Kornatien paljaat, karut saarikukkulat kirkkaansinisen meren ympäröiminä.',
      selite: 'Kornatien saaristo koostuu kasvillisuudeltaan niukoista kalkkikivisaarista. Kuvassa ruohon peittämät saarenrinteet nousevat tyynestä sinisestä merestä.',
      lahde: 'Valokuva: Ivana, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ivana',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kornati_2.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kornati-74645e51.jpg',
        lyhyt: 'Ilmakuva Kornatin saaresta ja sen lähisaarista sinisen meren keskellä.',
        selite: 'Kuva on otettu ylhäältä, ja siinä Kornatin saaren eteläosa ja sitä ympäröivät lukuisat pienet saaret erottuvat vaaleina läiskinä merta vasten.',
        lahde: 'Valokuva: Bogdan Giușcă, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bogdan Giușcă',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:South_part_of_Kornat_island_and_nearby_islands.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kornati',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Minkä saaren nimestä Kornatin saariston nimi on peräisin?',
      'Mistä kunnasta kansallispuistoa hallinnoidaan?',
    ],
    korostukset: ['karstikalkkikivi|karstikalkkikiveä'],
    nappi: 'Karu saaristo Dalmatian edustalla; Murterin asukkaat ostavat saaret vasta 1800-luvun lopulla',
    // 15.33333333 E / 43.78333333 N — en-Wikipedia "Kornati"
    laudat: {
      maailmankartta: { x: 6344.4, y: 1651.6 },
      europe: { x: 505.6, y: 742.1 },
    },
    teksti: 'Kornatin saaristo sijaitsee Pohjois-Dalmatiassa Zadarista etelään ja Šibenikistä '
      + 'länteen. Saaristo ulottuu 35 kilometrin matkalle noin 320 neliökilometrin '
      + 'merialueella, ja se on Välimeren tiheimpiä; nimi on monikko suurimman saaren, '
      + 'Kornatin, nimestä. Pysyviä asutuskeskuksia ei ole, vaan mantereen maanomistajat, '
      + 'enimmäkseen Murterin ja Dugi Otokin saarilta, käyttävät suojaisissa poukamissa '
      + 'yksinkertaisia taloja tilapäisinä majoina. Saaret ovat enimmäkseen '
      + 'karstikalkkikiveä, ja vuonna 1980 osasta perustettiin kansallispuisto; Kornatilla on '
      + 'jäänteitä roomalaisista huviloista ja pieni Toreta-torni, joka on luultavasti '
      + '500-luvulta. Murterin asukkaat ostivat saaret 1800-luvun lopulla.',
    lahde: 'en-Wikipedia "Kornati", johdanto-osa ja osiot "Settlement", "National park" ja '
      + '"Geology" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä saaren mukaan Kornatin saaristo on nimetty?',
      vaihtoehdot: [
        'Kornat',
        'Murter',
        'Žut',
        'Piškera',
      ],
      oikea: 0,
      fakta: 'Kornat on saaristosta suurin: 25,2 kilometriä pitkä mutta enintään 2,5 kilometriä '
        + 'leveä.',
    },
  },
  {
    id: 'hahmotelma-lonjsko-polje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-lonjsko-polje-72eaba0b.jpg',
      lyhyt: 'Krapjen kylän katu, jonka varrella on perinteisiä tummia puutaloja.',
      selite: 'Krapje on Lonjsko Poljen luonnonpuiston kylä, jossa Savan tulva-alueen perinteinen puurakennustapa on säilynyt. Kuvassa jyrkkälappeiset tiilikatot ja hirsiseinät seisovat tien varrella.',
      lahde: 'Valokuva: FrAnneser, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'FrAnneser',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stra%C3%9Fenzug_in_Krapje_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-lonjsko-polje-cc5e6d20.jpg',
        lyhyt: 'Haikaroita pesillään Čigoćin kylän puutalon katolla.',
        selite: 'Čigoć tunnetaan Euroopan haikarakylänä. Kuvassa valkoiset haikarat seisovat oksista rakennetuilla pesillä perinteisen puutalon katolla.',
        lahde: 'Valokuva: Fraxinus Croat, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fraxinus Croat',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cigoc1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-lonjsko-polje-491aeaa1.jpg',
        lyhyt: 'Savan tyyni vesi ja laiduntavaa karjaa vastarannan niityllä.',
        selite: 'Lonjsko Poljen tulvakosteikko syntyy Savan varrelle. Kuvassa joen vastarannan vihreällä niityllä laiduntaa karjaa.',
        lahde: 'Valokuva: Fraxinus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fraxinus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lonjsko_Polje_Sava.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lonjsko polje',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Kuinka suuri Lonjsko polje on neliökilometreinä?',
      'Minkä joen varrella kosteikko sijaitsee?',
    ],
    korostukset: ['kosteikko|kosteikko'],
    nappi: 'Savan tulvamaa Sisakin itäpuolella',
    // 16.64 E / 45.42 N — en-Wikipedia "Lonjsko Polje"
    laudat: {
      maailmankartta: { x: 6388, y: 1584.4 },
      europe: { x: 530.7, y: 699.1 },
    },
    teksti: 'Lonjsko polje on Kroatian ja koko Tonavan vesistöalueen suurin suojeltu kosteikko, '
      + 'jonka pinta-ala on 505,6 neliökilometriä. Se ulottuu Sava-joen varrella Sisakin '
      + 'itäpuolelta Nova Gradiškan länsipuolelle, ja nimi tulee alajuoksulla virtaavasta '
      + 'Lonja-joesta; alueeseen kuuluu myös Veliki Strug -joen varsi. Alue on luonnonpuisto '
      + '(park prirode), jonka hallinto perustettiin vuonna 1998 ja jonka toimipaikka on '
      + 'Krapjen kylä. Euroopan unionin lintudirektiivin kriteerien mukaan puisto on lisäksi '
      + 'tärkeä lintualue.',
    lahde: 'en-Wikipedia "Lonjsko Polje", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kopacki-rit',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kopacki-rit-7b77892f.jpg',
      lyhyt: 'Puinen kävelysilta kulkee kosteikon yli Kopački ritin luonnonpuistossa.',
      selite: 'Kopački rit on Tonavan ja Dravan tulvakosteikko lähellä Osijekia. Kuvassa puinen laituripolku kaartuu tumman, lumpeita kasvavan veden yli.',
      lahde: 'Valokuva: Misalalic, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Misalalic',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kopa%C4%8Dki_rit_wooden_trail.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kopacki-rit-43dd6aa8.jpg',
        lyhyt: 'Sakadašin järven tyyni vesi ja rantapuut Kopački ritissä.',
        selite: 'Kuva on otettu Kopački ritin luonnonpuiston Sakadašin järveltä Kopačevon kohdalta. Vehreät rantapuut heijastuvat rauhalliseen veteen.',
        lahde: 'Valokuva: Antimuonium, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Antimuonium',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kopa%C4%8Dki_Rit,_Sakada%C5%A1_lake,_Kopa%C4%8Devo,_2025_(9).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kopački rit',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Kuinka monta lintulajia Kopački ritillä pesii?',
      'Minkä jokien yhtymäkohdan luoteispuolella luonnonpuisto on?',
    ],
    korostukset: ['kosteikko|kosteikoista'],
    nappi: 'Tonavan sivuvesien kosteikko Osijekin lähellä',
    // 18.89194444 E / 45.63083333 N — en-Wikipedia "Kopački Rit"
    laudat: {
      maailmankartta: { x: 6463.1, y: 1575.7 },
      europe: { x: 573.9, y: 693.5 },
    },
    teksti: 'Kopački rit on luonnonpuisto Itä-Kroatiassa Bilje- ja Kneževi Vinogradi -kuntien '
      + 'alueella, Dravan ja Tonavan yhtymäkohdan luoteispuolella lähellä Serbian rajaa. '
      + 'Alueella on runsaasti Tonavan sivuvesiä ja lampia, ja se on yksi Euroopan '
      + 'tärkeimmistä, suurimmista ja vaikuttavimmista koskemattomina säilyneistä '
      + 'kosteikoista. Siellä pesii noin 260 lintulajia, muun muassa merikotka, valkoinen '
      + 'haikara ja mustahaikara, ja vesissä elää noin 40 kalalajia. Osijekin läheisyys ja '
      + 'hyvät yhteydet tuovat kävijöitä, jotka tekevät retkiä panoraamalaivoilla, veneillä, '
      + 'hevosvaunuilla tai jalan.',
    lahde: 'en-Wikipedia "Kopački Rit", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-krk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-krk-7693db5e.jpg',
      lyhyt: 'Krkin kaupungin vanhakaupunki, satama ja katedraalin kellotorni.',
      selite: 'Kuvassa näkyy Krkin vanhakaupunki, jonka yllä kohoaa katedraalin torni. Etualalla on satama, jossa on veneitä ja rantaravintoloita.',
      lahde: 'Valokuva: Falk2, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Falk2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:J32_175_Krk-Stadt.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-krk-83b5c16f.jpg',
        lyhyt: 'Ilmakuva Baškan kaupungista turkoosin lahden rannalla vuoren juurella.',
        selite: 'Baška sijaitsee Krkin saaren eteläkärjessä. Kuvassa punakattoinen kaupunki ja satama levittäytyvät lahden rannalle kalliorinteen alle.',
        lahde: 'Valokuva: Arne Müseler, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Arne Müseler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ba%C5%A1ka_krk.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-krk-67f86a82.jpg',
        lyhyt: 'Krkin silta kaartuu merilahden yli mantereelle.',
        selite: 'Krkin silta yhdistää saaren mantereeseen. Kuvassa betoniset kaaret ylittävät kapean merenlahden tyynen, sinisen veden takana.',
        lahde: 'Valokuva: Viktar Palstsiuk, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Viktar Palstsiuk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Krk_Bridge,_Croatia.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Krk',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mikä saari on Adrianmeren väkirikkain?',
      'Minä vuonna silta mantereelle valmistui?',
    ],
    korostukset: ['Frankopan|Frankopan'],
    nappi: 'Kvarnerin suuri saari, jossa Frankopanien ja Venetsian aika näkyy yhä',
    // 14.6 E / 45.06666667 N — en-Wikipedia "Krk"
    laudat: {
      maailmankartta: { x: 6320, y: 1599 },
      europe: { x: 491.5, y: 708.3 },
    },
    teksti: 'Krk on Pohjois-Adrianmeren kroatialainen saari Kvarnerin lahdella lähellä Rijekaa. '
      + 'Se on Cresin kanssa Adrianmeren suurin saari mittaustavasta riippuen ja väkirikkain: '
      + 'asukkaita on 19 916 (2021). Saarella on asuttu keskeytyksettä neoliittiselta '
      + 'kaudelta, ja Krkin kaupungin roomalaisessa Curicumissa on löydetty Venuksen temppeli '
      + '1. vuosisadalta eaa., ainoa Adrianmeren itärannikolta tunnettu laatuaan. Krkin '
      + 'historia oli seitsemän vuosisataa tiiviisti sidoksissa Venetsiaan, ja Krkin kreivit, '
      + 'jotka ottivat vuonna 1430 nimen Frankopan, kuuluivat Kroatian mahtavimpiin '
      + 'aatelissukuihin. Saaren pohjoispäätä yhdistävä silta mantereelle valmistui '
      + 'heinäkuussa 1980.',
    lahde: 'en-Wikipedia "Krk", johdanto-osa ja osiot "History" ja "Tourism" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-vis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-vis-ef84d117.jpg',
      lyhyt: 'Ilmakuva Komižan satamasta ja vanhastakaupungista Vis-saarella.',
      selite: 'Punakattoisia kivitaloja, satama-allas ja kellotorni Komižassa, taustalla vehreät rinteet ja meri.',
      lahde: 'Valokuva: dronepicr, Wikimedia Commons (CC BY 2.0).',
      tekija: 'dronepicr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Komiza_Town_Harbour_with_a_view_to_St._Nicholas_Church_on_Vis_island,_Croatia_(48608316418).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-vis-5784c84f.jpg',
        lyhyt: 'Vis-saari ilmasta kaakosta katsottuna, keskellä Vis-kaupungin lahti.',
        selite: 'Vuoristoinen Vis-saari kohoaa syvänsinisestä Adrianmerestä; kaupunki näkyy pienenä rantaviivan varrella.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Vis_(view_from_the_southwest).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vis',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mikä on Kroatian mantereesta kaukaisin asuttu saari?',
      'Kuka johti Itävallan laivastoa vuonna 1866?',
    ],
    korostukset: ['Lissa|Lissan'],
    nappi: 'Lissa: saari, jonka vesillä Itävalta löi Italian laivaston vuonna 1866',
    // 16.1525 E / 43.0425 N — en-Wikipedia "Vis (island)"
    laudat: {
      maailmankartta: { x: 6371.8, y: 1681.7 },
      europe: { x: 521.3, y: 761.6 },
    },
    teksti: 'Vis on Adrianmeren kroatialainen saari ja Kroatian mantereesta kaukaisin asuttu '
      + 'saari; asukkaita oli 3 313 vuonna 2021. Saaren pinta-ala on 90 neliökilometriä ja '
      + 'korkein kohta on 587 metrin Hum. Antiikissa Syrakusan tyranni Dionysios Vanhempi '
      + 'perusti saarelle Issan siirtokunnan 300-luvulla eaa., ja Venetsian vallan päätyttyä '
      + 'saari kuului Itävallalle vuodesta 1814 nimellä Lissa. Saaren pohjoispuolella käytiin '
      + '1800-luvulla kaksi meritaistelua: vuonna 1811 brittiläinen laivue löi ranskalaisen '
      + 'Lissan taistelussa, ja 20. heinäkuuta 1866 Wilhelm von Tegetthoffin johtama '
      + 'Itävallan laivasto löi suuremman Italian laivaston ja upotti Re d’Italian. Saaren '
      + 'pääelinkeinot ovat viininviljely, kalastus ja matkailu.',
    lahde: 'en-Wikipedia "Vis (island)", johdanto-osa ja osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka johti Itävallan laivastoa Lissan meritaistelussa 20. heinäkuuta 1866?',
      vaihtoehdot: [
        'Radetzky',
        'Benedek',
        'Persano',
        'Tegetthoff',
      ],
      oikea: 3,
      fakta: 'Saaren korkein kohta on 587 metrin Hum.',
    },
  },
  {
    id: 'hahmotelma-pag',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-pag-341a3add.jpg',
      lyhyt: 'Ilmakuva Pagin kaupungista ja Pagin lahdesta.',
      selite: 'Pagin kaupunki punakattoisine taloineen ja pienvenesatama sijaitsevat kapean lahden pohjukassa, ympärillä paljaita karstisia rinteitä.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_town_of_Pag_(view_from_the_southeast).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-pag-be47e9a1.jpg',
        lyhyt: 'Ilmakuva Pagin suolanvalmistusaltaista karun saaren keskellä.',
        selite: 'Pitkä ja kapea suolanhaihdutusaltaiden alue erottuu värikkäinä ruutuina; taustalla merta ja Pagin kaupunki.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_Pag_salt_evaporation_ponds_(view_from_the_south).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-pag-2f886872.jpg',
        lyhyt: 'Paškin silta kaartuu kalkkikivisten rantakallioiden välillä Pagin saarelle.',
        selite: 'Silta yhdistää Pagin saaren mantereeseen, taustalla Velebit-vuoristo.',
        lahde: 'Valokuva: Olgierd Rudak, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Olgierd Rudak',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Paški_most_Pag_(2025-05-11).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pag',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Minkä lempinimen Pag on saanut maisemansa vuoksi?',
      'Kuinka pitkä silta yhdistää saaren mantereeseen?',
    ],
    korostukset: ['suola|suolaa'],
    nappi: 'Kuun saaren karu kalkkikivimaisema, jossa suolaa on tuotettu tuhat vuotta',
    // 14.96666667 E / 44.48333333 N — en-Wikipedia "Pag (island)"
    laudat: {
      maailmankartta: { x: 6332.2, y: 1623 },
      europe: { x: 498.6, y: 723.7 },
    },
    teksti: 'Pag on Pohjois-Adrianmeren saari, Kroatian rannikon viidenneksi suurin ja pisin '
      + 'rantaviivaltaan (269 kilometriä); sen pinta-ala on noin 284 neliökilometriä. Karun '
      + 'kuunmaisen maisemansa vuoksi sitä kutsutaan kuun saareksi. Pag on ainoa Kroatian '
      + 'saari, joka kuuluu kahteen lääniin, ja siellä on kaksi kaupunkia, Pag ja Novalja; '
      + '300 metrin pituinen kaarisilta yhdistää saaren eteläosan mantereeseen. Saarella on '
      + 'tuotettu suolaa yli tuhat vuotta: vanhin kirjallinen maininta on vuodelta 999, ja '
      + 'Pagin kaupungin synty liittyy siihen, että suojaisen lahden matalia poukamia '
      + 'käytettiin suolan valmistukseen. Tunnettuihin pagilaisiin kuuluu jesuiitta Bartol '
      + 'Kašić, joka kirjoitti ensimmäisen kroatian kieliopin.',
    lahde: 'en-Wikipedia "Pag (island)", johdanto-osa ja osiot "Geography", "History" ja '
      + '"Economy" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lastovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-lastovo-8a258d29.jpg',
      lyhyt: 'Lastovon kylän kivitaloja rinteellä, punaisia ja tummia tiilikattoja.',
      selite: 'Lastovon kylä Lastovon saariston luonnonpuistossa. Tiiviisti rinteeseen rakennettuja harmaita kivitaloja vihreine ikkunaluukkuineen.',
      lahde: 'Valokuva: Dijana Župan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dijana Župan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lastovo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-lastovo-e2e5c4ee.jpg',
        lyhyt: 'Skrivena luka -lahti ja karun kallioinen rannikko Lastovon luonnonpuistossa.',
        selite: 'Lastovon saariston luonnonpuiston Skrivena luka -lahti ylhäältä katsottuna; syvänsinistä merta, kalkkikivirinteitä ja niemen kärjessä valkoinen majakka.',
        lahde: 'Valokuva: Dijana Župan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dijana Župan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skrivena_luka,_Lastovo.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lastovo',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Kuinka monta saarta Lastovon saaristoon kuuluu?',
      'Minä vuonna saaristo julistettiin luonnonpuistoksi?',
    ],
    korostukset: ['karnevaali|karnevaali'],
    nappi: 'Lagosta: Dubrovnikin entinen saari Korčulan eteläpuolella, nyt Itävallan hallussa',
    // 16.86666667 E / 42.75 N — en-Wikipedia "Lastovo"
    laudat: {
      maailmankartta: { x: 6395.6, y: 1693.5 },
      europe: { x: 535, y: 769.3 },
    },
    teksti: 'Lastovo, italiaksi Lagosta, on Dubrovnik-Neretvan läänin saaristo ja kunta, johon '
      + 'kuuluu 46 saarta ja jonka maa-ala on noin 53 neliökilometriä; asukkaita on 792. '
      + 'Pääsaari on 13 kilometriä Korčulasta etelään ja yksi Adrianmeren syrjäisimpiä '
      + 'asuttuja saaria. Vuonna 1000 venetsialaiset hyökkäsivät ja tuhosivat asutuksen, '
      + 'koska saarelaiset harjoittivat merirosvousta, ja 1200-luvulla saari liittyi '
      + 'Dubrovnikin tasavaltaan (Ragusa), jossa se nautti tietynasteista itsehallintoa aina '
      + 'Napoleonin valtaukseen asti; sen jälkeen saarta hallitsivat Itävalta ja '
      + 'Itävalta-Unkari. Lastovon kylä on rakennettu luonnollisen amfiteatterin rinteille '
      + 'poispäin merestä, mikä on epätavallista Adrianmerellä. Suurin kulttuuritapahtuma on '
      + 'Poklade-karnevaali, ja vuonna 2006 saaristo julistettiin luonnonpuistoksi.',
    lahde: 'en-Wikipedia "Lastovo", johdanto-osa ja osio "Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mali-losinj',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-mali-losinj-a8ee777d.jpg',
      lyhyt: 'Mali Lošinjin satama, jossa purjelaivoja ja rantakatu vanhojen talojen edessä.',
      selite: 'Näkymä satamaan kaakkoon päin; rantakatu on Riva lošinjskih kapetana. Väriset talot nousevat metsäisen kukkulan juurelle.',
      lahde: 'Valokuva: Falk2, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Falk2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:J32_226_Hafen_Mali_Lošinj_(Klein_Lötzing).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-mali-losinj-86f89932.jpg',
        lyhyt: 'Ilmakuva Čikatin lahdesta Mali Lošinjin lähellä, männikön ympäröimä turkoosi vesi.',
        selite: 'Čikatin lahti Mali Lošinjissa: tiheää mäntymetsää, rantaa ja vaalea rakennus lahden pohjukassa.',
        lahde: 'Valokuva: Arne Müseler, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Arne Müseler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Čikat_Bay.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
    ],
    nimi: 'Mali Lošinj',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Kuinka monta laivatelakkaa kaupungissa oli vuonna 1868?',
      'Minä vuonna Mali Lošinj mainitaan ensi kerran?',
    ],
    korostukset: ['kauppalaivasto|kauppalaivasto'],
    nappi: 'Adrianmeren suurin kauppalaivasto; kultavuosi on juuri 1868',
    // 14.46666667 E / 44.53333333 N — en-Wikipedia "Mali Lošinj"
    laudat: {
      maailmankartta: { x: 6315.6, y: 1621 },
      europe: { x: 489, y: 722.4 },
    },
    teksti: 'Mali Lošinj on kaupunki Lošinjin saarella Kvarnerin alueella Länsi-Kroatiassa; '
      + 'kaupungin asukasluku oli 7 537 vuonna 2021. Se mainitaan ensi kerran vuonna 1398 '
      + 'nimellä Malo selo eli pieni kylä. Vuonna 1868 se koki kulta-aikansa: siellä oli '
      + 'yksitoista laivatelakkaa, ja Adrianmeren suurin ja kehittynein kauppalaivasto oli '
      + 'täällä, jopa Rijekan, Triesten ja Venetsian edellä. Amerikkalainen kirjailija '
      + 'Kenneth Roberts kirjoitti vuonna 1938, että saarella asui neljäsataa merikapteenia. '
      + 'Höyrykoneen keksiminen ja viiniköynnöstaudin puhkeaminen pysäyttivät kehityksen, ja '
      + 'kaupunki sijaitsee Lošinjin lahden suojaisimmassa osassa saaren aurinkoisella '
      + 'itäpuolella.',
    lahde: 'en-Wikipedia "Mali Lošinj", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Mali Lošinj koki kulta-aikansa, jolloin siellä oli yksitoista telakkaa?',
      vaihtoehdot: [
        '1798',
        '1868',
        '1918',
        '1938',
      ],
      oikea: 1,
      fakta: 'Kaupunki mainitaan ensi kerran vuonna 1398 nimellä Malo selo eli pieni kylä.',
    },
  },
  {
    id: 'hahmotelma-neretva',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-neretva-90a72f59.jpg',
      lyhyt: 'Näkymä Neretvan suiston hedelmätarhoihin, kanaviin ja vuoriin ylhäältä.',
      selite: 'Neretvan suiston laakso: suorakulmaisia hedelmätarhoja ja vesikanavia sekä taustalla vuoristo.',
      lahde: 'Valokuva: ChestnutHorse, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ChestnutHorse',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Delta_of_Neretva_river_in_Croatia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-neretva-86380798.jpg',
        lyhyt: 'Neretvan suiston viljelyalueita ja ruovikkoista lampea vuorten ympäröimänä.',
        selite: 'Neretvan suiston peltoja ja kanavia; keskellä pyöreä vesilampi ruohikon ja ruovikon keskellä.',
        lahde: 'Valokuva: Julien Seguinot, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Julien Seguinot',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Agriculture_in_the_Neretva_Delta.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-neretva-b5fe010a.jpg',
        lyhyt: 'Perinteisiä lađe-veneitä rivissä Neretvan tyynellä vedellä Metkovićissa.',
        selite: 'Lađe ovat Neretvan laakson perinteisiä veneitä; ne kelluvat jonossa joella Metkovićin rannan edustalla.',
        lahde: 'Valokuva: Ma▀▄Ga, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Ma▀▄Ga',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ladje_na_Neretvi.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Neretvan suisto',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Kuinka pitkä Neretva on kokonaisuudessaan?',
      'Minä vuonna Neretvan suisto tuli Ramsar-alueeksi?',
    ],
    korostukset: ['suisto|suiston'],
    nappi: 'Dalmatian suurin joki, jonka tulvatasanko avautuu Adrianmerelle',
    // 17.445 E / 43.01972222 N — en-Wikipedia "Neretva"
    laudat: {
      maailmankartta: { x: 6414.8, y: 1682.6 },
      europe: { x: 546.1, y: 762.2 },
    },
    teksti: 'Neretva, italiaksi Narenta, on Adrianmeren itäisen valuma-alueen suurimpia jokia ja '
      + 'Dinaaristen Alppien suurin karstijoki. Sen pituus on 225 kilometriä, josta 208 on '
      + 'Bosnia ja Hertsegovinassa ja viimeiset 22 kilometriä Kroatian Dubrovnik-Neretvan '
      + 'läänissä. Joen lähde on Zelengoran ja Lebršnikin vuorten juurella 1 227 metrin '
      + 'korkeudessa, ja viimeiset noin 30 kilometriä muodostavat leveän tulvatasangon, '
      + 'suiston, ennen Adrianmerta. Neretvan suisto on ollut Ramsar-alue vuodesta 1992, ja '
      + 'yhdessä Bosnian puolella olevan Hutovo Blaton kanssa se muodostaa yhden yhtenäisen '
      + 'suojelualueen.',
    lahde: 'en-Wikipedia "Neretva", johdanto-osa ja osiot "Geography and hydrology" ja "Hutovo '
      + 'Blato wetlands" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-omis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-omis-66ddcc3a.jpg',
      lyhyt: 'Panoraama Omišin vanhastakaupungista, Cetinan suusta ja kanjonin kallioista Mirabellan linnakkeelta katsottuna.',
      selite: 'Kuvassa Omišin terrakottakattoinen vanhakaupunki, Cetina-joen suvanto ja jyrkät kalliot, joiden välistä joki laskee Adrianmereen. Kuva on otettu Mirabellan (Peovican) linnakkeelta.',
      lahde: 'Valokuva: Bystroushaak, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Bystroushaak',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Omiš_from_Mirablella.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-omis-97a47c70.jpg',
        lyhyt: 'Mirabellan linnake kohoaa kalliolla Cetinan rannan talojen yläpuolella.',
        selite: 'Kuvassa Cetina-joen ranta Omišissa ja rinteessä ylhäällä Mirabellan (Peovican) linnake sekä sen alapuolinen muuri.',
        lahde: 'Valokuva: SchiDD, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'SchiDD',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:HR-Omis-Peovica-3.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-omis-fc28ee21.jpg',
        lyhyt: 'Starigradin linnake seisoo kalliolla Omišin yllä, taustalla Adrianmeri.',
        selite: 'Kuvassa Omišin yläpuolisella kalliolla oleva Starigradin (Fortica) linnake illansuussa, taustalla meri.',
        lahde: 'Valokuva: Larisa Uhryn, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Larisa Uhryn',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Omis_fortice_Starigrad.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Omiš',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Millä nimellä Omišin merirosvojen alukset tunnettiin?',
      'Mikä joki laskee Adrianmereen Omišin kohdalla?',
    ],
    korostukset: ['merirosvo|merirosvoista'],
    nappi: 'Almissa: Cetinan suun kaupunki, joka oli aikoinaan merirosvojen tukikohta',
    // 16.68333333 E / 43.43333333 N — en-Wikipedia "Omiš"
    laudat: {
      maailmankartta: { x: 6389.4, y: 1665.8 },
      europe: { x: 531.5, y: 751.3 },
    },
    teksti: 'Omiš on satamakaupunki Dalmatiassa noin 25 kilometriä Splitistä kaakkoon siinä, '
      + 'missä Cetina-joki laskee Adrianmereen; asukkaita on 14 139. Se tunnettiin aikoinaan '
      + 'Almissan merirosvoista, joiden nopeat alukset, sagittat eli nuolet, rakennettiin '
      + 'hyökkäämään ja vetäytymään nopeasti Cetinan suulle, joka suojeli kaupunkia. Poljican '
      + 'ruhtinaskunnan ylämaalaiset olivat merirosvojen ystäviä ja liittolaisia, ja '
      + '1400-luvun lopulta alkaen kaupunki kuului Venetsialle, jolloin sen italialainen nimi '
      + 'oli Almissa. Historiallisia kohteita ovat 1200-luvun Mirabellan linnake, 1400-luvun '
      + 'Starigradin linnoitus ja 900-luvun esiromaaninen Pyhän Pietarin kirkko, ja kaupunki '
      + 'tunnetaan dalmatialaisten a cappella -ryhmien perinteisestä festivaalista.',
    lahde: 'en-Wikipedia "Omiš", johdanto-osa ja osiot "History" ja "Culture" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-motovun',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-motovun-ad989ecb.jpg',
      lyhyt: 'Ilmakuva Motovunin kukkulakaupungista, jonka huipulla näkyy kellotorni ja kaupunginmuuri.',
      selite: 'Kuvassa Istrian sisämaan kukkulan päälle rakentunut Motovun. Huipulla on muurien ympäröimä vanhakaupunki ja kellotorni, ympärillä metsäisiä kukkuloita.',
      lahde: 'Valokuva: Ekaterina Polischuk, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ekaterina Polischuk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_to_Motovun.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-motovun-f3eae634.jpg',
        lyhyt: 'Näkymä Motovunin kaupunginmuurilta punaisten kattojen yli Istrian laaksoon.',
        selite: 'Kuvassa Motovunin terrakottakattoja ja kellotorni sekä alla avautuva Istrian kukkulamaisema. Kuva on otettu kaupungin muurilta.',
        lahde: 'Kuva: Dmitry Sokolov, Wikimedia Commons (public domain).',
        tekija: 'Dmitry Sokolov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Motovun_clouds.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Motovun',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä kukkulalla Motovun sijaitsee?',
      'Millä eläimillä tryffeleitä etsitään?',
    ],
    korostukset: ['tryffeli|tryffeleistä'],
    nappi: 'Istrian kukkulakaupunki, jonka Venetsian rakentamat muurit seisovat yhä',
    // 13.83333333 E / 45.33333333 N — en-Wikipedia "Motovun"
    laudat: {
      maailmankartta: { x: 6294.4, y: 1588 },
      europe: { x: 476.8, y: 701.3 },
    },
    teksti: 'Motovun on kylä ja kunta Istrian keskiosassa Länsi-Kroatiassa, 270 metriä '
      + 'merenpinnan yläpuolella olevalla kukkulalla, jossa talot ovat hajallaan. '
      + 'Keskiaikainen kaupunki kasvoi muinaisen linnakylän paikalle, ja Venetsia otti sen '
      + 'haltuunsa vuonna 1278 ja ympäröi sen vahvoilla muureilla, jotka ovat yhä ehjät ja '
      + 'toimivat kävelytienä. Tornit ja kaupunginportit ovat 1300–1600-luvuilta ja '
      + 'yhdistävät romaanista, goottilaista ja renessanssityyliä; myöhäisrenessanssin Pyhän '
      + 'Tapanin kirkon luonnokset on ehkä laatinut Andrea Palladio. Kukkulan alla virtaavan '
      + 'Mirna-joen toisella puolella on Motovunin metsä, joka tunnetaan arvostetuista '
      + 'mustista ja valkoisista tryffeleistä, ja koska sieni kasvaa maan alla, sitä etsitään '
      + 'koulutetuilla koirilla.',
    lahde: 'en-Wikipedia "Motovun", johdanto-osa ja osio "Description" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trogir',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-trogir-a8b1183d.jpg',
      lyhyt: 'Trogirin vanhakaupunki ja rantakatu heijastuvat tyyneen veteen Čiovon saarelta katsottuna.',
      selite: 'Kuvassa Trogirin vanhankaupungin rantajulkisivu kellotorneineen ja purjelaiva laiturissa. Kuva on otettu Čiovon saarelta.',
      lahde: 'Valokuva: Macic7, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Macic7',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trogir_from_island.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-trogir-1869e77c.jpg',
        lyhyt: 'Kamerlengon linnoituksen muurit ja Trogirin vanhankaupungin tornit ylhäältä nähtynä.',
        selite: 'Kuvassa Kamerlengon linnoituksen muurit ja holvikäytävät, taustalla Trogirin kellotornit ja palmukatuinen ranta. Linnoitus rakennettiin 1400-luvun puolivälissä Veriga-tornin laajennukseksi.',
        lahde: 'Valokuva: Krzysztof Bergier, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Krzysztof Bergier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fortress_Kamerlengo_14.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-trogir-e3a61fcc.jpg',
        lyhyt: 'Pyhän Laurentiuksen katedraalin goottilainen kellotorni Trogirissa.',
        selite: 'Kuvassa Trogirin Pyhän Laurentiuksen katedraalin koristeellinen kellotorni ja sisäänkäynnin kaari.',
        lahde: 'Valokuva: Fallaner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fallaner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trogir_Saint_Lawrence_Cathedral_2017_P06.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Trogir',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä saaren välissä Trogirin vanhakaupunki sijaitsee?',
      'Kuka teki Trogirin katedraalin kuuluisan portaalin?',
    ],
    korostukset: ['Kamerlengo|Kamerlengo'],
    nappi: 'Venetsian ajan saarikaupunki Dalmatiassa; hiippakunta lakkautettiin vuonna 1828',
    // 16.25136389 E / 43.51690278 N — en-Wikipedia "Trogir"
    laudat: {
      maailmankartta: { x: 6375, y: 1662.4 },
      europe: { x: 523.2, y: 749.1 },
    },
    teksti: 'Trogir on historiallinen kaupunki ja satama Dalmatian rannikolla 27 kilometriä '
      + 'Splitistä länteen; vanha kaupunki on pienellä saarella mantereen ja Čiovon saaren '
      + 'välissä. Kaupungin perustivat 300-luvulla eaa. kreikkalaiset siirtokuntalaiset Visin '
      + 'saarelta nimellä Tragurion, ja Salonan tuhon jälkeen sinne pakeni sen asukkaita. '
      + 'Vuonna 1123 saraseenit valtasivat ja melkein tuhosivat kaupungin, mutta se toipui '
      + 'nopeasti ja koki vaurauden 1100- ja 1200-luvuilla; Venetsian lähes neljä vuosisataa '
      + 'kestänyt hallinta alkoi vuonna 1420 ja jätti jälkeensä lukuisia renessanssiteoksia. '
      + 'Vanhan kaupungin 1200-luvun katedraalissa on mestari Radovanin portaali, ja '
      + '1400-luvun Kamerlengo-linnoitus kuuluu nähtävyyksiin. Historiallinen keskusta '
      + 'liitettiin Unescon maailmanperintöluetteloon vuonna 1997.',
    lahde: 'en-Wikipedia "Trogir", johdanto-osa ja osiot "History" ja "Main sights" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Trogirin vanhakaupunki liitettiin Unescon maailmanperintöluetteloon?',
      vaihtoehdot: [
        '1987',
        '1997',
        '2007',
        '1977',
      ],
      oikea: 1,
      fakta: 'Trogirin katedraalin portaali on mestari Radovanin uniikki teos.',
    },
  },
  {
    id: 'hahmotelma-rovinj',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-rovinj-a1f3bb0b.jpg',
      lyhyt: 'Rovinjin vanhakaupunki ja Pyhän Euphemian kirkon torni auringonlaskun valossa.',
      selite: 'Kuvassa värikkäiden talojen kukkulalle kohoava Rovinjin vanhakaupunki. Ylimpänä on Pyhän Euphemian kirkon kellotorni, etualalla meri ja satamalaituri purjeveneineen.',
      lahde: 'Valokuva: Ekaterina Polischuk, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ekaterina Polischuk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_to_Rovinj_old_town_at_sunset.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-rovinj-c65630a8.jpg',
        lyhyt: 'Rovinjin Pyhän Euphemian kirkon julkisivu ja kellotorni.',
        selite: 'Kuvassa Pyhän Euphemian kirkon vaalea julkisivu portaineen sekä sen vieressä kohoava kellotorni.',
        lahde: 'Valokuva: Berthold Werner, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Berthold Werner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Croatia_Rovinj_St_Euphemia_church_BW_2014-10-08_14-23-33.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Rovinj',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä Rovinjia kutsutaan italiaksi?',
      'Minä vuonna Rovinjin saari yhdistettiin mantereeseen?',
    ],
    korostukset: ['Balbin kaari|Balbin kaari'],
    nappi: 'Rovigno: Istrian kalastajakaupunki, jossa puhutaan yhä italiaa ja istriottia',
    // 13.63333333 E / 45.08333333 N — en-Wikipedia "Rovinj"
    laudat: {
      maailmankartta: { x: 6287.8, y: 1598.3 },
      europe: { x: 473, y: 707.9 },
    },
    teksti: 'Rovinj on Istrian länsirannikon kaupunki Pohjois-Adrianmerellä; asukkaita oli 12 968 '
      + 'vuonna 2021. Se on suosittu matkailukohde ja vilkas kalastussatama, ja istriotti, '
      + 'alueella ennen laajasti puhuttu romaaninen kieli, on yhä joidenkin kotikieli; '
      + 'kaupunki on virallisesti kaksikielinen, ja sen italialainen nimi on Rovigno. '
      + 'Venetsian hallinnon aikana 1283–1797 Rovinj oli yksi Istrian tärkeimmistä '
      + 'kaupungeista, ja sitä suojasi kaksi muurikehää, joiden jäänteitä on yhä jäljellä; '
      + 'laiturilla on kaupunginportti Balbin kaari vuodelta 1680 ja myöhäisrenessanssin '
      + 'kellotorni. Saarelle rakennettu kaupunki yhdistettiin mantereeseen täyttämällä salmi '
      + 'vasta vuonna 1763, ja nähtävyyksiin kuuluu Pyhän Euphemian kirkko.',
    lahde: 'en-Wikipedia "Rovinj", johdanto-osa ja osiot "History" ja "Sights and landmarks" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Rovinjin saari yhdistettiin mantereeseen täyttämällä salmi?',
      vaihtoehdot: [
        '1763',
        '1531',
        '1680',
        '1797',
      ],
      oikea: 0,
      fakta: 'Balbin kaari laiturilla on vuodelta 1680.',
    },
  },
  {
    id: 'hahmotelma-vukovar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-vukovar-f0818c28.jpg',
      lyhyt: 'Vukovarin Eltzin kartanon keltainen barokkijulkisivu.',
      selite: 'Kuvassa Eltzin kartanon pääjulkisivu keskirisaliitteineen ja mansardikattoineen, edessä nurmikenttä.',
      lahde: 'Valokuva: August Dominus, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'August Dominus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dvorac_Eltz_2021.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-vukovar-65d065da.jpg',
        lyhyt: 'Eltzin kartanon kulma syksyisten lehtipuiden takana Vukovarissa.',
        selite: 'Kuvassa kunnostettu Eltzin kartano, keltaiset julkisivut ja punainen tiilikatto, edessä keltaisia syyslehtiä kantavia puita.',
        lahde: 'Valokuva: Ivan Zrno, Wikimedia Commons (CC0).',
        tekija: 'Ivan Zrno',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dvorac_Eltz.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Vukovar',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Missä joessa Vukovarin satama sijaitsee Vukan yhtymäkohdassa?',
      'Minkä suvun kreivit ostivat suuren osan seudusta ottomaanien jälkeen?',
    ],
    korostukset: ['jokisatama|jokisatama'],
    nappi: 'Tonavan kauppakaupunki Vukan suulla, Eltzin kreivien herruuden keskus',
    // 19.0025 E / 45.34444444 N — en-Wikipedia "Vukovar"
    laudat: {
      maailmankartta: { x: 6466.7, y: 1587.6 },
      europe: { x: 576, y: 701 },
    },
    teksti: 'Vukovar on Slavonian ja Sremin itäosassa oleva kaupunki, jossa on Kroatian suurin '
      + 'jokisatama Vuka-joen ja Tonavan yhtymäkohdassa; nimi tarkoittaa Vukan varren linnaa. '
      + 'Keskiajalla alue oli Vukovon kreivikunnan keskus, ja Vukovarin vapaan kuninkaallisen '
      + 'kaupungin etuoikeudet myönnettiin vuonna 1231. Ottomaanien vallan jälkeen '
      + 'saksalaiset Eltzin kreivit ostivat suuren osan alueesta, ja Mainzin arkkipiispa '
      + 'Philip Karl Eltz osti vuonna 1736 laajan herruuden, jossa oli yli 30 asuttua '
      + 'paikkaa; suku vaikutti kaupungin talouteen ja kulttuuriin kaksi vuosisataa. Seudulla '
      + 'on asuttu viisituhatta vuotta, ja Vučedolin kulttuuri on erityisen merkittävä: '
      + 'vuonna 1938 löydetystä Vučedolin kyyhkystä tuli kaupungin tunnus. Kulttuuriperintöön '
      + 'kuuluvat 1700-luvun Eltzin kartano, keskustan barokkirakennukset ja '
      + 'fransiskaaniluostari; monet rakennukset kärsivät 1990-luvun sodassa ja on '
      + 'kunnostettu vuoden 1998 jälkeen.',
    lahde: 'en-Wikipedia "Vukovar", johdanto-osa ja osiot "Name", "History" ja "Cultural '
      + 'heritage" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-varazdin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-varazdin-5607de6e.jpg',
      lyhyt: 'Varaždinin valkoinen vanhalinna pyöreine torneineen iltavalossa.',
      selite: 'Varaždinin vanhalinna (Stari grad) on keskiaikainen linnoitus, jonka valkoiset tornit ja punaiset tiilikatot erottuvat nurmikon ja puiston keskeltä.',
      lahde: 'Valokuva: Ptrnc7965, Wikimedia Commons (CC0).',
      tekija: 'Ptrnc7965',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_Stari_Grad_Castle_August_2025.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-varazdin-a40bc9b1.jpg',
        lyhyt: 'Kuningas Tomislavin aukio Varaždinin vanhassakaupungissa, perällä kaupungintalon torni.',
        selite: 'Trg kralja Tomislava on Varaždinin keskusaukio, jota reunustavat barokkiset ja myöhemmät värikkäät julkisivut. Aukion päässä näkyy kaupungintalon vihreäkattoinen kellotorni.',
        lahde: 'Valokuva: Ptrnc7965, Wikimedia Commons (CC0).',
        tekija: 'Ptrnc7965',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_Center_Croatia_2025.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Varaždin',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Varaždinin suuri palo tuhosi suuren osan kaupunkia?',
      'Mikä vanhan linnan nykyinen käyttö on?',
    ],
    korostukset: ['barokki|barokkirakennuksistaan'],
    nappi: 'Barokkikaupunki, joka oli Kroatian pääkaupunki ennen vuoden 1776 paloa',
    // 16.33777778 E / 46.30805556 N — en-Wikipedia "Varaždin"
    laudat: {
      maailmankartta: { x: 6377.9, y: 1547.5 },
      europe: { x: 524.9, y: 675.7 },
    },
    teksti: 'Varaždin on Pohjois-Kroatian kaupunki 81 kilometriä Zagrebista koilliseen, joka '
      + 'tunnetaan barokkirakennuksistaan, musiikistaan, tekstiiliteollisuudestaan ja '
      + 'ruoastaan. Ensimmäinen kirjallinen maininta on 20. elokuuta 1181, ja Unkarin '
      + 'kuningas Andreas II julisti sen vapaaksi kuninkaalliseksi kaupungiksi vuonna 1209. '
      + 'Ottomaanien ryöstöretkien vuoksi kaupunki rakennettiin puolustusasentoon vanhan '
      + 'linnoituksen ympärille; 1300-luvulla aloitetun Vanhan linnan pyöreät tornit '
      + 'lisättiin seuraavalla vuosisadalla, ja nykyään linnassa on kaupunginmuseo. Vuoden '
      + '1756 tai 1766 tienoilta Varaždin oli koko Kroatian pääkaupunki, ja siellä '
      + 'kokoontuivat Kroatian valtiopäivät ja Maria Teresian perustama Kuninkaallinen '
      + 'neuvosto, kunnes huhtikuun 1776 tulipalo päätti sen. Palossa tuhoutui kokonaan 70 '
      + 'muurien sisäisestä 113 rakennuksesta.',
    lahde: 'en-Wikipedia "Varaždin", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-trakoscan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-trakoscan-7e7d2177.jpg',
      lyhyt: 'Trakošćanin valkoinen linna kohoaa metsäisen kukkulan päällä.',
      selite: 'Trakošćanin linnassa on pyöreitä torneja, rintavarustuksia ja korkea kulmatorni. Se seisoo kivisellä perustuksella puiden ympäröimänä.',
      lahde: 'Valokuva: Maxman, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Maxman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trako%C5%A1%C4%87an_2007.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-trakoscan-40de645d.jpg',
        lyhyt: 'Trakošćanin linna heijastuu syksyisen järven pintaan.',
        selite: 'Linna kohoaa kukkulalla järven takana, ja syksyn värit ja sininen taivas peilautuvat tyynestä vedestä.',
        lahde: 'Valokuva: Drazen Dombaj, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Drazen Dombaj',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:When_the_world_turns.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Trakošćan',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Trakošćanin nimi mainitaan ensi kerran?',
      'Minkä suvun omistukseen linna tuli vuonna 1584?',
    ],
    korostukset: ['Drašković|Drašković-suku'],
    nappi: 'Zagorjen linna, jonka Draškovićit herättävät romanttisessa hengessä uuteen elämään',
    // 15.94697778 E / 46.25816667 N — en-Wikipedia "Trakošćan Castle"
    laudat: {
      maailmankartta: { x: 6364.9, y: 1549.6 },
      europe: { x: 517.4, y: 677 },
    },
    teksti: 'Trakošćan on Pohjois-Kroatiassa Varaždinin läänissä oleva linna, jonka alku on '
      + '1200-luvulla ja jonka nimi mainitaan ensi kerran vuonna 1334; sitä pidetään Kroatian '
      + 'parhaiten säilyneenä ja yhtenä kauneimmista linnoista. Se rakennettiin pieneksi '
      + 'tähystyslinnoitukseksi valvomaan Ptujin ja Bednjan laakson välistä tietä. Vuonna '
      + '1584 linnan omistajaksi tuli Drašković-suku, mutta 1700-luvun jälkipuoliskolla linna '
      + 'hylättiin ja rapistui. Vasta 1800-luvun puolivälissä Juraj V. Drašković muutti sen '
      + 'romantiikan hengessä, luontoon ja sukuperinteeseen palaten, asuinkartanoksi ja '
      + 'ympäröivän puiston huvipuistoksi. Suku asui linnassa vuoteen 1944, ja museo '
      + 'perustettiin vuonna 1953.',
    lahde: 'en-Wikipedia "Trakošćan Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-karlovac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-karlovac-fdeee7ae.jpg',
      lyhyt: 'Ilmakuva Karlovacista: tähtimuotoisen linnoituksen vallit ja punakattoinen vanhakaupunki.',
      selite: 'Karlovacin tähtimuotoinen Zvijezda-linnoitus näkyy ilmasta vihreinä vallipuistoina vanhankaupungin ympärillä. Taustalla erottuvat joenmutkat ja hedelmällinen tasanko.',
      lahde: 'Valokuva: Bukovacka, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bukovacka',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karlova%C4%8Dka_zvijezda-_Izvor-_Digitalni_Tisak.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-karlovac-3e933208.jpg',
        lyhyt: 'Koristeellinen kaivo Jelačićin aukiolla, taustalla kirkon torni.',
        selite: 'Kivinen ja tiilinen kaivorakennus patsaineen seisoo Karlovacin Jelačićin aukiolla. Sen takana kohoaa vihreä ja kermanvärinen kirkon torni sipulikupoleineen.',
        lahde: 'Valokuva: Szeder László, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Szeder László',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:HR-KA-Karlovac069.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Karlovac',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Karlovacin rakentaminen aloitettiin?',
      'Minkä muotoinen linnoitus Karlovacissa on?',
    ],
    korostukset: ['tähtilinnoitus|tähtilinnoitus'],
    nappi: 'Sotilasrajan tähtilinnoituskaupunki Kupan ja Koranan yhtymäkohdassa',
    // 15.55 E / 45.48333333 N — en-Wikipedia "Karlovac"
    laudat: {
      maailmankartta: { x: 6351.7, y: 1581.8 },
      europe: { x: 509.8, y: 697.4 },
    },
    teksti: 'Karlovac on Keski-Kroatian kaupunki 56 kilometriä Zagrebista lounaaseen; sen '
      + 'asukasluku oli 49 377 vuonna 2021. Itävaltalaiset rakensivat sen tyhjästä vuonna '
      + '1579 vahvistaakseen eteläistä puolustustaan ottomaanien hyökkäyksiä vastaan, ja '
      + 'rakennustyöt aloitettiin 13. heinäkuuta 1579 arkkiherttua Kaarle II:n käskystä, '
      + 'jonka mukaan kaupunki sai nimensä (saksaksi Karlstadt). Kuusikärkinen tähtilinnoitus '
      + 'rakennettiin Kupan ja Koranan yhtymäkohtaan, ja tähden muoto näkyy kaupungissa yhä. '
      + 'Paikka valittiin tahallaan tulville ja epäterveelliselle vedelle alttiiksi maastoksi '
      + 'turkkilaisten etenemisen hidastamiseksi. Karlovac oli yksi Sotilasrajan '
      + 'yleiskomennon ensimmäisistä päämajoista.',
    lahde: 'en-Wikipedia "Karlovac", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä hallitsijan mukaan Karlovac on nimetty?',
      vaihtoehdot: [
        'Keisari Kaarle Suuri',
        'Keisari Kaarle V',
        'Arkkiherttua Kaarle II',
        'Ruotsin kuningas Kaarle XII',
      ],
      oikea: 2,
      fakta: 'Kaupungin arkkitehti oli Matija Gambon.',
    },
  },
  {
    id: 'hahmotelma-slavonski-brod',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-slavonski-brod-eb3120a5.jpg',
      lyhyt: 'Ilmakuva Brodin linnoituksesta: tähtimäiset vallit, vallihaudat ja sisäpihan rakennukset.',
      selite: 'Slavonski Brodin linnoitus rakennettiin vuosina 1715–1780 Itävallan arkkiherttuakunnan aikana. Ilmakuvassa erottuvat bastionit, vesiset vallihaudat ja linnoituksen sisäpiha.',
      lahde: 'Valokuva: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Petar Milošević',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tvr%C4%91ava_Brod_(Brod_Fortress,_Slavonski_Brod,_Croatia).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-slavonski-brod-d9973239.jpg',
        lyhyt: 'Ilmakuva Slavonski Brodin kaupungista ja Savan rannasta.',
        selite: 'Kaupungin vanha keskusta levittäytyy Savan leveän joen rannalle. Kuvan vasemmassa laidassa näkyy Brodin linnoituksen vihreitä valleja.',
        lahde: 'Valokuva: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petar Milošević',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slavonski_Brod_(%D0%A1%D0%BB%D0%B0%D0%B2%D0%BE%D0%BD%D1%81%D0%BA%D0%B8_%D0%91%D1%80%D0%BE%D0%B4,_%D0%A5%D1%80%D0%B2%D0%B0%D1%82%D1%81%D0%BA%D0%B0).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Slavonski Brod',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä sana brod tarkoittaa muinaisslaaviksi?',
      'Mihin vuoteen asti kaupunki oli Sotilasrajan hallinnossa?',
    ],
    korostukset: ['linnoitus|linnoitus'],
    nappi: 'Brood: Savan rajakaupunki, joka kuuluu Sotilasrajan rykmentin alaisuuteen',
    // 18.01666667 E / 45.16666667 N — en-Wikipedia "Slavonski Brod"
    laudat: {
      maailmankartta: { x: 6433.9, y: 1594.9 },
      europe: { x: 557.1, y: 705.7 },
    },
    teksti: 'Slavonski Brod on Itä-Kroatian kaupunki lähellä Bosnian rajaa; se on yksi Slavonian '
      + 'ja Posavinan tärkeimmistä kaupungeista ja Savan jokisatama. Nimi tulee sanasta brod, '
      + 'muinaisslaaviksi kahluupaikka, ja kaupunki kehittyi strategisesti tärkeään Savan '
      + 'ylityskohtaan. Nimi mainitaan ensi kerran Unkarin kuninkaan Béla IV:n kirjeessä '
      + 'vuodelta 1224, ja ottomaanit hallitsivat asutusta vuodesta 1536 vuoteen 1691. '
      + 'Vuoteen 1918 saakka kaupunki kuului Itävallan monarkiaan, ja Slavonian '
      + 'sotilasrajalla se oli vuoteen 1881 asti (nimellä Brood ennen vuotta 1850). Suuri, '
      + 'barokkiajan Vauban-tyylinen Brodin linnoitus, joka rakennettiin suojaksi ottomaaneja '
      + 'vastaan Savan vastarannalla, on yksi Euroopan parhaiten säilyneistä linnoituksista.',
    lahde: 'en-Wikipedia "Slavonski Brod", johdanto-osa ja osiot "Names", "History" ja "Cultural '
      + 'heritage" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sisak',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-sisak-a27a2d44.jpg',
      lyhyt: 'Sisakin vanhan linnan pyöreät tiilitornit ja kartiomaiset katot.',
      selite: 'Sisakin vanha linna (Stari grad) on tiilinen linnoitus, jossa on kaksi pyöreää kulmatornia ja niiden välissä puinen kuisti. Linna sijaitsee Kupa-joen rannalla.',
      lahde: 'Valokuva: Kittykay18, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kittykay18',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sisak_Fortress,_Croatia_.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-sisak-da7116f7.jpg',
        lyhyt: 'Roomalaisen Siscian muurien jäännöksiä Sisakissa.',
        selite: 'Tiili- ja kivirakenteiset jäänteet ovat osa muinaisen roomalaiskaupungin Siscian puolustusmuureja Sisakin nykykaupungissa. Ne ajoittuvat 1.–3. vuosisadalle.',
        lahde: 'Valokuva: Darko Tepert Donatus, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Darko Tepert Donatus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sisak_Siscia_remnants.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Sisak',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä roomalaiset kutsuivat Sisakia?',
      'Kuka johti kroatialaisten puolustusta vuonna 1593?',
    ],
    korostukset: ['Siscia|Sisciaksi'],
    nappi: 'Kupan, Savan ja Odran yhtymäkohdan jokisatama, roomalainen Siscia',
    // 16.37611111 E / 45.48722222 N — en-Wikipedia "Sisak"
    laudat: {
      maailmankartta: { x: 6379.2, y: 1581.7 },
      europe: { x: 525.6, y: 697.3 },
    },
    teksti: 'Sisak on Keski-Kroatian kaupunki Kupan, Savan ja Odran yhtymäkohdassa 57 kilometriä '
      + 'Zagrebista kaakkoon; se on Kroatian suurin jokisatama. Roomalaiset kutsuivat sitä '
      + 'Sisciaksi: se oli Ylä-Pannonian tärkeimpiä paikkoja, koska se sijaitsi kahden '
      + 'purjehduskelpoisen joen varrella, ja Augustus ja Tiberius johtivat sieltä '
      + 'hankkeitaan pannonialaisia ja illyrialaisia vastaan. Vuonna 1593 kroaattien, '
      + 'itävaltalaisten ja krainilaisten yhteisjoukot löivät ottomaanit Sisakin taistelussa, '
      + 'joka oli ottomaanien armeijan ensimmäisiä merkittäviä tappioita Euroopan maaperällä. '
      + 'Puolustusta johtanut ban Thomas Erdődy tuli tunnetuksi koko Euroopassa, vaikka '
      + 'voitto ei estänyt ottomaaneja valtaamasta Sisakia 24. elokuuta 1593.',
    lahde: 'en-Wikipedia "Sisak", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna käytiin Sisakin taistelu, jossa ottomaanit kärsivät varhaisen tappion?',
      vaihtoehdot: [
        '1526',
        '1683',
        '1699',
        '1593',
      ],
      oikea: 3,
      fakta: 'Puolustusta johtanut ban Thomas Erdődy tuli tunnetuksi koko Euroopassa.',
    },
  },
  {
    id: 'hahmotelma-ilok',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-ilok-f33b9b12.jpg',
      lyhyt: 'Iločin Odescalchin linnan sisäpiha keltaisine ja punatiilisine siipineen.',
      selite: 'Kuva on otettu Iločin Odescalchin linnan (Dvorac Odescalchi) pihalta. Rakennuksen tiilikaarigalleria ja kellertävä julkisivu näkyvät kirkasta taivasta vasten.',
      lahde: 'Valokuva: Shabicht, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Shabicht',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ilok_castle.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-ilok-91e1ac7b.jpg',
        lyhyt: 'Vanha puupiirros Iločin linnakukkulasta ja kirkontornista.',
        selite: 'Ernest Krambergerin kuva Iločin linnoituksesta julkaistiin Vienac-lehdessä vuonna 1880. Kukkulan päällä kohoavat linnan muurit ja kirkon torni, alla virtaa vesi ja soutuvene.',
        lahde: 'Kaiverrus: Ernest Kramberger, Wikimedia Commons (public domain).',
        tekija: 'Ernest Kramberger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ilo%C4%8Dka_gradina_1880_E._Kramberger.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-ilok-231bbd20.jpg',
        lyhyt: 'Viinikellarin holvikäytävä täynnä suuria puutynnyreitä.',
        selite: 'Kuvassa on viinikellari (Ilok vinski podrum) Iločissa. Holvattu käytävä on molemmin puolin täynnä isoja puutynnyreitä.',
        lahde: 'Valokuva: Igor Karacic, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Igor Karacic',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ilok_vinski_podrum.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Ilok',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä joen rannalla Ilok sijaitsee?',
      'Minä vuonna Habsburgit ottivat kaupungin lopullisesti takaisin ottomaaneilta?',
    ],
    korostukset: ['Iločin linna|Iločin linna'],
    nappi: 'Kroatian itäisin kaupunki Tonavan äärellä, Sremin läänin piirikaupunki',
    // 19.37527778 E / 45.22194444 N — en-Wikipedia "Ilok"
    laudat: {
      maailmankartta: { x: 6479.2, y: 1592.6 },
      europe: { x: 583.2, y: 704.3 },
    },
    teksti: 'Ilok on Kroatian itäisin kaupunki, joka muodostaa maantieteellisen kiilan Serbian '
      + 'Vojvodinan ympäröimänä Sremin alueella Fruška Goran kukkulan rinteillä Tonavan yllä. '
      + 'Roomalaiset perustivat 1. tai 2. vuosisadalla Cuccium-nimisen, Tonavan ensimmäisen '
      + 'rajalinnoituksen. Keskiajalla Ilok oli Ylä-Sremin puolittain itsenäisen valtion '
      + 'pääkaupunki 1200- ja 1300-luvuilla, ja Iločkien eli Újlakien suku hallitsi sitä; '
      + 'ottomaanit valtasivat kaupungin vuonna 1526, ja Habsburgit ottivat sen lopullisesti '
      + 'takaisin vuonna 1697. Kaupungin nähtävyyksiä ovat fransiskaaniluostari ja Iločin '
      + 'linna, ja 1800-luvun lopulla Ilok oli Sremin läänin piirikunnan pääkaupunki '
      + 'Kroatia-Slavonian kuningaskunnassa.',
    lahde: 'en-Wikipedia "Ilok", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-djakovo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-djakovo-d248f2f0.jpg',
      lyhyt: 'Đakovon punatiilinen katedraali kaksine korkeine torneineen ja valkoinen piispanpalatsi.',
      selite: 'Pyhän Pietarin ja Paavalin katedraalin punatiiliset tornit kohoavat sinistä taivasta vasten. Etualalla on vaalea, koristeltu rakennus punaisine tiilikattoineen.',
      lahde: 'Valokuva: Modzzak, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Modzzak',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cathedral_Dakovo,_Croatia.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-djakovo-87f7a5c2.jpg',
        lyhyt: 'Katedraalin julkisivu alhaalta kuvattuna: kaksi tornia, kellotaulut ja ruusuikkuna.',
        selite: 'Kuva näyttää Đakovon katedraalin länsijulkisivun. Tornien välissä on kolmiosainen mosaiikkikuva ja alla suuri pyöreä ruusuikkuna.',
        lahde: 'Valokuva: Christian Thieltges, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Christian Thieltges',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Front_Cathedral_Dakovo.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-djakovo-6964cf24.jpg',
        lyhyt: 'Đakovon valtion ori- ja hevostilan oritalli, jonka portissa on hevossiluetit.',
        selite: 'Kuva esittää Đakovon valtion oritilan (Ergela Đakovo) oritallia Ivandvorin toimipaikassa. Portin rautakoristeissa on kaksi valkoista hevosen siluettia.',
        lahde: 'Valokuva: Tromber, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tromber',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:State_Stud_Farm_in_%C4%90akovo,_2015-05-01.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Đakovo',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka johti Đakovon katedraalin rakentamista?',
      'Minä vuonna lipizzanhevoslauma evakuoitiin Đakovoon?',
    ],
    korostukset: ['lipizzan|lipizzanhevoslauma'],
    nappi: 'Piispa Strossmayerin katedraali on rakenteilla (1866–1882) Slavonian hedelmällisellä tasangolla',
    // 18.41 E / 45.31 N — en-Wikipedia "Đakovo"
    laudat: {
      maailmankartta: { x: 6447, y: 1589 },
      europe: { x: 564.7, y: 701.9 },
    },
    teksti: 'Đakovo on Slavonian kaupunki, joka on hedelmällisen ja rikkaan Đakovon seudun '
      + 'keskus. Roomalaisaikana samalla paikalla oli Certissia, ja ensimmäinen '
      + 'asiakirjamaininta on vuodelta 1239, jolloin Unkarin Béla IV lahjoitti sen Bosnian '
      + 'hiippakunnalle; piispa siirsi istuimensa sinne vuonna 1246. Nykyinen Pyhän Pietarin '
      + 'katedraali rakennettiin vuosina 1866–1882 Đakovon ja Sremin katolisen piispan Josip '
      + 'Juraj Strossmayerin johdolla, ja se on koko Slavonian tärkein sakraalirakennus. '
      + 'Vuonna 1805 lipizzanhevoslauma evakuoitiin Đakovoon Napoleonin hyökättyä Itävaltaan '
      + 'ja Unkariin, ja osa laumasta jäi sinne pysyvästi. Kaupungin keskeinen '
      + 'perinnetapahtuma on Đakovački vezovi, Slavonian kansanperinteen ja kirjonnan esitys.',
    lahde: 'en-Wikipedia "Đakovo", johdanto-osa ja osiot "History" ja "Culture" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuka johti Đakovon katedraalin rakentamista vuosina 1866–1882?',
      vaihtoehdot: [
        'Piispa Strossmayer',
        'Keisari Franz Joseph',
        'Ban Jelačić',
        'Kardinaali Stepinac',
      ],
      oikea: 0,
      fakta: 'Vuonna 1805 lipizzanhevoslauma evakuoitiin Đakovoon Napoleonin hyökkäyksen vuoksi.',
    },
  },
  {
    id: 'hahmotelma-samobor',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-samobor-c35122b2.jpg',
      lyhyt: 'Samoborin pääaukio ylhäältä: punakattoiset talot ja metsäinen kukkula taustalla.',
      selite: 'Kuva esittää Samoborin pääaukiota (Trg kralja Tomislava) syksyisenä päivänä. Aukion reunoilla on matalia, punakattoisia taloja ja takana nousee metsäinen rinne.',
      lahde: 'Kuva: Userfriendly (englanninkielinen Wikivoyage), Wikimedia Commons (public domain).',
      tekija: 'Userfriendly (englanninkielinen Wikivoyage)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samobor_main.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-samobor-7b37805e.jpg',
        lyhyt: 'Samoborin Vanhalinnan rauniot ja pyöreä torni alhaalta kuvattuna.',
        selite: 'Vanhalinna (Stari grad) on rauniolinna Tepecin kukkulan laella Samoborin yläpuolella. Kuvassa näkyy paksu kivimuuri ikkuna-aukkoineen ja pyöreä kulmatorni.',
        lahde: 'Valokuva: Miroslav.vajdic, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Miroslav.vajdic',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Samobor_-_Stari_grad_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Samobor',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna Franz Liszt vieraili Samborissa?',
      'Milloin Samobor sai vapaan kuninkaallisen kaupungin aseman?',
    ],
    korostukset: ['Liszt|Liszt'],
    nappi: 'Vapaa kuninkaallinen kaupunki, jossa Liszt vieraili 1846 ja jossa Livadić asuu',
    // 15.71666667 E / 45.8 N — en-Wikipedia "Samobor"
    laudat: {
      maailmankartta: { x: 6357.2, y: 1568.7 },
      europe: { x: 513, y: 689.1 },
    },
    teksti: 'Samobor on kaupunki Zagrebin läänissä Zagrebin länsipuolella, Samoborin vuorten '
      + 'itärinteiden ja Žumberakin vuorten välissä Savan laaksossa. Se on ollut vapaa '
      + 'kuninkaallinen kaupunki vuodesta 1242 Béla IV:n lahjakirjan mukaan, ja Karlowitzin '
      + 'rauhan 1699 jälkeen se kuului Habsburgien monarkiaan. Samobor on yksi alueen '
      + 'varhaisimmista matkailukohteista: ensimmäiset matkailupalvelut ovat vuodelta 1810, '
      + 'ja ne palvelivat kalastajia, metsästäjiä ja retkeilijöitä. Vuonna 1846 säveltäjä '
      + 'Franz Liszt vieraili kaupungissa ystävänsä Ferdo Livadićin luona; Livadić kuului '
      + 'illyrialaiseen liikkeeseen ja kirjoitti 1800-luvun tunnetuimman isänmaallisen laulun '
      + 'Još Hrvatska ni propala. Tepec-kukkulalla ovat 1200-luvun Samoborin linnoituksen '
      + 'jäännökset, ja kaupungin merkittäviä teollisuudenaloja on kristallinhionta.',
    lahde: 'en-Wikipedia "Samobor", johdanto-osa ja osiot "History", "Economy" ja "Monuments and '
      + 'sightseeings" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kumrovec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kumrovec-40eb5636.jpg',
      lyhyt: 'Kumrovecin vanhan kylän (Staro selo) kivetty tie ja perinteisiä valkoisia taloja.',
      selite: 'Kuva esittää Kumrovecin Staro selo -ulkoilmamuseon katua, jonka varrella on vanhoja talonpoikaistaloja. Etäällä näkyy vain muutama kävijä.',
      lahde: 'Valokuva: Janezdrilc, Wikimedia Commons (CC0).',
      tekija: 'Janezdrilc',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kumrovec_-_Staro_selo_02.JPG',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kumrovec-687e1b93.jpg',
        lyhyt: 'Puusilta ja perinnetaloja Kumrovecin vanhassa kylässä.',
        selite: 'Vanhan kylän ulkoilmamuseossa pieni puusilta ylittää ojan. Ympärillä on valkoisia, olkikattoisia ja puurakenteisia taloja sekä metsäisiä kukkuloita.',
        lahde: 'Valokuva: Janezdrilc, Wikimedia Commons (CC0).',
        tekija: 'Janezdrilc',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kumrovec_-_Staro_selo_25.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-kumrovec-3f46216f.jpg',
        lyhyt: 'Vanhan talonpoikaistalon tupa Kumrovecin etnografisessa museossa.',
        selite: 'Kuva näyttää Staro selon museotalon tuvan: penkin, pöydän, saviastioita ja seinällä koristeellisen seinävaatteen. Tupa on valaistu vain ikkunoista tulevalla valolla.',
        lahde: 'Valokuva: Janezdrilc, Wikimedia Commons (CC0).',
        tekija: 'Janezdrilc',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kumrovec_-_Staro_selo_01.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Kumrovec',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä joen varrella Kumrovec sijaitsee?',
      'Minä vuonna Staro Selon talojen kunnostus alkoi?',
    ],
    korostukset: ['etnologinen museo|etnologinen museo'],
    nappi: 'Sutla-joen rajakylä Zagorjessa, jossa talonpoikaistalot seisovat yhä',
    // 15.67777778 E / 46.08555556 N — en-Wikipedia "Kumrovec"
    laudat: {
      maailmankartta: { x: 6355.9, y: 1556.8 },
      europe: { x: 512.2, y: 681.5 },
    },
    teksti: 'Kumrovec on kylä Pohjois-Kroatiassa Krapina-Zagorjen läänissä Sutla-joen varrella '
      + 'Kroatian ja Slovenian rajalla; kylässä on vain 245 asukasta ja kunnassa 1 412 '
      + '(2021). Kylän vanha osa, Staro Selo, on etnologinen museo, jossa on hyvin säilyneitä '
      + 'Zagorjen talonpoikaistaloja 1800- ja 1900-lukujen vaihteesta; kunnostus aloitettiin '
      + 'vuonna 1977, ja yli neljäkymmentä taloa ja tilarakennusta on kunnostettu. '
      + 'Näyttelyissä esitellään esimerkiksi Zagorjen tyylinen häät, hampusta pellavaksi, '
      + 'sepän, rattaantekijän ja savenvalajan työt sekä viljasta leipään. Kylässä on '
      + 'muistomerkki kansallislaululle Lijepa naša domovino, joka pystytettiin 24. '
      + 'marraskuuta 1935 laulun satavuotisjuhlan kunniaksi.',
    lahde: 'en-Wikipedia "Kumrovec", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sinj',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-sinj-fc3ee091.jpg',
      lyhyt: 'Sinjin linnoituksen kivimuuri ja näkymä kaupungin yli sumuiselle tasangolle.',
      selite: 'Näkymä Sinjin vanhan linnoituksen (Stari grad) muurilta alas kaupungin punakattoisiin taloihin. Kaukana horisontissa näkyy vuoristo ja tasangolla leijuva sumu.',
      lahde: 'Valokuva: Argo Navis, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Argo Navis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stari_grad_Sinj_20231228_05.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-sinj-1b19c12f.jpg',
        lyhyt: 'Sinjin kenttä (Sinjsko polje) sumun peittämänä vuorten edessä.',
        selite: 'Kuva näyttää Cetinan jokilaakson laajan Sinjsko polje -tasangon aamusumussa. Etualalla on hajallaan taloja ja taustalla vuoristo.',
        lahde: 'Valokuva: Marko Jukić -Majkl, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Marko Jukić -Majkl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sinjsko_polje.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-sinj-7190cf25.jpg',
        lyhyt: 'Sinjin vanhan linnoituksen kivimuurien jäänteitä ja puusilta.',
        selite: 'Vuorenrinteellä kohoavan Sinjin linnoituksen muurit ovat osittain rauniona. Kivetty polku ja puinen portaikko johtavat muurien lomassa ylös.',
        lahde: 'Valokuva: Argo Navis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Argo Navis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stari_grad_Sinj_20231228_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Sinj',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna turkkilaisten piiritys Sinjissä epäonnistui?',
      'Millä nimellä Sinjin ympäristön seutua kutsutaan?',
    ],
    korostukset: ['alka|Sinjska alka'],
    nappi: 'Cetinan kentän kaupunki Itävallan Dalmatiassa, jossa alka-turnaus on perinne',
    // 16.63805556 E / 43.7025 N — en-Wikipedia "Sinj"
    laudat: {
      maailmankartta: { x: 6387.9, y: 1654.9 },
      europe: { x: 530.7, y: 744.2 },
    },
    teksti: 'Sinj on Split-Dalmatian läänin sisämaan kaupunki, jonka asukasluku oli 23 500 vuonna '
      + '2021. Se tunnetaan Sinjska alka -ritariturnauksesta, jota on järjestetty 1700-luvun '
      + 'alusta lähtien voiton merkiksi ottomaaneista, sekä Sinjin Neitsyt Marian pyhäköstä. '
      + 'Kaupunki on Cetinska krajinan keskus Sinjsko poljen hedelmällisen karstikentän '
      + 'ympärillä Svilajan, Dinaran, Kamešnican ja Visokan vuorten välissä. Elokuussa 1715 '
      + 'turkkilaiset yrittivät ottaa Sinjin takaisin ja piirittivät sitä, mutta piiritys '
      + 'epäonnistui, ja turkkilaiset pakenivat Livnoon 15. elokuuta yöllä. Wienin kongressin '
      + '1815 jälkeen vuoteen 1918 kaupunki kuului Itävallan monarkiaan ja oli samannimisen '
      + 'piirin keskus Dalmatian kuningaskunnassa.',
    lahde: 'en-Wikipedia "Sinj", johdanto-osa ja osiot "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna turkkilaisten piiritys Sinjissä epäonnistui?',
      vaihtoehdot: [
        '1686',
        '1687',
        '1715',
        '1699',
      ],
      oikea: 2,
      fakta: 'Turkkilaiset pakenivat Livnoon 15. elokuuta yöllä.',
    },
  },
  {
    id: 'hahmotelma-durdevac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-durdevac-1963e061.jpg',
      lyhyt: 'Đurđevacin vanhan linnan valkoinen porttitorni ja punakattoinen päärakennus.',
      selite: 'Kuvassa on Đurđevacin vanha linna (Stari grad), jonka vaalea porttitorni kohoaa sinistä pilvitaivasta vasten. Tornin alla on kivikehyksinen holvikäytävä.',
      lahde: 'Valokuva: Zebra202, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zebra202',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_Djurdevec.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-durdevac-e3a2fb3d.jpg',
        lyhyt: 'Đurđevacin linnan paksut tukipilarit ja jyrkkä tiilikatto ruohokentän laidalla.',
        selite: 'Linnan sivu näyttää voimakkaat vinot tukipilarit, jotka vahvistavat muureja. Rakennus seisoo avoimella nurmella pilvisen taivaan alla.',
        lahde: 'Valokuva: Tournasol7, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tournasol7',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_Durdevac_(16).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/hrv-nosto-durdevac-1d7ee921.jpg',
        lyhyt: 'Đurđevacin linna kaukaa nurmikentän takaa nähtynä.',
        selite: 'Linna näkyy matalana ja leveänä kokonaisuutena vihreän niityn reunalla, ja valkoinen kulmatorni erottuu pilvisen taivaan alla.',
        lahde: 'Kuva: Modzzak, Wikimedia Commons (public domain).',
        tekija: 'Modzzak',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Djurdjevac_Castle,_Croatia.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Đurđevac',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Millä nimellä asukkaat kutsuvat itseään?',
      'Minä vuonna Đurđevac sai EU:n EDEN-tunnustuksen?',
    ],
    korostukset: ['Picokijada|Picokijada'],
    nappi: 'Sotilasrajan Sankt Georgen: Đurđevacin kaupunki Drava-Podravinan tasangolla',
    // 17.06722222 E / 46.02722222 N — en-Wikipedia "Đurđevac"
    laudat: {
      maailmankartta: { x: 6402.2, y: 1559.2 },
      europe: { x: 538.9, y: 683.1 },
    },
    teksti: 'Đurđevac on kaupunki Koprivnica-Križevcin läänissä Pohjois-Kroatiassa. Vuoteen 1918 '
      + 'se kuului Itävallan monarkiaan (Kroatia-Slavonian kuningaskuntaan vuoden 1867 '
      + 'sovinnon jälkeen) ja Kroatian sotilasrajalla Varaždin–Sankt Georgen -rykmentti nro '
      + 'VI:n alueeseen; ennen vuotta 1850 kaupungin nimi oli Militär Sanct Georgen. '
      + 'Kaupungin nähtävyyksiin kuuluvat vanha linna, Pyhän Yrjön kirkko, Đurđevacin hiekat '
      + '-puistometsä ja Picokijada, joka perustuu kukkojen legendaan. Asukkaat kutsuvat '
      + 'itseään leikillisesti picokeiksi, ja kaupunki sai vuonna 2008 EU:n EDEN-tunnustuksen '
      + 'epätavallisena matkailukohteena.',
    lahde: 'en-Wikipedia "Đurđevac", koko artikkeli (tarkistettu 19.9.2026).',
  },
];
