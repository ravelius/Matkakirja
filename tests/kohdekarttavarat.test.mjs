// Pääkaupunkien kohdekarttojen pikselivara (tools/paakaupungit/karttavarat.mjs; PT 13.10.2026, juna 189, #4573).
//
// Canberran 7 km:n kartalla Mount Majura jäi iPhonella "Napauta nähtävyyttä" -opasteen alle ja Black Mountain aivan
// reunaan, vaikka kohdekartat.mjs piti 150 m:n reunavaran: metrivara on pienellä ruudulla isolla kartalla muutama
// pikseli. Vara mitataan nyt laitteen pikseleinä (iPhone 360 px, iPad 1008 px kehys), ja tämä testi vahtii, ettei
// yksikään pääkaupunkikartan kohde ole reunassa, opasteen, Kokoruutu-vihjeen tai mittajanan alla. Malli on
// tarkistettu pelin omaa piirtoa vasten (tools/paakaupungit/tarkista-kohdekarttavarat.mjs: 70/70 mitattua rikettä
// mallissa, malli kahdessa kohdassa varovaisempi).

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { KAUPUNKIKARTAT, kaupunkikartanKohteet } from '../js/packs/maakartat.js';
import { kaikkiRikkeet, korjaaVarat } from '../tools/paakaupungit/karttavarat.mjs';

function paakaupunkikartat() {
  const s = readFileSync(new URL('../tools/piirra-kaupunkikartta.mjs', import.meta.url), 'utf8');
  const a = s.indexOf('const KAUPUNGIT = {'), loppu = s.indexOf('\n};', a), alku = s.indexOf('PÄÄKAUPUNKIPISTEET', a);
  return [...s.slice(alku, loppu).matchAll(/^ {2}([a-z0-9]+): \{/gm)].map((m) => m[1]);
}
const pisteet = (k) => kaupunkikartanKohteet(k).map((x) => ({ nimi: x.nimi, lat: x.lat, lon: x.lon }));

test('pääkaupunkikarttoja on piirtäjän taulussa ja pelissä', () => {
  const idt = paakaupunkikartat();
  assert.ok(idt.length >= 73, `pääkaupunkikarttoja ${idt.length}`);
  for (const id of idt) assert.ok(KAUPUNKIKARTAT[id], `${id}: ei KAUPUNKIKARTAT-riviä`);
});

test('yksikään pääkaupunkikartan kohde ei ole reunassa tai käyttöliittymän alla (iPhone ja iPad)', () => {
  const rikkeet = [];
  for (const id of paakaupunkikartat()) {
    const k = KAUPUNKIKARTAT[id];
    for (const r of kaikkiRikkeet(k.rajat, pisteet(k))) rikkeet.push(`${id}: ${r.kohde} (${r.nimi}, ${r.laite})`);
  }
  assert.deepEqual(rikkeet, [], 'korjaa: node tools/paakaupungit/korjaa-kohdekarttavarat.mjs --pk --piirra');
});

test('Canberran vanha rajaus rikkoi, korjattu ei', () => {
  const vanha = { pohjoinen: -35.2345, etela: -35.3023, lansi: 149.0963, ita: 149.1843 }; // ennen 13.10.2026 iltaa
  const kohteet = pisteet(KAUPUNKIKARTAT.canberra);
  const ennen = kaikkiRikkeet(vanha, kohteet).map((r) => `${r.kohde}:${r.nimi}`);
  assert.ok(ennen.includes('Mount Majura:opaste'), ennen.join(', '));
  const { rajat, jaljella } = korjaaVarat(vanha, kohteet);
  assert.deepEqual(jaljella, []);
  for (const k of ['pohjoinen', 'ita']) assert.ok(rajat[k] >= vanha[k]); // kartta kasvaa, kohde ei siirry
  for (const k of ['etela', 'lansi']) assert.ok(rajat[k] <= vanha[k]);
});
