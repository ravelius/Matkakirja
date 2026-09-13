import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AANI_JUURI, HORATIO_TUOTANTO, VERSIOIDUT_HORATIO_AANET,
  aaniUrl, horatioAanenKesto,
} from '../js/media.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

// Kuuden completed-tuotantokuitin exact finalObjectKey + finalAudio-kesto.
const ODOTETUT = [
  ['alpit', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 24.346],
  ['amsterdam', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 22.204],
  ['ateena', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 22.361],
  ['barcelona', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 20.036],
  ['bergen', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 16.039],
  ['berliini', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 22.753],
  ['budapest', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 19.879],
  ['bukarest', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 18.834],
  ['dublin', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 24.686],
  ['dubrovnik', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 22.439],
  ['edinburgh', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 22.204],
  ['firenze', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 21.891],
  ['granada', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 17.633],
  ['helsinki', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 24.529],
  ['islanti', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 18.051],
  ['istanbul', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 17.476],
  ['kiova', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 25.548],
  ['kobenhavn', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 17.084],
  ['krakova', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 23.249],
  ['kreeta', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 23.719],
  ['lappi', '4ac41585d691', 'horatio-8270eb898650a10b5b52', 22.753],
  ['lissabon', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 23.066],
  ['lontoo', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 23.641],
  ['madrid', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 24.268],
  ['marseille', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 23.327],
  ['moskova', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 26.044],
  ['odessa', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 24.268],
  ['oslo', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 15.882],
  ['pariisi', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 23.406],
  ['pietari', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 22.439],
  ['praha', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 23.954],
  ['riika', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 23.171],
  ['rooma', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 20.036],
  ['sarajevo', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 20.271],
  ['sevilla', 'ddd87d1bc43a', 'horatio-45f5631bb111d44e3965', 22.988],
  ['sisilia', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 25.234],
  ['sofia', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 21.394],
  ['tallinna', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 19.958],
  ['tampere', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 23.484],
  ['tromssa', '4ac41585d691', 'horatio-8270eb898650a10b5b52', 22.439],
  ['tukholma', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 19.566],
  ['varsova', '787070b96f4c', 'horatio-060d6943e71f7efb9820', 22.753],
  ['venetsia', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 19.331],
  ['vilna', '4ac41585d691', 'horatio-3aaeabde9b4f5c76a85d', 20.428],
  ['wien', 'ddd87d1bc43a', 'horatio-76d54c364286603fc619', 24.346],
];

test('Horatio-runtime on exact 45/45 completed-kuittien final-avaimissa ja kestoissa', () => {
  assert.equal(ODOTETUT.length, 45);
  assert.equal(new Set(ODOTETUT.map(([id]) => id)).size, 45);
  assert.equal(Object.keys(HORATIO_TUOTANTO).length, 45);
  assert.equal(Object.keys(VERSIOIDUT_HORATIO_AANET).length, 45);

  for (const [id, commit, batch, kesto] of ODOTETUT) {
    const nimi = `puhe-fokus-matkakirja-${id}.mp3`;
    const polku = `audio/versions/horatio/${commit}/${batch}/${nimi}`;
    assert.deepEqual(HORATIO_TUOTANTO[nimi], { polku, kesto }, id);
    assert.equal(VERSIOIDUT_HORATIO_AANET[nimi], polku, id);
    assert.equal(aaniUrl(`assets/audio/${nimi}`), `${AANI_JUURI}${polku}`, id);
    assert.equal(horatioAanenKesto(`assets/audio/${nimi}`), kesto, id);
    assert.equal(horatioAanenKesto(`${AANI_JUURI}${polku}`), kesto, id);
    assert.equal(FOKUSVIRRAT[id]?.matkakirja?.aanite, `assets/audio/${nimi}`, id);
  }
});

test('Horatio-kestohaku ei arvaa muun aanen kestoa', () => {
  assert.equal(horatioAanenKesto('assets/audio/efekti-klik.mp3'), null);
  assert.equal(horatioAanenKesto(null), null);
});
