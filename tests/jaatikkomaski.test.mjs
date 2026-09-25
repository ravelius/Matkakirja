/*
 * Jäätikkömaski ja tundrasävy (Fablen päätös 19.9.2026, suunnitelma
 * docs/raportit/viesti-fable-maajaa-suunnitelma-20260919.md).
 * Rasterointi ja pehmennys ovat puhtaita funktioita; verkkohakua ei tehdä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { rasteroi, pehmenna } from '../tools/jaatikkomaski.mjs';
import {
  jaapaino, tundrapaino, JAA, TUNDRA, TUNDRAN_VARI,
} from '../tools/reliefivarit.mjs';

const HILA = { ruutu: 1, lat0: 60, rivit: 20, leveys: 361 };
const solu = (m, lon, lat) => m[(lat - HILA.lat0) * HILA.leveys + (lon + 180)];

test('rasterointi täyttää neliön ja jättää reiän tyhjäksi', () => {
  const ulko = [[0, 62], [10, 62], [10, 72], [0, 72], [0, 62]];
  const reika = [[4, 66], [6, 66], [6, 68], [4, 68], [4, 66]];
  const m = rasteroi([[ulko, reika]], HILA);
  assert.equal(solu(m, 2, 64), 255, 'neliön sisällä');
  assert.equal(solu(m, 5, 67), 0, 'reiän sisällä');
  assert.equal(solu(m, 20, 64), 0, 'neliön ulkopuolella');
  assert.equal(solu(m, 2, 75), 0, 'neliön pohjoispuolella');
});

test('pehmennys liukuu reunan yli ja säilyttää sisuksen', () => {
  const m = rasteroi([[[[0, 62], [10, 62], [10, 72], [0, 72], [0, 62]]]], HILA);
  const p = pehmenna(m, HILA.leveys, HILA.rivit, 2);
  assert.equal(solu(p, 5, 67), 255, 'keskellä täysi');
  const reuna = solu(p, 11, 67);
  assert.ok(reuna > 0 && reuna < 255, `reunan ulkopuoli liukuu (${reuna})`);
  assert.equal(solu(p, 20, 67), 0, 'kaukana nolla');
});

test('pohjoisen maajää tulee maskista, etelä ja meri ennallaan', () => {
  assert.equal(jaapaino(75, 100, 0), 0, 'tundra ei ole jäätä');
  assert.ok(Math.abs(jaapaino(75, 100, 1) - JAA.maaKatto) < 1e-9, 'jäätikkö on jäätä');
  // Ilman maskia (null) vanha leveysastesääntö — etelä käyttää sitä aina.
  assert.ok(Math.abs(jaapaino(-80, 2500, 0) - JAA.maaKatto) < 1e-9, 'Etelämanner ei riipu maskista');
  assert.ok(Math.abs(jaapaino(80, 100) - JAA.maaKatto) < 1e-9);
  // Merijää ei riipu maskista.
  assert.equal(jaapaino(89, -4000, 0), jaapaino(89, -4000));
});

test('tundrasävy: vain pohjoisen maalla, jäätikön ulkopuolella, katto 0,35', () => {
  assert.equal(tundrapaino(60, 100), 0, 'etelämpänä ei tundraa');
  assert.ok(Math.abs(tundrapaino(80, 100, 0) - TUNDRA.katto) < 1e-9);
  assert.equal(tundrapaino(80, 100, 1), 0, 'jäätikön päällä ei tundraa');
  assert.equal(tundrapaino(80, -100, 0), 0, 'merellä ei tundraa');
  assert.equal(tundrapaino(-80, 100, 0), 0, 'etelässä ei tundraa');
  assert.deepEqual(TUNDRAN_VARI, [150, 145, 125]);
});
