/*
 * MAASTOKOHTEET — CHN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHN.json. Työkalu laskee laudan
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
 * Kiinan maastokohteet. Faktat en-Wikipediasta 30.8.2026. HUOM EVEREST: maan korkein kohta on Everestin pohjoisrinne, mutta Nepal on pelin oma maa (asia-countries.js NPL, fokuslehti FOKUS_POHJAT.NPL), joten Everest jätetään Nepalin listalle eikä sitä duplikoida tänne. Vuoreksi valittiin Taishan, pyhistä vuorista tärkein.
 */
export const MAASTOKOHTEET_CHN = [
  {
    id: 'taishan',
    nimi: 'Taishan',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Kiinan viisi pyhää vuorta?',
      'Miksi keisarit nousivat juuri tälle vuorelle?',
    ],
    korostukset: ['Kiinan viisi pyhää vuorta|viidestä pyhästä vuoresta'],
    nappi: 'Vuori, jota on palvottu 3 000 vuotta',
    // 117.1075 E / 36.2558 N — en-Wikipedia "Mount Tai"
    laudat: {
      maailmankartta: { x: 9736.9, y: 1947.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Taishan ei ole Kiinan korkein vuori — sen ylin huippu, Jadekeisarin huippu, jää 1 545 '
      + 'metriin — mutta se voi olla maan tärkein. Se on Kiinan viidestä pyhästä vuoresta '
      + 'itäisin, auringonnousun ja uuden alun vuori, jota on pidetty viidestä ensimmäisenä. '
      + 'Palvontapaikkana se on ollut ainakin kolmetuhatta vuotta, ja pitkiä aikoja se oli koko '
      + 'valtakunnan tärkeimpiä seremoniakeskuksia.',
    lahde: 'en-Wikipedia "Mount Tai", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'etelakiinanmeri',
    nimi: 'Etelä-Kiinan meri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä maat tätä merta reunustavat?',
      'Miksi meri on niin kiistelty?',
    ],
    korostukset: ['Tyynimeri|Tyynenmeren'],
    nappi: 'Meri, jonka kautta maailma käy kauppaa',
    // 112 E / 16 N — ulappa Hainanin kaakkoispuolella; artikkelin oma keskipiste 113 / 12 on kauempana etelässä
    laudat: {
      maailmankartta: { x: 9566.7, y: 2673.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etelä-Kiinan meri on läntisen Tyynenmeren reunameri Kiinan etelärannikon, Indokiinan '
      + 'niemimaan, Taiwanin, Filippiinien ja Borneon välissä — pinta-alaltaan noin 3,5 '
      + 'miljoonaa neliökilometriä. Se on maailman meriliikenteen valtaväyliä: sen kautta '
      + 'kulkee huomattava osa kaikesta maapallon merirahdista, ja pohjasta on löydetty öljyä '
      + 'ja maakaasua.',
    lahde: 'en-Wikipedia "South China Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jangtse',
    nimi: 'Jangtse',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joki saa alkunsa?',
      'Kuinka suuri osa kiinalaisista asuu sen varrella?',
    ],
    korostukset: ['Tiibet|Tiibetin'],
    nappi: 'Kiinan pisin, maailman kolmanneksi',
    // 111.28 E / 30.7 N — keskijuoksu Yichangin ja Kolmen rotkon kohdalla; artikkelin koordinaatti 121,98 / 31,39 on suistossa Shanghain luona
    laudat: {
      maailmankartta: { x: 9542.7, y: 2155.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jangtse eli Chang Jiang, "pitkä joki", on Kiinan pisin ja koko maailman kolmanneksi '
      + 'pisin joki: 6 236 kilometriä Tiibetin ylängön Tanggula-vuorilta itään Itä-Kiinan '
      + 'mereen. Sen valuma-alue kattaa viidenneksen Kiinan pinta-alasta, ja alueella asuu '
      + 'lähes kolmannes maan väestöstä.',
    lahde: 'en-Wikipedia "Yangtze", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'keltainenjoki',
    nimi: 'Keltainenjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joen keltainen väri tulee?',
      'Mikä Ordosin mutka on?',
    ],
    korostukset: ['lössi|lössiylängön'],
    nappi: 'Kiinalaisen sivilisaation kehto',
    // 110 E / 40.5 N — Ordosin mutkan pohjoisreuna Baotoun luona; artikkelin koordinaatti 119,16 / 37,76 on suistossa Bohainmerellä
    laudat: {
      maailmankartta: { x: 9500, y: 1783.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keltainenjoki eli Huanghe on Kiinan toiseksi pisin joki, noin 5 464 kilometriä, ja sen '
      + 'laaksosta muinainen kiinalainen sivilisaatio sai alkunsa. Nimen selittää väri: '
      + 'virratessaan lössiylängön halki joki huuhtoo mukaansa valtavat määrät hienoa keltaista '
      + 'maa-ainesta. Matkallaan Bohainmereen se piirtää pohjoiseen puolentoistatuhannen '
      + 'kilometrin mittaisen Ordosin mutkan.',
    lahde: 'en-Wikipedia "Yellow River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (7) — ERÄ M14, AASIA 4, 6.9.2026 ──────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Kiinalla oli ennen tätä erää neljä maastokohdetta (Taishan,
   * Etelä-Kiinan meri, Jangtse, Keltainenjoki), yksi kohde
   * (Yuanmingyuan, js/packs/fokuskohteet-chn.js) ja eläintäky, mutta ei
   * yhtäkään skandaalia. Maastokiintiö oli siis yli täyden ja vaje
   * kohteissa: tästä erästä tuli seitsemän kohdetta. Yuanmingyuania EI
   * toisteta täällä, ja siksi maan skandaaleiksi valittiin kaksi muuta
   * aihetta (js/packs/skandaalit.js).
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)`; lon/lat on luettu en-Wikipedian
   * coordinates-propista tai — kun prop on tyhjä — artikkelin oman
   * infolaatikon {{coord}}-mallista, ja kumpi kulloinkin, se lukee
   * kohteen koordinaattirivillä. Jokainen piste osuu maan fokuslehden
   * rajaukseen (x 7919,7…10692,8 ja y 907,1…2911,6).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Kiinassa on kuusi pelikaupunkia
   * (Peking, Xi'an, Shanghai, Kanton, Lhasa, Kašgar), joten etäisyys
   * mitattiin erityisen tarkasti jokaiseen js/packs/maailmankartta.js
   * CITIES-kaupunkiin: lähin uusi merkki on Terrakotta-armeija 12,9
   * lautayksikön päässä Xi'anista, ja raja KAUPUNGIN_KOHDALLA_SADE on
   * 7. Suzhoun puutarhat jätettiin pois, koska ne ovat 11,6 yksikön
   * päässä Shanghaista ja nimiö osuisi kaupungin nimen päälle.
   *
   * AASIAN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/spec-asia.md):
   * historia asiallisesti, ei nykypolitiikkaa. Kortit kertovat
   * kohteiden oman historian; Lhasa ja Kašgar ovat pelikaupunkeja
   * eivätkä tämän erän aiheita.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'mutianyu',
    nimi: 'Mutianyu',
    tyyppi: 'historia',
    kysymykset: [
      'Kumpi on vanhempi, Mutianyu vai Badaling?',
      'Ketä muuri suojasi tässä kohdassa?',
    ],
    korostukset: ['Ming-dynastian|Ming-dynastian'],
    nappi: 'Muurin parhaiten säilynyt pätkä',
    // 116.5619 E / 40.4380 N — en-Wikipedia "Mutianyu" (artikkelin oma
    // {{coord}}). Lähin pelikaupunki Peking 21,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9718.7, y: 1785.6 },
    },
    teksti: 'Mutianyu on Kiinan muurin osuus Huairoun piirissä 70 kilometriä Pekingin '
      + 'keskustasta koilliseen; lännessä se jatkuu Jiankouna ja idässä Lianhuachina. Se '
      + 'on muurin parhaiten säilyneitä pätkiä ja vanhempi kuin tunnetumpi Badaling: '
      + 'ensimmäinen muuri rakennettiin tähän 500-luvun puolivälissä Pohjois-Qin aikana. '
      + 'Ming-dynastian aikana kenraali Xu Da valvoi nykyisen muurin rakentamista vanhan '
      + 'päälle, ja 1404 muuriin tehtiin sola. Vuonna 1569 Mutianyun muuri rakennettiin '
      + 'uudelleen, ja siinä asussa se on suurimmaksi osaksi säilynyt. Tehtävä oli suojata '
      + 'pääkaupunkia ja keisarillisia hautoja pohjoisesta. Unescon '
      + 'maailmanperintökohteeksi muuri merkittiin 1987.',
    lahde: 'en-Wikipedia "Mutianyu", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'terrakotta-armeija',
    nimi: 'Terrakotta-armeija',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka armeijan löysi?',
      'Miksi sotilaat ovat eri kokoisia?',
    ],
    korostukset: ['Qin Shi Huang|Qin Shi Huangin'],
    nappi: 'Savisotilaat keisarin haudan vartiossa',
    // 109.2731 E / 34.3850 N — en-Wikipedia "Terracotta Army"
    // (coordinates-prop). Lähin pelikaupunki Xi'an 12,9 lautayksikköä
    // eli yli KAUPUNGIN_KOHDALLA_SADEn (7); koko erän lähin merkki.
    laudat: {
      maailmankartta: { x: 9475.8, y: 2018.6 },
    },
    teksti: 'Terrakotta-armeija on kokoelma poltetusta savesta tehtyjä veistoksia, jotka '
      + 'esittävät Kiinan ensimmäisen keisarin Qin Shi Huangin armeijoita. Ne haudattiin '
      + 'keisarin mausoleumiin vuosina 210–209 eaa. suojelemaan häntä tuonpuoleisessa. '
      + 'Hahmot löysivät paikalliset maanviljelijät vuonna 1974 Lintongin piirikunnassa '
      + 'Xi’anin ulkopuolella. Sotilaiden koko kertoo arvoasteesta: kenraalit ovat '
      + 'pisimpiä. Vuoden 2007 arvion mukaan kolmessa kuopassa on yli 8 000 sotilasta, 130 '
      + 'vaunua, 520 vaunuhevosta ja 150 ratsuhevosta, ja valtaosa niistä on yhä paikallaan. '
      + 'Muista kuopista on löytynyt myös virkamiehiä, akrobaatteja, voimamiehiä ja '
      + 'muusikoita. Haudan rakentaminen alkoi 246 eaa., ja historioitsija Sima Qianin '
      + 'mukaan työhön määrättiin lopulta 700 000 ihmistä.',
    lahde: 'en-Wikipedia "Terracotta Army", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mogaon-luolat',
    nimi: 'Mogaon luolat',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä oli kirjastoluola?',
      'Milloin ensimmäinen luola kaivettiin?',
    ],
    korostukset: ['Silkkitien|Silkkitien'],
    nappi: 'Tuhannen buddhan luolat keitaan laidalla',
    // 94.8042 E / 40.0372 N — en-Wikipedia "Mogao Caves"
    // (coordinates-prop). Lähin pelikaupunki Lhasa 365,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8993.5, y: 1801.4 },
    },
    teksti: 'Mogaon luolat eli tuhannen buddhan luolat muodostavat 500 temppelin '
      + 'järjestelmän 25 kilometriä Dunhuangin keskustasta kaakkoon Gansun maakunnassa. '
      + 'Dunhuang oli Silkkitien keidas ja uskontojen ja kulttuurien risteysasema. '
      + 'Ensimmäiset luolat kaivettiin vuonna 366 jaa. buddhalaisen mietiskelyn ja palvonnan '
      + 'paikoiksi, ja uusia hakattiin 1300-luvulle asti; seinillä on tuhannen vuoden ajalta '
      + 'buddhalaisen taiteen hienoimpia esimerkkejä. Vuonna 1900 löytyi niin sanottu '
      + 'kirjastoluola, joka oli muurattu umpeen 1000-luvulla. Sen käsikirjoitukset '
      + 'hajaantuivat ympäri maailmaa, ja suurimmat kokoelmat ovat nyt Pekingissä, '
      + 'Lontoossa, Pariisissa ja Berliinissä. Kävijämäärää on jouduttu rajoittamaan '
      + 'luolien suojelemiseksi.',
    lahde: 'en-Wikipedia "Mogao Caves", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'zhangjiajie',
    nimi: 'Zhangjiajie',
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi pylväät eivät ole karstia?',
      'Mikä on Bailongin hissi?',
    ],
    korostukset: ['karsti|karstia'],
    nappi: 'Pylväsmetsä, jonka jää ja juuret veistivät',
    // 110.435151 E / 29.3499 N — en-Wikipedia "Zhangjiajie National
    // Forest Park" (artikkelin oma {{coords}}). Lähin pelikaupunki
    // Kanton 90,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9514.5, y: 2204.6 },
    },
    teksti: 'Zhangjiajien kansallinen metsäpuisto Hunanin maakunnassa tunnustettiin 1982 '
      + 'Kiinan ensimmäiseksi kansalliseksi metsäpuistoksi, ja sen pinta-ala on 4 810 '
      + 'hehtaaria. Se on osa laajempaa Wulingyuanin maisema-aluetta, joka pääsi Unescon '
      + 'maailmanperintöluetteloon 1992. Puiston tunnusmerkki ovat pylväsmäiset '
      + 'kalliomuodostumat. Ne muistuttavat karstia, mutta kallio ei ole kalkkikiveä eikä '
      + 'muoto ole syntynyt kemiallisesta liukenemisesta vaan fysikaalisesta rapautumisesta: '
      + 'talvella laajeneva jää ja pylväillä kasvavat kasvit murtavat kiveä, ja purot '
      + 'kuljettavat irronneen aineksen pois. Maisema on tuttu vanhoista kiinalaisista '
      + 'maalauksista. Puiston Bailongin hissi avattiin 2002, ja 326-metrisenä se on '
      + 'maailman korkein ulkohissi.',
    lahde: 'en-Wikipedia "Zhangjiajie National Forest Park", johdanto sekä osiot "History" '
      + 'ja "Structures" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lijiangin-vanhakaupunki',
    nimi: 'Lijiang',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Ketkä ovat nakhit?',
      'Miksi kaupunki jouduttiin rakentamaan uudelleen?',
    ],
    korostukset: ['nakhi|nakhien'],
    nappi: 'Vanhakaupunki, jonka läpi virtaa vesi',
    // 100.2333 E / 26.8667 N — en-Wikipedia "Old Town of Lijiang"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Mandalay
    // 220,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9174.4, y: 2294.2 },
    },
    teksti: 'Dayan, tutummin Lijiangin vanhakaupunki, on Lijiangin historiallinen keskus '
      + 'Yunnanissa ja Unescon maailmanperintökohde. Sen historia ulottuu yli tuhannen '
      + 'vuoden taakse, ja se oli aikanaan vanhan teen ja hevosten karavaanitien '
      + 'solmukohta. Kaupunki tunnetaan järjestelmällisestä vesikanavien ja siltojen '
      + 'verkostostaan. Lijiangin kulttuuri yhdistää nakhien perinnettä ja Ming-kauden '
      + 'kiinalaisten kauppiaiden mukanaan tuomia vaikutteita: nakhit oppivat '
      + 'nanjinglaisilta puun ja savitiilen rakennustavan, ja paikalliset kirvesmiehet '
      + 'pystyttävät yhä koristeelliset runkorakenteet ulkomuistista ilman piirustuksia. '
      + 'Vanhakaupunki merkittiin maailmanperintöluetteloon 4. joulukuuta 1997, pari vuotta '
      + 'sen jälkeen kun raju maanjäristys oli pakottanut rakentamaan suuren osan '
      + 'rakennuksista uudelleen.',
    lahde: 'en-Wikipedia "Old Town of Lijiang", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'leshanin-buddha',
    nimi: 'Leshanin Buddha',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi patsas veistettiin juuri tähän?',
      'Kuinka kauan työ kesti?',
    ],
    korostukset: ['Maitreya|Maitreya-buddha'],
    nappi: 'Maailman suurin kivinen buddha',
    // 103.7733 E / 29.5447 N — en-Wikipedia "Leshan Giant Buddha"
    // (coordinates-prop). Lähin pelikaupunki Xi'an 245,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9292.4, y: 2197.5 },
    },
    teksti: 'Leshanin Buddha on 71 metriä korkea kivipatsas, joka veistettiin Tang-'
      + 'dynastian aikana vuosina 712–804 liitukauden punaiseen hiekkakiveen. Se on Min- '
      + 'ja Dadujokien yhtymäkohdassa Etelä-Sichuanissa lähellä Leshanin kaupunkia, ja se '
      + 'katsoo kohti Emei-vuorta jokien virratessa jalkojensa juuressa. Se on maailman '
      + 'suurin ja korkein kivinen buddhapatsas ja ylivoimaisesti korkein esimoderni '
      + 'patsas. Työ alkoi 722 munkki Hai Tongin johdolla: hän uskoi, että Maitreya-buddha '
      + 'tyynnyttäisi vaaralliset virrat, jotka vaivasivat jokea kulkevia laivoja. Kun '
      + 'rahoitus uhkasi loppua, hänen kerrotaan puhkaisseen omat silmänsä osoittaakseen '
      + 'vilpittömyytensä. Patsas valmistui vasta 803, kun Hai Tongin oppilaat saivat '
      + 'sotilaskuvernööri Wei Gaolta uutta rahoitusta.',
    lahde: 'en-Wikipedia "Leshan Giant Buddha", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'pingyao',
    nimi: 'Pingyao',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi Pingyao oli rikas?',
      'Mikä Rishengchang oli?',
    ],
    korostukset: ['hopeakauppa|hopeakaupasta'],
    nappi: 'Muurikaupunki, joka hoiti Kiinan rahat',
    // 112.15 E / 37.2 N — en-Wikipedia "Pingyao" (coordinates-prop).
    // Lähin pelikaupunki Xi'an 154,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 9571.7, y: 1911.7 },
    },
    teksti: 'Pingyao on muurien ympäröimä kaupunki Keski-Shanxissa, ja se tunnetaan sekä '
      + 'asemastaan Kiinan taloushistoriassa että hyvin säilyneestä Ming- ja Qing-kauden '
      + 'kaupunkirakenteestaan. Se on Kiinan ainoa muurikaupunki, jossa sekä vanha '
      + 'katuverkko että alkuperäinen rakennuskanta ovat pääosin tallella: pihatalot, '
      + 'puotirakennukset ja temppelit ovat vanhoja rakennuksia paikallaan eivätkä uusia '
      + 'jäljennöksiä. Kaupunki oli 1500-luvulta alkaen alueensa ja 1800-luvun lopulla koko '
      + 'Qing-valtakunnan rahoituskeskus: muurien sisällä toimi yli 20 rahalaitosta, yli '
      + 'puolet koko maan pankeista. Ensimmäinen ja suurin niistä oli Rishengchang, joka '
      + 'hallitsi lähes puolta Kiinan hopeakaupasta ja meni konkurssiin 1914. '
      + 'Maailmanperintökohde Pingyaosta tuli 1997.',
    lahde: 'en-Wikipedia "Pingyao", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
