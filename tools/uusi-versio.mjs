/*
 * Atominen versionosto — poistaa numerotuplat rinnakkaisjulkaisuissa.
 *
 *   node tools/uusi-versio.mjs "Muutoslokirivi tähän"
 *
 * Mitä se tekee yhdellä ajolla:
 *   1. git fetch origin main (tuorein main JUURI valintahetkellä)
 *   2. lukee mainin sw.js:n CACHE-numeron JA muutokset.js:n ylimmän
 *      rivin — seuraava numero on suurempi näistä + 1, joten tuplaa
 *      ei voi syntyä vaikka joku olisi juuri julkaissut
 *   3. kirjoittaa numeron kolmeen paikkaan: sw.js CACHE,
 *      js/main.js APP_VERSION ja uusi rivi js/muutokset.js:n kärkeen
 *
 * Rivin pituusraja on sama kuin muutoslokin testissä (~60 merkkiä).
 * 9.8.2026 kuusi rinnakkaista julkaisijaa tuotti kaksi numerotuplaa
 * (v467, v468) käsin tehdyillä nostoilla — tämä työkalu on se
 * julkaisukaavan askel, jota ei enää tehdä käsin.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rivi = process.argv.slice(2).join(' ').trim();

if (!rivi) {
  console.error('Anna muutoslokirivi: node tools/uusi-versio.mjs "Mitä muuttui"');
  process.exit(1);
}
if (rivi.length > 60) {
  console.error(`Rivi on ${rivi.length} merkkiä — raja on 60. Tiivistä.`);
  process.exit(1);
}

execSync('git fetch origin main', { cwd: JUURI, stdio: 'pipe' });

const mainista = (polku) => execSync(`git show origin/main:${polku}`, { cwd: JUURI, encoding: 'utf8' });

const cacheOsuma = mainista('sw.js').match(/matkakirja-(\d{4}-\d{2}-\d{2})\.(\d+)/);
const lokiOsuma = mainista('js/muutokset.js').match(/\{ v: (\d+),/);
if (!cacheOsuma || !lokiOsuma) {
  console.error('Mainin versiomuotoa ei tunnistettu — tarkista käsin.');
  process.exit(1);
}
const uusi = Math.max(Number(cacheOsuma[2]), Number(lokiOsuma[1])) + 1;
const paiva = cacheOsuma[1];

const muokkaa = (polku, teksti) => writeFileSync(resolve(JUURI, polku), teksti);

const sw = readFileSync(resolve(JUURI, 'sw.js'), 'utf8');
muokkaa('sw.js', sw.replace(/matkakirja-\d{4}-\d{2}-\d{2}\.\d+/, `matkakirja-${paiva}.${uusi}`));

const main = readFileSync(resolve(JUURI, 'js/main.js'), 'utf8');
muokkaa('js/main.js', main.replace(/APP_VERSION = '\d{4}-\d{2}-\d{2}\.\d+'/, `APP_VERSION = '${paiva}.${uusi}'`));

const loki = readFileSync(resolve(JUURI, 'js/muutokset.js'), 'utf8');
if (loki.includes(`{ v: ${uusi},`)) {
  console.error(`v${uusi} on jo paikallisessa lokissa — ajoitko työkalun kahdesti?`);
  process.exit(1);
}
muokkaa('js/muutokset.js', loki.replace(
  'export const MUUTOKSET = [\n',
  `export const MUUTOKSET = [\n  { v: ${uusi}, teksti: '${rivi.replace(/'/g, "\\'")}' },\n`,
));

console.log(`v${uusi} (${paiva}.${uusi}) — sw.js, js/main.js ja js/muutokset.js päivitetty.`);
console.log('Muista silti: testit + build ennen committia, ja jos merge kestää, aja uudelleen.');
