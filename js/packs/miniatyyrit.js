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
    'Kulta-Liisa': 'berliini-kulta-liisa-vari2',
    'Hobrechtin putket': 'berliini-hobrechtin-putket-vari2',
    'Muuri 1961': 'assets/kartat/miniatyyrit/berliini-muuri-1961.webp',
    'Hattupäinen ukkeli': 'assets/kartat/miniatyyrit/berliini-hattupainen-ukkeli.webp',
    'Gaertnerin Berliini': 'assets/kartat/miniatyyrit/berliini-gaertnerin-berliini.webp',
    'Marlene Dietrich': 'assets/kartat/miniatyyrit/berliini-marlene-dietrich.webp',
    'Paavin kosto': 'assets/kartat/miniatyyrit/berliini-paavin-kosto.webp',
    Maailmankello: 'assets/kartat/miniatyyrit/berliini-maailmankello.webp',
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
    'Löyly ja avanto': 'helsinki-loyly-ja-avanto-vari2',
    Kantele: 'helsinki-kantele-vari2',
    Finlandia: 'helsinki-finlandia-vari2',
    Pirtukuningas: 'helsinki-pirtukuningas-vari2',
    'Nurmen kohu': 'helsinki-nurmen-kohu-vari2',
    'Suomi herää 1899': 'assets/kartat/miniatyyrit/helsinki-suomi-heraa-1899.webp',
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
    /*
     * MERKINTÄ ON LUPAUS PIIRROKSESTA (Raamattu, KARTTAUUDISTUKSEN
     * PAATOKSET 34 kohta 18 a, omistaja 18.9.2026 klo 17.55).
     *
     * Nähtävyyskartalla on nyt VAIN piirrettyjä rakennuksia, ja
     * lajittelun tekee tämä taulu: merkinnätön kohde on kaupungin
     * sisäinen nosto. Siksi tässä ei saa olla tilausta, jota ämpäri ei
     * ole toimittanut — sellainen merkintä piirsi WebKitillä sinisen
     * kysymysmerkin (rikkinäisen kuvan merkki) juuri sinne, mistä
     * omistaja pyysi merkit pois. Seitsemän M1/M2-tilausta (Carmenin
     * ensi-ilta, Kirahvin kävelymatka, Torni romuraudaksi,
     * Vrain-Lucas, Impressionistit, Kyyhkyposti, Tuileriain rauniot)
     * vastasivat 404:llä 18.9.2026, joten ne on poistettu tästä
     * taulusta — kohteet ovat liuskan kategorioissa ja avautuvat
     * samalla kortilla. Kun kuvaputki toimittaa piirroksen, rivi
     * palaa tähän ja kohde palaa kartalle.
     *
     * M3 (4.9.2026) toimitti Bastiljin PNG:n ämpäriin, joten se on
     * piirretty rakennus ja pysyy kartalla.
     */
    Bastilji: 'pariisi-bastilji-vari2',
    'Carmenin ensi-ilta': 'assets/kartat/miniatyyrit/pariisi-carmenin-ensi-ilta.webp',
    'Kirahvin kävelymatka': 'assets/kartat/miniatyyrit/pariisi-kirahvin-kavelymatka.webp',
    'Torni romuraudaksi': 'assets/kartat/miniatyyrit/pariisi-torni-romuraudaksi.webp',
    'Vrain-Lucas': 'assets/kartat/miniatyyrit/pariisi-vrain-lucas.webp',
    Impressionistit: 'assets/kartat/miniatyyrit/pariisi-impressionistit.webp',
    Kyyhkyposti: 'assets/kartat/miniatyyrit/pariisi-kyyhkyposti.webp',
    'Tuileriain rauniot': 'assets/kartat/miniatyyrit/pariisi-tuileriain-rauniot.webp',
    'Curie 1898': 'assets/kartat/miniatyyrit/pariisi-curie-1898.webp',
    'Lavoisier 1780': 'assets/kartat/miniatyyrit/pariisi-lavoisier-1780.webp',
    'Pasteur 1862': 'assets/kartat/miniatyyrit/pariisi-pasteur-1862.webp',
    'Torni 1888': 'assets/kartat/miniatyyrit/pariisi-torni-1888.webp',
    'Bastilji 1789': 'assets/kartat/miniatyyrit/pariisi-bastilji-1789.webp',
    'Lumière 1895': 'assets/kartat/miniatyyrit/pariisi-lumiere-1895.webp',
    '72 nimeä': 'assets/kartat/miniatyyrit/pariisi-72-nimea.webp',
    'Metron sisäänkäynti': 'assets/kartat/miniatyyrit/pariisi-metron-sisaankaynti.webp',
    'Notre-Damen kukko': 'assets/kartat/miniatyyrit/pariisi-notre-damen-kukko.webp',
    'Pariisi soi': 'assets/kartat/miniatyyrit/pariisi-pariisi-soi.webp',
    'Paras patonki': 'assets/kartat/miniatyyrit/pariisi-paras-patonki.webp',
    'Pariisin vuosisadat': 'assets/kartat/miniatyyrit/pariisi-pariisin-vuosisadat.webp',
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
    'Vanha London Bridge': 'lontoo-vanha-london-bridge-vari2',
    'Faraday 1831': 'assets/kartat/miniatyyrit/lontoo-faraday-1831.webp',
    'Fleming 1928': 'assets/kartat/miniatyyrit/lontoo-fleming-1928.webp',
    'Tunneli 1827': 'assets/kartat/miniatyyrit/lontoo-tunneli-1827.webp',
    'Palo 1666': 'assets/kartat/miniatyyrit/lontoo-palo-1666.webp',
    'Globe 1599': 'assets/kartat/miniatyyrit/lontoo-globe-1599.webp',
    'Metron höyryveturi': 'assets/kartat/miniatyyrit/lontoo-metron-hoyryveturi.webp',
    'Exchange Alley': 'assets/kartat/miniatyyrit/lontoo-exchange-alley.webp',
    'Canaletto Lontoossa': 'assets/kartat/miniatyyrit/lontoo-canaletto-lontoossa.webp',
    'Dickensin pubi': 'assets/kartat/miniatyyrit/lontoo-dickensin-pubi.webp',
    'Abbey Roadin suojatie': 'assets/kartat/miniatyyrit/lontoo-abbey-roadin-suojatie.webp',
    'Leake Streetin tunneli': 'assets/kartat/miniatyyrit/lontoo-leake-streetin-tunneli.webp',
    'Neljäs jalusta': 'assets/kartat/miniatyyrit/lontoo-neljas-jalusta.webp',
    Turbiinihalli: 'assets/kartat/miniatyyrit/lontoo-turbiinihalli.webp',
    Liukumäkiveistos: 'assets/kartat/miniatyyrit/lontoo-liukumakiveistos.webp',
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
    'Vararikko 1813': 'kobenhavn-vararikko-1813-vari2',
    Alberti: 'kobenhavn-alberti-vari2',
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
    'Forum Romanum': 'rooma-forum-romanum-vari2',
    'Banca Romana': 'rooma-banca-romana-vari2',
    'Sikstus 1510': 'assets/kartat/miniatyyrit/rooma-sikstus-1510.webp',
    'Kolikko olan yli': 'assets/kartat/miniatyyrit/rooma-kolikko-olan-yli.webp',
    'Areenan kellari': 'assets/kartat/miniatyyrit/rooma-areenan-kellari.webp',
    'Norsu ja obeliski': 'assets/kartat/miniatyyrit/rooma-norsu-ja-obeliski.webp',
    'Aqua Virgo': 'assets/kartat/miniatyyrit/rooma-aqua-virgo.webp',
    Nasone: 'assets/kartat/miniatyyrit/rooma-nasone.webp',
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
    Vuoristovesijohto: 'assets/kartat/miniatyyrit/wien-vuoristovesijohto.webp',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Klimtin maalaukset': 'wien-klimtin-maalaukset-vari2',
    Saliera: 'wien-saliera-vari2',
    'Yhdeksäs 1824': 'assets/kartat/miniatyyrit/wien-yhdeksas-1824.webp',
    'Figaro 1786': 'assets/kartat/miniatyyrit/wien-figaro-1786.webp',
    'Rattaan kulmat': 'assets/kartat/miniatyyrit/wien-rattaan-kulmat.webp',
    Lipizzanit: 'assets/kartat/miniatyyrit/wien-lipizzanit.webp',
    Taikahuilu: 'assets/kartat/miniatyyrit/wien-taikahuilu.webp',
    'Tonava kaunoinen': 'assets/kartat/miniatyyrit/wien-tonava-kaunoinen.webp',
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
    'Tycho Brahe': 'praha-tycho-brahe-vari2',
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
    Timanttihiomo: 'amsterdam-timanttihiomo-vari2',
    'Amsterdam-laiva': 'amsterdam-amsterdam-laiva-vari2',
    'Kapein talo': 'assets/kartat/miniatyyrit/amsterdam-kapein-talo.webp',
    Maitotyttö: 'assets/kartat/miniatyyrit/amsterdam-maitotytto.webp',
    Kissalaiva: 'assets/kartat/miniatyyrit/amsterdam-kissalaiva.webp',
    'Herengracht 537': 'assets/kartat/miniatyyrit/amsterdam-herengracht-537.webp',
    Yövartio: 'assets/kartat/miniatyyrit/amsterdam-yovartio.webp',
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
    Setelipankki: 'tukholma-setelipankki-vari2',
    Naamiaislaukaus: 'tukholma-naamiaislaukaus-vari2',
    Kreuger: 'tukholma-kreuger-vari2',
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
    Finlayson: 'tampere-finlayson-vari2',
    Tuomiokirkko: 'tampere-tuomiokirkko-vari2',
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
    'Poggin terassi': 'firenze-poggin-terassi-vari2',
    Porcellino: 'firenze-porcellino-vari2',
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
  // Euroopan puuttuvat kohdekarttaminatyyrit, erä A (21.9.2026).
  // Kuvat on tarkistettu sekä täydessä koossa että 96 px koossa ennen
  // pelipakettiin lisäämistä.
  bryssel: {
    'Brysselin pörssi': 'assets/kartat/miniatyyrit/bryssel-brysselin-porssi.webp',
    'Manneken Pis': 'assets/kartat/miniatyyrit/bryssel-manneken-pis.webp',
    Oikeuspalatsi: 'assets/kartat/miniatyyrit/bryssel-oikeuspalatsi.webp',
    'Grand-Place': 'assets/kartat/miniatyyrit/bryssel-grand-place.webp',
    'Galeries Royales Saint-Hubert': 'assets/kartat/miniatyyrit/bryssel-galeries-royales-saint-hubert.webp',
    'Mont des Arts': 'assets/kartat/miniatyyrit/bryssel-mont-des-arts.webp',
    Kuninkaanpalatsi: 'assets/kartat/miniatyyrit/bryssel-kuninkaanpalatsi.webp',
  },
  ljubljana: {
    'Tivoli-puisto': 'assets/kartat/miniatyyrit/ljubljana-tivoli-puisto.webp',
    Križanke: 'assets/kartat/miniatyyrit/ljubljana-kri-anke.webp',
    'Prešernin aukio': 'assets/kartat/miniatyyrit/ljubljana-pre-ernin-aukio.webp',
    Tromostovje: 'assets/kartat/miniatyyrit/ljubljana-tromostovje.webp',
    'Ljubljanan tuomiokirkko': 'assets/kartat/miniatyyrit/ljubljana-ljubljanan-tuomiokirkko.webp',
    'Ljubljanan linna': 'assets/kartat/miniatyyrit/ljubljana-ljubljanan-linna.webp',
    Keskustori: 'assets/kartat/miniatyyrit/ljubljana-keskustori.webp',
    Lohikäärmesilta: 'assets/kartat/miniatyyrit/ljubljana-lohikaarmesilta.webp',
  },
  kosice: {
    'Pyhän Elisabetin tuomiokirkko': 'assets/kartat/miniatyyrit/kosice-pyhan-elisabetin-tuomiokirkko.webp',
    'Urbanin torni': 'assets/kartat/miniatyyrit/kosice-urbanin-torni.webp',
    'Hlavná-katu': 'assets/kartat/miniatyyrit/kosice-hlavn-katu.webp',
    Valtionteatteri: 'assets/kartat/miniatyyrit/kosice-valtionteatteri.webp',
    Immaculata: 'assets/kartat/miniatyyrit/kosice-immaculata.webp',
    'Miklušin vankila': 'assets/kartat/miniatyyrit/kosice-miklu-in-vankila.webp',
    'Pyövelin bastioni': 'assets/kartat/miniatyyrit/kosice-pyovelin-bastioni.webp',
    'Jakabin palatsi': 'assets/kartat/miniatyyrit/kosice-jakabin-palatsi.webp',
  },
  bergen: {
    Nykirken: 'assets/kartat/miniatyyrit/bergen-nykirken.webp',
    'Fredriksbergin linnake': 'assets/kartat/miniatyyrit/bergen-fredriksbergin-linnake.webp',
    'Munkelivin luostari': 'assets/kartat/miniatyyrit/bergen-munkelivin-luostari.webp',
    Korskirken: 'assets/kartat/miniatyyrit/bergen-korskirken.webp',
    'Pyhän Yrjänän kirkko': 'assets/kartat/miniatyyrit/bergen-pyhan-yrjanan-kirkko.webp',
    Permanenten: 'assets/kartat/miniatyyrit/bergen-permanenten.webp',
    Kaupunginkirjasto: 'assets/kartat/miniatyyrit/bergen-kaupunginkirjasto.webp',
    Yliopistomuseo: 'assets/kartat/miniatyyrit/bergen-yliopistomuseo.webp',
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
    'Konstantinopoli 1453': 'assets/kartat/miniatyyrit/istanbul-konstantinopoli-1453.webp',
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
    'Times Square': 'newyork-times-square-vari2',
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
    'Akropolis-museo': 'assets/kartat/miniatyyrit/ateena-akropolis-museo.webp',
    'Iliou Melathron': 'assets/kartat/miniatyyrit/ateena-iliou-melathron.webp',
    Maratonhuijaus: 'assets/kartat/miniatyyrit/ateena-maratonhuijaus.webp',
    'Elginin marmorit': 'assets/kartat/miniatyyrit/ateena-elginin-marmorit.webp',
    'Diogeneen astia': 'assets/kartat/miniatyyrit/ateena-diogeneen-astia.webp',
    'Niken temppeli': 'assets/kartat/miniatyyrit/ateena-niken-temppeli.webp',
    'Louis 1896': 'assets/kartat/miniatyyrit/ateena-louis-1896.webp',
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
    Levski: 'sofia-levski-vari2',
    Ruhtinaskaappaus: 'sofia-ruhtinaskaappaus-vari2',
    Vihellyskonsertti: 'sofia-vihellyskonsertti-vari2',
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
    'Colțean torni': 'bukarest-coltean-torni-vari2',
    Kultakana: 'bukarest-kultakana-vari2',
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
    'Inat kuća': 'sarajevo-inat-kuca-vari2',
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
    'Casa de Fieras': 'madrid-casa-de-fieras-vari2',
    'Filipin patsas': 'madrid-filipin-patsas-vari2',
    Baldomera: 'madrid-baldomera-vari2',
    Tapaskierros: 'assets/kartat/miniatyyrit/madrid-tapaskierros.webp',
    'Goyan kansankuvat': 'assets/kartat/miniatyyrit/madrid-goyan-kansankuvat.webp',
    Chotis: 'assets/kartat/miniatyyrit/madrid-chotis.webp',
    'Kaksi joukkuetta': 'assets/kartat/miniatyyrit/madrid-kaksi-joukkuetta.webp',
    'Palamaton linna': 'assets/kartat/miniatyyrit/madrid-palamaton-linna.webp',
    'Gran Vía': 'assets/kartat/miniatyyrit/madrid-gran-v-a.webp',
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
    'Alves dos Reis': 'lissabon-alves-dos-reis-vari2',
    'Ultimaatum 1890': 'lissabon-ultimaatum-1890-vari2',
    'Kolumbus 1484': 'lissabon-kolumbus-1484-vari2',
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
    Maanalainen: 'budapest-maanalainen-vari2',
    'Elmyr de Hory': 'budapest-elmyr-de-hory-vari2',
    'Seuson hopeat': 'budapest-seuson-hopeat-vari2',
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
    'Wienin asema': 'varsova-wienin-asema-vari2',
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
    'Huudon varkaus': 'oslo-huudon-varkaus-vari2',
    Boheemikirja: 'oslo-boheemikirja-vari2',
    'Fram 1893': 'oslo-fram-1893-vari2',
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
    'Kellsin kirja': 'dublin-kellsin-kirja-vari2',
    'Ouzel Galley': 'dublin-ouzel-galley-vari2',
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
    'Font de Canaletes': 'barcelona-font-de-canaletes-vari2',
    'Roviran aukio': 'barcelona-roviran-aukio-vari2',
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
    'Perlovin teetalo': 'moskova-perlovin-teetalo-vari2',
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
    'Fabergé-museo': 'pietari-faberge-museo-vari2',
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-16b- ja
    // -22-20260907.json). Kuvaputki vei tiedostot pelin lukupolkuun
    // kohtaamiset/miniatyyrit/<tunnus>.png 7.9.2026
    // (posti/miniatyyrit-polkukorjaus-62-20260907.json); osoitteet
    // tarkistettu 200.
    'Mendelejev 1869': 'pietari-mendelejev-1869',
    'Jänissaari 1703': 'assets/kartat/miniatyyrit/pietari-janissaari-1703.webp',
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
    Kirjankantajat: 'vilna-kirjankantajat-vari2',
    'Salattu avioliitto': 'vilna-salattu-avioliitto-vari2',
    Boratynka: 'vilna-boratynka-vari2',
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
    'E-valtio': 'tallinna-e-valtio-vari2',
    'Lyhyen jalan torni': 'tallinna-lyhyen-jalan-torni-vari2',
    Pirtulaivat: 'tallinna-pirtulaivat-vari2',
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
    'Sacromonten luolat': 'granada-sacromonten-luolat-vari2',
    'Albaicínin näköalapaikka': 'granada-albaicinin-nakoalapaikka-vari2',
    Generalife: 'granada-generalife-vari2',
    'Granadan katedraali': 'granada-granadan-katedraali-vari2',
    Alhambra: 'granada-alhambra-vari2',
    'Manuel de Fallan talo': 'granada-manuel-de-fallan-talo-vari2',
    'Irvingin huoneet': 'granada-irvingin-huoneet-vari2',
    'Alcaicería': 'granada-alcaiceria-vari2',
  },
  krakova: {
    // Karttanostot kohdekartalle (M1/M2, 2.9.2026): kuva on tilattu
    // kuvaputkelta ja ilmestyy ämpäriin — siihen asti merkki on täplä.
    Wawel: 'krakova-wawel',
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    Barbakaani: 'krakova-barbakaani-vari2',
    'Collegium Maius': 'krakova-collegium-maius-vari2',
    Mariankirkko: 'krakova-mariankirkko-vari2',
    'Wawelin linna': 'krakova-wawelin-linna-vari2',
    'Wawelin lohikäärme': 'krakova-wawelin-lohikaarme-vari2',
    Kazimierz: 'krakova-kazimierz-vari2',
  },
  damaskos: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Damaskoksen linnoitus': 'damaskos-damaskoksen-linnoitus-vari2',
    'Umaijadien moskeija': 'damaskos-umaijadien-moskeija-vari2',
    'Hamidiyyan suuki': 'damaskos-hamidiyyan-suuki-vari2',
    'Khan As\'ad Pashan': 'damaskos-khan-as-ad-pashan-vari2',
    'Itäportti': 'damaskos-itaportti-vari2',
    'Kisanin portti': 'damaskos-kisanin-portti-vari2',
  },
  isfahan: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Jameh-moskeija': 'isfahan-jameh-moskeija-vari2',
    'Isfahanin basaari': 'isfahan-isfahanin-basaari-vari2',
    'Ali Qapu': 'isfahan-ali-qapu-vari2',
    'Shaahin moskeija': 'isfahan-shaahin-moskeija-vari2',
    'Hasht Behesht': 'isfahan-hasht-behesht-vari2',
    'Chahar Baghin koulu': 'isfahan-chahar-baghin-koulu-vari2',
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
    'Masmakin linnoitus': 'riad-masmakin-linnoitus-vari2',
    'Imam Turkin suurmoskeija': 'riad-imam-turkin-suurmoskeija-vari2',
    'Punainen palatsi': 'riad-punainen-palatsi-vari2',
    'Riadin vesitorni': 'riad-riadin-vesitorni-vari2',
    'Murabban palatsi': 'riad-murabban-palatsi-vari2',
    'Saudi-Arabian kansallismuseo': 'riad-saudi-arabian-kansallismuseo-vari2',
  },
  luxor: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Luxorin temppeli': 'luxor-luxorin-temppeli-vari2',
    'Luxorin museo': 'luxor-luxorin-museo-vari2',
    Sfinksikuja: 'luxor-sfinksikuja-vari2',
    'Mutin temppeli': 'luxor-mutin-temppeli-vari2',
    'Khonsun temppeli': 'luxor-khonsun-temppeli-vari2',
    'Karnakin suuri pylvässali': 'luxor-karnakin-suuri-pylvassali-vari2',
  },
  halab: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Aleppon linnoitus': 'halab-aleppon-linnoitus-vari2',
    'Antiokian portti': 'halab-antiokian-portti-vari2',
    'Qinnesrinin portti': 'halab-qinnesrinin-portti-vari2',
    Saippuakhan: 'halab-saippuakhan-vari2',
    'Arghunin sairaala': 'halab-arghunin-sairaala-vari2',
    'Beit Ajiqbash': 'halab-beit-ajiqbash-vari2',
  },
  masqat: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Masqatin portti': 'masqat-masqatin-portti-vari2',
    'Al-Miranin linnake': 'masqat-al-miranin-linnake-vari2',
    'Al-Jalalin linnake': 'masqat-al-jalalin-linnake-vari2',
    'Al Alamin palatsi': 'masqat-al-alamin-palatsi-vari2',
    'Bait Al Zubair': 'masqat-bait-al-zubair-vari2',
    'Motishwar Mandir': 'masqat-motishwar-mandir-vari2',
  },
  kuwait: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kuwait-tornit': 'kuwait-kuwait-tornit-vari2',
    'Al Hamra -torni': 'kuwait-al-hamra-torni-vari2',
    'Seifin palatsi': 'kuwait-seifin-palatsi-vari2',
    'Kuwaitin suurmoskeija': 'kuwait-kuwaitin-suurmoskeija-vari2',
    'Mubarakiyan tori': 'kuwait-mubarakiyan-tori-vari2',
    'Sadu House': 'kuwait-sadu-house-vari2',
  },
  nikosia: {
    'Selimiyen moskeija': 'nikosia-selimiyen-moskeija-vari2',
    'Büyük Han': 'nikosia-buyuk-han-vari2',
    'Faneromenin kirkko': 'nikosia-faneromenin-kirkko-vari2',
    'Omeryen hamam': 'nikosia-omeryen-hamam-vari2',
    'Kyproksen museo': 'nikosia-kyproksen-museo-vari2',
    'Leventis-museo': 'nikosia-leventis-museo-vari2',
  },
  luxemburg: {
    'Adolphe-silta': 'assets/kartat/miniatyyrit/luxemburg-adolphe-silta.webp',
    'Guillaume II:n aukio': 'assets/kartat/miniatyyrit/luxemburg-guillaume-ii-aukio.webp',
    'Notre-Damen katedraali': 'assets/kartat/miniatyyrit/luxemburg-notre-damen-katedraali.webp',
    'Suurherttuallinen palatsi': 'assets/kartat/miniatyyrit/luxemburg-suurherttuallinen-palatsi.webp',
    'Chemin de la Corniche': 'assets/kartat/miniatyyrit/luxemburg-chemin-de-la-corniche.webp',
    'Bockin kasematit': 'assets/kartat/miniatyyrit/luxemburg-bockin-kasematit.webp',
  },
  valletta: {
    'Auberge de Castille': 'assets/kartat/miniatyyrit/valletta-auberge-de-castille.webp',
    'Pyhän Johanneksen ko-katedraali': 'assets/kartat/miniatyyrit/valletta-pyhan-johanneksen-ko-katedraali.webp',
    'Suurmestarin palatsi': 'assets/kartat/miniatyyrit/valletta-suurmestarin-palatsi.webp',
    'Yläbarrakan puutarhat': 'assets/kartat/miniatyyrit/valletta-ylabarrakka-puutarhat.webp',
    'Piirityskello-muistomerkki': 'assets/kartat/miniatyyrit/valletta-piirityskello-muistomerkki.webp',
    'Pyhän Elmon linnake': 'assets/kartat/miniatyyrit/valletta-pyhan-elmon-linnake.webp',
  },
  doha: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Islamilaisen taiteen museo': 'doha-islamilaisen-taiteen-museo-vari2',
    Corniche: 'doha-corniche-vari2',
    'Souq Waqif': 'doha-souq-waqif-vari2',
    'Qatarin kansallismuseo': 'doha-qatarin-kansallismuseo-vari2',
    'Al Koot -linnake': 'doha-al-koot-linnake-vari2',
    Msheireb: 'doha-msheireb-vari2',
  },
  marseille: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    MuCEM: 'marseille-mucem-vari2',
    'Marseillen katedraali': 'marseille-marseillen-katedraali-vari2',
    'Saint-Victorin kirkko': 'marseille-saint-victorin-kirkko-vari2',
    Vanhasatama: 'marseille-vanhasatama-vari2',
    'Notre-Dame de la Garde': 'marseille-notre-dame-de-la-garde-vari2',
    'Saint-Charlesin asema': 'marseille-saint-charlesin-asema-vari2',
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
    'Vorontsovin majakka': 'odessa-vorontsovin-majakka-vari2',
    'Odessan satama': 'odessa-odessan-satama-vari2',
    'Potjomkinin portaat': 'odessa-potjomkinin-portaat-vari2',
    'Odessan oopperatalo': 'odessa-odessan-oopperatalo-vari2',
    Kaupunginpuisto: 'odessa-kaupunginpuisto-vari2',
    'Privozin tori': 'odessa-privozin-tori-vari2',
    'Potjomkin-portaat': 'odessa-potjomkin-portaat-vari2',
  },
  sevilla: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Katedraali ja Giralda': 'sevilla-katedraali-ja-giralda-vari2',
    'Alcázar': 'sevilla-alcazar-vari2',
    'Torre del Oro': 'sevilla-torre-del-oro-vari2',
    'Maestranzan areena': 'sevilla-maestranzan-areena-vari2',
    'Trianan silta': 'sevilla-trianan-silta-vari2',
    'Plaza de España': 'sevilla-plaza-de-espana-vari2',
    'Victorian laituri': 'sevilla-victorian-laituri-vari2',
  },
  dubrovnik: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Minčetan torni': 'dubrovnik-mincetan-torni-vari2',
    'Pilen portti': 'dubrovnik-pilen-portti-vari2',
    'Sponzan palatsi': 'dubrovnik-sponzan-palatsi-vari2',
    Vanhasatama: 'dubrovnik-vanhasatama-vari2',
    'Lovrijenacin linnake': 'dubrovnik-lovrijenacin-linnake-vari2',
    'Dubrovnikin katedraali': 'dubrovnik-dubrovnikin-katedraali-vari2',
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
    'Damaskoksen portti': 'jerusalem-damaskoksen-portti-vari2',
    'Pyhän haudan kirkko': 'jerusalem-pyhan-haudan-kirkko-vari2',
    Kalliomoskeija: 'jerusalem-kalliomoskeija-vari2',
    'Läntinen muuri': 'jerusalem-lantinen-muuri-vari2',
    'Jaffan portti': 'jerusalem-jaffan-portti-vari2',
    'Al-Aqsa-moskeija': 'jerusalem-al-aqsa-moskeija-vari2',
  },
  petra: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ad Deir': 'petra-ad-deir-vari2',
    'Bysanttilainen kirkko': 'petra-bysanttilainen-kirkko-vari2',
    Kuninkaanhaudat: 'petra-kuninkaanhaudat-vari2',
    'Qasr al-Bint': 'petra-qasr-al-bint-vari2',
    'Suuri temppeli': 'petra-suuri-temppeli-vari2',
    Teatteri: 'petra-teatteri-vari2',
    Siq: 'petra-siq-vari2',
    'Al-Khazneh': 'petra-al-khazneh-vari2',
    Uhripaikka: 'petra-uhripaikka-vari2',
  },
  persepolis: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kaikkien kansojen portti': 'persepolis-kaikkien-kansojen-portti-vari2',
    'Artakserkses III:n hauta': 'persepolis-artakserkses-iii-n-hauta-vari2',
    'Sadan pylvään sali': 'persepolis-sadan-pylvaan-sali-vari2',
    Apadana: 'persepolis-apadana-vari2',
    'Kolmen oven sali': 'persepolis-kolmen-oven-sali-vari2',
    Aarrekammio: 'persepolis-aarrekammio-vari2',
    Tachara: 'persepolis-tachara-vari2',
    'Hadishin palatsi': 'persepolis-hadishin-palatsi-vari2',
  },
  medina: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Qiblatayn-moskeija': 'medina-qiblatayn-moskeija-vari2',
    'Seitsemän moskeijaa': 'medina-seitseman-moskeijaa-vari2',
    'Profeetan moskeija': 'medina-profeetan-moskeija-vari2',
    'Al-Baqin hautausmaa': 'medina-al-baqin-hautausmaa-vari2',
    'Al-Ghamama-moskeija': 'medina-al-ghamama-moskeija-vari2',
    'Hidžaz-radan asema': 'medina-hidzaz-radan-asema-vari2',
    'Quba-moskeija': 'medina-quba-moskeija-vari2',
  },
  mekka: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Jabal al-Nour': 'mekka-jabal-al-nour-vari2',
    'Jannat al-Mu\'alla': 'mekka-jannat-al-mu-alla-vari2',
    'Jinnien moskeija': 'mekka-jinnien-moskeija-vari2',
    'Mekan kirjasto': 'mekka-mekan-kirjasto-vari2',
    'Suuri moskeija': 'mekka-suuri-moskeija-vari2',
    Kellotorni: 'mekka-kellotorni-vari2',
  },
  sana: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Al-Bakiriyyan moskeija': 'sana-al-bakiriyyan-moskeija-vari2',
    Suolatori: 'sana-suolatori-vari2',
    'Talhan moskeija': 'sana-talhan-moskeija-vari2',
    'Suuri moskeija': 'sana-suuri-moskeija-vari2',
    'Al-Mahdin moskeija': 'sana-al-mahdin-moskeija-vari2',
    'Bab al-Yaman': 'sana-bab-al-yaman-vari2',
  },
  aden: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Steamer Point': 'aden-steamer-point-vari2',
    Kansallismuseo: 'aden-kansallismuseo-vari2',
    'Craterin tori': 'aden-craterin-tori-vari2',
    'Tawilan altaat': 'aden-tawilan-altaat-vari2',
  },
  salalah: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sultan Qaboosin moskeija': 'salalah-sultan-qaboosin-moskeija-vari2',
    'Al-Husnin palatsi': 'salalah-al-husnin-palatsi-vari2',
    'Al-Haffan basaari': 'salalah-al-haffan-basaari-vari2',
    'Nabi Umranin hauta': 'salalah-nabi-umranin-hauta-vari2',
    'Burj an-Nahda': 'salalah-burj-an-nahda-vari2',
    'Al-Baleedin puisto': 'salalah-al-baleedin-puisto-vari2',
    Suitsukemuseo: 'salalah-suitsukemuseo-vari2',
  },
  mosul: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kuyunjikin kumpu': 'mosul-kuyunjikin-kumpu-vari2',
    'Bash Tapian linna': 'mosul-bash-tapian-linna-vari2',
    'Qara Saray': 'mosul-qara-saray-vari2',
    'Nabi Yunusin kumpu': 'mosul-nabi-yunusin-kumpu-vari2',
    'Al-Masfin moskeija': 'mosul-al-masfin-moskeija-vari2',
    'Al-Nabi Jirjisin moskeija': 'mosul-al-nabi-jirjisin-moskeija-vari2',
    'Al-Nurin moskeija': 'mosul-al-nurin-moskeija-vari2',
  },
  bangkok: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sanam Luang': 'bangkok-sanam-luang-vari2',
    'Wat Saket ja Kultainen vuori': 'bangkok-wat-saket-ja-kultainen-vuori-vari2',
    'Sao Ching Cha': 'bangkok-sao-ching-cha-vari2',
    'Wat Phra Kaew': 'bangkok-wat-phra-kaew-vari2',
    Suurpalatsi: 'bangkok-suurpalatsi-vari2',
    'Wat Pho': 'bangkok-wat-pho-vari2',
    'Wat Arun': 'bangkok-wat-arun-vari2',
    Yaowarat: 'bangkok-yaowarat-vari2',
    'Hua Lamphong': 'bangkok-hua-lamphong-vari2',
  },
  peking: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Vanha kesäpalatsi': 'peking-vanha-kesapalatsi-vari2',
    'Kesäpalatsi': 'peking-kesapalatsi-vari2',
    'Yonghe-temppeli': 'peking-yonghe-temppeli-vari2',
    Nanluoguxiang: 'peking-nanluoguxiang-vari2',
    'Rumpu- ja kellotorni': 'peking-rumpu-ja-kellotorni-vari2',
    'Jingshanin puisto': 'peking-jingshanin-puisto-vari2',
    'Kielletty kaupunki': 'peking-kielletty-kaupunki-vari2',
    Tiananmen: 'peking-tiananmen-vari2',
    Zhengyangmen: 'peking-zhengyangmen-vari2',
    'Taivaan temppeli': 'peking-taivaan-temppeli-vari2',
  },
  jakutsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Saha-teatteri': 'jakutsk-saha-teatteri-vari2',
    'Jaroslavskin museo': 'jakutsk-jaroslavskin-museo-vari2',
    'Spasskin luostari': 'jakutsk-spasskin-luostari-vari2',
    'Nikolskin kirkko': 'jakutsk-nikolskin-kirkko-vari2',
    'Pushkinin draamateatteri': 'jakutsk-pushkinin-draamateatteri-vari2',
    'Kansallinen taidemuseo': 'jakutsk-kansallinen-taidemuseo-vari2',
    Vanhakaupunki: 'jakutsk-vanhakaupunki-vari2',
    'Ooppera- ja balettiteatteri': 'jakutsk-ooppera-ja-balettiteatteri-vari2',
  },
  magadan: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kaupungin sauna': 'magadan-kaupungin-sauna-vari2',
    'Severovostokzoloton talo': 'magadan-severovostokzoloton-talo-vari2',
    'Leninin valtakatu 18': 'magadan-leninin-valtakatu-18-vari2',
    'Kinoteatteri Gornjak': 'magadan-kinoteatteri-gornjak-vari2',
    Nagajevanlahti: 'magadan-nagajevanlahti-vari2',
    Urheilupalatsi: 'magadan-urheilupalatsi-vari2',
    'Pushkinin kirjasto': 'magadan-pushkinin-kirjasto-vari2',
  },
  delhi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Delhi Junction': 'delhi-delhi-junction-vari2',
    'Delhin kaupungintalo': 'delhi-delhin-kaupungintalo-vari2',
    'Fatehpuri-moskeija': 'delhi-fatehpuri-moskeija-vari2',
    'Chandni Chowk': 'delhi-chandni-chowk-vari2',
    'Punainen linnoitus': 'delhi-punainen-linnoitus-vari2',
    'Gurdwara Sis Ganj Sahib': 'delhi-gurdwara-sis-ganj-sahib-vari2',
    'Jama Masjid': 'delhi-jama-masjid-vari2',
    'Humayunin mausoleumi': 'delhi-humayunin-mausoleumi-vari2',
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
    'Vanha rautatieasema': 'jekaterinburg-vanha-rautatieasema-vari2',
    'Kharitonovin kartano': 'jekaterinburg-kharitonovin-kartano-vari2',
    'Uralin valtionyliopisto': 'jekaterinburg-uralin-valtionyliopisto-vari2',
    'Historiallinen aukio': 'jekaterinburg-historiallinen-aukio-vari2',
    Kuvataidemuseo: 'jekaterinburg-kuvataidemuseo-vari2',
    'Suuri Zlatoust': 'jekaterinburg-suuri-zlatoust-vari2',
    'Kolminaisuuden katedraali': 'jekaterinburg-kolminaisuuden-katedraali-vari2',
  },
  novosibirsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Novosibirsk-Glavnyi': 'novosibirsk-novosibirsk-glavnyi-vari2',
    'Kaupungin kauppatalo': 'novosibirsk-kaupungin-kauppatalo-vari2',
    Taidemuseo: 'novosibirsk-taidemuseo-vari2',
    'Satohuoneiston talo': 'novosibirsk-satohuoneiston-talo-vari2',
    'Aleksanteri Nevskin katedraali': 'novosibirsk-aleksanteri-nevskin-katedraali-vari2',
  },
  irkutsk: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Znamenskin luostari': 'irkutsk-znamenskin-luostari-vari2',
    'Epifanian katedraali': 'irkutsk-epifanian-katedraali-vari2',
    'Taivaaseenastumisen kirkko': 'irkutsk-taivaaseenastumisen-kirkko-vari2',
    Rautatieasema: 'irkutsk-rautatieasema-vari2',
    'Ristin ylentämisen kirkko': 'irkutsk-ristin-ylentamisen-kirkko-vari2',
    '130. kortteli': 'irkutsk-130-kortteli-vari2',
    'Jäänmurtaja Angara': 'irkutsk-jaanmurtaja-angara-vari2',
  },
  kioto: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Kinkaku-ji': 'kioto-kinkaku-ji-vari2',
    'Ginkaku-ji': 'kioto-ginkaku-ji-vari2',
    'Keisarillinen palatsi': 'kioto-keisarillinen-palatsi-vari2',
    'Nijō-linna': 'kioto-nijo-linna-vari2',
    'Nishiki-tori': 'kioto-nishiki-tori-vari2',
    Gion: 'kioto-gion-vari2',
    'Kiyomizu-dera': 'kioto-kiyomizu-dera-vari2',
    'Sanjūsangen-dō': 'kioto-sanjusangen-do-vari2',
    'Tō-ji': 'kioto-to-ji-vari2',
    'Fushimi Inari-taisha': 'kioto-fushimi-inari-taisha-vari2',
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
    'Ulugbekin observatorio': 'samarkand-ulugbekin-observatorio-vari2',
    'Khoja Doniyorin mausoleumi': 'samarkand-khoja-doniyorin-mausoleumi-vari2',
    'Afrasiyabin rauniokumpu': 'samarkand-afrasiyabin-rauniokumpu-vari2',
    'Hazrat Khizrin moskeija': 'samarkand-hazrat-khizrin-moskeija-vari2',
    'Shah-i-Zindan hautakuja': 'samarkand-shah-i-zindan-hautakuja-vari2',
    'Bibi-Khanymin moskeija': 'samarkand-bibi-khanymin-moskeija-vari2',
    'Registanin aukio': 'samarkand-registanin-aukio-vari2',
    'Gur-e-Amir': 'samarkand-gur-e-amir-vari2',
    'Ishratkhanan mausoleumi': 'samarkand-ishratkhanan-mausoleumi-vari2',
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
    'Long Biênin silta': 'hanoi-long-bienin-silta-vari2',
    'Thăng Longin keisarilinna': 'hanoi-thang-longin-keisarilinna-vari2',
    'Đồng Xuânin tori': 'hanoi-ong-xuanin-tori-vari2',
    'Yhden pilarin pagodi': 'hanoi-yhden-pilarin-pagodi-vari2',
    'Hanoin lippulinna': 'hanoi-hanoin-lippulinna-vari2',
    'Ngọc Sơnin temppeli': 'hanoi-ngoc-sonin-temppeli-vari2',
    'Pyhän Joosefin katedraali': 'hanoi-pyhan-joosefin-katedraali-vari2',
    'Kirjallisuuden temppeli': 'hanoi-kirjallisuuden-temppeli-vari2',
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
    Boudhanath: 'kathmandu-boudhanath-vari2',
    Swayambhunath: 'kathmandu-swayambhunath-vari2',
    'Unelmien puutarha': 'kathmandu-unelmien-puutarha-vari2',
    Pashupatinath: 'kathmandu-pashupatinath-vari2',
    'Rani Pokhari': 'kathmandu-rani-pokhari-vari2',
    'Kathmandun Durbar-aukio': 'kathmandu-kathmandun-durbar-aukio-vari2',
    Dharahara: 'kathmandu-dharahara-vari2',
    'Patanin Durbar-aukio': 'kathmandu-patanin-durbar-aukio-vari2',
  },
  astana: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Astana Opera': 'astana-astana-opera-vari2',
    'Khan Shatyr': 'astana-khan-shatyr-vari2',
    Bajterek: 'astana-bajterek-vari2',
    'Nurjol-bulevardi': 'astana-nurjol-bulevardi-vari2',
    Akorda: 'astana-akorda-vari2',
    'Hazrat Sultanin moskeija': 'astana-hazrat-sultanin-moskeija-vari2',
    'Rauhan ja sovinnon palatsi': 'astana-rauhan-ja-sovinnon-palatsi-vari2',
    Kansallismuseo: 'astana-kansallismuseo-vari2',
  },
  kanton: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Zhenhai-torni': 'kanton-zhenhai-torni-vari2',
    'Guangxiao-temppeli': 'kanton-guangxiao-temppeli-vari2',
    'Chenin suvun sali': 'kanton-chenin-suvun-sali-vari2',
    'Liurong-temppeli': 'kanton-liurong-temppeli-vari2',
    'Huaisheng-moskeija': 'kanton-huaisheng-moskeija-vari2',
    'Pyhän sydämen katedraali': 'kanton-pyhan-sydamen-katedraali-vari2',
    'Kolmentoista faktorian paikka': 'kanton-kolmentoista-faktorian-paikka-vari2',
    'Shamianin saari': 'kanton-shamianin-saari-vari2',
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
    'Mandalay-kukkula': 'mandalay-mandalay-kukkula-vari2',
    'Kuthodaw-pagodi': 'mandalay-kuthodaw-pagodi-vari2',
    'Kyauktawgyi-pagodi': 'mandalay-kyauktawgyi-pagodi-vari2',
    'Sandamuni-pagodi': 'mandalay-sandamuni-pagodi-vari2',
    'Shwenandaw-luostari': 'mandalay-shwenandaw-luostari-vari2',
    'Mandalayn palatsi': 'mandalay-mandalayn-palatsi-vari2',
    'Zegyo-tori': 'mandalay-zegyo-tori-vari2',
    'Setkyathiha-pagodi': 'mandalay-setkyathiha-pagodi-vari2',
    'Mahamuni-temppeli': 'mandalay-mahamuni-temppeli-vari2',
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
    'Tsim Sha Tsuin kellotorni': 'hongkong-tsim-sha-tsuin-kellotorni-vari2',
    'Western Market': 'hongkong-western-market-vari2',
    'Star Ferryn laituri': 'hongkong-star-ferryn-laituri-vari2',
    'Man Mo -temppeli': 'hongkong-man-mo-temppeli-vari2',
    'Tai Kwun': 'hongkong-tai-kwun-vari2',
    'Pyhän Johanneksen katedraali': 'hongkong-pyhan-johanneksen-katedraali-vari2',
    'Victoria Peak': 'hongkong-victoria-peak-vari2',
    'Sininen talo': 'hongkong-sininen-talo-vari2',
    'Vaunuradan alaterminaali': 'hongkong-vaunuradan-alaterminaali-vari2',
  },
  jakarta: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Sunda Kelapan satama': 'jakarta-sunda-kelapan-satama-vari2',
    Merenkulkumuseo: 'jakarta-merenkulkumuseo-vari2',
    'Kota Intanin nostosilta': 'jakarta-kota-intanin-nostosilta-vari2',
    'Fatahillah-aukio': 'jakarta-fatahillah-aukio-vari2',
    'Toko Merah': 'jakarta-toko-merah-vari2',
    'Jakarta Kotan asema': 'jakarta-jakarta-kotan-asema-vari2',
    'Kim Tek Ie -temppeli': 'jakarta-kim-tek-ie-temppeli-vari2',
    'Jakartan katedraali': 'jakarta-jakartan-katedraali-vari2',
    'Istiqlal-moskeija': 'jakarta-istiqlal-moskeija-vari2',
    'Kansallismonumentti Monas': 'jakarta-kansallismonumentti-monas-vari2',
  },
  manila: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Binondon kirkko': 'manila-binondon-kirkko-vari2',
    'Quiapon kirkko': 'manila-quiapon-kirkko-vari2',
    'Escolta-katu': 'manila-escolta-katu-vari2',
    'Jones-silta': 'manila-jones-silta-vari2',
    'Fort Santiago': 'manila-fort-santiago-vari2',
    'Manilan katedraali': 'manila-manilan-katedraali-vari2',
    'San Agustinin kirkko': 'manila-san-agustinin-kirkko-vari2',
    'Kansallinen taidemuseo': 'manila-kansallinen-taidemuseo-vari2',
    'Baluarte de San Diego': 'manila-baluarte-de-san-diego-vari2',
    'Rizal-puisto': 'manila-rizal-puisto-vari2',
  },
  kashgar: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Afaq Khojan mausoleumi': 'kashgar-afaq-khojan-mausoleumi-vari2',
    'Chini-Bagh': 'kashgar-chini-bagh-vari2',
    'Suuri basaari': 'kashgar-suuri-basaari-vari2',
    'Id Kahin moskeija': 'kashgar-id-kahin-moskeija-vari2',
    Vanhakaupunki: 'kashgar-vanhakaupunki-vari2',
    Kansanpuisto: 'kashgar-kansanpuisto-vari2',
    'Yusuf Khass Hajibin mausoleumi': 'kashgar-yusuf-khass-hajibin-mausoleumi-vari2',
  },
  lhasa: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ramoche-temppeli': 'lhasa-ramoche-temppeli-vari2',
    'Potala-palatsi': 'lhasa-potala-palatsi-vari2',
    Norbulingka: 'lhasa-norbulingka-vari2',
    'Jokhang-temppeli': 'lhasa-jokhang-temppeli-vari2',
    Chagpori: 'lhasa-chagpori-vari2',
    'Tiibetin museo': 'lhasa-tiibetin-museo-vari2',
    'Lhasan suuri moskeija': 'lhasa-lhasan-suuri-moskeija-vari2',
  },
  kolkata: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Howrah-silta': 'kolkata-howrah-silta-vari2',
    'Howrahin rautatieasema': 'kolkata-howrahin-rautatieasema-vari2',
    'Marble Palace': 'kolkata-marble-palace-vari2',
    'Nakhodan moskeija': 'kolkata-nakhodan-moskeija-vari2',
    'College Street': 'kolkata-college-street-vari2',
    'Writers’ Building': 'kolkata-writers-building-vari2',
    'St. John’sin kirkko': 'kolkata-st-john-sin-kirkko-vari2',
    'Shaheed Minar': 'kolkata-shaheed-minar-vari2',
    'Intian museo': 'kolkata-intian-museo-vari2',
    'Victoria Memorial': 'kolkata-victoria-memorial-vari2',
  },
  kabul: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Timur Shahin mausoleumi': 'kabul-timur-shahin-mausoleumi-vari2',
    'Shah-Do Shamshiran moskeija': 'kabul-shah-do-shamshiran-moskeija-vari2',
    'Ka Faroshin lintutori': 'kabul-ka-faroshin-lintutori-vari2',
    'Bala Hissar': 'kabul-bala-hissar-vari2',
    'Baburin puutarhat': 'kabul-baburin-puutarhat-vari2',
    'Kabulin vanha kaupunginmuuri': 'kabul-kabulin-vanha-kaupunginmuuri-vari2',
    'Chihil Sutunin palatsi': 'kabul-chihil-sutunin-palatsi-vari2',
    'Darul Amanin palatsi': 'kabul-darul-amanin-palatsi-vari2',
  },
  chennai: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Madrasin ylin oikeus': 'chennai-madrasin-ylin-oikeus-vari2',
    'Chennai Centralin asema': 'chennai-chennai-centralin-asema-vari2',
    'Ripon Building': 'chennai-ripon-building-vari2',
    'Fort St. George': 'chennai-fort-st-george-vari2',
    'Chennai Egmoren asema': 'chennai-chennai-egmoren-asema-vari2',
    'Government Museum': 'chennai-government-museum-vari2',
    'Chepaukin palatsi': 'chennai-chepaukin-palatsi-vari2',
    'Marina Beach': 'chennai-marina-beach-vari2',
    'Kapaleeshwararin temppeli': 'chennai-kapaleeshwararin-temppeli-vari2',
    'San Thomen basilika': 'chennai-san-thomen-basilika-vari2',
  },
  mumbai: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Crawford Market': 'mumbai-crawford-market-vari2',
    'Marine Drive': 'mumbai-marine-drive-vari2',
    'Chhatrapati Shivaji Maharaj Terminus': 'mumbai-chhatrapati-shivaji-maharaj-terminus-vari2',
    'St. Thomasin katedraali': 'mumbai-st-thomasin-katedraali-vari2',
    'Town Hall': 'mumbai-town-hall-vari2',
    'Bombayn korkein oikeus': 'mumbai-bombayn-korkein-oikeus-vari2',
    'Rajabain kellotorni': 'mumbai-rajabain-kellotorni-vari2',
    'David Sassoonin kirjasto': 'mumbai-david-sassoonin-kirjasto-vari2',
    'Prince of Walesin museo': 'mumbai-prince-of-walesin-museo-vari2',
    'Gateway of India': 'mumbai-gateway-of-india-vari2',
  },
  colombo: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Colombon satama': 'colombo-colombon-satama-vari2',
    'Wolvendaalin kirkko': 'colombo-wolvendaalin-kirkko-vari2',
    'Punainen moskeija': 'colombo-punainen-moskeija-vari2',
    'Fortin kellotorni': 'colombo-fortin-kellotorni-vari2',
    'Fortin rautatieasema': 'colombo-fortin-rautatieasema-vari2',
    'Beira-järvi': 'colombo-beira-jarvi-vari2',
    'Galle Face Hotel': 'colombo-galle-face-hotel-vari2',
    'Gangaramayan temppeli': 'colombo-gangaramayan-temppeli-vari2',
    'Colombon kansallismuseo': 'colombo-colombon-kansallismuseo-vari2',
  },
  karachi: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Empress Market': 'karachi-empress-market-vari2',
    'Karachin kaupungintalo': 'karachi-karachin-kaupungintalo-vari2',
    'Denso Hall': 'karachi-denso-hall-vari2',
    'Pyhän Kolminaisuuden katedraali': 'karachi-pyhan-kolminaisuuden-katedraali-vari2',
    'Wazir Mansion': 'karachi-wazir-mansion-vari2',
    'Merewetherin kellotorni': 'karachi-merewetherin-kellotorni-vari2',
    'Karachi Cityn rautatieasema': 'karachi-karachi-cityn-rautatieasema-vari2',
    'Frere Hall': 'karachi-frere-hall-vari2',
    'Satamahallinnon talo': 'karachi-satamahallinnon-talo-vari2',
    'Mohatta Palace': 'karachi-mohatta-palace-vari2',
  },
  auckland: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ferry Building': 'auckland-ferry-building-vari2',
    'Victoria Park Market': 'auckland-victoria-park-market-vari2',
    'Albert Park': 'auckland-albert-park-vari2',
    'Aucklandin kaupungintalo': 'auckland-aucklandin-kaupungintalo-vari2',
    'Karangahape Road': 'auckland-karangahape-road-vari2',
    'Symonds Streetin hautausmaa': 'auckland-symonds-streetin-hautausmaa-vari2',
    'Ewelme Cottage': 'auckland-ewelme-cottage-vari2',
    Highwic: 'auckland-highwic-vari2',
    'Eden Park': 'auckland-eden-park-vari2',
    Maungawhau: 'auckland-maungawhau-vari2',
  },
  sanfrancisco: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Ghirardelli Square': 'sanfrancisco-ghirardelli-square-vari2',
    'Coit Tower': 'sanfrancisco-coit-tower-vari2',
    'Ferry Building': 'sanfrancisco-ferry-building-vari2',
    'Transamerica Pyramid': 'sanfrancisco-transamerica-pyramid-vari2',
    'Haas–Lilienthalin talo': 'sanfrancisco-haas-lilienthalin-talo-vari2',
    'Old St. Mary\'s -katedraali': 'sanfrancisco-old-st-mary-s-katedraali-vari2',
    'Grace Cathedral': 'sanfrancisco-grace-cathedral-vari2',
    'Palace Hotel': 'sanfrancisco-palace-hotel-vari2',
    'Union Square': 'sanfrancisco-union-square-vari2',
    'San Franciscon kaupungintalo': 'sanfrancisco-san-franciscon-kaupungintalo-vari2',
  },
  buenosaires: {
    // M3 (4.9.2026, omistaja: "Lisää kaikkiin puuttuviin kaupunki
    // karttoihin oikeat miniatyyrikuvat"): tunnus tilattu kuvaputkelta
    // kiireellisenä; merkki on täplä, kunnes PNG on ämpärissä.
    'Pilarin basilika': 'buenosaires-pilarin-basilika-vari2',
    'Plaza San Martín': 'buenosaires-plaza-san-martin-vari2',
    'Palacio de Aguas Corrientes': 'buenosaires-palacio-de-aguas-corrientes-vari2',
    'Museo Mitre': 'buenosaires-museo-mitre-vari2',
    'Buenos Airesin katedraali': 'buenosaires-buenos-airesin-katedraali-vari2',
    'Café Tortoni': 'buenosaires-cafe-tortoni-vari2',
    'Palacio Barolo': 'buenosaires-palacio-barolo-vari2',
    Kongressipalatsi: 'buenosaires-kongressipalatsi-vari2',
    'Manzana de las Luces': 'buenosaires-manzana-de-las-luces-vari2',
    'Santo Domingon luostari': 'buenosaires-santo-domingon-luostari-vari2',
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
    'São Benton luostari': 'rio-sao-benton-luostari-vari2',
    'Vanha katedraali Antiga Sé': 'rio-vanha-katedraali-antiga-se-vari2',
    'Central do Brasilin asema': 'rio-central-do-brasilin-asema-vari2',
    'Real Gabinete -kirjasto': 'rio-real-gabinete-kirjasto-vari2',
    'Quinta da Boa Vista': 'rio-quinta-da-boa-vista-vari2',
    'Kansallinen historiallinen museo': 'rio-kansallinen-historiallinen-museo-vari2',
    'Theatro Municipal': 'rio-theatro-municipal-vari2',
    'Maracanãn stadion': 'rio-maracanan-stadion-vari2',
    'Lapan akvedukti': 'rio-lapan-akvedukti-vari2',
    'Passeio Público': 'rio-passeio-publico-vari2',
  },
  halifax: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-16b- ja
    // -22-20260907.json). Kuvaputki vei tiedostot pelin lukupolkuun
    // kohtaamiset/miniatyyrit/<tunnus>.png 7.9.2026
    // (posti/miniatyyrit-polkukorjaus-62-20260907.json); osoitteet
    // tarkistettu 200.
    'Vanha kellotorni': 'halifax-vanha-kellotorni',
    'Pyhän Paavalin kirkko': 'halifax-pyhan-paavalin-kirkko',
    'Atlantin merimuseo': 'halifax-atlantin-merimuseo',
    'Julkinen puutarha': 'halifax-julkinen-puutarha',
    'Vanha hautausmaa': 'halifax-vanha-hautausmaa',
    'Pier 21': 'halifax-pier-21',
    'Point Pleasant Park': 'halifax-point-pleasant-park',
  },
  miami: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-16b- ja
    // -22-20260907.json). Kuvaputki vei tiedostot pelin lukupolkuun
    // kohtaamiset/miniatyyrit/<tunnus>.png 7.9.2026
    // (posti/miniatyyrit-polkukorjaus-62-20260907.json); osoitteet
    // tarkistettu 200.
    'Wynwoodin muraalikorttelit': 'miami-wynwoodin-muraalikorttelit',
    'Esittävän taiteen keskus': 'miami-esittavan-taiteen-keskus',
    'Pérezin taidemuseo': 'miami-perezin-taidemuseo',
    'Lyric-teatteri': 'miami-lyric-teatteri',
    Vapaudentorni: 'miami-vapaudentorni',
    'Bayfront Park': 'miami-bayfront-park',
    'Olympia-teatteri': 'miami-olympia-teatteri',
  },
  kapkaupunki: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-16b- ja
    // -22-20260907.json). Kuvaputki vei tiedostot pelin lukupolkuun
    // kohtaamiset/miniatyyrit/<tunnus>.png 7.9.2026
    // (posti/miniatyyrit-polkukorjaus-62-20260907.json); osoitteet
    // tarkistettu 200.
    Hyväntoivonlinnoitus: 'kapkaupunki-hyvantoivonlinnoitus',
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24c-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    'V&A Waterfront': 'kapkaupunki-va-waterfront',
    'Greenmarket Square': 'kapkaupunki-greenmarket-square',
    'Iziko Slave Lodge': 'kapkaupunki-iziko-slave-lodge',
    'Iziko Etelä-Afrikan museo': 'kapkaupunki-iziko-etela-afrikan-museo',
  },
  nairobi: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-16b- ja
    // -22-20260907.json). Kuvaputki vei tiedostot pelin lukupolkuun
    // kohtaamiset/miniatyyrit/<tunnus>.png 7.9.2026
    // (posti/miniatyyrit-polkukorjaus-62-20260907.json); osoitteet
    // tarkistettu 200.
    'Nairobin arboretum': 'nairobi-arboretum',
    'Kenian kansallisarkisto': 'nairobi-kenian-kansallisarkisto',
    'Nairobin rautatiemuseo': 'nairobi-rautatiemuseo',
  },
  wellington: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24c-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    Rautatieasema: 'wellington-rautatieasema',
    'Bolton Streetin hautausmaa': 'wellington-bolton-streetin-hautausmaa',
    'Wellingtonin museo': 'wellington-wellingtonin-museo',
    'Circa-teatteri': 'wellington-circa-teatteri',
    'Oriental Bay': 'wellington-oriental-bay',
    'Embassy-teatteri': 'wellington-embassy-teatteri',
    'Nairn Streetin mökki': 'wellington-nairn-streetin-mokki',
    'Basin Reserve': 'wellington-basin-reserve',
  },
  christchurch: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24c-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    'Victorian kellotorni': 'christchurch-victorian-kellotorni',
    Kaupungintalo: 'christchurch-kaupungintalo',
    'Provinssineuvoston talo': 'christchurch-provinssineuvoston-talo',
    'New Regent Street': 'christchurch-new-regent-street',
    Taidegalleria: 'christchurch-taidegalleria',
    'Canterburyn museo': 'christchurch-canterburyn-museo',
  },
  portoalegre: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24d-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    'Joaquim Felizardon museo': 'portoalegre-joaquim-felizardon-museo',
  },
  asuncion: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24d-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    Kaupunginteatteri: 'asuncion-kaupunginteatteri',
    'Ateneo Paraguayo': 'asuncion-ateneo-paraguayo',
  },
  honiara: {
    // Kuvaputken toimitus 7.9.2026 (posti/kuvatoimitus-24d-20260907.json).
    // Tiedosto on pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png;
    // osoite tarkistettu 200.
    //
    // KAKSI TUNNUSTA EI OLE NIMEN SLUG. Kuvaputki toimitti museon
    // nimellä honiara-kansallismuseo (ei -salomonsaarten-kansallismuseo)
    // ja katedraalin nimellä honiara-holy-cross-katedraali (ei
    // -holy-crossin-katedraali). Tunnus on ämpärin tiedostonimi, ja
    // kuva on ämpärissä VAIN näillä nimillä — slugia noudattava tunnus
    // pudottaisi merkin täpläksi. Nimi on silti kartan kohteen nimi,
    // joten kytkentä ja tests/miniatyyrit.test.mjs pysyvät ehjinä.
    'Salomonsaarten kansallismuseo': 'honiara-kansallismuseo',
    'Point Cruz': 'honiara-point-cruz',
    'Holy Crossin katedraali': 'honiara-holy-cross-katedraali',
    'Guadalcanalin muistomerkki': 'honiara-guadalcanalin-muistomerkki',
    // Parlamenttitalo tuli erässä 16e (posti/kuvatoimitus-16e-20260907.json):
    // erässä 24d se oli vielä uusittavana, koska rakennus oli piirtynyt
    // vajaana. Nyt kartion muotoinen kokonainen kattorakenne on lähdekuvan
    // mukainen.
    Parlamenttitalo: 'honiara-parlamenttitalo',
  },
  portvila: {
    // Kuvaputken toimitus 7.9.2026: neljä kohdetta erästä 16e
    // (posti/kuvatoimitus-16e-20260907.json) ja parlamenttitalo erästä 20f
    // (posti/kuvatoimitus-20f-20260907.json). Tiedostot ovat pelin
    // lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png; osoitteet
    // tarkistettu 200 ja sha256 toimitusta vasten.
    'Kormanin stadion': 'portvila-kormanin-stadion',
    'Pyhän sydämen katedraali': 'portvila-pyhan-sydamen-katedraali',
    'Independence Park': 'portvila-independence-park',
    'Vanuatun kulttuurikeskus': 'portvila-vanuatun-kulttuurikeskus',
    'Vanuatun parlamenttitalo': 'portvila-vanuatun-parlamenttitalo',
  },
  houston: {
    // Kuvaputken toimitus 7.9.2026: Julia Idesonin kirjastotalo ja Hermann
    // Park erästä 16e, Market Squaren puisto erästä 20f. Tiedostot ovat
    // pelin lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png.
    //
    // YKSI TUNNUS EI OLE NIMEN SLUG. Kuvaputki toimitti kirjastotalon
    // nimellä houston-julia-idesonin-kirjasto (ei -kirjastotalo). Tunnus on
    // ämpärin tiedostonimi ja kuva on ämpärissä VAIN tällä nimellä, joten
    // slugia noudattava tunnus pudottaisi merkin varatäpläksi. Nimi on
    // silti kartan kohteen nimi, joten tests/miniatyyrit.test.mjs pitää.
    'Julia Idesonin kirjastotalo': 'houston-julia-idesonin-kirjasto',
    'Hermann Park': 'houston-hermann-park',
    'Market Squaren puisto': 'houston-market-squaren-puisto',
    // Erä 19g (posti/kuvatoimitus-19g-20260907.json) täytti loput viisi
    // kohdetta, joten Houstonin kaikilla kartan kohteilla on nyt piirros.
    'Astrosin stadion': 'houston-astrosin-stadion',
    'Buffalo Bayoun puisto': 'houston-buffalo-bayoun-puisto',
    'Menilin kokoelma': 'houston-menilin-kokoelma',
    'Sam Houstonin puisto': 'houston-sam-houstonin-puisto',
    Kongressikeskus: 'houston-kongressikeskus',
  },
  denver: {
    // Kuvaputken toimitus 7.9.2026, erä 20f
    // (posti/kuvatoimitus-20f-20260907.json). Tiedostot ovat pelin
    // lukupolussa kohtaamiset/miniatyyrit/<tunnus>.png.
    //
    // YKSI TUNNUS EI OLE NIMEN SLUG: Daniels & Fisherin torni on ämpärissä
    // nimellä denver-daniels-fisher-torni (ei -daniels-fisherin-torni).
    // Sama syy kuin Houstonissa — tunnus on tiedostonimi.
    //
    // TOINEN TUNNUS EI OLE NIMEN SLUG (erä 19g): Denverin taidemuseo on
    // ämpärissä nimellä denver-taidemuseo (ei -denverin-taidemuseo).
    // Sama sääntö kuin yllä — tunnus on ämpärin tiedostonimi.
    'Coors Field': 'denver-coors-field',
    'Daniels & Fisherin torni': 'denver-daniels-fisher-torni',
    Katedraalibasilika: 'denver-katedraalibasilika',
    // Erä 19g (posti/kuvatoimitus-19g-20260907.json) täytti loput viisi
    // kohdetta, joten Denverin kaikilla kartan kohteilla on nyt piirros.
    'Denverin taidemuseo': 'denver-taidemuseo',
    'Molly Brownin talo': 'denver-molly-brownin-talo',
    'Kasvitieteellinen puutarha': 'denver-kasvitieteellinen-puutarha',
    'Brown Palace -hotelli': 'denver-brown-palace-hotelli',
    'Esittävän taiteen keskus': 'denver-esittavan-taiteen-keskus',
  },
};
