/*
 * VIIVATASO — reitit, erikoispiirit ja maiden rajat omalla
 * läpinäkyvällä laattatasolla (omistaja 31.8.2026 ilta).
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 * Kolme asiaa, ja jokainen niistä voi rikkoutua HILJAA — ilman
 * virheilmoitusta, pelkkänä puuttuvana karttana:
 *
 *   1. LUETTELON MUOTO. Peli lukee viivatason vain `viivataso`-oliosta
 *      (versio, tasot, laatastot, rajat). Jos kenttä katoaa tai
 *      muuttaa muotoaan, kerros jää tyhjäksi eikä yksikään pyyntö
 *      lähde — kartalta puuttuvat reitit, piirit ja rajat, eikä
 *      mikään kaadu.
 *
 *   2. TYÖLISTA JA BITTIKARTTA SAMASTA FUNKTIOSTA. Peli pyytää vain
 *      ne laatat, jotka bittikartta tuntee. Jos peite laskettaisiin
 *      kahdesti eri tavalla, peli joko pyytäisi laattoja joita ei ole
 *      (404 jokaisesta) tai jättäisi pyytämättä laattoja jotka ovat —
 *      ja jälkimmäinen on näkymätön vika: kartalta puuttuu pala.
 *
 *   3. RAJASETTI ON DATAA. Omistajan peruste 31.8.2026 ilta: rajojen
 *      oma taso on tärkeä siksikin, että myöhemmin voidaan mallintaa
 *      *"eri valtioiden kehityksiä vuosien saatossa esim.
 *      maailmansotien aikaan"*. Siksi piirtopassi ei saa tuntea
 *      yhtäkään valtiota eikä setin nimeä: viivasto tulee syötteenä.
 *
 * Luettelo ajetaan oikealla työkalulla (`--vain-luettelo`) eikä
 * jäljitellä: juuri se komento ajetaan tuotannossa, ja testin arvo on
 * siinä, että se ajaa saman koodin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { laudanProjektio } from '../tools/fokuskartta/piirto.js';
import { RAJASETIT, lueRajaviivasto, rajatLaudalle } from '../tools/fokuskartta/rajat.mjs';
import { karsiRinnakkaiset } from '../tools/fokuskartta/reittikarsinta.mjs';
import { REITTITYYLI } from '../tools/fokuskartta/maailmapiirto.js';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PIIRTO = readFileSync(join(JUURI, 'tools', 'fokuskartta', 'maailmapiirto.js'), 'utf8');
const PYRAMIDI = readFileSync(join(JUURI, 'js', 'laattapyramidi.js'), 'utf8');

/** Luettelo tuoreena ajona; tasot rajattu, jotta koe on nopea. */
function ajaLuettelo(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'viivataso-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '0-5',
    '--versio', 'pohja-koe',
    '--viivaversio', 'viiva-koe',
    '--vain-luettelo',
    ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

const luettelo = ajaLuettelo();

/* ------------------------------------------------ 1. luettelon muoto */

test('luettelossa on viivataso-olio omalla versiollaan', () => {
  const vt = luettelo.viivataso;
  assert.ok(vt, 'viivataso-olio puuttuu luettelosta');
  assert.equal(vt.versio, 'viiva-koe',
    'viivatason versio ei tule --viivaversiosta — laatan osoite rakennetaan siitä');
  assert.notEqual(vt.versio, luettelo.versio,
    'viivaversion ON oltava erotettavissa pohjan versiosta, muuten '
    + 'uusintapoltto koskisi pohjan ikuiseen välimuistiin');
});

test('viivataso kattaa kaikki ajetut tasot (z0 mukaan lukien)', () => {
  const vt = luettelo.viivataso;
  assert.deepEqual(vt.tasot, [0, 1, 2, 3, 4, 5],
    'viivataso on olemassa joka tasolla — toisin kuin nostotaso, jota '
    + 'on vain z5-z7');
  for (const z of vt.tasot) {
    assert.equal(typeof vt.laatastot[z], 'string',
      `tason z${z} laatasto puuttuu tai ei ole base64-merkkijono`);
  }
});

test('viivataso-oliossa ei ole tiivistelistaa (reiteillä ei ole elävää kerrosta)', () => {
  assert.equal(luettelo.viivataso.nostot, undefined,
    'tiivistelista kuuluu vain nostotasolle: nosto piirretään myös elävänä '
    + 'ja peli tarvitsee tiedon siitä minkä merkin se saa vaientaa. '
    + 'Reitit, piirit ja rajat ovat vain laatoissa.');
});

test('rajasetin nimi on luettelossa, jotta aikakausisetit ovat datanvaihto', () => {
  assert.equal(luettelo.viivataso.rajat, 'nykyiset');
  assert.ok(RAJASETIT[luettelo.viivataso.rajat],
    'luettelon rajasetti ei ole tunnettujen settien joukossa');
});

test('nostotaso jää luetteloon viivatason rinnalle', () => {
  assert.ok(luettelo.nostotaso, 'nostotaso katosi kun viivataso lisättiin');
});

/* ------------------------- 2. työlista ja bittikartta samasta lähteestä */

/** Ykkösbittien määrä base64-bittikartassa. */
function bittejaPaalla(base64) {
  const tavut = Buffer.from(base64, 'base64');
  let n = 0;
  for (const t of tavut) n += t.toString(2).split('1').length - 1;
  return n;
}

test('luettelon bittikartta ja ajon työlista ovat sama luku', () => {
  /*
   * `--kuiva` tulostaa työlistan pituuden ("laattoja ajossa N"), ja se
   * lasketaan viivatasonPeitteestä. Luettelon bittikartta lasketaan
   * SAMASTA funktiosta. Jos luvut eroavat, jompikumpi kutsuu peitettä
   * eri parametreilla — ja peli pyytäisi laattoja, joita ajo ei
   * kirjoittanut.
   */
  const kansio = mkdtempSync(join(tmpdir(), 'viivataso-kuiva-'));
  const tuloste = execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--viivataso', '--tasot', '0-5',
    '--versio', 'pohja-koe', '--viivaversio', 'viiva-koe', '--kuiva',
  ], { encoding: 'utf8', stdio: 'pipe' });
  const osuma = /laattoja ajossa (\d+)/.exec(tuloste);
  assert.ok(osuma, `työlistan pituutta ei löytynyt tulosteesta:\n${tuloste}`);
  const tyolista = Number(osuma[1]);
  const bitit = luettelo.viivataso.tasot
    .reduce((s, z) => s + bittejaPaalla(luettelo.viivataso.laatastot[z]), 0);
  assert.equal(bitit, tyolista,
    'bittikartta ja työlista eroavat — ne EIVÄT tule samasta funktiosta');
  assert.ok(tyolista > 0, 'peite on tyhjä');
});

test('uloimmalla tasolla on vain piirit ja rajat, ei reittejä', () => {
  /*
   * z0:lla reitin veto on alle 0,01 pikseliä leveä eikä Skia piirrä
   * siitä mitään (mitattu). Peite ei siis saa laskea reittilaattoja
   * sinne — muuten luettelo lupaisi täysin läpinäkyviä laattoja.
   * Tason koko on 2 x 1 laattaa, ja piirit kulkevat molempien yli.
   */
  const z0 = bittejaPaalla(luettelo.viivataso.laatastot[0]);
  assert.ok(z0 > 0 && z0 <= 2, `z0-peite ${z0} laattaa`);
});

/* --------------------- 2b. reitit vain lähitasoille (omistaja 1.9.2026) */

/**
 * `--peitemittaus` tulostaa tasoittain, montako laattaa kussakin
 * osiossa on. Se ajetaan oikealla työkalulla eikä jäljitellä: juuri se
 * funktio (viivatasonPeite) antaa myös työlistan ja bittikartan.
 */
function peitemittaus() {
  const kansio = mkdtempSync(join(tmpdir(), 'viivataso-peite-'));
  const tuloste = execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--viivataso', '--peitemittaus', '--kuiva',
    '--versio', 'pohja-koe', '--viivaversio', 'viiva-koe',
  ], { encoding: 'utf8', stdio: 'pipe' });
  const rivit = {};
  for (const rivi of tuloste.split('\n')) {
    const o = /^\s{2}(\d)\s+\d+x\s*\d+\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/.exec(rivi);
    if (o) {
      rivit[Number(o[1])] = {
        reitit: Number(o[2]), rajat: Number(o[3]), piirit: Number(o[4]), kaikki: Number(o[5]),
      };
    }
  }
  return rivit;
}

const peite = peitemittaus();

test('reittilaattoja ei ole 1000 km:n näkymässä eikä sitä laajemmilla', () => {
  /*
   * OMISTAJA 1.9.2026 (kuvakaappaus, jonka mittajana on 1000 km):
   * *"Tällä zoomitasolla ja yli reitit voi piilottaa kokonaan."*
   * Mitattu tasovastaavuus (generoi-laattapyramidi.mjs
   * VIIVA_REITIT_ALIN): z4 on 1000 km, z5 on 500 km ja z6 on 200 km.
   *
   * Tämä on POLTTOPÄÄTÖS eikä häivytys: laattaa ei ole, ja koska peite
   * antaa myös luettelon bittikartan, peli ei myöskään pyydä sitä.
   */
  for (const z of [0, 1, 2, 3, 4]) {
    assert.equal(peite[z].reitit, 0,
      `tasolla z${z} on ${peite[z].reitit} reittilaattaa — 1000 km:n näkymä `
      + '(z4) ja sitä laajemmat eivät saa niitä');
  }
  assert.ok(peite[5].reitit > 0, 'z5 (500 km) menetti reittinsä');
  assert.ok(peite[7].reitit > peite[6].reitit, 'reittipeite ei kasva syvemmälle');
});

test('kaukotasoilla on yhä rajat ja piirit', () => {
  /*
   * Reittien piilotus ei saa viedä rajoja: ne ovat kartan omaa
   * hallinnollista viivastoa, eikä omistajan pyyntö koskenut niitä.
   */
  for (const z of [2, 3, 4]) {
    assert.ok(peite[z].rajat > 0 && peite[z].piirit > 0,
      `tasolta z${z} katosivat rajat tai piirit`);
  }
});

test('lentoreitit eivät ole viivatasolla — ei piirrossa eikä peitteessä', () => {
  /*
   * OMISTAJA 1.9.2026: *"Poistetaan lentoreitit kokonaan näkyvistä.
   * Piirretään ne näkyviin reaaliajassa vasta sitten jos pelaaja
   * päättää mennä lentokoneella."* Kaksi paikkaa on pidettävä samana
   * tai luettelo lupaisi laattoja, joissa ei ole mustetta: sivulle
   * menevä sisältö ja peitteen laskenta.
   */
  const generaattori = readFileSync(GENERAATTORI, 'utf8');
  const sisaltoLohko = generaattori.slice(
    generaattori.indexOf("writeFileSync(join(tyokansio, 'sisalto.json')"),
  ).slice(0, 400);
  assert.match(sisaltoLohko, /lentoreitit: \[\]/,
    'viivatason sisalto.json vie yhä lentoreitit piirtoon');
  const peiteLohko = generaattori.slice(
    generaattori.indexOf('function viivatasonPeite'),
    generaattori.indexOf('function nostotasoBase64'),
  );
  assert.ok(!/lentoreitit/.test(peiteLohko),
    'peite laskee yhä lentoreittien laattoja — ne olisivat tyhjiä');
  assert.ok(!/ULOTTUMA\.lento/.test(generaattori),
    'lentoreitin musteen ulottuma on jäänyt jäljelle');
});

test('elävä lentokaari on pelissä, koska laatoissa sitä ei enää ole', () => {
  /*
   * Poltetun lennon tilalle tuli pelitilan kerros (js/ui.js
   * paivitaMatkareitit): kaari näkyy kun LENTÄEN-lista on auki ja
   * valitun lennon ajan, ja katoaa perillä. Ilman tätä paria kartalta
   * ei näkisi lentoyhteyksiä lainkaan.
   */
  const ui = readFileSync(join(JUURI, 'js', 'ui.js'), 'utf8');
  assert.match(ui, /matkareitti matkareitti-lento/,
    'lentokaarta ei piirretä elävään matkareittikerrokseen');
  assert.match(ui, /this\.lentoKaari = \{ a: lahto\.id, b: kohde\.id \}/,
    'doFly ei merkitse valittua lentoa kartalle');
  assert.match(ui, /this\.lentoKaari = null;/,
    'lentokaari ei nollaudu perillä — se jäisi kartalle roikkumaan');
  const css = readFileSync(join(JUURI, 'css', 'styles.css'), 'utf8');
  assert.match(css, /\.matkareitti-lento/, 'lentokaarelta puuttuu muste');
});

/* ------------------------------------------------- 3. rajat ovat dataa */

test('rajapassi ei tunne yhtäkään valtiota eikä rajasettiä', () => {
  const alku = PIIRTO.indexOf('export function piirraRajatKankaalle');
  assert.ok(alku > 0, 'piirraRajatKankaalle puuttuu');
  const runko = PIIRTO.slice(alku, PIIRTO.indexOf('\n}\n', alku));
  assert.ok(!/nykyiset|RAJASETIT|admin_0|maatunnus/i.test(runko),
    'rajapassiin on vuotanut tieto rajasetistä — setin vaihdon on '
    + 'oltava datanvaihto, ei koodimuutos');
  assert.match(runko, /rajat\?\.length/,
    'rajapassi ei ota viivastoa parametrina');
});

test('rajaviivasto luetaan repon omasta setistä ja kääntyy laudalle', () => {
  const viivasto = lueRajaviivasto('nykyiset');
  assert.ok(viivasto.viivat.length > 1000,
    `rajaviivoja vain ${viivasto.viivat.length} — setti näyttää typistyneen`);
  assert.match(viivasto.lahde, /Natural Earth/);
  const kaava = laudanProjektio({
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  });
  const laudalla = rajatLaudalle(viivasto, kaava);
  assert.ok(laudalla.length >= viivasto.viivat.length,
    'laudalle käännettyjä viivoja on vähemmän kuin lähteessä');
  for (const viiva of laudalla.slice(0, 200)) {
    for (const [x] of viiva) {
      assert.ok(x >= 0 && x < 12000, `x ${x} on laudan ulkopuolella`);
    }
  }
});

test('merirajoja ei haeta', () => {
  const hakija = readFileSync(join(JUURI, 'tools', 'hae-maiden-rajat.mjs'), 'utf8');
  assert.match(hakija, /boundary_lines_land/);
  assert.ok(!/boundary_lines_maritime|ne_10m_admin_0_countries/.test(hakija),
    'hakija noutaa muutakin kuin maalla kulkevat rajat');
});

/* ------------------------------------------------ 4. selaimen kerros */

/* --------------------- 3b. rinnakkaiskarsinta (omistaja 1.9.2026) ---- */

/** Kaksi murtoviivaa, jotka kulkevat rinnakkain 12 yksikön päässä. */
function koereitit() {
  const pitka = { poly: [], siemen: 1, askelmat: [] };
  const rinnakkainen = { poly: [], siemen: 2, askelmat: [] };
  for (let i = 0; i <= 100; i += 1) {
    pitka.poly.push([i * 10, 0]);
    rinnakkainen.poly.push([i * 10, 12]);
  }
  return [pitka, rinnakkainen];
}

test('rinnakkainen reitti putoaa kuvasta kokonaan, kun päät ovat verkossa', () => {
  /*
   * OMISTAJA 1.9.2026 (iltapäivä, sanatarkasti): *"Samansuuntaisia
   * matkoja pitäisi aina olla vain yksi."* Reitti, joka kulkee
   * valtaosin toisen urassa (KARSINTA.uraSade/uraPeitto*), jätetään
   * piirtämättä KOKONAAN — osuuskarsinnan jättämät päätyngät juuri
   * näyttivät päällekkäisiltä matkoilta. Pudotus vaatii, että
   * kummankin pään solmusta lähtee verkossa toinenkin reitti.
   */
  const [pitka, rinnakkainen] = koereitit();
  // Päiden solmuihin toinen reitti, jotta astevartija sallii pudotuksen.
  const haara1 = { poly: [[0, 12], [0, 300]], siemen: 3, askelmat: [] };
  const haara2 = { poly: [[1000, 12], [1000, 300]], siemen: 4, askelmat: [] };
  karsiRinnakkaiset([pitka, rinnakkainen, haara1, haara2]);
  assert.deepEqual(pitka.piirtoValit, [[0, 100]],
    'pisin reitti piirtyy aina kokonaisena');
  assert.deepEqual(rinnakkainen.piirtoValit, [],
    'rinnakkainen reitti ei pudonnut kuvasta kokonaan');
});

test('astevartija: rinnakkainenkaan reitti ei putoa, jos pää jäisi irti', () => {
  const [pitka, rinnakkainen] = koereitit();
  karsiRinnakkaiset([pitka, rinnakkainen]);
  assert.ok(rinnakkainen.piirtoValit.length > 0,
    'reitti putosi, vaikka sen päistä ei lähde muita reittejä');
});

test('lyhyttä paikallisreittiä ei pudoteta (uraVahin)', () => {
  /*
   * Mitattu sudenkuoppa: helsinki|tallinna kulki kokonaan pidemmän
   * uran alla ja putosi — mutta lyhyt hyppy pitkän reitin varjossa on
   * oma paikallisyhteytensä, ei rinnakkainen valtamerimatka.
   */
  const pitka = { poly: [], siemen: 1, askelmat: [] };
  for (let i = 0; i <= 100; i += 1) pitka.poly.push([i * 10, 0]);
  const lyhyt = { poly: [[400, 12], [450, 12], [500, 12]], siemen: 2, askelmat: [] };
  const haara1 = { poly: [[400, 12], [400, 300]], siemen: 3, askelmat: [] };
  const haara2 = { poly: [[500, 12], [500, 300]], siemen: 4, askelmat: [] };
  karsiRinnakkaiset([pitka, lyhyt, haara1, haara2]);
  assert.ok(lyhyt.piirtoValit.length > 0, 'lyhyt paikallisreitti putosi kuvasta');
});

test('erillinen reitti ei karsiudu', () => {
  const [pitka, rinnakkainen] = koereitit();
  for (const p of rinnakkainen.poly) p[1] = 400;      // 400 yksikköä sivussa
  karsiRinnakkaiset([pitka, rinnakkainen]);
  assert.deepEqual(rinnakkainen.piirtoValit, [[0, 100]]);
});

test('karsinta on deterministinen eikä riipu syötteen järjestyksestä', () => {
  /*
   * Sama sopimus kuin katkokuviolla ja solmuheitolla: tulos tulee
   * geometriasta eikä arpaluvusta, laatasta tai listan järjestyksestä —
   * muuten sama korridori piirtyisi eri ajoissa eri tavalla ja
   * laattojen väliin voisi jäädä ristiriita.
   */
  const a = koereitit();
  const b = koereitit().reverse();
  karsiRinnakkaiset(a);
  karsiRinnakkaiset(b);
  assert.deepEqual(a.map((r) => r.piirtoValit), b.reverse().map((r) => r.piirtoValit));
});

test('osuusyhdistäminen: pitkä rinnakkaisjakso karsitaan ja rajalle syntyy liittymäsilta', () => {
  /*
   * OMISTAJA 1.9.2026 ilta, sanatarkasti: *"aina kun kaksi
   * laivareittiä kulkee lähellä toisiaan niin ne pitää yhdistää
   * siltä osin yhdeksi reitiksi. ne voivat sitten taas erkaantua
   * tarvittaessa myöhemmin reitillä"*. Kaksi merireittiä 20 yksikön
   * päässä toisistaan (liian kaukana osuuskarsinnalle, liian
   * pienellä peitolla koko reitin pudotukselle): lyhyemmän
   * rinnakkaisjakso jää piirtämättä, ja KUMMALLEKIN leikkausrajalle
   * syntyy liittymäsilta, joka päättyy pidemmän reitin viivalle —
   * roikkuva pää kaukana viivasta oli juuri omistajan valitus
   * ("yhteneviä linjoja, jotka pitää yhdistää").
   */
  const pitka = { poly: [], siemen: 1, askelmat: [], laji: 'meri' };
  const toinen = { poly: [], siemen: 2, askelmat: [], laji: 'meri' };
  for (let i = 0; i <= 100; i += 1) pitka.poly.push([i * 10, 0]);
  // Lyhyempi kulkee rinnan 20 yksikön päässä välillä 200–800 ja sen
  // päät loittonevat 50 yksikköön (yli LIITOSSADE 40:n) — reitti on
  // x-väliltään 100–900, jotta se on aidosti lyhyempi kuin suora pitka.
  for (let i = 0; i <= 80; i += 1) {
    const x = 100 + i * 10;
    toinen.poly.push([x, 20 + 0.3 * (Math.max(0, 200 - x) + Math.max(0, x - 800))]);
  }
  karsiRinnakkaiset([pitka, toinen]);
  assert.deepEqual(pitka.piirtoValit, [[0, 100]], 'pisin reitti piirtyy aina kokonaisena');
  assert.equal(toinen.piirtoValit.length, 2,
    'rinnakkaisjakson on katkaistava lyhyempi kahdeksi piirtyväksi pääksi');
  assert.equal(toinen.liittymat.length, 2,
    'kummallekin leikkausrajalle kuuluu liittymäsilta');
  for (const [x0, y0, x1, y1] of toinen.liittymat) {
    assert.ok(y0 > 6, `silta alkaa piirtyvästä päästä, ei viivan vierestä (y0=${y0})`);
    assert.ok(Math.abs(y1) < 1e-6 && x1 >= 0 && x1 <= 1000,
      `silta päättyy peittävälle viivalle (x1=${x1}, y1=${y1})`);
  }
  // Silta alkaa täsmälleen piirtyvän välin rajapisteestä.
  const [v0, v1] = toinen.piirtoValit;
  const rajat = [toinen.poly[v0[1]], toinen.poly[v1[0]]];
  for (const [i, [x0, y0]] of toinen.liittymat.entries()) {
    assert.deepEqual([x0, y0], rajat[i], 'silta ei ala leikkausrajalta');
  }
});

test('osuusyhdistäminen syö tyngän vain jo piirrettyyn solmuun asti', () => {
  /*
   * Omistajan jatko samassa tilauksessa: viivat saavat haarautua
   * toisistaan ("ne voivat sitten taas erkaantua"). Reitti, joka
   * kulkee koko matkan pidemmän kyljessä ja PÄÄTTYY SAMAAN
   * SOLMUUN, sulautuu piirrettyyn viivaan solmua myöten — tynkää ei
   * jätetä, koska kaupunkiin tulee viiva pidempää reittiä pitkin
   * (mitattu pari: sahalin|tokio haarautuu tokio|sanfranciscosta).
   * Vapaassa päässä tynkä jää, kuten osuuskarsinnassa aina.
   */
  const pitka = { poly: [], siemen: 1, askelmat: [], laji: 'meri' };
  const haarova = { poly: [], siemen: 2, askelmat: [], laji: 'meri' };
  for (let i = 0; i <= 100; i += 1) pitka.poly.push([i * 10, 0]);
  // Jakaa pitkän solmun (1000,0); vapaa pää (100,27) loittonee viivasta.
  // x-väli 100–1000, jotta reitti on aidosti lyhyempi kuin pitka.
  for (let i = 0; i <= 90; i += 1) haarova.poly.push([100 + i * 10, 27 - i * 0.3]);
  karsiRinnakkaiset([pitka, haarova]);
  assert.equal(haarova.piirtoValit.length, 1, 'vapaan pään tynkä piirtyy');
  assert.equal(haarova.piirtoValit[0][0], 0, 'tynkä alkaa vapaasta päästä');
  assert.ok(haarova.piirtoValit[0][1] < 90,
    'jaettuun solmuun asti yhtyvä pää ei saa jättää tynkää — viiva '
    + 'kaupunkiin tulee pidempää reittiä pitkin');
  assert.equal(haarova.liittymat.length, 1, 'tyngän rajalle kuuluu silta');

  /*
   * HAARASUU (KARSINTA.liitosVahinSolmu). Tarkastusparvi 1.9.2026
   * mittasi Länsi-Afrikasta, että dakar|kappalmas ja dakar|
   * joaopessoa lähtevät Dakarista yhtenä viivana ja kulkevat 106
   * yksikköä rinnan — LIITOSVAHIN 150 ei ylittynyt, ja kuvaan jäi
   * kaksoisviiva kaupungin kyljessä. Jaetusta, jo piirretystä
   * solmusta alkava jakso ei ole "hetkeksi lähentyvä" pari, joten
   * sille riittää lyhyempi mitta. Vartija on PITUUS eikä kulma:
   * kumpikin koepari lähtee alle LIITOSKULMAN, mutta vain se, joka
   * kulkee rinnan yli 100 yksikköä, yhdistyy.
   */
  const runko = { poly: [], siemen: 1, askelmat: [], laji: 'meri' };
  for (let i = 0; i <= 100; i += 1) runko.poly.push([i * 10, 0]);
  // Loiva haara: 40 yksikön korridorista ulos vasta 117 yksikön jälkeen.
  const loiva = { poly: [], siemen: 2, askelmat: [], laji: 'meri' };
  for (let i = 0; i <= 60; i += 1) loiva.poly.push([i * 10, i * 3.5]);
  karsiRinnakkaiset([runko, loiva]);
  assert.equal(loiva.piirtoValit.length, 1, 'haarasuu jättää yhden piirtyvän pään');
  assert.ok(loiva.piirtoValit[0][0] > 0,
    'samasta solmusta yhtenä viivana lähtevä haarasuu jäi yhdistämättä');
  assert.equal(loiva.liittymat.length, 1, 'haarasuun rajalle kuuluu silta');

  // Aito haara: samasta solmusta, LIITOSKULMAN sisällä, mutta erkanee
  // heti — tämä ei saa yhdistyä (omistajan "eri suuntiin" -tapaus).
  const jyrkka = { poly: [], siemen: 3, askelmat: [], laji: 'meri' };
  for (let i = 0; i <= 60; i += 1) jyrkka.poly.push([i * 10, i * 10]);
  karsiRinnakkaiset([runko, jyrkka]);
  assert.deepEqual(jyrkka.piirtoValit, [[0, 60]],
    'heti eri suuntaan lähtevä haara ei saa yhdistyä runkoon');
});

test('liittymäsillat ovat deterministisiä eivätkä riipu syötteen järjestyksestä', () => {
  const teko = () => {
    const pitka = { poly: [], siemen: 1, askelmat: [], laji: 'meri' };
    const toinen = { poly: [], siemen: 2, askelmat: [], laji: 'meri' };
    for (let i = 0; i <= 100; i += 1) pitka.poly.push([i * 10, 0]);
    for (let i = 0; i <= 80; i += 1) {
      const x = 100 + i * 10;
      toinen.poly.push([x, 20 + 0.3 * (Math.max(0, 200 - x) + Math.max(0, x - 800))]);
    }
    return [pitka, toinen];
  };
  const a = teko();
  const b = teko().reverse();
  karsiRinnakkaiset(a);
  karsiRinnakkaiset(b);
  b.reverse();
  assert.deepEqual(a.map((r) => r.piirtoValit), b.map((r) => r.piirtoValit));
  assert.deepEqual(a.map((r) => r.liittymat), b.map((r) => r.liittymat),
    'sillat eivät ole samat eri syötejärjestyksillä');
});

test('oikea lauta: karsinta osuu Joonianmeren nippuun eikä leikkaa liikaa', async () => {
  /*
   * MITATTU LAUTA, EI KEKSITTY: omistajan kaappauksessa Sisilian
   * eteläpuolella kulki neljä lähes yhdensuuntaista kaarta. Kaksi
   * niistä (kreeta|sisilia ja sisilia|ateena) kulkevat saman mutkan,
   * ja juuri se on karsinnan tehtävä. Samalla vartioidaan ylilyöntiä:
   * koko laudan viivasta saa kadota vain muutama prosentti.
   */
  const { keraaSisalto } = await import('../tools/fokuskartta/sisalto.mjs');
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  const ilman = await keraaSisalto(MAAILMANKARTTA, join(JUURI, 'js', 'packs'), JUURI,
    { karsinta: false });
  const kanssa = await keraaSisalto(MAAILMANKARTTA, join(JUURI, 'js', 'packs'), JUURI);
  const pituus = (poly, i0, i1) => {
    let L = 0;
    for (let i = i0 + 1; i <= i1; i += 1) {
      L += Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    }
    return L;
  };
  let koko = 0;
  let piirto = 0;
  let katkottuja = 0;
  let pudotettuja = 0;
  for (const r of kanssa.reitit) {
    const oma = pituus(r.poly, 0, r.poly.length - 1);
    const nakyy = r.piirtoValit.reduce((s, [i0, i1]) => s + pituus(r.poly, i0, i1), 0);
    koko += oma;
    piirto += nakyy;
    if (!r.piirtoValit.length) { pudotettuja += 1; continue; }
    if (nakyy < oma - 1) katkottuja += 1;
    /*
     * Reitti saa kutistua pelkäksi tyngäksi VAIN yhdistettynä:
     * silloin tynkä on vähintään TYNGAT-mittainen (~20 yksikköä)
     * haara, joka jatkuu peittävää viivaa pitkin (liittymäsilta tai
     * jaettu solmu). Ilman sitä lähes kadonnut reitti olisi
     * karsintavirhe.
     */
    assert.ok(nakyy > 0.1 * oma || nakyy >= 19,
      'reitti katosi lähes kokonaan eikä edes tynkää jäänyt — päiden '
      + 'tyngät eivät pidä');
  }
  const karsittu = 1 - piirto / koko;
  assert.ok(karsittu > 0.01 && karsittu < 0.08,
    `karsinta vei ${(karsittu * 100).toFixed(1)} % viivasta (odotus 1–8 %)`);
  /*
   * ETSINTÄPARVI 1.9.2026 kavensi pudotuksen rajusti: viisi löydöstä
   * (mm. dublin|edinburgh, kreeta|sisilia, miami|havanna) oli
   * karsinnan ylilyöntejä, joissa "viiva poistui ilman että mikään
   * korvaa sitä silmälle". Pudotus vaatii nyt lähes täyden peiton
   * PIIRRETYSTÄ musteesta (KARSINTA.uraPeitto 0,9), joten tällä
   * laudalla kuvasta katoaa kokonaan enää harva reitti — valtaosan
   * työstä tekee osuusyhdistäminen (katkottuja), joka jättää tyngät
   * ja sillat.
   */
  assert.ok(pudotettuja >= 0 && pudotettuja <= 20,
    `kuvasta pudotettuja reittejä ${pudotettuja} (odotus 0–20)`);
  assert.ok(katkottuja >= 4 && katkottuja <= 30,
    `katkottuja reittejä ${katkottuja} (odotus 4–30)`);
  const idJoukko = kanssa.reitit.filter((r) => !r.piirtoValit.length);
  assert.ok(idJoukko.every((r) => r.askelmat.length === 0),
    'pudotetulla reitillä on yhä askelhelmiä — helmi jäisi tyhjään mereen');
  assert.ok(ilman.reitit.every((r) => r.piirtoValit === undefined),
    'karsinta ajettiin, vaikka se oli kytketty pois');
  assert.equal(ilman.reitit.length, kanssa.reitit.length,
    'karsinta poisti reitin verkosta — se saa koskea vain piirtoa');
});

/* ------------------------- 3c. lautapelityyli (omistaja 1.9.2026) ---- */

test('katkorytmi on harvempi ja veto paksumpi kuin edellisessä erässä', () => {
  /*
   * OMISTAJA 1.9.2026: *"Katkoviivat saisi olla harvempia ja vähän
   * paksumpia, niin että näyttävät enemmän käsin piirretyiltä … Maa ja
   * vesireitit saisi olla enemmän söpön lautapelin oloisia kuin
   * teknisiä piirustuksia."* Vedositeroinnissa (1.9.2026 iltapäivä)
   * omistaja vei mitat vielä pidemmälle: *"saa olla vielä pidemmät
   * välit ja … viivan leveys vielä paksumpi"*, *"Tee viivoista ja
   * viivojen väleistä vielä pidempiä"* — hyväksytyt mitat viiva 9,
   * jakso 190 ja katko-osuus 0,30 (väli on yli kaksi kertaa katko).
   */
  assert.ok(REITTITYYLI.viiva >= 8 && REITTITYYLI.viiva <= 10,
    `veto ${REITTITYYLI.viiva} ei ole hyväksytyssä haarukassa 8–10`);
  assert.ok(REITTITYYLI.jakso >= 150 && REITTITYYLI.jakso <= 250,
    `jakso ${REITTITYYLI.jakso} ei ole hyväksytyssä haarukassa 150–250`);
  assert.equal(REITTITYYLI.lyhin, REITTITYYLI.pisin,
    'katkon pituus arpoo — omistajan tilaus oli tasainen rytmi');
  assert.ok(REITTITYYLI.lyhin <= 0.35,
    `katko-osuus ${REITTITYYLI.lyhin} — välin pitää olla viivaa pidempi`);
  assert.ok(REITTITYYLI.vapina > 0 && REITTITYYLI.huojunta > 0.35,
    'käsivarahuojuntaa ei lisätty');
});

test('helmi ei mahdu katkoon eikä helminauhaa synny', () => {
  /*
   * Kaksi vanhaa rajaa, jotka on tarkistettava aina kun mitat
   * muuttuvat (maailmapiirto.js REITTITYYLI). Lyhin askelväli on
   * mitattu laudalta: 232 R.
   */
  const helmenHalkaisija = 2 * REITTITYYLI.helmi;
  const lyhinKatko = REITTITYYLI.lyhin * REITTITYYLI.jakso;
  assert.ok(lyhinKatko > helmenHalkaisija * 1.5,
    `lyhin katko ${lyhinKatko} R ei ole selvästi pidempi kuin helmi `
    + `(${helmenHalkaisija} R) on leveä`);
  const ulkohalkaisija = helmenHalkaisija + REITTITYYLI.kehä;
  assert.ok(232 - ulkohalkaisija > 190, 'helmet alkavat muodostaa nauhaa');
});

test('viivan päät ovat pyöreät — piirretty viiva, ei tekninen tikku', () => {
  const alku = PIIRTO.indexOf('export function piirraReititKankaalle');
  const runko = PIIRTO.slice(alku, PIIRTO.indexOf('\n/**', alku + 10));
  assert.match(runko, /ctx\.lineCap = 'round'/,
    'katkoviivan päät eivät ole pyöreät');
});

test('marginaalin kalusteilla on oma kynnys, joka kattaa z3:n', () => {
  /*
   * OMISTAJA 1.9.2026: *"Toiseksi laajimmalla zoom tasolla saisi näkyä
   * paperin päälle ladottu matkakirja ja alhaalla myös muut
   * vastaavat"*. z3:n tiheys on 0,45 px/lautayksikkö ja z4:n 0,90;
   * kalustekynnyksen on siis oltava niiden välissä. Merten nimet ja
   * kompassi ovat kartan alalla ja pitävät oman kynnyksensä (0,3).
   */
  const nimet = /const KALUSTEIDEN_YLARAJA = ([\d.]+);/.exec(PIIRTO);
  const kalusteet = /const KALUSTEET_YLARAJA = ([\d.]+);/.exec(PIIRTO);
  assert.ok(nimet && kalusteet, 'kynnysvakioita ei löydy');
  assert.equal(Number(nimet[1]), 0.3, 'merten nimien kynnys muuttui');
  assert.ok(Number(kalusteet[1]) > 0.45 && Number(kalusteet[1]) < 0.9,
    `kalustekynnys ${kalusteet[1]} ei osu z3:n (0,45) ja z4:n (0,90) väliin`);
  const kehysLohko = PIIRTO.slice(
    PIIRTO.indexOf('9. ATLASKEHYS'), PIIRTO.indexOf('---------------------------------------------------- kartussi'),
  );
  assert.match(kehysLohko, /if \(kalusteetNakyvat\) \{/,
    'kartussi ja painajanrivi eivät käytä kalusteiden omaa kynnystä');
  assert.ok(!/if \(merinimetNakyvat\) \{/.test(kehysLohko),
    'kehyksen kalusteet roikkuvat yhä merten nimien kynnyksessä');
});

test('viivataso on neljäs kerros eikä sitä häivytetä', () => {
  assert.match(PYRAMIDI, /pyramidiViivaKerros = el\('g', \{ class: 'pyramidi-viivataso' \}/,
    'viivakerrosta ei luoda');
  const alku = PYRAMIDI.indexOf('function paivitaViivataso');
  assert.ok(alku > 0, 'paivitaViivataso puuttuu');
  const runko = PYRAMIDI.slice(alku, PYRAMIDI.indexOf('\nfunction paivitaNostotaso', alku));
  assert.ok(!/opacity/.test(runko),
    'viivatasolla ei saa olla opacity-haaraa: kerros kattaa kaikki tasot, '
    + 'joten häivytys ei koskaan laukeaisi oikein');
});

test('viivalaatalla on oma osoite ja oma noutoavain', () => {
  assert.match(PYRAMIDI, /taso\.viiva/, 'laattaUrl ei tunne viivatasoa');
  assert.match(PYRAMIDI, /\/viivat\/z\$\{taso\.z\}/,
    'viivalaatan osoite ei mene viivat-alipolkuun');
  assert.match(PYRAMIDI, /taso\.viiva \? 'v'/,
    'viivalaatan noutoavaimella ei ole omaa etuliitettä — kerroksen '
    + 'kiinnitys merkitsisi pohjalaatan noudetuksi');
});

test('vanha luettelo ilman viivataso-oliota jättää kerroksen tyhjäksi', () => {
  const alku = PYRAMIDI.indexOf('function viivatasonTasot');
  const runko = PYRAMIDI.slice(alku, PYRAMIDI.indexOf('\n}\n', alku));
  assert.match(runko, /if \(!vt\?\.tasot\?\.length \|\| !vt\.laatastot\) return null;/,
    'viivatasonTasot ei palauta nullia vanhalla luettelolla — silloin '
    + 'peli pyytäisi laattoja, joita ämpärissä ei ole');
});
