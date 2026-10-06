// TESTITUNNUS (Päätoimittaja 5.10.2026 ilta, juna 146): roolien simut ja todistusajot ohittavat per-IP-päivärajat
// (opas, Pulu-chat) ja oppaan minuuttiraja nousee 20 → 120 (silmukkasuoja jää). Koko palvelun kustannuskatot pysyvät.
// Vika toistetaan ensin: ilman tunnusta 429, tunnuksella läpi.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';

const TUNNUS = 'testi-tunnus-123';
function ymparisto(lisa = {}) {
  const kv = new Map();
  return { kv, env: { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_TESTITUNNUS: TUNNUS,
    OPAS_AINEISTO_TESTI: {}, POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } }, ...lisa } };
}
const malli = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) {
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'KYSYMYS: Mitä haluat nähdä?\nVAIHTOEHTO: A\nVAIHTOEHTO: B' }], stop_reason: 'end_turn',
      usage: { input_tokens: 1, output_tokens: 1 } }), { headers: { 'content-type': 'application/json' } });
  }
  if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
async function opas(env, otsakkeet = {}, ip = '10.0.0.1') {
  const vanha = globalThis.fetch; globalThis.fetch = malli;
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': ip, 'x-matkakirja-testi': '1', ...otsakkeet },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina' }) }), env, {});
    return v.status;
  } finally { globalThis.fetch = vanha; }
}

test('opas: päiväraja täynnä → 429 ilman tunnusta, testitunnuksella 200; väärä tunnus ei kelpaa', async () => {
  const { env } = ymparisto({ OPAS_PAIVARAJA: '1' });
  assert.equal(await opas(env, {}, '10.0.0.1'), 200);
  assert.equal(await opas(env, {}, '10.0.0.1'), 429, 'toisto: raja täynnä');
  assert.equal(await opas(env, { 'x-matkakirja-testitunnus': 'väärä' }, '10.0.0.1'), 429);
  assert.equal(await opas(env, { 'x-matkakirja-testitunnus': TUNNUS }, '10.0.0.1'), 200, 'testitunnus ohittaa IP-päivärajan');
});

test('opas: minuuttiraja 20 → testitunnuksella 120 (silmukkasuoja jää)', async () => {
  const { env } = ymparisto({ OPAS_MINUUTTIRAJA: '2', OPAS_TESTI_MINUUTTIRAJA: '4' });
  const ilman = [];
  for (let i = 0; i < 3; i += 1) ilman.push(await opas(env, {}, '10.0.0.2'));
  assert.deepEqual(ilman, [200, 200, 429], 'toisto');
  const tunnuksella = [];
  for (let i = 0; i < 5; i += 1) tunnuksella.push(await opas(env, { 'x-matkakirja-testitunnus': TUNNUS }, '10.0.0.3'));
  assert.deepEqual(tunnuksella, [200, 200, 200, 200, 429], 'korkeampi raja, mutta raja on');
});

test('Pulu-chat: IP-päiväraja täynnä → 429, testitunnuksella läpi; kuukausiraja pysyy', async () => {
  const { env, kv } = ymparisto({ POLLO_PAIVARAJA: '1', POLLO_KUUKAUSIRAJA: '1000' });
  const chat = async (otsakkeet = {}) => {
    const vanha = globalThis.fetch; globalThis.fetch = malli;
    try {
      const v = await worker.fetch(new Request('https://pollo.example/', { method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.0.0.4', ...otsakkeet },
        body: JSON.stringify({ kysymys: 'Mitä kuuluu?' }) }), env, {});
      return v.status;
    } finally { globalThis.fetch = vanha; }
  };
  assert.equal(await chat(), 200);
  assert.equal(await chat(), 429, 'toisto: IP-päiväraja');
  assert.equal(await chat({ 'x-matkakirja-testitunnus': TUNNUS }), 200, 'testitunnus ohittaa IP-päivärajan');
  kv.set(`pollo:k:${new Date().toISOString().slice(0, 7)}`, '1000');   // kuukausilaskuri täyteen
  assert.equal(await chat({ 'x-matkakirja-testitunnus': TUNNUS }), 429, 'kuukausikatto pysyy testitunnuksellakin');
});
