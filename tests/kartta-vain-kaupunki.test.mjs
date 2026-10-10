/*
 * KARTALLA VAIN KAUPUNGIN OMA KAPPALE (omistaja 10.10.2026, PT 11.1x: "karsia kaikki muut paitsi maan oman musiikin.
 * myös tulomusiikit pois … koskee vain kartalla soivia musiikkeja, ei linssi ja peli musiikkeja"; kortti "vain kaupunkien
 * omat kappaleet"). js/kaupunkimusiikki.js KARTTA_VAIN_KAUPUNKI: kartalta pois alueraidat, maanosaraidat, pohjavire,
 * saapumistunnukset ja matkan siirtymäraidat; kaupungista lähtiessä kappale häipyy. Tilaraidat ja linssien raidat ennallaan.
 * Natiivi sama: proto Peli-testit/Testit/KarttaVainKaupunkiTestit.cs. Vanhan ketjun testit kääntävät kytkimen pois.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const { musaPolku } = await import('../js/media.js');
const km = await import('../js/kaupunkimusiikki.js');
const valitsin = await import('../js/musiikkivalitsin.js');
const { KARTTA_VAIN_KAUPUNKI, kaupunginRaidat, kaupunkiraidanTunnus, saapumistunnus } = km;
const { asetaMusiikkitila, musiikkiketju, nollaaMusiikkivalitsin } = valitsin;

const ATEENA = musaPolku(kaupunkiraidanTunnus('ateena'));

test('sääntö päällä: ketjussa vain kaupungin oma kappale ja tilaraidat', () => {
  assert.equal(KARTTA_VAIN_KAUPUNKI, true);
  nollaaMusiikkivalitsin();
  assert.deepEqual(kaupunginRaidat('ateena', 'GRC'), [ATEENA]);
  assert.deepEqual(kaupunginRaidat('sofia', 'BGR'), [], 'ei alue- eikä maanosaraitaa');
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [ATEENA]);
  assert.deepEqual(musiikkiketju('sofia', 'BGR'), [], 'ei pohjavirettä');
  assert.deepEqual(musiikkiketju(null, null), [], 'kartalla matkalla: ei musiikkia');
  asetaMusiikkitila('lehti', true);
  assert.deepEqual(musiikkiketju('sofia', 'BGR'), [musaPolku(valitsin.TILARAIDAT.lehti.tunnus)], 'lehden tilaraita ennallaan');
  nollaaMusiikkivalitsin();
  assert.equal(saapumistunnus('lontoo', 'GBR'), null, 'tulomusiikit pois');
});

test('matkan siirtymäraidat eivät soi, linssin raita soi', async () => {
  const luodut = [];
  globalThis.Audio = class { constructor() { luodut.push(this); this.volume = 1; } addEventListener() {} play() { return Promise.resolve(); } pause() {} removeAttribute() {} };
  globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  const { sfx } = await import('../js/sound.js');
  sfx.enabled = true;
  const siirtyma = await import('../js/siirtymamusiikki.js');
  for (const laji of ['jalan', 'laiva', 'lento']) siirtyma.aloitaSiirtymamusiikki(laji);
  assert.equal(luodut.length, 0, 'siirtymäraita loi soittimen');
  siirtyma.aloitaSiirtymamusiikki('keksinnot');
  assert.equal(luodut.length, 1, 'linssin raita ei soinut');
});

test('kaupungista lähtiessä kappale häipyy (ei raitaa → pohja pois)', async () => {
  const { readFileSync } = await import('node:fs');
  const lahde = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');
  assert.match(lahde, /const polku = pohjanPolku\(cityId, maa\);\s*\/\/[^\n]*\n\s*if \(!polku\) \{ stopPohjaMusiikki\(\); return; \}/);
});

test('aloituslento ilman musiikkia (PT 11.4x: vaskimarssi kuuluu sääntöön)', async () => {
  const { readFileSync } = await import('node:fs');
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(ui, /if \(!KARTTA_VAIN_KAUPUNKI && !this\.reducedMotion && !this\.radioPaalla\(\)\) \{\s*this\.soitaAarreMusiikki\(MATKAN_AIHEET\.aloituslento\);/);
});
