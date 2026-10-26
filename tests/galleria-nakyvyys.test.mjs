/*
 * GALLERIAT NÄKYVÄT PELAAJALLE (Codexin posti 25.9.2026, PR #3163).
 *
 * Aihesivun piirto (js/maalehti.js) lukee `galleria`-kentän vain
 * NOSTOSTA, jolla on oma pääkuva (`tiedosto` tai `osoite`). Kategorian
 * juureen kirjoitettu `galleria` ei tule kenellekään näkyviin, vaikka
 * kuvat olisivat R2:ssa ja lisenssit kunnossa. Vartija estää saman
 * virheen: jokainen galleria kuuluu noston sisään, ja sen nostolla on
 * pääkuva, jonka ympärille selattava galleria piirretään.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';

/** Käy koko taulun läpi ja kutsuu `f(olio, polku)` jokaiselle oliolle. */
function kavele(arvo, f, polku = 'KULTTUURI_KATEGORIAT') {
  if (Array.isArray(arvo)) {
    arvo.forEach((a, i) => kavele(a, f, `${polku}[${i}]`));
  } else if (arvo && typeof arvo === 'object') {
    f(arvo, polku);
    for (const [avain, v] of Object.entries(arvo)) kavele(v, f, `${polku}.${avain}`);
  }
}

test('ei juuritason galleriaa, jota piirto ei lue', () => {
  const huonot = [];
  kavele(KULTTUURI_KATEGORIAT, (olio, polku) => {
    if (Array.isArray(olio.nostot) && olio.galleria) {
      huonot.push(`${polku} (${olio.id ?? '?'}): siirrä galleria kategorian ensimmäiseen nostoon, jolla on pääkuva`);
    }
  });
  assert.deepEqual(huonot, []);
});

test('jokaisella gallerialla varustetulla nostolla on pääkuva', () => {
  const huonot = [];
  let galleriat = 0;
  kavele(KULTTUURI_KATEGORIAT, (olio, polku) => {
    if (!Array.isArray(olio.nostot)) return;
    olio.nostot.forEach((nosto, i) => {
      if (!nosto?.galleria?.length) return;
      galleriat += 1;
      if (!nosto.tiedosto && !nosto.osoite) {
        huonot.push(`${polku}.nostot[${i}] (${nosto.otsikko}): galleria mutta ei pääkuvaa`);
      }
    });
  });
  assert.ok(galleriat > 0, 'yhtään galleriaa ei löytynyt — vartija ei enää katso mitään');
  assert.deepEqual(huonot, []);
});
