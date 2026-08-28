/*
 * Kaaripaketin luennat (KAARI_PAKETIT, js/tyohuone-kehitys-data.js).
 * Kirjoittaa mp3:n per osa per kaupunki:
 * puhe-kaari-<osa>-<id>.mp3 (saapuminen, tervehdys, visa, aarre,
 * vihje). ÄLÄ aja ennen omistajan hyväksyntää — omistaja päättää,
 * mitkä osat luetaan. Sama resepti kuin generoi-luennat.mjs:ssä
 * (Viisas Kertoja, eleven_v3, /v1/text-to-dialogue, mp3_44100_128,
 * stability 0.5, lopputauko).
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 ELEVEN_API_KEY=... node tools/generoi-kaari.mjs [praha …]
 * Ilman kaupunkeja generoi kaikki. Avain kierrätetään ajon jälkeen,
 * sitä ei tallenneta minnekään.
 *
 * --mykistetyt generoi VAIN mykistetyt-kenttien osoittamat osat
 * (tekstierän jäljiltä vaienneet luennat) — kaupungin muut, ehjät
 * luennat eivät kulu eivätkä muutu. Tämä on generointierän
 * normaalitila: mykistetyt-kentät OVAT erälista. Kenttien tyhjennys
 * tehdään ajon jälkeen käsin, kun tiedostot on tarkistettu.
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const MALLI = 'eleven_v3';
const STABILITY = 0.5;
const LOPPUTAUKO = ' <break time="1.0s" />';

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
  process.exit(1);
}

/* Paketin v2 osat: saapuminen (isoisä), kohtaaminen (henkilö) ja
 * aarre (henkilö + nuoren Foggin mietintö). Kysymystä ei lueta —
 * se on pelaajan interaktiivinen visa. Jos luenta*-kenttää ei ole,
 * käytetään tekstikenttää sellaisenaan. */
const OSAT = [
  ['saapuminen', 'saapumisLuenta', 'saapuminen'],
  ['kohtaaminen', 'kohtaamisLuenta', 'kohtaaminen'],
  ['aarre', 'aarreLuenta', 'aarre'],
];

const vainMykistetyt = process.argv.includes('--mykistetyt');
const pyydetyt = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const kohteet = KAARI_PAKETIT.kohteet.filter((k) => (!pyydetyt.length || pyydetyt.includes(k.id))
  && (!vainMykistetyt || (k.mykistetyt ?? []).length));
if (!kohteet.length) {
  console.error('Ei kohteita. Tunnetut:', KAARI_PAKETIT.kohteet.map((k) => k.id).join(', '));
  process.exit(1);
}

async function generoi(teksti, polku, nimi) {
  console.log(`${nimi}: generoidaan (${teksti.length} merkkiä)…`);
  const vastaus = await fetch(
    'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128',
    {
      method: 'POST',
      headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: [{ text: teksti + LOPPUTAUKO, voice_id: AANI }],
        model_id: MALLI,
        settings: { stability: STABILITY },
      }),
      signal: AbortSignal.timeout(180000),
    },
  );
  if (!vastaus.ok) {
    console.error(`${nimi}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
    process.exit(1);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(polku, data);
  console.log(`${nimi}: ${(data.length / 1024).toFixed(0)} kt → ${polku}`);
}

let generoitu = 0;
for (const k of kohteet) {
  for (const [osa, luentaKentta, tekstiKentta] of OSAT) {
    if (vainMykistetyt && !(k.mykistetyt ?? []).includes(osa)) continue;
    const teksti = k[luentaKentta] ?? k[tekstiKentta];
    if (!teksti) { console.error(`${k.id}/${osa}: teksti puuttuu — ohitetaan.`); continue; }
    const polku = resolve(JUURI, `assets/audio/puhe-kaari-${osa}-${k.id}.mp3`);
    await generoi(teksti, polku, `${k.id}/${osa}`);
    generoitu += 1;
  }
}
console.log(`Valmis — ${generoitu} luentaa.`);
