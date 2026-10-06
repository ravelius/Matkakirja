// KV-KESTÄVYYS (Päätoimittaja 6.10.2026 aamu: Cloudflaren hälytys "KV daily operation limit 50% reached", ilmaistaso
// 1 000 kirjoitusta/vrk). Vika toistetaan ensin: kun KV:n päiväraja on täynnä (put heittää), oppaan pysäkki ja sen ääni
// eivät saa kadota; ja tavallinen pysäkki ei saa kirjoittaa KV:hen montaa kertaa.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

const TEKSTI = 'Tivoli on huvipuisto keskellä kaupunkia.';
function ymparisto({ taysi = false, lisa = {} } = {}) {
  const kv = new Map(), r2 = new Map(), kirjoitukset = [];
  const POLLO_KV = {
    get: async (k) => kv.get(k) ?? null,
    put: async (k, v) => { if (taysi) throw new Error('KV put() limit exceeded for the day.'); kirjoitukset.push(k); kv.set(k, v); },
    delete: async (k) => { if (taysi) throw new Error('KV delete() limit exceeded for the day.'); kirjoitukset.push(`DEL ${k}`); kv.delete(k); },
  };
  return { kv, r2, kirjoitukset, env: { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app',
    OPAS_AINEISTO_TESTI: {}, POLLO_TESTITUNNUS: 'tt', POLLO_KV,
    PUHE_R2: { get: async (k) => (r2.has(k) ? { body: r2.get(k), text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } },
    ...lisa } };
}
const verkko = async (u) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) return new Response(JSON.stringify({ content: [{ type: 'text', text: `NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: ${TEKSTI}\nVAIHTOEHTO: A?\nVAIHTOEHTO: B` }], stop_reason: 'end_turn' }));
  if (s.includes('titles=Tivoli Gardens')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } }));
  if (s.includes('titles=Kööpenhamina')) return new Response(JSON.stringify({ query: { pages: { 7: { coordinates: [{ lat: 55.676, lon: 12.568 }] } } } }));
  if (s.includes('api.elevenlabs.io')) return new Response(new Uint8Array(16000), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
async function pysakki(env, { ip = '10.9.0.1', otsakkeet = {}, runko = {} } = {}) {
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  const odotukset = [];
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': ip, ...otsakkeet },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', istunto: 's-kv', ...runko }) }), env, { waitUntil: (p) => odotukset.push(p) });
    const d = await v.json();
    await Promise.all(odotukset);
    let aani = null;
    if (d.aani) {
      const a = await worker.fetch(new Request(d.aani), env, { waitUntil: (p) => odotukset.push(p) });
      aani = a.status;
      await Promise.all(odotukset);
    }
    return { status: v.status, d, aani };
  } finally { globalThis.fetch = vanha; }
}

test('KV:n päiväraja täynnä: pysäkki 200 ja ääni 200 (teksti R2:ssa, lukko reunassa)', async () => {
  tyhjennaReunamuisti();
  const { env } = ymparisto({ taysi: true });
  const p = await pysakki(env);
  assert.equal(p.status, 200, 'toisto: pysäkki ei saa kaatua KV-rajaan');
  assert.ok(p.d.aani, 'ääni-url annetaan');
  assert.equal(p.aani, 200, 'toisto: ääni ei saa kadota KV-rajaan');
});

test('tavallinen pysäkki kirjoittaa KV:hen enintään 2 kertaa; testitunnuksella ei laskureita', async () => {
  tyhjennaReunamuisti();
  const { env, kirjoitukset } = ymparisto();
  await pysakki(env);
  assert.ok(kirjoitukset.length <= 2, `kirjoituksia ${kirjoitukset.length}: ${kirjoitukset.join(', ')}`);
  assert.ok(!kirjoitukset.some((k) => k.startsWith('opas:teksti:')), 'teksti R2:een, ei KV:hen');
  assert.ok(!kirjoitukset.some((k) => k.startsWith('opas:tuotanto:')), 'lukko reunamuistiin');
  const ennen = kirjoitukset.length;
  await pysakki(env, { ip: '10.9.0.2', otsakkeet: { 'x-matkakirja-testitunnus': 'tt' }, runko: { kaupunki: 'Kööpenhamina', istunto: 's-kv2' } });
  const testin = kirjoitukset.slice(ennen).filter((k) => /^opas:p|^pollo:p/.test(k));
  assert.deepEqual(testin, [], 'testitunnuksen pyyntö ei kirjoita IP-laskuria');
});

test('istunnon tila R2:ssa säilyy isolaatin vaihdon yli ja vanhenee (Cache API ei toimi workers.dev:ssä)', async () => {
  const { pysyvaLue, pysyvaKirjoita, pysyvaPoista } = await import('../tools/pollo/reuna.js');
  const r2m = new Map();
  const r2 = { get: async (k) => (r2m.has(k) ? { text: async () => r2m.get(k) } : null), put: async (k, v) => { r2m.set(k, v); },
    delete: async (k) => { r2m.delete(k); } };
  await pysyvaKirjoita(r2, 'opas:kierros:x', '{"a":1}', 60, 1000);
  tyhjennaReunamuisti();   // uusi isolaatti
  assert.equal(await pysyvaLue(r2, 'opas:kierros:x', 2000), '{"a":1}', 'R2:sta');
  tyhjennaReunamuisti();
  assert.equal(await pysyvaLue(r2, 'opas:kierros:x', 1000 + 61000), null, 'vanhentunut');
  await pysyvaPoista(r2, 'opas:kierros:x');
  assert.equal(r2m.size, 0);
  assert.equal(await pysyvaLue({ get: async () => { throw new Error('R2 alhaalla'); } }, 'y'), null, 'R2-virhe = null');
});
