/*
 * Lukijaäänen oletusten näyttökopio pysyy workerin taulun tasalla.
 *
 * Totuus on tools/pollo/worker.js PUHE_PERSOONAT; js/puhe-oletukset.js
 * on saman taulun näyttökopio pelin säätödialogia varten (omistajan
 * tilaus 15.8.2026: oletusprompti näkyviin). Kaksi käsin ylläpidettyä
 * kopiota ajautuvat erilleen ensimmäisessä muutoksessa, ellei kone
 * valvo — siksi tämä testi vertaa niitä merkilleen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PUHE_OLETUKSET } from '../js/puhe-oletukset.js';
import { STRIIMIAANET_XAI, STRIIMIAANI_OLETUS } from '../js/puhe.js';
import { valitsePuhemoottori } from '../tools/pollo/worker.js';

function workerinPersoonat() {
  const koodi = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  const alku = koodi.indexOf('const PUHE_PERSOONAT = {');
  assert.ok(alku >= 0, 'workerista ei löytynyt PUHE_PERSOONAT-taulua');
  const loppu = koodi.indexOf('\n};', alku);
  assert.ok(loppu > alku, 'PUHE_PERSOONAT-taulun loppua ei löytynyt');
  const lohko = koodi.slice(alku + 'const PUHE_PERSOONAT ='.length, loppu + 2);
  // Lohko on pelkkä olioliteraali merkkijonoliitoksineen — ei koodia.
  // eslint-disable-next-line no-new-func
  return new Function(`return (${lohko});`)();
}

test('js/puhe-oletukset.js vastaa workerin persoonataulua merkilleen', () => {
  const worker = workerinPersoonat();
  assert.deepEqual(Object.keys(PUHE_OLETUKSET).sort(), Object.keys(worker).sort(),
    'persoonalistat eroavat — päivitä js/puhe-oletukset.js');
  for (const [nimi, oletus] of Object.entries(worker)) {
    assert.equal(PUHE_OLETUKSET[nimi].aani, oletus.aani,
      `${nimi}: ääni eroaa workerista — päivitä js/puhe-oletukset.js`);
    assert.equal(PUHE_OLETUKSET[nimi].ohje, oletus.ohje,
      `${nimi}: ohje eroaa workerista — päivitä js/puhe-oletukset.js`);
  }
});

/*
 * xAI-striimiäänet (omistaja 27.9.2026): workerin XAI_AANET-taulu ja
 * kehittäjävalikon näyttökopio js/puhe.js STRIIMIAANET_XAI pysyvät
 * samoina, ja oletusääni ara on molemmissa.
 */
test('js/puhe.js STRIIMIAANET_XAI vastaa workerin XAI_AANET-taulua', () => {
  const koodi = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  const osuma = koodi.match(/const XAI_AANET = (\[[^\]]*\]);/);
  assert.ok(osuma, 'workerista ei löytynyt XAI_AANET-taulua');
  // eslint-disable-next-line no-new-func
  const worker = new Function(`return (${osuma[1]});`)();
  assert.deepEqual(STRIIMIAANET_XAI, worker, 'äänilistat eroavat — päivitä js/puhe.js');
  assert.ok(worker.includes(STRIIMIAANI_OLETUS), 'oletusääni puuttuu listalta');
  assert.match(koodi, /const XAI_AANI_OLETUS = 'ara';/, 'workerin oletusääni ei ole ara');
});

test('valitsePuhemoottori: xAI kun avain on, OpenAI varalla, null ilman avaimia', () => {
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'xai' }), 'xai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o' }), 'xai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'openai' }), 'openai');
  assert.equal(valitsePuhemoottori({ OPENAI_API_KEY: 'o', PUHE_MOOTTORI: 'xai' }), 'openai');
  assert.equal(valitsePuhemoottori({ XAI_API_KEY: 'x', PUHE_MOOTTORI: 'openai' }), 'xai');
  assert.equal(valitsePuhemoottori({}), null);
});

test('Pulun striimiääni ElevenLabs v4 Turbolla: tagit, moottori ja reitti (omistaja 28.9.2026)', async () => {
  const worker = await import('../tools/pollo/worker.js');
  const { elevenTagit, puluElevenKaytossa, puluElevenMalli, PULU_ELEVEN_AANI, PULU_ELEVEN_MALLI_OLETUS } = worker;
  assert.equal(elevenTagit('Tuota. [pause] Hei [long-pause] no [sigh] ja [laugh] <fast>nopeasti tämä</fast> loppu.'),
    'Tuota. <break time="0.4s" /> Hei <break time="0.9s" /> no [sighs] ja [laughs] [quickly] nopeasti tämä loppu.');
  assert.equal(puluElevenKaytossa({ ELEVEN_API_KEY: 'k' }, 'pollo'), true);
  assert.equal(puluElevenKaytossa({ ELEVEN_API_KEY: 'k' }, 'kertoja'), false, 'vain Pulu');
  assert.equal(puluElevenKaytossa({}, 'pollo'), false, 'ilman avainta xAI kuten ennen');
  assert.equal(puluElevenKaytossa({ ELEVEN_API_KEY: 'k', PULU_PUHE_MOOTTORI: 'xai' }, 'pollo'), false);
  assert.equal(puluElevenMalli({}), PULU_ELEVEN_MALLI_OLETUS);
  assert.equal(PULU_ELEVEN_MALLI_OLETUS, 'eleven_v4_turbo');
  assert.equal(puluElevenMalli({ PULU_PUHE_MALLI: 'eleven_v4' }), 'eleven_v4');
  assert.equal(puluElevenMalli({ PULU_PUHE_MALLI: 'jotain' }), PULU_ELEVEN_MALLI_OLETUS);

  const kutsut = [];
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async (osoite, asetukset) => {
    kutsut.push({ osoite: String(osoite), runko: JSON.parse(asetukset.body) });
    return new Response(new Uint8Array([0xff, 0xf3, 0x44, 0xc4]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  };
  const env = { ELEVEN_API_KEY: 'e', XAI_API_KEY: 'x', POLLO_ORIGINIT: 'https://matkakirja.app' };
  const pyynto = (persoona) => worker.default.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '203.0.113.8' },
    body: JSON.stringify({ tehtava: 'puhe', persoona, teksti: 'Kas. [pause] Pulu puhuu.' }),
  }), env, {});
  try {
    const pulu = await pyynto('pollo');
    assert.equal(pulu.status, 200);
    assert.equal(pulu.headers.get('x-puhe-moottori'), 'eleven');
    const kertoja = await pyynto('kertoja');
    assert.equal(kertoja.status, 200);
    assert.equal(kertoja.headers.get('x-puhe-moottori'), 'eleven', 'kertoja ElevenLabsilla (omistaja 5.10.2026)');
  } finally {
    globalThis.fetch = alkuperainen;
  }
  assert.match(kutsut[0].osoite, new RegExp(`api\\.elevenlabs\\.io/v1/text-to-speech/${PULU_ELEVEN_AANI}/stream`));
  assert.equal(kutsut[0].runko.model_id, 'eleven_v4_turbo');
  assert.equal(kutsut[0].runko.text, 'Kas. <break time="0.4s" /> Pulu puhuu.');
  assert.equal(kutsut[0].runko.voice_settings.stability, 0.5, 'Pulun vakaus ennallaan');
  assert.match(kutsut[1].osoite, new RegExp(`api\\.elevenlabs\\.io/v1/text-to-speech/${worker.KERTOJA_ELEVEN_AANI}/stream`), 'kertoja Williamilla');
});

test('Lukijat ElevenLabsilla, oletus William: moottorivalinta, äänilista ja päiväkatto (omistaja 5.10.2026)', async () => {
  const worker = await import('../tools/pollo/worker.js');
  const { LUKIJA_ELEVEN_AANET, LUKIJA_ELEVEN_OLETUS, LUKIJA_ELEVEN_MALLI, KERTOJA_ELEVEN_AANI, KERTOJA_ELEVEN_MALLI, lukijaElevenPyydetty } = worker;
  const { ELEVEN_LUKIJA_PAIVARAJA_OLETUS } = await import('../tools/pollo/rajat.js');
  assert.equal(KERTOJA_ELEVEN_AANI, 'oae6GCCzwoEbfc5FHdEu');
  assert.equal(KERTOJA_ELEVEN_MALLI, 'eleven_v4');
  assert.equal(LUKIJA_ELEVEN_MALLI, 'eleven_v4_turbo');
  assert.equal(ELEVEN_LUKIJA_PAIVARAJA_OLETUS, 50000);
  assert.ok(Object.keys(LUKIJA_ELEVEN_AANET).length >= 15 && Object.keys(LUKIJA_ELEVEN_AANET).length <= 26);
  assert.equal(LUKIJA_ELEVEN_OLETUS, KERTOJA_ELEVEN_AANI, 'oletus on William');
  assert.equal(Object.keys(LUKIJA_ELEVEN_AANET)[0], LUKIJA_ELEVEN_OLETUS, 'William listan ensimmäisenä');
  assert.equal(LUKIJA_ELEVEN_AANET[KERTOJA_ELEVEN_AANI], 'William, rauhallinen kertoja');
  assert.equal(worker.LUKIJA_ELEVEN_MALLIT[KERTOJA_ELEVEN_AANI], 'eleven_v4', 'William v4:llä');
  assert.equal(worker.LUKIJA_ELEVEN_MALLIT.Sz0tRTEpybtDJ9ru2kgD, 'eleven_v3', 'Viisas kertoja (isoisä) jää v3:lle');
  assert.ok(Object.hasOwn(LUKIJA_ELEVEN_AANET, 'Sz0tRTEpybtDJ9ru2kgD'), 'Viisas kertoja jää listalle');
  const avain = { ELEVEN_API_KEY: 'k' };
  assert.equal(lukijaElevenPyydetty(avain, 'merkinnat', {}, false), true, 'oletus ElevenLabs ilman kehittäjäkoodia ja moottoria');
  assert.equal(lukijaElevenPyydetty(avain, 'kertoja', {}, false), true);
  assert.equal(lukijaElevenPyydetty(avain, 'merkinnat', { moottori: 'xai' }, false), true, 'ilman kehittäjäkoodia moottori-kenttä ei vaikuta');
  assert.equal(lukijaElevenPyydetty(avain, 'merkinnat', { moottori: 'eleven' }, true), true);
  assert.equal(lukijaElevenPyydetty(avain, 'merkinnat', { moottori: 'xai' }, true), false, 'kehittäjä + xai = vertailutesti');
  assert.equal(lukijaElevenPyydetty({}, 'merkinnat', {}, true), false, 'ilman avainta xAI-varapolku');
  assert.equal(lukijaElevenPyydetty(avain, 'pollo', { moottori: 'eleven' }, true), false, 'Pulu omalla reitillään');

  const kutsut = [];
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async (osoite, asetukset) => {
    kutsut.push({ osoite: String(osoite), runko: JSON.parse(asetukset.body) });
    return new Response(new Uint8Array([0xff, 0xf3, 0x44, 0xc4]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  };
  const kvData = new Map();
  const kv = { get: async (a) => kvData.get(a) ?? null, put: async (a, v) => { kvData.set(a, v); } };
  const env = { ELEVEN_API_KEY: 'e', XAI_API_KEY: 'x', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KV: kv, ELEVEN_LUKIJA_PAIVARAJA: '120', POLLO_KEHITTAJAKOODI: 'salainen' };
  const aani = Object.keys(LUKIJA_ELEVEN_AANET).find((a) => a !== LUKIJA_ELEVEN_OLETUS && a !== 'Sz0tRTEpybtDJ9ru2kgD');
  const pyynto = (runko, koodi = 'salainen', ymp = env) => worker.default.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '203.0.113.9',
      ...(koodi ? { 'x-pollo-kehittaja': koodi } : {}) },
    body: JSON.stringify({ tehtava: 'puhe', persoona: 'kertoja', ...runko }),
  }), ymp, {});
  try {
    const ilman = await pyynto({ teksti: 'Ilman koodia.' }, null);
    assert.equal(ilman.headers.get('x-puhe-moottori'), 'eleven', 'ilman kehittäjäkoodia ja moottori-kenttää ElevenLabs');
    const a = await pyynto({ teksti: 'Marathonin tasanko. [pause] Kumpu.', aani });
    assert.equal(a.headers.get('x-puhe-moottori'), 'eleven');
    const isoisa = await pyynto({ teksti: 'Isoisä.', aani: 'Sz0tRTEpybtDJ9ru2kgD' });
    assert.equal(isoisa.headers.get('x-puhe-moottori'), 'eleven', 'Viisas kertoja valittavissa');
    const xai = await pyynto({ teksti: 'Vertailu.', moottori: 'xai' });
    assert.equal(xai.headers.get('x-puhe-moottori'), 'xai', 'kehittäjä + moottori xai → xAI');
    const b = await pyynto({ teksti: 'Toinen pala, joka ylittää päiväkaton, koska se on tarpeeksi pitkä: ' + 'x'.repeat(60) }, null);
    assert.equal(b.headers.get('x-puhe-moottori'), 'xai', 'päiväkatto täynnä → xAI-varapolku');
    const ilmanAvainta = await pyynto({ teksti: 'Ei avainta.' }, null, { ...env, ELEVEN_API_KEY: undefined });
    assert.equal(ilmanAvainta.headers.get('x-puhe-moottori'), 'xai', 'ilman ELEVEN_API_KEY → xAI');
  } finally {
    globalThis.fetch = alkuperainen;
  }
  // William: /stream-osoite, eleven_v4, voice_settings ilman stability-kenttää, style 0
  assert.match(kutsut[0].osoite, /api\.elevenlabs\.io\/v1\/text-to-speech\/oae6GCCzwoEbfc5FHdEu\/stream/);
  assert.equal(kutsut[0].runko.model_id, 'eleven_v4');
  assert.equal(kutsut[0].runko.text, 'Ilman koodia.');
  assert.deepEqual(kutsut[0].runko.voice_settings, { style: 0 });
  assert.ok(!('stability' in kutsut[0].runko.voice_settings), 'vakaus mallin oletus');
  // muu ääni: kuten ennen (v4 Turbo, stability 0,5)
  assert.match(kutsut[1].osoite, new RegExp(`api\\.elevenlabs\\.io/v1/text-to-speech/${aani}/stream`));
  assert.equal(kutsut[1].runko.model_id, 'eleven_v4_turbo');
  assert.equal(kutsut[1].runko.text, 'Marathonin tasanko. <break time="0.4s" /> Kumpu.');
  assert.equal(kutsut[1].runko.voice_settings.stability, 0.5);
  assert.match(kutsut[2].osoite, /text-to-speech\/Sz0tRTEpybtDJ9ru2kgD\/stream/);
  assert.equal(kutsut[2].runko.model_id, 'eleven_v3', 'isoisän ääni v3:lla');
  assert.match(kutsut[3].osoite, /api\.x\.ai/, 'kehittäjä + xai');
  assert.match(kutsut[4].osoite, /api\.x\.ai/, 'päiväkatto');
  assert.match(kutsut[5].osoite, /api\.x\.ai/, 'ilman avainta');
  const laskuri = [...kvData.entries()].find(([k]) => k.startsWith('eleven:lukija:p:'));
  assert.ok(laskuri && Number(laskuri[1]) > 0, 'globaali eleven-laskuri kasvoi');
});

test('Pulun äänen päiväkatto 15 000 mrk: ylityksessä 429 eikä xAI:ta (Päätoimittaja 5.10.2026)', async () => {
  const worker = await import('../tools/pollo/worker.js');
  const { PULU_ELEVEN_PAIVARAJA_OLETUS, puluElevenPaivaAvain } = await import('../tools/pollo/rajat.js');
  assert.equal(PULU_ELEVEN_PAIVARAJA_OLETUS, 15000);
  const kutsut = [];
  const alkuperainen = globalThis.fetch;
  globalThis.fetch = async (osoite) => {
    kutsut.push(String(osoite));
    return new Response(new Uint8Array([0xff, 0xf3, 0x44, 0xc4]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  };
  const muisti = new Map([[puluElevenPaivaAvain(new Date()), '14990']]);
  const kv = { get: async (a) => muisti.get(a) ?? null, put: async (a, v) => { muisti.set(a, String(v)); } };
  const env = { ELEVEN_API_KEY: 'e', XAI_API_KEY: 'x', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KV: kv };
  const pyynto = (persoona) => worker.default.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '203.0.113.9' },
    body: JSON.stringify({ tehtava: 'puhe', persoona, teksti: 'Pulu puhuu taas pitkästi.' }),
  }), env, {});
  try {
    const pulu = await pyynto('pollo');
    assert.equal(pulu.status, 429);
    assert.equal((await pulu.json()).virhe, 'aanikatto');
    assert.equal(kutsut.length, 0, 'ei ElevenLabs- eikä xAI-kutsua katon ylittyessä');
    const kertoja = await pyynto('kertoja');
    assert.equal(kertoja.status, 200, 'lukijoilla oma katto, Pulun katto ei koske kertojaa');
  } finally {
    globalThis.fetch = alkuperainen;
  }
});
