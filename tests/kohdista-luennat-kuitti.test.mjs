import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { AANI_JUURI } from '../js/media.js';
import {
  kohdistusTyo, kuittirivit, lueLiput,
} from '../tools/kohdista-luennat.mjs';
import {
  kohdeTiedosto, kuittirivi, tuotantoAvaimet, tuotantoEraId,
} from '../tools/generoi-luennat.mjs';

function valmisKuitti(id = 'ateena') {
  const sourceCommit = '1'.repeat(40);
  const tyo = { id, ...kohdeTiedosto(id) };
  const batch = { id: tuotantoEraId([tyo], sourceCommit), sourceCommit, retryOf: null };
  const audio = Buffer.from(`horatio-${id}-final-audio`);
  return {
    schemaVersion: 1,
    batch,
    cities: [kuittirivi(tyo, {
      status: 'success', raw: audio, final: { data: audio, duration: 12.5 },
      objectKeys: tuotantoAvaimet(tyo, { batchId: batch.id, sourceCommit }),
    })],
  };
}

test('Horatio-kohdistus hyväksyy vain valmiin SHA-sidotun tuotantokuitin', async () => {
  const kuitti = valmisKuitti();
  const rivit = await kuittirivit(kuitti);
  const rivi = rivit.get('ateena');
  const tyo = kohdistusTyo('ateena', rivi);
  assert.equal(tyo.aaniOsoite, `${AANI_JUURI}${rivi.objectKeys.final}`);
  assert.equal(tyo.ampariNimi, rivi.objectKeys.final.replace(/\.mp3$/, '.aikaleimat.json'));
  assert.deepEqual(tyo.kuittiAani, rivi.finalAudio);

  for (const muuta of [
    (k) => { k.cities[0].visibleText.text += ' väärä'; },
    (k) => { k.cities[0].synthesis.voiceId = 'vaara'; },
    (k) => { k.cities[0].finalAudio.sha256 = 'a'.repeat(64); },
    (k) => { k.cities[0].objectKeys.final = 'audio/puhe-fokus-matkakirja-ateena.mp3'; },
    (k) => { k.cities[0].generation.status = 'planned'; },
  ]) {
    const rikottu = structuredClone(kuitti);
    muuta(rikottu);
    await assert.rejects(() => kuittirivit(rikottu), /ei kelpaa kohdistukseen/);
  }
});

test('kohdistusliput kantavat kuitin eivatka oleta vientia', () => {
  assert.deepEqual(lueLiput(['--kuitti', 'valmis.json']), {
    kaupungit: [], kaikki: false, kuiva: false, vienti: false, sidonta: false, kuitti: 'valmis.json',
  });
  assert.throws(() => lueLiput(['--kuitti']), /ilman polkua tai URLia/);
});

test('workflow vartioi julkisen completed-kuitin ja julkaisee vain tarkastusartefaktin', () => {
  const workflow = readFileSync(new URL('../.github/workflows/generoi-luennat.yml', import.meta.url), 'utf8');
  assert.match(workflow, /https:\/\/media\.matkakirja\.app\/audio\/receipts\/horatio\/\*\.completed\.json/);
  assert.match(workflow, /node tools\/kohdista-luennat\.mjs --vie --kuitti "\$KUITTI"/);
  assert.match(workflow, /name: horatio-aikaleimat-/);
  assert.doesNotMatch(workflow, /git push|Committoi aikaleimat/);
  assert.match(workflow, /permissions:\s+contents: read/);
});
