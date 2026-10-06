#!/usr/bin/env node
/*
 * SILTALAUSEET v2 (Päätoimittaja 7.10.2026; LS1 OpasSiltalauseet.EiSallittu): v1 on ämpärissä muuttumaton, joten v2 =
 * v1:n ryhmät sellaisinaan (url:t v1:een) + uusi ryhmä "ei-sallittu". Uudet lauseet kuten v1: William, eleven_v4,
 * oletusvakaus, style 0, yksi otto per lause, pcm_44100 → reunahiljaisuus pois → RMS -17,2 dB + alimiter 0,97 → mp3 192k kerran.
 * Käyttö: source ~/.zshrc; node tools/opas/tee-siltalauseet-v2.mjs --ulos <_valmiit/opas-siltalauseet-vienti-pvm> --tyo <kansio>
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const ULOS = arg('ulos'), TYO = arg('tyo'), AANI = 'oae6GCCzwoEbfc5FHdEu', JUURI = 'https://media.matkakirja.app/aanet/opas/siltalauseet-v2/';
const UUDET = [
  'Sitä kaupunkia ei ole vielä kuvattu tarpeeksi tarkasti. Valitse kohde listasta.',
  'Sinne en vielä vie, koska kartta ei ole siellä tarpeeksi tarkka. Valitse listasta.',
  'Sitä paikkaa ei voi vielä näyttää kunnolla. Katso kohteet listasta.',
  'Kartta ei vielä yllä sinne asti. Valitse jokin listan kohteista.',
];
const v1 = await fetch(`https://media.matkakirja.app/aanet/opas/siltalauseet-v1/siltalauseet.json?t=${Date.now()}`).then((r) => r.json());
mkdirSync(join(ULOS, 'aanet/opas/siltalauseet-v2'), { recursive: true }); mkdirSync(TYO, { recursive: true });
const ff = (a, input) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...a], { input, maxBuffer: 1 << 30 });
const rivit = [];
for (const [i, teksti] of UUDET.entries()) {
  const id = `ei-sallittu-${String(i + 1).padStart(2, '0')}`;
  const raaka = join(TYO, `${id}.wav`);
  if (!existsSync(raaka)) { // yksi otto: tallennettu raaka käytetään uudelleen
    const v = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AANI}?output_format=pcm_44100`, { method: 'POST',
      headers: { 'content-type': 'application/json', 'xi-api-key': process.env.ELEVEN_API_KEY },
      body: JSON.stringify({ text: teksti, model_id: 'eleven_v4', language_code: 'fi', voice_settings: { style: 0 } }) });
    if (!v.ok) throw new Error(`ElevenLabs ${v.status}`);
    ff(['-f', 's16le', '-ar', '44100', '-ac', '1', '-i', '-', raaka + '.osa.wav'], Buffer.from(await v.arrayBuffer()));
    renameSync(raaka + '.osa.wav', raaka);
  }
  const leikattu = join(TYO, `${id}-l.wav`);
  ff(['-i', raaka, '-af', 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1,areverse', leikattu]);
  const keski = Number((/mean_volume:\s*(-?[\d.]+) dB/.exec(spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', leikattu, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr) ?? [])[1]);
  const mp3 = join(ULOS, 'aanet/opas/siltalauseet-v2', `${id}.mp3`);
  ff(['-i', leikattu, '-af', `volume=${(-17.2 - keski).toFixed(2)}dB,alimiter=limit=0.97:level=false:latency=1`, '-c:a', 'libmp3lame', '-b:a', '192k', mp3]);
  const mit = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', mp3, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const kesto = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3], { encoding: 'utf8' }));
  const r = { id, teksti, kesto_s: Math.round(kesto * 100) / 100, url: `${JUURI}${id}.mp3` };
  rivit.push({ ...r, taso: /mean_volume:\s*(-?[\d.]+)/.exec(mit)[1], huippu: /max_volume:\s*(-?[\d.]+)/.exec(mit)[1] });
  console.log(id, r.kesto_s, 's');
}
const v2 = { ...v1, versio: 2, ryhmat: { ...v1.ryhmat, 'ei-sallittu': rivit.map(({ taso, huippu, ...x }) => x) } };
writeFileSync(join(ULOS, 'aanet/opas/siltalauseet-v2/siltalauseet.json'), JSON.stringify(v2, null, 1));
writeFileSync(join(ULOS, 'LAHTEET.md'), `# Elävän oppaan siltalauseet v2 (Pelikoodari 7.10.2026)\n\nLisenssi: oma tuotanto (Matkakirja). v2 = v1:n ryhmät (ääni v1:ssä) + ryhmä ei-sallittu (Päätoimittaja hyväksyi tekstit 7.10.). Ääni ElevenLabs William (voice_id ${AANI}), eleven_v4, oletusvakaus, style 0, yksi otto per lause, pcm_44100 → reunahiljaisuus pois → −17,2 dB + alimiter 0,97 → mp3 192k kerran.\n\n| id | kesto | taso | huippu | teksti |\n|---|---|---|---|---|\n${rivit.map((r) => `| ${r.id} | ${r.kesto_s} s | ${r.taso} dB | ${r.huippu} dB | ${r.teksti} |`).join('\n')}\n`);
const sums = execFileSync('/bin/zsh', ['-c', `cd ${ULOS} && find aanet -type f | sort | xargs shasum -a 256`], { encoding: 'utf8' });
writeFileSync(join(ULOS, 'SHA256SUMS'), sums);
console.log('valmis', ULOS, createHash('sha256').update(sums).digest('hex').slice(0, 8));
