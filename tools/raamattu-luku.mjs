/*
 * RAAMATUN LUKU TAI KOHTA SUORAAN ORIGIN/MAINISTA (omistajan päätös 20.10.2026 klo 22.24, karsinta B6; loki #5071).
 *
 *   node tools/raamattu-luku.mjs <luku|kohta> [...]     esim. 9   9.11   7 12.3
 *   node tools/raamattu-luku.mjs --sisallys              lukujen otsikot ja koot
 *
 * Roolien kotikansiot voivat olla satoja committeja jäljessä, joten Raamattua ei lueta paikallisesta kopiosta: työkalu
 * hakee origin/mainin (git fetch) ja lukee js/tyohuone-raamattu.js:n sieltä (git show). Luku = osio, jonka otsikko alkaa
 * "<luku>."; kohta = kohta, joka alkaa "<luku>.<n> ". Tuntematon tunnus → virhe ja exit 1.
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const juuri = dirname(dirname(fileURLToPath(import.meta.url)));
const git = (...a) => execFileSync('git', ['-C', juuri, ...a], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const pyynnot = process.argv.slice(2);
if (pyynnot.length === 0) {
  console.error('käyttö: node tools/raamattu-luku.mjs <luku|kohta> [...] | --sisallys');
  process.exit(1);
}

try { git('fetch', '-q', 'origin', 'main'); } catch { console.error('(fetch epäonnistui – luetaan viimeksi haettu origin/main)'); }
const sha = git('rev-parse', '--short', 'origin/main').trim();
const lahde = git('show', 'origin/main:js/tyohuone-raamattu.js');

// Raamattu on ES-moduuli (export const RAAMATTU): tuodaan väliaikaisesta tiedostosta.
const kansio = mkdtempSync(join(tmpdir(), 'raamattu-'));
let RAAMATTU;
try {
  const polku = join(kansio, 'raamattu.mjs');
  writeFileSync(polku, lahde);
  ({ RAAMATTU } = await import(pathToFileURL(polku).href));
} finally {
  rmSync(kansio, { recursive: true, force: true });
}

const luvut = RAAMATTU.osiot.map((o) => ({ nro: String(o.otsikko).split('.')[0].trim(), osio: o }));
console.log(`# Raamattu origin/main ${sha} (päivitetty ${RAAMATTU.paivitetty})`);
let virhe = false;
for (const p of pyynnot) {
  if (p === '--sisallys') {
    for (const { osio } of luvut) {
      const kt = Math.round(osio.kohdat.join('\n').length / 1000);
      console.log(`${osio.otsikko} – ${osio.kohdat.length} kohtaa, ~${kt} kt`);
    }
    continue;
  }
  const [lukuNro, kohtaNro] = p.split('.');
  const luku = luvut.find((l) => l.nro === lukuNro);
  if (!luku) { console.error(`tuntematon luku: ${p}`); virhe = true; continue; }
  if (kohtaNro === undefined || kohtaNro === '') {
    console.log(`\n## ${luku.osio.otsikko}${luku.osio.tila ? ` (${luku.osio.tila})` : ''}\n`);
    for (const k of luku.osio.kohdat) console.log(`${k}\n`);
    continue;
  }
  const kohta = luku.osio.kohdat.find((k) => k.startsWith(`${lukuNro}.${kohtaNro} `));
  if (!kohta) { console.error(`tuntematon kohta: ${p}`); virhe = true; continue; }
  console.log(`\n${kohta}\n`);
}
process.exit(virhe ? 1 : 0);
