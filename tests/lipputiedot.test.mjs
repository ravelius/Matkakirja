/*
 * Lippuikkunan eheystarkistus (omistajan tilaus 15.8.2026).
 *
 * Versiolippujen polut ovat käsin kirjoitettuja — kuollut polku
 * näkyisi vasta juuri sitä nappia painamalla. Avainten on myös
 * oltava oikeita Commons-tiedostonimiä (samat kuin kategoria.maaLippu
 * ja paikalliskopiotaulu), tai lippu ei muutu napiksi lainkaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { LIPPUTIEDOT } from '../js/packs/lipputiedot.js';
import { LIPUT_PAIKALLISET } from '../js/packs/liput-paikalliset.js';

const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

test('jokainen versiolippu ja tunnus osoittaa olemassa olevaan tiedostoon', () => {
  for (const [avain, tiedot] of Object.entries(LIPPUTIEDOT)) {
    for (const kohta of [...(tiedot.versiot ?? []), ...(tiedot.tunnukset ?? [])]) {
      assert.ok(existsSync(new URL(`../${kohta.polku}`, import.meta.url)),
        `${avain}/${kohta.nimi}: tiedostoa ${kohta.polku} ei ole`);
      assert.ok(SW.includes(`'./${kohta.polku}'`),
        `${kohta.polku} puuttuu sw.js:n SHELL-listalta`);
    }
    assert.ok(tiedot.maa && (tiedot.kappaleet ?? []).length >= 1,
      `${avain}: maa ja vähintään yksi historia-kappale vaaditaan`);
  }
});

test('avaimet ovat pelin tuntemia lipputiedostoja', () => {
  for (const avain of Object.keys(LIPPUTIEDOT)) {
    assert.ok(LIPUT_PAIKALLISET.has(avain),
      `${avain} ei ole paikalliskopiotaulussa (liput-paikalliset.js) — `
      + 'kategoria.maaLippu ei koskaan osu siihen');
  }
});
