#!/usr/bin/env node
// ALUE-OSM (Karttaseppä 9.10.2026; LS2/LR: Concorden oma malli Gizan tapaan, ei mitään Googlesta).
// Kaikki tagatut OSM-kohteet säteellä R pisteestä: solmut, tiet (avoimet ja suljetut) ja multipolygon-relaatiot kaikkine tageineen.
// Tulos: <nimi>-osm.geojson (WGS84, lon/lat) ja <nimi>-osm-enu.json (ENU m keskipisteestä, x itä, y pohjoinen) + yhteenveto luokittain.
// Käyttö: node alue-osm.mjs <nimi> <lat> <lon> <säde_m> --pbf <alue.osm.pbf> --ulos <kansio>
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const [NIMI, LAT, LON, SADE] = pos, lat0 = +LAT, lon0 = +LON, R = +SADE, PBF = opt('pbf'), ULOS = opt('ulos', '.');
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's', ...a);
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
    else if (f === 4 && cb.relaatiot) { let id = 0, ks = [], vs = [], roolit = [], jasenet = [], tyypit = [];
      kentat(b, s, t, (g, w2, x, y) => { if (g === 1) id = x; else if (g === 2) ks = pakatut(b, x, y, (v) => v); else if (g === 3) vs = pakatut(b, x, y, (v) => v);
        else if (g === 8) roolit = pakatut(b, x, y, (v) => v); else if (g === 9) { let r = 0; jasenet = pakatut(b, x, y, (v) => (r += zz(v))); } else if (g === 10) tyypit = pakatut(b, x, y, (v) => v); });
      cb.relaatiot(id, tg(ks, vs), jasenet.map((m, k) => ({ id: m, tyyppi: tyypit[k], rooli: st[roolit[k]] }))); }
  });
}




const rad = Math.PI / 180, mLat = 111320, cl = Math.cos(lat0 * rad);
const enu = ([la, lo]) => [+((lo - lon0) * mLat * cl).toFixed(2), +((la - lat0) * mLat).toFixed(2)];
const lahella = (la, lo) => Math.abs(la - lat0) * mLat <= R * 1.5 && Math.abs(lo - lon0) * mLat * cl <= R * 1.5;
const koord = new Map(), pisteet = [];
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo, t) => { if (!lahella(la, lo)) return; koord.set(id, [la, lo]); if (t && Object.keys(t).length) pisteet.push({ osm: 'node/' + id, t, p: [la, lo] }); } });
const tiet = new Map(), tagTiet = [];
for (const b of lohkot(PBF)) lohko(b, { tiet: (id, t, refs) => { if (!refs.some((r) => koord.has(r))) return; tiet.set(id, refs); if (Object.keys(t).length) tagTiet.push({ osm: 'way/' + id, t, refs }); } });
const rel = [];
for (const b of lohkot(PBF)) lohko(b, { relaatiot: (id, t, j) => { if (t.type !== 'multipolygon') return; const ulko = j.filter((m) => m.tyyppi === 1 && m.rooli !== 'inner' && tiet.has(m.id)).map((m) => tiet.get(m.id)); if (!ulko.length) return;
  rel.push({ osm: 'relation/' + id, t, ulko, sisa: j.filter((m) => m.tyyppi === 1 && m.rooli === 'inner' && tiet.has(m.id)).map((m) => tiet.get(m.id)) }); } });
const liita = (osat0) => { const osat = osat0.map((r) => r.slice()), v = []; while (osat.length) { let r = osat.pop(), k2 = true; while (r[0] !== r[r.length - 1] && k2) { k2 = false; for (let k = 0; k < osat.length; k++) { const o = osat[k], a2 = r[r.length - 1];
  if (o[0] === a2) r = r.concat(o.slice(1)); else if (o[o.length - 1] === a2) r = r.concat(o.slice().reverse().slice(1)); else if (o[o.length - 1] === r[0]) r = o.concat(r.slice(1)); else if (o[0] === r[0]) r = o.slice().reverse().concat(r.slice(1)); else continue; osat.splice(k, 1); k2 = true; break; } }
  if (r[0] === r[r.length - 1] && r.length >= 4) v.push(r); } return v; };
const sis = (p) => Math.hypot((p[1] - lon0) * mLat * cl, (p[0] - lat0) * mLat) <= R;
const F = [], E = [];
for (const q of pisteet) if (sis(q.p)) { F.push({ type: 'Feature', properties: { osm: q.osm, ...q.t }, geometry: { type: 'Point', coordinates: [q.p[1], q.p[0]] } }); E.push({ osm: q.osm, tagit: q.t, piste: enu(q.p) }); }
for (const w of tagTiet) { const g = w.refs.map((r) => koord.get(r)).filter(Boolean); if (g.length < 2 || !g.some(sis)) continue; const suljettu = w.refs[0] === w.refs[w.refs.length - 1] && g.length >= 4;
  F.push({ type: 'Feature', properties: { osm: w.osm, ...w.t }, geometry: suljettu ? { type: 'Polygon', coordinates: [g.map((p) => [p[1], p[0]])] } : { type: 'LineString', coordinates: g.map((p) => [p[1], p[0]]) } });
  E.push({ osm: w.osm, tagit: w.t, ...(suljettu ? { rengas: g.map(enu) } : { viiva: g.map(enu) }) }); }
for (const r of rel) { const ur = liita(r.ulko).map((x) => x.map((n) => koord.get(n))).filter((x) => x.every(Boolean)), sr = liita(r.sisa).map((x) => x.map((n) => koord.get(n))).filter((x) => x.every(Boolean)); if (!ur.length || !ur.some((x) => x.some(sis))) continue;
  F.push({ type: 'Feature', properties: { osm: r.osm, ...r.t }, geometry: { type: 'MultiPolygon', coordinates: ur.map((x) => [x.map((p) => [p[1], p[0]]), ...sr.map((y) => y.map((p) => [p[1], p[0]]))]) } });
  E.push({ osm: r.osm, tagit: r.t, renkaat: ur.map((x) => x.map(enu)), reiat: sr.map((x) => x.map(enu)) }); }
const luokka = (t) => t.man_made || t.historic || t.amenity || t.highway || t.place || t.building || t.tourism || t.leisure || t.landuse || t.natural || t.barrier || t.railway || 'muu';
const yht = {}; for (const e of E) { const k = luokka(e.tagit); yht[k] = (yht[k] || 0) + 1; }
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `${NIMI}-osm.geojson`), JSON.stringify({ type: 'FeatureCollection', name: NIMI, krediitti: '© OpenStreetMap contributors (ODbL)', features: F }));
fs.writeFileSync(path.join(ULOS, `${NIMI}-osm-enu.json`), JSON.stringify({ kohde: NIMI, origo: { lat: lat0, lon: lon0 }, sade_m: R, koordinaatit: 'ENU m [x itä, y pohjoinen] origosta', krediitti: '© OpenStreetMap contributors (ODbL)', yhteenveto: yht, kohteet: E }));
loki('valmis', E.length, 'kohdetta', JSON.stringify(yht));
