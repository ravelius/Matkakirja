/*
 * HEROKUVIEN POHJAVIITTEET — attribuutio Commons-viitekuvista.
 *
 * Omistaja 23.9.2026: kaikki 394 kaupunkilehden heroa pidetään. Niistä
 * 60 generoitiin 2–4 Commons-valokuvan pohjalta (tools/hero-ajuri.mjs,
 * `tarkkaKohde`), ja niiden riveillä on kenttä `viitteet`, jonka
 * lähderivi näyttää (js/tekijakortti.js lisaaPohjaviitteet). Viitteet on
 * rekonstruoitu (docs/raportit/herokuvien-viitteet-20260923.md), ja
 * repon viiteloki tools/hero-viiteloki.tsv on niiden lähde.
 *
 * Testi vartioi:
 *   1. jokainen viite on attribuutiokelpoinen: tekijä, lisenssi ja
 *      molempien linkit, eikä NC- tai ND-lisenssiä (maksullinen versio);
 *   2. kenttä on `nimi` eikä `tiedosto` — peilaus (tools/peilaa-media.mjs)
 *      poimii jokaisen `tiedosto:`-kentän ja hakisi viitekuvat ämpäriin;
 *   3. jokainen viite löytyy repon viitelokista, eli attribuutio on
 *      jäljitettävissä eikä keksitty.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';

const JUURI = new URL('..', import.meta.url).pathname;

/** Kaikki olio-solmut, joilla on kenttä `viitteet`. */
function herot(arvo, ulos = [], nahty = new Set()) {
  if (!arvo || typeof arvo !== 'object' || nahty.has(arvo)) return ulos;
  nahty.add(arvo);
  if (Array.isArray(arvo.viitteet)) ulos.push(arvo);
  for (const v of Object.values(arvo)) herot(v, ulos, nahty);
  return ulos;
}

const HEROT = herot(KULTTUURI_KATEGORIAT);
const LOKI = readFileSync(`${JUURI}tools/hero-viiteloki.tsv`, 'utf8')
  .split('\n').filter((r) => r && !r.startsWith('#')).map((r) => r.split('\t'));

test('60 heroa kantaa pohjaviitteet', () => {
  assert.equal(HEROT.length, 60);
  for (const h of HEROT) {
    assert.match(h.ampari ?? '', /^herokoe\/.+\.png$/, 'viitteet vain ämpärin heroilla');
    assert.equal(h.lahde, 'Matkakirjan havainnekuva', h.ampari);
    assert.ok(h.viitteet.length >= 2 && h.viitteet.length <= 4, `${h.ampari}: 2–4 viitettä`);
  }
});

test('jokainen viite on attribuutiokelpoinen eikä NC/ND', () => {
  for (const h of HEROT) {
    for (const v of h.viitteet) {
      const kohta = `${h.ampari}: ${v.nimi}`;
      assert.deepEqual(Object.keys(v).sort(),
        ['lisenssi', 'lisenssiUrl', 'nimi', 'sivu', 'tekija'], kohta);
      assert.ok(v.nimi && !v.nimi.startsWith('File:'), kohta);
      assert.ok(v.tekija && v.tekija.length <= 60, `${kohta}: tekijä puuttuu tai on raakatekstiä`);
      assert.match(v.lisenssi, /^(CC0|Public domain|CC BY(-SA)? [\d.]+( [a-z]{2})?)$/, kohta);
      assert.doesNotMatch(v.lisenssi, /NC|ND/, kohta);
      assert.match(v.lisenssiUrl, /^https:\/\/creativecommons\.org\/(licenses|publicdomain)\//, kohta);
      assert.match(v.sivu, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, kohta);
    }
  }
});

test('viitteissä ei ole tiedosto-kenttää (peilaus ei hae niitä ämpäriin)', () => {
  const lahde = readFileSync(`${JUURI}js/packs/kulttuuri-kategoriat.js`, 'utf8');
  const lohkot = lahde.split(/viitteet: \[/).slice(1).map((l) => l.slice(0, l.indexOf('\n          ],')));
  assert.equal(lohkot.length, 60);
  for (const l of lohkot) assert.doesNotMatch(l, /tiedosto:/);
});

test('jokainen viite löytyy repon viitelokista', () => {
  const rivit = new Set(LOKI.map(([hero, nimi]) => `${hero}\t${nimi.replace(/^File:/, '')}`));
  for (const h of HEROT) {
    const hero = h.ampari.split('/').pop();
    for (const v of h.viitteet) {
      assert.ok(rivit.has(`${hero}\t${v.nimi}`), `${hero}: ${v.nimi} puuttuu lokista`);
    }
  }
});
