#!/usr/bin/env node
// VESIRELAATIOT (Karttaseppä 8.10.2026): OSM-vesialueiden monikulmiorelaatiot (natural=water, waterway=riverbank, water=*) PBF:stä
// renkaiksi. Geofabrikin free-shp pudottaa aluerajan katkaisemat relaatiot (Pariisi: Seine ja Marne puuttuivat).
// Tulos vesipinta.mjs:n --lisa-syötteeksi: { polygonit: [{ lahde, nimi, renkaat: [[[lon, lat], …], …] }] } (ulko- ja sisärenkaat, parillisuus).
// Käyttö: node vesirelaatiot.mjs <tiedosto.osm.pbf> <ulos.json> <lon0> <lat0> <lon1> <lat1>
import fs from 'node:fs';
import zlib from 'node:zlib';
const [PBF, ULOS, ...BB] = process.argv.slice(2), bb = BB.map(Number);
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


const vesi = (t) => t.natural === 'water' || t.waterway === 'riverbank' || (t.water && t.natural !== 'wetland');
const rel = [], tarveTie = new Set();
for (const b of lohkot(PBF)) lohko(b, { relaatiot: (id, t, j) => { if ((t.type === 'multipolygon' || t.type === 'boundary') && vesi(t)) { rel.push({ id, t, j: j.filter((m) => m.tyyppi === 1) }); for (const m of rel[rel.length - 1].j) tarveTie.add(m.id); } } });
loki('vesirelaatioita', rel.length, 'jäsenteitä', tarveTie.size);
const tiet = new Map(), tarveSolmu = new Set();
for (const b of lohkot(PBF)) lohko(b, { tiet: (id, t, refs) => { if (tarveTie.has(id)) { tiet.set(id, refs); for (const r of refs) tarveSolmu.add(r); } } });
const koord = new Map();
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (tarveSolmu.has(id)) koord.set(id, [lo, la]); } });
loki('teitä', tiet.size, 'solmuja', koord.size);
function renkaat(jasenet) { // liitä tiet päätepisteistä suljetuiksi renkaiksi
  const osat = jasenet.map((m) => tiet.get(m.id)).filter((r) => r && r.length >= 2).map((r) => r.slice()), valmiit = [];
  while (osat.length) { let r = osat.pop(); let kasvoi = true;
    while (r[0] !== r[r.length - 1] && kasvoi) { kasvoi = false;
      for (let k = 0; k < osat.length; k++) { const o = osat[k]; const a = r[r.length - 1];
        if (o[0] === a) { r = r.concat(o.slice(1)); } else if (o[o.length - 1] === a) { r = r.concat(o.slice().reverse().slice(1)); }
        else if (o[o.length - 1] === r[0]) { r = o.concat(r.slice(1)); } else if (o[0] === r[0]) { r = o.slice().reverse().concat(r.slice(1)); } else continue;
        osat.splice(k, 1); kasvoi = true; break; } }
    if (r[0] === r[r.length - 1] && r.length >= 4) valmiit.push(r); }
  return valmiit.map((r) => r.map((n) => koord.get(n)).filter(Boolean));
}
const ulos = [];
for (const r of rel) { const rr = renkaat(r.j).filter((g) => g.some(([lo, la]) => lo >= bb[0] && lo <= bb[2] && la >= bb[1] && la <= bb[3]));
  if (!rr.length) continue; ulos.push({ lahde: r.t.water === 'river' || r.t.waterway === 'riverbank' ? 'osm-river' : 'osm-water', nimi: r.t.name || '', renkaat: rr }); }
fs.writeFileSync(ULOS, JSON.stringify({ lahde: 'OpenStreetMap (PBF, monikulmiorelaatiot)', krediitti: '© OpenStreetMap contributors (ODbL)', polygonit: ulos }));
loki('valmis', ulos.length, 'polygonia:', ulos.slice(0, 12).map((p) => p.nimi).join(', '));
