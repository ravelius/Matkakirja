// ELÄVÄN OPPAAN OHJAIMET (omistaja 6.10.2026, Päätoimittajan yksi sopimus, opas-juna 148): /opas/kysymykset, /opas/kysy,
// /opas/liiku. Testitunnuksella ei synny uutta ääntä.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { jasennaKeskustelu, poimiKysymykset, jasennaLiiku, kysymysAvain } from '../tools/pollo/opaskeskustelu.js';

beforeEach(() => tyhjennaReunamuisti());
const PAIKAT = { 'Rialto Bridge': [45.438, 12.336], 'Venice': [45.4371, 12.3326], 'Verona': [45.438, 10.992],
  'Grand Canal (Venice)': [45.437, 12.333], "St Mark's Basilica": [45.4345, 12.3397], 'Venetsia': [45.4371, 12.3326] };
let mallikutsut = [], aanikutsut = 0;
function vastausMallilta(jarjestelma, sisalto) {
  if (jarjestelma.includes('valmiita kysymyksiä')) return 'Kuka rakensi tämän sillan?\nMiksi silta on katettu?\nMitä kaupoissa myydään?\nMilloin silta valmistui?\nMiksi siltaa sanotaan Rialtoksi?\nMitä sillalta näkee?';
  if (jarjestelma.includes('tärkeimmät kohteet')) return Array.from({ length: 12 }, (_, i) => `KOHDE: Kohde ${i} | ${i % 2 ? 'Rialto Bridge' : "St Mark's Basilica"} ${i} | kuvaus | rakennus`).join('\n')
    .replace('Kohde 0 | St Mark\'s Basilica 0', "Pyhän Markuksen kirkko | St Mark's Basilica").replace('Kohde 1 | Rialto Bridge 1', 'Rialton silta | Rialto Bridge');
  if (sisalto.includes('Veronaan')) return 'TOIMINTO: kaupunki\nKOHDE: Verona\nTEKSTI: Lähdetään Veronaan.\nJATKO: Mitä Veronassa näkee?\nJATKO: Kuka asui Veronassa?';
  if (sisalto.includes('Rialto')) return 'TOIMINTO: siirry\nKOHDE: Rialton silta | Rialto Bridge\nTEKSTI: Lennetään Rialton sillalle.\nJATKO: Kuka rakensi Rialton?\nJATKO: Mitä sillalla myydään?';
  if (sisalto.includes('tauko')) return 'TOIMINTO: tauko\nTEKSTI: Pidetään pieni tauko.\nJATKO: Jatketaanko kierrosta?\nJATKO: Mitä tässä lähellä on?';
  return 'TOIMINTO: ei\nTEKSTI: Canal Grande on Venetsian pääkatu, ja sitä pitkin kulkevat vesibussit.\nJATKO: Miksi kanavassa ei ole autoja?\nJATKO: Montako siltaa kanavan yli on?';
}
const verkko = async (u, init) => {
  const s = decodeURIComponent(String(u));
  if (s.includes('api.anthropic.com')) {
    const b = JSON.parse(init.body); const jarjestelma = JSON.stringify(b.system); const sisalto = JSON.stringify(b.messages);
    mallikutsut.push(jarjestelma.slice(0, 60));
    return new Response(JSON.stringify({ content: [{ type: 'text', text: vastausMallilta(jarjestelma, sisalto) }], stop_reason: 'end_turn' }));
  }
  if (s.includes('api.elevenlabs.io')) { aanikutsut += 1; return new Response(new Uint8Array(8000)); }
  const t = /titles=([^&]+)/.exec(s)?.[1];
  if (t && t.split('|').some((x) => PAIKAT[x])) {   // myös erähaku (titles=A|B)
    return new Response(JSON.stringify({ query: { pages: Object.fromEntries(t.split('|').filter((x) => PAIKAT[x]).map((x, i) => [String(i + 1),
      { title: x, coordinates: [{ lat: PAIKAT[x][0], lon: PAIKAT[x][1] }] }])) } }));
  }
  return new Response(JSON.stringify({ query: { pages: {} }, search: [], claims: {}, entities: {} }));
};
function ymparisto() {
  const kv = new Map(), r2 = new Map();
  return { r2, env: { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_TESTITUNNUS: 'tt',
    OPAS_AINEISTO_TESTI: {}, POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k), body: r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } } } };
}
const H = (lisa = {}) => ({ 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '10.8.0.1', ...lisa });
async function aja(fn) {
  const vanha = globalThis.fetch; globalThis.fetch = verkko; mallikutsut = []; aanikutsut = 0;
  try { return await fn(); } finally { globalThis.fetch = vanha; }
}
const kysy = (env, kysymys, lisa = {}) => worker.fetch(new Request('https://pollo.example/opas/kysy', { method: 'POST', headers: H(lisa),
  body: JSON.stringify({ kaupunki: 'Venetsia', paikka: { id: 'Q1', nimi: 'Canal Grande', lat: 45.437, lon: 12.333 }, kysymys, historia: [] }) }), env, { waitUntil() {} })
  .then(async (v) => ({ status: v.status, d: await v.json() }));

test('jäsennys: keskustelu, kysymykset (≤ 60 mrk, kysymysmerkki), liiku', () => {
  const j = jasennaKeskustelu('TOIMINTO: siirry\nKOHDE: Rialton silta | Rialto Bridge\nTEKSTI: Mennään.\nJATKO: Kuka rakensi sillan?\nJATKO: ei kysymys');
  assert.equal(j.toiminto, 'siirry'); assert.equal(j.wikipedia, 'Rialto Bridge'); assert.deepEqual(j.jatkot, ['Kuka rakensi sillan?']);
  assert.deepEqual(poimiKysymykset('1. Kuka?\nMiksi kanava on niin leveä ja pitkä ja mutkainen ja vanha kaupungin keskellä?\nMitä täällä näkee?'), ['Mitä täällä näkee?']);
  assert.equal(jasennaLiiku('KOHDE: A | A_(x) | kuvaus | kirkko\nKOHDE: A | toinen').length, 1);
});

test('/opas/kysy: vastaus + 2 jatkoa; siirry kaupungin sisällä (ulkona false), kaupunki ulkona; tauko', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    const v = await kysy(env, 'Miksi täällä ei ole autoja?');
    assert.equal(v.status, 200);
    assert.match(v.d.teksti, /pääkatu/); assert.equal(v.d.toiminto, null); assert.equal(v.d.kysymykset.length, 2);
    assert.ok(v.d.aani, 'tavallinen pelaaja saa oppaan äänen');
    const s = await kysy(env, 'Vie minut Rialtolle');
    assert.deepEqual({ ...s.d.toiminto, lat: undefined, lon: undefined }, { tyyppi: 'siirry', nimi: s.d.toiminto.nimi, lat: undefined, lon: undefined, ulkona: false });
    assert.ok(Math.abs(s.d.toiminto.lat - 45.438) < 0.01);
    const k = await kysy(env, 'Haluan Veronaan');
    assert.equal(k.d.toiminto.tyyppi, 'kaupunki'); assert.equal(k.d.toiminto.nimi, 'Verona');
    const t = await kysy(env, 'Pidetään tauko');
    assert.deepEqual(t.d.toiminto, { tyyppi: 'tauko' });
  });
});

test('/opas/kysy testitunnuksella: ei äänigenerointia (ääni vain R2:sta)', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    const v = await kysy(env, 'Miksi täällä ei ole autoja?', { 'x-matkakirja-testitunnus': 'tt' });
    assert.equal(v.status, 200); assert.equal(v.d.aani, null); assert.equal(aanikutsut, 0);
  });
});

test('/opas/kysymykset: 6 kysymystä, toinen haku R2:sta ilman mallia', async () => {
  await aja(async () => {
    const { env, r2 } = ymparisto();
    const hae = () => worker.fetch(new Request('https://pollo.example/opas/kysymykset?paikka=Q1&nimi=Rialton%20silta&kaupunki=Venetsia', { headers: H() }), env, {}).then((v) => v.json());
    const a = await hae();
    assert.equal(a.kysymykset.length, 6); assert.ok(a.kysymykset.every((k) => k.endsWith('?') && k.length <= 60));
    assert.ok([...r2.keys()].some((k) => k.includes(encodeURIComponent(kysymysAvain('Q1')))));
    const ennen = mallikutsut.length; const b = await hae();
    assert.deepEqual(b.kysymykset, a.kysymykset); assert.equal(mallikutsut.length, ennen, 'välimuistista');
  });
});

test('/opas/liiku: tärkeysjärjestys koordinaatteineen, välimuisti', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    const hae = () => worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Venetsia', { headers: H() }), env, {}).then((v) => v.json());
    const a = await hae();
    assert.ok(a.kohteet.length >= 2);
    assert.deepEqual(a.kohteet.map((k) => k.tarkeys), a.kohteet.map((_, i) => i + 1));
    assert.ok(a.kohteet.every((k) => Number.isFinite(k.lat) && Number.isFinite(k.lon) && k.id));
  });
});

test('/opas/seuraava "lyhyt": true → lyhyen kerronnan ohje (natiivin kaupunkikierros); ilman ei ohjetta', async () => {
  const { oppaanViesti, siivoaOpasPyynto } = await import('../tools/pollo/opas.js');
  assert.equal(siivoaOpasPyynto({ lyhyt: true }).lyhyt, true);
  assert.equal(siivoaOpasPyynto({}).lyhyt, false);
  assert.match(oppaanViesti({ kaupunki: 'Venetsia', toive: 'Rialto', kaydyt: [], lyhyt: true }, []), /LYHYT KERRONTA/);
  assert.doesNotMatch(oppaanViesti({ kaupunki: 'Venetsia', toive: 'Rialto', kaydyt: [] }, []), /LYHYT/);
});

test('/opas/liiku: mallikutsu pettää kerran → uusinta, ei 502 (juna 148 todistusajo, Praha)', async () => {
  const vanha = globalThis.fetch; let ekat = 0;
  globalThis.fetch = async (u, init) => {
    const s = decodeURIComponent(String(u));
    if (s.includes('api.anthropic.com') && JSON.stringify(JSON.parse(init.body).system).includes('tärkeimmät kohteet') && ekat++ === 0) {
      return new Response('{"type":"error","error":{"type":"overloaded_error"}}', { status: 529 });
    }
    return verkko(u, init);
  };
  try {
    const { env } = ymparisto();
    const v = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Praha', { headers: H({ 'cf-connecting-ip': '10.8.0.9' }) }), env, {});
    assert.equal(v.status, 200, 'toisto: ensimmäinen virhe antoi 502');
    assert.ok((await v.json()).kohteet.length >= 1);
  } finally { globalThis.fetch = vanha; }
});

test('/opas/liiku: erähaku, alipyyntöjä vähän (Cloudflaren raja 50; Ateena 502 6.10. 14.32)', async () => {
  let muut = 0;
  const vanha = globalThis.fetch;
  globalThis.fetch = async (u, init) => { if (!String(u).includes('api.anthropic.com')) muut += 1; return verkko(u, init); };
  try {
    const { env } = ymparisto();
    const v = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Venetsia', { headers: H({ 'cf-connecting-ip': '10.8.0.7' }) }), env, {});
    assert.equal(v.status, 200);
    assert.ok(muut <= 8, `alipyyntöjä ${muut}`);
  } finally { globalThis.fetch = vanha; }
});

test('/opas/liiku: väärä sijainti kaupungin kanssa (omistaja TF 152, Sydney + Kööpenhaminan 55,679/12,576) → kaupungin sijainti, ei 502', async () => {
  await aja(async () => {
    const { env } = ymparisto();
    const v = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Venetsia&lat=55.6790&lon=12.5760',
      { headers: H({ 'cf-connecting-ip': '10.8.0.11' }) }), env, {});
    assert.equal(v.status, 200);
    assert.ok((await v.json()).kohteet.length >= 2, 'kohteet Venetsian säteeltä, ei Kööpenhaminan');
  });
});

// KULUSUUNNITELMA K4 (8.10.2026): valmiin kysymyksen vastaus kerran per paikka, kaikille; vapaa teksti aina mallilta.
const kysymykset = (env) => worker.fetch(new Request('https://pollo.example/opas/kysymykset?paikka=Q1&nimi=Canal%20Grande&kaupunki=Venetsia',
  { headers: H() }), env, { waitUntil() {} }).then((v) => v.json());
const kysyMallille = () => mallikutsut.filter((x) => x.includes('Olet Matkakirja-pelin kertoja')).length;   // KESKUSTELU_KEHOTE

test('K4: valmis kysymys → mallille kerran, toinen kysyjä saa saman vastauksen R2:sta (ääni samasta tekstistä)', async () => {
  await aja(async () => {
    const { env, r2 } = ymparisto();
    const lista = (await kysymykset(env)).kysymykset;
    assert.ok(lista.includes('Mitä sillalta näkee?'));
    const eka = await kysy(env, 'Mitä sillalta näkee?');
    assert.equal(kysyMallille(), 1);
    assert.ok([...r2.keys()].some((k) => decodeURIComponent(k).includes('opas:kysyvastaus:')), 'vastaus talteen');
    const toka = await kysy(env, '  mitä sillalta NÄKEE? ', { 'cf-connecting-ip': '10.8.0.2' });
    assert.equal(kysyMallille(), 1, 'toinen kysyjä ei kutsu mallia');
    assert.equal(toka.status, 200);
    assert.deepEqual({ ...toka.d, aani: null, aani_pcm: null }, { ...eka.d, aani: null, aani_pcm: null });
    assert.equal(toka.d.aani, eka.d.aani, 'sama ääni-url (sama teksti → sama tiiviste)');
  });
});

test('K4: vapaa kysymys aina mallille; testiliikenne ei kirjoita valmista vastausta', async () => {
  await aja(async () => {
    const { env, r2 } = ymparisto();
    await kysymykset(env);
    await kysy(env, 'Miksi täällä ei ole autoja?');
    await kysy(env, 'Miksi täällä ei ole autoja?');
    assert.equal(kysyMallille(), 2, 'vapaa teksti ei ole valmis kysymys');
    await kysy(env, 'Kuka rakensi tämän sillan?', { 'x-matkakirja-testitunnus': 'tt' });
    assert.ok(![...r2.keys()].some((k) => decodeURIComponent(k).includes('opas:kysyvastaus:')), 'testi ei kirjoita');
    await kysy(env, 'Kuka rakensi tämän sillan?');
    assert.equal(kysyMallille(), 4);
  });
});
