/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: SWE (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso SWE --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa SWE): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_SWE = {
  'nosto:ales-stenar': { lat: 55.432905, lng: 14.054000 },
  'nosto:birka': { lat: 59.336385, lng: 17.546000 },
  'nosto:falunin-kaivos': { lat: 60.599604, lng: 15.611000 },
  'nosto:gamla-uppsala': { lat: 59.897741, lng: 17.630000 },
  'nosto:gota-kanava': { lat: 58.497602, lng: 16.172000 },
  'nosto:gotaalv': { lat: 58.279556, lng: 12.290000 },
  'nosto:itameri': { lat: 57.400321, lng: 18.599000 },
  'nosto:kalmarinlinna': { lat: 56.680948, lng: 16.273947 },
  'nosto:karlskrona': { lat: 56.210195, lng: 15.587000 },
  'nosto:kebnekaise': { lat: 67.904312, lng: 18.527000 },
  'nosto:kiruna': { lat: 67.848294, lng: 20.303000 },
  'nosto:lundintuomiokirkko': { lat: 55.704225, lng: 13.193000 },
  'nosto:nosto-vasaloppet': { lat: 61.009920, lng: 14.564000 },
  'nosto:pohjanlahti': { lat: 62.599523, lng: 19.601000 },
  'nosto:salanhopeakaivos': { lat: 59.919853, lng: 16.604000 },
  'nosto:syvennys-tukholma-hopeakatko': { lat: 57.721600, lng: 18.780400 },
  'nosto:tornionjoki': { lat: 66.300010, lng: 23.699000 },
  'nosto:vadstenan-luostari': { lat: 58.450350, lng: 14.891000 },
  'nosto:vanern': { lat: 58.900967, lng: 13.499000 },
  'nosto:visby': { lat: 57.635748, lng: 18.299000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_SWE_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
