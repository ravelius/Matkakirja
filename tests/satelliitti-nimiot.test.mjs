/*
 * Astronautin kameran nimiöiden limityksen purku (erä E, omistajan
 * Egyptin kuva 19.9.2026): js/linssit/satelliitti-nimiot.js.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ladoNimiot, nimionLaatikko, leikkausOsuus, leikkaa, KYLJET, PIILO, NIMION_VALI,
} from '../js/linssit/satelliitti-nimiot.js';

const laatikot = (kohteet, tulos) => kohteet
  .filter((k) => tulos.get(k.id) !== PIILO)
  .map((k) => nimionLaatikko(k, tulos.get(k.id)));

test('yksinäinen nimiö jää oletuspaikalleen pisteen alle', () => {
  const t = ladoNimiot([{ id: 'a', x: 100, y: 100, w: 80, h: 13 }]);
  assert.equal(t.get('a'), 'ala');
  assert.deepEqual(nimionLaatikko({ x: 100, y: 100, w: 80, h: 13 }, 'ala'), { x: 60, y: 100 + NIMION_VALI, w: 80, h: 13 });
});

test('Egyptin rypäs (mitattu 390 px:llä) latoutuu ilman leikkauksia', () => {
  // Pisteet ja nimiöiden koot omistajan kuvan mittakaavassa (CSS px).
  const kohteet = [
    { id: 'niili', x: 290, y: 443, w: 90, h: 13 },
    { id: 'suez', x: 321, y: 448, w: 100, h: 13 },
    { id: 'kairo', x: 272, y: 463, w: 88, h: 13 },
    { id: 'faiyum', x: 263, y: 481, w: 118, h: 13 },
  ];
  const t = ladoNimiot(kohteet);
  const l = laatikot(kohteet, t);
  for (let i = 0; i < l.length; i += 1) {
    for (let j = i + 1; j < l.length; j += 1) assert.equal(leikkausOsuus(l[i], l[j]), 0);
  }
  assert.ok([...t.values()].every((k) => k !== PIILO), 'tilaa riittää kaikille neljälle');
  // Yksikään nimiö ei peitä toisen pisteen ydintä (Niilin nimiö alla
  // peittäisi Kairon pisteen, joten se nousee ylös).
  for (const k of kohteet) {
    const oma = nimionLaatikko(k, t.get(k.id));
    for (const m of kohteet) {
      if (m !== k) assert.ok(!leikkaa(oma, { x: m.x - 3, y: m.y - 3, w: 6, h: 6 }), `${k.id} peitti ${m.id}`);
    }
  }
  assert.equal(t.get('niili'), 'yla');
});

test('nimiö ei peitä toisen pisteen ydintä', () => {
  const kohteet = [{ id: 'a', x: 100, y: 100, w: 80, h: 13 }, { id: 'b', x: 100, y: 118, w: 40, h: 13 }];
  const t = ladoNimiot(kohteet);
  const a = nimionLaatikko(kohteet[0], t.get('a'));
  assert.ok(!leikkaa(a, { x: 97, y: 115, w: 6, h: 6 }), `a:n kylki ${t.get('a')} peitti b:n pisteen`);
});

test('täysin saarrettu nimiö piiloutuu eikä limity', () => {
  const kohteet = Array.from({ length: 12 }, (_, i) => ({ id: `k${i}`, x: 100 + (i % 3) * 4, y: 100 + Math.floor(i / 3) * 4, w: 90, h: 13 }));
  const t = ladoNimiot(kohteet);
  assert.ok([...t.values()].includes(PIILO));
  const l = laatikot(kohteet, t);
  for (let i = 0; i < l.length; i += 1) {
    for (let j = i + 1; j < l.length; j += 1) assert.ok(!leikkaa(l[i], l[j]));
  }
});

test('edellinen kylki pidetään, jos se on yhä vapaa (ei hyppimistä)', () => {
  const kohteet = [{ id: 'a', x: 100, y: 100, w: 80, h: 13 }];
  assert.equal(ladoNimiot(kohteet, { edelliset: new Map([['a', 'oikea']]) }).get('a'), 'oikea');
  assert.deepEqual(KYLJET, ['ala', 'yla', 'oikea', 'vasen']);
});

test('CSS: jokaisella kyljellä on sääntö ja piilo voittaa nimien sytytyksen', () => {
  const css = readFileSync(new URL('../css/satelliitti.css', import.meta.url), 'utf8');
  for (const k of ['yla', 'oikea', 'vasen']) assert.match(css, new RegExp(`\\[data-kylki="${k}"\\] \\.satelliitti-nimi`));
  assert.match(css, /body\.satelliitti-nimet \.satelliitti-piste\[data-kylki="piilo"\] \.satelliitti-nimi \{ opacity: 0; \}/);
  const av = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  assert.match(av, /tahdistaNimet\(\);\s*nimiot\.paivita\(/);
  assert.match(av, /nimetPaalla = false;\s*nimiot\.pura\(\);/);
});
