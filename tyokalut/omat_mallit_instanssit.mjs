// OMIEN MALLIEN JAETUT MESHIT YHDEKSI (Linssiseppä 2, 10.10.2026; PT etusija 1, Natiivisepän mittaus muistimittaus-juna173-20261010.md).
//
// Juurisyy junan 173 / TF 172 iPad-jetsamiin: Notre-Damen lod0/lod1:ssä 4 puumeshiä × 22–23 solmua. Cesium for Unity luo jokaiselle
// solmu × primitiiville oman Texture2D:n (ND lod1: 103 tekstuuria 12 kuvasta = 557 Mt GPU). Korjaus dataan: jokainen useassa solmussa
// käytetty mesh leivotaan maailmakoordinaatteihin ja yhdistetään yhdeksi meshiksi (primitiivi per materiaali), solmuja yksi.
// Muu sisältö (materiaalit, kuvat JPEG/KTX2, Draco, COLOR_0, extras) säilyy; formaatti sama, joten käy vanhoille apeille.
//
// Käyttö: node omat_mallit_instanssit.mjs <sisään.glb> <ulos.glb> [--kaikki]   (GLTF_TRANSFORM_NM = gltf-transformin node_modules-kansio)
// Oletus: vain meshit, joiden materiaalissa on tekstuuri (muistiansa). --kaikki yhdistää myös teksturoimattomat (Concorden 183 valaisinta:
// 220 → 21 solmua, mutta tiedosto 3,0 → 7,4 Mt). Tarkistus: maailman rajat ±1 cm ja piirrettävät kolmiot samat, muuten paluuarvo 1.
// Tuloste: rivi "INSTANSSIT <tiedosto> meshit_jaettu=N solmut a→b primitiivit a→b".
import { createRequire } from 'module';
import path from 'path';
const NM = process.env.GLTF_TRANSFORM_NM || '/Volumes/T7 4TB/koodaus/linssiseppa2-tyokalut/gltf-transform/node_modules';
const req = createRequire(path.join(NM, 'x.js'));
const { NodeIO, Node, getBounds } = req('@gltf-transform/core');
const { ALL_EXTENSIONS } = req('@gltf-transform/extensions');
const { transformPrimitive, joinPrimitives, prune } = req('@gltf-transform/functions');
const draco3d = req('draco3dgltf');

const argv = process.argv.slice(2); const KAIKKI = argv.includes('--kaikki'); const [sisaan, ulos] = argv.filter(a => a !== '--kaikki');
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'draco3d.decoder': await draco3d.createDecoderModule(), 'draco3d.encoder': await draco3d.createEncoderModule() });
const doc = await io.read(sisaan);
const root = doc.getRoot(), scene = root.getDefaultScene() || root.listScenes()[0];
const solmut0 = root.listNodes().filter(n => n.getMesh()).length, prim0 = root.listNodes().reduce((s, n) => s + (n.getMesh()?.listPrimitives().length || 0), 0);
const kolmiot = () => root.listNodes().reduce((s, n) => s + (n.getMesh()?.listPrimitives().reduce((t, p) => t + (p.getIndices() ? p.getIndices().getCount() : p.getAttribute('POSITION').getCount()) / 3, 0) || 0), 0);
const rajat0 = getBounds(scene), kolmiot0 = kolmiot();
const teksturoitu = m => m && ['getBaseColorTexture', 'getNormalTexture', 'getMetallicRoughnessTexture', 'getOcclusionTexture', 'getEmissiveTexture'].some(f => m[f]());
let jaetut = 0;
for (const mesh of root.listMeshes()) {
  const kayttajat = mesh.listParents().filter(p => p instanceof Node);
  if (kayttajat.length <= 1) continue;
  if (!KAIKKI && !mesh.listPrimitives().some(p => teksturoitu(p.getMaterial()))) continue;
  jaetut++;
  const uusi = doc.createMesh(mesh.getName());
  mesh.listPrimitives().forEach((p, i) => {
    const kopiot = kayttajat.map(n => {   // syvä kopio: clone() jakaa accessorit → muunnos kertautuisi samaan puskuriin
      const c = p.clone();
      for (const sem of c.listSemantics()) c.setAttribute(sem, c.getAttribute(sem).clone());
      if (c.getIndices()) c.setIndices(c.getIndices().clone());
      transformPrimitive(c, n.getWorldMatrix()); return c;
    });
    const yhdessa = joinPrimitives(kopiot);
    uusi.addPrimitive(yhdessa);
    kopiot.forEach(c => c.dispose());
  });
  const solmu = doc.createNode(mesh.getName()).setMesh(uusi);
  const ensimmainen = kayttajat[0].getExtras(); if (ensimmainen && Object.keys(ensimmainen).length) solmu.setExtras(ensimmainen);
  scene.addChild(solmu);   // maailmamatriisi leivottu verteksiin → suoraan näkymän juureen
  kayttajat.forEach(n => { n.setMesh(null); if (!n.listChildren().length) n.dispose(); });   // tyhjät puusolmut pois
  mesh.dispose();
}
// MATERIAALIT (PT 10.10. 01.0x vientiportti): Cesium luo tekstuurin primitiiviä kohden, joten sama teksturoitu materiaali usealla
// primitiivillä monistaa kuvan GPU:lla (KL v6j:n 4096²-atlas 7 primitiivillä). Yhdistetään samat materiaali + attribuuttiasettelu
// koko näkymästä yhdeksi primitiiviksi (maailmamatriisi leivottu). Erilliset solmut (PIDA, esim. Riddarholmenin spiira) jäävät ennalleen.
const PIDA = new Set((process.env.OMAT_PIDA_SOLMUT || 'spiira').split(','));
const avain = p => [p.getMaterial() ? root.listMaterials().indexOf(p.getMaterial()) : -1, p.getMode(), !!p.getIndices(),
  ...p.listSemantics().sort().map(s_ => `${s_}:${p.getAttribute(s_).getType()}:${p.getAttribute(s_).getComponentType()}:${p.getAttribute(s_).getNormalized()}`)].join('|');
const ryhmat = new Map();
for (const n of root.listNodes()) {
  const m = n.getMesh(); if (!m || PIDA.has(n.getName()) || n.getSkin()) continue;
  for (const p of m.listPrimitives()) {
    if (!teksturoitu(p.getMaterial()) || p.listTargets().length) continue;
    const k = avain(p); if (!ryhmat.has(k)) ryhmat.set(k, []); ryhmat.get(k).push([n, p]);
  }
}
let materiaalit = 0;
for (const [, jasenet] of ryhmat) {
  if (jasenet.length <= 1) continue;
  materiaalit++;
  const kopiot = jasenet.map(([n, p]) => {
    const c = p.clone();
    for (const sem of c.listSemantics()) c.setAttribute(sem, c.getAttribute(sem).clone());
    if (c.getIndices()) c.setIndices(c.getIndices().clone());
    transformPrimitive(c, n.getWorldMatrix()); return c;
  });
  const yhdessa = joinPrimitives(kopiot); kopiot.forEach(c => c.dispose());
  const nimi = jasenet[0][1].getMaterial().getName() || 'materiaali';
  scene.addChild(doc.createNode(nimi).setMesh(doc.createMesh(nimi).addPrimitive(yhdessa)));
  for (const [n, p] of jasenet) {
    const m = n.getMesh(); m.removePrimitive(p); p.dispose();
    if (!m.listPrimitives().length) { n.setMesh(null); if (!n.listChildren().length) n.dispose(); if (!m.listParents().some(x => x instanceof Node)) m.dispose(); }
  }
}
await doc.transform(prune({ propertyTypes: ['node', 'mesh', 'primitive', 'accessor'], keepLeaves: false, keepAttributes: true }));
const solmut1 = root.listNodes().filter(n => n.getMesh()).length, prim1 = root.listNodes().reduce((s, n) => s + (n.getMesh()?.listPrimitives().length || 0), 0);
const rajat1 = getBounds(scene), kolmiot1 = kolmiot();
const ero = Math.max(...[0, 1, 2].flatMap(i => [Math.abs(rajat0.min[i] - rajat1.min[i]), Math.abs(rajat0.max[i] - rajat1.max[i])]));
if (ero > 0.01 || kolmiot0 !== kolmiot1) { console.error(`VIRHE ${sisaan}: rajaero ${ero.toFixed(3)} m, kolmiot ${kolmiot0} → ${kolmiot1}`); process.exit(1); }
await io.write(ulos, doc);
console.log(`INSTANSSIT ${path.basename(path.dirname(sisaan))}/${path.basename(sisaan)} meshit_jaettu=${jaetut} materiaalit_yhdistetty=${materiaalit} solmut ${solmut0}→${solmut1} primitiivit ${prim0}→${prim1} kolmiot ${kolmiot1} rajaero ${ero.toFixed(4)} m`);
