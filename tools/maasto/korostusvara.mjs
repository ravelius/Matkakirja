#!/usr/bin/env node
/*
 * KOROSTUSVARA KERROKSELLE (Karttaseppä 13.10.2026): kirjoittaa jokaisen <kansio>/z/x/y.terrain-laatan (gzip) otsakkeen
 * maxHeightiksi K × max(h), jotta cesium-nativen rajaustilavuus kattaa natiivin KorkeusKertoimen korostaman maaston
 * (ks. quantized-mesh.mjs korostusvara). Kirjoittaa paikalleen; aja vain omaan poltettuun kerrokseen.
 *   node tools/maasto/korostusvara.mjs <kansio> [K = 2]
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { korostusvara } from './quantized-mesh.mjs';

const [kansio, kArg = '2'] = process.argv.slice(2);
if (!kansio) { console.error('käyttö: korostusvara.mjs <kansio> [K]'); process.exit(1); }
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
      const uusi = korostusvara(raaka, K);
      laattoja += 1;
      if (!uusi.equals(raaka)) { writeFileSync(p, gz ? gzipSync(uusi, { level: 9 }) : uusi); muuttui += 1; }
    }
  }
}
console.log(`korostusvara ${K}: ${laattoja} laattaa, ${muuttui} muuttui`);
