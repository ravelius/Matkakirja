#!/usr/bin/env node
/*
 * IHMEEN TÄHDEN PAIKAT KOHDEKARTAN PIIRROKSILLE (Karttaseppä 31.10.2026, KK: Tuileries'n palatsin tähti leijui ~55 px
 * matalan piirroksen yläpuolella). Tähti istuu piirroksen näkyvän yläreunan keskellä. Selain ei voi mitata ämpärin kuvia
 * (media.matkakirja.app ei lähetä CORS-otsakkeita → canvas on "tainted"), joten paikat mitataan tässä etukäteen ja
 * kirjoitetaan js/packs/ihmetahdet.js:ään. js/nahtavyydet.js lukee taulun ensin; selaimen mittaus jää varalle
 * (repon kuvat kehityksessä).
 *
 * Mukana ovat kaikki kohdekarttojen piirrokset, joiden kohteella on Matkakirjan ihme (js/fokuskohteet.js
 * matkakirjanIhme). Kuva luetaan repon polusta tai ämpäristä (pelkkä tunnus = kohtaamiset/miniatyyrit/<tunnus>.png).
 * Mittaus: tools/ihmetahti-mitta.py (PIL; sama sääntö kuin selaimessa).
 *
 * Käyttö:  node tools/mittaa-ihmetahdet.mjs
 * Aja aina, kun ihmeelle tulee piirros tai piirros vaihtuu (tests/ihmetahdet.test.mjs muistuttaa puuttuvasta).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const AMPARI = 'https://media.matkakirja.app/kohtaamiset/miniatyyrit/';
const { MINIATYYRIT } = await import(new URL('../js/packs/miniatyyrit.js', import.meta.url));
const { matkakirjanIhme } = await import(new URL('../js/fokuskohteet.js', import.meta.url));

const arvot = new Set();
for (const taulu of Object.values(MINIATYYRIT)) {
  for (const [nimi, arvo] of Object.entries(taulu)) if (matkakirjanIhme(nimi)) arvot.add(arvo);
}
const valiaikainen = mkdtempSync(join(tmpdir(), 'ihmetahdet-'));
const tiedostot = new Map();
for (const arvo of [...arvot].sort()) {
  const repo = join(JUURI, arvo);
  if (arvo.includes('/') && existsSync(repo)) { tiedostot.set(arvo, repo); continue; }
  const nimi = arvo.includes('/') ? arvo.split('/').pop() : `${arvo}.png`;
  const vastaus = await fetch(AMPARI + nimi);
  if (!vastaus.ok) { console.warn(`ohitetaan ${arvo}: ämpäri ${vastaus.status}`); continue; }
  const polku = join(valiaikainen, nimi);
  writeFileSync(polku, Buffer.from(await vastaus.arrayBuffer()));
  tiedostot.set(arvo, polku);
}
const mitat = JSON.parse(execFileSync('python3', ['-I', join(JUURI, 'tools/ihmetahti-mitta.py'), ...tiedostot.values()], { encoding: 'utf8' }));
const rivit = [...tiedostot].map(([arvo, polku]) => `  ${JSON.stringify(arvo)}: [${mitat[polku].join(', ')}],`);
writeFileSync(join(JUURI, 'js/packs/ihmetahdet.js'), `/*
 * IHMEEN TÄHDEN PAIKAT kohdekarttojen piirroksissa: miniatyyrin arvo (js/packs/miniatyyrit.js) → [ylä, keski]
 * laatikon osuuksina (0–1). GENEROITU: node tools/mittaa-ihmetahdet.mjs — älä muokkaa käsin.
 * Perustelu ja sääntö: tools/mittaa-ihmetahdet.mjs ja js/nahtavyydet.js piirroksenPaikat (KK 31.10.2026).
 */
export const IHMETAHDET = {
${rivit.join('\n')}
};
`);
console.log(`${rivit.length} ihmeen piirrosta → js/packs/ihmetahdet.js`);
