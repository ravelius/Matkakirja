#!/usr/bin/env node
// VESIPINTA (Karttaseppä 8.10.2026; OMISTAJA 20.2x: "B" = oma vesipinta Googlen 3D-laattojen päälle, ei laatoista johdettu).
// Lähteet: OSM-meri (osmdata water-polygons-split-4326, ODbL), OSM-sisävedet (Geofabrik gis_osm_water_a_free_1: water, reservoir,
// river, dock; ODbL), täydennys ESA WorldCover 2021 luokka 80 (CC BY 4.0) siellä, missä OSM:ssä ei ole vettä (komponentti ≥ 5000 m²).
// Vesitaso: meri EGM2008 0 m, sisävedet Copernicus GLO-30 -mediaani polygonin sisällä; + EGM2008-geoidi → ellipsoidikorkeus.
// Googlen laatoista EI mitata mitään (Googlen ehdot: mittaukset ovat johdannaisia).
// Tulos: kolmioverkko paikallisessa ENU:ssa (origo = keskusta, ellipsoidikorkeus 0), paloina 1 km × 1 km:
//   vesi-<nimi>.bytes: palat peräkkäin, kärki = float32 x itä, y pohjoinen, z ylös, d rantaetäisyys m (katto dkatto, oletus 8); indeksit uint32
//   vesi-<nimi>.json: origo, palat (kärki- ja indeksialku ja -määrä, bbox), tasot, lähteet, krediitti.
// Käyttö: node vesipinta.mjs <nimi> <lat> <lon> [säde_km 15] [ruutu_m 4] --meri <water_polygons.shp> --sisa <gis_osm_water_a_free_1.shp>
//   --glo <kansio> --geoidi <us_nga_egm08_25.tif> --ulos <kansio>
import fs from 'node:fs';
import path from 'node:path';
import { fromFile, fromUrl } from 'geotiff';
import { PNG } from 'pngjs';

const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const [NIMI, LAT, LON, SADE = '15', RUUTU = '4'] = pos;
const lat0 = +LAT, lon0 = +LON, S = +SADE * 1000, C = +RUUTU, ULOS = opt('ulos', '.');
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's', ...a);

// --- paikallinen taso: (e, n) m ↔ lat/lon (ellipsoidin kaarevuussäteet origossa) ---
const WA = 6378137, WF = 1 / 298.257223563, WE2 = WF * (2 - WF), rad = Math.PI / 180;
const sl0 = Math.sin(lat0 * rad), Nr = WA / Math.sqrt(1 - WE2 * sl0 * sl0), Mr = Nr * (1 - WE2) / (1 - WE2 * sl0 * sl0);
const latN = (n) => lat0 + (n / Mr) / rad, lonE = (e, lat) => lon0 + (e / (Nr * Math.cos(lat0 * rad))) / rad;
const nLat = (lat) => (lat - lat0) * rad * Mr, eLon = (lon) => (lon - lon0) * rad * Nr * Math.cos(lat0 * rad);
const W = Math.round(2 * S / C), H = W, X0 = -S, Y0 = -S; // ruudukko: sarake i → e = X0 + (i+0.5)C, rivi j → n = Y0 + (j+0.5)C
const bbLon = [lonE(-S * 1.02, lat0), lonE(S * 1.02, lat0)], bbLat = [latN(-S * 1.02), latN(S * 1.02)];
loki('ruudukko', W, '×', H, 'ruutu', C, 'm');

// --- shapefile (polygonit) + dbf ---
function lueShp(polku, suodin) {
  const fd = fs.openSync(polku, 'r'), koko = fs.fstatSync(fd).size, h = Buffer.alloc(52), tulos = [];
  let p = 100, nro = 0;
  while (p < koko) {
    fs.readSync(fd, h, 0, 52, p); const pit = h.readInt32BE(4) * 2, tyyppi = h.readInt32LE(8); nro++;
    if (tyyppi === 5 || tyyppi === 15) {
      const x0 = h.readDoubleLE(12), y0 = h.readDoubleLE(20), x1 = h.readDoubleLE(28), y1 = h.readDoubleLE(36);
      if (x1 >= bbLon[0] && x0 <= bbLon[1] && y1 >= bbLat[0] && y0 <= bbLat[1] && (!suodin || suodin(nro - 1))) {
        const b = Buffer.alloc(pit); fs.readSync(fd, b, 0, pit, p + 8);
        const np = b.readInt32LE(36), nP = b.readInt32LE(40), osat = [], o = 44 + 4 * np;
        for (let k = 0; k < np; k++) osat.push(b.readInt32LE(44 + 4 * k)); osat.push(nP);
        const renkaat = [];
        for (let k = 0; k < np; k++) { const r = new Float64Array((osat[k + 1] - osat[k]) * 2); for (let q = osat[k]; q < osat[k + 1]; q++) { r[(q - osat[k]) * 2] = eLon(b.readDoubleLE(o + q * 16)); r[(q - osat[k]) * 2 + 1] = nLat(b.readDoubleLE(o + q * 16 + 8)); } renkaat.push(r); }
        tulos.push({ nro: nro - 1, renkaat });
      }
    }
    p += 8 + pit;
  }
  fs.closeSync(fd); return tulos;
}
function lueDbfKentta(polku, kentta) {
  const b = fs.readFileSync(polku), n = b.readUInt32LE(4), hl = b.readUInt16LE(8), rl = b.readUInt16LE(10); let off = 1, kOff = -1, kLen = 0;
  for (let q = 32; b[q] !== 0x0d; q += 32) { const nimi = b.toString('latin1', q, q + 11).replace(/\0.*$/, ''), len = b[q + 16]; if (nimi === kentta) { kOff = off; kLen = len; } off += len; }
  return (i) => b.toString('latin1', hl + i * rl + kOff, hl + i * rl + kOff + kLen).trim();
}

// --- rasterointi 4 × 4 -alinäytteillä: peitto 0–16 per ruutu, taso-id viimeisenä kirjoittaneelta ---
const SS = 4, peitto = new Uint8Array(W * H), taso = new Int16Array(W * H).fill(-1);
function rasteroi(renkaat, tasoId) {
  const reunat = []; let ymin = 1e18, ymax = -1e18;
  for (const r of renkaat) for (let k = 0; k < r.length / 2; k++) {
    const a = k * 2, b = ((k + 1) % (r.length / 2)) * 2, xa = (r[a] - X0) / C * SS, ya = (r[a + 1] - Y0) / C * SS, xb = (r[b] - X0) / C * SS, yb = (r[b + 1] - Y0) / C * SS;
    if (ya === yb) continue; const lo = Math.min(ya, yb), hi = Math.max(ya, yb); reunat.push([lo, hi, ya < yb ? xa : xb, (xb - xa) / (yb - ya) * (ya < yb ? 1 : 1), ya < yb ? ya : yb]);
    ymin = Math.min(ymin, lo); ymax = Math.max(ymax, hi);
  }
  // x(y) = x_lo + k·(y − y_lo), k = dx/dy
  for (const e of reunat) { const [lo, hi] = e; const kk = e[3]; e[3] = kk; }
  reunat.sort((a, b) => a[0] - b[0]);
  const s0 = Math.max(0, Math.ceil(ymin - 0.5)), s1 = Math.min(H * SS - 1, Math.floor(ymax - 0.5)); let ei = 0; const aktiiv = [], xs = [];
  for (let sy = s0; sy <= s1; sy++) {
    const y = sy + 0.5;
    while (ei < reunat.length && reunat[ei][0] <= y) aktiiv.push(reunat[ei++]);
    xs.length = 0;
    for (let k = aktiiv.length - 1; k >= 0; k--) { const e = aktiiv[k]; if (e[1] <= y) { aktiiv.splice(k, 1); continue; } xs.push(e[2] + e[3] * (y - e[4])); }
    xs.sort((a, b) => a - b); const rivi = (sy / SS) | 0, ro = rivi * W;
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const k0 = Math.max(0, Math.ceil(xs[k] - 0.5)), k1 = Math.min(W * SS - 1, Math.floor(xs[k + 1] - 0.5));
      for (let q = k0; q <= k1; q++) { const c = ro + (q >> 2); if (peitto[c] < 16) peitto[c]++; taso[c] = tasoId; }
    }
  }
}

// --- lähteet ---
const tasot = []; // { lahde, H (EGM2008), naytteet[] }
const meriPolku = opt('meri'), sisaPolku = opt('sisa');
if (meriPolku) { tasot.push({ lahde: 'meri', H: 0 }); const mp = lueShp(meriPolku); loki('meri: polygoneja', mp.length); for (const p of mp) rasteroi(p.renkaat, 0); }
if (sisaPolku) {
  const fcl = lueDbfKentta(sisaPolku.replace(/\.shp$/, '.dbf'), 'fclass'), OK = new Set(['water', 'reservoir', 'river', 'dock']);
  const sp = lueShp(sisaPolku, (i) => OK.has(fcl(i))); loki('sisävedet: polygoneja', sp.length);
  for (const p of sp) { tasot.push({ lahde: 'osm-' + fcl(p.nro), H: null }); rasteroi(p.renkaat, tasot.length - 1); }
}
let vettaOsm = 0; for (let c = 0; c < W * H; c++) if (peitto[c] >= 8) vettaOsm++;
loki('OSM-vettä', (vettaOsm * C * C / 1e6).toFixed(2), 'km²');

// --- ruudun keskipisteen lat/lon ---
const latR = new Float64Array(H), lonC = new Float64Array(W);
for (let j = 0; j < H; j++) latR[j] = latN(Y0 + (j + 0.5) * C);
for (let i = 0; i < W; i++) lonC[i] = lonE(X0 + (i + 0.5) * C, lat0);

// --- GLO-30 (EGM2008) ---
const GLO = opt('glo');
const dem = [];
for (let la = Math.floor(bbLat[0]); la <= Math.floor(bbLat[1]); la++) for (let lo = Math.floor(bbLon[0]); lo <= Math.floor(bbLon[1]); lo++) {
  const nimi = `Copernicus_DSM_COG_10_${la >= 0 ? 'N' : 'S'}${String(Math.abs(la)).padStart(2, '0')}_00_${lo >= 0 ? 'E' : 'W'}${String(Math.abs(lo)).padStart(3, '0')}_00_DEM.tif`;
  const p = path.join(GLO, nimi); if (!fs.existsSync(p)) { loki('ei DEM', nimi); continue; }
  const im = await (await fromFile(p)).getImage(), [ox, oy0, ox1, oy] = im.getBoundingBox(), w = im.getWidth(), h = im.getHeight(), rx = (ox1 - ox) / w, ry = (oy - oy0) / h;
  const c0 = Math.max(0, Math.floor((bbLon[0] - ox) / rx)), c1 = Math.min(w, Math.ceil((bbLon[1] - ox) / rx)), r0 = Math.max(0, Math.floor((oy - bbLat[1]) / ry)), r1 = Math.min(h, Math.ceil((oy - bbLat[0]) / ry));
  if (c1 <= c0 || r1 <= r0) continue;
  const [d] = await im.readRasters({ window: [c0, r0, c1, r1] }); dem.push({ x0: ox + c0 * rx, y0: oy - r0 * ry, rx, ry, w: c1 - c0, h: r1 - r0, d });
}
const demH = (lon, lat) => { for (const t of dem) { const c = Math.floor((lon - t.x0) / t.rx), r = Math.floor((t.y0 - lat) / t.ry); if (c >= 0 && r >= 0 && c < t.w && r < t.h) return t.d[r * t.w + c]; } return NaN; };
loki('DEM-laattoja', dem.length);

// --- ESA-täydennys: ESA-vesi ilman OSM-vettä, komponentti ≥ 5000 m² ---
const ESA = 'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_', esa = [];
for (let la = Math.floor(bbLat[0] / 3) * 3; la < bbLat[1]; la += 3) for (let lo = Math.floor(bbLon[0] / 3) * 3; lo < bbLon[1]; lo += 3) {
  const nimi = `${la >= 0 ? 'N' : 'S'}${String(Math.abs(la)).padStart(2, '0')}${lo >= 0 ? 'E' : 'W'}${String(Math.abs(lo)).padStart(3, '0')}`;
  const tif = await fromUrl(`${ESA}${nimi}_Map.tif`).catch(() => null); if (!tif) continue;
  const im = await tif.getImage(), [ox, , , oy] = im.getBoundingBox(), PX = 12000;
  const c0 = Math.max(0, Math.floor((bbLon[0] - ox) * PX)), c1 = Math.min(im.getWidth(), Math.ceil((bbLon[1] - ox) * PX)), r0 = Math.max(0, Math.floor((oy - bbLat[1]) * PX)), r1 = Math.min(im.getHeight(), Math.ceil((oy - bbLat[0]) * PX));
  if (c1 <= c0 || r1 <= r0) continue;
  const [d] = await im.readRasters({ window: [c0, r0, c1, r1] }); esa.push({ x0: ox + c0 / PX, y0: oy - r0 / PX, w: c1 - c0, h: r1 - r0, d });
}
const esaK = (lon, lat) => { for (const t of esa) { const c = Math.floor((lon - t.x0) * 12000), r = Math.floor((t.y0 - lat) * 12000); if (c >= 0 && r >= 0 && c < t.w && r < t.h) return t.d[r * t.w + c]; } return 255; };
{
  const ehd = new Uint8Array(W * H); let n = 0;
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const c = j * W + i; if (peitto[c] === 0 && esaK(lonC[i], latR[j]) === 80) { ehd[c] = 1; n++; } }
  const pino = new Int32Array(W * H), komp = []; let lisatty = 0, kompLkm = 0;
  for (let s = 0; s < W * H; s++) {
    if (ehd[s] !== 1) continue; let top = 0; pino[top++] = s; ehd[s] = 2; komp.length = 0; let osm = 0;
    while (top) { const c = pino[--top]; komp.push(c); const i = c % W, j = (c / W) | 0;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const ii = i + di, jj = j + dj; if (ii < 0 || jj < 0 || ii >= W || jj >= H) continue; const q = jj * W + ii; if (ehd[q] === 1) { ehd[q] = 2; pino[top++] = q; } else if (peitto[q] >= 8) osm++; } }
    if (komp.length * C * C >= 5000) { tasot.push({ lahde: 'esa', H: null }); const id = tasot.length - 1; for (const c of komp) { peitto[c] = 16; taso[c] = id; } lisatty += komp.length; kompLkm++; }
  }
  loki('ESA-täydennys', kompLkm, 'aluetta', (lisatty * C * C / 1e6).toFixed(3), 'km² (ehdokkaita', (n * C * C / 1e6).toFixed(2), 'km²)');
}

// --- geoidi EGM2008 (N) ---
const gim = await (await fromFile(opt('geoidi'))).getImage(), [gx0, gy0, gx1, gy1] = gim.getBoundingBox(), gw = gim.getWidth(), gh = gim.getHeight(), grx = (gx1 - gx0) / gw, gry = (gy1 - gy0) / gh;
const gc0 = Math.floor((bbLon[0] - gx0) / grx) - 2, gc1 = Math.ceil((bbLon[1] - gx0) / grx) + 2, gr0 = Math.floor((gy1 - bbLat[1]) / gry) - 2, gr1 = Math.ceil((gy1 - bbLat[0]) / gry) + 2;
const [gd] = await gim.readRasters({ window: [gc0, gr0, gc1, gr1] }), gW = gc1 - gc0;
const geoidi = (lon, lat) => { // bilineaarinen, pikselin keskipisteet
  const x = (lon - gx0) / grx - 0.5 - gc0, y = (gy1 - lat) / gry - 0.5 - gr0, x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a, b) => gd[b * gW + a];
  return (v(x0, y0) * (1 - fx) + v(x0 + 1, y0) * fx) * (1 - fy) + (v(x0, y0 + 1) * (1 - fx) + v(x0 + 1, y0 + 1) * fx) * fy;
};
loki('geoidi keskustassa', geoidi(lon0, lat0).toFixed(2), 'm; tasoja', tasot.length);

// --- rantaetäisyys (EDT, Felzenszwalb) vesiruuduille, m ---
const vesi = (c) => peitto[c] >= 8, DCAP = +opt("dkatto", 8); // rantaetäisyyden katto m (pehmennys noin 3 m)
const DIST = new Float32Array(W * H);
{
  const INF = 1e12, f = new Float64Array(Math.max(W, H)), dd = new Float64Array(Math.max(W, H)), v = new Int32Array(Math.max(W, H)), z = new Float64Array(Math.max(W, H) + 1);
  const dt1 = (n) => { let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF; for (let q = 1; q < n; q++) { let s; while (true) { s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); if (s <= z[k]) { k--; continue; } break; } k++; v[k] = q; z[k] = s; z[k + 1] = INF; } k = 0; for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; dd[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; } };
  for (let i = 0; i < W; i++) { for (let j = 0; j < H; j++) f[j] = vesi(j * W + i) ? INF : 0; dt1(H); for (let j = 0; j < H; j++) DIST[j * W + i] = dd[j]; }
  for (let j = 0; j < H; j++) { for (let i = 0; i < W; i++) f[i] = DIST[j * W + i]; dt1(W); for (let i = 0; i < W; i++) DIST[j * W + i] = Math.min(DCAP, Math.sqrt(dd[i]) * C); }
}
loki('rantaetäisyys valmis');

// --- tasot: sisävedet = GLO-30-mediaani tason ruuduista (joka 3. ruutu) ---
{
  const nayt = tasot.map(() => []);
  for (let j = 0; j < H; j += 3) for (let i = 0; i < W; i += 3) { const c = j * W + i, t = taso[c]; if (t > 0 && peitto[c] >= 12 && nayt[t].length < 4000 && DIST[c] >= Math.min(DCAP, 2 * C)) { const v = demH(lonC[i], latR[j]); if (Number.isFinite(v)) nayt[t].push(v); } }
  for (let t = 0; t < tasot.length; t++) if (tasot[t].H === null) { const a = nayt[t].sort((x, y) => x - y); tasot[t].H = a.length ? +a[Math.floor(a.length * 0.1)].toFixed(2) : 0; tasot[t].n = a.length; } // alakantti: liian korkea vesi peittäisi laiturit, liian matala vain paljastaa Googlen veden
}

// --- kulmat: peitto 0–1 (4 ruudun keskiarvo), etäisyys (4 ruudun keskiarvo) ---
const CW = W + 1;
const kulmaP = (i, j) => { let s = 0, n = 0; for (const [a, b] of [[i - 1, j - 1], [i, j - 1], [i - 1, j], [i, j]]) { if (a < 0 || b < 0 || a >= W || b >= H) continue; s += peitto[b * W + a]; n++; } return n ? s / (16 * n) : 0; };
const kulmaD = (i, j) => { let s = 0, n = 0; for (const [a, b] of [[i - 1, j - 1], [i, j - 1], [i - 1, j], [i, j]]) { if (a < 0 || b < 0 || a >= W || b >= H) continue; s += vesi(b * W + a) ? DIST[b * W + a] : 0; n++; } return n ? s / n : 0; };
const KP = new Float32Array(CW * (H + 1)); for (let j = 0; j <= H; j++) for (let i = 0; i <= W; i++) KP[j * CW + i] = kulmaP(i, j);
const tasoRuudulle = (i, j) => { const c = j * W + i; if (taso[c] >= 0 && peitto[c] > 0) return taso[c]; let best = -1, bp = 0; for (const [a, b] of [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1], [i - 1, j - 1], [i + 1, j + 1], [i - 1, j + 1], [i + 1, j - 1]]) { if (a < 0 || b < 0 || a >= W || b >= H) continue; const q = b * W + a; if (taso[q] >= 0 && peitto[q] > bp) { bp = peitto[q]; best = taso[q]; } } return best; };

// --- ENU-muunnos ---
const cl0 = Math.cos(lat0 * rad), so0 = Math.sin(lon0 * rad), co0 = Math.cos(lon0 * rad);
const ecef = (lat, lon, h) => { const s = Math.sin(lat * rad), c = Math.cos(lat * rad), N = WA / Math.sqrt(1 - WE2 * s * s); return [(N + h) * c * Math.cos(lon * rad), (N + h) * c * Math.sin(lon * rad), (N * (1 - WE2) + h) * s]; };
const O = ecef(lat0, lon0, 0);
const enu = (lat, lon, h) => { const p = ecef(lat, lon, h), dx = p[0] - O[0], dy = p[1] - O[1], dz = p[2] - O[2];
  return [-so0 * dx + co0 * dy, -sl0 * co0 * dx - sl0 * so0 * dy + cl0 * dz, cl0 * co0 * dx + cl0 * so0 * dy + sl0 * dz]; };

// --- verkko paloittain (1 km), nelipuu täysille ruuduille, marching squares rannalle ---
const PALA = Math.round(1000 / C), palat = [], kV = [], kI = [];
let vMaara = 0, iMaara = 0;
const taysi = new Uint8Array(W * H); // 1 = kaikki kulmat ≥ 0,5
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const a = KP[j * CW + i], b = KP[j * CW + i + 1], c = KP[(j + 1) * CW + i], d = KP[(j + 1) * CW + i + 1]; taysi[j * W + i] = a >= 0.5 && b >= 0.5 && c >= 0.5 && d >= 0.5 ? 1 : (a < 0.5 && b < 0.5 && c < 0.5 && d < 0.5 ? 0 : 2); }
for (let pj = 0; pj < H; pj += PALA) for (let pi = 0; pi < W; pi += PALA) {
  const V = [], I = [], kartta = new Map();
  const karki = (avain, e, n, d, t) => { const k = avain * 4096 + t; let ix = kartta.get(k); if (ix !== undefined) return ix;
    const lat = latN(n), lon = lonE(e, lat), h = tasot[t].H + geoidi(lon, lat), p = enu(lat, lon, h); ix = V.length / 4; V.push(p[0], p[1], p[2], d); kartta.set(k, ix); return ix; };
  const kulmaK = (i, j, t) => karki((j * CW + i) * 2, X0 + i * C, Y0 + j * C, kulmaD(i, j), t);
  const reunaK = (i, j, suunta, tt, t) => { // suunta 0: vaaka (i,j)→(i+1,j), 1: pysty (i,j)→(i,j+1)
    const e = X0 + (i + (suunta === 0 ? tt : 0)) * C, n = Y0 + (j + (suunta === 1 ? tt : 0)) * C;
    return karki(((j * CW + i) * 2 + 1) * 2 + suunta + 1e9, e, n, 0, t); };
  const tasainen = (i0, j0, s) => { // kaikki täysiä, sama taso, etäisyys 30 koko lohkossa
    const i1 = Math.min(W, i0 + s), j1 = Math.min(H, j0 + s), t = taso[j0 * W + i0];
    for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) { const c = j * W + i; if (taysi[c] !== 1 || taso[c] !== t || DIST[c] < DCAP) return -2; }
    return t; };
  const lohko = (i0, j0, s) => {
    if (i0 >= W || j0 >= H || i0 >= pi + PALA || j0 >= pj + PALA) return;
    const t = s > 1 ? tasainen(i0, j0, s) : -2;
    if (t >= 0 && i0 + s <= Math.min(W, pi + PALA) && j0 + s <= Math.min(H, pj + PALA)) { const a = kulmaK(i0, j0, t), b = kulmaK(i0 + s, j0, t), c = kulmaK(i0 + s, j0 + s, t), d = kulmaK(i0, j0 + s, t); I.push(a, b, c, a, c, d); return; }
    if (s > 1) { const h2 = s >> 1; lohko(i0, j0, h2); lohko(i0 + h2, j0, h2); lohko(i0, j0 + h2, h2); lohko(i0 + h2, j0 + h2, h2); return; }
    const c = j0 * W + i0; if (taysi[c] === 0) return;
    const t1 = tasoRuudulle(i0, j0); if (t1 < 0) return;
    if (taysi[c] === 1) { const a = kulmaK(i0, j0, t1), b = kulmaK(i0 + 1, j0, t1), cc = kulmaK(i0 + 1, j0 + 1, t1), d = kulmaK(i0, j0 + 1, t1); I.push(a, b, cc, a, cc, d); return; }
    // marching squares: kulmat järjestyksessä (i,j) (i+1,j) (i+1,j+1) (i,j+1)
    const kv = [[i0, j0], [i0 + 1, j0], [i0 + 1, j0 + 1], [i0, j0 + 1]], vv = kv.map(([a, b]) => KP[b * CW + a]), poly = [];
    const lisaa = (ix, x, y) => poly.push([ix, x, y]);
    for (let k = 0; k < 4; k++) {
      const [a, b] = kv[k], [a2, b2] = kv[(k + 1) % 4], va = vv[k], vb = vv[(k + 1) % 4]; if (va >= 0.5) lisaa(kulmaK(a, b, t1), a, b);
      if ((va >= 0.5) !== (vb >= 0.5)) { const tt = (0.5 - va) / (vb - va), x = a + (a2 - a) * tt, y = b + (b2 - b) * tt;
        if (k === 0) lisaa(reunaK(i0, j0, 0, tt, t1), x, y); else if (k === 1) lisaa(reunaK(i0 + 1, j0, 1, tt, t1), x, y);
        else if (k === 2) lisaa(reunaK(i0, j0 + 1, 0, 1 - tt, t1), x, y); else lisaa(reunaK(i0, j0, 1, 1 - tt, t1), x, y); }
    }
    // satulatapaus (vastakkaiset kulmat sisällä): kaksi erillistä palaa, muuten korvanleikkaus (≤ 6 kärkeä, CCW)
    const sis = vv.map((v) => v >= 0.5), satula = sis[0] === sis[2] && sis[1] === sis[3] && sis[0] !== sis[1];
    const ear = (P) => { const Q = P.slice(); const ala = (a, b, c) => (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]);
      let suoja = 20; while (Q.length > 3 && suoja--) { let ok = false; for (let k = 0; k < Q.length; k++) { const a = Q[(k + Q.length - 1) % Q.length], b = Q[k], c = Q[(k + 1) % Q.length];
          if (ala(a, b, c) <= 1e-9) continue; if (Q.some((p) => p !== a && p !== b && p !== c && ala(a, b, p) > 0 && ala(b, c, p) > 0 && ala(c, a, p) > 0)) continue;
          I.push(a[0], b[0], c[0]); Q.splice(k, 1); ok = true; break; } if (!ok) break; }
      if (Q.length === 3 && ala(Q[0], Q[1], Q[2]) > 1e-9) I.push(Q[0][0], Q[1][0], Q[2][0]); };
    if (satula) { // poly = [K0, e01, e12, K2, e23, e30] tai [e01, K1, e12, e23, K3, e30]
      const n = poly.length; for (let k = 0; k < n; k++) { const kk = poly[k]; const onKulma = kv.some(([a, b]) => a === kk[1] && b === kk[2]); if (onKulma) ear([poly[(k + n - 1) % n], kk, poly[(k + 1) % n]]); }
    } else ear(poly);
  };
  for (let j = pj; j < Math.min(H, pj + PALA); j += 64) for (let i = pi; i < Math.min(W, pi + PALA); i += 64) lohko(i, j, 64);
  if (!I.length) continue;
  let bb = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9]; for (let k = 0; k < V.length; k += 4) for (let a = 0; a < 3; a++) { bb[a] = Math.min(bb[a], V[k + a]); bb[a + 3] = Math.max(bb[a + 3], V[k + a]); }
  palat.push({ karjet: [vMaara, V.length / 4], indeksit: [iMaara, I.length], bbox: bb.map((x) => +x.toFixed(2)) });
  kV.push(Float32Array.from(V)); kI.push(Uint32Array.from(I)); vMaara += V.length / 4; iMaara += I.length;
}
loki('verkko', palat.length, 'palaa,', vMaara, 'kärkeä,', iMaara / 3, 'kolmiota');

// --- navigointimaski (--maski): 8-bit PNG ruutukoossa, 0 = maa, 1–255 = etäisyys rantaan m (veneet ja lokit, LS1) ---
if (A.includes('--maski')) {
  const INF = 1e12, n = Math.max(W, H), f = new Float64Array(n), dd = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1), D2 = new Float32Array(W * H);
  const dt1 = (m) => { let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF; for (let q = 1; q < m; q++) { let s; while (true) { s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); if (s <= z[k]) { k--; continue; } break; } k++; v[k] = q; z[k] = s; z[k + 1] = INF; } k = 0; for (let q = 0; q < m; q++) { while (z[k + 1] < q) k++; dd[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; } };
  for (let i = 0; i < W; i++) { for (let j = 0; j < H; j++) f[j] = vesi(j * W + i) ? INF : 0; dt1(H); for (let j = 0; j < H; j++) D2[j * W + i] = dd[j]; }
  const png = new PNG({ width: W, height: H, colorType: 0, inputColorType: 0, bitDepth: 8 });
  for (let j = 0; j < H; j++) { for (let i = 0; i < W; i++) f[i] = D2[j * W + i]; dt1(W); for (let i = 0; i < W; i++) png.data[(H - 1 - j) * W + i] = vesi(j * W + i) ? Math.max(1, Math.min(255, Math.round(Math.sqrt(dd[i]) * C))) : 0; }
  fs.mkdirSync(ULOS, { recursive: true });
  fs.writeFileSync(path.join(ULOS, `vesi-${NIMI}-maski.png`), PNG.sync.write(png, { colorType: 0, inputColorType: 0 }));
  fs.writeFileSync(path.join(ULOS, `vesi-${NIMI}-maski.json`), JSON.stringify({ origo: { lat: lat0, lon: lon0 }, ruutu_m: C, leveys: W, korkeus: H,
    kulma_enu: { x: X0, y: Y0 }, rivi0: 'ylin rivi = pohjoisin (y = −X0 … ); pikseli (i, r) → x = X0 + (i + 0,5)·ruutu, y = Y0 + (H − 1 − r + 0,5)·ruutu',
    arvo: '0 = maa, 1–255 = etäisyys lähimpään rantaan m (katto 255)', krediitti: 'Vesi: © OpenStreetMap contributors (ODbL), ESA WorldCover 2021 (CC BY 4.0)' }, null, 2));
  loki('navigointimaski', W, '×', H);
}
// --- kirjoitus ---
fs.mkdirSync(ULOS, { recursive: true });
const vb = Buffer.alloc(vMaara * 16 + iMaara * 4); let o = 0;
for (const f of kV) { Buffer.from(f.buffer).copy(vb, o); o += f.byteLength; }
for (const f of kI) { Buffer.from(f.buffer).copy(vb, o); o += f.byteLength; }
fs.writeFileSync(path.join(ULOS, `vesi-${NIMI}.bytes`), vb);
fs.writeFileSync(path.join(ULOS, `vesi-${NIMI}.json`), JSON.stringify({
  kohde: NIMI, origo: { lat: lat0, lon: lon0, ellipsoidikorkeus_m: 0 }, sade_km: S / 1000, ruutu_m: C,
  muoto: 'little-endian: kaikki kärjet (float32 x itä, y pohjoinen, z ylös [ENU origossa, maan kaarevuus mukana], d rantaetäisyys m, katto 30), sitten kaikki indeksit (uint32, palan omat kärjet: indeksi + pala.karjet[0])',
  karkia: vMaara, indekseja: iMaara, palat,
  nosto_m_suositus: 0.4, nosto_selitys: 'z on vesitaso ilman nostoa; lisää nosto (ENU z) ajossa, jotta Googlen vesipinnan kohina peittyy mutta laiturit ja veneet jäävät näkyviin',
  ranta: 'alfa = smoothstep(0, 3, d) pehmentää rannan; d = 0 rantaviivalla',
  tasot: tasot.map((t, i) => ({ id: i, lahde: t.lahde, H_egm2008_m: t.H, naytteita: t.n })).filter((t) => t.id === 0 || t.naytteita > 0 || t.lahde === 'esa'),
  geoidi_keskusta_m: +geoidi(lon0, lat0).toFixed(3),
  krediitti: 'Vesi: © OpenStreetMap contributors (ODbL), ESA WorldCover 2021 (CC BY 4.0)',
  lahteet: ['OSM water-polygons-split-4326 (osmdata.openstreetmap.de)', 'Geofabrik gis_osm_water_a_free_1', 'ESA WorldCover 2021 v200', 'Copernicus GLO-30 (vesitasot)', 'NGA EGM2008 2,5′ (PROJ us_nga_egm08_25)'],
  luotu: new Date().toISOString(),
}, null, 2));

// --- esikatselu: peitto (sininen), ESA-täydennys (oranssi), rantaetäisyys vaaleana, 1/4 koko ---
{ const s = 4, w = Math.floor(W / s), h = Math.floor(H / s), png = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = (H - 1 - y * s) * W + x * s, q = (y * w + x) * 4, t = taso[c], p = peitto[c] / 16, dd = DIST[c] / DCAP;
    const esaT = t >= 0 && tasot[t].lahde === 'esa'; png.data[q] = esaT ? 230 : 30 + 40 * dd; png.data[q + 1] = esaT ? 140 : 60 + 80 * dd; png.data[q + 2] = esaT ? 40 : 90 + 160 * p; png.data[q + 3] = 255;
    if (p < 0.5) { png.data[q] = png.data[q + 1] = png.data[q + 2] = 235; } }
  fs.writeFileSync(path.join(ULOS, `vesi-${NIMI}-esikatselu.png`), PNG.sync.write(png)); }
loki('valmis', path.join(ULOS, `vesi-${NIMI}.bytes`), (vb.length / 1e6).toFixed(1), 'Mt');
