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

test('oppaan tiheysraja: 20/min IP:ttäin ennen kutsuja, myös kehittäjälle; 429 Retry-After ilman Sonnetia', async () => {
  const { oppaanTiheysYlittyy } = await import('../tools/pollo/worker.js');
  const t = 1_000_000;
  for (let i = 0; i < 20; i += 1) assert.equal(oppaanTiheysYlittyy('1.2.3.4', t + i), false);
  assert.equal(oppaanTiheysYlittyy('1.2.3.4', t + 30), true, '21. minuutin sisällä');
  assert.equal(oppaanTiheysYlittyy('5.6.7.8', t + 30), false, 'toinen IP');
  assert.equal(oppaanTiheysYlittyy('1.2.3.4', t + 61_000), false, 'ikkuna liukuu');
  let kutsuja = 0;
  const vanha = globalThis.fetch;
  globalThis.fetch = async () => { kutsuja += 1; return new Response('{}', { status: 500 }); };
  try {
    const env = { ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', POLLO_KEHITTAJAKOODI: 'k', OPAS_MINUUTTIRAJA: '3' };
    const tila = [];
    for (let i = 0; i < 6; i += 1) {
      const v = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'cf-connecting-ip': '9.9.9.9', 'x-pollo-kehittaja': 'k' },
        body: JSON.stringify({}) }), env, {});
      tila.push(v.status);
      if (v.status === 429) assert.equal(v.headers.get('retry-after'), '30');
    }
    assert.deepEqual(tila, [400, 400, 400, 429, 429, 429], 'kehittäjäkoodikin rajataan');
    assert.equal(kutsuja, 0, 'ei kutsuja eteenpäin');
  } finally {
    globalThis.fetch = vanha;
  }
});
