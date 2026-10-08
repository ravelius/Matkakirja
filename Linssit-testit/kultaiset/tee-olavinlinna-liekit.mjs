// Olavinlinnan huonesimulaation liekit (Linssiseppä 2, 8.10.2026; pelattavuusmalli kohta 11). Lukee tilojen glb-tiedostojen
// liekki:NN-<laji> -solmut (DioraamaLiekit: valoisuus 1 − d / säde, säde 2,5 + 2,5 × koko, rajattu 2,5…6 m, perus 0,25) ja kirjoittaa
// kultaiset/olavinlinna-v45a-liekit.json kävelydatan koordinaateissa (glTF: x itä, y ylös, z etelä; tilat ja kävely samassa kehyksessä).
// Vanha keittio.glb jätetään pois (keittio-g102 korvaa sen kävelytilassa).
// Käyttö: node Linssit-testit/kultaiset/tee-olavinlinna-liekit.mjs [olavinlinna-blender-v44-kansio]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const paketti = process.argv[2] ?? '/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender-v44';
const pois = new Set(['keittio.glb']);

function glbJson(polku) {
  const b = readFileSync(polku);
  const pituus = b.readUInt32LE(12);
  return JSON.parse(b.subarray(20, 20 + pituus).toString('utf8'));
}

const liekit = [];
for (const tiedosto of readdirSync(join(paketti, 'tilat')).filter((f) => f.endsWith('.glb') && !pois.has(f)).sort()) {
  const j = glbJson(join(paketti, 'tilat', tiedosto));
  const solmut = j.nodes ?? [];
  const isa = new Map();
  solmut.forEach((s, i) => (s.children ?? []).forEach((c) => isa.set(c, i)));
  solmut.forEach((s, i) => {
    const m = /^liekki:\d+-(\w+)$/.exec(s.name ?? '');
    if (!m) return;
    const p = [0, 0, 0];
    for (let k = i; k !== undefined; k = isa.get(k)) {
      const n = solmut[k];
      if (n.matrix || (k !== i && n.rotation) || (k !== i && n.scale)) throw new Error(`${tiedosto}: ${s.name}: vanhemmalla kierto/skaala`);
      (n.translation ?? [0, 0, 0]).forEach((v, a) => (p[a] += v));
    }
    liekit.push({ tila: tiedosto.replace(/\.glb$/, ''), laji: m[1], paikka: p.map((v) => Math.round(v * 1000) / 1000), koko: 1 });
  });
}

const ulos = join(dirname(fileURLToPath(import.meta.url)), 'olavinlinna-v45a-liekit.json');
writeFileSync(ulos, `{"lahde": "olavinlinna-blender-v44 (v45a) tilat/*.glb liekki:-solmut", "liekit": [\n${liekit.map((l) => '  ' + JSON.stringify(l)).join(',\n')}\n]}\n`);
console.log(`${liekit.length} liekkiä → ${ulos}`);
