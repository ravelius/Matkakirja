/*
 * GL-NIMIÖIDEN SOVITIN (js/pallolauta/glnimiot-sovitin.js): ladonnan
 * datumit → rungon instanssilista, CSS2D perääntymistienä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { glInstanssinTunnus, glNimenInstanssi, luoGlNimiosovitin } from '../js/pallolauta/glnimiot-sovitin.js';

const DATUMIT = [
  { avain: 'nimi:pariisi', laji: 'nimi', id: 'pariisi', teksti: 'Pariisi', lat: 48.9, lng: 2.3, dx: 25.1, dy: 5.6, ank: 'start', koko: 13.8 },
  { avain: 'nimi:marseille', laji: 'nimi', id: 'marseille', teksti: 'Marseille', lat: 43.3, lng: 5.4, dx: -8, dy: 0, ank: 'end', koko: 16 },
];

/** Rasterilähteen jäljitelmä: valmiit avaimet heti, muut kesken kunnes `valmistu`. */
function teeLahde(valmiit = new Set()) {
  const tilaajat = new Set();
  const sprite = (d) => ({
    osa: 'nimi', avain: `nimi|${d.teksti}`, valmis: valmiit.has(d.id),
    kuva: { w: 40, h: 12 }, w: 80, h: 24, ankkuriX: 4, ankkuriY: 12, skaala: 0.5, katto: null,
  });
  return {
    haeNimi: (d) => [sprite(d)],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    kuorenKerroin: () => 1.25,
    tila: () => ({ valmiita: valmiit.size, kesken: 0, fontitValmiit: true }),
    pura: () => {},
    valmistu(id, avain) { valmiit.add(id); for (const f of tilaajat) f(avain); },
  };
}

/** Rungon jäljitelmä sovitun rajapinnan mukaan (asetaKaikki + atlas). */
function teeKerros({ tilaa = Infinity } = {}) {
  const atlas = new Map();
  const k = {
    lista: [], kerroin: null,
    asetaKaikki(l) { k.lista = l; return l.length; },
    atlas: {
      hae: (avain) => atlas.get(avain) ?? null,
      varaa(avain, kuva, w, h, ankkuriX, ankkuriY) {
        if (atlas.size >= tilaa) return null;
        const t = { u0: 0, v0: 0, u1: 1, v1: 1, w, h, ankkuriX, ankkuriY };
        atlas.set(avain, t);
        return t;
      },
    },
    kerroin: (arvo) => { k.kerroinArvo = arvo; },
  };
  return k;
}

test('valmis rasteri → instanssi rungolle, CSS2D:hen ei jää mitään', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  const css2d = s.nimet(DATUMIT);
  assert.deepEqual(css2d, []);
  assert.equal(kerros.lista.length, 2);
  const p = kerros.lista[0];
  assert.equal(p.tunnus, 'nimi:pariisi');
  assert.equal(p.avain, 'nimi|Pariisi');
  assert.equal(p.dx, 25.1);
  assert.equal(p.dy, 5.6);
  assert.equal(p.skaala, 0.5);
  assert.equal(p.katto, null);
  assert.equal(p.opacity, 1);
  assert.ok(kerros.atlas.hae('nimi|Pariisi'), 'rasteri varattiin atlaksesta');
  assert.deepEqual([...s.rungolla()], ['nimi:pariisi', 'nimi:marseille']);
  assert.equal(s.tila().gl, 2);
});

test('kesken oleva rasteri jää CSS2D:hen ja siirtyy rungolle valmistuttuaan', () => {
  const lahde = teeLahde(new Set(['pariisi']));
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  let kutsuja = 0;
  const jaaUudestaan = () => { kutsuja += 1; s.nimet(DATUMIT, jaaUudestaan); };
  const css2d = s.nimet(DATUMIT, jaaUudestaan);
  assert.deepEqual(css2d.map((d) => d.id), ['marseille']);
  assert.equal(kerros.lista.length, 1);
  lahde.valmistu('marseille', 'nimi|Marseille');
  assert.equal(kutsuja, 1, 'valmistuminen pyysi jaon uudestaan');
  assert.equal(kerros.lista.length, 2);
  assert.equal(s.tila().css2d, 0);
});

test('atlas täynnä → nimi jää CSS2D:hen', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const kerros = teeKerros({ tilaa: 1 });
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  const css2d = s.nimet(DATUMIT);
  assert.deepEqual(css2d.map((d) => d.id), ['marseille']);
  assert.equal(s.tila().tayntyi, 1);
});

test('ilman runkoa kaikki jää CSS2D:hen; kehys vie kuoren kertoimen rungolle', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  let kerros = null;
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  assert.equal(s.nimet(DATUMIT).length, 2);
  kerros = teeKerros();
  s.kehys();
  assert.equal(kerros.kerroinArvo, 1.25);
  assert.equal(s.nimet(DATUMIT).length, 0);
});

test('vaiheen 1 runko (aseta/poista) kelpaa myös', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const asetetut = new Map();
  const kerros = {
    aseta: (id, rivi) => { asetetut.set(id, rivi); return true; },
    poista: (id) => asetetut.delete(id),
  };
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  s.nimet(DATUMIT);
  assert.deepEqual([...asetetut.keys()], ['nimi:pariisi', 'nimi:marseille']);
  assert.equal(asetetut.get('nimi:pariisi').rasteri.avain, 'nimi|Pariisi');
  s.nimet([DATUMIT[0]]);
  assert.deepEqual([...asetetut.keys()], ['nimi:pariisi']);
});

test('puhtaat apurit', () => {
  assert.equal(glInstanssinTunnus({ avain: 'nimi:x' }), 'nimi:x');
  assert.equal(glInstanssinTunnus({ laji: 'nosto', id: 'y' }), 'nosto:y');
  const i = glNimenInstanssi({ id: 'z', lat: 1, lng: 2, dx: '3', dy: null }, { avain: 'a', skaala: 0.5, katto: { a: 1, b: 2 } });
  assert.equal(i.dx, 3);
  assert.equal(i.dy, 0);
  assert.deepEqual(i.katto, { a: 1, b: 2 });
});

test('kytkentä: nimet.js jakaa sovittimen kautta ja lauta antaa sen; sw.js listaa moduulin', () => {
  const nimet = readFileSync(new URL('../js/pallolauta/nimet.js', import.meta.url), 'utf8');
  assert.match(nimet, /glSovitin \? glSovitin\.nimet\(nakyvatNimet, naytaNimet\) : nakyvatNimet/);
  assert.match(nimet, /jaaUudestaan: \(\) => naytaNimet\?\.\(\)/);
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /luoGlNimiosovitin\(\{ kotelo, kerros: \(\) => ui\.pallolautaGL\?\.\(\) \?\? null \}\)/);
  assert.match(lauta, /glSovitin\?\.kehys\(\);/);
  assert.match(lauta, /if \(!glTesti\) nimet\.jaaUudestaan\?\.\(\);/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/pallolauta/glnimiot-sovitin.js'"));
  assert.ok(sw.includes("'./js/pallonimiot-gl.js'"));
});
