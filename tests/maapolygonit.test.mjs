/*
 * Maatummennuksen aineisto (assets/data/maapolygonit.json).
 *
 * Tiedosto on koneen kirjoittama (tools/generoi-maapolygonit.mjs),
 * joten testit vartioivat niitä EHTOJA, joiden varassa piirtäjä
 * (js/maatummennus.js) toimii — eivät yksittäisiä lukuja:
 *
 *   1. KIERTOSUUNTA. Varjo on kaikkien muiden maiden renkaat yhtenä
 *      polkuna `fill-rule: nonzero` (js/maatummennus.js `muidenPolku`,
 *      omistajan kaappaus 31.8.2026: *"Merta ei tarvitse tummentaa"*).
 *      Nonzero maalaa päällekkäin menevät naapurirajat kerran VAIN jos
 *      renkaat kiertävät samaan suuntaan; vastakkainen rengas kumoaisi
 *      naapurinsa ja jokainen maaraja saisi vaalean raon.
 *   2. KATTAVUUS. Maa, jolle ei ole polygonia, jää tummentamatta ja
 *      lukee kartalla merenä — ja jos polygoni puuttuu NYKYISELTÄ
 *      maalta, koko efekti jää pois.
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
 * Tämä on se väite, jonka varassa `nonzero` on oikein. Jos generaattorin
 * suunnistus (tools/generoi-maapolygonit.mjs `suunnista`) joskus katoaa
 * tai lähde vaihtuu, vika näkyisi kartalla vaaleina rakoina maarajoilla
 * — täällä se näkyy heti.
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
