/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: DNK (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso DNK --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa DNK): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_DNK = {
  'nosto:billund': { lat: 55.734143, lng: 9.116000 },
  'nosto:egeskov': { lat: 55.176518, lng: 10.472000 },
  'nosto:frederiksborgin-linna': { lat: 55.934700, lng: 12.302000 },
  'nosto:hetki-viikinkilaiva-roskilde-1040': { lat: 55.754523, lng: 12.017480 },
  'nosto:itameri': { lat: 54.879610, lng: 12.613892 },
  'nosto:jellingin-kivet': { lat: 55.757641, lng: 9.419000 },
  'nosto:kronborg': { lat: 56.039026, lng: 12.712505 },
  'nosto:lindholm-hoje': { lat: 57.080278, lng: 9.914000 },
  'nosto:mllehj': { lat: 55.977301, lng: 9.827000 },
  'nosto:mons-klint': { lat: 54.992511, lng: 12.445952 },
  'nosto:nosto-trelleborg': { lat: 55.349000, lng: 11.201633 },
  'nosto:pohjanmeri': { lat: 56.200539, lng: 7.400000 },
  'nosto:ribe': { lat: 55.329214, lng: 8.762000 },
  'nosto:roskilden-tuomiokirkko': { lat: 55.637684, lng: 12.082520 },
  'nosto:skagen': { lat: 57.697682, lng: 10.496511 },
  'nosto:storebaeltin-silta': { lat: 55.333511, lng: 10.791191 },
  'nosto:syvennys-kobenhavn-jelling': { lat: 55.756670, lng: 9.419440 },
  'nosto:syvennys-kobenhavn-lego': { lat: 55.730830, lng: 9.115280 },
  'nosto:tollundin-mies': { lat: 56.168691, lng: 9.395000 },
  'nosto:trelleborg-slagelse': { lat: 55.438249, lng: 11.326367 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_DNK_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
