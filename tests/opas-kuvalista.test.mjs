// OPPAAN KUVALISTA (omistaja 6.10.2026 20.0x): kuvat vain listasta Q:lla (aliakset), lista isolaatin muistissa, virhe → tyhjä.
// Kaupungin lukittu kohdelista (6–20): Liiku koko lista, kierros 8 tärkeintä lyhimpänä reittinä ilman suunnittelukutsua.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { kuvalista, tyhjennaKuvalista, kohteenKuvat, kaupunginKohteet, KUVALISTA_URL } from '../tools/pollo/opas-kuvat.js';

beforeEach(() => { tyhjennaReunamuisti(); tyhjennaKuvalista(); });
const kuva = (n, j) => ({ url: `https://media.matkakirja.app/kuvat/${n}.jpg`, tyyppi: 'valokuva', tekija: 'T', lisenssi: 'CC BY 4.0', lahdeUrl: `https://c/${n}`, jarjestys: j });
const KOHTEET = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`Q${100 + i}`,
  { nimi: `Kohde ${i}`, kaupunki: 'testila', lat: 60 + i / 1000, lon: 25, kuvat: Array.from({ length: 7 }, (_, j) => kuva(`k${i}-${j}`, 7 - j)) }]));
const LISTA = { kohteet: KOHTEET, aliakset: { Q999: 'Q100' },
  kaupungit: { testila: { nimi: 'Testilä', Q: 'Q1', lat: 60, lon: 25, kohteet: Object.keys(KOHTEET), kuvat: [kuva('kaupunki', 1)] } } };

test('kohteenKuvat: 1–5 järjestyksessä, alias, puuttuva → []', () => {
  const k = kohteenKuvat(LISTA, 'Q100');
  assert.equal(k.length, 5);
  assert.equal(k[0].url, 'https://media.matkakirja.app/kuvat/k0-6.jpg', 'jarjestys 1 ensin');
  assert.equal(k[0].lahde, 'https://c/k0-6');
  assert.equal(kohteenKuvat(LISTA, 'Q999')[0].url, k[0].url, 'alias');
  assert.deepEqual(kohteenKuvat(LISTA, 'Q5'), []);
  assert.equal(kaupunginKohteet(LISTA, 'Testilä').length, 12);
  assert.equal(kaupunginKohteet(LISTA, 'testila')[0].id, 'Q100');
});

test('kuvalista: haetaan kerran (muisti 10 min), virhe → tyhjä eikä kaada', async () => {
  let n = 0;
  const haku = async (u) => { n += 1; assert.equal(u, KUVALISTA_URL); return new Response(JSON.stringify(LISTA)); };
  const a = await kuvalista({}, haku, 1000); const b = await kuvalista({}, haku, 2000);
  assert.equal(n, 1); assert.equal(a, b); assert.ok(a.kohteet.Q100);
  tyhjennaKuvalista();
  const t = await kuvalista({}, async () => new Response('', { status: 404 }), 1000);
  assert.deepEqual(t.kohteet, {});
});

const H = { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' };
function ymparisto() {
  const r2 = new Map(), kv = new Map();
  return { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, OPAS_KUVALISTA_TESTI: LISTA,
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); }, delete: async (k) => { r2.delete(k); } } };
}

test('Liiku: lukittu kohdelista kokonaan, kuva listasta, ei mallikutsua', async () => {
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u) => { if (String(u).includes('anthropic')) malli += 1; return new Response('{}'); };
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Testil%C3%A4', { headers: H }), ymparisto(), {})).json();
    assert.equal(d.kohteet.length, 12);
    assert.deepEqual(d.kohteet.map((k) => k.tarkeys).slice(0, 3), [1, 2, 3]);
    assert.equal(d.kohteet[0].kuvat.length, 5); assert.ok(d.kohteet[0].kuva.url);
    assert.equal(malli, 0);
    assert.deepEqual(d.kierros, ['Q100', 'Q101', 'Q102', 'Q103', 'Q104', 'Q105', 'Q106', 'Q107'], 'ilman sijaintia tärkeimmästä');
    const s = await (await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Testil%C3%A4&lat=60.0072&lon=25', { headers: H }), ymparisto(), {})).json();
    assert.deepEqual(s.kierros, ['Q107', 'Q106', 'Q105', 'Q104', 'Q103', 'Q102', 'Q101', 'Q100'], 'sijaintia lähimmästä lyhintä reittiä');
    assert.deepEqual(s.kohteet.map((k) => k.id).slice(0, 2), ['Q100', 'Q101'], 'lista pysyy tärkeysjärjestyksessä');
  } finally { globalThis.fetch = vanha; }
});

test('kierros: lukitusta listasta 8 tärkeintä lyhimpänä reittinä, ensimmäinen pysähdys sijaintia lähin kuvineen', async () => {
  const vanha = globalThis.fetch; const jarjestelmat = [];
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('anthropic')) {
      const b = JSON.parse(init.body); jarjestelmat.push(JSON.stringify(b.system).slice(0, 80));
      return new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: Kohde 0\nTEKSTI: Ensimmäinen.\nVAIHTOEHTO: A\nVAIHTOEHTO: B' }], stop_reason: 'end_turn' }));
    }
    return new Response(JSON.stringify({ query: { pages: {} }, claims: {}, entities: {} }));
  };
  try {
    const env = ymparisto();
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti: { lat: 60, lon: 25 }, toive: 'Esittele kaupunki', istunto: 'kl1' }) }), env, { waitUntil() {} })).json();
    assert.equal(d.tyyppi, 'pysahdys'); assert.equal(d.id, 'Q100'); assert.deepEqual(d.kierros, { numero: 1, maara: 8 });
    assert.equal(d.kuvat.length, 5);
    assert.ok(!jarjestelmat.some((x) => /kaupunkikierroksen/i.test(x) && /Suunnittelet/.test(x)), 'ei suunnittelukutsua');
    const toka = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti: { lat: 60, lon: 25 }, kaydyt: ['Q100'], istunto: 'kl1' }) }), env, { waitUntil() {} })).json();
    assert.equal(toka.id, 'Q101'); assert.deepEqual(toka.kierros, { numero: 2, maara: 8 });
  } finally { globalThis.fetch = vanha; }
});

test('kaupunkitila: lukitsemattoman kaupungin kohde pitää entisen kuvan; lukitun kaupungin kohde ilman listan kuvaa → null', async () => {
  const { listanKuvin } = await import('../tools/pollo/opas-kuvat.js');
  const L = { ...LISTA, kohteet: { ...KOHTEET, Q7: { nimi: 'Muu', kaupunki: 'muuala', lat: 1, lon: 1, kuvat: [kuva('muu', 1)] } },
    kaupungit: { ...LISTA.kaupungit, muuala: { nimi: 'Muuala', kohteet: ['Q7'] } } };
  const vanha = { url: 'https://upload/vanha.jpg' };
  const t = listanKuvin({ kohteet: [{ id: 'Q7', kaupunki: 'Muuala', kuva: vanha }, { id: 'Q100', kaupunki: 'Testilä', kuva: vanha },
    { id: 'Q5', kaupunki: 'Testilä', kuva: vanha }, { id: 'Q6', kaupunki: 'Jossain', kuva: vanha }] }, L);
  assert.equal(t.kohteet[0].kuva, vanha, 'lukitsematon (1 kohde) → ennallaan');
  assert.match(t.kohteet[1].kuva.url, /k0-6/, 'lukittu → listan kuva');
  assert.equal(t.kohteet[2].kuva, null, 'lukittu, ei listalla → ei kuvaa');
  assert.equal(t.kohteet[3].kuva, vanha, 'ei listalla, lukitsematon → ennallaan');
});

test('kierros: sijainti listan toisessa päässä → kierros alkaa sieltä (omistaja 6.10. 23.4x)', async () => {
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u) => (String(u).includes('anthropic')
    ? new Response(JSON.stringify({ content: [{ type: 'text', text: 'NIMI: Kohde 7\nTEKSTI: Ensimmäinen.\nVAIHTOEHTO: A\nVAIHTOEHTO: B' }], stop_reason: 'end_turn' }))
    : new Response(JSON.stringify({ query: { pages: {} }, claims: {}, entities: {} })));
  try {
    const env = ymparisto();
    const sijainti = { lat: 60.0072, lon: 25 };
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti, toive: 'Esittele kaupunki', istunto: 'kl2' }) }), env, { waitUntil() {} })).json();
    assert.equal(d.id, 'Q107'); assert.deepEqual(d.kierros, { numero: 1, maara: 8 });
    const toka = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti, kaydyt: ['Q107'], istunto: 'kl2' }) }), env, { waitUntil() {} })).json();
    assert.equal(toka.id, 'Q106');
  } finally { globalThis.fetch = vanha; }
});
