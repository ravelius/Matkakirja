/*
 * KARKAAVA NIMI (PT 10.10.2026, Karttasepän tarkistus v656 A2): karttavalon piirtopiste (ankkuri → ladottu)
 * yli 25 km noston omasta pisteestä tai toisen maan sisällä → merkki omaan pisteeseensä, nimiö piiloon.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { KARKAAVA_KM, karkaavaPiirtopiste, rajaaKarkaavatNimet } from '../tools/vienti/karttavalot.mjs';

const nelio = (id, w, s, e, n) => ({ id, bbox: [w, s, e, n], renkaat: [[[w, s], [e, s], [e, n], [w, n], [w, s]]] });
const MAAT = [nelio('AAA', 0, 0, 1, 1), nelio('BBB', 1, 0, 2, 1)];
const kartta = new Map(MAAT.map((m) => [m.id, m]));
const valo = (yli) => ({ id: 'kohde:x', maa: 'AAA', laji: 'historia', lat: 0.5, lon: 0.5, nimio: 'X', ankkuri: null, ladottu: null, ...yli });

test('raja 25 km', () => assert.equal(KARKAAVA_KM, 25));

test('lähellä ja omassa maassa: kunnossa', () => {
  assert.equal(karkaavaPiirtopiste(valo({ ladottu: { lat: 0.6, lon: 0.6 } }), kartta), null);
  assert.equal(karkaavaPiirtopiste(valo({}), kartta), null, 'ei ladottua pistettä');
});

test('yli 25 km: matka; ankkuri voittaa ladotun kuten natiivissa', () => {
  assert.equal(karkaavaPiirtopiste(valo({ ladottu: { lat: 0.5, lon: 0.9 } }), kartta), 'matka', '~44 km');
  assert.equal(karkaavaPiirtopiste(valo({ ankkuri: { lat: 0.5, lon: 0.9 }, ladottu: { lat: 0.5, lon: 0.5 } }), kartta), 'matka');
  assert.equal(karkaavaPiirtopiste(valo({ ankkuri: { lat: 0.5, lon: 0.55 }, ladottu: { lat: 0.5, lon: 0.9 } }), kartta), null);
});

test('toisen maan sisällä alle 25 km: maa', () => {
  assert.equal(karkaavaPiirtopiste(valo({ lon: 0.95, ladottu: { lat: 0.5, lon: 1.05 } }), kartta), 'maa');
});

test('meri, joki ja muut laajat ohi', () => {
  for (const laji of ['meri', 'joki', 'jarvi', 'lahti', 'salmi']) {
    assert.equal(karkaavaPiirtopiste(valo({ laji, ladottu: { lat: 0.5, lon: 1.5 } }), kartta), null, laji);
  }
});

test('oma piste maan ulkopuolella (harvennettu saari): vain matka ratkaisee', () => {
  assert.equal(karkaavaPiirtopiste(valo({ lat: 1.05, lon: 0.95, ladottu: { lat: 0.9, lon: 1.05 } }), kartta), null);
});

test('rajaaKarkaavatNimet nollaa paikat ja nimiön, kortin nimi säilyy', () => {
  const v = [valo({ nimi: 'Kohde X', ladottu: { lat: 0.5, lon: 0.9 }, ankkuri: { lat: 0.5, lon: 0.9 } }), valo({ id: 'kohde:y', ladottu: { lat: 0.51, lon: 0.5 } })];
  assert.deepEqual(rajaaKarkaavatNimet(v, MAAT), { matka: 1, maa: 0 });
  assert.deepEqual([v[0].ankkuri, v[0].ladottu, v[0].nimio, v[0].nimi], [null, null, null, 'Kohde X']);
  assert.equal(v[1].nimio, 'X', 'kunnossa oleva ennallaan');
});
