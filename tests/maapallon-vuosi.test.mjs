/*
 * MAAPALLON VUOSI -LINSSI (js/linssit/maapallon-vuosi.js, Siirtoseppä 28.9.2026): kuukausipohjat, kerrosluettelo,
 * pehmeä häivytys ja canvas-yhdistelmän piirtojärjestys. Ruutu: maapallon-vuosi.html (kuvasarja Päätoimittajalle).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  kuukaudenPohja, kerroksenKuva, lueKerrosluettelo, haivytys, piirtojarjestys, KUUKAUSINIMET, LINSSI, HAIVYTYS_MS,
} from '../js/linssit/maapallon-vuosi.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';

test('kuukausipohjat kiertävät vuoden ympäri', () => {
  assert.equal(kuukaudenPohja(1), 'https://media.matkakirja.app/data/bmng/01-4096.jpg');
  assert.equal(kuukaudenPohja(12, 'x/'), 'x/data/bmng/12-4096.jpg');
  assert.equal(kuukaudenPohja(13, 'x/'), 'x/data/bmng/01-4096.jpg');
  assert.equal(kuukaudenPohja(0, 'x/'), 'x/data/bmng/12-4096.jpg');
  assert.equal(KUUKAUSINIMET[6], 'heinäkuu');
});

test('kerrosluettelo: vain kelvolliset rivit, {kk} kaavaan', () => {
  const { kerrokset, ohitetut } = lueKerrosluettelo({ kerrokset: [
    { tunnus: 'lumi', nimi: 'Lumi', osoite: 'data/maapallon-vuosi/lumi/{kk}.png' },
    { tunnus: 'rikki', nimi: 'Ei kaavaa', osoite: 'data/x.png' },
    null,
  ] });
  assert.deepEqual(kerrokset.map((k) => k.tunnus), ['lumi']);
  assert.equal(ohitetut.length, 2);
  assert.equal(kerroksenKuva(kerrokset[0], 3, 'R/'), 'R/data/maapallon-vuosi/lumi/03.png');
  assert.equal(kerroksenKuva({ osoite: 'https://a.b/{kk}.png' }, 11, 'R/'), 'https://a.b/11.png');
  assert.deepEqual(lueKerrosluettelo(null).kerrokset, []);
});

test('häivytys on pehmeä ja päättyy uuteen kuukauteen', () => {
  assert.deepEqual(haivytys(3, 3, 0), { a: 3, b: 3, t: 1 });
  assert.equal(haivytys(3, 4, 0).t, 0);
  assert.equal(haivytys(3, 4, HAIVYTYS_MS / 2).t, 0.5);
  assert.ok(haivytys(3, 4, HAIVYTYS_MS * 0.1).t < 0.1, 'alku pehmeä');
  assert.equal(haivytys(3, 4, HAIVYTYS_MS * 2).t, 1);
  assert.deepEqual(haivytys(3, 4, 0, 0), { a: 4, b: 4, t: 1 }, 'reduced motion: suoraan');
});

test('piirtojärjestys: pohja, häivytetty pohja, kerros peitolla', () => {
  const [A, B, kA, kB] = ['A', 'B', 'kA', 'kB'];
  assert.deepEqual(piirtojarjestys({ pohjaA: A, pohjaB: A, t: 1 }), [{ kuva: A, alfa: 1 }]);
  assert.deepEqual(piirtojarjestys({ pohjaA: A, pohjaB: A, t: 1, kerrosA: kA, kerrosB: kA, peitto: 0.7 }),
    [{ kuva: A, alfa: 1 }, { kuva: kA, alfa: 0.7 }], 'sama kuukausi: kerros kerran');
  assert.deepEqual(piirtojarjestys({ pohjaA: A, pohjaB: B, t: 0.25, kerrosA: kA, kerrosB: kB, peitto: 0.8 }),
    [{ kuva: A, alfa: 1 }, { kuva: B, alfa: 0.25 }, { kuva: kA, alfa: 0.8 * 0.75 }, { kuva: kB, alfa: 0.8 * 0.25 }]);
  assert.deepEqual(piirtojarjestys({ pohjaA: A, pohjaB: B, t: 1, kerrosA: kA, kerrosB: kB, peitto: 0 }),
    [{ kuva: A, alfa: 1 }, { kuva: B, alfa: 1 }]);
  assert.deepEqual(piirtojarjestys({ pohjaA: A, pohjaB: B, t: 0.5, kerrosA: null, kerrosB: kB, peitto: 1 }).at(-1), { kuva: kB, alfa: 0.5 }, 'puuttuva vanha kerros: uusi häivyttyy sisään');
});

test('linssi on rekisterissä hiomassa (ei pelaajille) ja kuvaus täydellinen', () => {
  const rivi = LINSSIT.find((r) => r.tunnus === 'maapallon-vuosi');
  assert.equal(rivi?.tila, 'hiomassa');
  assert.equal(rivi.tuo, undefined, 'ei tuontia: moottori ei tarjoa linssiä');
  for (const k of ['tunnus', 'nimi', 'lyhyt', 'ikoni', 'laudat', 'lahde']) assert.ok(LINSSI[k], k);
  assert.equal(LINSSI.tunnus, rivi.tunnus);
});
