// Korjaa kohdekarttojen rajaukset pikselivaralla (karttavarat.mjs) ja piirtää muuttuneet uudelleen (Karttaseppä 13.10.2026).
//
//   node tools/paakaupungit/korjaa-kohdekarttavarat.mjs --pk [--piirra] [--vain id,id] [--mac <paakaupungit-piirto-kansio>]
//   node tools/paakaupungit/korjaa-kohdekarttavarat.mjs <id>… [--piirra]
//
// Jokaiselle kartalle: kohteet maakartat.js:stä (kaupunkikartanKohteet), uusi rajaus korjaaVarat()-funktiolla. Muuttunut
// rajaus kirjoitetaan sekä tools/piirra-kaupunkikartta.mjs:n KAUPUNGIT-tauluun että js/packs/maakartat.js:n
// KAUPUNKIKARTAT-riville (rajat + piirtoRajat, jos kartalla on laajennus). --piirra piirtää kartan (ja värikartan, jos
// kartalla on varikartta-kenttä) Overpassista 6 s:n tauoin. --mac päivittää myös <erä>/kohdekartat-mac.json:n rajat,
// jotta kytke-pilvisisalto.mjs:n uusinta ei palauta vanhoja. Aja lopuksi tarkista-kohdekarttavarat.mjs iphone|ipad --pk.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { korjaaVarat, laajenna } from './karttavarat.mjs';
import { karttaKuvasuhde } from '../../js/packs/maakartat.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '../..');
const arg = process.argv.slice(2);
const PIIRRA = arg.includes('--piirra');
const VAIN = arg.includes('--vain') ? arg[arg.indexOf('--vain') + 1].split(',') : null;
const MAC = arg.includes('--mac') ? arg[arg.indexOf('--mac') + 1] : null;
// --mitattu <tarkista-kohdekarttavarat.mjs --json>: pelin hajautuksen siirtymät (mitattu − suora paikka) malliin.
const MITATTU = arg.includes('--mitattu') ? JSON.parse(readFileSync(arg[arg.indexOf('--mitattu') + 1], 'utf8')) : null;
const PIIRTAJA = join(JUURI, 'tools/piirra-kaupunkikartta.mjs');
const MAAKARTAT = join(JUURI, 'js/packs/maakartat.js');

function paakaupunkikartat() {
  const s = readFileSync(PIIRTAJA, 'utf8');
  const a = s.indexOf('const KAUPUNGIT = {'), loppu = s.indexOf('\n};', a), alku = s.indexOf('PÄÄKAUPUNKIPISTEET', a);
  return [...s.slice(alku, loppu).matchAll(/^ {2}([a-z0-9]+): \{/gm)].map((m) => m[1]);
}
let idt = arg.filter((a, i, l) => !a.startsWith('--') && !['--vain', '--mac', '--piirra-vain', '--mitattu'].includes(l[i - 1]));
if (arg.includes('--pk')) idt = paakaupunkikartat();
if (VAIN) idt = idt.filter((id) => VAIN.includes(id));

const { KAUPUNKIKARTAT, kaupunkikartanKohteet } = await import(`${MAAKARTAT}?${Date.now()}`);
const rajaRivi = (r) => `{ pohjoinen: ${r.pohjoinen}, etela: ${r.etela}, lansi: ${r.lansi}, ita: ${r.ita} }`;

/** Kaupungin lohko taulussa: alkaa rivistä "  id: {" ja päättyy ensimmäiseen samalla sisennyksellä olevaan "  },". */
function lohko(s, id, alku = 0) {
  const a = s.indexOf(`\n  ${id}: {\n`, alku);
  if (a < 0) return null;
  const b = s.indexOf('\n  },', a);
  return [a, b];
}
function vaihdaRajat(s, id, r, piirto, taulunAlku) {
  const l = lohko(s, id, taulunAlku);
  if (!l) throw new Error(`${id}: lohkoa ei löydy`);
  let osa = s.slice(l[0], l[1]);
  const re = /(\n {4}rajat: )\{[^}]*\}/;
  if (!re.test(osa)) throw new Error(`${id}: rajat-kenttää ei löydy`);
  osa = osa.replace(re, `$1${rajaRivi(r)}`);
  if (piirto) {
    const rp = /(\n {4}piirtoRajat: )\{[^}]*\}/;
    if (!rp.test(osa)) throw new Error(`${id}: piirtoRajat-kenttää ei löydy`);
    osa = osa.replace(rp, `$1${rajaRivi(piirto)}`);
  }
  return s.slice(0, l[0]) + osa + s.slice(l[1]);
}

const muuttuneet = [];
for (const id of idt) {
  const k = KAUPUNKIKARTAT[id];
  if (!k) { console.log(`${id.padEnd(22)} EI KARTTAA pelissä`); continue; }
  const s = readFileSync(PIIRTAJA, 'utf8');
  const taulu = s.indexOf('const KAUPUNGIT = {');
  const l = lohko(s, id, taulu);
  const laajennus = l ? Number((s.slice(l[0], l[1]).match(/\n {4}laajennus: ([\d.]+)/) || [])[1]) || null : null;
  const W = MITATTU?.kehys_px, H = W ? W / karttaKuvasuhde(k.rajat) : 0, mk = MITATTU?.kartat?.[id];
  const pisteet = kaupunkikartanKohteet(k).map((x) => {
    const q = mk?.kohteet?.find((z) => z.nimi === x.nimi);
    if (!q) return { nimi: x.nimi, lat: x.lat, lon: x.lon };
    const sx = ((x.lon - k.rajat.lansi) / (k.rajat.ita - k.rajat.lansi)) * W, sy = ((k.rajat.pohjoinen - x.lat) / (k.rajat.pohjoinen - k.rajat.etela)) * H;
    return { nimi: x.nimi, lat: x.lat, lon: x.lon, siirto: { [W]: { dx: q.x - sx, dy: q.y - sy } } };
  });
  const { rajat, muuttui, jaljella } = korjaaVarat(k.rajat, pisteet, { laajennus });
  if (!muuttui) { console.log(`${id.padEnd(22)} ok`); continue; }
  const piirto = k.piirtoRajat ? laajenna(rajat, laajennus ?? 1) : null;
  writeFileSync(PIIRTAJA, vaihdaRajat(s, id, rajat, null, taulu));
  const m = readFileSync(MAAKARTAT, 'utf8');
  writeFileSync(MAAKARTAT, vaihdaRajat(m, id, rajat, piirto, m.indexOf('export const KAUPUNKIKARTAT = {')));
  const w0 = (k.rajat.ita - k.rajat.lansi), w1 = (rajat.ita - rajat.lansi), h0 = (k.rajat.pohjoinen - k.rajat.etela), h1 = (rajat.pohjoinen - rajat.etela);
  console.log(`${id.padEnd(22)} UUSI ${rajaRivi(rajat)}  leveys ×${(w1 / w0).toFixed(2)}, korkeus ×${(h1 / h0).toFixed(2)}${jaljella.length ? `  JÄLJELLÄ ${jaljella.map((x) => `${x.kohde} (${x.nimi}, ${x.laite})`).join('; ')}` : ''}`);
  muuttuneet.push({ id, rajat, varikartta: Boolean(k.varikartta) });
}

if (MAC) {
  for (const e of readdirSync(MAC).filter((x) => existsSync(join(MAC, x, 'kohdekartat-mac.json')))) {
    const p = join(MAC, e, 'kohdekartat-mac.json'), d = JSON.parse(readFileSync(p, 'utf8'));
    let n = 0;
    for (const { id, rajat } of muuttuneet) if (d[id]?.rajat) { d[id].rajat = rajat; d[id].varat = 'karttavarat.mjs 13.10.2026'; n += 1; }
    if (n) { writeFileSync(p, JSON.stringify(d, null, 1) + '\n'); console.log(`${e}/kohdekartat-mac.json: ${n} rajausta`); }
  }
}

// --piirra-vain id,id piirtää nimetyt ilman rajamuutosta (epäonnistuneen piirron uusinta: rajat on jo kirjoitettu).
const PIIRRA_VAIN = arg.includes('--piirra-vain') ? arg[arg.indexOf('--piirra-vain') + 1].split(',') : null;
const piirrettavat = PIIRRA_VAIN ? PIIRRA_VAIN.map((id) => ({ id, varikartta: Boolean(KAUPUNKIKARTAT[id]?.varikartta) })) : PIIRRA ? muuttuneet : [];
const epaonnistui = [];
for (const { id, varikartta } of piirrettavat) {
  for (const lisa of varikartta ? [[], ['--vari']] : [[]]) {
    console.log(`\npiirretään ${id} ${lisa.join(' ')}…`);
    try { execFileSync('node', [PIIRTAJA, id, ...lisa], { cwd: JUURI, stdio: 'inherit' }); } catch { epaonnistui.push(id); }
    await new Promise((r) => setTimeout(r, 6000));
  }
}
if (epaonnistui.length) { console.log(`\nPIIRTO EPÄONNISTUI: ${[...new Set(epaonnistui)].join(',')} → aja --piirra-vain ${[...new Set(epaonnistui)].join(',')}`); process.exitCode = 1; }
console.log(`\n${muuttuneet.length} rajausta muuttui${PIIRRA ? ' ja piirrettiin' : ''}.`);
