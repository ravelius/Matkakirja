/*
 * Miniatyyripiirrosten eheystarkistus (omistajan tilaus 15.8.2026).
 *
 * Kolme asiaa, jotka rikkoutuisivat hiljaa ilman konetta:
 *   1. Jokainen taulun polku osoittaa olemassa olevaan tiedostoon —
 *      kuollut polku näkyisi vasta napauttamalla juuri sitä pistettä.
 *   2. Jokainen kohteen nimi vastaa kartan kohdetta JA nähtävyys-
 *      juttua: kortin lauseet tulevat jutusta ja piirroksesta
 *      avataan juttu, joten nimen kirjoitusasun on täsmättävä.
 *   3. Jokainen kuva on myös sw:n esilatauslistalla — kartta toimii
 *      offline, joten sen korttien pitää toimia myös.
 *
 * KAKSI ARVOMUOTOA (2.9.2026, assetit ämpäriin). Taulussa saa lukea
 * repon polku TAI pelkkä tunnus, jonka kuva on vain ämpärissä. Kohdat 1
 * ja 3 koskevat vain repon polkuja: ämpärikuvaa ei ole reposta
 * tarkistettavissa eikä sitä esiladata palvelutyöntekijässä (osoite on
 * eri alkuperää, ja puuttuva kuva putoaa varatäpläksi). Tunnuksille on
 * oma muototarkistus alempana.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { MINIATYYRIT } from '../js/packs/miniatyyrit.js';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { assetOsoite } from '../js/media.js';
import { KOHTAAMIS_R2_JUURI } from '../js/kohtaamiskuvat-data.js';

const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

/** Onko arvo repon polku (vs. pelkkä ämpäritunnus)? */
const onPolku = (arvo) => arvo.includes('/');

test('jokainen miniatyyri osoittaa olemassa olevaan tiedostoon', () => {
  for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
    for (const [nimi, polku] of Object.entries(kohteet)) {
      if (!onPolku(polku)) continue;
      assert.ok(existsSync(new URL(`../${polku}`, import.meta.url)),
        `${kaupunki}/${nimi}: tiedostoa ${polku} ei ole`);
    }
  }
});

/*
 * TUNNUS ON <kaupunki>-<slug> JA KAUPUNKI ON OLEMASSA.
 *
 * Tunnus on samalla ämpärin tiedostonimi, joten kirjoitusvirhe ei näy
 * missään muualla kuin puuttuvana kuvana — ja puuttuva kuva on tässä
 * mallissa laillinen tila (kuva on vasta tilattu), joten sitä ei voi
 * käyttää virheen merkkinä. Muoto on siis ainoa portti.
 */
test('jokainen ämpäritunnus on muotoa <kaupunki>-<slug>', () => {
  for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
    for (const [nimi, tunnus] of Object.entries(kohteet)) {
      if (onPolku(tunnus)) continue;
      assert.ok(KAUPUNKIKARTAT[kaupunki],
        `${kaupunki}: kaupunkia ei ole kohdekartoissa (maakartat.js)`);
      assert.match(tunnus, /^[a-z0-9]+(?:-[a-z0-9]+)+$/,
        `${kaupunki}/${nimi}: tunnus "${tunnus}" ei ole pienin kirjaimin ja väliviivoin`);
      assert.ok(tunnus.startsWith(`${kaupunki}-`) && tunnus.length > kaupunki.length + 1,
        `${kaupunki}/${nimi}: tunnus "${tunnus}" ei ala kaupungin tunnuksella`);
    }
  }
});

/*
 * Lukupolun on osuttava siihen kansioon, johon kuvaputki toimittaa
 * (posti 2.9.2026: `kohtaamiset/miniatyyrit/<tunnus>.jpg`). Juuri
 * luetaan kohtaamiskuvien taulusta, jotta pelin kaksi ämpärivakiota
 * eivät voi eriytyä toisistaan.
 */
test('tunnus luetaan ämpärin miniatyyrikansiosta JPG:nä', () => {
  assert.equal(assetOsoite('miniatyyrit', 'ateena-akropolis-museo'),
    `${KOHTAAMIS_R2_JUURI}/miniatyyrit/ateena-akropolis-museo.jpg`);
  // Repon polku ei muutu ennen kuin siirtolippu käännetään.
  assert.equal(assetOsoite('miniatyyrit', 'assets/kartat/miniatyyrit/rooma-pantheon.webp'),
    'assets/kartat/miniatyyrit/rooma-pantheon.webp');
});

/*
 * Nimen on vastattava kartan kohdetta — piirros asemoidaan ja
 * kytketään nimellä. Juttuvaatimus poistui 15.8.2026: miniatyyrikortti
 * (jonka lauseet tulivat jutusta) poistettiin v730:ssä, ja kyltin
 * napautus avaa jutun TAI wikin — kohde ilman kumpaakaan näyttää
 * piirroksen ilman napautusta, kuten sen numeroympyräkin teki.
 */
test('jokainen miniatyyrin nimi vastaa kartan kohdetta', () => {
  for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
    const kartalla = new Set((KAUPUNKIKARTAT[kaupunki]?.kohteet ?? []).map((k) => k.nimi));
    for (const nimi of Object.keys(kohteet)) {
      assert.ok(kartalla.has(nimi),
        `${kaupunki}: "${nimi}" ei ole kartan kohde (maakartat.js)`);
    }
  }
});

test('jokainen repon miniatyyri on sw:n esilatauslistalla', () => {
  for (const kohteet of Object.values(MINIATYYRIT)) {
    for (const polku of Object.values(kohteet)) {
      if (!onPolku(polku)) continue;
      assert.ok(SW.includes(`'./${polku}'`),
        `${polku} puuttuu sw.js:n SHELL-listalta — kortti ei toimisi offline.`);
    }
  }
});
