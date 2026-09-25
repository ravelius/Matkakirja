/*
 * MAASTOKOHTEET — PNG. Papua-Uuden-Guinean kohteet ja maasto.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Papua-Uudella-Guinealla ei ollut yhtäkään karttamerkkiä ennen tätä
 * erää (docs/moduulit/karttanostot-kattavuus.md, Oseania). Erä M2 antaa
 * maalle kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA; eläintäky
 * (paratiisilintu) oli jo olemassa, ja kaksi skandaalia asuu
 * js/packs/skandaalit.js:ssä.
 *
 * Tiedoston paikka, reitti, projektio ja kuvattomuus on perusteltu
 * sisarpakissa js/packs/maastokohteet-aus.js — sama erä, sama ratkaisu.
 *
 * LEHDEN RAJAUS TARKISTETTU. Vartio 7a (tools/savukkeet/
 * savuke-maastokohteet.mjs) vaatii, että kohde osuu maan fokuslehden
 * rajaukseen, ja PNG:llä rajaus on olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.PNG: x 10437,60…11122,96, y 3194,63…3663,79). Kaikki
 * yksitoista riviä on mitattu sen sisään; rajaus ulottuu idässä
 * Bougainvillelle asti, joten Panguna mahtuu mukaan.
 *
 * YKSIKÄÄN EI OLE PELIKAUPUNGIN KOHDALLA. Maan pelikaupungit ovat Port
 * Moresby ja Sepik (js/packs/maailmankartta.js CITIES). Lähin uusi
 * merkki on Kokoda 26,7 lautayksikön päässä Port Moresbystä; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js).
 *
 * SEPIK-JOKI JÄTETTIIN POIS. Se on maan pisin joki ja luonteva
 * maastokohde, mutta Sepik on laudalla PELIKAUPUNKI, joten uusi merkki
 * osuisi kaupungin kohdalle (sääntö 1). Jokikohteeksi valittiin Fly,
 * jonka artikkeli itse kertoo saaren kolmanneksi pisimmäksi joeksi.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_PNG = [
  /* ================================================================
   * K2-ERÄ M2, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'kokodan-polku',
    nimi: 'Kokodan polku',
    tyyppi: 'historia',
    kysymykset: [
      'Mihin japanilaiset pyrkivät polkua pitkin?',
      'Miksi hyökkäys pysähtyi näköetäisyydellä maalista?',
    ],
    korostukset: ['Owen Stanley|Owen Stanleyn'],
    nappi: 'Vuoripolku, joka pysäytti hyökkäyksen',
    // 147.7333 E / -8.8833 N — Kokodan kylä; en-Wikipedia "Kokoda Track
    // campaign" kertoo paikan mutta ei anna koordinaattia, joten piste on
    // valittu kylän kohdalle. Lähin pelikaupunki Port Moresby, 26,7 yksikköä.
    laudat: {
      maailmankartta: { x: 10757.8, y: 3508.4 },
    },
    teksti: 'Kokodan polun taistelut käytiin heinä–marraskuussa 1942 silloisessa Australian '
      + 'Papuan alueessa. Japanin tavoite oli vallata Port Moresby maitse pohjoisrannikolta '
      + 'käsin, Owen Stanleyn vuoriston yli kulkevaa Kokodan polkua pitkin, ja katkaista '
      + 'siten Australian yhteys Yhdysvaltoihin. Maihinnousu tehtiin Gonan ja Bunan lähelle '
      + '21. heinäkuuta, ja Kokodan kylä lentokenttineen vallattiin jo 29. heinäkuuta. '
      + 'Australialaisia painettiin taaksepäin viikkokausia, mutta syyskuun puolivälissä '
      + 'hyökkäys pysähtyi Ioribaiwassa. Japanilaiset vetäytyivät 26. syyskuuta jo Port '
      + 'Moresbyn näköetäisyydeltä: huoltolinja oli venynyt liian pitkäksi, ja Guadalcanalin '
      + 'tappiot pakottivat perääntymään.',
    lahde: 'en-Wikipedia "Kokoda Track campaign", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'rabaul',
    nimi: 'Rabaul',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi maakunnan pääkaupunki siirrettiin Kokopoon?',
      'Kenen tukikohta Rabaul oli 1942?',
    ],
    korostukset: ['kaldera|kalderan'],
    nappi: 'Kaupunki, jonka tuhka hautasi kahdesti',
    // 152.1833 E / -4.2 N — en-Wikipedia "Rabaul".
    // Lähin pelikaupunki Port Moresby, 240,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10906.1, y: 3351.6 },
    },
    teksti: 'Rabaul on kauppala Uuden-Britannian saarella Itä-Uuden-Britannian maakunnassa, ja '
      + 'se oli maakunnan pääkaupunki, kunnes tulivuorenpurkauksen tuhka tuhosi sen vuonna '
      + '1994: tuhkaa nousi tuhansia metrejä ilmaan, ja sen mukanaan tuoma sade romahdutti '
      + '80 prosenttia rakennuksista. Pääkaupunki siirrettiin sen jälkeen parinkymmenen '
      + 'kilometrin päähän Kokopoon. Uhka ei ole ohi, sillä kaupunki on Rabaulin kalderan '
      + 'reunalla. Rabaul rakennettiin Simpsonhafenin sataman ympärille Saksan '
      + 'Uuden-Guinean hallintokaudella ja valittiin siirtomaan pääkaupungiksi 1905. Japani '
      + 'valtasi sen 1942, ja siitä tuli maan tärkein sotilas- ja laivastotukikohta '
      + 'eteläisellä Tyynellämerellä.',
    lahde: 'en-Wikipedia "Rabaul", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kukin-suo',
    nimi: 'Kukin suo',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhoja ojitukset ovat?',
      'Mitä suolla viljeltiin ensimmäisenä?',
    ],
    korostukset: ['taro|kotoperäinen taro'],
    nappi: 'Paikka, jossa maanviljely keksittiin itse',
    // 144.33 E / -5.7825 N — en-Wikipedia "Kuk Swamp".
    // Lähin pelikaupunki Sepik, 57,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10644.3, y: 3404.5 },
    },
    teksti: 'Kukin suo on arkeologinen kohde Wahgin laaksossa ylängöllä noin 1 550 metrin '
      + 'korkeudessa, runsaat kymmenen kilometriä Mount Hagenista koilliseen. Sieltä on '
      + 'löydetty maatalouden kuivatusojia, joiden vanhimmat ovat noin 9 000 vuoden takaa, '
      + 'sekä kuoppia, paalunsijoja ja vesiuria. Ensimmäinen viljelykasvi oli kotoperäinen '
      + 'taro, ja banaanin ja sokeriruo\'on viljelystä on merkkejä 6 900–6 400 vuoden takaa. '
      + 'Unesco otti Kukin maailmanperintöluetteloon vuonna 2008 yhtenä niistä paikoista '
      + 'maailmassa, joissa ihminen kehitti maanviljelyn itsenäisesti. Alueella asuu nykyään '
      + 'melpaa puhuva kawelka-heimo.',
    lahde: 'en-Wikipedia "Kuk Swamp", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'trobriandsaaret',
    nimi: 'Trobriandsaaret',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mihin suuntaan kaulanauhat kiertävät kularenkaassa?',
      'Kuka teki vaihtojärjestelmän tunnetuksi?',
    ],
    korostukset: ['kula|kula'],
    nappi: 'Rengas, jossa lahjat kiertävät saarelta saarelle',
    // 150.9167 E / -8.6667 N — en-Wikipedia "Trobriand Islands".
    // Lähin pelikaupunki Port Moresby, 131,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10863.9, y: 3501.1 },
    },
    teksti: 'Trobriandsaaret ovat 450 neliökilometrin korallisaaristo Uuden-Guinean itärannikon '
      + 'edustalla, ja valtaosa väestöstä asuu pääsaarella Kiriwinalla. Saaret tunnetaan '
      + 'kulasta, seremoniallisesta vaihtojärjestelmästä, joka kattaa Massimin saariston '
      + '18 saariyhteisöä ja tuhansia ihmisiä. Osallistujat matkaavat toisinaan satoja '
      + 'kilometrejä kanooteilla vaihtaakseen punaisia simpukkakaulanauhoja, jotka kiertävät '
      + 'rengasta myötäpäivään, ja valkoisia simpukkarannerenkaita, jotka kulkevat toiseen '
      + 'suuntaan. Bronisław Malinowski teki kularenkaan tunnetuksi teoksessaan Argonauts of '
      + 'the Western Pacific (1922) ja osoitti, että vaihto liittyi selvästi poliittiseen '
      + 'valtaan.',
    lahde: 'en-Wikipedia "Trobriand Islands", johdanto-osa ja "Kula ring", johdanto-osa sekä '
      + 'osio "Basic description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'gorokan-naytos',
    nimi: 'Gorokan näytös',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka moni heimo tulee näytökseen?',
      'Milloin näytös järjestetään?',
    ],
    korostukset: ['sing-sing|sing-sing'],
    nappi: 'Sata heimoa samalla kentällä',
    // 145.3833 E / -6.0833 N — en-Wikipedia "Goroka".
    // Lähin pelikaupunki Sepik, 89,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10679.4, y: 3414.5 },
    },
    teksti: 'Gorokan näytös on Papua-Uuden-Guinean tunnetuin heimokokoontuminen ja maan suurin '
      + 'kulttuuritapahtuma. Se on sing-sing, joka järjestetään vuosittain lähellä maan '
      + 'itsenäisyyspäivää 16. syyskuuta Gorokassa, Itäisen ylängön maakunnan pääkaupungissa. '
      + 'Paikalle saapuu noin sata heimoa esittämään musiikkiaan, tanssiaan ja kulttuuriaan. '
      + 'Juhla alkoi vuonna 1956 australialaisten kiap-virkamiesten aloitteesta, ja '
      + 'ensimmäisessä tapahtumassa oli noin kymmenentuhatta paikallista sekä matkailijoita. '
      + 'Vastaavia näytöksiä järjestetään nykyään myös Mount Hagenissa ja muualla, mutta '
      + 'Gorokan näytös on yhä maan suurin.',
    lahde: 'en-Wikipedia "Goroka Show", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'laen-lentokentta',
    nimi: 'Lae',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kenen viimeinen lentoonlähtö tehtiin Laesta?',
      'Mikä tie alkaa Laesta?',
    ],
    korostukset: ['Howlandin saari|Howlandin saarta'],
    nappi: 'Kenttä, jolta Earhart lähti eikä palannut',
    // 147.0008 E / -6.7303 N — en-Wikipedia "Lae".
    // Lähin pelikaupunki Port Moresby, 82,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10733.4, y: 3436.2 },
    },
    teksti: 'Lae on Morobe-maakunnan pääkaupunki ja maan toiseksi suurin kaupunki, Markham-joen '
      + 'suistossa Huoninlahden pohjoisrannalla. Se on maan suurin rahtisatama ja teollinen '
      + 'keskus, ja siitä alkaa Highlands Highway, ylängön ja rannikon välinen päätie. '
      + 'Kaupungin historia jaetaan neljään jaksoon: lähetysaikaan 1886–1920, kulta-aikaan '
      + 'vuodesta 1926 toiseen maailmansotaan, puu- ja maatalousaikaan vuoteen 1965 ja '
      + 'teolliseen nousuun siitä eteenpäin. Lae on myös se paikka, josta Amelia Earhart ja '
      + 'Fred Noonan lähtivät 2. heinäkuuta 1937 kello kymmenen aamulla kohti Howlandin '
      + 'saarta — 4 113 kilometrin matkalle, jonka päähän he eivät koskaan tulleet.',
    lahde: 'en-Wikipedia "Lae", johdanto-osa ja osio "History"; lennon osalta "Amelia Earhart", '
      + 'osio "Flight between Lae and Howland Island" (tarkistettu 6.9.2026).',
  },
  {
    id: 'pangunan-kaivos',
    nimi: 'Pangunan kaivos',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka suuri osuus voitosta jäi bougainvillelaisille?',
      'Minä vuonna kaivos suljettiin?',
    ],
    korostukset: ['Jaba|Jaba-joen'],
    nappi: 'Kuparikaivos, joka sulkeutui eikä avautunut',
    // 155.4964 E / -6.3153 N — en-Wikipedia "Panguna".
    // Lähin pelikaupunki Honiara (SLB), 179,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11016.5, y: 3422.3 },
    },
    teksti: 'Pangunan kaivos on suuri kuparikaivos Bougainvillella, ja se on ollut suljettuna '
      + 'vuodesta 1989. Kaivos perustettiin 1969 Bougainville Copper Ltd:n toimesta sen '
      + 'jälkeen, kun Crown Prince -vuoristosta oli löydetty valtavat kupariesiintymät, ja '
      + 'tuotanto alkoi 1972. Aikanaan se oli maailman suurin avolouhos-kupari-kultakaivos: '
      + 'se tuotti 12 prosenttia maan bruttokansantuotteesta ja yli 45 prosenttia sen '
      + 'vientituloista, mutta bougainvillelaiset saivat voitosta vain 0,5–1,25 prosenttia. '
      + 'Rikastushiekka laskettiin suoraan Jaba-joen sivu-uomiin, ja yhtiö myrkytti koko joen; '
      + 'seurauksena oli epämuodostumia ja saaren lentävän koiran häviäminen.',
    lahde: 'en-Wikipedia "Panguna mine", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'milne-bay',
    nimi: 'Milne Bay',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi japanilaiset arvioivat puolustajien määrän väärin?',
      'Mikä tiedustelutieto varoitti liittoutuneita?',
    ],
    korostukset: ['Ultra|Ultra'],
    nappi: 'Lahti, jossa laskuvirhe kaatoi maihinnousun',
    // 150.55 E / -10.4 N — en-Wikipedia "Milne Bay".
    // Lähin pelikaupunki Port Moresby, 125,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10851.7, y: 3559.4 },
    },
    teksti: 'Milne Bayn taistelu käytiin 25. elokuuta – 7. syyskuuta 1942, kun Japanin '
      + 'laivaston maihinnousujoukot hyökkäsivät kahden pienen panssarivaunun kanssa '
      + 'liittoutuneiden lentokentille Uuden-Guinean itäkärjessä. Huonon tiedustelun takia '
      + 'japanilaiset arvioivat varuskunnan koon täysin väärin: he uskoivat kenttiä '
      + 'puolustavan kaksi tai kolme komppaniaa ja laskivat maihin vain pataljoonan verran '
      + 'miehiä. Liittoutuneet olivat kuitenkin saaneet Ultra-tiedustelusta varoituksen ja '
      + 'vahvistaneet varuskuntaa raskaasti. Australialainen nostoväki hidasti hyökkäystä, '
      + 'ja kokeneet AIF-joukot, joita japanilaiset eivät odottaneet, käänsivät taistelun '
      + 'yhdessä ilmaherruuden kanssa.',
    lahde: 'en-Wikipedia "Battle of Milne Bay", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * MAASTOKOHTEET — kolme kappaletta, tyypit vuori, joki ja meri.
   * ============================================================== */
  {
    id: 'mount-wilhelm',
    nimi: 'Mount Wilhelm',
    tyyppi: 'vuori',
    kysymykset: [
      'Kenen mukaan Bismarckin vuoristo nimettiin?',
      'Milloin huipulle noustiin ensimmäisen kerran?',
    ],
    korostukset: ['Enduwa Kombuglu|Enduwa Kombuglu'],
    nappi: 'Kolmen maakunnan yhteinen katto',
    // 145.0333 E / -5.8 N — en-Wikipedia "Mount Wilhelm".
    // Lähin pelikaupunki Sepik, 74,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10667.8, y: 3405 },
    },
    teksti: 'Mount Wilhelm on Papua-Uuden-Guinean korkein vuori, 4 509 metriä. Se kuuluu '
      + 'Bismarckin vuoristoon, ja huipulla kohtaavat kolme maakuntaa: Chimbu, Jiwaka ja '
      + 'Madang. Kumanin kielellä huippu tunnetaan nimillä Enduwa Kombuglu ja Kombugl\'o '
      + 'Dimbin. Nimen se sai 1888, kun saksalainen sanomalehtikirjeenvaihtaja Hugo Zöller '
      + 'nimesi vuoriston Otto von Bismarckin mukaan ja neljä sen korkeinta huippua '
      + 'kanslerin ja tämän lasten mukaan. Vuorta pidetään poliittisten rajojen mukaan '
      + 'laskien Oseanian korkeimpana, vaikka Indonesian Papuan Puncak Jaya on korkeampi. '
      + 'Ensimmäinen kirjattu nousu tehtiin elokuussa 1938, kun partiovirkailija Leigh Vial '
      + 'nousi huipulle kahden paikallisen kanssa.',
    lahde: 'en-Wikipedia "Mount Wilhelm", johdanto-osa ja osio "Discovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'flyjoki',
    nimi: 'Flyjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Fly on Oseanian suurin joki?',
      'Mitä erikoista Flyn valuma-alueessa on?',
    ],
    korostukset: ['Strickland|Strickland'],
    nappi: 'Suurin joki ilman yhtäkään patoa',
    // 143.5889 E / -8.5611 N — en-Wikipedia "Fly River".
    // Lähin pelikaupunki Port Moresby, 115,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10619.6, y: 3497.5 },
    },
    teksti: 'Fly on Uuden-Guinean saaren kolmanneksi pisin joki, 1 060 kilometriä; sitä '
      + 'pidemmät ovat vain Sepik ja Mamberamo. Virtaamaltaan se on kuitenkin Oseanian suurin '
      + 'ja koko maailman suurin joki, jonka valuma-alueella ei ole yhtäkään patoa; koko '
      + 'maailman joista se on virtaamaltaan 23. suurin. Joki alkaa Star Mountainsin '
      + 'Victor Emanuel -vuoristosta, kulkee lounaisten alankojen halki ja laskee laajana '
      + 'suistona Papuanlahteen. Yhdessä Stricklandin kanssa Fly on 1 224 kilometriä pitkä, '
      + 'mikä tekee siitä maailman pisimmän saarella virtaavan jokijärjestelmän.',
    lahde: 'en-Wikipedia "Fly River", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bismarckinmeri',
    nimi: 'Bismarckinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä saariketju sulkee meren itäpuolelta?',
      'Mihin Vitiazin salmi johtaa?',
    ],
    korostukset: ['Vitiazin salmi|Vitiazin salmi'],
    nappi: 'Meri saarikaaren sisäpuolella',
    // 148 E / -4 N — en-Wikipedia "Bismarck Sea".
    // Lähin pelikaupunki Sepik, 160,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10766.7, y: 3344.9 },
    },
    teksti: 'Bismarckinmeri on lounaisen Tyynenmeren osa Papua-Uuden-Guinean talousvyöhykkeellä, '
      + 'Uuden-Guinean saaren koillispuolella ja Bismarckin saariston eteläpuolella. Sekä meri '
      + 'että saaristo on nimetty Saksan ensimmäisen valtakunnankanslerin Otto von Bismarckin '
      + 'mukaan. Saaristo kaartuu meren itä- ja pohjoispuolelle ja erottaa sen eteläiseltä '
      + 'Tyyneltämereltä. Etelässä Vitiazin salmi yhdistää sen Salomoninmereen. Kansainvälisen '
      + 'merikartoitusjärjestön määritelmässä meren rajat kulkevat Uuden-Irlannin, Uuden-Hannoverin, '
      + 'Amiraliteettisaarten ja Wuvulun kautta Uuden-Guinean rannikolle.',
    lahde: 'en-Wikipedia "Bismarck Sea", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
];
