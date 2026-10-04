// Tarkistetaan toimitusbinaarit, ei pelkastaan Blenderin muistissa oleva scena.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const kansio = path.dirname(fileURLToPath(import.meta.url));
const vaadi = createRequire(import.meta.url);
const tarkistin = vaadi(process.env.GLTF_VALIDATOR_PATH || 'gltf-validator');
const yhteenveto = [];
for (const [taso, raja] of [['L0',200000],['L1',51000],['L2',12300],['symboli',3100]]) {
  const nimi = `kierkegaard-${taso}.glb`;
  const b = fs.readFileSync(path.join(kansio,nimi));
  assert.equal(b.readUInt32LE(0),0x46546c67);
  assert.equal(b.readUInt32LE(4),2);
  assert.equal(b.readUInt32LE(8),b.length);
  const j = b.readUInt32LE(12);
  const g = JSON.parse(b.subarray(20,20+j).toString());
  const bin = b.subarray(28+j);
  assert.equal(g.nodes.length,1);
  assert.equal(g.scenes.length,1);
  assert.ok(!g.nodes[0].translation && !g.nodes[0].rotation && !g.nodes[0].scale && !g.nodes[0].matrix);
  const ala = [Infinity,Infinity,Infinity], yla = [-Infinity,-Infinity,-Infinity];
  let kolmiot = 0;
  for (const m of g.meshes) for (const p of m.primitives) {
    assert.equal(p.mode ?? 4,4);
    kolmiot += g.accessors[p.indices].count/3;
    const a = g.accessors[p.attributes.POSITION], v = g.bufferViews[a.bufferView];
    assert.equal(a.componentType,5126); assert.equal(a.type,'VEC3');
    for (let i=0;i<a.count;i++) for (let k=0;k<3;k++) {
      const x = bin.readFloatLE((v.byteOffset||0)+(a.byteOffset||0)+i*(v.byteStride||12)+k*4);
      assert.ok(Number.isFinite(x)); ala[k]=Math.min(ala[k],x); yla[k]=Math.max(yla[k],x);
    }
  }
  assert.ok(kolmiot <= raja);
  assert.ok(Math.abs(ala[1]) < 1e-6);
  assert.ok(Math.abs(yla[1]-.51) < 1e-6);
  const mat = g.materials[0];
  assert.equal(mat.pbrMetallicRoughness.metallicFactor,0);
  assert.ok(mat.pbrMetallicRoughness.roughnessFactor >= .6);
  assert.ok(mat.normalTexture);
  const kuva = g.images[g.textures[mat.normalTexture.index].source];
  assert.ok(!kuva.uri && kuva.mimeType === 'image/png');
  const kv = g.bufferViews[kuva.bufferView];
  const png = bin.subarray(kv.byteOffset,kv.byteOffset+kv.byteLength);
  const koko = [png.readUInt32BE(16),png.readUInt32BE(20)];
  if (taso === 'L0') assert.deepEqual(koko,[2048,2048]);
  const tulos = await tarkistin.validateBytes(new Uint8Array(b),{uri:nimi,format:'glb',maxIssues:0});
  fs.writeFileSync(path.join(kansio,`validointi-${taso}.json`),JSON.stringify(tulos,null,2)+'\n');
  assert.equal(tulos.issues.numErrors,0,`${nimi}: glTF-virhe`);
  yhteenveto.push({taso,kolmiot,rajat_glb:{min:ala,max:yla},korkeus_m:yla[1]-ala[1],normaalikartta:koko,
    virheet:tulos.issues.numErrors,varoitukset:tulos.issues.numWarnings,tarkistin:tarkistin.version()});
}
fs.writeFileSync(path.join(kansio,'vientitarkistus.json'),JSON.stringify(yhteenveto,null,2)+'\n');
console.log(JSON.stringify(yhteenveto,null,2));
