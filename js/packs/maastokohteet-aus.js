/*
 * MAASTOKOHTEET — AUS. Australian kohteet ja maasto napautettaviksi.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Australialla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Oseania). Erä M2 antaa
 * maalle kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA; eläintäky (koala)
 * oli jo olemassa, ja kaksi skandaalia asuu js/packs/skandaalit.js:ssä.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-aus.js:ssä.
 * Sama perustelu kuin Euroopan erissä 1–4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja lehden poltettujen nimien
 * lohkon (js/packs/fokus-grc.js FOKUS_LISANIMET), jonka lähtöaineisto
 * on ämpärissä eikä repossa. Tämän tiedoston lista liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti.
 *
 * Maa on YLEISELLÄ reitillä (tools/fokuskartta/maat.mjs FOKUSMAAT
 * tuntee vain GRC, HUN, HRV, DEU, RUS ja CAN), joten lehdellä ei ole
 * yhtäkään poltettua maastonimeä: merkin nimiö on nimen ainoa esiintymä.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Maalla ei ole tools/maastoaineisto/AUS.json-tiedostoa, joten kohteet
 * on valittu käsin ja niiden lon/lat on luettu en-Wikipedian
 * coordinates-propista (poikkeukset merkitty rivikohtaisesti). Laudan
 * paikka on laskettu `laudat()`-funktiolla (tools/johda-maastokohteet.mjs),
 * eli täsmälleen samalla Millerin lieriöllä kuin muissakin pakeissa.
 * Vain maailmankartta-rivi: Euroopan erillislauta on poistettu
 * (Raamattu 30.8.2026).
 *
 * LEHDEN RAJAUS TARKISTETTU. Vartio 7a (tools/savukkeet/
 * savuke-maastokohteet.mjs) vaatii, että jokainen kohde osuu maan
 * fokuslehden rajaukseen. Australialla rajaus ON olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.AUS: x 9353,05…11198,62,
 * y 3313,12…5025,56), joten vartio pätee tähänkin maahan täysin
 * normaalisti — kaikki yksitoista riviä on mitattu sen sisään.
 *
 * YKSIKÄÄN EI OLE PELIKAUPUNGIN KOHDALLA. Australiassa on
 * kaksikymmentä pelikaupunkia (js/packs/maailmankartta.js CITIES), ja
 * etäisyys jokaiseen niistä on laskettu kohde kerrallaan. Lähin uusi
 * merkki on Tasmania 25,0 lautayksikön päässä Hobartista; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Kunkin kohteen
 * lähin kaupunki on kirjattu sen koordinaattirivin viereen.
 *
 * MURRAY JA KOSCIUSZKO JÄTETTIIN POIS (sääntö N3, sama nimi kartalla
 * vain kerran). Molemmat ovat jo maailmankartan omia nimiöitä
 * (js/packs/maailmankartta-nimet.js: "Murray"-jokirivi sekä
 * "Kaakkois-Australian ylängöt" ja "Suuri vedenjakajavuoristo", joiden
 * huippu on Kosciuszko). Samasta syystä ovat pois Darling ja
 * Eyrejärvi. Uluru on pelikaupunki, joten sekään ei saa uutta merkkiä.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen. Faktat on tarkistettu
 * en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_AUS = [
  /* ================================================================
   * K2-ERÄ M2, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'port-arthur',
    nimi: 'Port Arthur',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Erillinen vankila?',
      'Miksi Eaglehawk Neck oli vartioitu?',
    ],
    korostukset: ['Eaglehawk Neck|Eaglehawk Neck'],
    nappi: 'Vankila, josta ei ollut ulospääsyä',
    // 147.85 E / -43.15 N — en-Wikipedia "Port Arthur, Tasmania".
    // Lähin pelikaupunki Hobart, 31,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10761.7, y: 4745.7 },
    },
    teksti: 'Port Arthur alkoi vuonna 1830 puunkaatoleirinä ja muuttui rangaistussiirtolaksi, '
      + 'jonne lähetettiin vuosina 1833–1877 ne pakkosiirretyt, jotka olivat rikkoneet '
      + 'uudelleen jo Australiassa. Niemimaata ympäröi vesi, ja ainoa yhteys mantereelle, '
      + 'kolmenkymmenen metrin levyinen Eaglehawk Neck, oli aidattu ja vartioitu sotilailla, '
      + 'ansoilla ja koirilla. Erillinen vankila valmistui 1853 Jeremy Benthamin panoptikonin '
      + 'ajatuksesta: ruumiillisen rangaistuksen tilalle tuli hiljaisuuden järjestelmä, jossa '
      + 'vanki pidettiin hupun alla ja vaiti — ja moni sairastui siitä mielisairaaksi. Port '
      + 'Arthur kuuluu vuodesta 2010 Unescon maailmanperintöluettelon Australian '
      + 'vankisiirtolakohteisiin.',
    lahde: 'en-Wikipedia "Port Arthur, Tasmania", johdanto-osa ja osiot "Penal colony" '
      + 'ja "Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ubirr',
    nimi: 'Ubirr',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä röntgentaide tarkoittaa?',
      'Mistä pussihukan kuva kertoo?',
    ],
    korostukset: ['röntgentaide|röntgentaidetta'],
    nappi: 'Kalliot, joita on maalattu 40 000 vuotta',
    // 132.9593 E / -12.4095 N — en-Wikipedia "Ubirr".
    // Lähin pelikaupunki Darwin, 64,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10265.3, y: 3627.2 },
    },
    teksti: 'Ubirr on kalliomuodostuma Kakadun kansallispuistossa, ja sen suojapaikkojen '
      + 'seiniin on maalattu ja maalattu uudelleen 40 000 eaa. lähtien. Useimmat nykyisistä '
      + 'kuvista ovat noin kahdentuhannen vuoden takaa, ja monia on uusittu aivan lähiaikoihin '
      + 'asti. Päägalleria on täynnä röntgentaidetta, jossa eläimestä näkyvät luut ja sisäelimet; '
      + 'korkealla seinämällä on myös laihoja Mimi-henkiä, joiden yltämistä paikoilleen '
      + 'selitetään sillä, että henget maalasivat itsensä. Galleriaan on kuvattu myös pussihukka, '
      + 'joka on kuollut alueelta sukupuuttoon noin kaksituhatta vuotta sitten.',
    lahde: 'en-Wikipedia "Ubirr", johdanto-osa ja osio "Main gallery" (tarkistettu 6.9.2026).',
  },
  {
    id: 'parkesin-radioteleskooppi',
    nimi: 'Parkesin radioteleskooppi',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä lautanen välitti heinäkuussa 1969?',
      'Kuka maksoi teleskoopin?',
    ],
    korostukset: ['Murriyang|Murriyang'],
    nappi: 'Lautanen, joka näytti kuukävelyn',
    // 148.2629 E / -32.9978 N — en-Wikipedia "Parkes Observatory".
    // Lähin pelikaupunki Sydney, 94,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10775.4, y: 4352.5 },
    },
    teksti: 'Parkesin observatorion 64-metrinen lautanen valmistui 1961, ja sen lempinimi on '
      + 'The Dish; nykyään se tunnetaan myös nimellä Murriyang. Se oli yksi antenneista, jotka '
      + 'vastaanottivat Apollo 11:n kuukävelyn suorat televisiokuvat. Rahat kerättiin '
      + 'poikkeuksellisella tavalla: CSIRO:n radiofysiikan johtaja E. G. Bowen sai '
      + 'sota-aikaisilla amerikkalaissuhteillaan Carnegie Corporationin ja Rockefeller-säätiön '
      + 'maksamaan puolet, ja vasta se sai Australian pääministerin Robert Menziesin maksamaan '
      + 'loput. Menestys oli niin selvä, että NASA kopioi rakenteen omiin 64-metrisiin '
      + 'antenneihinsa. ABC on kutsunut laitetta Australian menestyneimmäksi tieteelliseksi '
      + 'kojeeksi.',
    lahde: 'en-Wikipedia "Parkes Observatory", johdanto-osa ja osio "Design and construction" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'broken-hill',
    nimi: 'Broken Hill',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Broken Hillissä on eri kellonaika kuin muualla osavaltiossa?',
      'Mihin kaupungin nimen antanut kukkula katosi?',
    ],
    korostukset: ['Line of Lode|Line of Lode'],
    nappi: 'Hopeakaupunki väärässä aikavyöhykkeessä',
    // 141.4667 E / -31.95 N — en-Wikipedia "Broken Hill".
    // Lähin pelikaupunki Adelaide, 137,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10548.9, y: 4313.7 },
    },
    teksti: 'Broken Hill on kaivoskaupunki Uuden Etelä-Walesin läntisimmässä nurkassa, ja se '
      + 'nousi hopea-lyijy-sinkkimalmista, jonka aitaratsastaja Charles Rasp löysi 1883. '
      + 'Malmijuonta sanotaan nimellä Line of Lode, ja kaupungin keskellä kohoaa siitä '
      + 'syntynyt keinotekoinen kukkula. Nimen antanut rikkinäinen kukkula ei ole enää '
      + 'olemassa: se louhittiin pois. Kaupunki noudattaa Etelä-Australian aikaa eikä oman '
      + 'osavaltionsa aikaa, koska sen ainoa rautatieyhteys aikanaan meni Adelaideen eikä '
      + 'Sydneyyn. Broken Hill on Australian pitkäikäisin kaivoskaupunki, ja se merkittiin '
      + 'kansalliseen perintöluetteloon 2015.',
    lahde: 'en-Wikipedia "Broken Hill", johdanto-osa ja osiot "Time zone" ja "Town name" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mungojarven-lunetit',
    nimi: 'Mungojärvi',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka kauan Mungojärvi on ollut kuiva?',
      'Mitä Kiinan muureiksi kutsutut dyynit ovat?',
    ],
    korostukset: ['lunetti|lunetteja'],
    nappi: 'Kuiva järvi, joka säilytti vanhimman haudan',
    // 143.0833 E / -33.75 N — en-Wikipedia "Lake Mungo".
    // Lähin pelikaupunki Melbourne, 152,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10602.8, y: 4380.6 },
    },
    teksti: 'Mungojärvi on kuivunut järvi Uudessa Etelä-Walesissa ja Unescon '
      + 'maailmanperintöön kuuluvan Willandran järvialueen keskus. Se on ollut kuivilla noin '
      + 'kaksikymmentätuhatta vuotta, ja sen itärannalla kohoaa jono puolikuun muotoisia '
      + 'dyynejä eli lunetteja, joita sanotaan Kiinan muureiksi ja jotka ovat paikoin '
      + 'neljänkymmenen metrin korkuisia. Sieltä on löydetty Mungon mies, Australian vanhimmat '
      + 'ihmisjäännökset, ja Mungon nainen, maailman vanhimmat rituaalisesti poltetut jäänteet. '
      + 'Alue on Paakantji-, Mutthi Mutthi- ja Ngiyampaa-kansojen perinteistä maata, ja '
      + 'ensimmäiset asukkaat tulivat sinne noin viisikymmentätuhatta vuotta sitten.',
    lahde: 'en-Wikipedia "Lake Mungo", johdanto-osa sekä osiot "History" ja "Geology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'snowy-mountains-hanke',
    nimi: 'Snowy Mountains -hanke',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mihin suuntaan hanke käänsi Snowy-joen veden?',
      'Kuinka monta patoa hankkeeseen kuuluu?',
    ],
    korostukset: ['vedenjakaja|vedenjakajan'],
    nappi: 'Joki, joka käännettiin vuoren läpi',
    // 148.6 E / -36.12 N — en-Wikipedia "Snowy Mountains Scheme".
    // Lähin pelikaupunki Sydney, 124,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10786.7, y: 4470 },
    },
    teksti: 'Snowy Mountains -hanke on Australian suurin insinöörityö: kuusitoista suurta '
      + 'patoa, yhdeksän voimalaitosta, kaksi pumppuasemaa ja 225 kilometriä tunneleita, '
      + 'putkia ja akvedukteja, rakennettuina vuosina 1949–1974. Hanke kaappaa Snowy-joen ja '
      + 'sen sivujokien veden korkealta ja kääntää sen sisämaahan Murrayn ja Murrumbidgeen '
      + 'kastelualueille — vesi, joka ennen valui kaakkoon Bassin salmeen. Kaksi '
      + 'tunnelijärjestelmää lävistää mannerta jakavan vedenjakajan, ja vesi putoaa matkalla '
      + 'kahdeksansataa metriä voimalaitosten läpi. Hanke lisättiin kansalliseen '
      + 'perintöluetteloon vuonna 2016.',
    lahde: 'en-Wikipedia "Snowy Mountains Scheme", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'eurekan-paalutus',
    nimi: 'Eurekan paalutus',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaivosmiehet kapinoivat?',
      'Miten korkeasta maanpetoksesta syytetyille kävi?',
    ],
    korostukset: ['Eurekan lippu|Eurekan lipulle'],
    nappi: 'Kaivosmiesten kolmen päivän tasavalta',
    // 143.8475 E / -37.5608 N — Ballarat, en-Wikipedia "Ballarat";
    // artikkelilla "Eureka Rebellion" ei ole omaa koordinaattia.
    // Lähin pelikaupunki Melbourne, 39,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10628.2, y: 4525.2 },
    },
    teksti: 'Victorian kultaryntäyksen kaivosmiehet nousivat vuonna 1854 kapinaan siirtokunnan '
      + 'brittihallintoa vastaan, ja pääsyy oli kaivoslupamaksu ja tapa, jolla sitä perittiin. '
      + 'Marraskuun 29. päivänä noin kymmenentuhatta miestä vannoi valan Eurekan lipulle, ja '
      + 'kolmantena joulukuuta paalutus Ballaratissa vallattiin taistelussa, jossa kuoli '
      + 'virallisesti 27 ihmistä, useimmat kapinallisia. Kolmetoista vangittua asetettiin '
      + 'syytteeseen korkeasta maanpetoksesta Melbournessa, mutta yleisön tuki oli niin suuri, '
      + 'että kaikki vapautettiin. Kapinan johtaja Peter Lalor valittiin Victorian parlamenttiin '
      + '1856, ja osa vaatimuksista toteutui — muun muassa yleinen miesten äänioikeus.',
    lahde: 'en-Wikipedia "Eureka Rebellion", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'cooktownin-endeavour',
    nimi: 'Cooktown',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi Endeavour vedettiin rannalle juuri tähän?',
      'Mikä on paikan nimi guugu yimithirrin kielellä?',
    ],
    korostukset: ['Endeavour|Endeavourin'],
    nappi: 'Ranta, jolla Cookin laiva korjattiin',
    // 145.2522 E / -15.4722 N — en-Wikipedia "Cooktown, Queensland".
    // Lähin pelikaupunki Cairns, 50,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10675.1, y: 3731.3 },
    },
    teksti: 'Cooktown on Endeavour-joen suulla Kap Yorkin niemimaalla, ja juuri siellä James '
      + 'Cook veti laivansa Endeavourin rannalle korjattavaksi vuonna 1770. Kaupunki ja sen '
      + 'takana kohoava 431-metrinen Mount Cook on nimetty hänen mukaansa. Varsinainen kaupunki '
      + 'perustettiin vasta 25. lokakuuta 1873 Palmer-joen kultakenttien huoltosatamaksi, ja se '
      + 'oli ensimmäisen vuoden ajan nimeltään Cook\'s Town. Seutu on guugu yimithirrin kielen '
      + 'aluetta, ja sen oma nimi on Gangaar, kalliokiteiden paikka: kvartsikiteitä käytettiin '
      + 'seremonioissa, ja niitä vaihdettiin täältä ainakin kolmensadan kilometrin päähän.',
    lahde: 'en-Wikipedia "Cooktown, Queensland", johdanto-osa sekä osiot "Geography" ja '
      + '"Aboriginal history" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * MAASTOKOHTEET — kolme kappaletta, tyypit vuori, meri ja saari.
   * ============================================================== */
  {
    id: 'mount-augustus',
    nimi: 'Mount Augustus',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Mount Augustus ei ole monoliitti?',
      'Mitä nimi Burringurrah tarkoittaa?',
    ],
    korostukset: ['antikliini|antikliini'],
    nappi: 'Kaksi kertaa Ulurun kokoinen kivi',
    // 116.8417 E / -24.325 N — en-Wikipedia "Mount Augustus (Western Australia)".
    // Lähin pelikaupunki Exmouth, 96,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9728.1, y: 4038.4 },
    },
    teksti: 'Mount Augustus kohoaa Länsi-Australian sisämaassa noin tuhat kilometriä Perthistä '
      + 'pohjoiseen, 1 106 metriin merenpinnasta ja noin 860 metriä ympäröivän tasangon '
      + 'yläpuolelle. Wadjari-kansa kutsuu sitä nimellä Burringurrah unienajan pojan mukaan, '
      + 'joka keihästettiin ja muuttui kiveksi; paikka on ollut pyhä tuhansia vuosia. '
      + 'Matkailuesitteet sanovat sitä maailman suurimmaksi monoliitiksi, mutta geologinen '
      + 'tutkimus ei tue väitettä: se on epäsymmetrinen antikliini eli poimuksi taipunut '
      + 'kerrostuma, ja sen päällä kasvaa kasveja toisin kuin Ulurulla. Kokoa sillä silti on '
      + 'kaksinkertaisesti Uluruun verrattuna.',
    lahde: 'en-Wikipedia "Mount Augustus (Western Australia)", johdanto-osa ja osio '
      + '"Monolith–Anticline distinction" (tarkistettu 6.9.2026).',
  },
  {
    id: 'iso-valliriutta',
    nimi: 'Iso valliriutta',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka rakensi valliriutan?',
      'Kuinka paljon riutta on menettänyt korallipeitteestään?',
    ],
    korostukset: ['korallipolyyppi|korallipolyypit'],
    nappi: 'Suurin elävien tekemä rakennelma',
    // 147.7 E / -18.28 N — piste riutan keskiosassa Townsvillen edustalla;
    // artikkelin oma koordinaatti (145,8 / -16,4) on Cairnsin kohdalla eli
    // pelikaupungin päällä, joten merkki on siirretty samalle riutalle
    // etelämmäs. Lähin pelikaupunki Townsville, 77,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10756.7, y: 3827.6 },
    },
    teksti: 'Iso valliriutta on maailman suurin koralliriuttajärjestelmä: yli 2 900 erillistä '
      + 'riuttaa ja 900 saarta, yhteensä noin 344 400 neliökilometriä Korallimerellä '
      + 'Queenslandin edustalla. Se on maailman suurin yhtenäinen rakennelma, jonka elävät '
      + 'olennot ovat tehneet — rakentajia ovat miljardit pienet korallipolyypit — ja se '
      + 'erottuu avaruuteen asti. Riutta otettiin maailmanperintöluetteloon 1981. Se on ollut '
      + 'aboriginaalien ja Torresinsalmen saarelaisten tuntema ja käyttämä pitkään, ja se on '
      + 'tärkeä osa paikallisten ryhmien kulttuuria. Vuoden 2020 tutkimuksen mukaan riutta '
      + 'menetti yli puolet korallipeitteestään vuosina 1995–2017.',
    lahde: 'en-Wikipedia "Great Barrier Reef", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'tasmanian-saari',
    nimi: 'Tasmania',
    tyyppi: 'saari',
    kysymykset: [
      'Milloin Bassin salmi erotti saaren mantereesta?',
      'Mikä oli Van Diemenin maa?',
    ],
    korostukset: ['Bassin salmi|Bassin salmen'],
    nappi: 'Saari, jonka meri erotti 11 700 vuotta sitten',
    // 147 E / -42 N — en-Wikipedia "Tasmania".
    // Lähin pelikaupunki Hobart, 25,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 10733.3, y: 4699.4 },
    },
    teksti: 'Tasmania on Australian saariosavaltio 240 kilometriä mantereen eteläpuolella, ja '
      + 'sen pääsaari on maailman 26. suurin. Palawa kanin kielellä saari on Lutruwita. Sen '
      + 'ensimmäiset asukkaat olivat aboriginaaleja, jotka tunnetaan nykyään nimillä palawa ja '
      + 'pakana, ja heidän uskotaan eristyneen mantereen ryhmistä noin 11 700 vuotta sitten, '
      + 'kun nouseva merenpinta muodosti Bassin salmen. Britit asuttivat saaren pysyvästi 1803 '
      + 'rangaistussiirtolaksi, ja vuodesta 1825 se oli oma siirtokuntansa nimellä Van Diemenin '
      + 'maa; nykyinen nimi otettiin käyttöön 1856. Saarelle lähetettiin noin 80 000 vankia '
      + 'ennen kuin pakkosiirrot loppuivat 1853.',
    lahde: 'en-Wikipedia "Tasmania", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
