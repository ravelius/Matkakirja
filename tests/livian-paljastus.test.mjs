import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LIVIAN_PALJASTUS, livianPaljastus } from '../js/livia.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

/*
 * OHJEET PULUN SUUHUN (omistaja 5.9.2026 ilta): ensimmäisen saapumisen
 * tervetuloa-toivotus ja tehtäväohje luetaan pöllön sähkeestä Livian
 * kahdessa kuplassa, eivätkä pöllön ohjekuplat tule niiden perään.
 */
test('Livian paljastus sisältää tervetuloa-toivotuksen, tehtävän ja kultaisen merkin', () => {
  const [eka, toka] = livianPaljastus({ maahan: 'Kreikkaan', paikassa: 'Ateenassa' });
  assert.match(eka, /Tervetuloa Kreikkaan\./);
  assert.match(eka, /Minä tuuraan\./);
  assert.match(toka, /ratkaise tehtävä Ateenassa/);
  assert.match(toka, /kultaista merkkiä/);
  assert.match(toka, /kultaista merkkiä kartalla\.$/);
  assert.doesNotMatch(toka, /mustetahraa|Aloitetaan/);
});

test('ilman maata sähke jää lyhyeksi ja ohje yleiseksi', () => {
  const [eka, toka] = livianPaljastus();
  assert.doesNotMatch(eka, /Tervetuloa/);
  assert.match(toka, /ratkaise kaupungin tehtävä/);
  assert.deepEqual(LIVIAN_PALJASTUS, livianPaljastus());
});

test('saapumisen kuplat antavat maan ja paikan paljastukselle eivätkä näytä ohjekuplia sen perään', () => {
  const kohta = UI.slice(UI.indexOf('  saapumisenKuplat(kohde) {'), UI.indexOf('  saapumisenOhjekuplat(tervetuloa) {'));
  assert.match(kohta, /naytaLivianPaljastus\(this, \{\s*\n\s*maahan: maa \? maahanMuoto\(maa\) : '',\s*\n\s*paikassa: paikka \?\? '',\s*\n\s*\}\)\) return;/);
  assert.doesNotMatch(kohta, /jalkeen: \(\) => this\.saapumisenOhjekuplat/);
});
