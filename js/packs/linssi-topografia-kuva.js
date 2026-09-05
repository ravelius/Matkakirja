// Reliefikartta: maailma maastona. Kuvan polku ja sen paikka laudalla.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin:
//   NODE_USE_ENV_PROXY=1 node tools/tee-reliefikartta.mjs
//
// Aineisto: NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1
//           kaariminuutti
// Viite:    Amante & Eakins 2009, NOAA NCEI, doi:10.7289/V5C8276M
// Haettu:   2026-08-04 osoitteesta
//           https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360 (NOAA CoastWatch ERDDAP)
// Lisenssi: Public domain — Yhdysvaltain liittovaltion viraston (NOAA)
//           tuottamana aineisto ei ole tekijänoikeuden alainen. ERDDAPin
//           oma lisenssiteksti: "The data may be used and redistributed for
//           free but is not intended for legal use, since it may contain
//           inaccuracies."
//
// TÄSSÄ TIEDOSTOSSA EI OLE KUVAA vaan sen polku. Kuva on binääri ja
// asuu assets-kansiossa: assets/linssit/topografia.webp (1019 kt).
// Yhden tiedoston versio (dist/matkakirja.html) ei siis saa tätä
// linssiä mukaansa — se on tarkoituksellinen raja, sillä kuvan
// upottaminen base64:nä kasvattaisi paketin megatavulla.
//
// --- mistä kuva on tehty ---
//
// Korkeusruudukko 0.05° (7201 x 3601 ruutua) on väritetty
// hypsometrisellä asteikolla ja varjostettu kuvitteellisella auringolla
// luoteesta (atsimuutti 315°, korkeuskulma 45°,
// liioittelu 12). Varjo on kertolasku värin päällä: väri kertoo
// KORKEUDEN, varjo kertoo MUODON, ja silmä lukee muodon.
//
// Aurinko on luoteesta, koska ihminen olettaa valon tulevan ylhäältä ja
// vasemmalta. Kaakosta valaistuna sama kuva kääntyisi nurin: vuoret
// näyttäisivät laaksoilta eikä sitä voisi tahdolla kumota.
//
// --- mihin kuva laudalla osuu ---
//
// Kuva on projisoitu tasakulmaisesta Milleriin samalla sovituksella kuin
// lauta itse (tools/vanha-maailma.mjs, sovitaMaailma). Se peittää laudan
// TARKALLEEN: vasen reuna x=0, oikea x=12000, ylin y=0, alin y=5399.
// Piirtäjän ei siis tarvitse laskea asteita lainkaan — kuva venytetään
// suoraan raja-suorakulmioon. Samat rajat kuin yökartalla, joten linssit
// osuvat toistensa päälle pikselilleen.
//
// Kartta kiertää ympäri, joten kuva on toistettava laudan molemmin
// puolin samoin kuin rannikot: kuvan oikea reuna jatkuu vasempaan
// saumattomasti, koska molemmat ovat samaa pituusastetta -175°.
//
// --- mitä väri lupaa ja mitä ei ---
//
// Väri on KORKEUS eikä kasvillisuus. Sahara on vihertävän keltainen,
// koska se on 300 metrissä, ei siksi että siellä kasvaisi mitään;
// Amazonin sademetsä ja Argentiinan pampa ovat samaa vihreää. Grönlanti
// on ruskea, koska ETOPO1:n jääpinta on siellä kahden-kolmen kilometrin
// korkeudessa — kartta näyttää sen ylänkönä, mikä se korkeutena onkin.
//
// Merenpinnan alapuolinen kuiva maa saa merenvärin: Kaspianmeren alanko,
// Qattaran painanne ja Hollannin polderit näkyvät sinisinä. Korkeus ei
// kerro, onko painanteessa vettä.
//
// Lauta ulottuu -58°:sta 76°:seen, joten Etelämanner ja pohjoisin
// arktinen alue jäävät kuvan ulkopuolelle. Ne eivät ole kadonneet
// aineistosta vaan laudalta.

export const TOPOGRAFIA_KUVA = {
  kuva: 'assets/linssit/topografia.webp',

  // Kuvan omat mitat pikseleinä. Piirtäjä ei tarvitse näitä venytykseen
  // (raja riittää), mutta esilataus ja mittasuhteen tarkistus tarvitsevat.
  leveysPx: 3600,
  korkeusPx: 1620,

  // Kuvan paikka laudan koordinaatteina. Peittää laudan kokonaan.
  raja: { x: 0, y: 0, leveys: 12000, korkeus: 5399 },

  // Kuva jatkuu reunan yli itseensä, kuten lauta.
  kiertava: true,

  // Rajaus asteina — sama kuin laudalla. Tämä on tarkistusta ja
  // kuvatekstejä varten, ei piirtoa.
  rajaus: { lon0: -175, etela: -58, pohjoinen: 76 },

  // Millä asetuksilla kuva on tehty. Ei piirtoa varten vaan siksi, että
  // kuvan voi tehdä uudelleen samanlaisena ilman tämän tiedoston lukemista.
  varjostus: {
    atsimuutti: 315,
    korkeuskulma: 45,
    liioittelu: 12,
    ruutu: 0.05,
  },

  otsikko: 'Reliefikartta: maailma maastona',
  kuvaus: 'Maapallon korkeus ja syvyys hypsometrisin värein, varjostettuna '
    + 'kuvitteellisella auringolla luoteesta. Vihreä on alankoa, ruskea '
    + 'vuoristoa, valkoinen lumirajan yläpuolta; meri vaalenee matalikoilla '
    + 'ja tummuu syvänteissä. Väri kertoo korkeuden, varjo kertoo muodon.',

  lahde: {
    aineisto: 'NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1 kaariminuutti',
    viite: 'Amante & Eakins 2009, NOAA NCEI, doi:10.7289/V5C8276M',
    osoite: 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360',
    haettu: '2026-08-04',
  },

  lisenssi: {
    nimi: 'Public domain (Yhdysvaltain liittovaltion virasto)',
    ehto: 'Lähteen maininta: NOAA NGDC ETOPO1.',
    osoite: 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360',
  },
};

/*
 * SAMA RELIEFI PALLOLLE — TASAVÄLISENÄ (karttapallo.md luku 10.1).
 *
 * Yllä oleva kuva on projisoitu LAUDAN Milleriin, ja pallon pinta
 * odottaa tasaväliä (equirectangular): Millerin kuva pallolle kierrettynä
 * venyttäisi navat ja siirtäisi päiväntasaajan. Pallokuva on siis oma
 * tiedostonsa samasta korkeusruudukosta ja samalla varjostuksella.
 *
 * Polku on tässä eikä TOPOGRAFIA_KUVA-oliossa, koska se ei ole laudan
 * kuvan ominaisuus vaan sen pallosisar: kaksi linssiä (topografia ja
 * vesistöt) pyytää samaa kalvoa, ja molemmat lukevat sen tästä nimestä.
 */
export const TOPOGRAFIA_PALLOKUVA = 'assets/linssit/topografia-pallo.webp';
