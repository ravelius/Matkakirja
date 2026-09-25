/*
 * PÄÄTÖSLOKIIN KIRJAAMINEN — Raamatun jako 20.9.2026.
 *
 *   node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"
 *
 * Omistajan päätös 20.9.2026 klo 18.08 (Raamattu, Ohjedokumenttien
 * kartta): Raamatussa (js/tyohuone-raamattu.js) on vain voimassa oleva
 * linjaus per aihe; koko päätöshistoria elää sanatarkasti kansiossa
 * docs/raamattu-loki/. Uudet päätökset kirjataan tällä työkalulla
 * tiedoston docs/raamattu-loki/paatokset-2026-09.md LOPPUUN muodossa
 *
 *   ## OTSIKKO (pp.kk.vvvv klo hh.mm)
 *
 *   teksti
 *
 * Aikaleima on Suomen aikaa (Raamattu: KELLONAJAT SUOMEN AIKAA).
 * Raamatun linjausta muutetaan vain kun sääntö muuttuu — ja senkin
 * kirjoittaa Fable. Otsikko kirjoitetaan sellaisenaan (versaalit
 * kuten aiemmissa lokeissa: "KARTTAUUDISTUKSEN PAATOKSET 54: ...").
 */

import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const LOKI = 'docs/raamattu-loki/paatokset-2026-09.md';

/** Suomen aika muodossa "pp.kk.vvvv klo hh.mm". */
export function suomenAika(nyt = new Date()) {
  const osat = Object.fromEntries(
    new Intl.DateTimeFormat('fi-FI', {
      timeZone: 'Europe/Helsinki', day: 'numeric', month: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(nyt).filter((p) => p.type !== 'literal').map((p) => [p.type, p.value]),
  );
  return `${osat.day}.${osat.month}.${osat.year} klo ${osat.hour}.${osat.minute}`;
}

/** Lokikohta merkkijonona (ilman tiedostoon kirjoittamista). */
export function lokikohta(otsikko, teksti, nyt = new Date()) {
  const o = String(otsikko ?? '').replace(/\s+/g, ' ').trim();
  const t = String(teksti ?? '').trim();
  if (!o || !t) throw new Error('Anna otsikko ja teksti: node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"');
  return `\n## ${o} (${suomenAika(nyt)})\n\n${t}\n`;
}

/** Lisää kohdan lokin loppuun; palauttaa kirjoitetun otsikkorivin. */
export function kirjaa(otsikko, teksti, { juuri = dirname(dirname(fileURLToPath(import.meta.url))), nyt = new Date() } = {}) {
  const polku = join(juuri, LOKI);
  if (!existsSync(polku)) throw new Error(`lokia ei ole: ${LOKI}`);
  const kohta = lokikohta(otsikko, teksti, nyt);
  const vanha = readFileSync(polku, 'utf8');
  appendFileSync(polku, (vanha.endsWith('\n') ? '' : '\n') + kohta);
  return kohta.split('\n')[1];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [otsikko, teksti] = process.argv.slice(2);
  try {
    console.log(`Kirjattu ${LOKI}: ${kirjaa(otsikko, teksti)}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
