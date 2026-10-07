// SALLITUT 3D-KAUPUNGIT (omistaja 7.10.2026, LS2:n lista, Päätoimittaja 01.2x vain SALLITTU-luokka): worker torjuu muut
// kaupungit (403 ei-sallittu) ja r_m-säteen ulkopuoliset kohteet; Kysy merkitsee kaupungin ja siirron ei-sallituksi.
import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../tools/pollo/worker.js';
import { tyhjennaReunamuisti } from '../tools/pollo/reuna.js';
import { tyhjennaKuvalista } from '../tools/pollo/opas-kuvat.js';
import { OPAS_SALLITUT, sallittuKaupunki, pisteSallittu, sallittuId } from '../tools/pollo/sallitut.js';

beforeEach(() => { tyhjennaReunamuisti(); tyhjennaKuvalista(); });
const SALLITUT = { sallitut: [{ id: 'testila', nimi: 'Testilä', lat: 60, lon: 25, r_m: 3000 }] };
const kuva = (n) => ({ url: `https://media.matkakirja.app/kuvat/${n}.jpg`, tyyppi: 'valokuva', tekija: 'T', lisenssi: 'CC BY 4.0', lahdeUrl: `https://c/${n}`, jarjestys: 1 });
// Q100–Q106 säteellä, Q107 (10 km pohjoiseen) ulkona.
const KOHTEET = Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`Q${100 + i}`,
  { nimi: `Kohde ${i}`, kaupunki: 'testila', lat: i === 7 ? 60.09 : 60 + i / 1000, lon: 25, kuvat: [kuva(`k${i}`)] }]));
const LISTA = { kohteet: KOHTEET, kaupungit: { testila: { nimi: 'Testilä', lat: 60, lon: 25, kohteet: Object.keys(KOHTEET), kuvat: [] } } };
const H = { 'content-type': 'application/json', origin: 'https://matkakirja.app', 'x-matkakirja-testi': '1' };
const env = () => ({ ANTHROPIC_API_KEY: 'a', POLLO_ORIGINIT: 'https://matkakirja.app', OPAS_AINEISTO_TESTI: {}, OPAS_KUVALISTA_TESTI: LISTA,
  OPAS_SALLITUT_TESTI: SALLITUT, PUHE_R2: { get: async () => null, put: async () => {}, delete: async () => {} } });

test('lista: 36 sallittua, ei raja- eikä POIS-kaupunkeja; id-kaava', () => {
  assert.equal(OPAS_SALLITUT.sallitut.length, 38);
  for (const x of OPAS_SALLITUT.sallitut) assert.ok(x.id && x.nimi && Number.isFinite(x.lat) && Number.isFinite(x.lon) && x.r_m >= 1000, x.id);
  const paalla = { OPAS_SALLITUT_ESTO: '1' };
  assert.ok(sallittuKaupunki('Pariisi', paalla)); assert.ok(sallittuKaupunki('Kööpenhamina', paalla));
  for (const pois of ['Tallinna', 'Istanbul', 'Kiova', 'Sarajevo', 'Tromssa', 'Varsova']) assert.equal(sallittuKaupunki(pois, paalla), null, pois);
  assert.equal(sallittuId('Košice'), 'kosice');
  assert.equal(sallittuKaupunki('Islanti', paalla)?.nimi, 'Reykjavík', 'pelinimi Islanti, näyttönimi Reykjavík');
  assert.equal(sallittuKaupunki('Reykjavík', paalla)?.id, 'islanti');
  assert.ok(pisteSallittu({ lat: 48.8584, lon: 2.2945 }, 'Pariisi', paalla));
  assert.ok(!pisteSallittu({ lat: 59.437, lon: 24.745 }, null, paalla), 'Tallinna ei millään säteellä');
});

test('/opas/seuraava ja /opas/liiku: ei-sallittu kaupunki → 403; Liiku vain säteen kohteet', async () => {
  const e = env();
  const s = await worker.fetch(new Request('https://pollo.example/opas/seuraava', { method: 'POST', headers: H,
    body: JSON.stringify({ kaupunki: 'Tallinna', istunto: 's1' }) }), e, { waitUntil() {} });
  assert.equal(s.status, 403); assert.equal((await s.json()).virhe, 'ei-sallittu');
  const l = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Tallinna', { headers: H }), e, {});
  assert.equal(l.status, 403);
  const ok = await (await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Testil%C3%A4', { headers: H }), e, {})).json();
  assert.deepEqual(ok.kohteet.map((k) => k.id), ['Q100', 'Q101', 'Q102', 'Q103', 'Q104', 'Q105', 'Q106'], 'Q107 säteen ulkopuolella pois');
});

test('kytkin: ilman OPAS_SALLITUT_ESTO-muuttujaa ei estoa (TF 154/155), päällä = 1', async () => {
  assert.ok(sallittuKaupunki('Tallinna', {}), 'esto pois');
  assert.ok(pisteSallittu({ lat: 59.437, lon: 24.745 }, null, {}));
  assert.equal(sallittuKaupunki('Tallinna', { OPAS_SALLITUT_ESTO: '1' }), null);
  assert.ok(!pisteSallittu({ lat: 59.437, lon: 24.745 }, null, { OPAS_SALLITUT_ESTO: '1' }));
  const e = { ...env(), OPAS_SALLITUT_TESTI: undefined };
  const s = await worker.fetch(new Request('https://pollo.example/opas/liiku?kaupunki=Tallinna', { headers: H }), e, {});
  assert.notEqual(s.status, 403);
});

test('/opas/aineistot: sallitut tuotantolistasta, raja tyhjä', async () => {
  const v = await (await worker.fetch(new Request('https://pollo.example/opas/aineistot', { headers: { origin: 'https://matkakirja.app' } }),
    { POLLO_ORIGINIT: 'https://matkakirja.app' }, {})).json();
  assert.equal(v.sallitut.length, 38); assert.deepEqual(v.raja, []);
  assert.deepEqual(Object.keys(v.sallitut[0]).sort(), ['id', 'lat', 'lon', 'nimi', 'r_m']);
});
