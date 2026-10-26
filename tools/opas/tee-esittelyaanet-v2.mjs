/**
 * ESITTELYN ÄÄNET v2 (Pelikoodari 8.10.2026; omistaja 20.4x: kehityskaupungit Tukholma ja Pariisi, lupa ≤ 15 000 krediittiä).
 * Kuten tee-esittelyaanet.mjs (yksi ElevenLabs-pyyntö per kerronta, yksi otto, William, eleven_v4_turbo, style 0, fi,
 * pcm_44100 with-timestamps → tasoitus PCM:nä RMS −17,2 dB + alimiter → mp3 192k ja pcm_24000 kerran), lisäksi:
 *  - AVAUS mukaan: <tyo>/paketti/opas/esittely-v1/aanet/<id>-avaus.mp3 (vientipaketti, kuten Pariisin avaus) ja
 *    master/<id>-avaus.kohdistus.json (tee-aaniajat.mjs tekee avauksen ajat pakettiin).
 *  - ALKUVARA (TF 166 -palaute, alkukatkon korjaus 8.10.): puhe (−55 dB) alkaa ≥ 120 ms:n kohdalla, 30 ms sisäänhäivytys;
 *    kohdistuksen ajat siirretään samalla (esivara_s), joten ankkurisanat osuvat.
 * Kohdeäänet R2 matkakirja-puhe opas/<sha>.mp3|pcm (sha kuten workerin oppaanAaniTunniste puhetekstistä); olemassa olevaa
 * avainta ei kirjoiteta yli, ja tallennettu master käytetään uudelleen (keskeytynyt ajo ei generoi samaa toiste).
 *
 * Käyttö: source ~/.zshrc; node tools/opas/tee-esittelyaanet-v2.mjs --tyo <kansio> [--kuiva] <esittely.json> [...]
 * Avaimet ympäristöstä: ELEVEN_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (ei tulosteta).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';
import { sanaAjat } from './tee-aanet-kohdistuksella.mjs';
import { aaniTunniste } from './tee-esittelyaanet.mjs';

const AANI = 'oae6GCCzwoEbfc5FHdEu', MALLI = 'eleven_v4_turbo', TASO_DB = -17.2, ESIVARA_S = 0.12, HAIVYTYS_S = 0.03;
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const kuiva = process.argv.includes('--kuiva');
const tyo = arg('tyo');
const tiedostot = process.argv.slice(2).filter((x, i, a) => !x.startsWith('--') && a[i - 1] !== '--tyo');
const { ELEVEN_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
const R2 = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/r2/buckets/matkakirja-puhe/objects`;

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
  const v = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AANI}/with-timestamps?output_format=pcm_44100`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'xi-api-key': ELEVEN_API_KEY },
    body: JSON.stringify({ text: puhe, model_id: MALLI, language_code: 'fi', voice_settings: { style: 0 } }) });
  if (!v.ok) throw new Error(`ElevenLabs ${v.status}: ${(await v.text()).slice(0, 200)}`);
  const d = await v.json();
  return { pcm: Buffer.from(d.audio_base64, 'base64'), kohdistus: d.alignment ?? d.normalized_alignment ?? null };
}
const ff = (args, input) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { input, maxBuffer: 1 << 30 });

/** s16le mono 44,1 kHz → puheen alku (ensimmäinen 10 ms ikkuna yli −55 dBFS) sekunteina. */
function puheenAlku(raaka) {
  const n = raaka.length >> 1, w = 441;
  for (let i = 0; i + w <= n; i += w) {
    let s = 0; for (let j = i; j < i + w; j++) { const x = raaka.readInt16LE(j * 2) / 32768; s += x * x; }
    if (10 * Math.log10(s / w + 1e-12) > -55) return i / 44100;
  }
  return 0;
}
/** Alkuvara: hiljaisuutta eteen tai alusta pois niin, että puhe alkaa ESIVARA_S:n kohdalla; palauttaa [uusi raaka, siirto_s]. */
function alkuvara(raaka) {
  const siirto = ESIVARA_S - puheenAlku(raaka), naytteet = Math.round(Math.abs(siirto) * 44100) * 2;
  let y = siirto > 0 ? Buffer.concat([Buffer.alloc(naytteet), raaka]) : Buffer.from(raaka.subarray(naytteet));
  const h = Math.round(HAIVYTYS_S * 44100);
  for (let i = 0; i < h && i * 2 + 1 < y.length; i++) y.writeInt16LE(Math.round(y.readInt16LE(i * 2) * (i / h)), i * 2);
  return [y, siirto];
}
const siirra = (sanat, s) => sanat.map((x) => ({ ...x, alku_s: Math.round((x.alku_s + s) * 1000) / 1000, loppu_s: Math.round((x.loppu_s + s) * 1000) / 1000 }));

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(join(tyo, 'master'), { recursive: true });
  const kirjaus = existsSync(join(tyo, 'aanet.json')) ? JSON.parse(readFileSync(join(tyo, 'aanet.json'), 'utf8')) : {};
  let merkit = 0, tehty = 0;
  for (const f of tiedostot) {
    const e = JSON.parse(readFileSync(f, 'utf8'));
    const tyot = [];
    if (e.avaus?.teksti) tyot.push({ id: `${e.id}-avaus`, laji: 'avaus', naytto: e.avaus.puhe || e.avaus.teksti });
    for (const k of e.kohteet) {
      tyot.push({ id: k.id, laji: 'teksti', naytto: k.puhe_teksti || k.teksti });
      if (k.lyhyt) tyot.push({ id: k.id, laji: 'lyhyt', naytto: k.puhe_lyhyt || k.lyhyt });
    }
    for (const t of tyot) {
      const puhe = vuosiluvutSanoiksi(t.naytto), sha = aaniTunniste(puhe), avain = t.laji === 'avaus' ? t.id : sha;
      merkit += puhe.length;
      if (kirjaus[avain]?.valmis) continue;
      if (kuiva) { console.log(`${e.id} ${t.id} ${t.laji} ${puhe.length} mrk ${avain}`); continue; }
      if (t.laji !== 'avaus' && await r2On(`opas/${sha}.mp3`)) { kirjaus[avain] = { kaupunki: e.id, id: t.id, laji: t.laji, valmis: true, olemassa: true }; continue; }
      const master = join(tyo, 'master', `${avain}.wav`), kohd = join(tyo, 'master', `${avain}.raaka-kohdistus.json`);
      if (!existsSync(master)) {   // yksi otto: tallennettu master käytetään uudelleen
        const { pcm: raaka, kohdistus } = await eleven(puhe);
        ff(['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', '-', master + '.osa.wav'], raaka);
        writeFileSync(kohd, JSON.stringify({ kaupunki: e.id, id: t.id, laji: t.laji, puhe, sanat: kohdistus ? sanaAjat(kohdistus) : null }));
        renameSync(master + '.osa.wav', master);
      }
      const raaka = ff(['-i', master, '-f', 's16le', '-ac', '1', '-ar', '44100', '-']);
      const [vara, siirto] = alkuvara(raaka);
      const k0 = JSON.parse(readFileSync(kohd, 'utf8'));
      if (k0.sanat) writeFileSync(join(tyo, 'master', `${avain}.kohdistus.json`), JSON.stringify({ ...k0, sha: t.laji === 'avaus' ? undefined : sha, esivara_s: Math.round(siirto * 1000) / 1000, sanat: siirra(k0.sanat, siirto) }));
      const varattu = join(tyo, 'master', `${avain}-v.wav`);
      ff(['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', '-', varattu], vara);
      const mitta = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', varattu, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
      const keski = Number((/mean_volume:\s*(-?[\d.]+) dB/.exec(mitta) ?? [])[1]);
      const vahvistus = Number.isFinite(keski) ? TASO_DB - keski : 0;
      const tasoitettu = join(tyo, 'master', `${avain}-t.wav`);
      ff(['-i', varattu, '-af', `volume=${vahvistus.toFixed(2)}dB,alimiter=limit=0.97:level=false:latency=1`, '-c:a', 'pcm_s16le', tasoitettu]);
      const mp3 = ff(['-i', tasoitettu, '-c:a', 'libmp3lame', '-b:a', '192k', '-f', 'mp3', '-']);
      const pcm = ff(['-i', tasoitettu, '-ar', '24000', '-ac', '1', '-f', 's16le', '-']);
      mkdirSync(join(tyo, 'kuuntelu', e.id), { recursive: true });
      writeFileSync(join(tyo, 'kuuntelu', e.id, `${String(tyot.indexOf(t)).padStart(2, '0')}-${t.id}-${t.laji}.mp3`), mp3);
      if (t.laji === 'avaus') {
        const p = join(tyo, 'paketti', 'opas', 'esittely-v1', 'aanet'); mkdirSync(p, { recursive: true });
        writeFileSync(join(p, `${e.id}-avaus.mp3`), mp3);
      } else {
        await r2Kirjoita(`opas/${sha}.mp3`, mp3, 'audio/mpeg');
        await r2Kirjoita(`opas/${sha}.pcm`, pcm, 'application/octet-stream');
      }
      kirjaus[avain] = { kaupunki: e.id, id: t.id, laji: t.laji, sha, merkkeja: puhe.length, kesto_s: Math.round((pcm.length / 48000) * 10) / 10,
        esivara_s: Math.round(siirto * 1000) / 1000, vahvistus_db: Math.round(vahvistus * 10) / 10, valmis: true };
      writeFileSync(join(tyo, 'aanet.json'), JSON.stringify(kirjaus, null, 1));
      tehty += 1;
      console.log(`${e.id} ${t.id} ${t.laji}: ${kirjaus[avain].kesto_s} s, ${puhe.length} mrk, alkuvara ${Math.round(siirto * 1000)} ms`);
    }
  }
  console.log(`${kuiva ? 'KUIVA: ' : ''}puhetta yhteensä ${merkit} merkkiä, tuotettu ${tehty}`);
}
