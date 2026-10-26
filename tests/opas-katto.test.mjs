// OPPAAN ÄÄNIKATTO lasketaan vain toteutuneista äänistä (5.10.2026 ilta: esihaut, joiden ääntä ei haeta, täyttivät
// katon ja pysähdykset jäivät mykiksi). Vika toistetaan ensin: pelkkä POST ei saa kuluttaa kattoa.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';

const TEKSTI = 'Tivoli on huvipuisto keskellä kaupunkia.';
function ymparisto(lisa = {}) {
  const kv = new Map(), r2 = new Map();
  return { kv, env: { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { body: r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } }, ...lisa } };
}
const verkko = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) return new Response(JSON.stringify({ content: [{ type: 'text', text: `NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: ${TEKSTI}\nVAIHTOEHTO: A?\nVAIHTOEHTO: B` }], stop_reason: 'end_turn' }));
  if (s.includes('titles=Tivoli Gardens')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } }));
  if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
  if (s.includes('api.elevenlabs.io')) return new Response(new Uint8Array(16000), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
const kaytetty = (kv) => Number([...kv.entries()].find(([k]) => k.startsWith('eleven:opas:p:'))?.[1] ?? 0);

test('äänikatto: pelkkä POST (esihaku) ei kuluta, toteutunut GET kuluttaa', async () => {
  const { env, kv } = ymparisto();
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.1.1.1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina' }) }), env, {});
    const d = await v.json();
    assert.ok(d.aani);
    assert.equal(kaytetty(kv), 0, 'toisto: POST ei saa kuluttaa kattoa');
    assert.equal((await worker.fetch(new Request(d.aani), env, {})).status, 200);
    assert.equal(kaytetty(kv), TEKSTI.length, 'toteutunut ääni kuluttaa');
    await worker.fetch(new Request(d.aani), env, {});
    assert.equal(kaytetty(kv), TEKSTI.length, 'R2:sta ei kuluta uudelleen');
  } finally { globalThis.fetch = vanha; }
});

test('äänikatto täynnä: POST ilman ääntä; kehittäjän ääni ei kuluta kattoa', async () => {
  const { env, kv } = ymparisto({ OPAS_ELEVEN_PAIVARAJA: '10', POLLO_KEHITTAJAKOODI: 'k' });
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  try {
    const post = (otsakkeet = {}) => worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.1.1.2', ...otsakkeet },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina' }) }), env, {}).then((v) => v.json());
    assert.equal((await post()).aani, null, 'katto 10 < tekstin pituus');
    const k = await post({ 'x-pollo-kehittaja': 'k' });
    assert.ok(k.aani);
    await worker.fetch(new Request(k.aani), env, {});
    assert.equal(kaytetty(kv), 0, 'kehittäjän ääni ei kuluta');
  } finally { globalThis.fetch = vanha; }
});
