/*
 * MAASTOKOHTEET — DNK. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs DNK --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/DNK.json. Työkalu laskee laudan
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
 * Tanskan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Tanska oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja yksitoista
 * karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md). Tavoite on
 * kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat — sama
 * malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-dnk.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin
 * (Frederiksborgin linna) on 14,0 lautayksikön päässä Kööpenhaminasta,
 * eli reilusti yli kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE
 * 7, js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti kantaa
 * tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto olisi
 * huonompi kuin kuvaton kortti (Perustuslaki, faktakuri). Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_DNK = [
  {
    id: 'mllehj',
    nimi: 'Møllehøj',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten näin matala kumpu voi olla maan korkein?',
      'Mikä on Grönlannin korkein vuori?',
    ],
    korostukset: ['Jyllanti|Jyllannin'],
    nappi: 'Tanskan katto — 170,86 metriä',
    // 9.8262 E / 55.9772 N — en-Wikipedia "Møllehøj"
    laudat: {
      maailmankartta: { x: 6160.9, y: 1120.2 },
      europe: { x: 399.9, y: 421.4 },
    },
    teksti: 'Møllehøj on emämaan Tanskan korkein luonnollinen kohta: 170,86 metriä merenpinnasta. '
      + 'Se kohoaa Jyllannin sisämaan viljelysmaisemassa, eikä maassa ole yhtään vuorta — koko '
      + 'Tanska on jääkauden jälkeensä jättämää alavaa moreenimaata. Tanskan kuningaskunnan '
      + 'korkein kohta on aivan muualla, Grönlannin jäätiköiden keskellä.',
    lahde: 'en-Wikipedia "Møllehøj", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Vattimeri on?',
      'Miksi Jyllannin länsirannikko on niin suora?',
    ],
    nappi: 'Jyllannin läntinen meri',
    // 7.4 E / 56.2 N — ulappa Jyllannin länsirannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 6080, y: 1109.7 },
      europe: { x: 353.3, y: 415.5 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Tanska on ainoa maa, jonka rannat ovat '
      + 'sekä tällä merellä että Itämerellä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Mitkä salmet yhdistävät Itämeren Pohjanmereen?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 12.6 E / 54.9 N — ulappa Tanskan saarten eteläpuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6253.3, y: 1170.4 },
      europe: { x: 453.1, y: 449.7 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Suolaisen veden ovi on Tanskan: '
      + 'Juutinrauma, Iso-Belt ja Vähä-Belt ovat meren ainoa yhteys Pohjanmerelle, ja niiden '
      + 'matalat kynnykset päästävät suolavettä sisään vain harvakseltaan. Siksi juuri ne ovat '
      + 'aina olleet Itämeren avain.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Definitions" ja "Subdivisions"; laivan osalta "Vasa (ship)", johdanto-osa '
      + '(tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'roskilden-tuomiokirkko',
    nimi: 'Roskilden tuomiokirkko',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kirkossa on niin monta erityylistä kappelia?',
      'Kuka teki Roskildesta pääkaupungin?',
    ],
    korostukset: ['tiiligotiikka|tiiligotiikan'],
    nappi: 'Kuninkaiden hautakirkko',
    // 12.08 E / 55.6428 N — en-Wikipedia "Roskilde Cathedral"
    laudat: {
      maailmankartta: { x: 6236, y: 1135.9 },
      europe: { x: 443.1, y: 430.2 },
    },
    teksti: 'Roskilden tuomiokirkko on Tanskan kirkon katedraali Roskildessa Sjællandin '
      + 'saarella ja Tanskan hallitsijoiden virallinen hautakirkko.\n\n'
      + 'Kirkko rakennettiin 1100- ja 1200-luvuilla, ja siinä on sekä goottilaisia että '
      + 'romaanisia piirteitä. Se on Skandinavian varhaisimpia tiilestä rakennettuja '
      + 'goottilaisia katedraaleja ja levitti tiiligotiikan tyylin Pohjois-Eurooppaan. '
      + 'Maailmanperintökohteeksi se otettiin 1995 kahdesta syystä: rakennus näyttää '
      + 'kahdeksansataa vuotta eurooppalaisia tyylikausia, ja se oli tiiligotiikan '
      + 'varhainen esikuva.\n\n'
      + 'Hallitsijoiden päähautapaikka kirkko on ollut 1400-luvulta lähtien, ja siksi '
      + 'sitä on laajennettu ja muutettu vuosisatojen ajan hautakappeleita varten — '
      + 'kukin lisätty kappeli on oman aikansa tyyliä.\n\n'
      + 'Roskildesta tuli Tanskan pääkaupunki noin vuonna 960, kun Harald Sinihammas '
      + 'siirtyi sinne Jellingistä ja rakennutti kuninkaankartanon ja sen viereen pienen '
      + 'sauvakirkon. Kun hän kuoli 985 tai 986, hänet haudattiin rakentamaansa kirkkoon.',
    lahde: 'en-Wikipedia "Roskilde Cathedral", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kronborg',
    nimi: 'Kronborg',
    tyyppi: 'sana',
    kysymykset: [
      'Millä nimellä Shakespeare kutsui linnaa?',
      'Mikä Juutinrauman tulli oli?',
    ],
    korostukset: ['Elsinore|Elsinoreksi'],
    nappi: 'Hamletin linna salmen kapeimmalla kohdalla',
    // 12.6219 E / 56.0386 N — en-Wikipedia "Kronborg"
    laudat: {
      maailmankartta: { x: 6254.1, y: 1117.3 },
      europe: { x: 453.5, y: 419.8 },
    },
    teksti: 'Kronborg on linna ja linnoitus Helsingørin kaupungissa. William Shakespeare '
      + 'nimesi sen Hamletissa Elsinoreksi, ja se on Pohjois-Euroopan merkittävimpiä '
      + 'renessanssilinnoja.\n\n'
      + 'Linna seisoo Sjællandin koillisimmassa kärjessä Juutinrauman kapeimmalla '
      + 'kohdalla, jossa salmi on vain neljä kilometriä leveä. Siitä sen strateginen '
      + 'merkitys: paikka hallitsee yhtä harvoista uloskäynneistä Itämereltä.\n\n'
      + 'Tarina alkaa Krogen-nimisestä linnoituksesta, jonka Eerik Pommerilainen '
      + 'rakennutti 1420-luvulla. Kuningas vaati Juutinrauman tullia jokaiselta laivalta, '
      + 'joka halusi salmen kautta Itämerelle tai sieltä pois, ja linnoitus salmen '
      + 'kapeimmassa kohdassa oli keino periä maksu. Vuosina 1574–1585 Frederik II '
      + 'muutatti keskiaikaisen linnoituksen renessanssilinnaksi.\n\n'
      + 'Tulipalo tuhosi suuren osan linnasta 1629, ja Christian IV rakennutti sen '
      + 'uudelleen. Vuonna 1658 ruotsalaiset piirittivät ja valtasivat Kronborgin ja '
      + 'veivät sen taideaarteita sotasaaliina. Maailmanperintöluetteloon linna '
      + 'merkittiin vuonna 2000.',
    lahde: 'en-Wikipedia "Kronborg", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jellingin-kivet',
    nimi: 'Jellingin kivet',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kiviä sanotaan Tanskan kastetodistukseksi?',
      'Mistä langattoman Bluetoothin nimi tulee?',
    ],
    korostukset: ['Bluetooth|Bluetooth'],
    nappi: 'Tanskan nimi kirjoitettuna kiveen',
    // 9.4194 E / 55.7567 N — en-Wikipedia "Jelling stones"
    laudat: {
      maailmankartta: { x: 6147.3, y: 1130.5 },
      europe: { x: 392.1, y: 427.2 },
    },
    teksti: 'Jellingin kivet ovat kaksi järeää 900-luvun riimukiveä Jellingin kylässä. '
      + 'Vanhemman pystytti kuningas Gorm Vanha vaimonsa Thyran muistoksi. Suuremman '
      + 'pystytti Gormin poika Harald Sinihammas vanhempiensa muistoksi ja juhli siinä '
      + 'samalla Tanskan ja Norjan valloitustaan sekä tanskalaisten kääntymistä '
      + 'kristinuskoon.\n\n'
      + 'Kivet liitetään vahvasti Tanskan syntyyn kuningaskuntana: molemmissa '
      + 'kirjoituksissa esiintyy nimi Danmark. Suuremmassa kivessä mainitaan '
      + 'nimenomaisesti kääntyminen pakanuudesta ja siinä on kuva ristiinnaulitusta '
      + 'Kristuksesta, ja siksi sitä on kansanomaisesti kutsuttu Tanskan '
      + 'kastetodistukseksi — nimityksen keksi taidehistorioitsija Rudolf '
      + 'Broby-Johansen 1930-luvulla.\n\n'
      + 'Vuonna 1994 kivet sekä lähellä olevat hautakummut ja pieni kirkko liitettiin '
      + 'maailmanperintöluetteloon vertaansa vailla olevana esimerkkinä sekä pakanallisesta '
      + 'että kristillisestä pohjoismaisesta kulttuurista. Vuonna 1997 valokuva tästä '
      + 'kivestä antoi nimen langattomalle Bluetooth-tekniikalle.\n\n'
      + 'Tuhat vuotta säässä oli jättänyt jälkensä, ja kiviin alkoi ilmestyä halkeamia. '
      + 'Nyt ne seisovat paikoillaan lasikoteloissa, joissa ilmastointi pitää lämpötilan '
      + 'ja kosteuden vakiona.',
    lahde: 'en-Wikipedia "Jelling stones", johdanto-osa sekä osiot "Significance" ja '
      + '"Recent history" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ribe',
    nimi: 'Ribe',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka vanha Ribe on?',
      'Mikä Burchardin tulva oli?',
    ],
    korostukset: ['sceatta|sceatta-rahasta'],
    nappi: 'Tanskan vanhin kaupunki',
    // 8.7622 E / 55.3283 N — en-Wikipedia "Ribe"
    laudat: {
      maailmankartta: { x: 6125.4, y: 1150.5 },
      europe: { x: 379.4, y: 438.5 },
    },
    teksti: 'Ribe on kaupunki Lounais-Jyllannissa ja Tanskan vanhin kaupunki. Asukkaita on '
      + 'reilut kahdeksantuhatta.\n\n'
      + 'Kauppa kävi täällä jo 700-luvun alussa, ja rahaa saatettiin lyödä Ribessä jo '
      + 'vuonna 720. Yli kolmestasadasta Tanskasta löytyneestä sceatta-rahasta 216 on '
      + 'löydetty Ribestä tai sen ympäriltä. Kauppasuhteet kulkivat etenkin Friisinmaalle '
      + 'ja Englantiin.\n\n'
      + 'Kun arkkipiispa Ansgar lähti käännyttämään Skandinaviaa, hän pyysi noin vuonna 860 '
      + 'kuningas Horik II:lta luvan rakentaa Skandinavian ensimmäisen kirkon juuri Ribeen. '
      + 'Piispa — ja siis katedraali — voidaan varmuudella osoittaa vasta vuodesta 948. '
      + 'Kaivauksissa on kuitenkin löydetty 2 000–3 000 kristittyä hautaa 800-luvulta, mikä '
      + 'kertoo suuresta kristityistä yhteisöstä, joka eli viikinkien rinnalla rauhassa.\n\n'
      + 'Kaupunki on matalalla merenrantaniityllä, ja myrskytulvat ovat iskeneet siihen '
      + 'toistuvasti. Tuhoisin oli Burchardin tulva vuonna 1634; sen jäljet näkyvät yhä '
      + 'katedraalin seinissä, ja korkeus on merkitty kaupungin tulvapatsaaseen.',
    lahde: 'en-Wikipedia "Ribe", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'trelleborg-slagelse',
    nimi: 'Trelleborg',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnoitus on täsmälleen ympyrä?',
      'Kuka linnoituksen rakennutti?',
    ],
    korostukset: ['rengaslinnoitus|rengaslinnoituksista'],
    nappi: 'Viikinkien ympyrälinnoitus',
    // 11.2653 E / 55.3942 N — en-Wikipedia "Trelleborg (Slagelse)"
    laudat: {
      maailmankartta: { x: 6208.8, y: 1147.5 },
      europe: { x: 427.5, y: 436.7 },
    },
    teksti: 'Trelleborg Slagelsen länsipuolella Sjællandissa on yksi seitsemästä tunnetusta '
      + 'viikinkiaikaisesta rengaslinnoituksesta. Rakennusaikanaan se seisoi niemellä, joka '
      + 'työntyi kahden joen väliseen soiseen maastoon; suo oli järven kautta yhteydessä '
      + 'Isoonbelttiin, ja viikinkilaivat pääsivät sinne.\n\n'
      + 'Linnoituksen uskotaan syntyneen Harald Sinihampaan käskystä vuonna 980, ja se on '
      + 'saattanut valvoa Isonbeltin laivaliikennettä Sjællandin ja Fynin välissä.\n\n'
      + 'Muoto on täsmällinen ympyrä. Kaksi tietä risteää suorassa kulmassa keskipisteessä '
      + 'ja johtaa neljälle portille, jotka ovat aina kaksittain vastakkain. Kussakin '
      + 'neljänneksessä seisoi neljä lähes samanlaista pitkätaloa neliönä. Valli oli viisi '
      + 'metriä korkea ja perustaltaan 17,5 metriä leveä, ja ympyrän halkaisija oli 137 '
      + 'metriä. Koko linnoituksessa saattoi olla tilaa noin 1 300 ihmiselle.\n\n'
      + 'Trelleborg on parhaiten säilynyt rengaslinnoituksista. Vuonna 2023 se liitettiin '
      + 'neljän muun tanskalaisen rengaslinnoituksen kanssa maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "Trelleborg (Slagelse)", johdanto-osa sekä osiot "Layout and '
      + 'construction" ja "Main castle" (tarkistettu 6.9.2026).',
  },
  {
    id: 'skagen',
    nimi: 'Skagen',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä hautasi vanhan kirkon?',
      'Keitä Skagenin maalarit olivat?',
    ],
    korostukset: ['Skagenin maalarit|Skagenin maalareina'],
    nappi: 'Valo, joka veti maalarit pohjoiseen',
    // 10.5833 E / 57.7167 N — en-Wikipedia "Skagen"
    laudat: {
      maailmankartta: { x: 6186.1, y: 1037.5 },
      europe: { x: 414.4, y: 375.7 },
    },
    teksti: 'Skagen on Tanskan pohjoisin kaupunki Jyllannin pohjoiskärjessä. Sen satama on '
      + 'maan tärkein kalasatama, ja kaupungissa käy noin kaksi miljoonaa matkailijaa '
      + 'vuodessa.\n\n'
      + 'Asutus alkoi keskiajalla kalastajakylänä, joka tunnettiin sillistään. '
      + '1800-luvun lopulla merimaisemat, kalastajat ja iltavalo houkuttelivat paikalle '
      + 'ryhmän impressionisteja, jotka tunnetaan nyt Skagenin maalareina. Monet kaupungin '
      + 'tunnetuista rakennuksista liittyvät heihin: Brøndumin hotelli, Skagenin museo sekä '
      + 'Michael ja Anna Ancherin talo.\n\n'
      + 'Pyhän Laurentiuksen kirkko rakennettiin kylän laitaan 1300-luvun lopulla, mutta '
      + 'lentohiekka hautasi sen. Tilalle rakennettiin uusi Skagenin kirkko vuonna 1841.\n\n'
      + 'Matkailu alkoi kasvaa, kun kapearaiteinen rautatie avattiin 1890 ja nykyinen satama '
      + '20. marraskuuta 1907. Skagenin asema on Tanskan pohjoisin rautatieasema.',
    lahde: 'en-Wikipedia "Skagen", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'frederiksborgin-linna',
    nimi: 'Frederiksborgin linna',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka maksoi linnan kunnostuksen tulipalon jälkeen?',
      'Mistä linnan nimi tulee?',
    ],
    korostukset: ['J. C. Jacobsen|J. C. Jacobsenin'],
    nappi: 'Panimon rahoilla pelastettu linna',
    // 12.3012 E / 55.935 N — en-Wikipedia "Frederiksborg Castle"
    laudat: {
      maailmankartta: { x: 6243.4, y: 1122.2 },
      europe: { x: 447.4, y: 422.5 },
    },
    teksti: 'Frederiksborgin linna Hillerødissä rakennettiin 1600-luvun alussa Tanskan ja '
      + 'Norjan kuninkaan Christian IV:n asunnoksi, ja siitä tuli Skandinavian suurin '
      + 'renessanssiasunto. Se seisoo kolmella pikkusaarella linnajärvessä, ja sen vieressä '
      + 'on laaja barokkityylinen puutarha.\n\n'
      + 'Nimi on Christianin edeltäjän. Frederik II hankki Hillerødsholmin kartanon '
      + 'vaihtokaupalla vuonna 1550, laajennutti liian pientä rakennusta vuodesta 1560 ja '
      + 'nimesi tilan sitten uudelleen Frederiksborgiksi.\n\n'
      + 'Vuonna 1859 vakava tulipalo tuhosi linnan. Se rakennettiin uudelleen vanhojen '
      + 'piirustusten ja maalausten pohjalta, ja yleisön tuen sekä panimomies J. C. '
      + 'Jacobsenin rahojen turvin huoneistot kunnostettiin täysin.\n\n'
      + 'Linna avattiin yleisölle Tanskan kansallishistoriallisena museona vuonna 1882. '
      + 'Museossa on Tanskan suurin muotokuvakokoelma, ja tulipalolta säästyneet kappeli ja '
      + 'audienssisali ovat yhä alkuperäisine koristeluineen.',
    lahde: 'en-Wikipedia "Frederiksborg Castle", johdanto-osa ja osio "Origins" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'storebaeltin-silta',
    nimi: 'Storebæltin silta',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka kauan salmen ylitys kesti ennen siltaa?',
      'Mikä Sprogø on?',
    ],
    korostukset: ['Sprogø|Sprogø'],
    nappi: 'Kymmenen minuuttia tunnin sijaan',
    // 10.9667 E / 55.3333 N — en-Wikipedia "Great Belt Bridge"
    laudat: {
      maailmankartta: { x: 6198.9, y: 1150.3 },
      europe: { x: 421.8, y: 438.3 },
    },
    teksti: 'Storebæltin kiinteä yhteys ylittää Isonbeltin salmen Sjællandin ja Fynin '
      + 'välissä. Se on kahdeksantoista kilometriä pitkä kokonaisuus, jossa on '
      + 'riippusilta autoille ja rautatietunneli Sjællandin ja pienen Sprogøn saaren '
      + 'välillä sekä palkkisilta autoille ja junille Sprogøstä Fyniin.\n\n'
      + 'Riippusillan päävälin pituus on 1,6 kilometriä, maailman seitsemänneksi pisin. '
      + 'Yhdessä Öresundin ja Pikkubeltin siltojen kanssa yhteys tekee mahdolliseksi ajaa '
      + 'Manner-Euroopasta Ruotsiin Tanskan kautta.\n\n'
      + 'Kiinteästä yhteydestä ehdittiin väitellä yli viisikymmentä vuotta; ensimmäiset '
      + 'siltaluonnokset ovat 1850-luvulta ja valtionrautateiden suunnitelma vuodelta 1934. '
      + 'Tanskan hallitus päätti rakentaa yhteyden 1986, junaliikenne alkoi 1997 ja '
      + 'autoliikenne 1998. Hanke on Tanskan historian suurin rakennusurakka.\n\n'
      + 'Ennen siltaa lautta vei salmen yli tunnin. Nyt ylitys kestää kymmenen minuuttia.',
    lahde: 'en-Wikipedia "Great Belt Bridge", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — VIISI KOHDETTA LISÄÄ. Omistaja 11.9.2026:
   * *"Agentit voisivat tarkastaa myös muut Euroopan maat että
   * kaikissa tarpeeksi nostoja."* Päätoimittajan mitta on vähintään
   * 20 pääkartan nostoa per Euroopan maa; Tanska oli 15:ssä.
   *
   * Kaikki viisi ovat kaukana Kööpenhaminan laatasta (lähinkin Møns
   * Klint 33 lautayksikköä, KAUPUNKIKATON_SADE on 8), joten yksikään
   * ei kuulu kohdekartalle vaan kaikki ovat pääkartan merkkejä.
   * Kuvaton erä kuten muutkin maastokohteet. Faktat en-Wikipediasta
   * kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'tollundin-mies',
    nimi: 'Tollundin mies',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi löytäjät luulivat ruumista tuoreeksi murhan uhriksi?',
      'Mitä suo säilytti ja mitä se liuotti?',
    ],
    korostukset: ['suoruumis|suoruumis'],
    nappi: 'Rautakauden kasvot turpeen alta',
    // 9.3936 E / 56.1683 N — Bjældskovdalin suo Silkeborgista länteen;
    // en-Wikipedia "Tollund Man"
    laudat: {
      maailmankartta: { x: 6146.5, y: 1111.2 },
    },
    teksti: 'Turpeennostajat Viggo ja Emil Højgaard löysivät 8. toukokuuta 1950 '
      + 'ruumiin turvekuopasta kaksitoista kilometriä Silkeborgista länteen; '
      + 'ensimmäisenä sen huomasi Viggon vaimo Grethe Højgaard. Mies oli '
      + 'säilynyt niin hyvin, että perhe luuli löytäneensä tuoreen murhan uhrin '
      + 'ja soitti poliisille.\n\n'
      + 'Poliisi kutsui paikalle Aarhusin yliopiston arkeologin Peter Vilhelm '
      + 'Globin, joka arvioi ruumiin noin kahdentuhannen vuoden ikäiseksi. '
      + 'Radiohiiliajoitus tarkensi kuolinajan vuosien 405 ja 380 eaa. väliin, '
      + 'esiroomalaiselle rautakaudelle, ja iäksi arvioitiin noin neljäkymmentä '
      + 'vuotta. Kaulassa oli tiukalla punottu nahkasilmukka, ja kuolinsyyksi on '
      + 'oikeuslääketieteellisesti todettu hirttäminen. Oliko kyseessä uhri vai '
      + 'rangaistus, ei tiedetä — todisteet eivät riitä kumpaankaan.\n\n'
      + 'Suon hapan ja hapeton vesi liuotti suuren osan luustosta mutta säilytti '
      + 'pehmytkudokset: sydämen, keuhkot ja maksan. Silmät ja suu olivat '
      + 'rauhallisesti kiinni, ja ihon rypyt, ripset ja päivän sänki olivat '
      + 'tallella. Hiukset oli leikattu niin lyhyiksi, että lampaannahkalakki '
      + 'peitti ne lähes kokonaan. Vuonna 1976, kaksikymmentäkuusi vuotta '
      + 'löydön jälkeen, Tanskan poliisi sai säilötystä peukalosta '
      + 'käyttökelpoisen sormenjäljen.\n\n'
      + 'Vatsan ja suoliston sisällöstä pääteltiin, että mies oli syönyt 12–24 '
      + 'tuntia ennen kuolemaansa. Strontiumanalyysi reisiluusta ja hiuksista '
      + 'kertoo, että hän pysyi viimeisen vuotensa nykyisen Tanskan alueella. '
      + 'Kaksitoista vuotta ennen häntä samasta suosta oli löytynyt toinen '
      + 'suoruumis, Ellingin nainen.',
    lahde: 'en-Wikipedia "Tollund Man", johdanto-osa sekä osiot "Discovery", '
      + '"Condition" ja "Scientific study" (tarkistettu 11.9.2026).',
  },
  {
    id: 'egeskov',
    nimi: 'Egeskovin linna',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi 1500-luvun aateliset linnoittivat kotinsa?',
      'Mistä linnan nimi kertoo?',
    ],
    korostukset: ['nostosilta|nostosilta'],
    nappi: 'Vesilinna tammipaalujen varassa',
    // 10.4708 E / 55.1758 N — en-Wikipedia "Egeskov Castle"
    laudat: {
      maailmankartta: { x: 6182.4, y: 1157.6 },
    },
    teksti: 'Egeskov seisoo Kværndrupin lähellä Fynin saaren eteläosassa, ja se on '
      + 'Tanskan parhaiten säilynyt renessanssin vesilinna. Paikka mainitaan '
      + 'ensimmäisen kerran 1405, ja nykyisen rakennuksen pystytti Frands '
      + 'Brockenhuus 1554.\n\n'
      + 'Rakennusaika selittää muodon. Kreivin kapina, yleinen levottomuus ja '
      + 'uskonpuhdistukseen johtanut sisällissota saivat useimmat Tanskan '
      + 'aateliset linnoittamaan kotinsa. Egeskov nousi tammipaalujen varaan '
      + 'pieneen järveen, jonka suurin syvyys on viisi metriä, ja alun perin '
      + 'sinne pääsi vain nostosilta laskettuna.\n\n'
      + 'Linna on kaksi pitkää rakennusta, jotka yhdistää yli metrin paksuinen '
      + 'kaksoismuuri. Muurin sisällä on salaportaita ja kaivo, ja ajatus oli, '
      + 'että puolustajat voivat luopua toisesta talosta ja jatkaa taistelua '
      + 'toisesta. Kahdesta pyöreästä kulmatornista pystyi ampumaan hyökkääjää '
      + 'sivusta, ja keskiaikaista puolustusta ovat myös tykkiaukot, '
      + 'kaatoreiät ja nuoliraot. Ulkoa talo on myöhäisgotiikkaa, sisältä jo '
      + 'renessanssia.\n\n'
      + 'Legendan mukaan perustuksiin kului kokonainen tammimetsä — siitä nimi '
      + 'Egeskov, tammimetsä. Bille-Brahen suku osti kartanon 1784 Brockenhuusin '
      + 'suvun jälkeläisiltä, ja 1882 se siirtyi perintönä '
      + 'Ahlefeldt-Laurvig-Bille-kreiveille, joiden hallussa se on yhä.',
    lahde: 'en-Wikipedia "Egeskov Castle", johdanto-osa sekä osiot "History" ja '
      + '"Castle architecture" (tarkistettu 11.9.2026).',
  },
  {
    id: 'mons-klint',
    nimi: 'Møns Klint',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka korkealle jyrkänne nousee merestä?',
      'Milloin kalliot pääsivät maailmanperintöluetteloon?',
    ],
    korostukset: ['liitu|liitu'],
    nappi: 'Kuuden kilometrin liitujyrkänne',
    // 12.5486 E / 54.9711 N — en-Wikipedia "Møns Klint"
    laudat: {
      maailmankartta: { x: 6251.6, y: 1167.1 },
    },
    teksti: 'Møns Klint on kuuden kilometrin mittainen liitu- ja kalkkikivijyrkänne '
      + 'Mønin saaren itärannikolla Itämeren äärellä. Osa kallioista putoaa '
      + 'suoraan sata kaksikymmentä metriä mereen. Korkein niistä on '
      + 'Dronningestolen, joka kohoaa 128 metriä merenpinnan yläpuolelle.\n\n'
      + 'Jyrkänteen takana on metsää, laitumia, lampia ja jyrkkiä kukkuloita. '
      + 'Yksi niistä on Aborrebjerg, joka 142 metrillään on Tanskan korkeimpia '
      + 'kohtia. Kalliot ja niiden viereinen puistoalue on suojeltu '
      + 'luonnonsuojelualueena.\n\n'
      + 'Kävijöitä on noin 250 000 vuodessa. Alueella on selvästi merkityt '
      + 'reitit kävelijöille, ratsastajille ja pyöräilijöille, ja jyrkänteen '
      + 'harjaa myötäilevältä polulta pääsee useassa kohdassa portaita alas '
      + 'rantaan. Kallionreunan tuntumassa avattiin 29. toukokuuta 2007 '
      + 'GeoCenter Møns Klint, jonka piirsi kansainvälisen suunnittelukilpailun '
      + 'voittanut arkkitehtitoimisto PLH Architects ja jonka avasi kuningatar '
      + 'Margareeta.\n\n'
      + 'Unescon maailmanperintöluetteloon Møns Klint hyväksyttiin 13. heinäkuuta '
      + '2025.',
    lahde: 'en-Wikipedia "Møns Klint", johdanto-osa (tarkistettu 11.9.2026).',
  },
  {
    id: 'lindholm-hoje',
    nimi: 'Lindholm Høje',
    tyyppi: 'sana',
    kysymykset: [
      'Mitä haudan kiviladelman muoto kertoi vainajasta?',
      'Miksi kylä hylättiin noin vuonna 1200?',
    ],
    korostukset: ['kivilaiva|kivilaiva'],
    nappi: 'Seitsemänsataa hautaa Limfjordin yllä',
    // 9.9127 E / 57.0794 N — en-Wikipedia "Lindholm Høje"
    laudat: {
      maailmankartta: { x: 6163.8, y: 1068.0 },
    },
    teksti: 'Lindholm Høje on viikinkiaikainen hautausmaa ja entinen asuinpaikka '
      + 'Aalborgin pohjoispuolella, kaupungin yllä kohoavalla kummulla. '
      + 'Eteläinen, alempi osa on ajalta 1000–1050 jaa., mutta pohjoinen ja '
      + 'ylempi osa on paljon vanhempi: se ulottuu 400-luvulle pohjoismaiseen '
      + 'rautakauteen. Ensimmäinen suuri kaivaus alkoi 1952 ja kattoi lopulta '
      + '589 hautaa noin seitsemästäsadasta; pieniä kaivauksia oli tehty jo '
      + '1889. Kiviä oli viety vuosisatojen ajan, ja 1800-luvulla niitä '
      + 'rikottiin tienrakennukseen.\n\n'
      + 'Kylä sijaitsi tärkeässä paikassa: Limfjordin, Jyllannin poikki '
      + 'kulkevan vesireitin, ylityskohdassa. Viikinkiaikana salmen yli pääsi '
      + 'vain tästä tai paljon lännempää Aggersundista, koska rantoja reunusti '
      + 'suo. Asutus hylättiin noin vuonna 1200, luultavasti siksi, että '
      + 'länsirannikon hiekka lähti liikkeelle laajojen metsänhakkuiden '
      + 'jälkeen ja tuuli kantoi sen sisämaahan. Sama hiekka peitti paikan ja '
      + 'säilytti sen.\n\n'
      + 'Sijainti ja kulkuyhteydet tekivät kylästä kauppapaikan: haudoista on '
      + 'löytynyt lasia, jalokiviä ja arabialaisia hopearahoja. Enimmäkseen '
      + 'vainajat poltettiin, mutta osa haudattiin, ja tapa vaihteli kausittain. '
      + 'Useimmat haudat on merkitty kivillä kolmioksi tai laivan muotoon. '
      + 'Tällainen kivilaiva kertoi veden merkityksestä, ja ladelman koko '
      + 'ilmeisesti vainajan asemasta. Lindholm Højen laivalatomukset ovat '
      + 'suurin säilynyt kokoelma lajissaan. Vuonna 1992 paikan viereen avattiin '
      + 'museo, jota laajennettiin 2008.',
    lahde: 'en-Wikipedia "Lindholm Høje", johdanto-osa ja osio "About the area" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'billund',
    nimi: 'Billund',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mistä sanasta nimi Lego tulee?',
      'Miksi pikkukylään rakennettiin lentokenttä?',
    ],
    korostukset: ['leg godt|leg godt'],
    nappi: 'Kylä, josta tuli maailman suurin lelutehdas',
    // 9.1167 E / 55.7333 N — en-Wikipedia "The Lego Group", "Lego"
    laudat: {
      maailmankartta: { x: 6137.2, y: 1131.6 },
    },
    teksti: 'Puuseppä Ole Kirk Christiansen perusti yrityksensä Billundissa 1932, '
      + 'kun lama oli vienyt taloustavaroiden valmistukselta pohjan. Aluksi '
      + 'tehtaasta tuli puuleluja. Nimi Lego on lyhennys tanskan sanoista leg '
      + 'godt, leiki hyvin; latinassa sama sana tarkoittaa muun muassa kokoan, '
      + 'valitsen ja luen — merkitykset, jotka kävivät toteen vasta kun tehdas '
      + 'alkoi tehdä nystyröityjä palikoita.\n\n'
      + 'Muovituotanto alkoi Tanskassa 1947, ja kun puutyöosasto paloi, pojan '
      + 'Godtfredin päätös oli lopettaa puulelut kokonaan ja keskittyä '
      + 'palikkajärjestelmään. Lukkiutuvien palikoiden valmistus alkoi 1949. '
      + 'Esikuvana olivat englantilaisen leluntekijän Hilary Pagen 1939 '
      + 'keksimät palikat, joita valmisti hänen yhtiönsä Kiddicraft.\n\n'
      + 'Vuonna 1961 Christiansen rakennutti Billundin lentokentän alun, jotta '
      + 'leluja saisi maailmalle. Yhtiö on pysynyt perheen omistuksessa; '
      + 'vuodesta 1995 sitä on hallinnoitu sijoitusyhtiö Kirkbin kautta. Vuoden '
      + '2015 alkupuoliskolla Legosta tuli liikevaihdolla mitattuna maailman '
      + 'suurin leluyhtiö: myyntiä 2,1 miljardia dollaria, kun Mattelilla oli '
      + '1,9 miljardia.\n\n'
      + 'Palikoita valmistetaan vuodessa noin 36 miljardia, eli suunnilleen '
      + '1 140 osaa sekunnissa. Heinäkuuhun 2015 mennessä niitä oli tehty '
      + 'kuusisataa miljardia. Brändin ympärille on rakennettu kymmenen '
      + 'Legoland-huvipuistoa, elokuvia ja pelejä.',
    lahde: 'en-Wikipedia "The Lego Group", johdanto-osa ja osio "History", sekä '
      + '"Lego", johdanto-osa (tarkistettu 11.9.2026).',
  },
];
