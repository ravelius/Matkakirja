// LYHIN REITTI (omistaja 6.10.2026 23.4x): lukitun listan kierros lyhimpänä reittinä, alku sijaintia lähimmästä.
import test from 'node:test';
import assert from 'node:assert/strict';
import { lyhinReitti, reitinPituus, jarjestaReitti } from '../tools/pollo/opas.js';

// Pariisin kuvalistan 8 tärkeintä (kuvat-v2, 7.10.): listan järjestys 18,8 km → lyhin 11,1 km.
const PARIISI = [
  ['Eiffel-torni', 48.85826, 2.2945], ['Louvre', 48.86111, 2.33583], ['Notre-Dame', 48.85297, 2.34991],
  ['Riemukaari', 48.87378, 2.29504], ['Sacré-Cœur', 48.88672, 2.34306], ['Orsayn taidemuseo', 48.86, 2.32667],
  ['Champs-Élysées', 48.86972, 2.30778], ['Concorden aukio', 48.86556, 2.32111],
].map(([nimi, lat, lon]) => ({ id: nimi, nimi, lat, lon }));

test('alku sijaintia lähimmästä, reitti lyhenee ja sisältää kaikki', () => {
  const keskusta = { lat: 48.8566, lon: 2.3522 };
  const r = lyhinReitti(PARIISI, keskusta);
  assert.equal(r[0].nimi, 'Notre-Dame');
  assert.equal(r.length, 8);
  assert.deepEqual(new Set(r.map((x) => x.id)), new Set(PARIISI.map((x) => x.id)));
  assert.ok(reitinPituus(r) < reitinPituus(PARIISI) * 0.65, `${reitinPituus(r)} vs ${reitinPituus(PARIISI)}`);
  assert.ok(reitinPituus(r) <= reitinPituus(jarjestaReitti(PARIISI, keskusta)));
});

test('2-opt oikaisee ristikkäisen osuuden, jonka lähin naapuri jättää', () => {
  // Suorakaide: lähin naapuri A→B→D→C ei ole lyhin, kun alku on A.
  const p = [{ id: 'A', lat: 0, lon: 0 }, { id: 'B', lat: 0, lon: 0.01 }, { id: 'C', lat: 0.02, lon: 0 }, { id: 'D', lat: 0.019, lon: 0.012 }];
  const r = lyhinReitti(p, { lat: 0, lon: 0 });
  assert.equal(r[0].id, 'A');
  // Paras avoin reitti on vähintään yhtä lyhyt kuin kaikki permutaatiot, joissa A on ensin.
  const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((y) => [x, ...y])));
  const paras = Math.min(...perm(p.slice(1)).map((y) => reitinPituus([p[0], ...y])));
  assert.equal(reitinPituus(r), paras);
});

test('kiinteä ensimmäinen ja reunatapaukset', () => {
  const r = lyhinReitti(PARIISI, null, { ensimmainen: PARIISI[4] });
  assert.equal(r[0].nimi, 'Sacré-Cœur');
  assert.deepEqual(lyhinReitti([], null), []);
  assert.deepEqual(lyhinReitti([PARIISI[0]], null).map((x) => x.id), ['Eiffel-torni']);
  assert.equal(lyhinReitti(PARIISI, null)[0].nimi, 'Eiffel-torni', 'ilman sijaintia alku listan tärkein');
});

// PIENIN KIERTO (omistaja 8.10.2026; Linssisepän malli docs/raportit/kierrosjarjestykset-20261008.md).
test('pieninKiertoReitti: 1. kohde pysyy, kierto ei kasva, matka ≤ 130 % lyhimmästä', async () => {
  const { pieninKiertoReitti, reitinKierto, lyhinReitti } = await import('../tools/pollo/opas.js');
  // Neliön kulmat + keskipiste: lyhin reitti siksakkaa, pienin kierto kiertää kehää.
  const p = [{ id: 'A', lat: 0, lon: 0 }, { id: 'B', lat: 0.01, lon: 0.01 }, { id: 'C', lat: 0, lon: 0.01 }, { id: 'D', lat: 0.01, lon: 0 },
    { id: 'E', lat: 0.005, lon: 0.005 }];
  const alku = { lat: -0.01, lon: -0.01 };
  const lyhin = lyhinReitti(p, alku, { ensimmainen: p[0] }), uusi = pieninKiertoReitti(p, alku, { ensimmainen: p[0] });
  assert.equal(uusi[0].id, 'A');
  assert.deepEqual([...uusi].map((x) => x.id).sort(), ['A', 'B', 'C', 'D', 'E']);
  assert.ok(reitinKierto(alku, uusi).kierto <= reitinKierto(alku, lyhin).kierto + 1e-9);
  assert.ok(reitinKierto(alku, uusi).matka <= reitinKierto(alku, lyhin).matka * 1.3 + 1e-9);
  assert.deepEqual(pieninKiertoReitti(p.slice(0, 2), alku).length, 2, 'alle 3 kohdetta ennallaan');
});
