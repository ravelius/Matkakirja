/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: ESP (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso ESP --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa ESP): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_ESP = {
  'nosto:altamiran-luola': { lat: 43.472842, lng: -3.973142 },
  'nosto:aneto': { lat: 42.632284, lng: 0.663879 },
  'nosto:cordoban-moskeijakatedraali': { lat: 37.879304, lng: -4.780000 },
  'nosto:ebro': { lat: 41.649044, lng: -0.880000 },
  'nosto:hahmotelma-albufera': { lat: 39.331345, lng: -0.352000 },
  'nosto:hahmotelma-alcantaran-silta': { lat: 39.722197, lng: -6.892000 },
  'nosto:hahmotelma-almaden': { lat: 38.777327, lng: -4.837000 },
  'nosto:hahmotelma-aranjuez': { lat: 40.032914, lng: -3.604000 },
  'nosto:hahmotelma-atapuerca': { lat: 42.366133, lng: -3.523000 },
  'nosto:hahmotelma-bardenas-reales': { lat: 42.191674, lng: -1.471000 },
  'nosto:hahmotelma-cabo-de-finisterre': { lat: 42.882843, lng: -9.271000 },
  'nosto:hahmotelma-campo-de-criptana': { lat: 39.400415, lng: -3.118000 },
  'nosto:hahmotelma-canal-de-castilla': { lat: 41.749273, lng: -4.648000 },
  'nosto:hahmotelma-covadonga': { lat: 43.233418, lng: -5.075172 },
  'nosto:hahmotelma-el-escorial': { lat: 40.257082, lng: -3.901421 },
  'nosto:hahmotelma-gernikako-arbola': { lat: 43.393008, lng: -2.678192 },
  'nosto:hahmotelma-jabugo': { lat: 37.917648, lng: -6.733016 },
  'nosto:hahmotelma-la-tomatina': { lat: 39.418315, lng: -0.790000 },
  'nosto:hahmotelma-las-navas': { lat: 38.342052, lng: -3.550000 },
  'nosto:hahmotelma-numancia': { lat: 41.809366, lng: -2.443000 },
  'nosto:hahmotelma-picos-de-europa': { lat: 43.180057, lng: -4.779138 },
  'nosto:hahmotelma-poblet': { lat: 41.111822, lng: 1.136817 },
  'nosto:hahmotelma-rioja-haro': { lat: 42.582564, lng: -2.851000 },
  'nosto:hahmotelma-riotinto': { lat: 38.136688, lng: -6.606567 },
  'nosto:hahmotelma-roncesvalles': { lat: 43.009151, lng: -1.321000 },
  'nosto:hahmotelma-ronda': { lat: 36.737008, lng: -5.164000 },
  'nosto:hahmotelma-sierra-de-cazorla': { lat: 37.936272, lng: -2.959000 },
  'nosto:hahmotelma-sierra-de-gredos': { lat: 40.317777, lng: -5.083389 },
  'nosto:hahmotelma-tabernas': { lat: 37.000739, lng: -2.449000 },
  'nosto:hahmotelma-tablas-de-daimiel': { lat: 39.149524, lng: -3.667000 },
  'nosto:hahmotelma-tordesillas': { lat: 41.501039, lng: -4.999000 },
  'nosto:hahmotelma-trujillo': { lat: 39.464331, lng: -5.878000 },
  'nosto:hahmotelma-vizcayan-silta': { lat: 43.174853, lng: -3.018332 },
  'nosto:hahmotelma-yuste': { lat: 40.096144, lng: -5.739440 },
  'nosto:hetki-kolumbus-palos-1492': { lat: 37.280600, lng: -6.894400 },
  'nosto:hetki-kolumbus-santa-fe-1492': { lat: 37.190000, lng: -3.870000 },
  'nosto:hetki-magalhaes-sanlucar-1519': { lat: 36.772600, lng: -6.353000 },
  'nosto:hetki-trafalgar-victory-1805': { lat: 36.231100, lng: -6.033900 },
  'nosto:las-medulas': { lat: 42.458233, lng: -6.760000 },
  'nosto:meridan-roomalainen-teatteri': { lat: 38.916075, lng: -6.337000 },
  'nosto:mulhacen': { lat: 37.017638, lng: -3.306034 },
  'nosto:nosto-altamira': { lat: 43.406808, lng: -4.268391 },
  'nosto:nosto-cartagenan-kantoni': { lat: 37.601850, lng: -0.985000 },
  'nosto:salamancan-yliopisto': { lat: 40.962526, lng: -5.668000 },
  'nosto:santiago-de-compostela': { lat: 42.877887, lng: -8.545000 },
  'nosto:segovian-akvedukti': { lat: 40.947389, lng: -4.117000 },
  'nosto:skandaali-cerro-de-los-santos-vaarennokset': { lat: 38.733300, lng: -1.269400 },
  'nosto:syvennys-barcelona-filloksera': { lat: 41.287783, lng: 1.988010 },
  'nosto:syvennys-barcelona-kilpailu': { lat: 41.407600, lng: 2.158400 },
  'nosto:syvennys-barcelona-rambla': { lat: 41.385300, lng: 2.170100 },
  'nosto:syvennys-sevilla-donana': { lat: 37.000000, lng: -6.500000 },
  'nosto:tajo': { lat: 39.859831, lng: -4.021000 },
  'nosto:toledo': { lat: 39.857284, lng: -4.024000 },
  'nosto:valimeri': { lat: 38.599802, lng: 0.599000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_ESP_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
