// Lippuankkurit (tools/tee-lippuankkurit.mjs, löydös 161): itäinen reuna, sisämaassa, kohteista erillään.
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

test('ankkuri itäisimmässä viidenneksessä, ≥ 15 km reunasta ja ≥ 25 km kohteesta', () => {
  const { piste, perustelu } = lippuankkuri(maa(nelio(0, 40, 10, 45)), [[9.0, 42.5, 'kaupunki:x']]);
  assert.ok(piste[0] >= 8 && piste[0] <= 10, String(piste));
  assert.ok(perustelu.reunastaKm >= 15 && perustelu.lahinKohdeKm >= 25, JSON.stringify(perustelu));
  assert.deepEqual(perustelu.ehdot, { itaosa: true, reuna15km: true, kohteet25km: true });
});

test('kapea itäkärki: alue laajenee länteen, kunnes 15 km täyttyy', () => {
  // Itäpää on 0,1° korkea kannas (≈ 11 km), länsiosa leveä.
  const r = [[0, 40], [8, 40], [8, 42.95], [10, 42.95], [10, 43.05], [8, 43.05], [8, 46], [0, 46], [0, 40]];
  const { piste, perustelu } = lippuankkuri(maa(r), []);
  assert.ok(piste[0] < 8, String(piste));
  assert.equal(perustelu.ehdot.itaosa, false);
  assert.equal(perustelu.ehdot.reuna15km, true);
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
