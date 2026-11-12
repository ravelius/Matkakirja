#!/usr/bin/env node
/*
 * VANHA OVI, OHJAA UUTEEN (KK 12.11.2026 klo 17.30, vanhan js:n poisto vaihe 1): vanha Raamattu (arkistossa docs/arkisto/)
 * ei ole enää voimassa. Kohtanumero (esim. 7.47) haetaan korteista tunnuksella [R-7.47]:
 *   node tools/raamattu-luku.mjs 7.47   →   node tools/kirjaa.mjs hae "R-7.47"
 * Pelkkä luku (esim. 7) tai --sisallys → aiheluettelo (node tools/kirjaa.mjs aiheet).
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KIRJAA = join(dirname(fileURLToPath(import.meta.url)), 'kirjaa.mjs');
const aja = (...a) => spawnSync(process.execPath, [KIRJAA, ...a], { stdio: 'inherit' }).status ?? 1;
const pyynnot = process.argv.slice(2);
console.error('Vanha Raamattu ei ole voimassa: ainoa ovi on node tools/kirjaa.mjs (hae, lue, aiheet).');
const kohdat = pyynnot.filter((p) => /^\d+\.\d+$/.test(p));
if (kohdat.length === 0) process.exit(aja('aiheet'));
let tila = 0;
for (const k of kohdat) tila = aja('hae', `R-${k}`) || tila;
process.exit(tila);
