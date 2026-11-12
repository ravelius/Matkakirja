/*
 * Tarinapaikan kyltin lopun merkki (KK 12.11.2026, omistaja 19.37): kenttä `merkki` kohdekartan kohteella.
 * Neljä lajia: tiimalasi (oletus), lamppu (keksintö), lyyra (kulttuuri), skandaali. NUI piirtää merkin.
 * Pariisi ensin; muut kaupungit KK:n sanalla.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';

const LAJIT = new Set(['tiimalasi', 'lamppu', 'lyyra', 'skandaali']);
const ODOTETTU = {
  'Lavoisier 1780': 'lamppu', 'Curie 1898': 'lamppu', 'Pasteur 1862': 'lamppu', 'Lumière 1895': 'lamppu',
  'Eiffel-torni 1888': 'tiimalasi', 'Kirahvi 1827': 'tiimalasi', 'Piiritys 1870': 'tiimalasi', 'Bukinistit 1859': 'tiimalasi',
  'Piaf ja Django': 'lyyra', 'Bizet 1875': 'lyyra', 'Monet 1874': 'lyyra', 'Patonki 1994': 'lyyra',
  'Vrain-Lucas': 'skandaali', 'Kaulanauha 1785': 'skandaali', 'Lustig 1925': 'skandaali',
};

const kohteet = [];
(function kerää(o, syv = 0) {
  if (!o || typeof o !== 'object' || syv > 5) return;
  if (Array.isArray(o)) return o.forEach((x) => kerää(x, syv + 1));
  if (typeof o.nimi === 'string' && typeof o.lat === 'number') kohteet.push(o);
  Object.values(o).forEach((v) => kerää(v, syv + 1));
})(KAUPUNKIKARTAT.pariisi);

test('Pariisin tarinapaikoilla on lajin mukainen merkki ja tarinapaikka-lippu', () => {
  for (const [nimi, merkki] of Object.entries(ODOTETTU)) {
    const k = kohteet.find((x) => x.nimi === nimi);
    assert.ok(k, `${nimi}: kohde puuttuu`);
    assert.equal(k.tarinapaikka, true, `${nimi}: tarinapaikka`);
    assert.equal(k.merkki, merkki, `${nimi}: merkki`);
  }
});

test('merkin arvo on yksi neljästä lajista kaikissa kaupungeissa', () => {
  const kaikki = [];
  (function kerää(o, syv = 0) {
    if (!o || typeof o !== 'object' || syv > 6) return;
    if (Array.isArray(o)) return o.forEach((x) => kerää(x, syv + 1));
    if ('merkki' in o) kaikki.push(o);
    Object.values(o).forEach((v) => kerää(v, syv + 1));
  })(KAUPUNKIKARTAT);
  assert.ok(kaikki.length >= 14);
  for (const k of kaikki) assert.ok(LAJIT.has(k.merkki), `${k.nimi}: ${k.merkki}`);
});
