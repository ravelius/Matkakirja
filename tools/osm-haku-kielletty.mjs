// Overpass on kielletty (Raamattu 2.183). Työkalu, joka tarvitsee OSM-aineistoa, kaatuu tähän, kunnes sille tehdään
// korvaava haku Geofabrikin aineistosta. tests/overpass-kielto.test.mjs estää Overpass-osoitteet ja -kutsut tools/-kansiossa.
export function osmHakuPuuttuu(tyokalu) {
  throw new Error(`${tyokalu}: OSM-haku on pois käytöstä, koska Overpass on kielletty (Raamattu 2.183). `
    + 'Tee korvaava haku Geofabrikin aineistosta, kun työkalua tarvitaan.');
}
