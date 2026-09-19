import test from 'node:test';
import assert from 'node:assert/strict';
import { IHMISEN_MATKA } from '../js/linssit/ihmisen-matka-data.js';
import {
  IHMISEN_MATKAN_KYSYMYKSET,
  haeIhmisenMatkanKysymykset,
  haeIhmisenMatkanVastaus,
} from '../js/linssit/ihmisen-matka-kysymykset.js';

test('jokaisella IHMISEN_MATKA-pääjaksolla on täsmälleen kolme kysymystä', () => {
  for (const pysakki of IHMISEN_MATKA) {
    const kysymykset = haeIhmisenMatkanKysymykset(pysakki.tunnus);
    assert.equal(
      kysymykset.length,
      3,
      `jaksolla ${pysakki.tunnus} pitäisi olla 3 kysymystä, oli ${kysymykset.length}`,
    );
    for (const kysymys of kysymykset) {
      assert.equal(typeof kysymys, 'string');
      assert.ok(kysymys.trim().length > 0, `jakson ${pysakki.tunnus} kysymys on tyhjä`);
    }
  }
});

test('jokaiselle kysymykselle löytyy vastaus lähteineen', () => {
  for (const pysakki of IHMISEN_MATKA) {
    const kysymykset = haeIhmisenMatkanKysymykset(pysakki.tunnus);
    for (const kysymys of kysymykset) {
      const vastaus = haeIhmisenMatkanVastaus(pysakki.tunnus, kysymys);
      assert.ok(vastaus, `jakson ${pysakki.tunnus} kysymykselle "${kysymys}" ei löytynyt vastausta`);

      assert.equal(typeof vastaus.vastaus, 'string');
      const pituus = vastaus.vastaus.trim().length;
      assert.ok(
        pituus >= 80 && pituus <= 600,
        `jakson ${pysakki.tunnus} vastaus "${kysymys}" on väärän mittainen (${pituus} merkkiä)`,
      );

      assert.ok(Array.isArray(vastaus.lahteet), `jakson ${pysakki.tunnus} vastauksella ei ole lahteet-taulukkoa`);
      assert.ok(
        vastaus.lahteet.length >= 1 && vastaus.lahteet.length <= 2,
        `jakson ${pysakki.tunnus} vastauksella on väärä määrä lähteitä (${vastaus.lahteet.length})`,
      );
      for (const lahde of vastaus.lahteet) {
        assert.equal(typeof lahde.url, 'string');
        assert.ok(lahde.url.startsWith('https://'), `jakson ${pysakki.tunnus} lähteen url ei ala https://: ${lahde.url}`);
        assert.equal(typeof lahde.title, 'string');
        assert.ok(lahde.title.trim().length > 0, `jakson ${pysakki.tunnus} lähteen title on tyhjä`);
      }
    }
  }
});

test('tuntemattomalle tunnukselle ei anneta kysymyksiä eikä vastausta', () => {
  assert.deepEqual(haeIhmisenMatkanKysymykset('ei-ole-olemassa'), []);
  assert.equal(haeIhmisenMatkanVastaus('ei-ole-olemassa', 'Mitä tahansa?'), null);
});

test('kysymykset-tiedoston avaimet kattavat täsmälleen kaikki pääjaksot, ei enempää eikä vähempää', () => {
  const mainTunnukset = new Set(IHMISEN_MATKA.map(p => p.tunnus));
  const kysTunnukset = new Set(Object.keys(IHMISEN_MATKAN_KYSYMYKSET));
  assert.equal(kysTunnukset.size, mainTunnukset.size);
  for (const tunnus of mainTunnukset) assert.ok(kysTunnukset.has(tunnus), `${tunnus} puuttuu kysymystiedostosta`);
  for (const tunnus of kysTunnukset) assert.ok(mainTunnukset.has(tunnus), `${tunnus} on kysymystiedostossa mutta ei pääjaksona`);
});
