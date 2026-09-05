/*
 * LYRIA 3.5 — PELIN MUSIIKKIMOOTTORI, YHTEINEN HAKU KAHDELLE TYÖKALULLE
 *
 * Omistajan linjaus 5.9.2026 illalla, sanatarkasti: *"kaikki musiikki
 * lyrialla"*. Sitä ennen (5.9.2026, *"ota lyra musiikit käyttöön peliin
 * ja poista vanha"*) Lyria oli jo siirtymä- ja linssiraitojen moottori;
 * nyt sama koskee myös musiikkipalettia (pohja, visa, aarre, pääaarre).
 *
 * Kaksi työkalua tarvitsee siis TÄSMÄLLEEN SAMAN haun:
 *
 *   tools/generoi-siirtymamusiikki.mjs   siirtymä- ja linssiloopit
 *   tools/generoi-musiikki.mjs           musiikkipaletti
 *
 * Aiemmin ElevenLabsin kutsu oli kopioitu molempiin, ja työkalun oma
 * kommentti myönsi sen ("kutsu on tarkoituksella kopioitu eikä tuotu,
 * koska palettityökalu suorittaa pääohjelmansa moduulitasolla"). Se este
 * poistui, kun palettityökalun pääohjelma siirtyi `main()`-funktioon —
 * ja Lyrian kutsu on kopioimisen arvoinen kahdesti huonompi tapaus kuin
 * ElevenLabsin: vastaus ei ole mp3-tavuja vaan JSON, jonka sisältä
 * äänilohko täytyy etsiä. Kaksi kopiota sitä etsintää olisi kaksi
 * paikkaa, joissa Gemini API:n rakenteen muutos pitäisi muistaa korjata.
 *
 * RAJAPINTA (Gemini API, Interactions):
 *   POST https://generativelanguage.googleapis.com/v1beta/interactions
 *   otsakkeet: x-goog-api-key, Content-Type: application/json
 *   runko:     { model: 'lyria-3.5', input: <kehote> }
 *   vastaus:   JSON, jonka steps[].content[] sisältää audio-lohkon
 *              base64-datana (mp3).
 *
 * Avain luetaan VAIN ympäristöstä (GOOGLE_API_KEY, varalla
 * GEMINI_API_KEY) eikä sitä tulosteta koskaan — ei lokiin eikä
 * virheilmoitukseen. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1 (kutsuvat työkalut
 * käynnistävät itsensä uudelleen lipun kanssa).
 */

import { writeFileSync } from 'node:fs';

export const LYRIA_OSOITE = 'https://generativelanguage.googleapis.com/v1beta/interactions';
export const LYRIA_MALLI = 'lyria-3.5';

/**
 * Moottorit, jotka `--moottori` hyväksyy. `lyria` on OLETUS kummassakin
 * työkalussa (omistajan linjaus 5.9.2026); `eleven` jää vertailuun.
 */
export const MOOTTORIT = ['eleven', 'lyria'];

/**
 * Raidan tiedostonimi moottorin mukaan: Lyria saa oman päätteen
 * (`musa-pohja.mp3` → `musa-pohja-lyria.mp3`), ElevenLabs paljaan nimen.
 *
 * Näin molemmat moottorit voidaan generoida rinnakkain ja kuunnella
 * vierekkäin ilman että toinen ylikirjoittaa toisen — juuri niin
 * omistaja valitsi Lyrian. Sääntö on tässä yhdessä paikassa, koska
 * peli, työkalu ja työhuoneen kuuntelulehti hakevat samoja nimiä.
 */
export const raidanTiedosto = (raita, moottori) => (moottori === 'lyria'
  ? raita.tiedosto.replace(/\.mp3$/, '-lyria.mp3') : raita.tiedosto);

/** Moottorin avaimen nimi virheilmoitusta varten (ei arvo). */
export const avaimenNimi = (moottori) => (moottori === 'lyria' ? 'GOOGLE_API_KEY' : 'ELEVEN_API_KEY');

/** Moottorin API-avain ympäristöstä, tai undefined. */
export function moottorinAvain(moottori, env = process.env) {
  return moottori === 'lyria'
    ? (env.GOOGLE_API_KEY ?? env.GEMINI_API_KEY)
    : (env.ELEVEN_API_KEY ?? env.ELEVENLABS_API_KEY);
}

/**
 * Raidan prompti Lyrian omaan muotoon.
 *
 * Lyria ei ota kestoa eikä `force_instrumental`-lippua runkoparametrina
 * kuten ElevenLabs, vaan molemmat sanotaan kehotteessa. Siksi raitojen
 * omat kuvaukset (soittimet, luonne, sauma) pysyvät työkaluissa
 * sellaisinaan ja tämä lisää perään vain sen, minkä rajapinta muuten
 * ottaisi kenttinä.
 *
 * `looppi` erottaa paletin kaksi lajia: pohjavire ja visamusiikki
 * kiertävät (sauma pyydetään), aarreaiheet eivät (niillä on alku ja
 * loppu, ja "loop seamlessly" pyytäisi mallia poistamaan juuri sen
 * lopetuksen, jota aarrepaljastus tarvitsee).
 */
export function lyriaKehote({ prompt, sekunnit, looppi = true }) {
  return `${prompt} Instrumental only, absolutely no vocals or singing. `
    + `A short cue of about ${sekunnit} seconds`
    + (looppi ? ' that could loop seamlessly.' : '.');
}

/**
 * Kaikki audio-lohkot vastauksesta. Rakenne haetaan rekursiivisesti
 * eikä kiinteällä polulla (`steps[0].content[0]`): Interactions-vastaus
 * kantaa myös tekstiosia ja metatietoa, ja niiden järjestys on mallin
 * asia. Ensimmäinen löytyvä audio-lohko on raita.
 */
function audioLohkot(json) {
  const lohkot = [];
  const keraa = (x) => {
    if (!x || typeof x !== 'object') return;
    if (Array.isArray(x)) { x.forEach(keraa); return; }
    if (x.type === 'audio' && typeof x.data === 'string') lohkot.push(x);
    for (const v of Object.values(x)) if (v && typeof v === 'object') keraa(v);
  };
  keraa(json);
  return lohkot;
}

/**
 * Yksi maksullinen kutsu Lyrialle: raita levylle, palauttaa tavumäärän.
 *
 * @param {{prompt: string, kestoMs: number, looppi?: boolean}} raita
 * @param {string} avain GOOGLE_API_KEY ympäristöstä (ei tulostu mihinkään)
 * @param {string} kohde tiedostopolku, johon mp3 kirjoitetaan
 */
export async function haeLyriasta({ prompt, kestoMs, looppi = true }, avain, kohde) {
  const sekunnit = Math.round(kestoMs / 1000);
  const vastaus = await fetch(LYRIA_OSOITE, {
    method: 'POST',
    headers: { 'x-goog-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: LYRIA_MALLI,
      input: lyriaKehote({ prompt, sekunnit, looppi }),
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä): 401/403 kertoo, ettei
    // Lyria ole auki tällä avaimella.
    throw new Error(`Lyria HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const json = await vastaus.json();
  const lohkot = audioLohkot(json);
  if (!lohkot.length) {
    throw new Error(`Lyria: vastauksessa ei audio-lohkoa (${JSON.stringify(json).slice(0, 300)})`);
  }
  const data = Buffer.from(lohkot[0].data, 'base64');
  writeFileSync(kohde, data);
  return data.length;
}
