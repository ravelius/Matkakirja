/*
 * MAASTOKOHTEET — USA. Yhdysvaltain maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Yhdysvalloilla ei ollut laskurin mukaan yhtäkään kohdetta eikä
 * yhtäkään maastokohdetta (docs/moduulit/karttanostot-kattavuus.md,
 * Pohjois-Amerikka): pelkkä eläintäky ja neljä historian hetkeä. Tämä
 * tiedosto on maailman erän M17 Yhdysvaltain osuus: KAHDEKSAN
 * KOHDETTA ja KOLME MAASTOKOHDETTA, sama malli kuin erässä M4
 * (js/packs/maastokohteet-can.js).
 *
 * KAHDEKSANTOISTA PELIKAUPUNKIA KARSII ENEMMÄN KUIN MISSÄÄN MUUALLA.
 * Laudalla on New York, San Francisco, Nome, Anchorage, Sitka,
 * Yellowstone, Mount Rushmore, Chicago, Appalakit, Denver, Santa Fe,
 * Grand Canyon, Los Angeles, Havaiji, Houston, New Orleans, Miami ja
 * San Juan. Uutta merkkiä ei saa panna pelikaupungin kohdalle
 * (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js), joten kohteet on
 * valittu kaupunkien VÄLISTÄ ja jokaisen etäisyys on mitattu kaikkiin
 * kahdeksaantoista. Lähin uusi merkki on Independence Hall 49,1
 * lautayksikön päässä New Yorkista; jokaisen kohteen lähin kaupunki on
 * kirjattu sen koordinaattirivin viereen.
 *
 * SÄÄNTÖ N3 (sama nimi kartalla vain kerran). Laudan oma nimitaulu
 * (js/packs/maailmankartta-nimet.js) kantaa jo Kalliovuoret, Sierra
 * Nevadan, Kaskadit, Yläjärven, Coloradon, Rio Granden, Arkansasin ja
 * Alleghenyn. Yhtäkään niistä ei ole tässä listassa: maastokolmikoksi
 * valittiin Mount St. Helens (nimitaulun Kaskadit-selityksessä
 * mainittu, mutta ei oma nimiönsä kartalla), Crater Lake ja Nantucket,
 * joita kartalla ei ole kertaakaan.
 *
 * EI AINEISTOTIEDOSTOA, JOTEN MAASTO ON VALITTU KÄSIN. Työkalun
 * lähtöaineistoa tools/maastoaineisto/USA.json ei ole, joten
 * koordinaatit on laskettu koneella työkalun omalla kaavalla
 * (`import { laudat } from tools/johda-maastokohteet.mjs`, lon/lat
 * en-Wikipedian coordinates-propista).
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Yhdysvalloilla rajaus ON olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.USA, lauta maailmankartta, x 1329,0–3947,3 /
 * y 1219,2–2533,4), joten vartio pätee tähänkin tiedostoon eikä sitä
 * ole kierretty: jokainen alla oleva piste on tarkistettu rajausta
 * vasten yksitellen. Rajaus on myös syy siihen, ettei listassa ole
 * Alaskan eikä Havaijin kohteita.
 *
 * VAIN MAAILMANKARTAN RIVI. Erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), joten `laudat`-kentässä on vain maailmankartta.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen; tarkistamaton
 * Commons-tiedosto olisi huonompi kuin kuvaton kortti (Perustuslaki,
 * faktakuri). Faktat on tarkistettu en-Wikipediasta kohde kerrallaan
 * 6.9.2026, ja jokaisen kohteen `lahde`-rivi kertoo artikkelin osan.
 */
export const MAASTOKOHTEET_USA = [
  /* ================================================================
   * MAASTO — kolme kohdetta: tulivuori, järvi ja saari.
   * ============================================================== */
  {
    id: 'mount-st-helens',
    nimi: 'Mount St. Helens',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten vuori madaltui yhdessä aamussa?',
      'Miksi purkaus suuntautui sivulle eikä ylös?',
    ],
    korostukset: ['sivupurkaus|sivupurkaukseen', 'hevosenkenkä|hevosenkengän'],
    nappi: 'Vuori, joka menetti huippunsa 1980',
    // -122.1944 E / 46.1912 N — en-Wikipedia "Mount St. Helens"
    // Lähin pelikaupunki: Vancouver 142,5 lautayksikköä (San Francisco 216,8).
    laudat: {
      maailmankartta: { x: 1760.2, y: 1552.4 },
    },
    teksti: 'Mount St. Helens on toiminnassa oleva kerrostulivuori Washingtonin osavaltiossa, '
      + 'osa Kaskadien tulivuorikaarta ja Tyynenmeren tulirengasta. Cowlitzeille se on '
      + 'Lawetlatʼla, klickitateille Loowit; englanninkielisen nimensä se sai brittiläiseltä '
      + 'diplomaatilta, joka oli George Vancouverin ystävä. Purkaus 18. toukokuuta 1980 on '
      + 'Yhdysvaltain historian taloudellisesti tuhoisin tulivuoritapahtuma: 57 ihmistä '
      + 'kuoli, ja 200 taloa, 47 siltaa, 24 kilometriä rautatietä ja 298 kilometriä '
      + 'maantietä tuhoutui. Magnitudin 5,1 maanjäristys laukaisi valtavan '
      + 'kivivyöryn, joka avasi vuoren kyljen sivupurkaukseen: huippu laski 2 950 metristä '
      + '2 549 metriin ja tilalle jäi kilometrin levyinen hevosenkengän muotoinen kraatteri. '
      + 'Vesiekosysteemit sen sijaan hyötyivät tuhkasta, ja kuudessa vuodessa useimmat '
      + 'seudun järvet olivat palanneet ennalleen.',
    lahde: 'en-Wikipedia "Mount St. Helens", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'crater-lake',
    nimi: 'Crater Lake',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi järveen ei laske yhtään jokea?',
      'Mikä vuori järven paikalla oli?',
    ],
    korostukset: ['kaldera|kalderasta', 'Mazama|Mazaman'],
    nappi: 'Syvin järvi ilman tulojokea',
    // -122.1 E / 42.95 N — en-Wikipedia "Crater Lake"
    // Lähin pelikaupunki: San Francisco 199,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 1763.3, y: 1685.4 },
    },
    teksti: 'Crater Lake eli klamathien Giiwas on kraatterijärvi Etelä-Oregonissa, ja se '
      + 'tunnetaan syvänsinisestä väristään ja veden kirkkaudesta. Järvi täyttää osan '
      + '655 metriä syvästä kalderasta, joka syntyi noin 7 700 vuotta sitten, kun Mazaman '
      + 'tulivuori romahti itsensä sisään. Järveen ei laske eikä siitä lähde yhtään jokea: '
      + 'haihtuminen ja sade ovat tasapainossa niin, että koko vesimassa vaihtuu noin 150 '
      + 'vuodessa. Syvyys on 594 metriä, mikä tekee siitä Yhdysvaltain syvimmän ja maailman '
      + 'kymmenenneksi syvimmän järven. Järvessä on kaksi pientä saarta: Wizard Island, noin '
      + '128 hehtaarin kuonakartio, ja Phantom Ship, luonnon muovaama kalliopilari. '
      + 'Arkeologit ovat löytäneet purkauksen tuhkakerrosten alta sandaaleja, joten seudulla '
      + 'oli ihmisiä jo ennen romahdusta.',
    lahde: 'en-Wikipedia "Crater Lake", johdanto-osa ja osio "Location" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'nantucket',
    nimi: 'Nantucket',
    tyyppi: 'saari',
    kysymykset: [
      'Ketkä soutivat saaren ensimmäisiä valaanpyyntiveneitä?',
      'Miksi valaanpyynti siirtyi pois saarelta?',
    ],
    korostukset: ['wampanoag|wampanoagia', 'Essex|Essex-laivan'],
    nappi: 'Meren harmaa pikku rouva',
    // -70.09944 E / 41.28278 N — en-Wikipedia "Nantucket"
    // Lähin pelikaupunki: New York 137,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3496.7, y: 1752.2 },
    },
    teksti: 'Nantucket on saari Massachusettsissa noin 48 kilometriä Cape Codin eteläpuolella, '
      + 'ja se on samalla oma kuntansa ja oma piirikuntansa. Nimi tulee wampanoagin sanasta, '
      + 'jonka merkitys on epävarma — ehkä "kaukainen saari" tai "hiekkainen, hedelmätön '
      + 'maa". Lempinimi "meren harmaa pikku rouva" kuvaa sitä, miltä saari näyttää sumusta '
      + 'katsottuna. 1700-luvun alussa valaita pyydettiin rannalta lähtevillä noin '
      + 'seitsemänmetrisillä veneillä, joissa souti tavallisesti viisi wampanoagia ja '
      + 'perämelan varressa istui yksi valkoinen mies; ilman alkuperäisväestöä saaresta ei '
      + 'olisi tullut valaanpyyntisatamaa lainkaan. Nantucketilaisen Essex-laivan viimeinen '
      + 'matka antoi Herman Melvillelle aiheen Moby Dickiin. Vuoteen 1850 mennessä pyynti oli '
      + 'hiipumassa: satama liettyi umpeen, ja New Bedford otti johtoaseman.',
    lahde: 'en-Wikipedia "Nantucket", johdanto-osa sekä osiot "Etymology" ja "Whaling '
      + 'industry" (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M17, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa.
   * ============================================================== */
  {
    id: 'mesa-verde',
    nimi: 'Mesa Verde',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi asunnot rakennettiin kallionkoloihin?',
      'Minne asukkaat lähtivät vuoteen 1285 mennessä?',
    ],
    korostukset: ['kallioasumus|kallioasumusta', 'Cliff Palace|Cliff Palace'],
    nappi: 'Kuusisataa taloa kallion kainalossa',
    // -108.4887 E / 37.1838 N — en-Wikipedia "Mesa Verde National Park"
    // Lähin pelikaupunki: Santa Fe 124,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2217, y: 1912.3 },
    },
    teksti: 'Mesa Verde on kansallispuisto Coloradossa lähellä Four Cornersia, ja se suojelee '
      + 'esi-isäpuebloilaisten parhaiten säilyneitä asuinpaikkoja. Kohteita on yli 5 000, '
      + 'niistä 600 kallioasumusta, mikä tekee siitä Yhdysvaltain laajimman arkeologisen '
      + 'suojelualueen; tunnetuin on Cliff Palace, Pohjois-Amerikan suurimpia. Nimi on '
      + 'espanjaa ja tarkoittaa vihreää pöytävuorta. Ensimmäiset pueblot nousivat tasangon '
      + 'päälle 650-luvun jälkeen, ja vasta 1100-luvun lopulla alettiin rakentaa kallioiden '
      + 'koloihin. Kolot olivat lämpimämpiä: talviaurinko lämmitti muurit, ja kalliosyvennys '
      + 'oli 5–10 astetta lämpimämpi kuin tasangon pinta. Vuoteen 1285 mennessä asukkaat '
      + 'muuttivat etelään nykyisiin Arizonaan ja New Mexicoon pitkien kuivuuksien jälkeen. '
      + 'Kongressi ja presidentti Theodore Roosevelt perustivat puiston 1906.',
    lahde: 'en-Wikipedia "Mesa Verde National Park", johdanto-osa sekä osiot "Cliff '
      + 'dwellings" ja "Climate" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cahokia',
    nimi: 'Cahokia',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuri kaupunki oli huipussaan?',
      'Mistä nimi Cahokia tulee?',
    ],
    korostukset: ['Monks Mound|Monks Mound', 'chunkey|chunkey'],
    nappi: 'Kaupunki, jonka oma nimi unohtui',
    // -90.06444 E / 38.65389 N — en-Wikipedia "Cahokia"
    // Lähin pelikaupunki: Chicago 152,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2831.2, y: 1855.5 },
    },
    teksti: 'Cahokia oli intiaanikaupunki Mississippin länsirannalla nykyisen St. Louisin '
      + 'kohdalla, ja se eli noin vuosina 1050–1350. Huipussaan 1100-luvun tienoilla se '
      + 'peitti noin kuusitoista neliökilometriä, siinä oli noin 120 maavallia ja siellä asui '
      + '15 000–20 000 ihmistä. Suurin niistä, Monks Mound, kattaa 5,7 hehtaaria ja nousee '
      + '30 metriin; sen päällä oli vielä 15 metriä korkea rakennus. Tuhannet työntekijät '
      + 'kantoivat vuosikymmenten aikana punotuissa koreissa arviolta 1,6 miljoonaa '
      + 'kuutiometriä maata. Suurella aukiolla pelattiin chunkeyta, jossa kivikiekko '
      + 'vieritettiin kentän poikki ja pelaajat heittivät keihäänsä sinne, mihin arvelivat '
      + 'sen pysähtyvän. Kaupungin oma nimi ei ole tiedossa: Cahokia on 1600-luvulla seudulla '
      + 'asuneen heimon nimi, ja se annettiin vallien mukaan vasta vuosisatoja hylkäämisen '
      + 'jälkeen.',
    lahde: 'en-Wikipedia "Cahokia", johdanto-osa ja osio "Mounds" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chacon-kanjoni',
    nimi: 'Chacon kanjoni',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä rakennuspuut tuotiin kanjoniin?',
      'Mikä lopetti Chacon kukoistuksen?',
    ],
    korostukset: ['hiekkakivi|hiekkakiviharkkoja', 'Fajada Butte|Fajada Butten'],
    nappi: 'Pohjois-Amerikan suurimmat talot ennen 1800-lukua',
    // -107.96 E / 36.06 N — en-Wikipedia "Chaco Culture National Historical Park"
    // Lähin pelikaupunki: Santa Fe 80,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2234.7, y: 1955.2 },
    },
    teksti: 'Chacon kanjoni Luoteis-New Mexicossa oli esi-isäpuebloilaisten suuri keskus '
      + 'vuosina 900–1150. Chacolaiset louhivat hiekkakiviharkkoja ja raahasivat rakennuspuut '
      + 'kaukaa, ja he kokosivat viisitoista suurta rakennuskokonaisuutta, jotka pysyivät '
      + 'Pohjois-Amerikan suurimpina rakennuksina aina 1800-luvulle asti. Ilmaston '
      + 'muuttumisen uskotaan ajaneen asukkaat pois: viisikymmentä vuotta kestänyt kuivuus '
      + 'alkoi 1130. Monet rakennukset näyttävät olevan suunnattu auringon ja kuun kiertoihin, '
      + 'mikä vaatisi sukupolvien mittaisia havaintoja; tunnetuin esimerkki on Fajada Butten '
      + '"aurinkotikari"-kalliopiirros. Kävijöiden aiheuttaman kulumisen takia Fajada Butte '
      + 'on nykyään suljettu. Hopit ja pueblot pitävät paikkaa esi-isiensä pyhänä kotimaana '
      + 'ja työskentelevät puiston kanssa.',
    lahde: 'en-Wikipedia "Chaco Culture National Historical Park", johdanto-osa (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'gettysburg',
    nimi: 'Gettysburg',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin Gettysburgin taistelu käytiin?',
      'Mikä puhe pidettiin hautausmaan vihkiäisissä?',
    ],
    korostukset: ['Gettysburgin puhe|Gettysburgin puheen'],
    nappi: 'Kolme päivää heinäkuussa 1863',
    // -77.23667 E / 39.80861 N — en-Wikipedia "Gettysburg National Military Park"
    // Lähin pelikaupunki: New York 110,0 lautayksikköä (Appalakit 111,7).
    laudat: {
      maailmankartta: { x: 3258.8, y: 1810.4 },
    },
    teksti: 'Gettysburgin kansallinen sotilaspuisto Pennsylvaniassa suojelee maisemaa, jossa '
      + 'käytiin Yhdysvaltain sisällissodan Gettysburgin taistelu kolmen päivän ajan 1.–3. '
      + 'heinäkuuta 1863. Puistoa on 1 532 hehtaaria, ja se kattaa suurimman osan '
      + 'taistelukentästä sekä taistelun tukialueita: varastoja, reservien paikkoja ja '
      + 'sotasairaaloita. Alueeseen kuuluu myös kansallinen sotilashautausmaa, jonka '
      + 'vihkiäisissä 19. marraskuuta 1863 presidentti Abraham Lincoln piti Gettysburgin '
      + 'puheen. Museossa on esillä osa puiston 43 000 '
      + 'sisällissotaesineestä. Puistossa on nykyään enemmän metsää kuin 1863, ja '
      + 'kansallispuistovirasto raivaa maisemaa takaisin avoimeksi sekä istuttaa entisiä '
      + 'hedelmätarhoja. Kävijöitä oli 2018 noin 950 000 — 86 prosenttia vähemmän kuin 1970.',
    lahde: 'en-Wikipedia "Gettysburg National Military Park", johdanto-osa (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'kill-devil-hills',
    nimi: 'Kill Devil Hills',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka pitkä ensimmäinen lento oli?',
      'Miksi veljekset tulivat juuri Pohjois-Carolinaan?',
    ],
    korostukset: ['12 sekuntia|12 sekuntia', 'Wrightin veljekset|Wrightin veljesten'],
    nappi: '37 metriä, 12 sekuntia, 17.12.1903',
    // -75.6679 E / 36.0143 N — en-Wikipedia "Wright Brothers National Memorial"
    // Lähin pelikaupunki: Appalakit 170,9 lautayksikköä (New York 175,2).
    laudat: {
      maailmankartta: { x: 3311.1, y: 1957 },
    },
    teksti: 'Wrightin veljesten muistomerkki Kill Devil Hillsissä Pohjois-Carolinassa '
      + 'muistuttaa ensimmäisistä onnistuneista, jatkuvista ja moottorilla lennetyistä '
      + 'lennoista ilmaa raskaammalla koneella. Wilbur ja Orville Wright tulivat Ohion '
      + 'Daytonista tänne vuosina 1900–1903, koska Yhdysvaltain sääviraston tiedot lupasivat '
      + 'seudulle tasaisia tuulia — ja koska paikka oli tuolloin syrjässä. Kolmen vuoden '
      + 'liitokokeiden jälkeen he tekivät 17. joulukuuta 1903 neljä lentoa tasaiselta maalta '
      + 'kukkulan juurelta. Orvillen ensimmäinen lento kesti 12 sekuntia ja kulki 37 metriä, '
      + 'siis vähemmän kuin Boeing 747:n siipiväli; päivän viimeinen, Wilburin lento, kesti '
      + '59 sekuntia ja kattoi 260 metriä. Neljän lennon lähtö- ja päätepisteet on merkitty '
      + 'pienillä muistokivillä, ja paikalla on jäljennös maailman ensimmäisestä '
      + 'lentokonehallista.',
    lahde: 'en-Wikipedia "Wright Brothers National Memorial", johdanto-osa ja osio "The field '
      + 'and hangar", sekä "Wright Flyer", osio "First flights" (tarkistettu 6.9.2026).',
  },
  {
    id: 'promontory',
    nimi: 'Promontory',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi juhla siirtyi kahdella päivällä?',
      'Missä kultainen naula on nyt?',
    ],
    korostukset: ['kultainen naula|kultaisen naulan', 'Jupiter|Jupiter'],
    nappi: 'Kaksi veturia nokakkain, 10.5.1869',
    // -112.5516 E / 41.6179 N — en-Wikipedia "Golden Spike National Historical Park"
    // Lähin pelikaupunki: Yellowstone 138,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2081.6, y: 1738.8 },
    },
    teksti: 'Promontory Summitissa Utahissa Central Pacificin ja Union Pacificin radat '
      + 'kohtasivat 10. toukokuuta 1869, ja siihen päättyi Yhdysvaltain ensimmäinen '
      + 'mannerten välinen rautatie. Juhlan piti olla 8. toukokuuta — se päivämäärä on '
      + 'kaiverrettu naulaan — mutta huono sää ja työriita viivyttivät Union Pacificin puolta '
      + 'kahdella päivällä. Seremoniassa veturit Union Pacific No. 119 ja Central Pacificin '
      + 'Jupiter ajettiin nokakkain, ja Leland Stanford löi 17,6 karaatin kultaisen naulan '
      + 'kiillotettuun laakeripuiseen ratapölkkyyn. Väkeä arvioidaan olleen 500–3 000. Naula '
      + 'oli san franciscolaisen rahoittajan David Hewesin idea, ja se on nykyään esillä '
      + 'Stanfordin yliopiston Cantor Arts Centerissä. Rata hylättiin 1904 ja kiskot '
      + 'purettiin 1942 sotateollisuuden tarpeisiin; nykyisin paikalla on kaksi kilometriä '
      + 'uudelleen rakennettua rataa.',
    lahde: 'en-Wikipedia "Golden spike", johdanto-osa ja osio "History", sekä "Golden Spike '
      + 'National Historical Park", osio "Background" (tarkistettu 6.9.2026).',
  },
  {
    id: 'independence-hall',
    nimi: 'Independence Hall',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä rakennuksessa päätettiin kesällä 1776?',
      'Mikä rakennus se oli alun perin?',
    ],
    korostukset: ['itsenäisyysjulistus|itsenäisyysjulistus', 'perustuslakikokous|perustuslakikokous'],
    nappi: 'Pennsylvanian osavaltiotalo, jossa maa syntyi',
    // -75.15 E / 39.94889 N — en-Wikipedia "Independence Hall"
    // Lähin pelikaupunki: New York 49,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3328.3, y: 1804.9 },
    },
    teksti: 'Independence Hall on Philadelphiassa sijaitseva julkinen rakennus, jossa sekä '
      + 'Yhdysvaltain itsenäisyysjulistus että perustuslaki käsiteltiin ja hyväksyttiin. Se '
      + 'valmistui 1753 nimellä Pennsylvania State House ja oli siirtomaakauden Pennsylvanian '
      + 'ensimmäinen hallintotalo; jo silloin sitä pidettiin "kaupungin suurimpana '
      + 'koristeena". Toinen mannerkongressi kokoontui talossa vuodesta 1775 vuoteen 1781, '
      + 'perusti sinne mannerarmeijan 14. kesäkuuta 1775 ja hyväksyi itsenäisyysjulistuksen '
      + '4. heinäkuuta 1776. Perustuslakikokous istui samassa talossa 25. toukokuuta ja 17. '
      + 'syyskuuta 1787 välillä. Rakennus sai nykyisen nimensä 1824, kun se otti vastaan '
      + 'markiisi de Lafayetten. Se on esimerkki amerikkalaisesta gregoriaanisesta '
      + 'arkkitehtuurista ja pääsi maailmanperintöluetteloon 1979.',
    lahde: 'en-Wikipedia "Independence Hall", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'mammothin-luola',
    nimi: 'Mammothin luola',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka pitkä luolasto on?',
      'Miksi luolasto on niin vakaa?',
    ],
    korostukset: ['karsti|karstimaisemaa', 'hiekkakivi|hiekkakivikerros'],
    nappi: 'Maailman pisin tunnettu luolasto',
    // -86.10111 E / 37.18694 N — en-Wikipedia "Mammoth Cave National Park"
    // Lähin pelikaupunki: Appalakit 187,1 lautayksikköä (Chicago 191,5).
    laudat: {
      maailmankartta: { x: 2963.3, y: 1912.2 },
    },
    teksti: 'Mammoth Cave on kansallispuisto Etelä-Kentuckyssa, ja sen sisällä on maailman '
      + 'pisin tunnettu luolasto. Käytäviä oli vuoteen 2025 mennessä mitattu yli 686 '
      + 'kilometriä eli yli puolitoista kertaa niin paljon kuin maailman toiseksi pisimmässä '
      + 'luolastossa, Meksikon Ox bel hassa. Luolasto sai virallisen nimen '
      + 'Mammoth–Flint Ridge 1972, kun Mammothin ja pohjoisen Flint Ridgen välillä löytyi '
      + 'yhteys. Luolat syntyivät noin 330 miljoonaa vuotta sitten paksuun kalkkikiveen, jonka '
      + 'päällä on hiekkakivikerros — juuri se tekee järjestelmästä poikkeuksellisen vakaan. '
      + 'Puiston läpi virtaa Green River, ja pinnalla on laajaa metsäistä karstimaisemaa. '
      + 'Puisto perustettiin 1941 riitaisten pakkolunastusten jälkeen, joiden seuraukset '
      + 'tuntuvat seudulla yhä. Se on maailmanperintökohde 1981 ja pimeän taivaan puisto '
      + '2021.',
    lahde: 'en-Wikipedia "Mammoth Cave National Park", johdanto-osa sekä osiot "Mission" ja '
      + '"Geology" (tarkistettu 6.9.2026).',
  },
];
