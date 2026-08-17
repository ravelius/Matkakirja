/*
 * Kohdekartan miniatyyripiirrokset (omistajan tilaus 15.8.2026:
 * "miniatyyrikuvat piirrettynä nähtävyyksistä ... Sama idea kuin
 * huvipuisto kartoissa"; "Tee piirrokset sinne [Berliiniin] ensin
 * sekä samat kolmeen kaupunkiin hki. Pariisi. Lontoo").
 *
 * Avaimet ovat samat kuin NAHTAVYYSJUTUT-taulussa: kaupungin tunnus →
 * kohteen NIMI → piirroksen polku. Numeropisteen napautus avaa kartan
 * päälle kortin (piirros + jutun alku), ja piirroksen napautus vie
 * itse juttuun (js/ui.js naytaMiniatyyri). Kaupunki tai kohde ilman
 * miniatyyriä toimii entiseen tapaan: napautus suoraan juttuun.
 *
 * Kuvat generoidaan tools/generoi-miniatyyrit.mjs:llä ja KATSOTAAN
 * SILMIN ennen tähän tauluun lisäämistä — tests/miniatyyrit.test.mjs
 * valvoo, että jokainen polku on olemassa ja jokainen nimi vastaa
 * kartan kohdetta.
 */

export const MINIATYYRIT = {
  berliini: {
    Valtiopäivätalo: 'assets/kartat/miniatyyrit/berliini-valtiopaivatalo.webp',
    'Brandenburgin portti': 'assets/kartat/miniatyyrit/berliini-brandenburgin-portti.webp',
    'Checkpoint Charlie': 'assets/kartat/miniatyyrit/berliini-checkpoint-charlie.webp',
    Museosaari: 'assets/kartat/miniatyyrit/berliini-museosaari.webp',
    'Tv-torni': 'assets/kartat/miniatyyrit/berliini-tv-torni.webp',
    'East Side Gallery': 'assets/kartat/miniatyyrit/berliini-east-side-gallery.webp',
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
  },
  lontoo: {
    'Buckinghamin palatsi': 'assets/kartat/miniatyyrit/lontoo-buckinghamin-palatsi.webp',
    'Trafalgar Square': 'assets/kartat/miniatyyrit/lontoo-trafalgar-square.webp',
    'Big Ben': 'assets/kartat/miniatyyrit/lontoo-big-ben.webp',
    'Lontoon silmä': 'assets/kartat/miniatyyrit/lontoo-lontoon-silma.webp',
    'Pyhän Paavalin katedraali': 'assets/kartat/miniatyyrit/lontoo-pyhan-paavalin-katedraali.webp',
    'Tower Bridge': 'assets/kartat/miniatyyrit/lontoo-tower-bridge.webp',
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
  },
  rooma: {
    Pietarinkirkko: 'assets/kartat/miniatyyrit/rooma-pietarinkirkko.webp',
    'Castel Sant’Angelo': 'assets/kartat/miniatyyrit/rooma-castel-santangelo.webp',
    'Espanjalaiset portaat': 'assets/kartat/miniatyyrit/rooma-espanjalaiset-portaat.webp',
    'Trevin suihkulähde': 'assets/kartat/miniatyyrit/rooma-trevin-suihkulahde.webp',
    Pantheon: 'assets/kartat/miniatyyrit/rooma-pantheon.webp',
    Colosseum: 'assets/kartat/miniatyyrit/rooma-colosseum.webp',
  },
  wien: {
    Raatihuone: 'assets/kartat/miniatyyrit/wien-raatihuone.webp',
    Hofburg: 'assets/kartat/miniatyyrit/wien-hofburg.webp',
    Valtionooppera: 'assets/kartat/miniatyyrit/wien-valtionooppera.webp',
    Stephansdom: 'assets/kartat/miniatyyrit/wien-stephansdom.webp',
    Belvedere: 'assets/kartat/miniatyyrit/wien-belvedere.webp',
    Jättiratas: 'assets/kartat/miniatyyrit/wien-jattiratas.webp',
    Schönbrunn: 'assets/kartat/miniatyyrit/wien-schonbrunn.webp',
  },
  praha: {
    'Petřínin näkötorni': 'assets/kartat/miniatyyrit/praha-petrinin-nakotorni.webp',
    'Prahan linna': 'assets/kartat/miniatyyrit/praha-prahan-linna.webp',
    Kaarlensilta: 'assets/kartat/miniatyyrit/praha-kaarlensilta.webp',
    'Vanhauusi synagoga': 'assets/kartat/miniatyyrit/praha-vanhauusi-synagoga.webp',
    'Astronominen kello': 'assets/kartat/miniatyyrit/praha-astronominen-kello.webp',
    Kansallismuseo: 'assets/kartat/miniatyyrit/praha-kansallismuseo.webp',
  },
  amsterdam: {
    Keskusrautatieasema: 'assets/kartat/miniatyyrit/amsterdam-keskusrautatieasema.webp',
    'Anne Frankin talo': 'assets/kartat/miniatyyrit/amsterdam-anne-frankin-talo.webp',
    Kuninkaanpalatsi: 'assets/kartat/miniatyyrit/amsterdam-kuninkaanpalatsi.webp',
    'Rembrandtin talo': 'assets/kartat/miniatyyrit/amsterdam-rembrandtin-talo.webp',
    'Artis-eläintarha': 'assets/kartat/miniatyyrit/amsterdam-artis-elaintarha.webp',
    Rijksmuseum: 'assets/kartat/miniatyyrit/amsterdam-rijksmuseum.webp',
  },
  tukholma: {
    Kaupungintalo: 'assets/kartat/miniatyyrit/tukholma-kaupungintalo.webp',
    'Riddarholmenin kirkko': 'assets/kartat/miniatyyrit/tukholma-riddarholmenin-kirkko.webp',
    'Sergelin tori': 'assets/kartat/miniatyyrit/tukholma-sergelin-tori.webp',
    Kuninkaanlinna: 'assets/kartat/miniatyyrit/tukholma-kuninkaanlinna.webp',
    'Vasa-museo': 'assets/kartat/miniatyyrit/tukholma-vasa-museo.webp',
    Skansen: 'assets/kartat/miniatyyrit/tukholma-skansen.webp',
  },
  /*
   * Erät 1–2 Euroopan ulkopuolelle ja Suomeen (17.8.2026). Neljä
   * kohdetta jäi pois katselmoinnissa hylättyinä — niiden promptit on
   * korjattu tools/generoi-miniatyyrit.mjs:ään ja ne generoidaan
   * uudelleen erässä 3: Tampereen tuomiokirkko (ei muistuttanut
   * kohdetta), Marcus Aureliuksen riemukaari (paperikehys ja väärä
   * muoto), Punainen linna (värillinen tyylirikko) ja Shitamachi-museo
   * (isometrinen leikkauskuva valkopohjalla). Kohde ilman miniatyyriä
   * toimii entiseen tapaan, joten aukot eivät riko karttaa.
   */
  tampere: {
    Näsinneula: 'assets/kartat/miniatyyrit/tampere-nasinneula.webp',
    'Finlaysonin tehdasalue': 'assets/kartat/miniatyyrit/tampere-finlaysonin-tehdasalue.webp',
    'Museokeskus Vapriikki': 'assets/kartat/miniatyyrit/tampere-museokeskus-vapriikki.webp',
    Hämeensilta: 'assets/kartat/miniatyyrit/tampere-hameensilta.webp',
    'Pyynikin näkötorni': 'assets/kartat/miniatyyrit/tampere-pyynikin-nakotorni.webp',
  },
  firenze: {
    Duomo: 'assets/kartat/miniatyyrit/firenze-duomo.webp',
    'Palazzo Vecchio': 'assets/kartat/miniatyyrit/firenze-palazzo-vecchio.webp',
    Uffizi: 'assets/kartat/miniatyyrit/firenze-uffizi.webp',
    'Ponte Vecchio': 'assets/kartat/miniatyyrit/firenze-ponte-vecchio.webp',
    'Santa Croce': 'assets/kartat/miniatyyrit/firenze-santa-croce.webp',
    'Bobolin puutarha': 'assets/kartat/miniatyyrit/firenze-bobolin-puutarha.webp',
  },
  bagdad: {
    'Mutanabbin katu': 'assets/kartat/miniatyyrit/bagdad-mutanabbin-katu.webp',
    'Qushlan kellotorni': 'assets/kartat/miniatyyrit/bagdad-qushlan-kellotorni.webp',
    Abbasidipalatsi: 'assets/kartat/miniatyyrit/bagdad-abbasidipalatsi.webp',
    'Khan Mirjan': 'assets/kartat/miniatyyrit/bagdad-khan-mirjan.webp',
    'Mustansiriya-koulu': 'assets/kartat/miniatyyrit/bagdad-mustansiriya-koulu.webp',
    'Bagdadin museo': 'assets/kartat/miniatyyrit/bagdad-bagdadin-museo.webp',
  },
  teheran: {
    'Teheranin basaari': 'assets/kartat/miniatyyrit/teheran-teheranin-basaari.webp',
    'Golestanin palatsi': 'assets/kartat/miniatyyrit/teheran-golestanin-palatsi.webp',
    'Dar al-Fonun': 'assets/kartat/miniatyyrit/teheran-dar-al-fonun.webp',
    'Iranin kansallismuseo': 'assets/kartat/miniatyyrit/teheran-iranin-kansallismuseo.webp',
    'Masoudiehin talo': 'assets/kartat/miniatyyrit/teheran-masoudiehin-talo.webp',
    'Sepahsalarin moskeija': 'assets/kartat/miniatyyrit/teheran-sepahsalarin-moskeija.webp',
  },
  tripoli: {
    'Darghutin moskeija': 'assets/kartat/miniatyyrit/tripoli-darghutin-moskeija.webp',
    'Vanhankaupungin kellotorni': 'assets/kartat/miniatyyrit/tripoli-vanhankaupungin-kellotorni.webp',
    'Karamanlin moskeija': 'assets/kartat/miniatyyrit/tripoli-karamanlin-moskeija.webp',
    'an-Naqan moskeija': 'assets/kartat/miniatyyrit/tripoli-an-naqan-moskeija.webp',
  },
  tokio: {
    Kaminarimon: 'assets/kartat/miniatyyrit/tokio-kaminarimon.webp',
    'Sensō-ji': 'assets/kartat/miniatyyrit/tokio-senso-ji.webp',
    "Kan'ei-ji": 'assets/kartat/miniatyyrit/tokio-kanei-ji.webp',
    'Tokion kansallismuseo': 'assets/kartat/miniatyyrit/tokio-tokion-kansallismuseo.webp',
    'Uenon puisto': 'assets/kartat/miniatyyrit/tokio-uenon-puisto.webp',
  },
  soul: {
    Gyeongbokgung: 'assets/kartat/miniatyyrit/soul-gyeongbokgung.webp',
    'Bukchonin hanok-kylä': 'assets/kartat/miniatyyrit/soul-bukchonin-hanok-kyla.webp',
    Changdeokgung: 'assets/kartat/miniatyyrit/soul-changdeokgung.webp',
    Jongmyo: 'assets/kartat/miniatyyrit/soul-jongmyo.webp',
    'Tapgol-puisto': 'assets/kartat/miniatyyrit/soul-tapgol-puisto.webp',
    Bosingak: 'assets/kartat/miniatyyrit/soul-bosingak.webp',
  },
  shanghai: {
    Bund: 'assets/kartat/miniatyyrit/shanghai-bund.webp',
    'Waibaidun silta': 'assets/kartat/miniatyyrit/shanghai-waibaidun-silta.webp',
    Rauhanhotelli: 'assets/kartat/miniatyyrit/shanghai-rauhanhotelli.webp',
    'Yu-puutarha': 'assets/kartat/miniatyyrit/shanghai-yu-puutarha.webp',
    'Nanjing-katu': 'assets/kartat/miniatyyrit/shanghai-nanjing-katu.webp',
    'Shanghain museo': 'assets/kartat/miniatyyrit/shanghai-shanghain-museo.webp',
  },
};
