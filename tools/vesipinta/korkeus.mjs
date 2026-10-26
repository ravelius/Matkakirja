#!/usr/bin/env node
// KORKEUS (Karttaseppä 8.10.2026; PT: pallon kehystys ja vapaan lennon törmäys lukivat korkeuden Googlen laatoista
// (SampleHeightMostDetailed) = ehtojen vastaista mittausta. Korvaus omalla korkeusdatalla).
// Tulos ENU-ruudukkoina samasta origosta kuin vesi ja reitit; arvo = ellipsoidikorkeus (WGS84), joten sama koordinaatisto kuin Googlen laatat:
//   korkeus-<nimi>-<osa>.png  16-bit harmaa: (h − pohja_m) × 10 (dm); 0 = ei dataa. Ylin rivi = pohjoisin.
//   korkeus-<nimi>.json       origo, osat (ruutu, koko, pohja, kulma), lähde, tarkkuus, krediitti.
// Lähteet: --lahde ign  (Ranska: IGN LiDAR HD MNS + MNT WMS-R, raakakorkeus float32, NGF-IGN69 → RAF20-geoidi; Etalab 2.0)
//          --lahde glo  (Copernicus GLO-30 DSM, EGM2008 → EGM2008-geoidi)
//          --rakennukset <kohteet.json> (valinnainen, GLO:n päälle OSM-rakennusten korkeudet)
// Käyttö: node korkeus.mjs <kaupunki-id> --lahde ign|glo --ulos <kansio> --geoidi <tif> [--glo <kansio>] [--lista pallo-37-kaupunkia.json]
// Origo ja pysähdykset LS1:n listasta (pallo-37-kaupunkia.json).
import fs from 'node:fs';
import path from 'node:path';
import { fromFile, fromArrayBuffer } from 'geotiff';
import { PNG } from 'pngjs';

const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const LISTA = opt('lista', '/Users/Shared/Claude/proto-3d/_tyo/linssiseppa/pallo-37-kaupunkia.json'), KAUPUNKI = JSON.parse(fs.readFileSync(LISTA, 'utf8')).kaupungit.find((k) => k.id === pos[0]);
if (!KAUPUNKI) throw new Error('kaupunkia ei listassa: ' + pos[0]);
const NIMI = KAUPUNKI.id, lat0 = KAUPUNKI.lat, lon0 = KAUPUNKI.lon, LAHDE = opt('lahde', 'glo'), ULOS = opt('ulos', '.');
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's', ...a);
const WA = 6378137, WF = 1 / 298.257223563, WE2 = WF * (2 - WF), rad = Math.PI / 180, sl0 = Math.sin(lat0 * rad);
const Nr = WA / Math.sqrt(1 - WE2 * sl0 * sl0), Mr = Nr * (1 - WE2) / (1 - WE2 * sl0 * sl0);
const latN = (n) => lat0 + (n / Mr) / rad, lonE = (e) => lon0 + (e / (Nr * Math.cos(lat0 * rad))) / rad;
const nLat = (lat) => (lat - lat0) * rad * Mr, eLon = (lon) => (lon - lon0) * rad * Nr * Math.cos(lat0 * rad);
// LS1 8.10.: lähiruutu = pysähdysten rajauslaatikko + 1 km (+ pysähdyksen koko); kauko = 30 km keskustan ympäri ∪ lähi
const kx = KAUPUNKI.kohteet.map((k) => eLon(k.lon)), ky = KAUPUNKI.kohteet.map((k) => nLat(k.lat)), kr = KAUPUNKI.kohteet.map((k) => (k.koko_m || 0) / 2);
const lahiR = [Math.min(...kx.map((x, i) => x - kr[i])) - 1000, Math.min(...ky.map((y, i) => y - kr[i])) - 1000, Math.max(...kx.map((x, i) => x + kr[i])) + 1000, Math.max(...ky.map((y, i) => y + kr[i])) + 1000];
const kaukoR = [Math.min(-15000, lahiR[0]), Math.min(-15000, lahiR[1]), Math.max(15000, lahiR[2]), Math.max(15000, lahiR[3])];
const RAK = opt('rakennukset') ? JSON.parse(fs.readFileSync(opt('rakennukset'), 'utf8')).rakennukset : null;
const OSAT = LAHDE === 'ign' ? [{ n: 'lahi', r: lahiR, m: 2 }, { n: 'kauko', r: kaukoR, m: 10 }] : RAK ? [{ n: 'lahi', r: lahiR, m: 2 }, { n: 'kauko', r: kaukoR, m: 30 }] : [{ n: 'kauko', r: kaukoR, m: 30 }];

// --- geoidi (bilineaarinen, pikselin keskipisteet) ---
async function geoidiLukija(polku, bb) {
  const im = await (await fromFile(polku)).getImage(), [gx0, gy0, gx1, gy1] = im.getBoundingBox(), w = im.getWidth(), h = im.getHeight(), rx = (gx1 - gx0) / w, ry = (gy1 - gy0) / h;
  const c0 = Math.max(0, Math.floor((bb[0] - gx0) / rx) - 2), c1 = Math.min(w, Math.ceil((bb[2] - gx0) / rx) + 2), r0 = Math.max(0, Math.floor((gy1 - bb[3]) / ry) - 2), r1 = Math.min(h, Math.ceil((gy1 - bb[1]) / ry) + 2);
  const [d] = await im.readRasters({ window: [c0, r0, c1, r1] }), W = c1 - c0;
  return (lon, lat) => { const x = (lon - gx0) / rx - 0.5 - c0, y = (gy1 - lat) / ry - 0.5 - r0, x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a, b) => d[b * W + a];
    return (v(x0, y0) * (1 - fx) + v(x0 + 1, y0) * fx) * (1 - fy) + (v(x0, y0 + 1) * (1 - fx) + v(x0 + 1, y0 + 1) * fx) * fy; };
}

// --- IGN WMS-R: lat/lon-ikkuna → float32-ruudukko ---
const IGN = 'https://data.geopf.fr/wms-r?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=normal&CRS=EPSG:4326&FORMAT=image/geotiff';
async function ignIkkuna(kerros, la0, lo0, la1, lo1, w, h) {
  for (let yritys = 1; ; yritys++) {
    try { const r = await fetch(`${IGN}&LAYERS=${kerros}&BBOX=${la0},${lo0},${la1},${lo1}&WIDTH=${w}&HEIGHT=${h}`); if (!r.ok) throw new Error('HTTP ' + r.status);
      const ab = await r.arrayBuffer(), [d] = await (await (await fromArrayBuffer(ab)).getImage()).readRasters(); return d; }
    catch (e) { if (yritys >= 5) throw e; await new Promise((s) => setTimeout(s, 3000 * yritys)); }
  }
}
// --- GLO-30 ---
async function gloLukija(kansio, bb) {
  const ruudut = [];
  for (let la = Math.floor(bb[1]); la <= Math.floor(bb[3]); la++) for (let lo = Math.floor(bb[0]); lo <= Math.floor(bb[2]); lo++) {
    const nimi = `Copernicus_DSM_COG_10_${la >= 0 ? 'N' : 'S'}${String(Math.abs(la)).padStart(2, '0')}_00_${lo >= 0 ? 'E' : 'W'}${String(Math.abs(lo)).padStart(3, '0')}_00_DEM.tif`, p = path.join(kansio, nimi);
    if (!fs.existsSync(p)) continue;
    const im = await (await fromFile(p)).getImage(), [ox, oy0, ox1, oy] = im.getBoundingBox(), w = im.getWidth(), h = im.getHeight(), rx = (ox1 - ox) / w, ry = (oy - oy0) / h;
    const c0 = Math.max(0, Math.floor((bb[0] - ox) / rx) - 2), c1 = Math.min(w, Math.ceil((bb[2] - ox) / rx) + 2), r0 = Math.max(0, Math.floor((oy - bb[3]) / ry) - 2), r1 = Math.min(h, Math.ceil((oy - bb[1]) / ry) + 2);
    if (c1 <= c0 || r1 <= r0) continue; const [d] = await im.readRasters({ window: [c0, r0, c1, r1] }); ruudut.push({ x0: ox + c0 * rx, y0: oy - r0 * ry, rx, ry, w: c1 - c0, h: r1 - r0, d });
  }
  // ruudun reunalla lähin pikseli (saumat ruutujen välissä)
  return (lon, lat) => { for (const t of ruudut) { const x = (lon - t.x0) / t.rx - 0.5, y = (t.y0 - lat) / t.ry - 0.5, x0 = Math.floor(x), y0 = Math.floor(y);
    if (x0 >= -1 && y0 >= -1 && x0 < t.w && y0 < t.h) { const fx = x - x0, fy = y - y0, v = (a, b) => t.d[Math.min(t.h - 1, Math.max(0, b)) * t.w + Math.min(t.w - 1, Math.max(0, a))]; return (v(x0, y0) * (1 - fx) + v(x0 + 1, y0) * fx) * (1 - fy) + (v(x0, y0 + 1) * (1 - fx) + v(x0 + 1, y0 + 1) * fx) * fy; } } return NaN; };
}

const meta = { kohde: NIMI, origo: { lat: lat0, lon: lon0, ellipsoidikorkeus_m: 0 }, arvo: '16-bit: (ellipsoidikorkeus − pohja_m) × 10, eli dm; 0 = ei dataa', rivit: 'ylin rivi = pohjoisin; pikseli (i, r) → x = kulma.x + (i + 0,5)·ruutu, y = kulma.y + (H − 1 − r + 0,5)·ruutu (ENU m)', osat: [] };
for (const osa of OSAT) {
  const C = osa.m, X0 = Math.floor(osa.r[0] / C) * C, Y0 = Math.floor(osa.r[1] / C) * C, W = Math.ceil((osa.r[2] - X0) / C), HH = Math.ceil((osa.r[3] - Y0) / C);
  const bb = [lonE(X0 - 500), latN(Y0 - 500), lonE(X0 + W * C + 500), latN(Y0 + HH * C + 500)];
  const kerrokset = LAHDE === 'ign' ? [['pinta', 'IGNF_LIDAR-HD_MNS_ELEVATION.ELEVATIONGRIDCOVERAGE.WGS84G']] : [['pinta', null]]; // LS1: maa-png tarpeeton
  const geoidi = await geoidiLukija(opt('geoidi'), bb);
  for (const [laji, kerros] of kerrokset) {
    const H = new Float32Array(W * HH).fill(NaN);
    if (LAHDE === 'ign') { // palat 1024 × 1024 ruutua, haetaan lat/lon-ikkunana samalla tiheydellä ja näytteistetään bilineaarisesti
      const P = 1000;
      for (let pj = 0; pj < HH; pj += P) for (let pi = 0; pi < W; pi += P) {
        const i1 = Math.min(W, pi + P), j1 = Math.min(HH, pj + P), m = 3, e0 = X0 + (pi - m) * C, e1 = X0 + (i1 + m) * C, n0 = Y0 + (pj - m) * C, n1 = Y0 + (j1 + m) * C;
        const la0 = latN(n0), la1 = latN(n1), lo0 = lonE(e0), lo1 = lonE(e1), w = i1 - pi + 2 * m, h = j1 - pj + 2 * m;
        const d = await ignIkkuna(kerros, la0, lo0, la1, lo1, w, h);
        for (let j = pj; j < j1; j++) for (let i = pi; i < i1; i++) {
          const e = X0 + (i + 0.5) * C, n = Y0 + (j + 0.5) * C, lat = latN(n), lon = lonE(e);
          const x = (lon - lo0) / (lo1 - lo0) * w - 0.5, y = (la1 - lat) / (la1 - la0) * h - 0.5, x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a, b) => d[Math.min(h - 1, Math.max(0, b)) * w + Math.min(w - 1, Math.max(0, a))];
          const z = (v(x0, y0) * (1 - fx) + v(x0 + 1, y0) * fx) * (1 - fy) + (v(x0, y0 + 1) * (1 - fx) + v(x0 + 1, y0 + 1) * fx) * fy;
          if (z > -100 && z < 9000) H[j * W + i] = z + geoidi(lon, lat);
        }
        loki(osa.n, laji, `pala ${pj / P},${pi / P}`);
      }
    } else {
      const glo = await gloLukija(opt('glo'), bb);
      for (let j = 0; j < HH; j++) for (let i = 0; i < W; i++) { const lat = latN(Y0 + (j + 0.5) * C), lon = lonE(X0 + (i + 0.5) * C), z = glo(lon, lat); if (Number.isFinite(z) && z > -500) H[j * W + i] = z + geoidi(lon, lat); } // −500: aidot kaivokset säilyvät (Sevilla)
      if (RAK && osa.n === 'lahi') { // OSM-rakennukset: maa ≈ GLO-30:n minimi 90 m:n ikkunassa, katto = maa + korkeus; solussa max(GLO, katto)
        const maa = (lon, lat) => { let m = 1e9; const dl = 30 / (Nr * Math.cos(lat0 * rad)) / rad, dn = 30 / Mr / rad; for (const a of [-1, 0, 1]) for (const b of [-1, 0, 1]) { const z = glo(lon + a * dl, lat + b * dn); if (Number.isFinite(z) && z > -50 && z < m) m = z; } return m; };
        let solut = 0;
        for (const rk of RAK) { const r = rk.r; let y0 = 1e9, y1 = -1e9; for (const [, y] of r) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
          const j0 = Math.max(0, Math.ceil((y0 - Y0) / C - 0.5)), j1 = Math.min(HH - 1, Math.floor((y1 - Y0) / C - 0.5)); if (j1 < j0) continue;
          const cx = r.reduce((a, q) => a + q[0], 0) / r.length, cy = r.reduce((a, q) => a + q[1], 0) / r.length, la = latN(cy), lo = lonE(cx), katto = maa(lo, la) + rk.h + geoidi(lo, la);
          for (let j = j0; j <= j1; j++) { const y = Y0 + (j + 0.5) * C, xs = [];
            for (let k = 0; k < r.length - 1; k++) { const [ax, ay] = r[k], [bx, by] = r[k + 1]; if ((ay <= y) !== (by <= y)) xs.push(ax + (y - ay) / (by - ay) * (bx - ax)); }
            xs.sort((a, b) => a - b);
            for (let k = 0; k + 1 < xs.length; k += 2) { const i0 = Math.max(0, Math.ceil((xs[k] - X0) / C - 0.5)), i1 = Math.min(W - 1, Math.floor((xs[k + 1] - X0) / C - 0.5));
              for (let i = i0; i <= i1; i++) { const c = j * W + i; if (!(H[c] >= katto)) { H[c] = katto; solut++; } } } } }
        osa.rakennussoluja = solut; loki('rakennukset', RAK.length, 'kpl, soluja nostettu', solut);
      }
    }
    if (LAHDE === 'ign' && opt('glo')) { // LiDAR HD -aukot: GLO-30 + EGM2008 (täyttö kirjataan jsoniin)
      let aukkoja = 0; for (const z of H) if (Number.isNaN(z)) aukkoja++;
      if (aukkoja) { const glo = await gloLukija(opt('glo'), bb), eg = await geoidiLukija(opt('geoidi2', 'lahteet/us_nga_egm08_25.tif'), bb);
        for (let j = 0; j < HH; j++) for (let i = 0; i < W; i++) { const k = j * W + i; if (!Number.isNaN(H[k])) continue; const lat = latN(Y0 + (j + 0.5) * C), lon = lonE(X0 + (i + 0.5) * C), z = glo(lon, lat); if (Number.isFinite(z) && z > -500) H[k] = z + eg(lon, lat); }
        osa.taytetty_glo = aukkoja; loki(osa.n, 'GLO-täyttö', aukkoja); }
    }
    { // jäljelle jääneet aukot naapurien keskiarvolla (enintään 30 kierrosta)
      let jaljella = 0; for (const z of H) if (Number.isNaN(z)) jaljella++; osa.naapuritaytto = 0;
      for (let k = 0; k < 30 && jaljella; k++) { const U = H.slice(); jaljella = 0;
        for (let j = 0; j < HH; j++) for (let i = 0; i < W; i++) { const c = j * W + i; if (!Number.isNaN(H[c])) continue; let s2 = 0, n2 = 0;
          for (const [a, b] of [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]]) { if (a < 0 || b < 0 || a >= W || b >= HH) continue; const v = H[b * W + a]; if (!Number.isNaN(v)) { s2 += v; n2++; } }
          if (n2) { U[c] = s2 / n2; osa.naapuritaytto++; } else jaljella++; }
        H.set(U); } }
    let mn = 1e9, mx = -1e9, puuttuu = 0; for (const z of H) { if (Number.isNaN(z)) { puuttuu++; continue; } if (z < mn) mn = z; if (z > mx) mx = z; }
    const pohja = Math.floor(mn) - 1, png = new PNG({ width: W, height: HH, bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false });
    const d16 = new Uint16Array(W * HH); for (let j = 0; j < HH; j++) for (let i = 0; i < W; i++) { const z = H[j * W + i]; d16[(HH - 1 - j) * W + i] = Number.isNaN(z) ? 0 : Math.max(1, Math.min(65535, Math.round((z - pohja) * 10))); }
    png.data = Buffer.from(d16.buffer);
    const tied = `${laji === 'maa' ? 'maa' : 'korkeus'}-${NIMI}-${osa.n}.png`;
    fs.mkdirSync(ULOS, { recursive: true }); fs.writeFileSync(path.join(ULOS, tied), PNG.sync.write(png, { bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false }));
    meta.osat.push({ osa: osa.n, laji: laji === 'maa' ? 'maanpinta (DTM)' : 'pintamalli (DSM, rakennukset mukana)', tiedosto: tied, ruutu_m: C, koko: [W, HH], kulma: { x: X0, y: Y0 }, pohja_m: pohja, min_m: +mn.toFixed(2), max_m: +mx.toFixed(2), puuttuu, ...(osa.naapuritaytto ? { naapuritaytto: osa.naapuritaytto } : {}), ...(osa.rakennussoluja ? { osm_rakennussoluja: osa.rakennussoluja } : {}), ...(osa.taytetty_glo ? { taytetty_glo30: osa.taytetty_glo } : {}) });
    loki(tied, `${W}×${HH}`, 'min', mn.toFixed(1), 'max', mx.toFixed(1), 'puuttuu', puuttuu, (fs.statSync(path.join(ULOS, tied)).size / 1e6).toFixed(1), 'Mt');
  }
}
meta.lahde = LAHDE === 'ign' ? 'IGN LiDAR HD MNS ja MNT (data.geopf.fr WMS-R, raakakorkeus), korkeus NGF-IGN69 → ellipsoidi RAF20-geoidilla (PROJ fr_ign_RAF20)' : 'Copernicus GLO-30 DSM, EGM2008 → ellipsoidi EGM2008-geoidilla (PROJ us_nga_egm08_25)';
meta.tarkkuus = LAHDE === 'ign' ? 'LiDAR HD: korkeus noin ±0,1–0,3 m (pinta), näytteistys 2 m / 10 m; geoidi RAF20 ±0,02 m' : 'GLO-30: absoluuttinen noin ±2–4 m, 30 m ruutu, rakennukset ja puut osittain mukana (DSM)';
meta.krediitti = LAHDE === 'ign' ? 'Korkeus: © IGN – LiDAR HD (Licence Ouverte Etalab 2.0)' : (RAK ? 'Rakennukset: © OpenStreetMap contributors (ODbL); ' : '') + 'Korkeus: Copernicus GLO-30 © DLR e.V. 2010–2014 ja © Airbus Defence and Space GmbH 2014–2018, Copernicus-ohjelma (EU/ESA)';
meta.luotu = new Date().toISOString();
fs.writeFileSync(path.join(ULOS, `korkeus-${NIMI}.json`), JSON.stringify(meta, null, 2));
loki('valmis');
