#!/usr/bin/env node
// REITIT (Karttaseppä 8.10.2026; omistaja 20.4x PT:n kautta: kaupunkien elävät elementit, Linssiseppä tekee suunnitelman).
// OSM (Geofabrik free shp, ODbL) → kaupungin reitit ja alueet paikallisessa ENU:ssa (sama origo kuin vesi-<nimi>.json):
//   kadut (autot), jalankulku (ihmiset), raitiotiet, rautatiet, metro (maanpäälliset osuudet), vesiväylät, puistot, satamat
//   (laiturit, venesatamat, telakka-altaat), pysäkit (raitiovaunu, lautta, rautatie). Tunnelit pois. Viivat yksinkertaistettu
//   Douglas–Peucker 0,5 m. Korkeutta (z) EI anneta: Googlen laatoista ei saa mitata korkeuksia; ks. reitit-<nimi>.json "korkeus".
// Lautta-reitit (route=ferry) puuttuvat Geofabrikin free-shp:stä → tulossa PBF:stä (lauttaterminaalit ovat mukana).
// Käyttö: node reitit.mjs <nimi> <lat> <lon> [säde_km 15] --osm <kansio, jossa gis_osm_*_free_1.shp> --ulos <kansio>
import fs from 'node:fs';
import path from 'node:path';

const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const [NIMI, LAT, LON, SADE = '15'] = pos, lat0 = +LAT, lon0 = +LON, S = +SADE * 1000, OSM = opt('osm'), ULOS = opt('ulos', '.');
const WA = 6378137, WF = 1 / 298.257223563, WE2 = WF * (2 - WF), rad = Math.PI / 180, sl0 = Math.sin(lat0 * rad);
const Nr = WA / Math.sqrt(1 - WE2 * sl0 * sl0), Mr = Nr * (1 - WE2) / (1 - WE2 * sl0 * sl0);
const nLat = (lat) => (lat - lat0) * rad * Mr, eLon = (lon) => (lon - lon0) * rad * Nr * Math.cos(lat0 * rad);
const bbLon = [lon0 - (S / (Nr * Math.cos(lat0 * rad))) / rad, lon0 + (S / (Nr * Math.cos(lat0 * rad))) / rad], bbLat = [lat0 - (S / Mr) / rad, lat0 + (S / Mr) / rad];

function lueDbf(polku) {
  const b = fs.readFileSync(polku), n = b.readUInt32LE(4), hl = b.readUInt16LE(8), rl = b.readUInt16LE(10), f = {}; let off = 1;
  for (let q = 32; b[q] !== 0x0d; q += 32) { const nm = b.toString('latin1', q, q + 11).replace(/\0.*$/, ''), ln = b[q + 16]; f[nm] = [off, ln]; off += ln; }
  return (i, k) => f[k] ? b.toString('utf8', hl + i * rl + f[k][0], hl + i * rl + f[k][0] + f[k][1]).replace(/\0/g, '').trim() : '';
}
// palauttaa [{ nro, osat: [[[x,y],…]], piste? }] bbox-rajattuna
function lueShp(polku) {
  const fd = fs.openSync(polku, 'r'), koko = fs.fstatSync(fd).size, h = Buffer.alloc(44), tulos = []; let p = 100, nro = 0;
  while (p < koko) {
    fs.readSync(fd, h, 0, 44, p); const pit = h.readInt32BE(4) * 2, tyyppi = h.readInt32LE(8); nro++;
    if (tyyppi === 1 || tyyppi === 11) { const x = h.readDoubleLE(12), y = h.readDoubleLE(20); if (x >= bbLon[0] && x <= bbLon[1] && y >= bbLat[0] && y <= bbLat[1]) tulos.push({ nro: nro - 1, piste: [eLon(x), nLat(y)] }); }
    else if ([3, 5, 13, 15].includes(tyyppi)) {
      const x0 = h.readDoubleLE(12), y0 = h.readDoubleLE(20), x1 = h.readDoubleLE(28), y1 = h.readDoubleLE(36);
      if (x1 >= bbLon[0] && x0 <= bbLon[1] && y1 >= bbLat[0] && y0 <= bbLat[1]) {
        const b = Buffer.alloc(pit); fs.readSync(fd, b, 0, pit, p + 8); const np = b.readInt32LE(36), nP = b.readInt32LE(40), o = 44 + 4 * np, osat = [];
        const alut = []; for (let k = 0; k < np; k++) alut.push(b.readInt32LE(44 + 4 * k)); alut.push(nP);
        for (let k = 0; k < np; k++) { const r = []; for (let q = alut[k]; q < alut[k + 1]; q++) r.push([eLon(b.readDoubleLE(o + q * 16)), nLat(b.readDoubleLE(o + q * 16 + 8))]); osat.push(r); }
        tulos.push({ nro: nro - 1, osat });
      }
    }
    p += 8 + pit;
  }
  fs.closeSync(fd); return tulos;
}
function dp(pts, eps) { // Douglas–Peucker
  if (pts.length < 3) return pts; const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1; const st = [[0, pts.length - 1]];
  while (st.length) { const [a, b] = st.pop(); let m = -1, md = eps; const [ax, ay] = pts[a], [bx, by] = pts[b], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1e-9;
    for (let k = a + 1; k < b; k++) { const d = Math.abs((pts[k][0] - ax) * dy - (pts[k][1] - ay) * dx) / L; if (d > md) { md = d; m = k; } }
    if (m >= 0) { keep[m] = 1; st.push([a, m], [m, b]); } }
  return pts.filter((_, k) => keep[k]);
}
const renkaaDp = (o) => { if (o.length < 8) return o; const m = o.length >> 1, a = dp(o.slice(0, m + 1), 0.5), b = dp(o.slice(m), 0.5); return a.concat(b.slice(1)); }; // suljettu rengas: alku = loppu
const sisalla = (x, y) => Math.abs(x) <= S && Math.abs(y) <= S;
const pyor = (pts) => pts.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
const kerros = {};
const lisaa = (k, o) => (kerros[k] ??= []).push(o);
function viivat(taso, luokka) {
  const shp = lueShp(path.join(OSM, `gis_osm_${taso}_free_1.shp`)), d = lueDbf(path.join(OSM, `gis_osm_${taso}_free_1.dbf`));
  for (const r of shp) { if (!r.osat) continue; const fc = d(r.nro, 'fclass'), k = luokka(fc, d, r.nro); if (!k) continue;
    for (const o of r.osat) { const pts = dp(o, 0.5).filter(([x, y]) => sisalla(x, y)); if (pts.length < 2) continue;
      const ob = { t: fc, p: pyor(pts) }; const nm = d(r.nro, 'name'); if (nm) ob.n = nm; if (d(r.nro, 'bridge') === 'T') ob.silta = 1; const ly = d(r.nro, 'layer'); if (ly && ly !== '0') ob.kerros = +ly;
      const ow = d(r.nro, 'oneway'); if (ow === 'F' || ow === 'T') ob.yksisuunta = ow === 'F' ? 1 : -1; const ms = d(r.nro, 'maxspeed'); if (ms && ms !== '0') ob.nopeus = +ms;
      lisaa(k, ob); } }
}
function alueet(taso, luokka) {
  const shp = lueShp(path.join(OSM, `gis_osm_${taso}_free_1.shp`)), d = lueDbf(path.join(OSM, `gis_osm_${taso}_free_1.dbf`));
  for (const r of shp) { const fc = d(r.nro, 'fclass'), k = luokka(fc); if (!k) continue; const nm = d(r.nro, 'name');
    if (r.piste) { if (sisalla(...r.piste)) lisaa(k, { t: fc, piste: pyor([r.piste])[0], ...(nm ? { n: nm } : {}) }); continue; }
    const renkaat = r.osat.map((o) => pyor(renkaaDp(o))).filter((o) => o.length >= 4); if (!renkaat.length || !renkaat[0].some(([x, y]) => sisalla(x, y))) continue;
    lisaa(k, { t: fc, renkaat, ...(nm ? { n: nm } : {}) }); }
}
const AUTO = new Set(['motorway', 'motorway_link', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link', 'residential', 'unclassified', 'living_street', 'busway']);
const JALKA = new Set(['pedestrian', 'footway', 'living_street', 'steps', 'path']);
viivat('roads', (fc, d, i) => d(i, 'tunnel') === 'T' ? null : AUTO.has(fc) ? 'kadut' : null);
viivat('roads', (fc, d, i) => d(i, 'tunnel') === 'T' ? null : JALKA.has(fc) ? 'jalankulku' : null);
viivat('railways', (fc, d, i) => d(i, 'tunnel') === 'T' ? null : (fc === 'tram' || fc === 'light_rail') ? 'raitiotiet' : (fc === 'rail' || fc === 'narrow_gauge') ? 'rautatiet' : fc === 'subway' ? 'metro' : fc === 'funicular' ? 'koysirata' : null);
viivat('waterways', (fc) => (fc === 'river' || fc === 'canal') ? 'vesivaylat' : null);
alueet('landuse_a', (fc) => fc === 'park' || fc === 'recreation_ground' ? 'puistot' : null);
alueet('pois_a', (fc) => fc === 'park' || fc === 'playground' ? 'puistot' : fc === 'fountain' ? 'aukiot' : null);
alueet('traffic_a', (fc) => fc === 'pier' || fc === 'marina' || fc === 'slipway' ? 'satamat' : null);
alueet('traffic', (fc) => fc === 'pier' || fc === 'marina' ? 'satamat' : null);
alueet('water_a', (fc) => fc === 'dock' ? 'satamat' : null);
alueet('transport', (fc) => ['tram_stop', 'ferry_terminal', 'railway_station', 'railway_halt'].includes(fc) ? 'pysakit' : null);
alueet('transport_a', (fc) => fc === 'ferry_terminal' ? 'pysakit' : null);
alueet('pois', (fc) => fc === 'fountain' || fc === 'attraction' || fc === 'viewpoint' ? 'aukiot' : null);

const pituus = (k) => (kerros[k] || []).reduce((s, o) => s + (o.p ? o.p.slice(1).reduce((a, q, i) => a + Math.hypot(q[0] - o.p[i][0], q[1] - o.p[i][1]), 0) : 0), 0);
const yht = Object.fromEntries(Object.keys(kerros).map((k) => [k, { kohteita: kerros[k].length, ...(pituus(k) ? { km: +(pituus(k) / 1000).toFixed(1) } : {}) }]));
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `reitit-${NIMI}.json`), JSON.stringify({
  kohde: NIMI, origo: { lat: lat0, lon: lon0, ellipsoidikorkeus_m: 0 }, sade_km: S / 1000, koordinaatit: 'ENU metreinä [x itä, y pohjoinen], 0,1 m',
  korkeus: 'ei annettu: Googlen laatoista ei saa mitata korkeuksia (Googlen Q&A: mittaukset ovat johdannaisia). Vaihtoehdot LS:lle: Copernicus GLO-30 (DSM, ±2–4 m, rakennukset mukana) tai ajonaikainen sijoitus vain piirtoon ilman tallennusta (tarkista ehdot ennen).',
  lahde: 'OpenStreetMap (Geofabrik free shp)', krediitti: 'Reitit: © OpenStreetMap contributors (ODbL)', yhteenveto: yht, kerrokset: kerros,
  puuttuu: ['lauttareitit (route=ferry): ei Geofabrikin free-shp:ssä, tulossa PBF:stä', 'aukiot alueina (highway=pedestrian area, place=square): ei free-shp:ssä; jalankulku-viivat ja suihkulähteet mukana'],
  luotu: new Date().toISOString(),
}));
console.log(JSON.stringify(yht), (fs.statSync(path.join(ULOS, `reitit-${NIMI}.json`)).size / 1e6).toFixed(1) + ' Mt');
