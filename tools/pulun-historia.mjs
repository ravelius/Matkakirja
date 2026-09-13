/*
 * ══════════════════════════════════════════════════════════════════
 * PULUN ÄÄNIHISTORIA ELEVENLABSISTA — PELKKÄ LUKU
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN KYSYMYS 13.9.2026, sanatarkasti: *"Säilyykö generointi
 * elevenin päässä tallessa?"* — ja sen perään lupa ajaa Pulun äänet
 * uudestaan normaalilla nopeudella.
 *
 * MIKSI TÄMÄ ON OLEMASSA. Pelin oma raakakansio (media/pulu-raaka)
 * elää vain ajon ajan runnerin levyllä eikä sitä viedä ämpäriin, joten
 * NOPEUTTAMATTOMAT alkuperäiset eivät ole meillä tallessa. ElevenLabsin
 * History-arkisto sen sijaan säilyttää mallin RAAKATUOTOKSEN — juuri sen
 * äänen, jonka viimeistelyketju sitten nopeutti atempolla (v1826 asti).
 * Jos repliikki löytyy sieltä, sen saa takaisin ILMAISEKSI eikä sitä
 * tarvitse generoida uudestaan.
 *
 * TÄMÄ TYÖKALU EI GENEROI MITÄÄN EIKÄ KULUTA KREDIITTEJÄ. Se tekee
 * vain GET-kutsuja: /v1/history listaa ja /v1/history/<id>/audio lataa
 * jo maksetun äänen. Generointi on ja pysyy omassa työkalussaan
 * (tools/generoi-pulu.mjs), jonka ajo-omistaja on erikseen sovittu.
 *
 * API-AVAIN LUETAAN VAIN YMPÄRISTÖSTÄ (ELEVEN_API_KEY) eikä sitä
 * tulosteta, lokiteta tai kirjoiteta tiedostoon.
 *
 * KÄYTTÖ
 *   node tools/pulun-historia.mjs                 listaa Pulun äänen historian
 *   node tools/pulun-historia.mjs --kaikki        ei suodata voice_id:llä
 *   node tools/pulun-historia.mjs --sivut 10      montako sivua haetaan
 *   node tools/pulun-historia.mjs --lataa <kansio>  lataa löytyneet raa'at
 *
 * Konttiympäristössä Noden fetch tarvitsee NODE_USE_ENV_PROXY=1.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/* Sama vartija kuin muissa API-työkaluissa: ilman lippua Noden fetch ei
 * lue HTTPS_PROXYa, ja kutsu kaatuu kontissa vaikka verkko on auki. */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  process.env.NODE_USE_ENV_PROXY = '1';
}

const API = 'https://api.elevenlabs.io';
/** Omistajan 12.9.2026 lukitsema Pulun ääni. */
export const PULU_AANI = 'piI8Kku0DcvcL6TTSeQt';
/** Yksi sivu kerrallaan; rajapinnan oma katto on 1000. */
export const SIVUN_KOKO = 100;

/** Lippujen luku. Oletukset ovat turvallisia: ei latausta, ei suodatuksen ohitusta. */
export function tulkitseArgumentit(argumentit) {
  const liput = {
    aani: PULU_AANI, sivut: 5, lataa: null, kaikki: false,
  };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--kaikki') liput.kaikki = true;
    else if (arg === '--aani') { liput.aani = argumentit[i + 1] ?? liput.aani; i += 1; }
    else if (arg === '--sivut') { liput.sivut = Number(argumentit[i + 1]) || liput.sivut; i += 1; }
    else if (arg === '--lataa') { liput.lataa = argumentit[i + 1] ?? 'media/pulu-historia'; i += 1; }
  }
  return liput;
}

async function haeJson(url, avain) {
  const vastaus = await fetch(url, {
    headers: { 'xi-api-key': avain },
    signal: AbortSignal.timeout(60000),
  });
  if (!vastaus.ok) {
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 300)}`);
  }
  return vastaus.json();
}

/**
 * Yksi historiarivi luettavaan muotoon. Kenttien nimet vaihtelevat
 * rajapinnan versioiden välillä, joten jokaiselle on varamuoto — tyhjä
 * kenttä on parempi kuin kaatuva työkalu.
 */
export function rivinTiedot(kohta) {
  return {
    id: kohta?.history_item_id ?? kohta?.id ?? '',
    voiceId: kohta?.voice_id ?? '',
    voiceName: kohta?.voice_name ?? '',
    malli: kohta?.model_id ?? '',
    // Nolla on kelvollinen aikaleima, joten totuusarvotesti ei kelpaa.
    aika: Number.isFinite(kohta?.date_unix)
      ? new Date(kohta.date_unix * 1000).toISOString() : '',
    teksti: String(kohta?.text ?? '').replace(/\s+/g, ' ').trim(),
  };
}

/** Sivutettu haku. Palauttaa rivit vanhimmasta uusimpaan järjestämättä. */
export async function haeHistoria(avain, { sivut = 5, aani = null } = {}) {
  const rivit = [];
  let alku = null;
  for (let sivu = 0; sivu < sivut; sivu += 1) {
    const osoite = new URL(`${API}/v1/history`);
    osoite.searchParams.set('page_size', String(SIVUN_KOKO));
    if (aani) osoite.searchParams.set('voice_id', aani);
    if (alku) osoite.searchParams.set('start_after_history_item_id', alku);
    // eslint-disable-next-line no-await-in-loop
    const data = await haeJson(osoite.toString(), avain);
    const osa = data?.history ?? [];
    rivit.push(...osa);
    if (!data?.has_more || !osa.length) break;
    alku = osa.at(-1)?.history_item_id ?? null;
    if (!alku) break;
  }
  return rivit;
}

/** Lataa yhden jo maksetun äänen. Ei generoi mitään. */
export async function lataaAani(avain, id, kohde) {
  const vastaus = await fetch(`${API}/v1/history/${id}/audio`, {
    headers: { 'xi-api-key': avain },
    signal: AbortSignal.timeout(120000),
  });
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const tavut = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, tavut);
  return { bytes: tavut.length, sha256: createHash('sha256').update(tavut).digest('hex') };
}

if (process.argv[1] === TAMA) {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — historiaa ei voi lukea.');
    console.error('Avain on GitHub Actions -secreteissä; aja työnkulun kautta.');
    process.exit(1);
  }
  const rivit = await haeHistoria(avain, {
    sivut: liput.sivut, aani: liput.kaikki ? null : liput.aani,
  });
  if (!rivit.length) {
    console.log('HISTORIA ON TYHJÄ näillä ehdoilla.');
    console.log('Tämä voi tarkoittaa kahta asiaa: arkisto on vanhentunut tilaustason');
    console.log('säilytysrajan vuoksi, tai suodatin ei osu. Kokeile --kaikki.');
    console.log('Jos arkisto on aidosti tyhjä, alkuperäiset on generoitava uudestaan.');
    process.exit(0);
  }
  console.log(`HISTORIASSA ${rivit.length} riviä`
    + `${liput.kaikki ? '' : ` äänellä ${liput.aani}`}.\n`);
  console.log('aika                      malli            teksti');
  for (const kohta of rivit) {
    const r = rivinTiedot(kohta);
    console.log(`${r.aika.padEnd(25)} ${String(r.malli).padEnd(16)} ${r.teksti.slice(0, 70)}`);
  }
  if (liput.lataa) {
    const kansio = resolve(JUURI, liput.lataa);
    mkdirSync(kansio, { recursive: true });
    console.log(`\nLadataan ${rivit.length} kpl → ${liput.lataa}`);
    for (const kohta of rivit) {
      const r = rivinTiedot(kohta);
      if (!r.id) continue;
      const kohde = join(kansio, `historia-${r.id}.mp3`);
      try {
        // eslint-disable-next-line no-await-in-loop
        const tulos = await lataaAani(avain, r.id, kohde);
        console.log(`  ${r.id}  ${(tulos.bytes / 1024).toFixed(0)} kt  ${tulos.sha256.slice(0, 16)}…`);
      } catch (virhe) {
        console.error(`  ${r.id}  EI LATAUTUNUT: ${virhe.message}`);
      }
    }
  }
}
