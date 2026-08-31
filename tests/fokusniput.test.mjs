/*
 * ESITYSSIIRTO — KAUPUNGIN YMPÄRILLE, ILMAN SIIRTOVIIVOJA.
 *
 * === MISTÄ TÄMÄ TESTI SYNTYI ===
 *
 * Omistajan kysymyskortti 31.8.2026, sanatarkasti: *"pystyisitkö osan
 * nostoista vain viemään hieman kaupungin viereen puhtaasti omaksi
 * nostokseen ilman siirtoviivoja … tähän pitäis keksiä joku
 * tyylikkäämpi ratkaisu."* Samalla purettiin kategoria per kaupunki
 * -yhdistely (ent. js/fokusryhmat.js ja tests/fokusryhmat.test.mjs,
 * jonka tilalle tämä tuli): kartalla ei ole enää pilkkulistanimiöitä.
 *
 * === MITÄ TÄMÄ VARTIOI ===
 *
 * Kasauspassi (js/fokusniput.js niputaFokusmerkit) on POLTON EHDON
 * alainen: laattageneraattori ajaa sen selaimen ulkopuolella
 * (tools/fokuskartta/nostot.mjs), joten sen on oltava puhdas funktio
 * laudan datasta — sama lauta, sama tulos, joka laitteella ja Nodessa.
 * Testi ajaa passin samalla tyngällä kuin generaattori ja tarkistaa
 * neljä asiaa: ladotaanko molemmin puolin, pysyykö data koskemattomana,
 * onko tulos deterministinen ja jääkö merkkien väliin tilaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { niputaFokusmerkit, nippuLaattaEsteet } from '../js/fokusniput.js';

/** Lehden perustason vakiomitta (js/nostoladonta.js NOSTOLADONTA_S). */
const S = 0.6;

/** Kaupunki keskellä ja n merkkiä täsmälleen sen päällä. */
function tynka(n, kaupunki = { id: 'kaupunki', x: 1000, y: 1000 }) {
  const ryhmat = [];
  for (let i = 0; i < n; i += 1) {
    // Kaikki laatan kiekon sisällä mutta eri pisteissä, jotta jonon
    // järjestys on määrätty merkkien omista koordinaateista.
    ryhmat.push({
      id: `merkki-${i}`,
      x: kaupunki.x + (i % 2 ? 0.4 : -0.4),
      y: kaupunki.y + i * 0.1,
    });
  }
  return {
    fokusmoodi: true,
    katselu: false,
    kiertoKohdat: (x) => [x],
    fokuskohdeKaupungit: [kaupunki],
    fokuskohdeRyhmat: ryhmat,
  };
}

test('rypäs latoutuu kaupungin molemmin puolin, ei yhdelle kyljelle', () => {
  const ui = tynka(6);
  niputaFokusmerkit(ui, S);
  const oikealla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x > 1000);
  const vasemmalla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x < 1000);
  assert.equal(oikealla.length, 3);
  assert.equal(vasemmalla.length, 3);
  // Sarakkeita on täsmälleen kaksi: jokainen x on toinen niistä.
  assert.equal(new Set(ui.fokuskohdeRyhmat.map((r) => r.nippu.x)).size, 2);
});

test('pariton rypäs jakautuu tasan yhden merkin tarkkuudella', () => {
  for (const n of [1, 3, 5, 7, 9]) {
    const ui = tynka(n);
    niputaFokusmerkit(ui, S);
    const oikealla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x > 1000).length;
    assert.equal(oikealla, Math.ceil(n / 2), `n=${n}`);
  }
});

test('yksinäinen merkki istuu kaupungin oikealle puolelle samalle korkeudelle', () => {
  const ui = tynka(1);
  niputaFokusmerkit(ui, S);
  const [r] = ui.fokuskohdeRyhmat;
  assert.ok(r.nippu.x > 1000, 'oikealle');
  assert.equal(r.nippu.y, 1000, 'kaupungin korkeudelle');
  assert.equal(r.nippuPuoli, false, 'nimiö oikealle');
});

test('vasemman sarakkeen merkki toivoo nimiötään vasemmalle', () => {
  const ui = tynka(4);
  niputaFokusmerkit(ui, S);
  for (const r of ui.fokuskohdeRyhmat) {
    assert.equal(r.nippuPuoli, r.nippu.x < 1000, r.id);
  }
});

test('merkkien aluslaatat eivät mene päällekkäin edes kymmenen ryppäässä', () => {
  const ui = tynka(10);
  niputaFokusmerkit(ui, S);
  const paikat = ui.fokuskohdeRyhmat.map((r) => r.nippu);
  // Aluslaatan säde on 5,6 perustason pikseliä (NIPPU_KOHDE_R), joten
  // kahden merkin keskipisteiden on oltava vähintään sen kaksinkertaa
  // etäisyydellä toisistaan laudan yksiköissä.
  const vahin = 2 * 5.6 * S;
  for (let i = 0; i < paikat.length; i += 1) {
    for (let j = i + 1; j < paikat.length; j += 1) {
      const e = Math.hypot(paikat[i].x - paikat[j].x, paikat[i].y - paikat[j].y);
      assert.ok(e >= vahin - 1e-9, `${i}/${j} = ${e.toFixed(2)}`);
    }
  }
});

test('yksikään merkki ei jää kaupungin näkyvän kiekon päälle', () => {
  const ui = tynka(10);
  niputaFokusmerkit(ui, S);
  // Kiekon säde on 7,5 perustason pikseliä (NIPPU_KIEKKO_R).
  const raja = (7.5 + 5.6) * S;
  for (const r of ui.fokuskohdeRyhmat) {
    const e = Math.hypot(r.nippu.x - 1000, r.nippu.y - 1000);
    assert.ok(e >= raja - 1e-9, `${r.id} = ${e.toFixed(2)}`);
  }
});

test('kaukana oleva merkki jää omalle paikalleen', () => {
  const ui = tynka(1);
  ui.fokuskohdeRyhmat.push({ id: 'kaukainen', x: 1100, y: 1100 });
  niputaFokusmerkit(ui, S);
  assert.equal(ui.fokuskohdeRyhmat[1].nippu, null);
});

test('passi ei koske merkkien omiin koordinaatteihin (esitys, ei data)', () => {
  const ui = tynka(6);
  const ennen = ui.fokuskohdeRyhmat.map((r) => `${r.x}|${r.y}`);
  niputaFokusmerkit(ui, S);
  assert.deepEqual(ui.fokuskohdeRyhmat.map((r) => `${r.x}|${r.y}`), ennen);
});

test('sama lauta antaa saman ladonnan joka ajolla', () => {
  const asu = () => {
    const ui = tynka(9);
    niputaFokusmerkit(ui, S);
    return JSON.stringify(ui.fokuskohdeRyhmat.map((r) => [r.id, r.nippu, r.nippuPuoli]));
  };
  assert.equal(asu(), asu());
});

test('kaupungin laatta on nimiöväistön este', () => {
  const ui = tynka(2);
  const esteet = nippuLaattaEsteet(ui, S);
  assert.equal(esteet.length, 1);
  const [e] = esteet;
  assert.ok(e.x1 < 1000 && e.x2 > 1000 && e.y1 < 1000 && e.y2 > 1000);
});

test('ilman kaupunkeja mikään ei siirry', () => {
  const ui = tynka(4);
  ui.fokuskohdeKaupungit = [];
  ui.game = null;
  niputaFokusmerkit(ui, S);
  assert.ok(ui.fokuskohdeRyhmat.every((r) => r.nippu === null));
});
