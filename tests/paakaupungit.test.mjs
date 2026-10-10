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

test('Lähi-itä: uudet maat rajoineen, Ramallah hallinnon paikka, Jerusalem ilman kannanottoa (PT 10.10.2026)', () => {
  for (const iso of ['BHR', 'ISR', 'LBN', 'PSE']) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
  }
  assert.equal(PAAKAUPUNKIPISTEET.find((p) => p.maa === 'PSE')?.asema, 'hallinnon paikka');
  // Jerusalem on laudan kaupunki ilman maata: ei pistettä eikä PAAKAUPUNGIT-riviä;
  // maakortti näyttää sen hallinnon paikkana (vienti, HALLINNON_PAIKAT).
  assert.ok(!PAAKAUPUNKIPISTEET.some((p) => p.maa === 'ISR'));
  assert.ok(!PAAKAUPUNGIT.ISR);
  assert.equal(MAAILMANKARTTA.map.cityCountry.jerusalem, undefined);
});

test('Aasia: Brunei ja Malediivit rajoineen, 12 puuttunutta pääkaupunkia pisteinä (10.10.2026)', () => {
  for (const iso of ['BRN', 'MDV']) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
  }
  for (const iso of ['BRN', 'MDV', 'BGD', 'BTN', 'KHM', 'PRK', 'KGZ', 'LAO', 'MYS', 'TJK', 'TKM', 'MMR', 'PAK', 'UZB']) {
    assert.ok(PAAKAUPUNKIPISTEET.some((p) => p.maa === iso), `${iso}: pääkaupunki puuttuu`);
  }
});

test('Afrikka: 27 uutta maata rajoineen ja pääkaupunkeineen (10.10.2026)', () => {
  const UUDET = ['BDI', 'BEN', 'BFA', 'BWA', 'CAF', 'CIV', 'COG', 'COM', 'CPV', 'DJI', 'ERI', 'GAB', 'GIN', 'GMB',
    'GNB', 'GNQ', 'LSO', 'MRT', 'MUS', 'MWI', 'NER', 'RWA', 'STP', 'SWZ', 'SYC', 'TGO', 'ZMB'];
  for (const iso of UUDET) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
    assert.ok(PAAKAUPUNKIPISTEET.some((p) => p.maa === iso), `${iso}: pääkaupunki puuttuu`);
  }
  // Päiväntasaajan Guinea: Ciudad de la Paz (PT 10.10.2026).
  assert.equal(PAAKAUPUNKIPISTEET.find((p) => p.maa === 'GNQ')?.id, 'ciudaddelapaz');
  // Etelä-Sudan on pelissä SDS; Etelä-Afrikan Kapkaupunki on jo laudalla.
  assert.ok(PAAKAUPUNKIPISTEET.some((p) => p.maa === 'SDS'));
  assert.ok(!PAAKAUPUNKIPISTEET.some((p) => p.maa === 'ZAF'));
});

test('Amerikat: 18 uutta maata rajoineen ja pääkaupunkeineen (10.10.2026)', () => {
  const UUDET = ['ATG', 'BHS', 'BLZ', 'BRB', 'CRI', 'DMA', 'DOM', 'GRD', 'GUY', 'HND', 'HTI', 'JAM', 'KNA',
    'LCA', 'SLV', 'SUR', 'TTO', 'VCT'];
  for (const iso of [...UUDET, 'USA', 'CAN', 'BOL', 'BRA', 'CHL']) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(PAAKAUPUNKIPISTEET.some((p) => p.maa === iso), `${iso}: pääkaupunki puuttuu`);
  }
  for (const iso of UUDET) assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
  // Bolivia: La Paz on hallituksen paikka, perustuslain pääkaupunki on Sucre.
  assert.equal(PAAKAUPUNKIPISTEET.find((p) => p.maa === 'BOL')?.asema, 'hallinnon paikka');
});

test('Oseania: 8 uutta maata rajoineen ja pääkaupunkeineen; kaikilla laudan mailla on pääkaupunki (10.10.2026)', () => {
  for (const iso of ['FSM', 'KIR', 'MHL', 'NRU', 'PLW', 'TON', 'TUV', 'WSM']) {
    assert.ok(maat[iso]?.renkaat?.length, `${iso}: rajat puuttuvat`);
    assert.ok(MAIDEN_PERUSTIEDOT[iso], `${iso}: perustiedot puuttuvat`);
  }
  // Kiribatin nimi on Tarawalla (nimiPiste), ei NE:n Linesaarilla.
  assert.ok(Math.abs(maat.KIR.keskus[0] - 11599) < 30, `KIR keskus ${maat.KIR.keskus}`);
  // Kaikki maat -projektin tavoite: jokaisella laudan maalla pääkaupunki joko
  // laudan kaupunkina, kevyenä pisteenä tai Israelin hallinnon paikkana.
  // Odottaa: Hongkong ja Saint Helena eivät ole valtioita (ei pääkaupunkia).
  // Islannin, Tunisian ja Sri Lankan laudan kohteet (maata edustava solmu,
  // Karthago, Colombo) eivät ole pääkaupunkeja (tools/vienti/paakaupungit.mjs),
  // ja puuttuvien lista 10.10. laski ne laudalla oleviksi — Reykjavík, Tunis ja
  // Sri Jayawardenepura Kotte tilattu Sisältökirjurilta. Lista saa vain lyhentyä.
  const ODOTTAA = new Set(['HKG', 'SHN', 'ISL', 'TUN', 'LKA']);
  const pisteMaat = new Set(PAAKAUPUNKIPISTEET.map((p) => p.maa));
  const ilman = Object.keys(maat).filter((iso) => !PAAKAUPUNGIT[iso] && !pisteMaat.has(iso) && iso !== 'ISR' && !ODOTTAA.has(iso));
  assert.deepEqual(ilman, [], `maita ilman pääkaupunkia: ${ilman.join(', ')}`);
});
