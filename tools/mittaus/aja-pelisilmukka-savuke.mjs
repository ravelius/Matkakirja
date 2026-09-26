#!/usr/bin/env node
/*
 * PELATTAVAN SILMUKAN SAVUKE (Laitetestaaja, Fable 23.9.2026).
 *
 * Ajaa Pelikoodarin 30 s -käsikirjoituksen (Peli-testit/silmukka-30s.txt,
 * proto-3d-repo) iOS-simulaattorissa ja tarkistaa jokaisen tila-tarkistus-
 * pisteen odotettua vasten (Peli-testit/README-silmukka.md:n taulukko).
 * Pariisi → bussi Lontooseen → lehti → liftaus takaisin Pariisiin → lehti.
 *
 * Ääni mykistetään ajon ajaksi (omistajan pysyvä sääntö 23.9.2026),
 * palautetaan aina.
 *
 *   node tools/mittaus/aja-pelisilmukka-savuke.mjs
 *       UDID=<simulaattorin UDID>   (oletus: booted-laite)
 *       PROTO_REPO=<polku>          (oletus: /Users/Shared/Claude/proto-3d/Matkakirja-proto)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PROTO_REPO = process.env.PROTO_REPO ?? '/Users/Shared/Claude/proto-3d/Matkakirja-proto';
const UDID = process.env.UDID ?? 'booted';
const APP = 'app.matkakirja.proto3d';
const SKRIPTI = join(PROTO_REPO, 'Peli-testit/silmukka-30s.txt');

// README-silmukka.md:n taulukko — odotetut tarkistuspisteet.
const ODOTETUT = [
  { tila: '1-alku', silmukka: 'Kartta', sijainti: 'c:pariisi', raha: 300, paiva: 1, aika: 'aamu' },
  { tila: '2-dialogi', silmukka: 'Dialogi', sijainti: 'c:pariisi', raha: 300, paiva: 1, aika: 'aamu' },
  { tila: '3-lehti-lontoo', silmukka: 'Lehti', sijainti: 'c:lontoo', raha: 250, paiva: 1, aika: 'aamu' },
  { tila: '4-lontoossa', silmukka: 'Kartta', sijainti: 'c:lontoo', raha: 250, paiva: 1, aika: 'aamu' },
  { tila: '5-lehti-pariisi', silmukka: 'Lehti', sijainti: 'c:pariisi', raha: 250, paiva: 1, aika: 'keskipäivä' },
  { tila: '6-loppu', silmukka: 'Kartta', sijainti: 'c:pariisi', raha: 250, paiva: 1, aika: 'keskipäivä' },
];

function mykista(paalla) {
  try { execFileSync('osascript', ['-e', `set volume output muted ${paalla ? 'true' : 'false'}`]); } catch { /* ei audiolaitetta: ei este */ }
}

function documentsPolku() {
  const raaka = execFileSync('xcrun', ['simctl', 'get_app_container', UDID, APP, 'data'], { encoding: 'utf8' }).trim();
  return join(raaka, 'Documents');
}

if (!existsSync(SKRIPTI)) {
  console.error(`Käsikirjoitusta ei löydy: ${SKRIPTI} (onko proto-3d-repo ajan tasalla?)`);
  process.exit(1);
}

const tulokset = { pvm: new Date().toISOString().slice(0, 10), pisteet: [], loki: null, virheet: [] };

mykista(true);
try {
  const docs = documentsPolku();
  console.log('Documents:', docs);
  copyFileSync(SKRIPTI, join(docs, 'peli-komento.txt'));
  console.log('Käsikirjoitus kopioitu, odotetaan suoritusta (40 s)...');
  execFileSync('sleep', ['40']);

  const lokiPolku = join(docs, 'peli-loki.txt');
  tulokset.loki = existsSync(lokiPolku) ? readFileSync(lokiPolku, 'utf8') : null;
  if (!tulokset.loki) tulokset.virheet.push('peli-loki.txt puuttuu — silmukka ei ehkä käynnistynyt (onko PeliOhjain mukana käännöksessä?)');

  for (const odote of ODOTETUT) {
    const tilaPolku = join(docs, `peli-tila-${odote.tila}.json`);
    if (!existsSync(tilaPolku)) {
      tulokset.pisteet.push({ tila: odote.tila, tulos: 'PUUTTUU', huomio: `tiedostoa ei löytynyt: ${tilaPolku}` });
      continue;
    }
    const j = JSON.parse(readFileSync(tilaPolku, 'utf8'));
    const poikkeamat = [];
    if (j.silmukka !== odote.silmukka) poikkeamat.push(`silmukka: odotettu ${odote.silmukka}, saatiin ${j.silmukka}`);
    if (j.sijainti !== odote.sijainti) poikkeamat.push(`sijainti: odotettu ${odote.sijainti}, saatiin ${j.sijainti}`);
    if (j.raha !== odote.raha) poikkeamat.push(`raha: odotettu ${odote.raha}, saatiin ${j.raha}`);
    if (j.paiva !== odote.paiva) poikkeamat.push(`päivä: odotettu ${odote.paiva}, saatiin ${j.paiva}`);
    if (j.aika !== odote.aika) poikkeamat.push(`aika: odotettu ${odote.aika}, saatiin ${j.aika}`);
    tulokset.pisteet.push({ tila: odote.tila, tulos: poikkeamat.length ? 'FAIL' : 'OK', poikkeamat, oikeasti: j });
  }
} finally {
  mykista(false);
}

const epaonnistuneet = tulokset.pisteet.filter((p) => p.tulos !== 'OK');
console.log(JSON.stringify(tulokset, null, 1));
console.log(`\n${tulokset.pisteet.length - epaonnistuneet.length}/${tulokset.pisteet.length} tarkistuspistettä OK.`);

const tmp = mkdtempSync(join(tmpdir(), 'pelisilmukka-'));
writeFileSync(join(tmp, 'tulos.json'), JSON.stringify(tulokset, null, 1));
console.log(`Täysi tulos: ${join(tmp, 'tulos.json')}`);

process.exit(epaonnistuneet.length || tulokset.virheet.length ? 1 : 0);
