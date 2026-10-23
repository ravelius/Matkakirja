#!/usr/bin/env node
// LIPUT (Karttaseppä 9.10.2026; LS1, juna 171 elävät yksityiskohdat B8): man_made=flagpole 15 km:n säteellä + tyven korkeus rakennuksen katolta (OSM height / building:levels).
// Käyttö: node liput.mjs <nimi> <lat> <lon> [säde_km 15] --pbf <tiedosto.osm.pbf> --ulos <kansio>
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const [NIMI, LAT, LON, SADE = '15'] = pos, lat0 = +LAT, lon0 = +LON, S = +SADE * 1000, PBF = opt('pbf'), ULOS = opt('ulos', '.');
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's', ...a);
const WA = 6378137, WF = 1 / 298.257223563, WE2 = WF * (2 - WF), rad = Math.PI / 180, sl0 = Math.sin(lat0 * rad);
const Nr = WA / Math.sqrt(1 - WE2 * sl0 * sl0), Mr = Nr * (1 - WE2) / (1 - WE2 * sl0 * sl0);
const nLat = (lat) => (lat - lat0) * rad * Mr, eLon = (lon) => (lon - lon0) * rad * Nr * Math.cos(lat0 * rad);
const M = 1.05;
const bb = [lon0 - (M * S / (Nr * Math.cos(lat0 * rad))) / rad, lat0 - (M * S / Mr) / rad, lon0 + (M * S / (Nr * Math.cos(lat0 * rad))) / rad, lat0 + (M * S / Mr) / rad];

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

// --- kierros 1: lipputangot (solmut ja tiet man_made=flagpole) ---
const sis = (x, y) => x * x + y * y <= S * S, r1 = (v) => Math.round(v * 10) / 10, sisaBB = (la, lo) => lo >= bb[0] && lo <= bb[2] && la >= bb[1] && la <= bb[3];
const tangot = [], tangotTie = [];
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo, t) => { if (t && t.man_made === 'flagpole' && sisaBB(la, lo)) { const x = eLon(lo), y = nLat(la); if (sis(x, y)) tangot.push({ osm: 'node/' + id, t, x, y }); } },
  tiet: (id, t, refs) => { if (t.man_made === 'flagpole') tangotTie.push({ id, t, refs }); } });
loki('kierros 1: tankoja', tangot.length, '(teinä', tangotTie.length + ')');
// --- kierros 2: solmut 40 m:n sisällä tangoista (ruudukko 100 m) → rakennusehdokkaat (vähintään yksi solmu lähellä) ---
const G = 100, ruutu = new Set(); for (const q of tangot) for (let a = -1; a <= 1; a++) for (let c = -1; c <= 1; c++) ruutu.add(Math.floor(q.x / G) + a + ',' + (Math.floor(q.y / G) + c));
const lahi = new Set(), ehd = [], tarve = new Set(); for (const w of tangotTie) for (const r of w.refs) tarve.add(r);
const RAK = (t) => t.building || t['building:part'];
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (!sisaBB(la, lo)) return; const x = eLon(lo), y = nLat(la); if (ruutu.has(Math.floor(x / G) + ',' + Math.floor(y / G))) lahi.add(id); },
  tiet: (id, t, refs) => { if (RAK(t) && refs.length >= 4 && refs.some((r) => lahi.has(r))) { ehd.push({ osm: 'way/' + id, t, refs }); for (const r of refs) tarve.add(r); } } });
loki('kierros 2: lähisolmuja', lahi.size, 'rakennusehdokkaita', ehd.length);
// --- kierros 3: ehdokkaiden ja tankoteiden koordinaatit ---
const koord = new Map();
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (tarve.has(id)) koord.set(id, [eLon(lo), nLat(la)]); } });
for (const w of tangotTie) { const q = w.refs.map((r) => koord.get(r)).filter(Boolean); if (!q.length) continue; const x = q.reduce((s, p) => s + p[0], 0) / q.length, y = q.reduce((s, p) => s + p[1], 0) / q.length; if (sis(x, y)) tangot.push({ osm: 'way/' + w.id, t: w.t, x, y }); }
const num = (v) => { const m = /^\s*(-?[0-9]+(?:[.,][0-9]+)?)/.exec(v || ''); return m ? +m[1].replace(',', '.') : NaN; };
const korkeus = (t) => { const h = num(t.height); if (Number.isFinite(h) && h > 0) return +h.toFixed(1); const l = num(t['building:levels']); return Number.isFinite(l) && l > 0 ? +(l * 3.2).toFixed(1) : null; }; // kuten jalanjaljet.mjs
const sisalla = (x, y, q) => { let c = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const rak = ehd.map((w) => ({ ...w, q: w.refs.map((r) => koord.get(r)).filter(Boolean) })).filter((w) => w.q.length >= 4 && w.refs[0] === w.refs[w.refs.length - 1]);
const PIDA = ['man_made', 'flag:type', 'flag:name', 'flag:wikidata', 'country', 'subject', 'subject:wikidata', 'height', 'name', 'operator', 'support', 'location', 'description'];
const liput = [], yht = { tankoja: 0, katolla_korkeudella: 0, rakennuksessa_ei_korkeutta: 0, maassa: 0, korkeus_tagi: 0 };
for (const q of tangot) {
  const sisa = rak.filter((w) => sisalla(q.x, q.y, w.q));
  const osat = sisa.filter((w) => w.t['building:part'] && korkeus(w.t) !== null), runko = sisa.filter((w) => w.t.building && korkeus(w.t) !== null);
  const pohja = osat.length ? osat : runko; let tyvi = 0, lahde = 'maa', osm = null;
  if (pohja.length) { const p = pohja.reduce((a, w) => (korkeus(w.t) > korkeus(a.t) ? w : a)); tyvi = korkeus(p.t); lahde = p.t['building:part'] ? 'building:part' : 'building'; osm = p.osm; yht.katolla_korkeudella++; }
  else if (sisa.length) { lahde = 'rakennus ilman korkeutta'; osm = sisa[0].osm; yht.rakennuksessa_ei_korkeutta++; } else yht.maassa++;
  if (q.t.height) yht.korkeus_tagi++; yht.tankoja++;
  liput.push({ osm: q.osm, piste: [r1(q.x), r1(q.y)], tagit: Object.fromEntries(Object.entries(q.t).filter(([k]) => PIDA.includes(k))), ...(Number.isFinite(num(q.t.height)) ? { korkeus_m: num(q.t.height) } : {}), tyvi_m: tyvi, tyvi_lahde: lahde, ...(osm ? { rakennus: osm } : {}) });
}
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `liput-${NIMI}.json`), JSON.stringify({ kohde: NIMI, origo: { lat: lat0, lon: lon0, ellipsoidikorkeus_m: 0 }, sade_km: S / 1000,
  koordinaatit: 'ENU metreinä [x itä, y pohjoinen], 0,1 m (sama origo kuin kohteet-' + NIMI + '.json)', lahde: 'OpenStreetMap man_made=flagpole (Geofabrik .osm.pbf)', krediitti: '© OpenStreetMap contributors (ODbL)',
  tyvi: 'tyvi_m = tangon tyven korkeus maasta: rakennuksen (tai building:partin) sisällä height-tagi tai building:levels × 3,2 m, korkein sisältävä osa; muuten 0. tyvi_lahde "rakennus ilman korkeutta" = katolla mutta OSM:ssä ei korkeutta (tyvi_m 0)',
  yhteenveto: yht, liput, luotu: new Date().toISOString() }, null, 1));
loki('valmis', JSON.stringify(yht));
