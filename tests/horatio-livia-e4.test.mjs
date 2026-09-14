import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { LIVIAN_E4_REVISION, LIVIAN_LUENTA_CUET } from '../js/livia-pilotti-cuet.js';

const IDS = ['tukholma', 'helsinki', 'tampere', 'tallinna', 'riika', 'vilna', 'tromssa', 'lappi'];
const REVISION = 'eu-hl-europe-20260914-r2-approved';
const approved = JSON.parse(readFileSync(new URL('../docs/raportit/horatio-livia-hyvaksytyt-20260914-r2.json', import.meta.url), 'utf8'));
const manifest = JSON.parse(readFileSync(new URL('../docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json', import.meta.url), 'utf8'));
const sha = (text) => createHash('sha256').update(text).digest('hex');
const stripTags = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();

test('E4-packit vastaavat täsmälleen hyväksyttyä R2-lähdettä', () => {
  for (const id of IDS) {
    const source = approved.cities.find((city) => city.id === id);
    const item = manifest.cities.find((city) => city.city === id);
    const pack = FOKUSVIRRAT[id];
    assert.ok(source && item && pack, `${id}: lähde, manifesti tai pack puuttuu`);
    assert.equal(pack.matkakirja.teksti, source.text.horatio, `${id}: Horatio`);
    assert.equal(pack.pollo.kommentti[0], source.text.livia, `${id}: Livia`);
    assert.equal(item.horatio.visibleText, source.text.horatio, `${id}: manifestin Horatio`);
    assert.equal(item.livia.visibleText, source.text.livia, `${id}: manifestin Livia`);
    assert.equal(stripTags(item.horatio.ttsText), source.text.horatio, `${id}: Horatio TTS-sanat`);
    assert.equal(stripTags(item.livia.ttsText), source.text.livia, `${id}: Livia TTS-sanat`);
    assert.equal(item.horatio.visibleTextSha256, sha(source.text.horatio), `${id}: Horatio SHA`);
    assert.equal(item.livia.visibleTextSha256, sha(source.text.livia), `${id}: Livia SHA`);
  }
});

test('E4-cuet ovat yksikäsitteiset ja sidotut hyväksyttyyn tekstiin', () => {
  assert.equal(LIVIAN_E4_REVISION, REVISION);
  for (const id of IDS) {
    const item = manifest.cities.find((city) => city.city === id);
    const runtime = LIVIAN_LUENTA_CUET[id];
    assert.equal(runtime.revision, REVISION, `${id}: revisio`);
    assert.equal(runtime.tekstiSha256, item.livia.visibleTextSha256, `${id}: SHA`);
    assert.deepEqual(runtime.cuet.map(({ id: cueId, ankkuri: anchor, esiintyma: occurrence, tarkoitus: intent, voimakkuus: strength }) => ({ cueId, anchor, occurrence, intent, strength })), item.livia.cues.map(({ cueId, anchor, occurrence = 1, intent, strength }) => ({ cueId, anchor, occurrence, intent, strength })), `${id}: runtime-cuet`);
    for (const speaker of ['horatio', 'livia']) {
      const ids = new Set();
      for (const cue of item[speaker].cues) {
        assert.ok(!ids.has(cue.cueId), `${cue.cueId}: tunnus toistuu`);
        ids.add(cue.cueId);
        assert.ok(cue.intent, `${cue.cueId}: intent puuttuu`);
        assert.equal(item[speaker].visibleText.split(cue.anchor).length - 1, cue.occurrence ?? 1, `${cue.cueId}: ankkuri`);
      }
    }
  }
});
