/*
 * Kohdekartan miniatyyripiirrokset (omistajan tilaus 15.8.2026:
 * "miniatyyrikuvat piirrettynä nähtävyyksistä ... Sama idea kuin
 * huvipuisto kartoissa"; "Tee piirrokset sinne [Berliiniin] ensin
 * sekä samat kolmeen kaupunkiin hki. Pariisi. Lontoo").
 *
 * Avaimet ovat samat kuin NAHTAVYYSJUTUT-taulussa: kaupungin tunnus →
 * kohteen NIMI → piirroksen polku. Miniatyyrikohde piirtyy kartalle
 * leikattuna kuvana numeron sijaan, ja napautus on kaksivaiheinen:
 * ensin piirros isona (lehdessä paikallaan, kokoruudulla omana
 * korttinaan — js/nahtavyydet.js), sitten juttu. Kaupunki tai kohde
 * ilman miniatyyriä toimii entiseen tapaan: napautus suoraan juttuun.
 *
 * Kuvat generoidaan tools/generoi-miniatyyrit.mjs:llä ja KATSOTAAN
 * SILMIN ennen tähän tauluun lisäämistä — tests/miniatyyrit.test.mjs
 * valvoo, että jokainen polku on olemassa ja jokainen nimi vastaa
 * kartan kohdetta.
 *
 * ARVOJA ON KAHTA LAJIA (omistajan päätös 2.9.2026: "R2-ämpäriin,
 * JPG-muodossa"):
 *
 *   'assets/kartat/miniatyyrit/x.webp'  vanha repokopio. Nämä siirtyvät
 *                                       ämpäriin erissä
 *                                       (.github/workflows/vie-assetit.yml),
 *                                       eikä yksikään rivi muutu siitä:
 *                                       kytkin on js/media.js R2_ASSETIT.
 *   'ateena-akropolis-museo'            pelkkä TUNNUS. Kuva on vain
 *                                       ämpärissä PNG:nä (alfakanava,
 *                                       syvätty) polussa
 *                                       kohtaamiset/miniatyyrit/<tunnus>.png,
 *                                       eikä repossa ole kopiota.
 *
 * Osoitteen laskee js/media.js assetOsoite — tämä taulu ei tiedä
 * ämpäristä mitään. Tunnus on aina `<kaupunki>-<slug kohteen nimestä>`,
 * ja tunnuksen saa lisätä tauluun ENNEN kuin kuva on ämpärissä: puuttuva
 * kuva pudottaa kartan merkin varatäpläksi (js/nahtavyydet.js), eli
 * kohde näkyy ja toimii kuten ennen piirroksia.
 */

export const MINIATYYRIT = {
  berliini: {
    Valtiopäivätalo: 'assets/kartat/miniatyyrit/berliini-valtiopaivatalo.webp',
    'Brandenburgin portti': 'assets/kartat/miniatyyrit/berliini-brandenburgin-portti.webp',
    'Checkpoint Charlie': 'assets/kartat/miniatyyrit/berliini-checkpoint-charlie.webp',
    Museosaari: 'assets/kartat/miniatyyrit/berliini-museosaari.webp',
    'Tv-torni': 'assets/kartat/miniatyyrit/berliini-tv-torni.webp',
    'East Side Gallery': 'assets/kartat/miniatyyrit/berliini-east-side-gallery.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Lehmän hinnalla': 'berliini-lehman-hinnalla',
    'Berliinin karhu': 'berliini-berliinin-karhu',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kulta-Liisa': 'berliini-kulta-liisa',
    'Hobrechtin putket': 'berliini-hobrechtin-putket',
  },
  helsinki: {
    'Temppeliaukion kirkko': 'assets/kartat/miniatyyrit/helsinki-temppeliaukion-kirkko.webp',
    Linnanmäki: 'assets/kartat/miniatyyrit/helsinki-linnanmaki.webp',
    Päärautatieasema: 'assets/kartat/miniatyyrit/helsinki-paarautatieasema.webp',
    'Kaisaniemen puisto': 'assets/kartat/miniatyyrit/helsinki-kaisaniemen-puisto.webp',
    'Kallion kirkko': 'assets/kartat/miniatyyrit/helsinki-kallion-kirkko.webp',
    Tuomiokirkko: 'assets/kartat/miniatyyrit/helsinki-tuomiokirkko.webp',
    'Uspenskin katedraali': 'assets/kartat/miniatyyrit/helsinki-uspenskin-katedraali.webp',
    Johanneksenkirkko: 'assets/kartat/miniatyyrit/helsinki-johanneksenkirkko.webp',
    Suomenlinna: 'assets/kartat/miniatyyrit/helsinki-suomenlinna.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Löyly ja avanto': 'helsinki-loyly-ja-avanto',
    Kantele: 'helsinki-kantele',
    Finlandia: 'helsinki-finlandia',
    Pirtukuningas: 'helsinki-pirtukuningas',
    'Nurmen kohu': 'helsinki-nurmen-kohu',
  },
  pariisi: {
    'Eiffel-torni': 'assets/kartat/miniatyyrit/pariisi-eiffel-torni.webp',
    Riemukaari: 'assets/kartat/miniatyyrit/pariisi-riemukaari.webp',
    'Concorden aukio': 'assets/kartat/miniatyyrit/pariisi-concorden-aukio.webp',
    Louvre: 'assets/kartat/miniatyyrit/pariisi-louvre.webp',
    'Luxembourgin puisto': 'assets/kartat/miniatyyrit/pariisi-luxembourgin-puisto.webp',
    'Sacré-Cœur': 'assets/kartat/miniatyyrit/pariisi-sacre-coeur.webp',
    Panthéon: 'assets/kartat/miniatyyrit/pariisi-pantheon.webp',
    'Notre-Dame': 'assets/kartat/miniatyyrit/pariisi-notre-dame.webp',
    // Paketti O4 (16.8.2026). Orsay vaati kolme yritystä: yleinen
    // pikkuasema, matala laatikko ja vasta kolmantena talon
    // tunnusmerkki eli koko pituudelta kaartuva lasikatto.
    'Orsayn taidemuseo': 'assets/kartat/miniatyyrit/pariisi-orsayn-taidemuseo.webp',
    'Palais Garnier': 'assets/kartat/miniatyyrit/pariisi-palais-garnier.webp',
    'Place des Vosges': 'assets/kartat/miniatyyrit/pariisi-place-des-vosges.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Carmenin ensi-ilta': 'pariisi-carmenin-ensi-ilta',
    'Kirahvin kävelymatka': 'pariisi-kirahvin-kavelymatka',
    'Torni romuraudaksi': 'pariisi-torni-romuraudaksi',
    'Vrain-Lucas': 'pariisi-vrain-lucas',
    Impressionistit: 'pariisi-impressionistit',
    Kyyhkyposti: 'pariisi-kyyhkyposti',
    'Tuileriain rauniot': 'pariisi-tuileriain-rauniot',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Bastilji: 'pariisi-bastilji',
  },
  lontoo: {
    'Buckinghamin palatsi': 'assets/kartat/miniatyyrit/lontoo-buckinghamin-palatsi.webp',
    'Trafalgar Square': 'assets/kartat/miniatyyrit/lontoo-trafalgar-square.webp',
    'Big Ben': 'assets/kartat/miniatyyrit/lontoo-big-ben.webp',
    'Lontoon silmä': 'assets/kartat/miniatyyrit/lontoo-lontoon-silma.webp',
    'Pyhän Paavalin katedraali': 'assets/kartat/miniatyyrit/lontoo-pyhan-paavalin-katedraali.webp',
    'Tower Bridge': 'assets/kartat/miniatyyrit/lontoo-tower-bridge.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Etelämeren kupla': 'lontoo-etelameren-kupla',
    'Cheapsiden kätkö': 'lontoo-cheapsiden-katko',
    'Thamesin vuorovesi': 'lontoo-thamesin-vuorovesi',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vanha London Bridge': 'lontoo-vanha-london-bridge',
  },
  // Eurooppa-erä 1 (omistajan tilaus 15.8.2026: "Lisää kartta
  // muihinkin Euroopan kaupunkeihin. Tee 5 erissä" ja "Aloita
  // Kööpenhaminasta").
  kobenhavn: {
    'Pieni merenneito': 'assets/kartat/miniatyyrit/kobenhavn-pieni-merenneito.webp',
    Amalienborg: 'assets/kartat/miniatyyrit/kobenhavn-amalienborg.webp',
    Rundetårn: 'assets/kartat/miniatyyrit/kobenhavn-rundetarn.webp',
    Nyhavn: 'assets/kartat/miniatyyrit/kobenhavn-nyhavn.webp',
    'Christiansborgin linna': 'assets/kartat/miniatyyrit/kobenhavn-christiansborg.webp',
    Tivoli: 'assets/kartat/miniatyyrit/kobenhavn-tivoli.webp',
    'Vapahtajan kirkko': 'assets/kartat/miniatyyrit/kobenhavn-vapahtajan-kirkko.webp',
    'Rosenborgin linna': 'assets/kartat/miniatyyrit/kobenhavn-rosenborgin-linna.webp',
    Kastellet: 'assets/kartat/miniatyyrit/kobenhavn-kastellet.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Tivolin portti': 'kobenhavn-tivolin-portti',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vararikko 1813': 'kobenhavn-vararikko-1813',
    Alberti: 'kobenhavn-alberti',
  },
  rooma: {
    Pietarinkirkko: 'assets/kartat/miniatyyrit/rooma-pietarinkirkko.webp',
    'Castel Sant’Angelo': 'assets/kartat/miniatyyrit/rooma-castel-santangelo.webp',
    'Espanjalaiset portaat': 'assets/kartat/miniatyyrit/rooma-espanjalaiset-portaat.webp',
    'Trevin suihkulähde': 'assets/kartat/miniatyyrit/rooma-trevin-suihkulahde.webp',
    Pantheon: 'assets/kartat/miniatyyrit/rooma-pantheon.webp',
    Colosseum: 'assets/kartat/miniatyyrit/rooma-colosseum.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Torre Argentina': 'rooma-torre-argentina',
    'Vatikaanin palatsi': 'rooma-vatikaanin-palatsi',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Forum Romanum': 'rooma-forum-romanum',
    'Banca Romana': 'rooma-banca-romana',
  },
  wien: {
    Raatihuone: 'assets/kartat/miniatyyrit/wien-raatihuone.webp',
    Hofburg: 'assets/kartat/miniatyyrit/wien-hofburg.webp',
    Valtionooppera: 'assets/kartat/miniatyyrit/wien-valtionooppera.webp',
    Stephansdom: 'assets/kartat/miniatyyrit/wien-stephansdom.webp',
    Belvedere: 'assets/kartat/miniatyyrit/wien-belvedere.webp',
    Jättiratas: 'assets/kartat/miniatyyrit/wien-jattiratas.webp',
    Schönbrunn: 'assets/kartat/miniatyyrit/wien-schonbrunn.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    Vuoristovesijohto: 'wien-vuoristovesijohto',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Klimtin maalaukset': 'wien-klimtin-maalaukset',
    Saliera: 'wien-saliera',
  },
  praha: {
    'Petřínin näkötorni': 'assets/kartat/miniatyyrit/praha-petrinin-nakotorni.webp',
    'Prahan linna': 'assets/kartat/miniatyyrit/praha-prahan-linna.webp',
    Kaarlensilta: 'assets/kartat/miniatyyrit/praha-kaarlensilta.webp',
    'Vanhauusi synagoga': 'assets/kartat/miniatyyrit/praha-vanhauusi-synagoga.webp',
    'Astronominen kello': 'assets/kartat/miniatyyrit/praha-astronominen-kello.webp',
    Kansallismuseo: 'assets/kartat/miniatyyrit/praha-kansallismuseo.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    Klementinum: 'praha-klementinum',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Tycho Brahe': 'praha-tycho-brahe',
  },
  amsterdam: {
    Keskusrautatieasema: 'assets/kartat/miniatyyrit/amsterdam-keskusrautatieasema.webp',
    'Anne Frankin talo': 'assets/kartat/miniatyyrit/amsterdam-anne-frankin-talo.webp',
    Kuninkaanpalatsi: 'assets/kartat/miniatyyrit/amsterdam-kuninkaanpalatsi.webp',
    'Rembrandtin talo': 'assets/kartat/miniatyyrit/amsterdam-rembrandtin-talo.webp',
    'Artis-eläintarha': 'assets/kartat/miniatyyrit/amsterdam-artis-elaintarha.webp',
    Rijksmuseum: 'assets/kartat/miniatyyrit/amsterdam-rijksmuseum.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Timanttihiomo: 'amsterdam-timanttihiomo',
    'Amsterdam-laiva': 'amsterdam-amsterdam-laiva',
  },
  tukholma: {
    Kaupungintalo: 'assets/kartat/miniatyyrit/tukholma-kaupungintalo.webp',
    'Riddarholmenin kirkko': 'assets/kartat/miniatyyrit/tukholma-riddarholmenin-kirkko.webp',
    'Sergelin tori': 'assets/kartat/miniatyyrit/tukholma-sergelin-tori.webp',
    Kuninkaanlinna: 'assets/kartat/miniatyyrit/tukholma-kuninkaanlinna.webp',
    'Vasa-museo': 'assets/kartat/miniatyyrit/tukholma-vasa-museo.webp',
    Skansen: 'assets/kartat/miniatyyrit/tukholma-skansen.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Vädersolstavlan': 'tukholma-vadersolstavlan',
    'Norrström': 'tukholma-norrstrom',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Setelipankki: 'tukholma-setelipankki',
    Naamiaislaukaus: 'tukholma-naamiaislaukaus',
    Kreuger: 'tukholma-kreuger',
  },
  /*
   * Erät 1–2 Euroopan ulkopuolelle ja Suomeen (17.8.2026); neljä
   * katselmoinnissa hylättyä generoitiin uudelleen korjatuin
   * promptein erässä 3 (18.8.2026) ja ovat nyt mukana. Kohde ilman
   * miniatyyriä toimii entiseen tapaan, joten aukot eivät riko
   * karttaa.
   */
  tampere: {
    'Tampereen tuomiokirkko': 'assets/kartat/miniatyyrit/tampere-tampereen-tuomiokirkko.webp',
    Näsinneula: 'assets/kartat/miniatyyrit/tampere-nasinneula.webp',
    'Finlaysonin tehdasalue': 'assets/kartat/miniatyyrit/tampere-finlaysonin-tehdasalue.webp',
    'Museokeskus Vapriikki': 'assets/kartat/miniatyyrit/tampere-museokeskus-vapriikki.webp',
    Hämeensilta: 'assets/kartat/miniatyyrit/tampere-hameensilta.webp',
    'Pyynikin näkötorni': 'assets/kartat/miniatyyrit/tampere-pyynikin-nakotorni.webp',
    'Amurin työläismuseokortteli': 'assets/kartat/miniatyyrit/tampere-amurin-tyolaismuseokortteli.webp',
    'Tallipiha': 'assets/kartat/miniatyyrit/tampere-tallipiha.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Finlayson: 'tampere-finlayson',
    Tuomiokirkko: 'tampere-tuomiokirkko',
  },
  firenze: {
    Duomo: 'assets/kartat/miniatyyrit/firenze-duomo.webp',
    'Palazzo Vecchio': 'assets/kartat/miniatyyrit/firenze-palazzo-vecchio.webp',
    Uffizi: 'assets/kartat/miniatyyrit/firenze-uffizi.webp',
    'Ponte Vecchio': 'assets/kartat/miniatyyrit/firenze-ponte-vecchio.webp',
    'Santa Croce': 'assets/kartat/miniatyyrit/firenze-santa-croce.webp',
    'Bobolin puutarha': 'assets/kartat/miniatyyrit/firenze-bobolin-puutarha.webp',
    'Bargello': 'assets/kartat/miniatyyrit/firenze-bargello.webp',
    "Galleria dell'Accademia": 'assets/kartat/miniatyyrit/firenze-galleria-dellaccademia.webp',
    'Santa Maria Novella': 'assets/kartat/miniatyyrit/firenze-santa-maria-novella.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Poggin terassi': 'firenze-poggin-terassi',
    Porcellino: 'firenze-porcellino',
  },
  bagdad: {
    'Mutanabbin katu': 'assets/kartat/miniatyyrit/bagdad-mutanabbin-katu.webp',
    'Qushlan kellotorni': 'assets/kartat/miniatyyrit/bagdad-qushlan-kellotorni.webp',
    Abbasidipalatsi: 'assets/kartat/miniatyyrit/bagdad-abbasidipalatsi.webp',
    'Khan Mirjan': 'assets/kartat/miniatyyrit/bagdad-khan-mirjan.webp',
    'Mustansiriya-koulu': 'assets/kartat/miniatyyrit/bagdad-mustansiriya-koulu.webp',
    'Bagdadin museo': 'assets/kartat/miniatyyrit/bagdad-bagdadin-museo.webp',
    'al-Wazirin moskeija': 'assets/kartat/miniatyyrit/bagdad-al-wazirin-moskeija.webp',
    'Haydarkhanan moskeija': 'assets/kartat/miniatyyrit/bagdad-haydarkhanan-moskeija.webp',
  },
  teheran: {
    'Teheranin basaari': 'assets/kartat/miniatyyrit/teheran-teheranin-basaari.webp',
    'Golestanin palatsi': 'assets/kartat/miniatyyrit/teheran-golestanin-palatsi.webp',
    'Dar al-Fonun': 'assets/kartat/miniatyyrit/teheran-dar-al-fonun.webp',
    'Iranin kansallismuseo': 'assets/kartat/miniatyyrit/teheran-iranin-kansallismuseo.webp',
    'Masoudiehin talo': 'assets/kartat/miniatyyrit/teheran-masoudiehin-talo.webp',
    'Sepahsalarin moskeija': 'assets/kartat/miniatyyrit/teheran-sepahsalarin-moskeija.webp',
    'Bagh-e Mellin portti': 'assets/kartat/miniatyyrit/teheran-bagh-e-mellin-portti.webp',
    'Toopkhanen aukio': 'assets/kartat/miniatyyrit/teheran-toopkhanen-aukio.webp',
  },
  tripoli: {
    'Darghutin moskeija': 'assets/kartat/miniatyyrit/tripoli-darghutin-moskeija.webp',
    'Vanhankaupungin kellotorni': 'assets/kartat/miniatyyrit/tripoli-vanhankaupungin-kellotorni.webp',
    'Karamanlin moskeija': 'assets/kartat/miniatyyrit/tripoli-karamanlin-moskeija.webp',
    'an-Naqan moskeija': 'assets/kartat/miniatyyrit/tripoli-an-naqan-moskeija.webp',
    'Marcus Aureliuksen riemukaari': 'assets/kartat/miniatyyrit/tripoli-marcus-aureliuksen-riemukaari.webp',
    'Punainen linna': 'assets/kartat/miniatyyrit/tripoli-punainen-linna.webp',
    'Gurgin moskeija': 'assets/kartat/miniatyyrit/tripoli-gurgin-moskeija.webp',
  },
  tokio: {
    Kaminarimon: 'assets/kartat/miniatyyrit/tokio-kaminarimon.webp',
    'Sensō-ji': 'assets/kartat/miniatyyrit/tokio-senso-ji.webp',
    "Kan'ei-ji": 'assets/kartat/miniatyyrit/tokio-kanei-ji.webp',
    'Tokion kansallismuseo': 'assets/kartat/miniatyyrit/tokio-tokion-kansallismuseo.webp',
    'Uenon puisto': 'assets/kartat/miniatyyrit/tokio-uenon-puisto.webp',
    'Shitamachi-museo': 'assets/kartat/miniatyyrit/tokio-shitamachi-museo.webp',
    'Hanayashiki': 'assets/kartat/miniatyyrit/tokio-hanayashiki.webp',
    'Kyū-Iwasaki-tei': 'assets/kartat/miniatyyrit/tokio-kyu-iwasaki-tei.webp',
    'Ueno Tōshō-gū': 'assets/kartat/miniatyyrit/tokio-ueno-tosho-gu.webp',
    'Uenon asema': 'assets/kartat/miniatyyrit/tokio-uenon-asema.webp',
  },
  soul: {
    Gyeongbokgung: 'assets/kartat/miniatyyrit/soul-gyeongbokgung.webp',
    'Bukchonin hanok-kylä': 'assets/kartat/miniatyyrit/soul-bukchonin-hanok-kyla.webp',
    Changdeokgung: 'assets/kartat/miniatyyrit/soul-changdeokgung.webp',
    Jongmyo: 'assets/kartat/miniatyyrit/soul-jongmyo.webp',
    'Tapgol-puisto': 'assets/kartat/miniatyyrit/soul-tapgol-puisto.webp',
    Bosingak: 'assets/kartat/miniatyyrit/soul-bosingak.webp',
    'Gwanghwamun': 'assets/kartat/miniatyyrit/soul-gwanghwamun.webp',
    'Insadong': 'assets/kartat/miniatyyrit/soul-insadong.webp',
    'Jogyesa': 'assets/kartat/miniatyyrit/soul-jogyesa.webp',
  },
  shanghai: {
    Bund: 'assets/kartat/miniatyyrit/shanghai-bund.webp',
    'Waibaidun silta': 'assets/kartat/miniatyyrit/shanghai-waibaidun-silta.webp',
    Rauhanhotelli: 'assets/kartat/miniatyyrit/shanghai-rauhanhotelli.webp',
    'Yu-puutarha': 'assets/kartat/miniatyyrit/shanghai-yu-puutarha.webp',
    'Nanjing-katu': 'assets/kartat/miniatyyrit/shanghai-nanjing-katu.webp',
    'Shanghain museo': 'assets/kartat/miniatyyrit/shanghai-shanghain-museo.webp',
    'Dajingin pavilonki': 'assets/kartat/miniatyyrit/shanghai-dajingin-pavilonki.webp',
    'Fuyoun moskeija': 'assets/kartat/miniatyyrit/shanghai-fuyoun-moskeija.webp',
    'Kaupunginjumalan temppeli': 'assets/kartat/miniatyyrit/shanghai-kaupunginjumalan-temppeli.webp',
  },
  // Erä 4 (18.8.2026): Kairon lehden viimeistely — kaikki 10 kohdetta.
  kairo: {
    'Kairon torni': 'assets/kartat/miniatyyrit/kairo-kairon-torni.webp',
    'Egyptin museo': 'assets/kartat/miniatyyrit/kairo-egyptin-museo.webp',
    'Tahririn aukio': 'assets/kartat/miniatyyrit/kairo-tahririn-aukio.webp',
    'Abdeenin palatsi': 'assets/kartat/miniatyyrit/kairo-abdeenin-palatsi.webp',
    'Ibn Tulunin moskeija': 'assets/kartat/miniatyyrit/kairo-ibn-tulunin-moskeija.webp',
    'Sulttaani Hassanin moskeija': 'assets/kartat/miniatyyrit/kairo-sulttaani-hassanin-moskeija.webp',
    'Bab Zuweila': 'assets/kartat/miniatyyrit/kairo-bab-zuweila.webp',
    'Saladinin linnoitus': 'assets/kartat/miniatyyrit/kairo-saladinin-linnoitus.webp',
    'Khan el-Khalili': 'assets/kartat/miniatyyrit/kairo-khan-el-khalili.webp',
    'Al-Azhar-puisto': 'assets/kartat/miniatyyrit/kairo-al-azhar-puisto.webp',
  },
  // Akvarellierä (23.8.2026): Dubain ja Istanbulin kohdekartat saivat
  // ensimmäiset miniatyyrinsä suoraan akvarelleina.
  dubai: {
    'Kultasuuk': 'assets/kartat/miniatyyrit/dubai-kultasuuk.webp',
    'Dhow-satama': 'assets/kartat/miniatyyrit/dubai-dhow-satama.webp',
    'Al Shindagha': 'assets/kartat/miniatyyrit/dubai-al-shindagha.webp',
    'Abra-laiturit': 'assets/kartat/miniatyyrit/dubai-abra-laiturit.webp',
    'Bastakian kaupunginosa': 'assets/kartat/miniatyyrit/dubai-bastakian-kaupunginosa.webp',
    'Al Fahidin linnoitus': 'assets/kartat/miniatyyrit/dubai-al-fahidin-linnoitus.webp',
    'Al Ahmadiyan koulu': 'assets/kartat/miniatyyrit/dubai-al-ahmadiyan-koulu.webp',
    'Maustesuuk': 'assets/kartat/miniatyyrit/dubai-maustesuuk.webp',
    'Suuri moskeija': 'assets/kartat/miniatyyrit/dubai-suuri-moskeija.webp',
    'Tekstiilisuuk': 'assets/kartat/miniatyyrit/dubai-tekstiilisuuk.webp',
  },
  istanbul: {
    'Suuri basaari': 'assets/kartat/miniatyyrit/istanbul-suuri-basaari.webp',
    'Sininen moskeija': 'assets/kartat/miniatyyrit/istanbul-sininen-moskeija.webp',
    'Hagia Sofia': 'assets/kartat/miniatyyrit/istanbul-hagia-sofia.webp',
    'Topkapın palatsi': 'assets/kartat/miniatyyrit/istanbul-topkapin-palatsi.webp',
    'Galatan torni': 'assets/kartat/miniatyyrit/istanbul-galatan-torni.webp',
    'Üsküdar': 'assets/kartat/miniatyyrit/istanbul-uskudar.webp',
    'Süleymaniyen moskeija': 'assets/kartat/miniatyyrit/istanbul-suleymaniyen-moskeija.webp',
    'Galatan silta': 'assets/kartat/miniatyyrit/istanbul-galatan-silta.webp',
    'Sirkecin asema': 'assets/kartat/miniatyyrit/istanbul-sirkecin-asema.webp',
    'Neitsyttorni': 'assets/kartat/miniatyyrit/istanbul-neitsyttorni.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Vararikko 1875': 'istanbul-vararikko-1875',
    'Camondon portaat': 'istanbul-camondon-portaat',
    'Käärmepylväs': 'istanbul-kaarmepylvas',
  },
  /*
   * New York (kohdekartta v1065). Kymmenestä kohteesta yhdeksän sai
   * hyväksytyn akvarellin; Times Square jäi ilman, koska generoitu
   * kuva luki geneerisenä eurooppalaisena kulmakorttelina eikä
   * aukiona — kohde näkyy kartalla numeroympyränä, kunnes uusinta
   * onnistuu.
   */
  newyork: {
    'Amerikan luonnonhistoriallinen museo': 'assets/kartat/miniatyyrit/newyork-luonnonhistoriallinen-museo.webp',
    'Metropolitan-museo': 'assets/kartat/miniatyyrit/newyork-metropolitan-museo.webp',
    'Pyhän Patrickin katedraali': 'assets/kartat/miniatyyrit/newyork-pyhan-patrickin-katedraali.webp',
    'New Yorkin pääkirjasto': 'assets/kartat/miniatyyrit/newyork-paakirjasto.webp',
    'Empire State Building': 'assets/kartat/miniatyyrit/newyork-empire-state-building.webp',
    'Flatiron Building': 'assets/kartat/miniatyyrit/newyork-flatiron-building.webp',
    'Washington Squaren riemukaari': 'assets/kartat/miniatyyrit/newyork-washington-squaren-riemukaari.webp',
    'New Yorkin kaupungintalo': 'assets/kartat/miniatyyrit/newyork-kaupungintalo.webp',
    'Trinity Church': 'assets/kartat/miniatyyrit/newyork-trinity-church.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Times Square': 'newyork-times-square',
  },
  /*
   * Erä 1 Balkanin ja Kreikan kohdekartoille (v1156:n promptit,
   * generoi-miniatyyrit.yml 26.8.2026). Kaikki 25 katsottu silmin ja
   * hyväksytty — NDK:n taustaharja on Vitoša ja rotundan haaleat
   * viivatalot presidentinlinnan sisäpiha, molemmat tarkoituksella.
   */
  ateena: {
    'Antiikin agora': 'assets/kartat/miniatyyrit/ateena-antiikin-agora.webp',
    Akropolis: 'assets/kartat/miniatyyrit/ateena-akropolis.webp',
    'Zeuksen temppeli': 'assets/kartat/miniatyyrit/ateena-zeuksen-temppeli.webp',
    'Sýntagman aukio': 'assets/kartat/miniatyyrit/ateena-syntagman-aukio.webp',
    'Lykavittós': 'assets/kartat/miniatyyrit/ateena-lykavittos.webp',
    Kallimarmaro: 'assets/kartat/miniatyyrit/ateena-kallimarmaro.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Akropolis-museo': 'ateena-akropolis-museo',
    'Iliou Melathron': 'ateena-iliou-melathron',
    Maratonhuijaus: 'ateena-maratonhuijaus',
    'Elginin marmorit': 'ateena-elginin-marmorit',
    'Diogeneen astia': 'ateena-diogeneen-astia',
    'Niken temppeli': 'ateena-niken-temppeli',
  },
  sofia: {
    'Mineraalikylpylä': 'assets/kartat/miniatyyrit/sofia-mineraalikylpyla.webp',
    'Pyhän Yrjön rotunda': 'assets/kartat/miniatyyrit/sofia-pyhan-yrjon-rotunda.webp',
    'Sofian katedraali': 'assets/kartat/miniatyyrit/sofia-sofian-katedraali.webp',
    'Sofian yliopisto': 'assets/kartat/miniatyyrit/sofia-sofian-yliopisto.webp',
    'Borisovan puutarha': 'assets/kartat/miniatyyrit/sofia-borisovan-puutarha.webp',
    Kansalliskulttuuripalatsi: 'assets/kartat/miniatyyrit/sofia-kansalliskulttuuripalatsi.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Banja Bashin moskeija': 'sofia-banja-bashin-moskeija',
    'Serdican areena': 'sofia-serdican-areena',
    'Sofia-patsas': 'sofia-sofia-patsas',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Levski: 'sofia-levski',
    Ruhtinaskaappaus: 'sofia-ruhtinaskaappaus',
    Vihellyskonsertti: 'sofia-vihellyskonsertti',
  },
  bukarest: {
    'Romanian ateneum': 'assets/kartat/miniatyyrit/bukarest-romanian-ateneum.webp',
    'Cișmigiun puutarha': 'assets/kartat/miniatyyrit/bukarest-cismigiun-puutarha.webp',
    'Yliopiston aukio': 'assets/kartat/miniatyyrit/bukarest-yliopiston-aukio.webp',
    'Stavropoleoksen kirkko': 'assets/kartat/miniatyyrit/bukarest-stavropoleoksen-kirkko.webp',
    'Vanha ruhtinaanhovi': 'assets/kartat/miniatyyrit/bukarest-vanha-ruhtinaanhovi.webp',
    Parlamenttipalatsi: 'assets/kartat/miniatyyrit/bukarest-parlamenttipalatsi.webp',
    'Antipan museo': 'assets/kartat/miniatyyrit/bukarest-antipan-museo.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Szathmárin studio': 'bukarest-szathmarin-studio',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Colțean torni': 'bukarest-coltean-torni',
    Kultakana: 'bukarest-kultakana',
  },
  sarajevo: {
    'Sarajevon katedraali': 'assets/kartat/miniatyyrit/sarajevo-sarajevon-katedraali.webp',
    'Gazi Husrev-begin moskeija': 'assets/kartat/miniatyyrit/sarajevo-gazi-husrev-begin-moskeija.webp',
    'Baščaršija': 'assets/kartat/miniatyyrit/sarajevo-bascarsija.webp',
    'Vijećnica': 'assets/kartat/miniatyyrit/sarajevo-vijecnica.webp',
    Latinalaissilta: 'assets/kartat/miniatyyrit/sarajevo-latinalaissilta.webp',
    'Keltainen linnake': 'assets/kartat/miniatyyrit/sarajevo-keltainen-linnake.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Inat kuća': 'sarajevo-inat-kuca',
  },
  /*
   * Erä 2 läntiseen ja keskiseen Eurooppaan (generoi-miniatyyrit.yml
   * 26.8.2026). Kaikki 25 katsottu silmin ja hyväksytty — tunnusmerkit
   * osuvat (Rossion aaltokiveys, kauppahallin Zsolnay-katto, Puerta
   * del Solin karhupatsas, Sigismundin pylväs linnanaukiolla).
   */
  madrid: {
    Kuninkaanlinna: 'assets/kartat/miniatyyrit/madrid-kuninkaanlinna.webp',
    'Plaza Mayor': 'assets/kartat/miniatyyrit/madrid-plaza-mayor.webp',
    'Puerta del Sol': 'assets/kartat/miniatyyrit/madrid-puerta-del-sol.webp',
    'Cibeleen aukio': 'assets/kartat/miniatyyrit/madrid-cibeleen-aukio.webp',
    'Prado-museo': 'assets/kartat/miniatyyrit/madrid-prado-museo.webp',
    'Alcalán portti': 'assets/kartat/miniatyyrit/madrid-alcalan-portti.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Tasavallan vuosi': 'madrid-tasavallan-vuosi',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Casa de Fieras': 'madrid-casa-de-fieras',
    'Filipin patsas': 'madrid-filipin-patsas',
    Baldomera: 'madrid-baldomera',
  },
  lissabon: {
    'Glórian köysirata': 'assets/kartat/miniatyyrit/lissabon-glorian-koysirata.webp',
    Rossio: 'assets/kartat/miniatyyrit/lissabon-rossio.webp',
    'São Jorgen linna': 'assets/kartat/miniatyyrit/lissabon-sao-jorgen-linna.webp',
    Tuomiokirkko: 'assets/kartat/miniatyyrit/lissabon-tuomiokirkko.webp',
    Kauppatori: 'assets/kartat/miniatyyrit/lissabon-kauppatori.webp',
    Kansallispanteoni: 'assets/kartat/miniatyyrit/lissabon-kansallispanteoni.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Calçada': 'lissabon-calcada',
    'Largo da Severa': 'lissabon-largo-da-severa',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Alves dos Reis': 'lissabon-alves-dos-reis',
    'Ultimaatum 1890': 'lissabon-ultimaatum-1890',
    'Kolumbus 1484': 'lissabon-kolumbus-1484',
  },
  budapest: {
    Kalastajanlinnake: 'assets/kartat/miniatyyrit/budapest-kalastajanlinnake.webp',
    Ketjusilta: 'assets/kartat/miniatyyrit/budapest-ketjusilta.webp',
    Parlamenttitalo: 'assets/kartat/miniatyyrit/budapest-parlamenttitalo.webp',
    'Gellértinvuori': 'assets/kartat/miniatyyrit/budapest-gellertinvuori.webp',
    'Pyhän Tapanin kirkko': 'assets/kartat/miniatyyrit/budapest-pyhan-tapanin-kirkko.webp',
    'Suuri kauppahalli': 'assets/kartat/miniatyyrit/budapest-suuri-kauppahalli.webp',
    'Sankarien aukio': 'assets/kartat/miniatyyrit/budapest-sankarien-aukio.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Maanalainen: 'budapest-maanalainen',
    'Elmyr de Hory': 'budapest-elmyr-de-hory',
    'Seuson hopeat': 'budapest-seuson-hopeat',
  },
  varsova: {
    'Vanhankaupungin tori': 'assets/kartat/miniatyyrit/varsova-vanhankaupungin-tori.webp',
    'Varsovan linna': 'assets/kartat/miniatyyrit/varsova-varsovan-linna.webp',
    'Kopernikuksen tiedekeskus': 'assets/kartat/miniatyyrit/varsova-kopernikuksen-tiedekeskus.webp',
    'Pyhän ristin kirkko': 'assets/kartat/miniatyyrit/varsova-pyhan-ristin-kirkko.webp',
    'Varsovan kansallismuseo': 'assets/kartat/miniatyyrit/varsova-varsovan-kansallismuseo.webp',
    'Kulttuuri- ja tiedepalatsi': 'assets/kartat/miniatyyrit/varsova-kulttuuri-ja-tiedepalatsi.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Wienin asema': 'varsova-wienin-asema',
  },
  /*
   * Erä 3 (generoi-miniatyyrit.yml 26.8.2026): 23/24 hyväksytty.
   * St Gilesin katedraali HYLÄTTIIN — kuvasta puuttui kruunutorni,
   * tunnusmerkki; prompti tiukennettu ja uusinta ajossa erän 4
   * mukana. Siihen asti kohde toimii kartalla porttitornittomana
   * merkkinä. Sagrada Famílian nostokurjet ovat kuvassa
   * tarkoituksella — kirkko on yhä kesken, kuten oikeasti.
   */
  oslo: {
    Kuninkaanlinna: 'assets/kartat/miniatyyrit/oslo-kuninkaanlinna.webp',
    'Karl Johans gate': 'assets/kartat/miniatyyrit/oslo-karl-johans-gate.webp',
    'Oslon tuomiokirkko': 'assets/kartat/miniatyyrit/oslo-oslon-tuomiokirkko.webp',
    Kaupungintalo: 'assets/kartat/miniatyyrit/oslo-kaupungintalo.webp',
    'Akershusin linnoitus': 'assets/kartat/miniatyyrit/oslo-akershusin-linnoitus.webp',
    Oopperatalo: 'assets/kartat/miniatyyrit/oslo-oopperatalo.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    Akershus: 'oslo-akershus',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Huudon varkaus': 'oslo-huudon-varkaus',
    Boheemikirja: 'oslo-boheemikirja',
    'Fram 1893': 'oslo-fram-1893',
  },
  dublin: {
    'Guinness-panimo': 'assets/kartat/miniatyyrit/dublin-guinness-panimo.webp',
    'Patrickin katedraali': 'assets/kartat/miniatyyrit/dublin-patrickin-katedraali.webp',
    'Dublinin linna': 'assets/kartat/miniatyyrit/dublin-dublinin-linna.webp',
    'Ha’penny-silta': 'assets/kartat/miniatyyrit/dublin-hapenny-silta.webp',
    Spire: 'assets/kartat/miniatyyrit/dublin-spire.webp',
    'Trinity College': 'assets/kartat/miniatyyrit/dublin-trinity-college.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'St James’s Gate': 'dublin-st-james-s-gate',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kellsin kirja': 'dublin-kellsin-kirja',
    'Ouzel Galley': 'dublin-ouzel-galley',
  },
  barcelona: {
    'Sagrada Família': 'assets/kartat/miniatyyrit/barcelona-sagrada-familia.webp',
    'Casa Batlló': 'assets/kartat/miniatyyrit/barcelona-casa-batllo.webp',
    'Arc de Triomf': 'assets/kartat/miniatyyrit/barcelona-arc-de-triomf.webp',
    Musiikkipalatsi: 'assets/kartat/miniatyyrit/barcelona-musiikkipalatsi.webp',
    'Boquerian kauppahalli': 'assets/kartat/miniatyyrit/barcelona-boquerian-kauppahalli.webp',
    'Kolumbuksen patsas': 'assets/kartat/miniatyyrit/barcelona-kolumbuksen-patsas.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Font de Canaletes': 'barcelona-font-de-canaletes',
    'Roviran aukio': 'barcelona-roviran-aukio',
  },
  edinburgh: {
    'Charlotte Square': 'assets/kartat/miniatyyrit/edinburgh-charlotte-square.webp',
    'Edinburghin linna': 'assets/kartat/miniatyyrit/edinburgh-edinburghin-linna.webp',
    'Greyfriars Bobby': 'assets/kartat/miniatyyrit/edinburgh-greyfriars-bobby.webp',
    'Calton Hill': 'assets/kartat/miniatyyrit/edinburgh-calton-hill.webp',
    'Holyroodin palatsi': 'assets/kartat/miniatyyrit/edinburgh-holyroodin-palatsi.webp',
    // Uusinta 27.8.2026: kruunutorni nyt oikein (1. otto hylattiin).
    'St Gilesin katedraali': 'assets/kartat/miniatyyrit/edinburgh-st-gilesin-katedraali.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Scott-monumentti': 'edinburgh-scott-monumentti',
  },
  /*
   * Erä 4 (27.8.2026): 24/25 hyväksytty. Vapahtajan katedraali
   * HYLÄTTIIN — kupolit piirtyivät vihreinä vaikka kullatut kupolit
   * ovat tunnusmerkki (saman erän Kiovan Sofia todistaa että kulta
   * onnistuu); prompti tiukennettu, uusinta erän 5 mukana.
   */
  moskova: {
    'Bolšoi-teatteri': 'assets/kartat/miniatyyrit/moskova-bolsoi-teatteri.webp',
    'Punainen tori': 'assets/kartat/miniatyyrit/moskova-punainen-tori.webp',
    'Pyhän Vasilin katedraali': 'assets/kartat/miniatyyrit/moskova-pyhan-vasilin-katedraali.webp',
    'Moskovan Kreml': 'assets/kartat/miniatyyrit/moskova-moskovan-kreml.webp',
    'Tretjakovin galleria': 'assets/kartat/miniatyyrit/moskova-tretjakovin-galleria.webp',
    // Uusinta 27.8.2026: kupolit nyt kullatut (1. otto hylattiin vihreista).
    'Vapahtajan katedraali': 'assets/kartat/miniatyyrit/moskova-vapahtajan-katedraali.webp',
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Näyttely 1872': 'moskova-nayttely-1872',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Perlovin teetalo': 'moskova-perlovin-teetalo',
  },
  pietari: {
    'Pietari-Paavalin linnoitus': 'assets/kartat/miniatyyrit/pietari-pietari-paavalin-linnoitus.webp',
    Talvipalatsi: 'assets/kartat/miniatyyrit/pietari-talvipalatsi.webp',
    Verikirkko: 'assets/kartat/miniatyyrit/pietari-verikirkko.webp',
    Vaskiratsastaja: 'assets/kartat/miniatyyrit/pietari-vaskiratsastaja.webp',
    'Kazanin katedraali': 'assets/kartat/miniatyyrit/pietari-kazanin-katedraali.webp',
    'Mariinski-teatteri': 'assets/kartat/miniatyyrit/pietari-mariinski-teatteri.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Fabergé-museo': 'pietari-faberge-museo',
  },
  kiova: {
    'Kontraktovan aukio': 'assets/kartat/miniatyyrit/kiova-kontraktovan-aukio.webp',
    'Andreaksen kirkko': 'assets/kartat/miniatyyrit/kiova-andreaksen-kirkko.webp',
    'Pyhän Mikaelin luostari': 'assets/kartat/miniatyyrit/kiova-pyhan-mikaelin-luostari.webp',
    'Pyhän Sofian katedraali': 'assets/kartat/miniatyyrit/kiova-pyhan-sofian-katedraali.webp',
    'Itsenäisyyden aukio': 'assets/kartat/miniatyyrit/kiova-itsenaisyyden-aukio.webp',
    'Kiovan kultainen portti': 'assets/kartat/miniatyyrit/kiova-kiovan-kultainen-portti.webp',
  },
  riika: {
    Vapaudenpatsas: 'assets/kartat/miniatyyrit/riika-vapaudenpatsas.webp',
    'Kolme veljestä': 'assets/kartat/miniatyyrit/riika-kolme-veljesta.webp',
    'Riian tuomiokirkko': 'assets/kartat/miniatyyrit/riika-riian-tuomiokirkko.webp',
    'Pyhän Pietarin kirkko': 'assets/kartat/miniatyyrit/riika-pyhan-pietarin-kirkko.webp',
    'Mustapäiden talo': 'assets/kartat/miniatyyrit/riika-mustapaiden-talo.webp',
    Keskustori: 'assets/kartat/miniatyyrit/riika-keskustori.webp',
  },
  /*
   * Erä 5, VIIMEINEN (27.8.2026): 24/24 hyväksytty + Vapahtajan
   * katedraalin kulta-uusinta. Koko Eurooppa-erä (v1156:n 122
   * promptia, 20 kaupunkia) on tällä valmis.
   */
  vilna: {
    'Gediminaksen torni': 'assets/kartat/miniatyyrit/vilna-gediminaksen-torni.webp',
    'Vilnan tuomiokirkko': 'assets/kartat/miniatyyrit/vilna-vilnan-tuomiokirkko.webp',
    'Pyhän Annan kirkko': 'assets/kartat/miniatyyrit/vilna-pyhan-annan-kirkko.webp',
    'Vilnan yliopisto': 'assets/kartat/miniatyyrit/vilna-vilnan-yliopisto.webp',
    'Užupis': 'assets/kartat/miniatyyrit/vilna-uzupis.webp',
    Aamuportti: 'assets/kartat/miniatyyrit/vilna-aamuportti.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Kirjankantajat: 'vilna-kirjankantajat',
    'Salattu avioliitto': 'vilna-salattu-avioliitto',
    Boratynka: 'vilna-boratynka',
  },
  tallinna: {
    'Paksu Margareeta': 'assets/kartat/miniatyyrit/tallinna-paksu-margareeta.webp',
    'Olevisten kirkko': 'assets/kartat/miniatyyrit/tallinna-olevisten-kirkko.webp',
    Raatihuoneentori: 'assets/kartat/miniatyyrit/tallinna-raatihuoneentori.webp',
    'Nevskin katedraali': 'assets/kartat/miniatyyrit/tallinna-nevskin-katedraali.webp',
    'Virun portti': 'assets/kartat/miniatyyrit/tallinna-virun-portti.webp',
    Matkustajasatama: 'assets/kartat/miniatyyrit/tallinna-matkustajasatama.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'E-valtio': 'tallinna-e-valtio',
    'Lyhyen jalan torni': 'tallinna-lyhyen-jalan-torni',
    Pirtulaivat: 'tallinna-pirtulaivat',
  },
  ankara: {
    'Ankaran linna': 'assets/kartat/miniatyyrit/ankara-ankaran-linna.webp',
    'Augustuksen temppeli': 'assets/kartat/miniatyyrit/ankara-augustuksen-temppeli.webp',
    'Roomalainen kylpylä': 'assets/kartat/miniatyyrit/ankara-roomalainen-kylpyla.webp',
    'Julianuksen pylväs': 'assets/kartat/miniatyyrit/ankara-julianuksen-pylvas.webp',
    'Anatolian sivilisaatioiden museo': 'assets/kartat/miniatyyrit/ankara-anatolian-sivilisaatioiden-museo.webp',
    'Linnanportin kellotorni': 'assets/kartat/miniatyyrit/ankara-linnanportin-kellotorni.webp',
  },
  izmir: {
    'İzmirin kellotorni': 'assets/kartat/miniatyyrit/izmir-izmirin-kellotorni.webp',
    'Kemeraltin basaari': 'assets/kartat/miniatyyrit/izmir-kemeraltin-basaari.webp',
    'Hisarin moskeija': 'assets/kartat/miniatyyrit/izmir-hisarin-moskeija.webp',
    'Sulu Han': 'assets/kartat/miniatyyrit/izmir-sulu-han.webp',
    'Smyrnan agora': 'assets/kartat/miniatyyrit/izmir-smyrnan-agora.webp',
    'Salepçioğlun moskeija': 'assets/kartat/miniatyyrit/izmir-salepcioglun-moskeija.webp',
  },
  granada: {
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    'Leijonain piha': 'granada-leijonain-piha',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sacromonten luolat': 'granada-sacromonten-luolat',
    'Albaicínin näköalapaikka': 'granada-albaicinin-nakoalapaikka',
    Generalife: 'granada-generalife',
    'Granadan katedraali': 'granada-granadan-katedraali',
    Alhambra: 'granada-alhambra',
    'Manuel de Fallan talo': 'granada-manuel-de-fallan-talo',
    'Irvingin huoneet': 'granada-irvingin-huoneet',
    'Alcaicería': 'granada-alcaiceria',
  },
  krakova: {
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    Wawel: 'krakova-wawel',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Barbakaani: 'krakova-barbakaani',
    'Collegium Maius': 'krakova-collegium-maius',
    Mariankirkko: 'krakova-mariankirkko',
    'Wawelin linna': 'krakova-wawelin-linna',
    'Wawelin lohikäärme': 'krakova-wawelin-lohikaarme',
    Kazimierz: 'krakova-kazimierz',
  },
  damaskos: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Damaskoksen linnoitus': 'damaskos-damaskoksen-linnoitus',
    'Umaijadien moskeija': 'damaskos-umaijadien-moskeija',
    'Hamidiyyan suuki': 'damaskos-hamidiyyan-suuki',
    'Khan As\'ad Pashan': 'damaskos-khan-as-ad-pashan',
    'Itäportti': 'damaskos-itaportti',
    'Kisanin portti': 'damaskos-kisanin-portti',
  },
  isfahan: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Jameh-moskeija': 'isfahan-jameh-moskeija',
    'Isfahanin basaari': 'isfahan-isfahanin-basaari',
    'Ali Qapu': 'isfahan-ali-qapu',
    'Shaahin moskeija': 'isfahan-shaahin-moskeija',
    'Hasht Behesht': 'isfahan-hasht-behesht',
    'Chahar Baghin koulu': 'isfahan-chahar-baghin-koulu',
  },
  tabriz: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Tabrizin basaari': 'tabriz-tabrizin-basaari',
    Perustuslakitalo: 'tabriz-perustuslakitalo',
    Arg: 'tabriz-arg',
    'Saat-torni': 'tabriz-saat-torni',
    'Azerbaidžanin museo': 'tabriz-azerbaidzanin-museo',
    'Sininen moskeija': 'tabriz-sininen-moskeija',
  },
  riad: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Masmakin linnoitus': 'riad-masmakin-linnoitus',
    'Imam Turkin suurmoskeija': 'riad-imam-turkin-suurmoskeija',
    'Punainen palatsi': 'riad-punainen-palatsi',
    'Riadin vesitorni': 'riad-riadin-vesitorni',
    'Murabban palatsi': 'riad-murabban-palatsi',
    'Saudi-Arabian kansallismuseo': 'riad-saudi-arabian-kansallismuseo',
  },
  luxor: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Luxorin temppeli': 'luxor-luxorin-temppeli',
    'Luxorin museo': 'luxor-luxorin-museo',
    Sfinksikuja: 'luxor-sfinksikuja',
    'Mutin temppeli': 'luxor-mutin-temppeli',
    'Khonsun temppeli': 'luxor-khonsun-temppeli',
    'Karnakin suuri pylvässali': 'luxor-karnakin-suuri-pylvassali',
  },
  halab: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Aleppon linnoitus': 'halab-aleppon-linnoitus',
    'Antiokian portti': 'halab-antiokian-portti',
    'Qinnesrinin portti': 'halab-qinnesrinin-portti',
    Saippuakhan: 'halab-saippuakhan',
    'Arghunin sairaala': 'halab-arghunin-sairaala',
    'Beit Ajiqbash': 'halab-beit-ajiqbash',
  },
  masqat: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Masqatin portti': 'masqat-masqatin-portti',
    'Al-Miranin linnake': 'masqat-al-miranin-linnake',
    'Al-Jalalin linnake': 'masqat-al-jalalin-linnake',
    'Al Alamin palatsi': 'masqat-al-alamin-palatsi',
    'Bait Al Zubair': 'masqat-bait-al-zubair',
    'Motishwar Mandir': 'masqat-motishwar-mandir',
  },
  kuwait: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kuwait-tornit': 'kuwait-kuwait-tornit',
    'Al Hamra -torni': 'kuwait-al-hamra-torni',
    'Seifin palatsi': 'kuwait-seifin-palatsi',
    'Kuwaitin suurmoskeija': 'kuwait-kuwaitin-suurmoskeija',
    'Mubarakiyan tori': 'kuwait-mubarakiyan-tori',
    'Sadu House': 'kuwait-sadu-house',
  },
  nikosia: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Selimiyen moskeija': 'nikosia-selimiyen-moskeija',
    'Büyük Han': 'nikosia-buyuk-han',
    'Faneromenin kirkko': 'nikosia-faneromenin-kirkko',
    'Omeryen hamam': 'nikosia-omeryen-hamam',
    'Kyproksen museo': 'nikosia-kyproksen-museo',
    'Leventis-museo': 'nikosia-leventis-museo',
  },
  doha: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Islamilaisen taiteen museo': 'doha-islamilaisen-taiteen-museo',
    Corniche: 'doha-corniche',
    'Souq Waqif': 'doha-souq-waqif',
    'Qatarin kansallismuseo': 'doha-qatarin-kansallismuseo',
    'Al Koot -linnake': 'doha-al-koot-linnake',
    Msheireb: 'doha-msheireb',
  },
  marseille: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    MuCEM: 'marseille-mucem',
    'Marseillen katedraali': 'marseille-marseillen-katedraali',
    'Saint-Victorin kirkko': 'marseille-saint-victorin-kirkko',
    Vanhasatama: 'marseille-vanhasatama',
    'Notre-Dame de la Garde': 'marseille-notre-dame-de-la-garde',
    'Saint-Charlesin asema': 'marseille-saint-charlesin-asema',
  },
  venetsia: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Canal Grande': 'venetsia-canal-grande',
    'La Fenicen oopperatalo': 'venetsia-la-fenicen-oopperatalo',
    'Rialton silta': 'venetsia-rialton-silta',
    'Pyhän Markuksen tori': 'venetsia-pyhan-markuksen-tori',
    'San Giorgio Maggiore': 'venetsia-san-giorgio-maggiore',
    Arsenaali: 'venetsia-arsenaali',
    'Markuksen hevoset': 'venetsia-markuksen-hevoset',
    'Dogen palatsi': 'venetsia-dogen-palatsi',
    'Aldon paino': 'venetsia-aldon-paino',
  },
  odessa: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vorontsovin majakka': 'odessa-vorontsovin-majakka',
    'Odessan satama': 'odessa-odessan-satama',
    'Potjomkinin portaat': 'odessa-potjomkinin-portaat',
    'Odessan oopperatalo': 'odessa-odessan-oopperatalo',
    Kaupunginpuisto: 'odessa-kaupunginpuisto',
    'Privozin tori': 'odessa-privozin-tori',
    'Potjomkin-portaat': 'odessa-potjomkin-portaat',
  },
  sevilla: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Katedraali ja Giralda': 'sevilla-katedraali-ja-giralda',
    'Alcázar': 'sevilla-alcazar',
    'Torre del Oro': 'sevilla-torre-del-oro',
    'Maestranzan areena': 'sevilla-maestranzan-areena',
    'Trianan silta': 'sevilla-trianan-silta',
    'Plaza de España': 'sevilla-plaza-de-espana',
    'Victorian laituri': 'sevilla-victorian-laituri',
  },
  dubrovnik: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Minčetan torni': 'dubrovnik-mincetan-torni',
    'Pilen portti': 'dubrovnik-pilen-portti',
    'Sponzan palatsi': 'dubrovnik-sponzan-palatsi',
    Vanhasatama: 'dubrovnik-vanhasatama',
    'Lovrijenacin linnake': 'dubrovnik-lovrijenacin-linnake',
    'Dubrovnikin katedraali': 'dubrovnik-dubrovnikin-katedraali',
  },
  tromssa: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Polaarimuseo: 'tromssa-polaarimuseo',
    'Tromssan silta': 'tromssa-tromssan-silta',
    'Tromssan tuomiokirkko': 'tromssa-tromssan-tuomiokirkko',
    'Jäämerenkatedraali': 'tromssa-jaamerenkatedraali',
    Polaria: 'tromssa-polaria',
    'Fjellheisenin köysirata': 'tromssa-fjellheisenin-koysirata',
  },
  jerusalem: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Damaskoksen portti': 'jerusalem-damaskoksen-portti',
    'Pyhän haudan kirkko': 'jerusalem-pyhan-haudan-kirkko',
    Kalliomoskeija: 'jerusalem-kalliomoskeija',
    'Läntinen muuri': 'jerusalem-lantinen-muuri',
    'Jaffan portti': 'jerusalem-jaffan-portti',
    'Al-Aqsa-moskeija': 'jerusalem-al-aqsa-moskeija',
  },
  petra: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ad Deir': 'petra-ad-deir',
    'Bysanttilainen kirkko': 'petra-bysanttilainen-kirkko',
    Kuninkaanhaudat: 'petra-kuninkaanhaudat',
    'Qasr al-Bint': 'petra-qasr-al-bint',
    'Suuri temppeli': 'petra-suuri-temppeli',
    Teatteri: 'petra-teatteri',
    Siq: 'petra-siq',
    'Al-Khazneh': 'petra-al-khazneh',
    Uhripaikka: 'petra-uhripaikka',
  },
  persepolis: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kaikkien kansojen portti': 'persepolis-kaikkien-kansojen-portti',
    'Artakserkses III:n hauta': 'persepolis-artakserkses-iii-n-hauta',
    'Sadan pylvään sali': 'persepolis-sadan-pylvaan-sali',
    Apadana: 'persepolis-apadana',
    'Kolmen oven sali': 'persepolis-kolmen-oven-sali',
    Aarrekammio: 'persepolis-aarrekammio',
    Tachara: 'persepolis-tachara',
    'Hadishin palatsi': 'persepolis-hadishin-palatsi',
  },
  medina: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Qiblatayn-moskeija': 'medina-qiblatayn-moskeija',
    'Seitsemän moskeijaa': 'medina-seitseman-moskeijaa',
    'Profeetan moskeija': 'medina-profeetan-moskeija',
    'Al-Baqin hautausmaa': 'medina-al-baqin-hautausmaa',
    'Al-Ghamama-moskeija': 'medina-al-ghamama-moskeija',
    'Hidžaz-radan asema': 'medina-hidzaz-radan-asema',
    'Quba-moskeija': 'medina-quba-moskeija',
  },
  mekka: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Jabal al-Nour': 'mekka-jabal-al-nour',
    'Jannat al-Mu\'alla': 'mekka-jannat-al-mu-alla',
    'Jinnien moskeija': 'mekka-jinnien-moskeija',
    'Mekan kirjasto': 'mekka-mekan-kirjasto',
    'Suuri moskeija': 'mekka-suuri-moskeija',
    Kellotorni: 'mekka-kellotorni',
  },
  sana: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Al-Bakiriyyan moskeija': 'sana-al-bakiriyyan-moskeija',
    Suolatori: 'sana-suolatori',
    'Talhan moskeija': 'sana-talhan-moskeija',
    'Suuri moskeija': 'sana-suuri-moskeija',
    'Al-Mahdin moskeija': 'sana-al-mahdin-moskeija',
    'Bab al-Yaman': 'sana-bab-al-yaman',
  },
  aden: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Steamer Point': 'aden-steamer-point',
    Kansallismuseo: 'aden-kansallismuseo',
    'Craterin tori': 'aden-craterin-tori',
    'Tawilan altaat': 'aden-tawilan-altaat',
  },
  salalah: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sultan Qaboosin moskeija': 'salalah-sultan-qaboosin-moskeija',
    'Al-Husnin palatsi': 'salalah-al-husnin-palatsi',
    'Al-Haffan basaari': 'salalah-al-haffan-basaari',
    'Nabi Umranin hauta': 'salalah-nabi-umranin-hauta',
    'Burj an-Nahda': 'salalah-burj-an-nahda',
    'Al-Baleedin puisto': 'salalah-al-baleedin-puisto',
    Suitsukemuseo: 'salalah-suitsukemuseo',
  },
  mosul: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kuyunjikin kumpu': 'mosul-kuyunjikin-kumpu',
    'Bash Tapian linna': 'mosul-bash-tapian-linna',
    'Qara Saray': 'mosul-qara-saray',
    'Nabi Yunusin kumpu': 'mosul-nabi-yunusin-kumpu',
    'Al-Masfin moskeija': 'mosul-al-masfin-moskeija',
    'Al-Nabi Jirjisin moskeija': 'mosul-al-nabi-jirjisin-moskeija',
    'Al-Nurin moskeija': 'mosul-al-nurin-moskeija',
  },
  bangkok: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sanam Luang': 'bangkok-sanam-luang',
    'Wat Saket ja Kultainen vuori': 'bangkok-wat-saket-ja-kultainen-vuori',
    'Sao Ching Cha': 'bangkok-sao-ching-cha',
    'Wat Phra Kaew': 'bangkok-wat-phra-kaew',
    Suurpalatsi: 'bangkok-suurpalatsi',
    'Wat Pho': 'bangkok-wat-pho',
    'Wat Arun': 'bangkok-wat-arun',
    Yaowarat: 'bangkok-yaowarat',
    'Hua Lamphong': 'bangkok-hua-lamphong',
  },
  peking: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vanha kesäpalatsi': 'peking-vanha-kesapalatsi',
    'Kesäpalatsi': 'peking-kesapalatsi',
    'Yonghe-temppeli': 'peking-yonghe-temppeli',
    Nanluoguxiang: 'peking-nanluoguxiang',
    'Rumpu- ja kellotorni': 'peking-rumpu-ja-kellotorni',
    'Jingshanin puisto': 'peking-jingshanin-puisto',
    'Kielletty kaupunki': 'peking-kielletty-kaupunki',
    Tiananmen: 'peking-tiananmen',
    Zhengyangmen: 'peking-zhengyangmen',
    'Taivaan temppeli': 'peking-taivaan-temppeli',
  },
  jakutsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Saha-teatteri': 'jakutsk-saha-teatteri',
    'Jaroslavskin museo': 'jakutsk-jaroslavskin-museo',
    'Spasskin luostari': 'jakutsk-spasskin-luostari',
    'Nikolskin kirkko': 'jakutsk-nikolskin-kirkko',
    'Pushkinin draamateatteri': 'jakutsk-pushkinin-draamateatteri',
    'Kansallinen taidemuseo': 'jakutsk-kansallinen-taidemuseo',
    Vanhakaupunki: 'jakutsk-vanhakaupunki',
    'Ooppera- ja balettiteatteri': 'jakutsk-ooppera-ja-balettiteatteri',
  },
  magadan: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kaupungin sauna': 'magadan-kaupungin-sauna',
    'Severovostokzoloton talo': 'magadan-severovostokzoloton-talo',
    'Leninin valtakatu 18': 'magadan-leninin-valtakatu-18',
    'Kinoteatteri Gornjak': 'magadan-kinoteatteri-gornjak',
    Nagajevanlahti: 'magadan-nagajevanlahti',
    Urheilupalatsi: 'magadan-urheilupalatsi',
    'Pushkinin kirjasto': 'magadan-pushkinin-kirjasto',
  },
  delhi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Delhi Junction': 'delhi-delhi-junction',
    'Delhin kaupungintalo': 'delhi-delhin-kaupungintalo',
    'Fatehpuri-moskeija': 'delhi-fatehpuri-moskeija',
    'Chandni Chowk': 'delhi-chandni-chowk',
    'Punainen linnoitus': 'delhi-punainen-linnoitus',
    'Gurdwara Sis Ganj Sahib': 'delhi-gurdwara-sis-ganj-sahib',
    'Jama Masjid': 'delhi-jama-masjid',
    'Humayunin mausoleumi': 'delhi-humayunin-mausoleumi',
  },
  vladivostok: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Pokrovskin puisto': 'vladivostok-pokrovskin-puisto',
    Linnoitusmuseo: 'vladivostok-linnoitusmuseo',
    'Kotkanpesän kukkula': 'vladivostok-kotkanpesan-kukkula',
    Funikulaari: 'vladivostok-funikulaari',
    'Arsenjevin museo': 'vladivostok-arsenjevin-museo',
    'GUM-tavaratalo': 'vladivostok-gum-tavaratalo',
    'Sukellusvene S-56': 'vladivostok-sukellusvene-s-56',
    Rautatieasema: 'vladivostok-rautatieasema',
    'Kultaisen sarven silta': 'vladivostok-kultaisen-sarven-silta',
  },
  jekaterinburg: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vanha rautatieasema': 'jekaterinburg-vanha-rautatieasema',
    'Kharitonovin kartano': 'jekaterinburg-kharitonovin-kartano',
    'Uralin valtionyliopisto': 'jekaterinburg-uralin-valtionyliopisto',
    'Historiallinen aukio': 'jekaterinburg-historiallinen-aukio',
    Kuvataidemuseo: 'jekaterinburg-kuvataidemuseo',
    'Suuri Zlatoust': 'jekaterinburg-suuri-zlatoust',
    'Kolminaisuuden katedraali': 'jekaterinburg-kolminaisuuden-katedraali',
  },
  novosibirsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Novosibirsk-Glavnyi': 'novosibirsk-novosibirsk-glavnyi',
    'Kaupungin kauppatalo': 'novosibirsk-kaupungin-kauppatalo',
    Taidemuseo: 'novosibirsk-taidemuseo',
    'Satohuoneiston talo': 'novosibirsk-satohuoneiston-talo',
    'Aleksanteri Nevskin katedraali': 'novosibirsk-aleksanteri-nevskin-katedraali',
  },
  irkutsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Znamenskin luostari': 'irkutsk-znamenskin-luostari',
    'Epifanian katedraali': 'irkutsk-epifanian-katedraali',
    'Taivaaseenastumisen kirkko': 'irkutsk-taivaaseenastumisen-kirkko',
    Rautatieasema: 'irkutsk-rautatieasema',
    'Ristin ylentämisen kirkko': 'irkutsk-ristin-ylentamisen-kirkko',
    '130. kortteli': 'irkutsk-130-kortteli',
    'Jäänmurtaja Angara': 'irkutsk-jaanmurtaja-angara',
  },
  kioto: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kinkaku-ji': 'kioto-kinkaku-ji',
    'Ginkaku-ji': 'kioto-ginkaku-ji',
    'Keisarillinen palatsi': 'kioto-keisarillinen-palatsi',
    'Nijō-linna': 'kioto-nijo-linna',
    'Nishiki-tori': 'kioto-nishiki-tori',
    Gion: 'kioto-gion',
    'Kiyomizu-dera': 'kioto-kiyomizu-dera',
    'Sanjūsangen-dō': 'kioto-sanjusangen-do',
    'Tō-ji': 'kioto-to-ji',
    'Fushimi Inari-taisha': 'kioto-fushimi-inari-taisha',
  },
  singapore: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sultan-moskeija': 'singapore-sultan-moskeija',
    'Raffles Hotel': 'singapore-raffles-hotel',
    'Fort Canningin kukkula': 'singapore-fort-canningin-kukkula',
    'Clarke Quay': 'singapore-clarke-quay',
    'Empress Place': 'singapore-empress-place',
    'Boat Quay': 'singapore-boat-quay',
    'Merlion-puisto': 'singapore-merlion-puisto',
    'Gardens by the Bay': 'singapore-gardens-by-the-bay',
    'Sri Mariamman -temppeli': 'singapore-sri-mariamman-temppeli',
    'Thian Hock Keng -temppeli': 'singapore-thian-hock-keng-temppeli',
  },
  samarkand: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ulugbekin observatorio': 'samarkand-ulugbekin-observatorio',
    'Khoja Doniyorin mausoleumi': 'samarkand-khoja-doniyorin-mausoleumi',
    'Afrasiyabin rauniokumpu': 'samarkand-afrasiyabin-rauniokumpu',
    'Hazrat Khizrin moskeija': 'samarkand-hazrat-khizrin-moskeija',
    'Shah-i-Zindan hautakuja': 'samarkand-shah-i-zindan-hautakuja',
    'Bibi-Khanymin moskeija': 'samarkand-bibi-khanymin-moskeija',
    'Registanin aukio': 'samarkand-registanin-aukio',
    'Gur-e-Amir': 'samarkand-gur-e-amir',
    'Ishratkhanan mausoleumi': 'samarkand-ishratkhanan-mausoleumi',
  },
  xian: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Xi’anin rautatieasema': 'xian-xi-anin-rautatieasema',
    'Anyuan-portti': 'xian-anyuan-portti',
    'Suuri moskeija': 'xian-suuri-moskeija',
    Rumpitorni: 'xian-rumpitorni',
    Kellotorni: 'xian-kellotorni',
    'Steelametsä': 'xian-steelametsa',
    'Yongning-portti': 'xian-yongning-portti',
    'Shaanxin historiallinen museo': 'xian-shaanxin-historiallinen-museo',
    'Suuri villihanhipagoda': 'xian-suuri-villihanhipagoda',
  },
  varanasi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Dhamek-stupa': 'varanasi-dhamek-stupa',
    'Chaukhandi-stupa': 'varanasi-chaukhandi-stupa',
    'Manikarnika Ghat': 'varanasi-manikarnika-ghat',
    'Kashi Vishwanath -temppeli': 'varanasi-kashi-vishwanath-temppeli',
    'Dashashwamedh Ghat': 'varanasi-dashashwamedh-ghat',
    'Assi Ghat': 'varanasi-assi-ghat',
    'Durga Kund -temppeli': 'varanasi-durga-kund-temppeli',
    'Ramnagarin linnoitus': 'varanasi-ramnagarin-linnoitus',
  },
  hanoi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Long Biênin silta': 'hanoi-long-bienin-silta',
    'Thăng Longin keisarilinna': 'hanoi-thang-longin-keisarilinna',
    'Đồng Xuânin tori': 'hanoi-ong-xuanin-tori',
    'Yhden pilarin pagodi': 'hanoi-yhden-pilarin-pagodi',
    'Hanoin lippulinna': 'hanoi-hanoin-lippulinna',
    'Ngọc Sơnin temppeli': 'hanoi-ngoc-sonin-temppeli',
    'Pyhän Joosefin katedraali': 'hanoi-pyhan-joosefin-katedraali',
    'Kirjallisuuden temppeli': 'hanoi-kirjallisuuden-temppeli',
  },
  ulanbator: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Gandantegchinlenin luostari': 'ulanbator-gandantegchinlenin-luostari',
    'Mongolian kansallismuseo': 'ulanbator-mongolian-kansallismuseo',
    'Sükhbaatarin aukio': 'ulanbator-sukhbaatarin-aukio',
    'Choijin Laman temppeli': 'ulanbator-choijin-laman-temppeli',
    Rautatieasema: 'ulanbator-rautatieasema',
    Kansallisstadion: 'ulanbator-kansallisstadion',
    'Bogd Khanin talvipalatsi': 'ulanbator-bogd-khanin-talvipalatsi',
    'Zaisanin muistomerkki': 'ulanbator-zaisanin-muistomerkki',
  },
  kathmandu: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Boudhanath: 'kathmandu-boudhanath',
    Swayambhunath: 'kathmandu-swayambhunath',
    'Unelmien puutarha': 'kathmandu-unelmien-puutarha',
    Pashupatinath: 'kathmandu-pashupatinath',
    'Rani Pokhari': 'kathmandu-rani-pokhari',
    'Kathmandun Durbar-aukio': 'kathmandu-kathmandun-durbar-aukio',
    Dharahara: 'kathmandu-dharahara',
    'Patanin Durbar-aukio': 'kathmandu-patanin-durbar-aukio',
  },
  astana: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Astana Opera': 'astana-astana-opera',
    'Khan Shatyr': 'astana-khan-shatyr',
    Bajterek: 'astana-bajterek',
    'Nurjol-bulevardi': 'astana-nurjol-bulevardi',
    Akorda: 'astana-akorda',
    'Hazrat Sultanin moskeija': 'astana-hazrat-sultanin-moskeija',
    'Rauhan ja sovinnon palatsi': 'astana-rauhan-ja-sovinnon-palatsi',
    Kansallismuseo: 'astana-kansallismuseo',
  },
  kanton: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Zhenhai-torni': 'kanton-zhenhai-torni',
    'Guangxiao-temppeli': 'kanton-guangxiao-temppeli',
    'Chenin suvun sali': 'kanton-chenin-suvun-sali',
    'Liurong-temppeli': 'kanton-liurong-temppeli',
    'Huaisheng-moskeija': 'kanton-huaisheng-moskeija',
    'Pyhän sydämen katedraali': 'kanton-pyhan-sydamen-katedraali',
    'Kolmentoista faktorian paikka': 'kanton-kolmentoista-faktorian-paikka',
    'Shamianin saari': 'kanton-shamianin-saari',
  },
  yangon: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Chaukhtatgyin temppeli': 'yangon-chaukhtatgyin-temppeli',
    'Shwedagon-pagodi': 'yangon-shwedagon-pagodi',
    'Kandawgyi-järvi ja Karaweik': 'yangon-kandawgyi-jarvi-ja-karaweik',
    'Yangonin keskusasema': 'yangon-yangonin-keskusasema',
    'Bogyoken markkinat': 'yangon-bogyoken-markkinat',
    'Sihteeristö': 'yangon-sihteeristo',
    'Sule-pagodi': 'yangon-sule-pagodi',
    'Strand-hotelli': 'yangon-strand-hotelli',
    'Botataung-pagodi': 'yangon-botataung-pagodi',
  },
  mandalay: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Mandalay-kukkula': 'mandalay-mandalay-kukkula',
    'Kuthodaw-pagodi': 'mandalay-kuthodaw-pagodi',
    'Kyauktawgyi-pagodi': 'mandalay-kyauktawgyi-pagodi',
    'Sandamuni-pagodi': 'mandalay-sandamuni-pagodi',
    'Shwenandaw-luostari': 'mandalay-shwenandaw-luostari',
    'Mandalayn palatsi': 'mandalay-mandalayn-palatsi',
    'Zegyo-tori': 'mandalay-zegyo-tori',
    'Setkyathiha-pagodi': 'mandalay-setkyathiha-pagodi',
    'Mahamuni-temppeli': 'mandalay-mahamuni-temppeli',
  },
  taipei: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Baoan-temppeli': 'taipei-baoan-temppeli',
    'Dihua-katu': 'taipei-dihua-katu',
    Pohjoisportti: 'taipei-pohjoisportti',
    Presidentinlinna: 'taipei-presidentinlinna',
    'Punainen talo': 'taipei-punainen-talo',
    'Lungshan-temppeli': 'taipei-lungshan-temppeli',
    'Bopiliaon vanha kortteli': 'taipei-bopiliaon-vanha-kortteli',
    'Chiang Kai-shek -muistosali': 'taipei-chiang-kai-shek-muistosali',
    'Kasvitieteellinen puutarha': 'taipei-kasvitieteellinen-puutarha',
    'Taipei 101': 'taipei-taipei-101',
  },
  hongkong: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Tsim Sha Tsuin kellotorni': 'hongkong-tsim-sha-tsuin-kellotorni',
    'Western Market': 'hongkong-western-market',
    'Star Ferryn laituri': 'hongkong-star-ferryn-laituri',
    'Man Mo -temppeli': 'hongkong-man-mo-temppeli',
    'Tai Kwun': 'hongkong-tai-kwun',
    'Pyhän Johanneksen katedraali': 'hongkong-pyhan-johanneksen-katedraali',
    'Victoria Peak': 'hongkong-victoria-peak',
    'Sininen talo': 'hongkong-sininen-talo',
    'Vaunuradan alaterminaali': 'hongkong-vaunuradan-alaterminaali',
  },
  jakarta: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sunda Kelapan satama': 'jakarta-sunda-kelapan-satama',
    Merenkulkumuseo: 'jakarta-merenkulkumuseo',
    'Kota Intanin nostosilta': 'jakarta-kota-intanin-nostosilta',
    'Fatahillah-aukio': 'jakarta-fatahillah-aukio',
    'Toko Merah': 'jakarta-toko-merah',
    'Jakarta Kotan asema': 'jakarta-jakarta-kotan-asema',
    'Kim Tek Ie -temppeli': 'jakarta-kim-tek-ie-temppeli',
    'Jakartan katedraali': 'jakarta-jakartan-katedraali',
    'Istiqlal-moskeija': 'jakarta-istiqlal-moskeija',
    'Kansallismonumentti Monas': 'jakarta-kansallismonumentti-monas',
  },
  manila: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Binondon kirkko': 'manila-binondon-kirkko',
    'Quiapon kirkko': 'manila-quiapon-kirkko',
    'Escolta-katu': 'manila-escolta-katu',
    'Jones-silta': 'manila-jones-silta',
    'Fort Santiago': 'manila-fort-santiago',
    'Manilan katedraali': 'manila-manilan-katedraali',
    'San Agustinin kirkko': 'manila-san-agustinin-kirkko',
    'Kansallinen taidemuseo': 'manila-kansallinen-taidemuseo',
    'Baluarte de San Diego': 'manila-baluarte-de-san-diego',
    'Rizal-puisto': 'manila-rizal-puisto',
  },
  kashgar: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Afaq Khojan mausoleumi': 'kashgar-afaq-khojan-mausoleumi',
    'Chini-Bagh': 'kashgar-chini-bagh',
    'Suuri basaari': 'kashgar-suuri-basaari',
    'Id Kahin moskeija': 'kashgar-id-kahin-moskeija',
    Vanhakaupunki: 'kashgar-vanhakaupunki',
    Kansanpuisto: 'kashgar-kansanpuisto',
    'Yusuf Khass Hajibin mausoleumi': 'kashgar-yusuf-khass-hajibin-mausoleumi',
  },
  lhasa: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ramoche-temppeli': 'lhasa-ramoche-temppeli',
    'Potala-palatsi': 'lhasa-potala-palatsi',
    Norbulingka: 'lhasa-norbulingka',
    'Jokhang-temppeli': 'lhasa-jokhang-temppeli',
    Chagpori: 'lhasa-chagpori',
    'Tiibetin museo': 'lhasa-tiibetin-museo',
    'Lhasan suuri moskeija': 'lhasa-lhasan-suuri-moskeija',
  },
  kolkata: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Howrah-silta': 'kolkata-howrah-silta',
    'Howrahin rautatieasema': 'kolkata-howrahin-rautatieasema',
    'Marble Palace': 'kolkata-marble-palace',
    'Nakhodan moskeija': 'kolkata-nakhodan-moskeija',
    'College Street': 'kolkata-college-street',
    'Writers’ Building': 'kolkata-writers-building',
    'St. John’sin kirkko': 'kolkata-st-john-sin-kirkko',
    'Shaheed Minar': 'kolkata-shaheed-minar',
    'Intian museo': 'kolkata-intian-museo',
    'Victoria Memorial': 'kolkata-victoria-memorial',
  },
  kabul: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Timur Shahin mausoleumi': 'kabul-timur-shahin-mausoleumi',
    'Shah-Do Shamshiran moskeija': 'kabul-shah-do-shamshiran-moskeija',
    'Ka Faroshin lintutori': 'kabul-ka-faroshin-lintutori',
    'Bala Hissar': 'kabul-bala-hissar',
    'Baburin puutarhat': 'kabul-baburin-puutarhat',
    'Kabulin vanha kaupunginmuuri': 'kabul-kabulin-vanha-kaupunginmuuri',
    'Chihil Sutunin palatsi': 'kabul-chihil-sutunin-palatsi',
    'Darul Amanin palatsi': 'kabul-darul-amanin-palatsi',
  },
  chennai: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Madrasin ylin oikeus': 'chennai-madrasin-ylin-oikeus',
    'Chennai Centralin asema': 'chennai-chennai-centralin-asema',
    'Ripon Building': 'chennai-ripon-building',
    'Fort St. George': 'chennai-fort-st-george',
    'Chennai Egmoren asema': 'chennai-chennai-egmoren-asema',
    'Government Museum': 'chennai-government-museum',
    'Chepaukin palatsi': 'chennai-chepaukin-palatsi',
    'Marina Beach': 'chennai-marina-beach',
    'Kapaleeshwararin temppeli': 'chennai-kapaleeshwararin-temppeli',
    'San Thomen basilika': 'chennai-san-thomen-basilika',
  },
  mumbai: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Crawford Market': 'mumbai-crawford-market',
    'Marine Drive': 'mumbai-marine-drive',
    'Chhatrapati Shivaji Maharaj Terminus': 'mumbai-chhatrapati-shivaji-maharaj-terminus',
    'St. Thomasin katedraali': 'mumbai-st-thomasin-katedraali',
    'Town Hall': 'mumbai-town-hall',
    'Bombayn korkein oikeus': 'mumbai-bombayn-korkein-oikeus',
    'Rajabain kellotorni': 'mumbai-rajabain-kellotorni',
    'David Sassoonin kirjasto': 'mumbai-david-sassoonin-kirjasto',
    'Prince of Walesin museo': 'mumbai-prince-of-walesin-museo',
    'Gateway of India': 'mumbai-gateway-of-india',
  },
  colombo: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Colombon satama': 'colombo-colombon-satama',
    'Wolvendaalin kirkko': 'colombo-wolvendaalin-kirkko',
    'Punainen moskeija': 'colombo-punainen-moskeija',
    'Fortin kellotorni': 'colombo-fortin-kellotorni',
    'Fortin rautatieasema': 'colombo-fortin-rautatieasema',
    'Beira-järvi': 'colombo-beira-jarvi',
    'Galle Face Hotel': 'colombo-galle-face-hotel',
    'Gangaramayan temppeli': 'colombo-gangaramayan-temppeli',
    'Colombon kansallismuseo': 'colombo-colombon-kansallismuseo',
  },
  karachi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Empress Market': 'karachi-empress-market',
    'Karachin kaupungintalo': 'karachi-karachin-kaupungintalo',
    'Denso Hall': 'karachi-denso-hall',
    'Pyhän Kolminaisuuden katedraali': 'karachi-pyhan-kolminaisuuden-katedraali',
    'Wazir Mansion': 'karachi-wazir-mansion',
    'Merewetherin kellotorni': 'karachi-merewetherin-kellotorni',
    'Karachi Cityn rautatieasema': 'karachi-karachi-cityn-rautatieasema',
    'Frere Hall': 'karachi-frere-hall',
    'Satamahallinnon talo': 'karachi-satamahallinnon-talo',
    'Mohatta Palace': 'karachi-mohatta-palace',
  },
  auckland: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ferry Building': 'auckland-ferry-building',
    'Victoria Park Market': 'auckland-victoria-park-market',
    'Albert Park': 'auckland-albert-park',
    'Aucklandin kaupungintalo': 'auckland-aucklandin-kaupungintalo',
    'Karangahape Road': 'auckland-karangahape-road',
    'Symonds Streetin hautausmaa': 'auckland-symonds-streetin-hautausmaa',
    'Ewelme Cottage': 'auckland-ewelme-cottage',
    Highwic: 'auckland-highwic',
    'Eden Park': 'auckland-eden-park',
    Maungawhau: 'auckland-maungawhau',
  },
  sanfrancisco: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ghirardelli Square': 'sanfrancisco-ghirardelli-square',
    'Coit Tower': 'sanfrancisco-coit-tower',
    'Ferry Building': 'sanfrancisco-ferry-building',
    'Transamerica Pyramid': 'sanfrancisco-transamerica-pyramid',
    'Haas–Lilienthalin talo': 'sanfrancisco-haas-lilienthalin-talo',
    'Old St. Mary\'s -katedraali': 'sanfrancisco-old-st-mary-s-katedraali',
    'Grace Cathedral': 'sanfrancisco-grace-cathedral',
    'Palace Hotel': 'sanfrancisco-palace-hotel',
    'Union Square': 'sanfrancisco-union-square',
    'San Franciscon kaupungintalo': 'sanfrancisco-san-franciscon-kaupungintalo',
  },
  buenosaires: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Pilarin basilika': 'buenosaires-pilarin-basilika',
    'Plaza San Martín': 'buenosaires-plaza-san-martin',
    'Palacio de Aguas Corrientes': 'buenosaires-palacio-de-aguas-corrientes',
    'Museo Mitre': 'buenosaires-museo-mitre',
    'Buenos Airesin katedraali': 'buenosaires-buenos-airesin-katedraali',
    'Café Tortoni': 'buenosaires-cafe-tortoni',
    'Palacio Barolo': 'buenosaires-palacio-barolo',
    Kongressipalatsi: 'buenosaires-kongressipalatsi',
    'Manzana de las Luces': 'buenosaires-manzana-de-las-luces',
    'Santo Domingon luostari': 'buenosaires-santo-domingon-luostari',
  },
  sydney: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sydney Harbour Bridge': 'sydney-sydney-harbour-bridge',
    'Sydneyn oopperatalo': 'sydney-sydneyn-oopperatalo',
    'Mrs Macquarie\'s Chair': 'sydney-mrs-macquarie-s-chair',
    'Sydneyn konservatorio': 'sydney-sydneyn-konservatorio',
    'Hyde Park Barracks': 'sydney-hyde-park-barracks',
    'Pyrmontin silta': 'sydney-pyrmontin-silta',
    'Pyhän Marian katedraali': 'sydney-pyhan-marian-katedraali',
    'Pyhän Andreaksen katedraali': 'sydney-pyhan-andreaksen-katedraali',
    'Australian museo': 'sydney-australian-museo',
    'Anzac-muistomerkki': 'sydney-anzac-muistomerkki',
  },
  rio: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'São Benton luostari': 'rio-sao-benton-luostari',
    'Vanha katedraali Antiga Sé': 'rio-vanha-katedraali-antiga-se',
    'Central do Brasilin asema': 'rio-central-do-brasilin-asema',
    'Real Gabinete -kirjasto': 'rio-real-gabinete-kirjasto',
    'Quinta da Boa Vista': 'rio-quinta-da-boa-vista',
    'Kansallinen historiallinen museo': 'rio-kansallinen-historiallinen-museo',
    'Theatro Municipal': 'rio-theatro-municipal',
    'Maracanãn stadion': 'rio-maracanan-stadion',
    'Lapan akvedukti': 'rio-lapan-akvedukti',
    'Passeio Público': 'rio-passeio-publico',
  },
};
