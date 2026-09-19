/*
 * PUOLAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden ja Belgian jälkeen Puola.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin,
 * Kreikan, Itävallan, Alankomaiden ja Belgian pakat: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Puola on jaettu Venäjän, Preussin ja Itävallan kesken,
 * ja `nappi`-alaotsikot kertovat kohteen 1873 (Venäjän Kongressi-Puola,
 * Preussi, Galitsia). Vuoden 1873 jälkeiset kohteet (Biskupinin löytö 1933,
 * Zakopanen kylpyläkausi 1889, Łódźin tehdaskausi) ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin. Toisen
 * maailmansodan leirit eivät kuulu pakkaan.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `pol-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/pol/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupunkien (Varsova ja Krakova, Puolan pelikaupungit) ulkopuolella,
 * lähimmät nostot yli 6,9 lautayksikön päässä nykyisistä merkeistä ja
 * keskenään yli 15 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.POL:iin. Puolassa on jo 25 nostoa; Wieliczka, Malbork,
 * Jasna Góra (Częstochowa) ja Toruń ovat niiden joukossa eikä niitä toisteta. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Puolan fokuslehden
 * rajaukseen (`osuuLehteen`). Białowieża on pelin karkean maailmankartan
 * POL-renkaan ulkopuolella (2,7 lautayksikköä); Słowiński, Tarnica,
 * Dunajecin rotko, Szczeliniec ja Wolin ovat aivan renkaan reunalla
 * (≤ 2,9); niiden koordinaatit ovat Wikipedian todelliset.
 */

/** Puolan hahmotelmanostot: sisällölliset kohteet kaupunkien ulkopuolella. */
export const HAHMOTELMA_POL = [
  {
    id: 'hahmotelma-bialowieza',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-bialowieza-415b13d9.jpg',
      lyhyt: 'Valkoisina kukkivaa karhunlaukkaa Białowieżan alkumetsän pohjakasvillisuutena.',
      selite: 'Kuva on Białowieżan kansallispuiston ankaran suojelun alueelta keväältä, ja siinä karhunlaukka (Allium ursinum) peittää metsänpohjan vanhojen puiden ja saniaisten alla.',
      lahde: 'Valokuva: Bouke ten Cate, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Bouke ten Cate',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bialowieza_strikte_reservaat_-_Bielowieza_strict_reserve_-_daslook_-_ramsons_-_Allium_ursinum.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-bialowieza-437fd762.jpg',
        lyhyt: 'Visenttiemo ja vasikat laiduntavat niityllä Białowieżan metsän reunassa.',
        selite: 'Euroopan biisoni eli visentti (Bison bonasus) on Białowieżan metsän tunnetuin asukas. Kuvassa emo ja kaksi vasikkaa syönnillä metsän reunan niityllä.',
        lahde: 'Valokuva: Charles J. Sharp, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Charles J. Sharp',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:European_bison_(Bison_bonasus)_female_and_calves_Bia%C5%82owieza.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Białowieżan metsä',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Białowieżan kylään valkoisen puisen metsästyskartanon?',
      'Minkä suuren maaeläimen kanta metsässä on Euroopan suurin?',
    ],
    korostukset: ['visentti|visenttiä'],
    nappi: 'Venäjän hallitsema alkumetsä, josta tulee 1888 keisarin metsästysmaa',
    // 23.95 E / 52.75 N — en-Wikipedia "Białowieża Forest"
    laudat: {
      maailmankartta: { x: 6631.7, y: 1268.5 },
      europe: { x: 671, y: 506.3 },
    },
    teksti: 'Białowieżan metsä on laaja metsäkompleksi ja Unescon maailmanperintöalue Puolan ja '
      + 'Valko-Venäjän rajalla. Se on yksi Euroopan tasangon halki aikanaan ulottuneen '
      + 'alkumetsän viimeisistä ja suurimmista jäänteistä, ja siellä elää yli 800 visenttiä, '
      + 'Euroopan raskain maaeläin. Nimi tulee metsän keskellä olevasta Białowieżan kylästä '
      + 'ja tarkoittaa puolaksi valkoista tornia; se viittaa Władysław II Jagiellon '
      + 'rakennuttamaan valkoiseen puiseen metsästyskartanoon. Kolmannessa Puolan jaossa 1795 '
      + 'metsä joutui Venäjän hallintaan, ja vuonna 1888 se siirrettiin keisarillisen hovin '
      + 'ministeriön suoraan hallintaan, jolloin siitä tuli keisarin yksityinen metsästysalue '
      + 'palatsin, puiston, teiden ja rautatien kera.',
    lahde: 'en-Wikipedia "Białowieża Forest", johdanto-osa ja osiot "Name" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Białowieża tarkoittaa puolaksi?',
      vaihtoehdot: [
        'Suurta metsää',
        'Valkoista tornia',
        'Karhun kotia',
        'Metsänvartijan taloa',
      ],
      oikea: 1,
      fakta: 'Vuonna 1929 Puolan valtio osti neljän visentin pienen ryhmän eri eläintarhoista ja '
        + 'Länsi-Kaukasukselta.',
    },
  },
  {
    id: 'hahmotelma-biebrza',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-biebrza-57f38056.jpg',
      lyhyt: 'Biebrza-joen mutkainen lasku kevättulvan kastelemalla niityllä, rannalla kaksi puuvenettä.',
      selite: 'Kuva on otettu Biebrzan jokilaaksossa Podlasiessa. Joki virtaa tulva-aikaan laajan, suurelta osin luonnontilaisen suoalueen halki.',
      lahde: 'Valokuva: Bouke ten Cate, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Bouke ten Cate',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biebrza_river.tif',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-biebrza-f0b183f0.jpg',
        lyhyt: 'Koivujen ympäröimä suolampi ja heinätuppaita Biebrzan kansallispuistossa.',
        selite: 'Kuvassa on Biebrzan kansallispuiston suoaluetta (puolaksi bagno): lammikoita ja kasvitupsuja, joiden välissä kasvaa harvaa koivikkoa.',
        lahde: 'Valokuva: Jerzy Strzelecki, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jerzy Strzelecki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marsh_in_Biebrza_National_Park_01(js),_(Poland).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Biebrzan suot',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mitä eläimiä Biebrzan soilla elää?',
      'Mikä suo on puiston tiukimmin suojeltu osa?',
    ],
    korostukset: ['suo|suot'],
    nappi: 'Venäjän valtakunnan luoteisten soiden ja Biebrza-joen laakso, jossa pesii harvinaisia lintuja',
    // 22.6613 E / 53.4666 N — en-Wikipedia "Biebrza National Park"
    laudat: {
      maailmankartta: { x: 6588.7, y: 1236.1 },
      europe: { x: 646.3, y: 487.4 },
    },
    teksti: 'Biebrzan kansallispuisto sijaitsee Podlasien maakunnassa Koillis-Puolassa '
      + 'Biebrza-joen varrella. Se perustettiin 9. syyskuuta 1993, ja sen pinta-ala on 592 '
      + 'neliökilometriä, joten se on Puolan 23 kansallispuiston suurin; siitä noin 255 '
      + 'neliökilometriä on soita, 182 peltoja ja niittyjä ja 155 metsää. Biebrzan suot '
      + 'suojelevat laajoja, suhteellisen koskemattomia rämeitä, joissa elää harvinaisia '
      + 'kosteikkolintuja sekä hirviä ja majavia. Puisto on kirjattu Ramsar-sopimuksen '
      + 'kosteikoksi vuonna 1995, ja sen tärkein osa on tiukasti suojeltu Czerwone Bagno eli '
      + 'Punainen suo. Puiston päämaja on Osowiecin 1800-luvun linnoituksen alueella.',
    lahde: 'en-Wikipedia "Biebrza National Park", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sniardwy',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-sniardwy-bd0fb668.jpg',
      lyhyt: 'Ruovikkoa ja purjeveneitä Śniardwy-järven rannalla Masurialla.',
      selite: 'Śniardwy on Puolan suurin järvi. Kuvassa ruovikkoiset rantavedet ja kaukana avoimella vedellä purjeveneitä.',
      lahde: 'Valokuva: Matthias Bethke, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Matthias Bethke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20230812_%C5%9Aniardwy_(Spirdingsee).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-sniardwy-989db979.jpg',
        lyhyt: 'Kirkasta rantavettä, kaksi venettä ja saaria Śniardwyllä Niedźwiedzi Rógin kohdalla.',
        selite: 'Panoraamakuva Śniardwy-järven rannalta Niedźwiedzi Rógin kylästä: matalaa kirkasta vettä, kaksi ankkuroitua venettä ja kaukana saaria.',
        lahde: 'Valokuva: Lesnydzban, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Lesnydzban',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jezioro_%C5%9Aniardwy_-_Nied%C5%BAwiedzi_R%C3%B3g.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Śniardwy',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Minkä maan suurin järvi Śniardwy on?',
      'Mikä alue oli osa Saksaa, kun Śniardwy oli Preussin suurin järvi?',
    ],
    korostukset: ['Masuria|Masurian'],
    nappi: 'Itä-Preussin suurin järvi, jonka ympärillä Masuria on Saksan keisarikunnan osa',
    // 21.75 E / 53.76666667 N — en-Wikipedia "Śniardwy"
    laudat: {
      maailmankartta: { x: 6558.3, y: 1222.5 },
      europe: { x: 628.8, y: 479.5 },
    },
    teksti: 'Śniardwy on Masurian järviylängöllä Varmian-Masurian maakunnassa sijaitseva järvi. '
      + 'Sen pinta-ala on 113,8 neliökilometriä, joten se on Puolan suurin järvi; se oli myös '
      + 'Preussin ja Saksan suurin, kun Varmia-Masuria kuului Saksalle Itä-Preussin '
      + 'eteläosana. Järvi on 22,1 kilometriä pitkä, 13,4 kilometriä leveä ja enimmillään 23 '
      + 'metriä syvä, ja siinä on kahdeksan saarta. Se syntyi jäätikön vetäytyessä ja '
      + 'sulavista jäävuorista tulleiden tulvavesien valuessa pois. Järveä ympäröi Masurian '
      + 'kanavien järjestelmä sulkuineen.',
    lahde: 'en-Wikipedia "Śniardwy", koko artikkeli (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miten Śniardwy syntyi?',
      vaihtoehdot: [
        'Tulivuoren kraatterin täyttymisestä sadevedellä',
        'Ihmisten patoamasta jokilaaksosta',
        'Meteoriitin iskusta',
        'Sulavan jäätikön ja tulvavesien muovaamana',
      ],
      oikea: 3,
      fakta: 'Śniardwyllä on kaksi pintapurkautumaa: Jeglin kanava Roś-järveen ja Wyszka-joki '
        + 'Białoławki-järveen.',
    },
  },
  {
    id: 'hahmotelma-slowinski',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-slowinski-d3aea023.jpg',
      lyhyt: 'Liikkuva hiekkadyyni on nielaissut osan metsää, taustalla Łebsko-järvi.',
      selite: 'Kuva Łeban dyyneiltä Słowińskin kansallispuistosta. Tuulen ajama hiekka etenee metsään, ja taustalla näkyy Łebsko-järven rannikkolaguuni.',
      lahde: 'Valokuva: Krzysztof Ziarnek, Kenraiz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Krzysztof Ziarnek, Kenraiz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunes_of_%C5%81eba_kz06.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-slowinski-b109eb53.jpg',
        lyhyt: 'Tuulen rypyttämää hiekkaa Łeban liikkuvilla dyyneillä.',
        selite: 'Łeban dyynit Słowińskin kansallispuistossa ovat liikkuvaa hiekkaa: tuuli muotoilee pintaan ripple-aallokkoa ja siirtää dyynejä vähitellen eteenpäin.',
        lahde: 'Valokuva: Krzysztof Ziarnek, Kenraiz, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Krzysztof Ziarnek, Kenraiz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunes_of_%C5%81eba_kz03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Słowińskin dyynit',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Kuinka nopeasti Słowińskin liikkuvat dyynit etenevät vuodessa?',
      'Ketkä slovinssit olivat, joiden mukaan puisto on nimetty?',
    ],
    korostukset: ['dyyni|dyynit'],
    nappi: 'Preussin Pommerin rannikko, jonka hiekkadyynit vaeltavat hitaasti sisämaahan',
    // 17.30694444 E / 54.70333333 N — en-Wikipedia "Slovincian National Park"
    laudat: {
      maailmankartta: { x: 6410.2, y: 1179.5 },
      europe: { x: 543.5, y: 454.9 },
    },
    teksti: 'Słowińskin kansallispuisto sijaitsee Pommerin maakunnassa Pohjois-Puolassa Itämeren '
      + 'rannikolla Łeban ja Rowyn välissä. Se perustettiin vuonna 1967, ja Unesco nimesi sen '
      + 'biosfäärialueeksi vuonna 1977. Alue oli ennen Itämeren lahti, jonka meri erotti '
      + 'avomerestä hiekkadyyneillä. Aallot ja tuuli kuljettavat hiekkaa sisämaahan, joten '
      + 'dyynit liikkuvat hitaasti 3–10 metriä vuodessa; jotkin ovat jopa 30 metriä korkeita, '
      + 'ja liikkuvia dyynejä pidetään koko Euroopan mittakaavassa luonnon erikoisuutena. '
      + 'Puiston nimi tulee slovinsseista, läntisslaavilaisesta kansasta, joka asui '
      + 'Łeba-järven suoperäisellä alueella.',
    lahde: 'en-Wikipedia "Slovincian National Park", johdanto-osa ja osiot "History" ja '
      + '"Geography" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä saa Słowińskin dyynit liikkumaan?',
      vaihtoehdot: [
        'Tuuli ja aallot kuljettavat hiekkaa sisämaahan',
        'Maa nousee joka vuosi sulavan jäätikön jäljiltä',
        'Rannikko vajoaa hitaasti meren alle',
        'Ihmiset siirtävät hiekkaa pois kaivoksiin',
      ],
      oikea: 0,
      fakta: 'Puiston korkein kohta Rowokol kohoaa 115 metriin ja on erinomainen näköalapaikka.',
    },
  },
  {
    id: 'hahmotelma-wolin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-wolin-7a59f6b3.jpg',
      lyhyt: 'Metsäinen jyrkänne kohoaa hiekkarannan yläpuolelle Wolinin kansallispuistossa.',
      selite: 'Kuva esittää Gosańin jyrkännettä Wolinin kansallispuistossa: metsän peittämä rinne laskee suoraan Itämeren hiekkarantaan.',
      lahde: 'Valokuva: Bożena Radzikowska, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bożena Radzikowska',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Klif_Gosa%C5%84_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-wolin-55022a13.jpg',
        lyhyt: 'Näkymä Gosańin jyrkänteeltä yli Itämeren, etualalla tuulen taivuttamia pyökkejä.',
        selite: 'Kuva on otettu Gosańin kukkulalta Wolinin kansallispuistosta: jyrkänteen reunalla kasvaa pyökkejä, ja alla avautuu Itämeren horisontti.',
        lahde: 'Valokuva: Grzegorz W. Tężycki, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Grzegorz W. Tężycki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Klif-gosan-070620056.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Wolinin kansallispuisto',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Missä kaupungissa Wolinin kansallispuiston päämaja on?',
      'Mitä eläimiä puistossa suojellaan erityisesti?',
    ],
    korostukset: ['visentti|visenttien'],
    nappi: 'Preussin Pommerin saari, jonka merenrantajyrkänteet kohoavat Itämerestä',
    // 14.45 E / 53.93333333 N — en-Wikipedia "Wolin National Park"
    laudat: {
      maailmankartta: { x: 6315, y: 1214.9 },
      europe: { x: 488.6, y: 475.2 },
    },
    teksti: 'Wolinin kansallispuisto on yksi Puolan 23 kansallispuistosta, ja se sijaitsee '
      + 'Wolinin saarella maan luoteisimmassa kulmassa Länsi-Pommerin maakunnassa. Se '
      + 'perustettiin 3. maaliskuuta 1960, ja sen pinta-ala on 109 neliökilometriä. Puiston '
      + 'päämaja on Międzyzdrojen kaupungissa. Puistossa on monipuolinen kasvisto ja '
      + 'eläimistö, ja sen nähtävyyksiin kuuluvat Gosańin ja Kawczan Góran '
      + 'merenrantajyrkänteet sekä visenttien suojelualue.',
    lahde: 'en-Wikipedia "Wolin National Park", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tarnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-tarnica-125079ce.jpg',
      lyhyt: 'Tarnican huippu ja polku Bieszczadyn vuorten ylängöllä.',
      selite: 'Tarnica on Bieszczadyn vuorten korkein huippu Puolassa. Kuvassa polku johtaa avoimen, puuttoman vuoristoniityn poikki kohti huippua.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tarnica,_Bieszczady_(by_Pudelek).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-tarnica-c2f47b7d.jpg',
        lyhyt: 'Ristikkorakenteinen risti Tarnican huipulla, retkeilijät istuvat penkillä.',
        selite: 'Tarnican huipulla on teräksinen ristikkoris: kuvassa se kohoaa lumisen huipun yllä, ja taustalla häämöttävät Bieszczadyn vuoret.',
        lahde: 'Valokuva: Lowdown, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lowdown',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tarnica_cross_2005.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Tarnica',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuinka monta erillistä huippua Tarnicalla on?',
      'Minkä laakson yläpuolelle Tarnica kohoaa noin 500 metriä?',
    ],
    korostukset: ['kruununhuippu|kruununhuipuista'],
    nappi: 'Itävalta-Unkarin Galitsian kaakkoiskulman kaksihuippuinen vuori',
    // 22.73805556 E / 49.06944444 N — en-Wikipedia "Tarnica"
    laudat: {
      maailmankartta: { x: 6591.3, y: 1430.5 },
      europe: { x: 647.8, y: 603.1 },
    },
    teksti: 'Tarnica on Bieszczadyn vuoriston huippu Etelä-Puolassa, ja sen korkeus on 1 346 '
      + 'metriä. Se on yksi Puolan kruununhuipuista. Huippu kohoaa noin 500 metriä '
      + 'Wołosatka-laakson yläpuolelle, ja sen erottaa naapureistaan erottuva muoto. Vuorella '
      + 'on kaksi erillistä huippua, 1 339 ja 1 346 metriä; eteläosa on jyrkkä kalliomuuri ja '
      + 'toinen puoli loivempia kivikenttiä. Eurooppalainen E8-vaellusreitti kulkee Tarnican '
      + 'kautta.',
    lahde: 'en-Wikipedia "Tarnica", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dunajec-gorge',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-dunajec-gorge-7628b8ae.jpg',
      lyhyt: 'Flisakit ohjaavat matkustajia täynnä olevaa lauttaa Dunajec-joella metsäisten rinteiden välissä.',
      selite: 'Perinteinen tukkilautta liukuu Dunajecia pitkin Pieninin vuoriston kupeessa. Lautan kuljettajat seisovat molemmissa päissä pitkien sauvojen kanssa.',
      lahde: 'Valokuva: Zalasem1, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Zalasem1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rafting_on_the_Dunajec_River,_Pieniny_Mountains.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-dunajec-gorge-236d9fae.jpg',
        lyhyt: 'Dunajec-joki mutkittelee jyrkkien kallioseinämien ja metsäisten rinteiden välissä.',
        selite: 'Näkymä Dunajecin rotkolle Pienin-tieltä: joen yllä kohoaa Sokolica ja kuvassa näkyy Leśny-puron suu.',
        lahde: 'Valokuva: Mariusz Rzepkowski (MariuszR), Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Mariusz Rzepkowski (MariuszR)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunajec_-_Droga_Pieninska_01.jpg',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-dunajec-gorge-513331d3.jpg',
        lyhyt: 'Vanha piirros kahdesta vuoristolaisesta tukkilautalla Pieninin kallioiden edessä.',
        selite: 'Kirjapiirros näyttää kaksi miestä lautalla, jota ohjataan pitkillä seipäillä. Taustalla kohoavat jyrkät kalliot.',
        lahde: 'Kaiverrus: Walery Eljasz Radzikowski, Wikimedia Commons (public domain).',
        tekija: 'Walery Eljasz Radzikowski',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Highlander_on_a_raft_in_the_Pieniny_Mountains_(91684562).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Dunajecin rotko',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Millä tavalla vieraita on kuljetettu Dunajecin rotkossa 1800-luvun alusta?',
      'Kuinka monta mutkaa rotkossa on?',
    ],
    korostukset: ['lautta|lautoilla'],
    nappi: 'Rotko, jossa goralit ovat laskeneet vieraita puulautoilla 1800-luvun alusta',
    // 20.42931 E / 49.41333 N — en-Wikipedia "Dunajec River Gorge"
    laudat: {
      maailmankartta: { x: 6514.3, y: 1415.6 },
      europe: { x: 603.4, y: 594 },
    },
    teksti: 'Dunajecin rotko kulkee Pieninien vuorten läpi Etelä-Puolassa ja Pohjois-Slovakiassa, '
      + 'missä Dunajec-joki on maiden välinen rajajoki. Rotko tekee seitsemän mutkaa, ja sitä '
      + 'ympäröivät kalliot nousevat lähes koko matkan noin 300 metrin korkeuteen. Sitä '
      + 'kuvataan geologisesti ja luonnonoloiltaan poikkeuksellisen kiinnostavaksi alueeksi, '
      + 'jossa ihmisen vaikutus on ollut vähäinen, ja se on Puolan Unescon ehdokaslistalla. '
      + 'Rotko kuuluu Pieninien kansallispuistoon, ja kalkki- ja dolomiittikerrokset '
      + 'ylläpitävät sen omaleimaista Karpaattien lajeista koostuvaa kasvi- ja eläinkuntaa. '
      + 'Pieninien goralit ovat järjestäneet puisilla lautoilla tehtäviä retkiä päivittäin '
      + '1800-luvun alusta lähtien.',
    lahde: 'en-Wikipedia "Dunajec River Gorge", johdanto-osa ja osio "Geography" ja "Tourism" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-szczeliniec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-szczeliniec-8c8b4a0d.jpg',
      lyhyt: 'Szczeliniec Wielki kohoaa metsäisen vuoren huipulla niityn takana.',
      selite: 'Pöytävuorten korkein huippu, Szczeliniec Wielki, nähtynä Karłówin kylän läheltä. Huipulla erottuu vaakasuuntainen kalliokruunu.',
      lahde: 'Valokuva: Filip Krejdl, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Filip Krejdl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szczeliniec_Wielki_(Velká_Hejšovina),_pohled_skrz_louku.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-szczeliniec-20cb8823.jpg',
        lyhyt: 'Kapea reitti kulkee sammalpeitteisten hiekkakivikallioiden välistä.',
        selite: 'Turistireitti Szczeliniec Wielkin kalliomuodostelmien lomassa: jyrkät hiekkakiviseinämät, saniaiset ja teräsportaat.',
        lahde: 'Valokuva: Grzegorz W. Tężycki, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Grzegorz W. Tężycki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szczeliniec_Wielki_~21mtcjdg.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Szczeliniec Wielki',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on Szczeliniec Wielkin korkein kohta?',
      'Mitä puolankielinen nimi Szczeliniec tarkoittaa?',
    ],
    korostukset: ['Fotel Pradziada|Fotel Pradziada'],
    nappi: 'Preussin Glatzin seudun pöytävuori, jonne matkailijoita on tuotu 1700-luvun lopulta',
    // 16.34388889 E / 50.48388889 N — en-Wikipedia "Szczeliniec Wielki"
    laudat: {
      maailmankartta: { x: 6378.1, y: 1369.1 },
      europe: { x: 525, y: 565.9 },
    },
    teksti: 'Szczeliniec Wielki eli saksaksi Große Heuscheuer on Pöytävuorten korkein huippu '
      + 'Lounais-Puolassa, Pöytävuorten kansallispuistossa lähellä Tšekin rajaa. Se on yksi '
      + 'Sudeettien tunnetuimmista hiekkakivisistä pöytävuorista. Huipputasanne on '
      + 'halkeamien, käytävien ja kalliolabyrinttien pilkkoma hiekkakivimassiivi, ja sen '
      + 'korkein kohta on kivi nimeltä Fotel Pradziada eli Isoisoisän nojatuoli. '
      + 'Puolankielinen nimi tulkitaan suureksi halkeamaksi vuoreksi. Huipulle pääsee '
      + 'Karłówista noin 680 kiviaskelman portaita pitkin, ja vuoren matkailu liittyy '
      + 'Kłodzkon seudun 1700-luvun lopun matkailuun.',
    lahde: 'en-Wikipedia "Szczeliniec Wielki", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-grunwald',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-grunwald-43060a2a.jpg',
      lyhyt: 'Grunwaldin muistomerkkikukkulan korkea teräspylväiden ryhmä ja graniittinen muistokivi sinistä taivasta vasten.',
      selite: 'Vuoden 1960 muistomerkkikokonaisuus seisoo vuoden 1410 taistelun kentällä. Tunnusomaisia ovat lippuja muistuttavia levyjä kantava pylväsniput ja graniittinen monumentti.',
      lahde: 'Valokuva: Łukasz Niemiec, Wikimedia Commons (CC BY-SA 3.0 pl).',
      tekija: 'Łukasz Niemiec',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grunwald_-_wzgórze_pomnikowe_(widok_od_południa).jpg',
      lisenssi: 'CC BY-SA 3.0 pl',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-grunwald-2f0a4c98.jpg',
        lyhyt: 'Graniittinen muistomerkki kaiverretuin kasvoin nousee porrasjalustalta Grunwaldin kentällä.',
        selite: 'Muistomerkin lohkoihin on veistetty kaksi kasvoparia, joiden kohdalla kivi muistuttaa kypärän visiiriä. Taustalla aukeaa Grunwaldin niittymaisema.',
        lahde: 'Valokuva: Łukasz Niemiec, Wikimedia Commons (CC BY-SA 3.0 pl).',
        tekija: 'Łukasz Niemiec',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grunwald_-_granitowy_pomnik.jpg',
        lisenssi: 'CC BY-SA 3.0 pl',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en',
      },
    ],
    nimi: 'Grunwaldin taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Ketkä liittolaiset voittivat Grunwaldin taistelun 15. heinäkuuta 1410?',
      'Millä toisella nimellä taistelua kutsutaan saksaksi?',
    ],
    korostukset: ['Tannenberg|Tannenbergin'],
    nappi: 'Itä-Preussin Tannenberg, jossa Puola ja Liettua löivät ritarikunnan 1410',
    // 20.12472222 E / 53.48611111 N — en-Wikipedia "Battle of Grunwald"
    laudat: {
      maailmankartta: { x: 6504.2, y: 1235.2 },
      europe: { x: 597.6, y: 486.9 },
    },
    teksti: 'Grunwaldin taistelu, jota kutsutaan myös ensimmäiseksi Tannenbergin taisteluksi, '
      + 'käytiin 15. heinäkuuta 1410 Puolan, Liettuan ja Saksalaisen ritarikunnan sodassa. '
      + 'Puolan kruunun ja Liettuan suuriruhtinaskunnan liittouma, jota johtivat kuningas '
      + 'Władysław II Jagiełło ja suuriruhtinas Vytautas, löi ratkaisevasti ritarikunnan '
      + 'suurmestari Ulrich von Jungingenin joukot. Suurin osa ritarikunnan johtajista kaatui '
      + 'tai joutui vangiksi. Ritarikunta kesti silti Malborkin linnan piirityksen ja selvisi '
      + 'Thornin rauhassa 1411 pienin aluemenetyksin, mutta se ei koskaan toipunut '
      + 'entiselleen. Taistelu oli yksi keskiajan suurimmista, ja siitä on tullut Puolassa ja '
      + 'Liettuassa kansallisen ylpeyden ja vastarinnan symboli.',
    lahde: 'en-Wikipedia "Battle of Grunwald", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Saksalaiselle ritarikunnalle tapahtui Grunwaldin taistelun jälkeen?',
      vaihtoehdot: [
        'Se hajosi heti ja menetti kaikki maansa',
        'Se sai suuria alueita Liettuan suuriruhtinaalta',
        'Se kesti Malborkin piirityksen, mutta ei toipunut',
        'Se liittyi Puolan kuninkaan armeijaan',
      ],
      oikea: 2,
      fakta: 'Taistelua muistetaan Puolan ja Liettuan lisäksi myös Ukrainassa ja Valko-Venäjällä.',
    },
  },
  {
    id: 'hahmotelma-frombork',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-frombork-8a0166b6.jpg',
      lyhyt: 'Fromborkin punatiilinen tuomiokirkko teräväkärkisine torneineen kohoaa kukkulalla, etualalla hahmopatsas.',
      selite: 'Näkymä Katedraalikukkulalle: tiilikirkko ja sitä ympäröivät rakennukset. Oikealla etualalla seisoo hahmopatsas portaiden yläpäässä.',
      lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Scotch Mist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Frombork_2023_16_Cathedral.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-frombork-ac3b701a.jpg',
        lyhyt: 'Kopernikuksen torni, tiilinen kulmatorni jyrkkää kattoa ja puisia kävelysiltoja myöten.',
        selite: 'Fromborkin linnoitusmuurin luoteistorni eli Kopernikuksen torni sinistä taivasta vasten. Muurin sisäpuolella kulkevat puiset kävelygalleriat, ja katon huipulla on metallikoriste.',
        lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Julian Nyča',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Frombork_Copernicus_Tower.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-frombork-fbcd8c28.jpg',
        lyhyt: 'Tornin näyttelyhuoneessa pukunukke lukee käsikirjoitusta kirjoituspöydän ääressä.',
        selite: 'Kopernikuksen tornin sisänäyttely: pöydällä on avoin kirja, papereita ja kynttilä, taustalla puukaappi ja uuni.',
        lahde: 'Valokuva: Aleksander Durkiewicz, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Aleksander Durkiewicz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Frombork_Wieża_Kopernika_2023.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Frombork',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka tähtitieteilijä asui Fromborkissa 1500-luvun alussa?',
      'Millä nimellä Frombork tunnetaan saksaksi?',
    ],
    korostukset: ['Kopernikus|Kopernikus'],
    nappi: 'Preussin Frauenburg, jossa Kopernikus teki havaintojaan 1500-luvun alussa',
    // 19.68333333 E / 54.35 N — en-Wikipedia "Frombork"
    laudat: {
      maailmankartta: { x: 6489.4, y: 1195.8 },
      europe: { x: 589.1, y: 464.2 },
    },
    teksti: 'Frombork eli saksaksi Frauenburg on noin 2 300 asukkaan kaupunki Veikselinlahden '
      + 'rannalla Pohjois-Puolassa Warmian alueella, ja sitä sanotaan Warmian jalokiveksi. Se '
      + 'mainitaan ensimmäisen kerran 1200-luvun asiakirjassa, ja se on yksi Warmian '
      + 'vanhimmista ja historiallisesti tärkeimmistä kaupungeista. Tähtitieteilijä Nikolaus '
      + 'Kopernikus asui siellä 1500-luvun alussa ja teki kaupungissa useita havaintojaan. '
      + 'Kaupungin 1300-luvun tuomiokirkko vaurioitui pahoin toisessa maailmansodassa mutta '
      + 'rakennettiin uudelleen, ja siellä on Kopernikuksen hauta. Kaupungissa toimii '
      + 'Kopernikus-museo planetaarioineen, ja joka kesä järjestetään kansainvälinen '
      + 'urkumusiikkifestivaali.',
    lahde: 'en-Wikipedia "Frombork", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-biskupin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-biskupin-a6884c54.jpg',
      lyhyt: 'Biskupinin rekonstruoitu asutus: pitkä ruokokattoinen talorivi ja puinen vartiotorni tulvivan niityn takana.',
      selite: 'Biskupinin arkeologisen kohteen rekonstruoituja rivitaloja, jotka esittävät lusatialaiskulttuurin linnoitusasutusta. Vasemmalla erottuu vartiotorni ja oikealla puinen suojamuuri.',
      lahde: 'Valokuva: Patrik Kunec, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Patrik Kunec',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biskupin,_Poland_-_Reconstructed_houses_from_the_Bronze_Age.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-biskupin-d06fa5f5.jpg',
        lyhyt: 'Portti, ruokokattoinen vartiotorni ja tukeista rakennettu suojamuuri lähikuvassa.',
        selite: 'Rekonstruoitu portti ja muuri Biskupinissa: muuri on kasattu ristikkäin pinotuista puupölkyistä ja sen edessä on teroitettujen tukkien penger.',
        lahde: 'Valokuva: Fazer, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Fazer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biskupin_-_gate_and_wall.jpg',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
    ],
    nimi: 'Biskupin',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka monta katua Biskupinin asutuksessa oli?',
      'Minkä kulttuurin asukkaat rakensivat Biskupinin?',
    ],
    korostukset: ['Lusatian kulttuuri|Lusatian kulttuurin'],
    nappi: 'Preussin Posenin läänin järvi, jonka niemellä nukkuu vielä löytämätön pronssikautinen kylä',
    // 17.74444444 E / 52.78833333 N — en-Wikipedia "Biskupin"
    laudat: {
      maailmankartta: { x: 6424.8, y: 1266.8 },
      europe: { x: 551.9, y: 505.3 },
    },
    teksti: 'Biskupin on arkeologinen kohde ja elävä malli pronssikauden lopun linnoitetusta '
      + 'asutuksesta Pohjois-Keski-Puolassa, ja se toimii myös arkeologisena ulkoilmamuseona. '
      + 'Kun se löydettiin, sitä luultiin varhaiseksi länsislaavilaiseksi asutukseksi, mutta '
      + 'arkeologit vahvistivat sen kuuluneen Lusatian kulttuurin Biskupin-ryhmään '
      + '700-luvulta eaa. Asutus rakennettiin soiselle niemelle järveen ja järjestettiin '
      + 'suorakaiteen muotoiseen ruudukkoon, jossa oli yksitoista katua. Sitä ympäröi korkea '
      + 'puinen paaluaita, joka nojasi tammirunkojen muodostamaan multatäytteiseen '
      + 'vallirakenteeseen. Paikan löysi vuonna 1933 koulunopettaja Walenty Szwajcer '
      + 'oppilaineen, ja kaivaukset alkoivat seuraavana vuonna.',
    lahde: 'en-Wikipedia "Biskupin", johdanto-osa ja osiot "History of the excavations" ja '
      + '"Description" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka löysi Biskupinin pronssikautisen linnoitusasutuksen jäänteet vuonna 1933?',
      vaihtoehdot: [
        'Poznanin yliopiston arkeologi',
        'Koulunopettaja oppilaineen',
        'Kalastaja verkkoineen',
        'Maanviljelijä peltoa kyntäessään',
      ],
      oikea: 1,
      fakta: 'Löytö oli niin suosittu, että Biskupinia on kutsuttu Puolan Pompejiksi.',
    },
  },
  {
    id: 'hahmotelma-legnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-legnica-91129b2e.jpg',
      lyhyt: 'Legnickie Polen barokkinen Pyhän Jadwigan basilika ja luostarin siivet iltavalossa.',
      selite: 'Legnickie Polen, saksaksi Wahlstattin, Pyhän Ristin ja Pyhän Jadwigan kirkon kaksitorninen julkisivu. Kirkko ja entinen benediktiiniluostari seisovat paikalla, jonka nimi liittyy vuoden 1241 Legnican taisteluun.',
      lahde: 'Valokuva: Sławomir Milejski, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Sławomir Milejski',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SM_Legnickie_Pole_Bazylika_św_Jadwigi_2017_(0)_ID_593489.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-legnica-f401ab5a.jpg',
        lyhyt: 'Vanha mustavalkoinen piirros Wahlstattin luostarista Ala-Sleesiassa.',
        selite: '1800-luvun kuvaus Wahlstattin luostarista, nykyisestä Legnickie Polesta. Kuvassa näkyvät barokkikirkon kaksi tornia ja luostarirakennuksen sisäänkäynti.',
        lahde: 'Kaiverrus: Theodor Blätterbauer, Wikimedia Commons (public domain).',
        tekija: 'Theodor Blätterbauer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kloster_Wahlstatt_Blätterbauer.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-legnica-589c312d.jpg',
        lyhyt: 'Barokkikirkon sisätila kattofreskoineen ja kultaisine alttareineen.',
        selite: 'Wahlstattin eli Legnickie Polen kirkon sisätila: kattoa peittävät freskot, pääalttari on koristeltu kullalla ja sivualttareilla on maalaukset.',
        lahde: 'Valokuva: Gliwi, Wikimedia Commons (CC0).',
        tekija: 'Gliwi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stiftsbasilika_Hl._Kreuz_und_Hl._Hedwig_innen_(Wahlstatt).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Legnican taistelu',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Ketä vastaan Henrik II Hurskas taisteli Legnican luona 9. huhtikuuta 1241?',
      'Millä taktiikalla mongolit voittivat?',
    ],
    korostukset: ['mongoli|mongolien'],
    nappi: 'Preussin Liegnitz, jonka lähellä mongolit voittivat Euroopan ritarit 1241',
    // 16.22277778 E / 51.14527778 N — en-Wikipedia "Battle of Legnica"
    laudat: {
      maailmankartta: { x: 6374.1, y: 1340 },
      europe: { x: 522.7, y: 548.5 },
    },
    teksti: 'Legnican taistelu, jota kutsutaan myös Liegnitzin tai Wahlstattin taisteluksi, '
      + 'käytiin 9. huhtikuuta 1241 Legnickie Polen kylässä noin kymmenen kilometriä '
      + 'Legnicasta kaakkoon Sleesian ruhtinaskunnassa. Sleesian herttua Henrik II Hurskaan '
      + 'johtamat puolalaiset ja määriläiset, joita tukivat feodaaliaateli ja muutamat paavin '
      + 'lähettämät ritarikuntien ritarit, yrittivät pysäyttää mongolien hyökkäyksen Puolaan. '
      + 'Mongolit käyttivät nopeaa ratsuväkeä ja jousiampujia ja pitkää sarjaa tekaistuja '
      + 'perääntymisiä. Yleisen historiallisen käsityksen mukaan taistelu oli murskaava '
      + 'tappio puolalaisille ja määriläisille, ja Długoszin mukaan Henrik kuoli taistelussa. '
      + 'Se käytiin kaksi päivää ennen mongolien voittoa unkarilaisista Mohin taistelussa.',
    lahde: 'en-Wikipedia "Battle of Legnica", johdanto-osa ja osio "Battle" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-kalwaria',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kalwaria-587dff91.jpg',
      lyhyt: 'Kalwaria Zebrzydowskan Neitsyt Marian basilika ja luostarin vihertävät tornit sinistä taivasta vasten.',
      selite: 'Kuvassa näkyy Kalwaria Zebrzydowskan Neitsyt Marian basilika luostarirakennuksineen. Basilika on pyhiinvaelluskohteen sydän.',
      lahde: 'Valokuva: Ludwig Schneider, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ludwig Schneider',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalwaria_Zebrzydowska_014.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kalwaria-47c315d6.jpg',
        lyhyt: 'Ristiinnaulitsemisen kappeli metsän keskellä Kalwaria Zebrzydowskan pyhiinvaelluspoluilla.',
        selite: 'Ristiinnaulitsemisen kappeli on yksi Kristuksen kärsimyksen polkujen kappeleista, joita pitkin pyhiinvaeltajat kulkevat kukkuloilla.',
        lahde: 'Valokuva: Ludwig Schneider, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ludwig Schneider',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalwaria_Zebrzydowska_042.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kalwaria Zebrzydowska',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä pyhän paikan jäljennös Kalwaria Zebrzydowskan luostarikompleksi on?',
      'Kuka Kalwarian tilasi rakennettavaksi?',
    ],
    korostukset: ['Zebrzydowski|Zebrzydowski'],
    nappi: 'Itävallan Galitsian pyhiinvaelluskohde, joka jäljittelee Jerusalemin Golgataa',
    // 19.68333333 E / 49.86666667 N — en-Wikipedia "Kalwaria Zebrzydowska"
    laudat: {
      maailmankartta: { x: 6489.4, y: 1396 },
      europe: { x: 589.1, y: 582.1 },
    },
    teksti: 'Kalwaria Zebrzydowska on noin 4 400 asukkaan kaupunki Etelä-Puolassa Pikku-Puolan '
      + 'alueella. Sen luostari- ja pyhiinvaelluskompleksin tilasi Krakovan vojevoda Mikołaj '
      + 'Zebrzydowski: hän sai 1. joulukuuta 1602 Lanckoronan linnasta katsellessaan '
      + 'lähikukkuloita ja laaksoja näyn, jonka mukaan hän rakennutti Jerusalemin muurien '
      + 'ulkopuolisen Golgatan mallin mukaan roomalaiskatolisen luostarin ja Kristuksen '
      + 'kärsimystien polut. Kaupunki on saanut nimensä luostarista ja perustajastaan, ja '
      + 'Zebrzydówin kaupunki perustettiin vuonna 1617 majoittamaan kasvavaa pyhiinvaeltajien '
      + 'joukkoa. Habsburgien Itävalta liitti alueen itseensä Puolan ensimmäisessä jaossa '
      + '1772, ja itävaltalaishallinto muutti kaupungin nimeksi Kalwaria.',
    lahde: 'en-Wikipedia "Kalwaria Zebrzydowska", johdanto-osa ja osio "Overview" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sandomierz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-sandomierz-bf3d11cd.jpg',
      lyhyt: 'Sandomierzin tiilinen renessanssiraatihuone torin laidalla kesäisenä päivänä.',
      selite: 'Kuvassa on Sandomierzin vanhankaupungin tori ja sen keskellä oleva punatiilinen raatihuone. Torin reunalla näkyy myös pylväsmuistomerkki.',
      lahde: 'Valokuva: Henryk Bielamowicz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Henryk Bielamowicz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sandomierz,_ratusz_(HB2).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-sandomierz-a0a0e092.jpg',
        lyhyt: 'Sandomierzin Ople-portti, korkea tiilitorni suippokaarisine porttikäytävineen.',
        selite: 'Ople-portti (Brama Opatowska) on Sandomierzin vanhankaupungin tiilinen porttitorni. Tornin yläosa on valkoista ja koristeltua.',
        lahde: 'Valokuva: Zala, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zala',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sandomierz_Brama_Opatowska_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sandomierz',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Ketkä ryöstivät Sandomierzin vuosina 1241, 1260 ja 1287?',
      'Minä vuonna Puolan presidentti julisti vanhankaupungin kansalliseksi monumentiksi?',
    ],
    korostukset: ['vanhakaupunki|vanhakaupunki'],
    nappi: 'Vanha kuninkaankaupunki Venäjän Kongressi-Puolassa; mongolit ryöstivät sen 1241',
    // 21.75 E / 50.68333333 N — en-Wikipedia "Sandomierz"
    laudat: {
      maailmankartta: { x: 6558.3, y: 1360.3 },
      europe: { x: 628.8, y: 560.6 },
    },
    teksti: 'Sandomierz on noin 24 000 asukkaan historiallinen kaupunki Kaakkois-Puolassa '
      + 'Veikselin rannalla lähellä San-joen yhtymäkohtaa. Sen säilynyt vanhakaupunki on '
      + 'merkittävä matkailunähtävyys, jonka Puolan presidentti julisti kansalliseksi '
      + 'monumentiksi vuonna 2017. Kaupunki oli aikanaan yksi Pikku-Puolan ja koko maan '
      + 'tärkeimmistä kaupunkikeskuksista ja kuninkaankaupunki, joka toimi alueen '
      + 'hallintokeskuksena korkealta keskiajalta 1800-luvulle asti. Kronikoitsija Gallus '
      + 'Anonymus luki sen 1100-luvun alussa Krakovan ja Wrocławin ohella Puolan '
      + 'pääkaupunkeihin, ja Bolesław III:n testamentti teki siitä yhden ruhtinaskunnan '
      + 'pääkaupungin. Mongolit ryöstivät kaupunkia vuosina 1241, 1260 ja 1287.',
    lahde: 'en-Wikipedia "Sandomierz", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zakopane',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-zakopane-6360c451.jpg',
      lyhyt: 'Vanhoja puuhuviloita vihertävine metallikattoineen Krupówkin kadun päässä Zakopanessa.',
      selite: 'Kuvassa on puurakenteisia rakennuksia Krupówki-kadun päässä Zakopanessa. Rakennuksissa on jyrkät katot ja ikkunalliset kulmaerkkerit.',
      lahde: 'Valokuva: Cybularny, Wikimedia Commons (CC0).',
      tekija: 'Cybularny',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2022_Zakopane_Krupówki_1,_1.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-zakopane-395282fb.jpg',
        lyhyt: 'Panoraama Gubałówkan rinteeltä: Zakopane laaksossa ja Tatra-vuoret taustalla.',
        selite: 'Gubałówkan rinteeltä avautuu näkymä Zakopaneen ja sen takana kohoaviin Tatra-vuoriin.',
        lahde: 'Valokuva: Daro998 (pl.wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Daro998 (pl.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_Tatr_z_Gubałówki.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-zakopane-f622a3e2.jpg',
        lyhyt: 'Hevosvaunut ja ajurit Zakopanen keskustan kadulla, taustalla puukoristeinen rakennus ja vuoria.',
        selite: 'Kuvassa on kaksi hevosvaunua ja niiden ajureita Zakopanen keskustassa. Taustalla on puuyksityiskohdin koristeltu rakennus ja vasemmalla vuoria.',
        lahde: 'Valokuva: Zemxer, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zemxer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zakopane_krupówki_3.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Zakopane',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä kansan kulttuurin keskus Zakopane on?',
      'Minkä katujen risteyksessä Zakopanen keskusta on?',
    ],
    korostukset: ['gorali|gorali-kulttuurin'],
    nappi: 'Galitsian vuoristokylä Tatran juurella; metallikylästä tulee 1889 ilmastokylpylä',
    // 19.95 E / 49.3 N — en-Wikipedia "Zakopane"
    laudat: {
      maailmankartta: { x: 6498.3, y: 1420.5 },
      europe: { x: 594.2, y: 597 },
    },
    teksti: 'Zakopane on noin 27 000 asukkaan kaupunki Etelä-Puolassa Podhalen alueella Tatran '
      + 'juurella; se on gorali-kulttuurin keskus, ja sitä kutsutaan usein Puolan '
      + 'talvipääkaupungiksi. Se sijaitsee 800–1 100 metrin korkeudessa laaksossa '
      + 'Tatra-vuorten ja Gubałówka-mäen välissä, ja keskusta on Krupówki- ja '
      + 'Kościuszko-katujen risteyksessä. Vanhimmat asiakirjat mainitsevat sen 1600-luvulta, '
      + 'ja vuonna 1676 se oli 43 asukkaan kylä; 1800-luvulla siitä tuli Galitsian suurin '
      + 'metallurgian keskus ja vuoteen 1889 mennessä ilmastollinen kylpyläpaikka. '
      + 'Zakopane-tyyli on Podhalen kansantaiteesta innoituksensa saanut arkkitehtuuri, jonka '
      + 'uranuurtaja oli Stanisław Witkiewicz ja jota pidetään nykyään goralien perinteen '
      + 'ytimenä.',
    lahde: 'en-Wikipedia "Zakopane", johdanto-osa ja osiot "History" ja "Architecture" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka oli Zakopane-tyylin arkkitehtuurin uranuurtaja?',
      vaihtoehdot: [
        'Karl Friedrich Schinkel',
        'Jan Matejko',
        'Adam Mickiewicz',
        'Stanisław Witkiewicz',
      ],
      oikea: 3,
      fakta: 'Wielka Krokiewin hyppyrimäki avattiin vuonna 1925 ja Kasprowy Wierchin köysirata '
        + 'valmistui vuonna 1936.',
    },
  },
  {
    id: 'hahmotelma-kazimierz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kazimierz-59c8ffbf.jpg',
      lyhyt: 'Kazimierz Dolnyn torin vanha kattoinen kaivo ja värikkäät kivitalot kadun varrella.',
      selite: 'Torin keskellä on vanha puurakenteinen, laudoituksella katettu kaivo. Sen takana näkyy historiallisia kaupunkitaloja.',
      lahde: 'Valokuva: Alians PL, Wikimedia Commons (CC0).',
      tekija: 'Alians PL',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alians_PL_KazimierzDolny,WaterWell,2008_10_02,PA020036-N.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kazimierz-47fb6eb3.jpg',
        lyhyt: 'Stanisław Masłowskin vesivärityö vuodelta 1899: markkinapäivä Kazimierz Dolnyn torilla.',
        selite: 'Akvarelli ja lyijykynä -teos esittää Kazimierz Dolnyn toria vuonna 1899: hevoskärryjä, tynnyreitä ja kauppiaita sekä koristeellisia renessanssikamienicoita torin laidalla.',
        lahde: 'Maalaus: Stanisław Masłowski, Wikimedia Commons (public domain).',
        tekija: 'Stanisław Masłowski',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stanisław_Masłowski_(1853-1926),_Market_square_in_Kazimierz_Dolny,_watercolor_and_pencil_on_cardboard,1899.jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kazimierz-1334fb09.jpg',
        lyhyt: 'Näkymä historiallisesta tornista Veikseliin ja Kazimierz Dolnyn rantaan.',
        selite: 'Kuvassa Veikseli kiertää hiekkasärkkien lomassa Kazimierz Dolnyn ohi. Etualalla näkyy kaupungin rantapuolen rakennuksia ja laituriin ankkuroituja aluksia.',
        lahde: 'Valokuva: Robsuper, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Robsuper',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kazimierz_Dolny_(view_from_the_historic_tower)_1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kazimierz Dolny',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä sai Kazimierz Dolnyn kukoistamaan 1500- ja 1600-luvulla?',
      'Miksi kaupunki on säilyttänyt renessanssiajan ilmeensä?',
    ],
    korostukset: ['viljakauppa|viljakaupan'],
    nappi: 'Veikselin renessanssikaupunki, josta on tulossa taiteilijoiden ja kesäasukkaiden suosikki',
    // 21.9475 E / 51.32222222 N — en-Wikipedia "Kazimierz Dolny"
    laudat: {
      maailmankartta: { x: 6564.9, y: 1332.2 },
      europe: { x: 632.6, y: 543.8 },
    },
    teksti: 'Kazimierz Dolny on pieni historiallinen kaupunki Itä-Puolassa Veikselin itärannalla '
      + 'noin 50 kilometrin päässä Lublinista. Se kukoisti eniten 1500-luvulla ja 1600-luvun '
      + 'ensimmäisellä puoliskolla Veikselillä käydyn viljakaupan ansiosta. Kaupan taannuttua '
      + 'kaupungista tuli taloudellinen syrjäseutu, ja juuri tämä pysähtyneisyys säilytti sen '
      + 'renessanssiajan kaupunkisuunnitelman ja ulkonäön. Vuodesta 1181 kaupungin nimi on '
      + 'Kazimierz ruhtinas Kasimir II Oikeamielisen kunniaksi, ja 1800-luvulta lähtien siitä '
      + 'on tullut lomakohde, joka houkuttelee taiteilijoita ja kesäasukkaita. Nykyään siellä '
      + 'on gallerioita lähes jokaisella kadulla.',
    lahde: 'en-Wikipedia "Kazimierz Dolny", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-zywiec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-zywiec-ccbe35bd.jpg',
      lyhyt: 'Żywiecin Vanha linna, vaalea linna kulmatorneineen aurinkoisena talvipäivänä.',
      selite: 'Kuvassa on Żywiecin Vanha linna (Stary Zamek): pitkä vaalea rakennus ja oikealla kulmatorni, jonka yläosassa on hammastettu harjanne.',
      lahde: 'Valokuva: Lesnydzban, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Lesnydzban',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stary_Zamek_w_Żywcu_(1).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-zywiec-19d930be.jpg',
        lyhyt: 'Żywiecin panimon vanha sisäänkäynti holvikaarineen ja vuosiluku MDCCCLVI.',
        selite: 'Kuvassa on Żywiecin panimoalueen pihalle avautuva kivinen holvikäytävä, jonka yllä lukee roomalaisin numeroin vuosiluku 1856. Pihan seinällä on maalaus panimosta ja taustalla suurikaarisia ikkunoita.',
        lahde: 'Valokuva: Silar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Silar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:020211003_123806_Żywiec_Brewery.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Żywiec',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Kuka perusti Żywiecin panimon vuonna 1852?',
      'Miksi kaupunki siirrettiin nykyiselle paikalleen vuonna 1448?',
    ],
    korostukset: ['panimo|panimon'],
    nappi: 'Habsburgien panimokaupunki Galitsiassa; panimo on perustettu vasta 1852',
    // 19.20583333 E / 49.68916667 N — en-Wikipedia "Żywiec"
    laudat: {
      maailmankartta: { x: 6473.5, y: 1403.7 },
      europe: { x: 580, y: 586.8 },
    },
    teksti: 'Żywiec on noin 31 000 asukkaan kaupunki Soła-joen varrella Etelä-Puolassa Żywiecin '
      + 'järven ja maisemapuiston lähellä; historiallisesti ja kulttuurisesti se kuuluu '
      + 'Pikku-Puolaan ja goralien maihin. Kaupunki mainitaan ensimmäisen kerran vuonna 1308 '
      + 'katolisen seurakunnan paikkana, ja se siirrettiin nykyiselle paikalleen vuonna 1448, '
      + 'koska vanha Żywiec oli altis tulville. Vanha linna rakennettiin 1300-luvun '
      + 'puolivälissä, ja sen ympärillä on 26 hehtaarin maisemapuisto. Kun kaupungin tilat '
      + 'siirtyivät vuonna 1822 Habsburg-Lothringenin arkkiherttua Kaarlelle, hänen poikansa '
      + 'arkkiherttua Albrecht perusti kaupunkiin Żywiecin panimon vuonna 1852; Heineken osti '
      + 'sen 1990-luvulla.',
    lahde: 'en-Wikipedia "Żywiec", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kartuzy',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kartuzy-950b61a4.jpg',
      lyhyt: 'Kartuzyn kollegiaattikirkon punatiilinen kuori ja tornit.',
      selite: 'Kartuzyn Neitsyt Marian taivaaseenottamisen kollegiaattikirkko kuvattuna kuoripuolelta: punatiilinen goottilainen seinä, korkeat kapeat ikkunat ja kirkon vihertävä kattopeite torneineen.',
      lahde: 'Valokuva: Gdaniec, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Gdaniec',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kartuzy_-_kolegiata_(6).JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kartuzy-98a077ba.jpg',
        lyhyt: 'Kartuzyn kollegiaattikirkon sisätila ja alttari.',
        selite: 'Kuva kirkon sisältä alttarille päin: ripaholvi, kynttiläkruunu ja mustat, veistetyt kuoripenkit pääkäytävän molemmin puolin.',
        lahde: 'Valokuva: Jarosław Kruk (Jrkruk), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jarosław Kruk (Jrkruk)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:JRKRUK_20140517_KARTUZY_KOLEGIATA_WNMP_DSCF1852.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kartuzy-3bef0ff9.jpg',
        lyhyt: 'Kašubian museo Kartuzyssa toimii ristikkorakenteisessa huvilassa.',
        selite: 'Franciszek Tredern nimeä kantava Kašubian museo (Muzeum Kaszubskie) toimii Kartuzyn keskustassa, Kościerskan kadun varrella olevassa ristikkorakenteisessa huvilassa.',
        lahde: 'Valokuva: Gdaniec, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gdaniec',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kartuzy,_ul._Kościerska_1c_-_Muzeum_Kaszubskie_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kartuzy',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Ketkä perustivat Kartuzyn noin vuonna 1380?',
      'Minkä kansan kulttuurikeskus Kartuzy on ollut?',
    ],
    korostukset: ['kašubi|kašubien'],
    nappi: 'Preussin Karthaus, kašubien pikkukaupunki, jonka lakkautetun luostarin maat jaetaan 1841',
    // 18.2 E / 54.33333333 N — en-Wikipedia "Kartuzy"
    laudat: {
      maailmankartta: { x: 6440, y: 1196.5 },
      europe: { x: 560.6, y: 464.6 },
    },
    teksti: 'Kartuzy on kaupunki Pohjois-Puolassa Itä-Pommerin historiallisella alueella noin 32 '
      + 'kilometriä Gdańskista länteen. Se perustettiin noin vuonna 1380 Prahasta tulleiden '
      + 'kartusiaanimunkkien luostariksi, ja kaupunki on saanut nimensä heiltä; Saksalainen '
      + 'ritarikunta antoi luostarille suuria maa-alueita. Munkit raivasivat lähimetsät ja '
      + 'houkuttelivat Pommerin ruhtinaskunnasta talonpoikia asuttamaan raivattuja alueita. '
      + 'Preussi liitti seudun Puolan ensimmäisessä jaossa 1772 ja lakkautti luostarin vuonna '
      + '1826, ja asutus alkoi kasvaa taloudellisesti vasta, kun luostarin maat jaettiin '
      + 'vuonna 1841. Kartuzy on pitkään ollut kašubien kulttuurikeskus, ja kašubimuseo on '
      + 'toiminut siellä vuodesta 1947.',
    lahde: 'en-Wikipedia "Kartuzy", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lowicz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lowicz-914b606a.jpg',
      lyhyt: 'Łowiczin tuomiokirkon vihertävät tornit kohoavat kaupungin yllä.',
      selite: 'Łowiczin tuomiokirkon kaksi tornia, joiden kupariset, kerroksittain kapenevat huput ovat vihertyneet. Etualalla on puistoa ja pieni muistomerkki.',
      lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Scotch Mist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Łowicz_2023_17_Cathedral_Towers.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lowicz-adc98597.jpg',
        lyhyt: 'Łowiczin kansanpuvun kirjottu liivi ja punainen helminauha.',
        selite: 'Lähikuva Łowiczin alueen perinteisestä puvusta: mustassa liivissä ja valkoisessa paidassa on kirjottuja ruusukuvioita, ja kaulassa on punaisia helmiä ja nauha.',
        lahde: 'Valokuva: Emilia Wiśniewska, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Emilia Wiśniewska',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Łowicz_traditional_costume,_Poland_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Łowicz',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Keiden asuinpaikka Łowicz oli Puola-Liettuassa?',
      'Mitä ulkoilmamuseossa Łowiczin lähellä on?',
    ],
    korostukset: ['primas|primasten'],
    nappi: 'Puolan primasten entinen residenssikaupunki Venäjän Kongressi-Puolassa',
    // 19.93333333 E / 52.1 N — en-Wikipedia "Łowicz"
    laudat: {
      maailmankartta: { x: 6497.8, y: 1297.6 },
      europe: { x: 593.9, y: 523.4 },
    },
    teksti: 'Łowicz on noin 27 000 asukkaan kaupunki Keski-Puolassa Łódźin maakunnassa. Se oli '
      + 'Puolan primasten eli arkkipiispojen residenssi Puola-Liettuassa, ja kuningasvallan '
      + 'välivaiheessa siitä tuli väliaikainen Puolan pääkaupunki; siksi pienellä kaupungilla '
      + 'on oma piispa ja tuomiokirkkobasilika. Tuomiokirkko on Puolan historiallinen '
      + 'monumentti, ja kaupungin laidalla ovat entisen piispanlinnan rauniot. Łowiczissa on '
      + 'merkittävä etnografinen museo ja 17 hehtaarin ulkoilmamuseo, joka esittelee '
      + 'perinteisiä puutaloja ja kylämaailmaa. Kaupunki on myös tärkeä ruoantuotantopaikka: '
      + 'siellä valmistetaan hedelmä- ja vihannessäilykkeitä sekä maitotuotteita.',
    lahde: 'en-Wikipedia "Łowicz", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ciechocinek',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-ciechocinek-a7020219.jpg',
      lyhyt: 'Ciechocinekin puinen suolavesitorni kohoaa puiston reunalla.',
      selite: 'Ciechocinekin kylpyläkaupungin suolavesitorni (tężnia) kokonaisuutena: pitkä, viistotuettu puurakenne, jonka päässä on korkeampi kulmatorni.',
      lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Scotch Mist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ciechocinek_2023_50.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-ciechocinek-7e4c860a.jpg',
        lyhyt: 'Suolavesitornin sisällä vesi valuu pensaskimppujen seinämän läpi.',
        selite: 'Kuva Ciechocinekin suolavesitornin sisältä: korkea, tumma risukimppuseinämä ja sen läpi valuva vesi, joka jäätyy jääpuikoiksi alareunassa.',
        lahde: 'Valokuva: MichalPL, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'MichalPL',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Inside_graduation_tower_in_Ciechocinek,_Aleksandrów_County,_Kuyavian-Pomeranian_Voivodeship,_Poland,_August_2022_(5).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ciechocinek',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä maailmanennätyksen kaupungin rakennelmat pitävät?',
      'Mihin sairauksiin paikallisten lähteiden hoitovaikutukset kohdistuvat?',
    ],
    korostukset: ['suolavesitornit|suolavesitorneistaan'],
    nappi: 'Venäjän Puolan suolavesikylpylä, jonka rautatieyhteys Varsovaan valmistui 1867',
    // 18.78333333 E / 52.88333333 N — en-Wikipedia "Ciechocinek"
    laudat: {
      maailmankartta: { x: 6459.4, y: 1262.5 },
      europe: { x: 571.8, y: 502.8 },
    },
    teksti: 'Ciechocinek on kylpyläkaupunki Kuyavian–Pommerin maakunnassa Veikselin rannalla '
      + 'Pohjois-Keski-Puolassa, ja siellä asuu noin 10 400 ihmistä. Kaupunki on kuuluisa '
      + 'maailman pisimmistä suolavesitorneistaan (graduation towers). Paikalliset suolaiset '
      + 'lähteet arvioitiin poikkeuksellisen arvokkaiksi, ja lähdettä nro 14 kutsuttiin '
      + 'luonnon ihmeeksi. Kun Wieliczka ja Bochnia joutuivat Itävallalle Puolan '
      + 'ensimmäisessä jaossa, viranomaiset kiinnostuivat Ciechocinekin ja läheisen Słońskin '
      + 'suolavaroista, ja Stanisław Staszicin aloitteesta laadittiin suolanvalmistushanke. '
      + 'Kylpylän ja lomakohteen kehitys alkoi vuonna 1836, ja vuonna 1867 kaupunki sai '
      + 'rautatieyhteyden Bydgoszczin ja Varsovan kanssa.',
    lahde: 'en-Wikipedia "Ciechocinek", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Puolan viranomaiset kiinnostuivat Ciechocinekin suolasta?',
      vaihtoehdot: [
        'Paikalta löydettiin hopeaa',
        'Preussi kielsi suolan viennin',
        'Wieliczka ja Bochnia joutuivat Itävallalle',
        'Lähteet olivat kuumia ja terveellisiä',
      ],
      oikea: 2,
      fakta: 'Lähteiden hoitovaikutukset kohdistuvat muun muassa sydän-, hengitys- ja tuki- ja '
        + 'liikuntaelinten sairauksiin.',
    },
  },
  {
    id: 'hahmotelma-kornik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kornik-f34d6bbe.jpg',
      lyhyt: 'Kórnikin uusgoottilainen linna peilautuu vallihaudan jäähän.',
      selite: 'Kórnikin linna kuvattuna vallihaudan puolelta: kuvauksen mukaan linna rakennettiin 1300-luvulla mutta muokattiin nykyiseen uusgoottilaiseen asuunsa. Näkyvissä ovat nelikulmainen torni, hammastetut harjat ja vaalea kivijulkisivu.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castillo_de_Kórnik,_Kórnik,_Polonia,_2016-12-21,_DD_05.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kornik-52dd2d95.jpg',
        lyhyt: 'Kórnikin linna 1880-luvun litografiassa.',
        selite: 'Napoleon Ordan litografia vuodelta 1880 Puolan historiallisten paikkojen albumista: linna kohoaa puiden takaa tornien ja hammastettujen harjojen kruunaamana, edustalla kävelee ihmisiä.',
        lahde: 'Kuva: Napoleon Orda, Wikimedia Commons (public domain).',
        tekija: 'Napoleon Orda',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Album_widokow_przedstawiajacych_miejsca_historyczne_Ksiestwa_Poznanskiego_i_Prus_Zachodnich_1880_(5414336)_(cropped).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-kornik-3ff3bc5c.jpg',
        lyhyt: 'Magnolian kukka Kórnikin arboretumissa.',
        selite: 'Lähikuva vaaleanpunertavasta magnolian kukasta Kórnikin arboretumissa.',
        lahde: 'Valokuva: 7oanna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: '7oanna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Magnolia_kornik_arboretum.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kórnikin linna',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka perusti Kórnikin arboretumin 1800-luvun alkupuolella?',
      'Kenelle kreivi Zamoyski testamenttasi linnan?',
    ],
    korostukset: ['arboretum|arboretum'],
    nappi: 'Działyńskien uusgoottilaistama linna Preussin Posenin läänissä; arboretum kasvaa',
    // 17.09055556 E / 52.24388889 N — en-Wikipedia "Kórnik Castle"
    laudat: {
      maailmankartta: { x: 6403, y: 1291.2 },
      europe: { x: 539.3, y: 519.6 },
    },
    teksti: 'Kórnikin linna on 1300-luvulla rakennettu linna Kórnikin kaupungissa '
      + 'Wielkopolskassa. Nykyisen uusgoottilaisen ilmeensä se sai vuonna 1855 tehdyssä '
      + 'muutostyössä, joka perustui osittain Karl Friedrich Schinkelin suunnitelmiin Tytus '
      + 'Działyńskille ja tämän pojalle Jan Kanty Działyńskille. Linnaa ympäröi Kórnikin '
      + 'arboretum, jonka kreivi Tytus Działyński perusti 1800-luvun alkupuolella; se on '
      + 'Puolan vanhin ja suurin ja Euroopan neljänneksi suurin, noin 40 hehtaaria ja yli 3 '
      + '300 taksonia. Kreivi Władysław Zamoyski testamenttasi linnan taidekokoelmineen ja '
      + 'arboretumeineen Puolan valtiolle ennen kuolemaansa vuonna 1924. Nykyään linnassa on '
      + 'museo ja Kórnikin kirjasto, jonka merkittäviin teoksiin kuuluu Adam Mickiewiczin '
      + 'Dziady-runoelman kolmannen osan alkuperäiskäsikirjoitus.',
    lahde: 'en-Wikipedia "Kórnik Castle", johdanto-osa ja osiot "Exterior of the castle" ja '
      + '"Interior of the castle" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lancut',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lancut-9dac8e4b.jpg',
      lyhyt: 'Łańcutin linnan pääjulkisivu kahden kupolikattoisen kulmatornin välissä.',
      selite: 'Łańcutin linna edestä katsottuna: vaalea, punaisin kentin koristeltu julkisivu, punatiilinen katto ja molemmissa päissä vihertävä kupolikattoinen torni. Edessä on leikattuja pensaskartioita ja sorapolku.',
      lahde: 'Valokuva: Janusz Pruchnik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Janusz Pruchnik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zamek_-_Lancut.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lancut-acc21f26.jpg',
        lyhyt: 'Gloriette eli pylväskaari Łańcutin linnan puistossa.',
        selite: 'Kuvauksen mukaan kyseessä on Łańcutin linnapuiston gloriette: keltainen, kaareva pylväikkö korinttilaisin pylväspäin, jonka takana ja ympärillä on vehreää puistoa.',
        lahde: 'Valokuva: Kroton, Wikimedia Commons (CC BY-SA 3.0 pl).',
        tekija: 'Kroton',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PL_-_Łańcut_-_park_zamkowy_-_2012-05-02--11-09-12-26.jpg',
        lisenssi: 'CC BY-SA 3.0 pl',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en',
      },
    ],
    nimi: 'Łańcutin linna',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitkä suvut olivat Łańcutin linnan tunnetuimmat omistajat?',
      'Kuka suku omisti linnan vuoteen 1816?',
    ],
    korostukset: ['Lubomirski|Lubomirskit'],
    nappi: 'Potockien palatsi Itävallan Galitsiassa; Lubomirskit myivät sen 1816',
    // 22.2346 E / 50.0685 N — en-Wikipedia "Łańcut Castle"
    laudat: {
      maailmankartta: { x: 6574.5, y: 1387.2 },
      europe: { x: 638.1, y: 576.8 },
    },
    teksti: 'Łańcutin linna on historiallisten rakennusten kompleksi Łańcutissa Subkarpaattien '
      + 'maakunnassa Kaakkois-Puolassa, ja sitä ympäröi puisto. Se oli aikanaan Pileckien, '
      + 'Lubomirskien ja Potockien suvun asuinpaikka, ja se on yksi Puolan virallisista '
      + 'kansallisista historiallisista monumenteista. Paikan omisti 1300-luvun '
      + 'jälkipuoliskolla Toporczykin suku, joka rakensi kukkulalle puulinnan. Nykyinen linna '
      + 'on peräisin 1600-luvulta, ja omistajat muuttivat sen myöhemmin palatsiasunnoksi. '
      + 'Lubomirskit omistivat sen vuoteen 1816 ja Potockit vuoteen 1944.',
    lahde: 'en-Wikipedia "Łańcut Castle", johdanto-osa ja osiot "Owners" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pszczyna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-pszczyna-07b70aba.jpg',
      lyhyt: 'Pszczynan linnan pohjoisjulkisivu.',
      selite: 'Pszczynan linna pohjoispuolelta: vaalea, punatiilikenttäinen julkisivu, mansardikatto ja edessä kaareva kivikaide leijonapatsaineen.',
      lahde: 'Valokuva: Paterm, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Paterm',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pszczyna_Castle_north_2012.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-pszczyna-9e966aca.jpg',
        lyhyt: 'Syksyinen valo Pszczynan linnapuistossa.',
        selite: 'Kuvauksen mukaan kuva on Pszczynan perintöarvoisesta linnapuistosta: aurinko paistaa sumun läpi keltaisten lehtien ja pienen puusillan ylle.',
        lahde: 'Valokuva: Jacek Cisło, Wikimedia Commons (CC BY-SA 3.0 pl).',
        tekija: 'Jacek Cisło',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Park_zamkowy_w_Pszczynie_03promykjck.jpg',
        lisenssi: 'CC BY-SA 3.0 pl',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/pl/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-pszczyna-4166e6ec.jpg',
        lyhyt: 'Pszczynan linnan vihreä salonki kultakehyksisine muotokuvineen.',
        selite: 'Sisäkuva Pszczynan linnasta: vaaleanvihreäseinäisessä salissa on kristallikruunu, kullattuja kehyksiä, peili ja takka sekä pehmustettuja huonekaluja.',
        lahde: 'Valokuva: Alexander Baxevanis from London, UK, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Alexander Baxevanis from London, UK',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pszczyna_Castle_Interior_(1800795630).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Pszczynan linna',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka ranskalainen arkkitehti johti palatsin uudistusta 1870-luvulla?',
      'Mikä säveltäjä vieraili palatsissa 1705?',
    ],
    korostukset: ['Destailleur|Destailleur'],
    nappi: 'Preussin Pleßin ruhtinaiden linna, jota Destailleur uudistaa 1870–1876',
    // 18.94027778 E / 49.97805556 N — en-Wikipedia "Pszczyna Castle"
    laudat: {
      maailmankartta: { x: 6464.7, y: 1391.1 },
      europe: { x: 574.9, y: 579.2 },
    },
    teksti: 'Pszczynan linna on klassististyylinen palatsi Pszczynan kaupungissa Etelä-Puolassa. '
      + 'Se rakennettiin linnaksi 1200-luvulla tai aiemmin goottilaiseen tyyliin, ja '
      + '1600-luvulla se rakennettiin uudelleen renessanssityyliin; 1700- ja 1800-luvuilla '
      + 'sen ulkoasua muutettiin osittain barokki-klassistiseksi. Linna oli '
      + 'Piast-herttuoiden, sitten saksalaisen von Promnitz -suvun 1500-luvun puolivälistä '
      + '1700-luvun puoliväliin ja myöhemmin von Pless -suvun asuinpaikka. Vuonna 1742 Pless '
      + 'liitettiin Preussin kuningaskuntaan, ja vuosina 1870–1876 ranskalainen arkkitehti '
      + 'Gabriel-Hippolyte Destailleur johti palatsin uudistusta. Vuonna 1705 säveltäjä Georg '
      + 'Philipp Telemann oli Promnitzin kapellimestarina ja vietti palatsissa paljon aikaa '
      + 'tutustuen puolalaiseen ja määriläiseen kansanmusiikkiin.',
    lahde: 'en-Wikipedia "Pszczyna Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-lodz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lodz-e9304b2b.jpg',
      lyhyt: 'Izrael Poznańskin palatsi Łódźissa, vaalea uusbarokkinen kulmarakennus kadun varrella.',
      selite: 'Kuvassa on Izrael Poznańskin palatsi Łódźissa. Koristeellisessa kulmarakennuksessa on runsaasti veistoskoristeita julkisivussa ja kattojen reunoilla.',
      lahde: 'Valokuva: Lestat (Jan Mehlich), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Lestat (Jan Mehlich)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%81%C3%B3d%C5%BA_-_Pa%C5%82ac_Izraela_Pozna%C5%84skiego.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-lodz-d377012e.jpg',
        lyhyt: 'Ilmakuva Manufakturan punatiilisista tehdasrakennuksista Łódźin keskustan reunalla.',
        selite: 'Ilmakuvassa näkyy entisen tehdasalueen punatiiliset rakennukset ja tornimainen päärakennus, jossa on Manufaktura-kyltti. Alue on nykyään Łódźin Manufaktura-keskus.',
        lahde: 'Valokuva: Kapitel, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kapitel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lodz_Manufaktura_dron_(2).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Łódź',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Kenen Valkoisessa tehtaassa Puolan ensimmäinen höyrykäyttöinen kangaspuu aloitti toimintansa?',
      'Kuka rakennutti kaksitoista tehdasta ja eklektisen palatsin vuosina 1872–1892?',
    ],
    korostukset: ['tekstiili|tekstiilejään'],
    nappi: 'Venäjän Puolan tekstiilikaupunki, jonka tehtaat kasvavat kiivaimmin vuosina 1870–1890',
    // 19.45472222 E / 51.77694444 N — en-Wikipedia "Łódź"
    laudat: {
      maailmankartta: { x: 6481.8, y: 1312 },
      europe: { x: 584.7, y: 531.9 },
    },
    teksti: 'Łódź on Keski-Puolan entinen teollisuuskeskus, joka on nykyään maan neljänneksi '
      + 'suurin kaupunki ja jossa asuu noin 640 000 ihmistä. Vuonna 1851 Venäjän viranomaiset '
      + 'poistivat Kongressi-Puolalle asetetun tullimuurin, minkä ansiosta kaupunki saattoi '
      + 'viedä tekstiilejään vapaasti Venäjälle, jossa kysyntä oli suurta; Puolan ensimmäinen '
      + 'höyrykäyttöinen kangaspuu oli aloittanut toimintansa Ludwik Geyerin Valkoisessa '
      + 'tehtaassa jo vuonna 1839. Rautatiet, kuten vuonna 1865 avattu Łódźin ja Koluszkin '
      + 'yhteys, vauhdittivat teollisuutta edelleen. Kaupungin rakennukset ja laitokset '
      + 'syntyivät teollisuusmagnaattien, erityisesti Karl Wilhelm Scheiblerin ja Izrael '
      + 'Poznańskin, rahoilla, ja Poznański rakensi vuosina 1872–1892 suuren '
      + 'tekstiilivalmistuskokonaisuuden, johon kuului kaksitoista tehdasta, voimalaitoksia, '
      + 'työläistaloja ja eklektinen palatsi. Voimakkaimman teollistumisen vuosina 1870–1890 '
      + 'kaupungissa oli myös sosiaalista eriarvoisuutta ja ankarat työolot.',
    lahde: 'en-Wikipedia "Łódź", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä muutos vuonna 1851 auttoi Łódźin tekstiiliteollisuutta kasvamaan?',
      vaihtoehdot: [
        'Venäjä poisti tullimuurin Kongressi-Puolalta',
        'Preussi rakensi uuden kanavan Łódźiin',
        'Kaupunki sai oman kuninkaansa',
        'Höyrykoneet kiellettiin tehtaista',
      ],
      oikea: 0,
      fakta: 'Scheiblerin Księży Młyn oli vuosisadan lopulla yksi Euroopan suurimmista '
        + 'teollisuuskomplekseista ja työllisti 5 000 ihmistä yhdessä laitoksessa.',
    },
  },
  {
    id: 'hahmotelma-bochnia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-bochnia-e1677404.jpg',
      lyhyt: 'Bochnian suolakaivoksen Campi-kuilun nostotorni ja kaivoksen hallintorakennukset.',
      selite: 'Kuvassa näkyy Campi-kuilun nostotorni ja Bochnian suolakaivoksen rakennuksia; keskellä olevassa rakennuksessa on kuvauksen mukaan historiallinen höyrykone.',
      lahde: 'Valokuva: Kj, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kj',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%22Campi%22_shaft_of_Bochnia_Salt_Mine.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-bochnia-74b113f5.jpg',
        lyhyt: 'Bochnian suolakaivoksen Ważyn-kammio, jonka holvissa näkyvät raidalliset suolakerrostumat.',
        selite: 'Suolakaivoksen Ważyn-kammiossa näkyvät kuvauksen mukaan raidalliset suolakerrokset kammion seinässä ja katossa. Kammiossa on puulattia ja pallokenttä.',
        lahde: 'Valokuva: Adrian Tync, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Adrian Tync',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bochnia_salt_mine_Wazyn_Chamber_2023.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bochnian suolakaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Milloin Bochnian suolakaivos perustettiin?',
      'Minkä kuninkaallisen yhtiön osaksi kaivos tuli?',
    ],
    korostukset: ['suolakaivos|suolakaivos'],
    nappi: 'Itävallan Galitsian suolakaivos, jossa louhitaan suolaa jo 1248 alkaen',
    // 20.4175 E / 49.96916667 N — en-Wikipedia "Bochnia Salt Mine"
    laudat: {
      maailmankartta: { x: 6513.9, y: 1391.5 },
      europe: { x: 603.2, y: 579.4 },
    },
    teksti: 'Bochnian suolakaivos on yksi maailman vanhimmista suolakaivoksista ja Puolan vanhin '
      + 'kaupallinen yritys. Se perustettiin vuonna 1248, kun suolaa oli löydetty alueelta '
      + '1100- ja 1200-luvuilla, ja siitä tuli osa kuninkaallista Krakovan suolayhtiötä (Żupy '
      + 'krakowskie). Kaivos lopetti suolan tuotannon vuonna 1990 mutta säilyi '
      + 'matkailukohteena, ja se kuuluu Unescon maailmanperintöluetteloon Wieliczkan kohteen '
      + 'laajennuksena vuodesta 2013. Kaivoksen kammiot, kuilut ja käytävät muodostavat '
      + 'maanalaisen kaupungin, jossa suurin säilynyt kammio on muutettu sanatorioksi. '
      + 'Kaivoksen kappelin läpi kulkevat junaraiteet.',
    lahde: 'en-Wikipedia "Bochnia Salt Mine", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mihin Bochnian suolakaivoksen suurin säilynyt kammio on muutettu?',
      vaihtoehdot: [
        'Maanalaiseksi oluttuvaksi',
        'Sanatorioksi',
        'Kirjastoksi',
        'Pommisuojaksi',
      ],
      oikea: 1,
      fakta: 'Kaivoksen kappelin läpi kulkevat junaraiteet.',
    },
  },
  {
    id: 'hahmotelma-tarnowskie-gory',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-tarnowskie-gory-bfc3494c.jpg',
      lyhyt: 'Vedellä täyttynyt kaivoskäytävä Sztolnia Czarnego Pstrąga -sisäänajotunnelissa Tarnowskie Górissa.',
      selite: 'Kuva on otettu Tarnowskie Górin Sztolnia Czarnego Pstrąga -tunnelissa. Kalliosta louhittu holvattu käytävä jatkuu veden peittämänä kohti valoa.',
      lahde: 'Valokuva: Stowarzyszenie Miłośników Ziemi Tarnogórskiej, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Stowarzyszenie Miłośników Ziemi Tarnogórskiej',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SZTOLNIA_G%C5%81%C4%98BOKA_FRYDERYK_-_trasa_turystyczna_pn_Sztol;nia_Czarnego_Pstr%C4%85ga_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-tarnowskie-gory-25b9d6c0.jpg',
        lyhyt: 'Tarnowskie Górin historiallisen kaivoksen kaivosmuseon rakennus ja nostotorni.',
        selite: 'Kuvassa on kaivosmuseon rakennus ja kuilun nostotorni Tarnowskie Górin historiallisella kaivosalueella.',
        lahde: 'Valokuva: Paweł Michalik, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Paweł Michalik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zabytkowa_Kopalnia_Rud_Srebronosnych_Tarnowskie_Gory_1_20070627.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-tarnowskie-gory-58aca2e5.jpg',
        lyhyt: 'Vanhat kaivosvaunut kiskoillaan hämärässä kaivoskäytävässä.',
        selite: 'Historiallisen Tarnowskie Górin malmikaivoksen (Zabytkowa Kopalnia Rud Srebronośnych) maanalaisessa osassa on säilynyt vanha puinen kaivosvaunu ja pyörällinen alusta kiskoilla.',
        lahde: 'Valokuva: Wojt ek, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Wojt ek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koplania_Zabytkowa_Srebra.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Tarnowskie Górin hopeakaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä sana góry tarkoitti vanhassa puolassa?',
      'Mistä kylästä Tarnowskie Górin nimen alkuosa tulee?',
    ],
    korostukset: ['Newcomen|Newcomenin'],
    nappi: 'Preussin Tarnowitz, jossa hopeaa louhitaan höyrykoneiden avulla vuodesta 1788',
    // 18.85833333 E / 50.44444444 N — en-Wikipedia "Tarnowskie Góry"
    laudat: {
      maailmankartta: { x: 6461.9, y: 1370.8 },
      europe: { x: 573.3, y: 566.9 },
    },
    teksti: 'Tarnowskie Góry on Sleesian kaupunki Etelä-Puolassa Katowicen lähellä, ja siellä '
      + 'sijaitsee Unescon maailmanperintökohde, Tarnowskie Górin historiallinen hopeakaivos. '
      + 'Kaupungin nimi tulee Tarnowice-kylästä ja sanasta góry, joka vanhassa puolassa '
      + 'tarkoitti kaivoksia. Vuonna 1788 Walesista tuotiin Newcomenin ilmakehäkone '
      + 'tyhjentämään maanalaisia vesiä, mikä sytytti teollisen vallankumouksen paikalla; '
      + 'lopulta käytössä oli kahdeksan höyrykonetta. Vuonna 1803 kaupungissa perustettiin '
      + 'yksi maailman ensimmäisistä kaivoskouluista. Hopeamalmin lähde ehtyi 1900-luvun '
      + 'alussa, ja louhinta loppui kokonaan.',
    lahde: 'en-Wikipedia "Tarnowskie Góry", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä varten Walesista tuotu Newcomenin kone asennettiin Tarnowskie Góryyn vuonna '
        + '1788?',
      vaihtoehdot: [
        'Malmin murskaamiseen',
        'Hopean sulattamiseen',
        'Maanalaisten vesien poistamiseen',
        'Kaivoksen valaisemiseen',
      ],
      oikea: 2,
      fakta: 'Kuningas Jan III Sobieski lepäsi kaupungissa vuonna 1683 matkallaan Wienin '
        + 'taisteluun.',
    },
  },
  {
    id: 'hahmotelma-boleslawiec',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-boleslawiec-2b625a1f.jpg',
      lyhyt: 'Sokerikko ja kermakannu Bolesławiecin keramiikkaa, sinivalkoinen pisteköynnös.',
      selite: 'Kuvassa on kaksikahvainen sokerikko kansineen ja kermakannu Bolesławiecin keramiikkaa. Tummansinistä lasitetta koristavat valkoiset rengasmaiset pisteet.',
      lahde: 'Valokuva: Jacek Halicki, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jacek Halicki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2023_Ceramika_boles%C5%82awiecka_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-boleslawiec-a37dc602.jpg',
        lyhyt: 'Bolesławiecin rautatieviadukti valaistuna hämärässä.',
        selite: 'Kuvassa on Bolesławiecin rautatieviadukti, jonka kaaret on valaistu iltahämärässä.',
        lahde: 'Valokuva: Qasinka, Wikimedia Commons (CC0).',
        tekija: 'Qasinka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2023_Boles%C5%82awiec_railway_viaduct.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/pol-nosto-boleslawiec-90aefe99.jpg',
        lyhyt: 'Bolesławiecin torin (Rynek) värikkäät porvarintalot aamuvalossa.',
        selite: 'Kuvassa on Bolesławiecin Rynek-tori ja sen reunoilla värikkäät kivitalojen julkisivut. Etualalla on katulyhty ja kadun kivetystä.',
        lahde: 'Valokuva: Tournasol7, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Tournasol7',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rynek_in_Boleslawiec_(2).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Bolesławiec',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Millä saksankielisellä nimellä Bolesławiecin keramiikkaa kutsutaan?',
      'Mikä Bolesławiecin ympäristössä soveltuu savenvalantaan?',
    ],
    korostukset: ['Bunzlauer|Bunzlauer'],
    nappi: 'Preussin Bunzlau, jonka ruskeat saviastiat tunnetaan kaikkialla',
    // 15.56666667 E / 51.26666667 N — en-Wikipedia "Bolesławiec"
    laudat: {
      maailmankartta: { x: 6352.2, y: 1334.6 },
      europe: { x: 510.1, y: 545.3 },
    },
    teksti: 'Bolesławiec on historiallinen kaupunki Bóbr-joen varrella Ala-Sleesiassa '
      + 'Lounais-Puolassa; se perustettiin 1200-luvulla ja on tunnettu pitkästä '
      + 'keramiikkaperinteestään ja vanhastakaupungistaan. Keramiikkaa kutsutaan kaupungin '
      + 'saksankielisen nimen mukaan Bunzlauer-keramiikaksi, ja se kehittyi kansanperinteestä '
      + 'omaksi keramiikkalajikseen, joka erottuu muodostaan, massastaan, lasitteestaan ja '
      + 'koristelustaan; se lasketaan Euroopan tärkeimpiin kansankeramiikan perinteisiin. '
      + 'Alueen savi soveltuu hyvin savenvalantaan: astiat muotoiltiin potkukiekolla, '
      + 'kastettiin lietelasitteeseen ja poltettiin suorakaiteen muotoisessa uunissa jopa 1 '
      + '320 asteessa. Napoleon vieraili kaupungissa kuusi kertaa Napoleonin sotien aikana, '
      + 'ja Venäjän kenraalifeldmarsalkka Kutuzov kuoli siellä 28. huhtikuuta 1813.',
    lahde: 'en-Wikipedia "Bolesławiec", johdanto-osa ja osiot "History" ja "Pottery" '
      + '(tarkistettu 19.9.2026).',
  },
];
