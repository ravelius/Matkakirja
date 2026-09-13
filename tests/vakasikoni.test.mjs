/*
 * VÄKÄSIKONI — KOLME LEVEÄÄ V:TÄ, SAMA KAIKKIALLA.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Se kuvake voisi olla
 * muunnos hampurilaisesta niin että viivat ovat kuin kolme leveää v
 * kirjainta päällekkäin. Käytä samaa myös kaikissa linsseissä joissa
 * on oma yläpalkkinsa."*
 *
 * Kuvake piirretään kolmessa paikassa. Kaksi niistä tuo polut
 * js/vakasikoni.js:stä, mutta index.html on staattista HTML:ää eikä voi
 * tuoda mitään — juuri se kopio jäisi jälkeen ensimmäisessä
 * hienosäädössä, ja pelaaja näkisi kaksi eri kuvaketta. Tämä vartioi
 * että ne pysyvät samana.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { VAKASIKONIN_POLUT, vakasikoninSvg } from '../js/vakasikoni.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const HTML = lue('../index.html');
const VAAKA = lue('../js/ylapalkki-vaaka.js');
const LINSSI = lue('../js/aikajana-valikko.js');

test('kuvake on kolme v:tä eikä kolme suoraa viivaa', () => {
  assert.equal(VAKASIKONIN_POLUT.length, 3);
  for (const d of VAKASIKONIN_POLUT) {
    // Kolme pistettä ja keskimmäinen alempana = v. Suora viiva olisi
    // kahden pisteen "h"-muoto, jollainen entinen hampurilainen oli.
    const luvut = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.equal(luvut.length, 6, `polku ei ole kolmipisteinen: ${d}`);
    const [x1, y1, x2, y2, x3, y3] = luvut;
    assert.ok(y2 > y1 && y2 > y3, `keskipiste ei ole alempana: ${d}`);
    assert.equal(y1, y3, `v ei ole symmetrinen: ${d}`);
    assert.ok(x1 < x2 && x2 < x3, `kärjet väärässä järjestyksessä: ${d}`);
    // "Leveä": kärkiväli vähintään puolet 24 px:n ruudusta.
    assert.ok(x3 - x1 >= 12, `v ei ole leveä: ${d}`);
  }
});

test('v-rivit ovat tasavälein ja kuvake on ruudun keskellä', () => {
  const ylat = VAKASIKONIN_POLUT.map((d) => Number(d.match(/-?\d+(?:\.\d+)?/g)[1]));
  const valit = ylat.slice(1).map((y, i) => y - ylat[i]);
  assert.equal(new Set(valit).size, 1, `rivivälit eroavat: ${valit}`);
  const alin = Number(VAKASIKONIN_POLUT.at(-1).match(/-?\d+(?:\.\d+)?/g)[3]);
  assert.equal((ylat[0] + alin) / 2, 12, 'kuvake ei ole 24 × 24 -ruudun keskellä');
});

test('terävä kärki on pyöristetty', () => {
  // Ilman linejoinia v:n kärki piirtyy piikiksi, joka näyttää eri
  // paksuiselta kuin viivan muu osa.
  assert.match(vakasikoninSvg(), /stroke-linejoin="round"/);
  assert.match(HTML, /viiva-ikoni.*?stroke-linejoin="round"/s);
  assert.match(LINSSI, /stroke-linejoin', 'round'/);
});

test('kaikki kolme paikkaa piirtävät saman kuvakkeen', () => {
  for (const d of VAKASIKONIN_POLUT) {
    assert.ok(HTML.includes(`d="${d}"`),
      `index.html ei piirrä samaa polkua: ${d}`);
  }
  // Kaksi muuta tuovat polut moduulista, joten niiltä riittää tuonti.
  assert.match(VAAKA, /from '\.\/vakasikoni\.js'/);
  assert.match(LINSSI, /from '\.\/vakasikoni\.js'/);
});

test('vanhaa hampurilaista ei ole jäljellä missään', () => {
  for (const [nimi, teksti] of [['index.html', HTML], ['ylapalkki-vaaka', VAAKA],
    ['aikajana-valikko', LINSSI]]) {
    assert.equal(teksti.includes('M4.5 7h15'), false,
      `${nimi} piirtää yhä vanhan kolmen viivan kuvakkeen`);
  }
});
