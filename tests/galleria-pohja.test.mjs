/*
 * GALLERIA-POHJA WEBISSÄ (tyylikirja.json pohjat.GALLERIA; omistaja 2.10.2026 klo 15.5x, Natiivi-UI määritteli).
 * Julisteet on ensimmäinen käyttäjä; vanha .julistegalleria-pinta on poissa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

test('GALLERIA-pohja: ruudukko tyylikirjan galleria-mitoilla, ✕ OHJAUSNAPPINA, lukossa kehys, vain --tk-tokenit', () => {
  const css = lue('../css/pohjat/galleria.css');
  assert.match(css, /grid-template-columns: repeat\(auto-fill, minmax\(var\(--tk-galleria-sarake\), 1fr\)\);/);
  assert.match(css, /gap: var\(--tk-galleria-vali\);/);
  assert.match(css, /repeat\(3, minmax\(0, 1fr\)\)/, 'puhelimessa pystyssä 3 saraketta');
  assert.match(css, /width: var\(--tk-nappi-ohjaus\);[\s\S]*?border-radius: var\(--tk-kulma-nappi\);/);
  assert.match(css, /\.tk-kokoelma__yla \{\n\s*position: sticky;/);
  assert.match(css, /aspect-ratio: var\(--tk-kokoelma-suhde, 2 \/ 3\);/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgba?\(/i, 'ei värivakioita');
  const tk = JSON.parse(lue('../tyylikirja/tyylikirja.json'));
  assert.equal(tk.mitat.galleria.sarake, 92);
  assert.ok(tk.pohjat.GALLERIA.kayttajat.includes('Julisteet'));
});

test('GALLERIA-tyyli on pohjien listassa kaikissa neljässä paikassa', () => {
  assert.match(lue('../js/pohjat/tyylit.js'), /'css\/pohjat\/galleria\.css',/);
  assert.match(lue('../sw.js'), /'\.\/css\/pohjat\/galleria\.css',/);
  assert.match(lue('../tools/build-standalone.mjs'), /'css\/pohjat\/galleria\.css',/);
  assert.match(lue('../tyylikirja.html'), /href="css\/pohjat\/galleria\.css"/);
});

test('luoPohjaGalleria: kapiteeli + laskuri, osiot, lukossa ilman kuvaa ja nimeä, napautus avaa kuvanäkymän osion kuvista', () => {
  const js = lue('../js/pohjat/pohjat.js');
  assert.match(js, /export function luoPohjaGalleria\(data, \{ teema = 'paperi'/);
  assert.match(js, /if \(ruutu\.lukossa\) \{[\s\S]{0,300}tk-kokoelma__vedos--lukossa[\s\S]{0,200}continue;/);
  assert.match(js, /const avoimet = \(osio\.ruudut \?\? \[\]\)\.filter\(\(r\) => !r\.lukossa\);/);
  assert.match(js, /pohja\.avaaKuva\(avoimet, kohdalla\);/);
  assert.match(js, /function galleriaKuvanakyma\(kuvat, kohdalla, suljettu\) \{\n\s*[^\n]*\n\s*const pohja = luoPohjaKuvanakyma\(/);
  // ✕ on viivakuvake, ei tekstimerkki.
  assert.match(js, /polku\.setAttribute\('d', 'M6 6 18 18M18 6 6 18'\);/);
});

test('Julisteet käyttää GALLERIA-pohjaa; vanha julistegalleria-pinta on poissa', () => {
  const ui = lue('../js/ui.js');
  assert.match(ui, /const pohja = luoPohjaGalleria\(data, \{/);
  assert.match(ui, /if \(!voitetut\.has\(cityId\)\) return \{ lukossa: true \};/);
  assert.doesNotMatch(ui, /html\('div', 'julistegalleria/);
  assert.doesNotMatch(lue('../css/styles.css'), /^\.julistegalleria/m);
});
