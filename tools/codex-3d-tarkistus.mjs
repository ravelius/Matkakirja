#!/usr/bin/env node
/*
 * Codexin 3D-toimitusten tuontitarkistus (Linnanrakentaja 19.10.2026, PT:n tilaus; omistaja 08.28: uudet 3D-mallit Codexilta).
 * Toimitusmuoto: docs/moduulit/tuotantopohjat/codex-3d-toimitus.md. Tämä skripti on muodon koneellinen portti:
 * VIRHE hylkää tiedoston (paluuarvo 1), HUOM on tiedoksi vastaanottajalle (paluuarvo 0).
 *
 * Käyttö: node tools/codex-3d-tarkistus.mjs <toimituskansio | tiedosto.glb ...> [--json]
 *   Kansio: SHA256SUMS(.txt) pakollinen; jokainen .glb listassa ja tiiviste täsmää; muut 3D-tiedostot (fbx, obj, blend,
 *   gltf) hylätään. Yksittäinen tiedosto: vain mallitarkistus.
 * Testit: tests/codex-3d-tarkistus.test.mjs (synteettiset glb:t, ei verkkoa).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, basename, extname, relative } from 'node:path';

export const RAJAT = {
  tiedostoMt: 15,                 // yksi glb enintään 15 Mt (mobiililataus ämpäristä)
  kuvaPx: 2048,                   // tekstuurin pidempi sivu, kahden potenssi
  kuviaTiedostossa: 8,
  materiaaleja: 32,
  piirtoja: 300,                  // primitiivejä (≈ piirtokutsuja) tiedostossa
  hahmoKolmioita: 40000,          // Tripon oletusraja 40 k; mobiilin yläraja yhdelle hahmolle
  esineKolmioita: 100000,         // maailman osa tai esine yhdessä tiedostossa
  luita: 150,
  hahmoKorkeus: [0.5, 2.5],       // m
  jalatOrigossa: 0.03,            // hahmon alin piste |y| ≤ 3 cm
  keskiOrigossa: 0.2,             // hahmon pohjan keskipiste x, z ≤ 20 cm origosta
  esineMitta: [0.01, 1000],       // pisin sivu metreinä (alle = mm/cm-virhe, yli = väärä yksikkö)
};
export const PAKOLLISET_LUUT = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head',
  ...['Left', 'Right'].flatMap((s) => ['Shoulder', 'Arm', 'ForeArm', 'Hand', 'UpLeg', 'Leg', 'Foot', 'ToeBase'].map((l) => s + l))]
  .map((l) => 'mixamorig:' + l);
export const PAKOLLISET_ANIMAATIOT = ['idle'];
const SALLITUT_LAAJENNUKSET = new Set(['KHR_texture_transform', 'KHR_materials_emissive_strength', 'KHR_materials_unlit']);
const NIMI = /^[a-z0-9][a-z0-9_-]{0,47}\.glb$/;
const ANIM_NIMI = /^[a-z0-9][a-z0-9_]*$/;
const MUUT_3D = new Set(['.fbx', '.obj', '.blend', '.gltf', '.dae', '.usdz', '.3ds', '.stl', '.ply']);

// ---------------------------------------------------------------- glb-lukija
export function luoGlb(buf) {
  if (buf.length < 20 || buf.toString('latin1', 0, 4) !== 'glTF') throw new Error('ei glb-tiedosto (glTF-otsake puuttuu)');
  if (buf.readUInt32LE(4) !== 2) throw new Error(`glb-versio ${buf.readUInt32LE(4)}, vaaditaan 2`);
  const jlen = buf.readUInt32LE(12);
  if (buf.toString('latin1', 16, 20) !== 'JSON') throw new Error('ensimmäinen lohko ei ole JSON');
  const json = JSON.parse(buf.toString('utf8', 20, 20 + jlen));
  let bin = null; const o = 20 + jlen;
  if (buf.length >= o + 8 && buf.toString('latin1', o + 4, o + 8) === 'BIN\0') bin = buf.subarray(o + 8, o + 8 + buf.readUInt32LE(o));
  return { json, bin };
}
const KOMP = { 5120: [1, 'getInt8', 127], 5121: [1, 'getUint8', 255], 5122: [2, 'getInt16', 32767], 5123: [2, 'getUint16', 65535], 5125: [4, 'getUint32', 1], 5126: [4, 'getFloat32', 1] };
const LKM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
export function lueAccessor(g, i) {
  const a = g.json.accessors[i]; const n = LKM[a.type]; const [k, f, max] = KOMP[a.componentType];
  if (a.bufferView === undefined || !g.bin) return Array.from({ length: a.count }, () => new Array(n).fill(0));
  const bv = g.json.bufferViews[a.bufferView]; const st = bv.byteStride || k * n;
  const dv = new DataView(g.bin.buffer, g.bin.byteOffset + (bv.byteOffset || 0) + (a.byteOffset || 0));
  const out = [];
  for (let r = 0; r < a.count; r++) {
    const v = [];
    for (let c = 0; c < n; c++) { const x = dv[f](r * st + c * k, true); v.push(a.normalized ? Math.max(x / max, -1) : x); }
    out.push(v);
  }
  return out;
}
// 4×4 sarakejärjestyksessä kuten glTF
const kerro = (a, b) => { const o = new Array(16).fill(0); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]; return o; };
const piste = (m, p) => [0, 1, 2].map((r) => m[r] * p[0] + m[4 + r] * p[1] + m[8 + r] * p[2] + m[12 + r]);
function paikallinen(n) {
  if (n.matrix) return n.matrix.slice();
  const [x, y, z, w] = n.rotation || [0, 0, 0, 1]; const [sx, sy, sz] = n.scale || [1, 1, 1]; const t = n.translation || [0, 0, 0];
  return [(1 - 2 * (y * y + z * z)) * sx, 2 * (x * y + z * w) * sx, 2 * (x * z - y * w) * sx, 0,
    2 * (x * y - z * w) * sy, (1 - 2 * (x * x + z * z)) * sy, 2 * (y * z + x * w) * sy, 0,
    2 * (x * z + y * w) * sz, 2 * (y * z - x * w) * sz, (1 - 2 * (x * x + y * y)) * sz, 0, t[0], t[1], t[2], 1];
}
export function maailmaMatriisit(json) {
  const N = json.nodes || []; const M = new Array(N.length).fill(null);
  const kay = (i, P) => { M[i] = kerro(P, paikallinen(N[i])); for (const c of N[i].children || []) kay(c, M[i]); };
  const I = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const sc = (json.scenes || [])[json.scene || 0];
  for (const r of sc ? sc.nodes : N.map((_, i) => i)) kay(r, I);
  return M;
}
function kuvanKoko(b) {
  if (b.length > 24 && b[0] === 0x89 && b.toString('latin1', 1, 4) === 'PNG') return { muoto: 'png', w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let o = 2; o + 9 < b.length;) {
      if (b[o] !== 0xff) { o++; continue; }
      const m = b[o + 1]; const L = b.readUInt16BE(o + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { muoto: 'jpg', w: b.readUInt16BE(o + 7), h: b.readUInt16BE(o + 5) };
      o += 2 + L;
    }
    return { muoto: 'jpg', w: 0, h: 0 };
  }
  return { muoto: 'tuntematon', w: 0, h: 0 };
}

// ---------------------------------------------------------------- yhden glb:n tarkistus
export function tarkistaGlb(buf, nimi) {
  const V = []; const H = []; const T = { nimi };
  if (!NIMI.test(nimi)) V.push(`nimi "${nimi}": vain pienet a–z, 0–9, - ja _, enintään 48 merkkiä, pääte .glb`);
  if (buf.length > RAJAT.tiedostoMt * 1e6) V.push(`koko ${(buf.length / 1e6).toFixed(1)} Mt > ${RAJAT.tiedostoMt} Mt`);
  let g;
  try { g = luoGlb(buf); } catch (e) { V.push(e.message); return { nimi, virheet: V, huomiot: H, tiedot: T }; }
  const j = g.json;
  if (j.asset?.version !== '2.0') V.push(`asset.version ${j.asset?.version}, vaaditaan 2.0`);
  for (const e of j.extensionsRequired || []) if (!SALLITUT_LAAJENNUKSET.has(e)) V.push(`vaadittu laajennus ${e} ei ole sallittu (esim. Draco/meshopt-pakkaus puretaan ennen toimitusta)`);
  for (const k of ['buffers', 'images']) for (const x of j[k] || []) if (x.uri) V.push(`${k}: ulkoinen tiedosto "${x.uri.slice(0, 40)}" – kaikki upotetaan glb:hen`);
  // kolmiot ja piirrot
  let kolmiot = 0, piirrot = 0; const W = maailmaMatriisit(j);
  for (const m of j.meshes || []) for (const p of m.primitives) {
    piirrot++;
    const mode = p.mode ?? 4; const c = j.accessors[p.indices ?? p.attributes.POSITION].count;
    if (mode === 4) kolmiot += c / 3; else if (mode === 5 || mode === 6) kolmiot += c - 2; else V.push(`primitiivi mode ${mode} (pisteet/viivat) – vain kolmiot`);
  }
  const skinit = j.skins || []; const hahmo = skinit.length > 0;
  Object.assign(T, { tyyppi: hahmo ? 'hahmo' : 'esine', kolmiot: Math.round(kolmiot), piirrot, materiaalit: (j.materials || []).length, solmut: (j.nodes || []).length });
  const kraja = hahmo ? RAJAT.hahmoKolmioita : RAJAT.esineKolmioita;
  if (kolmiot > kraja) V.push(`${Math.round(kolmiot)} kolmiota > ${kraja} (${T.tyyppi})`);
  if (piirrot > RAJAT.piirtoja) V.push(`${piirrot} primitiiviä > ${RAJAT.piirtoja} (piirtokutsut: yhdistä saman materiaalin osat)`);
  if (T.materiaalit > RAJAT.materiaaleja) V.push(`${T.materiaalit} materiaalia > ${RAJAT.materiaaleja}`);
  // kuvat
  const kuvat = (j.images || []).map((im) => {
    if (im.bufferView === undefined || !g.bin) return { muoto: 'puuttuu', w: 0, h: 0 };
    const bv = j.bufferViews[im.bufferView]; return kuvanKoko(g.bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength));
  });
  T.kuvat = kuvat.map((k) => `${k.w}×${k.h} ${k.muoto}`);
  if (kuvat.length > RAJAT.kuviaTiedostossa) V.push(`${kuvat.length} tekstuuria > ${RAJAT.kuviaTiedostossa}`);
  kuvat.forEach((k, i) => {
    if (!['png', 'jpg'].includes(k.muoto)) V.push(`kuva ${i}: muoto ${k.muoto}, vain PNG tai JPEG`);
    else if (Math.max(k.w, k.h) > RAJAT.kuvaPx) V.push(`kuva ${i}: ${k.w}×${k.h} > ${RAJAT.kuvaPx} px`);
    else if ([k.w, k.h].some((x) => x & (x - 1))) V.push(`kuva ${i}: ${k.w}×${k.h} ei ole kahden potenssi`);
  });
  // rajat (m, Y ylös)
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  const lisaa = (p) => p.forEach((x, k) => { if (Number.isFinite(x)) { mn[k] = Math.min(mn[k], x); mx[k] = Math.max(mx[k], x); } else V.push('sijainnissa NaN tai ääretön'); });
  (j.nodes || []).forEach((n, i) => {
    if (n.mesh === undefined || !W[i]) return;
    for (const p of j.meshes[n.mesh].primitives) {
      const a = j.accessors[p.attributes.POSITION];
      if (n.skin !== undefined && g.bin) {             // hahmo: lepoasento luiden kautta (solmun oma muunnos ohitetaan, glTF 2.0)
        const s = j.skins[n.skin]; const P = lueAccessor(g, p.attributes.POSITION);
        const J = p.attributes.JOINTS_0 !== undefined ? lueAccessor(g, p.attributes.JOINTS_0) : null; const Wt = p.attributes.WEIGHTS_0 !== undefined ? lueAccessor(g, p.attributes.WEIGHTS_0) : null;
        const IB = s.inverseBindMatrices !== undefined ? lueAccessor(g, s.inverseBindMatrices) : s.joints.map(() => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        const S = s.joints.map((ji, k) => kerro(W[ji], IB[k]));
        for (let v = 0; v < P.length; v += 1) {
          if (!J) { lisaa(P[v]); continue; }
          const q = [0, 0, 0];
          for (let k = 0; k < 4; k++) { const w = Wt[v][k]; if (w > 0) piste(S[J[v][k]], P[v]).forEach((x, d) => { q[d] += w * x; }); }
          lisaa(q);
        }
      } else if (a.min && a.max) {
        for (const c of [0, 1, 2, 3, 4, 5, 6, 7]) lisaa(piste(W[i], [c & 1 ? a.max[0] : a.min[0], c & 2 ? a.max[1] : a.min[1], c & 4 ? a.max[2] : a.min[2]]));
      } else V.push(`POSITION ilman min/max (solmu ${n.name || i})`);
    }
  });
  if (Number.isFinite(mn[0])) {
    const koko = [0, 1, 2].map((k) => mx[k] - mn[k]);
    T.rajat = { min: mn.map((x) => +x.toFixed(3)), max: mx.map((x) => +x.toFixed(3)), koko: koko.map((x) => +x.toFixed(3)) };
    if (hahmo) {
      const [k0, k1] = RAJAT.hahmoKorkeus;
      if (koko[1] < k0 || koko[1] > k1) V.push(`hahmon korkeus ${koko[1].toFixed(2)} m ei ole välillä ${k0}–${k1} m (yksikkö metri, Y ylös)`);
      if (Math.abs(mn[1]) > RAJAT.jalatOrigossa) V.push(`jalat y = ${mn[1].toFixed(3)} m, pitää olla 0 ± ${RAJAT.jalatOrigossa} (pivot jalkojen kohdalla)`);
      const cx = (mn[0] + mx[0]) / 2, cz = (mn[2] + mx[2]) / 2;
      if (Math.hypot(cx, cz) > RAJAT.keskiOrigossa) V.push(`hahmon keskikohta (${cx.toFixed(2)}, ${cz.toFixed(2)}) m yli ${RAJAT.keskiOrigossa} m origosta`);
      if (koko[0] > koko[1] * 1.2 || koko[2] > koko[1]) H.push(`hahmo leveämpi kuin korkea (${koko.map((x) => x.toFixed(2)).join(' × ')} m) – onko Y ylös?`);
    } else {
      const L = Math.max(...koko); const [e0, e1] = RAJAT.esineMitta;
      if (L < e0 || L > e1) V.push(`pisin sivu ${L.toFixed(3)} m ei ole välillä ${e0}–${e1} m (yksikkö metri)`);
    }
  }
  // luut ja animaatiot
  if (hahmo) {
    if (skinit.length > 1) V.push(`${skinit.length} luurankoa, sallitaan yksi`);
    const s = skinit[0]; const nimet = new Set(s.joints.map((i) => j.nodes[i].name));
    T.luut = s.joints.length;
    if (s.joints.length > RAJAT.luita) V.push(`${s.joints.length} luuta > ${RAJAT.luita}`);
    const puuttuu = PAKOLLISET_LUUT.filter((l) => !nimet.has(l));
    if (puuttuu.length) V.push(`luut puuttuvat (Mixamo-nimet): ${puuttuu.join(', ')}`);
    const an = (j.animations || []).map((a) => a.name || '');
    T.animaatiot = an;
    for (const a of PAKOLLISET_ANIMAATIOT) if (!an.includes(a)) V.push(`animaatio "${a}" puuttuu`);
    for (const a of an) if (!ANIM_NIMI.test(a)) V.push(`animaation nimi "${a}": vain pienet a–z, 0–9 ja _`);
    const juuret = ((j.scenes || [])[j.scene || 0]?.nodes || []);
    for (const r of juuret) { const sc = j.nodes[r].scale; if (sc && sc.some((x) => Math.abs(x - 1) > 1e-3)) H.push(`juurisolmun "${j.nodes[r].name}" skaala ${sc[0].toFixed(3)} – sovella skaala (Ctrl+A) ennen vientiä`); }
  } else if ((j.animations || []).length) H.push(`${j.animations.length} animaatiota esineessä – tarkista, että ne ovat tarkoituksellisia`);
  return { nimi, virheet: V, huomiot: H, tiedot: T };
}

// ---------------------------------------------------------------- toimituskansio
export function lueManifesti(teksti) {
  const m = new Map();
  for (const r of teksti.split(/\r?\n/)) { const x = r.trim().match(/^([0-9a-f]{64})\s+\*?(.+)$/i); if (x) m.set(x[2].replace(/^\.\//, ''), x[1].toLowerCase()); }
  return m;
}
const kaikki = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? kaikki(p) : [p]; });
export function tarkistaToimitus(kansio) {
  const tulos = { kansio, virheet: [], tiedostot: [] };
  const mf = ['SHA256SUMS', 'SHA256SUMS.txt'].map((n) => join(kansio, n)).find(existsSync);
  if (!mf) tulos.virheet.push('SHA256SUMS(.txt) puuttuu toimituksen juuresta');
  const M = mf ? lueManifesti(readFileSync(mf, 'utf8')) : new Map();
  const polut = kaikki(kansio).map((p) => relative(kansio, p)).filter((p) => !p.startsWith('.') && !/(^|\/)\./.test(p));
  for (const p of polut) if (MUUT_3D.has(extname(p).toLowerCase())) tulos.virheet.push(`${p}: muoto ${extname(p)} ei kelpaa, vain .glb`);
  for (const p of polut.filter((x) => extname(x).toLowerCase() === '.glb')) {
    const buf = readFileSync(join(kansio, p)); const r = tarkistaGlb(buf, basename(p)); r.polku = p;
    const h = createHash('sha256').update(buf).digest('hex');
    if (mf && !M.has(p)) r.virheet.push('ei SHA256SUMS-listassa');
    else if (mf && M.get(p) !== h) r.virheet.push(`SHA-256 ei täsmää (lista ${M.get(p).slice(0, 12)}…, tiedosto ${h.slice(0, 12)}…)`);
    tulos.tiedostot.push(r);
  }
  for (const p of M.keys()) if (extname(p).toLowerCase() === '.glb' && !polut.includes(p)) tulos.virheet.push(`${p}: listassa mutta puuttuu kansiosta`);
  if (!tulos.tiedostot.length) tulos.virheet.push('ei yhtään .glb-tiedostoa');
  return tulos;
}

// ---------------------------------------------------------------- komentorivi
function tulosta(r) {
  const t = r.tiedot; const tila = r.virheet.length ? 'HYLÄTTY' : 'OK';
  console.log(`${tila.padEnd(8)} ${r.polku || r.nimi}  ${t.tyyppi || ''} ${t.kolmiot ?? ''} kolm, ${t.piirrot ?? ''} piirtoa, ${t.materiaalit ?? ''} mat` +
    (t.rajat ? `, koko ${t.rajat.koko.join(' × ')} m` : '') + (t.luut ? `, ${t.luut} luuta` : '') + (t.animaatiot ? `, anim ${t.animaatiot.join(' ')}` : ''));
  for (const v of r.virheet) console.log(`         VIRHE ${v}`);
  for (const h of r.huomiot) console.log(`         HUOM  ${h}`);
}
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const args = process.argv.slice(2); const json = args.includes('--json'); const kohteet = args.filter((a) => a !== '--json');
  if (!kohteet.length) { console.error('käyttö: node tools/codex-3d-tarkistus.mjs <toimituskansio | tiedosto.glb ...> [--json]'); process.exit(2); }
  let hylatty = 0; const kaikkiTulokset = [];
  for (const k of kohteet) {
    if (statSync(k).isDirectory()) {
      const t = tarkistaToimitus(k); kaikkiTulokset.push(t);
      if (!json) { console.log(`== ${k}`); for (const v of t.virheet) console.log(`VIRHE    ${v}`); t.tiedostot.forEach(tulosta); }
      hylatty += t.virheet.length + t.tiedostot.filter((r) => r.virheet.length).length;
    } else {
      const r = tarkistaGlb(readFileSync(k), basename(k)); kaikkiTulokset.push(r); if (!json) tulosta(r); hylatty += r.virheet.length ? 1 : 0;
    }
  }
  if (json) console.log(JSON.stringify(kaikkiTulokset, null, 1));
  else console.log(hylatty ? `HYLÄTTY: ${hylatty} poikkeamaa` : 'KAIKKI OK');
  process.exit(hylatty ? 1 : 0);
}
