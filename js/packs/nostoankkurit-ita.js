/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: ITA (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso ITA --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa ITA): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_ITA = {
  'nosto:adrianmeri': { lat: 42.999250, lng: 14.999000 },
  'nosto:capri': { lat: 40.550592, lng: 14.234000 },
  'nosto:cinque-terre': { lat: 44.119450, lng: 9.716000 },
  'nosto:comojarvi': { lat: 45.999171, lng: 9.266000 },
  'nosto:dolomiitit': { lat: 46.432984, lng: 11.849000 },
  'nosto:etna': { lat: 37.754916, lng: 14.996000 },
  'nosto:hahmotelma-agrigento': { lat: 37.289946, lng: 13.592000 },
  'nosto:hahmotelma-alba': { lat: 44.700523, lng: 8.033000 },
  'nosto:hahmotelma-assisi': { lat: 43.075754, lng: 12.760963 },
  'nosto:hahmotelma-brennero': { lat: 47.002771, lng: 11.507000 },
  'nosto:hahmotelma-cannae': { lat: 41.348071, lng: 16.153859 },
  'nosto:hahmotelma-canossa': { lat: 44.695447, lng: 10.451969 },
  'nosto:hahmotelma-carrara': { lat: 44.376306, lng: 10.212953 },
  'nosto:hahmotelma-castel-del-monte': { lat: 41.032965, lng: 16.268120 },
  'nosto:hahmotelma-chianti': { lat: 43.522509, lng: 11.396222 },
  'nosto:hahmotelma-cremona': { lat: 45.006873, lng: 10.031790 },
  'nosto:hahmotelma-elba': { lat: 42.781192, lng: 10.274000 },
  'nosto:hahmotelma-garda': { lat: 45.653736, lng: 10.666159 },
  'nosto:hahmotelma-gran-paradiso': { lat: 45.515110, lng: 7.271000 },
  'nosto:hahmotelma-gran-sasso': { lat: 42.470672, lng: 13.565000 },
  'nosto:hahmotelma-ivrea': { lat: 45.466812, lng: 7.883000 },
  'nosto:hahmotelma-larderello': { lat: 42.992206, lng: 10.896221 },
  'nosto:hahmotelma-monte-cassino': { lat: 41.803554, lng: 13.820621 },
  'nosto:hahmotelma-monviso': { lat: 44.660520, lng: 6.858146 },
  'nosto:hahmotelma-paestum': { lat: 40.417476, lng: 15.164747 },
  'nosto:hahmotelma-portofino': { lat: 44.636452, lng: 9.186587 },
  'nosto:hahmotelma-solferino': { lat: 45.332423, lng: 10.566506 },
  'nosto:hahmotelma-stelvio': { lat: 46.527724, lng: 10.364677 },
  'nosto:hahmotelma-stromboli': { lat: 38.792751, lng: 15.212000 },
  'nosto:hahmotelma-tarquinia': { lat: 42.381257, lng: 11.754444 },
  'nosto:hahmotelma-teano': { lat: 41.490643, lng: 14.071881 },
  'nosto:hahmotelma-urbino': { lat: 43.655070, lng: 12.634743 },
  'nosto:hahmotelma-val-d-orcia': { lat: 42.689243, lng: 11.399185 },
  'nosto:hahmotelma-valdobbiadene': { lat: 46.108478, lng: 11.941745 },
  'nosto:hahmotelma-villa-adriana': { lat: 42.073772, lng: 12.774952 },
  'nosto:hetki-galilei-kaukoputki-1610': { lat: 45.406400, lng: 11.876800 },
  'nosto:hetki-vesuvius-pompeji-79': { lat: 40.760383, lng: 14.445074 },
  'nosto:ligurianmeri': { lat: 43.500538, lng: 8.999000 },
  'nosto:matera': { lat: 40.666996, lng: 16.607000 },
  'nosto:milano': { lat: 45.466812, lng: 9.191000 },
  'nosto:napoli': { lat: 40.836327, lng: 14.249000 },
  'nosto:pisa': { lat: 43.717093, lng: 10.400000 },
  'nosto:po': { lat: 44.953378, lng: 12.431000 },
  'nosto:pompeji': { lat: 40.661435, lng: 14.576724 },
  'nosto:sardinia': { lat: 39.999844, lng: 8.999000 },
  'nosto:skandaali-cagliostro-san-leo': { lat: 43.896200, lng: 12.341100 },
  'nosto:skandaali-modiglianin-paat-1984': { lat: 43.598500, lng: 10.310600 },
  'nosto:torino': { lat: 45.079564, lng: 7.676000 },
  'nosto:tyrrhenanmeri': { lat: 39.999844, lng: 11.999000 },
  'nosto:vesuvius': { lat: 40.901501, lng: 14.392009 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_ITA_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
