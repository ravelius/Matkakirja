import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateSourceUrl, reviewForOutput } from '../tools/astronaut/build-loop.mjs';

const manifest = JSON.parse(readFileSync(new URL('../tools/astronaut/ambient-manifest.json', import.meta.url)));
test('astronaut ambience is one shared, quiet, gapless-loop-ready recording', () => {
  assert.equal(manifest.scope, 'one-background-for-the-entire-lens');
  assert.ok(manifest.output.duration >= 60 && manifest.output.duration <= 120);
  assert.ok(manifest.output.loudness.taso <= -18);
  assert.ok(manifest.output.loudness.huippu < -3);
  assert.ok(manifest.output.boundary.stepDbfs < -40);
  assert.equal(manifest.playback.restartOnTargetChange, false);
  assert.equal(manifest.playback.fadeInSeconds, 2);
  assert.equal(manifest.playback.stopOnLensExit, true);
  assert.equal(manifest.processing.bakedStartOrEndFade, false);
  assert.equal(manifest.output.r2Key, 'matkakirja/aanet/linssit/astronautin-kamera-tausta.mp3');
  assert.ok(manifest.rawSources.some(row => row.generationId === manifest.selectedGenerationId));
  assert.ok(manifest.rawSources.every(row => /^[a-f0-9]{64}$/.test(row.sha256)));
});
test('source importer accepts only ElevenLabs generated media URLs', () => {
  assert.ok(validateSourceUrl('https://storage.googleapis.com/xi-backend/database/workspace/test/content.mp3?signature=temporary'));
  for (const value of ['http://storage.googleapis.com/xi-backend/database/workspace/test/content.mp3', 'https://evil.example/content.mp3', 'file:///etc/passwd', 'https://storage.googleapis.com/other/content.mp3']) assert.throws(() => validateSourceUrl(value));
});
test('owner listening approval is preserved only for the exact approved output', () => {
  assert.equal(manifest.review.subjectiveListening, 'owner-approved');
  assert.equal(manifest.review.ownerApproval.sha256, manifest.output.sha256);
  assert.equal(reviewForOutput(manifest, manifest.output.sha256).subjectiveListening, 'owner-approved');
  const changed = reviewForOutput(manifest, 'different-output');
  assert.equal(changed.subjectiveListening, 'pending-owner-or-Fable-listening');
  assert.deepEqual(changed.ownerApproval, manifest.review.ownerApproval);
  assert.notEqual(changed.ownerApproval, manifest.review.ownerApproval);
  assert.equal(reviewForOutput({}, manifest.output.sha256).subjectiveListening, 'pending-owner-or-Fable-listening');
});
test('import branch never receives a generation API key and requires one final', () => {
  const script = readFileSync(new URL('../tools/astronaut/import-loop.mjs', import.meta.url), 'utf8');
  assert.match(script, /ASTRONAUT_FINAL_COUNT !== '1'/);
  assert.match(script, /not overwriting/);
  assert.doesNotMatch(script, /process\.env\.ELEVEN_API_KEY|api\.elevenlabs\.io/);
  const workflow = readFileSync(new URL('../tools/astronaut/generoi-tehosteet.yml.proposed', import.meta.url), 'utf8');
  assert.match(workflow, /generoi:\s+if: inputs\.laji == 'kohahdus'/);
  const importJob = workflow.slice(workflow.indexOf('\n  astronautin-kamera-tuonti:'));
  assert.doesNotMatch(importJob, /ELEVEN_API_KEY|generoi-tehosteet\.mjs/);
});
