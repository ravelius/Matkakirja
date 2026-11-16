import test from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLE_KOPINAT, KOPINA_POMPPU, KOPINA_LASKU, TEMPLE_KOPINA_JUURI } from '../js/temple-kopina-aanet.js';
import { AANI_JUURI } from '../js/media.js';

test('Temple-kopina: kuusi ääntä, viisi pomppuun ja yksi laskuun', () => {
  assert.equal(TEMPLE_KOPINAT.length, 6);
  assert.equal(KOPINA_POMPPU.length, 5);
  assert.equal(KOPINA_LASKU.id, 'kopina-lasku');
  assert.equal(new Set(TEMPLE_KOPINAT.map((r) => r.id)).size, 6);
});

test('Temple-kopina: osoitteet ämpärin kansioon, kestot lyhyitä, sha256 kelvollinen', () => {
  assert.equal(TEMPLE_KOPINA_JUURI, `${AANI_JUURI}aanet/temple-nukkekoti-v1/`);
  for (const r of TEMPLE_KOPINAT) {
    assert.ok(r.url.startsWith(TEMPLE_KOPINA_JUURI) && r.url.endsWith('.mp3'), r.id);
    assert.ok(r.kesto > 0.1 && r.kesto < 0.3, `${r.id}: kopina on lyhyt kopsahdus`);
    assert.match(r.sha256, /^[0-9a-f]{64}$/, r.id);
  }
});

test('Temple-kopina: ei askelia eikä musiikkia tiedostoissa', () => {
  for (const r of TEMPLE_KOPINAT) assert.ok(!/askel|musiikki/i.test(r.tiedosto), r.id);
});
