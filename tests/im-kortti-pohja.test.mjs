// Ihmisen matkan nostokortti NOSTOKORTTI-pohjalla (omistajan kokeilu 1.10.2026): peruttava lippu ja pohjan kytkentä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { imKorttiPohjalla } from '../js/linssit/ihmisen-matka-kortti.js';

const K = readFileSync(new URL('../js/linssit/ihmisen-matka-kortti.js', import.meta.url), 'utf8');

test('lippu: oletuksena pohja, ?imkortti=vanha kääntää takaisin, vanha kortti jää koodiin', () => {
  assert.equal(imKorttiPohjalla(), true);
  assert.match(K, /const IM_KORTTI_POHJA = true;/);
  assert.match(K, /if \(valinta === 'vanha'\) return false;/);
  assert.match(K, /if \(imKorttiPohjalla\(\)\) \{[\s\S]*?avaaPohjalla\(nosto\)[\s\S]*?kortti\.replaceChildren\(\);/);
});

test('pohja: TUMMA, virran piste kapiteelissa, Kysy avaa Pulun paneelin (valmiit kysymykset), Lue lisää tiedeliite', () => {
  assert.match(K, /teema: 'tumma'/);
  assert.match(K, /ylaVari: typeof piste === 'string' \? piste : ''/);
  assert.match(K, /kysy: \(\) => polloEhdota\(\[\]\)/);
  assert.match(K, /lue: \(\) => ajo\.avaaNostonJuttu\(nosto\.indeksi\)/);
  // Yhteinen avauksen loppu: esitys tauolle ja Pulun konteksti kummallekin kortille.
  assert.match(K, /return avauksenHanta\(nosto, pohjaAuki\?\.el \?\? kortti\);/);
});
