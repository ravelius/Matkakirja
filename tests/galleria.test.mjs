/*
 * GALLERIOIDEN SELAUSKAISTAT — YKSI SÄÄNTÖ, YKSI LUKU.
 *
 * Omistaja 9.9.2026 klo 14.15 (Raamattu "GALLERIOIDEN SELAUSALUEET
 * KAPEAMMIKSI, KESKELTA KLIKKI SUURENTAA"), sanatarkasti:
 * *"kaupunkilehden herokuvissa ja muissa vastaavissa gallerioissa on
 * liian leveä alue mistä kuva siirtyy seuraavaan tai edelliseen kuvaan.
 * kavenna sitä, jotta kuvan klikkaaminen ja suurentaminen keskeltä on
 * helpompaa"*.
 *
 * Vartija katsoo kolmea asiaa:
 *   1. apurin rajat (js/galleria.js gallerianVyohyke),
 *   2. että luku pysyy tilauksen haarukassa (enintään neljännes) ja
 *      keskiosa yli puolikkaan,
 *   3. ettei sama luku pääse erkanemaan CSS:n ja JS:n välillä eikä
 *      kukaan palauta kovakoodattua leveyttä nuolialueille.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  GALLERIAN_KESKIKAISTA, GALLERIAN_REUNAKAISTA, GALLERIAN_REUNAKAISTA_CSS,
  gallerianVyohyke, vyohykkeenAskel,
} from '../js/galleria.js';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/** Kuvitteellinen kuva-alue: 1000 px leveä, vasen reuna x = 100. */
const kuva = (leveys = 1000, vasen = 100) => ({
  getBoundingClientRect: () => ({ left: vasen, width: leveys, top: 0, height: 400 }),
});

/** Napautus osuudessa `osuus` (0…1) kuvan leveydestä. */
const napautus = (osuus, leveys = 1000, vasen = 100) => ({ clientX: vasen + osuus * leveys });

/* ==================== APURIN RAJAT ==================== */

test('reunakaista on enintään neljännes ja keskiosa yli puolet', () => {
  assert.ok(GALLERIAN_REUNAKAISTA > 0, 'reunakaista ei saa kadota — nuolialue on tarpeen');
  assert.ok(GALLERIAN_REUNAKAISTA <= 0.25,
    `reunakaista ${GALLERIAN_REUNAKAISTA} ylittää tilauksen neljänneksen`);
  assert.ok(GALLERIAN_REUNAKAISTA >= 0.2,
    'alle viidenneksen kaista jää sormenpäätä kapeammaksi kapealla kuvalla');
  assert.ok(GALLERIAN_KESKIKAISTA >= 0.5,
    `keskiosa ${GALLERIAN_KESKIKAISTA} jää alle puolikkaan — suurennos on taas vaikea osua`);
});

test('vyöhyke: reunat selaavat, keskiosa suurentaa', () => {
  assert.equal(gallerianVyohyke(napautus(0.02), kuva()), 'edellinen');
  assert.equal(gallerianVyohyke(napautus(0.10), kuva()), 'edellinen',
    'omistajan koe: 10 %:n napautus kuuluu edelliselle');
  assert.equal(gallerianVyohyke(napautus(0.50), kuva()), 'suurenna',
    'omistajan koe: 50 %:n napautus avaa suurennoksen');
  assert.equal(gallerianVyohyke(napautus(0.90), kuva()), 'seuraava');
  assert.equal(gallerianVyohyke(napautus(0.98), kuva()), 'seuraava');
});

test('rajapiste kuuluu keskustalle molemmissa päissä', () => {
  const r = GALLERIAN_REUNAKAISTA;
  assert.equal(gallerianVyohyke(napautus(r), kuva()), 'suurenna',
    'tasan rajalla ollaan jo keskiosassa — luvattu 52 % ei saa kutistua');
  assert.equal(gallerianVyohyke(napautus(1 - r), kuva()), 'suurenna');
  assert.equal(gallerianVyohyke(napautus(r - 0.001), kuva()), 'edellinen');
  assert.equal(gallerianVyohyke(napautus(1 - r + 0.001), kuva()), 'seuraava');
});

test('vyöhyke lasketaan kuvan omasta leveydestä, ei ruudun', () => {
  // Kapea kuva ruudun oikeassa laidassa: sama osuus, eri pikselit.
  assert.equal(gallerianVyohyke({ clientX: 810 }, kuva(200, 800)), 'edellinen');
  assert.equal(gallerianVyohyke({ clientX: 900 }, kuva(200, 800)), 'suurenna');
  assert.equal(gallerianVyohyke({ clientX: 990 }, kuva(200, 800)), 'seuraava');
});

test('epävarmuus vie keskustaan eikä koskaan pois kuvasta', () => {
  assert.equal(gallerianVyohyke({}, kuva()), 'suurenna',
    'näppäimistön napautuksella ei ole clientX:ää');
  assert.equal(gallerianVyohyke(napautus(0.02), null), 'suurenna');
  assert.equal(gallerianVyohyke(napautus(0.02), {}), 'suurenna');
  assert.equal(gallerianVyohyke(napautus(0.02), kuva(0)), 'suurenna',
    'nollan levyinen kehys ei saa tuottaa jakoa nollalla');
  assert.equal(gallerianVyohyke({ clientX: Number.NaN }, kuva()), 'suurenna');
});

test('reunakaista voidaan kuristaa, mutta ei mielettömäksi', () => {
  assert.equal(gallerianVyohyke(napautus(0.30), kuva(), { reunakaista: 0.4 }), 'edellinen');
  // Yli puolikkaan kaista litistäisi keskiosan olemattomiin: se
  // kuritetaan 0,5:een, jolloin kuvan puolikkaat jakautuvat siististi.
  assert.equal(gallerianVyohyke(napautus(0.49), kuva(), { reunakaista: 0.9 }), 'edellinen');
  assert.equal(gallerianVyohyke(napautus(0.51), kuva(), { reunakaista: 0.9 }), 'seuraava');
  // Negatiivinen tai roskainen arvo tarkoittaa "ei kaistoja".
  assert.equal(gallerianVyohyke(napautus(0.01), kuva(), { reunakaista: -1 }), 'suurenna');
  assert.equal(gallerianVyohyke(napautus(0.01), kuva(), { reunakaista: NaN }), 'suurenna');
});

test('askel kääntää vyöhykkeen sarjan suunnaksi', () => {
  assert.equal(vyohykkeenAskel('edellinen'), -1);
  assert.equal(vyohykkeenAskel('seuraava'), 1);
  assert.equal(vyohykkeenAskel('suurenna'), 0);
  assert.equal(vyohykkeenAskel(undefined), 0, 'tuntematon vyöhyke ei siirrä sarjaa');
});

/* ==================== YKSI LUKU, EI KOPIOITA ==================== */

test('CSS-muuttuja ja JS-vakio kertovat saman luvun', () => {
  const css = lue('css/styles.css');
  const arvo = css.match(/--gallerian-reunakaista:\s*([^;]+);/)?.[1]?.trim();
  assert.ok(arvo, ':rootista puuttuu --gallerian-reunakaista');
  assert.equal(arvo, GALLERIAN_REUNAKAISTA_CSS,
    'CSS ja js/galleria.js ovat erkaantuneet — kaista on kahdessa paikassa eri levyinen');
});

test('nuolialueet lukevat muuttujaa eivätkä omaa prosenttilukuaan', () => {
  const kohteet = [
    ['css/styles.css', '.dialog button.arrival-kuva-nuoli'],
    ['css/fokusnosto.css', '.hetki-kuvanuoli,\n.skandaali-kuvanuoli'],
  ];
  for (const [tiedosto, valitsin] of kohteet) {
    const css = lue(tiedosto);
    const paikka = css.indexOf(`${valitsin} {`);
    assert.ok(paikka > -1, `${valitsin} puuttuu tiedostosta ${tiedosto}`);
    const runko = css.slice(paikka).match(/\{([^}]*)\}/)?.[1] ?? '';
    const leveys = runko.match(/(?:^|\n)\s*width:\s*([^;]+);/)?.[1]?.trim();
    assert.equal(leveys, 'var(--gallerian-reunakaista)',
      `${valitsin}: nuolialueen leveys on kovakoodattu (${leveys}) — kaista karkaa muuttujasta`);
  }
});

test('postikorttipino selaa apurilla, ei koko kortin napautuksella', () => {
  const ui = lue('js/ui.js');
  assert.match(ui, /import \{[^}]*gallerianVyohyke[^}]*\} from '\.\/galleria\.js'/,
    'js/ui.js ei tuo yhteistä apuria');
  const kohta = ui.indexOf('postikorttiSulkija = (e)');
  assert.ok(kohta > -1, 'postikorttiSulkija puuttuu');
  const runko = ui.slice(kohta, kohta + 3000);
  assert.match(runko, /gallerianVyohyke\(e, kortit\[/,
    'pinon napautus ei kysy vyöhykettä — koko kortti veisi taas seuraavaan kuvaan');
  assert.match(runko, /if \(!askel\) return;/,
    'keskeltä napautettu kortti ei jää paikalleen');
});
