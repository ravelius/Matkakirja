/*
 * Pulun reaaliaikainen äänikeskustelu — KOE (omistaja 28.9.2026).
 *
 * Vartioi kolmea asiaa, joiden pettäminen maksaisi tai vuotaisi:
 *   1. Workerin token-reitti ei koskaan palauta eikä lokita xAI-avainta,
 *      vaatii kehittäjäkoodin ja pitää minuuttikaton (429).
 *   2. Äänikeskustelu saa SAMAN Pulun pohjakehotteen kuin Sonnet-chat,
 *      mutta ilman tekstimuodon merkintöjä, jotka puhemalli sanoisi ääneen.
 *   3. Pelin koenappi näkyy vain kehittäjätilassa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import worker, { pulunKehote, realtimeIstunto } from '../tools/pollo/worker.js';
import { nollaaLaskurit } from '../tools/pollo/worker.js';
import {
  REALTIME_PAIVARAJA_MIN_OLETUS, realtimePaivaAvain, tarkistaRealtimeRaja,
} from '../tools/pollo/rajat.js';
import { REALTIME_NAPPI_TEKSTIT, puluRealtimeKoeNakyvissa } from '../js/pollo.js';
import {
  PuluRealtime, base64Pcm, pcm16, pcmFloat, realtimeProtokollat, syoteTaajuus,
} from '../js/pulu-realtime.js';

const PELI = 'https://matkakirja.app';
const AVAIN = 'xai-TESTI-SALAINEN-AVAIN-9f3c';
const KOODI = 'kehittaja-koodi-42';

function teeKv() {
  const data = new Map();
  return {
    data,
    async get(k) { return data.get(k) ?? null; },
    async put(k, v) { data.set(k, v); },
  };
}

function pyynto(runko, { koodi = KOODI, otsakkeet = {} } = {}) {
  return new Request('https://pollo.example/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: PELI,
      ...(koodi ? { 'x-pollo-kehittaja': koodi } : {}),
      ...otsakkeet,
    },
    body: JSON.stringify({ tehtava: 'realtime', ...runko }),
  });
}

async function ylavirralla(vastaa, tee) {
  const alkuperainen = globalThis.fetch;
  const kutsut = [];
  const lokit = [];
  const alkuLoki = console.log;
  console.log = (...a) => { lokit.push(a.join(' ')); };
  globalThis.fetch = async (osoite, init) => {
    kutsut.push({ osoite: String(osoite), init });
    return vastaa(osoite, init);
  };
  try {
    await tee({ kutsut, lokit });
  } finally {
    globalThis.fetch = alkuperainen;
    console.log = alkuLoki;
  }
}

const tokenOk = () => new Response(JSON.stringify({ value: 'xai-realtime-client-secret-abc', expires_at: 1790000000 }), { status: 200 });

function env(lisat = {}) {
  return {
    POLLO_ORIGINIT: PELI, XAI_API_KEY: AVAIN, POLLO_KEHITTAJAKOODI: KOODI, POLLO_KV: teeKv(), ...lisat,
  };
}

/* --- worker ---------------------------------------------------------- */

test('realtime: token-reitti palauttaa tokenin ja istunnon, ei koskaan avainta', async () => {
  nollaaLaskurit();
  await ylavirralla(tokenOk, async ({ kutsut, lokit }) => {
    const e = env();
    const v = await worker.fetch(pyynto({ konteksti: 'Kaupunki, jossa pelaaja on: Rooma', aani: 'eve', taajuus: 48000 }), e, {});
    assert.equal(v.status, 200);
    const teksti = await v.text();
    assert.ok(!teksti.includes(AVAIN), 'avain vuoti vastaukseen');
    const data = JSON.parse(teksti);
    assert.equal(data.token, 'xai-realtime-client-secret-abc');
    assert.match(data.osoite, /^wss:\/\/api\.x\.ai\/v1\/realtime\?model=grok-voice/);
    assert.equal(data.istunto.voice, 'eve');
    assert.equal(data.istunto.turn_detection.type, 'server_vad');
    assert.equal(data.istunto.audio.input.format.rate, 48000);
    assert.equal(data.istunto.audio.output.format.rate, 24000);
    assert.ok(data.istunto.instructions.includes('Kaupunki, jossa pelaaja on: Rooma'));
    assert.equal(data.enintaanS, 180);
    // Avain kulkee vain xAI:lle otsakkeessa, ei minnekään muualle.
    assert.equal(kutsut.length, 1);
    assert.equal(kutsut[0].osoite, 'https://api.x.ai/v1/realtime/client_secrets');
    assert.equal(kutsut[0].init.headers.authorization, `Bearer ${AVAIN}`);
    assert.ok(!kutsut[0].init.body.includes(AVAIN));
    assert.ok(!lokit.some((r) => r.includes(AVAIN)), 'avain lokissa');
    assert.equal(e.POLLO_KV.data.get(realtimePaivaAvain()), '3', 'istunto varasi 3 min');
  });
});

test('realtime: ilman kehittäjäkoodia 403 eikä xAI:ta kutsuta', async () => {
  nollaaLaskurit();
  await ylavirralla(tokenOk, async ({ kutsut }) => {
    for (const koodi of [null, 'vaara-koodi']) {
      const v = await worker.fetch(pyynto({}, { koodi }), env(), {});
      assert.equal(v.status, 403);
      assert.equal((await v.json()).virhe, 'koodi');
    }
    // Worker ilman asetettua koodia: otsake ei avaa mitään.
    const v = await worker.fetch(pyynto({}), env({ POLLO_KEHITTAJAKOODI: '' }), {});
    assert.equal(v.status, 403);
    assert.equal(kutsut.length, 0);
  });
});

test('realtime: natiivi ei pääse reitille, puuttuva xAI-avain = 503', async () => {
  nollaaLaskurit();
  await ylavirralla(tokenOk, async ({ kutsut }) => {
    const natiivi = new Request('https://pollo.example/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', 'x-pollo-kehittaja': KOODI,
        'x-matkakirja-natiivi': 'fi.matkakirja.peli', 'user-agent': 'fi.matkakirja.peli/1.0',
      },
      body: JSON.stringify({ tehtava: 'realtime' }),
    });
    assert.equal((await worker.fetch(natiivi, env(), {})).status, 403);
    assert.equal((await worker.fetch(pyynto({}), env({ XAI_API_KEY: '' }), {})).status, 503);
    assert.equal(kutsut.length, 0);
  });
});

test('realtime: minuuttikatto koko pelille → 429, kehittäjäkoodikaan ei ohita', async () => {
  nollaaLaskurit();
  await ylavirralla(tokenOk, async ({ kutsut }) => {
    const e = env({ REALTIME_PAIVARAJA_MIN: '6' });
    assert.equal((await worker.fetch(pyynto({}), e, {})).status, 200);
    assert.equal((await worker.fetch(pyynto({}), e, {})).status, 200);
    const kolmas = await worker.fetch(pyynto({}), e, {});
    assert.equal(kolmas.status, 429);
    const data = await kolmas.json();
    assert.equal(data.virhe, 'paivaraja');
    assert.match(data.viesti, /6 min/);
    assert.equal(kutsut.length, 2, 'katon yli ei pyydetä tokenia');
  });
});

test('realtime: epäonnistunut token ei kuluta kattoa eikä vuoda runkoa', async () => {
  nollaaLaskurit();
  const vuoto = `virhe avaimella ${AVAIN}`;
  await ylavirralla(() => new Response(vuoto, { status: 500 }), async ({ lokit }) => {
    const e = env();
    const v = await worker.fetch(pyynto({}), e, {});
    assert.equal(v.status, 502);
    assert.ok(!(await v.text()).includes(AVAIN));
    assert.ok(!lokit.some((r) => r.includes(AVAIN) || r.includes('virhe avaimella')));
    assert.equal(e.POLLO_KV.data.get(realtimePaivaAvain()), undefined);
  });
});

test('tarkistaRealtimeRaja: oletus 30 min, varaus lasketaan mukaan, 0 = ei rajaa', () => {
  assert.equal(REALTIME_PAIVARAJA_MIN_OLETUS, 30);
  assert.ok(tarkistaRealtimeRaja({ kaytetty: 27, varaus: 3 }).ok);
  assert.equal(tarkistaRealtimeRaja({ kaytetty: 28, varaus: 3 }).ok, false);
  assert.ok(tarkistaRealtimeRaja({ kaytetty: 999, varaus: 3, paivaraja: 0 }).ok);
});

/* --- sama kehote ------------------------------------------------------ */

test('pulunKehote: ääni ja teksti jakavat saman pohjan, ääni ilman tekstimerkintöjä', () => {
  const teksti = pulunKehote();
  const aani = pulunKehote({ muoto: 'aani', konteksti: 'Kaupunki, jossa pelaaja on: Oslo' });
  const pohja = teksti.slice(0, teksti.indexOf('\n\nAVAINKÄSITTEET'));
  assert.ok(pohja.length > 10000, 'pohjakehote löytyy');
  assert.ok(aani.startsWith(pohja), 'äänikeskustelu ei saa samaa pohjaa');
  for (const tekstiOsa of ['\nAVAINKÄSITTEET\n', '\nPAIKKA KARTALLA\n', '\nÄÄNITAGIT']) {
    assert.ok(teksti.includes(tekstiOsa), `chatista puuttuu ${tekstiOsa}`);
    assert.ok(!aani.includes(tekstiOsa), `äänikehotteessa on ${tekstiOsa}`);
  }
  assert.ok(aani.includes('ÄÄNIKESKUSTELU'));
  assert.ok(aani.endsWith('Kaupunki, jossa pelaaja on: Oslo'));
  assert.equal(realtimeIstunto({ aani: 'ei-oikea' }).voice, 'ara', 'tuntematon ääni → pelin oletus');
});

/* --- web ------------------------------------------------------------- */

test('koenappi näkyy vain kehittäjätilassa ja kytketyllä palvelimella', () => {
  assert.equal(puluRealtimeKoeNakyvissa({ kehittajaTila: false, palvelin: 'https://p.example' }), false);
  assert.equal(puluRealtimeKoeNakyvissa({ kehittajaTila: true, palvelin: '' }), false);
  assert.equal(puluRealtimeKoeNakyvissa({ kehittajaTila: true, palvelin: 'https://p.example' }), true);
  // Oletus luetaan laitteen kehittäjätilasta (localStorage matkakirja-kehittaja).
  const alkuperainen = globalThis.localStorage;
  const varasto = new Map();
  globalThis.localStorage = { getItem: (k) => varasto.get(k) ?? null, setItem: (k, v) => varasto.set(k, v), removeItem: (k) => varasto.delete(k) };
  try {
    assert.equal(puluRealtimeKoeNakyvissa({ palvelin: 'https://p.example' }), false);
    varasto.set('matkakirja-kehittaja', '1');
    assert.equal(puluRealtimeKoeNakyvissa({ palvelin: 'https://p.example' }), true);
  } finally {
    globalThis.localStorage = alkuperainen;
  }
  assert.equal(REALTIME_NAPPI_TEKSTIT.valmis, 'Puhu Pululle (koe)');
});

test('PCM: taajuusvalinta, näytteistys ja base64-edestakaisin', () => {
  assert.equal(syoteTaajuus(48000), 48000);
  assert.equal(syoteTaajuus(44100), 44100);
  assert.equal(syoteTaajuus(96000), 24000);
  assert.deepEqual(realtimeProtokollat('abc'), ['xai-client-secret.abc']);
  const siniaalto = Float32Array.from({ length: 480 }, (_, i) => Math.sin(i / 10) * 0.5);
  const suora = pcm16(siniaalto, 24000);
  assert.equal(suora.length, 480);
  assert.equal(pcm16(siniaalto, 96000, 24000).length, 120);
  const takaisin = pcmFloat(base64Pcm(suora));
  assert.equal(takaisin.length, 480);
  for (let i = 0; i < 480; i += 37) assert.ok(Math.abs(takaisin[i] - siniaalto[i]) < 1e-3);
  assert.equal(pcm16(Float32Array.of(2, -2))[0], 0x7fff, 'leikkaus ylös');
  assert.equal(pcm16(Float32Array.of(2, -2))[1], -0x8000, 'leikkaus alas');
});

test('PuluRealtime.kasittele: tekstitys, vuorojärjestys ja keskeytys', () => {
  const kirja = [];
  const r = new PuluRealtime({
    onKayttajaAlku: () => kirja.push('alku'),
    onKayttaja: (t) => kirja.push(`pelaaja:${t}`),
    onPulu: (p) => kirja.push(`pulu:${p}`),
    onPuluValmis: () => kirja.push('valmis'),
    onVirhe: (v) => kirja.push(`virhe:${v}`),
    onTila: (t) => kirja.push(`tila:${t}`),
  });
  let pysaytetty = 0;
  r.lahteet.add({ stop: () => { pysaytetty += 1; } });
  r.kasittele({ type: 'input_audio_buffer.speech_started' });
  assert.equal(pysaytetty, 1, 'pelaajan puhe keskeyttää Pulun');
  assert.equal(r.lahteet.size, 0);
  r.kasittele({ type: 'input_audio_buffer.committed' });
  r.kasittele({ type: 'response.output_audio_transcript.delta', delta: 'Olet ' });
  r.kasittele({ type: 'conversation.item.input_audio_transcription.completed', transcript: ' Missä ollaan? ' });
  r.kasittele({ type: 'response.output_audio_transcript.delta', delta: 'Roomassa.' });
  r.kasittele({ type: 'response.done' });
  r.kasittele({ type: 'error', error: { message: 'x' } });
  assert.deepEqual(kirja, [
    'tila:kuuntelee', 'alku', 'pulu:Olet ', 'pelaaja:Missä ollaan?', 'pulu:Roomassa.', 'valmis', 'virhe:Pulun äänilinja: x',
  ]);
});
