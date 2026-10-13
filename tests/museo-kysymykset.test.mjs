import test from 'node:test';
import assert from 'node:assert/strict';
import { MUSEO_KYSYMYKSET } from '../js/linssit/museo-kysymykset.js';

test('museokysymykset: jokaisella avaimella kaksi lyhyttä kysymystä ja niiden vastaukset lähteineen', () => {
  const avaimet = Object.keys(MUSEO_KYSYMYKSET);
  assert.ok(avaimet.includes("_museo"), "yleiset museokysymykset puuttuvat");
  assert.equal(avaimet.length, 65, "64 teosta + _museo");
  for (const avain of avaimet) {
    const rivi = MUSEO_KYSYMYKSET[avain];
    assert.equal(rivi.kysymykset.length, 2, avain);
    assert.equal(new Set(rivi.kysymykset).size, 2, avain);
    assert.deepEqual(rivi.vastaukset.map((v) => v.kysymys), rivi.kysymykset, `${avain}: kysymysteksti sama listassa ja vastauksissa`);
    for (const kysymys of rivi.kysymykset) {
      assert.ok([...kysymys].length <= 60, `${avain}: kysymys liian pitkä`);
      assert.ok(kysymys.endsWith('?'), `${avain}: kysymys ilman kysymysmerkkiä`);
    }
    for (const v of rivi.vastaukset) {
      assert.ok(v.vastaus.length > 80 && v.vastaus.length <= 600, `${avain}: vastauksen pituus`);
      assert.ok(!/(^|[.!?]\s)museon mukaan/i.test(v.vastaus), `${avain}: pelkkä "museon mukaan" ilman museon nimeä`);
      assert.ok(v.lahteet.length >= 1 && v.lahteet.length <= 3, `${avain}: lähteitä 1–3`);
      for (const l of v.lahteet) {
        assert.match(l.url, /^https:\/\//, avain);
        assert.ok(l.title.length > 3, avain);
      }
    }
  }
});
