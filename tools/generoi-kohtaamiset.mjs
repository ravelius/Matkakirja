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

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KOHTAAMISET } from '../js/packs/kohtaamiset.js';
import {
  eratunnus, kokoaRaakakuitti, lahdeCommit, raakaAmpariKansio, sha256,
  vaadiRaakavienti, vieKuitti, vieRaaka,
} from './raakavienti.mjs';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = 'eleven_v3';
const STABILITY = 0.5; // sama kuin saapumisluennoissa (0.4 hyppi liikaa — omistaja 7.8.2026)

const KERTOJA = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
const PELAAJA = 'JMfkzZiSsox62UXcXUqM'; // Jaakko — nuori Fogg
// Hahmoääni per kaupunki. Uusi kaupunki tarvitsee rivin tänne —
// valitse tilin äänistä hahmon ikään ja luonteeseen sopiva.
/*
 * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
 *
 * LONTOON ÄÄNI ON POISTETTU TARKOITUKSELLA. Rivi oli
 * `lontoo: 'Gp43kq9FsSlavD7esRtx'` (Vaino — vanha, rauhallinen), ja se
 * valittiin jokietsijä Nedille. Kaupungin kohtaamishenkilö on nyt
 * 24-vuotias muotialan opiskelija Leila (js/packs/kohtaamiset.js), eikä
 * vanhan miehen ääni käy hänelle. Uusi ääni on VALITTAVA TILIN
 * ÄÄNISTÄ ennen ajoa; siihen asti työkalu keskeytyy virheeseen
 * "roolille hahmo ei ole ääntä", mikä on tarkoitus — väärä ääni olisi
 * pahempi kuin keskeytynyt ajo.
 *
 * DUBROVNIK JA ODESSA eivät tarvitse riviä vielä: niiden kohtaamisilla
 * ei ole tervehdysLuenta- eikä loytoLuenta-kenttiä, joten työkalu
 * ohittaa ne. Jos Fable tilaa niille luennat, tänne tulee rivi
 * kummallekin (Mara ~40 v, Iryna ~50 v).
 */
const HAHMOT = {};

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
export const AMPARIN_JUURI = 'audio/kohtaamiset';
vaadiRaakavienti({
  kuiva: process.argv.includes('--kuiva') || process.env.ELEVEN_KUIVA === '1',
  vienti: !process.argv.includes('--ei-vientia'),
});

const kaupungit = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!kaupungit.length) {
  console.error('Anna kaupungit: node tools/generoi-kohtaamiset.mjs lontoo …');
  process.exit(1);
}

const SOURCE_COMMIT = lahdeCommit();
const ERA = eratunnus('kohtaaminen', {
  sourceCommit: SOURCE_COMMIT, kertoja: KERTOJA, pelaaja: PELAAJA,
  model: MALLI, stability: STABILITY, outputFormat: 'mp3_44100_128',
});
const RAAKA_KANSIO = raakaAmpariKansio(AMPARIN_JUURI, ERA);
const kuittirivit = [];

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
    const tiedostonimi = `puhe-kohtaaminen-${id}-${nimi}.mp3`;
    const polku = resolve(JUURI, `assets/audio/${tiedostonimi}`);
    const data = Buffer.from(await vastaus.arrayBuffer());

    // RAAKA ÄMPÄRIIN HETI, ennen levylle kirjoitusta.
    const raaka = vieRaaka(data, { nimi: `raaka-${tiedostonimi}`, kansio: RAAKA_KANSIO });
    console.log(`${id}/${nimi}: raaka talteen → ${raaka.url}`);

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
    console.log(`${id}/${nimi}: ${(data.length / 1024).toFixed(0)} kt → ${polku}`);
  }
}
if (kuittirivit.length) {
  const kuitti = vieKuitti(kokoaRaakakuitti({
    putki: 'kohtaamiset',
    batchId: ERA,
    sourceCommit: SOURCE_COMMIT,
    resepti: { model: MALLI, stability: STABILITY, outputFormat: 'mp3_44100_128' },
    rivit: kuittirivit,
  }), AMPARIN_JUURI);
  console.log(`Kuitti: ${kuitti.objectKey}`);
}
console.log('Valmis. Tiedostot ovat paikallisessa assets/audio-kansiossa (ei repoon,');
console.log('linjaus 11.9.2026) — vie ne ämpäriin. Muista myös avain kiertoon.');
