import test from 'node:test';
import assert from 'node:assert/strict';

import {
  Hyllypakkaus, luoNimiokerrosGL, GLNIMIOT_ATLAS, GLNIMIOT_SIVUJA_MAX, GLNIMIOT_HORISONTIN_HAIVE,
} from '../js/pallonimiot-gl.js';

/*
 * GL-RUNKO 3 (Karttaseppä 21.9.2026 ilta): atlaksen tiivistys ja
 * horisontin häive. Kirjaston luokat ja kangas ovat tynkiä: testi
 * tarkistaa varauksen ja tiivistyksen kirjanpidon (uvt, hyllyt,
 * mittarit), ei pikseleitä.
 */
const tynkaKangas = () => {
  const ctx = { clearRect() {}, drawImage() {} };
  return { width: 0, height: 0, getContext: () => ctx };
};
class Tynka { constructor(...a) { this.a = a; this.attributes = {}; this.uniforms = a[0]?.uniforms ?? {}; this.userData = {}; } }
class Geometria extends Tynka {
  constructor() { super(); this.drawRange = { start: 0, count: 0 }; }
  setAttribute(n, a) { this.attributes[n] = a; }
  setIndex() {}
  setDrawRange(s, c) { this.drawRange = { start: s, count: c }; }
  dispose() {}
}
class Verkko extends Tynka { constructor(g, m) { super(); this.geometry = g; this.material = m; this.visible = true; } }
const L = {
  Mesh: Verkko, BufferGeometry: Geometria, BufferAttribute: Tynka, Texture: Tynka, ShaderMaterial: Tynka, tekstuurimalli: null,
};
const luoKerros = () => {
  const lapset = [];
  const kerros = luoNimiokerrosGL({
    pallo: { scene: () => ({ add: (v) => lapset.push(v), remove() {} }), getGlobeRadius: () => 100 },
    kotelo: { ownerDocument: { createElement: () => tynkaKangas() }, clientWidth: 800, clientHeight: 600 },
    ikkuna: { performance: { now: () => 0 } },
    luokat: L,
  });
  return { kerros, lapset };
};
const rasteri = (w, h) => ({ kuva: {}, w, h, ankkuriX: 0, ankkuriY: 0 });

test('hyllypakkaus: täysi sivu palauttaa null, uusi pakkaus alkaa tyhjästä', () => {
  const p = new Hyllypakkaus(100, 0);
  assert.deepEqual(p.varaa(50, 50), { x: 0, y: 0 });
  assert.deepEqual(p.varaa(50, 50), { x: 50, y: 0 });
  assert.deepEqual(p.varaa(50, 50), { x: 0, y: 50 });
  assert.deepEqual(p.varaa(50, 50), { x: 50, y: 50 });
  assert.equal(p.varaa(50, 50), null);
  assert.equal(p.tayttoaste, 1);
});

test('atlas täynnä: tiivistys pudottaa kuolleet rasterit, elävät pysyvät ja saavat uudet UV:t', () => {
  const { kerros } = luoKerros();
  // Leveä rasteri = yksi per hyllyrivi: rivejä sivulla 2048/(200+2) = 10, sivuja 4 → 40 paikkaa.
  const riveja = Math.floor(GLNIMIOT_ATLAS / 202);
  const paikkoja = riveja * GLNIMIOT_SIVUJA_MAX;
  for (let i = 0; i < paikkoja; i += 1) {
    assert.ok(kerros.atlas.varaa(`r${i}`, {}, GLNIMIOT_ATLAS - 8, 200), `paikka ${i}`);
  }
  assert.equal(kerros.mittarit().sivuja, GLNIMIOT_SIVUJA_MAX);
  assert.equal(kerros.mittarit().rastereita, paikkoja);
  // Elävinä vain kolme (yksi joka sivulta paitsi viimeiseltä), muut kuolleita.
  const elavat = ['r0', `r${riveja}`, `r${2 * riveja}`];
  const uvEnnen = Object.fromEntries(elavat.map((a) => [a, { ...kerros.atlas.hae(a) }]));
  assert.equal(kerros.asetaKaikki(elavat.map((avain, i) => ({ tunnus: `n${i}`, lat: 10 * i, lng: 0, avain }))), 3);
  // Uusi rasteri ei mahtuisi ilman tiivistystä.
  const uusi = kerros.atlas.varaa('uusi', {}, GLNIMIOT_ATLAS - 8, 200);
  assert.ok(uusi, 'tiivistys teki tilaa');
  const m = kerros.mittarit();
  assert.ok(m.tiivistyksia >= 1, `tiivistyksiä ${m.tiivistyksia}`);
  assert.ok(m.pudotettuja >= riveja - 1, `pudotettuja ${m.pudotettuja}`);
  for (const a of elavat) {
    const uv = kerros.atlas.hae(a);
    assert.ok(uv, `elävä ${a} säilyy`);
    assert.equal(uv.w, GLNIMIOT_ATLAS - 8); assert.equal(uv.h, 200);
    assert.ok(uv.u1 > uv.u0 && uv.v1 > uv.v0 && uv.v1 <= 1, `UV ${a} kelvollinen`);
  }
  // Tiivistetyn sivun elävä siirtyi sivun alkuun; sivulla, jota ei tiivistetty, UV on ennallaan.
  const siirtyneita = elavat.filter((a) => kerros.atlas.hae(a).v0 !== uvEnnen[a].v0).length;
  assert.ok(siirtyneita <= elavat.length);
  // Ensin tiivistyy sivu, jolla on eniten kuollutta: viimeinen (kaikki kuolleita) → sen rasterit poissa.
  assert.equal(kerros.onRasteri(`r${3 * riveja}`), false, 'kuollut rasteri on poissa → sovitin varaa sen uudestaan');
  assert.equal(kerros.onRasteri('r1'), true, 'muiden sivujen kuolleet säilyvät kunnes tila loppuu');
  // Elävää avainta ei vapauteta koskaan: täytä uudestaan ja tiivistä käsin.
  kerros.tiivista();
  for (const a of elavat) assert.ok(kerros.onRasteri(a), `elävä ${a} ei vapaudu`);
});

test('atlas täynnä pelkistä elävistä: varaa palauttaa null eikä pudota mitään', () => {
  const { kerros } = luoKerros();
  const riveja = Math.floor(GLNIMIOT_ATLAS / 202);
  const paikkoja = riveja * GLNIMIOT_SIVUJA_MAX;
  const lista = [];
  for (let i = 0; i < paikkoja; i += 1) {
    kerros.atlas.varaa(`r${i}`, {}, GLNIMIOT_ATLAS - 8, 200);
    lista.push({ tunnus: `n${i}`, lat: 0, lng: i, avain: `r${i}` });
  }
  assert.equal(kerros.asetaKaikki(lista), paikkoja);
  assert.equal(kerros.atlas.varaa('uusi', {}, GLNIMIOT_ATLAS - 8, 200), null);
  assert.equal(kerros.mittarit().pudotettuja, 0);
  assert.equal(kerros.mittarit().rastereita, paikkoja);
});

test('horisontin häive: uniform materiaalissa ja varjostimessa smoothstep', () => {
  const { kerros, lapset } = luoKerros();
  kerros.atlas.varaa('a', {}, 10, 10);
  assert.equal(lapset.length, 1);
  const mat = lapset[0].material;
  assert.equal(mat.uniforms.haive.value, GLNIMIOT_HORISONTIN_HAIVE);
  assert.ok(GLNIMIOT_HORISONTIN_HAIVE > 0 && GLNIMIOT_HORISONTIN_HAIVE < 0.3);
  const vs = mat.a[0].vertexShader;
  assert.match(vs, /smoothstep\(0\.0, haive, kosini\)/);
  assert.match(vs, /normalize\(cameraPosition - maailma\.xyz\)/, 'kosini katsesuunnasta, ei etäisyydestä');
  assert.doesNotMatch(vs, /step\(0\.0, dot/, 'kova leikkaus pois');
});
