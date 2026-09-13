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
   * sekunnin päästä, avaisivat pinon uudelleen ja söisivät juuri
   * syntyneen pluskuplan. Mitattu: pluskupla katosi 400 ms:ssa.
   */
  const runko = LAHDE.slice(
    LAHDE.indexOf('supistaKuplatPalautukseen() {'),
    LAHDE.indexOf('piilotaPuhekuplat() {'),
  );
  assert.match(runko, /this\.peruPuheenvuoro\(\)/,
    'sulku ei katkaise kesken olevaa puheenvuoroa');
  assert.match(runko, /this\.varmistaKuplanPalautus\(\)/,
    'sulku ei näytä pluskuplaa');
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

test('pluskupla on yhä olemassa ja siinä on plusmerkki', () => {
  assert.match(RAAKA, /'pollo-kuplapalautus', '\+'/);
  assert.match(TYYLIT, /\.pollo-kuplapalautus \{/);
});
