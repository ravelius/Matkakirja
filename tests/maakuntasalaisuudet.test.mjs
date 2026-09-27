/*
 * Maakunnan salaisuuksien eheys (elävä kartta, 26.9.2026): hakemiston
 * (js/packs/maakuntasalaisuudet.js) avaimet ovat MAAKUNNAT_KAIKKI-avaimia,
 * hakemisto ja maan pakka viittaavat toisiinsa täsmälleen, tunnukset eivät
 * törmää tavallisiin nostoihin, ja jokainen rivi on skeeman (1.45) mukainen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { MAAKUNTASALAISUUDET } from '../js/packs/maakuntasalaisuudet.js';
import { MAAKUNTASALAISUUDET_GRC } from '../js/packs/maakuntasalaisuudet-grc.js';
import { MAAKUNNAT_KAIKKI } from '../js/packs/maakunnat-nimet.js';
import { NOSTOANKKURIT_GRC } from '../js/packs/nostoankkurit-grc.js';

const TYYPIT = ['historia', 'kulttuuri', 'luonto', 'tekniikka', 'ruoka', 'kauppa', 'elain',
  'urheilu', 'saari', 'vuori', 'jarvi', 'joki', 'meri'];

const grcAvaimet = Object.keys(MAAKUNTASALAISUUDET).filter((k) => k.startsWith('GRC:'));

test('GRC: täsmälleen 14 avainta, kaikki GRC:+MAAKUNNAT_KAIKKI.GRC-avaimia', () => {
  assert.equal(grcAvaimet.length, 14);
  const odotetut = Object.keys(MAAKUNNAT_KAIKKI.GRC).map((m) => `GRC:${m}`).sort();
  assert.deepEqual([...grcAvaimet].sort(), odotetut);
});

test('GRC: hakemisto ja pakka viittaavat toisiinsa, tunnukset uniikit eivätkä törmää nostoihin', () => {
  const arvot = grcAvaimet.map((k) => MAAKUNTASALAISUUDET[k]);
  assert.equal(new Set(arvot).size, arvot.length, 'tunnus toistuu hakemistossa');
  for (const id of arvot) assert.ok(id in MAAKUNTASALAISUUDET_GRC, `${id} puuttuu pakasta`);
  for (const id of Object.keys(MAAKUNTASALAISUUDET_GRC)) {
    assert.ok(arvot.includes(id), `${id} puuttuu hakemistosta`);
    assert.match(id, /^nosto:salaisuus-[a-z0-9-]+$/);
    assert.ok(!(id in NOSTOANKKURIT_GRC), `${id} törmää nostoankkuriin`);
  }
});

test('GRC: rivit ovat skeeman mukaisia (lyhyt, sijainti, tyyppi, maakunta)', () => {
  for (const avain of grcAvaimet) {
    const id = MAAKUNTASALAISUUDET[avain];
    const r = MAAKUNTASALAISUUDET_GRC[id];
    assert.equal(`GRC:${r.maakunta}`, avain, `${id}: maakunta-kenttä ei täsmää`);
    assert.ok(TYYPIT.includes(r.tyyppi), `${id}: tyyppi ${r.tyyppi}`);
    assert.ok(r.lyhyt.length > 0 && r.lyhyt.length <= 160, `${id}: lyhyt ${r.lyhyt.length} merkkiä`);
    assert.ok(r.nimio && r.nimio.length <= 18, `${id}: nimio ${r.nimio?.length} merkkiä (raja 18, pääkartan nimiö)`);
    assert.ok(r.lat >= 34 && r.lat <= 42, `${id}: lat ${r.lat}`);
    assert.ok(r.lng >= 19 && r.lng <= 30, `${id}: lng ${r.lng}`);
    for (const k of ['nimi', 'teksti', 'nappi', 'lahde', 'miksiSalaisuus']) {
      assert.equal(typeof r[k], 'string', `${id}: ${k}`);
      assert.ok(r[k].length > 0, `${id}: ${k} tyhjä`);
    }
  }
});
