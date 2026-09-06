/*
 * MAASTOKOHTEET — TZA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TZA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TZA.json. Työkalu laskee laudan
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
 * Tansanian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Tanganjikajärvi kulkee pelin symbolitaksonomiassa merenä (luonto-symboli; erillistä järvityyppiä ei ole).
 *
 * MAAILMAN ERÄ M11 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Olduvain rotko, Serengeti, Kondoan kalliotaide, Kilwa Kisiwani,
 * Bagamoyo, Ujiji, Tabora ja Kalambon putoukset. Lähin uusi merkki on
 * Kalambon putoukset 81,8 lautayksikön päässä Tanganjikasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten
 * kaikki kahdeksan ovat pääkartan merkkejä. Erä on kuvaton, ja
 * jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_TZA = [
  {
    id: 'kilimandzaro',
    nimi: 'Kilimandžaro',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Kilimandžaron nimi tarkoittaa?',
      'Kuka eurooppalainen kertoi vuoresta ensimmäisenä?',
    ],
    nappi: 'Afrikan korkein vuori',
    // 37.3533 E / -3.0758 N — en-Wikipedia "Mount Kilimanjaro"
    laudat: {
      maailmankartta: { x: 7078.4, y: 3314.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kilimandžaro on uinuva tulivuori ja Afrikan korkein vuori: 5 895 metriä merenpinnasta '
      + 'ja lähes viisi kilometriä ympäröivältä ylängöltä, mikä tekee siitä maailman korkeimman '
      + 'vapaasti seisovan vuoren. Nimen alkuperää ei tunneta — se voi tarkoittaa suuruuden '
      + 'vuorta tai vuorta, jolle ei voi kiivetä. Saksalainen lähetyssaarnaaja Johannes Rebmann '
      + 'kertoi vuoresta eurooppalaisille ensimmäisenä vuonna 1848.',
    lahde: 'en-Wikipedia "Mount Kilimanjaro", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Intian valtameri on valtameristä nuorin?',
      'Kuinka syvä valtameri on keskimäärin?',
    ],
    nappi: 'Valtameristä nuorin',
    // 40.3 E / -6.9 N — ulappa Sansibarin ja Dar es Salaamin edustalla; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 7176.7, y: 3441.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman kolmanneksi suurin valtameri, jota rajaavat pohjoisessa '
      + 'Aasia, lännessä Afrikka ja idässä Australia. Geologisesti se on valtameristä nuorin: '
      + 'se syntyi muinaisen Tethysmeren pirstoutuessa vasta noin 20 miljoonaa vuotta sitten, '
      + 'ja siksi sen mannerjalustat ovat kapeita. Keskisyvyyttä valtamerellä on 3 741 metriä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tanganjikajarvi',
    nimi: 'Tanganjikajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä järvi on Tanganjikaakin syvempi?',
      'Mitä reittiä järven vedet päätyvät Atlanttiin?',
    ],
    nappi: 'Maailman pisin makeanveden järvi',
    // 29.5 E / -6.1 N — en-Wikipedia "Lake Tanganyika"
    laudat: {
      maailmankartta: { x: 6816.7, y: 3415.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanganjikajärvi on maailman pisin makeanveden järvi sekä tilavuudeltaan ja '
      + 'syvyydeltään toinen — molemmissa edellä on vain Siperian Baikal. Järvi jakautuu neljän '
      + 'maan kesken, ja Tansanialle siitä kuuluu suurin osuus, lähes puolet. Vedet laskevat '
      + 'Lukugajokea pitkin Kongon vesistöön ja päätyvät lopulta Atlanttiin.',
    lahde: 'en-Wikipedia "Lake Tanganyika", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M11, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Tansanialla oli kolme maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Kalambon putoukset 81,8 lautayksikön päässä
   * Tanganjikasta (raja KAUPUNGIN_KOHDALLA_SADE on 7,
   * js/fokuskohteet.js). Kuvaton erä; faktat en-Wikipedian
   * raakatekstistä 6.9.2026, ja jokainen `lahde`-rivi kertoo
   * artikkelin osan. Ngorongoro jäi pois nimiösyystä: sen merkki
   * osuisi kahdeksan lautayksikön päähän Olduvain rotkosta, ja
   * kraatteri mainitaan Olduvain kortissa.
   * ============================================================== */
  {
    id: 'olduvai',
    nimi: 'Olduvain rotko',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Oldupai tarkoittaa?',
      'Mikä oli Zinjanthropus?',
    ],
    korostukset: ['kivityökalu|kivityökalujen'],
    nappi: 'Ihmiskunnan kerrostumat',
    // 35.3512 E / 2.9936 S — en-Wikipedia "Olduvai Gorge"
    // Lähin pelikaupunki: Kilimandžaro 103,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7011.7, y: 3311.3 },
    },
    teksti: 'Olduvain rotko on noin 48 kilometriä pitkä uoma Serengetin itäisillä tasangoilla, '
      + 'Ngorongoron suojelualueen sisällä. Nimi tulee maasaiden sanasta oldupai, villisisal, '
      + 'jota rotkossa kasvaa; virtaava vesi on kaivanut jopa 90 metriä syvälle jääkautisen '
      + 'järven pohjakerroksiin, ja Olmotin ja Kerimasin tulivuoret ovat peittäneet löydöt '
      + 'tuhkaan. Saksalainen lääkäri Wilhelm Kattwinkel törmäsi rotkoon 1911 etsiessään '
      + 'unitautia, ja Louis ja Mary Leakey tekivät siitä elämäntyönsä. Heinäkuussa 1959 Mary '
      + 'Leakey löysi FLK-paikalta kallon, joka nimettiin Zinjanthropukseksi ja tunnetaan nyt '
      + 'nimellä Paranthropus boisei; seuraavana vuonna heidän poikansa Jonathan löysi '
      + 'alaleuan, josta tuli Homo habiliksen tyyppiyksilö. Rotkon kerrokset kertovat myös '
      + 'kivityökalujen kehityksestä: vanhimmat on ajoitettu 1,7 miljoonan vuoden ikäisiksi.',
    lahde: 'en-Wikipedia "Olduvai Gorge", johdanto-osa sekä osiot "History" ("Discovery and '
      + 'research") ja "Archaeology and geology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'serengeti',
    nimi: 'Serengeti',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä on suuri vaellus?',
      'Mitä sana siringet tarkoittaa?',
    ],
    korostukset: ['vaellus|eläinvaellus'],
    nappi: 'Maailman suurin eläinvaellus',
    // 34.6 E / 2.4 S — en-Wikipedia "Serengeti National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 124,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6986.7, y: 3291.5 },
    },
    teksti: 'Serengetin kansallispuisto on 14 763 neliökilometriä Pohjois-Tansaniassa, ja siellä '
      + 'kulkee maailman suurin vuotuinen eläinvaellus: yli 1,5 miljoonaa valkopartagnuuta ja '
      + '250 000 seepraa, mukana 400 000–500 000 thomsoningasellia ja pienempiä eland-laumoja. '
      + 'Puistossa elää myös Afrikan suurin leijonakanta, yli 3 000 yksilöä. Nimi johdetaan usein '
      + 'maasaiden sanasta siringet, "maa, joka jatkuu loputtomiin", vaikka sanaa ei löydy kielen '
      + 'sanakirjoista. Alue tuli kansallispuistoksi 1940, ja 1959 sen itäosasta erotettiin '
      + 'Ngorongoron suojelualue, jotta maasait saivat jatkaa siellä maankäyttöään. Puisto tuli '
      + 'tunnetuksi 1959, kun Bernhard ja Michael Grzimek julkaisivat kirjan ja elokuvan '
      + 'Serengeti ei saa kuolla. Vuonna 1994 penikkatautiepidemia tappoi kolmasosan alueen '
      + 'leijonista.',
    lahde: 'en-Wikipedia "Serengeti National Park", johdanto-osa sekä osiot "Etymology", '
      + '"History" ja "Wildlife" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kondoa',
    nimi: 'Kondoan kalliotaide',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka maalasi Kondoan kuvat?',
      'Miksi kuvia on päällekkäin?',
    ],
    korostukset: ['kalliosuoja|kalliosuojia'],
    nappi: 'Yhä elävä maalausperinne',
    // 35.8339 E / 4.7244 S — en-Wikipedia "Kondoa Rock-Art Sites"
    // Lähin pelikaupunki: Kilimandžaro 88,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7027.8, y: 3369.1 },
    },
    teksti: 'Keski-Tansaniassa maasaisavannin länsireunalla on kasoittain graniittilohkareita, '
      + 'joiden alle jää tuulelta suojassa olevia kalliosuojia. Niiden sileille seinille on '
      + 'maalattu pitkulaisia ihmisiä, eläimiä ja metsästyskohtauksia. Vanhimmat, punaiset kuvat '
      + 'liitetään metsästäjä-keräilijöihin; niiden päälle on myöhemmin maalattu valkoisia '
      + 'kuvia, usein karjaa, ja ne yhdistetään bantuviljelijöihin. Punavalkoiset kuvat on '
      + 'liitetty kuusilaisiin ja niililäisiin paimentolaisiin. Perinne ei ole kuollut: sandawet '
      + 'käyttävät suojia yhä simbó-parannusseremonioissaan ja maasait rituaaliaterioissa, ja '
      + 'vielä noin 1970 sandawemiehet maalasivat kallioihin. Kisese II -kalliosuojan lattiasta '
      + 'on löytynyt yli 40 000 vuotta vanhoja asumisen jälkiä. Alue nimettiin '
      + 'kansallismuistomerkiksi 1937 ja maailmanperintökohteeksi 2006.',
    lahde: 'en-Wikipedia "Kondoa Rock-Art Sites", johdanto-osa sekä osio "Sites" ("Kisese II '
      + 'Rockshelter") (tarkistettu 6.9.2026).',
  },
  {
    id: 'kilwakisiwani',
    nimi: 'Kilwa Kisiwani',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Ibn Battuta sanoi Kilwasta?',
      'Millä Kilwa vaurastui?',
    ],
    korostukset: ['kolikko|kolikoita'],
    nappi: 'Sulttaanikunta, joka löi omaa rahaa',
    // 39.5128 E / 8.96 S — en-Wikipedia "Kilwa Kisiwani"
    // Lähin pelikaupunki: Sansibar 106,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7150.4, y: 3510.9 },
    },
    teksti: 'Kilwa Kisiwani on 12 neliökilometrin saari Etelä-Tansanian rannikolla, ja se oli '
      + 'keskiaikaisen Kilwan sulttaanikunnan keskus. Radiohiiliajoitus asettaa perustamisen '
      + '800-luvun alkuun, ja 1200–1400-luvuilla sen valta ulottui koko swahilirannikon '
      + 'pituudelle; huipulla saarella asui yli 10 000 ihmistä. Marokkolainen Ibn Battuta kävi '
      + 'siellä 1331 ja kuvasi sen yhdeksi maailman kauneimmista kaupungeista. Vientitavaraa '
      + 'olivat mausteet, kilpikonnankuori, kookosöljy, norsunluu, puuvillakangas, suitsuke ja '
      + 'kulta — Kilwa oli ottanut haltuunsa Sofalan kultakaupan Mosambikissa. Saari löi omaa '
      + 'rahaa noin vuodesta 1100 vuoteen 1600, ja sen kolikoita on löydetty aina Suuresta '
      + 'Zimbabwesta asti. Portugalilaiset ryöstivät ja polttivat kaupungin heinäkuussa 1505. '
      + 'Unescon maailmanperintökohde 1981 yhdessä Songo Mnaran raunioiden kanssa.',
    lahde: 'en-Wikipedia "Kilwa Kisiwani", johdanto-osa sekä osiot "Geography" ja "Historical '
      + 'significance" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bagamoyo',
    nimi: 'Bagamoyo',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä nimi Bagamoyo tarkoittaa?',
      'Kenen ruumis makasi Bagamoyon kirkon tornissa?',
    ],
    korostukset: ['orjakauppa|orjakaupan'],
    nappi: 'Karavaanien pääteasema',
    // 38.9028 E / 6.4444 S — en-Wikipedia "Bagamoyo"
    // Lähin pelikaupunki: Kilimandžaro 88,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7130.1, y: 3426.6 },
    },
    teksti: 'Bagamoyo oli 1800-luvun lopulla Itä-Afrikan tärkein kauppasatama. Nimi merkitsee '
      + 'swahiliksi "laske sydämesi maahan", ja siitä kiistellään yhä: tarkoittiko se kantajaa, '
      + 'joka sai vihdoin laskea kuormansa kuljetettuaan kolmisenkymmentä kiloa norsunluuta '
      + 'sisämaasta, vai orjaa, joka sai luopua toivosta. Arkistotutkimus viittaa siihen, että '
      + 'päävientitavara oli norsunluu ja että moni kantaja oli palkkatyöläinen — mutta '
      + 'orjakaupan muisto on osa kaupungin omaa kulttuuria. Itä-Afrikan orjakauppa kiellettiin '
      + 'virallisesti 1873. Bagamoyosta lähtivät matkaan Burton, Speke, Stanley ja Grant, ja kun '
      + 'David Livingstone kuoli sisämaassa, hänen ruumiinsa laskettiin vanhan kirkon torniin '
      + 'odottamaan nousuvettä ja kuljetusta Sansibariin; tornia kutsutaan nyt Livingstonen '
      + 'torniksi. Kaupunki oli Saksan Itä-Afrikan ensimmäinen pääkaupunki.',
    lahde: 'en-Wikipedia "Bagamoyo", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ujiji',
    nimi: 'Ujiji',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Stanley sanoi tavatessaan Livingstonen?',
      'Kuka pääsi Tanganjikan rannalle ensimmäisenä eurooppalaisena?',
    ],
    korostukset: ['Livingstone|Livingstonen'],
    nappi: 'Tohtori Livingstone, oletan',
    // 29.675 E / 4.9111 S — en-Wikipedia "Ujiji"
    // Lähin pelikaupunki: Tanganjika 84,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6822.5, y: 3375.3 },
    },
    teksti: 'Ujiji on Länsi-Tansanian vanhin kaupunki: alun perin swahiliasutus, 1800-luvun '
      + 'puoliväliin mennessä arabialainen orjakaupan tukikohta Sansibarin sulttaanin nimellisen '
      + 'vallan alla. Richard Burton ja John Speke saapuivat täällä ensimmäisinä '
      + 'eurooppalaisina Tanganjikajärven rannalle 1858. Kuuluisimman hetkensä kaupunki koki 10. '
      + 'marraskuuta 1871, kun Henry Stanley löysi David Livingstonen, jonka moni oli jo '
      + 'luullut kuolleeksi, ja lausui kertoman mukaan sanat "Tohtori Livingstone, oletan?" '
      + 'Livingstone itse kirjoitti, että hänen palvelijansa Susi tuli juosten huutaen '
      + '"englantilainen, minä näen hänet!" ja että karavaanin kärjessä liehunut Yhdysvaltain '
      + 'lippu kertoi tulijan kansallisuuden. Tapaamisen paikalla on nyt muistomerkki ja pieni '
      + 'museo, ja torin lähellä kulkee entinen orjatie. Lontoon lähetysseura perusti '
      + 'ensimmäisen Tanganjikan rannan asemansa Ujijiin 1878.',
    lahde: 'en-Wikipedia "Ujiji", johdanto-osa sekä osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tabora',
    nimi: 'Tabora',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Taborasta tuli karavaanien risteysasema?',
      'Kuka poltti neljäsosan kaupungista 1871?',
    ],
    korostukset: ['mangopuu|mangopuut'],
    nappi: 'Norsunluutien risteys',
    // 32.8 E / 5.0167 S — en-Wikipedia "Tabora"
    // Lähin pelikaupunki: Tanganjika 145,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6926.7, y: 3378.9 },
    },
    teksti: 'Rannikon kauppiaat asettuivat Keski-Tansaniaan 1830-luvulta alkaen norsunluu- ja '
      + 'orjakaravaanien takia, ja swahili- ja omanilaiskauppiaat perustivat 1850-luvulla '
      + 'Kazehin nykyisen Taboran viereen. Vuoteen 1870 mennessä paikassa asui 5 000–10 000 '
      + 'ihmistä noin viidessäkymmenessä suuressa neliötalossa, joissa oli sisäpihat, '
      + 'puutarhapalstat, varastot ja palvelusväen tilat; jokaisessa saattoi asua satoja '
      + 'ihmisiä. Ympärillä oli nyamwezikyliä, joista tulivat sekä ruoka että karavaanien '
      + 'kantajat, ja kauppiaita kävi aina Bugandan kuningaskunnasta asti. Elokuussa 1871 '
      + 'nyamwezihallitsija Mirambon joukot polttivat neljäsosan kaupungista. Vielä 1891 '
      + 'matkaajat kuvasivat Taboraa laittomaksi kaupungiksi, ennen kuin Saksan siirtomaahallinto '
      + 'sai sen haltuunsa. Kadunvarsien mangopuut ovat omanilaiskauppiaiden istuttamia ja '
      + 'satavuotiaita.',
    lahde: 'en-Wikipedia "Tabora", johdanto-osa sekä osiot "History" ja "Food and culture" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kalambo',
    nimi: 'Kalambon putoukset',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on maailman vanhin tunnettu puurakennelma?',
      'Kuinka korkealta Kalambon vesi putoaa?',
    ],
    korostukset: ['puurakennelma|puurakennelma'],
    nappi: 'Maailman vanhin puurakennelma',
    // 31.2396 E / 8.5974 S — en-Wikipedia "Kalambo Falls"
    // Lähin pelikaupunki: Tanganjika 81,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6874.7, y: 3498.8 },
    },
    teksti: 'Kalambojoki syöksyy Tanganjikajärven kaakkoispäässä 235 metriä yhtenä pudotuksena — '
      + 'se on sekä Tansanian että Sambian korkein vesiputous. Alapuolella on viiden kilometrin '
      + 'rotko, jonka syvyys on paikoin 300 metriä. Vielä tärkeämpi on se, mitä putouksen '
      + 'yläpuolelta on kaivettu: paikassa on asuttu yli 447 000 vuotta, ja se on yksi Afrikan '
      + 'merkittävimmistä arkeologisista kohteista. J. D. Clark aloitti kaivaukset 1953 ja '
      + 'jatkoi niitä 1950- ja 1960-luvuilla; siitepölynäytteistä hän pystyi päättelemään, '
      + 'millainen ilmasto ja kasvillisuus alueella kulloinkin vallitsi. Vuonna 2023 paikalta '
      + 'ilmoitettiin löytyneen noin 476 000 vuotta vanhat puupalkit, joita on muotoiltu ja '
      + 'poltettu ja jotka lukittuvat toisiinsa — maailman vanhin tunnettu ihmisen sukulaisen '
      + 'tekemä puurakennelma, vanhempi kuin oma lajimme.',
    lahde: 'en-Wikipedia "Kalambo Falls", johdanto-osa sekä osiot "Archaeology" ja "Pleistocene '
      + 'environmental reconstruction" (tarkistettu 6.9.2026).',
  },
];

