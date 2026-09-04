import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pallonKaupungit, sukelluskohta, pallonLaatta, laatatSaatavilla, PALLO_KIRJASTO, PALLO_TEKSTUURI, PALLO_TEKSTUURIVERSIO, PALLO_TEKSTUURITASO, PALLO_LAATAT, PALLO_LAATTAVERSIO, PALLO_LAATTATASO_MAX, PALLO_SUKELLUSLEVEYS } from '../js/pallo.js';
import { laatanReunat, rivinLeveysaste, julisteenLeveysvali, tasonLaatat, lahdetaso, laattojenKansio, LAATTA } from '../tools/tee-pallolaatat.mjs';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LINSSI as PALLOLINSSI } from '../js/linssit/pallo.js';
import { PERUSLINSSIT, omistetut } from '../js/linssit/omistus.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { arkinPikseli, pinnoitteenAvain, pinnoitteenMitat, PINNOITE } from '../tools/tee-pallotekstuuri.mjs';

/*
 * KARTTAPALLO (omistaja 4.9.2026: "Globe GL toimii hienosti"; illalla
 * "Tee z4 ainoaksi ja älä lisää mitään sen päälle. Eli ei reittejä tai
 * nimiä. Lisää pallo yhdeksi linssiksi matkalaukkuun ja ota pois
 * kehittäjä valikosta"). Pallo on pelkkä pinnoite; napautus sukeltaa
 * laudalle napautettuun kohtaan. Kirjasto ja pinnoite tulevat ämpäristä.
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

test('pallon kaupungit tulevat laudalta ja napautus sukeltaa napautettuun kohtaan', () => {
  const kaupungit = pallonKaupungit(MAAILMANKARTTA, new Set(['lontoo', 'pariisi']));
  assert.equal(kaupungit.length, MAAILMANKARTTA.cities.length);
  const lontoo = kaupungit.find((k) => k.id === 'lontoo');
  assert.ok(lontoo.kayty && lontoo.alku && lontoo.x === 5829.5, 'Lontoo: käyty, aloitus, laudan x säilyy kameran kotia varten');
  assert.ok(kaupungit.every((k) => Math.abs(k.lat) <= 90 && Math.abs(k.lon) <= 180));
  // Napautus Lontoon asteisiin osuu Lontoon laudan koordinaattiin.
  const kohta = sukelluskohta(lontoo.lat, lontoo.lon);
  assert.ok(Math.abs(kohta.x - lontoo.x) < 1e-6 && Math.abs(kohta.y - lontoo.y) < 1e-6, JSON.stringify(kohta));
  assert.equal(sukelluskohta(NaN, 0), null);
  // Pallolla ei ole mitään pinnoitteen päällä.
  const pallo = lue('../js/pallo.js');
  for (const kielletty of ['pointsData', 'labelsData', 'arcsData', 'ringsData', 'htmlElementsData']) {
    assert.ok(!pallo.includes(`.${kielletty}(`), `${kielletty}: pallon päälle ei lisätä mitään (omistaja 4.9.2026)`);
  }
  assert.match(pallo, /\.onGlobeClick\(/);
  // Nipistys ei ole napautus (iPhone-bugi 4.9.2026): toinen sormi
  // merkitsee eleen nipistykseksi, ja napautus hylätään sen ajaksi.
  assert.match(pallo, /if \(sormet\.nipistys\) return;/);
  assert.match(pallo, /if \(sormet\.alhaalla > 1\) sormet\.nipistys = true;/);
  assert.match(pallo, /addEventListener\('pointercancel', irrota\)/);
});

test('kirjasto ja pinnoite tulevat pelin ämpäristä, ei reposta', () => {
  assert.match(PALLO_KIRJASTO, /^https:\/\/pub-[a-z0-9]+\.r2\.dev\/vendor\/globe\.gl-\d+\.\d+\.\d+\.min\.js$/);
  assert.equal(PALLO_TEKSTUURITASO, 4, 'z4 on ainoa pinnoite (omistaja 4.9.2026)');
  assert.equal(PALLO_TEKSTUURI, `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/${pinnoitteenAvain(PALLO_TEKSTUURIVERSIO, 4)}`);
  assert.match(PALLO_TEKSTUURI, /tekstuuri-z4\.jpg$/);
  assert.deepEqual(pinnoitteenMitat(4), { leveys: 8192, korkeus: 4096, laatu: 82 });
  assert.match(lue('../.github/workflows/tee-pallotekstuuri.yml'), /default: '4'/);
  assert.ok(PALLO_SUKELLUSLEVEYS > 300 && PALLO_SUKELLUSLEVEYS < 2000);
  // Workflow vie samat kaksi: pinnoitteen avaimen ja kirjaston vendor-polun.
  const wf = lue('../.github/workflows/tee-pallotekstuuri.yml');
  assert.match(wf, /npm install --no-save --no-fund --no-audit sharp/);
  assert.match(wf, /s3:\/\/\$\{R2_BUCKET\}\/vendor\/globe\.gl-\$\{v\}\.min\.js/);
  assert.match(wf, /cat pallotekstuuri-ulos\/avain\.txt/);
  assert.equal(PINNOITE.leveys, PINNOITE.korkeus * 2, 'tasavälinen pinnoite on 2:1');
});

test('laatoitettu pallo: Mercator-laatat ämpäristä, z4-tekstuuri varana', async () => {
  // Kirjasto on laattamoottorin tuova 2.46 tai uudempi.
  const versio = PALLO_KIRJASTO.match(/globe\.gl-(\d+)\.(\d+)\.\d+\.min\.js$/);
  assert.ok(versio && (Number(versio[1]) > 2 || Number(versio[2]) >= 46), PALLO_KIRJASTO);
  assert.equal(PALLO_LAATAT, `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/${laattojenKansio(PALLO_LAATTAVERSIO)}`);
  assert.equal(pallonLaatta(3, 5, 4), `${PALLO_LAATAT}4/3/5.jpg`);
  assert.equal(PALLO_LAATTATASO_MAX, 7);
  // Luettelon puute tai virhe → varatekstuuri, ei kaatumista.
  assert.equal(await laatatSaatavilla(async () => ({ ok: false })), false);
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /globeTileEngineUrl\(pallonLaatta\)\.globeTileEngineMaxLevel\(PALLO_LAATTATASO_MAX\)/);
  assert.match(pallo, /pallo\.globeImageUrl\(PALLO_TEKSTUURI\)/);
  // Laattatyökalu: slippy map -geometria ja lähdetasot.
  assert.equal(LAATTA, 256);
  assert.deepEqual(laatanReunat(0, 0, 0).lansi, -180);
  assert.ok(Math.abs(laatanReunat(1, 1, 0).pohjoinen - 85.0511) < 1e-3);
  assert.ok(Math.abs(rivinLeveysaste(1, 1, 255) + 85.0511) < 0.2);
  assert.equal(lahdetaso(0), 0); assert.equal(lahdetaso(7), 6);
  assert.equal(tasonLaatat(3).length, 64);
  assert.equal(tasonLaatat(3, [-10, 40, 30, 70]).length, 6, 'Eurooppa osuu kuuteen Z3-laattaan (2 saraketta x 3 rivia)');
  const luettelo = { projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 }, rajaus: { x: 0, y: -611.3, w: 12000, h: 6422.7 } };
  const vali = julisteenLeveysvali(luettelo);
  assert.ok(vali.pohjoinen > 80 && vali.pohjoinen < 86 && vali.etela < -60 && vali.etela > -70, JSON.stringify(vali));
  // Workflow vie laatat ja luettelon oikeaan kansioon.
  const wf = lue('../.github/workflows/tee-pallolaatat.yml');
  assert.match(wf, /cat pallolaatat-ulos\/kansio\.txt/);
  assert.match(wf, /--include '\*\.jpg'/);
  assert.match(wf, /laatat\.json/);
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

test('pallo on matkalaukun linssi, ei valikossa; ui avaa sen laiskasti ja kuori on SHELLissä', () => {
  assert.ok(!lue('../index.html').includes('pallo-btn'), 'valikkonappi poistui (omistaja 4.9.2026)');
  assert.ok(!lue('../js/main.js').includes('pallo-btn'));
  const ui = lue('../js/ui.js');
  assert.match(ui, /async avaaPallo\(\) \{[\s\S]{0,300}import\('\.\/pallo\.js'\)/);
  // Linssin valinta avaa pallon eikä vaihda valittua linssiä.
  assert.match(ui, /if \(tunnus === 'pallo'\) \{[\s\S]{0,200}void this\.avaaPallo\(\);\n      return;/);
  assert.match(lue('../sw.js'), /'\.\/js\/pallo\.js'/);
  assert.match(lue('../sw.js'), /'\.\/js\/linssit\/pallo\.js'/);
  // Rekisterissä, kerrokseton, maailmankartalla, perusvaruste.
  assert.ok(LINSSIT.some((r) => r.tunnus === 'pallo' && r.manner === null));
  assert.equal(PALLOLINSSI.tunnus, 'pallo');
  assert.equal(PALLOLINSSI.kerros, false);
  assert.deepEqual(PALLOLINSSI.laudat, ['maailmankartta']);
  assert.ok(PERUSLINSSIT.includes('pallo'));
  assert.ok(omistetut(null, { linssit: [] }).has('pallo'), 'pallo on omistettu heti');
  const pallo = lue('../js/pallo.js');
  // Sukellus on kamera-ajo nykyiselle laudalle, ei laudan vaihto.
  assert.match(pallo, /ui\.kartta\?\.ajaKamera\?\.\(\{ x: kohta\.x, y: kohta\.y, leveys: PALLO_SUKELLUSLEVEYS \}, \{ kesto: 1400 \}\)/);
  // Kirjaston latausvirhe ei kaada peliä vaan näkyy kuoressa.
  assert.match(pallo, /tila\.textContent = 'Karttapallo ei latautunut/);
  assert.match(lue('../css/styles.css'), /\.pallo-kuori \{[\s\S]*?z-index: 45;/);
});
