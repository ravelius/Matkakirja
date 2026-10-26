#!/usr/bin/env node
/*
 * Kirjoittaa astronautin kameran maailmankierroksen aineistoon:
 * js/linssit/satelliitti-data.js → export const SATELLIITTI_KIERROS.
 *
 *   node tools/laske-astronautin-kierros.mjs [--tarkista]
 *
 * Laskenta on js/linssit/astronautin-kierros.js:ssä (sama algoritmi kuin
 * natiivin AstronauttiKierros.cs). tools/hae-satelliittihavainnot.mjs
 * kirjoittaa kentän itse aineistoa hakiessaan; tämä työkalu päivittää vain
 * kentän, kun kohteita on muutettu käsin tai kenttä puuttuu. --tarkista
 * ei kirjoita mitään ja palauttaa koodin 1, jos kenttä on vanhentunut.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { laskeKierros } from '../js/linssit/astronautin-kierros.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const POLKU = join(JUURI, 'js/linssit/satelliitti-data.js');

/** Kentän lähdeteksti (sama muoto kuin hae-satelliittihavainnot.mjs kirjoittaa). */
export function kierrosLohko(tunnukset) {
  return '\n/*\n'
    + ' * Maailmankierros ‹ › -napeille ja gallerian jatkolle (js/linssit/\n'
    + ' * astronautin-kierros.js: lähin naapuri + 2-opt, myötäpäivään\n'
    + ' * läntisimmästä). Natiivi lukee saman järjestyksen.\n'
    + ' */\n'
    + `export const SATELLIITTI_KIERROS = ${JSON.stringify(tunnukset, null, 2)};\n`;
}

const LOHKON_ALKU = /\n\/\*\n \* Maailmankierros[\s\S]*$/;

if (process.argv[1] && process.argv[1].endsWith('laske-astronautin-kierros.mjs')) {
  const { SATELLIITTI_KOHTEET, SATELLIITTI_KIERROS } = await import(pathToFileURL(POLKU).href);
  const uusi = laskeKierros(SATELLIITTI_KOHTEET);
  const ennallaan = JSON.stringify(uusi) === JSON.stringify(SATELLIITTI_KIERROS ?? null);
  if (process.argv.includes('--tarkista')) {
    process.stdout.write(ennallaan ? 'Kierros ajan tasalla.\n' : 'Kierros vanhentunut: aja node tools/laske-astronautin-kierros.mjs\n');
    process.exit(ennallaan ? 0 : 1);
  }
  const vanha = readFileSync(POLKU, 'utf8');
  const runko = vanha.replace(LOHKON_ALKU, '\n').replace(/\n+$/, '\n');
  writeFileSync(POLKU, runko + kierrosLohko(uusi));
  process.stdout.write(`${ennallaan ? 'Ennallaan' : 'Kirjoitettu'}: ${uusi.length} kohdetta → ${POLKU}\n`);
}
