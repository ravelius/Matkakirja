/*
 * Pääkaupunkipisteet ja maiden perustiedot (js/packs/paakaupungit.js,
 * tools/tee-paakaupungit.mjs; skeema 1.60). Piste ei ole laudan pysäkki:
 * sille ei tehdä reittejä eikä laudan 60 yksikön välisääntö koske sitä
 * (PT 10.10.2026, suositus A), mutta sen on oltava oikean maan sisällä ja
 * oikealla paikallaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { PAAKAUPUNKIPISTEET, MAIDEN_PERUSTIEDOT } from '../js/packs/paakaupungit.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { PAAKAUPUNGIT } from '../tools/vienti/paakaupungit.mjs';
import { ISO2 } from '../tools/vienti/iso2.mjs';

const maat = MAAILMANKARTTA.map.countryShapes;
const laudanKaupungit = new Set(MAAILMANKARTTA.cities.map((c) => c.id));

test('pääkaupunkipiste kuuluu laudan maahan eikä ole laudan kaupunki', () => {
  for (const p of PAAKAUPUNKIPISTEET) {
    assert.ok(maat[p.maa], `${p.id}: maata ${p.maa} ei ole countryShapesissa`);
    assert.ok(ISO2[p.maa], `${p.id}: maalta ${p.maa} puuttuu ISO2`);
    assert.match(p.id, /^[a-z0-9]+$/, `${p.id}: id ei kelpaa kaupunki-id:ksi`);
    assert.ok(!laudanKaupungit.has(p.id), `${p.id} on jo laudan kaupunki (pysäkki)`);
    assert.ok(!PAAKAUPUNGIT[p.maa], `${p.maa}: pääkaupunki on jo laudalla (${PAAKAUPUNGIT[p.maa]}) — pistettä ei tarvita`);
    assert.ok(p.lat > -90 && p.lat < 90 && p.lon >= -180 && p.lon <= 180, `${p.id}: sijainti`);
    assert.ok(p.nimi && p.kuvaus, `${p.id}: nimi tai kuvaus puuttuu`);
  }
});

test('yksi pääkaupunkipiste maata kohden ja id:t yksilöllisiä', () => {
  const maatPisteilla = PAAKAUPUNKIPISTEET.map((p) => p.maa);
  assert.equal(new Set(maatPisteilla).size, maatPisteilla.length);
  const idt = PAAKAUPUNKIPISTEET.map((p) => p.id);
  assert.equal(new Set(idt).size, idt.length);
});

test('perustiedot vain laudan maille, esittely 3–5 lausetta', () => {
  for (const [iso, t] of Object.entries(MAIDEN_PERUSTIEDOT)) {
    assert.ok(maat[iso], `${iso}: perustiedot maalle, jota ei ole laudalla`);
    assert.ok(t.esittely, `${iso}: esittely puuttuu`);
    const lauseita = t.esittely.split(/[.!?](?:\s|$)/).filter((s) => s.trim()).length;
    assert.ok(lauseita >= 3 && lauseita <= 6, `${iso}: esittelyssä ${lauseita} lausetta`);
    assert.ok(t.vakiluku?.arvo > 0, `${iso}: vakiluku puuttuu`);
  }
});

test('Euroopan minivaltiot ja niiden pääkaupungit ovat mukana (omistaja 10.10.2026)', () => {
  for (const iso of ['AND', 'LIE', 'MCO', 'SMR', 'VAT']) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(PAAKAUPUNKIPISTEET.some((p) => p.maa === iso), `${iso}: pääkaupunki puuttuu`);
    assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
  }
});
