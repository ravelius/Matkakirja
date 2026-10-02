// Visa KORTTI-pohjalla, versio B (omistaja 1.10.2026): luokat kerran, tilavärit tokeneista, poikkeukset kirjattu.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const UI = lue('../js/ui.js');
const CSS = pohjatCss();
const TK = JSON.parse(lue('../tyylikirja/tyylikirja.json'));

test('ui.js puee #quiz-dialogin heti sen löydyttyä, lipun takana', () => {
  assert.match(UI, /import \{ visaPohjalla, pueVisaKortiksi \} from '\.\/visa-pohja\.js';/);
  assert.match(UI, /this\.quizDialog = document\.getElementById\('quiz-dialog'\);\n.*\n {4}if \(visaPohjalla\(\)\) pueVisaKortiksi\(this\.quizDialog\);/);
  assert.match(lue('../js/visa-pohja.js'), /if \(valinta === 'vanha'\) return false;/);
});

test('oikein ja väärin tilaväreillä, tilavärit ja poikkeukset tyylikirjassa', () => {
  assert.equal(TK.tila.onnistuminen, '#2f6b3f');
  assert.equal(TK.tila.virhe, '#b03a2b');
  assert.match(TK.pohjat._poikkeukset['KORTTI/visa'], /tiimalasi/);
  assert.match(TK.pohjat._poikkeukset['KORTTI/visa'], /80 p/);
  assert.match(CSS, /\.tk-visa \.quiz-option\.correct \{[\s\S]*?var\(--tk-tila-onnistuminen\)/);
  assert.match(CSS, /\.tk-visa \.quiz-option\.wrong \{[\s\S]*?var\(--tk-tila-virhe\)/);
  // Vastaukset allekkain (pohjan pystyrivi), Jatka ensisijaisena.
  assert.match(CSS, /\.tk-visa \.quiz-options \{ grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(CSS, /\.tk-visa menu button\.primary, \.tk-visa \.quiz-aloita \{[\s\S]*?var\(--tk-toiminto\)/);
});
