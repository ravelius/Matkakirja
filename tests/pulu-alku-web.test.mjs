/*
 * PULUN ALKU WEBISSÄ (omistaja 11.10.2026 klo 11.4x–11.5x, natiivi on malli):
 * ohjekuplat jäävät näkyviin, ei Pulun kommenttia aloituskaupungissa ja Uusi
 * matka nollaa ensikerran liput.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { aloituskaupungissa } from '../js/fokusvirta.js';
import {
  LIVIA_AVAUS_TALLE, LIVIA_LEHTIVINKKI_TALLE, LIVIA_PALJASTUS_TALLE, nollaaLivianEnsikerta,
} from '../js/livia.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const MAIN = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');
const FOKUSVIRTA = readFileSync(new URL('../js/fokusvirta.js', import.meta.url), 'utf8');

const peli = (start, kaydyt) => ({ game: { player: { start }, world: { visited: new Set(kaydyt) } } });

test('aloituskaupunki tunnistetaan vain matkan alussa', () => {
  assert.equal(aloituskaupungissa(peli('ateena', ['ateena']), { id: 'ateena' }), true);
  // Paluu lähtökaupunkiin myöhemmin on tavallinen saapuminen.
  assert.equal(aloituskaupungissa(peli('ateena', ['ateena', 'sofia']), { id: 'ateena' }), false);
  assert.equal(aloituskaupungissa(peli('ateena', ['ateena']), { id: 'sofia' }), false);
  assert.equal(aloituskaupungissa({}, { id: 'ateena' }), false);
});

test('Pulun saapumiskommentti ohittaa aloituskaupungin ennen kertalippua', () => {
  const alku = FOKUSVIRTA.indexOf('export function fokusvirtaSaapumiskupla(');
  const runko = FOKUSVIRTA.slice(alku, FOKUSVIRTA.indexOf('ui.saapumiskuplaNaytetty.add(avain)', alku));
  assert.match(runko, /if \(aloituskaupungissa\(ui, city\)\) return false;/);
});

test('Uusi matka nollaa avauksen, paljastuksen ja lehtivinkin liput', () => {
  const muisti = new Map([[LIVIA_AVAUS_TALLE, '1'], [LIVIA_PALJASTUS_TALLE, '1'], [LIVIA_LEHTIVINKKI_TALLE, '1'],
    ['matkakirja-muu', 'x']]);
  const vanha = globalThis.localStorage;
  globalThis.localStorage = { removeItem: (k) => muisti.delete(k), getItem: (k) => muisti.get(k) ?? null };
  try {
    nollaaLivianEnsikerta();
  } finally {
    globalThis.localStorage = vanha;
  }
  assert.deepEqual([...muisti.keys()], ['matkakirja-muu']);
  // Pelaajan valitsema uusi matka nollaa; sivun avaus ilman talletusta ei.
  assert.match(MAIN, /function uusiMatka\(\) \{\n  nollaaLivianEnsikerta\(\);\n  startGame\(\);/);
  assert.match(MAIN, /onNewGame: uusiMatka, onChange: saveGame/);
  assert.match(MAIN, /'winner-close'\)\.addEventListener\('click', uusiMatka\)/);
});

test('ohjekuplat jäävät näkyviin ensimmäiseen napautukseen (ei ajastettua piilotusta)', () => {
  // Omistaja 11.10.2026 (PT): natiivissa ohjeet näkyivät vain 3 s; webissä ne jäävät pinoon, eikä niitä lyhennetä.
  const alku = UI.indexOf('  saapumisenOhjekuplat(tervetuloa) {');
  const runko = UI.slice(alku, UI.indexOf('\n  }\n', alku));
  assert.doesNotMatch(runko, /polloVihjePois/);
});
