#!/usr/bin/env node
/*
 * ESIGENEROIDUN ESITTELYN ÄÄNET (omistajan hyväksymä määrä 7.10.2026; ajetaan vasta Päätoimittajan tekstikuittauksen jälkeen).
 * Jokaisesta kerronnasta (teksti ja kierroksen lyhyt) YKSI ElevenLabs-pyyntö, yksi otto, ei vertailuottoja:
 *   William (KERTOJA_ELEVEN_AANI), eleven_v4_turbo, oletusvakaus, style 0, language_code fi, pcm_44100 (master)
 *   → tasoitus PCM:nä (RMS -17,2 dB kuten siltalauseet, alimiter) → mp3 192 kbps ja pcm_24000 s16le mono kerran masterista
 *   → R2 matkakirja-puhe: opas/<sha>.mp3 ja opas/<sha>.pcm, sha kuten workerin oppaanAaniTunniste puhetekstistä
 *     (vuosiluvut sanoina, tools/pollo/puhesanat.js). Worker löytää ne GET /opas/aani/<sha>.* -polulla eikä tuota uudelleen.
 * Olemassa olevaa avainta ei kirjoiteta yli. Masterit ja tasot talteen --tyo-kansioon (LAHTEET/mittaukset).
 *
 * Käyttö: source ~/.zshrc; node tools/opas/tee-esittelyaanet.mjs --tyo <kansio> [--kuiva] <esittely.json> [...]
 * Avaimet ympäristöstä: ELEVEN_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (ei tulosteta).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';

const AANI = 'oae6GCCzwoEbfc5FHdEu', MALLI = 'eleven_v4_turbo', TASO_DB = -17.2;
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const kuiva = process.argv.includes('--kuiva');
const tyo = arg('tyo');
const tiedostot = process.argv.slice(2).filter((x, i, a) => !x.startsWith('--') && a[i - 1] !== '--tyo');
const { ELEVEN_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
const R2 = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/r2/buckets/matkakirja-puhe/objects`;

/** Sama tunniste kuin workerin oppaanAaniTunniste (puheteksti, ei näytön teksti). */
export const aaniTunniste = (puhe) => createHash('sha256').update(`william|${MALLI}|${puhe}`).digest('hex').slice(0, 32);

async function r2On(avain) {
  const v = await fetch(`${R2}?prefix=${encodeURIComponent(avain)}&per_page=1`, { headers: { authorization: `Bearer ${CLOUDFLARE_API_TOKEN}` } });
  const d = await v.json();
  return (d.result ?? []).some((x) => x.key === avain);
}
async function r2Kirjoita(avain, data, tyyppi) {
  const v = await fetch(`${R2}/${avain}`, { method: 'PUT', headers: { authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`, 'content-type': tyyppi }, body: data });
  if (!v.ok) throw new Error(`R2 ${avain}: ${v.status}`);
}
async function eleven(puhe) {
  const v = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AANI}?output_format=pcm_44100`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'xi-api-key': ELEVEN_API_KEY },
    body: JSON.stringify({ text: puhe, model_id: MALLI, language_code: 'fi', voice_settings: { style: 0 } }) });
  if (!v.ok) throw new Error(`ElevenLabs ${v.status}`);
  return Buffer.from(await v.arrayBuffer());
}
const ff = (args, input) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { input, maxBuffer: 1 << 30 });

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(join(tyo, 'master'), { recursive: true });
  const kirjaus = existsSync(join(tyo, 'aanet.json')) ? JSON.parse(readFileSync(join(tyo, 'aanet.json'), 'utf8')) : {};
  let merkit = 0, tehty = 0;
  for (const f of tiedostot) {
    const e = JSON.parse(readFileSync(f, 'utf8'));
    for (const k of e.kohteet) {
      for (const [laji, naytto] of [['teksti', k.puhe_teksti || k.teksti], ['lyhyt', k.lyhyt ? k.puhe_lyhyt || k.lyhyt : null]]) {
        if (!naytto) continue;
        const puhe = vuosiluvutSanoiksi(naytto), sha = aaniTunniste(puhe);
        merkit += puhe.length;
        if (kirjaus[sha]?.valmis) continue;
        if (kuiva) { console.log(`${e.id} ${k.id} ${laji} ${puhe.length} mrk ${sha}`); continue; }
        if (await r2On(`opas/${sha}.mp3`)) { kirjaus[sha] = { kaupunki: e.id, id: k.id, laji, valmis: true, olemassa: true }; continue; }
        // Yksi otto: jo tallennettu master käytetään uudelleen (keskeytynyt ajo ei generoi samaa tekstiä toiste).
        const master = join(tyo, 'master', `${sha}.wav`);
        if (!existsSync(master)) {
          const raaka = await eleven(puhe);
          ff(['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', '-', master + '.osa.wav'], raaka);
          renameSync(master + '.osa.wav', master);
        }
        // Tasoitus PCM:nä: RMS → -17,2 dB (volumedetect mean_volume), alimiter huippuihin; sitten pakkaus kerran.
        const mitta = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', master, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
        const keski = Number((/mean_volume:\s*(-?[\d.]+) dB/.exec(mitta) ?? [])[1]);
        const vahvistus = Number.isFinite(keski) ? TASO_DB - keski : 0;
        const tasoitettu = join(tyo, 'master', `${sha}-t.wav`);
        ff(['-i', master, '-af', `volume=${vahvistus.toFixed(2)}dB,alimiter=limit=0.97:level=false:latency=1`, '-c:a', 'pcm_s16le', tasoitettu]);
        const mp3 = ff(['-i', tasoitettu, '-c:a', 'libmp3lame', '-b:a', '192k', '-f', 'mp3', '-']);
        const pcm = ff(['-i', tasoitettu, '-ar', '24000', '-ac', '1', '-f', 's16le', '-']);
        mkdirSync(join(tyo, 'kuuntelu', e.id), { recursive: true });
      writeFileSync(join(tyo, 'kuuntelu', e.id, `${String(e.kohteet.indexOf(k) + 1).padStart(2, '0')}-${k.id}-${laji}.mp3`), mp3);
      await r2Kirjoita(`opas/${sha}.mp3`, mp3, 'audio/mpeg');
        await r2Kirjoita(`opas/${sha}.pcm`, pcm, 'application/octet-stream');
        kirjaus[sha] = { kaupunki: e.id, id: k.id, laji, merkkeja: puhe.length, kesto_s: Math.round((pcm.length / 48000) * 10) / 10,
          vahvistus_db: Math.round(vahvistus * 10) / 10, valmis: true };
        writeFileSync(join(tyo, 'aanet.json'), JSON.stringify(kirjaus, null, 1));
        tehty += 1;
        console.log(`${e.id} ${k.id} ${laji}: ${kirjaus[sha].kesto_s} s, ${puhe.length} mrk`);
      }
    }
  }
  console.log(`${kuiva ? 'KUIVA: ' : ''}puhetta yhteensä ${merkit} merkkiä (≈ ${Math.round(merkit / 2)} krediittiä eleven_v4_turbo), tuotettu ${tehty}`);
}
