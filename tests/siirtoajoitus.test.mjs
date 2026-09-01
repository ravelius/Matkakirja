/*
 * Nopanheiton siirtoketjun ajoitus ja järjestys.
 *
 * Omistajan tilaus 1.9.2026 illalla, sanatarkasti: *"voisit katsoa ja
 * miettiä kartta ajon paremmaksi kun pelaaja liikkuu nopalla. kartta
 * saisi zoomautua lähemmäksi ensin ja sitten vasta pelaaja alkaisi
 * liikkua. pelaajan nappulat saisi edetä vähän hitaammin."*
 *
 * Kaksi asiaa on vartioitava, ja kumpikaan ei näkyisi virheenä jos se
 * katoaisi — siirto vain palaisi hiljaa vanhaksi:
 *
 *   1. JÄRJESTYS. Ennakkozoomi on ODOTETTAVA ja sen on tapahduttava
 *      ENNEN kuin nappula poimitaan laudalta (movingPlayerId). Yksi
 *      poistettu `await` riittää palauttamaan vanhan yhtaikaisuuden.
 *   2. TAHTI. Askel on hitaampi kuin ennen mutta porrastettu, eikä
 *      pisin heitto saa venyä odotteluksi. Luvut ovat säädettäviä,
 *      joten rajat ovat väljät — vartioitava asia on suhde, ei desimaali.
 *
 * Ajoitus luetaan funktiosta (jalkamatkanAskel) ja järjestys
 * lähdetekstistä, samaan tapaan kuin tests/lento-ajoitus.test.mjs
 * vartioi avauslennon kytkennät.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { jalkamatkanAskel } from '../js/ui.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const KARTTA = readFileSync(new URL('../js/kartta.js', import.meta.url), 'utf8');

const luku = (lahde, nimi) => Number(lahde.match(new RegExp(`const ${nimi} = ([\\d.]+)`))[1]);

/* --- 1. tahti ------------------------------------------------------ */

test('yhden askeleen tahti on vanhaa hitaampi, muttei paljon', () => {
  const uusi = luku(UI, 'JALKAMATKAN_STEP_MS');
  const vanha = luku(UI, 'JALKAMATKAN_STEP_LYHIN_MS');
  // Vanha askel 640 ms on nyt alaraja; uusi perusaskel on "vähän
  // hitaampi" eli 1,3–1,5× siitä. Yli 1,5× ei ole enää vähän.
  assert.equal(vanha, 640, 'alaraja ei ole enää entinen askel');
  assert.ok(uusi / vanha >= 1.3 && uusi / vanha <= 1.5,
    `perusaskel ${uusi} ms on ${(uusi / vanha).toFixed(2)}× vanhasta — ei 1,3–1,5×`);
  assert.equal(jalkamatkanAskel(1), uusi, 'yhden askeleen matka ei saa perusaskelta');
});

test('lyhyet heitot kulkevat täydellä rauhalla', () => {
  const perus = luku(UI, 'JALKAMATKAN_STEP_MS');
  for (const n of [1, 2, 3, 4, 5]) {
    assert.equal(jalkamatkanAskel(n), perus, `${n} askelta ei kulje perustahdilla`);
  }
});

test('kuutonen ei veny odotteluksi eikä alita vanhaa tahtia', () => {
  const tauko = luku(UI, 'HYPYN_TAUKO_MS');
  const katto = luku(UI, 'JALKAMATKAN_KATTO_MS');
  const alaraja = luku(UI, 'JALKAMATKAN_STEP_LYHIN_MS');
  const askel = jalkamatkanAskel(6);
  const kesto = 6 * askel + 5 * tauko;
  assert.ok(askel >= alaraja, `kuutosen askel ${askel} ms alittaa vanhan tahdin`);
  assert.ok(kesto <= katto + 60, `kuutosen matka ${kesto} ms ylittää katon ${katto} ms`);
  // Vanha peli: 6 × 640 + 5 × 190 = 4790 ms. Uusi saa olla hitaampi,
  // muttei enempää kuin ~15 %, tai koko porrastus on turha.
  const ennen = 6 * alaraja + 5 * tauko;
  assert.ok(kesto >= ennen && kesto <= ennen * 1.15,
    `kuutosen matka ${kesto} ms ei ole entisen ${ennen} ms tuntumassa`);
});

test('tahti ei koskaan kiihdy heiton pidetessä', () => {
  let edellinen = Infinity;
  for (let n = 1; n <= 6; n++) {
    const askel = jalkamatkanAskel(n);
    assert.ok(askel <= edellinen, `askel kasvoi ${n}:ssä (${edellinen} → ${askel})`);
    edellinen = askel;
  }
});

test('lento ei hidastunut: tilaus koski maareittejä', () => {
  assert.equal(luku(UI, 'STEP_MS'), 190, 'lennon askeltahti muuttui');
  assert.match(UI, /maitse \? jalkamatkanAskel\(path\.length\) : STEP_MS/,
    'siirto ei enää erottele jalkamatkaa ja lentoa');
});

/* --- 2. järjestys: zoomi ensin, nappula vasta sitten ---------------- */

const SIIRTO = UI.match(/async animatePawnSisalla\([\s\S]*?\n  \}\n/)[0];

test('ennakkozoomia odotetaan ennen kuin nappula poimitaan laudalta', () => {
  const zoomi = SIIRTO.indexOf('await this.ennakoiSiirtoZoomi(');
  const poiminta = SIIRTO.indexOf('this.movingPlayerId = player.id');
  assert.ok(zoomi > 0, 'ennakkozoomia ei kutsuta lainkaan');
  assert.ok(poiminta > zoomi,
    'nappula poimitaan laudalta ennen ennakkozoomia — se katoaisi zoomin ajaksi');
});

test('saatto ja matkan ääni alkavat vasta zoomin jälkeen', () => {
  const zoomi = SIIRTO.indexOf('await this.ennakoiSiirtoZoomi(');
  for (const kutsu of ['this.aloitaSaattavaKamera(', 'this.aloitaJalkamatkanAani()']) {
    assert.ok(SIIRTO.indexOf(kutsu) > zoomi, `${kutsu} alkaa jo zoomauksen kanssa`);
  }
});

test('ennakkozoomi ajaa kertoimeen ja odottaa perilletuloa', () => {
  const metodi = UI.match(/async ennakoiSiirtoZoomi\([\s\S]*?\n  \}\n/)[0];
  assert.match(metodi, /siirtoZoomiKerroin\(SIIRTOZOOMIN_LAHENNYS\)/,
    'ennakko ei kysy siirtozoomin kerrointa kartalta');
  assert.match(metodi, /await kartta\.ajaKamera\([\s\S]*?ENNAKKOZOOMIN_MS/,
    'ennakkoajoa ei odoteta');
  assert.match(metodi, /await this\.wait\(ENNAKON_HENGAHDYS_MS\)/,
    'zoomin ja liikkeen väliin ei jää hengähdystä');
  // Liikeherkkyys ja yleiskuva ohittavat, kuten saatollakin.
  assert.match(metodi, /if \(this\.reducedMotion \|\| this\.dead\) return;/);
  assert.match(metodi, /!this\.mannerZoom\) return;/);
});

test('saattoajo ei enää zoomaa itse eikä palaa perillä', () => {
  const saatto = UI.match(/ {2}aloitaSaattavaKamera\(path, kesto\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(saatto, /kerroin/,
    'saatto muuttaa yhä mittakaavaa — zoomi kuuluu ennakkoon');
  // Vain KUTSU ja METODI, ei maininta: poiston perustelu elää yhä
  // kommenteissa, ja se on tarkoitus.
  assert.doesNotMatch(UI, /this\.puraSaattavaKamera\(|async puraSaattavaKamera\(/,
    'paluuajo on palannut: kameran pitää jäädä sinne minne se ajettiin');
  assert.doesNotMatch(UI, /SAATON_PALUU_MS =/, 'paluuajon vakio on palannut');
});

test('ennakkozoomi on ripeämpi kuin kartan muut ajot', () => {
  const ennakko = luku(UI, 'ENNAKKOZOOMIN_MS');
  const ajo = luku(KARTTA, 'AJO_MS');
  assert.ok(ennakko > 300 && ennakko < ajo,
    `ennakkozoomin ${ennakko} ms ei ole 300 ms – ${ajo} ms väliltä`);
  assert.ok(luku(UI, 'ENNAKON_HENGAHDYS_MS') <= 250, 'hengähdys venyi tauoksi');
});

/* --- 3. siirtozoomin katto ----------------------------------------- */

test('siirtozoomilla on absoluuttinen katto — muuten se kylläisi pohjaan', () => {
  const metodi = KARTTA.match(/ {2}siirtoZoomiKerroin\(lahennys = 1\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(metodi, /SIIRTONAKYMAN_LAHIN_KERROIN/, 'kattoa ei lasketa');
  // Pelaajan oma lähikuva voittaa katon: ennakko lähentää, ei loitonna.
  assert.match(metodi, /Math\.max\(nyt, katto\)/,
    'siirtozoomi voisi vetää pelaajan omasta lähikuvasta kauemmas');
  // Ja lopuksi portaikon päät, kuten kaikilla mittakaavoilla.
  assert.match(metodi, /this\.zoomiRajat\(\)/, 'kerrointa ei rajata portaikkoon');
  const kerroin = luku(KARTTA, 'SIIRTONAKYMAN_LAHIN_KERROIN');
  assert.ok(kerroin >= 2 && kerroin <= 6,
    `siirtonäkymän katto ${kerroin}× lähimmästä portaasta ei ole 2–6×`);
  assert.ok(luku(UI, 'SIIRTOZOOMIN_LAHENNYS') > 1.2,
    'lähennys ei enää vie lähemmäs');
});
