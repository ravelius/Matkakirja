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

  /*
   * === LAATTA PIIRTÄÄ SEN KÄYRÄN, JOTA PELI KÄVELEE (omistaja 31.8.2026)
   *
   * Edellinen erä poimi tästä SOLMUPOLUN — kaupungit ja `via`-pisteet —
   * ja piirsi niiden väliin suorat janat, koska omistaja sanoi reittien
   * saavan olla *"luotisuoria viivoja"*. Se poisti silmukat, mutta se
   * poisti OIREEN: silmukat syntyivät `js/rules.js densify`stä, joka oli
   * yhtenäinen Catmull-Rom (alpha = 0), ja se yliampuu terävissä
   * mutkissa kun pisteet ovat epätasavälein — sama spline-vaara, joka on
   * kirjattu jokien kohdalle (maailmapiirto.js `lautaKaari`).
   *
   * Omistajan päätös 31.8.2026: korjataan SYY. `densify` on nyt
   * sentripetaalinen (alpha = 0,5), joka on todistetusti vapaa
   * silmukoista, ja laatta piirtää saman murtoviivan, jota peli kävelee.
   * *"Omistajan lupa luotisuoriin viivoihin oli lupa eikä vaatimus."*
   *
   * MIKSI TÄMÄ ON TÄRKEÄÄ: solmupolkua piirrettäessä laatta ja peli
   * olivat eri mieltä reitin muodosta — mitattuna mediaani 0,26 mutta
   * pahimmillaan 38,35 lautayksikköä. Nappula kulki laattaan poltetun
   * viivan vierestä. Nyt ero on nolla, koska kumpikin lukee saman
   * `edge.poly`n.
   *
   * === SOLMUT LUETAAN SILTI — MUTTA VAIN HEITON ANKKUREIKSI =========
   *
   * Käsin piirretty jälki tehdään sillä, että SOLMU heittää pikselin
   * murto-osan pois paikaltaan (maailmapiirto.js "KÄSIN PIIRRETTY
   * JÄLKI"). Jos heitto arvottaisiin jokaiselle pehmennyspisteelle
   * erikseen, viivasta tulisi rosoinen kohina eikä kynän vapinaa —
   * pisteitä on neljätoista jokaista väliä kohti. Siksi heitto
   * arvotaan solmuille ja pehmennetään niiden välillä, ja tänne
   * riittää solmujen INDEKSILISTA.
   *
   * Indeksit tiedetään pakasta riippumatta (`via`-pisteet + kaksi
   * päätä, tai maareitin neljä), ja jos murtoviivan pituus ei täsmää
   * odotukseen, palautetaan pelkät päät ja lasketaan `poikkeamat`.
   * Näin `perSpan`in muutos rules.js:ssä ei voi hiljaa vääristää
   * laattoja — se näkyy lokissa.
   */
  const PER_SPAN = 14;
  let poikkeamat = 0;
  const solmuIndeksit = (e) => {
    if (e.poly.length <= 2) return [0, e.poly.length - 1];
    const odotettu = e.via ? e.via.length + 2 : (e.type === 'sea' ? 2 : 4);
    const valeja = (e.poly.length - 1) / PER_SPAN;
    if (!Number.isInteger(valeja) || valeja + 1 !== odotettu) {
      poikkeamat += 1;
      return [0, e.poly.length - 1];
    }
    const out = [];
    for (let i = 0; i < e.poly.length; i += PER_SPAN) out.push(i);
    return out;
  };

  /*
   * KÄSIN PIIRRETYN SIEMEN. Piirto tarvitsee reittikohtaisen luvun
   * kynänpaineen ja solmujen pikselin murto-osan heiton arpomiseen.
   * Se johdetaan REITIN TUNNUKSESTA eikä pikselistä — sama reitti saa
   * saman heiton joka laatalla ja joka ajolla, eikä laattojen väliin
   * voi syntyä saumaa (maailmapiirto.js "KÄSIN PIIRRETTY JÄLKI").
   */
  const siemenesta = (avain) => {
    let h = 2166136261;
    for (let i = 0; i < avain.length; i += 1) {
      h ^= avain.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const reitit = lauta.edges.map((e) => ({
    laji: e.type === 'sea' ? 'meri' : 'maa',
    poly: e.poly,
    /*
     * ASKELMAT PELIN OMALLA KAAVALLA JA PELIN OMASTA POLUSTA. Sama
     * `pointAlong(poly, idx/steps)`, sama `poly` — laattaan poltettu
     * ruutu ja nappulan pysähdyspaikka ovat siis sama piste, eivät
     * likimain sama.
     */
    askelmat: Array.from({ length: Math.max(0, e.steps - 1) }, (_, i) => {
      const p2 = pointAlong(e.poly, (i + 1) / e.steps);
      return [p2.x, p2.y];
    }),
    solmut: solmuIndeksit(e),
    siemen: siemenesta(e.id),
  }));
  if (poikkeamat) {
    console.log(`  VAROITUS: ${poikkeamat} reitin solmuja ei tunnistettu — `
      + 'niiden viiva piirtyy ilman käsin piirretyn heittoa '
      + '(tarkista rules.js densify perSpan).');
  }

  const paikka = new Map((pack.cities ?? []).map((c) => [c.id, c]));
  const jana = (e) => {
    const a = paikka.get(e.a);
    const b = paikka.get(e.b);
    return a && b ? { ax: a.x, ay: a.y, bx: b.x, by: b.y } : null;
  };
  /*
   * === LENTOREITTI ON SAMAA MUOTOA KUIN MUUTKIN (omistaja 31.8.2026)
   *
   * *"Kaikki reitit saavat olla piirretty katkoviivalla."* Kun kaikki
   * kolme lajia kulkevat saman katkoviivakoneiston läpi
   * (maailmapiirto.js `katkoPolku`), lentoreitin on oltava sille
   * samaa muotoa kuin maa- ja merireitin: `poly` on murtoviiva ja
   * `solmut` sen ankkurit. Lento on kahden kaupungin ilmaviiva, joten
   * murtoviivassa on tasan kaksi pistettä eikä välisolmuja ole —
   * solmuheittoa ei siis ole mihin panna, mutta katkon oma heitto ja
   * kaari tulevat siitä samasta siemenestä kuin muillakin.
   *
   * `ax…by` jäävät paikalleen: ne ovat sama tieto lyhyemmässä
   * muodossa, ja sisältötiedosto luetaan myös vanhemmilla ajoilla.
   */
  const lentoreitit = (pack.airRoutes ?? []).map((e) => {
    const j = jana(e);
    if (!j) return null;
    return {
      ...j,
      poly: [[j.ax, j.ay], [j.bx, j.by]],
      solmut: [0, 1],
      siemen: siemenesta(`lento:${e.a}|${e.b}`),
    };
  }).filter(Boolean);

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
