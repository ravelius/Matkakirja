#!/usr/bin/env node
/*
 * VUOSIEHDOKKAAT SK:lle (Pelikoodari 17.11.2026; suunnitelma 20261117-noston-vuosiluvut luku 1 ja 6.3).
 * Kone ehdottaa, SK kirjoittaa: tulostaa noston vuodet valmiina riveinä, joista SK poistaa turhat (≤ 5, vuosi joka kantaa tarinaa;
 * lähteet-ja-tarkistus 4) ja kirjoittaa selitteen (1–3 sanaa, ≤ 20 merkkiä, sama asia kuin virke). Virke näytetään kommenttina.
 *
 *   node tools/sisalto/vuosiehdokkaat.mjs pariisi            nähtävyysjutut ja kadonneet ihmeet (kaupunki)
 *   node tools/sisalto/vuosiehdokkaat.mjs hetki|skandaali|takynosto [hakusana]
 *   node tools/sisalto/vuosiehdokkaat.mjs --tarkista         nykyiset `vuodet`-rivit sääntöjä vasten (sama kuin testi)
 *   node tools/sisalto/vuosiehdokkaat.mjs --karsi-luettelo   poistaa luettelosta nostot, joilla on nyt kenttä (luettelo vain pienenee)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { kaikkiNostot, vuosiEhdokkaat, vuosiVirheet } from './noston-vuodet.mjs';

export const LUETTELO = new URL('../../tests/fixtures/noston-vuodet-puuttuvat.txt', import.meta.url);
const [arg, haku] = process.argv.slice(2);
const nostot = kaikkiNostot();

if (arg === '--tarkista') {
  let n = 0;
  for (const x of nostot) for (const v of vuosiVirheet(x.teksti, x.vuodet)) { n++; console.log(`${x.avain}: ${v}`); }
  console.log(n ? `${n} virhettä` : 'kaikki vuodet-rivit kunnossa');
  process.exit(n ? 1 : 0);
}
if (arg === '--karsi-luettelo') {
  const rivit = readFileSync(LUETTELO, 'utf8').split('\n');
  const kentalla = new Set(nostot.filter((x) => x.vuodet).map((x) => x.avain));
  const jaa = rivit.filter((r) => !kentalla.has(r.trim()));
  writeFileSync(LUETTELO, jaa.join('\n'));
  console.log(`luettelosta pois ${rivit.length - jaa.length} riviä`);
  process.exit(0);
}
if (!arg) { console.error('anna kaupunki (pariisi …) tai laji (hetki | skandaali | takynosto); ks. tiedoston alku'); process.exit(2); }
const valitut = nostot.filter((x) => (x.kaupunki === arg || x.laji === arg) && (!haku || x.nimi.toLowerCase().includes(haku.toLowerCase())));
const js = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
for (const x of valitut) {
  const eh = vuosiEhdokkaat(x.teksti);
  if (!eh.length) continue;
  console.log(`\n// ${x.avain}  (${x.tiedosto})${x.vuodet ? '  — KENTTÄ ON JO' : ''}`);
  console.log('vuodet: [');
  for (const e of eh) {
    console.log(`  // ${e.virke}`);
    console.log(`  { kohta: ${e.kohta ? js(e.kohta) : "'?? ei yksikäsitteistä kohtaa: kirjoita käsin'"}, vuosi: ${js(e.vuosi)}, selite: '' },`);
  }
  console.log('],');
}
