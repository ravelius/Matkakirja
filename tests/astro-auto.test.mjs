// Astronautin kameran AUTO (omistaja 2.10.2026): NOSTOKORTTI-pohjan osa AUTO, luenta → 3 s → seuraava kohde (›).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const SATELLIITTI = lue('../js/linssit/satelliitti.js');
const AUTO = lue('../js/pohjat/auto.js');
const CSS = pohjatCss();

test('AUTO-osa: sama asetus kuin lehden jatkuvalla luennalla ja natiivissa, siirto 3 s', () => {
  assert.match(AUTO, /export const POHJA_AUTO_AVAIN = 'matkakirja-lukija-auto';/);
  assert.match(AUTO, /export const POHJA_AUTO_SIIRTO_MS = 3000;/);
  assert.match(AUTO, /'Pysäytä'/);
  assert.match(CSS, /\.tk-auto\[aria-pressed="true"\] \{ border-color: var\(--tk-toiminto\);/);
});

test('luennan loputtua AUTO siirtyy seuraavaan kohteeseen samalla polulla kuin ›, vain tuoreimmasta luennasta', () => {
  const runko = SATELLIITTI.slice(SATELLIITTI.indexOf('function luentaLoppui('), SATELLIITTI.indexOf('// Pelaajan napautus, nipistys'));
  assert.match(runko, /if \(vuoro !== luentaVuoro \|\| !katselu\.isConnected \|\| !autoKaytossa\(\)\) return;/);
  assert.match(runko, /autoSiirto\.aloita\(seuraava\.nimi, \(\) => \{ if \(katselu\.isConnected && autoKaytossa\(\)\) vaihdaKohde\(1\); \}\);/);
});

test('pelaajan napautus, nipistys, rulla tai nuoli pysäyttää AUTOn; AUTOssa otsikko on pelkkä nimi', () => {
  assert.match(SATELLIITTI, /katselu\.addEventListener\('pointerdown', pysaytaAuto, true\);/);
  assert.match(SATELLIITTI, /katselu\.addEventListener\('wheel', pysaytaAuto, true\);/);
  assert.match(SATELLIITTI, /if \(e\.key === 'ArrowRight' \|\| e\.key === 'ArrowLeft'\) pysaytaAuto\(e\);/);
  assert.match(lue('../css/satelliitti.css'), /\.satelliitti-auto-paalla \.satelliitti-seutu \{ display: none; \}/);
});

test('AUTO on ‹ ›:n ryhmässä alhaalla keskellä, ei vasemmassa alakulmassa pikkukuvien päällä (2.10.2026)', () => {
  assert.match(SATELLIITTI, /kohdenapit\.classList\.add\('tk-teema-lasi-avaruus'\);\s*kohdenapit\.prepend\(autoKytkin\.el\);/);
  assert.doesNotMatch(SATELLIITTI, /satelliitti-autokulma/);
  assert.doesNotMatch(lue('../css/satelliitti.css'), /\.satelliitti-autokulma/);
  assert.match(lue('../css/satelliitti.css'), /\.satelliitti-kohteet \{[^}]*align-items: center;/);
});
