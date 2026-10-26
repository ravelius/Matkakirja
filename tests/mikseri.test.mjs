// Mikserin tasot kaikille (omistaja 9.10.2026): GET julkinen, POST vain kehittäjäkoodilla, versioitu R2-tallennus.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tarkistaTasot, MIKSERI_AVAIN, MIKSERI_HISTORIA } from '../tools/pollo/mikseri.js';

const KOODI = 'testikoodi-123';
function ymparisto() {
  const r2 = new Map();
  return { r2, POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: KOODI,
    PUHE_R2: { get: async (k) => (r2.has(k) ? { text: async () => r2.get(k) } : null), put: async (k, v) => { r2.set(k, v); } } };
}
const O = { origin: 'https://matkakirja.app' };
const hae = (env, h = O) => worker.fetch(new Request('https://pollo.example/mikseri/tasot', { headers: h }), env, {});
const tallenna = (env, runko, h = { ...O, 'content-type': 'application/json', 'x-pollo-kehittaja': KOODI }) =>
  worker.fetch(new Request('https://pollo.example/mikseri/tasot', { method: 'POST', headers: h, body: typeof runko === 'string' ? runko : JSON.stringify(runko) }), env, {});
const TASOT = { kartta: { ryhmat: { musiikki: 0.8, tausta: 1.2 }, aanet: { 'aanet/sonniss-aanet-v3/kolikot-1': 0.5 } }, pallo: { ryhmat: { tuuli: 0.7 } } };

test('tyhjänä luku palauttaa versio 0 ja tyhjät tasot, välimuisti 60 s', async () => {
  const v = await hae(ymparisto());
  assert.equal(v.status, 200);
  assert.match(v.headers.get('cache-control'), /max-age=60/);
  assert.deepEqual(await v.json(), { versio: 0, skeema: 1, paivitetty: null, tasot: {} });
});

test('tallennus ilman koodia tai väärällä koodilla → 403, mitään ei kirjoiteta', async () => {
  const env = ymparisto();
  assert.equal((await tallenna(env, { tasot: TASOT }, { ...O, 'content-type': 'application/json' })).status, 403);
  assert.equal((await tallenna(env, { tasot: TASOT }, { ...O, 'content-type': 'application/json', 'x-pollo-kehittaja': 'väärä' })).status, 403);
  assert.equal(env.r2.size, 0);
  const ilmanSalaisuutta = { ...ymparisto(), POLLO_KEHITTAJAKOODI: undefined };
  assert.equal((await tallenna(ilmanSalaisuutta, { tasot: TASOT })).status, 403);
});

test('kehittäjäkoodilla tallennus → versio 1, historia ja voimassa oleva; luku palauttaa samat tasot', async () => {
  const env = ymparisto();
  const v = await tallenna(env, { tasot: TASOT });
  assert.equal(v.status, 200);
  const d = await v.json();
  assert.equal(d.ok, true); assert.equal(d.versio, 1);
  assert.ok(env.r2.has(MIKSERI_AVAIN)); assert.ok(env.r2.has(MIKSERI_HISTORIA(1)));
  const l = await (await hae(env)).json();
  assert.equal(l.versio, 1);
  assert.deepEqual(l.tasot.kartta, { ryhmat: { musiikki: 0.8, tausta: 1.2 }, aanet: { 'aanet/sonniss-aanet-v3/kolikot-1': 0.5 } });
  assert.deepEqual(l.tasot.pallo, { ryhmat: { tuuli: 0.7 }, aanet: {} });
  assert.ok(!JSON.stringify(l).includes(KOODI), 'koodi ei koskaan vastauksessa');
});

test('pohjaVersio: väärä → 409 eikä ylikirjoitusta, oikea → versio 2', async () => {
  const env = ymparisto();
  await tallenna(env, { tasot: TASOT });
  const ristiriita = await tallenna(env, { tasot: { kartta: { ryhmat: { musiikki: 0.1 } } }, pohjaVersio: 0 });
  assert.equal(ristiriita.status, 409);
  assert.equal((await (await hae(env)).json()).tasot.kartta.ryhmat.musiikki, 0.8);
  const ok = await (await tallenna(env, { tasot: { kartta: { ryhmat: { musiikki: 0.1 } } }, pohjaVersio: 1 })).json();
  assert.equal(ok.versio, 2);
  assert.ok(env.r2.has(MIKSERI_HISTORIA(1)) && env.r2.has(MIKSERI_HISTORIA(2)));
});

test('skeema: kerroin 0–4, tunnusten muoto, ei-JSON ja liian suuri → 400/413', async () => {
  assert.ok(tarkistaTasot({ kartta: { ryhmat: { musiikki: 5 } } }).virhe);
  assert.ok(tarkistaTasot({ kartta: { ryhmat: { musiikki: -0.1 } } }).virhe);
  assert.ok(tarkistaTasot({ kartta: { ryhmat: { musiikki: 'kova' } } }).virhe);
  assert.ok(tarkistaTasot({ 'Kartta Iso': { ryhmat: {} } }).virhe);
  assert.ok(tarkistaTasot({ kartta: { aanet: { '../x': 1 } } }).virhe);
  assert.ok(tarkistaTasot([]).virhe);
  assert.deepEqual(tarkistaTasot({ kartta: { ryhmat: { musiikki: 0.12345 } } }).tasot.kartta.ryhmat.musiikki, 0.123);
  const env = ymparisto();
  assert.equal((await tallenna(env, 'ei json')).status, 400);
  assert.equal((await tallenna(env, { tasot: { kartta: { ryhmat: { musiikki: 9 } } } })).status, 400);
  assert.equal((await tallenna(env, { tasot: TASOT, taytetta: 'x'.repeat(140 * 1024) })).status, 413);
  assert.equal(env.r2.size, 0);
});

test('vieras origin → 403 sekä luvussa että tallennuksessa', async () => {
  const env = ymparisto();
  assert.equal((await hae(env, { origin: 'https://paha.example' })).status, 403);
  assert.equal((await tallenna(env, { tasot: TASOT }, { origin: 'https://paha.example', 'content-type': 'application/json', 'x-pollo-kehittaja': KOODI })).status, 403);
});

test('natiivi ilman Originia (sovellustunniste + user-agent): luku ja tallennus toimivat', async () => {
  const { NATIIVI_OTSAKE } = await import('../tools/pollo/rajat.js');
  const N = { [NATIIVI_OTSAKE]: 'fi.matkakirja.peli', 'user-agent': 'fi.matkakirja.peli/1.1 (iPad)' };
  const env = ymparisto();
  assert.equal((await tallenna(env, { tasot: TASOT }, { ...N, 'content-type': 'application/json', 'x-pollo-kehittaja': KOODI })).status, 200);
  const v = await hae(env, N);
  assert.equal(v.status, 200);
  assert.equal((await v.json()).versio, 1);
  assert.equal((await hae(env, { 'user-agent': 'curl/8' })).status, 403);
});

test('?konteksti=pallo yhdistää vain sen kontekstin (PUT), muut säilyvät; vieras konteksti rungossa → 400', async () => {
  const env = ymparisto();
  await tallenna(env, { tasot: TASOT });
  const put = (q, runko) => worker.fetch(new Request(`https://pollo.example/mikseri/tasot${q}`, { method: 'PUT',
    headers: { ...O, 'content-type': 'application/json', 'x-pollo-kehittaja': KOODI }, body: JSON.stringify(runko) }), env, {});
  assert.equal((await put('?konteksti=pallo', { tasot: { pallo: { ryhmat: { tuuli: 0.3 } } } })).status, 200);
  const l = await (await hae(env)).json();
  assert.equal(l.versio, 2); assert.equal(l.tasot.pallo.ryhmat.tuuli, 0.3); assert.equal(l.tasot.kartta.ryhmat.musiikki, 0.8);
  assert.equal((await put('?konteksti=pallo', { tasot: { kartta: { ryhmat: { musiikki: 0 } } } })).status, 400);
  assert.equal((await put('?konteksti=pallo', { tasot: {} })).status, 200);
  const t = (await (await hae(env)).json()).tasot;
  assert.ok(!t.pallo && t.kartta, 'tyhjä runko palauttaa kontekstin oletuksiin');
});

test('GET /mikseri/historia: viimeiset 10 uusin ensin, ei välimuistia', async () => {
  const env = ymparisto();
  for (let i = 1; i <= 12; i++) await tallenna(env, { tasot: { kartta: { ryhmat: { musiikki: i / 10 } } } });
  const v = await worker.fetch(new Request('https://pollo.example/mikseri/historia', { headers: O }), env, {});
  assert.equal(v.status, 200); assert.match(v.headers.get('cache-control'), /no-store/);
  const { versiot } = await v.json();
  assert.equal(versiot.length, 10); assert.equal(versiot[0].versio, 12); assert.equal(versiot[9].versio, 3);
  assert.equal(versiot[0].tasot.kartta.ryhmat.musiikki, 1.2);
});
