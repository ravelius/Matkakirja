// Lippuankkurit (tools/tee-lippuankkurit.mjs, löydös 161; koilliskulma 29.9.2026): maan oikea yläkulma, sisämaassa, kohteista erillään.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { etaisyyskentta, lippuankkuri, mantere } from '../tools/tee-lippuankkurit.mjs';

const nelio = (w, s, e, n) => [[w, s], [e, s], [e, n], [w, n], [w, s]];
const maa = (...osat) => ({ geometry: { type: 'MultiPolygon', coordinates: osat.map((r) => [r]) } });

test('mantere on suurin osa, ei saari', () => {
  const m = mantere(maa(nelio(20, 40, 21, 41), nelio(0, 40, 10, 45)));
  assert.equal(m[0][0][0], 0);
});

test('etäisyyskenttä: keskellä kauimpana reunasta, ulkona nolla', () => {
  const k = etaisyyskentta([nelio(0, 0, 2, 2)], 0.02);
  const keski = Math.floor(k.H / 2) * k.W + Math.floor(k.W / 2);
  assert.ok(k.d[keski] > 100 && k.d[keski] < 115, String(k.d[keski]));
  assert.equal(k.d[0], 0);
});

test('ankkuri koilliskulmassa, ≥ 15 km reunasta', () => {
  const { piste, perustelu } = lippuankkuri(maa(nelio(0, 40, 10, 45)), []);
  assert.ok(piste[0] >= 9.5 && piste[1] >= 44.6, String(piste));
  assert.ok(perustelu.reunastaKm >= 15, JSON.stringify(perustelu));
  assert.equal(perustelu.ehdot.reuna15km, true);
});

test('kaupunki kulmassa: piste väistää 25 km, jos lähes yhtä hyvä', () => {
  const ilman = lippuankkuri(maa(nelio(0, 40, 10, 45)), []).piste;
  const { piste, perustelu } = lippuankkuri(maa(nelio(0, 40, 10, 45)), [[ilman[0], ilman[1], 'kaupunki:x']]);
  assert.ok(perustelu.lahinKohdeKm >= 25 && perustelu.ehdot.kohteet25km, JSON.stringify(perustelu));
  assert.ok(Math.abs(piste[0] - ilman[0]) + Math.abs(piste[1] - ilman[1]) > 0.2, String(piste));
});

test('L-muoto: koilliskulma, ei itäisin kärki etelässä (Italia–Puglia)', () => {
  // Pohjoisosa leveä 0–6°, itään etelässä pitkä kärki 6–10° × 40–41°.
  const r = [[0, 40], [10, 40], [10, 41], [6, 41], [6, 46], [0, 46], [0, 40]];
  const { piste } = lippuankkuri(maa(r), []);
  assert.ok(piste[1] > 44 && piste[0] < 6, String(piste));
});

test('pieni maa: kynnys puolet syvimmästä', () => {
  const { piste, perustelu } = lippuankkuri(maa(nelio(6, 49.5, 6.3, 49.8)), []);
  assert.ok(piste[0] > 6.1 && piste[1] > 49.6, String(piste));
  assert.equal(perustelu.ehdot.reuna15km, false);
});

test('assets/data/lippu-lonlat.json: {ISO3: [lon, lat]} kaikille maakuntamaille', async () => {
  const { readFileSync } = await import('node:fs');
  const { gunzipSync } = await import('node:zlib');
  const j = JSON.parse(readFileSync(new URL('../assets/data/lippu-lonlat.json', import.meta.url), 'utf8'));
  const maat = Object.values(JSON.parse(gunzipSync(readFileSync(new URL('../tools/vienti/maakuntarajat.json.gz', import.meta.url))).toString('utf8')).maat).map((m) => m.iso3);
  assert.deepEqual(Object.keys(j).sort(), [...maat].sort());
  for (const [iso, v] of Object.entries(j)) {
    assert.ok(/^[A-Z]{3}$/.test(iso) && v.length === 2, iso);
    assert.ok(v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90, iso);
  }
});
