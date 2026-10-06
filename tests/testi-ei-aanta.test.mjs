// TESTIT EIVÄT TUOTA ÄÄNTÄ (omistaja 6.10.2026 08.4x, sitova: "Mikäli striimi-äännellä halutaan jotain testata, niin siitä
// pitää kysyä lupa minulta erikseen myös, koska sekin on maksullista."). Roolien testitunnus ja testiotsake eivät koskaan
// kutsu ElevenLabsia (eivätkä muuta puhemoottoria): valmis ääni (välimuisti/R2) saa soida, muuten ei ääntä. Ohitus vain
// erillisellä äänilupalipulla (POLLO_AANILUPA), jota käytetään omistajan luvalla tarkalle määrälle.
// Vika toistetaan ensin: testitunnuksella luenta ja oppaan ääni kutsuivat ElevenLabsia.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

beforeEach(() => tyhjennaReunamuisti());
const TEKSTI = 'Tivoli on huvipuisto keskellä kaupunkia.';
function ymparisto(lisa = {}) {
  const kv = new Map(), r2 = new Map();
  return { kv, r2, env: { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', XAI_API_KEY: 'x', POLLO_ORIGINIT: 'https://matkakirja.app',
    OPAS_AINEISTO_TESTI: {}, POLLO_TESTITUNNUS: 'tt', POLLO_AANILUPA: 'lupa-123',
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { body: r2.get(k), text: async () => r2.get(k), arrayBuffer: async () => new ArrayBuffer(8) } : null),
      put: async (k, v) => { r2.set(k, v); } }, ...lisa } };
}
let aanikutsut = 0;
const verkko = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) return new Response(JSON.stringify({ content: [{ type: 'text', text: `NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: ${TEKSTI}\nVAIHTOEHTO: A?\nVAIHTOEHTO: B` }], stop_reason: 'end_turn' }));
  if (s.includes('titles=Tivoli Gardens')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } }));
  if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
  if (s.includes('api.elevenlabs.io') || s.includes('api.x.ai') || s.includes('api.openai.com')) {
    aanikutsut += 1;
    return new Response(new Uint8Array(16000), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  }
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
async function aja(fn) {
  const vanha = globalThis.fetch; globalThis.fetch = verkko; aanikutsut = 0;
  try { return await fn(); } finally { globalThis.fetch = vanha; }
}
const otsakkeet = (lisa = {}) => ({ 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.7.0.1', ...lisa });
const puhe = (env, lisa, teksti = 'Kuvaselite luetaan ääneen.') => worker.fetch(new Request('https://pollo.example/', { method: 'POST',
  headers: otsakkeet(lisa), body: JSON.stringify({ tehtava: 'puhe', persoona: 'kertoja', teksti }) }), env, { waitUntil() {} });
const opas = async (env, lisa) => {
  const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: otsakkeet(lisa),
    body: JSON.stringify({ kaupunki: 'Kööpenhamina' }) }), env, { waitUntil() {} });
  const d = await v.json();
  const mp3 = d.aani ? (await worker.fetch(new Request(d.aani), env, { waitUntil() {} })).status : null;
  const pcm = d.aani_pcm ? (await worker.fetch(new Request(d.aani_pcm), env, { waitUntil() {} })).status : null;
  return { d, mp3, pcm };
};

test('luenta (puhe): testitunnuksella ja testiotsakkeella ei äänigenerointia; ilman niitä generoidaan', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    const t = await puhe(env, { 'x-matkakirja-testitunnus': 'tt' });
    assert.equal(aanikutsut, 0, `toisto: testitunnus kutsui puhemoottoria (${aanikutsut})`);
    assert.equal(t.status, 204);
    await puhe(env, { 'x-matkakirja-testi': '1' }, 'Toinen teksti.');
    assert.equal(aanikutsut, 0, 'testiotsake: ei kutsua');
    const n = await puhe(env, {}, 'Kolmas teksti.');
    assert.equal(n.status, 200);
    assert.equal(aanikutsut, 1, 'tavallinen pelaaja: generoidaan');
  });
});

test('luenta: äänilupalippu sallii testitunnuksella generoinnin; väärä lippu ei', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    await puhe(env, { 'x-matkakirja-testitunnus': 'tt', 'x-matkakirja-aanilupa': 'väärä' });
    assert.equal(aanikutsut, 0);
    const v = await puhe(env, { 'x-matkakirja-testitunnus': 'tt', 'x-matkakirja-aanilupa': 'lupa-123' }, 'Luvallinen.');
    assert.equal(v.status, 200);
    assert.equal(aanikutsut, 1);
  });
});

test('opas: testitunnuksella ei uutta ääntä (ei ääni-urlia, GET ei generoi); R2:ssa valmis ääni saa soida', async () => {
  await aja(async () => {
    const { env, r2 } = ymparisto();
    const t = await opas(env, { 'x-matkakirja-testitunnus': 'tt' });
    assert.equal(aanikutsut, 0, `toisto: testitunnuksen pysäkki generoi ääntä (${aanikutsut})`);
    assert.equal(t.d.aani ?? null, null, 'ei valmista ääntä → ei urlia');
    // Tavallinen pelaaja tuottaa saman pysäkin äänen R2:een; sen jälkeen testi saa soittaa valmiin (vain mp3, ei uutta pcm:ää).
    const n = await opas(env, {});
    assert.equal(n.mp3, 200);
    const tuotettu = aanikutsut;
    assert.ok([...r2.keys()].some((k) => /^opas\/[0-9a-f]{32}\.mp3$/.test(k)));
    const t2 = await opas(env, { 'x-matkakirja-testitunnus': 'tt' });
    assert.ok(t2.d.aani, 'valmis ääni R2:ssa → url');
    assert.equal(t2.mp3, 200);
    const pcmR2 = [...r2.keys()].some((k) => k.endsWith('.pcm'));
    assert.equal(Boolean(t2.d.aani_pcm), pcmR2, 'pcm-url vain, jos pcm on jo R2:ssa');
    assert.equal(aanikutsut, tuotettu, 'testi ei tuottanut mitään uutta');
  });
});
