// OPUS-KYTKIN (Päätoimittaja 7.10.2026): OPAS_MALLI=claude-opus-5-5 → vastausraja ≥ 4000 (ajattelu ei vie tekstiä),
// effort low; ilman kytkintä Sonnet 5.5 entisellä rajalla ilman ajattelua.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

async function pysakki(lisa) {
  tyhjennaReunamuisti();
  const kutsut = [], r2 = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    OPAS_KUVALISTA_TESTI: { kohteet: {}, kaupungit: {} },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } }, ...lisa };
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    const s = decodeURIComponent(String(u));
    if (s.includes('api.anthropic.com')) {
      kutsut.push(JSON.parse(init.body));
      return new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: Tivoli on huvipuisto.\nVAIHTOEHTO: A?\nVAIHTOEHTO: B' }], stop_reason: 'end_turn' }));
    }
    if (s.includes('titles=Tivoli Gardens')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } }));
    return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
  };
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: { 'content-type': 'application/json',
      origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' }, body: JSON.stringify({ kaupunki: 'Kööpenhamina', istunto: 'm' + Math.random() }) }), env, { waitUntil() {} });
    assert.equal(v.status, 200);
    return kutsut.find((k) => JSON.stringify(k.system).includes('Matkakirja-pelin kertoja'));
  } finally { globalThis.fetch = vanha; }
}

test('oletus: Sonnet 5.5, raja 700, ei ajattelua', async () => {
  const k = await pysakki({});
  assert.equal(k.model, 'claude-sonnet-5-5');
  assert.equal(k.max_tokens, 700);
  assert.deepEqual(k.thinking, { type: 'between_tools' });
});

test('kytkin: OPAS_MALLI=claude-opus-5-5 → raja 4000, effort low', async () => {
  const k = await pysakki({ OPAS_MALLI: 'claude-opus-5-5' });
  assert.equal(k.model, 'claude-opus-5-5');
  assert.equal(k.max_tokens, 4000);
  assert.deepEqual(k.output_config, { effort: 'low' });
  assert.equal(k.thinking, undefined);
});
