// Elävien elementtien polut (tools/tee-elavat-polut.mjs → tools/vienti/elavat-polut.json.gz).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { ULOS, POLUT, PISTEVALI_M, etaisyysM, teePolut } from '../tools/tee-elavat-polut.mjs';

const data = JSON.parse(gunzipSync(readFileSync(ULOS)).toString('utf8'));

test('tiedosto vastaa lähdettä: jokaisella polulla laji, lähde ja lisenssi', () => {
  assert.deepEqual(data.polut, teePolut());
  assert.equal(data.polut.length, POLUT.length);
  for (const p of data.polut) {
    assert.ok(['vesi', 'koysirata', 'kulkue'].includes(p.laji), p.id);
    assert.ok(p.lahde && p.nimi && p.kaupunki, p.id);
    assert.ok(/^CC0|^CC BY 4\.0/.test(p.lisenssi), p.id);
  }
  assert.ok(data.lahteet.every((l) => l.url && l.lisenssi));
});

test('polut alkavat ja päättyvät tukipisteisiinsä, pisteväli enintään 2 × tavoite', () => {
  for (const l of POLUT) {
    const v = data.polut.find((p) => p.id === l.id).viivat[0];
    const [la0, lo0] = l.tuet[0]; const [la1, lo1] = l.tuet.at(-1);
    assert.ok(etaisyysM(v[0], [lo0, la0]) < 2 && etaisyysM(v.at(-1), [lo1, la1]) < 2, l.id);
    for (let i = 1; i < v.length; i += 1) assert.ok(etaisyysM(v[i - 1], v[i]) < 2 * PISTEVALI_M, `${l.id} ${i}`);
  }
});

test('köysiradan pisteissä korkeus ja asemat pysäkkeinä', () => {
  const k = data.polut.find((p) => p.laji === 'koysirata');
  assert.ok(k.viivat[0].every((q) => q.length === 3 && q[2] > 900 && q[2] < 4000));
  const l = POLUT.find((x) => x.id === k.id);
  assert.equal(k.pysakit.length, l.pysakit.length);
  assert.equal(k.pysakit[0], 0); assert.equal(k.pysakit.at(-1), k.viivat[0].length - 1);
  k.pysakit.forEach((i, n) => { const [lat, lon] = l.tuet[l.pysakit[n]]; assert.ok(etaisyysM(k.viivat[0][i], [lon, lat]) < 2); });
});
