// Pillerivalikko PANEELI-pohjalla (Natiivi-UI 1.10.2026; natiivin järjestys, omistaja 29.9.2026): kytkennät.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const MODUULI = lue('../js/pilleri-paneeli.js');
const MAIN = lue('../js/main.js');
const UI = lue('../js/ui.js');
const CSS = pohjatCss();

test('main.js puee valikon UI:n luonnin jälkeen lipun takana, napit kohdistuvat nykyiseen UI:hin', () => {
  assert.match(MAIN, /import \{ paneeliPohjalla, puePilleriPaneeliksi \} from '\.\/pilleri-paneeli\.js'/);
  const mount = MAIN.indexOf('ui.mount();');
  const pue = MAIN.indexOf('if (paneeliPohjalla()) puePilleriPaneeliksi(() => ui);');
  assert.ok(mount > 0 && pue > mount);
  assert.match(MODUULI, /if \(valinta === 'vanha'\) return false;/);
});

test('järjestys: ÄÄNET vierekkäin → [Matka | Aarteet | Linssit] → [Uusi peli | Asetukset] → versio', () => {
  assert.match(MODUULI, /paa\.prepend\(aanetOtsikko, kertoja, nav, erotin, toiminnot\);/);
  assert.match(MODUULI, /nav\.append\(matkaNappi, puePilleriNappi\(aarteet, 'Aarteet'[\s\S]*?puePilleriNappi\(linssit, 'Linssit'/);
  assert.match(MODUULI, /toiminnot\.append\(uusiPeli, asetuksetNappi\);/);
  // Tilarivin luokka säilyy: js/main.js päivittää PÄÄLLÄ/POIS sen kautta.
  assert.match(MODUULI, /querySelector\('\.aanikytkin-tila'\)\?\.classList\.add/);
});

test('alinäkymät Matka ja Asetukset, sulkupoikkeukset ja paikka', () => {
  assert.match(UI, /matka: document\.getElementById\('pilleri-matka-nakyma'\)/);
  assert.match(UI, /asetukset: document\.getElementById\('pilleri-asetukset-nakyma'\)/);
  assert.match(MAIN, /!nappi\.matches\('\[data-paneeli-sulje\]'\)/);
  assert.match(MAIN, /\.pilleri-alanakyma, \[data-paneeli-pysy\]/);
  assert.match(MODUULI, /--tk-paneeli-yla/);
  assert.match(CSS, /\.paavalikko\.tk-paneeli \.tk-paneeli-rivi--kytkin\[aria-checked="true"\]/);
});

test('valikko V2 20.2x: ei väliviivoja luettelossa (alin jää), tasorivi ja päivärivi ÄÄNET-laatan pohjalla, ei ×:ää', () => {
  const css = readFileSync(new URL('../css/pohjat/pinnat/pillerivalikko.css', import.meta.url), 'utf8');
  const js = readFileSync(new URL('../js/pilleri-paneeli.js', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /ryhma--luettelo \.tk-paneeli-rivi:not\(\[hidden\]\) ~ \.tk-paneeli-rivi:not\(\[hidden\]\)/);
  assert.match(css, /\.valikko-tasolaatta \{[\s\S]*?border-radius: var\(--tk-kulma-nappi\);\n\s*background: var\(--tk-pergamentti\);/);
  // Laatan pohja on sama kuin ÄÄNET-kytkimen päällä-täyttö (ei uutta tyyliä).
  assert.match(css, /tk-paneeli-rivi--kytkin\[aria-checked="true"\] \{ border-color: transparent; background: var\(--tk-pergamentti\); \}/);
  assert.match(js, /'tk-paneeli__ryhma tk-paneeli__ryhma--luettelo pilleri-pikanapit valikko-tasolaatta'/);
  // Alin viiva (erotin Uusi peli -rivin yläpuolella) jää.
  assert.match(js, /\.\.\.pilleriRyhmaOtsikko\('Peli'\), peliRyhma, erotin\);/);
});
