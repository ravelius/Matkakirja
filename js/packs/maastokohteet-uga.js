/*
 * MAASTOKOHTEET — UGA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UGA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UGA.json. Työkalu laskee laudan
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
 * Ugandan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Victorianjärvi kulkee pelin symbolitaksonomiassa merenä (luonto-symboli; erillistä järvityyppiä ei ole); nimiasu on fi-Wikipedian Victorianjärvi.
 *
 * MAAILMAN ERÄ M11 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Kasubin haudat, Murchisonin putoukset, Queen Elizabethin
 * kansallispuisto, Kibalen kansallispuisto, Nyeron kalliomaalaukset,
 * Kidepon laakso, Fort Patiko ja Jinja. Lähin uusi merkki on Kasubin
 * haudat 28,9 lautayksikön päässä Viktoria Nyanzasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki kahdeksan ovat pääkartan
 * merkkejä. Bwindin kansallispuisto jätettiin pois, koska maan
 * eläintäky (gorillanpoikanen, js/packs/elaintakyt.js) on jo täsmälleen
 * samassa pisteessä. Erä on kuvaton, ja jokaisen kohteen lähin
 * pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_UGA = [
  {
    id: 'mountstanley',
    nimi: 'Mount Stanley',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi lähes päiväntasaajalla on jäätiköitä?',
      'Kenen mukaan vuori on nimetty?',
    ],
    korostukset: ['Ruwenzori|Ruwenzori-vuoristossa'],
    nappi: 'Afrikan neljänneksi korkein',
    // 29.8717 E / 0.3858 N — en-Wikipedia "Mount Stanley"
    laudat: {
      maailmankartta: { x: 6829.1, y: 3198.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Stanley eli Ngaliema kohoaa Ruwenzori-vuoristossa 5 109 metriin: se on sekä '
      + 'Ugandan että Kongon demokraattisen tasavallan korkein vuori ja koko Afrikan '
      + 'neljänneksi korkein. Sen huiput ovat niin korkealla, että ne kannattelevat jäätiköitä '
      + 'käytännössä päiväntasaajalla. Vuori kuuluu Ruwenzorin kansallispuistoon, joka on '
      + 'Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Mount Stanley", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'victorianjarvi',
    nimi: 'Victorianjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä jättiläisjärvi oikeastaan on?',
      'Minkä joen latvavesi järvi on?',
    ],
    nappi: 'Afrikan suurin järvi',
    // 32.7 E / -0.3 N — järven Ugandan-puoleinen selkä Entebben eteläpuolella; artikkelin keskipiste 33 / -1 on Tansanian vesillä
    laudat: {
      maailmankartta: { x: 6923.3, y: 3221.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Victorianjärvi on Afrikan suurin järvi ja maailman suurin trooppinen järvi: lähes 60 '
      + '000 neliökilometriä, pinta-alaltaan makeista vesistä toinen vain Pohjois-Amerikan '
      + 'Yläjärvelle. Jättiläinen on kuitenkin matala — keskisyvyys on vain noin 40 metriä, '
      + 'sillä järvi täyttää loivan painanteen ylängöllä. Sen vesistä alkaa Valkoinen Niili.',
    lahde: 'en-Wikipedia "Lake Victoria" ja "White Nile", johdanto-osat (tarkistettu 30.8.2026).',
  },
  {
    id: 'niili',
    nimi: 'Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Niilin matka alkaa?',
      'Mitä järviä joki läpäisee matkallaan?',
    ],
    nappi: 'Maailman pisimmän joen alku',
    // 33.2 E / 0.43 N — Jinja, jossa joki purkautuu Victorianjärvestä; Niili-artikkelin koordinaatti 31,14 / 30,17 on Egyptissä
    laudat: {
      maailmankartta: { x: 6940, y: 3197.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ugandassa alkaa maailman pisimmän joen matka: Valkoinen Niili purkautuu '
      + 'Victorianjärvestä ja kulkee Kyogajärven kautta Albertjärvelle — näitä osuuksia '
      + 'kutsutaan Victorian Niiliksi ja Albertin Niiliksi. Koko Niilillä on mittaa 7 088 '
      + 'kilometriä ennen kuin sen vedet ovat perillä Välimeressä.',
    lahde: 'en-Wikipedia "White Nile" ja "Nile", johdanto-osat (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M11, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Ugandalla oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki
   * kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi
   * merkki on Kasubin haudat 28,9 lautayksikön päässä Viktoria
   * Nyanzasta (raja KAUPUNGIN_KOHDALLA_SADE on 7,
   * js/fokuskohteet.js). Kuvaton erä; faktat en-Wikipedian
   * raakatekstistä 6.9.2026, ja jokainen `lahde`-rivi kertoo
   * artikkelin osan.
   * ============================================================== */
  {
    id: 'kasubi',
    nimi: 'Kasubin haudat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Kasubin päärakennus on tehty?',
      'Mitä palmunlehtirenkaiden lukumäärä tarkoittaa?',
    ],
    korostukset: ['tuohikangas|tuohikankaan'],
    nappi: 'Neljän kuninkaan hautapiha',
    // 32.5533 E / 0.3292 N — en-Wikipedia "Kasubi Tombs" (0°19′45″N 32°33′12″E)
    // Lähin pelikaupunki: Viktoria Nyanza 28,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6918.4, y: 3200.5 },
    },
    teksti: 'Kasubin kukkulalla Kampalassa on neljän Bugandan kabakan eli kuninkaan hautapaikka. '
      + 'Muteesa I rakennutti sinne 1882 palatsin, ja hänen kuoltuaan 1884 siitä tuli '
      + 'hautapaikka — mikä oli poikkeus perinteestä, jossa kuningas haudattiin yhteen paikkaan '
      + 'ja hänen leukaluulleen, sielun sijalle, tehtiin oma pyhäkkönsä muualle. Päärakennus '
      + 'Muzibu Azaala Mpanga on ympärysmitaltaan 31 metriä ja 7,5 metriä korkea kupolimainen '
      + 'maja: puupaaluja, ruokopunosta ja savea, ja katon olkikerros lepää 52 palmunlehtirenkaan '
      + 'varassa, yksi kutakin Bugandan perinteistä klaania kohti. Alue on yhä tuohikankaan '
      + 'valmistuksen ja perinteisen olkikattotyön keskus, ja edesmenneiden kuninkaiden leskien '
      + 'talot reunustavat pihaa. Unesco otti paikan maailmanperintöluetteloon 2001 ja kutsui '
      + 'sitä yhdeksi Saharan eteläpuolisen Afrikan merkittävimmistä pelkistä kasviaineksista '
      + 'rakennetuista rakennuksista. Tulipalo tuhosi päärakennukset 2010; ne rakennettiin '
      + 'uudelleen, ja 2023 kohde poistettiin uhanalaisten listalta.',
    lahde: 'en-Wikipedia "Kasubi Tombs", johdanto-osa sekä osio "Tombs" (tarkistettu 6.9.2026).',
  },
  {
    id: 'murchison',
    nimi: 'Murchisonin putoukset',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka kapeasta raosta Niili puristuu?',
      'Miksi putouksia kutsutaan myös Kabalegan putouksiksi?',
    ],
    korostukset: ['rako|rakoon'],
    nappi: 'Niili seitsemän metrin raossa',
    // 31.6856 E / 2.2783 N — en-Wikipedia "Murchison Falls"
    // Lähin pelikaupunki: Viktoria Nyanza 76,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6889.5, y: 3135.5 },
    },
    teksti: 'Valkoinen Niili puristuu Albert-järven yläpuolella kallioiden väliseen rakoon, joka '
      + 'on vain seitsemän metriä leveä, ja putoaa 43 metriä. Victorianjärven laskuvedestä '
      + 'kulkee tästä noin 300 kuutiometriä sekunnissa alle kymmenen metrin levyisen rotkon '
      + 'läpi. Samuel ja Florence Baker olivat ensimmäiset eurooppalaiset, jotka virallisesti '
      + 'näkivät putoukset, ja Baker nimesi ne Lontoon maantieteellisen seuran puheenjohtajan '
      + 'Roderick Murchisonin mukaan. Osa historioitsijoista arvelee, että Neron lähettämä '
      + 'roomalainen partio olisi päässyt tänne jo vuonna 61 jaa., mutta väite on kiistelty. '
      + 'Idi Aminin aikana 1970-luvulla nimi muutettiin Kabalegan putouksiksi Bunyoron kuninkaan '
      + 'mukaan, mutta muutosta ei koskaan vahvistettu laissa, ja vanha nimi palasi. Ernest '
      + 'Hemingway putosi lentokoneellaan hieman putousten alapuolelle 1954.',
    lahde: 'en-Wikipedia "Murchison Falls", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'queenelizabeth',
    nimi: 'Queen Elizabethin puisto',
    tyyppi: 'elain',
    kysymykset: [
      'Mistä puisto sai nimensä?',
      'Mikä on Ishashan erikoisuus?',
    ],
    korostukset: ['puu|puihin'],
    nappi: 'Leijonat, jotka kiipeävät puihin',
    // 30.0411 E / 0.1372 S — en-Wikipedia "Queen Elizabeth National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 57,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6834.7, y: 3216.1 },
    },
    teksti: 'Queen Elizabethin kansallispuisto on 1 978 neliökilometriä Länsi-Ugandassa, ja se '
      + 'ympäröi yhdessä naapuripuistojensa kanssa Edward-järven kokonaan. Puisto perustettiin '
      + '1952 nimellä Kazingan kansallispuisto yhdistämällä kaksi riistasuojelualuetta, ja se '
      + 'nimettiin uudelleen kaksi vuotta myöhemmin kuningatar Elisabet II:n vierailun muistoksi; '
      + 'samalla songora-paimentolaisilta poistettiin viimeisetkin laidunoikeudet, ja moni siirtyi '
      + 'karjoineen rajan yli. Puistossa elää 95 nisäkäslajia ja yli 600 lintulajia: norsuja, '
      + 'puhveleita, virtahepoja, ugandankobeja, leopardeja, simpansseja ja leijonia. Rukungirin '
      + 'piirissä Ishashan alue tunnetaan puihin kiipeävistä leijonistaan, joiden uroksilla on '
      + 'usein musta harja. IUCN nimesi puiston naapurinaan olevan Virungan kanssa leijonien '
      + 'suojelualueeksi 2006.',
    lahde: 'en-Wikipedia "Queen Elizabeth National Park", johdanto-osa sekä osiot "Location", '
      + '"History" ja "Overview" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kibale',
    nimi: 'Kibalen kansallispuisto',
    tyyppi: 'elain',
    kysymykset: [
      'Montako kädellislajia Kibalessa elää?',
      'Mikä on eläinkäytävä?',
    ],
    korostukset: ['kädellinen|kädellisten'],
    nappi: 'Afrikan kädellistihein metsä',
    // 30.4 E / 0.5 N — en-Wikipedia "Kibale National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 48,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6846.7, y: 3194.8 },
    },
    teksti: 'Kibalen kansallispuisto suojelee 766 neliökilometriä kosteaa ikivihreää sademetsää '
      + '1 100–1 600 metrin korkeudessa. Se on yksi viimeisistä alueista, jossa on sekä alavaa '
      + 'että vuoristoista metsää, ja Itä-Afrikan viimeinen merkittävä esivuoristometsä. Alue '
      + 'rauhoitettiin 1932 ja siitä tehtiin kansallispuisto 1993; metsä jatkuu yhtenäisenä '
      + 'Queen Elizabethin puistoon asti, ja niiden välille syntyy 180 kilometrin eläinkäytävä. '
      + 'Kibalessa on Afrikan tihein ja monilajisin kädellisten kanta: kolmetoista lajia, muun '
      + 'muassa simpanssi, ugandan punakolobus, ugandanmangabi ja L\'Hoestin marakatti. '
      + 'Puistossa toimii Makereren yliopiston biologinen kenttäasema. Ympäröivän alueen väkiluku '
      + 'on satavuotisjaksolla seitsenkertaistunut, ja polttopuun kysyntä painaa metsän reunoja.',
    lahde: 'en-Wikipedia "Kibale National Park", johdanto-osa sekä osiot "Locals and the park" ja '
      + '"Biodiversity" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nyero',
    nimi: 'Nyeron kalliomaalaukset',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Millaisia kuvioita Nyerossa on maalattu?',
      'Mikä on "tasku"?',
    ],
    korostukset: ['samankeskinen|samankeskiset'],
    nappi: 'Kuusi kalliosuojaa ja punaiset kehät',
    // 33.8462 E / 1.4715 N — en-Wikipedia "Nyero rock paintings"
    // Lähin pelikaupunki: Viktoria Nyanza 85,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6961.5, y: 3162.4 },
    },
    teksti: 'Itä-Ugandassa Kumin piirissä on kuusi kalliosuojaa, joiden seiniin on maalattu ennen '
      + 'vuotta 1250. Kuviot ovat lähes kokonaan geometrisia — hallitsevana samankeskiset kehät, '
      + 'lisäksi "akasianpalko"-muotoja, joita on kutsuttu myös kanooteiksi. Maalaukset kuuluvat '
      + 'yhtenäiseen punaisen pigmentin perinteeseen, joka leviää itäisen, keskisen ja osin '
      + 'eteläisen Afrikan yli myöhäisen kivikauden metsästäjä-keräilijöiden alueella, ja ne '
      + 'liitetään yleensä twa-metsästäjiin. Päägroto Nyero 2:ssa on kymmenmetrinen pystysuora '
      + 'takaseinä ja sen suojana kallionlohkare, jonka painoksi arvioidaan ainakin 20 000 '
      + 'tonnia; sieltä on tunnistettu yli neljäkymmentä eri kuvaa. Lohkareiden välistä pääsee '
      + 'pieneen pimeään suojaan, jossa on kolo nimeltä "tasku": sinne jätettiin lahjoja '
      + 'jumalille, ja tapa jatkuu yhä — nykyään koloon pannaan rahaa.',
    lahde: 'en-Wikipedia "Nyero rock paintings", johdanto-osa sekä osiot "History" ja '
      + '"Description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kidepo',
    nimi: 'Kidepon laakso',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Kidepon kaksi laaksoa ovat erilaisia?',
      'Mikä on Kanangorok?',
    ],
    korostukset: ['savanni|savanni'],
    nappi: 'Karamojan karu savanni',
    // 33.85 E / 3.9 N — en-Wikipedia "Kidepo Valley National Park"
    // Lähin pelikaupunki: Nairobi 134,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6961.7, y: 3081.4 },
    },
    teksti: 'Kidepon laakson kansallispuisto on 1 442 neliökilometrin savanni Koillis-Ugandan '
      + 'Karamojassa, Morungolen vuoren juurella, ja sen halki kulkevat Kidepo- ja Narus-joet. '
      + 'Alueen alkuperäisiä asukkaita ovat ik ja ketebo, jotka olivat asuneet siellä 1800-luvun '
      + 'alusta; siirtomaahallinto rauhoitti alueen riistasuojeluksi 1958 ja häätöi asukkaat, ja '
      + 'antropologi Colin Turnbull otti pakkosiirron ja sitä seuranneen nälänhädän esimerkiksi '
      + 'siitä, mihin johtaa suojelualueen perustaminen paikallisia kuulematta. Itsenäisen '
      + 'Ugandan hallitus teki alueesta kansallispuiston 1962. Laaksot ovat erilaiset, koska '
      + 'sateet ovat: Narusiin sataa vuodessa 89 ja Kidepoon 64 senttimetriä, ja se näkyy sekä '
      + 'kasvillisuudessa että eläinkannoissa. Puiston pohjoisosassa on Kanangorokin lämmin '
      + 'lähde, alueen pysyvin vesipaikka. Nisäkäslajeja on yli 77 ja lintulajeja 476.',
    lahde: 'en-Wikipedia "Kidepo Valley National Park", johdanto-osa sekä osiot "Location", '
      + '"History", "Geology" ja "Wildlife" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fortpatiko',
    nimi: 'Fort Patiko',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakensi Fort Patikon ja milloin?',
      'Ketkä käyttivät linnaketta Bakerin jälkeen?',
    ],
    korostukset: ['linnake|linnakkeen'],
    nappi: 'Bakerin linnake jouluna 1872',
    // 32.3176 E / 3.0158 N — en-Wikipedia "Fort Patiko"
    // Lähin pelikaupunki: Viktoria Nyanza 102,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6910.6, y: 3110.9 },
    },
    teksti: 'Pohjois-Ugandassa Gulun lähellä on kivikumpu, jonka päälle Samuel Baker rakennutti '
      + 'linnakkeen. Se valmistui jouluaattona 1872, ja siitä käytetään yhä nimeä Bakerin '
      + 'linnake. Baker oli tuolloin Egyptin khedivin palveluksessa Ekvatoriaaliprovinssin '
      + 'kuvernöörinä. Kun hän lähti, linnaketta käyttivät hänen seuraajansa samassa virassa: '
      + 'Charles Gordon ja Emin Pasha. Keskellä linnaketta seisoo yhä viljavaraston seinä, ja '
      + 'siihen kiinnitetyssä laatassa lukee "Fatiko 1872–88, perustanut Sir Samuel Baker, '
      + 'asuttaneet Emin ja Gordon". Rauniot ovat Ajulun kylässä Patikon alapiirissä Gulun '
      + 'piirikunnassa, ja niihin pääsee tutustumaan pientä maksua vastaan; Ugandan hallitus on '
      + 'suunnitellut niiden nostamista viralliseksi matkailukohteeksi.',
    lahde: 'en-Wikipedia "Fort Patiko", koko artikkeli (tarkistettu 6.9.2026).',
  },
  {
    id: 'jinja',
    nimi: 'Jinja',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä sana ejjinja tarkoittaa?',
      'Mitä Ripon-putouksille tapahtui 1954?',
    ],
    korostukset: ['Ripon-putoukset|Ripon-putoukset'],
    nappi: 'Kivet, jotka jäivät veden alle',
    // 33.2039 E / 0.4233 N — en-Wikipedia "Jinja, Uganda"
    // Lähin pelikaupunki: Viktoria Nyanza 50,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6940.1, y: 3197.4 },
    },
    teksti: 'Jinja on Victorianjärven pohjoisrannalla Valkoisen Niilin lähteen tuntumassa. Nimi '
      + 'tulee sanasta ejjinja, kivi: sekä länsipuolen bagandat että itäpuolen basogat kutsuivat '
      + 'paikkaa "kiviksi" niiden litteiden kallioiden mukaan, jotka olivat joen suulla. '
      + 'John Hanning Speke oli ensimmäinen eurooppalainen, joka näki Niilin lähteen, ja hän '
      + 'kuvasi Ripon-putoukset noin neljän metrin korkuisiksi ja satojen metrien levyisiksi ja '
      + 'kirjoitti tuhansista kaloista, jotka hyppäsivät putouksia vastaan kalastajien '
      + 'seistessä kallioilla vapoineen. Kaupungin perustivat brittiasukkaat 1901, ja saksalainen '
      + 'arkkitehti Ernst May teki sille asemakaavan 1948. Vuonna 1954 Owen Fallsin padon rakennus '
      + 'nosti veden ja hukutti sekä Ripon-putoukset että suurimman osan niistä kivistä, joista '
      + 'kaupunki oli saanut nimensä.',
    lahde: 'en-Wikipedia "Jinja, Uganda", johdanto-osa sekä osiot "Location" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

