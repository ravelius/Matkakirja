/*
 * MAASTOKOHTEET — JOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs JOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/JOR.json. Työkalu laskee laudan
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
 * Jordanian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kuollutmeri on annettu Jordanialle (rantavaltioista pelin oma maa).
 *
 * MAAILMAN ERÄ M9 (6.9.2026) lisäsi listaan seitsemän KOHDETTA —
 * Jerash, Umm Qais, Umm el-Jimal, Madaba, Kerakin linna, Wadi Rum ja
 * Ayla. Lähin uusi merkki on Wadi Rum 23,3 lautayksikön päässä
 * Petra-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat
 * pääkartan merkkejä. Petra itse on pelikaupunki, ja sen Al-Khazneh on
 * maan oma fokuskohde (js/packs/fokuskohteet-jor.js) — kumpaakaan ei
 * toisteta täällä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_JOR = [
  {
    id: 'jabalummaddami',
    nimi: 'Jabal Umm ad Dami',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Wadi Rum on?',
      'Miten korkeus varmistettiin?',
    ],
    korostukset: ['Wadi Rum|Wadi Rumin'],
    nappi: 'Jordanian korkein, Wadi Rumin perukoilla',
    // 35.4292 E / 29.3083 N — en-Wikipedia "Jabal Umm ad Dami"
    laudat: {
      maailmankartta: { x: 7014.3, y: 2206.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jabal Umm ad Dami on Jordanian korkein vuori: 1 854 metriä Wadi Rumin autiomaassa maan '
      + 'eteläkärjessä, aivan Saudi-Arabian rajan tuntumassa. Pitkään maan korkeimpana '
      + 'pidettiin muita Wadi Rumin huippuja, kunnes satelliittimittaukset vahvistivat tämän '
      + 'syrjäisen huipun lukeman. Kirkkaalla säällä laelta näkee Punaisellemerelle asti.',
    lahde: 'en-Wikipedia "Jabal Umm ad Dami", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kuollutmeri',
    nimi: 'Kuollutmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi vedessä ei voi upota?',
      'Mistä nimi Kuollutmeri tulee?',
    ],
    korostukset: ['Jordanin hautavajoama|Jordanin hautavajoamassa'],
    nappi: 'Maapallon matalin ranta',
    // 35.5 E / 31.5 N — järven keskiallas; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 7016.7, y: 2125.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kuollutmeri on suolajärvi Jordanin hautavajoamassa Jordanian ja sen länsinaapureiden '
      + 'välissä, ja sen ranta on maapallon matalin kuiva kohta: pinta on vajonnut jo lähes 440 '
      + 'metriä merenpinnan alapuolelle. Vesi on noin kymmenen kertaa valtamerta suolaisempaa '
      + 'ja niin tiheää, että uimari kelluu siinä kuin korkki. Suola tekee elämän lähes '
      + 'mahdottomaksi — siitä järven nimi.',
    lahde: 'en-Wikipedia "Dead Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jordan',
    nimi: 'Jordan',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä järvien läpi ja mihin joki virtaa?',
      'Miksi joki on pyhä kolmelle uskonnolle?',
    ],
    korostukset: ['Kuollutmeri|Kuolleeseenmereen'],
    nappi: 'Joki, jolta maa sai nimensä',
    // 35.55 E / 32.2 N — Jordanin laakso Galileanjärven eteläpuolella; artikkelin koordinaatti 35,62 / 33,19 on latvoilla lehden ikkunan ulkopuolella
    laudat: {
      maailmankartta: { x: 7018.3, y: 2100.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jordan on 251 kilometrin mittainen joki, joka virtaa pohjoisesta etelään '
      + 'Galileanjärven läpi ja laskee Kuolleeseenmereen — valtamereen sen vedet eivät koskaan '
      + 'pääse. Sekä Jordanian valtio että Länsiranta ovat saaneet nimensä tästä joesta. '
      + 'Juutalaisuudelle, kristinuskolle ja islamille se on pyhä virta: Raamatun mukaan '
      + 'israelilaiset ylittivät sen luvattuun maahan ja Johannes Kastaja kastoi siinä '
      + 'Jeesuksen.',
    lahde: 'en-Wikipedia "Jordan River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M9, LÄHI-ITÄ 2 6.9.2026 — SEITSEMÄN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Jordanialla oli kolme maastokohdetta ja yksi kohde (Al-Khazneh,
   * js/packs/fokuskohteet-jor.js). Kaikki seitsemän ovat pääkartan
   * merkkejä: etäisyys mitattiin jokaiseen js/packs/maailmankartta.js
   * CITIES-kaupunkiin, ja lähin uusi merkki on Wadi Rum 23,3
   * lautayksikön päässä Petra-laatasta (raja KAUPUNGIN_KOHDALLA_SADE on
   * 7, js/fokuskohteet.js). Nimiölimityksen takia pois jäivät Ajlounin
   * linna (5,4 yksikköä Jerashista) ja Qusayr Amra (8,3 yksikköä erän
   * Azraq-skandaalista). Kuvaton erä; faktat en-Wikipedian
   * raakatekstistä 6.9.2026.
   * ============================================================== */
  {
    id: 'jerash',
    nimi: 'Jerash',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Dekapolis oli?',
      'Mikä tuhosi kaupungin 700-luvulla?',
    ],
    korostukset: ['Dekapolis|Dekapolikseen'],
    nappi: 'Gerasa, Dekapoliksen kaupunki',
    // 35.8917 E / 32.2808 N — en-Wikipedia "Jerash"
    // Lähin pelikaupunki: Jerusalem 46,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7029.7, y: 2097.1 },
    },
    teksti: 'Jerash on kaupunki Pohjois-Jordaniassa. Vanhin merkki asutuksesta on Tal Abu '
      + 'Sowanin kivikautinen paikka, josta on löytynyt harvinaisia ihmisjäänteitä noin '
      + 'vuodelta 7500 eaa. Hellenistisellä, roomalaisella ja bysanttilaisella kaudella kaupunki '
      + 'kukoisti nimellä Gerasa ja kuului Dekapolikseen, kymmenen kaupungin ryhmään. Se oli '
      + 'tärkeä varhaiskristillinen keskus, ja sen kirkot — joista osa oli aiemmin temppeleitä — '
      + 'ovat huomattavia esimerkkejä kirkkoarkkitehtuurin kehityksestä. Vuoden 749 Galilean '
      + 'maanjäristys tuhosi kaupungista suuren osan, ja myöhemmät järistykset jatkoivat työtä; '
      + 'antiikin kaupunkia on kaivettu esiin vaiheittain vuodesta 1925.',
    lahde: 'en-Wikipedia "Jerash", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ummqais',
    nimi: 'Umm Qais',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Gadara tarkoittaa?',
      'Minne Umm Qaisin harjulta näkee?',
    ],
    korostukset: ['Gadara|Gadaran'],
    nappi: 'Kolmen maan näköalaharju',
    // 35.6806 E / 32.655 N — en-Wikipedia "Umm Qais"
    // Lähin pelikaupunki: Damaskos 37,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7022.7, y: 2083.2 },
    },
    teksti: 'Umm Qais on kaupunki aivan Pohjois-Jordanian luoteiskulmassa, ja se tunnetaan '
      + 'antiikin Gadaran raunioista. Paikka jakautuu kolmeen osaan: kaivausalueeseen, vanhaan '
      + 'kylään ja nykyiseen kaupunkiin. Rauniot ovat 378 metrin korkuisella harjulla, jolta '
      + 'näkee Tiberiaanjärvelle, Golanille ja Jarmukin jokilaaksoon. Gadara oli kreikkalaisen '
      + 'kulttuurin keskus hellenistisellä ja roomalaisella kaudella; vanhimmat löydöt ovat '
      + '200-luvun jälkipuoliskolta eaa., ja paikka näyttää saaneen alkunsa Aleksanteri Suuren '
      + 'makedonialaisten perustamana sotilassiirtolana. Nimi ei kuitenkaan ole kreikkalainen '
      + 'vaan kreikkalainen asu paikallisesta seemiläisestä sanasta, joka tarkoittaa '
      + 'linnoituksia — siirtokunta siis perustettiin jo linnoitetulle paikalle.',
    lahde: 'en-Wikipedia "Umm Qais", johdanto-osa sekä osiot "Location" ja "Antiquity" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ummeljimal',
    nimi: 'Umm el-Jimal',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Umm el-Jimal tarkoittaa?',
      'Mistä kiviaineksesta kaupunki on rakennettu?',
    ],
    korostukset: ['nabatealaisaika|nabatealaisajalta'],
    nappi: 'Kamelien äiti Hauranissa',
    // 36.3667 E / 32.3333 N — en-Wikipedia "Umm el-Jimal"
    // Lähin pelikaupunki: Damaskos 43,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7045.6, y: 2095.1 },
    },
    teksti: 'Umm el-Jimal, arabiaksi Kamelien äiti, on kylä Pohjois-Jordaniassa vajaan '
      + 'kymmenen kilometrin päässä Syyrian rajasta. Se tunnetaan bysanttilaisen ja '
      + 'varhaisislamilaisen kaupungin laajoista raunioista, jotka näkyvät selvästi maan '
      + 'päällä, sekä vanhemmasta roomalaisesta kylästä lounaassa. Kylä on Hauranin '
      + 'aavikkoseudulla, mutta kuivuudestaan huolimatta se sopii yllättävän hyvin '
      + 'maanviljelyyn, ja elanto on tullut viljelystä ja karjasta. Rauniot ovat '
      + 'nabatealaisajalta abbasidikauteen: noin vuoden 749 maanjäristys teki suurta vahinkoa, '
      + 'mutta yhteisö jatkoi pitkälle abbasidiaikaan. 1900-luvun alussa alueelle asettuivat '
      + 'ensin druusit ja sitten beduiinien Msaeid-heimo.',
    lahde: 'en-Wikipedia "Umm el-Jimal", johdanto-osa ja osio "Overview" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'madaba',
    nimi: 'Madaba',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Madaban mosaiikkikartta esittää?',
      'Miten kartta löytyi?',
    ],
    korostukset: ['mosaiikkikartta|mosaiikkikartasta'],
    nappi: 'Kartta lattiassa',
    // 35.7936 E / 31.7167 N — en-Wikipedia "Madaba"
    // Lähin pelikaupunki: Jerusalem 36,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7026.5, y: 2117.9 },
    },
    teksti: 'Madaba on kaupunki Keski-Jordaniassa, ja se tunnetaan bysanttilaisen ja '
      + 'umaijadikauden mosaiikeistaan — ennen muuta suuresta 500-luvun mosaiikkikartasta. '
      + 'Vuonna 1880 yhdeksänkymmentä arabikristittyä perhettä muutti Al-Karakista Madaban '
      + 'raunioille ja sai luvan rakentaa kirkkoja vanhojen kirkkojen paikalle; juuri yhden '
      + 'tällaisen paikan raivaus toi kartan esiin 1884. Kunnolla sitä tutkittiin vasta yli '
      + 'vuosikymmen myöhemmin, 1896, ja 1897 Jerusalemin patriarkaatin kirjastonhoitaja isä '
      + 'Kleopas Koikylides julkaisi siitä luotettavan piirroksen ja tulkinnan. Kartta on '
      + 'Pyhän Yrjön kirkon lattiassa, ja sen kaksi miljoonaa värikiveä esittävät kukkuloita, '
      + 'laaksoja, kyliä ja kaupunkeja Palestiinasta Niilin suistoon asti — mukana on vanhin '
      + 'säilynyt kuva bysanttilaisesta Jerusalemista pylväskatuineen.',
    lahde: 'en-Wikipedia "Madaba", johdanto-osa sekä osiot "Modern settlement" ja "Madaba Map" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kerakinlinna',
    nimi: 'Kerakin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kauppateitä linnasta valvottiin?',
      'Mikä oli Saladinin piirityksen erikoisuus 1183?',
    ],
    korostukset: ['ristiretkeläiset|ristiretkeläiset'],
    nappi: 'Aavikon Krak',
    // 35.7017 E / 31.1806 N — en-Wikipedia "Kerak Castle"
    // Lähin pelikaupunki: Jerusalem 36,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7023.4, y: 2137.7 },
    },
    teksti: 'Kerakin linna al-Karakissa on yksi Levantin suurimmista keskiaikaisista '
      + 'linnoista. Sen rakentaminen alkoi 1140-luvulla, ja ristiretkeläiset kutsuivat sitä '
      + 'nimellä Crac des Moabites, Moabin Krak, tai aavikon Krakiksi. Kuolleenmeren '
      + 'itäpuolisen sijaintinsa ansiosta linnasta pystyttiin valvomaan sekä beduiinipaimenia '
      + 'että Damaskoksesta Egyptiin ja Mekkaan johtavia kauppateitä. Komeimmin säilynyt osa '
      + 'on pohjoismuuri kahdessa kerroksessa olevine holvisaleineen, joita käytettiin sekä '
      + 'asuintiloina ja talleina että taistelugalleriana ja suojana piirityskoneiden '
      + 'heittämiltä kiviltä. Kun Saladin piiritti linnaa 1183, siellä vietettiin samaan '
      + 'aikaan häitä — hän suostui olemaan ampumatta hääparin huoneeseen, vaikka piirityskoneet '
      + 'jyskyttivät muuta linnaa.',
    lahde: 'en-Wikipedia "Kerak Castle", johdanto-osa ja osio "Crusader period" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'wadirum',
    nimi: 'Wadi Rum',
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä Wadi Rum on saanut nimensä?',
      'Mikä on Jordanian korkein kohta?',
    ],
    korostukset: ['hiekkakivi|hiekkakiveen'],
    nappi: 'Kuun laakso',
    // 35.4167 E / 29.5833 N — en-Wikipedia "Wadi Rum"
    // Lähin pelikaupunki: Petra 23,3 lautayksikköä. Laakso ei ole vuori
    // eikä joki: tyyppi 'muu' + symboli 'luonto' Rub al-Khalin mallin
    // mukaan (js/packs/maastokohteet-sau.js).
    laudat: {
      maailmankartta: { x: 7013.9, y: 2196.1 },
    },
    teksti: 'Wadi Rum on hiekkakiveen ja graniittiin uurtunut laakso Etelä-Jordaniassa lähellä '
      + 'Saudi-Arabian rajaa, noin kuudenkymmenen kilometrin päässä Aqabasta. Sen 720 '
      + 'neliökilometriä tekevät siitä Jordanian suurimman wadin, ja sitä kutsutaan myös Kuun '
      + 'laaksoksi tai punaisiksi vuoriksi. Nimen uskotaan tulevan Iram-nimisestä kadonneesta '
      + 'kaupungista. Monet esihistorialliset kulttuurit ovat jättäneet laaksoon '
      + 'kalliopiirroksia, piirtokirjoituksia ja raunioita. Jordanian korkein kohta Jabal Umm '
      + 'ad Dami, 1 840 metriä, on kolmenkymmenen kilometrin päässä Rumin kylästä etelään, ja '
      + 'kylän yllä kohoaa 1 734 metrin Jabal Rum. Unescon maailmanperintökohde suojelualueesta '
      + 'tuli 2011.',
    lahde: 'en-Wikipedia "Wadi Rum", johdanto-osa sekä osiot "Toponym" ja "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ayla',
    nimi: 'Ayla',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on Aqaban kirkon merkitys?',
      'Miten nimi Aqaba syntyi?',
    ],
    korostukset: ['Elath|Elath'],
    nappi: 'Punaisenmeren portti',
    // 35.0 E / 29.5262 N — en-Wikipedia "Aqaba"
    // Lähin pelikaupunki: Petra 37,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7000, y: 2198.2 },
    },
    teksti: 'Aqaban paikka Punaisenmeren pohjoiskärjessä on ollut tärkeä vuosituhansia. '
      + 'Muinainen kaupunki tunnettiin nimellä Elath, ja lähellä olevat kuparikaivokset tekivät '
      + 'siitä kuparin tuotannon ja kaupan keskuksen jo kuparikaudella. Bysanttilaisella '
      + 'kaudella Ailasta tuli piispanistuin, ja sinne rakennettiin Aqaban kirkko, maailman '
      + 'vanhin tunnettu varta vasten kirkoksi tehty rakennus. Noin vuoden 650 valloitusten '
      + 'jälkeen vanha asutus jätettiin rapistumaan ja muurien ulkopuolelle perustettiin uusi '
      + 'arabikaupunki Ayla — 170 kertaa 145 metrin suorakaide, jota puolusti 2,6 metriä paksu '
      + 'muuri ja 24 tornia, neljä porttia ja keskellä risteävät pääkadut. Nimi Aqaba tulee '
      + 'sanoista aqabat Aylah, Aylan sola, ja se mainitaan ensi kerran 1100-luvulla.',
    lahde: 'en-Wikipedia "Aqaba", johdanto-osa sekä osiot "Etymology" ja "Early Muslim Ayla" '
      + '(tarkistettu 6.9.2026).',
  },
];

