// Testit tools/dioraama/glb.mjs:lle (Linnanrakentaja, ali-agentti B1, erä 1).
// Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0 (yleiset), 3
// (rakennuskoneen GLB-muoto) ja 3b (tämän moduulin tarkka rajapinta).
//
// Otsikon/lohkojen tasauksen ja JSON-rakenteen testit käyttävät OMAA riippumatonta
// pientä purkajaa ja pakkaajaa (alla) — eivät glb.mjs:n sisäisiä apufunktioita.
// Näin glb.mjs:n oma mahdollinen sisäinen bugi ei voi "peittää" kirjoittimen
// virhettä yhtä aikaa lukijassa; edestakaiset kirjoitus-luku-testit täydentävät
// tätä testaamalla molemmat yhdessä. pakkaa()-apuria käytetään myös rikkinäisten/
// hylättävien GLB:iden rakentamiseen (sparse/skin/morph/uri-testit).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { kirjoitaGlb, lueGlb } from '../tools/dioraama/glb.mjs';

/* ==================== Riippumaton pieni GLB-purkaja/-pakkaaja (vain testiä varten) ==================== */

function pura(buf) {
  assert.strictEqual(buf.readUInt32LE(0), 0x46546c67, 'magic');
  assert.strictEqual(buf.readUInt32LE(4), 2, 'versio');
  assert.strictEqual(buf.readUInt32LE(8), buf.length, 'otsikon pituus == puskurin pituus');
  let o = 12;
  let json = null;
  let bin = null;
  while (o < buf.length) {
    const pituus = buf.readUInt32LE(o);
    const tyyppi = buf.readUInt32LE(o + 4);
    const data = buf.subarray(o + 8, o + 8 + pituus);
    if (tyyppi === 0x4e4f534a) json = JSON.parse(data.toString('utf8'));
    else if (tyyppi === 0x004e4942) bin = Buffer.from(data);
    o += 8 + pituus;
  }
  assert.strictEqual(o, buf.length, 'lohkot kattavat koko puskurin ilman ylijäämää');
  return { json, bin };
}

function pakkaa(json, bin) {
  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonYli = jsonBuf.length % 4;
  if (jsonYli) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(4 - jsonYli, 0x20)]);
  let binBuf = bin ? Buffer.from(bin) : Buffer.alloc(0);
  const binYli = binBuf.length % 4;
  if (binYli) binBuf = Buffer.concat([binBuf, Buffer.alloc(4 - binYli, 0)]);
  const kokonaispituus = 12 + 8 + jsonBuf.length + (binBuf.length ? 8 + binBuf.length : 0);
  const otsikko = Buffer.alloc(12);
  otsikko.writeUInt32LE(0x46546c67, 0);
  otsikko.writeUInt32LE(2, 4);
  otsikko.writeUInt32LE(kokonaispituus, 8);
  const jsonOtsikko = Buffer.alloc(8);
  jsonOtsikko.writeUInt32LE(jsonBuf.length, 0);
  jsonOtsikko.writeUInt32LE(0x4e4f534a, 4);
  const osat = [otsikko, jsonOtsikko, jsonBuf];
  if (binBuf.length) {
    const binOtsikko = Buffer.alloc(8);
    binOtsikko.writeUInt32LE(binBuf.length, 0);
    binOtsikko.writeUInt32LE(0x004e4942, 4);
    osat.push(binOtsikko, binBuf);
  }
  return Buffer.concat(osat);
}

/* ==================== Testifixturet ==================== */

/** Yksi kolmio (0,0,0)-(1,0,0)-(0,1,0) siirrettynä x-suunnassa `siirto`, tasainen normaali (0,0,1). */
function kolmioOsa(pinta, vari, siirto = 0) {
  const paikat = new Float32Array([
    0 + siirto, 0, 0,
    1 + siirto, 0, 0,
    0 + siirto, 1, 0,
  ]);
  const normaalit = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  ]);
  const uv = new Float32Array([0, 0, 1, 0, 0, 1]);
  const varit = new Uint8Array([
    255, 255, 255, 255,
    200, 150, 100, 255,
    10, 20, 30, 255,
  ]);
  const kolmiot = new Uint32Array([0, 1, 2]);
  return {
    pinta, vari, paikat, normaalit, uv, varit, kolmiot,
  };
}

/* ==================== Edestakainen kirjoitus-luku ==================== */

test('kirjoitaGlb + lueGlb: edestakainen yksi kolmio, yksi osa', () => {
  const osa = kolmioOsa('kivi', '#b8ad9c');
  const buf = kirjoitaGlb({ nimi: 'keittio-testi', osat: [osa] });
  assert.ok(Buffer.isBuffer(buf));
  const luettu = lueGlb(buf);
  assert.strictEqual(luettu.nimi, 'keittio-testi');
  assert.strictEqual(luettu.osat.length, 1);
  const o = luettu.osat[0];
  assert.strictEqual(o.pinta, 'kivi');
  assert.deepStrictEqual(o.paikat, osa.paikat);
  assert.deepStrictEqual(o.normaalit, osa.normaalit);
  assert.deepStrictEqual(o.uv, osa.uv);
  assert.deepStrictEqual(o.varit, osa.varit);
  assert.deepStrictEqual(o.kolmiot, osa.kolmiot);
  assert.ok(Array.isArray(o.vari) && o.vari.length === 4);
  assert.ok(o.paikat instanceof Float32Array);
  assert.ok(o.kolmiot instanceof Uint32Array);
  assert.ok(o.varit instanceof Uint8Array);
});

test('kirjoitaGlb + lueGlb: edestakainen kaksi osaa', () => {
  const a = kolmioOsa('kivi', '#b8ad9c', 0);
  const b = kolmioOsa('lankku', '#caa678', 5);
  const buf = kirjoitaGlb({ nimi: 'kaksi-osaa', osat: [a, b] });
  const luettu = lueGlb(buf);
  assert.strictEqual(luettu.nimi, 'kaksi-osaa');
  assert.strictEqual(luettu.osat.length, 2);
  assert.strictEqual(luettu.osat[0].pinta, 'kivi');
  assert.strictEqual(luettu.osat[1].pinta, 'lankku');
  assert.deepStrictEqual(luettu.osat[0].paikat, a.paikat);
  assert.deepStrictEqual(luettu.osat[1].paikat, b.paikat);
  assert.deepStrictEqual(luettu.osat[0].kolmiot, a.kolmiot);
  assert.deepStrictEqual(luettu.osat[1].kolmiot, b.kolmiot);
  assert.notDeepStrictEqual(luettu.osat[0].vari, luettu.osat[1].vari);
});

/* ==================== Otsikko ja lohkojen tasaus ==================== */

test('kirjoitaGlb: otsikon kentät ja lohkojen tasaus', () => {
  const buf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  assert.strictEqual(buf.readUInt32LE(0), 0x46546c67, 'magic');
  assert.strictEqual(buf.readUInt32LE(4), 2, 'versio');
  assert.strictEqual(buf.readUInt32LE(8), buf.length, 'otsikon pituus == puskurin pituus');
  assert.strictEqual(buf.length % 4, 0, 'koko tiedosto 4 tavun monikerta');

  const jsonPituus = buf.readUInt32LE(12);
  const jsonTyyppi = buf.readUInt32LE(16);
  assert.strictEqual(jsonTyyppi, 0x4e4f534a, "JSON-lohkon tyyppi ('JSON')");
  assert.strictEqual(jsonPituus % 4, 0, 'JSON-lohko 4 tavun monikerta');

  const jsonTeksti = buf.subarray(20, 20 + jsonPituus).toString('utf8');
  JSON.parse(jsonTeksti); // heittäisi jos täyte ei jättäisi kelvollista JSONia
  const sisaltoLoppuu = jsonTeksti.trimEnd().length;
  for (let i = sisaltoLoppuu; i < jsonTeksti.length; i++) {
    assert.strictEqual(jsonTeksti[i], ' ', 'JSON-täyte on välilyöntejä');
  }

  const binAlku = 20 + jsonPituus;
  const binPituus = buf.readUInt32LE(binAlku);
  const binTyyppi = buf.readUInt32LE(binAlku + 4);
  assert.strictEqual(binTyyppi, 0x004e4942, "BIN-lohkon tyyppi ('BIN\\0')");
  assert.strictEqual(binPituus % 4, 0, 'BIN-lohko 4 tavun monikerta');
  assert.strictEqual(binAlku + 8 + binPituus, buf.length, 'BIN-lohko ulottuu tiedoston loppuun asti');
});

/* ==================== POSITION min/max ==================== */

test('kirjoitaGlb: POSITION-accessorin min/max on oikein', () => {
  const osa = kolmioOsa('kivi', '#ffffff', 3); // kärjet (3,0,0) (4,0,0) (3,1,0)
  const buf = kirjoitaGlb({ nimi: 'minmax', osat: [osa] });
  const { json } = pura(buf);
  const prim = json.meshes[0].primitives[0];
  const acc = json.accessors[prim.attributes.POSITION];
  assert.deepStrictEqual(acc.min, [3, 0, 0]);
  assert.deepStrictEqual(acc.max, [4, 1, 0]);
});

/* ==================== sRGB → lineaarinen ==================== */

test('kirjoitaGlb: sRGB → lineaarinen baseColorFactor (IEC 61966-2-1)', () => {
  function lineaarinen(hex) {
    const buf = kirjoitaGlb({ nimi: 'v', osat: [kolmioOsa('p', hex)] });
    return lueGlb(buf).osat[0].vari;
  }

  const valkoinen = lineaarinen('#ffffff');
  assert.ok(Math.abs(valkoinen[0] - 1) < 1e-9, `#ffffff → 1 (oli ${valkoinen[0]})`);
  assert.ok(Math.abs(valkoinen[1] - 1) < 1e-9);
  assert.ok(Math.abs(valkoinen[2] - 1) < 1e-9);
  assert.strictEqual(valkoinen[3], 1, 'alfa aina 1');

  const musta = lineaarinen('#000000');
  assert.strictEqual(musta[0], 0, `#000000 → 0 (oli ${musta[0]})`);
  assert.strictEqual(musta[1], 0);
  assert.strictEqual(musta[2], 0);

  const harmaa = lineaarinen('#808080');
  assert.ok(Math.abs(harmaa[0] - 0.2158) < 0.001, `#808080 → ≈0,2158 (oli ${harmaa[0]})`);
  assert.ok(Math.abs(harmaa[1] - 0.2158) < 0.001);
  assert.ok(Math.abs(harmaa[2] - 0.2158) < 0.001);

  // Riippumaton ristiintarkistus samalla kaavalla muutamalle muulle värille (ei vain kolmelle
  // spekin antamalle arvolle) — löytäisi esim. väärän kynnysarvon tai eksponentin.
  function odotettuKanava(kanava255) {
    const c = kanava255 / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }
  for (const hex of ['#3a7fd1', '#112233', '#f0c040', '#010101', '#7f0000']) {
    const saatu = lineaarinen(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    assert.ok(Math.abs(saatu[0] - odotettuKanava(r)) < 1e-9, `${hex} R`);
    assert.ok(Math.abs(saatu[1] - odotettuKanava(g)) < 1e-9, `${hex} G`);
    assert.ok(Math.abs(saatu[2] - odotettuKanava(b)) < 1e-9, `${hex} B`);
  }
});

/* ==================== Deterministisyys ==================== */

test('kirjoitaGlb: deterministinen — sama syöte tuottaa aina samat tavut', () => {
  function rakenna() {
    return kirjoitaGlb({
      nimi: 'determinismi',
      osat: [kolmioOsa('kivi', '#b8ad9c', 0), kolmioOsa('lankku', '#caa678', 2)],
    });
  }
  const a = rakenna();
  const b = rakenna();
  assert.ok(a.equals(b), 'tavut täsmäävät bitilleen kahdella ajolla');
  const shaA = createHash('sha256').update(a).digest('hex');
  const shaB = createHash('sha256').update(b).digest('hex');
  assert.strictEqual(shaA, shaB);
});

/* ==================== JSON-osan kelvollisuus ja rakenne ==================== */

test('kirjoitaGlb: JSON-osa on kelvollista JSONia, accessor-countit täsmäävät kärkiin', () => {
  const a = kolmioOsa('kivi', '#b8ad9c', 0); // 3 kärkeä, 1 kolmio (3 indeksiä)
  const buf = kirjoitaGlb({ nimi: 'json-tarkistus', osat: [a] });
  const { json } = pura(buf); // pura() jäsentää JSON.parse:lla — heittäisi jos ei kelvollinen
  assert.strictEqual(typeof json, 'object');

  assert.strictEqual(json.asset.version, '2.0');
  assert.strictEqual(json.asset.generator, 'Matkakirja dioraama-rakennuskone');
  assert.strictEqual(json.scene, 0);
  assert.deepStrictEqual(json.scenes[0].nodes, [0]);
  assert.strictEqual(json.nodes[0].name, 'json-tarkistus');
  assert.strictEqual(json.nodes[0].mesh, 0);
  assert.strictEqual(json.meshes[0].name, 'json-tarkistus');

  const prim = json.meshes[0].primitives[0];
  assert.strictEqual(prim.mode, 4);

  const posAcc = json.accessors[prim.attributes.POSITION];
  const normAcc = json.accessors[prim.attributes.NORMAL];
  const uvAcc = json.accessors[prim.attributes.TEXCOORD_0];
  const colAcc = json.accessors[prim.attributes.COLOR_0];
  const idxAcc = json.accessors[prim.indices];

  assert.strictEqual(posAcc.count, 3, 'POSITION-accessorin count == kärkien määrä');
  assert.strictEqual(normAcc.count, 3);
  assert.strictEqual(uvAcc.count, 3);
  assert.strictEqual(colAcc.count, 3);
  assert.strictEqual(idxAcc.count, a.kolmiot.length, 'indeksien count == 3 (1 kolmio)');

  assert.strictEqual(posAcc.componentType, 5126); // FLOAT
  assert.strictEqual(posAcc.type, 'VEC3');
  assert.strictEqual(normAcc.componentType, 5126);
  assert.strictEqual(normAcc.type, 'VEC3');
  assert.strictEqual(uvAcc.componentType, 5126);
  assert.strictEqual(uvAcc.type, 'VEC2');
  assert.strictEqual(colAcc.componentType, 5121); // UNSIGNED_BYTE
  assert.strictEqual(colAcc.type, 'VEC4');
  assert.strictEqual(colAcc.normalized, true);
  assert.strictEqual(idxAcc.componentType, 5125); // UNSIGNED_INT
  assert.strictEqual(idxAcc.type, 'SCALAR');

  assert.strictEqual(json.bufferViews[posAcc.bufferView].target, 34962);
  assert.strictEqual(json.bufferViews[normAcc.bufferView].target, 34962);
  assert.strictEqual(json.bufferViews[uvAcc.bufferView].target, 34962);
  assert.strictEqual(json.bufferViews[colAcc.bufferView].target, 34962);
  assert.strictEqual(json.bufferViews[idxAcc.bufferView].target, 34963);

  const mat = json.materials[prim.material];
  assert.strictEqual(mat.name, 'kivi');
  assert.strictEqual(mat.extras.pinta, 'kivi');
  assert.strictEqual(mat.pbrMetallicRoughness.metallicFactor, 0);
  assert.strictEqual(mat.pbrMetallicRoughness.roughnessFactor, 1);
  assert.strictEqual(mat.pbrMetallicRoughness.baseColorFactor.length, 4);
  assert.strictEqual(mat.pbrMetallicRoughness.baseColorFactor[3], 1);
});

/* ==================== Tyhjä osa (0 kolmiota) ==================== */

test('kirjoitaGlb: tyhjä osa (0 kolmiota) HYLÄTÄÄN selkeällä virheellä (dokumentoitu päätös)', () => {
  const tyhja = kolmioOsa('kivi', '#ffffff');
  tyhja.kolmiot = new Uint32Array(0);
  assert.throws(() => kirjoitaGlb({ nimi: 'x', osat: [tyhja] }), /tyhjä/);
});

test('kirjoitaGlb: osan puuttuva/väärä kenttä hylätään selkeällä virheellä', () => {
  const osa = kolmioOsa('kivi', '#ffffff');
  assert.throws(
    () => kirjoitaGlb({ nimi: 'x', osat: [{ ...osa, paikat: Array.from(osa.paikat) }] }),
    /paikat/,
  );
  assert.throws(() => kirjoitaGlb({ nimi: 'x', osat: [{ ...osa, vari: 'punainen' }] }), /vari/);
  assert.throws(
    () => kirjoitaGlb({ nimi: 'x', osat: [{ ...osa, normaalit: new Float32Array(3) }] }),
    /normaalit/,
  );
});

/* ==================== lueGlb: otsikon virheet ==================== */

test('lueGlb: hylkää väärän magic-tunnisteen', () => {
  const buf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  buf.writeUInt32LE(0, 0);
  assert.throws(() => lueGlb(buf), /magic/);
});

test('lueGlb: hylkää tuntemattoman glTF-version', () => {
  const buf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  buf.writeUInt32LE(3, 4);
  assert.throws(() => lueGlb(buf), /versio/);
});

test('lueGlb: hylkää väärän kokonaispituuden otsikossa', () => {
  const buf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  buf.writeUInt32LE(buf.length + 4, 8);
  assert.throws(() => lueGlb(buf), /pituus/);
});

/* ==================== lueGlb: hylätyt rakenteet ==================== */

test('lueGlb: hylkää sparse-accessorit', () => {
  const alkuBuf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  const { json, bin } = pura(alkuBuf);
  json.accessors[0].sparse = {
    count: 1,
    indices: { bufferView: 0, componentType: 5121 },
    values: { bufferView: 0 },
  };
  assert.throws(() => lueGlb(pakkaa(json, bin)), /sparse/);
});

test('lueGlb: hylkää skinit', () => {
  const alkuBuf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  const { json, bin } = pura(alkuBuf);
  json.skins = [{ joints: [0] }];
  json.nodes[0].skin = 0;
  assert.throws(() => lueGlb(pakkaa(json, bin)), /skin/);
});

test('lueGlb: hylkää morph targetit', () => {
  const alkuBuf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  const { json, bin } = pura(alkuBuf);
  const prim = json.meshes[0].primitives[0];
  prim.targets = [{ POSITION: prim.attributes.POSITION }];
  assert.throws(() => lueGlb(pakkaa(json, bin)), /morph/);
});

test('lueGlb: hylkää ulkoiset URI:t (buffer.uri)', () => {
  const alkuBuf = kirjoitaGlb({ nimi: 'x', osat: [kolmioOsa('kivi', '#ffffff')] });
  const { json, bin } = pura(alkuBuf);
  json.buffers[0].uri = 'ulkoinen.bin';
  assert.throws(() => lueGlb(pakkaa(json, bin)), /URI/);
});

/* ==================== lueGlb: indeksien componentType ja byteStride ==================== */

/** Käsin rakennettu minimaalinen glTF-JSON + BIN: 1 kolmio, indeksit annetulla componentTypella. */
function kasinTehtyKolmio(indeksiTyyppi) {
  const paikatTa = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
  const posBuf = Buffer.from(paikatTa.buffer, paikatTa.byteOffset, paikatTa.byteLength);
  let idxBuf;
  if (indeksiTyyppi === 5121) {
    idxBuf = Buffer.from(Uint8Array.of(0, 1, 2));
  } else if (indeksiTyyppi === 5123) {
    const idxTa = new Uint16Array([0, 1, 2]);
    idxBuf = Buffer.from(idxTa.buffer, idxTa.byteOffset, idxTa.byteLength);
  } else {
    throw new Error('testi tukee vain 5121/5123');
  }
  const bin = Buffer.concat([posBuf, idxBuf]);
  const json = {
    asset: { version: '2.0', generator: 'testi' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: 'kasin', mesh: 0 }],
    meshes: [{
      name: 'kasin',
      primitives: [{ attributes: { POSITION: 0 }, indices: 1, mode: 4 }],
    }],
    accessors: [
      {
        bufferView: 0, componentType: 5126, count: 3, type: 'VEC3', min: [0, 0, 0], max: [1, 1, 0],
      },
      { bufferView: 1, componentType: indeksiTyyppi, count: 3, type: 'SCALAR' },
    ],
    bufferViews: [
      {
        buffer: 0, byteOffset: 0, byteLength: posBuf.length, target: 34962,
      },
      {
        buffer: 0, byteOffset: posBuf.length, byteLength: idxBuf.length, target: 34963,
      },
    ],
    buffers: [{ byteLength: bin.length }],
  };
  return { json, bin };
}

test('lueGlb: tukee UNSIGNED_BYTE- ja UNSIGNED_SHORT-indeksejä', () => {
  for (const tyyppi of [5121, 5123]) {
    const { json, bin } = kasinTehtyKolmio(tyyppi);
    const luettu = lueGlb(pakkaa(json, bin));
    assert.strictEqual(luettu.osat.length, 1);
    assert.ok(luettu.osat[0].kolmiot instanceof Uint32Array, `componentType ${tyyppi} → Uint32Array`);
    assert.deepStrictEqual(Array.from(luettu.osat[0].kolmiot), [0, 1, 2]);
    assert.deepStrictEqual(Array.from(luettu.osat[0].paikat), [0, 0, 0, 1, 0, 0, 0, 1, 0]);
  }
});

test('lueGlb: tukee eksplisiittistä tiivistä byteStridea bufferView’ssa', () => {
  const osa = kolmioOsa('kivi', '#ffffff');
  const alkuBuf = kirjoitaGlb({ nimi: 'stride', osat: [osa] });
  const { json, bin } = pura(alkuBuf);
  const prim = json.meshes[0].primitives[0];
  const posAcc = json.accessors[prim.attributes.POSITION];
  json.bufferViews[posAcc.bufferView].byteStride = 12; // 3 × float32 = tiivis askel, merkitty näkyviin
  const luettu = lueGlb(pakkaa(json, bin));
  assert.deepStrictEqual(luettu.osat[0].paikat, osa.paikat);
});
