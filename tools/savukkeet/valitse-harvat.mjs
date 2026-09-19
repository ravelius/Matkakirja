// VALITSE HARVAT — PR:n muutetuista tiedostoista ajettava sarja.
//
//   gh pr diff <nro> --name-only | node tools/savukkeet/valitse-harvat.mjs
//   → "julkaisu" tai "savuke-luentakuvat.mjs,…,julkaisu"
//
// Savukekarsinta (omistaja 19.9.2026 klo 18.50: "Testejä voi vähentää
// siellä missä harvemmin tulee ongelmia vastaan"; raportti
// docs/raportit/viesti-fable-savukekarsinta-20260919.md):
// tools/savukkeet/sarjat.json:n `harva`-rivit ajetaan PR:ssä vain, jos
// PR koskee niiden vartioimia tiedostoja (`harvaPolut`), rivin omaa
// savuketiedostoa tai yhteisiä apureita (`harvaPolut.YHTEISET`, jolloin
// kaikki harvat). Muuten ne ajetaan kerran päivässä mainista
// (.github/workflows/savukkeet.yml schedule, sarja "taysi").
//
// VARMALLA PUOLELLA: jos tiedostolistaa ei saatu (tyhjä syöte), ajetaan
// koko harva sarja — puuttuva tieto ei saa hiljaa ohittaa vartioita.

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TASSA = dirname(fileURLToPath(import.meta.url));

/** Glob → RegExp: ** = mikä tahansa, * = mikä tahansa paitsi /. */
export function globRegex(glob) {
  const osat = String(glob).split('**').map((pala) => pala
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '[^/]*'));
  return new RegExp(`^${osat.join('.*')}$`);
}

/**
 * Harvan sarjan rivit, jotka muutetut tiedostot laukaisevat.
 *
 * @param {string[]} muutetut repojuuren suhteelliset polut
 * @param {{harva?: string[], harvaPolut?: object}} sarjat sarjat.json
 * @returns {string[]} rivit sarjat.json:n `harva`-järjestyksessä
 */
export function valitseHarvat(muutetut, sarjat) {
  const harva = sarjat.harva ?? [];
  const polut = sarjat.harvaPolut ?? {};
  const tiedostot = (muutetut ?? []).map((t) => String(t).trim()).filter(Boolean);
  if (!tiedostot.length) return [...harva];
  const osuu = (globit) => globit.map(globRegex).some((re) => tiedostot.some((t) => re.test(t)));
  if (osuu(polut.YHTEISET ?? [])) return [...harva];
  return harva.filter((rivi) => {
    const oma = `tools/savukkeet/${rivi.split('#')[0]}`;
    return osuu([oma, ...(polut[rivi] ?? [])]);
  });
}

/**
 * Sarjamerkkijono aja-sarja.mjs:lle. HARVAT ENSIN: ne ovat sarjan
 * hitaimpia (110–180 s), ja aja-sarja jakaa rivit listan järjestyksessä —
 * perään lisättynä pisin rivi alkaisi viimeisenä ja venyttäisi
 * seinäkelloa (jonosimulaatio raportissa).
 */
export function sarjaPr(muutetut, sarjat) {
  return [...valitseHarvat(muutetut, sarjat), 'julkaisu'].join(',');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const sarjat = JSON.parse(readFileSync(join(TASSA, 'sarjat.json'), 'utf8'));
  let syote = '';
  try { syote = readFileSync(0, 'utf8'); } catch { /* ei syötettä */ }
  process.stdout.write(sarjaPr(syote.split('\n'), sarjat));
}
