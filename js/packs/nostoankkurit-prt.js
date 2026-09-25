/*
 * NOSTOJEN LUKITUT KARTTA-ANKKURIT: PRT (PAATOKSET 48:n velka, Fablen
 * erä I 19.9.2026; malli js/packs/nostoankkurit-fra.js).
 *
 * Viety pelistä puhelimen saapumiskehyksessä (tools/vie-nostoankkurit.mjs
 * --iso PRT --yhdista maan fokuskaupungeista) ja lukittu maalle
 * (tools/lukitse-nostoankkurit-maalle.mjs --maa PRT): maakohde ei ole
 * merellä; saari (Stromboli, Helgoland, Antikythera, Berlengas, Capri)
 * ja tyypin 'meri' nosto pitävät oman pisteensä. Hahmotelmat pysyvät
 * elävinä: maa EI ole LUKITUT_MAAT-listalla (poltto on oma päätöksensä).
 * Raportti docs/raportit/viesti-fable-ankkurilukitus-20260919.md.
 */
export const NOSTOANKKURIT_PRT = {
  'nosto:almendres': { lat: 38.558599, lng: -8.062000 },
  'nosto:atlantti': { lat: 39.599718, lng: -9.949000 },
  'nosto:aveiro': { lat: 40.644231, lng: -8.653000 },
  'nosto:batalha': { lat: 39.658422, lng: -8.827000 },
  'nosto:douro': { lat: 41.159110, lng: -7.789000 },
  'nosto:elvas': { lat: 38.867274, lng: -7.150000 },
  'nosto:guimaraes': { lat: 41.445799, lng: -8.290000 },
  'nosto:hahmotelma-almeida': { lat: 40.717570, lng: -6.901000 },
  'nosto:hahmotelma-amarante': { lat: 41.269851, lng: -8.079770 },
  'nosto:hahmotelma-arrabida': { lat: 38.531305, lng: -8.989000 },
  'nosto:hahmotelma-belmonte': { lat: 40.350391, lng: -7.349023 },
  'nosto:hahmotelma-berlengas': { lat: 39.448994, lng: -9.529000 },
  'nosto:hahmotelma-castelo-de-vide': { lat: 39.329848, lng: -7.536790 },
  'nosto:hahmotelma-castelo-rodrigo': { lat: 40.876726, lng: -6.964000 },
  'nosto:hahmotelma-castro-marim': { lat: 37.362425, lng: -7.431541 },
  'nosto:hahmotelma-chaves': { lat: 41.741759, lng: -7.471000 },
  'nosto:hahmotelma-estremoz': { lat: 38.883056, lng: -7.596706 },
  'nosto:hahmotelma-foz-coa': { lat: 41.081022, lng: -7.141000 },
  'nosto:hahmotelma-marvao': { lat: 39.399338, lng: -7.357195 },
  'nosto:hahmotelma-mertola': { lat: 37.584975, lng: -7.664071 },
  'nosto:hahmotelma-monsanto': { lat: 40.038000, lng: -7.114000 },
  'nosto:hahmotelma-monsaraz': { lat: 38.445218, lng: -7.381000 },
  'nosto:hahmotelma-panasqueira': { lat: 40.149851, lng: -7.750000 },
  'nosto:hahmotelma-peneda-geres': { lat: 41.724224, lng: -8.164000 },
  'nosto:hahmotelma-peniche': { lat: 39.374065, lng: -9.331786 },
  'nosto:hahmotelma-ponta-da-piedade': { lat: 37.007480, lng: -8.670616 },
  'nosto:hahmotelma-ponte-de-lima': { lat: 41.766803, lng: -8.566000 },
  'nosto:hahmotelma-ria-formosa': { lat: 36.869428, lng: -7.860992 },
  'nosto:hahmotelma-sabugal': { lat: 40.350289, lng: -7.064918 },
  'nosto:hahmotelma-sao-domingos': { lat: 37.725112, lng: -7.490850 },
  'nosto:hahmotelma-tavira': { lat: 37.153975, lng: -7.650951 },
  'nosto:hahmotelma-torres-vedras': { lat: 39.097563, lng: -9.181432 },
  'nosto:hahmotelma-trancoso': { lat: 40.783281, lng: -7.351000 },
  'nosto:hahmotelma-vila-nova-de-cerveira': { lat: 41.966951, lng: -8.683000 },
  'nosto:hahmotelma-vila-vicosa': { lat: 38.736746, lng: -7.417208 },
  'nosto:hahmotelma-vimeiro': { lat: 39.123182, lng: -9.361361 },
  'nosto:hetki-vasco-da-gama-restelo-1497': { lat: 38.726547, lng: -9.421300 },
  'nosto:nosto-joanina': { lat: 40.203195, lng: -8.413000 },
  'nosto:nosto-korkkitammi': { lat: 37.258712, lng: -8.290000 },
  'nosto:nosto-nazare': { lat: 39.602271, lng: -9.070000 },
  'nosto:nosto-saobento': { lat: 41.146519, lng: -8.611000 },
  'nosto:obidos': { lat: 39.356931, lng: -9.157000 },
  'nosto:saovicente': { lat: 37.043347, lng: -8.937140 },
  'nosto:sintra': { lat: 38.823891, lng: -9.381700 },
  'nosto:skandaali-portugalilaisen-nunnan-kirjeet': { lat: 38.011700, lng: -7.865000 },
  'nosto:tejo': { lat: 39.239190, lng: -8.680000 },
  'nosto:tomar': { lat: 39.604824, lng: -8.416000 },
  'nosto:torre': { lat: 40.322495, lng: -7.612000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_PRT_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-19' };
