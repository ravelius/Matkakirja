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

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';
import {
  eratunnus, kokoaRaakakuitti, lahdeCommit, raakaAmpariKansio, sha256,
  vaadiRaakavienti, vieKuitti, vieRaaka,
} from './raakavienti.mjs';

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

/*
 * RAAKAVIENTI ON PAKOLLINEN (omistajan sääntö 14.9.2026, Raamattu:
 * ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA). Tarkistus ENNEN
 * ensimmäistäkään maksullista kutsua; --ei-vientia kaataa ajon.
 */
export const AMPARIN_JUURI = 'audio/kaari';
const liput = {
  kuiva: process.argv.includes('--kuiva') || process.env.ELEVEN_KUIVA === '1',
  vienti: !process.argv.includes('--ei-vientia'),
};
vaadiRaakavienti(liput);

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

const SOURCE_COMMIT = lahdeCommit();
const ERA = eratunnus('kaari', {
  sourceCommit: SOURCE_COMMIT, voiceId: AANI, model: MALLI, stability: STABILITY,
  outputFormat: 'mp3_44100_128', lopputauko: LOPPUTAUKO,
});
const RAAKA_KANSIO = raakaAmpariKansio(AMPARIN_JUURI, ERA);
const kuittirivit = [];

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

  /*
   * RAAKA ÄMPÄRIIN HETI, ennen levylle kirjoitusta. Tässä putkessa
   * raaka ja valmis ovat sama tavujono (ei käsittelyä), mutta raaka
   * saa silti oman eräkohtaisen avaimensa: jos käsittely joskus
   * lisätään, alkuperäinen ei lakkaa olemasta tallessa huomaamatta.
   */
  const tiedostonimi = polku.split('/').at(-1);
  const raaka = vieRaaka(data, { nimi: `raaka-${tiedostonimi}`, kansio: RAAKA_KANSIO });
  console.log(`${nimi}: raaka talteen → ${raaka.url}`);

  // assets/audio ei ole enää repossa (omistajan linjaus 11.9.2026:
  // äänet vain ämpärissä), joten kansio voi puuttua tyhjästä
  // checkoutista — luodaan se ennen kirjoitusta.
  mkdirSync(dirname(polku), { recursive: true });
  writeFileSync(polku, data);
  kuittirivit.push({
    fileName: tiedostonimi,
    outputPath: `assets/audio/${tiedostonimi}`,
    rawArtifact: raaka,
    finalArtifact: { fileName: tiedostonimi, sha256: sha256(data), bytes: data.length },
  });
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
if (kuittirivit.length) {
  const kuitti = vieKuitti(kokoaRaakakuitti({
    putki: 'kaari',
    batchId: ERA,
    sourceCommit: SOURCE_COMMIT,
    resepti: { voiceId: AANI, model: MALLI, stability: STABILITY, outputFormat: 'mp3_44100_128' },
    rivit: kuittirivit,
  }), AMPARIN_JUURI);
  console.log(`Kuitti: ${kuitti.objectKey}`);
}
console.log(`Valmis — ${generoitu} luentaa.`);
