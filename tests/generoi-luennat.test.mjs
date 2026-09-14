import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  kohdeTiedosto,
  kuittirivi,
  main,
  parseArgumentit,
  rajaaRetry,
  tuotantoAvaimet,
  tuotantoEraId,
} from '../tools/generoi-luennat.mjs';

test('kaupunkilista on eksplisiittinen, pilkut sallitaan ja dry-run ei tarvitse avainta', () => {
  assert.deepEqual(parseArgumentit(['--dry-run', '--kaupungit', 'ateena,marseille', 'ateena']), {
    kaupungit: ['ateena', 'marseille'], kuiva: true, planOnly: false,
    retryKuitti: null, kuitti: null,
  });
  assert.throws(() => parseArgumentit(['--kaikki']), /Tuntematon valitsin/);
});

test('kaupunkilista sietää pilkut ja välilyönnit samassa argumentissa', () => {
  assert.deepEqual(
    parseArgumentit(['--kaupungit', 'firenze oslo,granada\nkiova']).kaupungit,
    ['firenze', 'oslo', 'granada', 'kiova'],
  );
});

test('erätunnus on deterministinen ja plan-only kirjoittaa kuitin ennen APIa', async () => {
  const tyot = ['ateena', 'marseille'].map((id) => ({ id, ...kohdeTiedosto(id) }));
  const commit = 'a'.repeat(40);
  assert.equal(tuotantoEraId(tyot, commit), tuotantoEraId(tyot, commit));
  assert.notEqual(tuotantoEraId(tyot, commit), tuotantoEraId(tyot.slice(0, 1), commit));
  const kansio = mkdtempSync(join(tmpdir(), 'horatio-plan-'));
  const kuitti = join(kansio, 'planned.json');
  assert.equal(await main(['--plan-only', '--kaupungit', 'ateena,marseille', '--kuitti', kuitti], {}), 0);
  const tallenne = JSON.parse(readFileSync(kuitti, 'utf8'));
  assert.match(tallenne.batch.id, /^horatio-[0-9a-f]{20}$/);
  assert.equal(tallenne.cities.length, 2);
  assert.ok(tallenne.cities.every((rivi) => rivi.generation.status === 'planned'));
});

test('retry hyväksyy vain kuitissa epäonnistuneet eikä uusi onnistuneita', () => {
  const kuitti = {
    schemaVersion: 1,
    cities: [
      { cityId: 'ateena', generation: { status: 'success', retryReason: null } },
      { cityId: 'marseille', generation: { status: 'failed', retryReason: 'HTTP 503' } },
    ],
  };
  assert.deepEqual(rajaaRetry([], kuitti), [{ id: 'marseille', retryReason: 'HTTP 503' }]);
  assert.deepEqual(rajaaRetry(['marseille'], kuitti), [{ id: 'marseille', retryReason: 'HTTP 503' }]);
  assert.throws(() => rajaaRetry(['ateena'], kuitti), /vain epäonnistuneet/);
  assert.throws(() => rajaaRetry(['marseille'], { ...kuitti, schemaVersion: 99 }), /ei ole tuettu/);
});

test('tuotantokuitti sitoo näkyvän ja TTS-tekstin sekä koko reseptin', () => {
  const kohde = { id: 'ateena', ...kohdeTiedosto('ateena') };
  const raw = Buffer.from('raw-audio');
  const final = Buffer.from('final-audio');
  const objectKeys = tuotantoAvaimet(kohde, {
    batchId: '12345-2', sourceCommit: '0123456789abcdef0123456789abcdef01234567',
  });
  const rivi = kuittirivi(kohde, {
    status: 'success', reason: 'HTTP 503 edellisessä erässä', raw,
    final: { data: final, duration: 12.3456 }, objectKeys,
  });
  const sha = (data) => createHash('sha256').update(data).digest('hex');
  assert.equal(rivi.cityId, 'ateena');
  // Raaka-avain tuli mukaan 14.9.2026 (omistajan sääntö: ALKUPERÄISET
  // ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA). Se on eräkohtainen, ei revisio-
  // kohtainen: uusi koodideploy ei saa siirtää alkuperäistä muualle.
  assert.deepEqual(rivi.objectKeys, {
    raw: 'audio/raw/horatio/12345-2/puhe-fokus-matkakirja-ateena.mp3',
    staging: 'audio/staging/horatio/12345-2/puhe-fokus-matkakirja-ateena.mp3',
    final: 'audio/versions/horatio/0123456789ab/12345-2/puhe-fokus-matkakirja-ateena.mp3',
    live: null,
  });
  assert.equal(rivi.visibleText.text, kohde.nakyvaTeksti);
  assert.equal(rivi.visibleText.sha256, sha(kohde.nakyvaTeksti));
  assert.equal(rivi.ttsText.text, `${kohde.luenta} <break time="1.0s" />`);
  assert.equal(rivi.ttsText.sha256, sha(rivi.ttsText.text));
  assert.deepEqual(rivi.synthesis, {
    voiceId: 'Sz0tRTEpybtDJ9ru2kgD', model: 'eleven_v3', settings: { stability: 0.5 },
    outputFormat: 'mp3_44100_128', postprocess: { kind: 'none' },
  });
  assert.deepEqual(rivi.generation, { status: 'success', retryReason: 'HTTP 503 edellisessä erässä' });
  // Kuitti kirjaa raa'alle sekä sha256:n ETTÄ avaimen — pelkkä tiiviste
  // ei kertoisi, mistä alkuperäinen löytyy uusintaleikkausta varten.
  assert.deepEqual(rivi.rawAudio, {
    sha256: sha(raw), bytes: raw.length, actualDurationSeconds: 12.3456,
    objectKey: 'audio/raw/horatio/12345-2/puhe-fokus-matkakirja-ateena.mp3',
  });
  assert.deepEqual(rivi.finalAudio, {
    sha256: sha(final), bytes: final.length, actualDurationSeconds: 12.3456,
    objectKey: 'audio/versions/horatio/0123456789ab/12345-2/puhe-fokus-matkakirja-ateena.mp3',
  });
});

test('Horation vienti kieltäytyy ilman raaka-avainta', async () => {
  const { readFileSync } = await import('node:fs');
  const tyonkulku = readFileSync(
    new URL('../.github/workflows/generoi-luennat.yml', import.meta.url), 'utf8',
  );
  // Vartio: työnkulku ei saa viedä mitään, jos kuitista puuttuu raaka.
  assert.match(tyonkulku, /if\(!r\.objectKeys\?\.raw\|\|!r\.rawAudio\?\.sha256\)process\.exit\(3\)/);
  // Ja raaka on kopioitava ennen staging- ja final-avaimia.
  const raaka = tyonkulku.indexOf('R2_BUCKET }}/$raaka');
  const staging = tyonkulku.indexOf('R2_BUCKET }}/$staging');
  assert.ok(raaka > 0 && raaka < staging, 'raaka on vietävä ensin');
});

test('dry-run ratkaisee kaupungit ilman verkkoa tai kirjoituksia', async () => {
  const { spawnSync } = await import('node:child_process');
  const ajo = spawnSync(process.execPath, ['tools/generoi-luennat.mjs', '--dry-run', '--kaupungit', 'ateena,marseille'], {
    cwd: new URL('..', import.meta.url), encoding: 'utf8', env: { PATH: process.env.PATH },
  });
  assert.equal(ajo.status, 0, ajo.stderr);
  assert.match(ajo.stdout, /KUIVA AJO/);
  assert.match(ajo.stdout, /ateena: lähde fokusvirta/);
  assert.match(ajo.stdout, /marseille: lähde fokusvirta/);
});

test('maksullinen ajo torjuu koko Euroopan kaltaisen suuren erän ennen verkkokutsua', async () => {
  const kaupungit = [
    'ateena', 'sofia', 'marseille', 'barcelona', 'madrid', 'pietari',
    'lontoo', 'pariisi', 'berliini', 'wien', 'praha',
  ];
  assert.equal(await main(['--kaupungit', kaupungit.join(',')], { ELEVEN_API_KEY: 'testi-ei-kayteta' }), 1);
});
