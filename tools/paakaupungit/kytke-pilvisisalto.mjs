// Kytkee pääkaupunkien pilvisisällön (paakaupungit-pilvi/<erä>/<id>/sisalto.json) pelin tauluihin (PILVIOHJE luku 12 kohta 2).
// Käyttö: node kytke.mjs <repo> <data-kansio>   (data-kansio = paakaupungit-pilvi)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const [repo, data] = process.argv.slice(2);
const JS_ID = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function js(v, sisennys) {
  const s = ' '.repeat(sisennys);
  if (v === null) return 'null';
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  if (typeof v !== 'object') return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    if (v.every((x) => typeof x === 'number')) return `[${v.join(', ')}]`;
    return `[\n${v.map((x) => `${s}  ${js(x, sisennys + 2)}`).join(',\n')},\n${s}]`;
  }
  const e = Object.entries(v);
  if (!e.length) return '{}';
  return `{\n${e.map(([k, x]) => `${s}  ${JS_ID.test(k) ? k : js(k, 0)}: ${js(x, sisennys + 2)}`).join(',\n')},\n${s}}`;
}
const kaupungit = [];
for (const era of readdirSync(data).filter((x) => /^e\d+$/.test(x)).sort())
  for (const id of readdirSync(join(data, era)).sort()) {
    const p = join(data, era, id, 'sisalto.json');
    if (existsSync(p)) kaupungit.push(JSON.parse(readFileSync(p, 'utf8')));
  }
// Lisää taulun loppuun (ennen sulkevaa "};") rivit; taulu tunnistetaan otsikkorivistä.
function lisaa(tiedosto, otsikko, rivit, kommentti) {
  const polku = join(repo, 'js/packs', tiedosto);
  let s = readFileSync(polku, 'utf8');
  const a = s.indexOf(otsikko);
  if (a < 0) throw new Error(`${tiedosto}: ei ${otsikko}`);
  const b = s.indexOf('\n};', a);
  const lohko = `\n  /*\n${kommentti.map((x) => `   * ${x}`).join('\n')}\n   */\n${rivit.join('\n')}`;
  s = s.slice(0, b) + lohko + s.slice(b);
  writeFileSync(polku, s);
}
const era = (k) => `${k.era}`;
const kom = (mita) => [
  `PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e01–e02, tarkistettu ${kaupungit.length} kaupunkia 0 virhettä):`,
  `${mita}. Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa`,
  'maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e01-pilvi ja -e02-pilvi.',
];
const r = (k, arvo) => `  ${JS_ID.test(k) ? k : js(k, 0)}: ${js(arvo, 2)},`;
lisaa('kulttuuri-kategoriat.js', 'export const KULTTUURI_KATEGORIAT = {', kaupungit.map((k) => r(k.id, k.kaupunkilehti)), kom('Kaupunkilehti (kansi + teemasivut)'));
lisaa('nahtavyysjutut.js', 'export const NAHTAVYYSJUTUT = {', kaupungit.filter((k) => k.nahtavyydet).map((k) => r(k.id, k.nahtavyydet)), kom('Kohdekartan nähtävyysjutut'));
lisaa('saatiedot.js', 'export const SAATIEDOT = {', kaupungit.filter((k) => k.saatiedot).map((k) => r(k.id, k.saatiedot)),
  [...kom('Säärivit sääaseman normaaleista (tyokalu.mjs saa; asema ja kausi lahde-kentässä)'), 'Ilmastotaulukon artikkeli ja luku-päivä: haaran <id>/saa.json tausta.']);
lisaa('europe-valokuvat.js', 'export const EUROPE_VALOKUVAT = {', kaupungit.filter((k) => k.valokuva).map((k) => r(k.id, k.valokuva)), kom('Valokuva (vain dataa: ei pysäkkiä, ei kuluttajaa vielä)'));
lisaa('europe-questions.js', 'export const EUROPE_QUESTIONS = {', kaupungit.map((k) => r(k.id, k.kysymykset)), kom('Kysymykset (vain dataa: ei pysäkkiä, Päätoimittaja 06.4x)'));
lisaa('europe-questions.js', 'export const EUROPE_FACTS = {', kaupungit.map((k) => r(k.id, k.tiedot)), kom('Tiedot (vain dataa)'));
lisaa('europe-artikkelit.js', 'export const EUROPE_ARTIKKELIT = {', kaupungit.map((k) => r(k.kaupunki.wiki, k.artikkeli)), kom('Artikkelit wiki-otsikolla (vain dataa)'));
// Pisteen id → artikkeliavain (maakortin pääkaupunkirivin esittely, js/fokusmitat.js); taulu on tiedoston lopussa.
lisaa('europe-artikkelit.js', 'export const PAAKAUPUNKIEN_ARTIKKELIAVAIMET = {', kaupungit.map((k) => r(k.id, k.kaupunki.wiki)),
  kom('Artikkeliavaimet'));
lisaa('maakartat.js', 'export const KAUPUNKIKARTAT = {', kaupungit.filter((k) => k.kohdekartta).map((k) => r(k.id,
  { polku: `assets/kartat/${k.id}-keskusta.png`, lahde: '© OpenStreetMap-tekijät (ODbL)', ...k.kohdekartta })), kom('Kohdekartat (piirto tools/piirra-kaupunkikartta.mjs)'));
writeFileSync(join(repo, '.pk-rajat.json'), JSON.stringify(Object.fromEntries(kaupungit.filter((k) => k.kohdekartta).map((k) => [k.id, k.kohdekartta.rajat])), null, 1));
console.log(kaupungit.map((k) => `${k.era}/${k.id}`).join(' '));
