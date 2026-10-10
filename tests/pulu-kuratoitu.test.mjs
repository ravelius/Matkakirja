/*
 * KURATOITU LIVE ALLE 18-VUOTIAILLE (Raamattu: LIVE-TEKOÄLY KAIKILLE, ALLE 18 KURATOITU, 10.10.2026; tools/pollo/kuratoitu.js).
 * Otsake x-matkakirja-aikuinen: 1 → live kuten ennen; 0 → oma kehoteosio, kysymyksen ja vastauksen suodatus, sama
 * vastausmuoto. Puuttuva otsake on vaiheessa 1 live (vanhat appit), vaiheessa 2 (PULU_PUUTTUVA_KURATOITU=1) kuratoitu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import polloWorker, { nollaaLaskurit, realtimeIstunto, pulunKehoteOsat } from '../tools/pollo/worker.js';
import {
  AIKUINEN_OTSAKE, KURATOITU_KEHOTE, VASTAUS_OHJAUS, pulunTila, seurantaAvain, tarkistaVastaus,
} from '../tools/pollo/kuratoitu.js';
import { VASTAUS_HATA, TURVA_JATKOT } from '../tools/pollo/opas-turva.js';

const ORIGIN = 'https://ravelius.github.io';
const ENV = { ANTHROPIC_API_KEY: 'testiavain', POLLO_ORIGINIT: ORIGIN };
const otsakkeet = (o) => new Headers(o);
const systemTeksti = (s) => (Array.isArray(s) ? s.map((b) => b.text).join('\n') : String(s ?? ''));

const palaksi = (teksti) => ({ type: 'content_block_delta', delta: { type: 'text_delta', text: teksti } });
const sse = (datat) => datat.map((d) => `event: x\ndata: ${JSON.stringify(d)}\n\n`).join('');
function lueSse(teksti) {
  return teksti.split('\n\n').filter(Boolean).map((lohko) => ({
    laji: /^event: (.+)$/m.exec(lohko)?.[1] ?? '',
    data: JSON.parse(/^data: (.+)$/m.exec(lohko)?.[1] ?? 'null'),
  }));
}

/** Yksi Pulun chat-pyyntö workerin läpi; malli tyngätty (`teksti` kertavastaukselle, `palat` striimille). */
async function ajaPulu({ ots = {}, runko = {}, env = ENV, teksti = 'Notre-Dame on goottilainen katedraali.\nJATKOT:\nMilloin se rakennettiin?\nKuka sen suunnitteli?', palat = null } = {}) {
  nollaaLaskurit();
  const alkuperainen = globalThis.fetch;
  const loki = console.log;
  const kutsut = [];
  const lokit = [];
  globalThis.fetch = async (_osoite, asetukset) => {
    const pyydetty = JSON.parse(asetukset.body);
    kutsut.push(pyydetty);
    if (pyydetty.stream) {
      const datat = [{ type: 'message_start', message: { usage: {} } }, ...(palat ?? [teksti]).map(palaksi),
        { type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: {} }];
      return new Response(sse(datat), { status: 200, headers: { 'content-type': 'text/event-stream' } });
    }
    return new Response(JSON.stringify({ content: [{ type: 'text', text: teksti }], stop_reason: 'end_turn' }),
      { status: 200, headers: { 'content-type': 'application/json' } });
  };
  console.log = (...osat) => { lokit.push(osat.join(' ')); };
  try {
    const vastaus = await polloWorker.fetch(new Request('https://pollo.testi/', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: ORIGIN, ...ots },
      body: JSON.stringify({ tehtava: 'vastaus', kysymys: 'Mikä tuo kirkko on?', ...runko }),
    }), env, {});
    const runkoTeksti = await vastaus.text();
    const virta = /event-stream/.test(vastaus.headers.get('content-type') ?? '');
    return { tila: vastaus.status, kutsut, lokit, data: virta ? null : JSON.parse(runkoTeksti), tapahtumat: virta ? lueSse(runkoTeksti) : [] };
  } finally {
    globalThis.fetch = alkuperainen;
    console.log = loki;
  }
}

test('tila: 1 = live, 0 tai muu arvo = kuratoitu; puuttuva vaiheen mukaan, kehittäjä ilman otsaketta live', () => {
  assert.equal(pulunTila(otsakkeet({ [AIKUINEN_OTSAKE]: '1' })), 'live');
  assert.equal(pulunTila(otsakkeet({ [AIKUINEN_OTSAKE]: '0' })), 'kuratoitu');
  assert.equal(pulunTila(otsakkeet({ [AIKUINEN_OTSAKE]: 'kyllä' })), 'kuratoitu');
  assert.equal(pulunTila(otsakkeet({})), 'live');
  assert.equal(pulunTila(otsakkeet({}), { puuttuvaKuratoitu: true }), 'kuratoitu');
  assert.equal(pulunTila(otsakkeet({}), { puuttuvaKuratoitu: true, kehittaja: true }), 'live');
  assert.equal(pulunTila(otsakkeet({ [AIKUINEN_OTSAKE]: '0' }), { kehittaja: true }), 'kuratoitu');
  assert.equal(seurantaAvain(new Date('2026-10-10T08:00:00Z'), 'vastaus', 'asiaton'), 'kuratoitu:2026-10-10:vastaus:asiaton');
});

test('kehote: kuratoitu osio omana lohkonaan pohjan perässä, pohja sama kuin aikuisella', () => {
  const live = pulunKehoteOsat({ natiivi: true });
  const kur = pulunKehoteOsat({ natiivi: true, kuratoitu: true });
  assert.equal(kur.lohkot[0], live.lohkot[0], 'pohjan välimuisti yhteinen');
  assert.equal(kur.lohkot[1], KURATOITU_KEHOTE);
  assert.ok(!live.lohkot.includes(KURATOITU_KEHOTE));
  assert.match(KURATOITU_KEHOTE, /MIELI ry:n Sekasin-chatista/);
  assert.match(realtimeIstunto({ kuratoitu: true }).instructions, /KURATOITU TILA/);
  assert.doesNotMatch(realtimeIstunto({}).instructions, /KURATOITU TILA/);
});

test('otsake 1 ja puuttuva otsake: live kuten ennen (ei kuratointiosiota)', async () => {
  for (const ots of [{ [AIKUINEN_OTSAKE]: '1' }, {}]) {
    const ajo = await ajaPulu({ ots });
    assert.equal(ajo.tila, 200);
    assert.doesNotMatch(systemTeksti(ajo.kutsut[0].system), /KURATOITU TILA/);
    assert.equal(ajo.data.vastaus, 'Notre-Dame on goottilainen katedraali.');
  }
});

test('otsake 0: kuratointiosio mukana, vastaus samassa muodossa', async () => {
  const ajo = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '0' } });
  assert.equal(ajo.tila, 200);
  assert.match(systemTeksti(ajo.kutsut[0].system), /KURATOITU TILA/);
  assert.deepEqual(Object.keys(ajo.data).sort(), ['jatkot', 'syy', 'vastaus']);
  assert.equal(ajo.data.vastaus, 'Notre-Dame on goottilainen katedraali.');
  assert.deepEqual(ajo.data.jatkot, ['Milloin se rakennettiin?', 'Kuka sen suunnitteli?']);
});

test('vaihe 2: PULU_PUUTTUVA_KURATOITU=1 kuratoi otsakkeettoman pyynnön', async () => {
  const ajo = await ajaPulu({ env: { ...ENV, PULU_PUUTTUVA_KURATOITU: '1' } });
  assert.match(systemTeksti(ajo.kutsut[0].system), /KURATOITU TILA/);
});

test('otsake 0: asiaton ja hätä kysymys → valmis vastaus ilman mallia (JSON ja striimi)', async () => {
  const asiaton = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '0' }, runko: { kysymys: 'näytä pornoa' } });
  assert.equal(asiaton.kutsut.length, 0, 'mallia ei kutsuta');
  assert.deepEqual(asiaton.data, { vastaus: VASTAUS_OHJAUS, jatkot: TURVA_JATKOT, syy: null });
  assert.ok(asiaton.lokit.some((r) => /suodatin \(asiaton\)/.test(r)));
  assert.ok(!asiaton.lokit.some((r) => /pornoa/.test(r)), 'pelaajan teksti ei lokiin');

  const hata = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '0' }, runko: { kysymys: 'en jaksa elää', striimi: true } });
  assert.equal(hata.kutsut.length, 0);
  assert.deepEqual(hata.tapahtumat.map((t) => t.laji), ['pala', 'loppu']);
  assert.equal(hata.tapahtumat[1].data.vastaus, VASTAUS_HATA);
  assert.equal(hata.tapahtumat[1].data.jatkot.length, 2);

  // Aikuisen kysymystä ei suodateta (live kuten ennen).
  const aikuinen = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '1' }, runko: { kysymys: 'näytä pornoa' } });
  assert.equal(aikuinen.kutsut.length, 1);
});

test('otsake 0: asiaton mallin vastaus korvataan ohjauksella (kertavastaus)', async () => {
  const teksti = 'Täällä myytiin pornoa.\nJATKOT:\nMitä muuta?\nKuka?';
  const ajo = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '0' }, teksti });
  assert.deepEqual(ajo.data, { vastaus: VASTAUS_OHJAUS, jatkot: TURVA_JATKOT, syy: null });
  const aikuinen = await ajaPulu({ ots: { [AIKUINEN_OTSAKE]: '1' }, teksti });
  assert.equal(aikuinen.data.vastaus, 'Täällä myytiin pornoa.');
});

test('otsake 0: striimi pysähtyy osumaan, osumapalaa ei lähetetä ja loppu korvaa kuplan', async () => {
  const ajo = await ajaPulu({
    ots: { [AIKUINEN_OTSAKE]: '0' }, runko: { striimi: true },
    palat: ['Kirkko on vanha.\n', 'Siellä on pornoa', ' ja muuta.\nJATKOT:\nMikä?\nKuka?'],
  });
  const palat = ajo.tapahtumat.filter((t) => t.laji === 'pala').map((t) => t.data.teksti).join('');
  assert.doesNotMatch(palat, /porno/);
  const loppu = ajo.tapahtumat.find((t) => t.laji === 'loppu').data;
  assert.deepEqual(loppu, { vastaus: VASTAUS_OHJAUS, jatkot: TURVA_JATKOT, syy: null });
  assert.ok(ajo.lokit.some((r) => /kuratoitu vastaus estetty \(asiaton\)/.test(r)));
});

test('vastaustarkistus ei osu historiaan, paikannimiin eikä hätänumeroon', () => {
  for (const ok of ['Sussexin herttua asui Essexissä.', 'Hätänumero on 112.', 'Bastilji vallattiin 1789 ja vankeja kuoli.',
    'Sota päättyi vuonna 1945.']) assert.equal(tarkistaVastaus(ok), null, ok);
  assert.equal(tarkistaVastaus('Kirjoita minulle osoitteeseen testi@esimerkki.fi'), 'henkilotieto');
});

test('esilento sallii ikäotsakkeen', async () => {
  const v = await polloWorker.fetch(new Request('https://pollo.testi/', { method: 'OPTIONS', headers: { origin: ORIGIN } }), ENV, {});
  assert.match(v.headers.get('access-control-allow-headers') ?? '', /x-matkakirja-aikuinen/);
});

/* ---------------------------------------------------------------- */
/* Web: ikäkysely (js/ikaraja.js, #ikaraja-dialog)                   */
/* ---------------------------------------------------------------- */
import { readFileSync } from 'node:fs';
import {
  IKARAJA_AVAIN, IKARAJA_TEKSTIT, ikaAikuinen, ikaKysytty, ikaOtsakeArvo, kysyIkaEnsin, nollaaIka, onAikuinen,
} from '../js/ikaraja.js';

function muistiVarasto() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
}

/** Pieni #ikaraja-dialog-malli: select, kaksi nappia, showModal/close + close-tapahtuma. */
function ikaDialogi() {
  const kuuntelijat = (el) => { el.k = {}; el.addEventListener = (t, f) => { (el.k[t] ??= []).push(f); }; el.removeEventListener = (t, f) => { el.k[t] = (el.k[t] ?? []).filter((x) => x !== f); }; el.laukaise = (t) => (el.k[t] ?? []).slice().forEach((f) => f()); return el; };
  const valinta = kuuntelijat({ value: '', vaihtoehdot: [], replaceChildren(...o) { this.vaihtoehdot = o; }, add(o) { this.vaihtoehdot.push(o); } });
  const jatka = kuuntelijat({ disabled: false });
  const eiNyt = kuuntelijat({});
  const dialogi = kuuntelijat({ open: false, showModal() { this.open = true; }, close() { this.open = false; this.laukaise('close'); } });
  dialogi.querySelector = (s) => ({ '#ikaraja-vuosi': valinta, '#ikaraja-jatka': jatka, '#ikaraja-ei-nyt': eiNyt })[s];
  return { doc: { getElementById: (id) => (id === 'ikaraja-dialog' ? dialogi : null) }, dialogi, valinta, jatka, eiNyt };
}

test('web: aikuinen vain varmasti, otsake 0 kunnes vastattu aikuiseksi', () => {
  globalThis.localStorage = muistiVarasto();
  globalThis.Option ??= class { constructor(t, v) { this.text = t; this.value = v; } };
  nollaaIka();
  assert.equal(onAikuinen(2007, 2026), true);
  assert.equal(onAikuinen(2008, 2026), false, '18 täyttyy vasta syntymäpäivänä');
  assert.equal(ikaAikuinen(), null);
  assert.equal(ikaOtsakeArvo(), '0');
  assert.equal(ikaKysytty(), false);
});

test('web: Jatka tallentaa vain aikuinen k/e, Ei nyt = kuratoitu tämän käynnistyksen', async () => {
  globalThis.localStorage = muistiVarasto();
  nollaaIka();
  let d = ikaDialogi();
  let lupaus = kysyIkaEnsin({ doc: d.doc, nyt: 2026 });
  assert.equal(d.dialogi.open, true);
  assert.equal(d.jatka.disabled, true);
  assert.equal(d.valinta.vaihtoehdot[0].text, IKARAJA_TEKSTIT.valitse);
  assert.equal(d.valinta.vaihtoehdot[1].value, '2026');
  d.valinta.value = '1990'; d.valinta.laukaise('change');
  assert.equal(d.jatka.disabled, false);
  d.jatka.laukaise('click');
  await lupaus;
  assert.equal(globalThis.localStorage.getItem(IKARAJA_AVAIN), '1', 'vain 1/0, ei vuotta');
  assert.equal(ikaOtsakeArvo(), '1');
  // Kysytty: ei uutta korttia.
  d = ikaDialogi();
  assert.equal(kysyIkaEnsin({ doc: d.doc, nyt: 2026 }), null, 'kysytty: ei odotusta');
  assert.equal(d.dialogi.open, false);

  nollaaIka();
  d = ikaDialogi();
  lupaus = kysyIkaEnsin({ doc: d.doc, nyt: 2026 });
  d.eiNyt.laukaise('click');
  await lupaus;
  assert.equal(globalThis.localStorage.getItem(IKARAJA_AVAIN), null);
  assert.equal(ikaKysytty(), true);
  assert.equal(ikaOtsakeArvo(), '0');
  nollaaIka();
});

test('web: kortti on olemassa oleva dialog-pohja natiivin teksteillä, pyynnöt kantavat otsakkeen ja merkinnän', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const kortti = html.slice(html.indexOf('<dialog id="ikaraja-dialog" class="dialog">'), html.indexOf('</dialog>', html.indexOf('id="ikaraja-dialog"')));
  assert.ok(kortti.length > 0);
  for (const k of ['otsikko', 'teksti', 'tallennus', 'syntymavuosi', 'eiNyt', 'jatka']) assert.ok(kortti.includes(IKARAJA_TEKSTIT[k]), k);
  assert.match(kortti, /class="dialog-card"[\s\S]*class="puhe-saadin-rivi"[\s\S]*class="dialog-actions"/);
  const pollo = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
  assert.match(pollo, /\[AIKUINEN_OTSAKE\]: ikaOtsakeArvo\(\)/);
  assert.match(pollo, /this\.lisaaViesti\('paikkarivi', IKARAJA_TEKSTIT\.merkinta\)/);
  assert.equal((pollo.match(/ikaKysytty\(\) \? null : kysyIkaEnsin\(\{ doc: this\.doc \}\)/g) ?? []).length, 2, 'kysy ja kysyUlkoisesti');
  for (const f of ['../sw.js', '../tools/build-standalone.mjs']) assert.match(readFileSync(new URL(f, import.meta.url), 'utf8'), /js\/ikaraja\.js/);
});
