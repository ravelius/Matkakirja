/*
 * Avaustekstin ja avauslennon luentojen generointi (10.8.2026).
 *
 * Tekstit hyväksyi omistaja 10.8.2026 ("Tee kaikki suosituksiesi
 * mukaan"). RUUDULLA näkyvien tekstien on vastattava näitä sanasta
 * sanaan: INTRO_RUUTU = js/ui.js INTRO_TEXT, LENTO_RUUTU =
 * js/packs/maailma.js flightFirst[0]. Luenta saa poiketa vain
 * kirjoitusasussa (tagit, tauot), ei sanoissa.
 *
 * Resepti kuten tools/generoi-luennat.mjs: Viisas Kertoja, eleven_v3,
 * /v1/text-to-dialogue, mp3_44100_128, stability 0.5.
 *
 * NAKSAHDUKSEN TORJUNTA (omistajan palaute 10.8.2026: "ElevenLabs
 * katkaisee äänen kuin giljotiini heti sanan loputtua ja se monesti
 * naksahtaa" — eikä loppua voi feidata, koska puhe kuulostaa oudolta):
 * 1. luennan loppuun [long pause] + break-tagi, jotta malli tuottaa
 *    hiljaisuutta puheen perään;
 * 2. hännän hiljaisuus MITATAAN dekoodaamalla (mpg123-decoder) —
 *    jos viimeisten 300 ms:n RMS ei ole hiljainen, työkalu kaatuu
 *    näkyvästi eikä kirjoita tiedostoa;
 * 3. perään liitetään vielä ~0,7 s aitoa hiljaisuutta (lamejs,
 *    samat kehysparametrit) — katkaisu ei koskaan osu ääneen.
 *
 * Käyttö: NODE_USE_ENV_PROXY=1 ELEVEN_API_KEY=... node tools/generoi-avaus.mjs
 * Avain kierrätetään ajon jälkeen — ei talteen minnekään.
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { MPEGDecoder } from 'mpg123-decoder';

// lamejs-paketissa on tunnettu "MPEGMode is not defined" -bugi
// Node-käytössä: sisäiset moduulit viittaavat paljaisiin globaaleihin.
// Kierto: määritellään globaalit ennen päämoduulin latausta.
const require = createRequire(import.meta.url);
globalThis.MPEGMode = require('lamejs/src/js/MPEGMode.js');
globalThis.Lame = require('lamejs/src/js/Lame.js');
globalThis.BitStream = require('lamejs/src/js/BitStream.js');
const lamejs = require('lamejs');

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const STABILITY = 0.5;
const LOPPUTAUKO = ' <break time="1.0s" />';

/** Ruututekstit (näiden on oltava samat kuin pelidatassa).
 * V2 10.8.2026: lainausmerkit pois (ne tuottivat luentaan taukoja) ja
 * revitty sitaatti "…voinut uskoa…" pois (hidas kuunnella) — revitty
 * sivu kerrotaan toteamuksena, mysteeri säilyy. */
export const INTRO_RUUTU = 'Vintiltä löytyi isoisän kulunut matkakirja — '
  + 'Maailman ympäri kahdeksassakymmenessä päivässä.\n\n'
  + 'Viimeinen sivu on revitty irti kesken lauseen. Mitä hän löysi? '
  + 'Ja kuka repii kirjasta juuri sen sivun?\n\n'
  + 'Valitse kohde kartalta.';
// HUOM: viimeinen rivi on pelaajan OHJE eikä sitä lueta ääneen
// (omistajan päätös 10.8.2026) — luenta päättyy kysymykseen
// "...juuri sen sivun?". Nykyinen mp3 leikattiin samasta syystä
// (tools-ohje: scratchpadin leikkaa-intro.mjs-malli).
// "Huh — ehdin!" poistui 10.8.2026 illalla (omistajan tilaus) —
// nykyinen mp3 leikattiin ensimmäisen pitkän puheryöpyn eteen.
export const LENTO_RUUTU = 'Kone nousee, ja isoisän kirja '
  + 'aukeaa sylissäni kuin se olisi odottanut tätä hetkeä. Revitty sivu '
  + 'ei kerro, mitä hän löysi — joten menen katsomaan itse.';

/** Luennat: sama teksti tunnetagein (eleven_v3; tagit englanniksi). */
const TYOT = [
  {
    tiedosto: 'assets/audio/intro-puhe.mp3',
    luenta: '[curious] Vintiltä löytyi isoisän kulunut matkakirja — '
      + 'Maailman ympäri kahdeksassakymmenessä päivässä. '
      + '[whispers] Viimeinen sivu on revitty irti kesken lauseen. '
      + '[curious] Mitä hän löysi? Ja kuka repii kirjasta juuri sen '
      + 'sivun? [long pause]',
  },
  {
    tiedosto: 'assets/audio/puhe-lento-alku.mp3',
    luenta: '[curious] Kone '
      + 'nousee, ja isoisän kirja aukeaa sylissäni kuin se olisi '
      + 'odottanut tätä hetkeä. [short pause] [excited] Revitty sivu ei '
      + 'kerro, mitä hän löysi — joten menen katsomaan itse. [long pause]',
  },
];

const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
if (!avain) {
  console.error('ELEVEN_API_KEY puuttuu ympäristöstä.');
  process.exit(1);
}

/** Dekoodaa mp3 ja palauttaa { kesto, hantaRms } hännän tarkistukseen. */
async function tarkistaHanta(tavut) {
  const dekooderi = new MPEGDecoder();
  await dekooderi.ready;
  const tulos = dekooderi.decode(new Uint8Array(tavut));
  dekooderi.free();
  const kanava = tulos.channelData[0];
  const sr = tulos.sampleRate;
  const rmsValilta = (alku, loppu) => {
    const pala = kanava.subarray(Math.max(0, alku), Math.min(kanava.length, loppu));
    let summa = 0;
    for (const n of pala) summa += n * n;
    return Math.sqrt(summa / Math.max(1, pala.length));
  };
  const rms = rmsValilta(kanava.length - Math.round(sr * 0.3), kanava.length);
  const kokoRms = rmsValilta(0, kanava.length);
  return { kesto: kanava.length / sr, sr, rms, kokoRms };
}

/** ~0,7 s hiljaista mp3:a samoilla kehysparametreilla (mono 44100/128k). */
function hiljaisuus(sr) {
  const enkooderi = new lamejs.Mp3Encoder(1, sr, 128);
  const pala = new Int16Array(1152);
  const osat = [];
  for (let i = 0; i < Math.ceil((sr * 0.7) / 1152); i++) {
    const t = enkooderi.encodeBuffer(pala);
    if (t.length) osat.push(Buffer.from(t));
  }
  const loppu = enkooderi.flush();
  if (loppu.length) osat.push(Buffer.from(loppu));
  return Buffer.concat(osat);
}

// Valinnainen suodatin: node tools/generoi-avaus.mjs intro — generoi
// vain tiedostot, joiden polku sisältää annetun sanan.
const vain = process.argv.slice(2);
const tyot = TYOT.filter((t) => !vain.length || vain.some((v) => t.tiedosto.includes(v)));

for (const tyo of tyot) {
  console.log(`${tyo.tiedosto}: generoidaan (${tyo.luenta.length} merkkiä)…`);
  const vastaus = await fetch(
    'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128',
    {
      method: 'POST',
      headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: [{ text: tyo.luenta + LOPPUTAUKO, voice_id: AANI }],
        model_id: 'eleven_v3',
        settings: { stability: STABILITY },
      }),
    },
  );
  if (!vastaus.ok) {
    console.error(`${tyo.tiedosto}: HTTP ${vastaus.status} — ${await vastaus.text()}`);
    process.exit(1);
  }
  const tavut = Buffer.from(await vastaus.arrayBuffer());
  const { kesto, sr, rms, kokoRms } = await tarkistaHanta(tavut);
  console.log(`  kesto ${kesto.toFixed(1)} s, hännän RMS ${rms.toFixed(5)} (koko ${kokoRms.toFixed(5)})`);
  /*
   * Hiljaisuusraja on suhteellinen: v3 jättää häntään huoneääntä ja
   * hengitystä, joka on kovempaa kuin digihiljaisuus muttei puhetta.
   * Häntä kelpaa, kun se on alle 20 % koko luennan tasosta TAI alle
   * -34 dBFS. Puhe katkaisuun asti = häntä lähellä koko tasoa →
   * kaadutaan näkyvästi.
   */
  if (rms > Math.max(0.02, kokoRms * 0.2)) {
    console.error(`  HÄNTÄ EI OLE HILJAINEN (RMS ${rms.toFixed(4)}) — `
      + 'kasvata taukoa tai generoi uudelleen. Tiedostoa EI kirjoitettu.');
    process.exit(1);
  }
  let valmis = tavut;
  try {
    valmis = Buffer.concat([tavut, hiljaisuus(sr)]);
  } catch (virhe) {
    console.error(`  VAROITUS: hiljaisuuspaddaus epäonnistui (${virhe.message}) — `
      + 'kirjoitetaan ilman; mallin oma tauko on jo mitattu hiljaiseksi.');
  }
  writeFileSync(resolve(JUURI, tyo.tiedosto), valmis);
  console.log(`  kirjoitettu (${(valmis.length / 1024).toFixed(0)} kt${valmis !== tavut ? ', häntään lisätty ~0,7 s hiljaisuutta' : ''})`);
}
console.log('Valmis. Kuuntele molemmat ennen julkaisua.');
