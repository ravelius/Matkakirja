// PULU-pohja, osa CHAT (Päätoimittaja 2.10.2026): satelliitin minipulu ja kysymyskortti yhteiseksi pohjaksi, ei kahta kopiota.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const PULU = lue('../js/pohjat/pulu.js');

test('yksi toteutus: satelliitti käyttää pohjaa omalla etuliitteellään, luokat ja DOM ennallaan', () => {
  const sat = lue('../js/linssit/satelliitti.js');
  assert.match(sat, /luoPohjaPulu\(\{ luokka: 'satelliitti'/);
  assert.doesNotMatch(sat, /luoMinipulu|polloUlkoinenKysymys\(/, 'satelliitissa ei saa olla toista kopiota');
  assert.match(PULU, /export function luoPohjaPulu\(\{ luokka = 'tk', teema = 'paperi', aihe = '', kysymykset = \[\] \} = \{\}\)/);
  assert.match(PULU, /html\('div', `\$\{L\}-pulukortti`\)/);
  assert.doesNotMatch(PULU.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''), /'satelliitti-/);
});

test('uudet pinnat: tokenityyli, isännän teema, ei ✕:ää vaan ohinapautus (tyylikirja PULU)', () => {
  const css = lue('../css/pohjat/pulu.css');
  assert.doesNotMatch(css, /#[0-9a-f]{3,6}\b|rgba?\(|\d+ms/i);
  assert.match(css, /\.tk-pulu-sulku \{ display: none; \}/);
  assert.match(css, /font-size: var\(--tk-koko-leipa\);\s*\/\* iOS ei zoomaa/);
  assert.match(PULU, /if \(L === 'tk'\) \{ pohjatLataaTyyli\(\); pulukulma\.classList\.add\(`tk-teema-\$\{teema\}`\); \}/);
  assert.match(PULU, /if \(L === 'tk'\) document\.addEventListener\('pointerdown', ohi, true\);/);
  assert.match(PULU, /document\.removeEventListener\('pointerdown', ohi, true\);/);
  const pohja = JSON.parse(lue('../tyylikirja/tyylikirja.json')).pohjat.PULU;
  assert.deepEqual(pohja.teemat, ['paperi', 'lasi', 'lasi-avaruus']);
  assert.match(pohjatCss(), /\.tk-pulukortti \{/);
});
