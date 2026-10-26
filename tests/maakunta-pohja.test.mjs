// Maakuntakortti NOSTOKORTTI-pohjalla (omistajan kokeilu 1.10.2026): peruttava lippu ja Pulun valmiit vastaukset chattiin.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { maakuntakorttiPohjalla, maakunnanPulukysymykset } from '../js/karttatyokalu-maakunnat.js';

const K = readFileSync(new URL('../js/karttatyokalu-maakunnat.js', import.meta.url), 'utf8');

test('lippu: oletuksena pohja, ?maakuntakortti=vanha kääntää takaisin, vanha kortti jää koodiin', () => {
  assert.equal(maakuntakorttiPohjalla(), true);
  assert.match(K, /const MAAKUNTAKORTTI_POHJA = true;/);
  assert.match(K, /if \(maakuntakorttiPohjalla\(\)\) \{\s*avaaMaakuntaPohjalla[\s\S]*?const kerros = html\('div', 'maakunta-kortti-kerros'\)/);
});

test('Pulun valmiit kysymykset chatin muodossa: vastaus ilman mallikutsua, tuntematon kysymys → null', () => {
  const q = maakunnanPulukysymykset('GRC:Attiki', [{ q: 'Miksi hopea?', a: 'Laivasto.' }, { q: '' }]);
  assert.equal(q.avain, 'maakunta:GRC:Attiki');
  assert.deepEqual(q.kysymykset, ['Miksi hopea?']);
  assert.deepEqual(q.vastaus('Miksi hopea?'), { vastaus: 'Laivasto.', lahteet: [] });
  assert.equal(q.vastaus('Muu?'), null);
  assert.equal(maakunnanPulukysymykset('X:Y', []), null);
  // Kysely palautetaan entiselleen, kun kortti sulkeutuu.
  assert.match(K, /if \(ui && kysely && ui\.pulunLinssikysymykset === kysely\) ui\.pulunLinssikysymykset = edellinen;/);
});
