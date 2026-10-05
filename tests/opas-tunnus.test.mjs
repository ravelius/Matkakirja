// GET /opas/tunnus (Päätoimittaja / Linssiseppä 5.10.2026, juna 144): rajattu Cesium ion -tunnus vain natiiville,
// ei välimuistiin; ilman salaisuutta 503.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';

const hae = (otsakkeet, env) => worker.fetch(new Request('https://pollo.example/opas/tunnus', { headers: otsakkeet }), env, {});
const NATIIVI = { 'x-matkakirja-natiivi': 'fi.matkakirja.peli', 'user-agent': 'Matkakirja/1.0 fi.matkakirja.peli' };

test('/opas/tunnus: natiiville tunnus no-store, selaimelle ja tuntemattomalle 403, ilman salaisuutta 503', async () => {
  const v = await hae(NATIIVI, { CESIUM_ION_TOKEN: 'rajattu' });
  assert.equal(v.status, 200);
  assert.deepEqual(await v.json(), { tunnus: 'rajattu' });
  assert.equal(v.headers.get('cache-control'), 'no-store');
  assert.equal((await hae({ ...NATIIVI, origin: 'https://matkakirja.app' }, { CESIUM_ION_TOKEN: 'rajattu' })).status, 403, 'ei selaimelle');
  assert.equal((await hae({ 'x-matkakirja-natiivi': 'fi.matkakirja.peli' }, { CESIUM_ION_TOKEN: 'rajattu' })).status, 403, 'UA puuttuu');
  assert.equal((await hae({}, { CESIUM_ION_TOKEN: 'rajattu' })).status, 403);
  assert.equal((await hae(NATIIVI, {})).status, 503);
});
