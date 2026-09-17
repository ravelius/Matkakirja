/** Owner's 16 September Arabia-only edit. No TTS, alignment API or API key. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { IHMISEN_MATKA_KERTOMUS } from '../../js/linssit/ihmisen-matka-kertomus.js';
import { kertomuksenJasennys } from '../generoi-linssiluennat.mjs';

export const ID = 'arabia-simpukkalause-pois-20260916';
export const CUT = { start: 110600, end: 117800, removed: 7200 };
export const ROOT = 'aikajana/ihmisen-matka/puhe/';
const ORIGIN = 'https://media.matkakirja.app/';
const ARCHIVE = `${ROOT}korjaukset/${ID}/`;
export const SOURCES = [
  { file: 'ihmisen-matka-kertomus.mp3', sha256: '63bb9142a49a04074bd6bf7df8c4d7447fcac67ad3e16e166f94c86aeeea456b', type: 'audio/mpeg' },
  { file: 'kertomus-manifesti.json', sha256: '98e7c96efd5b6c452d728dec0b45f5565807078f4683b64913c13e97aac1c34e', type: 'application/json' },
  { file: 'ihmisen-matka-kertomus-arabia.mp3', sha256: 'a686b0406b13ecc79c651b65bf2998ed2e66b2bd6b0e5e71d25af291595f0296', type: 'audio/mpeg' },
];
const sha = b => createHash('sha256').update(b).digest('hex');
const json = x => Buffer.from(JSON.stringify(x, null, 2) + '\n');
const spoken = kertomuksenJasennys(IHMISEN_MATKA_KERTOMUS.map(x => ({ avain: x.id, teksti: x.teksti, puhe: x.luenta })), { tagit: false });
const command = (name, args, encoding = 'utf8') => execFileSync(name, args, { encoding, maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
const probe = path => JSON.parse(command('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,sample_rate,channels,bit_rate', '-of', 'json', path]));

export function correctedManifest(original, duration, audioFile) {
  assert.equal(original.yhtena, true);
  assert.equal(original.jaksot.length, 21);
  assert.equal(original.malli, 'eleven_v3');
  const out = structuredClone(original);
  const shift = t => t >= CUT.end ? t - CUT.removed : t;
  const removed = [];
  out.jaksot = original.jaksot.map(row => {
    const keep = row.sanat.filter(word => {
      if (word.alku >= CUT.start && word.alku < CUT.end) { removed.push(word.sana); return false; }
      return true;
    });
    const expected = spoken.jaksot.find(x => x.tunnus === row.tunnus);
    assert.ok(expected, `Unknown section ${row.tunnus}`);
    assert.deepEqual(keep.map(x => x.sana), expected.sanat.map(x => x.sana), `Spoken words differ: ${row.tunnus}`);
    const next = { ...row, alku: shift(row.alku), loppu: shift(row.loppu),
      sanat: keep.map(x => ({ ...x, alku: shift(x.alku) })),
      lauseet: row.lauseet.filter(t => t < CUT.start || t >= CUT.end).map(shift) };
    assert.equal(next.lauseet.length, expected.lauseet.length, `Sentence count: ${row.tunnus}`);
    assert.ok(next.alku >= 0 && next.loppu > next.alku && next.loppu <= duration * 1000 + 30);
    for (let i = 0; i < next.sanat.length; i++) {
      assert.ok(next.sanat[i].alku >= next.alku && next.sanat[i].alku < next.loppu);
      if (i) assert.ok(next.sanat[i].alku >= next.sanat[i - 1].alku);
    }
    return next;
  });
  assert.deepEqual(removed, 'Etelän rannikolla ehdittiin hioa okraa punaiseksi ja pujotella simpukankuoria helmiksi'.split(' '));
  for (let i = 1; i < out.jaksot.length; i++) assert.ok(out.jaksot[i].alku >= out.jaksot[i - 1].loppu);
  Object.assign(out, { paivitetty: '2026-09-16', tiedosto: audioFile, kesto: Number(duration.toFixed(2)), merkkeja: spoken.teksti.length,
    korjaus: { id: ID, sourceAudioSha256: SOURCES[0].sha256, sourceManifestSha256: SOURCES[1].sha256,
      removedMs: CUT.removed, originalCutMs: [CUT.start, CUT.end], synthesizedCharacters: 0,
      method: 'existing-performance-silence-splice', alignment: 'original-forced-alignment-shifted-by-exact-cut',
      note: 'Only Arabia words removed; other performances retained. New MP3 encode, not new speech.' } });
  return out;
}

async function get(key) {
  const r = await fetch(ORIGIN + key + '?arabia=' + Date.now(), { headers: { Origin: 'https://matkakirja.app' }, signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw Error(`Public read failed: ${r.status} ${key}`);
  return Buffer.from(await r.arrayBuffer());
}
async function checkedSource(source, directory) {
  const path = resolve(directory, 'original-' + source.file);
  let bytes;
  try { bytes = await readFile(path); } catch { bytes = await get(ROOT + source.file); }
  assert.equal(sha(bytes), source.sha256, `Source changed: ${source.file}; stop, do not overwrite`);
  await writeFile(path, bytes);
  return { ...source, bytes, path };
}
function pcm(path) { return command('ffmpeg', ['-v', 'error', '-i', path, '-f', 's16le', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '1', '-'], 'buffer'); }
function loudness(path) {
  // ffmpeg writes analysis on stderr; spawnSync keeps it without showing secrets/log noise.
  const result = runAnalysis(path);
  const block = result.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0];
  assert.ok(block, 'Missing loudness analysis');
  const data = JSON.parse(block);
  return { integratedLufs: Number(data.input_i), truePeakDb: Number(data.input_tp), rangeLu: Number(data.input_lra) };
}
function runAnalysis(path) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', path, '-af', 'loudnorm=I=-17:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' });
  assert.equal(r.status, 0, 'ffmpeg analysis failed');
  return r.stderr;
}

export async function build(directory) {
  await mkdir(directory, { recursive: true });
  const sources = await Promise.all(SOURCES.map(s => checkedSource(s, directory)));
  const original = JSON.parse(sources[1].bytes);
  const wav = resolve(directory, 'edited-master.wav');
  const audio = resolve(directory, SOURCES[0].file);
  const fallback = resolve(directory, SOURCES[2].file);
  const filter = '[0:a]asplit=2[a][b];[a]atrim=end=110.60,asetpts=PTS-STARTPTS,afade=t=out:st=110.595:d=0.005[a1];[b]atrim=start=117.80,asetpts=PTS-STARTPTS,afade=t=in:d=0.005[b1];[a1][b1]concat=n=2:v=0:a=1[out]';
  command('ffmpeg', ['-v', 'error', '-y', '-i', sources[0].path, '-filter_complex', filter, '-map', '[out]', '-c:a', 'pcm_s16le', wav]);
  const originalPcm = pcm(sources[0].path), editedPcm = pcm(wav);
  const cutByte = ms => Math.round(ms * 44.1) * 2;
  assert.equal(originalPcm.length - editedPcm.length, cutByte(CUT.removed));
  // Every decoded sample outside the two 5ms silence fades is unchanged.
  assert.ok(originalPcm.subarray(0, cutByte(CUT.start - 5)).equals(editedPcm.subarray(0, cutByte(CUT.start - 5))), 'Prefix PCM changed');
  assert.ok(originalPcm.subarray(cutByte(CUT.end + 5)).equals(editedPcm.subarray(cutByte(CUT.start + 5))), 'Suffix PCM changed');
  for (const center of [CUT.start, CUT.end]) {
    const window = originalPcm.subarray(cutByte(center - 5), cutByte(center + 5));
    let peak = 0;
    for (let p = 0; p < window.length; p += 2) peak = Math.max(peak, Math.abs(window.readInt16LE(p)) / 32768);
    assert.ok(peak < 10 ** (-45 / 20), 'Cut is not in silence');
  }
  command('ffmpeg', ['-v', 'error', '-y', '-i', wav, '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', '-ac', '1', '-map_metadata', '-1', audio]);
  const info = probe(audio), duration = Number(info.format.duration);
  assert.equal(info.streams[0].sample_rate, '44100');
  assert.equal(info.streams[0].channels, 1);
  assert.equal(info.streams[0].bit_rate, '128000');
  assert.ok(Math.abs(duration - (originalPcm.length / 88200 - 7.2)) < 0.06);
  const audioBytes = await readFile(audio), audioSha = sha(audioBytes);
  const versionedFile = `ihmisen-matka-kertomus-${ID}-${audioSha.slice(0, 12)}.mp3`;
  const manifest = correctedManifest(original, duration, versionedFile);
  const arabia = manifest.jaksot.find(x => x.tunnus === 'arabia');
  const from = (arabia.alku - 150) / 1000, to = arabia.loppu / 1000;
  command('ffmpeg', ['-v', 'error', '-y', '-i', wav, '-af', `atrim=start=${from}:end=${to},asetpts=PTS-STARTPTS`, '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', '-ac', '1', '-map_metadata', '-1', fallback]);
  const manifestPath = resolve(directory, SOURCES[1].file);
  await writeFile(manifestPath, json(manifest));
  const files = [];
  for (const [path, key, type] of [[audio, ROOT + versionedFile, 'audio/mpeg'], [fallback, ROOT + SOURCES[2].file, 'audio/mpeg'], [manifestPath, ROOT + SOURCES[1].file, 'application/json']]) {
    const bytes = await readFile(path);
    files.push({ path, key, type, sha256: sha(bytes), bytes: bytes.length, ...(type === 'audio/mpeg' ? { duration: Number(probe(path).format.duration) } : {}) });
  }
  const levels = { before: loudness(sources[0].path), after: loudness(audio) };
  assert.ok(Math.abs(levels.before.integratedLufs - levels.after.integratedLufs) < 0.6, 'Unexpected volume change');
  const receipt = { id: ID, status: 'locally-built-not-uploaded', synthesizedCharacters: 0, paidCalls: 0, cut: CUT,
    sourceCommit: command('git', ['rev-parse', 'HEAD']).trim(), sources: SOURCES, files,
    preservedSections: 20, checkedSections: 21, pcmUnchangedOutsideSilenceSplice: true,
    arabia: { text: IHMISEN_MATKA_KERTOMUS.find(x => x.id === 'arabia').teksti, sentenceStartsMs: arabia.lauseet, wordCount: arabia.sanat.length },
    levels, listening: 'Not human-listened; exact original words and PCM retention checked. Listen to the comma join before release.' };
  await writeFile(resolve(directory, 'receipt.json'), json(receipt));
  return { receipt, sources, files };
}

// This deliberately stages immutable objects only. Fable activates the exact manifest
// and legacy aliases at release time, after listening. No live object is overwritten.
export async function stage({ receipt, sources, files }, directory) {
  for (const name of ['R2_ACCOUNT_ID', 'R2_BUCKET', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']) assert.ok(process.env[name], `Missing ${name}`);
  const put = async (path, key, type) => {
    assert.ok(key.startsWith(ARCHIVE) || key === files[0].key, 'Outside allowed staging prefix');
    const localBytes = await readFile(path);
    const existing = await fetch(ORIGIN + key + '?existing=' + Date.now(), { signal: AbortSignal.timeout(30000) });
    if (existing.ok) {
      assert.equal(sha(Buffer.from(await existing.arrayBuffer())), sha(localBytes), 'Immutable object already differs; stopping');
      return;
    }
    assert.equal(existing.status, 404, 'Could not check existing staged object');
    try {
      command('aws', ['s3', 'cp', path, `s3://${process.env.R2_BUCKET}/${key}`, '--endpoint-url', `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, '--content-type', type, '--cache-control', 'public,max-age=31536000,immutable', '--only-show-errors']);
    } catch { throw Error(`R2 staging failed: ${key}`); }
    assert.equal(sha(await get(key)), sha(localBytes), 'Staged bytes did not read back');
  };
  // Stop if another editor has changed ANY live input before staging.
  for (const source of SOURCES) assert.equal(sha(await get(ROOT + source.file)), source.sha256, `Live input changed: ${source.file}`);
  for (const source of sources) await put(source.path, ARCHIVE + `original-${source.sha256}-${source.file}`, source.type);
  const deliveries = [];
  for (const file of files) {
    const key = file === files[0] ? file.key : ARCHIVE + `${file.sha256}-${file.key.split('/').at(-1)}`;
    await put(file.path, key, file.type);
    const { path: localPath, ...publicFile } = file;
    if (file.type === 'audio/mpeg') {
      const r = await fetch(ORIGIN + key + '?range=' + Date.now(), {
        headers: { Range: 'bytes=0-15', Origin: 'https://matkakirja.app' }, signal: AbortSignal.timeout(30000),
      });
      assert.equal(r.status, 206, 'Range playback failed');
      assert.equal(r.headers.get('content-range'), `bytes 0-15/${file.bytes}`);
      assert.ok(r.headers.get('content-type')?.startsWith('audio/mpeg'));
      assert.ok(['*', 'https://matkakirja.app'].includes(r.headers.get('access-control-allow-origin')), 'Missing game CORS');
      assert.equal((await r.arrayBuffer()).byteLength, 16);
    }
    deliveries.push({ ...publicFile, stagedKey: key, stagedUrl: ORIGIN + key });
  }
  const staged = { ...receipt, status: 'staged-verified-not-activated', files: deliveries };
  const path = resolve(directory, 'delivery-receipt.json');
  await writeFile(path, json(staged));
  await put(path, ARCHIVE + sha(json(staged)) + '-receipt.json', 'application/json');
  return staged;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const flags = process.argv.slice(2);
  assert.ok(flags.every(x => ['--stage'].includes(x)), 'Only optional --stage is supported');
  const directory = resolve(dirname(fileURLToPath(import.meta.url)), '../../media/arabia-simpukkalause-pois-20260916');
  const result = await build(directory);
  console.log(JSON.stringify(flags.includes('--stage') ? await stage(result, directory) : result.receipt, null, 2));
}
