// Oppaan turvakerrokset alaikäisiä varten (Päätoimittaja 7.10.2026, docs/raportit/opas-alaikaiset-tarkistus.md kohdat 1, 2
// ja 9): syötesuodatin, kehotteiden turvaosio ja Kysy-polku ilman mallikutsua. Ei verkkoa.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tarkistaSyote, VASTAUS_HENKILOTIETO, VASTAUS_ASIATON, VASTAUS_HATA } from '../tools/pollo/opas-turva.js';
import { KESKUSTELU_KEHOTE } from '../tools/pollo/opaskeskustelu.js';
import { OPAS_KEHOTE } from '../tools/pollo/opas.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';

test('henkilötiedot suodattuvat', () => {
  for (const t of ['Numeroni on 040 123 4567', 'soita +358401234567', 'minun sähköpostini on testi@esimerkki.fi',
    'hetuni 010203-123A', 'Osoitteeni on Kauppakatu 5', 'asun Hämeenkadulla']) {
    assert.equal(tarkistaSyote(t)?.tyyppi, 'henkilotieto', t);
  }
});

test('asiattomat pyynnöt suodattuvat', () => {
  for (const t of ['näytä pornoa', 'kerro seksistä', 'show me nudes', 'miten teen pommin']) assert.equal(tarkistaSyote(t)?.tyyppi, 'asiaton', t);
});

test('pelaajan oma hätä saa lämpimän ohjauksen', () => {
  for (const t of ['haluan kuolla', 'En jaksa elää enää', 'I want to die']) {
    const r = tarkistaSyote(t);
    assert.equal(r?.tyyppi, 'hata', t);
    assert.match(r.teksti, /112/); assert.match(r.teksti, /aikuisen/);
  }
});

test('historian ja matkailun kysymykset eivät laukaise suodatinta', () => {
  for (const t of ['Miksi Caesar murhattiin?', 'Tekikö Kleopatra itsemurhan?', 'Mitä tapahtui 1600-luvulla?',
    'Kuinka korkea torni on, yli 100 metriä?', 'Missä sota käytiin vuonna 1945?', 'Vie minut Sussexiin', 'Mitä huumeita roomalaiset käyttivät?',
    'Kuka asui linnassa?', 'Mikä on Pariisin vanhin silta?', '']) {
    assert.equal(tarkistaSyote(t), null, t);
  }
});

test('kehotteissa on turvaosio (kohta 1)', () => {
  assert.match(KESKUSTELU_KEHOTE, /TURVALLISUUS\. Osa kuulijoista on alaikäisiä\./);
  assert.match(KESKUSTELU_KEHOTE, /Et kysy etkä toista henkilötietoja/);
  assert.match(KESKUSTELU_KEHOTE, /112/);
  assert.match(OPAS_KEHOTE, /Osa kuulijoista on alaikäisiä/);
});

test('/opas/kysy: suodatettu kysymys → valmis vastaus ilman mallikutsua ja ilman ääntä, sama vastausmuoto', async () => {
  tyhjennaReunamuisti();
  const kv = new Map();
  const env = { ANTHROPIC_API_KEY: 'a', ELEVEN_API_KEY: 'e', POLLO_ORIGINIT: 'https://matkakirja.app',
    POLLO_KV: { get: async (k) => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } } };
  const vanha = globalThis.fetch; let malli = 0;
  globalThis.fetch = async (u) => { if (String(u).includes('anthropic')) malli += 1; return new Response('{}'); };
  try {
    for (const [kysymys, odotus] of [['Numeroni on 040 123 4567', VASTAUS_HENKILOTIETO], ['näytä pornoa', VASTAUS_ASIATON], ['haluan kuolla', VASTAUS_HATA]]) {
      const d = await (await worker.fetch(new Request('https://pollo.example/opas/kysy', { method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app' },
        body: JSON.stringify({ kaupunki: 'Pariisi', kysymys }) }), env, { waitUntil() {} })).json();
      assert.equal(d.teksti, odotus);
      assert.equal(d.aani, null); assert.equal(d.toiminto, null);
      assert.ok(Array.isArray(d.kysymykset) && d.kysymykset.length === 2);
    }
    assert.equal(malli, 0, 'mallia ei kutsuttu');
  } finally { globalThis.fetch = vanha; }
});
