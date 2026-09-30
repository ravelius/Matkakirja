import test from 'node:test';
import assert from 'node:assert/strict';
import { evaAurinkoisuus, evaMaavalo, evaValot, kaynnistaPulunEvaValo } from '../js/linssit/pulu-eva-valo.js';

test('EVA-valot: yöllä kasvovalo ja lamput, päivällä maan valo (sama kaava kuin natiivin EvaValo)', () => {
  const yo = evaValot(0, 0.15);
  const paiva = evaValot(1, 1);
  assert.ok(yo.kasvovalo > 0.99 && yo.kyparalamput > 0.99 && yo.maavalo < 0.11);
  assert.ok(paiva.kasvovalo < 0.4 && paiva.kyparalamput < 0.3 && paiva.maavalo > 0.99);
  assert.ok(evaAurinkoisuus(0.5, 420) > 0.99 && evaAurinkoisuus(-0.5, 420) < 0.01);
  assert.ok(evaMaavalo(1) > 0.99 && evaMaavalo(-1) < 0.16);
});

test('EVA-valot CSS-muuttujiin ja pois purussa', () => {
  const arvot = new Map();
  const doc = { body: { style: { setProperty: (k, v) => arvot.set(k, v), removeProperty: (k) => arvot.delete(k) } } };
  const ikkuna = { setInterval: () => 1, clearInterval: () => {} };
  const v = kaynnistaPulunEvaValo({ doc, ikkuna, testi: 'yo' });
  assert.equal(arvot.get('--livia-eva-kasvovalo'), '1.000');
  assert.equal(arvot.get('--livia-eva-maavalo'), '0.100');
  v.pura();
  assert.equal(arvot.size, 0);
});
