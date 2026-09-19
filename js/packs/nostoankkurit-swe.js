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
  'nosto:hahmotelma-abisko': { lat: 68.423250, lng: 18.688518 },
  'nosto:hahmotelma-almhult': { lat: 56.399246, lng: 14.322457 },
  'nosto:hahmotelma-eskilstuna': { lat: 59.483022, lng: 16.507691 },
  'nosto:hahmotelma-faro': { lat: 57.949094, lng: 19.151000 },
  'nosto:hahmotelma-gammelstad': { lat: 65.562657, lng: 22.050195 },
  'nosto:hahmotelma-granna': { lat: 57.590658, lng: 14.463382 },
  'nosto:hahmotelma-gripsholm': { lat: 59.105231, lng: 17.015684 },
  'nosto:hahmotelma-halsingegardar': { lat: 61.284458, lng: 16.993759 },
  'nosto:hahmotelma-hoga-kusten': { lat: 62.981399, lng: 18.398247 },
  'nosto:hahmotelma-jokkmokk': { lat: 66.616540, lng: 19.832000 },
  'nosto:hahmotelma-kalix': { lat: 65.865803, lng: 23.171530 },
  'nosto:hahmotelma-karlskoga': { lat: 59.803031, lng: 14.370738 },
  'nosto:hahmotelma-kivik': { lat: 55.597186, lng: 14.243490 },
  'nosto:hahmotelma-kosterhavet': { lat: 58.910370, lng: 11.005142 },
  'nosto:hahmotelma-kullaberg': { lat: 56.266090, lng: 12.541113 },
  'nosto:hahmotelma-lacko': { lat: 58.635029, lng: 13.224270 },
  'nosto:hahmotelma-leksand': { lat: 61.234261, lng: 14.960227 },
  'nosto:hahmotelma-marstrand': { lat: 57.726441, lng: 11.791277 },
  'nosto:hahmotelma-norrkoping': { lat: 58.730845, lng: 16.196802 },
  'nosto:hahmotelma-oland': { lat: 56.733486, lng: 16.667000 },
  'nosto:hahmotelma-rattvik': { lat: 61.584250, lng: 15.081987 },
  'nosto:hahmotelma-sarek': { lat: 67.282980, lng: 17.695501 },
  'nosto:hahmotelma-sigtuna': { lat: 59.517837, lng: 17.720979 },
  'nosto:hahmotelma-skokloster': { lat: 60.216262, lng: 17.613498 },
  'nosto:hahmotelma-varberg': { lat: 57.127743, lng: 12.236643 },
  'nosto:hahmotelma-vattern': { lat: 57.983938, lng: 14.630618 },
  'nosto:hahmotelma-vimmerby': { lat: 57.234108, lng: 15.868474 },
  'nosto:hahmotelma-ystad': { lat: 55.406155, lng: 13.572870 },
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
