/*
 * SYÖTE KERRAN KEHYKSESSÄ (sulavuuskatsaus 22.9.2026 kohta 13).
 *
 * Pointermove tallentaa vain sormen paikan ja aikaleiman; pintaratkaisu
 * ja kamerakirjoitus tehdään kerran kehyksessä OrbitControlsin
 * `update`-kutsun alussa. Kaksi tapahtumaa yhdessä kehyksessä = yksi
 * kamerakirjoitus, nolla tapahtumaa = ei kirjoitusta. Kotelon mitat
 * luetaan eleen alussa, ei joka tapahtumassa (kohta 15).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

const RAD = Math.PI / 180;
const R = 100;

globalThis.requestAnimationFrame ??= () => 1;
globalThis.cancelAnimationFrame ??= () => {};

const { asennaPallonEleet } = await import('../js/pallo.js');

/** Globe.gl:n kamera-apurit riittävässä laajuudessa: pov ⇄ position. */
function valePallo() {
  const kamera = { position: { x: 0, y: 0, z: 0 }, fov: 50 };
  const ohjaimet = {
    paivityksia: 0, muutoksia: [],
    update() { this.paivityksia += 1; },
    addEventListener() {}, removeEventListener() {},
    autoRotate: false, enableRotate: true, enableZoom: true, minDistance: NaN, maxDistance: NaN,
    _pointers: [], _pointerPositions: {}, state: -1,
    domElement: { ownerDocument: { removeEventListener() {} } },
  };
  let pov = { lat: 0, lng: 0, altitude: 0.5 };
  const aseta = (p) => {
    pov = { ...pov, ...p };
    const r = R * (1 + pov.altitude);
    kamera.position = {
      x: r * Math.cos(pov.lat * RAD) * Math.sin(pov.lng * RAD),
      y: r * Math.sin(pov.lat * RAD),
      z: r * Math.cos(pov.lat * RAD) * Math.cos(pov.lng * RAD),
      length() { return Math.hypot(this.x, this.y, this.z); },
    };
  };
  aseta(pov);
  let kirjoituksia = 0;
  const pallo = {
    controls: () => ohjaimet,
    camera: () => kamera,
    getGlobeRadius: () => R,
    pointOfView(p) { if (p) { kirjoituksia += 1; aseta(p); return pallo; } return { ...pov }; },
    kirjoituksia: () => kirjoituksia,
  };
  return { pallo, ohjaimet, kamera };
}

function valeKotelo() {
  const kuulijat = new Map();
  const doc = { kuulijat: new Map(), defaultView: { addEventListener() {}, removeEventListener() {} } };
  doc.addEventListener = (laji, fn) => { doc.kuulijat.set(laji, [...(doc.kuulijat.get(laji) ?? []), fn]); };
  doc.removeEventListener = () => {};
  doc.dispatchEvent = () => true;
  const kotelo = {
    rectLukuja: 0,
    clientWidth: 400, clientHeight: 800,
    getBoundingClientRect() { this.rectLukuja += 1; return { left: 10, top: 20, width: 400, height: 800 }; },
    addEventListener(laji, fn) { kuulijat.set(laji, [...(kuulijat.get(laji) ?? []), fn]); },
    removeEventListener() {},
    contains: () => true,
    ownerDocument: doc,
  };
  /** Tapahtuma dokumentin kaappaajille ja kotelon kuulijoille. */
  const laheta = (laji, e) => {
    const t = { target: kotelo, pointerId: 1, pointerType: 'touch', timeStamp: 0, ...e };
    for (const fn of doc.kuulijat.get(laji) ?? []) fn(t);
    for (const fn of kuulijat.get(laji) ?? []) fn(t);
  };
  return { kotelo, doc, laheta };
}

test('veto: kaksi pointermovea yhdessä kehyksessä = yksi kamerakirjoitus, nolla = ei yhtään', () => {
  const { pallo, ohjaimet } = valePallo();
  const { kotelo, laheta } = valeKotelo();
  const ui = { reducedMotion: false };
  const eleet = asennaPallonEleet(pallo, kotelo, ui);
  assert.equal(ui.pallonSyote.vanha, false, 'oletus on kehyspolku');
  assert.equal(ohjaimet.update.name, 'pallonSyoteUpdate', 'update on kääritty');

  laheta('pointerdown', { clientX: 210, clientY: 420, timeStamp: 1000 });
  const alku = pallo.pointOfView();
  laheta('pointermove', { clientX: 220, clientY: 420, timeStamp: 1008 });
  laheta('pointermove', { clientX: 230, clientY: 420, timeStamp: 1016 });
  assert.equal(pallo.kirjoituksia(), 0, 'tapahtuma ei kirjoita kameraa');
  assert.deepEqual(ui.pallonSyote.veto, { x: 230, y: 420, aika: 1016 }, 'vain viimeisin paikka');

  ohjaimet.update(0.016);
  assert.equal(ohjaimet.paivityksia, 1, 'kirjaston update ajettiin');
  assert.equal(pallo.kirjoituksia(), 1, 'kehys kirjoitti kameran kerran');
  assert.equal(ui.pallonSyote.sovelluksia, 1);
  assert.equal(ui.pallonSyote.veto, null, 'jono tyhjeni');
  const jalkeen = pallo.pointOfView();
  assert.ok(jalkeen.lng < alku.lng, `sormi oikealle → kamera länteen (${alku.lng} → ${jalkeen.lng})`);
  assert.equal(jalkeen.altitude, alku.altitude);

  // Kehys ilman tapahtumaa: ei kirjoitusta.
  ohjaimet.update(0.016);
  assert.equal(pallo.kirjoituksia(), 1);

  // Liu'un nopeus tuli aikaleimoista (16 ms), ei sovellushetkestä.
  const v = ui.pallonSormet && ui.pallonSyote;
  assert.ok(v);
  laheta('pointerup', { clientX: 230, clientY: 420, timeStamp: 1020 });
  assert.equal(ui.pallonSyote.veto, null);
  eleet.pura();
  assert.notEqual(ohjaimet.update.name, 'pallonSyoteUpdate', 'kääre purettu');
});

test('kotelon mitat luetaan eleen alussa, ei joka tapahtumassa', () => {
  const { pallo, ohjaimet } = valePallo();
  const { kotelo, laheta } = valeKotelo();
  asennaPallonEleet(pallo, kotelo, { reducedMotion: false });
  laheta('pointerdown', { clientX: 210, clientY: 420, timeStamp: 1000 });
  const lukuja = kotelo.rectLukuja;
  assert.ok(lukuja >= 1);
  for (let i = 1; i <= 10; i += 1) {
    laheta('pointermove', { clientX: 210 + i * 4, clientY: 420, timeStamp: 1000 + i * 8 });
    ohjaimet.update(0.008);
  }
  assert.equal(kotelo.rectLukuja, lukuja, 'liike ei lue rectiä');
  assert.equal(pallo.kirjoituksia(), 10);
});

test('nipistys: kaksi sormea liikkuu samassa kehyksessä → yksi zoomikirjoitus', () => {
  const { pallo, ohjaimet } = valePallo();
  const { kotelo, laheta } = valeKotelo();
  asennaPallonEleet(pallo, kotelo, { reducedMotion: false });
  laheta('pointerdown', { pointerId: 1, clientX: 150, clientY: 420, timeStamp: 1000 });
  laheta('pointerdown', { pointerId: 2, clientX: 250, clientY: 420, timeStamp: 1001 });
  const alku = pallo.pointOfView();
  laheta('pointermove', { pointerId: 1, clientX: 140, clientY: 420, timeStamp: 1010 });
  laheta('pointermove', { pointerId: 2, clientX: 260, clientY: 420, timeStamp: 1010 });
  assert.equal(pallo.kirjoituksia(), 0, 'sormet eivät kirjoita kameraa');
  ohjaimet.update(0.016);
  assert.equal(pallo.kirjoituksia(), 1, 'kehys ankkuroi kerran');
  const jalkeen = pallo.pointOfView();
  assert.ok(jalkeen.altitude < alku.altitude, 'sormet erilleen = lähemmäs');
  assert.ok(Math.abs(jalkeen.altitude / alku.altitude - 100 / 120) < 1e-6, 'korkeus etäisyyden suhteessa');
});

test('?koe=syotevanha palauttaa tapahtumakohtaisen polun', async () => {
  globalThis.location = { search: '?koe=syotevanha' };
  try {
    const { pallo, ohjaimet } = valePallo();
    const { kotelo, laheta } = valeKotelo();
    const ui = { reducedMotion: false };
    asennaPallonEleet(pallo, kotelo, ui);
    assert.equal(ui.pallonSyote.vanha, true);
    laheta('pointerdown', { clientX: 210, clientY: 420, timeStamp: 1000 });
    laheta('pointermove', { clientX: 220, clientY: 420, timeStamp: 1008 });
    laheta('pointermove', { clientX: 230, clientY: 420, timeStamp: 1016 });
    assert.equal(pallo.kirjoituksia(), 2, 'vanha polku kirjoittaa joka tapahtumasta');
    ohjaimet.update(0.016);
    assert.equal(pallo.kirjoituksia(), 2);
  } finally {
    delete globalThis.location;
  }
});
