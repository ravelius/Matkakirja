/*
 * MAASTOKOHTEET — COD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs COD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/COD.json. Työkalu laskee laudan
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
 * Kongon demokraattisen tasavallan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Stanleylle ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia), joten nimenä on kansainvälinen asu ja kongolainen nimi Ngaliema mainitaan tekstissä.
 *
 * MAAILMAN ERÄ M5 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA — Ingan
 * padot, Boyoman putoukset, Virungan puisto, Kahuzi-Biéga, Salongan
 * puisto, Garamban puisto, Upemban puisto ja Lubumbashin kaivokset.
 * Lähin uusi merkki on Ingan padot 31,7 lautayksikön päässä
 * Kongo-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat
 * pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_COD = [
  {
    id: 'mountstanley',
    nimi: 'Mount Stanley',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi päiväntasaajan vuorella on jäätiköitä?',
      'Kuka oli Henry Morton Stanley?',
    ],
    korostukset: ['Rwenzori|Rwenzori-vuoristossa'],
    nappi: 'Jäätiköitä päiväntasaajalla',
    // 29.8717 E / 0.3858 N — en-Wikipedia "Mount Stanley"
    laudat: {
      maailmankartta: { x: 6829.1, y: 3198.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Stanley eli Ngaliema kohoaa 5 109 metriin Rwenzori-vuoristossa ja on sekä Kongon '
      + 'demokraattisen tasavallan että Ugandan korkein vuori — koko Afrikassa vain kolme '
      + 'huippua on korkeampia. Vuori on niin korkea, että sen laella on jäätiköitä, vaikka '
      + 'päiväntasaaja kulkee aivan vierestä. Nimensä se sai siirtomaa-ajan '
      + 'tutkimusmatkailijalta Henry Morton Stanleylta, ja se kuuluu Unescon '
      + 'maailmanperintökohteeseen Rwenzorin kansallispuistoon.',
    lahde: 'en-Wikipedia "Mount Stanley", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tanganjikajarvi',
    nimi: 'Tanganjikajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä järvi on Tanganjikaakin syvempi?',
      'Miten järven vesi päätyy Atlanttiin?',
    ],
    korostukset: ['Baikal'],
    nappi: 'Maailman pisin makeanveden järvi',
    // 29.5 E / -6.1 N — en-Wikipedia "Lake Tanganyika" (29,5 / -6,1); järven länsiranta on Kongon puolella
    laudat: {
      maailmankartta: { x: 6816.7, y: 3415.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanganjika on maailman pisin makeanveden järvi, ja sekä tilavuudessa että syvyydessä '
      + 'sen edelle kiilaa vain Siperian Baikal. Järvi jakautuu neljän maan kesken, joista '
      + 'suurimmat osuudet ovat Tansanialla ja Kongon demokraattisella tasavallalla. Sen vedet '
      + 'laskevat Lukuga-jokea pitkin Kongoon ja virtaavat lopulta Atlanttiin asti.',
    lahde: 'en-Wikipedia "Lake Tanganyika", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kongo',
    nimi: 'Kongo',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki ylittää päiväntasaajan kahdesti?',
      'Mistä nimi Kongo tulee?',
    ],
    korostukset: ['Boyoman putoukset|Boyoman putousten'],
    nappi: 'Maailman syvin joki',
    // 18.3 E / 0 N — keskijuoksu Mbandakan kohdalla; en-Wikipedia "Congo River" antaa suulle 12,45 / -6,08
    laudat: {
      maailmankartta: { x: 6443.3, y: 3211.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kongo on ainoa suuri joki, joka ylittää päiväntasaajan kahdesti — se kaartaa '
      + 'pohjoiseen ja palaa takaisin etelään, ja siksi sen valuma-alueella sataa aina '
      + 'jossakin. Se on myös maailman syvin mitattu joki: syvyyksiä on todettu noin 220 '
      + 'metriä. Afrikan joista vain Niili on pidempi, ja virtaamaltaan Kongon ohittavat vain '
      + 'Amazon sekä Ganges ja Brahmaputra yhdessä. Koko vesistö Chambeshistä alkaen on 4 700 '
      + 'kilometriä pitkä, ja valuma-alue kattaa neljä miljoonaa neliökilometriä eli '
      + 'kolmetoista prosenttia Afrikan maapinta-alasta. Boyoman putousten yläpuolella joen '
      + 'nimi vaihtuu Lualabaksi. Nimi Kongo tulee joen eteläpuolella sijainneesta Kongon '
      + 'kuningaskunnasta.',
    lahde: 'en-Wikipedia "Congo River", johdanto-osa ja osio "Name" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M5, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA. Omistaja
   * 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Kongon
   * demokraattisella tasavallalla oli kolme maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki
   * kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi merkki
   * on Ingan padot 31,7 lautayksikön päässä Kongo-laatasta (raja
   * KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js). Kuvaton erä;
   * faktat en-Wikipedian raakatekstistä 6.9.2026, ja jokainen
   * `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'ingan-padot',
    nimi: 'Ingan padot',
    nimio: 'Inga',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka paljon Kongo putoaa Ingan koskissa?',
      'Mitä Grand Inga -hankkeessa suunnitellaan?',
    ],
    korostukset: ['virtaama|virtaama'],
    nappi: 'Maailman suurin vesivoiman varanto',
    // 13.6219 E / -5.5192 N — en-Wikipedia "Inga dams"
    // Lähin pelikaupunki: Kongo 31,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6287.4, y: 3395.6 },
    },
    teksti: 'Ingan padot ovat kaksi vesivoimalaitosta Länsi-Kongossa, noin 225 kilometriä '
      + 'Kinshasasta lounaaseen, maailman mahtavimpiin kuuluvien Ingan koskien äärellä. '
      + 'Kongo-joki putoaa koskissa noin 96 metriä, ja sen keskivirtaama on siinä kohdassa '
      + 'noin 42 000 kuutiometriä sekunnissa; pelkkä koskiosuus sisältää siis lähes 40 '
      + 'gigawatin verran voimaa. Belgian siirtomaahallinto suunnitteli Inga-hanketta jo '
      + 'itsenäistymisen kynnyksellä 1959; Inga I valmistui 1972 ja Inga II 1982. Koskiin on '
      + 'kaavailtu myös paljon suurempaa Grand Inga -laitosta, josta tulisi valmistuessaan '
      + 'maailman suurin vesivoimala — noin 38,9 gigawattia eli yli kaksi kertaa Kiinan '
      + 'Kolmen rotkon padon teho. Grand Inga olisi jokivoimalaitos, jonka tekojärvi jäisi '
      + 'pieneksi.',
    lahde: 'en-Wikipedia "Inga dams", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'boyoman-putoukset',
    nimi: 'Boyoman putoukset',
    nimio: 'Boyoma',
    tyyppi: 'muu',
    kysymykset: [
      'Montako koskea putoussarjaan kuuluu?',
      'Miten wagenya-kalastajat pyytävät kalaa koskissa?',
    ],
    korostukset: ['kolmijalka|kolmijalkoja'],
    nappi: 'Seitsemän koskea sadan kilometrin matkalla',
    // 25.2064 E / 0.4911 N — en-Wikipedia "Boyoma Falls"
    // Lähin pelikaupunki: Viktoria Nyanza 218,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6673.5, y: 3195.1 },
    },
    teksti: 'Boyoman putoukset, aiemmin Stanleyn putoukset, ovat seitsemän kosken sarja '
      + 'Lualaba-joessa Ubundun ja Kisanganin välillä. Yksikään koski ei ole viittä metriä '
      + 'korkeampi, mutta sarja ulottuu yli sadan kilometrin matkalle ja putoaa yhteensä 61 '
      + 'metriä. Vuotuiselta virtaamaltaan ne ovat maailman suurimmat vesiputoukset — '
      + 'suuremmat kuin Niagara tai Iguazú. Viimeisen kosken jälkeen Lualabaa aletaan kutsua '
      + 'Kongoksi. Alinta koskea sanotaan myös Wagenian putoukseksi paikallisten '
      + 'wagenya-kalastajien mukaan: he rakentavat koskeen puisia kolmijalkoja, jotka '
      + 'kiinnitetään veden kallioon syövyttämiin koloihin, ja laskevat niistä alas '
      + 'katiskoita, jotka seulovat virrasta suuret kalat.',
    lahde: 'en-Wikipedia "Boyoma Falls", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'virunga',
    nimi: 'Virungan puisto',
    nimio: 'Virunga',
    tyyppi: 'elain',
    kysymykset: [
      'Milloin puisto perustettiin?',
      'Mitkä kaksi tulivuorta ovat puiston alueella?',
    ],
    korostukset: ['endeeminen|endeemisiä'],
    nappi: 'Afrikan vanhin kansallispuisto',
    // 29.1667 E / -0.9167 N — en-Wikipedia "Virunga National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 91,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6805.6, y: 3242.1 },
    },
    teksti: 'Virungan kansallispuisto Albertin hautavajoaman laidalla Itä-Kongossa '
      + 'perustettiin 1925. Se ulottuu pohjoisesta etelään noin 300 kilometriä pitkälti '
      + 'Ugandan ja Ruandan rajaa myötäillen ja kattaa 7 800 neliökilometriä; korkeus '
      + 'vaihtelee Semliki-joen laakson 680 metristä Ruwenzorin 5 109 metriin. Puiston '
      + 'alueella ovat aktiiviset tulivuoret Nyiragongo ja Nyamuragira, jotka ovat '
      + 'muovanneet sen elinympäristöt. Lajeja on kirjattu yli 3 000, ja niistä yli 300 on '
      + 'endeemisiä Albertin hautavajoamalle — muun muassa itägorilla ja kultamarakatti. '
      + 'Unesco otti puiston maailmanperintöluetteloon 1979 juuri elinympäristöjen ja '
      + 'vuorigorillan takia; vuodesta 1994 se on ollut myös uhanalaisten kohteiden '
      + 'luettelossa levottomuuksien vuoksi.',
    lahde: 'en-Wikipedia "Virunga National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kahuzi-biega',
    nimi: 'Kahuzi-Biéga',
    tyyppi: 'elain',
    kysymykset: [
      'Kuka perusti puiston 1970?',
      'Minkä lajin takia puisto on maailmanperintökohde?',
    ],
    korostukset: ['alamaagorilla|alamaagorillojensa'],
    nappi: 'Gorillapuisto Kivujärven länsipuolella',
    // 28.75 E / -2.5 N — en-Wikipedia "Kahuzi-Biéga National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 130,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6791.7, y: 3294.8 },
    },
    teksti: 'Kahuzi-Biégan kansallispuisto on Bukavun kaupungin lähellä Itä-Kongossa, '
      + 'Kivujärven länsipuolella lähellä Ruandan rajaa. Vanhin osa, Kahuzi-vuoren '
      + 'eläin- ja metsäsuojelualue, perustettiin 27. heinäkuuta 1937 Belgian '
      + 'siirtomaahallinnon aikana, ja belgialainen valokuvaaja ja luonnonsuojelija Adrien '
      + 'Deschryver perusti puiston 1970; viisi vuotta myöhemmin sitä laajennettiin 6 000 '
      + 'neliökilometriin. Puisto on sekä vuoristoa että alankoa: pienempi itäosa on '
      + 'Mitumban vuorilla Albertin hautavajoamalla, suurempi länsiosa alavampaa metsää. '
      + 'Unescon maailmanperintöluetteloon se pääsi 1980 sademetsänsä ja etenkin itäisten '
      + 'alamaagorillojensa takia, ja 1997 se lisättiin uhanalaisten kohteiden luetteloon.',
    lahde: 'en-Wikipedia "Kahuzi-Biéga National Park", johdanto-osa sekä osiot "History" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'salonga',
    nimi: 'Salongan puisto',
    nimio: 'Salonga',
    tyyppi: 'elain',
    kysymykset: [
      'Miten puistoon pääsee?',
      'Milloin puisto poistettiin uhanalaisten luettelosta?',
    ],
    korostukset: ['sademetsä|sademetsäsuojelualue'],
    nappi: 'Afrikan suurin sademetsäpuisto',
    // 21.0 E / -2.0 N — en-Wikipedia "Salonga National Park"
    // Lähin pelikaupunki: Kongo 282,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6533.3, y: 3278.2 },
    },
    teksti: 'Salongan kansallispuisto Kongo-joen altaassa on Afrikan suurin trooppinen '
      + 'sademetsäsuojelualue: noin 36 000 neliökilometriä neljän maakunnan alueella. Unesco '
      + 'otti sen maailmanperintöluetteloon 1984 laajan ja verrattain koskemattoman '
      + 'sademetsän sekä monen harvinaisen lajin elinympäristön suojelemisesta; 1999 se '
      + 'siirtyi uhanalaisten kohteiden luetteloon salametsästyksen ja rakentamisen takia ja '
      + 'poistettiin sieltä 2021 tilanteen parannuttua. Puisto on suunnilleen puolivälissä '
      + 'Kinshasaa ja Kisangania, eikä siellä ole teitä: suurimpaan osaan pääsee vain jokia '
      + 'pitkin. Osia siitä ei ole koskaan järjestelmällisesti tutkittu. Eteläosassa asuu '
      + 'iyaelima-kansaa, ja sinne kuljetaan Lokoro- ja Lula-jokia myöten.',
    lahde: 'en-Wikipedia "Salonga National Park", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'garamba',
    nimi: 'Garamban puisto',
    nimio: 'Garamba',
    tyyppi: 'elain',
    kysymykset: [
      'Minkä lajin takia puisto pääsi maailmanperintöluetteloon?',
      'Millä vyöhykkeellä puisto sijaitsee?',
    ],
    korostukset: ['savanni|savannivyöhykkeellä'],
    nappi: 'Afrikan vanhimpia puistoja',
    // 29.25 E / 4.0 N — en-Wikipedia "Garamba National Park"
    // Lähin pelikaupunki: Bahr el Ghazal 152,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6808.3, y: 3078.1 },
    },
    teksti: 'Garamban kansallispuisto Koillis-Kongossa kattaa lähes 5 200 neliökilometriä ja '
      + 'on yksi Afrikan vanhimmista puistoista: se perustettiin 1938. Unescon '
      + 'maailmanperintöluetteloon se otettiin 1980, koska se suojelee pohjoisen '
      + 'valkosarvikuonon, afrikannorsun, virtahevon ja kirahvin elinympäristöä. Puisto '
      + 'rajautuu lännessä, etelässä ja idässä Gangala-na-Bodion metsästysalueeseen ja '
      + 'pohjoisessa Etelä-Sudaniin. Se on sudanilais-guinealaisella savannivyöhykkeellä, '
      + 'kahden lajiston kohtauspaikassa, ja siksi sen eläimistö on monipuolinen — vaikka '
      + 'kannat ovat viime vuosikymmeninä pienentyneet salametsästyksen takia. Puistoa on '
      + 'hoitanut vuodesta 2005 African Parks yhdessä Kongon luonnonsuojelulaitoksen kanssa.',
    lahde: 'en-Wikipedia "Garamba National Park", johdanto-osa ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'upemba',
    nimi: 'Upemban puisto',
    nimio: 'Upemba',
    tyyppi: 'elain',
    kysymykset: [
      'Kuinka suuri puisto oli perustettaessa?',
      'Mikä joki rajaa puiston alaosaa?',
    ],
    korostukset: ['painanne|painanteessa'],
    nappi: 'Järviä, soita ja Kibaran ylätasanko',
    // 26.5833 E / -9.0167 N — en-Wikipedia "Upemba National Park"
    // Lähin pelikaupunki: Tanganjika 101,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6719.4, y: 3512.8 },
    },
    teksti: 'Upemban kansallispuisto on Kaakkois-Kongossa Haut-Lomamin, Lualaban ja '
      + 'Haut-Katangan maakuntien alueella. Kun se perustettiin 15. toukokuuta 1939, sen '
      + 'pinta-ala oli 17 730 neliökilometriä ja se oli Afrikan suurin puisto; rajoja '
      + 'tarkistettiin heinäkuussa 1975, ja nykyään varsinaista puistoa on 10 000 '
      + 'neliökilometriä sekä liitännäisaluetta 3 000 lisää. Puiston alaosa on Upemban '
      + 'painanteessa, rehevässä järvien ja soiden maisemassa, jonka keskellä on '
      + 'Upembajärvi ja jota rajaa Lualaba-joki; yläosa nousee kuivemmille Kibaran '
      + 'ylätasangon vuorille. Puiston sisällä on myös muutamia kyliä. Salametsästys, '
      + 'saastuminen sekä pakolaisten ja aseellisten ryhmien liikkeet ovat uhanneet aluetta '
      + 'viime vuosina.',
    lahde: 'en-Wikipedia "Upemba National Park", johdanto-osa sekä osiot "Geography" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lubumbashin-kaivokset',
    nimi: 'Lubumbashin kaivokset',
    nimio: 'Lubumbashi',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi kaupungin paikka valittiin juuri siitä?',
      'Mitä muuta kuin kuparia Union Minière tuotti?',
    ],
    korostukset: ['kuparivyöhyke|kuparivyöhykkeen'],
    nappi: 'Élisabethville ja kuparivyöhykkeen malmi',
    // 27.4828 E / -11.6642 N — en-Wikipedia "Lubumbashi"
    // Lähin pelikaupunki: Tanganjika 154,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6749.4, y: 3602 },
    },
    teksti: 'Lubumbashi on Kongon toiseksi suurin kaupunki maan kaakkoisnurkassa lähellä '
      + 'Sambian rajaa ja alueen kaivostoiminnan keskus. Belgian hallinto perusti sen 1910 '
      + 'nimellä Élisabethville kuningatar Elisabethin mukaan, ja varakenraalikuvernööri '
      + 'Emile Wangermée valitsi paikan siksi, että lähellä olivat Etoile du Congon '
      + 'kuparikaivos ja Union Minière du Haut-Katangan sulatusuuni Lubumbashi-joen varrella. '
      + 'Yhtiö oli perustettu 1906, ja se hallitsi kuparivyöhykkeen kaivosteollisuutta '
      + 'vuoteen 1966: sen päätuote oli kupari, mutta se tuotti myös tinaa, kobolttia, '
      + 'radiumia, uraania, sinkkiä, kadmiumia, germaniumia, mangaania, hopeaa ja kultaa. '
      + 'Kaivokset nationalisoitiin 1966, ja yhtiöstä tuli lopulta nykyinen Umicore.',
    lahde: 'en-Wikipedia "Lubumbashi", johdanto-osa ja osio "Élisabethville under Belgian '
      + 'rule", sekä en-Wikipedia "Union Minière du Haut-Katanga", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
];

