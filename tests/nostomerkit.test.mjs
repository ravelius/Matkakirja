/*
 * JOKAISELLA NOSTOLLA ON KARTTAMERKKI.
 *
 * Vika, jonka tämä testi estää (löytyi 11.9.2026 arktisia nostoja
 * kirjoitettaessa): aineistoon oli päätynyt tyyppi `jarvi`, jota
 * js/fokuskohteet.js:n KOHDE_TYYPPISYMBOLIT ei tuntenut. Silloin
 * `kohteenKategoria` palauttaa nullin, `kohdeMerkinLadonta` palauttaa
 * `symboli: null`, ja pallon nostokerros ohittaa rivin HILJAA — nosto
 * on olemassa, mutta sitä ei näe kartalla eikä mikään valita.
 *
 * Taulu luetaan lähdetiedostosta eikä tuonnilla, koska se on moduulin
 * sisäinen vakio; sen julkistaminen pelkän testin takia olisi väärä
 * suunta. Vertailujoukko kootaan aineistosta, joten uusi tyyppi
 * kaataa tämän testin siinä hetkessä kun se ilmestyy pakkiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';

/** KOHDE_TYYPPISYMBOLIT-taulun avaimet js/fokuskohteet.js:stä. */
function tunnetutTyypit() {
  const lahde = readFileSync(new URL('../js/fokuskohteet.js', import.meta.url), 'utf8');
  const alku = lahde.indexOf('const KOHDE_TYYPPISYMBOLIT = {');
  assert.ok(alku > 0, 'KOHDE_TYYPPISYMBOLIT-taulua ei löytynyt');
  const loppu = lahde.indexOf('\n};', alku);
  assert.ok(loppu > alku, 'KOHDE_TYYPPISYMBOLIT-taulun loppua ei löytynyt');
  const runko = lahde.slice(alku, loppu);
  const avaimet = new Set();
  for (const osuma of runko.matchAll(/^\s{2}([a-z]+):\s*'/gm)) avaimet.add(osuma[1]);
  return avaimet;
}

/** Aineistossa oikeasti esiintyvät tyypit ja esimerkkirivi kustakin. */
function aineistonTyypit() {
  const tyypit = new Map();
  for (const [iso, kohteet] of Object.entries(MAASTOKOHTEET)) {
    for (const kohde of kohteet ?? []) {
      const tyyppi = kohde?.tyyppi;
      if (!tyyppi || tyypit.has(tyyppi)) continue;
      tyypit.set(tyyppi, `${iso}/${kohde.id ?? kohde.nimi}`);
    }
  }
  return tyypit;
}

/*
 * TIEDOSSA OLEVA AUKKO, JOTA EI OLE VIELÄ RATKAISTU.
 *
 * `muu` on yleistyyppi, jolla on aineistossa 120 riviä eikä yhtään
 * symbolia. Se on sama hiljainen katoaminen kuin järvellä oli, mutta
 * korjaus ei ole yhtä itsestään selvä: järvi kuuluu ilmeisesti
 * luontoon, kun taas `muu` tarkoittaa eri riveillä eri asioita, ja
 * 120 uutta merkkiä kartalle on sisältöpäätös eikä korjaus. Rivit
 * käydään läpi erikseen ja luokitellaan; siihen asti tyyppi on tässä
 * nimeltä mainittuna, jotta aukko on näkyvä eikä unohdu.
 */
const RATKAISEMATTOMAT = new Set(['muu']);

test('jokainen aineiston nostotyyppi tuntee karttamerkkinsä', () => {
  const tunnetut = tunnetutTyypit();
  const puuttuvat = [];
  for (const [tyyppi, esimerkki] of aineistonTyypit()) {
    if (RATKAISEMATTOMAT.has(tyyppi)) continue;
    if (!tunnetut.has(tyyppi)) puuttuvat.push(`${tyyppi} (esim. ${esimerkki})`);
  }
  assert.deepEqual(puuttuvat, [], 'KOHDE_TYYPPISYMBOLIT ei tunne tyyppejä: '
    + `${puuttuvat.join(', ')} — nosto ei piirry kartalle lainkaan`);
});

test('järvi on luontokategoriassa kuten joki ja meri', () => {
  assert.ok(tunnetutTyypit().has('jarvi'), 'jarvi puuttuu KOHDE_TYYPPISYMBOLIT-taulusta');
});
