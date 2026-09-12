import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const PILOTIT = ['marseille', 'ateena', 'sarajevo', 'venetsia'];

function ilmanTageja(teksti) {
  return String(teksti ?? '').replace(/\[[^\]]+\]\s*/g, '').trim();
}

function virkkeita(teksti) {
  return (String(teksti ?? '').match(/[.!?](?=\s|$)/g) ?? []).length;
}

test('pilotin Horatio-teksti ja TTS ovat samasanaiset', () => {
  for (const cityId of PILOTIT) {
    const matkakirja = FOKUSVIRRAT[cityId].matkakirja;
    assert.equal(ilmanTageja(matkakirja.luenta), matkakirja.teksti, cityId);
    assert.doesNotMatch(matkakirja.teksti, /\[[^\]]+\]/, `${cityId}: tagi näkyy pelaajalle`);
    assert.ok(virkkeita(matkakirja.teksti) <= 5, `${cityId}: Horatio ei tiivistynyt`);
  }
});

test('pilotin Livialla on nykyhavainto mutta kupla pysyy teknisessä mitassa', () => {
  for (const cityId of PILOTIT) {
    const kommentit = FOKUSVIRRAT[cityId].pollo.kommentti;
    assert.equal(kommentit.length, 1, `${cityId}: pilotti on yksi kupla`);
    assert.ok(kommentit[0].length <= 125, `${cityId}: kupla ylittää 125 merkkiä`);
    assert.ok(virkkeita(kommentit[0]) >= 3, `${cityId}: näkökulman vaihto jäi liian lyhyeksi`);
    assert.doesNotMatch(kommentit[0], /\[[^\]]+\]/, `${cityId}: TTS-tagi näkyy kuplassa`);
  }
});

test('pilotin Horatio-cueilla on pysyvät yksikäsitteiset ankkurit', () => {
  for (const cityId of PILOTIT) {
    const matkakirja = FOKUSVIRRAT[cityId].matkakirja;
    const ids = new Set();
    for (const cue of matkakirja.reaktiot) {
      assert.match(cue.id, new RegExp(`^${cityId}\\.r\\d+$`), `${cityId}: cueId`);
      assert.ok(!ids.has(cue.id), `${cityId}: cueId toistuu`);
      ids.add(cue.id);
      assert.equal(matkakirja.teksti.split(cue.ankkuri).length - 1, 1,
        `${cue.id}: ankkurin pitää esiintyä tasan kerran`);
    }
  }
});

