/*
 * Pulun xAI-puhetagit (omistaja 27.9.2026: huokaus, nauru, innostus).
 *
 * Kaksi puolta, kaksi lupausta:
 *   - WORKER (tools/pollo/rajat.js suodataPuhetagit): xAI saa vain
 *     sallitut tagit ehjinä, OpenAI ei yhtään, ja säilöavain lasketaan
 *     suodatetusta tekstistä.
 *   - PELI (js/puhetagit.js poistaPuhetagit): pelaaja ei näe tagia
 *     koskaan, ei myöskään striimin palarajalle katkenneena puolikkaana.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { poimiEhdotukset, poimiJatkot, suodataPuhetagit } from '../tools/pollo/rajat.js';
import { poistaPuhetagit } from '../js/puhetagit.js';
import { striiminNayttoteksti, jasennaKasitteet } from '../js/pollo.js';

/* --- (a) workerin suodatin ----------------------------------------- */

test('suodataPuhetagit: sallitut pistetagit ja ehjä <fast>-pari säilyvät', () => {
  const teksti = 'Pulu. [sigh] No. [pause] Sitten [long-pause] vielä [laugh] ja <fast>tän minä tiedän</fast>.';
  assert.equal(suodataPuhetagit(teksti), teksti);
});

test('suodataPuhetagit: muut tagin näköiset poistuvat ilman tuplavälejä', () => {
  assert.equal(suodataPuhetagit('Kato. [whisper] Tää on salaisuus.'), 'Kato. Tää on salaisuus.');
  assert.equal(suodataPuhetagit('<slow>Hitaasti</slow> puhuttu.'), 'Hitaasti puhuttu.');
  assert.equal(suodataPuhetagit('[cry] Voi ei.'), 'Voi ei.');
  assert.equal(suodataPuhetagit('Loppu [emphasis].'), 'Loppu.');
  assert.equal(suodataPuhetagit('Rivi yksi [x-y]\nRivi kaksi'), 'Rivi yksi\nRivi kaksi');
  // Liian lyhyt tai pitkä, isot kirjaimet ja numerot eivät ole tageja.
  assert.equal(suodataPuhetagit('Kohta [a] ja [1] ja [Sparta].'), 'Kohta [a] ja [1] ja [Sparta].');
  // Käsitelinkki ei ole tagi, vaikka sisus olisi pientä ascii-tekstiä.
  assert.equal(suodataPuhetagit('Katso [[kanava]] tästä.'), 'Katso [[kanava]] tästä.');
});

test('suodataPuhetagit: tagiton teksti pysyy merkilleen samana (säilötyt äänet osuvat)', () => {
  const teksti = 'Kaksi  väliä  ja\trivi.\n\nToinen kappale , outo väli.';
  assert.equal(suodataPuhetagit(teksti), teksti);
  assert.equal(suodataPuhetagit(teksti, { sallitut: false }), teksti);
});

test('suodataPuhetagit: pariton kääre poistuu, ehjä pari jää', () => {
  // Virkeraja katkaisi kääreen: avaus yhteen palaan, sulku toiseen.
  assert.equal(suodataPuhetagit('<fast>Jes. Nyt mennään.'), 'Jes. Nyt mennään.');
  assert.equal(suodataPuhetagit('Tosi hyvä.</fast> Sitten asiaan.'), 'Tosi hyvä. Sitten asiaan.');
  // Kaksi avausta ennen sulkua: jälkimmäinen pariutuu, edeltäjä pois.
  assert.equal(suodataPuhetagit('<fast>Yksi <fast>kaksi</fast> kolme.'), 'Yksi <fast>kaksi</fast> kolme.');
  // Sulku ennen avausta: kumpikin pariton.
  assert.equal(suodataPuhetagit('Ai </fast>no <fast>niin.'), 'Ai no niin.');
});

test('suodataPuhetagit: OpenAI-polulle kaikki tagit pois', () => {
  assert.equal(
    suodataPuhetagit('Pulu. [sigh] No. <fast>Tän minä tiedän</fast> [laugh].', { sallitut: false }),
    'Pulu. No. Tän minä tiedän.',
  );
});

test('jatko- ja ehdotusrivit ovat aina tagittomia (napit, ei puhetta)', () => {
  const { vastaus, jatkot } = poimiJatkot('No niin. [sigh] Asia.\nJATKOT:\n[laugh] Miksi Rooma?\n<fast>Entä Ateena?</fast>');
  assert.equal(vastaus, 'No niin. [sigh] Asia.', 'vastaus säilyy tagillisena luentaa varten');
  assert.deepEqual(jatkot, ['Miksi Rooma?', 'Entä Ateena?']);
  assert.deepEqual(poimiEhdotukset('- [sigh] Mikä on Pariisi?'), ['Mikä on Pariisi?']);
});

/* --- (a) + (b) workerin puhe-tehtävä ------------------------------- */

function puhePyynto(worker, env, runko) {
  return worker.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app' },
    body: JSON.stringify({ tehtava: 'puhe', persoona: 'pollo', ...runko }),
  }), env, { waitUntil: () => {} });
}

async function kuunteleYlavirtaa(tee) {
  const alkuperainen = globalThis.fetch;
  const kutsut = [];
  let xaiKaatuu = false;
  globalThis.fetch = async (osoite, init) => {
    const runko = JSON.parse(init.body);
    const xai = String(osoite).includes('api.x.ai');
    kutsut.push({ moottori: xai ? 'xai' : 'openai', teksti: xai ? runko.text : runko.input });
    if (xai && xaiKaatuu) return new Response('ei', { status: 500 });
    return new Response(new Uint8Array([0xff, 0xf3, 0x44]), { status: 200, headers: { 'content-type': 'audio/mpeg' } });
  };
  try {
    await tee({ kutsut, kaada: () => { xaiKaatuu = true; } });
  } finally {
    globalThis.fetch = alkuperainen;
  }
}

test('worker: xAI saa sallitut tagit, OpenAI (oma moottori ja varapolku) ei yhtään', async () => {
  const { default: worker } = await import('../tools/pollo/worker.js');
  const teksti = 'Pulu. [sigh] No. [whisper] <fast>Tän minä tiedän.';
  await kuunteleYlavirtaa(async ({ kutsut, kaada }) => {
    const xaiEnv = { POLLO_ORIGINIT: 'https://matkakirja.app', XAI_API_KEY: 'x', OPENAI_API_KEY: 'o' };
    assert.equal((await puhePyynto(worker, xaiEnv, { teksti })).status, 200);
    assert.deepEqual(kutsut.at(-1), { moottori: 'xai', teksti: 'Pulu. [sigh] No. Tän minä tiedän.' });

    kaada();
    assert.equal((await puhePyynto(worker, xaiEnv, { teksti })).status, 200);
    assert.deepEqual(kutsut.at(-1), { moottori: 'openai', teksti: 'Pulu. No. Tän minä tiedän.' },
      'varapolku ei saa lähettää OpenAI:lle xAI:n tageja');

    const openaiEnv = { POLLO_ORIGINIT: 'https://matkakirja.app', OPENAI_API_KEY: 'o' };
    assert.equal((await puhePyynto(worker, openaiEnv, { teksti })).status, 200);
    assert.deepEqual(kutsut.at(-1), { moottori: 'openai', teksti: 'Pulu. No. Tän minä tiedän.' });
  });
});

test('worker: säilöavain lasketaan suodatetusta tekstistä', async () => {
  const { default: worker } = await import('../tools/pollo/worker.js');
  const alkuperaiset = globalThis.caches;
  const avaimet = [];
  globalThis.caches = {
    default: {
      match: async (pyynto) => { avaimet.push(pyynto.url); return undefined; },
      put: async () => {},
    },
  };
  try {
    await kuunteleYlavirtaa(async () => {
      const env = { POLLO_ORIGINIT: 'https://matkakirja.app', XAI_API_KEY: 'x' };
      const lohko = 'merkinnat';
      await puhePyynto(worker, env, { teksti: 'Hei. [sigh] Moi.', lohko });
      await puhePyynto(worker, env, { teksti: 'Hei. [sigh] [kielletty] Moi.', lohko });
      await puhePyynto(worker, env, { teksti: 'Hei. [sigh] Moi.</fast>', lohko });
      await puhePyynto(worker, env, { teksti: 'Hei. Moi.', lohko });
    });
  } finally {
    if (alkuperaiset === undefined) delete globalThis.caches;
    else globalThis.caches = alkuperaiset;
  }
  assert.equal(avaimet.length, 4);
  assert.equal(avaimet[1], avaimet[0], 'kielletty tagi ei muuta avainta');
  assert.equal(avaimet[2], avaimet[0], 'pariton sulku ei muuta avainta');
  assert.notEqual(avaimet[3], avaimet[0], 'sallittu tagi on osa puhetta ja avainta');
});

/* --- (c) näyttöteksti ---------------------------------------------- */

test('poistaPuhetagit: näyttöön ei jää yhtään tagia', () => {
  assert.equal(poistaPuhetagit('Pulu. [sigh] No. Sanotaan niin.'), 'Pulu. No. Sanotaan niin.');
  assert.equal(poistaPuhetagit('<fast>Tän minä tiedän</fast> — Rooma on vanha.'), 'Tän minä tiedän — Rooma on vanha.');
  assert.equal(poistaPuhetagit('Hauska juttu [laugh].'), 'Hauska juttu.');
  assert.equal(poistaPuhetagit('Kaksi  väliä ilman tagia.'), 'Kaksi  väliä ilman tagia.');
  // Käsitelinkit jäävät jäsennettäviksi.
  const palat = jasennaKasitteet(poistaPuhetagit('[sigh] Katso [[Kalliomoskeija]] ja [[kanava]].'));
  assert.deepEqual(palat.filter((p) => p.kasite).map((p) => p.teksti), ['Kalliomoskeija', 'kanava']);
  assert.equal(palat.map((p) => p.teksti).join(''), 'Katso Kalliomoskeija ja kanava.');
});

test('striimi: puolikas tagi ei vilahda ruudulla missään palarajassa', () => {
  // Käsitelinkin puolikas ("[[Rooma]") on oma, vanha asiansa
  // (poistaKasiteMerkinnat); tässä vahditaan puhetageja.
  const vastaus = 'Pulu. [sigh] No. <fast>Tän minä tiedän</fast> — Rooma on vanha. Hauskaa [laugh].';
  const lopullinen = 'Pulu. No. Tän minä tiedän — Rooma on vanha. Hauskaa.';
  // Jokainen mahdollinen kahden palan katkos ja merkki kerrallaan.
  for (let i = 1; i < vastaus.length; i += 1) {
    const naytto = striiminNayttoteksti(vastaus.slice(0, i));
    assert.doesNotMatch(naytto, /[[\]<>]/, `palaraja ${i}: "${naytto}"`);
    assert.ok(lopullinen.startsWith(naytto.replace(/\s+$/, '')),
      `palaraja ${i}: näyttö "${naytto}" ei ole lopullisen tekstin alku`);
  }
  assert.equal(striiminNayttoteksti(vastaus), lopullinen);
  // Esimerkkitapaus: "[si" + "gh]".
  assert.equal(striiminNayttoteksti('Pulu. [si'), 'Pulu. ');
  assert.equal(striiminNayttoteksti('Pulu. [si' + 'gh] No.'), 'Pulu. No.');
  // Striimin loputtua mitään ei pidätetä: vastaus näkyy kokonaan.
  assert.equal(poistaPuhetagit('Arvo < 5'), 'Arvo < 5');
});

test('peli: näyttöpolut siivoavat tagit, luenta saa tagillisen', () => {
  const pollo = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
  assert.match(pollo, /avaaKupla\(\)\.textContent = striiminNayttoteksti\(kertynyt\)/);
  assert.match(pollo, /onPala\?\.\(striiminNayttoteksti\(kertynyt\)\)/);
  assert.match(pollo, /const raaka = poistaPuhetagit\(tagillinen\)/);
  assert.match(pollo, /this\.lueVastaus\(raaka \? poistaKasiteMerkinnat\(tagillinen\) : puhdas\)/);
  assert.match(pollo, /const sanat = poistaPuhetagit\(/, 'laitteen loki siivotaan');
  const lukija = readFileSync(new URL('../js/lukija.js', import.meta.url), 'utf8');
  assert.match(lukija, /const puhuttava = poistaPuhetagit\(tagillinen\)/, 'laitteen ääni ei lausu tageja');
});

/* --- (d) kehote ---------------------------------------------------- */

test('kehote: äänitagisääntö on mukana selaimelle, ei natiiville', () => {
  const koodi = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  const alku = koodi.indexOf('const PUHETAGIKEHOTE = `');
  assert.ok(alku >= 0, 'workerista ei löytynyt PUHETAGIKEHOTE-osiota');
  const kehote = koodi.slice(alku, koodi.indexOf('`;', alku));
  for (const tagi of ['[sigh]', '[laugh]', '<fast>…</fast>']) assert.ok(kehote.includes(tagi), tagi);
  assert.match(kehote, /ENINTÄÄN YHDEN/);
  assert.match(kehote, /OMAN ÄÄNESI/);
  assert.match(kehote, /KOSKAAN ydinvastaukseen/);
  assert.match(kehote, /JATKOT-riveille/);
  assert.match(kehote, /PAIKKA-riville/);
});

test('kehote: chat-pyynnön järjestelmäkehotteessa sääntö selaimelle, ei natiiville', async () => {
  const { default: worker } = await import('../tools/pollo/worker.js');
  const env = { ANTHROPIC_API_KEY: 'testiavain', POLLO_ORIGINIT: 'https://matkakirja.app' };
  const alkuperainen = globalThis.fetch;
  const kehotteet = [];
  globalThis.fetch = async (osoite, init) => {
    kehotteet.push(JSON.parse(init.body).system);
    return new Response(JSON.stringify({ content: [{ type: 'text', text: 'Pariisi on Ranskan pääkaupunki.' }] }),
      { status: 200, headers: { 'content-type': 'application/json' } });
  };
  const kysy = (otsakkeet) => worker.fetch(new Request('https://pollo.example/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...otsakkeet },
    body: JSON.stringify({ kysymys: 'Mikä on Pariisi?' }),
  }), env, {});
  try {
    assert.equal((await kysy({ origin: 'https://matkakirja.app' })).status, 200);
    assert.equal((await kysy({
      'x-matkakirja-natiivi': 'app.matkakirja.proto3d', 'user-agent': 'Matkakirja/1 (app.matkakirja.proto3d)',
    })).status, 200);
  } finally {
    globalThis.fetch = alkuperainen;
  }
  const teksti = (k) => (Array.isArray(k) ? k.map((o) => o.text).join('\n') : String(k));
  const [selain, natiivi] = kehotteet.map(teksti);
  assert.match(selain, /ÄÄNITAGIT — VAIN OMAAN ÄÄNEEN/);
  assert.match(selain, /VASTAUKSEN LAJI[^]*$/, 'kehyslaji pysyy viimeisenä');
  assert.ok(selain.indexOf('ÄÄNITAGIT') < selain.lastIndexOf('VASTAUKSEN LAJI'));
  assert.doesNotMatch(natiivi, /ÄÄNITAGIT/, 'natiivi ei vielä siivoa tageja näytöltä');
});
