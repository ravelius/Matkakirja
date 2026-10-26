// KULUSUUNNITELMA K1 (Päätoimittaja 8.10.2026): testi-/kehitysliikenne Haikulle, jaetut välimuistit tuotantomallilla,
// kululokirivi jokaisesta mallikutsusta. docs/raportit/kustannussuunnitelma-20261008.md.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { kuluLuokka, kuluKentat, valitseMalli, kuluRivi, KULU_TESTIMALLI_OLETUS } from '../tools/pollo/kulut.js';

beforeEach(() => tyhjennaReunamuisti());

const TF = 'Matkakirja/1.1 (fi.matkakirja.peli)';
const PROTO = 'Matkakirja/0.1.0 (app.matkakirja.proto3d)';

test('kuluLuokka: proto3d, kehityskäännös, node, curl ja testiotsakkeet ovat testiä; TF-appi on peliä', () => {
  for (const ua of [PROTO, 'app.matkakirja.proto3d/1', 'Matkakirja/0.1.0 (fi.matkakirja.peli.kehitys)', 'node', 'curl/8.7.1']) {
    assert.equal(kuluLuokka({ ua }), 'testi', ua);
  }
  assert.equal(kuluLuokka({ ua: TF }), 'peli');
  assert.equal(kuluLuokka({ ua: 'Mozilla/5.0 (iPhone)' }), 'peli');
  assert.equal(kuluLuokka({ ua: TF, testi: true }), 'testi');
  assert.equal(kuluLuokka({ ua: TF, testitunnus: true }), 'testi');
});

test('valitseMalli: testimalli paitsi jaetuille; "pois" palauttaa tuotantomallin', () => {
  const testi = kuluKentat({}, { ua: PROTO, reitti: '/opas/kysy' });
  assert.equal(testi.KULU_TESTIMALLI, KULU_TESTIMALLI_OLETUS);
  assert.equal(valitseMalli(testi, { malliOhitus: 'claude-sonnet-5-5', oletus: 'x' }), KULU_TESTIMALLI_OLETUS);
  assert.equal(valitseMalli(testi, { malliOhitus: 'claude-sonnet-5-5', jaettu: true, oletus: 'x' }), 'claude-sonnet-5-5');
  assert.equal(kuluKentat({ OPAS_TESTI_MALLI: 'pois' }, { ua: PROTO }).KULU_TESTIMALLI, undefined);
  assert.equal(kuluKentat({}, { ua: TF }).KULU_TESTIMALLI, undefined);
  assert.equal(valitseMalli({ POLLO_MALLI: 'claude-sonnet-5-5' }, { oletus: 'x' }), 'claude-sonnet-5-5');
});

test('kuluRivi: reitti, luokka, malli ja tokenit, ei tekstiä', () => {
  const rivi = kuluRivi({ KULU_REITTI: '/opas/kysy', KULU_LUOKKA: 'testi' }, 'claude-haiku-5-5',
    { input_tokens: 220, cache_creation_input_tokens: 0, cache_read_input_tokens: 1559, output_tokens: 300 });
  assert.equal(rivi, 'kulu: /opas/kysy testi claude-haiku-5-5 in=220 cw=0 cr=1559 out=300');
});

// Kokonainen kulku workerin läpi: mitä mallia kutsutaan ja mitä lokiin jää.
let kutsut = [];
const verkko = async (u, init) => {
  const s = String(u);
  if (s.includes('api.anthropic.com')) {
    const b = JSON.parse(init.body);
    kutsut.push({ malli: b.model, jarjestelma: JSON.stringify(b.system).slice(0, 80) });
    const teksti = JSON.stringify(b.system).includes('valmiita kysymyksiä')
      ? 'Kuka rakensi tämän?\nMiksi se on tässä?\nMitä täällä näkee?\nMilloin se valmistui?\nKuka täällä asui?'
      : 'TOIMINTO: ei\nTEKSTI: Canal Grande on Venetsian pääkatu.\nJATKO: Miksi kanavassa ei ole autoja?\nJATKO: Montako siltaa on?';
    return new Response(JSON.stringify({ model: b.model, content: [{ type: 'text', text: teksti }], stop_reason: 'end_turn',
      usage: { input_tokens: 10, cache_creation_input_tokens: 0, cache_read_input_tokens: 5, output_tokens: 7 } }));
  }
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
function ymparisto(lisa = {}) {
  const kv = new Map(), r2 = new Map();
  return { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'kk', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k), body: r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } },
    ...lisa };
}
async function aja(fn) {
  const vanhaFetch = globalThis.fetch, vanhaLog = console.log; const loki = [];
  globalThis.fetch = verkko; console.log = (x) => loki.push(String(x)); kutsut = [];
  try { await fn(); } finally { globalThis.fetch = vanhaFetch; console.log = vanhaLog; }
  return loki;
}
const kysy = (env, ua, lisa = {}) => worker.fetch(new Request('https://pollo.example/opas/kysy', { method: 'POST',
  headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.9.0.1', 'user-agent': ua, ...lisa },
  body: JSON.stringify({ kaupunki: 'Venetsia', paikka: { id: 'Q1', nimi: 'Canal Grande', lat: 45.437, lon: 12.333 },
    kysymys: 'Miksi täällä ei ole autoja?', historia: [] }) }), env, { waitUntil() {} });

test('/opas/kysy: proto3d-simu → Haiku, TF-appi kehittäjäkoodilla → Sonnet; kululokirivi kummastakin', async () => {
  const loki = await aja(async () => {
    assert.equal((await kysy(ymparisto(), PROTO)).status, 200);
    assert.equal((await kysy(ymparisto(), TF, { 'x-pollo-kehittaja': 'kk' })).status, 200);
  });
  assert.deepEqual(kutsut.map((k) => k.malli), [KULU_TESTIMALLI_OLETUS, 'claude-sonnet-5-5']);
  const rivit = loki.filter((x) => x.startsWith('kulu: '));
  assert.deepEqual(rivit, [`kulu: /opas/kysy testi ${KULU_TESTIMALLI_OLETUS} in=10 cw=0 cr=5 out=7`,
    'kulu: /opas/kysy peli claude-sonnet-5-5 in=10 cw=0 cr=5 out=7']);
});

test('/opas/kysy: OPAS_TESTI_MALLI=pois → testikin Sonnetilla', async () => {
  await aja(async () => { await kysy(ymparisto({ OPAS_TESTI_MALLI: 'pois' }), PROTO); });
  assert.deepEqual(kutsut.map((k) => k.malli), ['claude-sonnet-5-5']);
});

test('/opas/kysymykset (jaettu välimuisti): testiliikennekin generoi tuotantomallilla', async () => {
  await aja(async () => {
    const v = await worker.fetch(new Request('https://pollo.example/opas/kysymykset?paikka=Q99&nimi=Rialton%20silta&kaupunki=Venetsia', {
      headers: { origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.9.0.2', 'user-agent': PROTO } }), ymparisto(), { waitUntil() {} });
    assert.equal(v.status, 200);
    assert.equal((await v.json()).kysymykset.length, 5);
  });
  assert.deepEqual(kutsut.map((k) => k.malli), ['claude-sonnet-5-5']);
});
