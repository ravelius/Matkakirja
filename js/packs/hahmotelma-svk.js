/*
 * SLOVAKIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin, Unkarin, Tanskan, Irlannin, Kroatian ja Bulgarian jälkeen Slovakia.
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
 * extmetadata-rajapinnasta). 1873-näkökulma: Slovakiaa ei ole valtiona
 * (Ylä-Unkari eli Felvidék kuuluu Unkarin kruunuun, dualismi 1867);
 * Bratislava on Pozsony/Pressburg ja Košice Kassa, ja nappi-alaotsikot
 * käyttävät niiden 1873 nimiä. Slovakian kansallinen liike toimii
 * Martinissa ja Liptovský Mikulášissa. Slovakiassa ei ole pelikaupunkia,
 * eikä nykyisiä SVK-nostoja: kaupunkikohteet (Bratislava, Košice, Trenčín,
 * Nitra, Trnava) ovat siksi sallittuja. Vuoden 1873 jälkeiset asiat
 * (Zemplínska šírava 1961–65, Bojnicen jälleenrakennus 1888–1910,
 * Smolenicen linna 1900-luvulla) ovat mukana: teksti on nykytietoa ja
 * `nappi` katsoo vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `svk-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/svk/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: Slovakiassa ei ole
 * pelikaupunkia eikä muita nostoja, joten rivit liitetään
 * KOHDE_MAAT.SVK:hon js/fokuskohteet.js:ssä. Nostot ovat keskenään
 * vähintään 7,8 lautayksikön päässä. `lahi: true` on sama lähizoomiportti
 * kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen (Tatranská Lomnican piste on Tatranská
 * Lomnican omasta artikkelista, sisältö Vysoké Tatryn ja Lomnický štítin
 * artikkeleista). Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Slovakian fokuslehden rajaukseen
 * (`osuuLehteen`). Skalica on pelin karkean maailmankartan SVK-renkaan
 * hieman ULKOPUOLELLA (0,2 lautayksikköä), koska rengas on
 * yksinkertaistettu; koordinaatit ovat Wikipedian todelliset.
 * Tatranská Lomnica on 6,5 lautayksikköä Puolan Rysy-nostosta (eri maa,
 * hyväksytty).
 */

/** Slovakian hahmotelmanostot: sisällölliset kohteet, ei pelikaupunkia. */
export const HAHMOTELMA_SVK = [
  {
    id: 'hahmotelma-tatranska-lomnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-tatranska-lomnica-5032c5c0.jpg',
      lyhyt: 'Lomnický štít kohoaa pilvimeren yläpuolelle Korkeilla Tatroilla.',
      selite: 'Kuvassa Lomnický štít, keskellä oleva huippu, sekä sen vieressä Pyšný štít ja Kežmarský štít pilvien yläpuolella.',
      lahde: 'Valokuva: Michal Klajban, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Michal Klajban',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lomnick%C3%BD_%C5%A1t%C3%ADt,_Vysok%C3%A9_Tatry.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-tatranska-lomnica-38951e9a.jpg',
        lyhyt: 'Skalnaté pleson tarha ja Lomnický štít taustalla.',
        selite: 'Skalnaté pleso -järvi ja sen ympärillä kivikkoinen laakso, jonka taustalla kohoaa Lomnický štít. Rinteellä näkyy köysirata.',
        lahde: 'Valokuva: Totalrandomphotos, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Totalrandomphotos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skalnat%C3%A9_pleso_s_Lomnick%C3%BDm_%C5%A1t%C3%ADtem_v_pozad%C3%AD.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tatranská Lomnica',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuka nousi ensimmäisenä kirjatusti Lomnický štítille vuonna 1793?',
      'Kuinka korkea Lomnický štít on?',
    ],
    korostukset: ['Lomnický štít|Lomnický štít'],
    nappi: 'Korkeiden Tatrojen vuoristokylä, jonka huipulle ensimmäinen kirjattu nousu on tehty 80 vuotta sitten (1793)',
    // 20.28333333 E / 49.16666667 N — en-Wikipedia "Tatranská Lomnica"
    laudat: {
      maailmankartta: { x: 6509.4, y: 1426.3 },
      europe: { x: 600.6, y: 600.5 },
    },
    teksti: 'Tatranská Lomnica on osa Vysoké Tatryn kaupunkia Pohjois-Slovakiassa Tatrojen '
      + 'juurella; kaupunki syntyi vasta vuonna 1990, ja se on joukko aiemmin erillisiä '
      + 'kyliä, Slovakian Korkeiden Tatrojen tärkeimpiä matkailukeskuksia, joita yhdistää '
      + 'Tatrojen rautatie. Lomnický štít, Lomnican huippu, on Korkeiden Tatrojen toiseksi '
      + 'korkein huippu 2 634 metrillä Gerlachovský štítin jälkeen, ja se on yksi '
      + 'vierailluimmista; sinne pääsee köysiradalla Tatranská Lomnicasta vuodesta 1940. '
      + 'Englantilainen matkailija Robert Townson nousi huipulle oppaan kanssa 16. elokuuta '
      + '1793, mikä on ensimmäinen kirjattu nousu, ja ensimmäinen talvinousu tehtiin vuonna '
      + '1891. Köysiradan päätepisteessä on ympärivuotisesti miehitetty aurinkoobservatorio '
      + 'ja sääasema.',
    lahde: 'en-Wikipedia "Tatranská Lomnica" (tynkäartikkeli), "Vysoké Tatry" ja "Lomnický '
      + 'štít", johdanto-osat ja historiaosiot (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Lomnický štítille tehtiin ensimmäinen kirjattu nousu?',
      vaihtoehdot: [
        '1793',
        '1693',
        '1893',
        '1843',
      ],
      oikea: 0,
      fakta: 'Köysirata Tatranská Lomnicasta huipulle on ollut käytössä vuodesta 1940.',
    },
  },
  {
    id: 'hahmotelma-dobsinska-jaaluola',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-dobsinska-jaaluola-a17004b1.jpg',
      lyhyt: 'Jääpylväät ja jäälattia Dobšinán jääluolassa.',
      selite: 'Dobšinská ľadová jaskyňa -luolan jäämuodostelmat "Alttari" ja "Kaivo" jäälattian yllä luolan kalliokaton alla.',
      lahde: 'Valokuva: Margoz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Margoz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dob%C5%A1insk%C3%A1_%C4%BEadov%C3%A1_jasky%C5%88a_altar_and_well.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-dobsinska-jaaluola-d9cd99fe.jpg',
        lyhyt: 'Jäämuodostelma "Kaivo" Dobšinán jääluolassa.',
        selite: 'Dobšinská ľadová jaskyňa -luolan jäämuodostelma "Kaivo" kohoaa jäälattiasta kalliokattoa vasten.',
        lahde: 'Valokuva: Margoz, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Margoz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dob%C5%A1insk%C3%A1_%C4%BEadov%C3%A1_jasky%C5%88a_Ice_form_well.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dobšinská jääluola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuka löysi Dobšinská jääluolan 15. kesäkuuta 1870?',
      'Millä nimellä paimenet tunsivat luolan sisäänkäynnin?',
    ],
    korostukset: ['jääluola|jääluola'],
    nappi: 'Slovakian paratiisin jääluola, löydetty vasta kolme vuotta sitten (1870) ja avattu yleisölle 1871',
    // 20.29472222 E / 48.87194444 N — en-Wikipedia "Dobšiná Ice Cave"
    laudat: {
      maailmankartta: { x: 6509.8, y: 1438.9 },
      europe: { x: 600.9, y: 608.3 },
    },
    teksti: 'Dobšinská jääluola, slovakiaksi Dobšinská ľadová jaskyňa, on jääluola Slovakiassa '
      + 'Dobšinán kaivoskaupungin lähellä Slovenský rajin alueella. Sen löysi 15. kesäkuuta '
      + '1870 kuninkaallinen kaivosinsinööri Jenő Ruffinyi yhdessä Gustáv Langin ja Andrej '
      + 'Megan kanssa, vaikka paimenet ja metsästäjät olivat tunteneet sisäänkäynnin kauan '
      + 'nimellä Studená diera eli kylmä reikä. Luola avattiin yleisölle vuotta löydön '
      + 'jälkeen, ja vuonna 1887 siitä tuli Euroopan ensimmäinen sähkövalaistu luola. Jäätä '
      + 'on paksuimmillaan 26,5 metriä ja sen määräksi arvioitiin 125 000 kuutiometriä, minkä '
      + 'vuoksi luola on maailman tärkeimpiä jääluolia; vuodesta 2000 se on ollut Unescon '
      + 'maailmanperintökohde osana Aggtelekin ja Slovakian karstin luolia.',
    lahde: 'en-Wikipedia "Dobšiná Ice Cave", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Dobšinská jääluola löydettiin?',
      vaihtoehdot: [
        '1830',
        '1850',
        '1870',
        '1890',
      ],
      oikea: 2,
      fakta: 'Luola oli vuonna 1887 Euroopan ensimmäinen sähkövalaistu luola.',
    },
  },
  {
    id: 'hahmotelma-ochtinska',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-ochtinska-6a829b5b.jpg',
      lyhyt: 'Valkoisia aragoniittikiteitä Ochtinán luolan katossa.',
      selite: 'Ochtinská aragonitová jaskyňa -luolan aragoniittikiteitä, jotka muodostavat valkoisia pörröisiä kasautumia luolan seinällä.',
      lahde: 'Valokuva: Jojo, en:Jojo_1, pl:Jojo, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jojo, en:Jojo_1, pl:Jojo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ochtina_Aragonite_Cave_28.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-ochtinska-0d99ed04.jpg',
        lyhyt: 'Kalkkikivimuodostelmia ja pieni allas Ochtinán luolassa.',
        selite: 'Ochtinská aragonitová jaskyňa -luolan lämpimänsävyisiä kerrostuneita kalkkimuodostelmia ja allasmaisia reunakiviä luolan pohjalla.',
        lahde: 'Valokuva: Jojo, en:Jojo_1, pl:Jojo, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jojo, en:Jojo_1, pl:Jojo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ochtina_Aragonite_Cave_14.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Ochtinská aragoniittiluola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minä vuonna Ochtinská aragoniittiluola löydettiin?',
      'Minkä salin aragoniitit hohtavat kuin tähdet?',
    ],
    korostukset: ['aragoniitti|aragoniittimuodostelmistaan'],
    nappi: 'Rožňavan seudun karstiluola, joka löydetään vasta vuonna 1954',
    // 20.30565278 E / 48.66364444 N — en-Wikipedia "Ochtinská Aragonite Cave"
    laudat: {
      maailmankartta: { x: 6510.2, y: 1447.9 },
      europe: { x: 601.1, y: 613.7 },
    },
    teksti: 'Ochtinská aragoniittiluola on ainutlaatuinen aragoniittiluola Etelä-Slovakiassa '
      + 'lähellä Rožňavaa. Vaikka se on vain 300 metriä pitkä, se on kuuluisa harvinaisista '
      + 'aragoniittimuodostelmistaan, ja se on osa Unescon Aggtelekin ja Slovakian karstin '
      + 'luolia. Luola sijaitsee 642 metrin korkeudessa, ja sen lämpötila pysyy 7,2–7,8 '
      + 'asteessa; vakaa mikroilmasto ja hitaasti tippuva, rautaa, mangaania ja magnesiumia '
      + 'sisältävä vesi mahdollistavat koristeellisten muodostelmien synnyn, ja vanhimmat '
      + 'niistä ovat 120 000–130 000 vuotta vanhoja. Pääkohteessa, Linnunradan salissa, '
      + 'valkoiset aragoniittihaarukat ja -kasaumat hohtavat kuin Linnunradan tähdet; luola '
      + 'löydettiin vuonna 1954 ja avattiin yleisölle 1972.',
    lahde: 'en-Wikipedia "Ochtinská Aragonite Cave", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-poloniny',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-poloniny-c11ad12c.jpg',
      lyhyt: 'Stužican alkumetsää, kaatuneita runkoja ja pieni puro.',
      selite: 'Poloninyn kansallispuiston Stužican alkumetsää, jossa kaatuneet puut lahoavat paikoillaan puron varrella.',
      lahde: 'Valokuva: Caroig, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Caroig',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stu%C5%BEica_primeval_forest,_Slovakia.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-poloniny-fcd099ad.jpg',
        lyhyt: 'Poloninyn niittyharjanne ja metsäiset vuoret kauempana.',
        selite: 'Poloninyn kansallispuiston harjanteen nurmi- ja mustikkakasvustoa, jonka takana siintävät metsäiset Karpaattien vuoret.',
        lahde: 'Kuva: Richard Orr at English Wikipedia, Wikimedia Commons (public domain).',
        tekija: 'Richard Orr at English Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poloniny_2008a.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-poloniny-db5fb3ee.jpg',
        lyhyt: 'Lumen painamia kuusia Kamenná lúkan näköalapaikalla talvella.',
        selite: 'Lumen peittämiä puita ja talvinen maisema Kamenná lúkan näköalapaikalta Poloninyn kansallispuiston alueelta.',
        lahde: 'Valokuva: Milan Bališin, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Milan Bališin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kamenn%C3%A1_l%C3%BAka_03.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Poloninyn kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minä vuonna Poloninyn kansallispuisto perustettiin?',
      'Minkä eläimen pieni lauma palautettiin alueelle vuonna 2004?',
    ],
    korostukset: ['kansallispuisto|kansallispuisto'],
    nappi: 'Karpaattien itäisin metsäseutu Unkarin kruunun koillisrajalla',
    // 22.425 E / 49.045 N — en-Wikipedia "Poloniny National Park"
    laudat: {
      maailmankartta: { x: 6580.8, y: 1431.5 },
      europe: { x: 641.8, y: 603.7 },
    },
    teksti: 'Poloninyn kansallispuisto on kansallispuisto Koillis-Slovakiassa Puolan ja Ukrainan '
      + 'rajoilla Bukovské vrchyn vuoristossa, joka kuuluu Itäisiin Karpaatteihin. Puisto '
      + 'perustettiin 1. lokakuuta 1997, ja sen suojelualue on 298 neliökilometriä; se on '
      + 'maan itäisin ja harvimmin asuttu alue. Metsät peittävät noin 80 prosenttia alueesta, '
      + 'ja Slovakian tiheimmät vanhat metsät ovat täällä; vuoriharjanteen niityt, joita '
      + 'itäslovakian murteissa kutsutaan poloninoiksi, antavat puistolle nimen. Havešovan, '
      + 'Stužican ja Rožokin alkuperäiset pyökkimetsät ovat Unescon maailmanperintökohde '
      + 'vuodesta 2007, ja vuonna 2004 alueelle palautettiin pieni visenttilauma.',
    lahde: 'en-Wikipedia "Poloniny National Park", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zemplinska-sirava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-zemplinska-sirava-f998033e.jpg',
      lyhyt: 'Zemplínska šírava -tekojärven ranta ja laituri Kalužan lähellä.',
      selite: 'Zemplínska šírava -tekojärven nurmikkoranta ja laituri kesäpäivänä Michalovcen alueella.',
      lahde: 'Valokuva: Ing.Mgr. Jozef Kotulič, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ing.Mgr. Jozef Kotulič',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zempl%C3%ADnska_%C5%A1%C3%ADrava_21_Slovakia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-zemplinska-sirava-8bd4561e.jpg',
        lyhyt: 'Zemplínska šírava -järven yli näkyy Vihorlatin vuoristo.',
        selite: 'Näkymä Zemplínska šírava -tekojärven yli Vihorlatské vrchyn vuoristoon.',
        lahde: 'Valokuva: Milan Bališin, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Milan Bališin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vihorlatsk%C3%A9_vrchy_-_Zempl%C3%ADnska_%C5%A1%C3%ADrava_001.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zemplínska šírava',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Minä vuosina Zemplínska šíravan pato rakennettiin?',
      'Kuinka suuri järven pinta-ala on?',
    ],
    korostukset: ['tekojärvi|tekojärvi'],
    nappi: 'Zemplínin historiallinen seutu Bodrogin varrella; tekojärveä ei ole vielä olemassa',
    // 22.03666667 E / 48.78333333 N — en-Wikipedia "Zemplínska šírava"
    laudat: {
      maailmankartta: { x: 6567.9, y: 1442.8 },
      europe: { x: 634.3, y: 610.6 },
    },
    teksti: 'Zemplínska šírava, jota kutsutaan joskus Slovakian mereksi, on tekojärvi '
      + 'Itä-Slovakiassa lähellä Michalovcen kaupunkia. Nimi muistuttaa historiallisesta '
      + 'Zemplínin seudusta. Pato rakennettiin vuosina 1961–1965, ja järven pinta-ala on 33 '
      + 'neliökilometriä, keskisyvyys 9,5 metriä ja suurin syvyys 14 metriä. Vesi virtaa '
      + 'Laborec-jokeen, joka laskee Bodrogiin; alue on ensisijaisesti virkistyskäytössä, ja '
      + 'järvi tuottaa myös jäähdytysvettä Vojanyn voimalaitokselle.',
    lahde: 'en-Wikipedia "Zemplínska šírava", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-spis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-spis-6fc6a694.jpg',
      lyhyt: 'Spišin linna kohoaa kalliokukkulan laella vihreän rinteen yläpuolella.',
      selite: 'Kuvassa Spišský hrad lännestä katsottuna: linnakompleksin muurit ja torni nousevat kalliopohjan päälle.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spissky_hrad_west.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-spis-aff286c4.jpg',
        lyhyt: 'Spišin linna metsäisen maiseman keskellä kukkulallaan.',
        selite: 'Kuvassa Spišský hrad kaukaa, metsäisen maiseman yli katsottuna. Linnan muurit ja torni erottuvat kukkulan laella.',
        lahde: 'Valokuva: Draceane, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Draceane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spi%C5%A1sk%C3%BD_hrad,_2019_(54).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Spišin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Spišin linna tuhoutui tulipalossa?',
      'Minä vuonna linna hyväksyttiin Unescon maailmanperintöluetteloon?',
    ],
    korostukset: ['travertiini|travertiinikukkulalla'],
    nappi: 'Szepesin komitaatin muinainen linna, joka on ollut raunioina vuoden 1780 palosta',
    // 20.76833333 E / 49.00055556 N — en-Wikipedia "Spiš Castle"
    laudat: {
      maailmankartta: { x: 6525.6, y: 1433.4 },
      europe: { x: 610, y: 604.9 },
    },
    teksti: 'Spišin linnan rauniot Itä-Slovakiassa muodostavat yhden Slovakian kuudesta '
      + 'suurimmasta linnakohteesta. Linna sijaitsee travertiinikukkulalla Spišské Podhradien '
      + 'kaupungin ja Žehran kylän yläpuolella, ja Unescon maailmanperintöluetteloon se '
      + 'hyväksyttiin vuonna 1993 yhdessä Spišská Kapitulan ja Žehran kanssa. Linnan '
      + 'rakentaminen alkoi 1100-luvun alussa, vanhin kirjallinen maininta on vuodelta 1120, '
      + 'ja aluksi se oli Unkarin kuningaskunnan pohjoinen rajalinnake, josta tuli '
      + 'vuosisadoiksi Szepesin komitaatin poliittinen ja hallinnollinen keskus. Csáky-suku '
      + 'hylkäsi linnan 1700-luvun alussa liian epämukavana, ja vuonna 1780 se tuhoutui '
      + 'tulipalossa, jonka syytä ei tiedetä; sen jälkeen se on rappeutunut ja vasta '
      + '1900-luvun jälkipuoliskolla sitä on osittain jälleenrakennettu. Linnaa hallinnoi '
      + 'Levočassa toimiva Spišin museo.',
    lahde: 'en-Wikipedia "Spiš Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-banska-stiavnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-banska-stiavnica-c287b0f8.jpg',
      lyhyt: 'Banská Štiavnican vanhakaupunki värikkäine kattoineen metsäisten rinteiden keskellä.',
      selite: 'Näkymä Uudelta linnalta Banská Štiavnican historialliseen keskustaan. Kuvassa kaupungin katot ja kirkonkellotornit sekä ympäröivät rinteet.',
      lahde: 'Valokuva: Adrian Tync, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Adrian Tync',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bansk%C3%A1_%C5%A0tiavnica_from_Nov%C3%BD_z%C3%A1mok_2007.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-banska-stiavnica-feedb27e.jpg',
        lyhyt: 'Banská Štiavnican Vanha linna valkoisine muureineen ja vihreäkupolinen torni.',
        selite: 'Kuvassa Banská Štiavnican Starý zámok eli Vanha linna muureineen. Kuvan oikealla puolella on vihreäkattoinen torni.',
        lahde: 'Valokuva: Mineralysk, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mineralysk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bansk%C3%A1_%C5%A0tiavnica_-_Star%C3%BD_z%C3%A1mok_2006.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Banská Štiavnica',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minä vuonna kaupungissa käytettiin ruutia kaivoksessa yhtenä ensimmäisistä maailmassa?',
      'Millä nimellä vesialtaiden ja kanavien järjestelmää kutsutaan?',
    ],
    korostukset: ['tajchy|tajchy'],
    nappi: 'Hopeakaivosten kaupunki (Selmecbánya), jonka kaivos- ja metsäakatemia on toiminut yli sata vuotta',
    // 18.89638889 E / 48.45805556 N — en-Wikipedia "Banská Štiavnica"
    laudat: {
      maailmankartta: { x: 6463.2, y: 1456.7 },
      europe: { x: 574, y: 619.2 },
    },
    teksti: 'Banská Štiavnica on kaupunki Keski-Slovakiassa muinaisen tulivuoren romahtamisen '
      + 'synnyttämän valtavan kalderan keskellä, ja sen asukasluku on alle 10 000. Se oli '
      + 'tärkeä keskiaikainen kaivoskeskus, jonka kohtalo oli sidoksissa runsaisiin '
      + 'hopeamalmivaroihin, ja se sai kuninkaallisen kaupungin aseman vuonna 1238. Vuonna '
      + '1627 siellä käytettiin ruutia kaivoksessa yhtenä ensimmäisistä maailmassa, ja '
      + '1700-luvulla paikalliset tutkijat rakensivat tulvivien kaivosten kuivattamiseksi '
      + 'kehittyneen tajchy-nimisen vesialtaiden ja kanavien järjestelmän. Vuonna 1735 '
      + 'perustettu kaivoskoulu, Unkarin kuningaskunnan ensimmäinen, muutettiin vuodesta 1763 '
      + 'kaivosakatemiaksi, ja vuonna 1848 siitä tuli kaivos- ja metsäakatemia, jota '
      + 'kutsutaan maailman ensimmäiseksi teknilliseksi yliopistoksi. Kaupunki ja sen '
      + 'ympäristö julistettiin Unescon maailmanperintökohteeksi 11. joulukuuta 1993.',
    lahde: 'en-Wikipedia "Banská Štiavnica", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Banská Štiavnicassa perustettiin Unkarin ensimmäinen kaivoskoulu?',
      vaihtoehdot: [
        '1735',
        '1685',
        '1785',
        '1835',
      ],
      oikea: 0,
      fakta: 'Kaivoksessa käytettiin ruutia vuonna 1627 yhtenä ensimmäisistä maailmassa.',
    },
  },
  {
    id: 'hahmotelma-kremnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-kremnica-bd8dbed1.jpg',
      lyhyt: 'Kremnican linnoituskompleksin kivimuuri ja kellotorni sinistä taivasta vasten.',
      selite: 'Kuvassa Kremnican linnakompleksin kivimuureja ja niiden takaa kohoava kellotorni. Etualalla on nurmea ja puita.',
      lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Palickap',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kremnica,_hrad_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-kremnica-18240dc0.jpg',
        lyhyt: 'Kremnican rahapajan rakennus (Mincovňa) punaisine kattoineen.',
        selite: 'Kuvassa Kremnican rahapajan rakennus, jonka julkisivussa lukee Mincovňa. Taustalla näkyy metsäinen rinne.',
        lahde: 'Valokuva: Ladislav Luppa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ladislav Luppa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kremnica_-_Mincov%C5%88a_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-kremnica-bc4e1ae1.jpg',
        lyhyt: 'Kremnican kaupunginaukio pylväsmonumentteineen ja kirkon torneineen.',
        selite: 'Kuvassa Kremnican aukio, jonka keskellä on barokkityylinen pylväsmonumentti. Taustalla kohoaa kirkon torni.',
        lahde: 'Valokuva: Peko, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Peko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kremnica,_namestie.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kremnica',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Minä vuonna Kremnica sai kuninkaalliset kaupunkioikeudet?',
      'Mitä Kremnican dukaatit olivat?',
    ],
    korostukset: ['rahapaja|rahapaja'],
    nappi: 'Kultainen Kremnica: Unkarin kuninkaallisen rahapajan kaupunki',
    // 18.92 E / 48.7 N — en-Wikipedia "Kremnica"
    laudat: {
      maailmankartta: { x: 6464, y: 1446.3 },
      europe: { x: 574.5, y: 612.8 },
    },
    teksti: 'Kremnica on noin 5 300 asukkaan kaupunki Keski-Slovakiassa, jonka hyvin säilynyt '
      + 'keskiaikainen keskusta on rakennettu tärkeiden kultakaivosten yläpuolelle. '
      + 'Kaupungissa on maailman vanhin yhä toimiva rahapaja. Kremnica sai kuninkaalliset '
      + 'kaupunkioikeutensa vuonna 1328 kuningas Kaarle I:ltä, ja rahapaja oli jo silloin '
      + 'toiminnassa; vuodesta 1335 se löi kultaflorineja ja myöhemmin kuuluisia Kremnican '
      + 'dukaatteja, jotka olivat kansainvälinen maksuväline niiden tasaisen kultapuhtauden '
      + 'ansiosta. Rahapajan tuoman vaurauden vuoksi kaupunki sai lempinimen Kultainen '
      + 'Kremnica, ja 1400-luvulla se oli Unkarin kuningaskunnan toiseksi tärkein kaupunki.',
    lahde: 'en-Wikipedia "Kremnica", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä ainutlaatuinen asema Kremnican rahapajalla on?',
      vaihtoehdot: [
        'Suurin koko maailmassa',
        'Ensimmäinen setelipaino',
        'Kuninkaan yksityinen kassa',
        'Vanhin yhä toimiva',
      ],
      oikea: 3,
      fakta: 'Kremnican dukaatteja käytettiin kansainvälisenä maksuvälineenä.',
    },
  },
  {
    id: 'hahmotelma-bojnice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bojnice-8a66f73f.jpg',
      lyhyt: 'Bojnicen linna tornikatoineen ja vallihaudan vesi etualalla.',
      selite: 'Kuvassa Bojnicen linna, jonka tornit ja koristeelliset kattorakenteet nousevat vihreän puuston yläpuolelle. Linnaa ympäröi vesi.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bojnice_(Bojnitz)_Castle_(by_Pudelek).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bojnice-54d92f74.jpg',
        lyhyt: 'Bojnicen linna ylhäältä päin, ympärillä puistomaista puustoa.',
        selite: 'Kuvassa Bojnicen linna ilmasta katsottuna. Linnaa ympäröivät puut ja taustalla näkyy laakso.',
        lahde: 'Valokuva: visamatti, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'visamatti',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bojnice_castle,_Slovakia_(48271843812).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Bojnicen linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Bojnicen linna mainitaan ensi kerran?',
      'Minkä sukuun kuulunut kreivi toteutti romanttisen jälleenrakennuksen?',
    ],
    korostukset: ['Pálffy|Pálffy'],
    nappi: 'Pálffyjen vanha linna, jonka romanttinen jälleenrakennus alkaa vasta vuonna 1888',
    // 18.57777778 E / 48.78 N — en-Wikipedia "Bojnice Castle"
    laudat: {
      maailmankartta: { x: 6452.6, y: 1442.9 },
      europe: { x: 567.9, y: 610.7 },
    },
    teksti: 'Bojnicen linna on keskiaikainen linna Bojnicen kaupungissa Slovakiassa: romaaninen '
      + 'linna, jossa on säilynyt goottilaisia ja renessanssin osia, ja se rakennettiin '
      + '1100-luvulla. Se mainitaan ensi kerran vuonna 1113, ja aluksi se oli puulinnake, '
      + 'joka korvattiin vähitellen kivellä. Kuningas Matthias Corvinus antoi sen vuonna 1489 '
      + 'avioton poikansa Johnin haltuun; Thurzo-suku muutti sen renessanssilinnaksi vuodesta '
      + '1528, ja vuodesta 1646 omistajina olivat Pálffyt. Kreivi János Ferenc Pálffy '
      + 'toteutti vuosina 1888–1910 kokonaisen romanttisen jälleenrakennuksen ja loi '
      + 'nykyisen, Loiren laakson linnoja jäljittelevän ulkoasun. Nykyään linna on yksi '
      + 'Slovakian vierailluimmista, ja sitä on käytetty fantasia- ja satuelokuvien '
      + 'kuvauspaikkana.',
    lahde: 'en-Wikipedia "Bojnice Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-orava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-orava-c65e319f.jpg',
      lyhyt: 'Oravan linna kohoaa jyrkän kallion päällä metsän yläpuolella.',
      selite: 'Kuvassa Oravský hrad kalliolla, jota ympäröi metsä. Linnan tornit ja rakennukset seuraavat kallion muotoja.',
      lahde: 'Valokuva: Lynx1211, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lynx1211',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oravsk%C3%BD_hrad_(celkov%C3%BD_pohled).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-orava-f6837924.jpg',
        lyhyt: 'Oravan linnan sisäpiha ja korkeat kivitornit alhaalta katsottuna.',
        selite: 'Kuvassa Oravský hradin sisäpihaa sekä linnan tornit ja portaikot. Kuva on otettu pihalta ylöspäin.',
        lahde: 'Valokuva: Lynx1211, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Lynx1211',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oravsk%C3%BD_hrad_(n%C3%A1dvo%C5%99%C3%AD).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Oravan linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka korkea linnan kallio on?',
      'Minkä elokuvan kohtauksia linnassa kuvattiin vuonna 1922?',
    ],
    korostukset: ['Thurzo|Thurzo'],
    nappi: 'Árvan komitaatin linna korkealla kalliolla; vuoden 1800 tulipalon jälkeen ei enää asuttu',
    // 19.35805556 E / 49.26166667 N — en-Wikipedia "Orava Castle"
    laudat: {
      maailmankartta: { x: 6478.6, y: 1422.2 },
      europe: { x: 582.9, y: 598 },
    },
    teksti: 'Oravan linna, slovakiaksi Oravský hrad, on korkealla kalliolla Orava-joen yllä '
      + 'Oravský Podzámokin kylässä. Linna rakennettiin Unkarin kuningaskunnassa; vanhimmat '
      + 'osat ovat 1200-luvulta ja uusimmat 1600-luvun alusta. Se nousee kalkkikivisen, 112 '
      + 'metriä korkean kalliokielekkeen päällä, jota ympäröivät Orava-joki ja sen sivupuro '
      + 'Račová; ensimmäinen kirjallinen maininta on vuodelta 1267, ja vuonna 1370 linnasta '
      + 'tuli Árvan komitaatin keskus. Kaivosmagnaatti Thurzo-suku uudisti linnaa laajasti '
      + '1500-luvun puolivälistä alkaen, ja nykyisen muotonsa se sai vuoteen 1611 mennessä. '
      + 'Vuonna 1800 linna paloi eikä sitä sen jälkeen käytetty asuntona; siellä kuvattiin '
      + 'vuonna 1922 monia Nosferatu-elokuvan kohtauksia, joissa se esittää kreivi Orlokin '
      + 'linnaa.',
    lahde: 'en-Wikipedia "Orava Castle", johdanto-osa ja osio "Origins" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trencin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trencin-8ef8b16a.jpg',
      lyhyt: 'Trenčínin linna kohoaa kukkulalla Váh-joen yllä.',
      selite: 'Kuva on otettu Váh-joen suunnasta: linnan korkea päätorni ja vaaleat asuinrakennukset kohoavat kukkulan laella linnamuurien takana.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trencin_Castle_030.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trencin-89ec16b7.jpg',
        lyhyt: 'Trenčínin linna kaupungin kattojen yläpuolella.',
        selite: 'Linna sijaitsee kalliolla kaupungin yläpuolella. Kuvassa näkyvät linnan muurit, kellotorni ja päärakennus vanhankaupungin talojen takaa.',
        lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Scotch Mist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tren%C4%8D%C3%ADn_Castle_58.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trencin-e03c219d.jpg',
        lyhyt: 'Kalliopintaan kaiverrettu roomalaisten latinankielinen kirjoitus Trenčínissä.',
        selite: 'Karkeaan kallioon on kaiverrettu suuria latinalaisia kirjaimia. Kirjoitus liittyy roomalaisten Laugaricion sotilastukikohtaan Trenčínin kohdalla.',
        lahde: 'Valokuva: Qasinka, Wikimedia Commons (CC0).',
        tekija: 'Qasinka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2016_Roman_inscription_in_Trencin.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Trenčín',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna roomalaiset kaivertivat kirjoituksen Trenčínin linnan alla olevaan kallioon?',
      'Millä nimellä kirjoitus mainitsee paikan?',
    ],
    korostukset: ['Laugaricio|Laugaricio'],
    nappi: 'Trencsénin komitaatin kaupunki ja linna, jonka kallioon roomalaiset ovat piirtäneet kirjoituksen',
    // 18.03666667 E / 48.89194444 N — en-Wikipedia "Trenčín"
    laudat: {
      maailmankartta: { x: 6434.6, y: 1438.1 },
      europe: { x: 557.5, y: 607.7 },
    },
    teksti: 'Trenčín on Länsi-Slovakian kaupunki Váh-joen laaksossa lähellä Tšekin rajaa, noin 95 '
      + 'kilometriä Bratislavasta; siellä on yli 55 000 asukasta. Kaupungin yllä kalliolla '
      + 'kohoaa keskiaikainen Trenčínin linna. Kaupunki tunnetaan kalliokirjoituksesta linnan '
      + 'alla: roomalaiset kaivertivat vuonna 179 Marcomannisotien aikana kallioon '
      + 'kirjoituksen, joka mainitsee paikan nimellä Laugaricio ja joka oli pitkään '
      + 'Keski-Euroopan pohjoisin tunnettu todiste roomalaisten sotilaiden läsnäolosta. '
      + 'Vuonna 1017 Unkarin Tapani I valloitti alueen, joka pysyi osana Unkaria vuoteen '
      + '1918, ja 1000-luvun lopulla linnasta tuli Trencsénin komitaatin hallinnollinen '
      + 'keskus. Linna kesti yhtenä harvoista kivilinnoista vuoden 1241 mongolien '
      + 'hyökkäyksen, ja vuonna 1335 kaupungissa allekirjoitettiin Böömin, Unkarin ja Puolan '
      + 'Trentschinin sopimus.',
    lahde: 'en-Wikipedia "Trenčín", johdanto-osa ja osiot "Names and etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bratislava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bratislava-fd1b4bea.jpg',
      lyhyt: 'Bratislavan linna ja Pyhän Martinin tuomiokirkon torni Tonavan rannalta nähtynä.',
      selite: 'Kuva on otettu Tonavalta. Valkoinen nelitorninen linna kohoaa vihreän rinteen laella, ja oikealla näkyy Pyhän Martinin tuomiokirkon tornin huippu.',
      lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Uoaei1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bratislava_Castle_and_Cathedral_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bratislava-bfdc2fd2.jpg',
        lyhyt: 'Pyhän Martinin tuomiokirkko Bratislavan vanhassakaupungissa.',
        selite: 'Goottilaisen kirkon eteläpuoli, jonka vihreä ja kultainen tornikupoli kohoaa punaisten kattojen yläpuolelle. Etualalla on pieni puistoaukio.',
        lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Uoaei1',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bratislava_Saint_Martin\'s_Cathedral_S_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bratislava (Pozsony)',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka monta kuningasta ja kuningatarta kruunattiin Pyhän Martinin tuomiokirkossa?',
      'Minä vuonna kaupungin ensimmäinen pysyvä Tonavan silta valmistui?',
    ],
    korostukset: ['Pressburg|Pressburg'],
    nappi: 'Pozsony eli Pressburg: Unkarin entinen kruunajaiskaupunki Tonavan rannalla, ei vielä siltaa',
    // 17.10972222 E / 48.14388889 N — en-Wikipedia "Bratislava"
    laudat: {
      maailmankartta: { x: 6403.7, y: 1470.1 },
      europe: { x: 539.7, y: 627.4 },
    },
    teksti: 'Bratislava, unkariksi Pozsony ja saksaksi Pressburg, on Slovakian nykyinen '
      + 'pääkaupunki, Tonavan varrella lounaisessa Slovakiassa Pienten Karpaattien juurella. '
      + 'Se on Wienin vieressä: kaupungit ovat vain 50 kilometrin päässä toisistaan, mikä '
      + 'tekee niistä Euroopan lähimmät pääkaupungit. Vuosina 1536–1783 kaupunki oli Unkarin '
      + 'kuningaskunnan kruunajaispaikka, lainsäädäntökeskus ja pääkaupunki, ja Pyhän '
      + 'Martinin tuomiokirkossa kruunattiin yksitoista kuningasta ja kahdeksan kuningatarta; '
      + 'useimmat Unkarin valtiopäivät pidettiin siellä 1600-luvulta uudistuskauteen asti. '
      + '1800-luvun teollistumisen aikana kaupunkiin rakennettiin Unkarin kuningaskunnan '
      + 'ensimmäinen hevosrautatie Pressburgista Szentgyörgyyn (1840), höyryveturirata '
      + 'Wieniin vuonna 1848 ja Pestiin 1850, mutta kaupungin ensimmäinen pysyvä silta '
      + 'Tonavan yli, Starý most, valmistui vasta vuonna 1891. Kaupungin yllä kohoaa linna '
      + 'tasanteella 85 metriä Tonavan yläpuolella.',
    lahde: 'en-Wikipedia "Bratislava", johdanto-osa ja osiot "History" ja "Bratislava Castle" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuinka kaukana Bratislava on Wienistä?',
      vaihtoehdot: [
        '50 kilometriä',
        '150 kilometriä',
        '80 kilometriä',
        '20 kilometriä',
      ],
      oikea: 0,
      fakta: 'Kaupungit ovat Euroopan lähimmät pääkaupungit.',
    },
  },
  {
    id: 'hahmotelma-kosice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-kosice-81c1473a.jpg',
      lyhyt: 'Pyhän Elisabetin tuomiokirkko Košicessa.',
      selite: 'Suuri goottilainen tuomiokirkko, jonka katto on kuvioitu värillisillä tiilillä ja jonka tornin huipussa on kultakoristeita. Kuva näyttää kirkon kaupungin aukiolta.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St_Elisabeth_Cathedral_Kosice.jpeg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-kosice-2dc35a9e.jpg',
        lyhyt: 'Hlavná-katu Košicen vanhassakaupungissa.',
        selite: 'Leveän kävelykadun keskellä kulkevat raitiotiekiskot, ja reunoilla on kahvilaterasseja. Kadun päässä häämöttää kupolikattoinen rakennus.',
        lahde: 'Valokuva: Ladislav Luppa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ladislav Luppa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ko%C5%A1ice_-_Hlavn%C3%A1_ulica_-a.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Košice (Kassa)',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä on Slovakian suurin kirkko?',
      'Mitkä viisi kaupunkia kuuluivat Pentapolitanaan?',
    ],
    korostukset: ['tuomiokirkko|tuomiokirkko'],
    nappi: 'Kassa: Ylä-Unkarin viiden kaupungin liiton johtava kaupunki, jolla on Slovakian suurin kirkko',
    // 21.25 E / 48.71666667 N — en-Wikipedia "Košice"
    laudat: {
      maailmankartta: { x: 6541.7, y: 1445.6 },
      europe: { x: 619.2, y: 612.4 },
    },
    teksti: 'Košice, unkariksi Kassa ja saksaksi Kaschau, on Itä-Slovakian suurin kaupunki '
      + 'Hornád-joen varrella Slovakian malmivuorten itäosassa lähellä Unkarin ja Ukrainan '
      + 'rajaa. Ensimmäinen kirjallinen maininta on vuodelta 1230 nimellä Villa Cassa. '
      + 'Kaupungin historiallinen keskusta on Slovakian kaupungeista laajin, ja siellä on '
      + 'Slovakian suurin kirkko, Pyhän Elisabetin tuomiokirkko, joka oli aikanaan Unkarin '
      + 'kuningaskunnan suurin ja jonka rakentamista tuki keisari Sigismund. 1400-luvun '
      + 'alusta Košice oli Pentapolitanan, Ylä-Unkarin viiden tärkeimmän kaupungin (Bardejov, '
      + 'Levoča, Košice, Prešov ja Sabinov) liiton, johtavia jäseniä; kuningas Matthias '
      + 'Corvinuksen aikana noin 10 000 asukkaan kaupunki oli Euroopan suurimpia. Kaupungin '
      + 'kerrotaan olleen ensimmäinen Euroopan asutus, jolle myönnettiin oma vaakuna.',
    lahde: 'en-Wikipedia "Košice", johdanto-osa ja osiot "Etymology" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä ensimmäistä Košicen kerrotaan olleen Euroopassa?',
      vaihtoehdot: [
        'Höyryrautatie',
        'Oma vaakuna',
        'Yliopisto',
        'Kirjapaino',
      ],
      oikea: 1,
      fakta: 'Pyhän Elisabetin tuomiokirkko on Slovakian suurin kirkko.',
    },
  },
  {
    id: 'hahmotelma-bardejov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bardejov-2359084d.jpg',
      lyhyt: 'Bardejovin pääaukio ja kaupungintalo ylhäältä nähtynä.',
      selite: 'Aukion keskellä seisoo renessanssikaupungintalo, ja aukiota reunustavat värikkäät, punakattoiset kaupunkitalot. Taustalla kohoavat metsäiset kukkulat.',
      lahde: 'Valokuva: Michał Rawlik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michał Rawlik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Market_Square_of_Bardejov.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bardejov-48c242a6.jpg',
        lyhyt: 'Pyhän Egidiuksen kirkko Bardejovin keskustassa.',
        selite: 'Goottilaisella kirkolla on korkea, neulamaisen terävä tornikatto ja korkeat kapeat ikkunat. Kirkko seisoo kivetyn aukion laidalla.',
        lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ingo Mehling',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bardejov_-_Church_of_St._Aegidius.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-bardejov-b9836eef.jpg',
        lyhyt: 'Bardejovin kaupunginmuurin bastioneja.',
        selite: 'Kuvassa on osa Alaportin muuria, ja taustalla erottuvat Suuri ja Punainen bastioni. Kivimuurin edessä on ruohoinen rinne.',
        lahde: 'Valokuva: Lure, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lure',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bardejov_mestske_opevnenie.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bardejov',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka moni kilta hallitsi kaupungin taloutta?',
      'Minä vuonna kaupunki sai kuninkaallisen kaupungin aseman?',
    ],
    korostukset: ['kilta|kiltaa'],
    nappi: 'Bártfa: Šarišin vanha kauppakaupunki lähellä Puolan rajaa',
    // 21.27611111 E / 49.29333333 N — en-Wikipedia "Bardejov"
    laudat: {
      maailmankartta: { x: 6542.5, y: 1420.8 },
      europe: { x: 619.7, y: 597.2 },
    },
    teksti: 'Bardejov, unkariksi Bártfa ja saksaksi Bartfeld, on kaupunki Koillis-Slovakiassa '
      + 'Šarišin alueella Topľa-joen tulvatasanteella Beskydien kukkuloilla. Sen täysin '
      + 'ehjänä säilynyt keskiaikainen keskusta sisältää lukuisia kulttuurimuistomerkkejä, ja '
      + 'kaupunki on Unescon maailmanperintökohde. Ensimmäinen kirjallinen maininta on '
      + '1240-luvulta, jolloin Pyhän Egidiuksen basilika oli jo rakennettu; vuonna 1376 '
      + 'kaupunki sai kuninkaallisen kaupungin aseman. Vahvasti linnoitettu kaupunki oli '
      + '1300-luvulla Puolan-kaupan keskus, ja yli 50 kiltaa hallitsi sen vilkasta taloutta. '
      + 'Lokakuussa 1410 Bardejovin taistelussa Puolan kuningas Władysław II Jagiełło voitti '
      + 'Unkarin ja Kroatian kuninkaan Sigismundin.',
    lahde: 'en-Wikipedia "Bardejov", johdanto-osa ja osiot "Etymology" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-nitra',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-nitra-73e06bc1.jpg',
      lyhyt: 'Pyhän Emmeramin tuomiokirkko ja linnamuurit Nitrassa.',
      selite: 'Valkoinen kellotorni ja kirkon vanhempi kuorirakennus kohoavat kivisten linnamuurien takana Nitran linnavuorella.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nitra_-_St._Emmeram\'s_Cathedral.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-nitra-727dd588.jpg',
        lyhyt: 'Nitran linna kohoaa metsäisellä kukkulalla.',
        selite: 'Yleiskuva linnasta pellon takaa katsottuna: torni ja punakattoiset rakennukset näkyvät vehreän rinteen yläpuolella.',
        lahde: 'Valokuva: Xmetov, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Xmetov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nitriansky_hrad.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-nitra-99a9d9a5.jpg',
        lyhyt: 'Nitran vanha kaupungintalo.',
        selite: 'Laaja, kaksikerroksinen rakennus, jonka katolla on kolme tummaa kupolitornia. Sen edessä on kivetty aukio.',
        lahde: 'Valokuva: Ladislav Luppa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ladislav Luppa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nitra_-_Old_City_Hall.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Nitra',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä vuoren juurella Nitra sijaitsee?',
      'Minkä ruhtinaskunnan keskus Nitra oli?',
    ],
    korostukset: ['ruhtinaskunta|ruhtinaskunnan'],
    nappi: 'Nyitra: Slovakian vanhimpia kaupunkeja Zobor-vuoren juurella',
    // 18.08638889 E / 48.30694444 N — en-Wikipedia "Nitra"
    laudat: {
      maailmankartta: { x: 6436.2, y: 1463.1 },
      europe: { x: 558.5, y: 623.1 },
    },
    teksti: 'Nitra, unkariksi Nyitra, on Lounais-Slovakian kaupunki Zobor-vuoren juurella '
      + 'Nitra-joen laaksossa noin 90 kilometriä Bratislavasta koilliseen; asukkaita on noin '
      + '78 000. Se on yksi Slovakian vanhimmista kaupungeista ja oli historiallisesti '
      + 'merkittävän Nitran ruhtinaskunnan keskus; ensimmäinen maininta on 800-luvulta. '
      + 'Kaupunki on Slovakian maatalouden pääkaupunki pitkän viljelyperinteensä, edullisen '
      + 'ilmastonsa ja maantieteellisen sijaintinsa ansiosta. Nähtävyyksiin kuuluvat Nitran '
      + 'linna, vanhakaupunki ja Zobor-kukkula sekä linnan Pyhän Emmeramin tuomiokirkko; '
      + 'kaupungin vanhin kirkko, Pyhän Tapanin kirkko, on rakennettu 1000–1100-luvulla, '
      + 'vaikka sen perusta on 800-luvulta.',
    lahde: 'en-Wikipedia "Nitra", johdanto-osa ja osio "Main sights" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-trnava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trnava-81b7ca4b.jpg',
      lyhyt: 'Trnavan Pyhän Nikolauksen kirkko ja sen kaksi tummakupolista tornia.',
      selite: 'Goottilaisen kirkon kuori tukipilareineen kohoaa sinistä taivasta vasten, ja tornien tummat kupolit erottuvat vaaleasta julkisivusta.',
      lahde: 'Valokuva: Juraj76, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Juraj76',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bazilika_sv._Mikul%C3%A1%C5%A1a_v_Trnave_3.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trnava-4b0bb7d4.jpg',
        lyhyt: 'Trnavan Johannes Kastajan katedraalin kaksitorninen barokkijulkisivu.',
        selite: 'Katedraalin pääjulkisivu kaartuu kahden kellotornin väliin. Julkisivun latinankielinen kirjoitus ja kellotaulut näkyvät selvästi.',
        lahde: 'Valokuva: Kiwiev, Wikimedia Commons (CC0).',
        tekija: 'Kiwiev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cathedral_of_St._John_the_Baptist,_Trnava,_Slovakia.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-trnava-fdcc7f73.jpg',
        lyhyt: 'Tiilinen kaupunginmuuri Trnavan vanhankaupungin ympärillä.',
        selite: 'Muuri kiertää Trnavan historiallista keskustaa, ja se on rakennettu 1200- ja 1300-lukujen välillä. Kuvassa näkyy muurin pitkä tiilipinta ja sen edessä kulkeva kivetty polku.',
        lahde: 'Valokuva: Kiwiev, Wikimedia Commons (CC0).',
        tekija: 'Kiwiev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:City_wall,_Trnava,_Slovakia.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Trnava',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä lempinimellä Trnavaa kutsutaan monien kirkkojensa vuoksi?',
      'Minä vuosina Trnavan jesuiittayliopisto toimi?',
    ],
    korostukset: ['Pieni Rooma|Pieneksi Roomaksi'],
    nappi: 'Nagyszombat: Pieni Rooma, joka on kuuluisa kirkoistaan ja entisestä yliopistostaan',
    // 17.58833333 E / 48.3775 N — en-Wikipedia "Trnava"
    laudat: {
      maailmankartta: { x: 6419.6, y: 1460.1 },
      europe: { x: 548.9, y: 621.3 },
    },
    teksti: 'Trnava, unkariksi Nagyszombat ja saksaksi Tyrnau, on Länsi-Slovakian kaupunki 47 '
      + 'kilometriä Bratislavasta koilliseen Trnávka-joen varrella. Se on roomalaiskatolisen '
      + 'arkkipiispan istuin (1541–1820 ja uudelleen vuodesta 1977), ja monien muurien '
      + 'sisällä olevien kirkkojensa vuoksi sitä on kutsuttu Pieneksi Roomaksi eli Slovakian '
      + 'Roomaksi. Vuonna 1238 Trnavasta tuli ensimmäinen nykyisen Slovakian alueen kaupunki, '
      + 'jolle kuningas myönsi kaupunkioikeudet. Arkkipiispa Péter Pázmány perusti Trnavaan '
      + 'jesuiittayliopiston (1635–1777), joka oli tuolloin Unkarin kuningaskunnan ainoa '
      + 'yliopisto ja josta tuli slovakialaisen sivistyksen ja kirjallisuuden keskus; '
      + '1700-luvun lopulta kaupungista tuli myös slovakialaisen kansallisen herätyksen '
      + 'keskus.',
    lahde: 'en-Wikipedia "Trnava", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Trnava sai ensimmäisenä nykyisen Slovakian kaupunkina kaupunkioikeudet?',
      vaihtoehdot: [
        '1138',
        '1238',
        '1338',
        '1438',
      ],
      oikea: 1,
      fakta: 'Trnavan jesuiittayliopisto toimi vuosina 1635–1777.',
    },
  },
  {
    id: 'hahmotelma-zvolen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-zvolen-34bf8223.jpg',
      lyhyt: 'Zvolenin linna ylhäältä nähtynä, kulmatorneineen ja rintavarustuksineen.',
      selite: 'Nelikulmainen linna kohoaa kaupungin talojen keskellä. Kuvakulma on ylhäältä, joten linnan kulmatornit ja hammastettu ylälinja näkyvät hyvin.',
      lahde: 'Valokuva: Martinlv, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martinlv',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zvolen_z%C3%A1mok.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-zvolen-92a58c78.jpg',
        lyhyt: 'Zvolenin linnan pihakuja, jossa on veistoksia.',
        selite: 'Kivetty pihakuja kulkee linnan seinän ja vanhan kivimuurin välissä. Pihalla on veistoksia.',
        lahde: 'Valokuva: Ladislav Luppa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ladislav Luppa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zvolensk%C3%BD_z%C3%A1mok_-_n%C3%A1dvorie_-1a.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zvolenin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Zvolenin linnan metsästysasunnokseen?',
      'Mikä on Pustý hrad?',
    ],
    korostukset: ['Ludvig|Ludvig Suuri'],
    nappi: 'Zólyomin linna: Ludvig Suuren metsästyslinna, jonka kappeli on rakennettu barokkiin vuonna 1784',
    // 19.12722222 E / 48.57305556 N — en-Wikipedia "Zvolen Castle"
    laudat: {
      maailmankartta: { x: 6470.9, y: 1451.8 },
      europe: { x: 578.4, y: 616.1 },
    },
    teksti: 'Zvolenin linna on keskiaikainen linna Zvolenin keskustan lähellä olevalla kukkulalla '
      + 'Keski-Slovakiassa. Alueen alkuperäinen keskus oli Slatina- ja Hron-jokien '
      + 'yhtymäkohdan yläpuolella kalliolla 1100-luvun linnassa, jota nykyään kutsutaan '
      + 'nimellä Pustý hrad eli autio linna; vaikean saavutettavuutensa vuoksi hallintokeskus '
      + 'siirrettiin uudelle linnalle, jonka Ludvig Suuri rakennutti metsästysasunnokseen. '
      + 'Gotiikkaa, jonka esikuvana olivat 1300-luvun italialaiset linnat, rakennettiin '
      + 'vuosina 1360–1382, ja tuleva kuningatar Maria Anjoulainen ja keisari Sigismund '
      + 'viettivät siellä häänsä vuonna 1385; renessanssiuudistus tehtiin 1548 ja viimeinen '
      + 'suuri uudistus vuonna 1784, jolloin kappeli muutettiin barokkityyliseksi. Nykyään '
      + 'linnassa on Slovakian kansallisgallerian alueosasto, jossa on vanhojen '
      + 'eurooppalaisten mestarien teoksia, muun muassa Rubensilta ja Veronesen.',
    lahde: 'en-Wikipedia "Zvolen Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-smolenice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-smolenice-bb92b6c7.jpg',
      lyhyt: 'Smolenicen linna kohoaa metsäisen rinteen yllä.',
      selite: 'Linnan punertavat katot ja korkea pyöreä torni nousevat puiden takaa vihreän niityn yllä.',
      lahde: 'Valokuva: Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ingo Mehling',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smolenice_Castle.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-smolenice-c9dcb4d9.jpg',
        lyhyt: 'Smolenicen linnan tornillinen portti ja hammastettu muuri.',
        selite: 'Harmaasta kivestä rakennettu portti on suippokaarinen, ja sen yllä on hammastettu harjanne. Portin edessä on kaksi vaakunakilpiä pitelevää kiviveistosta.',
        lahde: 'Valokuva: Draceane, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Draceane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smolenice,_2021_(01).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Smolenicen linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna kreivi János Pálffy peri Smolenicen?',
      'Minkä linnan mallin mukaan uusi linna rakennettiin?',
    ],
    korostukset: ['Kreuzenstein|Kreuzensteinin'],
    nappi: 'Pálffyjen raunioitunut linna Pienten Karpaattien rinteellä',
    // 17.43222222 E / 48.51361111 N — en-Wikipedia "Smolenice Castle"
    laudat: {
      maailmankartta: { x: 6414.4, y: 1454.3 },
      europe: { x: 545.9, y: 617.7 },
    },
    teksti: 'Smolenicen linna on linna Pienten Karpaattien itärinteellä Smolenicen kaupungin '
      + 'lähellä Slovakiassa. Se rakennettiin 1400-luvulla, mutta se tuhoutui Rákóczin '
      + 'vapaussodan ja Napoleonin sotien aikana. Vuonna 1777 kreivi János Pálffy peri '
      + 'Smolenicen, mutta ei asunut linnassa sen huonon kunnon ja rahapulan vuoksi. Linna '
      + 'rakennettiin uudelleen vasta 1900-luvulla kreivi József Pálffyn käskystä; arkkitehti '
      + 'Jozef Hubert suunnitteli uuden linnan Wienin lähellä olevan Kreuzensteinin linnan '
      + 'mallin mukaan, ja päärakennus on tehty raudoitetusta betonista. Vuodesta 1953 linna '
      + 'on ollut Slovakian tiedeakatemian omaisuutta, ja nykyään se toimii '
      + 'kongressikeskuksena.',
    lahde: 'en-Wikipedia "Smolenice Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-stara-lubovna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-stara-lubovna-e9727c49.jpg',
      lyhyt: 'Ľubovňan linna kohoaa metsän yllä ja etualalla on hirsirakennuksia.',
      selite: 'Kiviseen linnaan kuuluu pyöreä torni ja muureja. Etualan hirsirakennukset kuuluvat linnan alla olevaan ulkoilmamuseoon (Skanzen).',
      lahde: 'Valokuva: Miro Svorc, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Miro Svorc',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stara_Lubovna_castle_ID_710-9750.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-stara-lubovna-6b3a2df9.jpg',
        lyhyt: 'Ľubovňan linnan tornit ja muurit metsäisen kukkulan päällä.',
        selite: 'Osittain rauniona oleva linna näkyy kaukaa peltojen takaa. Vasemmalla erottuu pyöreä torni ja oikealla neliömäinen tornirakennus.',
        lahde: 'Valokuva: Jerzy Opioła, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jerzy Opioła',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C4%BDubov%C5%88a_Castle_S1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-stara-lubovna-60923d55.jpg',
        lyhyt: 'Ulkoilmamuseon hirsitalo sinisellä alakerralla Stará Ľubovňassa.',
        selite: 'Talon yläosa on tummaa hirttä ja alakerta sinistä kalkittua kiveä. Kuvassa näkyy myös aita ja pienempiä hirsirakennuksia.',
        lahde: 'Valokuva: Peter ivancik, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Peter ivancik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skanzen_Star%C3%A1_%C4%BDubov%C5%88a_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Stará Ľubovňa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna Ľubovňan linna mainitaan ensi kerran?',
      'Minä vuonna Spišin kaupunkien pantti päättyi?',
    ],
    korostukset: ['panttaus|panttaus'],
    nappi: 'Ľubovňan linna Puolan rajalla; Spišin kaupungit on pantattu Puolalle vuodesta 1412 ja palautuivat Unkarille vasta 1772',
    // 20.68 E / 49.31 N — en-Wikipedia "Stará Ľubovňa"
    laudat: {
      maailmankartta: { x: 6522.7, y: 1420.1 },
      europe: { x: 608.3, y: 596.7 },
    },
    teksti: 'Stará Ľubovňa on noin 16 000 asukkaan kaupunki Koillis-Slovakiassa Poprad-joen '
      + 'varrella 15 kilometriä Puolan rajalta ja 30 kilometriä Korkeista Tatroista itään. Se '
      + 'on yksi Spišin vanhimmista kaupungeista; ensimmäinen maininta on vuodelta 1292, '
      + 'linna mainitaan vuonna 1311, ja Ludvig Suuri myönsi asutukselle kaupunkioikeudet '
      + 'vuonna 1342. Vuonna 1412 Sigismund Luxemburgilainen antoi Ľubovňan ja 15 muuta '
      + 'Spišin kaupunkia pantiksi Puolan kuninkaalle Władysław II:lle; panttaus, jonka piti '
      + 'kestää vain lyhyen aikaa, kesti lopulta 360 vuotta ja päättyi vasta vuoden 1772 '
      + 'Puolan ensimmäisen jaon yhteydessä. Panttaus oli itse asiassa kaupungeille eduksi, '
      + 'koska ne eivät joutuneet alistumaan komitaatille tai aatelistolle ja olivat '
      + 'neutraalissa asemassa Puolan ja Unkarin välisissä levottomuuksissa.',
    lahde: 'en-Wikipedia "Stará Ľubovňa", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuinka kauan Spišin kaupungit olivat Puolan hallussa pantteina?',
      vaihtoehdot: [
        '60 vuotta',
        '360 vuotta',
        '160 vuotta',
        '560 vuotta',
      ],
      oikea: 1,
      fakta: 'Pantti päättyi vasta vuoden 1772 Puolan ensimmäisen jaon yhteydessä.',
    },
  },
  {
    id: 'hahmotelma-vlkolinec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-vlkolinec-45492650.jpg',
      lyhyt: 'Vlkolínecin puutalokylän kattoja ylhäältä katsottuna.',
      selite: 'Kylän tiiviisti sijoitetut talot ja niiden pärekatot näkyvät rinteen yläpuolelta. Kylä kuuluu Unescon maailmanperintöön.',
      lahde: 'Valokuva: Mineralysk, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mineralysk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vlkol%C3%ADnec_2020_4b.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-vlkolinec-4f8b3af8.jpg',
        lyhyt: 'Keltainen hirsitalo Vlkolínecin kylässä.',
        selite: 'Tumma pärekatto ja keltaiseksi maalattu seinä ovat tyypillistä kylän rakennuskantaa. Vlkolínec kuuluu Unescon maailmanperintöön vuodesta 1993.',
        lahde: 'Valokuva: Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pudelek (Marcin Szala)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vlkol%C3%ADnec_-_houses.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-vlkolinec-30acc487.jpg',
        lyhyt: 'Vlkolínecin talot ja pärekatot niityn ympäröimänä.',
        selite: 'Rinteen matalat talot ja pärekatot erottuvat niityn keskellä. Etualalla kulkee tie ja taustalla näkyy lisää taloja.',
        lahde: 'Valokuva: Mineralysk, Wikimedia Commons (CC0).',
        tekija: 'Mineralysk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vlkol%C3%ADnec_jar_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Vlkolínec',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä sanasta kylän nimen arvellaan tulevan?',
      'Kuinka monta hirsitaloa kylässä on?',
    ],
    korostukset: ['hirsitalo|hirsitaloa'],
    nappi: 'Ružomberokin vuoristokylä, jonka liitetään kaupunkiin vuonna 1882',
    // 19.275 E / 49.04166667 N — en-Wikipedia "Vlkolínec"
    laudat: {
      maailmankartta: { x: 6475.8, y: 1431.7 },
      europe: { x: 581.3, y: 603.8 },
    },
    teksti: 'Vlkolínec on Ružomberokin kaupungin hallintoon kuuluva kylä Slovakiassa, vaikka se '
      + 'oli historiallisesti erillinen kylä. Ensimmäinen kirjallinen maininta on vuodelta '
      + '1376, ja vuoden 1882 jälkeen siitä tuli osa Ružomberokia; nimi tulee luultavasti '
      + 'sanasta vlk eli susi. Kylä on ollut Unescon maailmanperintökohde vuodesta 1993 ja on '
      + 'yksi Slovakian kymmenestä kansanrakennuskohteesta, koska se on koskematon ja '
      + 'monipuolinen esimerkki Pohjoisten Karpaattien kansanomaisesta '
      + 'maalaisarkkitehtuurista. Kylässä on yli 45 hirsitaloa, joissa kussakin on kaksi tai '
      + 'kolme huonetta, sekä 1700-luvun puinen kellotorni ja barokkikappeli; talot 16 ja 17 '
      + 'on muutettu kansanmuseoksi.',
    lahde: 'en-Wikipedia "Vlkolínec", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cicmany',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-cicmany-b30779ed.jpg',
      lyhyt: 'Koristemaalattuja hirsitaloja Čičmanyn kylän kadun varrella.',
      selite: 'Čičmanyn kylän tummiin hirsiseiniin on maalattu valkoisia ornamentteja. Etualalla on kaksikerroksinen talo parvekkeineen ja sen vieressä toinen maalattu talo.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Čičmany_-_wooden_houses.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-cicmany-33991f7e.jpg',
        lyhyt: 'Valkoisia ja keltaisia kuvioita Čičmanyn hirsitalon seinässä.',
        selite: 'Lähikuva maalatun talon pitkästä seinästä: pyörteisiä, siksak- ja kasvikuvioita mustaksi tummuneessa hirressä. Taustalla näkyy toinen koristeltu talo.',
        lahde: 'Valokuva: 10ricardo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: '10ricardo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cicmany_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Čičmany',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä slovakian sana čičman tarkoittaa?',
      'Minä vuonna kylä kunnostettiin suuren tulipalon jälkeen?',
    ],
    korostukset: ['valkoinen|valkoiset'],
    nappi: 'Lampaankasvattajien kylä, jonka koristemaalatut puutalot ovat vielä koskemattomia; tulipalo tuhoaa osan vasta 1921',
    // 18.51611111 E / 48.955 N — en-Wikipedia "Čičmany"
    laudat: {
      maailmankartta: { x: 6450.5, y: 1435.4 },
      europe: { x: 566.7, y: 606.1 },
    },
    teksti: 'Čičmany on kylä ja kunta Žilinan läänissä Pohjois-Slovakiassa, ja sen '
      + 'kansanarkkitehtuurialue perustettiin vuonna 1977. Nimi tulee slovakian sanasta '
      + 'čičman, joka tarkoittaa melua pitävää puunkaatajaa. Ensimmäinen säilynyt maininta '
      + 'kylästä on vuodelta 1272, ja vielä 1900-luvun puoliväliin asti kylä oli '
      + 'lampaankasvatuksen keskus. Vuoden 1921 suuren tulipalon jälkeen kylä kunnostettiin '
      + 'alkuperäiseen asuunsa valtion runsaiden avustusten turvin. Kylässä on säilynyt '
      + 'puisia taloja, joissa on harjakatot, parvekkeet ja piikikkäät tai suorat '
      + 'seinäkoristeet; erityisen kiinnostavia ovat talojen ulkoseiniin maalatut valkoiset '
      + 'kuviot.',
    lahde: 'en-Wikipedia "Čičmany", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-terchova',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-terchova-dfee2586.jpg',
      lyhyt: 'Terchovan kylä kirkkoineen vuorten ympäröimässä laaksossa.',
      selite: 'Näkymä Terchovské srdce -näkötornista kylän ylle: talot ja kirkontorni laakson pohjalla, taustalla metsäiset Malá Fatran vuoret.',
      lahde: 'Valokuva: young shanahan, Wikimedia Commons (CC BY 2.0).',
      tekija: 'young shanahan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Terchová_2020-07-01.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-terchova-6f3c192e.jpg',
        lyhyt: 'Jánošíkin muistomerkin metallipatsas kohoaa kukkulan päällä sinistä taivasta vasten.',
        selite: 'Terchovan kylän yläpuolella kukkulalla seisova, kulmikkaista metallilevyistä muotoiltu Jánošík-patsas korkealla jalustallaan.',
        lahde: 'Valokuva: Schliemann, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Schliemann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Janošik_Statue,_Terchová.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Terchová',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka on Terchován kuuluisin poika?',
      'Minä vuonna Terchován musiikki merkittiin Unescon luetteloon?',
    ],
    korostukset: ['Jánošík|Jánošíkin'],
    nappi: 'Malá Fatran laaksokylä, jossa Jánošík on kasvanut; siirtolaisuus Amerikkaan lisääntyy',
    // 19.03 E / 49.27 N — en-Wikipedia "Terchová"
    laudat: {
      maailmankartta: { x: 6467.7, y: 1421.8 },
      europe: { x: 576.6, y: 597.8 },
    },
    teksti: 'Terchová on suuri kylä ja kunta (4 073 asukasta) Malá Fatran vuorilla Žilinan '
      + 'alueella Pohjois-Slovakiassa, noin 25 kilometriä Žilinasta itään. Kylä perustettiin '
      + 'vuonna 1580, mutta seutu oli asuttu jo aiemmin; alun perin se oli valakkien asutus, '
      + 'joka muuttui vähitellen maanviljelysasutukseksi. Kylä on kuuluisin siitä, että se on '
      + 'Juraj Jánošíkin, jota kutsutaan slovakialaiseksi Robin Hoodiksi, syntymäpaikka ja '
      + 'kasvupaikka. 1800-luvulla useat kuivuudet ja taudit autioittivat kylää, kun monet '
      + 'muuttivat Yhdysvaltoihin, Kanadaan ja Argentiinaan. Terchován musiikki on merkitty '
      + 'Unescon aineettoman kulttuuriperinnön luetteloon vuonna 2013.',
    lahde: 'en-Wikipedia "Terchová", johdanto-osa ja osiot "History" ja "Notable births" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-liptovsky-mikulas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-liptovsky-mikulas-8958d557.jpg',
      lyhyt: 'Liptovský Mikulášin Pyhän Nikolauksen kirkko sipulikupolitorneineen.',
      selite: 'Gotiikan piirteitä säilyttänyt kirkko kaupungin keskustassa: kuparikattoinen kuoriosa, korkea torni ja aukion laattakivetys. Kirkon vieressä on kivinen pyhimyspatsas.',
      lahde: 'Valokuva: Paweł Kuźniar (Jojo_1, Jojo), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Paweł Kuźniar (Jojo_1, Jojo)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Liptovsky_Mikulas_04.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-liptovsky-mikulas-92613cf8.jpg',
        lyhyt: 'Museorakennus Liptovský Mikulášin keskustassa kaarikäytävineen.',
        selite: 'Koristeellisin vaaleaharmain julkisivuin ja kaariaukkoin varustettu talo, jossa on museokyltti (Múzeum Janka Kráľa) ja jonka edessä on kivetty katu.',
        lahde: 'Valokuva: SchiDD, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'SchiDD',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SK-Liptovsky_Mikulas-Museum.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Liptovský Mikuláš',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna ensimmäinen slovakialainen teatteri perustettiin Liptovský Mikulášiin?',
      'Kuka julkaisi täällä vuonna 1848 Slovakian kansan vaatimukset?',
    ],
    korostukset: ['kilta|kiltoja'],
    nappi: 'Liptószentmiklós: Liptovin kiltakaupunki ja slovakialaisen kansallisen liikkeen keskus',
    // 19.6 E / 49.08 N — en-Wikipedia "Liptovský Mikuláš"
    laudat: {
      maailmankartta: { x: 6486.7, y: 1430 },
      europe: { x: 587.5, y: 602.8 },
    },
    teksti: 'Liptovský Mikuláš on kaupunki Pohjois-Slovakiassa Váh-joen varrella Liptovin '
      + 'altaassa Matalien Tatrojen ja Tatrojen lähellä; se tunnetaan kiltojen ja kulttuurin '
      + 'kaupunkina. Kaupunki mainitaan ensi kerran kuningas Ladislaus IV:n asiakirjassa '
      + 'vuonna 1286, ja Pyhän Nikolauksen kirkko vuodelta 1299 on sen vanhin rakennus. '
      + 'Käsityöläiset perustivat kiltoja, joista vanhin oli suutarien kilta vuonna 1508, ja '
      + 'vuonna 1677 kaupungista tuli Liptovin komitaatin hallintokeskus. Legendaarinen '
      + 'slovakialainen Robin Hood, Juraj Jánošík, tuomittiin ja teloitettiin täällä vuonna '
      + '1713. 1800-luvulla kaupunki oli yksi slovakialaisen kansallisen liikkeen '
      + 'keskuksista: ensimmäinen slovakialainen teatteri perustettiin siellä vuonna 1830, ja '
      + 'Ľudovít Štúr julkaisi täällä vuonna 1848 asiakirjan Slovakian kansan vaatimukset.',
    lahde: 'en-Wikipedia "Liptovský Mikuláš", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-piestany',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-piestany-f72399f7.jpg',
      lyhyt: 'Kolonádový most ylittää Váh-joen Piešťanyssa.',
      selite: 'Váh-joen yli kulkeva katettu kylpyläsilta, Kolonádový most, joka yhdistää kaupungin ja Kylpyläsaaren. Etualalla on joen rantaniittyä, taustalla kaupungin rakennuksia.',
      lahde: 'Valokuva: Bjalek Michal, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bjalek Michal',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Most_kolonadovy.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-piestany-6c8e766b.jpg',
        lyhyt: 'Thermia Palace -kylpylähotellin julkisivu Piešťanyn Kylpyläsaarella.',
        selite: 'Keltainen, punakattoinen kylpylähotelli, jonka pääsisäänkäynnin yläpuolella lukee Thermia Palace. Rakennus on Piešťanyn kylpyläsaaren tunnetuimpia.',
        lahde: 'Valokuva: MOs810, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'MOs810',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Therma_Palace_Piestany.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Piešťany',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä suvun omistuksessa kylpylä oli vuoteen 1940?',
      'Mistä kylpylä käyttää parantavaa mutaa?',
    ],
    korostukset: ['kylpylä|kylpyläkaupunki'],
    nappi: 'Pöstyén: Erdődyjen kylpyläkaupunki, jossa Napoleon-kylpylä on toiminut vuodesta 1820',
    // 17.83 E / 48.58 N — en-Wikipedia "Piešťany"
    laudat: {
      maailmankartta: { x: 6427.7, y: 1451.5 },
      europe: { x: 553.5, y: 615.9 },
    },
    teksti: 'Piešťany, unkariksi Pöstyén ja saksaksi Pistyan, on Länsi-Slovakian kylpyläkaupunki, '
      + 'Slovakian suurin ja tunnetuin, ja siellä on noin 28 000 asukasta. Lämpölähteet, '
      + 'jotka eivät jäätyneet talvella, houkuttelivat ihmisiä alueelle jo esihistoriallisina '
      + 'aikoina, ja läheisestä Moravanyn kylästä on löydetty mammutinhampaasta tehty '
      + 'hedelmällisyyttä esittävä Moravanyn Venus. Parantavat lähteet olivat suosittuja jo '
      + 'keskiajalla, ja niissä vieraili muun muassa kuningas Matthias Corvinus. Erdődyn suku '
      + 'omisti alueen vuosina 1720–1848 ja kylpylän vuoteen 1940; se rakensi ensimmäiset '
      + 'kylpylärakennukset vuonna 1778, ja vuonna 1820 ne laajennettiin uusklassiseen '
      + 'tyyliin nimellä Napoleon-kylpylä. Kylpylä käyttää sulfaatti-karbonaattivettä ja joen '
      + 'sivu-uomasta louhittua rikkipitoista mutaa, ja sen vieraisiin on kuulunut Ludwig van '
      + 'Beethoven.',
    lahde: 'en-Wikipedia "Piešťany", johdanto-osa ja osiot "History" ja "Spa" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Piešťanyn ensimmäiset kylpylärakennukset rakennettiin?',
      vaihtoehdot: [
        '1678',
        '1728',
        '1778',
        '1828',
      ],
      oikea: 2,
      fakta: 'Kylpylän kuuluisiin vieraisiin kuului Ludwig van Beethoven.',
    },
  },
  {
    id: 'hahmotelma-skalica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-skalica-3b546c7b.jpg',
      lyhyt: 'Skalican Pyhän Yrjön rotunda, pyöreä kivitorni punaisine tiilikupoleineen.',
      selite: 'Romaaninen kivirotunda seisoo nurmikkokummun päällä; kartiomaista kattoa peittää punainen tiilikatto ja seinässä on goottilainen ikkuna sekä soikea pyöreä ikkuna.',
      lahde: 'Valokuva: Pe3kZA, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pe3kZA',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skalica_rotunda.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-skalica-00d7ec45.jpg',
        lyhyt: 'Skalican kirkko ja kivetty Vapauden aukio (Námestie slobody).',
        selite: 'Aukion laidalla kohoaa vaalea kirkko punakattoineen ja kelloineen varustettuine torneineen. Sen vieressä on pieni pyöreä kappeli, vasemmalla vanha lehmus ja oikealla aukion matalia taloja.',
        lahde: 'Valokuva: LadislavMiko, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'LadislavMiko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kostol_namestie_skalica.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Skalica',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä muotoisen aukion ympärille Skalican asutus kehittyi?',
      'Mikä on Skalican romaaninen rotunda?',
    ],
    korostukset: ['trdelník|trdelník'],
    nappi: 'Szakolca: Záhorien kaupunki kolmion muotoisen aukion ympärillä lähellä Määrin rajaa',
    // 17.23 E / 48.84 N — en-Wikipedia "Skalica"
    laudat: {
      maailmankartta: { x: 6407.7, y: 1440.3 },
      europe: { x: 542, y: 609.1 },
    },
    teksti: 'Skalica, unkariksi Szakolca, on Skalican piirin suurin kaupunki Länsi-Slovakian '
      + 'Záhorien alueella lähellä Tšekin rajaa; asukkaita on noin 15 000. Asutus kehittyi '
      + 'kolmion muotoisen aukion ympärille, mikä oli keskiajalla harvinaista, ja kuningas '
      + 'Ludvig I myönsi kaupunkioikeudet vuonna 1372. Kaupungissa tehdään suosittua '
      + 'trdelník-leivonnaista, jota myydään nykyään kaikkialla Slovakiassa ja Tšekissä ja '
      + 'jonka alkuperä on Transilvaniassa; leivonnainen on epätavallisen muotoinen, '
      + 'hellanpiipun näköinen. Yksi Slovakian vanhimmista rakennuksista on Skalican '
      + 'romaaninen Pyhän Yrjön rotunda, joka on rakennettu viimeistään 1100-luvulla ja johon '
      + 'lisättiin barokkikupoli 1600-luvulla.',
    lahde: 'en-Wikipedia "Skalica", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mistä trdelník-leivonnaisen alkuperä on?',
      vaihtoehdot: [
        'Wienin seutu',
        'Prahan seutu',
        'Budapestin seutu',
        'Transilvania',
      ],
      oikea: 3,
      fakta: 'Skalican romaaninen Pyhän Yrjön rotunda on rakennettu viimeistään 1100-luvulla.',
    },
  },
  {
    id: 'hahmotelma-topolcianky',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-topolcianky-30d23603.jpg',
      lyhyt: 'Topoľčiankyn valkoinen linna näkyy puiston puiden takaa.',
      selite: 'Näkymä puistosta linnaan: valkoinen, uusklassinen julkisivu, pylväät ja vihreä kupoli. Etäällä nurmikolla on muutama puistossa kävelevä ihminen.',
      lahde: 'Valokuva: Peter ivancik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Peter ivancik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zámok_Topoľčianky_pohľad_z_parku.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-topolcianky-9273fac4.jpg',
        lyhyt: 'Topoľčiankyn linnan sisäpiha kaarikäytävineen ja punaisine kattoineen.',
        selite: 'Valkoisen linnan sisäpihaa ympäröivät kaarikäytävät ja parvekkeet, joiden yllä on oranssinpunainen tiilikatto ja korkeita savupiippuja. Pihalla on nurmikko ja pyöreiksi leikattuja pensaita.',
        lahde: 'Valokuva: Jana vargova, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jana vargova',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zámok_v_Topoľčiankach.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Topoľčianky',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä eläintä varten Topoľčiankyssa on suojelualue?',
      'Kuka Tšekkoslovakian presidentti lomaili linnassa 1923–1933?',
    ],
    korostukset: ['visentti|visentin'],
    nappi: 'Topoľčiankyn renessanssilinna, jonka eteläsiipi on uusittu uusklassiseen tyyliin 1800-luvun alussa',
    // 18.42 E / 48.42 N — en-Wikipedia "Topoľčianky"
    laudat: {
      maailmankartta: { x: 6447.3, y: 1458.3 },
      europe: { x: 564.9, y: 620.2 },
    },
    teksti: 'Topoľčianky on kylä ja kunta Zlaté Moravcen piirissä Länsi-Keski-Slovakiassa; sen '
      + 'ensimmäinen maininta on vuodelta 1293. Kylässä on ainutlaatuinen euroopanbiisonin '
      + 'eli visentin suojelualue: 1930-luvulle mennessä visenttejä oli jäljellä vain pieni '
      + 'joukko Puolassa, vuonna 1958 perustetulla alueella oli 150 eläintä, ja vuonna 2004 '
      + 'pieniä ryhmiä alettiin vapauttaa Poloninyn kansallispuistoon. Kylässä on myös '
      + 'renessanssilinna, jossa Tšekkoslovakian ensimmäinen presidentti Tomáš Garrigue '
      + 'Masaryk lomaili joka kesä vuosina 1923–1933. Linnan eteläsiipi, joka uusittiin '
      + '1800-luvun alussa, on Slovakian puhtain esimerkki uusklassisesta arkkitehtuurista, '
      + 'ja sitä ympäröi vaikuttava maisemapuutarha.',
    lahde: 'en-Wikipedia "Topoľčianky", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-martin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-martin-c52bf975.jpg',
      lyhyt: 'Matica slovenskán toinen rakennus Martinissa, edessä hoidettu aukio ja patsas.',
      selite: 'Vaaleanpunertava, pylväin koristeltu rakennus, jonka julkisivussa lukee Matica slovenská. Sisäänkäynnin edessä on patsas kivetyn aukion ja leikattujen pensasaitojen keskellä.',
      lahde: 'Valokuva: Matica slovenská, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Matica slovenská',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Druhá_budova_Matice_slovenskej_v_Martine_(aktuálna_fotografia).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/svk-nosto-martin-985e8087.jpg',
        lyhyt: 'Vanha mustavalkoinen valokuva Matica slovenskán ensimmäisestä rakennuksesta Martinissa.',
        selite: 'Ennen vuotta 1900 otetussa valokuvassa on koristeellinen kaksikerroksinen talo, jonka edessä on hevoskärryt ja pari pientä hahmoa hiekkaisella kadulla. Kyseessä on Matican ensimmäinen rakennus, joka rakennettiin keräysvaroin.',
        lahde: 'Kuva: tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prvá_budova_Matice_slovenskej.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Martin',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna Martinin ensimmäiset kirjapainot perustettiin?',
      'Minkä kahden vuoriston välissä Martin sijaitsee?',
    ],
    korostukset: ['Matica|Matica slovenská'],
    nappi: 'Turócszentmárton: slovakialaisen sivistyksen keskus, jossa Matica slovenská toimii',
    // 18.92194444 E / 49.065 N — en-Wikipedia "Martin, Slovakia"
    laudat: {
      maailmankartta: { x: 6464.1, y: 1430.6 },
      europe: { x: 574.5, y: 603.2 },
    },
    teksti: 'Martin on Pohjois-Slovakian kaupunki Turiec-joen varrella Malá Fatran ja Veľká '
      + 'Fatran vuorten välissä lähellä Žilinaa; asukkaita on noin 54 000. Ensimmäinen '
      + 'maininta on vuodelta 1284 nimellä Vila Sancti Martini, ja 1700-luvulla siitä tuli '
      + 'Turócin komitaatin keskus. 1800-luvulla kaupungista tuli slovakialaisen kulttuurin '
      + 'tärkein keskus: sinne perustettiin useita kulttuurilaitoksia, muun muassa Matica '
      + 'slovenská ja Slovakian kansallismuseo, ja suurin osa slovakialaisen kansallisen '
      + 'emansipaation poliittisesta toiminnasta järjestettiin sieltä. Kaupunki teollistui '
      + 'samaan aikaan: ensimmäiset kirjapainot perustettiin vuonna 1869 ja huonekalutehdas '
      + 'Tatra nábytok vuonna 1890. Nykyään Martinissa sijaitsevat Slovakian '
      + 'kansalliskirjasto ja Matica slovenská.',
    lahde: 'en-Wikipedia "Martin, Slovakia", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
];
