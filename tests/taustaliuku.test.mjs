/*
 * ══════════════════════════════════════════════════════════════════
 * TAUSTAÄÄNET-LIUKU YLTÄÄ MYÖS SYNTETISOITUUN MAISEMAAN — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN VIKAILMOITUS 13.9.2026, sanatarkasti: *"Tausta äänen
 * voimakkuus nappi ei vieläkään toimi"*.
 *
 * Taustaa soittaa KAKSI eri konetta, ja liuku ylsi vain toiseen:
 *
 *  1. NAUHOITETTU raita (js/ambience-stream.js). Tämä totteli liukua
 *     jo ennen korjausta, ja juuri sen savuke mittasi — siksi mittari
 *     näytti vihreää, vaikka omistaja kuuli äänen.
 *  2. SYNTETISOITU maisema (js/sound.js AMBIENCES). Tämä soi niissä
 *     kaupungeissa, joille ei ole nauhoitettua raitaa: ambience-stream
 *     kutsuu `sfx.setAmbience(fallbackType)`. Sen taso oli PELKKÄ
 *     väistökerroin, eikä `kehittajanKerroin('tausta')` näkynyt siinä
 *     lainkaan. Mitattuna liu'un veto 100 % → 0 % NOSTI syntetisoidun
 *     maiseman tason 0,0114:stä 0,25:een ja jätti sen sinne.
 *
 * Vartio on lähdetason kytkentävartio: yksikkötestissä ei ole Web
 * Audiota, joten se tarkistaa, että molemmat tasoa laskevat kohdat
 * kysyvät liu'un kerrointa eikä pelkkää väistöä. Kuuluva taso
 * mitataan selaimessa (tools/savukkeet/savuke-aanivoimat.mjs, rivi
 * "syntetisoitu maisema"), jossa on myös vastakoe.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';
import { KEHITTAJAN_VOIMA_LAJIT, KEHITTAJAN_VOIMA_MIN } from '../js/kehittajan-voimat.js';

const LAHDE = tyhjaaEiKoodi(readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8'));

test('taustaliuku on yhä oma lajinsa ja sen pohja on aito hiljaisuus', () => {
  assert.ok(KEHITTAJAN_VOIMA_LAJIT.includes('tausta'));
  assert.equal(KEHITTAJAN_VOIMA_MIN, 0);
});

test('syntetisoidun maiseman taso kysyy liu\'un kerrointa', () => {
  assert.match(LAHDE, /ambienssinTaso\s*\(\)\s*\{/,
    'js/sound.js: ambienssinTaso puuttuu — taso ei voi tietää liu\'usta');
  // tyhjaaEiKoodi tyhjentää merkkijonojen sisällön, joten lajin nimi
  // luetaan lähteestä erikseen ja kytkentä tunnistetaan kutsusta.
  assert.match(LAHDE, /ambienssinTaso\s*\(\)[\s\S]{0,200}?kehittajanKerroin\(/,
    'ambienssinTaso ei lue kehittajanKerrointa — liuku jää ulottumattomiin');
  const raaka = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  assert.match(raaka, /ambienssinTaso\s*\(\)[\s\S]{0,200}?kehittajanKerroin\('tausta'\)/,
    'ambienssinTaso lukee jonkin muun lajin kuin tausta');
});

test('jokainen maiseman tasoramppi menee ambienssinTason kautta', () => {
  /*
   * Juurisyy oli nimenomaan se, että rampit käyttivät suoraan
   * this.ambienssiVaistoa. Yksikin sellainen jäljellä oleva kohta
   * palauttaisi vian: väistö ohittaisi liu'un.
   */
  const rampit = LAHDE.match(/exponentialRampToValueAtTime\([^)]*ambienssi\w*/g) ?? [];
  assert.ok(rampit.length >= 3, `maiseman ramppeja löytyi vain ${rampit.length}`);
  for (const r of rampit) {
    assert.ok(r.includes('ambienssinTaso'),
      `ramppi käyttää väistöä suoraan liu'un ohi: ${r}`);
  }
});

test('liu\'un muutos päivittää soivan maiseman heti', () => {
  assert.match(LAHDE, /paivitaAmbienssinVoima\s*\(/,
    'päivitysmetodi puuttuu: veto kuuluisi vasta maiseman vaihtuessa');
  assert.match(LAHDE, /kuunteleKehittajanKerrointa\([\s\S]{0,120}?paivitaAmbienssinVoima/,
    'sound.js ei ilmoittaudu voimakertoimen kuuntelijaksi');
  const raaka = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  assert.match(raaka, /kuunteleKehittajanKerrointa\('tausta',[\s\S]{0,120}?paivitaAmbienssinVoima/,
    'kuuntelija on kiinnitetty johonkin muuhun lajiin kuin tausta');
});
