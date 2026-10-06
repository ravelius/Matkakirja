// ESIGENEROITU ESITTELY (omistaja 7.10.2026): lukitun kaupungin kierros ja listan kohteet valmiista tekstistä ilman
// mallikutsua; kohde ilman valmista tekstiä ja vapaat toiveet live-mallilla.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { tyhjennaKuvalista } from '../tools/pollo/opas-kuvat.js';
import { oppaanEsittely, kaupunkiId, tyhjennaEsittelyt, valmisKohde } from '../tools/pollo/opas-esittely.js';

beforeEach(() => { tyhjennaReunamuisti(); tyhjennaKuvalista(); tyhjennaEsittelyt(); });
const kuva = (n) => ({ url: `https://media.matkakirja.app/kuvat/${n}.jpg`, tyyppi: 'valokuva', tekija: 'T', lisenssi: 'CC BY 4.0', lahdeUrl: `https://c/${n}`, jarjestys: 1 });
const KOHTEET = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`Q${100 + i}`,
  { nimi: `Kohde ${i}`, kaupunki: 'testila', lat: 60 + i / 1000, lon: 25, kuvat: [kuva(`k${i}`)] }]));
const LISTA = { kohteet: KOHTEET, kaupungit: { testila: { nimi: 'Testilä', lat: 60, lon: 25, kohteet: Object.keys(KOHTEET), kuvat: [] } } };
const ESITTELY = { kaupunki: 'Testilä', id: 'testila', versio: 1, kohteet: Array.from({ length: 9 }, (_, i) => ({
  id: `Q${100 + i}`, nimi: `Kohde ${i}`, kuvaus: `Kuvaus ${i}`, luokka: 'rakennus', koko_m: 120 + i,
  teksti: `Kohde ${i} on valmis pitkä kerronta.`, lyhyt: i < 8 ? `Kohde ${i} lyhyesti.` : null, syventava: `Miksi ${i}?`, isoisa: false, lahteet: [] })) };
const H = { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' };
function ymparisto() {
  const r2 = new Map(), kv = new Map();
  return { POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } }, ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, OPAS_KUVALISTA_TESTI: LISTA,
    OPAS_ESITTELY_TESTI: { testila: ESITTELY },
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); }, delete: async (k) => { r2.delete(k); } } };
}
async function opas(env, runko, malliVastaus = 'NIMI: Kohde 9\nTEKSTI: Live-kerronta.\nVAIHTOEHTO: A\nVAIHTOEHTO: B') {
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u, init) => {
    if (String(u).includes('anthropic')) { if (JSON.stringify(JSON.parse(init.body).system).includes('Matkakirja-pelin kertoja')) malli += 1; return new Response(JSON.stringify({ content: [{ type: 'text', text: malliVastaus }], stop_reason: 'end_turn' })); }
    return new Response(JSON.stringify({ query: { pages: {} }, claims: {}, entities: {} }));
  };
  try {
    const d = await (await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
      body: JSON.stringify({ kaupunki: 'Testilä', sijainti: { lat: 60, lon: 25 }, ...runko }) }), env, { waitUntil() {} })).json();
    return { d, malli };
  } finally { globalThis.fetch = vanha; }
}

test('kierros valmiista tekstistä ilman mallikutsua; toinen pysähdys myös', async () => {
  const env = ymparisto();
  const { d, malli } = await opas(env, { toive: 'Esittele kaupunki', istunto: 'e1' });
  assert.equal(malli, 0);
  assert.equal(d.valmis, true); assert.equal(d.id, 'Q100'); assert.equal(d.teksti, 'Kohde 0 on valmis pitkä kerronta.');
  assert.equal(d.alarivi, 'Kuvaus 0'); assert.equal(d.koko_m, 120); assert.equal(d.luokka, 'rakennus');
  assert.equal(d.vaihtoehdot[0], 'Miksi 0?'); assert.equal(d.vaihtoehdot.length, 2);
  assert.deepEqual(d.kierros, { numero: 1, maara: 8 }); assert.equal(d.kuvat.length, 1);
  const toka = await opas(env, { kaydyt: ['Q100'], istunto: 'e1' });
  assert.equal(toka.malli, 0); assert.equal(toka.d.id, 'Q101'); assert.equal(toka.d.valmis, true);
});

test('Kaupunkikierros-jono (lyhyt, toive = kohteen nimi) → lyhyt valmis teksti', async () => {
  const { d, malli } = await opas(ymparisto(), { toive: 'Kohde 3', lyhyt: true, istunto: 'e2' });
  assert.equal(malli, 0); assert.equal(d.id, 'Q103'); assert.equal(d.teksti, 'Kohde 3 lyhyesti.');
  const pitka = await opas(ymparisto(), { toive: 'Kohde 8', lyhyt: true, istunto: 'e3' });
  assert.equal(pitka.d.teksti, 'Kohde 8 on valmis pitkä kerronta.', 'ei lyhyttä → pitkä');
});

test('kohde ilman valmista tekstiä ja vapaa toive → live-malli', async () => {
  const a = await opas(ymparisto(), { toive: 'Kohde 9', istunto: 'e4' });
  assert.equal(a.malli, 1); assert.equal(a.d.valmis, undefined); assert.equal(a.d.teksti, 'Live-kerronta.');
  const b = await opas(ymparisto(), { toive: 'Missä voisi syödä?', istunto: 'e5' });
  assert.equal(b.malli, 1);
});

test('oppaanEsittely: vain listatut id:t, haku kerran, virhe → null', async () => {
  assert.equal(kaupunkiId('Kööpenhamina'), 'koopenhamina'); assert.equal(kaupunkiId('Malá Strana'), 'mala-strana');
  let n = 0;
  const haku = async () => { n += 1; return new Response(JSON.stringify(ESITTELY)); };
  assert.equal(await oppaanEsittely({}, 'Testilä', haku), null, 'ei aineistoindeksissä → ei hakua');
  assert.equal(n, 0);
  assert.equal(valmisKohde(ESITTELY, 'Q102').lyhyt, 'Kohde 2 lyhyesti.');
  assert.equal(valmisKohde(ESITTELY, 'Q999'), null);
});
