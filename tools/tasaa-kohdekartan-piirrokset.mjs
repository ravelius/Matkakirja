#!/usr/bin/env node
/*
 * KOHDEKARTAN PIIRROSTEN TASAUS KAUPUNGEITTAIN (Karttaseppä 31.10.2026; omistaja 09.31–09.34, PT/KK: yksi työkalu ja
 * yksi asetus, helppo monistaa kaikkiin kaupunkeihin). Jokainen kohdekartalle piirtyvä piirros tasataan omana kuvanaan
 * yhteiseen tavoitteeseen (tools/piirrostasaus.json, sääntö tools/piirrostasaus.py) ja kirjoitetaan kohdekartan
 * versioksi <nimi>-kk.webp samaan kansioon (vie-assetit "miniatyyrit" vie sen ämpäriin). Alkuperäinen jää
 * striimikartalle (omistaja 09.17: "Haaleus on tarkoituksellista siinä toisessa kartassa").
 *
 * Tulokset:
 *   js/packs/kohdekartan-piirrokset.js   kaupunki → nähtävyyden nimi → kohdekartan kuva (web; natiivi lukee saman
 *                                        sisältöpaketista: moduulit/js/packs/kohdekartan-piirrokset.json)
 *   tools/piirrostasaus-tulokset.json    jokaisen kuvan sha ja mitat ennen/jälkeen (tests/piirrostasaus.test.mjs)
 *
 * Käyttö:  node tools/tasaa-kohdekartan-piirrokset.mjs <kaupunki> [<kaupunki> …]
 * Muut kaupungit vasta omistajan OK:n jälkeen (PT 31.10.).
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const AMPARI = 'https://media.matkakirja.app/kohtaamiset/miniatyyrit/';
const KANSIO = 'assets/kartat/miniatyyrit/';
const PAKKI = join(JUURI, 'js/packs/kohdekartan-piirrokset.js');
const TULOKSET = join(JUURI, 'tools/piirrostasaus-tulokset.json');

const kaupungit = process.argv.slice(2);
if (!kaupungit.length) { console.error('käyttö: node tools/tasaa-kohdekartan-piirrokset.mjs <kaupunki> […]'); process.exit(2); }
const { KAUPUNKIKARTAT, kaupunkikartanKohteet } = await import(new URL('../js/packs/maakartat.js', import.meta.url));
const { MINIATYYRIT } = await import(new URL('../js/packs/miniatyyrit.js', import.meta.url));
const vanha = existsSync(PAKKI) ? (await import(`${new URL('../js/packs/kohdekartan-piirrokset.js', import.meta.url)}?${Date.now()}`)).KOHDEKARTAN_PIIRROKSET : {};
const taulu = structuredClone(vanha);
const tulokset = existsSync(TULOKSET) ? JSON.parse(readFileSync(TULOKSET, 'utf8')) : {};
const valiaikainen = mkdtempSync(join(tmpdir(), 'piirrostasaus-'));

for (const kaupunki of kaupungit) {
  const kartta = KAUPUNKIKARTAT[kaupunki];
  if (!kartta) { console.error(`ei kohdekarttaa: ${kaupunki}`); process.exit(2); }
  const parit = [];
  for (const kohde of kaupunkikartanKohteet(kartta)) {
    const arvo = MINIATYYRIT[kaupunki]?.[kohde.nimi];
    if (!arvo) continue;
    let sisaan = join(JUURI, arvo);
    if (!(arvo.includes('/') && existsSync(sisaan))) {
      const nimi = arvo.includes('/') ? basename(arvo) : `${arvo}.png`;
      const vastaus = await fetch(AMPARI + nimi);
      if (!vastaus.ok) { console.warn(`ohitetaan ${kohde.nimi}: ämpäri ${vastaus.status}`); continue; }
      sisaan = join(valiaikainen, nimi);
      writeFileSync(sisaan, Buffer.from(await vastaus.arrayBuffer()));
    }
    const ulos = `${KANSIO}${basename(arvo).replace(/\.(webp|png)$/, '')}-kk.webp`;
    parit.push({ nimi: kohde.nimi, arvo, sisaan, ulos });
  }
  const mitat = JSON.parse(execFileSync('python3', ['-I', join(JUURI, 'tools/piirrostasaus.py'), 'tasaa',
    join(JUURI, 'tools/piirrostasaus.json'), ...parit.flatMap((p) => [p.sisaan, join(JUURI, p.ulos)])],
  { encoding: 'utf8', maxBuffer: 1 << 26 }));
  taulu[kaupunki] = {};
  tulokset[kaupunki] = {};
  for (const p of parit) {
    const m = mitat[join(JUURI, p.ulos)];
    taulu[kaupunki][p.nimi] = p.ulos;
    tulokset[kaupunki][p.nimi] = {
      lahde: p.arvo, kuva: p.ulos,
      sha: createHash('sha256').update(readFileSync(join(JUURI, p.ulos))).digest('hex').slice(0, 16),
      ennen: m.ennen, jalkeen: m['jälkeen'], kertoimet: m.kertoimet,
    };
    console.log(`${kaupunki}: ${p.nimi.padEnd(24)} ${JSON.stringify(m.ennen)} → ${JSON.stringify(m['jälkeen'])}`);
  }
}

const rivit = Object.entries(taulu).sort(([a], [b]) => a.localeCompare(b)).map(([k, t]) =>
  `  ${JSON.stringify(k)}: {\n${Object.entries(t).map(([n, p]) => `    ${JSON.stringify(n)}: ${JSON.stringify(p)},`).join('\n')}\n  },`);
writeFileSync(PAKKI, `/*
 * KOHDEKARTAN PIIRROKSET: kaupunki → nähtävyyden nimi → kohdekartan tasattu kuva (sama musta- ja valkopiste,
 * keskikontrasti ja kylläisyys kaikille; omistaja 31.10.2026 klo 09.31–09.34). Puuttuva kaupunki tai nimi →
 * alkuperäinen js/packs/miniatyyrit.js:stä. Striimikartta käyttää aina alkuperäistä (omistaja 09.17).
 * GENEROITU: node tools/tasaa-kohdekartan-piirrokset.mjs <kaupunki> — älä muokkaa käsin.
 */
export const KOHDEKARTAN_PIIRROKSET = {
${rivit.join('\n')}
};
`);
writeFileSync(TULOKSET, `${JSON.stringify(tulokset, null, 1)}\n`);
console.log(`→ js/packs/kohdekartan-piirrokset.js, tools/piirrostasaus-tulokset.json`);
