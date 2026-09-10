/*
 * MATKAKIRJAKORTTI PALAA AUKI LUENNAN AJAN KARTAN LIIKKEEN JALKEEN.
 *
 * Omistajan ohje 10.9.2026 (Raamattu, "MATKAKIRJAKORTTI AUKEAA
 * SAAPUMISESSA JA PALAA AUKI LUENNAN AJAN KARTAN LIIKKEEN JALKEEN"):
 * *"Matkakirjan teksti saisi aina aueta kun tullaan uuteen paikkaan ja
 * se saisi pysyä auki niin kauan kuin puhe kestää. Jos karttaa
 * liikuttaa niin se katoaa pieneksi mutta puheen aikana se palutuu
 * liikkeen jälkeen. Puheen jälkeen se voi pysyä piilossa."*
 *
 * TARKENNUS 10.9.2026 klo 10.50 (Raamattu, "PULUN KUVALLE KUVATEKSTI,
 * PAKAN ALEMMAN KUVAN NAPAUTUS NOSTAA SEN PAALLE, MATKAKIRJA PALAA HETI
 * JA PYSYY PAKKAA SELATTAESSA, KUVA YLEMMAS LAATASTA"), sanatarkasti:
 * *"matkakirja saisi tulla heti takaisin naytolle kun kartan liike
 * loppuu."* Rauhoitusaika ei siis ole enaa puoli sekuntia:
 *
 *   - SORMI JA HIIRI paattyvat tapahtumaan (pointerup/pointercancel/
 *     touchend), ja kortti palaa heti — vain tekninen viive
 *     (KORTIN_PALAUTUS_MS, enintaan 50 ms) paastaa selaimen oman
 *     tapahtumajonon edelle;
 *   - RULLA JA NIPISTYS eivat paaty mihinkaan, joten niille jaa lyhyt
 *     hiljaisuus (KORTIN_HILJAISUUS_MS).
 *
 * Nelja asiaa, jotka eivat nay diffista eivatka ruutukaappauksesta:
 *
 *   1. LUENNAN AIKANA KUTISTUS ON VALIAIKAINEN. Kortti palaa auki, kun
 *      kartta on ollut rauhassa.
 *   2. LUENNAN JALKEEN KUTISTUS JAA VOIMAAN. Tama on omistajan
 *      nimenomainen jatko-osa: puheen jalkeen kortti saa pysya
 *      piilossa, eika lappu saa napsahdella takaisin esiin.
 *   3. KESKEN RAUHOITUSAJAN LOPPUVA LUENTA EI AVAA KORTTIA. Ajastin ei
 *      saa toimia sokeana: se tarkistaa tilanteen vasta lauetessaan.
 *   4. UUSI MERKINTA NOLLAA AJASTIMEN. Edellisen merkinnan odottava
 *      paluu ei saa laueta uuden merkinnan paalla.
 *
 * DOM-osuus ajetaan pienella omalla puumallilla samaan tapaan kuin
 * tests/lukijanappi.test.mjs ja tests/luentakuva.test.mjs: Nodessa ei
 * ole selainta, eika repoon oteta jsdomia yhta testia varten. Metodit
 * kutsutaan suoraan UI:n prototyypista, koska koko peli-ikkunan
 * rakentaminen vaatisi selaimen. Selainpuoli (raahaus Chromiumilla,
 * luennan aikana ja sen jalkeen) on katsottu erikseen savukkeella.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { UI } from '../js/ui.js';

const UI_LAHDE = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

/** Molemmat mitat luetaan lahteesta: testi ei saa ajautua koodista. */
const PALAUTUS_MS = Number(UI_LAHDE.match(/const KORTIN_PALAUTUS_MS = (\d+);/)?.[1]);
const RAUHOITUS_MS = Number(UI_LAHDE.match(/const KORTIN_HILJAISUUS_MS = (\d+);/)?.[1]);

const odota = (ms) => new Promise((valmis) => { setTimeout(valmis, ms); });

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli: vain se, mita asetaPaivakirjanKoko koskee        */
/* ---------------------------------------------------------------- */

class Kortti {
  constructor() {
    this.luokat = new Set();
    this.maareet = new Map();
    this.classList = {
      contains: (n) => this.luokat.has(n),
      toggle: (n, paalle) => (paalle ? this.luokat.add(n) : this.luokat.delete(n)),
    };
  }

  setAttribute(nimi, arvo) { this.maareet.set(nimi, arvo); }

  removeAttribute(nimi) { this.maareet.delete(nimi); }
}

/** Soitin siina tilassa, jossa luenta on kesken (soi juuri nyt). */
function soivaLuenta() {
  return { paused: false, currentTime: 1.2, ended: false, error: null };
}

/** Soitin, joka on soinut loppuun (myos lauserajan haivytys). */
function paattynytLuenta() {
  return { paused: true, currentTime: 3.4, ended: true, error: null };
}

/** Pelin ui-olio sen verran kuin palautusmekanismi siita lukee. */
function teeUi(luenta = null) {
  const ui = Object.create(UI.prototype);
  ui.factCard = new Kortti();
  ui.factText = { scrollTop: 0 };
  ui.factKuuntele = null;          // lukijaLukee(null) => ei laitelukijaa
  ui.diaryVoice = luenta;
  ui.osoitinKartalla = false;
  ui.kartanRaahaus = false;
  ui.paivitaJatkuuVihje = () => {};
  return ui;
}

const pieni = (ui) => ui.factCard.classList.contains('pieni');

/* ---------------------------------------------------------------- */

test('paluu on tekninen viive, ei rauhoitusaika (omistaja 10.9.2026)', () => {
  assert.ok(PALAUTUS_MS >= 0 && PALAUTUS_MS <= 50,
    `kortti ei palaa heti: KORTIN_PALAUTUS_MS on ${PALAUTUS_MS} ms`);
  assert.ok(RAUHOITUS_MS > PALAUTUS_MS && RAUHOITUS_MS <= 200,
    `rullan hiljaisuus ${RAUHOITUS_MS} ms ei ole lyhyt hiljaisuus`);
});

test('luennan aikana kortti palaa auki HETI eleen paatyttya', async () => {
  const ui = teeUi(soivaLuenta());
  assert.equal(ui.luentaKesken(), true, 'soiva luenta ei nay kesken olevana');

  ui.kutistaKortinLiikkeesta();
  assert.equal(pieni(ui), true, 'kartan liike ei kutistanut korttia lapuksi');

  // Sormi kartalla: kortti pysyy lappuna niin kauan kuin ele jatkuu.
  ui.osoitinAlhaalla = true;
  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), true, 'kortti palasi auki kesken eleen');

  // Sormen nosto ajastaa paluun teknisella viiveella (js/ui.js
  // osoitinYlos): kortti on auki heti eika vasta hiljaisuuden paasta.
  ui.osoitinAlhaalla = false;
  ui.ajastaKortinPalautus(PALAUTUS_MS);
  await odota(PALAUTUS_MS + 30);
  assert.equal(pieni(ui), false, 'kortti ei palannut auki heti eleen loputtua');
});

test('rulla ja nipistys: kortti palaa lyhyen hiljaisuuden paasta', async () => {
  const ui = teeUi(soivaLuenta());
  ui.kutistaKortinLiikkeesta();
  assert.equal(pieni(ui), true);

  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), false, 'kortti ei palannut auki hiljaisuuden jalkeen');
});

test('luennan jalkeen kutistunut kortti jaa lapuksi', async () => {
  const ui = teeUi(paattynytLuenta());
  assert.equal(ui.luentaKesken(), false, 'paattynyt luenta nakyy yha kesken olevana');

  ui.kutistaKortinLiikkeesta();
  assert.equal(pieni(ui), true, 'kartan liike ei kutistanut korttia lapuksi');

  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), true, 'kortti nousi auki vaikka puhe oli jo ohi');
});

test('kesken rauhoitusajan loppuva luenta ei avaa korttia', async () => {
  const luenta = soivaLuenta();
  const ui = teeUi(luenta);
  ui.kutistaKortinLiikkeesta();
  assert.equal(pieni(ui), true);

  // Puhe loppuu ennen kuin ajastin laukeaa.
  luenta.paused = true;
  luenta.ended = true;

  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), true, 'kortti avautui vaikka luenta ehti loppua');
});

test('kartan ele kesken lykkaa paluuta, ja sormen nosto paastaa sen lapi', async () => {
  const ui = teeUi(soivaLuenta());
  ui.kutistaKortinLiikkeesta();
  ui.kartanRaahaus = true;         // sormi kartalla, ele kesken

  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), true, 'kortti nousi kesken raahauksen');

  ui.kartanRaahaus = false;        // sormi irti
  await odota(RAUHOITUS_MS * 3);
  assert.equal(pieni(ui), false, 'kortti ei palannut auki eleen paatyttya');
});

test('uusi merkinta peruu odottavan paluun', async () => {
  const ui = teeUi(soivaLuenta());
  ui.kutistaKortinLiikkeesta();
  assert.equal(pieni(ui), true);

  // Uusi merkinta: renderFactin polku nollaa tilan (uusiFactKey avaa
  // kortin ja peruu ajastimen). Talla tasolla riittaa itse perutus —
  // sen jalkeen kortin koko on täysin uuden merkinnan kasissa.
  ui.peruKortinPalautus();
  ui.asetaPaivakirjanKoko(true);   // esim. pelaaja kutisti uuden kortin

  await odota(RAUHOITUS_MS * 2);
  assert.equal(pieni(ui), true, 'vanhan merkinnan ajastin avasi uuden kortin');
});

/* ---------------------------------------------------------------- */
/* Lahdevartiot: mekanismi on YKSI paikka, ei kolme kopiota          */
/* ---------------------------------------------------------------- */

test('kartan kutistuskohdat kayttavat yhteista palautusmekanismia', () => {
  const kartta = readFileSync(new URL('../js/kartta.js', import.meta.url), 'utf8');
  assert.equal((kartta.match(/this\.ui\.kutistaKortinLiikkeesta\(\)/g) ?? []).length, 3,
    'kartan kutistuskohtia ei ole kolmea, tai ne eivat kayta yhteista mekanismia');
  assert.doesNotMatch(kartta, /this\.ui\.asetaPaivakirjanKoko\(true\)/,
    'kartta kutistaa kortin palautusmekanismin ohi');

  assert.match(UI_LAHDE, /mapPane\.addEventListener\('click', \(tapahtuma\) => \{[\s\S]{0,240}kutistaKortinLiikkeesta\(\)/,
    'kartan napautus ei kulje palautusmekanismin kautta');
  // Uusi merkinta nollaa ajastimen (uusiFactKey).
  const uusi = UI_LAHDE.match(/uusiFactKey\(key\) \{[\s\S]*?\n  \}/)?.[0] ?? '';
  assert.match(uusi, /peruKortinPalautus\(\)/, `uusi merkinta ei nollaa ajastinta: ${uusi}`);

  // Eleen loppu paastaa paluun lapi: kuuntelijat ovat dokumentissa,
  // koska sama kortti kutistuu seka tasokartalta etta pallolaudalta.
  for (const tapahtuma of ['pointerup', 'pointercancel', 'touchend']) {
    assert.ok(UI_LAHDE.includes(`document.addEventListener('${tapahtuma}'`),
      `eleen loppua ei kuunnella: ${tapahtuma}`);
  }
  // Sormen nosto ajastaa paluun teknisella viiveella, ei hiljaisuudella.
  assert.match(UI_LAHDE, /this\.ajastaKortinPalautus\(KORTIN_PALAUTUS_MS\)/,
    'eleen loppu ei ajasta kortin paluuta heti');
  // Kuvapakan napautus ei ole kartan liiketta (omistaja 10.9.2026).
  assert.match(UI_LAHDE, /KUVAPAKAN_PINNAT = '\.fokusvirta-luentakuva, \.fokuszoom'/,
    'kuvapakan pintoja ei ole rajattu kartan napautuksesta');
  const kartta2 = readFileSync(new URL('../js/kartta.js', import.meta.url), 'utf8');
  assert.match(kartta2, /KELLUVA_UI[\s\S]{0,200}fokusvirta-luentakuva/,
    'luentakuva pakkoineen ei ole kartan kelluva pinta');

  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /ui\.kutistaKortinLiikkeesta\?\.\(\)/,
    'pallolaudan veto kutistaa kortin palautusmekanismin ohi');

  // Luennan loppu peruu paluun (js/luenta.js).
  const luenta = readFileSync(new URL('../js/luenta.js', import.meta.url), 'utf8');
  assert.match(luenta, /peruKortinPalautus\?\.\(\)/,
    'luennan loppu ei peru kortin paluuta');
});
