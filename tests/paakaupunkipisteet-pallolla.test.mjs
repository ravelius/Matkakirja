/*
 * Pääkaupunkipisteet pallolla (js/pallolauta/paakaupunkipisteet.js): kevyt piste
 * olemassa olevalla kaupunkimerkillä pienimmässä tärkeysluokassa, tunnus
 * etuliitteellä, ei pelikaupungin toimintoja (PT 10.10.2026, suositus A).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PAAKAUPUNKIPISTEET } from '../js/packs/paakaupungit.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import {
  PK_ETULIITE, onPaakaupunkipiste, paakaupunkipisteet,
} from '../js/pallolauta/paakaupunkipisteet.js';

const laudanIdt = new Set(MAAILMANKARTTA.cities.map((c) => c.id));
const pisteet = paakaupunkipisteet('maailmankartta', laudanIdt);

test('jokainen pääkaupunki saa pisteen etuliitteellä ja pienimmällä tärkeydellä', () => {
  assert.equal(pisteet.length, PAAKAUPUNKIPISTEET.length);
  for (const k of pisteet) {
    assert.ok(onPaakaupunkipiste(k.id) && k.id.startsWith(PK_ETULIITE), k.id);
    assert.ok(!laudanIdt.has(k.id), `${k.id} törmää laudan kaupunkiin`);
    assert.equal(k.pk, true);
    assert.equal(k.tarkeys, 0);
    assert.equal(k.aste, 0);
    assert.equal(k.iso, false);
    assert.equal(k.n, k.nimi);
    assert.ok(MAAILMANKARTTA.map.countryShapes[k.maa], `${k.id}: maalehden maa ${k.maa} puuttuu`);
  }
  assert.ok(!onPaakaupunkipiste('belgrad') && onPaakaupunkipiste('pk:belgrad'));
});

test('laudan x/y osuu takaisin pääkaupungin asteisiin', () => {
  for (const k of pisteet) {
    assert.ok(Number.isFinite(k.x) && Number.isFinite(k.y), k.id);
    const a = laudaltaAsteiksi('maailmankartta', k.x, k.y);
    assert.ok(a, k.id);
    assert.ok(Math.abs(a.lat - k.lat) < 0.05 && Math.abs(a.lon - k.lon) < 0.05,
      `${k.id}: ${a.lat},${a.lon} ≠ ${k.lat},${k.lon}`);
  }
});

test('laudan pysäkki ei saa toista pistettä', () => {
  const ohi = paakaupunkipisteet('maailmankartta', new Set(['belgrad']));
  assert.ok(!ohi.some((k) => k.id === `${PK_ETULIITE}belgrad`));
  assert.equal(ohi.length, pisteet.length - 1);
});

test('pallolauta kytkee pisteet nimiin, rajaukseen ja maalehteen', () => {
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /lisakaupungit: paakaupungit/);
  assert.match(lauta, /kaupungit = \[\.\.\.pallonKaupungit\(pack, kaydyt\), \.\.\.paakaupungit\]/);
  assert.match(lauta, /if \(k\.maa === iso \|\| !laudanMaat\.has\(k\.maa\)\) joukko\.add\(k\.id\)/);
  assert.match(lauta, /if \(k\.pk\) \{[\s\S]{0,160}ui\.avaaMaalehti\?\.\(k\.maa\)/);
  assert.match(lauta, /const himmeaPiste = \(k\) => !k\.pk &&/);
  const nimet = readFileSync(new URL('../js/pallolauta/nimet.js', import.meta.url), 'utf8');
  assert.match(nimet, /for \(const c of lisakaupungit\) kaupungit\.push\(\{ c, lat: c\.lat, lng: c\.lon \}\)/);
});

test('maat ilman laudan kaupunkia: pääkaupunki on ainoa tie maahan', () => {
  const laudanMaat = new Set(Object.values(MAAILMANKARTTA.map.cityCountry));
  const aina = pisteet.filter((k) => !laudanMaat.has(k.maa)).map((k) => k.maa).sort();
  for (const iso of ['ALB', 'BLR', 'MDA', 'MKD', 'MNE', 'SRB']) assert.ok(aina.includes(iso), iso);
  assert.ok(!aina.includes('SVK') && !aina.includes('HRV'), 'pysäkkimaa noudattaa kohdemaan sääntöä');
});
