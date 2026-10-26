// Korttivahdit tuntevat NOSTOKORTTI-pohjan kortin (kohdekortti pysyvästi pohjalla 2.10.2026, Päätoimittaja):
// pallon napautus kortin ollessa auki sulkee kortin eikä avaa uutta nostoa, kuten vanhalla .fokuskohde-popupilla.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { KORTTIVALITSIN } from '../js/kartta-liike.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const POHJA = '.tk-nostokortti:not(.tk-piilossa)';

test('kaikki neljä korttivahtia tuntevat avoimen pohjakortin', () => {
  assert.ok(KORTTIVALITSIN.includes(POHJA), 'kartta-liike: pulu lentäisi kortin ollessa auki');
  const lauta = lue('../js/pallolauta/lauta.js');
  const alku = lauta.indexOf('const KORTTIVALITSIN');
  assert.ok(lauta.slice(alku, lauta.indexOf(';', alku)).includes(POHJA), 'pallolauta: sulkeva napautus avaisi uuden noston');
  assert.ok(lue('../js/kartta.js').includes(`.fokus-maataulu, .fokuskohde-popup, ${POHJA}, .aikajana-ilmio`), 'kartta: ele kortilta liikuttaisi karttaa');
  assert.ok(lue('../js/pollo.js').includes(`'.pollo-paneeli, .pollo-nappi, .fokuskohde-popup, ${POHJA}, .pollo-kuplapino-kehys'`),
    'pollo: kortin Kysy-napautus sulkisi chatin');
});

test('kohdekortti on pohjan .tk-nostokortti, ja suljettu pohja saa tk-piilossa-luokan', () => {
  const pohjat = lue('../js/pohjat/pohjat.js');
  assert.match(pohjat, /pohjaSolmu\('section', `tk-nostokortti tk-teema-\$\{teema \?\? d\.teema\} tk-piilossa`\)/);
  assert.match(pohjat, /sulje\(\) \{\s*if \(!auki\) return;\s*auki = false;\s*el\.classList\.add\('tk-piilossa'\);/);
  assert.match(lue('../js/fokuskohteet.js'), /const pohja = luoPohjaNostokortti\(\{/);
});

test('korttivahti lukee kortin tilan ennen kortin omaa ohinapautusta (sama vaihe, rekisteröinti ensin)', () => {
  // Molemmat ovat documentin kaappausvaiheessa; vahti rekisteröidään pallon avautuessa, kortin ohinapautus vasta
  // kortin avautuessa (setTimeout 0), joten vahti näkee kortin auki ennen kuin sulku poistaa sen.
  assert.match(lue('../js/pallolauta/lauta.js'), /document\.addEventListener\('pointerdown', korttivahti, true\);/);
  assert.match(lue('../js/pohjat/pohjat.js'), /setTimeout\(\(\) => document\.addEventListener\('pointerdown', ohi, true\), 0\)/);
});
