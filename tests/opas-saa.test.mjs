// PALLON SÄÄ "AUTOMAATTI" (omistaja 8.10.2026): GET /opas/saa, MET Norway, 15 min välimuisti, tulkittu tila.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { saaTila, jasennaSaa, saaAvain, SAA_TILAT } from '../tools/pollo/saa.js';

beforeEach(() => tyhjennaReunamuisti());

test('saaTila: MET:n symbolit ja mittaukset pelin kuuteen tilaan', () => {
  const t = (symboli, muut = {}) => saaTila({ symboli, ...muut });
  assert.equal(t('clearsky_day'), 'selkea');
  assert.equal(t('fair_night'), 'selkea');
  assert.equal(t('partlycloudy_day', { pilvisyys: 40 }), 'selkea');
  assert.equal(t('partlycloudy_day', { pilvisyys: 80 }), 'pilvinen');
  assert.equal(t('cloudy'), 'pilvinen');
  assert.equal(t('lightrainshowers_day'), 'sade');
  assert.equal(t('heavyrain'), 'sade');
  assert.equal(t('cloudy', { sade: 0.5 }), 'sade');
  assert.equal(t('fog'), 'sumu');
  assert.equal(t('cloudy', { sumu: 60 }), 'sumu');
  assert.equal(t('lightsnow'), 'lumi');
  assert.equal(t('sleet', { lampotila: 3 }), 'sade');
  assert.equal(t('sleet', { lampotila: -1 }), 'lumi');
  assert.equal(t('heavyrainandthunder'), 'ukkonen');
  assert.equal(t('snowshowersandthunder_day'), 'ukkonen');
  assert.equal(t(''), 'selkea');
  for (const s of ['clearsky_day', 'cloudy', 'rain', 'fog', 'snow', 'rainandthunder']) assert.ok(SAA_TILAT.includes(t(s)));
});

const MET = (symboli = 'rainshowers_night', aika = '2026-10-08T06:00:00Z') => ({ properties: { timeseries: [
  { time: '2026-10-08T05:00:00Z', data: { instant: { details: { cloud_area_fraction: 10 } }, next_1_hours: { summary: { symbol_code: 'clearsky_night' } } } },
  { time: aika, data: { instant: { details: { cloud_area_fraction: 92.3, fog_area_fraction: 0, air_temperature: 7.4, wind_speed: 6.2, wind_from_direction: 250 } },
    next_1_hours: { summary: { symbol_code: symboli }, details: { precipitation_amount: 0.8 } } } },
] } });

test('jasennaSaa: lähin aikapiste, kentät ja tila', () => {
  const s = jasennaSaa(MET(), Date.parse('2026-10-08T06:10:00Z'));
  assert.deepEqual(s, { aika: '2026-10-08T06:00:00Z', saakoodi: 'rainshowers_night', pilvisyys_pct: 92.3, sumu_pct: 0, sade_mm_h: 0.8,
    lumi: false, ukkonen: false, tuuli_ms: 6.2, tuulen_suunta_ast: 250, lampotila_c: 7.4, paiva: false, tila: 'sade' });
  assert.equal(jasennaSaa({}), null);
});

test('saaAvain: kaupunki nimellä, muuten ~1 km:n ruutu', () => {
  assert.equal(saaAvain({ kaupunki: ' Praha ', lat: 50.08, lon: 14.42 }), 'saa:k:praha');
  assert.equal(saaAvain({ lat: 50.08712, lon: 14.42079 }), 'saa:p:50.09,14.42');
});

const NATIIVI = { 'x-matkakirja-natiivi': 'fi.matkakirja.peli', 'user-agent': 'Matkakirja/1.1 (fi.matkakirja.peli)' };
const hae = (kysely, otsakkeet = NATIIVI, ip = '10.7.0.1') => worker.fetch(new Request(`https://pollo.example/opas/saa?${kysely}`,
  { headers: { ...otsakkeet, 'cf-connecting-ip': ip } }), {}, { waitUntil() {} });

async function verkolla(vastaus, fn) {
  const vanha = globalThis.fetch, vanhaLog = console.log; const kutsut = [];
  globalThis.fetch = async (u, init = {}) => { kutsut.push({ url: String(u), ua: init.headers?.['user-agent'] }); return vastaus(); };
  console.log = () => {};
  try { await fn(kutsut); } finally { globalThis.fetch = vanha; console.log = vanhaLog; }
}

test('/opas/saa: MET:n ehdot (UA, 4 desimaalia), 15 min välimuisti kaupunkia kohden, vastauksen muoto', async () => {
  await verkolla(() => new Response(JSON.stringify(MET()), { headers: { 'content-type': 'application/json' } }), async (kutsut) => {
    const v = await hae('lat=50.087123&lon=14.420789&kaupunki=Praha');
    assert.equal(v.status, 200);
    const d = await v.json();
    assert.ok(['selkea', 'sade'].includes(d.tila));
    assert.equal(d.lahde.lisenssi, 'CC BY 4.0');
    assert.deepEqual(Object.keys(d).sort(), ['aika', 'lahde', 'lat', 'lon', 'lampotila_c', 'lumi', 'paiva', 'pilvisyys_pct', 'saakoodi',
      'sade_mm_h', 'sumu_pct', 'tila', 'tuulen_suunta_ast', 'tuuli_ms', 'ukkonen'].sort());
    assert.equal(kutsut.length, 1);
    assert.match(kutsut[0].url, /^https:\/\/api\.met\.no\/weatherapi\/locationforecast\/2\.0\/complete\?lat=50\.0871&lon=14\.4208$/);
    assert.match(kutsut[0].ua, /^Matkakirja-opas\/1\.0 \(.*@/);
    assert.equal((await hae('lat=50.09&lon=14.43&kaupunki=praha', NATIIVI, '10.7.0.2')).status, 200);
    assert.equal(kutsut.length, 1, 'sama kaupunki välimuistista');
  });
});

test('/opas/saa: virheet (ei natiivia 403, ei sijaintia 400, MET kaatuu 502)', async () => {
  await verkolla(() => new Response('virhe', { status: 503 }), async () => {
    assert.equal((await hae('lat=50&lon=14', { 'user-agent': 'curl/8' })).status, 403);
    assert.equal((await hae('lat=abc&lon=14')).status, 400);
    assert.equal((await hae('lat=0&lon=0')).status, 400);
    const v = await hae('lat=60.17&lon=24.94&kaupunki=Helsinki', NATIIVI, '10.7.0.3');
    assert.equal(v.status, 502);
    assert.equal((await v.json()).tila, undefined);
  });
});
