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

test('alin kerros: virheen jälkeen enintään kaksi uusintaa uudella osoitteella', () => {
  assert.match(PYRAMIDI, /const POHJAN_UUSINNAT = 2;/);
  assert.match(virhepolku, /tila\.alin && !tila\.lapinakyva && yritys < POHJAN_UUSINNAT/, 'vain alin, ei läpinäkyvä kerros');
  assert.match(virhepolku, /\?' : '\?'\}r=\$\{yritys \+ 1\}|r=\$\{yritys \+ 1\}/, 'uusi osoite ohittaa välimuistin virheen');
  assert.match(virhepolku, /kuva\.dataset\.peruttu === '1' \|\| !kuva\.isConnected/, 'peruttu tai poistettu laatta ei hae');
  assert.match(virhepolku, /mittarit\.uusittu \+= 1/);
});

test('uusintojen jälkeen laatta tyhjenee kuten ennen (WebKitin rikkinäisen kuvan merkki pois)', () => {
  const loppu = virhepolku.slice(virhepolku.indexOf('return;\n        }'));
  assert.match(loppu, /delete kuva\.dataset\.odottaa;/);
  assert.match(loppu, /kuva\.removeAttribute\('href'\);/);
});
