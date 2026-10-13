// Mapterhorn-lähde maastolaatoille (Karttaseppä 12.10.2026, vuoristokerros).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { mapterhornLahde, mercatorLaatta, puraRaaka } from '../tools/maasto/mapterhorn.mjs';
import { kerroksenKuvaus, lueAsetukset } from '../tools/maasto/tee-maasto.mjs';

const raaka = (f) => {
  const b = Buffer.alloc(512 * 512 * 2);
  for (let j = 0; j < 512; j += 1) for (let i = 0; i < 512; i += 1) {
    const h = f(i, j);
    b.writeUInt16LE(Number.isNaN(h) ? 0 : Math.round((h + 1000) * 10), (j * 512 + i) * 2);
  }
  return gzipSync(b);
};

test('mercatorLaatta: Interlaken z6 = (33, 22)', () => {
  const [x, y] = mercatorLaatta(7.86, 46.69, 6);
  assert.equal(Math.floor(x), 33);
  assert.equal(Math.floor(y), 22);
});

test('puraRaaka: dm-koodaus ja tyhjä pikseli', () => {
  const h = puraRaaka(raaka((i) => (i === 0 ? NaN : 1234.5)));
  assert.ok(Number.isNaN(h[0]));
  assert.equal(h[1], 1234.5);
});

test('mapterhornLahde: oma data, varalähde laatan ulkopuolella', () => {
  const k = mkdtempSync(join(tmpdir(), 'mh-'));
  const z = 14;
  const [fx, fy] = mercatorLaatta(7.96, 46.55, z);
  mkdirSync(join(k, String(z)));
  writeFileSync(join(k, String(z), `${Math.floor(fx)}_${Math.floor(fy)}.u16.gz`), raaka(() => 2000));
  const vara = { korkeus: () => 77, onRuutu: () => true, ruutuja: 1, asetaLru() {}, sulje() {} };
  const L = mapterhornLahde(k, { z, vara });
  assert.equal(L.laattoja, 1);
  // Laatan keskeltä oma arvo, kaukaa varalähde.
  const lon = ((Math.floor(fx) + 0.5) / 2 ** z) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * (Math.floor(fy) + 0.5)) / 2 ** z;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  assert.ok(Math.abs(L.korkeus(lon, lat, 0.0001) - 2000) < 0.01);
  assert.equal(L.korkeus(10, 50, 0.0001), 77);
  assert.equal(L.onOma(10, 50), false);
});

test('kerroksenKuvaus: vanhempi → parentUrl ja tyhjät matalat tasot', () => {
  const k = kerroksenKuvaus({ tasot: [13, 14], alue: [7.9, 46.5, 7.95, 46.55], versio: 'testi', vanhempi: '../2026-09-24-maailma/' });
  assert.equal(k.parentUrl, '../2026-09-24-maailma/');
  assert.equal(k.available.length, 15);
  assert.deepEqual(k.available.slice(0, 13), new Array(13).fill([]));
  assert.ok(k.available[13].length > 0);
  const a = lueAsetukset(['--mapterhorn', '/x', '--vanhempi', '../p/']);
  assert.equal(a.mapterhornKansio, '/x');
  assert.equal(a.vanhempi, '../p/');
});

test('laattalista: luku, saatavuus ja osajako', async () => {
  const { lueLaattalista, saatavuusListasta, listanLaatatJarjestyksessa } = await import('../tools/maasto/tee-maasto.mjs');
  const m = lueLaattalista('13 10 5\n13 11 5\n13 10 6\n13 11 6\n14 40 20\nroskaa\n');
  assert.deepEqual([...m.keys()], [13, 14]);
  assert.deepEqual(saatavuusListasta(m.get(13)), [{ startX: 10, startY: 5, endX: 11, endY: 6 }]);
  assert.deepEqual(saatavuusListasta([[1, 1], [3, 1], [1, 2]]), [{ startX: 1, startY: 1, endX: 1, endY: 2 }, { startX: 3, startY: 1, endX: 3, endY: 1 }]);
  const kaikki = [...listanLaatatJarjestyksessa(m.get(13), 13, 0, 1)];
  assert.equal(kaikki.length, 4);
  const osat = [0, 1].map((o) => [...listanLaatatJarjestyksessa(m.get(13), 13, o, 2)].length);
  assert.equal(osat[0] + osat[1], 4);
});

test('ruudukkoTasolle: --naytetaso 15 antaa kaikille tasoille saman näytevälin (LS2:n pilotti 3, porras)', async () => {
  const { ruudukkoTasolle, laatanAlue } = await import('../tools/maasto/tee-maasto.mjs');
  assert.equal(ruudukkoTasolle(65, 15, 15), 65);
  assert.equal(ruudukkoTasolle(65, 14, 15), 129);
  assert.equal(ruudukkoTasolle(65, 13, 15), 257);
  assert.equal(ruudukkoTasolle(65, 12, 15), 513);
  assert.equal(ruudukkoTasolle(65, 13, null), 65);
  assert.equal(ruudukkoTasolle(65, 10, 15), 2049);
  assert.equal(ruudukkoTasolle(65, 9, 15), 2049);
  for (const z of [12, 13, 14, 15]) {
    const a = laatanAlue(z, 0, 0);
    assert.ok(Math.abs((a.east - a.west) / (ruudukkoTasolle(65, z, 15) - 1) - 180 / 2 ** 15 / 64) < 1e-12);
  }
  assert.equal(lueAsetukset(['--naytetaso', '15']).naytetaso, 15);
  assert.equal(lueAsetukset([]).naytetaso, null);
});

test('teeLaatta: ruudukko 513 (z12 tasan näyttein) ei kaadu pinon ylitykseen', async () => {
  const { teeLaatta } = await import('../tools/maasto/tee-maasto.mjs');
  const dem = { korkeus: (lon, lat) => 800 + 700 * Math.sin(lon * 900) * Math.cos(lat * 700) };
  const l = teeLaatta(dem, 12, 4256, 3461, 513);
  assert.ok(l.pisteita > 4 && l.hMax > 800 && l.hMax <= 1500);
});

test('ruudukonNormaalit: vierekkäisten laattojen rajalla sama normaali (LS2:n Lauterbrunnenin varjostussauma)', async () => {
  const { ruudukonNormaalit, laatanAlue } = await import('../tools/maasto/tee-maasto.mjs');
  const dem = { korkeus: (lon, lat) => 1500 + 900 * Math.sin(lon * 600) + 500 * Math.cos(lat * 450) };
  const n = 65;
  const normaalit = (x) => {
    const a = laatanAlue(14, x, 12456); const vali = (a.east - a.west) / (n - 1);
    const h = new Float32Array(n * n);
    for (let j = 0; j < n; j += 1) for (let i = 0; i < n; i += 1) h[j * n + i] = dem.korkeus(a.west + i * vali, a.north - j * vali);
    return ruudukonNormaalit(dem, a, n, vali, h);
  };
  const A = normaalit(17100); const B = normaalit(17101);
  for (let j = 0; j < n; j += 1) {
    const p = A[j * n + n - 1]; const q = B[j * n];
    assert.ok(Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 1e-3, `rivi ${j}`);
  }
  // Tasainen maa: normaali = ylöspäin (ellipsoidin normaali).
  const tasainen = { korkeus: () => 100 };
  const a = laatanAlue(14, 17100, 12456); const vali = (a.east - a.west) / (n - 1);
  const N = ruudukonNormaalit(tasainen, a, n, vali, new Float32Array(n * n).fill(100))[0];
  const lat = a.north * Math.PI / 180; const lon = a.west * Math.PI / 180;
  const U = [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
  assert.ok(Math.hypot(N[0] - U[0], N[1] - U[1], N[2] - U[2]) < 1e-9);
});

test('koodaaLaatta: pisteNormaalit kirjoitetaan sellaisenaan (oktaedrikoodattuna)', async () => {
  const { koodaaLaatta, oktaKoodi } = await import('../tools/maasto/quantized-mesh.mjs');
  const alue = { west: 7, south: 46, east: 7.01, north: 46.01 };
  const pisteet = [[0, 0, 100], [1, 0, 120], [1, 1, 140], [0, 1, 110]];
  const kolmiot = [[0, 1, 2], [0, 2, 3]];
  const v = [0.6, 0, 0.8];
  const b = koodaaLaatta({ alue, pisteet, kolmiot, pisteNormaalit: pisteet.map(() => v) });
  const [x, y] = oktaKoodi(v);
  for (let i = 0; i < 4; i += 1) { assert.equal(b[b.length - 8 + 2 * i], x); assert.equal(b[b.length - 7 + 2 * i], y); }
});

test('korostusvara: otsakkeen maxHeight = K × max(h), korkeudet säilyvät ~0,1 m:n tarkkuudella, muu laatta tavulleen', async () => {
  const { koodaaLaatta, puraLaatta, korostusvara } = await import('../tools/maasto/quantized-mesh.mjs');
  const alue = { west: 7, south: 62, east: 7.01, north: 62.01 };
  const pisteet = [[0, 0, 0], [1, 0, 1200], [1, 1, 2400], [0, 1, 300], [0.5, 0.5, 1777]];
  const kolmiot = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
  const raaka = koodaaLaatta({ alue, pisteet, kolmiot });
  const uusi = korostusvara(raaka, 2);
  assert.equal(uusi.length, raaka.length);
  assert.equal(uusi.readFloatLE(28), 4800);
  const a = puraLaatta(raaka); const b = puraLaatta(uusi);
  const korkeudet = (buf, L) => { const mn = buf.readFloatLE(24); const mx = buf.readFloatLE(28); return L.pisteet.map((p) => mn + (p[2] / 32767) * (mx - mn)); };
  const ka = korkeudet(raaka, a); const kb = korkeudet(uusi, b);
  ka.forEach((v, i) => assert.ok(Math.abs(v - kb[i]) < 0.15, `piste ${i}: ${v} vs ${kb[i]}`));
  assert.deepEqual(a.kolmiot, b.kolmiot);
  assert.deepEqual(a.reunat, b.reunat);
  assert.deepEqual(a.pisteet.map((p) => [p[0], p[1]]), b.pisteet.map((p) => [p[0], p[1]]));
  const n = raaka.readUInt32LE(88); const loppuOsa = 92 + 6 * n;   // korkeuksien jälkeen: kolmiot, reunat, normaalit
  assert.ok(raaka.subarray(loppuOsa).equals(uusi.subarray(loppuOsa)));
  assert.ok(raaka.subarray(0, 24).equals(uusi.subarray(0, 24)) && raaka.subarray(32, 92 + 4 * n).equals(uusi.subarray(32, 92 + 4 * n)));
  // Meri tai negatiivinen maksimi: ei muutosta.
  const meri = koodaaLaatta({ alue, pisteet: pisteet.map(([u, v]) => [u, v, -5]), kolmiot });
  assert.ok(korostusvara(meri, 2).equals(meri));
});
