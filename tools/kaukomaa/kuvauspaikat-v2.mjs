// ISS-KAMERAN KUVAUSPAIKAT v2 (Karttaseppä 4.10.2026; omistajan päätös 4.10. 11.44: kameranappi tekee tarkan ISS-kuvan
// kuvauspaikoista). Yksi kuva / paikka: 20 × 20 km, 2048 × 2048 px (≈ 9,8 m/px), WGS84-bbox keskipisteen ympäri, S2 L2A
// kesämediaani 2022–2025 (10 näkymää / MGRS-ruutu), BOA-offset MITATAAN (v2d). Tuotos ULOS/<tunniste>.jpg + kuvauspaikat.json.
// PAIKAT=helsinki nice -n 15 node --max-old-space-size=8000 kuvauspaikat-v2.mjs
// ISS-kameran kuvauspaikat v1 (Karttaseppä 1.10.2026, Linssiseppä 2:n pilotti): sama S2 L2A -kesämediaani, näkymävalinta,
// sävytys, vesisiirrot ja avomeren käsittely kuin s2-eurooppa/v1:ssä (euromosaiikki.mjs), paikkakohtaisina laattapaketteina:
// reunus z11–z12 (±0,95° lat × ±1,5° lon), keskusta z13 (±0,25° × ±0,40°), rajattu jako z11-juuresta. GLO-30 DEM erikseen (NAS).
// PAIKAT=helsinki,mont-blanc nice -n 15 node --max-old-space-size=8000 kuvauspaikat.mjs
// nice -n 15 node paketti.mjs
import { fromUrl, fromFile, writeArrayBuffer } from 'geotiff';
import proj4 from 'proj4';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import fs from 'node:fs';

const DEM_KANSIO = '/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30';
const STAC = 'https://earth-search.aws.element84.com/v1/search';
// ensisijainen ylilento ensin; myöhemmät paikkaavat vain aukot (väri sovitetaan päällekkäisalueella)
const VALOTUS = 3.0;
const KELPO = new Set([2, 4, 5, 6]); // SCL: tumma, kasvi, paljas, vesi (kesällä ei lunta; 7 = luokittelematon = usein pilven reuna)
const t0 = Date.now();
const loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(0).padStart(5) + 's', ...a);

// --- sävytys (sama kuin s2koe) ---
function savyF(r) {
  const x = Math.max(0, r) * VALOTUS;
  const y = x < 0.6 ? x : 0.6 + 0.4 * (1 - Math.exp(-(x - 0.6) / 0.4));
  const l = Math.min(1, y);
  return Math.round((l <= 0.0031308 ? 12.92 * l : 1.055 * Math.pow(l, 1 / 2.4) - 0.055) * 255);
}
const SAVY = new Uint8Array(20001); // heijastus 0..2 askelin 1e-4
for (let i = 0; i <= 20000; i++) SAVY[i] = savyF(i / 10000);
const savy = (r) => SAVY[Math.min(20000, Math.max(0, Math.round(r * 10000)))];
const KAANT = new Float32Array(256); // tavu → keskimääräinen heijastus
{ const s = new Float64Array(256), n = new Float64Array(256); for (let i = 0; i <= 20000; i++) { s[SAVY[i]] += i / 10000; n[SAVY[i]]++; } for (let v = 0; v < 256; v++) KAANT[v] = n[v] ? s[v] / n[v] : (v ? KAANT[v - 1] : 0); }

// --- Web Mercator ---
const lonX = (lon, z) => ((lon + 180) / 360) * 2 ** z;
const latY = (lat, z) => { const f = (lat * Math.PI) / 180; return ((1 - Math.asinh(Math.tan(f)) / Math.PI) / 2) * 2 ** z; };
const xLon = (x, z) => (x / 2 ** z) * 360 - 180;
const yLat = (y, z) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 2 ** z))) * 180) / Math.PI;

function kangas(z, tx0, ty0, ntx, nty) {
  const W = ntx * 256, H = nty * 256;
  const k = { z, tx0, ty0, ntx, nty, W, H, rgb: new Uint8Array(W * H * 3), vesi: new Uint8Array(W * H), tila: new Uint8Array(W * H), lon: new Float64Array(W), lat: new Float64Array(H) };
  for (let x = 0; x < W; x++) k.lon[x] = xLon(tx0 + (x + 0.5) / 256, z);
  for (let y = 0; y < H; y++) k.lat[y] = yLat(ty0 + (y + 0.5) / 256, z);
  return k;
}
function kangasBboxista(b, z) {
  const tx0 = Math.floor(lonX(b[0], z)), tx1 = Math.floor(lonX(b[2], z));
  const ty0 = Math.floor(latY(b[3], z)), ty1 = Math.floor(latY(b[1], z));
  return kangas(z, tx0, ty0, tx1 - tx0 + 1, ty1 - ty0 + 1);
}

async function haeItemit(paiva, sat, bbox, tiilet) {
  const r = await fetch(STAC, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collections: ['sentinel-2-l2a'], bbox, datetime: `${paiva}T00:00:00Z/${paiva}T23:59:59Z`, limit: 100 }) });
  return (await r.json()).features.filter((f) => f.id.startsWith(sat) && (!tiilet || tiilet.includes(f.id.split('_')[1]))).sort((a, b) => a.properties['eo:cloud_cover'] - b.properties['eo:cloud_cover']);
}

async function lueIkkuna(href, ov, w) {
  for (let yritys = 1; ; yritys++) {
    try { return await lueIkkuna1(href, ov, w); } catch (e) {
      if (yritys >= 5) throw e;
      loki('uusinta', yritys, href.split('/').slice(-2).join('/'), e.cause?.code || e.message);
      await new Promise((r) => setTimeout(r, 3000 * yritys));
    }
  }
}
async function lueIkkuna1(href, ov, w) {
  const im = await (await fromUrl(href, { blockSize: 1 << 21 })).getImage(ov);
  const W = im.getWidth(), H = im.getHeight();
  const ww = [Math.max(0, w[0]), Math.max(0, w[1]), Math.min(W, w[2]), Math.min(H, w[3])];
  if (ww[2] <= ww[0] || ww[3] <= ww[1]) return null;
  const [a] = await im.readRasters({ window: ww, samples: [0] });
  return { a, x0: ww[0], y0: ww[1], w: ww[2] - ww[0], h: ww[3] - ww[1] };
}
function bilin(r, fx, fy) {
  const x = fx - r.x0, y = fy - r.y0, i = Math.floor(x), j = Math.floor(y);
  if (i < 0 || j < 0 || i + 1 >= r.w || j + 1 >= r.h) return 0;
  const u = x - i, v = y - j, p = j * r.w + i, a = r.a;
  if (!a[p] || !a[p + 1] || !a[p + r.w] || !a[p + r.w + 1]) return 0;
  return (a[p] * (1 - u) + a[p + 1] * u) * (1 - v) + (a[p + r.w] * (1 - u) + a[p + r.w + 1] * u) * v;
}
function lahin(r, fx, fy) {
  const i = Math.round(fx - r.x0), j = Math.round(fy - r.y0);
  return i < 0 || j < 0 || i >= r.w || j >= r.h ? 0 : r.a[j * r.w + i];
}

const RAMPPI_M = 8000, VARAPAINO = 1e-4;
// Pikselietäisyys (chamfer 3-4, katto) tiukan maskin reunasta.
function etaisyys(maski, W, H, katto) {
  const d = new Uint16Array(W * H), K = Math.min(65000, katto * 3);
  for (let i = 0; i < W * H; i++) d[i] = maski[i] ? K : 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!d[i]) continue;
    let m = d[i];
    if (x > 0) m = Math.min(m, d[i - 1] + 3);
    if (y > 0) { m = Math.min(m, d[i - W] + 3); if (x > 0) m = Math.min(m, d[i - W - 1] + 4); if (x < W - 1) m = Math.min(m, d[i - W + 1] + 4); }
    d[i] = m;
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; if (!d[i]) continue;
    let m = d[i];
    if (x < W - 1) m = Math.min(m, d[i + 1] + 3);
    if (y < H - 1) { m = Math.min(m, d[i + W] + 3); if (x < W - 1) m = Math.min(m, d[i + W + 1] + 4); if (x > 0) m = Math.min(m, d[i + W - 1] + 4); }
    d[i] = m;
  }
  return d; // yksikkö 1/3 px
}

function puolita(k) {
  const tx0 = Math.floor(k.tx0 / 2), ty0 = Math.floor(k.ty0 / 2);
  const n = kangas(k.z - 1, tx0, ty0, Math.floor((k.tx0 + k.ntx - 1) / 2) - tx0 + 1, Math.floor((k.ty0 + k.nty - 1) / 2) - ty0 + 1);
  const ox = k.tx0 * 256 - tx0 * 512, oy = k.ty0 * 256 - ty0 * 512; // vanhan kankaan alku uuden 2× -koordinaateissa
  for (let y = 0; y < n.H; y++) for (let x = 0; x < n.W; x++) {
    let r = 0, g = 0, b = 0, v = 0, m = 0;
    for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
      const X = 2 * x + dx - ox, Y = 2 * y + dy - oy;
      if (X < 0 || Y < 0 || X >= k.W || Y >= k.H) continue;
      const i = Y * k.W + X; if (!k.tila[i]) continue;
      r += k.rgb[i * 3]; g += k.rgb[i * 3 + 1]; b += k.rgb[i * 3 + 2]; v += k.vesi[i]; m++;
    }
    if (!m) continue;
    const i = y * n.W + x;
    n.rgb[i * 3] = Math.round(r / m); n.rgb[i * 3 + 1] = Math.round(g / m); n.rgb[i * 3 + 2] = Math.round(b / m);
    n.vesi[i] = Math.round(v / m); n.tila[i] = 1;
  }
  return n;
}
function liita(kohde, lahde) { // lahde samalla tasolla, täytetyt pikselit korvaavat
  const ox = (lahde.tx0 - kohde.tx0) * 256, oy = (lahde.ty0 - kohde.ty0) * 256;
  for (let y = 0; y < lahde.H; y++) for (let x = 0; x < lahde.W; x++) {
    const i = y * lahde.W + x; if (!lahde.tila[i]) continue;
    const X = x + ox, Y = y + oy; if (X < 0 || Y < 0 || X >= kohde.W || Y >= kohde.H) continue;
    const j = Y * kohde.W + X;
    kohde.rgb.set(lahde.rgb.subarray(i * 3, i * 3 + 3), j * 3); kohde.vesi[j] = lahde.vesi[i]; kohde.tila[j] = lahde.tila[i];
  }
}
function esikatselu(k, polku) {
  const rgba = Buffer.alloc(k.W * k.H * 4);
  for (let i = 0; i < k.W * k.H; i++) { rgba[i * 4] = k.rgb[i * 3]; rgba[i * 4 + 1] = k.rgb[i * 3 + 1]; rgba[i * 4 + 2] = k.rgb[i * 3 + 2]; rgba[i * 4 + 3] = 255; }
  fs.writeFileSync(polku, jpeg.encode({ data: rgba, width: k.W, height: k.H }, 88).data);
}


// ===================== Euroopan kesämosaiikki (mediaani), Z6-lohkoittain =====================
const NAKYMIA = 10, VUODET = [2022, 2023, 2024, 2025], MERIRAMPPI_M = 20000;
const MERI = [48, 64, 85]; // avomeren väri S2-kattavuuden ulkopuolella (Alppikokeen Ligurianmeren mediaani)
const rajoita = async (n, tehtavat) => { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < tehtavat.length) { const j = i++; await tehtavat[j](); } })); };
async function stacSivu(body) {
  for (let yritys = 1; ; yritys++) {
    try { const r = await fetch(STAC, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); if (!r.ok) throw new Error('STAC ' + r.status); return await r.json(); } catch (e) { if (yritys >= 6) throw e; loki('STAC uusinta', yritys, e.message); await new Promise((r) => setTimeout(r, 5000 * yritys)); }
  }
}
async function mgrsTiilet(bbox) {
  const s = new Set();
  for (const kk of ['06', '07', '08']) {
    let body = { collections: ['sentinel-2-l2a'], bbox, datetime: `2024-${kk}-01T00:00:00Z/2024-${kk}-28T23:59:59Z`, limit: 100, fields: { include: ['id', 'properties.grid:code'], exclude: ['assets', 'links', 'geometry'] } };
    for (let sivu = 0; sivu < 40 && body; sivu++) {
      const j = await stacSivu(body);
      for (const f of j.features) s.add(f.properties['grid:code'] || 'MGRS-' + f.id.split('_')[1]);
      const nx = (j.links || []).find((l) => l.rel === 'next');
      body = nx && nx.body ? { ...body, ...nx.body } : null;
    }
  }
  return [...s].sort();
}
// --- BOA-offset MITATAAN (v2d 4.10.2026, tarkennus: kaikki kaistat + tummat pikselit) ---
// Earth Searchin metatieto ei riitä: käsittelyversion 04.00 näkymissä earthsearch:boa_offset_applied=false voi tarkoittaa
// kumpaa tahansa (52JGR 2/2022 DN +1000, mutta 31SET 6–7/2022 normaali). Varma = applied=true tai versio < 04.00.
// Aito offset on additiivinen ja sama (~1000 DN) kaikilla kaistoilla, myös tummimmissa pikseleissä; lumi ja pilvet eivät
// nosta vettä ja varjoja. Epävarma näkymä verrataan saman ruudun varmoihin (pienin yleiskuvataso, yhteiset datapikselit):
//  A) ruudussa tummia kohteita (varmojen 0,5 %:n persentiili < 600 kaikilla B02–B04): offset, jos epävarman tummat > viite + 600 kaikilla;
//  B) muuten (aavikko): offset, jos erotuksen mediaani > 500 kaikilla kaistoilla ja kaistojen hajonta < 500.
// Viite haetaan kaudelta STACista, jos ruudun valinnassa ei ole varmaa näkymää.
const varmaOffset = (f) => f.properties['earthsearch:boa_offset_applied'] === true || String(f.properties['s2:processing_baseline'] ?? '00') < '04.00';
const KAISTAT = ['blue', 'green', 'red'];
const YLEISKUVA = new Map();
async function yleiskuva(f) { // [B02, B03, B04] pienimmältä yleiskuvatasolta
  if (YLEISKUVA.has(f.id)) return YLEISKUVA.get(f.id);
  let d = null;
  for (let y = 1; y <= 4; y++) {
    try {
      d = await Promise.all(KAISTAT.map(async (k) => { const t = await fromUrl(f.assets[k].href); const im = await t.getImage((await t.getImageCount()) - 1); return (await im.readRasters())[0]; }));
      if (d.some((x) => x.length !== d[0].length)) d = null;
      break;
    } catch (e) { if (y === 4) { loki('offset: yleiskuva epäonnistui', f.id, e.message); break; } await new Promise((r) => setTimeout(r, 3000 * y)); }
  }
  YLEISKUVA.set(f.id, d);
  if (YLEISKUVA.size > 60) YLEISKUVA.delete(YLEISKUVA.keys().next().value);
  return d;
}
const pros = (a, q) => (a.length ? a.sort((x, y) => x - y)[Math.min(a.length - 1, Math.floor(q * a.length))] : null);
function vertaa(a, b) { // kaistoittain: erotuksen mediaani ja kummankin 0,5 %:n persentiili yhteisillä datapikseleillä
  if (!a || !b || a[0].length !== b[0].length) return null;
  const n = a[0].length, ok = [];
  for (let i = 0; i < n; i++) if (a[0][i] > 0 && a[1][i] > 0 && a[2][i] > 0 && b[0][i] > 0 && b[1][i] > 0 && b[2][i] > 0) ok.push(i);
  if (ok.length < 500) return null;
  return [0, 1, 2].map((c) => ({ ero: pros(ok.map((i) => a[c][i] - b[c][i]), 0.5), tA: pros(ok.map((i) => a[c][i]), 0.005), tB: pros(ok.map((i) => b[c][i]), 0.005) }));
}
async function maaritaOffsetit(koodi, val) {
  for (const f of val) f._offs = 0;
  const epa = val.filter((f) => !varmaOffset(f));
  if (!epa.length) return;
  let viite = val.filter(varmaOffset);
  if (!viite.length) {
    for (const dt of VUODET.map((v) => `${v}-${KAUSI_ALKU}T00:00:00Z/${v}-${KAUSI_LOPPU}T23:59:59Z`)) {
      const r = await stacSivu({ collections: ['sentinel-2-l2a'], datetime: dt, query: { 'grid:code': { eq: koodi }, 'eo:cloud_cover': { lt: 20 }, 's2:nodata_pixel_percentage': { lt: 30 } }, sortby: [{ field: 'properties.eo:cloud_cover', direction: 'asc' }], limit: 6 });
      viite.push(...r.features.filter((g) => varmaOffset(g) && /\.tif$/.test(g.assets?.red?.href || '')));
      if (viite.length >= 3) break;
    }
  }
  const vk = (await Promise.all(viite.slice(0, 4).map(yleiskuva))).filter(Boolean);
  for (const f of epa) {
    const a = await yleiskuva(f), vs = vk.map((b) => vertaa(a, b)).filter(Boolean);
    if (!vs.length) { loki('offset: ei vertailua', f.id, '→ 0'); continue; }
    const med = (c, k) => pros(vs.map((v) => v[c][k]), 0.5);
    const tA = [0, 1, 2].map((c) => med(c, 'tA')), tB = [0, 1, 2].map((c) => med(c, 'tB')), ero = [0, 1, 2].map((c) => med(c, 'ero'));
    let tapa, on;
    if (tB.every((t) => t < 600)) { tapa = 'tummat'; on = [0, 1, 2].every((c) => tA[c] - tB[c] > 600); }
    else { tapa = 'erotus'; on = ero.every((e) => e > 500) && Math.max(...ero) - Math.min(...ero) < 500; }
    f._offs = on ? 1000 : 0;
    if (on || ero.some((e) => e > 500)) loki('offset', f._offs, f.id, tapa, 'tummat', tA.join('/'), 'viite', tB.join('/'), 'erotus', ero.join('/'));
  }
}

// kauden ohitus (Helsinki 4.10.: heinä–elokuun sinilevä teki merestä nurmenvihreän → KAUSI_ALKU=05-20 KAUSI_LOPPU=06-30)
const KAUSI_ALKU = process.env.KAUSI_ALKU || '06-01', KAUSI_LOPPU = process.env.KAUSI_LOPPU || '08-31';
const NAKYMAT = new Map();
async function tiilenNakymat(koodi) {
  if (NAKYMAT.has(koodi)) return NAKYMAT.get(koodi);
  const kaikki = [];
  for (const v of VUODET) kaikki.push(...(await stacSivu({ collections: ['sentinel-2-l2a'], datetime: `${v}-${KAUSI_ALKU}T00:00:00Z/${v}-${KAUSI_LOPPU}T23:59:59Z`, query: { 'grid:code': { eq: koodi }, 'eo:cloud_cover': { lt: 30 }, 's2:nodata_pixel_percentage': { lt: 60 } }, sortby: [{ field: 'properties.eo:cloud_cover', direction: 'asc' }], limit: 8 })).features);
  const val = kaikki.filter((f) => /\.tif$/.test(f.assets?.red?.href || '')).sort((a, b) => (a.properties['eo:cloud_cover'] + a.properties['s2:nodata_pixel_percentage'] / 4) - (b.properties['eo:cloud_cover'] + b.properties['s2:nodata_pixel_percentage'] / 4)).slice(0, NAKYMIA);
  await maaritaOffsetit(koodi, val);
  NAKYMAT.set(koodi, val);
  if (NAKYMAT.size > 400) NAKYMAT.delete(NAKYMAT.keys().next().value);
  return val;
}

// Yksi MGRS-tiili kuten euromosaiikissa, mutta luetaan vain kankaan kattama ikkuna (10–20 m:n tasoilla koko tiili ei mahdu muistiin).
async function nouda(k, o, koodi, nakymat) {
  const it0 = nakymat[0], p = it0.properties, n = p['proj:epsg'] || Number(String(p['proj:code']).split(':')[1]);
  const fwd = proj4('EPSG:4326', `+proj=utm +zone=${n % 100} ${n > 32700 ? '+south ' : ''}+datum=WGS84 +units=m +no_defs`).forward;
  const t = it0.assets.red['proj:transform'], res = 10 * 2 ** o.ovB, sk = (20 * 2 ** o.ovS) / res, raja = 10980 / 2 ** o.ovB - 2;
  let [bx0, by0, bx1, by1] = it0.bbox;
  for (const it of nakymat) { bx0 = Math.min(bx0, it.bbox[0]); by0 = Math.min(by0, it.bbox[1]); bx1 = Math.max(bx1, it.bbox[2]); by1 = Math.max(by1, it.bbox[3]); }
  const cx0 = Math.max(0, Math.floor((lonX(bx0, k.z) - k.tx0) * 256)), cx1 = Math.min(k.W - 1, Math.ceil((lonX(bx1, k.z) - k.tx0) * 256));
  const cy0 = Math.max(0, Math.floor((latY(by1, k.z) - k.ty0) * 256)), cy1 = Math.min(k.H - 1, Math.ceil((latY(by0, k.z) - k.ty0) * 256));
  if (cx1 < cx0 || cy1 < cy0) return null;
  const M = (cx1 - cx0 + 1) * (cy1 - cy0 + 1);
  const eI = new Int32Array(M), eX = new Float32Array(M), eY = new Float32Array(M);
  let ne = 0, mx0 = 1e9, my0 = 1e9, mx1 = -1e9, my1 = -1e9;
  for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) {
    const [ux, uy] = fwd([k.lon[x], k.lat[y]]);
    const fx = (ux - t[2]) / res - 0.5, fy = (t[5] - uy) / res - 0.5;
    if (fx < 0 || fy < 0 || fx > raja || fy > raja) continue;
    eI[ne] = y * k.W + x; eX[ne] = fx; eY[ne] = fy; ne++;
    if (fx < mx0) mx0 = fx; if (fy < my0) my0 = fy; if (fx > mx1) mx1 = fx; if (fy > my1) my1 = fy;
  }
  if (!ne) return null;
  const w = [Math.floor(mx0) - 2, Math.floor(my0) - 2, Math.ceil(mx1) + 3, Math.ceil(my1) + 3];
  const ws = [Math.floor(w[0] / sk) - 1, Math.floor(w[1] / sk) - 1, Math.ceil(w[2] / sk) + 2, Math.ceil(w[3] / sk) + 2];
  const K = nakymat.length;
  const nR = new Uint16Array(ne * K), nG = new Uint16Array(ne * K), nB = new Uint16Array(ne * K), nS = new Uint8Array(ne * K);
  await rajoita(3, nakymat.map((it, s) => async () => {
    const offs = it._offs ?? 0; // BOA-offset mitattu (maaritaOffsetit, v2d)
    const [scl, r, g, b] = await Promise.all([lueIkkuna(it.assets.scl.href, o.ovS, ws), ...['red', 'green', 'blue'].map((c) => lueIkkuna(it.assets[c].href, o.ovB, w))]);
    if (!scl || !r || !g || !b) return;
    for (let e = 0; e < ne; e++) {
      const fx = eX[e], fy = eY[e], sc = lahin(scl, (fx + 0.5) / sk - 0.5, (fy + 0.5) / sk - 0.5);
      if (sc === 0) continue;
      const vr = bilin(r, fx, fy), vg = bilin(g, fx, fy), vb = bilin(b, fx, fy);
      if (!vr || !vg || !vb) continue;
      const j = e * K + s;
      nR[j] = Math.max(1, vr - offs); nG[j] = Math.max(1, vg - offs); nB[j] = Math.max(1, vb - offs);
      nS[j] = KELPO.has(sc) && nB[j] < 3000 ? (sc === 6 ? 3 : 2) : 1; // 3 kelpo vesi, 2 kelpo maa, 1 pilvi/muu
    }
  }));
  return { koodi, nakymat, eI, eX, eY, ne, K, nR, nG, nB, nS, raja, res };
}
function yhdista(N, A, T) {
  const { koodi, nakymat, eI, eX, eY, ne, K, nR, nG, nB, nS, raja, res } = N;
  // valinta pikseleittäin
  const valJ = new Int32Array(ne).fill(-1), valW = new Float32Array(ne), valV = new Uint8Array(ne);
  const rampPx = RAMPPI_M / res, jarj = new Int32Array(K), lum = new Float32Array(K);
  let kelpo = 0;
  for (let e = 0; e < ne; e++) {
    let m = 0, kaikki = 0;
    for (let s = 0; s < K; s++) { const j = e * K + s; if (!nS[j]) continue; kaikki++; if (nS[j] >= 2) { jarj[m] = j; lum[m] = nR[j] + nG[j] + nB[j]; m++; } }
    if (!kaikki) continue;
    let valittu = -1, wt = Math.max(0.01, Math.min(1, Math.min(eX[e], eY[e], raja - eX[e], raja - eY[e]) / rampPx));
    if (m) {
      for (let a = 1; a < m; a++) { const lj = jarj[a], ll = lum[a]; let b = a - 1; while (b >= 0 && lum[b] > ll) { jarj[b + 1] = jarj[b]; lum[b + 1] = lum[b]; b--; } jarj[b + 1] = lj; lum[b + 1] = ll; }
      let vesia = 0; for (let a = 0; a < m; a++) if (nS[jarj[a]] === 3) vesia++;
      if (vesia * 2 > m) {
        const ok = []; for (let a = 0; a < m; a++) { const j = jarj[a]; if (nS[j] === 3 && nR[j] > 30 && nG[j] > 30 && nB[j] > 30) ok.push(j); }
        valittu = ok.length ? ok[0] : jarj[(m - 1) >> 1]; valV[e] = 1; // vesi: tummin kelpo (utu ja kimallus pois)
      } else valittu = jarj[(m - 1) >> 1];
      kelpo++;
    } else {
      let pl = 1e9; for (let s = 0; s < K; s++) { const j = e * K + s; if (nS[j] && nR[j] + nG[j] + nB[j] < pl) { pl = nR[j] + nG[j] + nB[j]; valittu = j; } }
      wt *= VARAPAINO;
    }
    valJ[e] = valittu; valW[e] = wt;
  }
  // veden tasosiirto: aiemmin kerättyihin naapuritiiliin päällekkäisellä vesialueella (tallennettu → sama kaikissa lohkoissa)
  let siirto = T.siirto[koodi];
  if (!siirto) {
    const sum = [0, 0, 0]; let nn = 0;
    for (let e = 0; e < ne; e++) {
      if (!valV[e] || valW[e] < 0.01) continue;
      const i = eI[e], w = A.acc[3][i];
      if (w < 0.05 || A.acc[4][i] / w < 0.9) continue;
      const j = valJ[e];
      sum[0] += A.acc[0][i] / w - nR[j] / 10000; sum[1] += A.acc[1][i] / w - nG[j] / 10000; sum[2] += A.acc[2][i] / w - nB[j] / 10000; nn++;
    }
    siirto = nn > 300 ? sum.map((s) => +Math.max(-0.02, Math.min(0.02, s / nn)).toFixed(5)) : [0, 0, 0];
    T.siirto[koodi] = siirto;
  }
  for (let e = 0; e < ne; e++) {
    const j = valJ[e]; if (j < 0) continue;
    const i = eI[e], wt = valW[e], sv = valV[e] ? siirto : [0, 0, 0];
    A.acc[0][i] += wt * Math.max(0, nR[j] / 10000 + sv[0]); A.acc[1][i] += wt * Math.max(0, nG[j] / 10000 + sv[1]); A.acc[2][i] += wt * Math.max(0, nB[j] / 10000 + sv[2]);
    A.acc[3][i] += wt; A.acc[4][i] += wt * (nS[j] === 3 ? 1 : 0);
  }
  return { mgrs: koodi, nakymat: nakymat.map((x) => x.id), kelpo_osuus: +(kelpo / ne).toFixed(3), vesisiirto: siirto };
}


// ===================== Kuvauspaikka: lohkot, laatat, DEM, luettelo =====================
const KAUKOMAA = process.env.KAUKOMAA === '1';
const ULOS = process.env.ULOS || (KAUKOMAA ? '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/kaukomaa' : '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/v2');
const V1_TILA = '/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-eurooppa-s2/2026-10-01b/tila.json';
const JUURI_Z = 11, LOHKO_N = 8, ETUKATEEN = 2;
const O12 = { ovB: 1, ovS: 0 }, O13 = { ovB: 0, ovS: 0 };
// Linssiseppä 2:n alustava lista 1.10.2026 (tunniste: lat, lon)
const PAIKAT = {
  helsinki: [60.17, 24.94], 'olavinlinna-saimaa': [61.86, 28.90], tukholma: [59.33, 18.07], 'kopenhamina-juutinrauma': [55.68, 12.57],
  oslo: [59.91, 10.75], sognefjord: [61.15, 6.60], reykjavik: [64.15, -21.94], lontoo: [51.51, -0.13], amsterdam: [52.37, 4.90],
  pariisi: [48.86, 2.35], berliini: [52.52, 13.40], praha: [50.08, 14.43], wien: [48.21, 16.37], budapest: [47.50, 19.04],
  'mont-blanc': [45.83, 6.86], venetsia: [45.44, 12.33], rooma: [41.90, 12.50], 'napoli-vesuvius': [40.82, 14.43], etna: [37.75, 15.00],
  ateena: [37.98, 23.73], santorini: [36.40, 25.43], 'istanbul-bosporus': [41.04, 29.00], dubrovnik: [42.65, 18.09],
  barcelona: [41.39, 2.17], lissabon: [38.72, -9.14],
};
const REUNUS_LAT = 0.95, REUNUS_LON = 1.5, KESK_LAT = 0.25, KESK_LON = 0.40;
const mpx = (z, lat) => (40075016 * Math.cos((lat * Math.PI) / 180)) / 2 ** (z + 8);

// Kangas tasolla z: laatat [tx0, tx0+nx) × [ty0, ty0+ny) + P laatan (≥ 10 km) reunus, jotta avomeren etäisyydet ja
// tiilien rampit vastaavat v1:tä; palauttaa sisäosan. Avomeren vakiot ovat v1:n z10-pikseleinä × f = 2^(z−10).
async function lohko(z, tx0, ty0, nx, ny, o, T, tilasto) {
  const P = Math.ceil(10000 / (256 * mpx(z, yLat(ty0 + ny / 2, z)))), f = 2 ** (z - 10);
  const k = kangas(z, tx0 - P, ty0 - P, nx + 2 * P, ny + 2 * P), NP = k.W * k.H;
  const bb = [xLon(tx0 - P, z), yLat(ty0 + ny + P, z), xLon(tx0 + nx + P, z), yLat(ty0 - P, z)];
  const koodit = await mgrsTiilet(bb);
  const A = { acc: [0, 1, 2, 3, 4].map(() => new Float32Array(NP)) };
  const jarj = [...koodit.filter((c) => T.siirto[c]), ...koodit.filter((c) => !T.siirto[c])];
  const lupaus = [];
  const aloita = (i) => { if (i < jarj.length && !lupaus[i]) lupaus[i] = (async () => { const nak = await tiilenNakymat(jarj[i]); return nak.length ? nouda(k, o, jarj[i], nak) : null; })(); };
  for (let i = 0; i < ETUKATEEN; i++) aloita(i);
  for (let i = 0; i < jarj.length; i++) {
    const N = await lupaus[i]; aloita(i + ETUKATEEN); lupaus[i] = null;
    if (N) { const r = yhdista(N, A, T); tilasto.mgrs.add(r.mgrs); r.nakymat.forEach((x) => tilasto.nakymat.add(x)); }
  }
  const kattaa = new Uint8Array(NP), s2 = new Uint8Array(NP * 3);
  for (let i = 0; i < NP; i++) {
    const w = A.acc[3][i]; if (!w) continue;
    for (let c = 0; c < 3; c++) s2[i * 3 + c] = savy(A.acc[c][i] / w);
    k.vesi[i] = Math.round((A.acc[4][i] / w) * 255); kattaa[i] = 1;
  }
  {
    const mm = new Float32Array(NP), cc = [0, 1, 2].map(() => new Float32Array(NP)), maa = new Uint8Array(NP);
    for (let i = 0; i < NP; i++) {
      if (kattaa[i] && k.vesi[i] >= 128) { mm[i] = 1; for (let c = 0; c < 3; c++) cc[c][i] = s2[i * 3 + c]; }
      maa[i] = kattaa[i] && k.vesi[i] < 128 ? 0 : 1;
    }
    const laatikko = (a, W, H, r) => { const t = new Float32Array(W * H);
      for (let y = 0; y < H; y++) { let sum = 0; const o = y * W; for (let x = -r; x < W + r; x++) { if (x + r < W && x + r >= 0) sum += a[o + x + r]; if (x - r - 1 >= 0 && x - r - 1 < W) sum -= a[o + x - r - 1]; if (x >= 0 && x < W) t[o + x] = sum; } }
      for (let x = 0; x < W; x++) { let sum = 0; for (let y = -r; y < H + r; y++) { if (y + r < H && y + r >= 0) sum += t[(y + r) * W + x]; if (y - r - 1 >= 0 && y - r - 1 < H) sum -= t[(y - r - 1) * W + x]; if (y >= 0 && y < H) a[y * W + x] = sum; } } };
    for (let kierros = 0; kierros < 3; kierros++) { laatikko(mm, k.W, k.H, 12 * f); for (let c = 0; c < 3; c++) laatikko(cc[c], k.W, k.H, 12 * f); }
    const dMaa = etaisyys(maa, k.W, k.H, 220 * f);
    for (let i = 0; i < NP; i++) {
      if (!kattaa[i] || k.vesi[i] < 128 || mm[i] < 1e-3) continue;
      const px = dMaa[i] / 3 / f, tt = Math.max(0, Math.min(1, (px - 10) / 20)), tm = Math.max(0, Math.min(1, (px - 20) / 60));
      if (tt > 0) for (let c = 0; c < 3; c++) s2[i * 3 + c] = Math.round((1 - tm) * ((1 - tt) * s2[i * 3 + c] + tt * (cc[c][i] / mm[i])) + tm * MERI[c]);
    }
  }
  const rampS = MERIRAMPPI_M / mpx(k.z, k.lat[k.H >> 1]);
  const d = etaisyys(kattaa, k.W, k.H, Math.ceil(rampS));
  for (let i = 0; i < NP; i++) {
    const w = kattaa[i] ? Math.min(1, d[i] / 3 / rampS) : 0;
    for (let c = 0; c < 3; c++) k.rgb[i * 3 + c] = Math.round(w * s2[i * 3 + c] + (1 - w) * MERI[c]);
    if (!kattaa[i]) k.vesi[i] = 255;
    k.tila[i] = 1;
  }
  const s = kangas(z, tx0, ty0, nx, ny);
  for (let y = 0; y < s.H; y++) {
    const a = (y + 256 * P) * k.W + 256 * P, b = y * s.W;
    s.rgb.set(k.rgb.subarray(a * 3, (a + s.W) * 3), b * 3); s.vesi.set(k.vesi.subarray(a, a + s.W), b); s.tila.set(k.tila.subarray(a, a + s.W), b);
  }
  return s;
}

// Laatat juurijaon osoitteisiin: taso = z − 11, x' = x − x0·2^taso, y' = y − y0·2^taso (y alaspäin; laite {reverseY}).
function kirjoita(s, dir, J, tilasto) {
  const taso = s.z - JUURI_Z, m = 2 ** taso;
  const rgba = Buffer.alloc(256 * 256 * 4), vrgba = Buffer.alloc(256 * 256 * 4);
  const t = (tilasto.tasot[taso] ||= { z: s.z, laattoja: 0, jpg_mt: 0, x: [1e9, -1], y: [1e9, -1] });
  for (let ty = 0; ty < s.nty; ty++) for (let tx = 0; tx < s.ntx; tx++) {
    const xr0 = s.tx0 + tx - J.x0 * m, yr0 = s.ty0 + ty - J.y0 * m;
    if (xr0 < 0 || yr0 < 0 || xr0 >= J.rx * m || yr0 >= J.ry * m) continue;
    const xr = KAUKOMAA ? s.tx0 + tx : xr0, yr = KAUKOMAA ? s.ty0 + ty : yr0, tz = KAUKOMAA ? s.z : taso; // KAUKOMAA: tavallinen XYZ {z}/{x}/{y}
    for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
      const i = (ty * 256 + y) * s.W + tx * 256 + x, o = (y * 256 + x) * 4;
      rgba[o] = s.rgb[i * 3]; rgba[o + 1] = s.rgb[i * 3 + 1]; rgba[o + 2] = s.rgb[i * 3 + 2]; rgba[o + 3] = 255;
      vrgba[o] = vrgba[o + 1] = vrgba[o + 2] = s.vesi[i]; vrgba[o + 3] = 255;
    }
    for (const d of ['laatat', 'vesi']) fs.mkdirSync(`${dir}/${d}/${tz}/${xr}`, { recursive: true });
    const j = jpeg.encode({ data: rgba, width: 256, height: 256 }, 85).data;
    fs.writeFileSync(`${dir}/laatat/${tz}/${xr}/${yr}.jpg`, j);
    fs.writeFileSync(`${dir}/vesi/${tz}/${xr}/${yr}.png`, PNG.sync.write({ width: 256, height: 256, data: vrgba }, { colorType: 0 }));
    t.laattoja++; t.jpg_mt += j.length / 1e6;
    t.x[0] = Math.min(t.x[0], xr); t.x[1] = Math.max(t.x[1], xr); t.y[0] = Math.min(t.y[0], yr); t.y[1] = Math.max(t.y[1], yr);
  }
}

// GLO-30 → GeoTIFF (EPSG:4326, float32 m), kuten Helsingin paketissa; tiilinimet myös W/S-puolelle.
async function dem(bbox, askelLon, askelLat, ov, polku) {
  const W = Math.round((bbox[2] - bbox[0]) / askelLon), H = Math.round((bbox[3] - bbox[1]) / askelLat);
  const out = new Float32Array(W * H);
  const nimi = (la, lo) => `${DEM_KANSIO}/Copernicus_DSM_COG_10_${la < 0 ? 'S' : 'N'}${String(Math.abs(la)).padStart(2, '0')}_00_${lo < 0 ? 'W' : 'E'}${String(Math.abs(lo)).padStart(3, '0')}_00_DEM.tif`;
  for (let lat0 = Math.floor(bbox[1]); lat0 < bbox[3]; lat0++) {
    const valimuisti = new Map();
    for (let y = 0; y < H; y++) {
      const lat = bbox[3] - (y + 0.5) * askelLat; if (Math.floor(lat) !== lat0) continue;
      for (let x = 0; x < W; x++) {
        const lon = bbox[0] + (x + 0.5) * askelLon, lon0 = Math.floor(lon);
        if (!valimuisti.has(lon0)) {
          const fn = nimi(lat0, lon0);
          if (!fs.existsSync(fn)) valimuisti.set(lon0, null); else {
            const t = await fromFile(fn), im0 = await t.getImage(0), im = await t.getImage(Math.min(ov, (await t.getImageCount()) - 1));
            const [a] = await im.readRasters(); const [ox, oy] = im0.getOrigin(), [ex, ey] = [im0.getWidth() * im0.getResolution()[0], -im0.getHeight() * im0.getResolution()[1]];
            valimuisti.set(lon0, { a, w: im.getWidth(), h: im.getHeight(), ox, oy, rx: ex / im.getWidth(), ry: ey / im.getHeight() });
          }
        }
        const d = valimuisti.get(lon0); if (!d) continue; // meri: ei tiiltä → 0
        const fx = (lon - d.ox) / d.rx - 0.5, fy = (d.oy - lat) / d.ry - 0.5;
        const i = Math.min(d.w - 2, Math.max(0, Math.floor(fx))), j = Math.min(d.h - 2, Math.max(0, Math.floor(fy))), u = Math.min(1, Math.max(0, fx - i)), v = Math.min(1, Math.max(0, fy - j));
        const p = j * d.w + i;
        out[y * W + x] = (d.a[p] * (1 - u) + d.a[p + 1] * u) * (1 - v) + (d.a[p + d.w] * (1 - u) + d.a[p + d.w + 1] * u) * v;
      }
    }
  }
  const buf = await writeArrayBuffer(out, { width: W, height: H, ModelPixelScale: [askelLon, askelLat, 0], ModelTiepoint: [0, 0, 0, bbox[0], bbox[3], 0], GeographicTypeGeoKey: 4326, GTModelTypeGeoKey: 2, GTRasterTypeGeoKey: 1, SampleFormat: [3], BitsPerSample: [32] });
  fs.writeFileSync(polku, Buffer.from(buf));
  let mx = -1e9; for (const h of out) if (h > mx) mx = h;
  return { tiedosto: polku.split('/').pop(), leveys: W, korkeus: H, bbox, max_m: +mx.toFixed(1) };
}

async function paikka(tunniste, T) {
  const t1 = Date.now(), [lat, lon] = PAIKAT[tunniste], dir = `${ULOS}/${tunniste}`;
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const r6 = (v) => +v.toFixed(6);
  const reunus = [lon - REUNUS_LON, lat - REUNUS_LAT, lon + REUNUS_LON, lat + REUNUS_LAT];
  const kesk = [lon - KESK_LON, lat - KESK_LAT, lon + KESK_LON, lat + KESK_LAT];
  const jx0 = Math.floor(lonX(reunus[0], JUURI_Z)), jx1 = Math.floor(lonX(reunus[2], JUURI_Z));
  const jy0 = Math.floor(latY(reunus[3], JUURI_Z)), jy1 = Math.floor(latY(reunus[1], JUURI_Z));
  const J = { x0: jx0, y0: jy0, rx: jx1 - jx0 + 1, ry: jy1 - jy0 + 1 };
  const tilasto = { tasot: {}, mgrs: new Set(), nakymat: new Set() };
  // reunus z12 lohkoittain → z11 puolittamalla (lohkot alkavat parillisesta, joten z11-laatat ovat kokonaisia)
  const z11 = kangas(JUURI_Z, jx0, jy0, J.rx, J.ry);
  for (let by = 0; by < 2 * J.ry; by += LOHKO_N) for (let bx = 0; bx < 2 * J.rx; bx += LOHKO_N) {
    const s = await lohko(12, 2 * jx0 + bx, 2 * jy0 + by, Math.min(LOHKO_N, 2 * J.rx - bx), Math.min(LOHKO_N, 2 * J.ry - by), O12, T, tilasto);
    kirjoita(s, dir, J, tilasto);
    const p = puolita(s); kirjoita(p, dir, J, tilasto); liita(z11, p);
    loki(tunniste, 'z12-lohko', `${bx}/${2 * J.rx}`, `${by}/${2 * J.ry}`);
  }
  esikatselu(z11, `${dir}/esikatselu-reunus-z11.jpg`);
  // keskusta z13 (rajattu kokonaisiin z12-laattoihin)
  const kx0 = Math.floor(lonX(kesk[0], 13)) & ~1, kx1 = Math.floor(lonX(kesk[2], 13)) | 1;
  const ky0 = Math.floor(latY(kesk[3], 13)) & ~1, ky1 = Math.floor(latY(kesk[1], 13)) | 1;
  const k12 = kangas(12, kx0 / 2, ky0 / 2, (kx1 - kx0 + 1) / 2, (ky1 - ky0 + 1) / 2);
  for (let y = ky0; y <= ky1; y += LOHKO_N) for (let x = kx0; x <= kx1; x += LOHKO_N) {
    const s = await lohko(13, x, y, Math.min(LOHKO_N, kx1 - x + 1), Math.min(LOHKO_N, ky1 - y + 1), O13, T, tilasto);
    kirjoita(s, dir, J, tilasto); liita(k12, puolita(s));
    loki(tunniste, 'z13-lohko', `${x - kx0}/${kx1 - kx0 + 1}`, `${y - ky0}/${ky1 - ky0 + 1}`);
  }
  esikatselu(k12, `${dir}/esikatselu-keskusta-z12.jpg`);
  fs.writeFileSync(`${ULOS}/siirrot.json`, JSON.stringify(T.siirto));
  // DEM: laitteella ei käytetä (maasto Cesiumista); vain arkistoon
  fs.mkdirSync(`${dir}/dem`, { recursive: true });
  const demit = {
    reunus: await dem(reunus, 1 / 1200, 1 / 1200, 1, `${dir}/dem/dem-reunus-90m.tif`),
    keskusta: await dem(kesk, 1 / 3600, 1 / 3600, 0, `${dir}/dem/dem-keskusta-30m.tif`),
  };
  for (const v of Object.values(tilasto.tasot)) v.jpg_mt = +v.jpg_mt.toFixed(1);
  const tieto = {
    tunniste, keskipiste: [lat, lon],
    laatat: KAUKOMAA ? `kaukomaa/v1/${tunniste}/laatat/{z}/{x}/{y}.jpg` : `kuvauspaikat/v1/${tunniste}/laatat/{z}/{x}/{reverseY}.jpg`,
    vesimaski: KAUKOMAA ? `kaukomaa/v1/${tunniste}/vesi/{z}/{x}/{y}.png` : `kuvauspaikat/v1/${tunniste}/vesi/{z}/{x}/{reverseY}.png`,
    ...(KAUKOMAA ? { osoitteet: 'XYZ Web Mercator (EPSG:3857), absoluuttinen z/x/y, y pohjoisesta; z11–z12 reunus_bbox, z13 keskusta_z13_bbox' } : {}),
    juurijako: { w: r6(xLon(jx0, JUURI_Z)), s: r6(yLat(jy1 + 1, JUURI_Z)), e: r6(xLon(jx1 + 1, JUURI_Z)), n: r6(yLat(jy0, JUURI_Z)), rx: J.rx, ry: J.ry, juuri_z: JUURI_Z },
    tasot: tilasto.tasot,
    reunus_bbox: reunus.map(r6), keskusta_bbox: kesk.map(r6),
    keskusta_z13_bbox: [r6(xLon(kx0, 13)), r6(yLat(ky1 + 1, 13)), r6(xLon(kx1 + 1, 13)), r6(yLat(ky0, 13))],
    mt: +Object.values(tilasto.tasot).reduce((a, v) => a + v.jpg_mt, 0).toFixed(1),
    lahde: 'Sentinel-2 L2A (Copernicus, Earth Search), kesät 2022–2025, MGRS-kohtainen mediaani kuten s2-eurooppa/v1',
    mgrs: [...tilasto.mgrs].sort(), nakymia: tilasto.nakymat.size, dem: demit, s: Math.round((Date.now() - t1) / 1000),
  };
  fs.writeFileSync(`${dir}/paikka.json`, JSON.stringify(tieto, null, 1));
  loki(tunniste, 'VALMIS', JSON.stringify({ tasot: tieto.tasot, mt: tieto.mt, s: tieto.s }));
}

// --- v2: yksi 20 × 20 km kuva / paikka ---
const NIMET = {
  helsinki: ['Helsinki', 'Suomi'], 'olavinlinna-saimaa': ['Olavinlinna ja Saimaa', 'Suomi'], tukholma: ['Tukholma', 'Ruotsi'],
  'kopenhamina-juutinrauma': ['Kööpenhamina ja Juutinrauma', 'Tanska'], oslo: ['Oslo', 'Norja'], sognefjord: ['Sognefjord', 'Norja'],
  reykjavik: ['Reykjavík', 'Islanti'], lontoo: ['Lontoo', 'Yhdistynyt kuningaskunta'], amsterdam: ['Amsterdam', 'Alankomaat'],
  pariisi: ['Pariisi', 'Ranska'], berliini: ['Berliini', 'Saksa'], praha: ['Praha', 'Tšekki'], wien: ['Wien', 'Itävalta'],
  budapest: ['Budapest', 'Unkari'], 'mont-blanc': ['Mont Blanc', 'Ranska ja Italia'], venetsia: ['Venetsia', 'Italia'],
  rooma: ['Rooma', 'Italia'], 'napoli-vesuvius': ['Napoli ja Vesuvius', 'Italia'], etna: ['Etna', 'Italia'], ateena: ['Ateena', 'Kreikka'],
  santorini: ['Santorini', 'Kreikka'], 'istanbul-bosporus': ['Istanbul ja Bosporinsalmi', 'Turkki'], dubrovnik: ['Dubrovnik', 'Kroatia'],
  barcelona: ['Barcelona', 'Espanja'], lissabon: ['Lissabon', 'Portugali'],
};
const KOKO_M = 20000, PX = 2048;
// KAUKOMAA (Karttaseppä 9.10.2026, PT: pallokierroksen kaukomaa): paikka() eli reunus z11–z12 ja keskusta z13 laattoina, XYZ-osoitteet
// (absoluuttinen {z}/{x}/{y}, y pohjoisesta), CesiumKaupunki-aluskerroksen rasteripeitteeksi. KAUKOMAA=1 PAIKAT=pariisi ULOS=… node kuvauspaikat-v2.mjs
async function kuva(tunniste, T) {
  const t1 = Date.now(), [lat, lon] = PAIKAT[tunniste];
  const dLat = KOKO_M / 2 / 111320, dLon = KOKO_M / 2 / (111320 * Math.cos((lat * Math.PI) / 180));
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((v) => +v.toFixed(6));
  const z = mpx(13, lat) > 10 ? 14 : 13;
  const tx0 = Math.floor(lonX(bbox[0], z)), tx1 = Math.floor(lonX(bbox[2], z)), ty0 = Math.floor(latY(bbox[3], z)), ty1 = Math.floor(latY(bbox[1], z));
  const tilasto = { tasot: {}, mgrs: new Set(), nakymat: new Set() };
  const s = await lohko(z, tx0, ty0, tx1 - tx0 + 1, ty1 - ty0 + 1, O13, T, tilasto);
  // uudelleennäytteistys bboxin tasavälein (bilineaarinen Web Mercator -kankaasta)
  const out = Buffer.alloc(PX * PX * 4);
  for (let j = 0; j < PX; j++) {
    const la = bbox[3] - ((j + 0.5) / PX) * (bbox[3] - bbox[1]), py = (latY(la, z) - ty0) * 256 - 0.5;
    for (let i = 0; i < PX; i++) {
      const lo = bbox[0] + ((i + 0.5) / PX) * (bbox[2] - bbox[0]), px = (lonX(lo, z) - tx0) * 256 - 0.5;
      const x0 = Math.max(0, Math.min(s.W - 2, Math.floor(px))), y0 = Math.max(0, Math.min(s.H - 2, Math.floor(py))), fx = px - x0, fy = py - y0, o = (j * PX + i) * 4;
      for (let c = 0; c < 3; c++) {
        const v = (k) => s.rgb[k * 3 + c];
        const a00 = v(y0 * s.W + x0), a10 = v(y0 * s.W + x0 + 1), a01 = v((y0 + 1) * s.W + x0), a11 = v((y0 + 1) * s.W + x0 + 1);
        out[o + c] = Math.round((a00 * (1 - fx) + a10 * fx) * (1 - fy) + (a01 * (1 - fx) + a11 * fx) * fy);
      }
      out[o + 3] = 255;
    }
  }
  const j = jpeg.encode({ data: out, width: PX, height: PX }, 90).data;
  fs.writeFileSync(`${ULOS}/${tunniste}.jpg`, j);
  const [nimi, maa] = NIMET[tunniste];
  const tieto = {
    tunniste, nimi, maa, nimi_lcd: nimi.toUpperCase(), maa_lcd: maa.toUpperCase(), keskipiste: [lat, lon], bbox, koko_m: KOKO_M, px: PX,
    m_px: +(KOKO_M / PX).toFixed(2), kuva: `kuvauspaikat/v1/${tunniste}.jpg`, mt: +(j.length / 1e6).toFixed(2), lahde_z: z,
    lahde: 'Contains modified Copernicus Sentinel data 2022–2025 (Sentinel-2 L2A, Earth Search), kesämediaani',
    mgrs: [...tilasto.mgrs].sort(), nakymia: tilasto.nakymat.size, s: Math.round((Date.now() - t1) / 1000),
  };
  fs.writeFileSync(`${ULOS}/${tunniste}.json`, JSON.stringify(tieto, null, 1));
  loki(tunniste, 'VALMIS', `z${z}`, `${tieto.mt} Mt`, `${tieto.nakymia} näkymää`, `${tieto.s} s`);
}

// --- ajo ---
// geotiffin lohkolähde hylkää rinnakkaiset pyynnöt yhteyden katketessa; uusinta hoitaa varsinaisen haun
process.on('unhandledRejection', (e) => loki('käsittelemätön hylkäys (ohitetaan)', e?.cause?.code || e?.message));
fs.mkdirSync(ULOS, { recursive: true });
const T = { siirto: { ...JSON.parse(fs.readFileSync(V1_TILA, 'utf8')).siirto } };
const lista = (process.env.PAIKAT || Object.keys(PAIKAT).join(',')).split(',');
for (const t of lista) {
  if (!PAIKAT[t]) { loki('tuntematon paikka', t); continue; }
  if (!process.env.UUDELLEEN && fs.existsSync(KAUKOMAA ? `${ULOS}/${t}/paikka.json` : `${ULOS}/${t}.json`)) { loki(t, 'jo valmis'); continue; }
  if (KAUKOMAA) await paikka(t, T); else await kuva(t, T);
}
if (KAUKOMAA) { loki('KAUKOMAA VALMIS'); process.exit(0); }
const paikat = Object.keys(PAIKAT).filter((t) => fs.existsSync(`${ULOS}/${t}.json`)).map((t) => JSON.parse(fs.readFileSync(`${ULOS}/${t}.json`, 'utf8')));
fs.writeFileSync(`${ULOS}/kuvauspaikat.json`, JSON.stringify({ versio: 'v1', juuri: 'https://media.matkakirja.app/linssit/astronautin-kamera/', lahde: 'Contains modified Copernicus Sentinel data 2022–2025', paikat }, null, 1));
loki('KAIKKI VALMIS', paikat.length, 'paikkaa');
