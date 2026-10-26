// UI-pohjien tyylitiedostot (Natiivi-UI 2.10.2026): kiinteä latauslista samana kaikkialla, ei vanhaa yhtä tiedostoa.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { POHJAT_TYYLIT } from '../js/pohjat/tyylit.js';

const lue = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const jarjestys = (teksti, kaava) => [...teksti.matchAll(kaava)].map((m) => m[1]);

test('järjestys: pohjat (css/pohjat/) ennen pintoja (css/pohjat/pinnat/), tiedostot olemassa, vanha tiedosto poissa', () => {
  const ensimmainenPinta = POHJAT_TYYLIT.findIndex((p) => p.includes('/pinnat/'));
  assert.ok(ensimmainenPinta > 0);
  assert.ok(POHJAT_TYYLIT.slice(ensimmainenPinta).every((p) => p.includes('/pinnat/')), 'pinnat listan lopussa');
  for (const p of POHJAT_TYYLIT) assert.ok(existsSync(new URL(`../${p}`, import.meta.url)), p);
  assert.ok(!existsSync(new URL('../css/pohjat.css', import.meta.url)), 'css/pohjat.css on jaettu');
});

test('sama lista sw.js:ssä, yhden tiedoston versiossa ja tyylikirjasivulla', () => {
  const kaava = /['"](?:\.\/)?(css\/pohjat\/[^'"]+\.css)['"]/g;
  assert.deepEqual(jarjestys(lue('sw.js'), kaava), POHJAT_TYYLIT);
  assert.deepEqual(jarjestys(lue('tools/build-standalone.mjs'), kaava), POHJAT_TYYLIT);
  assert.deepEqual(jarjestys(lue('tyylikirja.html'), kaava), POHJAT_TYYLIT);
});

test('lataaja käyttää listaa, ja dialogien mittaus odottaa kaikkia pohjien tyylejä', () => {
  assert.match(lue('js/pohjat/pohjat.js'), /POHJAT_TYYLIT\.forEach\(\(polku, i\) => \{/);
  assert.match(lue('js/ui.js'), /document\.querySelectorAll\('link\[data-pohjat\]'\)\]\.find\(\(l\) => !l\.sheet\)/);
});
