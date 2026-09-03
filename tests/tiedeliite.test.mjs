/*
 * TIEDELIITE — puhtaat apurit (js/tiedeliite.js) ja linssin datan
 * sopivuus sivuksi. DOM-osuutta ei testata tässä; se katsotaan
 * savukkeella ja kaappauksilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  onTiedeliitteenSivu, tiedeliitteenKuvat, tiedeliitteenNaapurit,
} from '../js/tiedeliite.js';
import { KEKSINNOT } from '../js/linssit/keksinnot.js';

const sivu = (vuosi, lisa = {}) => ({ vuosi, henkilo: `H${vuosi}`, otsikko: `O${vuosi}`, juttu: 'x', ...lisa });

test('sivullinen pysäkki: keksijä jolla on juttu; merkkipaalu ei', () => {
  assert.equal(onTiedeliitteenSivu(sivu(1800)), true);
  assert.equal(onTiedeliitteenSivu({ vuosi: 1873, paalu: true, juttu: 'x' }), false);
  assert.equal(onTiedeliitteenSivu({ vuosi: 1800 }), false);
  assert.equal(onTiedeliitteenSivu(null), false);
});

test('kuvat kolmessa ryhmässä, kuvattomat kentät karsiutuvat', () => {
  const t = {
    kuva: { osoite: 'https://x/a.jpg' },
    kuvaToinen: null,
    kuvaAito: { tiedosto: 'A.jpg' },
    ilmio: { osoite: 'https://x/i.jpg' },
    ilmioLisa: { selite: 'ei lähdettä' },
  };
  const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
  assert.deepEqual(kasvot, [t.kuva, t.kuvaAito]);
  assert.deepEqual(ilmiot, [t.ilmio]);
  assert.deepEqual(tiedeliitteenKuvat({}), { kasvot: [], ilmiot: [] });
});

test('naapurit hyppäävät merkkipaalun yli ja päättyvät -1:een', () => {
  const tapahtumat = [sivu(1), sivu(2), { vuosi: 3, paalu: true }, sivu(4)];
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 0), { edellinen: -1, seuraava: 1 });
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 1), { edellinen: 0, seuraava: 3 });
  assert.deepEqual(tiedeliitteenNaapurit(tapahtumat, 3), { edellinen: 1, seuraava: -1 });
});

test('keksinnöt: jokaisella pysäkillä paitsi paalulla on Tiedeliite-sivu kasvoineen', () => {
  const sivut = KEKSINNOT.filter(onTiedeliitteenSivu);
  assert.equal(sivut.length, KEKSINNOT.length - 1);
  for (const t of sivut) {
    const { kasvot, ilmiot } = tiedeliitteenKuvat(t);
    assert.ok(kasvot.length >= 1, `${t.vuosi} ${t.henkilo}: generoitu muotokuva puuttuu`);
    assert.ok(kasvot[0].osoite?.includes('/muotokuva/'), `${t.vuosi}: ensimmäinen kasvo on generoitu`);
    assert.ok(ilmiot.length >= 1, `${t.vuosi}: ilmiökuva puuttuu`);
  }
  // Ketju kulkee alusta loppuun seuraava-linkkejä pitkin.
  let i = KEKSINNOT.findIndex(onTiedeliitteenSivu);
  let askeleita = 1;
  while (tiedeliitteenNaapurit(KEKSINNOT, i).seuraava >= 0) {
    i = tiedeliitteenNaapurit(KEKSINNOT, i).seuraava;
    askeleita += 1;
  }
  assert.equal(askeleita, sivut.length);
});
