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
 *   4. työnkulku kirjoittaa osoittimen vasta paketin jälkeen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { kokoaVienti, JUURI, SKEEMAVERSIO_TARKKA } from '../tools/vienti/vie-sisalto.mjs';
import { kokoaJulkaisu, tarkistaPaketti, paketinTiiviste, MIN_SOVELLUS } from '../tools/vienti/julkaise-sisalto.mjs';
import { validoiNimella } from '../tools/vienti/validoi.mjs';
import { ISO2 } from '../tools/vienti/iso2.mjs';

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
