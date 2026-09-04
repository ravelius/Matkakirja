import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LYHTY_MIN, LYHTY_MAX, LYHDYT, lyhdynTila, liekinHetki, asetaLyhty, sytytaLyhdyt,
} from '../js/lyhty.js';

/*
 * LYHTYJEN LIEKKIMALLI (omistaja 4.9.2026: "valot loimuamaan kuin valo
 * tulisi padasta ... alueelliset valovaihtelut liekin lailla").
 * Malli on puhdas funktio ajasta, joten se todennetaan ilman selainta:
 * valo pysyy rajoissa, elää eikä ole kummassakin nurkassa sama.
 */

/** Deterministinen arpa testiin. */
function arpa(siemen = 7) {
  let x = siemen;
  return () => { x = (x * 48271) % 2147483647; return x / 2147483647; };
}

test('kirkkaus pysyy rajoissa eikä sammu, siirtymä on muutama pikseli', () => {
  const tila = lyhdynTila('vasen', arpa());
  let min = 1; let max = 0;
  for (let t = 0; t < 60; t += 1 / 60) {
    const h = liekinHetki(tila, t);
    assert.ok(h.kajo >= LYHTY_MIN && h.kajo <= LYHTY_MAX, `kajo ${h.kajo} @${t}`);
    assert.ok(h.ydin >= LYHTY_MIN && h.ydin <= LYHTY_MAX, `ydin ${h.ydin} @${t}`);
    assert.ok(Math.abs(h.dx) < 5 && Math.abs(h.dy) < 4, `siirtymä ${h.dx},${h.dy}`);
    assert.ok(h.koko > 0.85 && h.koko < 1.15, `koko ${h.koko}`);
    min = Math.min(min, h.kajo); max = Math.max(max, h.kajo);
  }
  // Liekki elää: minuutissa kirkkaus vaihtelee selvästi muttei koko skaalalla.
  assert.ok(max - min > 0.18, `vaihteluväli ${max - min}`);
});

test('kaksi lyhtyä ei loimua samassa tahdissa', () => {
  const v = lyhdynTila('vasen', arpa(3));
  const o = lyhdynTila('oikea', arpa(3));
  let erot = 0;
  for (let t = 0; t < 20; t += 0.1) {
    if (Math.abs(liekinHetki(v, t).kajo - liekinHetki(o, t).kajo) > 0.03) erot += 1;
  }
  assert.ok(erot > 120, `nurkat erosivat vain ${erot}/200 hetkellä`);
  assert.notDeepEqual(LYHDYT.vasen.taajuus, LYHDYT.oikea.taajuus);
});

test('puuska liukuu kohti tavoitetta eikä hyppää (kaikki liike pehmeästi)', () => {
  const tila = lyhdynTila('oikea', arpa(11));
  let edellinen = liekinHetki(tila, 0).kajo;
  for (let t = 1 / 60; t < 30; t += 1 / 60) {
    const nyt = liekinHetki(tila, t).kajo;
    assert.ok(Math.abs(nyt - edellinen) < 0.025, `hyppy ${Math.abs(nyt - edellinen)} @${t}`);
    edellinen = nyt;
  }
});

/** Pieni DOM-jäljitelmä: vain se, mitä sytytaLyhdyt käyttää. */
function tekoLaatikko() {
  const solmu = (tag) => ({
    tag, className: '', children: [], attrs: {}, style: { vars: {}, setProperty(k, v) { this.vars[k] = v; } },
    setAttribute(k, v) { this.attrs[k] = v; },
    appendChild(c) { this.children.push(c); return c; },
  });
  const laatikko = solmu('div');
  laatikko.isConnected = true;
  laatikko.firstChild = null;
  laatikko.insertBefore = (c) => { laatikko.children.unshift(c); return c; };
  laatikko.ownerDocument = { createElement: solmu };
  return laatikko;
}

test('sytytaLyhdyt luo kaksi lyhtyä kerroksineen ja reduced motion jättää ne tasaisiksi', () => {
  const laatikko = tekoLaatikko();
  const sammuta = sytytaLyhdyt(laatikko, { reducedMotion: true, raf: null });
  assert.equal(laatikko.children.length, 2);
  assert.deepEqual(laatikko.children.map((l) => l.className), ['aikajana-lyhty oikea', 'aikajana-lyhty vasen']);
  for (const l of laatikko.children) {
    assert.deepEqual(l.children.map((k) => k.className), ['kajo', 'ydin']);
    assert.equal(l.attrs['aria-hidden'], 'true');
    assert.equal(l.style.vars['--lyhty-dx'], '0.00px');
  }
  assert.equal(typeof sammuta, 'function');
});

test('silmukka pysähtyy sammuttimesta ja kun laatikko irtoaa', () => {
  const laatikko = tekoLaatikko();
  const jono = [];
  const raf = (fn) => { jono.push(fn); return jono.length; };
  let peruttu = null;
  const sammuta = sytytaLyhdyt(laatikko, { raf, caf: (id) => { peruttu = id; } });
  assert.equal(jono.length, 1);
  jono.shift()(16);
  assert.equal(jono.length, 1, 'seuraava kehys pyydetty');
  asetaLyhty(laatikko.children[0], { kajo: 0.7, ydin: 0.8, dx: 1, dy: -1, koko: 1.01 });
  assert.equal(laatikko.children[0].style.vars['--lyhty-kajo'], '0.700');
  laatikko.isConnected = false;
  jono.shift()(32);
  assert.equal(jono.length, 0, 'irronnut laatikko ei pyydä kehystä');
  sammuta();
  assert.ok(peruttu !== null);
});
