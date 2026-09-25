/*
 * KAMERALOKI (js/pallolauta/kameraloki.js): korkeuden hyppy > 3× yhdellä
 * kehyksellä kirjataan laukaisijoineen rengaspuskuriin; pienempi liike ei.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const muisti = new Map();
globalThis.localStorage = {
  getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
  setItem: (k, v) => muisti.set(k, String(v)),
  removeItem: (k) => muisti.delete(k),
};

const {
  KAMERALOKI_AVAIN, KAMERALOKI_PITUUS, kameralokiLaukaisija, luoKameraloki,
} = await import('../js/pallolauta/kameraloki.js');

test('laukaisija tunnistetaan kutsupinosta', () => {
  assert.equal(kameralokiLaukaisija('at sovitaSiirtokohteet (lauta.js:1)'), 'sovitaSiirtokohteet');
  assert.equal(kameralokiLaukaisija('at avaaLinssi (linssit.js:9)'), 'linssi');
  assert.equal(kameralokiLaukaisija('at saavu (lauta.js:2)'), 'saapuminen');
  assert.equal(kameralokiLaukaisija('at jokuMuu (x.js:1)'), 'muu kutsupolku');
});

test('hyppy > 3× kirjataan laukaisijoineen, pienempi ei; puskuri pysyy mitassa', () => {
  muisti.clear();
  // Kutsupino luetaan vain kehittäjätilassa (sulavuus, kohta 14).
  muisti.set('matkakirja-kehittaja', '1');
  let kuuntelija = null;
  const pallo = { pointOfView: (...a) => (a.length ? pallo : { altitude: 1 }) };
  const kamera = { ajaKamera: () => Promise.resolve(true) };
  const ui = { game: { cityOf: () => ({ id: 'pariisi' }), phase: 'action' } };
  const loki = luoKameraloki({
    pallo, kamera, ui, kytkeKehys: (_p, _k, k) => { kuuntelija = k; return () => { kuuntelija = null; }; },
  });
  assert.equal(typeof kuuntelija, 'function');
  kuuntelija({ pov: { altitude: 0.2 } });
  kuuntelija({ pov: { altitude: 0.4 } }); // 2× — ei merkintää
  assert.deepEqual(loki.merkinnat(), []);
  // Ohjelmallinen kirjoitus juuri ennen hyppyä → laukaisija pinosta.
  (function sovitaSiirtokohteet() { pallo.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0); }());
  kuuntelija({ pov: { altitude: 2.5 } }); // 6,25× — merkintä
  const m = loki.merkinnat();
  assert.equal(m.length, 1);
  assert.equal(m[0].edellinen, 0.4);
  assert.equal(m[0].uusi, 2.5);
  assert.equal(m[0].laukaisija, 'sovitaSiirtokohteet');
  assert.equal(m[0].kaupunki, 'pariisi');
  assert.equal(m[0].vaihe, 'action');
  assert.ok(JSON.parse(muisti.get(KAMERALOKI_AVAIN)).length === 1, 'localStorage-puskuri puuttuu');
  // Ilman kirjoitusta: kirjaston ele.
  kuuntelija({ pov: { altitude: 0.2 } });
  const viesti = loki.merkinnat().at(-1);
  assert.match(viesti.laukaisija, /käyttäjän ele tai kirjasto|sovitaSiirtokohteet/);
  // Puskuri ei kasva yli pituuden.
  for (let i = 0; i < KAMERALOKI_PITUUS + 5; i += 1) {
    kuuntelija({ pov: { altitude: i % 2 ? 2 : 0.2 } });
  }
  assert.ok(loki.merkinnat().length <= KAMERALOKI_PITUUS);
  loki.pura();
  assert.equal(kuuntelija, null);
  // pointOfView-luku toimii kääreen purkamisen jälkeen kuten ennen.
  assert.equal(pallo.pointOfView().altitude, 1);
});

test('tuotannossa (ei kehittäjätilaa) kutsupinoa ei oteta, kirjoitus kirjataan silti', async () => {
  const { unohdaKehittajaKytkimet } = await import('../js/ui-apurit.js');
  muisti.clear();
  unohdaKehittajaKytkimet();
  let kuuntelija = null;
  const pallo = { pointOfView: (...a) => (a.length ? pallo : { altitude: 1 }) };
  const loki = luoKameraloki({
    pallo, kytkeKehys: (_p, _k, k) => { kuuntelija = k; return () => { kuuntelija = null; }; },
  });
  kuuntelija({ pov: { altitude: 0.2 } });
  (function sovitaSiirtokohteet() { pallo.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0); }());
  kuuntelija({ pov: { altitude: 2.5 } });
  const m = loki.merkinnat();
  assert.equal(m.length, 1);
  assert.match(m[0].laukaisija, /pino vain kehittäjätilassa/);
  assert.equal(m[0].pino, '');
  loki.pura();
  unohdaKehittajaKytkimet();
});
