import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AANI_JUURI, HORATIO_TUOTANTO, VERSIOIDUT_HORATIO_AANET,
  aaniUrl, horatioAanenKesto,
} from '../js/media.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

/*
 * Completed-tuotantokuittien exact finalObjectKey + finalAudio-kesto.
 *
 * 14.9.2026: 40 kaupunkia neljästä Horatio–Livia-Eurooppa-erästä
 * (horatio-9c5b6e4dd75608cdbe8e, -91c7e2c997078439dee1,
 * -623e51c1cd57ec159a43, -1c804d7ab293dc259dae). Viisi kaupunkia —
 * sisilia, islanti, alpit, lappi, tromssa — jäi ElevenLabsin kiintiön
 * takia äänittämättä, joten niiden rivit ovat yhä 13.9.2026 kuiteista;
 * myös niiden teksti on pidetty 13.9. asussa (ks. js/media.js).
 */
const ODOTETUT = [
  ['alpit', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 24.346],
  ['amsterdam', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 23.876],
  ['ateena', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 30.929],
  ['barcelona', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 22.047],
  ['bergen', '439bf050af65', 'horatio-91c7e2c997078439dee1', 23.406],
  ['berliini', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 19.958],
  ['budapest', '439bf050af65', 'horatio-91c7e2c997078439dee1', 22.674],
  ['bukarest', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 23.719],
  ['dublin', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 22.753],
  ['dubrovnik', '439bf050af65', 'horatio-91c7e2c997078439dee1', 25.078],
  ['edinburgh', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 22.361],
  ['firenze', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 23.327],
  ['granada', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 22.282],
  ['helsinki', '439bf050af65', 'horatio-91c7e2c997078439dee1', 23.876],
  ['islanti', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 18.051],
  ['istanbul', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 21.081],
  ['kiova', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 19.226],
  ['kobenhavn', '439bf050af65', 'horatio-91c7e2c997078439dee1', 24.921],
  ['krakova', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 21.002],
  ['kreeta', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 17.868],
  ['lappi', '4ac41585d691', 'horatio-8270eb898650a10b5b52', 22.753],
  ['lissabon', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 22.282],
  ['lontoo', '439bf050af65', 'horatio-91c7e2c997078439dee1', 31.948],
  ['madrid', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 24.921],
  ['marseille', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 22.518],
  ['moskova', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 25.469],
  ['odessa', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 17.868],
  ['oslo', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 20.036],
  ['pariisi', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 30.354],
  ['pietari', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 18.129],
  ['praha', '439bf050af65', 'horatio-91c7e2c997078439dee1', 22.988],
  ['riika', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 23.719],
  ['rooma', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 20.846],
  ['sarajevo', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 20.036],
  ['sevilla', '439bf050af65', 'horatio-91c7e2c997078439dee1', 24.529],
  ['sisilia', '787070b96f4c', 'horatio-1d5aa6a08222250d94c8', 25.234],
  ['sofia', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 18.599],
  ['tallinna', '439bf050af65', 'horatio-91c7e2c997078439dee1', 20.036],
  ['tampere', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 24.451],
  ['tromssa', '4ac41585d691', 'horatio-8270eb898650a10b5b52', 22.439],
  ['tukholma', '439bf050af65', 'horatio-91c7e2c997078439dee1', 19.487],
  ['varsova', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 31.556],
  ['venetsia', '439bf050af65', 'horatio-623e51c1cd57ec159a43', 23.327],
  ['vilna', '439bf050af65', 'horatio-1c804d7ab293dc259dae', 22.282],
  ['wien', '6e3a07e879bb', 'horatio-9c5b6e4dd75608cdbe8e', 24.529],
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
