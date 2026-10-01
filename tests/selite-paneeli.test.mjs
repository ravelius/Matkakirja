// Karttaselite PANEELI-pohjalla (Päätoimittaja 1.10.2026): vain ulkoasu; välilehdet, ✕, peukalolevy ja valot ennallaan.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const SELITE = lue('../js/karttaselite.js');
const CSS = lue('../css/pohjat.css');

test('selite puetaan lipun takana yhdellä luokalla; toiminnan osat pysyvät', () => {
  assert.match(SELITE, /if \(paneeliPohjalla\(\)\) \{\n {4}pohjatLataaTyyli\(\);\n {4}levy\.classList\.add\('tk-paneeli-selite', 'tk-teema-paperi'\);/);
  for (const osa of ["'karttaselite-valilehti', 'Nostot'", "'karttaselite-valilehti', 'Maakunnat'", "'karttaselite-sulje', '✕'", 'luoPeukalolevy']) {
    assert.ok(SELITE.includes(osa), `${osa} säilyy`);
  }
});

test('välilehdet segmenttirivinä, rivit 38 pt, pinta pohjan tokeneista', () => {
  assert.match(CSS, /\.tk-paneeli-selite \.karttaselite-valilehdet \{[\s\S]*?border-radius: var\(--tk-kulma-nappi\);/);
  assert.match(CSS, /\.tk-paneeli-selite \.karttaselite-rivi \{[\s\S]*?min-height: var\(--tk-nappi-korkeus\);/);
  assert.match(CSS, /\.karttaselite-levy\.tk-paneeli-selite \{[\s\S]*?background: var\(--tk-pinta\);/);
});
