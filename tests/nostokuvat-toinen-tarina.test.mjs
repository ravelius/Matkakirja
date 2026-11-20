/*
 * TOISEN TARINAN KUVAT EIVÄT NOSTOON, JOLLA ON OMAT KUVAT (KK:N PÄÄTÖS 20.11.2026 klo 15.08, aiempi: P-261120-5, P-261120-10,
 * P-261117-119; kortti noston-kuvat 7 ja 9). tools/vienti/nostokuvat.mjs: reitti (b) eli linkittävän kohdekartan kohteen samanniminen
 * nähtävyysjuttu (kaupunki + nimi) tuo kuvansa vain nostolle, jolla ei ole yhtään kuvaa lähteistä nosto, kohde ja reitti (a) (juttu,
 * jonka nosto-kenttä on tunnus). Ennen Notre-Damen palotarina sai myös saman paikan yleisen jutun kuvat.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nostokuvaRakentaja } from '../tools/vienti/nostokuvat.mjs';

const U = (n) => `https://media.example/testi/${n}.jpg`;
const kuva = (n) => ({ osoite: U(n), lyhyt: n });
const OMAT = { 'testi-oma': [kuva('oma-1')], 'testi-a': [kuva('oma-a')] };

function rakentaja() {
  const kokoelmat = {
    elaintayt: { alkiot: [] },
    kohdekartat: { alkiot: [{ kaupunki: 'testila', kohteet: [
      { nimi: 'Testipaikka A', nosto: 'testi-oma' },
      { nimi: 'Testipaikka B', nosto: 'testi-tyhja' },
      { nimi: 'Testipaikka D', nosto: 'testi-a' },
      { nimi: 'Testipaikka C', nosto: 'testi-a' },
    ] }] },
    nahtavyydet: { alkiot: [
      { kaupunki: 'testila', nimi: 'Testipaikka A', data: { kuvat: [kuva('juttu-a1'), kuva('juttu-a2')] } },
      { kaupunki: 'testila', nimi: 'Testipaikka B', data: { kuvat: [kuva('juttu-b1'), kuva('juttu-b2')] } },
      // Reitti (a): nosto-kenttä osoittaa tunnukseen; sama juttu myös reitillä (b) (kohde C) → kerran.
      { kaupunki: 'testila', nimi: 'Testipaikka C', nosto: 'testi-a', data: { kuvat: [kuva('juttu-c1')] } },
      { kaupunki: 'testila', nimi: 'Testipaikka D', data: { kuvat: [kuva('juttu-d1')] } },
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

test('(1) nosto, jolla omat kuvat: saman paikan toisen jutun kuvat eivät mukana', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-oma')), ['nosto:oma-1']);
  // Sisäkkäinen olio (fokusvirran takynosto) samalla säännöllä.
  assert.deepEqual(lista(N.oliolle({}, 'testi-oma', () => N.takyKuvat({ kuva: kuva('taky-1') }, 'nosto'))), ['nosto:taky-1']);
});

test('(2) nosto ilman omia kuvia: jutun kuvat mukana kuten ennen', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-tyhja')), ['juttu:juttu-b1', 'juttu:juttu-b2']);
  assert.deepEqual(lista(N.oliolle({}, 'testi-tyhja', () => [])), ['juttu:juttu-b1', 'juttu:juttu-b2']);
});

test('(3) reitti (a) ennallaan: nosto-kentän juttu mukana omien perässä, kerran; reitin (b) toinen juttu pois', () => {
  const N = rakentaja();
  assert.deepEqual(lista(N.tunnukselle('testi-a')), ['nosto:oma-a', 'juttu:juttu-c1']);
});

test('nähtävyysjutun oma lista (jutulle) ennallaan', () => {
  const N = rakentaja();
  const b = { kaupunki: 'testila', nimi: 'Testipaikka B', data: { kuvat: [kuva('juttu-b1'), kuva('juttu-b2')] } };
  assert.deepEqual(lista(N.jutulle(b)), ['nosto:juttu-b1', 'nosto:juttu-b2']);
});
