// Kytkee pääkaupunkien pilvisisällön (paakaupungit-pilvi/<erä>/<id>/sisalto.json) pelin tauluihin (PILVIOHJE luku 12 kohta 2).
// Käyttö: node kytke.mjs <repo> <data-kansio>   (data-kansio = paakaupungit-pilvi)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
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
for (const era of readdirSync(data).filter((x) => /^e\d+[a-z]?$/.test(x)).sort())
  for (const id of readdirSync(join(data, era)).sort()) {
    const p = join(data, era, id, 'sisalto.json');
    if (existsSync(p)) kaupungit.push(JSON.parse(readFileSync(p, 'utf8')));
  }
// Codexin visoissa oikea on aina indeksi 0, ja kaupunkilehden minitehtävä piirtyy datajärjestyksessä (js/fokustehtavat.js,
// tests/visajakauma.test.mjs). Oikea vaihdetaan kysymystekstin tiivisteen osoittamaan paikkaan: sama data → sama järjestys.
const paikka = (teksti, n) => { let h = 2166136261; for (const c of teksti) h = Math.imul(h ^ c.codePointAt(0), 16777619); return (h >>> 0) % n; };
function sekoita(visa, vaihtoehdot, oikea, teksti) {
  const v = visa[vaihtoehdot], i = visa[oikea], j = paikka(visa[teksti], v.length);
  if (!Number.isInteger(i) || i === j) return;
  [v[i], v[j]] = [v[j], v[i]]; visa[oikea] = j;
}
for (const k of kaupungit) {
  for (const q of k.kysymykset ?? []) sekoita(q, 'options', 'correct', 'q');
  for (const s of k.kaupunkilehti ?? []) if (s.tehtava?.vaihtoehdot) sekoita(s.tehtava, 'vaihtoehdot', 'oikea', 'kysymys');
}
// Lisää taulun loppuun (ennen sulkevaa "};") rivit; taulu tunnistetaan otsikkorivistä.
function lisaa(tiedosto, otsikko, rivit, kommentti) {
  if (!rivit.length) return; // ei tyhjää kommenttilohkoa (esim. erä ilman säärivejä)
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
  `PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät ${[...new Set(kaupungit.map((k) => k.era))].join(', ')}, ${kaupungit.length} kaupunkia):`,
  `${mita}. Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa`,
  `maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat ${[...new Set(kaupungit.map((k) => `paakaupungit-${k.era}-pilvi`))].join(', ')}.`,
];
const r = (k, arvo) => `  ${JS_ID.test(k) ? k : js(k, 0)}: ${js(arvo, 2)},`;
lisaa('kulttuuri-kategoriat.js', 'export const KULTTUURI_KATEGORIAT = {', kaupungit.map((k) => r(k.id, k.kaupunkilehti)), kom('Kaupunkilehti (kansi + teemasivut)'));
lisaa('nahtavyysjutut.js', 'export const NAHTAVYYSJUTUT = {', kaupungit.filter((k) => k.nahtavyydet).map((k) => r(k.id, k.nahtavyydet)), kom('Kohdekartan nähtävyysjutut'));
lisaa('saatiedot.js', 'export const SAATIEDOT = {', kaupungit.filter((k) => k.saatiedot).map((k) => r(k.id, k.saatiedot)),
  [...kom('Säärivit sääaseman normaaleista (tyokalu.mjs saa; asema ja kausi lahde-kentässä)'), 'Ilmastotaulukon artikkeli ja luku-päivä: haaran <id>/saa.json tausta.']);
lisaa('europe-valokuvat.js', 'export const EUROPE_VALOKUVAT = {', kaupungit.filter((k) => k.valokuva).map((k) => r(k.id, k.valokuva)), kom('Valokuva (vain dataa: ei pysäkkiä, ei kuluttajaa vielä)'));
lisaa('europe-questions.js', 'export const PAAKAUPUNKIEN_KYSYMYKSET = {', kaupungit.map((k) => r(k.id, k.kysymykset)), kom('Kysymykset (vain dataa: ei pysäkkiä, Päätoimittaja 06.4x)'));
lisaa('europe-questions.js', 'export const PAAKAUPUNKIEN_TIEDOT = {', kaupungit.map((k) => r(k.id, k.tiedot)), kom('Tiedot (vain dataa)'));
lisaa('europe-artikkelit.js', 'export const EUROPE_ARTIKKELIT = {', kaupungit.map((k) => r(k.kaupunki.wiki, k.artikkeli)), kom('Artikkelit wiki-otsikolla (vain dataa)'));
// Pisteen id → artikkeliavain (maakortin pääkaupunkirivin esittely, js/fokusmitat.js); taulu on tiedoston lopussa.
lisaa('europe-artikkelit.js', 'export const PAAKAUPUNKIEN_ARTIKKELIAVAIMET = {', kaupungit.map((k) => r(k.id, k.kaupunki.wiki)),
  kom('Artikkeliavaimet'));
// Kohdekartat (Pelikoodari 13.10.2026): rivi syntyy vain piirretylle kuvalle. Karttasepän kohdekartat.mjs kirjoittaa
// <erä>/kohdekartat-mac.json:n; PIIRRÄ-kaupunki saa sen rajat (kuva piirretty niillä). Vanha kartta (Afrikan 42) säilyttää
// kuvansa ja rajansa: jos Codexin kohteet mahtuvat siihen (sama ehto kuin kohdekartat.mjs), kohteet ja esittely vaihtuvat,
// muuten vanha rivi jää ennalleen. Kaupunki ilman piirrettyä kuvaa (alle 3 kohdetta, ei vanhaa) ei saa riviä. Korvattava
// vanha rivi poistetaan, ettei tauluun synny samannimistä avainta (myöhempi voittaisi).
const { KAUPUNKIKARTAT: VANHAT } = await import(pathToFileURL(join(repo, 'js/packs/maakartat.js')).href);
const REUNA = 150, mLat = 110574, mLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180);
const sopii = (r, kohteet) => kohteet.every((k) => (r.pohjoinen - k.lat) * mLat >= REUNA && (k.lat - r.etela) * mLat >= REUNA
  && (r.ita - k.lon) * mLon((r.pohjoinen + r.etela) / 2) >= REUNA && (k.lon - r.lansi) * mLon((r.pohjoinen + r.etela) / 2) >= REUNA);
const mac = (e) => (existsSync(join(data, e, 'kohdekartat-mac.json')) ? JSON.parse(readFileSync(join(data, e, 'kohdekartat-mac.json'), 'utf8')) : {});
const kartat = [], korvattavat = [];
for (const k of kaupungit) {
  const kk = k.kohdekartta, vanha = VANHAT[k.id], t = mac(k.era)[k.id];
  // ALUEKARTTA (PT 14.10.2026): piirretty kartta ilman Codexin kohteita saa rivin tyhjällä kohdelistalla (esittely jää).
  if (!kk?.kohteet?.length && t?.paatos !== 'PIIRRÄ') continue;
  let rivi = null;
  if (t?.paatos === 'PIIRRÄ') rivi = { polku: t.polku, lahde: '© OpenStreetMap-tekijät (ODbL)', ...kk, kohteet: kk?.kohteet ?? [], rajat: t.rajat };
  else if (vanha && sopii(vanha.rajat, kk.kohteet)) rivi = { ...vanha, ...(kk.esittely ? { esittely: kk.esittely } : {}), kohteet: kk.kohteet };
  if (!rivi) continue;
  if (vanha) korvattavat.push(k.id);
  kartat.push(r(k.id, rivi));
}
if (korvattavat.length) {
  const polku = join(repo, 'js/packs/maakartat.js');
  let s = readFileSync(polku, 'utf8');
  const a = s.indexOf('export const KAUPUNKIKARTAT = {');
  for (const id of korvattavat) {
    const taulunLoppu = s.indexOf('\n};', a), alku = s.indexOf(`\n  ${id}: {\n`, a), loppu = s.indexOf('\n  },\n', alku);
    const toinen = s.indexOf(`\n  ${id}: {\n`, alku + 1);
    if (alku < 0 || alku > taulunLoppu || loppu > taulunLoppu || (toinen > 0 && toinen < taulunLoppu)) throw new Error(`maakartat.js: ${id} ei löydy yksiselitteisesti`);
    s = s.slice(0, alku) + s.slice(loppu + 5);
  }
  writeFileSync(polku, s);
}
lisaa('maakartat.js', 'export const KAUPUNKIKARTAT = {', kartat, kom('Kohdekartat (piirto tools/piirra-kaupunkikartta.mjs, rajat kohdekartat.mjs)'));
console.log(`kohdekartat: ${kartat.length} riviä, joista ${korvattavat.length} korvaa vanhan`);
writeFileSync(join(repo, '.pk-rajat.json'), JSON.stringify(Object.fromEntries(kaupungit.filter((k) => k.kohdekartta).map((k) => [k.id, k.kohdekartta.rajat])), null, 1));
console.log(kaupungit.map((k) => `${k.era}/${k.id}`).join(' '));
