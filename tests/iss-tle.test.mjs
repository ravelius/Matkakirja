// ISS-TLE ämpäriin (tools/iss-tle.mjs, Siirtoseppä 26.9.2026). Ei verkkoa: CelesTrakin vastaus 26.9.2026.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { jasennaTle, tarkistussumma, tleJson, LAHDE } from '../tools/iss-tle.mjs';

const VASTAUS = 'ISS (ZARYA)             \r\n'
  + '1 25544U 98067A   26269.01266414  .00010261  00000+0  19655-3 0  9997\r\n'
  + '2 25544  51.6303 161.0895 0007829 186.0461 174.0434 15.48628597587381\r\n';

test('iss-tle: CelesTrakin vastaus jäsentyy ja tarkistussummat täsmäävät', () => {
  const t = jasennaTle(VASTAUS);
  assert.equal(t.nimi, 'ISS (ZARYA)');
  assert.ok(t.rivi1.startsWith('1 25544U') && t.rivi1.length === 69);
  assert.ok(t.rivi2.startsWith('2 25544') && t.rivi2.length === 69);
  assert.equal(tarkistussumma(t.rivi1), 7);
  assert.equal(tarkistussumma(t.rivi2), 1);
});

test('iss-tle: viallinen vastaus hylätään (ämpäriin jää edellinen)', () => {
  const [n, r1, r2] = VASTAUS.split('\r\n');
  assert.throws(() => jasennaTle(''), /3 riviä/);
  assert.throws(() => jasennaTle('<html>Error</html>'), /3 riviä/);
  assert.throws(() => jasennaTle([n, r1.slice(0, 68) + '0', r2].join('\n')), /tarkistussumma/);
  assert.throws(() => jasennaTle([n, r1.replace('25544', '25545'), r2].join('\n')), /NORAD/);
});

test('iss-tle: julkaistava JSON Linssisepän muodossa', () => {
  const d = JSON.parse(tleJson(jasennaTle(VASTAUS), new Date('2026-09-26T12:00:00Z')));
  assert.deepEqual(Object.keys(d), ['nimi', 'rivi1', 'rivi2', 'haettu', 'lahde']);
  assert.equal(d.haettu, '2026-09-26T12:00:00.000Z');
  assert.equal(d.lahde, LAHDE);
});
