// Vuosiluvut numeroina mallilta, sanoina puheeseen (Päätoimittaja 7.10.2026, tools/pollo/puhesanat.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vuosiluvutSanoiksi as v, lukuSanoina } from '../tools/pollo/puhesanat.js';
import { OPAS_KEHOTE } from '../tools/pollo/opas.js';

test('vuosiluvut perusmuodossa', () => {
  assert.equal(v('vuonna 1066 Normandia'), 'vuonna tuhatkuusikymmentäkuusi Normandia');
  assert.equal(v('Torni valmistui 1889.'), 'Torni valmistui tuhatkahdeksansataakahdeksankymmentäyhdeksän.');
  assert.equal(v('1889–1890'), 'tuhatkahdeksansataakahdeksankymmentäyhdeksän–tuhatkahdeksansataayhdeksänkymmentä');
  assert.equal(v('vuonna 800 ja vuoden 476 jälkeen'), 'vuonna kahdeksansataa ja vuoden neljäsataaseitsemänkymmentäkuusi jälkeen');
  assert.equal(lukuSanoina(1010), 'tuhatkymmenen');
  assert.equal(lukuSanoina(2025), 'kaksituhattakaksikymmentäviisi');
});

test('vuosisadat ja -kymmenet', () => {
  assert.equal(v('1300-luku'), 'tuhatkolmesataaluku');
  assert.equal(v('Silta rakennettiin 1300-luvulla.'), 'Silta rakennettiin tuhatkolmesataaluvulla.');
  assert.equal(v('Patsaat ovat 1600- ja 1700-luvuilla.'), 'Patsaat ovat tuhatkuusisataa- ja tuhatseitsemänsataaluvuilla.');
  assert.equal(v('1600- tai 1700-luvulta'), 'tuhatkuusisataa- tai tuhatseitsemänsataaluvulta');
  assert.equal(v('1870-luvun lopulla'), 'tuhatkahdeksansataaseitsemänkymmentäluvun lopulla');
  assert.equal(v('2000-luvulla'), 'kaksituhatluvulla');
});

test('muut luvut ennallaan', () => {
  for (const t of ['330 metriä', '1,5 kilometriä', '12 000 kävijää', 'kello 12.30', 'Q243', '3 kerrosta'])
    assert.equal(v(t), t);
  assert.equal(v(''), '');
  assert.equal(v(null), '');
});

test('kehote pyytää vuosiluvut numeroina', () => {
  assert.match(OPAS_KEHOTE, /NUMEROINA: vuonna 1889, 1600-luvulla/);
  assert.doesNotMatch(OPAS_KEHOTE, /Vuosiluvut ja numerot kirjoitat sanoina/);
  assert.doesNotMatch(OPAS_KEHOTE, /tuhatkahdeksansataa/);
});

test('pysäkki: näytölle numerot, ElevenLabsille sanat', async () => {
  const worker = (await import('../tools/pollo/worker.js')).default;
  const { tyhjennaReunamuisti } = await import('../tools/pollo/reuna.js');
  tyhjennaReunamuisti();
  const r2 = new Map(), elevenille = [];
  const env = { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    POLLO_TESTITUNNUS: 'tt', PUHE_R2: { get: async (k) => (r2.has(k) ? { body: r2.get(k), text: async () => r2.get(k) } : null),
      put: async (k, x) => { r2.set(k, x); } } };
  const TEKSTI = 'Tivoli avattiin vuonna 1843, ja puiston vanhimmat rakennukset ovat 1800-luvulta.';
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => {
    const s = decodeURIComponent(String(u));
    if (s.includes('api.anthropic.com')) return new Response(JSON.stringify({ content: [{ type: 'text', text: `NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: ${TEKSTI}\nVAIHTOEHTO: A?\nVAIHTOEHTO: B` }], stop_reason: 'end_turn' }));
    if (s.includes('titles=Tivoli Gardens')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Tivoli Gardens', pageprops: { wikibase_item: 'Q110289' }, coordinates: [{ lat: 55.6737, lon: 12.5681 }] } } } }));
    if (s.includes('api.elevenlabs.io')) { elevenille.push(JSON.parse(init.body).text); return new Response(new Uint8Array(16000), { status: 200, headers: { 'content-type': 'audio/mpeg' } }); }
    return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
  };
  try {
    const odotukset = [];
    const ctx = { waitUntil: (p) => odotukset.push(p) };
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: { 'content-type': 'application/json',
      origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.9.1.1' }, body: JSON.stringify({ kaupunki: 'Kööpenhamina', istunto: 's-vuosi' }) }), env, ctx);
    const d = await v.json();
    await Promise.all(odotukset);
    assert.match(d.teksti, /vuonna 1843/);
    assert.match(d.teksti, /1800-luvulta/);
    assert.ok(d.aani, 'ääni-url');
    const a = await worker.fetch(new Request(d.aani), env, ctx);
    await a.arrayBuffer(); await Promise.all(odotukset);
    assert.equal(elevenille.length, 1);
    assert.match(elevenille[0], /vuonna tuhatkahdeksansataaneljäkymmentäkolme, ja puiston vanhimmat rakennukset ovat tuhatkahdeksansataaluvulta/);
    assert.doesNotMatch(elevenille[0], /\d/);
  } finally { globalThis.fetch = vanha; }
});

test('välimerkit vuoden perässä', () => {
  assert.equal(v('vuonna 1843, ja'), 'vuonna tuhatkahdeksansataaneljäkymmentäkolme, ja');
  assert.equal(v('(1843)'), '(tuhatkahdeksansataaneljäkymmentäkolme)');
  assert.equal(v('1843; 1844: 1845!'), 'tuhatkahdeksansataaneljäkymmentäkolme; tuhatkahdeksansataaneljäkymmentäneljä: tuhatkahdeksansataaneljäkymmentäviisi!');
  assert.equal(v('1843,5 metriä'), '1843,5 metriä');
});
