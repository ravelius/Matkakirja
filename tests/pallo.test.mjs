import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { pallonKaupungit, sukelluskohta, pallonLaatta, laatatSaatavilla, PALLO_KIRJASTO, PALLO_TEKSTUURI, PALLO_TEKSTUURIVERSIO, PALLO_TEKSTUURITASO, PALLO_LAATAT, PALLO_LAATTAVERSIO, PALLO_LAATTAKANSIO, laattatasoMax, PALLO_LAATTATASO_MAX, PALLO_SUKELLUSLEVEYS, laattakynnykset, lepokerroin, LAATU_TERAVYYS, LAATU_LEPOVIIVE_MS, LAATU_LIIKEVIIVE_MS, LAATU_PIKSELISUHDE_LEPO, LAATU_PIKSELISUHDE_LIIKE } from '../js/pallo.js';
import { laatanReunat, rivinLeveysaste, julisteenLeveysvali, tasonLaatat, lahdetaso, laattojenKansio, LAATTA, tayteRivilla, nostaReuna, JAA_RAJA, JAA_SAVY, MERI_SAVY } from '../tools/tee-pallolaatat.mjs';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LINSSI as PALLOLINSSI } from '../js/linssit/pallo.js';
import { PERUSLINSSIT, omistetut } from '../js/linssit/omistus.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { arkinPikseli, pinnoitteenAvain, pinnoitteenMitat, PINNOITE } from '../tools/tee-pallotekstuuri.mjs';
// Vaihe 5c: laatat offline, varapolku ja turvatila.
import {
  ESILATAUKSEN_KAUPUNKITASO, ESILATAUKSEN_MAAILMATASO, esilataaPallolaatat, esilatauksenLaatat,
  laatanKoordinaatit,
} from '../js/pallo.js';
import {
  PALLON_SALLITTU_VENYTYS, PALLOLAUDAN_SAAPUMISLEVEYS, PALLOLAUDAN_SIIRTOLEVEYS, PALLO_KORKEUS_MIN,
  korkeusLeveydesta, laatanTarkkuus, lahinKorkeus, lahinLeveys,
} from '../js/pallolauta/kamera.js';
import { OSOITTIMEN_JALKIVIIVE_MS } from '../js/pallolauta/lauta.js';
import {
  PALLON_TURVATILAN_RAJA, PALLON_TURVATILAN_UNOHDUS_MS, nollaaPallonKaatumiset, palloKaatui,
  palloTurvatilassa, pallonKaatumiset,
} from '../js/ui-apurit.js';

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
  /*
   * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026 täsmensi 4.9.:n
   * "älä lisää mitään sen päälle"): valikkopallo (js/pallo.js) on yhä
   * pelkkä pinnoite, ja pallolaudalla (js/pallolauta/) sallitaan VAIN
   * pelin merkit — sallittujen kerrosten lista on lauta.js:n
   * PALLOLAUDAN_KERROKSET (tests/pallolauta.test.mjs vartioi sen).
   * Kartan kerrokset (nimet, reitit, renkaat) ovat kiellettyjä kummallakin.
   */
  const pallo = lue('../js/pallo.js');
  for (const kielletty of ['pointsData', 'labelsData', 'arcsData', 'ringsData', 'htmlElementsData', 'pathsData']) {
    assert.ok(!pallo.includes(`.${kielletty}(`), `${kielletty}: valikkopallon päälle ei lisätä mitään (omistaja 4.9.2026)`);
  }
  // Pallolauta on kansio (lauta, kamera, merkit, reitit, siirto — vaihe 2):
  // kartan kerrokset kiellettyjä kaikissa, pelin merkit jossakin niistä.
  const kansio = new URL('../js/pallolauta/', import.meta.url);
  const pallolauta = readdirSync(kansio).map((nimi) => readFileSync(new URL(nimi, kansio), 'utf8')).join('\n');
  // polygonsData on 5.9.2026 alkaen LINSSIN kerros pallolaudalla
  // (karttapallo.md luku 10.1, js/pallolauta/linssit.js): peli ei piirrä
  // sinne mitään, joten kartan kerrosten kielto koskee muita.
  for (const kielletty of ['labelsData', 'ringsData', 'hexBinPointsData', 'tilesData']) {
    assert.ok(!pallolauta.includes(`.${kielletty}(`), `${kielletty}: pallolaudalle ei piirretä karttaa kerroksena (Raamattu 5.9.2026)`);
  }
  for (const sallittu of ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData']) {
    assert.ok(pallolauta.includes(`.${sallittu}(`), `${sallittu}: pelin merkit ovat pallolaudalla (Raamattu 5.9.2026)`);
  }
  assert.match(pallo, /\.onGlobeClick\(/);
  // Nipistys ei ole napautus (iPhone-bugi 4.9.2026): toinen sormi
  // merkitsee eleen nipistykseksi, ja napautus hylätään sen ajaksi.
  assert.match(pallo, /if \(sormet\.nipistys\) return;/);
  assert.match(pallo, /if \(sormet\.alhaalla > 1\) sormet\.nipistys = true;/);
  assert.match(pallo, /addEventListener\('pointercancel', irrota\)/);
  // Sormi pysyy kartan kohdassa: kiertonopeus lasketaan korkeudesta joka muutoksessa.
  assert.match(pallo, /ohjaimet\.rotateSpeed = korkeus \* Math\.tan\(\(kamera\.fov \/ 2\) \* \(Math\.PI \/ 180\)\) \/ Math\.PI;/);
  assert.match(pallo, /ohjaimet\.addEventListener\('change', tahdistaVeto\)/);
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
  assert.equal(PALLO_LAATTAKANSIO, `${PALLO_LAATTAVERSIO}-nostot-b`, 'nimet ja kohteet laatoissa, navat merta ilman hattua (5.9.2026 klo 15)');
  assert.equal(PALLO_LAATAT, `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/${laattojenKansio(PALLO_LAATTAVERSIO, true, 'b')}`);
  assert.equal(pallonLaatta(3, 5, 4), `${PALLO_LAATAT}4/3/5.jpg`);
  assert.equal(PALLO_LAATTATASO_MAX, 8, 'taso 8 kaytossa 5.9.2026');
  // Luettelon puute tai virhe → varatekstuuri, ei kaatumista.
  assert.equal(await laatatSaatavilla(async () => ({ ok: false })), null);
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 7 } }), 7, 'varakansio ei kanna tasoa 8: vanha napalakki sekoittuisi (5.9.2026 klo 17.30)');
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 6 } }), 6);
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 8 } }), 8, 'luettelon 8 riittaa, kun sarja b kantaa sen');
  assert.match(pallonLaatta(3, 5, 8), /laatat\/2026-09-03a-nostot-b\/8\/3\/5\.jpg$/, 'taso 8 samasta kansiosta (varakansio pois 5.9.2026 klo 17.30)');
  assert.match(pallonLaatta(3, 5, 7), /laatat\/2026-09-03a-nostot-b\/7\/3\/5\.jpg$/, 'tasot 0-7 nostosarjasta b');
  assert.equal(laattatasoMax({ tasot: { min: 0, max: 9 } }), PALLO_LAATTATASO_MAX);
  assert.equal(laattatasoMax(null), PALLO_LAATTATASO_MAX);
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /globeTileEngineUrl\(pallonLaatta\)\.globeTileEngineMaxLevel\(laattatasoMax\(laatat\)\)/);
  assert.match(pallo, /pallo\.globeImageUrl\(PALLO_TEKSTUURI\)/);
  // Laattatyökalu: slippy map -geometria ja lähdetasot.
  assert.equal(LAATTA, 256);
  assert.deepEqual(laatanReunat(0, 0, 0).lansi, -180);
  assert.ok(Math.abs(laatanReunat(1, 1, 0).pohjoinen - 85.0511) < 1e-3);
  assert.ok(Math.abs(rivinLeveysaste(1, 1, 255) + 85.0511) < 0.2);
  assert.equal(lahdetaso(0), 0); assert.equal(lahdetaso(7), 6);
  assert.equal(tasonLaatat(3).length, 64);
  assert.equal(tasonLaatat(3, [-10, 40, 30, 70]).length, 6, 'Eurooppa osuu kuuteen Z3-laattaan (2 saraketta x 3 rivia)');
  const luettelo = { projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 }, rajaus: { x: 0, y: -611.3, w: 12000, h: 6422.7 }, kehys: { yla: 232, ala: 240 } };
  const vali = julisteenLeveysvali(luettelo);
  // Vain kartta: kartussi ja kehys (rajauksen yläpuoli, arkin alakehys etelässä) jäävät
  // pois (5.9.2026), mutta kartta ulottuu rajauksen yläreunaan ≈ 84° N — Huippuvuoret ja
  // Frans Joosefin maa eivät katoa (5.9.2026 iltapäivä: "Miksi hattu näkyy?").
  assert.ok(vali.pohjoinen > 83.9 && vali.pohjoinen < 84.1, JSON.stringify(vali));
  assert.ok(vali.etela < -60 && vali.etela > -64, JSON.stringify(vali));
  const ilmanKehysta = julisteenLeveysvali({ ...luettelo, kehys: undefined });
  assert.ok(ilmanKehysta.etela < -65 && ilmanKehysta.etela > -67, 'ilman kehystietoa rajaus sellaisenaan');
  // Workflow vie laatat ja luettelon oikeaan kansioon.
  const wf = lue('../.github/workflows/tee-pallolaatat.yml');
  assert.match(wf, /cat pallolaatat-ulos\/kansio\.txt/);
  assert.match(wf, /--include '\*\.jpg'/);
  assert.match(wf, /laatat\.json/);
  // Nostotaso (nimet, karttanostot) poltetaan omaan kansioon (5.9.2026).
  assert.equal(laattojenKansio('2026-09-03a', true), 'julisteet/pallo/laatat/2026-09-03a-nostot/');
  assert.match(wf, /--nostot/);
  // Muuttunut piirto → uusi kansio (laatat vuoden välimuistissa): --tunniste (5.9.2026).
  assert.equal(laattojenKansio('2026-09-03a', true, 'b'), 'julisteet/pallo/laatat/2026-09-03a-nostot-b/');
  assert.match(wf, /--tunniste \{0\}/);
  assert.match(wf, /inputs\.tunniste/);
  // Napalakki: pohjoisessa täyte on merta napaan asti, etelässä meri liukuu jääksi ilman rajaa.
  assert.equal(JAA_RAJA.pohjoinen, null);
  assert.deepEqual(tayteRivilla(85, [200, 194, 175]), [200, 194, 175], 'Jäämeri on merta');
  assert.deepEqual(tayteRivilla(-69, [200, 194, 175]), [200, 194, 175]);
  assert.deepEqual(tayteRivilla(-85, [200, 194, 175]), JAA_SAVY, 'Etelämanner on jäätä');
  const puoli = tayteRivilla(JAA_RAJA.etela - 2, [200, 194, 175]);
  assert.ok(puoli[0] > 200 && puoli[0] < JAA_SAVY[0], `liuku ${puoli}`);
  assert.deepEqual(tayteRivilla(80), MERI_SAVY, 'oletus ilman mittausta');
  // Reunavarjon nosto: merenkaltainen tumma pikseli nousee merisävyyn, maa ja rantaviiva eivät.
  const meri = [200, 194, 175];
  const puskuri = Uint8Array.from([189, 181, 162, 235, 215, 150, 90, 80, 60, 200, 194, 175]);
  assert.equal(nostaReuna(puskuri, 0, meri, 1), true);
  assert.deepEqual([...puskuri.slice(0, 3)], meri, 'varjo → meri');
  assert.equal(nostaReuna(puskuri, 3, meri, 1), false, 'maa (kyllainen) jää');
  assert.equal(nostaReuna(puskuri, 6, meri, 1), false, 'rantaviiva (tumma) jää');
  assert.equal(nostaReuna(puskuri, 9, meri, 0), false, 'kaistan ulkopuolella ei nosteta');
  assert.deepEqual([...puskuri.slice(3)], [235, 215, 150, 90, 80, 60, 200, 194, 175]);
  // Liike jatkuu sormen irrottua: kitka ja kynnys (5.9.2026).
  const pallo2 = lue('../js/pallo.js');
  assert.match(pallo2, /const VAUHTI_KITKA = 0\.0028;/);
  assert.match(pallo2, /requestAnimationFrame\(\(\) => liu\(/);
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

test('laatu palaa levossa: kynnykset ruudun pikseleistä, liike kevyt (omistaja 5.9.2026)', () => {
  // Kirjaston oma taulukko: taso t, kun 8/2^t ≤ korkeus.
  const oletus = laattakynnykset();
  assert.equal(oletus.length, 30);
  assert.equal(oletus[0], 8);
  assert.equal(oletus[3], 1);
  // Lepokerroin iPhonen pystyruudulle (771 css-px × 3): 2^t ≥ 0,0263·H/h.
  const k = lepokerroin(771 * 3);
  const taso = (h, kerroin) => Math.min(PALLO_LAATTATASO_MAX, laattakynnykset(kerroin).findIndex((x) => x <= h));
  assert.equal(taso(0.135, 1), 6, 'kirjaston taso korkeudella 0,135');
  assert.equal(taso(0.135, k), 8, 'levossa syvin taso (kirjasto rajaa maxLeveliin)');
  assert.equal(taso(2.5, k), 4, 'koko pallo levossa tasolla 4, ei 5 (128 laattaa)');
  assert.equal(lepokerroin(100), 1, 'ei koskaan karkeampi kuin kirjasto');
  assert.ok(LAATU_TERAVYYS >= 0.5 && LAATU_TERAVYYS <= 1);
  assert.ok(k > 3.5 && k < 5, `kerroin ${k}`);
  assert.ok(LAATU_LEPOVIIVE_MS >= 200 && LAATU_LEPOVIIVE_MS <= 400);
  assert.ok(LAATU_LIIKEVIIVE_MS > 0 && LAATU_LIIKEVIIVE_MS < LAATU_LEPOVIIVE_MS);
  assert.equal(LAATU_PIKSELISUHDE_LIIKE, 2, 'liikkeessä kirjaston katto');
  assert.equal(LAATU_PIKSELISUHDE_LEPO, 3, 'levossa iPhonen koko dpr');
  // Laatunosto kytketään vain laatoitettuun palloon; purkaja palauttaa.
  const lahde = readFileSync(new URL('../js/pallo.js', import.meta.url), 'utf8');
  assert.match(lahde, /globeTileEngineMaxLevel\(laattatasoMax\(laatat\)\);\n\s+asennaLaatunosto\(pallo, kotelo\);/);
  assert.match(lahde, /moottori\.updatePov = alkuperainen;/);
  assert.match(lahde, /map\.anisotropy = maxAniso/);
});

/*
 * ======== VAIHE 5c: LAATAT OFFLINE, VARAPOLKU JA TURVATILA ==========
 * (docs/moduulit/karttapallo.md luku 6 ja luvun 7 vaihe 5: *"SW-välimuisti
 * vendorille ja laatoille; varapolku + turvatila; Z8 käyttöön ja lähin
 * korkeus laattatarkkuudesta; hover-raycast pois"*)
 */

test('esilataus: karkea maailma ja aloituskaupunki laattojen koriin', () => {
  const osoitteet = esilatauksenLaatat({ lat: 51.5, lon: -0.12 });
  // Koko maailma tasoille 0–3 = 1 + 4 + 16 + 64 = 85 laattaa, ja
  // aloituskaupungin ympäriltä 3 × 3 tasolla 4.
  assert.equal(osoitteet.length, 85 + 9, `esilatauksessa ${osoitteet.length} laattaa`);
  assert.equal(new Set(osoitteet).size, osoitteet.length, 'sama laatta kahdesti');
  assert.ok(osoitteet.every((u) => u.startsWith(PALLO_LAATAT) && u.endsWith('.jpg')));
  assert.ok(osoitteet.includes(pallonLaatta(0, 0, 0)), 'koko pallo tasolla 0');
  assert.equal(osoitteet.filter((u) => u.includes(`${PALLO_LAATAT}3/`)).length, 64, 'taso 3 kokonaan');
  // Lontoo on Z4-laatassa 7/5 (todennettu ämpäristä 5.9.2026).
  assert.deepEqual(laatanKoordinaatit(51.5, -0.12, 4), { x: 7, y: 5 });
  assert.ok(osoitteet.includes(pallonLaatta(7, 5, 4)), 'aloituskaupungin laatta');
  assert.deepEqual(laatanKoordinaatit(0, 0, 1), { x: 1, y: 1 }, 'nollameridiaani ja päiväntasaaja');
  // Luettelon matalampi katto rajaa myös esilatauksen.
  const matala = esilatauksenLaatat({ maxTaso: 2 });
  assert.equal(matala.length, 1 + 4 + 16, 'maxTaso rajaa maailman');
  assert.ok(matala.every((u) => !u.includes(`${PALLO_LAATAT}4/`)), 'ei kaupunkitasoa ilman laattoja');
  assert.equal(ESILATAUKSEN_MAAILMATASO, 3);
  assert.equal(ESILATAUKSEN_KAUPUNKITASO, 4);
});

test('esilataus lähtee palvelutyöntekijälle kerran ja vain jos se on olemassa', async () => {
  assert.equal(await esilataaPallolaatat({}, undefined), null, 'ei työntekijää (yhden tiedoston versio)');
  const viestit = [];
  const nav = {
    serviceWorker: {
      ready: Promise.resolve({ active: null }),
      controller: { postMessage: (v) => viestit.push(v) },
    },
  };
  await esilataaPallolaatat({ lat: 51.5, lon: -0.12 }, nav);
  assert.equal(viestit.length, 1, 'viesti ei lähtenyt');
  assert.equal(viestit[0].tyyppi, 'esilataa-pallolaatat');
  assert.equal(viestit[0].kansio, PALLO_LAATTAKANSIO);
  assert.ok(viestit[0].osoitteet.length >= 85);
  await esilataaPallolaatat({}, nav);
  assert.equal(viestit.length, 1, 'esilataus lähti kahdesti samassa istunnossa');
});

test('lähin korkeus tulee laattatarkkuudesta ja laitteen dpr:stä (Z8 = 182 px/aste)', () => {
  assert.ok(Math.abs(laatanTarkkuus(8) - 182.04) < 0.1, `Z8 ${laatanTarkkuus(8)}`);
  assert.equal(laatanTarkkuus(7) * 2, laatanTarkkuus(8), 'taso tuplaa tarkkuuden');
  assert.equal(PALLON_SALLITTU_VENYTYS, 2, 'laatan pikseli enintään kahtena (karttapallo.md luku 6)');
  // iPhone 390 css × dpr 2, Z8: 780 / (2 · 182) = 2,14° ≈ 71 lautayksikköä.
  const leveys = lahinLeveys({ taso: 8, leveysPx: 390, dpr: 2 });
  assert.ok(Math.abs(leveys - 71.4) < 2, `Z8 lähin leveys ${leveys}`);
  // Sama korkeutena on suunnitelman 0,04 (PALLO_KORKEUS_MIN:n oletusarvo).
  const korkeus = lahinKorkeus({ taso: 8, leveysPx: 390, dpr: 2 });
  assert.ok(Math.abs(korkeus - PALLO_KORKEUS_MIN) < 0.004, `korkeus ${korkeus}`);
  // Z7 (nykyinen laatat.json) on tasan kaksi kertaa kauempana (ilman kattoa).
  assert.ok(Math.abs(lahinLeveys({ taso: 7, leveysPx: 390, dpr: 2, katto: Infinity }) - 2 * leveys) < 0.01);
  // Tarkempi ruutu vaatii kauemmas: dpr 3 on 1,5-kertainen.
  assert.ok(Math.abs(lahinLeveys({ taso: 8, leveysPx: 390, dpr: 3 }) - 1.5 * leveys) < 0.01);
  // KATTO: raja ei koskaan estä pelin omaa lähintä näkymää (iPadilla
  // Z7 vaatisi 305 yksikköä, jolloin ennakkozoomi ei zoomaisi mihinkään).
  assert.equal(lahinLeveys({ taso: 7, leveysPx: 834, dpr: 2 }), PALLOLAUDAN_SIIRTOLEVEYS);
  assert.ok(PALLOLAUDAN_SIIRTOLEVEYS < PALLOLAUDAN_SAAPUMISLEVEYS, 'siirtonäkymä on saapumista lähempänä');
  assert.ok(lahinLeveys({ taso: 8, leveysPx: 390, dpr: 3 }) < PALLOLAUDAN_SIIRTOLEVEYS, 'puhelimella katto ei purista');
  // Kamera ei mene rajan alle: korkeusLeveydesta saa minimin parametrina.
  assert.equal(korkeusLeveydesta(1, { min: 0.08 }), 0.08);
  // Lauta johtaa tason laattaluettelosta ja putoaa Z7:ään ilman luetteloa.
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /const laattataso = laatat \? laattatasoMax\(laatat\) : PALLO_LAATTATASO_MAX - 1;/);
  assert.match(lauta, /ohj\.minDistance = pallonSade \* \(1 \+ kamera\.korkeusMin\(\)\);/);
});

test('turvatila: kaksi kaatumista peräkkäin sulkee pallon tältä laitteelta', () => {
  // Laskuri on laitteen asetus (localStorage), ei pelitilan kenttä.
  const muisti = new Map();
  const varasto = {
    getItem: (k) => (muisti.has(k) ? muisti.get(k) : null),
    setItem: (k, v) => muisti.set(k, v),
    removeItem: (k) => muisti.delete(k),
  };
  assert.equal(pallonKaatumiset(varasto), 0);
  assert.equal(palloTurvatilassa(varasto), false);
  assert.equal(palloKaatui(varasto), 1);
  assert.equal(palloTurvatilassa(varasto), false, 'yksi kaatuminen ei sulje palloa');
  assert.equal(palloKaatui(varasto), PALLON_TURVATILAN_RAJA);
  assert.equal(palloTurvatilassa(varasto), true, 'kahden jälkeen turvatila');
  assert.equal(muisti.get('matkakirja-pallo-kaatumiset'), '2', 'laskuri talteen omalla avaimella');
  // Vipu (ratasvalikko) ja vakaa istunto nollaavat.
  nollaaPallonKaatumiset(varasto);
  assert.equal(pallonKaatumiset(varasto), 0);
  assert.equal(palloTurvatilassa(varasto), false);
  assert.ok(PALLON_TURVATILAN_UNOHDUS_MS >= 10000, 'vakaan istunnon mitta');
  // Turvatila luetaan käynnistyksessä ja pelaaja saa yhden rivin.
  const ui = lue('../js/ui.js');
  assert.match(ui, /if \(palloTurvatilassa\(\)\) \{ this\.ilmoitaPallonTurvatila\(\); return false; \}/);
  assert.match(ui, /Karttapallo pois käytöstä tällä laitteella — kytke päälle ratasvalikosta\./);
  // Kaatumiset: WebGL puuttuu, rakentaminen kaatuu tai konteksti kuolee.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /if \(!webglTuettu\(document\)\) \{\n\s+palloKaatui\(\);/);
  assert.match(lauta, /addEventListener\('webglcontextlost', kontekstiKuoli\)/);
  assert.match(lauta, /if \(uudelleenrakennuksia < 1\) \{/, 'yksi uudelleenrakennus ennen varapolkua');
  assert.match(lauta, /ui\.pallolautaVarapolku\?\.\(\)/);
  assert.match(lauta, /nollaaPallonKaatumiset\(\), PALLON_TURVATILAN_UNOHDUS_MS/);
  // Kehittäjän/pelaajan vipu nollaa laskurin.
  assert.match(lue('../index.html'), /id="kehittaja-pallo-turvatila-btn"/);
  assert.match(lue('../js/main.js'), /palloTurvatilaNappi\?\.addEventListener\('click'/);
});

test('hover-raycast pois kosketuslaitteilla, napautus säilyy', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Kirjaston oma silmukka raycastaa joka kehys, kun tämä on päällä.
  assert.match(lauta, /const kosketuslaite = Boolean\(globalThis\.matchMedia\?\.\('\(hover: none\)'\)\?\.matches\);/);
  assert.match(lauta, /pallo\.enablePointerInteraction\?\.\(false\);/);
  // Napautus tarvitsee raycastin: päälle sormen laskeutuessa (kaappaus
  // ennen kirjaston omaa kuuntelijaa), pois vasta klikin jälkeen.
  assert.match(lauta, /document\.addEventListener\('pointerdown', osoitinPaalle, true\);/);
  assert.match(lauta, /pallo\.enablePointerInteraction\?\.\(true\);/);
  assert.ok(OSOITTIMEN_JALKIVIIVE_MS >= 200 && OSOITTIMEN_JALKIVIIVE_MS <= 800);
});
