// ISS-realismin ajastetut haut (Julkaisija 28.9.2026): pilvialfa (tools/iss-pilvet.mjs),
// OVATION → revontuliruudukko (tools/iss-revontulet.mjs) ja työnkulkujen rakenne. Ei verkkoa, ei sharpia.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import {
  pilviAlfa, laskePilvialfa, luminanssi, kyllaisyys, kattavuus, eilinenUtc, edellinenPaiva,
  gibsUrl, bmngLahdeUrl, bmngAmpariPolku, pilvetJson, GIBS_KERROKSET,
} from '../tools/iss-pilvet.mjs';
import {
  ovationRuudukko, revontuletJson, harmaaPng, crc32, LEVEYS, KORKEUS,
} from '../tools/iss-revontulet.mjs';

const lue = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const lahella = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} ≠ ${b}`);

/* ---------- Pilvialfa ---------- */

test('iss-pilvet: alfakaava (L-ero 0,08…0,33 ja kylläisyys 0,35…0,15)', () => {
  // Valkoinen pilvi tummalla merellä: täysi alfa.
  assert.equal(pilviAlfa(255, 255, 255, 10, 20, 50), 1);
  // Sama kirkkaus kuin BMNG (lumi/jää): alfa 0.
  assert.equal(pilviAlfa(240, 240, 245, 240, 240, 245), 0);
  // Tummempi kuin BMNG: alfa 0.
  assert.equal(pilviAlfa(20, 20, 20, 100, 100, 100), 0);
  // Harmaa pilvi, L-ero tasan 0,08 + 0,125 = puolet, kylläisyys 0 → 0,5.
  const L = 0.5; const Lb = L - 0.08 - 0.125;
  const g = Math.round(L * 255); const gb = Lb * 255;
  lahella(pilviAlfa(g, g, g, gb, gb, gb), (luminanssi(g, g, g) - Lb - 0.08) / 0.25, 1e-6);
  // Kylläinen kirkas väri (aavikko/levä) ei ole pilveä.
  assert.equal(pilviAlfa(255, 200, 60, 0, 0, 0), 0);
  // Kylläisyys 0,25 → kylläisyystekijä 0,5.
  lahella(kyllaisyys(200, 175, 150), 0.25);
  lahella(pilviAlfa(200, 175, 150, 0, 0, 0), 0.5);
  lahella(luminanssi(255, 255, 255), 1);
  assert.equal(kyllaisyys(0, 0, 0), 0);
});

test('iss-pilvet: aukot täytetään edellisestä päivästä, muuten alfa 0', () => {
  // 3 pikseliä: pilvi, aukko (täyttyy), aukko (edellisessäkin aukko).
  const paiva = Uint8Array.from([255, 255, 255, 0, 0, 0, 0, 0, 0]);
  const edellinen = Uint8Array.from([0, 0, 0, 250, 250, 250, 1, 1, 1]);
  const bmng = Uint8Array.from([10, 20, 50, 10, 20, 50, 10, 20, 50]);
  const t = laskePilvialfa({ paiva, edellinen, bmng, leveys: 3, korkeus: 1 });
  assert.deepEqual([...t.alfa], [255, 255, 0]);
  assert.equal(t.taytetty, 1);
  const ilman = laskePilvialfa({ paiva, bmng, leveys: 3, korkeus: 1 });
  assert.deepEqual([...ilman.alfa], [255, 0, 0]);
  assert.throws(() => laskePilvialfa({ paiva, bmng: bmng.subarray(3), leveys: 3, korkeus: 1 }), /bmng/);
  lahella(kattavuus(paiva), 1 / 3);
});

test('iss-pilvet: päivät, GIBS- ja BMNG-osoitteet, JSON', () => {
  assert.equal(eilinenUtc(new Date('2026-09-28T06:23:00Z')), '2026-09-27');
  assert.equal(eilinenUtc(new Date('2026-03-01T00:10:00Z')), '2026-02-28');
  assert.equal(edellinenPaiva('2026-01-01'), '2025-12-31');
  assert.throws(() => edellinenPaiva('27.9.2026'), /YYYY-MM-DD/);

  assert.equal(GIBS_KERROKSET[0], 'VIIRS_NOAA20_CorrectedReflectance_TrueColor');
  const u = new URL(gibsUrl(GIBS_KERROKSET[0], '2026-09-27'));
  assert.equal(u.origin, 'https://gibs.earthdata.nasa.gov');
  assert.equal(u.searchParams.get('CRS'), 'EPSG:4326');
  assert.equal(u.searchParams.get('BBOX'), '-90,-180,90,180'); // WMS 1.3.0: lat,lon
  assert.equal(u.searchParams.get('WIDTH'), '4096');
  assert.equal(u.searchParams.get('HEIGHT'), '2048');
  assert.equal(u.searchParams.get('TIME'), '2026-09-27');

  assert.equal(bmngAmpariPolku('09'), 'data/bmng/09-4096.jpg');
  assert.match(bmngLahdeUrl('9'), /\/bmng-base\/september\/world\.200409\.3x5400x2700\.jpg$/);
  assert.match(bmngLahdeUrl('01'), /\/january\/world\.200401\./);
  assert.throws(() => bmngLahdeUrl('13'), /01–12/);

  const d = JSON.parse(pilvetJson({
    paiva: '2026-09-27', kerros: GIBS_KERROKSET[0], kk: '09', aukotPaivasta: '2026-09-26',
    haettu: new Date('2026-09-28T06:25:00Z'),
  }));
  assert.equal(d.paiva, '2026-09-27');
  assert.equal(d.lisenssi, 'NASA GIBS / PD');
  assert.equal(d.leveys, 4096);
  assert.equal(d.korkeus, 2048);
  assert.equal(d.haettu, '2026-09-28T06:25:00.000Z');
  assert.match(d.lahde, /VIIRS_NOAA20/);
});

/* ---------- Revontulet ---------- */

function ovation(pisteet, taysi = false) {
  const coordinates = [];
  if (taysi) for (let lon = 0; lon < 360; lon++) for (let lat = -90; lat <= 90; lat++) coordinates.push([lon, lat, 0]);
  for (const [lon, lat, p] of pisteet) {
    if (taysi) coordinates[lon * 181 + (lat + 90)][2] = p; else coordinates.push([lon, lat, p]);
  }
  return {
    'Observation Time': '2026-09-28T09:29:00Z', 'Forecast Time': '2026-09-28T10:46:00Z',
    'Data Format': '[Longitude, Latitude, Aurora]', coordinates, type: 'MultiPoint',
  };
}

test('iss-revontulet: OVATION → 360 × 181, sarake = pituus, rivi 0 = 90° N, arvo p × 2,55', () => {
  const r = ovationRuudukko(ovation([[0, 90, 100], [359, -90, 50], [25, 65, 10], [180, 0, 3]], true));
  assert.equal(r.length, 360 * 181);
  assert.equal(r[0], 255); // lon 0, lat 90
  assert.equal(r[180 * 360 + 359], 128); // lon 359, lat −90: round(127,5)
  assert.equal(r[(90 - 65) * 360 + 25], 26); // Lappi: round(25,5)
  assert.equal(r[90 * 360 + 180], 8); // päiväntasaaja, lon 180: round(7,65)
  let summa = 0; for (const a of r) summa += a;
  assert.equal(summa, 255 + 128 + 26 + 8);
});

test('iss-revontulet: viallinen syöte hylätään (ämpäriin jää edellinen)', () => {
  assert.throws(() => ovationRuudukko({}), /coordinates/);
  assert.throws(() => ovationRuudukko(ovation([[0, 0, 1]])), /65160/);
  assert.throws(() => ovationRuudukko({ ...ovation([]), 'Data Format': '[Lat, Lon]' }), /Data Format/);
  assert.throws(() => ovationRuudukko(ovation([[360, 0, 1]]), { odotaKaikki: false }), /virheellinen/);
  assert.throws(() => ovationRuudukko(ovation([[1, 2, 3], [1, 2, 4]]), { odotaKaikki: false }), /kahdesti/);
  assert.deepEqual([...ovationRuudukko(ovation([[1, 2, 400]]), { odotaKaikki: false })].filter(Boolean), [255]);
});

test('iss-revontulet: JSON ja harmaasävy-PNG', () => {
  const d = JSON.parse(revontuletJson(ovation([]), new Date('2026-09-28T10:00:00Z')));
  assert.equal(d.havaintoaika, '2026-09-28T09:29:00Z');
  assert.equal(d.ennusteaika, '2026-09-28T10:46:00Z');
  assert.equal(d.lisenssi, 'NOAA SWPC / PD');
  assert.equal(d.leveys, LEVEYS);
  assert.equal(d.korkeus, KORKEUS);
  assert.throws(() => revontuletJson({}), /Time/);

  assert.equal(crc32(Buffer.from('IEND')), 0xae426082);
  const data = Uint8Array.from([0, 64, 128, 255, 1, 2]);
  const png = harmaaPng(data, 3, 2);
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.equal(png.toString('latin1', 12, 16), 'IHDR');
  assert.equal(png.readUInt32BE(16), 3);
  assert.equal(png.readUInt32BE(20), 2);
  assert.equal(png[24], 8); // bittisyvyys
  assert.equal(png[25], 0); // harmaa
  const idatPituus = png.readUInt32BE(33);
  assert.equal(png.toString('latin1', 37, 41), 'IDAT');
  const raaka = inflateSync(png.subarray(41, 41 + idatPituus));
  assert.deepEqual([...raaka], [0, 0, 64, 128, 0, 255, 1, 2]);
  assert.throws(() => harmaaPng(data, 4, 2), /tavua/);
});

/* ---------- Työnkulut ---------- */

for (const [tiedosto, cron, polut, sharp] of [
  ['iss-pilvet.yml', "'23 6 * * *'", ['data/pilvet/uusin.png', 'data/pilvet/uusin.json'], true],
  ['iss-revontulet.yml', "'*/30 * * * *'", ['data/revontulet/uusin.png', 'data/revontulet/uusin.json'], false],
  ['iss-bmng.yml', null, ['data/$f'], true],
]) {
  test(`työnkulku ${tiedosto}: ubuntu, ajastus, ämpäripolut`, () => {
    const wf = lue(`.github/workflows/${tiedosto}`);
    assert.match(wf, /runs-on: ubuntu-latest/);
    assert.doesNotMatch(wf, /self-hosted|macos/);
    assert.match(wf, /workflow_dispatch:/);
    if (cron) assert.ok(wf.includes(`- cron: ${cron}`), `cron ${cron}`);
    else assert.doesNotMatch(wf, /schedule:/);
    for (const p of polut) assert.ok(wf.includes(`s3://$R2_AMPARI/${p}`), p);
    for (const s of ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_ACCOUNT_ID', 'R2_BUCKET']) {
      assert.ok(wf.includes(`secrets.${s}`), s);
    }
    assert.equal(/npm install --no-save --no-fund --no-audit sharp/.test(wf), sharp);
    assert.match(wf, /node tools\/iss-(pilvet|revontulet)\.mjs/);
  });
}
