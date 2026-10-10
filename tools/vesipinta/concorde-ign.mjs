#!/usr/bin/env node
// CONCORDE-IGN (Karttaseppä 9.10.2026; LS2/LR: Concorden oma malli, ei mitään Googlesta).
// IGN Géoplateforme WMS-R (Licence Ouverte Etalab 2.0):
//   ortokuva ORTHOIMAGERY.ORTHOPHOTOS2021 (Pariisin viimeisin ennen kesän 2024 rakennelmia), 0,2 m/px
//   RGE ALTI 1 m (ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES, terrainrgb-dekoodaus), LiDAR HD MNT ja MNS 0,5 m (raakakorkeus)
//   korkeudet NGF-IGN69; ellipsoidikorkeus = NGF + RAF20-geoidi (PROJ fr_ign_RAF20), N kirjataan jsoniin.
// Käyttö: node concorde-ign.mjs <lat> <lon> <sivu_m> --ulos <kansio> --geoidi <fr_ign_RAF20.tif>
import fs from 'node:fs';
import path from 'node:path';
import { fromArrayBuffer, fromFile } from 'geotiff';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';

const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const NIMI = opt('nimi', 'concorde'), ORTO = opt('orto-kerros', 'ORTHOIMAGERY.ORTHOPHOTOS2021'), ORTOV = +opt('orto-vuosi', 2021);
const [LAT, LON, SIVU] = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--'))).map(Number), ULOS = opt('ulos', '.');
const mLat = 111320, cl = Math.cos(LAT * Math.PI / 180), dLat = SIVU / 2 / mLat, dLon = SIVU / 2 / (mLat * cl);
const BB = [LAT - dLat, LON - dLon, LAT + dLat, LON + dLon];
const WMS = 'https://data.geopf.fr/wms-r?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&CRS=EPSG:4326';
const hae = async (url) => { for (let k = 1; ; k++) { try { const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return Buffer.from(await r.arrayBuffer()); } catch (e) { if (k >= 5) throw e; await new Promise((s) => setTimeout(s, 2000 * k)); } } };
fs.mkdirSync(ULOS, { recursive: true });
const meta = { origo: { lat: LAT, lon: LON }, sivu_m: SIVU, bbox_latlon: BB, lisenssi: 'IGN, Licence Ouverte Etalab 2.0 (data.geopf.fr)', haettu: new Date().toISOString(), tiedostot: {} };

// 1) ortokuva paloittain (1500 px) → yksi JPEG
{ const RES = 0.2, N = Math.round(SIVU / RES), P = 1500, kuva = Buffer.alloc(N * N * 4);
  for (let py = 0; py < N; py += P) for (let px = 0; px < N; px += P) {
    const w = Math.min(P, N - px), h = Math.min(P, N - py);
    const la1 = BB[2] - (py / N) * 2 * dLat, la0 = BB[2] - ((py + h) / N) * 2 * dLat, lo0 = BB[1] + (px / N) * 2 * dLon, lo1 = BB[1] + ((px + w) / N) * 2 * dLon;
    const buf = await hae(`${WMS}&LAYERS=${ORTO}&STYLES=&BBOX=${la0},${lo0},${la1},${lo1}&WIDTH=${w}&HEIGHT=${h}&FORMAT=image/png`);
    const im = PNG.sync.read(buf);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const s = (y * w + x) * 4, d = ((py + y) * N + px + x) * 4; kuva[d] = im.data[s]; kuva[d + 1] = im.data[s + 1]; kuva[d + 2] = im.data[s + 2]; kuva[d + 3] = 255; }
    console.log('orto pala', px, py);
  }
  fs.writeFileSync(path.join(ULOS, `${NIMI}-orto-${ORTOV}-20cm.jpg`), jpeg.encode({ data: kuva, width: N, height: N }, 92).data);
  meta.tiedostot.orto = { tiedosto: `${NIMI}-orto-${ORTOV}-20cm.jpg`, kerros: 'ORTHOIMAGERY.ORTHOPHOTOS2021', kuvausvuosi: 2021, px: N, m_per_px: RES, rivi0: 'ylin rivi = pohjoisin, vasen sarake = läntisin (lat/lon-ruudukko bbox_latlon)' }; }

// 2) korkeudet: geoidi keskeltä
const gim = await (await fromFile(opt('geoidi'))).getImage(), [gx0, gy0, gx1, gy1] = gim.getBoundingBox(), gw = gim.getWidth(), gh = gim.getHeight();
const gc = Math.floor((LON - gx0) / ((gx1 - gx0) / gw)), gr = Math.floor((gy1 - LAT) / ((gy1 - gy0) / gh)), [gd] = await gim.readRasters({ window: [gc, gr, gc + 1, gr + 1] });
meta.geoidi_RAF20_N_m = +gd[0].toFixed(3); meta.korkeus = 'NGF-IGN69 (m); ellipsoidikorkeus (WGS84/RGF93) = NGF + geoidi_RAF20_N_m';
async function korkeus(nimi, kerros, tyyli, res) {
  const N = Math.round(SIVU / res);
  const buf = await hae(`${WMS}&LAYERS=${kerros}&STYLES=${tyyli}&BBOX=${BB[0]},${BB[1]},${BB[2]},${BB[3]}&WIDTH=${N}&HEIGHT=${N}&FORMAT=${tyyli === 'terrainrgb' ? 'image/png' : 'image/geotiff'}`);
  let z;
  if (tyyli === 'terrainrgb') { const im = PNG.sync.read(buf); z = new Float32Array(N * N); for (let k = 0; k < N * N; k++) z[k] = -10000 + (im.data[k * 4] * 65536 + im.data[k * 4 + 1] * 256 + im.data[k * 4 + 2]) * 0.1; }
  else { const [d] = await (await (await fromArrayBuffer(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length))).getImage()).readRasters(); z = Float32Array.from(d); }
  let mn = 1e9, mx = -1e9; for (const v of z) { if (v < -100 || v > 9000) continue; mn = Math.min(mn, v); mx = Math.max(mx, v); }
  const pohja = Math.floor(mn) - 1, png = new PNG({ width: N, height: N, bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false }), d16 = new Uint16Array(N * N);
  for (let k = 0; k < N * N; k++) d16[k] = z[k] < -100 || z[k] > 9000 ? 0 : Math.max(1, Math.round((z[k] - pohja) * 100)); // cm
  png.data = Buffer.from(d16.buffer);
  fs.writeFileSync(path.join(ULOS, `${NIMI}-${nimi}.png`), PNG.sync.write(png, { bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false }));
  fs.writeFileSync(path.join(ULOS, `${NIMI}-${nimi}.f32`), Buffer.from(z.buffer));
  meta.tiedostot[nimi] = { png16: `${NIMI}-${nimi}.png`, f32: `${NIMI}-${nimi}.f32`, kerros, px: N, m_per_px: res, arvo_png16: 'NGF = pohja_m + arvo/100 (cm), 0 = ei dataa', f32: 'float32 LE, NGF m, rivi0 pohjoisin', pohja_m: pohja, min_ngf: +mn.toFixed(2), max_ngf: +mx.toFixed(2) };
  console.log(nimi, N, 'min', mn.toFixed(2), 'max', mx.toFixed(2));
}
await korkeus('rgealti-1m', 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES', 'terrainrgb', 1);
await korkeus('lidarhd-mnt-50cm', 'IGNF_LIDAR-HD_MNT_ELEVATION.ELEVATIONGRIDCOVERAGE.WGS84G', 'normal', 0.5);
await korkeus('lidarhd-mns-50cm', 'IGNF_LIDAR-HD_MNS_ELEVATION.ELEVATIONGRIDCOVERAGE.WGS84G', 'normal', 0.5);
meta.krediitti = `Ortokuva ja korkeudet: © IGN – BD ORTHO ${ORTOV}, RGE ALTI, LiDAR HD (Licence Ouverte Etalab 2.0)`;
fs.writeFileSync(path.join(ULOS, `${NIMI}-ign.json`), JSON.stringify(meta, null, 2));
console.log('valmis', JSON.stringify({ geoidi: meta.geoidi_RAF20_N_m }));
