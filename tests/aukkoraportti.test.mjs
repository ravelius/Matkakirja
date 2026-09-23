/*
 * ÄMPÄRIN AUKKORAPORTTI — ryhmittely ja viikkotyönkulun muoto.
 *
 * .github/workflows/amparin-aukot.yml ajaa verkkotarkistuksen viikoittain
 * (ei PR-portissa) ja kirjoittaa tuloksen issueen
 * tools/vienti/aukkoraportti.mjs:n avulla. Tämä testi ajaa vain
 * ryhmittelyn keinotekoisella datalla, ilman verkkoa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { ryhmittele, markdown } from '../tools/vienti/aukkoraportti.mjs';

const tarkistus = {
  lajit: { 'kuva-commons': { tarkistettu: 10, ok: 8, varalla: 1, puuttuu: 1 }, 'aani-oma': { tarkistettu: 2, ok: 1, varalla: 0, puuttuu: 1 } },
  puuttuvat: [
    { laji: 'kuva-commons', arvo: 'Väärä nimi.jpg', tila: 'puuttuu' },
    { laji: 'kuva-commons', arvo: 'Peilaamaton.jpg', tila: 'vara' },
    { laji: 'aani-oma', arvo: 'assets/audio/x-lyria.mp3', tila: 'puuttuu' },
  ],
};
const media = [
  { arvo: 'Väärä nimi.jpg', esiintymat: [{ moduuli: 'js/packs/a.js', polku: '/x/tiedosto' }] },
  { arvo: 'Peilaamaton.jpg', esiintymat: [{ moduuli: 'js/linssit/b.js', polku: '/0/kuvaAito/tiedosto' }] },
  { arvo: 'assets/audio/x-lyria.mp3', esiintymat: [{ moduuli: 'js/c.js', polku: '/2/oma' }] },
];

test('ryhmittely: puuttuu, varalla ja repon varapolku erikseen', () => {
  const r = ryhmittele(tarkistus, media);
  assert.deepEqual(r.puuttuu.map((x) => x.arvo), ['Väärä nimi.jpg']);
  assert.deepEqual(r.varalla.map((x) => x.arvo), ['Peilaamaton.jpg']);
  assert.deepEqual(r.varapolku.map((x) => x.arvo), ['assets/audio/x-lyria.mp3']);
});

test('raportti laskee aukoiksi vain puuttuvat ja varalla olevat', () => {
  const md = markdown(tarkistus, ryhmittele(tarkistus, media), { commit: 'abcdef123456', ajettu: '2026-09-28' });
  assert.match(md, /Tarkistettu 12 pelin omaa mediaosoitetta\. Aukkoja \*\*2\*\*/);
  assert.match(md, /### Puuttuu kokonaan: 1/);
  assert.match(md, /### Vain varareitillä: 1/);
  assert.match(md, /### Repon varapolut \(ei aukko\): 1/);
});

test('viikkotyönkulku: vain ajastus ja käsiajo, issue-oikeus, ei PR-porttia', () => {
  const yml = readFileSync(new URL('../.github/workflows/amparin-aukot.yml', import.meta.url), 'utf8');
  assert.match(yml, /schedule:\s*\n\s*#[^\n]*\n[^\n]*\n\s*- cron: '15 5 \* \* 1'/);
  assert.doesNotMatch(yml, /^\s*(push|pull_request):/m);
  assert.match(yml, /issues: write/);
  assert.match(yml, /tarkista-media\.mjs --kaikki/);
});
