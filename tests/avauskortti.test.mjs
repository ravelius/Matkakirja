/*
 * KAUPUNGIN AVAUSKORTTI JA LEHDEN OSIOHAKEMISTO (omistaja 27.9.2026 klo
 * 23.1x–23.4x, kortilla hyväksytty mock): kaupungin napautus avaa kortin
 * liuskan sijaan, kaupungin nostot elävät lehden osioissa, ja lehden
 * etusivun alla on osiohakemisto (kuva osiota kohden, tuplat yhdistetty).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { avauskortinLauseet } from '../js/kaupunkinosto.js';
import { osiohakemisto } from '../js/lehtiosiot.js';
import { kytkeOsiohakKuvat, osiohakNostonKuva } from '../js/lehtiosiot-kuvat.js';

kytkeOsiohakKuvat();
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('avauskortin esittely: kaksi ensimmäistä lausetta ilman lihavointia', () => {
  assert.equal(avauskortinLauseet('Yksi **lause**. Toinen lause! Kolmas?'), 'Yksi lause. Toinen lause!');
  assert.equal(avauskortinLauseet('Ilman pistettä'), 'Ilman pistettä');
  assert.equal(avauskortinLauseet(''), '');
});

test('kaupungin napautus avaa avauskortin, liuska ja kaupunkilehden radio ovat pois', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /export const KAUPUNKILIUSKA = false;/);
  assert.match(lauta, /if \(!KAUPUNKILIUSKA\) \{\n\s*avaaAvauskortti\(ui, city\);/);
  assert.match(lue('../js/lehti.js'), /export const RADIO_KAUPUNKILEHDESSA = false;/);
  // Kortin kartassa ei tekstejä: pelkkaKartta sammuttaa legendan, vihjeen, janan ja napin.
  const naht = lue('../js/nahtavyydet.js');
  assert.match(naht, /zoomiNapit = false; opasteet = false; kokoruutuNappi = false;/);
  assert.match(naht, /const jana = pelkkaKartta \? null : mittakaava\(kartta\);/);
});

test('osiohakemisto: lehden osiot ja nostot, tuplat yhdistetty, oma kuva joka osiolla', () => {
  const sivut = KULTTUURI_KATEGORIAT.pariisi;
  const nostot = [
    { id: 'tuileries', nimi: 'Tuileries', aihe: 'ihmeet' },
    { id: 'hetki-marie-curie-hangaari-1898', nimi: 'Curie 1898', aihe: 'hetket' },
    { id: 'syvennys-pariisi-tuileriat', nimi: 'Tuileriain rauniot', aihe: 'historia' },
    { id: 'nosto-pariisin-patonki', nimi: 'Paras patonki', aihe: 'kulttuuri' },
    { id: 'nosto-pariisin-patonki', nimi: 'Paras patonki', aihe: 'kulttuuri' },
  ];
  const osiot = osiohakemisto({ sivut, nostot, iso: 'FRA', cityId: 'pariisi' });
  const nimet = osiot.map((o) => o.nimi);
  // Kansi ei ole osio; tyhjä sivu (Musiikki: vain johdanto) on osiolinkki.
  assert.ok(!nimet.includes('Pariisi'));
  assert.ok(osiot.find((o) => o.nimi === 'Musiikki')?.sivu > 0);
  // Historian hetki on lehden sivuna kerran — nostona tullut sama hetki ohitetaan.
  const hetket = osiot.find((o) => o.aihe === 'hetket');
  assert.ok(hetket.sivu > 0);
  assert.ok(!hetket.jutut.some((j) => j.otsikko === 'Curie 1898'));
  // Sama nosto kahdesti → kerran.
  const kulttuuri = osiot.find((o) => o.aihe === 'kulttuuri');
  assert.equal(kulttuuri.jutut.filter((j) => j.otsikko === 'Paras patonki').length, 1);
  // Jokaisella osiolla kuva, eikä kahdella samaa.
  const avaimet = osiot.map((o) => String(o.kuva?.osoite ?? o.kuva?.tiedosto ?? o.kuva?.ampari ?? ''));
  assert.ok(avaimet.every(Boolean), JSON.stringify(nimet));
  assert.equal(new Set(avaimet).size, avaimet.length);
});

test('noston kuva löytyy hetkelle, ihmeelle ja täkynostolle', () => {
  assert.match(osiohakNostonKuva('hetki-marie-curie-hangaari-1898')?.osoite ?? '', /^https:\/\//);
  assert.match(osiohakNostonKuva('tuileries')?.osoite ?? '', /ihme-tuileries/);
  assert.ok(osiohakNostonKuva('nosto-lustig-eiffel', { iso: 'FRA' }));
});
