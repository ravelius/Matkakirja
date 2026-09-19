/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: AUT (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso AUT --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa AUT): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_AUT = {
  'nosto:bregenzin-jarvinayttamo': { lat: 47.507649, lng: 9.734000 },
  'nosto:carnuntum': { lat: 48.113138, lng: 16.862000 },
  'nosto:durnstein': { lat: 48.402188, lng: 15.554616 },
  'nosto:eisriesenwelt': { lat: 47.502921, lng: 13.190000 },
  'nosto:erzberg': { lat: 47.533648, lng: 14.888000 },
  'nosto:groglockner': { lat: 47.074047, lng: 12.695000 },
  'nosto:hahmotelma-admont': { lat: 47.573813, lng: 14.462000 },
  'nosto:hahmotelma-bad-gastein': { lat: 47.100168, lng: 13.016000 },
  'nosto:hahmotelma-bad-ischl': { lat: 47.720147, lng: 13.634000 },
  'nosto:hahmotelma-bregenzerwald': { lat: 47.266221, lng: 9.881000 },
  'nosto:hahmotelma-eisenstadt': { lat: 47.849764, lng: 16.517000 },
  'nosto:hahmotelma-ferlach': { lat: 46.533364, lng: 14.300000 },
  'nosto:hahmotelma-forchtenstein': { lat: 47.708355, lng: 16.331000 },
  'nosto:hahmotelma-gmunden': { lat: 47.918033, lng: 13.799000 },
  'nosto:hahmotelma-grossvenediger': { lat: 47.109665, lng: 12.347000 },
  'nosto:hahmotelma-hall-in-tirol': { lat: 47.282810, lng: 11.501000 },
  'nosto:hahmotelma-heiligenkreuz': { lat: 48.101192, lng: 16.259828 },
  'nosto:hahmotelma-hochosterwitz': { lat: 46.755255, lng: 14.453000 },
  'nosto:hahmotelma-kitzbuehel': { lat: 47.446169, lng: 12.392000 },
  'nosto:hahmotelma-kremsmuenster': { lat: 48.054416, lng: 14.132000 },
  'nosto:hahmotelma-kreuzenstein': { lat: 48.433723, lng: 16.309949 },
  'nosto:hahmotelma-lienz': { lat: 46.829103, lng: 12.770000 },
  'nosto:hahmotelma-mariazell': { lat: 47.766784, lng: 15.324029 },
  'nosto:hahmotelma-mayerling': { lat: 48.056837, lng: 15.935474 },
  'nosto:hahmotelma-millstatt': { lat: 46.795760, lng: 13.580000 },
  'nosto:hahmotelma-neusiedl': { lat: 47.833277, lng: 16.751000 },
  'nosto:hahmotelma-oberndorf': { lat: 47.941562, lng: 12.941000 },
  'nosto:hahmotelma-oetscher': { lat: 47.856828, lng: 15.203000 },
  'nosto:hahmotelma-piber': { lat: 47.081172, lng: 15.101000 },
  'nosto:hahmotelma-riegersburg': { lat: 47.005148, lng: 15.932000 },
  'nosto:hahmotelma-st-anton': { lat: 47.116787, lng: 10.268000 },
  'nosto:hahmotelma-steyr': { lat: 48.033267, lng: 14.417000 },
  'nosto:hahmotelma-traunsee': { lat: 47.866247, lng: 13.799000 },
  'nosto:hahmotelma-woerthersee': { lat: 46.624093, lng: 14.150000 },
  'nosto:hahmotelma-zell-am-see': { lat: 47.315979, lng: 12.800000 },
  'nosto:hallstatt': { lat: 47.562001, lng: 13.649000 },
  'nosto:hohensalzburg': { lat: 47.795583, lng: 13.046000 },
  'nosto:inn': { lat: 47.299396, lng: 11.750000 },
  'nosto:krimmlin-vesiputoukset': { lat: 47.206951, lng: 12.173000 },
  'nosto:mauthausen': { lat: 48.256261, lng: 14.501000 },
  'nosto:melkin-luostari': { lat: 48.228123, lng: 15.335000 },
  'nosto:semmeringin-rata': { lat: 47.642289, lng: 15.830000 },
  'nosto:tonava': { lat: 48.363346, lng: 15.385384 },
  'nosto:wildspitze': { lat: 46.886235, lng: 10.868000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_AUT_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
