/*
 * KOHDEKARTAN MERKIT (js/nahtavyydet.js).
 *
 * Omistajan kuvakaappaus 6.9.2026 klo 01.09 (iPhone, Ateenan
 * kaupunkilehti): *"Kartalla pisteitä jotka eivät toimi"*. Kaksi eri
 * vikaa saman näköisenä:
 *
 *   1. Miniatyyri ei latautunut (ämpärin r2.dev vastasi 429:llä koko
 *      purskeeseen), ja merkki putosi varatäpläksi ENSIMMÄISESTÄ
 *      virheestä. Kuva oli koko ajan ämpärissä.
 *   2. Kolmella Sevillan kohteella ei ollut juttua eikä wiki-otsikkoa,
 *      joten merkki ei ollut napautettava lainkaan.
 *
 * Nämä testit pitävät molemmat korjaukset paikallaan.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';

const LAHDE = readFileSync(new URL('../js/nahtavyydet.js', import.meta.url), 'utf8');

test('miniatyyri ladataan sitkeästi: täplä vasta kaikkien yritysten jälkeen', () => {
  /*
   * Lataus kulkee js/media.js:n lataaKuvaSitkeasti-funktion läpi, joka
   * uusii saman osoitteen kasvavalla odotuksella ja kutsuu onVirhe-
   * haaraa vasta viimeisen yrityksen jälkeen. Suora `pikku.src = …`
   * yhdessä error-kuuntelijan kanssa oli juuri se, mikä pudotti
   * ohimenevän 429:n saaneen kohteen täpläksi.
   */
  assert.match(LAHDE, /lataaKuvaSitkeasti\(pikku, miniatyyri, \{\s*onVirhe:/,
    'kohdekartan miniatyyri kulkee sitkeän latauksen läpi');
  assert.doesNotMatch(LAHDE, /pikku\.addEventListener\('error'/,
    'täplään ei saa pudota suoraan ensimmäisestä virheestä');
  assert.doesNotMatch(LAHDE, /pikku\.src\s*=/,
    'osoite asetetaan vain sitkeän latauksen kautta (uusinta ja jono)');
});

test('puuttuva piirros vie koko merkin: kartalla vain piirretyt', () => {
  /*
   * PAATOKSET 34 kohta 18 a (omistaja 18.9.2026): nähtävyyskartalle
   * jäävät VAIN piirretyt nähtävyysrakennukset. Ennen puuttuva kuva
   * pudotti merkin varatäpläksi — juuri se vaalea ympyrä, joka pyydettiin
   * pois. Kohde ei katoa pelistä: se on kaupunkiliuskan sisäinen nosto
   * (kaupunkikartanSiirretyt) ja avautuu sieltä samalla kortilla.
   */
  const virhehaara = LAHDE.match(/lataaKuvaSitkeasti\(pikku, miniatyyri, \{[\s\S]{0,300}?\}\);/)?.[0] ?? '';
  assert.match(virhehaara, /pikku\.remove\(\)/);
  assert.match(virhehaara, /piste\.remove\(\)/, 'merkki lähtee kartalta piirroksen mukana');
  assert.doesNotMatch(virhehaara, /classList\.remove\('kohde-piirros'\)/, 'täplää ei jää');
  // Miniatyyritön kohde ei piirry kartalle lainkaan.
  // (Poikkeus: kartta, jolla on `numeroympyrat: true`, ks. alla.)
  assert.match(LAHDE, /if \(!miniatyyri && !kartta\.numeroympyrat\) \{\s*avaajat\.push\(null\);\s*return;/);
  assert.match(LAHDE, /const avattava = Boolean\(k\.teksti \|\| k\.wiki\);/);
  assert.match(LAHDE, /html\(avattava \? 'button' : 'span',/);
});

test('jokainen kohdekartan merkki on napautettava (juttu tai wiki)', () => {
  /*
   * Sääntö: jokainen kartalla näkyvä merkki on nimetty JA napautettava.
   * Sevillan Maestranza, Trianan silta ja Plaza de España olivat
   * 29.8.–6.9.2026 kartaston ainoat, joilla ei ollut kumpaakaan; ne
   * saivat englanninkielisen wiki-otsikon (js/wiki.js fetchSummary
   * kokeilee fi:n ensin ja siirtyy englantiin).
   */
  const ilman = [];
  for (const [kaupunki, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    for (const kohde of kartta.kohteet ?? []) {
      const juttu = NAHTAVYYSJUTUT[kaupunki]?.[kohde.nimi];
      if (!(juttu?.teksti ?? kohde.teksti) && !kohde.wiki) {
        ilman.push(`${kaupunki}: ${kohde.nimi}`);
      }
    }
  }
  assert.deepEqual(ilman, [],
    'kohteelle on kirjoitettava juttu tai annettava wiki-otsikko — '
    + 'muuten kartalle jää merkki, jota ei voi napauttaa');
});

test('Sevillan kolme kohdetta osoittavat englanninkielisiin artikkeleihin', () => {
  // Otsikot tarkistettu Wikipedian rajapinnasta 6.9.2026: fi vastaa
  // 404:llä ja en palauttaa tavallisen artikkelin (ei täsmennyssivua).
  const nimella = (nimi) => KAUPUNKIKARTAT.sevilla.kohteet.find((k) => k.nimi === nimi);
  assert.equal(nimella('Maestranzan areena').wiki, 'Maestranza (Seville)');
  assert.equal(nimella('Trianan silta').wiki, 'Puente de Isabel II');
  assert.equal(nimella('Plaza de España').wiki, 'Plaza de España, Seville');
});

test('numeroympyrat-lippu pitää kohteet kartalla eikä siirrä niitä liuskaan (Bryssel, Ljubljana, Košice)', async () => {
  const { kaupunkikartanSiirretyt } = await import('../js/nahtavyydet.js');
  for (const id of ['bryssel', 'ljubljana', 'kosice']) {
    assert.equal(KAUPUNKIKARTAT[id].numeroympyrat, true, `${id}: lippu puuttuu`);
    assert.deepEqual(kaupunkikartanSiirretyt(null, id), [], `${id}: kohteet eivät saa siirtyä liuskan "Muut"-riville`);
  }
  // Muut kartat ennallaan: Pariisin miniatyyrittömät siirtyvät edelleen liuskaan.
  assert.ok(!KAUPUNKIKARTAT.pariisi.numeroympyrat);
  assert.ok(kaupunkikartanSiirretyt(null, 'pariisi').length > 0, 'Pariisin siirretyt katosivat');
});

test('numeroympyrä syntyy vain miniatyyrittömälle kohteelle lipun kartalla, numero sisällä', () => {
  assert.match(LAHDE, /if \(!miniatyyri\) \{\s*piste\.classList\.add\('kohde-numeroympyra'\);\s*piste\.appendChild\(html\('span', 'kohde-numeroteksti', numero\)\);/);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.maakartta-piste\.kohde-numero\.kohde-numeroympyra\s*\{[^}]*width:\s*26px/);
});

test('numeroympyröiden väistö: lähekkäiset ympyrät erotetaan, kaukaiset jäävät paikoilleen', async () => {
  const { laskeNumeroympyroidenVaisto } = await import('../js/nahtavyydet.js');
  const erotus = (paikat, v, a, b) => Math.hypot(
    (paikat[b].X + v[b].vx) - (paikat[a].X + v[a].vx),
    (paikat[b].Y + v[b].vy) - (paikat[a].Y + v[a].vy),
  );
  // Pari 10 px:n päässä ja kolmas kaukana.
  const pari = [{ X: 100, Y: 100 }, { X: 110, Y: 100 }, { X: 300, Y: 300 }];
  const v = laskeNumeroympyroidenVaisto(pari);
  assert.ok(erotus(pari, v, 0, 1) >= 30 - 0.01, 'pari jäi päällekkäin');
  assert.deepEqual(v[2], { vx: 0, vy: 0 }, 'kaukainen ympyrä ei saa liikkua');
  // Siirto on pienin mahdollinen: pari liikkuu pitkin yhdistävää viivaa.
  assert.ok(Math.abs(v[0].vy) < 0.001 && Math.abs(v[1].vy) < 0.001);
  // Täsmälleen samassa pisteessä olevat erotetaan.
  const sama = [{ X: 50, Y: 50 }, { X: 50, Y: 50 }];
  const vs = laskeNumeroympyroidenVaisto(sama);
  assert.ok(erotus(sama, vs, 0, 1) >= 30 - 0.01);
  // Kolmen ympyrän rykelmä: kaikki parit erillään, siirto katossa.
  const kolme = [{ X: 100, Y: 100 }, { X: 112, Y: 104 }, { X: 106, Y: 118 }];
  const v3 = laskeNumeroympyroidenVaisto(kolme);
  for (const [a, b] of [[0, 1], [0, 2], [1, 2]]) assert.ok(erotus(kolme, v3, a, b) >= 26, `${a}-${b}`);
  for (const s of v3) assert.ok(Math.hypot(s.vx, s.vy) <= 24.001, 'siirto ylitti katon');
});

test('numeroympyrän väistö kytketään kartalle: viiva ja CSS-siirto zoomin vastaskaalauksella', () => {
  assert.match(LAHDE, /vaistaNumeroympyrat\(kotelo, numeroympyrat\);/);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.kohde-numeroympyra\.kohde-vaistetty\s*\{[^}]*var\(--vx, 0px\) \/ var\(--zoom\)/);
  assert.match(css, /\.kohde-osoitin\s*\{/);
});
