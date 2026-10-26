#!/usr/bin/env node
/*
 * PULUN ÄÄNIKESKUSTELUN MITTAUS ILMAN IHMISTÄ (omistajan tilaus 28.9.2026).
 *
 * Ajaa saman istunnon kuin pelin koenappi (tools/pollo/worker.js
 * realtimeIstunto: sama Pulun kehote, ääni, server VAD) suoraan xAI:n
 * Grok Voice Agentia vasten ja syöttää sille suomenkieliset kysymykset
 * ÄÄNENÄ reaaliaikatahdissa. Todennus kulkee SAMAA reittiä kuin selaimella:
 * ensin lyhytikäinen token (POST /v1/realtime/client_secrets), sitten
 * WebSocket aliprotokollalla `xai-client-secret.<token>`.
 *
 * Mittaa: viive = syötetyn puheen viimeisestä näytteestä ensimmäiseen
 * vastausäänitavuun (ms), sekä VAD:n speech_stopped → 1. ääni.
 * Tallentaa: koko keskustelun mp3:na (kysymys + Pulun vastaus, välissä
 * mitattu viive hiljaisuutena) ja tekstitykset JSONina.
 *
 * Ajo (avain ympäristöstä, EI KOSKAAN tulosteeseen):
 *   zsh -c 'source ~/.matkakirja-avaimet-koodaus.zsh; \
 *     node tools/pollo/realtime-koe.mjs [--pohdinta none|high] [--kysymykset 3]'
 *
 * Kysymysäänet tehdään macOS:n `say -v Satu` -äänellä ja muunnetaan
 * ffmpegillä 24 kHz PCM16 mono -muotoon.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { XAI_REALTIME_OSOITE, realtimeIstunto } from './worker.js';

const HINTA_MIN_USD = 0.08; // docs.x.ai/developers/pricing, 28.9.2026
const TAAJUUS = 24000;
const PALA_MS = 40;
const HILJAISUUS_MS = 1500; // puheen perään: VAD tunnistaa lopun

const argit = process.argv.slice(2);
const arg = (nimi, oletus) => {
  const i = argit.indexOf(`--${nimi}`);
  return i >= 0 && argit[i + 1] ? argit[i + 1] : oletus;
};
const POHDINTA = arg('pohdinta', 'none');
const VAD_MS = arg('vad', null);
const ULOS = arg('ulos', '/Users/Shared/Claude/proto-3d/lokit/pulu-realtime');

const KYSYMYKSET = [
  'Missä kaupungissa me nyt ollaan, ja mitä täällä kannattaa nähdä?',
  'Kuka rakensi Colosseumin?',
  'Mikä on sinun lempipullasi täällä?',
].slice(0, Number(arg('kysymykset', '3')));

const KONTEKSTI = [
  'Lauta: Maailmankartta',
  'Kaupunki, jossa pelaaja on: Rooma',
  'Maa, jossa pelaaja on: Italia',
  'Matkapäivä: 14',
].join('\n');

const avain = process.env.XAI_API_KEY;
if (!avain) {
  console.error('XAI_API_KEY puuttuu ympäristöstä (source ~/.matkakirja-avaimet-koodaus.zsh).');
  process.exit(2);
}

/* --- kysymysäänet --------------------------------------------------- */

function puheeksi(teksti, i) {
  const aiff = join(tmpdir(), `pulu-rt-k${i}.aiff`);
  const raaka = join(tmpdir(), `pulu-rt-k${i}.pcm`);
  execFileSync('say', ['-v', 'Satu', '-o', aiff, teksti]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', aiff,
    '-ac', '1', '-ar', String(TAAJUUS), '-f', 's16le', raaka]);
  return readFileSync(raaka);
}

/** Tiedoston lopun hiljaisuus (ms): |näyte| < 1 % täydestä. */
function hannanHiljaisuusMs(pcm) {
  let i = pcm.length / 2 - 1;
  while (i > 0 && Math.abs(pcm.readInt16LE(i * 2)) < 330) i -= 1;
  return ((pcm.length / 2 - 1 - i) / TAAJUUS) * 1000;
}

/* --- token (kuten worker) -------------------------------------------- */

async function haeToken() {
  const vastaus = await fetch('https://api.x.ai/v1/realtime/client_secrets', {
    method: 'POST',
    headers: { authorization: `Bearer ${avain}`, 'content-type': 'application/json' },
    body: JSON.stringify({ expires_after: { seconds: 300 } }),
  });
  if (!vastaus.ok) throw new Error(`client_secrets ${vastaus.status}`);
  const data = await vastaus.json();
  if (!data?.value) throw new Error('client_secrets: ei valuea');
  return data;
}

/* --- istunto --------------------------------------------------------- */

const odota = (ms) => new Promise((r) => setTimeout(r, ms));

async function aja() {
  mkdirSync(ULOS, { recursive: true });
  const aanet = KYSYMYKSET.map(puheeksi);
  const { value: token, expires_at: vanhenee } = await haeToken();
  console.log(`token ok (vanhenee ${new Date(vanhenee * 1000).toISOString()}), pituus ${token.length}`);

  const ws = new WebSocket(XAI_REALTIME_OSOITE, [`xai-client-secret.${token}`]);
  ws.binaryType = 'arraybuffer';
  const tapahtumat = [];
  const kuuntelijat = new Set();
  let yhteysAuki = 0;
  let yhteysKiinni = 0;
  let nykyinen = null; // meneillään oleva kierros
  const kierrokset = [];

  ws.addEventListener('message', (e) => {
    const nyt = performance.now();
    const t = JSON.parse(typeof e.data === 'string' ? e.data : Buffer.from(e.data).toString());
    tapahtumat.push({ t: Math.round(nyt), type: t.type });
    const k = nykyinen;
    if (t.type === 'error') console.log('xai error:', JSON.stringify(t.error ?? t).slice(0, 300));
    if (k) {
      if (t.type === 'input_audio_buffer.speech_started') k.vadAlku ??= nyt;
      if (t.type === 'input_audio_buffer.speech_stopped') k.vadLoppu ??= nyt;
      if (t.type === 'conversation.item.input_audio_transcription.completed') k.kuultu = t.transcript ?? '';
      if (t.type === 'response.output_audio.delta' || t.type === 'response.audio.delta') {
        k.ekaAani ??= nyt;
        k.vastausAani.push(Buffer.from(t.delta, 'base64'));
      }
      if (t.type === 'response.output_audio_transcript.delta') k.vastausTeksti += t.delta ?? '';
      if (t.type === 'response.done') {
        k.valmis = nyt;
        k.kaytto = t.response?.usage ?? null;
      }
    }
    for (const f of kuuntelijat) f(t);
  });
  const odotaTapahtumaa = (tyyppi, ms = 30000) => new Promise((ok, ei) => {
    const aj = setTimeout(() => { kuuntelijat.delete(f); ei(new Error(`aikakatkaisu: ${tyyppi}`)); }, ms);
    const f = (t) => { if (t.type === tyyppi) { clearTimeout(aj); kuuntelijat.delete(f); ok(t); } };
    kuuntelijat.add(f);
  });

  await new Promise((ok, ei) => {
    ws.addEventListener('open', ok, { once: true });
    ws.addEventListener('error', () => ei(new Error('WebSocket ei auennut')), { once: true });
  });
  yhteysAuki = performance.now();
  ws.addEventListener('close', (e) => { yhteysKiinni = performance.now(); console.log(`suljettu ${e.code} ${e.reason ?? ''}`); });
  console.log('WebSocket auki (aliprotokollatoken)');

  const istunto = realtimeIstunto({
    konteksti: KONTEKSTI, pohdinta: POHDINTA, taajuus: TAAJUUS,
    ...(VAD_MS ? { hiljaisuusMs: Number(VAD_MS) } : {}),
  });
  const paivitetty = odotaTapahtumaa('session.updated', 10000);
  ws.send(JSON.stringify({ type: 'session.update', session: istunto }));
  await paivitetty;
  console.log(`session.updated (ääni ${istunto.voice}, pohdinta ${POHDINTA}, VAD ${istunto.turn_detection.silence_duration_ms} ms, kehote ${istunto.instructions.length} mrk)`);

  const palaTavut = (TAAJUUS * PALA_MS / 1000) * 2;
  const hiljaisuus = Buffer.alloc((TAAJUUS * PALA_MS / 1000) * 2);
  for (let i = 0; i < aanet.length; i += 1) {
    const aani = aanet[i];
    nykyinen = {
      kysymys: KYSYMYKSET[i], kysymysAani: aani, vastausAani: [], vastausTeksti: '', kuultu: '',
      puheLoppu: null, vadAlku: null, vadLoppu: null, ekaAani: null, valmis: null, kaytto: null,
    };
    const valmis = odotaTapahtumaa('response.done', 60000);
    // Puhe reaaliaikatahdissa: yksi 40 ms:n pala 40 ms:n välein.
    const alku = performance.now();
    let n = 0;
    for (let o = 0; o < aani.length; o += palaTavut) {
      ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: aani.subarray(o, o + palaTavut).toString('base64') }));
      n += 1;
      const viive = alku + n * PALA_MS - performance.now();
      if (viive > 0) await odota(viive);
    }
    /*
     * PUHEEN LOPPU = viimeisen äänekkään näytteen reaaliaikakohta, ei
     * tiedoston loppu: `say` jättää perään oman hiljaisuutensa, joka
     * muuten lyhentäisi mitattua viivettä.
     */
    nykyinen.hanta = hannanHiljaisuusMs(aani);
    nykyinen.puheLoppu = alku + (aani.length / 2 / TAAJUUS) * 1000 - nykyinen.hanta;
    // Hiljaisuutta perään, kunnes vastaus alkaa (VAD tarvitsee sitä).
    const hAlku = performance.now();
    let h = 0;
    while (!nykyinen.ekaAani && performance.now() - hAlku < 10000) {
      ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: hiljaisuus.toString('base64') }));
      h += 1;
      const viive = hAlku + h * PALA_MS - performance.now();
      if (viive > 0) await odota(viive);
    }
    await valmis;
    kierrokset.push(nykyinen);
    const k = nykyinen;
    nykyinen = null;
    const ms = (a, b) => (a && b ? Math.round(a - b) : null);
    console.log(`K${i + 1}: puheen loppu → 1. ääni ${ms(k.ekaAani, k.puheLoppu)} ms`
      + ` | VAD-loppu → 1. ääni ${ms(k.ekaAani, k.vadLoppu)} ms | vastaus ${(Buffer.concat(k.vastausAani).length / 2 / TAAJUUS).toFixed(1)} s`);
    console.log(`   kuultu: ${k.kuultu}`);
    console.log(`   Pulu:   ${k.vastausTeksti}`);
    // Vastauksen soittoaika odotetaan, kuten pelaaja kuuntelisi sen.
    await odota(300);
  }
  ws.close();
  await odota(300);
  const kestoS = ((yhteysKiinni || performance.now()) - yhteysAuki) / 1000;

  /* --- tallennus ------------------------------------------------------ */
  const leima = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const vad = istunto.turn_detection.silence_duration_ms;
  const nimi = `pulu-realtime-${POHDINTA}-vad${vad}-${leima}`;
  const osat = [];
  const tauko = (ms) => Buffer.alloc(Math.round(TAAJUUS * ms / 1000) * 2);
  for (const k of kierrokset) {
    // Kysymyksen oma häntähiljaisuus leikataan, ja väliin tulee mitattu viive.
    const puhe = k.kysymysAani.subarray(0, k.kysymysAani.length - Math.round(k.hanta * TAAJUUS / 1000) * 2);
    osat.push(puhe, tauko(Math.max(0, (k.ekaAani ?? k.puheLoppu) - k.puheLoppu)), Buffer.concat(k.vastausAani), tauko(700));
  }
  const raaka = join(tmpdir(), `${nimi}.pcm`);
  writeFileSync(raaka, Buffer.concat(osat));
  const mp3 = join(ULOS, `${nimi}.mp3`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(TAAJUUS), '-ac', '1',
    '-i', raaka, '-codec:a', 'libmp3lame', '-b:a', '64k', mp3]);

  const viiveet = kierrokset.map((k) => Math.round(k.ekaAani - k.puheLoppu)).filter(Number.isFinite);
  const jarj = [...viiveet].sort((a, b) => a - b);
  const mediaani = jarj.length ? (jarj.length % 2 ? jarj[(jarj.length - 1) / 2]
    : Math.round((jarj[jarj.length / 2 - 1] + jarj[jarj.length / 2]) / 2)) : null;
  const yhteenveto = {
    aika: new Date().toISOString(),
    malli: XAI_REALTIME_OSOITE.split('model=')[1],
    aani: istunto.voice,
    pohdinta: POHDINTA,
    vadHiljaisuusMs: vad,
    kehotteenPituus: istunto.instructions.length,
    viiveetMs: viiveet,
    mediaaniMs: mediaani,
    vadViiveetMs: kierrokset.map((k) => (k.vadLoppu && k.ekaAani ? Math.round(k.ekaAani - k.vadLoppu) : null)),
    yhteysS: Number(kestoS.toFixed(1)),
    hintaUsd: Number((kestoS / 60 * HINTA_MIN_USD).toFixed(4)),
    hintaMinUsd: HINTA_MIN_USD,
    kierrokset: kierrokset.map((k) => ({
      kysymys: k.kysymys, kuultu: k.kuultu, vastaus: k.vastausTeksti, kaytto: k.kaytto,
      vastausS: Number((Buffer.concat(k.vastausAani).length / 2 / TAAJUUS).toFixed(1)),
    })),
    tapahtumatyypit: [...new Set(tapahtumat.map((t) => t.type))],
    mp3,
  };
  writeFileSync(join(ULOS, `${nimi}.json`), `${JSON.stringify(yhteenveto, null, 2)}\n`);
  console.log(`\nviiveet ${viiveet.join(', ')} ms, mediaani ${mediaani} ms`);
  console.log(`yhteys ${kestoS.toFixed(1)} s → ${(kestoS / 60 * HINTA_MIN_USD).toFixed(4)} $ (${HINTA_MIN_USD} $/min)`);
  console.log(`mp3: ${mp3}`);
}

aja().catch((virhe) => {
  // Vain viesti: ei avainta, ei tokenia.
  console.error(`realtime-koe epäonnistui: ${virhe?.message ?? virhe}`);
  process.exit(1);
});
