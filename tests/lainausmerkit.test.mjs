/*
 * LAINAUSMERKIT PUHEAVAIMISSA (Päätoimittaja 18.10.2026): sama teksti suorilla ja kaarevilla
 * lainausmerkeillä = sama avain (js/puhe.js, tools/pollo/worker.js, js/liviapuhe.js), ja haku
 * kokeilee normalisoidun jälkeen vanhaa raakaa avainta, ettei jo generoituja ”-tekstejä generoida uudelleen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { normalisoiLainausmerkit } from '../js/lainausmerkit.js';
import { livianTiiviste, livianTiivisteRaaka, livianTiivisteTasmaa } from '../js/liviapuhe.js';
import { normalisoiLainausmerkit as workerinNormalisointi } from '../tools/pollo/worker.js';

const KAAREVA = '”Tämä on ’lainaus’ “sisällä” „toinen”.';
const SUORA = '"Tämä on \'lainaus\' "sisällä" "toinen".';

test('normalisoiLainausmerkit: kaarevat suoriksi, muu teksti ennallaan', () => {
  assert.equal(normalisoiLainausmerkit(KAAREVA), SUORA);
  assert.equal(normalisoiLainausmerkit(SUORA), SUORA);
  assert.equal(normalisoiLainausmerkit('Ei lainausmerkkejä – «kulma» säilyy.'), 'Ei lainausmerkkejä – «kulma» säilyy.');
  assert.equal(normalisoiLainausmerkit(null), '');
});

test('worker ja selain normalisoivat samoin', () => {
  for (const t of [KAAREVA, SUORA, 'Pulu sanoi: ’hei’.', '„Ok“']) assert.equal(workerinNormalisointi(t), normalisoiLainausmerkit(t));
});

test('livianTiiviste: suorat ja kaarevat = sama tiiviste; vanha raaka kelpaa yhä', () => {
  assert.equal(livianTiiviste(KAAREVA), livianTiiviste(SUORA));
  assert.notEqual(livianTiivisteRaaka(KAAREVA), livianTiivisteRaaka(SUORA));
  // Ennen 18.10. generoitu rivi (raaka tiiviste kaarevista) on edelleen ajan tasalla, ei uudelleengenerointia.
  assert.ok(livianTiivisteTasmaa(livianTiivisteRaaka(KAAREVA), KAAREVA));
  assert.ok(livianTiivisteTasmaa(livianTiiviste(SUORA), KAAREVA));
  assert.ok(!livianTiivisteTasmaa(livianTiiviste('Toinen teksti.'), KAAREVA));
  assert.ok(!livianTiivisteTasmaa(undefined, KAAREVA));
  // Lainausmerkitön teksti: tiiviste ennallaan.
  assert.equal(livianTiiviste('Etsi lehdestä aarrekysymys.'), livianTiivisteRaaka('Etsi lehdestä aarrekysymys.'));
});

function puhePyynto(worker, env, runko) {
  return worker.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app' },
    body: JSON.stringify({ tehtava: 'puhe', persoona: 'pollo', ...runko }),
  }), env, { waitUntil: () => {} });
}

async function ilmanYlavirtaa(tee) {
  const alkuperainen = globalThis.fetch;
  let generoinnit = 0;
  globalThis.fetch = async () => {
    generoinnit += 1;
    return new Response(new Uint8Array([0xff, 0xf3, 0x44]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  };
  try {
    await tee();
  } finally {
    globalThis.fetch = alkuperainen;
  }
  return generoinnit;
}

test('worker: suorat ja kaarevat lainausmerkit = sama säilöavain; vanha raaka avain haetaan perään', async () => {
  const { default: worker } = await import('../tools/pollo/worker.js');
  const alkuperaiset = globalThis.caches;
  const avaimet = [];
  let vanha = null;
  globalThis.caches = {
    default: {
      match: async (pyynto) => {
        avaimet.push(pyynto.url);
        return vanha && pyynto.url === vanha ? new Response(new Uint8Array([1, 2, 3])) : undefined;
      },
      put: async () => {},
    },
  };
  const env = { POLLO_ORIGINIT: 'https://matkakirja.app', XAI_API_KEY: 'x' };
  const lohko = 'merkinnat';
  try {
    const generoinnit = await ilmanYlavirtaa(async () => {
      await puhePyynto(worker, env, { teksti: SUORA, lohko });
      await puhePyynto(worker, env, { teksti: KAAREVA, lohko });
    });
    assert.equal(generoinnit, 2, 'tyhjä säilö: kumpikin generoidaan');
    // SUORA: yksi haku (normalisoitu = raaka). KAAREVA: normalisoitu (= SUORAn avain), sitten raaka.
    assert.equal(avaimet.length, 3);
    assert.equal(avaimet[1], avaimet[0], 'kaareva ja suora: sama normalisoitu avain');
    assert.notEqual(avaimet[2], avaimet[0], 'raaka avain on eri');

    // Ennen 18.10. reunalle säilötty ”-pala (raaka avain) osuu eikä generoida uudelleen.
    vanha = avaimet[2];
    avaimet.length = 0;
    let vastaus;
    const uudet = await ilmanYlavirtaa(async () => { vastaus = await puhePyynto(worker, env, { teksti: KAAREVA, lohko }); });
    assert.equal(uudet, 0, 'vanha raaka avain osui');
    assert.equal(vastaus.headers.get('x-puhe-lahde'), 'reuna');
  } finally {
    if (alkuperaiset === undefined) delete globalThis.caches;
    else globalThis.caches = alkuperaiset;
  }
});
