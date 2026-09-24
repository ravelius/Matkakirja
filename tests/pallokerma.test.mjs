/*
 * Pallon kermahuntu natiiville (tools/tee-pallokerma.mjs): webin
 * laattakerma-shaderin sääntö poltettuna (24.9.2026).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  KERMA_PEITTO, alasnaytaTaso, kermanAlfa, maailmanPikseli, tasonLaatat, vanhemmat,
} from '../tools/tee-pallokerma.mjs';

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

test('alasnäyte: vanhemmat 2 × 2 -lapsista', () => {
  assert.deepEqual(vanhemmat([[16, 10], [17, 11], [18, 10]]), [[8, 5], [9, 5]]);
});

test('alasnäyte: Z4 Z5:stä, puuttuva lapsi läpinäkyvä, kerma säilyy vaaleana', async () => {
  const sharp = (await import('sharp')).default;
  const ulos = mkdtempSync(join(tmpdir(), 'kerma-alas-'));
  try {
    const kerma = await sharp({ create: { width: 256, height: 256, channels: 4, background: { r: 250, g: 244, b: 214, alpha: 0.8 } } }).webp({ quality: 90, alphaQuality: 90 }).toBuffer();
    mkdirSync(join(ulos, '5', '16'), { recursive: true });
    writeFileSync(join(ulos, '5', '16', '10.webp'), kerma);
    assert.equal(await alasnaytaTaso(sharp, ulos, 4), 1);
    assert.ok(existsSync(join(ulos, '4', '8', '5.webp')));
    const { data } = await sharp(join(ulos, '4', '8', '5.webp')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const px = (x, y) => [...data.subarray((y * 256 + x) * 4, (y * 256 + x) * 4 + 4)];
    const [r, g, b, a] = px(40, 40); // vasen yläneljännes = lapsi 16/10
    assert.ok(Math.abs(r - 250) <= 3 && Math.abs(g - 244) <= 3 && Math.abs(b - 214) <= 3, `väri ${r},${g},${b}`);
    assert.ok(Math.abs(a - 204) <= 3, `alfa ${a}`);
    assert.equal(px(200, 200)[3], 0); // puuttuva lapsi
  } finally { rmSync(ulos, { recursive: true, force: true }); }
});

test('alasnäyte: maan sarjassa laatikon ulkopuoliset lapset maailman sarjasta', async () => {
  const sharp = (await import('sharp')).default;
  const juuri = mkdtempSync(join(tmpdir(), 'kerma-vara-'));
  try {
    const kerma = await sharp({ create: { width: 256, height: 256, channels: 4, background: { r: 250, g: 244, b: 214, alpha: 0.8 } } }).webp().toBuffer();
    const maa = join(juuri, 'maa'); const maailma = join(juuri, 'maailma');
    // Laatikko osuu vain Z5-laattaan 16/10; sen naapuri 17/10 on laatikon ulkopuolella.
    const [x0, y0] = [16, 10]; const n = 2 ** 5;
    const lon = (x) => (x / n) * 360 - 180;
    const lat = (y) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
    const alue = [lon(x0) + 0.1, lat(y0 + 1) + 0.1, lon(x0 + 1) - 0.1, lat(y0) - 0.1];
    for (const [k, x] of [[maailma, 16], [maailma, 17]]) {
      mkdirSync(join(k, '5', String(x)), { recursive: true });
      writeFileSync(join(k, '5', String(x), '10.webp'), kerma);
    }
    // maa/5/16/10 puuttuu = oma maa reikä; 17/10 on laatikon ulkopuolella → maailmasta.
    assert.equal(await alasnaytaTaso(sharp, maa, 4, { alue, vara: maailma }), 1);
    const { data } = await sharp(join(maa, '4', '8', '5.webp')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(data[(40 * 256 + 40) * 4 + 3], 0); // reikä säilyy
    assert.ok(data[(40 * 256 + 200) * 4 + 3] > 190); // ulkopuoli maailmasta
  } finally { rmSync(juuri, { recursive: true, force: true }); }
});
