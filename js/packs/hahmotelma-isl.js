/*
 * ISLANNIN HAHMOTELMANOSTOT — täydentää js/packs/maastokohteet-isl.js:n
 * 17 nostoa 13 uudella, samaan tyyliin kuin EU-maiden hahmotelmapaketit
 * (malli: js/packs/hahmotelma-svn.js). Islanti ei ole EU-maa, mutta
 * sisältö on tehty tehtävänannon mukaisesti täsmälleen samalla
 * reseptillä: jokaisella nostolla on valmis sisältö — `teksti` 3-5
 * virkettä en-Wikipedian artikkelista omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä,
 * lisenssi ja lähdesivu kirjattuna). Noin joka kolmannella nostolla on
 * lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea indeksi,
 * fakta) täsmälleen kuten kaupunkien täkynostoilla.
 *
 * MIKSI JUURI NÄMÄ AIHEET. Vanhassa 17 noston listassa oli korkein
 * huippu, kaksi merta, kaksi jokea, Þingvellir, saagakylä, geysir,
 * siirtokunnan aloituspaikka, kaksi piispankaupunkia, Vestmannaeyjar,
 * Länsivuonot, tulivuoren halkeama, jäätikkö, järvi ja napapiirisaari.
 * Kokonaan puuttuivat pääkaupunki, Pohjois-Islanti, geoterminen
 * energia tekniikkana ja ruokaperinne — nyt mukana Reykjavík,
 * Akureyri, Ísafjörður, Sinilónin ja Nesjavellirin sijaan Seyðisfjörður
 * (geoterminen tarina olisi ajautunut Þingvellirin ja Reykholtin
 * kylkeen liian tiheälle Kultaisella kierrokselle; sähkekaapelin
 * saapuminen 1906 on yhtä lailla tekniikkaa ja sopii kauas Itä-
 * Islantiin), hákarl ja skyr ruokana, Reynisfjara, Skógafoss,
 * Landmannalaugar, Flateyjarbók saagakirjallisuutena ja Goðafoss.
 * Kirkjufell täydentää Snæfellsnesin maisemaa toiselta kulmalta kuin
 * Snæfellsjökull.
 *
 * === KUVAT ============================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos pienempi),
 * nimeltään `isl-nosto-<id>-<8 hex sha256>.jpg`, osoite kirjattu
 * pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon; siihen asti
 * osoitteet vastaavat 404:llä. Tiedostot ja niiden JSON-metadata ovat
 * kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/isl/.
 *
 * === KOORDINAATIT ======================================================
 *
 * Asteet on haettu en-Wikipedian rajapinnasta (action=query&prop=
 * coordinates, haettu 21.9.2026) ja artikkelin nimi on kirjattu rivin
 * viereen. Kolmelle nostolle (hákarl, skyr, Flateyjarbók) itse
 * aihe-artikkelilla ei ole koordinaattia, koska kyse ei ole paikasta;
 * niille on käytetty tekstissä mainitun tai aiheeseen kiinteästi
 * liittyvän lähipaikan koordinaattia, ja se on kirjattu rehellisesti
 * kommenttiin. Laudan luvut on laskettu tools/johda-maastokohteet.mjs
 * `laudat`-funktiolla. Islanti on Euroopan laudan kaavan (lon -11...41)
 * ULKOPUOLELLA, joten jokainen rivi saa vain maailmankartan koordinaatin
 * — sama sääntö kuin maastokohteet-isl.js:ssä.
 *
 * === 1873 ==============================================================
 *
 * Vuonna 1873 Islanti on osa Tanskan kuningaskuntaa; kotihallinto
 * (Home Rule) ja oma perustuslaki tulevat vasta seuraavana vuonna,
 * 1874. `nappi`-rivit katsovat vuodesta 1873 eteenpäin ja sanovat
 * rehellisesti, kun kohde tai tapahtuma on tulevaisuudessa.
 */

/** Islannin hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_ISL = [
  {
    id: 'hahmotelma-reykjavik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-reykjavik-fdf2d559.jpg',
      lyhyt: 'Reykjavík auringonlaskussa, Hallgrímskirkjan torni siluettina.',
      selite: 'Perlanin näkötornista kuvatussa panoraamassa Hallgrímskirkjan torni kohoaa '
        + 'kaupungin ylle auringonlaskun värjäämää taivasta vasten. Alempana leviävät '
        + 'Reykjavíkin katot ja vuonon rannat.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vista_de_Reikiavik_desde_Perlan,_Distrito_de_la_Capital,_Islandia,_2014-08-13,_DD_118-120_HDR.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-reykjavik-24b47ce1.jpg',
        lyhyt: 'Alþingishúsið, Islannin parlamenttitalo, vuosiluku 1881 kaiverrettuna julkisivuun.',
        selite: 'Harmaasta kivestä muurattu kaksikerroksinen rakennus seisoo nurmikentän '
          + 'reunalla. Julkisivun yläosaan on hakattu rakennusvuosi 1881 tähtien väliin.',
        lahde: 'Valokuva: APK, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'APK',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alþingishúsið.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Reykjavík',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mistä sanoista Reykjavíkin nimi juontuu?',
      'Miten Ingólfur Arnarson löysi asuinpaikkansa tarinan mukaan?',
    ],
    korostukset: ['Landnámabók|Landnámabókin', 'kauppala|kauppala'],
    nappi: 'Kaupunki on jo saaren hallinnollinen keskus, mutta oma parlamenttitalo valmistuu '
      + 'vasta kahdeksan vuoden päästä, 1881',
    // -21.9425 E / 64.1458 N — en-Wikipedia "Reykjavík"
    laudat: {
      maailmankartta: { x: 5101.9, y: 712.1 },
    },
    teksti: 'Reykjavík on Islannin pääkaupunki ja suurin kaupunki, Faxaflóin lahden rannalla '
      + 'saaren lounaisosassa. Landnámabókin mukaan Ingólfur Arnarson perusti täällä '
      + 'ensimmäisen pysyvän asutuksen noin vuonna 874, kun hänen orjansa löysivät merestä '
      + 'heitetyt istuinpylväät rannalta lähes kolmen vuoden etsinnän jälkeen. Yhdeksänsataa '
      + 'vuotta paikka pysyi pelkkänä maatilana, kunnes siitä tuli virallisesti kauppala '
      + 'vuonna 1786. Nimi juontuu sanoista reykur, savu, ja vík, lahti — alue sai nimensä '
      + 'kuumien lähteiden noususta, joka näytti savulta ensimmäisille asukkaille.',
    lahde: 'en-Wikipedia "Reykjavík", johdanto-osa ja osiot "History", "Etymology" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Reykjavíkistä tuli virallisesti kauppala?',
      vaihtoehdot: [
        '874',
        '1786',
        '1881',
        '1918',
      ],
      oikea: 1,
      fakta: 'Reykjavík on maailman pohjoisin itsenäisen valtion pääkaupunki, noin 64 astetta '
        + '8 minuuttia pohjoista leveyttä — eteläisempänä sijaitsevat esimerkiksi Helsinki ja '
        + 'Oslo.',
    },
  },
  {
    id: 'hahmotelma-akureyri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-akureyri-633bd17d.jpg',
      lyhyt: 'Akureyrin kauppapaikka 1800-luvun lopulla, Tanskan lippu liehumassa.',
      selite: 'Vanhassa valokuvassa puutalot reunustavat rantaa, ja niiden edustalla lepää '
        + 'soutuveneitä. Tanskan lippu liehuu useassa salossa kauppahuoneiden edessä.',
      lahde: 'Valokuva: Sigfús Eymundsson, Wikimedia Commons (Public domain).',
      tekija: 'Sigfús Eymundsson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Akureyri_19th_century.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-akureyri-493242cc.jpg',
        lyhyt: 'Akureyri Eyjafjörðurin rannalla, lumihuippuiset vuoret taustalla.',
        selite: 'Tyyni vuono heijastaa kaupungin taloja ja ympäröiviä vuoria. Rannassa on '
          + 'satama-alue ja risteilyalus laiturissa.',
        lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gerd Eichmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Akureyri-08-Panorama-2018-gje.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Akureyri',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Miksi Akureyri menetti kauppalaoikeutensa vuonna 1836?',
      'Mikä on tehnyt Akureyrin satamasta erityisen?',
    ],
    korostukset: ['kauppalaoikeus|kauppalaoikeudet', 'Eyjafjörður|Eyjafjörðurin'],
    nappi: 'Kaupunki on saanut kauppalaoikeutensa takaisin 11 vuotta sitten, mutta asukkaita '
      + 'on vasta muutama sata',
    // -18.1 E / 65.6833 N — en-Wikipedia "Akureyri"
    laudat: {
      maailmankartta: { x: 5230, y: 629 },
    },
    teksti: 'Akureyri on Pohjois-Islannin suurin kaupunki ja koko maan viidenneksi '
      + 'väkirikkain kunta, Eyjafjörðurin vuonon perukassa. Sitä kutsutaan usein "Pohjoisen '
      + 'pääkaupungiksi", ja se on tärkeä satama- ja kalastuskeskus. Alueella asuttiin jo '
      + '800-luvulla, mutta kauppalaoikeudet Akureyri sai muiden Islannin kauppapaikkojen '
      + 'tapaan vasta 1786; ne menetettiin 1836, koska väkiluku ei nousi kahtatoista henkeä '
      + 'suuremmaksi, ja saatiin takaisin 1862. Suotuisa ilmasto ja jäätön satama ovat '
      + 'sittemmin tehneet kaupungista pohjoisen tärkeimmän keskuksen.',
    lahde: 'en-Wikipedia "Akureyri", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-isafjordur',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-isafjordur-99ea2b5d.jpg',
      lyhyt: 'Ísafjörðurin pääkatu Hafnarstræti jyrkän vuoren juurella.',
      selite: 'Kapea katu kulkee kauppatalojen välissä, ja taustalla nousee suoraan jyrkkä, '
        + 'uurteinen vuorenrinne. Kadun varrella on kahviloita ja liikkeitä.',
      lahde: 'Valokuva: Linguaddict, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Linguaddict',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ísafjörður_Hafnarstræti.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-isafjordur-26332180.jpg',
        lyhyt: 'Putous laskee vehreää rinnettä Ísafjarðarbærin maaseudulla.',
        selite: 'Kapea vesiputous virtaa pitkin vuoren rinnettä kohti laaksoa, jossa on '
          + 'peltoja ja pieniä rakennuksia. Ylärinteet häviävät sumuun.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ísafjörður,_Vestfirðir,_Islandia,_2014-08-15,_DD_046.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ísafjörður',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mikä on Neðstikaupstaður?',
      'Minne noitavainoissa tuomittuja karkotettiin Länsivuonoilla?',
    ],
    korostukset: ['Neðstikaupstaður|Neðstikaupstaðurin', 'Hornstrandir|Hornstrandirin'],
    nappi: 'Kaupungissa kokeillaan maan ensimmäisiä yksityisiä puhelinlinjoja vasta parin '
      + 'vuosikymmenen päästä, 1890-luvulla',
    // -23.1267 E / 66.0758 N — en-Wikipedia "Ísafjörður"
    laudat: {
      maailmankartta: { x: 5062.4, y: 607.4 },
    },
    teksti: 'Ísafjörður on Länsivuonojen suurin asutus ja koko alueen hallintokeskus, '
      + 'kapealla hiekkakannaksella Skutulsfjörður-vuonon rannalla. Landnámabókin mukaan '
      + 'Helgi Magri Hrólfsson asettui Skutulsfjörðuriin jo 800-luvulla. Kaupungista tuli '
      + 'ulkomaisten kauppiaiden tärkeä kauppapaikka 1500-luvulla, ja kaupunkioikeudet se '
      + 'sai 1786. Tanskalaisen kauppa-aseman Neðstikaupstaðurin alueella seisoo yhä maan '
      + 'vanhin hirsitalojen ryhmä, muun muassa vuonna 1765 rakennettu Faktorshús. 1500- ja '
      + '1600-luvuilla Länsivuonoilla käytiin myös noitavainoja, ja tuomittuja karkotettiin '
      + 'lähellä sijaitsevalle Hornstrandirin niemimaalle.',
    lahde: 'en-Wikipedia "Ísafjörður", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Minä vuosikymmenellä Ísafjörður sai maan ensimmäiset yksityiset '
        + 'puhelinlinjat?',
      vaihtoehdot: [
        '1850-luvulla',
        '1870-luvulla',
        '1890-luvulla',
        '1920-luvulla',
      ],
      oikea: 2,
      fakta: 'Samoihin aikoihin rakennettiin myös linja Reykjavíkin ja Hafnarfjörðurin '
        + 'välille; koko maan kattava puhelinverkko avattiin vasta vuonna 1904.',
    },
  },
  {
    id: 'hahmotelma-blaa-lonid',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-blaa-lonid-530c426a.jpg',
      lyhyt: 'Sinilónin maitoisen sininen vesi laavakentän keskellä, Þorbjörn-vuori takana.',
      selite: 'Allas kimaltaa vaaleansinisenä mustan laavakiven ympäröimänä. Kauempana '
        + 'kohoaa Þorbjörn-vuori, jonka rinteillä on vielä lumilaikkuja.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blue_Lagoon_with_Þorbjörn,_Iceland,_20230430_1626_3692.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-blaa-lonid-97687142.jpg',
        lyhyt: 'Höyryä nousee Svartsengin voimalaitokselta Sinilónin rannalla.',
        selite: 'Valkoinen höyrypilvi kohoaa taustalla näkyvästä voimalaitoksesta, ja sen '
          + 'edessä leviää altaan sininen vesi mustien laavakivien keskellä.',
        lahde: 'Valokuva: sikeri, Wikimedia Commons (CC BY 2.0).',
        tekija: 'sikeri from Silver Spring, MD, USA',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blue_Lagoon_Geothermal_Spa,_Grindavík,_Iceland_(37917013312).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Sinilóni',
    tyyppi: 'tekniikka',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Mistä Sinilónin veden sininen väri johtuu?',
      'Mistä altaan vesi on peräisin?',
    ],
    korostukset: ['piidioksidi|piidioksidipitoisuuden', 'Svartsengi|Svartsengin'],
    nappi: 'Tätä lampea ei ole vielä olemassa — se syntyy vasta yli sata vuotta myöhemmin '
      + 'voimalaitoksen sivutuotteena',
    // -22.4481 E / 63.88 N — en-Wikipedia "Blue Lagoon (geothermal spa)"
    laudat: {
      maailmankartta: { x: 5085.1, y: 726.3 },
    },
    teksti: 'Sinilónin vesi on väriltään maitoisen sininen korkean piidioksidipitoisuuden '
      + 'ansiosta, ja piihiukkaset laskeutuvat altaan pohjalle valkoiseksi mudaksi, jota '
      + 'kylpijät hieroivat iholleen. Lampi on ihmisen tekemä: se syntyy Svartsengin '
      + 'geotermisen voimalaitoksen sivutuotteena, kun turbiineja pyörittänyt kuuma vesi '
      + 'johdetaan lämmönvaihtimien kautta kaukolämpöverkkoon ja lopulta laavakentän '
      + 'painanteeseen. Vesi nousee maan alta yli 200-asteisena ja noin 12 baarin '
      + 'paineessa, eikä sitä voida kierrättää korkean mineraalipitoisuutensa vuoksi. '
      + 'Kylpylä sijaitsee Reykjanesin niemimaalla, noin viiden kilometrin päässä '
      + 'Grindavíkista, ja on nykyään yksi Islannin suosituimmista matkailukohteista.',
    lahde: 'en-Wikipedia "Blue Lagoon (geothermal spa)", johdanto-osa ja osio "Water source" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minkä voimalaitoksen sivutuotteena Sinilónin vesi syntyy?',
      vaihtoehdot: [
        'Hellisheiðin',
        'Nesjavellirin',
        'Svartsengin',
        'Kröflan',
      ],
      oikea: 2,
      fakta: 'Vesi nousee maan alta yli 200-asteisena, eikä sitä korkean '
        + 'mineraalipitoisuuden vuoksi voida kierrättää — se valuu lopulta huokoiseen '
        + 'laavakenttään.',
    },
  },
  {
    id: 'hahmotelma-seydisfjordur',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-seydisfjordur-b1cf2161.jpg',
      lyhyt: 'Seyðisfjörður laakson pohjalla vuonon rannalla, jyrkät vuoret ympärillä.',
      selite: 'Pieni kaupunki levittäytyy vuonon rantaan syvän laakson pohjalla. Jyrkät, '
        + 'kerroksiset vuorenseinämät nousevat molemmin puolin taivasta vasten.',
      lahde: 'Valokuva: Spike, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Spike',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Seyðisfjörður_Panorama_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-seydisfjordur-e7d8aac9.jpg',
        lyhyt: 'Seyðisfjörður ja sen ympärillä kohoavat vuoret, joilta valuu lukuisia '
          + 'putouksia.',
        selite: 'Kymmeniä ohuita vesiputouksia laskee pitkin vuoren uurteita kohti vuonon '
          + 'rantaa, jossa kaupungin rakennukset kimaltavat.',
        lahde: 'Valokuva: Reykholt, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Reykholt',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Seydisfjördur.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Seyðisfjörður',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minä vuonna Islannin ensimmäinen sähkekaapeli tuli maihin Seyðisfjörðurissa?',
      'Mikä yhteisö kaupungissa toimii nykyään?',
    ],
    korostukset: ['sähkekaapeli|sähkekaapeli', 'LungA|LungA-festivaalistaan'],
    nappi: 'Sähke ei ole vielä tavoittanut Islantia — ensimmäinen kaapeli tulee maihin '
      + 'tässä lahdessa vasta 33 vuoden päästä',
    // -14.0089 E / 65.2631 N — en-Wikipedia "Seyðisfjörður"
    laudat: {
      maailmankartta: { x: 5366.4, y: 651.9 },
    },
    teksti: 'Seyðisfjörður on Itä-Islannin kaupunki samannimisen vuonon perukassa, '
      + 'tunnettu nykyään taiteilijayhteisöstään ja LungA-festivaalistaan. Ensimmäinen '
      + 'asukas oli saagojen mukaan Bjólfur, joka otti haltuunsa koko vuonon jo asutuksen '
      + 'alkuaikoina, mutta nykyinen kaupunki syntyi vasta 1848, kun norjalaiset kalastajat '
      + 'asettuivat paikalle ja rakensivat osan kaupungin vielä säilyneistä puutaloista. '
      + 'Vuonna 1906 Seyðisfjörðuriin nousi maihin ensimmäinen Islannin ja Euroopan '
      + 'yhdistävä merenalainen sähkekaapeli, jonka Store Nordiske Telegrafselskab laski '
      + 'Skotlannista Färsaarten kautta — siitä lähtien kaupunki oli vuosikymmeniä maan '
      + 'tärkein yhteyspiste ulkomaailmaan.',
    lahde: 'en-Wikipedia "Seyðisfjörður", johdanto-osa ja osio "History"; en-Wikipedia '
      + '"Síminn", osio "Telegraphy" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-hakarl',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-hakarl-729e76e7.jpg',
      lyhyt: 'Hákarlia kuivumassa valkoiseksi maalatun aitan alla.',
      selite: 'Suikaleiksi leikattua hain lihaa riippuu köysissä katoksen alla. Osa '
        + 'paloista on tummunut kuivumisen myötä, osa on vielä vaaleampaa.',
      lahde: 'Valokuva: Austin Matherne, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Austin Matherne',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hákarl_(fermented_shark).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-hakarl-6e1f89db.jpg',
        lyhyt: 'Lähikuva kuivuvasta hákarlista vihreissä narusilmukoissa.',
        selite: 'Karheapintainen hain liha roikkuu vihreästä narusta katosta. Taustalla '
          + 'näkyy lisää samalla tavalla ripustettuja paloja.',
        lahde: 'Valokuva: Funky Tee, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Funky Tee from Alexandria, USA',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hákarl_hung_to_dry.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Hákarl',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi tuoretta hain lihaa ei voi syödä suoraan?',
      'Missä perinteistä valmistustapaa voi käydä katsomassa?',
    ],
    korostukset: [
      'trimetyyliamiinioksidi|trimetyyliamiinioksidipitoisuutensa',
      'þorrablót|þorrablót-juhlassa',
    ],
    nappi: 'Isoisäsi saattaisi jo maistaa tätä matkallaan — perinne on vuosisatoja vanha '
      + 'eikä ole muuttunut tähän päivään mennessä juuri lainkaan',
    // -22.725 E / 65.075 N — Stykkishólmur, lähin sijainti Bjarnarhöfnin hain museolle
    // (ei omaa artikkelia); en-Wikipedia "Hákarl"
    laudat: {
      maailmankartta: { x: 5075.8, y: 662.2 },
    },
    teksti: 'Hákarl on kuivatusta ja käymisestä valmistettu kansallisruoka, joka tehdään '
      + 'yleensä Grönlanninhain tai muun unihaikalan lihasta. Tuore hain liha on '
      + 'myrkyllistä korkean urea- ja trimetyyliamiinioksidipitoisuutensa vuoksi, joten se '
      + 'on ensin haudattava sorapohjaiseen kuoppaan kivien alle puristumaan kuudesta '
      + 'kahteentoista viikkoa, minkä jälkeen suikaleet ripustetaan kuivumaan vielä useaksi '
      + 'kuukaudeksi. Lopputulos haisee voimakkaasti ammoniakilta, ja monet ensikertalaiset '
      + 'joutuvat nielemään palan nenä nyrpeällä. Perinteistä valmistustapaa pääsee '
      + 'seuraamaan yhä Bjarnarhöfnin hain museossa Snæfellsnesillä, ja hákarlia '
      + 'tarjoillaan tavallisesti pieninä kuutioina osana þorramatur-ateriaa keskitalven '
      + 'þorrablót-juhlassa.',
    lahde: 'en-Wikipedia "Hákarl", johdanto-osa ja osiot "Consumption", "Preparation" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka kauan hain liha perinteisesti ripustetaan kuivumaan käsittelyn '
        + 'jälkeen?',
      vaihtoehdot: [
        'muutama päivä',
        'pari viikkoa',
        'neljästä viiteen kuukautta',
        'kaksi vuotta',
      ],
      oikea: 2,
      fakta: 'Ennen kuivumista liha painetaan sorakuopassa kivien alla kuudesta '
        + 'kahteentoista viikkoa, jotta myrkylliset nesteet puristuvat pois.',
    },
  },
  {
    id: 'hahmotelma-skyr',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-skyr-6af4138f.jpg',
      lyhyt: 'Hvanneyrin kylä ja maatalousyliopisto vuonon rannalla ilmakuvassa.',
      selite: 'Punakattoiset koulu- ja maatilarakennukset ryhmittyvät vihreiden peltojen '
        + 'keskelle. Taustalla siintävät vuoret ja meri.',
      lahde: 'Valokuva: LandbunadarhaskoliIslands, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'LandbunadarhaskoliIslands',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hvanneyri_DJI_0418.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-skyr-40c73a17.jpg',
        lyhyt: 'Hvanneyrin koulutila ja kirkko vuonna 1906.',
        selite: 'Vanhassa valokuvassa matalat puu- ja turverakennukset sekä korkeampi '
          + 'kirkko seisovat avaralla niityllä, vuoret sumuisina taustalla.',
        lahde: 'Kuva: tuntematon, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon valokuvaaja',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hvanneyri_1906.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Skyr',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mistä eläimestä skyriä valmistettiin alun perin?',
      'Mihin englannin sanaan skyr on sukua?',
    ],
    korostukset: ['Egilin saaga|Egilin saagassa', 'hapanmaitojuusto|hapanmaitojuustoksi'],
    nappi: 'Hvanneyrin maatalouskoulu, jossa nykyisin opetetaan maidonjalostusta, '
      + 'perustetaan vasta 16 vuoden päästä, 1889',
    // -21.762 E / 64.562 N — Hvanneyri, maan vanhin maatalousoppilaitos (ei skyrin
    // syntypaikka); en-Wikipedia "Skyr"
    laudat: {
      maailmankartta: { x: 5107.9, y: 689.8 },
    },
    teksti: 'Skyr on islantilainen perinteinen hapatettu maitotuote, koostumukseltaan '
      + 'siivilöidyn jogurtin kaltainen mutta makuaan mietoumpi; se luokitellaan tuoreeksi '
      + 'hapanmaitojuustoksi. Se mainitaan jo keskiaikaisissa saagoissa, muun muassa '
      + 'Egilin saagassa ja Grettis-saagassa, joten valmistustapa on ollut tunnettu '
      + 'Islannissa vuosisatoja — alun perin skyriä tehtiin lampaanmaidosta, nykyään lähes '
      + 'aina lehmänmaidosta. Nimi on sukua englannin sanalle shear, leikata, ja viittaa '
      + 'tapaan, jolla maito erotellaan hera- ja skyr-osaan. Nykyaikaista maidontuotantoa '
      + 'ja karjanjalostusta opetetaan muun muassa Hvanneyrin maatalousyliopistossa '
      + 'Länsi-Islannissa, joka on maan vanhin maatalousoppilaitos.',
    lahde: 'en-Wikipedia "Skyr", johdanto-osa ja osiot "Etymology", "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-reynisfjara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-reynisfjara-f29359f2.jpg',
      lyhyt: 'Reynisfjaran pystysuorat basalttipylväät läheltä kuvattuna.',
      selite: 'Tummat, kuusikulmaiset kivipylväät nousevat tiiviinä rivistönä rannasta, ja '
        + 'osa niistä paljastaa vaaleampaa kiveä murtumakohdista.',
      lahde: 'Valokuva: Olga Ernst, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Olga Ernst',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Columnar_basalts_at_Reynisfjara,_Iceland.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-reynisfjara-8c0a3410.jpg',
        lyhyt: 'Musta hiekkaranta ja Reynisdrangar-kalliot merellä.',
        selite: 'Pitkä musta ranta kaartuu kohti terävää niemeä, jonka edustalla piikikkäät '
          + 'kalliomuodostumat kohoavat merestä.',
        lahde: 'Valokuva: Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Martin Falbisoner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Reynisfjara_and_Reynisdrangar,_Iceland.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Reynisfjara',
    tyyppi: 'meri',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Mistä tarina kertoo Reynisdrangarin synnystä?',
      'Minä vuonna ranta valittiin maailman kymmenen kauneimman joukkoon?',
    ],
    korostukset: ['Reynisdrangar|Reynisdrangar', 'Hálsanefshellir|Hálsanefshellir-luola'],
    nappi: 'Ranta on aina ollut täällä, mutta sana "geopark" ja maailman kauneimpien '
      + 'rantojen listat ovat vielä kaukana tulevaisuudessa',
    // -19.0474 E / 63.4035 N — en-Wikipedia "Reynisfjara"
    laudat: {
      maailmankartta: { x: 5198.4, y: 751.5 },
    },
    teksti: 'Reynisfjara on musta hiekkaranta Etelä-Islannissa, lähellä Víkin kylää ja osa '
      + 'Katlan Unesco-geoparkkia. Rannan itäpäässä on basalttipylväiden reunustama '
      + 'Hálsanefshellir-luola, lännessä Dyrhólaeyn niemi, ja ulkomerellä kohoavat '
      + 'Reynisdrangar — terävät basalttikalliot, jäänteitä kerran laajemmasta '
      + 'Reynisfjall-jyrkänteestä. Vanhan tarun mukaan kalliot syntyivät, kun kaksi '
      + 'peikkoa yritti vetää kolmimastoista laivaa maihin, mutta aamun sarastus muutti '
      + 'ne kiveksi. Yhdysvaltalainen Islands-lehti valitsi rannan vuonna 1991 yhdeksi '
      + 'maailman kymmenestä kauneimmasta ei-trooppisesta rannasta, ja vuonna 2021 se '
      + 'sijoittui kuudenneksi parhaaksi rannaksi koko maailmassa.',
    lahde: 'en-Wikipedia "Reynisfjara", johdanto-osa; en-Wikipedia "Reynisdrangar", osio '
      + '"Legend" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-skogafoss',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-skogafoss-0a65fc58.jpg',
      lyhyt: 'Skógafoss syöksyy leveänä verhona vihreän kallion editse.',
      selite: 'Leveä vesiputous putoaa suoraan alas sammaleisen kalliokielekkeen editse, '
        + 'ja sumupilvi leviää sen juurelle.',
      lahde: 'Valokuva: Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martin Falbisoner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skógafoss_July_2014.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-skogafoss-51228f37.jpg',
        lyhyt: 'Kävijöitä Skógafossin juurella ja portaikossa putouksen laelle.',
        selite: 'Ihmisjoukko seisoo putouksen edustalla niityllä, ja oikealla näkyy pitkä '
          + 'porrasreitti, joka nousee jyrkkää rinnettä putouksen yläreunalle.',
        lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Jakub Hałun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skógafoss_Waterfall,_Iceland,_20240720_1318_2975.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Skógafoss',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miksi vanhat merenrantakalliot ovat nyt kaukana rannasta?',
      'Mitä tarinan mukaan Þrasi Þórólfsson kätki putouksen taakse?',
    ],
    korostukset: ['Þrasi Þórólfsson|Þrasi Þórólfsson', 'kanttarengas|kanttarenkaan'],
    nappi: 'Putouksen huipulle nousevaa 527 portaan rappusta ei ole vielä olemassa — se '
      + 'rakennetaan vasta 1900-luvulla matkailijoita varten',
    // -19.5111 E / 63.5321 N — en-Wikipedia "Skógafoss"
    laudat: {
      maailmankartta: { x: 5183, y: 744.7 },
    },
    teksti: 'Skógafoss on yksi Islannin suurimmista putouksista, kaksikymmentäviisi '
      + 'metriä leveä ja kuusikymmentä metriä korkea, entisen rantaviivan jyrkänteellä '
      + 'Etelä-Islannissa. Kun meri on vuosituhansien kuluessa vetäytynyt nykyiselle '
      + 'paikalleen noin viiden kilometrin päähän, jäljelle jäivät entiset '
      + 'merenrantakalliot, jotka jatkuvat satojen kilometrien matkan rannikon '
      + 'suuntaisesti. Putouksen jatkuva vesisumu synnyttää aurinkoisella säällä lähes '
      + 'aina näkyviin yksinkertaisen tai kaksoiskaaren sateenkaaren. Tarinan mukaan '
      + 'alueen ensimmäinen viikinkiasukas Þrasi Þórólfsson kätki putouksen taakse '
      + 'aarrearkun, jonka paikalliset myöhemmin löysivät, mutta saivat irti vain arkun '
      + 'kanttarenkaan ennen kuin arkku katosi uudelleen; rengas on nykyään esillä '
      + 'Skógarin museossa.',
    lahde: 'en-Wikipedia "Skógafoss", johdanto-osa ja osio "Geography" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-landmannalaugar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-landmannalaugar-d185680c.jpg',
      lyhyt: 'Landmannalaugarin punertavat ja keltaiset riolittivuoret.',
      selite: 'Loivapiirteiset vuoret vaihtelevat ruskean, keltaisen ja vihreän sävyissä, '
        + 'ja niiden välistä laskee lumilaikkuja täyttämä rotko.',
      lahde: 'Valokuva: Chmee2, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Chmee2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rainbow_Mountains_in_Landmannalaugar_region_-_panorama_(4).jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-landmannalaugar-de223664.jpg',
        lyhyt: 'Vaeltajia Laugavegur-reitillä Landmannalaugarin vuorten keskellä.',
        selite: 'Polku kiemurtelee pitkin keltaisten ja harmaiden tuhkavuorten '
          + 'harjannetta, ja pieniä vaeltajahahmoja näkyy matkalla.',
        lahde: 'Valokuva: Borvan53, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Borvan53',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_on_Landmannalaugar_area_from_Laugavegur_2012_panoramic_2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Landmannalaugar',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minä vuonna Laugahraun-laavakenttä syntyi?',
      'Mikä Laugavegur on?',
    ],
    korostukset: ['Laugahraun|Laugahraun-laavakentän', 'Bláhnjúkur|Bláhnjúkur-huippu'],
    nappi: 'Ensimmäinen vaeltajien tukikohta nousee tänne vasta puolen vuosisadan '
      + 'päästä, 1900-luvun alkupuolella',
    // -19.067 E / 63.983 N — en-Wikipedia "Landmannalaugar"
    laudat: {
      maailmankartta: { x: 5197.8, y: 720.8 },
    },
    teksti: 'Landmannalaugar sijaitsee Fjallabakin luonnonsuojelualueella Islannin '
      + 'ylängöillä, Laugahraun-laavakentän reunalla; laavakenttä syntyi noin vuonna 1477 '
      + 'tapahtuneessa purkauksessa. Aluetta hallitsevat monivärikkäät riolittivuoret, ja '
      + 'paikka tunnetaan erityisesti luonnollisista geotermisistä lähteistään, joissa voi '
      + 'uida. Landmannalaugar on Laugavegur-vaellusreitin pohjoinen pääte, ja Islannin '
      + 'retkeilyseura ylläpitää siellä tukikohtaa vaeltajille. Suosittuja kohteita '
      + 'lähialueella ovat tunnin patikkamatkan päässä oleva Bláhnjúkur-huippu ja '
      + 'Ljótipollur-kraatterijärvi, ja alue toimii lähtöpisteenä pidemmille reiteille '
      + 'kohti Heklan tulivuorta tai halki Sprengisandurin erämaan.',
    lahde: 'en-Wikipedia "Landmannalaugar", johdanto-osa ja osio "Hiking" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-flateyjarbok',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-flateyjarbok-a7281983.jpg',
      lyhyt: 'Flateyjarbókin käsinkirjoitettu ja koristeltu pergamenttisivu.',
      selite: 'Kaksipalstainen sivu on täynnä tiivistä keskiaikaista käsialaa. '
        + 'Vasemmassa reunassa on värillinen kuvakoriste, jossa istuu kruunupäinen hahmo.',
      lahde: 'Kuva: Jón Þórðarson ja Magnús Þórhallsson (1300-luku), Wikimedia Commons '
        + '(Public domain).',
      tekija: 'Jón Þórðarson ja Magnús Þórhallsson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:GKS_1005_fol.,_0076r_-_156.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-flateyjarbok-707a0470.jpg',
        lyhyt: 'Kuvitettu käsikirjoitussivu taistelukohtauksineen ja koristeaiheineen.',
        selite: 'Sivun alareunassa soturihahmot taistelevat maalatussa kehyksessä, ja '
          + 'tekstipalstojen välissä on koristeellisia värillisiä alkukirjaimia.',
        lahde: 'Kuva: tuntematon keskiaikainen taiteilija, Wikimedia Commons (Public '
          + 'domain).',
        tekija: 'Tuntematon keskiaikainen taiteilija (1300-1400-luku)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Flateyjarbok_Olaf_Tryggvason.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Flateyjarbók',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitkä saagat säilyivät islanninkielisinä ainoastaan Flateyjarbókissa?',
      'Miten kirja päätyi Tanskaan?',
    ],
    korostukset: ['Grænlendinga saaga|Grænlendinga-saagan', 'Jón Hákonarson|Jón Hákonarson'],
    nappi: 'Kirja on parhaillaan Kööpenhaminassa — se palaa Islantiin vasta 98 vuoden '
      + 'päästä, 1971',
    // -22.9119 E / 65.3761 N — Flatey-saari Breiðafjörðissä, kirjan nimen antanut
    // kotisaari; en-Wikipedia "Flateyjarbók"
    laudat: {
      maailmankartta: { x: 5069.6, y: 645.8 },
    },
    teksti: 'Flateyjarbók on suurin keskiaikainen islantilainen käsikirjoitus, '
      + '225 kirjoitettua ja kuvitettua pergamenttilehteä. Lakimies Jón Hákonarson tilasi '
      + 'teoksen, ja papit Jón Þórðarson ja Magnús Þórhallsson kirjoittivat ja kuvittivat '
      + 'sen vuosina 1387-1394. Kirja sisältää pääosin Norjan kuninkaiden saagoja, mutta '
      + 'myös ainoat säilyneet islanninkieliset versiot Orkneyinga-saagasta ja '
      + 'Färsaarelaisten saagasta sekä tärkeän Grænlendinga-saagan Vinlannin '
      + 'siirtokunnasta. Vuonna 1651 piispa Brynjólfur Sveinsson pyysi Tanskan kuninkaan '
      + 'luvalla kaikkia islantilaisia luovuttamaan vanhat käsikirjoituksensa, ja '
      + 'Flateyjarbók päätyi Flatey-saarelta Kööpenhaminaan, jossa se säilyi tanskalaisessa '
      + 'kirjastossa yli kolmesataa vuotta.',
    lahde: 'en-Wikipedia "Flateyjarbók", johdanto-osa, osiot "Description" ja "History" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-godafoss',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-godafoss-bcf9006e.jpg',
      lyhyt: 'Goðafoss levittäytyy hevosenkengän muotoisena putouksena.',
      selite: 'Vesi putoaa leveänä kaarena useasta kohdasta jokiuomaa, ja putouksen '
        + 'partaalla seisoo pieniä ihmishahmoja.',
      lahde: 'Valokuva: Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martin Falbisoner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Goðafoss_July_2014.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-godafoss-ddf9c6ae.jpg',
        lyhyt: 'Jäätynyt Goðafoss auringonlaskun valossa, katsoja kalliolla.',
        selite: 'Putous on suurelta osin jään peitossa, ja sen editse virtaa vain kapea '
          + 'avovesiraita. Yksinäinen hahmo seisoo lumisella kalliolla auringonlaskua '
          + 'vasten.',
        lahde: 'Valokuva: Andreas Tille, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Andreas Tille',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:GothafossWinter.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Goðafoss',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Goðafoss voi tarkoittaa?',
      'Miksi patsastarinaa pidetään myöhempänä keksintönä?',
    ],
    korostukset: [
      'Þorgeir Ljósvetningagoði|Þorgeir Ljósvetningagoði',
      'Íslendingabók|Íslendingabók',
    ],
    nappi: 'Tarina papin patsaista syntyy vasta muutaman vuoden päästä, 1880-luvun '
      + 'alussa — eikä sekään ole vanha vaan 1800-luvun oma keksintö',
    // -17.54 E / 65.68 N — en-Wikipedia "Goðafoss"
    laudat: {
      maailmankartta: { x: 5248.7, y: 629.2 },
    },
    teksti: 'Goðafoss on putous Pohjois-Islannissa Skjálfandafljót-joessa, pääreitin '
      + 'varrella noin 45 minuutin ajomatkan päässä Akureyrista. Vesi putoaa kaksitoista '
      + 'metriä kolmenkymmenen metrin levyisenä hevosenkengän muotoisena verhona. Nimi '
      + 'voidaan lukea joko jumalten tai goðin, päällikkö-papin, putoukseksi; vuosina '
      + '1879-1882 Tanskassa julkaistiin tarina, jonka mukaan lainpuhuja Þorgeir '
      + 'Ljósvetningagoði heitti muinaisten jumalten patsaansa putoukseen palattuaan '
      + 'Alþingiltä, jossa hän oli tehnyt kristinuskosta viralliseksi uskonnoksi vuonna '
      + '999 tai 1000. Tarina on todennäköisesti 1800-luvun oma keksintö, sillä vanhin '
      + 'lähde Þorgeirin osuudesta käännytykseen, Ari Þorgilssonin Íslendingabók, ei '
      + 'mainitse patsaiden heittämistä lainkaan — silti tarina on kuvattu myös Akureyrin '
      + 'kirkon ikkunalasiin.',
    lahde: 'en-Wikipedia "Goðafoss", johdanto-osa ja osio "Name" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna kristinuskosta tehtiin Islannin virallinen uskonto Alþingin '
        + 'päätöksellä?',
      vaihtoehdot: [
        '874',
        '930',
        '999 tai 1000',
        '1262',
      ],
      oikea: 2,
      fakta: 'Päätöksen teki lainpuhuja Þorgeir Ljósvetningagoði, mutta vanhin lähde '
        + 'hänen osuudestaan, Ari Þorgilssonin Íslendingabók, ei mainitse mitään '
        + 'patsaiden heittämisestä putoukseen.',
    },
  },
  {
    id: 'hahmotelma-kirkjufell',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-kirkjufell-58b4b8ac.jpg',
      lyhyt: 'Kirkjufell kohoaa terävänä kartiona Kirkjufellsfossin takana.',
      selite: 'Pieni putous kuohuu etualalla, ja sen takana nousee symmetrinen, '
        + 'kirkontornin muotoinen vuori jokea vasten.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kirkjufell,_Iceland,_20230505_1403_5195.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/isl-nosto-kirkjufell-75fd521a.jpg',
        lyhyt: 'Lumipeitteinen Kirkjufell merenlahden takana talvella.',
        selite: 'Vuori kohoaa valkoisena tyynen merenlahden takaa, ja etualan rantakivet '
          + 'ovat lumen peitossa.',
        lahde: 'Valokuva: Beardhatcode, Wikimedia Commons (CC0).',
        tekija: 'Beardhatcode',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kirkjufell_in_winter.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Kirkjufell',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on nunatak?',
      'Missä tv-sarjassa Kirkjufell on esiintynyt kuvauspaikkana?',
    ],
    korostukset: ['nunatak|nunatak', 'Game of Thrones|Game of Thrones'],
    nappi: 'Vuori on isoisällesi vain nimetön maamerkki — maailmanmaine tv-kuvauspaikkana '
      + 'tulee vasta yli sata neljäkymmentä vuotta myöhemmin',
    // -23.3057 E / 64.941 N — en-Wikipedia "Kirkjufell"
    laudat: {
      maailmankartta: { x: 5056.5, y: 669.4 },
    },
    teksti: 'Kirkjufell on 463 metriä korkea kukkula Snæfellsnesin pohjoisrannikolla, '
      + 'lähellä Grundarfjörðurin kylää, ja sitä pidetään Islannin kuvatuimpana vuorena. '
      + 'Se on nunatak eli jääkauden aikana jäätikön yläpuolelle kohonnut kallio, ja sen '
      + 'rakenne koostuu vuorottelevista pleistoseenikautisista laavakerroksista ja '
      + 'hiekkakivestä, huipulla tuffikiveä. Vuori tunnetaan myös televisiosta: se toimi '
      + 'Game of Thrones -sarjan kuudennen ja seitsemännen tuotantokauden kuvauspaikkana '
      + '"nuolenpää"-vuorena, jonka Koira-niminen hahmo näkee Muurin pohjoispuolella. '
      + 'Kiipeäminen on mahdollista kesällä ja syksyllä noin kolmessa tunnissa, mutta '
      + 'jyrkät kohdat ovat vaarallisia sateella, ja vuorella on sattunut '
      + 'kuolemantapauksia useana vuonna.',
    lahde: 'en-Wikipedia "Kirkjufell", johdanto-osa ja osiot "Geography", '
      + '"Mountaineering" (tarkistettu 21.9.2026).',
  },
];
