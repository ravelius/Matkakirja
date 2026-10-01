/*
 * TYYLIKIRJA — tyylien ainoa lähde (omistaja 1.10.2026, UI-pohjat kohdat 6–8).
 *
 * Vartija katsoo, että
 *   1. css/styles.css:n TYYLIKIRJA-lohko on generoitu nykyisestä tyylikirja/tyylikirja.json:sta (ei käsin muokattu),
 *   2. tokeneita ei määritellä lohkon ulkopuolella uudelleen (yksi totuus),
 *   3. jokaisen teeman muste ja pehmeä muste ovat ≥ 4,5:1 pintaa vasten (keksintöpaneelin 2,2:1 ei toistu),
 *   4. mikään avaus- tai sulkuaika ei ylitä maksimia (250 ms), napin osuma-ala ≥ 44 pt ja typografia nousee.
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

function rgb(v) {
  const h = /^#([0-9a-f]{6})$/i.exec(v);
  if (h) { const n = parseInt(h[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  throw new Error('ei peittävä väri: ' + v);
}
function luminanssi([r, g, b]) {
  const l = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b);
}
const kontrasti = (a, b) => { const [x, y] = [luminanssi(rgb(a)), luminanssi(rgb(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

test('teemojen muste ≥ 4,5:1 pintaa vasten', () => {
  for (const [nimi, t] of Object.entries(tk.teemat)) {
    if (nimi.startsWith('_')) continue;
    const pinta = t['pinta-peitto'] ?? t.pinta;
    for (const k of ['muste', 'muste-pehmea']) {
      const c = kontrasti(t[k], pinta);
      assert.ok(c >= 4.5, `${nimi}.${k} ${t[k]} / ${pinta} = ${c.toFixed(2)}:1`);
    }
  }
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
