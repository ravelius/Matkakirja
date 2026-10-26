#!/usr/bin/env node
// RAKENNUKSET (Karttaseppä 8.10.2026): OSM-rakennukset korkeuksineen (height, building:levels) → ENU-renkaat lähiruudun korkeusmalliin
// (korkeus.mjs --rakennukset). Korkeus: height (m) tai building:levels × 3,0 + 1,0; min_height / building:min_level huomioidaan.
// building:part mukaan (tornit, kupolit). Käyttö: node rakennukset.mjs <kaupunki-id> --pbf <maa.osm.pbf> --ulos <kansio> [--lista pallo-37-kaupunkia.json]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const K = JSON.parse(fs.readFileSync(opt('lista', '/Users/Shared/Claude/proto-3d/_tyo/linssiseppa/pallo-37-kaupunkia.json'), 'utf8')).kaupungit.find((k) => k.id === pos[0]);
const lat0 = K.lat, lon0 = K.lon, PBF = opt('pbf'), ULOS = opt('ulos', '.');
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's', ...a);
const WA = 6378137, WF = 1 / 298.257223563, WE2 = WF * (2 - WF), rad = Math.PI / 180, sl0 = Math.sin(lat0 * rad);
const Nr = WA / Math.sqrt(1 - WE2 * sl0 * sl0), Mr = Nr * (1 - WE2) / (1 - WE2 * sl0 * sl0);
const nLat = (lat) => (lat - lat0) * rad * Mr, eLon = (lon) => (lon - lon0) * rad * Nr * Math.cos(lat0 * rad);
const kx = K.kohteet.map((k) => eLon(k.lon)), ky = K.kohteet.map((k) => nLat(k.lat));
const R = [Math.min(...kx) - 3000, Math.min(...ky) - 3000, Math.max(...kx) + 3000, Math.max(...ky) + 3000]; // lähi + varaa
// --- protobuf ---
function varint(b, p) { let x = 0, m = 1, c; do { c = b[p.i++]; x += (c & 0x7f) * m; m *= 128; } while (c & 0x80); return x; }
const zz = (n) => (n % 2 ? -(n + 1) / 2 : n / 2);
function kentat(b, s, e, cb) { const p = { i: s }; while (p.i < e) { const k = varint(b, p), f = Math.floor(k / 8), w = k & 7;
  if (w === 0) cb(f, 0, varint(b, p)); else if (w === 2) { const l = varint(b, p); cb(f, 2, p.i, p.i + l); p.i += l; } else if (w === 1) { p.i += 8; } else if (w === 5) { p.i += 4; } else throw new Error('wiretype ' + w); } }
function pakatut(b, s, e, f) { const p = { i: s }, out = []; while (p.i < e) out.push(f(varint(b, p))); return out; }
function* lohkot(polku) {
  const fd = fs.openSync(polku, 'r'), koko = fs.fstatSync(fd).size, l4 = Buffer.alloc(4); let p = 0;
  while (p < koko) { fs.readSync(fd, l4, 0, 4, p); const hl = l4.readUInt32BE(0), hb = Buffer.alloc(hl); fs.readSync(fd, hb, 0, hl, p + 4);
    let tyyppi = '', ds = 0; kentat(hb, 0, hl, (f, w, a, b2) => { if (f === 1) tyyppi = hb.toString('utf8', a, b2); else if (f === 3) ds = a; });
    const bb2 = Buffer.alloc(ds); fs.readSync(fd, bb2, 0, ds, p + 4 + hl); p += 4 + hl + ds;
    if (tyyppi !== 'OSMData') continue; let raw = null;
    kentat(bb2, 0, ds, (f, w, a, b2) => { if (f === 1) raw = bb2.subarray(a, b2); else if (f === 3) raw = zlib.inflateSync(bb2.subarray(a, b2)); });
    if (raw) yield raw; }
  fs.closeSync(fd);
}
function lohko(b, cb) { // cb.solmut(id, lat, lon, tagit) cb.tiet(id, tagit, refs)
  const st = []; let gran = 100, lato = 0, lono = 0; const ryhmat = [];
  kentat(b, 0, b.length, (f, w, a, e) => { if (f === 1) kentat(b, a, e, (g, w2, s, t) => { if (g === 1) st.push(b.toString('utf8', s, t)); }); else if (f === 2) ryhmat.push([a, e]); else if (f === 17) gran = a; else if (f === 19) lato = a; else if (f === 20) lono = a; });
  const tg = (ks, vs) => { const o = {}; for (let k = 0; k < ks.length; k++) o[st[ks[k]]] = st[vs[k]]; return o; };
  for (const [a, e] of ryhmat) kentat(b, a, e, (f, w, s, t) => {
    if (f === 2 && cb.solmut) { let ids = [], lats = [], lons = [], kv = [];
      kentat(b, s, t, (g, w2, x, y) => { if (g === 1) ids = pakatut(b, x, y, zz); else if (g === 8) lats = pakatut(b, x, y, zz); else if (g === 9) lons = pakatut(b, x, y, zz); else if (g === 10) kv = pakatut(b, x, y, (v) => v); });
      let id = 0, la = 0, lo = 0, q = 0;
      for (let k = 0; k < ids.length; k++) { id += ids[k]; la += lats[k]; lo += lons[k]; const tags = {}; let onTag = false;
        if (kv.length) { while (kv[q] !== 0) { tags[st[kv[q]]] = st[kv[q + 1]]; q += 2; onTag = true; } q++; }
        cb.solmut(id, 1e-9 * (lato + gran * la), 1e-9 * (lono + gran * lo), onTag ? tags : null); } }
    else if (f === 3 && cb.tiet) { let id = 0, ks = [], vs = [], refs = [];
      kentat(b, s, t, (g, w2, x, y) => { if (g === 1) id = x; else if (g === 2) ks = pakatut(b, x, y, (v) => v); else if (g === 3) vs = pakatut(b, x, y, (v) => v); else if (g === 8) { let r = 0; refs = pakatut(b, x, y, (v) => (r += zz(v))); } });
      cb.tiet(id, tg(ks, vs), refs); }
  });
}


const korkeus = (t) => { const num = (v) => { const m = /^\s*(-?[0-9]+(?:[.,][0-9]+)?)/.exec(v || ''); return m ? +m[1].replace(',', '.') : NaN; };
  let h = num(t.height); if (!Number.isFinite(h)) { const l = num(t['building:levels']); if (Number.isFinite(l)) h = l * 3.0 + 1.0; }
  let h0 = num(t.min_height); if (!Number.isFinite(h0)) { const l0 = num(t['building:min_level']); h0 = Number.isFinite(l0) ? l0 * 3.0 : 0; }
  return Number.isFinite(h) && h > 0 && h < 1000 ? [h0, h] : null; };
const tiet = [], tarve = new Set(); let ilman = 0;
for (const b of lohkot(PBF)) lohko(b, { tiet: (id, t, refs) => { if (!(t.building || t['building:part'])) return; const k = korkeus(t); if (!k) { ilman++; return; } tiet.push({ k, refs, osa: !!t['building:part'] }); for (const r of refs) tarve.add(r); } });
loki('rakennuksia korkeuksineen', tiet.length, '(ilman korkeutta', ilman, ')');
const koord = new Map(); for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (tarve.has(id)) koord.set(id, [la, lo]); } });
const ulos = [];
for (const w of tiet) { const p = w.refs.map((r) => koord.get(r)).filter(Boolean).map(([la, lo]) => [Math.round(eLon(lo) * 10) / 10, Math.round(nLat(la) * 10) / 10]);
  if (p.length < 4 || !p.some(([x, y]) => x >= R[0] && x <= R[2] && y >= R[1] && y <= R[3])) continue; ulos.push({ h0: w.k[0], h: w.k[1], osa: w.osa ? 1 : 0, r: p }); }
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `rakennukset-${K.id}.json`), JSON.stringify({ kohde: K.id, origo: { lat: lat0, lon: lon0 }, rajaus_enu: R, krediitti: '© OpenStreetMap contributors (ODbL)', rakennukset: ulos }));
loki('valmis', ulos.length, 'rakennusta rajauksessa');
