/*
 * OSLON 1873-TEKSTIT KIRJOITTAVAT "CHRISTIANIA" (Sonnet 1, kierros 16b,
 * 20.9.2026): ylätunniste sanoi "Kristiania" ja postikortti
 * "Christiania". Virallinen kirjoitusasu oli Christiania vuoteen 1877,
 * joten isoisän matkavuonna 1873 se on Christiania — 1890-luvun ja
 * 1900-luvun maininnat (Nansen 1893, Ibsen, yliopiston arkisto 1914)
 * ovat yhä Kristiania, eikä tämä testi koske niitä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (polku) => readFileSync(join(JUURI, polku), 'utf8');

test('Oslon 1873-tekstit käyttävät muotoa Christiania', () => {
  const virta = lue('js/packs/fokusvirta-oslo.js');
  assert.match(virta, /paikkarivi: 'Christiania, heinäkuussa 1873/);
  assert.ok(!/Kristiania, heinäkuussa 1873/.test(virta), 'paikkarivi jäi Kristianiaksi');

  const julisteet = lue('js/packs/julisteet.js');
  assert.match(julisteet, /otsikko: 'Christiania 1873'/);
  assert.ok(!/'Kristiania 1873/.test(julisteet), 'julisteen otsikko jäi Kristianiaksi');

  // Isoisän oma ääni matkavuonna.
  assert.match(lue('js/packs/europe-questions.js'), /Kaupunki on Christiania/);
});

test('myöhemmät vuosikymmenet pysyvät Kristianiana', () => {
  // Nansenin Fram-lähtö 1893 on Kristiania (kirjoitusasu vaihtui 1877).
  assert.match(lue('js/packs/historian-hetket.js'), /Kristiania 1893/);
});
