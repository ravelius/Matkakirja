import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LIVIAN_LUENNAN_PAIKKA, LIVIAN_PALJASTUS, livianPaljastus,
} from '../js/livia.js';
import { maahanMuoto, paikkaaMuoto } from '../js/ui-apurit.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const LIVIA = readFileSync(new URL('../js/livia.js', import.meta.url), 'utf8');

/*
 * PULUN UUSI RYTMI ATEENASSA (omistaja 7.9.2026): kaksi kuplaa ennen
 * isoisän luentaa, luenta, ja vasta sen jälkeen ohje kaupungin
 * napauttamisesta. Repliikit ovat omistajan sanatarkkoja.
 */
test('paljastus on kolme kuplaa omistajan sanoin', () => {
  const kuplat = livianPaljastus({ paikkaan: 'Ateenaan', paikkaa: 'Ateenaa' });
  assert.deepEqual(kuplat, [
    'Kääk, apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa.',
    'Tervetuloa Ateenaan. Kuunnellaan, mitä isoisä on kirjoittanut tästä paikasta.',
    'Kantsuu klikata Ateenaa kartalta, jos meinaat löytää aarteen.',
  ]);
  // Vanhat sanat eivät saa jäädä elämään minkään kuplan sisään.
  const kaikki = kuplat.join(' ');
  assert.doesNotMatch(kaikki, /Sähke pöllöltä|Melkein joka ikisen|kultaista merkkiä/);
});

test('kaupungin nimi tulee taivutusapureista', () => {
  assert.equal(maahanMuoto('Ateena'), 'Ateenaan');
  assert.equal(paikkaaMuoto('Ateena'), 'Ateenaa');
  assert.equal(paikkaaMuoto('Sofia'), 'Sofiaa');
  assert.equal(paikkaaMuoto('Wien'), 'Wieniä');
  assert.equal(paikkaaMuoto('Lontoo'), 'Lontoota');
  assert.equal(paikkaaMuoto(''), '');
  const kuplat = livianPaljastus({
    paikkaan: maahanMuoto('Sofia'), paikkaa: paikkaaMuoto('Sofia'),
  });
  assert.match(kuplat[1], /^Tervetuloa Sofiaan\./);
  assert.match(kuplat[2], /^Kantsuu klikata Sofiaa kartalta/);
});

test('ilman nimeä toivotus ja ohje jäävät yleisiksi', () => {
  const [, toka, kolmas] = livianPaljastus();
  assert.match(toka, /^Tervetuloa\. Kuunnellaan/);
  assert.match(kolmas, /^Kantsuu klikata kaupunkia kartalta/);
  assert.deepEqual(LIVIAN_PALJASTUS, livianPaljastus());
});

/*
 * LUENTA KUPLIEN VÄLISSÄ. Kaksi ensimmäistä kuplaa tulevat ennen
 * isoisän luentaa, kolmas vasta sen jälkeen — pulu on hiljaa koko
 * luennan ajan.
 */
test('sarja pysähtyy luennan ajaksi ja jatkaa vasta sen loputtua', () => {
  assert.equal(LIVIAN_LUENNAN_PAIKKA, 2);
  assert.match(LIVIA, /import \{ luennanLoppuun \} from '\.\/luenta\.js';/);
  // Kupla 2 saa lukuaikansa, sitten luenta päästetään liikkeelle —
  // ja NAPAUTUS kulkee samaa tietä, ei ohi luennan.
  assert.match(LIVIA, /const jatka = i === LIVIAN_LUENNAN_PAIKKA - 1\s*\n\s*\? \(\) => odotaLuenta\(ui, cityId, seuraava\)\s*\n\s*: seuraava;/);
  assert.match(LIVIA, /polloSaapumiskupla\(teksti, \{ kuittaus: jatka \}\)/);
  assert.match(LIVIA, /paljastusAjastin = setTimeout\(jatka, lukuaika\(teksti\)\);/);
  // Odotus kuuntelee luennan loppua; ilman luentaa varaviive.
  assert.match(LIVIA, /function odotaLuenta\(ui, cityId, jatka\) \{[\s\S]{0,700}const luenta = luennanLoppuun\(ui\);[\s\S]{0,200}setTimeout\(jatka, LUENNAN_VARAVIIVE\)/);
  // Kupla, joka ei mahtunut ruudulle, ei saa jättää luentaa jumiin.
  assert.match(LIVIA, /pysaytaLivianAani\(ui\);\s*\n\s*vapautaLuenta\(ui\);/);
});

test('ui lykkää saapumisen luennan pulun kuplien taakse', () => {
  // Lippu nostetaan ennen saapumisen renderiä, koska luenta lähtee siitä.
  assert.match(UI, /this\.luennanLykkays = livianPaljastusOdottaa\(this\);\s*\n\s*this\.render\(\);/);
  // Luenta ei ala lykkäyksen aikana, mutta tehtävä on tallessa.
  const kohta = UI.slice(UI.indexOf('  asetaMerkinnanLuenta(tehtava'), UI.indexOf('  naytaMerkinnanKaiutin(onAanite)'));
  assert.match(kohta, /if \(this\.luennanLykkays\) \{\s*\n\s*stopDiaryVoice\(this\);\s*\n\s*return;\s*\n\s*\}/);
  assert.match(kohta, /aloitaLykattyLuenta\(\) \{\s*\n\s*this\.luennanLykkays = false;/);
});

test('saapumisen kuplat antavat kaupungin taivutukset paljastukselle', () => {
  const kohta = UI.slice(UI.indexOf('  saapumisenKuplat(kohde) {'), UI.indexOf('  saapumisenOhjekuplat(tervetuloa) {'));
  assert.match(kohta, /naytaLivianPaljastus\(this, \{\s*\n\s*paikkaan: kohde\?\.name \? maahanMuoto\(kohde\.name\) : '',\s*\n\s*paikkaa: kohde\?\.name \? paikkaaMuoto\(kohde\.name\) : '',\s*\n\s*\}\)\) return;/);
  // Paljastuksen jälkeen ei ohjekuplia; jos se ei ala, luenta vapautuu.
  assert.doesNotMatch(kohta, /jalkeen: \(\) => this\.saapumisenOhjekuplat/);
  assert.match(kohta, /this\.aloitaLykattyLuenta\(\);\s*\n\s*this\.saapumisenOhjekuplat\(tervetuloa\);/);
});
