/*
 * MAASTOKOHTEET — FJI. Fidžin kohteet ja maasto napautettaviksi.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Fidžillä ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Oseania). Erä M2 antaa
 * maalle VIISI kohdetta ja kolme maastokohdetta; kaksi skandaalia asuu
 * js/packs/skandaalit.js:ssä.
 *
 * MIKSI VIISI EIKÄ KAHDEKSAN — JA MIKSI SE ON MITTA EIKÄ LAISKUUS.
 * Erän kiintiö on kahdeksan kohdetta, mutta Fidžin fokuslehden rajaus
 * on koko laudan pienimpiä: 137 × 146 lautayksikköä (js/packs/fokus-grc.js
 * FOKUS_POHJAT.FJI: x 11716,46…11853,33, y 3733,92…3879,80). Samaan
 * ikkunaan mahtuu jo nyt kymmenen merkkiä — viisi kohdetta, kolme
 * maastokohdetta ja kaksi skandaalia — ja ne ovat toisistaan 10–20
 * yksikön päässä. Yhdeksäs ja kymmenes merkki olisi mennyt naapurinsa
 * nimiön päälle (tools/tarkista-nimiolimitys.mjs), eli kartalle olisi
 * tullut sotkua eikä sisältöä. Vaje on kirjattu erän raporttiin.
 *
 * Karsituiksi tulivat siksi mm. Lautokan sokeritehdas (6,4 yksikköä
 * Nadin temppelistä), Tavunin linnavuori (2,9 yksikköä Sigatokan
 * dyyneistä), Tomanivi eli maan korkein huippu (7,2 yksikköä Suvasta,
 * eli käytännössä pelikaupungin kohdalla) ja Rewajoen suisto.
 *
 * ANTIMERIDIAANI TARKISTETTU. Maailmankartta on kiertävä
 * (js/packs/maailmankartta.js `kiertava: true`), ja Fidžin itäiset
 * saaret ylittävät 180. pituuspiirin. Laudan x lasketaan kaavalla
 * ((lon + 175) mod 360) · 33,33, joten 180° E antaa x 11833,3 ja
 * jatkuu siitä siististi kohti laudan reunaa 12000 — ei negatiivista
 * eikä yli laidan menevää arvoa. Taveuni (tasan 180°) osuu siis
 * rajauksen sisään, mutta Laun saariryhmä (n. 178,8° W eli x ≈ 11873)
 * jäisi rajauksen ULKOPUOLELLE, joten sieltä ei ole valittu mitään.
 *
 * YKSIKÄÄN EI OLE PELIKAUPUNGIN KOHDALLA. Fidžin ainoa pelikaupunki on
 * Suva (js/packs/maailmankartta.js CITIES). Lähin uusi merkki on
 * Vatukoula 12,1 lautayksikön päässä Suvasta; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js).
 *
 * Tiedoston paikka, reitti, projektio ja kuvattomuus on perusteltu
 * sisarpakissa js/packs/maastokohteet-aus.js — sama erä, sama ratkaisu.
 * Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_FJI = [
  /* ================================================================
   * K2-ERÄ M2, 6.9.2026 — VIISI KOHDETTA.
   * ============================================================== */
  {
    id: 'levuka',
    nimi: 'Levuka',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka kruunattiin Levukassa vuonna 1871?',
      'Miksi kaupunki on maailmanperintökohde?',
    ],
    korostukset: ['merimakkara|merimakkaran'],
    nappi: 'Pääkaupunki, joka jäi pieneksi kyläksi',
    // 178.8347 E / -17.6828 N — en-Wikipedia "Levuka" (artikkelilla ei ole
    // koordinaattipropia; piste on kaupungin kohdalla Ovalaun itärannikolla).
    // Lähin pelikaupunki Suva, 21,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11794.5, y: 3807 },
    },
    teksti: 'Levuka on kaupunki Ovalaun saaren itärannikolla, ja se oli Fidžin pääkaupunki '
      + 'vuoteen 1877 asti. Eurooppalaiset kauppiaat perustivat sen noin 1820, ja siitä tuli '
      + 'saariston ensimmäinen moderni kaupunki ja tärkeä satama. Väkeä kertyi sekalaisesti: '
      + 'kauppiaita, lähetyssaarnaajia, laivanrakentajia, keinottelijoita ja kulkureita. '
      + '1800-luvun puolivälissä kaupunki eli merimakkaran kaupasta, ja vuoteen 1870 mennessä '
      + 'asukkaita oli yli kaksituhatta. Kun Fidžin kuningaskunta perustettiin 1871, Seru '
      + 'Epenisa Cakobau kruunattiin kuninkaaksi juuri Levukassa. Unesco otti kaupungin '
      + 'maailmanperintöluetteloon kesäkuussa 2013 poikkeuksellisena esimerkkinä Tyynenmeren '
      + 'myöhäisistä siirtomaasatamakaupungeista.',
    lahde: 'en-Wikipedia "Levuka", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sigatokan-hiekkadyynit',
    nimi: 'Sigatokan dyynit',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhaa keramiikkaa dyyneistä on löydetty?',
      'Milloin dyyneistä tuli kansallispuisto?',
    ],
    korostukset: ['parabolinen|parabolisista'],
    nappi: 'Hiekka, joka paljastaa hautoja',
    // 177.47 E / -18.17 N — dyynit Sigatokajoen suulla; en-Wikipedia
    // "Sigatoka Sand Dunes" kertoo paikan mutta ei anna koordinaattia,
    // joten piste on valittu joen suulle (vrt. "Sigatoka" 177,507 / -18,141).
    // Lähin pelikaupunki Suva, 31,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11749, y: 3823.8 },
    },
    teksti: 'Sigatokan hiekkadyynien kansallispuisto on Sigatokajoen suulla Viti Levun saarella, '
      + 'noin kolme kilometriä Sigatokan kaupungista länteen. Dyynit ovat syntyneet rannikon '
      + 'takamaiden eroosiosta tuhansien vuosien aikana: 650 hehtaarin alue koostuu '
      + 'parabolisista eli puolikuun muotoisista dyyneistä, jotka ovat 20–60 metriä korkeita. '
      + 'Kaivauksissa on löytynyt yli 2 600 vuotta vanhaa keramiikkaa ja yksi Tyynenmeren '
      + 'suurimmista hautapaikoista, ja luonnon kuluttava työ paljastaa jatkuvasti lisää '
      + 'ruukunsirpaleita, kivityökaluja ja ihmisjäänteitä. Dyynit nimettiin Fidžin '
      + 'ensimmäiseksi kansallispuistoksi heinäkuussa 1989.',
    lahde: 'en-Wikipedia "Sigatoka Sand Dunes", johdanto-osa ja osio "National Park status" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'taveunin-pituuspiiri',
    nimi: 'Taveuni',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä viiva kulkee saaren yli?',
      'Kuinka monta tulivuorenkartiota saarella on?',
    ],
    korostukset: ['pituuspiiri|180. pituuspiiri'],
    nappi: 'Saari, joka on kahden pituusasteen puolella',
    // 180 E / -16.8 N — en-Wikipedia "Taveuni". Kiertävällä laudalla
    // ((180 + 175) mod 360) · 33,33 = 11833,3, eli lehden rajauksen sisällä.
    // Lähin pelikaupunki Suva, 66,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11833.3, y: 3776.7 },
    },
    teksti: 'Taveuni on Fidžin kolmanneksi suurin saari, 434 neliökilometriä, ja se on '
      + 'kokonaan tulivuoritoiminnan tulosta: pitkänomainen kilpitulivuori, joka on '
      + 'purkautunut merenpohjan halkeamasta. Saarta pisteittää noin 150 tulivuorenkartiota, '
      + 'joista Uluigalau on Fidžin toiseksi korkein huippu, 1 241 metriä. Purkauksia on ollut '
      + 'ainakin 58 sen jälkeen, kun ihmiset asettuivat saarelle noin 950–750 eaa., ja '
      + 'viimeisin laavavirta syntyi eteläkärkeen noin vuonna 1550. Erikoisin asia on '
      + 'kuitenkin viiva: 180. pituuspiiri kulkee saaren yli, joten sen koillisosa on 179 '
      + 'astetta läntistä pituutta ja lounaisosa 179 astetta itäistä. Se sekoittaa yhä '
      + 'paikkatieto-ohjelmia, jotka piirtävät saaren muodon maapallon ympäri.',
    lahde: 'en-Wikipedia "Taveuni", johdanto-osa sekä osiot "Geography" ja "Attractions" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sri-siva-subramaniya',
    nimi: 'Sri Siva Subramaniya',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka suuri temppeli on?',
      'Mikä järjestö perustettiin vanhassa temppelirakennuksessa?',
    ],
    korostukset: ['TISI Sangam|TISI Sangam'],
    nappi: 'Etelänpuoliskon suurin hindutemppeli',
    // 177.415 E / -17.8073 N — en-Wikipedia "Sri Siva Subramaniya Temple".
    // Lähin pelikaupunki Suva, 27,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11747.2, y: 3811.3 },
    },
    teksti: 'Sri Siva Subramaniya on hindutemppeli Nadissa, ja se on eteläisen pallonpuoliskon '
      + 'suurin hindutemppeli. Se seisoo Nadin pääkadun eteläpäässä ja on sekä indofidžiläisen '
      + 'yhteisön keskeinen uskonnollinen ja kulttuurinen paikka että suosittu matkailukohde. '
      + 'Vanha temppeli oli paikallaan pitkään, ja juuri sen rakennuksessa perustettiin '
      + 'vuonna 1926 TISI Sangam eli Then India Sanmarga Ikya Sangam. Uuden temppelin '
      + 'peruskivi laskettiin vanhalle paikalle 1976 järjestön kultaisen juhlavuoden aikana, '
      + 'ja rakennustyö alkoi 1984. Samana vuonna Tamil Nadun osavaltion hallitus lähetti '
      + 'temppelille pääpapiksi Shivacharya Mahalinga Gurukkalin, ja kävijämäärät nousivat '
      + 'jyrkästi.',
    lahde: 'en-Wikipedia "Sri Siva Subramaniya Temple", johdanto-osa sekä osiot "Historical '
      + 'background" ja "Construction of new temple" (tarkistettu 6.9.2026).',
  },
  {
    id: 'vatukoula',
    nimi: 'Vatukoula',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä nimi Vatukoula tarkoittaa?',
      'Kuinka paljon kullantuotanto kasvoi 1930-luvulla?',
    ],
    korostukset: ['Nasivi|Nasivi-joesta'],
    nappi: 'Kultakivi, joka veti koko saariston',
    // 177.8498 E / -17.5 N — en-Wikipedia "Vatukoula".
    // Lähin pelikaupunki Suva, 12,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11761.7, y: 3800.7 },
    },
    teksti: 'Vatukoula on kultakaivosyhdyskunta Viti Levun saarella yhdeksän kilometriä '
      + 'sisämaahan Tavuan kaupungista, ja nimi tarkoittaa fidžiksi kultakiveä. Ensimmäisen '
      + 'kultalöydön Tavuan piirissä teki Nasivi-joesta paroni de Este vuonna 1872, mutta '
      + 'kaupallisesti merkittävä esiintymä löytyi vasta 1932, ja löytö luetaan skotlantilaisen '
      + 'etsijän Bill Borthwickin ansioksi. Seurasi kultaryntäys: valtausmerkkejä nousi '
      + 'kaikkialle, ja kaivauksille tuli satoja ihmisiä kaikilta Fidžin saarilta — kyläläisiä, '
      + 'kauppiaita ja kaupunkilaisia. Tuotanto satakertaistui, 931 unssista vuonna 1934 '
      + 'lähes 107 800 unssiin vuonna 1939.',
    lahde: 'en-Wikipedia "Vatukoula", johdanto-osa ja osio "Colonial history" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * MAASTOKOHTEET — kolme kappaletta, tyypit meri ja saari.
   * ============================================================== */
  {
    id: 'bligh-water',
    nimi: 'Bligh Water',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka purjehti tästä avoveneellä?',
      'Miksi vene ei pysähtynyt Fidžille?',
    ],
    korostukset: ['Bounty|Bountyn'],
    nappi: 'Meri, jonka läpi paettiin avoveneellä',
    // 177.8532 E / -17.0107 N — en-Wikipedia "Bligh Water".
    // Lähin pelikaupunki Suva, 23,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11761.8, y: 3783.9 },
    },
    teksti: 'Bligh Water on noin 9 500 neliökilometrin merialue Fidžin läntisten saarten '
      + 'keskellä, ja se on nimetty luutnantti William Blighin mukaan. Kun Bountyn miehistö '
      + 'kaappasi laivan vuonna 1789 Fletcher Christianin johdolla, Bligh ja hänelle uskolliset '
      + 'miehet jätettiin seitsemänmetriseen avoveneeseen, ja he purjehtivat sillä Tofuasta '
      + 'Hollannin Timorin satamaan — 5 823 kilometriä. Matka kulki juuri tämän merialueen '
      + 'läpi. Bligh ei pysähtynyt Fidžille: osaa saarten heimoista pidettiin vihamielisinä ja '
      + 'monia kannibaaleina, eikä hän halunnut vaarantaa itseään ja miehiään. Nykyään alueen '
      + 'Vatu-i-Ran salmi on merensuojelualue ja tunnettu korallisukelluskohde.',
    lahde: 'en-Wikipedia "Bligh Water", johdanto-osa ja osio "Scuba diving the Bligh Water" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vanua-levu',
    nimi: 'Vanua Levu',
    tyyppi: 'saari',
    kysymykset: [
      'Millä nimellä saari tunnettiin ennen?',
      'Mikä on saaren korkein kohta?',
    ],
    korostukset: ['Santalipuusaari|Santalipuusaarena'],
    nappi: 'Iso maa, joka myytiin santalipuuna',
    // 179.1833 E / -16.5833 N — en-Wikipedia "Vanua Levu".
    // Lähin pelikaupunki Suva, 47,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11806.1, y: 3769.3 },
    },
    teksti: 'Vanua Levu on Fidžin toiseksi suurin saari, 5 587 neliökilometriä ja noin '
      + '160 000 asukasta, ja se on 64 kilometriä suuremman Viti Levun pohjoispuolella. Nimi '
      + 'tarkoittaa fidžiksi isoa maata, mutta aikoinaan saari tunnettiin Santalipuusaarena. '
      + 'Fidži on tektonisesti mutkikkaassa paikassa Australian ja Tyynenmeren laattojen '
      + 'välissä, ja saarta ympäröivät aktiiviset venymissiirrokset, joiden varrella suurin '
      + 'osa alueen matalista maanjäristyksistä sattuu. Saaren keskellä kohoaa Korotinin '
      + 'ylätasanko, jonka huippuihin kuuluu saaren korkein kohta Nasorolevu, 1 032 metriä.',
    lahde: 'en-Wikipedia "Vanua Levu", johdanto-osa ja osio "Geology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kadavu',
    nimi: 'Kadavu',
    tyyppi: 'saari',
    kysymykset: [
      'Missä kohtaa saari on kapeimmillaan?',
      'Montako saarelle kotoperäistä lintulajia siellä on?',
    ],
    korostukset: ['Suuri Astrolabe|Suuren Astrolaben'],
    nappi: 'Saari, joka on melkein kahtia',
    // 178.25 E / -19.05 N — en-Wikipedia "Kadavu Island".
    // Lähin pelikaupunki Suva, 49,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 11773.3, y: 3854.1 },
    },
    teksti: 'Kadavu on Fidžin neljänneksi suurin saari, 411 neliökilometriä, ja Kadavun '
      + 'saariryhmän suurin — tulivuoriperäisen saariryhmän, jota reunustaa Suuren Astrolaben '
      + 'riutta. Saari on 60 kilometriä pitkä mutta paikoin vain 365 metriä leveä, ja se on '
      + 'lähes kahtia kahdessa kohdassa: Vunisein ja Namalatan kannaksilla. Jälkimmäisellä on '
      + 'hallintokeskus Vunisea lentokenttineen, sairaaloineen ja kouluineen. Maasto on '
      + 'jylhää ja vuorista, ja korkein kohta on lännessä kohoava Nabukelevu eli Mount '
      + 'Washington, 805 metriä. Alkuperäisestä sademetsästä on jäljellä 75 prosenttia, ja '
      + 'saarella elää neljä kotoperäistä lintulajia.',
    lahde: 'en-Wikipedia "Kadavu Island", johdanto-osa sekä osiot "Geography" ja "Flora and '
      + 'fauna" (tarkistettu 6.9.2026).',
  },
];
