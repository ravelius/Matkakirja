#!/usr/bin/env node
/*
 * KOROSTUSVARA KERROKSELLE (Karttaseppä 13.10.2026): kirjoittaa jokaisen <kansio>/z/x/y.terrain-laatan (gzip) otsakkeen
 * maxHeightiksi K × max(h), jotta cesium-nativen rajaustilavuus kattaa natiivin KorkeusKertoimen korostaman maaston
 * (ks. quantized-mesh.mjs korostusvara). Kirjoittaa paikalleen; aja vain omaan poltettuun kerrokseen.
 *   node tools/maasto/korostusvara.mjs <kansio> [K = 2] [--alas]
 * --alas (merenpohja 8.11.2026): myös minHeight K × min(h), kun min(h) < 0 (kohokartan 3D-merenpohja).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { korostusvara } from './quantized-mesh.mjs';

const argv = process.argv.slice(2);
const alas = argv.includes('--alas');
const [kansio, kArg = '2'] = argv.filter((a) => a !== '--alas');
if (!kansio) { console.error('käyttö: korostusvara.mjs <kansio> [K] [--alas]'); process.exit(1); }
const K = Number(kArg);
let laattoja = 0; let muuttui = 0;
for (const z of readdirSync(kansio).filter((d) => /^\d+$/.test(d))) {
  for (const x of readdirSync(join(kansio, z)).filter((d) => /^\d+$/.test(d))) {
    for (const f of readdirSync(join(kansio, z, x)).filter((d) => /^\d+\.terrain$/.test(d))) {
      const p = join(kansio, z, x, f);
      if (!statSync(p).isFile()) continue;
      const tavut = readFileSync(p);
      const gz = tavut[0] === 0x1f && tavut[1] === 0x8b;
      const raaka = gz ? gunzipSync(tavut) : tavut;
      const uusi = korostusvara(raaka, K, { alas });
      laattoja += 1;
      if (!uusi.equals(raaka)) { writeFileSync(p, gz ? gzipSync(uusi, { level: 9 }) : uusi); muuttui += 1; }
    }
  }
}
console.log(`korostusvara ${K}${alas ? ' (myös alas)' : ''}: ${laattoja} laattaa, ${muuttui} muuttui`);
