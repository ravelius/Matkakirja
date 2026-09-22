/*
 * SULAVUUSKATSAUS 22.9.2026 KOHTA 7: laattamateriaalin variantit (kerma/ei,
 * läpinäkyvä/opaakki, astronautti) esikäännetään renderer.compileAsyncilla
 * ensimmäisessä suoritassa, eivät ensimmäisen laatan kehyksellä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const laatat = readFileSync(new URL('../js/pallolaatat.js', import.meta.url), 'utf8');

test('esikäännös: molemmat transparent-variantit, kerma kun shader, näytteet pidetään elossa', () => {
  const lohko = laatat.slice(laatat.indexOf('const esikaannaOhjelmat = '), laatat.indexOf('function suorita(kehys)'));
  assert.match(lohko, /kokeet\.has\('eiesikaannos'\)/, 'koelippu ohittaa');
  assert.match(lohko, /typeof renderer\?\.compileAsync !== 'function'/, 'vanha three ilman compileAsyncia ohitetaan');
  assert.match(lohko, /for \(const kerma of \(kermaShader \? \[true, false\] : \[false\]\)\)/);
  assert.match(lohko, /for \(const transparent of \[true, false\]\)/);
  assert.match(lohko, /asennaKermaShader\(materiaali, \{\n\s*jaettu: kermanJaetut, tarkka: kokeet\.has\('kermapow'\),/);
  assert.match(lohko, /renderer\.compileAsync\(scene, kamera\)/);
  // Näytemeshit pois scenestä, materiaaleja ei pureta (ohjelma vapautuisi).
  assert.match(lohko, /for \(const n of naytteet\) juuri\.remove\(n\);/);
  assert.doesNotMatch(lohko, /material\.dispose|materiaali\.dispose/);
  assert.match(lohko, /esikaannoksenNaytteet = naytteet;/);
  // Kutsutaan heti kun kerrokset tiedetään.
  assert.match(laatat, /if \(!kerrokset\) return luovuta\('pallon sarja ja pyramidi eri versiota'\);\n\s*esikaannaOhjelmat\(luokat\);/);
});
