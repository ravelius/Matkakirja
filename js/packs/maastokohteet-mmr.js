/*
 * MAASTOKOHTEET JA KOHTEET — MMR (Myanmar). Erä M3, Aasia, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Myanmarilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * HERKKIEN KOHTEIDEN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/
 * spec-asia.md): Myanmarista kirjoitetaan 1800-luvun Burmaa —
 * kuningaskuntaa, palatseja, brittivaltaa historiana — EIKÄ juntta- tai
 * konfliktisisältöä. Siksi tästä listasta puuttuu kaksi muuten
 * ilmeistä ehdokasta: Goteikin viadukti (en-Wikipedian artikkeli kertoo
 * sen tuhoutuneen 2025 sisällissodassa) ja Mogokin rubiinikaivokset
 * (artikkelin nykytilaosuus on sotaa). Kumpaakaan ei voi kertoa
 * lähteen katteessa rikkomatta linjausta, joten ne jäivät pois.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-mmr.js:ssä — sama syy kuin
 * K2-erissä 1–4: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon (js/packs/fokus-grc.js),
 * jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/MMR.json-tiedostoa
 * ei ole): Hkakabo Razi, Inlejärvi ja Chindwin — vuori, järvi ja joki.
 * IRAVADI JÄTETTIIN POIS TARKOITUKSELLA: kartalla on jo Iravadi-niminen
 * jokinimiö (js/packs/maailmankartta-nimet.js), ja sääntö N3 sanoo, että
 * sama nimi esiintyy kartalla vain kerran. Chindwin on Iravadin suurin
 * sivujoki ja vapaa nimi. Samasta syystä pois jäi myös Salween.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin (Yangon, Mandalay ja
 * muut). Lähin uusi merkki on Pyin Oo Lwin 11,6 lautayksikön päässä
 * Mandalaysta; raja KAUPUNGIN_KOHDALLA_SADE on 7 ja kaupunkikaton säde
 * 8. Ehdokkaista pudotettiin juuri tästä syystä Shwedagon (Yangonin
 * kohdalla), Inwa, Amarapura ja Mingun (Mandalayn kohdalla).
 * js/packs/maakartat.js:ään ei ole koskettu.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_MMR = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'bagan',
    nimi: 'Bagan',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta temppeliä tasangolle rakennettiin?',
      'Mitä Baganin klassinen nimi Tattadesa tarkoittaa?',
    ],
    korostukset: ['stupaa|stupaa'],
    nappi: 'Kymmenentuhatta temppeliä tasangolla',
    // 94.86 E / 21.1725 N — en-Wikipedia "Bagan"
    laudat: {
      maailmankartta: { x: 8995.3, y: 2495.2 },
    },
    teksti: 'Bagan on muinaiskaupunki Mandalayn alueella, ja se oli 800-luvulta '
      + '1200-luvulle Paganin kuningaskunnan pääkaupunki — ensimmäisen '
      + 'valtakunnan, joka yhdisti nykyisen Myanmarin alueet. Kukoistuskaudellaan '
      + '1000–1200-luvuilla tasangolle rakennettiin yli 10 000 buddhalaista '
      + 'temppeliä, stupaa ja luostaria, joista yli 2 200 on säilynyt. Kaupunki '
      + 'oli valtakunnan poliittinen, taloudellinen ja kulttuurinen keskus '
      + 'vuosina 1044–1287. Kronikoiden mukaan Bagan perustettiin 100-luvulla ja '
      + 'linnoitettiin 849, mutta länsimainen tutkimus ajoittaa perustamisen '
      + '800-luvun puolivälin jälkeiseen aikaan.',
    lahde: 'en-Wikipedia "Bagan", johdanto ja osio "9th to 13th centuries" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mrauk-u',
    nimi: 'Mrauk U',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Mrauk U tarkoittaa?',
      'Kuinka suureksi kaupunki kasvoi 1600-luvulla?',
    ],
    korostukset: ['arakanilaisten|arakanilaisten'],
    nappi: 'Arakanin kuninkaiden kaupunki',
    // 93.1925 E / 20.59 N — en-Wikipedia "Mrauk U"
    laudat: {
      maailmankartta: { x: 8939.8, y: 2515.5 },
    },
    teksti: 'Mrauk U on kaupunki Pohjois-Rakhinen osavaltiossa ja alueen '
      + 'rakhinelaisten eli arakanilaisten kulttuurin keskus, jonka ympärillä on '
      + 'runsaasti arkeologisia kohteita. Kuningas Min Saw Mon perusti sen 1430 '
      + 'viimeisen yhtenäisen arakanilaisen kuningaskunnan pääkaupungiksi, ja se '
      + 'oli 49 kuninkaan hallintopaikka vuoteen 1784. Kaupunki kasvoi 1600-luvun '
      + 'alussa 160 000 asukkaan kokoiseksi. Osa rakhinelaisista tutkijoista '
      + 'selittää nimen tarkoittavan vanhassa arakanin kielessä ensimmäistä '
      + 'saavutusta; kaupungin historia jaetaan varhaiseen (1430–1530), keskiseen '
      + '(1531–1638) ja myöhäiseen (1638–1784) kauteen.',
    lahde: 'en-Wikipedia "Mrauk U", johdanto sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'beikthano',
    nimi: 'Beikthano',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen jumalan mukaan kaupunki on nimetty?',
      'Milloin Pyu-kaupungit hyväksyttiin maailmanperintöluetteloon?',
    ],
    korostukset: ['pyu-kaupunkivaltioiden|pyu-kaupunkivaltioiden'],
    nappi: 'Burman vanhin kaivettu kaupunki',
    // 95.37944 E / 20.00389 N — en-Wikipedia "Beikthano"
    laudat: {
      maailmankartta: { x: 9012.6, y: 2535.9 },
    },
    teksti: 'Beikthano sijaitsee kastellulla Magwayn alueella lähellä nykyistä '
      + 'Taungdwingyitä, ja se oli pyu-kaupunkivaltioiden aikana merkittävä '
      + 'keskus. Se on vanhin tieteellisesti kaivettu kaupunkikohde Myanmarissa: '
      + 'rakenteet, keramiikka, esineet ja luurangot ajoittuvat vuosien 200 eaa. '
      + 'ja 100 jaa. väliin. Kaupunki oli laaja linnoitettu asutus, jonka '
      + 'suorakulmaisten muurien — kolme kilometriä kertaa yksi — sisään jäi noin '
      + '300 hehtaaria, ja muurit olivat kuusi metriä paksut. Nimi tulee '
      + 'hindujumala Vishnusta. Beikthano, Halin ja Sri Ksetra hyväksyttiin '
      + 'Unescon maailmanperintöluetteloon toukokuussa 2014.',
    lahde: 'en-Wikipedia "Beikthano", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kyaiktiyo',
    nimi: 'Kyaiktiyo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minkä varassa kallion sanotaan pysyvän paikallaan?',
      'Mitä monin kielen sanat kyaik ja yo tarkoittavat?',
    ],
    korostukset: ['pyhiinvaelluskohde|pyhiinvaelluskohde'],
    nappi: 'Kultainen kallio kielekkeellä',
    // 97.098118 E / 17.481682 N — en-Wikipedia "Kyaiktiyo Pagoda"
    laudat: {
      maailmankartta: { x: 9069.9, y: 2622.9 },
    },
    teksti: 'Kyaiktiyon pagodi on kuuluisa buddhalainen pyhiinvaelluskohde Monin '
      + 'osavaltiossa: vain 7,3 metriä korkea pagodi seisoo graniittilohkareen '
      + 'päällä, joka on kokonaan päällystetty miespuolisten pyhiinvaeltajien '
      + 'kiinnittämillä kultalehdillä. Legendan mukaan kallio pysyy paikallaan '
      + 'Buddhan hiussuortuvan varassa, ja se näyttää olevan alati vierähtämässä '
      + 'alas rinnettä. Toisen tarinan mukaan taivaallinen kuningas kantoi '
      + 'lohkareen paikalleen ja valitsi juuri sen, koska se muistutti erakon '
      + 'päätä. Monin kielessä kyaik tarkoittaa pagodia ja yo erakon päässä '
      + 'kantamista — Kyaik-htiyo on siis pagodi erakon pään päällä. Se on '
      + 'Burman kolmanneksi tärkein buddhalainen pyhiinvaelluskohde.',
    lahde: 'en-Wikipedia "Kyaiktiyo Pagoda", johdanto sekä osiot "Etymology" ja '
      + '"Legend" (tarkistettu 6.9.2026).',
  },
  {
    id: 'pindaya',
    nimi: 'Pindayan luolat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka monta Buddha-kuvaa luolassa on?',
      'Mikä on luolan vanhin päivätty patsas?',
    ],
    korostukset: ['kalkkikiviharjanteella|kalkkikiviharjanteella'],
    nappi: 'Kahdeksantuhatta Buddhaa luolassa',
    // 96.650997 E / 20.925 N — en-Wikipedia "Pindaya Caves"
    laudat: {
      maailmankartta: { x: 9055, y: 2503.9 },
    },
    teksti: 'Pindayan luolat ovat buddhalainen pyhiinvaelluskohde '
      + 'kalkkikiviharjanteella Pindayan kaupungin vieressä Shanin osavaltion '
      + 'Myelatin seudulla, danu-kansan vanhalla kotiseudulla. Harjanteessa on '
      + 'kolme luolaa, joista vain eteläisimpään pääsee: se ulottuu noin 150 '
      + 'metrin syvyyteen ja siellä on yli 8 000 Buddha-kuvaa. Vanhimmissa '
      + 'patsaissa on 1700-luvun lopun tai varhaisen Konbaung-kauden '
      + 'piirtokirjoituksia, ja varhaisin päivätty on vuodelta 1773. Kuvia ovat '
      + 'tuoneet niin maallikot kuin hallitsijatkin läpi luolan historian, ja '
      + 'kokoelma kattaa poikkeuksellisen laajan kirjon tyylejä sekä patsaissa '
      + 'että niitä ympäröivissä valtaistuimissa.',
    lahde: 'en-Wikipedia "Pindaya Caves", johdanto ja osio "Interior" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'pyin-oo-lwin',
    nimi: 'Pyin Oo Lwin',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Millä nimellä kaupunki tunnettiin siirtomaa-aikana?',
      'Miksi sitä kutsutaan kukkien kaupungiksi?',
    ],
    korostukset: ['kesäpääkaupunkina|kesäpääkaupunkina'],
    nappi: 'Vuoristoasema kukkien keskellä',
    // 96.458747 E / 22.03455 N — en-Wikipedia "Pyin Oo Lwin"
    laudat: {
      maailmankartta: { x: 9048.6, y: 2465.1 },
    },
    teksti: 'Pyin Oo Lwin on vuoristokaupunki Mandalayn alueella noin 67 '
      + 'kilometriä Mandalaysta itään, 1 070 metrin korkeudessa. Siirtomaa-ajan '
      + 'nimi Maymyo eli Mayn kaupunki on yhä yleisessä käytössä, ja lempinimi '
      + 'Pan Myodaw tarkoittaa kukkien kaupunkia. Kaupunki toimi brittiläisen '
      + 'Burman kesäpääkaupunkina ja on viileän ylänköilmastonsa ansiosta yhä '
      + 'suosittu lomakohde. Nykyinen nimi on burmalainen kirjoitusasu shanin '
      + 'nimestä Weng Pang U. Paikalla oli alun perin vain parinkymmenen talouden '
      + 'shankylä Lashion ja Mandalayn välisen polun varrella, ja sotilastukikohta '
      + 'perustettiin Ylä-Burman liittämisen jälkeen 1885.',
    lahde: 'en-Wikipedia "Pyin Oo Lwin", johdanto sekä osiot "Etymology" ja '
      + '"Early history and founding" (tarkistettu 6.9.2026).',
  },
  {
    id: 'mawlamyine',
    nimi: 'Mawlamyine',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä kaupunki oli brittiläisen Burman ensimmäinen pääkaupunki?',
      'Mitä monin kielinen nimi Moulmein tarkoittaa?',
    ],
    korostukset: ['Kalyani-piirtokirjoitukset|Kalyani-piirtokirjoituksissa'],
    nappi: 'Brittiläisen Burman ensimmäinen pääkaupunki',
    // 97.625833 E / 16.484722 N — en-Wikipedia "Mawlamyine"
    laudat: {
      maailmankartta: { x: 9087.5, y: 2657.1 },
    },
    teksti: 'Mawlamyine eli entinen Moulmein on Myanmarin neljänneksi suurin '
      + 'kaupunki Thanlwin- eli Salween-joen suulla, 300 kilometriä Yangonista '
      + 'kaakkoon. Se oli vanha kaupunki jo ennen brittejä ja mainitaan kuningas '
      + 'Dhammazedin vuoden 1479 Kalyani-piirtokirjoituksissa yhtenä Martabanin '
      + 'kolmestakymmenestäkahdesta monikaupungista. Mawlamyine oli brittiläisen '
      + 'Burman ensimmäinen pääkaupunki, ja nykyisin se on Monin osavaltion '
      + 'hallintokeskus. Monin kielinen nimi Moulmein tarkoittaa vahingoittunutta '
      + 'silmää tai yksisilmäistä miestä: tarina kertoo monikuninkaasta, jonka '
      + 'otsan keskellä oli kolmas silmä ja joka näki sillä naapurikuningaskuntiin, '
      + 'kunnes hänen vaimonsa tuhosi sen.',
    lahde: 'en-Wikipedia "Mawlamyine", johdanto ja osio "Etymology and legend" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'shwebo',
    nimi: 'Shwebo',
    tyyppi: 'historia',
    kysymykset: [
      'Millä nimellä kylä tunnettiin ennen vuotta 1752?',
      'Miksi pääkaupunki siirrettiin pois 1760?',
    ],
    korostukset: ['Konbaung-dynastian|Konbaung-dynastian'],
    nappi: 'Kylä, josta tuli kuningaskunta',
    // 95.7 E / 22.56667 N — en-Wikipedia "Shwebo"
    laudat: {
      maailmankartta: { x: 9023.3, y: 2446.5 },
    },
    teksti: 'Shwebo on kaupunki Sagaingin alueella Iravadin ja Mun jokien '
      + 'välissä, 110 kilometriä Mandalaysta luoteeseen. Vuoteen 1752 se oli '
      + 'noin kolmensadan talon kylä nimeltä Moksobo, metsästäjäpäällikkö. '
      + 'Helmikuun 29. päivänä 1752 kylän päällikkö Aung Zeya perusti '
      + 'Konbaung-dynastian, otti kuninkaan nimen Alaungpaya, sai 46 '
      + 'naapurikylän tuen ja rakennutti kylän ympärille paaluvarustuksen ja '
      + 'vallihaudan. Hän nimesi kylän uudelleen Shweboksi eli kultaiseksi '
      + 'päälliköksi, ja se toimi pääkaupunkina 1752–1760. Alaungpayan kuoltua '
      + '1760 seuraaja Naungdawgyi siirsi pääkaupungin Sagaingiin lähemmäs '
      + 'Iravadia.',
    lahde: 'en-Wikipedia "Shwebo", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'hkakabo-razi',
    nimi: 'Hkakabo Razi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä vuori haastaa sen korkeimman aseman?',
      'Mitä kasvillisuusvyöhykkeitä rinteillä on?',
    ],
    korostukset: ['jäätiköt|jäätiköitä'],
    nappi: 'Kaakkois-Aasian korkein huippu',
    // 97.535556 E / 28.328333 N — en-Wikipedia "Hkakabo Razi"
    laudat: {
      maailmankartta: { x: 9084.5, y: 2241.6 },
    },
    teksti: 'Hkakabo Razin uskotaan olevan Myanmarin ja koko Kaakkois-Aasian '
      + 'korkein vuori, 5 881 metriä. Se kohoaa Kachinin osavaltiossa Himalajan '
      + 'sivuharjanteella lähellä sitä pistettä, jossa Intian, Kiinan ja Myanmarin '
      + 'rajat kohtaavat. Aseman on viime aikoina haastanut 5 870 metrin Gamlang '
      + 'Razi noin 6,6 kilometrin päässä lounaassa. Rinteillä vaihtuvat '
      + 'vyöhykkeet alhaalta ylös: leveälehtinen trooppinen sademetsä, '
      + 'subtrooppinen vyöhyke, puoliksi lehtensä pudottava metsä ja lopulta '
      + 'havumetsä; yli 4 600 metrissä on pysyvää lunta ja jäätiköitä ja noin '
      + '5 300 metrissä laaja jääkenttä purkautumisjäätikköineen.',
    lahde: 'en-Wikipedia "Hkakabo Razi", johdanto ja osio "Environmental '
      + 'protection" (tarkistettu 6.9.2026).',
  },
  {
    id: 'inlejarvi',
    nimi: 'Inlejärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Kuinka matala järvi on kuivana aikana?',
      'Mitä kotoperäinen laji tarkoittaa?',
    ],
    korostukset: ['kotoperäistä|kotoperäistä'],
    nappi: 'Kelluvien puutarhojen järvi',
    // 96.916667 E / 20.55 N — en-Wikipedia "Inle Lake"
    laudat: {
      maailmankartta: { x: 9063.9, y: 2516.9 },
    },
    teksti: 'Inlejärvi on makean veden järvi Nyaungshwen alueella Shanin '
      + 'osavaltiossa. Se on Myanmarin toiseksi suurin järvi, pinta-alaltaan noin '
      + '116 neliökilometriä, ja myös yksi maan korkeimmalla sijaitsevista: pinta '
      + 'on 880 metrissä. Kuivana aikana vettä on keskimäärin vain runsaat kaksi '
      + 'metriä ja syvimmilläänkin alle neljä, ja sadekaudella pinta nousee '
      + 'puolitoista metriä. Suuria osia järvestä peittävät kelluvat kasvilautat. '
      + 'Kirkkaassa, lievästi emäksisessä vedessä elää yli 35 kalalajia, joista '
      + '17 on kotoperäistä eli ei esiinny missään muualla, ja lisäksi noin 45 '
      + 'kotilolajia. Järvestä tuli Myanmarin ensimmäinen biosfäärialue 2015.',
    lahde: 'en-Wikipedia "Inle Lake", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'chindwin',
    nimi: 'Chindwin',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joet yhtyvät Chindwiniksi?',
      'Mikä Hukawngin laakso on?',
    ],
    korostukset: ['sivujoki|sivujoki'],
    nappi: 'Iravadin suurin sivujoki',
    // 95.281389 E / 21.473889 N — en-Wikipedia "Chindwin River"
    laudat: {
      maailmankartta: { x: 9009.4, y: 2484.7 },
    },
    teksti: 'Chindwin on joki Myanmarissa ja maan pääjoen Iravadin suurin '
      + 'sivujoki. Se saa alkunsa Kachinin osavaltion laajassa Hukawngin '
      + 'laaksossa, jossa Tanai, Tabye, Tawan ja Taron yhtyvät. Tanain latvat '
      + 'ovat Kumonin vuoriston Shwedaunggyi-huipulla, ja joki virtaa ensin '
      + 'suoraan pohjoiseen Hukawngin laaksoon, kääntyy sitten länteen ja saa '
      + 'laaksosta poistuttuaan nimen Chindwin sekä yleisen etelään vievän '
      + 'suunnan. Matkalla se ohittaa Singkaling Hkamtin ja Homalinin kaupungit. '
      + 'Hukawngin laaksoon perustettiin 2004 tiikerien suojelualue, joka '
      + 'laajennettiin 21 800 neliökilometriin — Manner-Kaakkois-Aasian suurin '
      + 'suojelualue.',
    lahde: 'en-Wikipedia "Chindwin River", johdanto sekä osiot "Sources" ja '
      + '"Course" (tarkistettu 6.9.2026).',
  },
];
