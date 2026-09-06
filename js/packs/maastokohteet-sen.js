/*
 * MAASTOKOHTEET — SEN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SEN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SEN.json. Työkalu laskee laudan
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
 * Senegalin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maan korkein kohta on nimeltä ja korkeudelta vaatimaton Baunezin harjanne (648 m, en-Wikipedia "Geography of Senegal"), joten listalla ei ole vuorta — valtameri ja kaksi suurta jokea ovat maaston tärkeimmät.
 *
 * MAAILMAN ERÄ M12 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Gorée, Saint-Louis, Djoudjin lintupuisto, Sine Ngayènen kivikehät,
 * Touban moskeija, Joal-Fadiouth, Saloumin suisto ja Ziguinchor.
 * Lähin uusi merkki on Joal-Fadiouth 15,1 lautayksikön päässä
 * Dakar-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat
 * pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_SEN = [
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on Afrikan mantereen läntisin kohta?',
      'Miksi Cap-Vert ja Kap Verde eivät ole sama paikka?',
    ],
    korostukset: ['Cap-Vert|Cap-Vertin'],
    nappi: 'Manner-Afrikan läntisin ranta',
    // -17.9 E / 14.5 N — ulappa Dakarin ja Cap-Vertin niemen edustalla; valtameriartikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5236.7, y: 2724.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Senegalin rannikolla se kohtaa koko '
      + 'Afro-Euraasian mantereen läntisimmän kohdan: Cap-Vertin niemen, jolla Dakar sijaitsee. '
      + 'Portugalilaiset löytöretkeilijät nimesivät niemen vihreäksi — 570 kilometriä '
      + 'lännempänä sijaitseva Kap Verden saarivaltio on saanut nimensä juuri tästä niemestä.',
    lahde: 'en-Wikipedia "Atlantic Ocean" ja "Cap-Vert", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'senegaljoki',
    nimi: 'Senegaljoki',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä nimi Sonedech tarkoittaa?',
      'Mikä Langue de Barbarie on?',
    ],
    korostukset: ['Langue de Barbarie|Langue de Barbarie'],
    nappi: 'Rajajoki Saharan reunalla',
    // -16.5289 E / 15.7881 N — en-Wikipedia "Senegal River" — koordinaatti on suistossa Saint-Louisin kohdalla
    laudat: {
      maailmankartta: { x: 5282.4, y: 2680.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Yhdellä joella oli kerran kymmenen nimeä. Portugalilaiset kutsuivat sitä Zenegaksi, '
      + 'wolofit Dengueh\'ksi, toucouleurit Mayoksi, soninket Colleksi — ja João de Barrosin '
      + 'mukaan alkuperäinen wolofinkielinen nimi oli Ovedech, tämä joki, tai Sonedech, meidän '
      + 'jokemme. 1400-luvun purjehtija Alvise Cadamosto uskoi vielä, että Senegal ja Egyptin '
      + 'Niili ovat saman Eedenistä lähtevän virran haaroja. Joki on 1 086 kilometriä pitkä, ja '
      + 'suuri osa sen juoksusta on Senegalin ja Mauritanian raja. Kaédin jälkeen se jakautuu '
      + 'kahdeksi rinnakkaiseksi haaraksi, jotka yhtyvät vasta kahdensadan kilometrin päässä '
      + 'Podorin alapuolella, ja laskee Atlanttiin Saint-Louis\'n saarikaupungin ohitse — '
      + 'merestä sen erottaa ohut hiekkakieleke, Langue de Barbarie.',
    lahde: 'en-Wikipedia "Senegal River", johdanto-osa sekä osiot "Geography", "European contact" '
      + 'ja "Etymology" (tarkistettu 1.9.2026).',
  },
  {
    id: 'gambiajoki',
    nimi: 'Gambiajoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Gambian valtio on joen muotoinen?',
      'Mikä James Island on?',
    ],
    korostukset: ['Fouta Djallon|Fouta Djallonin'],
    nappi: 'Joki jonka ympärille piirtyi valtio',
    // -12.85 E / 13 N — joen yläjuoksu Kaakkois-Senegalissa; artikkelin koordinaatti -16,567 / 13,467 on suulla Banjulissa
    laudat: {
      maailmankartta: { x: 5405, y: 2775.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gambian valtio on joen muotoinen, ja siihen on tarkka syy. Vuoden 1889 Britannian ja '
      + 'Ranskan sopimus veti rajan kymmenen kilometriä joen molemmin puolin niin kauas '
      + 'sisämaahan kuin merialukset pääsivät — Yarbutendaan asti, nykyisen Koinan tienoille. '
      + 'Britannialle jäi siis täsmälleen se osa joesta, joka kannatti laivoja. Rajaa pidettiin '
      + 'tuolloin väliaikaisena; se ei ole muuttunut sen jälkeen. Joki alkaa Guinean Fouta '
      + 'Djallonin ylängöltä, kulkee 1 120 kilometriä Senegalin halki ja laskee Atlanttiin '
      + 'Banjulissa, ja purjehduskelpoista siitä on noin puolet. Suullaan se levenee yli '
      + 'kymmenen kilometrin levyiseksi. Sen varrella olivat vanhat kauppapaikat Albreda, '
      + 'Juffure ja James Island, joka on nykyään maailmanperintökohde.',
    lahde: 'en-Wikipedia "Gambia River", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
  /*
   * ── MAAILMAN ERÄ M12 (LÄNSI-AFRIKKA) 6.9.2026 ────────────────────
   *
   * Kahdeksan KOHDETTA Senegaliin. Yksikään ei ole pelikaupungin
   * kohdalla: lähin uusi merkki on Joal-Fadiouth 15,1 lautayksikön
   * päässä Dakar-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), ja jokaisen
   * kohteen lähin pelikaupunki on kirjattu koordinaattirivin viereen.
   * Erä on kuvaton, ja jokainen väite on en-Wikipedian raakatekstin
   * katteessa.
   *
   * NIOKOLO-KOBA JÄI POIS MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA: puiston
   * koordinaatti on 5,0 lautayksikön päässä saman listan Gambiajoesta,
   * eli merkit olisivat käytännössä yksi merkki. Lac Rose jäi pois
   * toisesta syystä: se on järvi, ja maastotyyppi kasvattaisi maaston
   * eikä kohteiden lukua.
   */
  {
    id: 'goreen-saari',
    nimi: 'Gorée',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä nimi Gorée tulee?',
      'Milloin saari liitettiin maailmanperintöluetteloon?',
    ],
    korostukset: ['orjakauppa|orjakaupasta'],
    nappi: 'Kahden kilometrin päässä Dakarista',
    // 17.3983 W / 14.6669 N — en-Wikipedia "Gorée"
    // Lähin pelikaupunki: Dakar 26,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5253.4, y: 2719.1 },
    },
    teksti: 'Gorée on 18,2 hehtaarin saari kahden kilometrin päässä Dakarin satamasta ja '
      + 'samalla yksi Dakarin kaupunginosista — sen pienin ja vähäväkisin. Saari tunnetaan '
      + 'Atlantin orjakaupasta, vaikka Senegalin suuremmat orjakaupan keskukset olivat '
      + 'pohjoisempana Saint-Louis’ssa ja etelämpänä Gambian suurten jokien suulla. '
      + 'Nimi on väännös hollantilaisesta muodosta Goeree; hollantilaiset olivat nimenneet '
      + 'saaren oman Goereensa mukaan tai sanoista goede reede, hyvä ankkuripaikka. '
      + 'Portugalilaiset kauppiaat asettuivat saarelle jo 1444, ja Vasco da Gama poikkesi '
      + 'sen kappelissa 1502; makeaa vettä saarella ei ollut, joten ennen eurooppalaisia '
      + 'siellä ei asuttu vakinaisesti. Gorée oli 1978 yksi maailman kahdestatoista '
      + 'ensimmäisestä maailmanperintökohteesta.',
    lahde: 'en-Wikipedia "Gorée", johdanto-osa sekä osiot "History and slave trade" ja '
      + '"Dutch West India Company rule" (tarkistettu 6.9.2026).',
  },
  {
    id: 'saint-louis',
    nimi: 'Saint-Louis',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä siirtomaan pääkaupunki Saint-Louis oli?',
      'Mikä hiekkakieleke erottaa kaupungin merestä?',
    ],
    korostukset: ['Langue de Barbarie|Langue de Barbarie'],
    nappi: 'Ranskan Länsi-Afrikan vanha pääkaupunki',
    // 16.5 W / 16.0333 N — en-Wikipedia "Saint-Louis, Senegal"
    // Lähin pelikaupunki: Dakar 50,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5283.3, y: 2672.5 },
    },
    teksti: 'Saint-Louis on Senegalin luoteiskulmassa lähellä Senegaljoen suuta, ja se oli '
      + 'Ranskan Senegalin pääkaupunki 1673–1902 sekä koko Ranskan Länsi-Afrikan pääkaupunki '
      + '1895–1902, kunnes hallinto siirtyi Dakariin. Vuosina 1920–1957 se oli myös naapurina '
      + 'olevan Mauritanian pääkaupunki. Vanha siirtomaakaupunki on runsaan kahden kilometrin '
      + 'pituisella mutta vain noin 400 metriä leveällä saarella keskellä jokea, ja merestä '
      + 'sen erottaa Langue de Barbarie, kolmesataa metriä leveä hiekkakieleke. Wolofinkielinen '
      + 'nimi Ndar on ollut saaren nimi jo ennen ranskalaisia. Kaupunki pääsi '
      + 'maailmanperintöluetteloon 2000, mutta merenpinnan nousu uhkaa sitä: Senegalin '
      + 'valtion selvityksen mukaan jopa 80 prosenttia kaupungista voi olla tulvavaarassa '
      + 'vuoteen 2080 mennessä.',
    lahde: 'en-Wikipedia "Saint-Louis, Senegal", johdanto-osa sekä osiot "Etymology" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'djoudjin-lintupuisto',
    nimi: 'Djoudjin lintupuisto',
    nimio: 'Djoudj',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka monta lintulajia Djoudjissa on havaittu?',
      'Mikä kasvi vei puiston uhanalaisten kohteiden listalle?',
    ],
    nappi: 'Ensimmäinen vesi Saharan jälkeen',
    // 16.2741 W / 16.3585 N — en-Wikipedia "Djoudj National Bird Sanctuary"
    // Lähin pelikaupunki: Dakar 62,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5290.9, y: 2661.4 },
    },
    teksti: 'Djoudj on Senegaljoen kaakkoisrannalla Saint-Louis’n koillispuolella, ja se on '
      + 'monelle muuttolinnulle ensimmäinen kosteikko Saharan ylityksen jälkeen. Puiston '
      + '16 000 hehtaarilta on kirjattu 395 lintulajia ja lähes kolme miljoonaa lintua, mikä '
      + 'tekee siitä maailman kolmanneksi suurimman lintusuojelualueen. Näkyvimpiä ovat '
      + 'pelikaanit ja flamingot, mutta tärkeimpiä on vaatimaton sarakerttunen: Djoudj on '
      + 'ainoa tunnettu merkittävä talvehtimispaikka, jonka lajille on toistaiseksi löydetty. '
      + 'Vieraslajiksi levinnyt jättisalvinia vei alueen 1984 uhanalaisten maailmanperintökohteiden '
      + 'listalle, jolta se poistettiin 2006. Puistossa elää myös suuri joukko krokotiileja ja '
      + 'manaatteja.',
    lahde: 'en-Wikipedia "Djoudj National Bird Sanctuary", johdanto-osa ja osio "Environmental '
      + 'issues" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sine-ngayene',
    nimi: 'Sine Ngayènen kivikehät',
    nimio: 'Sine Ngayène',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta kivikehää Senegambiassa on?',
      'Mistä kivestä pylväät on tehty?',
    ],
    korostukset: ['lateriitti|lateriittia'],
    nappi: 'Maailman suurin kivikehien keskittymä',
    // 15.5225 W / 13.6911 N — en-Wikipedia "Senegambian stone circles"
    // Lähin pelikaupunki: Dakar 47,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5315.9, y: 2752.3 },
    },
    teksti: 'Sine Ngayène on Senegalin puolen pääkohde siinä kivikehien maisemassa, joka '
      + 'jatkuu Gambian puolelle Wassuun ja Kerr Batchiin. Kehiä ja hautakumpuja on yli '
      + 'tuhat — vuoden 1982 tutkimus laski 1 145 kohdetta — noin 350 kilometriä pitkällä '
      + 'ja sata kilometriä leveällä alueella, ja se on maailman suurin kivikehien '
      + 'keskittymä. Pylväät on louhittu lateriittia rautatyökaluin, hiottu sileiksi ja '
      + 'veistetty keskenään samanlaisiksi: keskimäärin kaksi metriä korkeiksi ja '
      + 'seitsemän tonnin painoisiksi. Rakennusajaksi arvioidaan 200-luvulta eaa. '
      + '1500-luvulle jaa., ja Wassun hautakummut on ajoitettu vuosiin 927–1305. Kukaan '
      + 'nykyinen kansa ei kerro suullisessa perinteessään rakentaneensa niitä, joten '
      + 'tekijöistä ei ole yksimielisyyttä. Unesco liitti kohteet luetteloonsa 2006.',
    lahde: 'en-Wikipedia "Senegambian stone circles", johdanto-osa sekä osiot "Description and '
      + 'history" ja "Attribution" (tarkistettu 6.9.2026).',
  },
  {
    id: 'touban-moskeija',
    nimi: 'Touban moskeija',
    nimio: 'Touba',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti Touban moskeijan?',
      'Kuinka korkea on moskeijan keskimminareetti?',
    ],
    korostukset: ['muridiveljeskunta|muridiveljeskunnan'],
    nappi: 'Muridien pyhä kaupunki',
    // 15.8756 W / 14.8631 N — en-Wikipedia "Great Mosque of Touba"
    // Lähin pelikaupunki: Dakar 26,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5304.1, y: 2712.5 },
    },
    teksti: 'Touban suuren moskeijan perusti 1887 Ahmadou Bamba, muridiveljeskunnan eli '
      + 'senegalilaisen sufilaissuuntauksen perustaja. Bamba kuoli 1927 ja on haudattu '
      + 'moskeijaan; suunnitelma syntyi hänen viimeisinä vuosinaan, ja Ranskan siirtomaahallinto '
      + 'hyväksyi sen empimisen jälkeen 1926. Rakentaminen viivästyi ensin varojen '
      + 'kavaltamisen, sitten sotavuosien takia: perustukset valmistuivat 1932, työ seisoi '
      + '1939–1947, ja moskeija vihittiin käyttöön vasta 1963. Rakennus on 100 metriä pitkä '
      + 'ja 80 leveä, siinä on seitsemän minareettia ja neljätoista kupolia, ja keskimminareetti '
      + 'kohoaa 96 metriin. Ympärillä ovat kalifien mausoleumit, 160 000 niteen kirjasto ja '
      + 'Armon kaivo, ja moskeija on vuotuisen Grand Magal -pyhiinvaelluksen määränpää.',
    lahde: 'en-Wikipedia "Great Mosque of Touba", johdanto-osa sekä osiot "History" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'joal-fadiouth',
    nimi: 'Joal-Fadiouth',
    nimio: 'Fadiouth',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Fadiouthin saari on tehty?',
      'Millä kulkuvälineillä Fadiouthissa liikutaan?',
    ],
    korostukset: ['simpukankuori|simpukankuorista'],
    nappi: 'Saari simpukankuorista',
    // 16.8333 W / 14.1667 N — en-Wikipedia "Joal-Fadiouth"
    // Lähin pelikaupunki: Dakar 15,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5272.2, y: 2736.2 },
    },
    teksti: 'Joal on mantereella Petite Côten päässä, Fadiouth sillan takana saarella, joka '
      + 'on kasautunut simpukankuorista — samasta aineesta tehdään myös talot ja käsityöt. '
      + 'Moottoriajoneuvoja kylässä ei ole, ja siitä kerrotaan jo tulotien kyltissä. '
      + 'Kristittyjä ja muslimeja on molempia paljon, ja heidän hautausmaansa ovat yhteisesti '
      + 'toisella kuorisaarella; toinen nähtävyys ovat paalujen päällä veden yllä seisovat '
      + 'viljamakasiinit. Serer-kansan uskotaan asettuneen seudulle, kun almoravidien '
      + 'eteneminen 1000-luvulla pakotti heidät pois Senegaljoen laaksosta. Siirtomaa-aikana '
      + 'Joalista tuli yksi Länsi-Senegalin suurimmista kauppapaikoista: 1500-luvun lopulla '
      + 'siellä oli sekä hollantilaisia että portugalilaisia kauppiaita, ja noin vuoteen 1635 '
      + 'asti kylässä asui portugalilaisjuutalaisten yhteisö, joka sai paikallisen päällikön '
      + 'suojeluksessa tunnustaa uskontonsa avoimesti.',
    lahde: 'en-Wikipedia "Joal-Fadiouth", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'saloumin-suisto',
    nimi: 'Saloumin suisto',
    nimio: 'Saloum',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri Saloumin kansallispuisto on?',
      'Mitä puiston vesialueilla kasvatetaan?',
    ],
    korostukset: ['mangrove|mangrove'],
    nappi: 'Suisto, jossa joki kohtaa Atlantin',
    // 16.6333 W / 13.7 N — en-Wikipedia "Saloum Delta National Park"
    // Lähin pelikaupunki: Dakar 29,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5278.9, y: 2752 },
    },
    teksti: 'Saloumin suiston kansallispuisto perustettiin 1976 sinne, missä Saloumjoki laskee '
      + 'Atlanttiin. Puisto on 760 neliökilometriä ja osa 1 800 neliökilometrin '
      + 'biosfäärialuetta sekä maailmanperintökohdetta; vettä siitä on 610, vuorovesialueen '
      + 'mangrove- ja suolakasvillisuutta 70 ja savannia ja metsää 80 neliökilometriä. Alue on '
      + 'Itä-Atlantin muuttoreitillä, ja siellä pesivät tai talvehtivat muun muassa '
      + 'kuningastiira, isoflamingo, kapustahaikara, sirppisirri, karikukko ja pikkusirri. '
      + 'Suistossa harjoitetaan kestävää simpukankasvatusta, joka on paikallisille tärkeä '
      + 'ravinnon ja vientitulon lähde. Dakariin on noin sata kilometriä pohjoiseen.',
    lahde: 'en-Wikipedia "Saloum Delta National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ziguinchor',
    nimi: 'Ziguinchor',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä joen suulla Ziguinchor on?',
      'Mitä nimen arvellaan tarkoittavan?',
    ],
    korostukset: ['Casamance|Casamancen'],
    nappi: 'Casamancen pääkaupunki',
    // 16.2667 W / 12.5833 N — en-Wikipedia "Ziguinchor"
    // Lähin pelikaupunki: Dakar 68,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5291.1, y: 2789.9 },
    },
    teksti: 'Ziguinchor on Casamancen alueen pääkaupunki Casamancejoen suulla, Senegalin '
      + 'kahdeksanneksi suurin kaupunki ja Gambian erottama muusta maasta. Ilmasto on toinen '
      + 'kuin puolikuivassa pohjoisessa: Länsi-Afrikan monsuuni tuo vuodessa noin 1 547 '
      + 'millimetriä sadetta. Kaupunki on ollut kauppapaikka vuosisatoja, sillä se on '
      + 'Casamancen kapeimmalla kohdalla ja toisessa päässä kannasta, jonka yli kuljettiin '
      + 'Cacheujoelle. Nimestä kiistellään: tunnetuimman selityksen mukaan se tulee '
      + 'portugalin sanoista "Cheguei e choram", tulin ja he itkevät, koska seudun asukkaat '
      + 'itkivät nähdessään eurooppalaisten saapuvan; toisten mukaan nimi on bainuk-kielinen '
      + 'ja vanhempi kuin portugalilaiset. Virallinen eurooppalainen asutus alkoi 1645, kun '
      + 'portugalilaiset perustivat sinne Cacheun alaisen kauppapaikan.',
    lahde: 'en-Wikipedia "Ziguinchor", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
