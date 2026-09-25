/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: BEL (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso BEL --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa BEL): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_BEL = {
  'nosto:hahmotelma-bastogne': { lat: 50.008756, lng: 5.738000 },
  'nosto:hahmotelma-bois-du-cazier': { lat: 50.380203, lng: 4.442000 },
  'nosto:hahmotelma-bouillon': { lat: 49.792480, lng: 5.066000 },
  'nosto:hahmotelma-brugge-belfry': { lat: 51.208874, lng: 3.224000 },
  'nosto:hahmotelma-canal-du-centre': { lat: 50.478524, lng: 4.109000 },
  'nosto:hahmotelma-chimay': { lat: 50.050108, lng: 4.316000 },
  'nosto:hahmotelma-dinant': { lat: 50.265732, lng: 4.916000 },
  'nosto:hahmotelma-durbuy': { lat: 50.352744, lng: 5.456000 },
  'nosto:hahmotelma-eben-emael': { lat: 50.797843, lng: 5.678000 },
  'nosto:hahmotelma-grand-hornu': { lat: 50.435094, lng: 3.839000 },
  'nosto:hahmotelma-han-sur-lesse': { lat: 50.125868, lng: 5.189000 },
  'nosto:hahmotelma-high-fens': { lat: 50.544768, lng: 6.077000 },
  'nosto:hahmotelma-hoge-kempen': { lat: 51.000207, lng: 5.666000 },
  'nosto:hahmotelma-kalmthout': { lat: 51.394416, lng: 4.442000 },
  'nosto:hahmotelma-kortrijk': { lat: 50.829708, lng: 3.275000 },
  'nosto:hahmotelma-lions-mound': { lat: 50.679381, lng: 4.406000 },
  'nosto:hahmotelma-menin-gate': { lat: 50.852462, lng: 2.891000 },
  'nosto:hahmotelma-orval': { lat: 49.640301, lng: 5.348000 },
  'nosto:hahmotelma-oudenaarde': { lat: 50.850187, lng: 3.599000 },
  'nosto:hahmotelma-semois': { lat: 49.879977, lng: 4.739000 },
  'nosto:hahmotelma-seraing': { lat: 50.583577, lng: 5.501000 },
  'nosto:hahmotelma-spa': { lat: 50.492234, lng: 5.864000 },
  'nosto:hahmotelma-tervuren': { lat: 50.831984, lng: 4.520000 },
  'nosto:hahmotelma-tournai': { lat: 50.606398, lng: 3.389000 },
  'nosto:hahmotelma-turnhout': { lat: 51.317534, lng: 4.949000 },
  'nosto:hahmotelma-zwin': { lat: 51.358245, lng: 3.365000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_BEL_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
