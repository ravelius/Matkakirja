import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  KEHITTAJAN_VOIMA_ASKEL, KEHITTAJAN_VOIMA_MAX, KEHITTAJAN_VOIMA_MIN,
  asetaKehittajanKerroin, kehittajanKerroin, kehittajanKerroinTeksti,
  kuunteleKehittajanKerrointa, saadaKehittajanKerrointa,
} from '../js/kehittajan-voimat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('kerroin on oletuksena 1 ja pysyy rajoissa', () => {
  assert.equal(kehittajanKerroin('tausta'), 1);
  assert.equal(kehittajanKerroin('olematon'), 1);
  assert.equal(asetaKehittajanKerroin('tausta', 99), KEHITTAJAN_VOIMA_MAX);
  assert.equal(asetaKehittajanKerroin('tausta', 0), KEHITTAJAN_VOIMA_MIN);
  assert.equal(asetaKehittajanKerroin('tausta', 'roska'), 1);
});

test('plus ja miinus liikuttavat askelen ja kuuntelija kuulee muutoksen', () => {
  asetaKehittajanKerroin('musiikki', 1);
  const kuultu = [];
  const irti = kuunteleKehittajanKerrointa('musiikki', (v) => kuultu.push(v));
  assert.equal(saadaKehittajanKerrointa('musiikki', 1), 1 + KEHITTAJAN_VOIMA_ASKEL);
  assert.equal(saadaKehittajanKerrointa('musiikki', -1), 1);
  assert.deepEqual(kuultu, [1.1, 1]);
  irti();
  assert.equal(kehittajanKerroinTeksti('musiikki'), '×1,0');
});

test('ambienssi ja siirtymämusiikki kertovat tasonsa kehittäjän kertoimella', () => {
  assert.match(lue('../js/ambience-stream.js'), /oma\.tavoite \* \(oma\.vaimennus \?\? 1\) \* kehittajanKerroin\('tausta'\)/);
  assert.match(lue('../js/siirtymamusiikki.js'), /raidanTaso = [\s\S]{0,160}kehittajanKerroin\('musiikki'\)/);
  const html = lue('../index.html');
  assert.match(html, /kehittaja-saadin" data-laji="tausta"/);
  assert.match(html, /kehittaja-saadin" data-laji="musiikki"/);
});

test('Sarajevon äänimaisema ei ole kirkonkelloja (omistaja 3.9.2026)', () => {
  const ehdokkaat = lue('../js/aani-ehdokkaat.js');
  const sarajevo = ehdokkaat.slice(ehdokkaat.indexOf('    sarajevo: ['), ehdokkaat.indexOf('    sofia: ['));
  assert.doesNotMatch(sarajevo, /stjosephchurch/);
  assert.match(sarajevo, /ferhadija/);
});
