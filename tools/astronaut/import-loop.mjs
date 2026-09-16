/** Import already paid, hash-pinned takes. No ElevenLabs API key or generation call. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSourceUrl } from './build-loop.mjs';
import { exactTransfer } from './exact-transfer.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const directory = resolve(root, 'media/astronaut');
const origin = 'https://media.matkakirja.app/';
const archive = 'matkakirja/aanet/linssit/astronautin-kamera/20260916/';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const expected = JSON.parse(await readFile(resolve(root, 'tools/astronaut/ambient-manifest.json'), 'utf8'));
if (process.env.ASTRONAUT_FINAL_COUNT !== '1') throw Error('Exactly one shared final ambience is allowed');
for (const name of ['R2_ACCOUNT_ID', 'R2_BUCKET', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']) {
  if (!process.env[name]) throw Error(`Missing ${name}`);
}
const source = JSON.parse(process.env.ASTRONAUT_SOURCES_JSON || '{}');
if (source.exactTransfer) {
  if (source.flow !== expected.flowId) throw Error('Unexpected flow');
  await exactTransfer({ source, expected, directory });
  process.exit(0);
}
if (source.flow !== expected.flowId || !Array.isArray(source.media) || source.media.length !== expected.rawSources.length || new Set(source.media.map(row => row.id)).size !== source.media.length) throw Error('Unexpected source set');
for (const row of source.media) {
  validateSourceUrl(row.url);
  if (!expected.rawSources.some(allowed => allowed.generationId === row.id)) throw Error('Unknown source');
  // GitHub masks short-lived signed download URLs; never print them otherwise.
  if (process.env.GITHUB_ACTIONS === 'true') console.log(`::add-mask::${row.url}`);
}
await mkdir(directory, { recursive: true });
await writeFile(resolve(directory, 'source-downloads.json'), JSON.stringify(source));
execFileSync(process.execPath, [resolve(root, 'tools/astronaut/build-loop.mjs')], { cwd: root, stdio: 'inherit' });
const manifest = JSON.parse(await readFile(resolve(directory, 'manifest.json'), 'utf8'));
const files = [
  ...manifest.rawSources.map(row => ({ file: row.file, key: archive + row.file, sha256: row.sha256, type: 'audio/mpeg' })),
  { file: manifest.output.file, key: archive + manifest.output.sha256 + '.mp3', sha256: manifest.output.sha256, type: 'audio/mpeg' },
  { file: manifest.output.file, key: manifest.output.r2Key, sha256: manifest.output.sha256, type: 'audio/mpeg' },
];
manifest.output.url = origin + manifest.output.r2Key;
manifest.output.versionedUrl = origin + archive + manifest.output.sha256 + '.mp3';
for (const row of manifest.rawSources) row.url = origin + archive + row.file;
await writeFile(resolve(directory, 'delivery-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
files.push({ file: 'delivery-manifest.json', key: archive + 'manifest.json', sha256: sha(await readFile(resolve(directory, 'delivery-manifest.json'))), type: 'application/json' });

async function existing(file) {
  const r = await fetch(origin + file.key + '?verify=' + Date.now(), { headers: { Origin: 'https://matkakirja.app' }, redirect: 'error', signal: AbortSignal.timeout(30000) });
  if (r.status === 404) return false;
  if (!r.ok) throw Error(`Readback HTTP ${r.status}`);
  if (!r.headers.get('content-type')?.startsWith(file.type)) throw Error(`Wrong MIME type: ${file.key}`);
  if (!['*', 'https://matkakirja.app'].includes(r.headers.get('access-control-allow-origin'))) throw Error(`Missing game CORS access: ${file.key}`);
  if (sha(Buffer.from(await r.arrayBuffer())) !== file.sha256) throw Error(`Existing object differs: ${file.key}; not overwriting`);
  return true;
}
// Check ALL destinations first: never replace an earlier, different recording.
const missing = [];
for (const file of files) {
  if (sha(await readFile(resolve(directory, file.file))) !== file.sha256) throw Error('Local file changed');
  if (!await existing(file)) missing.push(file);
}
for (const file of missing) {
  execFileSync('aws', ['s3', 'cp', resolve(directory, file.file), `s3://${process.env.R2_BUCKET}/${file.key}`, '--endpoint-url', `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, '--content-type', file.type, '--cache-control', file.key === manifest.output.r2Key ? 'public,max-age=3600' : 'public,max-age=31536000,immutable', '--only-show-errors'], { stdio: ['ignore', 'pipe', 'pipe'] });
}
for (const file of files) {
  if (!await existing(file)) throw Error(`Object still missing after upload: ${file.key}`);
  console.log(`Verified ${file.key} (${file.sha256})`);
}
const range = await fetch(manifest.output.url + '?range-check=' + Date.now(), { headers: { Range: 'bytes=0-15', Origin: 'https://matkakirja.app' }, redirect: 'error', signal: AbortSignal.timeout(30000) });
if (range.status !== 206 || !range.headers.get('content-range')?.startsWith('bytes 0-15/') || (await range.arrayBuffer()).byteLength !== 16) throw Error('Audio byte-range playback check failed');
console.log(`One shared background ready: ${manifest.output.url}; ${manifest.output.duration}s; ${manifest.output.loudness.taso} LUFS. No generation calls.`);
