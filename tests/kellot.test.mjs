/*
 * Kellot-linssi (js/linssit/kellot-aika.js, kellot.js): aurinkoaika,
 * vyöhykeaika Intl:llä, Livian kysymysten oikea vastaus ja arvaus,
 * kellonajan jäsennys, pelin tp-palkkio ja rekisteririvi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ARVAUKSEN_TOLERANSSI_MIN, LIVIAN_KYSYMYKSET, arvausOsuu, aurinkoaika, jasennaKellonaika, kellonaikaTeksti,
  kysymyksenTeksti, minuuttiero, nimellinenVyohyke, oikeaVastaus, siirtymaTeksti, valitseKysymyspari,
  vyohykeKaupungille, vyohykeaika, vyohykerajat,
} from '../js/linssit/kellot-aika.js';
import { KELLOKAUPUNGIT, LINSSI, kellokaupungit } from '../js/linssit/kellot.js';
import { Game, XP_KELLOT } from '../js/game.js';
import { packById } from '../js/pack.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';

const PARIISI = { id: 'pariisi', n: 'Pariisi', lon: 2.35, lat: 48.86, maa: 'FRA' };
const MARSEILLE = { id: 'marseille', n: 'Marseille', lon: 5.37, lat: 43.3, maa: 'FRA' };
const HELSINKI = { id: 'helsinki', n: 'Helsinki', lon: 24.94, lat: 60.17, maa: 'FIN' };
const LONTOO = { id: 'lontoo', n: 'Lontoo', lon: -0.13, lat: 51.5, maa: 'GBR' };
const KESA = Date.UTC(2026, 8, 21, 10, 0); // 21.9.2026 10.00 UTC (kesäaika Euroopassa)
const TALVI = Date.UTC(2026, 0, 15, 10, 0);

test('1873: aurinkoaika on UTC + pituusaste × 4 min; Pariisi–Marseille 12 min (Horatio)', () => {
  assert.equal(kellonaikaTeksti(aurinkoaika(KESA, 0)), '10.00');
  assert.equal(kellonaikaTeksti(aurinkoaika(KESA, 2.35)), '10.09');
  assert.equal(kellonaikaTeksti(aurinkoaika(KESA, 24.94)), '11.40');
  assert.equal(kellonaikaTeksti(aurinkoaika(KESA, -75)), '05.00');
  const v = oikeaVastaus(LIVIAN_KYSYMYKSET[0], PARIISI, MARSEILLE, KESA);
  assert.equal(v.ero, 12);
  assert.equal(kellonaikaTeksti(v.minuutit), '12.12');
  assert.equal(kellonaikaTeksti(oikeaVastaus(LIVIAN_KYSYMYKSET[2], HELSINKI, LONTOO, KESA).minuutit), '10.20');
});

test('nyt: vyöhykeaika Intl:llä tuntee kesäajan; tuntematon maa putoaa nimelliseen vyöhykkeeseen', () => {
  assert.equal(vyohykeaika(KESA, HELSINKI).siirtyma, 180);
  assert.equal(vyohykeaika(TALVI, HELSINKI).siirtyma, 120);
  assert.equal(vyohykeaika(KESA, LONTOO).siirtyma, 60);
  assert.equal(kellonaikaTeksti(vyohykeaika(KESA, HELSINKI).minuutit), '13.00');
  const tuntematon = vyohykeaika(KESA, { maa: 'XXX', lon: 100, lat: 0 });
  assert.equal(tuntematon.arvio, true);
  assert.equal(tuntematon.siirtyma, 420);
  assert.equal(vyohykeKaupungille('RUS', 37.6).tz, 'Europe/Moscow');
  assert.equal(vyohykeKaupungille('RUS', 131.9).tz, 'Asia/Vladivostok');
  assert.equal(vyohykeKaupungille('USA', -118, 34).tz, 'America/Los_Angeles');
  assert.equal(vyohykeKaupungille('AUS', 151, -34).tz, 'Australia/Sydney');
  assert.equal(nimellinenVyohyke(-179), -12);
  assert.equal(nimellinenVyohyke(179), 12);
  const nyt = oikeaVastaus(LIVIAN_KYSYMYKSET[1], PARIISI, HELSINKI, KESA);
  assert.equal(nyt.ero, 60);
  assert.equal(kellonaikaTeksti(nyt.minuutit), '13.00');
});

test('kellonaika jäsentyy monesta muodosta ja arvaus osuu ±5 min', () => {
  assert.equal(jasennaKellonaika('12.12'), 732);
  assert.equal(jasennaKellonaika('12:12'), 732);
  assert.equal(jasennaKellonaika('1212'), 732);
  assert.equal(jasennaKellonaika('9.5'), 545);
  assert.equal(jasennaKellonaika('12'), 720);
  assert.equal(jasennaKellonaika('25.00'), null);
  assert.equal(jasennaKellonaika('kaksitoista'), null);
  assert.ok(arvausOsuu(732, 732));
  assert.ok(arvausOsuu(732 + ARVAUKSEN_TOLERANSSI_MIN, 732));
  assert.ok(!arvausOsuu(732 + ARVAUKSEN_TOLERANSSI_MIN + 1, 732));
  assert.ok(arvausOsuu(2, 1438), 'keskiyön yli');
  assert.equal(minuuttiero(10, 1430), 20);
  assert.equal(siirtymaTeksti(330), '+5.30');
  assert.equal(siirtymaTeksti(-180), '−3 h');
});

test('Livian kysymykset ovat Fablen sanatarkat, {A}/{B} täytetään, pari valitaan tilan mukaan', () => {
  assert.equal(LIVIAN_KYSYMYKSET.length, 3);
  assert.deepEqual(LIVIAN_KYSYMYKSET.map((k) => k.tila), ['1873', 'nyt', '1873']);
  assert.equal(kysymyksenTeksti(LIVIAN_KYSYMYKSET[1], 'Pariisi', 'Helsinki'),
    'Sama pari, mutta tänään: kaupunki Pariisi näyttää kahtatoista. Mitä kello on kaupungissa Helsinki? Vihje: vyöhykkeet ovat ihmisten keksintö, aurinko ei niistä tiedä.');
  assert.match(LIVIAN_KYSYMYKSET[0].teksti, /minä laskin sen kerran siivillä\.$/);
  assert.match(LIVIAN_KYSYMYKSET[2].teksti, /junat myöhästyivät periaatteesta/);
  // 1873: pituusaste-ero 2–40°; Pariisi–Marseille (3°) kelpaa, Pariisi–Lontoo (2,5°) kelpaa, Lontoo–Helsinki (25°) kelpaa.
  const p = valitseKysymyspari([PARIISI, MARSEILLE], LIVIAN_KYSYMYKSET[0], KESA, () => 0);
  assert.deepEqual(p.map((k) => k.id), ['pariisi', 'marseille']);
  // nyt: sama vyöhyke (Pariisi–Marseille) ei kelpaa; Pariisi–Helsinki kelpaa.
  assert.equal(valitseKysymyspari([PARIISI, MARSEILLE], LIVIAN_KYSYMYKSET[1], KESA), null);
  const n = valitseKysymyspari([PARIISI, HELSINKI], LIVIAN_KYSYMYKSET[1], KESA, () => 0.99);
  assert.equal(n.length, 2);
});

test('vyöhykerajat: 24 pituuspiiriä 15n + 7,5°, navalta navalle', () => {
  const rajat = vyohykerajat();
  assert.equal(rajat.length, 24);
  assert.equal(rajat[0].pisteet[0][1], -172.5);
  assert.equal(rajat[12].pisteet[0][1], 7.5);
  assert.deepEqual(rajat[12].pisteet[0], [-80, 7.5]);
  assert.deepEqual(rajat[12].pisteet.at(-1), [80, 7.5]);
});

test('kellokaupungit: Eurooppa kokonaan, maailmalta KELLOKAUPUNGIT, oma kaupunki aina', () => {
  const pack = packById('maailmankartta');
  const lista = kellokaupungit(pack, 'tokio');
  const idt = new Set(lista.map((k) => k.id));
  for (const id of ['pariisi', 'marseille', 'helsinki', 'lontoo', 'moskova', 'ateena']) assert.ok(idt.has(id), id);
  for (const id of KELLOKAUPUNGIT) assert.ok(idt.has(id), `kellokaupunki ${id} puuttuu pakasta`);
  assert.ok(idt.has('tokio'));
  assert.ok(!idt.has('kioto'), 'ei jokaista maailman kaupunkia');
  assert.ok(lista.length < 140, `kelloja ${lista.length} — CSS2D-budjetti`);
  assert.equal(lista.find((k) => k.id === 'marseille').maa, 'FRA');
});

test('peli: oikea arvaus tuo XP_KELLOT tp ja aid-kuplan, väärä ei mitään', () => {
  const game = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 3 });
  game.phase = 'action';
  const p = game.player;
  const xp0 = p.xp ?? 0;
  assert.equal(game.vastaaKellokysymykseen(p, false, { kaupungit: 'Pariisi → Marseille' }), 0);
  assert.equal(p.xp ?? 0, xp0);
  assert.equal(game.vastaaKellokysymykseen(p, true, { kaupungit: 'Pariisi → Marseille' }), XP_KELLOT);
  assert.equal(p.xp, xp0 + XP_KELLOT);
  const kupla = game.events.find((e) => e.tilanne === 'peli.kellot.oikein');
  assert.ok(kupla);
  assert.equal(kupla.sub, 'Pariisi → Marseille');
});

test('linssisopimus ja rekisteri: kellot on tavallinen pallolinssi Codexin ikonilla, kortin teksti on Horation', () => {
  assert.equal(LINSSI.tunnus, 'kellot');
  assert.equal(LINSSI.kerros, false);
  assert.equal(typeof LINSSI.pallolle, 'function');
  for (const k of ['nimi', 'lyhyt', 'ikoni', 'laudat', 'lahde']) assert.ok(LINSSI[k], k);
  assert.match(LINSSI.kortti, /^Kaupungin kello ja rautatien kello eivät ole samaa mieltä/);
  assert.match(LINSSI.kortti, /kaksitoista minuuttia/);
  const rivi = LINSSIT.find((r) => r.tunnus === 'kellot');
  assert.equal(rivi.tila, undefined);
  assert.equal(rivi.ikoni, 'assets/linssit/ikonit/linssi-kellot.webp');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.match(sw, /'\.\/js\/linssit\/kellot\.js'/);
  assert.match(sw, /'\.\/js\/linssit\/kellot-aika\.js'/);
});
