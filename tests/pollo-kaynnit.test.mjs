/*
 * NIMETÖN KÄVIJÄLASKURI (tools/pollo/kaynnit.js, omistaja 30.9.2026):
 *  1. sama IP samana päivänä = yksi kävijä, toistuva ping ei kirjoita;
 *  2. omistaja (merkki tai kehittäjäkoodi) ei näy luvuissa eikä kirjoita;
 *  3. raaka IP ei päädy KV:hen;
 *  4. KV:n virhe ei kaada pyyntöä (200);
 *  5. luku vain kehittäjäkoodilla: maat, alustat, apuraha ja esittelylinssit.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const { default: worker } = await import('../tools/pollo/worker.js');
const { nollaaKaynnit } = await import('../tools/pollo/kaynnit.js');

function kvMittari({ heita = false } = {}) {
  const data = new Map();
  const kirjoitukset = [];
  return {
    data,
    kirjoitukset,
    async get(k) { if (heita) throw new Error('KV get failed'); return data.get(k) ?? null; },
    async put(k, v) { if (heita) throw new Error('KV put() limit exceeded for the day.'); kirjoitukset.push(k); data.set(k, v); },
  };
}

const pohja = { POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'salainen' };

async function kutsu(env, runko, { ip = '1.2.3.4', maa = 'SE', otsakkeet = {} } = {}) {
  const r = new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': ip, ...otsakkeet },
    body: JSON.stringify(runko),
  });
  Object.defineProperty(r, 'cf', { value: { country: maa } });
  const v = await worker.fetch(r, env, {});
  return { status: v.status, data: await v.json().catch(() => null) };
}

test.beforeEach(() => nollaaKaynnit());

test('sama kävijä lasketaan kerran, toistuva ping ei kirjoita', async () => {
  const kv = kvMittari();
  const env = { ...pohja, POLLO_KV: kv };
  const a = await kutsu(env, { tehtava: 'kaynti', alusta: 'web', versio: 'v2500', tapahtuma: 'avaus' });
  assert.equal(a.status, 200);
  assert.equal(a.data.laskettu, true);
  const kirjoituksiaEnsin = kv.kirjoitukset.length;
  assert.equal(kirjoituksiaEnsin, 2, 'suola + päivän avain');
  await kutsu(env, { tehtava: 'kaynti', alusta: 'web', versio: 'v2500', tapahtuma: 'avaus' });
  assert.equal(kv.kirjoitukset.length, kirjoituksiaEnsin, 'toistuva ping ei kirjoita');
  await kutsu(env, { tehtava: 'kaynti', alusta: 'ios', versio: '1.0.69', tapahtuma: 'avaus' }, { ip: '5.6.7.8', maa: 'FI' });
  await kutsu(env, { tehtava: 'kaynti', alusta: 'ios', tapahtuma: 'apuraha' }, { ip: '5.6.7.8', maa: 'FI' });
  await kutsu(env, { tehtava: 'kaynti', alusta: 'ios', tapahtuma: 'esittelylinssit' }, { ip: '5.6.7.8', maa: 'FI' });
  const luku = await kutsu(env, { tehtava: 'kaynnit', paivia: 2 }, { otsakkeet: { 'x-pollo-kehittaja': 'salainen' } });
  assert.equal(luku.status, 200);
  const tanaan = luku.data.paivat[0];
  assert.equal(tanaan.kavijoita, 2);
  assert.deepEqual(tanaan.maat, { SE: 1, FI: 1 });
  assert.deepEqual(tanaan.alustat, { web: 1, ios: 1 });
  assert.equal(tanaan.apuraha, 1);
  assert.equal(tanaan.esittelylinssit, 1);
  assert.equal(luku.data.paivat.length, 2);
  // Raaka IP ei ole missään KV:n avaimessa tai arvossa.
  for (const [k, v] of kv.data) assert.ok(!k.includes('1.2.3.4') && !String(v).includes('1.2.3.4') && !String(v).includes('5.6.7.8'), k);
});

test('omistaja ei näy luvuissa eikä kirjoita', async () => {
  const kv = kvMittari();
  const env = { ...pohja, POLLO_KV: kv };
  const a = await kutsu(env, { tehtava: 'kaynti', alusta: 'ios', omistaja: true });
  assert.equal(a.data.laskettu, false);
  const b = await kutsu(env, { tehtava: 'kaynti', alusta: 'web' }, { otsakkeet: { 'x-pollo-kehittaja': 'salainen' } });
  assert.equal(b.data.laskettu, false);
  assert.equal(kv.kirjoitukset.length, 0);
});

test('KV:n virhe ei kaada pyyntöä', async () => {
  const env = { ...pohja, POLLO_KV: kvMittari({ heita: true }) };
  const a = await kutsu(env, { tehtava: 'kaynti', alusta: 'web' });
  assert.equal(a.status, 200);
  assert.equal(a.data.ok, true);
});

test('luku vain kehittäjäkoodilla, tuntematon alusta ei laske', async () => {
  const env = { ...pohja };
  assert.equal((await kutsu(env, { tehtava: 'kaynnit' })).status, 403);
  assert.equal((await kutsu(env, { tehtava: 'kaynti', alusta: 'android' })).data.laskettu, false);
});

test('natiivi saa lähettää käynnin', async () => {
  const env = { ...pohja };
  const r = new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-matkakirja-natiivi': 'fi.matkakirja.peli', 'user-agent': 'fi.matkakirja.peli/1.0.69 CFNetwork', 'cf-connecting-ip': '9.9.9.9' },
    body: JSON.stringify({ tehtava: 'kaynti', alusta: 'ios', versio: '1.0.69' }),
  });
  const v = await worker.fetch(r, env, {});
  assert.equal(v.status, 200);
  assert.equal((await v.json()).laskettu, true);
});
