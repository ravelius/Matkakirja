/*
 * ISS-KYYDIN REALISMI (js/linssit/iss-realismi.js, Siirtoseppä 28.9.2026): elinkaari Pelikoodarin koukuilla
 * (rakenna / paivita / pura), auringon suunta simuloidusta ajasta ja kerrosten virhe-eristys. Ruudun mittaus
 * (web–natiivi-kuvapari) tulee kerroksittain savukkeena.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { luoIssRealismi, auringonSuunta, AURINGON_VALI_MS } from '../js/linssit/iss-realismi.js';

// Globe.gl:n getCoords-muoto (säde 100): y ylös, lon 0 kohti +z.
const pallo = {
  getCoords(lat, lon, alt = 0) {
    const r = 100 * (1 + alt); const f = (lat * Math.PI) / 180; const l = (lon * Math.PI) / 180;
    return { x: r * Math.cos(f) * Math.sin(l), y: r * Math.sin(f), z: r * Math.cos(f) * Math.cos(l) };
  },
};

test('auringon suunta on yksikkövektori alihajapisteeseen', () => {
  const [x, y, z] = auringonSuunta(pallo, { lat: 0, lon: 0 });
  assert.ok(Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9 && Math.abs(z - 1) < 1e-9);
  const s = auringonSuunta(pallo, { lat: 23.4, lon: -90 });
  assert.ok(Math.abs(Math.hypot(...s) - 1) < 1e-9);
  assert.ok(s[0] < 0 && s[1] > 0);
});

test('elinkaari: rakenna kerran, paivita simuloidulla ajalla, pura siivoaa', () => {
  const kutsut = [];
  const kerros = {
    nimi: 'koe',
    rakenna: (y) => kutsut.push(['rakenna', y.R]),
    paivita: (y, k) => kutsut.push(['paivita', k.ms, k.osuus, k.aurinko.map((v) => Math.round(v * 1000) / 1000)]),
    pura: () => kutsut.push(['pura']),
  };
  const auringot = [];
  const r = luoIssRealismi({ aurinko: (ms) => { auringot.push(ms); return { lat: 0, lon: ms / 1e6 }; }, kerrokset: [kerros] });
  r.paivita({ ms: 5 }); // ennen rakennusta: ei mitään
  assert.equal(kutsut.length, 0);
  r.rakenna({ pallo, luokat: {}, metri: 1e-5, R: 100 });
  r.paivita({ osuus: 0.5, ms: 1_000_000 });
  r.paivita({ osuus: 1, ms: 1_000_000 + AURINGON_VALI_MS / 2 }); // aurinko ei päivity alle välin
  r.paivita({ osuus: 1, ms: 61_000_000 }); // nopeutus: iso hyppy → päivittyy
  assert.deepEqual(auringot, [1_000_000, 61_000_000]);
  assert.deepEqual(kutsut[0], ['rakenna', 100]);
  assert.equal(kutsut.filter(([n]) => n === 'paivita').length, 3);
  assert.equal(kutsut[1][2], 0.5);
  r.pura();
  assert.deepEqual(kutsut.at(-1), ['pura']);
  assert.equal(r.tila().rakennettu, false);
  r.paivita({ ms: 62_000_000 });
  assert.equal(kutsut.filter(([n]) => n === 'paivita').length, 3, 'purun jälkeen ei kehyksiä');
});

test('kerroksen virhe ei kaada muita, kolmas virhe sammuttaa kerroksen', () => {
  const varoitukset = [];
  let terve = 0; let rikki = 0;
  const r = luoIssRealismi({
    aurinko: () => ({ lat: 0, lon: 0 }),
    varoita: (v) => varoitukset.push(v),
    kerrokset: [
      { nimi: 'rikki', paivita: () => { rikki += 1; throw new Error('x'); } },
      { nimi: 'terve', paivita: () => { terve += 1; } },
    ],
  });
  r.rakenna({ pallo });
  for (let i = 0; i < 5; i++) r.paivita({ ms: i * 10 });
  assert.equal(terve, 5);
  assert.equal(rikki, 3);
  assert.equal(r.tila().virheita, 3);
  assert.equal(varoitukset.length, 2);
  assert.match(varoitukset[1], /kerros pois/);
});

test('aurinko(ms) on pakollinen', () => {
  assert.throws(() => luoIssRealismi({}), /aurinko/);
});
