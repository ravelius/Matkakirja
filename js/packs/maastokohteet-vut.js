/*
 * MAASTOKOHTEET — VUT. Vanuatun maasto ja kahdeksan kohdetta.
 *
 * ── MAAILMAN ERÄ M18 (6.9.2026) ───────────────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Vanuatulla ei ollut ennen tätä erää yhtäkään karttamerkkiä, ei
 * eläintäkyä eikä skandaalia (docs/moduulit/karttanostot-kattavuus.md,
 * Oseania). Kiintiö on kahdeksan KOHDETTA, kolme MAASTOKOHDETTA ja
 * kaksi skandaalia; skandaalit asuvat js/packs/skandaalit.js:ssä.
 *
 * ELÄINTÄKY JÄI POIS, JA SYY ON LAUDAN MAAMUOTO EIKÄ LÄHDE. Vanuatun
 * eläintäky olisi ollut kookoskrapu, mutta tests/elaintakyt.test.mjs
 * vaatii pisteeltä kolme asiaa yhtä aikaa: se on maalla
 * (js/mapart.js isOnLand), maan monikulmion sisällä ja vähintään 35
 * lautayksikön päässä jokaisesta kaupunkimerkistä. Koko saariketju
 * käytiin läpi 0,05 asteen ruudukolla (lon 165,5…170,5, lat −21…−13):
 * ainoa alue, jonka lauta tuntee maaksi, on Efaten pohjoisosa Port
 * Vilan ympärillä, ja siellä kauimmainen kelvollinen piste on 7,2
 * lautayksikön päässä laatasta. Sellaista pistettä, joka täyttäisi
 * kaikki kolme ehtoa, ei siis ole olemassa. Sama vaje on jo Fidžillä ja
 * Salomonsaarilla (erä M2). Vartioita ei ole muutettu.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Paikat on johdettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * en-Wikipedian coordinates-propin asteista. Vain maailmankartan rivi
 * (Euroopan erillislaudasta on luovuttu, Raamattu 30.8.2026).
 *
 * KAKSI VUORTA JA MERI, EI JÄRVEÄ EIKÄ SAARTA. Vanuatun oma järvi
 * (Letas) on Gauan kaldeerassa eli samassa pisteessä kuin saaren
 * kohdemerkki, ja jokainen saariehdokas olisi ollut toisen merkin
 * päällä — saariketju on kapea. Maaston kiintiö täyttyy siksi Yasurilla,
 * Tabwemasanalla ja Korallimerellä. Korallimeren piste on asetettu
 * käsin saariketjun länsipuolelle: artikkelin oma keskipiste (158 E /
 * −18 N) on kaukana lehden ikkunan ulkopuolella. Sama ratkaisu kuin
 * Namibian ja Portugalin Atlantilla.
 *
 * ROI MATAN ALUE JÄI POIS, VAIKKA SE ON MAAN AINOA MAAILMANPERINTÖKOHDE.
 * Roi Matan hauta ja asuinpaikka ovat Efatella ja Eretokalla (−17,63 /
 * 168,18, en-Wikipedia "Roi Mata"), eli 4,3 lautayksikön päässä Port
 * Vila -laatasta. Se on selvästi KAUPUNGIN_KOHDALLA_SADE-rajan (7,
 * js/fokuskohteet.js) sisällä, joten kohteesta ei saa pääkartan merkkiä;
 * se kuuluisi Port Vilan kohdekartalle, mikä on eri työ. Samasta syystä
 * jäivät pois myös Tanna (Yasurin päällä), Champagne Beach ja Million
 * Dollar Point (Coolidgen päällä) sekä Espiritu Santo (Tabwemasanan
 * päällä).
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Vanuatulla rajaus on olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.VUT,
 * x 11 348,2…11 532,5, y 3 605,6…3 940,8), joten vartio PÄTEE ja
 * jokainen alla oleva piste on tarkistettu sen sisään.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Etäisyys on mitattu jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin. Maan lähin merkki on
 * Epi 27,8 lautayksikön päässä Port Vilasta; raja on 7. Kaikki
 * yksitoista ovat siis pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja `lahde`-rivi kertoo artikkelin ja sen osan.
 */
export const MAASTOKOHTEET_VUT = [
  /* ================================================================
   * MAASTOKOHTEET — kaksi huippua ja valtameri.
   * ============================================================== */
  {
    id: 'yasur',
    nimi: 'Yasur',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka usein Yasur purkautuu?',
      'Miksi Cook löysi Tannan?',
    ],
    korostukset: ['stratovulkaani|stratovulkaani'],
    nappi: 'Tyynenmeren majakka',
    // 169.4483 E / -19.5283 N — en-Wikipedia "Mount Yasur"
    // lähin pelikaupunki: Port Vila 73,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 11481.6, y: 3870.7 },
    },
    teksti: 'Yasur on toimiva tulivuori Tannan saarella Vanuatussa, 361 metriä merenpinnan '
      + 'yläpuolella ja rannikolla lähellä Sulphur Bayta. Se on stratovulkaani, joka syntyy '
      + 'kun itään liikkuva Indo-Australian laatta työntyy länteen liikkuvan Tyynenmeren '
      + 'laatan alle; kartio on lähes kasviton, ja laen kraatteri on läpimitaltaan 400 '
      + 'metriä. Vuori on purkautunut lähes yhtäjaksoisesti useiden satojen vuosien ajan, '
      + 'ja purkaukset — usein monta tunnissa — luokitellaan strombolisiksi tai '
      + 'vulkaanisiksi, mutta vuorta voi silti yleensä lähestyä turvallisesti. Juuri '
      + 'tulivuoren hehku houkutteli James Cookin saarelle 1774 ensimmäisenä '
      + 'eurooppalaisena. Nimi tulee kwameran kielen sanasta iasur, tulivuori, ja '
      + 'kansainvälinen geotieteiden liitto IUGS otti Yasurin ja Yenkahen '
      + 'tulivuorikompleksin sadan geologisen perintökohteen joukkoon 800 vuotta '
      + 'jatkuneen purkauksen vuoksi.',
    lahde: 'en-Wikipedia "Mount Yasur", johdanto-osa sekä osiot "Name" ja "IUGS '
      + 'geological heritage site" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tabwemasana',
    nimi: 'Tabwemasana',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea Vanuatun korkein huippu on?',
      'Miksi huipulle nousee niin harva?',
    ],
    korostukset: ['Espiritu Santo|Espiritu Santon'],
    nappi: 'Maan korkein huippu, 1 879 metriä',
    // 166.755 E / -15.3625 N — en-Wikipedia "Mount Tabwemasana"
    // lähin pelikaupunki: Port Vila 95,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 11391.8, y: 3727.5 },
    },
    teksti: 'Tabwemasana on Vanuatun korkein huippu ja yksi Tyynenmeren korkeimmista '
      + 'vuorista: 1 879 metriä. Se kohoaa ympäröivien vuorten yli Espiritu Santon saaren '
      + 'syrjäisellä länsirannikolla, ja idän suuntaan avautuu näkymä Korallimerelle. '
      + 'Vuorella on kaksi huippua, ja paikallisen tarinan mukaan ne — mies ja nainen — '
      + 'sulkevat öisin toisensa syleilyyn. Kerepuan kylä sijaitsi 1970-luvulle asti '
      + 'vuoren rinteillä päivämatkan päässä rannikosta, mutta se siirrettiin rannalle '
      + 'kuten monet muutkin vuorikylät; nykyään kylästä lähdetään huipulle. Nousijoita on '
      + 'harvassa: huipulle pääsee yleensä alle kuusi ihmistä vuodessa, koska paikka on '
      + 'syrjäinen ja nousu vaikea. Matka alkaa veneellä Tasirikin kylästä Kerepuaan, '
      + 'jatkuu jokea pitkin ja nousee sitten jyrkästi; opas tarvitaan, sillä polkua on '
      + 'vaikea seurata.',
    lahde: 'en-Wikipedia "Mount Tabwemasana", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'korallimeri',
    nimi: 'Korallimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Missä Korallimeri on ja mihin se rajoittuu?',
      'Mikä maailman suurin riuttajärjestelmä on?',
    ],
    korostukset: ['riutta|riutoistaan'],
    nappi: 'Meri, jonka nimen antoivat riutat',
    // 166.2 E / -17.5 N — ulappa saariketjun länsipuolella lehden
    // ikkunassa; artikkelin oma keskipiste on 158 E / -18 N
    // lähin pelikaupunki: Port Vila 70,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 11373.3, y: 3800.7 },
    },
    teksti: 'Korallimeri on Tyynenmeren reunameri Australian koillisrannikolla, ja se '
      + 'ulottuu 2 000 kilometriä pitkin Australian koillisrannikkoa 30. eteläiselle '
      + 'leveyspiirille asti. Meri sai nimensä lukuisista saaristaan ja riutoistaan, ja '
      + 'siihen kuuluu maailman suurin riuttajärjestelmä Iso valliriutta, joka liitettiin '
      + 'maailmanperintöluetteloon 1981. Idässä meren rajaavat Vanuatu ja Uusi-Kaledonia, '
      + 'koillisessa suunnilleen Salomonsaarten eteläkärki ja luoteessa Uuden-Guinean '
      + 'etelärannikko; etelässä se sulautuu Tasmanmereen, pohjoisessa Salomonmereen ja '
      + 'idässä Tyyneenmereen. Ilmasto on lämmin, sateita on runsaasti ja trooppisia '
      + 'hirmumyrskyjä esiintyy usein.',
    lahde: 'en-Wikipedia "Coral Sea", johdanto-osa sekä osiot "Geography" ja "Extent" '
      + '(tarkistettu 6.9.2026).',
  },

  /* ================================================================
   * KOHTEET — kulttuuri, historia ja muu.
   * ============================================================== */
  {
    id: 'nagol',
    nimi: 'Nagol',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi maahyppy tehdään juuri huhti–kesäkuussa?',
      'Kuka valitsee köynnökset ja miten?',
    ],
    korostukset: ['jamssi|jamssisatoon', 'köynnös|köynnöstä'],
    nappi: 'Maahyppy jamssisadon puolesta',
    // 168.1897 E / -15.7606 N (Pentecost) — en-Wikipedia "Land diving";
    // artikkelilla ei ole omaa koordinaattia, saaren koordinaatti on
    // en-Wikipedia "Pentecost (island)"
    // lähin pelikaupunki: Port Vila 66,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 11439.7, y: 3741.1 },
    },
    teksti: 'Nagol eli gol on Pentecostin saaren eteläosan miesten rituaali: hyppääjä syöksyy '
      + '20–30 metriä korkeasta puutornista kaksi köynnöstä nilkkoihin sidottuina. '
      + 'Guinnessin ennätysten kirjan mukaan hypyn alimmassa kohdassa koettu kiihtyvyys on '
      + 'suurin, jonka ihminen teollistumattomassa maailmassa kokee. Rituaali liittyy '
      + 'vuotuiseen jamssisatoon ja tehdään huhti-, touko- tai kesäkuussa: kuivalla kaudella '
      + 'torni on paras rakentaa, ja köynnökset ovat silloin joustavimmillaan. Tornin '
      + 'rakentaminen vie kahdesta viiteen viikkoa ja siihen tarvitaan parikymmentä miestä, '
      + 'ja kylän vanhin valitsee köynnöksen kullekin hyppääjälle painon mukaan ilman mitään '
      + 'laskukaavaa — liian pitkä köynnös tarkoittaa kovaa maahantuloa, liian lyhyt '
      + 'törmäystä torniin. Täydellinen hyppy on korkealta ja päättyy niin, että olkapäät '
      + 'hipaisevat maata; mitä korkeammalta hypätään, sitä parempi sadon uskotaan olevan.',
    lahde: 'en-Wikipedia "Land diving", johdanto-osa sekä osiot "Background", '
      + '"Preparation" ja "Ritual" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ambrym',
    nimi: 'Ambrym',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä laavajärvi on?',
      'Kuka nimesi Benbow-vuoren?',
    ],
    korostukset: ['kaldeera|kaldeera', 'laavajärvi|laavajärvet'],
    nappi: 'Kaldeera, jossa oli kaksi laavajärveä',
    // 168.1167 E / -16.25 N — en-Wikipedia "Ambrym"
    // lähin pelikaupunki: Port Vila 50,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 11437.2, y: 3757.9 },
    },
    teksti: 'Ambrym on tulivuorisaari Malampan maakunnassa lähellä Vanuatun saariketjun '
      + 'keskikohtaa, ja sillä on yksi maailman aktiivisimmista tulivuorista. Saaren '
      + 'keskellä on 1 900 vuotta vanha, 12 kertaa 8 kilometrin kaldeera, jonka sisällä '
      + 'kohoavat kaksi toimivaa kartiota, Benbow ja Marum; niiden kraatereissa oli '
      + 'laavajärvet, mutta järvi katosi joulukuun 2018 railopurkauksen jälkeen. Benbow '
      + 'purkautui räjähtäen viimeksi 1913 ja tuhosi silloin Dip Pointin lähetyssairaalan; '
      + 'vuoren nimesi James Cook englantilaisen amiraalin John Benbow’n (1653–1702) mukaan. '
      + 'Cookin kerrotaan nimenneen myös saaren ankkuroituaan sen edustalle 1774, vaikka '
      + 'hänen retkikuntansa ei todellisuudessa käynyt Ambrymilla. Saari on pinta-alaltaan '
      + '677,7 neliökilometriä eli maan viidenneksi suurin, mutta väkiluvultaan sen pienin.',
    lahde: 'en-Wikipedia "Ambrym", johdanto-osa sekä osiot "Etymology", "Geography" ja '
      + '"Volcanology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'malakula',
    nimi: 'Malakula',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka antoi nimensä Bougainvillen salmelle?',
      'Mitä kondominio tarkoitti Uusilla Hebrideillä?',
    ],
    korostukset: ['kondominio|kondominio'],
    nappi: 'Toiseksi suurin saari ja pienten saarten rivi',
    // 167.5 E / -16.25 N — en-Wikipedia "Malakula"
    // lähin pelikaupunki: Port Vila 56,4 lautayksikköä
    laudat: {
      maailmankartta: { x: 11416.7, y: 3757.9 },
    },
    teksti: 'Malakula on Vanuatun toiseksi suurin saari. Bougainvillen salmi erottaa sen '
      + 'Espiritu Santosta ja Malosta, ja salmen nimesi itsensä mukaan Louis Antoine de '
      + 'Bougainville 1768. Saaren koillisrannikolla on Malampan maakunnan pääpaikka '
      + 'Lakatoro ja sen edustalla pienten saarten rivi — Vao, Atchin, Wala, Rano, Norsup, '
      + 'Uripiv ja Uri — sekä etelämpänä Tomman, Akhamb ja Maskelynesin saaret. Korkein '
      + 'kohta on 879-metrinen Mt. Liambele. Ni-Vanuatut asuivat saarella vuosisatoja ennen '
      + 'eurooppalaisia; ensimmäisinä sen näkivät Pedro Fernández de Quirósin espanjalaisen '
      + 'retkikunnan jäsenet 1606, ja James Cook kävi siellä toisella matkallaan 1774. '
      + 'Britit ja ranskalaiset asettuivat saarille 1700-luvun lopulta alkaen, ja niistä '
      + 'tuli lopulta kahden vallan yhdessä hallitsema kondominio.',
    lahde: 'en-Wikipedia "Malakula", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'gaua',
    nimi: 'Gaua',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on Vanuatun suurin järvi?',
      'Milloin Gharat purkautui viimeksi?',
    ],
    korostukset: ['kraatterijärvi|kraatterijärvi'],
    nappi: 'Kaldeerajärvi ja 120 metrin putous',
    // 167.52 E / -14.265 N — en-Wikipedia "Gaua"
    // lähin pelikaupunki: Port Vila 120,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 11417.3, y: 3690.2 },
    },
    teksti: 'Gaua, entiseltä nimeltään Santa Maria, on Banksin saarten suurin ja väkiluvultaan '
      + 'toiseksi suurin saari Torban maakunnassa Pohjois-Vanuatussa; pinta-ala on 342 '
      + 'neliökilometriä. Maasto on jylhää ja kohoaa 797 metrin Gharat-vuoreen, saaren '
      + 'keskellä olevaan toimivaan stratovulkaaniin, joka purkautui viimeksi 2013. '
      + 'Tulivuoren 6 kertaa 9 kilometrin kaldeerassa on kraatterijärvi Letas, Vanuatun '
      + 'suurin järvi, ja sen itäpuolella 120 metriä korkea Sirin vesiputous. Saarella '
      + 'sattuu tiheään maanjäristyksiä ja hirmumyrskyjä, ja vuotuinen sademäärä ylittää '
      + '3 500 millimetriä. Geologisesti Gaua on harvinainen: suurin osa saaresta on '
      + 'kaldeeran synnyttäneen purkauksen tuottamaa maafista ignimbriittiä, mikä on '
      + 'poikkeuksellista näin räjähtävissä purkauksissa.',
    lahde: 'en-Wikipedia "Gaua", johdanto-osa sekä osiot "Geography" ja "Geology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'torresinsaaret',
    nimi: 'Torresin saaret',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä Torresin hauta on?',
      'Kuinka monta saarta ryhmään kuuluu?',
    ],
    korostukset: ['subduktiovyöhyke|subduktiovyöhyke'],
    nappi: 'Maan pohjoisin saariryhmä',
    // 166.6167 E / -13.25 N — en-Wikipedia "Torres Islands"
    // lähin pelikaupunki: Port Vila 161,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 11387.2, y: 3655.7 },
    },
    teksti: 'Torresin saaret ovat Vanuatun pohjoisin saariryhmä Torban maakunnassa. Ketju '
      + 'sijaitsee kulttuurirajalla, joka erottaa saari-Melanesian naapurina olevien '
      + 'Salomonsaarten polynesialaisista ulkosaarista. Ryhmään kuuluu seitsemän saarta '
      + 'pohjoisesta etelään: Hiw eli Hiu, Metoma, Tegua, asumaton Ngwel, Linua, Lo eli '
      + 'Loh ja Toga, ja ketju on 42 kilometriä pitkä. Saaret ovat Vanuatun eteläisempiä '
      + 'saaria loivempia: korkein kohta on vain 200 metriä. Lännessä, meren pinnan alla, '
      + 'on syvä Torresin hauta, joka on Australian ja Tyynenmeren laatan '
      + 'subduktiovyöhyke. Vuonna 2020 asukkaita oli noin 1 128.',
    lahde: 'en-Wikipedia "Torres Islands", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ambae',
    nimi: 'Ambae',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Bali Ha’i on ja mistä se sai mallinsa?',
      'Mistä saarelaiset saavat vetensä?',
    ],
    korostukset: ['Bali Ha’i|Bali Ha’ille'],
    nappi: 'Saari, josta tuli Bali Ha’i',
    // 167.8333 E / -15.4 N — en-Wikipedia "Ambae"
    // lähin pelikaupunki: Port Vila 80,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 11427.8, y: 3728.8 },
    },
    teksti: 'Ambae eli Aoba on saari noin 310 kilometriä Port Vilasta pohjoisluoteeseen, ja '
      + 'se on Vanuatun suurin toimiva tulivuori. Saaren nimillä on yhteinen alkuperä '
      + 'Vanuatun omissa oseanialaisissa kielissä, ja siirtomaa-aikana sitä kutsuttiin '
      + 'myös Lepers’ Islandiksi. Ensimmäisenä sen näkivät eurooppalaisista Pedro '
      + 'Fernández de Quirósin espanjalaisen retkikunnan jäsenet keväällä 1606. Utuinen '
      + 'näkymä Ambaelle naapurisaarelta Espiritu Santolta, joka oli toisen maailmansodan '
      + 'suuri lentotukikohta, antoi mallin James Michenerin kirjan Tales of the South '
      + 'Pacific myyttiselle Bali Ha’ille. Saarella ei ole pysyviä jokia eikä käytettävissä '
      + 'olevia järviä — kraatterijärville ei pääse — joten vesi otetaan sementoiduista '
      + 'kaivoista ja sadevesisäiliöistä, mutta vedestä ei silti ole juuri pulaa: sadetta '
      + 'tulee 2 500–3 500 millimetriä vuodessa.',
    lahde: 'en-Wikipedia "Ambae", johdanto-osa sekä osiot "Name", "History" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'epi',
    nimi: 'Epi',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä eläin elää Lamen Bayn riutoilla?',
      'Miksi Epillä puhutaan niin montaa kieltä?',
    ],
    korostukset: ['dugongi|dugongin'],
    nappi: 'Kuusi kieltä ja dugongin lahti',
    // 168.3 E / -16.89 N — en-Wikipedia "Epi (island)"
    // lähin pelikaupunki: Port Vila 27,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 11443.3, y: 3779.8 },
    },
    teksti: 'Epi on saari Shefan maakunnassa Vanuatussa, Shepherdin saarten pohjoispäässä. '
      + 'Se on 43 kilometriä pitkä ja 18 kilometriä leveä, pinta-alaltaan 444 '
      + 'neliökilometriä, ja korkein kohta on 833-metrinen kvartäärikautinen tulivuori '
      + 'Mount Pomare; 13 kilometrin päässä kohoaa Lopévin tulivuori ja idässä on '
      + 'pääosin vedenalainen Itä-Epin tulivuori. Luoteisreunalla on hiekkainen Lamen Bay, '
      + 'jonka koralliriutat ovat dugongin elinympäristöä, ja koillisessa Drummond Bay, '
      + 'jonne Nikauran kyläyhteisö perusti 2000 merensuojelualueen. Saarella on myös '
      + 'mustia vulkaanisia hiekkarantoja ja kolme pientä makean veden järveä. Väkiluku '
      + 'romahti 1800-luvulla laajemmin kuin monessa muussa osassa Vanuatua, ja saari oli '
      + 'aiemmin vielä nykyistäkin monikielisempi: kieliä on yhä kuusi — Bieria, Maii, '
      + 'Baki, Bierebo, Lamenu ja Lewo — ja jokaisella puhujia muutamasta muutamaan '
      + 'sataan.',
    lahde: 'en-Wikipedia "Epi (island)", johdanto-osa sekä osiot "Geology and Geography", '
      + '"History" ja "Culture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'futunavut',
    nimi: 'Futuna',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä polynesialainen ulkosaari tarkoittaa?',
      'Miksi Futunaa kutsutaan evankeliumin portiksi?',
    ],
    korostukset: ['ulkosaari|ulkosaarena'],
    nappi: 'Polynesialainen saari Melanesiassa',
    // 170.2167 E / -19.5333 N — en-Wikipedia "Futuna (island of Vanuatu)"
    // lähin pelikaupunki: Port Vila 89,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 11507.2, y: 3870.8 },
    },
    teksti: 'Futuna on Vanuatun itäisin saari Tafean maakunnassa. Se syntyi vedenalaisen '
      + 'tulivuoren kohotessa; tulivuori purkautui viimeksi pleistoseenikaudella ainakin '
      + '11 000 vuotta sitten, ja saari kohoaa 666 metriin ja on pinta-alaltaan 11 '
      + 'neliökilometriä. Sitä kutsutaan toisinaan Länsi-Futunaksi, jotta se erottuisi '
      + 'Wallisin ja Futunan Futunasta, ja naapurisaarella Tannalla siitä käytetään nimeä '
      + 'Erronan. Vaikka Vanuatu on melanesialainen maa, Futunaa pidetään polynesialaisena '
      + 'ulkosaarena. Idän puolella merenpohjassa on 3,6 kilometriä syvä ja 25–30 '
      + 'kilometriä leveä Futunan hauta. Saarta sanotaan toisinaan evankeliumin portiksi '
      + 'Vanuatuun, koska sen asukkaat kääntyivät ensimmäisinä kristityiksi; 1800-luvun '
      + 'lopulla siellä asui useita lähetyssaarnaajia, muun muassa pastori Joseph '
      + 'Copeland kymmenen vuoden ajan ja lääkäri William Gunn.',
    lahde: 'en-Wikipedia "Futuna (island of Vanuatu)", johdanto-osa sekä osiot '
      + '"Geography", "Geology" ja "History" (tarkistettu 6.9.2026).',
  },
];
