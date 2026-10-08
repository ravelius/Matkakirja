#!/usr/bin/env node
/*
 * YKSITTÄISET OTOT KOHDISTUKSELLA (Päätoimittaja 7.10.2026, omistajan hyväksymät: avaus, opastus, Notre-Dame): yksi
 * ElevenLabs-pyyntö per teksti (with-timestamps → ääni ja merkkikohtaiset ajat samasta otosta, ei vertailuottoja).
 * William, eleven_v4_turbo, language_code fi, style 0, pcm_44100 → tasoitus PCM:nä (RMS -17,2 dB + alimiter) → mp3 ja
 * pcm_24000 kerran. Sanakohtaiset ajat <id>.kohdistus.json (puhetekstin sanat; kuvien ajoitukseen).
 * --r2: myös R2:een opas/<sha>.mp3|pcm (sha kuten workerin oppaanAaniTunniste puhetekstistä).
 * Käyttö: source ~/.zshrc; node tools/opas/tee-aanet-kohdistuksella.mjs --lista <[{id, teksti, puhe?}].json> --tyo <kansio> [--r2]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';
import { aaniTunniste } from './tee-esittelyaanet.mjs';

const AANI = 'oae6GCCzwoEbfc5FHdEu', MALLI = 'eleven_v4_turbo', TASO_DB = -17.2, SR = 44100;
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const tyo = arg('tyo'), r2 = process.argv.includes('--r2');
const { ELEVEN_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
const R2 = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/r2/buckets/matkakirja-puhe/objects`;
const ff = (a, input) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...a], { input, maxBuffer: 1 << 30 });

/** Merkkikohtaiset ajat → sanat { sana, alku_s, loppu_s } (välilyönnit erottavat). */
export function sanaAjat(al) {
  const sanat = []; let nyt = null;
  al.characters.forEach((c, i) => {
    if (/\s/.test(c)) { if (nyt) sanat.push(nyt); nyt = null; return; }
    if (!nyt) nyt = { sana: '', alku_s: al.character_start_times_seconds[i], loppu_s: 0 };
    nyt.sana += c; nyt.loppu_s = al.character_end_times_seconds[i];
  });
  if (nyt) sanat.push(nyt);
  return sanat.map((s) => ({ ...s, alku_s: Math.round(s.alku_s * 1000) / 1000, loppu_s: Math.round(s.loppu_s * 1000) / 1000 }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(join(tyo, 'master'), { recursive: true });
  const lista = JSON.parse(readFileSync(arg('lista'), 'utf8'));
  let merkit = 0;
  for (const x of lista) {
    const puhe = vuosiluvutSanoiksi(x.puhe || x.teksti), sha = aaniTunniste(puhe);
    const raaka = join(tyo, 'master', `${x.id}.wav`), kohd = join(tyo, `${x.id}.kohdistus.json`);
    if (!existsSync(raaka)) { // yksi otto: tallennettu käytetään uudelleen
      const v = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AANI}/with-timestamps?output_format=pcm_44100`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'xi-api-key': ELEVEN_API_KEY },
        body: JSON.stringify({ text: puhe, model_id: MALLI, language_code: 'fi', voice_settings: { style: 0 } }) });
      if (!v.ok) throw new Error(`ElevenLabs ${v.status}: ${(await v.text()).slice(0, 200)}`);
      const d = await v.json();
      ff(['-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', '-', raaka], Buffer.from(d.audio_base64, 'base64'));
      writeFileSync(kohd, JSON.stringify({ id: x.id, teksti: x.teksti, puhe, sha, sanat: sanaAjat(d.alignment ?? d.normalized_alignment),
        merkit: d.alignment }, null, 1));
      merkit += puhe.length;
    }
    const keski = Number((/mean_volume:\s*(-?[\d.]+) dB/.exec(spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', raaka, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr) ?? [])[1]);
    const t = join(tyo, 'master', `${x.id}-t.wav`);
    ff(['-i', raaka, '-af', `volume=${(TASO_DB - keski).toFixed(2)}dB,alimiter=limit=0.97:level=false:latency=1`, '-c:a', 'pcm_s16le', t]);
    const mp3 = ff(['-i', t, '-c:a', 'libmp3lame', '-b:a', '192k', '-f', 'mp3', '-']);
    writeFileSync(join(tyo, `${x.id}.mp3`), mp3);
    if (r2) {
      const pcm = ff(['-i', t, '-ar', '24000', '-ac', '1', '-f', 's16le', '-']);
      for (const [avain, data, tyyppi] of [[`opas/${sha}.mp3`, mp3, 'audio/mpeg'], [`opas/${sha}.pcm`, pcm, 'application/octet-stream']]) {
        const v = await fetch(`${R2}/${avain}`, { method: 'PUT', headers: { authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`, 'content-type': tyyppi }, body: data });
        if (!v.ok) throw new Error(`R2 ${avain}: ${v.status}`);
      }
    }
    const kesto = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(tyo, `${x.id}.mp3`)], { encoding: 'utf8' }));
    console.log(`${x.id}: ${kesto.toFixed(1)} s, ${puhe.length} mrk${r2 ? `, R2 ${sha}` : ''}`);
  }
  console.log(`generoitu ${merkit} merkkiä (≈ ${Math.round(merkit / 2)} krediittiä eleven_v4_turbo)`);
}
