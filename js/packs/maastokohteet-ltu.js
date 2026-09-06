/*
 * MAASTOKOHTEET — LTU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LTU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LTU.json. Työkalu laskee laudan
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
 * Liettuan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Liettua oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja
 * kaksitoista karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md).
 * Tavoite on kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne
 * ovat — sama malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-ltu.js:ssä.
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
 * (Kuurinkynnäs) on 15,4 lautayksikön päässä Riiasta, eli reilusti yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti kantaa
 * tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto olisi
 * huonompi kuin kuvaton kortti (Perustuslaki, faktakuri). Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_LTU = [
  {
    id: 'aukstojas',
    nimi: 'Aukštojas',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta vaihtui vasta 2004?',
      'Mikä Medininkain ylänkö on?',
    ],
    korostukset: ['Medininkai|Medininkain'],
    nappi: 'Mäki, joka vaihtui vasta 2004',
    // 25.6261 E / 54.5271 N — en-Wikipedia "Aukštojas Hill"
    laudat: {
      maailmankartta: { x: 6687.5, y: 1187.6 },
      europe: { x: 703.2, y: 459.5 },
    },
    teksti: 'Aukštojas on Liettuan korkein kohta. Se on Medininkain ylängöllä noin 24 kilometriä '
      + 'Vilnasta kaakkoon. Korkeus mitattiin vuonna 2004 Vilnan Gediminas-teknillisen '
      + 'yliopiston geodesian laitoksella GPS:n avulla, ja tulos oli 293,84 metriä — sitä ennen '
      + 'maan korkeimpana pidettiin viidensadan metrin päässä olevaa Juozapinėä, 292,7 metriä.',
    lahde: 'en-Wikipedia "Aukštojas Hill", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Kuurinkynnäs on?',
      'Miksi Itämeren vesi on murtovettä?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 20.6 E / 55.7 N — ulappa Kuurinkynnään edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6520, y: 1133.2 },
      europe: { x: 606.7, y: 428.7 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Liettuan lyhyt rannikko on '
      + 'meripihkarantaa: meren etelärannan meripihkaesiintymät mainittiin kirjoissa jo '
      + '1100-luvulla. Klaipėdan telakat pitävät kaupungin yhä kiinni meren omassa '
      + 'elinkeinossa.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Middle Ages" ja "Economy"; laivan osalta "Vasa (ship)", johdanto-osa (tarkistettu '
      + '1.9.2026).',
  },
  {
    id: 'nemunas',
    nimi: 'Nemunas',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joella on niin monta nimeä?',
      'Mikä Kuurinlahti on?',
    ],
    korostukset: ['Kuurinlahti|Kuurinlahteen'],
    nappi: 'Joki, jolla on viisi nimeä',
    // 23.9 E / 54.9 N — Kaunas joen keskijuoksulla; artikkelin koordinaatti 21,247 / 55,337 on suistossa
    laudat: {
      maailmankartta: { x: 6630, y: 1170.4 },
      europe: { x: 670.1, y: 449.7 },
    },
    teksti: 'Nemunas — valkovenäjäksi Nioman, puolaksi Niemen, saksaksi Memel — nousee '
      + 'Keski-Valko-Venäjältä ja virtaa Liettuan halki. Sen eteläinen haara muodostaa Venäjän '
      + 'Kaliningradin alueen pohjoisrajan, ja lopulta joki laskee Kuurinlahteen, joka on '
      + 'kapean salmen kautta yhteydessä Itämereen. Sen 937 kilometriä tekevät siitä yhden '
      + 'Itä-Euroopan suurista joista: se virtaa länteen Grodnoon, pohjoiseen Kaunasiin ja '
      + 'siitä taas länteen merelle.',
    lahde: 'en-Wikipedia "Neman", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'trakain-saarilinna',
    nimi: 'Trakain saarilinna',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka kuoli linnassa vuonna 1430?',
      'Miksi linnan kunnostus oli vaikeaa?',
    ],
    korostukset: ['Vytautas Suuri|Vytautas Suuri'],
    nappi: 'Suuriruhtinaan linna järven saarella',
    // 24.9331 E / 54.6525 N — en-Wikipedia "Trakai Island Castle"
    laudat: {
      maailmankartta: { x: 6664.4, y: 1181.9 },
      europe: { x: 689.9, y: 456.2 },
    },
    teksti: 'Trakain saarilinna seisoo Galvė-järven saarella Trakaissa. Kivilinnan '
      + 'rakentaminen alkoi 1300-luvulla suuriruhtinas Kęstutisin käskystä, ja päätyöt '
      + 'saattoi valmiiksi noin 1409 hänen poikansa Vytautas Suuri, joka myös kuoli '
      + 'linnassa vuonna 1430. Trakai oli Liettuan suuriruhtinaskunnan tärkeimpiä '
      + 'keskuksia, ja linnalla oli suuri strateginen merkitys.\n\n'
      + 'Ensimmäisessä rakennusvaiheessa 1300-luvun jälkipuoliskolla linna nousi kolmesta '
      + 'järven saaresta suurimmalle. Kęstutis siirsi sinne pääasuinpaikkansa ja '
      + 'aarteistonsa. Saksalainen ritarikunta vaurioitti linnaa pahoin hyökkäyksessään '
      + 'vuonna 1377.\n\n'
      + 'Toisessa vaiheessa lisättiin kaksi siipeä ja eteläpuolelle kuusikerroksinen, 35 '
      + 'metriä korkea päätorni. Tornissa oli nostoportit, jotka erottivat palatsin muusta '
      + 'linnasta, sekä kappeli ja asuintiloja. Se yhdistettiin monikerroksiseen '
      + 'ruhtinaspalatsiin, jonka sisäpihaa kiersivät puiset parvekekäytävät.\n\n'
      + 'Linna rakennettiin uudelleen 1950- ja 1960-luvuilla liettualaisten aloitteesta, '
      + 'vaikka neuvostoviranomaiset vastustivat hanketta. Kunnostuksen jälkeen linnaan '
      + 'perustettiin Trakain historiallinen museo.',
    lahde: 'en-Wikipedia "Trakai Island Castle", johdanto-osa sekä osiot "First phase" ja '
      + '"Second phase" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kernave',
    nimi: 'Kernavė',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Kernavėä sanotaan Liettuan Troijaksi?',
      'Mikä medgrinda on?',
    ],
    korostukset: ['medgrinda|medgrinda'],
    nappi: 'Turpeen säilömä ensimmäinen pääkaupunki',
    // 24.85 E / 54.8833 N — en-Wikipedia "Kernavė"
    laudat: {
      maailmankartta: { x: 6661.7, y: 1171.2 },
      europe: { x: 688.3, y: 450.2 },
    },
    teksti: 'Kernavė oli Liettuan suuriruhtinaskunnan keskiaikainen pääkaupunki ja on '
      + 'nykyään arkeologinen kohde, jossa asuu reilut kaksisataa ihmistä. Se sijaitsee '
      + 'Širvintosin kunnassa Neris-joen oikealla rannalla, 35 kilometriä Vilnasta.\n\n'
      + 'Kaupunki oli Liettuan ensimmäinen pääkaupunki ja valtiollisuuden ja pakanallisen '
      + 'itsenäisyyden symboli. Se mainitaan kirjallisissa lähteissä ensi kerran vuonna '
      + '1279, kun saksalainen ritarikunta piiritti sitä suuriruhtinas Traidenisin '
      + 'istuimena.\n\n'
      + 'Vuonna 1390 ritarit polttivat kaupungin ja sen rakennukset Pajautan laaksossa, '
      + 'myös linnan. Sen jälkeen kaupunkia ei rakennettu uudelleen, vaan jäljelle jääneet '
      + 'asukkaat muuttivat laaksosta kukkulan päälle. Rauniot peittyivät myöhemmin '
      + 'tulvakerroksen alle, joka muuttui märäksi turpeeksi ja säilytti jäänteet lähes '
      + 'koskemattomina — siksi paikkaa on kutsuttu Liettuan Troijaksi.\n\n'
      + 'Kernavėssa on vanhin tunnettu medgrinda: salainen vedenalainen tie, joka on '
      + 'päällystetty puulla. Sitä käytettiin puolustukseen, ja se on 300–600-luvuilta. '
      + 'Kulttuurisuojelualue perustettiin 1989, ja maailmanperintöluetteloon Kernavė '
      + 'liitettiin 2004.',
    lahde: 'en-Wikipedia "Kernavė", johdanto-osa sekä osiot "Geographic information" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ristien-kukkula',
    nimi: 'Ristien kukkula',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi ensimmäiset ristit pystytettiin?',
      'Kuinka monta ristiä kukkulalla arvioidaan olevan?',
    ],
    korostukset: ['Jurgaičiai|Jurgaičiain'],
    nappi: 'Satatuhatta ristiä kukkulalla',
    // 23.4167 E / 56.0153 N — en-Wikipedia "Hill of Crosses"
    laudat: {
      maailmankartta: { x: 6613.9, y: 1118.4 },
      europe: { x: 660.8, y: 420.4 },
    },
    teksti: 'Ristien kukkula on pyhiinvaelluspaikka noin kahdentoista kilometrin päässä '
      + 'Šiauliaista pohjoiseen Pohjois-Liettuassa.\n\n'
      + 'Tavan tarkkaa alkuperää ei tiedetä, mutta ensimmäiset ristit uskotaan pystytetyn '
      + 'entiselle Jurgaičiain eli Domantain linnavuorelle vuoden 1831 kapinan jälkeen. '
      + 'Kun Puola ja Liettua olivat kapinoineet Venäjän valtaa vastaan 1831 ja 1863 eivätkä '
      + 'perheet löytäneet kaatuneiden kapinallisten ruumiita, he alkoivat pystyttää heille '
      + 'symbolisia ristejä entiselle linnavuorelle.\n\n'
      + 'Sukupolvien mittaan kukkulalle on tuotu ristien ja krusifiksien lisäksi Neitsyt '
      + 'Marian patsaita, liettualaisten isänmaanystävien veistoksia sekä tuhansia pieniä '
      + 'kuvia ja rukousnauhoja. Tarkkaa määrää ei tiedä kukaan: arvioiden mukaan ristejä '
      + 'oli noin 55 000 vuonna 1990 ja 100 000 vuonna 2006.\n\n'
      + 'Neuvostomiehityksen aikana 1944–1990 uskonnon harjoittamista vainottiin, ja '
      + 'kukkulasta tuli julkisen vastarinnan merkki. Paikka on tullut merkitsemään '
      + 'liettualaisten rauhanomaista sitkeyttä.',
    lahde: 'en-Wikipedia "Hill of Crosses", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kuurinkynnas',
    nimi: 'Kuurinkynnäs',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä pitää kynnäksen olemassa?',
      'Ketkä jakavat maailmanperintökohteen?',
    ],
    korostukset: ['moreeni|moreeni'],
    nappi: 'Hiekkaharju kahden maan välissä',
    // 20.9708 E / 55.2744 N — en-Wikipedia "Curonian Spit"
    laudat: {
      maailmankartta: { x: 6532.4, y: 1153 },
      europe: { x: 613.8, y: 439.9 },
    },
    teksti: 'Kuurinkynnäs on 98 kilometriä pitkä, ohut ja kaareva hiekkadyynikynnäs, joka '
      + 'erottaa Kuurinlahden Itämerestä. Se on maailmanperintökohde, jonka Liettua ja '
      + 'Venäjä jakavat: eteläosa kuuluu Venäjän Kaliningradin alueeseen ja pohjoinen '
      + '52 kilometrin osuus Liettuan Klaipėdan lääniin.\n\n'
      + 'Kynnäs ulottuu etelässä Sambian niemimaalta pohjoiseen kapealle salmelle, jonka '
      + 'toisella puolella on Klaipėdan satamakaupunki. Leveys vaihtelee 400 metristä '
      + 'Venäjän puolella 3 800 metriin Liettuassa Nidan pohjoispuolella.\n\n'
      + 'Kynnäs syntyi noin kolmannella vuosituhannella eaa. Perustana oli jäätikön '
      + 'jättämä moreeni, ja tuulet ja merivirrat toivat sen päälle niin paljon hiekkaa, '
      + 'että muodostelma nousi merenpinnan yläpuolelle ja pysyi siellä.\n\n'
      + 'Geologisesti kynnäs on lyhytikäinen rannikkomuoto. Sen olemassaolo riippuu '
      + 'hiekan kulkeutumisen ja kertymisen tasapainosta, ja todennäköisin kehityskulku '
      + 'on, että matala lahti kynnäksen sisäpuolella täyttyy vähitellen sedimentistä ja '
      + 'muuttuu maaksi.',
    lahde: 'en-Wikipedia "Curonian Spit", johdanto-osa sekä osiot "Geography" ja "Geologic '
      + 'history" (tarkistettu 6.9.2026).',
  },
  {
    id: 'palangan-meripihkamuseo',
    nimi: 'Palangan meripihkamuseo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä meripihkan sisältä löytyy?',
      'Milloin palatsi rakennettiin?',
    ],
    korostukset: ['sulkeuma|sulkeumia'],
    nappi: '28 000 palaa kivettynyttä pihkaa',
    // 21.0558 E / 55.9069 N — en-Wikipedia "Palanga Amber Museum"
    laudat: {
      maailmankartta: { x: 6535.2, y: 1123.5 },
      europe: { x: 615.5, y: 423.2 },
    },
    teksti: 'Palangan meripihkamuseo on Itämeren rannalla Palangassa ja on osa Liettuan '
      + 'kansallista taidemuseota. Se toimii kunnostetussa 1800-luvun Tiškevičiaiden '
      + 'palatsissa, jota ympäröi Palangan kasvitieteellinen puutarha.\n\n'
      + 'Kokoelmassa on noin 28 000 meripihkakappaletta. Niistä noin 15 000:ssa on '
      + 'sulkeumia: hyönteisiä, hämähäkkejä tai kasveja, jotka jäivät pihkaan sen '
      + 'kovettuessa. Esillä on noin 4 500 kappaletta, ja monet niistä ovat taide-esineitä '
      + 'ja koruja.\n\n'
      + 'Itämeren rannikko on ollut meripihkan lähde esihistoriasta asti. Palangassa oli '
      + 'meripihkaverstaita 1600-luvulta lähtien, ja 1700-luvun loppuun mennessä siitä oli '
      + 'tullut Venäjän keisarikunnan meripihkateollisuuden keskus. Ensimmäistä '
      + 'maailmansotaa edeltävinä vuosina Palangassa käsiteltiin noin kaksituhatta kiloa '
      + 'raakameripihkaa vuodessa.\n\n'
      + 'Feliks Tyszkiewicz rakennutti uusrenessanssipalatsin vuonna 1897 saksalaisen '
      + 'arkkitehdin Franz Heinrich Schwechtenin piirustusten mukaan. Palatsi rappeutui '
      + 'maailmansotien aikana, kunnostettiin 1957 ja avattiin meripihkamuseona 1963 — '
      + 'aluksi vain noin 480 kappaleen kokoelmalla.',
    lahde: 'en-Wikipedia "Palanga Amber Museum", johdanto-osa sekä osiot "History and '
      + 'background" ja "Exhibits" (tarkistettu 6.9.2026).',
  },
  {
    id: 'rumsiskes',
    nimi: 'Rumšiškės',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi vanha kaupunki katosi?',
      'Kuinka monta rakennusta museossa on?',
    ],
    korostukset: ['ulkoilmamuseo|ulkoilmamuseostaan'],
    nappi: 'Kylä, joka siirrettiin veden tieltä',
    // 24.2167 E / 54.8639 N — en-Wikipedia "Rumšiškės"
    laudat: {
      maailmankartta: { x: 6640.6, y: 1172.1 },
      europe: { x: 676.2, y: 450.7 },
    },
    teksti: 'Rumšiškės on pieni liettualainen kaupunki kahdenkymmenen kilometrin päässä '
      + 'Kaunasista itään, Kaunasin tekojärven pohjoisrannalla. Se mainitaan ensi kerran '
      + 'vuonna 1382 saksalaisen ritarikunnan laatimassa reittiselostuksessa.\n\n'
      + 'Kaupungin eteläinen osa on nykyään tekojärven alla. Vanha Rumšiškės hukkui, kun '
      + 'Kaunasin vesivoimalaitos rakennettiin, mutta tärkeimmät rakennukset — pyhän Mikael '
      + 'Arkkienkelin kirkko, sen kellotapuli ja kappeli — siirrettiin uudelle paikalle '
      + 'vuonna 1958.\n\n'
      + 'Nykyään Rumšiškės tunnetaan ulkoilmamuseostaan, joka perustettiin 1966 ja avattiin '
      + 'yleisölle 1974. Se on Euroopan suurimpia laatuaan ja esittelee liettualaista '
      + 'maaseutuelämää aidoissa, muualta siirretyissä rakennuksissa.\n\n'
      + 'Museoalue on 175 hehtaaria, ja siellä on 140 rakennusta 1700- ja 1800-luvuilta '
      + 'sisustuksineen ja ympäristöineen. Kokoelmaan kuuluu yli 90 000 esinettä.',
    lahde: 'en-Wikipedia "Rumšiškės", johdanto-osa sekä osiot "History" ja "Open-air '
      + 'ethnographic museum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'grutas-puisto',
    nimi: 'Grūtasin puisto',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä patsaat tulivat puistoon?',
      'Minkä palkinnon puisto sai?',
    ],
    korostukset: ['Ig Nobel|Ig Nobel'],
    nappi: 'Kaadetut patsaat yhteen paikkaan',
    // 24.079 E / 54.022 N — en-Wikipedia "Grūtas Park"
    laudat: {
      maailmankartta: { x: 6636, y: 1210.8 },
      europe: { x: 673.5, y: 472.8 },
    },
    teksti: 'Grūtasin puisto on sosialistisen realismin museo ja veistospuisto, jossa on '
      + 'neuvostoajan patsaita ja muita miehitysajan ideologisia jäänteitä. Epävirallisesti '
      + 'sitä kutsutaan Stalinin maailmaksi. Liikemies Viliumas Malinauskas perusti puiston '
      + '2001 Druskininkain lähelle, noin 130 kilometriä Vilnasta lounaaseen.\n\n'
      + 'Kun Liettua palautti itsenäisyytensä 1990, valtaosa neuvostopatsaista purettiin ja '
      + 'kasattiin eri paikkoihin. Malinauskas pyysi viranomaisilta patsaita omistukseensa, '
      + 'jotta hän voisi rakentaa niistä yksityisrahoitteisen museon.\n\n'
      + 'Puiston perustaminen oli kiistanalaista ja kohtasi huomattavaa vastustusta, eikä '
      + 'kaikkia alkuperäisiä ajatuksia hyväksytty — esimerkiksi vierailijoiden kuljettamista '
      + 'gulag-tyylisellä junalla. Osa alueen piirteistä jäljittelee silti neuvostoleirejä: '
      + 'puupolkuja, vartiotorneja ja piikkilanka-aitoja.\n\n'
      + 'Näyttelyssä on 86 patsasta 46 kuvanveistäjältä, ja se on järjestetty aihepiireittäin. '
      + 'Puisto ja sen perustaja saivat vuoden 2001 Ig Nobel -rauhanpalkinnon.',
    lahde: 'en-Wikipedia "Grūtas Park", johdanto-osa sekä osiot "History" ja "Exposition" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'yhdeksas-fortti',
    nimi: 'Yhdeksäs fortti',
    tyyppi: 'historia',
    kysymykset: [
      'Mihin fortti alun perin rakennettiin?',
      'Miksi sitä alettiin kutsua kuoleman fortiksi?',
    ],
    korostukset: ['Kaunasin linnoitus|Kaunasin linnoitusta'],
    nappi: 'Linnoitus, josta tuli museo',
    // 23.8706 E / 54.9447 N — en-Wikipedia "Ninth Fort"
    laudat: {
      maailmankartta: { x: 6629, y: 1168.3 },
      europe: { x: 669.5, y: 448.6 },
    },
    teksti: 'Yhdeksäs fortti on linnoitus Kaunasin pohjoisosassa. Se on osa Kaunasin '
      + 'linnoitusta, joka rakennettiin 1800-luvun lopulla: vuoteen 1890 mennessä kaupunkia '
      + 'ympäröi kahdeksan forttia ja yhdeksän tykkipatteria. Yhdeksännen fortin '
      + 'rakentaminen alkoi 1902 — järjestysnumerosta tuli sen nimi — ja se valmistui juuri '
      + 'ennen ensimmäistä maailmansotaa.\n\n'
      + 'Vuodesta 1924 fortti toimi Kaunasin vankilana. Neuvostomiehityksen aikana '
      + '1940–1941 NKVD piti siellä poliittisia vankeja odottamassa siirtoa gulagin '
      + 'pakkotyöleireille.\n\n'
      + 'Saksan miehityksen aikana fortista tuli joukkomurhan paikka. Sinne kuljetettiin ja '
      + 'siellä surmattiin 45 000–50 000 juutalaista, useimmat Kaunasista ja etenkin '
      + 'Kaunasin getosta; myös Ranskasta, Itävallasta ja Saksasta tuotiin ihmisiä '
      + 'teloitettaviksi. Vuoteen 1944 mennessä paikkaa kutsuttiin kuoleman fortiksi.\n\n'
      + 'Sotien jälkeen neuvostoviranomaiset käyttivät forttia jälleen muutaman vuoden '
      + 'vankilana. Museo perustettiin vuonna 1958, ja 1960 alkoi joukkohautojen '
      + 'etsiminen, luettelointi ja oikeuslääketieteellinen tutkimus. Museon kokoelmat '
      + 'kertovat sekä neuvostorikoksista että natsien kansanmurhasta.',
    lahde: 'en-Wikipedia "Ninth Fort", johdanto-osa sekä osiot "History" ja "Museum" '
      + '(tarkistettu 6.9.2026).',
  },
];
