import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { livianTiiviste } from '../js/liviapuhe.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import {
  PULU_AANI_OLETUS, PULU_MALLI_OLETUS, PULU_VAKAUS_OLETUS, tulkitseArgumentit,
} from '../tools/generoi-pulu.mjs';

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
  assert.equal(paketti.state, 'hold-content-review-and-paid-run-authorization');
  assert.equal(paketti.invariants.contentApprovedForAudio, false);
  assert.equal(paketti.invariants.paidRunAuthorized, false);
  assert.equal(paketti.invariants.publishAuthorized, false);
  assert.equal(paketti.horatio.items.length, PILOTIT.length);
  assert.equal(paketti.livia.items.length, PILOTIT.length);
  assert.deepEqual(paketti.livia.voice, {
    state: 'owner-locked',
    name: 'flicker - cheerful fairy & sparkly sweetness',
    id: 'piI8Kku0DcvcL6TTSeQt',
  });
  assert.equal(paketti.livia.model, 'eleven_v3');
  assert.deepEqual(paketti.livia.stability, { name: 'natural', value: 0.5 });
  assert.match(paketti.livia.generationCommand, /--aani piI8Kku0DcvcL6TTSeQt(?:\s|$)/);
  assert.equal(PULU_AANI_OLETUS, paketti.livia.voice.id);
  assert.equal(PULU_MALLI_OLETUS, paketti.livia.model);
  assert.equal(PULU_VAKAUS_OLETUS, paketti.livia.stability.name);
  assert.equal(tulkitseArgumentit([]).aani, paketti.livia.voice.id);

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
    const cueIds = new Set();
    for (const cue of livia.cueAnchors) {
      assert.match(cue.cueId, new RegExp(`^${cityId}\\.livia\\.c\\d+$`), `${cityId}: Livia cueId`);
      assert.ok(!cueIds.has(cue.cueId), `${cityId}: Livia cueId toistuu`);
      cueIds.add(cue.cueId);
      assert.equal(livia.visibleText.split(cue.anchor).length - 1, cue.occurrence,
        `${cue.cueId}: ankkurin pitää esiintyä täsmälleen sovitun kerran`);
    }
  }
});

test('workflow ei palauta tulevia Pulu-ajoja vanhaan ääneen tai v2-malliin', () => {
  const workflow = readFileSync(new URL('../.github/workflows/generoi-pulu.yml', import.meta.url), 'utf8');
  assert.match(workflow, /default: 'piI8Kku0DcvcL6TTSeQt'/);
  assert.match(workflow, /default: 'eleven_v3'/);
  assert.match(workflow, /default: 'natural'/);
  assert.doesNotMatch(workflow, /default: 'yjJ45q8TVCrtMhEKurxY'/);
  assert.doesNotMatch(workflow, /default: 'eleven_multilingual_v2'/);
});
