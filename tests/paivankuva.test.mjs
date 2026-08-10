// Päivän kuva tulee omasta kuratoidusta listasta (js/packs/
// paivan-kuvat.js) — Commonsin päivän kuva korvattiin, koska sen
// valintaa ei tehdä pelin yleisölle (omistajan havainto 7.8.2026). Testi
// vahtii listan eheyttä ja päivävalinnan käytöstä: rikkinäinen rivi
// näkyisi pelaajalle tyhjänä kuvana tai lähteettömänä palstana.

import test from 'node:test';
import assert from 'node:assert/strict';

import { PAIVAN_KUVAT, paivanKuva } from '../js/packs/paivan-kuvat.js';

test('jokaisella kuvalla on tiedosto, suomenkielinen teksti ja lähde', () => {
  assert.ok(PAIVAN_KUVAT.length >= 14, 'listassa on oltava vähintään kaksi viikkoa kuvia');
  const nahdyt = new Set();
  for (const kuva of PAIVAN_KUVAT) {
    assert.ok(kuva.tiedosto?.trim(), 'tiedosto puuttuu');
    assert.ok(!nahdyt.has(kuva.tiedosto), `sama kuva kahdesti: ${kuva.tiedosto}`);
    nahdyt.add(kuva.tiedosto);
    assert.ok((kuva.kuvaus ?? '').length >= 30, `kuvaus liian lyhyt: ${kuva.tiedosto}`);
    assert.ok(kuva.tekija?.trim(), `tekijä puuttuu: ${kuva.tiedosto}`);
    assert.ok(kuva.lisenssi?.trim(), `lisenssi puuttuu: ${kuva.tiedosto}`);
  }
});

test('päivämäärä valitsee kuvan: sama koko päivän, eri huomenna', () => {
  const aamu = new Date('2026-08-07T06:00:00');
  const ilta = new Date('2026-08-07T23:59:00');
  const huominen = new Date('2026-08-08T06:00:00');
  assert.equal(paivanKuva(aamu), paivanKuva(ilta));
  assert.notEqual(paivanKuva(aamu), paivanKuva(huominen));
  // Jokainen listan kuva tulee vuorollaan näkyviin.
  const nahdyt = new Set();
  for (let i = 0; i < PAIVAN_KUVAT.length; i++) {
    nahdyt.add(paivanKuva(new Date(aamu.getTime() + i * 86400000)).tiedosto);
  }
  assert.equal(nahdyt.size, PAIVAN_KUVAT.length);
});
