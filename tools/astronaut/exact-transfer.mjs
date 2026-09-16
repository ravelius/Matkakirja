/** Transfer the owner's exact MP3. API credentials never leave Actions. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash, randomBytes, createCipheriv, publicEncrypt, createPublicKey } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

export const rejectedImportHash = '5a9b3db4ab43d459727aec2379eeb7ebf788403964ef7e14435deabf1a5f9531';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const origin = 'https://media.matkakirja.app/';
const archive = 'matkakirja/aanet/linssit/astronautin-kamera/20260916/';

export function sealTransfer(value, publicKey) {
  const parsed = createPublicKey(publicKey);
  if (parsed.asymmetricKeyType !== 'rsa' || parsed.asymmetricKeyDetails.modulusLength < 3072) throw Error('RSA transfer key too weak');
  const key = randomBytes(32), iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return {
    key: publicEncrypt({ key: parsed, oaepHash: 'sha256' }, key).toString('base64'),
    iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: data.toString('base64'),
  };
}

export async function exactTransfer({ source, expected, directory }) {
  if (expected.output.sha256 !== expected.review.ownerApproval?.sha256) throw Error('No exact owner-approved output');
  if (!['prepare', 'finalize'].includes(source.exactTransfer?.mode)) throw Error('Unknown transfer mode');
  await mkdir(directory, { recursive: true });
  const sdk = resolve(directory, 'upload-sdk');
  execFileSync('npm', ['install', '--prefix', sdk, '--no-save', '--ignore-scripts', '--no-audit', '--no-fund', '@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'], { stdio: ['ignore', 'pipe', 'pipe'] });
  const require = createRequire(import.meta.url);
  const { S3Client, PutObjectCommand, GetObjectCommand } = require(require.resolve('@aws-sdk/client-s3', { paths: [sdk] }));
  const { getSignedUrl } = require(require.resolve('@aws-sdk/s3-request-presigner', { paths: [sdk] }));
  const client = new S3Client({ region: 'auto', endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, forcePathStyle: true, requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } });
  const bucket = process.env.R2_BUCKET;
  const finalKey = archive + expected.output.sha256 + '.mp3';
  const get = async key => {
    try { const r = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key })); return Buffer.from(await r.Body.transformToByteArray()); }
    catch (e) { if (e.$metadata?.httpStatusCode === 404) return null; throw Error('R2 object read failed'); }
  };
  const put = async (key, body, type, immutable = true) => client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: type, CacheControl: immutable ? 'public,max-age=31536000,immutable' : 'public,max-age=3600' }));
  if (source.exactTransfer.mode === 'prepare') {
    const previous = await get(finalKey);
    if (previous && sha(previous) !== expected.output.sha256) throw Error('Versioned key already differs');
    if (previous) { console.log('Exact approved MP3 is already uploaded. Run finalize.'); return; }
    // Only this content-addressed object, only PUT, 15 minutes, pinned SHA and size.
    const headers = { 'content-type': 'audio/mpeg', 'content-length': String(expected.output.bytes), 'cache-control': 'public,max-age=31536000,immutable', 'x-amz-checksum-sha256': Buffer.from(expected.output.sha256, 'hex').toString('base64') };
    const url = await getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: finalKey, ContentType: headers['content-type'], ContentLength: expected.output.bytes, ChecksumSHA256: headers['x-amz-checksum-sha256'], CacheControl: 'public,max-age=31536000,immutable' }), { expiresIn: 900, signableHeaders: new Set(['content-type', 'content-length']), unhoistableHeaders: new Set(['x-amz-checksum-sha256']) });
    // The capability is encrypted to the local temporary public key, not logged in clear.
    const sealed = sealTransfer({ url, headers, sha256: expected.output.sha256, bytes: expected.output.bytes }, source.exactTransfer.publicKey);
    console.log('ASTRONAUT_SEALED_TRANSFER=' + Buffer.from(JSON.stringify(sealed)).toString('base64'));
    return;
  }
  const bytes = await get(finalKey);
  if (!bytes || sha(bytes) !== expected.output.sha256 || bytes.length !== expected.output.bytes) throw Error('Exact approved upload missing or mismatched');
  for (const raw of expected.rawSources) {
    const b = await get(archive + raw.file);
    if (!b || sha(b) !== raw.sha256) throw Error('Archived source missing or mismatched');
  }
  const previousAudio = await get(expected.output.r2Key);
  if (previousAudio && ![expected.output.sha256, rejectedImportHash].includes(sha(previousAudio))) throw Error('Unrecognized audio exists: not overwriting');
  const previousManifest = await get(archive + 'manifest.json');
  if (previousManifest) {
    const parsed = JSON.parse(previousManifest);
    if (![expected.output.sha256, rejectedImportHash].includes(parsed.output?.sha256)) throw Error('Unrecognized manifest exists: not overwriting');
    const savedKey = archive + 'receipts/' + sha(previousManifest) + '.json';
    const saved = await get(savedKey);
    if (saved && !saved.equals(previousManifest)) throw Error('Receipt archive collision');
    if (!saved) await put(savedKey, previousManifest, 'application/json');
  }
  const manifest = structuredClone(expected);
  manifest.output.url = origin + expected.output.r2Key;
  manifest.output.versionedUrl = origin + finalKey;
  for (const raw of manifest.rawSources) raw.url = origin + archive + raw.file;
  manifest.transfer = { kind: 'exact-owner-approved-bytes', rejectedImportHash, previousVersionRetained: true };
  if (!previousAudio || !previousAudio.equals(bytes)) await put(expected.output.r2Key, bytes, 'audio/mpeg', false);
  const manifestBytes = Buffer.from(JSON.stringify(manifest, null, 2) + '\n');
  await put(archive + 'manifest.json', manifestBytes, 'application/json', false);
  for (const [key, expectedBytes, type] of [[finalKey, bytes, 'audio/mpeg'], [expected.output.r2Key, bytes, 'audio/mpeg'], [archive + 'manifest.json', manifestBytes, 'application/json']]) {
    const r = await fetch(origin + key + '?exact=' + Date.now(), { headers: { Origin: 'https://matkakirja.app' }, redirect: 'error', signal: AbortSignal.timeout(30000) });
    if (!r.ok || !r.headers.get('content-type')?.startsWith(type) || !['*', 'https://matkakirja.app'].includes(r.headers.get('access-control-allow-origin')) || !Buffer.from(await r.arrayBuffer()).equals(expectedBytes)) throw Error('Public exact-byte readback failed');
  }
  const range = await fetch(manifest.output.url + '?range=' + Date.now(), { headers: { Range: 'bytes=0-15', Origin: 'https://matkakirja.app' }, redirect: 'error', signal: AbortSignal.timeout(30000) });
  if (range.status !== 206 || range.headers.get('content-range') !== `bytes 0-15/${bytes.length}` || (await range.arrayBuffer()).byteLength !== 16) throw Error('Byte range check failed');
  await writeFile(resolve(directory, 'exact-delivery-manifest.json'), manifestBytes);
  console.log(JSON.stringify({ status: 'exact-approved-file-verified', url: manifest.output.url, versionedUrl: manifest.output.versionedUrl, bytes: bytes.length, sha256: sha(bytes), range: 206 }));
}
