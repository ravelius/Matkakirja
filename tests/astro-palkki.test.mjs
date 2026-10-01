/*
 * ASTRONAUTIN KAMERAN VALKOINEN TUNNUSPALKKI EI SAA NÄKYÄ (omistaja
 * 20.9. ja 30.9.2026). Tämä testi vahtii kahta asiaa:
 *   1) tunnistin (tools/astro-palkki.mjs) löytää NASAn leiman ja jättää
 *      aidon valkoisen pinnan (suolatasanko, pilvet) rauhaan;
 *   2) jokainen aineiston havainto on kirjattu tarkistetuksi
 *      (tools/astro-palkit-tarkistetut.json), ja jokainen palkillinen
 *      havainto osoittaa omaan ämpäriin eikä NASAn alkuperäiseen.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tunnistaPalkki, rajauskorkeus } from '../tools/astro-palkki.mjs';
import { SATELLIITTI_KOHTEET } from '../js/linssit/satelliitti-data.js';
import { KUVAPOIKKEUKSET } from '../tools/hae-satelliittihavainnot.mjs';

const TARKISTETUT = JSON.parse(readFileSync(new URL('../tools/astro-palkit-tarkistetut.json', import.meta.url), 'utf8')).havainnot;

/** Tekoälytön testikuva: tumma "maisema" + valinnainen valkoinen palkki mustalla tekstillä. */
function kuva(leveys, korkeus, { palkkiPx = 0, leimaa = true, valkoinenKuva = false } = {}) {
  const data = new Uint8Array(leveys * korkeus * 3);
  for (let y = 0; y < korkeus; y += 1) {
    for (let x = 0; x < leveys; x += 1) {
      const i = (y * leveys + x) * 3;
      let v = valkoinenKuva ? 245 : 40 + ((x * 7 + y * 13) % 50);
      if (y >= korkeus - palkkiPx) {
        v = 255;
        // teksti: harvoja mustia pikseleitä palkin keskellä, ~8 % pikseleistä
        if (leimaa && y > korkeus - palkkiPx + 2 && y < korkeus - 2 && (x % 12) === 0) v = 0;
      }
      data[i] = v; data[i + 1] = v; data[i + 2] = v;
    }
  }
  return data;
}

test('tunnistaja löytää NASAn leimapalkin isosta ja pikkukuvasta', () => {
  const iso = tunnistaPalkki(kuva(1920, 1307, { palkkiPx: 35 }), 1920, 1307);
  assert.equal(iso.palkki, true);
  assert.equal(iso.korkeus, 35);
  assert.equal(rajauskorkeus(iso), 36);
  const pikku = tunnistaPalkki(kuva(640, 435, { palkkiPx: 11 }), 640, 435);
  assert.equal(pikku.palkki, true);
  assert.equal(pikku.korkeus, 11);
});

test('tunnistaja hylkää puhtaan kuvan ja aidon valkoisen pinnan', () => {
  assert.equal(tunnistaPalkki(kuva(1920, 1307), 1920, 1307).palkki, false);
  // suolatasanko: koko kuva valkoinen ilman leimatekstiä
  assert.equal(tunnistaPalkki(kuva(1920, 1271, { valkoinenKuva: true }), 1920, 1271).palkki, false);
  // palkin kokoinen valkoinen kaista ilman tekstiä ei ole leima
  assert.equal(tunnistaPalkki(kuva(1920, 1307, { palkkiPx: 35, leimaa: false }), 1920, 1307).palkki, false);
});

test('jokainen astro-havainto on palkkitarkistettu', () => {
  const puuttuu = [];
  for (const k of SATELLIITTI_KOHTEET) {
    for (const h of k.havainnot) if (!(h.id in TARKISTETUT)) puuttuu.push(h.id);
  }
  assert.deepEqual(puuttuu, [], 'uusi astro-kuva pitää tarkistaa: node tools/astro-palkki.mjs tarkista <kuvat> ja kirjata tools/astro-palkit-tarkistetut.json:iin');
});

test('palkilliset havainnot käyttävät rajattua omaa kuvaa, ei NASAn alkuperäistä', () => {
  const oma = /^https:\/\/media\.matkakirja\.app\/linssit\/astronautin-kamera\/(?:\d{8}\/)?[a-z0-9-]+~(large|small)\.jpg$/i;
  let palkillisia = 0;
  for (const k of SATELLIITTI_KOHTEET) {
    for (const h of k.havainnot) {
      const t = TARKISTETUT[h.id];
      if (!t?.palkki) continue;
      palkillisia += 1;
      assert.ok(t.rajattu, `${h.id}: palkillinen ilman rajattu-kansiota`);
      assert.match(h.kuva, oma, `${h.id}: kuva ei osoita rajattuun kopioon`);
      assert.match(h.pikku, oma, `${h.id}: pikku ei osoita rajattuun kopioon`);
      const kansio = t.rajattu === '20260921' ? '' : `${t.rajattu}/`;
      assert.ok(h.kuva.endsWith(`/astronautin-kamera/${kansio}${h.id}~large.jpg`), `${h.id}: kuva väärässä versiokansiossa`);
      assert.ok(h.pikku.endsWith(`/astronautin-kamera/${kansio}${h.id}~small.jpg`), `${h.id}: pikku väärässä versiokansiossa`);
    }
  }
  assert.ok(palkillisia >= 40, `odotettiin vähintään 40 palkillista, oli ${palkillisia}`);
  // generointityökalun poikkeuskartta pysyy samana kuin kirjanpito
  const kirjatut = Object.entries(TARKISTETUT).filter(([, v]) => v.palkki).map(([id]) => id).sort();
  assert.deepEqual([...KUVAPOIKKEUKSET.keys()].sort(), kirjatut);
});

test('Everglades ISS015E08920: palkiton kopio aineistossa', () => {
  const h = SATELLIITTI_KOHTEET.flatMap((k) => k.havainnot).find((x) => x.id === 'iss015e08920');
  assert.ok(h);
  assert.equal(h.kuva, 'https://media.matkakirja.app/linssit/astronautin-kamera/20261001/iss015e08920~large.jpg');
});
