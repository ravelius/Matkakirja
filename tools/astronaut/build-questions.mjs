/** Compile reviewed text only. Does not fetch sources, generate speech or edit lens UI. */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SATELLIITTI_KOHTEET } from '../../js/linssit/satelliitti-data.js';

// Every qa-*.json (qa-first, qa-last, qa-era1, …) in any file order; output follows SATELLIITTI_KOHTEET order.
const sourceNames = (await readdir(new URL('./', import.meta.url))).filter(name => /^qa-.+\.json$/.test(name)).sort();
const order = new Map(SATELLIITTI_KOHTEET.map((row, index) => [row.tunnus, index]));
const rows = (await Promise.all(sourceNames.map(async name => JSON.parse(await readFile(new URL(name, import.meta.url), 'utf8'))))).flat()
  .sort((a, b) => (order.get(a.tunnus) ?? Infinity) - (order.get(b.tunnus) ?? Infinity));
const keys = rows.map(row => row.tunnus);
if (new Set(keys).size !== keys.length || keys.join('|') !== SATELLIITTI_KOHTEET.map(row => row.tunnus).join('|')) throw Error('Target coverage changed: every camera target needs exactly one reviewed qa row');
const segmenter = new Intl.Segmenter('fi', { granularity: 'sentence' });
for (const row of rows) {
  const target = SATELLIITTI_KOHTEET.find(item => item.tunnus === row.tunnus);
  if (row.kysymykset.length !== 2) throw Error(`${row.tunnus}: exactly two questions required`);
  for (const qa of row.kysymykset) {
    if (!qa.kysymys || qa.kysymys.length > 60 || !qa.kysymys.endsWith('?')) throw Error(`${row.tunnus}: question length/form`);
    const sentences = [...segmenter.segment(qa.vastaus)];
    if (sentences.length < 2 || sentences.length > 3 || qa.vastaus.length > 500) throw Error(`${row.tunnus}: answer must have 2–3 short sentences`);
    if (!target.havainnot.some(image => image.id === qa.havaintoId)) throw Error(`${row.tunnus}: image not in target`);
    if (!qa.lahteet?.length) throw Error(`${row.tunnus}: missing sources`);
    for (const source of qa.lahteet) {
      const url = new URL(source.url);
      if (url.protocol !== 'https:' || !source.title || /collection\/1461|api\.asmx|service\.php|Asseeninthe/.test(source.url)) throw Error(`${row.tunnus}: noncanonical source URL`);
    }
  }
}
const data = Object.fromEntries(rows.map(row => [row.tunnus, { kysymykset: row.kysymykset.map(qa => qa.kysymys), vastaukset: row.kysymykset }]));
const code = `/**
 * Astronautin kameran valmiit kysymykset. Lähde: tools/astronaut/qa-*.json.
 * Kaksi per kohde; kysymykset:string[] sopii nykyisiin kysymyskortteihin.
 * Kuvapäivä on havainnon päivä, ei nykyhetken väite. Ei UI- tai äänikäynnistyksiä.
 * Päivitä toimituslähteet ja aja node tools/astronaut/build-questions.mjs.
 */
export const ASTRONAUTIN_KYSYMYKSET = ${JSON.stringify(data, null, 2)};

/** Nykyiseen nosto.kysymykset-kenttään; tuntematon kohde ei saa arvattuja kysymyksiä. */
export function haeAstronautinKysymykset(tunnus) {
  return [...(ASTRONAUTIN_KYSYMYKSET[tunnus]?.kysymykset ?? [])];
}

/** Täsmällinen esikirjoitettu vastaus. Renderöi tekstinä, älä innerHTML:nä. */
export function haeAstronautinVastaus(tunnus, kysymys) {
  if (typeof kysymys !== 'string') return null;
  const row = ASTRONAUTIN_KYSYMYKSET[tunnus]?.vastaukset?.find(item => item.kysymys === kysymys.trim());
  return row ? { ...row, lahteet: row.lahteet.map(source => ({ ...source })) } : null;
}
`;
const destination = new URL('../../js/linssit/astronaut-kysymykset.js', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(destination, 'utf8') !== code) throw Error('Runtime data differs from reviewed source');
} else await writeFile(destination, code);
console.log(`Verified ${rows.length} targets / ${rows.length * 2} source-backed answers: ${fileURLToPath(destination)}`);
