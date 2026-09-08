import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  KEHITTAJAN_VOIMA_ASKEL, KEHITTAJAN_VOIMA_MAX, KEHITTAJAN_VOIMA_MIN,
  KEHITTAJAN_VOIMA_OLETUS, asetaKehittajanKerroin, kehittajanKerroin, kehittajanKerroinTeksti,
  kuunteleKehittajanKerrointa, saadaKehittajanKerrointa,
} from '../js/kehittajan-voimat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('kerroin on oletuksena 1 ja pysyy rajoissa', () => {
  assert.equal(kehittajanKerroin('tausta'), 1);
  /*
   * MOLEMPIEN OLETUS ON 1,0 (omistajan vika 8.9.2026: *"Taustamusiikki
   * on aivan liian kovalla"*). Musiikin oletus oli 2,0 niin kauan kuin
   * paletti oli vanha ja hiljainen; hyväksytty kuuluva taso asuu nyt
   * perustasossa (js/musiikkivalitsin.js MUSIIKIN_PERUSTASO) ja kerroin
   * on jälleen pelkkä säädin.
   */
  assert.deepEqual(KEHITTAJAN_VOIMA_OLETUS, { tausta: 1, musiikki: 1 });
  assert.equal(kehittajanKerroin('musiikki'), 1);
  assert.equal(kehittajanKerroinTeksti('musiikki'), '×1,0');
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
  /*
   * Väistö luetaan nyt avauksenMaisemanKerroin-funktiosta (7.9.2026:
   * avauksen aikana kertoja ei väistä terminaalia), joten kaava on
   * tavoite × kerroin × kehittäjän säädin — ja se sama funktio
   * palauttaa tavallisessa tilassa `oma.vaimennus`:n sellaisenaan.
   */
  const virta = lue('../js/ambience-stream.js');
  assert.match(virta, /oma\.tavoite \* avauksenMaisemanKerroin\(oma\) \* kehittajanKerroin\('tausta'\)/);
  assert.match(virta, /avauksenMaisemanKerroin = \(oma\) =>[\s\S]{0,200}oma\?\.vaimennus \?\? 1/);
  // Musiikkireitit eivät lue kehittäjän kerrointa suoraan vaan
  // js/musiikkivalitsin.js:n musiikinKerroin()-funktion kautta; sitä
  // vartioi tests/musiikin-kerroin.test.mjs.
  assert.match(lue('../js/siirtymamusiikki.js'), /raidanTaso = [\s\S]{0,160}musiikinKerroin\(\)/);
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
