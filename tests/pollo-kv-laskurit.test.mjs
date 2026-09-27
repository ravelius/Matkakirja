/*
 * POLLON KV-LASKURIT EIVÄT KAADA PALVELUA (Fable 27.9.2026 klo 18.3x:
 * KV:n ilmaistason päiväkiintiöstä 1 000 kirjoitusta oli käytetty 544;
 * ylityksen jälkeen kv.put heittää, ja luenta ja chat olisivat kaatuneet).
 *
 *  1. KV heittää luvussa ja kirjoituksessa → puhe vastaa silti 200.
 *  2. Kehittäjäkoodilla tehty puhe ei kirjoita IP:n päivälaskuria.
 *  3. Kuukauden puhelaskuri kirjoitetaan harvoin: monta pientä palaa → ≤ 1 kirjoitus.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const { default: worker, nollaaLaskurit } = await import('../tools/pollo/worker.js');

function kvMittari({ heita = false } = {}) {
  const data = new Map();
  const kirjoitukset = [];
  return {
    kirjoitukset,
    async get(k) { if (heita) throw new Error('KV put() limit exceeded for the day.'); return data.get(k) ?? null; },
    async put(k, v) { if (heita) throw new Error('KV put() limit exceeded for the day.'); kirjoitukset.push(k); data.set(k, v); },
  };
}

async function puhe(env, { teksti = 'Hei maailma.', otsakkeet = {} } = {}) {
  return worker.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '1.2.3.4', ...otsakkeet },
    body: JSON.stringify({ tehtava: 'puhe', teksti, persoona: 'kertoja' }),
  }), env, {});
}

const alkuperainen = globalThis.fetch;
test.beforeEach(() => {
  nollaaLaskurit();
  globalThis.fetch = async () => new Response(new Uint8Array([0xff, 0xf3, 0x44]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
});
test.afterEach(() => { globalThis.fetch = alkuperainen; });

const pohja = { POLLO_ORIGINIT: 'https://matkakirja.app', XAI_API_KEY: 'x', OPENAI_API_KEY: 'o' };

test('KV heittää (päiväkiintiö täynnä) → puhe vastaa silti 200', async () => {
  const loki = console.log;
  const rivit = [];
  console.log = (...a) => rivit.push(a.join(' '));
  try {
    const v = await puhe({ ...pohja, POLLO_KV: kvMittari({ heita: true }) });
    assert.equal(v.status, 200);
    assert.ok(rivit.some((r) => /laskurin (luku|kirjoitus) epäonnistui/.test(r)), 'virhe kirjataan');
  } finally {
    console.log = loki;
  }
});

test('tavallinen puhe: yksi KV-kirjoitus per pala (IP:n päivälaskuri), kuukausi harvana', async () => {
  const kv = kvMittari();
  for (let i = 0; i < 10; i += 1) assert.equal((await puhe({ ...pohja, POLLO_KV: kv }, { teksti: `Pala ${i}.` })).status, 200);
  const paiva = kv.kirjoitukset.filter((k) => k.startsWith('puhe:p:')).length;
  const kuukausi = kv.kirjoitukset.filter((k) => k.startsWith('puhe:k:')).length;
  assert.equal(paiva, 10);
  assert.ok(kuukausi <= 1, `kuukauden laskuri kirjoitettiin ${kuukausi} kertaa`);
});

test('kehittäjäkoodi: ei IP:n päivälaskurin kirjoitusta', async () => {
  const kv = kvMittari();
  const env = { ...pohja, POLLO_KV: kv, POLLO_KEHITTAJAKOODI: 'salainen-testikoodi' };
  const v = await puhe(env, { otsakkeet: { 'x-pollo-kehittaja': 'salainen-testikoodi' } });
  assert.equal(v.status, 200);
  assert.deepEqual(kv.kirjoitukset.filter((k) => k.startsWith('puhe:p:')), []);
});
