import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * ALIN KERROS HAETAAN UUDELLEEN (27.9.2026, iPadin webissä isoja
 * pergamenttisuorakaiteita): yksi ohimenevä virhe ei saa jättää alimman
 * kerroksen laattaa pysyvästi tyhjäksi. Laatan <image> elää vain selaimessa,
 * joten vartija lukee virhepolun lähdekoodista kuten viivataso.test.mjs.
 */
const PYRAMIDI = readFileSync(new URL('../js/laattapyramidi.js', import.meta.url), 'utf8');
const virhepolku = PYRAMIDI.slice(PYRAMIDI.indexOf('mittarit.epaonnistui += 1;'),
  PYRAMIDI.indexOf("kuva.addEventListener('error', () => valmis(false), { once: true });\n    uudet.set"));

test('olemassa oleva laatta: virheen jälkeen enintään kaksi uusintaa uudella osoitteella', () => {
  assert.match(PYRAMIDI, /const POHJAN_UUSINNAT = 2;/);
  assert.match(virhepolku, /const olemassa = tila\.alin \|\| Boolean\(taso\.laatasto\);/,
    'alin kerros aina, muut vain kun bittikartta takaa laatan olemassaolon (ei 404-uusintoja)');
  assert.match(virhepolku, /olemassa && yritys < POHJAN_UUSINNAT/);
  assert.match(virhepolku, /\?' : '\?'\}r=\$\{yritys \+ 1\}|r=\$\{yritys \+ 1\}/, 'uusi osoite ohittaa välimuistin virheen');
  assert.match(virhepolku, /kuva\.dataset\.peruttu === '1' \|\| !kuva\.isConnected/, 'peruttu tai poistettu laatta ei hae');
  assert.match(virhepolku, /mittarit\.uusittu \+= 1/);
});

test('uusintojen jälkeen laatta tyhjenee kuten ennen (WebKitin rikkinäisen kuvan merkki pois)', () => {
  const loppu = virhepolku.slice(virhepolku.indexOf('return;\n        }'));
  assert.match(loppu, /delete kuva\.dataset\.odottaa;/);
  assert.match(loppu, /kuva\.removeAttribute\('href'\);/);
});

test('aukko paikataan myöhemmin: seuraava päivitys ja paluu näkyviin', () => {
  assert.match(virhepolku, /kuva\.dataset\.virhe = String\(Date\.now\(\)\)/, 'uusintojen jälkeen merkitään aukoksi');
  assert.match(PYRAMIDI, /if \(oli\.dataset\.virhe && Date\.now\(\) - Number\(oli\.dataset\.virhe\) > PAIKKAUSVALI_MS\) paikkaaLaatta\(oli\);/);
  for (const tapahtuma of ['visibilitychange', 'pageshow', 'online']) {
    assert.match(PYRAMIDI, new RegExp(`addEventListener\\('${tapahtuma}', paikkaaKaikki\\)`), tapahtuma);
  }
  assert.match(PYRAMIDI, /const tyhjaTila = \(kerros, alin = false, lapinakyva = false\) => kirjaaTila\(/, 'jokainen kerros rekisterissä');
});
