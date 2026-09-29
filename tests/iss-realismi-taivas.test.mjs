// ISS-realismi 4 (kuukauden pinta, Kuu, tähdet): laskenta natiivin (Linssiseppä 2, proto 48282222) mukaan.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  kuunSuunta, eciPalloon, eciKanta, tahdenKirkkaus, tahdenKoko, tahdenVari, maanVarjossa, mercatorLaatta, lahipala,
  taivasKerrokset, KUUKAUSI, TAHDET, KUU,
} from '../js/linssit/iss-realismi-taivas.js';
import { gmst } from '../js/linssit/iss-rata.js';

test('Kuu: Meeus esimerkki 47.a (1992-04-12 0h) noin 0,3°:n sisään', () => {
  const s = kuunSuunta(2448724.5);
  const ra = ((Math.atan2(s.y, s.x) * 180) / Math.PI + 360) % 360;
  const dec = (Math.asin(s.z) * 180) / Math.PI;
  assert.ok(Math.abs(ra - 134.688) < 0.3, `RA ${ra}`);
  assert.ok(Math.abs(dec - 13.768) < 0.3, `dec ${dec}`);
  assert.ok(Math.abs(s.km - 368410) < 500, `km ${s.km}`);
  assert.ok(Math.abs(Math.hypot(s.x, s.y, s.z) - 1) < 1e-9);
});

test('ECI → pallo: GMST-kierto ja Globe.gl-akselit (x = cos φ sin λ, y = sin φ, z = cos φ cos λ)', () => {
  const jd = 2460581.5;
  const g = gmst(jd);
  // Kevättasauspisteen suunta (ECI x) on pituudella −GMST.
  const [x, y, z] = eciPalloon([1, 0, 0], jd);
  const lon = Math.atan2(x, z);
  assert.ok(Math.abs(Math.atan2(Math.sin(lon + g), Math.cos(lon + g))) < 1e-9, 'pituus −GMST');
  assert.ok(Math.abs(y) < 1e-12);
  assert.deepEqual(eciPalloon([0, 0, 1], jd), [0, 1, 0], 'pohjoisnapa ylös');
  const k = eciKanta(jd);
  assert.deepEqual(k.z, [0, 1, 0]);
  assert.ok(Math.abs(k.x[0] * k.y[0] + k.x[2] * k.y[2]) < 1e-12, 'kanta suora');
});

test('Tähdet: koko, kirkkaus ja väri natiivin kaavoilla', () => {
  assert.equal(tahdenKirkkaus(1), 1);
  assert.equal(tahdenKirkkaus(6), 0.22, 'lattia');
  assert.equal(tahdenKirkkaus(-3), 2.5, 'katto');
  assert.ok(Math.abs(tahdenKirkkaus(3) - 0.398) < 0.001);
  assert.equal(tahdenKoko(-1.46), TAHDET.kokoMax);
  assert.equal(tahdenKoko(5.5), TAHDET.kokoMin);
  assert.deepEqual(tahdenVari(0), [1, 1, 1]);
  assert.deepEqual(tahdenVari(-0.3), [0.72, 0.8, 1]);
  assert.deepEqual(tahdenVari(1.6), [1, 0.72, 0.48]);
});

test('Maan varjo: sylinteri auringon vastapuolella', () => {
  const a = [1, 0, 0];
  assert.equal(maanVarjossa([-106, 0, 0], a, 100), true);
  assert.equal(maanVarjossa([106, 0, 0], a, 100), false);
  assert.equal(maanVarjossa([-106, 101, 0], a, 100), false, 'varjon ulkopuolella');
});

test('Kuukauden pinta: Web Mercator -laatat ja lähipala (x kiertyy, y rajattu)', () => {
  assert.deepEqual(mercatorLaatta(60.17, 24.94, 6), { x: 36, y: 18 });
  assert.deepEqual(mercatorLaatta(0, -180, 6), { x: 0, y: 32 });
  assert.deepEqual(mercatorLaatta(89, 179.99, 6), { x: 63, y: 0 });
  assert.deepEqual(lahipala({ x: 1, y: 30 }, 6, 8), { z: 6, n: 64, x0: 61, y0: 26, ruudut: 8 });
  assert.equal(lahipala({ x: 10, y: 1 }, 6, 8).y0, 0);
  assert.equal(lahipala({ x: 10, y: 63 }, 6, 8).y0, 56);
  assert.equal(KUUKAUSI.alfa, 0.75);
  assert.equal(KUU.kulma, 0.52);
});

test('Kerrokset: kuukausi, tähdet ja Kuu; tähdet korvaavat satunnaisen kentän vasta ladattuina', () => {
  const k = taivasKerrokset({ ikkuna: {} });
  assert.deepEqual(k.map((x) => x.nimi), ['kuukausi', 'tahdet', 'kuu']);
  assert.equal(k[1].korvaaTahdet(), false);
});
