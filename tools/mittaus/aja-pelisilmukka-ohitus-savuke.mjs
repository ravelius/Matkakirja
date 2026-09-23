#!/usr/bin/env node
/*
 * VÄLIAIKAINEN OHITUSSAVUKE (Laitetestaaja 23.9.2026) — silmukka-30s-ohitus.txt:llä,
 * käyttää `matka kaupunki tapa` -komentoa ohittamaan uuden kaupunkikortti-
 * välivaiheen (Pelikoodarin ohje, ei bugi — kortin oma testi tulee
 * `liiku`-komennon mergen jälkeen, pelikoodari/kysymys-ui). Testaa
 * matkalogiikan, lehden ja tallennuksen — EI kaupunkikortti-UI:ta.
 * Poista/korvaa kun virallinen silmukka-30s.txt (liiku-komennolla) on
 * mergetty masteriin ja aja-pelisilmukka-savuke.mjs riittää yksin.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const APP = 'app.matkakirja.proto3d';
const SKRIPTI = '/Users/Shared/Claude/wt/laitetestaaja-natiivi-sulavuus/tools/mittaus/silmukka-30s-ohitus.txt';
const ODOTETUT = [
  { tila: '1-alku', silmukka: 'Kartta', sijainti: 'c:pariisi', raha: 300, paiva: 1, aika: 'aamu' },
  { tila: '3-lehti-lontoo', silmukka: 'Lehti', sijainti: 'c:lontoo', raha: 250, paiva: 1, aika: 'aamu' },
  { tila: '4-lontoossa', silmukka: 'Kartta', sijainti: 'c:lontoo', raha: 250, paiva: 1, aika: 'aamu' },
  { tila: '5-lehti-pariisi', silmukka: 'Lehti', sijainti: 'c:pariisi', raha: 250, paiva: 1, aika: 'keskipäivä' },
  { tila: '6-loppu', silmukka: 'Kartta', sijainti: 'c:pariisi', raha: 250, paiva: 1, aika: 'keskipäivä' },
];
function mykista(paalla) { try { execFileSync('osascript', ['-e', `set volume output muted ${paalla ? 'true' : 'false'}`]); } catch {} }
const docs = execFileSync('xcrun', ['simctl', 'get_app_container', 'booted', APP, 'data'], { encoding: 'utf8' }).trim() + '/Documents';
console.log('Documents:', docs);
mykista(true);
try {
  copyFileSync(SKRIPTI, join(docs, 'peli-komento.txt'));
  console.log('Kopioitu, odotetaan 35 s...');
  execFileSync('sleep', ['35']);
  const loki = readFileSync(join(docs, 'peli-loki.txt'), 'utf8');
  console.log('--- loki ---\n' + loki);
  let ok = 0, yht = 0;
  for (const odote of ODOTETUT) {
    yht++;
    const p = join(docs, `peli-tila-${odote.tila}.json`);
    if (!existsSync(p)) { console.log(`${odote.tila}: PUUTTUU`); continue; }
    const j = JSON.parse(readFileSync(p, 'utf8'));
    const poikkeamat = [];
    if (j.silmukka !== odote.silmukka) poikkeamat.push(`silmukka ${j.silmukka}!=${odote.silmukka}`);
    if (j.sijainti !== odote.sijainti) poikkeamat.push(`sijainti ${j.sijainti}!=${odote.sijainti}`);
    if (j.raha !== odote.raha) poikkeamat.push(`raha ${j.raha}!=${odote.raha}`);
    if (j.paiva !== odote.paiva) poikkeamat.push(`paiva ${j.paiva}!=${odote.paiva}`);
    if (j.aika !== odote.aika) poikkeamat.push(`aika ${j.aika}!=${odote.aika}`);
    if (poikkeamat.length) console.log(`${odote.tila}: FAIL ${poikkeamat.join(', ')}`);
    else { console.log(`${odote.tila}: OK`); ok++; }
  }
  console.log(`\n${ok}/${yht} OK`);
} finally { mykista(false); }
