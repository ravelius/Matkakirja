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

/* ── Kerrokset (js/linssit/iss-realismi-kerrokset.js): natiivin varjostimet webiin ── */
import {
  leveysPituus, mercatorRivi, realismiKerrokset, VARJOSTIMET, YOKUORI, ILMAKAARI, JARJESTYS, PILVET,
} from '../js/linssit/iss-realismi-kerrokset.js';

test('pituus ja leveys samasta kaavasta kuin varjostimissa: itä on itä (ei natiivin cl4-peilausta)', () => {
  for (const [lat, lon] of [[0, 0], [60, 25], [-33.9, 151.2], [45, -73.6], [0, 180], [0, -90]]) {
    const p = pallo.getCoords(lat, lon);
    const r = leveysPituus([p.x, p.y, p.z]);
    assert.ok(Math.abs(r.lat - lat) < 1e-9, `lat ${lat}`);
    const dl = ((r.lon - lon + 540) % 360) - 180;
    assert.ok(Math.abs(dl) < 1e-9, `lon ${lon} → ${r.lon}`);
  }
  // Varjostin käyttää samaa atan(x, z) ja asin(y):tä.
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /atan\(ng\.x, ng\.z\)/);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /asin\(clamp\(ng\.y/);
  assert.match(VARJOSTIMET.REVONTULET_FRAGMENT, /atan\(n\.x, n\.z\)/);
  assert.ok(!/cross\(/.test(Object.values(VARJOSTIMET).join('')), 'ei ristituloa');
});

test('Eurooppa-kuvan rajat: Web Mercator -rivit 13/64 … 26/64', () => {
  const [lon0, lon1, m0, m1] = YOKUORI.euRaja;
  assert.equal(lon0, -28.125); assert.equal(lon1, 45);
  assert.equal(m0, 13 / 64); assert.equal(m1, 26 / 64);
  // Helsinki (60,17 N) ja Rooma (41,9 N) ovat Eurooppa-kuvan sisällä.
  for (const lat of [60.17, 41.9]) { const m = mercatorRivi(lat); assert.ok(m > m0 && m < m1, `${lat}: ${m}`); }
  assert.equal(mercatorRivi(0), 0.5);
});

test('natiivin vakiot varjostimissa (ilmahehku 0,12 σ 4,5 km, yön vesi 0,96, kiilto σ² 0,02)', () => {
  assert.equal(ILMAKAARI.hehku, 0.12); assert.equal(ILMAKAARI.hehkuSigma, 4500); assert.equal(ILMAKAARI.hehkuKorkeus, 95000);
  assert.equal(YOKUORI.yoVesi, 0.96); assert.equal(YOKUORI.peitto, 0.82); assert.equal(YOKUORI.aalto, 0.02);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /smoothstep\(-0\.105, 0\.035/);
  assert.match(VARJOSTIMET.KAARI_FRAGMENT, /0\.075 \* 0\.075/);
  assert.match(VARJOSTIMET.REVONTULET_FRAGMENT, /smoothstep\(-0\.26, -0\.18/);
  // Pilvet peittävät valot ja heijastuksen (natiivi 2eb8a5d0): valo · (1 − 0,85 · pilven alfa).
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /lapi = 1\.0 - 0\.85 \* pilvi/);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /yo\(ng\) \* osuu \* lapi/);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /uKiilto \* lapi/);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /pilvi = uPilvetOn \* uPilviPeitto \*/);
  assert.match(VARJOSTIMET.YOKUORI_FRAGMENT, /lisaPilvi = pilvi \* osuu \* yoKuori \* clamp\(uYoVesi - a/);
  assert.equal(YOKUORI.valot, 0.96, 'kaupunkien valot 60 % (omistaja 28.9.)');
  // Terävät pilvet kyydissä (2b, natiivi cc513896): bikuubinen näyte, 5 oktaavin simplex, kynnys ja reunan leveys.
  assert.match(VARJOSTIMET.PILVET_FRAGMENT, /textureGrad\(uKuva/);
  assert.match(VARJOSTIMET.PILVET_FRAGMENT, /t = 0\.5 \+ 0\.36 \* tanh\(0\.8 \* fn\)/);
  assert.match(VARJOSTIMET.PILVET_FRAGMENT, /smoothstep\(t - 0\.08, t \+ 0\.08, a0\)/);
  assert.match(VARJOSTIMET.PILVET_FRAGMENT, /h\[k\] = clamp\(1\.5 - 2\.0 \* jalki \* taaj/);
  assert.equal(PILVET.tarkkuusKm, 35);
  // Pilvet valaistaan samalla terminaattorilla kuin yökuori (Päätoimittaja 28.9.): yöllä tummat.
  assert.match(VARJOSTIMET.PILVET_FRAGMENT, /mix\(uYo, 1\.0, smoothstep\(-0\.105, 0\.035, dot\(n, uAurinko\)\)\)/);
  assert.ok(JARJESTYS.pilvet < JARJESTYS.yokuori && JARJESTYS.yokuori < JARJESTYS.revontulet && JARJESTYS.revontulet < JARJESTYS.kaari);
});

test('kerrokset rakentuvat Globe.gl:n luokilla, korvaavat näkymän omat ja purkautuvat', () => {
  const lisatyt = [];
  class Shader { constructor(o) { Object.assign(this, o); } dispose() { this.purettu = true; } }
  class Sphere { constructor(r) { this.r = r; } dispose() {} }
  class Mesh { constructor(g, m) { this.geometry = g; this.material = m; } }
  const nayttamo = { add: (m) => { lisatyt.push(m); m.parent = { remove: (x) => lisatyt.splice(lisatyt.indexOf(x), 1) }; }, traverse() {} };
  const koePallo = { ...pallo, scene: () => nayttamo };
  const r = luoIssRealismi({ aurinko: () => ({ lat: 10, lon: 20 }), kerrokset: realismiKerrokset({ ikkuna: {} }) });
  assert.deepEqual({ ...r.korvaa }, { yokuori: true, kaari: true, pilvet: true });
  r.rakenna({ pallo: koePallo, luokat: { Shader, Sphere, Mesh }, metri: 100 / 6378137, R: 100 });
  // pilvet + yökuori + revontulet + kaari ja usva = 5 kuorta.
  assert.equal(lisatyt.length, 5);
  assert.ok(lisatyt.every((m) => m.visible === false), 'piilossa, kunnes tekstuurit ja kyyti');
  r.paivita({ osuus: 1, ms: 1e12 });
  const kaari = lisatyt.filter((m) => m.renderOrder === JARJESTYS.kaari);
  assert.equal(kaari.length, 2);
  assert.ok(kaari.every((m) => m.visible), 'ilmakaari ei tarvitse tekstuuria');
  assert.ok(Math.abs(kaari[0].material.uniforms.uHehkuKorkeus.value - 95000 * 100 / 6378137) < 1e-12);
  const s = kaari[0].material.uniforms.uAurinko.value;
  assert.ok(Math.abs(Math.hypot(s.x, s.y, s.z) - 1) < 1e-9);
  r.ab('yokuori').valot = 0;
  assert.equal(r.ab('yokuori').valot, 0);
  r.pura();
  assert.equal(lisatyt.length, 0);
  assert.equal(r.tila().virheita, 0);
});
