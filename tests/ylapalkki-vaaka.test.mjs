/*
 * ══════════════════════════════════════════════════════════════════
 * YLÄPALKKI PIILOON VAAKAPUHELIMELLA — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Kännykän vaakanäkymässä
 * yläpalkin voisi piilottaa niin että vain kolme päällekköistä väkästä
 * näkyy kartalla oik. yläreunassa ja sitä painamalla Yläpalkki tulee
 * näkyviin väliaikaisesti muun sisällön päälle mutta katoaa heti kun
 * pelaaja klikkaa jotain kohtaa palkin ulkopuolelta."*
 *
 * Tämä vartioi sen, mikä on luettavissa ilman selainta: sulkusäännön
 * logiikan ja sen, ettei raja pääse eriytymään kahteen paikkaan.
 * Todellinen asettelu mitataan selaimessa
 * (tools/savukkeet/savuke-ylapalkki-vaaka.mjs), jossa on myös vastakoe.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';
import { YLAPALKKI_AUKI, napautusPalkinSisalla } from '../js/ylapalkki-vaaka.js';

const TYYLIT = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
// Kommentit pois: moduulin OMA teksti saa kertoa, missä raja asuu.
const MODUULI = tyhjaaEiKoodi(
  readFileSync(new URL('../js/ylapalkki-vaaka.js', import.meta.url), 'utf8'),
);

/** Kevyt elementtityngä: vain se, mitä sulkusääntö kysyy. */
function tynka(valitsimet) {
  return {
    closest: (kaava) => (valitsimet.some(
      (v) => kaava.split(',').map((o) => o.trim()).includes(v),
    ) ? tynka(valitsimet) : null),
  };
}

test('napautus palkin sisältä ei sulje', () => {
  assert.equal(napautusPalkinSisalla(tynka(['.topbar'])), true);
  assert.equal(napautusPalkinSisalla(tynka(['.ylapalkki-nappi'])), true);
});

test('valikot ja dialogit lasketaan palkin jatkeeksi', () => {
  // Palkista avatut valikot aukeavat sen ULKOPUOLELLE; ilman tätä
  // palkki sulkeutuisi juuri kun pelaaja avaa sieltä jotain.
  assert.equal(napautusPalkinSisalla(tynka(['dialog'])), true);
  assert.equal(napautusPalkinSisalla(tynka(['#paavalikko'])), true);
});

test('napautus kartalta sulkee', () => {
  assert.equal(napautusPalkinSisalla(tynka(['.map-pane'])), false);
  assert.equal(napautusPalkinSisalla(null), false);
  assert.equal(napautusPalkinSisalla({}), false);
});

test('bodyn luokka on sama JS:ssä ja CSS:ssä', () => {
  assert.equal(YLAPALKKI_AUKI, 'ylapalkki-auki');
  assert.match(TYYLIT, /body\.ylapalkki-auki \.topbar/,
    'CSS ei tunne auki-tilaa — nappi ei näyttäisi palkkia');
});

test('raja on yhdessä paikassa: CSS:ssä, ei moduulissa', () => {
  /*
   * Juuri tämä meni aiemmin rikki muissa kokeiluissa: sama
   * taitekohta laskettuna sekä JS:ssä että CSS:ssä eriytyi ajan
   * myötä. Moduuli ei saa mitata ruutua lainkaan.
   */
  assert.match(TYYLIT, /@media \(max-height: 520px\)/,
    'vaakapuhelimen raja puuttuu tyyleistä');
  /*
   * IPAD MOLEMMISSA SUUNNISSA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
   * 43 kohta 9): sama sääntölohko, toinen ehto. Kosketus + iPadin
   * levyinen ruutu — työpöytä on `pointer: fine` eikä osu.
   */
  assert.match(TYYLIT, /\(pointer: coarse\) and \(min-width: 700px\) and \(max-width: 1366px\)/,
    'iPadin raja puuttuu tyyleistä');
  for (const kielletty of ['matchMedia', 'innerHeight', 'innerWidth', '520', '1366']) {
    assert.equal(MODUULI.includes(kielletty), false,
      `moduuli mittaa ruutua itse (${kielletty}) — raja eriytyisi CSS:stä`);
  }
});

test('karttaselite väistyy vasemmalle vain vaaka- ja iPad-näkymässä', () => {
  // Sama yksi sääntölohko hoitaa molemmat rajat: lohko alkaa siitä,
  // mistä vaakapuhelimen ehtokin, ja jatkuu iPadin ehdolla.
  const alku = TYYLIT.indexOf('@media (max-height: 520px),');
  assert.ok(alku > 0, 'sääntölohkoa ei löytynyt tyyleistä');
  const lohko = TYYLIT.slice(alku);
  assert.match(lohko, /\.karttaselite \{ right: 2\.95rem; \}/,
    'selite ei väisty vaakanäkymässä');
});

test('nappi on karttaselitteen kokoinen', () => {
  // Omistajan nimenomainen ehto: "saman korkuinen kuin kartta selite".
  const selite = TYYLIT.match(/\.karttaselite-nappi \{[\s\S]*?\}/)?.[0] ?? '';
  const uusi = TYYLIT.match(/\.ylapalkki-nappi \{[\s\S]*?\}/g)?.at(-1) ?? '';
  for (const mitta of ['height: 2.15rem', 'min-height: 40px']) {
    assert.ok(selite.includes(mitta), `karttaselitteen mitta muuttui: ${mitta}`);
    assert.ok(uusi.includes(mitta), `uusi nappi ei ole saman kokoinen: ${mitta}`);
  }
});
