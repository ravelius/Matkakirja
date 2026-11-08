/*
 * KOHOKARTAN 3D-MERENPOHJA (tools/maasto/raakahila.mjs, tee-maasto.mjs --raaka/--korostus, Karttaseppä 8.11.2026):
 * koko maailman int16-hila DEM-lähteenä, merilaatat tehdään ja otsakkeen korostusvara myös alaspäin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

import { hilaLahde, raakaHila, valitseTaso } from '../tools/maasto/raakahila.mjs';
import { koodaaLaatta, korostusvara, puraLaatta } from '../tools/maasto/quantized-mesh.mjs';
import { aja } from '../tools/maasto/tee-maasto.mjs';

/** Pieni maailma: res 1°, 180 × 360, arvo = f(rivi, sarake) metreinä, jakaja 2; tasot 1 ja 2 (2 × 2 keskiarvo). */
function teeMaailma(kansio, f) {
  const R = 180; const C = 360;
  const L1 = new Int16Array(R * C);
  for (let r = 0; r < R; r += 1) for (let c = 0; c < C; c += 1) L1[r * C + c] = Math.round(f(r, c) * 2);
  const L2 = new Int16Array((R / 2) * (C / 2));
  for (let r = 0; r < R / 2; r += 1) {
    for (let c = 0; c < C / 2; c += 1) {
      L2[r * (C / 2) + c] = Math.round((L1[2 * r * C + 2 * c] + L1[2 * r * C + 2 * c + 1] + L1[(2 * r + 1) * C + 2 * c] + L1[(2 * r + 1) * C + 2 * c + 1]) / 4);
    }
  }
  writeFileSync(join(kansio, 'h-L1.i16'), Buffer.from(L1.buffer));
  writeFileSync(join(kansio, 'h-L2.i16'), Buffer.from(L2.buffer));
  const meta = {
    latN: 90, lonW: -180, res: 1, rivit: R, sarakkeet: C, kierto: true,
    tasot: [{ kerroin: 1, polku: 'h-L1.i16', rivit: R, sarakkeet: C }, { kerroin: 2, polku: 'h-L2.i16', rivit: R / 2, sarakkeet: C / 2 }],
  };
  writeFileSync(join(kansio, 'h.json'), JSON.stringify(meta));
  return join(kansio, 'h.json');
}

test('valitseTaso: karkein taso, jonka pikseli ≤ näyteväli; hienoin, jos väli on pikseliä pienempi', () => {
  const tasot = [{ kerroin: 1 }, { kerroin: 2 }, { kerroin: 4 }];
  assert.equal(valitseTaso(tasot, 1, 0.5).kerroin, 1);
  assert.equal(valitseTaso(tasot, 1, 2).kerroin, 2);
  assert.equal(valitseTaso(tasot, 1, 3.9).kerroin, 2);
  assert.equal(valitseTaso(tasot, 1, 100).kerroin, 4);
});

test('hilaLahde: pikselin keskipiste antaa solun arvon, välissä bilineaarinen, pituusaste kiertää 180°:n yli', () => {
  const meta = { latN: 90, lonW: -180, res: 1, rivit: 180, sarakkeet: 360, tasot: [{ kerroin: 1, rivit: 180, sarakkeet: 360 }] };
  const f = (r, c) => 2 * (r * 1000 + c);   // jakaja 2 → metreinä r·1000 + c
  const dem = hilaLahde(meta, () => f);
  assert.equal(dem.korkeus(-179.5, 89.5, 0.5), 0);
  assert.equal(dem.korkeus(-178.5, 88.5, 0.5), 1001);
  assert.equal(dem.korkeus(-179, 89.5, 0.5), 0.5);
  // Itäreuna: sarake 359 ja 0 sekoittuvat (kierto), ei leikkausta.
  assert.equal(dem.korkeus(180, 89.5, 0.5), (359 + 0) / 2);
  assert.equal(dem.onRuutu(-89, 179), true);
});

test('raakaHila: levyltä luettu (myös lohkorajan yli) = muistissa, karkea taso näyteväliltä', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'raakahila-'));
  try {
    const f = (r, c) => (r - 90) * 50 + Math.sin(c / 7) * 300;
    const polku = teeMaailma(kansio, f);
    const levy = raakaHila(polku, { lohko: 16, kokonaanAlle: 0 });
    const muisti = raakaHila(polku);
    for (const [lon, lat] of [[-179.5, 89.5], [-164.1, 73.2], [0, 0], [179.9, -89.9], [12.34, -45.6], [-0.01, 15.99]]) {
      assert.equal(levy.korkeus(lon, lat, 0.5), muisti.korkeus(lon, lat, 0.5));
      assert.equal(levy.korkeus(lon, lat, 2), muisti.korkeus(lon, lat, 2));
    }
    const odotus = Math.round(f(10, 20) * 2) / 2;
    assert.equal(levy.korkeus(-180 + 20.5, 90 - 10.5, 0.5), odotus);
    // Väli 2° lukee tason 2 (2 × 2 keskiarvo).
    const L2 = Math.round((Math.round(f(10, 20) * 2) + Math.round(f(10, 21) * 2) + Math.round(f(11, 20) * 2) + Math.round(f(11, 21) * 2)) / 4) / 2;
    assert.equal(levy.korkeus(-180 + 21, 90 - 11, 2), L2);
    levy.sulje(); muisti.sulje();
  } finally { rmSync(kansio, { recursive: true, force: true }); }
});

test('korostusvara alas: min(h) < 0 → minHeight K × min, max ennallaan K × max; ilman alas-lippua min ei muutu', () => {
  const alue = { west: -66, south: 18, east: -65.9, north: 18.1 };
  const pisteet = [[0, 0, -8000], [1, 0, 500], [1, 1, -2000], [0, 1, 0], [0.5, 0.5, -4321]];
  const kolmiot = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
  const raaka = koodaaLaatta({ alue, pisteet, kolmiot });
  const vanha = korostusvara(raaka, 15);
  assert.equal(vanha.readFloatLE(24), -8000);
  assert.equal(vanha.readFloatLE(28), 7500);
  const uusi = korostusvara(raaka, 15, { alas: true });
  assert.equal(uusi.readFloatLE(24), -120000);
  assert.equal(uusi.readFloatLE(28), 7500);
  const a = puraLaatta(raaka); const b = puraLaatta(uusi);
  const korkeudet = (buf, L) => { const mn = buf.readFloatLE(24); const mx = buf.readFloatLE(28); return L.pisteet.map((p) => mn + (p[2] / 32767) * (mx - mn)); };
  const ka = korkeudet(raaka, a); const kb = korkeudet(uusi, b);
  ka.forEach((v, i) => assert.ok(Math.abs(v - kb[i]) < 4, `piste ${i}: ${v} vs ${kb[i]}`));
  assert.deepEqual(a.kolmiot, b.kolmiot);
  // Pelkkä merenpohja (max < 0): alas-lipulla min muuttuu, max ei.
  const meri = koodaaLaatta({ alue, pisteet: pisteet.map(([u, v, h]) => [u, v, Math.min(h, -10)]), kolmiot });
  const m2 = korostusvara(meri, 15, { alas: true });
  assert.equal(m2.readFloatLE(24), -120000);
  assert.equal(m2.readFloatLE(28), meri.readFloatLE(28));
});

test('aja --raaka: kaikki laatat tehdään (myös meri), korostusvara poltossa molempiin suuntiin, layer.json kattaa maailman', async () => {
  const kansio = mkdtempSync(join(tmpdir(), 'raakahila-aja-'));
  try {
    // Pohjoinen pallonpuolisko maata (+1000 m), eteläinen merta (−4000 m).
    const polku = teeMaailma(kansio, (r) => (r < 90 ? 1000 : -4000));
    const ulos = join(kansio, 'ulos');
    const loki = [];
    const maarat = await aja(['--raaka', polku, '--ulos', ulos, '--tasot', '0-2', '--maailma', '2', '--alue', '-180,-90,180,90',
      '--vain-maa-alkaen', '1', '--korostus', '15', '--korostus-alas', '--dem-normaalit'], (s) => loki.push(s));
    assert.deepEqual(maarat, { 0: 2, 1: 8, 2: 32 });
    const otsake = (z, x, y) => gunzipSync(readFileSync(join(ulos, String(z), String(x), `${y}.terrain`)));
    const etela = otsake(2, 3, 0); const pohjoinen = otsake(2, 3, 3);
    assert.ok(Math.abs(etela.readFloatLE(24) - -60000) < 1, String(etela.readFloatLE(24)));
    // Tasainen laatta: kooderi asettaa max = min + 1 (quantized-mesh.mjs), joten 15 × 1001.
    assert.ok(Math.abs(pohjoinen.readFloatLE(28) - 15015) < 1, String(pohjoinen.readFloatLE(28)));
    await aja(['--raaka', polku, '--ulos', ulos, '--tasot', '0-2', '--maailma', '2', '--alue', '-180,-90,180,90', '--vain-maa-alkaen', '1', '--luettelo'], () => {});
    const k = JSON.parse(readFileSync(join(ulos, 'layer.json'), 'utf8'));
    assert.deepEqual(k.available[2], [{ startX: 0, startY: 0, endX: 7, endY: 3 }]);
    assert.match(k.attribution, /ETOPO 2022/);
  } finally { rmSync(kansio, { recursive: true, force: true }); }
});
