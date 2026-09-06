/*
 * MAASTOKOHTEET — SDN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SDN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SDN.json. Työkalu laskee laudan
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
 * Sudanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Niilin merkki on Khartumin kohdalla, jossa Valkoinen ja Sininen Niili yhtyvät — koko joen kuuluisin kohtauspaikka on Sudanissa.
 *
 * MAAILMAN ERÄ M15 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Meroë, Jebel Barkal, Kerma, Vanha Dongola, Soleb, Naqa, Dinder ja
 * Sennar. Lähin uusi merkki on Meroë 140,9 lautayksikön päässä
 * Suakinista (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki kahdeksan
 * ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_SDN = [
  {
    id: 'jebelmarra',
    nimi: 'Jebel Marra',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Jebel Marralla on lähteitä keskellä Sahelia?',
      'Mikä on kalderaromahdus?',
    ],
    korostukset: ['Deriba|Deriban'],
    nappi: 'Tulivuori Darfurin sydämessä',
    // 24.27 E / 12.95 N — en-Wikipedia "Marrah Mountains" ja "Deriba (caldera)"
    laudat: {
      maailmankartta: { x: 6642.3, y: 2777.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keskellä Sahelin kuivaa savannia on saari, jossa sataa. Jebel Marran ylimmillä '
      + 'rinteillä vallitsee lauhkea ilmasto, runsaat sateet ja pysyviä lähteitä, vaikka '
      + 'alapuolella leviää pensasaro. Vuoristo on tulivuorten muodostama massiivi, joka kohoaa '
      + '3 042 metriin ja jopa 2 600 metriä ympäröivän tasangon yläpuolelle — Nigerin '
      + 'Aïr-vuoria lukuun ottamatta ainoa suuri vuoristo koko muutoin tasaisessa Sahelissa. '
      + 'Sudanin korkein kohta on Deriban kaldera, joka syntyi noin 1500 eaa. viimeisessä '
      + 'purkauksessa: hohkakivi- ja pyroklastivirrat kulkivat yli kolmenkymmenen kilometrin '
      + 'päähän, ja sitten katto romahti. Vuoret hidastivat aikanaan arabialaistumisen '
      + 'leviämistä idästä länteen ja tarjosivat turvapaikan sulttaaneille.',
    lahde: 'en-Wikipedia "Marrah Mountains", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'punainenmeri',
    nimi: 'Punainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Punaisenmeren pohjalla kulkee repeämä?',
      'Mitä reittiä merestä pääsee valtamerelle?',
    ],
    nappi: 'Repeämä kahden mantereen välissä',
    // 37.9 E / 19.8 N — ulappa Port Sudanin edustalla; artikkelin oma keskipiste on 38 / 22
    laudat: {
      maailmankartta: { x: 7096.7, y: 2542.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Punainenmeri on Afrikan ja Arabian niemimaan välinen meri, Intian valtameren lahti, '
      + 'joka on noin 2 250 kilometriä pitkä mutta leveimmilläänkin vain 355 kilometriä. '
      + 'Valtamereen se yhtyy etelässä Bab el Mandebin salmen kautta, pohjoisessa odottavat '
      + 'Suezinlahti ja kanava. Meren pohjalla kulkee Punaisenmeren repeämä, osa Suurta '
      + 'hautavajoamaa.',
    lahde: 'en-Wikipedia "Red Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'niili',
    nimi: 'Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Kumpi tuo enemmän vettä, Valkoinen vai Sininen Niili?',
      'Kuinka pitkä Niili oikein on?',
    ],
    nappi: 'Maailman pisin joki',
    // 32.55 E / 15.62 N — Khartum, jossa Valkoinen ja Sininen Niili yhtyvät; artikkelin koordinaatti 31,14 / 30,17 on Egyptissä
    laudat: {
      maailmankartta: { x: 6918.3, y: 2686.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niili on maailman pisin joki: 7 088 kilometriä kohti pohjoista ja Välimerta. Merkki on '
      + 'Khartumin kohdalla, jossa sen kaksi päähaaraa yhtyvät: pitempi Valkoinen Niili tulee '
      + 'Victorianjärven suunnalta ja Sininen Niili Etiopian Tanajärveltä. Sininen Niili tuo '
      + 'vedestä yli kaksi kolmasosaa, vaikka Valkoista Niiliä pidetään joen latvavetenä.',
    lahde: 'en-Wikipedia "Nile", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M15, AFRIKKA 5 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Sudanilla oli kolme maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Meroë 140,9 lautayksikön päässä Suakinista (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js).
   *
   * NYKYTILA EI OLE AIHE. Fablen linjaus tälle erälle: Sudanin
   * kohteet vain historiasta ja luonnosta, ja artikkelit joiden
   * nykytila on sotaa jätetään pois (M3:n Myanmar-linja). Yksikään
   * kortti ei siis kerro vuoden 2023 jälkeisestä tilanteesta, vaikka
   * osa artikkeleista sen mainitsee. Musawwarat es-Sufra jäi pois
   * kahdesta syystä: se on 5,3 lautayksikköä Naqasta (nimiölimitys)
   * ja sen nykytila on artikkelin mukaan selkkaus. Nuri ja El-Kurru
   * jäivät pois nimiösyystä — molemmat ovat alle viiden yksikön
   * päässä Jebel Barkalista, ja niiden pyramidit mainitaan sen
   * kortissa. Kuvaton erä; faktat en-Wikipedian raakatekstistä
   * 6.9.2026, ja jokainen `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'meroe',
    nimi: 'Meroë',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kuninkaat siirsivät pääkaupunkinsa etelään?',
      'Mitä Ferlini teki pyramideille vuonna 1834?',
    ],
    korostukset: ['rauta|raudan'],
    nappi: 'Kaksisataa pyramidia Niilin rannalla',
    // 33.7264 E / 16.9333 N — en-Wikipedia "Meroë" (tietolaatikon coordinates)
    // Lähin pelikaupunki: Suakin 140,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6957.5, y: 2641.7 },
    },
    teksti: 'Meroë oli muinainen kaupunki Niilin itärannalla noin 200 kilometriä Khartumista '
      + 'koilliseen ja Kushin kuningaskunnan pääkaupunki noin vuodesta 590 eaa. aina 300-luvun '
      + 'romahdukseen asti. Kuningas Aspelta siirsi hallintonsa tänne kauas etelään sen jälkeen, '
      + 'kun egyptiläinen farao Psametik II oli ryöstänyt pohjoisemman Napatan; Martin Meredithin '
      + 'mukaan paikka valittiin, koska se oli kesäsateiden reunalla ja seudulla oli rautamalmia '
      + 'ja kovaa puuta raudan valmistukseen. Kaupungin ympärillä on yli kaksisataa pyramidia '
      + 'kolmessa ryhmässä, ja sen vauraus perustui rautaan — Archibald Sayce kutsui paikkaa '
      + '"Afrikan Birminghamiksi", mikä on nykytutkimuksessa kiistanalainen luonnehdinta. '
      + 'Herodotos kirjoitti 400-luvulla eaa. Meroësta "suurena kaupunkina". Vuonna 1834 '
      + 'italialainen Giuseppe Ferlini teki paikalla kaivauksia, joiden korut ovat nyt Berliinin '
      + 'ja Münchenin museoissa. Unescon maailmanperintökohde 2011.',
    lahde: 'en-Wikipedia "Meroë", johdanto-osa sekä osiot "History", "Civilization", '
      + '"Archaeology" ja "World Heritage listing" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jebelbarkal',
    nimi: 'Jebel Barkal',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi sama vuori oli pyhä sekä egyptiläisille että kushilaisille?',
      'Ketkä olivat Egyptin 25. dynastian faaraot?',
    ],
    korostukset: ['pöytävuori'],
    nappi: 'Pyhä pöytävuori Napatassa',
    // 31.8283 E / 18.5367 N — en-Wikipedia "Jebel Barkal"
    // Lähin pelikaupunki: Suakin 183,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6894.3, y: 2586.6 },
    },
    teksti: 'Jebel Barkal on 104 metriä korkea pöytävuori Kariman kylän vieressä, 400 kilometriä '
      + 'Khartumista pohjoiseen. Vuori oli pyhä ensin Kerman kulttuurille ja sitten '
      + 'egyptiläisille: noin 1450 eaa. farao Thutmosis III valtasi paikan ja rakensi sinne '
      + 'linnoitetun asutuksen valtakuntansa etelärajaksi, ja kaupunkia alettiin kutsua '
      + 'Napataksi. Egyptiläiset pystyttivät temppelikokonaisuuden, jonka keskus oli '
      + 'oinaspäisen Napatan Amonin temppeli. Vuoden 800 eaa. jälkeen Jebel Barkal oli jälleen '
      + 'nousevan Kushin pääkaupunki, ja Egyptin 25. dynastian faaraot Kashta, Piye ja Taharqa '
      + 'rakensivat ja laajensivat sen rakennuksia. Raunioissa on ainakin 13 temppeliä, joita '
      + 'kohennettiin yli 1 500 vuoden ajan, ja lähellä Nurissa on kuninkaiden ja kuningattarien '
      + 'pyramidihautoja. Unescon maailmanperintökohde 2003.',
    lahde: 'en-Wikipedia "Jebel Barkal", johdanto-osa sekä osiot "History", "Temples" ja '
      + '"Pyramids" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kerma',
    nimi: 'Kerma',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on deffufa?',
      'Miksi Reisnerin tulkinta Kermasta oli väärä?',
    ],
    korostukset: ['savitiili|savitiilestä'],
    nappi: 'Kaupunki, jota luultiin siirtolaksi',
    // 30.4097 E / 19.6008 N — en-Wikipedia "Kerma"
    // Lähin pelikaupunki: Luxor 226,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6847, y: 2549.8 },
    },
    teksti: 'Kerma oli Kerman kuningaskunnan pääkaupunki ja yksi muinaisen Nubian suurimmista '
      + 'arkeologisista kohteista. Paikalla asuttiin metsästäjä-keräilijöiden aikaan jo 8350 '
      + 'eaa., maanviljely alkoi noin 3000 eaa., ja kaupunki kasvoi valtavan savitiilestä '
      + 'rakennetun temppelin, Läntisen deffufan, ympärille vuoden 1750 eaa. jälkeen. Vuoteen '
      + '1700 eaa. mennessä siellä asui vähintään kymmenentuhatta ihmistä, ja hautausmaalla on '
      + 'yli 30 000 hautaa: suuret haudat pienempien renkaan keskellä kertovat kerroksellisesta '
      + 'yhteiskunnasta. Kerman esineistölle ovat ominaisia sininen fajanssi ja lasitettu '
      + 'kvartsiitti, joiden tekotavat kehitettiin Egyptistä riippumatta. Amerikkalainen George '
      + 'Reisner kaivoi paikkaa 1913–1916 ja piti sitä egyptiläisenä siirtolana; vasta Charles '
      + 'Bonnet\'n ja Geneven yliopiston kaivaukset 1977–2003 osoittivat, että kyseessä oli '
      + 'itsenäinen kaupunkikeskus, joka hallitsi kolmatta kataraktia vuosisatoja.',
    lahde: 'en-Wikipedia "Kerma", johdanto-osa sekä osiot "Kerma and its artifacts" ja '
      + '"Archaeology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'olddongola',
    nimi: 'Vanha Dongola',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Makuria?',
      'Miten valtaistuinsalista tuli moskeija?',
    ],
    korostukset: ['graniittipylväs|graniittipylvästä'],
    nappi: 'Kristillisen Nubian pääkaupunki',
    // 30.7439 E / 18.2231 N — en-Wikipedia "Old Dongola"
    // Lähin pelikaupunki: Suakin 220,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6858.1, y: 2597.4 },
    },
    teksti: 'Vanha Dongola on autioitunut nubialainen kaupunki Niilin itärannalla ja oli '
      + 'keskiaikaisen Makurian valtakunnan pääkaupunki. Se perustettiin 400-luvulla '
      + 'linnoitukseksi, ja kun kristinusko saapui 500-luvun puolivälissä, siitä tuli Makurian '
      + 'pääkaupunki ja kirkkojen kaupunki: Graniittipylväiden kirkossa oli kuusitoista '
      + 'koristeltua graniittipylvästä. Kaupunki oli myös lähtöpiste karavaaneille, jotka '
      + 'suuntasivat länteen Darfuriin ja Kordofaniin. Kuninkaiden valtaistuinsali, 28 metriä '
      + 'pitkä ja kaksikerroksinen linnoitusmainen rakennus, muutettiin moskeijaksi vuonna 1317, '
      + 'ja se pysyi käytössä vuoteen 1969, jolloin siitä tehtiin muinaismuisto. Asutus siirtyi '
      + '1800-luvulla 80 kilometriä alavirtaan joen toiselle puolelle nykyiseksi Dongolaksi, ja '
      + 'puolalainen tutkimusryhmä on kaivanut vanhaa kaupunkia vuodesta 1964.',
    lahde: 'en-Wikipedia "Old Dongola", johdanto-osa sekä osiot "History" ("Foundation and '
      + 'heyday", "The Throne Hall") ja "Polish archaeological expedition to Old Dongola" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'soleb',
    nimi: 'Soleb',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti Solebin temppelin?',
      'Mitä vangittujen kansojen luettelo kertoo?',
    ],
    korostukset: ['oinaansarvi|oinaansarvineen'],
    nappi: 'Farao, joka kuvasi itsensä jumalaksi',
    // 30.3333 E / 20.4333 N — en-Wikipedia "Soleb"
    // Lähin pelikaupunki: Luxor 200,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6844.4, y: 2520.9 },
    },
    teksti: 'Soleb on muinainen kaupunki Nubiassa Niilin länsirannalla, kolmannen kataraktin '
      + 'pohjoispuolella. Karl Richard Lepsius löysi ja kuvasi paikan vuonna 1844. Hiekkakivinen '
      + 'temppeli on farao Amenhotep III:n rakennuttama ja omistettu Amonille sekä faraolle '
      + 'itselleen, joka on kuvattu jumalallistettuna oinaansarvineen; se on eteläisin tunnettu '
      + 'Amenhotep III:n temppeli, ja Ekhnatonin noustua valtaan se vihittiin uudelleen Atonille. '
      + 'Pylvässalin pylväissä on luettelo kansoista, joita egyptiläiset sanoivat voittaneensa: '
      + 'jokaisen kohdalla on kädet sidottu vanki ja kilpi, johon on kirjoitettu paikan nimi. '
      + 'Yhdessä nimessä lukee tꜣ šꜣsw Yhwꜣ eli "Yhwꜣ:n paimentolaisten maa", ja tutkijat '
      + 'kiistelevät siitä, liittyykö nimi Israelin jumalan nimeen vai onko todistusaineisto '
      + 'liian ohut. Paikalla on myös laaja hautausmaa, jonka pienet hautakappelit on koristeltu '
      + 'pyramideilla.',
    lahde: 'en-Wikipedia "Soleb", johdanto-osa sekä osiot "Necropolis", "Amarna Period" '
      + '("Amenhotep III") ja "List of imprisoned peoples" ("tꜣ šꜣsw Yhwꜣ") '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'naqa',
    nimi: 'Naqa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka oli Apedemak?',
      'Miksi keskellä aavikkoa on roomalainen kioski?',
    ],
    korostukset: ['sotajumala'],
    nappi: 'Leijonajumalan temppeli aavikolla',
    // 33.275 E / 16.2694 N — en-Wikipedia "Naqa"
    // Lähin pelikaupunki: Suakin 166,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6942.5, y: 2664.5 },
    },
    teksti: 'Naqa on Meroën kuningaskunnan raunioitunut kaupunki noin viidenkymmenen kilometrin '
      + 'päässä Niilistä itään. Karavaanille se oli kamelin päivämatkan päässä joesta ja siksi '
      + 'kauppapaikka idän reitillä. Kaupungin kaksi suurta temppeliä ovat yhä hyvin '
      + 'säilyneitä: kuningas Natakamanin rakennuttama sadan metrin pituinen Amonin temppeli, '
      + 'jonne johtaa oinaspatsaiden rivi, ja sen länsipuolella Apedemakin temppeli. Apedemak '
      + 'oli Nubiassa palvottu leijonapäinen sotajumala, ja takaseinällä hänet on kuvattu '
      + 'kolmipäisenä ja nelikätisenä. Temppelin vieressä on pieni roomalainen kioski, jonka '
      + 'ovi on egyptiläinen mutta sivut korinttilaispylväitä ja kaari-ikkunoita. Vanhin '
      + 'rakennus on kuningatar Shanakdakheten noin 135 eaa. pystyttämä temppeli, jonka '
      + 'seinissä ovat vanhimmat tunnetut meroiittiset hieroglyfit. Unescon maailmanperintökohde '
      + '2011.',
    lahde: 'en-Wikipedia "Naqa", johdanto-osa sekä osiot "Structure" ("Temple of Amun", '
      + '"Temple of Apedemak", "Roman kiosk") ja "Other" (tarkistettu 6.9.2026).',
  },
  {
    id: 'dinder',
    nimi: 'Dinder',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on maya?',
      'Miksi puiston asukkaat katosivat 1880-luvulla?',
    ],
    korostukset: ['biosfäärialue'],
    nappi: 'Puisto Sahelin ja ylängön rajalla',
    // 35.48 E / 12.29 N — en-Wikipedia "Dinder National Park"
    // Lähin pelikaupunki: Lalibela 119,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7016, y: 2799.8 },
    },
    teksti: 'Dinderin kansallispuisto on Itä-Sudanissa Dinder-joen molemmin puolin, ja se '
      + 'rajautuu Etiopian Alitashin kansallispuistoon. Seutu oli tiheään asuttu, kun '
      + 'eurooppalaiset kävivät siellä ensi kerran 1861, mutta 1880-luvulla mahdistisodan ja '
      + 'nälänhädän aikaan väestö katosi, ja Alfred Harrison löysi 1925 enää jälkiä asutuksesta. '
      + 'Puisto perustettiin 1935 ja siitä tuli biosfäärialue 1979. Ekologisesti se on '
      + 'poikkeuksellinen, koska se osuu Sahelin ja Etiopian ylängön vaihettumisvyöhykkeelle ja '
      + 'sisältää kolme ekosysteemiä: jokivarren, metsämaan ja mayat eli juoluajärvet. Alueella '
      + 'elää 27 suurikokoista nisäkäslajia ja yli 160 lintulajia, ja se on tärkeä muuttolintujen '
      + 'reitti Euraasian ja Afrikan välillä. Riistalaskennat 1971–2001 näyttivät jyrkän '
      + 'laskun: vesipukin kanta putosi 85, ruokopukin 72 ja oribin 68 prosenttia.',
    lahde: 'en-Wikipedia "Dinder National Park", johdanto-osa sekä osiot "History", "Ecology" '
      + 'ja "Threats" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sennar',
    nimi: 'Sennar',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka hallitsi Sennarista käsin?',
      'Miksi kaupunki kutistui 1800-luvulla?',
    ],
    korostukset: ['Funj|Funj-kuningaskunnan'],
    nappi: 'Sinisen Niilin sulttaanikunta',
    // 33.5833 E / 13.55 N — en-Wikipedia "Sennar"
    // Lähin pelikaupunki: Lalibela 189,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6952.8, y: 2757.1 },
    },
    teksti: 'Sennar on kaupunki Sinisen Niilin varrella, ja sen vieressä ovat Funj-kuningaskunnan '
      + 'vanhan pääkaupungin rauniot. Seutu kuului Kushin ja Meroën valtaan noin 750 eaa. '
      + 'vuoteen 350 jaa., sitten Alwan valtakunnalle, kunnes funjit kukistivat sen ja tekivät '
      + 'Sennarista pääkaupunkinsa. Ranskalainen matkalainen Charles-Jacques Poncet arvioi '
      + '1600-luvun lopulla kaupungissa asuvan satatuhatta ihmistä. Kun hollantilainen tutkija '
      + 'Juan Maria Schuver kulki kaupungin läpi huhtikuussa 1881, hän epäili luvun paikkansa '
      + 'pitävyyttä ja huomasi kaupan siirtyneen Karkojiin, joka oli säännöllisen jokiliikenteen '
      + 'päätepiste. Nykyinen kaupunki on vanhan pääkaupungin raunioista kaakkoon.',
    lahde: 'en-Wikipedia "Sennar", osiot "History" ja "Overview" (tarkistettu 6.9.2026).',
  },
];

