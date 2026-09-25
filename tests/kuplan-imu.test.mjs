/*
 * PUHEKUPLAT SULKEUTUVAT NAPAUTUKSESTA JA IMEYTYVÄT PLUSKUPLAAN.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Ota pulun puhekuplista
 * sulkemis ruksi pois. Ja muuta toiminto niin että Puhekuplat voi
 * sulkea napauttamalla niitä. Saisiko sulkemisen animoitua niin että
 * kuplat ihan kuin imeytyisivät pienen puhekuplan sisälle joka jää
 * jäljelle sulkeutumisen jälkeen ja jossa on se pieni + symboli
 * uudelleen avausta varten."*
 *
 * Tämä vartioi lähdetason sopimukset. Todellinen liike mitataan
 * selaimessa (tools/savukkeet/savuke-kuplan-imu.mjs), jossa on myös
 * vastakoe.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';

const RAAKA = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
const LAHDE = tyhjaaEiKoodi(RAAKA);
const TYYLIT = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

test('sulkuruksia ei ole enää koodissa eikä tyyleissä', () => {
  assert.equal(LAHDE.includes('pollo-kuplapino-sulje'), false,
    'js/pollo.js rakentaa yhä sulkuruksin');
  assert.equal(TYYLIT.includes('.pollo-kuplapino-sulje'), false,
    'css/styles.css tyylittää yhä sulkuruksin');
});

test('kuplan napautus sulkee eikä avaa chattia', () => {
  assert.match(LAHDE, /supistaKuplatPalautukseen\(\)/,
    'napautus ei kutsu sulkemista');
  /*
   * Chatti on yhä varareitti: jos puhekuplia ei ollut (esim. pelkkä
   * ohjekupla), napautus avaa chatin kuten ennen. Juuri se järjestys
   * vartioidaan — avaa() ei saa olla ensin.
   */
  assert.match(LAHDE, /if \(!this\.supistaKuplatPalautukseen\(\)\) this\.avaa\(\);/,
    'sulku ja chatin varareitti ovat väärässä järjestyksessä');
});

test('sulku katkaisee kesken olevan puheenvuoron', () => {
  /*
   * Ilman tätä osiin jaetun puheenvuoron loput osat saapuisivat
   * sekunnin päästä ja avaisivat pinon uudelleen.
   */
  const runko = LAHDE.slice(
    LAHDE.indexOf('supistaKuplatPalautukseen() {'),
    LAHDE.indexOf('piilotaPuhekuplat() {'),
  );
  assert.match(runko, /this\.peruPuheenvuoro\(\)/,
    'sulku ei katkaise kesken olevaa puheenvuoroa');
  /*
   * PLUSKUPLA POISTETTU (omistaja 18.9.2026, PAATOKSET 34 kohta 20 a):
   * sulku ei enää näytä mitään kohdetta, mutta MUISTI on jäätävä —
   * chatin ylärivin "Näytä puhekuplat" lukee juuri sen.
   */
  assert.match(runko, /this\.viimeisinPiilotettuKupla = \{ kupla: viimeinen/,
    'sulku ei muista viimeisintä kuplaa');
  assert.match(runko, /this\.imeKuplatPalautukseen\(puheet, null\)/,
    'sulku antaa imulle yhä kohteen — pluskuplan piti kadota');
});

test('imu mittaa kohteen eikä laske sitä', () => {
  const runko = LAHDE.slice(
    LAHDE.indexOf('imeKuplatPalautukseen('),
    LAHDE.indexOf('supistaKuplatPalautukseen() {'),
  );
  assert.match(runko, /getBoundingClientRect\(\)/,
    'imu ei mittaa pluskuplan todellista paikkaa');
  // Vähän liikettä -asetus ohittaa lennon, kuten muuallakin pelissä.
  assert.match(runko, /vahaLiiketta\(\)/, 'imu ei kunnioita liikeherkkyyttä');
  // Kutistus sisäänpäin: ilman origoa kupla luisuisi vasemmasta
  // yläkulmasta eikä näyttäisi imeytyvän. Merkkijonon sisältö luetaan
  // raa'asta lähteestä, koska tyhjays tyhjentää jonot.
  assert.match(RAAKA, /transformOrigin = 'center center'/);
});

test('palautettu kupla nollataan imun jäljiltä', () => {
  assert.match(LAHDE, /nollaaKuplanImu\(kupla\)/, 'nollausta ei ole');
  const palautus = LAHDE.slice(
    LAHDE.indexOf('palautaViimeisinKupla() {'),
    LAHDE.indexOf('unohdaPiilotettuKupla() {'),
  );
  assert.match(palautus, /this\.nollaaKuplanImu\(/,
    'palautus ei nollaa imun tyylejä — kupla palaisi läpinäkyvänä tynkänä');
});

/*
 * PLUSKUPLA POIS, "NÄYTÄ PUHEKUPLAT" TILALLE (omistaja 18.9.2026,
 * Raamattu "KARTTAUUDISTUKSEN PAATOKSET 34" kohta 20). Elementtiä ei
 * enää piirretä, joten imeytymisen kohde katoaa ja kuplat vain
 * sulkeutuvat; paluureitti on chatin ylärivillä.
 */
test('pluskuplaa ei enää rakenneta', () => {
  assert.equal(RAAKA.includes("'pollo-kuplapalautus'"), false,
    'js/pollo.js rakentaa yhä pluskuplan');
  assert.equal(LAHDE.includes('varmistaKuplanPalautus'), false,
    'pluskuplan tehdas on yhä koodissa');
});

test('chatin ylärivillä on Näytä puhekuplat -nappi, joka piiloutuu tyhjänä', () => {
  assert.match(RAAKA, /'pollo-naytakuplat', 'Näytä puhekuplat'/);
  assert.match(TYYLIT, /button\.pollo-naytakuplat \{/);
  assert.match(TYYLIT, /\.pollo-naytakuplat\[hidden\] \{ display: none; \}/);
  // Piilotus, ei disabled-tila (omistajan kohta 20 c).
  const runko = LAHDE.slice(
    LAHDE.indexOf('paivitaKuplanPalautus() {'),
    LAHDE.indexOf('tuhoaKuplamuisti() {'),
  );
  assert.match(runko, /this\.kuplaPalautusNappi\.hidden = !muistettu/,
    'nappi ei piiloudu, kun näytettävää ei ole');
  assert.equal(runko.includes('disabled'), false,
    'nappi jää disabled-tilaan piilottamisen sijaan');
});
