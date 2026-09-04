import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pallonKaupungit, pallonReitit, PALLO_KIRJASTO, PALLO_TEKSTUURI, PALLO_TEKSTUURIVERSIO, PALLO_SUKELLUSLEVEYS } from '../js/pallo.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { arkinPikseli, pinnoitteenAvain, PINNOITE } from '../tools/tee-pallotekstuuri.mjs';

/*
 * KARTTAPALLO (omistaja 4.9.2026: "Globe GL toimii hienosti"). Pallo on
 * maailmanvalikko: kaupungit ja reitit laudalta asteiksi, napautus
 * sukeltaa laudalle. Kirjasto ja pinnoite tulevat ämpäristä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('laudalta asteiksi on projisoinnin käänteinen ja osuu tunnettuihin kaupunkeihin', () => {
  const lontoo = MAAILMANKARTTA.cities.find((c) => c.id === 'lontoo');
  const a = laudaltaAsteiksi('maailmankartta', lontoo.x, lontoo.y);
  assert.ok(Math.abs(a.lat - 51.5) < 0.4 && Math.abs(a.lon - (-0.12)) < 0.4, `Lontoo ${a.lat}, ${a.lon}`);
  for (const [lon, lat] of [[24.94, 60.17], [-43.2, -22.9], [139.7, 35.7], [-175, 10]]) {
    const p = projisoiLaudalle('maailmankartta', lon, lat);
    const takaisin = laudaltaAsteiksi('maailmankartta', p.x, p.y);
    assert.ok(Math.abs(takaisin.lat - lat) < 1e-6 && Math.abs(takaisin.lon - lon) < 1e-6, `${lon},${lat} → ${takaisin.lon},${takaisin.lat}`);
  }
  assert.equal(laudaltaAsteiksi('maailmankartta', NaN, 1), null);
});

test('pallon kaupungit ja reitit tulevat laudalta, käydyt ja aloituskaupungit merkittyinä', () => {
  const kaupungit = pallonKaupungit(MAAILMANKARTTA, new Set(['lontoo', 'pariisi']));
  assert.equal(kaupungit.length, MAAILMANKARTTA.cities.length);
  const lontoo = kaupungit.find((k) => k.id === 'lontoo');
  assert.ok(lontoo.kayty && lontoo.alku && lontoo.x === 5829.5, 'Lontoo: käyty, aloitus, laudan x säilyy sukellusta varten');
  assert.ok(kaupungit.every((k) => Math.abs(k.lat) <= 90 && Math.abs(k.lon) <= 180));
  const reitit = pallonReitit(MAAILMANKARTTA, kaupungit);
  assert.equal(reitit.length, MAAILMANKARTTA.edges.length, 'jokaisen reitin molemmat päät ovat pallolla');
  assert.ok(reitit.every((r) => r.a.n && r.b.n));
});

test('kirjasto ja pinnoite tulevat pelin ämpäristä, ei reposta', () => {
  assert.match(PALLO_KIRJASTO, /^https:\/\/pub-[a-z0-9]+\.r2\.dev\/vendor\/globe\.gl-\d+\.\d+\.\d+\.min\.js$/);
  assert.equal(PALLO_TEKSTUURI, `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/${pinnoitteenAvain(PALLO_TEKSTUURIVERSIO)}`);
  assert.ok(PALLO_SUKELLUSLEVEYS > 300 && PALLO_SUKELLUSLEVEYS < 2000);
  // Workflow vie samat kaksi: pinnoitteen avaimen ja kirjaston vendor-polun.
  const wf = lue('../.github/workflows/tee-pallotekstuuri.yml');
  assert.match(wf, /npm install --no-save --no-fund --no-audit sharp/);
  assert.match(wf, /s3:\/\/\$\{R2_BUCKET\}\/vendor\/globe\.gl-\$\{v\}\.min\.js/);
  assert.match(wf, /cat pallotekstuuri-ulos\/avain\.txt/);
  assert.equal(PINNOITE.leveys, PINNOITE.korkeus * 2, 'tasavälinen pinnoite on 2:1');
});

test('pinnoitteen pikselihaku: juliste kattaa 76° N – Etelämanner, navat jäävät ulkopuolelle', () => {
  const luettelo = {
    projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 },
    arkki: { x: 0, y: -1046.3, w: 12000, h: 7307.7 },
    rajaus: { x: 0, y: -611.3, w: 12000, h: 6422.7 },
  };
  const taso = { z: 2, leveys: 2700, korkeus: 1644, pikseliaPerYksikko: 0.225 };
  const lontoo = arkinPikseli(luettelo, taso, -0.12, 51.5);
  assert.ok(lontoo && lontoo.px > 1300 && lontoo.px < 1320 && lontoo.py > 520 && lontoo.py < 560, JSON.stringify(lontoo));
  assert.equal(arkinPikseli(luettelo, taso, 0, 89), null, 'pohjoisnapa on julisteen ulkopuolella');
  assert.equal(arkinPikseli(luettelo, taso, 0, -85), null, 'Etelämanner on julisteen ulkopuolella');
  // Sauma: lon0 - 1° on arkin oikeassa laidassa, lon0 vasemmassa.
  assert.ok(arkinPikseli(luettelo, taso, -176, 0).px > 2650);
  assert.ok(arkinPikseli(luettelo, taso, -175, 0).px < 1);
});

test('pallo on valikossa, ui avaa sen laiskasti ja kuori on SHELLissä', () => {
  assert.match(lue('../index.html'), /id="pallo-btn"/);
  assert.match(lue('../js/main.js'), /getElementById\('pallo-btn'\)\?\.addEventListener\('click', \(\) => \{\n  suljeValikko\(\);\n  window\.matkakirja\?\.ui\?\.avaaPallo\(\);/);
  assert.match(lue('../js/ui.js'), /async avaaPallo\(\) \{[\s\S]{0,300}import\('\.\/pallo\.js'\)/);
  assert.match(lue('../sw.js'), /'\.\/js\/pallo\.js'/);
  const pallo = lue('../js/pallo.js');
  // Sukellus on kamera-ajo nykyiselle laudalle, ei laudan vaihto.
  assert.match(pallo, /ui\.kartta\?\.ajaKamera\?\.\(\{ x: k\.x, y: k\.y, leveys: PALLO_SUKELLUSLEVEYS \}, \{ kesto: 1400 \}\)/);
  // Kirjaston latausvirhe ei kaada peliä vaan näkyy kuoressa.
  assert.match(pallo, /tila\.textContent = 'Karttapallo ei latautunut/);
  assert.match(lue('../css/styles.css'), /\.pallo-kuori \{[\s\S]*?z-index: 45;/);
});
