/*
 * Maan ääriviivan aineisto (assets/data/maapolygonit.json).
 *
 * Tiedosto on koneen kirjoittama (tools/generoi-maapolygonit.mjs),
 * joten testit vartioivat niitä EHTOJA, joiden varassa piirtäjä
 * (js/maatummennus.js) toimii — eivät yksittäisiä lukuja:
 *
 *   1. KIERTOSUUNTA. Aineiston yhtenäinen suunnistus
 *      (tools/generoi-maapolygonit.mjs `suunnista`) oli ehto
 *      naapurivarjon `fill-rule: nonzero` -täytölle. Varjo poistui
 *      2.9.2026 (omistaja: *"Jätetään pelkkä vahvistettu kartan
 *      ääriviiva jäljelle"*), joten väite ei enää vartioi piirtoa vaan
 *      AINEISTON EHEYTTÄ: vastakkaiseen suuntaan kiertävä rengas on
 *      merkki siitä, että generaattori tai lähde on vaihtunut alta.
 *   2. KATTAVUUS. Maa, jolle ei ole polygonia, jää ilman vahvistettua
 *      ääriviivaa — ja jos polygoni puuttuu NYKYISELTÄ maalta, koko
 *      efekti jää pois.
 *   3. MUOTO. Purku on yksi silmukka ilman tarkistuksia, joten
 *      renkaan pituuden on oltava parillinen ja vähintään kolmion
 *      verran pisteitä.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const data = JSON.parse(readFileSync(join(JUURI, 'assets/data/maapolygonit.json'), 'utf8'));

/** Deltakoodattu rengas takaisin pisteiksi (js/maatummennus.js maanPolku). */
function pura(r) {
  const pisteet = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < r.length; i += 2) {
    x = i ? x + r[i] : r[i];
    y = i ? y + r[i + 1] : r[i + 1];
    pisteet.push([x, y]);
  }
  return pisteet;
}

/** Kenkänauhakaava: etumerkki kertoo kiertosuunnan. */
function pinta(pisteet) {
  let a = 0;
  for (let i = 0; i < pisteet.length; i++) {
    const p = pisteet[i];
    const q = pisteet[(i + 1) % pisteet.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

test('meta kertoo tarkkuuden, laudan mitat ja lähteen', () => {
  assert.ok(data.tarkkuus > 0, 'tarkkuus puuttuu — purku jakaa sillä');
  assert.ok(data.lauta?.leveys > 0, 'laudan leveys puuttuu — sauman monistus tarvitsee sen');
  assert.match(data.lahde, /Natural Earth/i);
});

test('pelin jokaiselle maalle on polygoni', async () => {
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  const puuttuu = Object.keys(MAAILMANKARTTA.map.countryShapes).filter((m) => !data.maat[m]?.length);
  assert.deepEqual(puuttuu, [], 'pelin maita ilman polygonia');
});

test('renkaat ovat parillisia ja vähintään kolmioita', () => {
  for (const [iso, renkaat] of Object.entries(data.maat)) {
    assert.ok(renkaat.length > 0, `${iso}: tyhjä maa`);
    for (const r of renkaat) {
      assert.equal(r.length % 2, 0, `${iso}: pariton rengas (${r.length} lukua)`);
      assert.ok(r.length >= 8, `${iso}: alle nelipisteinen rengas (${r.length / 2} pistettä)`);
    }
  }
});

/*
 * Aineiston eheysväite (ks. tiedoston alku, kohta 1). Nonzero-täyttöä ei
 * enää ole, mutta suunnistuksen katoaminen kertoisi yhä siitä, että
 * generaattori tai lähde on vaihtunut alta — täällä se näkyy heti.
 */
test('kaikki renkaat kiertävät samaan suuntaan', () => {
  const vaarin = [];
  let renkaita = 0;
  for (const [iso, renkaat] of Object.entries(data.maat)) {
    for (const r of renkaat) {
      renkaita += 1;
      if (pinta(pura(r)) <= 0) vaarin.push(iso);
    }
  }
  assert.ok(renkaita > 1000, `renkaita vain ${renkaita} — aineisto näyttää typistyneen`);
  assert.deepEqual([...new Set(vaarin)], [], 'vastakkaiseen suuntaan kiertäviä renkaita');
});
