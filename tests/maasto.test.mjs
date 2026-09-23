/*
 * MAASTOLAATAT (tools/maasto/, Karttaseppä 23.9.2026): Copernicus GLO-30
 * → Cesiumin quantized-mesh natiivipelille. Ilman verkkoa ja ilman
 * oikeaa DEM:iä: GeoTIFF kirjoitetaan testissä samaan muotoon kuin
 * Copernicuksen COG (little-endian, float32, DEFLATE, prediktori 3,
 * ruudutettu), ja maasto tehdään keinotekoisesta korkeusfunktiosta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deflateSync, gunzipSync } from 'node:zlib';

import { avaaGeotiff } from '../tools/maasto/geotiff.mjs';
import { rtinVerkko } from '../tools/maasto/rtin.mjs';
import { koodaaLaatta, puraLaatta } from '../tools/maasto/quantized-mesh.mjs';
import {
  aja, demHakemisto, demNimi, janteenPainuma, kaksiLahdetta, kerroksenKuvaus, kerrosTekstiksi, laatanAlue,
  laattaOnMaalla, lahdeJarjestys, sarakeRyhma, tasonLaatat, tasonLaatatJarjestyksessa, tasonSaatavuus,
  tasonSuunnitelma, teeLaatta, CESIUM_TASO0_VIRHE, GLO30_KYNNYS, LAHDEMAININTA, LAHDEMAININTA_90,
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

/*
 * MAAILMA-AJO (24.9.2026): kaksi lähdettä (GLO-30 + GLO-90), vain maalaatat
 * syvillä tasoilla ja tasokohtainen alue. Keinotekoiset 1°-ruudut
 * kirjoitetaan väliaikaiskansioon Copernicuksen nimillä.
 */
const maasto = (lon, lat) => 800 + 600 * Math.sin(lon * 5) * Math.cos(lat * 3);

/** Kansio 1°-ruuduista: [{ tunnus '10' | '30', lat, lon, lisa (m) }], 64 px/°. */
function teeDemKansio(kansio, ruudut) {
  mkdirSync(kansio, { recursive: true });
  for (const { tunnus = '10', lat, lon, lisa = 0 } of ruudut) {
    const px = 64;
    const b = teeTiff(px, px, 32, (x, y) => maasto(lon + (x + 0.5) / px, lat + 1 - (y + 0.5) / px) + lisa, { lon0: lon, lat1: lat + 1, askel: 1 / px });
    const ns = `${lat >= 0 ? 'N' : 'S'}${String(Math.abs(lat)).padStart(2, '0')}`;
    const ew = `${lon >= 0 ? 'E' : 'W'}${String(Math.abs(lon)).padStart(3, '0')}`;
    writeFileSync(join(kansio, `Copernicus_DSM_COG_${tunnus}_${ns}_00_${ew}_00_DEM.tif`), b);
  }
  return kansio;
}

test('Ranska ennallaan: ilman --dem90:tä laatat ja layer.json tavu tavulta kuten ennen', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'maasto-ranska-'));
  try {
    teeDemKansio(tmp, [{ lat: 45, lon: 6 }, { lat: 45, lon: 7 }]);
    const dem = demHakemisto(tmp);
    const h = createHash('sha256');
    for (const [z, x, y] of [[0, 1, 0], [5, 33, 24], [8, 264, 192], [8, 265, 192], [8, 266, 192], [9, 530, 384], [9, 533, 385]]) {
      h.update(teeLaatta(dem, z, x, y, 33).tavut);
    }
    dem.sulje();
    // Tiivisteet on laskettu muuttamattomalla työkalulla (origin/main 92718465a) samasta aineistosta.
    assert.equal(h.digest('hex'), 'a96ca6c18483513e73a1c31207cdbe3cc0fdcf16272b67df3b12380db4c827cc');
    const k = kerroksenKuvaus({ tasot: [0, 12], alue: [-6, 41, 10, 52], versio: '2026-09-23b', maailma: 6 });
    assert.equal(createHash('sha256').update(kerrosTekstiksi(k)).digest('hex'), 'e0fbb7670be1e496251c6f64d073497386f1cbc3f94f0d6a8a37193fd2edd1b5');
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test('DEM-nimet: GLO-30-kansio lukee vain COG_10, GLO-90 vain COG_30, ._-tiedostot ohitetaan', () => {
  assert.deepEqual(demNimi('Copernicus_DSM_COG_30_S12_00_W077_00_DEM.tif'), { tunnus: '30', lat: -12, lon: -77 });
  assert.equal(demNimi('._Copernicus_DSM_COG_10_N45_00_E006_00_DEM.tif'), null);
  const tmp = mkdtempSync(join(tmpdir(), 'maasto-nimet-'));
  try {
    teeDemKansio(tmp, [{ lat: 45, lon: 6 }, { tunnus: '30', lat: 38, lon: 46 }]);
    writeFileSync(join(tmp, '._Copernicus_DSM_COG_10_N44_00_E006_00_DEM.tif'), 'AppleDouble');
    writeFileSync(join(tmp, 'LUEMINUT.md'), '#');
    const g30 = demHakemisto(tmp, undefined, { tunnus: '10' });
    const g90 = demHakemisto(tmp, undefined, { tunnus: '30' });
    assert.equal(g30.ruutuja, 1); assert.ok(g30.onRuutu(45, 6)); assert.ok(!g30.onRuutu(38, 46)); assert.ok(!g30.onRuutu(44, 6));
    assert.equal(g90.ruutuja, 1); assert.ok(g90.onRuutu(38, 46)); assert.ok(!g90.onRuutu(45, 6));
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test('tasonSuunnitelma: maailma z0–z10 GLO-90, z11–z12 E28-laatikko, vain maa z7:stä, GLO-30 z12:sta', () => {
  const asetukset = { alue: [-25, 34, 45, 72], maailma: 10, vainMaaAlkaen: 7 };
  const s = (z) => tasonSuunnitelma(z, asetukset);
  for (let z = 0; z <= 10; z += 1) assert.deepEqual(s(z).alue, [-180, -90, 180, 90], `z${z}`);
  assert.deepEqual(s(11).alue, [-25, 34, 45, 72]); assert.deepEqual(s(12).alue, [-25, 34, 45, 72]);
  assert.deepEqual([0, 6, 7, 12].map((z) => s(z).vainMaa), [false, false, true, true]);
  assert.equal(tasonSuunnitelma(0, { ...asetukset, vainMaaAlkaen: 0 }).vainMaa, false, 'juuri aina');
  for (let z = 0; z <= 11; z += 1) assert.equal(s(z).lahteet[0], 'glo90', `z${z}`);
  assert.deepEqual(s(12).lahteet, ['glo30', 'glo90']);
  // Kynnys on z11:n (0,00137°) ja z12:n (0,00069°) näytevälien välissä.
  assert.ok(s(11).vali > GLO30_KYNNYS && s(12).vali < GLO30_KYNNYS);
  assert.deepEqual(lahdeJarjestys(0.002), ['glo90', 'glo30']);
  // Ilman --maailma/--vain-maa-alkaen: Ranska-käytös.
  assert.deepEqual(tasonSuunnitelma(9, { alue: [-6, 41, 10, 52] }), { z: 9, alue: [-6, 41, 10, 52], vainMaa: false, vali: 180 / 512 / 64, lahteet: ['glo90', 'glo30'] });
});

test('kaksi lähdettä: valinta tasosta ja ruudusta, varalähde, 0 m merellä; saumat täsmäävät peiton reunalla', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'maasto-lahteet-'));
  try {
    const k30 = teeDemKansio(join(tmp, '30'), [{ lat: 45, lon: 6 }, { lat: 46, lon: 8 }]);
    // GLO-90 eri arvoilla (+50 m), jotta lähde näkyy korkeudesta.
    const k90 = teeDemKansio(join(tmp, '90'), [{ tunnus: '30', lat: 45, lon: 6, lisa: 50 }, { tunnus: '30', lat: 45, lon: 7, lisa: 50 }]);
    const dem = kaksiLahdetta({ glo30: demHakemisto(k30), glo90: demHakemisto(k90, undefined, { tunnus: '30' }) });
    const z12 = tasonSuunnitelma(12, { alue: [0, 0, 1, 1] }).vali;
    const z11 = tasonSuunnitelma(11, { alue: [0, 0, 1, 1] }).vali;
    assert.equal(dem.lahde(6.5, 45.5, z12), 'glo30');
    assert.equal(dem.lahde(6.5, 45.5, z11), 'glo90');
    assert.equal(dem.lahde(7.5, 45.5, z12), 'glo90', 'GLO-30 puuttuu → GLO-90');
    assert.equal(dem.lahde(8.5, 46.5, z11), 'glo30', 'GLO-90 puuttuu → GLO-30');
    assert.equal(dem.lahde(9.5, 45.5, z12), null);
    assert.equal(dem.korkeus(9.5, 45.5, z12), 0);
    const p = [6.4, 45.3];
    assert.ok(Math.abs(dem.korkeus(...p, z12) - maasto(...p)) < 5);
    assert.ok(Math.abs(dem.korkeus(...p, z11) - maasto(...p) - 50) < 5);
    assert.ok(dem.onRuutu(46, 8) && dem.onRuutu(45, 7) && !dem.onRuutu(46, 7));

    // z12: GLO-30:n itäraja lon 7 on laatan sisällä; naapurien yhteiset reunapisteet täsmäävät.
    const x = Math.floor((7 + 180) / (180 / 4096)); const y = Math.floor((45.5 + 90) / (180 / 4096));
    const korkeus = (l, i) => l.otsake.hMin + (l.pisteet[i][2] / 32767) * (l.otsake.hMax - l.otsake.hMin);
    const pura = (lx, ly) => puraLaatta(gunzipSync(teeLaatta(dem, 12, lx, ly).tavut));
    const keski = pura(x, y);
    assert.ok(keski.otsake.hMax - keski.otsake.hMin > 40, 'lähteiden porras laatan sisällä');
    const sallittu = (a, b) => Math.max(a.otsake.hMax - a.otsake.hMin, b.otsake.hMax - b.otsake.hMin) / 32767 * 2 + 1e-3;
    for (const [naapuri, oma, sen, akseli] of [[pura(x + 1, y), 2, 0, 1], [pura(x - 1, y), 0, 2, 1], [pura(x, y + 1), 3, 1, 0]]) {
      const a = new Map(keski.reunat[oma].map((i) => [keski.pisteet[i][akseli], korkeus(keski, i)]));
      const b = new Map(naapuri.reunat[sen].map((i) => [naapuri.pisteet[i][akseli], korkeus(naapuri, i)]));
      let yhteisia = 0;
      for (const [v, h] of a) {
        if (!b.has(v)) continue;
        yhteisia += 1;
        assert.ok(Math.abs(h - b.get(v)) <= sallittu(keski, naapuri), `reuna ${oma}, ${v}: ${h} vs ${b.get(v)}`);
      }
      assert.ok(yhteisia >= 2);
    }
    dem.sulje();
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

test('vain maa: suorakulmiot kattavat täsmälleen tehtävät laatat, osat jakavat ne ilman päällekkäisyyttä', () => {
  const maa = new Set(['45,6', '45,7', '46,8', '44,-1', '60,20', '-34,18']);
  const onRuutu = (lat, lon) => maa.has(`${lat},${lon}`);
  for (const [z, alue] of [[7, [-180, -90, 180, 90]], [9, [-180, -90, 180, 90]], [11, [-25, 34, 45, 72]]]) {
    const s = tasonSuunnitelma(z, { alue, maailma: -1, vainMaaAlkaen: 7 });
    const tehdyt = new Set();
    for (let osa = 0; osa < 3; osa += 1) {
      for (const [x, y] of tasonLaatatJarjestyksessa(s, onRuutu, osa, 3)) {
        const k = `${x},${y}`;
        assert.ok(!tehdyt.has(k), `z${z} ${k} kahdesti`);
        tehdyt.add(k);
        // Osa on sarakeryhmän (z7-sarakkeen) mukaan.
        assert.equal(Math.floor(x / sarakeRyhma(z)) % 3, osa);
      }
    }
    const luettelossa = new Set();
    for (const r of tasonSaatavuus(s, onRuutu)) {
      for (let y = r.startY; y <= r.endY; y += 1) for (let x = r.startX; x <= r.endX; x += 1) luettelossa.add(`${x},${y}`);
    }
    assert.deepEqual([...luettelossa].sort(), [...tehdyt].sort(), `z${z}`);
    for (const k of tehdyt) assert.ok(laattaOnMaalla(z, ...k.split(',').map(Number), onRuutu));
    // Ruudun (45, 6) laatat ovat mukana, z11:ssä laatikon ulkopuolinen (−34, 18) ei.
    assert.ok(tehdyt.size > 0);
    if (z === 11) assert.ok(![...tehdyt].some((k) => laatanAlue(11, ...k.split(',').map(Number)).south < 0));
  }
  // Pystysuuntainen yhdistäminen: yksi 1°-ruutu z9:ssä = yksi suorakulmio (0,35° laatat, 1° ei tasan → 3–4 riviä).
  const yksi = tasonSaatavuus(tasonSuunnitelma(9, { alue: [-180, -90, 180, 90], vainMaaAlkaen: 7 }), (lat, lon) => lat === 45 && lon === 6);
  assert.equal(yksi.length, 1);
});

test('aja: kaksi lähdettä, kaksi osaa ja --luettelo → levyllä täsmälleen layer.jsonin laatat', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'maasto-aja-'));
  try {
    const k30 = teeDemKansio(join(tmp, 'glo30'), [{ lat: 45, lon: 6 }, { tunnus: '30', lat: 20, lon: 20 }]);
    const k90 = teeDemKansio(join(tmp, 'glo90'), [{ tunnus: '30', lat: 45, lon: 6 }, { tunnus: '30', lat: 45, lon: 7 }, { tunnus: '30', lat: 44, lon: 8 }]);
    const ulos = join(tmp, 'ulos');
    const yhteiset = ['--dem', k30, '--dem90', k90, '--ulos', ulos, '--tasot', '0-9', '--maailma', '3',
      '--alue', '5,44,9,47', '--vain-maa-alkaen', '5', '--ruudukko', '17', '--versio', 'koe', '--glo30-kynnys', '0.0005'];
    const hiljaa = () => {};
    const m0 = await aja([...yhteiset, '--osa', '0/2'], hiljaa);
    const m1 = await aja([...yhteiset, '--osa', '1/2'], hiljaa);
    await aja([...yhteiset, '--luettelo'], hiljaa);
    const l = JSON.parse(readFileSync(join(ulos, 'layer.json'), 'utf8'));
    assert.equal(l.attribution, `${LAHDEMAININTA} ${LAHDEMAININTA_90}`);
    assert.equal(l.available.length, 10);
    for (let z = 0; z <= 9; z += 1) {
      const odotettu = new Set();
      for (const r of l.available[z]) for (let y = r.startY; y <= r.endY; y += 1) for (let x = r.startX; x <= r.endX; x += 1) odotettu.add(`${x}/${y}`);
      const levy = new Set();
      const d = join(ulos, String(z));
      if (existsSync(d)) for (const x of readdirSync(d)) for (const f of readdirSync(join(d, x))) levy.add(`${x}/${f.replace('.terrain', '')}`);
      assert.deepEqual([...levy].sort(), [...odotettu].sort(), `z${z}`);
      assert.equal((m0[z] ?? 0) + (m1[z] ?? 0), levy.size);
    }
    // z0–z3 koko maailma, z9 vain ruutujen (45,6) (45,7) (44,8) laatat: 0,35° → 3 × 3 kukin, osin yhteisiä.
    assert.equal(m0[3] + m1[3], 128);
    assert.ok(m0[9] + m1[9] > 0 && m0[9] + m1[9] <= 36);
    // Syvän laatan korkeus tulee DEM:stä (ei 0 m).
    const z9 = readdirSync(join(ulos, '9'))[0];
    const laatta = puraLaatta(gunzipSync(readFileSync(join(ulos, '9', z9, readdirSync(join(ulos, '9', z9))[0]))));
    assert.ok(laatta.otsake.hMax > 100);
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});
