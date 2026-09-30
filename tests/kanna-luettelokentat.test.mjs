/*
 * AJO ILMAN NOSTO- JA NIMIÖSHARDEJA KANTAA ÄMPÄRIN KERROKSET (yöpoltto 28.9.2026).
 * Pohja poltettiin --ilman-nostoja --ilman-nimioita, ja luettelosta puuttuivat
 * väritasot, erat, nostotasot ja nimiotaso; nostotaso väitti polttamatonta
 * --nostoversiota. Ks. tools/kanna-luettelokentat.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kannaAmparista } from '../tools/kanna-luettelokentat.mjs';

const AMPARI = () => ({
  versio: '2026-09-26s-pohja',
  nostotaso: { versio: '2026-09-25c-nostot', tasot: [5, 6, 7, 8] },
  nostotasot: { FRA: { versio: '2026-09-25c-nostot' } },
  nimiotaso: { versio: '2026-09-22g-nimiot', tasot: [4, 5, 6, 7, 8] },
  varitasot: { FRA: { versio: '2026-09-14b-tasoitus' } },
  erat: [{ tasot: [4] }],
  viivataso: { versio: '2026-09-25-viivat' },
  rantataso: { versio: '2026-09-25-ranta' },
});
const POLTTO = () => ({
  versio: '2026-09-27-pohja',
  nostotaso: { versio: '2026-09-26-nostot', tasot: [5, 6, 7, 8] },
  nostotasot: null,
  nimiotaso: null,
  varitasot: null,
  viivataso: { versio: '2026-09-27-viivat' },
  rantataso: { versio: '2026-09-27-ranta' },
});

test('ilman nosto- ja nimiöshardeja: kerrokset ämpäristä, oma pohja/viivat/ranta säilyvät', () => {
  const { luettelo, kannetut } = kannaAmparista(POLTTO(), AMPARI(), { nostot: true, nimiot: true });
  assert.equal(luettelo.versio, '2026-09-27-pohja');
  assert.equal(luettelo.viivataso.versio, '2026-09-27-viivat');
  assert.equal(luettelo.rantataso.versio, '2026-09-27-ranta');
  assert.equal(luettelo.nostotaso.versio, '2026-09-25c-nostot');
  assert.deepEqual(Object.keys(luettelo.nostotasot), ['FRA']);
  assert.equal(luettelo.nimiotaso.versio, '2026-09-22g-nimiot');
  assert.deepEqual(Object.keys(luettelo.varitasot), ['FRA']);
  assert.equal(luettelo.erat.length, 1);
  assert.equal(kannetut.length, 4);
});

test('poltetut nostot ja nimiöt jäävät tämän ajon omiksi', () => {
  const oma = { ...POLTTO(), nimiotaso: { versio: '2026-09-28-nimiot' } };
  const { luettelo } = kannaAmparista(oma, AMPARI());
  assert.equal(luettelo.nostotaso.versio, '2026-09-26-nostot');
  assert.equal(luettelo.nimiotaso.versio, '2026-09-28-nimiot');
  assert.deepEqual(Object.keys(luettelo.varitasot), ['FRA']);
});

test('omia väritasoja ei korvata', () => {
  const oma = { ...POLTTO(), varitasot: { DEU: { versio: 'x' } } };
  assert.deepEqual(Object.keys(kannaAmparista(oma, AMPARI()).luettelo.varitasot), ['DEU']);
});

test('polttoskripti kutsuu kantoa eheyden jälkeen ilman nosto-/nimiöshardeja', () => {
  const s = readFileSync(new URL('../tools/polta-paikallisesti.sh', import.meta.url), 'utf8');
  const eheys = s.indexOf('tarkista_eheys "$ULOS/lokit/shardit.txt" --luettelo');
  const kanto = s.indexOf('tools/kanna-luettelokentat.mjs');
  const vartio = s.indexOf('luettelon varitasot puuttuvat');
  assert.ok(eheys > 0 && kanto > eheys && vartio > kanto);
  assert.match(s, /grep -q '\^nosto-' "\$ULOS\/lokit\/shardit\.txt" 2>\/dev\/null \|\| echo --nostot-amparista/);
  assert.match(s, /grep -q '\^nimio-' "\$ULOS\/lokit\/shardit\.txt" 2>\/dev\/null \|\| echo --nimiot-amparista/);
});
