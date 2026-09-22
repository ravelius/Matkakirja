/*
 * PYRAMIDIN LAATTOJEN ESILATAUS LEVOSSA (erä E1, js/laattaesilataus.js).
 *
 * Jono voi mennä pieleen hiljaa: sama osoite lähtee kahdesti, erä lähtee
 * liikkeessä, maan laatikko nielaisee Guyanen, tai laatikko kasvaa
 * navan yli. Puhtaat osat testataan synteettisesti; SW:n polkusuodatin
 * tekstistä (sw.js ei ole moduuli).
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ESILATAUS_ERA, ESILATAUS_LIIKEVARA, ESILATAUS_MAATASOT, esilatausPaalla, laajennaLaatikko,
  laattojenOsoitteet, luoEsilatausjono, maanLaatikko,
} from '../js/laattaesilataus.js';

test('laajennaLaatikko: 50 % joka suuntaan keskipisteen ympärille, lat rajataan', () => {
  const l = laajennaLaatikko({ lon0: 0, lon1: 4, lat0: 40, lat1: 44 }, ESILATAUS_LIIKEVARA, -76, 76);
  assert.deepEqual(l, { lon0: -1, lon1: 5, lat0: 39, lat1: 45 });
  const napa = laajennaLaatikko({ lon0: 0, lon1: 10, lat0: 70, lat1: 80 }, 1.5, -76, 76);
  assert.equal(napa.lat1, 76);
});

test('laattojenOsoitteet: laatta × kerrostaso, vain olemassa olevat', () => {
  const laatat = [{ sarake: 1, rivi: 2 }, { sarake: 3, rivi: 2 }];
  const kerrostasot = [{ nimi: 'pohja' }, { nimi: 'nimiot' }];
  const osoitteet = laattojenOsoitteet({
    laatat, kerrostasot,
    olemassa: (k, s) => !(k.nimi === 'nimiot' && s === 3),
    osoite: (k, s, r) => `${k.nimi}/${s}/${r}`,
  });
  assert.deepEqual(osoitteet, ['pohja/1/2', 'nimiot/1/2', 'pohja/3/2']);
  assert.deepEqual(laattojenOsoitteet({ laatat: [], kerrostasot, olemassa: () => true, osoite: () => 'x' }), []);
});

test('jono: näkymä kärkeen, maa perään, erä vain levossa ja erävälin jälkeen, ei kahdesti', () => {
  const lahetetyt = [];
  let kello = 0;
  const jono = luoEsilatausjono({ laheta: (o) => lahetetyt.push(o), era: 3, eravali: 100, nyt: () => kello });
  assert.equal(jono.maa('FRA', ['m1', 'm2', 'm3', 'm4']), 4);
  assert.equal(jono.nakyma(['n1', 'n2', 'm2']), 2, 'm2 on jo jonossa');
  assert.equal(jono.askel(false), 0, 'liikkeessä ei lähde');
  assert.equal(jono.askel(true), 3);
  assert.deepEqual(lahetetyt[0], ['n1', 'n2', 'm1'], 'näkymä ennen maata');
  assert.equal(jono.askel(true), 0, 'eräväli ei ole kulunut');
  kello = 100;
  assert.equal(jono.askel(true), 3);
  assert.deepEqual(lahetetyt[1], ['m2', 'm3', 'm4']);
  kello = 200;
  assert.equal(jono.askel(true), 0, 'jono tyhjä');
  assert.equal(jono.nakyma(['n1', 'm3']), 0, 'lähetettyjä ei oteta uudestaan');
  assert.ok(jono.onLahetetty('n1'));
  const m = jono.mittarit();
  assert.equal(m.lahetetty, 6);
  assert.equal(m.eria, 2);
  assert.equal(m.maa, 'FRA');
  assert.equal(ESILATAUS_ERA, 20);
});

test('jono: lähettäjän virhe ei kaada askelta', () => {
  const jono = luoEsilatausjono({ laheta: () => { throw new Error('ei työntekijää'); }, era: 2, eravali: 0, nyt: () => 1 });
  jono.nakyma(['a', 'b']);
  assert.equal(jono.askel(true), 2);
});

test('maanLaatikko: manner + Korsika, ei Guyanea; tyhjä → null', () => {
  const nelio = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  const manner = nelio(-5, 42, 8, 51);
  const korsika = nelio(8.5, 41.3, 9.6, 43);
  const guyane = nelio(-54.5, 2, -51.6, 5.8);
  const reunion = nelio(55.2, -21.4, 55.8, -20.9);
  assert.deepEqual(maanLaatikko([guyane, manner, reunion, korsika]), { lon0: -5, lat0: 41.3, lon1: 9.6, lat1: 51 });
  assert.equal(maanLaatikko([]), null);
  assert.equal(maanLaatikko([[[0, 0], [0, 0]]]), null);
});

test('kytkin: oletus päällä, ?esilataus=0 pois; maatasot 6–8', () => {
  assert.equal(esilatausPaalla({ location: { search: '' } }), true);
  assert.equal(esilatausPaalla({ location: { search: '?esilataus=0' } }), false);
  assert.equal(esilatausPaalla({}), true);
  assert.deepEqual(ESILATAUS_MAATASOT, [6, 7, 8]);
});

test('sw.js: pyramidin laatat samaan koriin, luettelot eivät, esilataus hyväksyy pyramidipolun', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.match(sw, /const PYRAMIDIPOLKU = '\/julisteet\/pyramidi\/'/);
  assert.match(sw, /PYRAMIDILAATTA = \(osoite\) => osoite\.pathname\.includes\(PYRAMIDIPOLKU\) && !osoite\.pathname\.endsWith\('\.json'\)/);
  assert.match(sw, /if \(PYRAMIDILAATTA\(osoite\)\) \{\s*event\.respondWith\(laattaPeilista\(event\.request\)\)/);
  assert.match(sw, /\|\| u\.includes\(PYRAMIDIPOLKU\)\)\)/, 'esilataaLaatat hyväksyy pyramidin osoitteet');
  assert.match(sw, /!polku\.includes\(PYRAMIDIPOLKU\) && !nykyiset/, 'kansiosiivous ei koske pyramidiin');
  assert.match(sw, /const LAATTAESILATAUKSEN_LEVEYS = 4;/);
  assert.match(sw, /'\.\/js\/laattaesilataus\.js'/);
});
