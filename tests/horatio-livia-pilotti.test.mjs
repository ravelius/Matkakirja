import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { LIVIAN_PILOTIN_REVISION, LIVIAN_PILOTTI_CUET } from '../js/livia-pilotti-cuet.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { TAGIT, puhemuoto } from '../tools/generoi-pulu.mjs';

const IDS = ['marseille', 'ateena', 'sarajevo', 'venetsia'];
const REVISION = 'eu-hl-europe-20260914-r2-approved';
const approved = JSON.parse(readFileSync(new URL('../docs/raportit/horatio-livia-hyvaksytyt-20260914-r2.json', import.meta.url), 'utf8'));
const manifest = JSON.parse(readFileSync(new URL('../docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json', import.meta.url), 'utf8'));
const sha = (text) => createHash('sha256').update(text).digest('hex');
const stripTags = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();

test('pilotin sanat ovat täsmälleen hyväksytyn R2-lähteen sanat ilman tagivuotoa', () => {
  for (const id of IDS) {
    const source = approved.cities.find((city) => city.id === id);
    const item = manifest.cities.find((city) => city.city === id);
    const pack = FOKUSVIRRAT[id];
    assert.equal(pack.matkakirja.teksti, source.text.horatio, `${id}: Horatio`);
    assert.equal(pack.pollo.kommentti[0], source.text.livia, `${id}: Livia`);
    assert.doesNotMatch(source.text.horatio, /\[[^\]]+\]/, `${id}: Horatio-tagivuoto`);
    assert.doesNotMatch(source.text.livia, /\[[^\]]+\]/, `${id}: Livia-tagivuoto`);
    assert.equal(stripTags(item.horatio.ttsText), source.text.horatio, `${id}: Horatio TTS`);
    assert.equal(stripTags(item.livia.ttsText), source.text.livia, `${id}: Livia TTS`);
    assert.equal(item.horatio.visibleTextSha256, sha(source.text.horatio), `${id}: Horatio SHA`);
    assert.equal(item.livia.visibleTextSha256, sha(source.text.livia), `${id}: Livia SHA`);
    assert.equal(puhemuoto(source.text.livia, TAGIT[`${id}-3`]), item.livia.ttsText, `${id}: tuotantogeneraattorin exact Livia TTS`);
  }
});

test('pilotin runtime-cuet vastaavat R2-manifestia', () => {
  assert.equal(LIVIAN_PILOTIN_REVISION, REVISION);
  for (const id of IDS) {
    const item = manifest.cities.find((city) => city.city === id);
    const runtime = LIVIAN_PILOTTI_CUET[id];
    assert.equal(runtime.revision, REVISION, `${id}: revisio`);
    assert.equal(runtime.tekstiSha256, item.livia.visibleTextSha256, `${id}: SHA`);
    assert.deepEqual(runtime.cuet.map(({ id: cueId, ankkuri: anchor, esiintyma: occurrence, tarkoitus: intent, voimakkuus: strength }) => ({ cueId, anchor, occurrence, intent, strength })), item.livia.cues.map(({ cueId, anchor, occurrence = 1, intent, strength }) => ({ cueId, anchor, occurrence, intent, strength })), `${id}: cuet`);
    for (const cue of item.livia.cues) assert.equal(item.livia.visibleText.split(cue.anchor).length - 1, cue.occurrence ?? 1, `${cue.cueId}: ankkuri`);
  }
});
