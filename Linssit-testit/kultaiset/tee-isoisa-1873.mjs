// Isoisän linssin 1873 kultaiset arvot (js/linssit/isoisa-1873.js: NIMIEN_KORKEUSRAJAT,
// NIMIEN_ARVO, ratkaiseTormaykset, nimiNakyy) Karttasepän haarasta karttaseppa-isoisan-linssi.
//
// Moduuli tuo pallo.js:n (DOM), joten puhtaat vakiot ja funktiot luetaan lähdetekstistä
// (git show) ja ajetaan sellaisinaan. Satunnaiset törmäystapaukset kiinteällä siemenellä.
// Kopioi myös koepaketin nimisto-1873.json ja pienen otteen striimattavasta aineistosta.
//
// Käyttö: node tee-isoisa-1873.mjs [pelin checkout] [sisältöpaketti] [isoisa-1873.json]
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const repo = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v17';
const striimi = process.argv[4] ?? '/Users/Shared/Claude/proto-3d/lokit/isoisa-1873/isoisa-1873.json';
const haara = 'origin/karttaseppa-isoisan-linssi';
const lahde = execFileSync('git', ['-C', repo, 'show', `${haara}:js/linssit/isoisa-1873.js`], { encoding: 'utf8' });

// export const X = Object.freeze({...}); ja export function f(...) {...} ilman importteja.
const pala = (alku) => {
  const i = lahde.indexOf(alku);
  if (i < 0) throw new Error('puuttuu: ' + alku);
  // Vakio päättyy ensimmäiseen ');' (Object.freeze), funktio rivin alun '}':een.
  const loppu = alku.startsWith('export const') ? lahde.indexOf(');', i) + 2 : lahde.indexOf('\n}', i) + 2;
  return lahde.slice(i, loppu).replace(/^export /, '');
};
const koodi = [
  pala('export const NIMIEN_KORKEUSRAJAT'),
  pala('export const NIMIEN_ARVO'),
  lahde.match(/export const NIMIEN_RAKO_PX = [^;]+;/)[0].replace(/^export /, ''),
  pala('export function ratkaiseTormaykset'),
  pala('export function nimiNakyy'),
  'return { NIMIEN_KORKEUSRAJAT, NIMIEN_ARVO, NIMIEN_RAKO_PX, ratkaiseTormaykset, nimiNakyy };',
].join('\n');
const W = new Function(koodi)();

let s = 20260923;
const satunnainen = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const koot = ['suuri', 'keski', 'pieni', 'maakunta'];
const tapaukset = [];
for (let t = 0; t < 40; t++) {
  const n = 3 + Math.floor(satunnainen() * 25);
  const laatikot = [];
  for (let i = 0; i < n; i++) {
    const x = Math.round(satunnainen() * 600), y = Math.round(satunnainen() * 400);
    const koko = koot[Math.floor(satunnainen() * 4)];
    laatikot.push({ avain: `n${i}`, arvo: W.NIMIEN_ARVO[koko], x0: x, y0: y, x1: x + 20 + Math.round(satunnainen() * 120), y1: y + 10 + Math.round(satunnainen() * 8) });
  }
  tapaukset.push({ laatikot, piiloon: [...W.ratkaiseTormaykset(laatikot)].sort() });
}
const korkeudet = [0.05, 0.12, 0.13, 0.1301, 0.14, 0.15, 0.1501, 0.205, 2.5];
const nakyvyys = korkeudet.map((k) => ({ korkeus: k, ...Object.fromEntries(koot.map((koko) => [koko, W.nimiNakyy(koko, k)])) }));

writeFileSync(join(tama, 'isoisa-1873.json'), JSON.stringify({
  rako: W.NIMIEN_RAKO_PX, arvo: W.NIMIEN_ARVO,
  rajat: Object.fromEntries(Object.entries(W.NIMIEN_KORKEUSRAJAT).map(([k, v]) => [k, Number.isFinite(v) ? v : null])),
  nakyvyys, tapaukset,
}, null, 1));

const n = JSON.parse(readFileSync(join(paketti, 'moduulit/js/packs/nimisto-1873.json'), 'utf8'));
writeFileSync(join(tama, 'paketti', 'nimisto-1873.json'), JSON.stringify(n));
// Ote striimattavasta aineistosta: kentät, 12 ensimmäistä viivaa ja kaikki valtiot (ei koko GPL-tiedostoa testeihin).
const d = JSON.parse(readFileSync(striimi, 'utf8'));
writeFileSync(join(tama, 'paketti', 'isoisa-1873-ote.json'), JSON.stringify({ ...d, viivat: d.viivat.slice(0, 12), viivojaKaikkiaan: d.viivat.length }));
console.log('tapauksia', tapaukset.length, 'piilotettuja', tapaukset.reduce((a, t) => a + t.piiloon.length, 0),
  'maakuntia 1873', n.exportit.NIMISTO_1873.filter((r) => r.aika === '1873').length);
