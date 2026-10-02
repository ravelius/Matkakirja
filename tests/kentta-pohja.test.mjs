// KENTTÄ-pohjaosa (omistaja 1.10.2026: "lomake ok") ja palautelomake sillä: tokenit, luokat ja js:n luokat säilyvät.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const UI = lue('../js/ui.js');
const CSS = pohjatCss();

test('tk-kentta vain kenttätokeneista; alue 2 × korkeus, vihje kursiivina, fokus toimintovärillä', () => {
  assert.match(CSS, /\.tk-kentta, \.tk-kortti \.tk-kentta \{[\s\S]*?min-height: var\(--tk-kentta-korkeus\);[\s\S]*?border-radius: var\(--tk-kentta-kulma\);[\s\S]*?background: var\(--tk-kentta-pinta\);/);
  assert.match(CSS, /textarea\.tk-kentta[^{]*\{ min-height: var\(--tk-kentta-alue\);/);
  assert.match(CSS, /\.tk-kentta::placeholder \{ color: var\(--tk-kentta-vihje\); font-style: italic;/);
  assert.match(lue('../css/styles.css'), /--tk-kentta-korkeus: 44px;/);
});

test('palautelomake puetaan lipun takana, ja js:n luokat (.sahke-nimi, .periaate-laheta) säilyvät', () => {
  assert.match(UI, /puePohjaKortiksi\(kortti, \{ otsikko, sulje \}\);\n {6}pueLomakePohjalle\(kortti\.querySelector\('\.periaate-lomake'\) \?\? kortti\);/);
  const alku = UI.indexOf('function pueLomakePohjalle(');
  const runko = UI.slice(alku, UI.indexOf('\n}\n', alku));
  assert.match(runko, /classList\.remove\('periaate-kentta'\)/);
  assert.match(runko, /classList\.remove\('primary', 'ghost'\)/);
  assert.ok(!/className =/.test(runko), 'luokat lisätään, ei korvata (js nojaa vanhoihin)');
});
