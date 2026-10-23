// KYSY-NAPIN VALMIIT KYSYMYKSET (omistaja 19.10.2026 klo 11.40, PT): Sisältökirjurin kysy-*.json → opas-kysy.js → GET /opas/kysymykset
// palauttaa kohteen 8 kysymystä ilman mallikutsua; muut kohteet ennallaan.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { OPAS_KYSY } from '../tools/pollo/opas-kysy.js';
import { kokoa, moduuli } from '../tools/pollo/tee-opas-kysy.mjs';

const H = { origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' };
function ymparisto() {
  const r2 = new Map(), kv = new Map();
  return { POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } }, ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app',
    OPAS_AINEISTO_TESTI: {}, OPAS_ESITTELY_TESTI: {},
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); }, delete: async (k) => { r2.delete(k); } } };
}

test('opas-kysy.js vastaa Sisältökirjurin listoja (4 kaupunkia, 8 kysymystä kohteelle)', () => {
  assert.equal(readFileSync(new URL('../tools/pollo/opas-kysy.js', import.meta.url), 'utf8'), moduuli(kokoa()), 'aja node tools/pollo/tee-opas-kysy.mjs');
  const kohteet = Object.entries(OPAS_KYSY);
  assert.ok(kohteet.length >= 30, `kohteita ${kohteet.length}`);
  for (const [q, lista] of kohteet) {
    assert.match(q, /^Q\d+$/);
    assert.equal(lista.length, 8, `${q}: 8 kysymystä`);
    for (const k of lista) assert.ok(k.length <= 60 && k.endsWith('?'), `${q}: ${k}`);
  }
});

test('/opas/kysymykset: listan kohde → 8 valmista kysymystä ilman mallia; muu kohde mallilta', async () => {
  tyhjennaReunamuisti();
  const e = ymparisto();
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u) => { if (String(u).includes('anthropic')) malli += 1;
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'Mikä tämä on?\nKuka teki?\nMiksi?\nMilloin?\nMissä?\nMitä?' }], stop_reason: 'end_turn' })); };
  try {
    const hae = (q) => worker.fetch(new Request(`https://pollo.example/opas/kysymykset?paikka=${q}&nimi=Kohde&kaupunki=Praha`, { headers: H }), e, { waitUntil() {} }).then((v) => v.json());
    const d = await hae('Q12256');
    assert.deepEqual(d.kysymykset, OPAS_KYSY.Q12256); assert.equal(d.kysymykset.length, 8); assert.equal(malli, 0, 'ei mallikutsua');
    const muu = await hae('Q99999999');
    assert.ok(muu.kysymykset.length > 0 && !OPAS_KYSY.Q99999999); assert.equal(malli, 1, 'listaton kohde mallilta kuten ennen');
  } finally { globalThis.fetch = vanha; }
});
