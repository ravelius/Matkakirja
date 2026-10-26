/*
 * ══════════════════════════════════════════════════════════════════
 * VAAKATILASSA EI YLÄPALKKIA: HAMPURILAINEN AVAA PÄÄVALIKON NAPIN PÄÄLLE — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistaja 2.10.2026 klo 23.07: *"tajusin että vaakatilassa ei tarvita koko yläpalkkia. nappi voisi avata suoraan
 * valikon napin päälle, koska valikossa näkyy nyt kaikki tarvittavat tiedot. eli poista palkki kokonaan ja avaa
 * valikko suoraan napin päälle"* (kumoaa 13.9.2026 väliaikaisen palkin). Asettelu mitataan selaimessa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';
import { PAAVALIKKO_NAPILTA, PAAVALIKKO_AUKI } from '../js/ylapalkki-vaaka.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const TYYLIT = lue('../css/styles.css');
const MAIN = lue('../js/main.js');
const PANEELI = lue('../js/pilleri-paneeli.js');
// Kommentit pois: moduulin OMA teksti saa kertoa, missä raja asuu.
const MODUULI = tyhjaaEiKoodi(lue('../js/ylapalkki-vaaka.js'));
const LOHKO = (() => {
  const alku = TYYLIT.indexOf('@media (orientation: landscape) and (max-height: 520px),\n  (orientation: landscape) and (pointer: coarse)');
  return alku > 0 ? TYYLIT.slice(alku, TYYLIT.indexOf('\n}\n', alku)) : '';
})();

test('nappi avaa päävalikon tapahtumalla; main.js omistaa valikon ja laskee napin sisäpuolelle', () => {
  assert.equal(PAAVALIKKO_NAPILTA, 'matkakirja-paavalikko-napilta');
  assert.match(MAIN, /document\.addEventListener\(PAAVALIKKO_NAPILTA, \(tapahtuma\) => \{\s*const lahde = tapahtuma\.detail\?\.lahde \?\? menuBtn;\s*if \(paavalikko\.hidden\) avaaPaavalikko\(lahde\); else suljeValikko\(lahde\);/);
  // Napin pointerdown ei saa sulkea valikkoa juuri ennen kuin sen click avaa sen.
  assert.match(MAIN, /closest\?\.\('\.valikko-kotelo, #turn-pill, #paavalikko, \.ylapalkki-nappi'\)/);
  // Palkin avaus ja sen luokka ovat poissa.
  assert.equal(MODUULI.includes('ylapalkki-auki'), false);
  assert.equal(TYYLIT.includes('body.ylapalkki-auki'), false);
});

test('ei yläpalkkia: nollakorkuinen ja näkymätön, vain päävalikko näkyy; ei transformia (fixed-paneeli)', () => {
  assert.ok(LOHKO, 'vaakatilan sääntölohkoa ei löytynyt');
  assert.match(LOHKO, /\.topbar \{[^}]*height: 0;[^}]*visibility: hidden;[^}]*pointer-events: none;/);
  assert.equal(/\.topbar \{[^}]*transform/.test(LOHKO), false);
  assert.match(LOHKO, /\.topbar \.paavalikko \{\s*visibility: visible;\s*pointer-events: auto;/);
});

test('valikko avautuu napin päälle: yläreuna napin yläreunaan, oikea reuna napin oikeaan reunaan', () => {
  assert.match(PANEELI, /const nappi = document\.querySelector\('\.ylapalkki-nappi'\);/);
  assert.match(PANEELI, /--tk-paneeli-yla', `calc\(\$\{Math\.round\(nappiRect\.top\)\}px - var\(--tk-vali-s\)\)`/);
  assert.match(PANEELI, /--tk-paneeli-oikea', `\$\{Math\.round\(window\.innerWidth - nappiRect\.right\)\}px`/);
  assert.match(LOHKO, /\.paavalikko\.tk-paneeli--paikallaan \{ right: var\(--tk-paneeli-oikea, 0px\); \}/);
});

test('valikko Pulun päällä: hahmo väistyy auki olevan valikon ajaksi', () => {
  assert.equal(PAAVALIKKO_AUKI, 'paavalikko-auki');
  assert.match(LOHKO, /body\.paavalikko-auki \.livia-kasvot-pinta,\s*body\.paavalikko-auki \.pollo-vihje \{\s*visibility: hidden;/);
});

test('raja on yhdessä paikassa: CSS:ssä, ei moduulissa', () => {
  assert.match(TYYLIT, /@media \(orientation: landscape\) and \(max-height: 520px\)/);
  assert.match(TYYLIT, /\(orientation: landscape\) and \(pointer: coarse\) and \(max-width: 1366px\)/);
  for (const kielletty of ['matchMedia', 'innerHeight', '520', '1366']) {
    assert.equal(MODUULI.includes(kielletty), false, `moduuli mittaa ruutua itse (${kielletty})`);
  }
});

test('nappi on karttaselitteen kokoinen ja selite väistyy vasemmalle', () => {
  const selite = TYYLIT.match(/\.karttaselite-nappi \{[\s\S]*?\}/)?.[0] ?? '';
  const uusi = TYYLIT.match(/\.ylapalkki-nappi \{[\s\S]*?\}/g)?.at(-1) ?? '';
  for (const mitta of ['height: 2.15rem', 'min-height: 40px']) {
    assert.ok(selite.includes(mitta), `karttaselitteen mitta muuttui: ${mitta}`);
    assert.ok(uusi.includes(mitta), `nappi ei ole saman kokoinen: ${mitta}`);
  }
  assert.match(LOHKO, /\.karttaselite \{ right: 2\.95rem; \}/);
});
