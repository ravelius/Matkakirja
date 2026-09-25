/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: HUN (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso HUN --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa HUN): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_HUN = {
  'nosto:aggtelek': { lat: 48.469347, lng: 20.525000 },
  'nosto:balaton': { lat: 46.874335, lng: 17.741000 },
  'nosto:debrecen': { lat: 47.531284, lng: 21.626000 },
  'nosto:drava': { lat: 45.893415, lng: 17.519000 },
  'nosto:eger': { lat: 47.901559, lng: 20.378000 },
  'nosto:gyor': { lat: 47.687124, lng: 17.651000 },
  'nosto:holloko': { lat: 47.995655, lng: 19.589000 },
  'nosto:hortobagy': { lat: 47.599792, lng: 21.050000 },
  'nosto:irottko': { lat: 47.351503, lng: 16.427000 },
  'nosto:istallos-ko': { lat: 48.082608, lng: 20.444000 },
  'nosto:kekes': { lat: 47.870956, lng: 20.009000 },
  'nosto:pannonhalma': { lat: 47.552551, lng: 17.759000 },
  'nosto:pecs': { lat: 46.073611, lng: 18.233000 },
  'nosto:skandaali-elmyr-de-hory-vaarentaja': { lat: 47.497900, lng: 19.040200 },
  'nosto:skandaali-pyhan-kruunun-varkaus-1440': { lat: 47.785821, lng: 18.965269 },
  'nosto:skandaali-seuso-aarteen-kiista': { lat: 47.491200, lng: 19.062500 },
  'nosto:syvennys-budapest-aquincum': { lat: 47.583593, lng: 19.089026 },
  'nosto:syvennys-budapest-kisfoldalatti': { lat: 47.505700, lng: 19.063100 },
  'nosto:syvennys-budapest-luolat': { lat: 47.521898, lng: 18.930974 },
  'nosto:szeged': { lat: 46.253467, lng: 20.141000 },
  'nosto:tisza': { lat: 47.145269, lng: 20.168000 },
  'nosto:tokaj': { lat: 48.117835, lng: 21.410000 },
  'nosto:tonava': { lat: 47.773152, lng: 19.140931 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_HUN_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
