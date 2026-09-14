import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import {
  LIVIAN_EUROOPAN_REVISION,
  LIVIAN_LUENTA_CUET,
  LIVIAN_LUENTAKAUPUNGIT,
} from '../js/livia-pilotti-cuet.js';

const manifesti = JSON.parse(readFileSync(new URL(
  '../docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json',
  import.meta.url,
), 'utf8'));

function runtimeCuet(cuet) {
  return cuet.map(({ id: cueId, ankkuri: anchor, esiintyma: occurrence,
    tarkoitus: intent, voimakkuus: strength }) => (
    { cueId, anchor, occurrence, intent, strength }
  ));
}

function manifestiCuet(cuet) {
  return cuet.map(({ cueId, anchor, occurrence = 1, intent, strength }) => (
    { cueId, anchor, occurrence, intent, strength }
  ));
}

test('Euroopan kaikki 45 city-3-riviä vastaavat exact r2-manifestin SHA:ta ja cueita', () => {
  assert.equal(manifesti.contentRevision, LIVIAN_EUROOPAN_REVISION);
  assert.equal(manifesti.cityCount, 45);
  assert.equal(manifesti.cities.length, 45);
  assert.equal(LIVIAN_LUENTAKAUPUNGIT.length, 45);
  assert.deepEqual(
    new Set(LIVIAN_LUENTAKAUPUNGIT),
    new Set(manifesti.cities.map(({ city }) => city)),
  );

  for (const item of manifesti.cities) {
    const runtime = LIVIAN_LUENTA_CUET[item.city];
    const kommentit = FOKUSVIRRAT[item.city]?.pollo?.kommentti;
    const nakyva = String((Array.isArray(kommentit) ? kommentit : [kommentit])[0] ?? '').trim();
    const nakyvaSha256 = createHash('sha256').update(nakyva).digest('hex');
    assert.ok(runtime, `${item.city}: runtime-sopimus puuttuu`);
    assert.equal(runtime.avain, item.livia.audioId, `${item.city}: audioId`);
    assert.equal(nakyvaSha256, item.livia.visibleTextSha256, `${item.city}: pakin tekstin SHA`);
    assert.equal(runtime.tekstiSha256, item.livia.visibleTextSha256, `${item.city}: näkyvän tekstin SHA`);
    assert.deepEqual(runtimeCuet(runtime.cuet), manifestiCuet(item.livia.cues), `${item.city}: cuet`);
    assert.equal(runtime.revision, LIVIAN_EUROOPAN_REVISION, `${item.city}: koontirevisio`);
  }
});
