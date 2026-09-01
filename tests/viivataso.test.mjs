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

test('lähes rinnakkainen reitti karsiutuu, mutta sen päät jäävät', () => {
  /*
   * OMISTAJA 1.9.2026: *"Laivareittejä näyttää menemään liikaa."*
   * Karsinta on OSUUSKARSINTA eikä reitin poisto: sama korridori
   * piirretään kerran, mutta kaupungista lähtee aina näkyvä viiva
   * (KARSINTA.tyngat), tai lyhyt rinnakkainen reitti näyttäisi siltä,
   * ettei kaupunkiin tule tietä lainkaan.
   */
  const [pitka, rinnakkainen] = koereitit();
  karsiRinnakkaiset([pitka, rinnakkainen]);
  assert.deepEqual(pitka.piirtoValit, [[0, 100]],
    'pisin reitti piirtyy aina kokonaisena');
  const piirtoa = rinnakkainen.piirtoValit
    .reduce((s, [a, b]) => s + (b - a) * 10, 0);
  assert.ok(piirtoa > 0 && piirtoa < 500,
    `rinnakkaisesta reitistä piirtyy ${piirtoa} / 1000 yksikköä — `
    + 'karsinnan pitäisi viedä valtaosa mutta jättää päiden tyngät');
  assert.equal(rinnakkainen.piirtoValit[0][0], 0, 'alkupään tynkä puuttuu');
  assert.equal(rinnakkainen.piirtoValit.at(-1)[1], 100, 'loppupään tynkä puuttuu');
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
  for (const r of kanssa.reitit) {
    const oma = pituus(r.poly, 0, r.poly.length - 1);
    const nakyy = r.piirtoValit.reduce((s, [i0, i1]) => s + pituus(r.poly, i0, i1), 0);
    koko += oma;
    piirto += nakyy;
    if (nakyy < oma - 1) katkottuja += 1;
    assert.ok(nakyy > 0.1 * oma,
      'reitti katosi lähes kokonaan — päiden tyngät eivät pidä');
  }
  const karsittu = 1 - piirto / koko;
  assert.ok(karsittu > 0.01 && karsittu < 0.08,
    `karsinta vei ${(karsittu * 100).toFixed(1)} % viivasta (odotus 1–8 %)`);
  assert.ok(katkottuja >= 20 && katkottuja <= 60,
    `katkottuja reittejä ${katkottuja} (odotus 20–60)`);
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
   * teknisiä piirustuksia."* Edellinen erä oli viiva 2,8 ja jakso 24.
   */
  assert.ok(REITTITYYLI.viiva >= 2.8 * 1.3 && REITTITYYLI.viiva <= 2.8 * 1.6,
    `veto ${REITTITYYLI.viiva} ei ole 1,3–1,6-kertainen entiseen 2,8:aan`);
  assert.ok(REITTITYYLI.jakso >= 24 * 1.5 && REITTITYYLI.jakso <= 24 * 2,
    `jakso ${REITTITYYLI.jakso} ei ole 1,5–2-kertainen entiseen 24:ään`);
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
  assert.ok(232 - ulkohalkaisija > 200, 'helmet alkavat muodostaa nauhaa');
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
