/*
 * VÄKÄSIKONI — KOLME LEVEÄÄ V:TÄ, SAMA KAIKKIALLA.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Se kuvake voisi olla
 * muunnos hampurilaisesta niin että viivat ovat kuin kolme leveää v
 * kirjainta päällekkäin. Käytä samaa myös kaikissa linsseissä joissa
 * on oma yläpalkkinsa."*
 *
 * TÄSMENNYS 14.9.2026, omistaja sanatarkasti: *"Hampurilaisen ikonin
 * voi vaihtaa alkuperaiseen mutta jata nykyinen iPhonen vaaka tilaa
 * varten kayttoon silloin kun Ylapalkki on piilossa"*.
 *
 * Väkäsikoni jäi siis KAHTEEN paikkaan, ja molemmat tuovat polut
 * js/vakasikoni.js:stä: vaakapuhelimen yläpalkkinappi
 * (js/ylapalkki-vaaka.js, näkyy media-kyselyllä max-height 520px, eli
 * täsmälleen silloin kun yläpalkki on piilossa) ja linssien oma valikko
 * (js/aikajana-valikko.js). Pelin oma päävalikon nappi (index.html
 * #menu-btn) palasi alkuperäiseen kolmeen suoraan viivaan — se ASUU
 * yläpalkissa, joten se ei koskaan näy silloin kun palkki on piilossa,
 * eikä ehtoa tarvita.
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
  assert.match(LINSSI, /stroke-linejoin', 'round'/);
});

test('molemmat väkäspaikat tuovat polut samasta moduulista', () => {
  assert.match(VAAKA, /from '\.\/vakasikoni\.js'/);
  assert.match(LINSSI, /from '\.\/vakasikoni\.js'/);
});

test('väkäsiä ei ole päävalikon napissa', () => {
  // Väkäset kuuluvat vain sinne, missä yläpalkki on piilossa. Jos
  // jokin väkäspolku vuotaa index.html:ään, päävalikon nappi näyttäisi
  // jälleen väkäsiltä myös työpöydällä.
  for (const d of VAKASIKONIN_POLUT) {
    assert.equal(HTML.includes(`d="${d}"`), false,
      `index.html piirtää väkäspolun, vaikka ei saisi: ${d}`);
  }
});

test('päävalikon nappi on alkuperäinen kolmen viivan hampurilainen', () => {
  const nappi = /<button id="menu-btn"[\s\S]*?<\/button>/.exec(HTML)?.[0];
  assert.ok(nappi, 'index.html:stä ei löytynyt #menu-btn-nappia');
  assert.match(nappi, /d="M4\.5 7h15M4\.5 12h15M4\.5 17h15"/);
  // "h" on vaakaviiva, "L" olisi v:n kärki: muoto vartioidaan, ei vain
  // merkkijono.
  assert.equal(/ [Ll]\d/.test(nappi), false, 'päävalikon napissa on murtoviivoja');
});

test('väkäsnappi näkyy vain kun yläpalkki on piilossa', () => {
  // Sama media-kysely piilottaa palkin ja näyttää väkäsnapin: jos ne
  // eriytyisivät, kartalle jäisi nappi ilman palkkia tai päinvastoin.
  const CSS = lue('../css/styles.css');
  assert.match(CSS, /\.ylapalkki-nappi \{ display: none; \}/);
  /*
   * Samalla otsikolla on useampi kysely (mm. .intro-tyopoyta): otetaan
   * se, jossa väkäsnappi asuu. Ehtolista alkaa matalasta ruudusta ja
   * jatkuu iPadin kosketusehdolla (Raamattu, KARTTAUUDISTUKSEN
   * PAATOKSET 43 kohta 9), joten otsikko luetaan pilkkuun asti.
   */
  const kysely = [...CSS.matchAll(/@media \(max-height: 520px\)[^{]*\{[\s\S]*?\n\}/g)]
    .map((o) => o[0]).find((o) => o.includes('.ylapalkki-nappi'));
  assert.ok(kysely, 'väkäsnapin media-kyselyä ei löytynyt');
  // iPad kulkee samassa lohkossa: yksi sääntö, kaksi ehtoa.
  assert.match(kysely,
    /\(pointer: coarse\) and \(min-width: 700px\) and \(max-width: 1366px\)/);
  assert.match(kysely, /\.ylapalkki-nappi \{\s+display: grid;/);
  assert.match(kysely, /\.topbar \{[\s\S]*?transform: translateY\(-100%\);/);
});
