/*
 * ══════════════════════════════════════════════════════════════════
 * KAUPUNKIRAIDAT — kaupungin oma kappale pohjavireen tilalla
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 5.9.2026 klo 00.35, sanatarkasti: *"ateenaan
 * saavuttaessa voisi vaihtua kappale. generoi sinne oma musiikki."*
 *
 * Pelissä soi kaikkialla sama harva pohjavire (musa-pohja,
 * js/ambience-stream.js POHJA_MUSIIKKI). Kaupunkiraita on sen
 * PAIKALLINEN SIJAINEN: kun pelaaja saapuu kaupunkiin, jolla on oma
 * raita, pohjavire ristihäivytetään kaupungin kappaleeseen, ja kun
 * kaupungista lähdetään, pohjavire palaa samalla häivytyksellä.
 * Kaupunkiraita soi siis samassa paikassa sekoituksessa kuin
 * pohjavire — saman väistön (pöllö, kertoja, lukija) ja saman
 * kehittäjäkertoimen ('musiikki') alla, ambienssiäänten ALLA.
 *
 * TÄSSÄ MODUULISSA ON VAIN TAULUKKO JA NIMISÄÄNTÖ. Koko soittokoneisto
 * on js/ambience-stream.js:ssä pohjavireen rinnalla, koska se on
 * kirjaimellisesti sama soitin: kaksi koneistoa samalle paikalle
 * sekoituksessa olisi kaksi paikkaa, joissa väistö, taustatauko ja
 * puuttuvan raidan sietäminen pitäisi muistaa yhtä aikaa.
 *
 * ------------------------------------------------------------------
 * MITEN UUSI KAUPUNKI LISÄTÄÄN (Fablen työ)
 * ------------------------------------------------------------------
 *
 * 1. Lisää rivi alle KAUPUNKIRAIDAT-tauluun: avain on laudan
 *    kaupungin id (js/packs/europe.js `id: 'ateena'`), arvo lyhyt
 *    kuvaus siitä, mitä raidalta kuullaan.
 * 2. Lisää sama avain tools/generoi-musiikki.mjs:n RAIDAT-tauluun
 *    (`laji: 'kaupunki'`, `kaupunki: '<id>'`) omine prompteineen.
 *    Tiedostonimi tulee molemmissa samasta säännöstä
 *    (`musa-kaupunki-<id>.mp3`), ja tests/kaupunkimusiikki.test.mjs
 *    kaatuu, jos taulut eroavat.
 * 3. Aja työnkulku "Generoi musiikki" (raidat: `<id>` tai
 *    `kaupungit`) — ajo vie raidan ämpärin audio/-kansioon, jota peli
 *    hakee, ja liittää sen ajon artefaktiksi. Kuuntele artefaktista;
 *    mp3:ia ei committoida (äänet eivät ole repossa, 11.9.2026).
 *
 * Puuttuva raita ei riko mitään: jos tiedostoa ei ole ämpärissä (404),
 * pohjavire jatkaa soimistaan eikä pelaaja huomaa mitään.
 *
 * ------------------------------------------------------------------
 * ALUERAIDAT — KAUPUNGIN OMA RAITA ON POIKKEUS, ALUE ON SÄÄNTÖ
 * ------------------------------------------------------------------
 *
 * Omistajan tilaus 5.9.2026 yöllä, sanatarkasti: *"generoi musiikkeja
 * kaikkiin kohtiin peliä, ne tuovat paljon lisää tunnelmaa."* Euroopan
 * laudalla on 44 kaupunkia, eikä jokaiselle tehdä omaa kappaletta:
 * kaupunkien välinen ero kuuluu jo äänimaisemassa (basaari, satama,
 * metsä), ja 44 raitaa maksaisi 44 kutsua eikä toisi 44 tunnelmaa.
 *
 * Siksi raidalla on KAKSI TASOA: kaupungin oma kappale, jos sellainen
 * on tilattu (Ateena), ja muuten ALUEEN raita — Välimeri, Pohjola,
 * Keski-Eurooppa, Balkan, Itä-Eurooppa, Britteinsaaret. Alue johdetaan
 * pelin omasta maatiedosta (pakan `map.cityCountry`, sama taulu jolla
 * äänimaiseman maakori arvotaan), ei uudesta kaupunkiluettelosta:
 * uusi kaupunki saa raitansa ilman että tätä tiedostoa muokataan, kun
 * sen maa on tunnettu. Kaupunkikohtainen poikkeus (KAUPUNGIN_ALUE) on
 * vain niille, joiden maa vetäisi väärään suuntaan — Marseille on
 * Välimeri, ei Keski-Eurooppa.
 *
 * Ketju on siis kaupunki → alue → maanosa → pohjavire (maanosa:
 * vaihe 2, alempana), ja js/musiikkivalitsin.js jatkaa sitä ylöspäin
 * tiloilla (lehti, matkalaukku, kohtaaminen, etusivu).
 */
import { musaPolku } from './media.js';

/**
 * Kaupunkiraidan tunnus tiedostonimeä varten: `ateena` →
 * `musa-kaupunki-ateena`. Sääntö on tässä yhdessä paikassa, koska
 * sekä peli (musaPolku) että generointityökalu
 * (tools/generoi-musiikki.mjs) kirjoittavat saman nimen — ja
 * moottoripäätteen (-lyria) liittää perään js/media.js:n
 * MUSIIKIN_PAATE-kytkin, jota tämä moduuli ei ohita.
 */
export const kaupunkiraidanTunnus = (cityId) => `musa-kaupunki-${cityId}`;

/**
 * Kaupungit, joilla on oma kappale. AVAIN ON LAUDAN KAUPUNGIN ID.
 *
 * Sama id kelpaa kaikilla laudoilla, joilla kaupunki esiintyy
 * (europe.js ja maailma.js käyttävät molemmat 'ateena'), joten raita
 * seuraa kaupunkia eikä lautaa.
 */
export const KAUPUNKIRAIDAT = {
  ateena: {
    kuvaus: 'Ateenaan saapuminen iltapäivällä: bouzouki ja kitara hillitysti, '
      + 'Välimeren ilta pohjaäänimaiseman alla.',
  },
  /*
   * TUNNUSKAUPUNGIT (musiikkisuunnitelma 2.2, vaihe 3, omistaja hyväksyi
   * 26.9.2026 klo 11.0x): matkan pääkaupungit, joissa pelaaja viipyy
   * pisimpään; johtoaihe paikallisella soittimella.
   */
  pariisi: {
    kuvaus: 'Pariisi: salonkipiano ja viulu kantavat johtoaihetta, musette-harmonikan '
      + 'väri ja bulevardien sadeilta pohjaäänimaiseman alla.',
  },
  lontoo: {
    kuvaus: 'Lontoo: sello ja klarinetti kantavat johtoaihetta, celestan kellosävy, '
      + 'sumu joella pohjaäänimaiseman alla.',
  },
  rooma: {
    kuvaus: 'Rooma: mandoliini ja kitara kantavat johtoaihetta, oboe vastaa, '
      + 'piazzan iltapäivä pohjaäänimaiseman alla.',
  },
  istanbul: {
    kuvaus: 'Istanbul: kanun ja ney-huilu kantavat johtoaihetta modaalisesti, '
      + 'lautat salmella pohjaäänimaiseman alla.',
  },
  kairo: {
    kuvaus: 'Kairo: oud ja ney-huilu kantavat johtoaihetta, hiljainen riq, '
      + 'Niili hämärässä pohjaäänimaiseman alla.',
  },
  pietari: {
    kuvaus: 'Pietari: balalaikan tremolo ja soolopiano kantavat johtoaihetta, '
      + 'jäätyneet kanavat ja valkoinen yö pohjaäänimaiseman alla.',
  },
};

/**
 * Kaupungin oman raidan polku, tai null jos kaupungilla ei ole omaa
 * kappaletta. Kutsuja (js/ambience-stream.js) päättää, soiko se —
 * tämä ei tiedä pelin tilasta mitään.
 */
export function kaupunginMusiikki(cityId) {
  if (!cityId || !Object.hasOwn(KAUPUNKIRAIDAT, cityId)) return null;
  return musaPolku(kaupunkiraidanTunnus(cityId));
}

/*
 * ══════════════════════════════════════════════════════════════════
 * ALUERAIDAT
 * ══════════════════════════════════════════════════════════════════
 *
 * Avain on alueen tunnus ja samalla tiedostonimen loppuosa
 * (`musa-kaupunki-valimeri`) — sama nimisääntö kuin kaupungeilla,
 * koska peliä varten ne ovat sama asia: pohjavireen sijainen. Kuvaus
 * näkyy työhuoneen Musiikki-lehdessä.
 */
export const ALUERAIDAT = {
  britteinsaaret: {
    kuvaus: 'Britteinsaaret: sumuinen viulu ja harppu hillitysti, '
      + 'kivikaupunkien vihmasade pohjaäänimaiseman alla.',
  },
  pohjola: {
    kuvaus: 'Pohjola: hidas ja avara, kantele ja jouset, '
      + 'valoisa yö pohjaäänimaiseman alla.',
  },
  'keski-eurooppa': {
    kuvaus: 'Keski-Eurooppa: kamarisoitinten kohtelias sävy, '
      + 'piano ja jouset, salonki pohjaäänimaiseman alla.',
  },
  valimeri: {
    kuvaus: 'Välimeri: lämmin kitara ja mandoliini, '
      + 'iltapäivän valo pohjaäänimaiseman alla.',
  },
  balkan: {
    kuvaus: 'Balkan: kaval-huilu ja näppäilty tambura, '
      + 'vuorten ja basaarin väli pohjaäänimaiseman alla.',
  },
  'ita-eurooppa': {
    kuvaus: 'Itä-Eurooppa: matalat jouset ja cimbalom, '
      + 'leveä tasanko pohjaäänimaiseman alla.',
  },
};

/**
 * Maa (ISO-3) → alue. TÄMÄ ON KOKO KYTKENTÄ KAUPUNKEIHIN: pelin pakka
 * kertoo kaupungin maan (`map.cityCountry`, js/packs/europe-countries.js),
 * ja alue luetaan siitä. Uusi kaupunki tunnettuun maahan saa raitansa
 * ilman muutoksia tänne; uusi maa lisätään tähän yhdellä rivillä
 * (tests/musiikkivalitsin.test.mjs kaatuu, jos Euroopan laudalta jää
 * maa ilman aluetta).
 *
 * Jako on 1873:n matkailijan jako eikä nykyinen valtiojako: Itävalta ja
 * Unkari ovat samaa Keski-Eurooppaa, ja Osmanivaltakunnan Istanbul
 * kuuluu Balkanille, jonka kautta sinne matkustetaan.
 */
export const ALUEEN_MAAT = {
  GBR: 'britteinsaaret',
  IRL: 'britteinsaaret',
  NOR: 'pohjola',
  SWE: 'pohjola',
  DNK: 'pohjola',
  FIN: 'pohjola',
  ISL: 'pohjola',
  FRA: 'keski-eurooppa',
  NLD: 'keski-eurooppa',
  BEL: 'keski-eurooppa',
  LUX: 'keski-eurooppa',
  DEU: 'keski-eurooppa',
  CZE: 'keski-eurooppa',
  AUT: 'keski-eurooppa',
  CHE: 'keski-eurooppa',
  POL: 'keski-eurooppa',
  HUN: 'keski-eurooppa',
  SVN: 'keski-eurooppa',
  SVK: 'keski-eurooppa',
  ESP: 'valimeri',
  PRT: 'valimeri',
  ITA: 'valimeri',
  GRC: 'valimeri',
  MLT: 'valimeri',
  HRV: 'balkan',
  BIH: 'balkan',
  BGR: 'balkan',
  ROU: 'balkan',
  TUR: 'balkan',
  RUS: 'ita-eurooppa',
  UKR: 'ita-eurooppa',
  EST: 'ita-eurooppa',
  LVA: 'ita-eurooppa',
  LTU: 'ita-eurooppa',
};

/**
 * Kaupunkikohtaiset poikkeukset maajakoon. Vain silloin, kun maa
 * vetäisi kuultavasti väärään suuntaan — Marseille on Välimeren
 * satama eikä Pariisin salonki.
 */
export const KAUPUNGIN_ALUE = {
  marseille: 'valimeri',
};

/**
 * Kaupungin alue, tai null jos sitä ei tiedetä (vieras lauta, virtuaali-
 * paikka kuten 'etusivu' tai 'merimatka', tuntematon maa).
 *
 * @param {?string} cityId laudan kaupungin id
 * @param {?string} maa kaupungin ISO-3-maakoodi pakan cityCountry-taulusta
 */
export function kaupunginAlue(cityId, maa = null) {
  if (cityId && Object.hasOwn(KAUPUNGIN_ALUE, cityId)) return KAUPUNGIN_ALUE[cityId];
  if (maa && Object.hasOwn(ALUEEN_MAAT, maa)) return ALUEEN_MAAT[maa];
  return null;
}

/** Alueen raidan polku, tai null jos aluetta tai raitaa ei ole. */
export function alueenMusiikki(alue) {
  if (!alue || !Object.hasOwn(ALUERAIDAT, alue)) return null;
  return musaPolku(kaupunkiraidanTunnus(alue));
}

/*
 * ══════════════════════════════════════════════════════════════════
 * MAANOSAT — saapumistunnuksen ja maanosaraidan avain (vaihe 2)
 * ══════════════════════════════════════════════════════════════════
 *
 * Musiikkisuunnitelma 26.9.2026 (docs/raportit/musiikki-ja-
 * aanisuunnitelma-20260926.md 1.2 ja 2.2, vaihe 2): saapumistunnus
 * ja maanosaraita vaihtuvat MAANOSAN mukaan, ei alueen. Maanosia on
 * kymmenen, ja jako on 1873:n matkailijan jako kuten alueillakin:
 * Kypros kuuluu Välimereen eikä Lähi-itään, Keski-Aasian aroilla
 * (KAZ, UZB) kuljetaan Lähi-idän karavaanireittejä.
 *
 * MAANOSA ON UUSI KÄSITE, MUTTA EI UUSI KAUPUNKILUETTELO. Se johdetaan
 * samasta maatiedosta kuin alue (pakan `map.cityCountry`), kahdessa
 * portaassa:
 *
 *   1. kaupungilla on ALUE (kaupunginAlue: KAUPUNGIN_ALUE, ALUEEN_MAAT)
 *      → ALUEEN_MAANOSA. Euroopan kuusi aluetta jakautuvat kolmeen
 *      maanosaan, joten Marseille on Välimeri myös maanosana.
 *   2. aluetta ei ole → MAAN_MAANOSA[maa]. Tässä ovat kaikki pakkojen
 *      maat, joilla ei ole aluetta (tests/musiikkivalitsin.test.mjs
 *      kaatuu, jos pakasta löytyy maa ilman maanosaa).
 *
 * Muuten null: virtuaalipaikka ('etusivu', 'merimatka') tai
 * tuntematon maa. Silloin ei soi tunnusta eikä maanosaraitaa.
 *
 * NATIIVI PEILAA TÄMÄN SELLAISENAAN (Assets/Matkakirja/Peli/Aani/
 * AaniTaulut.cs): web on malli, ja taulut ovat tässä yhdessä
 * paikassa juuri siksi, että ne voi kopioida rivi riviltä.
 */
export const MAANOSAT = [
  'lansi-eurooppa', 'valimeri', 'ita-eurooppa', 'lahi-ita', 'saharan-etelapuoli',
  'etela-aasia', 'ita-aasia', 'pohjois-amerikka', 'etela-amerikka', 'oseania',
];

/** Euroopan alue → maanosa (portaan 1 taulu). */
export const ALUEEN_MAANOSA = {
  britteinsaaret: 'lansi-eurooppa',
  pohjola: 'lansi-eurooppa',
  'keski-eurooppa': 'lansi-eurooppa',
  valimeri: 'valimeri',
  balkan: 'valimeri',
  'ita-eurooppa': 'ita-eurooppa',
};

/** Rivit maanosittain: luettavampi kuin 89 riviä aakkosjärjestyksessä. */
const MAANOSAN_MAAT = {
  valimeri: ['CYP'],
  'lahi-ita': ['ARE', 'DZA', 'EGY', 'IRN', 'IRQ', 'JOR', 'KWT', 'LBY', 'MAR', 'OMN', 'QAT',
    'SAU', 'SDN', 'SYR', 'TUN', 'YEM', 'KAZ', 'UZB'],
  'saharan-etelapuoli': ['AGO', 'CMR', 'COD', 'ETH', 'GHA', 'KEN', 'LBR', 'MDG', 'MLI', 'MOZ',
    'NAM', 'NGA', 'SEN', 'SHN', 'SLE', 'SOM', 'SDS', 'TCD', 'TZA', 'UGA', 'ZAF', 'ZWE'],
  'etela-aasia': ['AFG', 'IND', 'LKA', 'NPL', 'PAK', 'MMR'],
  'ita-aasia': ['CHN', 'HKG', 'JPN', 'KOR', 'MNG', 'TWN', 'VNM', 'THA', 'PHL', 'IDN', 'SGP'],
  oseania: ['AUS', 'NZL', 'FJI', 'NCL', 'NFK', 'PNG', 'SLB', 'VUT', 'TLS'],
  'pohjois-amerikka': ['USA', 'CAN', 'MEX', 'CUB', 'GTM', 'NIC', 'PAN', 'PRI', 'BMU', 'GRL'],
  'etela-amerikka': ['ARG', 'BOL', 'BRA', 'CHL', 'COL', 'ECU', 'FLK', 'GUF', 'PER', 'PRY',
    'URY', 'VEN'],
};

/**
 * Maa (ISO-3) → maanosa niille maille, joilla EI ole aluetta (portaan
 * 2 taulu). Euroopan maat eivät ole tässä: ne kulkevat alueen kautta,
 * jotta kaupunkipoikkeus (Marseille) pätee myös maanosaan.
 */
export const MAAN_MAANOSA = Object.fromEntries(Object.entries(MAANOSAN_MAAT)
  .flatMap(([maanosa, maat]) => maat.map((maa) => [maa, maanosa])));

/**
 * Kaupungin maanosa, tai null jos sitä ei tiedetä.
 *
 * @param {?string} cityId laudan kaupungin id
 * @param {?string} maa kaupungin ISO-3-maakoodi pakan cityCountry-taulusta
 */
/*
 * KAUPUNGIT ILMAN MAATA (26.9.2026, Siirtosepän vienti huomasi): pakan
 * cityCountry-taulu ei kata kaikkia kaupunkeja — Maailma-laudalla
 * (js/packs/maailma.js, PACKS[0]) sitä ei ole lainkaan, ja Jerusalem ja
 * St. Helena puuttuvat muiltakin laudoilta. Niissä ei soinut
 * saapumistunnusta eikä maanosaraitaa. Maanosa annetaan niille
 * kaupungin id:llä; testi (tests/musiikkivalitsin.test.mjs) vartioi,
 * että jokaisella pakkojen kaupungilla on maanosa.
 */
export const KAUPUNGIN_MAANOSA = {
  jerusalem: 'lahi-ita',
  sthelena: 'saharan-etelapuoli',
  lontoo: 'lansi-eurooppa',
  moskova: 'ita-eurooppa',
  istanbul: 'valimeri',
  ateena: 'valimeri',
  tanger: 'lahi-ita',
  kairo: 'lahi-ita',
  mumbai: 'etela-aasia',
  peking: 'ita-aasia',
  tokio: 'ita-aasia',
  singapore: 'ita-aasia',
  sydney: 'oseania',
  kapkaupunki: 'saharan-etelapuoli',
  rio: 'etela-amerikka',
  newyork: 'pohjois-amerikka',
  losangeles: 'pohjois-amerikka',
  sanfrancisco: 'pohjois-amerikka',
};

export function kaupunginMaanosa(cityId, maa = null) {
  const alue = kaupunginAlue(cityId, maa);
  if (alue) return ALUEEN_MAANOSA[alue] ?? null;
  if (maa && Object.hasOwn(MAAN_MAANOSA, maa)) return MAAN_MAANOSA[maa];
  if (cityId && Object.hasOwn(KAUPUNGIN_MAANOSA, cityId)) return KAUPUNGIN_MAANOSA[cityId];
  return null;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * MAANOSARAIDAT — alueraidan varareitti (vaihe 2)
 * ══════════════════════════════════════════════════════════════════
 *
 * Suunnitelma 2.2: *"Nykyiset 6 alueraitaa jäävät Euroopan
 * hienojaoksi, ja maanosaraita on niiden varareitti."* Ketju on siis
 *
 *   kaupungin oma kappale → ALUEraita → MAANOSAraita → pohjavire
 *
 * ja soitin on sama kuin alueraidalla (js/ambience-stream.js
 * pohjavirekoneisto). Käytännössä Euroopan alueilla alueraita voittaa,
 * ja maanosaraita kuuluu, kun alueraita puuttuu: Kypros (maa ilman
 * aluetta) tai alueraidan 404, jolloin soittimen oma varapolku ottaa
 * ketjun seuraavan.
 *
 * Tiedostonimi `musa-maanosa-<maanosa>`, eri etuliite kuin alueilla,
 * koska Välimeri on sekä alue että maanosa: sama nimi olisi sama
 * tiedosto kahdelle eri raidalle. Vaihe 2 tuo kaksi maanosaa; vaihe 3
 * lisää loput riveinä tähän.
 */
export const MAANOSARAIDAT = {
  valimeri: {
    kuvaus: 'Välimeri ja Balkan: kitara ja mandoliini, klarinetti vihjaa '
      + 'johtoaiheeseen kerran, aurinkoinen rannikko pohjaäänimaiseman alla.',
  },
  'lansi-eurooppa': {
    kuvaus: 'Pohjois- ja Länsi-Eurooppa: piano, sello ja harmoni, huilu vihjaa '
      + 'johtoaiheeseen kerran, sade ikkunassa pohjaäänimaiseman alla.',
  },
  // Vaihe 3 (omistaja hyväksyi 26.9.2026 klo 11.0x): loput maanosat.
  'ita-eurooppa': { kuvaus: 'Itä-Eurooppa: balalaikan tremolo ja sello, cimbalom, koivumetsien lumivalo pohjaäänimaiseman alla.' },
  'lahi-ita': { kuvaus: 'Lähi-itä ja Pohjois-Afrikka: oud ja ney-huilu, kanunin väre, hämärä tasakattojen yllä pohjaäänimaiseman alla.' },
  'saharan-etelapuoli': { kuvaus: 'Saharan eteläpuoli: kora ja balafon, käsirummut, avaran savannin valo pohjaäänimaiseman alla.' },
  'etela-aasia': { kuvaus: 'Etelä-Aasia: bansuri ja hiljainen sitar-bordun, tabla, kostea ilta joen rannalla pohjaäänimaiseman alla.' },
  'ita-aasia': { kuvaus: 'Itä-Aasia: guzheng ja erhu, shakuhachi vastaa, aamusumu satamassa pohjaäänimaiseman alla.' },
  'pohjois-amerikka': { kuvaus: 'Pohjois-Amerikka: viulu ja 1870-luvun banjo, huuliharppu, jokikaupunki ja preeria pohjaäänimaiseman alla.' },
  'etela-amerikka': { kuvaus: 'Etelä-Amerikka: charango ja kitara, quena-huilu, vuoriston ilma ja siestan aukio pohjaäänimaiseman alla.' },
  oseania: { kuvaus: 'Oseania: klassinen kitara ja näppäilty ukulele, slide-kitara, pasaatituuli maailman toisella puolella pohjaäänimaiseman alla.' },
};

/** Maanosaraidan tunnus tiedostonimeä varten: `valimeri` → `musa-maanosa-valimeri`. */
export const maanosaraidanTunnus = (maanosa) => `musa-maanosa-${maanosa}`;

/** Maanosan raidan polku, tai null jos maanosaa tai raitaa ei ole. */
export function maanosanMusiikki(maanosa) {
  if (!maanosa || !Object.hasOwn(MAANOSARAIDAT, maanosa)) return null;
  return musaPolku(maanosaraidanTunnus(maanosa));
}

/**
 * Paikan raidat parhaasta alkaen: kaupungin oma kappale ensin, alueen
 * raita perään ja maanosan raita alueen varareittinä. Tyhjä lista
 * tarkoittaa, ettei paikalla ole omaa musiikkia — silloin soi
 * pohjavire (js/musiikkivalitsin.js).
 */
export function kaupunginRaidat(cityId, maa = null) {
  return [
    kaupunginMusiikki(cityId),
    alueenMusiikki(kaupunginAlue(cityId, maa)),
    maanosanMusiikki(kaupunginMaanosa(cityId, maa)),
  ].filter(Boolean);
}

/*
 * ══════════════════════════════════════════════════════════════════
 * SAAPUMISTUNNUKSET — lyhyt aihe uuteen kaupunkiin
 * ══════════════════════════════════════════════════════════════════
 *
 * Musiikkisuunnitelma 26.9.2026 (docs/raportit/musiikki-ja-
 * aanisuunnitelma-20260926.md 2.2 kohta 2): `musa-saapuminen` on
 * johtoaiheen kaksi ensimmäistä tahtia maanosan soittimella, one-shot
 * 8–10 s, kun pelaaja saapuu UUTEEN kaupunkiin. Soittaja on js/ui.js
 * (soitaSaapumistunnus); tämä taulu kertoo vain, millä maanosalla on
 * oma tunnuksensa.
 *
 * AVAIN ON MAANOSA (vaihe 2; vaiheessa 1 avain oli alue ja rivi vain
 * Välimerellä). Maanosa luetaan kaupunginMaanosa-funktiolla, joten
 * Marseille saa Välimeren tunnuksen ja Sofia (Balkan) samoin. Kaikilla
 * kymmenellä maanosalla on tunnus; maanosaa ilman riviä ei soi.
 */
export const SAAPUMISTUNNUKSET = Object.fromEntries(
  MAANOSAT.map((maanosa) => [maanosa, `musa-saapuminen-${maanosa}`]),
);

/**
 * Kaupungin saapumistunnuksen polku, tai null jos kaupungin maanosalla
 * ei ole tunnusta.
 *
 * @param {?string} cityId laudan kaupungin id
 * @param {?string} maa kaupungin ISO-3-maakoodi pakan cityCountry-taulusta
 */
export function saapumistunnus(cityId, maa = null) {
  const maanosa = kaupunginMaanosa(cityId, maa);
  if (!maanosa || !Object.hasOwn(SAAPUMISTUNNUKSET, maanosa)) return null;
  return musaPolku(SAAPUMISTUNNUKSET[maanosa]);
}
