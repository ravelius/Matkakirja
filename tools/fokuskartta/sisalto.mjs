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
export async function keraaSisalto(pack, packkikansio, juuri = `${packkikansio}/../..`) {
  const nimet = await import(`${packkikansio}/maailmankartta-nimet.js`)
    .then((m) => m.MAAILMANKARTAN_NIMET)
    .catch(() => ({ joet: [] }));

  /* --------------------------------------------------------- reitit */

  /*
   * === REITTI EI OLE JANA VAAN PELILAUDAN RATA (omistaja 30.8.2026) ==
   *
   * Sanatarkasti: *"Kaupunkien välissä pitäisi näkyä nopanheitto
   * askelmat, ei katkoviiva. Lentoreitin punaisella katkoviivalla ja
   * laivareitit sinisellä niin että noppa askelmat näkyy."*
   *
   * Askelmat ovat pelilaudan ruutuja, ja ne ovat PYSYVIÄ: lauta ei
   * muutu pelin aikana, joten ne kuuluvat laattoihin eivätkä pelin
   * elävään kerrokseen.
   *
   * PAIKAT LASKETAAN PELIN OMILLA FUNKTIOILLA, EI OMALLA JAOLLA.
   * `js/rules.js` on ainoa paikka, joka tietää mihin nappula tosiasiassa
   * pysähtyy: `edgePolyline` rakentaa reitin murtoviivan (merireitin
   * `via`-välipisteet, maareitin pienen käsin piirretyn mutkan
   * determinististä hajautusta myöten) ja `pointAlong(poly, idx/steps)`
   * antaa askelman idx paikan KAARENPITUUDEN mukaan tasavälein.
   * Jos tämä työkalu jakaisi janan omalla kaavallaan, laattaan poltettu
   * ruutu ja nappulan pysähdyspaikka eroaisivat — ja se olisi
   * pelivirhe eikä ulkoasuvirhe.
   *
   * Väliaskelmia on `steps - 1` kappaletta reunaa kohti: idx 0 ja idx
   * steps ovat kaupungit itse (ks. rules.js `stepsFrom`).
   *
   * MERIREITTI EROTETAAN PAKAN OMALLA KENTÄLLÄ `type === 'sea'`, joka
   * on jo olemassa (111 reittiä 408:sta; tools/korjaa-merireitit.mjs
   * käyttää samaa kenttää). Omaa sääntöä ei keksitty.
   *
   * LENTOREITEILLÄ EI OLE ASKELMIA, eikä se ole tämän työkalun
   * puute: `airRoutes`-riveillä on vain `a` ja `b`, ja pelissä
   * lentäminen siirtää nappulan suoraan perille
   * (js/game.js `actionMannerLento`: `p.pos = { type: 'city', ... }`).
   * Lennolla ei siis ole ruutuja, joita piirtää.
   */
  const { buildBoard, pointAlong } = await import(`${juuri}/js/rules.js`);
  const lauta = buildBoard(pack.cities ?? [], pack.edges ?? [], pack.map ?? null);
  const reitit = lauta.edges.map((e) => {
    const askelmat = [];
    for (let i = 1; i < e.steps; i += 1) {
      const p2 = pointAlong(e.poly, i / e.steps);
      askelmat.push([p2.x, p2.y]);
    }
    return { laji: e.type === 'sea' ? 'meri' : 'maa', poly: e.poly, askelmat };
  });

  const paikka = new Map((pack.cities ?? []).map((c) => [c.id, c]));
  const jana = (e) => {
    const a = paikka.get(e.a);
    const b = paikka.get(e.b);
    return a && b ? { ax: a.x, ay: a.y, bx: b.x, by: b.y } : null;
  };
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
  const meri = s.reitit.filter((r) => r.laji === 'meri').length;
  const askelmat = s.reitit.reduce((a, r) => a + r.askelmat.length, 0);
  return `reitit ${s.reitit.length} (${meri} meri, +${s.lentoreitit.length} lento) · `
    + `askelmia ${askelmat} · joet ${s.joet.length}`;
}
