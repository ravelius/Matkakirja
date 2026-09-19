/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: CZE (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso CZE --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa CZE): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_CZE = {
  'nosto:boubin': { lat: 48.977750, lng: 13.817000 },
  'nosto:cesky-krumlov': { lat: 48.810160, lng: 14.229800 },
  'nosto:decin': { lat: 50.772798, lng: 14.195000 },
  'nosto:hahmotelma-adrspach': { lat: 50.610961, lng: 16.115000 },
  'nosto:hahmotelma-bohemian-paradise': { lat: 50.516470, lng: 15.169939 },
  'nosto:hahmotelma-cheb': { lat: 50.079961, lng: 12.371000 },
  'nosto:hahmotelma-hranice': { lat: 49.531767, lng: 17.750000 },
  'nosto:hahmotelma-kamenicky-senov': { lat: 50.777352, lng: 14.471000 },
  'nosto:hahmotelma-karlovy-vary': { lat: 50.231361, lng: 12.872000 },
  'nosto:hahmotelma-koniggratz': { lat: 50.270314, lng: 15.749000 },
  'nosto:hahmotelma-krivoklat': { lat: 50.038623, lng: 13.874000 },
  'nosto:hahmotelma-kromeriz': { lat: 49.298072, lng: 17.393000 },
  'nosto:hahmotelma-kuks': { lat: 50.400791, lng: 15.890000 },
  'nosto:hahmotelma-lipno': { lat: 48.700589, lng: 14.066000 },
  'nosto:hahmotelma-lostice': { lat: 49.741784, lng: 16.928000 },
  'nosto:hahmotelma-lysa-hora': { lat: 49.545630, lng: 18.449000 },
  'nosto:hahmotelma-machovo': { lat: 50.586756, lng: 14.651019 },
  'nosto:hahmotelma-marianske-lazne': { lat: 49.965085, lng: 12.701000 },
  'nosto:hahmotelma-mlada-boleslav': { lat: 50.412227, lng: 14.903000 },
  'nosto:hahmotelma-pernstejn': { lat: 49.450855, lng: 16.319000 },
  'nosto:hahmotelma-podyji': { lat: 48.849759, lng: 15.899000 },
  'nosto:hahmotelma-praded': { lat: 50.082257, lng: 17.234000 },
  'nosto:hahmotelma-pribram': { lat: 49.688751, lng: 14.009000 },
  'nosto:hahmotelma-slavkov': { lat: 49.128772, lng: 16.763000 },
  'nosto:hahmotelma-stramberk': { lat: 49.591824, lng: 18.119000 },
  'nosto:hahmotelma-telc': { lat: 49.184469, lng: 15.452000 },
  'nosto:hahmotelma-trebic': { lat: 49.214623, lng: 15.881000 },
  'nosto:hahmotelma-zatec': { lat: 50.329855, lng: 13.544000 },
  'nosto:hahmotelma-zdar': { lat: 49.580277, lng: 15.941000 },
  'nosto:hahmotelma-zvikov': { lat: 49.436976, lng: 14.189000 },
  'nosto:jablonec': { lat: 50.724963, lng: 15.167000 },
  'nosto:jachymov': { lat: 50.373339, lng: 12.929000 },
  'nosto:konesprezna-draha': { lat: 48.975425, lng: 14.474000 },
  'nosto:kutna-hora': { lat: 49.948990, lng: 15.269000 },
  'nosto:labe': { lat: 50.531067, lng: 14.129000 },
  'nosto:lednice': { lat: 48.800840, lng: 16.802000 },
  'nosto:litomysl': { lat: 49.873072, lng: 16.310000 },
  'nosto:mendelin-luostari': { lat: 49.191428, lng: 16.595000 },
  'nosto:moravskykras': { lat: 49.372182, lng: 16.727000 },
  'nosto:nosto-karlstejn': { lat: 49.939791, lng: 14.189000 },
  'nosto:olomouc': { lat: 49.594133, lng: 17.252000 },
  'nosto:plzensky-prazdroj': { lat: 49.746394, lng: 13.388000 },
  'nosto:skandaali-kelley-alkemistihuijari': { lat: 50.520300, lng: 13.633600 },
  'nosto:snezka': { lat: 50.736355, lng: 15.740000 },
  'nosto:tabor': { lat: 49.413841, lng: 14.657000 },
  'nosto:vltava': { lat: 48.810160, lng: 14.406200 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_CZE_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
