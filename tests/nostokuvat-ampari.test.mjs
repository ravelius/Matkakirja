/*
 * Nostokuvien osoitteet ämpärissä (löydös 149, 26.9.2026): pakkojen
 * `https://media.matkakirja.app/karttanostot/<pvm>/<tiedosto>.jpg` -osoitteet
 * osoittivat 288 tiedostoon, joita ei ollut viety ämpäriin, ja vika näkyi
 * vasta natiivin vartijassa. tarkista-media.mjs ohittaa hahmotelmien
 * viitekuvat, joten mikään aiempi tarkistus ei nähnyt niitä.
 *
 * KAKSI OSAA:
 *   1. Aina päällä, ilman verkkoa: jokainen osoite on muotoa
 *      karttanostot/<8 numeroa>/<tiedosto>.jpg|webp|png eikä samaa
 *      tiedostonimeä ole kirjattu kahteen eri päivämäärään.
 *   2. Verkko, vain kun NOSTOKUVAT_VERKKO=1 (verkko ei ole deterministinen,
 *      ks. amparin-aukot.yml): HEAD jokaiselle osoitteelle, odotus 200.
 *      Ajo: NOSTOKUVAT_VERKKO=1 node --test tests/nostokuvat-ampari.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KUVIO = /https:\/\/media\.matkakirja\.app\/karttanostot\/[A-Za-z0-9_./-]+\.(?:jpg|webp|png)/g;

function osoitteet() {
  const kaikki = new Set();
  for (const kansio of ['js/packs', 'js']) {
    for (const f of readdirSync(join(JUURI, kansio))) {
      if (!f.endsWith('.js')) continue;
      const teksti = readFileSync(join(JUURI, kansio, f), 'utf8');
      // Kommenteissa on hakemistoja ("…/karttanostot/20260919/"), ei kuvia.
      for (const rivi of teksti.split('\n')) {
        if (/^\s*(\/\/|\*|\/\*)/.test(rivi)) continue;
        for (const m of rivi.matchAll(KUVIO)) kaikki.add(m[0]);
      }
    }
  }
  return [...kaikki].sort();
}

const OSOITTEET = osoitteet();

test('nostokuvien osoitteet ovat oikeaa muotoa', () => {
  assert.ok(OSOITTEET.length > 1000, `osoitteita vain ${OSOITTEET.length}`);
  const vaarat = OSOITTEET.filter((u) => !/\/karttanostot\/\d{8}\/[^/]+\.(?:jpg|webp|png)$/.test(u));
  assert.deepEqual(vaarat, [], 'väärän muotoisia nostokuvaosoitteita');
});

test('sama kuva ei ole kirjattu kahdelle päivämäärälle', () => {
  const nimet = new Map();
  for (const u of OSOITTEET) {
    const [, pvm, nimi] = u.match(/\/karttanostot\/(\d{8})\/([^/]+)$/);
    if (nimet.has(nimi) && nimet.get(nimi) !== pvm) assert.fail(`${nimi}: ${nimet.get(nimi)} ja ${pvm}`);
    nimet.set(nimi, pvm);
  }
});

test('kaikki nostokuvat vastaavat 200 ämpärissä (NOSTOKUVAT_VERKKO=1)', {
  skip: process.env.NOSTOKUVAT_VERKKO === '1' ? false : 'verkkotarkistus vain NOSTOKUVAT_VERKKO=1',
  timeout: 900000,
}, async () => {
  const puuttuu = [];
  const jono = [...OSOITTEET];
  const tyo = async () => {
    while (jono.length) {
      const u = jono.pop();
      let koodi = 0;
      for (let yritys = 0; yritys < 3 && koodi !== 200; yritys++) {
        try { koodi = (await fetch(u, { method: 'HEAD', signal: AbortSignal.timeout(20000) })).status; }
        catch { koodi = 0; }
        if (koodi !== 200 && koodi !== 404) await new Promise((r) => setTimeout(r, 500 * (yritys + 1)));
        if (koodi === 404) break;
      }
      if (koodi !== 200) puuttuu.push(`${koodi} ${u.replace('https://media.matkakirja.app/', '')}`);
    }
  };
  await Promise.all(Array.from({ length: 8 }, tyo));
  assert.deepEqual(puuttuu.sort(), [], `${puuttuu.length} nostokuvaa puuttuu ämpäristä`);
});
