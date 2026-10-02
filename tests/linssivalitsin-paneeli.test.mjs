// Pillerivalikon Linssit-näkymä PANEELI-pohjalla (Natiivi-UI 1.10.2026, 2. erä A): vain ulkoasu, tokeneista.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const CSS = pohjatCss();

test('kokoelmanäkymien kehysmuuttujat paperiarvoiksi puetussa valikossa', () => {
  assert.match(CSS, /\.paavalikko\.tk-paneeli--paikallaan \{\n {2}--ink-light: var\(--tk-muste\);\n {2}--accent: var\(--tk-korostus\);/);
});

test('Linssit: rivi 38, päällä kapiteelina, valittu pergamentilla ja toimintoreunuksella, väliotsikko viivalla', () => {
  assert.match(CSS, /#pilleri-linssit-nakyma \.kokoelma-rivi \{[\s\S]*?min-height: var\(--tk-nappi-korkeus\);/);
  assert.match(CSS, /#pilleri-linssit-nakyma \.kokoelma-rivi\.aktiivinen::after \{[\s\S]*?color: var\(--tk-korostus\);/);
  assert.match(CSS, /#pilleri-linssit-nakyma \.kokoelma-rivi\.esikatselu \{[\s\S]*?background: var\(--tk-pergamentti\);/);
  assert.match(CSS, /#pilleri-linssit-nakyma \.kokoelma-otsikko \{[\s\S]*?border-bottom: 1px solid var\(--tk-reunus\);/);
  assert.match(CSS, /#pilleri-linssit-nakyma \.kokoelma-esikatselu-selite \{[\s\S]*?font-style: italic;/);
});

test('kapea sarake (esikatselu auki): PÄÄLLÄ nimen alle omalle rivilleen', () => {
  assert.match(CSS, /\.kokoelma-esikatselu-auki \.kokoelma-rivi\.aktiivinen \{\n {2}flex-wrap: wrap;/);
  assert.match(CSS, /\.kokoelma-esikatselu-auki \.kokoelma-rivi\.aktiivinen::after \{\n {2}flex-basis: 100%;/);
});
