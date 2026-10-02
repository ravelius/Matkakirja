// Ajattelijat-linssi linssilistassa vain kehittäjätilassa (omistaja 2.10.2026 klo 12.27, Päätoimittajan kautta).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LINSSIT, KEHITTAJALINSSIT } from '../js/linssit/rekisteri.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('kehittäjälinssi on erillisessä listassa: omistus, palkinnot ja natiivin kultaiset jäljet eivät näe sitä', () => {
  assert.ok(KEHITTAJALINSSIT.some((r) => r.tunnus === 'ajattelijat'));
  assert.ok(!LINSSIT.some((r) => r.tunnus === 'ajattelijat'), 'ei LINSSIT-taulukossa');
  assert.doesNotMatch(lue('../js/linssit/omistus.js'), /KEHITTAJALINSSIT|ajattelijat/);
});

test('moottori löytää sen ja valikko näyttää sen vain kehittäjätilassa', () => {
  const k = lue('../js/linssit/kerros.js');
  assert.match(k, /\?\? KEHITTAJALINSSIT\.find\(\(r\) => r\.tunnus === tunnus\)/);
  assert.match(k, /\[\.\.\.LINSSIT, \.\.\.KEHITTAJALINSSIT\]\.map/);
  const ui = lue('../js/ui.js');
  assert.match(ui, /const kehittajalle = \(t\) => Boolean\(this\.kehittajaTila\) && tuki\.kerros\.KEHITTAJALINSSIT\?\.some/);
  assert.match(ui, /\(omat\.has\(linssi\.tunnus\) \|\| kehittajalle\(linssi\.tunnus\)\)/);
});

test('linssi avaa ajattelijan valinnan KORTTI-pohjalla rekisteristä (Sokrates, Marcus, …)', () => {
  const l = lue('../js/linssit/ajattelijat.js');
  assert.match(l, /import \{ AJATTELIJAT, avaaAjattelija \} from '\.\/ajattelija\.js';/);
  assert.match(l, /luoPohjaKortti\(\{/);
  assert.match(l, /napit: Object\.values\(AJATTELIJAT\)\.map/);
  assert.match(l, /kerros: false,/);
  assert.match(l, /pallolle\(_lauta, _tila, ui\)/);
});
