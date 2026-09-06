/*
 * MAASTOKOHTEET — NGA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NGA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NGA.json. Työkalu laskee laudan
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
 * Nigerian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nigerjoen merkki on Lokojassa, jossa Benue yhtyy siihen — suisto olisi lehden eteläreunassa ja kahden joen tarina kerrotaan juuri yhtymäkohdassa.
 *
 * MAAILMAN ERÄ M15 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Sukur, Osun-Osogbo, Zuma Rock, Igbo-Ukwu, Yankari, Kainji, Nok
 * ja Badagry. Lähin uusi merkki on Osun-Osogbo 30,1 lautayksikön
 * päässä Orjarannikosta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki
 * kahdeksan ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen
 * kohteen lähin pelikaupunki on kirjattu sen koordinaattirivin
 * viereen.
 */
export const MAASTOKOHTEET_NGA = [
  {
    id: 'chappalwaddi',
    nimi: 'Chappal Waddi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä mambilla-tarut kertovat Gang-vuoresta?',
      'Mikä on Gashaka-Gumtin kansallispuisto?',
    ],
    korostukset: ['Mambilla|Mambillan'],
    nappi: 'Länsi-Afrikan korkein huippu',
    // 11.715 E / 7.0361 N — en-Wikipedia "Chappal Waddi"
    laudat: {
      maailmankartta: { x: 6223.8, y: 2976.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Vuoren toinen nimi on Kuoleman vuori, mutta sen oma, alkuperäinen nimi on Gang. '
      + 'Mambillan ylängön kansan taruissa juuri Gang-vuorella ratkaistiin, tulisiko '
      + 'seuraavasta viljelykaudesta hyvä vai huono — vuori oli useiden vanhojen myyttisten '
      + 'yhteisöjen päämaja. Nigerian ja koko Länsi-Afrikan korkein kohta, 2 419 metriä, on '
      + 'Taraba Statessa lähellä Kamerunin rajaa, Gashaka Gumtin metsänsuojelualueen ja '
      + 'kansallispuiston laidalla. Se kuuluu Bamendan, Alantikan ja Mandaran vuoriketjuun, '
      + 'joka jatkuu Nigeriasta Kameruniin.',
    lahde: 'en-Wikipedia "Chappal Waddi" (tarkistettu 1.9.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä nollameridiaani ja päiväntasaaja leikkaavat?',
      'Mitkä suuret joet laskevat Guineanlahteen?',
    ],
    nappi: 'Trooppisen Atlantin kulmaus',
    // 5 E / 3.3 N — ulappa Nigerin suiston edustalla; artikkelin oma keskipiste on nollasaarella (0 / 0)
    laudat: {
      maailmankartta: { x: 6000, y: 3101.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa, joka ulottuu Liberian Cape '
      + 'Palmasista Gabonin Cape Lopeziin. Juuri tässä lahdessa maapallon koordinaatiston '
      + 'nollapiste — päiväntasaajan ja nollameridiaanin leikkauskohta — osuu avomerelle. '
      + 'Lahteen laskevat monet suuret joet, muiden muassa Niger ja Volta.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'nigerjoki',
    nimi: 'Nigerjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Niger virtaa puolikuun muotoisen kaaren?',
      'Mikä on Nigerin suisto?',
    ],
    korostukset: ['Benue'],
    nappi: 'Länsi-Afrikan pääjoki',
    // 6.74 E / 7.8 N — Lokoja, jossa Benue yhtyy Nigeriin; artikkelin koordinaatti 6,469 / 5,322 on suistossa
    laudat: {
      maailmankartta: { x: 6058, y: 2951 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niger on Länsi-Afrikan pääjoki ja Afrikan kolmanneksi pisin, noin 4 180 kilometriä — '
      + 'edellä ovat vain Niili ja Kongo. Se saa alkunsa Guinean ylängöltä läheltä Sierra '
      + 'Leonen rajaa ja kiertää suuren puolikuun muotoisen kaaren Malin ja Nigerin kautta, '
      + 'kunnes laskee Guineanlahteen valtavan suistonsa läpi. Merkki on Lokojassa, jossa '
      + 'jokeen yhtyy sen suurin sivujoki Benue.',
    lahde: 'en-Wikipedia "Niger River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'benue',
    nimi: 'Benue',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi sivujoki on päähaaraa suurempi?',
      'Mitä nimi Benue tarkoittaa?',
    ],
    korostukset: ['Niger|Nigerin'],
    nappi: 'Virtahepojen joki',
    // 8.53 E / 7.73 N — Makurdi joen keskijuoksulla; artikkelin koordinaatti 6,757 / 7,753 on yhtymäkohdassa Lokojassa
    laudat: {
      maailmankartta: { x: 6117.7, y: 2953.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Lokojassa kaksi jokea kohtaa, ja sivujoki tuo enemmän vettä kuin pääjoki. Benue on '
      + 'kartalla Nigerin sivuhaara, mutta yhtymäkohdassa sen virtaama on suurempi: ennen '
      + '1960-lukua mitattu keskivirtaama oli 3 400 kuutiometriä sekunnissa Benuella ja 3 000 '
      + 'Nigerillä. Nimi tulee tiv-kielen sanasta bernor, virtahepojen joki. Aiemmin se '
      + 'tunnettiin nimellä Chadda. Joki alkaa Pohjois-Kamerunin Adamawan ylängöltä ja kulkee '
      + 'noin 1 400 kilometriä länteen; kesäkuukausina lähes koko matka on veneellä '
      + 'kuljettavissa, mikä tekee siitä tärkeän kulkureitin. Tulvien aikaan sivujoki Mayo '
      + 'Kébbi yhdistää sen jopa Tšad-järven vesistöön.',
    lahde: 'en-Wikipedia "Benue River", johdanto-osa ja osio "Geography" (tarkistettu 1.9.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M15, AFRIKKA 5 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Nigerialla oli neljä maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Osun-Osogbo 30,1 lautayksikön päässä
   * Orjarannikosta (raja KAUPUNGIN_KOHDALLA_SADE on 7,
   * js/fokuskohteet.js).
   *
   * NELJÄ EHDOKASTA KARSIUTUI MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA.
   * Ife on 9,1 lautayksikköä Osun-Osogbosta, Ogbuniken luolat 6,8
   * yksikköä Igbo-Ukwusta, Gashaka-Gumti 12,3 yksikköä Chappal
   * Waddista ja Vanhan Oyon kansallispuisto peräti 3,3 yksikköä
   * Orjarannikosta eli suoraan pelikaupungin päällä. Benin Cityn
   * vallihauta jäi pois kohdelistalta, koska saman erän skandaali
   * "Beninin retkikunta 1897" istuu samassa pisteessä ja kertoo
   * vallihaudasta itsestään. Kuvaton erä; faktat en-Wikipedian
   * raakatekstistä 6.9.2026, ja jokainen `lahde`-rivi kertoo
   * artikkelin osan.
   * ============================================================== */
  {
    id: 'sukur',
    nimi: 'Sukur',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä on kulttuurimaisema maailmanperintökohteena?',
      'Mihin Sukurin rauta meni?',
    ],
    korostukset: ['terassi|terasseiksi'],
    nappi: 'Afrikan ensimmäinen kulttuurimaisema',
    // 13.5719 E / 10.7406 N — en-Wikipedia "Sukur"
    // Lähin pelikaupunki: Tšad-järvi 111,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6285.7, y: 2852.1 },
    },
    teksti: 'Sukur on Unescon maailmanperintökohde kukkulalla Mandaran vuorilla '
      + 'Koillis-Nigeriassa lähellä Kamerunin rajaa. Se oli Afrikan ensimmäinen '
      + 'kulttuurimaisema, joka pääsi maailmanperintöluetteloon — vuonna 1999 — ja perusteina '
      + 'olivat päällikön eli hidin palatsi, kylän aineellinen kulttuuri ja luonnollisiksi '
      + 'terasseiksi muotoillut viljelysrinteet. Paikalta on löydetty rautakautisia sulatusuuneja, '
      + 'malmia ja jauhinkiviä, ja 1600-luvun Dur-dynastian aikana Sukurista tuli Koillis-Nigerian '
      + 'tärkeä raudan raaka-aineen toimittaja aina 1900-luvun ensimmäiselle vuosikymmenelle '
      + 'asti. Hidin palatsi on kukkulan laella suuressa aitauksessa: kuivamuurattua graniittia, '
      + 'sonnitarha, hevostalli ja portti, jota reunustavat kaksi suurta graniittimonoliittia. '
      + 'Alarinteen kylässä talot ovat yksinkertaisia savisia pyöröhuoneita olkikattoineen.',
    lahde: 'en-Wikipedia "Sukur", johdanto-osa sekä osiot "Etymology", "History" ja "Features" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'osunosogbo',
    nimi: 'Osun-Osogbo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä on pyhä lehto?',
      'Kuka oli Susanne Wenger?',
    ],
    korostukset: ['lehto|lehto'],
    nappi: 'Jokijumalattaren metsä',
    // 4.5522 E / 7.7556 N — en-Wikipedia "Osun-Osogbo"
    // Lähin pelikaupunki: Orjarannikko 30,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5985.1, y: 2952.5 },
    },
    teksti: 'Osun-Osogbo on pyhä lehto Osun-joen rannalla Osogbon kaupungin laidalla. Se on '
      + 'useita vuosisatoja vanha ja yksi viimeisistä pyhistä metsistä, joita ennen oli '
      + 'melkein jokaisen jorubakaupungin reunalla ennen kaupungistumista; Unescon '
      + 'maailmanperintöluetteloon se pääsi vuonna 2005. 1950-luvulla lehto rappeutui: '
      + 'pyhäköt jäivät hoitamatta, papit lähtivät, ja alueella kalastettiin, metsästettiin ja '
      + 'kaadettiin puita kielloista huolimatta. Itävaltalainen Susanne Wenger (1915–2009) '
      + 'perusti silloisen kuninkaan eli ataojan tuella New Sacred Art -liikkeen, joka '
      + 'haastoi maakeinottelijat, karkotti salametsästäjät ja alkoi kunnostaa pyhäköitä; '
      + 'Wengerille annettiin kunnianimi Adunni Olorisha. Elokuussa vietettävä Osun-Osogbon '
      + 'juhla kokoaa lehtoon tuhansia ihmisiä, ja perimätiedon mukaan sen taustalla on '
      + 'metsästäjä Olutimehin ja jokijumalatar Yeye Osunin sopimus: suojelu ja vauraus '
      + 'vuosittaista uhrilahjaa vastaan.',
    lahde: 'en-Wikipedia "Osun-Osogbo", johdanto-osa sekä osiot "Osun-Osogbo Festival" '
      + '("History of the Festival", "Celebrations") (tarkistettu 6.9.2026).',
  },
  {
    id: 'zumarock',
    nimi: 'Zuma Rock',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on inselberg?',
      'Miksi kallio on setelissä?',
    ],
    korostukset: ['inselberg|inselberg'],
    nappi: 'Kallio sadan nairan setelissä',
    // 7.2339 E / 9.1303 N — en-Wikipedia "Zuma Rock"
    // Lähin pelikaupunki: Orjarannikko 116,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6074.5, y: 2906.3 },
    },
    teksti: 'Zuma Rock on suuri yksittäinen kalliokohouma eli inselberg Madallan kylässä Nigerin '
      + 'osavaltiossa, Abujasta länteen Kadunaan vievän tien varrella. Se on magmainen '
      + 'tunkeuma, jonka kivilajit ovat gabroa ja granodioriittia ja jonka ikä on '
      + 'prekambrinen; kallio kohoaa noin 725 metrin korkeuteen. Zuma Rock on kuvattu sadan '
      + 'nairan setelissä, ja gbagyit käyttivät sitä aikoinaan puolustusasemana heimosotien '
      + 'aikana. Kallion löysivät 1400-luvulla Zuban asukkaat, jotka kutsuivat sitä nimellä '
      + 'zumwa — sen voi kääntää "helmikanojen paikaksi". Kalliosta kerrotaan yhä monenlaisia '
      + 'tarinoita, ja 1940-luvulla Abujan piirihallinnon virkamies kävi paikallisten '
      + 'varoituksista huolimatta kallion juurella olevassa kylässä selvittääkseen, mikä '
      + 'tarinoissa oli totta.',
    lahde: 'en-Wikipedia "Zuma Rock", johdanto-osa sekä osiot "Discovery" ja "Local legends" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'igboukwu',
    nimi: 'Igbo-Ukwu',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on vahavalu?',
      'Mistä 150 000 lasihelmeä tuli metsävyöhykkeelle?',
    ],
    korostukset: ['lasihelmi|lasihelmeä'],
    nappi: 'Vesikaivo, joka paljasti aarteen',
    // 7.0167 E / 6.0167 N — en-Wikipedia "Igbo-Ukwu"
    // Lähin pelikaupunki: Lagos 19,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6067.2, y: 3010.7 },
    },
    teksti: 'Igbo-Ukwu on kaupunki Anambran osavaltiossa Kaakkois-Nigeriassa, ja se on antanut '
      + 'nimensä yhdelle Länsi-Afrikan tärkeimmistä arkeologisista löydöistä. Ensimmäiset '
      + 'esineet tulivat esiin vuonna 1938, kun Isaiah Anozie kaivoi pihaansa vesisäiliötä; '
      + 'arkeologi Thurstan Shaw teki varsinaiset kaivaukset 1959–1960 ja uudestaan 1964 '
      + 'kolmella alueella, jotka hän nimesi löytäjäperheen mukaan Igbo Isaiahiksi, Igbo '
      + 'Richardiksi ja Igbo Jonahiksi. Löytöjen pääosa ajoittuu ensimmäisen vuosituhannen '
      + 'lopulta toisen alkuun, ja nykytutkimus keskittää toiminnan noin 800- ja 1100-lukujen '
      + 'väliin. Esineistössä on hienosti koristeltuja kupari- ja pronssiastioita, kruunuja, '
      + 'rintapanssareita ja eläinhahmoja, joista monet on valettu vahavalulla; Igbo Richardin '
      + 'kammiosta löytyi istuvassa asennossa haudattu arvohenkilö, ympärillään '
      + 'kuparikoristeita, norsunluuta ja tekstiilejä. Yli 150 000 lasihelmeä tekee löydöstä '
      + 'poikkeuksellisen: osa lasista on peräisin Mesopotamiasta, Egyptistä tai itäiseltä '
      + 'Välimereltä, mutta osa on tehty Länsi-Afrikassa ja tuotua lasia myös työstettiin '
      + 'uudelleen paikan päällä.',
    lahde: 'en-Wikipedia "Igbo-Ukwu", johdanto-osa sekä osiot "Archaeological complex" '
      + '("Discovery and excavation", "The three classic sites", "Metalwork and artistic '
      + 'technology", "Pottery, beads and exchange") (tarkistettu 6.9.2026).',
  },
  {
    id: 'yankari',
    nimi: 'Yankari',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on lämmin lähde?',
      'Miksi puisto menetti kansallispuiston asemansa?',
    ],
    korostukset: ['lämmin lähde|lämpimiä lähteitä'],
    nappi: 'Lämpimät lähteet savannin keskellä',
    // 10.5103 E / 9.7544 N — en-Wikipedia "Yankari Game Reserve"
    // Lähin pelikaupunki: Kano 118,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6183.7, y: 2885.3 },
    },
    teksti: 'Yankari on noin 2 244 neliökilometrin laajuinen luonnonsuojelualue Bauchin '
      + 'osavaltiossa Koillis-Nigeriassa, ja siellä on useita luonnon '
      + 'lämpimiä lähteitä keskellä länsiafrikkalaista savannia. Alue suojeltiin '
      + 'riistaksi 1956 ja avattiin yleisölle 1. joulukuuta 1962; kansallispuistoksi se '
      + 'julistettiin 1991 ja menetti aseman 2006 Bauchin osavaltion hallituksen pyynnöstä. '
      + 'Puistossa ei ole ollut asutusta yli sataan vuoteen, mutta sieltä on löydetty vanhoja '
      + 'raudansulatuspaikkoja ja luolia — 1990-luvun lopulla Delimirin ja Amparan seudulla oli '
      + 'yhä yli viisikymmentä uunia pystyssä. Yankarissa elää yli viisikymmentä nisäkäslajia, '
      + 'muun muassa savanninorsu, roaninantilooppi, puhveli ja virtahepo, sekä yli 350 '
      + 'lintulajia, joista 130 on paikallisia ja 50 palearktisia muuttajia.',
    lahde: 'en-Wikipedia "Yankari Game Reserve", johdanto-osa sekä osiot "History" ja "Wildlife" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kainji',
    nimi: 'Kainji',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on tekoallas?',
      'Mitä leijonien suojelualue tarkoittaa?',
    ],
    korostukset: ['tekoallas|tekoallas'],
    nappi: 'Kolme aluetta yhden altaan ympärillä',
    // 4.5547 E / 10.3684 N — en-Wikipedia "Kainji National Park"
    // Lähin pelikaupunki: Orjarannikko 72,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5985.2, y: 2864.7 },
    },
    teksti: 'Kainjin kansallispuisto perustettiin 1978 Nigerin ja Kwaran osavaltioihin, ja se on '
      + 'noin 5 341 neliökilometrin laajuinen. Puisto koostuu kolmesta osasta: Kainji-järvestä, '
      + 'jossa kalastusta on rajoitettu, sen länsipuolisesta Borgun riista-alueesta ja '
      + 'kaakkoispuolisesta Zugurman riista-alueesta — Borgu on savannimetsää ja 3 929 '
      + 'neliökilometriä, Zugurma pienempi, 1 370 neliökilometriä. Osia erottava Kainji-järvi on '
      + '136 kilometriä pitkä tekoallas. Puistossa on tavattu 65 nisäkäslajia, 350 lintulajia ja '
      + '30 matelija- ja sammakkoeläinlajia, muun muassa leijona, leopardi, karakali, norsu ja '
      + 'afrikanmanaatti, ja järvessä on 82 kalalajia. Vuodesta 2005 alue on ollut Yankarin '
      + 'kanssa yhteinen leijonien suojelualue, ja lokakuussa 2023 Nigerian liittovaltio ja '
      + 'West African Conservation Network allekirjoittivat 31-vuotisen sopimuksen puiston '
      + 'yhteishallinnasta ja ennallistamisesta.',
    lahde: 'en-Wikipedia "Kainji National Park", johdanto-osa sekä osiot "History", "Geography" '
      + 'ja "Fauna" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nok',
    nimi: 'Nok',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on terrakotta?',
      'Miten Nokin veistokset löydettiin?',
    ],
    korostukset: ['terrakotta|terrakottaveistoksista'],
    nappi: 'Variksenpelätin, joka oli muinaisesine',
    // 8.0 E / 9.5 N — en-Wikipedia "Nok culture"
    // Lähin pelikaupunki: Kano 132,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6100, y: 2893.9 },
    },
    teksti: 'Nokin kulttuuri on nimetty Etelä-Kadunan Nok-kylän mukaan, jossa sen '
      + 'terrakottaveistoksista löydettiin ensimmäiset vuonna 1928. Kulttuuri saattoi syntyä '
      + '1500 eaa. ja jatkua vuoteen 1 eaa., ja varhaisimmat terrakottaveistokset lienevät '
      + 'noin 900 eaa. Egyptiläistä kuvataidetta lukuun ottamatta Nokin veistokset ovat '
      + 'varhaisimpia suuria kolmiulotteisia ihmishahmoja koko Afrikan mantereella, ja '
      + 'raudanvalmistus saattoi kehittyä kulttuurin piirissä itsenäisesti 750–550 eaa. '
      + 'Ensimmäisen terrakotan kaivoi esiin eversti Dent Young vuonna 1928 tinakaivoksesta. '
      + 'Viisitoista vuotta myöhemmin, 1943, kaivoksen kirjuri otti löytämänsä pään kotiinsa ja '
      + 'käytti sitä vuoden ajan menestyksekkäästi variksenpelättimenä jamssipellollaan — kunnes '
      + 'arkeologiaa opiskellut virkamies Bernard Fagg huomasi sen ja tunnisti saman tyylin.',
    lahde: 'en-Wikipedia "Nok culture", johdanto-osa sekä osiot "Origin" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'badagry',
    nimi: 'Badagry',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli "paluun ei ole" -muistomerkki?',
      'Miksi laguuni teki kaupungista kauppapaikan?',
    ],
    korostukset: ['laguuni|laguunien'],
    nappi: 'Satama laguunin ja meren välissä',
    // 2.8833 E / 6.4167 N — en-Wikipedia "Badagry"
    // Lähin pelikaupunki: Orjarannikko 71,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5929.4, y: 2997.3 },
    },
    teksti: 'Badagry on rannikkokaupunki Lounais-Nigeriassa Porto Novon salmen pohjoisrannalla, '
      + 'noin 69 kilometriä Lagosista lounaaseen ja aivan Beninin rajan tuntumassa. Se nousi '
      + 'Länsi-Afrikan rannikon kauppakeskukseksi vuosina 1736–1851: purjehduskelpoisten '
      + 'laguunien, salmien ja jokien verkosto teki siitä sekä kauppareitin että suojan, sillä '
      + 'meren ja laguunin väliin jää siinä kohtaa vain noin puolentoista kilometrin kaistale. '
      + 'Transatlanttisen orjakaupan aikana kaupunki toimi välikätenä rannikon '
      + 'eurooppalaiskauppiaiden ja sisämaan kauppiaiden välillä, ja se hyötyi 1700-luvun lopun '
      + 'Porto-Novon ja Dahomeyn välisestä kiistasta; kyläsodissa vangitut myytiin Badagryn '
      + 'huutokaupoissa. Kaupungissa on aiheesta muistomerkki nimeltä "Point of No Return". '
      + 'Marinan kadulle rakennettiin 1845 seudun ensimmäinen kaksikerroksinen talo.',
    lahde: 'en-Wikipedia "Badagry", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

