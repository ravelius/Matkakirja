/*
 * MAASTOLAATAT (tools/maasto/, Karttaseppä 23.9.2026): Copernicus GLO-30
 * → Cesiumin quantized-mesh natiivipelille. Ilman verkkoa ja ilman
 * oikeaa DEM:iä: GeoTIFF kirjoitetaan testissä samaan muotoon kuin
 * Copernicuksen COG (little-endian, float32, DEFLATE, prediktori 3,
 * ruudutettu), ja maasto tehdään keinotekoisesta korkeusfunktiosta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { deflateSync, gunzipSync } from 'node:zlib';

import { avaaGeotiff } from '../tools/maasto/geotiff.mjs';
import { rtinVerkko } from '../tools/maasto/rtin.mjs';
import { koodaaLaatta, puraLaatta } from '../tools/maasto/quantized-mesh.mjs';
import {
  janteenPainuma, kerroksenKuvaus, laatanAlue, tasonLaatat, teeLaatta, CESIUM_TASO0_VIRHE, LAHDEMAININTA,
} from '../tools/maasto/tee-maasto.mjs';

/** Pieni COG: w × h float32, ruutu r, prediktori 3, DEFLATE, lon0/lat1 ja askel. */
function teeTiff(w, h, r, arvo, { lon0 = 2, lat1 = 46, askel = 0.01 } = {}) {
  const sarakkeita = Math.ceil(w / r); const riveja = Math.ceil(h / r);
  const ruudut = [];
  for (let ry = 0; ry < riveja; ry += 1) {
    for (let rx = 0; rx < sarakkeita; rx += 1) {
      const b = Buffer.alloc(r * r * 4);
      const dv = new DataView(new ArrayBuffer(4));
      for (let y = 0; y < r; y += 1) {
        for (let x = 0; x < r; x += 1) {
          dv.setFloat32(0, arvo(Math.min(w - 1, rx * r + x), Math.min(h - 1, ry * r + y)), false);
          for (let k = 0; k < 4; k += 1) b[y * r * 4 + k * r + x] = dv.getUint8(k);
        }
        for (let i = r * 4 - 1; i > 0; i -= 1) b[y * r * 4 + i] = (b[y * r * 4 + i] - b[y * r * 4 + i - 1]) & 0xff;
      }
      ruudut.push(deflateSync(b));
    }
  }
  const tagit = [
    [256, 3, [w]], [257, 3, [h]], [258, 3, [32]], [259, 3, [8]], [317, 3, [3]],
    [322, 3, [r]], [323, 3, [r]], [324, 4, null], [325, 4, ruudut.map((x) => x.length)], [339, 3, [3]],
    [33550, 12, [askel, askel, 0]], [33922, 12, [0, 0, 0, lon0, lat1, 0]],
  ];
  const ifdKoko = 2 + tagit.length * 12 + 4;
  let o = 8 + ifdKoko;
  const lisa = [];
  const paikka = (tavut) => { const p = o; lisa.push(tavut); o += tavut.length; return p; };
  const arvot = (tyyppi, a) => {
    const koko = tyyppi === 12 ? 8 : tyyppi === 4 ? 4 : 2;
    const b = Buffer.alloc(koko * a.length);
    a.forEach((v, i) => (tyyppi === 12 ? b.writeDoubleLE(v, i * 8) : tyyppi === 4 ? b.writeUInt32LE(v, i * 4) : b.writeUInt16LE(v, i * 2)));
    return b;
  };
  const offsetit = [];
  let dataAlku = o + 0;
  const kentat = tagit.map(([tag, tyyppi, a]) => ({ tag, tyyppi, a }));
  // Ensin ruutudata, sitten pitkät arvot.
  for (const r0 of ruudut) offsetit.push(paikka(r0));
  kentat.find((k) => k.tag === 324).a = offsetit;
  const ifd = Buffer.alloc(ifdKoko);
  ifd.writeUInt16LE(kentat.length, 0);
  kentat.forEach((k, i) => {
    const b = arvot(k.tyyppi, k.a);
    const e = 2 + i * 12;
    ifd.writeUInt16LE(k.tag, e); ifd.writeUInt16LE(k.tyyppi, e + 2); ifd.writeUInt32LE(k.a.length, e + 4);
    if (b.length <= 4) b.copy(ifd, e + 8); else ifd.writeUInt32LE(paikka(b), e + 8);
  });
  const otsake = Buffer.from([0x49, 0x49, 42, 0, 8, 0, 0, 0]);
  dataAlku += 0;
  return Buffer.concat([otsake, ifd, ...lisa]);
}

test('GeoTIFF: prediktori 3 + DEFLATE + ruudut luetaan oikein, paikka tiepointista', () => {
  const arvo = (x, y) => 100 + x * 3.5 - y * 1.25;
  const g = avaaGeotiff(teeTiff(40, 30, 16, arvo));
  assert.deepEqual(g.tasot, [{ leveys: 40, korkeus: 30 }]);
  assert.equal(g.alue.lon0, 2); assert.equal(g.alue.lat1, 46);
  // Pikselin (x, y) keskipiste = lon0 + (x + 0,5) · askel, lat1 − (y + 0,5) · askel.
  for (const [x, y] of [[0, 0], [17, 5], [39, 29], [16, 16]]) {
    const v = g.korkeus(2 + (x + 0.5) * 0.01, 46 - (y + 0.5) * 0.01);
    assert.ok(Math.abs(v - arvo(x, y)) < 1e-3, `(${x}, ${y}) ${v} vs ${arvo(x, y)}`);
  }
  // Bilineaarinen välissä.
  const puoli = g.korkeus(2 + 1.0 * 0.01, 46 - 0.5 * 0.01);
  assert.ok(Math.abs(puoli - (arvo(0, 0) + arvo(1, 0)) / 2) < 1e-3);
  g.sulje();
});

test('RTIN: tasainen = 2 kolmiota, kynnys 0 = täysi ruudukko, ei rakoja', () => {
  const n = 17;
  assert.equal(rtinVerkko(new Float32Array(n * n), n, 1).kolmiot.length, 2);
  const h = new Float32Array(n * n).map((_, i) => Math.sin(i * 0.37) * 50);
  assert.equal(rtinVerkko(h, n, 0).kolmiot.length, 2 * (n - 1) ** 2);
  const { pisteet, kolmiot } = rtinVerkko(h, n, 8);
  // Jokainen sisäreuna kahdessa kolmiossa, ulkoreuna yhdessä (ei T-liitoksia).
  const reunat = new Map();
  for (const t of kolmiot) {
    for (let i = 0; i < 3; i += 1) {
      const a = t[i]; const b = t[(i + 1) % 3];
      const k = a < b ? `${a},${b}` : `${b},${a}`;
      reunat.set(k, (reunat.get(k) ?? 0) + 1);
    }
  }
  for (const [k, c] of reunat) {
    const [a, b] = k.split(',').map(Number);
    const ulko = [pisteet[a], pisteet[b]].every(([x]) => x === 0) || [pisteet[a], pisteet[b]].every(([x]) => x === n - 1)
      || [pisteet[a], pisteet[b]].every(([, y]) => y === 0) || [pisteet[a], pisteet[b]].every(([, y]) => y === n - 1);
    assert.equal(c, ulko ? 1 : 2, `reuna ${k}`);
  }
});

test('quantized-mesh: koodaus ja purku ovat toistensa käänteiset, reunat ja laajennus oikein', () => {
  const alue = { west: 2, south: 45, east: 2.5, north: 45.5 };
  const pisteet = [[0, 0, 10], [1, 0, 20], [1, 1, 30], [0, 1, 40], [0.5, 0.5, 500]];
  const kolmiot = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
  const p = puraLaatta(koodaaLaatta({ alue, pisteet, kolmiot }));
  assert.equal(p.pisteet.length, 5);
  assert.equal(p.kolmiot.length, 4);
  assert.ok(Math.abs(p.otsake.hMin - 10) < 1e-3 && Math.abs(p.otsake.hMax - 500) < 1e-3);
  // Ensiesiintymisjärjestys: kolmiot viittaavat samoihin (u, v)-pisteisiin kuin alussa.
  const uv = (i) => p.pisteet[i].slice(0, 2).map((t) => t / 32767);
  p.kolmiot.forEach((t, k) => t.forEach((i, j) => {
    const [u, v] = uv(i); const [u0, v0] = pisteet[kolmiot[k][j]];
    assert.ok(Math.abs(u - u0) < 1e-4 && Math.abs(v - v0) < 1e-4, `kolmio ${k} kärki ${j}`);
  }));
  assert.deepEqual(p.reunat.map((r) => r.length), [2, 2, 2, 2]);
  assert.deepEqual(p.laajennukset, [{ id: 1, pit: 10 }]);
  assert.ok(Math.hypot(...p.otsake.horisontti) >= 1, 'horisonttipiste ellipsoidin ulkopuolella (skaalattu)');
});

test('tiilitys ja luettelo: taso 0 kaksi laattaa, Ranskan laatikko, lähdemaininta', () => {
  assert.deepEqual(tasonLaatat(0, [-6, 41, 10, 52]), { x0: 0, x1: 1, y0: 0, y1: 0 });
  assert.deepEqual(laatanAlue(1, 2, 1), { west: 0, south: 0, east: 90, north: 90 });
  const t = tasonLaatat(8, [-6, 41, 10, 52]);
  const a0 = laatanAlue(8, t.x0, t.y0); const a1 = laatanAlue(8, t.x1, t.y1);
  assert.ok(a0.west <= -6 && a1.east >= 10 && a0.south <= 41 && a1.north >= 52);
  const k = kerroksenKuvaus({ tasot: [0, 8], alue: [-6, 41, 10, 52], versio: 'v' });
  assert.equal(k.format, 'quantized-mesh-1.0');
  assert.equal(k.scheme, 'tms');
  assert.equal(k.available.length, 9);
  assert.deepEqual(k.extensions, ['octvertexnormals']);
  assert.equal(k.attribution, LAHDEMAININTA);
  assert.match(LAHDEMAININTA, /Copernicus WorldDEM-30/);
});

test('laatta keinotekoisesta maastosta: naapurien yhteinen reuna täsmää', () => {
  const dem = { korkeus: (lon, lat) => 1000 * Math.exp(-((lon - 6.86) ** 2 + (lat - 45.83) ** 2) / 0.02) };
  const z = 10;
  const t = tasonLaatat(z, [6.7, 45.7, 7.0, 45.9]);
  const vasen = puraLaatta(gunzipSync(teeLaatta(dem, z, t.x0, t.y0, 33).tavut));
  const oikea = puraLaatta(gunzipSync(teeLaatta(dem, z, t.x0 + 1, t.y0, 33).tavut));
  const korkeus = (l, i) => l.otsake.hMin + (l.pisteet[i][2] / 32767) * (l.otsake.hMax - l.otsake.hMin);
  const ita = new Map(vasen.reunat[2].map((i) => [vasen.pisteet[i][1], korkeus(vasen, i)]));
  const lansi = new Map(oikea.reunat[0].map((i) => [oikea.pisteet[i][1], korkeus(oikea, i)]));
  // Kulmapisteet ovat aina molemmissa; niiden korkeuden on oltava sama (kvantisoinnin tarkkuudella).
  for (const v of [0, 32767]) {
    assert.ok(ita.has(v) && lansi.has(v));
    const sallittu = Math.max(vasen.otsake.hMax - vasen.otsake.hMin, oikea.otsake.hMax - oikea.otsake.hMin) / 32767 * 2 + 1e-3;
    assert.ok(Math.abs(ita.get(v) - lansi.get(v)) <= sallittu, `v ${v}: ${ita.get(v)} vs ${lansi.get(v)}`);
  }
});

test('kaarevuus: tasainen laatta ei ole kaksi jännettä maan alla (mustat kiilat 23.9.2026)', () => {
  // 90°:n jänteen keskipiste on R(1 − cos 45°) ≈ 1 866 km pinnan alla.
  assert.ok(Math.abs(janteenPainuma(0, 0, 90, 0) - 6371008.8 * (1 - Math.cos(Math.PI / 4))) < 1);
  const tasainen = { korkeus: () => 0 };
  const z0 = teeLaatta(tasainen, 0, 1, 0);
  assert.ok(z0.kolmioita > 100, `z0: ${z0.kolmioita} kolmiota`);
  // Jokaisen kolmion painuma on tason virherajan alla: purettu laatta.
  for (const [z, x, y] of [[0, 1, 0], [4, 16, 12], [7, 133, 99]]) {
    const { kolmiot, pisteet } = puraLaatta(gunzipSync(teeLaatta(tasainen, z, x, y).tavut));
    const a = laatanAlue(z, x, y);
    const lonlat = ([u, v]) => [a.west + (u / 32767) * (a.east - a.west), a.south + (v / 32767) * (a.north - a.south)];
    const kynnys = Math.max(0.5, (CESIUM_TASO0_VIRHE / 2 ** z) * 0.5);
    for (const t of kolmiot) {
      for (let k = 0; k < 3; k += 1) {
        const [l1, b1] = lonlat(pisteet[t[k]]); const [l2, b2] = lonlat(pisteet[t[(k + 1) % 3]]);
        assert.ok(janteenPainuma(l1, b1, l2, b2) <= kynnys * 1.01, `z${z}: sivun painuma yli ${kynnys} m`);
      }
    }
  }
  // Tarkalla tasolla painuma on millimetrejä: laatta pysyy kahtena kolmiona.
  assert.equal(teeLaatta(tasainen, 12, 4252, 3090).kolmioita, 2);
});

test('--maailma: matalat tasot koko maailmalle, syvät vain alueelle', () => {
  const l = kerroksenKuvaus({ tasot: [0, 4], alue: [-6, 41, 10, 52], versio: 'x', maailma: 2 });
  assert.deepEqual(l.available[2], [{ startX: 0, startY: 0, endX: 7, endY: 3 }]);
  assert.ok(l.available[3][0].endX < 15);
});
