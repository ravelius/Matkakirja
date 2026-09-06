import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LYHTY_MIN, LYHTY_MAX, LYHDYT, lyhdynTila, liekinHetki, laatikonValo,
  asetaLyhty, asetaLaatikonValo, sytytaLyhdyt,
} from '../js/lyhty.js';

/*
 * LYHTYJEN LIEKKIMALLI (omistaja 4.9.2026: "valot loimuamaan kuin valo
 * tulisi padasta ... alueelliset valovaihtelut liekin lailla").
 * Malli on puhdas funktio ajasta, joten se todennetaan ilman selainta:
 * valo pysyy rajoissa, elää eikä ole kummassakin nurkassa sama.
 *
 * RAJAT MUUTTUIVAT 6.9.2026 (omistaja: "Miten tulen Loimuun saisi
 * lisää tunnelmaa ja elävyyttä. Nyt liian huomaamaton efekti."):
 * alaraja 0,45 → 0,25, siirtymä muutamasta pikselistä yhdeksään ja
 * mitattu vaihteluväli 0,25:stä 0,75:een. Näitä väitteitä ei löysätä
 * vaan kiristetään: liian kaino loimu on juuri se vika, joka
 * korjattiin.
 */

/** Deterministinen arpa testiin. */
function arpa(siemen = 7) {
  let x = siemen;
  return () => { x = (x * 48271) % 2147483647; return x / 2147483647; };
}

test('rajat ovat omistajan 6.9.2026 tilaamat: liekki saa painua hiillokselle', () => {
  assert.equal(LYHTY_MIN, 0.25, 'alaraja laskettiin 0,45:stä, jotta loimu erottuu');
  assert.equal(LYHTY_MAX, 1);
});

test('kirkkaus pysyy rajoissa eikä sammu, siirtymä on alle kymmenen pikseliä', () => {
  const tila = lyhdynTila('vasen', arpa());
  let min = 1; let max = 0;
  for (let t = 0; t < 60; t += 1 / 60) {
    const h = liekinHetki(tila, t);
    assert.ok(h.kajo >= LYHTY_MIN && h.kajo <= LYHTY_MAX, `kajo ${h.kajo} @${t}`);
    assert.ok(h.ydin >= LYHTY_MIN && h.ydin <= LYHTY_MAX, `ydin ${h.ydin} @${t}`);
    // Keskipisteen heilunta kaksinkertaistui; se on silti pikseleitä, ei hyppy.
    assert.ok(Math.abs(h.dx) < 9 && Math.abs(h.dy) < 6, `siirtymä ${h.dx},${h.dy}`);
    assert.ok(h.koko > 0.85 && h.koko < 1.15, `koko ${h.koko}`);
    min = Math.min(min, h.kajo); max = Math.max(max, h.kajo);
  }
  /*
   * Liekki elää NÄKYVÄSTI: minuutissa kirkkaus käyttää vähintään kaksi
   * kolmasosaa koko skaalasta (mitattu 0,75 = koko väli 0,25–1,0).
   * Vanha raja oli 0,18 — juuri se teki efektistä huomaamattoman.
   */
  assert.ok(max - min > 0.5, `vaihteluväli ${max - min}`);
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
  /*
   * Puuskat kasvoivat ja tihenivät 6.9.2026, joten yksi kehys muuttaa
   * kirkkautta enemmän kuin ennen (mitattu suurin 0,032, aiemmin
   * 0,025:n alla). Aikavakio nostettiin samalla 0,25 s → 0,32 s, jotta
   * suurempi askel ehtii silti liukua: raja on 0,04, eli 60 kehyksen
   * sekunnissa muutos on korkeintaan neljä prosenttia skaalasta.
   */
  const tila = lyhdynTila('oikea', arpa(11));
  let edellinen = liekinHetki(tila, 0).kajo;
  for (let t = 1 / 60; t < 30; t += 1 / 60) {
    const nyt = liekinHetki(tila, t).kajo;
    assert.ok(Math.abs(nyt - edellinen) < 0.04, `hyppy ${Math.abs(nyt - edellinen)} @${t}`);
    edellinen = nyt;
  }
});

/*
 * VALON VASTAKOHTA (omistaja 6.9.2026). Kun liekit vaimenevat, paperin
 * varjo syvenee ja laatikon ulkopuolinen kajo hiipuu — sama malli
 * ohjaa molempia, joten ne hengittävät vastakkaisissa tahdeissa.
 */
test('laatikonValo kääntää kirkkauden varjoksi ja ulkokajoksi', () => {
  const kirkas = laatikonValo([LYHTY_MAX, LYHTY_MAX]);
  const himmea = laatikonValo([LYHTY_MIN, LYHTY_MIN]);
  assert.equal(kirkas.varjo, 0, 'täydellä liekillä ei ole lisävarjoa');
  assert.equal(himmea.varjo, 1, 'hiilloksella varjo on syvimmillään');
  assert.ok(himmea.varjo > kirkas.varjo, 'varjo on valon vastakohta');
  assert.ok(kirkas.ulko > himmea.ulko, 'ulkokajo seuraa valoa');
  // Kajo ei koskaan sammu kokonaan eikä karkaa: laatikko hehkuu aina hieman.
  for (const kajo of [LYHTY_MIN, 0.5, 0.8, LYHTY_MAX]) {
    const v = laatikonValo([kajo, kajo]);
    assert.ok(v.ulko > 0.1 && v.ulko < 0.45, `ulkokajo ${v.ulko}`);
    assert.ok(v.varjo >= 0 && v.varjo <= 1, `varjo ${v.varjo}`);
  }
  // Kahden lyhdyn keskiarvo, ei kumpikaan yksin.
  assert.equal(laatikonValo([LYHTY_MIN, LYHTY_MAX]).varjo, 0.5);
  // Tyhjä lista (ei lyhtyjä) ei kaada laskentaa.
  assert.equal(laatikonValo([]).varjo, 0);
});

test('asetaLaatikonValo kirjoittaa muuttujat eikä kaadu ilman elementtiä', () => {
  const el = { style: { vars: {}, setProperty(k, v) { this.vars[k] = v; } } };
  asetaLaatikonValo(el, laatikonValo([LYHTY_MIN, LYHTY_MIN]));
  assert.equal(el.style.vars['--lyhty-varjo'], '1.000');
  assert.equal(el.style.vars['--lyhty-ulko'], '0.155');
  assert.doesNotThrow(() => asetaLaatikonValo(null, { varjo: 0, ulko: 0 }));
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
