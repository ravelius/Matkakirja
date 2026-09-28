#!/usr/bin/env node
/*
 * PULUN v4-ÄÄNITTEIDEN TASOITUS PELIN PULU-TASOON (Päätoimittaja 28.9.2026:
 * "Pelaaja ei saa kuulla hiljaisempaa Pulua. Tasoita kaikki pelin
 * v4-tiedostot Pulu-tasoon (-17,2 LUFS, 192 kbps, limitteri 0,97) samalla
 * kaavalla kuin koosteessa, ja raakatiedostot talteen.").
 *
 * eleven_v4 tuottaa Livian äänen 0–6 dB hiljaisempana kuin eleven_v3, eikä
 * putki (tools/generoi-pulu.mjs) normalisoi, koska omistaja otti
 * jälkikäsittelyn pois 13.9.2026. Soitin ei voi korjata (asetaLivianTaso
 * rajaa tason ≤ 1, perustaso 0,8). Tasoitus tehdään siksi erillisenä,
 * dokumentoituna vaiheena:
 *
 *   1. versioitu v4-äänite haetaan sellaisenaan (se ja raaka/-kopio jäävät
 *      ämpäriin koskemattomina — ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA);
 *   2. kokonaisäänekkyys mitataan (loudnorm print_format=json) ja korjataan
 *      YHDELLÄ lineaarisella vahvistuksella kuten linssiluennoissa
 *      (tools/generoi-linssiluennat.mjs) — ei dynaamista loudnormia, joka
 *      tasoittaisi puheen eläväisyyden; huiput rajataan limitterillä 0,97;
 *   3. tulos koodataan kerran 192 kbps:llä avaimeen …/tasoitettu/<nimi>, ja
 *      kuittisidottu .eleet.json kopioidaan viereen (ajat eivät muutu:
 *      vahvistus ei siirrä ääntä ajassa);
 *   4. kuitti (lähde, sha256:t, mitattu taso, vahvistus, kohde) viedään
 *      avaimeen aanet/pulu/kuitit/tasoitus-<aikaleima>.json.
 *
 * Tämän jälkeen js/liviapuhe.js LIVIAN_VERSIOIDUT_AANET osoitetaan
 * tasoitettuihin avaimiin (tulostuu ajon lopuksi).
 *
 *   zsh -c 'source ~/.matkakirja-avaimet-koodaus.zsh; source ~/.zshrc; node tools/tasoita-pulu.mjs [--kuiva] ateena-3 iss-a-1 …'
 *   (ilman repliikkejä: kaikki eleven_v4-erien äänitteet taulukosta)
 *   … node tools/tasoita-pulu.mjs [--kuiva] --era pulu-<20 hex>
 *   (uuden erän KAIKKI eleven_v4-äänitteet sen valmiista kuitista
 *   aanet/pulu/kuitit/<erä>.completed.json — ajetaan heti generoi-pulu.mjs:n
 *   jälkeen, ennen kuin taulukkoon kirjoitetaan mitään; tuloste on
 *   LIVIAN_VERSIOIDUT_AANET-rivit tasoitettuihin avaimiin)
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { LIVIAN_VERSIOIDUT_AANET } from '../js/liviapuhe.js';

export const PULU_TASO_LUFS = -17.2;
export const PULU_LIMITTERI = 0.97;
export const PULU_TASOITUS_BITTIVIRTA = '192k';
/** eleven_v4-erät (tools/generoi-pulu.mjs, 28.9.2026). */
export const V4_ERAT = Object.freeze([
  'pulu-3eaad28481f0aa2ef5a9', 'pulu-16f2c04e9e19bef41d64',
  // Koko repertuaari v4:llä 28.9.2026 ilta (75 repliikkiä, 8 erää à ≤ 10).
  'pulu-06b888b9453946cfbda6', 'pulu-12b15e8a504a9fcb2e3a', 'pulu-4fa1c5cfc51373a11429',
  'pulu-62d4bea1517eaa83e5a4', 'pulu-64d79ec3f9a10726f753', 'pulu-84129c929509d868a32a',
  'pulu-8faeb74edfc3ba66e61a', 'pulu-fa795db119f56b6ef97e',
]);
const MEDIA = 'https://media.matkakirja.app/';

/** Tasoitetun äänitteen avain: sama kansio, alikansio tasoitettu/. */
export function tasoitettuAvain(avain) {
  return String(avain).replace(/\/([^/]+)$/, '/tasoitettu/$1');
}

const sha = (data) => createHash('sha256').update(data).digest('hex');
const aja = (komento, argit) => execFileSync(komento, argit, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

function mittaaLufs(tiedosto) {
  const { stderr } = spawnSync('ffmpeg', ['-hide_banner', '-i', tiedosto, '-af',
    `loudnorm=I=${PULU_TASO_LUFS}:TP=-2:LRA=11:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
  const i = Number((/"input_i"\s*:\s*"([^"]+)"/.exec(stderr ?? '') || [])[1]);
  if (!Number.isFinite(i)) throw new Error(`${tiedosto}: tasoa ei voitu mitata`);
  return i;
}

function r2(args) {
  const tili = process.env.R2_ACCOUNT_ID;
  if (!tili || !process.env.R2_BUCKET) throw new Error('R2_ACCOUNT_ID / R2_BUCKET puuttuu ympäristöstä');
  return aja('aws', ['s3', ...args, '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`, '--only-show-errors']);
}

async function main() {
  const argv = process.argv.slice(2);
  const kuiva = argv.includes('--kuiva');
  const eraIndeksi = argv.indexOf('--era');
  const era = eraIndeksi >= 0 ? argv[eraIndeksi + 1] : null;
  const pyydetyt = argv.filter((a, i) => !a.startsWith('--') && i !== eraIndeksi + 1);
  let rivit;
  if (era) {
    if (!/^pulu-[0-9a-f]{20}$/.test(era)) throw new Error(`--era: odotettiin pulu-<20 hex>, saatiin ${era}`);
    const kuitti = await fetch(`${MEDIA}aanet/pulu/kuitit/${era}.completed.json`);
    if (!kuitti.ok) throw new Error(`${era}: valmista kuittia ei löydy (HTTP ${kuitti.status})`);
    const { utterances = [] } = await kuitti.json();
    // Vain eleven_v4: v3-äänet ovat jo pelin tasossa, eikä niitä kosketa.
    rivit = utterances.filter((u) => u.model === 'eleven_v4' && u.finalObjectKey)
      .map((u) => [u.utteranceKey, u.finalObjectKey])
      .filter(([nimi]) => !pyydetyt.length || pyydetyt.includes(nimi));
  } else {
    rivit = Object.entries(LIVIAN_VERSIOIDUT_AANET)
      .filter(([, avain]) => V4_ERAT.some((e) => avain.includes(`/${e}/`)))
      .filter(([, avain]) => !avain.includes('/tasoitettu/'))
      .filter(([nimi]) => !pyydetyt.length || pyydetyt.includes(nimi));
  }
  if (!rivit.length) throw new Error('ei tasoitettavia (onko taulukko jo tasoitettu?)');
  const kansio = mkdtempSync(join(tmpdir(), 'tasoita-pulu-'));
  const kuitti = { tehty: new Date().toISOString(), tavoiteLufs: PULU_TASO_LUFS, limitteri: PULU_LIMITTERI, bittivirta: PULU_TASOITUS_BITTIVIRTA, rivit: [] };
  for (const [nimi, avain] of rivit) {
    const vastaus = await fetch(MEDIA + avain);
    if (!vastaus.ok) throw new Error(`${avain}: HTTP ${vastaus.status}`);
    const data = Buffer.from(await vastaus.arrayBuffer());
    const lahde = join(kansio, `${nimi}-lahde.mp3`);
    const kohde = join(kansio, `${nimi}.mp3`);
    writeFileSync(lahde, data);
    const ennen = mittaaLufs(lahde);
    const vahvistus = Math.round((PULU_TASO_LUFS - ennen) * 100) / 100;
    aja('ffmpeg', ['-y', '-v', 'error', '-i', lahde, '-af', `volume=${vahvistus}dB,alimiter=limit=${PULU_LIMITTERI}`,
      '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', PULU_TASOITUS_BITTIVIRTA, kohde]);
    const jalkeen = mittaaLufs(kohde);
    const uusi = tasoitettuAvain(avain);
    const rivi = { nimi, lahde: avain, lahdeSha256: sha(data), lufsEnnen: ennen, vahvistusDb: vahvistus, lufsJalkeen: jalkeen, kohde: uusi, kohdeSha256: sha(readFileSync(kohde)) };
    kuitti.rivit.push(rivi);
    console.log(`${nimi}: ${ennen.toFixed(1)} → ${jalkeen.toFixed(1)} LUFS (${vahvistus >= 0 ? '+' : ''}${vahvistus} dB) → ${uusi}`);
    if (kuiva) continue;
    const bucket = process.env.R2_BUCKET;
    r2(['cp', kohde, `s3://${bucket}/${uusi}`, '--content-type', 'audio/mpeg', '--cache-control', 'public, max-age=2592000']);
    const eleet = avain.replace(/\.mp3$/, '.eleet.json');
    if ((await fetch(MEDIA + eleet, { method: 'HEAD' })).ok) {
      r2(['cp', `s3://${bucket}/${eleet}`, `s3://${bucket}/${uusi.replace(/\.mp3$/, '.eleet.json')}`,
        '--content-type', 'application/json', '--cache-control', 'public, max-age=2592000']);
      rivi.eleet = uusi.replace(/\.mp3$/, '.eleet.json');
    }
    const tarkistus = await fetch(MEDIA + uusi, { method: 'HEAD' });
    if (!tarkistus.ok) throw new Error(`${uusi}: vienti ei näy (HTTP ${tarkistus.status})`);
  }
  const kuittiNimi = `aanet/pulu/kuitit/tasoitus-${kuitti.tehty.replace(/[:.]/g, '-')}.json`;
  const kuittiTiedosto = join(kansio, 'kuitti.json');
  writeFileSync(kuittiTiedosto, JSON.stringify(kuitti, null, 2));
  if (!kuiva) {
    r2(['cp', kuittiTiedosto, `s3://${process.env.R2_BUCKET}/${kuittiNimi}`, '--content-type', 'application/json']);
    console.log(`kuitti: ${kuittiNimi}`);
  }
  // Suoraan LIVIAN_VERSIOIDUT_AANET-tauluun liitettävät rivit.
  for (const r of kuitti.rivit) console.log(`  '${r.nimi}': '${r.kohde}',`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((virhe) => { console.error(virhe.message); process.exit(1); });
}
