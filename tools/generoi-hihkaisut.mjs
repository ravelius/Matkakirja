/*
 * Aarrelöydön hihkaisut (omistajan tilaus 10.8.2026: "Kun aarre
 * löytyy, niin siinä pitäisi kuulua se lyhyt hihkaisu 'jee' tai
 * jotain vastaavaa").
 *
 * Nämä ovat nuoren herran tunnereaktioita, EIVÄT kertojan luentoja —
 * ääneen ei lueta ruututekstiä, joten ruututeksti=luenta-sääntö ei
 * koske näitä, eikä omistajan luentajäädytys (10.8.2026) estä
 * generointia.
 *
 * Resepti kuten tools/generoi-avaus.mjs: Viisas Kertoja, eleven_v3,
 * /v1/text-to-dialogue, mp3_44100_128. Lyhyet äännähdykset ovat
 * v3:lla epävakaita (alle 250 merkin luennat), joten jokainen otos
 * TARKISTETAAN: kesto 0,4–4 s, häntä hiljainen, huippu ei tyhjä.
 * Kelvoton otos generoidaan uudelleen (enintään 3 yritystä) —
 * työkalu kaatuu näkyvästi ennemmin kuin kirjoittaa epäkelvon.
 *
 * Käyttö: NODE_USE_ENV_PROXY=1 node tools/generoi-hihkaisut.mjs
 * Avain ympäristöstä (ELEVEN_API_KEY); ei talteen minnekään.
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { MPEGDecoder } from 'mpg123-decoder';

const require = createRequire(import.meta.url);
globalThis.MPEGMode = require('lamejs/src/js/MPEGMode.js');
globalThis.Lame = require('lamejs/src/js/Lame.js');
globalThis.BitStream = require('lamejs/src/js/BitStream.js');
const lamejs = require('lamejs');

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const LOPPUTAUKO = ' <break time="0.6s" />';

/*
 * Huudahdukset ääneen SAMOIN SANOIN kuin ruudulla (omistajan
 * tarkennus 10.8.2026 ilta: "Hihkaisu saisi olla sama luettuna ja
 * kirjoitettuna"). Lista vastaa ui.js:n HUUDAHDUKSET-taulua —
 * tiedostonimi on huudahdus-<avain>-<järjestys>.mp3, ja ui valitsee
 * saman indeksin tekstille ja äänelle. Tagit sävyttävät arvon mukaan:
 * pikkulöytö kuitataan, suurlöytö vie sanat.
 */
const TYOT = [
  { tiedosto: 'assets/audio/huudahdus-300-1.mp3', luenta: '[pleased] Hei — löytyi sittenkin! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-300-2.mp3', luenta: '[pleased] Pieni, mutta aito! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-300-3.mp3', luenta: '[cheerful] Kelpaa tämäkin! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-300-4.mp3', luenta: '[cheerful] Taskuun ja eteenpäin! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-600-1.mp3', luenta: '[excited] Mahtavaa! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-600-2.mp3', luenta: '[excited] Sepä vasta löytö! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-600-3.mp3', luenta: '[chuckles] Isoisä olisi hykerrellyt! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-600-4.mp3', luenta: '[pleased] Tämä merkitään päiväkirjaan! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-1000-1.mp3', luenta: '[amazed] Uskomatonta! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-1000-2.mp3', luenta: '[excited] Jes! Katsokaa nyt tätä! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-1000-3.mp3', luenta: '[out of breath] Sydän hakkaa — mikä löytö! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-1000-4.mp3', luenta: '[amazed] Juuri tällaisesta isoisä kirjoitti! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-star-1.mp3', luenta: '[awe] Se on totta... [whispers] se on oikeasti totta! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-star-2.mp3', luenta: '[awe] Aarni oli oikeassa — se on olemassa! [long pause]' },
  { tiedosto: 'assets/audio/huudahdus-star-3.mp3', luenta: '[quietly] Isoisä... [pause] minä löysin sen. [long pause]' },
];

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä.');
  process.exit(1);
}

async function mittaa(tavut) {
  const d = new MPEGDecoder();
  await d.ready;
  const t = d.decode(new Uint8Array(tavut));
  d.free();
  const k = t.channelData[0];
  const sr = t.sampleRate;
  const rms = (a, b) => {
    const p = k.subarray(Math.max(0, a), Math.min(k.length, b));
    let s = 0;
    for (const n of p) s += n * n;
    return Math.sqrt(s / Math.max(1, p.length));
  };
  let huippu = 0;
  for (const n of k) huippu = Math.max(huippu, Math.abs(n));
  return {
    kesto: k.length / sr,
    sr,
    hanta: rms(k.length - Math.round(sr * 0.2), k.length),
    koko: rms(0, k.length),
    huippu,
  };
}

function hiljaisuus(sr, sekunnit = 0.3) {
  const enkooderi = new lamejs.Mp3Encoder(1, sr, 128);
  const pala = new Int16Array(1152);
  const osat = [];
  for (let i = 0; i < Math.ceil((sr * sekunnit) / 1152); i++) {
    const t = enkooderi.encodeBuffer(pala);
    if (t.length) osat.push(Buffer.from(t));
  }
  const loppu = enkooderi.flush();
  if (loppu.length) osat.push(Buffer.from(loppu));
  return Buffer.concat(osat);
}


/** Leikkaa mp3:n puheen rajoille ja enkoodaa uudelleen (mono, 128 k).
 * Palauttaa { mp3, kesto, otosKesto, huippu } tai null. */
async function leikkaaPuhe(tavut) {
  const d = new MPEGDecoder();
  await d.ready;
  const t = d.decode(new Uint8Array(tavut));
  d.free();
  const k = t.channelData[0];
  const sr = t.sampleRate;
  const ikkuna = Math.round(sr * 0.05);
  const kynnys = 0.02;
  let alku = -1;
  let loppu = -1;
  for (let i = 0; i + ikkuna <= k.length; i += ikkuna) {
    let summa = 0;
    for (let j = i; j < i + ikkuna; j++) summa += k[j] * k[j];
    const rms = Math.sqrt(summa / ikkuna);
    if (rms > kynnys) {
      if (alku < 0) alku = i;
      loppu = i + ikkuna;
    }
  }
  if (alku < 0) return null;
  const a = Math.max(0, alku - Math.round(sr * 0.15));
  const b = Math.min(k.length, loppu + Math.round(sr * 0.25));
  const pala = k.subarray(a, b);
  let huippu = 0;
  const naytteet = new Int16Array(pala.length + Math.round(sr * 0.3));
  for (let i = 0; i < pala.length; i++) {
    huippu = Math.max(huippu, Math.abs(pala[i]));
    naytteet[i] = Math.max(-32768, Math.min(32767, Math.round(pala[i] * 32767)));
  }
  const enkooderi = new lamejs.Mp3Encoder(1, sr, 128);
  const osat = [];
  for (let i = 0; i < naytteet.length; i += 1152) {
    const osa = enkooderi.encodeBuffer(naytteet.subarray(i, i + 1152));
    if (osa.length) osat.push(Buffer.from(osa));
  }
  const hanta = enkooderi.flush();
  if (hanta.length) osat.push(Buffer.from(hanta));
  return {
    mp3: Buffer.concat(osat),
    kesto: pala.length / sr,
    otosKesto: k.length / sr,
    huippu,
  };
}

// Valinnainen suodatin: node tools/generoi-hihkaisut.mjs hammastys
const vain = process.argv.slice(2);
const tyot = TYOT.filter((t) => !vain.length || vain.some((v) => t.tiedosto.includes(v)));

for (const tyo of tyot) {
  let valmis = null;
  for (let yritys = 1; yritys <= 3 && !valmis; yritys++) {
    console.log(`${tyo.tiedosto}: yritys ${yritys} ("${tyo.luenta}")`);
    const vastaus = await fetch(
      'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128',
      {
        method: 'POST',
        headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: [{ text: tyo.luenta + LOPPUTAUKO, voice_id: AANI }],
          model_id: 'eleven_v3',
          settings: { stability: 0.5 },
        }),
      },
    );
    if (!vastaus.ok) {
      console.error(`  HTTP ${vastaus.status} — ${await vastaus.text()}`);
      continue;
    }
    const tavut = Buffer.from(await vastaus.arrayBuffer());
    /*
     * Otos LEIKATAAN puheen rajoille: [long pause] venyttää otoksia
     * arvaamattomasti (mitattu 6–10 s), mutta puhe itse on lyhyt.
     * Rajat etsitään 50 ms:n RMS-ikkunoin, marginaali 0,15 s alkuun
     * ja 0,25 s loppuun, ja tulos enkoodataan lamejsilla uudelleen.
     */
    const leikattu = await leikkaaPuhe(tavut);
    if (!leikattu) { console.log('  hylätty: puhetta ei löytynyt'); continue; }
    console.log(`  puhe ${leikattu.kesto.toFixed(2)} s (otos ${leikattu.otosKesto.toFixed(2)} s), huippu ${leikattu.huippu.toFixed(2)}`);
    if (leikattu.kesto < 0.4 || leikattu.kesto > 6) { console.log('  hylätty: kesto'); continue; }
    if (leikattu.huippu < 0.05) { console.log('  hylätty: liian hiljainen'); continue; }
    valmis = leikattu.mp3;
  }
  if (!valmis) {
    console.error(`${tyo.tiedosto}: EI KELVOLLISTA OTOSTA kolmella yrityksellä.`);
    process.exit(1);
  }
  writeFileSync(resolve(JUURI, tyo.tiedosto), valmis);
  console.log(`  kirjoitettu (${(valmis.length / 1024).toFixed(0)} kt)`);
}
console.log('Valmis. Kuuntele kolmikko ennen julkaisua (tai pyydä omistajaa).');
