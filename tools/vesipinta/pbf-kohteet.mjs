#!/usr/bin/env node
// PBF-KOHTEET (Karttaseppä 8.10.2026): Geofabrikin .osm.pbf → kaupungin erikoiskohteet, joita free-shp:ssä ei ole:
//   lautat (way route=ferry), piiput (man_made=chimney), maailmanpyörät (attraction=big_wheel), aukiot (place=square,
//   highway=pedestrian + area=yes), suihkulähteet (amenity=fountain), nimetyt vesialueet (natural=water / water=* / place=sea|bay|strait nimellä).
// Oma minimaalinen PBF-lukija (zlib + protobuf), ei riippuvuuksia. Kaksi kierrosta: 1) tiet ja kiinnostavat solmut, 2) teiden solmujen koordinaatit.
// Käyttö: node pbf-kohteet.mjs <nimi> <lat> <lon> [säde_km 15] --pbf <tiedosto.osm.pbf> --ulos <kansio>
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
const M = 1.5; // lautat jatkuvat ulos: solmut 1,5 × säteen laatikosta, viivat leikataan säteeseen
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
    else if (f === 4 && cb.relaatiot) { let id = 0, ks = [], vs = [], mem = [], tyy = [], roo = [];
      kentat(b, s, t, (g, w2, x, y) => { if (g === 1) id = x; else if (g === 2) ks = pakatut(b, x, y, (v) => v); else if (g === 3) vs = pakatut(b, x, y, (v) => v); else if (g === 8) roo = pakatut(b, x, y, (v) => v); else if (g === 9) { let r = 0; mem = pakatut(b, x, y, (v) => (r += zz(v))); } else if (g === 10) tyy = pakatut(b, x, y, (v) => v); });
      cb.relaatiot(id, tg(ks, vs), mem.map((m, k) => ({ id: m, tyyppi: tyy[k], rooli: st[roo[k]] || '' }))); }
  });
}

// --- kierros 1: tiet ja tagatut solmut ---
const sisaBB = (la, lo) => lo >= bb[0] && lo <= bb[2] && la >= bb[1] && la <= bb[3];
const tiet = [], pisteet = [], tarve = new Set(), rels = [], jasenTiet = new Set();
const VESI = (t) => t.name && (t.natural === 'water' || t.water || t.place === 'sea' || t.place === 'bay' || t.place === 'strait' || t.natural === 'bay' || t.natural === 'strait');
// LS1 9.10. (pallon kaupunkiäänet v1, juna 173): kirkot (kellot), kahvilat (cafe, bar, pub), hallit (marketplace, shop=mall); piste = keskipiste
const UUDET = (t) => t.amenity === 'place_of_worship' && t.religion === 'christian' ? 'kirkot' : ['cafe', 'bar', 'pub'].includes(t.amenity) ? 'kahvilat' : t.amenity === 'marketplace' || t.shop === 'mall' ? 'hallit' : null;
const PISTEKERROS = new Set(['kirkot', 'kahvilat', 'hallit']);
const luokka = (t) => t.route === 'ferry' ? 'lautat' : t.man_made === 'chimney' ? 'piiput' : t.attraction === 'big_wheel' ? 'maailmanpyorat'
  : (t.place === 'square' || (t.highway === 'pedestrian' && t.area === 'yes')) ? 'aukiot' : t.amenity === 'fountain' ? 'suihkulahteet' : UUDET(t) || (VESI(t) ? 'vesialueet' : null);
let nL = 0;
for (const b of lohkot(PBF)) { nL++;
  lohko(b, { solmut: (id, la, lo, t) => { if (t && sisaBB(la, lo)) { const k = luokka(t); if (k) pisteet.push({ k, t, la, lo, osm: 'node/' + id }); } },
    tiet: (id, t, refs) => { const k = luokka(t); if (k) { tiet.push({ k, t, refs, osm: 'way/' + id }); for (const r of refs) tarve.add(r); } },
    relaatiot: (id, t, mem) => { const k = UUDET(t); if (k && t.type === 'multipolygon') { const ww = mem.filter((m) => m.tyyppi === 1 && m.rooli !== 'inner').map((m) => m.id); rels.push({ k, t, ww, osm: 'relation/' + id }); for (const w of ww) jasenTiet.add(w); } } }); }
// kierros 1b: relaatioiden jäsenteiden solmut
const jasenRefs = new Map();
if (rels.length) for (const b of lohkot(PBF)) lohko(b, { tiet: (id, t, refs) => { if (jasenTiet.has(id)) { jasenRefs.set(id, refs); for (const r of refs) tarve.add(r); } } });
loki('relaatioita', rels.length, 'jäsenteitä', jasenRefs.size);
loki('kierros 1:', nL, 'lohkoa,', tiet.length, 'tietä,', pisteet.length, 'pistettä, solmuja tarvitaan', tarve.size);
// --- kierros 2: solmujen koordinaatit ---
const koord = new Map();
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (tarve.has(id)) koord.set(id, [la, lo]); } });
loki('kierros 2: koordinaatteja', koord.size);

const sis = (x, y) => Math.abs(x) <= S && Math.abs(y) <= S, r1 = (v) => Math.round(v * 10) / 10;
const kerrokset = {};
for (const w of tiet) {
  const pts = w.refs.map((r) => koord.get(r)).filter(Boolean).map(([la, lo]) => [r1(eLon(lo)), r1(nLat(la))]);
  if (pts.length < 2 || !pts.some(([x, y]) => sis(x, y))) continue;
  const suljettu = w.refs[0] === w.refs[w.refs.length - 1];
  let osat = [pts];
  if (w.k === 'lautat') { osat = []; let cur = []; for (const q of pts) { if (sis(...q)) cur.push(q); else { if (cur.length >= 2) osat.push(cur); cur = []; } } if (cur.length >= 2) osat.push(cur); }
  const kp = (q) => [r1(q.reduce((a2, v) => a2 + v[0], 0) / q.length), r1(q.reduce((a2, v) => a2 + v[1], 0) / q.length)];
  for (const o of osat) (kerrokset[w.k] ??= []).push({ ...(w.t.name ? { n: w.t.name } : {}), ...(PISTEKERROS.has(w.k) ? { osm: w.osm, piste: kp(suljettu ? o.slice(0, -1) : o) } : {}), ...(suljettu && w.k !== 'lautat' ? { rengas: o } : { p: o }), tagit: Object.fromEntries(Object.entries(w.t).filter(([k]) => ['route', 'man_made', 'attraction', 'place', 'highway', 'amenity', 'natural', 'water', 'height', 'operator', 'duration', 'motor_vehicle', 'foot', 'religion', 'denomination', 'building', 'shop', 'cuisine', 'covered', 'indoor', 'opening_hours', 'wikidata', 'outdoor_seating', 'bells', 'church:type'].includes(k))) });
}
const PIDA_P = ['amenity', 'religion', 'denomination', 'building', 'shop', 'cuisine', 'covered', 'indoor', 'opening_hours', 'wikidata', 'outdoor_seating', 'bells', 'church:type', 'height'];
for (const q of pisteet) { const x = r1(eLon(q.lo)), y = r1(nLat(q.la)); if (!sis(x, y)) continue; (kerrokset[q.k] ??= []).push({ ...(q.t.name ? { n: q.t.name } : {}), ...(q.osm ? { osm: q.osm } : {}), piste: [x, y], ...(q.t.height ? { korkeus_m: q.t.height } : {}), ...(PISTEKERROS.has(q.k) ? { tagit: Object.fromEntries(Object.entries(q.t).filter(([k]) => PIDA_P.includes(k))) } : {}) }); }
for (const r of rels) { const q = r.ww.flatMap((w) => (jasenRefs.get(w) || []).map((n) => koord.get(n)).filter(Boolean)).map(([la, lo]) => [eLon(lo), nLat(la)]); if (q.length < 3) continue;
  const x = r1(q.reduce((a2, v) => a2 + v[0], 0) / q.length), y = r1(q.reduce((a2, v) => a2 + v[1], 0) / q.length); if (!sis(x, y)) continue;
  (kerrokset[r.k] ??= []).push({ ...(r.t.name ? { n: r.t.name } : {}), osm: r.osm, piste: [x, y], tagit: Object.fromEntries(Object.entries(r.t).filter(([k]) => PIDA_P.includes(k))) }); }
const yht = Object.fromEntries(Object.entries(kerrokset).map(([k, v]) => [k, v.length]));
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `kohteet-${NIMI}.json`), JSON.stringify({ kohde: NIMI, origo: { lat: lat0, lon: lon0, ellipsoidikorkeus_m: 0 }, sade_km: S / 1000,
  koordinaatit: 'ENU metreinä [x itä, y pohjoinen], 0,1 m; lautat leikattu säteeseen (p = viiva), alueet rengas = suljettu', lahde: 'OpenStreetMap (Geofabrik .osm.pbf)',
  krediitti: '© OpenStreetMap contributors (ODbL)', yhteenveto: yht, kerrokset, luotu: new Date().toISOString() }));
loki('valmis', JSON.stringify(yht));
