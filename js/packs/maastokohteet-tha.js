/*
 * MAASTOKOHTEET JA KOHTEET — THA (Thaimaa). Erä M8, Aasia 2, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Thaimaalla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-tha.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/THA.json-tiedostoa
 * ei ole): Doi Inthanon, Chao Phraya ja Thaimaanlahti — vuori, joki ja
 * meri. Kaikki kolme osuvat maan fokuslehden rajaukseen
 * (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a), joka on
 * Thaimaalla x 9028,2…9405,2 ja y 2427,4…3112,7.
 *
 * CHAO PHRAYAN MERKKI ON NAKHON SAWANISSA EIKÄ SUULLA, ja syy on
 * mitattu: joen suu on 9,3 lautayksikön päässä Bangkok-laatasta, eli
 * juuri ja juuri yli KAUPUNGIN_KOHDALLA_SADE-rajan (7), ja nimiö
 * jäisi kaupungin päälle. Nakhon Sawan on lisäksi se paikka, jossa
 * joki oikeasti alkaa Pingin ja Nanin yhtymäkohdasta.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
 * Ayutthaya 18,9 lautayksikön päässä Bangkokista. Bangkokin oma
 * kohdekartta (js/packs/maakartat.js bangkok, lat 13,7315–13,7625 ja
 * lon 100,4805–100,5245) kattaa Rattanakosinin saaren, ja sen ruutuun
 * osuva nosto kuuluu kohdekartan pisteelle eikä pääkartalle
 * (tests/nostot-kartalla.test.mjs) — sinne jäävät siis Wat Phra Kaew,
 * Suurpalatsi, Wat Pho ja Wat Arun.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_THA = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'ayutthaya',
    nimi: 'Ayutthaya',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka perusti kaupungin ja milloin?',
      'Milloin kaupunki tuhoutui?',
    ],
    korostukset: ['Ayodhya|Ayodhya'],
    nappi: 'Kolmen joen pääkaupunki',
    // 100.58333 E / 14.35 N — en-Wikipedia "Ayutthaya Historical Park"
    laudat: {
      maailmankartta: { x: 9186.1, y: 2729.9 },
    },
    teksti: 'Ayutthayan historiallinen puisto kattaa vanhan pääkaupungin '
      + 'rauniot Phra Nakhon Si Ayutthayan maakunnassa. Kuningas Ramathibodi I '
      + 'perusti kaupungin 1351, mutta seutu oli asuttu jo mon-kansan '
      + 'Dvaravati-kaudella, ja noin vuonna 850 khmerit rakensivat kolmen joen '
      + 'yhtymäkohtaan tukikohdan, jonka he nimesivät Intian pyhän kaupungin '
      + 'mukaan Ayodhyaksi. Burmalaiset valtasivat kaupungin 1569; sitä ei '
      + 'ryöstetty, mutta se menetti silloin monia arvokkaita ja taidokkaita '
      + 'esineitä. Ayutthaya oli maan pääkaupunki siihen asti, kunnes Burman '
      + 'armeija tuhosi sen 1767. Taidevirasto aloitti raunioiden '
      + 'kunnostuksen 1969 ja laajensi työtä, kun alueesta tehtiin '
      + 'historiallinen puisto 1976.',
    lahde: 'en-Wikipedia "Ayutthaya Historical Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sukhothai',
    nimi: 'Sukhothai',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Sukhothai tarkoittaa?',
      'Kuinka monta rauniota puistossa on?',
    ],
    korostukset: ['Wat Mahathat|Wat Mahathat'],
    nappi: 'Onnen aamunkoitto',
    // 99.70361 E / 17.02111 N — en-Wikipedia "Sukhothai Historical Park"
    laudat: {
      maailmankartta: { x: 9156.8, y: 2638.7 },
    },
    teksti: 'Sukhothain historiallinen puisto kattaa 1200- ja 1300-luvun '
      + 'Sukhothain kuningaskunnan pääkaupungin rauniot Pohjois-Thaimaassa. '
      + 'Nimi tarkoittaa kirjaimellisesti onnen aamunkoittoa. Kaupunginmuurit '
      + 'muodostavat suorakaiteen, joka on noin kaksi kilometriä itä–länsi- ja '
      + '1,6 kilometriä pohjois–eteläsuunnassa, ja kunkin muurin keskellä on '
      + 'portti. Muurien sisällä ovat kuninkaanpalatsin jäännökset ja '
      + 'kaksikymmentäkuusi temppeliä, joista suurin on Wat Mahathat; koko '
      + 'puiston alueella raunioita on 193. Puistoa hoitaa Thaimaan '
      + 'taidevirasto Unescon avustuksella, ja alue on maailmanperintökohde.',
    lahde: 'en-Wikipedia "Sukhothai Historical Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ban-chiang',
    nimi: 'Ban Chiang',
    tyyppi: 'historia',
    kysymykset: [
      'Miten löytö tehtiin?',
      'Mitä ruukuille tapahtui löydön jälkeen?',
    ],
    korostukset: ['punamaalattu|punamaalattu'],
    nappi: 'Kapokkipuun juuri ja kompastus',
    // 103.2414 E / 17.4069 N — en-Wikipedia "Ban Chiang"
    laudat: {
      maailmankartta: { x: 9274.7, y: 2625.5 },
    },
    teksti: 'Ban Chiang on arkeologinen kohde Udon Thanin maakunnassa '
      + 'Koillis-Thaimaassa ja maailmanperintökohde vuodesta 1992. Paikka '
      + 'löydettiin 1966, ja huomion herätti sen punamaalattu saviastiasto. '
      + 'Löytäjä oli harvardilainen opiskelija Steve Young, joka teki kylässä '
      + 'haastatteluja lopputyötään varten: hän kompastui polulla kapokkipuun '
      + 'juureen ja huomasi kaatuessaan maasta esiin tulleiden ruukkujen '
      + 'suut. Kohde kertoo varhaisesta maanviljelystä ja metallinkäsittelystä '
      + 'sekä siitä, miten yhteisö muuttui vuosituhansien aikana. Ruukkujen '
      + 'kauneus ja arvioitu ikä johtivat kuitenkin innokkaaseen keräilyyn ja '
      + 'ryöstökaivuuseen, ja 2008 Yhdysvaltain oikeusministeriö teki '
      + 'ratsioita museoihin, jotka olivat osallisina Ban Chiangin '
      + 'muinaisesineiden salakuljetuksessa.',
    lahde: 'en-Wikipedia "Ban Chiang", johdanto ja osio "Discovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'phanom-rung',
    nimi: 'Phanom Rung',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minkä päällä temppeli seisoo?',
      'Mihin tie temppelin juurelta johti?',
    ],
    korostukset: ['sammuneen tulivuoren|sammuneen tulivuoren'],
    nappi: 'Temppeli tulivuoren reunalla',
    // 102.94167 E / 14.5325 N — en-Wikipedia "Phanom Rung Historical Park"
    laudat: {
      maailmankartta: { x: 9264.7, y: 2723.7 },
    },
    teksti: 'Phanom Rung on khmerien temppelialue Buriramin maakunnassa '
      + 'Isaanissa, ja se seisoo sammuneen tulivuoren reunalla 402 metrin '
      + 'korkeudessa. Rakennukset ovat hiekkakiveä ja lateriittia, ja ne '
      + 'nousivat 900- ja 1200-lukujen välillä useassa vaiheessa: kaksi '
      + 'tiilipyhäkköä 900-luvulta, pieni pyhäkkö 1000-luvulta, kuningas '
      + 'Suryavarman II:n rakennuttama keskuspyhäkkö 1100-luvulta ja kaksi '
      + 'kirjastoa 1200-luvulta. Paikka oli ensin hindulainen ja muuttui '
      + 'myöhemmin buddhalaiseksi. Temppelin juurella kulki Angkorin ja '
      + 'Phimain yhdistänyt tie, jonka varrella oli lepopaikkoja matkalaisille '
      + 'sekä sairaala. Thaimaan taidevirasto kunnosti alueen '
      + 'seitsemäntoista vuoden työllä 1971–1988.',
    lahde: 'en-Wikipedia "Phanom Rung Historical Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'phimai',
    nimi: 'Phimai',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mihin suuntaan temppeli on käännetty?',
      'Mikä tie yhdisti Phimain Angkoriin?',
    ],
    korostukset: ['Angkoriin|Angkoriin'],
    nappi: 'Temppeli, joka katsoo Angkoriin',
    // 102.49389 E / 15.22083 N — en-Wikipedia "Phimai Historical Park"
    laudat: {
      maailmankartta: { x: 9249.8, y: 2700.3 },
    },
    teksti: 'Phimain historiallinen puisto kattaa vanhan Phimain kaupungin ja '
      + 'Prasat Hin Phimain rauniot Nakhon Ratchasiman maakunnassa. Temppeli on '
      + 'Thaimaan suurin mahayana-buddhalainen muinaistemppeli, ja kaupunki oli '
      + 'khmerien valtakunnan aikana tärkeä keskus. Pyhäkkö oli yksi '
      + 'merkittävimmistä khmeritemppeleistä nykyisen Thaimaan alueella, ja '
      + 'sen yhdisti Angkoriin muinainen khmerien valtatie. Poikkeuksellista '
      + 'on suuntaus: temppeli on käännetty pääilmansuunnakseen Angkoriin päin '
      + 'eikä itään, kuten khmeritemppelit yleensä.',
    lahde: 'en-Wikipedia "Phimai Historical Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'khao-yai',
    nimi: 'Khao Yai',
    tyyppi: 'muu',
    kysymykset: [
      'Milloin puisto perustettiin?',
      'Mikä on puiston korkein vuori?',
    ],
    korostukset: ['Khao Rom|Khao Rom'],
    nappi: 'Thaimaan ensimmäinen kansallispuisto',
    // 101.44 E / 14.35 N — en-Wikipedia "Khao Yai National Park"
    laudat: {
      maailmankartta: { x: 9214.7, y: 2729.9 },
    },
    teksti: 'Khao Yai julistettiin 18. syyskuuta 1962 Thaimaan ensimmäiseksi '
      + 'kansallispuistoksi, ja se on maan kolmanneksi suurin, noin 2 166 '
      + 'neliökilometriä. Perustamisessa oli keskeinen osa luonnonsuojelijalla '
      + 'nimeltä Boonsong Lekagul. Puiston korkein vuori on 1 351 metrin Khao '
      + 'Rom, ja sen huipulle pääsee vain jalan; nousuun menee vähintään '
      + 'seitsemän tuntia. Puistossa elää muun muassa aasiannorsuja, gibboneja, '
      + 'muntjakkeja ja sambarhirviä, ja kameravalvonta tallensi 2016–2017 '
      + 'kahdeksantoista tiikeriä koko Dong Phaya Yen -Khao Yain '
      + 'maailmanperintöalueella. Alue liitettiin Unescon '
      + 'maailmanperintöluetteloon 14. heinäkuuta 2005 osana Dong '
      + 'Phayayen–Khao Yain metsäkokonaisuutta.',
    lahde: 'en-Wikipedia "Khao Yai National Park", johdanto sekä osiot '
      + '"History", "Geography" ja "Fauna" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chiang-mai',
    nimi: 'Chiang Mai',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä nimi Chiang Mai tarkoittaa?',
      'Minkä kuningaskunnan pääkaupunki se oli?',
    ],
    korostukset: ['Lan Na|Lan Na'],
    nappi: 'Uusi kaupunki vuodelta 1296',
    // 98.99861 E / 18.79528 N — en-Wikipedia "Chiang Mai"
    laudat: {
      maailmankartta: { x: 9133.3, y: 2577.7 },
    },
    teksti: 'Chiang Mai on Pohjois-Thaimaan suurin kaupunki ja koko maan '
      + 'toiseksi suurin kaupunkiseutu, noin 700 kilometriä Bangkokista '
      + 'pohjoiseen Thaimaan ylängöillä. Nimi tarkoittaa thaiksi uutta '
      + 'kaupunkia, ja se perustettiin 1296 Lan Nan uudeksi pääkaupungiksi '
      + 'Chiang Rain tilalle. Kaupungin ydin on noin puolentoista kilometrin '
      + 'sivuinen neliö, jota rajaavat vanhat punatiiliset muurit — niistä on '
      + 'jäljellä vain osia — ja niitä kiertävä vallihauta. Sijainti Ping-joen '
      + 'varrella ja kauppareittien lähellä teki kaupungista historiallisesti '
      + 'tärkeän. Chiang Mai oli 1935 Thaimaan ensimmäinen '
      + 'kaupunkikunta.',
    lahde: 'en-Wikipedia "Chiang Mai", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kuoleman-rautatie',
    nimi: 'Kuoleman rautatie',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä mihin rata kulkee?',
      'Ketkä radan rakensivat?',
    ],
    korostukset: ['pakkotyö|pakkotyö'],
    nappi: 'Neljäsataa kilometriä Ban Pongista',
    // 99.50306 E / 14.04083 N — en-Wikipedia "Burma Railway"
    laudat: {
      maailmankartta: { x: 9150.1, y: 2740.4 },
    },
    teksti: 'Kuoleman rautatie eli Thaimaan ja Burman rata on 415 kilometriä '
      + 'pitkä rautatie Thaimaan Ban Pongista Burman eli nykyisen Myanmarin '
      + 'Thanbyuzayatiin. Japanin armeija rakennutti sen 1940–1943 '
      + 'huoltoreitiksi Burman rintamalle, ja työ tehtiin pakkotyönä: radalle '
      + 'vietiin ainakin 250 000 kaakkoisaasialaista siviiliä sekä '
      + 'sotavankeja. Thaimaan puolella työvoima oli enimmäkseen Malaijan '
      + 'tamileja, malaijeja ja kiinalaisia. Yli 90 000 siviiliä ja noin '
      + '12 000 liittoutuneiden sotilasta kuoli rakennustöissä. Rata täydensi '
      + 'raideyhteyden Bangkokista Rangooniin, ja sen tunnetuin kohta on '
      + 'Kwai-joen ylittävä silta Kanchanaburissa.',
    lahde: 'en-Wikipedia "Burma Railway", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'doi-inthanon',
    nimi: 'Doi Inthanon',
    tyyppi: 'vuori',
    kysymykset: [
      'Kenen mukaan vuori on nimetty?',
      'Mikä vuoren vanha nimi oli?',
    ],
    korostukset: ['batoliitti|batoliitti'],
    nappi: 'Thaimaan katto',
    // 98.48667 E / 18.5875 N — en-Wikipedia "Doi Inthanon"
    laudat: {
      maailmankartta: { x: 9116.2, y: 2584.8 },
    },
    teksti: 'Doi Inthanon on Thaimaan korkein vuori, 2 565 metriä, ja se '
      + 'kohoaa Chom Thongin piirissä Chiang Main maakunnassa. Vanha nimi oli '
      + 'Doi Luang Ang Ka, varisten lammen huippu: juurella oli lampi, jolle '
      + 'kerääntyi paljon variksia. Nykyinen nimi tuli Chiang Main '
      + 'suuriruhtinaan Inthawichayanonin muistoksi, koska hän kantoi huolta '
      + 'pohjoisen metsistä ja yritti suojella niitä; hänen jäännöksensä '
      + 'haudattiin vuorelle. Geologisesti vuori on graniittinen batoliitti '
      + 'pohjois–eteläsuuntaisessa vuorijonossa. Metsät suojeltiin 1954, ja '
      + 'kansallispuisto ulottuu 800 metrin alangoilta huipulle, jolla on '
      + 'ilmavoimien sääasema ja maan kansallinen observatorio.',
    lahde: 'en-Wikipedia "Doi Inthanon", johdanto sekä osiot "Geography" ja '
      + '"Geology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chao-phraya',
    nimi: 'Chao Phraya',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joki alkaa?',
      'Millä nimellä eurooppalaiset tunsivat sen?',
    ],
    korostukset: ['Menam|Menam'],
    nappi: 'Kuninkaiden joki',
    // 100.12 E / 15.7 N — en-Wikipedia "Chao Phraya River", Nakhon Sawan
    laudat: {
      maailmankartta: { x: 9170.7, y: 2683.9 },
    },
    teksti: 'Chao Phraya alkaa Nakhon Sawanissa, missä Ping ja Nan yhtyvät, ja '
      + 'virtaa sieltä 372 kilometriä keskitasangon halki Bangkokiin ja '
      + 'Thaimaanlahteen. Pisimmän latvahaaran eli Nanin lähteeltä mitattuna '
      + 'vesistö on 1 112 kilometriä. Nimi Chao Phraya on kirjoitetuissa '
      + 'lähteissä vasta kuningas Mongkutin ajalta 1800-luvulta; sitä ennen '
      + 'jokea kutsuttiin todennäköisesti vain thain sanalla joki, ja '
      + 'Ayutthayan aikaan käyneet eurooppalaiset merkitsivät sen '
      + 'karttoihinsa nimellä Menam. Chai Natissa joki haarautuu, ja Tha Chin '
      + 'kulkee pääuoman rinnalla omaan suuhunsa Samut Sakhonissa. '
      + 'Alatasangolla siitä lähtee lukemattomia khlong-kanavia, joilla '
      + 'kastellaan riisipeltoja.',
    lahde: 'en-Wikipedia "Chao Phraya River", johdanto sekä osiot "Etymology", '
      + '"Geography" ja "Length" (tarkistettu 6.9.2026).',
  },
  {
    id: 'thaimaanlahti',
    nimi: 'Thaimaanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi lahden nimi vaihtui?',
      'Mitä lahti oli jääkauden lopulla?',
    ],
    korostukset: ['Sundaland|Sundaland'],
    nappi: 'Muinainen makean veden järvi',
    // 100.5 E / 9.5 N — en-Wikipedia "Gulf of Thailand"
    laudat: {
      maailmankartta: { x: 9183.3, y: 2893.9 },
    },
    teksti: 'Thaimaanlahti on matala lahti Etelä-Kiinan meren lounaisreunassa '
      + 'Kaakkois-Aasian mantereen ja Malakan niemimaan välissä. Se on noin '
      + '800 kilometriä pitkä, leveimmillään 560 kilometriä ja pinta-alaltaan '
      + '320 000 neliökilometriä. Vanha nimi oli Siaminlahti, ja se vaihtui '
      + 'vähitellen, kun maa otti 1939 nimekseen Thaimaa. Viimeisen '
      + 'jääkauden huipulla 26 000–20 000 vuotta sitten merenpinta oli noin '
      + '120 metriä nykyistä alempana, ja koska lahden suurin syvyys on 85 '
      + 'metriä, siinä ei ollut merivettä lainkaan: se oli suuri makean veden '
      + 'järvi keskellä Sundalandin mannerta, ja sen suurin syöttäjä oli Chao '
      + 'Phraya. Sundaland katosi noin 15 000 vuotta sitten merenpinnan '
      + 'noustessa.',
    lahde: 'en-Wikipedia "Gulf of Thailand", johdanto sekä osiot "Etymology" ja '
      + '"Paleolake in Sundaland" (tarkistettu 6.9.2026).',
  },
];
