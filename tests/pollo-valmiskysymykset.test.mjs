/*
 * Pöllön valmiskysymysten pakka: muoto ja kiintiöt.
 *
 * Painopiste on SAAPUMISKONTEKSTISSA (omistajan tilaus 11.9.2026):
 * jokaisella Euroopan fokusvirtakaupungilla on oltava tasan kaksi
 * valmista kysymystä, jotka odottavat chatin auetessa heti isoisän
 * merkinnän ja pulun kommentin jälkeen. Puuttuva lohko ei näkyisi
 * diffistä vaan siitä, että pelaaja saapuisi kaupunkiin tyhjään
 * chattiin — siksi kattavuus tarkistetaan koneellisesti suoraan
 * fokusvirtapakkojen kaupunkilistaa vasten.
 *
 * Pituusraja 70 merkkiä koskee kaikkia konteksteja: kysymys on
 * napautettava kupla, ei kappale.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';

import {
  POLLO_VALMISKYSYMYKSET, haeValmiskysymykset,
} from '../js/packs/pollo-kysymykset.js';

const PITUUSRAJA = 70;

/* Euroopan fokusvirtakaupungit tiedostoniminä (fokusvirta-<id>.js). */
const FOKUSVIRTAKAUPUNGIT = readdirSync(new URL('../js/packs/', import.meta.url))
  .filter((n) => n.startsWith('fokusvirta-') && n.endsWith('.js'))
  .map((n) => n.slice('fokusvirta-'.length, -'.js'.length));

test('fokusvirtakaupunkeja löytyy odotettu määrä', () => {
  assert.equal(FOKUSVIRTAKAUPUNGIT.length, 45);
});

test('jokaisella fokusvirtakaupungilla on tasan kaksi saapumiskysymystä', () => {
  for (const kaupunki of FOKUSVIRTAKAUPUNGIT) {
    const kysymykset = haeValmiskysymykset(kaupunki, 'saapuminen');
    assert.equal(kysymykset.length, 2,
      `${kaupunki}: saapumiskysymyksiä on ${kysymykset.length}, pitää olla 2 `
      + '(js/packs/pollo-kysymykset.js).');
  }
});

test('kaupungin kaksi saapumiskysymystä eivät ole sama kysymys', () => {
  for (const kaupunki of FOKUSVIRTAKAUPUNGIT) {
    const [a, b] = haeValmiskysymykset(kaupunki, 'saapuminen');
    assert.notEqual(a, b, `${kaupunki}: saapumiskysymykset ovat identtiset.`);
  }
});

test('jokainen valmiskysymys mahtuu kuplaan ja on kysymys', () => {
  for (const [kaupunki, lohko] of Object.entries(POLLO_VALMISKYSYMYKSET)) {
    for (const [konteksti, lista] of Object.entries(lohko)) {
      for (const kysymys of lista) {
        assert.equal(typeof kysymys, 'string',
          `${kaupunki}/${konteksti}: kysymyksen on oltava merkkijono.`);
        assert.ok([...kysymys].length <= PITUUSRAJA,
          `${kaupunki}/${konteksti}: "${kysymys}" on ${[...kysymys].length} `
          + `merkkiä (raja ${PITUUSRAJA}).`);
        assert.ok(kysymys.trim().endsWith('?'),
          `${kaupunki}/${konteksti}: "${kysymys}" ei pääty kysymysmerkkiin.`);
      }
    }
  }
});

test('laatta- ja lehtikiintiöt pysyvät viidessä', () => {
  for (const [kaupunki, lohko] of Object.entries(POLLO_VALMISKYSYMYKSET)) {
    for (const konteksti of ['laatta', 'lehti']) {
      if (!lohko[konteksti]) continue;
      assert.equal(lohko[konteksti].length, 5,
        `${kaupunki}/${konteksti}: kysymyksiä pitää olla 5.`);
    }
  }
});

test('tuntematon kaupunki tai konteksti antaa tyhjän listan', () => {
  assert.deepEqual(haeValmiskysymykset('ei-tallaista', 'saapuminen'), []);
  assert.deepEqual(haeValmiskysymykset('firenze', 'ei-tallaista'), []);
});
