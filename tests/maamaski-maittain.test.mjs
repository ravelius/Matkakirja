// Maamaski maittain (tools/tee-maamaski-maittain.mjs, löydös 157): geometriaosat.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { yksinkertaista, leikkaaLaatikkoon, yhdistaLaatikot, teeMaskit } from '../tools/tee-maamaski-maittain.mjs';

test('Douglas–Peucker pitää päätepisteet ja kulmat, pudottaa suoran välipisteet', () => {
  const suora = Array.from({ length: 101 }, (_, i) => [i * 0.01, 0]);
  assert.deepEqual(yksinkertaista(suora, 0.001), [[0, 0], [1, 0]]);
  const kulma = [[0, 0], [0.5, 0.0001], [1, 0], [1, 1]];
  assert.equal(yksinkertaista(kulma, 0.001).length, 3);
  // Iso rengas ei kaada pinoa.
  const iso = Array.from({ length: 1_000_000 }, (_, i) => [Math.cos(i / 1e5), Math.sin(i / 1e5)]);
  assert.ok(yksinkertaista(iso, 0.001).length < 2000);
});

test('Sutherland–Hodgman leikkaa renkaan laatikkoon', () => {
  const nelio = [[-1, -1], [2, -1], [2, 2], [-1, 2]];
  const l = leikkaaLaatikkoon(nelio, [0, 0, 1, 1]);
  for (const [x, y] of l) assert.ok(x >= 0 && x <= 1 && y >= 0 && y <= 1);
  assert.equal(leikkaaLaatikkoon([[5, 5], [6, 5], [6, 6]], [0, 0, 1, 1]).length, 0);
});

test('päällekkäiset laatikot yhdistyvät, erilliset eivät', () => {
  assert.equal(yhdistaLaatikot([[0, 0, 1, 1], [0.5, 0.5, 2, 2], [5, 5, 6, 6]]).length, 2);
});

test('maski: maa laatikkoon leikattuna, järvi omana osanaan, puuttuva maa null', () => {
  const rengas = (w, s, e, n) => [[w, s], [e, s], [e, n], [w, n], [w, s]];
  const meri = { features: [{ geometry: { type: 'Polygon', coordinates: [rengas(-180, -90, 180, 90)] } },
    { geometry: { type: 'Polygon', coordinates: [rengas(20, 35, 30, 45)] } }] };
  const maat = { features: [{ properties: { ADM0_A3: 'GRC' }, geometry: { type: 'Polygon', coordinates: [rengas(22, 37, 24, 39)] } }] };
  const jarvet = { features: [{ geometry: { type: 'Polygon', coordinates: [rengas(22.5, 37.5, 22.6, 37.6)] } }] };
  const m = teeMaskit({ meri, maat, jarvet, isot: ['GRC', 'XXX'] });
  assert.equal(m.XXX, null);
  const [maa, jarvi] = m.GRC.features;
  assert.equal(maa.properties.osa, 'maa'); assert.equal(jarvi.properties.osa, 'jarvet');
  assert.equal(maa.geometry.coordinates.length, 1); assert.equal(jarvi.geometry.coordinates.length, 1);
  for (const [x, y] of maa.geometry.coordinates[0][0]) assert.ok(x >= 21.9 && x <= 24.1 && y >= 36.9 && y <= 39.1);
});
