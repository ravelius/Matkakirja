/*
 * LAATTAPYRAMIDIN PYSYVÄT VIIVAT — reitit ja joet yhdeksi olioksi,
 * joka kelpaa piirtomoottorille.
 *
 * Tämä on tools/generoi-laattapyramidi.mjs:n moduuli, ei oma työkalunsa.
 *
 * === MIKSI TÄMÄ ON OLEMASSA ========================================
 *
 * Raamattu (omistaja 29.8.2026, "LAATTAPYRAMIDI JA KARTAN PATINA",
 * täsmennys): *"kaikki reittipisteet ja kaupungit yms voidaan piirtaa
 * suoraan yhteen karttaan, eika tarvita muita kikkoja kuin rajoitettu
 * liikkuvuus"* — KAIKKI PYSYVÄ näkyy alusta asti kaikkialla, ja se
 * poltetaan laattoihin koko maailmasta.
 *
 * Tähän asti nämä piirtyivät pelin SVG-kerroksiin joka kehyksessä.
 * Laatoissa ne ovat valmiiksi maalattuja pikseleitä, ja pelille jää
 * vain ohut pelitilakerros (laattavärit, elävät merkit, nappula,
 * vinjetointi).
 *
 * === MIKÄ ON PYSYVÄÄ JA MIKÄ EI ====================================
 *
 * Tänne kuuluu vain se, mikä ei muutu pelin aikana EIKÄ ole tekstiä.
 * Reitin viiva on pysyvä; sen varrella liikkuva nappula ei. Rajanveto
 * on tärkeä, koska laattaan poltettua ei saa pois ilman uutta ajoa.
 *
 * === LÄHTEET =======================================================
 *
 *   reitit     js/packs/maailmankartta.js  edges (408) ja airRoutes (71)
 *   joet       js/packs/maailmankartta-nimet.js  joet (123, polyviivat)
 *
 * === NIMET JA MERKIT EIVÄT OLE TÄÄLLÄ (omistaja 30.8.2026) =========
 *
 * Tässä kerättiin ennen myös kaupungit, järvet, vuoret ja kohteet
 * nimiöineen ja merkkeineen. Ne poistuivat laatoista: poltettu nimi on
 * laitepikseleissä ja siksi tiheällä näytöllä kolmasosan kokoinen, eikä
 * sitä voi mitoittaa laatassa oikein (perustelu
 * tools/fokuskartta/maailmapiirto.js osio 8b). Peli latoo ne nyt
 * ruutuavaruudessa (js/karttanimet.js), ja sinne muutti myös
 * kaksoisnimien paritus (sama normalisointi ja sama 400 yksikön raja).
 * Tänne jää vain viivatyö, jota ei lueta.
 *
 * Kaikki koordinaatit ovat LAUDAN yksiköitä, eli samassa avaruudessa
 * kuin laattojen bbox. Mitään ei projisoida uudelleen — juuri siksi
 * viivat osuvat laattoihin pikselilleen.
 */
/**
 * Kokoaa pysyvän sisällön laudalta.
 *
 * @param {object} pack js/packs/maailmankartta.js:n MAAILMANKARTTA
 */
export async function keraaSisalto(pack, packkikansio) {
  const nimet = await import(`${packkikansio}/maailmankartta-nimet.js`)
    .then((m) => m.MAAILMANKARTAN_NIMET)
    .catch(() => ({ joet: [] }));

  /* --------------------------------------------------------- reitit */

  /*
   * REITTI ON JANA KAHDEN KAUPUNGIN VÄLILLÄ, ei sen kummempaa: laudan
   * oma piirto vetää ne suorina. Päivämääränrajan yli menevä jana
   * katkaistaan vasta piirrossa (viivaPolku), joten tänne se tulee
   * sellaisenaan.
   *
   * Kaupungit luetaan vain janojen päiksi. Kaupunkien PISTEET ja NIMET
   * eivät ole enää laatoissa (ks. tiedoston johdanto), joten niitä ei
   * viedä eteenpäin.
   */
  const paikka = new Map((pack.cities ?? []).map((c) => [c.id, c]));
  const jana = (e) => {
    const a = paikka.get(e.a);
    const b = paikka.get(e.b);
    return a && b ? { ax: a.x, ay: a.y, bx: b.x, by: b.y } : null;
  };
  const reitit = (pack.edges ?? []).map(jana).filter(Boolean);
  const lentoreitit = (pack.airRoutes ?? []).map(jana).filter(Boolean);

  /* ----------------------------------------------------------- joet */

  /*
   * Joen geometria on valmiina polyviivana (`pisteet`) laudan
   * koordinaateissa. `tarkeys` 1 on pääjoki; sitä käytetään
   * yleistykseen — kaukaa piirretään vain pääjoet.
   */
  const joet = (nimet.joet ?? [])
    .filter((j) => Array.isArray(j.pisteet) && j.pisteet.length > 1)
    .map((j) => ({ nimi: j.nimi, tarkeys: j.tarkeys ?? 2, pisteet: j.pisteet }));

  return { reitit, lentoreitit, joet };
}

/** Lyhyt yhteenveto lokiin. */
export function sisallonYhteenveto(s) {
  return `reitit ${s.reitit.length}(+${s.lentoreitit.length} lento) · `
    + `joet ${s.joet.length}`;
}
