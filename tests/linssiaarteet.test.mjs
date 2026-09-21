/*
 * LINSSIAARTEET-TAULUN VARTIO (js/linssit/aarteet.js, rengas 1,
 * omistaja 21.9.2026). Jokaisen rivin avain on oikea maailmankartan
 * kaupunki-id ja arvo on rekisterin (js/linssit/rekisteri.js) oikea
 * tunnus; sama kaupunki ei anna kahta linssiä eikä sama linssi ole
 * kahdessa kaupungissa; Isoisän linssi (tarinan lahja, ei aarre) ei
 * ole taulussa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LINSSIAARTEET, linssiAarteesta } from '../js/linssit/aarteet.js';

test('LINSSIAARTEET: rengas 1 on 21 riviä, avaimet ja arvot yksilöllisiä ja kelvollisia', () => {
  const rivit = Object.entries(LINSSIAARTEET);
  assert.equal(rivit.length, 21);

  const kaupungit = new Set(packById('maailmankartta').cities.map((c) => c.id));
  const tunnukset = new Set(LINSSIT.map((r) => r.tunnus));

  const avaimet = rivit.map(([k]) => k);
  const arvot = rivit.map(([, v]) => v);
  assert.equal(new Set(avaimet).size, avaimet.length, 'sama kaupunki antaa kaksi linssiä');
  assert.equal(new Set(arvot).size, arvot.length, 'sama linssi kahdessa kaupungissa');

  for (const [kaupunki, tunnus] of rivit) {
    assert.ok(kaupungit.has(kaupunki), `${kaupunki}: ei maailmankartan kaupunki`);
    assert.ok(tunnukset.has(tunnus), `${tunnus}: ei rekisterissä`);
  }
  assert.ok(!arvot.includes('isoisan-linssi'), 'Isoisän linssi on tarinan lahja, ei aarre');
});

test('linssiAarteesta löytää oikean linssin tuotantotaulusta', () => {
  assert.equal(linssiAarteesta('lontoo', 'isoAarre'), 'keksinnot');
  assert.equal(linssiAarteesta('venetsia', 'isoAarre'), 'rooma');
  assert.equal(linssiAarteesta('lontoo', 'pieniAarre'), null);
  assert.equal(linssiAarteesta('helsinki', 'isoAarre'), null, 'ei taulussa');
});
