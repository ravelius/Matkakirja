/*
 * Pallon kermahuntu natiiville (tools/tee-pallokerma.mjs): webin
 * laattakerma-shaderin sääntö poltettuna (24.9.2026).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { KERMA_PEITTO, kermanAlfa, maailmanPikseli, tasonLaatat } from '../tools/tee-pallokerma.mjs';

test('kerman alfa: meri läpinäkyvä, maa peitolla 0,80, oma maa reikä', () => {
  assert.equal(kermanAlfa(180, 170), 0); // meri: R − B pieni
  assert.equal(kermanAlfa(230, 170), Math.round(255 * KERMA_PEITTO)); // maa: R − B 60
  assert.equal(kermanAlfa(230, 170, 1), 0); // kohdemaan sisällä
  const puoli = kermanAlfa(214, 170); // ero 44 = välin puoliväli
  assert.ok(puoli > 90 && puoli < 115, String(puoli));
  assert.equal(KERMA_PEITTO, 0.8);
});

test('Mercator-pikseli ja laattalista', () => {
  const [x, y] = maailmanPikseli(0, 0, 1);
  assert.equal(x, 256); assert.ok(Math.abs(y - 256) < 1e-9);
  assert.equal(tasonLaatat(2).length, 16);
  assert.ok(tasonLaatat(5, [-5, 41, 10, 52]).length < 20);
});
