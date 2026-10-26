// GET /opas/aineistot (6.10.2026): staattisten aineistojen indeksi natiiville (tiet, aanikartta); 404:n välimuistitus vältetään.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { OPAS_AINEISTOT } from '../tools/pollo/aineistot.js';
import { OPAS_SALLITUT } from '../tools/pollo/sallitut.js';

test('/opas/aineistot: listat ja lyhyt välimuisti; vieras origin 403', async () => {
  const env = { POLLO_ORIGINIT: 'https://matkakirja.app' };
  const v = await worker.fetch(new Request('https://pollo.example/opas/aineistot', { headers: { origin: 'https://matkakirja.app' } }), env, {});
  assert.equal(v.status, 200);
  assert.deepEqual(await v.json(), { ...OPAS_AINEISTOT, sallitut: OPAS_SALLITUT.sallitut, raja: [] });
  assert.equal(v.headers.get('cache-control'), 'public, max-age=300');
  assert.ok(Array.isArray(OPAS_AINEISTOT.tiet) && Array.isArray(OPAS_AINEISTOT.aanikartta));
  const vieras = await worker.fetch(new Request('https://pollo.example/opas/aineistot', { headers: { origin: 'https://evil.example' } }), env, {});
  assert.equal(vieras.status, 403);
});
