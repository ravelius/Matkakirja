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
import { readFileSync, readdirSync } from 'node:fs';
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
 * AUKKO ON UMMESSA (11.9.2026).
 *
 * `muu` oli yleistyyppi, jolla oli aineistossa 202 riviä eikä yhtään
 * symbolia — 98 niistä ilman omaa `symboli`-kenttää, eli ne eivät
 * piirtyneet kartalle lainkaan. Jokainen rivi luettiin ja luokiteltiin
 * omaan tekstiinsä nojaten johonkin taulun tuntemaan tyyppiin, joten
 * lista on nyt tyhjä. Se pidetään tässä tyhjänä eikä poisteta, jotta
 * seuraava aukko saa saman näkyvän paikan — ja jotta alla oleva
 * vartija kertoo, jos `muu` yrittää palata.
 */
const RATKAISEMATTOMAT = new Set();

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

/*
 * `muu` EI SAA PALATA. Yleistyyppi ei ole karttamerkki: se on aukko,
 * joka näyttää aineistossa siistiltä mutta katoaa kartalta hiljaa.
 * Uusi nosto kuuluu johonkin taulun tuntemaan tyyppiin — tai jos ei
 * kuulu, taulu (ja sen myötä karttasymboli) on päätettävä erikseen.
 */
test('yleistyyppi muu ei ole palannut aineistoon', () => {
  assert.equal(aineistonTyypit().has('muu'), false,
    'tyyppi `muu` on takaisin aineistossa — se ei piirry kartalle');
  /*
   * Sama myös fokuskohteet-pakeista, joita MAASTOKOHTEET ei kata:
   * `muu` asui 11.9.2026 asti molemmissa tiedostoperheissä, ja
   * tuontilista tuntee vain toisen. Luetaan siis lähdetiedostot.
   */
  const hakemisto = new URL('../js/packs/', import.meta.url);
  const osumat = [];
  for (const nimi of readdirSync(hakemisto)) {
    if (!nimi.endsWith('.js')) continue;
    const lahde = readFileSync(new URL(nimi, hakemisto), 'utf8');
    if (/^\s*tyyppi: 'muu',\s*$/m.test(lahde)) osumat.push(nimi);
  }
  assert.deepEqual(osumat, [], `tyyppi \`muu\` löytyi pakeista: ${osumat.join(', ')}`);
});
