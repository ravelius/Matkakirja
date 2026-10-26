// DELTASARJA (js/deltasarja.js, 29.9.2026): muuttumaton laatta perussarjasta.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { laattaMuuttunut, deltanKansio } from '../js/deltasarja.js';

/** Bittikartta annetuista indekseistä (sama koodaus kuin pyramidin laatasto). */
const kartta = (koko, bitit) => {
  const b = new Uint8Array(Math.ceil(koko / 8));
  for (const i of bitit) b[i >> 3] |= 1 << (i & 7);
  return Buffer.from(b).toString('base64');
};

test('bitti 1 = uusi kansio, bitti 0 = perussarja, puuttuva taso = kaikki uusia', () => {
  // taso 2: 4 × 4 ruutua; muuttuneet (sarake 1, rivi 0) ja (sarake 3, rivi 2).
  const delta = { perus: 'P', muuttuneet: { 2: kartta(16, [0 * 4 + 1, 2 * 4 + 3]), 0: null } };
  assert.equal(laattaMuuttunut(delta, 2, 1, 0, 4), true);
  assert.equal(laattaMuuttunut(delta, 2, 3, 2, 4), true);
  assert.equal(laattaMuuttunut(delta, 2, 0, 0, 4), false);
  assert.equal(laattaMuuttunut(delta, 2, 2, 3, 4), false);
  assert.equal(laattaMuuttunut(delta, 0, 0, 0, 1), true, 'null = koko taso uudessa kansiossa');
  assert.equal(laattaMuuttunut(delta, 5, 7, 7, 32), true, 'puuttuva taso = kaikki uusia');
  assert.equal(deltanKansio(delta, 'U', 2, 0, 0, 4), 'P');
  assert.equal(deltanKansio(delta, 'U', 2, 1, 0, 4), 'U');
  assert.equal(laattaMuuttunut(null, 2, 0, 0, 4), true, 'ei deltaa = kaikki uudesta kansiosta');
  assert.equal(laattaMuuttunut({ muuttuneet: {} }, 2, 0, 0, 4), true, 'ilman perusta ei ohjata minnekään');
});

test('pallon laatta: muuttumaton laatta perussarjan kansiosta, muuttunut omasta', async () => {
  const pallo = await import('../js/pallo.js');
  const ennen = pallo.pallonLaatta(1, 0, 1);
  assert.ok(ennen.includes(`/julisteet/pallo/laatat/${pallo.PALLO_LAATTAKANSIO}/1/1/0.jpg`));
  const luettelo = { tasot: { min: 0, max: 9 }, delta: { perus: 'PERUS-20260927', muuttuneet: { 1: kartta(4, [1]) } } };
  await pallo.laatatSaatavilla(async () => ({ ok: true, json: async () => luettelo }));
  // taso 1: 2 × 2; indeksi 1 = (sarake 1, rivi 0) muuttui.
  assert.ok(pallo.pallonLaatta(1, 0, 1).includes(`/${pallo.PALLO_LAATTAKANSIO}/1/1/0.jpg`));
  assert.ok(pallo.pallonLaatta(0, 1, 1).includes('/julisteet/pallo/laatat/PERUS-20260927/1/0/1.jpg'));
  // Tasolla ilman karttaa kaikki tulevat uudesta kansiosta.
  assert.ok(pallo.pallonLaatta(3, 2, 3).includes(`/${pallo.PALLO_LAATTAKANSIO}/3/3/2.jpg`));
});

test('pyramidi: pohja, viivat, joki ja ranta kulkevat saman deltaportin kautta', () => {
  const src = readFileSync(new URL('../js/laattapyramidi.js', import.meta.url), 'utf8');
  for (const kerros of ['luettelo.viivataso', 'luettelo.jokitaso', 'luettelo.rantataso', 'luettelo']) {
    assert.ok(src.includes(`kerroksenVersio(${kerros}, taso, sarake, rivi)`), kerros);
  }
  assert.match(src, /laattaMuuttunut\(d, taso\.z, sarake, rivi, taso\.sarakkeita\) \? kerros\.versio : d\.perus/);
});
