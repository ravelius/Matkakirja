/*
 * MAASTOKOHTEET — FIN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FIN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FIN.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 3 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Suomessa oli neljä maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-fin.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * SUOMESSA ON KOLME PELIKAUPUNKIA (Helsinki, Tampere, Rovaniemi), ja
 * etäisyys mitattiin niihin kaikkiin. Lähin uusi merkki on Petäjäveden
 * vanha kirkko 61,1 lautayksikön päässä Tampereesta — reilusti yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Kaikki kahdeksan ovat siis pääkartan merkkejä.
 *
 * SUOMENLINNA JÄTETTIIN POIS, vaikka se olisi ilmeisin: nimi on jo
 * kartalla Helsingin kohdekartan pisteenä (js/packs/maakartat.js
 * KAUPUNKIKARTAT.helsinki, juttu js/packs/nahtavyysjutut.js), ja
 * sääntö N3 sallii saman nimen kartalla vain kerran.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Suomen maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_FIN = [
  {
    id: 'halti',
    nimi: 'Halti',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Suomen korkein kohta ei ole huippu?',
      'Mikä on korkein kokonaan Suomessa oleva tunturi?',
    ],
    korostukset: ['Hálditšohkka'],
    nappi: 'Suomen korkein kohta — mutta ei huippu',
    // 21.2789 E / 69.3228 N — en-Wikipedia "Halti"
    laudat: {
      maailmankartta: { x: 6542.6, y: 422.5 },
      europe: { x: 619.8, y: 70.4 },
    },
    teksti: 'Halti on tunturi Norjan ja Suomen rajalla. Sen varsinainen huippu Ráisduottarháldi on '
      + 'Norjan puolella, noin kilometrin päässä rajasta, ja Suomen puolen korkein kohta on 1 '
      + '324 metrissä oleva Hálditšohkka — maan korkein piste, mutta rinteellä eikä huipulla. '
      + 'Rajan mutka juontuu Ruotsin ja Tanskan rajasopimuksesta vuodelta 1734, jolloin '
      + 'rajapyykit lyötiin sinne minne oli kätevintä ja raja sovittiin kulkevaksi suoraan '
      + 'niiden välillä.',
    lahde: 'en-Wikipedia "Halti", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanlahti',
    nimi: 'Pohjanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Merenkurkku on?',
      'Miksi Pohjanlahden rannat nousevat yhä?',
    ],
    korostukset: ['Merenkurkku|Merenkurkkuun'],
    nappi: 'Itämeren pohjoisin haara',
    // 21.6 E / 62.8 N — ulappa Merenkurkun pohjoispuolella; artikkelin oma keskipiste on 20 / 63
    laudat: {
      maailmankartta: { x: 6553.3, y: 783.1 },
      europe: { x: 625.9, y: 242 },
    },
    teksti: 'Pohjanlahti on katoamassa. Maa nousee yhä siitä, minkä jääkauden mannerjää painoi '
      + 'sen alle — lähes kilometrin verran — ja kohoaa 80 senttiä vuosisadassa, Merenkurkussa '
      + 'melkein sentin vuodessa. Noin kahdentuhannen vuoden kuluttua kynnys nousee pinnan '
      + 'yläpuolelle ja Perämeri irtoaa omaksi makean veden järvekseen. Sitä kohti se on jo '
      + 'pitkällä: pohjoisimmillaan vesi on niin vähäsuolaista, että hauki, siika ja ahven '
      + 'viihtyvät siinä. Lahti on Itämeren pohjoisin haara Suomen länsirannikon ja '
      + 'Pohjois-Ruotsin itärannikon välissä, ja se jakautuu Perämereen, Merenkurkkuun ja '
      + 'Selkämereen. Lahden eteläpäässä on Ahvenanmaa, Ahvenanmeren ja Saaristomeren välissä; '
      + 'Suomen puolen suurimmat satamat tonneissa mitattuna ovat Rauma, Kokkola ja Tornio.',
    lahde: 'en-Wikipedia "Gulf of Bothnia", johdanto-osa sekä osiot "Geography" ja "Economy" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'suomenlahti',
    nimi: 'Suomenlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä joki laskee Suomenlahden pohjukkaan?',
      'Miksi lahden ympäristöongelmat ovat pahimpia juuri täällä?',
    ],
    korostukset: ['Neva|Neva'],
    nappi: 'Itämeren itäisin haara',
    // 25.2 E / 59.9 N — en-Wikipedia "Gulf of Finland" (26 / 59,83), siirretty hieman länteen lahden keskiulapalle
    laudat: {
      maailmankartta: { x: 6673.3, y: 930.7 },
      europe: { x: 695, y: 318.2 },
    },
    teksti: 'Suomenlahti on Itämeren itäisin haara. Se ulottuu Suomen ja Viron välissä itään '
      + 'Pietariin asti, jonne Neva laskee. Lahden rannoilla ovat myös Helsinki ja Tallinna, ja '
      + 'koska lahti on matala, Itämeren ympäristöongelmat näkyvät siinä kaikkein selvimmin.',
    lahde: 'en-Wikipedia "Gulf of Finland", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'kemijoki',
    nimi: 'Kemijoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Ounasjoki rauhoitettiin?',
      'Milloin Kemijoen uitto loppui?',
    ],
    korostukset: ['Ounasjoki|Ounasjoki'],
    nappi: 'Suomen pisin joki',
    // 25.6 E / 66.4 N — keskijuoksu Rovaniemen yläpuolella; artikkelin koordinaatti 24,45 / 65,77 on suistossa Kemissä
    laudat: {
      maailmankartta: { x: 6686.7, y: 589.5 },
      europe: { x: 702.7, y: 147.3 },
    },
    teksti: 'Isoisäsi aikaan Kemijoella oli juuri alkanut uitto: tukit lähtivät ensimmäisen kerran '
      + 'alas 1860-luvulla, ja viimeiset uitettiin kesällä 1991 — satakolmekymmentä vuotta '
      + 'samaa työtä, kunnes auto ja juna veivät sen. Uiton rinnalle tuli toinen käyttö. '
      + 'Ensimmäinen voimalaitos rakennettiin Isohaaraan 1946, ja vähitellen Suomen pisimpään '
      + 'jokeen ja sen valuma-alueelle nousi 21 laitosta, jotka tuottavat yli kolmanneksen maan '
      + 'vesivoimasta. Yksi iso haara jätettiin rauhaan: Ounasjoki, joka yhtyy Kemijokeen '
      + 'Rovaniemellä, rauhoitettiin lailla 1983, eikä siihen rakennettu yhtään voimalaa. '
      + 'Kemijoki itse on 550 kilometriä pitkä ja laskee Pohjanlahteen Kemissä.',
    lahde: 'fi-Wikipedia "Kemijoki", johdanto-osa sekä osiot "Kemijoen vesistön voimalaitokset" ja '
      + '"Kemijoen uitto" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'olavinlinna',
    nimi: 'Olavinlinna',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Pähkinäsaaren rauha oli?',
      'Miksi linna rakennettiin keskelle salmea?',
    ],
    korostukset: ['Kyrönsalmi|Kyrönsalmessa'],
    nappi: 'Pohjoisin keskiaikainen kivilinna',
    // 28.9011 E / 61.8639 N — en-Wikipedia "Olavinlinna"
    laudat: {
      maailmankartta: { x: 6796.7, y: 831.5 },
    },
    teksti: 'Olavinlinna on 1400-luvun kolmitorninen linna Savonlinnassa, saarella '
      + 'Kyrönsalmessa Haukiveden ja Pihlajaveden välissä. Se on pohjoisin yhä pystyssä oleva '
      + 'keskiaikainen kivilinnoitus ja koko Ruotsin valtakunnan parhaiten säilynyt '
      + 'keskiaikainen linna. Erik Axelsson Tott perusti sen vuonna 1475 nimellä Sankt '
      + 'Olofsborg hyötyäkseen siitä sekasorrosta, joka seurasi Iivana III:n Novgorodin '
      + 'valloituksesta, ja paikka valittiin Savosta niin että se veisi rajaa Pähkinäsaaren '
      + 'rauhan venäläiselle puolelle. Se oli ensimmäinen ruotsalainen linna, jonka paksut '
      + 'pyöreät tornit oli suunniteltu kestämään tykkitulta, eikä järvien verkko sen '
      + 'ympärillä ollut sattumaa: vesistöt hidastaisivat hyökkääjää. Linnaa ei koskaan '
      + 'vallattu väkisin, ja vuodesta 1912 sen piha on ollut Savonlinnan oopperajuhlien '
      + 'näyttämö.',
    lahde: 'en-Wikipedia "Olavinlinna", johdanto-osa sekä osiot "History" ja "Warfare" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'turunlinna',
    nimi: 'Turun linna',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Österland oli?',
      'Kuka oli Juhana-herttua?',
    ],
    korostukset: ['Österland|Österlandin'],
    nappi: 'Suomen suurin keskiaikainen rakennus',
    // 22.2286 E / 60.4353 N — en-Wikipedia "Turku Castle"
    laudat: {
      maailmankartta: { x: 6574.3, y: 904 },
    },
    teksti: 'Turun linna seisoo Aurajoen rannalla, ja se on tuomiokirkon ohella Suomen '
      + 'vanhimpia yhä käytössä olevia rakennuksia sekä maan suurin säilynyt keskiaikainen '
      + 'rakennus. Rakentaminen alkoi noin vuonna 1280, kun alueelle sijoittuneet ruotsalaiset '
      + 'pystyttivät sinne sotilaslinnoituksen ja etuvartion. Linna oli Österlandin — sen '
      + 'alueen, jota nykyään kutsutaan Suomeksi — puolustusrakennus ja hallintokeskus, ja se '
      + 'joutui mukaan Ruotsin ja Kalmarin unionin valtataisteluihin ja kesti piirityksiä. '
      + 'Huippunsa se koki 1500-luvun puolivälissä Juhana-herttuan ja Katarina Jagellonican '
      + 'aikana, jolloin päälinnaa laajennettiin tuntuvasti; hallintokeskuksen aseman se '
      + 'menetti 1600-luvulla Pietari Brahen kenraalikuvernöörikauden jälkeen. Nykyään se on '
      + 'Suomen suosituin museo, ja kävijöitä on hyvin yli satatuhatta vuodessa.',
    lahde: 'en-Wikipedia "Turku Castle", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vanharauma',
    nimi: 'Vanha Rauma',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi vanhimmat talot ovat vasta 1700-luvulta?',
      'Mikä Pyhän Ristin kirkko on?',
    ],
    korostukset: ['kaavarunko|kaavarunko'],
    nappi: 'Puukaupunki keskiaikaisella katuverkolla',
    // 21.5 E / 61.1333 N — en-Wikipedia "Rauma, Finland" (artikkelilla "Old Rauma" ei ole
    // koordinaattia; piste on kaupungin keskusta, jota Vanha Rauma on)
    laudat: {
      maailmankartta: { x: 6550, y: 868.7 },
    },
    teksti: 'Vanha Rauma on Rauman puinen keskusta, ja se otettiin maailmanperintöluetteloon '
      + 'vuonna 1991 puuarkkitehtuurinsa ja säilyneen keskiaikaisen kaupunkirakenteensa '
      + 'takia. Alue on noin 0,3 neliökilometriä, siinä on noin kuusisataa rakennusta ja '
      + 'siellä asuu noin 800 ihmistä. Vanhimmat talot ovat 1700-luvulta, sillä vuosien 1640 '
      + 'ja 1682 tulipalot tuhosivat suuren osan kaupungista — kaavarunko sen sijaan on yhä '
      + 'suurelta osin keskiaikainen. Asuintalot ovat pääkatujen varsilla ja aitat ja vajat '
      + 'kapeilla kujilla, ja lähes kaikki rakennukset ovat yksikerroksisia. Keskiajalta '
      + 'säilyi fransiskaanien luostarikirkko, vuonna 1512 vihitty Pyhän Ristin kirkko, jonka '
      + 'seinillä on keskiaikaisia maalauksia.',
    lahde: 'en-Wikipedia "Old Rauma", koko artikkeli; koordinaatti en-Wikipedia "Rauma, '
      + 'Finland" (tarkistettu 6.9.2026).',
  },
  {
    id: 'verla',
    nimi: 'Verla',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä puuhiomo tekee?',
      'Milloin tehdas lopetti?',
    ],
    korostukset: ['puuhiomo|puuhiomo'],
    nappi: 'Tehdas, joka jäi seisomaan paikoilleen',
    // 26.6408 E / 61.0619 N — en-Wikipedia "Verla"
    laudat: {
      maailmankartta: { x: 6721.4, y: 872.4 },
    },
    teksti: 'Verla on hyvin säilynyt 1800-luvun tehdaskylä Jaalassa Kouvolassa Kymijoen '
      + 'pohjoishaaran varrella. Puuhiomo, viereiset voimalaitokset ja asuintalot otettiin '
      + 'maailmanperintöluetteloon vuonna 1996 todisteena 1800-luvun puunjalostuksesta ja '
      + 'sen työläisten elämästä. Ensimmäisen hiomon perusti Hugo Neuman vuonna 1872, se paloi '
      + '1876, ja vuonna 1882 Gottlieb Kreidl ja Louis Haenel perustivat isomman hiomo- ja '
      + 'pahvitehtaan, joka kävi 18. heinäkuuta 1964 asti — siihen päivään, jona viimeinen '
      + 'vanhoista työntekijöistä jäi eläkkeelle. Koneet jätettiin paikoilleen, ja tehtaasta '
      + 'tuli pahvinvalmistuksen museo vuonna 1972; opastettu kierros seuraa työvaiheita '
      + 'puun sahauksesta massaan, kuivaukseen, lajitteluun ja pakkaukseen. Joen itärannalta '
      + 'on löytynyt myös noin kuusituhatta vuotta vanhoja kalliomaalauksia, joissa on '
      + 'hirviä, ihmisiä ja kuvioita.',
    lahde: 'en-Wikipedia "Verla", johdanto-osa sekä osiot "Description", "History" ja '
      + '"Museum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'petajavedenvanhakirkko',
    nimi: 'Petäjäveden vanha kirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka rakensi Petäjäveden vanhan kirkon?',
      'Miksi kirkko jäi tyhjilleen?',
    ],
    korostukset: ['ristikirkko|ristikirkon'],
    nappi: 'Salvottu kirkko, joka ehti unohtua',
    // 25.1833 E / 62.25 N — en-Wikipedia "Petäjävesi Old Church"
    laudat: {
      maailmankartta: { x: 6672.8, y: 811.6 },
    },
    teksti: 'Petäjäveden vanha kirkko on hirsikirkko, joka rakennettiin vuosina 1763–1765, '
      + 'kun Häme kuului vielä Ruotsiin; kellotapuli tuli vuonna 1821. Se otettiin '
      + 'maailmanperintöluetteloon vuonna 1994 pohjoismaisen puukirkkoarkkitehtuurin '
      + 'todistuskappaleena. Kirkon suunnitteli ja rakensi vesankalainen kirkonrakentaja '
      + 'Jaakko Klemetinpoika Leppänen, ja tapulin lisäsi hänen pojanpoikansa Erkki Leppänen. '
      + 'Ristikirkon tasavartinen pohjakaava oli 1700-luvun maaseutukirkkojen tavallinen '
      + 'muoto, mutta korkea katto muistuttaa vanhempaa goottilaista tapaa ja kahdeksankulmainen '
      + 'kattoholvi juontuu renessanssin oculuksesta; saarnastuoli, penkit, parvet ja kruunut '
      + 'ovat paikallisten käsityöläisten männystä veistämiä. Kirkko jäi pois käytöstä 1879 '
      + 'uuden kirkon valmistuttua ja seisoi pitkään hylättynä, kunnes puolalais-itävaltalainen '
      + 'taidehistorioitsija Josef Strzygowski huomasi sen arvon 1920-luvulla.',
    lahde: 'en-Wikipedia "Petäjävesi Old Church", johdanto-osa sekä osiot "History and '
      + 'Construction", "Architecture" ja "From forgotten to world heritage" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sammallahdenmaki',
    nimi: 'Sammallahdenmäki',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä hiidenkiuas on?',
      'Miksi meri ei enää näy mäeltä?',
    ],
    korostukset: ['maankohoaminen|maankohoaminen'],
    nappi: 'Pronssikauden hautaröykkiöt harjulla',
    // 21.7775 E / 61.1206 N — en-Wikipedia "Sammallahdenmäki"
    laudat: {
      maailmankartta: { x: 6559.3, y: 869.4 },
    },
    teksti: 'Sammallahdenmäki on pronssikautinen hautapaikka Raumalla Satakunnassa: harjanteen '
      + 'laella on 33 graniittista hautaröykkiötä, jotka on ladottu 1500–500 eaa. Se on yksi '
      + 'Fennoskandian suurimmista ja täydellisimmistä pronssikautisista kohteista, ja se '
      + 'merkittiin maailmanperintöluetteloon vuonna 1999. Röykkiöistä 28 on varhaiselta '
      + 'pronssikaudelta ja loput varhaiselta rautakaudelta, ja joukossa on kaksi '
      + 'poikkeuksellista: Huilun pitkä raunio muinaisine kivimuureineen ja Kirkonlaattia, '
      + 'tasakattoinen 16 × 19 metrin suorakaide, jonka kaltaista ei tunneta muualta '
      + 'Skandinaviasta. Röykkiöt ladottiin alun perin niin, että niiltä avautui näkymä '
      + 'merelle Pohjanlahdelle, mutta maankohoaminen on vienyt meren näkyvistä. Ne saattavat '
      + 'liittyä auringonpalvontaan, joka levisi Skandinaviaan pronssikaudella, ja ne '
      + 'kertovat sukuyhteisön maanomistuksesta — asiasta, joka tuli maanviljelyn mukana.',
    lahde: 'en-Wikipedia "Sammallahdenmäki", johdanto-osa sekä osiot "Description" ja '
      + '"Discovery and Excavation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kerimaenkirkko',
    nimi: 'Kerimäen kirkko',
    tyyppi: 'sana',
    kysymykset: [
      'Kuinka moni kirkkoon mahtuu?',
      'Pitääkö tarina mittavirheestä paikkansa?',
    ],
    korostukset: ['tuuma|tuumiksi'],
    nappi: 'Maailman suurin puukirkko',
    // 29.285 E / 61.9128 N — en-Wikipedia "Kerimäki Church"
    laudat: {
      maailmankartta: { x: 6809.5, y: 829 },
    },
    teksti: 'Kerimäen kirkko Savonlinnan Kerimäellä on maailman suurin puukirkko. Sen '
      + 'suunnitteli Anders Fredrik Granstedt, ja se rakennettiin vuosina 1844–1847: pituutta '
      + '45 metriä, leveyttä 42, korkeutta 37 ja istumapaikkoja yli 3 000 — väkeä kirkkoon '
      + 'mahtuu kerralla 5 000. Sitkeän huhun mukaan koko johtuu laskuvirheestä: arkkitehdin '
      + 'senttimetrit olisi luettu tuumiksi, jotka ovat 2,54 kertaa suurempia. Myöhemmät '
      + 'tutkimukset ovat kuitenkin osoittaneet, että kirkko oli tarkoituskin rakentaa juuri '
      + 'näin isoksi, jotta puolet seudun väestä mahtuisi sinne yhtä aikaa. Talvella '
      + 'jumalanpalvelukset pidetään pienemmässä talvikirkossa, sillä pääkirkossa ei ole '
      + 'lämmitystä.',
    lahde: 'en-Wikipedia "Kerimäki Church", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bomarsund',
    nimi: 'Bomarsund',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Ahvenanmaan sota oli?',
      'Kuka sai ensimmäisen Victoria Crossin?',
    ],
    korostukset: ['Victoria Cross|Victoria Crossin'],
    nappi: 'Krimin sota tuli Ahvenanmaalle',
    // 20.2384 E / 60.2122 N — en-Wikipedia "Battle of Bomarsund"
    laudat: {
      maailmankartta: { x: 6507.9, y: 915.1 },
    },
    teksti: 'Bomarsund on Ahvenanmaan Sundissa sijaitseva linnoitus, jonka rakentamisen Venäjä '
      + 'aloitti vuonna 1832. Elokuussa 1854 siellä käytiin Krimin sotaan kuuluneen '
      + 'Ahvenanmaan sodan ainoa suuri taistelu: englantilais-ranskalainen retkikunta piiritti, '
      + 'valtasi ja lopuksi hävitti linnoituksen. Linnoitus oli kesken — suunnitelluista '
      + 'kahdestatoista aputornista oli valmiina kaksi — ja sen suunnittelijat olivat '
      + 'olettaneet, etteivät suuret sota-alukset pääsisi lähistön kapeista salmista; '
      + 'höyrylaivojen aikaan oletus ei enää pitänyt. Ensimmäinen yhteenotto 21. kesäkuuta '
      + '1854 jäi ratkaisemattomaksi tykistökaksintaisteluksi, ja juuri siinä Charles Davis '
      + 'Lucas heitti kannelle pudonneen kranaatin mereen ja sai ensimmäisenä ihmisenä '
      + 'Victoria Crossin. Heinäkuun lopulla linnoituksen ympärillä oli 25 brittialusta, ja '
      + '8. elokuuta maihin nousi etelään 7 000 ranskalaista sotilasta sekä pohjoiseen loput '
      + '2 000 ranskalaista ja 900 brittiläistä merisotilasta.',
    lahde: 'en-Wikipedia "Battle of Bomarsund", johdanto-osa sekä osiot "Background", "First '
      + 'battle" ja "Second battle" (tarkistettu 6.9.2026).',
  },
];

