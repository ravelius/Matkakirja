/*
 * SAAVUTETTAVUUS C (Fable 27.9.2026, web + natiivi yhdessä, Natiivi-UI:n
 * mittaamat arvot): pergamentin toissijainen teksti ≥ 4,5:1.
 *
 * Läpikuultava muste rgba(70, 51, 31, a) alittaa 4,5:1 vaalealla
 * pergamentilla (#f5f0e2), kun a < 0,72, ja tummemmalla (#d6cab0), kun
 * a < 0,8. Himmeä toissijainen teksti on siksi #595046 ja lämmin
 * toissijainen ruskea #624c2d. Poikkeus: ei-aktiiviset tilat (pois,
 * tyhjä, disabled) saavat olla himmeitä (WCAG 1.4.3 poikkeus).
 * Mittaustyökalu: node tools/pariteettikuvat.mjs --kontrasti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const POIKKEUS = /disabled|tyhja|pois|placeholder|inaktiiv|lukittu|himme|mykistetty/i;

test('pergamentin toissijainen teksti ei ole alle 0,72-alfaista mustetta', () => {
  const vialliset = [];
  const kuvio = /^\s*color:\s*rgba\((70, 51, 31|90, 74, 51), (0\.\d+)\)/gm;
  for (const m of css.matchAll(kuvio)) {
    const alfa = Number(m[2]);
    const raja = m[1] === '90, 74, 51' ? 0.85 : 0.72;
    if (alfa >= raja) continue;
    const alku = css.lastIndexOf('}', m.index);
    const valitsin = css.slice(alku + 1, css.indexOf('{', alku + 1)).trim().split('\n').at(-1);
    if (!POIKKEUS.test(valitsin)) vialliset.push(`${valitsin} → ${m[0].trim()}`);
  }
  assert.deepEqual(vialliset, [], 'käytä #595046 (himmeä) tai #624c2d (lämmin)');
});

test('kysymyksen kaupunki ja sekunnit #624c2d; karttaselitteen rivit 32 px (AA 24 px)', () => {
  assert.doesNotMatch(css, /#7a6039/i, 'vanha lämmin ruskea 4,0:1 kysymyskortilla');
  assert.match(css, /\.quiz-city \{ color: #624c2d;/);
  assert.match(css, /\.karttaselite-rivi \{[^}]*min-height: 32px;/);
  assert.match(css, /\.paavalikko \.kertoja-valikko button\.valittu \.aanikytkin-tila \{ opacity: 1; \}/);
});
