/*
 * MAASTOKOHTEET — GBR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GBR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GBR.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Britannialla oli jo KOLME kuratoitua kohdetta
 * (js/packs/fokuskohteet-gbr.js: St Paulin katedraali, Crystal Palace
 * ja Vanha London Bridge), joten tavoitteesta puuttui viisi
 * (docs/moduulit/karttanostot-kattavuus.md). Tässä ne ovat; yhdenkään
 * tyyppi ei ole maastoa, vaan historiaa, kulttuuria tai tekniikkaa.
 *
 * fokuskohteet-gbr.js:ÄÄN EI OLE KOSKETTU eikä yhtään sen kolmesta
 * kohteesta ole toistettu täällä — kaikki kolme ovat Lontoossa, ja
 * tämän erän kohteet ovat kaukana pelikaupungeista. Sama koskee
 * js/fokuskohteet.js:n KOHDE_MAAT-taulua; maastokohteiden hakemisto
 * (js/packs/maastokohteet.js) liittää tämän listan peliin
 * sellaisenaan.
 *
 * KAIKKI VIISI OVAT KAUKANA PELIKAUPUNGISTA. Britanniassa on kaksi
 * pelikaupunkia (Lontoo ja Edinburgh) ja naapurissa Dublin, ja
 * etäisyys mitattiin jokaiseen js/packs/maailmankartta.js CITIES-listan
 * kaupunkiin; jokaisen kohteen lähin on kirjattu sen oman
 * koordinaattirivin viereen. Lähin koko erässä on Hadrianuksen muuri
 * 53,1 lautayksikön päässä Edinburghista — raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Forth Bridge
 * jätettiin siksi pois: se on 7,1 yksikön päässä Edinburghista eli
 * käytännössä kaupungin kohdalla, ja sen paikka olisi kohdekartalla.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026.
 *
 * Britannian maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_GBR = [
  {
    id: 'bennevis',
    nimi: 'Ben Nevis',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on felsenmeer?',
      'Millainen on Ben Neviksen pohjoisseinämä talvella?',
    ],
    korostukset: ['felsenmeer|felsenmeer'],
    nappi: 'Brittein saarten korkein',
    // -5.0035 E / 56.7969 N — en-Wikipedia "Ben Nevis"
    laudat: {
      maailmankartta: { x: 5666.6, y: 1081.5 },
      europe: { x: 115.1, y: 399.8 },
    },
    teksti: 'Ben Nevis on Skotlannin, Yhdistyneen kuningaskunnan ja koko Brittein saarten korkein '
      + 'vuori: huippu on 1 345 metriä merenpinnasta, eikä mihinkään suuntaan ole 739 '
      + 'kilometriin korkeampaa maata. Huippu itsessään on kivinen tasanne, felsenmeer, ja '
      + 'pohjoisseinämän seitsemänsataametriset kalliot ovat Skotlannin tärkein '
      + 'jääkiipeilypaikka. Vuorella on juostu kilpaa vuodesta 1898.',
    lahde: 'en-Wikipedia "Ben Nevis", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'snowdon',
    nimi: 'Snowdon',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Yr Wyddfa tarkoittaa?',
      'Miten jäätiköt muotoilivat Snowdonin?',
    ],
    korostukset: ['arête|arêtet'],
    nappi: 'Walesin korkein, kymriksi Yr Wyddfa',
    // -4.0762 E / 53.0685 N — en-Wikipedia "Snowdon"
    laudat: {
      maailmankartta: { x: 5697.5, y: 1254.2 },
      europe: { x: 132.9, y: 497.9 },
    },
    teksti: 'Snowdon eli kymrinkielisellä nimellään Yr Wyddfa kohoaa 1 085 metriin ja on Walesin '
      + 'korkein vuori sekä Brittein saarten korkein Skotlannin ylämaiden eteläpuolella. '
      + 'Kalliot syntyivät tulivuorenpurkauksissa ordovikikaudella, ja jäätiköt veistivät '
      + 'niistä pyramidihuipun ja terävät harjanteet eli arêtet Crib Gochin ja Y Lliweddin. '
      + 'Vuorta on kutsuttu Yhdistyneen kuningaskunnan vilkkaimmaksi: vuonna 2022 sen nousi 543 '
      + '541 kävelijää.',
    lahde: 'en-Wikipedia "Snowdon", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Pohjanmeri on niin matala?',
      'Milloin Pohjanmereltä löydettiin öljy?',
    ],
    nappi: 'Meri seitsemän maan välissä',
    // 1.8 E / 55.6 N — ulappa Britannian itärannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 5893.3, y: 1137.9 },
      europe: { x: 245.8, y: 431.3 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Pituutta sillä on yli 970 kilometriä ja '
      + 'leveyttä 580, ja pinta-alaa 570 000 neliökilometriä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'irlanninmeri',
    nimi: 'Irlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Mansaari on?',
      'Miksi merta kutsutaan joskus Manxinmereksi?',
    ],
    nappi: 'Kahden saaren välinen meri',
    // -4.2 E / 53.7 N — ulappa Walesin ja Irlannin välissä; artikkelin oma keskipiste on -5 / 53,5
    laudat: {
      maailmankartta: { x: 5693.3, y: 1225.5 },
      europe: { x: 130.6, y: 481.3 },
    },
    teksti: 'Irlanninmeri on 46 007 neliökilometrin vesialue, joka erottaa Irlannin saaren '
      + 'Isosta-Britanniasta. Etelässä se yhtyy Kelttienmereen Yrjönkanaalin kautta ja '
      + 'pohjoisessa Skotlannin länsipuolisiin sisämeriin Pohjoiskanaalin kautta. Sen suurin '
      + 'saari on Anglesey Pohjois-Walesissa ja toiseksi suurin Mansaari.',
    lahde: 'en-Wikipedia "Irish Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'thames',
    nimi: 'Thames',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea kutsutaan paikoin Isisiksi?',
      'Mikä joki on Yhdistyneen kuningaskunnan pisin?',
    ],
    nappi: 'Joki, jolla on kaksi nimeä',
    // -0.97 E / 51.46 N — Readingin kohta joen keskijuoksulla; artikkelin koordinaatti 0,61 / 51,5 on suistossa
    laudat: {
      maailmankartta: { x: 5801, y: 1326.1 },
      europe: { x: 192.6, y: 540.2 },
    },
    teksti: 'Thames virtaa Etelä-Englannin halki ja Lontoon läpi, ja sen pituus on 346 kilometriä. '
      + 'Se on Englannin pisin kokonaan maan sisällä virtaava joki ja koko Yhdistyneen '
      + 'kuningaskunnan toiseksi pisin Severnin jälkeen. Osalla matkaa jokea kutsutaan yhä '
      + 'vanhalla nimellä Isis.',
    lahde: 'en-Wikipedia "River Thames", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — VIISI KOHDETTA. Perustelut tiedoston alussa.
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'stonehenge',
    nimi: 'Stonehenge',
    tyyppi: 'historia',
    kysymykset: [
      'Miten kivet pysyvät päällekkäin?',
      'Mihin suuntaan monumentti on suunnattu?',
    ],
    korostukset: ['sarsen|sarsen-kivistä', 'trilitoni|trilitoneja'],
    nappi: 'Puusepän liitos kivessä',
    // -1.8261 E / 51.1789 N — en-Wikipedia "Stonehenge";
    // lähin pelikaupunki Lontoo 58,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5772.5, y: 1338.5 },
    },
    teksti: 'Stonehenge on esihistoriallinen megaliittirakennelma Salisburyn '
      + 'tasangolla Wiltshiressä Englannissa, kolmisen kilometriä Amesburysta länteen. '
      + 'Ulkokehä on tehty pystyistä sarsen-kivistä, joista kukin on noin neljä metriä '
      + 'korkea, kaksi metriä leveä ja painaa noin 25 tonnia. Niiden päällä lepäävät '
      + 'vaakasuorat kamanakivet, jotka pysyvät paikallaan tapin ja lovon avulla — '
      + 'puusepän liitos kivessä, eikä sellaista tunneta yhdestäkään saman ajan '
      + 'monumentista.\n\n'
      + 'Ulkokehän sisällä on rengas pienempiä sinikiviä ja niiden sisällä vapaasti '
      + 'seisovia trilitoneja: kaksi järeää pystykiveä ja niiden päällä yksi kamana. '
      + 'Kokonaisuus on suunnattu kesäpäivänseisauksen auringonnousuun ja '
      + 'talvipäivänseisauksen laskuun. Ympärillä on Englannin tihein neoliittisten ja '
      + 'pronssikautisten muistomerkkien rypäs, muun muassa useita satoja '
      + 'hautakumpuja.\n\n'
      + 'Stonehenge rakennettiin monessa vaiheessa noin vuodesta 3100 eaa. noin '
      + 'vuoteen 1600 eaa. Ympäröivä valli ja vallihauta ovat vanhimmasta vaiheesta, '
      + 'suuret sarsenit asetettiin paikoilleen 2600–2400 eaa. ja sinikivet nykyisille '
      + 'paikoilleen 2400–2200 eaa. Paikka on ollut lain suojaama muinaisjäännös '
      + 'vuoden 1882 muinaismuistolaista lähtien ja maailmanperintökohde vuodesta '
      + '1986.',
    lahde: 'en-Wikipedia "Stonehenge", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'hadrianuksen-muuri',
    nimi: 'Hadrianuksen muuri',
    tyyppi: 'historia',
    kysymykset: [
      'Mihin muurin kivet päätyivät?',
      'Onko muuri Skotlannin raja?',
    ],
    korostukset: ['mailinlinnake|mailinlinnakkeissa'],
    nappi: 'Muuri, joka ei ole raja',
    // -2.2833 E / 55.0167 N — en-Wikipedia "Hadrian's Wall";
    // lähin pelikaupunki Edinburgh 53,1 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5757.2, y: 1165 },
    },
    teksti: 'Hadrianuksen muuri oli Rooman Britannian-provinssin puolustusvarustus. '
      + 'Sen rakentaminen alkoi vuonna 122 keisari Hadrianuksen aikana. Muuri kulki '
      + 'idässä Tyne-joen Wallsendista lännessä Bowness-on-Solwayhin eli koko saaren '
      + 'leveydeltä, ja lopullisessa muodossaan se oli kivimuuri, jonka molemmin '
      + 'puolin oli leveät vallihaudat. Sotilaat majoittuivat suurissa linnakkeissa, '
      + 'pienemmissä mailinlinnakkeissa ja niiden välisissä torneissa; puolustuksen '
      + 'ohella muurin portit saattoivat toimia tullipaikkoina.\n\n'
      + 'Pituudeltaan muuri on 80 roomalaista mailia eli 117 kilometriä, ja se on '
      + 'Britannian suurin roomalainen muinaisjäännös. Unesco otti sen luetteloonsa '
      + '1987.\n\n'
      + 'Muurin kivet ovat suurelta osin muualla: lähes kaikki pystyssä ollut '
      + 'kiviaines purettiin uuden ajan alussa paikallisten teiden ja maatalojen '
      + 'aineeksi, eikä mikään kohta seiso enää alkuperäisessä korkeudessaan. '
      + 'Nykytutkimus on kaivanut esiin paljon perustuksia, ja monet muurin varren '
      + 'linnakkeet ovat yleisölle avoinna. Yleisestä puheesta huolimatta muuri ei ole '
      + 'koskaan ollut Englannin ja Skotlannin raja: se on kokonaan Englannin '
      + 'puolella.',
    lahde: 'en-Wikipedia "Hadrian\'s Wall", johdanto-osa ja osio "Dimensions" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'skara-brae',
    nimi: 'Skara Brae',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä paljasti kylän vuonna 1850?',
      'Mitä nimi Skara Brae tarkoittaa?',
    ],
    korostukset: ['Skaillinlahti|Skaillinlahden'],
    nappi: 'Myrsky, joka paljasti kivikylän',
    // -3.3417 E / 59.0487 N — en-Wikipedia "Skara Brae";
    // lähin pelikaupunki Edinburgh 148,6 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5721.9, y: 972.8 },
    },
    teksti: 'Skara Brae on kivestä rakennettu neoliittinen kylä Skaillinlahden '
      + 'rannalla Orkneyn pääsaaren länsirannikolla. Näkyvissä on kymmenen rakennusta '
      + 'ja neljä käytävää sekä kivisiä huonekaluja ja kiinteitä kalusteita. Kylässä '
      + 'asuttiin suunnilleen vuodesta 3180 eaa. vuoteen 2500 eaa., ja se on Euroopan '
      + 'täydellisimpänä säilynyt kivikautinen kylä.\n\n'
      + 'Nimi kertoo Orkneyn kielikerroksista. Brae on skotin sana ja tarkoittaa '
      + 'rinnettä; Skara juontuu vanhemmista muodoista Skerrabra ja Styerrabrae, jotka '
      + 'tarkoittivat alun perin sitä ruohoista kumpua, joka peitti hautautuneen '
      + 'kylän.\n\n'
      + 'Talvella 1850 Skotlantiin iski ankara myrsky, joka aiheutti laajaa tuhoa ja '
      + 'yli kahdensadan ihmisen kuoleman. Skaillinlahdella myrsky repi maan pois '
      + 'suurelta epäsäännölliseltä kummulta, ja kylän asukkaat löysivät sen alta '
      + 'useiden pienten katottomien talojen ääriviivat. Kaivaukset aloitti Skaill '
      + 'Housen William Graham Watt, paikallisen kartanonherran poika ja itseoppinut '
      + 'geologi. Skara Brae kuuluu Unescon maailmanperintökohteeseen Neoliittisen '
      + 'Orkneyn sydän, johon kuuluu neljä kohdetta.',
    lahde: 'en-Wikipedia "Skara Brae", johdanto-osa sekä osiot "Name and etymology" ja '
      + '"Discovery and early exploration" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ironbridge',
    nimi: 'Ironbridge',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi silta tehtiin raudasta?',
      'Kuka vastasi sillan rautatyöstä?',
    ],
    korostukset: ['valurauta|valuraudasta'],
    nappi: 'Maailman ensimmäinen rautasilta',
    // -2.4854 E / 52.6274 N — en-Wikipedia "The Iron Bridge";
    // lähin pelikaupunki Lontoo 93,5 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5750.5, y: 1274 },
    },
    teksti: 'Ironbridge on valuraudasta tehty kaarisilta, joka ylittää Severn-joen '
      + 'Shropshiressa Englannissa. Se avattiin 1781 ja oli maailman ensimmäinen '
      + 'merkittävä valuraudasta rakennettu silta. Menestys johti valuraudan laajaan '
      + 'käyttöön rakennusaineena, ja siltaa pidetään nykyään teollisen '
      + 'vallankumouksen tunnuksena.\n\n'
      + 'Syvä Ironbridgen rotko syntyi jääkauden lopulla. Sen ansiosta kivihiili, '
      + 'rautamalmi, kalkkikivi ja tulenkestävä savi olivat pinnan lähellä ja helposti '
      + 'louhittavissa — mutta samasta syystä sillan rakentaminen oli vaikeaa. Rannat '
      + 'olivat epävakaat ja joessa oli säilytettävä kulkukelpoinen väylä, joten '
      + 'Thomas Farnolls Pritchard esitti yhden jännevälin rautasiltaa. Aluksi raudan '
      + 'käyttöä epäiltiin; lopulta työ tehtiin kahdessa vuodessa, ja rautaosista '
      + 'vastasi Abraham Darby III. Sillan jänneväli on 30,63 metriä, ja veneet '
      + 'mahtuvat kulkemaan sen alitse.\n\n'
      + 'Vuonna 1934 silta suojeltiin muinaisjäännöksenä ja suljettiin ajoneuvoilta. '
      + 'Jalankulkijoilta perittiin tullia vuoteen 1950, jolloin silta siirtyi '
      + 'julkiseen omistukseen. Silta, sen viereinen Ironbridgen taajama ja koko rotko '
      + 'muodostavat yhdessä Unescon maailmanperintökohteen.',
    lahde: 'en-Wikipedia "The Iron Bridge", johdanto-osa ja osio "Background" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bathin-roomalaiset-kylpylat',
    nimi: 'Bathin roomalaiset kylpylät',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä kylpylän vesi tulee?',
      'Miksi altaisiin ei saa mennä?',
    ],
    korostukset: ['Aquae Sulis|Aquae Sulis'],
    nappi: 'Miljoona litraa lämmintä vettä päivässä',
    // -2.3595 E / 51.3809 N — en-Wikipedia "Roman Baths (Bath)";
    // lähin pelikaupunki Lontoo 75,0 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5754.7, y: 1329.6 },
    },
    teksti: 'Bathin roomalaiset kylpylät ovat hyvin säilyneet lämpökylpylät Bathin '
      + 'kaupungissa Somersetissa Englannissa. Paikalle rakennettiin temppeli vuosien '
      + '60 ja 70 välillä jaa. Rooman Britannian ensimmäisinä vuosikymmeninä, ja sen '
      + 'ympärille kasvoi pieni roomalainen kaupunki nimeltä Aquae Sulis. Kylpylä oli '
      + 'yleisessä käytössä Rooman vallan loppuun asti 400-luvulla; anglosaksisen '
      + 'kronikan mukaan se oli vuosisataa myöhemmin jo raunioina.\n\n'
      + 'Vesi tulee Mendip-kukkuloille satavasta sateesta. Se imeytyy '
      + 'kalkkikivikerrosten läpi 2 700–4 300 metrin syvyyteen, jossa maan oma lämpö '
      + 'nostaa sen 69–96 asteeseen. Paineen alaisena kuuma vesi nousee takaisin '
      + 'halkeamia ja siirroksia pitkin ja kuplii maasta altaisiin. Pennyquickin '
      + 'siirroksesta purkautuu joka päivä 1 170 000 litraa 46-asteista vettä.\n\n'
      + 'Kohde on säilynyt neljänä osana: pyhä lähde, roomalainen temppeli, '
      + 'kylpylärakennus ja museo, jossa on Aquae Sulisin löytöjä. Kaikki katutason '
      + 'rakennukset ovat 1800-luvulta. Kävijöitä on yli miljoona vuodessa, mutta '
      + 'veteen ei pääse: siinä esiintyy Naegleria fowleri -ameeba.',
    lahde: 'en-Wikipedia "Roman Baths (Bath)", johdanto-osa ja osio "Hot spring" '
      + '(tarkistettu 6.9.2026).',
  },
];

