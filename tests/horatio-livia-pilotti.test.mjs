import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { livianTiiviste } from '../js/liviapuhe.js';
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

test('TTS-ajopaketti on sidottu pilotin sanoihin ja tiivisteisiin', () => {
  const paketti = JSON.parse(readFileSync(new URL(
    '../docs/raportit/horatio-livia-pilotti-tts-ajopaketti-20260912.json',
    import.meta.url,
  ), 'utf8'));
  assert.equal(paketti.state, 'hold-owner-voice-selection');
  assert.equal(paketti.invariants.paidRunAuthorized, false);
  assert.equal(paketti.invariants.publishAuthorized, false);
  assert.equal(paketti.horatio.items.length, PILOTIT.length);
  assert.equal(paketti.livia.items.length, PILOTIT.length);

  for (const cityId of PILOTIT) {
    const virta = FOKUSVIRRAT[cityId];
    const horatio = paketti.horatio.items.find((rivi) => rivi.city === cityId);
    const livia = paketti.livia.items.find((rivi) => rivi.key === `${cityId}-3`);
    assert.ok(horatio, `${cityId}: Horatio puuttuu ajopaketista`);
    assert.ok(livia, `${cityId}: Livia puuttuu ajopaketista`);
    assert.equal(horatio.visibleText, virta.matkakirja.teksti, `${cityId}: näkyvä Horatio`);
    assert.equal(horatio.ttsText, virta.matkakirja.luenta, `${cityId}: Horatio TTS`);
    assert.equal(ilmanTageja(horatio.ttsText), horatio.visibleText, `${cityId}: Horatio sanat`);
    assert.equal(horatio.visibleTextSha256,
      createHash('sha256').update(horatio.visibleText).digest('hex'), `${cityId}: Horatio hash`);
    assert.equal(horatio.ttsTextSha256,
      createHash('sha256').update(horatio.ttsText).digest('hex'), `${cityId}: Horatio TTS hash`);
    assert.equal(livia.visibleText, virta.pollo.kommentti[0], `${cityId}: näkyvä Livia`);
    assert.equal(ilmanTageja(livia.ttsText), livia.visibleText, `${cityId}: Livia sanat`);
    assert.equal(livia.textDigest, livianTiiviste(livia.visibleText), `${cityId}: Livia tiiviste`);
    assert.equal(livia.ttsTextSha256,
      createHash('sha256').update(livia.ttsText).digest('hex'), `${cityId}: Livia TTS hash`);
  }
});
