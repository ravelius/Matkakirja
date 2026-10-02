// Periaatteet-ikkuna ("Oppiminen on hauskaa") KORTTI-pohjalla peruttavan lipun takana (Päätoimittaja 1.10.2026).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

test('naytaPeriaatteet pukee kortin ennen avausta: kärki korostus, lähderivit apuri', () => {
  const alku = UI.indexOf('\n  naytaPeriaatteet() {');
  const runko = UI.slice(alku, UI.indexOf('\n  }\n', alku));
  const pue = runko.indexOf('puePohjaKortiksi(kortti, { otsikko, sulje })');
  assert.ok(runko.indexOf('if (korttiPohjalla())') > 0 && pue > 0 && pue < runko.indexOf('lappu.showModal()'));
  assert.match(runko, /'periaate-liput'\) \? 'tk-apuri'/);
  assert.match(runko, /'kärki'\) \? ' tk-leipa--korostus'/);
  assert.match(runko, /oikeudet\.className = 'tk-apuri'/);
});
