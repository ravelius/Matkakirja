/*
 * MAASTOKOHTEET — DZA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs DZA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/DZA.json. Työkalu laskee laudan
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
 * Algerian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Tahatille ja Chelifille ei ole vakiintuneita suomennoksia (fi-Wikipediassa ei artikkeleita), joten nimet ovat kansainvälisessä asussa.
 *
 * MAAILMAN ERÄ M5 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA — Timgad,
 * Djémila, Tipasa, Tassilin kalliotaide, Qal'at Bani Hammad, Tlemcen,
 * M’zabin laakso ja Constantine. Lähin uusi merkki on Constantine 59,2
 * lautayksikön päässä Karthagosta (KAUPUNGIN_KOHDALLA_SADE 7), joten
 * kaikki ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen
 * lähin pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_DZA = [
  {
    id: 'tahat',
    nimi: 'Tahat',
    tyyppi: 'vuori',
    kysymykset: [
      'Keitä tuaregit ovat?',
      'Mitä Tassili n\'Ajjerin kalliomaalaukset esittävät?',
    ],
    korostukset: ['Sahara|Saharaa'],
    nappi: 'Saharan tuliperäinen huippu',
    // 5.5336 E / 23.2889 N — en-Wikipedia "Mount Tahat"
    laudat: {
      maailmankartta: { x: 6017.8, y: 2421.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tahat on Algerian ja koko Hoggarin vuoriston korkein huippu: 2 908 metriä, joskin osa '
      + 'lähteistä antaa jopa 3 003 metriä. Tuliperäinen vuori nousee karulta ylätasangolta '
      + 'keskeltä Saharaa, tuaregien asuttamalta seudulta, ja lähin kaupunki Tamanrasset on 56 '
      + 'kilometrin päässä. Pohjoisempana Tassili n\'Ajjerin vuorilla on kalliomaalauksia, '
      + 'joissa paimennetaan karjaa ja metsästetään eläimiä, joita nykyään tapaa vasta paljon '
      + 'etelämpää — maalaukset on ajoitettu vuosien 8000 ja 2000 eaa. välille.',
    lahde: 'en-Wikipedia "Mount Tahat", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli Messinan suolakriisi?',
      'Miten kuivunut meri täyttyi uudelleen?',
    ],
    nappi: 'Meri, joka kuivui kerran lähes kokonaan',
    // 3 E / 37.3 N — ulappa Algerin edustalla; en-Wikipedia "Mediterranean Sea" antaa keskipisteeksi 18 / 35
    laudat: {
      maailmankartta: { x: 5933.3, y: 1907.8 },
      europe: { x: 268.8, y: 912.6 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja Algeria on '
      + 'osa sen eteläistä, pohjoisafrikkalaista rantaa. Meri on lähes kokonaan maan ympäröimä: '
      + 'Atlanttiin se yhtyy vain Gibraltarinsalmen kautta. Noin 5,9 miljoonaa vuotta sitten '
      + 'yhteys valtamereen katkesi ja Välimeri kuivui osin tai kokonaan satojentuhansien '
      + 'vuosien ajaksi, kunnes niin sanottu Zanclean tulva täytti altaan uudelleen.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'chelif',
    nimi: 'Chelif',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen vedenpinta vaihtelee rajusti?',
      'Miksi kaupunki nimettiin joen mukaan?',
    ],
    korostukset: ['Tell-Atlas|Tell-Atlaksen'],
    nappi: 'Algerian pisin joki',
    // 1.3 E / 36.1 N — keskijuoksu Tell-Atlaksessa; en-Wikipedia "Chelif River" antaa suulle 0,13 / 36,04
    laudat: {
      maailmankartta: { x: 5876.7, y: 1953.7 },
      europe: { x: 236.2, y: 944.2 },
    },
    teksti: 'Algerian pisin joki antoi lopulta nimen kaupungille, joka oli vaihtanut nimeään '
      + 'kahdesti. Chelifin varrella oleva kaupunki perustettiin 1843 Orléansvilleksi '
      + 'roomalaisen Castellum Tingitanumin raunioille, nimettiin 1962 al-Asnamiksi ja sai '
      + 'lokakuun 1980 tuhoisan maanjäristyksen jälkeen nimekseen Chlef — joen mukaan. Seutu on '
      + 'vanhaa järistysmaata: jo syyskuussa 1954 järistys tappoi samalla paikalla ainakin 1 '
      + '243 ihmistä. Joki itse on 700 kilometriä pitkä. Se saa alkunsa Saharan Atlaksesta '
      + 'Boughezoulin lähistöltä, halkoo Tell-Atlaksen ja laskee Välimereen Mostaganemin '
      + 'pohjoispuolella. Vedenpinta heittelee rajusti, ja alajuoksun vettä käytetään '
      + 'kasteluun.',
    lahde: 'en-Wikipedia "Chelif River" ja en-Wikipedia "Chlef", johdanto-osa ja osio '
      + '"Orléansville" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M5, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Algerialla
   * oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki kahdeksan
   * ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Constantine 59,2 lautayksikön päässä Karthagosta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'timgad',
    nimi: 'Timgad',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä berberinkielinen nimi Thamugadi tarkoittaa?',
      'Miksi James Brucen kertomusta raunioista ei uskottu?',
    ],
    korostukset: ['ruutukaava|ruutukaavasta'],
    nappi: 'Trajanuksen ruutukaupunki Aurèsin juurella',
    // 6.4686 E / 35.4842 N — en-Wikipedia "Timgad"
    // Lähin pelikaupunki: Karthago 80,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6049, y: 1977.1 },
    },
    teksti: 'Timgad on roomalainen kaupunki Algerian Aurèsvuorten juurella: keisari Trajanus '
      + 'perusti sen noin vuonna 100 jaa. varustukseksi vuorten berberejä vastaan ja asutti sen '
      + 'veteraaneilla. Koko nimi oli Colonia Marciana Ulpia Traiana Thamugadi — alkuosa on '
      + 'keisarin sukua, loppuosa berberiä: Thamugadi on monikko sanasta tamgut, huippu. Rauniot '
      + 'tunnetaan yhtenä maailman parhaiten säilyneistä esimerkeistä roomalaisesta '
      + 'ruutukaavasta, ja ne otettiin Unescon maailmanperintöluetteloon 1982. Skotlantilainen '
      + 'James Bruce saapui paikalle 12. joulukuuta 1765 ja kuvasi sen "pieneksi kaupungiksi, '
      + 'mutta täynnä hienoja rakennuksia"; hänen kirjaansa 1790 ei Britanniassa uskottu ennen '
      + 'kuin Algerin konsuli Robert Lambert Playfair kävi paikalla 1875 ja vahvisti kertomuksen.',
    lahde: 'en-Wikipedia "Timgad", johdanto-osa sekä osiot "Name" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'djemila',
    nimi: 'Djémila',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Cuiculin teatteri rakennettiin muurien ulkopuolelle?',
      'Mitä nimi Djémila tarkoittaa arabiaksi?',
    ],
    korostukset: ['forum|forum'],
    nappi: 'Kaunis — roomalainen kaupunki vuoren kielekkeellä',
    // 5.7333 E / 36.3167 N — en-Wikipedia "Djémila"
    // Lähin pelikaupunki: Karthago 87,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6024.4, y: 1945.5 },
    },
    teksti: 'Djémila on vuoristokylä Pohjois-Algeriassa, ja sen alla on antiikin Cuicul, '
      + 'yksi Pohjois-Afrikan parhaiten säilyneistä roomalaiskaupungeista. Varuskunta '
      + 'rakennettiin 100-luvulla jaa. 900 metrin korkeuteen kapealle kolmiomaiselle '
      + 'ylängölle Numidiassa, kahden joen yhtymäkohtaan. Rakentajat noudattivat tavallista '
      + 'kaavaa — forum keskellä, Cardo Maximus ja Decumanus Maximus pääakseleina — mutta '
      + 'maasto pakotti poikkeukseen: teatteri jäi muurien ulkopuolelle. Caracallan aikaan '
      + '200-luvulla vanhoja valleja purettiin ja tilalle tehtiin uusi, entistä komeampi '
      + 'forum. Nimi on arabiaa ja tarkoittaa kaunista; Unescon luetteloon paikka pääsi 1982 '
      + 'juuri siitä, miten roomalainen arkkitehtuuri sovitettiin vuoristoon.',
    lahde: 'en-Wikipedia "Djémila", johdanto-osa ja osio "Roman Cuicul" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tipasa',
    nimi: 'Tipasa',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Tipasa oli ennen roomalaisia?',
      'Kenen muistolaatta pystytettiin raunioihin 1961?',
    ],
    korostukset: ['puunilainen|puunilainen'],
    nappi: 'Kolme kukkulaa meren yllä',
    // 2.4494 E / 36.5919 N — en-Wikipedia "Tipasa"
    // Lähin pelikaupunki: Karthago 193,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5915, y: 1934.9 },
    },
    teksti: 'Tipasa oli aluksi pieni puunilainen kauppapaikka Algerian rannikolla. Rooman '
      + 'valloituksen jälkeen keisari Claudius teki siitä sotilassiirtokunnan Mauretanian '
      + 'kuningaskuntien valtaamista varten. Kaupunki nousi kolmelle merta kohti laskevalle '
      + 'kukkulalle parikymmentä kilometriä Caesareasta itään, ja sen ympärille tehtiin noin '
      + '2 300 metrin muuri paimentolaisheimoja vastaan; satama ja rannikkotiet toivat sille '
      + 'kaupallista ja sotilaallista painoa. Kristinusko saapui varhain: paikan kristillinen '
      + 'piirtokirjoitus vuodelta 237 tai 238 on Rooman Afrikan vanhin. Unescon '
      + 'maailmanperintökohde Tipasa on ollut vuodesta 1982, ja raunioihin pystytettiin 1961 '
      + 'muistokivi Albert Camus’n Noces à Tipasa -tekstin lauseella.',
    lahde: 'en-Wikipedia "Tipasa", johdanto-osa sekä osiot "History" ja "Tribute to Albert '
      + 'Camus" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tassilin-kalliotaide',
    nimi: 'Tassilin kalliotaide',
    nimio: 'Tassili',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Tassili n’Ajjer tarkoittaa?',
      'Mikä värjää hiekkakiven lähes mustaksi?',
    ],
    korostukset: ['aavikkolakka|aavikkolakka'],
    nappi: 'Jokien ylänkö keskellä Saharaa',
    // 9.0 E / 25.5 N — en-Wikipedia "Tassili n'Ajjer"
    // Lähin pelikaupunki: Sahara 41,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6133.3, y: 2342.9 },
    },
    teksti: 'Tassili n’Ajjer on Kaakkois-Algerian ylänkö Saharassa, ja sen nimi tarkoittaa '
      + 'jokien ylänköä. Yli 72 000 neliökilometrin alueella on yksi maailman tärkeimmistä '
      + 'esihistoriallisen kalliotaiteen keskittymistä, ja Unesco otti sen luetteloonsa 1982; '
      + 'alue on myös kansallispuisto ja biosfäärialue. Maisema on hiekkakiveä, jonka pinnan '
      + 'värjää lähes mustasta tummanpunaiseen ohut metallioksidikerros eli aavikkolakka, ja '
      + 'kulutus on veistänyt kaakkoisosaan lähes 300 luonnonkaarta sekä syviä rotkoja, joiden '
      + 'pohjoispäässä on pysyviä vesialtaita. Korkein kohta on 2 158 metrin Adrar Afao, ja '
      + 'lähimmät kylät ovat Djanet kaakkoisreunalla ja Illizi pohjoisreunalla.',
    lahde: 'en-Wikipedia "Tassili n\'Ajjer", johdanto-osa sekä osiot "Geography" ja "Geology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'qalat-bani-hammad',
    nimi: "Qal'at Bani Hammad",
    nimio: "Qal'at",
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi linnoituskaupungin ja milloin?',
      'Miksi kaupunki hylättiin 1090?',
    ],
    korostukset: ['minareetti|minareetti'],
    nappi: 'Hammadidien ensimmäinen pääkaupunki',
    // 4.7933 E / 35.8139 N — en-Wikipedia "Qal'at Bani Hammad"
    // Lähin pelikaupunki: Karthago 122,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5993.1, y: 1964.6 },
    },
    teksti: "Qal'at Bani Hammad on raunioitunut linnoitettu palatsikaupunki Hodnan vuorilla "
      + '1 418 metrin korkeudella. Hammad ibn Buluggin rakennutti sen 1007, ja siitä tuli '
      + 'hammadidien ensimmäinen pääkaupunki. Muuria on seitsemän kilometriä, ja sen '
      + 'sisällä on neljä asuinkorttelia sekä moskeija, joka oli Mansurahin moskeijan '
      + 'jälkeen Algerian '
      + 'suurin — sen minareetti kohoaa 20 metriin. Kaivauksissa on löytynyt terrakottaa, '
      + 'koruja, kolikoita ja keramiikkaa sekä leijona-aiheisia suihkulähteitä; emiirin '
      + 'palatsissa Dar al-Bahrissa oli kolme puutarhojen erottamaa asuntoa. Kaupunki '
      + 'hylättiin 1090 Banu Hilalin uhan alla, ja almohadit tuhosivat sen osittain 1152; '
      + 'Unescon luettelossa se on ollut vuodesta 1980.',
    lahde: 'en-Wikipedia "Qal\'at Bani Hammad", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tlemcen',
    nimi: 'Tlemcen',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä nimi Tlemcen mahdollisesti tulee?',
      'Miksi kaupunkia sanotaan Afrikan Granadaksi?',
    ],
    korostukset: ['andalusialainen|andalusialaisen'],
    nappi: 'Maghrebin helmi lähteiden luona',
    // -1.3167 E / 34.8828 N — en-Wikipedia "Tlemcen"
    // Lähin pelikaupunki: Granada 115,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5789.4, y: 1999.8 },
    },
    teksti: 'Tlemcen on Luoteis-Algerian toiseksi suurin kaupunki Oranin jälkeen ja oman '
      + 'maakuntansa pääkaupunki. Se on Keski-Maghrebin vanhoja keskuksia, jossa arabialainen, '
      + 'berberiläinen, andalusialainen, ottomaanien ja länsimainen perintö ovat sekoittuneet '
      + '— siitä sen arvonimi Algerian andalusialaisen taiteen pääkaupunki sekä lisänimet '
      + 'Maghrebin helmi ja Afrikan Granada. Nimen antoi zayyanidikuningas Yaghmurasen ibn '
      + 'Zyan, ja sen alkuperäksi on ehdotettu berberin sanaa tilmas, lähde tai vesikuoppa, '
      + 'tai sanaliittoa tala m-sân, kaksi lähdettä. Kaupunki elää nahka-, matto- ja '
      + 'tekstiiliteollisuudesta ja vie tuotteensa Rachgounin sataman kautta.',
    lahde: 'en-Wikipedia "Tlemcen", johdanto-osa ja osio "Etymology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'mzabin-laakso',
    nimi: 'M’zabin laakso',
    nimio: 'M’zab',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Montako muurikylää laaksossa on?',
      'Mikä on Beni Isguenin sääntö vierailijoille?',
    ],
    korostukset: ['ksar|ksaria'],
    nappi: 'Viisi muurikylää kalkkikiviylängöllä',
    // 3.6833 E / 32.4833 N — en-Wikipedia "M'zab"
    // Lähin pelikaupunki: Karthago 226,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5956.1, y: 2089.6 },
    },
    teksti: 'M’zab on pohjoisen Saharan luonnonmaisema-alue Ghardaïan maakunnassa, 600 '
      + 'kilometriä Algerista etelään. Se on kalkkikiviylänkö, jonka keskellä kulkee Wad '
      + 'M’zabin laakso, ja siellä asuu noin 360 000 ihmistä. Laaksossa on viisi kallioiselle '
      + 'harjanteelle perustettua muurikylää eli ksaria, jotka syntyivät vuosien 1012 ja 1350 '
      + 'välillä; niitä kutsutaan yhdessä pentapoliksi. Asukkaat, mozabiitit, ovat berberien '
      + 'iznaten-heimon haara, joka kääntyi ibadilaiseen islamiin rustamidien pakolaisten '
      + 'mukana. Ghardaïa on alueen pääkylä, El Atteuf vanhin, ja Beni Isguen pyhin: sinne '
      + 'ulkopuolinen ei saa jäädä yöksi. Ranska liitti M’zabin itseensä vasta 1882.',
    lahde: 'en-Wikipedia "M\'zab", johdanto-osa sekä osiot "Geology", "History" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'constantine',
    nimi: 'Constantine',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Millä nimellä kaupunki tunnettiin ennen Konstantinusta?',
      'Miksi sitä sanotaan siltojen kaupungiksi?',
    ],
    korostukset: ['rotko|rotkojen'],
    nappi: 'Siltojen kaupunki Rhumelin yllä',
    // 6.6 E / 36.35 N — en-Wikipedia "Constantine, Algeria"
    // Lähin pelikaupunki: Karthago 59,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6053.3, y: 1944.2 },
    },
    teksti: 'Constantine on Koillis-Algerian maakuntakeskus noin 80 kilometrin päässä '
      + 'Välimeren rannikosta, Rhumel-joen partaalla. Antiikissa kaupunki oli Cirta, '
      + 'berberiläisen Numidian pääkaupunki, ja vuonna 112 eaa. kuningas Jugurthan hallussa; '
      + 'nimensä se sai keisari Konstantinus Suurelta, kun se rakennettiin uudelleen 313 jaa. '
      + 'sodassa tuhoutumisen jälkeen. Nykyään se on maan kolmanneksi suurin kaupunki ja Itä-'
      + 'Algerian kauppakeskus, jonka taajamassa asuu lähes miljoona ihmistä. Sitä sanotaan '
      + 'siltojen kaupungiksi, koska kukkuloiden, laaksojen ja rotkojen välejä yhdistää joukko '
      + 'siltoja. Arabiliiton kulttuurijärjestö nimesi sen 2015 arabimaailman '
      + 'kulttuuripääkaupungiksi.',
    lahde: 'en-Wikipedia "Constantine, Algeria", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

