/*
 * PÄÄTÖSLOKIIN KIRJAAMINEN — Raamatun jako 20.9.2026.
 *
 *   node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"
 *
 * Omistajan päätös 20.9.2026 klo 18.08 (Raamattu, Ohjedokumenttien
 * kartta): Raamatussa (js/tyohuone-raamattu.js) on vain voimassa oleva
 * linjaus per aihe; koko päätöshistoria elää sanatarkasti kansiossa
 * docs/raamattu-loki/. Uudet päätökset kirjataan tällä työkalulla
 * kuukauden tiedoston docs/raamattu-loki/paatokset-VVVV-KK.md LOPPUUN
 * (tiedosto luodaan, jos puuttuu; kuukausi Suomen ajan mukaan) muodossa
 *
 *   ## OTSIKKO (pp.kk.vvvv klo hh.mm)
 *
 *   teksti
 *
 * Aikaleima on Suomen aikaa (Raamattu: KELLONAJAT SUOMEN AIKAA).
 * Raamatun linjausta muutetaan vain kun sääntö muuttuu — ja senkin
 * kirjoittaa Fable. Otsikko kirjoitetaan sellaisenaan (versaalit
 * kuten aiemmissa lokeissa: "KARTTAUUDISTUKSEN PAATOKSET 54: ...").
 *
 * Yli 1 000 merkin teksti rivitetään sanarajoista (~200 merkkiä/rivi)
 * samaan kirjaukseen, jotta haku (tools/loki-hae.mjs) ei tuo kerralla
 * kymmeniä tuhansia merkkejä.
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const LOKIKANSIO = 'docs/raamattu-loki';
export const RIVITYS_RAJA = 1000;
export const RIVIN_PITUUS = 200;

/** Kuukauden lokitiedoston suhteellinen polku (Suomen ajan kuukausi). */
export function lokipolku(nyt = new Date()) {
  const osat = Object.fromEntries(
    new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', month: '2-digit', year: 'numeric' })
      .formatToParts(nyt).filter((p) => p.type !== 'literal').map((p) => [p.type, p.value]),
  );
  return `${LOKIKANSIO}/paatokset-${osat.year}-${String(osat.month).padStart(2, '0')}.md`;
}

/** Rivittää yli RIVITYS_RAJA merkin tekstin: yli RIVIN_PITUUS pitkät rivit katkaistaan sanarajoista. */
export function rivita(teksti, raja = RIVITYS_RAJA, pituus = RIVIN_PITUUS) {
  if (teksti.length <= raja) return teksti;
  return teksti.split('\n').map((rivi) => {
    if (rivi.length <= pituus) return rivi;
    const tulos = [];
    let nyt = '';
    for (const sana of rivi.split(/(?<=\s)/)) {
      if (nyt && (nyt + sana).trimEnd().length > pituus) { tulos.push(nyt.trimEnd()); nyt = ''; }
      nyt += sana;
    }
    if (nyt) tulos.push(nyt.trimEnd());
    return tulos.join('\n');
  }).join('\n');
}

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
  return `\n## ${o} (${suomenAika(nyt)})\n\n${rivita(t)}\n`;
}

let lastKirjattu = '';

/** Lisää kohdan lokin loppuun; palauttaa kirjoitetun otsikkorivin. */
export function kirjaa(otsikko, teksti, { juuri = dirname(dirname(fileURLToPath(import.meta.url))), nyt = new Date() } = {}) {
  const kohta = lokikohta(otsikko, teksti, nyt);
  const suht = lokipolku(nyt);
  const polku = join(juuri, suht);
  if (!existsSync(polku)) {
    mkdirSync(dirname(polku), { recursive: true });
    writeFileSync(polku, `Päätösloki ${suht.match(/(\d{4}-\d{2})/)[1]}. Uusi kohta lisätään loppuun komennolla \`node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"\`; haku: \`node tools/loki-hae.mjs <hakusana>\`.\n`);
  }
  const vanha = readFileSync(polku, 'utf8');
  appendFileSync(polku, (vanha.endsWith('\n') ? '' : '\n') + kohta);
  lastKirjattu = suht;
  return kohta.split('\n')[1];
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [otsikko, teksti] = process.argv.slice(2);
  try {
    const rivi = kirjaa(otsikko, teksti);
    console.log(`Kirjattu ${lastKirjattu}: ${rivi}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
