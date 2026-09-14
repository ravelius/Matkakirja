/*
 * TASOITUSLAATAN POLKU — SAMA MERKKIJONO MOLEMMISSA PÄISSÄ
 * (karttauudistus, erän 1c jälkipuinti 14.9.2026).
 *
 * === VIKA, JONKA TÄMÄ ESTÄÄ TOISTUMASTA ============================
 *
 * Laatan osoitteessa EI OLLUT MAATA — `<variversio>/vari/z4/9/4.webp` —
 * ja kaikkien 27 maan `varitasot[ISO].versio` on sama merkkijono
 * (`2026-09-13-tasoitus`). Maiden laatikot menevät päällekkäin, joten
 * jokainen maa-ajo kirjoitti samojen avainten päälle ja voimaan jäi
 * viimeinen. Mitattu todiste (docs/raportit/viesti-fable-kaistat-
 * 20260913.md luku 5): Ranskan laataston kolme laattaa olivat kolmesta
 * eri ajosta (Last-Modified 18:27, 19:13, 19:15), ja laattojen z4/9/4
 * ja z4/10/4 alfassa oli musta — eli alkuperäisenä säilynyt — ala
 * Pohjois-Espanjassa, jota Ranskan ajo ei ole voinut piirtää. Pelaaja
 * latasi Ranskan laatastona laatan, joka oli osittain toisen maan.
 *
 * === MIKSI TESTI MITTAA KAHTA PÄÄTÄ EIKÄ YHTÄ MALLINETTA ===========
 *
 * Polun rakentaa kaksi ohjelmaa: generaattori kirjoittaa laatan
 * levylle (ja työnkulku vie sen ämpäriin) ja peli lukee sen
 * osoitteesta. Jos ne rakentaisivat polun omilla mallineillaan, ne
 * ehtisivät eriytyä — ja eriytymisen ainoa oire olisi tyhjä kerros
 * kartalla, ei virheilmoitus. Siksi polku on yksi funktio
 * (js/media.js varitasonPolku), ja tämä testi mittaa, että
 *
 *   1. GENERAATTORIN oma tuloste (`--kuiva` polkuotos, todellinen
 *      merkkijono eikä malline) ja PELIN oma osoite (js/laattapyramidi.js
 *      pyramidinLaattaUrl) ovat sama merkkijono samalla syötteellä, ja
 *   2. eri maat tuottavat ERI polun — juuri se, mikä puuttui.
 *
 * Kumpikin pää ajetaan oikealla työkalulla eikä jäljitellä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { varitasonPolku } from '../js/media.js';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PYRAMIDI_LAHDE = readFileSync(join(JUURI, 'js', 'laattapyramidi.js'), 'utf8');
const GENERAATTORI_LAHDE = readFileSync(GENERAATTORI, 'utf8');

/* ---------------------------------------- generaattorin oma tuloste */

/**
 * Kuiva-ajo maalle `iso`: palauttaa polkuotoksen ja sen osat.
 * `--kuiva` ei piirrä eikä tarvitse selainta, mutta se laskee saman
 * laattajoukon kuin oikea ajo — otos on siis todellinen laatta.
 */
function kuivaPolku(iso, variversio = '2026-09-14-tasoitus') {
  const kansio = mkdtempSync(join(tmpdir(), 'varipolku-'));
  const tuloste = execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '4',
    '--versio', 'pohja-koe',
    '--vari', iso,
    '--variversio', variversio,
    '--paletti', 'tasoitus',
    '--laatikko-nakyma',
    '--kuiva',
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const rivi = tuloste.split('\n').find((r) => r.includes('polkuotos')) ?? '';
  const polku = rivi.replace(/^\s*polkuotos\s+/, '').trim();
  const osat = /^(.+)\/vari\/([A-Z]{3})\/z(\d+)\/(\d+)\/(\d+)\.(\w+)$/.exec(polku);
  assert.ok(osat, `polkuotos ei ole odotetun muotoinen: "${polku}"`);
  return {
    polku,
    versio: osat[1],
    iso: osat[2],
    z: Number(osat[3]),
    sarake: Number(osat[4]),
    rivi: Number(osat[5]),
    muoto: osat[6],
  };
}

/* -------------------------------------------------- pelin oma osoite */

/**
 * Pyramidimoduuli tuoreena annetulla luettelolla, väritason maa
 * asetettuna. Sama tapa kuin tests/rantataso.test.mjs:ssä: luettelo
 * tarjoillaan fetch-tynkänä, jolloin peli lukee sen omalla polullaan.
 */
async function peliUrl(luettelo, iso, z, sarake, rivi, tunnus) {
  const vanhaFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => luettelo });
  try {
    const m = await import(`../js/laattapyramidi.js?varipolku=${tunnus}`);
    await m.haePyramidinLuettelo();
    m.asetaVaritasonMaa(iso);
    return m.pyramidinLaattaUrl({ vari: true, z }, sarake, rivi);
  } finally {
    globalThis.fetch = vanhaFetch;
  }
}

/** Pieni luettelo, jossa on kahden maan väritaso samalla versiolla. */
function tekoLuettelo(versio) {
  const bitit = Buffer.from([0b1111]).toString('base64');
  const kirjaus = (iso) => ({
    versio, maa: iso, tasoitus: true, peitto: 0.85, kerma: '#faf4d6',
    tasot: [4], laatastot: { 4: bitit },
  });
  return {
    versio: 'p1',
    laatta: 512,
    muoto: 'webp',
    arkki: { x: 0, y: 0, w: 12000, h: 7300 },
    tasot: [{
      z: 4, leveys: 10800, korkeus: 6577, sarakkeita: 22, riveja: 13, laatasto: null,
    }],
    varitasot: { FRA: kirjaus('FRA'), ESP: kirjaus('ESP') },
  };
}

const AMPARI = 'https://media.matkakirja.app/julisteet/pyramidi/';

/* ------------------------------------------------------------ 1. sama */

test('generaattorin ja pelin polku on sama merkkijono', async () => {
  const g = kuivaPolku('FRA');
  const luettelo = tekoLuettelo(g.versio);
  const url = await peliUrl(luettelo, g.iso, g.z, g.sarake, g.rivi, 'sama');
  assert.equal(url, `${AMPARI}${g.polku}`,
    `generaattori kirjoittaa "${g.polku}", peli lukee "${url.slice(AMPARI.length)}"`);
  // Ja kumpikin on se, minkä yhteinen funktio antaa samalla syötteellä.
  assert.equal(g.polku, varitasonPolku(g.versio, g.iso, g.z, g.sarake, g.rivi, g.muoto));
});

/* -------------------------------------------------------- 2. eri maat */

test('eri maat tuottavat eri polun samalla variversiolla', async () => {
  const fra = kuivaPolku('FRA');
  const esp = kuivaPolku('ESP');
  assert.equal(fra.versio, esp.versio, 'koe olettaa saman variversion molemmille');
  assert.notEqual(fra.polku, esp.polku,
    'kahden maan laatat menisivät samaan osoitteeseen — juuri se vika, joka korjattiin');
  assert.ok(fra.polku.includes('/vari/FRA/') && esp.polku.includes('/vari/ESP/'),
    `maa ei ole polussa: ${fra.polku} · ${esp.polku}`);

  // Sama myös pelin päässä: vain maa vaihtuu, muu syöte on identtinen.
  const luettelo = tekoLuettelo(fra.versio);
  const a = await peliUrl(luettelo, 'FRA', 4, 9, 4, 'maa-fra');
  const b = await peliUrl(luettelo, 'ESP', 4, 9, 4, 'maa-esp');
  assert.notEqual(a, b, 'peli pyytäisi samaa laattaa kahdelle maalle');
  assert.ok(a.endsWith('/vari/FRA/z4/9/4.webp'), a);
  assert.ok(b.endsWith('/vari/ESP/z4/9/4.webp'), b);
});

/* ------------------------------------------- 3. polku on yksi funktio */

test('kumpikin pää rakentaa polun yhteisestä funktiosta', () => {
  assert.match(PYRAMIDI_LAHDE, /varitasonPolku\(/,
    'peli rakentaa väritason polun omalla mallineellaan');
  assert.match(GENERAATTORI_LAHDE, /import \{ varitasonPolku \} from '\.\.\/js\/media\.js';/,
    'generaattori ei tuo yhteistä polkufunktiota');
  assert.doesNotMatch(PYRAMIDI_LAHDE, /`\$\{[^`]*\}\/vari\/z\$\{/,
    'pelissä on yhä maaton väritason polku');
});

/* ---------------------------- 4. laatan avain erottaa maat toisistaan */

test('väritason laatta-avain sisältää maan', () => {
  assert.match(PYRAMIDI_LAHDE,
    /if \(taso\.vari\) return `\$\{varitasonKirjaus\(\)\?\.versio \?\? ''\}\/\$\{variMaaNyt \?\? ''\}`;/,
    'avaimessa on vain versio — maan vaihtuessa vanha laatta jäisi näkyviin');
});
