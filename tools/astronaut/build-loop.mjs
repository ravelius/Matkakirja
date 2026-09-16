/** One shared ambience, built from an already paid source; never generates audio. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { looppiLeikkaus, looppiSuodatin, tulkitseLoudnorm } from '../generoi-siirtymamusiikki.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const directory = resolve(root, 'media/astronaut');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const ffmpeg = args => execFileSync('ffmpeg', ['-hide_banner', '-y', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 8_000_000 });
const probe = file => JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', file], { encoding: 'utf8' }));
export function validateSourceUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.hostname !== 'storage.googleapis.com' || !url.pathname.startsWith('/xi-backend/database/workspace/') || !url.pathname.endsWith('/content.mp3')) throw Error('Not an ElevenLabs generated source');
  return url;
}

async function main() {
  const { spawnSync } = await import('node:child_process');
  const loudness = file => {
    const r = spawnSync('ffmpeg', ['-hide_banner', '-i', file, '-af', 'loudnorm=I=-30:TP=-3:LRA=11:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' });
    if (r.status !== 0) throw Error('ffmpeg measurement failed');
    const result = tulkitseLoudnorm(r.stderr);
    if (!result) throw Error('Missing loudness measurement');
    return result;
  };
  await mkdir(directory, { recursive: true });
  const sources = JSON.parse(await readFile(resolve(directory, 'source-downloads.json'), 'utf8'));
  const expected = JSON.parse(await readFile(resolve(root, 'tools/astronaut/ambient-manifest.json'), 'utf8'));
  if (sources.flow !== expected.flowId || sources.media.length !== expected.rawSources.length || new Set(sources.media.map(row => row.id)).size !== sources.media.length) throw Error('Unexpected source set');
  const raws = [];
  for (const source of sources.media) {
    const approved = expected.rawSources.find(row => row.generationId === source.id);
    if (!approved) throw Error('Unknown generated take');
    const file = resolve(directory, `raw-${source.id}.mp3`);
    let bytes;
    try { bytes = await readFile(file); } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const response = await fetch(validateSourceUrl(source.url), { redirect: 'error', signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw Error(`Source download HTTP ${response.status}`);
      bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 10000 || bytes.length > 10_000_000) throw Error('Source size invalid');
      if (sha(bytes) !== approved.sha256) throw Error('Source hash mismatch');
      await writeFile(file, bytes, { flag: 'wx' });
    }
    if (sha(bytes) !== approved.sha256) throw Error('Cached source hash mismatch');
    const info = probe(file);
    const duration = Number(info.format.duration);
    if (duration < 29 || duration > 31) throw Error('Source duration mismatch');
    const row = { generationId: source.id, file: `raw-${source.id}.mp3`, bytes: bytes.length, sha256: sha(bytes), duration, loudness: loudness(file) };
    raws.push(row);
    console.log(JSON.stringify(row));
  }
  const selected = raws.find(row => row.generationId === expected.selectedGenerationId);
  if (!selected) throw Error('Selected take is missing');
  const seam = looppiLeikkaus({ lahde: selected.duration, looppi: 28, risti: 1.5, vahin: 28 });
  const cycle = resolve(directory, 'cycle.wav');
  ffmpeg(['-i', resolve(directory, selected.file), '-filter_complex', looppiSuodatin(seam), '-map', '[ulos]', '-c:a', 'pcm_s24le', cycle]);
  const measured = loudness(cycle);
  const gainDb = Math.min(-30 - measured.taso, -3 - measured.huippu);
  const output = resolve(directory, 'astronautin-kamera-tausta.mp3');
  ffmpeg(['-stream_loop', '2', '-i', cycle, '-t', '84', '-af', `volume=${gainDb.toFixed(4)}dB`, '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', '-write_xing', '1', '-metadata', 'title=Astronautin kamera – yhteinen taustaääni', output]);
  const bytes = await readFile(output);
  const metrics = loudness(output);
  const info = probe(output);
  if (metrics.taso > -18 || metrics.huippu > -3 || Math.abs(Number(info.format.duration) - 84) > 0.1) throw Error('Audio QA failed');
  const pcm = execFileSync('ffmpeg', ['-v', 'error', '-i', output, '-f', 'f32le', '-ac', '1', '-ar', '44100', '-'], { maxBuffer: 20_000_000 });
  const samples = new Float32Array(pcm.buffer, pcm.byteOffset, pcm.byteLength / 4);
  const rms = part => Math.sqrt(part.reduce((sum, x) => sum + x*x, 0) / part.length);
  const n = 4410;
  const boundary = {
    stepDbfs: 20 * Math.log10(Math.max(1e-12, Math.abs(samples[0] - samples.at(-1)))),
    first100msRmsDbfs: 20 * Math.log10(rms(samples.subarray(0, n))),
    last100msRmsDbfs: 20 * Math.log10(rms(samples.subarray(-n))),
  };
  if (boundary.stepDbfs > -40 || Math.abs(boundary.first100msRmsDbfs - boundary.last100msRmsDbfs) > 6) throw Error('Loop boundary QA failed');
  const manifest = {
    schemaVersion: 1, id: 'astronautin-kamera-yhteinen-20260916', scope: 'one-background-for-the-entire-lens',
    flowId: sources.flow, model: 'eleven_text_to_sound_v2', prompt: sources.media[0].prompt,
    paidGenerationAlreadyCompleted: true, generatedTakes: raws.length, selectedGenerationId: selected.generationId,
    rawSources: raws, output: { file: 'astronautin-kamera-tausta.mp3', r2Key: 'matkakirja/aanet/linssit/astronautin-kamera-tausta.mp3', bytes: bytes.length, sha256: sha(bytes), duration: Number(info.format.duration), decodedDuration: samples.length / 44100, loudness: metrics, boundary },
    processing: { type: 'fixed-gain-crossfaded-loop', seam, repeatedCycles: 3, gainDb, targetLufs: -30, bakedStartOrEndFade: false },
    playback: { loop: true, fadeInSeconds: 2, fadeInOnlyAtLensEntry: true, restartOnTargetChange: false, gainMustRespectMuteAndBackgroundPreference: true, stopOnLensExit: true, useDecodedAudioBufferForGaplessLoop: true },
    review: { signalChecksPassed: true, subjectiveListening: 'pending-owner-or-Fable-listening', gameIntegration: 'Fable-owned-not-in-this-PR' },
  };
  await writeFile(resolve(directory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ output: manifest.output, processing: manifest.processing }, null, 2));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
