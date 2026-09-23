/*
 * KAMERAKALLISTUS, VAIHE 1 (koe; js/pallolauta/kallistus.js,
 * js/pallolaatat.js KAMERAKALLISTUS; suunnitelma
 * docs/raportit/kamerakallistus-suunnitelma-20260923.md).
 *
 * Selaimessa sama mitataan tools/savukkeet/mittaa-kallistus.mjs:llä
 * (WebKit, Ranska tasot 6–8 × 0°/15°/30°); tässä geometria ja kääre
 * ilman DOMia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  kameranKehys, kallistettuKehys, laattakerroksenOsuma, pinnanRuutupiste, laattakerroksenNakyvissa, pallonPiste,
} from '../js/pallolaatat.js';
import {
  asennaKallistus, kallistusKaytossa, kallistusTila, pysyvaKallistuskulma, KALLISTUS_AVAIN, KALLISTUS_MAX,
  KALLISTUS_PYSYVA_KULMA, KALLISTUS_RAJA_KERROIN,
} from '../js/pallolauta/kallistus.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const LINSSI = { fov: 50, kuvasuhde: 390 / 844, sade: 100 };
const POV = { lat: 47, lng: 2.4, altitude: 0.14 };
const kallistettu = (kulma, suunta = 0, raja = Infinity) => ({ ...POV, kallistus: { kulma, suunta, raja } });
const piste = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

test('kulma 0 on nykyinen kamera bitilleen: osuma, ruutupiste ja näkyvyys samat kuin ilman kenttää', () => {
  const nolla = kallistettu(0);
  for (const [sx, sy] of [[0, 0], [0.7, -0.4], [-1, 1], [0.2, 0.9]]) {
    assert.deepEqual(laattakerroksenOsuma(nolla, sx, sy, LINSSI), laattakerroksenOsuma(POV, sx, sy, LINSSI));
  }
  assert.deepEqual(pinnanRuutupiste(nolla, 48, 3, LINSSI), pinnanRuutupiste(POV, 48, 3, LINSSI));
  const alue = { lat0: 49, lat1: 50, lon0: 2, lon1: 3 };
  assert.equal(laattakerroksenNakyvissa(alue, nolla), laattakerroksenNakyvissa(alue, POV));
  assert.equal(kallistettuKehys(nolla), null);
});

test('kehys on ortonormaali ja oikeakätinen; kulmalla 0 silmä on säteellä suoraan katsepisteen yllä', () => {
  for (const [k, s] of [[0, 0], [15, 0], [30, 40], [30, -120]]) {
    const f = kameranKehys(POV, k, s);
    for (const v of [f.eteen, f.oikea, f.ylos]) assert.ok(Math.abs(Math.hypot(v.x, v.y, v.z) - 1) < 1e-12);
    assert.ok(Math.abs(piste(f.eteen, f.oikea)) < 1e-12 && Math.abs(piste(f.eteen, f.ylos)) < 1e-12 && Math.abs(piste(f.oikea, f.ylos)) < 1e-12);
    // oikea × ylös = −eteen (kamera katsoo −z:aan)
    const r = f.oikea; const u = f.ylos;
    const risti = { x: r.y * u.z - r.z * u.y, y: r.z * u.x - r.x * u.z, z: r.x * u.y - r.y * u.x };
    assert.ok(Math.abs(piste(risti, f.eteen) + 1) < 1e-12);
    // Silmän etäisyys katsepisteestä = korkeus (mittakaava ruudun keskellä pysyy).
    const d = Math.hypot(f.silma.x - f.n.x, f.silma.y - f.n.y, f.silma.z - f.n.z);
    assert.ok(Math.abs(d - POV.altitude) < 1e-12);
  }
  const f0 = kameranKehys(POV, 0, 0);
  const n = pallonPiste(POV.lat, POV.lng, 1);
  assert.ok(Math.abs(f0.silma.x - n.x * 1.14) < 1e-12 && Math.abs(f0.silma.y - n.y * 1.14) < 1e-12);
});

test('kallistettuna ruudun keskellä on katsepiste, ja osuma ja ruutupiste ovat toistensa käänteiset', () => {
  for (const kulma of [15, 30]) {
    const pov = kallistettu(kulma, 25);
    const keski = laattakerroksenOsuma(pov, 0, 0, LINSSI);
    assert.ok(Math.abs(keski.lat - POV.lat) < 1e-9 && Math.abs(keski.lng - POV.lng) < 1e-9);
    const p = pinnanRuutupiste(pov, POV.lat, POV.lng, LINSSI);
    assert.ok(Math.abs(p.sx) < 1e-9 && Math.abs(p.sy) < 1e-9 && p.edessa);
    for (const [sx, sy] of [[0.5, 0.5], [-0.8, -0.9], [0.9, 0.2]]) {
      const o = laattakerroksenOsuma(pov, sx, sy, LINSSI);
      const takaisin = pinnanRuutupiste(pov, o.lat, o.lng, LINSSI);
      assert.ok(Math.abs(takaisin.sx - sx) < 1e-9 && Math.abs(takaisin.sy - sy) < 1e-9, `${kulma}° (${sx}, ${sy})`);
    }
  }
});

test('kallistus katsoo suuntaansa: ruudun yläreuna näkee kauemmas kuin kallistamattomana', () => {
  const kulmaEtaisyys = (o) => Math.acos(Math.min(1, piste(pallonPiste(o.lat, o.lng, 1), pallonPiste(POV.lat, POV.lng, 1))));
  const suora = kulmaEtaisyys(laattakerroksenOsuma(POV, 0, 1, LINSSI));
  const k30 = kulmaEtaisyys(laattakerroksenOsuma(kallistettu(30, 0), 0, 1, LINSSI));
  assert.ok(k30 > suora * 1.5, `${k30} vs ${suora}`);
  // Suunta 0 = pohjoinen: yläreunan osuma on katsepisteestä pohjoiseen.
  assert.ok(laattakerroksenOsuma(kallistettu(30, 0), 0, 1, LINSSI).lat > POV.lat);
});

test('horisontin raja: rajan takainen osuma ja laatta karsitaan, ruutupiste ei ole "edessä"', () => {
  const raja = KALLISTUS_RAJA_KERROIN * POV.altitude;
  const pov = kallistettu(30, 0, raja);
  assert.equal(laattakerroksenOsuma(pov, 0, 1, LINSSI), null, 'yläreuna on rajan takana 30°:ssa');
  assert.ok(laattakerroksenOsuma(pov, 0, -1, LINSSI), 'alareuna näkyy');
  const kaukana = { lat0: 53, lat1: 54, lon0: 2, lon1: 3 };
  assert.equal(laattakerroksenNakyvissa(kaukana, pov), false);
  assert.equal(laattakerroksenNakyvissa({ lat0: 46.9, lat1: 47.1, lon0: 2.3, lon1: 2.5 }, pov), true);
  assert.equal(pinnanRuutupiste(pov, 53.5, 2.4, LINSSI)?.edessa ?? false, false);
});

test('koelippu: ?koe=kallistus tai kehittäjäkytkin localStorage, muuten pois', () => {
  assert.equal(kallistusKaytossa(new Set(['kallistus']), { localStorage: { getItem: () => null } }), true);
  assert.equal(kallistusKaytossa(new Set(), { localStorage: { getItem: (k) => (k === KALLISTUS_AVAIN ? '1' : null) } }), true);
  assert.equal(kallistusKaytossa(new Set(['profiili']), { localStorage: { getItem: () => null } }), false);
  assert.equal(kallistusKaytossa(new Set(), {}), false);
});

/** Kirjaston ankka: pointOfView, kamera (Vector3-tyyppinen), ohjaimet. */
function ankkaPallo() {
  const v = (x = 0, y = 0, z = 0) => ({
    x, y, z,
    set(a, b, c) { this.x = a; this.y = b; this.z = c; return this; },
    copy(o) { this.x = o.x; this.y = o.y; this.z = o.z; return this; },
    clone() { return v(this.x, this.y, this.z); },
  });
  const kamera = {
    position: v(), up: v(0, 1, 0), fov: 50, aspect: 0.46, katse: null,
    lookAt(t) { this.katse = { x: t.x, y: t.y, z: t.z }; }, updateMatrixWorld() {},
  };
  const ohjaimet = { target: v(), update() { return 'alkuperainen'; } };
  let pov = { lat: 47, lng: 2.4, altitude: 0.14 };
  const pallo = {
    kirjoituksia: 0,
    pointOfView(p, ms = 0) {
      if (!p) return { ...pov };
      pov = { ...pov, ...p }; this.kirjoituksia += 1;
      const n = pallonPiste(pov.lat, pov.lng, 100 * (1 + pov.altitude));
      kamera.position.set(n.x, n.y, n.z); ohjaimet.target.set(0, 0, 0);
      return ms;
    },
    camera: () => kamera, controls: () => ohjaimet, getGlobeRadius: () => 100,
  };
  pallo.pointOfView({ lat: 47 });
  return { pallo, kamera, ohjaimet };
}

test('kääre: kallistettuna getter antaa virtuaalisen kameran, setter kirjoittaa sen; suoristus palauttaa kaiken', async () => {
  const { pallo, kamera, ohjaimet } = ankkaPallo();
  const alkuperainen = pallo.pointOfView;
  const k = asennaKallistus({ pallo, kotelo: null, ikkuna: { performance: { now: () => 0 } } });
  assert.equal(pallo.pointOfView, alkuperainen, 'ilman kallistusta kirjastoa ei kääritä');
  await k.kallista({ kulma: 30, suunta: 0, kesto: 0 });
  assert.equal(k.kaynnissa(), true);
  const pov = pallo.pointOfView();
  assert.deepEqual({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude }, { lat: 47, lng: 2.4, altitude: 0.14 });
  assert.equal(pov.kallistus.kulma, 30);
  assert.ok(Math.abs(pov.kallistus.raja - KALLISTUS_RAJA_KERROIN * 0.14) < 1e-12);
  assert.equal(ohjaimet.update(), false, 'OrbitControlsin update ohitetaan kallistuksen ajaksi');
  // Kamera katsoo katsepisteeseen, ei pallon keskipisteeseen.
  const P = pallonPiste(47, 2.4, 100);
  assert.ok(Math.abs(kamera.katse.x - P.x) < 1e-9 && Math.abs(kamera.katse.y - P.y) < 1e-9);
  // Pelin kamera-ajo kirjoittaa virtuaalista pov:ta.
  pallo.pointOfView({ lat: 46.5 }, 0);
  assert.equal(pallo.pointOfView().lat, 46.5);
  // Kulmaa ei voi viedä yli katon.
  await k.kallista({ kulma: 80, kesto: 0 });
  assert.equal(k.tila().kulma, KALLISTUS_MAX);
  await k.suorista({ kesto: 0 });
  assert.equal(k.kaynnissa(), false);
  assert.equal(pallo.pointOfView, alkuperainen);
  assert.equal(ohjaimet.update(), 'alkuperainen');
  assert.deepEqual({ x: kamera.up.x, y: kamera.up.y, z: kamera.up.z }, { x: 0, y: 1, z: 0 });
  const lopuksi = pallo.pointOfView();
  assert.equal(lopuksi.kallistus, undefined);
  assert.equal(lopuksi.lat, 46.5);
  const n = pallonPiste(46.5, 2.4, 114);
  assert.ok(Math.abs(kamera.position.x - n.x) < 1e-9 && Math.abs(kamera.position.z - n.z) < 1e-9, 'kamera suoraan alas');
});

test('reduced motion: ei kallistusta', async () => {
  const { pallo } = ankkaPallo();
  const k = asennaKallistus({ pallo, kotelo: null, ui: { reducedMotion: true }, ikkuna: {} });
  assert.equal(await k.kallista({ kulma: 20, kesto: 0 }), false);
  assert.equal(k.kaynnissa(), false);
});

test('kytkentä: lauta asentaa vain koelipulla, kallistus on ele ladonnalle, CSS2D-ennuste ohitetaan', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /const kallistustila = kallistusTila\(piirtokokeet\(\)\);\n\s*const kallistus = kallistustila \? asennaKallistus\(\{/);
  assert.match(lauta, /pysyva: kallistustila === 'pysyva', pysyvaKulma: pysyvaKallistuskulma\(\)/);
  assert.match(lauta, /\|\| kallistus\?\.kaynnissa\(\)\);/);
  assert.match(lauta, /if \(kallistus && kesto > 0\) void kallistus\.esitteleAjonJalkeen\(\(\) => kamera\.kameraAjossa\?\.\(\)\);/);
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /if \(pov\?\.kallistus\?\.kulma \|\| edellinen\?\.pov\?\.kallistus\?\.kulma\) return lepo;/);
  const css = lue('../css/styles.css');
  assert.match(css, /body\.pallolauta-kallistettu \.pallolauta-maapaneeli/);
});

/*
 * PYSYVÄ KALLISTUS (valikon kytkin, Fable 23.9.2026): kallistus pysyy
 * syötteessä, eleet ajetaan (kirjaston update ohitetaan lipulla), kortit
 * eivät piiloudu ja vakaa kallistus ei ole ele ladonnalle.
 */
test('tila: kytkin ja ?koe=kallistuspysyva ovat pysyviä, ?koe=kallistus on esittely', () => {
  const muisti = (arvo) => ({ localStorage: { getItem: () => arvo } });
  assert.equal(kallistusTila(new Set(), muisti(null)), null);
  assert.equal(kallistusTila(new Set(['kallistus']), muisti(null)), 'esittely');
  assert.equal(kallistusTila(new Set(['kallistuspysyva']), muisti(null)), 'pysyva');
  assert.equal(kallistusTila(new Set(), muisti('1')), 'pysyva');
  assert.equal(kallistusTila(new Set(['kallistus']), muisti('1')), 'pysyva');
  assert.equal(kallistusTila(new Set(), muisti('0')), null);
  assert.equal(kallistusKaytossa(new Set(), muisti('1')), true);
  const osoite = (haku) => ({ location: { search: haku } });
  assert.equal(pysyvaKallistuskulma(osoite('')), KALLISTUS_PYSYVA_KULMA);
  assert.equal(pysyvaKallistuskulma(osoite('?kallistuskulma=30')), 30);
  assert.equal(pysyvaKallistuskulma(osoite('?kallistuskulma=80')), KALLISTUS_MAX);
  assert.equal(pysyvaKallistuskulma(osoite('?kallistuskulma=1')), KALLISTUS_PYSYVA_KULMA);
  assert.ok(KALLISTUS_PYSYVA_KULMA >= 20 && KALLISTUS_PYSYVA_KULMA <= 25);
  // Valikon rivi käyttää samaa avainta ilman tuontia.
  const main = lue('../js/main.js');
  assert.match(main, new RegExp(`const KALLISTUS_AVAIN = '${KALLISTUS_AVAIN}';`));
  assert.match(main, /dataset\.kytkin = 'kallistus'/);
});

test('pysyvä: syöte ei suorista, eleet jäävät, kortit eivät piiloudu, vakaa kulma ei ole ele', async () => {
  const { pallo, ohjaimet } = ankkaPallo();
  const eleita = [];
  ohjaimet.update = function pallonSyoteUpdate() { eleita.push(1); return ohjaimet.__kirjastoOhi ? false : 'alkuperainen'; };
  const kuuntelijat = {};
  const kotelo = {
    addEventListener: (n, f) => { kuuntelijat[n] = f; }, removeEventListener() {}, appendChild() {},
    classList: { toggle: (c, p) => { if (p) throw new Error(`luokka ${c} ei saa tulla pysyvässä`); } },
  };
  const ajastimet = [];
  const ikkuna = {
    performance: { now: () => 0 }, setTimeout: (f, ms) => { ajastimet.push({ f, ms }); return ajastimet.length; }, clearTimeout() {},
  };
  const k = asennaKallistus({ pallo, kotelo, ikkuna, pysyva: true, pysyvaKulma: 22 });
  assert.equal(ajastimet.at(-1).ms, 1200, 'kulma tulee asennuksen jälkeen');
  await k.kallista({ kulma: 22, kesto: 0 });
  assert.equal(k.tila().paalla, true);
  assert.equal(k.kaynnissa(), false, 'vakaa kallistus ei estä ladontaa');
  assert.equal(ohjaimet.update(), false, 'kirjaston update ohitetaan');
  assert.equal(eleita.length, 1, 'eleiden update ajetaan');
  kuuntelijat.pointerdown?.();
  kuuntelijat.wheel?.();
  assert.equal(k.tila().kulma, 22, 'syöte ei suorista');
  // Kirjaston tween suoristaa ja kulma palaa sen jälkeen.
  pallo.pointOfView({ lat: 46 }, 800);
  assert.equal(k.tila().paalla, false);
  assert.equal(ohjaimet.__kirjastoOhi, undefined);
  assert.equal(ajastimet.at(-1).ms, 800 + 150);
  assert.equal(await k.esittele(), false, 'esittelyä ei ajeta pysyvässä');
  k.pura();
});
