/*
 * BLUE MARBLE -KUUKAUSIPINNAN LAATAT (tools/tee-bmng-laatat.mjs, ISS-realismi 4a).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mercLat, osanAlue, osanLaatat, laskeLaatta, OSAT } from '../tools/tee-bmng-laatat.mjs';

const sharp = await import('sharp').then((m) => m.default).catch(() => null);

test('Mercator: päiväntasaaja on laattaraja ja reuna 85,05°', () => {
  assert.equal(mercLat(3, 4), 0);
  assert.ok(Math.abs(mercLat(0, 0) - 85.0511) < 1e-3);
});

test('osat kattavat tasot 4–7 tasan ilman päällekkäisyyttä', () => {
  for (const z of [4, 7]) {
    const kaikki = new Set();
    for (const o of OSAT) for (const [x, y] of osanLaatat(o, z)) kaikki.add(`${x}/${y}`);
    assert.equal(kaikki.size, 4 ** z);
  }
  assert.deepEqual(osanAlue('C2'), { lon0: 0, lat0: 0, aste: 90 });
  assert.deepEqual(osanLaatat('A1', 2), [[0, 0], [0, 1]]);
});

test('laatta ottaa rivinsä leveysasteen mukaan (Mercator), ei tasavälein', { skip: sharp ? false : 'sharp puuttuu' }, async () => {
  // Lähde: koko maailma 720 × 360 (0,5°/px); punainen = leveysaste + 90 (0…180).
  const w = 720; const h = 360; const raw = Buffer.alloc(w * h * 3);
  for (let r = 0; r < h; r += 1) for (let c = 0; c < w; c += 1) raw[(r * w + c) * 3] = Math.round(90 - (r + 0.5) / 2 + 90);
  const lahde = { raw, leveys: w, korkeus: h, lon0: -180, lat0: 90, pxAste: 2 };
  const jpg = await laskeLaatta(sharp, lahde, 1, 1, 0, 100);
  const { data } = await sharp(jpg).raw().toBuffer({ resolveWithObject: true });
  for (const j of [10, 128, 245]) {
    const odotettu = mercLat(1, (j + 0.5) / 256) + 90;
    assert.ok(Math.abs(data[(j * 256 + 128) * 3] - odotettu) <= 3, `rivi ${j}: ${data[(j * 256 + 128) * 3]} vs ${odotettu}`);
  }
});
