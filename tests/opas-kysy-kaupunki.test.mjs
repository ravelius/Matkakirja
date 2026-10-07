// KYSY TOISEN SALLITUN KAUPUNGIN KOHTEESEEN (Päätoimittaja 7.10.2026): Pariisissa "vie minut Pyhän Markuksen kirkkoon" →
// kaupungin vaihto Venetsiaan + kohde, ei kieltäytymistä; ei-sallittu (Tallinna) torjutaan, kun esto on päällä.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { KESKUSTELU_KEHOTE } from '../tools/pollo/opaskeskustelu.js';
import { OPAS_SALLITUT, sallittuAluePisteelle } from '../tools/pollo/sallitut.js';

beforeEach(() => tyhjennaReunamuisti());
const PAIKAT = { Pariisi: [48.8566, 2.3522], "St Mark's Basilica": [45.4345, 12.3397], 'Charles Bridge': [50.0865, 14.4114],
  'Eiffel Tower': [48.8584, 2.2945], 'Tallinn Old Town': [59.437, 24.745] };
const MALLI = [[/Markuksen/, "TOIMINTO: siirry\nKOHDE: Pyhän Markuksen kirkko | St Mark's Basilica\nTEKSTI: Lennetään Venetsiaan Pyhän Markuksen kirkolle."],
  [/Kaarlensilta/, 'TOIMINTO: siirry\nKOHDE: Kaarlensilta | Charles Bridge\nTEKSTI: Lennetään Prahaan Kaarlensillalle.'],
  [/Tallinnan/, 'TOIMINTO: siirry\nKOHDE: Tallinnan vanhakaupunki | Tallinn Old Town\nTEKSTI: Lennetään Tallinnaan.'],
  [/sanoo: Vie minut Eiffel/, 'TOIMINTO: siirry\nKOHDE: Eiffel-torni | Eiffel Tower\nTEKSTI: Lennetään Eiffel-tornille.']];
const verkko = async (u, init) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) {
    const sisalto = JSON.stringify(JSON.parse(init.body).messages);
    const v = MALLI.find(([re]) => re.test(sisalto))?.[1] ?? 'TOIMINTO: ei\nTEKSTI: Hyvä kysymys.';
    return new Response(JSON.stringify({ content: [{ type: 'text', text: `${v}\nJATKO: Mitä siellä näkee?\nJATKO: Kuka sen rakensi?` }], stop_reason: 'end_turn' }));
  }
  const t = /titles=([^&]+)/.exec(s)?.[1];
  if (t && t.split('|').some((x) => PAIKAT[x])) {
    return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.split('|').filter((x) => PAIKAT[x]).map((x, i) => [String(i + 1),
      { title: x, coordinates: [{ lat: PAIKAT[x][0], lon: PAIKAT[x][1] }] }])) } }));
  }
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
const env = (lisa = {}) => ({ ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_TESTITUNNUS: 'tt', OPAS_AINEISTO_TESTI: {},
  POLLO_KV: { get: async () => null, put: async () => {} }, PUHE_R2: { get: async () => null, put: async () => {} }, ...lisa });
async function kysy(e, kysymys) {
  const vanha = globalThis.fetch; globalThis.fetch = verkko;
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/kysy', { method: 'POST', headers: { 'content-type': 'application/json',
      origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.8.0.9', 'x-matkakirja-testitunnus': 'tt' },
      body: JSON.stringify({ kaupunki: 'Pariisi', paikka: { id: 'Q243', nimi: 'Eiffel-torni', lat: 48.8584, lon: 2.2945 }, kysymys, historia: [] }) }), e, { waitUntil() {} });
    return { status: v.status, d: await v.json() };
  } finally { globalThis.fetch = vanha; }
}

test('kehote: toisen kaupungin paikka on siirry, ei kieltäytymistä', () => {
  assert.match(KESKUSTELU_KEHOTE, /toisessa kaupungissa, toiminto on silti siirry/);
  assert.match(KESKUSTELU_KEHOTE, /Et kieltäydy/);
});

test('Pariisi → Pyhän Markuksen kirkko: kaupungin vaihto Venetsiaan + kohde', async () => {
  const { status, d } = await kysy(env(), 'Vie minut Pyhän Markuksen kirkkoon');
  assert.equal(status, 200);
  assert.equal(d.toiminto.tyyppi, 'kaupunki'); assert.equal(d.toiminto.id, 'venetsia'); assert.equal(d.toiminto.nimi, 'Venetsia');
  assert.ok(Math.abs(d.toiminto.kohde.lat - 45.4345) < 0.001 && /Markuksen/.test(d.toiminto.kohde.nimi));
  assert.doesNotMatch(d.teksti, /ei Pariisissa/);
});

test('Pariisi → näytä Kaarlensilta: Prahaan + kohde; oma kohde pysyy siirtona', async () => {
  const k = await kysy(env(), 'Näytä Kaarlensilta');
  assert.equal(k.d.toiminto.tyyppi, 'kaupunki'); assert.equal(k.d.toiminto.id, 'praha'); assert.ok(Math.abs(k.d.toiminto.kohde.lon - 14.4114) < 0.001);
  const e = await kysy(env(), 'Vie minut Eiffel-tornille');
  assert.equal(e.d.toiminto.tyyppi, 'siirry'); assert.equal(e.d.toiminto.ulkona, false);
});

test('ei-sallittu (Tallinna): esto päällä → torjunta; alue ei löydy listalta', async () => {
  assert.equal(sallittuAluePisteelle({ lat: 59.437, lon: 24.745 }), null);
  assert.equal(sallittuAluePisteelle({ lat: 45.4345, lon: 12.3397 })?.id, 'venetsia');
  const t = await kysy(env({ OPAS_SALLITUT_TESTI: OPAS_SALLITUT }), 'Vie minut Tallinnan vanhaankaupunkiin');
  assert.equal(t.d.toiminto.tyyppi, 'ei-sallittu', JSON.stringify(t.d.toiminto));
});
