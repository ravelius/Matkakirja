/*
 * TOISEN TARINAN KUVAT EIVÄT NOSTOON, JOLLA ON OMAT KUVAT (KK:N PÄÄTÖS 20.11.2026 klo 15.18, aiempi: KK 15.08, P-261120-5,
 * P-261120-10, P-261117-119; kortti noston-kuvat 7 ja 9). tools/vienti/nostokuvat.mjs: reitti (b) eli linkittävän kohdekartan kohteen
 * samanniminen nähtävyysjuttu (kaupunki + nimi) tuo kuvansa vain nostolle, jolla on alle KUVIA.min (3, tasalaatutarkistuksen
 * vähimmäismäärä) kuvaa lähteistä nosto, kohde ja reitti (a) (juttu, jonka nosto-kenttä on tunnus). Ennen Notre-Damen palotarina sai
 * saman paikan yleisen jutun kuvat; vajaat nostot (omia 1–2) pitävät ne kuten ennen.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nostokuvaRakentaja } from '../tools/vienti/nostokuvat.mjs';
import { KUVIA } from '../tools/sisalto/nostokuvien-tarkistus.mjs';

const U = (n) => `https://media.example/testi/${n}.jpg`;
const kuva = (n) => ({ osoite: U(n), lyhyt: n });
const OMAT = {
  'testi-kolme': [kuva('oma-1'), kuva('oma-2'), kuva('oma-3')],
  'testi-yksi': [kuva('yksi-1')],
  'testi-kaksi': [kuva('kaksi-1'), kuva('kaksi-2')],
  'testi-a': [kuva('oma-a')],
  'testi-a3': [kuva('a3-1'), kuva('a3-2')],
};

function rakentaja() {
  const kokoelmat = {
    elaintayt: { alkiot: [] },
    kohdekartat: { alkiot: [{ kaupunki: 'testila', kohteet: [
      { nimi: 'Testipaikka A', nosto: 'testi-kolme' },
      { nimi: 'Testipaikka A', nosto: 'testi-yksi' },
      { nimi: 'Testipaikka A', nosto: 'testi-kaksi' },
      { nimi: 'Testipaikka B', nosto: 'testi-tyhja' },
      { nimi: 'Testipaikka D', nosto: 'testi-a' },
      { nimi: 'Testipaikka C', nosto: 'testi-a' },
      { nimi: 'Testipaikka D', nosto: 'testi-a3' },
    ] }] },
    nahtavyydet: { alkiot: [
      { kaupunki: 'testila', nimi: 'Testipaikka A', data: { kuvat: [kuva('juttu-a1'), kuva('juttu-a2')] } },
      { kaupunki: 'testila', nimi: 'Testipaikka B', data: { kuvat: [kuva('juttu-b1'), kuva('juttu-b2')] } },
      // Reitti (a): nosto-kenttä osoittaa tunnukseen; sama juttu myös reitillä (b) (kohde C) → kerran.
      { kaupunki: 'testila', nimi: 'Testipaikka C', nosto: 'testi-a', data: { kuvat: [kuva('juttu-c1')] } },
      { kaupunki: 'testila', nimi: 'Testipaikka D', data: { kuvat: [kuva('juttu-d1')] } },
      { kaupunki: 'testila', nimi: 'Testipaikka E', nosto: 'testi-a3', data: { kuvat: [kuva('juttu-e1')] } },
    ] },
  };
  return nostokuvaRakentaja({
    R: { kuva: (r) => ({ url: r.osoite ?? r.url ?? null, lyhyt: r.lyhyt ?? null }) },
    hae: () => ({ SKANDAALIT: {}, HISTORIAN_HETKET: [], FOKUSVIRRAT: {} }),
    haeKohde: (t) => (OMAT[t] ? { kuvat: OMAT[t] } : null),
    kokoelmat,
  });
}
const lista = (kuvat) => kuvat.map((k) => `${k.mista}:${k.osoite.replace(/^.*\/|\.jpg$/g, '')}`);
const takyt = (N, ...nimet) => () => nimet.flatMap((n) => N.takyKuvat({ kuva: kuva(n) }, 'nosto'));

test('raja on tasalaatutarkistuksen vähimmäismäärä', () => assert.equal(KUVIA.min, 3));

test('(1) omia ≥ 3: saman paikan toisen jutun kuvat eivät mukana', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-kolme')), ['nosto:oma-1', 'nosto:oma-2', 'nosto:oma-3']);
  // Sisäkkäinen olio (fokusvirran takynosto) samalla säännöllä.
  assert.deepEqual(lista(N.oliolle({}, 'testi-kolme', takyt(N, 't-1', 't-2', 't-3'))), ['nosto:t-1', 'nosto:t-2', 'nosto:t-3']);
});

test('(2) omia 1–2: jutun kuvat mukana kuten ennen', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-yksi')), ['nosto:yksi-1', 'juttu:juttu-a1', 'juttu:juttu-a2']);
  assert.deepEqual(lista(N.tunnukselle('testi-kaksi')), ['nosto:kaksi-1', 'nosto:kaksi-2', 'juttu:juttu-a1', 'juttu:juttu-a2']);
  assert.deepEqual(lista(N.oliolle({}, 'testi-yksi', takyt(N, 't-1', 't-2'))), ['nosto:t-1', 'nosto:t-2', 'juttu:juttu-a1', 'juttu:juttu-a2']);
});

test('(3) omia 0: jutun kuvat mukana kuten ennen', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-tyhja')), ['juttu:juttu-b1', 'juttu:juttu-b2']);
  assert.deepEqual(lista(N.oliolle({}, 'testi-tyhja', () => [])), ['juttu:juttu-b1', 'juttu:juttu-b2']);
});

test('(4) reitti (a) ennallaan: nosto-kentän juttu aina omien perässä, kerran, ja se lasketaan omiin', () => {
  const N = rakentaja();
  // oma 1 + (a) 1 = 2 < 3 → reitti (b) mukana; C on sekä (a) että (b) → kerran.
  assert.deepEqual(lista(N.tunnukselle('testi-a')), ['nosto:oma-a', 'juttu:juttu-c1', 'juttu:juttu-d1']);
  // omat 2 + (a) 1 = 3 → reitin (b) juttu D pois.
  assert.deepEqual(lista(N.tunnukselle('testi-a3')), ['nosto:a3-1', 'nosto:a3-2', 'juttu:juttu-e1']);
});

test('nähtävyysjutun oma lista (jutulle) ennallaan', () => {
  const N = rakentaja();
  const b = { kaupunki: 'testila', nimi: 'Testipaikka B', data: { kuvat: [kuva('juttu-b1'), kuva('juttu-b2')] } };
  assert.deepEqual(lista(N.jutulle(b)), ['nosto:juttu-b1', 'nosto:juttu-b2']);
});
