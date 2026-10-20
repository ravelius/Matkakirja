/*
 * Codexin 3D-toimitusten tuontitarkistus (tools/codex-3d-tarkistus.mjs) hylkää toimitusmuodosta
 * (docs/moduulit/tuotantopohjat/codex-3d-toimitus.md) poikkeavat tiedostot. Synteettiset glb:t, ei verkkoa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { tarkistaGlb, tarkistaToimitus, PAKOLLISET_LUUT } from '../tools/codex-3d-tarkistus.mjs';

// glb: json + binäärilohko (Float32/Uint8/Uint16-taulukot peräkkäin, 4 tavun tasaus)
function glb(json, osat = []) {
  const palat = []; let o = 0; json.bufferViews = [];
  for (const t of osat) {
    const b = Buffer.from(t.buffer, t.byteOffset, t.byteLength); const pad = (4 - (b.length % 4)) % 4;
    json.bufferViews.push({ buffer: 0, byteOffset: o, byteLength: b.length }); palat.push(b, Buffer.alloc(pad)); o += b.length + pad;
  }
  const bin = Buffer.concat(palat);
  if (bin.length) json.buffers = [{ byteLength: bin.length }];
  let js = Buffer.from(JSON.stringify(json)); js = Buffer.concat([js, Buffer.alloc((4 - (js.length % 4)) % 4, 0x20)]);
  const h = Buffer.alloc(12); h.write('glTF', 0, 'latin1'); h.writeUInt32LE(2, 4); h.writeUInt32LE(12 + 8 + js.length + (bin.length ? 8 + bin.length : 0), 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(js.length, 0); jh.write('JSON', 4, 'latin1');
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length, 0); bh.write('BIN\0', 4, 'latin1');
  return Buffer.concat([h, jh, js, ...(bin.length ? [bh, bin] : [])]);
}
const png = (w, h) => { const b = Buffer.alloc(33); Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b); b.writeUInt32BE(13, 8); b.write('IHDR', 12, 'latin1'); b.writeUInt32BE(w, 16); b.writeUInt32BE(h, 20); return new Uint8Array(b); };

// laatikko (12 kolmiota) w × h × d, pohja y = y0
function laatikko(w, h, d, y0 = 0) {
  const P = []; for (const c of [0, 1, 2, 3, 4, 5, 6, 7]) P.push(c & 1 ? w / 2 : -w / 2, y0 + (c & 2 ? h : 0), c & 4 ? d / 2 : -d / 2);
  const I = [0, 1, 3, 0, 3, 2, 4, 6, 7, 4, 7, 5, 0, 4, 5, 0, 5, 1, 2, 3, 7, 2, 7, 6, 0, 2, 6, 0, 6, 4, 1, 5, 7, 1, 7, 3];
  return { P: new Float32Array(P), I: new Uint16Array(I), min: [-w / 2, y0, -d / 2], max: [w / 2, y0 + h, d / 2] };
}
function esine({ koko = [2, 1, 3], kuva = null, lisa = {}, kolmioKerroin = 1 } = {}) {
  const l = laatikko(...koko); const osat = [l.P, l.I]; const j = {
    asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [0] }], nodes: [{ name: 'penkki', mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 }, indices: 1, material: 0 }] }], materials: [{ name: 'puu' }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 8, type: 'VEC3', min: l.min, max: l.max },
      { bufferView: 1, componentType: 5123, count: 36 * kolmioKerroin, type: 'SCALAR' }], ...lisa,
  };
  if (kuva) { osat.push(kuva); j.images = [{ bufferView: 2, mimeType: 'image/png' }]; j.textures = [{ source: 0 }]; }
  return glb(j, osat);
}
// hahmo: laatikko 0,5 × korkeus × 0,3, jokainen piste painolla 1 luuhun 0 (Hips origossa), Mixamo-luut, animaatiot
function hahmo({ korkeus = 1.7, y0 = 0, luut = PAKOLLISET_LUUT, animaatiot = ['idle', 'run'], juuriSkaala = null } = {}) {
  const l = laatikko(0.5, korkeus, 0.3, y0);
  const J = new Uint8Array(8 * 4); const W = new Float32Array(8 * 4); for (let v = 0; v < 8; v++) W[v * 4] = 1;
  const IB = new Float32Array(16 * luut.length); for (let k = 0; k < luut.length; k++) [0, 5, 10, 15].forEach((x) => { IB[k * 16 + x] = 1; });
  const nodes = luut.map((n) => ({ name: n }));
  nodes.push({ name: 'keho', mesh: 0, skin: 0 }, { name: 'Armature', children: [...luut.keys(), luut.length], ...(juuriSkaala ? { scale: [juuriSkaala, juuriSkaala, juuriSkaala] } : {}) });
  const aika = new Float32Array([0, 1]); const rot = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1]);
  return glb({
    asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [nodes.length - 1] }], nodes,
    meshes: [{ primitives: [{ attributes: { POSITION: 0, JOINTS_0: 2, WEIGHTS_0: 3 }, indices: 1, material: 0 }] }], materials: [{ name: 'iho' }],
    skins: [{ joints: [...luut.keys()], inverseBindMatrices: 4 }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 8, type: 'VEC3', min: l.min, max: l.max },
      { bufferView: 1, componentType: 5123, count: 36, type: 'SCALAR' }, { bufferView: 2, componentType: 5121, count: 8, type: 'VEC4' },
      { bufferView: 3, componentType: 5126, count: 8, type: 'VEC4' }, { bufferView: 4, componentType: 5126, count: luut.length, type: 'MAT4' },
      { bufferView: 5, componentType: 5126, count: 2, type: 'SCALAR', min: [0], max: [1] }, { bufferView: 6, componentType: 5126, count: 2, type: 'VEC4' }],
    animations: animaatiot.map((name) => ({ name, samplers: [{ input: 5, output: 6 }], channels: [{ sampler: 0, target: { node: 0, path: 'rotation' } }] })),
  }, [l.P, l.I, J, W, IB, aika, rot]);
}
const virheet = (b, nimi = 'malli.glb') => tarkistaGlb(b, nimi).virheet;
const sisaltaa = (lista, osa) => assert.ok(lista.some((v) => v.includes(osa)), `odotettiin virhettä "${osa}", saatiin: ${JSON.stringify(lista)}`);

test('kelvollinen esine ja hahmo menevät läpi', () => {
  assert.deepEqual(virheet(esine({ kuva: png(1024, 512) }), 'penkki.glb'), []);
  const r = tarkistaGlb(hahmo(), 'vartija.glb');
  assert.deepEqual(r.virheet, []); assert.equal(r.tiedot.tyyppi, 'hahmo'); assert.equal(r.tiedot.rajat.koko[1], 1.7);
});

test('nimi, ulkoinen tiedosto, pakkauslaajennus ja muu kuin glb hylätään', () => {
  sisaltaa(virheet(esine(), 'Penkki Iso.glb'), 'nimi');
  sisaltaa(virheet(esine({ lisa: { images: [{ uri: 'puu.png' }] } })), 'ulkoinen tiedosto');
  sisaltaa(virheet(esine({ lisa: { extensionsRequired: ['KHR_draco_mesh_compression'] } })), 'KHR_draco_mesh_compression');
  sisaltaa(virheet(Buffer.from('Kaydara FBX Binary  \0')), 'ei glb-tiedosto');
});

test('väärä yksikkö ja liian raskas malli hylätään', () => {
  sisaltaa(virheet(esine({ koko: [2000, 500, 3000] })), 'pisin sivu');            // millimetreinä vietty
  sisaltaa(virheet(esine({ koko: [0.002, 0.001, 0.003] })), 'pisin sivu');        // kilometreinä / väärä skaala
  sisaltaa(virheet(esine({ kolmioKerroin: 9000 })), 'kolmiota');                  // 108 000 kolmiota > 100 000
  sisaltaa(virheet(esine({ kuva: png(4096, 4096) })), '4096');
  sisaltaa(virheet(esine({ kuva: png(1000, 1000) })), 'kahden potenssi');
});

test('hahmon mittakaava, pivot, luut ja animaatiot tarkistetaan', () => {
  sisaltaa(virheet(hahmo({ korkeus: 170 })), 'korkeus');                          // senttimetreinä
  sisaltaa(virheet(hahmo({ y0: -0.85 })), 'jalat');                               // pivot keskellä, ei jaloissa
  sisaltaa(virheet(hahmo({ luut: PAKOLLISET_LUUT.filter((l) => !l.endsWith('Head')) })), 'mixamorig:Head');
  sisaltaa(virheet(hahmo({ animaatiot: ['Run'] })), 'idle');
  sisaltaa(virheet(hahmo({ animaatiot: ['idle', 'Armature|Run'] })), 'Armature|Run');
  const r = tarkistaGlb(hahmo({ korkeus: 1.0, juuriSkaala: 1.5 }), 'puyi.glb');   // skaala soveltamatta: 1,5 m, vain HUOM
  assert.deepEqual(r.virheet, []); assert.equal(r.tiedot.rajat.koko[1], 1.5); sisaltaa(r.huomiot, 'skaala');
});

test('toimituskansio: SHA256SUMS pakollinen ja täsmää, FBX hylätään', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-')); mkdirSync(join(d, 'hahmot'));
  const b = hahmo(); writeFileSync(join(d, 'hahmot', 'vartija.glb'), b);
  assert.ok(tarkistaToimitus(d).virheet.some((v) => v.includes('SHA256SUMS')));
  const sha = createHash('sha256').update(b).digest('hex');
  writeFileSync(join(d, 'SHA256SUMS'), `${sha}  hahmot/vartija.glb\n`);
  let t = tarkistaToimitus(d); assert.deepEqual(t.virheet, []); assert.deepEqual(t.tiedostot[0].virheet, []);
  writeFileSync(join(d, 'SHA256SUMS'), `${'0'.repeat(64)}  hahmot/vartija.glb\n`);
  sisaltaa(tarkistaToimitus(d).tiedostot[0].virheet, 'SHA-256 ei täsmää');
  writeFileSync(join(d, 'SHA256SUMS'), `${sha}  hahmot/vartija.glb\n`); writeFileSync(join(d, 'hahmot', 'vartija.fbx'), 'x');
  sisaltaa(tarkistaToimitus(d).virheet, '.fbx');
});

test('toimituskansio: erilliset kuvat ja tekstuurit tarkistetaan (Codex toimittaa kaiken grafiikan)', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-kuvat-')); mkdirSync(join(d, 'tekstuurit')); mkdirSync(join(d, 'havainne')); mkdirSync(join(d, 'esikatselu'));
  const kirjoita = (p, b) => { writeFileSync(join(d, p), b); return `${createHash('sha256').update(b).digest('hex')}  ${p}\n`; };
  let sums = kirjoita('tekstuurit/kivi.png', png(1024, 512)) + kirjoita('havainne/linna.png', png(1600, 900));
  kirjoita('esikatselu/linna.png', png(640, 360));                                  // esikatselu ei tarvitse listaa
  writeFileSync(join(d, 'SHA256SUMS'), sums);
  let t = tarkistaToimitus(d);
  assert.deepEqual(t.virheet, []); assert.ok(t.tiedostot.every((r) => !r.virheet.length)); sisaltaa(t.huomiot, 'LAHTEET.md');
  writeFileSync(join(d, 'LAHTEET.md'), 'Codex');
  assert.equal(tarkistaToimitus(d).huomiot, undefined);
  sums += kirjoita('tekstuurit/seina.png', png(1000, 1000)) + kirjoita('tekstuurit/katto.png', png(4096, 4096));
  writeFileSync(join(d, 'SHA256SUMS'), sums); kirjoita('tekstuurit/listaton.png', png(256, 256));
  const r = Object.fromEntries(tarkistaToimitus(d).tiedostot.map((x) => [x.polku, x.virheet]));
  sisaltaa(r['tekstuurit/seina.png'], 'kahden potensseja'); sisaltaa(r['tekstuurit/katto.png'], '2048');
  sisaltaa(r['tekstuurit/listaton.png'], 'ei SHA256SUMS-listassa');
  writeFileSync(join(d, 'SHA256SUMS'), sums + `${'0'.repeat(64)}  tekstuurit/puuttuu.png\n`);
  sisaltaa(tarkistaToimitus(d).virheet, 'puuttuu kansiosta');
});

test('toimituskansio: Codexin MANIFEST.json kelpaa manifestiksi alikansioittain, qa/ ohitetaan', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-manifest-')); mkdirSync(join(d, 'erä-b', 'qa'), { recursive: true });
  const b = png(1600, 900); writeFileSync(join(d, 'erä-b', '13-kuva.png'), b); writeFileSync(join(d, 'erä-b', 'qa', 'arkki.png'), png(160, 90));
  writeFileSync(join(d, 'erä-b', 'MANIFEST.json'), JSON.stringify({ files: [{ path: '13-kuva.png', sha256: createHash('sha256').update(b).digest('hex') }] }));
  let t = tarkistaToimitus(d);
  assert.deepEqual(t.virheet, []); assert.ok(t.tiedostot.every((r) => !r.virheet.length));
  writeFileSync(join(d, 'erä-b', 'MANIFEST.json'), JSON.stringify({ files: [{ path: '13-kuva.png', sha256: '0'.repeat(64) }] }));
  sisaltaa(tarkistaToimitus(d).tiedostot.find((r) => r.polku === 'erä-b/13-kuva.png').virheet, 'SHA-256 ei täsmää');
});

test('kuvatoimitus ilman manifestia on HUOM; sisäkkäinen MANIFEST.json juuren suhteen kelpaa', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-kuvat2-')); mkdirSync(join(d, 'alkupera'));
  const b = png(1600, 900); writeFileSync(join(d, 'k1.png'), b);
  let t = tarkistaToimitus(d); assert.deepEqual(t.virheet, []); sisaltaa(t.huomiot, 'ei manifestia');
  writeFileSync(join(d, 'alkupera', 'MANIFEST.json'), JSON.stringify({ files: [{ path: 'k1.png', sha256: createHash('sha256').update(b).digest('hex') }] }));
  t = tarkistaToimitus(d); assert.deepEqual(t.virheet, []); assert.deepEqual(t.tiedostot[0].virheet, []);
});

test('viitekuva: listaamaton kuva, jonka tiiviste on GENERATION.json referenceSHA256, on HUOM eikä virhe (ISS-ympyräikkuna 19.10.)', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-viite-'));
  const b = png(1024, 1536); const v = png(1179, 2556); const sha = (x) => createHash('sha256').update(x).digest('hex');
  writeFileSync(join(d, 'ympyraikkuna.png'), b); writeFileSync(join(d, 'viite-cupola.jpg'), v);
  writeFileSync(join(d, 'MANIFEST.json'), JSON.stringify({ files: [{ path: 'ympyraikkuna.png', sha256: sha(b) }] }));
  sisaltaa(tarkistaToimitus(d).tiedostot.find((r) => r.polku === 'viite-cupola.jpg').virheet, 'ei SHA256SUMS-listassa');
  writeFileSync(join(d, 'GENERATION.json'), JSON.stringify({ referenceSHA256: sha(v) }));
  const t = tarkistaToimitus(d); const r = t.tiedostot.find((x) => x.polku === 'viite-cupola.jpg');
  assert.deepEqual(t.virheet, []); assert.deepEqual(r.virheet, []); sisaltaa(r.huomiot, 'viitekuva');
  writeFileSync(join(d, 'GENERATION.json'), JSON.stringify({ referenceSHA256: '0'.repeat(64) }));
  sisaltaa(tarkistaToimitus(d).tiedostot.find((x) => x.polku === 'viite-cupola.jpg').virheet, 'ei SHA256SUMS-listassa');
});

test('LIIKE (omistaja 21.10. 00.10): liikkumaton hahmo ilman luurankoa ja idleä läpäisee, kun tilaus sanoo "ei liikettä"', () => {
  const staattinen = esine({ koko: [0.5, 1.7, 0.3] });                            // Tripo-hahmo ilman luurankoa
  let r = tarkistaGlb(staattinen, 'k1.glb', { hahmo: true, liike: 'ei' });
  assert.deepEqual(r.virheet, []); assert.equal(r.tiedot.tyyppi, 'hahmo'); assert.equal(r.tiedot.liike, 'ei liikettä');
  sisaltaa(tarkistaGlb(staattinen, 'k3.glb', { hahmo: true }).virheet, 'ilman luurankoa');          // liikkuva hahmo tarvitsee luurangon
  sisaltaa(tarkistaGlb(esine({ koko: [0.5, 170, 0.3] }), 'k1.glb', { hahmo: true, liike: 'ei' }).virheet, 'korkeus');   // hahmon mitat silti
  r = tarkistaGlb(hahmo({ animaatiot: [] }), 'k2.glb', { hahmo: true, liike: 'ei' });               // luuranko ilman idleä: ei hylätä
  assert.deepEqual(r.virheet, []); sisaltaa(r.huomiot, 'turhaa työtä');
  sisaltaa(tarkistaGlb(hahmo({ animaatiot: [] }), 'k3.glb', { liike: 'kyllä' }).virheet, 'idle');
});

test('LIIKE toimituksessa: .md-rivi tai MANIFEST.json merkitsee hahmon ja liikkeen', () => {
  const d = mkdtempSync(join(tmpdir(), 'codex3d-liike-'));
  const k1 = esine({ koko: [0.5, 1.7, 0.3] }); const k3 = esine({ koko: [0.5, 1.75, 0.3] }); const k4 = esine({ koko: [0.5, 1.6, 0.3] });
  for (const [n, b] of [['k1.glb', k1], ['k3.glb', k3], ['k4.glb', k4]]) writeFileSync(join(d, n), b);
  const h = (b) => createHash('sha256').update(b).digest('hex');
  writeFileSync(join(d, 'SHA256SUMS'), `${h(k1)}  k1.glb\n${h(k3)}  k3.glb\n${h(k4)}  k4.glb\n`);
  writeFileSync(join(d, 'TILAUS.md'), '# Louvren kävijät\n- LIIKE k1.glb: ei liikettä\n- **LIIKE k3.glb:** idle + walk\n');
  writeFileSync(join(d, 'MANIFEST.json'), JSON.stringify({ files: [{ path: 'k4.glb', sha256: h(k4), tyyppi: 'hahmo', liike: 'static' }] }));
  const t = tarkistaToimitus(d); const T = Object.fromEntries(t.tiedostot.map((x) => [x.nimi, x]));
  assert.deepEqual(T['k1.glb'].virheet, []); assert.equal(T['k1.glb'].tiedot.tyyppi, 'hahmo');
  sisaltaa(T['k3.glb'].virheet, 'ilman luurankoa');                                // k3 liikkuu, mutta toimitus on ilman luurankoa
  assert.deepEqual(T['k4.glb'].virheet, []); assert.equal(T['k4.glb'].tiedot.liike, 'ei liikettä');
  sisaltaa(t.huomiot, 'LIIKE luettu');
});
