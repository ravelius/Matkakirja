import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LIVIAN_ASTRONAUTTI_KYPARA,
  LIVIAN_ASTRONAUTTI_LUOKKA,
  asennaLivianAstronauttitila,
} from '../js/livia-astronautti.js';
import { livianSvgAsento, livianSvgKuva } from '../js/livia-svg.js';

function dokumentti(alku = []) {
  const luokat = new Set(alku);
  return { luokat, doc: { body: { classList: {
    add: n => luokat.add(n),
    remove: n => luokat.delete(n),
    contains: n => luokat.has(n),
  } } } };
}

test('astronauttikahva omistaa vain itse lisäämänsä body-luokan', () => {
  const a = dokumentti();
  const kahva = asennaLivianAstronauttitila(a.doc);
  assert.equal(kahva.paalla(), true);
  assert.equal(a.luokat.has(LIVIAN_ASTRONAUTTI_LUOKKA), true);
  kahva.pura();
  kahva.pura();
  assert.equal(a.luokat.has(LIVIAN_ASTRONAUTTI_LUOKKA), false);

  const b = dokumentti([LIVIAN_ASTRONAUTTI_LUOKKA]);
  asennaLivianAstronauttitila(b.doc).pura();
  assert.equal(b.luokat.has(LIVIAN_ASTRONAUTTI_LUOKKA), true);
});

test('kypärä on 2x RGBA-PNG', () => {
  const polku = new URL(`..${LIVIAN_ASTRONAUTTI_KYPARA}`, import.meta.url);
  const png = readFileSync(polku);
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 192);
  assert.equal(png.readUInt32BE(20), 192);
  assert.equal(png[25], 6, 'PNG:n värityypin pitää olla RGBA');
  assert.ok(png.length > 10_000, 'kuva jäi tyhjäksi tai rikkoutui');
});

test('sama SVG-paperinukke saa kypärän vain astronauttitilassa', () => {
  const lepo = livianSvgAsento('expert', .5);
  assert.doesNotMatch(livianSvgKuva(lepo), /data-part="astronautti-kypara"/);
  const asussa = livianSvgKuva({ ...lepo, astronautti: true });
  assert.match(asussa, /data-part="astronautti-kypara"/);
  assert.ok(asussa.includes(`href="${LIVIAN_ASTRONAUTTI_KYPARA}"`));
  assert.match(asussa, /data-part="head"/);
});

test('uusi moduuli ja kuva kuuluvat offline- ja standalone-pakettiin', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  const build = readFileSync(new URL('../tools/build-standalone.mjs', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/livia-astronautti.js'"));
  assert.ok(sw.includes("'./assets/livia/livia-astronauttikypara-2x.png'"));
  assert.ok(build.includes("'js/livia-astronautti.js'"));
});

test('minipulu pukee saman kypärän kuin kokopulu (20.9.2026)', () => {
  /*
   * Codexin asu luetaan bodyn luokasta (js/livia-eleet.js), mutta
   * minipulu rakentaa SVG-asentonsa itse. Ilman tätä valokuvanäkymässä
   * kuplan pulu oli astronautti ja kulman minipulu paljain päin.
   */
  const lahde = readFileSync(new URL('../js/minipulu.js', import.meta.url), 'utf8');
  assert.match(lahde, /import \{ LIVIAN_ASTRONAUTTI_LUOKKA \} from '\.\/livia-astronautti\.js';/);
  assert.match(lahde, /s\.astronautti = Boolean\(doc\?\.body\?\.classList\?\.contains\?\.\(LIVIAN_ASTRONAUTTI_LUOKKA\)\);/);
});
