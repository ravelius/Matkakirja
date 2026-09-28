/*
 * Astronautin kameran kuvaselain (omistaja 27.9.2026 klo 23.5x Fablen
 * kautta; Linssisepän suositus docs/raportit/astronautin-kuvaselain-
 * 20260928.md, natiivi proto linssiseppa/astro-selain c5b073cd).
 * Luvut ovat samat kuin natiivin Kuvanakyma.cs:ssä (web on malli).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  REUNAN_OSUUS, PYYHKAISYN_RAJA, PYYHKAISYN_NOPEUS, LIUKU_ULOS_MS, LIUKU_SISAAN_MS,
  NIMEN_KIRKASTUS_MS, reunalla, pyyhkaisyVaihtaa,
} from '../js/linssit/satelliitti.js';
import { KUVAN_AJON_MS } from '../js/linssit/satelliitti-avaruus.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const lahde = lue('../js/linssit/satelliitti.js');
const avaruus = lue('../js/linssit/satelliitti-avaruus.js');
const tyyli = lue('../css/satelliitti.css');

test('luvut ovat natiivin Kuvanakyma.cs:n luvut', () => {
  assert.equal(REUNAN_OSUUS, 0.22);
  assert.equal(PYYHKAISYN_RAJA, 0.2);
  assert.equal(PYYHKAISYN_NOPEUS, 0.6);
  assert.equal(LIUKU_ULOS_MS, 140);
  assert.equal(LIUKU_SISAAN_MS, 160);
  assert.equal(NIMEN_KIRKASTUS_MS, 1200);
  assert.equal(KUVAN_AJON_MS, 900);
});

test('reunan napautus: ulommat 22 % kummaltakin puolelta, keskiosa ei selaa', () => {
  assert.equal(reunalla(10, 400), -1);
  assert.equal(reunalla(87, 400), -1);
  assert.equal(reunalla(89, 400), 0);
  assert.equal(reunalla(200, 400), 0);
  assert.equal(reunalla(311, 400), 0);
  assert.equal(reunalla(313, 400), 1);
  assert.equal(reunalla(390, 400), 1);
  // Ilman asettelua (leveys 0) ei selata.
  assert.equal(reunalla(0, 0), 0);
});

test('pyyhkäisy vaihtaa kuvan matkasta tai vauhdista, muuten kuva palaa', () => {
  assert.equal(pyyhkaisyVaihtaa(-81, 400, 1000), true, 'yli 20 % leveydestä');
  assert.equal(pyyhkaisyVaihtaa(79, 400, 1000), false, 'alle 20 % hitaasti');
  assert.equal(pyyhkaisyVaihtaa(70, 400, 100), true, 'nopea veto 0,7 px/ms');
  assert.equal(pyyhkaisyVaihtaa(50, 400, 100), false, '0,5 px/ms ja 12,5 %');
});

test('eleet: reunan napautus ja vaakaveto selaavat vain zoomaamatta, nipistys voittaa', () => {
  assert.match(lahde, /Math\.abs\(dx\) > 10 && Math\.abs\(dx\) > 1\.3 \* Math\.abs\(dy\)/);
  assert.match(lahde, /sormet\.size === 1 && skaala <= 1\.01 && !liukuu && alku/);
  assert.match(lahde, /kesto >= 300/);
  assert.match(lahde, /Math\.hypot\(viimeinen\.x - alku\.x, viimeinen\.y - alku\.y\) >= 10/);
  // Kaksoisnapautuksen zoomi vain keskiosassa.
  assert.match(lahde, /if \(skaala <= 1\.01 && reunaLavalla\(e\.clientX\)\) return;/);
  // Toinen sormi kesken pyyhkäisyn palauttaa kuvan.
  assert.match(lahde, /else if \(pyyhkaisy\) \{[\s\S]{0,160}liu\(veto, 0, 120, 1, null\)/);
});

test('galleria jatkuu naapurikohteeseen: eteenpäin ensimmäinen, taaksepäin viimeinen kuva', () => {
  assert.match(lahde, /if \(j >= 0 && j < havainnot\.length\) \{ vaihda\(suunta, \(\) => nayta\(j\)\); return; \}/);
  assert.match(lahde, /vaihda\(suunta, \(\) => siirry\(suunta, true\)\)/);
  assert.match(lahde, /indeksi: galleria \? \(suunta > 0 \? 0 : viimeinen\) : undefined, sisaan: suunta/);
  // Maailmankierros tulee aineistosta, sama kuin natiivissa.
  assert.match(lahde, /import \{ SATELLIITTI_KIERROS, SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE \} from '\.\/satelliitti-data\.js'/);
  assert.match(lahde, /naapuri\(kierros, kohde\.tunnus, suunta\)/);
});

test('‹ › alhaalla keskellä vievät viereisen kohteen oletuskuvaan; ei tekstiä eikä laskuria', () => {
  assert.match(lahde, /nappi\('satelliitti-kohdenappi', '‹', 'Edellinen kohde kartalla'\)/);
  assert.match(lahde, /nappi\('satelliitti-kohdenappi', '›', 'Seuraava kohde kartalla'\)/);
  assert.match(lahde, /vaihda\(suunta, \(\) => siirry\(suunta, false\)\)/);
  assert.match(tyyli, /\.satelliitti-kohteet \{[\s\S]*left: 50%;[\s\S]*bottom: calc\(12px \+ env\(safe-area-inset-bottom, 0px\)\);[\s\S]*transform: translateX\(-50%\)/);
  assert.match(tyyli, /\.satelliitti-kohdenappi \{[\s\S]*width: 38px;[\s\S]*height: 38px;/);
  assert.match(tyyli, /\.satelliitti-kohteet\[hidden\] \{ display: none; \}/);
});

test('liuku: vanha ulos 140 ms, uusi sisään neljänneksen matkalta häivyttäen 160 ms; liikkeenvähennys suoraan', () => {
  assert.match(lahde, /liu\(veto, -Math\.sign\(suunta\) \* w, LIUKU_ULOS_MS, 1,/);
  assert.match(lahde, /liu\(Math\.sign\(suunta\) \* w \* 0\.25, 0, LIUKU_SISAAN_MS, 0, esilataa\)/);
  assert.match(lahde, /if \(liikePois\) \{ veto = 0; vaihto\(\);/);
  // Suljettu näkymä ei jätä animaatiota pyörimään.
  assert.match(lahde, /lopetaVinkki\(\);\n\s*lopetaLiuku\(\);/);
});

test('pallo kuvan takana: läpikuultava tausta ja kamera kohteen ylle enintään lepokorkeudelle', () => {
  assert.match(tyyli, /\.satelliitti-katselu \{[\s\S]*background: rgba\(4, 9, 7, 0\.7\)/);
  assert.match(lahde, /if \(kortti\) avaruus\?\.katsoKohteeseen\?\.\(kohde\.lat, kohde\.lon\)/);
  // Oletuskesto on yhä KUVAN_AJON_MS; Pulun pyöräytys (28.9.2026) antaa oman kestonsa.
  assert.match(avaruus, /katsoKohteeseen: \(lat, lon, \{ kestoMs = KUVAN_AJON_MS \} = \{\}\) => \{[\s\S]*lopetaSeuranta\(\);[\s\S]*paataAvausajo\(\);[\s\S]*Math\.min\(nyt, lepoAlt\)[\s\S]*pallo\.pointOfView\(\{ lat, lng: lon, altitude: korkeus \},\s*reduced \? 0 : Math\.max\(0, Number\(kestoMs\) \|\| 0\)\)/);
});

test('kohteen nimi kirkastuu 1,2 s selaimella vaihdettaessa (ei liikkeenvähennyksessä)', () => {
  assert.match(lahde, /selite\.classList\.add\('satelliitti-selite-uusi'\)/);
  assert.match(tyyli, /\.satelliitti-selite\.satelliitti-selite-uusi \.satelliitti-selite-otsikko \{\s*animation: satelliitti-nimi-kirkastuu 1200ms ease-out;/);
  assert.match(tyyli, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*satelliitti-selite-uusi \.satelliitti-selite-otsikko \{ animation: none; \}/);
});

test('avaruussumu on piilossa kuvan ajan (ei suorakaidetta läpikuultavan taustan läpi)', () => {
  assert.match(tyyli, /body\.satelliitti-kuva-auki \.astro-sumu \{ visibility: hidden; \}/);
  assert.match(lahde, /document\.body\.classList\.add\(KUVA_AUKI_LUOKKA\)/);
});

test('reunavarjo ja valoreuna rajataan ympyrään (neliön reunat eivät näy)', () => {
  assert.match(avaruus, /clip-path:circle\(50% at 50% 50%\)/);
});

test('pienennetty selite on otsikkorivin kokoinen ja koko liukuu (js/tiivistys.js)', () => {
  assert.match(tyyli, /\.satelliitti-selite\.satelliitti-selite-kiinni \.satelliitti-selite-runko \{\s*position: absolute;\s*visibility: hidden;/);
  assert.match(lahde, /import \{ animoiKoko \} from '\.\.\/tiivistys\.js';/);
});

test('selite luetaan ääneen kertoja-asetuksen mukaan, säilöön, ja luenta loppuu kuvan mukana', () => {
  assert.match(lahde, /if \(!luentaKytkinPaalla\(\)\) return;/);
  assert.match(lahde, /lueAaneen\(teksti, null, \{ persoona: 'kertoja', sailio: SELITTEEN_SAILIO \}\)/);
  assert.match(lahde, /export const SELITTEEN_SAILIO = 'astro-selite';/);
  assert.match(lahde, /seliteTeksti\.textContent = h\.teksti \?\? kohde\.selite;\s*lueSelite\(h\);/);
  assert.match(lahde, /if \(luettu\) \{ try \{ pysaytaLukija\(\); \}/);
});
