// Cupolan ääni (js/linssit/cupola-aani.js): puhtaat osat ilman selainta —
// tason laskenta, väistön tunnistus ja se, ettei ikkunasta poistuminen
// ennen käynnistystä tee mitään. Ei radiota (omistaja 3.10.2026 klo 06.3x).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const cupola = await import('../js/linssit/cupola-aani.js');
const {
  cupolanTaso, onVaistossa, asetaCupola, puraCupola, cupolaAaniTila, CUPOLA_KERROKSET, CUPOLA_HUMINA,
} = cupola;

const lahella = (a, b) => Math.abs(a - b) < 1e-12;

test('taso: voima × taustaäänten liuku × väistö', () => {
  assert.equal(CUPOLA_KERROKSET.humina.voima, 0.9);
  assert.deepEqual(Object.keys(CUPOLA_KERROKSET), ['humina']);   // ei radiota
  assert.ok(lahella(cupolanTaso('humina', { tausta: 1 }), 0.9));
  assert.ok(lahella(cupolanTaso('humina', { tausta: 0.5 }), 0.45));
  // Puheen väistö: humina × 0,7.
  assert.ok(lahella(cupolanTaso('humina', { tausta: 1, vaistossa: true }), 0.9 * 0.7));
});

test('taso: liuku katkaistaan ykköseen, taustaäänet pois → 0', () => {
  assert.ok(lahella(cupolanTaso('humina', { tausta: 3 }), 0.9));
  assert.equal(cupolanTaso('humina', { tausta: -1 }), 0);
  assert.equal(cupolanTaso('humina', { tausta: NaN }), 0);
  assert.equal(cupolanTaso('humina', { paalla: false, tausta: 1 }), 0);
  assert.equal(cupolanTaso('radio', { tausta: 1 }), 0);   // radiokerrosta ei enää ole
  assert.equal(cupolanTaso('tuntematon', { tausta: 1 }), 0);
});

test('ei radiota eikä NASA-ääniä (omistaja 3.10.2026 klo 06.3x: "Pidä pelkkä generoitu kohina")', () => {
  assert.equal(cupola.CUPOLA_RADIO, undefined);
  assert.equal(cupola.radionAloituskohta, undefined);
  const lahde = readFileSync(new URL('../js/linssit/cupola-aani.js', import.meta.url), 'utf8');
  assert.doesNotMatch(lahde, /createMediaElementSource|eva38/);
  const lahteet = readFileSync(new URL('../js/lahteet.js', import.meta.url), 'utf8');
  assert.doesNotMatch(lahteet, /EVA 38|Life On Station/);
});

test('väistö: puhe väistää, linssin oma hiljennys ei', () => {
  assert.equal(onVaistossa(1, { syyt: [], pohja: 1 }), false);
  assert.equal(onVaistossa(0.3, { syyt: [], pohja: 0.3 }), true);
  assert.equal(onVaistossa(0.5, { syyt: ['pollo'], pohja: 1 }), true);
  // Linssi pyysi hiljennyksen itse: pohja ratkaisee.
  assert.equal(onVaistossa(0.5, { syyt: ['linssi'], pohja: 1 }), false);
  assert.equal(onVaistossa(0.3, { syyt: ['linssi'], pohja: 0.3 }), true);
  // Vanha kutsumuoto ilman tietoja.
  assert.equal(onVaistossa(1), false);
});

test('asetaCupola(false) ja puraCupola ennen käynnistystä eivät tee mitään', () => {
  const ennen = cupolaAaniTila();
  assert.equal(ennen.paalla, false);
  assert.doesNotThrow(() => asetaCupola(false));
  assert.doesNotThrow(() => puraCupola());
  const jalkeen = cupolaAaniTila();
  assert.deepEqual(jalkeen, ennen);
  assert.equal(jalkeen.humina.soi, false);
  assert.equal(jalkeen.radio, undefined);
});

test('kytkentä: versioidut osoitteet, näkymä kutsuu, SHELL tuntee moduulin', () => {
  assert.match(CUPOLA_HUMINA, /\/aanet\/cupola\/v2\/cupola-humina-gen-90s\.wav$/);
  const nakyma = readFileSync(new URL('../js/linssit/iss-kyyti-nakyma.js', import.meta.url), 'utf8');
  assert.match(nakyma, /from '\.\/cupola-aani\.js'/);
  assert.match(nakyma, /asetaCupola\(kehysNakyy && kyyti\.kyydissa\)/);
  assert.match(nakyma, /puraCupola\(\)/);
  const lahde = readFileSync(new URL('../js/linssit/cupola-aani.js', import.meta.url), 'utf8');
  // Ei omaa AudioContextia: pelin yhteinen konteksti.
  assert.ok(!/new\s+(webkit)?AudioContext/.test(lahde), 'Cupola loi oman AudioContextin');
  assert.match(lahde, /lahde\.loop = true/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/linssit/cupola-aani.js'"));
});
