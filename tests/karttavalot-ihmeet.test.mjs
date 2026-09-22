/*
 * KADONNEET IHMEET -LASKURI EI SAA UNOHTAA KAUPUNKIKARTALLE
 * SIIRRETTYJÄ KOHTEITA (omistaja 22.9.2026, Ranskan bugiraportti).
 *
 * JUURISYY: js/pallolauta/nostot.js laski selitteen "Kadonneet ihmeet"
 * -rivin VAIN pääkartan `osumat`-joukosta. Ranskan kolmesta kadonneesta
 * ihmeestä (Tuileries, Bastilji, Saint-Cloud) kaksi asuu Pariisin
 * kaupunkilehden kohdekartalla — js/fokuskohteet.js
 * karsiKaupunkikartanNostot pudottaa ne pääkartan riveiltä kokonaan,
 * joten ne eivät koskaan olleet `osumat`-joukossa saapumisnäkymässä —
 * ja kolmas (Saint-Cloud) on `lahi: true` -portin takana eikä näy
 * ennen lähizoomia. Rivi näytti siis 0, vaikka maassa on kolme.
 *
 * Tämä testi vartioi PUHDASTA funktiota (maanKadonneetIhmeet), koska
 * laskurikoonti itse asuu pallolaudan DOM-riippuvaisessa passissa
 * (js/pallolauta/nostot.js paivita) eikä ole testattavissa ilman sitä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  KOHDE_MAAT, kohteenKategoria, maanKadonneetIhmeet, maanKohdetiedot,
} from '../js/fokuskohteet.js';

test('Ranskan kohdetiedoissa on vähintään kolme kadonnutta ihmettä', () => {
  const kohdetiedot = maanKohdetiedot({}, 'FRA');
  const ihmeet = maanKadonneetIhmeet(kohdetiedot);
  const idt = ihmeet.map((k) => k.id);
  assert.ok(ihmeet.length >= 3, `Ranskan kadonneita ihmeitä ${ihmeet.length}, odotettiin ≥ 3`);
  // Tuileries ja Bastilji ovat Pariisin kaupunkikartalle siirrettyjä
  // (js/packs/maakartat.js KAUPUNKIKARTAT.Pariisi nosto-linkit) — juuri
  // ne rivit, jotka vanha, vain osumista laskeva laskuri unohti.
  assert.ok(idt.includes('tuileries'), 'Tuileries puuttuu ihmelistalta');
  assert.ok(idt.includes('bastilji'), 'Bastilji puuttuu ihmelistalta');
});

test('maanKadonneetIhmeet käyttää samaa sääntöä kuin kohteenKategoria', () => {
  const kohdetiedot = maanKohdetiedot({}, 'FRA');
  const ihmeet = maanKadonneetIhmeet(kohdetiedot);
  for (const kohde of ihmeet) {
    assert.equal(kohteenKategoria(kohde), 'ihme', `${kohde.id} ei ole kategorialtaan ihme`);
  }
  // Käänteinen suunta: jokainen kohdetiedoissa oleva 'ihme'-kategorian
  // kohde on myös funktion palauttamassa listassa — ei kopioitua ehtoa.
  const ihmeAvaimet = new Set(ihmeet.map((k) => k.id));
  for (const kohde of kohdetiedot.values()) {
    if (kohteenKategoria(kohde) === 'ihme') {
      assert.ok(ihmeAvaimet.has(kohde.id), `${kohde.id} puuttuu maanKadonneetIhmeet-listalta`);
    }
  }
});

test('kohde jonka ihme.kadonnut on false ei ole kadonnut ihme', () => {
  // Cluny (js/packs/hahmotelma-fra.js) on tarkoituksella `kadonnut:
  // false` — osa siitä seisoo yhä, joten se ei kuulu tähän joukkoon.
  const kohdetiedot = maanKohdetiedot({}, 'FRA');
  const cluny = kohdetiedot.get('hahmotelma-cluny');
  assert.ok(cluny, 'Clunyn kohdetta ei löytynyt Ranskan kohdetiedoista');
  assert.equal(cluny.ihme?.kadonnut, false);
  assert.notEqual(kohteenKategoria(cluny), 'ihme');
});

test('jokaisella maalla, jossa on kadonnut ihme, kategoria on aina "ihme"', () => {
  let tarkistettu = 0;
  for (const kohteet of Object.values(KOHDE_MAAT)) {
    for (const kohde of kohteet ?? []) {
      if (kohde?.ihme?.kadonnut && kohde.ihme.osoite) {
        assert.equal(kohteenKategoria(kohde), 'ihme', `${kohde.id} ei luokitu ihmeeksi`);
        tarkistettu += 1;
      }
    }
  }
  assert.ok(tarkistettu >= 10, `kadonneita ihmeitä löytyi vain ${tarkistettu}`);
});
