#!/usr/bin/env node
// JALANJÄLJET (Karttaseppä 9.10.2026; LS1/omistaja PT 00.52, juna 170: kohteen muotoa seuraava korostus).
// Kierroskohteiden OSM-pohjapiirrokset PBF:stä LS1:n hakujärjestyksessä:
//   1) OSM-elementti (way tai multipolygon-relaatio), jolla wikidata = kohteen Q-tunniste
//   2) rakennus tai alue (building, place=square, bridge, man_made, leisure, tourism=attraction, historic), joka sisältää pisteen (pienin)
//   3) lähin rakennus 40 m:n sisällä (nimen samankaltaisuus ensin, sitten etäisyys)
//   4) muuten laji "ei"
// Korkeus: height (m) tai building:levels × 3,2, muuten null. Koordinaatit [lat, lon], 7 desimaalia (noin 0,01 m).
// Käyttö: node jalanjaljet.mjs <kaupunki-id> --pbf <alue.osm.pbf> --ulos <kansio> [--lahde opas-kierrokset.json]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const A = process.argv.slice(2), opt = (k, d) => { const i = A.indexOf('--' + k); return i >= 0 ? A[i + 1] : d; };
const pos = A.filter((a, i) => !a.startsWith('--') && !(i > 0 && A[i - 1].startsWith('--')));
const LAHDE = opt('lahde', '/Users/Shared/Claude/proto-3d/Matkakirja-proto/Linssit-testit/kultaiset/opas-kierrokset-20261008.json');
const K = JSON.parse(fs.readFileSync(LAHDE, 'utf8')).kaupungit.find((k) => k.id === pos[0]); if (!K) throw new Error('ei kaupunkia ' + pos[0]);
const PBF = opt('pbf'), ULOS = opt('ulos', '.');
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



const rad = Math.PI / 180, mLat = 111320;
const kohteet = K.kohteet.map((k) => ({ ...k, r: Math.max(600, (k.koko_m || 0) * 2.5) }));
const qSet = new Set(kohteet.map((k) => k.id));
const lahella = (la, lo) => kohteet.some((k) => Math.abs(la - k.lat) * mLat <= k.r && Math.abs(lo - k.lon) * mLat * Math.cos(k.lat * rad) <= k.r);
const EHDOKAS = (t) => t.building || t['building:part'] === undefined && (t.place === 'square' || t.bridge === 'yes' || t.man_made || t.leisure || t.tourism === 'attraction' || t.historic || t.amenity === 'place_of_worship' || t['area:highway'] || (t.highway === 'pedestrian' && t.area === 'yes'));
// kierros 1: solmut lähialueelta
const koord = new Map();
for (const b of lohkot(PBF)) lohko(b, { solmut: (id, la, lo) => { if (lahella(la, lo)) koord.set(id, [la, lo]); } });
loki('solmuja lähialueilta', koord.size);
// kierros 2: tiet, joilla solmu lähialueella
const tiet = new Map(), ehdokasTiet = [], osaTiet = [];
for (const b of lohkot(PBF)) lohko(b, { tiet: (id, t, refs) => { if (!refs.some((r) => koord.has(r))) return; tiet.set(id, refs);
  if ((t.wikidata && qSet.has(t.wikidata)) || EHDOKAS(t)) if (refs.length >= 4 && refs[0] === refs[refs.length - 1]) ehdokasTiet.push({ osm: 'way/' + id, t, renkaat: [refs], reiat: [] });
  if (t['building:part'] && (t.height || t['building:levels']) && refs.length >= 4) osaTiet.push({ t, refs }); } });
loki('teitä lähialueilla', tiet.size, 'ehdokasteitä', ehdokasTiet.length);
// kierros 3: relaatiot
function liita(osat0) { const osat = osat0.map((r) => r.slice()), valmiit = [];
  while (osat.length) { let r = osat.pop(), kasvoi = true;
    while (r[0] !== r[r.length - 1] && kasvoi) { kasvoi = false;
      for (let k = 0; k < osat.length; k++) { const o = osat[k], a = r[r.length - 1];
        if (o[0] === a) r = r.concat(o.slice(1)); else if (o[o.length - 1] === a) r = r.concat(o.slice().reverse().slice(1));
        else if (o[o.length - 1] === r[0]) r = o.concat(r.slice(1)); else if (o[0] === r[0]) r = o.slice().reverse().concat(r.slice(1)); else continue;
        osat.splice(k, 1); kasvoi = true; break; } }
    if (r[0] === r[r.length - 1] && r.length >= 4) valmiit.push(r); }
  return valmiit; }
const ehdokasRel = [];
for (const b of lohkot(PBF)) lohko(b, { relaatiot: (id, t, j) => { const wd = t.wikidata && qSet.has(t.wikidata);
  if (!(wd || ((t.type === 'multipolygon' || t.type === 'building') && EHDOKAS(t)))) return;
  const ulko = j.filter((m) => m.tyyppi === 1 && m.rooli !== 'inner' && tiet.has(m.id)).map((m) => tiet.get(m.id));
  const sisa = j.filter((m) => m.tyyppi === 1 && m.rooli === 'inner' && tiet.has(m.id)).map((m) => tiet.get(m.id));
  if (!ulko.length) return; const ur = liita(ulko); if (!ur.length) return; ehdokasRel.push({ osm: 'relation/' + id, t, renkaat: ur, reiat: liita(sisa) }); } });
loki('ehdokasrelaatioita', ehdokasRel.length);
// geometria
const kaikki = [...ehdokasTiet, ...ehdokasRel].map((e) => ({ ...e, renkaat: e.renkaat.map((r) => r.map((n) => koord.get(n))).filter((r) => r.every(Boolean)), reiat: e.reiat.map((r) => r.map((n) => koord.get(n))).filter((r) => r.every(Boolean)) })).filter((e) => e.renkaat.length);
const xy = (p, k) => [(p[1] - k.lon) * mLat * Math.cos(k.lat * rad), (p[0] - k.lat) * mLat];
const sisalla = (pt, rengas, k) => { let c = false; const q = rengas.map((p) => xy(p, k)); for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
const ala = (rengas, k) => { const q = rengas.map((p) => xy(p, k)); let s = 0; for (let i = 0, j = q.length - 1; i < q.length; j = i++) s += (q[j][0] + q[i][0]) * (q[j][1] - q[i][1]); return Math.abs(s / 2); };
const etaisyys = (rengas, k) => { const q = rengas.map((p) => xy(p, k)); let m = 1e9; for (let i = 1; i < q.length; i++) { const [ax, ay] = q[i - 1], [bx, by] = q[i], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1e-9, t = Math.max(0, Math.min(1, (-ax * dx - ay * dy) / L)); m = Math.min(m, Math.hypot(ax + t * dx, ay + t * dy)); } return m; };
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const samankaltaisuus = (a, b) => { const A2 = new Set(norm(a).split(' ').filter((w) => w.length > 2)), B2 = new Set(norm(b).split(' ').filter((w) => w.length > 2)); if (!A2.size || !B2.size) return 0; let y = 0; for (const w of A2) if (B2.has(w) || [...B2].some((v) => v.startsWith(w.slice(0, 5)) || w.startsWith(v.slice(0, 5)))) y++; return y / Math.min(A2.size, B2.size); };
const num = (v) => { const m = /^\s*(-?[0-9]+(?:[.,][0-9]+)?)/.exec(v || ''); return m ? +m[1].replace(',', '.') : NaN; };
const korkeus = (t) => { const h = num(t.height); if (Number.isFinite(h) && h > 0) return +h.toFixed(1); const l = num(t['building:levels']); return Number.isFinite(l) && l > 0 ? +(l * 3.2).toFixed(1) : null; };
const r7 = (r) => r.map(([la, lo]) => [+la.toFixed(7), +lo.toFixed(7)]);
const tulos = [];
for (const k of kohteet) {
  const pt = [0, 0]; let valinta = null, tapa = 'ei';
  const wd = kaikki.filter((e) => e.t.wikidata === k.id);
  if (wd.length) { valinta = wd.sort((a, b) => (b.osm.startsWith('relation') - a.osm.startsWith('relation')) || (ala(b.renkaat[0], k) - ala(a.renkaat[0], k)))[0]; tapa = 'wikidata'; }
  if (!valinta) { const sis = kaikki.filter((e) => e.renkaat.some((r) => sisalla(pt, r, k)) && !e.reiat.some((r) => sisalla(pt, r, k)));
    if (sis.length) { valinta = sis.sort((a, b) => a.renkaat.reduce((s, r) => s + ala(r, k), 0) - b.renkaat.reduce((s, r) => s + ala(r, k), 0))[0]; tapa = 'sisaltaa'; } }
  // alue, vaikka kohde on rakennus (Louvre: wikidata museoalueessa) → suurin rakennus, jonka keskipiste on alueen sisällä
  if (valinta && !valinta.t.building && ['rakennus', 'kirkko', 'museo', 'linna'].includes(k.luokka)) {
    const kp = (e) => { const r = e.renkaat[0], q = r.map((p) => xy(p, k)); return [q.reduce((s2, v) => s2 + v[0], 0) / q.length, q.reduce((s2, v) => s2 + v[1], 0) / q.length]; };
    const sis = kaikki.filter((e) => e !== valinta && e.t.building && valinta.renkaat.some((r) => sisalla(kp(e), r, k)));
    if (sis.length) { valinta = sis.sort((x, y) => y.renkaat.reduce((s2, r) => s2 + ala(r, k), 0) - x.renkaat.reduce((s2, r) => s2 + ala(r, k), 0))[0]; tapa += '+rakennus'; }
  }
  if (!valinta && k.luokka === 'katu') { tulos.push({ id: k.id, nimi: k.nimi, laji: 'ei', osm: null, korkeus_m: null, renkaat: [], reiat: [], haku: 'katu' }); continue; }
  if (!valinta && (k.koko_m || 0) > 250) { tulos.push({ id: k.id, nimi: k.nimi, laji: 'ei', osm: null, korkeus_m: null, renkaat: [], reiat: [], haku: 'laaja' }); continue; } // kanava, kaupunginosa: ei yksittäistä rakennusta
  if (!valinta) { const lahi = kaikki.filter((e) => e.t.building).map((e) => ({ e, d: Math.min(...e.renkaat.map((r) => etaisyys(r, k))), s: samankaltaisuus(k.nimi, e.t.name || e.t['name:fi'] || '') })).filter((x) => x.d <= 40);
    if (lahi.length) { lahi.sort((a, b) => (b.s - a.s) || (a.d - b.d)); valinta = lahi[0].e; tapa = 'lahin40'; } }
  if (!valinta) { tulos.push({ id: k.id, nimi: k.nimi, laji: 'ei', osm: null, korkeus_m: null, renkaat: [], reiat: [], haku: 'ei' }); continue; }
  let kork = korkeus(valinta.t);
  { let osaMax = 0; for (const o of osaTiet) { const q = o.refs.map((n) => koord.get(n)).filter(Boolean); if (q.length < 3) continue; const c2 = [q.reduce((a2, p) => a2 + p[0], 0) / q.length, q.reduce((a2, p) => a2 + p[1], 0) / q.length];
      if (valinta.renkaat.some((r) => sisalla(xy(c2, k), r, k))) { const h = korkeus(o.t); if (h && h > osaMax) osaMax = h; } }
    if (osaMax > (kork || 0) && (valinta.t.building || valinta.t['building:part'])) { kork = osaMax; } } // alueelle ei osien korkeutta (Gamla stan)
  if (!(valinta.t.building || valinta.t['building:part'])) kork = null;
  tulos.push({ id: k.id, nimi: k.nimi, laji: valinta.t.building || valinta.t['building:part'] ? 'rakennus' : 'alue', osm: valinta.osm, osm_nimi: valinta.t.name || '', korkeus_m: kork,
    renkaat: valinta.renkaat.map(r7), reiat: valinta.reiat.map(r7), haku: tapa });
}
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, `jalanjaljet-${K.id}.json`), JSON.stringify({ kaupunki: K.id, lahde: 'OpenStreetMap (Geofabrik PBF)', krediitti: '© OpenStreetMap contributors (ODbL)', haettu: new Date().toISOString(), kohteet: tulos }));
loki('valmis', tulos.map((x) => `${x.nimi}: ${x.laji}/${x.haku}${x.korkeus_m ? ' ' + x.korkeus_m + ' m' : ''}`).join(' | '));
