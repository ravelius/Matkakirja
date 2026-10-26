// KORTTI-siirrot kiinteille dialogeille (Päätoimittaja 1.10.2026): index.html:n dialogi puetaan KORTTI-pohjan
// luokkiin peruttavan lipun takana (?kortti=vanha), eikä vanha `.dialog button` -sääntö saa ohittaa pohjan nappia.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const UI = lue('../js/ui.js');
const CSS = pohjatCss();

const metodi = (nimi) => {
  const alku = UI.indexOf(`\n  ${nimi}() {`);
  assert.ok(alku > 0, `${nimi} löytyy`);
  return UI.slice(alku, UI.indexOf('\n  }\n', alku));
};

test('voitto- ja loppukortti puetaan KORTIKSI lipun takana ja napit sovitetaan näkyvän dialogin mukaan', () => {
  for (const nimi of ['showWinner', 'naytaMatkanLoppu']) {
    const runko = metodi(nimi);
    const pue = runko.indexOf('if (korttiPohjalla()) puePohjaDialogiksi(this.winnerDialog)');
    const auki = runko.indexOf('this.winnerDialog.showModal()');
    const sovita = runko.indexOf('sovitaPohjaNapit(this.winnerDialog)');
    assert.ok(pue > 0 && auki > pue && sovita > auki, `${nimi}: pue → showModal → sovita`);
  }
});

test('puePohjaDialogiksi: kerran per dialogi, ensisijainen kullaksi, haamu haamuksi', () => {
  const alku = UI.indexOf('function puePohjaDialogiksi(');
  const runko = UI.slice(alku, UI.indexOf('\n}\n', alku));
  assert.match(runko, /dialogi\.dataset\.pohja\) return/);
  assert.match(runko, /'primary'\) \? ' tk-nappi--ensisijainen'/);
  assert.match(runko, /'ghost'\) \? ' tk-nappi--haamu'/);
  assert.match(UI, /function sovitaPohjaNapit[\s\S]*?tk-napit--pysty/);
});

test('pohjan nappi voittaa vanhan .dialog button -säännön (pinta, reunus, kulma)', () => {
  assert.match(CSS, /\.dialog \.tk-kortti \.tk-nappi,[\s\S]*?border-radius: var\(--tk-kulma-nappi\)/);
  assert.match(CSS, /\.dialog \.tk-kortti \.tk-nappi--ensisijainen,[\s\S]*?background: var\(--tk-toiminto\)/);
});

test('Mitä uutta ja Peli päivittyi puetaan KORTIKSI ennen avausta (loki listan rakentamisen jälkeen)', () => {
  const MAIN = lue('../js/main.js');
  assert.match(MAIN, /import \{ UI, korttiPohjalla, puePohjaDialogiksi \} from '\.\/ui\.js'/);
  const loki = MAIN.slice(MAIN.indexOf('function avaaMuutokset()'), MAIN.indexOf('muutoksetDialog.showModal();'));
  assert.ok(loki.indexOf('lokiRakennettu = true') < loki.indexOf("puePohjaDialogiksi(muutoksetDialog, { sulje: '#muutokset-sulje' })"));
  assert.match(MAIN, /if \(korttiPohjalla\(\)\) puePohjaDialogiksi\(paivitysDialog, \{ sulje: '#paivitys-sulje' \}\);\n {2}paivitysDialog\.showModal\(\);/);
  assert.match(CSS, /\.tk-lista--loki \{ list-style: none;/);
  assert.match(CSS, /dialog\.tk-kortti\[open\]:has\(\.tk-lista--loki\) \{ display: flex;/);
});
