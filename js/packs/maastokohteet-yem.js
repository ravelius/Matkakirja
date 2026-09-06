/*
 * MAASTOKOHTEET — YEM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs YEM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/YEM.json. Työkalu laskee laudan
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
 * Jemenin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Jabal an-Nabi Shu'aybin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 3 666 m); johdanto sanoo, että vuori on koko Arabian niemimaan korkein. Sokotra on saari-tyypin kohde — sama tyyppi on kohdemallissa tuettu (js/fokuskohteet.js KOHDE_TYYPIT).
 */
export const MAASTOKOHTEET_YEM = [
  {
    id: 'jabalannabishuayb',
    nimi: 'Jabal an-Nabi Shu\'ayb',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Arabian korkein vuori on Jemenissä?',
      'Kuka oli profeetta Shuayb?',
    ],
    korostukset: ['Sarawat|Sarawatin'],
    nappi: 'Koko Arabian korkein',
    // 43.9758 E / 15.2792 N — en-Wikipedia "Jabal An-Nabi Shu'ayb"
    laudat: {
      maailmankartta: { x: 7299.2, y: 2698.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kaikki Arabian niemimaan yli kolmetuhatmetriset huiput ovat Jemenissä, ja korkein '
      + 'niistä on Jabal an-Nabi Shu\'ayb, profeetta Shuaybin vuori: 3 666 metriä aivan Sanaan '
      + 'kupeessa. Se kuuluu Sarawatin vuoristoon, joka juoksee Punaisenmeren rannan '
      + 'suuntaisesti koko Jemenin länsilaidan pituudelta ja kääntyy sitten itään Adeninlahden '
      + 'rinnalle. Vuoristo on syntynyt tulivuorista, ja sen läntiset rinteet saavat enemmän '
      + 'sadetta kuin mikään muu kohta niemimaalla — itäpuolen loivemmat rinteet ovat vadien '
      + 'uurtamia, ja niissä viljellään, koska Intian valtameren monsuuni yltää sinne asti. '
      + 'Rinteillä elää hamadryaspaviaaneja, ja arabianleopardistakin on tehty havaintoja.',
    lahde: 'en-Wikipedia "Sarawat Mountains", johdanto-osa sekä osiot "Geology" ja "Wildlife" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'adeninlahti',
    nimi: 'Adeninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi lahti levenee joka vuosi?',
      'Mikä Bab-el-Mandeb on?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Lahti joka levenee yhä',
    // 45.6 E / 12.55 N — ulappa Adenin edustalla; artikkelin oma keskipiste 48 / 12 on lahden keskellä etelämpänä
    laudat: {
      maailmankartta: { x: 7353.3, y: 2791 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Adeninlahti on syvä lahti Jemenin ja Afrikan sarven välissä. Luoteessa se yhtyy '
      + 'Punaiseenmereen Bab-el-Mandebin salmen kautta ja idässä Arabianmereen. Lahden keskellä '
      + 'kulkee Adeninharjanne, jonka liikunta leventää lahtea noin 15 millimetriä vuodessa — '
      + 'meri siis kasvaa hitaasti. Antiikin kreikkalaisille lahti oli osa Erythrainmerta, '
      + 'tärkeimpiä tunnettuja vesiä.',
    lahde: 'en-Wikipedia "Gulf of Aden", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sokotra',
    nimi: 'Sokotra',
    // Saari, ei meri: 'saari' on kohdemallin oma tyyppi
    // (js/fokuskohteet.js KOHDE_TYYPIT) ja saa luonto-symbolin
    // tyyppijohdolla, joten symboli-kenttää ei tarvita.
    tyyppi: 'saari',
    kysymykset: [
      'Voiko saari kuulua eri maanosaan kuin valtionsa?',
      'Mitä soqotri-kieli on?',
    ],
    korostukset: ['soqotri|soqotria'],
    nappi: 'Saari kahden maailman välissä',
    // 53.92 E / 12.51 N — en-Wikipedia "Socotra"
    laudat: {
      maailmankartta: { x: 7630.7, y: 2792.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sokotra on Jemenin saari Intian valtameressä, 380 kilometriä Arabian niemimaalta '
      + 'etelään mutta vain 232 kilometriä Afrikan sarvesta itään. Hallinnollisesti se on '
      + 'Jemeniä, mutta geologisesti Afrikkaa: saari on Somalian mannerlaatasta irronnut '
      + 'sirpale. Se on saariryhmänsä kuudesta saaresta ylivoimaisesti suurin, ja sen asukkaat '
      + 'puhuvat arabian ohella omaa soqotria.',
    lahde: 'en-Wikipedia "Socotra", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ═══════════════ ERÄ M16 (JEMEN), 6.9.2026 ═════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Jemenillä oli ennen tätä erää kolme maastokohdetta (yllä) eikä
   * yhtään kohdetta, joten vaje oli kahdeksan kohdetta. Ne ovat tässä
   * lohkossa. Maastossa ei ollut vajetta.
   *
   * SISÄLTÖLINJA ON docs/aasia-tyoaineisto/spec-asia.md JA M3:N
   * MYANMAR-LINJA. Maan nykytila on sotaa, joten kohteiksi valittiin
   * vain antiikin ja keskiajan paikkoja, joiden lähdeartikkelin
   * nykytilaosuus ei ole taistelua. Kortit kertovat kohteen oman
   * historian; Shibamista sanotaan yhtenä toteavana virkkeenä lähteen
   * sanoin, että se on ollut vaarantuneiden maailmanperintökohteiden
   * luettelossa vuodesta 2015, koska se on kohteen nykyinen tila
   * Unescon listalla — muissa korteissa nykytilaa ei kommentoida.
   * Al Mukalla jäi pois, koska sen artikkelin nykyosuus on
   * aseellista toimintaa.
   *
   * EI PELIKAUPUNGIN KOHDALLA. Jemenin laudan kaupungit ovat Sana
   * (x 7306,7 / y 2695,5) ja Aden (x 7334,7 / y 2782,2). Etäisyys
   * mitattiin jokaiseen laudan kaupunkiin; lähin uusi merkki on Thula
   * 12,4 lautayksikön päässä Sanasta, ja raja KAUPUNGIN_KOHDALLA_SADE
   * on 7. Lähin kaupunki on kirjattu jokaisen koordinaattirivin viereen.
   *
   * AWWAMIN TEMPPELI JÄI POIS, vaikka lähdeaineisto on runsas: sen
   * piste (45,3557 E) on vain noin neljän lautayksikön päässä Marib-padon
   * merkistä, eli käytännössä sen päällä. Marib-pato on kahdesta
   * tunnetumpi, joten se valittiin.
   *
   * KUVATON ERÄ. Faktat en-Wikipedian raakatekstistä 6.9.2026.
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: 'shibam',
    nimi: 'Shibam',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi taloista tehtiin näin korkeita?',
      'Mistä talot on rakennettu?',
    ],
    korostukset: ['savitiili|savitiilestä'],
    nappi: 'Autiomaan pilvenpiirtäjäkaupunki',
    // 48.62667 E / 15.92694 N — en-Wikipedia "Shibam".
    // Lähin kaupunki Sana 148,8 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7454.2, y: 2676.2 },
    },
    teksti: 'Shibam on noin 7 000 asukkaan kaupunki Wadi Hadramautissa Itä-Jemenissä, ja se '
      + 'tunnetaan savitiilestä muuratuista tornitaloistaan, joista korkeimmissa on '
      + 'yksitoista kerrosta. Kaupunki perustettiin noin 200-luvulla, ja siitä tuli '
      + 'Hadramautin kuningaskunnan pääkaupunki vuonna 300, kun edellinen pääkaupunki Shabwa '
      + 'oli tuhoutunut. Nykyinen kaupunki on vuodelta 1533, ja pystysuoraan rakentaminen '
      + 'valittiin siksi, että asukkaat olisi saatu suojaan beduiinien hyökkäyksiltä; '
      + 'noin 500 taloa on viidestä yhteentoista kerrokseen nousevia tornitaloja, ja osa '
      + 'niistä on yli 30 metriä korkeita. Savi ei kestä sadetta ja eroosiota ilman hoitoa, '
      + 'joten seiniin on säännöllisesti levitettävä uusi savikerros. Shibam otettiin '
      + 'maailmanperintöluetteloon 1982 ja vaarantuneiden kohteiden luetteloon 2015.',
    lahde: 'en-Wikipedia "Shibam", johdanto sekä osiot "History", "Architecture" ja "Threats" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'zabid',
    nimi: 'Zabid',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Zabidissa on niin paljon moskeijoita?',
      'Kuka perusti nykyisen kaupungin?',
    ],
    korostukset: ['ziyadidit|ziyadidien'],
    nappi: 'Jemenin tihein moskeijakaupunki',
    // 43.31667 E / 14.2 N — en-Wikipedia "Zabid".
    // Lähin kaupunki Sana 49,3 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7277.2, y: 2735 },
    },
    teksti: 'Zabid on yksi Jemenin vanhimmista kaupungeista Punaisenmeren rannikkotasangolla. '
      + 'Nykyinen kaupunki syntyi noin vuonna 820, kun abbasidikalifi al-Ma’munin lähettämä '
      + 'Muhammad ibn Abdallah ibn Ziyad perusti sen kukistettuaan alueen heimokapinan, ja '
      + 'siitä tuli ziyadidien ja heidän seuraajiensa pääkaupunki useiden vuosisatojen ajan. '
      + 'Moskeijoista, muun muassa al-Asha’irin moskeijasta ja Suuresta moskeijasta, tuli '
      + 'islamilaisen oppineisuuden keskuksia, ja kaupunki rikastui myös siksi, että se oli '
      + 'Mekan ja Adenin välisen tien varrella. Rasulidien aikana 1229–1454 kaupunki oli '
      + 'huipussaan, ja 1300-luvulla elänyt paikallinen kirjoittaja al-Khazraji väitti siinä '
      + 'olleen 230–240 moskeijaa; vielä nykyäänkin moskeijoiden tiheys on Jemenin suurin. '
      + 'Zabid otettiin maailmanperintöluetteloon 1993.',
    lahde: 'en-Wikipedia "Zabid", johdanto sekä osiot "History" ja "World Heritage Site" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'maribin-pato',
    nimi: 'Maribin pato',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka kauan pato palveli?',
      'Mitä tapahtui, kun pato lopulta murtui?',
    ],
    korostukset: ['saba|saban'],
    nappi: 'Antiikin maailman insinöörityö',
    // 45.24361 E / 15.39639 N — en-Wikipedia "Marib Dam".
    // Lähin kaupunki Sana 34,8 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7341.5, y: 2694.3 },
    },
    teksti: 'Maribin suuri pato sulki Wadi Adhanahin Balaqin kukkuloilla ja keräsi vuoristoon '
      + 'satavat monsuunisateet Maribin peltojen kasteluvedeksi. Ensimmäiset maapadot ja '
      + 'kanavat ajoittuvat noin vuosiin 1750–1700 eaa., mutta varsinainen suuri pato on '
      + 'noin 700-luvulta eaa., ja vanhin siihen hakattu piirtokirjoitus on kuningas Yatha’ '
      + 'Amar Watar I:n ajalta 760–740 eaa. Se oli poikkileikkaukseltaan kolmiomainen, '
      + 'tiivistetystä maasta tehty 580 metriä pitkä ja neljä metriä korkea valli, jota '
      + 'himjarilaiset korottivat lopulta neljääntoista metriin; tulvakanavia oli viisi, ja '
      + 'kastelualue kasvoi noin sadan neliökilometrin suuruiseksi. Pato oli saban '
      + 'valtakunnan ja sen suitsukekaupan perusta, mutta se murtui yhä uudelleen, ja '
      + 'viimeiset korjaukset tehtiin vuonna 557. Vuonna 570 tai 575 vesi nousi jälleen yli '
      + 'eikä patoa enää korjattu; kastelun loppuminen sai jopa 50 000 ihmistä muuttamaan '
      + 'pois Jemenistä. Vuonna 2023 kolme padon aluetta otettiin maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Marib Dam", johdanto sekä osiot "Ancient dam", "Construction", '
      + '"Maintenance" ja "Final breach" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tarim',
    nimi: 'Tarim',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä palatsien tyylit tulivat?',
      'Mitä al-Kafin kirjastossa säilytetään?',
    ],
    korostukset: ['minareetti|minareetti'],
    nappi: 'Kolmesataa moskeijaa ja kolmekymmentä palatsia',
    // 49.0 E / 16.05 N — en-Wikipedia "Tarim, Yemen".
    // Lähin kaupunki Sana 161,7 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7466.7, y: 2672 },
    },
    teksti: 'Tarim on Wadi Hadramautin oppineisuuden keskus, ja sen alueella arvioidaan olevan '
      + 'jopa 365 moskeijaa; vanhin niistä, Sirjisin moskeija, on 600-luvulta. Al-Muhdarin '
      + 'moskeijaa kruunaa savesta muurattu, noin 53 metriä korkea minareetti, joka '
      + 'valmistui 1914 ja on Hadramautin ja Jemenin korkein sekä yksi maailman korkeimmista '
      + 'maarakenteista. Al-Kafin kirjastossa on yli 5 000 käsikirjoitusta uskonnosta, '
      + 'lääketieteestä, tähtitieteestä, maanviljelystä, matematiikasta ja filosofiasta, ja '
      + 'niistä 300–400 arvioidaan olevan ainoita kappaleitaan islamilaisessa maailmassa. '
      + 'Kaupungissa on myös noin kolmekymmentä palatsia, jotka rakennettiin 1870-luvun ja '
      + '1930-luvun välillä: hadramautilaiset kauppiassuvut rikastuivat ulkomailla ja '
      + 'rakennuttivat kotiin taloja niissä tyyleissä, joita olivat nähneet Brittiläisessä '
      + 'Intiassa ja Kaakkois-Aasiassa — mogulityyliä, art nouveauta ja uusklassismia — '
      + 'mutta perinteisellä hadramautilaisella savitiilitekniikalla.',
    lahde: 'en-Wikipedia "Tarim, Yemen", johdanto sekä osiot "Mosques and libraries" ja '
      + '"Palaces" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jibla',
    nimi: 'Jibla',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi pääkaupunki siirrettiin Jiblaan?',
      'Kuka oli kuningatar Arwa?',
    ],
    korostukset: ['sulayhidit|sulayhidien'],
    nappi: 'Kuningattaren pääkaupunki vuorella',
    // 44.15 E / 13.91667 N — en-Wikipedia "Jibla, Yemen".
    // Lähin kaupunki Aden 47,8 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7305, y: 2744.7 },
    },
    teksti: 'Jibla on vuoristokaupunki noin 2 200 metrin korkeudessa Ibbin maakunnassa. Kun '
      + 'sulayhidien hallitsija Ali ibn Muhammad murhattiin vuonna 1067, vallan peri hänen '
      + 'poikansa Ahmad, mutta tämä oli halvaantunut eikä kyennyt hallitsemaan, joten hän '
      + 'luovutti kaiken vallan puolisolleen Arwa al-Sulayhille. Yksi Arwan ensimmäisistä '
      + 'teoista oli siirtää pääkaupunki Sanaasta Jiblaan, jotta hän olisi lähempänä '
      + 'appensa surmaajaa Sa’id ibn Najaria; ansaan hän sai tämän vuonna 1088. Arwa '
      + 'rakennutti Jiblaan uuden palatsin ja muutti vanhan palatsin suureksi moskeijaksi, '
      + 'johon hänet lopulta haudattiin. Kaupunki ja sen ympäristö ovat Unescon '
      + 'maailmanperinnön aieluettelossa.',
    lahde: 'en-Wikipedia "Jibla, Yemen", johdanto ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'baraqish',
    nimi: 'Baraqish',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka korkea kaupunginmuuri oli?',
      'Kuka roomalainen kävi kaupungissa?',
    ],
    korostukset: ['minealaiset|minealaisten'],
    nappi: 'Suitsuketien muurikaupunki',
    // 44.8 E / 16.0 N — en-Wikipedia "Baraqish".
    // Lähin kaupunki Sana 29,6 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7326.7, y: 2673.7 },
    },
    teksti: 'Baraqish eli muinainen Yathill on hylätty kaupunki korkealla kukkulalla '
      + 'Luoteis-Jemenissä, Wadi Fardan karavaanireitin varrella, jonka vedet tekivät tiestä '
      + 'suositun. Kreikkalaiset ja roomalaiset tunsivat paikan nimellä Athlula. Kaupunki '
      + 'juontuu ehkä vuoden 1000 eaa. tienoille, ja noin 400 eaa. siitä tuli minealaisten '
      + 'kuningaskunnan pääkaupunki; kun pääkaupunki myöhemmin siirtyi Qarnawuun, Yathill jäi '
      + 'heidän uskonnolliseksi keskuksekseen. Se oli suitsuketien tärkeä pysähdyspaikka, ja '
      + 'kaupunkia kiersi neljätoista metriä korkea muuri, jossa oli 57 tornia ja kaksi '
      + 'porttia; suuri osa muurista on yhä näkyvissä, ja piirtokirjoitusten mukaan sabalaiset '
      + 'rakensivat sen uudelleen 450 eaa. Augustuksen kenraali Aelius Gallus valtasi '
      + 'kaupungin, mutta joukot lähtivät pian pois tautien ja huonon veden takia; paikalta on '
      + 'löydetty roomalaisen ratsumiehen P. Corneliuksen hauta.',
    lahde: 'en-Wikipedia "Baraqish", johdanto sekä osiot "History" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'thula',
    nimi: 'Thula',
    tyyppi: 'historia',
    kysymykset: [
      'Miltä ajalta kaupunki on?',
      'Mitä kaivauksissa löytyi linnoituksen alta?',
    ],
    korostukset: ['himjarilaiset|himjarilaisten'],
    nappi: 'Kivikaupunki vuoren juurella',
    // 43.90139 E / 15.57361 N — en-Wikipedia "Thula".
    // Lähin kaupunki Sana 12,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7296.7, y: 2688.2 },
    },
    teksti: 'Thula on pieni kaupunki Länsi-Jemenin Amranin maakunnassa. Se on peräisin '
      + 'himjarilaisten ajalta eli vuosien 110 eaa. ja 500-luvun jaa. väliltä, ja se on '
      + 'säilynyt poikkeuksellisen hyvin: kaupungissa on jäljellä perinteisiä asuintaloja ja '
      + 'moskeijoita. Arkeologiset tutkimukset ovat löytäneet himjarilaisten kerrosten alta '
      + 'saban ajan raunioita, joissa on massiivista kivirakentamista. Vuosina 2004–2011 '
      + 'tehdyssä kunnostuksessa korjattiin Bab al-Mayahin portti, useita vartiotorneja, '
      + 'polkuja, perinteinen vesisäiliö ja muita saban aikaisen linnoituksen osia. Thula on '
      + 'yksi Jemenin viidestä kohteesta Unescon maailmanperinnön aieluettelossa, jonne se '
      + 'lisättiin 8. heinäkuuta 2002.',
    lahde: 'en-Wikipedia "Thula", johdanto ja osio "World Heritage Status" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'al-hajjarah',
    nimi: 'Al Hajjarah',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mihin kylän talot on rakennettu?',
      'Kuka perusti kylän linnakkeen?',
    ],
    korostukset: ['sulayhidit|sulayhidit'],
    nappi: 'Kylä kalliojyrkänteen päällä',
    // 43.71722 E / 15.0675 N — en-Wikipedia "Al Hajjarah".
    // Lähin kaupunki Sana 19,0 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7290.6, y: 2705.5 },
    },
    teksti: 'Al Hajjarah on kylä Harazin vuorilla Manakhan piirikunnassa Sanaan maakunnassa. '
      + 'Se on entinen markkinakylä Sanaan ja al-Hudaydan välisen tien varrella ja toimii '
      + 'nykyään vaeltajien tukikohtana. Kylä on rakennettu jyrkänteen päälle, ja se on '
      + 'kuuluisa korkeista taloistaan, jotka nousevat suoraan kallioseinämästä. Linnakkeen '
      + 'perustivat sulayhidit 1100-luvulla, ja paikan strategisen aseman takia siitä tuli '
      + 'tärkeä varustus osmanien Jemenin-miehityksen aikana. Kylässä on myös imaami Yahya '
      + 'Muhammadin entinen asunto; hän allekirjoitti Italian ja Jemenin välisen sopimuksen '
      + 'vuonna 1926. Al Hajjarah tunnetaan pippurin tuottajana.',
    lahde: 'en-Wikipedia "Al Hajjarah", johdanto (tarkistettu 6.9.2026).',
  },
];

