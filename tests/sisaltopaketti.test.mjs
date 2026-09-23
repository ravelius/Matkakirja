/*
 * SISÄLTÖPAKETTI ÄMPÄRIIN — paketin skeema ja julkaisun versiointi.
 *
 * .github/workflows/vie-sisalto.yml vie jokaisesta main-mergestä
 * sisältöpaketin ämpäriin (sisalto/1/v<N>/ + uusin.json), ja natiivi peli
 * lukee sen (docs/raportit/sisallon-siirtoputki-20260923.md osa 5).
 * Työnkulku ajaa tämän testin ennen vientiä.
 *
 * Vartioidaan:
 *   1. paketti läpäisee skeemat (tools/vienti/validoi.mjs), myös
 *      kaupunkien 3D-proton pakolliset kentät (id, nimi, lat, lon, maa2);
 *   2. validaattori oikeasti hylkää rikkinäisen (ettei tarkistus ole tyhjä);
 *   3. versiointi: sama sisältö ei tee uutta versiota, muuttunut tekee,
 *      ja N lasketaan ämpärin suurimmasta versiosta (palautuksen jälkeen
 *      ei kirjoiteta olemassa olevan päälle);
 *   4. työnkulku kirjoittaa osoittimen vasta paketin jälkeen;
 *   5. skeema 1.2: kaupunkien tärkeys 0–3 (pääkaupungit ja aloitus 3) ja
 *      tiedostojen koot manifestissa;
 *   6. skeema 1.3: lehden web-riippuvuudet (web/lehti.json) ovat täydet ja
 *      tiivisteet vastaavat repon tiedostoja;
 *   7. skeema 1.4: matkustuksen hinnat (saannot) ja saapumishaut
 *      (saapuminen) vastaavat pelin omia vakioita ja funktioita.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

import { kokoaVienti, JUURI, SKEEMAVERSIO_TARKKA } from '../tools/vienti/vie-sisalto.mjs';
import { kokoaJulkaisu, tarkistaPaketti, paketinTiiviste, MIN_SOVELLUS } from '../tools/vienti/julkaise-sisalto.mjs';
import { validoiNimella } from '../tools/vienti/validoi.mjs';
import { ISO2 } from '../tools/vienti/iso2.mjs';
import { PAAKAUPUNGIT } from '../tools/vienti/paakaupungit.mjs';

const { tiedostot } = await kokoaVienti();
const kaupungit = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json'));
const JULKAISTU = '2026-09-23T12:00:00.000Z';

test('paketti läpäisee skeemat', () => {
  assert.deepEqual(tarkistaPaketti(tiedostot), []);
  assert.equal(JSON.parse(tiedostot.get('manifest.json')).skeemaversio, SKEEMAVERSIO_TARKKA);
});

test('kaupungeilla on 3D-proton pakolliset kentät ja jokaiselle maalle ISO2', () => {
  assert.equal(kaupungit.alkiot.length, 266);
  for (const k of kaupungit.alkiot) {
    assert.ok(k.id && k.nimi, k.id);
    assert.ok(Number.isFinite(k.lat) && Number.isFinite(k.lon), `${k.id}: lat/lon`);
    if (k.maa) assert.match(ISO2[k.maa] ?? '', /^[A-Z]{2}$/, `${k.maa}: ISO2 puuttuu tools/vienti/iso2.mjs:stä`);
    assert.equal(k.maa2, k.maa ? ISO2[k.maa] : null, k.id);
  }
  assert.equal(kaupungit.alkiot.find((k) => k.id === 'helsinki').maa2, 'FI');
});

test('skeema 1.2: tärkeys 0–3, pääkaupungit ja aloituskaupungit ovat 3', () => {
  const idt = new Map(kaupungit.alkiot.map((k) => [k.id, k]));
  for (const [maa, id] of Object.entries(PAAKAUPUNGIT)) {
    assert.ok(idt.has(id), `${maa}: ${id} ei ole laudalla (tools/vienti/paakaupungit.mjs)`);
    assert.equal(idt.get(id).maa, maa, `${id}: maa ${idt.get(id).maa}, taulussa ${maa}`);
    assert.equal(idt.get(id).tarkeys, 3, id);
  }
  const jakauma = [0, 0, 0, 0];
  for (const k of kaupungit.alkiot) {
    assert.ok(Number.isInteger(k.tarkeys) && k.tarkeys >= 0 && k.tarkeys <= 3, `${k.id}: tarkeys ${k.tarkeys}`);
    if (k.aloitus) assert.equal(k.tarkeys, 3, k.id);
    if (k.lentokentta) assert.ok(k.tarkeys >= 2, k.id);
    jakauma[k.tarkeys]++;
  }
  // Harvennus toimii vain, jos portaat oikeasti erottelevat.
  for (const n of jakauma) assert.ok(n >= 20, `tärkeysjakauma ${jakauma}`);
  assert.equal(idt.get('helsinki').tarkeys, 3);
  assert.equal(idt.get('washington'), undefined);
  assert.ok(validoiNimella({ ...kaupungit.alkiot[0], tarkeys: 4 }, 'kaupunki.schema.json').length);
});

test('skeema 1.2: manifestissa on jokaisen tiedoston koko tavuina', () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const koko = (polku) => Buffer.byteLength(tiedostot.get(polku));
  assert.equal(m.media.tavuja, koko(m.media.tiedosto));
  for (const r of [...m.kokoelmat, ...m.lisatiedostot, ...m.moduulit]) {
    assert.equal(r.tavuja, koko(r.tiedosto), r.tiedosto);
  }
  const { kokoelmat, ...ilman } = m;
  assert.ok(validoiNimella({ ...ilman, kokoelmat: kokoelmat.map(({ tavuja, ...k }) => k) }, 'manifest.schema.json').length);
});

test('validaattori hylkää rikkinäisen kaupungin ja osoittimen', () => {
  const hyva = kaupungit.alkiot[0];
  assert.deepEqual(validoiNimella(hyva, 'kaupunki.schema.json'), []);
  assert.ok(validoiNimella({ ...hyva, lat: 95 }, 'kaupunki.schema.json').length);
  assert.ok(validoiNimella({ ...hyva, maa2: 'fin' }, 'kaupunki.schema.json').length);
  const { id, ...ilmanId } = hyva;
  assert.ok(validoiNimella(ilmanId, 'kaupunki.schema.json').length);
  assert.ok(validoiNimella({ ...hyva, ylimaarainen: 1 }, 'kaupunki.schema.json').length);
  const { osoitin } = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU });
  assert.ok(validoiNimella({ ...osoitin, polku: 'sisalto/2/v1/' }, 'osoitin.schema.json').length);
  assert.ok(validoiNimella({ ...osoitin, versio: 0 }, 'osoitin.schema.json').length);
});

test('ensimmäinen julkaisu on v1 ja osoitin kelpaa', () => {
  const j = kokoaJulkaisu({ tiedostot, commit: 'abc1234', appVersion: '2026-09-23.1200', julkaistu: JULKAISTU });
  assert.deepEqual(j.virheet, []);
  assert.equal(j.muuttui, true);
  assert.equal(j.versio, 1);
  assert.equal(j.osoitin.polku, 'sisalto/1/v1/');
  assert.equal(j.osoitin.edellinen, null);
  assert.deepEqual(j.osoitin.minSovellus, MIN_SOVELLUS);
  assert.equal(j.osoitin.sha256, paketinTiiviste(tiedostot));
});

test('sama sisältö ei tee uutta versiota, muuttunut tekee', () => {
  const eka = kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU }).osoitin;
  const sama = kokoaJulkaisu({ tiedostot, edellinen: eka, suurin: 1, commit: 'def5678', julkaistu: JULKAISTU });
  assert.equal(sama.muuttui, false);
  assert.equal(sama.versio, 1);

  const muutettu = new Map(tiedostot);
  const k = JSON.parse(muutettu.get('kokoelmat/kaupungit.json'));
  k.alkiot[0].nimi = `${k.alkiot[0].nimi} (muutettu)`;
  muutettu.set('kokoelmat/kaupungit.json', JSON.stringify(k));
  const toka = kokoaJulkaisu({ tiedostot: muutettu, edellinen: eka, suurin: 1, commit: 'def5678', julkaistu: JULKAISTU });
  assert.equal(toka.muuttui, true);
  assert.equal(toka.versio, 2);
  assert.equal(toka.osoitin.edellinen, 1);
  assert.notEqual(toka.osoitin.sha256, eka.sha256);
});

test('palautuksen jälkeen N lasketaan ämpärin suurimmasta versiosta', () => {
  // Osoitin palautettu v5:een, mutta ämpärissä on jo v7.
  const palautettu = { ...kokoaJulkaisu({ tiedostot, commit: 'abc1234', julkaistu: JULKAISTU }).osoitin, versio: 5, sha256: '0'.repeat(64) };
  const j = kokoaJulkaisu({ tiedostot, edellinen: palautettu, suurin: 7, commit: 'abc1234', julkaistu: JULKAISTU });
  assert.equal(j.versio, 8);
});

test('työnkulku vie paketin ennen osoitinta ja tarkistaa julkisen osoitteen välissä', () => {
  const yml = readFileSync(`${JUURI}/.github/workflows/vie-sisalto.yml`, 'utf8');
  const paketti = yml.indexOf('aws s3 sync "dist/sisalto/v$N"');
  const tarkistus = yml.indexOf('Tarkista paketti julkisesta osoitteesta');
  const osoitin = yml.indexOf('aws s3 cp dist/sisalto/uusin.json');
  assert.ok(paketti > 0 && tarkistus > paketti && osoitin > tarkistus);
  assert.match(yml, /node --test tests\/vienti\.test\.mjs tests\/sisaltopaketti\.test\.mjs/);
  assert.match(yml, /cancel-in-progress: false/);
});

test('työnkulun aws-sijoitukset kestävät bash -e:n', () => {
  // GitHub ajaa askeleet `bash -e`:llä: paljas `x=$(aws …)` lopettaa
  // askeleen hiljaa, kun aws palauttaa virheen (ensimmäinen ajo
  // 35850982363 kaatui puuttuvaan osoittimeen, 23.9.2026).
  const yml = readFileSync(`${JUURI}/.github/workflows/vie-sisalto.yml`, 'utf8');
  const sijoitukset = yml.split('\n')
    .filter((r) => !/^\s*#/.test(r) && /=\$\(\s*\{?\s*aws /.test(r));
  assert.ok(sijoitukset.length >= 2);
  for (const rivi of sijoitukset) {
    assert.ok(/if ! \w+=\$\(aws /.test(rivi) || /\|\| true/.test(rivi), `suojaamaton aws-sijoitus: ${rivi.trim()}`);
  }
});

test('skeema 1.3: lehden web-riippuvuudet WKWebView-kuorelle', () => {
  const m = JSON.parse(tiedostot.get('manifest.json'));
  const rivi = m.webNakymat.find((w) => w.nimi === 'lehti');
  assert.ok(rivi, 'manifest.webNakymat: lehti puuttuu');
  const lehti = JSON.parse(tiedostot.get(rivi.tiedosto));
  assert.deepEqual(validoiNimella(lehti, 'web-nakyma.schema.json'), []);
  const polut = new Set(lehti.moduulit.map((t) => t.polku));
  for (const p of ['js/main.js', 'js/ui.js', 'js/lehti.js', 'js/maalehti.js', 'js/packs/kulttuuri-kategoriat.js', 'js/media.js']) {
    assert.ok(polut.has(p), `${p} puuttuu lehden riippuvuuksista`);
  }
  assert.equal(lehti.sivu, 'index.html?lehti={kaupunki}');
  assert.deepEqual(lehti.sivut.map((t) => t.polku), ['index.html']);
  assert.ok(lehti.tyylit.some((t) => t.polku === 'css/styles.css'));
  // Tiivisteet vastaavat repoa: kuori voi tarkistaa hakemansa version.
  for (const t of [...lehti.moduulit, ...lehti.tyylit].slice(0, 40)) {
    const b = readFileSync(`${JUURI}/${t.polku}`);
    assert.equal(t.sha256, createHash('sha256').update(b).digest('hex'), t.polku);
    assert.equal(t.tavuja, b.length, t.polku);
  }
  assert.equal(lehti.tavuja.koodi, [...lehti.sivut, ...lehti.moduulit, ...lehti.tyylit].reduce((a, t) => a + t.tavuja, 0));
  assert.ok(validoiNimella({ ...lehti, moduulit: [{ polku: 'x.js', tavuja: 1 }] }, 'web-nakyma.schema.json').length);
});

test('skeema 1.4: matkustuksen hinnat ja sääntövakiot', async () => {
  const rules = await import('../js/rules.js');
  const game = await import('../js/game.js');
  const saannot = new Map(JSON.parse(tiedostot.get('kokoelmat/saannot.json')).alkiot.map((a) => [a.id, a]));
  for (const nimi of ['SEA_FEE', 'FLIGHT_PRICE', 'BUS_FARE']) {
    assert.equal(saannot.get(nimi).arvo, rules[nimi], nimi);
    assert.equal(saannot.get(nimi).moduuli, 'js/rules.js', nimi);
  }
  for (const nimi of ['START_MONEY', 'TURN_HOURS', 'RECORD_DAYS', 'HINT_PRICE']) {
    assert.equal(saannot.get(nimi).arvo, game[nimi], nimi);
  }
});

test('skeema 1.4: saapumishaut vastaavat pelin funktioita jokaisessa kaupungissa', async () => {
  const { MAAILMANKARTTA: P } = await import('../js/packs/maailmankartta.js');
  const { fokusvirtaKaupungille } = await import('../js/packs/fokusvirrat.js');
  const { kaupunginJuliste } = await import('../js/packs/julisteet.js');
  const { radioMaalle } = await import('../js/packs/radiot.js');
  const { vanhaTallenne } = await import('../js/packs/vanhat-aanet.js');
  const { hetketMaassa } = await import('../js/packs/historian-hetket.js');
  const rivit = JSON.parse(tiedostot.get('kokoelmat/saapuminen.json')).alkiot;
  assert.equal(rivit.length, P.cities.length);
  for (const r of rivit) {
    const maa = P.map.cityCountry?.[r.id] ?? null;
    assert.equal(r.maa, maa, r.id);
    assert.equal(r.fokusvirta !== null, Boolean(fokusvirtaKaupungille(r.id)), `${r.id}: fokusvirta`);
    assert.equal(r.juliste !== null, Boolean(kaupunginJuliste(r.id)), `${r.id}: juliste`);
    assert.deepEqual(r.radio, radioMaalle(maa), `${r.id}: radio`);
    assert.deepEqual(r.vanhaTallenne, vanhaTallenne(r.id, maa), `${r.id}: vanha tallenne`);
    assert.deepEqual(r.historianHetket, maa ? hetketMaassa(maa).map((h) => h.id) : [], `${r.id}: hetket`);
  }
  const rooma = rivit.find((r) => r.id === 'rooma');
  assert.equal(rooma.kaupunkilehti, 'rooma');
  assert.equal(rooma.paikallisaarteet, 'ITA');
});
