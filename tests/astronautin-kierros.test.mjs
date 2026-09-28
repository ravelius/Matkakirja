import test from 'node:test';
import assert from 'node:assert/strict';
import { etaisyys, laskeKierros, naapuri } from '../js/linssit/astronautin-kierros.js';
import { SATELLIITTI_KOHTEET, SATELLIITTI_KIERROS } from '../js/linssit/satelliitti-data.js';

const kohde = (tunnus, lat, lon, kuvia = 1) => ({ tunnus, lat, lon, havainnot: Array(kuvia).fill({}) });

test('aineiston kierros on laskennan tulos (aja tools/laske-astronautin-kierros.mjs, jos kohteet muuttuivat)', () => {
  assert.deepEqual(SATELLIITTI_KIERROS, laskeKierros(SATELLIITTI_KOHTEET));
});

test('kierroksella on jokainen kuvallinen kohde täsmälleen kerran', () => {
  const kuvalliset = SATELLIITTI_KOHTEET.filter((k) => k.havainnot?.length).map((k) => k.tunnus);
  assert.equal(new Set(SATELLIITTI_KIERROS).size, SATELLIITTI_KIERROS.length);
  assert.deepEqual([...SATELLIITTI_KIERROS].sort(), [...kuvalliset].sort());
});

test('kierros alkaa läntisimmästä ja kulkee myötäpäivään (pohjoisempi naapuri ensin)', () => {
  const m = new Map(SATELLIITTI_KOHTEET.map((k) => [k.tunnus, k]));
  const lantisin = SATELLIITTI_KOHTEET.filter((k) => k.havainnot?.length)
    .reduce((a, b) => (b.lon < a.lon ? b : a));
  assert.equal(SATELLIITTI_KIERROS[0], lantisin.tunnus);
  assert.ok(m.get(SATELLIITTI_KIERROS[1]).lat >= m.get(SATELLIITTI_KIERROS.at(-1)).lat);
});

test('yksikään askel ei ole puolta maapalloa, ja keskimääräinen askel on lyhyt', () => {
  const m = new Map(SATELLIITTI_KOHTEET.map((k) => [k.tunnus, k]));
  const askeleet = SATELLIITTI_KIERROS.map((t, i) => {
    const a = m.get(t);
    const b = m.get(SATELLIITTI_KIERROS[(i + 1) % SATELLIITTI_KIERROS.length]);
    return etaisyys(a.lat, a.lon, b.lat, b.lon);
  });
  assert.ok(Math.max(...askeleet) < Math.PI / 2, `pisin askel ${Math.max(...askeleet)}`);
  assert.ok(askeleet.reduce((s, x) => s + x, 0) / askeleet.length < 0.25);
});

test('2-opt suoristaa ristikkäiset hypyt ja kohteet ilman kuvaa tai paikkaa jäävät pois', () => {
  const kierros = laskeKierros([
    kohde('a', 0, 0), kohde('b', 0, 10), kohde('c', 10, 10), kohde('d', 10, 0),
    kohde('tyhja', 5, 5, 0), { tunnus: 'paikaton', havainnot: [{}] },
  ]);
  assert.deepEqual(kierros, ['a', 'd', 'c', 'b']);
});

test('naapuri kiertää ympäri molempiin suuntiin', () => {
  const k = ['a', 'b', 'c'];
  assert.equal(naapuri(k, 'c', 1), 'a');
  assert.equal(naapuri(k, 'a', -1), 'c');
  assert.equal(naapuri(k, 'b', 1), 'c');
  assert.equal(naapuri(k, 'x', 1), null);
  assert.equal(naapuri(k, 'a', 0), null);
});
