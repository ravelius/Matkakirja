// Cupolan ääni (js/linssit/cupola-aani.js): puhtaat osat ilman selainta —
// tason laskenta, radion satunnainen aloituskohta, väistön tunnistus ja
// se, ettei ikkunasta poistuminen ennen käynnistystä tee mitään.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const {
  cupolanTaso, radionAloituskohta, onVaistossa, asetaCupola, puraCupola, cupolaAaniTila,
  CUPOLA_KERROKSET, RADION_KESTO_S, CUPOLA_HUMINA, CUPOLA_RADIO,
} = await import('../js/linssit/cupola-aani.js');

const lahella = (a, b) => Math.abs(a - b) < 1e-12;

test('taso: voima × taustaäänten liuku × väistö', () => {
  assert.equal(CUPOLA_KERROKSET.humina.voima, 0.9);
  assert.equal(CUPOLA_KERROKSET.radio.voima, 0.45);
  assert.ok(lahella(cupolanTaso('humina', { tausta: 1 }), 0.9));
  assert.ok(lahella(cupolanTaso('radio', { tausta: 1 }), 0.45));
  assert.ok(lahella(cupolanTaso('humina', { tausta: 0.5 }), 0.45));
  assert.ok(lahella(cupolanTaso('radio', { tausta: 0.5 }), 0.225));
  // Puheen väistö: radio × 0,15, humina × 0,7.
  assert.ok(lahella(cupolanTaso('radio', { tausta: 1, vaistossa: true }), 0.45 * 0.15));
  assert.ok(lahella(cupolanTaso('humina', { tausta: 1, vaistossa: true }), 0.9 * 0.7));
  assert.ok(lahella(cupolanTaso('radio', { tausta: 0.5, vaistossa: true }), 0.45 * 0.5 * 0.15));
});

test('taso: liuku katkaistaan ykköseen, taustaäänet pois → 0', () => {
  assert.ok(lahella(cupolanTaso('humina', { tausta: 3 }), 0.9));
  assert.equal(cupolanTaso('humina', { tausta: -1 }), 0);
  assert.equal(cupolanTaso('radio', { tausta: NaN }), 0);
  assert.equal(cupolanTaso('humina', { paalla: false, tausta: 1 }), 0);
  assert.equal(cupolanTaso('radio', { paalla: false, tausta: 1, vaistossa: true }), 0);
  assert.equal(cupolanTaso('tuntematon', { tausta: 1 }), 0);
});

test('radio: satunnainen aloitus välillä [0, 1375] s', () => {
  assert.equal(RADION_KESTO_S, 1380);
  assert.equal(radionAloituskohta(0), 0);
  assert.equal(radionAloituskohta(1), 1375);
  assert.equal(radionAloituskohta(0.5), 687.5);
  // Rajojen ulkopuolinen syöte ei vie kohtaa silmukan ulkopuolelle.
  assert.equal(radionAloituskohta(-2), 0);
  assert.equal(radionAloituskohta(9), 1375);
  for (let i = 0; i < 1000; i++) {
    const t = radionAloituskohta();
    assert.ok(t >= 0 && t <= 1375, `aloitus ${t} silmukan ulkopuolella`);
  }
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
  assert.equal(jalkeen.radio.soi, false);
  assert.equal(jalkeen.radio.aika, 0);
});

test('kytkentä: versioidut osoitteet, näkymä kutsuu, SHELL tuntee moduulin', () => {
  assert.match(CUPOLA_HUMINA, /\/aanet\/cupola\/v1\/cupola-humina-90s\.wav$/);
  assert.match(CUPOLA_RADIO, /\/aanet\/cupola\/v1\/cupola-radio-eva38-23min\.mp3$/);
  const nakyma = readFileSync(new URL('../js/linssit/iss-kyyti-nakyma.js', import.meta.url), 'utf8');
  assert.match(nakyma, /from '\.\/cupola-aani\.js'/);
  assert.match(nakyma, /asetaCupola\(kehysNakyy && kyyti\.kyydissa\)/);
  assert.match(nakyma, /puraCupola\(\)/);
  const lahde = readFileSync(new URL('../js/linssit/cupola-aani.js', import.meta.url), 'utf8');
  // Ei omaa AudioContextia: pelin yhteinen konteksti.
  assert.ok(!/new\s+(webkit)?AudioContext/.test(lahde), 'Cupola loi oman AudioContextin');
  assert.match(lahde, /createMediaElementSource/);
  assert.match(lahde, /lahde\.loop = true/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/linssit/cupola-aani.js'"));
});
