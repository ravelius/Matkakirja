// Ajattelijoiden päät kartalla (omistaja 2.10.2026 klo 12.34, vaihtoehto B): ERIKOISNOSTOT-sarake kartuutsin vieressä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  karttaAjattelijat, paanRuutupaikka, KIPSI_KARTALLA,
  maanAjattelijat, kaantoKeskustaa, sarakkeenPaikka, PAAN_KAANTO_ASTE, ERIKOISNOSTOJA_ENINTAAN,
} from '../js/ajattelijapaat.js';
import { AJATTELIJAT } from '../js/linssit/ajattelija.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('Sokrates on Kreikan ja Marcus Italian pää; muilla mailla ei päätä', () => {
  assert.deepEqual(maanAjattelijat('GRC').map((a) => a.tunnus), ['sokrates']);
  assert.deepEqual(maanAjattelijat('ITA').map((a) => a.tunnus), ['marcus']);
  assert.deepEqual(maanAjattelijat('FIN'), []);
  for (const a of Object.values(AJATTELIJAT)) assert.match(a.kartta.glb, /^ajattelijat\/kartta\/v1\/[a-z]+-kartta\.glb$/);
});

test('nenä kääntyy kohti näkymän keskustaa enintään 30°', () => {
  assert.equal(PAAN_KAANTO_ASTE, 30);
  assert.equal(kaantoKeskustaa(200, 400), 0);
  assert.equal(kaantoKeskustaa(0, 400), 30);
  assert.equal(kaantoKeskustaa(400, 400), -30);
  assert.equal(kaantoKeskustaa(-500, 400), 30);
  assert.ok(kaantoKeskustaa(300, 400) < 0);
});

test('sarake lipun alla kartuutsin oikean reunan ulkopuolella; ei mahdu → alareuna kartuutsin tasalla', () => {
  const kartuutsi = { left: 20, right: 240, top: 500, bottom: 832 };
  const mahtuu = sarakkeenPaikka({ left: 150, bottom: 560 }, kartuutsi, { korkeus: 64 });
  assert.deepEqual(mahtuu, { x: 248, y: 568, mahtuu: true });
  // Puhelin, pieni kartuutsi (mitattu 393 × 852): nimirivi päättyy 804 → pää nousee kartuutsin viereen.
  const pieni = sarakkeenPaikka({ left: 20, bottom: 804 }, { left: 20, right: 240, bottom: 832 }, { korkeus: 64 });
  assert.deepEqual(pieni, { x: 248, y: 768, mahtuu: false });
  // Avattu kartuutsi puhelimella (ruudun levyinen): sarake nousee kartuutsin yläpuolelle oikeaan reunaan.
  const avattu = sarakkeenPaikka({ left: 150, bottom: 600 }, { left: 20, right: 373, top: 520, bottom: 832 },
    { korkeus: 64, ruutuLeveys: 393 });
  assert.deepEqual(avattu, { x: 393 - 64 - 8, y: 520 - 64 - 8, mahtuu: false, ylla: true });
});

test('vain kehittäjätilassa, enintään 3, pohja rekisteröity neljään paikkaan', () => {
  assert.equal(ERIKOISNOSTOJA_ENINTAAN, 3);
  assert.match(lue('../js/main.js'), /if \(kehittajaTilaPaalla\(\)\) kytkeAjattelijaPaat\(ui, \{ kehittaja: kehittajaTilaPaalla \}\);/);
  assert.match(lue('../js/ajattelijapaat.js'), /ajattelijat\.slice\(0, ERIKOISNOSTOJA_ENINTAAN\)/);
  for (const p of ['../js/pohjat/tyylit.js', '../sw.js', '../tools/build-standalone.mjs', '../tyylikirja.html']) {
    assert.match(lue(p), /css\/pohjat\/erikoisnostot\.css/, p);
  }
  const tk = JSON.parse(lue('../tyylikirja/tyylikirja.json'));
  assert.ok(tk.pohjat.ERIKOISNOSTOT.paikka.includes('karttaobjekti'));
  assert.match(lue('../js/pohjat/tyylikirja-sivu.js'), /luoPohjaErikoisnostot\(/);
});

test('three.js ja pään GLB ladataan vasta, kun maassa on ajattelija (ei staattista three-tuontia)', () => {
  const lahde = lue('../js/ajattelijapaat.js');
  assert.doesNotMatch(lahde, /^import .*three/m);
  assert.match(lahde, /piirtaja \?\?= await luoPaanPiirtaja\(\)/);
  // Ei jatkuvaa silmukkaa levossa: piirto vain, kun asento tai valo muuttuu.
  assert.match(lahde, /if \(tila === p\.piirretty\) continue;/);
});

test('CSS: vain --tk-tokenit, piiloon linssin, lehden, paneelin ja lennon ajaksi', () => {
  const css = lue('../css/pohjat/erikoisnostot.css');
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|rgba?\(/i);
  for (const luokka of ['linssi-paalla', 'nosto-popup-auki', 'pilleri-auki', 'flight-active']) assert.ok(css.includes(`.${luokka}`), luokka);
});

test('pää on karttaobjekti kiinteässä pisteessä (omistaja 16.5x): pallon takana tai ruudun ulkopuolella piiloon', () => {
  const paat = karttaAjattelijat();
  assert.deepEqual(paat.map((a) => a.tunnus), ['sokrates', 'marcus']);
  for (const a of paat) {
    assert.equal(a.kartta.piste.length, 2);
    assert.ok(Math.abs(a.kartta.piste[0]) <= 90 && Math.abs(a.kartta.piste[1]) <= 180);
  }
  assert.deepEqual(paanRuutupaikka({ x: 200, y: 400 }, { leveys: 393, korkeus: 852 }), { x: 200, y: 400 - 64 * 0.35 });
  assert.equal(paanRuutupaikka({ x: 200, y: 400 }, { edessa: false }), null);
  assert.equal(paanRuutupaikka({ x: -500, y: 400 }, { leveys: 393, korkeus: 852 }), null);
  assert.equal(paanRuutupaikka(null), null);
});

test('kipsi kartalla: lämmin vaalea, ei sinistä ympäristövaloa, pehmeä varjo paperille (16.4x)', () => {
  const K = KIPSI_KARTALLA;
  const sininen = (hex) => (hex & 0xff) > ((hex >> 16) & 0xff);
  assert.ok(!sininen(K.ymparisto.taivas) && !sininen(K.ymparisto.maa) && !sininen(K.aurinko.vari));
  assert.ok(K.varjo.peitto > 0 && K.varjo.peitto < 0.5 && K.varjo.pehmeys >= 6);
  const css = lue('../css/pohjat/erikoisnostot.css');
  assert.doesNotMatch(css, /maataulu-auki/, 'pää näkyy maakortin aikana');
  assert.match(lue('../js/ajattelijapaat.js'), /new THREE\.ShadowMaterial/);
});
