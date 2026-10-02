/*
 * TYYLIKIRJA — tyylien ainoa lähde (omistaja 1.10.2026, UI-pohjat kohdat 6–8).
 *
 * Vartija katsoo, että
 *   1. css/styles.css:n TYYLIKIRJA-lohko on generoitu nykyisestä tyylikirja/tyylikirja.json:sta (ei käsin muokattu),
 *   2. tokeneita ei määritellä lohkon ulkopuolella uudelleen (yksi totuus),
 *   3. mikään avaus- tai sulkuaika ei ylitä maksimia (250 ms), napin osuma-ala ≥ 44 pt ja typografia nousee.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { lue, webLohko, korvaaLohko, muuttujat, CSS } from '../tools/tyylikirja.mjs';

const { tk, tunniste } = lue();
const css = readFileSync(CSS, 'utf8');

test('styles.css:n tyylikirjalohko vastaa lähdettä', () => {
  assert.equal(korvaaLohko(css, webLohko(tk, tunniste)), css, 'aja node tools/tyylikirja.mjs');
  assert.ok(css.includes(`lähde ${tunniste}`));
});

test('tyylikirjan tokeneita ei määritellä uudelleen :root-lohkoissa', () => {
  const ilmanLohkoa = css.slice(0, css.indexOf('/* TYYLIKIRJA ALKU')) + css.slice(css.indexOf('/* TYYLIKIRJA LOPPU */'));
  const omat = muuttujat(tk).filter(([, , a]) => a.includes('w')).map(([n]) => n);
  const rootit = [...ilmanLohkoa.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/:root\s*\{([\s\S]*?)\n\}/g)].map((m) => m[1]).join('\n');
  for (const n of omat) assert.ok(!new RegExp(`--${n}\\s*:`).test(rootit), `--${n} määritelty myös :root-lohkossa`);
});

test('liike ≤ maksimi, osuma-ala ≥ 44 ja typografia nousee', () => {
  const { maksimi, ...muut } = tk.liike;
  for (const [k, v] of Object.entries(muut)) if (typeof v === 'number') assert.ok(v <= maksimi, `liike.${k} ${v} > ${maksimi}`);
  assert.ok(maksimi <= 250);
  assert.ok(tk.mitat.nappi.osuma >= 44 && tk.mitat.nappi.korkeus <= tk.mitat.nappi.osuma);
  const portaat = ['kapiteeli', 'apuri', 'leipa', 'valiotsikko', 'otsikko', 'arkki', 'nimio'].map((k) => tk.typografia[k].koko);
  assert.deepEqual([...portaat].sort((a, b) => a - b), portaat);
  assert.ok(tk.mitat.peitto.max <= 45);
});
