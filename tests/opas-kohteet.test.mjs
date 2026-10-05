// TÄKYLUETTELO (GET /opas/kohteet) ja ODOTA (omistaja TF 144 -palaute 5.10.2026, juna 146–147).
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { jasennaKohteet, kohdeAvain } from '../tools/pollo/kohteet.js';

function ymparisto() {
  const kv = new Map();
  return { kv, env: { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {},
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); }, delete: async (k) => { kv.delete(k); } } } };
}
const NATIIVI = { 'x-matkakirja-natiivi': 'fi.matkakirja.peli', 'user-agent': 'Matkakirja/1.0 fi.matkakirja.peli' };

function verkko(malliteksti) {
  const k = { malli: 0 };
  const fetch = async (u, init) => {
    const s = decodeURIComponent(String(u));
    if (s.includes('api.anthropic.com')) { k.malli += 1; k.viesti = JSON.parse(init.body).messages.at(-1).content; return new Response(JSON.stringify({ content: [{ type: 'text', text: malliteksti }], stop_reason: 'end_turn' })); }
    if (s.includes('titles=Grand Canal (Venice)')) return new Response(JSON.stringify({ query: { pages: { 1: { title: 'Grand Canal (Venice)', pageprops: { wikibase_item: 'Q189193' }, coordinates: [{ lat: 45.4375, lon: 12.3358 }] } } } }));
    if (s.includes('titles=Acropolis of Athens')) return new Response(JSON.stringify({ query: { pages: { 2: { title: 'Acropolis of Athens', pageprops: { wikibase_item: 'Q131013' }, coordinates: [{ lat: 37.9715, lon: 23.7257 }] } } } }));
    if (s.includes('titles=Central Park')) return new Response(JSON.stringify({ query: { pages: { 3: { title: 'Central Park', pageprops: { wikibase_item: 'Q160409' }, coordinates: [{ lat: 40.7825, lon: -73.9656 }] } } } }));
    if (s.includes('property=P18')) return new Response(JSON.stringify({ claims: {} }));
    return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
  };
  return { fetch, k };
}
const MALLI = 'KOHDE: Venetsian Canal Grande | Grand Canal (Venice) | Venetsia | it | Kaupunki, jonka pääkatu on vettä.\n'
  + 'KOHDE: Akropolis | Acropolis of Athens | Ateena | GR | Kallio, jolta länsimainen ajattelu katsoi kaupunkia.\n'
  + 'KOHDE: Central Park | Central Park | New York | US | Metsä pilvenpiirtäjien keskellä.\nroskaa';

test('jäsennys: kohteet, ISO isoksi, kaksoiskappaleet pois', () => {
  const k = jasennaKohteet(MALLI + '\nKOHDE: akropolis | x | Ateena | GR | toisto');
  const pitka = jasennaKohteet('KOHDE: X | X | Y | FI | ' + 'sana '.repeat(30))[0].koukku;
  assert.ok(pitka.length <= 91 && pitka.endsWith('a.'), `sanarajalle: ${pitka}`);
  assert.deepEqual(k.map((x) => [x.nimi, x.iso, x.kaupunki]), [['Venetsian Canal Grande', 'IT', 'Venetsia'], ['Akropolis', 'GR', 'Ateena'], ['Central Park', 'US', 'New York']]);
});

test('GET /opas/kohteet: maailma, koordinaatit Wikipediasta, välimuisti päivässä (yksi mallikutsu), natiivi vaaditaan', async () => {
  const { env, kv } = ymparisto();
  const { fetch, k } = verkko(MALLI);
  const vanha = globalThis.fetch; globalThis.fetch = fetch;
  try {
    const hae = (otsakkeet = NATIIVI) => worker.fetch(new Request('https://pollo.example/opas/kohteet', { headers: otsakkeet }), env, {});
    assert.equal((await hae({})).status, 403, 'ilman natiivia tai originia');
    const v = await hae();
    assert.equal(v.status, 200);
    const d = await v.json();
    assert.equal(d.kohteet.length, 3);
    assert.deepEqual(d.kohteet[0], { id: 'Q189193', nimi: 'Venetsian Canal Grande', koukku: 'Kaupunki, jonka pääkatu on vettä.', kaupunki: 'Venetsia', iso: 'IT', lat: 45.4375, lon: 12.3358, alarivi: null, kuva: null });
    assert.match(k.viesti, /Koko maailma/);
    assert.ok(kv.has(kohdeAvain(null, d.paiva)));
    await hae();
    assert.equal(k.malli, 1, 'toinen haku välimuistista');
  } finally { globalThis.fetch = vanha; }
});

test('ODOTA: toive null kierroksen ulkopuolella nähtyjen jälkeen → {tyyppi: "odota"} ilman mallikutsua', async () => {
  const { env } = ymparisto();
  const { fetch, k } = verkko('NIMI: Tivoli\nWIKIPEDIA: Tivoli Gardens\nTEKSTI: X.\nVAIHTOEHTO: A?\nVAIHTOEHTO: B');
  const vanha = globalThis.fetch; globalThis.fetch = fetch;
  try {
    const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' },
      body: JSON.stringify({ kaupunki: 'Kööpenhamina', nahdyt: ['Q110289'], istunto: 's1' }) }), env, {});
    assert.deepEqual(await v.json(), { tyyppi: 'odota' });
    assert.equal(k.malli, 0, 'ei Sonnetia');
  } finally { globalThis.fetch = vanha; }
});
