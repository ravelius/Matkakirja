/*
 * MAIDEN HINTATASO PÄIVÄKULUIHIN (talouden vaihe 1, omistaja 27.9.2026 klo
 * 10.3x: päiväkulu 12 / 20 / 32 £; docs/raportit/talous-suunnitelma-20260927.md).
 *
 * Kolme porrasta: 'edullinen' (× 0,6), 'keski' (× 1,0, oletus) ja 'kallis'
 * (× 1,6). Avain on maailmankartan maatunnus (ISO3, pack.map.cityCountry).
 * Taulussa ovat vain poikkeukset — puuttuva maa on keskitasoa. Porras on
 * karkea arvio elinkustannuksista matkailijan näkökulmasta (ruoka + majoitus),
 * ei tarkka indeksi; Sisältökirjuri voi tarkentaa.
 */
export const HINTATASOT = {
  // Kallis
  AUS: 'kallis', AUT: 'kallis', BEL: 'kallis', CAN: 'kallis', CHE: 'kallis', DEU: 'kallis',
  DNK: 'kallis', FIN: 'kallis', FRA: 'kallis', GBR: 'kallis', GRL: 'kallis', HKG: 'kallis',
  IRL: 'kallis', ISL: 'kallis', JPN: 'kallis', KOR: 'kallis', KWT: 'kallis', LUX: 'kallis',
  NLD: 'kallis', NOR: 'kallis', NZL: 'kallis', QAT: 'kallis', SGP: 'kallis', SWE: 'kallis',
  USA: 'kallis', ARE: 'kallis',
  // Edullinen
  AFG: 'edullinen', BOL: 'edullinen', CMR: 'edullinen', COD: 'edullinen', COL: 'edullinen',
  DZA: 'edullinen', EGY: 'edullinen', ETH: 'edullinen', GHA: 'edullinen', GTM: 'edullinen',
  IDN: 'edullinen', IND: 'edullinen', IRN: 'edullinen', IRQ: 'edullinen', KAZ: 'edullinen',
  KEN: 'edullinen', LBR: 'edullinen', LKA: 'edullinen', MAR: 'edullinen', MDG: 'edullinen',
  MLI: 'edullinen', MMR: 'edullinen', MNG: 'edullinen', MOZ: 'edullinen', NIC: 'edullinen',
  NPL: 'edullinen', PAK: 'edullinen', PHL: 'edullinen', PRY: 'edullinen', SDN: 'edullinen',
  SDS: 'edullinen', SEN: 'edullinen', SLE: 'edullinen', SOM: 'edullinen', SYR: 'edullinen',
  TCD: 'edullinen', THA: 'edullinen', TUN: 'edullinen', TUR: 'edullinen', TZA: 'edullinen',
  UGA: 'edullinen', UKR: 'edullinen', UZB: 'edullinen', VEN: 'edullinen', VNM: 'edullinen',
  YEM: 'edullinen', ZWE: 'edullinen',
};
