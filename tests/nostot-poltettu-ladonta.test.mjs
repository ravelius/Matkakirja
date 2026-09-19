/*
 * POLTETUT EIVÄT PIIRRY ELÄVINÄ SAAPUESSA (erä J 19.9.2026; Sonnet 1:n
 * kierros 12, Tanska; raportti docs/raportit/viesti-fable-lehtinimiot-20260919.md).
 *
 * Saapumisen ensimmäinen ladonta ajettiin ennen kuin nostotason luettelo
 * oli perillä tai kohdemaa asetettu, jolloin jokainen poltettu nosto
 * piirtyi elävänä laatan musteen päälle, eikä levitys väistänyt
 * mustetta myöhemminkään (ankkurit talletettuina). Vartio: lauta latoo
 * uudelleen maan vaihtuessa ja luettelon saapuessa, ja kerros tyhjentää
 * ankkurivaraston, kun poltettujen joukko muuttuu. Selaintodiste:
 * raportin mittaus (Chromium 390 × 844, Kööpenhamina).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
const nostot = readFileSync(new URL('../js/pallolauta/nostot.js', import.meta.url), 'utf8');

test('lauta latoo uudelleen, kun kohdemaa vaihtuu ja kun pyramidin luettelo saapuu', () => {
  assert.match(lauta, /const maaVaihtui = asetaVaritasonMaa\(korostusIso\);\s*[\s\S]{0,900}if \(maaVaihtui\) setTimeout\(\(\) => \{ if \(!kuori\.hidden\) ladoLevossa\(\); \}, 0\);/);
  assert.match(lauta, /haePyramidinLuettelo\(\)\s*\?\.then\?\.\(\(\) => setTimeout\(\(\) => \{ if \(!kuori\.hidden\) ladoLevossa\(\); \}, 0\)\)/);
});

test('kerros tyhjentää ankkurit, kun poltettujen joukko muuttuu', () => {
  assert.match(nostot, /const poltettujenJoukko = nakyvat\.filter\(\(r\) => r\.poltettu\)/);
  assert.match(nostot, /if \(viimeisinPoltettujenJoukko !== null\) ankkurivarasto\.tyhjenna\(\);/);
  // Tyhjennys ennen lukittujen asetusta ja levitystä.
  assert.ok(nostot.indexOf('ankkurivarasto.tyhjenna();') < nostot.indexOf('const lukitusPaalla = lukitutAnkkuritSallittu();'));
});
