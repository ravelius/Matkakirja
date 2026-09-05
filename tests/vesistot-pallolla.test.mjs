import { test } from 'node:test';
import assert from 'node:assert/strict';

/*
 * VESISTÖLINSSI PALLOLLA (aalto 1B, docs/moduulit/karttapallo.md luku
 * 10.1: "Jokainen linssi saa `pallolle(lauta, tila)`"). Vartioi laudalta
 * pallolle -muunnoksen ilman selainta ja ilman Globe.gl:ää:
 *
 *   1. MÄÄRÄT PITÄVÄT: 38 järveä ja 253 jokipolkua (84 pengertä luokista
 *      1–2 + 169 uomaa) — sama laskenta kuin laudan elementtimitoituksessa
 *      (js/linssit/vesistot.js piirra). Yksikään joki ei siis katoa
 *      muunnoksessa, ja jos aineisto kasvaa, tämä testi kertoo siitä.
 *   2. KOORDINAATIT OVAT ASTEITA: lat −90…90, lng −180…180 — ei laudan
 *      yksiköitä, jotka olisivat pallolla tuhansia asteita.
 *   3. SAUMA KATKAISTAAN: kiertävän laudan reunan yli hyppäävä polku
 *      pilkotaan, eikä uoma vedä viivaa väärää kautta maapallon ympäri.
 *   4. TÄRKEIN JOKI ON PAKSUIN: kolmiportainen järjestys säilyy laudalta
 *      pallolle, nyt asteina (Globe.gl pathStroke).
 *   5. SOPIMUS ON OLEMASSA: LINSSI.pallolle on funktio.
 */

const {
  LINSSI, vesistotPallolle, katkaiseSauma, tihennaKaarella,
  PALLON_UOMA_AST, PALLON_PENGER_AST, VESINIMIEN_KATTO, JARVEN_KORKEUS,
} = await import('../js/linssit/vesistot.js');
const { MAAILMANKARTAN_MAASTO } = await import('../js/packs/maailmankartta-maasto.js');
const { MAAILMANKARTAN_NIMET } = await import('../js/packs/maailmankartta-nimet.js');
const { laudaltaAsteiksi } = await import('../js/fokusmitat.js');
const { PALLO_LAUTA } = await import('../js/pallo.js');

/* Sama kutsu kuin js/pallolauta/lauta.js pallonAsteet. */
const asteet = (kohta) => laudaltaAsteiksi(PALLO_LAUTA, kohta.x, kohta.y);

const tulos = vesistotPallolle(
  { maasto: MAAILMANKARTAN_MAASTO, nimet: MAAILMANKARTAN_NIMET },
  asteet,
);

test('sopimus: linssillä on pallolle-funktio', () => {
  assert.equal(typeof LINSSI.pallolle, 'function');
  assert.ok(LINSSI.laudat.includes(PALLO_LAUTA));
});

test('järvet: kaikki 38 tulevat mukaan GeoJSON-polygoneina', () => {
  assert.equal(MAAILMANKARTAN_MAASTO.jarvet.length, 38);
  assert.equal(tulos.polygonit.length, 38);
  for (const d of tulos.polygonit) {
    assert.equal(d.geometry.type, 'Polygon');
    assert.equal(d.geometry.coordinates.length, 1);
    const rengas = d.geometry.coordinates[0];
    assert.ok(rengas.length >= 4);
    // GeoJSON: rengas on suljettu ja koordinaatti on [lng, lat].
    assert.deepEqual(rengas[0], rengas[rengas.length - 1]);
    assert.equal(d.korkeus, JARVEN_KORKEUS);
    assert.ok(d.vari && d.reuna);
  }
});

test('joet: 84 pengertä + 169 uomaa = 253 polkua', () => {
  const penkat = tulos.polut.filter((d) => d.avain.startsWith('penger:'));
  const uomat = tulos.polut.filter((d) => d.avain.startsWith('uoma:'));
  assert.equal(uomat.length, 169);
  assert.equal(penkat.length, 84);
  assert.equal(tulos.polut.length, 253);
  // Penkereet ensin: muuten seuraavan joen penger leikkaisi edellisen uoman.
  const ekaUoma = tulos.polut.findIndex((d) => d.avain.startsWith('uoma:'));
  const vikaPenger = tulos.polut.findLastIndex((d) => d.avain.startsWith('penger:'));
  assert.ok(vikaPenger < ekaUoma);
});

test('koordinaatit ovat asteita, eivät laudan yksiköitä', () => {
  let pisteita = 0;
  for (const d of tulos.polut) {
    assert.ok(d.pisteet.length >= 2);
    for (const [lat, lng] of d.pisteet) {
      assert.ok(lat >= -90 && lat <= 90, `lat ${lat}`);
      assert.ok(lng >= -180 && lng <= 180, `lng ${lng}`);
      pisteita += 1;
    }
  }
  assert.ok(pisteita > 1000);
  for (const d of tulos.polygonit) {
    for (const [lng, lat] of d.geometry.coordinates[0]) {
      assert.ok(lat >= -90 && lat <= 90);
      assert.ok(lng >= -180 && lng <= 180);
    }
  }
  for (const n of tulos.nimet) {
    assert.ok(n.lat >= -90 && n.lat <= 90);
    assert.ok(n.lng >= -180 && n.lng <= 180);
  }
});

test('sauma katkaisee polun, ei vedä viivaa maapallon ympäri', () => {
  // Yksi hyppy +179 → −179 tekee neljästä pisteestä kaksi polkua.
  const yli = [[10, 178], [11, 179], [12, -179], [13, -178]];
  const palat = katkaiseSauma(yli);
  assert.equal(palat.length, 2);
  assert.deepEqual(palat[0], [[10, 178], [11, 179]]);
  assert.deepEqual(palat[1], [[12, -179], [13, -178]]);
  // Yhden pisteen pala ei ole viiva eikä jää listaan.
  assert.equal(katkaiseSauma([[0, 179], [1, -179], [2, -178]]).length, 1);
  // Tavallinen polku ei katkea.
  assert.equal(katkaiseSauma([[0, 10], [1, 11], [2, 12]]).length, 1);
  // Nykyisessä aineistossa hyppyjä ei ole: jokainen uoma on yhtenä polkuna.
  for (const d of tulos.polut) assert.ok(!d.avain.includes('/'));
});

test('pitkät välit tihennetään isoympyrän pisteillä', () => {
  const harva = tihennaKaarella([[0, 0], [0, 10]], 2);
  assert.equal(harva.length, 6);
  assert.deepEqual(harva[0], [0, 0]);
  assert.deepEqual(harva[harva.length - 1], [0, 10]);
  // Tiheä polku ei saa uusia pisteitä.
  assert.equal(tihennaKaarella([[0, 0], [0, 1], [0, 2]], 2).length, 3);
  // Aineistossa yksikään väli ei jää yli rajan.
  for (const d of tulos.polut) {
    for (let i = 1; i < d.pisteet.length; i += 1) {
      const dLat = d.pisteet[i][0] - d.pisteet[i - 1][0];
      const dLng = d.pisteet[i][1] - d.pisteet[i - 1][1];
      assert.ok(Math.hypot(dLat, dLng) < 3.6);
    }
  }
});

test('tärkein joki saa paksuimman viivan', () => {
  assert.ok(PALLON_UOMA_AST[1] > PALLON_UOMA_AST[2]);
  assert.ok(PALLON_UOMA_AST[2] > PALLON_UOMA_AST[3]);
  assert.ok(PALLON_PENGER_AST[1] > PALLON_UOMA_AST[1]);
  assert.equal(PALLON_PENGER_AST[3], undefined);
  const luokat = new Map(MAAILMANKARTAN_NIMET.joet.map((j) => [j.avain, j.tarkeys]));
  const uomat = tulos.polut.filter((d) => d.avain.startsWith('uoma:'));
  const paksuin = Math.max(...uomat.map((d) => d.paksuus));
  for (const d of uomat) {
    const luokka = luokat.get(d.nimi) ?? 3;
    assert.equal(d.paksuus, PALLON_UOMA_AST[luokka]);
    if (luokka === 1) assert.equal(d.paksuus, paksuin);
    assert.equal(d.katko, 0);
  }
  // Penger on olemassa vain luokille 1–2.
  for (const d of tulos.polut.filter((x) => x.avain.startsWith('penger:'))) {
    assert.ok((luokat.get(d.nimi) ?? 3) <= 2);
  }
});

test('nimiä on katon verran ja vain tärkeimmistä joista', () => {
  assert.equal(tulos.nimet.length, VESINIMIEN_KATTO);
  const avaimet = new Set(tulos.nimet.map((n) => n.avain));
  assert.equal(avaimet.size, tulos.nimet.length);
  for (const n of tulos.nimet) {
    assert.ok(n.tarkeys <= 2);
    assert.equal(n.laji, 'linssi');
    assert.ok(n.teksti.length > 0);
  }
});

test('puuttuva aineisto ei kaada muunnosta', () => {
  const tyhja = vesistotPallolle(null, asteet);
  assert.deepEqual(tyhja, { polut: [], polygonit: [], nimet: [] });
});
