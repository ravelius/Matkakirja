/*
 * Linnakirjaston manifesti (Linnanrakentaja 30.9.2026, speksi docs/raportit/linnakirjasto-20260930.md):
 * jokaisella assetilla lähde, tekijät ja sallittu lisenssi (CC0, CC BY, CC BY-SA, PD), yksikäsitteinen tunnus
 * <laji>/<id>, toisto metreinä ja tiedostot sha256:lla. Materiaaleilla diff + nor_gl + arm, tarroilla alfallinen diff.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const M = JSON.parse(readFileSync(new URL('../js/dioraama/kirjasto/lahteet.json', import.meta.url), 'utf8'));
const LAJIT = new Set(['materiaali', 'tarra', 'osa', 'hahmo', 'esiasetus', 'efekti', 'vesi', 'taivas']);

test('kirjasto: tunnukset, lähteet ja sallitut lisenssit', () => {
  assert.ok(Object.keys(M).length >= 10);
  for (const [tunnus, a] of Object.entries(M)) {
    const [laji, id] = tunnus.split('/');
    assert.ok(LAJIT.has(laji) && /^[a-z0-9-]+$/.test(id), tunnus);
    assert.ok(/^https:\/\//.test(a.lahde) && a.tekijat.length > 0, `${tunnus}: lähde ja tekijät`);
    assert.ok(/^(CC0|CC BY( |-SA|$)|PD)/.test(a.lisenssi), `${tunnus}: lisenssi ${a.lisenssi}`);
    assert.ok(a.toisto_m > 0, `${tunnus}: toisto_m`);
    for (const t of a.tiedostot) assert.ok(/^[0-9a-f]{64}$/.test(t.sha256) && t.tavuja > 0 && t.polku.startsWith(`${tunnus}/`), t.polku);
  }
});

test('kirjasto: materiaaleilla diff, nor_gl ja arm; tarroilla alfallinen diff', () => {
  for (const [tunnus, a] of Object.entries(M)) {
    const p = a.tiedostot.map((t) => t.polku.split('/').pop());
    const id = tunnus.split('/')[1];
    if (tunnus.startsWith('materiaali/')) for (const k of ['_diff.jpg', '_nor_gl.jpg', '_arm.png']) assert.ok(p.includes(id + k), `${tunnus}${k}`);
    if (tunnus.startsWith('tarra/')) assert.ok(p.includes(`${id}_diff.png`), tunnus);
  }
});
