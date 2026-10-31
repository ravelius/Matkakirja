/*
 * Ihmeen tähden paikka jokaiselle kohdekartan ihmepiirrokselle (Karttaseppä 31.10.2026, KK: Tuileries'n palatsin tähti
 * leijui matalan piirroksen yläpuolella). Selain ei voi mitata ämpärin kuvia, joten paikka tulee etukäteen mitatusta
 * taulusta js/packs/ihmetahdet.js (node tools/mittaa-ihmetahdet.mjs). Uusi ihme ilman riviä = tähti laatikon yläreunaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { MINIATYYRIT } from '../js/packs/miniatyyrit.js';
import { IHMETAHDET } from '../js/packs/ihmetahdet.js';
import { matkakirjanIhme } from '../js/fokuskohteet.js';

test('jokaisella kohdekartan ihmepiirroksella on mitattu tähden paikka', () => {
  const puuttuu = [];
  for (const [kaupunki, taulu] of Object.entries(MINIATYYRIT)) {
    for (const [nimi, arvo] of Object.entries(taulu)) {
      if (matkakirjanIhme(nimi) && !IHMETAHDET[arvo]) puuttuu.push(`${kaupunki}: ${nimi} (${arvo})`);
    }
  }
  assert.deepEqual(puuttuu, [], 'aja node tools/mittaa-ihmetahdet.mjs');
});

test('tähden paikat ovat laatikon sisällä', () => {
  for (const [arvo, [yla, keski]] of Object.entries(IHMETAHDET)) {
    assert.ok(yla >= 0 && yla < 1 && keski > 0 && keski < 1, arvo);
  }
});

test('Tuileries\'n palatsi on ihme, ja sen tähti on matalan piirroksen yläreunassa eikä laatikon kulmassa', () => {
  assert.ok(matkakirjanIhme('Tuileries\'n palatsi'));
  const [yla] = IHMETAHDET[MINIATYYRIT.pariisi['Tuileries\'n palatsi']];
  assert.ok(yla > 0.3, `ylä ${yla}`);
});
