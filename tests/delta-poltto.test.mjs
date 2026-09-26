/*
 * DELTA-POLTTO (Karttaseppä 26.9.2026): meri- tai maadeltan luokitus,
 * suunnitelma ja kirjanpito (tools/delta-luokitin.mjs,
 * generoi-laattapyramidi.mjs --delta, paikkaa-pyramidi.mjs, tee-pallolaatat.mjs
 * --delta, polta-paikallisesti.sh --delta, poltto-edistyminen.mjs eheys).
 *
 * Mitä tämä vartioi:
 *
 *   1. LUOKITUS keinotekoisesta maailmasta (meri, jossa on yksi manner ja
 *      sen sisällä järvi): mantereen keskellä maata, ulapalla vettä, rannalla
 *      ja järvellä molempia, kehyksessä ei kumpaakaan, marginaali toimii.
 *   2. SUUNNITELMA: piirrettävät + kopioitavat = kaikki, pistevieraat;
 *      tarkistusotos on kopioitavia piirrettävän reunalta ja sama joka
 *      shardissa.
 *   3. TÄYSAJO ENNALLAAN: ilman --deltaa lista, luettelo, reseptin liput ja
 *      polttoskriptin shardit eivät saa yhtään delta-kenttää tai -lippua.
 *   4. TODISTUS: vertaa kaatuu, jos tarkistuslaatta eroaa lähteestä, ja
 *      pallon delta-sarja on tavulleen sama kuin täysi sarja (sharp).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, cpSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  VESI, MAA, DELTA_LISAMARGINAALI_PX, luoLuokitin, lataaLuokitin, pyramidinRuudukko,
  deltaValinta, tarkistusotos, pyramidinDeltaSuunnitelma, sarakkeetValilla, tasonLuvut,
} from '../tools/delta-luokitin.mjs';
import { odotetutPyramidista, odotetutPallosta } from '../tools/poltto-edistyminen.mjs';
import { pallonDeltaSuunnitelma, pallonLaatanLahteet } from '../tools/tee-pallolaatat.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PAIKKAUS = join(JUURI, 'tools', 'paikkaa-pyramidi.mjs');
const PALLO = join(JUURI, 'tools', 'tee-pallolaatat.mjs');
const RESEPTI = join(JUURI, 'tools', 'polttoresepti.mjs');
const POLTTO = join(JUURI, 'tools', 'polta-paikallisesti.sh');
const MARGINAALI = 32 + DELTA_LISAMARGINAALI_PX;

const sharp = await import('sharp').then((m) => m.default).catch(() => null);

const pesa = (nimi = 'delta-') => mkdtempSync(join(tmpdir(), nimi));

/* ------------------------------------------------ keinotekoinen maailma */

/*
 * Maailma: meri kaikkialla paitsi manner lon −100…60, lat −40…70, jonka
 * sisällä järvi lon −20…−10, lat 10…20. Meren ulkoreuna on kehys (±180,
 * ±90), kuten Natural Earthissa.
 */
const MANNER = [[-100, -40], [60, -40], [60, 70], [-100, 70], [-100, -40]];
const JARVI = [[-20, 10], [-10, 10], [-10, 20], [-20, 20], [-20, 10]];
const KEHYS = [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]];

function aineisto() {
  const k = pesa('delta-data-');
  writeFileSync(join(k, 'ne_10m_ocean.geojson'), JSON.stringify({
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [KEHYS, MANNER] } }],
  }));
  writeFileSync(join(k, 'ne_10m_lakes.geojson'), JSON.stringify({
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: { name: 'Keinojärvi' }, geometry: { type: 'Polygon', coordinates: [JARVI] } }],
  }));
  return k;
}
const DATA = aineisto();

/** Pyramidin luettelo (geometria) generaattorista, ilman aineistoa. */
function luettelo(tasot = '0-5') {
  const k = pesa('delta-luettelo-');
  execFileSync('node', [GENERAATTORI, k, '--tasot', tasot, '--versio', 'P1', '--vain-luettelo'], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(k, 'pyramidi.json'), 'utf8'));
}
const LUETTELO = luettelo();
const taso = (z) => LUETTELO.tasot.find((t) => t.z === z);
const LUOKITIN = luoLuokitin({ meri: [KEHYS, MANNER], jarvet: [JARVI] });

/** Laatan (sarake, rivi) tasolla z pisteessä lon, lat. */
function laattaPisteessa(r, lon, lat) {
  return { s: Math.floor(r.xLon(lon) / r.L), rv: Math.floor(r.yLat(lat) / r.L) };
}

/* ============================================================ luokitus */

test('luokitus: manner maata, ulappa vettä, ranta ja järvi molempia, kehys ei kumpaakaan', () => {
  const r = pyramidinRuudukko(LUETTELO, taso(5));
  const luokat = LUOKITIN.luokitteleRuudukko(r, { marginaaliPx: MARGINAALI });
  const luokka = (lon, lat) => { const { s, rv } = laattaPisteessa(r, lon, lat); return luokat[rv * r.sarakkeita + s]; };
  assert.equal(luokka(-60, 30), MAA, 'mantereen sisällä');
  assert.equal(luokka(-150, 0), VESI, 'Tyynellämerellä');
  assert.equal(luokka(-100, 20), VESI | MAA, 'rantaviiva lon −100');
  assert.equal(luokka(-15, 15), VESI | MAA, 'järvi on molempia');
  assert.equal(luokat[0], 0, 'ylin rivi on kehyksen paperia');
  assert.equal(luokat[luokat.length - 1], 0, 'alin rivi on kehyksen paperia');
});

test('luokitus: marginaali ulottuu reunan yli juuri pikselimääränsä', () => {
  // Pystysuora ranta lon 0: laatta, jonka reuna on alle marginaalin päässä, on molempia.
  const reunaMeri = [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]];
  const itaManner = [[0, -30], [100, -30], [100, 60], [0, 60], [0, -30]];
  const l = luoLuokitin({ meri: [reunaMeri, itaManner] });
  const r = pyramidinRuudukko(LUETTELO, taso(5));
  const x = r.xLon(0);
  const s = Math.floor(x / r.L);
  const rv = Math.floor(r.yLat(15) / r.L);
  const etaisyys = x - s * r.L; // rannan etäisyys laatan s länsireunasta
  // Laatta s − 1 (länsinaapuri) on puhdasta merta, jos ranta on yli marginaalin päässä sen reunasta.
  const pieni = l.luokitteleRuudukko(r, { marginaaliPx: Math.max(0, etaisyys - 1) });
  assert.equal(pieni[rv * r.sarakkeita + s - 1], VESI);
  const iso = l.luokitteleRuudukko(r, { marginaaliPx: etaisyys + 1 });
  assert.equal(iso[rv * r.sarakkeita + s - 1], VESI | MAA);
});

test('luokitus: päivämääränrajan yli kulkeva manner merkitsee sarakkeet kummaltakin puolelta', () => {
  const r = pyramidinRuudukko(LUETTELO, taso(4));
  // Manner kahtena osana ±180:ssa (kuten Natural Earth leikkaa): lon 170…180 ja −180…−170.
  const l = luoLuokitin({
    meri: [KEHYS, [[170, 0], [180, 0], [180, 10], [170, 10], [170, 0]], [[-180, 0], [-170, 0], [-170, 10], [-180, 10], [-180, 0]]],
  });
  const luokat = l.luokitteleRuudukko(r, { marginaaliPx: MARGINAALI });
  const rv = Math.floor(r.yLat(5) / r.L);
  for (const lon of [175, -175]) {
    const s = Math.floor(r.xLon(lon) / r.L);
    assert.ok(luokat[rv * r.sarakkeita + s] & MAA, `lon ${lon}`);
  }
  // Viimeinen (vajaa) sarake ja kierto: väli, joka ylittää leveyden, jatkuu sarakkeesta 0.
  assert.deepEqual(sarakkeetValilla(r.W - 5, r.W + 5, r.W, r.L, r.sarakkeita).sort((a, b) => a - b), [0, r.sarakkeita - 1]);
});

test('luokitus aineistokansiosta = luokitus renkaista (sama moottorin data)', async () => {
  const kansiosta = await lataaLuokitin(DATA, { harvennus: 0.006 });
  const r = pyramidinRuudukko(LUETTELO, taso(5));
  assert.deepEqual(kansiosta.luokitteleRuudukko(r, { marginaaliPx: MARGINAALI }),
    LUOKITIN.luokitteleRuudukko(r, { marginaaliPx: MARGINAALI }));
});

/* ========================================================= suunnitelma */

test('suunnitelma: piirrettävät + kopioitavat = kaikki, tarkistus kopioitavista reunalta', () => {
  for (const laji of ['meri', 'maa']) {
    const s = pyramidinDeltaSuunnitelma({
      luokitin: LUOKITIN, geometria: LUETTELO, tasot: LUETTELO.tasot, laji, marginaaliPx: MARGINAALI, tarkistus: 3,
    });
    for (const t of s.tasot) {
      const l = tasonLuvut(t);
      assert.equal(l.piirretaan + l.kopioidaan, l.kaikki);
      assert.equal(l.vesi + l.maa + l.molemmat + l.ulkona, l.kaikki);
      const bitti = laji === 'meri' ? VESI : MAA;
      for (let i = 0; i < t.piirra.length; i += 1) assert.equal(t.piirra[i], (t.luokat[i] & bitti) ? 1 : 0);
      for (const i of t.tarkistus) {
        assert.equal(t.piirra[i], 0, 'tarkistuslaatta on kopioitava');
        const S = t.sarakkeita; const c = i % S;
        const naapuri = (c > 0 && t.piirra[i - 1]) || (c < S - 1 && t.piirra[i + 1])
          || t.piirra[i - S] || t.piirra[i + S];
        assert.ok(naapuri, 'tarkistuslaatta on piirrettävän reunalla');
      }
    }
    // Deterministinen: sama suunnitelma, sama tiiviste.
    const t2 = pyramidinDeltaSuunnitelma({
      luokitin: LUOKITIN, geometria: LUETTELO, tasot: LUETTELO.tasot, laji, marginaaliPx: MARGINAALI, tarkistus: 3,
    });
    assert.equal(t2.tiiviste, s.tiiviste);
  }
  // Meri ja maa yhdessä kattavat kaiken kartalla olevan.
  const r = pyramidinRuudukko(LUETTELO, taso(5));
  const luokat = LUOKITIN.luokitteleRuudukko(r, { marginaaliPx: MARGINAALI });
  const m = deltaValinta(luokat, 'meri'); const a = deltaValinta(luokat, 'maa');
  for (let i = 0; i < luokat.length; i += 1) assert.equal(Boolean(m[i] || a[i]), luokat[i] !== 0);
  assert.throws(() => deltaValinta(luokat, 'järvi'), /tunnetut lajit/);
  assert.deepEqual(tarkistusotos(new Uint8Array([0, 0, 0]), 3, 1, 4), []);
});

/* ======================================================== generaattori */

function lista(k, ...lisa) {
  const tasot = lisa.includes('--tasot') ? [] : ['--tasot', '0-5'];
  execFileSync('node', [GENERAATTORI, k, ...tasot, '--versio', 'P2', '--data', DATA, ...lisa, '--vain-lista'], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(k, 'laatat.json'), 'utf8'));
}
const avain = ([z, s, r]) => `${z}:${s}:${r}`;

test('generaattori --delta: piirrettävät, tarkistus ja kopioitavat jakavat täyden listan', () => {
  const taysi = lista(pesa());
  assert.equal(taysi.delta, undefined, 'täysajon listassa ei delta-kenttiä');
  assert.equal(taysi.kopioitavat, undefined);
  assert.equal(taysi.tarkistus, undefined);
  const kaikki = new Set(taysi.laatat.map(avain));
  for (const laji of ['meri', 'maa']) {
    const d = lista(pesa(), '--delta', laji, '--delta-lahde', 'P1', '--delta-tarkistus', '2');
    assert.equal(d.delta.laji, laji);
    assert.equal(d.delta.lahde, 'P1');
    assert.equal(d.delta.marginaaliPx, MARGINAALI);
    const osat = [d.laatat, d.tarkistus, d.kopioitavat].map((l) => l.map(avain));
    const yhdessa = osat.flat();
    assert.equal(yhdessa.length, kaikki.size, 'ei päällekkäisyyksiä');
    assert.deepEqual(new Set(yhdessa), kaikki, 'kattaa täyden listan');
    assert.ok(d.laatat.length > 0 && d.kopioitavat.length > 0);
    assert.ok(d.tarkistus.length > 0 && d.tarkistus.length <= 2 * 6);
    // Shardi (sarakekaista) saa oman osansa SAMASTA suunnitelmasta.
    const vasen = lista(pesa(), '--delta', laji, '--delta-lahde', 'P1', '--delta-tarkistus', '2', '--tasoja', '6', '--tasot', '5', '--sarakkeet', '0-19');
    const oikea = lista(pesa(), '--delta', laji, '--delta-lahde', 'P1', '--delta-tarkistus', '2', '--tasoja', '6', '--tasot', '5', '--sarakkeet', '20-42');
    const z5 = (l) => new Set(l.filter(([z]) => z === 5).map(avain));
    assert.deepEqual(new Set([...vasen.laatat, ...oikea.laatat].map(avain)), z5(d.laatat));
    assert.deepEqual(new Set([...vasen.tarkistus, ...oikea.tarkistus].map(avain)), z5(d.tarkistus));
    assert.equal(vasen.delta.tiiviste === oikea.delta.tiiviste, true, 'sama suunnitelma molemmissa kaistoissa');
  }
});

test('generaattori --delta: luettelo kirjaa lähteen ja tasoittaiset luvut, täysajo ei', () => {
  const k = pesa();
  execFileSync('node', [GENERAATTORI, k, '--tasot', '0-5', '--versio', 'P2', '--data', DATA,
    '--delta', 'maa', '--delta-lahde', 'P1', '--delta-tarkistus', '2', '--vain-luettelo'], { stdio: 'pipe' });
  const l = JSON.parse(readFileSync(join(k, 'pyramidi.json'), 'utf8'));
  const d = lista(pesa(), '--delta', 'maa', '--delta-lahde', 'P1', '--delta-tarkistus', '2');
  assert.equal(l.delta.lahde, 'P1');
  assert.equal(l.delta.laji, 'maa');
  assert.equal(l.delta.tiiviste, d.delta.tiiviste);
  assert.equal(l.alue, null, 'delta-versio on täysi pyramidi');
  for (const t of l.tasot) {
    assert.equal(l.delta.piirretty[t.z], d.laatat.filter(([z]) => z === t.z).length);
    assert.equal(l.delta.tarkistettu[t.z], d.tarkistus.filter(([z]) => z === t.z).length);
  }
  // Eheys odottaa shardeilta piirretyt + tarkistetut, täysajo koko ruudukon.
  const odotus = odotetutPyramidista(l);
  assert.equal(odotus.get('pohja z5'), l.delta.piirretty[5] + l.delta.tarkistettu[5]);
  assert.equal(LUETTELO.delta, undefined);
  assert.equal(odotetutPyramidista(LUETTELO).get('pohja z5'), taso(5).sarakkeita * taso(5).riveja);
});

test('generaattori --delta: turvat (sama versio, paikkaus, merkkitaso, laji)', () => {
  const ajo = (...a) => spawnSync('node', [GENERAATTORI, pesa(), '--tasot', '0-2', '--data', DATA, ...a, '--vain-lista'], { encoding: 'utf8' });
  assert.match(ajo('--versio', 'P1', '--delta', 'meri', '--delta-lahde', 'P1').stderr, /sama/);
  assert.match(ajo('--versio', 'P2', '--delta', 'meri').stderr, /--delta-lahde/);
  assert.match(ajo('--versio', 'P2', '--delta', 'vesi', '--delta-lahde', 'P1').stderr, /meri tai maa/);
  assert.match(ajo('--versio', 'P2', '--delta', 'meri', '--delta-lahde', 'P1', '--paikkaus', 'P0', '--alue', '0,0,1,1').stderr, /eri ajoja/);
  assert.match(ajo('--versio', 'P2', '--delta', 'meri', '--delta-lahde', 'P1', '--viivataso').stderr, /vain pohjaa/);
});

/* ============================================ suunnittele, vertaa, eheys */

test('suunnittele --delta perii asetukset ja kirjaa DELTAN; alue ja delta yhdessä ei käy', () => {
  const k = pesa();
  const polku = join(k, 'l.json');
  writeFileSync(polku, JSON.stringify({ versio: 'P1', laatu: 0.9, muoto: 'webp', laatta: 512, patina: 'kevyt', tasot: [{ z: 0 }, { z: 8 }] }));
  const ulos = join(k, 'ulos.env');
  execFileSync('node', [PAIKKAUS, 'suunnittele', '--luettelo', polku, '--lahdeversio', 'P1', '--versio', 'P2', '--delta', 'meri', '--ulos', ulos], { stdio: 'pipe' });
  const arvot = Object.fromEntries(readFileSync(ulos, 'utf8').trim().split('\n').map((r) => r.split('=')));
  assert.equal(arvot.DELTA, 'meri');
  assert.equal(arvot.ALUE, '');
  assert.equal(arvot.TASOT, '0-8');
  assert.equal(arvot.PATINA, 'kevyt');
  const r = spawnSync('node', [PAIKKAUS, 'suunnittele', '--luettelo', polku, '--lahdeversio', 'P1', '--versio', 'P2', '--delta', 'meri', '--alue', '0,0,1,1'], { encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  const r2 = spawnSync('node', [PAIKKAUS, 'suunnittele', '--luettelo', polku, '--lahdeversio', 'P1', '--versio', 'P1', '--delta', 'maa'], { encoding: 'utf8' });
  assert.match(r2.stderr, /sama/);
});

/** Laattapuu levylle: { "z:s:r": sisältö }; pallo = ilman z-etuliitettä. */
function puu(juuri, laatat, { pallo = false } = {}) {
  for (const [a, sisalto] of Object.entries(laatat)) {
    const [z, s, r] = a.split(':');
    const kansio = join(juuri, `${pallo ? '' : 'z'}${z}`, s);
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, `${r}.${pallo ? 'jpg' : 'webp'}`), sisalto);
  }
  return juuri;
}

test('vertaa: delta-lista kopioineen läpi, eronnut tarkistuslaatta kaatuu (myös pallon kansiot)', () => {
  for (const pallo of [false, true]) {
    const k = pesa();
    const lahde = puu(join(k, 'lahde'), {
      '3:0:0': 'a', '3:1:0': 'b', '3:2:0': 'c', '3:3:0': 'd',
    }, { pallo });
    const listaPolku = join(k, 'lista.json');
    writeFileSync(listaPolku, JSON.stringify({
      delta: { laji: 'meri', lahde: 'P1' }, laatat: [[3, 0, 0], [3, 1, 0]], tarkistus: [[3, 2, 0]], kopioitavat: [[3, 3, 0]],
    }));
    const hyva = puu(join(k, 'hyva'), {
      '3:0:0': 'A', '3:1:0': 'B', '3:2:0': 'c', '3:3:0': 'd',
    }, { pallo });
    const ok = spawnSync('node', [PAIKKAUS, 'vertaa', '--lahde', lahde, '--paikattu', hyva, '--lista', listaPolku], { encoding: 'utf8' });
    assert.equal(ok.status, 0, ok.stdout + ok.stderr);
    assert.match(ok.stdout, /tarkistusotos\s+1 .*erosi lähteestä 0/);
    const huono = puu(join(k, 'huono'), {
      '3:0:0': 'A', '3:1:0': 'B', '3:2:0': 'C', '3:3:0': 'd',
    }, { pallo });
    const ei = spawnSync('node', [PAIKKAUS, 'vertaa', '--lahde', lahde, '--paikattu', huono, '--lista', listaPolku], { encoding: 'utf8' });
    assert.notEqual(ei.status, 0);
    assert.match(ei.stdout, /tarkistuslaattaa erosi lähteestä/);
  }
});

test('eheys: pallon delta-sarja odottaa piirretyt + tarkistetut, levyltä kopioitu täyden', () => {
  const pohja = { tasot: { min: 0, max: 2 } };
  assert.equal(odotetutPallosta(pohja).get('pallo z2'), 16);
  const d = { ...pohja, delta: { piirretty: { 0: 1, 1: 4, 2: 9 }, tarkistettu: { 2: 2 }, kopioituLevylla: false } };
  assert.equal(odotetutPallosta(d).get('pallo z2'), 11);
  assert.equal(odotetutPallosta({ ...d, delta: { ...d.delta, kopioituLevylla: true } }).get('pallo z2'), 16);
});

/* ============================================= resepti ja polttoskripti */

test('resepti: delta-tieto omana komentonaan, liput ja shardit ennallaan', () => {
  const d26 = execFileSync('node', [RESEPTI, 'delta', '2026-09-26'], { encoding: 'utf8' });
  assert.match(d26, /R_DELTA_LAJI='meri'/);
  assert.match(d26, /R_DELTA_RESEPTI='2026-09-25'/);
  assert.match(execFileSync('node', [RESEPTI, 'delta', '2026-09-25'], { encoding: 'utf8' }), /R_DELTA_LAJI=''/);
  for (const nimi of ['2026-09-25', '2026-09-26']) {
    assert.doesNotMatch(execFileSync('node', [RESEPTI, 'liput', nimi], { encoding: 'utf8' }), /DELTA/);
    assert.doesNotMatch(execFileSync('node', [RESEPTI, 'shardit', nimi], { encoding: 'utf8' }), /delta/);
  }
});

test('polttoskripti --delta: vain pohjashardit delta-lipuin, pallolle delta; ilman deltaa ei jälkeäkään', () => {
  const ulos = pesa('delta-lista-');
  writeFileSync(join(ulos, 'ampari-luettelo.json'), JSON.stringify({
    versio: 'vanha-pohja', viivataso: { versio: 'vanha-viivat' }, nostotaso: { versio: 'vanha-nostot' },
    rantataso: { versio: 'vanha-ranta' }, laatu: 0.9, patina: 'kevyt', tasot: [],
  }));
  const dem = join(ulos, 'dem'); mkdirSync(dem);
  const aja = (lisa) => spawnSync('bash', [POLTTO, '--ulos', ulos, '--dem', dem, '--dem90', dem, '--ytimet', '4', ...lisa, '--lista'], {
    encoding: 'utf8', env: { ...process.env, POLTTO_LUETTELO_URL: 'file:///ei/ole/pyramidi.json' },
  });
  const d = aja(['--resepti', '2026-09-26', '--sarjat', 'kaikki', '--versio', 'uusi-pohja', '--delta-lahde', 'vanha-pohja',
    '--pallo', '--pallotunniste', 'koe', '--pallo-delta-lahde', 'julisteet/pallo/laatat/vanha-pohja-k/']);
  assert.equal(d.status, 0, d.stderr + d.stdout);
  const rivit = d.stdout.split('\n').filter((l) => /^[a-z]\S*\s+--/.test(l));
  assert.ok(rivit.length > 100);
  for (const l of rivit) {
    assert.match(l, /^z\d/, 'vain pohjashardeja');
    assert.match(l, /--delta meri --delta-lahde vanha-pohja/);
  }
  const pallo = d.stdout.split('\n').filter((l) => l.startsWith('pallo-'));
  assert.equal(pallo.length, 12);
  for (const l of pallo) assert.match(l, /--delta meri --delta-lahde julisteet\/pallo\/laatat\/vanha-pohja-k\//);
  const t = aja(['--resepti', '2026-09-26', '--sarjat', 'kaikki', '--versio', 'uusi-pohja', '--viivaversio', 'uusi-viivat',
    '--nostoversio', 'uusi-nostot', '--rantaversio', 'uusi-ranta', '--pallo', '--pallotunniste', 'koe', '--ilman-nostoja']);
  assert.equal(t.status, 0, t.stderr);
  assert.doesNotMatch(t.stdout, /--delta/);
  assert.match(t.stdout, /^viiva-z0-z7/m);
  const v = aja(['--resepti', '2026-09-26', '--sarjat', 'kaikki', '--versio', 'vanha-pohja', '--delta-lahde', 'vanha-pohja']);
  assert.notEqual(v.status, 0);
  assert.match(v.stderr, /UUDEN --versio/);
});

/* ================================================================ pallo */

test('pallon suunnitelma: piirretään täsmälleen muuttuneita pyramidin laattoja lukevat (ja täyte, jos meri muuttuu)', () => {
  const kaikkiPiirretaan = new Map(LUETTELO.tasot.map((t) => [t.z, new Uint8Array(t.sarakkeita * t.riveja).fill(1)]));
  const eiMitaan = new Map(LUETTELO.tasot.map((t) => [t.z, new Uint8Array(t.sarakkeita * t.riveja)]));
  const kaikki = pallonDeltaSuunnitelma({
    luettelo: LUETTELO, pyramidinPiirto: kaikkiPiirretaan, min: 0, max: 4, meretMuuttuu: null, tarkistus: 0,
  });
  for (const t of kaikki.tasot) assert.equal(t.piirra.reduce((a, v) => a + v, 0), t.n * t.n);
  const ei = pallonDeltaSuunnitelma({
    luettelo: LUETTELO, pyramidinPiirto: eiMitaan, min: 0, max: 4, meretMuuttuu: null, tarkistus: 0,
  });
  for (const t of ei.tasot) assert.equal(t.piirra.reduce((a, v) => a + v, 0), 0);
  const tayte = pallonDeltaSuunnitelma({
    luettelo: LUETTELO, pyramidinPiirto: eiMitaan, min: 0, max: 4, meretMuuttuu: true, tarkistus: 0,
  });
  for (const t of tayte.tasot) assert.equal(t.piirra.reduce((a, v) => a + v, 0), t.tayte);
  // Yksi muuttunut z4-laatta: vain sitä lukevat Z5-laatat piirretään.
  const yksi = new Map(eiMitaan); const z4 = new Uint8Array(taso(4).sarakkeita * taso(4).riveja);
  const k = 5 * taso(4).sarakkeita + 7; z4[k] = 1; yksi.set(4, z4);
  const s = pallonDeltaSuunnitelma({
    luettelo: LUETTELO, pyramidinPiirto: yksi, min: 5, max: 5, meretMuuttuu: false, tarkistus: 0,
  });
  const t5 = s.tasot[0];
  let n = 0;
  for (let i = 0; i < t5.piirra.length; i += 1) {
    const lukee = pallonLaatanLahteet(LUETTELO, 5, i % t5.n, Math.floor(i / t5.n)).laatat.has(k);
    assert.equal(Boolean(t5.piirra[i]), lukee);
    n += t5.piirra[i];
  }
  assert.ok(n > 0 && n < 16, `z4-laatta luetaan ${n} Z5-laatasta`);
});

test('pallon delta-sarja on tavulleen sama kuin täysi sarja (meri ja maa)', { skip: sharp ? false : 'sharp puuttuu' }, async () => {
  const k = pesa('delta-pallo-');
  // Pelkkä pohja: ei viiva-, ranta- eikä nostotasoa (testin lähdekansiossa vain pohja).
  const geo = { ...luettelo('0-2'), viivataso: null, rantataso: null, nostotaso: null };
  // Pyramidin laatat väreinä luokan mukaan; uusi versio muuttaa lajinsa laatat.
  const varit = {
    [VESI]: [[90, 120, 200], [70, 100, 230]],
    [MAA]: [[160, 120, 80], [180, 140, 60]],
    [VESI | MAA]: [[120, 120, 140], [100, 130, 150]],
    0: [[240, 235, 210], [240, 235, 210]],
  };
  const suunnitelmat = {};
  for (const laji of ['meri', 'maa']) {
    suunnitelmat[laji] = pyramidinDeltaSuunnitelma({
      luokitin: LUOKITIN, geometria: geo, tasot: geo.tasot, laji, marginaaliPx: MARGINAALI, tarkistus: 0,
    });
  }
  const lahde = join(k, 'pyramidi');
  const kirjoita = async (versio, laji) => {
    for (const t of suunnitelmat.meri.tasot) {
      const tg = geo.tasot.find((x) => x.z === t.z);
      const piirra = laji ? suunnitelmat[laji].tasot.find((x) => x.z === t.z).piirra : null;
      for (let rv = 0; rv < t.riveja; rv += 1) {
        for (let s = 0; s < t.sarakkeita; s += 1) {
          const i = rv * t.sarakkeita + s;
          const vari = varit[t.luokat[i]][piirra?.[i] ? 1 : 0];
          const w = Math.min(512, tg.leveys - s * 512); const h = Math.min(512, tg.korkeus - rv * 512);
          const kansio = join(lahde, versio, `z${t.z}`, String(s));
          mkdirSync(kansio, { recursive: true });
          // eslint-disable-next-line no-await-in-loop
          await sharp({ create: { width: w, height: h, channels: 3, background: { r: vari[0], g: vari[1], b: vari[2] } } })
            .webp({ lossless: true }).toFile(join(kansio, `${rv}.webp`));
        }
      }
    }
  };
  await kirjoita('P1', null);
  const ajaPallo = (luettelopolku, ulos, lisa = []) => {
    const r = spawnSync('node', [PALLO, '--luettelo', luettelopolku, '--lahde', lahde, '--min', '0', '--max', '3',
      '--suodatin', 'laatikko', '--jpeg-laatu', '90', '--jpeg-444', '--ulos', ulos, ...lisa], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stdout + r.stderr);
    return r.stdout;
  };
  const p1 = join(k, 'p1.json');
  writeFileSync(p1, JSON.stringify(geo));
  const vanha = join(k, 'pallo-P1');
  ajaPallo(p1, vanha);
  for (const laji of ['meri', 'maa']) {
    const versio = `P2${laji}`;
    await kirjoita(versio, laji);
    const p2 = join(k, `${versio}.json`);
    writeFileSync(p2, JSON.stringify({
      ...geo,
      versio,
      delta: {
        lahde: 'P1', laji, marginaaliPx: MARGINAALI, rannikonHarvennus: 0.006, tarkistus: 0, tiiviste: suunnitelmat[laji].tiiviste,
      },
    }));
    const taysi = join(k, `pallo-${versio}-taysi`);
    ajaPallo(p2, taysi);
    const delta = join(k, `pallo-${versio}-delta`);
    // Lähdesarjan versio on pyramidin lähdeversio (P1).
    const tuloste = ajaPallo(p2, delta, ['--delta', laji, '--delta-lahde', vanha, '--data', DATA, '--delta-tarkistus', '2']);
    assert.match(tuloste, /delta-tarkistus: \d+ laattaa tavulleen lähteen laattoja|tässä ajossa/);
    const d = JSON.parse(readFileSync(join(delta, 'delta.json'), 'utf8'));
    assert.equal(d.laatat.length + d.tarkistus.length + d.kopioitavat.length, 1 + 4 + 16 + 64);
    let kopioita = 0;
    for (const Z of ['0', '1', '2', '3']) {
      for (const X of readdirSync(join(taysi, Z))) {
        for (const Y of readdirSync(join(taysi, Z, X))) {
          const a = readFileSync(join(taysi, Z, X, Y));
          const b = readFileSync(join(delta, Z, X, Y));
          assert.ok(a.equals(b), `${laji} ${Z}/${X}/${Y}: delta-sarja eroaa täydestä`);
        }
      }
    }
    kopioita = d.kopioitavat.length;
    const l = JSON.parse(readFileSync(join(delta, 'laatat.json'), 'utf8'));
    assert.equal(l.delta.laji, laji);
    assert.equal(l.delta.lahdeversio, 'P1');
    assert.equal(l.delta.kopioituLevylla, true);
    if (laji === 'maa') assert.ok(kopioita > 0, 'maa-deltassa ulappaa lukevat pallon laatat kopioidaan');
  }
  // Väärä edeltäjä (eri pyramidin lähdeversio) torjutaan.
  const vaara = join(k, 'vaara'); cpSync(vanha, vaara, { recursive: true });
  const vl = JSON.parse(readFileSync(join(vaara, 'laatat.json'), 'utf8'));
  writeFileSync(join(vaara, 'laatat.json'), JSON.stringify({ ...vl, versio: 'P0' }));
  const r = spawnSync('node', [PALLO, '--luettelo', join(k, 'P2meri.json'), '--lahde', lahde, '--min', '0', '--max', '3',
    '--ulos', join(k, 'x'), '--delta', 'meri', '--delta-lahde', vaara, '--data', DATA, '--kuiva'], { encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /ei ole tämän sarjan edeltäjä/);
  assert.ok(existsSync(join(vanha, 'laatat.json')));
});
