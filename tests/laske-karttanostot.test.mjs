/*
 * KATTAVUUSTAULUKKO KATTAA KOKO MAAILMAN.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Inventaario (tools/laske-karttanostot.mjs) laski siihen asti vain
 * Euroopan laudan 29 maata, ja kun se laajennettiin koko maailmaan,
 * yksi virhe on muita vaarallisempi: maa katoaa taulukosta hiljaa.
 * Vajaa taulukko ei näytä rikkinäiseltä — se näyttää valmiilta.
 *
 * Siksi kaksi kysymystä joka ajolla:
 *
 *   1. RIVEJÄ ON YHTÄ MONTA KUIN LAUDALLA ON MAITA. Joukko on
 *      maailmankartan oma maalista (map.cityCountry -taulun uniikit
 *      ISO-tunnukset), eli täsmälleen ne maat, joissa pelaaja voi olla.
 *   2. JOKAISELLA RIVILLÄ ON NIMI. Nimi tulee pelin omasta taulusta
 *      (map.countryShapes), joten paljas ISO-koodi nimen paikalla
 *      tarkoittaa, että maa on laudalla mutta nimitaulun ulkopuolella.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kattavuus, maanosittain } from '../tools/laske-karttanostot.mjs';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

const LAUDAN_MAAT = [...new Set(Object.values(MAAILMANKARTTA.map.cityCountry))].sort();

test('kattavuustaulukossa on rivi jokaisesta laudan maasta', () => {
  const rivit = kattavuus();
  assert.equal(rivit.length, LAUDAN_MAAT.length);
  assert.deepEqual(rivit.map((r) => r.iso).sort(), LAUDAN_MAAT);
});

test('jokaisella rivillä on suomenkielinen nimi, ei paljasta ISO-koodia', () => {
  for (const r of kattavuus()) {
    assert.equal(typeof r.nimi, 'string', `${r.iso}: nimi puuttuu`);
    assert.ok(r.nimi.trim().length > 0, `${r.iso}: nimi on tyhjä`);
    assert.notEqual(r.nimi, r.iso, `${r.iso}: nimi puuttuu map.countryShapes-taulusta`);
  }
});

test('maanosaryhmittely kattaa kaikki rivit eikä toista yhtäkään', () => {
  const rivit = kattavuus();
  const ryhmitellyt = maanosittain(rivit).flatMap((ryhma) => ryhma.rivit.map((r) => r.iso));
  assert.equal(ryhmitellyt.length, rivit.length);
  assert.deepEqual([...ryhmitellyt].sort(), LAUDAN_MAAT);
});

test('maanosan sisällä rivit ovat heikoimmasta vahvimpaan', () => {
  for (const ryhma of maanosittain()) {
    const summat = ryhma.rivit.map((r) => r.paakartalla + r.kohdekartalla);
    const jarjestetty = [...summat].sort((a, b) => a - b);
    assert.deepEqual(summat, jarjestetty, `${ryhma.nimi}: järjestys ei ole nouseva`);
  }
});
