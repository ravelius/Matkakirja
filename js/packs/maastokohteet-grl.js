/*
 * MAASTOKOHTEET — GRL. Grönlannin maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Grönlannilla ei ollut yhtäkään karttamerkkiä eikä eläintäkyä
 * (docs/moduulit/karttanostot-kattavuus.md, Pohjois-Amerikka). Tämä on
 * maailman erän M4 Grönlannin osuus: kahdeksan KOHDETTA ja kolme
 * MAASTOKOHDETTA Euroopan erien mallilla (js/packs/maastokohteet-isl.js).
 *
 * EI AINEISTOTIEDOSTOA. tools/maastoaineisto/GRL.json-tiedostoa ei ole,
 * joten maastokohteet on valittu käsin (maan korkein huippu, Unescon
 * jäävuono ja toiseksi suurin saari) ja koordinaatit on laskettu
 * koneella työkalun kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian artikkelista).
 *
 * LAUDAN POHJOISREUNA RAJASI ERÄN, JA SE ON SYYTÄ LUKEA ENNEN
 * TÄYDENNYSTÄ. Maailmankartta on Millerin lieriö, jonka yläreuna on
 * 76°N (tools/johda-maastokohteet.mjs MAAILMA.pohjoinen): sitä
 * pohjoisempi piste saa NEGATIIVISEN y-koordinaatin eli jää laudan
 * yläreunan taakse. Siksi tästä erästä jäivät pois Pituffik
 * (Thule, 76,5°N), Camp Century (77,2°N) ja Qaanaaq — ne olisivat
 * olleet kortteina olemassa mutta pelaajan ulottumattomissa. Kaikki
 * alla olevat pisteet ovat 76°N eteläpuolella, ja pohjoisin niistä on
 * Koillis-Grönlannin kansallispuiston merkki tasan laudan reunalla.
 *
 * GRÖNLANTI ON YLEISELLÄ REITILLÄ (tools/fokuskartta/maat.mjs): lehdelle
 * ei ole poltettu yhtään maastonimeä, joten merkin nimiö on nimen ainoa
 * esiintymä kartalla. Yksikään nimi ei ole laudan omassa nimitaulussa
 * (js/packs/maailmankartta-nimet.js) — sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Grönlannilla rajaus on olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.GRL), joten vartio pätee ja jokainen piste on
 * tarkistettu sitä vasten. Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Grönlannin ainoa pelikaupunki
 * on Nuuk, ja etäisyys on mitattu jokaiseen js/packs/maailmankartta.js
 * CITIES-kaupunkiin. Lähin uusi merkki on Kangerlussuaq 148,9
 * lautayksikön päässä Nuukista (raja KAUPUNGIN_KOHDALLA_SADE on 7,
 * js/fokuskohteet.js).
 *
 * VAIN MAAILMANKARTAN RIVI (erillislaudasta luovuttu, Raamattu
 * 30.8.2026). KUVATON ERÄ. Faktat en-Wikipediasta 6.9.2026.
 */
export const MAASTOKOHTEET_GRL = [
  /* ================================================================
   * MAASTO — huippu, jäävuono ja saari.
   * ============================================================== */
  {
    id: 'gunnbjorn-fjeld',
    nimi: 'Gunnbjørn Fjeld',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä nunatak on?',
      'Miten kangastus voi tuoda Islannin näkyviin?',
    ],
    korostukset: ['nunatak|nunatak'],
    nappi: 'Kallio, joka työntyy jään läpi',
    // -29.8981 E / 68.9186 N — en-Wikipedia "Gunnbjørn Fjeld"
    // Lähin pelikaupunki: Islanti 378,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4836.7, y: 446.1 },
    },
    teksti: 'Gunnbjørn Fjeld on Grönlannin korkein vuori ja korkein kohta koko '
      + 'Pohjois-Amerikassa mantereen ulkopuolella. Se on nunatak eli jäätikön läpi '
      + 'pistävä kallioinen huippu, ja se kohoaa Watkinsin vuoristossa itärannikolla, jossa '
      + 'on useita muitakin yli 3 500 metrin huippuja. Korkeudeksi ilmoitetaan yleensä noin '
      + '3 700 metriä, joskin luvut vaihtelevat hieman. Vuori on 530 kilometrin päässä '
      + 'Islannin Snæfellsjökullista — suorat valonsäteet eivät riitä näyttämään molempia '
      + 'yhtä aikaa, mutta arktinen kangastus taittaa valoa ilman lämpötilaerojen vuoksi '
      + 'niin, että keskinäinen näkyvyys on esitetty mahdolliseksi.',
    lahde: 'en-Wikipedia "Gunnbjørn Fjeld", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'ilulissatin-jaavuono',
    nimi: 'Ilulissatin jäävuono',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka nopeasti Sermeq Kujalleq liikkuu?',
      'Miksi suuret jäävuoret jäävät joskus vuonoon vuosiksi?',
    ],
    korostukset: ['poikii|poikii'],
    nappi: 'Kaksikymmentä miljardia tonnia jäätä vuodessa',
    // -50.9 E / 69.1667 N — en-Wikipedia "Ilulissat Icefjord"
    // Lähin pelikaupunki: Nuuk 272,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4136.7, y: 431.6 },
    },
    teksti: 'Ilulissatin jäävuono kulkee 40 kilometriä Grönlannin mannerjäätiköltä Diskonlahteen '
      + 'Ilulissatin kaupungin eteläpuolella, 250 kilometriä napapiiristä pohjoiseen. Unesco '
      + 'otti sen luetteloonsa 2004 sekä luonnonkauneuden että tieteen vuoksi: vuonon '
      + 'Sermeq Kujalleq eli Jakobshavnin jäätikkö on pohjoisen pallonpuoliskon tuottoisin '
      + 'jäätikkö ja keskeinen ilmastotutkimuksen kohde. Se liikkuu 20–35 metriä '
      + 'vuorokaudessa ja poikii vuodessa noin 20 miljardia tonnia jäävuoria. Vuoret voivat '
      + 'olla kilometrin korkuisia — niin korkeita, etteivät ne kellu vuonon matalikoiden '
      + 'yli vaan jäävät pohjaan kiinni joskus vuosiksi, kunnes takaa työntyvä jää murtaa ne. '
      + 'Vuonon jää on jopa 250 000 vuotta vanhaa.',
    lahde: 'en-Wikipedia "Ilulissat Icefjord", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'diskonsaari',
    nimi: 'Diskonsaari',
    tyyppi: 'saari',
    kysymykset: [
      'Mitä Qeqertarsuaq tarkoittaa?',
      'Kuinka suuri saari on?',
    ],
    korostukset: ['Qeqertarsuaq|Qeqertarsuaq'],
    nappi: 'Grönlannin toiseksi suurin saari',
    // -53.5 E / 69.8 N — en-Wikipedia "Disko Island"
    // Lähin pelikaupunki: Nuuk 324,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4050, y: 394.3 },
    },
    teksti: 'Diskonsaari on suuri saari Baffininlahdella Grönlannin länsirannikon edustalla. '
      + 'Sen pinta-ala on 8 578 neliökilometriä, mikä tekee siitä Grönlannin toiseksi '
      + 'suurimman saaren heti pääsaaren jälkeen ja yhden maailman sadasta suurimmasta '
      + 'saaresta. Grönlanniksi se on Qeqertarsuaq, "iso saari", sanasta qeqertaq eli saari. '
      + 'Hallinnollisesti saari kuuluu Qeqertalikin kuntaan, vaikka se sijaitsee eteläisen '
      + 'Avannaatan kunnan edustalla.',
    lahde: 'en-Wikipedia "Disko Island", johdanto-osa ja osio "Etymology" (tarkistettu '
      + '6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ M4, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'hvalsey',
    nimi: 'Hvalsey',
    tyyppi: 'historia',
    kysymykset: [
      'Kenelle kirkko kuului 1300-luvulla?',
      'Mikä oli Itäinen asutus?',
    ],
    korostukset: ['Eystribyggð|Eystribyggð'],
    nappi: 'Grönlannin parhaiten säilyneet viikinkiraunit',
    // -45.2667 E / 60.7667 N — en-Wikipedia "Hvalsey"
    // Lähin pelikaupunki: Nuuk 255,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4324.4, y: 887.3 },
    },
    teksti: 'Hvalseyjarfjord eli grönlanniksi Qaqortukulooq on vuono Qaqortoqin takana, ja '
      + 'siellä ovat Grönlannin suurimmat ja parhaiten säilyneet norjalaisraunit alueella, '
      + 'jota kutsutaan Itäiseksi asutukseksi (Eystribyggð). Unesco otti paikan luetteloonsa '
      + '2017 osana Kujataa Greenland -kohdetta. Islantilaisen Landnámabókin mukaan tilan '
      + 'perusti Punaisen Eirikin setä Þorkell Farserkur 900-luvun lopulla. Ivar Bardarsonin '
      + 'noin vuonna 1360 laatiman selonteon aikaan tila tunnettiin nimellä Þjóðhildarstaðir, '
      + 'ja 1300-luvulla se kuului Norjan kuninkaille: selonteon mukaan vuonossa on kirkko, '
      + 'joka omistaa koko vuonon, ja siellä seisoo kuninkaalle kuuluva suuri tila.',
    lahde: 'en-Wikipedia "Hvalsey", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ivittuut',
    nimi: 'Ivittuut',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi kryoliitti oli niin tärkeää?',
      'Miksi Yhdysvallat halusi suojella tätä kaivosta sodassa?',
    ],
    korostukset: ['kryoliitti|kryoliittia'],
    nappi: 'Kivi, jota ilman alumiini olisi jäänyt kalliiksi',
    // -48.1783 E / 61.205 N — en-Wikipedia "Ivittuut"
    // Lähin pelikaupunki: Nuuk 180,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4227.4, y: 865.1 },
    },
    teksti: 'Ivittuut on hylätty kaivoskaupunki Grönlannin lounaisrannikolla, entisen '
      + 'norjalaisen Keskimmäisen asutuksen raunioilla. Se on yksi harvoista paikoista '
      + 'maailmassa, joista on löydetty luonnossa esiintyvää kryoliittia — natriumin ja '
      + 'alumiinin fluoridia, jota tarvitaan alumiinin erottamiseen. Esiintymä löytyi 1799, '
      + 'ja tanskalaiset insinöörit alkoivat louhia sitä 1859; vuonna 1864 Kriolit Mine og '
      + 'Handels Selskabet sai louhintaan monopolin. Kun Hall–Héroult-menetelmä keksittiin '
      + '1884, harvinaisen kiven arvo moninkertaistui, sillä sulana se liuottaa '
      + 'alumiinioksidin ja tekee elektrolyysistä kannattavaa. Juuri Ivittuutin kaivos oli '
      + 'keskeinen syy siihen, että Yhdysvallat miehitti Grönlannin toisessa '
      + 'maailmansodassa: Kangilinnguitin laivastotukikohta perustettiin vartioimaan sitä. '
      + 'Louhinta jatkui vuoteen 1987.',
    lahde: 'en-Wikipedia "Ivittuut", johdanto-osa ja osio "History", sekä "Cryolite", '
      + 'johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kangerlussuaq',
    nimi: 'Kangerlussuaq',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi lentokenttä rakennettiin juuri tänne?',
      'Mistä myskihärät tulivat Kangerlussuaqiin?',
    ],
    korostukset: ['Bluie West-8|Bluie West-8'],
    nappi: 'Sotilastukikohdasta Grönlannin porttikäytäväksi',
    // -50.6889 E / 67.0167 N — en-Wikipedia "Kangerlussuaq"
    // Lähin pelikaupunki: Nuuk 148,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4143.7, y: 555 },
    },
    teksti: 'Kangerlussuaq eli "iso vuono" on länsigrönlantilainen taajama 190 kilometriä '
      + 'pitkän vuonon pohjukassa. Kylä ja sen lentokenttä rakennettiin yhdysvaltalaiseksi '
      + 'tukikohdaksi toisen maailmansodan aikana ja sen jälkeen — ensin nimellä Bluie West-8, '
      + 'sitten Sondrestrom Air Base — ja siirtyivät grönlantilaiseksi taajamaksi 1992. '
      + 'Kangerlussuaqin lentokenttä oli Grönlannin tärkein lentoliikenteen solmu, kunnes '
      + 'uusittu ja laajennettu Nuukin lentokenttä avattiin 2024. Se on maan ainoa taajama, '
      + 'joka ei ole varsinaisen valtameren rannalla. Alueella on Grönlannin monipuolisin '
      + 'maaeläimistö: myskihäriä, karibuja ja tunturihaukkoja — myskihärät tuotiin '
      + 'Ammalortup Nunaan ylängölle keinotekoisesti, 27 eläimen istutuksena. Noin 399 '
      + 'asukkaan kylä elää lähes kokonaan lentokentästä ja matkailusta.',
    lahde: 'en-Wikipedia "Kangerlussuaq", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'gronlannin-jaatikko',
    nimi: 'Grönlannin jäätikkö',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka paksu jäätikkö on paksuimmillaan?',
      'Mitä jäätikön alta löytyy?',
    ],
    korostukset: ['mannerjäätikkö|mannerjäätikkö'],
    nappi: 'Maailman toiseksi suurin jäämassa',
    // -40 E / 72 N (jäätikön keskiosa) — en-Wikipedia "Greenland ice sheet"
    // Lähin pelikaupunki: Nuuk 566,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4500, y: 260.6 },
    },
    teksti: 'Grönlannin mannerjäätikkö on maailman toiseksi suurin jäämassa. Se on '
      + 'keskimäärin 1 673 metriä ja paksuimmillaan yli 3 488 metriä paksu, pohjois–'
      + 'eteläsuunnassa lähes 2 900 kilometriä pitkä ja leveimmillään 1 100 kilometriä '
      + '77. leveyspiirin tienoilla. Se peittää 1,71 miljoonaa neliökilometriä eli noin 80 '
      + 'prosenttia Grönlannin pinta-alasta. Grönlannissa on ollut suuria jäätiköitä ainakin '
      + '18 miljoonaa vuotta, mutta yhtenäinen jäätikkö peitti saaren ensi kerran noin 2,6 '
      + 'miljoonaa vuotta sitten; vanhin tunnettu jää on noin miljoona vuotta vanha. '
      + 'Jäätikön alla on vuoria ja järvialtaita. Jos koko jäätikön 2,9 miljoonaa '
      + 'kuutiokilometriä sulaisi, merenpinta nousisi noin 7,4 metriä.',
    lahde: 'en-Wikipedia "Greenland ice sheet", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'sisimiut',
    nimi: 'Sisimiut',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä Sisimiut tarkoittaa?',
      'Miksi satama on tärkeä koko Länsi-Grönlannille?',
    ],
    korostukset: ['Saqqaq|Saqqaq-kulttuurin'],
    nappi: 'Kettureikien asukkaat, 4 500 vuotta',
    // -53.6722 E / 66.9389 N — en-Wikipedia "Sisimiut"
    // Lähin pelikaupunki: Nuuk 177,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4044.3, y: 559.4 },
    },
    teksti: 'Sisimiut on Qeqqatan kunnan pääkaupunki ja Grönlannin toiseksi suurin kaupunki, '
      + 'noin 320 kilometriä Nuukista pohjoiseen Davisinsalmen rannalla. Nimi tarkoittaa '
      + '"kettureikien luona asuvia". Paikalla on asuttu 4 500 vuotta: ensin Saqqaq-kulttuurin '
      + 'väki, sitten Dorset-kulttuuri ja lopulta thulelaiset, joiden inuiittijälkeläisiä '
      + 'nykyasukkaat suurimmaksi osaksi ovat; tanskalaiset tulivat 1720-luvulla lähetyssaarnaaja '
      + 'Hans Egeden johdolla. Kalastus on pääelinkeino, ja kaupunki on maan pohjoisin ympäri '
      + 'vuoden jäätön satama: sieltä lähtevät huoltolaivat Uummannaqin vuonon ja Upernavikin '
      + 'saariston pieniin kyliin ja aina Qaanaaqiin asti.',
    lahde: 'en-Wikipedia "Sisimiut", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'uummannaq',
    nimi: 'Uummannaq',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä elokuva kuvattiin Uummannaqissa 1932?',
      'Miksi vuorelle nouseminen vaatii kiipeilytaitoja?',
    ],
    korostukset: ['marmori|marmorilouhos'],
    nappi: 'Sydämenmuotoinen vuori keskellä vuonoa',
    // -52.1264 E / 70.6747 N — en-Wikipedia "Uummannaq"
    // Lähin pelikaupunki: Nuuk 365,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 4095.8, y: 341.9 },
    },
    teksti: 'Uummannaq on kaupunki samannimisellä saarella Avannaatan kunnassa Länsi-'
      + 'Grönlannissa. Siellä asui 1 407 ihmistä vuonna 2020, mikä tekee siitä Grönlannin '
      + 'kahdeksanneksi suurimman kaupungin, ja siellä on maan pohjoisin lauttasatama. '
      + 'Kaupunki perustettiin 1763 nimellä Omenak, ja se elää metsästyksestä ja '
      + 'kalastuksesta; siellä on säilyketehdas ja marmorilouhos. Saari on 590 kilometriä '
      + 'napapiiristä pohjoiseen Uummannaqin vuonon eteläisessä haarassa, ja sen yllä kohoaa '
      + 'jyrkästi 1 170-metrinen Uummannaqin vuori, jolle nouseminen vaatii kiipeilytaitoja. '
      + 'Vuonna 1932 Arnold Fanckin ohjaama Universal Greenland -filmiretkikunta kuvasi '
      + 'lähistöllä elokuvan S.O.S. Eisberg.',
    lahde: 'en-Wikipedia "Uummannaq", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'ittoqqortoormiit',
    nimi: 'Ittoqqortoormiit',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka kaukana on lähin toinen kylä?',
      'Kenen mukaan paikka nimettiin Scoresbysundiksi?',
    ],
    korostukset: ['aikavyöhyke|aikavyöhyke'],
    nappi: 'Maailman eristyneimpiä kyliä',
    // -21.9647 E / 70.4853 N — en-Wikipedia "Ittoqqortoormiit"
    // Lähin pelikaupunki: Islanti 358,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5101.2, y: 353.3 },
    },
    teksti: 'Ittoqqortoormiit on Itä-Grönlannin kylä Sermersooqin kunnassa, ja sitä on '
      + 'kuvattu yhdeksi maailman eristyneimmistä asutuksista: asukkaita on 329. Nimi '
      + 'tarkoittaa itägrönlantilaisittain "ison talon asukkaita", ja vanha nimi Scoresbysund '
      + 'tulee englantilaiselta valaanpyytäjältä ja tutkimusmatkailijalta William Scoresbyltä, '
      + 'joka kartoitti seudun ensimmäisenä eurooppalaisena 1822. Kylä sijaitsee Liverpool '
      + 'Landilla Kangertittivaqin vuonon suulla, ja lähin toinen grönlantilainen kylä Kulusuk '
      + 'on 831 kilometrin päässä — lähempänä on Islannin Grímseyn Sandvík, 466 kilometriä. '
      + 'Vuoteen 2023 asti kylän aikavyöhyke oli kaksi tuntia edellä muuta Grönlantia.',
    lahde: 'en-Wikipedia "Ittoqqortoormiit", johdanto-osa ja osio "Geography" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'koillis-gronlannin-kansallispuisto',
    nimi: 'Koillis-Grönlannin kansallispuisto',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka moni maailman valtio on tätä puistoa pienempi?',
      'Milloin puisto sai nykyisen kokonsa?',
    ],
    korostukset: ['kansallispuisto|kansallispuisto'],
    nappi: 'Maailman suurin kansallispuisto',
    // -25 E / 76 N (puiston sisäosa; laudan pohjoisreuna) — en-Wikipedia
    // "Northeast Greenland National Park"
    // Lähin pelikaupunki: Islanti 719,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5000, y: 0 },
    },
    teksti: 'Koillis-Grönlannin kansallispuisto on maailman suurin kansallispuisto ja '
      + 'kymmenenneksi suurin suojelualue — kaikki sitä suuremmat ovat pääosin merta. Puisto '
      + 'perustettiin 1974 ja laajennettiin nykyiseen kokoonsa 1988, ja se suojelee 972 000 '
      + 'neliökilometriä Grönlannin sisäosia ja koillisrannikkoa. Se on siis suurempi kuin '
      + 'Tansania mutta pienempi kuin Egypti — ja suurempi kuin 166 maailman 195 valtiosta. '
      + 'Puisto oli Tanskan kuningaskunnan ensimmäinen kansallispuisto ja on yhä Grönlannin '
      + 'ainoa. Suuri osa sen sisäosista on mannerjäätikköä, mutta rannikolla ja pohjoisessa '
      + 'Peary Landissa on laajoja jäättömiä alueita.',
    lahde: 'en-Wikipedia "Northeast Greenland National Park", johdanto-osa ja osio '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
];
