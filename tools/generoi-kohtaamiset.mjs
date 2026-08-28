/*
 * Kohtaamisluentojen generointi ElevenLabsilla (js/packs/kohtaamiset.js:
 * tervehdysLuenta ja loytoLuenta). Toisin kuin saapumisluennoissa,
 * puhujia on useita: text-to-dialogue saa inputs-listassa osan per
 * rooli, kukin omalla äänellään, ja palauttaa yhden yhtenäisen mp3:n.
 *
 * Roolien äänet (valittu tilin suomenkielisistä äänistä 7.8.2026):
 *   kertoja — "Viisas Kertoja", sama kuin saapumisluennoissa
 *   pelaaja — "Jaakko", nuori vakava ääni: nuori Fogg
 *   hahmo   — kaupungin paikallinen, taulukko alla kaupungeittain
 *
 * Käyttö:  ELEVEN_API_KEY=... node tools/generoi-kohtaamiset.mjs lontoo
 * Kirjoittaa assets/audio/puhe-kohtaaminen-<id>-tervehdys.mp3 ja
 * -loyto.mp3. Avain kierrätetään ajojen jälkeen — sitä ei tallenneta
 * minnekään, ei edes lokiin.
 *
 * HUOM konttiympäristössä: Noden fetch ei käytä ympäristön proxyä
 * ilman lippua — aja NODE_USE_ENV_PROXY=1, tai "Host not in
 * allowlist" -virhe tulee omasta putkesta vaikka verkko on auki.
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KOHTAAMISET } from '../js/packs/kohtaamiset.js';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = 'eleven_v3';
const STABILITY = 0.5; // sama kuin saapumisluennoissa (0.4 hyppi liikaa — omistaja 7.8.2026)

const KERTOJA = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const PELAAJA = 'JMfkzZiSsox62UXcXUqM'; // Jaakko — nuori Fogg
// Hahmoääni per kaupunki. Uusi kaupunki tarvitsee rivin tänne —
// valitse tilin äänistä hahmon ikään ja luonteeseen sopiva.
const HAHMOT = {
  lontoo: 'Gp43kq9FsSlavD7esRtx', // Vaino — vanha, rauhallinen: jokietsijä Ned
};

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
  process.exit(1);
}

const kaupungit = process.argv.slice(2);
if (!kaupungit.length) {
  console.error('Anna kaupungit: node tools/generoi-kohtaamiset.mjs lontoo …');
  process.exit(1);
}

function aani(id, rooli) {
  if (rooli === 'kertoja') return KERTOJA;
  if (rooli === 'pelaaja') return PELAAJA;
  return HAHMOT[id] ?? null;
}

for (const id of kaupungit) {
  const kohtaaminen = KOHTAAMISET[id];
  if (!kohtaaminen) {
    console.error(`${id}: kohtaamista ei ole — ohitetaan.`);
    continue;
  }
  for (const [nimi, osat] of [
    ['tervehdys', kohtaaminen.tervehdysLuenta],
    ['loyto', kohtaaminen.loytoLuenta],
  ]) {
    if (!osat?.length) {
      console.error(`${id}: ${nimi}Luenta puuttuu — ohitetaan.`);
      continue;
    }
    const inputs = osat.map((osa, i) => {
      const voice = aani(id, osa.rooli);
      if (!voice) {
        console.error(`${id}: roolille "${osa.rooli}" ei ole ääntä (HAHMOT-taulukko).`);
        process.exit(1);
      }
      /* Viimeisen osan perään lopputauko, jotta tiedosto ei leikkaudu
       * heti puheen päälle (naksahdus — omistajan havainto 8.8.2026). */
      const teksti = i === osat.length - 1
        ? `${osa.teksti} <break time="1.0s" />`
        : osa.teksti;
      return { text: teksti, voice_id: voice };
    });
    console.log(`${id}/${nimi}: generoidaan (${inputs.length} puhujaosaa)…`);
    const vastaus = await fetch(
      'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128',
      {
        method: 'POST',
        headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, model_id: MALLI, settings: { stability: STABILITY } }),
        signal: AbortSignal.timeout(180000),
      },
    );
    if (!vastaus.ok) {
      // Virherunko näkyviin (ilman avainta) — muodon muutokset selviävät siitä.
      console.error(`${id}/${nimi}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
      process.exit(1);
    }
    const polku = resolve(JUURI, `assets/audio/puhe-kohtaaminen-${id}-${nimi}.mp3`);
    const data = Buffer.from(await vastaus.arrayBuffer());
    writeFileSync(polku, data);
    console.log(`${id}/${nimi}: ${(data.length / 1024).toFixed(0)} kt → ${polku}`);
  }
}
console.log('Valmis. Muista: tiedostot repoon ja avain kiertoon.');
