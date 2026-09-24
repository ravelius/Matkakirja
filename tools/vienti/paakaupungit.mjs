/*
 * PELIN MAA (ISO3) → LAUDAN KAUPUNKI, JOKA ON SEN PÄÄKAUPUNKI
 * (Siirtoseppä 23.9.2026, skeema 1.2).
 *
 * Natiivi 3D-proto harventaa nimiöitä kaupungin tärkeyden mukaan
 * (3D-selvittäjä 23.9.2026); pääkaupunki saa tärkeyden 3
 * (tools/vienti/kokoelmat.mjs). Pelidatassa ei ole pääkaupunkitaulua
 * (js/karttanimet.js käyttää lähtökaupunkia ja lentokenttää), joten
 * lista on staattinen.
 *
 * Lähde: määritelmä on Wikidatan P36 (pääkaupunki) nykytilassa, laadittu
 * käsin 23.9.2026 laudan 266 kaupungista. Wikidatan kyselyä ei ajeta
 * viennissä: koko laudan erä aikakatkaistiin kahdesti, eikä vienti saa
 * riippua verkosta.
 *
 * Periaatteet:
 *   - avain on pelin maakoodi (cityCountry), joten Grönlannin (GRL) Nuuk
 *     on pääkaupunki mutta Ranskan merentakaiset (Cayenne, Nouméa) ja
 *     Yhdysvaltojen San Juan eivät ole.
 *   - maa, jonka pääkaupunki ei ole laudalla, puuttuu (USA, CAN, AUS,
 *     BRA, CHL, MMR, LKA…). Maata edustava solmu (Islanti, Kongo,
 *     Angola…) ei ole pääkaupunki.
 *   - usean pääkaupungin maa: Etelä-Afrikan Kapkaupunki on yksi kolmesta
 *     (P36: Pretoria, Kapkaupunki, Bloemfontein). Jemenin P36 on Sana.
 *     Taiwanin Taipei on tosiasiallinen pääkaupunki.
 * tests/sisaltopaketti.test.mjs vaatii, että jokainen arvo on laudan
 * kaupunki ja kuuluu avaimen maahan.
 */
export const PAAKAUPUNGIT = {
  AFG: 'kabul',
  ARG: 'buenosaires',
  AUT: 'wien',
  BEL: 'bryssel',
  BGR: 'sofia',
  BIH: 'sarajevo',
  CHN: 'peking',
  COL: 'bogota',
  CUB: 'havanna',
  CYP: 'nikosia',
  CZE: 'praha',
  DEU: 'berliini',
  DNK: 'kobenhavn',
  ECU: 'quito',
  EGY: 'kairo',
  ESP: 'madrid',
  EST: 'tallinna',
  ETH: 'addisabeba',
  FIN: 'helsinki',
  FJI: 'suva',
  FRA: 'pariisi',
  GBR: 'lontoo',
  GRC: 'ateena',
  GRL: 'nuuk',
  GTM: 'guatemala',
  HUN: 'budapest',
  IDN: 'jakarta',
  IND: 'delhi',
  IRL: 'dublin',
  IRN: 'teheran',
  IRQ: 'bagdad',
  ITA: 'rooma',
  JPN: 'tokio',
  KAZ: 'astana',
  KEN: 'nairobi',
  KOR: 'soul',
  KWT: 'kuwait',
  LBY: 'tripoli',
  LTU: 'vilna',
  LUX: 'luxemburg',
  LVA: 'riika',
  MEX: 'mexico',
  MLT: 'valletta',
  MNG: 'ulanbator',
  NIC: 'managua',
  NLD: 'amsterdam',
  NOR: 'oslo',
  NPL: 'kathmandu',
  NZL: 'wellington',
  OMN: 'masqat',
  PAN: 'panama',
  PER: 'lima',
  PHL: 'manila',
  PNG: 'portmoresby',
  POL: 'varsova',
  PRT: 'lissabon',
  PRY: 'asuncion',
  QAT: 'doha',
  ROU: 'bukarest',
  RUS: 'moskova',
  SAU: 'riad',
  SEN: 'dakar',
  SGP: 'singapore',
  SLB: 'honiara',
  SVN: 'ljubljana',
  SWE: 'tukholma',
  SYR: 'damaskos',
  THA: 'bangkok',
  TLS: 'dili',
  TUR: 'ankara',
  TWN: 'taipei',
  UKR: 'kiova',
  URY: 'montevideo',
  VEN: 'caracas',
  VNM: 'hanoi',
  VUT: 'portvila',
  YEM: 'sana',
  ZAF: 'kapkaupunki',
};
