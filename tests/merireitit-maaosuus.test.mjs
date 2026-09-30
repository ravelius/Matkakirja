/*
 * MERIREITTIEN MAAOSUUDET (Euroopan laatukierros 27.9.2026, N1, Fablen
 * päätös a): kaupungista satamaan kulkeva osuus maareitin tyylillä, vain
 * reitin päissä ja vain annetuissa (Euroopan) kaupungeissa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { merenPistetesti, reitinMaaosuudet } from '../tools/fokuskartta/merireitit.mjs';

// Meri = kaikki paitsi kaksi "mannerta": x 0..10 ja x 20..30 (lon = x, lat = y).
const renkaat = [
  [[-180, -90], [-180, 90], [180, 90], [180, -90]],
  [[0, -5], [10, -5], [10, 5], [0, 5]],
  [[20, -5], [30, -5], [30, 5], [20, 5]],
  [[14, -1], [16, -1], [16, 1], [14, 1]], // saari keskellä reittiä
];
const id = (v) => v;

test('merenPistetesti: parillisuus', () => {
  const meri = merenPistetesti(renkaat);
  assert.equal(meri(5, 0), false);
  assert.equal(meri(12, 0), true);
  assert.equal(meri(15, 0), false);
  assert.equal(meri(40, 0), true);
});

test('reitinMaaosuudet: vain päät, saari keskellä jää katkoviivaksi', () => {
  const meri = merenPistetesti(renkaat);
  const poly = [[5, 0], [25, 0]];
  const o = reitinMaaosuudet(poly, id, id, meri, { askel: 0.1, lyhin: 0.5 });
  assert.equal(o.length, 2);
  assert.ok(Math.abs(o[0][0]) < 1e-9 && Math.abs(o[0][1] - 0.25) < 0.01, JSON.stringify(o));
  assert.ok(Math.abs(o[1][0] - 0.75) < 0.01 && Math.abs(o[1][1] - 1) < 1e-9, JSON.stringify(o));
  const vainAlku = reitinMaaosuudet(poly, id, id, meri, { askel: 0.1, paa: ([x]) => x < 10 });
  assert.equal(vainAlku.length, 1);
  assert.equal(vainAlku[0][0], 0);
});
